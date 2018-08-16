// pages/my/my.js
var config = require("../../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   菜单栏
      menuList:[
          {
              icon:"../images/fukuan.png",
              text:"待付款"
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
//
  jump_myOrider: function () {
    wx.navigateTo({
      url: '../myOrider/myOrider',
    })
  },
  //
  jump_installAddress:function(){
    wx.navigateTo({
      url: '../installAddress/installAddress',
    })
  },

  //
  jump_myCollect: function () {
    wx.navigateTo({
      url: '../myCollect/myCollect',
    })
  },

  jump_Background:function(){
wx.navigateTo({
  url: "/pages/back/Background/Background",
})
  },
  getdata:function(){

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
    // 聊天跳转
    costom: function (res) {
        var response = res;
        // 查看是否授权

        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {

                    getApp().request(config.hostUrl + '/v1/login_module/login_admin/' + wx.getStorageSync('token'), {},
                        function (res) {
                            if (res.data.retData) {
                                getApp().request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
                                    adminFormid: response.detail.formId
                                }, function (res) {
                                    console.log(res);
                                }, 'post');
                                wx.navigateTo({
                                    url: '../kefu/adminManage/adminManage',
                                })
                            } else {
                                wx.navigateTo({
                                    url: '../kefu/ask/ask',
                                })
                            }
                        }, 'post')
                } else {
                    return false;
                }
            }
        })

    },
})