// utils/icons.js
// 定义项目中复用的图标路径，统一管理，便于在多个页面使用本地资源。

const ICONS = {
  // 购物车悬浮按钮与导航栏可用图标，位于 image/icons 目录
  cart: '/image/icons/icon-cart.svg',
  // 搜索框左侧图标，可替换为 image/icons/icon-search.svg
  search: '/image/icons/icon-search.svg',
  // 搜索框筛选图标，可替换 image/icons/icon-filter.svg
  filter: '/image/icons/icon-filter.svg',
  // 页面顶部徽章使用的图标，可在 image/icons 目录中替换为本地素材
  pageHome: '/image/icons/icon-page-home.svg',
  pageKnowledge: '/image/icons/icon-page-knowledge.svg',
  pageCart: '/image/icons/icon-page-cart.svg',
  pageProfile: '/image/icons/icon-page-profile.svg',
  pendingPay: '/image/icons/icon-pending-pay.svg',
  pendingSend: '/image/icons/icon-pending-send.svg',
  pendingReceive: '/image/icons/icon-pending-receive.svg',
  pendingReview: '/image/icons/icon-pending-review.svg',
  afterSale: '/image/icons/icon-after-sale.svg',
  profileAddress: '/image/icons/icon-profile-address.svg',
  profileSecurity: '/image/icons/icon-profile-security.svg',
  profileService: '/image/icons/icon-profile-service.svg'
};

const SECTION_ICONS = {
  // 科普页折叠面板的配图，可替换 image/icons/icon-knowledge-*.svg
  category: '/image/icons/icon-knowledge-category.svg',
  origin: '/image/icons/icon-knowledge-origin.svg',
  storage: '/image/icons/icon-knowledge-storage.svg',
  brew: '/image/icons/icon-knowledge-brew.svg',
  culture: '/image/icons/icon-knowledge-culture.svg'
};

module.exports = {
  ICONS,
  SECTION_ICONS
};
