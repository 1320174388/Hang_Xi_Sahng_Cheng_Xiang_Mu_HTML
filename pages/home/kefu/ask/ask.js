// pages/kefu/ask/ask.js
var app = getApp();
var config = require('../../../../config.js');
// 控制客服信息内对话框的数量
var index = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      talkImgOthers:"",
      //  当前时间
      time:"", 
      //  底部按钮的文字 
      footBtnText: ['客服信息', '发起提问','我的提问'],
      // 点击时增加的次数  
      footBtnClick:[],
      //  历史提问
      myAsk:[] ,
    //   客服信息
      kefuInfo:[],
    //   对话框内容
      talkContent:[],
    //   历史提问的单个内容
      historyAskArr:'',
      historyAskTitle:'',
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
  //   点击底部按钮添加弹出框
  askClick:function(res){
      var that = this;
      if (res.target.id==2){
          wx.request({
              url: config.hostUrl+'/v1/talk_module/info_get',
              method:'GET',
              data:{
                  'peopleIndex':wx.getStorageSync('token')
              },
              success:function(e){
                
                console.log(e.data.retMsg);
                  if (e.data.retMsg==[]){
                      wx.showToast({
                          title: '还没有提问过任何问题',
                          icon:'none',
                          duration:1000
                      })
                  }else{
                      var myAsk = e.data.retMsg;
                      that.setData({
                          myAsk: myAsk
                      });
                  }
                
                  
               
              }
          })
      } else if (res.target.id==0){
          wx.request({
              url: config.hostUrl+'/v1/talk_module/replys_list/',
              method:'GET',
              success:function(res){
                console.log(res.data);
                  that.setData({
                      kefuInfo: res.data.retMsg
                  })
              }
          })
      }
    var footBtnClick = this.data.footBtnClick;
    var footBtnClickObj = {
        id: res.target.id,
        index:'',
    }
    footBtnClick.push(footBtnClickObj);
    this.setData({
        footBtnClick: footBtnClick
    })
    this.onLoad();
  },
//   发起提问
  ask:function(res){
      var that = this;
      var response = res;
    var title = res.detail.value.title;
    var content = res.detail.value.textContent;
    wx.showToast({
        title: '正在提交',
        icon:'loading',
        duration:36000
    })
    wx.getUserInfo({
        success:function(e){
            app.request(config.hostUrl +'/v1/talk_module/info_post',{
                "peopleIndex":wx.getStorageSync('token'),
                "peopleFormid":res.detail.formId,
                "peopleName":e.userInfo.nickName,
                "peopleSex": e.userInfo.gender,
                "leavingTitle": title,
                "messageCont": content
            },function(res){
                if(res.data.retData){
                    var footBtnClick = that.data.footBtnClick;
                    footBtnClick.splice(response.detail.target.id,1)
                    that.setData({
                        resetTitle: '',
                        resetContent: '',
                        footBtnClick: footBtnClick
                    })
                    wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 1000
                    })
                }else{
                    wx.showToast({
                        title: res.data.retMsg,
                        icon: 'none',
                        duration: 1000
                    })
                }
                
            },'post');
        }
    })  
  },
//   继续提问
  askContinue:function(res){
      var that = this;
      var response = res;
      var historyAskArr = this.data.historyAskArr;
      var leaving_index = historyAskArr[0].leaving_index;
      var content = res.detail.value.textContent;
      app.request(config.hostUrl + '/v1/talk_module/info_do_post', {
          "peopleIndex": wx.getStorageSync('token'),
          "peopleFormid": res.detail.formId,
          "leavingIndex": leaving_index,
          "messageCont": content
      }, function (res) {
          if (res.data.retData) {
              var footBtnClick = that.data.footBtnClick;
              footBtnClick.splice(response.detail.target.id,1);
              that.setData({
                  resetContent: '',
                  footBtnClick: footBtnClick
              })
              wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 1000
              });
              
          } else {
              wx.showToast({
                  title: res.data.retMsg,
                  icon: 'none',
                  duration: 1000
              })
          }

      },'post')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.pageScrollToBottom();
      var time = new Date();
      var X = time.getDay();
      var H = time.getHours();
      var M = time.getMinutes();
      if(M<10){
          M = '0'+M;
      }
      var week = ["日", "一", "二", "三", "四", "五", "六"];
      this.setData({
          time: "星期" + week[X] + "" + H + ":" + M
      })
  },
//   客服信息点击
    kefuReply:function(res){
        var footBtnClick = this.data.footBtnClick;
        var kefuInfo = this.data.kefuInfo;
        if (res.target.id==""){
            var ind = res.currentTarget.id;
        }else{
            var ind = res.target.id;
        }
        
        var talkContentArray = this.data.talkContent;
        index++;
        var footBtnClickObj = {
            id:'3',
            index: index
        }
        var talkContent = {
            content: kefuInfo[ind].session_content,
            index: index
        };
        footBtnClick.push(footBtnClickObj);
        talkContentArray.push(talkContent);
        this.setData({
            footBtnClick: footBtnClick,
            talkContent: talkContentArray
        });
        this.pageScrollToBottom();
    },
    // 历史提问点击
    historyAsk:function(res){
        var that = this;
        if (res.target.id == "") {
            var id = res.currentTarget.id;
        } else {
            var id = res.target.id;
        }
        var myAsk = this.data.myAsk;
        var askObj = {
            id:'4',
            index:''
        }
        var footBtnClick = that.data.footBtnClick;
        footBtnClick.push(askObj);
        var leavingIndex = myAsk[id].leaving_index;
        wx.request({
            url: config.hostUrl + '/v1/talk_module/info_details',
            method: 'GET',
            data:{
                leavingIndex: leavingIndex
            },
            success: function (res) {
                console.log(res.data.retMsg);
                that.setData({
                    historyAskArr: res.data.retMsg,
                    historyAskTitle: myAsk[id].leaving_title,
                    footBtnClick: footBtnClick
                });
                that.pageScrollToBottom();
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