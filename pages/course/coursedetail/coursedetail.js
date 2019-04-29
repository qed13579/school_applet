// pages/coursedetail/coursedetail.js
const app = getApp();
const utils = require("../../../utils/util.js");
const datas = require("../../../utils/data.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageHight: '',
    courseId: '',
    typename: '',
    descs: '',
    img: '',
    title: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('44444',options)
    var that = this;
    var id = options.id;
    for (var i = 0; i < datas.tabCourseList.data.list.length; i++){
      var item = datas.tabCourseList.data.list[i];
      if(item.id == id){
        that.setData({
          courseId: item.id,
          typename: item.type,
          descs: item.descs,
          img: item.img,
          title: item.title,
        })
      }
    }

    // that.loadingData(true);
  },

  /**
  * loadingData加载方法数据
  */
  loadingData: function (isShowLoading) {
    var that = this;
    if (app.globalData.isLogin) {
      //获取课程信息
      that.getCoursedetailData(isShowLoading);
      
    } else {
      app.updateUserInfoCallback = res => {
        //获取课程信息
        that.getCoursedetailData(isShowLoading);
      }
    }
  },
   /**
    * 根据id获取详情页面
   */
  //获取课程详情页
  getCoursedetailData:function (isShowLoading) {
    var that = this;
    var apiUrl = app.globalData.webUrl + "/Course/CourseDetailsList";
    var token = "sddww111";
    var id = that.data.courseId;
    var params = {
      token: token,
      id:id 
    };
    if (isShowLoading) utils.wxShowLoading("请稍候...", true);
    utils.netRequest(apiUrl, params, function (res) {
      var list = res.data;
      that.setData({
        courseImg:list.img
      });
      //手动关闭加载提示
      if (isShowLoading) utils.wxHideLoading();
      //手动停止刷新
      wx.stopPullDownRefresh();
    }, null, 'GET');
  },

  toreserve: function() {
    wx: wx.navigateTo({
      url: '/pages/reservationspage/reservationspage',
    })
  },
  
  toMyclass: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
     wx.navigateTo({
       url: '/pages/myschedulecard/myschedulecard?id=' + id,
    })
  },
  tocoursebuy:function(e){
    console.log(e);
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/course/coursebuy/coursebuy?id=' + id,
    })
  }
})