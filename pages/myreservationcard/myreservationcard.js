//index.js
//获取应用实例
const utils = require('../../utils/util.js');
const datas = require("../../utils/data.js");

var date = new Date().getDay();
var today = utils.formatweekday(date)
var app = getApp()
Page({
  data: {
    winHeight: '',
    wlist: [],
    date: [],
    time: [{ "starttime": "9:00", "endtime": "10:00" }, { "starttime": "10:00", "endtime": "11:00" }, { "starttime": "11:00", "endtime": "12:00" }, { "starttime": "12:00", "endtime": "13:00" }, { "starttime": "13:00", "endtime": "14:00" }, { "starttime": "14:00", "endtime": "15:00" }, { "starttime": "15:00", "endtime": "16:00" }, { "starttime": "15:00", "endtime": "16:00" }, { "starttime": "16:00", "endtime": "17:00" }],
    typenum: "",
    classnum: "",
    webUserData: [],
    hidden: true,
    status: 1,
    askbox: []
  },
  btn: function (e) {
    console.log(e)
    this.setData({
      checked: e.currentTarget.id
    });
  },



  onLoad: function () {
    var that = this;
    console.log(today);
    // console.log(this.data.date)
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
          var calc = clientHeight * rpxR;
          that.setData({
          winHeight: clientHeight
        });
      }
    });
    
    that.loadingData(true);
    // console.log(this.data.time)
  },


  // onShow: function () {
  //   this.getWebUserData(false);
  // },




  loadingData: function (isShowLoading) {
    var that = this;
    that.requestDataList(isShowLoading);
    // if (app.globalData.isLogin) {
    //   that.requestDataList(isShowLoading);

    // } else {
    //   app.updateUserInfoCallback = res => {
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
    //手动显示底部导航栏
  },






  requestDataList: function (isShowLoading) {
    var that = this;

    var apiUrl = app.globalData.webUrl + "/Scheduling/SchedulingList";

    var userToken = wx.getStorageSync("userToken");
    var token = app.globalData.initToken;
    var paramData = { CourseId: 3, usertoken: userToken, token: token };

    if (isShowLoading) utils.wxShowLoading("请稍候...", true);
    var arrrr = datas.myreservationcardList//数据在这———————————————————————————————————————————————————————————————————————————
    //发起请求
    // utils.netRequest(apiUrl, paramData, function (res) {
    var data = arrrr.data.list;
    var date = arrrr.data.date;
    
    that.setData({
      wlist: data,
      date: date,

    })


    if (isShowLoading) utils.wxHideLoading();

    // }, null, "GET");
  },














  


  cancelBtn: function () {
    this.setData({
      hidden: true
    })
  },










  talk: function (e) {
    var weekchi = utils.formatweekdaychi(e.currentTarget.dataset.week);
    var date = new Date().getDay();
    var week = e.currentTarget.dataset.week;//当天日期
    var today = utils.formatweekday(date)//星期格式化，星期天为7
    var waste = e.currentTarget.dataset.waste;//消耗课时
    var begin = e.currentTarget.dataset.begin;//开始时间
    var end = e.currentTarget.dataset.end;//结束时间
    var area = e.currentTarget.dataset.area;//地点
    var teacher = e.currentTarget.dataset.teacher;//教师
    var classname = e.currentTarget.dataset.classname;//课程名称
    var title = e.currentTarget.dataset.title;//遮罩层的题目
    var status = e.currentTarget.dataset.status;//遮罩层的状态
    var classid = e.currentTarget.dataset.classid;//本节课的id号
    var myDate = new Date(begin);
    var nowtime = new Date().getTime();
    var begin1 = myDate.getTime();
    var a = { "today": today, "waste": waste, "begin": begin, "teacher": teacher, "end": end, "area": area, "classname": classname, "title": title, "status": status, "week": week, "classid": classid, "begin1": begin1, "nowtime": nowtime };

    this.setData({
      hidden: false,
      askbox: a
    })

  },

  confirm: function () {
    console.log(this.data.askbox)
    this.setData({
      hidden: true,

    })
  },
  ask: function () {
    console.log(this.data.askbox);
    console.log(this.data.webUserData);
    if (this.data.webUserData.mobile != "" && this.data.webUserData.mobile != undefined) {
      this.setData({
        hidden: true,

      })
      wx.showToast({
        title: '预约成功',
        icon: '',
        image: '',
        duration: 1111,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateTo({//判断是否之前有输入过手机号，没输入过转跳到联合登录页
        url: '/pages/jointlogon/jointlogon',
      });
    }

  },
  sorry: function () {
    console.log(this.data.askbox)
    this.setData({
      hidden: true,

    })
  },

})
