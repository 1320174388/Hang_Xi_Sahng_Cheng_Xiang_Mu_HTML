// pages/shopDetail/shopDetail.js
var config = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shopList:[
        //   {
        //       img:"../images/content.png",
        //       title:"四川梅干菜100-120g*2个",
        //       detail:"榨果汁做烹饪，样样精通",
        //       price:6.1,
        //       sell:12345
        //   }
      ],
      orderType:'no',
        //   img地址前缀
      imgHost: config.hostUrl,
  },
  jump_evaluate: function () {
    wx.navigateTo({
      url: '../evaluate/evaluate',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      getApp().request(config.hostUrl +'/v1/good_module/good_get_list',{
          classIndex: options.classIndex,
          goodLimit: that.data.shopList.length,
          orderType: that.data.orderType
      },function(res){
          if(res.data.retData){
              that.setData({
                  shopList: res.data.retData
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