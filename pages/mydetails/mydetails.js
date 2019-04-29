// pages/mydetails/mydetails.js
const app = getApp();
const utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUserData: [],
    tempFilePaths: '',
    word: "您已登录",

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
  tophone:function(){
      wx.navigateTo({
        url: '/pages/jointlogon/jointlogon',
      })
  },
  tomyclass: function () {
    wx.navigateTo({
      url: '../myclass/myclass',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  topurchaseclass: function () {
    wx.navigateTo({
      url: '../purchaseclass/purchaseclass',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  toorder: function () {
    wx.navigateTo({
      url: '../order/order',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tomyreservationcard: function () {
    wx.navigateTo({
      url: '../myreservationcard/myreservationcard',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tologin: function () {
    wx.navigateTo({
      url: '../loginauthorization/loginauthorization',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
  // getWebUserData: function (isShowLoading) {
  //   var that = this;
  //   if (isShowLoading) utils.wxShowLoading("请稍候...", true);
  //   app.getUserData();
  //   app.getUserInfoCallback = res => {
  //     // console.log(1)
  //     // console.log(res.data)
  //     that.setData({
  //       webUserData: res.data,
  //       word: "您已登录"
  //     });

  //   }
  //   //手动关闭加载提示
  //   if (isShowLoading) utils.wxHideLoading();
  //   //手动停止刷新
  //   wx.stopPullDownRefresh();

  // },
  
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
  chooseimage: function () {
    var that = this;
    wx.showModal({
      content: '修改头像需要在微信里面操作',
      title: '(#^.^#)',
      showCancel: false
    })

  },



})