// pages/product-detail/index.js
// 商品详情页面逻辑：展示详细信息、规格选择、购买操作
const { teaList } = require('../../data/tea');
const cartUtil = require('../../utils/cart');
const { getStorage, setStorage } = require('../../utils/storage');

Page({
  data: {
    product: null,
    selectedSpecId: '',
    selectedSpecName: '',
    quantity: 1,
    comments: [
      {
        id: 'c1',
        user: '茶友阿明',
        date: '2023-12-18',
        content: '茶汤厚实顺滑，第三泡开始花香更明显，非常满意。'
      },
      {
        id: 'c2',
        user: '普洱研究社',
        date: '2023-11-02',
        content: '饼形端正，仓储干净，具备长期存放价值。'
      }
    ]
  },

  onLoad(options) {
    const { id } = options;
    const product = teaList.find((item) => item.id === id);
    if (product) {
      const defaultSpec = product.specs && product.specs.length > 0 ? product.specs[0] : { id: 'default', name: '默认规格' };
      this.setData({
        product,
        selectedSpecId: defaultSpec.id,
        selectedSpecName: defaultSpec.name
      });
    } else {
      wx.showToast({
        title: '商品不存在',
        icon: 'none'
      });
    }
  },

  onShareAppMessage() {
    const { product } = this.data;
    return {
      title: product ? `推荐好茶：${product.name}` : '云南茶叶馆',
      path: product ? `/pages/product-detail/index?id=${product.id}` : '/pages/index/index'
    };
  },

  /**
   * 切换规格
   */
  onSelectSpec(e) {
    const { id, name } = e.currentTarget.dataset;
    this.setData({
      selectedSpecId: id,
      selectedSpecName: name
    });
  },

  /**
   * 增加数量
   */
  onIncrease() {
    this.setData({
      quantity: this.data.quantity + 1
    });
  },

  /**
   * 减少数量，最小为 1
   */
  onDecrease() {
    const newQty = this.data.quantity - 1;
    this.setData({
      quantity: newQty > 1 ? newQty : 1
    });
  },

  /**
   * 加入购物车操作
   */
  onAddCart() {
    const { product, selectedSpecId, selectedSpecName, quantity } = this.data;
    if (!product) return;
    cartUtil.addToCart(product, {
      specId: selectedSpecId,
      specName: selectedSpecName,
      quantity
    });
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  },

  /**
   * 立即购买：直接生成一笔待付款订单并跳转订单列表
   */
  onBuyNow() {
    const { product, selectedSpecId, selectedSpecName, quantity } = this.data;
    if (!product) return;

    const orderItems = [
      {
        id: product.id,
        name: product.name,
        specId: selectedSpecId,
        specName: selectedSpecName,
        price: product.price,
        quantity,
        subtotal: product.price * quantity,
        image: product.images && product.images.length > 0 ? product.images[0] : ''
      }
    ];

    const totalPrice = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    const orderList = getStorage('LOCAL_ORDER_LIST', []);
    const orderId = `OD${Date.now()}`;
    orderList.unshift({
      orderId,
      status: '待付款',
      createTime: new Date().toLocaleString(),
      totalPrice,
      items: orderItems,
      address: null // 未选择地址时可为空
    });
    setStorage('LOCAL_ORDER_LIST', orderList);

    wx.showToast({
      title: '订单已创建',
      icon: 'success'
    });
    wx.navigateTo({
      url: `/pages/order-list/index?status=待付款`
    });
  }
});
