// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    flag1: false,
    flag2: false,
    flag3: false,
    flag4: false,
    // 跳转到此页面后拿到的数据
    title: '',
    list: [],
    header: ''
  },

  find1: function () {
    this.setData({
      flag1: true,
      flag2: false,
      flag3: false,
      flag4: false
    })
  },

  find2: function () {
    this.setData({
      flag2: true,
      flag1: false,
      flag3: false,
      flag4: false
    })
  },

  find3: function () {
    this.setData({
      flag3: true,
      flag1: false,
      flag2: false,
      flag4: false
    })
  },

  find4: function () {
    this.setData({
      flag4: true,
      flag1: false,
      flag2: false,
      flag3: false
    })
  },

  // 搜索
  inputTyping: function (event) {
    wx.hideLoading();
    console.log(event.detail.value)
    this.setData({
      name: event.detail.value
    })
  },

  //搜索请求
  search: function () {
    console.log(this.data.name)
    let that = this
    if (this.data.name == '') {
      wx.showLoading({
        title: '请输入商品名称',
      })
      setTimeout(function () {
        wx.hideLoading();
      }, 2000)
    } else {
      wx.showLoading({
        title: '搜索中',
        icon: 'loading'
      })
      wx.request({
        // 关键词搜索 需要替换 goods
        url: 'https://api.it120.cc/linlin/shop/goods/list?nameLike=' + this.data.name,
        success: function (res) {
          if (res.data.code == 700) {
            that.setData({
              title: res.data.msg
            })
            wx.hideLoading();
            that.setData({
              list: []
            })
          } else if (res.data.code == 0) {
            console.log(res.data)
            that.setData({
              list: res.data.data
            })
            that.setData({
              title: ''
            })
            wx.hideLoading();
          }
        }
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let _that = this
    // 接受搜索传递的值
    this.setData({
      name: option.nameData
    })
    wx.showLoading({
      title: '搜索中',
      icon: 'loading'
    })
    // console.log(this.data.title)
    wx.request({
      url: 'https://api.it120.cc/linlin/shop/goods/list?nameLike=' + this.data.name,
      success: function (res) {
        if (res.data.code == 700) {
          _that.setData({
            title: res.data.msg
          })
          _that.setData({
            list: []
          })
          wx.hideLoading();
        } else if (res.data.code == 0) {
          console.log(res.data)
          _that.setData({
            list: res.data.data
          })
          _that.setData({
            title: ''
          })
          wx.hideLoading();
        }
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