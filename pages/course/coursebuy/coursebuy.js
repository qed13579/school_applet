// pages/course/coursebuy/coursebuy.js
const app = getApp();
const utils = require("../../../utils/util.js");
const datas = require("../../../utils/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    price:199,
    num:1,
    allprice:199,
    typename: "",
    descs: "",
    img: "",
    title: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this;
    var id = options.id;
    for (var i = 0; i < datas.tabCourseList.data.list.length; i++) {
      var item = datas.tabCourseList.data.list[i];
      if (item.id == id) {
        that.setData({
          courseId: item.id,
          typename: item.type,
          descs: item.descs,
          img: item.img,
          title: item.title,
        })
      }
    }
    if (options.num){
      this.setData({
        num: options.num,
      })
      if (options.orderid) {//假如有传orderid进来执行的api不同（api传输订单id，数量，课程id）,确认购买并成功传入订单id把订单的状态改成已付
        console.log(options.orderid)
      }
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 点击选择支付方式
   */
  click: function () {
    var that = this;
    that.setData({
      hidden: !that.data.hidden
    })
  },
  /**
   * 减少购买数量
   */
  reduce:function(){
    var that = this;
    var num = parseInt(that.data.num);
    if (num>1){
      that.setData({
        num: num-1
      })
    }
  
  },
    /**
   * 增加购买数量
   */
  add: function () {
    var that = this;
    var num = parseInt(that.data.num);
    // console.log(num)
    if (num !=null) {
      that.setData({
        num: num+1
      })
    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})