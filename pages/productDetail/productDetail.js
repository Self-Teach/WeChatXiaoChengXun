// pages/productDetail/productDetail.js
// 展示单个商品的详细信息与购买操作
const app = getApp();
const { getCartItems, setCartItems, upsertCartItem } = require('../../utils/cartStorage');

Page({
  data: {
    product: null,
    selectedSpec: '',
    selectedOption: '',
    quantity: 1
  },

  /**
   * 页面初始化：根据传入的商品 id 拉取详细数据。
   */
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

  /**
   * 下拉框选择新的规格。
   */
  handleSpecChange(event) {
    this.setData({
      selectedSpec: event.detail.value
    });
  },

  /**
   * 下拉框选择新的包装或选项。
   */
  handleOptionChange(event) {
    this.setData({
      selectedOption: event.detail.value
    });
  },

  /**
   * 增加购买数量。
   */
  increaseQty() {
    this.setData({
      quantity: this.data.quantity + 1
    });
  },

  /**
   * 减少购买数量，确保不少于 1。
   */
  decreaseQty() {
    if (this.data.quantity === 1) {
      return;
    }
    this.setData({
      quantity: this.data.quantity - 1
    });
  },

  /**
   * 将当前商品加入购物车，若已存在相同规格则叠加数量。
   */
  addToCart() {
    const { product, selectedSpec, selectedOption, quantity } = this.data;
    if (!product) {
      return;
    }

    const cartItems = getCartItems();
    const updatedItems = upsertCartItem(cartItems, {
      id: product.id,
      name: product.name,
      price: product.price,
      // 购物车缩略图默认取首张主图，可在 data/products.js 中调整顺序或素材
      image: product.images[0],
      spec: selectedSpec,
      option: selectedOption,
      quantity
    });

    setCartItems(updatedItems);

    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  },

  /**
   * 点击详情图预览大图。
   */
  previewImage(event) {
    const { src } = event.currentTarget.dataset;
    wx.previewImage({
      current: src,
      urls: this.data.product.images
    });
  },

  /**
   * 小程序原生分享配置。
   */
  onShareAppMessage() {
    const { product } = this.data;
    return {
      title: product ? `【云茶汇】${product.name}` : '云茶汇·云南茶叶',
      path: product ? `/pages/productDetail/productDetail?id=${product.id}` : '/pages/index/index'
    };
  }
});
