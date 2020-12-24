
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/RoomListHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
    GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinRoom(this.RoomName);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxSb29tTGlzdEhhbmRsZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiUm9vbUxpc3RIYW5kbGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiTmFtZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwiUGxheWVyc0xhYmVsIiwiUm9vbU5hbWUiLCJUZXh0Iiwib25FbmFibGUiLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwiU2V0Um9vbU5hbWUiLCJfbmFtZSIsImNvbnNvbGUiLCJsb2ciLCJzdHJpbmciLCJTZXRQbGF5ZXJDb3VudCIsIl9jb3VudCIsIlNwZWN0YXRlUm9vbSIsIkluc3RhbmNlIiwiR2V0X1VJTWFuYWdlciIsIlRvZ2dsZUxvYWRpbmdOb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkpvaW5Sb29tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsZUFBZSxHQUFDQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN6QkMsRUFBQUEsSUFBSSxFQUFDLGlCQURvQjtBQUV6QixhQUFTRixFQUFFLENBQUNHLFNBRmE7QUFJekJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxJQURGO0FBRVBDLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTyxLQUZGO0FBR1BDLE1BQUFBLFlBQVksRUFBRTtBQUhQLEtBREg7QUFLUkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWSCxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FGQztBQUdWQyxNQUFBQSxZQUFZLEVBQUU7QUFISixLQUxOO0FBU1JFLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLEVBREg7QUFFTkosTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNXLElBRkg7QUFHTkgsTUFBQUEsWUFBWSxFQUFFO0FBSFI7QUFURixHQUphO0FBbUJ6QkksRUFBQUEsUUFuQnlCLHNCQW9CekI7QUFDSSxTQUFLRixRQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtHLGVBQUw7QUFDSCxHQXZCd0I7QUF5QnpCQSxFQUFBQSxlQXpCeUIsNkJBMEJ6QjtBQUNHLFFBQUcsQ0FBQ2Ysd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFFLElBQTFELEVBQ0tBLHdCQUF3QixHQUFDZ0IsT0FBTyxDQUFDLDBCQUFELENBQWhDO0FBQ1AsR0E3QndCO0FBK0J6QkMsRUFBQUEsV0EvQnlCLHVCQStCYkMsS0EvQmEsRUFnQ3pCO0FBQ0ksU0FBS04sUUFBTCxHQUFjTSxLQUFkO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtSLFFBQWpCO0FBQ0EsU0FBS0wsU0FBTCxDQUFlYyxNQUFmLEdBQXNCSCxLQUF0QjtBQUNILEdBcEN3QjtBQXNDekJJLEVBQUFBLGNBdEN5QiwwQkFzQ1ZDLE1BdENVLEVBdUN6QjtBQUNJLFNBQUtaLFlBQUwsQ0FBa0JVLE1BQWxCLEdBQXlCLGFBQVdFLE1BQXBDO0FBQ0gsR0F6Q3dCO0FBMkN6QkMsRUFBQUEsWUEzQ3lCLDBCQTRDekI7QUFDSXhCLElBQUFBLHdCQUF3QixDQUFDeUIsUUFBekIsQ0FBa0NDLGFBQWxDLEdBQWtEQyxpQkFBbEQsQ0FBb0UsSUFBcEU7QUFDQSxTQUFLWixlQUFMO0FBQ0EsU0FBS0gsUUFBTCxHQUFjLEtBQUtMLFNBQUwsQ0FBZWMsTUFBN0I7QUFDQUYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS2IsU0FBTCxDQUFlYyxNQUEzQjtBQUNBRixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLUixRQUFqQjtBQUNBWixJQUFBQSx3QkFBd0IsQ0FBQ3lCLFFBQXpCLENBQWtDRyx5QkFBbEMsR0FBOERDLFFBQTlELENBQXVFLEtBQUtqQixRQUE1RTtBQUNIO0FBbkR3QixDQUFULENBQXBCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBSb29tTGlzdEhhbmRsZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlJvb21MaXN0SGFuZGxlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgICAgIFBsYXllcnNMYWJlbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgICAgUm9vbU5hbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlJvb21OYW1lPVwiXCI7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgIHtcclxuICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldFJvb21OYW1lKF9uYW1lKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUm9vbU5hbWU9X25hbWU7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Sb29tTmFtZSk7XHJcbiAgICAgICAgdGhpcy5OYW1lTGFiZWwuc3RyaW5nPV9uYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRQbGF5ZXJDb3VudChfY291bnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJzTGFiZWwuc3RyaW5nPVwiUGxheWVyczpcIitfY291bnQ7XHJcbiAgICB9LFxyXG5cclxuICAgIFNwZWN0YXRlUm9vbSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVMb2FkaW5nTm9kZSh0cnVlKTtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuUm9vbU5hbWU9dGhpcy5OYW1lTGFiZWwuc3RyaW5nO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTmFtZUxhYmVsLnN0cmluZyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5Sb29tTmFtZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luUm9vbSh0aGlzLlJvb21OYW1lKTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=