const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const formatweekday =function e(date) {//星期格式化，星期天为7
  if (date < 7 && date > 0) {
    date = date;
  }
  if (date == 0) {
    date = 7
  }
  return date
};

const formatweekdaychi = function e(date) {//星期格式化为中文
  
  if (date == 1) {
    date = "一"
  }
  if (date == 2) {
    date = "二"
  }
  if (date == 3) {
    date = "三"
  }
  if (date == 4) {
    date = "四"
  }
  if (date == 5) {
    date = "五"
  }
  if (date == 6) {
    date = "六"
  }
  if (date == 7) {
    date = "日"
  }
  return date
};
/**
 * json 请求封装
 * method POST 或 GET
 * url 接口地址
 * params  json 参数
 * succeed 成功回调
 * failed 失败回调
 */
const netRequest = function (url, params, succeed, failed, method, isShowLoading) {
  if (isShowLoading) {
    //开启加载提示框
    wxShowLoading("请稍候...", true);
  }
  wx.request({
    url: url,
    data: params,// 类型： Object/String/ArrayBuffer
    header: {
      'content-type': 'application/x-www-form-urlencoded' //'application/json' // 默认值
    },
    method: method,// GET POST 需大写
    success: res => {
      var data = res.data;
      console.log(data);
      //console.log("error_code=" + data.error_code + ",error=" + data.error);
      if (data.error_code == 0) {
        succeed(data);//如果成功回调succeed方法
      } else {
        if (failed != undefined || failed != null)
          failed(data);//如果失败回调failed方法
      }
    },
    fail: res => {
      console.log("error_code=" + res.error_code + ",error=" + res.error);
    },
    complete: res => {
      if (isShowLoading) wxHideLoading();//手动关闭加载提示
    }
  })
}

/**
 * 显示消息提示框
 * msg 提示的内容
 * icon 图标，默认为"none",有效值 "success", "loading", "none"
 * duration 提示的延迟时间，单位毫秒，默认：2000
 */
const wxshowToast = function (msg, icon, duration, callback) {
  if (msg == undefined)
    msg = "无提示文字";
  if (icon == undefined)
    icon = "none";
  if (duration == undefined)
    duration = 2500;
  wx.showToast({
    title: msg,
    icon: icon,
    duration: duration
  });
  if (callback)
    callback;
}

/**
 * 显示加载框
 */
const wxShowLoading = function (title, mask) {
  wx.showLoading({
    title: title,
    mask: mask
  })
}

/**
 * 隐藏加载框
 */
const wxHideLoading = function () {
  wx.hideLoading();
}

/**
 * 发起微信支付。
 * obj 支付需要的参数
 * success 成功回调
 * fail 失败回调
 */
const wxRequestPayment = function (obj, success) {
  wx.requestPayment({
    'timeStamp': obj.timeStamp,
    'nonceStr': obj.nonceStr,
    'package': obj.package,
    'signType': "MD5",
    'paySign': obj.paySign,
    'success': function (res) {
      console.log("errMsg=" + res.errMsg);
      success(res);
    },
    'fail': function (res) {
      console.log("errMsg=" + res.errMsg);
      if (res.errMsg == "requestPayment:fail cancel") {
        wxshowToast("您取消了支付！");
      } else {
        console.log("error_code" + res.error_code);
      }
    }
  })
}

/**
 * 设置本地缓存
 * key 键名
 * data 值
 */
const setStorageSync = function (key, data) {
  wx.setStorageSync(key, data);
}
/**
 * 获取本地缓存
 * key 键名
 */
const getStorageSync = function (key) {
  return wx.getStorageSync(key);
} 
module.exports = {
  formatTime: formatTime,
  formatweekday: formatweekday,
  formatweekdaychi:formatweekdaychi,
  netRequest: netRequest,
  wxshowToast: wxshowToast,
  wxRequestPayment: wxRequestPayment,
  setStorageSync: setStorageSync,
  getStorageSync: getStorageSync,
  wxShowLoading: wxShowLoading,
  wxHideLoading: wxHideLoading
}
