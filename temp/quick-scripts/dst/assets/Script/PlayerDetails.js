
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/PlayerDetails.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df154D/jRROcIFVB+J2MR4e', 'PlayerDetails');
// Script/PlayerDetails.js

"use strict";

var GamePlayReferenceManager = null;
var PlayerDetails = cc.Class({
  name: "PlayerDetails",
  "extends": cc.Component,
  properties: {
    PlayerNameLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    IsOneQuestion: {
      "default": false,
      type: cc.Boolean,
      serializable: true,
      toolTip: "Is current node can be selected as one question functionality"
    },
    SelectedPlayerIndex: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    },
    SelectedPlayerUserID: {
      "default": "",
      type: cc.Text,
      serializable: true
    },
    QuestionID: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    }
  },
  onEnable: function onEnable() {
    this.CheckReferences();
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  //#region One Question space funtionality
  //Question 1: have you skipped loan previous payday?
  //Question 2: Have you taken any loan?
  //Question 3: Are you bankrupted? if more than once, tell me the amount?
  //Question 4: Is your turn going to be skipped next time?
  //Question 5: Is it going to be double pay day your next payday?
  setPlayerIndex: function setPlayerIndex(_index) {
    this.SelectedPlayerIndex = _index;
  },
  setPlayerName: function setPlayerName(_name) {
    this.PlayerNameLabel.string = _name;
  },
  setPlayerUID: function setPlayerUID(_uID) {
    this.SelectedPlayerUserID = _uID;
  },
  RaiseEventOneQuestion: function RaiseEventOneQuestion() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      var _data = {
        Question: this.QuestionID,
        UserID: this.SelectedPlayerUserID,
        UserIndex: this.SelectedPlayerIndex
      };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(7, _data); //wait for other player

      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(true);
    } else {
      console.log("no sending question to bot");
    }
  },
  SkippedLoan: function SkippedLoan() {
    if (this.IsOneQuestion) {
      this.QuestionID = 1;
      this.RaiseEventOneQuestion();
    }
  },
  TakenLoan: function TakenLoan() {
    if (this.IsOneQuestion) {
      this.QuestionID = 2;
      this.RaiseEventOneQuestion();
    }
  },
  IsBankrupt: function IsBankrupt() {
    if (this.IsOneQuestion) {
      this.QuestionID = 3;
      this.RaiseEventOneQuestion();
    }
  },
  IsTurnSkip: function IsTurnSkip() {
    if (this.IsOneQuestion) {
      this.QuestionID = 4;
      this.RaiseEventOneQuestion();
    }
  },
  IsDoublePayDay: function IsDoublePayDay() {
    if (this.IsOneQuestion) {
      this.QuestionID = 5;
      this.RaiseEventOneQuestion();
    }
  } // LIFE-CYCLE CALLBACKS:
  // start () {
  // },
  // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXJEZXRhaWxzLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlBsYXllckRldGFpbHMiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJQbGF5ZXJOYW1lTGFiZWwiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJJc09uZVF1ZXN0aW9uIiwiQm9vbGVhbiIsInRvb2xUaXAiLCJTZWxlY3RlZFBsYXllckluZGV4IiwiSW50ZWdlciIsIlNlbGVjdGVkUGxheWVyVXNlcklEIiwiVGV4dCIsIlF1ZXN0aW9uSUQiLCJvbkVuYWJsZSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJzZXRQbGF5ZXJJbmRleCIsIl9pbmRleCIsInNldFBsYXllck5hbWUiLCJfbmFtZSIsInN0cmluZyIsInNldFBsYXllclVJRCIsIl91SUQiLCJSYWlzZUV2ZW50T25lUXVlc3Rpb24iLCJJbnN0YW5jZSIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRTZWxlY3RlZE1vZGUiLCJfZGF0YSIsIlF1ZXN0aW9uIiwiVXNlcklEIiwiVXNlckluZGV4IiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJSYWlzZUV2ZW50IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJjb25zb2xlIiwibG9nIiwiU2tpcHBlZExvYW4iLCJUYWtlbkxvYW4iLCJJc0JhbmtydXB0IiwiSXNUdXJuU2tpcCIsIklzRG91YmxlUGF5RGF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsYUFBYSxHQUFDQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN2QkMsRUFBQUEsSUFBSSxFQUFDLGVBRGtCO0FBRXZCLGFBQVNGLEVBQUUsQ0FB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QUw7QUFDSDtBQUNKLEdBOUZzQjtBQWdHdkJnQixFQUFBQSxVQWhHdUIsd0JBaUd2QjtBQUNJLFFBQUcsS0FBS2xDLGFBQVIsRUFDQTtBQUNJLFdBQUtPLFVBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxXQUFLVyxxQkFBTDtBQUNIO0FBQ0osR0F2R3NCO0FBeUd2QmlCLEVBQUFBLFVBekd1Qix3QkEwR3ZCO0FBQ0ksUUFBRyxLQUFLbkMsYUFBUixFQUNBO0FBQ0ksV0FBS08sVUFBTCxHQUFnQixDQUFoQjtBQUNBLFdBQUtXLHFCQUFMO0FBQ0g7QUFDSixHQWhIc0I7QUFrSHZCa0IsRUFBQUEsY0FsSHVCLDRCQW1IdkI7QUFDSSxRQUFHLEtBQUtwQyxhQUFSLEVBQ0E7QUFDSSxXQUFLTyxVQUFMLEdBQWdCLENBQWhCO0FBQ0EsV0FBS1cscUJBQUw7QUFDSDtBQUNKLEdBekhzQixDQTBIdkI7QUFJQTtBQUVBO0FBRUE7O0FBbEl1QixDQUFULENBQWxCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBQbGF5ZXJEZXRhaWxzPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJQbGF5ZXJEZXRhaWxzXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlfSxcclxuICAgICAgICBJc09uZVF1ZXN0aW9uOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2xUaXA6XCJJcyBjdXJyZW50IG5vZGUgY2FuIGJlIHNlbGVjdGVkIGFzIG9uZSBxdWVzdGlvbiBmdW5jdGlvbmFsaXR5XCJ9LFxyXG4gICAgICAgIFNlbGVjdGVkUGxheWVySW5kZXg6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlfSxcclxuICAgICAgICBTZWxlY3RlZFBsYXllclVzZXJJRDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWV9LFxyXG4gICAgICAgIFF1ZXN0aW9uSUQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlfSxcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgICB9LFxyXG5cclxuICAgIC8vI3JlZ2lvbiBPbmUgUXVlc3Rpb24gc3BhY2UgZnVudGlvbmFsaXR5XHJcblxyXG4gICAgLy9RdWVzdGlvbiAxOiBoYXZlIHlvdSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1xyXG4gICAgLy9RdWVzdGlvbiAyOiBIYXZlIHlvdSB0YWtlbiBhbnkgbG9hbj9cclxuICAgIC8vUXVlc3Rpb24gMzogQXJlIHlvdSBiYW5rcnVwdGVkPyBpZiBtb3JlIHRoYW4gb25jZSwgdGVsbCBtZSB0aGUgYW1vdW50P1xyXG4gICAgLy9RdWVzdGlvbiA0OiBJcyB5b3VyIHR1cm4gZ29pbmcgdG8gYmUgc2tpcHBlZCBuZXh0IHRpbWU/XHJcbiAgICAvL1F1ZXN0aW9uIDU6IElzIGl0IGdvaW5nIHRvIGJlIGRvdWJsZSBwYXkgZGF5IHlvdXIgbmV4dCBwYXlkYXk/XHJcbiAgICBzZXRQbGF5ZXJJbmRleChfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZFBsYXllckluZGV4PV9pbmRleDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0UGxheWVyTmFtZShfbmFtZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllck5hbWVMYWJlbC5zdHJpbmc9X25hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFBsYXllclVJRChfdUlEKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQ9X3VJRDtcclxuICAgIH0sXHJcblxyXG4gICAgUmFpc2VFdmVudE9uZVF1ZXN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpPT0yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9kYXRhPXtRdWVzdGlvbjp0aGlzLlF1ZXN0aW9uSUQsVXNlcklEOnRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQsVXNlckluZGV4OnRoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleH07XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNyxfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAvL3dhaXQgZm9yIG90aGVyIHBsYXllclxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gc2VuZGluZyBxdWVzdGlvbiB0byBib3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTa2lwcGVkTG9hbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5Jc09uZVF1ZXN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5RdWVzdGlvbklEPTE7XHJcbiAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBUYWtlbkxvYW4oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuSXNPbmVRdWVzdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUXVlc3Rpb25JRD0yO1xyXG4gICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgSXNCYW5rcnVwdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5Jc09uZVF1ZXN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5RdWVzdGlvbklEPTM7XHJcbiAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBJc1R1cm5Ta2lwKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLklzT25lUXVlc3Rpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlF1ZXN0aW9uSUQ9NDtcclxuICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIElzRG91YmxlUGF5RGF5KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLklzT25lUXVlc3Rpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlF1ZXN0aW9uSUQ9NTtcclxuICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gXHJcblxyXG4gICAgLy8gc3RhcnQgKCkge1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=