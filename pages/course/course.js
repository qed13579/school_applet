var app = getApp()
const utils = require("../../utils/util.js");
const datas = require("../../utils/data.js");
Page({
  data: {
    currentTab: 0,
    imageHight: '',
    swiperHight: '',
    search: {
      content: ''
    },
    CourseList: '',
    hasMore: false,
    hidden: false,
    isHasData: false, //默认有数据
    courseType: '', //课程类型
    courseTypeId: 1, //课程类型id
    pageNo: 1
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      imageHight: wx.getSystemInfoSync().windowWidth * 0.67 * 0.5,
      swiperHight: wx.getSystemInfoSync().windowHeight,
      CourseList: datas.tabCourseList.data.list, //模拟数据
      courseType: datas.courseType.data.list
    })
    // that.loadingData(true);
  },
  onShow: function() {
    var that = this;
    that.setData({
      ['search.content']: ''
    })
  },
  /**
   * loadingData加载方法数据
   */
  loadingData: function(isShowLoading) {
    var that = this;
    if (app.globalData.isLogin) {
      //获取课程信息
      that.getCourseType(isShowLoading);
      that.requestCourseList(isShowLoading);
    } else {
      app.updateUserInfoCallback = res => {
        //获取课程信息
        that.getCourseType(isShowLoading);
        that.requestCourseList(isShowLoading);
      }
    }
  },
  /**
   * 切换不同类型的数据
   */
  loadingCourseData: function(isShowLoading) {
    var that = this;
    if (app.globalData.isLogin) {
      //获取课程信息
      that.requestCourseList(isShowLoading);
    } else {
      app.updateUserInfoCallback = res => {
        //获取课程信息
        that.requestCourseList(isShowLoading);
      }
    }
  },
  //滑动切换
  swiperTab: function(e) {
    // console.log(e.detail.current);
    var currentTab = e.detail.current;
    var that = this;
    var CourseList = that.data.CourseList;
    var courseTypeId = that.data.courseTypeId;
    var list = datas.tabCourseList.data.list;
    console.log(CourseList);
    that.setData({
      currentTab: currentTab,
      courseTypeId: currentTab + 1,
      pageNo: 1,
    });
    console.log('currentTab', this.data.currentTab);
    console.log('typeid',this.data.courseTypeId);
    var obj = [];
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (item.typeId == this.data.courseTypeId) {
        obj.push(item);
      }
    }
    that.setData({
      CourseList: obj
    })
    // that.loadingCourseData(true);
  },
  //点击切换
  clickTab: function(e) {
    console.log(e);
    var that = this;
    var courseTypeId = that.data.courseTypeId;
    that.setData({
      courseTypeId: courseTypeId
    })
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 到课程详情页
   */
  toCoursedetial: function(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    var img = e.currentTarget.dataset.img;
    var typename = e.currentTarget.dataset.typename;
    var desc = e.currentTarget.dataset.desc;
    var name = e.currentTarget.dataset.name;
    
    wx.navigateTo({
      url: '/pages/course/coursedetail/coursedetail?id=' + id + '&img=' + img + '&typename=' + typename + '&desc=' + desc + '&name=' + name,
    })
  },
  /** 
   * 点击搜索，到搜索页
   */
  tosearch: function() {
    var value = this.data.search.content;
    if (value != null && value != undefined && value != '') {
      wx: wx.navigateTo({
        url: '/pages/search/search?value=' + value,
      })
    }
    else {
      wx.showToast({
        title: '请输入搜索的内容',
        icon: 'none',
        duration: 1000 //持续的时间
      })
    }

  },
  /**
   * 获取搜索内值
   */
  onInput: function(e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      ['search.content']: value
    })
  },
  /**
   * 删除搜索框内的值
   */
  searchdelete: function(e) {
    this.setData({
      ['search.content']: '',

    })
  },
  // 获取课程类型
  getCourseType: function(isShowLoading) {
    var that = this;
    var apiUrl = app.globalData.webUrl + "/Course/CourseType";
    // var usertoken = utils.getStorageSync("userToken");
    var token = "sddww111";
    var params = {
      token: token
    };
    //手动显示加载框
    if (isShowLoading) utils.wxShowLoading("请稍候...", true);
    utils.netRequest(apiUrl, params, function(res) {
      var list = res.data.list;
      that.setData({
        courseType: list
      });
      //手动关闭加载提示
      if (isShowLoading) utils.wxHideLoading();

      //手动停止刷新
      wx.stopPullDownRefresh();
    }, null, 'GET');
  },

  /**
   * 获取课程列表信息
   */
  requestCourseList: function(isShowLoading) {
    var that = this;
    var apiUrl = app.globalData.webUrl + "/Course/CourseList";
    var courseTypeId = that.data.courseTypeId;
    var pageNo = that.data.pageNo; //页数
    var token = "sddww111";
    var params = {
      id: courseTypeId,
      token: token,
      page: pageNo
    };
    if (isShowLoading) utils.wxShowLoading("请稍候...", true);
    //发起网络请求
    utils.netRequest(apiUrl, params,
      //成功领取回调
      function(res) {
        var list = res.data.list;
        // //如果 list 长度为 0，或翻到最后一页,则设置没有更多数据
        if (list.length == 0 || that.data.pageNo == res.data.totalpage) {
          that.setData({
            hasMore: false,
          })
        }
        // page 等于 1 表示首次加载或下拉刷新
        if (res.data.page == 1) {
          that.setData({
            CourseList: list,
          });
          // isHasData 默认是 false，即显示，
          // 只在第一次加载数据的时候，
          // 根据有无数据改变值，翻页不做改变
          if (list.length == 0) {
            that.setData({
              isHasData: false //显示无数据提示的图片
            })
          } else {
            that.setData({
              isHasData: true //隐藏无数据提示的图片
            })
          }
        } else {
          that.setData({
            CourseList: that.data.CourseList.concat(list),
          });
        }
        that.setData({
          hasRefesh: false,
          hidden: false,
          ishasGiftList: false
        });
        //手动关闭加载提示
        if (isShowLoading) utils.wxHideLoading();
        //手动显示底部导航栏
        wx.showTabBar();
        //手动停止刷新
        wx.stopPullDownRefresh();
      },
      function(res) {
        utils.wxshowToast(res.error);
      }, "GET", false);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function() {
  //   var that = this;
  //   //网络请求数据
  //   that.setData({
  //     pageNo: 1,
  //     hasRefesh: true,
  //     hidden: false,
  //     hasMore: true,
  //   });
  //   //网络请求数据
  //   that.requestCourseList(false);
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function() {
  //   var that = this;
  //   //如果页面变量 hasMore 为 true，才执行翻页加载数据
  //   if (that.data.hasMore) {
  //     var nextPage = that.data.pageNo + 1;
  //     // console.log("页码：" + nextPage);
  //     that.setData({
  //       pageNo: nextPage,
  //     })
  //     //网络请求数据
  //     that.requestCourseList(false);
  //   }
  // }
})