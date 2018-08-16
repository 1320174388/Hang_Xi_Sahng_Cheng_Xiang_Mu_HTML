// pages/Addcommodity/Addcommodity.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_parent: [], //获取分类名称
    son_class: [],
    index: 0, //
    index1: 0,
    movies: [], //获取轮播图
    int_name: [{ styleName: 12, stylePrice:32}], //商品规格信息
    upimgs: [], //商品详情图
    names: '', //商品名
    prices: '', //商品价格
    num: '', //商品数
    gs:[],
    hidden: true,
    selet_show: true,
    selet_show1: true,
    hid: true,
    s_hid: true,
  },

  selet_hid: function(e) {
    if (this.data.selet_show == true) {
      this.setData({
        selet_show: false
      })
      console.log(this.data.selet_show)
    }
  },
  item_list: function(e) {
    var idx = e.currentTarget.dataset.index;
    console.log(idx)
    this.setData({
      'index': idx,
      selet_show: true,
      son_class: this.data.s_parent[idx].son_class
    })
  },
  selet_hid1: function(e) {
    if (this.data.s_parent[this.data.index].son_class == '') {
      wx.showToast({
        title: '我暂时还没有分支哦',
      })
      this.setData({
        selet_show1: true
      })
    } else
    if (this.data.selet_show1 == true) {
      this.setData({
        selet_show1: false
      })
    }
  },
  item_list1: function(e) {
    console.log(e)
    var idx = e.currentTarget.dataset.index;
    console.log(idx)
    console.log(this.data.son_class)
    this.setData({
      index1: idx,
      selet_show1: true,

    })
    console.log(this.data.index1)
  },
  //上传图片
  upImages: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          images: res.tempFilePaths
        })
      },
    })
  },

  bindChange: function(e) {
    console.log(e)
    var index = e.detail.value[0]
    this.setData({
      index: index
    })
    console.log(this.data.s_parent)
    console.log(this.data.s_parent[index].son_class)
  },
  upimages: function() {},

  add_name: function(e) {
    this.setData({
      s_hid: false,
    })
  },
  add_name_add:function() {

  },
  upimgs: function() {},

  classAdd: function(e) {
    var that = this;
    //添加商品
    app.flie(
      config.hostUrl + 'post/v1/good_module/good_post/' + wx.getStorageSync('token'), {
        'goodName': that.data.names,
        'classIndex': that.data.s_parent[that.data.index].son_class.class_index,
        'goodPrice': that.data.price,
        'goodSales': that.data.num,
        'goodStyle': that.data.int_name,

      },
      that.data.images[0],
      'images', {},
      function(res) {

      }, 'POST',
    )

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    app.request(
      config.hostUrl + '/v1/assortment_module/getGoodsClass/' + wx.getStorageSync('token'), {},
      function(res) {
        console.log(res.data.retData)
        var s = [];
        for (var i = 0; i < res.data.retData.length; i++) {
          s = res.data.retData[i].class_name
        }
        console.log()
        that.setData({
          s_parent: res.data.retData,
          son_class:res.data.retData[0].son_class
        })
      },
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