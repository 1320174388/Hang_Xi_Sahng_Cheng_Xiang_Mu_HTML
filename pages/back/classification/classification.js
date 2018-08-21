// pages/classification/classification.js
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
    addtype: 0,
    index: '',
  },
  //跳转到查看子类页面
  jump_classificationDetails: function(e) {
    var index = e.currentTarget.dataset.index;
    wx.setStorageSync('sonClassList', this.data.datas[index].son_class)

    wx.navigateTo({
      url: '../classificationDetails/classificationDetails',
    })
  },
  //添加事件显示
  c_add: function(e) {
    var d = this.data.datas[e.currentTarget.dataset.index];
    if ((d == 0) || (d)) {
      if (e.currentTarget.dataset.status == 2) {
        this.setData({
          hid: false,
          addtype: e.currentTarget.dataset.status,
        })
        wx.setStorageSync('classAdd', d);
      }

      if (e.currentTarget.dataset.status == 3) {
        this.setData({
          hid: false,
          addtype: e.currentTarget.dataset.status,
          names: d.class_name,
          images: config.hostUrl + '/' + d.class_img_url
        })
        wx.setStorageSync('classEdit', d);
      }
    } else {
      this.setData({
        hid: false,
        addtype: e.currentTarget.dataset.status,
      })
    }
  },
  //删除事件
  del: function(e) {
    var index = e.target.dataset.index;
    console.log(index)
    this.setData({
      del_hid: false,
      index: index
    })
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
  /**
   * 添加分类事件
   */
  classAdd: function(e) {
    var This = this;
    if (e.currentTarget.dataset.status == 1) {
      if (!This.data.images) {
        app.point(
          '请上传分类图片',
          'none',
          1000
        )
        return false;
      }
      app.file(
        config.hostUrl + '/v1/assortment_module/uploadImage',
        This.data.images[0],
        'images', {},
        function(res) {
          if (res.errNum == 0) {
            console.log(res.retData);
            app.request(
              config.hostUrl + '/v1/assortment_module/addGoodsClass/' +
              wx.getStorageSync('token'), {
                'class_name': e.detail.value.class_name,
                'class_parent': 0,
                'class_img_url': res.retData,
              },
              function(res) {
                console.log(res)
                if (res.data.errNum == 0) {
                  app.point(res.data.retMsg, 'success', 3000)
                  This.setData({
                    hid: true
                  })
                  This.onLoad();
                } else {
                  app.point(res.data.retMsg, 'none', 2000)
                }
              }, 'POST'
            );
          } else {
            app.point(res.retMsg, 'none', 1000)
            return false;
          }
        }
      );
    }

    if (e.currentTarget.dataset.status == 2) {
      var data = wx.getStorageSync('classAdd');
      wx.removeStorageSync('classAdd');
      console.log(data)
      if (!This.data.images) {
        app.point(
          '请上传分类图片',
          'none',
          1000
        )
        return false;
      }
      app.file(
        config.hostUrl + '/v1/assortment_module/uploadImage',
        This.data.images[0],
        'images', {},
        function(res) {
          if (res.errNum == 0) {
            console.log(res.retData);
            app.request(
              config.hostUrl + '/v1/assortment_module/addGoodsClass/' +
              wx.getStorageSync('token'), {
                'class_name': e.detail.value.class_name,
                'class_parent': 0,
                'class_img_url': res.retData,
                'class_parent': data.class_index
              },
              function(res) {
                console.log(res)
                if (res.data.errNum == 0) {
                  app.point(res.data.retMsg, 'success', 3000)
                  This.setData({
                    hid: true
                  })
                  This.onLoad();
                } else {
                  app.point(res.data.retMsg, 'none', 2000)
                }
              }, 'POST'
            );
          } else {
            app.point(res.retMsg, 'none', 1000)
            return false;
          }
        }
      );

    }

    if (e.currentTarget.dataset.status == 3) {
      var data = wx.getStorageSync('classEdit');
      wx.removeStorageSync('classEdit');
      console.log(data)
      console.log(This.data)
      //  判断图片是否新上传
      if (config.hostUrl + '/' + data.class_img_url !== This.data.images) {
        console.log(This.data)
        console.log(data)
        // 如果上传新图片 请求图片添加接口，将返回的图片路径和新的分类名称数据一起请求分类修改接口完成修改
        app.file(
          config.hostUrl + '/v1/assortment_module/uploadImage',
          This.data.images[0],
          'images', {},
          function(res) {
            console.log(res)
            if (res.errNum == 0) {
              console.log(res);
              app.request(
                config.hostUrl + '/v1/assortment_module/modifyGoodsClass/' + wx.getStorageSync('token'), {
                  'class_index': data.class_index,
                  'class_name': e.detail.value.class_name,
                  'class_img_url': res.retData
                },
                function(res) {
                  console.log(res.data)
                  This.setData({
                    del_hid: true,
                    hid: true
                  })
                  app.point(res.data.retMsg, 'success', 3000)
                  This.onLoad();
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
          function(res) {
            console.log(res.data)
            This.setData({
              del_hid: true,
              hid: true
            })
            app.point(res.data.retMsg, 'success', 3000)
            This.onLoad();
          }, 'POST'
        )
      }

    }
  },

  /**
   * 删除分类事件
   */
  classDel: function() {
    var that = this;
    app.request(
      config.hostUrl + '/v1/assortment_module/delectGoodsClass/' + wx.getStorageSync('token'), {
        'class_index': that.data.index,
      },
      function(res) {
        that.setData({
          del_hid: true,
          hid: true
        })
        app.point(res.data.retMsg, 'success', 3000)
        that.onLoad();
      },
    )
  },
  /**
   * 编辑分类事件
   */
  goodsclass: function() {
    var that = this;
    app.request(
      config.hostUrl + '/v1/assortment_module/modifyGoodsClass/' + wx.getStorageSync('token'), {
        'class_index': that.data.datas.index,
        'class_name': that.data.datas.class_name,
        'class_img_url': that.data.datas.class_img_url
      },
      function(res) {
        console.log(res)
      },
      'POST',
    )
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    app.request(
      config.hostUrl + '/v1/assortment_module/getGoodsClass', {},
      function(res) {
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

  },
  /**
   * 点击添加分类弹框外部，弹框消失
   */
  classification:function(e){
    if(e.currentTarget.dataset.classification){
      this.setData({
        hid:true
      })
    }
  }
})