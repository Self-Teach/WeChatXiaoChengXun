const { teaProducts } = require('../../utils/teaData');

Page({
  data: {
    teaList: [],
    cartCount: 0
  },

  onLoad() {
    this.setData({
      teaList: teaProducts
    });
  },

  onShow() {
    this.updateCartCount();
  },

  updateCartCount() {
    const cart = wx.getStorageSync('cart') || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    this.setData({ cartCount: count });
  },

  addToCart(event) {
    const { id } = event.currentTarget.dataset;
    const cart = wx.getStorageSync('cart') || [];
    const teaItem = teaProducts.find((tea) => tea.id === id);
    if (!teaItem) {
      wx.showToast({ title: '商品不存在', icon: 'error' });
      return;
    }

    const existingIndex = cart.findIndex((item) => item.id === id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        ...teaItem,
        quantity: 1
      });
    }

    wx.setStorageSync('cart', cart);
    this.updateCartCount();
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  },

  goToCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  }
});
