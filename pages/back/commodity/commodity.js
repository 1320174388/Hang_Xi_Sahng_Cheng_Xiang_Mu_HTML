// pages/commodity/commodity.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: config.hostUrl,
    datas: '',
  },
  jump_Addcommodity: function() {
    wx.navigateTo({
      url: '../Addcommodity/Addcommodity',
    })
  },
  jump_Modifycommodity: function(e) {
    var index = e.target.dataset.index;
    var idx = this.data.datas[index].good_index;
    wx.navigateTo({
      url: '../Modifycommodity/Modifycommodity?idx=' + idx,
    })
  },
  jump_commodityDetails: function(e) {
    var index = e.target.dataset.index;
    var idx = this.data.datas[index].good_index;
    console.log(idx)
    wx.navigateTo({
      url: '../commodityDetails/commodityDetails?idx=' + idx,
    })
  },

  del: function(e) { 
    var that =this;
    var index = e.target.dataset.index;
    var idx = this.data.datas[index].good_index;  
    app.request(
      config.hostUrl + '/v1/good_module/good_delete/' + wx.getStorageSync('token'),{
        'goodIndex':idx
      },function(res){
        app.point(res.data.retMsg, 'none', 2000);
        that.onLoad();
      },'DELETE',
    )
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    app.request(
      config.hostUrl + '/v1/good_module/good_get_goodlist/' + wx.getStorageSync('token'), {
        goodLimit: 20
      },
      function(res) {
        that.setData({
          datas: res.data.retData
        })
      },
    )
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