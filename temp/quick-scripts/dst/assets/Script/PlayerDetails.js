
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
    },
    LaonPartnership: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    CompareDice: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    }
  },
  onEnable: function onEnable() {
    this.CheckReferences();
    _gameManager = GamePlayReferenceManager.Instance.Get_GameManager();

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
  SelectPlayerLoanPartnership: function SelectPlayerLoanPartnership() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      var isActive = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetActiveStatus(this.SelectedPlayerUserID);
      var IsBankRupted = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetBankruptedStatus(this.SelectedPlayerUserID);

      if (isActive) {
        if (IsBankRupted) {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("current selected player is bankrupted this turn.");
        } else {
          var _gameplayManager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _data = _gameplayManager.PlayerGameInfo[this.SelectedPlayerIndex];
          var _sentdata = {
            Player: _data,
            PlayerIndex: this.SelectedPlayerIndex,
            MyUserID: _gameplayManager.PlayerGameInfo[_gameplayManager.GetTurnNumber()].PlayerUID
          }; //GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(27, _sentdata);

          _gameManager = GamePlayReferenceManager.Instance.Get_GameManager(); //_gameplayManager.PlayerGameInfo[_gameplayManager.GetTurnNumber()].Cash+=50000;
          // if (this.LaonPartnership) {
          //   this.WaitingForReply = true;
          // }
          //isFirstTime, insideGame = false, modeIndex = 0, _isBankrupted = false, _BankruptAmount = 0, _isCardFunctionality = false, _GivenCash = 0, _StartAnyBusinessWithoutCash = false,_loanPartnership=false

          GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(false, true, GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode(), false, 0, true, 50000, false, true, _data);
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().Exit_SelectPlayerGeneric();
          console.log(_sentdata);
        }
      } else {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("current selected player is not active anymore.");
      }
    } else {
      console.log("no selecting player with bot");
    }
  },
  SelectPlayerCompareDice: function SelectPlayerCompareDice() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode() == 2) {
      var isActive = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetActiveStatus(this.SelectedPlayerUserID);
      var IsBankRupted = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetBankruptedStatus(this.SelectedPlayerUserID);

      if (isActive) {
        if (IsBankRupted) {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("current selected player is bankrupted this turn.");
        } else {
          var _gameplayManager = GamePlayReferenceManager.Instance.Get_GameManager();

          var _data = _gameplayManager.PlayerGameInfo[this.SelectedPlayerIndex];
          var CashLimit = 20000;

          var _Player1dice = _gameplayManager.RollTwoDices();

          var _Player2dice = _gameplayManager.RollTwoDices();

          var _player1CashLimit = false;
          var _player2CashLimit = false;
          if (_gameplayManager.PlayerGameInfo[_gameplayManager.GetTurnNumber()].Cash >= 20000) _player1CashLimit = true;
          if (_gameplayManager.PlayerGameInfo[this.SelectedPlayerIndex].Cash >= 20000) _player2CashLimit = true;

          while (_Player1dice == _Player2dice) {
            _Player2dice = _gameplayManager.RollTwoDices();
          }

          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Your dice result: " + _Player1dice, 1000, false);
          var _sentdata = {
            Player: _data,
            PlayerIndex: this.SelectedPlayerIndex,
            MyUserID: _gameplayManager.PlayerGameInfo[_gameplayManager.GetTurnNumber()].PlayerUID,
            Dice1: _Player1dice,
            Dice2: _Player2dice,
            Limit1: _player1CashLimit,
            Limit2: _player2CashLimit
          };
          GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(27, _sentdata);
          _gameManager = GamePlayReferenceManager.Instance.Get_GameManager();
          this.WaitingForReply = true;
          setTimeout(function () {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(true);
          }, 1000);
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
  SelectingPlayerLaonPartnership: function SelectingPlayerLaonPartnership() {
    if (this.LaonPartnership) {
      this.SelectPlayerLoanPartnership();
    }
  },
  SelectingPlayerCompareDice: function SelectingPlayerCompareDice() {
    if (this.CompareDice) {
      this.SelectPlayerCompareDice();
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

    if (this.CompareDice && this.WaitingForReply) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXJEZXRhaWxzLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlF1ZXN0aW9uc0RhdGEiLCJfZ2FtZU1hbmFnZXIiLCJQbGF5ZXJEZXRhaWxzIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwiSXNPbmVRdWVzdGlvbiIsIkJvb2xlYW4iLCJJc1BsYXllclNlbGVjdFByb2ZpdCIsIklzUGxheWVyQnVzaW5lc3NUYWtlT3ZlciIsIklzUGxheWVyRGFtYWdpbmciLCJTZWxlY3RlZFBsYXllckluZGV4IiwiSW50ZWdlciIsIlNlbGVjdGVkUGxheWVyVXNlcklEIiwiVGV4dCIsIlF1ZXN0aW9uSUQiLCJRdWVzdGlvbk5vZGUiLCJOb2RlIiwiQnV5SGFsZkJ1c2luZXNzIiwiTGFvblBhcnRuZXJzaGlwIiwiQ29tcGFyZURpY2UiLCJvbkVuYWJsZSIsIkNoZWNrUmVmZXJlbmNlcyIsIkluc3RhbmNlIiwiR2V0X0dhbWVNYW5hZ2VyIiwiUXVlc3Rpb25Bc2tlZCIsIlZvY1F1ZXN0aW9uIiwiRXN0UXVlc3Rpb24iLCJUb2FzdE1lc3NhZ2UiLCJRdWVzdGlvblJlZiIsInJlcXVpcmUiLCJzZXRQbGF5ZXJJbmRleCIsIl9pbmRleCIsInNldFBsYXllck5hbWUiLCJfbmFtZSIsInN0cmluZyIsInNldFBsYXllclVJRCIsIl91SUQiLCJzZXRCdXlIYWxmIiwiX3N0YXRlIiwiUmFpc2VFdmVudE9uZVF1ZXN0aW9uIiwiR2V0X1F1ZXN0aW9uc0RhdGEiLCJfUWRhdGEiLCJjb25zb2xlIiwibG9nIiwiVm9jYWJ1bGFyeVF1ZXN0aW9ucyIsIkVzdGFibGlzaG1lbnRRdWVzdGlvbnMiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiaXNBY3RpdmUiLCJHZXRBY3RpdmVTdGF0dXMiLCJRdWVzdGlvbiIsIk9wdGlvbjEiLCJPcHRpb24yIiwiT3B0aW9uMyIsIk9wdGlvbjQiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTaG93UXVlc3Rpb25Ub2FzdCIsIl9kYXRhIiwiVXNlcklEIiwiVXNlckluZGV4IiwiSXNWb2MiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNob3dUb2FzdCIsIlJhaXNlRXZlbnRTZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJfZ2FtZXBsYXlNYW5hZ2VyIiwiX3BsYXllckluZGV4IiwiR2V0VHVybk51bWJlciIsIl9pRCIsIlBsYXllckdhbWVJbmZvIiwiUGxheWVyVUlEIiwiUGxheWVyTmFtZSIsIk93blBsYXllcklEIiwiVXNlck5hbWUiLCJFeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJTZWxlY3RQbGF5ZXJCdXNpbmVzc1Rha2VPdmVyIiwiRXhpdF9TZWxlY3RQbGF5ZXJHZW5lcmljIiwiRW5hYmxlU2NyZWVuX19CdXNpbmVzc1Rha2VPdmVyIiwiX2J1c2luZXNzTGVuZ3RoIiwiTm9PZkJ1c2luZXNzIiwibGVuZ3RoIiwiX2J1c2luZXNzQ291bnRlciIsImluZGV4IiwiSXNQYXJ0bmVyc2hpcCIsIlNlbGVjdFBsYXllckJ1c2luZXNzRGFtYWdpbmciLCJJc0JhbmtSdXB0ZWQiLCJHZXRCYW5rcnVwdGVkU3RhdHVzIiwiX3NlbnRkYXRhIiwiUGxheWVyIiwiUGxheWVySW5kZXgiLCJNeVVzZXJJRCIsIldhaXRpbmdGb3JSZXBseSIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlNlbGVjdFBsYXllckxvYW5QYXJ0bmVyc2hpcCIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsIlNlbGVjdFBsYXllckNvbXBhcmVEaWNlIiwiQ2FzaExpbWl0IiwiX1BsYXllcjFkaWNlIiwiUm9sbFR3b0RpY2VzIiwiX1BsYXllcjJkaWNlIiwiX3BsYXllcjFDYXNoTGltaXQiLCJfcGxheWVyMkNhc2hMaW1pdCIsIkNhc2giLCJEaWNlMSIsIkRpY2UyIiwiTGltaXQxIiwiTGltaXQyIiwic2V0VGltZW91dCIsIkFza1ZvY2FidWxhcnlRdWVzdGlvbiIsIkdldFZvY2FidWxhcnlRdWVzdGlvbnNJbmRleCIsIlNlbGVjdFBsYXllckZvclByb2ZpdCIsIlNlbGVjdFBsYXllclRha2VPdmVyIiwiU2VsZWN0UGxheWVyRGFtYWdpbmciLCJTZWxlY3RpbmdQbGF5ZXJMYW9uUGFydG5lcnNoaXAiLCJTZWxlY3RpbmdQbGF5ZXJDb21wYXJlRGljZSIsIkFza0VzdGFibGlzaG1lbnRRdWVzdGlvbiIsIkdldEVzdGFibGlzaG1lbnRRdWVzdGlvbnNJbmRleCIsImdldFJhbmRvbSIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInVwZGF0ZSIsImR0IiwiSXNBY3RpdmUiLCJFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJHZW5lcmljIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLElBQXBCO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLElBQW5CO0FBQ0EsSUFBSUMsYUFBYSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMzQkMsRUFBQUEsSUFBSSxFQUFFLGVBRHFCO0FBRTNCLGFBQVNGLEVBQUUsQ0FBQ0csU0FGZTtBQUkzQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLGVBQWUsRUFBRTtBQUNmLGlCQUFTLElBRE07QUFFZkMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLEtBRk07QUFHZkMsTUFBQUEsWUFBWSxFQUFFO0FBSEMsS0FEUDtBQU1WQyxJQUFBQSxhQUFhLEVBQUU7QUFDYixpQkFB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MERTLFNBQTFELENBQW9FLCtEQUFwRTtBQUNBeEUsUUFBQUEsd0JBQXdCLENBQUM4QixRQUF6QixDQUFrQ2lDLHFCQUFsQyxHQUEwRHNDLG9DQUExRCxDQUErRixLQUEvRjtBQUNBckcsUUFBQUEsd0JBQXdCLENBQUM4QixRQUF6QixDQUFrQ2lDLHFCQUFsQyxHQUEwRHlFLHFDQUExRDtBQUNEO0FBQ0Y7QUFDRixHQS9aMEIsQ0FpYTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBOztBQXpjMkIsQ0FBVCxDQUFwQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBRdWVzdGlvbnNEYXRhID0gbnVsbDtcclxudmFyIF9nYW1lTWFuYWdlciA9IG51bGw7XHJcbnZhciBQbGF5ZXJEZXRhaWxzID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGxheWVyRGV0YWlsc1wiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSXNPbmVRdWVzdGlvbjoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIElzUGxheWVyU2VsZWN0UHJvZml0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSXNQbGF5ZXJCdXNpbmVzc1Rha2VPdmVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSXNQbGF5ZXJEYW1hZ2luZzoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdGVkUGxheWVySW5kZXg6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdGVkUGxheWVyVXNlcklEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBRdWVzdGlvbklEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBRdWVzdGlvbk5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBCdXlIYWxmQnVzaW5lc3M6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgTGFvblBhcnRuZXJzaGlwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIENvbXBhcmVEaWNlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIG9uRW5hYmxlKCkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuXHJcbiAgICBfZ2FtZU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuSXNPbmVRdWVzdGlvbikge1xyXG4gICAgICB0aGlzLlF1ZXN0aW9uQXNrZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5Wb2NRdWVzdGlvbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkVzdFF1ZXN0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuVG9hc3RNZXNzYWdlID0gXCJcIjtcclxuICAgICAgaWYgKHRoaXMuUXVlc3Rpb25Ob2RlKSB7XHJcbiAgICAgICAgdGhpcy5RdWVzdGlvblJlZiA9IG51bGw7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5RdWVzdGlvblJlZik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICAgIC8vIGlmICghUXVlc3Rpb25zRGF0YSB8fCBRdWVzdGlvbnNEYXRhID09IG51bGwpIFF1ZXN0aW9uc0RhdGEgPSByZXF1aXJlKFwiUXVlc3Rpb25zRGF0YVwiKTtcclxuICB9LFxyXG5cclxuICAvLyNyZWdpb24gT25lIFF1ZXN0aW9uIHNwYWNlIGZ1bnRpb25hbGl0eVxyXG4gIHNldFBsYXllckluZGV4KF9pbmRleCkge1xyXG4gICAgdGhpcy5TZWxlY3RlZFBsYXllckluZGV4ID0gX2luZGV4O1xyXG4gIH0sXHJcblxyXG4gIHNldFBsYXllck5hbWUoX25hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9uYW1lO1xyXG4gIH0sXHJcblxyXG4gIHNldFBsYXllclVJRChfdUlEKSB7XHJcbiAgICB0aGlzLlNlbGVjdGVkUGxheWVyVXNlcklEID0gX3VJRDtcclxuICB9LFxyXG5cclxuICBzZXRCdXlIYWxmKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5CdXlIYWxmQnVzaW5lc3MgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCkge1xyXG4gICAgdGhpcy5RdWVzdGlvblJlZiA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfUXVlc3Rpb25zRGF0YSgpO1xyXG4gICAgdmFyIF9RZGF0YTtcclxuICAgIGlmICh0aGlzLlZvY1F1ZXN0aW9uKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwidm9jXCIpO1xyXG4gICAgICBfUWRhdGEgPSB0aGlzLlF1ZXN0aW9uUmVmLlZvY2FidWxhcnlRdWVzdGlvbnNbdGhpcy5RdWVzdGlvbklEXTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5Fc3RRdWVzdGlvbikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImVzdFwiKTtcclxuICAgICAgX1FkYXRhID0gdGhpcy5RdWVzdGlvblJlZi5Fc3RhYmxpc2htZW50UXVlc3Rpb25zW3RoaXMuUXVlc3Rpb25JRF07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coX1FkYXRhKTtcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKSA9PSAyKSB7XHJcbiAgICAgIHZhciBpc0FjdGl2ZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0QWN0aXZlU3RhdHVzKHRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQpO1xyXG5cclxuICAgICAgaWYgKGlzQWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5Ub2FzdE1lc3NhZ2UgPSBcIllvdSBoYXZlIGFza2VkIGZvbGxvd2luZyBxdWVzdGlvbjpcIiArIFwiXFxuXCIgKyBfUWRhdGEuUXVlc3Rpb24gKyBcIlxcblwiICsgXCJBLiBcIiArIF9RZGF0YS5PcHRpb24xICsgXCJcXG5cIiArIFwiQi4gXCIgKyBfUWRhdGEuT3B0aW9uMiArIFwiXFxuXCIgKyBcIkMuIFwiICsgX1FkYXRhLk9wdGlvbjMgKyBcIlxcblwiICsgXCJELiBcIiArIF9RZGF0YS5PcHRpb240ICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIndhaXRpbmcgZm9yIHBsYXllciB0byBhbnN3ZXIuLi4uXCI7XHJcbiAgICAgICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dRdWVzdGlvblRvYXN0KHRoaXMuVG9hc3RNZXNzYWdlKTtcclxuXHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBRdWVzdGlvbjogdGhpcy5RdWVzdGlvbklELCBVc2VySUQ6IHRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQsIFVzZXJJbmRleDogdGhpcy5TZWxlY3RlZFBsYXllckluZGV4LCBJc1ZvYzogdGhpcy5Wb2NRdWVzdGlvbiB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNywgX2RhdGEpO1xyXG5cclxuICAgICAgICAvL3dhaXQgZm9yIG90aGVyIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSh0cnVlKTtcclxuICAgICAgICBfZ2FtZU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdGhpcy5RdWVzdGlvbkFza2VkID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiY3VycmVudCBzZWxlY3RlZCBwbGF5ZXIgaXMgbm90IGFjdGl2ZSBhbnltb3JlLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJubyBzZW5kaW5nIHF1ZXN0aW9uIHRvIGJvdFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50U2VsZWN0UGxheWVyRm9yUHJvZml0KCkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCkgPT0gMikge1xyXG4gICAgICB0aGlzLlRvYXN0TWVzc2FnZSA9IFwiWW91IHdpbGwgcmVjZWl2ZSBuZXh0IGFsbCBwYXlkYXkgcHJvZml0cyBvZiBwbGF5ZXIgXCIgKyB0aGlzLlBsYXllck5hbWVMYWJlbC5zdHJpbmc7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QodGhpcy5Ub2FzdE1lc3NhZ2UsIDMyMDApO1xyXG5cclxuICAgICAgdmFyIF9nYW1lcGxheU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBfZ2FtZXBsYXlNYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF9pRCA9IF9nYW1lcGxheU1hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJVSUQ7XHJcbiAgICAgIHZhciBfbmFtZSA9IF9nYW1lcGxheU1hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgICAgdmFyIF9kYXRhID0geyBPd25QbGF5ZXJJRDogX2lELCBVc2VySUQ6IHRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQsIFVzZXJJbmRleDogdGhpcy5TZWxlY3RlZFBsYXllckluZGV4LCBVc2VyTmFtZTogX25hbWUgfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNywgX2RhdGEpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyRm9yUHJvZml0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vIHNlbGVjdGluZyBwbGF5ZXIgZm9yIHByb2ZpdCB3aXRoIGJvdFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJCdXNpbmVzc1Rha2VPdmVyKCkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCkgPT0gMikge1xyXG4gICAgICB2YXIgaXNBY3RpdmUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldEFjdGl2ZVN0YXR1cyh0aGlzLlNlbGVjdGVkUGxheWVyVXNlcklEKTtcclxuXHJcbiAgICAgIGlmIChpc0FjdGl2ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLkJ1eUhhbGZCdXNpbmVzcyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgdmFyIF9nYW1lcGxheU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBfZ2FtZXBsYXlNYW5hZ2VyLlBsYXllckdhbWVJbmZvW3RoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleF07XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdF9TZWxlY3RQbGF5ZXJHZW5lcmljKCk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlU2NyZWVuX19CdXNpbmVzc1Rha2VPdmVyKHRydWUsIF9kYXRhLCB0aGlzLlNlbGVjdGVkUGxheWVySW5kZXgpO1xyXG4gICAgICAgIH0gLy9jb25kaXRpb24gZm9yIGNhcmQgOiBDaG9vc2UgYSBwbGF5ZXIgYW5kIGJ1eSBoYWxmIG9mIG9uZSBvZiB0aGVpciBidXNpbmVzc2VzLiBSb2xsIHR3byBkaWUsIG11bHRpcGx5IGJ5ICQzLDAwMCBhbmQgcGF5IHRoZSBwbGF5ZXIgdGhhdCBhbW91bnQgZm9yIDUwJSBpbnRlcmVzdCBpbiB0aGVpciBidXNpbmVzcy4gWW91IGNhbiBjaG9vc2Ugbm90IHRvLCBidXQgeW91IG11c3QgbWFrZSB0aGF0IGNob2ljZSBiZWZvcmUgeW91IHJvbGwuXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB2YXIgX2dhbWVwbGF5TWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IF9nYW1lcGxheU1hbmFnZXIuUGxheWVyR2FtZUluZm9bdGhpcy5TZWxlY3RlZFBsYXllckluZGV4XTtcclxuXHJcbiAgICAgICAgICB2YXIgX2J1c2luZXNzTGVuZ3RoID0gX2RhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuICAgICAgICAgIHZhciBfYnVzaW5lc3NDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2RhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoX2RhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Jc1BhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAgICAgX2J1c2luZXNzQ291bnRlcisrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKF9idXNpbmVzc0NvdW50ZXIgPj0gX2J1c2luZXNzTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJBbGwgZXhpc3RpbmcgYnVzaW5lc3NlcyBvZiBwbGF5ZXIgYXJlIHdpdGggcGFydG5lcnNoaXAgd2l0aCBzb21lb25lLlwiKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRfU2VsZWN0UGxheWVyR2VuZXJpYygpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRW5hYmxlU2NyZWVuX19CdXNpbmVzc1Rha2VPdmVyKHRydWUsIF9kYXRhLCB0aGlzLlNlbGVjdGVkUGxheWVySW5kZXgsIHRydWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiY3VycmVudCBzZWxlY3RlZCBwbGF5ZXIgaXMgbm90IGFjdGl2ZSBhbnltb3JlLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJubyBzZWxlY3RpbmcgcGxheWVyIHdpdGggYm90XCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbGVjdFBsYXllckJ1c2luZXNzRGFtYWdpbmcoKSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKSA9PSAyKSB7XHJcbiAgICAgIHZhciBpc0FjdGl2ZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0QWN0aXZlU3RhdHVzKHRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQpO1xyXG4gICAgICB2YXIgSXNCYW5rUnVwdGVkID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRCYW5rcnVwdGVkU3RhdHVzKHRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQpO1xyXG5cclxuICAgICAgaWYgKGlzQWN0aXZlKSB7XHJcbiAgICAgICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdF9TZWxlY3RQbGF5ZXJHZW5lcmljKCk7XHJcblxyXG4gICAgICAgIGlmIChJc0JhbmtSdXB0ZWQpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJjdXJyZW50IHNlbGVjdGVkIHBsYXllciBpcyBhbHJlYWR5IGJhbmtydXB0ZWQgdGhpcyB0dXJuLlwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIF9nYW1lcGxheU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBfZ2FtZXBsYXlNYW5hZ2VyLlBsYXllckdhbWVJbmZvW3RoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleF07XHJcblxyXG4gICAgICAgICAgdmFyIF9zZW50ZGF0YSA9IHsgUGxheWVyOiBfZGF0YSwgUGxheWVySW5kZXg6IHRoaXMuU2VsZWN0ZWRQbGF5ZXJJbmRleCwgTXlVc2VySUQ6IF9nYW1lcGxheU1hbmFnZXIuUGxheWVyR2FtZUluZm9bX2dhbWVwbGF5TWFuYWdlci5HZXRUdXJuTnVtYmVyKCldLlBsYXllclVJRCB9O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyNCwgX3NlbnRkYXRhKTtcclxuICAgICAgICAgIF9nYW1lTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgIGlmICh0aGlzLklzUGxheWVyRGFtYWdpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5XYWl0aW5nRm9yUmVwbHkgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy93YWl0IGZvciBvdGhlciBwbGF5ZXJcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coX3NlbnRkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcImN1cnJlbnQgc2VsZWN0ZWQgcGxheWVyIGlzIG5vdCBhY3RpdmUgYW55bW9yZS5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gc2VsZWN0aW5nIHBsYXllciB3aXRoIGJvdFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJMb2FuUGFydG5lcnNoaXAoKSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKSA9PSAyKSB7XHJcbiAgICAgIHZhciBpc0FjdGl2ZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0QWN0aXZlU3RhdHVzKHRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQpO1xyXG4gICAgICB2YXIgSXNCYW5rUnVwdGVkID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRCYW5rcnVwdGVkU3RhdHVzKHRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQpO1xyXG5cclxuICAgICAgaWYgKGlzQWN0aXZlKSB7XHJcblxyXG4gICAgICAgIGlmIChJc0JhbmtSdXB0ZWQpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJjdXJyZW50IHNlbGVjdGVkIHBsYXllciBpcyBiYW5rcnVwdGVkIHRoaXMgdHVybi5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBfZ2FtZXBsYXlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gX2dhbWVwbGF5TWFuYWdlci5QbGF5ZXJHYW1lSW5mb1t0aGlzLlNlbGVjdGVkUGxheWVySW5kZXhdO1xyXG5cclxuICAgICAgICAgIHZhciBfc2VudGRhdGEgPSB7IFBsYXllcjogX2RhdGEsIFBsYXllckluZGV4OiB0aGlzLlNlbGVjdGVkUGxheWVySW5kZXgsIE15VXNlcklEOiBfZ2FtZXBsYXlNYW5hZ2VyLlBsYXllckdhbWVJbmZvW19nYW1lcGxheU1hbmFnZXIuR2V0VHVybk51bWJlcigpXS5QbGF5ZXJVSUQgfTtcclxuICAgICAgICAgIC8vR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyNywgX3NlbnRkYXRhKTtcclxuICAgICAgICAgIF9nYW1lTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAvL19nYW1lcGxheU1hbmFnZXIuUGxheWVyR2FtZUluZm9bX2dhbWVwbGF5TWFuYWdlci5HZXRUdXJuTnVtYmVyKCldLkNhc2grPTUwMDAwO1xyXG4gICAgICAgICAgLy8gaWYgKHRoaXMuTGFvblBhcnRuZXJzaGlwKSB7XHJcbiAgICAgICAgICAvLyAgIHRoaXMuV2FpdGluZ0ZvclJlcGx5ID0gdHJ1ZTtcclxuICAgICAgICAgIC8vIH1cclxuICAgICAgICAgIC8vaXNGaXJzdFRpbWUsIGluc2lkZUdhbWUgPSBmYWxzZSwgbW9kZUluZGV4ID0gMCwgX2lzQmFua3J1cHRlZCA9IGZhbHNlLCBfQmFua3J1cHRBbW91bnQgPSAwLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlLF9sb2FuUGFydG5lcnNoaXA9ZmFsc2VcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAoZmFsc2UsdHJ1ZSxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpLGZhbHNlLDAsdHJ1ZSw1MDAwMCxmYWxzZSx0cnVlLF9kYXRhKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0X1NlbGVjdFBsYXllckdlbmVyaWMoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKF9zZW50ZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJjdXJyZW50IHNlbGVjdGVkIHBsYXllciBpcyBub3QgYWN0aXZlIGFueW1vcmUuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vIHNlbGVjdGluZyBwbGF5ZXIgd2l0aCBib3RcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VsZWN0UGxheWVyQ29tcGFyZURpY2UoKSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKSA9PSAyKSB7XHJcbiAgICAgIHZhciBpc0FjdGl2ZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0QWN0aXZlU3RhdHVzKHRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQpO1xyXG4gICAgICB2YXIgSXNCYW5rUnVwdGVkID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRCYW5rcnVwdGVkU3RhdHVzKHRoaXMuU2VsZWN0ZWRQbGF5ZXJVc2VySUQpO1xyXG5cclxuICAgICAgaWYgKGlzQWN0aXZlKSB7XHJcblxyXG4gICAgICAgIGlmIChJc0JhbmtSdXB0ZWQpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJjdXJyZW50IHNlbGVjdGVkIHBsYXllciBpcyBiYW5rcnVwdGVkIHRoaXMgdHVybi5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBfZ2FtZXBsYXlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gX2dhbWVwbGF5TWFuYWdlci5QbGF5ZXJHYW1lSW5mb1t0aGlzLlNlbGVjdGVkUGxheWVySW5kZXhdO1xyXG4gICAgICAgICAgdmFyIENhc2hMaW1pdD0yMDAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgX1BsYXllcjFkaWNlPV9nYW1lcGxheU1hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICB2YXIgX1BsYXllcjJkaWNlPV9nYW1lcGxheU1hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcblxyXG4gICAgICAgICAgdmFyIF9wbGF5ZXIxQ2FzaExpbWl0PWZhbHNlO1xyXG4gICAgICAgICAgdmFyIF9wbGF5ZXIyQ2FzaExpbWl0PWZhbHNlO1xyXG5cclxuICAgICAgICAgIGlmKF9nYW1lcGxheU1hbmFnZXIuUGxheWVyR2FtZUluZm9bX2dhbWVwbGF5TWFuYWdlci5HZXRUdXJuTnVtYmVyKCldLkNhc2g+PTIwMDAwKVxyXG4gICAgICAgICAgICBfcGxheWVyMUNhc2hMaW1pdD10cnVlO1xyXG5cclxuICAgICAgICAgIGlmKF9nYW1lcGxheU1hbmFnZXIuUGxheWVyR2FtZUluZm9bdGhpcy5TZWxlY3RlZFBsYXllckluZGV4XS5DYXNoPj0yMDAwMClcclxuICAgICAgICAgICAgX3BsYXllcjJDYXNoTGltaXQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICB3aGlsZShfUGxheWVyMWRpY2U9PV9QbGF5ZXIyZGljZSlcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgX1BsYXllcjJkaWNlPV9nYW1lcGxheU1hbmFnZXIuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdXIgZGljZSByZXN1bHQ6IFwiK19QbGF5ZXIxZGljZSwxMDAwLGZhbHNlKTtcclxuXHJcbiAgICAgICAgICB2YXIgX3NlbnRkYXRhID0geyBQbGF5ZXI6IF9kYXRhLCBQbGF5ZXJJbmRleDogdGhpcy5TZWxlY3RlZFBsYXllckluZGV4LCBNeVVzZXJJRDogX2dhbWVwbGF5TWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfZ2FtZXBsYXlNYW5hZ2VyLkdldFR1cm5OdW1iZXIoKV0uUGxheWVyVUlELERpY2UxOl9QbGF5ZXIxZGljZSxEaWNlMjpfUGxheWVyMmRpY2UsTGltaXQxOl9wbGF5ZXIxQ2FzaExpbWl0LExpbWl0MjpfcGxheWVyMkNhc2hMaW1pdCB9O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyNywgX3NlbnRkYXRhKTtcclxuICAgICAgICAgIF9nYW1lTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgIHRoaXMuV2FpdGluZ0ZvclJlcGx5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICBcclxuICAgICAgICAgIGNvbnNvbGUubG9nKF9zZW50ZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJjdXJyZW50IHNlbGVjdGVkIHBsYXllciBpcyBub3QgYWN0aXZlIGFueW1vcmUuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vIHNlbGVjdGluZyBwbGF5ZXIgd2l0aCBib3RcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQXNrVm9jYWJ1bGFyeVF1ZXN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuSXNPbmVRdWVzdGlvbikge1xyXG4gICAgICB2YXIgX2luZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFZvY2FidWxhcnlRdWVzdGlvbnNJbmRleCgpO1xyXG4gICAgICBpZiAoX2luZGV4ID09IC0xKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpbmRleCAtMSByZWNlaXZlZFwiKTtcclxuICAgICAgICB0aGlzLkFza1ZvY2FidWxhcnlRdWVzdGlvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUXVlc3Rpb25JRCA9IF9pbmRleDtcclxuICAgICAgICAvL3RoaXMuUXVlc3Rpb25JRCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDEyKTtcclxuICAgICAgICB0aGlzLlZvY1F1ZXN0aW9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkVzdFF1ZXN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbGVjdFBsYXllckZvclByb2ZpdCgpIHtcclxuICAgIGlmICh0aGlzLklzUGxheWVyU2VsZWN0UHJvZml0KSB7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudFNlbGVjdFBsYXllckZvclByb2ZpdCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbGVjdFBsYXllclRha2VPdmVyKCkge1xyXG4gICAgaWYgKHRoaXMuSXNQbGF5ZXJCdXNpbmVzc1Rha2VPdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyQnVzaW5lc3NUYWtlT3ZlcigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbGVjdFBsYXllckRhbWFnaW5nKCkge1xyXG4gICAgaWYgKHRoaXMuSXNQbGF5ZXJEYW1hZ2luZykge1xyXG4gICAgICB0aGlzLlNlbGVjdFBsYXllckJ1c2luZXNzRGFtYWdpbmcoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxlY3RpbmdQbGF5ZXJMYW9uUGFydG5lcnNoaXAoKSB7XHJcbiAgICBpZiAodGhpcy5MYW9uUGFydG5lcnNoaXApIHtcclxuICAgICAgdGhpcy5TZWxlY3RQbGF5ZXJMb2FuUGFydG5lcnNoaXAoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxlY3RpbmdQbGF5ZXJDb21wYXJlRGljZSgpIHtcclxuICAgIGlmICh0aGlzLkNvbXBhcmVEaWNlKSB7XHJcbiAgICAgIHRoaXMuU2VsZWN0UGxheWVyQ29tcGFyZURpY2UoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIEFza0VzdGFibGlzaG1lbnRRdWVzdGlvbigpIHtcclxuICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAgICAgdmFyIF9pbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRFc3RhYmxpc2htZW50UXVlc3Rpb25zSW5kZXgoKTtcclxuICAgICAgaWYgKF9pbmRleCA9PSAtMSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW5kZXggLTEgcmVjZWl2ZWRcIik7XHJcbiAgICAgICAgdGhpcy5Bc2tFc3RhYmxpc2htZW50UXVlc3Rpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlF1ZXN0aW9uSUQgPSBfaW5kZXg7XHJcbiAgICAgICAgLy90aGlzLlF1ZXN0aW9uSUQgPSB0aGlzLmdldFJhbmRvbSgwLCAxMik7XHJcbiAgICAgICAgdGhpcy5Wb2NRdWVzdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuRXN0UXVlc3Rpb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRSYW5kb206IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICB9LFxyXG5cclxuICB1cGRhdGUoZHQpIHtcclxuICAgIGlmICh0aGlzLlF1ZXN0aW9uQXNrZWQpIHtcclxuICAgICAgaWYgKF9nYW1lTWFuYWdlci5QbGF5ZXJHYW1lSW5mb1t0aGlzLlNlbGVjdGVkUGxheWVySW5kZXhdLlBsYXllclVJRCA9PSB0aGlzLlNlbGVjdGVkUGxheWVyVXNlcklEICYmIF9nYW1lTWFuYWdlci5QbGF5ZXJHYW1lSW5mb1t0aGlzLlNlbGVjdGVkUGxheWVySW5kZXhdLklzQWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5RdWVzdGlvbkFza2VkID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcImN1cnJlbnQgc2VsZWN0ZWQgcGxheWVyIGlzIG5vdCBhY3RpdmUgYW55bW9yZSwgc2tpcHBpbmcgdHVybi5cIik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5Jc1BsYXllckRhbWFnaW5nICYmIHRoaXMuV2FpdGluZ0ZvclJlcGx5KSB7XHJcbiAgICAgIGlmIChfZ2FtZU1hbmFnZXIuUGxheWVyR2FtZUluZm9bdGhpcy5TZWxlY3RlZFBsYXllckluZGV4XS5QbGF5ZXJVSUQgPT0gdGhpcy5TZWxlY3RlZFBsYXllclVzZXJJRCAmJiBfZ2FtZU1hbmFnZXIuUGxheWVyR2FtZUluZm9bdGhpcy5TZWxlY3RlZFBsYXllckluZGV4XS5Jc0FjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuV2FpdGluZ0ZvclJlcGx5ID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcImN1cnJlbnQgc2VsZWN0ZWQgcGxheWVyIGlzIG5vdCBhY3RpdmUgYW55bW9yZSwgc2tpcHBpbmcgdHVybi5cIik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckdlbmVyaWMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLkNvbXBhcmVEaWNlICYmIHRoaXMuV2FpdGluZ0ZvclJlcGx5KSB7XHJcbiAgICAgIGlmIChfZ2FtZU1hbmFnZXIuUGxheWVyR2FtZUluZm9bdGhpcy5TZWxlY3RlZFBsYXllckluZGV4XS5QbGF5ZXJVSUQgPT0gdGhpcy5TZWxlY3RlZFBsYXllclVzZXJJRCAmJiBfZ2FtZU1hbmFnZXIuUGxheWVyR2FtZUluZm9bdGhpcy5TZWxlY3RlZFBsYXllckluZGV4XS5Jc0FjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuV2FpdGluZ0ZvclJlcGx5ID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcImN1cnJlbnQgc2VsZWN0ZWQgcGxheWVyIGlzIG5vdCBhY3RpdmUgYW55bW9yZSwgc2tpcHBpbmcgdHVybi5cIik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckdlbmVyaWMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vICAgU2tpcHBlZExvYW4oKSB7XHJcbiAgLy8gICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAvLyAgICAgICB0aGlzLlF1ZXN0aW9uSUQgPSAxO1xyXG4gIC8vICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0sXHJcblxyXG4gIC8vICAgVGFrZW5Mb2FuKCkge1xyXG4gIC8vICAgICBpZiAodGhpcy5Jc09uZVF1ZXN0aW9uKSB7XHJcbiAgLy8gICAgICAgdGhpcy5RdWVzdGlvbklEID0gMjtcclxuICAvLyAgICAgICB0aGlzLlJhaXNlRXZlbnRPbmVRdWVzdGlvbigpO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9LFxyXG5cclxuICAvLyAgIElzQmFua3J1cHQoKSB7XHJcbiAgLy8gICAgIGlmICh0aGlzLklzT25lUXVlc3Rpb24pIHtcclxuICAvLyAgICAgICB0aGlzLlF1ZXN0aW9uSUQgPSAzO1xyXG4gIC8vICAgICAgIHRoaXMuUmFpc2VFdmVudE9uZVF1ZXN0aW9uKCk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0sXHJcblxyXG4gIC8vICAgSXNUdXJuU2tpcCgpIHtcclxuICAvLyAgICAgaWYgKHRoaXMuSXNPbmVRdWVzdGlvbikge1xyXG4gIC8vICAgICAgIHRoaXMuUXVlc3Rpb25JRCA9IDQ7XHJcbiAgLy8gICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSxcclxuXHJcbiAgLy8gICBJc0RvdWJsZVBheURheSgpIHtcclxuICAvLyAgICAgaWYgKHRoaXMuSXNPbmVRdWVzdGlvbikge1xyXG4gIC8vICAgICAgIHRoaXMuUXVlc3Rpb25JRCA9IDU7XHJcbiAgLy8gICAgICAgdGhpcy5SYWlzZUV2ZW50T25lUXVlc3Rpb24oKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSxcclxuICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgLy8gc3RhcnQgKCkge1xyXG5cclxuICAvLyB9LFxyXG5cclxuICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==