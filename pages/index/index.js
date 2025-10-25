/**
 * pages/index/index.js
 * 功能：承载首页商品浏览、搜索、筛选、排序与快捷加购逻辑，并与全局购物车打通。
 * 用法：被 app.json 声明为 tabBar 首页；模板层在 index.wxml 中配合 data 渲染。
 * 尺寸：骨架屏占位高度、商品卡片列宽等在 index.wxss 与 styles/util.wxss 中集中调节。
 * 背景/配色：主色、卡片底色使用 styles/vars.wxss 的变量，若想换主题先改 vars。
 * 位置/布局：搜索/筛选/列表为三段布局，滚动区高度由 page-container + 内部 margin 控制。
 * 交互：包含输入防抖、筛选抽屉、排序按钮与快捷加购；事件命名统一 handleXXX 方便检索。
 * 依赖/风险：依赖 utils/cartStorage.js 的本地缓存方法；若改为接口需统一在该工具中调整。
 * 后期修改指引：想扩展筛选项或增加分页，请在 filtersConfig/sortOptions 追加，再在 wxml 添加对应按钮。
 */
const app = getApp(); // 获取全局应用实例，用于访问全局共享数据
const { ICONS } = require('../../utils/icons'); // 引入本地图标映射，便于在模板中统一引用
// 购物车工具集合：getCartItems 读取缓存、setCartItems 覆写缓存、upsertCartItem 合并商品、computeCartCount 统计数量
const { getCartItems, setCartItems, upsertCartItem, computeCartCount } = require('../../utils/cartStorage');

const SKELETON_TIMEOUT = 420; // 骨架屏展示时长（毫秒），可根据数据源时延调整
const FILTER_GROUPS = [
  {
    key: 'origin',
    title: '产地',
    options: ['西双版纳', '临沧', '保山', '普洱', '大理'],
    tip: '根据主要产区划分，命名以州或地级市为单位'
  },
  {
    key: 'craft',
    title: '工艺',
    options: ['普洱生茶', '普洱熟茶', '滇红工夫', '茶礼臻品', '茶点伴侣'],
    tip: '覆盖当前产品的 type 字段，如新增品类请同步 data/products.js'
  },
  {
    key: 'year',
    title: '年份',
    options: ['2018-2020', '2021-2022', '2023+'],
    tip: '依赖商品 harvestYear 字段；若无年份也会被视为通过'
  },
  {
    key: 'price',
    title: '价位',
    options: ['0-199', '200-499', '500+'],
    tip: '价格区间单位为人民币元，可按市场需求重新划段'
  }
];

Page({ // 使用 Page 构造器注册首页逻辑
  data: { // data 对象保存页面的可绑定状态
    ICONS, // 直接暴露 ICONS 以便 wxml 中通过 ICONS.xxx 访问
    allProducts: [], // 存放全量商品数据，初始为空待 onLoad 注入
    filteredProducts: [], // 当前筛选后展示的商品列表
    // 首页分类标签，可在此调整展示顺序与文案
    teaTypes: ['全部', '茶叶精选', '特产精选'], // 分类筛选项数组
    activeType: '全部', // 当前选中的分类名称
    searchKeyword: '', // 搜索框绑定的关键字
    searchSuggestions: [], // 搜索联想列表（最多展示 5 条）
    isLoading: true, // 骨架屏显示状态
    skeletonRows: [1, 2, 3, 4], // 骨架屏条目数量，调整数组长度即可控制占位行数
    filterSheetVisible: false, // 控制筛选抽屉显隐
    filterGroups: FILTER_GROUPS, // 提供筛选面板配置，WXML 中按 key 循环渲染
    filterSelections: {
      origin: [], // 产地多选
      craft: [], // 工艺多选
      year: [], // 年份区间
      price: [] // 价格区间
    },
    sortOptions: [
      { key: 'popular', label: '人气优先', desc: '按评分由高到低排序' },
      { key: 'priceAsc', label: '价格从低到高', desc: '适合预算有限的选购' },
      { key: 'priceDesc', label: '价格从高到低', desc: '用于高端礼茶展示' }
    ],
    activeSort: 'popular', // 当前排序方式
    cartCount: 0, // 浮动购物车上的数量提醒
    // 浮动购物车按钮的图标，可在 image/icons/icon-cart.svg 替换
    cartIcon: ICONS.cart, // 指定浮动按钮使用的购物车图标；可在 utils/icons.js 中替换为其他本地资源
    pageFooter: { // 页面底部提示卡片的数据结构
      // 页面底部说明图标，可替换 image/icons/icon-page-home.svg
      icon: ICONS.pageHome, // 图标字段与 wxml 中的 image 标签绑定
      title: '选购小贴士', // 标题文字
      desc: '结合季节挑选茶叶或伴手礼，关注风味标签与产地故事，收集心仪茶品更从容。' // 描述内容
    }
  },

  /**
   * 页面初始化：同步全局商品数据并应用默认筛选条件。
   */
  onLoad() { // 生命周期：页面初始化时执行
    // 从全局数据中读取商品列表，确保与本地“数据库”同步
    const products = app.globalData.products || []; // 直接访问 app.js 中准备好的商品数组

    this.suggestionSource = this.buildSuggestionSource(products); // 预先整理搜索联想数据，减少多次遍历开销

    this.setData({
      allProducts: products
    });

    this.applyFilters(); // 初始化完成后执行筛选逻辑，填充 filteredProducts
    this.updateCartCount(); // 初始化时同步购物车数量，确保浮标准确
    this.scheduleSkeletonHide(); // 启动骨架屏定时器
  },

  /**
   * 页面显示时刷新购物车数量，以捕捉其他页面的改动。
   */
  onShow() { // 生命周期：页面重新显示时执行
    this.updateCartCount(); // 每次返回首页都刷新购物车数量提示
  },

  onUnload() {
    if (this.skeletonTimer) {
      clearTimeout(this.skeletonTimer); // 页面卸载时清理骨架屏计时器
    }
  },

  /**
   * 监听搜索框输入，实时更新关键字并触发筛选。
   */
  handleSearchInput(event) { // 绑定输入框的 input 事件
    const searchKeyword = event.detail.value.trim(); // 读取输入值并去除首尾空格，避免多余空格造成筛选不到数据
    const searchSuggestions = this.getSuggestions(searchKeyword); // 根据输入生成联想词
    this.setData({ searchKeyword, searchSuggestions });
    this.applyFilters(); // 更新关键字后重新计算商品列表
  },

  /**
   * 清空搜索关键字并恢复默认列表。
   */
  clearSearch() { // 清除搜索条件的按钮事件
    this.setData({ searchKeyword: '', searchSuggestions: [] });
    this.applyFilters(); // 清空关键字后恢复默认筛选结果
  },

  /**
   * 切换分类标签时更新当前分类并重新过滤商品。
   */
  handleTypeChange(event) { // 分类标签点击事件
    const { type } = event.currentTarget.dataset; // 读取被点击标签绑定的分类名称
    this.setData({ activeType: type });
    this.applyFilters(); // 切换分类后重新筛选
  },

  /**
   * 选中联想词后填充输入框并重新过滤。
   */
  handleSuggestionTap(event) {
    const { keyword } = event.currentTarget.dataset;
    this.setData({ searchKeyword: keyword, searchSuggestions: [] });
    this.applyFilters();
  },

  /**
   * 打开或关闭筛选抽屉；用于按钮和遮罩共同调用。
   */
  toggleFilterSheet() {
    this.setData({ filterSheetVisible: !this.data.filterSheetVisible });
  },

  /**
   * 筛选项单选或多选的切换逻辑。
   * @param {Object} event - 携带 dataset.group/dataset.value
   */
  handleFilterToggle(event) {
    const { group, value } = event.currentTarget.dataset;
    const current = this.data.filterSelections[group] || [];
    const exists = current.includes(value);
    const next = exists ? current.filter((item) => item !== value) : current.concat(value);
    this.setData({ [`filterSelections.${group}`]: next });
  },

  /**
   * 清空筛选条件，重置抽屉状态。
   */
  resetFilters() {
    this.setData({
      filterSelections: {
        origin: [],
        craft: [],
        year: [],
        price: []
      }
    });
  },

  /**
   * 确认筛选条件：关闭抽屉并应用过滤逻辑。
   */
  confirmFilters() {
    this.setData({ filterSheetVisible: false });
    this.applyFilters();
  },

  /**
   * 切换排序方式。
   */
  handleSortChange(event) {
    const { key } = event.currentTarget.dataset;
    if (key === this.data.activeSort) {
      return;
    }
    this.setData({ activeSort: key });
    this.applyFilters();
  },

  /**
   * 将搜索词与分类组合，得到当前可展示的商品集合。
   */
  applyFilters() { // 核心筛选逻辑，将分类和关键字组合
    const { allProducts, activeType, searchKeyword, filterSelections, activeSort } = this.data; // 从 data 中取出筛选所需状态
    const keyword = searchKeyword.toLowerCase(); // 将关键字转为小写，便于不区分大小写匹配（中文不受影响）

    const filteredProducts = allProducts
      .filter((product) => {
        const matchType = activeType === '全部' || product.category === activeType; // 分类筛选

        const matchKeyword =
          !keyword ||
          product.name.toLowerCase().includes(keyword) ||
          product.brief.toLowerCase().includes(keyword) ||
          (product.tastingNotes || []).some((note) => (note || '').toLowerCase().includes(keyword)) ||
          (product.tags || []).some((tag) => (tag || '').toLowerCase().includes(keyword));

        const matchOrigin =
          !filterSelections.origin.length || filterSelections.origin.includes(product.origin.split('·')[0]);

        const matchCraft =
          !filterSelections.craft.length || filterSelections.craft.includes(product.type);

        const matchYear =
          !filterSelections.year.length || filterSelections.year.some((yearRange) => this.matchYear(yearRange, product));

        const matchPrice =
          !filterSelections.price.length || filterSelections.price.some((priceRange) => this.matchPrice(priceRange, product.price));

        return matchType && matchKeyword && matchOrigin && matchCraft && matchYear && matchPrice;
      })
      .sort((a, b) => this.sortComparator(activeSort, a, b));

    this.setData({ filteredProducts }); // 将筛选结果写入页面状态以刷新界面
  },

  /**
   * 跳转到商品详情页
   */
  handleProductTap(event) { // 商品卡片点击事件
    const { id } = event.currentTarget.dataset; // 获取被点击商品的唯一 id
    wx.navigateTo({ // 使用 navigateTo 打开商品详情页
      url: `/pages/productDetail/productDetail?id=${id}` // 将商品 id 作为查询参数传给详情页
    });
  },

  /**
   * 商品卡片上的“加入购物车”快捷按钮事件：
   * 默认选择商品的第一个规格与选项，并写入本地缓存。
   * 注：如需区分不同规格，可在按钮上追加数据集属性并传入。
   */
  handleQuickAdd(event) {
    const { id } = event.currentTarget.dataset; // dataset.id 对应 wxml 按钮上的 data-id
    const product = this.data.allProducts.find((item) => item.id === id); // 查找当前商品详情
    if (!product) {
      return;
    }

    const items = getCartItems(); // 读取已有购物车条目
    const next = upsertCartItem(items, {
      id: product.id, // 使用商品唯一 ID
      name: product.name, // 存入名称，方便购物车渲染
      spec: product.specs && product.specs.length ? product.specs[0] : '默认规格', // 优先使用第一个规格
      option: product.options && product.options.length ? product.options[0] : '默认选项', // 优先使用第一个选项
      price: product.price, // 价格用于计算合计
      quantity: 1, // 快捷加入默认一次一件，可按需调整
      thumb: product.images && product.images.length ? product.images[0] : '' // 主图缩略图便于购物车展示
    });

    const saved = setCartItems(next); // 覆写缓存并同步全局状态
    const cartCount = computeCartCount(saved); // 重新统计购物车总件数
    this.setData({ cartCount }); // 更新悬浮按钮徽标
    wx.showToast({ title: '已加入购物车', icon: 'success', duration: 1200 }); // 给用户反馈
  },

  /**
   * 跳转到购物车（tabBar 页面使用 switchTab）
   */
  goCart() { // 浮动购物车按钮点击事件
    wx.switchTab({ // 使用 switchTab 跳转到 tabBar 中的购物车页面
      url: '/pages/cart/cart' // 指向购物车页面路径
    });
  },

  /**
   * 更新购物车数量，保持浮动按钮与本地数据同步
   */
  updateCartCount() { // 读取本地购物车并刷新数量徽标
    const items = getCartItems(); // 获取存储在本地的购物车条目数组
    const cartCount = computeCartCount(items); // 统计总件数
    this.setData({ cartCount }); // 将数量写入 data 触发界面更新
  },

  /**
   * 构建搜索联想源：商品名称 + 标签 + 产地。后续输入时直接过滤该数组即可。
   */
  buildSuggestionSource(products) {
    const candidates = new Set();
    products.forEach((item) => {
      candidates.add(item.name);
      candidates.add(item.origin);
      (item.tags || []).forEach((tag) => candidates.add(tag));
    });
    return Array.from(candidates);
  },

  /**
   * 根据输入关键字返回最多 5 条建议。
   */
  getSuggestions(keyword) {
    if (!keyword) {
      return [];
    }
    const lower = keyword.toLowerCase();
    return (this.suggestionSource || [])
      .filter((item) => item.toLowerCase().includes(lower))
      .slice(0, 5);
  },

  /**
   * 依据配置的价格区间判断商品是否匹配。
   * priceRange 示例："0-199"、"200-499"、"500+"
   */
  matchPrice(priceRange, price) {
    if (priceRange.includes('+')) {
      const min = parseInt(priceRange, 10);
      return price >= min;
    }
    const [min, max] = priceRange.split('-').map((v) => parseInt(v, 10));
    return price >= min && price <= max;
  },

  /**
   * 年份筛选，根据产品的年份字段（若无则默认通过）。
   * 此示例假设产品 brief 或 description 中包含年份关键词，可按真实数据改造。
   */
  matchYear(yearRange, product) {
    if (!product.harvestYear) {
      return true;
    }
    if (yearRange.includes('+')) {
      const min = parseInt(yearRange, 10);
      return product.harvestYear >= min;
    }
    const [min, max] = yearRange.split('-').map((v) => parseInt(v, 10));
    return product.harvestYear >= min && product.harvestYear <= max;
  },

  /**
   * 根据当前排序 key 返回对应的比较函数结果。
   */
  sortComparator(key, a, b) {
    switch (key) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'popular':
      default:
        return b.rating - a.rating;
    }
  },

  /**
   * 延迟隐藏骨架屏，模拟数据加载过程。
   */
  scheduleSkeletonHide() {
    this.skeletonTimer = setTimeout(() => {
      this.setData({ isLoading: false });
    }, SKELETON_TIMEOUT);
  },

  /**
   * 阻止筛选弹层冒泡关闭的空操作函数，便于在 WXML 中使用 catchtap。
   */
  noop() {}
  }
});
