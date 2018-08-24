// pages/back/Modifycommodity/Modifycommodity.js
var config = require('../../../config.js');
var app = getApp();
var good_master_type = false;
var good_detsils_type = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: config.hostUrl,
    good_img_details: [],
    good_img_master: [],
    good_index: "",
    good_name: "",
    good_price: '',
    good_sales: '',
    style_data: [],
    class_index: '',

  },

  //上传轮播图片
  upImages: function() {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res)
        var ss = [];
        for (var i = 0; i < res.tempFiles.length; i++) {
          ss[i] = res.tempFiles[i].path;
        }
        console.log(ss)
        that.setData({
          'good_img_master': ss
        })
        good_master_type = true
      },
    })
  },
  //上传详情图片
  Upimgs: function(e) {
    console.log(e)
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res)
        that.setData({
          good_img_details: res.tempFilePaths
        })
        good_detsils_type = true
      },
    })
  },

  int_name_add: function(e) {
    console.log(e)
    var arr = {}
    this.setData({
      style_data: this.data.style_data.concat(arr)
    })

    console.log(e.currentTarget.dataset.index)
  },

  int_name_del: function(e) {
    console.log(e)
    var list = this.data.style_data;
    var index = e.currentTarget.dataset.index;
    list.splice(index, 1);
    this.setData({
      style_data: list
    })
    if (list == "") {
      var arr = {};
      this.setData({
        style_data: this.data.style_data.concat(arr)
      })
    }
  },


  styleName: function(e) {
    console.log(e)
    var i = e.currentTarget.dataset.index;
    this.data.style_data[i].style_name = e.detail.value;
    this.setData({
      style_data: this.data.style_data,
    })

  },
  stylePrice: function(e) {
    console.log(e)
    var i = e.currentTarget.dataset.index
    this.data.style_data[i].style_price = e.detail.value;
    this.setData({
      style_data: this.data.style_data,
    })

  },

  classAdd: function(e) {
    console.log(e)
    console.log(e.detail.value.names)
    var that = this;
    var inpt = [];
    var ipt = [];
    for (var i = 0; i < that.data.style_data.length; i++) {
      delete that.data.style_data[i].good_index;
      delete that.data.style_data[i].style_index;
    }
    // var inpt = that.data.style_data;
    // console.log(inpt)
    // var class_index = JSON.stringify(inpt);
    console.log(that.data.style_data)
    var styleArr = [];
    for (var i  in that.data.style_data )
    {
      styleArr[i] = {
        'styleName': that.data.style_data[i].style_name,
        'stylePrice': that.data.style_data[i].style_price
      }
    }
    var styleArr = JSON.stringify(styleArr);
    //修改商品
    app.request(
      config.hostUrl + '/v1/good_module/good_put/' +
      wx.getStorageSync('token'), {
        'goodName': e.detail.value.names,
        'goodIndex': that.data.good_index,
        'classIndex': that.data.class_index,
        'goodPrice': e.detail.value.price,
        'goodSales': e.detail.value.num,
        'goodStyle': styleArr,
      },
      function(res) {
        console.log(res.data)
        if (res.data.errNum == 0) {
          if (good_master_type) {
            that.uploadfiles(that.data.good_img_master, 'master', 1, that.data.good_index, function() {
              if (good_detsils_type) {
                that.uploadfiles(that.data.good_img_details, 'son', 1, that.data.good_index, function() {
                  app.point(res.data.retMsg, 'success', 3000);
                  app.timeBack(2000)
                })
              } else {
                app.point(res.data.retMsg, 'success', 3000);
                app.timeBack(2000)
              }
            });
          } else if (good_detsils_type) {
            that.uploadfiles(that.data.good_img_details, 'son', 1, that.data.good_index, function() {
              app.point(res.data.retMsg, 'success', 3000);
              app.timeBack(2000)
            })
          } else {
            app.point(res.data.retMsg, 'success', 3000);
            app.timeBack(2000)
          }
        } else {
          app.point(res.data.retMsg, 'none', 2000);
        }

      }, 'PUT'
    )
  },
  // 上传文件 数组 类型 排序 id 函数
  uploadfiles: function(filePathArr, imageType, imageSort, goodIndex, success) {
    var that = this;
    if (imageType == 'master') {
      var pot = '商品';
    }
    if (imageType == 'son') {
      var pot = '详情';
    }
    app.point('上传' + pot + '图片' + imageSort, 'loading', 20000);
    app.file(
      config.hostUrl + '/v1/good_module/good_image_post/' +
      wx.getStorageSync('token'), filePathArr[imageSort - 1],
      'imageFile', {
        'goodIndex': goodIndex,
        'imageType': imageType,
        'imageSort': imageSort
      },
      function(ort) {
        console.log(ort)
        if (ort.errNum == 0) {
          app.point('上传成功', 'success', 2000);
          if (filePathArr[imageSort]) {
            that.uploadfiles(filePathArr, imageType, imageSort + 1, goodIndex, success);
          } else {
            success()
          }
        }
      }
    );
  },
  uploadimgs: function(page, path) {
    var that = this;
    var curImgList = [];
    console.log(that.data.good_img_master)
    for (var i = 0; i < path.length; i++) {
      wx.showToast({
          icon: 'loading',
          title: '正在上传',
        }),
        app.file(
          config.hostUrl + 'v1/good_module/good_image_post/' + wx.getStorageSync('token'),
          that.data.good_img_master[i],
          'file', {
            'goodIndex': '',
            'imageType': master,
            'imageSort': i,
            'imageFile': '',
          },
          function(res) {
            console.log(res);
            curImgList.push(res.data);
            var evalList = this.data.good_img_master;
            evalList[0] = curImgList;
            that.setData({
              good_img_master: evalList
            })
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: retMsg,
                showCancel: false
              })
              return;
            }
          },
        )
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var idx = options.idx;
    good_master_type = false;
    good_detsils_type = false;
    app.request(
      config.hostUrl + '/v1/good_module/good_get/' + wx.getStorageSync('token'), {
        goodIndex: idx
      },
      function(res) {
        console.log(res.data.retData)
        var good_img_details = [];

        for (var i = 0; i < res.data.retData.goodData.good_img_details.length; i++) {
          good_img_details[i] = config.hostUrl + res.data.retData.goodData.good_img_details[i].picture_url
          
        }
        var masterImg = [];
        for (var i = 0; i < res.data.retData.goodData.good_img_master.length; i++) {
          masterImg[i] = config.hostUrl + res.data.retData.goodData.good_img_master[i].picture_url;
        }
        if (res.data.retData.goodData.style_data){
          var style_data = res.data.retData.goodData.style_data;
          console.log(style_data)
        } else if (!res.data.retData.goodData.style_data){
          var style_data=[{}]
          console.log(style_data)
        }
      
        that.setData({
          good_img_details: good_img_details,
          good_img_master: masterImg,
          good_index: res.data.retData.goodData.good_index,
          good_name: res.data.retData.goodData.good_name,
          good_price: res.data.retData.goodData.good_price,
          good_sales: res.data.retData.goodData.good_sales,
          style_data: style_data,
          class_index: res.data.retData.goodData.class_index
        })
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