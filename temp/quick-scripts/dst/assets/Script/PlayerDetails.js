
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
var _gameManager = null;
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
      this.QuestionAsked = false;
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
      var isActive = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetActiveStatus(this.SelectedPlayerUserID);

      if (isActive) {
        this.ToastMessage = "You have asked following question:" + "\n" + _Qdata.Question + "\n" + "A. " + _Qdata.Option1 + "\n" + "B. " + _Qdata.Option2 + "\n" + "C. " + _Qdata.Option3 + "\n" + "D. " + _Qdata.Option4 + "\n" + "\n" + "waiting for player to answer...."; //GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(true);

        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowQuestionToast(this.ToastMessage);
        var _data = {
          Question: this.QuestionID,
          UserID: this.SelectedPlayerUserID,
          UserIndex: this.SelectedPlayerIndex,
          IsVoc: this.VocQuestion
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(7, _data); //wait for other player

        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(true);
        _gameManager = GamePlayReferenceManager.Instance.Get_GameManager();
        this.QuestionAsked = true;
      } else {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("current selected player is not active anymore.");
      }
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
      var _index = GamePlayReferenceManager.Instance.Get_GameManager().GetVocabularyQuestionsIndex();

      if (_index == -1) {
        console.log("index -1 received");
        this.AskVocabularyQuestion();
      } else {
        this.QuestionID = _index; //this.QuestionID = this.getRandom(0, 12);

        this.VocQuestion = true;
        this.EstQuestion = false;
        this.RaiseEventOneQuestion();
      }
    }
  },
  SelectPlayerForProfit: function SelectPlayerForProfit() {
    if (this.IsPlayerSelectProfit) {
      this.RaiseEventSelectPlayerForProfit();
    }
  },
  AskEstablishmentQuestion: function AskEstablishmentQuestion() {
    if (this.IsOneQuestion) {
      var _index = GamePlayReferenceManager.Instance.Get_GameManager().GetEstablishmentQuestionsIndex();

      if (_index == -1) {
        console.log("index -1 received");
        this.AskEstablishmentQuestion();
      } else {
        this.QuestionID = _index; //this.QuestionID = this.getRandom(0, 12);

        this.VocQuestion = false;
        this.EstQuestion = true;
        this.RaiseEventOneQuestion();
      }
    }
  },
  getRandom: function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min included and max excluded
  },
  update: function update(dt) {
    if (this.QuestionAsked) {
      if (_gameManager.PlayerGameInfo[this.SelectedPlayerIndex].PlayerUID == this.SelectedPlayerUserID && _gameManager.PlayerGameInfo[this.SelectedPlayerIndex].IsActive == false) {
        this.QuestionAsked = false;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("current selected player is not active anymore, skipping turn.");
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(false);
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitAlongTurnOver_OneQuestionSetupUI();
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXJEZXRhaWxzLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlF1ZXN0aW9uc0RhdGEiLCJfZ2FtZU1hbmFnZXIiLCJQbGF5ZXJEZXRhaWxzIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwiSXNPbmVRdWVzdGlvbiIsIkJvb2xlYW4iLCJ0b29sVGlwIiwiSXNQbGF5ZXJTZWxlY3RQcm9maXQiLCJTZWxlY3RlZFBsYXllckluZGV4IiwiSW50ZWdlciIsIlNlbGVjdGVkUGxheWVyVXNlcklEIiwiVGV4dCIsIlF1ZXN0aW9uSUQiLCJRdWVzdGlvbk5vZGUiLCJOb2RlIiwib25FbmFibGUiLCJDaGVja1JlZmVyZW5jZXMiLCJRdWVzdGlvbkFza2VkIiwiVm9jUXVlc3Rpb24iLCJFc3RRdWVzdGlvbiIsIlRvYXN0TWVzc2FnZSIsIlF1ZXN0aW9uUmVmIiwicmVxdWlyZSIsInNldFBsYXllckluZGV4IiwiX2luZGV4Iiwic2V0UGxheWVyTmFtZSIsIl9uYW1lIiwic3RyaW5nIiwic2V0UGxheWVyVUlEIiwiX3VJRCIsIlJhaXNlRXZlbnRPbmVRdWVzdGlvbiIsIkluc3RhbmNlIiwiR2V0X1F1ZXN0aW9uc0RhdGEiLCJfUWRhdGEiLCJjb25zb2xlIiwibG9nIiwiVm9jYWJ1bGFyeVF1ZXN0aW9ucyIsIkVzdGFibGlzaG1lbnRRdWVzdGlvbnMiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiaXNBY3RpdmUiLCJHZXRBY3RpdmVTdGF0dXMiLCJRdWVzdGlvbiIsIk9wdGlvbjEiLCJPcHRpb24yIiwiT3B0aW9uMyIsIk9wdGlvbjQiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93UXVlc3Rpb25Ub2FzdCIsIl9kYXRhIiwiVXNlcklEIiwiVXNlckluZGV4IiwiSXNWb2MiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIkdldF9HYW1lTWFuYWdlciIsIlNob3dUb2FzdCIsIlJhaXNlRXZlbnRTZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJfZ2FtZXBsYXlNYW5hZ2VyIiwiX3BsYXllckluZGV4IiwiR2V0VHVybk51bWJlciIsIl9pRCIsIlBsYXllckdhbWVJbmZvIiwiUGxheWVyVUlEIiwiUGxheWVyTmFtZSIsIk93blBsYXllcklEIiwiVXNlck5hbWUiLCJFeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJBc2tWb2NhYnVsYXJ5UXVlc3Rpb24iLCJHZXRWb2NhYnVsYXJ5UXVlc3Rpb25zSW5kZXgiLCJTZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJBc2tFc3RhYmxpc2htZW50UXVlc3Rpb24iLCJHZXRFc3RhYmxpc2htZW50UXVlc3Rpb25zSW5kZXgiLCJnZXRSYW5kb20iLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ1cGRhdGUiLCJkdCIsIklzQWN0aXZlIiwiRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLElBQXBCO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLElBQW5CO0FBQ0EsSUFBSUMsYUFBYSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMzQkMsRUFBQUEsSUFBSSxFQUFFLGVBRHFCO0FBRTNCLGFBQVNGLEVBQUUsQ0FBQ0csU0FGZTtBQUkzQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLGVBQWUsRUFBRTtBQUNmLGlCQUFTLElBRE07QUFFZkMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLEtBRk07QUFHZkMs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RztBQUNBaEUsUUFBQUEsd0JBQXdCLENBQUN3QyxRQUF6QixDQUFrQ2dCLHFCQUFsQyxHQUEwRG9DLG9DQUExRDtBQUNEO0FBQ0Y7QUFDRixHQXJMMEIsQ0F1TDNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBOztBQS9OMkIsQ0FBVCxDQUFwQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBRdWVzdGlvbnNEYXRhID0gbnVsbDtcclxudmFyIF9nYW1lTWFuYWdlciA9IG51bGw7XHJcbnZhciBQbGF5ZXJEZXRhaWxzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGxheWVyRGV0YWlsc1wiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSXNPbmVRdWVzdGlvbjoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sVGlwOiBcIklzIGN1cnJlbnQgbm9kZSBjYW4gYmUgc2VsZWN0ZWQgYXMgb25lIHF1ZXN0aW9uIGZ1bmN0aW9uYWxpdHlcIixcclxuICAgIH0sXHJcbiAgICBJc1BsYXllclNlbGVjdFByb2ZpdDoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdGVkUGxheWVySW5kZXg6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdGVkUGxheWVyVXNlcklEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBRdWVzdGlvbklEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBRdWVzdGlvbk5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBvbkVuYWJsZSgpIHtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuSXNPbmVRdWVzdGlvbikge1xyXG4gICAgICB0aGlzLlF1ZXN0aW9uQXNrZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5Wb2NRdWVzdGlvbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkVzdFF1ZXN0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuVG9hc3RNZXNzYWdlID0gXCJcIjtcclxuICAgICAgaWYgKHRoaXMuUXVlc3Rpb25Ob2RlKSB7XHJcbiAgICAgICAgdGhpcy5RdWVzdGlvblJlZiA9IG51bGw7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5RdWVzdGlvblJlZik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICAgIC8vIGlmICghUXVlc3Rpb25zRGF0YSB8fCBRdWVzdGlvbnNEYXRhID09IG51bGwpIFF1ZXN0aW9uc0RhdGEgPSByZXF1aXJlKFwiUXVlc3Rpb25zRGF0YVwiKTtcclxuICB9LFxyXG5cclxuICAvLyNyZWdpb24gT25lIFF1ZXN0aW9uIHNwYWNlIGZ1bnRpb25hbGl0eVxyXG4gIHNldFBsYXllckluZGV4KF9pbmRleCkge1xyXG4gICAgdGhpcy5TZWxlY3RlZFBsYXllckluZGV4ID0gX2luZGV4O1xyXG4gIH0sXHJcblxyXG4gIHNldFBsYXllck5hbWUoX25hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9uYW1lO1xyXG4gIH0sXHJcblxyXG4gIHNldFBsYXllclVJRChfdUlEKSB7XHJcbiAgICB0aGlzLlNlbGVjdGVkUGxheWVyVXNlcklEID0gX3VJRDtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50T25lUXVlc3Rpb24oKSB7XHJcbiAgICB0aGlzLlF1ZXN0aW9uUmVmID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9RdWVzdGlvbnNEYXRhKCk7XHJcbiAgICB2YXIgX1FkYXRhO1xyXG4gICAgaWYgKHRoaXMuVm9jUXVlc3Rpb24pIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ2b2NcIik7XHJcbiAgICAgIF9RZGF0YSA9IHRoaXMuUXVlc3Rpb25SZWYuVm9jYWJ1bGFyeVF1ZXN0aW9uc1t0aGlzLlF1ZXN0aW9uSURdO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLkVzdFF1ZXN0aW9uKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZXN0XCIpO1xyXG4gICAgICBfUWRhdGEgPSB0aGlzLlF1ZXN0aW9uUmVmLkVzdGFibGlzaG1lbnRRdWVzdGlvbnNbdGhpcy5RdWVzdGlvbklEXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhfUWRhdGEpO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpID09IDIpIHtcclxuICAgICAgdmFyIGlzQWN0aXZlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRBY3RpdmVTdGF0dXModGhpcy5TZWxlY3RlZFBsYXllclVzZXJJRCk7XHJcblxyXG4gICAgICBpZiAoaXNBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLlRvYXN0TWVzc2FnZSA9IFwiWW91IGhhdmUgYXNrZWQgZm9sbG93aW5nIHF1ZXN0aW9uOlwiICsgXCJcXG5cIiArIF9RZGF0YS5RdWVzdGlvbiArIFwiXFxuXCIgKyBcIkEuIFwiICsgX1FkYXRhLk9wdGlvbjEgKyBcIlxcblwiICsgXCJCLiBcIiArIF9RZGF0YS5PcHRpb24yICsgXCJcXG5cIiArIFwiQy4gXCIgKyBfUWRhdGEuT3B0aW9uMyArIFwiXFxuXCIgKyBcIkQuIFwiICsgX1FkYXRhLk9wdGlvbjQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwid2FpdGluZyBmb3IgcGxheWVyIHRvIGFuc3dlci4uLi5cIjtcclxuICAgICAgICAvL0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSh0cnVlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1F1ZXN0aW9uVG9hc3QodGhpcy5Ub2FzdE1lc3NhZ2UpO1xyXG5cclxuICAgICAgICB2YXIgX2RhdGEgPSB7IFF1ZXN0aW9uOiB0aGlzLlF1ZXN0aW9uSUQsIFVzZXJJRDogdGhpcy5TZWxlY3RlZFBsYXllclVzZXJJRCwgVXNlckluZGV4OiB0aGlzLlNlbGVjdGVkUGxheWVySW5kZXgsIElzVm9jOiB0aGlzLlZvY1F1ZXN0aW9uIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg3LCBfZGF0YSk7XHJcblxyXG4gICAgICAgIC8vd2FpdCBmb3Igb3RoZXIgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIF9nYW1lTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLlF1ZXN0aW9uQXNrZWQgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJjdXJyZW50IHNlbGVjdGVkIHBsYXllciBpcyBub3QgYWN0aXZlIGFueW1vcmUuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vIHNlbmRpbmcgcXVlc3Rpb24gdG8gYm90XCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRTZWxlY3RQbGF5ZXJGb3JQcm9maXQoKSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKSA9PSAyKSB7XHJcbiAgICAgIHRoaXMuVG9hc3RNZXNzYWdlID0gXCJZb3Ugd2lsbCByZWNlaXZlIG5leHQgYWxsIHBheWRheSBwcm9maXRzIG9mIHBsYXllciBcIiArIHRoaXMuUGxheWVyTmFtZUxhYmVsLnN0cmluZztcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdCh0aGlzLlRvYXN0TWVzc2FnZSwgMzIwMCk7XHJcblxyXG4gICAgICB2YXIgX2dhbWVwbGF5TWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9nYW1lcGxheU1hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX2lEID0gX2dhbWVwbGF5TWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllclVJRDtcclxuICAgICAgdmFyIF9uYW1lID0gX2dhbWVwbGF5TWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgICB2YXIgX2RhdGEgPSB7IE93blBsYXllcklEOiBfaUQsIFVzZXJJRDogdGhpcy5TZWxlY3RlZFBsYXllclVzZXJJRCwgVXNlckluZGV4OiB0aGlzLlNlbGVjdGVkUGxheWVySW5kZXgsIFVzZXJOYW1lOiBfbmFtZSB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE3LCBfZGF0YSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gc2VsZWN0aW5nIHBsYXllciBmb3IgcHJvZml0IHdpdGggYm90XCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFza1ZvY2FidWxhcnlRdWVzdGlvbigpIHtcclxuICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAgICAgdmFyIF9pbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRWb2NhYnVsYXJ5UXVlc3Rpb25zSW5kZXgoKTtcclxuICAgICAgaWYgKF9pbmRleCA9PSAtMSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW5kZXggLTEgcmVjZWl2ZWRcIik7XHJcbiAgICAgICAgdGhpcy5Bc2tWb2NhYnVsYXJ5UXVlc3Rpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlF1ZXN0aW9uSUQgPSBfaW5kZXg7XHJcbiAgICAgICAgLy90aGlzLlF1ZXN0aW9uSUQgPSB0aGlzLmdldFJhbmRvbSgwLCAxMik7XHJcbiAgICAgICAgdGhpcy5Wb2NRdWVzdGlvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5Fc3RRdWVzdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJGb3JQcm9maXQoKSB7XHJcbiAgICBpZiAodGhpcy5Jc1BsYXllclNlbGVjdFByb2ZpdCkge1xyXG4gICAgICB0aGlzLlJhaXNlRXZlbnRTZWxlY3RQbGF5ZXJGb3JQcm9maXQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBc2tFc3RhYmxpc2htZW50UXVlc3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgICAgIHZhciBfaW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0RXN0YWJsaXNobWVudFF1ZXN0aW9uc0luZGV4KCk7XHJcbiAgICAgIGlmIChfaW5kZXggPT0gLTEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImluZGV4IC0xIHJlY2VpdmVkXCIpO1xyXG4gICAgICAgIHRoaXMuQXNrRXN0YWJsaXNobWVudFF1ZXN0aW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5RdWVzdGlvbklEID0gX2luZGV4O1xyXG4gICAgICAgIC8vdGhpcy5RdWVzdGlvbklEID0gdGhpcy5nZXRSYW5kb20oMCwgMTIpO1xyXG4gICAgICAgIHRoaXMuVm9jUXVlc3Rpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkVzdFF1ZXN0aW9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0UmFuZG9tOiBmdW5jdGlvbiAobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlKGR0KSB7XHJcbiAgICBpZiAodGhpcy5RdWVzdGlvbkFza2VkKSB7XHJcbiAgICAgIGlmIChfZ2FtZU1hbmFnZXIuUGxheWVyR2FtZUluZm9bdGhpcy5TZWxlY3RlZFBsYXllckluZGV4XS5QbGF5ZXJVSUQgPT0gdGhpcy5TZWxlY3RlZFBsYXllclVzZXJJRCAmJiBfZ2FtZU1hbmFnZXIuUGxheWVyR2FtZUluZm9bdGhpcy5TZWxlY3RlZFBsYXllckluZGV4XS5Jc0FjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuUXVlc3Rpb25Bc2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJjdXJyZW50IHNlbGVjdGVkIHBsYXllciBpcyBub3QgYWN0aXZlIGFueW1vcmUsIHNraXBwaW5nIHR1cm4uXCIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gICBTa2lwcGVkTG9hbigpIHtcclxuICAvLyAgICAgaWYgKHRoaXMuSXNPbmVRdWVzdGlvbikge1xyXG4gIC8vICAgICAgIHRoaXMuUXVlc3Rpb25JRCA9IDE7XHJcbiAgLy8gICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSxcclxuXHJcbiAgLy8gICBUYWtlbkxvYW4oKSB7XHJcbiAgLy8gICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAvLyAgICAgICB0aGlzLlF1ZXN0aW9uSUQgPSAyO1xyXG4gIC8vICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0sXHJcblxyXG4gIC8vICAgSXNCYW5rcnVwdCgpIHtcclxuICAvLyAgICAgaWYgKHRoaXMuSXNPbmVRdWVzdGlvbikge1xyXG4gIC8vICAgICAgIHRoaXMuUXVlc3Rpb25JRCA9IDM7XHJcbiAgLy8gICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSxcclxuXHJcbiAgLy8gICBJc1R1cm5Ta2lwKCkge1xyXG4gIC8vICAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgLy8gICAgICAgdGhpcy5RdWVzdGlvbklEID0gNDtcclxuICAvLyAgICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9LFxyXG5cclxuICAvLyAgIElzRG91YmxlUGF5RGF5KCkge1xyXG4gIC8vICAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgLy8gICAgICAgdGhpcy5RdWVzdGlvbklEID0gNTtcclxuICAvLyAgICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9LFxyXG4gIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAvLyBzdGFydCAoKSB7XHJcblxyXG4gIC8vIH0sXHJcblxyXG4gIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19