/**
 * 
 */
const app = getApp();
const utils = require("util.js");

/**
 * 提交任务方法
 * sign 任务类型
 */
const doTask = function (sign,callback){
  //var that = this;
  const app = getApp();
  var apiUrl = app.globalData.webUrl + "/home/Task";
  var usertoken = utils.getStorageSync("userToken");
  var token = app.globalData.initToken;
  var params = { sign: sign, userToken: usertoken, token: token };
  if (usertoken != undefined || usertoken != null) {
    //发起网络请求
    utils.netRequest(apiUrl, params,
      //任务成功回调
      function (res) {
        console.log('--任务提交成功！--');
        if (callback) callback();
      }, function (res) {
        utils.wxshowToast(res.error);
      }, "POST", false);
  }
}

/**
* 获取任务类型列表
*/
const getTaskTypeList=function () {
  var that = this;
  const app = getApp();
  var apiUrl = app.globalData.webUrl + "/home/GetTaskSign";
  var token = app.globalData.initToken;
  var paramData = { token: token };
  //发起请求
  utils.netRequest(apiUrl, paramData, function (res) {
    console.log("-- 获取任务类型列表成功 --");
    app.globalData.taskTypeList = res.data;
    if (that.getTaskTypeListCallback) {
      that.getTaskTypeListCallback(res.data);
    }
  }, null, "GET");
}

/**
 * 公开接口
 */
module.exports = {
  doTask: doTask,
  getTaskTypeList: getTaskTypeList
}