
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
    console.log("V12"); // console.log = function () {};
    //  console.error = function () {};
    // console.warn = function () {};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTdG9yYWdlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJJc1dlYiIsIlN0b3JhZ2VNYW5hZ2VyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiTG9hZGVyIiwidHlwZSIsIk5vZGUiLCJzZXJpYWxpemFibGUiLCJ1cGRhdGUiLCJvbkxvYWQiLCJjb25zb2xlIiwibG9nIiwiYWN0aXZlIiwiYW5pbSIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50IiwiQW5pbWF0aW9uIiwicGxheSIsIkNoZWNrUmVmZXJlbmNlcyIsIlJlYWREYXRhIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiV3JpdGVEYXRhIiwiUmVmcmVzaERhdGEiLCJDbGVhckRhdGEiLCJvbkRpc2FibGUiLCJvZmYiLCJyZXF1aXJlIiwidXNlckRhdGEiLCJzdG9yZWREYXRhIiwid2luZG93IiwiQWxsRGF0YSIsInVuZGVmaW5lZCIsIkpTT04iLCJwYXJzZSIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXJ2ZXIiLCJJbnN0YW5jZSIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiR2V0VXNlckRhdGEiLCJTSyIsInJvbGVUeXBlIiwidXNlclRva2VuIiwiX2RhdGEiLCJzdHJpbmdpZnkiLCJzZXRJdGVtIiwiX3Jlc3BvbnNlIiwic2V0VGltZW91dCIsIlJlbG9naW5Gcm9tU3RvcmFnZSIsIlVJTWFuYWciLCJHZXRfVUlNYW5hZ2VyIiwiU2hvd1RvYXN0IiwicmVtb3ZlSXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBRyxJQUEvQjtBQUNBLElBQUlDLEtBQUssR0FBRyxLQUFaO0FBQ0EsSUFBSUMsY0FBYyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUM1QkMsRUFBQUEsSUFBSSxFQUFFLGdCQURzQjtBQUU1Qixh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QUFDLFlBQU07QUFDZixZQUFJWCxNQUFNLEdBQUczQyx3QkFBd0IsQ0FBQzRDLFFBQXpCLENBQWtDQyxpQkFBbEMsRUFBYjtBQUNBRixRQUFBQSxNQUFNLENBQUNZLGtCQUFQLENBQTBCdEIsUUFBMUI7QUFDRCxPQUhTLEVBR1AsR0FITyxDQUFWO0FBS0FxQixNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFFBQUEsS0FBSSxDQUFDOUMsTUFBTCxDQUFZUSxNQUFaLEdBQXFCLEtBQXJCO0FBQ0QsT0FGUyxFQUVQLElBRk8sQ0FBVjtBQUdELEtBaEJELE1BZ0JPO0FBQ0w7QUFDQSxXQUFLUixNQUFMLENBQVlRLE1BQVosR0FBcUIsS0FBckI7QUFDQSxVQUFJd0MsT0FBTyxHQUFHeEQsd0JBQXdCLENBQUM0QyxRQUF6QixDQUFrQ2EsYUFBbEMsRUFBZDtBQUNBRCxNQUFBQSxPQUFPLENBQUNFLFNBQVIsQ0FBa0Isc0NBQWxCLEVBQTBELElBQTFEO0FBQ0Q7QUFDRixHQTFHMkI7QUE0RzVCN0IsRUFBQUEsU0E1RzRCLHVCQTRHaEI7QUFDVixRQUFJNUIsS0FBSixFQUFXO0FBQ1RrQyxNQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUIsSUFBakI7QUFDRCxLQUZELE1BRU87QUFDTGpDLE1BQUFBLEVBQUUsQ0FBQ3FDLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQmtCLFVBQXBCLENBQStCLFVBQS9CO0FBQ0Q7QUFDRjtBQWxIMkIsQ0FBVCxDQUFyQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBJc1dlYiA9IGZhbHNlO1xyXG52YXIgU3RvcmFnZU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTdG9yYWdlTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTG9hZGVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIC8vIGlmIChjYy5zeXMuZ2V0TmV0d29ya1R5cGUoKSA9PSBjYy5zeXMuTmV0d29ya1R5cGUuTEFOIHx8IGNjLnN5cy5nZXROZXR3b3JrVHlwZSgpID09IGNjLnN5cy5OZXR3b3JrVHlwZS5XV0FOKSB7XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGVkXCIpO1xyXG4gICAgLy8gfSBlbHNlIGlmIChjYy5zeXMuZ2V0TmV0d29ya1R5cGUoKSA9PSBjYy5zeXMuTmV0d29ya1R5cGUuTk9ORSkge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhcIm5vdCBjb25uZWN0ZWRcIik7XHJcbiAgICAvLyB9XHJcbiAgfSxcclxuICBvbkxvYWQoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlYxMlwiKTtcclxuICAgIC8vIGNvbnNvbGUubG9nID0gZnVuY3Rpb24gKCkge307XHJcbiAgICAvLyAgY29uc29sZS5lcnJvciA9IGZ1bmN0aW9uICgpIHt9O1xyXG4gICAgLy8gY29uc29sZS53YXJuID0gZnVuY3Rpb24gKCkge307XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgdGhpcy5Mb2FkZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHZhciBhbmltID0gdGhpcy5Mb2FkZXIuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICBhbmltLnBsYXkoXCJsb2FkaW5nXCIpO1xyXG5cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLlJlYWREYXRhKCk7XHJcbiAgfSxcclxuXHJcbiAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vZXZlbnRzIHN1YnNjcmlwdGlvbiB0byBiZSBjYWxsZWRcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiV3JpdGVEYXRhXCIsIHRoaXMuV3JpdGVEYXRhLCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiUmVmcmVzaERhdGFcIiwgdGhpcy5SZWZyZXNoRGF0YSwgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIkNsZWFyRGF0YVwiLCB0aGlzLkNsZWFyRGF0YSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJXcml0ZURhdGFcIiwgdGhpcy5Xcml0ZURhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiUmVmcmVzaERhdGFcIiwgdGhpcy5SZWZyZXNoRGF0YSwgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJDbGVhckRhdGFcIiwgdGhpcy5DbGVhckRhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIFJlYWREYXRhKCkge1xyXG4gICAgdmFyIHVzZXJEYXRhO1xyXG4gICAgaWYgKElzV2ViKSB7XHJcbiAgICAgIHZhciBzdG9yZWREYXRhID0gd2luZG93LkFsbERhdGE7XHJcbiAgICAgIGNvbnNvbGUubG9nKHN0b3JlZERhdGEpO1xyXG4gICAgICBpZiAoc3RvcmVkRGF0YSA9PSB1bmRlZmluZWQgfHwgc3RvcmVkRGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgdXNlckRhdGEgPSBudWxsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHVzZXJEYXRhID0gSlNPTi5wYXJzZShzdG9yZWREYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdXNlckRhdGEgPSBKU09OLnBhcnNlKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJEYXRhXCIpKTtcclxuICAgIH1cclxuICAgIHZhciBzZXJ2ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKTtcclxuICAgIGlmICh1c2VyRGF0YSA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vIHNlc3Npb24gZGF0YSBmb3VuZFwiKTtcclxuICAgICAgdGhpcy5Mb2FkZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvL2NoZWNrIGlmIHRva2VuIGlzIGV4cGlyZWQgb3Igbm90XHJcbiAgICAgIHNlcnZlci5HZXRVc2VyRGF0YSh1c2VyRGF0YS5TSywgdXNlckRhdGEucm9sZVR5cGUsIHVzZXJEYXRhLnVzZXJUb2tlbiwgMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgV3JpdGVEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoSXNXZWIpIHtcclxuICAgICAgd2luZG93LkFsbERhdGEgPSBKU09OLnN0cmluZ2lmeShfZGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyRGF0YVwiLCBKU09OLnN0cmluZ2lmeShfZGF0YSkpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlZnJlc2hEYXRhKF9yZXNwb25zZSkge1xyXG4gICAgaWYgKF9yZXNwb25zZSA9PSAwKSB7XHJcbiAgICAgIC8vbWVhbnMgc3VjY2Vzc2Z1bFxyXG4gICAgICB2YXIgdXNlckRhdGE7XHJcbiAgICAgIGlmIChJc1dlYikge1xyXG4gICAgICAgIHVzZXJEYXRhID0gSlNPTi5wYXJzZSh3aW5kb3cuQWxsRGF0YSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXNlckRhdGEgPSBKU09OLnBhcnNlKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJEYXRhXCIpKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB2YXIgc2VydmVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCk7XHJcbiAgICAgICAgc2VydmVyLlJlbG9naW5Gcm9tU3RvcmFnZSh1c2VyRGF0YSk7XHJcbiAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkxvYWRlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfSwgMTIwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvL25vdCBzdWNjZXNzZnVsXHJcbiAgICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB2YXIgVUlNYW5hZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCk7XHJcbiAgICAgIFVJTWFuYWcuU2hvd1RvYXN0KFwic2Vzc2lvbiBleHBpcmVzLCBwbGVhc2UgbG9naW4gYWdhaW4uXCIsIDI0MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENsZWFyRGF0YSgpIHtcclxuICAgIGlmIChJc1dlYikge1xyXG4gICAgICB3aW5kb3cuQWxsRGF0YSA9IG51bGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VyRGF0YVwiKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuIl19