// pages/index/index.js
// 首页逻辑：展示茶叶列表并支持快速加入购物车
const { teaList } = require('../../data/tea');
const cartUtil = require('../../utils/cart');

Page({
  data: {
    teaList: [],
    cartCount: 0
  },

  onLoad() {
    // 设置页面商品数据
    this.setData({
      teaList
    });
  },

  onShow() {
    // 每次显示页面更新购物车数量
    this.updateCartCount();
  },

  /**
   * 更新购物车角标数量
   */
  updateCartCount() {
    const cartList = cartUtil.getCartList();
    const totalQuantity = cartList.reduce((sum, item) => sum + item.quantity, 0);
    this.setData({
      cartCount: totalQuantity
    });
  },

  /**
   * 跳转到商品详情页
   */
  onTapProduct(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/product-detail/index?id=${id}`
    });
  },

  /**
   * 快速加入购物车：默认选择商品的第一个规格，数量 1
   */
  onAddToCart(e) {
    const { id } = e.currentTarget.dataset;
    const product = teaList.find((item) => item.id === id);
    if (!product) {
      return;
    }
    const firstSpec = product.specs && product.specs.length > 0 ? product.specs[0] : { id: 'default', name: '默认规格' };
    cartUtil.addToCart(product, {
      specId: firstSpec.id,
      specName: firstSpec.name,
      quantity: 1
    });
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
    this.updateCartCount();
  },

  /**
   * 悬浮按钮跳转购物车页
   */
  goCart() {
    wx.switchTab({
      url: '/pages/cart/index'
    });
  }
});
