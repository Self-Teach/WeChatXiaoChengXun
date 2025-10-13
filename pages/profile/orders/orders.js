// pages/profile/orders/orders.js
// 展示各类订单状态
const { ICONS } = require('../../../utils/icons');

const orderTabs = [
  { key: 'pendingPay', label: '待付款', icon: ICONS.pendingPay },
  { key: 'pendingSend', label: '待发货', icon: ICONS.pendingSend },
  { key: 'pendingReceive', label: '待收货', icon: ICONS.pendingReceive },
  { key: 'pendingReview', label: '待评价', icon: ICONS.pendingReview },
  { key: 'afterSale', label: '退款/售后', icon: ICONS.afterSale }
];

const mockOrders = {
  pendingPay: [
    {
      id: 'order001',
      productName: '易武古树普洱生茶',
      price: 368,
      status: '待付款',
      time: '2024-05-10 19:30'
    }
  ],
  pendingSend: [
    {
      id: 'order002',
      productName: '勐海大树熟茶',
      price: 298,
      status: '待发货',
      time: '2024-05-08 11:10'
    }
  ],
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

  switchTab(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      activeTab: key
    });
  }
});
