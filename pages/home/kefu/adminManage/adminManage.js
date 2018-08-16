var config = require('../../../../config.js');
var app = getApp();
// 获取时间日期
var time = new Date();
var Y = time.getFullYear();
var M = time.getMonth() + 1;
var D = time.getDate();
var X = time.getDay();
var H = time.getHours();
var m = time.getMinutes();
if(m<10){
    m = '0'+m
}
var week = ["日", "一", "二", "三", "四", "五", "六"]
var strTime = M + '月' + D + '日' + ' 星期' + week[X];
var askTime = Y + '年' + M + '月' + D + '日 '+ H +':' + m
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   顶部时间
      time: strTime,
    //   提问时间
      asktime: askTime,
    //   选项卡的显示
      idCardShow: 0,
      idCardColorAsk: 1,
    //   顶部选项卡透明度
      idCardColorReply: 0.5,
    //   用户信息列表
      userList:[],
    //   控制添加的显示隐藏
      addBoolear:false,
    //   自动回复列表
      askList:[],
    //   控制编辑显示隐藏
      editBoolear: false,
    //   编辑默认显示
      editShowTitle:'',
      editShowContent:'',
      editShowIndex:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      var token = wx.getStorageSync('token');
      var that = this;
      wx.request({
          url: config.hostUrl + '/v1/talk_module/user_route/' + wx.getStorageSync('token'),
          method: 'GET',
          success: function (res) {
              var list = res.data.retMsg;
              for(var i = 0;i<list.length;i++){
                  if (list[i].people_sex==1){
                      list[i].sex = '男'
                  } else if (list[i].people_sex == 2){
                      list[i].sex = '女'
                  }else{
                      list[i].sex = '未知'
                  }
              }
              console.log(list);
              that.setData({
                  userList: list
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
  
  },
  //   点击用户提问切换用户提问模块
  idCardAsk: function (res) {
      console.log(res);
      this.setData({
          idCardColorAsk: 1,
          idCardColorReply: 0.5,
          idCardShow: 0,
          addBoolear:false,
          editBoolear: false,
      });
      if(res){
          app.request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
              adminFormid: res.detail.formId
          }, function (res) {
              console.log(res);
          },'post')
      }
      
  },
  //   点击自动回复切换自动回复模块
  idCardReply: function (res) {
      if (res) {
          app.request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
              adminFormid: res.detail.formId
          }, function (res) {
              console.log(res);
          },'post')
      }
      this.setData({
          idCardColorAsk: 0.5,
          idCardColorReply: 1,
          idCardShow: 3,
          addBoolear: false,
          editBoolear: false,
      });
      var that = this;
      wx.request({
          url: config.hostUrl+'/v1/talk_module/replys_route/'+wx.getStorageSync('token'),
          method:'GET',
          success:function(res){
              var list = res.data.retMsg;
              that.setData({
                  askList:list
              })
          }
      })
  },
  //点击查看用户名下所有问题
  askLook: function (res) {
      var userList = this.data.userList;
      var index = userList[res.currentTarget.id].people_index;
      app.request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
          adminFormid: res.detail.formId
      }, function (res) {
          
      },'post');
      wx.navigateTo({
          url: '../question/question?index='+index,
      })
  },
  //点击查看问题详细内容
  askContentLook: function () {
      this.setData({
          idCardShow: 2
      })
  },
//   点击添加按钮
  addAsk:function(res){
      app.request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
          adminFormid: res.detail.formId
      }, function (res) {
          
      },'post');
      this.setData({
          addBoolear:true,
          editBoolear: false,
      });
      this.pageScrollToBottom();
  },
//   添加回复信息
  addAskUpload:function(res){
      
      var that = this;
      app.request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
          adminFormid: res.detail.formId
      }, function (res) {
          console.log(res);
      },'post');
      app.request(config.hostUrl +'/v1/talk_module/replys_route/'+wx.getStorageSync('token'),{
          sessionName:res.detail.value.titleInpt,
          sessionType:'text',
          sessionCont: res.detail.value.askContent
      },function(e){
          if(e.data.retData){
              wx.showToast({
                  title: '添加成功',
                  icon:'success',
                  duration:1000
              })
              that.idCardReply();
          }else{
              wx.showToast({
                  title: '添加失败',
                  icon: 'none',
                  duration: 1000
              })
          }
          
      },'post')
      
  },
//   编辑自动回复
    replyEdit:function(res){
        app.request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
            adminFormid: res.detail.formId
        }, function (res) {
            console.log(res);
        },'post');
        var asklist = this.data.askList;
        this.setData({
            editBoolear:true,
            addBoolear: false,
            editShowTitle: asklist[res.detail.target.id].session_name,
            editShowContent: asklist[res.detail.target.id].session_content,
            editShowIndex: asklist[res.detail.target.id].session_index,
        });
        this.pageScrollToBottom();
    },
    // 编辑自动回复保存
    replyEditUp:function(res){
        
        app.request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
            adminFormid: res.detail.formId
        }, function (res) {
            console.log(res);
        },'post');
        var that = this;
        wx.request({
            url: config.hostUrl + '/v1/talk_module/replys_route/' + wx.getStorageSync('token'),
            method:'PUT',
            data:{
                sessionIndex: that.data.editShowIndex,
                sessionName: res.detail.value.titleInpt,
                sessionType: 'text',
                sessionCont: res.detail.value.askContent
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success:function(e){
                if (e.data.retData) {
                    wx.showToast({
                        title: '修改成功',
                        icon: 'success',
                        duration: 1000
                    })
                    that.idCardReply();
                } else {
                    wx.showToast({
                        title: '修改失败',
                        icon: 'none',
                        duration: 1000
                    })
                }
            }

        })
        
    },
    // 删除自动回复
    replyRemove:function(res){
        
        app.request(config.hostUrl + '/v1/talk_module/admin_route/' + wx.getStorageSync('token'), {
            adminFormid: res.detail.formId
        }, function (res) {
            console.log(res);
        },'post');
        var that = this;
        var asklist = this.data.askList;
        var id = asklist[res.detail.target.id].session_index;
        wx.showModal({
            title: '确定删除？',
            success: function (res) {
                if(res.confirm){
                    wx.request({
                        url: config.service.host + '/v1/talk_module/replys_route/' + wx.getStorageSync('token'),
                        method: 'DELETE',
                        data: {
                            sessionIndex: id,
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (e) {

                            if (e.data.retData) {
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 1000
                                })
                                that.idCardReply();
                            } else {
                                wx.showToast({
                                    title: '删除失败',
                                    icon: 'none',
                                    duration: 1000
                                })
                            }
                        }

                    })
                }
            }
        })
        
    },
    // 获取容器高度，使页面滚动到容器底部
    pageScrollToBottom: function () {
        wx.createSelectorQuery().select('#wrap').boundingClientRect(function (rect) {
            // 使页面滚动到底部
            wx.pageScrollTo({
                scrollTop: rect.height
            })
        }).exec()
    },
})