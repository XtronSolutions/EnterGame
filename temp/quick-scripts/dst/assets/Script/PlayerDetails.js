
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
    var _data = {
      Question: this.QuestionID,
      UserID: this.SelectedPlayerUserID,
      UserIndex: this.SelectedPlayerIndex
    };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(7, _data); //wait for other player

    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXJEZXRhaWxzLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlBsYXllckRldGFpbHMiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJQbGF5ZXJOYW1lTGFiZWwiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJJc09uZVF1ZXN0aW9uIiwiQm9vbGVhbiIsInRvb2xUaXAiLCJTZWxlY3RlZFBsYXllckluZGV4IiwiSW50ZWdlciIsIlNlbGVjdGVkUGxheWVyVXNlcklEIiwiVGV4dCIsIlF1ZXN0aW9uSUQiLCJvbkVuYWJsZSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJzZXRQbGF5ZXJJbmRleCIsIl9pbmRleCIsInNldFBsYXllck5hbWUiLCJfbmFtZSIsInN0cmluZyIsInNldFBsYXllclVJRCIsIl91SUQiLCJSYWlzZUV2ZW50T25lUXVlc3Rpb24iLCJfZGF0YSIsIlF1ZXN0aW9uIiwiVXNlcklEIiwiVXNlckluZGV4IiwiSW5zdGFuY2UiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNraXBwZWRMb2FuIiwiVGFrZW5Mb2FuIiwiSXNCYW5rcnVwdCIsIklzVHVyblNraXAiLCJJc0RvdWJsZVBheURheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBQyxJQUE3QjtBQUNBLElBQUlDLGFBQWEsR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdkJDLEVBQUFBLElBQUksRUFBQyxlQURrQjtBQUV2QixhQUFTRixFQUFFLENBQUNHLFNBRlc7QUFJdkJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxlQUFlLEVBQUU7QUFDYixpQkFB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V0FBS08sVUFBTCxHQUFnQixDQUFoQjtBQUNBLFdBQUtXLHFCQUFMO0FBQ0g7QUFDSixHQXpHc0I7QUEyR3ZCYyxFQUFBQSxjQTNHdUIsNEJBNEd2QjtBQUNJLFFBQUcsS0FBS2hDLGFBQVIsRUFDQTtBQUNJLFdBQUtPLFVBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxXQUFLVyxxQkFBTDtBQUNIO0FBQ0osR0FsSHNCLENBbUh2QjtBQUlBO0FBRUE7QUFFQTs7QUEzSHVCLENBQVQsQ0FBbEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFBsYXllckRldGFpbHM9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlBsYXllckRldGFpbHNcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWV9LFxyXG4gICAgICAgIElzT25lUXVlc3Rpb246IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbFRpcDpcIklzIGN1cnJlbnQgbm9kZSBjYW4gYmUgc2VsZWN0ZWQgYXMgb25lIHF1ZXN0aW9uIGZ1bmN0aW9uYWxpdHlcIn0sXHJcbiAgICAgICAgU2VsZWN0ZWRQbGF5ZXJJbmRleDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWV9LFxyXG4gICAgICAgIFNlbGVjdGVkUGxheWVyVXNlcklEOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZX0sXHJcbiAgICAgICAgUXVlc3Rpb25JRDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWV9LFxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgIH0sXHJcblxyXG4gICAgLy8jcmVnaW9uIE9uZSBRdWVzdGlvbiBzcGFjZSBmdW50aW9uYWxpdHlcclxuXHJcbiAgICAvL1F1ZXN0aW9uIDE6IGhhdmUgeW91IHNraXBwZWQgbG9hbiBwcmV2aW91cyBwYXlkYXk/XHJcbiAgICAvL1F1ZXN0aW9uIDI6IEhhdmUgeW91IHRha2VuIGFueSBsb2FuP1xyXG4gICAgLy9RdWVzdGlvbiAzOiBBcmUgeW91IGJhbmtydXB0ZWQ/IGlmIG1vcmUgdGhhbiBvbmNlLCB0ZWxsIG1lIHRoZSBhbW91bnQ/XHJcbiAgICAvL1F1ZXN0aW9uIDQ6IElzIHlvdXIgdHVybiBnb2luZyB0byBiZSBza2lwcGVkIG5leHQgdGltZT9cclxuICAgIC8vUXVlc3Rpb24gNTogSXMgaXQgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgeW91ciBuZXh0IHBheWRheT9cclxuICAgIHNldFBsYXllckluZGV4KF9pbmRleClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkUGxheWVySW5kZXg9X2luZGV4O1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRQbGF5ZXJOYW1lKF9uYW1lKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGxheWVyTmFtZUxhYmVsLnN0cmluZz1fbmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0UGxheWVyVUlEKF91SUQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZFBsYXllclVzZXJJRD1fdUlEO1xyXG4gICAgfSxcclxuXHJcbiAgICBSYWlzZUV2ZW50T25lUXVlc3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZGF0YT17UXVlc3Rpb246dGhpcy5RdWVzdGlvbklELFVzZXJJRDp0aGlzLlNlbGVjdGVkUGxheWVyVXNlcklELFVzZXJJbmRleDp0aGlzLlNlbGVjdGVkUGxheWVySW5kZXh9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNyxfZGF0YSk7XHJcblxyXG4gICAgICAgIC8vd2FpdCBmb3Igb3RoZXIgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTa2lwcGVkTG9hbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5Jc09uZVF1ZXN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5RdWVzdGlvbklEPTE7XHJcbiAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBUYWtlbkxvYW4oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuSXNPbmVRdWVzdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUXVlc3Rpb25JRD0yO1xyXG4gICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgSXNCYW5rcnVwdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5Jc09uZVF1ZXN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5RdWVzdGlvbklEPTM7XHJcbiAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBJc1R1cm5Ta2lwKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLklzT25lUXVlc3Rpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlF1ZXN0aW9uSUQ9NDtcclxuICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIElzRG91YmxlUGF5RGF5KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLklzT25lUXVlc3Rpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlF1ZXN0aW9uSUQ9NTtcclxuICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gXHJcblxyXG4gICAgLy8gc3RhcnQgKCkge1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=