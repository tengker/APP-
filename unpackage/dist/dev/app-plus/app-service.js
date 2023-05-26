if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$b = {
    data() {
      return {
        title: ""
      };
    },
    onLoad() {
    },
    methods: {
      camera: function() {
        uni.chooseImage({
          count: 1,
          //默认9
          sizeType: ["original", "compressed"],
          //可以指定是原图还是压缩图，默认二者都有
          success: function(res) {
            uni.uploadFile(
              {
                url: "http://10.69.5.97:8080/deal",
                filePath: res.tempFilePaths[0],
                formData: {
                  token: uni.getStorageSync("token")
                },
                name: "file",
                success() {
                  formatAppLog("log", "at pages/tabbar/home/home.vue:53", "success");
                },
                fail(err) {
                  formatAppLog("log", "at pages/tabbar/home/home.vue:56", err);
                }
              }
            );
            uni.showToast({
              title: "识别中",
              duration: 2e4
            });
            setTimeout(function() {
              uni.navigateTo({
                url: "/pages/tabbar/ocrResult/ocrResult"
              });
            }, 2e4);
          }
        });
      },
      open: function() {
        uni.showActionSheet({
          itemList: ["转为梵高风", "转为水墨风", "转为动漫风"],
          success(res) {
            let choice = res.tapIndex;
            uni.chooseImage({
              count: 1,
              sizeType: ["original", "compressed"],
              success(res2) {
                uni.uploadFile(
                  {
                    url: "http://10.69.5.97:8080/style",
                    filePath: res2.tempFilePaths[0],
                    formData: {
                      token: uni.getStorageSync("token"),
                      choice
                    },
                    name: "file",
                    success(res3) {
                      uni.showToast({
                        title: "处理中",
                        icon: "loading",
                        duration: 2e4
                      });
                      setTimeout(function() {
                        uni.navigateTo({
                          url: "/pages/tabbar/styleChange/styleChange"
                        });
                      }, 2e4);
                    },
                    fail(err) {
                      formatAppLog("log", "at pages/tabbar/home/home.vue:104", err);
                    }
                  }
                );
              }
            });
          }
        });
      },
      baseColor: function() {
        uni.showActionSheet({
          itemList: ["转为蓝底", "转为红底", "转为白底"],
          success(res) {
            let choice = res.tapIndex;
            uni.chooseImage({
              count: 1,
              sizeType: ["original", "compressed"],
              success(res2) {
                uni.uploadFile(
                  {
                    url: "http://10.69.5.97:8080/baseColor",
                    filePath: res2.tempFilePaths[0],
                    formData: {
                      token: uni.getStorageSync("token"),
                      choice
                    },
                    name: "file",
                    success(res3) {
                      uni.showToast({
                        title: "处理中",
                        icon: "loading",
                        duration: 3e4
                      });
                      setTimeout(function() {
                        uni.navigateTo({
                          url: "/pages/tabbar/changColor/changColor"
                        });
                      }, 3e4);
                    },
                    fail(err) {
                      formatAppLog("log", "at pages/tabbar/home/home.vue:143", err);
                    }
                  }
                );
              }
            });
          }
        });
      },
      oldToNew: function() {
        uni.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"],
          success(res) {
            uni.uploadFile(
              {
                url: "http://10.69.5.97:8080/animal",
                filePath: res.tempFilePaths[0],
                formData: {
                  token: uni.getStorageSync("token"),
                  temp: ""
                },
                name: "file",
                success(res2) {
                  uni.showToast({
                    title: "处理中",
                    icon: "loading",
                    duration: 2e4
                  });
                  setTimeout(function() {
                    uni.navigateTo({
                      url: "/pages/tabbar/showResult/showResult"
                    });
                  }, 2e4);
                }
              }
            );
          }
        });
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", { class: "flex diygw-col-24 swiper-clz" }, [
        vue.createElementVNode("swiper", {
          class: "swiper",
          "indicator-dots": "true",
          autoplay: "true",
          interval: "3000",
          circular: "true",
          style: { "height": "150px" }
        }, [
          vue.createElementVNode("swiper-item", null, [
            vue.createElementVNode("image", {
              src: "/static/img/tabbar/ocr.png",
              class: "slide-image",
              mode: "scaleToFill"
            }),
            vue.createElementVNode("view", { class: "swiper-slider-title" }, " 滑块一 ")
          ]),
          vue.createElementVNode("swiper-item", null, [
            vue.createElementVNode("image", {
              src: "/static/img/tabbar/super.png",
              class: "slide-image",
              mode: "scaleToFill"
            }),
            vue.createElementVNode("view", { class: "swiper-slider-title" }, " 滑块二 ")
          ]),
          vue.createElementVNode("swiper-item", null, [
            vue.createElementVNode("image", {
              src: "/static/img/tabbar/more.png",
              class: "slide-image",
              mode: "scaleToFill"
            }),
            vue.createElementVNode("view", { class: "swiper-slider-title" }, " 滑块三 ")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "function" }, [
        vue.createElementVNode("button", {
          class: "button",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.camera && $options.camera(...args))
        }, "中文文字识别"),
        vue.createElementVNode("button", {
          class: "button",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.open && $options.open(...args))
        }, "图像风格转换")
      ]),
      vue.createElementVNode("view", { class: "function2" }, [
        vue.createElementVNode("button", {
          class: "button",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.baseColor && $options.baseColor(...args))
        }, "证件照换底色"),
        vue.createCommentVNode(' <button class="button" @click="oldToNew">识别动物</button> ')
      ])
    ]);
  }
  const PagesTabbarHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__file", "C:/Users/liujiateng/Desktop/app2/MyApp3/pages/tabbar/home/home.vue"]]);
  const _sfc_main$a = {
    data() {
      return {
        text: ""
      };
    },
    onLoad(opinion) {
      const that = this;
      that.text = opinion.text;
    },
    methods: {}
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("text", {
        selectable: "true",
        textContent: vue.toDisplayString($data.text)
      }, null, 8, ["textContent"])
    ]);
  }
  const PagesTabbarShowTextShowText = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "C:/Users/liujiateng/Desktop/app2/MyApp3/pages/tabbar/showText/showText.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {
        temp: "",
        text: ""
      };
    },
    methods: {
      save: function() {
        let base = this.temp;
        const bitmap = new plus.nativeObj.Bitmap("test");
        bitmap.loadBase64Data(base, function() {
          const url = "_doc/" + new Date() + ".png";
          bitmap.save(url, function() {
            formatAppLog("log", "at pages/tabbar/ocrResult/ocrResult.vue:28", "success");
            bitmap.clear();
          }, function(e) {
            onsole.log("保存图片失败：" + JSON.stringify(e));
            bitmap.clear();
          });
        });
      },
      textResult: function() {
        uni.navigateTo({
          url: "/pages/tabbar/showText/showText?text=" + this.text
        });
      }
    },
    onLoad() {
      let that = this;
      uni.request({
        url: "http://10.69.5.97:8080/download",
        data: {
          token: uni.getStorageSync("token")
        },
        success(res) {
          formatAppLog("log", "at pages/tabbar/ocrResult/ocrResult.vue:50", res.data.text);
          that.temp = "data:image/png;base64," + res.data.image;
          that.text = res.data.text;
        }
      });
    },
    onShow() {
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("div", { class: "img" }, [
        vue.createElementVNode("image", {
          src: $data.temp.replace(/[\r\n]/g, ""),
          class: "image",
          mode: "aspectFill"
        }, null, 8, ["src"])
      ]),
      vue.createElementVNode("div", { class: "button" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.save && $options.save(...args))
        }, "保存图片"),
        vue.createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => $options.textResult && $options.textResult(...args))
        }, "查看文字结果")
      ])
    ]);
  }
  const PagesTabbarOcrResultOcrResult = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "C:/Users/liujiateng/Desktop/app2/MyApp3/pages/tabbar/ocrResult/ocrResult.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
        temp: ""
      };
    },
    onLoad(opinion) {
      const that = this;
      uni.request({
        url: "http://10.69.5.97:8080/color",
        data: {
          token: uni.getStorageSync("token")
        },
        success(res) {
          uni.showToast({
            title: "加载结果中",
            icon: "loading",
            duration: 4e3
          });
          formatAppLog("log", "at pages/tabbar/changColor/changColor.vue:32", res.data);
          that.temp = "data:image/png;base64," + res.data.image;
        }
      });
    },
    methods: {
      save: function() {
        let base = this.temp.replace("data:image/png;base64,", "");
        const bitmap = new plus.nativeObj.Bitmap("test");
        bitmap.loadBase64Data(base, function() {
          const url = "_doc/" + new Date() + ".png";
          bitmap.save(url, function() {
            bitmap.clear();
          });
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("div", { class: "img" }, [
        vue.createElementVNode("image", {
          src: $data.temp.replace(/[\r\n]/g, ""),
          class: "image",
          mode: "aspectFit"
        }, null, 8, ["src"])
      ]),
      vue.createElementVNode("div", { class: "button" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.save && $options.save(...args))
        }, "保存图片")
      ])
    ]);
  }
  const PagesTabbarChangColorChangColor = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "C:/Users/liujiateng/Desktop/app2/MyApp3/pages/tabbar/changColor/changColor.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {
      login: function() {
        uni.navigateTo({
          url: "/pages/tabbar/login/login"
        });
      },
      alert: function() {
        uni.showToast({
          title: "请联系qq2207665342",
          icon: "none",
          duration: 3e3
        });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", { class: "head_login" }, [
        vue.createElementVNode("image", {
          class: "image",
          src: "/static/img/tabbar/me.png",
          mode: "aspectFit"
        }),
        vue.createElementVNode("text", {
          class: "text",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.login && $options.login(...args))
        }, "立即登录")
      ]),
      vue.createElementVNode("view", { class: "body" }, [
        vue.createElementVNode("button", {
          class: "button",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.alert && $options.alert(...args))
        }, "联系客服"),
        vue.createElementVNode("button", { class: "button" }, "设置")
      ])
    ]);
  }
  const PagesTabbarMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "C:/Users/liujiateng/Desktop/app2/MyApp3/pages/tabbar/mine/mine.vue"]]);
  const _sfc_main$6 = {
    data() {
      return {
        account: "",
        password: ""
      };
    },
    onLoad() {
    },
    methods: {
      onInput(e) {
        this.account = e.detail.value;
      },
      passwordInput(e) {
        this.password = e.detail.value;
      },
      login: function() {
        uni.request({
          url: "http://10.69.5.97:8080/login",
          method: "POST",
          data: {
            text: "login",
            account: this.account,
            password: this.password
          },
          success(res) {
            formatAppLog("log", "at pages/tabbar/login/login.vue:51", res.data);
            if (res.data.code == 1) {
              uni.setStorageSync("token", res.data.token);
              uni.showToast({
                title: "登陆中",
                icon: "loading",
                duration: 1e3
              });
              setTimeout(function() {
                uni.navigateTo({
                  url: "/pages/tabbar/successLogin/successLogin"
                });
              }, 1e3);
            } else {
              uni.showToast({
                title: "账号或密码错误",
                icon: "error",
                duration: 2e3
              });
            }
          }
        });
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", { class: "form" }, [
        vue.createElementVNode("view", { class: "inputWrapper" }, [
          vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "text",
              value: "",
              onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
              placeholder: "请输入帐号"
            },
            null,
            32
            /* HYDRATE_EVENTS */
          )
        ]),
        vue.createElementVNode("view", { class: "inputWrapper" }, [
          vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "password",
              value: "",
              onInput: _cache[1] || (_cache[1] = (...args) => $options.passwordInput && $options.passwordInput(...args)),
              placeholder: "请输入密码"
            },
            null,
            32
            /* HYDRATE_EVENTS */
          )
        ]),
        vue.createElementVNode("view", { class: "loginBtn" }, [
          vue.createElementVNode("text", {
            class: "btnValue",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.login && $options.login(...args))
          }, "登录")
        ])
      ]),
      vue.createElementVNode("view", { class: "forgotBtn" }, [
        vue.createElementVNode("navigator", { url: "../register/register" }, [
          vue.createElementVNode("text", null, "- 注册 -")
        ])
      ])
    ]);
  }
  const PagesTabbarLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "C:/Users/liujiateng/Desktop/app2/MyApp3/pages/tabbar/login/login.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {
        account: "",
        password: "",
        captcha: ""
      };
    },
    onLoad() {
    },
    methods: {
      onInput(e) {
        this.account = e.detail.value;
      },
      passwordInput(e) {
        this.password = e.detail.value;
      },
      captchaInput(e) {
        this.captcha = e.detail.value;
      },
      sendSms: function() {
        uni.request({
          url: "http://10.69.5.97:8080/login",
          data: {
            text: "sendSms",
            account: this.account
          },
          method: "POST"
        });
      },
      register: function() {
        uni.request({
          url: "http://10.69.5.97:8080/login",
          data: {
            text: "register",
            account: this.account,
            password: this.password,
            captcha: this.captcha
          },
          method: "POST",
          success(res) {
            if (res.data.code == "ok") {
              uni.showToast({
                title: "注册成功，五秒后跳转至登陆界面",
                icon: "success",
                duration: 5e3
              });
              setTimeout(function() {
                uni.navigateTo({
                  url: "/pages/tabbar/login/login"
                });
              }, 5e3);
            } else {
              uni.showToast({
                title: "验证码错误",
                icon: "error",
                duration: 2e3
              });
            }
          }
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("h1", { class: "title" }, "注册"),
      vue.createElementVNode("view", { class: "form" }, [
        vue.createElementVNode("view", { class: "inputWrapper" }, [
          vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "text",
              value: "",
              onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
              placeholder: "请输入手机号"
            },
            null,
            32
            /* HYDRATE_EVENTS */
          )
        ]),
        vue.createElementVNode("view", { class: "inputWrapperOfTwo" }, [
          vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "text",
              value: "",
              onInput: _cache[1] || (_cache[1] = (...args) => $options.captchaInput && $options.captchaInput(...args)),
              placeholder: "请输入验证码"
            },
            null,
            32
            /* HYDRATE_EVENTS */
          ),
          vue.createElementVNode("button", {
            class: "button",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.sendSms && $options.sendSms(...args))
          }, "发送验证码")
        ]),
        vue.createElementVNode("view", { class: "inputWrapper" }, [
          vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "password",
              value: "",
              onInput: _cache[3] || (_cache[3] = (...args) => $options.passwordInput && $options.passwordInput(...args)),
              placeholder: "请输入密码"
            },
            null,
            32
            /* HYDRATE_EVENTS */
          )
        ]),
        vue.createElementVNode("view", { class: "loginBtn" }, [
          vue.createElementVNode("text", {
            class: "btnValue",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.register && $options.register(...args))
          }, "注册")
        ])
      ])
    ]);
  }
  const PagesTabbarRegisterRegister = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "C:/Users/liujiateng/Desktop/app2/MyApp3/pages/tabbar/register/register.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        nickname: "",
        temp: ""
      };
    },
    onLoad() {
      const that = this;
      uni.request({
        url: "http://10.69.5.97:8080/login",
        data: {
          text: "show",
          token: uni.getStorageSync("token")
        },
        method: "POST",
        success(res) {
          that.temp = "data:image/png;base64," + res.data.avatar;
          that.nickname = res.data.nickname;
        }
      });
      formatAppLog("log", "at pages/tabbar/successLogin/successLogin.vue:36", this.nickname);
    },
    methods: {}
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("view", { class: "head_login" }, [
        vue.createElementVNode("image", {
          src: $data.temp.replace(/[\r\n]/g, ""),
          class: "image",
          mode: "aspectFill"
        }, null, 8, ["src"]),
        vue.createElementVNode(
          "text",
          { class: "text" },
          vue.toDisplayString($data.nickname),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "body" }, [
        vue.createElementVNode("button", { class: "button" }, "联系客服"),
        vue.createElementVNode("button", { class: "button" }, "设置")
      ])
    ]);
  }
  const PagesTabbarSuccessLoginSuccessLogin = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "C:/Users/liujiateng/Desktop/app2/MyApp3/pages/tabbar/successLogin/successLogin.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        temp: ""
      };
    },
    onLoad(opinion) {
      const that = this;
      uni.request({
        url: "http://10.69.5.97:8080/styledownload",
        data: {
          token: uni.getStorageSync("token")
        },
        success(res) {
          formatAppLog("log", "at pages/tabbar/styleChange/styleChange.vue:27", "success");
          that.temp = "data:image/png;base64," + res.data.image;
        }
      });
    },
    methods: {
      save: function() {
        let base = this.temp.replace("data:image/png;base64,", "");
        const bitmap = new plus.nativeObj.Bitmap("test");
        bitmap.loadBase64Data(base, function() {
          const url = "_doc/" + new Date() + ".png";
          bitmap.save(url, function() {
            bitmap.clear();
          });
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("div", { class: "img" }, [
        vue.createElementVNode("image", {
          src: $data.temp.replace(/[\r\n]/g, ""),
          class: "image",
          mode: "aspectFit"
        }, null, 8, ["src"])
      ]),
      vue.createElementVNode("div", { class: "button" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.save && $options.save(...args))
        }, "保存图片")
      ])
    ]);
  }
  const PagesTabbarStyleChangeStyleChange = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "C:/Users/liujiateng/Desktop/app2/MyApp3/pages/tabbar/styleChange/styleChange.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        temp: ""
      };
    },
    onLoad(opinion) {
      const that = this;
      uni.request({
        url: "http://10.69.5.97:8080/oldToNewDownload",
        data: {
          token: uni.getStorageSync("token")
        },
        success(res) {
          formatAppLog("log", "at pages/tabbar/oldToNew/oldToNew.vue:27", "success");
          that.temp = "data:image/png;base64," + res.data.image;
        }
      });
    },
    methods: {
      save: function() {
        let base = this.temp.replace("data:image/png;base64,", "");
        const bitmap = new plus.nativeObj.Bitmap("test");
        bitmap.loadBase64Data(base, function() {
          const url = "_doc/" + new Date() + ".png";
          bitmap.save(url, function() {
            bitmap.clear();
          });
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("div", { class: "img" }, [
        vue.createElementVNode("image", {
          src: $data.temp.replace(/[\r\n]/g, ""),
          class: "image",
          mode: "aspectFit"
        }, null, 8, ["src"])
      ]),
      vue.createElementVNode("div", { class: "button" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.save && $options.save(...args))
        }, "保存图片")
      ])
    ]);
  }
  const PagesTabbarOldToNewOldToNew = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "C:/Users/liujiateng/Desktop/app2/MyApp3/pages/tabbar/oldToNew/oldToNew.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        text: ""
      };
    },
    onLoad(opinion) {
      const that = this;
      uni.request({
        url: "http://10.69.5.97:8080/animalDownload",
        data: {
          token: uni.getStorageSync("token")
        },
        success(res) {
          that.text = res.data.result;
        }
      });
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("text", {
        selectable: "true",
        textContent: vue.toDisplayString($data.text)
      }, null, 8, ["textContent"])
    ]);
  }
  const PagesTabbarShowResultShowResult = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/Users/liujiateng/Desktop/app2/MyApp3/pages/tabbar/showResult/showResult.vue"]]);
  __definePage("pages/tabbar/home/home", PagesTabbarHomeHome);
  __definePage("pages/tabbar/showText/showText", PagesTabbarShowTextShowText);
  __definePage("pages/tabbar/ocrResult/ocrResult", PagesTabbarOcrResultOcrResult);
  __definePage("pages/tabbar/changColor/changColor", PagesTabbarChangColorChangColor);
  __definePage("pages/tabbar/mine/mine", PagesTabbarMineMine);
  __definePage("pages/tabbar/login/login", PagesTabbarLoginLogin);
  __definePage("pages/tabbar/register/register", PagesTabbarRegisterRegister);
  __definePage("pages/tabbar/successLogin/successLogin", PagesTabbarSuccessLoginSuccessLogin);
  __definePage("pages/tabbar/styleChange/styleChange", PagesTabbarStyleChangeStyleChange);
  __definePage("pages/tabbar/oldToNew/oldToNew", PagesTabbarOldToNewOldToNew);
  __definePage("pages/tabbar/showResult/showResult", PagesTabbarShowResultShowResult);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
      setTimeout(() => {
        uni.showTabBarRedDot({
          index: 3
        });
      }, 1e3);
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:13", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:16", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/liujiateng/Desktop/app2/MyApp3/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
