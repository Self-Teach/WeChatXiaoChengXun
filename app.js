// app.js
App({
  globalData: {
    cart: []
  },
  onLaunch() {
    // 初始化购物车数据，从本地缓存读取
    const storedCart = wx.getStorageSync('cart');
    if (storedCart) {
      this.globalData.cart = storedCart;
    } else {
      wx.setStorageSync('cart', []);
    }
  }
});
