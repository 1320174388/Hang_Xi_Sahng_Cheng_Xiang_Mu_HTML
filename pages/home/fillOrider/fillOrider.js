// pages/home/fillOrider/fillOrider.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orider: '',
    hid: true,
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: false, // 全选状态时为true
    host: config.hostUrl,
  },
  /**
   * 点击弹框外部，弹框消失
   */

  delification: function(e) {
    console.log(e)
    if (e.currentTarget.dataset.classification) {
      this.setData({
        hid: true
      })
    }
  },

  jump_oriderDetail: function() {
    wx.navigateTo({
      url: '../oriderDetail/oriderDetail',
    })
  },
  jump_installAddress: function() {
    wx.navigateTo({
      url: '../installAddress/installAddress',
    })
  },
  onChangeShowState: function() {
    var that = this;
    var token = wx.getStorageSync('token');
    console.log(that.data.orider.order_number)
    var order_groups = that.data.orider.order_group
    console.log(order_groups)
    console.log(JSON.stringify(order_groups))
    app.request(
      config.hostUrl + '/v1/order_module/paymentOrder', {
        user_token: token, //用户标识`
        order_number: that.data.orider.order_number, //`订单号`
        order_people: that.data.orider.order_people, //`收件人名称`
        order_phone: that.data.orider.order_phone, //`收件人电话`
        order_address: that.data.orider.order_address, //`收件人地址`
        order_formd: that.data.orider.order_formd, //`表单提交ID`
        good_prices: that.data.orider.good_prices, //`商品总价格`
        order_gdnu: that.data.orider.order_group.length, //商品规格数量；
        order_group: JSON.stringify(order_groups), //`商品信息json数据good_index 商品主键 good_name 商品名称 style_name 规格名称 good_num 商品数量 good_price 商品单价 good_pic 商品缩略图
      },
      function(res) {
        console.log(res)
        //       // wx.navigateTo({
        //       //   url: '../fillOrider/fillOrider?order_number=' + outTradeNo,
        //       //  })
        that.setData({
          hid: (!that.data.hid)
        })
      },
       'POST',

    )

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var orider = wx.getStorageSync('orider')
    console.log(orider)
    this.setData({
      orider: orider
    })
    // var order_number = options.order_number
    //  //获取订单详情
    //   app.request(
    //     config.hostUrl + '/v1/order_module/getOrderDetails', {
    //       order_number: order_number
    //     },
    //     function (res) {
    //       console.log(res)
    //     }, 
    //   )

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