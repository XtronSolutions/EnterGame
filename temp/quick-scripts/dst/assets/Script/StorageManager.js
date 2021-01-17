
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
    GamePlayReferenceManager = null;
    this.Loader.active = true;
    var anim = this.Loader.children[0].children[1].getComponent(cc.Animation);
    anim.play('loading');
    this.CheckReferences();
    this.ReadData();
  },
  onEnable: function onEnable() {
    //events subscription to be called 
    cc.systemEvent.on('WriteData', this.WriteData, this);
    cc.systemEvent.on('RefreshData', this.RefreshData, this);
    cc.systemEvent.on('ClearData', this.ClearData, this);
  },
  onDisable: function onDisable() {
    cc.systemEvent.off('WriteData', this.WriteData, this);
    cc.systemEvent.on('RefreshData', this.RefreshData, this);
    cc.systemEvent.on('ClearData', this.ClearData, this);
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  ReadData: function ReadData() {
    var userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
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
    cc.sys.localStorage.setItem('userData', JSON.stringify(_data));
  },
  RefreshData: function RefreshData(_response) {
    var _this = this;

    if (_response == 0) {
      //means successful
      var userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTdG9yYWdlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJTdG9yYWdlTWFuYWdlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkxvYWRlciIsInR5cGUiLCJOb2RlIiwic2VyaWFsaXphYmxlIiwib25Mb2FkIiwiYWN0aXZlIiwiYW5pbSIsImNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50IiwiQW5pbWF0aW9uIiwicGxheSIsIkNoZWNrUmVmZXJlbmNlcyIsIlJlYWREYXRhIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiV3JpdGVEYXRhIiwiUmVmcmVzaERhdGEiLCJDbGVhckRhdGEiLCJvbkRpc2FibGUiLCJvZmYiLCJyZXF1aXJlIiwidXNlckRhdGEiLCJKU09OIiwicGFyc2UiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2VydmVyIiwiSW5zdGFuY2UiLCJHZXRfU2VydmVyQmFja2VuZCIsImNvbnNvbGUiLCJsb2ciLCJHZXRVc2VyRGF0YSIsImRhdGEiLCJTSyIsInJvbGVUeXBlIiwidXNlclRva2VuIiwiX2RhdGEiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiX3Jlc3BvbnNlIiwic2V0VGltZW91dCIsIlJlbG9naW5Gcm9tU3RvcmFnZSIsIlVJTWFuYWciLCJHZXRfVUlNYW5hZ2VyIiwiU2hvd1RvYXN0IiwicmVtb3ZlSXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBQyxJQUE3QjtBQUVBLElBQUlDLGNBQWMsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDMUJDLEVBQUFBLElBQUksRUFBQyxnQkFEcUI7QUFFMUIsYUFBU0YsRUFBRSxDQUFDRyxTQUZjO0FBSTFCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sSUFGTDtBQUdKQyxNQUFBQSxZQUFZLEVBQUU7QUFIVjtBQURBLEdBSmM7QUFZMUI7QUFFQUMsRUFBQUEsTUFkMEIsb0JBY2pCO0FBQ0xYLElBQUFBLHdCQUF3QixHQUFHLElBQTNCO0FBQ0EsU0FBS08sTUFBTCxDQUFZSyxNQUFaLEdBQXFCLElBQXJCO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtOLE1BQUwsQ0FBWU8sUUFBWixDQUFxQixDQUFyQixFQUF3QkEsUUFBeEIsQ0FBaUMsQ0FBakMsRUFBb0NDLFlBQXBDLENBQWlEYixFQUFFLENBQUNjLFNBQXBELENBQVg7QUFDQUgsSUFBQUEsSUFBSSxDQUFDSSxJQUFMLENBQVUsU0FBVjtBQUVBLFNBQUtDLGVBQUw7QUFDQSxTQUFLQyxRQUFMO0FBQ0gsR0F0QnlCO0FBd0IxQkMsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCO0FBQ0FsQixJQUFBQSxFQUFFLENBQUNtQixXQUFILENBQWVDLEVBQWYsQ0FBa0IsV0FBbEIsRUFBK0IsS0FBS0MsU0FBcEMsRUFBK0MsSUFBL0M7QUFDQXJCLElBQUFBLEVBQUUsQ0FBQ21CLFdBQUgsQ0FBZUMsRUFBZixDQUFrQixhQUFsQixFQUFpQyxLQUFLRSxXQUF0QyxFQUFtRCxJQUFuRDtBQUNBdEIsSUFBQUEsRUFBRSxDQUFDbUIsV0FBSCxDQUFlQyxFQUFmLENBQWtCLFdBQWxCLEVBQStCLEtBQUtHLFNBQXBDLEVBQStDLElBQS9DO0FBQ0QsR0E3QnVCO0FBK0IxQkMsRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ25CeEIsSUFBQUEsRUFBRSxDQUFDbUIsV0FBSCxDQUFlTSxHQUFmLENBQW1CLFdBQW5CLEVBQWdDLEtBQUtKLFNBQXJDLEVBQWdELElBQWhEO0FBQ0FyQixJQUFBQSxFQUFFLENBQUNtQixXQUFILENBQWVDLEVBQWYsQ0FBa0IsYUFBbEIsRUFBaUMsS0FBS0UsV0FBdEMsRUFBbUQsSUFBbkQ7QUFDQXRCLElBQUFBLEVBQUUsQ0FBQ21CLFdBQUgsQ0FBZUMsRUFBZixDQUFrQixXQUFsQixFQUErQixLQUFLRyxTQUFwQyxFQUErQyxJQUEvQztBQUNELEdBbkN1QjtBQXNDMUJQLEVBQUFBLGVBdEMwQiw2QkF1QzFCO0FBQ0ksUUFBRyxDQUFDbEIsd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFFLElBQTFELEVBQ0lBLHdCQUF3QixHQUFDNEIsT0FBTyxDQUFDLDBCQUFELENBQWhDO0FBQ1AsR0ExQ3lCO0FBNEMxQlQsRUFBQUEsUUE1QzBCLHNCQTZDMUI7QUFDSSxRQUFJVSxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXN0IsRUFBRSxDQUFDOEIsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixDQUFYLENBQWY7QUFDQSxRQUFJQyxNQUFNLEdBQUduQyx3QkFBd0IsQ0FBQ29DLFFBQXpCLENBQWtDQyxpQkFBbEMsRUFBYjs7QUFDQSxRQUFJUixRQUFRLEtBQUssSUFBakIsRUFDQTtBQUNJUyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx1QkFBWjtBQUNBLFdBQUtoQyxNQUFMLENBQVlLLE1BQVosR0FBcUIsS0FBckI7QUFDSCxLQUpELE1BS0E7QUFDSTtBQUNBO0FBQ0F1QixNQUFBQSxNQUFNLENBQUNLLFdBQVAsQ0FBbUJYLFFBQVEsQ0FBQ1ksSUFBVCxDQUFjQyxFQUFqQyxFQUFvQ2IsUUFBUSxDQUFDWSxJQUFULENBQWNFLFFBQWxELEVBQTJEZCxRQUFRLENBQUNZLElBQVQsQ0FBY0csU0FBekUsRUFBbUYsQ0FBbkY7QUFDSDtBQUNKLEdBMUR5QjtBQTREMUJyQixFQUFBQSxTQTVEMEIscUJBNERoQnNCLEtBNURnQixFQTZEMUI7QUFDSTNDLElBQUFBLEVBQUUsQ0FBQzhCLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQmEsT0FBcEIsQ0FBNEIsVUFBNUIsRUFBd0NoQixJQUFJLENBQUNpQixTQUFMLENBQWVGLEtBQWYsQ0FBeEM7QUFDSCxHQS9EeUI7QUFpRTFCckIsRUFBQUEsV0FqRTBCLHVCQWlFZHdCLFNBakVjLEVBa0UxQjtBQUFBOztBQUNJLFFBQUlBLFNBQVMsSUFBSSxDQUFqQixFQUFvQjtBQUFFO0FBQ2xCLFVBQUluQixRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXN0IsRUFBRSxDQUFDOEIsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixDQUFYLENBQWY7QUFDQWUsTUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYixZQUFJZCxNQUFNLEdBQUduQyx3QkFBd0IsQ0FBQ29DLFFBQXpCLENBQWtDQyxpQkFBbEMsRUFBYjtBQUNBRixRQUFBQSxNQUFNLENBQUNlLGtCQUFQLENBQTBCckIsUUFBMUI7QUFDSCxPQUhTLEVBR1AsR0FITyxDQUFWO0FBS0FvQixNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLFFBQUEsS0FBSSxDQUFDMUMsTUFBTCxDQUFZSyxNQUFaLEdBQXFCLEtBQXJCO0FBQ0gsT0FGUyxFQUVQLElBRk8sQ0FBVjtBQUdILEtBVkQsTUFVTztBQUFFO0FBQ0wsV0FBS0wsTUFBTCxDQUFZSyxNQUFaLEdBQXFCLEtBQXJCO0FBQ0EsVUFBSXVDLE9BQU8sR0FBR25ELHdCQUF3QixDQUFDb0MsUUFBekIsQ0FBa0NnQixhQUFsQyxFQUFkO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0UsU0FBUixDQUFrQixzQ0FBbEIsRUFBMEQsSUFBMUQ7QUFDSDtBQUNKLEdBbEZ5QjtBQW9GMUI1QixFQUFBQSxTQXBGMEIsdUJBcUYxQjtBQUNJdkIsSUFBQUEsRUFBRSxDQUFDOEIsR0FBSCxDQUFPQyxZQUFQLENBQW9CcUIsVUFBcEIsQ0FBK0IsVUFBL0I7QUFDSDtBQXZGeUIsQ0FBVCxDQUFyQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG5cclxudmFyIFN0b3JhZ2VNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlN0b3JhZ2VNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIExvYWRlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxvYWRlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBhbmltID0gdGhpcy5Mb2FkZXIuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgYW5pbS5wbGF5KCdsb2FkaW5nJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLlJlYWREYXRhKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZCBcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbignV3JpdGVEYXRhJywgdGhpcy5Xcml0ZURhdGEsIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKCdSZWZyZXNoRGF0YScsIHRoaXMuUmVmcmVzaERhdGEsIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKCdDbGVhckRhdGEnLCB0aGlzLkNsZWFyRGF0YSwgdGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICBcclxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZignV3JpdGVEYXRhJywgdGhpcy5Xcml0ZURhdGEsIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKCdSZWZyZXNoRGF0YScsIHRoaXMuUmVmcmVzaERhdGEsIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKCdDbGVhckRhdGEnLCB0aGlzLkNsZWFyRGF0YSwgdGhpcyk7XHJcbiAgICAgIH0sXHJcblxyXG5cclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVhZERhdGEoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB1c2VyRGF0YSA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyRGF0YScpKTtcclxuICAgICAgICB2YXIgc2VydmVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCk7XHJcbiAgICAgICAgaWYgKHVzZXJEYXRhID09PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyBzZXNzaW9uIGRhdGEgZm91bmRcIik7XHJcbiAgICAgICAgICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmVycm9yKHVzZXJEYXRhKTtcclxuICAgICAgICAgICAgLy9jaGVjayBpZiB0b2tlbiBpcyBleHBpcmVkIG9yIG5vdFxyXG4gICAgICAgICAgICBzZXJ2ZXIuR2V0VXNlckRhdGEodXNlckRhdGEuZGF0YS5TSyx1c2VyRGF0YS5kYXRhLnJvbGVUeXBlLHVzZXJEYXRhLmRhdGEudXNlclRva2VuLDApOyAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgV3JpdGVEYXRhKF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlckRhdGEnLCBKU09OLnN0cmluZ2lmeShfZGF0YSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZWZyZXNoRGF0YShfcmVzcG9uc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKF9yZXNwb25zZSA9PSAwKSB7IC8vbWVhbnMgc3VjY2Vzc2Z1bFxyXG4gICAgICAgICAgICB2YXIgdXNlckRhdGEgPSBKU09OLnBhcnNlKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlckRhdGEnKSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlcnZlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpO1xyXG4gICAgICAgICAgICAgICAgc2VydmVyLlJlbG9naW5Gcm9tU3RvcmFnZSh1c2VyRGF0YSk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCAxMjAwKTtcclxuICAgICAgICB9IGVsc2UgeyAvL25vdCBzdWNjZXNzZnVsXHJcbiAgICAgICAgICAgIHRoaXMuTG9hZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgVUlNYW5hZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIFVJTWFuYWcuU2hvd1RvYXN0KFwic2Vzc2lvbiBleHBpcmVzLCBwbGVhc2UgbG9naW4gYWdhaW4uXCIsIDI0MDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIENsZWFyRGF0YSgpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidXNlckRhdGFcIilcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=