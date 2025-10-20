// pages/index/index.js
// 商品列表页面，负责展示主要茶叶商品
const app = getApp();
const { ICONS } = require('../../utils/icons');
const { getCartItems, computeCartCount } = require('../../utils/cartStorage');

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
    // 浮动购物车按钮的图标，可在 image/icons/icon-cart.svg 替换
    cartIcon: ICONS.cart,
    pageFooter: {
      // 页面底部说明图标，可替换 image/icons/icon-page-home.svg
      icon: ICONS.pageHome,
      title: '选购小贴士',
      desc: '结合季节挑选茶叶或伴手礼，关注风味标签与产地故事，收集心仪茶品更从容。'
    }
  },

  /**
   * 页面初始化：同步全局商品数据并应用默认筛选条件。
   */
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

  /**
   * 页面显示时刷新购物车数量，以捕捉其他页面的改动。
   */
  onShow() {
    this.updateCartCount();
  },

  /**
   * 监听搜索框输入，实时更新关键字并触发筛选。
   */
  handleSearchInput(event) {
    const searchKeyword = event.detail.value.trim();
    this.setData({ searchKeyword }, () => {
      this.applyFilters();
    });
  },

  /**
   * 清空搜索关键字并恢复默认列表。
   */
  clearSearch() {
    this.setData({ searchKeyword: '' }, () => {
      this.applyFilters();
    });
  },

  /**
   * 切换分类标签时更新当前分类并重新过滤商品。
   */
  handleTypeChange(event) {
    const { type } = event.currentTarget.dataset;
    this.setData({ activeType: type }, () => {
      this.applyFilters();
    });
  },

  /**
   * 将搜索词与分类组合，得到当前可展示的商品集合。
   */
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
    const items = getCartItems();
    const cartCount = computeCartCount(items);
    this.setData({ cartCount });
  }
});
