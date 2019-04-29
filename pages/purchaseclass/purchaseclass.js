// pages/purchaseclass/purchaseclass.js
const app = getApp();
const utils = require("../../utils/util.js");
const datas = require("../../utils/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUserData: [],
    classlist: [],
    pageNo: 1,
    hasMore: true,
    hasRefesh: false,
    hidden: true,
    isHasData: true, //默认有数据
  },
  tocoursedetail: function (e) {
    wx.navigateTo({
      url: '/pages/course/coursedetail/coursedetail?id=' + e.currentTarget.dataset.id + "&typename=" + e.currentTarget.dataset.typename + "&desc=" + e.currentTarget.dataset.detail + "&img=" + e.currentTarget.dataset.img + "&classname=" + e.currentTarget.dataset.classname
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  loadingData: function (isShowLoading) {
    var that = this;
    that.requestDataList(isShowLoading);
    // if (app.globalData.isLogin) {
    //   that.getWebUserData(isShowLoading);


    // } else {
    //   app.updateUserInfoCallback = res => {
    //     that.getWebUserData(isShowLoading);
    //     that.requestDataList(isShowLoading);
    //   }

    // }

  },
  getWebUserData: function (isShowLoading) {
    var that = this;
    if (isShowLoading) utils.wxShowLoading("请稍候...", true);
    app.getUserData();
    app.getUserInfoCallback = res => {
      that.setData({
        webUserData: res.data,
      });
    }
    //手动关闭加载提示
    if (isShowLoading) utils.wxHideLoading();
    //手动停止刷新
    wx.stopPullDownRefresh();
  },
 




  requestDataList: function (isShowLoading) {//获取课程信息+________________________________+_+_+________________________+_
    var that = this;
    // http://api.school.comz/MineCourse/BuyRecordingList?userToken=201806251040493d4dc5&token=sddww111
    var apiUrl = app.globalData.webUrl + "/MineCourse/BuyRecordingList";
    var pageNo = that.data.pageNo;//页数
    var usertoken = utils.getStorageSync("userToken");//用户的微信id
    var token = app.globalData.initToken;//app的标识
    var params = { page: pageNo, userToken: usertoken, token: token };
    //console.log(isShowLoading)
    //手动显示加载框
    if (isShowLoading) utils.wxShowLoading("请稍候...", true);


    var arrrr = datas.purchaseList;//数据在这——————————————————————————————————————————————————————————————————————————————————


    // utils.netRequest(apiUrl, params, function (res) { //this way is the begin of function_________________________
    // var data = res.data.list;
    var data = arrrr.data.list;

    var list = [];
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var a = item.purchasetime.split(" ");
        var b = a[0].split("/")
        // console.log(a)
        // console.log(b)
        var obj = new Object({
          "classid": item.classid,
          "img": item.img,
          "classtype": item.classtype,


          "detail": item.detail,

          "classid": item.classid,
          "img": item.img,
          "classname": item.classname,
          "sparetime": item.sparetime,
          "purchasetime": b[0] + "年" + b[1] + "月" + b[2] + "日",
        });
        list.push(obj);
      }
    }
    // //如果 list 长度为 0，或翻到最后一页,则设置没有更多数据
    if (list.length == 0 || that.data.pageNo == arrrr.data.totalpage) {
      that.setData({
        hasMore: false,
      })
    }
    // console.log(2)
    // console.log(arrrr.data.page)
    // console.log(list.length)
    // page 等于 1 表示首次加载或下拉刷新
    if (arrrr.data.page == 1) {
      that.setData({
        classlist: list,
      });

      // isHasData 默认是 false，即显示，
      // 只在第一次加载数据的时候，
      // 根据有无数据改变值，翻页不做改变
      if (list.length == 0) {
        that.setData({
          isHasData: false //隐藏无数据提示的图片
        })
      } else {
        that.setData({
          isHasData: true //隐藏无数据提示的图片
        })
      }
    }
    else {
      that.setData({
        classlist: that.data.classlist.concat(list),
      });
    }
    that.setData({
      hidden: false,
      hasRefesh: false,
    });
    //隐藏加载框
    if (isShowLoading) utils.wxHideLoading();
    //手动停止刷新
    wx.stopPullDownRefresh();


    // }, null, "GET");//this way is the end of function_________________________

  },//获取课程信息结束+________________________________+_+_+________________________+_________________________________+_+_


  onLoad: function (options) {
    var that = this;
    that.loadingData(true);
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
    var that = this;
    //网络请求数据
    that.setData({
      pageNo: 1,
      hasRefesh: true,
      hidden: false,
      hasMore: true,
    });
    //网络请求数据
    that.requestDataList(false);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    //如果页面变量 hasMore 为 true，才执行翻页加载数据
    if (that.data.hasMore) {
      var nextPage = that.data.pageNo + 1;
      // console.log("页码：" + nextPage);

      that.setData({
        pageNo: nextPage,
      })
      //网络请求数据
      that.requestDataList(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})