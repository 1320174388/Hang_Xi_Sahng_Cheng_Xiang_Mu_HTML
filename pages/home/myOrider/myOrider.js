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
    orderList: [],
    // 合计价格
    zPrice: '',
    // img域名
    hosturl: config.hostUrl,
    // 控制付款页面的显示隐藏
    hid: true,
    evaluate:true,
    idx:0,
    // 付款订单号
    fkNum:'',
    // 付款金额
    fkPrice:'',
  },
  // 一键复制事件
  copyBtn: function (e) {
    console.log('复制成功')
    var that = this;
    wx.setClipboardData({
      //准备复制的数据
      data: 'wxid_032t2570rv1m22',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  // 控制付款页面的显示隐藏
  delification: function(e) {
    if (e.currentTarget.dataset.classification) {

      this.setData({
        hid: true,
      })
    }
  },
  // 点击确认收货
  qRrecive:function(e){
    var that = this;
    var orderNum = this.data.orderList[e.currentTarget.id].order_number;
    app.request(
      config.hostUrl + '/v1/order_module/setOrderState', {
        order_number: orderNum,
        order_status: 4,
      },
      function (res) {
        if (res.data.errNum == 0) {
          app.point('已确认收货', 'success', 1000);
          setTimeout(function () {
            that.onLoad({ idx: that.data.currentTab });
          }, 1000)
        }
      }
    )
  },
  

  // 点击立即付款
  fukuan: function(e) {
     
    this.setData({
      hid: false,
      fkNum: this.data.orderList[e.currentTarget.id].order_number,
      fkPrice: this.data.orderList[e.currentTarget.id].zPrice,
    })
  },
  evaluate:function(e){
    this.setData({
      evaluate: false,
    })
  },
  // 点击取消订单
  quxiao: function(e) {
    var that = this;
    var orderNum = this.data.orderList[e.currentTarget.id].order_number;
    app.request(
      config.hostUrl + '/v1/order_module/setOrderState', {
        order_number: orderNum,
        order_status: 0,
      },
      function(res) {
        if(res.data.errNum == 0){
          app.point('取消订单成功','success',1000);
          setTimeout(function(){
            that.onLoad({ idx: that.data.currentTab});
          },1000)
        }
      }
    )
  },
  //导航条点击事件
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
//点击跳转到订单详情
  jump_detail: function(res) {
    var id = res.currentTarget.id;
    var orderNum = this.data.orderList[id].order_number;
    wx.navigateTo({
      url: '../oriderDetail/oriderDetail?orderNum=' + orderNum,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var token = wx.getStorageSync('token');
    var that = this;
    if (options.idx) {
      that.setData({
        currentTab: parseInt(options.idx),
        idx: parseInt(options.idx),
      })
    }
    app.request(
      config.hostUrl + '/v1/order_module/getUserOrderList', {
        'user_token': token
      },
      function(res) {
        console.log(res)
        if (res.data.retData) {
          var list = res.data.retData;
          //   计算总价
          for (var i = 0; i < list.length; i++) {
            var zj = 0;
            if (list[i].order_status==4){
              var critic_status = 5;
              for (var j = 0; j < list[i].details.length; j++) {
                if (list[i].details[j].critic_status == 0) {
                  critic_status = 4;
                }

              }
              list[i].order_status = critic_status;
            }
            for (var j = 0; j < list[i].details.length; j++) {
              zj = zj + (list[i].details[j].good_num * list[i].details[j].good_price);
            }
            list[i].zPrice = zj;
          }
          that.setData({
            orderList: list,
          })
        }
      }
    )
  },

  /**
   * 图片预览
   */
  big: function(e){
    wx.previewImage({
      urls: [config.hostUrl + '/uploads/static/' + e.currentTarget.dataset.types+'.jpg'] // 需要预览的图片http链接列表
    })

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
    this.onLoad({idx:this.data.idx});
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