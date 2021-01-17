
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxSb29tTGlzdEhhbmRsZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiUm9vbUxpc3RIYW5kbGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiTmFtZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwiUGxheWVyc0xhYmVsIiwiUm9vbU5hbWUiLCJUZXh0Iiwib25FbmFibGUiLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwiU2V0Um9vbU5hbWUiLCJfbmFtZSIsImNvbnNvbGUiLCJsb2ciLCJzdHJpbmciLCJTZXRQbGF5ZXJDb3VudCIsIl9jb3VudCIsIlNwZWN0YXRlUm9vbSIsIkluc3RhbmNlIiwiR2V0X1VJTWFuYWdlciIsIlRvZ2dsZUxvYWRpbmdOb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZU1vZGVTZWxlY3Rpb24iLCJKb2luUm9vbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBQyxJQUE3QjtBQUNBLElBQUlDLGVBQWUsR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDekJDLEVBQUFBLElBQUksRUFBQyxpQkFEb0I7QUFFekIsYUFBU0YsRUFBRSxDQUFDRyxTQUZhO0FBSXpCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1AsaUJBQVMsSUFERjtBQUVQQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FGRjtBQUdQQyxNQUFBQSxZQUFZLEVBQUU7QUFIUCxLQURIO0FBS1JDLElBQUFBLFlBQVksRUFBRTtBQUNWLGlCQUFTLElBREM7QUFFVkgsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLEtBRkM7QUFHVkMsTUFBQUEsWUFBWSxFQUFFO0FBSEosS0FMTjtBQVNSRSxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxFQURIO0FBRU5KLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDVyxJQUZIO0FBR05ILE1BQUFBLFlBQVksRUFBRTtBQUhSO0FBVEYsR0FKYTtBQW1CekJJLEVBQUFBLFFBbkJ5QixzQkFvQnpCO0FBQ0lkLElBQUFBLHdCQUF3QixHQUFHLElBQTNCO0FBQ0EsU0FBS1ksUUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLRyxlQUFMO0FBQ0gsR0F4QndCO0FBMEJ6QkEsRUFBQUEsZUExQnlCLDZCQTJCekI7QUFDRyxRQUFHLENBQUNmLHdCQUFELElBQTZCQSx3QkFBd0IsSUFBRSxJQUExRCxFQUNLQSx3QkFBd0IsR0FBQ2dCLE9BQU8sQ0FBQywwQkFBRCxDQUFoQztBQUNQLEdBOUJ3QjtBQWdDekJDLEVBQUFBLFdBaEN5Qix1QkFnQ2JDLEtBaENhLEVBaUN6QjtBQUNJLFNBQUtOLFFBQUwsR0FBY00sS0FBZDtBQUNBQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLUixRQUFqQjtBQUNBLFNBQUtMLFNBQUwsQ0FBZWMsTUFBZixHQUFzQkgsS0FBdEI7QUFDSCxHQXJDd0I7QUF1Q3pCSSxFQUFBQSxjQXZDeUIsMEJBdUNWQyxNQXZDVSxFQXdDekI7QUFDSSxTQUFLWixZQUFMLENBQWtCVSxNQUFsQixHQUF5QixhQUFXRSxNQUFwQztBQUNILEdBMUN3QjtBQTRDekJDLEVBQUFBLFlBNUN5QiwwQkE2Q3pCO0FBQ0l4QixJQUFBQSx3QkFBd0IsQ0FBQ3lCLFFBQXpCLENBQWtDQyxhQUFsQyxHQUFrREMsaUJBQWxELENBQW9FLElBQXBFO0FBQ0EsU0FBS1osZUFBTDtBQUNBLFNBQUtILFFBQUwsR0FBYyxLQUFLTCxTQUFMLENBQWVjLE1BQTdCO0FBQ0FGLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtiLFNBQUwsQ0FBZWMsTUFBM0I7QUFDQUYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS1IsUUFBakI7QUFDQVosSUFBQUEsd0JBQXdCLENBQUN5QixRQUF6QixDQUFrQ0cseUJBQWxDLEdBQThEQyxtQkFBOUQsQ0FBa0YsQ0FBbEY7QUFDQTdCLElBQUFBLHdCQUF3QixDQUFDeUIsUUFBekIsQ0FBa0NHLHlCQUFsQyxHQUE4REUsUUFBOUQsQ0FBdUUsS0FBS2xCLFFBQTVFO0FBQ0g7QUFyRHdCLENBQVQsQ0FBcEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFJvb21MaXN0SGFuZGxlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUm9vbUxpc3RIYW5kbGVyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgICAgUGxheWVyc0xhYmVsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICAgICBSb29tTmFtZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Sb29tTmFtZT1cIlwiO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICB7XHJcbiAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRSb29tTmFtZShfbmFtZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlJvb21OYW1lPV9uYW1lO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUm9vbU5hbWUpO1xyXG4gICAgICAgIHRoaXMuTmFtZUxhYmVsLnN0cmluZz1fbmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgU2V0UGxheWVyQ291bnQoX2NvdW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGxheWVyc0xhYmVsLnN0cmluZz1cIlBsYXllcnM6XCIrX2NvdW50O1xyXG4gICAgfSxcclxuXHJcbiAgICBTcGVjdGF0ZVJvb20oKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlTG9hZGluZ05vZGUodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLlJvb21OYW1lPXRoaXMuTmFtZUxhYmVsLnN0cmluZztcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk5hbWVMYWJlbC5zdHJpbmcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUm9vbU5hbWUpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTW9kZVNlbGVjdGlvbigyKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkpvaW5Sb29tKHRoaXMuUm9vbU5hbWUpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==