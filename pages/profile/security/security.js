// pages/profile/security/security.js
// 账号安全选项展示
Page({
  data: {
    securityOptions: [
      {
        title: '更换手机号',
        desc: '绑定新的联系电话，确保联系畅通'
      },
      {
        title: '修改登录密码',
        desc: '定期修改密码，保障账号安全'
      },
      {
        title: '安全中心',
        desc: '查看登录设备、异常提醒等安全信息'
      }
    ]
  },

  /**
   * 示例操作提示。真实项目中可跳转至身份验证或客服页面。
   */
  handleAction() {
    wx.showToast({
      title: '示例环境，暂不支持操作',
      icon: 'none'
    });
  }
});
