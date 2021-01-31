"use strict";
cc._RF.push(module, 'c8c61Prvh5FGpdWomk15G11', 'TweenManager');
// Script/TweenManager.js

"use strict";

//-------------------------------------------class for Tween Manager-------------------------//
var TweenClass = cc.Class({
  name: "TweenManager",
  "extends": cc.Component,
  properties: {
    isSplashTween: {
      displayName: "SplashTween",
      "default": false,
      type: cc["boolean"],
      serializable: true,
      tooltip: "Boolean to identify if this tween is related to splash screen"
    },
    isGamplayTween: {
      displayName: "GamplayTween",
      "default": false,
      type: cc["boolean"],
      serializable: true,
      tooltip: "Boolean to identify if this tween is related to Gamplay screen"
    },
    isLoginTween: {
      displayName: "LoginTween",
      "default": false,
      type: cc["boolean"],
      serializable: true,
      tooltip: "Boolean to identify if this tween is related to Login screen"
    }
  },
  start: function start() {},
  onLoad: function onLoad() {
    if (this.isSplashTween == true) {
      this.SceneLoaded = false;
      cc.director.preloadScene("MainMenu", function () {
        cc.log("Next scene MainMenu preloaded");
      }); // var progress = 0;
      //   cc.director.preloadScene(
      //     "MainMenu",
      //     (completedCount, totalCount, item) => {
      //       progress = completedCount / totalCount;
      //     },
      //     (error, asset) => {
      //       this.SceneLoaded = true;
      //       console.log("scene loaded");
      //       //do something after preloaded scene
      //     }
      //   );
    }

    if (this.isSplashTween == true) this.TweenSplash(this.node);else if (this.isGamplayTween == true || this.isLoginTween == true) this.FadeNodeInOut(this.node, 1.5, 0, 255, "quadInOut");
  },
  TweenSplash: function TweenSplash(Node) {
    var _this = this;

    Node.opacity = 0;
    cc.tween(Node).to(1.5, {
      opacity: 255
    }, {
      easing: "quadInOut"
    }).call(function () {
      _this.LoadScene();
    }).start();
  },
  TweenSplashFadeOut: function TweenSplashFadeOut(Node) {
    Node.opacity = 255;
    cc.tween(Node).to(0.9, {
      opacity: 0
    }, {
      easing: "quadInOut"
    }).call(function () {
      cc.director.loadScene("MainMenu");
    }).start();
  },
  LoadScene: function LoadScene() {
    var _this2 = this;

    if (this.SceneLoaded) {
      this.TweenSplashFadeOut(this.node);
    } else {
      setTimeout(function () {
        _this2.SceneLoaded = true;

        _this2.LoadScene();
      }, 1500);
    }
  },
  LoginScreenTween: function LoginScreenTween(Node, FromPos) {
    Node.setPosition(0, FromPos);
    cc.tween(Node).to(1, {
      position: cc.v2(0, 0)
    }, {
      easing: "quadInOut"
    }).call(function () {}).start();
  },
  RepeatTweenScale: function RepeatTweenScale(Node, FromScale, ToScale, time) {
    cc.tween(Node).repeatForever(cc.tween().to(time, {
      scale: FromScale
    }, {
      easing: "quadInOut"
    }).to(time, {
      scale: ToScale
    }, {
      easing: "quadInOut"
    }).call(function () {})).start();
  },
  FadeNodeInOut: function FadeNodeInOut(Node, time, InitialOp, FinalOp, EaseType) {
    Node.opacity = InitialOp;
    cc.tween(Node).to(time, {
      opacity: FinalOp
    }, {
      easing: EaseType
    }).call(function () {}).start();
  }
});
module.exports = TweenClass;

cc._RF.pop();