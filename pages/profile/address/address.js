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
      }
    ]
  },

  /**
   * 设为默认地址，确保同时只有一条记录为默认状态。
   */
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

  /**
   * 示例环境下提示不可新增，真实业务可替换为表单或跳转。
   */
  addAddress() {
    wx.showToast({
      title: '示例环境，暂不支持新增',
      icon: 'none'
    });
  }
});
