/**
 * pages/profile/profile.js
 * 功能：构建个人中心首页，提供登录模拟、订单状态标签页、地址本占位（本地存储）以及常用工具导航。
 * 用法：作为 tabBar 页面使用；WXML 读取 loggedIn/orderTabs/addressList 等数据，操作按钮调用此文件的方法。
 * 尺寸（可调）：头部卡片高度 240rpx、头像 120rpx，均在 profile.wxss 中通过设计令牌可调；订单标签宽度 160rpx。
 * 背景/配色：沿用 styles/vars.wxss 色板；强调文本使用 text-primary/text-accent 工具类统一色值。
 * 位置/布局：头部卡片使用栅格布局，订单标签横向滚动；地址列表为纵向卡片，预留未来接入后端空间。
 * 交互（事件/回调）：handleLogin 模拟登录、handleOrderTab 切换标签、handleAddressMock 写入示例地址、clearAddressMock 清空缓存。
 * 依赖/风险：依赖 utils/icons.js 图标映射以及本地存储键 profileAddresses；接入真实接口前需替换读写逻辑。
 * 后期修改指引：后续接入后端时优先在 ADDRESS_STORAGE_KEY 下替换为接口返回值，并在 README 的后端接入段落注明接口路径。
 */
const { ICONS } = require('../../utils/icons');

const ADDRESS_STORAGE_KEY = 'profileAddresses';

Page({
  data: {
    ICONS,
    loggedIn: false,
    userName: '游客',
    orderTabs: [
      { key: 'all', label: '全部订单' },
      { key: 'pendingPay', label: '待付款' },
      { key: 'pendingSend', label: '待发货' },
      { key: 'pendingReceive', label: '待收货' },
      { key: 'pendingReview', label: '待评价' }
    ],
    activeOrderTab: 'all',
    orderStatus: [
      { key: 'pendingPay', label: '待付款', icon: ICONS.pendingPay, count: 0 },
      { key: 'pendingSend', label: '待发货', icon: ICONS.pendingSend, count: 0 },
      { key: 'pendingReceive', label: '待收货', icon: ICONS.pendingReceive, count: 0 },
      { key: 'pendingReview', label: '待评价', icon: ICONS.pendingReview, count: 0 },
      { key: 'afterSale', label: '退款/售后', icon: ICONS.afterSale, count: 0 }
    ],
    quickEntries: [
      {
        key: 'address',
        label: '地址管理',
        desc: '常用收货地址一键更新',
        icon: ICONS.profileAddress,
        action: 'goAddress'
      },
      {
        key: 'security',
        label: '账号与安全',
        desc: '修改手机号与登录密码',
        icon: ICONS.profileSecurity,
        action: 'goSecurity'
      },
      {
        key: 'service',
        label: '客服服务',
        desc: '添加客服微信 SelfLearner',
        icon: ICONS.profileService,
        action: 'openContact'
      }
    ],
    addressList: [],
    addressTips: '后续接入后端后在此展示默认地址与配送备注。',
    pageFooter: {
      icon: ICONS.pageProfile,
      title: '账户贴士',
      desc: '完善收货信息并关注账号安全设置，畅享专属云茶会员权益。'
    }
  },

  onShow() {
    this.loadAddresses();
  },

  handleLogin() {
    this.setData({
      loggedIn: true,
      userName: '云茶会员'
    });
    wx.showToast({ title: '登录成功', icon: 'success' });
  },

  handleOrderTab(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ activeOrderTab: key });
  },

  handleOrderCardTap(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ activeOrderTab: key });
    this.goOrders();
  },

  goOrders() {
    wx.navigateTo({ url: '/pages/profile/orders/orders' });
  },

  goAddress() {
    wx.navigateTo({ url: '/pages/profile/address/address' });
  },

  goSecurity() {
    wx.navigateTo({ url: '/pages/profile/security/security' });
  },

  handleQuickEntry(event) {
    const { action } = event.currentTarget.dataset;
    if (action && typeof this[action] === 'function') {
      this[action]();
    }
  },

  openContact() {
    wx.showModal({
      title: '客服咨询',
      content: '请添加微信号 SelfLearner 或拨打 400-888-8888 咨询订单问题。',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  handleAddressMock() {
    const addresses = this.data.addressList.concat({
      id: `addr-${Date.now()}`,
      contact: '示例收件人',
      phone: '13800001111',
      detail: '云南省昆明市呈贡区云茶大道 99 号',
      tag: '默认'
    });
    wx.setStorageSync(ADDRESS_STORAGE_KEY, addresses);
    this.loadAddresses();
    wx.showToast({ title: '示例地址已保存', icon: 'none' });
  },

  clearAddressMock() {
    wx.removeStorageSync(ADDRESS_STORAGE_KEY);
    this.loadAddresses();
  },

  loadAddresses() {
    const stored = wx.getStorageSync(ADDRESS_STORAGE_KEY);
    const addressList = Array.isArray(stored) ? stored : [];
    this.setData({ addressList });
  }
});
