// utils/icons.js
// 定义项目中复用的 SVG 图标，统一配色与风格，便于在多个页面使用。

const ICONS = {
  cart:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M12 12h4l4 18h14l4-14H18" fill="none" stroke="%23ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="21" cy="36" r="3" fill="%23ffffff"/><circle cx="33" cy="36" r="3" fill="%23ffffff"/></svg>',
  pendingPay:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="%23f9f5ec"/><path d="M24 14a2 2 0 0 1 2 2v6h2a4 4 0 1 1 0 8h-4a2 2 0 0 0 0 4h6a2 2 0 1 1 0 4h-2v2a2 2 0 1 1-4 0v-2h-2a6 6 0 1 1 0-12h2v-6a2 2 0 0 1 2-2z" fill="%23c9791f"/></svg>',
  pendingSend:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="6" y="12" width="36" height="24" rx="6" fill="%23f0f7f4"/><path d="M12 18h20l6 6v6H12z" fill="%230a8a4a"/><path d="M32 18v6h6" fill="none" stroke="%23ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="36" r="3" fill="%23ffffff"/><circle cx="32" cy="36" r="3" fill="%23ffffff"/></svg>',
  pendingReceive:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M12 18a12 12 0 0 1 24 0v6h2a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4h2z" fill="%23eef6f1"/><path d="M24 10a8 8 0 0 0-8 8v16h16V18a8 8 0 0 0-8-8z" fill="%230a8a4a"/><path d="M20 22a4 4 0 1 1 8 0v4a4 4 0 1 1-8 0z" fill="%23ffffff"/></svg>',
  pendingReview:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="10" y="10" width="28" height="28" rx="6" fill="%23f5f3ff"/><path d="M18 18h12" stroke="%235857b2" stroke-width="3" stroke-linecap="round"/><path d="M18 24h8" stroke="%235857b2" stroke-width="3" stroke-linecap="round"/><path d="M24 30h12l-6 6" fill="none" stroke="%235857b2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  afterSale:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="%23e8f6f0"/><path d="M30 16h6v6" stroke="%230a8a4a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 32h-6v-6" stroke="%230a8a4a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 16 16 32" stroke="%2313b067" stroke-width="3" stroke-linecap="round"/></svg>'
};

const SECTION_ICONS = {
  category:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M10 28a14 14 0 0 1 28 0v4a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6z" fill="%23e8f6f0"/><path d="M24 14a10 10 0 0 0-10 10v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8A10 10 0 0 0 24 14z" fill="%230a8a4a"/><path d="M20 24c1.5-2.4 3.7-3.6 7-3.6" stroke="%23ffffff" stroke-width="3" stroke-linecap="round"/></svg>',
  origin:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M24 6C15.16 6 8 13.16 8 22a22 22 0 0 0 6.45 15.56L24 45l9.55-7.44A22 22 0 0 0 40 22c0-8.84-7.16-16-16-16z" fill="%23f5f0e6"/><circle cx="24" cy="22" r="6" fill="%23c9791f"/></svg>',
  storage:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="12" y="12" width="24" height="28" rx="6" fill="%23f0f7f4"/><path d="M18 20h12v4H18zm0 8h12v4H18z" fill="%230a8a4a"/><path d="M20 12V8h8v4" stroke="%230a8a4a" stroke-width="3" stroke-linecap="round"/></svg>',
  brew:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M12 20h24v6c0 6.63-5.37 12-12 12S12 32.63 12 26z" fill="%23e8f6f0"/><path d="M18 16a6 6 0 0 1 12 0" stroke="%230a8a4a" stroke-width="3" stroke-linecap="round"/><rect x="16" y="22" width="16" height="4" fill="%2313b067"/><path d="M28 12c0-2 1-3 2-4" stroke="%2313b067" stroke-width="3" stroke-linecap="round"/></svg>'
};

module.exports = {
  ICONS,
  SECTION_ICONS
};
