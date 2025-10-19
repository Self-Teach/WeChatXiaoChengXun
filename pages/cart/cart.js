// pages/cart/cart.js
// 购物车页面，展示本地存储的商品信息
const app = getApp();
const { ICONS } = require('../../utils/icons');

Page({
  data: {
    items: [],
    totalPrice: 0,
    pageFooter: {
      // 页面底部说明图标，可替换 image/icons/icon-page-cart.svg
      icon: ICONS.pageCart,
      title: '结算温馨提示',
      desc: '确认茶叶数量、规格与收货地址，再提交订单享受云南好茶。'
    }
  },

  onShow() {
    this.loadCart();
  },

  loadCart() {
    const items = wx.getStorageSync('cartItems') || [];
    this.setData({ items });
    this.updateTotalPrice(items);
  },

  updateTotalPrice(items = this.data.items) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.setData({ totalPrice: total.toFixed(2) });
  },

  increaseQty(event) {
    const { index } = event.currentTarget.dataset;
    const items = [...this.data.items];
    items[index].quantity += 1;
    this.persistCart(items);
  },

  decreaseQty(event) {
    const { index } = event.currentTarget.dataset;
    const items = [...this.data.items];
    if (items[index].quantity === 1) {
      return;
    }
    items[index].quantity -= 1;
    this.persistCart(items);
  },

  removeItem(event) {
    const { index } = event.currentTarget.dataset;
    const items = [...this.data.items];
    items.splice(index, 1);
    this.persistCart(items);
  },

  clearCart() {
    wx.showModal({
      title: '清空购物车',
      content: '是否确定清空购物车内的所有商品？',
      success: (res) => {
        if (res.confirm) {
          this.persistCart([]);
        }
      }
    });
  },

  checkout() {
    wx.showToast({
      title: '提交订单成功',
      icon: 'success'
    });
  },

  goShop() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  persistCart(items) {
    this.setData({ items });
    this.updateTotalPrice(items);
    wx.setStorageSync('cartItems', items);
    app.globalData.cart = items;
  }
});
