// pages/address-list/index.js
// 地址管理列表逻辑：读取、删除地址并跳转到编辑页面
const { getStorage, setStorage } = require('../../utils/storage');

Page({
  data: {
    addressList: []
  },

  onShow() {
    this.loadAddress();
  },

  /**
   * 从本地存储读取地址列表
   */
  loadAddress() {
    const addressList = getStorage('LOCAL_ADDRESS_LIST', []);
    this.setData({ addressList });
  },

  /**
   * 跳转新增地址
   */
  onAddAddress() {
    wx.navigateTo({
      url: '/pages/address-edit/index'
    });
  },

  /**
   * 编辑地址
   */
  onEdit(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/address-edit/index?id=${id}`
    });
  },

  /**
   * 删除地址
   */
  onDelete(e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '确认删除',
      content: '删除后需要重新填写收货信息，确认删除？',
      success: (res) => {
        if (res.confirm) {
          const list = getStorage('LOCAL_ADDRESS_LIST', []);
          const newList = list.filter((item) => item.id !== id);
          setStorage('LOCAL_ADDRESS_LIST', newList);
          this.loadAddress();
          wx.showToast({
            title: '已删除',
            icon: 'none'
          });
        }
      }
    });
  }
});
