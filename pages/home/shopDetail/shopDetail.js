// pages/shopDetail/shopDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shopList:[
          {
              img:"../images/content.png",
              title:"四川梅干菜100-120g*2个",
              detail:"榨果汁做烹饪，样样精通",
              price:6.1,
              sell:12345
          },
          {
              img: "../images/content.png",
              title: "四川梅干菜100-120g*2个",
              detail: "榨果汁做烹饪，样样精通",
              price: 5.9,
              sell: 1234
          },
          {
              img: "../images/content.png",
              title: "四川梅干菜100-120g*2个",
              detail: "榨果汁做烹饪，样样精通",
              price: 7.2,
              sell: 123
          },
          {
              img: "../images/content.png",
              title: "四川梅干菜100-120g*2个",
              detail: "榨果汁做烹饪，样样精通",
              price: 8.8,
              sell: 12
          }
      ]
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