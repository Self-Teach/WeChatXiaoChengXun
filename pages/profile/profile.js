Page({
  data: {
    isLoggedIn: false,
    userInfo: {
      nickName: '登录/注册',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    stats: {
      orders: 0,
      pending: 0,
      addresses: 1
    },
    orderStatusList: [
      { key: 'pendingPay', label: '待付款', icon: '💳' },
      { key: 'pendingSend', label: '待发货', icon: '📦' },
      { key: 'pendingReceive', label: '待收货', icon: '🚚' },
      { key: 'pendingReview', label: '待评价', icon: '📝' },
      { key: 'refund', label: '退款/售后', icon: '💬' }
    ],
    accountSecurityOptions: [
      { key: 'phone', label: '更换手机号' },
      { key: 'password', label: '登录密码修改' },
      { key: 'security', label: '安全中心' }
    ]
  },

  onShow() {
    this.updateStats();
  },

  updateStats() {
    const cart = wx.getStorageSync('cart') || [];
    const orders = wx.getStorageSync('orders') || [];
    const addresses = wx.getStorageSync('addresses') || [];

    const pendingCount = cart.reduce((total, item) => total + item.quantity, 0);

    this.setData({
      'stats.pending': pendingCount,
      'stats.orders': orders.length,
      'stats.addresses': addresses.length || 1
    });
  },

  handleLogin() {
    if (this.data.isLoggedIn) {
      wx.showToast({ title: '已登录', icon: 'none' });
      return;
    }

    if (wx.getUserProfile) {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          this.setData({
            isLoggedIn: true,
            userInfo: res.userInfo
          });
        },
        fail: () => {
          wx.showToast({ title: '已取消授权', icon: 'none' });
        }
      });
    } else {
      this.setData({
        isLoggedIn: true,
        userInfo: {
          nickName: '茶友',
          avatarUrl: this.data.userInfo.avatarUrl
        }
      });
      wx.showToast({ title: '登录成功', icon: 'success' });
    }
  },

  handleStatusTap(event) {
    const { status } = event.currentTarget.dataset;
    const target = this.data.orderStatusList.find((item) => item.key === status);
    wx.showToast({
      title: `${target ? target.label : '订单'}功能待上线`,
      icon: 'none'
    });
  },

  viewOrders() {
    wx.showToast({ title: '订单列表模块待接入', icon: 'none' });
  },

  manageAddress() {
    wx.showToast({ title: '地址管理暂未开通', icon: 'none' });
  },

  handleAccountOption(event) {
    const { key } = event.currentTarget.dataset;
    let message = '功能开发中';
    if (key === 'phone') message = '请联系客服修改绑定手机号';
    if (key === 'password') message = '可在安全中心重置登录密码';
    if (key === 'security') message = '安全中心将提供登录设备与风控提示';
    wx.showToast({ title: message, icon: 'none' });
  },

  contactService() {
    wx.showModal({
      title: '联系客服',
      content: '请拨打客服热线：400-871-6688（工作日 09:00-18:00）',
      showCancel: false
    });
  }
});
