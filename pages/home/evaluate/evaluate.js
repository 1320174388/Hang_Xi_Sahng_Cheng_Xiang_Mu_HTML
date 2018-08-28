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
    criticList:'',
    
    host: config.hostUrl,
    selet_show: true,
    num: 1,
   
    idx: null,
    searchPageNum: 0, // 设置加载的第几次，默认是第一次  
    searchLoadingComplete: false //“没有数据”的变量，默认false，隐藏
  },


  //跳转到填写订单
  orider: function(e) {
    var that = this;
    var token = wx.getStorageSync('token');
    var order_formd = e.detail.formId
    var outTradeNo = ""; //订单号
    for (var i = 0; i < 10; i++) //18位随机数，用以加在时间戳后面。
    {
      outTradeNo += Math.floor(Math.random() * 10);
    }
    var t = new Date();
    var month = t.getMonth() + 1;
    var getDate = t.getDate();
    var getHours = t.getHours();
    var getMinutes = t.getMinutes();
    var getSeconds = t.getSeconds();
    if (month < 10) {
      month = "0" + month;
    } else if (getDate < 10) {
      getDate = "0" + getDate
    } else if (getHours < 10) {
      getHours = "0" + getHours
    } else if (getMinutes < 10) {
      getMinutes = "0" + getMinutes
    } else if (getSeconds < 10) {
      getSeconds = "0" + getSeconds
    }
    outTradeNo = t.getFullYear() + "" + month + "" + getDate + "" + getHours + "" + getMinutes + "" + getSeconds + "" + outTradeNo; //时间戳，用来生成订单号。
    if (that.data.idx == null) {
      app.point('请先选择规格', 'none', 2000)
    } else if (that.data.idx !== null || that.data.idx == 0) {
      var order_groups = [];
      var order_group = that.data.goodData.style_data[that.data.idx];
      order_group.good_name = that.data.goodData.good_name,
        order_group.good_index = that.data.goodData.good_index,
        order_group.good_num = that.data.num,
        order_group.good_pic = that.data.goodData.good_img_master[0].picture_url,
        order_group.good_price = that.data.goodData.style_data[that.data.idx].style_price,
        delete order_group.active,
        delete order_group.style_index,
        delete order_group.style_price,
        order_groups[0] = order_group;
      wx.chooseAddress({
        success: function(res) {
          var order_people = res.userName;
          var order_phone = res.telNumber;
          var order_address = res.provinceName + res.cityName + res.countyName + res.detailInfo;
          app.point('正在创建订单', 'success', 2000)
          var orider = {
            //user_token: token, //用户标识`
            order_number: outTradeNo, //`订单号`
            order_people: order_people, //`收件人名称`
            order_phone: order_phone, //`收件人电话`
            order_address: order_address, //`收件人地址`
            order_formd: order_formd, //`表单提交ID`
            good_prices: order_group.good_num * order_group.good_price, //`商品总价格`
            order_gdnu: '1', //商品规格数量；
            order_group: order_groups,
          }
          wx.setStorageSync('orider', orider);
          wx.navigateTo({
            url: '../fillOrider/fillOrider?status=' + 1,
          })
        }
      })
    }
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
    var total = this.data.num * style_data[idx].style_price
    this.setData({
      'goodData.style_data': style_data,
      idx: idx,
      total: total.toFixed(2)
    })
  },
  // 增加数量
  addCount(e) {
    console.log(this.data.idx)
    if (this.data.idx==null) {
      app.point('请先选择规格', 'none', 2000)
      return false;
    } else if (this.data.idx !==null|| this.data.idx==0) {
      var num = this.data.num + 1;
      var total = num * this.data.goodData.style_data[this.data.idx].style_price
      this.setData({
        num: num,
        total: total.toFixed(2)
      });
    }
  },
  // 减少数量
  minusCount(e) {
    if (this.data.idx == null) {
      app.point('请先选择规格', 'none', 2000)
      return false;
    } else if (this.data.idx !== null || this.data.idx == 0) {
      var num = this.data.num;

      if (num <= 1) {
        return false;
      } else if (num > 1) {
        var num = num - 1;
        var total = num * this.data.goodData.style_data[this.data.idx].style_price
        this.setData({
          num: num,
          total: total.toFixed(2)
        });
      }
    }
  },
  //触底事件
  lower: function() {
    console.log("触底事件")
    var that = this;
    var searchPageNum = that.data.searchPageNum + 1; //每次触发上拉事件，把searchPageNum+1 
    // callbackcount = that.data.callbackcount; //返回数据的个数  

    app.request(
      config.hostUrl + '/v1/good_module/critic_get', {

        goodIndex: that.data.goodData.good_index
      },
      function (res) {
        console.log(res)
        if (res.data.retData.criticList.length== 12) {
          var newarr = that.data.criticList.concat(res.data.retData.criticList)
        console.log(newarr)
        that.setData({
          'criticList': newarr,
          searchPageNum: searchPageNum,
          searchLoadingComplete: false,
        })
        } else if (res.data.retData.criticList.length < 12) {
          var newarr = that.data.criticList.concat(res.data.retData.criticList)
        console.log(newarr)
        that.setData({
          'criticList': newarr,
          searchPageNum: searchPageNum,
          searchLoadingComplete: true,
        })
        }
       }
    )
  },

  //点击收藏
  mycollect: function(e) {
    var that = this;
    var token = wx.getStorageSync('token')
    if (that.data.mycollect == false) {
      app.request(
        config.hostUrl + '/v1/collect_module/collect_post', {
          'userToken': token,
          goodIndex: that.data.goodData.good_index
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
          goodIndex: that.data.goodData.good_index
        },
        function(res) {
          that.setData({
            mycollect: false
          })
        }, 'DELETE',
      )
    }
  },
  //加入购物车
  addcarts: function() {

    if (this.data.idx == null) {
      app.point('请先选择规格', 'none', 2000)
      return false;
    } else if (this.data.idx !== null || this.data.idx == 0) {
      /**
       * 处理购物车逻辑 
       */
      var project_cart = {
        'good_index': this.data.goodData.good_index,
        'good_name': this.data.goodData.good_name,
        'good_num': this.data.num,
        'style_name': this.data.goodData.style_data[this.data.idx].style_name,
        'style_price': this.data.goodData.style_data[this.data.idx].style_price,
        'good_image': this.data.goodData.good_img_master[0].picture_url,
      };
      if (wx.getStorageSync('project_carts')) {
        var project_carts = wx.getStorageSync('project_carts');
        for (var i in project_carts) {
          if (project_carts[i]) {

            if (project_carts[i].good_index == this.data.goodData.good_index) {
              app.point('商品已加入购物车', 'none', 2000)
              return false;
            }
          }
        }
        project_carts[project_carts.length] = project_cart;
        wx.setStorageSync('project_carts', project_carts);
      } else {
        var project_carts = [];
        project_carts[0] = project_cart;
        wx.setStorageSync('project_carts', project_carts);
      }
    }
  },
  //加载时获取的信息
  bindviewtap: function() {
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
    if (goodindex){
    var that = this;
    var token = wx.getStorageSync('token')
    //获取商品详情信息
    app.request(
      config.hostUrl + '/v1/good_module/good_details', {
        goodIndex: goodindex
      },
      function(res) {
        console.log(res)
        that.setData({
          goodData: res.data.retData.goodData,
          criticList: res.data.retData.criticList
        })
        //判断商品是否收藏接口
        app.request(
          config.hostUrl + '/v1/collect_module/collect_isget', {
            'userToken': token,
            goodIndex: that.data.goodData.good_index
          },
          function(res) {
            console.log(res)
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
    } 
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
    this.onLoad({ goodindex: this.data.goodData.good_index});
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