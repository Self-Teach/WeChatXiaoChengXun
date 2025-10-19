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
    ],
    quickEntries: [
      {
        key: 'address',
        label: '地址管理',
        desc: '常用收货地址一键更新',
        icon: ICONS.profileAddress,
        action: 'goAddress'
      },
      {
        key: 'security',
        label: '账号与安全',
        desc: '修改手机号与登录密码',
        icon: ICONS.profileSecurity,
        action: 'goSecurity'
      },
      {
        key: 'service',
        label: '客服服务',
        desc: '联系茶艺顾问答疑',
        icon: ICONS.profileService,
        action: 'openContact'
      }
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
  },

  handleQuickEntry(event) {
    const { action } = event.currentTarget.dataset;
    if (action && typeof this[action] === 'function') {
      this[action]();
    }
  },

  openContact() {
    wx.showToast({
      title: '稍后将有客服与您联系',
      icon: 'none'
    });
  }
});
