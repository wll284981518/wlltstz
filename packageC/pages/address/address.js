// pages/address/address.js
var _self, Token;
const http = require("../../../com/http")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    show:false,
    userName:'',
    telNumber:'',
    address:''
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

  // address() {
  //   wx.navigateTo({
  //     url: '/packageD/pages/address/address',
  //   })
  // },
   //点击新增收货地址，跳转编辑地址页面  // 新增
   newAddress(e){
    wx.navigateTo({
      url: '/packageC/pages/newaddress/newaddress',
    })
  },

  //点击编辑进入添加地址页面
  update(e){
    console.log(e)
    wx.navigateTo({
      url: '/packageC/pages/modification/modification?id='+e.currentTarget.dataset.id, 
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad() {
    //  改变This指向
    _self = this;
    Token = wx.getStorageSync('token')
    //  收货地址初始化
    _self.Receiving()
    // _self.update()
  },

  // 收货地址初始化
  async Receiving() {
    var res = await http.address_list({
      token: Token
    })
    console.log(res)
    if (res.data.code == 700) {
      wx.showLoading({
        title: '暂无收货地址',
      })
      setTimeout(function () {
        wx.hideLoading();
        _self.setData({
          data: []
        })
      }, 1000)
    } else if (res.data.code == 0) {
      console.log(res.data.data)
      _self.setData({
        data: res.data.data
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // _self.update()
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