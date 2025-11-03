// pages/knowledge-category/index.js
// 分类详情逻辑，展示静态分类信息
const { categories } = require('../../data/knowledge');

Page({
  data: {
    categories: []
  },

  onLoad() {
    this.setData({
      categories
    });
  }
});
