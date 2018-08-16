// pages/my/my.js
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
  
  }
})