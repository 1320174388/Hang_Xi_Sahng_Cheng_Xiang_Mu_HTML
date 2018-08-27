// pages/commodityDetails/commodityDetails.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['商品详情', '商品评论'],
    currentTab: 0,
    host: config.hostUrl,
    good_img_details: [],
    good_img_master: [],
    good_index: "",
    good_name: "",
    good_price: '',
    good_sales: '',
    style_data: [],
    class_index: '',
    criticList: [],
    selectAllStatus: true // 全选状态，默认全选
  },
  toDate: function(number) {
    var n = number * 1000;
    var date = new Date(n);
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return (Y + M + D + " " + h + m + s)
  },
  //导航条点击事件
  navbarTap: function(e) {
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    that.setData({
      currentTab: idx
    })
    if (idx == 1) {
      app.request(
        config.hostUrl + '/v1/good_module/good_critic/' + wx.getStorageSync('token'), {
          goodIndex: that.data.good_index
        },
        function(res) {
          for (var i = 0; i < res.data.retData.criticList.length; i++) {
            res.data.retData.criticList[i].critic_time = that.toDate(res.data.retData.criticList[i].critic_time);
            res.data.retData.criticList[i].selected = true;
          }
          that.setData({
            criticList: res.data.retData.criticList
          })
        },
      )
    }
  },
  selectList(e) {
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let carts = this.data.criticList; // 获取评论列表
    const selected = carts[index].selected; // 获取当前商品的选中状态
    carts[index].selected = !selected; // 改变状态
    this.setData({
      criticList: carts
    });
  },
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.criticList;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus; // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      criticList: carts
    });
  },
  deleteList(e) {
    var that = this;
    var idx = e.currentTarget.dataset.index;
    app.request(
      config.hostUrl + '/v1/good_module/good_critic_del/' + wx.getStorageSync('token'), {
        criticIndex: that.data.criticList[idx].id
      },
      function(res) {
        app.point('res.data.retMsg', 'success', 2000);
        that.onLoad();
      },'DELETE',
    )
    app.point('正在删除评论', 'success', 2000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var idx = options.idx;
    app.request(
      config.hostUrl + '/v1/good_module/good_get/' + wx.getStorageSync('token'), {
        goodIndex: idx
      },
      function(res) {  
        that.setData({
          good_img_details: res.data.retData.goodData.good_img_details,
          good_img_master: res.data.retData.goodData.good_img_master,
          good_index: res.data.retData.goodData.good_index,
          good_name: res.data.retData.goodData.good_name,
          good_price: res.data.retData.goodData.good_price,
          good_sales: res.data.retData.goodData.good_sales,
          style_data: res.data.retData.goodData.style_data,
          class_index: res.data.retData.goodData.class_index,
          criticList: res.data.retData.criticList
        })
      }
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