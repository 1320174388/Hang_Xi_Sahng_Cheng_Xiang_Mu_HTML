// pages/index/index.js
var config = require("../../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   轮播图
      swiperArr:[
          "../images/swipeImage.png",
          "../images/swipeImage.png",
          "../images/swipeImage.png",
          "../images/swipeImage.png",
          "../images/swipeImage.png",
          "../images/swipeImage.png",
          "../images/swipeImage.png"
      ],
    //   中部导航栏
      navArr:[
          {
              img:"../images/yifu.png",
              txt:"休闲服装"
          },
          {
              img: "../images/shengxian.png",
              txt: "水果生鲜"
          },
          {
              img: "../images/shipin.png",
              txt: "休闲食品"
          },
          {
              img: "../images/chongzhi.png",
              txt: "充值充值"
          },
          {
              img: "../images/chaoshi.png",
              txt: "超市超市"
          },
      ],
    //   今日特卖
      shopArr:[
          {
              img:"../images/content.png",
              text:"四川梅干菜",
              price:"5.9"
          },
          {
              img: "../images/content.png",
              text: "四川梅干菜",
              price: "6.1"
          },
          {
              img: "../images/content.png",
              text: "四川梅干菜",
              price: "6.3"
          }
      ]
  },
  tel:function(){
    wx.makePhoneCall({
      phoneNumber: '123456',
    })
  },
//   商品页面跳转
  shopJump:function(){
      wx.navigateTo({
          url: '../shopDetail/shopDetail',
      })
  },

  //跳到商品详情页
  jump_evaluate: function () {
    wx.navigateTo({
      url: '../evaluate/evaluate',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
    // 聊天跳转
    costom: function (res) {
        var response = res;
        // 查看是否授权

        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    
                    getApp().request(config.hostUrl + '/v1/login_module/login_admin/' + wx.getStorageSync('token'), {},
                        function (res) {
                            if (res.data.retData) {
                                getApp().request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
                                    adminFormid: response.detail.formId
                                }, function (res) {
                                    console.log(res);
                                }, 'post');
                                wx.navigateTo({
                                    url: '../kefu/adminManage/adminManage',
                                })
                            } else {
                                wx.navigateTo({
                                    url: '../kefu/ask/ask',
                                })
                            }
                        },'post')
                } else {
                    return false;
                }
            }
        })

    }
})