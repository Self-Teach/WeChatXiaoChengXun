// pages/index/index.js
// 商品列表页面，负责展示主要茶叶商品
const app = getApp();
const { ICONS } = require('../../utils/icons');

Page({
  data: {
    products: [],
    cartCount: 0,
    cartIcon: ICONS.cart
  },

  onLoad() {
    // 从全局数据中读取商品列表，确保与本地“数据库”同步
    this.setData({
      products: app.globalData.products
    });
    this.updateCartCount();
  },

  onShow() {
    this.updateCartCount();
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
