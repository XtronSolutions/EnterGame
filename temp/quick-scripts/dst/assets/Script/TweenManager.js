
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/TweenManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxUd2Vlbk1hbmFnZXIuanMiXSwibmFtZXMiOlsiVHdlZW5DbGFzcyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImlzU3BsYXNoVHdlZW4iLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiaXNHYW1wbGF5VHdlZW4iLCJpc0xvZ2luVHdlZW4iLCJzdGFydCIsIm9uTG9hZCIsIlNjZW5lTG9hZGVkIiwiZGlyZWN0b3IiLCJwcmVsb2FkU2NlbmUiLCJsb2ciLCJUd2VlblNwbGFzaCIsIm5vZGUiLCJGYWRlTm9kZUluT3V0IiwiTm9kZSIsIm9wYWNpdHkiLCJ0d2VlbiIsInRvIiwiZWFzaW5nIiwiY2FsbCIsIkxvYWRTY2VuZSIsIlR3ZWVuU3BsYXNoRmFkZU91dCIsImxvYWRTY2VuZSIsInNldFRpbWVvdXQiLCJMb2dpblNjcmVlblR3ZWVuIiwiRnJvbVBvcyIsInNldFBvc2l0aW9uIiwicG9zaXRpb24iLCJ2MiIsIlJlcGVhdFR3ZWVuU2NhbGUiLCJGcm9tU2NhbGUiLCJUb1NjYWxlIiwidGltZSIsInJlcGVhdEZvcmV2ZXIiLCJzY2FsZSIsIkluaXRpYWxPcCIsIkZpbmFsT3AiLCJFYXNlVHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJQSxVQUFVLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsY0FEa0I7QUFFeEIsYUFBU0YsRUFBRSxDQUFDRyxTQUZZO0FBSXhCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsYUFBYSxFQUFFO0FBQ2JDLE1BQUFBLFdBQVcsRUFBRSxhQURBO0FBRWIsaUJBQVMsS0FGSTtBQUdiQyxNQUFBQSxJQUFJLEVBQUVQLEVBQUUsV0FISztBQUliUSxNQUFBQSxZQUFZLEVBQUUsSUFKRDtBQUtiQyxNQUFB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dUIsS0FBSCxDQUFTRixJQUFULEVBQ0dHLEVBREgsQ0FDTWUsSUFETixFQUNZO0FBQUVqQixNQUFBQSxPQUFPLEVBQUVxQjtBQUFYLEtBRFosRUFDa0M7QUFBRWxCLE1BQUFBLE1BQU0sRUFBRW1CO0FBQVYsS0FEbEMsRUFFR2xCLElBRkgsQ0FFUSxZQUFNLENBQUUsQ0FGaEIsRUFHR2QsS0FISDtBQUlEO0FBOUd1QixDQUFULENBQWpCO0FBZ0hBaUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCL0MsVUFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBUd2VlbiBNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBUd2VlbkNsYXNzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVHdlZW5NYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBpc1NwbGFzaFR3ZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNwbGFzaFR3ZWVuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5ib29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQm9vbGVhbiB0byBpZGVudGlmeSBpZiB0aGlzIHR3ZWVuIGlzIHJlbGF0ZWQgdG8gc3BsYXNoIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIGlzR2FtcGxheVR3ZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdhbXBsYXlUd2VlblwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkJvb2xlYW4gdG8gaWRlbnRpZnkgaWYgdGhpcyB0d2VlbiBpcyByZWxhdGVkIHRvIEdhbXBsYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgaXNMb2dpblR3ZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvZ2luVHdlZW5cIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLmJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJCb29sZWFuIHRvIGlkZW50aWZ5IGlmIHRoaXMgdHdlZW4gaXMgcmVsYXRlZCB0byBMb2dpbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgc3RhcnQoKSB7fSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgaWYgKHRoaXMuaXNTcGxhc2hUd2VlbiA9PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuU2NlbmVMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKFwiTWFpbk1lbnVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmxvZyhcIk5leHQgc2NlbmUgTWFpbk1lbnUgcHJlbG9hZGVkXCIpO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gdmFyIHByb2dyZXNzID0gMDtcclxuICAgICAgLy8gICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoXHJcbiAgICAgIC8vICAgICBcIk1haW5NZW51XCIsXHJcbiAgICAgIC8vICAgICAoY29tcGxldGVkQ291bnQsIHRvdGFsQ291bnQsIGl0ZW0pID0+IHtcclxuICAgICAgLy8gICAgICAgcHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XHJcbiAgICAgIC8vICAgICB9LFxyXG4gICAgICAvLyAgICAgKGVycm9yLCBhc3NldCkgPT4ge1xyXG4gICAgICAvLyAgICAgICB0aGlzLlNjZW5lTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgLy8gICAgICAgY29uc29sZS5sb2coXCJzY2VuZSBsb2FkZWRcIik7XHJcbiAgICAgIC8vICAgICAgIC8vZG8gc29tZXRoaW5nIGFmdGVyIHByZWxvYWRlZCBzY2VuZVxyXG4gICAgICAvLyAgICAgfVxyXG4gICAgICAvLyAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNTcGxhc2hUd2VlbiA9PSB0cnVlKSB0aGlzLlR3ZWVuU3BsYXNoKHRoaXMubm9kZSk7XHJcbiAgICBlbHNlIGlmICh0aGlzLmlzR2FtcGxheVR3ZWVuID09IHRydWUgfHwgdGhpcy5pc0xvZ2luVHdlZW4gPT0gdHJ1ZSkgdGhpcy5GYWRlTm9kZUluT3V0KHRoaXMubm9kZSwgMS41LCAwLCAyNTUsIFwicXVhZEluT3V0XCIpO1xyXG4gIH0sXHJcblxyXG4gIFR3ZWVuU3BsYXNoOiBmdW5jdGlvbiAoTm9kZSkge1xyXG4gICAgTm9kZS5vcGFjaXR5ID0gMDtcclxuICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgIC50bygxLjUsIHsgb3BhY2l0eTogMjU1IH0sIHsgZWFzaW5nOiBcInF1YWRJbk91dFwiIH0pXHJcbiAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICB0aGlzLkxvYWRTY2VuZSgpO1xyXG4gICAgICB9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICBUd2VlblNwbGFzaEZhZGVPdXQ6IGZ1bmN0aW9uIChOb2RlKSB7XHJcbiAgICBOb2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICBjYy50d2VlbihOb2RlKVxyXG4gICAgICAudG8oMC45LCB7IG9wYWNpdHk6IDAgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgICB9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9LFxyXG4gIExvYWRTY2VuZSgpIHtcclxuICAgIGlmICh0aGlzLlNjZW5lTG9hZGVkKSB7XHJcbiAgICAgIHRoaXMuVHdlZW5TcGxhc2hGYWRlT3V0KHRoaXMubm9kZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlNjZW5lTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkxvYWRTY2VuZSgpO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBMb2dpblNjcmVlblR3ZWVuOiBmdW5jdGlvbiAoTm9kZSwgRnJvbVBvcykge1xyXG4gICAgTm9kZS5zZXRQb3NpdGlvbigwLCBGcm9tUG9zKTtcclxuICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgIC50bygxLCB7IHBvc2l0aW9uOiBjYy52MigwLCAwKSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7fSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgUmVwZWF0VHdlZW5TY2FsZTogZnVuY3Rpb24gKE5vZGUsIEZyb21TY2FsZSwgVG9TY2FsZSwgdGltZSkge1xyXG4gICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgY2NcclxuICAgICAgICAgIC50d2VlbigpXHJcbiAgICAgICAgICAudG8odGltZSwgeyBzY2FsZTogRnJvbVNjYWxlIH0sIHsgZWFzaW5nOiBcInF1YWRJbk91dFwiIH0pXHJcbiAgICAgICAgICAudG8odGltZSwgeyBzY2FsZTogVG9TY2FsZSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAgICAgLmNhbGwoKCkgPT4ge30pXHJcbiAgICAgIClcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgRmFkZU5vZGVJbk91dDogZnVuY3Rpb24gKE5vZGUsIHRpbWUsIEluaXRpYWxPcCwgRmluYWxPcCwgRWFzZVR5cGUpIHtcclxuICAgIE5vZGUub3BhY2l0eSA9IEluaXRpYWxPcDtcclxuICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgIC50byh0aW1lLCB7IG9wYWNpdHk6IEZpbmFsT3AgfSwgeyBlYXNpbmc6IEVhc2VUeXBlIH0pXHJcbiAgICAgIC5jYWxsKCgpID0+IHt9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9LFxyXG59KTtcclxubW9kdWxlLmV4cG9ydHMgPSBUd2VlbkNsYXNzO1xyXG4iXX0=