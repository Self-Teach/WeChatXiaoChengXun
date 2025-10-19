// pages/knowledge/knowledge.js
// 科普知识展示页面
const {
  knowledgeSections,
  quickFacts,
  brewSteps,
  originHighlights,
  teaArtCulture
} = require('../../data/knowledge');
const { SECTION_ICONS } = require('../../utils/icons');

Page({
  data: {
    sections: [],
    quickFacts: [],
    brewSteps: [],
    originHighlights: [],
    teaArtCulture: []
  },

  onLoad() {
    // 初始化时给每个模块增加展开状态，默认首个展开
    const sections = knowledgeSections.map((section, index) => ({
      ...section,
      icon: SECTION_ICONS[section.id],
      expanded: index === 0
    }));

    this.setData({
      sections,
      quickFacts,
      brewSteps,
      originHighlights,
      teaArtCulture
    });
  },

  toggleSection(event) {
    const { id } = event.currentTarget.dataset;
    const sections = this.data.sections.map((section) => ({
      ...section,
      expanded: section.id === id ? !section.expanded : false
    }));
    this.setData({ sections });
  }
});
