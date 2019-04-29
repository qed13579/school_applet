// pages/index/index.js
const app = getApp();
const utils = require("../../utils/util.js");
const datas = require("../../utils/data.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    AdList: [], //轮播图的数据
    CourseList:'',//课程列表数据
    TeacherList:'',//教师列表信息
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorcolor: 'rgba(255, 255, 255, .5)',
    activecolor: 'rgb(255, 255, 255)',
    imageHight: '',
    webUserData: '',//用户信息

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var AdList = that.data.AdList
    that.setData({
      imageHight: wx.getSystemInfoSync().windowWidth * 0.67*0.4,
      AdList: datas.AdList.data.list,
      CourseList:datas.CourseList.data.list,
      TeacherList:datas.TeacherList.data.list
    })
    // that.loadingData(true);
  },
   /**
   * loadingData加载方法数据
   */
  loadingData: function(isShowLoading) {
    var that = this;
    if (app.globalData.isLogin) {
      //获取课程信息
      // that.getCourseData(isShowLoading); 
      that.getTeacherData(isShowLoading);
      // that.getImgUrlsDate(isShowLoading);
    } else {
      app.updateUserInfoCallback = res => {
        //获取课程信息
        // that.getCourseData(isShowLoading);
        that.getTeacherData(isShowLoading);
        // that.getImgUrlsDate(isShowLoading);
      }
    }
  },

  // 获取广告轮播图信息
  getImgUrlsDate: function(isShowLoading) {
    var that = this;
    var apiUrl = app.globalData.webUrl + "/Course/HomeSlide";
    // var usertoken = utils.getStorageSync("userToken");
    var token = "sddww111";
    var params = {
      id: '1',
      token: token
    };
    //手动显示加载框
    if (isShowLoading) utils.wxShowLoading("请稍候...", true);
    utils.netRequest(apiUrl, params, function(res) {
      var list = res.data.list;
      that.setData({
        AdList: list
      });
      //手动关闭加载提示
      if (isShowLoading) utils.wxHideLoading();
     
      //手动停止刷新
      wx.stopPullDownRefresh();
    }, null, 'GET');
  },

  //获取课程列表
  getCourseData: function(isShowLoading) {
    var that = this;
    var apiUrl = app.globalData.webUrl + "/Course/HomeCourse";
    var token = "sddww111";
    var params = {
      token: token
    };
    if(isShowLoading) utils.wxShowLoading("请稍候...", true);
    utils.netRequest(apiUrl, params, function(res) {
      var list = res.data.list;
      that.setData({
        CourseList: list
      });
      //手动关闭加载提示
      if (isShowLoading) utils.wxHideLoading();
      //手动停止刷新
      wx.stopPullDownRefresh();
    }, null, 'GET');
  },

  //获取教师列表
  getTeacherData: function (isShowLoading) {
    var that = this;
    var apiUrl = app.globalData.webUrl + "/Teacher/HomeTeacher";
    var token = app.globalData.initToken;
    var params = {
      token: token
    };
    if (isShowLoading) utils.wxShowLoading("请稍候...", true);
    utils.netRequest(apiUrl, params, function (res) {
      var list = res.data.list;
      that.setData({
        TeacherList: list
      });
      //手动关闭加载提示
      if (isShowLoading) utils.wxHideLoading();
      //手动停止刷新
      wx.stopPullDownRefresh();
    }, null, 'GET');
  },

  /**
   * 
   */
  toCourse:function(e){
    var that=this;
     console.log(e);
     var id = e.currentTarget.dataset.id;
     var img = e.currentTarget.dataset.img;
     var typename = e.currentTarget.dataset.typename;
     var desc = e.currentTarget.dataset.desc;
     var name = e.currentTarget.dataset.name;
     wx.navigateTo({
       url: '/pages/course/coursedetail/coursedetail?id=' + id + '&img=' + img + '&typename=' + typename + '&desc=' + desc+'&name=' + name,
     })
  },
  /**
   */
  toteacherdetail:function(e){
    var that = this;
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/teacher/teacherdetail/teacherdrtail?id='+id,
    })
  },
  toteacher:function(e){
    var that = this;
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/teacher/teacher?id=' + id,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})