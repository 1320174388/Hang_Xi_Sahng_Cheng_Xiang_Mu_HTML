// pages/home/myCollect//myCollect.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    carts: null, // 购物车列表
    hasList: false, // 列表是否有数据

    selectAllStatus: false, // 全选状态，默认全选
    host: config.hostUrl,
  },
  jump_evaluate: function(e) {
    var goodindex = e.currentTarget.dataset.goodindex;
    wx.navigateTo({
      url: '../evaluate/evaluate?goodindex=' + goodindex,
    })

  },

  selectList(e) {
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let carts = this.data.carts; // 获取购物车列表
    const selected = carts[index].selected; // 获取当前商品的选中状态
    carts[index].selected = !selected; // 改变状态
    this.setData({
      carts: carts
    });
    // 重新获取总价
  },

  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus; // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    // this.getTotalPrice();                               // 重新获取总价
  },
  //删除收藏
  del: function(e) {
    var that = this;
    var token = wx.getStorageSync('token')
    var index = '';
    for (var i = 0; i < that.data.carts.length; i++) { // 循环列表得到每个数据
      if (that.data.carts[i]) {
        if (that.data.carts[i].selected) {
          index += ',' +that.data.carts[i].good_index
        }
      }
    }
    app.request(
      config.hostUrl + '/v1/collect_module/collect_delete', {
        'userToken': token,
        goodIndex: index.substr(1)
      },
      function (res) {
        app.point('删除收藏成功', 'success', 2000);
        that.onLoad()
      }, "DELETE",
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var token = wx.getStorageSync('token')
    app.request(
      config.hostUrl + '/v1/collect_module/collect_get', {
        'userToken': token
      },
      function(res) {
        that.setData({
          carts: res.data.retData
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