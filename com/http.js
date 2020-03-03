//封装api请求接口
var base ='https://api.it120.cc/linlin';//封装公共接口部分
// 封装的方法
// 定义一个函数
function api(url,methods,data){
  // 拼接url地址
  // var _url = Baseurl+url
  // Pronise解决异步编程    用于异步返回
  //用promise函数才可以在页面接受到数据要加return返回值
  return new Promise((resolve,reject)=>{
    wx.request({
      url: base+url,
      method:methods,
      data:data,
      header:{
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res){
        if(res.data.code==2000){//检测token是否有效
          // 所有的接口  2000 都代表 token 无效 未登录  / 登录过期
          wx.showModal({
            title: '登录失效',
            content: '请重新登录！点击确定跳转至登录页',
            showCancel:false,//是否显示取消按钮
            success(res1){
             if(res1.confirm){//点击确定按钮
               wx.navigateTo({//跳转到登录页面
                 url: '/pages/address/address',
               })
             }
            }
          })
        }
        resolve(res);//成功返回数据
        // 将成功的结果返回
      },error(msg){
        console.log(msg)
        // 将失败的结果返回
        reject(msg);//失败返回数据
      }
    })
  })
}
//登录接口
// 购物车接口     data  页面参数
// 要到出的文件
function login(data){
  return api('/user/wxapp/login','get',data);
}

//主页商品列表接口
function shop_list(data){
  return api('/shop/goods/list','get',data);
}

//加入购物车
function addcard(data){
  return api('/shopping-cart/add','post',data);
}

//获取商品价格
function price(data){
  return api('/shop/goods/price','get',data);
}

//获取商品详情
function detail(data){
  return api('/shop/goods/detail','get',data);
}

//加入购物车修改数量
function modifyNumber(data){
  return api('/shopping-cart/modifyNumber', "post", data)
}
//删除购物车的某一项商品
function remove(data){
  return api('/shopping-cart/remove','post',data);
}

//获取商品加入购物车的数据
function info(data){
  return api('/shopping-cart/info','get',data);
}

//获取所有收货地址
function address_list(data){
  return api("/user/shipping-address/list", "get", data);
}

//删除单个地址
function delate(data){
  return api('/user/shipping-address/delete','post',data);
}

//修改地址
function update(data){
  return api('/user/shipping-address/update','post',data);
}

//添加地址
function add_address(data){
  return api("/user/shipping-address/add", "post", data)
}

//获取地址详情
function newaddress(data){
  // url地址
  return api('/user/shipping-address/detail/v2','get',data);
}

// 获取默认地址
function Defaultress(data){
  return api('/user/shipping-address/default/v2','get',data);
} 

//创建订单
function ding(data){
  return api('/order/create','post',data);
} 

//获取订单列表
function ding_list(data) {
  return api('/order/list', 'post', data);
}

// 关闭订单
function orderDelete(data){
  return api("/order/delete","post",data)
}

// 订单详情
function orderDetail(data){
  return api("/order/detail","get",data)
}

// 马上支付
function zhifu(data){
  return api("/pay/wepayez/wxapp",'POST',data)
}

//导出接口
module.exports={
  addcard:addcard,
  login:login,
  shop_list: shop_list,
  price:price,
  detail: detail,
  modifyNumber: modifyNumber,
  remove:remove,
  info:info,
  delate:delate,
  update:update,
  address_list: address_list,
  add_address:add_address,
  newaddress:newaddress,
  ding:ding,
  ding_list:ding_list,
  Defaultress:Defaultress,
  orderDelete:orderDelete,// 关闭订单
  orderDetail:orderDetail,// 订单详情
  zhifu:zhifu
}

// 在需要时用的页面顶部page商不边引入模块就好了
// const http=require('../../../com/http.js');
// const regeneratorRuntime=require('../../../utils/regenerator-runtime/runtime.js');

