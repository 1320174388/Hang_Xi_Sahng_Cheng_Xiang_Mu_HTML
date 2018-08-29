// pages/my/my.js
var config = require("../../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    administrator: wx.getStorageSync('admin_user_type_print'),
    //   菜单栏
    menuList: [{
        icon: "../images/fukuan.png",
        text: "待付款"
      },
      {
        icon: "../images/fahuo.png",
        text: "待发货"
      },
      {
        icon: "../images/shouhuo.png",
        text: "待收货"
      },
      {
        icon: "../images/pingjia.svg",
        text: "待评价"
      },
      {
        icon: "../images/shouhou.png",
        text: "已完成"
      },
    ]
  },
  //   点击购物车
  jump_shopping: function() {
    wx.switchTab({
      url: '../shopping/shopping'
    })
  },
  //点击分类的订单
  jump_myOrider: function(e) {
    var idx = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../myOrider/myOrider?idx=' + idx,
    })
  },
  //   点击全部订单
  jump_All_Order: function() {
    wx.navigateTo({
      url: '../myOrider/myOrider?idx=0',
    })
  },
  //点击我的地址
  jump_installAddress: function() {
    wx.chooseAddress({})
  },

  //点击我的收藏
  jump_myCollect: function() {
    wx.navigateTo({
      url: '../myCollect/myCollect',
    })
  },
  //   点击联系我们
  jump_lianxi: function() {
    wx.navigateTo({
      url: '../contactUs/contactUs',
    })
  },

  jump_Background: function() {
    wx.navigateTo({
      url: "/pages/back/Background/Background",
    })
  },
  getdata: function() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 聊天跳转
  costom: function(res) {
    var response = res;
    // 查看是否授权

    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          if (wx.getStorageSync('admin_user_type_print')) {
            getApp().request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
              adminFormid: response.detail.formId
            }, function (res) {
            }, 'post');
            wx.navigateTo({
              url: '../kefu/adminManage/adminManage',
            })
          } else {
            wx.navigateTo({
              url: '../kefu/ask/ask',
            })
          }
        } else {
          return false;
        }
      }
    })

  },
})