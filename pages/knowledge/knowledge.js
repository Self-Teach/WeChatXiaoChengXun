const { teaCategories, knowledgeSections } = require('../../utils/teaData');

Page({
  data: {
    categories: [],
    sections: {}
  },

  onLoad() {
    this.setData({
      categories: teaCategories,
      sections: knowledgeSections
    });
  },

  openCategory(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/knowledge/detail?id=${id}`
    });
  }
});
