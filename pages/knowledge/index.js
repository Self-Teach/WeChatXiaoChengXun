// pages/knowledge/index.js
// 茶叶知识主页面逻辑：展示各模块入口和内容
const { origins, storageTips, brewGuides } = require('../../data/knowledge');

Page({
  data: {
    origins: [],
    storageTips: [],
    brewGuides: []
  },

  onLoad() {
    // 页面加载时设置静态数据
    this.setData({
      origins,
      storageTips,
      brewGuides
    });
  },

  /**
   * 跳转到茶类分类详细页
   */
  goCategory() {
    wx.navigateTo({
      url: '/pages/knowledge-category/index'
    });
  }
});
