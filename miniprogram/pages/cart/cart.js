// pages/cart/cart.js
// 购物车页面：负责本地购物车数据的展示与修改
Page({
  data: {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
  },

  onShow() {
    this.refreshCart();
  },

  refreshCart() {
    const cartItems = wx.getStorageSync('cart') || [];
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

    this.setData({ cartItems, totalQuantity, totalAmount });
  },

  increase(event) {
    const { id } = event.currentTarget.dataset;
    this.updateQuantity(id, 1);
  },

  decrease(event) {
    const { id } = event.currentTarget.dataset;
    this.updateQuantity(id, -1);
  },

  updateQuantity(id, delta) {
    const cart = wx.getStorageSync('cart') || [];
    const index = cart.findIndex((item) => item.id === id);
    if (index === -1) return;

    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    wx.setStorageSync('cart', cart);
    this.refreshCart();
  },

  removeItem(event) {
    const { id } = event.currentTarget.dataset;
    const cart = (wx.getStorageSync('cart') || []).filter((item) => item.id !== id);
    wx.setStorageSync('cart', cart);
    this.refreshCart();
  },

  checkout() {
    if (!this.data.cartItems.length) {
      wx.showToast({ title: '购物车为空', icon: 'none' });
      return;
    }

    wx.showModal({
      title: '提交订单',
      content: '确认提交订单吗？我们将保留购物车商品并跳转至订单中心。',
      success: (res) => {
        if (res.confirm) {
          const existingOrders = wx.getStorageSync('orders') || [];
          const newOrders = [
            ...existingOrders,
            {
              id: `order_${Date.now()}`,
              totalAmount: this.data.totalAmount,
              totalQuantity: this.data.totalQuantity,
              items: this.data.cartItems,
              createdAt: new Date().toLocaleString(),
            },
          ];
          wx.setStorageSync('orders', newOrders);
          wx.setStorageSync('cart', []);
          this.refreshCart();
          wx.showToast({ title: '订单已生成', icon: 'success' });
          setTimeout(() => {
            wx.navigateTo({ url: '/pages/orders/orders' });
          }, 500);
        }
      },
    });
  },

  goShopping() {
    wx.switchTab
      ? wx.switchTab({ url: '/pages/index/index' })
      : wx.navigateTo({ url: '/pages/index/index' });
  },
});
