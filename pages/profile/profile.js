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
    }
  },

  onShow() {
    this.updateStats();
  },

  updateStats() {
    const cart = wx.getStorageSync('cart') || [];
    const pending = cart.length;
    this.setData({
      'stats.pending': pending
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
      // 兼容方案：直接模拟登录
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

  viewOrders() {
    wx.showToast({ title: '订单模块待接入', icon: 'none' });
  },

  manageAddress() {
    wx.showToast({ title: '地址管理暂未开通', icon: 'none' });
  },

  contactService() {
    wx.showModal({
      title: '联系客服',
      content: '请拨打客服热线：400-871-6688（工作日 09:00-18:00）',
      showCancel: false
    });
  }
});
