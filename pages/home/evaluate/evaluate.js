// pages/home/evaluate/evaluate.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myImgs: [],//轮播图
    navbar: ['详情', '评价'],//导航
    currentTab: 0,
  
  },
//跳到商品详情页
  jump_evaluate: function () {
    wx.navigateTo({
      url: '../evaluate/evaluate',
    })
  },
  //导航点击事件
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  jump_index: function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  //点击收藏
  mycollect:function(e){
    app.request(
      config.hostUrl + '/v1/collect_module/collect_post', {
        'userToken': token,
        goodIndex: goodIndex
      },
      function (res) {
        console.log(res)
      }
    )
  },
//加载时获取的信息
  bindviewtap: function () {
    var that =this;
    var token = wx.getStorageSync('token')
    //获取商品详情信息
    app.request(
      config.hostUrl + '/v1/good_module/good_details', {
        goodIndex: ""
      },
      function (res) {
        console.log(res)
      }
    )
    //判断商品是否收藏接口
    app.request(
      config.hostUrl + '/v1/collect_module/collect_isget', {
        userToken: token,
        goodIndex: ""
      },
      function (res) {
        if (res.data.retData==true){
          that.setData({

          })
        }
      }
    )

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bindviewtap;
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