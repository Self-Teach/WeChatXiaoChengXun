// app.js // 指出文件是小程序的全局入口脚本
// 作为全局数据存储与生命周期管理入口，协调各页面共享的基础数据 // 概述文件职责
// 引入本地的商品与图文数据集合，供页面通过 globalData 共享使用
const { products } = require('./data/products'); // 加载商品数据对象，后续挂载到 globalData
// 引入购物车相关的常量与读取工具，便于统一管理本地存储键和值
const { CART_STORAGE_KEY, getCartItems } = require('./utils/cartStorage'); // 工具函数帮助管理本地购物车存储

App({ // 使用 App 构造器注册全局应用对象
  // globalData 用于跨页面共享数据，产品列表与购物车都会在各页面中调用
  globalData: { // 定义一个全局共享的数据容器
    // 将本地的产品数据集挂载到全局，列表与详情页直接引用
    products, // 将商品数组直接暴露在全局
    // 初始化购物车为空数组，后续根据存储读取并更新
    cart: [] // 准备购物车的默认空状态
  },

  /**
   * 初始化应用时尝试读取本地存储中的购物车数据，
   * 确保用户再次进入小程序时购物车状态得以恢复。
   */
  onLaunch() { // 生命周期：小程序启动时执行
    const savedCart = getCartItems(); // 从本地缓存读取购物车条目
    this.globalData.cart = savedCart; // 将读取结果写入全局数据，便于各页面初始化
    // 同步缓存，避免旧版本遗留的键名导致数据丢失
    wx.setStorageSync(CART_STORAGE_KEY, savedCart); // 立即写回一次，确保键存在且内容最新
  }
});
