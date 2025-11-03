// app.js
// 全局应用实例，主要负责一些初始化逻辑
const { getStorage, setStorage } = require('./utils/storage');

App({
  globalData: {
    userInfo: null // 保存用户信息（本地模拟）
  },

  onLaunch() {
    // 小程序启动时初始化必要的本地存储结构
    this.initStorage();
  },

  /**
   * 初始化本地存储，避免读取时出现 undefined
   */
  initStorage() {
    const cart = getStorage('LOCAL_CART_DATA', []);
    if (!Array.isArray(cart)) {
      setStorage('LOCAL_CART_DATA', []);
    }

    const orders = getStorage('LOCAL_ORDER_LIST', []);
    if (!Array.isArray(orders)) {
      setStorage('LOCAL_ORDER_LIST', []);
    }

    const address = getStorage('LOCAL_ADDRESS_LIST', []);
    if (!Array.isArray(address)) {
      setStorage('LOCAL_ADDRESS_LIST', []);
    }

    const userInfo = getStorage('LOCAL_USER_INFO', null);
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  }
});
