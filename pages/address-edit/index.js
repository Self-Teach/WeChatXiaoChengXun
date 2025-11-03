// pages/address-edit/index.js
// 地址编辑逻辑：新增或修改地址信息并持久化到本地存储
const { getStorage, setStorage } = require('../../utils/storage');

Page({
  data: {
    addressId: '',
    form: {
      name: '',
      phone: '',
      region: '',
      detail: ''
    }
  },

  onLoad(options) {
    const { id } = options;
    if (id) {
      this.setData({ addressId: id });
      const list = getStorage('LOCAL_ADDRESS_LIST', []);
      const target = list.find((item) => item.id === id);
      if (target) {
        this.setData({ form: target });
      }
    }
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

  onTextarea(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      form: {
        ...this.data.form,
        [field]: e.detail.value
      }
    });
  },

  /**
   * 保存地址
   */
  onSubmit() {
    const { form, addressId } = this.data;
    if (!form.name || !form.phone || !form.region || !form.detail) {
      wx.showToast({
        title: '请完整填写信息',
        icon: 'none'
      });
      return;
    }
    const phoneReg = /^1\d{10}$/;
    if (!phoneReg.test(form.phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      });
      return;
    }

    const list = getStorage('LOCAL_ADDRESS_LIST', []);
    if (addressId) {
      const index = list.findIndex((item) => item.id === addressId);
      if (index > -1) {
        list[index] = { ...form, id: addressId };
      }
    } else {
      const newId = `ADDR${Date.now()}`;
      list.unshift({ ...form, id: newId });
    }
    setStorage('LOCAL_ADDRESS_LIST', list);
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
    setTimeout(() => {
      wx.navigateBack();
    }, 500);
  }
});
