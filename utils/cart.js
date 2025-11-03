/**
 * utils/cart.js
 * 购物车相关逻辑的封装，统一管理增删改查与价格计算。
 */
const { getStorage, setStorage } = require('./storage');

// 购物车在本地存储中的键名，方便统一修改
const CART_KEY = 'LOCAL_CART_DATA';

/**
 * 获取当前购物车列表
 * @returns {Array}
 */
function getCartList() {
  return getStorage(CART_KEY, []);
}

/**
 * 将购物车列表写回本地存储
 * @param {Array} list
 */
function saveCartList(list) {
  setStorage(CART_KEY, list);
}

/**
 * 添加商品到购物车
 * @param {Object} product 商品对象
 * @param {Object} options 额外参数，如规格与数量
 */
function addToCart(product, options) {
  const { specId, specName, quantity } = options;
  const list = getCartList();
  // 判断是否已经存在同款同规格
  const existingIndex = list.findIndex(
    (item) => item.id === product.id && item.specId === specId
  );
  if (existingIndex > -1) {
    list[existingIndex].quantity += quantity;
    list[existingIndex].subtotal = list[existingIndex].price * list[existingIndex].quantity;
  } else {
    list.push({
      id: product.id,
      name: product.name,
      specId,
      specName,
      price: product.price,
      quantity,
      checked: true, // 默认选中
      image: product.images && product.images.length > 0 ? product.images[0] : '',
      subtotal: product.price * quantity
    });
  }
  saveCartList(list);
}

/**
 * 更新购物车中某项的数量
 * @param {string} id 商品 id
 * @param {string} specId 规格 id
 * @param {number} quantity 新数量
 */
function updateQuantity(id, specId, quantity) {
  const list = getCartList();
  const target = list.find((item) => item.id === id && item.specId === specId);
  if (target) {
    target.quantity = quantity > 1 ? quantity : 1;
    target.subtotal = target.quantity * target.price;
    saveCartList(list);
  }
}

/**
 * 切换选中状态
 */
function toggleCheck(id, specId) {
  const list = getCartList();
  const target = list.find((item) => item.id === id && item.specId === specId);
  if (target) {
    target.checked = !target.checked;
    saveCartList(list);
  }
}

/**
 * 设置所有商品的选中状态
 */
function toggleAll(check) {
  const list = getCartList().map((item) => ({ ...item, checked: check }));
  saveCartList(list);
}

/**
 * 删除购物车中的某项
 */
function removeItem(id, specId) {
  const list = getCartList().filter((item) => !(item.id === id && item.specId === specId));
  saveCartList(list);
}

/**
 * 计算购物车金额汇总
 */
function calcSummary() {
  const list = getCartList();
  const summary = list.reduce(
    (acc, item) => {
      if (item.checked) {
        acc.totalPrice += item.subtotal;
        acc.totalQuantity += item.quantity;
      }
      return acc;
    },
    { totalPrice: 0, totalQuantity: 0 }
  );
  return summary;
}

/**
 * 结算已选中的商品
 * @returns {{orderItems: Array, leftItems: Array, totalPrice: number}}
 */
function checkoutSelected() {
  const list = getCartList();
  const selectedItems = list.filter((item) => item.checked);
  const leftItems = list.filter((item) => !item.checked);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
  saveCartList(leftItems);
  return {
    orderItems: selectedItems,
    leftItems,
    totalPrice
  };
}

module.exports = {
  CART_KEY,
  getCartList,
  saveCartList,
  addToCart,
  updateQuantity,
  toggleCheck,
  toggleAll,
  removeItem,
  calcSummary,
  checkoutSelected
};
