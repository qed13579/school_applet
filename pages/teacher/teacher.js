// pages/teacherdetail/teacherdetail.js
var app = getApp()
const utils = require("../../utils/util.js");
const datas = require("../../utils/data.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TeacherDetailList:'',
    hasMore: false,
    hidden: false,
    isHasData: true, //默认有数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      TeacherDetailList: datas.TeacherList.data.list
    })
    // that.loadingData(true);
  },
  /**
   * 加载方法数据
   */
  loadingData: function (isShowLoading) {
    var that = this;
    if (app.globalData.isLogin) {
      //获取教师信息
      // that.requestCourseList(isShowLoading);
    } else {
      app.updateUserInfoCallback = res => {
        //获取教师信息
        // that.requestCourseList(isShowLoading);
      }
    }
  },
  /**
     * 获取教师列表信息
     */
  // requestCourseList: function (isShowLoading) {
  //   var that = this;
  //   var apiUrl = app.globalData.webUrl + "/Course/CourseList";
  //   var CourseType = that.data.CourseType;
  //   var token = app.globalData.initToken;
  //   var params = {
  //     CourseType: CourseType,
  //     token: token
  //   };
  //   if (isShowLoading) utils.wxShowLoading("请稍候...", true);
  //   //发起网络请求
  //   utils.netRequest(apiUrl, params,
  //     //成功领取回调
  //     function (res) {
  //       var list = res.data.list;

  //       // //如果 list 长度为 0，或翻到最后一页,则设置没有更多数据
  //       if (list.length == 0 || that.data.pageNo == res.data.totalpage) {
  //         that.setData({
  //           hasMore: false,
  //         })
  //       }
  //       // page 等于 1 表示首次加载或下拉刷新
  //       if (res.data.page == 1) {
  //         that.setData({
  //           CourseList: list,
  //         });
  //         // isHasData 默认是 false，即显示，
  //         // 只在第一次加载数据的时候，
  //         // 根据有无数据改变值，翻页不做改变
  //         if (list.length == 0) {
  //           that.setData({
  //             isHasData: false //显示无数据提示的图片
  //           })
  //         } else {
  //           that.setData({
  //             isHasData: true //隐藏无数据提示的图片
  //           })
  //         }
  //       } else {
  //         that.setData({
  //           CourseList: that.data.CourseList.concat(list),
  //         });
  //       }
  //       that.setData({
  //         hasRefesh: false,
  //         hidden: false,
  //         ishasGiftList: false
  //       });
  //       //手动关闭加载提示
  //       if (isShowLoading) utils.wxHideLoading();
  //       //手动显示底部导航栏
  //       wx.showTabBar();
  //       //手动停止刷新
  //       wx.stopPullDownRefresh();
  //     },
  //     function (res) {
  //       utils.wxshowToast(res.error);
  //     }, "GET", false);
  // },

 /**
  * 跳转至教师详情页面
  */
  toteacherdetail:function(e){
     var that=this;
     console.log(e);
     var id = e.currentTarget.dataset.id
     wx.navigateTo({
       url: '/pages/teacher/teacherdetail/teacherdrtail?id='+id,
     })
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
})