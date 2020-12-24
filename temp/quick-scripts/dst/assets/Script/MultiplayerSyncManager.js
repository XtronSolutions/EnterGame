
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllclN5bmNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIk11bHRpcGxheWVyU3luY01hbmFnZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsImdhbWUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwib25Mb2FkIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiQ2hlY2tSZWZlcmVuY2VzIiwicmVxdWlyZSIsIlJhaXNlRXZlbnQiLCJfZXZlbnRDb2RlIiwiX2RhdGEiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiU2VuZERhdGEiLCJTdGFydFR1cm4iLCJEaWNlUm9sbEV2ZW50IiwiU3luY1R1cm5Db21wbGV0aW9uIiwiU2VuZENhcmREYXRhIiwiU2VuZEdhbWVPdmVyIiwiUmVjZWl2ZUV2ZW50IiwiX3NlbmRlck5hbWUiLCJfc2VuZGVySUQiLCJjb25zb2xlIiwibG9nIiwic3lzdGVtRXZlbnQiLCJlbWl0IiwiR2V0X0dhbWVNYW5hZ2VyIiwiVHVybkhhbmRsZXIiLCJzeW5jRGljZVJvbGwiLCJSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiU3luY0dhbWVPdmVyIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUMsSUFBN0I7QUFFQSxJQUFJQyxzQkFBc0IsR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDaENDLEVBQUFBLElBQUksRUFBQyx3QkFEMkI7QUFFaEMsYUFBU0YsRUFBRSxDQUFDRyxTQUZvQjtBQUloQ0MsRUFBQUEsVUFBVSxFQUFFLEVBSm9CO0FBUWhDQyxFQUFBQSxPQUFPLEVBQUU7QUFBRTtBQUNQQyxJQUFBQSxRQUFRLEVB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RVIsQ0F0RytCLENBd0doQzs7QUF4R2dDLENBQVQsQ0FBM0IiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxuXHJcbnZhciBNdWx0aXBsYXllclN5bmNNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJNdWx0aXBsYXllclN5bmNNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczogeyAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgICAgICBJbnN0YW5jZTogbnVsbCxcclxuICAgIH0sXHJcblxyXG4gICAgUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIE11bHRpcGxheWVyU3luY01hbmFnZXIuSW5zdGFuY2U9bnVsbDtcclxuICAgICAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cclxuICAgICAgICBpZighTXVsdGlwbGF5ZXJTeW5jTWFuYWdlci5JbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyU3luY01hbmFnZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJhaXNlRXZlbnQgKF9ldmVudENvZGUsX2RhdGEpIHsgIFxyXG4gICAgICAgIGlmKF9ldmVudENvZGU9PTEpIC8vc2VuZGluZyBwbGF5ZXJpbmZvIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kRGF0YShfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09MikgLy9zZW5kaW5nIFR1cm4gU3RhcnQgQ2FsbFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TdGFydFR1cm4oX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTMpIC8vc2VuZGluZyBEaWNlIFJvbGwgVmFsdWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGljZVJvbGxFdmVudChfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09NCkgLy9zZW5kaW5nIHVzZXJJRCBvZiBwbGF5ZXIgd2hvIGhhZCBjb21wbGV0ZWQgdGhlaXIgdHVyblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TeW5jVHVybkNvbXBsZXRpb24oX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTUpIC8vc2VuZGluZyBjYXJkIGRhdGEgKGluZGV4KSBzbyBvdGhlciB1c2VycyBjYW4gc3luYyB0aGVtXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRDYXJkRGF0YShfZGF0YSk7XHJcbiAgICAgICAgfWVsc2UgaWYoX2V2ZW50Q29kZT09NikgLy9zZW5kaW5nIGNhbGwgdG8gZW5kIHRoZSBnYW1lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmRHYW1lT3ZlcihfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBSZWNlaXZlRXZlbnQgKF9ldmVudENvZGUsX3NlbmRlck5hbWUsX3NlbmRlcklELF9kYXRhKSB7XHJcbiAgICAgICAgaWYoX2V2ZW50Q29kZT09MSkgLy9yZWNlaXZpbmcgcGxheWVyaW5mb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIrX3NlbmRlck5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIrX3NlbmRlcklEKTtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlN5bmNEYXRhXCIsX2RhdGEsX3NlbmRlcklEKTsgLy9mdW5jdGlvbiBkZWZpbmVkIGluIEdhbWVwbGF5VUlNYW5hZ2VyXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTIpIC8vcmVjZWl2aW5nIHN0YXJ0IFR1cm5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiK19zZW5kZXJOYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiK19zZW5kZXJJRCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5UdXJuSGFuZGxlcihfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09MykgLy9yZWNlaXZpbmcgZGljZSByb2xsIGRhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiK19zZW5kZXJOYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiK19zZW5kZXJJRCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5zeW5jRGljZVJvbGwoX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTQpIC8vcmVjZWl2aW5nIHVzZXJpZCBvZiBwbGF5ZXIgd2hvIGhhcyBjb21wbGV0ZWQgdHVyblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIrX3NlbmRlck5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIrX3NlbmRlcklEKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZShfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09NSkgLy9yZWNlaXZpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIrX3NlbmRlck5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIrX3NlbmRlcklEKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTYpIC8vcmVjZWl2aW5nIGdhbWUgb3ZlciBjYWxsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIitfc2VuZGVyTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIitfc2VuZGVySUQpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3luY0dhbWVPdmVyKF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19