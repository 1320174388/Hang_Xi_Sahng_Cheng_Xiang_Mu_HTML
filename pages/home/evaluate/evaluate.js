// pages/home/evaluate/evaluate.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myImgs: [], //轮播图
    navbar: ['详情', '评论'], //导航
    currentTab: 0,
    goodData: '',
    host: config.hostUrl,
    selet_show: true,
    num: 1,
    mycollect: false,
    searchPageNum:0,

  },

  //跳转到填写订单
  jump_fillOrider: function () {
//先提交页面信息生成订单， 将订单生成信息传值



    wx.navigateTo({
      url: '../fillOrider/fillOrider',
    })
  },
  //导航点击事件
  navbarTap: function(e) {
    var idx = e.currentTarget.dataset.idx;
    
    this.setData({
      currentTab: idx
    })
  },
  jump_index: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  //规格选择显示
  selet_hid: function(e) {

    this.setData({
      selet_show: false
    })
  },
  //规格样式选择
  select: function(e) {
    var idx = e.currentTarget.dataset.index
    var style_data = this.data.goodData.style_data;
    for (var i = 0; i < style_data.length; i++) {
      style_data[i].active = false;
    }
    style_data[idx].active = true;
    this.setData({
      'goodData.style_data': style_data,
    })
  },
  // 增加数量
  addCount(e) {
    var num = this.data.num + 1;
    this.setData({
      num: num
    });
  },
  // 减少数量
  minusCount(e) {
    var num = this.data.num;
    if (num <= 1) {
      return false;
    } else if (num > 1) {
      var num = num - 1;
      this.setData({
        num: num
      });
    }
  },
//触底事件
  lower:function(){
    console.log("触底事件")
    // var that = this;
    // var searchPageNum = that.data.searchPageNum + 1; //每次触发上拉事件，把searchPageNum+1 
    // // callbackcount = that.data.callbackcount; //返回数据的个数  

    // app.request(
    //   config.hostUrl + '/v1/good_module/critic_get', {
      
    //     goodIndex: that.data.goodData.class_index
    //   },
    //   function (res) {
    //     console.log(res)
      //   console.log(that.data.currentTab)
      //   var list = [];
      //   var x = 0;
      //   console.log(that.data.list)

      //   for (var i = 0; i < res.data.retData.length; i++) {
      //     if (res.data.retData[i].order_status == that.data.currentTab) {
      //       list[x] = res.data.retData[i];
      //       x++;
      //     }
      //   }

      //   console.log(list)
      //   if (list.length == 12) {
      //     var newarr = that.data.list.concat(list)
      //     var arr = that.data.orider_list.concat(res.data.retData)
      //     console.log(newarr)
      //     console.log(arr)
      //     that.setData({
      //       'orider_list': arr,
      //       'list': newarr,
      //       searchPageNum: searchPageNum,
      //       searchLoadingComplete: false,
      //     })
      //   } else if (list.length < 12) {
      //     var newarr = that.data.list.concat(list)
      //     var arr = that.data.orider_list.concat(res.data.retData)
      //     that.setData({
      //       'orider_list': arr,
      //       'list': newarr,
      //       searchPageNum: searchPageNum,
      //       searchLoadingComplete: true,
      //     })
    //   //   }
    //    }
    // )
  },

  //点击收藏
  mycollect: function(e) {
    var that = this;
    var token = wx.getStorageSync('token')
    if (that.data.mycollect  == false) {
      app.request(
        config.hostUrl + '/v1/collect_module/collect_post', {
          'userToken': token,
          goodIndex: that.data.goodData.class_index
        },
        function(res) {
          that.setData({
            mycollect: true
          })
        }, 'POST',
      )
    } else if (that.data.mycollect == true) {
      app.request(
        config.hostUrl + '/v1/collect_module/collect_delete', {
          'userToken': token,
          goodIndex: that.data.goodData.class_index
        },
        function(res) {
          that.setData({
            mycollect: false
          })
        }, 'DELETE',
      )
    }
  },
  addcarts:function(){
console.log("加入购物车")
    wx.setStorageSync('carts', that.data.goodData)
  },
  //加载时获取的信息
  bindviewtap: function() {

    //判断商品是否收藏接口
    // app.request(
    //   config.hostUrl + '/v1/collect_module/collect_isget', {
    //     'userToken': token,
    //     goodIndex: that.data.goodData.class_index
    //   },
    //   function(res) {
    //     console.log(res)
    //     if (res.data.retData == true) {
    //       that.setData({
    //         mycollect: true
    //       })
    //     } else if (res.data.retData == false) {
    //       that.setData({
    //         mycollect: false
    //       })
    //     }

    //   }
    // )
    //加载评论
    // app.request(
    //   config.hostUrl + '/v1/good_module/critic_get', {

    //     goodIndex: ""
    //   },
    //   function(res) {
    //     console.log(res)
    //     if (res.data.retData == true) {

    //     }
    //   }
    // )

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var goodindex = options.goodindex;
    var that = this;
    var token = wx.getStorageSync('token')
    //获取商品详情信息
    app.request(
      config.hostUrl + '/v1/good_module/good_details', {
        goodIndex: goodindex
      },
      function(res) {
 
        that.setData({
          goodData: res.data.retData.goodData
        })
        app.request(
          config.hostUrl + '/v1/collect_module/collect_isget', {
            'userToken': token,
            goodIndex: that.data.goodData.class_index
          },
          function(res) {
           
            if (res.data.retData == true) {
              that.setData({
                mycollect: true
              })
            } else if (res.data.retData == false) {
              that.setData({
                mycollect: false
              })
            }

          }
        )
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