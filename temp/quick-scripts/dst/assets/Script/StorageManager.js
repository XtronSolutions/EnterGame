
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
    console.log("V9"); // console.log = function () {};
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
    var userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
    var server = GamePlayReferenceManager.Instance.Get_ServerBackend();

    if (userData === null) {
      console.log("no session data found");
      this.Loader.active = false;
    } else {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTdG9yYWdlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJTdG9yYWdlTWFuYWdlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkxvYWRlciIsInR5cGUiLCJOb2RlIiwic2VyaWFsaXphYmxlIiwib25Mb2FkIiwiY29uc29sZSIsImxvZyIsImFjdGl2ZSIsImFuaW0iLCJjaGlsZHJlbiIsImdldENvbXBvbmVudCIsIkFuaW1hdGlvbiIsInBsYXkiLCJDaGVja1JlZmVyZW5jZXMiLCJSZWFkRGF0YSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIldyaXRlRGF0YSIsIlJlZnJlc2hEYXRhIiwiQ2xlYXJEYXRhIiwib25EaXNhYmxlIiwib2ZmIiwicmVxdWlyZSIsInVzZXJEYXRhIiwiSlNPTiIsInBhcnNlIiwic3lzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInNlcnZlciIsIkluc3RhbmNlIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJHZXRVc2VyRGF0YSIsImRhdGEiLCJTSyIsInJvbGVUeXBlIiwidXNlclRva2VuIiwiX2RhdGEiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiX3Jlc3BvbnNlIiwic2V0VGltZW91dCIsIlJlbG9naW5Gcm9tU3RvcmFnZSIsIlVJTWFuYWciLCJHZXRfVUlNYW5hZ2VyIiwiU2hvd1RvYXN0IiwicmVtb3ZlSXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBRyxJQUEvQjtBQUVBLElBQUlDLGNBQWMsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDNUJDLEVBQUFBLElBQUksRUFBRSxnQkFEc0I7QUFFNUIsYUFBU0YsRUFBRSxDQUFDRyxTQUZnQjtBQUk1QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLE1BQU0sRUFBRTtBQUNOLGlCQUFTLElB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RixLQUFmLENBQXhDO0FBQ0QsR0EzRDJCO0FBNkQ1Qm5CLEVBQUFBLFdBN0Q0Qix1QkE2RGhCc0IsU0E3RGdCLEVBNkRMO0FBQUE7O0FBQ3JCLFFBQUlBLFNBQVMsSUFBSSxDQUFqQixFQUFvQjtBQUNsQjtBQUNBLFVBQUlqQixRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXL0IsRUFBRSxDQUFDZ0MsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixDQUFYLENBQWY7QUFDQWEsTUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixZQUFJWixNQUFNLEdBQUdyQyx3QkFBd0IsQ0FBQ3NDLFFBQXpCLENBQWtDQyxpQkFBbEMsRUFBYjtBQUNBRixRQUFBQSxNQUFNLENBQUNhLGtCQUFQLENBQTBCbkIsUUFBMUI7QUFDRCxPQUhTLEVBR1AsR0FITyxDQUFWO0FBS0FrQixNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFFBQUEsS0FBSSxDQUFDMUMsTUFBTCxDQUFZTyxNQUFaLEdBQXFCLEtBQXJCO0FBQ0QsT0FGUyxFQUVQLElBRk8sQ0FBVjtBQUdELEtBWEQsTUFXTztBQUNMO0FBQ0EsV0FBS1AsTUFBTCxDQUFZTyxNQUFaLEdBQXFCLEtBQXJCO0FBQ0EsVUFBSXFDLE9BQU8sR0FBR25ELHdCQUF3QixDQUFDc0MsUUFBekIsQ0FBa0NjLGFBQWxDLEVBQWQ7QUFDQUQsTUFBQUEsT0FBTyxDQUFDRSxTQUFSLENBQWtCLHNDQUFsQixFQUEwRCxJQUExRDtBQUNEO0FBQ0YsR0EvRTJCO0FBaUY1QjFCLEVBQUFBLFNBakY0Qix1QkFpRmhCO0FBQ1Z6QixJQUFBQSxFQUFFLENBQUNnQyxHQUFILENBQU9DLFlBQVAsQ0FBb0JtQixVQUFwQixDQUErQixVQUEvQjtBQUNEO0FBbkYyQixDQUFULENBQXJCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuXHJcbnZhciBTdG9yYWdlTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlN0b3JhZ2VNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBMb2FkZXI6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJWOVwiKTtcclxuICAgIC8vIGNvbnNvbGUubG9nID0gZnVuY3Rpb24gKCkge307XHJcbiAgICAvLyAgY29uc29sZS5lcnJvciA9IGZ1bmN0aW9uICgpIHt9O1xyXG4gICAgLy8gY29uc29sZS53YXJuID0gZnVuY3Rpb24gKCkge307XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgdGhpcy5Mb2FkZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHZhciBhbmltID0gdGhpcy5Mb2FkZXIuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICBhbmltLnBsYXkoXCJsb2FkaW5nXCIpO1xyXG5cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLlJlYWREYXRhKCk7XHJcbiAgfSxcclxuXHJcbiAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vZXZlbnRzIHN1YnNjcmlwdGlvbiB0byBiZSBjYWxsZWRcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiV3JpdGVEYXRhXCIsIHRoaXMuV3JpdGVEYXRhLCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiUmVmcmVzaERhdGFcIiwgdGhpcy5SZWZyZXNoRGF0YSwgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIkNsZWFyRGF0YVwiLCB0aGlzLkNsZWFyRGF0YSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJXcml0ZURhdGFcIiwgdGhpcy5Xcml0ZURhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiUmVmcmVzaERhdGFcIiwgdGhpcy5SZWZyZXNoRGF0YSwgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJDbGVhckRhdGFcIiwgdGhpcy5DbGVhckRhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIFJlYWREYXRhKCkge1xyXG4gICAgdmFyIHVzZXJEYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyRGF0YVwiKSk7XHJcbiAgICB2YXIgc2VydmVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCk7XHJcbiAgICBpZiAodXNlckRhdGEgPT09IG51bGwpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJubyBzZXNzaW9uIGRhdGEgZm91bmRcIik7XHJcbiAgICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy9jaGVjayBpZiB0b2tlbiBpcyBleHBpcmVkIG9yIG5vdFxyXG4gICAgICBzZXJ2ZXIuR2V0VXNlckRhdGEodXNlckRhdGEuZGF0YS5TSywgdXNlckRhdGEuZGF0YS5yb2xlVHlwZSwgdXNlckRhdGEuZGF0YS51c2VyVG9rZW4sIDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFdyaXRlRGF0YShfZGF0YSkge1xyXG4gICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlckRhdGFcIiwgSlNPTi5zdHJpbmdpZnkoX2RhdGEpKTtcclxuICB9LFxyXG5cclxuICBSZWZyZXNoRGF0YShfcmVzcG9uc2UpIHtcclxuICAgIGlmIChfcmVzcG9uc2UgPT0gMCkge1xyXG4gICAgICAvL21lYW5zIHN1Y2Nlc3NmdWxcclxuICAgICAgdmFyIHVzZXJEYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyRGF0YVwiKSk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHZhciBzZXJ2ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKTtcclxuICAgICAgICBzZXJ2ZXIuUmVsb2dpbkZyb21TdG9yYWdlKHVzZXJEYXRhKTtcclxuICAgICAgfSwgNTAwKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9LCAxMjAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vbm90IHN1Y2Nlc3NmdWxcclxuICAgICAgdGhpcy5Mb2FkZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHZhciBVSU1hbmFnID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKTtcclxuICAgICAgVUlNYW5hZy5TaG93VG9hc3QoXCJzZXNzaW9uIGV4cGlyZXMsIHBsZWFzZSBsb2dpbiBhZ2Fpbi5cIiwgMjQwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJEYXRhKCkge1xyXG4gICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidXNlckRhdGFcIik7XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==