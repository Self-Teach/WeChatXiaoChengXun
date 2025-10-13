const { teaProducts } = require('../../../utils/teaData');

Page({
  data: {
    product: null,
    selectedSpec: null,
    quantity: 1
  },

  onLoad(options) {
    const { id } = options;
    this.loadProduct(id);
  },

  loadProduct(id) {
    const product = teaProducts.find((item) => item.id === id);
    if (!product) {
      wx.showToast({ title: '未找到商品', icon: 'error' });
      setTimeout(() => {
        wx.navigateBack({ delta: 1 });
      }, 1500);
      return;
    }

    const defaultSpec =
      product.specs.find((spec) => spec.id === product.defaultSpecId) || product.specs[0];

    this.setData({
      product,
      selectedSpec: defaultSpec,
      quantity: 1
    });

    wx.setNavigationBarTitle({ title: product.name });
  },

  selectSpec(event) {
    const { specId } = event.currentTarget.dataset;
    const { product } = this.data;
    if (!product) return;

    const spec = product.specs.find((item) => item.id === specId);
    if (!spec) return;

    this.setData({ selectedSpec: spec });
  },

  changeQuantity(event) {
    const { action } = event.currentTarget.dataset;
    let { quantity } = this.data;

    if (action === 'minus' && quantity > 1) {
      quantity -= 1;
    } else if (action === 'plus') {
      quantity += 1;
    }

    this.setData({ quantity });
  },

  addToCart() {
    const { product, selectedSpec, quantity } = this.data;
    if (!product || !selectedSpec) {
      wx.showToast({ title: '请选择规格', icon: 'none' });
      return;
    }

    const cart = wx.getStorageSync('cart') || [];
    const index = cart.findIndex(
      (item) => item.id === product.id && item.specId === selectedSpec.id
    );

    if (index > -1) {
      cart[index].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        origin: product.origin,
        image: product.image,
        price: selectedSpec.price,
        specId: selectedSpec.id,
        specLabel: selectedSpec.label,
        quantity
      });
    }

    wx.setStorageSync('cart', cart);
    wx.showToast({ title: '加入购物车成功', icon: 'success' });
  },

  buyNow() {
    wx.showToast({ title: '下单流程待开通', icon: 'none' });
  },

  onShareAppMessage() {
    const { product } = this.data;
    if (!product) {
      return {
        title: '云南茶坊好茶推荐',
        path: '/pages/index/index'
      };
    }

    return {
      title: `${product.name} | 云南茶坊`,
      path: `/pages/product/detail?id=${product.id}`
    };
  }
});
