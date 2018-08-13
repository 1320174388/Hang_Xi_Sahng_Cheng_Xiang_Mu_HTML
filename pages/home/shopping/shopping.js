// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAllSelect: false,//是否全选
    totalMoney: 0,//价钱总和

    carts: [],
    /*加减按钮*/
    input: {
      // input默认是1  
      num: 1,
      // 使用data数据对象设置样式名  
      minusStatus: 'disabled',
    },
  },
  //跳转到填写订单
  jump_fillOrider: function() {
    wx.navigateTo({
      url: '../fillOrider/fillOrider',
    })
  },

  /* 点击减号 */
  bindMinus: function() {
    var input = this.data.input;
    var num = this.data.input.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      'input.num': num,
      'input.minusStatus': minusStatus,
    });
    //获取返回后的数量
    var num = this.data.input.num;
    //获取请求后的单价
    var price = this.data.price;
    var preferential = this.data.item.preferential;
    var total_fee = num * price - preferential;
    if (this.data.sx == true) {
      var total_fee = num * price - preferential;
    } else {
      var total_fee = num * price;
    }
    //返回改动后的金额
    this.setData({
      'total_fee': total_fee
    })
  },
  /* 点击加号 */
  bindPlus: function() {
    var input = this.data.input;
    var num = this.data.input.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      'input.num': num,
      'input.minusStatus': minusStatus,
    });
    //获取返回后的数量
    var num = this.data.input.num;
    //获取请求后的单价
    var price = this.data.price;
    var preferential = this.data.item.preferential;
    var total_fee = num * price - preferential;
    if (this.data.sx == true) {
      var total_fee = num * price - preferential;
    } else {
      var total_fee = num * price;
    }
    //返回改动后的金额
    this.setData({
      'total_fee': total_fee
    })
  },

  //勾选事件处理函数  
  switchSelect: function(e) {
    // 获取item项的id，和数组的下标值  
    var Allprice = 0,
      i = 0;
    let id = e.target.dataset.id,

      index = parseInt(e.target.dataset.index);
    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;
    //价钱统计
    if (this.data.carts[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney + this.data.carts[index].price;
    } else {
      this.data.totalMoney = this.data.totalMoney - this.data.carts[index].price;
    }
    //是否全选判断
    for (i = 0; i < this.data.carts.length; i++) {
      Allprice = Allprice + this.data.carts[i].price;
    }
    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    } else {
      this.data.isAllSelect = false;
    }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
    })
  },
  //全选
  allSelect: function(e) {
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelect) {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = true;
        this.data.totalMoney = this.data.totalMoney + this.data.carts[i].price;
      }
    } else {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      carts: this.data.carts,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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