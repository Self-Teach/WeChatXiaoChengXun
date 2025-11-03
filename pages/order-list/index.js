// pages/order-list/index.js
// 订单列表页面逻辑：根据状态筛选并展示订单信息
const { getStorage } = require('../../utils/storage');

Page({
  data: {
    statusList: ['全部', '待付款', '待发货', '待收货', '待评价', '退款/售后'],
    currentStatus: '全部',
    orderList: [],
    displayOrders: []
  },

  onLoad(options) {
    const { status } = options;
    if (status) {
      this.setData({
        currentStatus: status
      });
    }
  },

  onShow() {
    this.loadOrders();
  },

  /**
   * 从本地存储读取订单数据
   */
  loadOrders() {
    const orderList = getStorage('LOCAL_ORDER_LIST', []);
    this.setData({ orderList });
    this.filterOrders();
  },

  /**
   * 根据当前状态筛选订单
   */
  filterOrders() {
    const { currentStatus, orderList } = this.data;
    if (currentStatus === '全部') {
      this.setData({ displayOrders: orderList });
    } else {
      const filtered = orderList.filter((order) => order.status === currentStatus);
      this.setData({ displayOrders: filtered });
    }
  },

  /**
   * 切换顶部状态标签
   */
  onSwitchStatus(e) {
    const { status } = e.currentTarget.dataset;
    this.setData({
      currentStatus: status
    });
    this.filterOrders();
  },

  /**
   * 查看订单详情的模拟行为
   */
  onMockAction(e) {
    const { id } = e.currentTarget.dataset;
    wx.showToast({
      title: `订单 ${id} 信息已记录`,
      icon: 'none'
    });
  }
});
