// pages/my/my.js
var _self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list:[]
    data: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    encry: '',
    iv: '',
    // userI: "",
    openid: '',
    token: '',
    uis: '',
    userInfo: '',
    isLog: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _self = this;
    let Token = wx.getStorageSync('token')
    let _this = this;
    wx.request({
      url: 'https://api.it120.cc/linlin/user/detail',
      data: {
        token: Token
      },
      success: (res) => {
        console.log(res.data.data.base)
        _self.setData({
          data: res.data.data.base
        })
        console.log(_self.data.data)
      }
    })
    // let _this = this;
    // wx.request({
    //   url: 'https://api.it120.cc/linlin//shop/goods/list',
    //   success:(res)=>{
    //     console.log(res)
    //     _this.setData({
    //       list:res.data.data
    //     })
    //     console.log(_this.data.list)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  
  Sign() {
    console.log(111)
    wx.clearStorage()
    wx.showLoading({
      title: '退出成功',
    })
    setTimeout(function () {
      wx.hideLoading();
      wx.navigateTo({
        url: '/pages/start/start',
      })
    }, 500)
  },
  order(){
    wx.navigateTo({
      url: '/packageA/pages/order/order',
    })
  },
  //点击收货地址，跳转
  address(e){
    wx.navigateTo({
      url: '/packageC/pages/address/address',
    })
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