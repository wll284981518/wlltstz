// pages/authorize/authorize.js
var _self;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    encry: '',
    iv: '',
    userInfo: "",
    openid: '',
    token: '',
    uis: ''
  },
  
  //encryptedData,iv
  bindgetuserinfo(e) {
    // e 就是 我们获取授权返回值 用户资料
    console.log(e)
    console.log(e.detail)
    if (!e.detail.iv) {
      wx.showLoading({
        title: '取消登录',
      })
      setTimeout(function () {
        wx.hideLoading();
      }, 500)
    } else {
      _self.setData({
        encry: e.detail.encryptedData,
        iv: e.detail.iv
      })
      console.log(e.detail.userInfo)
      wx.setStorageSync('userInfo', e.detail.userInfo)
      // 第二部 登录
      _self.myLogin();
    }
  },
  // 获取用户信息后登陆
  myLogin() {
    wx.login({
      success(res) {
        console.log(res)
        //  console.log(res.code)
        // 发送网络请求
        wx.request({
          // 登录获取Token 获取这个接口地址  POST
          // / { domain } / user / wxapp / login
          url: 'https://api.it120.cc/linlin/user/wxapp/login',
          data: {
            code: res.code
          },
          success(res) {
            console.log(res)   //  如果没注册过  返回的是 10000
            if (res.data.code == 10000) {
              //  去注册
              _self.register();
              return false;
              //登陆成功  保存 token id
            } else if (res.data.code == 0) {
              wx.setStorageSync('openid', res.data.data.openid)
              wx.setStorageSync('token', res.data.data.token)
              wx.setStorageSync('uid', res.data.data.uid)
              wx.showLoading({
                title: '授权成功',
              })
              setTimeout(function () {
                wx.hideLoading();
                wx.navigateTo({
                  url: '/pages/start/start',
                })
              }, 500)
            }
          }
        })
      }
    })
  },
  // 注册
  register() {
    // 用到  code  iv  enctryData
    wx.login({   // 再次获取code  code是从这来的
      success(res) {
        console.log(res)
        console.log(res.code)
        console.log(_self.data.encry)
        console.log(_self.data.iv);
        // 注册接口
        wx.request({
          // 注册接口
          // 小程序用户注册[详细注册]复制文档复制地址  POST
          // /{domain}/user / wxapp / register / complex  
          url: 'https://api.it120.cc/linlin/user/wxapp/register/complex',
          data: {
            code: res.code, // wx.login ()// 再次获取code  code是从这来的
            encryptedData: _self.data.encry,  // bindgetuserinfo 
            iv: _self.data.iv,   //bindgetuserinfo  的返回值
          },
          success(res) {
            // 如果注册成功了怎么办
            // 如果注册成功了  就在次调用登录接口 this.login()
            console.log(res)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _self = this;

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