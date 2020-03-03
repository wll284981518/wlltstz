// pages/newaddress/newaddress.js
var _self, Token;
const http=require("../../../com/http");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    array: ['是','否'],
    userName:'', //用户名
    userPhone:'',//用户手机号
    userCode:'',//用户编码
    userCityId:'',//用户城市id
    userCityName:'',//用户城市名称
    userDetails:'',//用户详细地址
    list:[],
    region:'',
    // customItem:'请选择地区',
    code:[],
    edit:false,
    userId:'', 
    userDefault:true//用户默认地址
  },

  // 默认地址 
  bindPickerChange: function(e) {
    console.log(e.detail.value)
    if(e.detail.value==0){
      _self.data.userDefault=true
    }else if(e.detail.value==1){
      _self.data.userDefault=false
    }
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  // 城市
  bindRegionChange: function (e) {
    console.log(e)
    this.setData({
      region: e.detail.value,
    // 城市ID
      userCityId:e.detail.code,
    // 城市名称
      userCityName:e.detail.value
    })
  },
 
  //用户名
  userNameInput(e){
    console.log(e);
    _self.setData({
      userName: e.detail.value
    })
    console.log( e.detail.value)
  },
  //用户手机号
  userPhoneInput(e){
    console.log(e);
    _self.setData({
      userPhone: e.detail.value
    })
    console.log( e.detail.value)
  },
  //用户编码
  userCodeInput(e){
    console.log(e);
    _self.setData({
      userCode: e.detail.value
    })
    console.log( e.detail.value)
  },
  //用户详细地址
  userDetailsInput(e){
    console.log(e);
    _self.setData({
      userDetails: e.detail.value
    })
    console.log( e.detail.value)
  },
  
   // 获取到用户信息添加收货地址
   async add(){
    if(_self.data.userName==''||_self.data.userPhone==''||_self.data.userDetails==''||_self.data.userCityId==''||_self.data.userDefault==''){
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      })
      console.log(_self.data.userName,_self.data.userPhone,_self.data.userDetails,_self.data.userCityId,_self.data.userDefault)
    }else{
      console.log(_self.data.userName)//联系人
      console.log(_self.data.userPhone)//手机号码
      console.log(_self.data.userCode)
      console.log(_self.data.userDetails)//详细地址
      console.log(_self.data.userCityId)
      console.log(_self.data.userCityName)
      // console.log(_self.data.userName)
      var res = await http.add_address({
        address:_self.data.userDetails,//详细地址
        provinceId:_self.data.userCityId[0],//所属省份市编码
        cityId:_self.data.userCityId[1],//所属城市编码
        districtId:_self.data.userCityId[2],//所属区县编码
        linkMan:_self.data.userName,//联系人
        mobile:_self.data.userPhone,//手机号码
        isDefault:_self.data.userDefault,//是否为默认地址
        token:Token
      })
      console.log(res)
      if(res.data.code == 0){
        wx.showToast({
          title: '添加成功',
        })
        wx.redirectTo({
          url: '/packageC/pages/address/address',
        })
      }else{
        wx.showToast({
          title: '请正确输入',
        })
      }
    }
  },
  // //点击获取微信地址
  // wx_address(){
  //   let that=this;
  //   wx.getSetting({
  //     success(res) {
  //       console.log("vres.authSetting['scope.address']：", res.authSetting['scope.address'])
  //       if (res.authSetting['scope.address']) {
  //         console.log("111")
  //         wx.chooseAddress({
  //           success(res) {
  //             console.log(res.userName)
  //             console.log(res.postalCode)
  //             console.log(res.provinceName)
  //             console.log(res.cityName)
  //             console.log(res.countyName)
  //             console.log(res.detailInfo)
  //             console.log(res.nationalCode)
  //             console.log(res.telNumber)
  //             that.setData({
  //               userName:res.userName,
  //               cityName:res.cityName,
  //               countyName:res.countyName,
  //               detailInfo:res.detailInfo,
  //               telNumber:res.telNumber
  //             })
  //           }
  //         })
  //         // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问

  //       } else {
  //         if (res.authSetting['scope.address'] == false) {
  //           console.log("222")
  //           wx.openSetting({
  //             success(res) {
  //               console.log(res.authSetting)
  //             }
  //           })
  //         } else {
  //           console.log("eee")
  //           wx.chooseAddress({
  //             success(res) {
  //               console.log(res.userName)
  //               console.log(res.postalCode)
  //               console.log(res.provinceName)
  //               console.log(res.cityName)
  //               console.log(res.countyName)
  //               console.log(res.detailInfo)
  //               console.log(res.nationalCode)
  //               console.log(res.telNumber)
  //               that.setData({
  //                 userName: res.userName,
  //                 cityName: res.cityName,
  //                 countyName: res.countyName,
  //                 detailInfo: res.detailInfo,
  //                 telNumber: res.telNumber
  //               })
  //             }
  //           })
  //         }
  //       }
  //     }
  //   })
  // },

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
    //  改变This指向
    _self = this;
    Token = wx.getStorageSync('token')
  },
  // async onLoad(options) {
  //   var that=this;
  //   var id=options.id
  //   console.log(id);
  //   var xq = await http.newaddress({
  //       id: id,
  //       token:wx.getStorageSync('token')
  //   });
  //   console.log(xq);
  //   if (xq.data.code == 0) {
  //        that.setData({
  //          userName: xq.data.data.info.linkMan,
  //          telNumber: xq.data.data.info.mobile,
  //          address: xq.data.data.info.address,
  //          region: [],
  //          edit:true,
  //          userId: xq.data.data.info.id
  //        })
  //       }
  //   // wx.request({
  //     // url: 'https://api.it120.cc/zhangjianbao/user/shipping-address/detail/v2',
  //     // data:{
  //     //     id:id,
  //     //     token:wx.getStorageSync('token')
  //     // },
  //     // success(res){
  //     //   console.log(res);
  //   //     if(res.data.code==0){
  //   //      that.setData({
  //   //        userName: res.data.data.info.linkMan,
  //   //        telNumber: res.data.data.info.mobile,
  //   //        address: res.data.data.info.address,
  //   //        region: [],
  //   //        edit:true,
  //   //        userId: res.data.data.info.id
  //   //      })
  //   //     }
  //   //   }
  //   // })
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