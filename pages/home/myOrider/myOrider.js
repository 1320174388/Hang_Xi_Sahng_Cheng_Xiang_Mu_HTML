// pages/home/myOrider/myOrider.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   导航条数组
    navbar: ['待付款', '待发货', '待收货', '待评价', '已完成'],
    currentTab: 0,
    // 订单列表数组
    orderList:[],
    // 合计价格
    zPrice:'',
    // img域名
    hosturl:config.hostUrl,
  },

  //导航条点击事件
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  jump_evaluate: function(){
    wx.navigateTo({
      url: '../evaluate/evaluate',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var token = wx.getStorageSync('token')
    var that = this ;
    if(options.idx){
      that.setData({
        currentTab: parseInt(options.idx)
      })
    }
    app.request(
      config.hostUrl + '/v1/order_module/getUserOrderList', {
        'user_token': token 
      },
      function (res) {
          if(res.data.retData){
              var list = res.data.retData;
              for (var i = 0; i < list.length;i++){
                  var zj;
                  for (var j = 0; j < list[i].details.length; j++){
                      zj = zj + parseInt(list[i].details[j].good_num * list[i].details[j].good_price);
                  }
                  list[i].zPrice = zj;

              }


              that.setData({
                  orderList: res.data.retData,
              })
          }
          console.log(res.data.retData);
          
      }
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