
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
var IsWeb = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTdG9yYWdlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJJc1dlYiIsIlN0b3JhZ2VNYW5hZ2VyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiTG9hZGVyIiwidHlwZSIsIk5vZGUiLCJzZXJpYWxpemFibGUiLCJ1cGRhdGUiLCJvbkxvYWQiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJ3YXJuIiwiaW5mbyIsInRyYWNlIiwiYWN0aXZlIiwiYW5pbSIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50IiwiQW5pbWF0aW9uIiwicGxheSIsIkNoZWNrUmVmZXJlbmNlcyIsIlJlYWREYXRhIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiV3JpdGVEYXRhIiwiUmVmcmVzaERhdGEiLCJDbGVhckRhdGEiLCJvbkRpc2FibGUiLCJvZmYiLCJyZXF1aXJlIiwidXNlckRhdGEiLCJzdG9yZWREYXRhIiwid2luZG93IiwiQWxsRGF0YSIsInVuZGVmaW5lZCIsIkpTT04iLCJwYXJzZSIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXJ2ZXIiLCJJbnN0YW5jZSIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiR2V0VXNlckRhdGEiLCJTSyIsInJvbGVUeXBlIiwidXNlclRva2VuIiwiX2RhdGEiLCJzdHJpbmdpZnkiLCJzZXRJdGVtIiwiX3Jlc3BvbnNlIiwic2V0VGltZW91dCIsIlJlbG9naW5Gcm9tU3RvcmFnZSIsIlVJTWFuYWciLCJHZXRfVUlNYW5hZ2VyIiwiU2hvd1RvYXN0IiwicmVtb3ZlSXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBRyxJQUEvQjtBQUNBLElBQUlDLEtBQUssR0FBRyxJQUFaO0FBQ0EsSUFBSUMsY0FBYyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUM1QkMs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QUNEO0FBQ0Y7QUF2SDJCLENBQVQsQ0FBckIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgSXNXZWIgPSB0cnVlO1xyXG52YXIgU3RvcmFnZU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTdG9yYWdlTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTG9hZGVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIC8vIGlmIChjYy5zeXMuZ2V0TmV0d29ya1R5cGUoKSA9PSBjYy5zeXMuTmV0d29ya1R5cGUuTEFOIHx8IGNjLnN5cy5nZXROZXR3b3JrVHlwZSgpID09IGNjLnN5cy5OZXR3b3JrVHlwZS5XV0FOKSB7XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGVkXCIpO1xyXG4gICAgLy8gfSBlbHNlIGlmIChjYy5zeXMuZ2V0TmV0d29ya1R5cGUoKSA9PSBjYy5zeXMuTmV0d29ya1R5cGUuTk9ORSkge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhcIm5vdCBjb25uZWN0ZWRcIik7XHJcbiAgICAvLyB9XHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlYxNVwiKTtcclxuICAgIGlmKElzV2ViKVxyXG4gICAge1xyXG4gICAgICBjb25zb2xlLmxvZyA9IGZ1bmN0aW9uICgpIHt9O1xyXG4gICAgICBjb25zb2xlLmVycm9yID0gZnVuY3Rpb24gKCkge307XHJcbiAgICAgIGNvbnNvbGUud2FybiA9IGZ1bmN0aW9uICgpIHt9O1xyXG4gICAgICBjb25zb2xlLmluZm8gPSBmdW5jdGlvbiAoKSB7fTtcclxuICAgICAgY29uc29sZS50cmFjZSA9IGZ1bmN0aW9uICgpIHt9O1xyXG4gICAgfVxyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB2YXIgYW5pbSA9IHRoaXMuTG9hZGVyLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgYW5pbS5wbGF5KFwibG9hZGluZ1wiKTtcclxuXHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5SZWFkRGF0YSgpO1xyXG4gIH0sXHJcblxyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIldyaXRlRGF0YVwiLCB0aGlzLldyaXRlRGF0YSwgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlJlZnJlc2hEYXRhXCIsIHRoaXMuUmVmcmVzaERhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJDbGVhckRhdGFcIiwgdGhpcy5DbGVhckRhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiV3JpdGVEYXRhXCIsIHRoaXMuV3JpdGVEYXRhLCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIlJlZnJlc2hEYXRhXCIsIHRoaXMuUmVmcmVzaERhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiQ2xlYXJEYXRhXCIsIHRoaXMuQ2xlYXJEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBSZWFkRGF0YSgpIHtcclxuICAgIHZhciB1c2VyRGF0YTtcclxuICAgIGlmIChJc1dlYikge1xyXG4gICAgICB2YXIgc3RvcmVkRGF0YSA9IHdpbmRvdy5BbGxEYXRhO1xyXG4gICAgICBjb25zb2xlLmxvZyhzdG9yZWREYXRhKTtcclxuICAgICAgaWYgKHN0b3JlZERhdGEgPT0gdW5kZWZpbmVkIHx8IHN0b3JlZERhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgIHVzZXJEYXRhID0gbnVsbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2Uoc3RvcmVkRGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVzZXJEYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyRGF0YVwiKSk7XHJcbiAgICB9XHJcbiAgICB2YXIgc2VydmVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCk7XHJcbiAgICBpZiAodXNlckRhdGEgPT09IG51bGwpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJubyBzZXNzaW9uIGRhdGEgZm91bmRcIik7XHJcbiAgICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy9jaGVjayBpZiB0b2tlbiBpcyBleHBpcmVkIG9yIG5vdFxyXG4gICAgICBzZXJ2ZXIuR2V0VXNlckRhdGEodXNlckRhdGEuU0ssIHVzZXJEYXRhLnJvbGVUeXBlLCB1c2VyRGF0YS51c2VyVG9rZW4sIDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFdyaXRlRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKElzV2ViKSB7XHJcbiAgICAgIHdpbmRvdy5BbGxEYXRhID0gSlNPTi5zdHJpbmdpZnkoX2RhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlckRhdGFcIiwgSlNPTi5zdHJpbmdpZnkoX2RhdGEpKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWZyZXNoRGF0YShfcmVzcG9uc2UpIHtcclxuICAgIGlmIChfcmVzcG9uc2UgPT0gMCkge1xyXG4gICAgICAvL21lYW5zIHN1Y2Nlc3NmdWxcclxuICAgICAgdmFyIHVzZXJEYXRhO1xyXG4gICAgICBpZiAoSXNXZWIpIHtcclxuICAgICAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2Uod2luZG93LkFsbERhdGEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHVzZXJEYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyRGF0YVwiKSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdmFyIHNlcnZlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpO1xyXG4gICAgICAgIHNlcnZlci5SZWxvZ2luRnJvbVN0b3JhZ2UodXNlckRhdGEpO1xyXG4gICAgICB9LCA1MDApO1xyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5Mb2FkZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH0sIDEyMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy9ub3Qgc3VjY2Vzc2Z1bFxyXG4gICAgICB0aGlzLkxvYWRlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdmFyIFVJTWFuYWcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpO1xyXG4gICAgICBVSU1hbmFnLlNob3dUb2FzdChcInNlc3Npb24gZXhwaXJlcywgcGxlYXNlIGxvZ2luIGFnYWluLlwiLCAyNDAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDbGVhckRhdGEoKSB7XHJcbiAgICBpZiAoSXNXZWIpIHtcclxuICAgICAgd2luZG93LkFsbERhdGEgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidXNlckRhdGFcIik7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==