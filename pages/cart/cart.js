// pages/cart/cart.js
var that;
const http=require('../../com/http');
console.log(http)
// ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[],
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    shop: [],
    isLength:false,
    num:'',
    zong:'',
    index:'',
    sj:'',
    nul:false
  },
  tu_one(e){//点击多选框图片，显示空白
    console.log(e)
    console.log(this.data.items)
    if (this.data.items[e.currentTarget.dataset.index].active) {
      this.data.items[e.currentTarget.dataset.index].active = false;
      this.data.nul=false;
    } else {
      this.data.items[e.currentTarget.dataset.index].active = true;
      this.data.nul=true;
    }
    this.setData({
      items: this.data.items
    })
  },
  tu(e){//点击多选框,显示图片
    console.log(e);
    console.log(this.data.items)
    if (this.data.items[e.currentTarget.dataset.index].active){
      this.data.items[e.currentTarget.dataset.index].active=false;
      this.data.nul=false;
    }else{

      this.data.items[e.currentTarget.dataset.index].active=true;
      this.data.nul=true;
    }
    this.setData({
      items:this.data.items
    })
    this.data.sj = this.data.items[e.currentTarget.dataset.index];
  },
  sub(){//点击结算
    var num=[];
    this.data.items.forEach(v=>{
      if(v.active){
        num.push(v);
      }
    })
    if(this.data.nul){
      wx.setStorageSync('sj', num);
      wx.navigateTo({
        url: '/packageA/pages/buy/buy',
      })
    }
  },
  async add(e){
    var that = this
    var Token = wx.getStorageSync('token')
    console.log(e)
    var modifyNumber = await http.modifyNumber({
      key: e.currentTarget.dataset.key,
      number: e.currentTarget.dataset.number,
      token:Token
    })
    console.log(modifyNumber);
    if(modifyNumber.data.code==0){
      that.items();//再次渲染到页面中
    }
  },
  // add(e){
  //   var that = this
  //   var Token = wx.getStorageSync('token')
  //   console.log(e)
  //   wx.request({
  //     url: 'https://api.it120.cc/linlin/shopping-cart/modifyNumber',
  //     method:"POST",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     data:{
  //       key: e.currentTarget.dataset.key,
  //       number: e.currentTarget.dataset.number,
  //       token:Token
  //     },
  //     success(res){
  //       console.log(res)
  //       if(res.data.code==0){
  //         that.onLoad()
  //       }
  //     }
  //   })
  // },
  async reduce(e){
    var that = this
    var Token = wx.getStorageSync('token')
    console.log(e)
    var modifyNumber = await http.modifyNumber({
      key: e.currentTarget.dataset.key,
      number: e.currentTarget.dataset.number,
      token:Token
    })
    console.log(modifyNumber);
    if(modifyNumber.data.code==0){
      that.items();//再次渲染到页面中
    }
  },
  // reduce(e){
  //   var that = this
  //   var Token = wx.getStorageSync('token')
  //   console.log(e)
  //   wx.request({
  //     url: 'https://api.it120.cc/linlin/shopping-cart/modifyNumber',
  //     method: "POST",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     data: {
  //       key: e.currentTarget.dataset.key,
  //       number: e.currentTarget.dataset.number,
  //       token: Token
  //     },
  //     success(res) {
  //       console.log(res)
  //       if (res.data.code == 0) {
  //         // that.onLoad()
  //       }
  //     }
  //   })
  // },
  goin(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    console.log(that.data.items);
    that.setData({
      items: that.data.items,
      
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  //点击删除按钮，删除当前数据
  async del(e) {
    var Token = wx.getStorageSync('token')
    console.log(e);
    var delate=await http.remove({
      key: e.currentTarget.dataset.index,
      token: Token
    })
    console.log(delate);
    if(delate.data.code==0){
      // that.list();
      // 删除成功
      this.data.items.splice(e.currentTarget.dataset.x, 1);
      this.setData({
        items: this.data.items
      })
    }
    // wx.request({
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   url: 'https://api.it120.cc/linlin/shopping-cart/remove',
    //   data: {
    //     key: e.currentTarget.dataset.index,
    //     token: Token
    //   },
    //   success: (res) => {
    //     if (res.data.code == 0) {
          // // 删除成功
          // this.data.items.splice(e.currentTarget.dataset.x, 1);
          // this.setData({
          //   items: this.data.items
          // })
    //     }
    //   }
    // })
  },
  // del: function (e) {
  //   var Token = wx.getStorageSync('token')
  //   console.log(e);
  //   wx.request({
  //     method: "POST",
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     url: 'https://api.it120.cc/linlin/shopping-cart/remove',
  //     data: {
  //       key: e.currentTarget.dataset.index,
  //       token: Token
  //     },
  //     success: (res) => {
  //       if (res.data.code == 0) {
  //         // 删除成功
  //         this.data.items.splice(e.currentTarget.dataset.x, 1);
  //         this.setData({
  //           items: this.data.items
  //         })
  //       }
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    // that.items();
  },

  async items(){
    var Token=wx.getStorageSync('token')
    var info=await http.info({
      token:Token
    });
    console.log(info);
    if (info.data.code == 0) {
      info.data.data.items.forEach(v=>{
        v.active=false;//给数据里加一个变量，判断多选框状态
      })
      that.setData({
        zong:info.data.data.price,
        items:info.data.data.items,
        isLength: true,
        num: info.data.data.items.number
      })
    } else if (info.data.code == 700) {
      that.setData({
        items: [],//当删除最后一天数据，让list数组为空，就没有数据渲染了
        isLength: false
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
    that.items();
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