// pages/Background/Background.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  Jump_classification: function() {
    wx.navigateTo({
      url: "../classification/classification",
    })
  },

  Jump_commodity: function () {
    wx.navigateTo({
      url: "../commodity/commodity",
    })
  },

  Jump_order: function () {
    wx.navigateTo({
      url:"../order/order",
    })
  },
  Jump_img:function(){
    wx.navigateTo({
      url: "../banner/banner",
    })
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

  }
})