// pages/shopping/shopping.js
var config = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: '', // 购物车列表
    hasList: false, // 列表是否有数据
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: false, // 全选状态时为true
    host: config.hostUrl,
    editor: true, //显示删除+
  },
  //跳转到填写订单或删除全部
  jump_fillOrider: function(e) {
    var that = this;
    var carts = that.data.carts;
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
    if (that.data.editor == true) {

      var order_groups = [];
      var total = 0;
      console.log(that.data.carts)
      //遍历出需要的数据放入order_groups
      for (var i = 0; i < that.data.carts.length; i++) { // 循环列表得到每个数据
        if (that.data.carts[i]) {
          if (that.data.carts[i].selected) {
            order_groups.push(that.data.carts[i])
          }
        }
      }
      console.log(order_groups)
      if (order_groups.length !== 0) {
        //筛选数组中具体信息
        for (var i = 0; i < order_groups.length; i++) {
          order_groups[i].good_pic = order_groups[i].good_image
          order_groups[i].good_price = order_groups[i].style_price
          delete order_groups[i].selected
          delete order_groups[i].good_image
          delete order_groups[i].style_price
        }
        //获取微信地址电话
        wx.chooseAddress({
          success: function(res) {
            var order_people = res.userName;
            var order_phone = res.telNumber;
            var order_address = res.provinceName + res.cityName + res.countyName + res.detailInfo;
            //将要缓存的信息放入orider
            var orider = {
              //user_token: token, //用户标识`
              order_number: outTradeNo, //`订单号`
              order_people: order_people, //`收件人名称`
              order_phone: order_phone, //`收件人电话`
              order_address: order_address, //`收件人地址`
              order_formd: e.detail.formId, //`表单提交ID`       
              good_prices: that.data.totalPrice, //`商品总价格`
              order_gdnu: order_groups.length, //商品规格数量
              order_group: order_groups,
            }

            app.point('正在创建订单', 'success', 2000)
            wx.setStorageSync('orider', orider);
            for (var i = 0; i < that.data.carts.length; i++) { // 循环列表得到每个数据
              if (that.data.carts[i]) {
                if (that.data.carts[i].selected) {
                  console.log(that.data.carts[i])
                  that.data.carts.splice(i, 1)
                }
              }
            }
            that.setData({
              carts: that.data.carts,
              totalPrice: 0
            })
            wx.setStorageSync('project_carts', that.data.carts);
            wx.navigateTo({
              url: '../fillOrider/fillOrider',
            })

          }
        })
      } if (order_groups.length == 0){

        app.point('请先选择要购买的商品', 'none', 2000)
        return false;
      }

    } else if (that.data.editor !== true) {
      for (var i = 0; i < that.data.carts.length; i++) { // 循环列表得到每个数据
        if (that.data.carts[i]) {
          if (that.data.carts[i].selected) {
            console.log(that.data.carts[i])
            that.data.carts.splice(i, 1)
          }
        } 
      }
      console.log(that.data.carts)
      app.point('正在删除购物车商品', 'success', 2000)
      that.setData({
        carts: that.data.carts,
        totalPrice: 0
      })
      wx.setStorageSync('project_carts', that.data.carts);
    }
  },

  //编辑点击
  editor: function() {
    var editor = this.data.editor;
    if (editor == true) {
      this.setData({
        editor: false
      })
    } else if (editor !== true) {
      this.setData({
        editor: true
      })
    }
  },

  getTotalPrice() {
    let carts = wx.getStorageSync('project_carts'); // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i]) {
        if (carts[i].selected) { // 判断选中才会计算价格
          total += carts[i].good_num * carts[i].style_price; // 所有价格加起来
        }
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },

  // 获取购物车列表
  selectList(e) {
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let carts = wx.getStorageSync('project_carts'); // 获取购物车列表
    const selected = carts[index].selected; // 获取当前商品的选中状态
    carts[index].selected = !selected; // 改变状态
    wx.setStorageSync('project_carts', carts);
    this.getTotalPrice(); // 重新获取总价
  },
  // 是否全选状态
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = wx.getStorageSync('project_carts');
    for (let i = 0; i < carts.length; i++) {
      if (carts[i]) {
        carts[i].selected = selectAllStatus; // 改变所有商品状态
      }
    }
    this.setData({
      selectAllStatus: selectAllStatus,
    });
    wx.setStorageSync('project_carts', carts);
    this.getTotalPrice(); // 重新获取总价
  },

  // 增加数量
  addCount(e) {

    const index = e.currentTarget.dataset.index;
    let carts = wx.getStorageSync('project_carts');

    let num = carts[index].good_num;
    num = num + 1;
    carts[index].good_num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    wx.setStorageSync('project_carts', carts);
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = wx.getStorageSync('project_carts');
    let num = carts[index].good_num;
    if (num <= 1) {
      app.point('受不了了，宝贝不能再减少了！', 'none', 2000)
      return false;
    }
    num = num - 1;
    carts[index].good_num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    wx.setStorageSync('project_carts', carts);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    setInterval(function(res) {
      var carts = wx.getStorageSync('project_carts')
      that.setData({
        carts: carts
      })
      that.getTotalPrice();
    }, 500);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
            }, 'post')
        } else {
          return false;
        }
      }
    })

  },
})