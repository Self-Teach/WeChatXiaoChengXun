// pages/knowledge/knowledge.js
// 茶叶科普页面：读取本地知识数据并展示
const { knowledgeList } = require('../../data/knowledge');

Page({
  data: {
    knowledge: knowledgeList,
  },
});
