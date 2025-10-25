# 云茶汇 WeChat Mini Program

基于微信原生能力实现的云南茶销售示例小程序，配套本地数据源与统一设计令牌，适合演示与二次开发。

## 快速开始

1. **导入项目**：打开微信开发者工具 → 选择“导入项目” → 指向本仓库根目录 → 可选择“无 AppID”快速预览。
2. **基础库版本**：建议使用基础库 **≥ 2.29.0**，以获得 CSS 变量、`scroll-view` flex、`pageScrollTo` 等能力。
3. **真机域名白名单**：若后续接入接口，请在 `project.config.json` → `network` 字段配置合法域名或在微信公众平台后台设置，避免真机调试失败。
4. **依赖安装**（用于 lint/格式化）：`npm install`，然后运行 `npm run lint` 或 `npm run format`。

## 目录结构

```
├── app.js / app.json / app.wxss       # 全局入口与配置
├── data/                              # 本地“数据库”数据源
├── docs/                              # 设计令牌与整改审计文档
├── pages/
│   ├── index/                         # 商品精选页（搜索、筛选、懒加载）
│   ├── knowledge/                     # 茶叶科普（目录锚点、分享）
│   ├── cart/                          # 购物车（多选、吸底结算）
│   └── profile/                       # 个人中心及子页面（地址、订单、安全）
├── styles/                            # reset/vars/util 三件套
├── utils/                             # cartStorage、icons 等工具
└── project.config.json                # 微信小程序项目配置
```

## 导航与页面扩展

- **新增页面**：
  1. 在 `pages/` 下创建目录并补齐 `.js/.json/.wxml/.wxss`；
  2. 在 `app.json` → `pages` 数组追加路径；
  3. 若需加入底部导航，在 `tabBar.list` 中新增对象并指定 `iconPath`/`selectedIconPath`（81×81px）；
  4. 按照 `docs/design-tokens.md` 使用工具类和注释模板。
- **修改 tabBar**：
  - 只需调整 `app.json` 中 `tabBar` 的 `text`/`iconPath`/`selectedColor`；
  - 自定义样式可在 `styles/util.wxss` 中扩展工具类或启用自定义 tabBar 组件。

## 设计令牌与样式

- `styles/reset.wxss`：重置默认样式。
- `styles/vars.wxss`：唯一的设计令牌入口，统一管理色板、字号、间距、阴影。
- `styles/util.wxss`：常用工具类（排版、布局、按钮、safe-area 等）。
- 详细说明参见 [`docs/design-tokens.md`](docs/design-tokens.md)。

## 工程脚本

`package.json` 提供以下命令：

- `npm run lint`：使用 ESLint 检查 `pages/`、`data/`、`utils/`。
- `npm run format`：使用 Prettier 统一代码风格。
- `npm run build:screenshots`：预留脚本，可在需要截图或构建资源时扩展。

CI 工作流 `.github/workflows/lint.yml` 会在 Pull Request 中自动执行 `npm run lint`。

## 接口与存储占位

- 当前所有业务数据使用 `data/` 目录内的静态文件；
- 购物车状态通过 `utils/cartStorage.js` 缓存到 `wx.setStorageSync`；
- 个人中心地址示例使用 `profileAddresses` 本地键位，后续接入后端时可复用。

## 文档

- [`docs/design-tokens.md`](docs/design-tokens.md)：设计令牌/变量总览与使用示例。
- [`docs/audit.md`](docs/audit.md)：整改项与最佳实践对照表。

> 建议在提交前执行 `npm run lint`，并在 PR 中补充性能对比（首屏资源体积、setData 次数）。
