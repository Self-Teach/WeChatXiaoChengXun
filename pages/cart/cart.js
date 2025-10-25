/**
 * pages/cart/cart.js
 * 功能：管理购物车页面的商品展示、数量调节、防抖持久化、选择状态机与批量操作，并输出吸底结算条。
 * 用法：在 app.json 注册为 tabBar 页面；依赖 utils/cartStorage.js 提供的读写 API，WXML 通过 items/selectedIds 渲染。
 * 尺寸（可调）：商品卡片高度 200rpx、图片宽高 180rpx；吸底条高度 160rpx 均在 cart.wxss 中以设计令牌调整。
 * 背景/配色（可调）：统一使用 styles/vars.wxss 的色板；底部按钮复用 .btn/.btn-primary 样式。
 * 位置/布局：列表采用纵向卡片，左侧多选指示；底部 sticky-bottom + safe-area-bottom 适配刘海屏。
 * 交互（事件/回调）：handleQuantityStep 防抖更新数量、toggleItemSelection 维护选中集合、toggleSelectAll/handleBatchDelete 管理批量；checkout 显示选中结果。
 * 依赖/风险：依赖 utils/icons.js 图标、utils/cartStorage.js 存储；需确保每个购物车条目包含唯一 id 字段。
 * 后期修改指引：接入后端时可将 loadCart 改为请求接口并在 persistCart 中调用接口同步；优惠券/满减请在 computeSummary 中集中计算。
 */
const { ICONS } = require('../../utils/icons');
const { getCartItems, setCartItems, computeCartCount } = require('../../utils/cartStorage');

Page({
  data: {
    ICONS,
    items: [],
    selectedIds: [],
    selectAll: true,
    totalPrice: '0.00',
    selectedAmount: '0.00',
    selectedCount: 0,
    isEditing: false,
    cartCount: 0,
    pageFooter: {
      icon: ICONS.pageCart,
      title: '结算温馨提示',
      desc: '确认茶叶规格、收货信息与配送时间，付款后请留意物流通知。'
    }
  },

  onShow() {
    this.loadCart();
  },

  onUnload() {
    if (this.persistTimer) {
      clearTimeout(this.persistTimer);
    }
  },

  loadCart() {
    const items = getCartItems();
    const selectedIds = items.map((item) => item.id);
    this.applyCartState(items, selectedIds);
  },

  toggleEditMode() {
    this.setData({ isEditing: !this.data.isEditing });
  },

  handleQuantityStep(event) {
    const { id, step } = event.currentTarget.dataset;
    const items = this.data.items.map((item) => ({ ...item }));
    const target = items.find((item) => item.id === id);
    if (!target) {
      return;
    }
    const nextQuantity = target.quantity + Number(step);
    if (nextQuantity < 1) {
      wx.showToast({ title: '至少保留 1 件', icon: 'none' });
      return;
    }
    target.quantity = nextQuantity;
    this.schedulePersist(items, this.data.selectedIds);
  },

  handleQuantityInput(event) {
    const { id } = event.currentTarget.dataset;
    const value = Number(event.detail.value);
    const items = this.data.items.map((item) => ({ ...item }));
    const target = items.find((item) => item.id === id);
    if (!target) {
      return;
    }
    target.quantity = value > 0 ? value : 1;
    this.schedulePersist(items, this.data.selectedIds);
  },

  toggleItemSelection(event) {
    const { id } = event.currentTarget.dataset;
    const selectedIds = this.data.selectedIds.includes(id)
      ? this.data.selectedIds.filter((itemId) => itemId !== id)
      : this.data.selectedIds.concat(id);
    this.applyCartState(this.data.items, selectedIds);
  },

  toggleSelectAll() {
    const selectAll = !this.data.selectAll;
    const selectedIds = selectAll ? this.data.items.map((item) => item.id) : [];
    this.applyCartState(this.data.items, selectedIds);
  },

  removeItem(event) {
    const { id } = event.currentTarget.dataset;
    const items = this.data.items.filter((item) => item.id !== id);
    const selectedIds = this.data.selectedIds.filter((itemId) => itemId !== id);
    this.schedulePersist(items, selectedIds);
  },

  handleBatchDelete() {
    if (!this.data.selectedIds.length) {
      wx.showToast({ title: '请选择要删除的商品', icon: 'none' });
      return;
    }
    const items = this.data.items.filter((item) => !this.data.selectedIds.includes(item.id));
    this.schedulePersist(items, []);
  },

  clearCart() {
    wx.showModal({
      title: '清空购物车',
      content: '是否确定清空购物车内的所有商品？',
      success: (res) => {
        if (res.confirm) {
          this.schedulePersist([], []);
        }
      }
    });
  },

  checkout() {
    if (!this.data.selectedIds.length) {
      wx.showToast({ title: '请选择商品', icon: 'none' });
      return;
    }
    wx.showToast({
      title: `共 ${this.data.selectedCount} 件，￥${this.data.selectedAmount}`,
      icon: 'none'
    });
  },

  goShop() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  schedulePersist(items, selectedIds) {
    if (this.persistTimer) {
      clearTimeout(this.persistTimer);
    }
    this.pendingItems = items;
    this.pendingSelectedIds = selectedIds;
    this.persistTimer = setTimeout(() => {
      const normalized = setCartItems(this.pendingItems);
      const cleanedSelection = this.pendingSelectedIds.filter((id) => normalized.some((item) => item.id === id));
      this.applyCartState(normalized, cleanedSelection);
      this.persistTimer = null;
      this.pendingItems = null;
      this.pendingSelectedIds = null;
    }, 180);
  },

  applyCartState(items, selectedIds) {
    const totalPrice = this.computeAmount(items);
    const selectedSummary = this.computeAmount(items.filter((item) => selectedIds.includes(item.id)), true);
    const cartCount = computeCartCount(items);
    this.setData({
      items,
      selectedIds,
      selectAll: items.length ? selectedIds.length === items.length : false,
      totalPrice: totalPrice,
      selectedAmount: selectedSummary.amount,
      selectedCount: selectedSummary.count,
      cartCount
    });
  },

  computeAmount(items, withCount = false) {
    const summary = items.reduce(
      (acc, item) => {
        const subtotal = (item.price || 0) * (item.quantity || 0);
        acc.amount += subtotal;
        acc.count += item.quantity || 0;
        return acc;
      },
      { amount: 0, count: 0 }
    );
    if (withCount) {
      return {
        amount: summary.amount.toFixed(2),
        count: summary.count
      };
    }
    return summary.amount.toFixed(2);
  }
});
