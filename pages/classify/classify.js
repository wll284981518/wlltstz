// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: false, 
    // item: [],
    list: [],
    list_one:[],
    // searchValue: "",
    currentNavtab: 0,
    id: '',
    // 搜索框事件
    inputVal: '',
  },
  //点击右侧的商品，进入商品详情页
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
   //点击右侧的商品，进入商品详情页
  tap: function (res) {
    console.log(res)
    let that=this;
    let index = res.currentTarget.dataset.index 
    let id = res.currentTarget.dataset.item.id;
    console.log(res)
    console.log(res.currentTarget.dataset.item.id)
    wx.request({
      url: 'https://api.it120.cc/linlin/shop/goods/list',
      data: {
        categoryId: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res);
        if(res.data.code==0){
          that.setData({
            currentNavtab: index,
            list_one: res.data.data,
            shop:true
          })
        }else{
          that.setData({
            currentNavtab: index,
            list_one: res.data.data,
            shop:false
          })
        }
      }
    })
  },
 
  //搜索框的数据
 // 搜索
 inputTyping: function (event) {
  console.log(event.detail.value)
  this.setData({
    inputVal: event.detail.value
  })
},
  //点击回车，跳转到商品列表页面，并把input的value的值传递过去
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let _this=this;
      wx.request({
        url: 'https://api.it120.cc/linlin/shop/goods/category/all',
        success:function(res){
          console.log(res);
          _this.setData({
            list:res.data.data
          })
        }
      })
  },
  // wx.request({
  //   url: 'https://api.it120.cc/linlin/shop/goods/list',
  //   success: (res) => {
  //     console.log(res)
  //     var aa = res.data.data.filter((res) => {
  //       return res.categoryId == 88805
  //     })
  //     this.setData({
  //       list: aa
  //     })
  //   }
    // })
  // },

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