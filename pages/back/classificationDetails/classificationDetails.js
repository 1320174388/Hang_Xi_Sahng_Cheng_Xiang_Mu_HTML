// pages/classificationDetails/classificationDetails.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: config.hostUrl,
    hid: true,
    del_hid: true,
    images: null,
    names: "",
    datas: [],
    index: '',
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
  c_add: function(e) {
    var d = this.data.datas[e.currentTarget.dataset.index];
    var i = e.currentTarget.dataset.index;
    this.setData({
      hid: false, 
      names: d.class_name,
      images: config.hostUrl + '/' + d.class_img_url
    })
    wx.setStorageSync('classEdit', d);
    wx.setStorageSync('classIndex', i);
  },
  c_del: function(e) {
    var index = e.target.dataset.index;
    var d = this.data.datas[e.currentTarget.dataset.index];
    var i = e.currentTarget.dataset.index;
    this.setData({
      del_hid: false,
      index: index
    })
    wx.setStorageSync('classEdit', d);
    wx.setStorageSync('classIndex',i);
  },

  classAdd: function(e) {
    var This = this;
    var data = wx.getStorageSync('classEdit');
    var ids = wx.getStorageSync('classIndex');
    wx.removeStorageSync('classEdit');
    wx.removeStorageSync('classIndex');
    //  判断图片是否新上传
    if (config.hostUrl + '/' + data.class_img_url !== This.data.images) {
      // 如果上传新图片 请求图片添加接口，将返回的图片路径和新的分类名称数据一起请求分类修改接口完成修改
      app.file(
        config.hostUrl + '/v1/assortment_module/uploadImage',
        This.data.images[0],
        'images', {},
        function(res) {
          if (res.errNum == 0) {
            app.request(
              config.hostUrl + '/v1/assortment_module/modifyGoodsClass/' + wx.getStorageSync('token'), {
                'class_index': data.class_index,
                'class_name': e.detail.value.class_name,
                'class_img_url': res.retData
              },
              function(ret) {
                This.data.datas[ids].class_img_url = res.retData;
                This.data.datas[ids].class_name = e.detail.value.class_name;
               This.setData({
                 datas: This.data.datas
               })
                app.point(ret.data.retMsg, 'success', 3000)
               
                This.setData({
                  del_hid: true,
                  hid: true
                })
              }, 'POST'
            )
          }
        }
      );
      // 如果没有新上传图片直接，将图片地址和分类名称通过接口修改完完成
    } else {
      app.request(
        config.hostUrl + '/v1/assortment_module/modifyGoodsClass/' + wx.getStorageSync('token'), {
          'class_index': data.class_index,
          'class_name': e.detail.value.class_name,
          'class_img_url': data.class_img_url
        },
        function (ret) {
          This.setData({
            del_hid: true,
            hid: true
          })
          This.data.datas[ids].class_img_url = data.class_img_url;
          This.data.datas[ids].class_name = e.detail.value.class_name;
          This.setData({
            datas: This.data.datas
          })
          app.point(ret.data.retMsg, 'success', 3000)
        }, 'POST'
      )
    }

  },

  classDel: function() {

    var that = this;
    var data = wx.getStorageSync('classEdit');
    var ids = wx.getStorageSync('classIndex');
    wx.removeStorageSync('classEdit');
    wx.removeStorageSync('classIndex');
    app.request(
      config.hostUrl + '/v1/assortment_module/delectGoodsClass/' + wx.getStorageSync('token'), {
        'class_index': data.class_index,
      },
      function(res) {

        if (res.data.errNum == 0){
          that.setData({
            del_hid: true,
            hid: true
          })
          delete that.data.datas[ids];
          that.setData({
            datas: that.data.datas
          })
          app.point(res.data.retMsg, 'success', 3000)
        } else if (res.data.errNum !== 0){
          that.setData({
            del_hid: true,
            hid: true
          })
          app.point(res.data.retMsg, 'none', 3000)
        }
        
      },
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.setData({
      'datas': wx.getStorageSync('sonClassList')
    });
    wx.removeStorageSync('sonClassList');
    this.setData({
      del_hid: true,
      hid: true
    })
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