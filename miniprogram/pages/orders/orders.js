// pages/orders/orders.js
// 订单页面：展示本地存储的历史订单
Page({
  data: {
    orders: [],
  },

  onShow() {
    const orders = wx.getStorageSync('orders') || [];
    const displayOrders = [...orders].reverse();
    this.setData({ orders: displayOrders });
  },
});
