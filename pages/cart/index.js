// pages/cart/index.js
// 购物车页面逻辑：展示、修改购物车数据并支持结算生成订单
const cartUtil = require('../../utils/cart');
const { getStorage, setStorage } = require('../../utils/storage');

Page({
  data: {
    cartList: [],
    allChecked: false,
    summary: {
      totalPrice: 0,
      totalQuantity: 0
    }
  },

  onShow() {
    this.loadCart();
  },

  /**
   * 加载购物车数据并更新汇总
   */
  loadCart() {
    const list = cartUtil.getCartList();
    const allChecked = list.length > 0 && list.every((item) => item.checked);
    const summary = cartUtil.calcSummary();
    this.setData({
      cartList: list,
      allChecked,
      summary
    });
  },

  /**
   * 切换全选
   */
  onToggleAll() {
    const { allChecked } = this.data;
    cartUtil.toggleAll(!allChecked);
    this.loadCart();
  },

  /**
   * 切换单个商品勾选
   */
  onToggleItem(e) {
    const { id, spec } = e.currentTarget.dataset;
    cartUtil.toggleCheck(id, spec);
    this.loadCart();
  },

  /**
   * 增加数量
   */
  onIncrease(e) {
    const { id, spec } = e.currentTarget.dataset;
    const target = this.data.cartList.find((item) => item.id === id && item.specId === spec);
    if (target) {
      cartUtil.updateQuantity(id, spec, target.quantity + 1);
      this.loadCart();
    }
  },

  /**
   * 减少数量
   */
  onDecrease(e) {
    const { id, spec } = e.currentTarget.dataset;
    const target = this.data.cartList.find((item) => item.id === id && item.specId === spec);
    if (target) {
      const newQty = target.quantity - 1;
      cartUtil.updateQuantity(id, spec, newQty < 1 ? 1 : newQty);
      this.loadCart();
    }
  },

  /**
   * 删除商品
   */
  onDelete(e) {
    const { id, spec } = e.currentTarget.dataset;
    cartUtil.removeItem(id, spec);
    wx.showToast({
      title: '已删除',
      icon: 'none'
    });
    this.loadCart();
  },

  /**
   * 结算选中商品并生成订单
   */
  onCheckout() {
    const { orderItems, totalPrice } = cartUtil.checkoutSelected();
    if (orderItems.length === 0) {
      wx.showToast({
        title: '请先选择商品',
        icon: 'none'
      });
      this.loadCart();
      return;
    }
    const orderList = getStorage('LOCAL_ORDER_LIST', []);
    const addressList = getStorage('LOCAL_ADDRESS_LIST', []);
    const orderId = `OD${Date.now()}`;
    orderList.unshift({
      orderId,
      status: '待付款',
      createTime: new Date().toLocaleString(),
      totalPrice,
      items: orderItems,
      address: addressList.length > 0 ? addressList[0] : null
    });
    setStorage('LOCAL_ORDER_LIST', orderList);
    wx.showToast({
      title: '订单已生成',
      icon: 'success'
    });
    this.loadCart();
    wx.navigateTo({
      url: '/pages/order-list/index?status=待付款'
    });
  },

  /**
   * 空状态跳转首页
   */
  goHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
});
