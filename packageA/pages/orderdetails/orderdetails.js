// packageA/pages/orderdetails/orderdetails.js
var _self,Token,orderdetails;
const http = require('../../../com/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail:{},
    show:false,
  },

  //点击首页跳转
  index: function (e) {
    wx.switchTab({//跳转到某个页面
      url: '/pages/index/index',
    })
  },

  //点击分类跳转
  classify: function (e) {
    wx.switchTab({
      url: '/pages/classify/classify',
    })
  },

  //点击购物车跳转
  cart: function (e) {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },

  //点击我的跳转
  my: function (e) {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  
  //点击导航，显示或隐藏
  show: function (e) {
    this.setData({
      show: !this.data.show
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.orderdetails)
    orderdetails=options.orderdetails
    _self=this;
    Token=wx.getStorageSync('token')
    _self.orderDetailsInfo()
  },

  async orderDetailsInfo(){
    var res =await http.orderDetail({
      // hxNumber:"2002252234215750020",
      id:orderdetails,
      token:Token
    })
    console.log(res)
    if(res.data.code==0){
      _self.setData({
        orderDetail:res.data.data
      })
    }
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