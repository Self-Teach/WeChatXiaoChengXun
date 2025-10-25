/**
 * pages/profile/security/security.js
 * 功能：展示账号安全相关入口的占位信息，提示未来可接入真实验证流程。
 * 用法：由个人中心跳转进入；securityOptions 数组控制列表内容。
 * 尺寸（可调）：卡片 padding 24rpx；可在 security.wxss 中调整。
 * 背景/配色：卡片与按钮沿用设计令牌；无额外色值。
 * 位置/布局：列表纵向排列，按钮统一调用 handleAction。
 * 交互（事件/回调）：handleAction 提示示例环境；接入真实业务时可跳转页面或弹出验证弹窗。
 * 依赖/风险：当前不涉及接口；后期接入需注意权限校验。
 * 后期修改指引：扩展双重验证或风险提示时，在 securityOptions 中增加条目并在 handleAction 中按 key 分发。
 */
Page({
  data: {
    securityOptions: [
      { title: '更换手机号', desc: '绑定新的联系电话，确保联系畅通' },
      { title: '修改登录密码', desc: '定期修改密码，保障账号安全' },
      { title: '安全中心', desc: '查看登录设备、异常提醒等安全信息' }
    ]
  },

  handleAction() {
    wx.showToast({ title: '示例环境，暂不支持操作', icon: 'none' });
  }
});
