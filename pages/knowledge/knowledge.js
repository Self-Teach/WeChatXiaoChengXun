// pages/knowledge/knowledge.js
// 科普知识展示页面
const {
  knowledgeSections,
  quickFacts,
  brewSteps,
  originHighlights,
  teaArtCulture
} = require('../../data/knowledge');
const { ICONS, SECTION_ICONS } = require('../../utils/icons');

Page({
  data: {
    pageFooter: {
      // 页面底部说明图标，可替换 image/icons/icon-page-knowledge.svg
      icon: ICONS.pageKnowledge,
      title: '茶学延伸',
      desc: '继续探索云南茶旅、器具与礼俗，让品茗不仅是味觉享受，更成为生活美学。'
    },
    sections: [],
    quickFacts: [],
    brewSteps: [],
    originHighlights: [],
    teaArtCulture: []
  },

  /**
   * 页面加载：注入本地科普数据，并标记默认展开项。
   */
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

  /**
   * 折叠面板切换，始终保持仅有一项展开，提升阅读聚焦。
   */
  toggleSection(event) {
    const { id } = event.currentTarget.dataset;
    const sections = this.data.sections.map((section) => ({
      ...section,
      expanded: section.id === id ? !section.expanded : false
    }));
    this.setData({ sections });
  }
});
