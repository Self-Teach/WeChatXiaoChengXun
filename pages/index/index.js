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
const app = getApp();
const { ICONS } = require('../../utils/icons');
const { getCartItems, setCartItems, upsertCartItem, computeCartCount } = require('../../utils/cartStorage');

const SKELETON_TIMEOUT = 420;
const INITIAL_VISIBLE_COUNT = 6;
const LOAD_MORE_COUNT = 4;
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

Page({
  data: {
    ICONS,
    allProducts: [],
    teaTypes: ['全部', '茶叶精选', '特产精选'],
    activeType: '全部',
    searchKeyword: '',
    searchSuggestions: [],
    isLoading: true,
    skeletonRows: [1, 2, 3, 4],
    filterSheetVisible: false,
    filterGroups: FILTER_GROUPS,
    filterSelections: {
      origin: [],
      craft: [],
      year: [],
      price: []
    },
    sortOptions: [
      { key: 'popular', label: '人气优先', desc: '按评分由高到低排序' },
      { key: 'priceAsc', label: '价格从低到高', desc: '适合预算有限的选购' },
      { key: 'priceDesc', label: '价格从高到低', desc: '用于高端礼茶展示' }
    ],
    activeSort: 'popular',
    cartCount: 0,
    cartIcon: ICONS.cart,
    visibleProducts: [],
    visibleCount: INITIAL_VISIBLE_COUNT,
    hasMore: false,
    isEmpty: false,
    pageFooter: {
      icon: ICONS.pageHome,
      title: '选购小贴士',
      desc: '结合季节挑选茶叶或伴手礼，关注风味标签与产地故事，收集心仪茶品更从容。'
    }
  },

  onLoad() {
    const products = app.globalData.products || [];
    this.filteredProducts = products;
    this.suggestionSource = this.buildSuggestionSource(products);
    this.setData({ allProducts: products });
    this.applyFilters();
    this.updateCartCount();
    this.scheduleSkeletonHide();
  },

  onShow() {
    this.updateCartCount();
  },

  onUnload() {
    if (this.skeletonTimer) {
      clearTimeout(this.skeletonTimer);
    }
  },

  onReachBottom() {
    this.loadMoreProducts();
  },

  handleSearchInput(event) {
    const searchKeyword = event.detail.value.trim();
    const searchSuggestions = this.getSuggestions(searchKeyword);
    this.setData({ searchKeyword, searchSuggestions });
    this.applyFilters();
  },

  clearSearch() {
    this.setData({ searchKeyword: '', searchSuggestions: [] });
    this.applyFilters();
  },

  handleTypeChange(event) {
    const { type } = event.currentTarget.dataset;
    this.setData({ activeType: type });
    this.applyFilters();
  },

  handleSuggestionTap(event) {
    const { keyword } = event.currentTarget.dataset;
    this.setData({ searchKeyword: keyword, searchSuggestions: [] });
    this.applyFilters();
  },

  toggleFilterSheet() {
    this.setData({ filterSheetVisible: !this.data.filterSheetVisible });
  },

  handleFilterToggle(event) {
    const { group, value } = event.currentTarget.dataset;
    const current = this.data.filterSelections[group] || [];
    const exists = current.includes(value);
    const next = exists ? current.filter((item) => item !== value) : current.concat(value);
    this.setData({ [`filterSelections.${group}`]: next });
  },

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

  confirmFilters() {
    this.setData({ filterSheetVisible: false });
    this.applyFilters();
  },

  handleSortChange(event) {
    const { key } = event.currentTarget.dataset;
    if (key === this.data.activeSort) {
      return;
    }
    this.setData({ activeSort: key });
    this.applyFilters();
  },

  applyFilters() {
    const { allProducts, activeType, searchKeyword, filterSelections, activeSort } = this.data;
    const keyword = searchKeyword.toLowerCase();

    const filteredProducts = allProducts
      .filter((product) => {
        const matchType = activeType === '全部' || product.category === activeType;
        const matchKeyword =
          !keyword ||
          product.name.toLowerCase().includes(keyword) ||
          product.brief.toLowerCase().includes(keyword) ||
          (product.tastingNotes || []).some((note) => (note || '').toLowerCase().includes(keyword)) ||
          (product.tags || []).some((tag) => (tag || '').toLowerCase().includes(keyword));
        const matchOrigin =
          !filterSelections.origin.length || filterSelections.origin.includes(product.origin.split('·')[0]);
        const matchCraft = !filterSelections.craft.length || filterSelections.craft.includes(product.type);
        const matchYear =
          !filterSelections.year.length || filterSelections.year.some((yearRange) => this.matchYear(yearRange, product));
        const matchPrice =
          !filterSelections.price.length || filterSelections.price.some((priceRange) => this.matchPrice(priceRange, product.price));

        return matchType && matchKeyword && matchOrigin && matchCraft && matchYear && matchPrice;
      })
      .sort((a, b) => this.sortComparator(activeSort, a, b));

    this.filteredProducts = filteredProducts;
    this.setData({ isEmpty: filteredProducts.length === 0 });
    this.updateVisibleProducts(true);
  },

  loadMoreProducts() {
    if (!this.data.hasMore) {
      return;
    }
    const nextCount = Math.min(this.data.visibleCount + LOAD_MORE_COUNT, this.filteredProducts.length);
    const visibleProducts = this.filteredProducts.slice(0, nextCount);
    this.setData({
      visibleProducts,
      visibleCount: nextCount,
      hasMore: nextCount < this.filteredProducts.length
    });
  },

  updateVisibleProducts(reset = false) {
    const targetCount = reset ? INITIAL_VISIBLE_COUNT : this.data.visibleCount;
    const nextCount = Math.min(targetCount, this.filteredProducts.length);
    const visibleProducts = this.filteredProducts.slice(0, nextCount);
    this.setData({
      visibleProducts,
      visibleCount: nextCount,
      hasMore: nextCount < this.filteredProducts.length
    });
  },

  handleProductTap(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/productDetail/productDetail?id=${id}` });
  },

  handleQuickAdd(event) {
    const { id } = event.currentTarget.dataset;
    const product = this.data.allProducts.find((item) => item.id === id);
    if (!product) {
      return;
    }

    const items = getCartItems();
    const next = upsertCartItem(items, {
      id: product.id,
      name: product.name,
      spec: product.specs && product.specs.length ? product.specs[0] : '默认规格',
      option: product.options && product.options.length ? product.options[0] : '默认选项',
      price: product.price,
      quantity: 1,
      thumb: product.images && product.images.length ? product.images[0] : ''
    });

    const saved = setCartItems(next);
    const cartCount = computeCartCount(saved);
    this.setData({ cartCount });
    wx.showToast({ title: '已加入购物车', icon: 'success', duration: 1200 });
  },

  goCart() {
    wx.switchTab({ url: '/pages/cart/cart' });
  },

  updateCartCount() {
    const items = getCartItems();
    const cartCount = computeCartCount(items);
    this.setData({ cartCount });
  },

  buildSuggestionSource(products) {
    const candidates = new Set();
    products.forEach((item) => {
      candidates.add(item.name);
      candidates.add(item.origin);
      (item.tags || []).forEach((tag) => candidates.add(tag));
    });
    return Array.from(candidates);
  },

  getSuggestions(keyword) {
    if (!keyword) {
      return [];
    }
    const lower = keyword.toLowerCase();
    return (this.suggestionSource || [])
      .filter((item) => item.toLowerCase().includes(lower))
      .slice(0, 5);
  },

  matchPrice(priceRange, price) {
    if (priceRange.includes('+')) {
      const min = parseInt(priceRange, 10);
      return price >= min;
    }
    const [min, max] = priceRange.split('-').map((v) => parseInt(v, 10));
    return price >= min && price <= max;
  },

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

  scheduleSkeletonHide() {
    this.skeletonTimer = setTimeout(() => {
      this.setData({ isLoading: false });
    }, SKELETON_TIMEOUT);
  },

  noop() {}
});
