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
    name: "",
    descs: "",
    img: "",
    honorary: "",
    phone: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var id = options.id;
    that.setData({
      imageHight: wx.getSystemInfoSync().windowWidth * 0.85,
    })
    for (var i = 0; i < datas.TeacherList.data.list.length; i++) {
      var item = datas.TeacherList.data.list[i];
      if (item.id == id) {
        that.setData({
          id: item.id,
          name: item.name,
          descs: item.desc,
          img: item.img,
          honorary: item.honorary,
          phone: item.phone,
        })
      }
    }
  },
  //获取教师详情页
  // getCoursedetailData: function (isShowLoading) {
  //   var that = this;
  //   var apiUrl = app.globalData.webUrl + "/Teacher/TeacherDetailList";
  //   var token = "sddww111";
  //   var id = that.data.courseId;
  //   var params = {
  //     token: token,
  //     id: id
  //   };
  //   if (isShowLoading) utils.wxShowLoading("请稍候...", true);
  //   utils.netRequest(apiUrl, params, function (res) {
  //     var list = res.data;
  //     that.setData({
  //       courseImg: list.img
  //     });
  //     //手动关闭加载提示
  //     if (isShowLoading) utils.wxHideLoading();
  //     //手动停止刷新
  //     wx.stopPullDownRefresh();
  //   }, null, 'GET');
  // },
})