// pages/back/banner/banner.js
var config = require('../../../config.js');
var app = getApp();
var good_master_type = false;
var good_detsils_type = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Wheel: "",
    host: config.hostUrl,
  },
  chooseimages: function(e) {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.uploadFileArr(res.tempFilePaths, 1)
      },
    })
  },

  /**
   * 上传图片文件函数
   */
  uploadFileArr: function(fileArr, fileSort) {
    var This = this;
    app.point('第' + fileSort + '张图片上传中', 'loading', 20000);
    app.file(
      config.hostUrl + '/v1/sowing_module/sowing_route/' + wx.getStorageSync('token'),
      fileArr[fileSort - 1],
      'sowingFile', {
        'sowingSort': fileSort
      },
      function(ort) {
        if (ort.errNum == 0) {
          app.point('上传成功', 'success', 2000);
          if (fileArr[fileSort]) {
            This.uploadFileArr(fileArr, fileSort + 1);
          } else {
            app.point('上传完毕', 'success', 2000);
            This.onLoad();
          }
        } else {
          app.point('上传失败', 'none', 2000);
        }
      }
    );
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    app.request(
      config.hostUrl +'/v1/sowing_module/sowing_route', {},
      function(res) {
        that.setData({
          Wheel: res.data.retData
      })
      },'GET')
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