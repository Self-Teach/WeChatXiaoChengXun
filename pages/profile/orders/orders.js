/**
 * pages/profile/orders/orders.js
 * 功能：展示订单状态分类页签与对应订单列表的占位视图，便于后续接入真实订单接口。
 * 用法：由个人中心跳转；tabs/activeTab 控制当前展示的订单集合。
 * 尺寸（可调）：标签宽度 160rpx、卡片间距 24rpx，可在 orders.wxss 中调整。
 * 背景/配色：图标来源 utils/icons.js；卡片背景沿用设计令牌。
 * 位置/布局：scroll-view 横向标签，订单列表纵向排列。
 * 交互（事件/回调）：switchTab 切换当前标签；onLoad 可读取 query.tab 以默认定位到指定状态。
 * 依赖/风险：当前 orders 为本地 mock；接入接口时需处理分页、加载与异常状态。
 * 后期修改指引：接入后端后统一在 fetchOrders 中处理请求并缓存，避免多次 setData。
 */
const { ICONS } = require('../../../utils/icons');

const orderTabs = [
  { key: 'pendingPay', label: '待付款', icon: ICONS.pendingPay },
  { key: 'pendingSend', label: '待发货', icon: ICONS.pendingSend },
  { key: 'pendingReceive', label: '待收货', icon: ICONS.pendingReceive },
  { key: 'pendingReview', label: '待评价', icon: ICONS.pendingReview },
  { key: 'afterSale', label: '退款/售后', icon: ICONS.afterSale }
];

const mockOrders = {
  pendingPay: [],
  pendingSend: [],
  pendingReceive: [],
  pendingReview: [],
  afterSale: []
};

Page({
  data: {
    tabs: orderTabs,
    activeTab: orderTabs[0].key,
    orders: mockOrders
  },

  onLoad(options) {
    if (options && options.tab && mockOrders[options.tab] !== undefined) {
      this.setData({ activeTab: options.tab });
    }
  },

  switchTab(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ activeTab: key });
  }
});
