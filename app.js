
//app.js
const utils = require("utils/util.js");
// const common = require("utils/common.js");
App({
  //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch: function () {
    var that = this;
    //手动隐藏底部导航栏，在首页加载完数据后手动显示
    // wx.hideTabBar();
    //检查微信登录是否有效
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('--微信 session_key 登录有效--');
        that.getWXUserInfo(function (WXUserInfo) {
          //执行登录流程
          that.wxLogin(WXUserInfo);
        });
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        console.log('--微信 session_key 登录无效--');
        wx.redirectTo({
          url: '/pages/loginauthorization/loginauthorization',
        });
      }
    })

    //获取系统信息。
    wx.getSystemInfo({
      success: res => {
        console.log(res);
        this.globalData.SystemInfo = res;
      },
      fail: res => {
        console.log(res);
      }
    });

    wx.login({
      timeout: 10000,
      success: res => {
          console.log(res)
      },
      fail:res=>{
        console.log(res)
      }
    });
  },

  /**
   * 当用户授权过，可以使用该接口获取用户信息
   */
  getWXUserInfo: function (callback) {
    //已经授权，可以直接调用 getUserInfo 获取头像昵称
    wx.getUserInfo({
      success: res => {
        console.log('--微信用户信息获取成功！--');
        console.log(res.userInfo);
        callback(res.userInfo);
      },
      fail: res => {
        console.log('--微信用户信息获取失败！--');
        console.log(res);
        wx.reLaunch({
          url: '/pages/loginauthorization/loginauthorization',
        });
      }
    })
  },

  //当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow: function (options) {
    // Do something when show.
  },

  //当小程序从前台进入后台，会触发 onHide
  onHide: function () {
    // Do something when hide.
  },

  //当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  onError: function (msg) {
    console.log(msg)
  },

  //页面不存在监听函数
  onPageNotFound: function () {

  },

  //开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问
  globalData: {
    userInfo: null, //微信用户信息
    webUserData: null,//平台用户信息
    webUrl: "https://api.kuailaiyingka.com",
    initToken: "5d375nbj2rc92cqc",
    SystemInfo: null,
    isLogin: false,
    Cinema: " 快来培训",
    taskTypeList: [] //任务类型列表
  },

  /**
   * 第一步：微信登录
   * WXUserInfo 从用户授权界面主动获取用户信息并传入
   */
  wxLogin: function (WXUserInfo) {
    //手动开启加载提示
    //utils.wxShowLoading("请稍候...", true);
    wx.login({
      timeout: 10000,
      success: res => {
        var that = this;
        console.log('--1、微信用户登录成功--！');
        //微信登录成功后，获取微信用户的信息
        //如果有传入则直接赋值，否则调用微信 API 接口获取用户信息
        //console.log(WXUserInfo)
        if (WXUserInfo) {
          that.globalData.userInfo = WXUserInfo;
          // that.globalData.userInfo = WXUserInfo;
          //微信登录后返回的 code
          var wxcode = res.code;
          
          console.log(wxcode)
          //发送 res.code 到后台换取 openId, sessionKey, unionId
          // that.onLogin(that.globalData.initToken, wxcode);
        } else {
          wx.redirectTo({
            url: '/pages/loginauthorization/loginauthorization',
          });
        }
      }
    });
  },
  /**
   * 第二步：微信用户登录成功后，执行同步登录操作
   * token 影院标识
   * code 微信登录成功后返回的 code
   */
  onLogin: function (token, code) {
    var that = this;
    var apiUrl = that.globalData.webUrl + "/wxopen/onlogin";
    var params = { token: token, code: code }
    //第二步：执行同步登录
    utils.netRequest(apiUrl, params, function (res) {
      console.log("--2、同步登录成功！--");
      // 缓存 usertoken 和 sessionKey 到本地存储中
      utils.setStorageSync("userToken", res.data.userToken);
      utils.setStorageSync("sessionKey", res.data.sessionKey);
      //第三步：更新用户信息
      that.updateUserInfo(res.data.userToken, token);
    }, function (res) {
      // console.log(res);
      utils.wxshowToast(res.error);
    }, "GET", false);
  },

  /**
   * 第三步：更新用户信息
   */
  updateUserInfo: function (userToken, token) {
    var that = this;
    var apiUrl = that.globalData.webUrl + "/wxopen/updateinfo";
    //构造参数
    //console.log(userInfo);
    var userInfo = this.globalData.userInfo;
    if (userInfo != null) {
      var params = new Object();
      params.userToken = userToken;
      params.nickName = userInfo.nickName;
      params.avatarUrl = userInfo.avatarUrl;
      params.gender = userInfo.gender;
      params.address = userInfo.province + "," + userInfo.city;
      params.token = token;
      //console.log(params);
      //发起请求
      utils.netRequest(apiUrl, params, function (res) {
        console.log("--3、更新用户信息成功--")
        //设置全局登录的变量
        that.globalData.isLogin = true;
        //获取更新后的用户信息
        that.getUserData();
        //由于 updateinfo 需要通过网络请求，可能会在 Page.onLoad 之后才返回
        //因此提供 updateUserInfoCallback 以防止这种情况
        if (that.updateUserInfoCallback) {
          that.updateUserInfoCallback(res);
        }
      }, function (res) {
        that.wxLogin( );
      }, "GET", false);
    }
  },

  /**
  * 第四步：获取用户信息
  * 
  */
  getUserData: function () {
    var that = this;
    var apiUrl = that.globalData.webUrl + "/user/getUserData";
    var userToken = wx.getStorageSync("userToken");
    var token = that.globalData.initToken;
    var paramData = { usertoken: userToken, token: token };
    //发起请求
    utils.netRequest(apiUrl, paramData, function (res) {
      console.log("--获取用户信息成功--")
      //将获取到的用户信息赋值给全局变量
      that.globalData.webUserData = res.data;
      //由于 getUserData 需要通过网络请求，可能会在 Page.onLoad 之后才返回
      //因此提供 getUserInfoCallback 以防止这种情况
      if (that.getUserInfoCallback) {
        that.getUserInfoCallback(res);
      }
    }, null, "POST");
  },

})