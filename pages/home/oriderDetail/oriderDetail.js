// pages/home/oriderDetail/oriderDetail.js
var config = require('../../../config.js');
var shopId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      orderDetail:'',
    //   图片域名
      host:config.hostUrl,
    evaluate: true,
  },
  evaluate: function (e) {
    this.setData({
      evaluate: false,
    })
    // 获取商品
      shopId = e.currentTarget.id;
  },
//   评价上传
    pjFun:function(res){
        var that = this;
        getApp().request(config.hostUrl +'/v1/order_module/orderDoodsComment',{
            order_number: that.data.orderDetail.order_number,
            user_token: that.data.orderDetail.user_token,
            good_index: that.data.orderDetail.details[shopId].good_index,
            critic_content: res.detail.value.content,
            critic_name: that.data.orderDetail.order_people,
        },function(res){
            if(res.data.errNum == 0){
                that.setData({
                    evaluate:true,
                });
                getApp().point(res.data.retMsg,'success',1000);
                setTimeout(function(){
                    var orderDetail = that.data.orderDetail;
                    orderDetail.details[shopId].critic_status = 1;
                    that.setData({
                        orderDetail: orderDetail,
                    })
                },1000)
                
            }
        },'post');
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var that = this;
      getApp().request(config.hostUrl + '/v1/order_module/getOrderDetails',{
          order_number: options.orderNum
      },function(res){
        if(res.data.retData){
            var orderObj = res.data.retData;
            var zj = 0;
            for (var i = 0; i < orderObj.details.length;i++){
                zj += parseFloat(orderObj.details[i].good_num * orderObj.details[i].good_price);
            }
            orderObj.zj = zj;
            that.setData({
                orderDetail: orderObj,
                orderPeople: orderObj.order_people,
            })
            console.log(orderObj);
        }
      });


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