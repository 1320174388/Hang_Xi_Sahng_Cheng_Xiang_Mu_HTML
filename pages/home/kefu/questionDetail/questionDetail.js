var config = require('../../../../config.js');
var app = getApp();
// 获取时间日期
var time = new Date();
var Y = time.getFullYear();
var M = time.getMonth() + 1;
var D = time.getDate();
var X = time.getDay();
var H = time.getHours();
var m = time.getMinutes();
if (m < 10) {
    m = '0' + m
}
var week = ["日", "一", "二", "三", "四", "五", "六"]
var strTime = M + '月' + D + '日' + ' 星期' + week[X];
var askTime = Y + '年' + M + '月' + D + '日 ' + H + ':' + m;
var index;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //   顶部时间
      time: strTime,
    //   聊天信息
      talkList:[],
    //   文本框内信息
      messageInpt:'',
  },
//   发送信息
  send:function(res){
      var that = this;
      console.log(res);
      //   上传formid值
      app.request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
          adminFormid: res.detail.formId
      }, function (res) {

      },'post');
    //   发送消息
      wx.showToast({
          title: '发送中',
          icon:'loading',
          duration:10000
      })
      app.request(config.hostUrl + '/v1/talk_module/admin_reply/' + wx.getStorageSync('token'), {
          leavingIndex: index,
          messageCont: res.detail.value.message
      }, function (res) {
          if (res.data.retData){
              wx.showToast({
                  title: '发送成功',
                  duration:1000,
                  icon:'success'
              });
            //   清空输入框
              that.setData({
                  messageInpt:''
              });
            //   刷新信息页面内容
              wx.request({
                  url: config.hostUrl + '/v1/talk_module/info_details',
                  method: 'GET',
                  data: {
                      leavingIndex: index
                  },
                  success: function (res) {
                      that.setData({
                          talkList: res.data.retMsg
                      })
                  }
              });
          }else{
              wx.showToast({
                  title: res.data.retMsg,
                  duration: 1000,
                  icon: 'none'
              })
          }
      },'post');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      index = options.index;
      wx.request({
          url: config.hostUrl + '/v1/talk_module/info_details',
          method: 'GET',
          data: {
              leavingIndex: index
          },
          success: function (res) {
              that.setData({
                  talkList: res.data.retMsg
              })
          }
      })

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