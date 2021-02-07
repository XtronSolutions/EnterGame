
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
var QuestionsData = null;
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
    IsPlayerSelectProfit: {
      "default": false,
      type: cc.Boolean,
      serializable: true
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
    },
    QuestionNode: {
      "default": null,
      type: cc.Node,
      serializable: true
    }
  },
  onEnable: function onEnable() {
    this.CheckReferences();

    if (this.IsOneQuestion) {
      this.VocQuestion = false;
      this.EstQuestion = false;
      this.ToastMessage = "";

      if (this.QuestionNode) {
        this.QuestionRef = null; // console.log(this.QuestionRef);
      }
    }
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager"); // if (!QuestionsData || QuestionsData == null) QuestionsData = require("QuestionsData");
  },
  //#region One Question space funtionality
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
    this.QuestionRef = GamePlayReferenceManager.Instance.Get_QuestionsData();

    var _Qdata;

    if (this.VocQuestion) {
      console.log("voc");
      _Qdata = this.QuestionRef.VocabularyQuestions[this.QuestionID];
    } else if (this.EstQuestion) {
      console.log("est");
      _Qdata = this.QuestionRef.EstablishmentQuestions[this.QuestionID];
    }

    console.log(_Qdata);

    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      this.ToastMessage = "You have asked following question:" + "\n" + _Qdata.Question + "\n" + "A. " + _Qdata.Option1 + "\n" + "B. " + _Qdata.Option2 + "\n" + "C. " + _Qdata.Option3 + "\n" + "D. " + _Qdata.Option4 + "\n" + "\n" + "waiting for player to answer....";
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(true);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowQuestionToast(this.ToastMessage);
      var _data = {
        Question: this.QuestionID,
        UserID: this.SelectedPlayerUserID,
        UserIndex: this.SelectedPlayerIndex,
        IsVoc: this.VocQuestion
      };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(7, _data); //wait for other player

      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(true);
    } else {
      console.log("no sending question to bot");
    }
  },
  RaiseEventSelectPlayerForProfit: function RaiseEventSelectPlayerForProfit() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      this.ToastMessage = "You will receive next all payday profits of player " + this.PlayerNameLabel.string;
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(this.ToastMessage, 3200);

      var _gameplayManager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = _gameplayManager.GetTurnNumber();

      var _iD = _gameplayManager.PlayerGameInfo[_playerIndex].PlayerUID;
      var _name = _gameplayManager.PlayerGameInfo[_playerIndex].PlayerName;
      var _data = {
        OwnPlayerID: _iD,
        UserID: this.SelectedPlayerUserID,
        UserIndex: this.SelectedPlayerIndex,
        UserName: _name
      };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(17, _data);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitAlongTurnOver_SelectPlayerForProfit();
    } else {
      console.log("no selecting player for profit with bot");
    }
  },
  AskVocabularyQuestion: function AskVocabularyQuestion() {
    if (this.IsOneQuestion) {
      this.QuestionID = this.getRandom(0, 12);
      this.VocQuestion = true;
      this.EstQuestion = false;
      this.RaiseEventOneQuestion();
    }
  },
  SelectPlayerForProfit: function SelectPlayerForProfit() {
    if (this.IsPlayerSelectProfit) {
      this.RaiseEventSelectPlayerForProfit();
    }
  },
  AskEstablishmentQuestion: function AskEstablishmentQuestion() {
    if (this.IsOneQuestion) {
      this.QuestionID = this.getRandom(0, 12);
      this.VocQuestion = false;
      this.EstQuestion = true;
      this.RaiseEventOneQuestion();
    }
  },
  getRandom: function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min included and max excluded
  } //   SkippedLoan() {
  //     if (this.IsOneQuestion) {
  //       this.QuestionID = 1;
  //       this.RaiseEventOneQuestion();
  //     }
  //   },
  //   TakenLoan() {
  //     if (this.IsOneQuestion) {
  //       this.QuestionID = 2;
  //       this.RaiseEventOneQuestion();
  //     }
  //   },
  //   IsBankrupt() {
  //     if (this.IsOneQuestion) {
  //       this.QuestionID = 3;
  //       this.RaiseEventOneQuestion();
  //     }
  //   },
  //   IsTurnSkip() {
  //     if (this.IsOneQuestion) {
  //       this.QuestionID = 4;
  //       this.RaiseEventOneQuestion();
  //     }
  //   },
  //   IsDoublePayDay() {
  //     if (this.IsOneQuestion) {
  //       this.QuestionID = 5;
  //       this.RaiseEventOneQuestion();
  //     }
  //   },
  // LIFE-CYCLE CALLBACKS:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXJEZXRhaWxzLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlF1ZXN0aW9uc0RhdGEiLCJQbGF5ZXJEZXRhaWxzIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwiSXNPbmVRdWVzdGlvbiIsIkJvb2xlYW4iLCJ0b29sVGlwIiwiSXNQbGF5ZXJTZWxlY3RQcm9maXQiLCJTZWxlY3RlZFBsYXllckluZGV4IiwiSW50ZWdlciIsIlNlbGVjdGVkUGxheWVyVXNlcklEIiwiVGV4dCIsIlF1ZXN0aW9uSUQiLCJRdWVzdGlvbk5vZGUiLCJOb2RlIiwib25FbmFibGUiLCJDaGVja1JlZmVyZW5jZXMiLCJWb2NRdWVzdGlvbiIsIkVzdFF1ZXN0aW9uIiwiVG9hc3RNZXNzYWdlIiwiUXVlc3Rpb25SZWYiLCJyZXF1aXJlIiwic2V0UGxheWVySW5kZXgiLCJfaW5kZXgiLCJzZXRQbGF5ZXJOYW1lIiwiX25hbWUiLCJzdHJpbmciLCJzZXRQbGF5ZXJVSUQiLCJfdUlEIiwiUmFpc2VFdmVudE9uZVF1ZXN0aW9uIiwiSW5zdGFuY2UiLCJHZXRfUXVlc3Rpb25zRGF0YSIsIl9RZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJWb2NhYnVsYXJ5UXVlc3Rpb25zIiwiRXN0YWJsaXNobWVudFF1ZXN0aW9ucyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRTZWxlY3RlZE1vZGUiLCJRdWVzdGlvbiIsIk9wdGlvbjEiLCJPcHRpb24yIiwiT3B0aW9uMyIsIk9wdGlvbjQiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNob3dRdWVzdGlvblRvYXN0IiwiX2RhdGEiLCJVc2VySUQiLCJVc2VySW5kZXgiLCJJc1ZvYyIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiUmFpc2VFdmVudCIsIlJhaXNlRXZlbnRTZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJTaG93VG9hc3QiLCJfZ2FtZXBsYXlNYW5hZ2VyIiwiR2V0X0dhbWVNYW5hZ2VyIiwiX3BsYXllckluZGV4IiwiR2V0VHVybk51bWJlciIsIl9pRCIsIlBsYXllckdhbWVJbmZvIiwiUGxheWVyVUlEIiwiUGxheWVyTmFtZSIsIk93blBsYXllcklEIiwiVXNlck5hbWUiLCJFeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJBc2tWb2NhYnVsYXJ5UXVlc3Rpb24iLCJnZXRSYW5kb20iLCJTZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJBc2tFc3RhYmxpc2htZW50UXVlc3Rpb24iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUcsSUFBL0I7QUFDQSxJQUFJQyxhQUFhLEdBQUcsSUFBcEI7QUFDQSxJQUFJQyxhQUFhLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUUsZUFEcUI7QUFFM0IsYUFBU0YsRUFBRSxDQUFDRyxTQUZlO0FBSTNCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsZUFBZSxFQUFFO0FBQ2YsaUJBQVMsSUFETTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FGTTtBQUdmQyxNQUFBQSxZQUFZLEVBQUU7QUFIQyxLQURQO0FBTVZDLElBQUFBLGFBQWEsRUFBRTtBQUNiLGlCQUFTLEtBREk7QUFFYkgsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNVLE9BRkk7QUFHYkYsTUFBQUEsWUFBWSxFQUFFLElBSEQ7QUFJYkcsTUFBQUEsT0FBTyxFQUFFO0FBSkksS0FOTDtBQVlWQyxJQUFBQSxvQkFBb0IsRUFBRTtBQUNwQixpQkFBUyxLQURXO0FBRXBCTixNQUFB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LEdBQW1CLElBQW5CO0FBQ0EsV0FBS0MsV0FBTCxHQUFtQixLQUFuQjtBQUNBLFdBQUtXLHFCQUFMO0FBQ0Q7QUFDRixHQWhJMEI7QUFrSTNCdUMsRUFBQUEscUJBbEkyQixtQ0FrSUg7QUFDdEIsUUFBSSxLQUFLN0Qsb0JBQVQsRUFBK0I7QUFDN0IsV0FBSzhDLCtCQUFMO0FBQ0Q7QUFDRixHQXRJMEI7QUF3STNCZ0IsRUFBQUEsd0JBeEkyQixzQ0F3SUE7QUFDekIsUUFBSSxLQUFLakUsYUFBVCxFQUF3QjtBQUN0QixXQUFLUSxVQUFMLEdBQWtCLEtBQUt1RCxTQUFMLENBQWUsQ0FBZixFQUFrQixFQUFsQixDQUFsQjtBQUNBLFdBQUtsRCxXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsV0FBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNBLFdBQUtXLHFCQUFMO0FBQ0Q7QUFDRixHQS9JMEI7QUFpSjNCc0MsRUFBQUEsU0FBUyxFQUFFLG1CQUFVRyxHQUFWLEVBQWVDLEdBQWYsRUFBb0I7QUFDN0IsV0FBT0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQkgsR0FBRyxHQUFHRCxHQUF2QixDQUFYLElBQTBDQSxHQUFqRCxDQUQ2QixDQUN5QjtBQUN2RCxHQW5KMEIsQ0FxSjNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBOztBQTdMMkIsQ0FBVCxDQUFwQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBRdWVzdGlvbnNEYXRhID0gbnVsbDtcclxudmFyIFBsYXllckRldGFpbHMgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQbGF5ZXJEZXRhaWxzXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBJc09uZVF1ZXN0aW9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2xUaXA6IFwiSXMgY3VycmVudCBub2RlIGNhbiBiZSBzZWxlY3RlZCBhcyBvbmUgcXVlc3Rpb24gZnVuY3Rpb25hbGl0eVwiLFxyXG4gICAgfSxcclxuICAgIElzUGxheWVyU2VsZWN0UHJvZml0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0ZWRQbGF5ZXJJbmRleDoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0ZWRQbGF5ZXJVc2VySUQ6IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFF1ZXN0aW9uSUQ6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFF1ZXN0aW9uTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIG9uRW5hYmxlKCkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuXHJcbiAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgICAgIHRoaXMuVm9jUXVlc3Rpb24gPSBmYWxzZTtcclxuICAgICAgdGhpcy5Fc3RRdWVzdGlvbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlRvYXN0TWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgIGlmICh0aGlzLlF1ZXN0aW9uTm9kZSkge1xyXG4gICAgICAgIHRoaXMuUXVlc3Rpb25SZWYgPSBudWxsO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUXVlc3Rpb25SZWYpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgICAvLyBpZiAoIVF1ZXN0aW9uc0RhdGEgfHwgUXVlc3Rpb25zRGF0YSA9PSBudWxsKSBRdWVzdGlvbnNEYXRhID0gcmVxdWlyZShcIlF1ZXN0aW9uc0RhdGFcIik7XHJcbiAgfSxcclxuXHJcbiAgLy8jcmVnaW9uIE9uZSBRdWVzdGlvbiBzcGFjZSBmdW50aW9uYWxpdHlcclxuICBzZXRQbGF5ZXJJbmRleChfaW5kZXgpIHtcclxuICAgIHRoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleCA9IF9pbmRleDtcclxuICB9LFxyXG5cclxuICBzZXRQbGF5ZXJOYW1lKF9uYW1lKSB7XHJcbiAgICB0aGlzLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbmFtZTtcclxuICB9LFxyXG5cclxuICBzZXRQbGF5ZXJVSUQoX3VJRCkge1xyXG4gICAgdGhpcy5TZWxlY3RlZFBsYXllclVzZXJJRCA9IF91SUQ7XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCkge1xyXG4gICAgdGhpcy5RdWVzdGlvblJlZiA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfUXVlc3Rpb25zRGF0YSgpO1xyXG4gICAgdmFyIF9RZGF0YTtcclxuICAgIGlmICh0aGlzLlZvY1F1ZXN0aW9uKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwidm9jXCIpO1xyXG4gICAgICBfUWRhdGEgPSB0aGlzLlF1ZXN0aW9uUmVmLlZvY2FidWxhcnlRdWVzdGlvbnNbdGhpcy5RdWVzdGlvbklEXTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5Fc3RRdWVzdGlvbikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVzdFwiKTtcclxuICAgICAgX1FkYXRhID0gdGhpcy5RdWVzdGlvblJlZi5Fc3RhYmxpc2htZW50UXVlc3Rpb25zW3RoaXMuUXVlc3Rpb25JRF07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coX1FkYXRhKTtcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKSA9PSAyKSB7XHJcbiAgICAgIHRoaXMuVG9hc3RNZXNzYWdlID0gXCJZb3UgaGF2ZSBhc2tlZCBmb2xsb3dpbmcgcXVlc3Rpb246XCIgKyBcIlxcblwiICsgX1FkYXRhLlF1ZXN0aW9uICsgXCJcXG5cIiArIFwiQS4gXCIgKyBfUWRhdGEuT3B0aW9uMSArIFwiXFxuXCIgKyBcIkIuIFwiICsgX1FkYXRhLk9wdGlvbjIgKyBcIlxcblwiICsgXCJDLiBcIiArIF9RZGF0YS5PcHRpb24zICsgXCJcXG5cIiArIFwiRC4gXCIgKyBfUWRhdGEuT3B0aW9uNCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJ3YWl0aW5nIGZvciBwbGF5ZXIgdG8gYW5zd2VyLi4uLlwiO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UXVlc3Rpb25Ub2FzdCh0aGlzLlRvYXN0TWVzc2FnZSk7XHJcblxyXG4gICAgICB2YXIgX2RhdGEgPSB7IFF1ZXN0aW9uOiB0aGlzLlF1ZXN0aW9uSUQsIFVzZXJJRDogdGhpcy5TZWxlY3RlZFBsYXllclVzZXJJRCwgVXNlckluZGV4OiB0aGlzLlNlbGVjdGVkUGxheWVySW5kZXgsIElzVm9jOiB0aGlzLlZvY1F1ZXN0aW9uIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNywgX2RhdGEpO1xyXG5cclxuICAgICAgLy93YWl0IGZvciBvdGhlciBwbGF5ZXJcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJubyBzZW5kaW5nIHF1ZXN0aW9uIHRvIGJvdFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50U2VsZWN0UGxheWVyRm9yUHJvZml0KCkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCkgPT0gMikge1xyXG4gICAgICB0aGlzLlRvYXN0TWVzc2FnZSA9IFwiWW91IHdpbGwgcmVjZWl2ZSBuZXh0IGFsbCBwYXlkYXkgcHJvZml0cyBvZiBwbGF5ZXIgXCIgKyB0aGlzLlBsYXllck5hbWVMYWJlbC5zdHJpbmc7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QodGhpcy5Ub2FzdE1lc3NhZ2UsIDMyMDApO1xyXG5cclxuICAgICAgdmFyIF9nYW1lcGxheU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBfZ2FtZXBsYXlNYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF9pRCA9IF9nYW1lcGxheU1hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJVSUQ7XHJcbiAgICAgIHZhciBfbmFtZSA9IF9nYW1lcGxheU1hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgICAgdmFyIF9kYXRhID0geyBPd25QbGF5ZXJJRDogX2lELCBVc2VySUQ6IHRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQsIFVzZXJJbmRleDogdGhpcy5TZWxlY3RlZFBsYXllckluZGV4LCBVc2VyTmFtZTogX25hbWUgfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNywgX2RhdGEpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyRm9yUHJvZml0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vIHNlbGVjdGluZyBwbGF5ZXIgZm9yIHByb2ZpdCB3aXRoIGJvdFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBc2tWb2NhYnVsYXJ5UXVlc3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgICAgIHRoaXMuUXVlc3Rpb25JRCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDEyKTtcclxuICAgICAgdGhpcy5Wb2NRdWVzdGlvbiA9IHRydWU7XHJcbiAgICAgIHRoaXMuRXN0UXVlc3Rpb24gPSBmYWxzZTtcclxuICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJGb3JQcm9maXQoKSB7XHJcbiAgICBpZiAodGhpcy5Jc1BsYXllclNlbGVjdFByb2ZpdCkge1xyXG4gICAgICB0aGlzLlJhaXNlRXZlbnRTZWxlY3RQbGF5ZXJGb3JQcm9maXQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBc2tFc3RhYmxpc2htZW50UXVlc3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgICAgIHRoaXMuUXVlc3Rpb25JRCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDEyKTtcclxuICAgICAgdGhpcy5Wb2NRdWVzdGlvbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkVzdFF1ZXN0aW9uID0gdHJ1ZTtcclxuICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRSYW5kb206IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICB9LFxyXG5cclxuICAvLyAgIFNraXBwZWRMb2FuKCkge1xyXG4gIC8vICAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgLy8gICAgICAgdGhpcy5RdWVzdGlvbklEID0gMTtcclxuICAvLyAgICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9LFxyXG5cclxuICAvLyAgIFRha2VuTG9hbigpIHtcclxuICAvLyAgICAgaWYgKHRoaXMuSXNPbmVRdWVzdGlvbikge1xyXG4gIC8vICAgICAgIHRoaXMuUXVlc3Rpb25JRCA9IDI7XHJcbiAgLy8gICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSxcclxuXHJcbiAgLy8gICBJc0JhbmtydXB0KCkge1xyXG4gIC8vICAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgLy8gICAgICAgdGhpcy5RdWVzdGlvbklEID0gMztcclxuICAvLyAgICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9LFxyXG5cclxuICAvLyAgIElzVHVyblNraXAoKSB7XHJcbiAgLy8gICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAvLyAgICAgICB0aGlzLlF1ZXN0aW9uSUQgPSA0O1xyXG4gIC8vICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0sXHJcblxyXG4gIC8vICAgSXNEb3VibGVQYXlEYXkoKSB7XHJcbiAgLy8gICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAvLyAgICAgICB0aGlzLlF1ZXN0aW9uSUQgPSA1O1xyXG4gIC8vICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0sXHJcbiAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gIC8vIHN0YXJ0ICgpIHtcclxuXHJcbiAgLy8gfSxcclxuXHJcbiAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=