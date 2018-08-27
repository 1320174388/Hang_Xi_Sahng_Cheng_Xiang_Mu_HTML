// pages/order/order.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: config.hostUrl,
    navbar: ['未付款', '已付款', '已发货', '已收货', '已完成'],
    currentTab: 0,
    orider_list: [], //
    list: [],
    searchPageNum: 0, // 设置加载的第几次，默认是第一次  
    searchLoadingComplete: false //“没有数据”的变量，默认false，隐藏
  },
  //导航条点击事件
  navbarTap: function(e) {
    var x = e.currentTarget.dataset.idx + 1;
    var list = [];
    for (var i = 0; i < this.data.orider_list.length; i++) {
      if (this.data.orider_list[i].order_status == x) {
        list[i] = this.data.orider_list[i];
      }
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      list: list
    })
  },
  jump_oriderDetails: function(e) {
    var num = this.data.list[e.currentTarget.dataset.index].order_number;
    wx.navigateTo({
      url: '../orderDetails/orderDetails?num=' + num,
    })
  },
  //滚动到底部触发事件  
  lower: function() {
    var that = this;
    var searchPageNum = that.data.searchPageNum + 1; //每次触发上拉事件，把searchPageNum+1 
    app.request(
      config.hostUrl + '/v1/order_module/getAllOrderList', {
        num: searchPageNum
      },
      function(res) {
        var list = [];
        var x = 0;
        for (var i = 0; i < res.data.retData.length; i++) {
          if (res.data.retData[i].order_status == that.data.currentTab) {
            list[x] = res.data.retData[i];
            x++;
          }
        }
        if (list.length == 12) {
          var newarr = that.data.list.concat(list)
          var arr = that.data.orider_list.concat(res.data.retData)
          that.setData({
            'orider_list': arr,
            'list': newarr,
            searchPageNum: searchPageNum,
            searchLoadingComplete: false,
          })
        } else if (list.length < 12) {
          var newarr = that.data.list.concat(list)
          var arr = that.data.orider_list.concat(res.data.retData)
          that.setData({
            'orider_list': arr,
            'list': newarr,
            searchPageNum: searchPageNum,
            searchLoadingComplete: true,
          })
        }
      }
    )
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
        var x = 0;
        for (var i = 0; i < res.data.retData.length; i++) {
          if (res.data.retData[i].order_status == 1) {
            list[x] = res.data.retData[i];
            x++;
          }
        }
        that.setData({
          'orider_list': res.data.retData,
          'list': list
        })
      }
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