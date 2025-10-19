// pages/index/index.js
// 商品列表页面，负责展示主要茶叶商品
const app = getApp();
const { ICONS } = require('../../utils/icons');

Page({
  data: {
    ICONS,
    allProducts: [],
    filteredProducts: [],
    // 首页分类标签，可在此调整展示顺序与文案
    teaTypes: ['全部', '茶叶精选', '特产精选'],
    activeType: '全部',
    searchKeyword: '',
    cartCount: 0,
    // 页面顶部徽章图标，可替换 image/icons/icon-page-home.svg
    pageIcon: ICONS.pageHome,
    // 浮动购物车按钮的图标，可在 image/icons/icon-cart.svg 替换
    cartIcon: ICONS.cart
  },

  onLoad() {
    // 从全局数据中读取商品列表，确保与本地“数据库”同步
    const products = app.globalData.products;

    this.setData(
      {
        allProducts: products
      },
      () => {
        this.applyFilters();
      }
    );
    this.updateCartCount();
  },

  onShow() {
    this.updateCartCount();
  },

  handleSearchInput(event) {
    const searchKeyword = event.detail.value.trim();
    this.setData({ searchKeyword }, () => {
      this.applyFilters();
    });
  },

  clearSearch() {
    this.setData({ searchKeyword: '' }, () => {
      this.applyFilters();
    });
  },

  handleTypeChange(event) {
    const { type } = event.currentTarget.dataset;
    this.setData({ activeType: type }, () => {
      this.applyFilters();
    });
  },

  applyFilters() {
    const { allProducts, activeType, searchKeyword } = this.data;
    const keyword = searchKeyword.toLowerCase();

    const filteredProducts = allProducts.filter((product) => {
      const matchType =
        activeType === '全部' ? true : product.category === activeType;
      const matchKeyword =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        product.brief.toLowerCase().includes(keyword) ||
        (product.tastingNotes || []).some((note) => note.toLowerCase().includes(keyword)) ||
        (product.tags || []).some((tag) => tag.toLowerCase().includes(keyword));
      return matchType && matchKeyword;
    });

    this.setData({ filteredProducts });
  },

  /**
   * 跳转到商品详情页
   */
  handleProductTap(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/productDetail/productDetail?id=${id}`
    });
  },

  /**
   * 跳转到购物车（tabBar 页面使用 switchTab）
   */
  goCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  },

  /**
   * 更新购物车数量，保持浮动按钮与本地数据同步
   */
  updateCartCount() {
    const items = wx.getStorageSync('cartItems') || app.globalData.cart || [];
    const cartCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    this.setData({ cartCount });
  }
});
