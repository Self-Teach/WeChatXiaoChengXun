// pages/cart/cart.js
// 购物车页面，展示本地存储的商品信息
const { ICONS } = require('../../utils/icons');
const { getCartItems, setCartItems } = require('../../utils/cartStorage');

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

  /**
   * 每次进入购物车页面都重新读取本地缓存，避免数据不同步。
   */
  onShow() {
    this.loadCart();
  },

  /**
   * 从缓存中读取购物车数据并更新金额。
   */
  loadCart() {
    const items = getCartItems();
    this.setData({ items });
    this.updateTotalPrice(items);
  },

  /**
   * 根据商品单价与数量计算总价，保留两位小数。
   */
  updateTotalPrice(items = this.data.items) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.setData({ totalPrice: total.toFixed(2) });
  },

  /**
   * 增加单个商品数量。
   */
  increaseQty(event) {
    const { index } = event.currentTarget.dataset;
    const items = [...this.data.items];
    items[index].quantity += 1;
    this.persistCart(items);
  },

  /**
   * 减少单个商品数量，最少为 1。
   */
  decreaseQty(event) {
    const { index } = event.currentTarget.dataset;
    const items = [...this.data.items];
    if (items[index].quantity === 1) {
      return;
    }
    items[index].quantity -= 1;
    this.persistCart(items);
  },

  /**
   * 删除指定索引的商品行。
   */
  removeItem(event) {
    const { index } = event.currentTarget.dataset;
    const items = [...this.data.items];
    items.splice(index, 1);
    this.persistCart(items);
  },

  /**
   * 清空购物车前弹窗确认，防止误触。
   */
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

  /**
   * 结算按钮示例，实际项目可跳转至下单流程。
   */
  checkout() {
    wx.showToast({
      title: '提交订单成功',
      icon: 'success'
    });
  },

  /**
   * 当购物车为空时引导返回精选页继续挑选。
   */
  goShop() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  /**
   * 将最新的购物车状态写回缓存与全局数据。
   */
  persistCart(items) {
    const normalized = setCartItems(items);
    this.setData({ items: normalized });
    this.updateTotalPrice(normalized);
  }
});
