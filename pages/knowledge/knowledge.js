/**
 * pages/knowledge/knowledge.js
 * 功能：组织科普页的内容目录、锚点定位、折叠面板与分享逻辑，为用户提供系统化的茶学信息浏览体验。
 * 用法：被 app.json 注册为 tabBar 页面之一；在 WXML 中通过 sections/quickFacts 等数据渲染，可作为新增知识模块的模板。
 * 尺寸（可调）：目录芯片高度 72rpx、折叠卡片内边距 24rpx，均在 knowledge.wxss 中以 var(--spacing-*) 调整。
 * 背景/配色（可调）：采用 styles/vars.wxss 中的 --color-primary / --color-accent；若需换肤仅需调整设计令牌。
 * 位置/布局：目录支持横向滚动；章节容器通过 page-container + card 组合保证一致留白，小屏端自动换行。
 * 交互（事件/回调）：toggleSection 折叠面板、scrollToSection 锚点定位、handleShareButton 打开原生分享面板、onShareAppMessage 定义分享卡片。
 * 依赖/风险：依赖 data/knowledge.js 数据结构、utils/icons.js 图标映射；锚点计算依赖基础库 createSelectorQuery，滚动容器需保留 id 与 data-anchor。
 * 后期修改指引：新增章节→在 data/knowledge.js 增加对象并在 onLoad 中映射 anchor；目录样式调整请修改 knowledge.wxss 内的 .catalog-* 类。
 */
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
    ICONS,
    sections: [],
    quickFacts: [],
    brewSteps: [],
    originHighlights: [],
    teaArtCulture: [],
    catalog: [],
    activeAnchor: '',
    pageFooter: {
      icon: ICONS.pageKnowledge,
      title: '茶学延伸',
      desc: '收藏此页或分享给朋友，及时复习云南茶的产区、储存与冲泡方法。'
    }
  },

  onLoad() {
    const sections = knowledgeSections.map((section, index) => ({
      ...section,
      icon: SECTION_ICONS[section.id],
      expanded: index === 0,
      anchor: `section-${section.id}`
    }));
    const catalog = sections.map((section) => ({
      id: section.id,
      label: section.title,
      anchor: section.anchor
    }));

    this.setData({
      sections,
      quickFacts,
      brewSteps,
      originHighlights,
      teaArtCulture,
      catalog,
      activeAnchor: catalog.length ? catalog[0].anchor : ''
    });

    wx.nextTick(() => {
      this.computeSectionRects();
    });
  },

  onShow() {
    // 返回页面时重新计算，兼容字体缩放或内容变更。
    this.computeSectionRects();
  },

  onPageScroll({ scrollTop }) {
    if (!this.sectionRects || !this.sectionRects.length) {
      return;
    }
    const offset = scrollTop + 120; // 预留导航高度
    const current = this.sectionRects.find((item, index) => {
      const next = this.sectionRects[index + 1];
      if (!next) {
        return offset >= item.top;
      }
      return offset >= item.top && offset < next.top;
    });
    if (current && current.anchor !== this.data.activeAnchor) {
      this.setData({ activeAnchor: current.anchor });
    }
  },

  onShareAppMessage() {
    return {
      title: '云茶汇科普：云南茶的产区、冲泡与收藏指南',
      path: '/pages/knowledge/knowledge'
    };
  },

  toggleSection(event) {
    const { id } = event.currentTarget.dataset;
    const sections = this.data.sections.map((section) => ({
      ...section,
      expanded: section.id === id ? !section.expanded : false
    }));
    this.setData({ sections });
    wx.nextTick(() => {
      this.computeSectionRects();
    });
  },

  scrollToSection(event) {
    const { anchor } = event.currentTarget.dataset;
    if (!anchor) {
      return;
    }
    this.setData({ activeAnchor: anchor });
    wx.pageScrollTo({
      selector: `#${anchor}`,
      duration: 260,
      offsetTop: -80
    });
  },

  handleShareButton() {
    wx.showShareMenu({ withShareTicket: true });
    wx.showToast({ title: '请使用右上角分享', icon: 'none' });
  },

  computeSectionRects() {
    const query = wx.createSelectorQuery();
    query.selectAll('.knowledge-section').boundingClientRect();
    query.exec((res) => {
      if (!res || !res[0]) {
        return;
      }
      this.sectionRects = res[0].map((rect) => ({
        anchor: rect.id,
        top: rect.top
      }));
    });
  }
});
