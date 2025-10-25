// pages/index/index.js // 标识当前脚本所属的页面文件，方便理解作用域
// 商品列表页面，负责展示主要茶叶商品 // 概述页面职责，帮助初学者快速定位功能
const app = getApp(); // 获取全局应用实例，用于访问全局共享数据
const { ICONS } = require('../../utils/icons'); // 引入本地图标映射，便于在模板中统一引用
// 购物车工具集合：getCartItems 读取缓存、setCartItems 覆写缓存、upsertCartItem 合并商品、computeCartCount 统计数量
const { getCartItems, setCartItems, upsertCartItem, computeCartCount } = require('../../utils/cartStorage');

Page({ // 使用 Page 构造器注册首页逻辑
  data: { // data 对象保存页面的可绑定状态
    ICONS, // 直接暴露 ICONS 以便 wxml 中通过 ICONS.xxx 访问
    allProducts: [], // 存放全量商品数据，初始为空待 onLoad 注入
    filteredProducts: [], // 当前筛选后展示的商品列表
    // 首页分类标签，可在此调整展示顺序与文案
    teaTypes: ['全部', '茶叶精选', '特产精选'], // 分类筛选项数组
    activeType: '全部', // 当前选中的分类名称
    searchKeyword: '', // 搜索框绑定的关键字
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
    const products = app.globalData.products; // 直接访问 app.js 中准备好的商品数组

    this.setData( // 更新 data 并在回调里应用筛选
      {
        allProducts: products // 将全量商品保存到页面状态
      },
      () => {
        this.applyFilters(); // 初始化完成后执行筛选逻辑，填充 filteredProducts，确保默认展示全部商品
      }
    );
    this.updateCartCount(); // 初始化时同步购物车数量，确保浮标准确
  },

  /**
   * 页面显示时刷新购物车数量，以捕捉其他页面的改动。
   */
  onShow() { // 生命周期：页面重新显示时执行
    this.updateCartCount(); // 每次返回首页都刷新购物车数量提示
  },

  /**
   * 监听搜索框输入，实时更新关键字并触发筛选。
   */
  handleSearchInput(event) { // 绑定输入框的 input 事件
    const searchKeyword = event.detail.value.trim(); // 读取输入值并去除首尾空格，避免多余空格造成筛选不到数据
    this.setData({ searchKeyword }, () => {
      this.applyFilters(); // 更新关键字后重新计算商品列表
    });
  },

  /**
   * 清空搜索关键字并恢复默认列表。
   */
  clearSearch() { // 清除搜索条件的按钮事件
    this.setData({ searchKeyword: '' }, () => {
      this.applyFilters(); // 清空关键字后恢复默认筛选结果
    });
  },

  /**
   * 切换分类标签时更新当前分类并重新过滤商品。
   */
  handleTypeChange(event) { // 分类标签点击事件
    const { type } = event.currentTarget.dataset; // 读取被点击标签绑定的分类名称
    this.setData({ activeType: type }, () => {
      this.applyFilters(); // 切换分类后重新筛选
    });
  },

  /**
   * 将搜索词与分类组合，得到当前可展示的商品集合。
   */
  applyFilters() { // 核心筛选逻辑，将分类和关键字组合
    const { allProducts, activeType, searchKeyword } = this.data; // 从 data 中取出筛选所需状态
    const keyword = searchKeyword.toLowerCase(); // 将关键字转为小写，便于不区分大小写匹配（中文不受影响）

    const filteredProducts = allProducts.filter((product) => { // 遍历商品并筛选符合条件的项
      const matchType =
        activeType === '全部' ? true : product.category === activeType; // 判断分类是否匹配
      const matchKeyword =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        product.brief.toLowerCase().includes(keyword) || // 简介模糊匹配
        (product.tastingNotes || []).some((note) => note.toLowerCase().includes(keyword)) ||
        (product.tags || []).some((tag) => tag.toLowerCase().includes(keyword)); // 检查名称、简介、品饮笔记、标签是否包含关键字
      return matchType && matchKeyword; // 分类与关键字都符合时保留该商品
    });

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
  }
});
