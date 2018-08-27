// pages/index/index.js
var config = require("../../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: config.hostUrl,

    //   公告修改的显示和隐藏
    noEditShow: 'none',
    // 公告显示内容
    noticeCont: '',
    // 公告轮播
    noticeDis: 0,
    //   轮播图
    swiperArr: [
      "../images/swipeImage.png",
      "../images/swipeImage.png",
      "../images/swipeImage.png",
      "../images/swipeImage.png",
      "../images/swipeImage.png",
      "../images/swipeImage.png",
      "../images/swipeImage.png"
    ],
    //   中部导航栏
    navArr: [],
    //   今日特卖
    shopArr: [],
  },
  //拨打电话
  tel: function() {
    wx.makePhoneCall({
      phoneNumber: '123456',
    })
  },
  //   商品页面跳转
  shopJump: function(e) {
    var classindex = e.currentTarget.dataset.classindex;
    wx.navigateTo({
        url: '../shopDetail/shopDetail?classIndex=' + classindex,
    })
  },

  //跳到商品详情页
  jump_evaluate: function(e) {
    var goodindex = e.currentTarget.dataset.goodindex;
    wx.navigateTo({
      url: '../evaluate/evaluate?goodindex='+goodindex,
    })
  },
  //点击公告弹出修改框
  noticeShow: function() {
    var that = this;
    getApp().request(config.hostUrl + '/v1/login_module/login_admin/' + wx.getStorageSync('token'), {},
      function(res) {
        if (res.data.retData) {
          that.setData({
            noEditShow: 'block'
          })
        }
      },
      "post"
    );
  },
  // 隐藏弹出框事件
  noticeHide: function() {
    this.setData({
      noEditShow: 'none'
    })
  },
  // 修改公告事件
  noticeEdit: function(res) {
    var that = this;
    getApp().request(config.hostUrl + '/v1/noctice_module/noctice_put/' + wx.getStorageSync('token'), {
      nocticeIndex: this.data.noticeCont.notice_index,
      nocticeContent: res.detail.value.content
    }, function(res) {
      if (res.data.retData) {
        that.setData({
          noEditShow: 'none'
        });
        getApp().point('修改成功', 'success', 1000);
        setTimeout(function() {
          that.onLoad();
        }, 1000)
      } else {
        getApp().point(res.data.retMsg, 'none', 1000);
      }
    }, 'put');
  },
  //加载时获取的信息
  bindviewtap: function() {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //   公告的获取
    getApp().request(config.hostUrl + '/v1/noctice_module/noctice_get', {}, function(res) {
      that.setData({
        noticeCont: res.data.retData,
      })
    });
    //导航获取
    getApp().request(
      config.hostUrl + '/v1/assortment_module/getGoodsClass', {},
      function (res) {
        that.setData({
          navArr: res.data.retData
        })
      }
    );
    //特卖获取
    getApp().request(
      config.hostUrl + '/v1/assortment_module/assortment_route', {},
      function(res) {
        that.setData({
          shopArr: res.data.retData
        })
      }
    );

    //  判断公告是否需要滚动
    setTimeout(function() {
      var query = wx.createSelectorQuery();
      var wrapWidth = "";
      var contWidth = "";
      query.select('#notice-wrap').boundingClientRect(function(res) {
        wrapWidth = res.width;
      }).exec();
      query.select('#notice-cont').boundingClientRect(function(res) {
        contWidth = res.width;
      }).exec();
      setTimeout(function() {
        if (contWidth > wrapWidth) {
          var timer = setInterval(function() {
            var noticeDis = that.data.noticeDis;
            noticeDis++;
            that.setData({
              noticeDis: noticeDis
            });
            if (noticeDis / 2 >= contWidth) {
              that.setData({
                noticeDis: -wrapWidth
              });
            }
            this.timer;
          }, 5)
        }
      }, 1000)
    }, 1000)
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

  },
  // 聊天跳转
  costom: function(res) {
    var response = res;
    // 查看是否授权

    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {

          getApp().request(config.hostUrl + '/v1/login_module/login_admin/' + wx.getStorageSync('token'), {},
            function(res) {
              if (res.data.retData) {
                getApp().request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
                  adminFormid: response.detail.formId
                }, function(res) {
                }, 'post');
                wx.navigateTo({
                  url: '../kefu/adminManage/adminManage',
                })
              } else {
                wx.navigateTo({
                  url: '../kefu/ask/ask',
                })
              }
            }, 'post')
        } else {
          return false;
        }
      }
    })

  }
})