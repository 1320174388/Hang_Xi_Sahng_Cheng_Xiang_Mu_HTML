//app.js
App({
  
    /**
     * 封装功能：弹框提示
     * 页面引入：var app = getApp();
     * 调用方法：app.point('提示信息','提示内容：success/none/loading','秒数');
     * 调用实例：app.point('添加成功','success',2000); // 秒数默认2000
     */
    point: function (title_info, icon_info, time = 2000) {
        // 弹框
        wx.showToast({
            title: title_info,
            icon: icon_info,
            duration: time
        });
    },
    /**
     * 封装功能：request请求
     * 页面引入：var app = getApp();
     * 调用方法：app.request(
     *              '请求路径',
     *              '请求参数',
     *              '请求成功的回调函数',
     *              '请求方式'
     *          );
     * 调用实例：app.request(
     *              'url地址',
     *              '{无请求参数时写一个空对象}',
     *              function(){回调函数},
     *              'GET/POST/PUT/DELETE(默认GET)'
     *          ); 
     */
    request: function (urls, datas,func,method='GET') {
        wx.request({
            url: urls,
            data: datas,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: method,
            success: func
        });
    },
    /**
     * 封装功能：upLoadFile上传文件
     * 页面引入：var app = getApp();
     * 调用方法：app.file(
     *              '上传路径',
     *              '上传文件的路径',
     *              '文件key值', 
     *              '上传需要的参数',
     *              '上传成功的回调函数'
     *          );
     * 调用实例：app.file(
     *              'url地址',
     *              '文件url地址',
     *              'name',
     *              {无请求参数时写一个空对象},
     *              function(){回调函数}
     *          ); 
     */
    file: function (urls, filePath, name, formData, func){
        wx.uploadFile({
            url: urls,
            filePath: filePath,
            name: name,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            formData: formData,
            success:function(res){
                var data = JSON.parse(res.data);
                func(data);
            }
        })
    },
    /**
     * 封装功能：alert弹出框
     * 页面引入：var app = getApp();
     * 调用方法：app.alert(
     *              '弹出框标题',
     *              '弹出框内容',
     *              '成功的回调函数',
     *              '取消按钮部分的文字', 
     *              '确定按钮部分的文字'
     *          );
     * 调用实例：app.alert(
     *              '弹出框',
     *              '这是一个弹出框',
     *              function(){回调函数},
     *              '取消',
     *              '确定'
     *          ); 
     */
    alert: function (title, content, func,cancelText = '取消', confirmText='确定'){
        wx.showModal({
            title:title,
            content: content,
            cancelText: cancelText,
            confirmText: confirmText,
            success:func
        })
    },
    /**
     * 封装功能：上传图片
     * 页面引入：var app = getApp();
     * 调用方法：app.image(
     *              '回调函数',
     *              '最大上传图片数量'
     *          );
     * 调用实例：app.image(
     *              function(){回调函数}，
     *              9
     *          ); 
     */
    image:function(func,count=9){
        wx.chooseImage({
            count:count,
            success: func,
        })
    }
});
var config = require('./config.js');

login_init();

function login_init(){
  wx.login({
    success:function(res){
      getApp().request(
        config.hostUrl + '/v1/login_module/login_init/'+res.code,
        {}, 
        function(res){
          console.log(res.data);
          wx.setStorageSync('token', res.data.retData.token)
        }, 'POST'
      );
    }
  })
  
}