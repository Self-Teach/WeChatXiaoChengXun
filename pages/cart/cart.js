Page({
  data: {
    cartItems: [],
    totalAmount: 0
  },

  onShow() {
    this.loadCart();
  },

  loadCart() {
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      cartItems: cart
    });
    this.calculateTotal(cart);
  },

  calculateTotal(cart) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.setData({ totalAmount: total.toFixed(2) });
  },

  changeQuantity(event) {
    const { id, action } = event.currentTarget.dataset;
    const cart = [...(this.data.cartItems || [])];
    const index = cart.findIndex((item) => item.id === id);
    if (index === -1) return;

    if (action === 'minus' && cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else if (action === 'plus') {
      cart[index].quantity += 1;
    } else if (action === 'minus' && cart[index].quantity === 1) {
      wx.showModal({
        title: '提示',
        content: '是否从购物车移除此商品？',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1);
            this.updateCart(cart);
          }
        }
      });
      return;
    }

    this.updateCart(cart);
  },

  removeItem(event) {
    const { id } = event.currentTarget.dataset;
    const cart = [...(this.data.cartItems || [])].filter((item) => item.id !== id);
    this.updateCart(cart);
  },

  clearCart() {
    wx.showModal({
      title: '清空购物车',
      content: '确定要清空所有商品吗？',
      success: (res) => {
        if (res.confirm) {
          this.updateCart([]);
        }
      }
    });
  },

  updateCart(cart) {
    wx.setStorageSync('cart', cart);
    this.setData({ cartItems: cart });
    this.calculateTotal(cart);
  },

  goToCheckout() {
    if (!this.data.cartItems.length) {
      wx.showToast({ title: '购物车为空', icon: 'none' });
      return;
    }

    wx.showToast({
      title: '下单流程待接入',
      icon: 'none'
    });
  },

  goShopping() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
});
