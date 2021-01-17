"use strict";
cc._RF.push(module, '761a5iRiZJM2qPCdr3cL3GO', 'RoomListHandler');
// Script/RoomListHandler.js

"use strict";

var GamePlayReferenceManager = null;
var RoomListHandler = cc.Class({
  name: "RoomListHandler",
  "extends": cc.Component,
  properties: {
    NameLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    PlayersLabel: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    RoomName: {
      "default": "",
      type: cc.Text,
      serializable: true
    }
  },
  onEnable: function onEnable() {
    GamePlayReferenceManager = null;
    this.RoomName = "";
    this.CheckReferences();
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  SetRoomName: function SetRoomName(_name) {
    this.RoomName = _name;
    console.log(this.RoomName);
    this.NameLabel.string = _name;
  },
  SetPlayerCount: function SetPlayerCount(_count) {
    this.PlayersLabel.string = "Players:" + _count;
  },
  SpectateRoom: function SpectateRoom() {
    GamePlayReferenceManager.Instance.Get_UIManager().ToggleLoadingNode(true);
    this.CheckReferences();
    this.RoomName = this.NameLabel.string;
    console.log(this.NameLabel.string);
    console.log(this.RoomName);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleModeSelection(2);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinRoom(this.RoomName);
  }
});

cc._RF.pop();