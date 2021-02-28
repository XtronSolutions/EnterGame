
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/MultiplayerSyncManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b24e1h7gENJfpQ8MTfHBgb9', 'MultiplayerSyncManager');
// Script/MultiplayerSyncManager.js

"use strict";

var GamePlayReferenceManager = null;
var MultiplayerSyncManager = cc.Class({
  name: "MultiplayerSyncManager",
  "extends": cc.Component,
  properties: {},
  statics: {
    //creating static instance of the class
    Instance: null
  },
  RemovePersistNode: function RemovePersistNode() {
    MultiplayerSyncManager.Instance = null;
    cc.game.removePersistRootNode(this.node);
  },
  onLoad: function onLoad() {
    if (!MultiplayerSyncManager.Instance) {
      cc.game.addPersistRootNode(this.node);
      MultiplayerSyncManager.Instance = this;
    }

    this.CheckReferences();
    this.SelectedMode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
  },
  RaiseEvent: function RaiseEvent(_eventCode, _data) {
    if (_eventCode == 1) {
      //sending playerinfo
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendData(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 2) {
      //sending Turn Start Call
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().StartTurn(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 3) {
      //sending Dice Roll Value
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().DiceRollEvent(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 4) {
      //sending userID of player who had completed their turn
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SyncTurnCompletion(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 5) {
      //sending card data (index) so other users can sync them
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendCardData(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 6) {
      //sending call to end the game
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendGameOver(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 7) {
      //sending data for one question space
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendOneQuestionData(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 8) {
      //sending back data for one question space
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendOneQuestionResponseData(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 9) {
      //sending data to reset positions after bankrupt
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendBankruptData(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 10) {
      //sending go back spaces data
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendGoBackSpaceData(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 11) {
      //sending open partnership offer to everyone
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendPartnerShipOfferData(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 12) {
      //sending answer to player who initiated partnership call
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendPartnerShipAnswerData(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 13) {
      //sending profit to respective partner
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendPartnerProfitLoss(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 15) {
      //sending payday information to show
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendInfo(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 16) {
      //sending call to end the game
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendGameOverData(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 17) {
      //sending data of player to get all profit next pay day
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendSelectedPlayerForProfit(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 18) {
      //sending data of one question array
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendOneQuestionArrays(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 19) {
      //sending data of decks array
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendDecksArrays(_data);else if (this.SelectedMode == 1) //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
    } else if (_eventCode == 20) {
      //sending data of decks array
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendDecksArrayCounter(_data);else if (this.SelectedMode == 1) {//for bot
        //this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      }
    } else if (_eventCode == 21) {
      //for player
      GamePlayReferenceManager.Instance.Get_MultiplayerController().SendCashDeductData(_data);
    } else if (_eventCode == 22) {
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendCashAdditionData(_data);else if (this.SelectedMode == 1) {
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      }
    } else if (_eventCode == 23) {
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendTakeBusinessData(_data);else if (this.SelectedMode == 1) {
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      }
    } else if (_eventCode == 24) {
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendDamagingData(_data);else if (this.SelectedMode == 1) {
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      }
    } else if (_eventCode == 25) {
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendDamagingDecisionData(_data);else if (this.SelectedMode == 1) {
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      }
    } else if (_eventCode == 26) {
      if (this.SelectedMode == 2) //for player
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendBuyHalfBusinessData(_data);else if (this.SelectedMode == 1) {
        //for bot
        this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      }
    }
  },
  ReceiveEvent: function ReceiveEvent(_eventCode, _senderName, _senderID, _data) {
    if (_eventCode == 1) {
      //receiving playerinfo
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      cc.systemEvent.emit("SyncData", _data, _senderID); //function defined in GameplayUIManager
    } else if (_eventCode == 2) {
      //receiving start Turn
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().TurnHandler(_data);
    } else if (_eventCode == 3) {
      //receiving dice roll data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().syncDiceRoll(_data);
    } else if (_eventCode == 4) {
      //receiving userid of player who has completed turn
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEventTurnComplete(_data);
    } else if (_eventCode == 5) {
      //receiving card data (index) so other users can sync them
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEventForCard(_data);
    } else if (_eventCode == 6) {
      //receiving game over call
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().SyncGameOver(_data);
    } else if (_eventCode == 7) {
      //receiving one question data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().QuestionPopUp_OtherUser_OneQuestion(_data);
    } else if (_eventCode == 8) {
      //receiving one question response data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEventDecision_OneQuestion(_data);
    } else if (_eventCode == 9) {
      //receiving bankrupcy data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveBankruptData(_data);
    } else if (_eventCode == 10) {
      //receiving bankrupcy data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveGoBackSpacesData_spaceFunctionality(_data);
    } else if (_eventCode == 11) {
      //receiving partnership offer data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ReceiveEvent_PartnershipSetup(_data);
    } else if (_eventCode == 12) {
      //receiving partnership answer data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ReceiveEventDecisionAnswer_PartnershipSetup(_data);
    } else if (_eventCode == 13) {
      //receiving partnership answer data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveProfit_Partner_TurnDecision(_data);
    } else if (_eventCode == 15) {
      //receiving payday info
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowInfo(_data);
    } else if (_eventCode == 16) {
      //receiving payday info
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().SyncGameCompleteData(_data);
    } else if (_eventCode == 17) {
      //receiving payday info
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEvent_SelectPlayerForProfit_Space_CardFunctionality(_data);
    } else if (_eventCode == 18) {
      //receiving one question array data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().PopulateOneQuestionArray_Vocabulary(_data);
      GamePlayReferenceManager.Instance.Get_GameManager().PopulateOneQuestionArray_Establishment(_data);
    } else if (_eventCode == 19) {
      //receiving one question array data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().PopulateDecksArray(false, false, false, false, _data);
    } else if (_eventCode == 20) {
      //receiving one question array data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().UpdateCounters(_data);
    } else if (_eventCode == 21) {
      //receiving cash deduction data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().DeductCash_CardFunctionality(5000);
      var _newData = {
        info: "Tution fee was deducted."
      };
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowInfo(_newData);
    } else if (_eventCode == 22) {
      //receiving cash deduction data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().AddCash_CardFunctionality(_data);
    } else if (_eventCode == 23) {
      //receiving cash deduction data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEvent_TakeOverBusiness_CardFunctionality(_data);
    } else if (_eventCode == 24) {
      //receiving cash deduction data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEvent_SelectPlayerDamagingDecision_Space_CardFunctionality(_data);
    } else if (_eventCode == 25) {
      //receiving cash deduction data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ReceiveEvent_DamageDecision(_data);
    } else if (_eventCode == 26) {
      //receiving cash deduction data
      console.log("sender name: " + _senderName);
      console.log("sender ID: " + _senderID);
      GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEvent_BuyHalfBusiness_CardFunctionality(_data);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllclN5bmNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIk11bHRpcGxheWVyU3luY01hbmFnZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsImdhbWUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwib25Mb2FkIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiQ2hlY2tSZWZlcmVuY2VzIiwiU2VsZWN0ZWRNb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsInJlcXVpcmUiLCJSYWlzZUV2ZW50IiwiX2V2ZW50Q29kZSIsIl9kYXRhIiwiU2VuZERhdGEiLCJSZWNlaXZlRXZlbnQiLCJTdGFydFR1cm4iLCJEaWNlUm9sbEV2ZW50IiwiU3luY1R1cm5Db21wbGV0aW9uIiwiU2VuZENhcmREYXRhIiwiU2VuZEdhbWVPdmVyIiwiU2VuZE9uZVF1ZXN0aW9uRGF0YSIsIlNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YSIsIlNlbmRCYW5rcnVwdERhdGEiLCJTZW5kR29CYWNrU3BhY2VEYXRhIiwiU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhIiwiU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YSIsIlNlbmRQYXJ0bmVyUHJvZml0TG9zcyIsIlNlbmRJbmZvIiwiU2VuZEdhbWVPdmVyRGF0YSIsIlNlbmRTZWxlY3RlZFBsYXllckZvclByb2ZpdCIsIlNlbmRPbmVRdWVzdGlvbkFycmF5cyIsIlNlbmREZWNrc0FycmF5cyIsIlNlbmREZWNrc0FycmF5Q291bnRlciIsIlNlbmRDYXNoRGVkdWN0RGF0YSIsIlNlbmRDYXNoQWRkaXRpb25EYXRhIiwiU2VuZFRha2VCdXNpbmVzc0RhdGEiLCJTZW5kRGFtYWdpbmdEYXRhIiwiU2VuZERhbWFnaW5nRGVjaXNpb25EYXRhIiwiU2VuZEJ1eUhhbGZCdXNpbmVzc0RhdGEiLCJfc2VuZGVyTmFtZSIsIl9zZW5kZXJJRCIsImNvbnNvbGUiLCJsb2ciLCJzeXN0ZW1FdmVudCIsImVtaXQiLCJHZXRfR2FtZU1hbmFnZXIiLCJUdXJuSGFuZGxlciIsInN5bmNEaWNlUm9sbCIsIlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZSIsIlJlY2VpdmVFdmVudEZvckNhcmQiLCJTeW5jR2FtZU92ZXIiLCJRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbiIsIlJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uIiwiUmVjZWl2ZUJhbmtydXB0RGF0YSIsIlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlJlY2VpdmVFdmVudF9QYXJ0bmVyc2hpcFNldHVwIiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCIsIlJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJTaG93SW5mbyIsIlN5bmNHYW1lQ29tcGxldGVEYXRhIiwiUmVjZWl2ZUV2ZW50X1NlbGVjdFBsYXllckZvclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eSIsIlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Wb2NhYnVsYXJ5IiwiUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X0VzdGFibGlzaG1lbnQiLCJQb3B1bGF0ZURlY2tzQXJyYXkiLCJVcGRhdGVDb3VudGVycyIsIkRlZHVjdENhc2hfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfbmV3RGF0YSIsImluZm8iLCJBZGRDYXNoX0NhcmRGdW5jdGlvbmFsaXR5IiwiUmVjZWl2ZUV2ZW50X1Rha2VPdmVyQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJSZWNlaXZlRXZlbnRfU2VsZWN0UGxheWVyRGFtYWdpbmdEZWNpc2lvbl9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eSIsIlJlY2VpdmVFdmVudF9EYW1hZ2VEZWNpc2lvbiIsIlJlY2VpdmVFdmVudF9CdXlIYWxmQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUcsSUFBL0I7QUFFQSxJQUFJQyxzQkFBc0IsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDcENDLEVBQUFBLElBQUksRUFBRSx3QkFEOEI7QUFFcEMsYUFBU0YsRUFBRSxDQUFDRyxTQUZ3QjtBQUlwQ0MsRUFBQUEsVUFBVSxFQUFFLEVBSndCO0FBTXBDQyxFQUFBQSxPQUFPLEVBQUU7QUFDUDtBQUNBQyxJQUFBQSxRQUFRLEVBQUU7QUFGSCxHQU4yQjtBQVdwQ0MsRUFBQUEsaUJBWG9DLCtCQVdoQjtBQUNsQlIsSUFBQUEsc0JBQXNCLENBQUNPLFFBQXZCLEdBQWtDLElBQWxDO0FBQ0FOLElBQUFBLEVBQUUsQ0FBQ1EsSUFBSCxDQUFRQyxxQkFBUixDQUE4QixLQUFLQyxJQUFuQztBQUNELEdBZG1DO0FBZ0JwQ0MsRUFBQUEsTUFoQm9DLG9CQWdCM0I7QUFDUCxRQUFJLENBQUNaLHNCQUFzQixDQUFDTyxRQUE1QixFQUFzQztBQUNwQ04sTUFBQUEsRUFBRSxDQUFDUSxJQUFILENBQVFJLGtCQUFSLENBQTJCLEtBQUtGLElBQWhDO0FBQ0FYLE1BQUFBLHNCQUFzQixDQUFDTyxRQUF2QixHQUFrQyxJQUFsQztBQUNEOztBQUNELFNBQUtPLGVBQUw7QUFDQSxTQUFLQyxZQUFMLEdBQW9CaEIsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERDLGVBQTlELEVBQXBCO0FBQ0QsR0F2Qm1DO0FBeUJwQ0gsRUFBQUEsZUF6Qm9DLDZCQXlCbEI7QUFDaEIsUUFBSSxDQUFDZix3QkFBRCxJQUE2QkEsd0JBQXdCLElBQUksSUFBN0QsRUFBbUVBLHdCQUF3QixHQUFHbUIsT0FBTyxDQUFDLDBCQUFELENBQWxDO0FBQ3BFLEdBM0JtQztBQTZCcENDLEVBQUFBLFVBN0JvQyxzQkE2QnpCQyxVQTdCeUIsRUE2QmJDLEtBN0JhLEVBNkJOO0FBQzVCLFFBQUlELFVBQVUsSUFBSSxDQUFsQixFQUFxQjtBQUNuQjtBQUNBLFVBQUksS0FBS0wsWUFBTCxJQUFxQixDQUF6QixFQUNFO0FBQ0FoQixRQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RE0sUUFBOUQsQ0FBdUVELEtBQXZFLEVBRkYsS0FHSyxJQUFJLEtBQUtOLFlBQUwsSUFBcUIsQ0FBekIsRUFDSDtBQUNBLGFBQUtRLFlBQUwsQ0FBa0JILFVBQWxCLEVBQThCLFlBQTlCLEVBQTRDLFVBQTVDLEVBQXdEQyxLQUF4RDtBQUNILEtBUkQsTUFRTyxJQUFJRCxVQUFVLElBQUksQ0FBbEIsRUFBcUI7QUFDMUI7QUFDQSxVQUFJLEtBQUtMLFlBQUwsSUFBcUIsQ0FBekIsRUFDRTtBQUNBaEIsUUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERRLFNBQTlELENBQXdFSCxLQUF4RSxFQUZGLEtBR0ssSUFBSSxLQUFLTixZQUFMLElBQXFCLENBQXpCLEVBQ0g7QUFDQSxhQUFLUSxZQUFMLENBQWtCSCxVQUFsQixFQUE4QixZQUE5QixFQUE0QyxVQUE1QyxFQUF3REMsS0FBeEQ7QUFDSCxLQVJNLE1BUUEsSUFBSUQsVUFBVSxJQUFJLENBQWxCLEVBQXFCO0FBQzFCO0FBQ0EsVUFBSSxLQUFLTCxZQUFMLElBQXFCLENBQXpCLEVBQ0U7QUFDQWhCLFFBQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEUyxhQUE5RCxDQUE0RUosS0FBNUUsRUFGRixLQUdLLElBQUksS0FBS04sWUFBTCxJQUFxQixDQUF6QixFQUNIO0FBQ0EsYUFBS1EsWUFBTCxDQUFrQkgsVUFBbEIsRUFBOEIsWUFBOUIsRUFBNEMsVUFBNUMsRUFBd0RDLEtBQXhEO0FBQ0gsS0FSTSxNQVFBLElBQUlELFVBQVUsSUFBSSxDQUFsQixFQUFxQjtBQUMxQjtBQUNBLFVBQUksS0FBS0wsWUFBTCxJQUFxQixDQUF6QixFQUNFO0FBQ0FoQixRQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RFUsa0JBQTlELENBQWlGTCxLQUFqRixFQUZGLEtBR0ssSUFBSSxLQUFLTixZQUFMLElBQXFCLENBQXpCLEVBQ0g7QUFDQSxhQUFLUSxZQUFMLENBQWtCSCxVQUFsQixFQUE4QixZQUE5QixFQUE0QyxVQUE1QyxFQUF3REMsS0FBeEQ7QUFDSCxLQVJNLE1BUUEsSUFBSUQsVUFBVSxJQUFJLENBQWxCLEVBQXFCO0FBQzFCO0FBQ0EsVUFBSSxLQUFLTCxZQUFMLElBQXFCLENBQXpCLEVBQ0U7QUFDQWhCLFFBQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEVyxZQUE5RCxDQUEyRU4sS0FBM0UsRUFGRixLQUdLLElBQUksS0FBS04sWUFBTCxJQUFxQixDQUF6QixFQUNIO0FBQ0EsYUFBS1EsWUFBTCxDQUFrQkgsVUFBbEIsRUFBOEIsWUFBOUIsRUFBNEMsVUFBNUMsRUFBd0RDLEtBQXhEO0FBQ0gsS0FSTSxNQVFBLElBQUlELFVBQVUsSUFBSSxDQUFsQixFQUFxQjtBQUMxQjtBQUNBLFVBQUksS0FBS0wsWUFBTCxJQUFxQixDQUF6QixFQUNFO0FBQ0FoQixRQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RFksWUFBOUQsQ0FBMkVQLEtBQTNFLEVBRkYsS0FHSyxJQUFJLEtBQUtOLFlBQUwsSUFBcUIsQ0FBekIsRUFDSDtBQUNBLGFBQUtRLFlBQUwsQ0FBa0JILFVBQWxCLEVBQThCLFlBQTlCLEVBQTRDLFVBQTVDLEVBQXdEQyxLQUF4RDtBQUNILEtBUk0sTUFRQSxJQUFJRCxVQUFVLElBQUksQ0FBbEIsRUFBcUI7QUFDMUI7QUFDQSxVQUFJLEtBQUtMLFlBQUwsSUFBcUIsQ0FBekIsRUFDRTtBQUNBaEIsUUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERhLG1CQUE5RCxDQUFrRlIsS0FBbEYsRUFGRixLQUdLLElBQUksS0FBS04sWUFBTCxJQUFxQixDQUF6QixFQUNIO0FBQ0EsYUFBS1EsWUFBTCxDQUFrQkgsVUFBbEIsRUFBOEIsWUFBOUIsRUFBNEMsVUFBNUMsRUFBd0RDLEtBQXhEO0FBQ0gsS0FSTSxNQVFBLElBQUlELFVBQVUsSUFBSSxDQUFsQixFQUFxQjtBQUMxQjtBQUNBLFVBQUksS0FBS0wsWUFBTCxJQUFxQixDQUF6QixFQUNFO0FBQ0FoQixRQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RGMsMkJBQTlELENBQTBGVCxLQUExRixFQUZGLEtBR0ssSUFBSSxLQUFLTixZQUFMLElBQXFCLENBQXpCLEVBQ0g7QUFDQSxhQUFLUSxZQUFMLENBQWtCSCxVQUFsQixFQUE4QixZQUE5QixFQUE0QyxVQUE1QyxFQUF3REMsS0FBeEQ7QUFDSCxLQVJNLE1BUUEsSUFBSUQsVUFBVSxJQUFJLENBQWxCLEVBQXFCO0FBQzFCO0FBQ0EsVUFBSSxLQUFLTCxZQUFMLElBQXFCLENBQXpCLEVBQ0U7QUFDQWhCLFFBQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEZSxnQkFBOUQsQ0FBK0VWLEtBQS9FLEVBRkYsS0FHSyxJQUFJLEtBQUtOLFlBQUwsSUFBcUIsQ0FBekIsRUFDSDtBQUNBLGFBQUtRLFlBQUwsQ0FBa0JILFVBQWxCLEVBQThCLFlBQTlCLEVBQTRDLFVBQTVDLEVBQXdEQyxLQUF4RDtBQUNILEtBUk0sTUFRQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQSxVQUFJLEtBQUtMLFlBQUwsSUFBcUIsQ0FBekIsRUFDRTtBQUNBaEIsUUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERnQixtQkFBOUQsQ0FBa0ZYLEtBQWxGLEVBRkYsS0FHSyxJQUFJLEtBQUtOLFlBQUwsSUFBcUIsQ0FBekIsRUFDSDtBQUNBLGFBQUtRLFlBQUwsQ0FBa0JILFVBQWxCLEVBQThCLFlBQTlCLEVBQTRDLFVBQTVDLEVBQXdEQyxLQUF4RDtBQUNILEtBUk0sTUFRQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQSxVQUFJLEtBQUtMLFlBQUwsSUFBcUIsQ0FBekIsRUFDRTtBQUNBaEIsUUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERpQix3QkFBOUQsQ0FBdUZaLEtBQXZGLEVBRkYsS0FHSyxJQUFJLEtBQUtOLFlBQUwsSUFBcUIsQ0FBekIsRUFDSDtBQUNBLGFBQUtRLFlBQUwsQ0FBa0JILFVBQWxCLEVBQThCLFlBQTlCLEVBQTRDLFVBQTVDLEVBQXdEQyxLQUF4RDtBQUNILEtBUk0sTUFRQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQSxVQUFJLEtBQUtMLFlBQUwsSUFBcUIsQ0FBekIsRUFDRTtBQUNBaEIsUUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERrQix5QkFBOUQsQ0FBd0ZiLEtBQXhGLEVBRkYsS0FHSyxJQUFJLEtBQUtOLFlBQUwsSUFBcUIsQ0FBekIsRUFDSDtBQUNBLGFBQUtRLFlBQUwsQ0FBa0JILFVBQWxCLEVBQThCLFlBQTlCLEVBQTRDLFVBQTVDLEVBQXdEQyxLQUF4RDtBQUNILEtBUk0sTUFRQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQSxVQUFJLEtBQUtMLFlBQUwsSUFBcUIsQ0FBekIsRUFDRTtBQUNBaEIsUUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERtQixxQkFBOUQsQ0FBb0ZkLEtBQXBGLEVBRkYsS0FHSyxJQUFJLEtBQUtOLFlBQUwsSUFBcUIsQ0FBekIsRUFDSDtBQUNBLGFBQUtRLFlBQUwsQ0FBa0JILFVBQWxCLEVBQThCLFlBQTlCLEVBQTRDLFVBQTVDLEVBQXdEQyxLQUF4RDtBQUNILEtBUk0sTUFRQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQSxVQUFJLEtBQUtMLFlBQUwsSUFBcUIsQ0FBekIsRUFDRTtBQUNBaEIsUUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERvQixRQUE5RCxDQUF1RWYsS0FBdkUsRUFGRixLQUdLLElBQUksS0FBS04sWUFBTCxJQUFxQixDQUF6QixFQUNIO0FBQ0EsYUFBS1EsWUFBTCxDQUFrQkgsVUFBbEIsRUFBOEIsWUFBOUIsRUFBNEMsVUFBNUMsRUFBd0RDLEtBQXhEO0FBQ0gsS0FSTSxNQVFBLElBQUlELFVBQVUsSUFBSSxFQUFsQixFQUFzQjtBQUMzQjtBQUNBLFVBQUksS0FBS0wsWUFBTCxJQUFxQixDQUF6QixFQUNFO0FBQ0FoQixRQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RHFCLGdCQUE5RCxDQUErRWhCLEtBQS9FLEVBRkYsS0FHSyxJQUFJLEtBQUtOLFlBQUwsSUFBcUIsQ0FBekIsRUFDSDtBQUNBLGFBQUtRLFlBQUwsQ0FBa0JILFVBQWxCLEVBQThCLFlBQTlCLEVBQTRDLFVBQTVDLEVBQXdEQyxLQUF4RDtBQUNILEtBUk0sTUFRQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQSxVQUFJLEtBQUtMLFlBQUwsSUFBcUIsQ0FBekIsRUFDRTtBQUNBaEIsUUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERzQiwyQkFBOUQsQ0FBMEZqQixLQUExRixFQUZGLEtBR0ssSUFBSSxLQUFLTixZQUFMLElBQXFCLENBQXpCLEVBQ0g7QUFDQSxhQUFLUSxZQUFMLENBQWtCSCxVQUFsQixFQUE4QixZQUE5QixFQUE0QyxVQUE1QyxFQUF3REMsS0FBeEQ7QUFDSCxLQVJNLE1BUUEsSUFBSUQsVUFBVSxJQUFJLEVBQWxCLEVBQXNCO0FBQzNCO0FBQ0EsVUFBSSxLQUFLTCxZQUFMLElBQXFCLENBQXpCLEVBQ0U7QUFDQWhCLFFBQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEdUIscUJBQTlELENBQW9GbEIsS0FBcEYsRUFGRixLQUdLLElBQUksS0FBS04sWUFBTCxJQUFxQixDQUF6QixFQUNIO0FBQ0EsYUFBS1EsWUFBTCxDQUFrQkgsVUFBbEIsRUFBOEIsWUFBOUIsRUFBNEMsVUFBNUMsRUFBd0RDLEtBQXhEO0FBQ0gsS0FSTSxNQVFBLElBQUlELFVBQVUsSUFBSSxFQUFsQixFQUFzQjtBQUMzQjtBQUNBLFVBQUksS0FBS0wsWUFBTCxJQUFxQixDQUF6QixFQUNFO0FBQ0FoQixRQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RHdCLGVBQTlELENBQThFbkIsS0FBOUUsRUFGRixLQUdLLElBQUksS0FBS04sWUFBTCxJQUFxQixDQUF6QixFQUNIO0FBQ0EsYUFBS1EsWUFBTCxDQUFrQkgsVUFBbEIsRUFBOEIsWUFBOUIsRUFBNEMsVUFBNUMsRUFBd0RDLEtBQXhEO0FBQ0gsS0FSTSxNQVFBLElBQUlELFVBQVUsSUFBSSxFQUFsQixFQUFzQjtBQUMzQjtBQUNBLFVBQUksS0FBS0wsWUFBTCxJQUFxQixDQUF6QixFQUNFO0FBQ0FoQixRQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RHlCLHFCQUE5RCxDQUFvRnBCLEtBQXBGLEVBRkYsS0FHSyxJQUFJLEtBQUtOLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEIsQ0FDL0I7QUFDQTtBQUNEO0FBQ0YsS0FUTSxNQVNBLElBQUlLLFVBQVUsSUFBSSxFQUFsQixFQUFzQjtBQUMzQjtBQUNBckIsTUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQwQixrQkFBOUQsQ0FBaUZyQixLQUFqRjtBQUNELEtBSE0sTUFHQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0IsVUFBSSxLQUFLTCxZQUFMLElBQXFCLENBQXpCLEVBQ0U7QUFDQWhCLFFBQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEMkIsb0JBQTlELENBQW1GdEIsS0FBbkYsRUFGRixLQUdLLElBQUksS0FBS04sWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMvQjtBQUNBLGFBQUtRLFlBQUwsQ0FBa0JILFVBQWxCLEVBQThCLFlBQTlCLEVBQTRDLFVBQTVDLEVBQXdEQyxLQUF4RDtBQUNEO0FBQ0YsS0FSTSxNQVFBLElBQUlELFVBQVUsSUFBSSxFQUFsQixFQUFzQjtBQUMzQixVQUFJLEtBQUtMLFlBQUwsSUFBcUIsQ0FBekIsRUFDRTtBQUNBaEIsUUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQ0QixvQkFBOUQsQ0FBbUZ2QixLQUFuRixFQUZGLEtBR0ssSUFBSSxLQUFLTixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQy9CO0FBQ0EsYUFBS1EsWUFBTCxDQUFrQkgsVUFBbEIsRUFBOEIsWUFBOUIsRUFBNEMsVUFBNUMsRUFBd0RDLEtBQXhEO0FBQ0Q7QUFDRixLQVJNLE1BUUEsSUFBSUQsVUFBVSxJQUFJLEVBQWxCLEVBQXNCO0FBQzNCLFVBQUksS0FBS0wsWUFBTCxJQUFxQixDQUF6QixFQUNFO0FBQ0FoQixRQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDZCLGdCQUE5RCxDQUErRXhCLEtBQS9FLEVBRkYsS0FHSyxJQUFJLEtBQUtOLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDL0I7QUFDQSxhQUFLUSxZQUFMLENBQWtCSCxVQUFsQixFQUE4QixZQUE5QixFQUE0QyxVQUE1QyxFQUF3REMsS0FBeEQ7QUFDRDtBQUNGLEtBUk0sTUFRQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0IsVUFBSSxLQUFLTCxZQUFMLElBQXFCLENBQXpCLEVBQ0U7QUFDQWhCLFFBQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsd0JBQTlELENBQXVGekIsS0FBdkYsRUFGRixLQUdLLElBQUksS0FBS04sWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMvQjtBQUNBLGFBQUtRLFlBQUwsQ0FBa0JILFVBQWxCLEVBQThCLFlBQTlCLEVBQTRDLFVBQTVDLEVBQXdEQyxLQUF4RDtBQUNEO0FBQ0YsS0FSTSxNQVFBLElBQUlELFVBQVUsSUFBSSxFQUFsQixFQUFzQjtBQUMzQixVQUFJLEtBQUtMLFlBQUwsSUFBcUIsQ0FBekIsRUFDRTtBQUNBaEIsUUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQrQix1QkFBOUQsQ0FBc0YxQixLQUF0RixFQUZGLEtBR0ssSUFBSSxLQUFLTixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQy9CO0FBQ0EsYUFBS1EsWUFBTCxDQUFrQkgsVUFBbEIsRUFBOEIsWUFBOUIsRUFBNEMsVUFBNUMsRUFBd0RDLEtBQXhEO0FBQ0Q7QUFDRjtBQUNGLEdBbk9tQztBQXFPcENFLEVBQUFBLFlBck9vQyx3QkFxT3ZCSCxVQXJPdUIsRUFxT1g0QixXQXJPVyxFQXFPRUMsU0FyT0YsRUFxT2E1QixLQXJPYixFQXFPb0I7QUFDdEQsUUFBSUQsVUFBVSxJQUFJLENBQWxCLEVBQXFCO0FBQ25CO0FBQ0E4QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBa0JILFdBQTlCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFnQkYsU0FBNUI7QUFDQWhELE1BQUFBLEVBQUUsQ0FBQ21ELFdBQUgsQ0FBZUMsSUFBZixDQUFvQixVQUFwQixFQUFnQ2hDLEtBQWhDLEVBQXVDNEIsU0FBdkMsRUFKbUIsQ0FJZ0M7QUFDcEQsS0FMRCxNQUtPLElBQUk3QixVQUFVLElBQUksQ0FBbEIsRUFBcUI7QUFDMUI7QUFDQThCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQkgsV0FBOUI7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQWdCRixTQUE1QjtBQUNBbEQsTUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDK0MsZUFBbEMsR0FBb0RDLFdBQXBELENBQWdFbEMsS0FBaEU7QUFDRCxLQUxNLE1BS0EsSUFBSUQsVUFBVSxJQUFJLENBQWxCLEVBQXFCO0FBQzFCO0FBQ0E4QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBa0JILFdBQTlCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFnQkYsU0FBNUI7QUFDQWxELE1BQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQytDLGVBQWxDLEdBQW9ERSxZQUFwRCxDQUFpRW5DLEtBQWpFO0FBQ0QsS0FMTSxNQUtBLElBQUlELFVBQVUsSUFBSSxDQUFsQixFQUFxQjtBQUMxQjtBQUNBOEIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQWtCSCxXQUE5QjtBQUNBRSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBZ0JGLFNBQTVCO0FBQ0FsRCxNQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0MrQyxlQUFsQyxHQUFvREcsd0JBQXBELENBQTZFcEMsS0FBN0U7QUFDRCxLQUxNLE1BS0EsSUFBSUQsVUFBVSxJQUFJLENBQWxCLEVBQXFCO0FBQzFCO0FBQ0E4QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBa0JILFdBQTlCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFnQkYsU0FBNUI7QUFDQWxELE1BQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQytDLGVBQWxDLEdBQW9ESSxtQkFBcEQsQ0FBd0VyQyxLQUF4RTtBQUNELEtBTE0sTUFLQSxJQUFJRCxVQUFVLElBQUksQ0FBbEIsRUFBcUI7QUFDMUI7QUFDQThCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQkgsV0FBOUI7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQWdCRixTQUE1QjtBQUNBbEQsTUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDK0MsZUFBbEMsR0FBb0RLLFlBQXBELENBQWlFdEMsS0FBakU7QUFDRCxLQUxNLE1BS0EsSUFBSUQsVUFBVSxJQUFJLENBQWxCLEVBQXFCO0FBQzFCO0FBQ0E4QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBa0JILFdBQTlCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFnQkYsU0FBNUI7QUFDQWxELE1BQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQytDLGVBQWxDLEdBQW9ETSxtQ0FBcEQsQ0FBd0Z2QyxLQUF4RjtBQUNELEtBTE0sTUFLQSxJQUFJRCxVQUFVLElBQUksQ0FBbEIsRUFBcUI7QUFDMUI7QUFDQThCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQkgsV0FBOUI7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQWdCRixTQUE1QjtBQUNBbEQsTUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDK0MsZUFBbEMsR0FBb0RPLGdDQUFwRCxDQUFxRnhDLEtBQXJGO0FBQ0QsS0FMTSxNQUtBLElBQUlELFVBQVUsSUFBSSxDQUFsQixFQUFxQjtBQUMxQjtBQUNBOEIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQWtCSCxXQUE5QjtBQUNBRSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBZ0JGLFNBQTVCO0FBQ0FsRCxNQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0MrQyxlQUFsQyxHQUFvRFEsbUJBQXBELENBQXdFekMsS0FBeEU7QUFDRCxLQUxNLE1BS0EsSUFBSUQsVUFBVSxJQUFJLEVBQWxCLEVBQXNCO0FBQzNCO0FBQ0E4QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBa0JILFdBQTlCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFnQkYsU0FBNUI7QUFDQWxELE1BQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQytDLGVBQWxDLEdBQW9EUywwQ0FBcEQsQ0FBK0YxQyxLQUEvRjtBQUNELEtBTE0sTUFLQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQThCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQkgsV0FBOUI7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQWdCRixTQUE1QjtBQUNBbEQsTUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDeUQscUJBQWxDLEdBQTBEQyw2QkFBMUQsQ0FBd0Y1QyxLQUF4RjtBQUNELEtBTE0sTUFLQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQThCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQkgsV0FBOUI7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQWdCRixTQUE1QjtBQUNBbEQsTUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDeUQscUJBQWxDLEdBQTBERSwyQ0FBMUQsQ0FBc0c3QyxLQUF0RztBQUNELEtBTE0sTUFLQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQThCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQkgsV0FBOUI7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQWdCRixTQUE1QjtBQUNBbEQsTUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDK0MsZUFBbEMsR0FBb0RhLGtDQUFwRCxDQUF1RjlDLEtBQXZGO0FBQ0QsS0FMTSxNQUtBLElBQUlELFVBQVUsSUFBSSxFQUFsQixFQUFzQjtBQUMzQjtBQUNBOEIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQWtCSCxXQUE5QjtBQUNBRSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBZ0JGLFNBQTVCO0FBQ0FsRCxNQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0N5RCxxQkFBbEMsR0FBMERJLFFBQTFELENBQW1FL0MsS0FBbkU7QUFDRCxLQUxNLE1BS0EsSUFBSUQsVUFBVSxJQUFJLEVBQWxCLEVBQXNCO0FBQzNCO0FBQ0E4QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBa0JILFdBQTlCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFnQkYsU0FBNUI7QUFDQWxELE1BQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQytDLGVBQWxDLEdBQW9EZSxvQkFBcEQsQ0FBeUVoRCxLQUF6RTtBQUNELEtBTE0sTUFLQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQThCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQkgsV0FBOUI7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQWdCRixTQUE1QjtBQUNBbEQsTUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDK0MsZUFBbEMsR0FBb0RnQiwwREFBcEQsQ0FBK0dqRCxLQUEvRztBQUNELEtBTE0sTUFLQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQThCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQkgsV0FBOUI7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQWdCRixTQUE1QjtBQUNBbEQsTUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDK0MsZUFBbEMsR0FBb0RpQixtQ0FBcEQsQ0FBd0ZsRCxLQUF4RjtBQUNBdEIsTUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDK0MsZUFBbEMsR0FBb0RrQixzQ0FBcEQsQ0FBMkZuRCxLQUEzRjtBQUNELEtBTk0sTUFNQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQThCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQkgsV0FBOUI7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQWdCRixTQUE1QjtBQUNBbEQsTUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDK0MsZUFBbEMsR0FBb0RtQixrQkFBcEQsQ0FBdUUsS0FBdkUsRUFBOEUsS0FBOUUsRUFBcUYsS0FBckYsRUFBNEYsS0FBNUYsRUFBbUdwRCxLQUFuRztBQUNELEtBTE0sTUFLQSxJQUFJRCxVQUFVLElBQUksRUFBbEIsRUFBc0I7QUFDM0I7QUFDQThCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQkgsV0FBOUI7QUFDQUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQWdCRixTQUE1QjtBQUNBbEQsTUFBQUEsd0JBQXdCLENBQUNRLFFBQXpCLENBQWtDK0MsZUFBbEMsR0FBb0RvQixjQUFwRCxDQUFtRXJELEtBQW5FO0FBQ0QsS0FMTSxNQUtBLElBQUlELFVBQVUsSUFBSSxFQUFsQixFQUFzQjtBQUMzQjtBQUNBOEIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQWtCSCxXQUE5QjtBQUNBRSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBZ0JGLFNBQTVCO0FBQ0FsRCxNQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0MrQyxlQUFsQyxHQUFvRHFCLDRCQUFwRCxDQUFpRixJQUFqRjtBQUVBLFVBQUlDLFFBQVEsR0FBRztBQUFFQyxRQUFBQSxJQUFJLEVBQUU7QUFBUixPQUFmO0FBQ0E5RSxNQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0N5RCxxQkFBbEMsR0FBMERJLFFBQTFELENBQW1FUSxRQUFuRTtBQUNELEtBUk0sTUFRQSxJQUFJeEQsVUFBVSxJQUFJLEVBQWxCLEVBQXNCO0FBQzNCO0FBQ0E4QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBa0JILFdBQTlCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFnQkYsU0FBNUI7QUFDQWxELE1BQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQytDLGVBQWxDLEdBQW9Ed0IseUJBQXBELENBQThFekQsS0FBOUU7QUFDRCxLQUxNLE1BS0EsSUFBSUQsVUFBVSxJQUFJLEVBQWxCLEVBQXNCO0FBQzNCO0FBQ0E4QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBa0JILFdBQTlCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFnQkYsU0FBNUI7QUFDQWxELE1BQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQytDLGVBQWxDLEdBQW9EeUIsK0NBQXBELENBQW9HMUQsS0FBcEc7QUFDRCxLQUxNLE1BS0EsSUFBSUQsVUFBVSxJQUFJLEVBQWxCLEVBQXNCO0FBQzNCO0FBQ0E4QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBa0JILFdBQTlCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFnQkYsU0FBNUI7QUFDQWxELE1BQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQytDLGVBQWxDLEdBQW9EMEIsaUVBQXBELENBQXNIM0QsS0FBdEg7QUFDRCxLQUxNLE1BS0EsSUFBSUQsVUFBVSxJQUFJLEVBQWxCLEVBQXNCO0FBQzNCO0FBQ0E4QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBa0JILFdBQTlCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFnQkYsU0FBNUI7QUFDQWxELE1BQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQ3lELHFCQUFsQyxHQUEwRGlCLDJCQUExRCxDQUFzRjVELEtBQXRGO0FBQ0QsS0FMTSxNQUtBLElBQUlELFVBQVUsSUFBSSxFQUFsQixFQUFzQjtBQUMzQjtBQUNBOEIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQWtCSCxXQUE5QjtBQUNBRSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBZ0JGLFNBQTVCO0FBQ0FsRCxNQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0MrQyxlQUFsQyxHQUFvRDRCLDhDQUFwRCxDQUFtRzdELEtBQW5HO0FBQ0Q7QUFDRjtBQXhXbUMsQ0FBVCxDQUE3QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcblxyXG52YXIgTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk11bHRpcGxheWVyU3luY01hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gIHByb3BlcnRpZXM6IHt9LFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFJlbW92ZVBlcnNpc3ROb2RlKCkge1xyXG4gICAgTXVsdGlwbGF5ZXJTeW5jTWFuYWdlci5JbnN0YW5jZSA9IG51bGw7XHJcbiAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGlmICghTXVsdGlwbGF5ZXJTeW5jTWFuYWdlci5JbnN0YW5jZSkge1xyXG4gICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICBNdWx0aXBsYXllclN5bmNNYW5hZ2VyLkluc3RhbmNlID0gdGhpcztcclxuICAgIH1cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLlNlbGVjdGVkTW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudChfZXZlbnRDb2RlLCBfZGF0YSkge1xyXG4gICAgaWYgKF9ldmVudENvZGUgPT0gMSkge1xyXG4gICAgICAvL3NlbmRpbmcgcGxheWVyaW5mb1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmREYXRhKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMikge1xyXG4gICAgICAvL3NlbmRpbmcgVHVybiBTdGFydCBDYWxsXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU3RhcnRUdXJuKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMykge1xyXG4gICAgICAvL3NlbmRpbmcgRGljZSBSb2xsIFZhbHVlXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGljZVJvbGxFdmVudChfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDQpIHtcclxuICAgICAgLy9zZW5kaW5nIHVzZXJJRCBvZiBwbGF5ZXIgd2hvIGhhZCBjb21wbGV0ZWQgdGhlaXIgdHVyblxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlN5bmNUdXJuQ29tcGxldGlvbihfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDUpIHtcclxuICAgICAgLy9zZW5kaW5nIGNhcmQgZGF0YSAoaW5kZXgpIHNvIG90aGVyIHVzZXJzIGNhbiBzeW5jIHRoZW1cclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kQ2FyZERhdGEoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSA2KSB7XHJcbiAgICAgIC8vc2VuZGluZyBjYWxsIHRvIGVuZCB0aGUgZ2FtZVxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRHYW1lT3ZlcihfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDcpIHtcclxuICAgICAgLy9zZW5kaW5nIGRhdGEgZm9yIG9uZSBxdWVzdGlvbiBzcGFjZVxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRPbmVRdWVzdGlvbkRhdGEoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSA4KSB7XHJcbiAgICAgIC8vc2VuZGluZyBiYWNrIGRhdGEgZm9yIG9uZSBxdWVzdGlvbiBzcGFjZVxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YShfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDkpIHtcclxuICAgICAgLy9zZW5kaW5nIGRhdGEgdG8gcmVzZXQgcG9zaXRpb25zIGFmdGVyIGJhbmtydXB0XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZEJhbmtydXB0RGF0YShfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDEwKSB7XHJcbiAgICAgIC8vc2VuZGluZyBnbyBiYWNrIHNwYWNlcyBkYXRhXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZEdvQmFja1NwYWNlRGF0YShfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDExKSB7XHJcbiAgICAgIC8vc2VuZGluZyBvcGVuIHBhcnRuZXJzaGlwIG9mZmVyIHRvIGV2ZXJ5b25lXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTIpIHtcclxuICAgICAgLy9zZW5kaW5nIGFuc3dlciB0byBwbGF5ZXIgd2hvIGluaXRpYXRlZCBwYXJ0bmVyc2hpcCBjYWxsXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YShfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDEzKSB7XHJcbiAgICAgIC8vc2VuZGluZyBwcm9maXQgdG8gcmVzcGVjdGl2ZSBwYXJ0bmVyXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZFBhcnRuZXJQcm9maXRMb3NzKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTUpIHtcclxuICAgICAgLy9zZW5kaW5nIHBheWRheSBpbmZvcm1hdGlvbiB0byBzaG93XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZEluZm8oX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxNikge1xyXG4gICAgICAvL3NlbmRpbmcgY2FsbCB0byBlbmQgdGhlIGdhbWVcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kR2FtZU92ZXJEYXRhKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTcpIHtcclxuICAgICAgLy9zZW5kaW5nIGRhdGEgb2YgcGxheWVyIHRvIGdldCBhbGwgcHJvZml0IG5leHQgcGF5IGRheVxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRTZWxlY3RlZFBsYXllckZvclByb2ZpdChfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDE4KSB7XHJcbiAgICAgIC8vc2VuZGluZyBkYXRhIG9mIG9uZSBxdWVzdGlvbiBhcnJheVxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRPbmVRdWVzdGlvbkFycmF5cyhfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDE5KSB7XHJcbiAgICAgIC8vc2VuZGluZyBkYXRhIG9mIGRlY2tzIGFycmF5XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZERlY2tzQXJyYXlzKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMjApIHtcclxuICAgICAgLy9zZW5kaW5nIGRhdGEgb2YgZGVja3MgYXJyYXlcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kRGVja3NBcnJheUNvdW50ZXIoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgLy90aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyMSkge1xyXG4gICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kQ2FzaERlZHVjdERhdGEoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDIyKSB7XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZENhc2hBZGRpdGlvbkRhdGEoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMjMpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kVGFrZUJ1c2luZXNzRGF0YShfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyNCkge1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmREYW1hZ2luZ0RhdGEoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMjUpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kRGFtYWdpbmdEZWNpc2lvbkRhdGEoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMjYpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kQnV5SGFsZkJ1c2luZXNzRGF0YShfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgX3NlbmRlck5hbWUsIF9zZW5kZXJJRCwgX2RhdGEpIHtcclxuICAgIGlmIChfZXZlbnRDb2RlID09IDEpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgcGxheWVyaW5mb1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlN5bmNEYXRhXCIsIF9kYXRhLCBfc2VuZGVySUQpOyAvL2Z1bmN0aW9uIGRlZmluZWQgaW4gR2FtZXBsYXlVSU1hbmFnZXJcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyKSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIHN0YXJ0IFR1cm5cclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5UdXJuSGFuZGxlcihfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMykge1xyXG4gICAgICAvL3JlY2VpdmluZyBkaWNlIHJvbGwgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLnN5bmNEaWNlUm9sbChfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gNCkge1xyXG4gICAgICAvL3JlY2VpdmluZyB1c2VyaWQgb2YgcGxheWVyIHdobyBoYXMgY29tcGxldGVkIHR1cm5cclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDUpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDYpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgZ2FtZSBvdmVyIGNhbGxcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TeW5jR2FtZU92ZXIoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDcpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgb25lIHF1ZXN0aW9uIGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5RdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbihfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gOCkge1xyXG4gICAgICAvL3JlY2VpdmluZyBvbmUgcXVlc3Rpb24gcmVzcG9uc2UgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSA5KSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIGJhbmtydXBjeSBkYXRhXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVjZWl2ZUJhbmtydXB0RGF0YShfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTApIHtcclxuICAgICAgLy9yZWNlaXZpbmcgYmFua3J1cGN5IGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDExKSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIHBhcnRuZXJzaGlwIG9mZmVyIGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cChfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTIpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgcGFydG5lcnNoaXAgYW5zd2VyIGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZWNlaXZlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxMykge1xyXG4gICAgICAvL3JlY2VpdmluZyBwYXJ0bmVyc2hpcCBhbnN3ZXIgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDE1KSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIHBheWRheSBpbmZvXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd0luZm8oX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDE2KSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIHBheWRheSBpbmZvXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3luY0dhbWVDb21wbGV0ZURhdGEoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDE3KSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIHBheWRheSBpbmZvXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50X1NlbGVjdFBsYXllckZvclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTgpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgb25lIHF1ZXN0aW9uIGFycmF5IGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Qb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfVm9jYWJ1bGFyeShfZGF0YSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Qb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfRXN0YWJsaXNobWVudChfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTkpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgb25lIHF1ZXN0aW9uIGFycmF5IGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Qb3B1bGF0ZURlY2tzQXJyYXkoZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyMCkge1xyXG4gICAgICAvL3JlY2VpdmluZyBvbmUgcXVlc3Rpb24gYXJyYXkgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlVwZGF0ZUNvdW50ZXJzKF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyMSkge1xyXG4gICAgICAvL3JlY2VpdmluZyBjYXNoIGRlZHVjdGlvbiBkYXRhXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVkdWN0Q2FzaF9DYXJkRnVuY3Rpb25hbGl0eSg1MDAwKTtcclxuXHJcbiAgICAgIHZhciBfbmV3RGF0YSA9IHsgaW5mbzogXCJUdXRpb24gZmVlIHdhcyBkZWR1Y3RlZC5cIiB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd0luZm8oX25ld0RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDIyKSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIGNhc2ggZGVkdWN0aW9uIGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5BZGRDYXNoX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyMykge1xyXG4gICAgICAvL3JlY2VpdmluZyBjYXNoIGRlZHVjdGlvbiBkYXRhXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50X1Rha2VPdmVyQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDI0KSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIGNhc2ggZGVkdWN0aW9uIGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZWNlaXZlRXZlbnRfU2VsZWN0UGxheWVyRGFtYWdpbmdEZWNpc2lvbl9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMjUpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgY2FzaCBkZWR1Y3Rpb24gZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlY2VpdmVFdmVudF9EYW1hZ2VEZWNpc2lvbihfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMjYpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgY2FzaCBkZWR1Y3Rpb24gZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVFdmVudF9CdXlIYWxmQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkoX2RhdGEpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG4iXX0=