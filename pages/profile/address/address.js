// pages/profile/address/address.js
// 管理收货地址信息
Page({
  data: {
    addresses: [
      {
        id: 'addr001',
        name: '李山茶',
        phone: '138****5620',
        region: '云南省 昆明市 五华区',
        detail: '翠湖西路88号云茶汇体验店',
        isDefault: true
      },
      {
        id: 'addr002',
        name: '王品茶',
        phone: '139****8846',
        region: '云南省 西双版纳州 勐海县',
        detail: '茶山大道18号',
        isDefault: false
      }
    ]
  },

  setDefault(event) {
    const { id } = event.currentTarget.dataset;
    const addresses = this.data.addresses.map((item) => ({
      ...item,
      isDefault: item.id === id
    }));
    this.setData({ addresses });
    wx.showToast({
      title: '已设为默认地址',
      icon: 'success'
    });
  },

  addAddress() {
    wx.showToast({
      title: '示例环境，暂不支持新增',
      icon: 'none'
    });
  }
});
