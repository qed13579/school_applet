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
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD", "#E29AAD"],
    wlist: [],
    date: [],
    classtype: [{ "Id": 1, "title": "创新", "Status": "1" }, { "Id": 1, "title": "早教", "Status": "1" }, { "Id": 1, "title": "美术", "Status": "1" }],
    btnlist:[],
    time: [{ "starttime": "9:00", "endtime": "10:00" }, { "starttime": "10:00", "endtime": "11:00" }, { "starttime": "11:00", "endtime": "12:00" }, { "starttime": "12:00", "endtime": "13:00" }, { "starttime": "13:00", "endtime": "14:00" }, { "starttime": "14:00", "endtime": "15:00" }, { "starttime": "15:00", "endtime": "16:00" }, { "starttime": "15:00", "endtime": "16:00" }, { "starttime": "16:00", "endtime": "17:00" }],
    typenum: "",
    classnum: "",
    checked: "",
    currentTab:0,
    hidden: true,
    status: 1,
    askbox: [],
    webUserData:[],
    nowname:'',
    scrollleft:10,
    rpxR:0,
    optionid:0
  },
  switchTab: function (e) {
    // console.log(e.detail.current);
  
    var checked = this.data.btnlist[e.detail.current].classid;
    var nowname = this.data.btnlist[e.detail.current].classname
    // console.log(checked);
    this.setData({
      scrollleft: this.data.scrollleft,
      checked: checked,
      currentTab: e.detail.current,
      nowname: nowname
    });
    this.requestDataList(true);
  },
  btn: function (e) {
    // console.log(e)
    for (var a = 0; a < this.data.btnlist.length;a++){
      if (this.data.btnlist[a].classid == e.currentTarget.id){
        var c=a;
        // var nowname = this.data.btnlist[a].classname
      }
    }

    this.setData({
      checked: e.currentTarget.id,
      currentTab:c,
      // nowname: nowname
    });
    // this.requestDataList(true);
  },


  onLoad: function (option) {

    var that = this;
    console.log(option.id)
    if (option.id!=undefined){
that.setData({
  optionid: option.id,
})
    }
    // console.log(today);
    // console.log(this.data.classtype)
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;

        console.log(rpxR)
        var calc = clientHeight * rpxR;
        that.setData({
        
          rpxR: rpxR,
          winHeight: clientHeight
        });
      }
    });
    // this.btnfirst();
    that.loadingData(true);
    // console.log(this.data.time)
  },



//  onShow:function(){
//    this.getWebUserData(false);
//  },







  loadingData: function (isShowLoading) {
    var that = this;
    that.requestClassList(isShowLoading);
    that.requestDataList(isShowLoading);

    // if (app.globalData.isLogin) {

    //   that.requestDataList(isShowLoading);
    //   that.requestClassList(isShowLoading);
    // } else {
    //   app.updateUserInfoCallback = res => {

    //     that.requestDataList(isShowLoading);
    //     that.requestClassList(isShowLoading);
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






  requestDataList: function (isShowLoading) {//获取当前课的课程表
    var that = this;
    var apiUrl = app.globalData.webUrl + "/Scheduling/SchedulingList";
    var userToken = wx.getStorageSync("userToken");
    var token = app.globalData.initToken;
    var classid = that.data.checked;//这是前台返回的课程的id
    console.log(classid);
    var paramData = { usertoken: userToken, token: token, CourseId: classid};//存入用户id，app的标识，当前课程的id，获得课程表
    if (isShowLoading) utils.wxShowLoading("请稍候...", true);
    // console.log(that.data.checked);
    var arrrr = datas.myschedulecardList//数据在这———————————————————————————————————————————————————————————————————————————
    console.log(arrrr)
    //发起请求
    // utils.netRequest(apiUrl, paramData, function (res) {
  
    var data = arrrr.data.list;
    var date = arrrr.data.date;
    // console.log(data)
    var arr=[]
    console.log(this.data.checked)
    for (var a = 0; a < data.length;a++){
      // console.log(data[a].classid)
      if (data[a].classid==this.data.checked){
        // console.log(1)
        // console.log(data[a])
        arr.push(data[a])
      }
    }
    that.setData({
      wlist: arr,
      date: date,

    })
    // console.log(this.data.wlist);

    if (isShowLoading) utils.wxHideLoading();

    // }, null, "GET");
  },



  requestClassList: function (isShowLoading) {//获取我已购买的课程
    var that = this;
    var apiUrl = app.globalData.webUrl + "/CourseTable/CourseList";
    // http://api.school.comz/CourseTable/CourseList?token=sddww111
    var userToken = wx.getStorageSync("userToken");
    var token = app.globalData.initToken;
    var paramData = { usertoken: userToken, token: token };
    if (isShowLoading) utils.wxShowLoading("请稍候...", true);
    var arrrr = datas.typelist//数据在这———————————————————————————————————————————————————————————————————————————
    //发起请求
    // utils.netRequest(apiUrl, paramData, function (res) {
      console.log(arrrr)
      var btnlist = arrrr.data.list;
      
      if(that.data.optionid!=0){
        var checked = that.data.optionid;
      }else{
        var checked = arrrr.data.list[0].classid;
      }
     
      for (var a = 0; a < btnlist.length; a++) {
        if (btnlist[a].classid == checked) {
          var c = a;
          // var nowname = this.data.btnlist[a].classname
        }
      }

      setTimeout(function () {
        that.setData({
          // checked: e.currentTarget.id,
          currentTab: c,
          // nowname: nowname
        });

      }, 1) 
     
      var nowname = arrrr.data.list[0].classname;
    that.setData({
      btnlist: btnlist,
      checked: checked,
      nowname: nowname
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
    // console.log(this.data.askbox);
    this.setData({
      hidden: true,

    })
  },
  ask: function () {
    var that=this;
    // console.log(this.data.askbox);
    // console.log(this.data.webUserData);
    if (this.data.webUserData.mobile != "" && this.data.webUserData.mobile != undefined){
      this.setData({
        hidden: true,
      })
      // 这里写用户录入预约信息的api——————————————————开始——————————————————————
      wx.showToast({
        title: '预约成功',
        icon: '',
        image: '',
        duration: 1111,
        mask: true,
        success: function (res) {

          that.getWebUserData();
          that.requestDataList();
        },
        fail: function (res) { },
        complete: function (res) { },
      })

// 这里写用户录入预约信息的api——————————————————结束——————————————————————
    }else{
      this.setData({
        hidden: true,
      })
      wx.navigateTo({//判断是否之前有输入过手机号，没输入过转跳到联合登录页
          url: '/pages/jointlogon/jointlogon',
        });
    }
  },
  sorry: function () {
    // console.log(this.data.askbox)
    this.setData({
      hidden: true,

    })
  },

})
