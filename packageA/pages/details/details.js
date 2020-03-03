// pages/details/details.js
const http = require('../../../com/http');
// console.log(http)
// const regeneratorRuntime=require('/utils/regenerator-runtime/runtime.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pingTuan: false,
    kanJia: false,
    list: [],
    flg: false,
    flg_one: false,
    flg_two: false,
    flg_three: false,
    flg_four: false,
    show: false,
    name: '',
    hai: false,
    shop: false,
    shu: '0',
    background: 'disable',
    bg: "gray",
    shop_one: false,
    id: '',
    yc:[],//颜色尺码
    yanse:[], //颜色
    chima: [], //花色
    yanseid:'',
    huaseid:'',
    curIndex:undefined,
    curIndex2:undefined,
    propertyId:'',
    propertyId2:'',
    price:''
  },
  //点击立即购买
  mai: function (e) {
    console.log(this.data)
    if (this.data.huaseid == "" || this.data.yanseid == "") {
      wx.showToast({
        title: '请选择商品规格',
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.setStorage({
        key: 'key',
        data: {
          list: this.data.list,
          text: this.data.yanseid,
          text_one: this.data. huaseid,
          shu: this.data.shu
        },
      })
      wx.navigateTo({
        url: "/packageA/pages/buy/buy",
      })
    }
  },
  //点击加入购物车
  async addcart (e) { 
    var that = this
    var Token = wx.getStorageSync('token')
    console.log(Token)
    console.log(this.data)
    console.log(this.data.list.id)
    console.log(this.data.shu)
    console.log(this.data.yanseid)
    console.log(this.data.huaseid)
    console.log(this.data.propertyId)
    console.log(this.data.propertyId2)
    // console.log(this.data.list.propertyIds[3])
    if(that.data.list!=undefined){
      if (this.data.huaseid == "" || this.data.yanseid == "") {
        wx.showToast({
          title: '请选择商品规格',
          // title: '提示',
          // content: '请选择商品规格',
          icon: 'none',
          duration: 1500
        })
        return;
      }
      if(that.data.shu==0){
        wx.showToast({
          title: '购买商品数量不能为0！',
          // content: '购买商品数量不能为0！',
          icon: 'none',
          duration: 1500
        })
        return;
      } 
      else{
        wx.request({
          url: 'https://api.it120.cc/linlin/shopping-cart/add',
          method:'POST',
          header: { 'content-type': "application/x-www-form-urlencoded" },
          data:{
            goodsId:this.data.list.id,
            // goodsId: 264353,
            number:this.data.shu,
            // {属性id:具体的id}  {23265:this.data.yanseid}  {24043:this.data.yhuaseid} 
            // 颜色 ： 红色  尺寸 ：淡紫色小船
            sku: JSON.stringify(
              [{ "optionId":this.data.propertyId, "optionValueId": this.data.yanseid }, { "optionId": this.data.propertyId2 , "optionValueId": this.data.huaseid   }
              ]) ,
            token:Token
          },
          success(res){
            console.log(res)
          }
        })
        wx.showToast({
          title: '添加购物车成功',   // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 2000   // 提示窗停留时间，默认1500ms
        })
        that.setData({
          showView: (!that.data.showView),
          shop:false,
          curIndex:Number,
          curIndex2:Number,
          shu: '0'
        })
      }
    }else{
      wx.request({
        url: 'https://api.it120.cc/linlin/shopping-cart/add',
        method:'POST',
        header: { 'content-type': "application/x-www-form-urlencoded" },
        data:{
          goodsId:this.data.list.id,
          // goodsId: 264353,
          number:this.data.shu,
          token:Token
        },
        success(res){
          console.log(res);
          wx.showToast({
            title: '添加购物车成功',   // 标题
            icon: 'success',  // 图标类型，默认success
            duration: 2000   // 提示窗停留时间，默认1500ms
          });
          that.setData({
            showView: (!that.data.showView),
            shop:false,
            curIndex:Number,
            curIndex2:Number,
            shu: '0',
          })
        }
      })
    }
    
    // if (this.data.text == "" || this.data.text_one == "") {
    //   wx.showToast({
    //     title: '请选择规格',
    //     icon: 'none',
    //     duration: 1500
    //   })
    // } else {
    //   wx.showToast({
    //     title: '加入购物车！', // 标题
    //     icon: 'success',  // 图标类型，默认success
    //     duration: 1500  // 提示窗停留时间，默认1500ms
    //   });
    //   this.setData({
    //     shop: false
    //   })
    //   wx.setStorage({
    //     key: 'key',
    //     data: {
    //       list: this.data.list,
    //       text: this.data.text,
    //       text_one: this.data.text_one,
    //       shu: this.data.shu
    //     },
    //   })
    // }
  },
  //点击花色
  check: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    console.log(id)
    var index = e.currentTarget.dataset.index
    console.log(index)
    var propertyId = e.currentTarget.dataset.propertyid
    console.log(propertyId)
    console.log(this.data)
    var pricem = e.currentTarget.dataset.price
    console.log(e.currentTarget.dataset)
    // console.log(this.data.curIndex)
    if (index == this.data.curIndex) {
      this.setData({
        curIndex: null,
        yanseid: ''
      })
    } else {
      this.setData({
        curIndex: index,
        yanseid: id,
        propertyId: propertyId,
        pricem: pricem
      })
      console.log(this.data.propertyId)
    }
  },
  check_one: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    console.log(id)
    var index = e.currentTarget.dataset.index
    console.log(index)
    var propertyId2 = e.currentTarget.dataset.propertyid
    console.log(propertyId2)
    // console.log(this.data.curIndex2)
    if (index == this.data.curIndex2){
      this.setData({
        curIndex2: null,
        huaseid: ''
      })
      
    }else{
      this.setData({
        curIndex2: index,
        huaseid: id,
        propertyId2: propertyId2
      })
    }
    console.log(propertyId2)
    console.log(this.data.curIndex2)
  },
  //点击隐藏购物车
  hidd: function (e) {
    this.setData({
      shop: false,
      shop_one: false
    })
  },
  //点击input框输入数字
  huo: function (e) {
    console.log(e);
    var num = e.detail.value;
    let background = num > 0 ? 'normal' : 'disable';
    this.setData({
      shu: num,
      background: background
    })
  },
  //点击减-
  jian: function (e) {
    let num = this.data.shu;
    num--
    if (num < 1 ) {
      num=1;
      wx.showToast({
        title: '数量最少为1',
        icon: 'none',
        duration: 2000
      })
    }
    // let background = num > 1 ? 'normal' : 'disable'
    this.setData({
      shu: num,
      // background: background
    })
  },
  //点击加
  async jia (e) {
    var that =this
    var Token = wx.getStorageSync('token')
    let num = this.data.shu;
    num++;
    // let background = num > 1 ? 'normal' : 'disable'
    this.setData({
      shu: num,
      // background: background
    })
    // 获取价格的接口
    var price = await http.price({
      goodsId: this.data.list.id,
      propertyChildIds: this.data.propertyId+':'+ this.data.yanseid+','+this.data.propertyId2+':'+this.data.huaseid,
      token:Token
    })
    console.log(price);
    if (price.data.code==0) {
      console.log('获取价格成功')
      console.log(price.data)
      that.setData({
        price:price.data.data.price
      })
    }
    // wx.request({
    //   url: 'https://api.it120.cc/linlin/shop/goods/price',
    //   data:{
    //     goodsId: this.data.list.id,
    //     propertyChildIds: this.data.propertyId+':'+ this.data.yanseid+','+this.data.propertyId2+':'+this.data.huaseid,
    //     token:Token
    //   },
    //   success(res){
    //     console.log(res)
    //     if(res.data.code==0){
    //       that.setData({
    //         price:res.data.data.price
    //       })
    //     }
    //   }
    // })
  },
  //点击立即购买显示页面
  gou_one: function (e) {
    this.setData({
      shop_one: !this.data.shop_one
    })
  },
  //点击选择颜色、加入购物车
  gou: function () {
    // let that = this;
    // that.setData({
    //   showView: (!that.data.showView)
    // })
    this.setData({
      shop: !this.data.shop,
      num: null,
      num_one: null
    })
  },
  //点击购物车
  shop: function (e) {
    wx.navigateTo({
      url: '/pages/cart/cart',
    })
  },
  //点击关闭海报
  hai_bi: function (e) {
    this.setData({
      hai: false
    })
  },
  //点击生成海报
  hai: function (e) {
    this.setData({
      hai: !this.data.hai
    })
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
    //获取点击商品传递过来的id的值
    console.log(options)
    let id = options.name;
    console.log(id)
    let that = this
    wx.request({
      url: 'https://api.it120.cc/linlin/shop/goods/detail?id=' + id,
      success: function (res) {
        console.log(res);
        var yc = res.data.data.properties
        console.log(yc)
        var chima = res.data.data.properties[1].childsCurGoods
        console.log(chima)
        var yanse = res.data.data.properties[0].childsCurGoods
        console.log(yanse)
        that.setData({
          list : res.data.data.basicInfo,   // 选择规格和尺寸
          yc:yc,
          chima:chima,
          yanse:yanse
        })
        console.log(that.data.list);
      }
    });
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
  onShareAppMessage: function (options) {
    console.log(options)
    console.log('调用分享')
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      // 当前小程序名称
      title: "天使童装",   // 默认是小程序的名称(可以写slogan等)
     // 是跳转小程序的那个页面
      path: '',        // 默认是当前页面，必须是以‘/’开头的完整路径，分享给别人别人默认打开页面，空位当前页面，'pages/index/index/'有值则跳转到对应页面
      imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {           
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
          // 来自页面内转发按钮
          console.log("转发成功")
        }
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
          console.log(" 取消转发")
        } else if (res.errMsg == 'shareAppMessage:fail') {
          console.log("转发失败")
          // 转发失败，其中 detail message 为详细失败信息
        }
      }
      // complete: function(){
      //   //转服结束之后的回调函数  （转发成不成功都会执行）
      // }
  　};
  　// 来自页面内的按钮的转发
  　if(options.from == 'button'){
  　   var eData = options.target.dataset;
  　　 console.log(eData);     // shareBtn
  　　 // 此处可以修改 shareObj 中的内容
      // 分享给别人别人默认打开页面，空位当前页面，'pages/index/index/'有值则跳转到对应页面
      shareObj.path = ''
　　}
　　// 返回shareObj
　　return shareObj;
    
    // return {
    //   title: '天使童装',
    //   path: '/page/xiangQin/xiangQin?name=' + this.data.name,
    //   desc: this.data.name,
    //   success: function (res) {
    //     console.log(res.shareTickets)
    //     // console.log
    //     wx.getShareInfo({
    //       shareTicket: res.shareTickets,
    //       success: function (res) { console.log(res) },
    //       fail: function (res) { console.log(res) },
    //       complete: function (res) { console.log(res) }
    //     })
    //   },
    //   fail: function (res) {
    //     // 分享失败
    //     console.log(res)
    //   }
    // }
  }
})