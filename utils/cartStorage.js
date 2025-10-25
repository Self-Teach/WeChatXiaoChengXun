/**
 * 功能：统一封装购物车在本地缓存的读写与数量计算逻辑，为各页面提供稳定 API，减少 setData 次数与重复代码。
 * 用法：在需要操作购物车的页面通过 require 引入 getCartItems/setCartItems/upsertCartItem/computeCartCount 等函数。
 * 尺寸（可调）：不涉及视觉；若购物车数据结构新增字段，请在此统一扩展，避免页面手动维护。
 * 背景/配色（可调）：无视觉输出，如需在页面提示状态请在页面 WXSS 使用设计令牌。
 * 位置/布局：无 UI；但全局数据挂载在 app.globalData.cart，页面读取时保持与此文件同步。
 * 交互（事件/回调）：setCartItems 会同步全局数据并返回标准化数组；外部可结合 wx.showToast 显示反馈。
 * 依赖/风险：依赖 wx.getStorageSync/wx.setStorageSync；若迁移到云开发或接口，请在此替换存储逻辑。
 * 后期修改指引：新增优惠或多店铺逻辑时，可增加额外 helper（如 applyDiscount）并在导出对象补充。
 */
const CART_STORAGE_KEY = 'cartItems';

function getCartItems() {
  const stored = wx.getStorageSync(CART_STORAGE_KEY);
  return Array.isArray(stored) ? stored : [];
}

function setCartItems(items = []) {
  const normalized = Array.isArray(items) ? items : [];
  wx.setStorageSync(CART_STORAGE_KEY, normalized);
  const app = getApp();
  if (app && app.globalData) {
    app.globalData.cart = normalized;
  }
  return normalized;
}

function computeCartCount(items = []) {
  return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
}

function upsertCartItem(items = [], payload) {
  const list = Array.isArray(items) ? [...items] : [];
  const { id, spec, option } = payload;
  const index = list.findIndex((item) => item.id === id && item.spec === spec && item.option === option);

  if (index >= 0) {
    list[index].quantity += payload.quantity;
  } else {
    list.push(payload);
  }

  return list;
}

module.exports = {
  CART_STORAGE_KEY,
  getCartItems,
  setCartItems,
  computeCartCount,
  upsertCartItem
};
