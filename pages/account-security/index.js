// pages/account-security/index.js
// 账号与安全逻辑：模拟手机号与密码的本地修改
const { getStorage, setStorage } = require('../../utils/storage');

Page({
  data: {
    security: {
      phone: '',
      password: ''
    },
    form: {
      newPhone: '',
      currentPassword: '',
      newPassword: ''
    }
  },

  onShow() {
    const security = getStorage('LOCAL_SECURITY_INFO', { phone: '', password: '' });
    this.setData({ security });
  },

  onInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      form: {
        ...this.data.form,
        [field]: e.detail.value
      }
    });
  },

  /**
   * 更换手机号（本地模拟）
   */
  onChangePhone() {
    const { newPhone } = this.data.form;
    if (!newPhone) {
      wx.showToast({ title: '请输入新手机号', icon: 'none' });
      return;
    }
    const phoneReg = /^1\d{10}$/;
    if (!phoneReg.test(newPhone)) {
      wx.showToast({ title: '手机号格式错误', icon: 'none' });
      return;
    }
    const security = { ...this.data.security, phone: newPhone };
    setStorage('LOCAL_SECURITY_INFO', security);
    this.setData({
      security,
      form: { ...this.data.form, newPhone: '' }
    });
    wx.showToast({ title: '手机号已更新', icon: 'success' });
  },

  /**
   * 修改密码（本地模拟）
   */
  onChangePassword() {
    const { currentPassword, newPassword } = this.data.form;
    const { password } = this.data.security;
    if (!newPassword || newPassword.length < 6) {
      wx.showToast({ title: '新密码至少 6 位', icon: 'none' });
      return;
    }
    if (password && currentPassword !== password) {
      wx.showToast({ title: '当前密码不正确', icon: 'none' });
      return;
    }
    const security = { ...this.data.security, password: newPassword };
    setStorage('LOCAL_SECURITY_INFO', security);
    this.setData({
      security,
      form: { ...this.data.form, currentPassword: '', newPassword: '' }
    });
    wx.showToast({ title: '密码已更新', icon: 'success' });
  }
});
