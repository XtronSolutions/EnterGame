
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
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  RaiseEvent: function RaiseEvent(_eventCode, _data) {
    if (_eventCode == 1) //sending playerinfo 
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendData(_data);
      } else if (_eventCode == 2) //sending Turn Start Call
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().StartTurn(_data);
      } else if (_eventCode == 3) //sending Dice Roll Value
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().DiceRollEvent(_data);
      } else if (_eventCode == 4) //sending userID of player who had completed their turn
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SyncTurnCompletion(_data);
      } else if (_eventCode == 5) //sending card data (index) so other users can sync them
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendCardData(_data);
      } else if (_eventCode == 6) //sending call to end the game
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendGameOver(_data);
      } else if (_eventCode == 7) //sending data for one question space
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendOneQuestionData(_data);
      } else if (_eventCode == 8) //sending back data for one question space
      {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().SendOneQuestionResponseData(_data);
      }
  },
  ReceiveEvent: function ReceiveEvent(_eventCode, _senderName, _senderID, _data) {
    if (_eventCode == 1) //receiving playerinfo
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        cc.systemEvent.emit("SyncData", _data, _senderID); //function defined in GameplayUIManager
      } else if (_eventCode == 2) //receiving start Turn
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        GamePlayReferenceManager.Instance.Get_GameManager().TurnHandler(_data);
      } else if (_eventCode == 3) //receiving dice roll data
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        GamePlayReferenceManager.Instance.Get_GameManager().syncDiceRoll(_data);
      } else if (_eventCode == 4) //receiving userid of player who has completed turn
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEventTurnComplete(_data);
      } else if (_eventCode == 5) //receiving card data (index) so other users can sync them
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEventForCard(_data);
      } else if (_eventCode == 6) //receiving game over call
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        GamePlayReferenceManager.Instance.Get_GameManager().SyncGameOver(_data);
      } else if (_eventCode == 7) //receiving one question data
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        GamePlayReferenceManager.Instance.Get_GameManager().QuestionPopUp_OtherUser_OneQuestion(_data);
      } else if (_eventCode == 8) //receiving one question response data
      {
        console.log("sender name: " + _senderName);
        console.log("sender ID: " + _senderID);
        GamePlayReferenceManager.Instance.Get_GameManager().ReceiveEventDecision_OneQuestion(_data);
      }
  },
  start: function start() {} // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllclN5bmNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIk11bHRpcGxheWVyU3luY01hbmFnZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsImdhbWUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwib25Mb2FkIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiQ2hlY2tSZWZlcmVuY2VzIiwicmVxdWlyZSIsIlJhaXNlRXZlbnQiLCJfZXZlbnRDb2RlIiwiX2RhdGEiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiU2VuZERhdGEiLCJTdGFydFR1cm4iLCJEaWNlUm9sbEV2ZW50IiwiU3luY1R1cm5Db21wbGV0aW9uIiwiU2VuZENhcmREYXRhIiwiU2VuZEdhbWVPdmVyIiwiU2VuZE9uZVF1ZXN0aW9uRGF0YSIsIlNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YSIsIlJlY2VpdmVFdmVudCIsIl9zZW5kZXJOYW1lIiwiX3NlbmRlcklEIiwiY29uc29sZSIsImxvZyIsInN5c3RlbUV2ZW50IiwiZW1pdCIsIkdldF9HYW1lTWFuYWdlciIsIlR1cm5IYW5kbGVyIiwic3luY0RpY2VSb2xsIiwiUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlIiwiUmVjZWl2ZUV2ZW50Rm9yQ2FyZCIsIlN5bmNHYW1lT3ZlciIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBQyxJQUE3QjtBQUVBLElBQUlDLHNCQUFzQixHQUFDQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNoQ0MsRUFB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bnVsbDtcclxuXHJcbnZhciBNdWx0aXBsYXllclN5bmNNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJNdWx0aXBsYXllclN5bmNNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczogeyAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgICAgICBJbnN0YW5jZTogbnVsbCxcclxuICAgIH0sXHJcblxyXG4gICAgUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIE11bHRpcGxheWVyU3luY01hbmFnZXIuSW5zdGFuY2U9bnVsbDtcclxuICAgICAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cclxuICAgICAgICBpZighTXVsdGlwbGF5ZXJTeW5jTWFuYWdlci5JbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyU3luY01hbmFnZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJhaXNlRXZlbnQgKF9ldmVudENvZGUsX2RhdGEpIHsgIFxyXG4gICAgICAgIGlmKF9ldmVudENvZGU9PTEpIC8vc2VuZGluZyBwbGF5ZXJpbmZvIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kRGF0YShfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09MikgLy9zZW5kaW5nIFR1cm4gU3RhcnQgQ2FsbFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TdGFydFR1cm4oX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTMpIC8vc2VuZGluZyBEaWNlIFJvbGwgVmFsdWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGljZVJvbGxFdmVudChfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09NCkgLy9zZW5kaW5nIHVzZXJJRCBvZiBwbGF5ZXIgd2hvIGhhZCBjb21wbGV0ZWQgdGhlaXIgdHVyblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TeW5jVHVybkNvbXBsZXRpb24oX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTUpIC8vc2VuZGluZyBjYXJkIGRhdGEgKGluZGV4KSBzbyBvdGhlciB1c2VycyBjYW4gc3luYyB0aGVtXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRDYXJkRGF0YShfZGF0YSk7XHJcbiAgICAgICAgfWVsc2UgaWYoX2V2ZW50Q29kZT09NikgLy9zZW5kaW5nIGNhbGwgdG8gZW5kIHRoZSBnYW1lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRHYW1lT3ZlcihfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09NykgLy9zZW5kaW5nIGRhdGEgZm9yIG9uZSBxdWVzdGlvbiBzcGFjZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kT25lUXVlc3Rpb25EYXRhKF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfZXZlbnRDb2RlPT04KSAvL3NlbmRpbmcgYmFjayBkYXRhIGZvciBvbmUgcXVlc3Rpb24gc3BhY2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhKF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVFdmVudCAoX2V2ZW50Q29kZSxfc2VuZGVyTmFtZSxfc2VuZGVySUQsX2RhdGEpIHtcclxuICAgICAgICBpZihfZXZlbnRDb2RlPT0xKSAvL3JlY2VpdmluZyBwbGF5ZXJpbmZvXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIitfc2VuZGVyTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIitfc2VuZGVySUQpO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiU3luY0RhdGFcIixfZGF0YSxfc2VuZGVySUQpOyAvL2Z1bmN0aW9uIGRlZmluZWQgaW4gR2FtZXBsYXlVSU1hbmFnZXJcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09MikgLy9yZWNlaXZpbmcgc3RhcnQgVHVyblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIrX3NlbmRlck5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIrX3NlbmRlcklEKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlR1cm5IYW5kbGVyKF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfZXZlbnRDb2RlPT0zKSAvL3JlY2VpdmluZyBkaWNlIHJvbGwgZGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIrX3NlbmRlck5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIrX3NlbmRlcklEKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLnN5bmNEaWNlUm9sbChfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09NCkgLy9yZWNlaXZpbmcgdXNlcmlkIG9mIHBsYXllciB3aG8gaGFzIGNvbXBsZXRlZCB0dXJuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIitfc2VuZGVyTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIitfc2VuZGVySUQpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlKF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfZXZlbnRDb2RlPT01KSAvL3JlY2VpdmluZyBjYXJkIGRhdGEgKGluZGV4KSBzbyBvdGhlciB1c2VycyBjYW4gc3luYyB0aGVtXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIitfc2VuZGVyTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIitfc2VuZGVySUQpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50Rm9yQ2FyZChfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09NikgLy9yZWNlaXZpbmcgZ2FtZSBvdmVyIGNhbGxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiK19zZW5kZXJOYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiK19zZW5kZXJJRCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TeW5jR2FtZU92ZXIoX2RhdGEpO1xyXG4gICAgICAgIH1lbHNlIGlmKF9ldmVudENvZGU9PTcpIC8vcmVjZWl2aW5nIG9uZSBxdWVzdGlvbiBkYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIitfc2VuZGVyTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIitfc2VuZGVySUQpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24oX2RhdGEpO1xyXG4gICAgICAgIH1lbHNlIGlmKF9ldmVudENvZGU9PTgpIC8vcmVjZWl2aW5nIG9uZSBxdWVzdGlvbiByZXNwb25zZSBkYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIitfc2VuZGVyTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIitfc2VuZGVySUQpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=