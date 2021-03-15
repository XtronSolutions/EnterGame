
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/StorageManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f5a14bMsD9JSZovKg9aBEdQ', 'StorageManager');
// Script/StorageManager.js

"use strict";

var GamePlayReferenceManager = null; //for web make: IsWeb=true
//for mobile make: IsWeb=false

var IsWeb = false;
var StorageManager = cc.Class({
  name: "StorageManager",
  "extends": cc.Component,
  properties: {
    Loader: {
      "default": null,
      type: cc.Node,
      serializable: true
    }
  },
  // LIFE-CYCLE CALLBACKS:
  update: function update() {// if (cc.sys.getNetworkType() == cc.sys.NetworkType.LAN || cc.sys.getNetworkType() == cc.sys.NetworkType.WWAN) {
    //   console.log("connected");
    // } else if (cc.sys.getNetworkType() == cc.sys.NetworkType.NONE) {
    //   console.log("not connected");
    // }
  },
  onLoad: function onLoad() {
    console.log("V15");

    if (IsWeb) {
      console.log = function () {};

      console.error = function () {};

      console.warn = function () {};

      console.info = function () {};

      console.trace = function () {};
    }

    GamePlayReferenceManager = null;
    this.Loader.active = true;
    var anim = this.Loader.children[0].children[1].getComponent(cc.Animation);
    anim.play("loading");
    this.CheckReferences();
    this.ReadData();
  },
  onEnable: function onEnable() {
    //events subscription to be called
    cc.systemEvent.on("WriteData", this.WriteData, this);
    cc.systemEvent.on("RefreshData", this.RefreshData, this);
    cc.systemEvent.on("ClearData", this.ClearData, this);
  },
  onDisable: function onDisable() {
    cc.systemEvent.off("WriteData", this.WriteData, this);
    cc.systemEvent.off("RefreshData", this.RefreshData, this);
    cc.systemEvent.off("ClearData", this.ClearData, this);
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
  },
  ReadData: function ReadData() {
    var userData;

    if (IsWeb) {
      var storedData = window.AllData;
      console.log(storedData);

      if (storedData == undefined || storedData == null) {
        userData = null;
      } else {
        userData = JSON.parse(storedData);
      }
    } else {
      userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
    }

    var server = GamePlayReferenceManager.Instance.Get_ServerBackend();

    if (userData === null) {
      console.log("no session data found");
      this.Loader.active = false;
    } else {
      //check if token is expired or not
      server.GetUserData(userData.SK, userData.roleType, userData.userToken, 0);
    }
  },
  WriteData: function WriteData(_data) {
    if (IsWeb) {
      window.AllData = JSON.stringify(_data);
    } else {
      cc.sys.localStorage.setItem("userData", JSON.stringify(_data));
    }
  },
  RefreshData: function RefreshData(_response) {
    var _this = this;

    if (_response == 0) {
      //means successful
      var userData;

      if (IsWeb) {
        userData = JSON.parse(window.AllData);
      } else {
        userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
      }

      setTimeout(function () {
        var server = GamePlayReferenceManager.Instance.Get_ServerBackend();
        server.ReloginFromStorage(userData);
      }, 500);
      setTimeout(function () {
        _this.Loader.active = false;
      }, 1200);
    } else {
      //not successful
      this.Loader.active = false;
      var UIManag = GamePlayReferenceManager.Instance.Get_UIManager();
      UIManag.ShowToast("session expires, please login again.", 2400);
    }
  },
  ClearData: function ClearData() {
    if (IsWeb) {
      window.AllData = null;
    } else {
      cc.sys.localStorage.removeItem("userData");
    }
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTdG9yYWdlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJJc1dlYiIsIlN0b3JhZ2VNYW5hZ2VyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiTG9hZGVyIiwidHlwZSIsIk5vZGUiLCJzZXJpYWxpemFibGUiLCJ1cGRhdGUiLCJvbkxvYWQiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJ3YXJuIiwiaW5mbyIsInRyYWNlIiwiYWN0aXZlIiwiYW5pbSIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50IiwiQW5pbWF0aW9uIiwicGxheSIsIkNoZWNrUmVmZXJlbmNlcyIsIlJlYWREYXRhIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiV3JpdGVEYXRhIiwiUmVmcmVzaERhdGEiLCJDbGVhckRhdGEiLCJvbkRpc2FibGUiLCJvZmYiLCJyZXF1aXJlIiwidXNlckRhdGEiLCJzdG9yZWREYXRhIiwid2luZG93IiwiQWxsRGF0YSIsInVuZGVmaW5lZCIsIkpTT04iLCJwYXJzZSIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXJ2ZXIiLCJJbnN0YW5jZSIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiR2V0VXNlckRhdGEiLCJTSyIsInJvbGVUeXBlIiwidXNlclRva2VuIiwiX2RhdGEiLCJzdHJpbmdpZnkiLCJzZXRJdGVtIiwiX3Jlc3BvbnNlIiwic2V0VGltZW91dCIsIlJlbG9naW5Gcm9tU3RvcmFnZSIsIlVJTWFuYWciLCJHZXRfVUlNYW5hZ2VyIiwiU2hvd1RvYXN0IiwicmVtb3ZlSXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBRyxJQUEvQixFQUNBO0FBQ0E7O0FBQ0EsSUFBSUMsS0FBSyxHQUFHLEtBQVo7QUFDQSxJQUFJQyxjQUFjLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxD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QStCLFVBQS9CO0FBQ0Q7QUFDRjtBQXZIMkIsQ0FBVCxDQUFyQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbi8vZm9yIHdlYiBtYWtlOiBJc1dlYj10cnVlXHJcbi8vZm9yIG1vYmlsZSBtYWtlOiBJc1dlYj1mYWxzZVxyXG52YXIgSXNXZWIgPSBmYWxzZTtcclxudmFyIFN0b3JhZ2VNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU3RvcmFnZU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIExvYWRlcjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICAvLyBpZiAoY2Muc3lzLmdldE5ldHdvcmtUeXBlKCkgPT0gY2Muc3lzLk5ldHdvcmtUeXBlLkxBTiB8fCBjYy5zeXMuZ2V0TmV0d29ya1R5cGUoKSA9PSBjYy5zeXMuTmV0d29ya1R5cGUuV1dBTikge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhcImNvbm5lY3RlZFwiKTtcclxuICAgIC8vIH0gZWxzZSBpZiAoY2Muc3lzLmdldE5ldHdvcmtUeXBlKCkgPT0gY2Muc3lzLk5ldHdvcmtUeXBlLk5PTkUpIHtcclxuICAgIC8vICAgY29uc29sZS5sb2coXCJub3QgY29ubmVjdGVkXCIpO1xyXG4gICAgLy8gfVxyXG4gIH0sXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJWMTVcIik7XHJcbiAgICBpZihJc1dlYilcclxuICAgIHtcclxuICAgICAgY29uc29sZS5sb2cgPSBmdW5jdGlvbiAoKSB7fTtcclxuICAgICAgY29uc29sZS5lcnJvciA9IGZ1bmN0aW9uICgpIHt9O1xyXG4gICAgICBjb25zb2xlLndhcm4gPSBmdW5jdGlvbiAoKSB7fTtcclxuICAgICAgY29uc29sZS5pbmZvID0gZnVuY3Rpb24gKCkge307XHJcbiAgICAgIGNvbnNvbGUudHJhY2UgPSBmdW5jdGlvbiAoKSB7fTtcclxuICAgIH1cclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICB0aGlzLkxvYWRlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdmFyIGFuaW0gPSB0aGlzLkxvYWRlci5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgIGFuaW0ucGxheShcImxvYWRpbmdcIik7XHJcblxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuUmVhZERhdGEoKTtcclxuICB9LFxyXG5cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJXcml0ZURhdGFcIiwgdGhpcy5Xcml0ZURhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJSZWZyZXNoRGF0YVwiLCB0aGlzLlJlZnJlc2hEYXRhLCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiQ2xlYXJEYXRhXCIsIHRoaXMuQ2xlYXJEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIldyaXRlRGF0YVwiLCB0aGlzLldyaXRlRGF0YSwgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJSZWZyZXNoRGF0YVwiLCB0aGlzLlJlZnJlc2hEYXRhLCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIkNsZWFyRGF0YVwiLCB0aGlzLkNsZWFyRGF0YSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgUmVhZERhdGEoKSB7XHJcbiAgICB2YXIgdXNlckRhdGE7XHJcbiAgICBpZiAoSXNXZWIpIHtcclxuICAgICAgdmFyIHN0b3JlZERhdGEgPSB3aW5kb3cuQWxsRGF0YTtcclxuICAgICAgY29uc29sZS5sb2coc3RvcmVkRGF0YSk7XHJcbiAgICAgIGlmIChzdG9yZWREYXRhID09IHVuZGVmaW5lZCB8fCBzdG9yZWREYXRhID09IG51bGwpIHtcclxuICAgICAgICB1c2VyRGF0YSA9IG51bGw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXNlckRhdGEgPSBKU09OLnBhcnNlKHN0b3JlZERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIikpO1xyXG4gICAgfVxyXG4gICAgdmFyIHNlcnZlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpO1xyXG4gICAgaWYgKHVzZXJEYXRhID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gc2Vzc2lvbiBkYXRhIGZvdW5kXCIpO1xyXG4gICAgICB0aGlzLkxvYWRlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vY2hlY2sgaWYgdG9rZW4gaXMgZXhwaXJlZCBvciBub3RcclxuICAgICAgc2VydmVyLkdldFVzZXJEYXRhKHVzZXJEYXRhLlNLLCB1c2VyRGF0YS5yb2xlVHlwZSwgdXNlckRhdGEudXNlclRva2VuLCAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBXcml0ZURhdGEoX2RhdGEpIHtcclxuICAgIGlmIChJc1dlYikge1xyXG4gICAgICB3aW5kb3cuQWxsRGF0YSA9IEpTT04uc3RyaW5naWZ5KF9kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJEYXRhXCIsIEpTT04uc3RyaW5naWZ5KF9kYXRhKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVmcmVzaERhdGEoX3Jlc3BvbnNlKSB7XHJcbiAgICBpZiAoX3Jlc3BvbnNlID09IDApIHtcclxuICAgICAgLy9tZWFucyBzdWNjZXNzZnVsXHJcbiAgICAgIHZhciB1c2VyRGF0YTtcclxuICAgICAgaWYgKElzV2ViKSB7XHJcbiAgICAgICAgdXNlckRhdGEgPSBKU09OLnBhcnNlKHdpbmRvdy5BbGxEYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIikpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHZhciBzZXJ2ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKTtcclxuICAgICAgICBzZXJ2ZXIuUmVsb2dpbkZyb21TdG9yYWdlKHVzZXJEYXRhKTtcclxuICAgICAgfSwgNTAwKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9LCAxMjAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vbm90IHN1Y2Nlc3NmdWxcclxuICAgICAgdGhpcy5Mb2FkZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHZhciBVSU1hbmFnID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKTtcclxuICAgICAgVUlNYW5hZy5TaG93VG9hc3QoXCJzZXNzaW9uIGV4cGlyZXMsIHBsZWFzZSBsb2dpbiBhZ2Fpbi5cIiwgMjQwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJEYXRhKCkge1xyXG4gICAgaWYgKElzV2ViKSB7XHJcbiAgICAgIHdpbmRvdy5BbGxEYXRhID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJEYXRhXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG4iXX0=