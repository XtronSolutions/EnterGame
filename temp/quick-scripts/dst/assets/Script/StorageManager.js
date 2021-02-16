
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
    console.log("V13"); // console.log = function () {};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTdG9yYWdlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJJc1dlYiIsIlN0b3JhZ2VNYW5hZ2VyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiTG9hZGVyIiwidHlwZSIsIk5vZGUiLCJzZXJpYWxpemFibGUiLCJ1cGRhdGUiLCJvbkxvYWQiLCJjb25zb2xlIiwibG9nIiwiYWN0aXZlIiwiYW5pbSIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50IiwiQW5pbWF0aW9uIiwicGxheSIsIkNoZWNrUmVmZXJlbmNlcyIsIlJlYWREYXRhIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiV3JpdGVEYXRhIiwiUmVmcmVzaERhdGEiLCJDbGVhckRhdGEiLCJvbkRpc2FibGUiLCJvZmYiLCJyZXF1aXJlIiwidXNlckRhdGEiLCJzdG9yZWREYXRhIiwid2luZG93IiwiQWxsRGF0YSIsInVuZGVmaW5lZCIsIkpTT04iLCJwYXJzZSIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXJ2ZXIiLCJJbnN0YW5jZSIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiR2V0VXNlckRhdGEiLCJTSyIsInJvbGVUeXBlIiwidXNlclRva2VuIiwiX2RhdGEiLCJzdHJpbmdpZnkiLCJzZXRJdGVtIiwiX3Jlc3BvbnNlIiwic2V0VGltZW91dCIsIlJlbG9naW5Gcm9tU3RvcmFnZSIsIlVJTWFuYWciLCJHZXRfVUlNYW5hZ2VyIiwiU2hvd1RvYXN0IiwicmVtb3ZlSXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBRyxJQUEvQjtBQUNBLElBQUlDLEtBQUssR0FBRyxJQUFaO0FBQ0EsSUFBSUMsY0FBYyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUM1QkMsRUFBQUEsSUFBSSxFQUFFLGdCQURzQjtBQUU1Qixh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QUFDLFlBQU07QUFDZixZQUFJWCxNQUFNLEdBQUczQyx3QkFBd0IsQ0FBQzRDLFFBQXpCLENBQWtDQyxpQkFBbEMsRUFBYjtBQUNBRixRQUFBQSxNQUFNLENBQUNZLGtCQUFQLENBQTBCdEIsUUFBMUI7QUFDRCxPQUhTLEVBR1AsR0FITyxDQUFWO0FBS0FxQixNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFFBQUEsS0FBSSxDQUFDOUMsTUFBTCxDQUFZUSxNQUFaLEdBQXFCLEtBQXJCO0FBQ0QsT0FGUyxFQUVQLElBRk8sQ0FBVjtBQUdELEtBaEJELE1BZ0JPO0FBQ0w7QUFDQSxXQUFLUixNQUFMLENBQVlRLE1BQVosR0FBcUIsS0FBckI7QUFDQSxVQUFJd0MsT0FBTyxHQUFHeEQsd0JBQXdCLENBQUM0QyxRQUF6QixDQUFrQ2EsYUFBbEMsRUFBZDtBQUNBRCxNQUFBQSxPQUFPLENBQUNFLFNBQVIsQ0FBa0Isc0NBQWxCLEVBQTBELElBQTFEO0FBQ0Q7QUFDRixHQTFHMkI7QUE0RzVCN0IsRUFBQUEsU0E1RzRCLHVCQTRHaEI7QUFDVixRQUFJNUIsS0FBSixFQUFXO0FBQ1RrQyxNQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUIsSUFBakI7QUFDRCxLQUZELE1BRU87QUFDTGpDLE1BQUFBLEVBQUUsQ0FBQ3FDLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQmtCLFVBQXBCLENBQStCLFVBQS9CO0FBQ0Q7QUFDRjtBQWxIMkIsQ0FBVCxDQUFyQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBJc1dlYiA9IHRydWU7XHJcbnZhciBTdG9yYWdlTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlN0b3JhZ2VNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBMb2FkZXI6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgLy8gaWYgKGNjLnN5cy5nZXROZXR3b3JrVHlwZSgpID09IGNjLnN5cy5OZXR3b3JrVHlwZS5MQU4gfHwgY2Muc3lzLmdldE5ldHdvcmtUeXBlKCkgPT0gY2Muc3lzLk5ldHdvcmtUeXBlLldXQU4pIHtcclxuICAgIC8vICAgY29uc29sZS5sb2coXCJjb25uZWN0ZWRcIik7XHJcbiAgICAvLyB9IGVsc2UgaWYgKGNjLnN5cy5nZXROZXR3b3JrVHlwZSgpID09IGNjLnN5cy5OZXR3b3JrVHlwZS5OT05FKSB7XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKFwibm90IGNvbm5lY3RlZFwiKTtcclxuICAgIC8vIH1cclxuICB9LFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiVjEzXCIpO1xyXG4gICAgLy8gY29uc29sZS5sb2cgPSBmdW5jdGlvbiAoKSB7fTtcclxuICAgIC8vICBjb25zb2xlLmVycm9yID0gZnVuY3Rpb24gKCkge307XHJcbiAgICAvLyBjb25zb2xlLndhcm4gPSBmdW5jdGlvbiAoKSB7fTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICB0aGlzLkxvYWRlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdmFyIGFuaW0gPSB0aGlzLkxvYWRlci5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgIGFuaW0ucGxheShcImxvYWRpbmdcIik7XHJcblxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuUmVhZERhdGEoKTtcclxuICB9LFxyXG5cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJXcml0ZURhdGFcIiwgdGhpcy5Xcml0ZURhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJSZWZyZXNoRGF0YVwiLCB0aGlzLlJlZnJlc2hEYXRhLCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiQ2xlYXJEYXRhXCIsIHRoaXMuQ2xlYXJEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIldyaXRlRGF0YVwiLCB0aGlzLldyaXRlRGF0YSwgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJSZWZyZXNoRGF0YVwiLCB0aGlzLlJlZnJlc2hEYXRhLCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIkNsZWFyRGF0YVwiLCB0aGlzLkNsZWFyRGF0YSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgUmVhZERhdGEoKSB7XHJcbiAgICB2YXIgdXNlckRhdGE7XHJcbiAgICBpZiAoSXNXZWIpIHtcclxuICAgICAgdmFyIHN0b3JlZERhdGEgPSB3aW5kb3cuQWxsRGF0YTtcclxuICAgICAgY29uc29sZS5sb2coc3RvcmVkRGF0YSk7XHJcbiAgICAgIGlmIChzdG9yZWREYXRhID09IHVuZGVmaW5lZCB8fCBzdG9yZWREYXRhID09IG51bGwpIHtcclxuICAgICAgICB1c2VyRGF0YSA9IG51bGw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXNlckRhdGEgPSBKU09OLnBhcnNlKHN0b3JlZERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIikpO1xyXG4gICAgfVxyXG4gICAgdmFyIHNlcnZlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpO1xyXG4gICAgaWYgKHVzZXJEYXRhID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gc2Vzc2lvbiBkYXRhIGZvdW5kXCIpO1xyXG4gICAgICB0aGlzLkxvYWRlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vY2hlY2sgaWYgdG9rZW4gaXMgZXhwaXJlZCBvciBub3RcclxuICAgICAgc2VydmVyLkdldFVzZXJEYXRhKHVzZXJEYXRhLlNLLCB1c2VyRGF0YS5yb2xlVHlwZSwgdXNlckRhdGEudXNlclRva2VuLCAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBXcml0ZURhdGEoX2RhdGEpIHtcclxuICAgIGlmIChJc1dlYikge1xyXG4gICAgICB3aW5kb3cuQWxsRGF0YSA9IEpTT04uc3RyaW5naWZ5KF9kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJEYXRhXCIsIEpTT04uc3RyaW5naWZ5KF9kYXRhKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVmcmVzaERhdGEoX3Jlc3BvbnNlKSB7XHJcbiAgICBpZiAoX3Jlc3BvbnNlID09IDApIHtcclxuICAgICAgLy9tZWFucyBzdWNjZXNzZnVsXHJcbiAgICAgIHZhciB1c2VyRGF0YTtcclxuICAgICAgaWYgKElzV2ViKSB7XHJcbiAgICAgICAgdXNlckRhdGEgPSBKU09OLnBhcnNlKHdpbmRvdy5BbGxEYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckRhdGFcIikpO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHZhciBzZXJ2ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKTtcclxuICAgICAgICBzZXJ2ZXIuUmVsb2dpbkZyb21TdG9yYWdlKHVzZXJEYXRhKTtcclxuICAgICAgfSwgNTAwKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9LCAxMjAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vbm90IHN1Y2Nlc3NmdWxcclxuICAgICAgdGhpcy5Mb2FkZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHZhciBVSU1hbmFnID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKTtcclxuICAgICAgVUlNYW5hZy5TaG93VG9hc3QoXCJzZXNzaW9uIGV4cGlyZXMsIHBsZWFzZSBsb2dpbiBhZ2Fpbi5cIiwgMjQwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJEYXRhKCkge1xyXG4gICAgaWYgKElzV2ViKSB7XHJcbiAgICAgIHdpbmRvdy5BbGxEYXRhID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJEYXRhXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG4iXX0=