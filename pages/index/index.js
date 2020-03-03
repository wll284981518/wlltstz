// pages/index/index.js
//获取应用实例
const app = getApp() //全局
var _self;//申明全局this为that，在onload中写一下
const http = require('../../com/http');//引入全局封装的http.js接口
Page({
  // 页面的初始化数据
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 轮播图
    bannerList: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    // 更多渲染
    // 上下滚动 公告内容
    wll_li: [],
    // 公告内容
    notice: '',
    // 导航跳转
    nav: '',
    // 请求商品列表
    list: [],
    // 搜索框事件
    inputVal: '',
    // 精品推荐渲染
    ban: [],
    // api渲染
    apiimg: [
      "/image/home_api.png",
    ],
    // 商品列表跳转
    shoop: '',
    // 用户信息
    user: '',
    // 商品列表第一页
    pageNum: 1,
    // 商品请求条数
    pagesIze: 6,
    // 加载更多
    jiazai: "加载更多..."
  },

  // 搜索
  inputTyping: function (event) {
    console.log(event.detail.value)
    this.setData({
      inputVal: event.detail.value
    })
  },

  // 页面显示完毕，DOM元素加载完成
  onShow() {

  },

  //搜索跳转
  search: function () {
    console.log(this.data.inputVal)
    var that = this
    if (this.data.inputVal == '') {
      wx.showLoading({
        title: '请输入商品名称',
      })
      setTimeout(function () {
        wx.hideLoading();
      }, 2000)
    } else {
      wx.navigateTo({
        url: '/packageA/pages/search/search?nameData=' + that.data.inputVal
      })
      that.data.inputVal == ''
    }
  },
  
   //  点击导航跳转
   gotoSearch(event) {
    console.log(event.currentTarget.dataset.name)
    var that = this
    that.setData({
      nav: event.currentTarget.dataset.name
    })
    wx.navigateTo({
      url: '/packageA/pages/search/search?nameData=' + that.data.nav
    })
  },

  // 点击公告跳转
  gotoNotice(event) {
    this.data.notice == ''
    console.log(event.currentTarget.dataset.name)
    var this4 = this
    this4.setData({
      notice: event.currentTarget.dataset.name
    })
    // console.log(notick)
    if (this4.data.notice == "定制您的专属小程序商城") {
      wx.navigateTo({
        url: '/packageB/pages/exclusive/exclusive'
      })
    }
    if (this4.data.notice == "商城新开张，优惠多多，戳 戳 戳 我看详情。") {
      wx.navigateTo({
        url: "/packageB/pages/more/more",
      })
    }
  },
  
  // //  点击跳转
  // gotoSearch() {
  //   console.log(1)
  // },

  // 商品列表跳转
  gotoDetails: function (event) {
    var that = this
    this.setData({
      shoop: event.currentTarget.dataset.name
    })
    wx.navigateTo({
      // 如果不拼接也是可以跳转的但会蹦应为页面不知道跳转的是哪个商品
      url: '/packageA/pages/details/details?name=' + that.data.shoop,
    })
  },

  // 商品类表页面跳转
  // search: function () {
  //   wx.navigateTo({
  //     url: '../search/search',
  //   })
  // },

  // 事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  
  // // 页面显示完毕，DOM元素加载完成
  // onShow:function(){
  //   let _self = this;
  //   let userInfo = wx.getStorageSync('userInfo')   //本地存储
  //   // 在本地存储里这里判断是否有serInfo
  //   console.log(userInfo)
  //   if (!userInfo) {
  //     wx.navigateTo({
  //       url: '/pages/authorize/authorize',  // 授权页面
  //     })
  //     // return false
  //   } else {
  //     _self.setData({
  //       userInfo: userInfo
  //     })
  //     console.log(_self.data.userInfo)
  //   }
  // },

  // 可以一封庄毅个放发来共 获取分类  关键字  加载更多  的方法
  // 页面初始化加载
  onLoad: function (options){
    // console.log(options)
    console.log(wx.canIUse('view'))
    const base64 = 'CxYh'
    const arrayBuffer = wx.base64ToArrayBuffer(base64)
    console.log(arrayBuffer)
    _self = this
    wx.showLoading({
      title: '正在加载...',
      icon: 'loading'
    })
    let _this = this
    // 请求商品列表
    wx.request({
      // 如果是加载更多  我们应该保存之前的数据  并把这次获得的数据拼接起来
      url: 'https://api.it120.cc/linlin/shop/goods/list?page=' + _this.data.pageNum + '&pageSize=' + _this.data.pagesIze,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        res.data.data.sort(function (a, b) {
          return a.id - b.id;
        });
        _this.setData({
          list: res.data.data
        })
        wx.hideLoading();
      }
    })

     // 轮播
    let _this1 = this
    wx.request({
      url: 'https://api.it120.cc/linlin/banner/list',
      success: (res) => {
        console.log('banner', res)
        _this1.setData({
          bannerList: res.data.data
        })
        console.log(_this1.data.bannerList)
      },
    })
    
    // 上下滚动 (公告)
    let _this2 = this
    wx.request({
      url: 'https://api.it120.cc/linlin/notice/list',
      method: 'POST',
      success: (res) => {
        console.log(res)
        _this2.setData({
          wll_li: res.data.data.dataList
        })
        wx.hideLoading()
        console.log(_this2.data.wll_li)
      },
    })

    let _this3 = this
    wx.request({
      url: 'https://api.it120.cc/linlin/shop/goods/category/all',
      success: (res) => {
        console.log(res)
        _this3.setData({
          ban: res.data.data
        })
        console.log(_this3.data.ban)
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  // 砍价
  kanjia: function() {
    wx.showLoading({
      title: '暂时无法砍价哦！',
    })
    setTimeout(function() {
      wx.hideLoading();
    }, 500)
  },

  // 拼团
  pintuan: function() {
    wx.showLoading({
      title: '暂时无法拼团哦！',
    })
    setTimeout(function() {
      wx.hideLoading();
    }, 500)
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res)
    }
    return {
      // 当前小程序名称
      title: '',
      // 是跳转小程序的那个页面
      // 当前页面path，必须是以/开头的完整路径
      path: '',
      // 是自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG。显示图片长宽比是5.4
      imageUrl: ''
    }
  },

  onReachBottom: function() { //触底开始下一页
    wx.showLoading({
      title: '加载中...',
    })
    // 改变this指向
    var _that = this;
    var num = _that.data.pageNum += 1
    _that.setData({
      jiazai:'加载中...'
    })
    wx.request({
      url: 'https://api.it120.cc/linlin//shop/goods/list?page=' + num + '&pageSize=' + _that.data.pagesIze,
      success: function(res) {
        if (res.data.code == 0) {
          console.log(res.data)
          res.data.data.sort(function(a, b) {
            return a.id - b.id;
          });
          var data = _that.data.list.concat(res.data.data)
          _that.setData({
            list: data
          })
          wx.hideLoading();
          _that.setData({
            jiazai: '加载更多...'
          })
          return false;
        } else if (res.data.code == 700) {
          wx.hideLoading();
          _that.setData({
            jiazai: '没有更多数据啦'
          })
        }
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
