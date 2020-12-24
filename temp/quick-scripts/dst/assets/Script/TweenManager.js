
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
    if (this.isSplashTween == true) this.TweenSplash(this.node);else if (this.isGamplayTween == true || this.isLoginTween == true) this.FadeNodeInOut(this.node, 1.5, 0, 255, "quadInOut");
  },
  TweenSplash: function TweenSplash(Node) {
    Node.opacity = 0;
    cc.tween(Node).to(1.5, {
      opacity: 255
    }, {
      easing: "quadInOut"
    }).to(0.9, {
      opacity: 0
    }, {
      easing: "quadInOut"
    }).call(function () {
      cc.director.loadScene("MainMenu");
    }).start();
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
      easing: 'quadInOut'
    }).to(time, {
      scale: ToScale
    }, {
      easing: 'quadInOut'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxUd2Vlbk1hbmFnZXIuanMiXSwibmFtZXMiOlsiVHdlZW5DbGFzcyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImlzU3BsYXNoVHdlZW4iLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiaXNHYW1wbGF5VHdlZW4iLCJpc0xvZ2luVHdlZW4iLCJzdGFydCIsIm9uTG9hZCIsIlR3ZWVuU3BsYXNoIiwibm9kZSIsIkZhZGVOb2RlSW5PdXQiLCJOb2RlIiwib3BhY2l0eSIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJMb2dpblNjcmVlblR3ZWVuIiwiRnJvbVBvcyIsInNldFBvc2l0aW9uIiwicG9zaXRpb24iLCJ2MiIsIlJlcGVhdFR3ZWVuU2NhbGUiLCJGcm9tU2NhbGUiLCJUb1NjYWxlIiwidGltZSIsInJlcGVhdEZvcmV2ZXIiLCJzY2FsZSIsIkluaXRpYWxPcCIsIkZpbmFsT3AiLCJFYXNlVHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJQSxVQUFVLEdBQUVDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3JCQyxFQUFBQSxJQUFJLEVBQUUsY0FEZTtBQUVyQixhQUFTRixFQUFFLENBQUNHLFNBRlM7QUFJckJDLEVBQUFBLFVBQVUsRUFBRTtBQUNQQyxJQUFBQSxhQUFhLEVBQUU7QUFDWkMsTUFBQUEsV0FBVyxFQUFDLGFBREE7QUFFWixpQkFBUyxLQUZHO0FBR1pDLE1BQUFBLElBQUksRUFBRVAsRUFBRSxXQUhJO0FBSVpRLE1BQUFBLFlBQVksRUFBRSxJQUpGO0FBS1pDLE1BQUFBLE9BQU8sRUFBRTtBQUxHLEtBRFI7QUFPUEMsSUFBQUEsY0FBYyxFQUFFO0FBQ2JKLE1BQUFBLFdBQVcsRUFBQyxjQURDO0FBRWIsaUJBQVMs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OEJDLE9BQTlCLEVBQXNDQyxRQUF0QyxFQUFnRDtBQUMzRHJCLElBQUFBLElBQUksQ0FBQ0MsT0FBTCxHQUFha0IsU0FBYjtBQUNBcEMsSUFBQUEsRUFBRSxDQUFDbUIsS0FBSCxDQUFTRixJQUFULEVBQ0NHLEVBREQsQ0FDSWEsSUFESixFQUNVO0FBQUNmLE1BQUFBLE9BQU8sRUFBRW1CO0FBQVYsS0FEVixFQUM2QjtBQUFDaEIsTUFBQUEsTUFBTSxFQUFDaUI7QUFBUixLQUQ3QixFQUVDaEIsSUFGRCxDQUVNLFlBQU0sQ0FBRyxDQUZmLEVBR0NWLEtBSEQ7QUFJSDtBQXBFb0IsQ0FBVCxDQUFoQjtBQXNFQTJCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFnQnpDLFVBQWhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVHdlZW4gTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVHdlZW5DbGFzcz0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJUd2Vlbk1hbmFnZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgIGlzU3BsYXNoVHdlZW46IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTcGxhc2hUd2VlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIkJvb2xlYW4gdG8gaWRlbnRpZnkgaWYgdGhpcyB0d2VlbiBpcyByZWxhdGVkIHRvIHNwbGFzaCBzY3JlZW5cIix9LFxyXG4gICAgICAgICBpc0dhbXBsYXlUd2Vlbjoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkdhbXBsYXlUd2VlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIkJvb2xlYW4gdG8gaWRlbnRpZnkgaWYgdGhpcyB0d2VlbiBpcyByZWxhdGVkIHRvIEdhbXBsYXkgc2NyZWVuXCIsfSxcclxuICAgICAgICAgaXNMb2dpblR3ZWVuOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9naW5Ud2VlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdHlwZTogY2MuYm9vbGVhbixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIkJvb2xlYW4gdG8gaWRlbnRpZnkgaWYgdGhpcyB0d2VlbiBpcyByZWxhdGVkIHRvIExvZ2luIHNjcmVlblwiLH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge30sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGlmKHRoaXMuaXNTcGxhc2hUd2Vlbj09dHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5Ud2VlblNwbGFzaCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIGVsc2UgaWYodGhpcy5pc0dhbXBsYXlUd2Vlbj09dHJ1ZSB8fCB0aGlzLmlzTG9naW5Ud2Vlbj09dHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5GYWRlTm9kZUluT3V0KHRoaXMubm9kZSwxLjUsMCwyNTUsXCJxdWFkSW5PdXRcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuU3BsYXNoOiBmdW5jdGlvbiAoTm9kZSkge1xyXG4gICAgICAgIE5vZGUub3BhY2l0eT0wO1xyXG4gICAgICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgICAgLnRvKDEuNSwge29wYWNpdHk6IDI1NX0se2Vhc2luZzpcInF1YWRJbk91dFwifSlcclxuICAgICAgICAudG8oMC45LCB7b3BhY2l0eTogMH0se2Vhc2luZzpcInF1YWRJbk91dFwifSlcclxuICAgICAgICAuY2FsbCgoKSA9PiB7Y2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpbk1lbnVcIik7fSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgTG9naW5TY3JlZW5Ud2VlbjogZnVuY3Rpb24gKE5vZGUsRnJvbVBvcykge1xyXG4gICAgICAgIE5vZGUuc2V0UG9zaXRpb24oMCwgRnJvbVBvcyk7XHJcbiAgICAgICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgICAudG8oMSwgeyBwb3NpdGlvbjogY2MudjIoMCwgMCl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge30pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlcGVhdFR3ZWVuU2NhbGU6IGZ1bmN0aW9uIChOb2RlLEZyb21TY2FsZSxUb1NjYWxlLHRpbWUpIHtcclxuICAgICAgICBjYy50d2VlbihOb2RlKVxyXG4gICAgICAgIC5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICBjYy50d2VlbigpXHJcbiAgICAgICAgICAgIC50byh0aW1lLCB7IHNjYWxlOiBGcm9tU2NhbGUgfSwgeyBlYXNpbmc6ICdxdWFkSW5PdXQnfSlcclxuICAgICAgICAgICAgLnRvKHRpbWUsIHsgc2NhbGU6IFRvU2NhbGUgfSwgeyBlYXNpbmc6ICdxdWFkSW5PdXQnfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge30pXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBGYWRlTm9kZUluT3V0OiBmdW5jdGlvbiAoTm9kZSx0aW1lLEluaXRpYWxPcCxGaW5hbE9wLEVhc2VUeXBlKSB7XHJcbiAgICAgICAgTm9kZS5vcGFjaXR5PUluaXRpYWxPcDtcclxuICAgICAgICBjYy50d2VlbihOb2RlKVxyXG4gICAgICAgIC50byh0aW1lLCB7b3BhY2l0eTogRmluYWxPcH0se2Vhc2luZzpFYXNlVHlwZX0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4geyB9KSAgICAgIFxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxufSk7XHJcbm1vZHVsZS5leHBvcnRzPSBUd2VlbkNsYXNzO1xyXG5cclxuIl19