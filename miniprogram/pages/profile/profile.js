// pages/profile/profile.js
// 个人中心页面：展示登录信息与常用功能入口
Page({
  data: {
    userInfo: null,
    cartCount: 0,
    defaultAvatar: 'https://img.icons8.com/color/160/tea-cup.png',
  },

  onShow() {
    // 每次进入页面时从本地缓存同步数据
    const userInfo = wx.getStorageSync('userInfo') || null;
    const cart = wx.getStorageSync('cart') || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    this.setData({ userInfo, cartCount });
  },

  goToLogin() {
    wx.navigateTo({ url: '/pages/login/login' });
  },

  goToOrders() {
    wx.navigateTo({ url: '/pages/orders/orders' });
  },

  goToAddress() {
    wx.navigateTo({ url: '/pages/address/address' });
  },

  goToCart() {
    wx.navigateTo({ url: '/pages/cart/cart' });
  },
});
