// pages/home/contactUs/contactUs.js
var config = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      markers: [{
          id: 0,
          latitude: 39.636547,
          longitude: 116.327238,
          width: 50,
          height: 50,
      }],
  },
  // 地老天荒logo和热线
  phone_dlth: function () {
    wx.makePhoneCall({
      phoneNumber: '01086220269'
    })
  },

    // 二维码点击事件
    EwmDj:function(){
        wx.previewImage({
            urls: [config.hostUrl+'/uploads/static/user.jpg'],
        })
    },
    // 点击拨打电话
    phoneCall:function(){
        wx.makePhoneCall({
            phoneNumber: '18310379198',
        })
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