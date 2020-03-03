// packageA/pages/buy/buy.js
var that, Token, Detailsress;
const http = require('../../../com/http');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {name:"kuaidi",value:"快递",checked:"true"},
      {name:"daodiaoziqu",value:"到店自取"}
    ],
    show:false,
    list:[],
    data: [],
    text:'',
    text_one:'',
    shu:'',
    show:false,
    radioShow:false,//点击快递还是到店取货
    address:"",
    userName:'',
    telNumber:"",
    address_show:false,//是否有默认收货地址
    arr: {},
    cid:'',
    // list_address:{},
    Remark: '',
    zong:'',
  },

  async sub(data){//点击提交订单，创建订单
    var arr = [];
    var str='';
    var obj={}
    for (var i = 0; i < that.data.list.length; i++) {
      that.data.list[i].sku.forEach((item) => {
        console.log(item.optionId)
        return str += item.optionId + ':' + item.optionValueId + ','
      })
      obj = {
        'goodsId': that.data.list[i].goodsId,
        'number': that.data.list[i].number,
        "propertyChildIds": str,
        "logisticsType": "0"
      }
      arr.push(obj);
      str = '';
    }
    console.log(arr)
    var res = await http.ding({
      token: Token,
      //是否自动发货，true 启用，需要开通自动发货插件后方可使用
      // autoDeliver: false,
      // true 不实际下单，而是返回价格计算
      // calculate: true,
      // 购买的商品、规格尺寸、数量信息的数组
      goodsJsonStr: JSON.stringify(arr),
      // 收货地址联系人信息
      linkMan: Detailsress.linkMan,
      //收货地址联系人手机号码
      mobile: Detailsress.mobile,
      // 收货地址详细地址
      address: Detailsress.address,
      // 收货地址省份编码
      provinceId: Detailsress.provinceId,
      // 收货地址城市编码
      cityId: Detailsress.cityId,
      // 收货地址区县编码
      districtId: Detailsress.districtId,
      // 收货地址邮政编码
      code: Detailsress.code,
      // 多少分钟未支付自动关闭本订单，传0不自动关闭订单
      expireMinutes: 0,
      // 下单备注信息
      remark: that.data.Remark,
    })
    var L=''
    console.log(res.data)
    if (res.data.code == 0) {
      for (var i = 0; i < that.data.list.length; i++) {
        var K = that.data.list[i].key
        L =await http.remove({
          key: K,
          token: Token
        })
      }
    }
    if (L.data.code == 0) {
     wx.showToast({
       title: '订单提交成功',
     })
      wx.navigateTo({
        url: '/packageA/pages/order/order',
      })
    }
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

  //点击收货地址，跳转到编辑地址界面
  shouHuo(e){
    console.log(e)
    wx.navigateTo({
      url: "/packageC/pages/address/address",
    })
  },
  
  //点击添加收货地址
  add:function(e){
    wx.navigateTo({
      url: "/packageC/pages/address/address",
    })
  },
  //radio点击事件
  radioChange: function (e) {
    this.setData({
      radioShow: !this.data.radioShow
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  userRemark(e) {
    console.log(e)
    that.setData({
      Remark: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   // console.log('onload')
  //   that=this;
  //   Token = wx.getStorageSync('token')
  //   that.mo_address()
  //    // var shu=options.shu;
  //    // var a=JSON.parse(options.a);
  //    // var id=options.id;
  //    // console.log(id);
  //    // console.log(a);
  //    //获取本地的商品数据
  //    // var list=await http.detail({
  //    //   id:id,
  //    //   token:wx.getStorageSync('token')
  //    // });
  //    // console.log(list);
  //    // if(list.data.code==0){
  //    //   that.setData({
  //    //     list:list.data.data.basicInfo,
  //    //     arr:a,
  //    //     liat_one: list.data.data.properties,
  //    //     cid:id,
  //    //     shu:shu
  //    //   })
  //    // }
  //   // let that=this;
  //   // //获取本地的商品数据
  //   // wx.getStorage({
  //   //   key: 'key',
  //   //   success: function(res) {
  //   //     console.log(res);
  //   //     that.setData({
  //   //       list:res.data.list,
  //   //       text:res.data.text,
  //   //       text_one:res.data.text_one,
  //   //       shu:res.data.shu
  //   //     })
  //   //   },
  //   // });
  //   // // 获取添加到本地的地址
  //   // wx.getStorage({
  //   //   key: 'address',
  //   //   success: function(res) {
  //   //     console.log(res);
  //   //     that.setData({
  //   //       arr:res.data,
  //   //       address_show:true
  //   //     })
  //   //   },
  //   // })
  // },

  async onLoad(options) {
    that = this;
    Token = wx.getStorageSync('token');
    that.mo_address();
    var info = await http.info({
      token:Token
    });
    console.log(info)
    console.log(info.data.data.price)
    this.setData({
      // list:res.data.items,
      zong:info.data.data.price
    })
  },

  // async onLoad(options){
  //   that = this;
  //   var Token=wx.getStorageSync('token')
  //   that.mo_address();
  //   var info=await http.info({
  //     token:Token
  //   });
  //   console.log(info);
  //   this.setData({
  //     // list:res.data.items,
  //     zong:info.data.price
  //   })
  // },
  
  //获取默认地址接口
  async mo_address(){
    var Default = await http.Defaultress({
      token: Token
    })
    console.log(Default)
    if (Default.data.code == 700) {
      wx.showToast({
        title: "未添加收货地址",
        duration: 1000,
        icon: "loading"
      })
      wx.navigateTo({
        url: '/packageC/pages/newaddress/newaddress',
      })
      return
    } else if (Default.data.code == 0) {
      console.log(Default.data.data.info)
      Detailsress = Default.data.data.info
      that.setData({
        address_show: true,
        arr: Detailsress
      })
    }
    console.log(that.data.arr)
    // wx.request({
    //   url: 'https://api.it120.cc/linlin/user/shipping-address/default/v2',
    //   method: 'GET',
    //   data: {
    //     token: wx.getStorageSync('token')
    //   },
    //   success(res) {
    //     console.log(res);
    //     if (res.data.code == 0) {
    //       that.setData({
    //         list: res.data.data,
    //         address_show: true
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onShow() {
    this.mo_address();//调用默认地址接口
    this.shop_sub();//获取本地数据
    console.log(that.data)
  },

  //获取本地要购买的订单
  shop_sub(){
    var shoping=wx.getStorageSync('sj');
    shoping.forEach(v=>{
      that.data.shu = v.number;
      that.data.cid = v.goodsId;
    })
    that.setData({
      list:shoping
    })
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