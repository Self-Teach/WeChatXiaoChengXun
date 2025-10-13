// pages/index/index.js
// 商品列表页面，负责展示主要茶叶商品
const app = getApp();

Page({
  data: {
    products: []
  },

  onLoad() {
    // 从全局数据中读取商品列表，确保与本地“数据库”同步
    this.setData({
      products: app.globalData.products
    });
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
  }
});
