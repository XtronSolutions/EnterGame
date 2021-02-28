
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
      serializable: true
    },
    IsPlayerSelectProfit: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    IsPlayerBusinessTakeOver: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    IsPlayerDamaging: {
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
    },
    BuyHalfBusiness: {
      "default": false,
      type: cc.Boolean,
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
  setBuyHalf: function setBuyHalf(_state) {
    this.BuyHalfBusiness = _state;
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
  SelectPlayerBusinessTakeOver: function SelectPlayerBusinessTakeOver() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      var isActive = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetActiveStatus(this.SelectedPlayerUserID);

      if (isActive) {
        if (this.BuyHalfBusiness == false) {
          var _gameplayManager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _data = _gameplayManager.PlayerGameInfo[this.SelectedPlayerIndex];
          console.log(_data);
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().Exit_SelectPlayerGeneric();
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableScreen__BusinessTakeOver(true, _data, this.SelectedPlayerIndex);
        } //condition for card : Choose a player and buy half of one of their businesses. Roll two die, multiply by $3,000 and pay the player that amount for 50% interest in their business. You can choose not to, but you must make that choice before you roll.
        else {
            var _gameplayManager = GamePlayReferenceManager.Instance.Get_GameManager();

            var _data = _gameplayManager.PlayerGameInfo[this.SelectedPlayerIndex];
            var _businessLength = _data.NoOfBusiness.length;
            var _businessCounter = 0;

            for (var index = 0; index < _data.NoOfBusiness.length; index++) {
              if (_data.NoOfBusiness[index].IsPartnership) {
                _businessCounter++;
              }
            }

            if (_businessCounter >= _businessLength) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("All existing businesses of player are with partnership with someone.");
            } else {
              console.log(_data);
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().Exit_SelectPlayerGeneric();
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().EnableScreen__BusinessTakeOver(true, _data, this.SelectedPlayerIndex, true);
            }
          }
      } else {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("current selected player is not active anymore.");
      }
    } else {
      console.log("no selecting player with bot");
    }
  },
  SelectPlayerBusinessDamaging: function SelectPlayerBusinessDamaging() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      var isActive = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetActiveStatus(this.SelectedPlayerUserID);
      var IsBankRupted = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetBankruptedStatus(this.SelectedPlayerUserID);

      if (isActive) {
        //GamePlayReferenceManager.Instance.Get_GameplayUIManager().Exit_SelectPlayerGeneric();
        if (IsBankRupted) {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("current selected player is already bankrupted this turn.");
        } else {
          var _gameplayManager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _data = _gameplayManager.PlayerGameInfo[this.SelectedPlayerIndex];
          var _sentdata = {
            Player: _data,
            PlayerIndex: this.SelectedPlayerIndex,
            MyUserID: _gameplayManager.PlayerGameInfo[_gameplayManager.GetTurnNumber()].PlayerUID
          };
          GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(24, _sentdata);
          _gameManager = GamePlayReferenceManager.Instance.Get_GameManager();

          if (this.IsPlayerDamaging) {
            this.WaitingForReply = true;
          } //wait for other player


          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(true);
          console.log(_sentdata);
        }
      } else {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("current selected player is not active anymore.");
      }
    } else {
      console.log("no selecting player with bot");
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
  SelectPlayerTakeOver: function SelectPlayerTakeOver() {
    if (this.IsPlayerBusinessTakeOver) {
      this.SelectPlayerBusinessTakeOver();
    }
  },
  SelectPlayerDamaging: function SelectPlayerDamaging() {
    if (this.IsPlayerDamaging) {
      this.SelectPlayerBusinessDamaging();
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

    if (this.IsPlayerDamaging && this.WaitingForReply) {
      if (_gameManager.PlayerGameInfo[this.SelectedPlayerIndex].PlayerUID == this.SelectedPlayerUserID && _gameManager.PlayerGameInfo[this.SelectedPlayerIndex].IsActive == false) {
        this.WaitingForReply = false;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("current selected player is not active anymore, skipping turn.");
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(false);
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitAlongTurnOver_SelectPlayerGeneric();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXJEZXRhaWxzLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlF1ZXN0aW9uc0RhdGEiLCJfZ2FtZU1hbmFnZXIiLCJQbGF5ZXJEZXRhaWxzIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwiSXNPbmVRdWVzdGlvbiIsIkJvb2xlYW4iLCJJc1BsYXllclNlbGVjdFByb2ZpdCIsIklzUGxheWVyQnVzaW5lc3NUYWtlT3ZlciIsIklzUGxheWVyRGFtYWdpbmciLCJTZWxlY3RlZFBsYXllckluZGV4IiwiSW50ZWdlciIsIlNlbGVjdGVkUGxheWVyVXNlcklEIiwiVGV4dCIsIlF1ZXN0aW9uSUQiLCJRdWVzdGlvbk5vZGUiLCJOb2RlIiwiQnV5SGFsZkJ1c2luZXNzIiwib25FbmFibGUiLCJDaGVja1JlZmVyZW5jZXMiLCJRdWVzdGlvbkFza2VkIiwiVm9jUXVlc3Rpb24iLCJFc3RRdWVzdGlvbiIsIlRvYXN0TWVzc2FnZSIsIlF1ZXN0aW9uUmVmIiwicmVxdWlyZSIsInNldFBsYXllckluZGV4IiwiX2luZGV4Iiwic2V0UGxheWVyTmFtZSIsIl9uYW1lIiwic3RyaW5nIiwic2V0UGxheWVyVUlEIiwiX3VJRCIsInNldEJ1eUhhbGYiLCJfc3RhdGUiLCJSYWlzZUV2ZW50T25lUXVlc3Rpb24iLCJJbnN0YW5jZSIsIkdldF9RdWVzdGlvbnNEYXRhIiwiX1FkYXRhIiwiY29uc29sZSIsImxvZyIsIlZvY2FidWxhcnlRdWVzdGlvbnMiLCJFc3RhYmxpc2htZW50UXVlc3Rpb25zIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsImlzQWN0aXZlIiwiR2V0QWN0aXZlU3RhdHVzIiwiUXVlc3Rpb24iLCJPcHRpb24xIiwiT3B0aW9uMiIsIk9wdGlvbjMiLCJPcHRpb240IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU2hvd1F1ZXN0aW9uVG9hc3QiLCJfZGF0YSIsIlVzZXJJRCIsIlVzZXJJbmRleCIsIklzVm9jIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJSYWlzZUV2ZW50IiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJHZXRfR2FtZU1hbmFnZXIiLCJTaG93VG9hc3QiLCJSYWlzZUV2ZW50U2VsZWN0UGxheWVyRm9yUHJvZml0IiwiX2dhbWVwbGF5TWFuYWdlciIsIl9wbGF5ZXJJbmRleCIsIkdldFR1cm5OdW1iZXIiLCJfaUQiLCJQbGF5ZXJHYW1lSW5mbyIsIlBsYXllclVJRCIsIlBsYXllck5hbWUiLCJPd25QbGF5ZXJJRCIsIlVzZXJOYW1lIiwiRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiU2VsZWN0UGxheWVyQnVzaW5lc3NUYWtlT3ZlciIsIkV4aXRfU2VsZWN0UGxheWVyR2VuZXJpYyIsIkVuYWJsZVNjcmVlbl9fQnVzaW5lc3NUYWtlT3ZlciIsIl9idXNpbmVzc0xlbmd0aCIsIk5vT2ZCdXNpbmVzcyIsImxlbmd0aCIsIl9idXNpbmVzc0NvdW50ZXIiLCJpbmRleCIsIklzUGFydG5lcnNoaXAiLCJTZWxlY3RQbGF5ZXJCdXNpbmVzc0RhbWFnaW5nIiwiSXNCYW5rUnVwdGVkIiwiR2V0QmFua3J1cHRlZFN0YXR1cyIsIl9zZW50ZGF0YSIsIlBsYXllciIsIlBsYXllckluZGV4IiwiTXlVc2VySUQiLCJXYWl0aW5nRm9yUmVwbHkiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJBc2tWb2NhYnVsYXJ5UXVlc3Rpb24iLCJHZXRWb2NhYnVsYXJ5UXVlc3Rpb25zSW5kZXgiLCJTZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJTZWxlY3RQbGF5ZXJUYWtlT3ZlciIsIlNlbGVjdFBsYXllckRhbWFnaW5nIiwiQXNrRXN0YWJsaXNobWVudFF1ZXN0aW9uIiwiR2V0RXN0YWJsaXNobWVudFF1ZXN0aW9uc0luZGV4IiwiZ2V0UmFuZG9tIiwibWluIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidXBkYXRlIiwiZHQiLCJJc0FjdGl2ZSIsIkV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSIsIkV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckdlbmVyaWMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUcsSUFBL0I7QUFDQSxJQUFJQyxhQUFhLEdBQUcsSUFBcEI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsSUFBbkI7QUFDQSxJQUFJQyxhQUFhLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUUsZUFEcUI7QUFFM0IsYUFBU0YsRUFBRSxDQUFDRyxTQUZlO0FBSTNCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsZUFBZSxFQUFFO0FBQ2YsaUJBQVMsSUFETTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FGTTtBQUdmQyxNQUFBQSxZQUFZLEVBQUU7QUFIQyxLQURQO0FBTVZDLElBQUFBLGFBQWEsRUFBRTtBQUNiLGlCQUFTLEtBREk7QUFFYkgsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNVLE9BRkk7QUFHYkYsTUFBQUEsWUFBWSxFQUFFO0FBSEQsS0FOTDtBQVdWRyxJQUFBQSxvQkFBb0IsRUFBRTtBQUNwQixpQkFBUyxLQURXO0FBRXBCTCxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ1UsT0FGVztBQUdwQkYsTUFBQUEsWUFBWSxFQUFFO0FBSE0sS0FYWjtBQWdCVkksSUFBQUEsd0JBQXdCLEVBQUU7QUFDeEIsaUJBQVMsS0FEZTtBQUV4Qk4sTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNVLE9BRmU7QUFHeEJGLE1BQUFBLFlBQVksRUFBRTtBQUhVLEtBaEJoQjtBQXFCVkssSUFBQUEsZ0JBQWdCLEVBQUU7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LHFDQUExRDtBQUNEO0FBQ0Y7QUFDRixHQXZTMEIsQ0F5UzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBOztBQWpWMkIsQ0FBVCxDQUFwQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBRdWVzdGlvbnNEYXRhID0gbnVsbDtcclxudmFyIF9nYW1lTWFuYWdlciA9IG51bGw7XHJcbnZhciBQbGF5ZXJEZXRhaWxzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGxheWVyRGV0YWlsc1wiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSXNPbmVRdWVzdGlvbjoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIElzUGxheWVyU2VsZWN0UHJvZml0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSXNQbGF5ZXJCdXNpbmVzc1Rha2VPdmVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSXNQbGF5ZXJEYW1hZ2luZzoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdGVkUGxheWVySW5kZXg6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdGVkUGxheWVyVXNlcklEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBRdWVzdGlvbklEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBRdWVzdGlvbk5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXlIYWxmQnVzaW5lc3M6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgb25FbmFibGUoKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG5cclxuICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAgICAgdGhpcy5RdWVzdGlvbkFza2VkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuVm9jUXVlc3Rpb24gPSBmYWxzZTtcclxuICAgICAgdGhpcy5Fc3RRdWVzdGlvbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlRvYXN0TWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgIGlmICh0aGlzLlF1ZXN0aW9uTm9kZSkge1xyXG4gICAgICAgIHRoaXMuUXVlc3Rpb25SZWYgPSBudWxsO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUXVlc3Rpb25SZWYpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgICAvLyBpZiAoIVF1ZXN0aW9uc0RhdGEgfHwgUXVlc3Rpb25zRGF0YSA9PSBudWxsKSBRdWVzdGlvbnNEYXRhID0gcmVxdWlyZShcIlF1ZXN0aW9uc0RhdGFcIik7XHJcbiAgfSxcclxuXHJcbiAgLy8jcmVnaW9uIE9uZSBRdWVzdGlvbiBzcGFjZSBmdW50aW9uYWxpdHlcclxuICBzZXRQbGF5ZXJJbmRleChfaW5kZXgpIHtcclxuICAgIHRoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleCA9IF9pbmRleDtcclxuICB9LFxyXG5cclxuICBzZXRQbGF5ZXJOYW1lKF9uYW1lKSB7XHJcbiAgICB0aGlzLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbmFtZTtcclxuICB9LFxyXG5cclxuICBzZXRQbGF5ZXJVSUQoX3VJRCkge1xyXG4gICAgdGhpcy5TZWxlY3RlZFBsYXllclVzZXJJRCA9IF91SUQ7XHJcbiAgfSxcclxuXHJcbiAgc2V0QnV5SGFsZihfc3RhdGUpIHtcclxuICAgIHRoaXMuQnV5SGFsZkJ1c2luZXNzID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRPbmVRdWVzdGlvbigpIHtcclxuICAgIHRoaXMuUXVlc3Rpb25SZWYgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1F1ZXN0aW9uc0RhdGEoKTtcclxuICAgIHZhciBfUWRhdGE7XHJcbiAgICBpZiAodGhpcy5Wb2NRdWVzdGlvbikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInZvY1wiKTtcclxuICAgICAgX1FkYXRhID0gdGhpcy5RdWVzdGlvblJlZi5Wb2NhYnVsYXJ5UXVlc3Rpb25zW3RoaXMuUXVlc3Rpb25JRF07XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuRXN0UXVlc3Rpb24pIHtcclxuICAgICAgY29uc29sZS5sb2coXCJlc3RcIik7XHJcbiAgICAgIF9RZGF0YSA9IHRoaXMuUXVlc3Rpb25SZWYuRXN0YWJsaXNobWVudFF1ZXN0aW9uc1t0aGlzLlF1ZXN0aW9uSURdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKF9RZGF0YSk7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCkgPT0gMikge1xyXG4gICAgICB2YXIgaXNBY3RpdmUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldEFjdGl2ZVN0YXR1cyh0aGlzLlNlbGVjdGVkUGxheWVyVXNlcklEKTtcclxuXHJcbiAgICAgIGlmIChpc0FjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuVG9hc3RNZXNzYWdlID0gXCJZb3UgaGF2ZSBhc2tlZCBmb2xsb3dpbmcgcXVlc3Rpb246XCIgKyBcIlxcblwiICsgX1FkYXRhLlF1ZXN0aW9uICsgXCJcXG5cIiArIFwiQS4gXCIgKyBfUWRhdGEuT3B0aW9uMSArIFwiXFxuXCIgKyBcIkIuIFwiICsgX1FkYXRhLk9wdGlvbjIgKyBcIlxcblwiICsgXCJDLiBcIiArIF9RZGF0YS5PcHRpb24zICsgXCJcXG5cIiArIFwiRC4gXCIgKyBfUWRhdGEuT3B0aW9uNCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJ3YWl0aW5nIGZvciBwbGF5ZXIgdG8gYW5zd2VyLi4uLlwiO1xyXG4gICAgICAgIC8vR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UXVlc3Rpb25Ub2FzdCh0aGlzLlRvYXN0TWVzc2FnZSk7XHJcblxyXG4gICAgICAgIHZhciBfZGF0YSA9IHsgUXVlc3Rpb246IHRoaXMuUXVlc3Rpb25JRCwgVXNlcklEOiB0aGlzLlNlbGVjdGVkUGxheWVyVXNlcklELCBVc2VySW5kZXg6IHRoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleCwgSXNWb2M6IHRoaXMuVm9jUXVlc3Rpb24gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDcsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgLy93YWl0IGZvciBvdGhlciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgX2dhbWVNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuUXVlc3Rpb25Bc2tlZCA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcImN1cnJlbnQgc2VsZWN0ZWQgcGxheWVyIGlzIG5vdCBhY3RpdmUgYW55bW9yZS5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gc2VuZGluZyBxdWVzdGlvbiB0byBib3RcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudFNlbGVjdFBsYXllckZvclByb2ZpdCgpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpID09IDIpIHtcclxuICAgICAgdGhpcy5Ub2FzdE1lc3NhZ2UgPSBcIllvdSB3aWxsIHJlY2VpdmUgbmV4dCBhbGwgcGF5ZGF5IHByb2ZpdHMgb2YgcGxheWVyIFwiICsgdGhpcy5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KHRoaXMuVG9hc3RNZXNzYWdlLCAzMjAwKTtcclxuXHJcbiAgICAgIHZhciBfZ2FtZXBsYXlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gX2dhbWVwbGF5TWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHZhciBfaUQgPSBfZ2FtZXBsYXlNYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEO1xyXG4gICAgICB2YXIgX25hbWUgPSBfZ2FtZXBsYXlNYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICAgIHZhciBfZGF0YSA9IHsgT3duUGxheWVySUQ6IF9pRCwgVXNlcklEOiB0aGlzLlNlbGVjdGVkUGxheWVyVXNlcklELCBVc2VySW5kZXg6IHRoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleCwgVXNlck5hbWU6IF9uYW1lIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTcsIF9kYXRhKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckZvclByb2ZpdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJubyBzZWxlY3RpbmcgcGxheWVyIGZvciBwcm9maXQgd2l0aCBib3RcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VsZWN0UGxheWVyQnVzaW5lc3NUYWtlT3ZlcigpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpID09IDIpIHtcclxuICAgICAgdmFyIGlzQWN0aXZlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRBY3RpdmVTdGF0dXModGhpcy5TZWxlY3RlZFBsYXllclVzZXJJRCk7XHJcblxyXG4gICAgICBpZiAoaXNBY3RpdmUpIHtcclxuICAgICAgICBpZiAodGhpcy5CdXlIYWxmQnVzaW5lc3MgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIHZhciBfZ2FtZXBsYXlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gX2dhbWVwbGF5TWFuYWdlci5QbGF5ZXJHYW1lSW5mb1t0aGlzLlNlbGVjdGVkUGxheWVySW5kZXhdO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRfU2VsZWN0UGxheWVyR2VuZXJpYygpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZVNjcmVlbl9fQnVzaW5lc3NUYWtlT3Zlcih0cnVlLCBfZGF0YSwgdGhpcy5TZWxlY3RlZFBsYXllckluZGV4KTtcclxuICAgICAgICB9IC8vY29uZGl0aW9uIGZvciBjYXJkIDogQ2hvb3NlIGEgcGxheWVyIGFuZCBidXkgaGFsZiBvZiBvbmUgb2YgdGhlaXIgYnVzaW5lc3Nlcy4gUm9sbCB0d28gZGllLCBtdWx0aXBseSBieSAkMywwMDAgYW5kIHBheSB0aGUgcGxheWVyIHRoYXQgYW1vdW50IGZvciA1MCUgaW50ZXJlc3QgaW4gdGhlaXIgYnVzaW5lc3MuIFlvdSBjYW4gY2hvb3NlIG5vdCB0bywgYnV0IHlvdSBtdXN0IG1ha2UgdGhhdCBjaG9pY2UgYmVmb3JlIHlvdSByb2xsLlxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdmFyIF9nYW1lcGxheU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBfZ2FtZXBsYXlNYW5hZ2VyLlBsYXllckdhbWVJbmZvW3RoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleF07XHJcblxyXG4gICAgICAgICAgdmFyIF9idXNpbmVzc0xlbmd0aCA9IF9kYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcbiAgICAgICAgICB2YXIgX2J1c2luZXNzQ291bnRlciA9IDA7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9kYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKF9kYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uSXNQYXJ0bmVyc2hpcCkge1xyXG4gICAgICAgICAgICAgIF9idXNpbmVzc0NvdW50ZXIrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChfYnVzaW5lc3NDb3VudGVyID49IF9idXNpbmVzc0xlbmd0aCkge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiQWxsIGV4aXN0aW5nIGJ1c2luZXNzZXMgb2YgcGxheWVyIGFyZSB3aXRoIHBhcnRuZXJzaGlwIHdpdGggc29tZW9uZS5cIik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0X1NlbGVjdFBsYXllckdlbmVyaWMoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkVuYWJsZVNjcmVlbl9fQnVzaW5lc3NUYWtlT3Zlcih0cnVlLCBfZGF0YSwgdGhpcy5TZWxlY3RlZFBsYXllckluZGV4LCB0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcImN1cnJlbnQgc2VsZWN0ZWQgcGxheWVyIGlzIG5vdCBhY3RpdmUgYW55bW9yZS5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gc2VsZWN0aW5nIHBsYXllciB3aXRoIGJvdFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJCdXNpbmVzc0RhbWFnaW5nKCkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCkgPT0gMikge1xyXG4gICAgICB2YXIgaXNBY3RpdmUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldEFjdGl2ZVN0YXR1cyh0aGlzLlNlbGVjdGVkUGxheWVyVXNlcklEKTtcclxuICAgICAgdmFyIElzQmFua1J1cHRlZCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0QmFua3J1cHRlZFN0YXR1cyh0aGlzLlNlbGVjdGVkUGxheWVyVXNlcklEKTtcclxuXHJcbiAgICAgIGlmIChpc0FjdGl2ZSkge1xyXG4gICAgICAgIC8vR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRfU2VsZWN0UGxheWVyR2VuZXJpYygpO1xyXG5cclxuICAgICAgICBpZiAoSXNCYW5rUnVwdGVkKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiY3VycmVudCBzZWxlY3RlZCBwbGF5ZXIgaXMgYWxyZWFkeSBiYW5rcnVwdGVkIHRoaXMgdHVybi5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBfZ2FtZXBsYXlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gX2dhbWVwbGF5TWFuYWdlci5QbGF5ZXJHYW1lSW5mb1t0aGlzLlNlbGVjdGVkUGxheWVySW5kZXhdO1xyXG5cclxuICAgICAgICAgIHZhciBfc2VudGRhdGEgPSB7IFBsYXllcjogX2RhdGEsIFBsYXllckluZGV4OiB0aGlzLlNlbGVjdGVkUGxheWVySW5kZXgsIE15VXNlcklEOiBfZ2FtZXBsYXlNYW5hZ2VyLlBsYXllckdhbWVJbmZvW19nYW1lcGxheU1hbmFnZXIuR2V0VHVybk51bWJlcigpXS5QbGF5ZXJVSUQgfTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjQsIF9zZW50ZGF0YSk7XHJcbiAgICAgICAgICBfZ2FtZU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICBpZiAodGhpcy5Jc1BsYXllckRhbWFnaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuV2FpdGluZ0ZvclJlcGx5ID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vd2FpdCBmb3Igb3RoZXIgcGxheWVyXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKHRydWUpO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKF9zZW50ZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJjdXJyZW50IHNlbGVjdGVkIHBsYXllciBpcyBub3QgYWN0aXZlIGFueW1vcmUuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vIHNlbGVjdGluZyBwbGF5ZXIgd2l0aCBib3RcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQXNrVm9jYWJ1bGFyeVF1ZXN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuSXNPbmVRdWVzdGlvbikge1xyXG4gICAgICB2YXIgX2luZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFZvY2FidWxhcnlRdWVzdGlvbnNJbmRleCgpO1xyXG4gICAgICBpZiAoX2luZGV4ID09IC0xKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpbmRleCAtMSByZWNlaXZlZFwiKTtcclxuICAgICAgICB0aGlzLkFza1ZvY2FidWxhcnlRdWVzdGlvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUXVlc3Rpb25JRCA9IF9pbmRleDtcclxuICAgICAgICAvL3RoaXMuUXVlc3Rpb25JRCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDEyKTtcclxuICAgICAgICB0aGlzLlZvY1F1ZXN0aW9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkVzdFF1ZXN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbGVjdFBsYXllckZvclByb2ZpdCgpIHtcclxuICAgIGlmICh0aGlzLklzUGxheWVyU2VsZWN0UHJvZml0KSB7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudFNlbGVjdFBsYXllckZvclByb2ZpdCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbGVjdFBsYXllclRha2VPdmVyKCkge1xyXG4gICAgaWYgKHRoaXMuSXNQbGF5ZXJCdXNpbmVzc1Rha2VPdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyQnVzaW5lc3NUYWtlT3ZlcigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbGVjdFBsYXllckRhbWFnaW5nKCkge1xyXG4gICAgaWYgKHRoaXMuSXNQbGF5ZXJEYW1hZ2luZykge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckJ1c2luZXNzRGFtYWdpbmcoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBc2tFc3RhYmxpc2htZW50UXVlc3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgICAgIHZhciBfaW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0RXN0YWJsaXNobWVudFF1ZXN0aW9uc0luZGV4KCk7XHJcbiAgICAgIGlmIChfaW5kZXggPT0gLTEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImluZGV4IC0xIHJlY2VpdmVkXCIpO1xyXG4gICAgICAgIHRoaXMuQXNrRXN0YWJsaXNobWVudFF1ZXN0aW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5RdWVzdGlvbklEID0gX2luZGV4O1xyXG4gICAgICAgIC8vdGhpcy5RdWVzdGlvbklEID0gdGhpcy5nZXRSYW5kb20oMCwgMTIpO1xyXG4gICAgICAgIHRoaXMuVm9jUXVlc3Rpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkVzdFF1ZXN0aW9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0UmFuZG9tOiBmdW5jdGlvbiAobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlKGR0KSB7XHJcbiAgICBpZiAodGhpcy5RdWVzdGlvbkFza2VkKSB7XHJcbiAgICAgIGlmIChfZ2FtZU1hbmFnZXIuUGxheWVyR2FtZUluZm9bdGhpcy5TZWxlY3RlZFBsYXllckluZGV4XS5QbGF5ZXJVSUQgPT0gdGhpcy5TZWxlY3RlZFBsYXllclVzZXJJRCAmJiBfZ2FtZU1hbmFnZXIuUGxheWVyR2FtZUluZm9bdGhpcy5TZWxlY3RlZFBsYXllckluZGV4XS5Jc0FjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuUXVlc3Rpb25Bc2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJjdXJyZW50IHNlbGVjdGVkIHBsYXllciBpcyBub3QgYWN0aXZlIGFueW1vcmUsIHNraXBwaW5nIHR1cm4uXCIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuSXNQbGF5ZXJEYW1hZ2luZyAmJiB0aGlzLldhaXRpbmdGb3JSZXBseSkge1xyXG4gICAgICBpZiAoX2dhbWVNYW5hZ2VyLlBsYXllckdhbWVJbmZvW3RoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IHRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQgJiYgX2dhbWVNYW5hZ2VyLlBsYXllckdhbWVJbmZvW3RoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleF0uSXNBY3RpdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLldhaXRpbmdGb3JSZXBseSA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJjdXJyZW50IHNlbGVjdGVkIHBsYXllciBpcyBub3QgYWN0aXZlIGFueW1vcmUsIHNraXBwaW5nIHR1cm4uXCIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJHZW5lcmljKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyAgIFNraXBwZWRMb2FuKCkge1xyXG4gIC8vICAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgLy8gICAgICAgdGhpcy5RdWVzdGlvbklEID0gMTtcclxuICAvLyAgICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9LFxyXG5cclxuICAvLyAgIFRha2VuTG9hbigpIHtcclxuICAvLyAgICAgaWYgKHRoaXMuSXNPbmVRdWVzdGlvbikge1xyXG4gIC8vICAgICAgIHRoaXMuUXVlc3Rpb25JRCA9IDI7XHJcbiAgLy8gICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSxcclxuXHJcbiAgLy8gICBJc0JhbmtydXB0KCkge1xyXG4gIC8vICAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgLy8gICAgICAgdGhpcy5RdWVzdGlvbklEID0gMztcclxuICAvLyAgICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9LFxyXG5cclxuICAvLyAgIElzVHVyblNraXAoKSB7XHJcbiAgLy8gICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAvLyAgICAgICB0aGlzLlF1ZXN0aW9uSUQgPSA0O1xyXG4gIC8vICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0sXHJcblxyXG4gIC8vICAgSXNEb3VibGVQYXlEYXkoKSB7XHJcbiAgLy8gICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAvLyAgICAgICB0aGlzLlF1ZXN0aW9uSUQgPSA1O1xyXG4gIC8vICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0sXHJcbiAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gIC8vIHN0YXJ0ICgpIHtcclxuXHJcbiAgLy8gfSxcclxuXHJcbiAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=