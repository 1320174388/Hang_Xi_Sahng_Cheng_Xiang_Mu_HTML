// pages/Addcommodity/Addcommodity.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_parent: [], //获取分类名称
    son_class: [],
    index: 0, //
    index1: 0,
    movies: [], //获取轮播图
    int_name: [{
      "styleName": "规格名称",
      "stylePrice": "123"
    }, {
      "styleName": "规格名称",
      "stylePrice": "123"
    }], //商品规格信息
    upimgs: [], //商品详情图
    names: '', //商品名
    prices: '', //商品价格
    num: '', //商品数
    gs: [],
    hidden: true,
    show: false,
    selet_show: true,
    selet_show1: true,
    hid: true,
    s_hid: true,
  },

  selet_hid: function(e) {
    if (this.data.selet_show == true) {
      this.setData({
        selet_show: false
      })
    }
  },
  item_list: function(e) {
    var idx = e.currentTarget.dataset.index;
    console.log(idx)
    this.setData({
      'index': idx,
      selet_show: true,
      son_class: this.data.s_parent[idx].son_class
    })
  },
  selet_hid1: function(e) {
    if (this.data.s_parent[this.data.index].son_class == '') {
      wx.showToast({
        title: '我暂时还没有分支哦',
      })
      this.setData({
        selet_show1: true
      })
    } else
    if (this.data.selet_show1 == true) {
      this.setData({
        selet_show1: false
      })
    }
  },
  item_list1: function(e) {
    console.log(e)
    var idx = e.currentTarget.dataset.index;
    console.log(idx)
    console.log(this.data.son_class)
    this.setData({
      index1: idx,
      selet_show1: true,

    })
    console.log(this.data.index1)
  },
  //上传图片
  upImages: function() {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res)
        that.setData({
          movies: res.tempFilePaths
        })
      },
    })
  },
  //上传图片
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
          upimgs: res.tempFilePaths
        })
      },
    })
  },

  bindChange: function(e) {
    console.log(e)
    var index = e.detail.value[0]
    this.setData({
      index: index
    })
    console.log(this.data.s_parent)
    console.log(this.data.s_parent[index].son_class)
  },


  int_name_add: function(e) {
    console.log(e)
    var arr = {}
    this.setData({
      int_name: this.data.int_name.concat(arr)
    })
    console.log(this.data.int_name)
    console.log(e.currentTarget.dataset.index)
  },
  int_name_del: function(e) {
    console.log(e)
    var list = this.data.int_name;

    var index = e.currentTarget.dataset.index;
    list.splice(index, 1);
    this.setData({
      int_name: list
    })
    if (list == "") {
      var arr = {};
      this.setData({
        int_name: this.data.int_name.concat(arr)
      })
    }

    console.log(this.data.int_name)
  },
  styleName: function(e) {
    console.log(e)
    var i = e.currentTarget.dataset.index;
    console.log(i)
    this.data.int_name[i].styleName = e.detail.value;
    this.setData({
      int_name: this.data.int_name,
    })
    console.log(this.data.int_name)
  },
  stylePrice: function(e) {

    var i = e.currentTarget.dataset.index
    this.data.int_name[i].stylePrice = e.detail.value;
    this.setData({
      int_name: this.data.int_name,
    })
    console.log(this.data.int_name)
  },

  classAdd: function(e) {
    console.log(e)
    var that = this;
    if (that.data.son_class == "") {
      var classindex = that.data.s_parent[that.data.index].class_index;
    } else {
      var classindex = that.data.son_class[that.data.index1].class_index;
    }
    var inpt = that.data.int_name;
    var class_index = JSON.stringify(inpt);
    /** if (!This.data.movies) {
      app.point(
        '请上传轮播图片',
        'none',
        1000
      )
      return false;
    }else
      if (!This.data.upimgs) {
      app.point(
        '请上传详情图片',
        'none',
        1000
      )
      return false;
    // }**/

    //添加商品
    app.request(
      config.hostUrl + '/v1/good_module/good_post/' +
      wx.getStorageSync('token'), {
        'goodName': e.detail.value.names,
        'classIndex': classindex,
        'goodPrice': e.detail.value.price,
        'goodSales': e.detail.value.num,
        'goodStyle': class_index,
      },
      function(res) {
        console.log(res)
        console.log(that.data)
        app.file(
          config.hostUrl + 'v1/good_module/good_image_post/' + wx.getStorageSync('token'),
          that.data.movies,
          'name', {

          },
          function() {
            回调函数
          }
        );
        // app.file(
        //   config.hostUrl + 'v1/good_module/good_image_post/' + wx.getStorageSync('token'), {
        //   },
        //   that.data.images,
        //   'images', {},
        //   function(res) {}
        // )

      }, 'POST')
  },
  uploadimgs: function(page, path) {
    var that = this;
    var curImgList = [];
    console.log(that.data.movies)
    for (var i = 0; i < path.length; i++) {
      wx.showToast({
          icon: 'loading',
          title: '正在上传',
        }),
        app.file(
          config.hostUrl + 'v1/good_module/good_image_post/' + wx.getStorageSync('token'),
          that.data.movies[i],
          'file', {
            'goodIndex':'',
            'imageType':master,
            'imageSort':i,
            'imageFile':'',
          },
          function(res) {
            console.log(res);
            curImgList.push(res.data);
            var evalList =this.data.movies;
            evalList[0] =curImgList;
            that.setData({
              movies:evalList
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
    app.request(
      config.hostUrl + '/v1/assortment_module/getGoodsClass/' + wx.getStorageSync('token'), {},
      function(res) {
        var s = [];
        for (var i = 0; i < res.data.retData.length; i++) {
          s = res.data.retData[i].class_name
        }
        console.log()
        that.setData({
          s_parent: res.data.retData,
          son_class: res.data.retData[0].son_class
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