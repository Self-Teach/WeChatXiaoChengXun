// pages/profile/index.js
// 个人中心逻辑：模拟登录、提供各类管理入口
const app = getApp();
const { getStorage, setStorage } = require('../../utils/storage');

Page({
  data: {
    userInfo: null,
    orderStatus: [
      { id: 'pendingPay', name: '待付款', icon: '/images/icon-order-pay.png' },
      { id: 'pendingShip', name: '待发货', icon: '/images/icon-order-ship.png' },
      { id: 'pendingReceive', name: '待收货', icon: '/images/icon-order-receive.png' },
      { id: 'pendingComment', name: '待评价', icon: '/images/icon-order-comment.png' },
      { id: 'afterSale', name: '退款/售后', icon: '/images/icon-order-refund.png' }
    ]
  },

  onShow() {
    const storedUser = getStorage('LOCAL_USER_INFO', null);
    if (storedUser) {
      app.globalData.userInfo = storedUser;
    }
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

  /**
   * 模拟登录逻辑
   * 真实项目中应调用 wx.getUserProfile 或自建账号体系，此处仅做演示
   */
  onLogin() {
    if (this.data.userInfo) {
      wx.showToast({
        title: '已登录',
        icon: 'none'
      });
      return;
    }
    wx.showModal({
      title: '模拟登录',
      content: '模拟登录将使用默认头像与昵称，真实项目需接入授权或后台接口。',
      success: (res) => {
        if (res.confirm) {
          const mockUser = {
            nickname: '茶友-' + Date.now().toString().slice(-4),
            avatar: '/images/avatar-default.png'
          };
          app.globalData.userInfo = mockUser;
          setStorage('LOCAL_USER_INFO', mockUser);
          this.setData({ userInfo: mockUser });
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });
        }
      }
    });
  },

  /**
   * 跳转至订单列表并按照状态筛选
   */
  goOrderList(e) {
    const { status } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/order-list/index?status=${status}`
    });
  },

  /**
   * 跳转到地址管理列表
   */
  goAddressList() {
    wx.navigateTo({
      url: '/pages/address-list/index'
    });
  },

  /**
   * 跳转账号与安全页面
   */
  goAccountSecurity() {
    wx.navigateTo({
      url: '/pages/account-security/index'
    });
  },

  /**
   * 复制客服微信号
   */
  onCopyService() {
    wx.setClipboardData({
      data: 'SelfLearner',
      success: () => {
        wx.showToast({
          title: '已复制微信号',
          icon: 'success'
        });
      }
    });
  }
});
