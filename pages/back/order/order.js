// pages/order/order.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['未付款', '已付款', '已发货', '已收货', '已完成'],
    currentTab: 0,
    orider_list: [], //
    list: [],
  },
  //导航条点击事件
  navbarTap: function(e) {
    var x = e.currentTarget.dataset.idx+1;
    console.log(x)
    // this.setData({
    //   currentTab: e.currentTarget.dataset.idx
    // })
    var list = [];
    for (var i = 0; i < this.data.orider_list.length; i++) {  
      if (this.data.orider_list[i].order_status==x){
        list =this.data.orider_list[i];
        console.log(list)
        console.log(i)
        // this.setData({
        //   currentTab: e.currentTarget.dataset.idx,
        //   list:list
        // })
      }
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      list: list
    })
  },
  jump_oriderDetails: function(e) {
    console.log(e)
    var num = this.data.list[e.currentTarget.dataset.index].order_number;
    console.log(num)
   
    wx.navigateTo({
      url: '../orderDetails/orderDetails?num='+num,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    app.request(
      config.hostUrl + '/v1/order_module/getAllOrderList', {},
      function(res) {
        var list = [];
        for (var i = 0; i < res.data.retData.length; i++) {
          if (res.data.retData[i].order_status == 1) {
            list[i] = res.data.retData[i];
          }}
          console.log(list)
        that.setData({
          'orider_list': res.data.retData,
          'list': list
        })
        console.log(res.data.retData)
        console.log(that.data.list)
        console.log(that.data.list[0].order_number)
      },

    );
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