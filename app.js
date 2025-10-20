// app.js
// 作为全局数据存储与生命周期管理入口，协调各页面共享的基础数据
const { products } = require('./data/products');
const { CART_STORAGE_KEY, getCartItems } = require('./utils/cartStorage');

App({
  globalData: {
    products,
    cart: []
  },

  /**
   * 初始化应用时尝试读取本地存储中的购物车数据，
   * 确保用户再次进入小程序时购物车状态得以恢复。
   */
  onLaunch() {
    const savedCart = getCartItems();
    this.globalData.cart = savedCart;
    // 同步缓存，避免旧版本遗留的键名导致数据丢失
    wx.setStorageSync(CART_STORAGE_KEY, savedCart);
  }
});
