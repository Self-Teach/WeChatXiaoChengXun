/**
 * utils/storage.js
 * 本工具文件封装微信小程序的本地存储操作，统一处理默认值和异常。
 */

/**
 * 从本地存储读取数据，如不存在则返回默认值。
 * @param {string} key 本地存储键名
 * @param {*} defaultValue 默认值
 * @returns {*} 读取到的数据或默认值
 */
function getStorage(key, defaultValue) {
  try {
    const value = wx.getStorageSync(key);
    if (value === '' || value === null || value === undefined) {
      return defaultValue;
    }
    return value;
  } catch (error) {
    console.warn('读取本地存储异常', key, error);
    return defaultValue;
  }
}

/**
 * 写入本地存储，封装错误捕获以便调试。
 * @param {string} key 本地存储键名
 * @param {*} value 需要写入的数据
 */
function setStorage(key, value) {
  try {
    wx.setStorageSync(key, value);
  } catch (error) {
    console.warn('写入本地存储异常', key, error);
  }
}

module.exports = {
  getStorage,
  setStorage
};
