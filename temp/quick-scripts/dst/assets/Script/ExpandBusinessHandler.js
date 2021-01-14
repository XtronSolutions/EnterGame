
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ExpandBusinessHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '940bcbqJ6BPF6bh1jTohAra', 'ExpandBusinessHandler');
// Script/ExpandBusinessHandler.js

"use strict";

var GamePlayReferenceManager = null;
var ExpandBusinessHandler = cc.Class({
  name: "ExpandBusinessHandler",
  "extends": cc.Component,
  properties: {
    BusinessIndex: {
      "default": -1,
      type: cc.integer,
      serializable: true
    },
    NameLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    LocationEditBox: {
      "default": null,
      type: cc.EditBox,
      serializable: true
    },
    IsCardFunctionality: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    GivenCash: {
      "default": 0,
      type: cc.integer,
      serializable: true
    },
    StartAnyBusinessWithoutCash: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    }
  },
  // LIFE-CYCLE CALLBACKS:
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  onLoad: function onLoad() {
    this.LocationText = "";
    this.CheckReferences();
  },
  onLocationTextChanged: function onLocationTextChanged(txt) {
    this.LocationText = txt;
  },
  SetName: function SetName(name) {
    this.NameLabel.string = name;
  },
  SetBusinessIndex: function SetBusinessIndex(_index) {
    this.BusinessIndex = _index;
  },
  SetCardFunctionality: function SetCardFunctionality(_state) {
    this.IsCardFunctionality = _state;
  },
  SetGivenCash: function SetGivenCash(_amount) {
    this.GivenCash = _amount;
  },
  SetStartAnyBusinessWithoutCash: function SetStartAnyBusinessWithoutCash(_state) {
    this.StartAnyBusinessWithoutCash = _state;
  },
  ResetEditBox: function ResetEditBox() {
    this.LocationEditBox.string = "";
  },
  OnExpandButtonClicked: function OnExpandButtonClicked() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) this.CheckReferences();

    if (this.LocationText == "") {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("please enter new location name for this business.", 2000);
    } else {
      if (this.IsCardFunctionality) {
        if (this.StartAnyBusinessWithoutCash) {} else {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().onLocationNameChanged_ExpandBusiness_TurnDecision(this.LocationText);
          GamePlayReferenceManager.Instance.Get_GameManager().ExpandBusiness_TurnDecision(25000, this.BusinessIndex, this.LocationText, this.IsCardFunctionality, this.GivenCash, this.StartAnyBusinessWithoutCash);
        }
      } else {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().onLocationNameChanged_ExpandBusiness_TurnDecision(this.LocationText);
        GamePlayReferenceManager.Instance.Get_GameManager().ExpandBusiness_TurnDecision(25000, this.BusinessIndex, this.LocationText);
      }
    }
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxFeHBhbmRCdXNpbmVzc0hhbmRsZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiQnVzaW5lc3NJbmRleCIsInR5cGUiLCJpbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiTmFtZUxhYmVsIiwiTGFiZWwiLCJMb2NhdGlvbkVkaXRCb3giLCJFZGl0Qm94IiwiSXNDYXJkRnVuY3Rpb25hbGl0eSIsIkJvb2xlYW4iLCJHaXZlbkNhc2giLCJTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwib25Mb2FkIiwiTG9jYXRpb25UZXh0Iiwib25Mb2NhdGlvblRleHRDaGFuZ2VkIiwidHh0IiwiU2V0TmFtZSIsInN0cmluZyIsIlNldEJ1c2luZXNzSW5kZXgiLCJfaW5kZXgiLCJTZXRDYXJkRnVuY3Rpb25hbGl0eSIsIl9zdGF0ZSIsIlNldEdpdmVuQ2FzaCIsIl9hbW91bnQiLCJTZXRTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJSZXNldEVkaXRCb3giLCJPbkV4cGFuZEJ1dHRvbkNsaWNrZWQiLCJJbnN0YW5jZSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlNob3dUb2FzdCIsIm9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iLCJHZXRfR2FtZU1hbmFnZXIiLCJFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUMsSUFBN0I7QUFDQSxJQUFJQyxxQkFBcUIsR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDL0JDLEVBQUFBLElBQUksRUFBQyx1QkFEMEI7QUFFL0IsYUFBU0YsRUFBRSxD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QVQsRUFBOEI7QUFDMUIsWUFBSSxLQUFLRywyQkFBVCxFQUNBLENBRUMsQ0FIRCxNQUtBO0FBQ0lsQixVQUFBQSx3QkFBd0IsQ0FBQ29DLFFBQXpCLENBQWtDQyxxQkFBbEMsR0FBMERFLGlEQUExRCxDQUE0RyxLQUFLakIsWUFBakg7QUFDQXRCLFVBQUFBLHdCQUF3QixDQUFDb0MsUUFBekIsQ0FBa0NJLGVBQWxDLEdBQW9EQywyQkFBcEQsQ0FBZ0YsS0FBaEYsRUFBdUYsS0FBS2xDLGFBQTVGLEVBQTJHLEtBQUtlLFlBQWhILEVBQTZILEtBQUtQLG1CQUFsSSxFQUFzSixLQUFLRSxTQUEzSixFQUFxSyxLQUFLQywyQkFBMUs7QUFDSDtBQUNKLE9BVkQsTUFXSztBQUNEbEIsUUFBQUEsd0JBQXdCLENBQUNvQyxRQUF6QixDQUFrQ0MscUJBQWxDLEdBQTBERSxpREFBMUQsQ0FBNEcsS0FBS2pCLFlBQWpIO0FBQ0F0QixRQUFBQSx3QkFBd0IsQ0FBQ29DLFFBQXpCLENBQWtDSSxlQUFsQyxHQUFvREMsMkJBQXBELENBQWdGLEtBQWhGLEVBQXVGLEtBQUtsQyxhQUE1RixFQUEyRyxLQUFLZSxZQUFoSDtBQUNIO0FBQ0o7QUFDSixHQWxIOEIsQ0FvSC9COztBQXBIK0IsQ0FBVCxDQUExQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgRXhwYW5kQnVzaW5lc3NIYW5kbGVyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgQnVzaW5lc3NJbmRleDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAtMSxcclxuICAgICAgICAgICAgdHlwZTogY2MuaW50ZWdlciwgXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsIFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgTG9jYXRpb25FZGl0Qm94OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsIFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSXNDYXJkRnVuY3Rpb25hbGl0eToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbiwgXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEdpdmVuQ2FzaDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5pbnRlZ2VyLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgICB9LFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLkxvY2F0aW9uVGV4dD1cIlwiO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9jYXRpb25UZXh0Q2hhbmdlZCh0eHQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Mb2NhdGlvblRleHQ9dHh0O1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXROYW1lKG5hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5OYW1lTGFiZWwuc3RyaW5nPW5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldEJ1c2luZXNzSW5kZXgoX2luZGV4KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NJbmRleD1faW5kZXg7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldENhcmRGdW5jdGlvbmFsaXR5KF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLklzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBfc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldEdpdmVuQ2FzaChfYW1vdW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR2l2ZW5DYXNoID0gX2Ftb3VudDtcclxuICAgIH0sXHJcblxyXG4gICAgU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IF9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRFZGl0Qm94KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxvY2F0aW9uRWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgIH0sXHJcblxyXG4gICAgT25FeHBhbmRCdXR0b25DbGlja2VkKClcclxuICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5Mb2NhdGlvblRleHQ9PVwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwicGxlYXNlIGVudGVyIG5ldyBsb2NhdGlvbiBuYW1lIGZvciB0aGlzIGJ1c2luZXNzLlwiLDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Jc0NhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLm9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24odGhpcy5Mb2NhdGlvblRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oMjUwMDAsIHRoaXMuQnVzaW5lc3NJbmRleCwgdGhpcy5Mb2NhdGlvblRleHQsdGhpcy5Jc0NhcmRGdW5jdGlvbmFsaXR5LHRoaXMuR2l2ZW5DYXNoLHRoaXMuU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKTsgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkub25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbih0aGlzLkxvY2F0aW9uVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKDI1MDAwLCB0aGlzLkJ1c2luZXNzSW5kZXgsIHRoaXMuTG9jYXRpb25UZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=