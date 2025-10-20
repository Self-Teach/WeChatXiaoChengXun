/**
 * utils/cartStorage.js
 * 统一维护购物车读写逻辑，避免在各页面重复硬编码本地存储键名。
 * 通过集中管理，方便后续扩展离线同步、优惠计算等进阶功能。
 */
const CART_STORAGE_KEY = 'cartItems';

/**
 * 从本地缓存中读取购物车数据。
 * 若首次使用或缓存异常，返回空数组，保证调用方逻辑稳定。
 */
function getCartItems() {
  const stored = wx.getStorageSync(CART_STORAGE_KEY);
  return Array.isArray(stored) ? stored : [];
}

/**
 * 将购物车数据写入本地缓存，并同步更新全局数据，方便不同页面共享。
 * @param {Array} items - 购物车商品列表，包含 id/spec/option/quantity 等字段。
 * @returns {Array} 写入后的标准化列表，便于链式调用。
 */
function setCartItems(items = []) {
  const normalized = Array.isArray(items) ? items : [];
  wx.setStorageSync(CART_STORAGE_KEY, normalized);
  const app = getApp();
  if (app && app.globalData) {
    app.globalData.cart = normalized;
  }
  return normalized;
}

/**
 * 计算购物车商品总件数，可用于徽章显示或结算校验。
 */
function computeCartCount(items = []) {
  return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
}

/**
 * 将商品加入购物车：
 * - 若已存在同 id+规格+选项的商品，则叠加数量；
 * - 否则以新条目推入，保持 immutability 便于调试。
 */
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
