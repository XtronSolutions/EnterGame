
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

var GamePlayReferenceManager = null;
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
  onLoad: function onLoad() {
    console.log("V6");
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
    //var userData = null;
    var userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
    var server = GamePlayReferenceManager.Instance.Get_ServerBackend();

    if (userData === null) {
      console.log("no session data found");
      this.Loader.active = false;

      var _data;

      if (typeof window.getUserData === "function") {
        _data = window.getUserData();
        console.error(_data); // safe to use the function
      } else {
        console.error("not a function");
      } // console.log(window.getUserData());
      //  console.log(cc.sys.localStorage.getItem("userData"));
      // console.log(localStorage.getItem("userData"));
      //console.log(window.localStorage.getItem("userData"));
      // console.log(_data);
      // try {
      //   var _data = window.getUserData();
      //   //   console.log(getUserData());
      // } catch (error) {
      //   console.log(error);
      // }

    } else {
      //console.error(userData);
      //check if token is expired or not
      server.GetUserData(userData.data.SK, userData.data.roleType, userData.data.userToken, 0);
    }
  },
  WriteData: function WriteData(_data) {
    cc.sys.localStorage.setItem("userData", JSON.stringify(_data));
  },
  RefreshData: function RefreshData(_response) {
    var _this = this;

    if (_response == 0) {
      //means successful
      var userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
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
    cc.sys.localStorage.removeItem("userData");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTdG9yYWdlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJTdG9yYWdlTWFuYWdlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkxvYWRlciIsInR5cGUiLCJOb2RlIiwic2VyaWFsaXphYmxlIiwib25Mb2FkIiwiY29uc29sZSIsImxvZyIsImFjdGl2ZSIsImFuaW0iLCJjaGlsZHJlbiIsImdldENvbXBvbmVudCIsIkFuaW1hdGlvbiIsInBsYXkiLCJDaGVja1JlZmVyZW5jZXMiLCJSZWFkRGF0YSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIldyaXRlRGF0YSIsIlJlZnJlc2hEYXRhIiwiQ2xlYXJEYXRhIiwib25EaXNhYmxlIiwib2ZmIiwicmVxdWlyZSIsInVzZXJEYXRhIiwiSlNPTiIsInBhcnNlIiwic3lzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInNlcnZlciIsIkluc3RhbmNlIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJfZGF0YSIsIndpbmRvdyIsImdldFVzZXJEYXRhIiwiZXJyb3IiLCJHZXRVc2VyRGF0YSIsImRhdGEiLCJTSyIsInJvbGVUeXBlIiwidXNlclRva2VuIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsIl9yZXNwb25zZSIsInNldFRpbWVvdXQiLCJSZWxvZ2luRnJvbVN0b3JhZ2UiLCJVSU1hbmFnIiwiR2V0X1VJTWFuYWdlciIsIlNob3dUb2FzdCIsInJlbW92ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUcsSUFBL0I7QUFFQSxJQUFJQyxjQUFjLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQzVCQyxFQUFBQSxJQUFJLEVBQUUsZ0JBRHNCO0FBRTVCLGFBQVNGLEVBQUUsQ0FBQ0csU0FGZ0I7QUFJNUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNW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ekIsQ0FBa0NpQixhQUFsQyxFQUFkO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0UsU0FBUixDQUFrQixzQ0FBbEIsRUFBMEQsSUFBMUQ7QUFDRDtBQUNGLEdBbkcyQjtBQXFHNUI3QixFQUFBQSxTQXJHNEIsdUJBcUdoQjtBQUNWekIsSUFBQUEsRUFBRSxDQUFDZ0MsR0FBSCxDQUFPQyxZQUFQLENBQW9Cc0IsVUFBcEIsQ0FBK0IsVUFBL0I7QUFDRDtBQXZHMkIsQ0FBVCxDQUFyQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcblxyXG52YXIgU3RvcmFnZU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTdG9yYWdlTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTG9hZGVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiVjZcIik7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgdGhpcy5Mb2FkZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHZhciBhbmltID0gdGhpcy5Mb2FkZXIuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICBhbmltLnBsYXkoXCJsb2FkaW5nXCIpO1xyXG5cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLlJlYWREYXRhKCk7XHJcbiAgfSxcclxuXHJcbiAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vZXZlbnRzIHN1YnNjcmlwdGlvbiB0byBiZSBjYWxsZWRcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiV3JpdGVEYXRhXCIsIHRoaXMuV3JpdGVEYXRhLCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiUmVmcmVzaERhdGFcIiwgdGhpcy5SZWZyZXNoRGF0YSwgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIkNsZWFyRGF0YVwiLCB0aGlzLkNsZWFyRGF0YSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJXcml0ZURhdGFcIiwgdGhpcy5Xcml0ZURhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiUmVmcmVzaERhdGFcIiwgdGhpcy5SZWZyZXNoRGF0YSwgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJDbGVhckRhdGFcIiwgdGhpcy5DbGVhckRhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIFJlYWREYXRhKCkge1xyXG4gICAgLy92YXIgdXNlckRhdGEgPSBudWxsO1xyXG4gICAgdmFyIHVzZXJEYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyRGF0YVwiKSk7XHJcbiAgICB2YXIgc2VydmVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCk7XHJcbiAgICBpZiAodXNlckRhdGEgPT09IG51bGwpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJubyBzZXNzaW9uIGRhdGEgZm91bmRcIik7XHJcbiAgICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgdmFyIF9kYXRhO1xyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5nZXRVc2VyRGF0YSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgX2RhdGEgPSB3aW5kb3cuZ2V0VXNlckRhdGEoKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKF9kYXRhKTtcclxuICAgICAgICAvLyBzYWZlIHRvIHVzZSB0aGUgZnVuY3Rpb25cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwibm90IGEgZnVuY3Rpb25cIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvdy5nZXRVc2VyRGF0YSgpKTtcclxuICAgICAgLy8gIGNvbnNvbGUubG9nKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJEYXRhXCIpKTtcclxuICAgICAgLy8gY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyRGF0YVwiKSk7XHJcbiAgICAgIC8vY29uc29sZS5sb2cod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIikpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIC8vIHRyeSB7XHJcbiAgICAgIC8vICAgdmFyIF9kYXRhID0gd2luZG93LmdldFVzZXJEYXRhKCk7XHJcbiAgICAgIC8vICAgLy8gICBjb25zb2xlLmxvZyhnZXRVc2VyRGF0YSgpKTtcclxuICAgICAgLy8gfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgLy8gICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIC8vIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vY29uc29sZS5lcnJvcih1c2VyRGF0YSk7XHJcbiAgICAgIC8vY2hlY2sgaWYgdG9rZW4gaXMgZXhwaXJlZCBvciBub3RcclxuICAgICAgc2VydmVyLkdldFVzZXJEYXRhKHVzZXJEYXRhLmRhdGEuU0ssIHVzZXJEYXRhLmRhdGEucm9sZVR5cGUsIHVzZXJEYXRhLmRhdGEudXNlclRva2VuLCAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBXcml0ZURhdGEoX2RhdGEpIHtcclxuICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJEYXRhXCIsIEpTT04uc3RyaW5naWZ5KF9kYXRhKSk7XHJcbiAgfSxcclxuXHJcbiAgUmVmcmVzaERhdGEoX3Jlc3BvbnNlKSB7XHJcbiAgICBpZiAoX3Jlc3BvbnNlID09IDApIHtcclxuICAgICAgLy9tZWFucyBzdWNjZXNzZnVsXHJcbiAgICAgIHZhciB1c2VyRGF0YSA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIikpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB2YXIgc2VydmVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCk7XHJcbiAgICAgICAgc2VydmVyLlJlbG9naW5Gcm9tU3RvcmFnZSh1c2VyRGF0YSk7XHJcbiAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkxvYWRlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfSwgMTIwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvL25vdCBzdWNjZXNzZnVsXHJcbiAgICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB2YXIgVUlNYW5hZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCk7XHJcbiAgICAgIFVJTWFuYWcuU2hvd1RvYXN0KFwic2Vzc2lvbiBleHBpcmVzLCBwbGVhc2UgbG9naW4gYWdhaW4uXCIsIDI0MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENsZWFyRGF0YSgpIHtcclxuICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJEYXRhXCIpO1xyXG4gIH0sXHJcbn0pO1xyXG4iXX0=