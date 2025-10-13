// pages/knowledge/knowledge.js
// 科普知识展示页面
const { knowledgeSections } = require('../../data/knowledge');

Page({
  data: {
    sections: []
  },

  onLoad() {
    // 初始化时给每个模块增加展开状态，默认首个展开
    const sections = knowledgeSections.map((section, index) => ({
      ...section,
      expanded: index === 0
    }));
    this.setData({ sections });
  },

  toggleSection(event) {
    const { id } = event.currentTarget.dataset;
    const sections = this.data.sections.map((section) => ({
      ...section,
      expanded: section.id === id ? !section.expanded : section.expanded
    }));
    this.setData({ sections });
  }
});
