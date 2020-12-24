
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
  ResetEditBox: function ResetEditBox() {
    this.LocationEditBox.string = "";
  },
  OnExpandButtonClicked: function OnExpandButtonClicked() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) this.CheckReferences();

    if (this.LocationText == "") {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("please enter new location name for this business.", 2000);
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().onLocationNameChanged_ExpandBusiness_TurnDecision(this.LocationText);
      GamePlayReferenceManager.Instance.Get_GameManager().ExpandBusiness_TurnDecision(25000, this.BusinessIndex, this.LocationText);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxFeHBhbmRCdXNpbmVzc0hhbmRsZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiQnVzaW5lc3NJbmRleCIsInR5cGUiLCJpbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiTmFtZUxhYmVsIiwiTGFiZWwiLCJMb2NhdGlvbkVkaXRCb3giLCJFZGl0Qm94IiwiQ2hlY2tSZWZlcmVuY2VzIiwicmVxdWlyZSIsIm9uTG9hZCIsIkxvY2F0aW9uVGV4dCIsIm9uTG9jYXRpb25UZXh0Q2hhbmdlZCIsInR4dCIsIlNldE5hbWUiLCJzdHJpbmciLCJTZXRCdXNpbmVzc0luZGV4IiwiX2luZGV4IiwiUmVzZXRFZGl0Qm94IiwiT25FeHBhbmRCdXR0b25DbGlja2VkIiwiSW5zdGFuY2UiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93VG9hc3QiLCJvbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiR2V0X0dhbWVNYW5hZ2VyIiwiRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMscUJBQXFCLEdBQUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQy9CQyxFQUFBQSxJQUFJLEVBQUMsdUJBRDBCO0FBRS9CLGFBQVNGLEVBQUUsQ0FBQ0csU0FGbUI7QUFJL0JDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxhQUFhLEVBQUU7QUFDWCxpQkFBUyxDQUFDLENBREM7QUFFWEMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLE9BRkU7QUFHWEMsTUFBQUEsWUFBWSxFQUFFO0FBSEgsS0FEUDtBQU9SQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxJQURGO0FBRVBILE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDVSxLQUZGO0FBR1BGLE1BQUFBLFlBQVksRUFBRTtBQUhQLEtBUEg7QUFhUkcsSUFBQUEsZUFBZSxFQUFFO0FBQ2IsaUJBQVMsSUFESTtBQUViTCxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ1ksT0FGSTtBQUdiSixNQUFBQSxZQUFZLEVBQUU7QUFIRDtBQWJULEdBSm1CO0FBd0IvQjtBQUVBSyxFQUFBQSxlQTFCK0IsNkJBMkI5QjtBQUNHLFFBQUcsQ0FBQ2Ysd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFFLElBQTFELEVBQ0FBLHdCQUF3QixHQUFDZ0IsT0FBTyxDQUFDLDBCQUFELENBQWhDO0FBQ0YsR0E5QjZCO0FBK0IvQkMsRUFBQUEsTUEvQitCLG9CQStCckI7QUFDTixTQUFLQyxZQUFMLEdBQWtCLEVBQWxCO0FBQ0EsU0FBS0gsZUFBTDtBQUNILEdBbEM4QjtBQW9DL0JJLEVBQUFBLHFCQXBDK0IsaUNBb0NUQyxHQXBDUyxFQXFDL0I7QUFDSSxTQUFLRixZQUFMLEdBQWtCRSxHQUFsQjtBQUNILEdBdkM4QjtBQXlDL0JDLEVBQUFBLE9BekMrQixtQkF5Q3ZCakIsSUF6Q3VCLEVBMEMvQjtBQUNJLFNBQUtPLFNBQUwsQ0FBZVcsTUFBZixHQUFzQmxCLElBQXRCO0FBQ0gsR0E1QzhCO0FBOEMvQm1CLEVBQUFBLGdCQTlDK0IsNEJBOENkQyxNQTlDYyxFQStDL0I7QUFDSSxTQUFLakIsYUFBTCxHQUFtQmlCLE1BQW5CO0FBQ0gsR0FqRDhCO0FBbUQvQkMsRUFBQUEsWUFuRCtCLDBCQW9EL0I7QUFDSSxTQUFLWixlQUFMLENBQXFCUyxNQUFyQixHQUE0QixFQUE1QjtBQUNILEdBdEQ4QjtBQXdEL0JJLEVBQUFBLHFCQXhEK0IsbUNBeUQvQjtBQUNJLFFBQUcsQ0FBQzFCLHdCQUFELElBQTZCQSx3QkFBd0IsSUFBRSxJQUExRCxFQUNJLEtBQUtlLGVBQUw7O0FBRUosUUFBRyxLQUFLRyxZQUFMLElBQW1CLEVBQXRCLEVBQ0E7QUFDSWxCLE1BQUFBLHdCQUF3QixDQUFDMkIsUUFBekIsQ0FBa0NDLHFCQUFsQyxHQUEwREMsU0FBMUQsQ0FBb0UsbURBQXBFLEVBQXdILElBQXhIO0FBQ0gsS0FIRCxNQUtBO0FBQ0k3QixNQUFBQSx3QkFBd0IsQ0FBQzJCLFFBQXpCLENBQWtDQyxxQkFBbEMsR0FBMERFLGlEQUExRCxDQUE0RyxLQUFLWixZQUFqSDtBQUNBbEIsTUFBQUEsd0JBQXdCLENBQUMyQixRQUF6QixDQUFrQ0ksZUFBbEMsR0FBb0RDLDJCQUFwRCxDQUFnRixLQUFoRixFQUFzRixLQUFLekIsYUFBM0YsRUFBeUcsS0FBS1csWUFBOUc7QUFDSDtBQUNKLEdBdEU4QixDQXdFL0I7O0FBeEUrQixDQUFULENBQTFCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBFeHBhbmRCdXNpbmVzc0hhbmRsZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBCdXNpbmVzc0luZGV4OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IC0xLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5pbnRlZ2VyLCBcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCwgXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBMb2NhdGlvbkVkaXRCb3g6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveCwgXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5Mb2NhdGlvblRleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvY2F0aW9uVGV4dENoYW5nZWQodHh0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTG9jYXRpb25UZXh0PXR4dDtcclxuICAgIH0sXHJcblxyXG4gICAgU2V0TmFtZShuYW1lKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTmFtZUxhYmVsLnN0cmluZz1uYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRCdXNpbmVzc0luZGV4KF9pbmRleClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzSW5kZXg9X2luZGV4O1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXNldEVkaXRCb3goKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTG9jYXRpb25FZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbkV4cGFuZEJ1dHRvbkNsaWNrZWQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG5cclxuICAgICAgICBpZih0aGlzLkxvY2F0aW9uVGV4dD09XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGVhc2UgZW50ZXIgbmV3IGxvY2F0aW9uIG5hbWUgZm9yIHRoaXMgYnVzaW5lc3MuXCIsMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5vbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKHRoaXMuTG9jYXRpb25UZXh0KTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbigyNTAwMCx0aGlzLkJ1c2luZXNzSW5kZXgsdGhpcy5Mb2NhdGlvblRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=