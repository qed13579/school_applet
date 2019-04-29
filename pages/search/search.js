// pages/search/search.js
var app=getApp();
const searchList=require("../../utils/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seachinfo:'',
    list:[],
    history: [],
    // history:'',
    guess: ["儿童画", "中国舞", "钢琴", "毛笔字"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that=this;
    that.setData({
      seachinfo: options.value
    })
    //获取历史搜索存储信息
    var history = wx.getStorageSync('history');
    if (history) {
      this.setData({ history: history});
    }
    that.seacrhList();
      
  },
  /**
     * 删除搜索框内的值
     */
  searchdelete: function (e) {

    this.setData({
      seachinfo: '',
      list:''
    })
  },
  /**
   * 
   */
  onInput: function (e){
    // console.log(e);
    var that = this;
    var value = e.detail.value;
    
    that.setData({
      seachinfo: value,   
   
    })
  },
  /**
   *历史记录的删除
   */
  deleteall:function(e){
    var that = this;
    var history = this.data.history;
    wx.showModal({
      title: '提示',
      content: '确定删除全部历史搜索',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          that.setData({
            history:[]
          })
        } else if (res.cancel) {
        }
      }
    })
  },
 seacrhList:function(e){
    var that=this;
    var searchinfo = that.data.seachinfo;
    var history = that.data.history;
    // console.log(searchinfo);
    // console.log(history);
    if (searchinfo != null && searchinfo != undefined && searchinfo != ''){
       history.push(searchinfo);
       wx.setStorageSync('history', history)
       console.log(wx.getStorageSync('history'));
       that.setData({
         history: wx.getStorageSync('history'),
         list: searchList.searchList.data.list
       })
    }else{
      wx.showToast({
        title: '请输入搜索的内容',
        icon: 'none',
        duration: 1000//持续的时间
      })
    }
 },
 /**
  * 聚焦时触发
  */
 onfocus:function(e){
   var that=this;
   console.log(e);
   var list=that.data.list;
   that.setData({
     list:''
   })
 },
 /**选择历史记录进行搜索
  */
 selectText:function(e){
    var that=this;
    console.log(e);
    var value = e.currentTarget.dataset.value;
    that.setData({
      seachinfo: value
    })
 }
})
