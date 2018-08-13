// pages/type/type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   类型列表
      typeList:[
          {
              title: "休闲食品",
              active:true
          },
          {
              title: "水果生鲜",
              active: false
          },
          {
              title: "儿童玩具",
              active: false
          },
          {
              title: "休闲食品",
              active: false
          },
          {
              title: "水果生鲜",
              active: false
          },
          {
              title: "儿童玩具",
              active: false
          }
          
      ],
    //   内容列表
      contentList:[
          {
              img:"../images/content.png",
              text:"分类一"
          },
          {
              img: "../images/content.png",
              text: "分类二"
          },
          {
              img: "../images/content.png",
              text: "分类三"
          },
          {
              img: "../images/content.png",
              text: "分类四"
          }
          
      ],
  },
    // 分类选择
    typeActive:function(res){
        var typeList = this.data.typeList;
        for (var i = 0; i < typeList.length;i++){
            typeList[i].active = false;
        }
        typeList[res.currentTarget.id].active = true;
        this.setData({
            typeList: typeList
        })
    },
  jump_shopDetail:function(){
    wx.navigateTo({
      url: '../shopDetail/shopDetail',
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