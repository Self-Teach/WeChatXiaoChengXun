// pages/profile/profile.js
// 用户个人中心页面
const { ICONS } = require('../../utils/icons');

Page({
  data: {
    loggedIn: false,
    userName: '游客',
    orderStatus: [
      { key: 'pendingPay', label: '待付款', icon: ICONS.pendingPay },
      { key: 'pendingSend', label: '待发货', icon: ICONS.pendingSend },
      { key: 'pendingReceive', label: '待收货', icon: ICONS.pendingReceive },
      { key: 'pendingReview', label: '待评价', icon: ICONS.pendingReview },
      { key: 'afterSale', label: '退款/售后', icon: ICONS.afterSale }
    ]
  },

  handleLogin() {
    this.setData({
      loggedIn: true,
      userName: '云茶会员'
    });
    wx.showToast({
      title: '登录成功',
      icon: 'success'
    });
  },

  goOrders() {
    wx.navigateTo({
      url: '/pages/profile/orders/orders'
    });
  },

  goAddress() {
    wx.navigateTo({
      url: '/pages/profile/address/address'
    });
  },

  goSecurity() {
    wx.navigateTo({
      url: '/pages/profile/security/security'
    });
  }
});
