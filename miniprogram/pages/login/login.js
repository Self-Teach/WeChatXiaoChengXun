// pages/login/login.js
// 登录页面：采集用户基础信息并写入本地缓存
Page({
  data: {
    formData: {
      name: '',
      phone: '',
      avatar: '',
    },
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({ formData: userInfo });
    }
  },

  handleInput(event) {
    const { field } = event.currentTarget.dataset;
    this.setData({
      formData: {
        ...this.data.formData,
        [field]: event.detail.value,
      },
    });
  },

  submitForm() {
    const { name, phone, avatar } = this.data.formData;
    if (!name) {
      wx.showToast({ title: '请填写姓名', icon: 'none' });
      return;
    }
    if (!/^\d{11}$/.test(phone)) {
      wx.showToast({ title: '请输入 11 位手机号', icon: 'none' });
      return;
    }

    wx.setStorageSync('userInfo', { name, phone, avatar });
    wx.showToast({ title: '信息已保存', icon: 'success' });
    setTimeout(() => {
      wx.navigateBack({ delta: 1 });
    }, 600);
  },
});
