// pages/home/evaluate/evaluate.js
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
//加载时获取的信息
  bindviewtap: function () {

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