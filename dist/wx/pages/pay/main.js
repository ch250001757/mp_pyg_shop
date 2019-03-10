require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([4],{"4k+m":function(t,e){},BLkF:function(t,e,s){"use strict";var a=s("G8n8"),r=s("gO5V");var n=function(t){s("4k+m")},i=s("ybqe")(a.a,r.a,n,"data-v-51a5ae7b",null);e.a=i.exports},G8n8:function(t,e,s){"use strict";var a=s("Xxa5"),r=s.n(a),n=s("exGp"),i=s.n(n),o=s("iTgA");e.a={data:function(){return{orderList:[],addressInfo:null,totalAmount:0,token:null,code:null}},onLoad:function(t){var e=this;this.getOrderList(t.ids),wx.getStorageSync("addressInfo")&&(this.addressInfo=wx.getStorageSync("addressInfo")),wx.getStorageSync("token")&&(this.token=wx.getStorageSync("token")),wx.login({success:function(t){e.code=t.code}})},methods:{getOrderList:function(t){var e=this;return i()(r.a.mark(function s(){var a,n;return r.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.$axios.get("api/public/v1/goods/goodslist?goods_ids="+t);case 2:a=s.sent,console.log(a),e.totalAmount=0,n=Object(o.c)(),a.data.message.forEach(function(t){t.goods_number=n[t.goods_id],e.totalAmount+=t.goods_number*t.goods_price}),e.orderList=a.data.message;case 8:case"end":return s.stop()}},s,e)}))()},chooseAddress:function(){var t=this;wx.chooseAddress({success:function(e){e.detailAddress=""+e.provinceName+e.cityName+e.countyName+e.detailInfo,wx.setStorageSync("addressInfo",e),t.addressInfo=e}})},getuserinfo:function(t){var e=this;return i()(r.a.mark(function s(){var a;return r.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if("getUserInfo:fail auth deny"!==t.mp.detail.errMsg){s.next=2;break}return s.abrupt("return");case 2:return wx.setStorageSync("userInfo",t.mp.detail.userInfo),s.next=5,e.$axios.post("http://127.0.0.1:8899/api/public/v1/users/wxlogin",{code:e.code,encryptedData:t.mp.detail.encryptedData,iv:t.mp.detail.iv,rawData:t.mp.detail.rawData,signature:t.mp.detail.signature});case 5:a=s.sent,console.log(a),e.token=a.data.message.token,wx.setStorageSync("token",a.data.message.token);case 9:case"end":return s.stop()}},s,e)}))()},orderAndPay:function(){var t=this;return i()(r.a.mark(function e(){var s,a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.token){e.next=3;break}return wx.showToast({title:"请先登录",image:"/static/img/error2.png",duration:2e3,mask:!0}),e.abrupt("return");case 3:if(t.addressInfo){e.next=6;break}return wx.showToast({title:"请选择收货地址",image:"/static/img/error.png",duration:2e3,mask:!0}),e.abrupt("return");case 6:return s={order_price:t.totalAmount,consignee_addr:t.addressInfo.detailAddress+" "+t.addressInfo.userName+" "+t.addressInfo.telNumber,goods:t.orderList},e.next=9,t.$axios.post("api/public/v1/my/orders/create",s);case 9:200===(a=e.sent).data.meta.status&&t.pay(a.data.message.order_number);case 11:case"end":return e.stop()}},e,t)}))()},pay:function(t){var e=this;return i()(r.a.mark(function s(){var a;return r.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.$axios.post("api/public/v1/my/orders/req_unifiedorder",{order_number:t});case 2:a=s.sent,console.log(a),wx.requestPayment({timeStamp:a.data.message.pay.timeStamp,nonceStr:a.data.message.pay.nonceStr,package:a.data.message.pay.package,signType:a.data.message.pay.signType,paySign:a.data.message.pay.paySign,success:function(){var s=i()(r.a.mark(function s(a){return r.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.$axios.post("my/orders/chkOrder",{order_number:t});case 2:200===s.sent.data.meta.status&&wx.navigateTo({url:"/pages/orders/main?type=3"});case 4:case"end":return s.stop()}},s,e)}));return function(t){return s.apply(this,arguments)}}(),fail:function(t){"requestPayment:fail cancel"===t.errMsg&&wx.showToast({title:"您取消了付款",image:"/static/img/error2.png",duration:2e3,mask:!0,success:function(t){setTimeout(function(){wx.navigateTo({url:"/pages/orders/main?type=2"})},2e3)}})}});case 5:case"end":return s.stop()}},s,e)}))()}}}},OiO5:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("5nAL"),r=s.n(a),n=s("BLkF");new r.a(n.a).$mount()},gO5V:function(t,e,s){"use strict";var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",[s("view",{staticClass:"address",attrs:{eventid:"0"},on:{click:t.chooseAddress}},[t.addressInfo?s("view",{staticClass:"address-info"},[s("view",{staticClass:"address-info-name-phone"},[s("view",[s("text",{staticStyle:{"font-size":"12px"}},[t._v("收货人："+t._s(t.addressInfo.userName))])]),t._v(" "),s("view",{staticStyle:{display:"flex","align-items":"center"}},[s("text",{staticStyle:{"margin-right":"36rpx","font-size":"12px"}},[t._v(t._s(t.addressInfo.telNumber))]),t._v(" "),s("view",{staticClass:"iconfont-tap icon-jiantouyou"})])]),t._v(" "),s("view",{staticClass:"address-info-detail-info"},[s("text",{staticStyle:{"font-size":"12px"}},[t._v("收货地址："+t._s(t.addressInfo.detailAddress))])])]):s("view",{staticClass:"address-add"},[s("text",{staticStyle:{"font-size":"12px"}},[t._v("+ 新增地址")])]),t._v(" "),t._m(0)]),t._v(" "),s("view",{staticClass:"order-list"},t._l(t.orderList,function(e,a){return s("block",{key:e.goods_id},[s("view",{staticClass:"product-item"},[s("navigator",{staticClass:"product-left"},[s("image",{attrs:{src:e.goods_small_logo}})]),t._v(" "),s("view",{staticClass:"product-right"},[s("navigator",{staticClass:"product-name"},[t._v("\n            "+t._s(e.goods_name)+"\n          ")]),t._v(" "),s("view",{staticClass:"product-right-price"},[s("text",{staticClass:"product-right-price-symbol"},[t._v("￥")]),t._v(" "),s("text",{staticClass:"product-right-price-integer"},[t._v(t._s(e.goods_price))]),t._v(" "),s("text",{staticClass:"product-right-price-decimal"},[t._v(".00")])]),t._v(" "),s("view",{staticClass:"product-right-num"},[t._v("x"+t._s(e.goods_number))])],1)],1)])})),t._v(" "),s("view",{staticClass:"order-total"},[s("view",{staticClass:"order-total-item"},[s("view",[t._v("商品金额")]),t._v(" "),s("view",{staticClass:"order-total-item-price"},[t._v("￥"+t._s(t.totalAmount))])]),t._v(" "),t._m(1),t._v(" "),t.token?t._e():s("block",[s("button",{staticClass:"wxLogin",attrs:{"open-type":"getUserInfo",eventid:"1"},on:{getuserinfo:t.getuserinfo}},[t._v("点击登录后下单支付")])],1),t._v(" "),s("block",{attrs:{"wx:else":""}},[s("view",{staticClass:"wxPay",attrs:{eventid:"2"},on:{click:t.orderAndPay}},[t._v("微信支付")])])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"address-pic"},[e("image",{attrs:{src:"/static/img/cart_border@2x.png"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"order-total-item"},[e("view",[this._v("运 费")]),this._v(" "),e("view",{staticClass:"order-total-item-price"},[this._v("+￥0.00")])])}]};e.a=a}},["OiO5"]);