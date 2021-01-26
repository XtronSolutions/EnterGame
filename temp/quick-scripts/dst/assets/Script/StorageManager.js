
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
    console.log("V1");
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
    var userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
    var server = GamePlayReferenceManager.Instance.Get_ServerBackend();

    if (userData === null) {
      console.log("no session data found");
      this.Loader.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTdG9yYWdlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJTdG9yYWdlTWFuYWdlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkxvYWRlciIsInR5cGUiLCJOb2RlIiwic2VyaWFsaXphYmxlIiwib25Mb2FkIiwiY29uc29sZSIsImxvZyIsImFjdGl2ZSIsImFuaW0iLCJjaGlsZHJlbiIsImdldENvbXBvbmVudCIsIkFuaW1hdGlvbiIsInBsYXkiLCJDaGVja1JlZmVyZW5jZXMiLCJSZWFkRGF0YSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIldyaXRlRGF0YSIsIlJlZnJlc2hEYXRhIiwiQ2xlYXJEYXRhIiwib25EaXNhYmxlIiwib2ZmIiwicmVxdWlyZSIsInVzZXJEYXRhIiwiSlNPTiIsInBhcnNlIiwic3lzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInNlcnZlciIsIkluc3RhbmNlIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJHZXRVc2VyRGF0YSIsImRhdGEiLCJTSyIsInJvbGVUeXBlIiwidXNlclRva2VuIiwiX2RhdGEiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiX3Jlc3BvbnNlIiwic2V0VGltZW91dCIsIlJlbG9naW5Gcm9tU3RvcmFnZSIsIlVJTWFuYWciLCJHZXRfVUlNYW5hZ2VyIiwiU2hvd1RvYXN0IiwicmVtb3ZlSXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBRyxJQUEvQjtBQUVBLElBQUlDLGNBQWMsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDNUJDLEVBQUFBLElBQUksRUFBRSxnQkFEc0I7QUFFNUIsYUFBU0YsRUFBRSxDQUFDRyxTQUZnQjtBQUk1QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLE1BQU0sRUFBRTtBQUNOLGlCQUFTLElB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RCxHQXpEMkI7QUEyRDVCbkIsRUFBQUEsV0EzRDRCLHVCQTJEaEJzQixTQTNEZ0IsRUEyREw7QUFBQTs7QUFDckIsUUFBSUEsU0FBUyxJQUFJLENBQWpCLEVBQW9CO0FBQ2xCO0FBQ0EsVUFBSWpCLFFBQVEsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVcvQixFQUFFLENBQUNnQyxHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFVBQTVCLENBQVgsQ0FBZjtBQUNBYSxNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFlBQUlaLE1BQU0sR0FBR3JDLHdCQUF3QixDQUFDc0MsUUFBekIsQ0FBa0NDLGlCQUFsQyxFQUFiO0FBQ0FGLFFBQUFBLE1BQU0sQ0FBQ2Esa0JBQVAsQ0FBMEJuQixRQUExQjtBQUNELE9BSFMsRUFHUCxHQUhPLENBQVY7QUFLQWtCLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsUUFBQSxLQUFJLENBQUMxQyxNQUFMLENBQVlPLE1BQVosR0FBcUIsS0FBckI7QUFDRCxPQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsS0FYRCxNQVdPO0FBQ0w7QUFDQSxXQUFLUCxNQUFMLENBQVlPLE1BQVosR0FBcUIsS0FBckI7QUFDQSxVQUFJcUMsT0FBTyxHQUFHbkQsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQ2MsYUFBbEMsRUFBZDtBQUNBRCxNQUFBQSxPQUFPLENBQUNFLFNBQVIsQ0FBa0Isc0NBQWxCLEVBQTBELElBQTFEO0FBQ0Q7QUFDRixHQTdFMkI7QUErRTVCMUIsRUFBQUEsU0EvRTRCLHVCQStFaEI7QUFDVnpCLElBQUFBLEVBQUUsQ0FBQ2dDLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQm1CLFVBQXBCLENBQStCLFVBQS9CO0FBQ0Q7QUFqRjJCLENBQVQsQ0FBckIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG5cclxudmFyIFN0b3JhZ2VNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU3RvcmFnZU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIExvYWRlcjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlYxXCIpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB2YXIgYW5pbSA9IHRoaXMuTG9hZGVyLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgYW5pbS5wbGF5KFwibG9hZGluZ1wiKTtcclxuXHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5SZWFkRGF0YSgpO1xyXG4gIH0sXHJcblxyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIldyaXRlRGF0YVwiLCB0aGlzLldyaXRlRGF0YSwgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlJlZnJlc2hEYXRhXCIsIHRoaXMuUmVmcmVzaERhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJDbGVhckRhdGFcIiwgdGhpcy5DbGVhckRhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiV3JpdGVEYXRhXCIsIHRoaXMuV3JpdGVEYXRhLCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIlJlZnJlc2hEYXRhXCIsIHRoaXMuUmVmcmVzaERhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiQ2xlYXJEYXRhXCIsIHRoaXMuQ2xlYXJEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBSZWFkRGF0YSgpIHtcclxuICAgIHZhciB1c2VyRGF0YSA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIikpO1xyXG4gICAgdmFyIHNlcnZlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpO1xyXG4gICAgaWYgKHVzZXJEYXRhID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gc2Vzc2lvbiBkYXRhIGZvdW5kXCIpO1xyXG4gICAgICB0aGlzLkxvYWRlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vY29uc29sZS5lcnJvcih1c2VyRGF0YSk7XHJcbiAgICAgIC8vY2hlY2sgaWYgdG9rZW4gaXMgZXhwaXJlZCBvciBub3RcclxuICAgICAgc2VydmVyLkdldFVzZXJEYXRhKHVzZXJEYXRhLmRhdGEuU0ssIHVzZXJEYXRhLmRhdGEucm9sZVR5cGUsIHVzZXJEYXRhLmRhdGEudXNlclRva2VuLCAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBXcml0ZURhdGEoX2RhdGEpIHtcclxuICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJEYXRhXCIsIEpTT04uc3RyaW5naWZ5KF9kYXRhKSk7XHJcbiAgfSxcclxuXHJcbiAgUmVmcmVzaERhdGEoX3Jlc3BvbnNlKSB7XHJcbiAgICBpZiAoX3Jlc3BvbnNlID09IDApIHtcclxuICAgICAgLy9tZWFucyBzdWNjZXNzZnVsXHJcbiAgICAgIHZhciB1c2VyRGF0YSA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIikpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB2YXIgc2VydmVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCk7XHJcbiAgICAgICAgc2VydmVyLlJlbG9naW5Gcm9tU3RvcmFnZSh1c2VyRGF0YSk7XHJcbiAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkxvYWRlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfSwgMTIwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvL25vdCBzdWNjZXNzZnVsXHJcbiAgICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB2YXIgVUlNYW5hZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCk7XHJcbiAgICAgIFVJTWFuYWcuU2hvd1RvYXN0KFwic2Vzc2lvbiBleHBpcmVzLCBwbGVhc2UgbG9naW4gYWdhaW4uXCIsIDI0MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENsZWFyRGF0YSgpIHtcclxuICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJEYXRhXCIpO1xyXG4gIH0sXHJcbn0pO1xyXG4iXX0=