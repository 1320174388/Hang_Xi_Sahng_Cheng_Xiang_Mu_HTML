// pages/goodsDetail/goodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   详情和评价切换
      active:0,
    //   收藏的图标
      collectionIcon:'../images/collection.png',
    //   规格列表
      specList: [
          {
              spec: '规格1',
              active:true
          },
          {
              spec: '规格2',
              active: false
          },
          {
              spec: '规格3',
              active: false
          },
          {
              spec: '规格4',
              active: false
          }   
      ],
    //   规格弹框的显示隐藏
      specAlertShow:true,
  },
  specActiveFun:function(res){
      var specList = this.data.specList;
      for (var i = 0; i < specList.length;i++){
          specList[i].active = false;
      }
      specList[res.currentTarget.id].active = true;
      this.setData({
          specList: specList
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
//   详情
  activeDetail:function(){
      this.setData({
          active:0
      })
  },
//   评价
  activeEvaluate: function () {
      this.setData({
          active: 1
      })
  },
//  显示规格弹框
  specAlert:function(){
      if (this.data.specAlertShow){
          this.setData({
              specAlertShow: ''
          })
      }else{
          this.setData({
              specAlertShow: true
          })
      }
      
  },
//   收藏
  collection:function(){
      if (this.data.collectionIcon =='../images/collection.png'){
          this.setData({
              collectionIcon: '../images/collection-active.svg'
          })
      }else{
          this.setData({
              collectionIcon: '../images/collection.png'
          })
      }
      
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