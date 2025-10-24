// app.js
// 作为全局数据存储与生命周期管理入口，协调各页面共享的基础数据
// 引入本地的商品与图文数据集合，供页面通过 globalData 共享使用
const { products } = require('./data/products');
// 引入购物车相关的常量与读取工具，便于统一管理本地存储键和值
const { CART_STORAGE_KEY, getCartItems } = require('./utils/cartStorage');

App({
  // globalData 用于跨页面共享数据，产品列表与购物车都会在各页面中调用
  globalData: {
    // 将本地的产品数据集挂载到全局，列表与详情页直接引用
    products,
    // 初始化购物车为空数组，后续根据存储读取并更新
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
