const { knowledgeArticles } = require('../../utils/teaData');

Page({
  data: {
    articles: []
  },

  onLoad() {
    this.setData({
      articles: knowledgeArticles
    });
  }
});
