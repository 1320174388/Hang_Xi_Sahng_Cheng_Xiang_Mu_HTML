// pages/commodity/commodity.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  jump_Addcommodity:function(){
wx.navigateTo({
  url: '../Addcommodity/Addcommodity',
})
  },
  jump_commodityDetails:function(){
    wx.navigateTo({
      url: '../commodityDetails/commodityDetails',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that =this;
    app.request(
      config.hostUrl + '/v1/good_module/good_list/' + wx.getStorageSync('token'), {},
      function (res) {
        console.log(res)
        
      },
    )
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