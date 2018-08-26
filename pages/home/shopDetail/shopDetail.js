// pages/shopDetail/shopDetail.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    searchPageNum: 0, // 设置加载的第几次，默认是第一次  
    callbackcount: 12, //返回数据的个数  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    orderType: 'asc',
    classIndex: '',
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏
    //   img地址前缀
    imgHost: config.hostUrl,
  },
  jump_evaluate: function(e) {
    var x = this.data.shopList[e.currentTarget.dataset.index].good_index;
    wx.navigateTo({
      url: '../evaluate/evaluate?goodindex=' + x,
    })
  },
  //点击全部
  nolist: function() {
    var that = this;
    getApp().request(
      config.hostUrl + '/v1/good_module/good_get_list', {
        classIndex: that.data.classIndex,
        goodLimit: '0',
        orderType: 'no',
      },
      function(res) {
        if (res.data.retData) {
          that.setData({
            shopList: res.data.retData,
            orderType: 'no'
          })
        }
      }
    )
  },
  //点击价格
  asclist: function() {
    var that = this;
    if (that.data.orderType == 'asc') {
      getApp().request(
        config.hostUrl + '/v1/good_module/good_get_list', {
          classIndex: that.data.classIndex,
          goodLimit: '0',
          orderType: 'desc',
        },
        function(res) {
          if (res.data.retData) {
            that.setData({
              shopList: res.data.retData,
              orderType: 'desc'
            })
          }
        }
      )
    } else if (that.data.orderType !== 'asc') {
      getApp().request(
        config.hostUrl + '/v1/good_module/good_get_list', {
          classIndex: that.data.classIndex,
          goodLimit: '0',
          orderType: 'asc',
        },
        function(res) {
          if (res.data.retData) {
            that.setData({
              shopList: res.data.retData,
              orderType: 'asc'
            })
          }
        }
      )
    }
  },
  //点击销量
  salelist: function() {
    var that = this;
    getApp().request(
      config.hostUrl + '/v1/good_module/good_get_list', {
        classIndex: that.data.classIndex,
        goodLimit: '0',
        orderType: 'sale',
      },
      function(res) {
        if (res.data.retData) {
          that.setData({
            shopList: res.data.retData,
            orderType: 'sale'
          })
        }
      }
    )
  },
  //滚动到底部触发事件  
  lower: function() {
    var that = this;
    var searchPageNum = that.data.searchPageNum + 1, //每次触发上拉事件，把searchPageNum+1 
      callbackcount = that.data.callbackcount; //返回数据的个数  
    var arr = [];
    app.request(
      config.hostUrl + '/v1/good_module/good_get_list', {
        goodLimit: searchPageNum * callbackcount,
        classIndex: that.data.classIndex,
        orderType: that.data.orderType,
      },
      function(res) {
        arr = res.data.retData;
        if (arr.length == 12) {
          var newarr = that.data.shopList.concat(arr)
          that.setData({
            shopList: newarr,
            searchLoading: true, //把"上拉加载"的变量设为false，显示  
            searchPageNum: searchPageNum,
            searchLoadingComplete: false,
          })
        } else
        if (arr.length < 12 || arr.length == 0) {
          var newarr = that.data.shopList.concat(arr)
          that.setData({
            shopList: newarr,
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false, //把"上拉加载"的变量设为false，隐藏  
            searchPageNum: searchPageNum
          });
        }
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    getApp().request(
      config.hostUrl + '/v1/good_module/good_get_list', {
        classIndex: options.classIndex,
        goodLimit: that.data.shopList.length,
        orderType: that.data.orderType
      },
      function(res) {
        if (res.data.retData) {
          that.setData({
            shopList: res.data.retData,
            classIndex: options.classIndex
          })
        }
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