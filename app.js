/**
 * app.js
 * 功能：小程序全局入口，负责注入本地数据源、初始化购物车缓存并暴露跨页面共享的 globalData。
 * 用法：无需显式导入，基础库会自动执行此文件；各页面通过 getApp().globalData 读取共享数据。
 * 尺寸：不涉及视觉尺寸；如需调整全局字体/背景，请修改 app.wxss 与 styles/vars.wxss。
 * 背景/配色：导航栏色值位于 app.json，样式在 app.wxss；此文件仅处理逻辑。
 * 位置/布局：无 UI，仅处理生命周期逻辑；在 onLaunch 中读取本地存储确保页面加载时状态一致。
 * 交互：暴露 globalData.cart 供购物车和商品页读写；新增事件请在 App({...}) 中补充。
 * 依赖/风险：依赖 data/products.js、utils/cartStorage.js；若更换数据来源需在此统一修改。
 * 后期修改指引：准备接入网络接口时，可在 onLaunch 中增加异步请求并同步更新 globalData。
 */
const { products } = require('./data/products'); // 加载商品数据对象，后续挂载到 globalData
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
