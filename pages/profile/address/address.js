/**
 * pages/profile/address/address.js
 * 功能：示例化展示收货地址列表，支持设置默认地址并提示未来接入表单的改造点。
 * 用法：在 profile 页面点击“地址管理”后跳转；地址数据存储于页面 data，可替换为接口返回。
 * 尺寸（可调）：卡片内边距、字体大小参照 address.wxss，默认使用设计令牌。
 * 背景/配色：无特别主题；若需要换肤请在 address.wxss 中通过变量调整。
 * 位置/布局：列表按照数据顺序展示；setDefault 会确保仅有一条 isDefault 为 true。
 * 交互（事件/回调）：setDefault 设置默认地址；addAddress 提示示例环境，不实际新增。
 * 依赖/风险：示例数据仅本地可见；接入后端后需替换为真实接口并处理加载状态。
 * 后期修改指引：新增地址编辑功能时可拆分为单独组件或使用 wx:form，通过 storage key 与 profile 页面共享。
 */
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

  setDefault(event) {
    const { id } = event.currentTarget.dataset;
    const addresses = this.data.addresses.map((item) => ({
      ...item,
      isDefault: item.id === id
    }));
    this.setData({ addresses });
    wx.showToast({ title: '已设为默认地址', icon: 'success' });
  },

  addAddress() {
    wx.showToast({ title: '示例环境，暂不支持新增', icon: 'none' });
  }
});
