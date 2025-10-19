// pages/productDetail/productDetail.js
// 展示单个商品的详细信息与购买操作
const app = getApp();

Page({
  data: {
    product: null,
    selectedSpec: '',
    selectedOption: '',
    quantity: 1
  },

  onLoad(options) {
    const { id } = options;
    const product = app.globalData.products.find((item) => item.id === id);
    if (product) {
      this.setData({
        product,
        selectedSpec: product.specs && product.specs.length ? product.specs[0] : '',
        selectedOption: product.options && product.options.length ? product.options[0] : ''
      });
    } else {
      wx.showToast({
        title: '未找到商品',
        icon: 'none'
      });
      wx.navigateBack();
    }
  },

  handleSpecChange(event) {
    this.setData({
      selectedSpec: event.detail.value
    });
  },

  handleOptionChange(event) {
    this.setData({
      selectedOption: event.detail.value
    });
  },

  increaseQty() {
    this.setData({
      quantity: this.data.quantity + 1
    });
  },

  decreaseQty() {
    if (this.data.quantity === 1) {
      return;
    }
    this.setData({
      quantity: this.data.quantity - 1
    });
  },

  addToCart() {
    const { product, selectedSpec, selectedOption, quantity } = this.data;
    if (!product) {
      return;
    }

    const cartItems = wx.getStorageSync('cartItems') || [];
    const index = cartItems.findIndex(
      (item) => item.id === product.id && item.spec === selectedSpec && item.option === selectedOption
    );

    if (index >= 0) {
      cartItems[index].quantity += quantity;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        // 购物车缩略图默认取首张主图，可在 data/products.js 中调整顺序或素材
        image: product.images[0],
        spec: selectedSpec,
        option: selectedOption,
        quantity
      });
    }

    wx.setStorageSync('cartItems', cartItems);
    app.globalData.cart = cartItems;

    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  },

  previewImage(event) {
    const { src } = event.currentTarget.dataset;
    wx.previewImage({
      current: src,
      urls: this.data.product.images
    });
  },

  onShareAppMessage() {
    const { product } = this.data;
    return {
      title: product ? `【云茶汇】${product.name}` : '云茶汇·云南茶叶',
      path: product ? `/pages/productDetail/productDetail?id=${product.id}` : '/pages/index/index'
    };
  }
});
