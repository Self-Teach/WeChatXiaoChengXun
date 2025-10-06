// pages/address/address.js
// 地址管理页面：维护本地收货地址列表
Page({
  data: {
    addresses: [],
    formData: {
      name: '',
      phone: '',
      region: '',
      detail: '',
    },
  },

  onShow() {
    this.refreshAddress();
  },

  refreshAddress() {
    const addresses = wx.getStorageSync('addresses') || [];
    this.setData({ addresses });
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

  saveAddress() {
    const { name, phone, region, detail } = this.data.formData;
    if (!name || !phone || !region || !detail) {
      wx.showToast({ title: '请完整填写地址信息', icon: 'none' });
      return;
    }
    if (!/^\d{11}$/.test(phone)) {
      wx.showToast({ title: '请输入 11 位手机号', icon: 'none' });
      return;
    }

    const addresses = wx.getStorageSync('addresses') || [];
    addresses.push({
      id: `addr_${Date.now()}`,
      name,
      phone,
      region,
      detail,
    });
    wx.setStorageSync('addresses', addresses);
    wx.showToast({ title: '地址已保存', icon: 'success' });
    this.setData({
      formData: { name: '', phone: '', region: '', detail: '' },
    });
    this.refreshAddress();
  },

  removeAddress(event) {
    const { id } = event.currentTarget.dataset;
    const addresses = (wx.getStorageSync('addresses') || []).filter((item) => item.id !== id);
    wx.setStorageSync('addresses', addresses);
    this.refreshAddress();
  },
});
