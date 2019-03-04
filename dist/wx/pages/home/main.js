require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([3],{

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_floor__ = __webpack_require__(184);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    floor: __WEBPACK_IMPORTED_MODULE_2__components_floor__["a" /* default */]
  },
  data: function data() {
    return {
      swiperdata: [],
      category: [],
      floorData: [],
      isShowGoToTop: false
    };
  },

  // 可以用小程序的声明周期
  onLoad: function onLoad() {
    this.getSwiperData();
    this.getCategory();
    this.getfloorData();
  },

  methods: {
    // 异步请求
    // getSwiperData() {
    //   this.$axios.get("/api/public/v1/home/swiperdata").then(res => {
    //     console.log(res);
    //     this.swiperdata = res.data.message;
    //   });
    // }
    // 改造async
    getSwiperData: function getSwiperData() {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.$axios.get("/api/public/v1/home/swiperdata");

              case 2:
                res = _context.sent;

                _this.swiperdata = res.data.message;

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    getCategory: function getCategory() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.$axios.get("api/public/v1/home/catitems");

              case 2:
                res = _context2.sent;

                // console.log(res);
                _this2.category = res.data.message;

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    getfloorData: function getfloorData() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.$axios.get("api/public/v1/home/floordata");

              case 2:
                res = _context3.sent;

                console.log(res);
                _this3.floorData = res.data.message;

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    },
    goToTop: function goToTop() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  },
  // wx滚动事件
  onPageScroll: function onPageScroll(_ref) {
    var scrollTop = _ref.scrollTop;

    // 解构赋值
    console.log(scrollTop);
    if (scrollTop > 90) {
      // 要设置下节流 不然 每次大于90 就会触发下面的参数
      if (this.isShowGoToTop) return;
      console.log("111");
      this.isShowGoToTop = true;
    } else {
      if (!this.isShowGoToTop) return;
      console.log("2222");
      this.isShowGoToTop = false;
    }
  }
});

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [_c('swiper', {
    attrs: {
      "indicator-dots": "",
      "autoplay": "",
      "circular": "",
      "interval": 3000
    }
  }, _vm._l((_vm.swiperdata), function(item, index) {
    return _c('block', {
      key: index
    }, [_c('swiper-item', {
      attrs: {
        "mpcomid": '0_' + index
      }
    }, [_c('image', {
      staticClass: "slide-image",
      attrs: {
        "src": item.image_src
      }
    })])], 1)
  })), _vm._v(" "), _c('view', {
    staticClass: "categories"
  }, _vm._l((_vm.category), function(item, index) {
    return _c('view', {
      key: index,
      staticClass: "category-item"
    }, [_c('img', {
      attrs: {
        "src": item.image_src
      }
    })])
  })), _vm._v(" "), _vm._l((_vm.floorData), function(item, index) {
    return _c('view', {
      key: index
    }, [_c('floor', {
      attrs: {
        "floor": item,
        "mpcomid": '1_' + index
      }
    })], 1)
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('view', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShowGoToTop),
      expression: "isShowGoToTop"
    }],
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.goToTop
    }
  }, [_vm._m(1)])], 2)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "end-tips"
  }, [_c('view', {
    staticClass: "iconfont icon-xiao"
  }), _vm._v(" "), _c('text', {
    staticClass: "bottomline"
  }, [_vm._v("我是有底线的")])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "to-top"
  }, [_c('image', {
    attrs: {
      "src": "/static/img/arrow_top@2x.png"
    }
  }), _vm._v(" "), _c('text', [_vm._v("顶部")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6aa7df82", esExports)
  }
}

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_floor_vue__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_20829188_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_floor_vue__ = __webpack_require__(190);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(189)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-20829188"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_floor_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_20829188_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_floor_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\floor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] floor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20829188", Component.options)
  } else {
    hotAPI.reload("data-v-20829188", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: ["floor"],
  data: function data() {
    return {
      floordata: []
    };
  },

  //   过滤之后返回一个新数组
  computed: {
    getLast4: function getLast4() {
      return this.floor.product_list.filter(function (ele, i) {
        return i > 0;
      });
    }
  }

});

/***/ }),

/***/ 189:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "floor"
  }, [_c('view', {
    staticClass: "floor-head"
  }, [_c('img', {
    attrs: {
      "src": _vm.floor.floor_title.image_src,
      "alt": ""
    }
  })]), _vm._v(" "), _c('view', {
    staticClass: "floor-body"
  }, [_c('view', {
    staticClass: "floor-body-left"
  }, [_c('img', {
    attrs: {
      "src": _vm.floor.product_list[0].image_src
    }
  })]), _vm._v(" "), _c('view', {
    staticClass: "floor-body-right"
  }, _vm._l((_vm.getLast4), function(item, index) {
    return _c('view', {
      key: index
    }, [_c('img', {
      style: ({
        width: item.image_width + 'rpx'
      }),
      attrs: {
        "src": item.image_src
      }
    })])
  }))])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-20829188", esExports)
  }
}

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(9);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_6aa7df82_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(174);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(173)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6aa7df82"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_6aa7df82_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\home\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6aa7df82", Component.options)
  } else {
    hotAPI.reload("data-v-6aa7df82", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[8]);