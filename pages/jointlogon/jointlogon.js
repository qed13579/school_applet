// pages/jointlogon/jointlogon.js
const utils = require('../../utils/util.js');

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUserData:[]
  },

  formSubmit: function (e) {
    console.log(e.detail.value.input.length);
if(e.detail.value.input==""){
  wx.showToast({
    icon:"none",
    title: '手机号不能为空',
  })
 
} else if (e.detail.value.input.length!=11){
  wx.showToast({
    icon: "none",
    title: '手机号要求11位',
  })
}else{

  var that = this;

  // http://api.school.comz/AppOpen/UpdateMobile?userToken=20180625160626456429&Mobile=15678636470&token=sddww111
  var apiUrl = app.globalData.webUrl + "/AppOpen/UpdateMobile";
  //构造参数
  //console.log(userInfo);
  var usertoken = utils.getStorageSync("userToken");//用户的微信id
  var token = app.globalData.initToken;//app的标识
  var params = { Mobile: e.detail.value.input, userToken: usertoken, token: token };
    //console.log(params);
    //发起请求
    // utils.netRequest(apiUrl, params, function (res) {
      console.log("手机录入成功")
    // },null, "GET");
  

  wx.showToast({
    title: '成功',
  })

  setTimeout(function () {
    wx.navigateBack({
      delta: 1,
    })

  }, 1000) 
  

}

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // that.loadingData(true);
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(1)
              console.log(res.userInfo)
              // 可以将 res 发送给后台解码出 unionId
              this.setData({
                webUserData: res.userInfo
              })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
            }
          })
        }
      }
    })
  },
  loadingData: function (isShowLoading) {
    var that = this;
    if (app.globalData.isLogin) {
      that.getWebUserData(isShowLoading);


    } else {
      app.updateUserInfoCallback = res => {
        that.getWebUserData(isShowLoading);

      }

    }

  },
  getWebUserData: function (isShowLoading) {
    var that = this;
    if (isShowLoading) utils.wxShowLoading("请稍候...", true);
    app.getUserData();
    app.getUserInfoCallback = res => {
      // console.log(1)
      // console.log(res.data)
      that.setData({
        webUserData: res.data,
        word: "您已登录"
      });

    }
    //手动关闭加载提示
    if (isShowLoading) utils.wxHideLoading();
    //手动停止刷新
    wx.stopPullDownRefresh();

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