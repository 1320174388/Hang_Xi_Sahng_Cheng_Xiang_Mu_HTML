// pages/orderDetails/orderDetails.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: config.hostUrl,
    status: ['买家未付款', '买家已付款', '正在发货中', '等待买家收货', '订单已完成'],
    idx: "",
    orider: "",
    btn: ["取消", "确认发货", "确认收货", "完成", "完成"],
    hid: true,
  },
  btn_tap: function() {
    var that = this;
    if (that.data.idx == 0) {
      app.request(
        config.hostUrl + '/v1/order_module/setOrderState', {
          'order_number': that.data.orider.order_number,
          'order_status': 0
        },
        function (res) {},
      )
    } else if (that.data.idx == 1) {
      app.request(
        config.hostUrl + '/v1/order_module/setOrderState', {
          'order_number': that.data.orider.order_number,
          'order_status': 3
        },
        function (res) { console.log(res)},
      )
    }
    if (that.data.idx == 2) {
      app.request(
        config.hostUrl + '/v1/order_module/setOrderState', {
          'order_number': that.data.orider.order_number,
          'order_status': 4
        },
        function (res) {console.log(res)},
      )
    } else if (that.data.idx == 3 || that.data.idx == 4) {
      app.request(
        config.hostUrl + '/v1/order_module/setOrderState', {
          'order_number': that.data.orider.order_number,
          'order_status': 5
        },
        function (res) {
          console.log(res)
        },
      )
    }
    app.timeBack(2000)
  },
  btn_add_tap: function() {
    var that = this;
    app.request(
      config.hostUrl + '/v1/order_module/setOrderState', {
        'order_number': that.data.orider.order_number,
        'order_status': 2
      },
      function(res) {
        console.log(res)
      },
    )
    app.timeBack(2000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var num = options.num;
    var that = this;
    app.request(
      config.hostUrl + '/v1/order_module/getOrderDetails', {
        'order_number': num
      },
      function(res) {
        var idx = res.data.retData.order_status - 1;
        that.setData({
          'orider': res.data.retData,
          'idx': idx,
        })
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