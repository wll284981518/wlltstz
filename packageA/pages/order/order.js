// packageA/pages/order/order.js
const http = require('../../../com/http');
var _self, Token;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusType: ["待付款", "待发货", "待收货", "待评价", "已完成"],
    hasRefund: true,
    currentType: 0,
    tabClass: ["", "", "", "", ""],
    orderList: [],
    goodsMap: {},
    show:false,
  },
  //点击首页跳转
  index: function (e) {
    wx.switchTab({//跳转到某个页面
      url: '/pages/index/index',
    })
  },

  async fu(e){
    console.log(e)
    var res = await http.zhifu({ money: e.currentTarget.dataset.ite.amount,
      nextAction: JSON.stringify({type:e.currentTarget.dataset.ite.type, id: e.currentTarget.dataset.ite.orderNumber}) ,
      payName:'在线支付',
      remark: e.currentTarget.dataset.ite.remark,
      token:wx.getStorageSync('token')

    })
    console.log(res)
    
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
  
  // 导航
  statusTap(e) {
    console.log(e)
    _self.setData({
      currentType: e.currentTarget.dataset.index
    })
    _self.orderlist()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    _self = this;
    Token = wx.getStorageSync('token')
    _self.orderlist()
  },
  // 获取订单列表
  async orderlist(data) {
    var res = await http.ding_list({
      statusBatch:_self.data.currentType,
      token: Token
    })
    console.log(res)
    if (res.data.code == 0) {
      this.setData({
        orderList: res.data.data.orderList,
        goodsMap: res.data.data.goodsMap
      })
    }else if(res.data.code==700){
      this.setData({
        orderList: false,
        goodsMap: {}
      })
    }
  },
  // 取消订单
  async cancelOrderTap(e) {
    var res = await http.orderDelete({
      orderId: e.currentTarget.dataset.id,
      token: Token
    })
    console.log(res)
    if (res.data.code == 0) {
      _self.orderlist()
    }
  },
  // 订单详情页
 orderdetails(e) {    
    wx.navigateTo({
      url: '/packageA/pages/orderdetails/orderdetails?orderdetails='+e.currentTarget.dataset.id
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