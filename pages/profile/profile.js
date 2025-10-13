// pages/profile/profile.js
// 用户个人中心页面
Page({
  data: {
    loggedIn: false,
    userName: '游客',
    orderStatus: [
      { key: 'pendingPay', label: '待付款', icon: '💰' },
      { key: 'pendingSend', label: '待发货', icon: '📦' },
      { key: 'pendingReceive', label: '待收货', icon: '🚚' },
      { key: 'pendingReview', label: '待评价', icon: '📝' },
      { key: 'afterSale', label: '退款/售后', icon: '🔄' }
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
