const { teaCategories } = require('../../../utils/teaData');

Page({
  data: {
    category: null
  },

  onLoad(options) {
    const { id } = options;
    this.loadCategory(id);
  },

  loadCategory(id) {
    const category = teaCategories.find((item) => item.id === id);
    if (!category) {
      wx.showToast({ title: '暂无相关知识', icon: 'none' });
      setTimeout(() => {
        wx.navigateBack({ delta: 1 });
      }, 1500);
      return;
    }

    this.setData({ category });
    wx.setNavigationBarTitle({ title: category.name });
  },

  onShareAppMessage() {
    const { category } = this.data;
    if (!category) {
      return {
        title: '云南茶知识百科',
        path: '/pages/knowledge/knowledge'
      };
    }

    return {
      title: `${category.name} | 云南茶知识`,
      path: `/pages/knowledge/detail?id=${category.id}`
    };
  }
});
