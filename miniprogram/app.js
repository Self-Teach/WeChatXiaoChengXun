// app.js
// 应用全局逻辑：负责初始化本地缓存和全局数据结构
App({
  onLaunch() {
    // 小程序启动时读取本地缓存中的购物车与用户数据，避免出现空值异常
    const cart = wx.getStorageSync('cart') || [];
    const userInfo = wx.getStorageSync('userInfo') || null;

    // 统一写回缓存，确保存在期望的字段
    wx.setStorageSync('cart', cart);
    wx.setStorageSync('userInfo', userInfo);
  },
  globalData: {
    themeColor: '#1A5B34', // 主色调：参照主流茶叶销售类小程序
  },
});
