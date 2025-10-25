/**
 * 功能：集中维护项目中重复使用的本地图标路径，避免在页面硬编码字符串并便于统一替换资源。
 * 用法：在需要展示图标的页面/组件中 require ICONS 或 SECTION_ICONS；新增图标时先将素材置于 image/icons 下再在此登记。
 * 尺寸（可调）：tabBar 图标建议 81×81px；信息卡片/按钮图标常用 64-96rpx，可在页面 WXSS 控制。
 * 背景/配色（可调）：若要切换主题风格，可直接替换 SVG 文件或增加不同色阶的 icon 版本，在此新增键名区分。
 * 位置/布局：分类字段与 data/knowledge.js 的 section id 对应；tabBar iconPath 在 app.json 读取这些路径。
 * 交互（事件/回调）：无直接交互；页面通过 open-type="share" 等原生能力触发分享时可引用 share 图标。
 * 依赖/风险：确保所有路径在 image/icons 存在；若迁移到 CDN，请统一更改此文件以免遗漏。
 * 后期修改指引：批量替换图标可通过脚本读取本文件生成清单；新增品类请同步更新 README 的资源说明。
 */
const ICONS = {
  cart: '/image/icons/icon-cart.svg',
  search: '/image/icons/icon-search.svg',
  filter: '/image/icons/icon-filter.svg',
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
