// pages/index/index.js
// 商品主页面逻辑：负责展示茶叶列表与购物车操作
const { teas } = require('../../data/teas');

Page({
  data: {
    teas,
    cartCount: 0,
  },

  onShow() {
    // 页面展示时同步购物车数量
    this.updateCartCount();
  },

  updateCartCount() {
    const cart = wx.getStorageSync('cart') || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    this.setData({ cartCount: total });
  },

  addToCart(event) {
    const { id } = event.currentTarget.dataset;
    const targetTea = this.data.teas.find((tea) => tea.id === id);
    if (!targetTea) {
      wx.showToast({ title: '商品不存在', icon: 'none' });
      return;
    }

    const cart = wx.getStorageSync('cart') || [];
    const index = cart.findIndex((item) => item.id === id);

    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        id: targetTea.id,
        name: targetTea.name,
        price: targetTea.price,
        image: targetTea.image,
        weight: targetTea.weight,
        quantity: 1,
      });
    }

    wx.setStorageSync('cart', cart);
    this.updateCartCount();
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  },

  goToKnowledge() {
    wx.navigateTo({ url: '/pages/knowledge/knowledge' });
  },

  goToProfile() {
    wx.navigateTo({ url: '/pages/profile/profile' });
  },

  goToCart() {
    wx.navigateTo({
      url: '/pages/cart/cart',
    });
  },
});
