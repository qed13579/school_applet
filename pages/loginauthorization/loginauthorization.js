const app = getApp();
const utils = require("../../utils/util.js");

// pages/loginauthorization/loginauthorization.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  // tojointlogon: function () {
  //   wx.navigateTo({
  //     url: '../jointlogon/jointlogon',
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },

  tomydetails: function () {
    wx.switchTab({
      url: '../mydetails/mydetails',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getWXUserinfo: function (options) {
    console.log(options.detail);
    //如果用户主动授权成功
    if (options.detail.errMsg == 'getUserInfo:ok') {
      //执行登录流程
      app.wxLogin(options.detail.userInfo);

      if(1==1){//判断是否之前有输入过手机号，输入过转跳到首页
        wx.switchTab({
          url: '/pages/index/index',
        });
      }
      // if (1 == 2) {//判断是否之前有输入过手机号
      //   wx.redirectTo({//判断是否之前有输入过手机号，没输入过转跳到联合登录页
      //     url: '/pages/jointlogon/jointlogon',
      //   });
      // }
     
    }
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