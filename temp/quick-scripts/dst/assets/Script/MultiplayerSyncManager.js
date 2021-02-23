
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllclN5bmNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIk11bHRpcGxheWVyU3luY01hbmFnZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsImdhbWUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwib25Mb2FkIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiQ2hlY2tSZWZlcmVuY2VzIiwiU2VsZWN0ZWRNb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsInJlcXVpcmUiLCJSYWlzZUV2ZW50IiwiX2V2ZW50Q29kZSIsIl9kYXRhIiwiU2VuZERhdGEiLCJSZWNlaXZlRXZlbnQiLCJTdGFydFR1cm4iLCJEaWNlUm9sbEV2ZW50IiwiU3luY1R1cm5Db21wbGV0aW9uIiwiU2VuZENhcmREYXRhIiwiU2VuZEdhbWVPdmVyIiwiU2VuZE9uZVF1ZXN0aW9uRGF0YSIsIlNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YSIsIlNlbmRCYW5rcnVwdERhdGEiLCJTZW5kR29CYWNrU3BhY2VEYXRhIiwiU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhIiwiU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YSIsIlNlbmRQYXJ0bmVyUHJvZml0TG9zcyIsIlNlbmRJbmZvIiwiU2VuZEdhbWVPdmVyRGF0YSIsIlNlbmRTZWxlY3RlZFBsYXllckZvclByb2ZpdCIsIlNlbmRPbmVRdWVzdGlvbkFycmF5cyIsIlNlbmREZWNrc0FycmF5cyIsIlNlbmREZWNrc0FycmF5Q291bnRlciIsIlNlbmRDYXNoRGVkdWN0RGF0YSIsIlNlbmRDYXNoQWRkaXRpb25EYXRhIiwiX3NlbmRlck5hbWUiLCJfc2VuZGVySUQiLCJjb25zb2xlIiwibG9nIiwic3lzdGVtRXZlbnQiLCJlbWl0IiwiR2V0X0dhbWVNYW5hZ2VyIiwiVHVybkhhbmRsZXIiLCJzeW5jRGljZVJvbGwiLCJSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiU3luY0dhbWVPdmVyIiwiUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24iLCJSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbiIsIlJlY2VpdmVCYW5rcnVwdERhdGEiLCJSZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cCIsIlJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJSZWNlaXZlUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiU2hvd0luZm8iLCJTeW5jR2FtZUNvbXBsZXRlRGF0YSIsIlJlY2VpdmVFdmVudF9TZWxlY3RQbGF5ZXJGb3JQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJQb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfVm9jYWJ1bGFyeSIsIlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Fc3RhYmxpc2htZW50IiwiUG9wdWxhdGVEZWNrc0FycmF5IiwiVXBkYXRlQ291bnRlcnMiLCJEZWR1Y3RDYXNoX0NhcmRGdW5jdGlvbmFsaXR5IiwiX25ld0RhdGEiLCJpbmZvIiwiQWRkQ2FzaF9DYXJkRnVuY3Rpb25hbGl0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBRyxJQUEvQjtBQUVBLElBQUlDLHNCQUFzQixHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNwQ0MsRUFBQUEsSUFBSSxFQUFFLHdCQUQ4QjtBQUVwQyxhQUFTRixFQUFFLENBQUNHLFNBRndCO0FBSXBDQyxFQUFBQSxVQUFVLEVBQUUsRUFKd0I7QUFNcENDLEVBQUFB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UUFBekIsQ0FBa0NxRCxxQkFBbEMsR0FBMERJLFFBQTFELENBQW1FUSxRQUFuRTtBQUNELEtBUk0sTUFRQSxJQUFJcEQsVUFBVSxJQUFJLEVBQWxCLEVBQXNCO0FBQzNCO0FBQ0EwQixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBa0JILFdBQTlCO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFnQkYsU0FBNUI7QUFDQTlDLE1BQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQzJDLGVBQWxDLEdBQW9Ed0IseUJBQXBELENBQThFckQsS0FBOUU7QUFDRDtBQUNGO0FBcFRtQyxDQUFULENBQTdCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuXHJcbnZhciBNdWx0aXBsYXllclN5bmNNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiTXVsdGlwbGF5ZXJTeW5jTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge30sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIC8vY3JlYXRpbmcgc3RhdGljIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgUmVtb3ZlUGVyc2lzdE5vZGUoKSB7XHJcbiAgICBNdWx0aXBsYXllclN5bmNNYW5hZ2VyLkluc3RhbmNlID0gbnVsbDtcclxuICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgaWYgKCFNdWx0aXBsYXllclN5bmNNYW5hZ2VyLkluc3RhbmNlKSB7XHJcbiAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgIE11bHRpcGxheWVyU3luY01hbmFnZXIuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuU2VsZWN0ZWRNb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50KF9ldmVudENvZGUsIF9kYXRhKSB7XHJcbiAgICBpZiAoX2V2ZW50Q29kZSA9PSAxKSB7XHJcbiAgICAgIC8vc2VuZGluZyBwbGF5ZXJpbmZvXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZERhdGEoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyKSB7XHJcbiAgICAgIC8vc2VuZGluZyBUdXJuIFN0YXJ0IENhbGxcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TdGFydFR1cm4oX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAzKSB7XHJcbiAgICAgIC8vc2VuZGluZyBEaWNlIFJvbGwgVmFsdWVcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaWNlUm9sbEV2ZW50KF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gNCkge1xyXG4gICAgICAvL3NlbmRpbmcgdXNlcklEIG9mIHBsYXllciB3aG8gaGFkIGNvbXBsZXRlZCB0aGVpciB0dXJuXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU3luY1R1cm5Db21wbGV0aW9uKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gNSkge1xyXG4gICAgICAvL3NlbmRpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRDYXJkRGF0YShfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDYpIHtcclxuICAgICAgLy9zZW5kaW5nIGNhbGwgdG8gZW5kIHRoZSBnYW1lXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZEdhbWVPdmVyKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gNykge1xyXG4gICAgICAvL3NlbmRpbmcgZGF0YSBmb3Igb25lIHF1ZXN0aW9uIHNwYWNlXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZE9uZVF1ZXN0aW9uRGF0YShfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDgpIHtcclxuICAgICAgLy9zZW5kaW5nIGJhY2sgZGF0YSBmb3Igb25lIHF1ZXN0aW9uIHNwYWNlXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gOSkge1xyXG4gICAgICAvL3NlbmRpbmcgZGF0YSB0byByZXNldCBwb3NpdGlvbnMgYWZ0ZXIgYmFua3J1cHRcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kQmFua3J1cHREYXRhKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTApIHtcclxuICAgICAgLy9zZW5kaW5nIGdvIGJhY2sgc3BhY2VzIGRhdGFcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kR29CYWNrU3BhY2VEYXRhKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTEpIHtcclxuICAgICAgLy9zZW5kaW5nIG9wZW4gcGFydG5lcnNoaXAgb2ZmZXIgdG8gZXZlcnlvbmVcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kUGFydG5lclNoaXBPZmZlckRhdGEoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxMikge1xyXG4gICAgICAvL3NlbmRpbmcgYW5zd2VyIHRvIHBsYXllciB3aG8gaW5pdGlhdGVkIHBhcnRuZXJzaGlwIGNhbGxcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTMpIHtcclxuICAgICAgLy9zZW5kaW5nIHByb2ZpdCB0byByZXNwZWN0aXZlIHBhcnRuZXJcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kUGFydG5lclByb2ZpdExvc3MoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxNSkge1xyXG4gICAgICAvL3NlbmRpbmcgcGF5ZGF5IGluZm9ybWF0aW9uIHRvIHNob3dcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kSW5mbyhfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDE2KSB7XHJcbiAgICAgIC8vc2VuZGluZyBjYWxsIHRvIGVuZCB0aGUgZ2FtZVxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRHYW1lT3ZlckRhdGEoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxNykge1xyXG4gICAgICAvL3NlbmRpbmcgZGF0YSBvZiBwbGF5ZXIgdG8gZ2V0IGFsbCBwcm9maXQgbmV4dCBwYXkgZGF5XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZFNlbGVjdGVkUGxheWVyRm9yUHJvZml0KF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTgpIHtcclxuICAgICAgLy9zZW5kaW5nIGRhdGEgb2Ygb25lIHF1ZXN0aW9uIGFycmF5XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZE9uZVF1ZXN0aW9uQXJyYXlzKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTkpIHtcclxuICAgICAgLy9zZW5kaW5nIGRhdGEgb2YgZGVja3MgYXJyYXlcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kRGVja3NBcnJheXMoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyMCkge1xyXG4gICAgICAvL3NlbmRpbmcgZGF0YSBvZiBkZWNrcyBhcnJheVxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmREZWNrc0FycmF5Q291bnRlcihfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICAvL3RoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDIxKSB7XHJcbiAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRDYXNoRGVkdWN0RGF0YShfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMjIpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kQ2FzaEFkZGl0aW9uRGF0YShfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgX3NlbmRlck5hbWUsIF9zZW5kZXJJRCwgX2RhdGEpIHtcclxuICAgIGlmIChfZXZlbnRDb2RlID09IDEpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgcGxheWVyaW5mb1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlN5bmNEYXRhXCIsIF9kYXRhLCBfc2VuZGVySUQpOyAvL2Z1bmN0aW9uIGRlZmluZWQgaW4gR2FtZXBsYXlVSU1hbmFnZXJcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyKSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIHN0YXJ0IFR1cm5cclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5UdXJuSGFuZGxlcihfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMykge1xyXG4gICAgICAvL3JlY2VpdmluZyBkaWNlIHJvbGwgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLnN5bmNEaWNlUm9sbChfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gNCkge1xyXG4gICAgICAvL3JlY2VpdmluZyB1c2VyaWQgb2YgcGxheWVyIHdobyBoYXMgY29tcGxldGVkIHR1cm5cclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDUpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDYpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgZ2FtZSBvdmVyIGNhbGxcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TeW5jR2FtZU92ZXIoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDcpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgb25lIHF1ZXN0aW9uIGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5RdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbihfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gOCkge1xyXG4gICAgICAvL3JlY2VpdmluZyBvbmUgcXVlc3Rpb24gcmVzcG9uc2UgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSA5KSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIGJhbmtydXBjeSBkYXRhXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVjZWl2ZUJhbmtydXB0RGF0YShfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTApIHtcclxuICAgICAgLy9yZWNlaXZpbmcgYmFua3J1cGN5IGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDExKSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIHBhcnRuZXJzaGlwIG9mZmVyIGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cChfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTIpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgcGFydG5lcnNoaXAgYW5zd2VyIGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZWNlaXZlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxMykge1xyXG4gICAgICAvL3JlY2VpdmluZyBwYXJ0bmVyc2hpcCBhbnN3ZXIgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDE1KSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIHBheWRheSBpbmZvXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd0luZm8oX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDE2KSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIHBheWRheSBpbmZvXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3luY0dhbWVDb21wbGV0ZURhdGEoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDE3KSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIHBheWRheSBpbmZvXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50X1NlbGVjdFBsYXllckZvclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTgpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgb25lIHF1ZXN0aW9uIGFycmF5IGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Qb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfVm9jYWJ1bGFyeShfZGF0YSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Qb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfRXN0YWJsaXNobWVudChfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTkpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgb25lIHF1ZXN0aW9uIGFycmF5IGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Qb3B1bGF0ZURlY2tzQXJyYXkoZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyMCkge1xyXG4gICAgICAvL3JlY2VpdmluZyBvbmUgcXVlc3Rpb24gYXJyYXkgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlVwZGF0ZUNvdW50ZXJzKF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyMSkge1xyXG4gICAgICAvL3JlY2VpdmluZyBjYXNoIGRlZHVjdGlvbiBkYXRhXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVkdWN0Q2FzaF9DYXJkRnVuY3Rpb25hbGl0eSg1MDAwKTtcclxuXHJcbiAgICAgIHZhciBfbmV3RGF0YSA9IHsgaW5mbzogXCJUdXRpb24gZmVlIHdhcyBkZWR1Y3RlZC5cIiB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd0luZm8oX25ld0RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDIyKSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIGNhc2ggZGVkdWN0aW9uIGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5BZGRDYXNoX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuIl19