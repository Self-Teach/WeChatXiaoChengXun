// app.js
// 作为全局数据存储与生命周期管理入口
const { products } = require('./data/products');

App({
  globalData: {
    products,
    cart: []
  },

  /**
   * 初始化应用时尝试读取本地存储中的购物车数据。
   */
  onLaunch() {
    const savedCart = wx.getStorageSync('cartItems');
    if (savedCart && Array.isArray(savedCart)) {
      this.globalData.cart = savedCart;
    }
  }
});
