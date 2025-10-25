# 云茶汇设计令牌（Design Tokens）

| Token 类别 | 名称 | 数值/取值 | 说明 |
| --- | --- | --- | --- |
| 色板 | `--color-primary` | `#6B4E3D` | 普洱褐主色，导航栏/标题高亮使用 |
| 色板 | `--color-primary-light` | `#8C6A55` | 主色高亮渐变上层，用于按钮渐变终点 |
| 色板 | `--color-primary-press` | `#543B2D` | 主色按压态 |
| 色板 | `--color-accent` | `#00A381` | 翡翠绿点缀，标签/链接等强调使用 |
| 色板 | `--color-accent-soft` | `rgba(0, 163, 129, 0.14)` | 点缀色柔化背景，徽章/提示使用 |
| 色板 | `--color-bg` | `#F7F8FA` | 页面背景浅灰 |
| 色板 | `--color-card` | `#FFFFFF` | 卡片通用白底 |
| 色板 | `--color-muted` | `#6F6F6F` | 次要文字色 |
| 色板 | `--color-text` | `#1F1F1F` | 主文字色 |
| 色板 | `--color-danger` | `#D64545` | 错误/警示（购物车徽章） |
| 间距 | `--spacing-4 ~ --spacing-48` | `8rpx` 步进 | 全局统一 margin/padding 刻度 |
| 字号 | `--font-xs ~ --font-xxl` | `22rpx~44rpx` | 文案字号阶梯，配合 `--line-*` 行高使用 |
| 圆角 | `--radius-sm/md/lg/pill` | `12rpx/20rpx/28rpx/999rpx` | 卡片、按钮圆角 |
| 阴影 | `--shadow-sm/md/lg` | `rgba(39,33,30,0.08~0.16)` | 卡片、浮层阴影 |

## 使用原则

1. **全局入口**：在 `app.wxss` 引入 `styles/vars.wxss`，所有页面/组件通过 `var(--token)` 取值。
2. **避免散值**：若遇到设计稿新数值，先判断是否可复用现有令牌，若确需新增，在 `styles/vars.wxss` 扩展并更新本表。
3. **主题切换**：换肤时优先修改令牌值，无需在页面内逐个修改色值；暗色模式可在 `page` 上加数据属性切换一组变量。
4. **尺寸刻度**：字号/间距采用 4rpx 步长，保证不同组件间的对齐；骨架屏/卡片留白等都应引用 `--spacing-*`。

## 组合示例

```wxml
<!-- 卡片按钮示例 -->
<view class="card p-24 shadow-sm">
  <text class="text-md text-bold">云南茶礼盒</text>
  <button class="btn btn-primary mt-16">立即选购</button>
</view>
```

```wxss
/* 局部新增样式时仍应引用令牌 */
.custom-banner {
  padding: var(--spacing-32);
  background: linear-gradient(135deg, rgba(107, 78, 61, 0.08), rgba(0, 163, 129, 0.12));
  border-radius: var(--radius-lg);
}
```
