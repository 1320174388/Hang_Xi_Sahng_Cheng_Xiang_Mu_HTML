// pages/commodity/commodity.js
var config = require('../../../config.js');
var app = getApp();
var DEL_TYPE = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: config.hostUrl,
    datas: '',
    searchPageNum: 0, // 设置加载的第几次，默认是第一次  
    callbackcount: 12, //返回数据的个数  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false //“没有数据”的变量，默认false，隐藏
  },
  jump_Addcommodity: function() {
    wx.navigateTo({
      url: '../Addcommodity/Addcommodity',
    })
  },
  jump_Modifycommodity: function(e) {
    var index = e.target.dataset.index;
    var idx = this.data.datas[index].good_index;
    wx.navigateTo({
      url: '../Modifycommodity/Modifycommodity?idx=' + idx,
    })
  },
  jump_commodityDetails: function(e) {
    var index = e.target.dataset.index;
    var idx = this.data.datas[index].good_index;
    wx.navigateTo({
      url: '../commodityDetails/commodityDetails?idx=' + idx,
    })
  },

  del: function(e) {
    if (DEL_TYPE) {
      DEL_TYPE = false;
      var that = this;
      var index = e.target.dataset.index;
      var idx = this.data.datas[index].good_index;
      app.request(
        config.hostUrl + '/v1/good_module/good_delete/' + wx.getStorageSync('token'), {
          'goodIndex': idx
        },
        function(res) {
          if (res.data.errNum == 0) {
            app.point(res.data.retMsg, 'success', 2000);
            that.onLoad();
          } else {
            app.point(res.data.retMsg, 'none', 2000);
          }
          DEL_TYPE = true;
        }, 'DELETE',
      )
    }
  },
 
  //滚动到底部触发事件  
  lower: function() {

    var that = this;
    var searchPageNum = that.data.searchPageNum + 1, //每次触发上拉事件，把searchPageNum+1 
      callbackcount = that.data.callbackcount; //返回数据的个数  
    console.log(searchPageNum)
    console.log(callbackcount)
    var arr = [];
    app.request(
      config.hostUrl + '/v1/good_module/good_get_goodlist/' + wx.getStorageSync('token'), {
        goodLimit: searchPageNum * callbackcount
      },
      function(res) {

        arr = res.data.retData;
        console.log(arr.length)
        if (arr.length == 12) {
          var newarr = that.data.datas.concat(arr) 
          that.setData({
            datas: newarr,
            searchLoading: true,//把"上拉加载"的变量设为false，显示  
            searchPageNum: searchPageNum,
            searchLoadingComplete: false,
          })
        } else
        if (arr.length < 12 || arr.length == 0) {
          console.log(arr)
          var newarr = that.data.datas.concat(arr)
          console.log(newarr)
          that.setData({
            datas: newarr,
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false ,//把"上拉加载"的变量设为false，隐藏  
            searchPageNum: searchPageNum
          });
        }
      }
    )
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    app.request(
      config.hostUrl + '/v1/good_module/good_get_goodlist/' + wx.getStorageSync('token'), {
        goodLimit: 0
      },
      function(res) {
        console.log(res)
        that.setData({
          datas: res.data.retData
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