// pages/start/start.js
var _self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  go: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
    console.log(111)
  },

  // 页面显示完毕，DOM元素加载完成
  onShow: function () {
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _self = this;
    let userInfo = wx.getStorageSync('userInfo')   //本地存储
    // 在本地存储里这里判断是否有serInfo
    console.log(userInfo)
    if (!userInfo) {
      wx.navigateTo({
        url: '/packageA/pages/authorize/authorize',  // 授权页面
      })
      return false;
    } else {
      _self.setData({
        userInfo: userInfo
      })
      console.log(_self.data.userInfo)
    }
    _self = this;
    let Token = wx.getStorageSync('token')
    let _this = this;
    wx.request({
      url: 'https://api.it120.cc/linlin/user/detail',
      data: {
        token: Token
      },
      success: (res) => {
        console.log(res)
        console.log(res.data.data.base)
        _self.setData({
          data: res.data.data.base
        })
        console.log(_self.data.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})