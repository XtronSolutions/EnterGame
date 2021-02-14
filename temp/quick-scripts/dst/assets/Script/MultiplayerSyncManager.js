
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllclN5bmNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIk11bHRpcGxheWVyU3luY01hbmFnZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsImdhbWUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwib25Mb2FkIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiQ2hlY2tSZWZlcmVuY2VzIiwiU2VsZWN0ZWRNb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsInJlcXVpcmUiLCJSYWlzZUV2ZW50IiwiX2V2ZW50Q29kZSIsIl9kYXRhIiwiU2VuZERhdGEiLCJSZWNlaXZlRXZlbnQiLCJTdGFydFR1cm4iLCJEaWNlUm9sbEV2ZW50IiwiU3luY1R1cm5Db21wbGV0aW9uIiwiU2VuZENhcmREYXRhIiwiU2VuZEdhbWVPdmVyIiwiU2VuZE9uZVF1ZXN0aW9uRGF0YSIsIlNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YSIsIlNlbmRCYW5rcnVwdERhdGEiLCJTZW5kR29CYWNrU3BhY2VEYXRhIiwiU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhIiwiU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YSIsIlNlbmRQYXJ0bmVyUHJvZml0TG9zcyIsIlNlbmRJbmZvIiwiU2VuZEdhbWVPdmVyRGF0YSIsIlNlbmRTZWxlY3RlZFBsYXllckZvclByb2ZpdCIsIlNlbmRPbmVRdWVzdGlvbkFycmF5cyIsIlNlbmREZWNrc0FycmF5cyIsIlNlbmREZWNrc0FycmF5Q291bnRlciIsIl9zZW5kZXJOYW1lIiwiX3NlbmRlcklEIiwiY29uc29sZSIsImxvZyIsInN5c3RlbUV2ZW50IiwiZW1pdCIsIkdldF9HYW1lTWFuYWdlciIsIlR1cm5IYW5kbGVyIiwic3luY0RpY2VSb2xsIiwiUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlIiwiUmVjZWl2ZUV2ZW50Rm9yQ2FyZCIsIlN5bmNHYW1lT3ZlciIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJSZWNlaXZlQmFua3J1cHREYXRhIiwiUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAiLCJSZWNlaXZlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwIiwiUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIlNob3dJbmZvIiwiU3luY0dhbWVDb21wbGV0ZURhdGEiLCJSZWNlaXZlRXZlbnRfU2VsZWN0UGxheWVyRm9yUHJvZml0X1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5IiwiUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X1ZvY2FidWxhcnkiLCJQb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfRXN0YWJsaXNobWVudCIsIlBvcHVsYXRlRGVja3NBcnJheSIsIlVwZGF0ZUNvdW50ZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFHLElBQS9CO0FBRUEsSUFBSUMsc0JBQXNCLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3BDQyxFQUFBQSxJQUFJLEVBQUUsd0JBRDhCO0FBRXBDLGFBQVNGLEVBQUUsQ0FBQ0csU0FGd0I7QUFJcENDLEVBQUFBLFVBQVUsRUFBRSxFQUp3QjtBQU1wQ0MsRUFBQUEsT0FBTyxFQUFFO0FBQ1A7QUFDQUMsSUFBQUEsUUFBUSxFQUFFO0FBRkgsR0FOMkI7QUFXcENDLEVBQUFBLGlCQVhvQywrQkFXaEI7QUFDbEJSLElBQUFBLHNCQUFzQixDQUFDTyxRQUF2QixHQUFrQyxJQUFsQztB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LFNBQTVCO0FBQ0E1QyxNQUFBQSx3QkFBd0IsQ0FBQ1EsUUFBekIsQ0FBa0N5QyxlQUFsQyxHQUFvRG9CLGNBQXBELENBQW1FL0MsS0FBbkU7QUFDRDtBQUNGO0FBNVJtQyxDQUFULENBQTdCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuXHJcbnZhciBNdWx0aXBsYXllclN5bmNNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiTXVsdGlwbGF5ZXJTeW5jTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge30sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIC8vY3JlYXRpbmcgc3RhdGljIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgUmVtb3ZlUGVyc2lzdE5vZGUoKSB7XHJcbiAgICBNdWx0aXBsYXllclN5bmNNYW5hZ2VyLkluc3RhbmNlID0gbnVsbDtcclxuICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgaWYgKCFNdWx0aXBsYXllclN5bmNNYW5hZ2VyLkluc3RhbmNlKSB7XHJcbiAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgIE11bHRpcGxheWVyU3luY01hbmFnZXIuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuU2VsZWN0ZWRNb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50KF9ldmVudENvZGUsIF9kYXRhKSB7XHJcbiAgICBpZiAoX2V2ZW50Q29kZSA9PSAxKSB7XHJcbiAgICAgIC8vc2VuZGluZyBwbGF5ZXJpbmZvXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZERhdGEoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyKSB7XHJcbiAgICAgIC8vc2VuZGluZyBUdXJuIFN0YXJ0IENhbGxcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TdGFydFR1cm4oX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAzKSB7XHJcbiAgICAgIC8vc2VuZGluZyBEaWNlIFJvbGwgVmFsdWVcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaWNlUm9sbEV2ZW50KF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gNCkge1xyXG4gICAgICAvL3NlbmRpbmcgdXNlcklEIG9mIHBsYXllciB3aG8gaGFkIGNvbXBsZXRlZCB0aGVpciB0dXJuXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU3luY1R1cm5Db21wbGV0aW9uKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gNSkge1xyXG4gICAgICAvL3NlbmRpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRDYXJkRGF0YShfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDYpIHtcclxuICAgICAgLy9zZW5kaW5nIGNhbGwgdG8gZW5kIHRoZSBnYW1lXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZEdhbWVPdmVyKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gNykge1xyXG4gICAgICAvL3NlbmRpbmcgZGF0YSBmb3Igb25lIHF1ZXN0aW9uIHNwYWNlXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZE9uZVF1ZXN0aW9uRGF0YShfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDgpIHtcclxuICAgICAgLy9zZW5kaW5nIGJhY2sgZGF0YSBmb3Igb25lIHF1ZXN0aW9uIHNwYWNlXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gOSkge1xyXG4gICAgICAvL3NlbmRpbmcgZGF0YSB0byByZXNldCBwb3NpdGlvbnMgYWZ0ZXIgYmFua3J1cHRcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kQmFua3J1cHREYXRhKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTApIHtcclxuICAgICAgLy9zZW5kaW5nIGdvIGJhY2sgc3BhY2VzIGRhdGFcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kR29CYWNrU3BhY2VEYXRhKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTEpIHtcclxuICAgICAgLy9zZW5kaW5nIG9wZW4gcGFydG5lcnNoaXAgb2ZmZXIgdG8gZXZlcnlvbmVcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kUGFydG5lclNoaXBPZmZlckRhdGEoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxMikge1xyXG4gICAgICAvL3NlbmRpbmcgYW5zd2VyIHRvIHBsYXllciB3aG8gaW5pdGlhdGVkIHBhcnRuZXJzaGlwIGNhbGxcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTMpIHtcclxuICAgICAgLy9zZW5kaW5nIHByb2ZpdCB0byByZXNwZWN0aXZlIHBhcnRuZXJcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kUGFydG5lclByb2ZpdExvc3MoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxNSkge1xyXG4gICAgICAvL3NlbmRpbmcgcGF5ZGF5IGluZm9ybWF0aW9uIHRvIHNob3dcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kSW5mbyhfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpXHJcbiAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgXCJjdXN0b21OYW1lXCIsIFwiY3VzdG9tSURcIiwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDE2KSB7XHJcbiAgICAgIC8vc2VuZGluZyBjYWxsIHRvIGVuZCB0aGUgZ2FtZVxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRHYW1lT3ZlckRhdGEoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxNykge1xyXG4gICAgICAvL3NlbmRpbmcgZGF0YSBvZiBwbGF5ZXIgdG8gZ2V0IGFsbCBwcm9maXQgbmV4dCBwYXkgZGF5XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZFNlbGVjdGVkUGxheWVyRm9yUHJvZml0KF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTgpIHtcclxuICAgICAgLy9zZW5kaW5nIGRhdGEgb2Ygb25lIHF1ZXN0aW9uIGFycmF5XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKVxyXG4gICAgICAgIC8vZm9yIHBsYXllclxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZE9uZVF1ZXN0aW9uQXJyYXlzKF9kYXRhKTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBcImN1c3RvbU5hbWVcIiwgXCJjdXN0b21JRFwiLCBfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTkpIHtcclxuICAgICAgLy9zZW5kaW5nIGRhdGEgb2YgZGVja3MgYXJyYXlcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpXHJcbiAgICAgICAgLy9mb3IgcGxheWVyXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kRGVja3NBcnJheXMoX2RhdGEpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAyMCkge1xyXG4gICAgICAvL3NlbmRpbmcgZGF0YSBvZiBkZWNrcyBhcnJheVxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMilcclxuICAgICAgICAvL2ZvciBwbGF5ZXJcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmREZWNrc0FycmF5Q291bnRlcihfZGF0YSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICAvL3RoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIFwiY3VzdG9tTmFtZVwiLCBcImN1c3RvbUlEXCIsIF9kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBfc2VuZGVyTmFtZSwgX3NlbmRlcklELCBfZGF0YSkge1xyXG4gICAgaWYgKF9ldmVudENvZGUgPT0gMSkge1xyXG4gICAgICAvL3JlY2VpdmluZyBwbGF5ZXJpbmZvXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiU3luY0RhdGFcIiwgX2RhdGEsIF9zZW5kZXJJRCk7IC8vZnVuY3Rpb24gZGVmaW5lZCBpbiBHYW1lcGxheVVJTWFuYWdlclxyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDIpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgc3RhcnQgVHVyblxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlR1cm5IYW5kbGVyKF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAzKSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIGRpY2Ugcm9sbCBkYXRhXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuc3luY0RpY2VSb2xsKF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSA0KSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIHVzZXJpZCBvZiBwbGF5ZXIgd2hvIGhhcyBjb21wbGV0ZWQgdHVyblxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZShfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gNSkge1xyXG4gICAgICAvL3JlY2VpdmluZyBjYXJkIGRhdGEgKGluZGV4KSBzbyBvdGhlciB1c2VycyBjYW4gc3luYyB0aGVtXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50Rm9yQ2FyZChfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gNikge1xyXG4gICAgICAvL3JlY2VpdmluZyBnYW1lIG92ZXIgY2FsbFxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN5bmNHYW1lT3ZlcihfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gNykge1xyXG4gICAgICAvL3JlY2VpdmluZyBvbmUgcXVlc3Rpb24gZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uKF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSA4KSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIG9uZSBxdWVzdGlvbiByZXNwb25zZSBkYXRhXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDkpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgYmFua3J1cGN5IGRhdGFcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZWNlaXZlQmFua3J1cHREYXRhKF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxMCkge1xyXG4gICAgICAvL3JlY2VpdmluZyBiYW5rcnVwY3kgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTEpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgcGFydG5lcnNoaXAgb2ZmZXIgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlY2VpdmVFdmVudF9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxMikge1xyXG4gICAgICAvL3JlY2VpdmluZyBwYXJ0bmVyc2hpcCBhbnN3ZXIgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDEzKSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIHBhcnRuZXJzaGlwIGFuc3dlciBkYXRhXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTUpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgcGF5ZGF5IGluZm9cclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93SW5mbyhfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTYpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgcGF5ZGF5IGluZm9cclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TeW5jR2FtZUNvbXBsZXRlRGF0YShfZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKF9ldmVudENvZGUgPT0gMTcpIHtcclxuICAgICAgLy9yZWNlaXZpbmcgcGF5ZGF5IGluZm9cclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIgKyBfc2VuZGVyTmFtZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIiArIF9zZW5kZXJJRCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZWNlaXZlRXZlbnRfU2VsZWN0UGxheWVyRm9yUHJvZml0X1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxOCkge1xyXG4gICAgICAvL3JlY2VpdmluZyBvbmUgcXVlc3Rpb24gYXJyYXkgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Wb2NhYnVsYXJ5KF9kYXRhKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Fc3RhYmxpc2htZW50KF9kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoX2V2ZW50Q29kZSA9PSAxOSkge1xyXG4gICAgICAvL3JlY2VpdmluZyBvbmUgcXVlc3Rpb24gYXJyYXkgZGF0YVxyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIiArIF9zZW5kZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiICsgX3NlbmRlcklEKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgX2RhdGEpO1xyXG4gICAgfSBlbHNlIGlmIChfZXZlbnRDb2RlID09IDIwKSB7XHJcbiAgICAgIC8vcmVjZWl2aW5nIG9uZSBxdWVzdGlvbiBhcnJheSBkYXRhXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiICsgX3NlbmRlck5hbWUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIgKyBfc2VuZGVySUQpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVXBkYXRlQ291bnRlcnMoX2RhdGEpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG4iXX0=