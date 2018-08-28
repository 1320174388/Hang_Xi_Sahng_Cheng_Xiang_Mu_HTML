// pages/type/type.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   类型列表
      typeList:[
           ],
           
    //   内容列表
      contentList:[],
    host: config.hostUrl,
  },
    // 分类选择
    typeActive:function(res){
        var typeList = this.data.typeList;
        for (var i = 0; i < typeList.length;i++){
            typeList[i].active = false;
        }
        typeList[res.currentTarget.id].active = true;
        this.setData({
            typeList: typeList,
          contentList: typeList[res.currentTarget.id].son_class
        })
    },
  jump_shopDetail:function(res){
      var contentList = this.data.contentList;
      var classIndex = contentList[res.currentTarget.id].class_index;
    wx.navigateTo({
        url: '../shopDetail/shopDetail?classIndex=' + classIndex,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.request(
      config.hostUrl + '/v1/assortment_module/getGoodsClass', {},
      function (res) {
        that.setData({
          typeList: res.data.retData,
          'typeList[0].active':true,
          contentList: res.data.retData[0].son_class
        })
      }
    );
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
                  if (wx.getStorageSync('admin_user_type_print')) {
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
                } else {
                    return false;
                }
            }
        })

    },
})