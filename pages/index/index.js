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

    const spec =
      teaItem.specs.find((item) => item.id === teaItem.defaultSpecId) || teaItem.specs[0];
    const existingIndex = cart.findIndex((item) => item.id === id && item.specId === spec.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: teaItem.id,
        name: teaItem.name,
        origin: teaItem.origin,
        image: teaItem.image,
        price: spec.price,
        specId: spec.id,
        specLabel: spec.label,
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

  openDetail(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/product/detail?id=${id}`
    });
  },

  goToCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  }
});
