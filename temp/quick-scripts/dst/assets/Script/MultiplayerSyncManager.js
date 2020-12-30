
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
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  RaiseEvent: function RaiseEvent(_eventCode, _data) {
    if (_eventCode == 1) //sending playerinfo 
      {
        if (this.SelectedMode == 2) //for player
          GamePlayReferenceManager.Instance.Get_MultiplayerController().SendData(_data);else if (this.SelectedMode == 1) //for bot
          this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      } else if (_eventCode == 2) //sending Turn Start Call
      {
        if (this.SelectedMode == 2) //for player
          GamePlayReferenceManager.Instance.Get_MultiplayerController().StartTurn(_data);else if (this.SelectedMode == 1) //for bot
          this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      } else if (_eventCode == 3) //sending Dice Roll Value
      {
        if (this.SelectedMode == 2) //for player
          GamePlayReferenceManager.Instance.Get_MultiplayerController().DiceRollEvent(_data);else if (this.SelectedMode == 1) //for bot
          this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      } else if (_eventCode == 4) //sending userID of player who had completed their turn
      {
        if (this.SelectedMode == 2) //for player
          GamePlayReferenceManager.Instance.Get_MultiplayerController().SyncTurnCompletion(_data);else if (this.SelectedMode == 1) //for bot
          this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      } else if (_eventCode == 5) //sending card data (index) so other users can sync them
      {
        if (this.SelectedMode == 2) //for player
          GamePlayReferenceManager.Instance.Get_MultiplayerController().SendCardData(_data);else if (this.SelectedMode == 1) //for bot
          this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      } else if (_eventCode == 6) //sending call to end the game
      {
        if (this.SelectedMode == 2) //for player
          GamePlayReferenceManager.Instance.Get_MultiplayerController().SendGameOver(_data);else if (this.SelectedMode == 1) //for bot
          this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      } else if (_eventCode == 7) //sending data for one question space
      {
        if (this.SelectedMode == 2) //for player
          GamePlayReferenceManager.Instance.Get_MultiplayerController().SendOneQuestionData(_data);else if (this.SelectedMode == 1) //for bot
          this.ReceiveEvent(_eventCode, "customName", "customID", _data);
      } else if (_eventCode == 8) //sending back data for one question space
      {
        if (this.SelectedMode == 2) //for player
          GamePlayReferenceManager.Instance.Get_MultiplayerController().SendOneQuestionResponseData(_data);else if (this.SelectedMode == 1) //for bot
          this.ReceiveEvent(_eventCode, "customName", "customID", _data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllclN5bmNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIk11bHRpcGxheWVyU3luY01hbmFnZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsImdhbWUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwib25Mb2FkIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiQ2hlY2tSZWZlcmVuY2VzIiwiU2VsZWN0ZWRNb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsInJlcXVpcmUiLCJSYWlzZUV2ZW50IiwiX2V2ZW50Q29kZSIsIl9kYXRhIiwiU2VuZERhdGEiLCJSZWNlaXZlRXZlbnQiLCJTdGFydFR1cm4iLCJEaWNlUm9sbEV2ZW50IiwiU3luY1R1cm5Db21wbGV0aW9uIiwiU2VuZENhcmREYXRhIiwiU2VuZEdhbWVPdmVyIiwiU2VuZE9uZVF1ZXN0aW9uRGF0YSIsIlNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YSIsIl9zZW5kZXJOYW1lIiwiX3NlbmRlcklEIiwiY29uc29sZSIsImxvZyIsInN5c3RlbUV2ZW50IiwiZW1pdCIsIkdldF9HYW1lTWFuYWdlciIsIlR1cm5IYW5kbGVyIiwic3luY0RpY2VSb2xsIiwiUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlIiwiUmVjZWl2ZUV2ZW50Rm9yQ2FyZCIsIlN5bmNHYW1lT3ZlciIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUMsSUFBN0I7QUFFQSxJQUFJQyxzQkFBc0IsR0FBQ0MsRUFBRSxD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Q0FBa0M4QixlQUFsQyxHQUFvRE0sbUNBQXBELENBQXdGdEIsS0FBeEY7QUFDSCxPQUxLLE1BS0EsSUFBR0QsVUFBVSxJQUFFLENBQWYsRUFBa0I7QUFDeEI7QUFDSWEsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQWdCSCxXQUE1QjtBQUNBRSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBY0YsU0FBMUI7QUFDQWpDLFFBQUFBLHdCQUF3QixDQUFDUSxRQUF6QixDQUFrQzhCLGVBQWxDLEdBQW9ETyxnQ0FBcEQsQ0FBcUZ2QixLQUFyRjtBQUNIO0FBQ0o7QUE5SStCLENBQVQsQ0FBM0IiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxuXHJcbnZhciBNdWx0aXBsYXllclN5bmNNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJNdWx0aXBsYXllclN5bmNNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczogeyAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgICAgICBJbnN0YW5jZTogbnVsbCxcclxuICAgIH0sXHJcblxyXG4gICAgUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIE11bHRpcGxheWVyU3luY01hbmFnZXIuSW5zdGFuY2U9bnVsbDtcclxuICAgICAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cclxuICAgICAgICBpZighTXVsdGlwbGF5ZXJTeW5jTWFuYWdlci5JbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyU3luY01hbmFnZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkTW9kZT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJhaXNlRXZlbnQgKF9ldmVudENvZGUsX2RhdGEpIHsgIFxyXG4gICAgICAgIGlmKF9ldmVudENvZGU9PTEpIC8vc2VuZGluZyBwbGF5ZXJpbmZvIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcGxheWVyXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNlbmREYXRhKF9kYXRhKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsXCJjdXN0b21OYW1lXCIsXCJjdXN0b21JRFwiLF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfZXZlbnRDb2RlPT0yKSAvL3NlbmRpbmcgVHVybiBTdGFydCBDYWxsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciBwbGF5ZXJcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuU3RhcnRUdXJuKF9kYXRhKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsXCJjdXN0b21OYW1lXCIsXCJjdXN0b21JRFwiLF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfZXZlbnRDb2RlPT0zKSAvL3NlbmRpbmcgRGljZSBSb2xsIFZhbHVlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciBwbGF5ZXJcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGljZVJvbGxFdmVudChfZGF0YSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpLy9mb3IgYm90XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLFwiY3VzdG9tTmFtZVwiLFwiY3VzdG9tSURcIixfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09NCkgLy9zZW5kaW5nIHVzZXJJRCBvZiBwbGF5ZXIgd2hvIGhhZCBjb21wbGV0ZWQgdGhlaXIgdHVyblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcGxheWVyXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlN5bmNUdXJuQ29tcGxldGlvbihfZGF0YSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpLy9mb3IgYm90XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLFwiY3VzdG9tTmFtZVwiLFwiY3VzdG9tSURcIixfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoX2V2ZW50Q29kZT09NSkgLy9zZW5kaW5nIGNhcmQgZGF0YSAoaW5kZXgpIHNvIG90aGVyIHVzZXJzIGNhbiBzeW5jIHRoZW1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHBsYXllclxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kQ2FyZERhdGEoX2RhdGEpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vZm9yIGJvdFxyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSxcImN1c3RvbU5hbWVcIixcImN1c3RvbUlEXCIsX2RhdGEpO1xyXG5cclxuICAgICAgICB9ZWxzZSBpZihfZXZlbnRDb2RlPT02KSAvL3NlbmRpbmcgY2FsbCB0byBlbmQgdGhlIGdhbWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHBsYXllclxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kR2FtZU92ZXIoX2RhdGEpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vZm9yIGJvdFxyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSxcImN1c3RvbU5hbWVcIixcImN1c3RvbUlEXCIsX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTcpIC8vc2VuZGluZyBkYXRhIGZvciBvbmUgcXVlc3Rpb24gc3BhY2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHBsYXllclxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kT25lUXVlc3Rpb25EYXRhKF9kYXRhKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsXCJjdXN0b21OYW1lXCIsXCJjdXN0b21JRFwiLF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfZXZlbnRDb2RlPT04KSAvL3NlbmRpbmcgYmFjayBkYXRhIGZvciBvbmUgcXVlc3Rpb24gc3BhY2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHBsYXllclxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5TZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGEoX2RhdGEpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vZm9yIGJvdFxyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSxcImN1c3RvbU5hbWVcIixcImN1c3RvbUlEXCIsX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUmVjZWl2ZUV2ZW50IChfZXZlbnRDb2RlLF9zZW5kZXJOYW1lLF9zZW5kZXJJRCxfZGF0YSkge1xyXG4gICAgICAgIGlmKF9ldmVudENvZGU9PTEpIC8vcmVjZWl2aW5nIHBsYXllcmluZm9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiK19zZW5kZXJOYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiK19zZW5kZXJJRCk7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJTeW5jRGF0YVwiLF9kYXRhLF9zZW5kZXJJRCk7IC8vZnVuY3Rpb24gZGVmaW5lZCBpbiBHYW1lcGxheVVJTWFuYWdlclxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfZXZlbnRDb2RlPT0yKSAvL3JlY2VpdmluZyBzdGFydCBUdXJuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIitfc2VuZGVyTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIitfc2VuZGVySUQpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVHVybkhhbmRsZXIoX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTMpIC8vcmVjZWl2aW5nIGRpY2Ugcm9sbCBkYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBuYW1lOiBcIitfc2VuZGVyTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIElEOiBcIitfc2VuZGVySUQpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuc3luY0RpY2VSb2xsKF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfZXZlbnRDb2RlPT00KSAvL3JlY2VpdmluZyB1c2VyaWQgb2YgcGxheWVyIHdobyBoYXMgY29tcGxldGVkIHR1cm5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiK19zZW5kZXJOYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiK19zZW5kZXJJRCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUoX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKF9ldmVudENvZGU9PTUpIC8vcmVjZWl2aW5nIGNhcmQgZGF0YSAoaW5kZXgpIHNvIG90aGVyIHVzZXJzIGNhbiBzeW5jIHRoZW1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiK19zZW5kZXJOYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiK19zZW5kZXJJRCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZWNlaXZlRXZlbnRGb3JDYXJkKF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihfZXZlbnRDb2RlPT02KSAvL3JlY2VpdmluZyBnYW1lIG92ZXIgY2FsbFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgbmFtZTogXCIrX3NlbmRlck5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRlciBJRDogXCIrX3NlbmRlcklEKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN5bmNHYW1lT3ZlcihfZGF0YSk7XHJcbiAgICAgICAgfWVsc2UgaWYoX2V2ZW50Q29kZT09NykgLy9yZWNlaXZpbmcgb25lIHF1ZXN0aW9uIGRhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiK19zZW5kZXJOYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiK19zZW5kZXJJRCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5RdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbihfZGF0YSk7XHJcbiAgICAgICAgfWVsc2UgaWYoX2V2ZW50Q29kZT09OCkgLy9yZWNlaXZpbmcgb25lIHF1ZXN0aW9uIHJlc3BvbnNlIGRhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGVyIG5hbWU6IFwiK19zZW5kZXJOYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kZXIgSUQ6IFwiK19zZW5kZXJJRCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5SZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iXX0=