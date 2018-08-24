// pages/home/fillOrider/fillOrider.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: false,
  },
  jump_oriderDetail: function() {
    wx.navigateTo({
      url: '../oriderDetail/oriderDetail',
    })
  },
  jump_installAddress: function(){
wx.navigateTo({
  url: '../installAddress/installAddress',
})
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //获取订单详情
    app.request(
      config.hostUrl + '/v1/order_module/getOrderDetails', {
        order_number: ''
      },
      function (res) {
        console.log(res)
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