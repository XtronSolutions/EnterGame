
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/SpacesManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '74806FhjTREnJ7CUxRpTlDM', 'SpacesManager');
// Script/SpacesManager.js

"use strict";

var _SpaceDescription;

//-------------------------------------------Spaces Data-------------------------//
var EnumSpaceType = cc.Enum({
  None: 0,
  WildCard: 1,
  BigBusiness: 2,
  Marketing: 3,
  Invest: 4,
  Losses: 5,
  PayDay: 6,
  DoublePayDay: 7,
  OneQuestion: 8,
  Sell: 9,
  BuyOrSell: 10,
  GoBackSpaces: 11
});
var allSpaces = ["None", "Wild Card", "Big Business", "Marketing", "Invest", "Losses", "Pay Day", "Double Pay Day", "One Question", "Sell", "Buy Or Sell", "Go Back 3 Spaces"]; //-------------------------------------------class Spaces Data-------------------------//

var SpaceData = cc.Class({
  name: "SpaceData",
  properties: {
    Name: "Data",
    SpacesType: {
      type: EnumSpaceType,
      "default": EnumSpaceType.None,
      serializable: true,
      tooltip: "states machines by type of spaces on board"
    },
    SpaceDescription: (_SpaceDescription = {
      type: "Description"
    }, _SpaceDescription["type"] = cc.Text, _SpaceDescription["default"] = "", _SpaceDescription.serializable = true, _SpaceDescription.tooltip = "Description of spaces", _SpaceDescription),
    ReferenceLocation: {
      displayName: "SpaceObject",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Background image associated by the space"
    },
    CanHaveBG: {
      displayName: "ISBG",
      "default": false,
      type: cc["boolean"],
      serializable: true,
      tooltip: "if space could have background"
    },
    BGColor: {
      displayName: "BGColor",
      "default": cc.Color.WHITE,
      type: cc.Color,
      serializable: true,
      tooltip: "Color of the background"
    }
  },
  ctor: function ctor() {}
}); //-------------------------------------------Class for Spaces Manager-------------------------//

var SpacesManager = cc.Class({
  name: "SpacesManager",
  "extends": cc.Component,
  properties: {
    Data: {
      "default": [],
      type: [SpaceData],
      serializable: true
    }
  },
  ctor: function ctor() {},
  onLoad: function onLoad() {
    this.CreateSpacesPool();
  },
  start: function start() {},
  CreateSpacesPool: function CreateSpacesPool() {
    for (var i = 0; i < this.Data.length; i++) {
      if (this.Data[i].ReferenceLocation.childrenCount > 0) {
        this.Data[i].ReferenceLocation.active = true;
        this.Data[i].ReferenceLocation.getComponent('SpaceHandler').InitializeData(this.Data[i]);
        this.Data[i].ReferenceLocation.children[0].active = true;

        if (this.Data[i].CanHaveBG) {
          this.Data[i].ReferenceLocation.children[0].children[0].active = true;
          this.Data[i].ReferenceLocation.children[0].children[0].color = this.Data[i].BGColor;
        } else {
          this.Data[i].ReferenceLocation.children[0].children[0].active = false;
        }

        this.Data[i].ReferenceLocation.children[0].children[1].getComponent(cc.Label).string = allSpaces[parseInt(this.Data[i].SpacesType)];
      }
    }
  }
}); //module.exports= SpaceData;

module.exports = SpacesManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTcGFjZXNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkVudW1TcGFjZVR5cGUiLCJjYyIsIkVudW0iLCJOb25lIiwiV2lsZENhcmQiLCJCaWdCdXNpbmVzcyIsIk1hcmtldGluZyIsIkludmVzdCIsIkxvc3NlcyIsIlBheURheSIsIkRvdWJsZVBheURheSIsIk9uZVF1ZXN0aW9uIiwiU2VsbCIsIkJ1eU9yU2VsbCIsIkdvQmFja1NwYWNlcyIsImFsbFNwYWNlcyIsIlNwYWNlRGF0YSIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJOYW1lIiwiU3BhY2VzVHlwZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiU3BhY2VEZXNjcmlwdGlvbiIsIlRleHQiLCJSZWZlcmVuY2VMb2NhdGlvbiIsImRpc3BsYXlOYW1lIiwiTm9kZSIsIkNhbkhhdmVCRyIsIkJHQ29sb3IiLCJDb2xvciIsIldISVRFIiwiY3RvciIsIlNwYWNlc01hbmFnZXIiLCJDb21wb25lbnQiLCJEYXRhIiwib25Mb2FkIiwiQ3JlYXRlU3BhY2VzUG9vbCIsInN0YXJ0IiwiaSIsImxlbmd0aCIsImNoaWxkcmVuQ291bnQiLCJhY3RpdmUiLCJnZXRDb21wb25lbnQiLCJJbml0aWFsaXplRGF0YSIsImNoaWxkcmVuIiwiY29sb3IiLCJMYWJlbCIsInN0cmluZyIsInBhcnNlSW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsYUFBYSxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUN4QkMsRUFBQUEsSUFBSSxFQUFDLENBRG1CO0FBRXhCQyxFQUFBQSxRQUFRLEVBQUUsQ0FGYztBQUd4QkMsRUFBQUEsV0FBVyxFQUFFLENBSFc7QUFJeEJDLEVBQUFBLFNBQVMsRUFBRSxDQUphO0FBS3hCQyxFQUFBQSxNQUFNLEVBQUUsQ0FMZ0I7QUFNeEJDLEVBQUFBLE1BQU0sRUFBQyxD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QUF4QyxFQUEyQ0EsUUFBM0MsQ0FBb0QsQ0FBcEQsRUFBdURGLFlBQXZELENBQW9FNUMsRUFBRSxDQUFDZ0QsS0FBdkUsRUFBOEVDLE1BQTlFLEdBQXFGbkMsU0FBUyxDQUFDb0MsUUFBUSxDQUFDLEtBQUtkLElBQUwsQ0FBVUksQ0FBVixFQUFhcEIsVUFBZCxDQUFULENBQTlGO0FBQ0g7QUFDRjtBQUNGO0FBOUNzQixDQUFULENBQWxCLEVBZ0RBOztBQUNBK0IsTUFBTSxDQUFDQyxPQUFQLEdBQWdCbEIsYUFBaEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVNwYWNlcyBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBFbnVtU3BhY2VUeXBlID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBXaWxkQ2FyZDogMSxcclxuICAgIEJpZ0J1c2luZXNzOiAyLFxyXG4gICAgTWFya2V0aW5nOiAzLFxyXG4gICAgSW52ZXN0OiA0LFxyXG4gICAgTG9zc2VzOjUsXHJcbiAgICBQYXlEYXk6IDYsXHJcbiAgICBEb3VibGVQYXlEYXk6IDcsXHJcbiAgICBPbmVRdWVzdGlvbjogOCxcclxuICAgIFNlbGw6IDksXHJcbiAgICBCdXlPclNlbGw6IDEwLFxyXG4gICAgR29CYWNrU3BhY2VzOjExLFxyXG59KTtcclxuXHJcbnZhciBhbGxTcGFjZXM9W1wiTm9uZVwiLFwiV2lsZCBDYXJkXCIsXCJCaWcgQnVzaW5lc3NcIixcIk1hcmtldGluZ1wiLFwiSW52ZXN0XCIsXCJMb3NzZXNcIixcIlBheSBEYXlcIixcIkRvdWJsZSBQYXkgRGF5XCIsXCJPbmUgUXVlc3Rpb25cIixcIlNlbGxcIixcIkJ1eSBPciBTZWxsXCIsXCJHbyBCYWNrIDMgU3BhY2VzXCJdO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBTcGFjZXMgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3BhY2VEYXRhID0gY2MuQ2xhc3Moe1xyXG4gICAgICAgICBuYW1lOiBcIlNwYWNlRGF0YVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIE5hbWU6IFwiRGF0YVwiLFxyXG4gICAgICAgIFNwYWNlc1R5cGU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBFbnVtU3BhY2VUeXBlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBFbnVtU3BhY2VUeXBlLk5vbmUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInN0YXRlcyBtYWNoaW5lcyBieSB0eXBlIG9mIHNwYWNlcyBvbiBib2FyZFwiLH0sIFxyXG4gICAgICAgIFNwYWNlRGVzY3JpcHRpb246XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBcIkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJEZXNjcmlwdGlvbiBvZiBzcGFjZXNcIix9LFxyXG4gICAgICAgIFJlZmVyZW5jZUxvY2F0aW9uOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTcGFjZU9iamVjdFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiQmFja2dyb3VuZCBpbWFnZSBhc3NvY2lhdGVkIGJ5IHRoZSBzcGFjZVwiLH0sXHJcbiAgICAgICAgQ2FuSGF2ZUJHOlxyXG4gICAgICAgIHsgXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIklTQkdcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLmJvb2xlYW4sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJpZiBzcGFjZSBjb3VsZCBoYXZlIGJhY2tncm91bmRcIix9LFxyXG4gICAgICAgIEJHQ29sb3I6XHJcbiAgICAgICAgeyBcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQkdDb2xvclwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBjYy5Db2xvci5XSElURSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQ29sb3IsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJDb2xvciBvZiB0aGUgYmFja2dyb3VuZFwiLH0sXHJcbiAgICB9LFxyXG5cclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgIFxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNsYXNzIGZvciBTcGFjZXMgTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3BhY2VzTWFuYWdlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIlNwYWNlc01hbmFnZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW1NwYWNlRGF0YV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5DcmVhdGVTcGFjZXNQb29sKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIENyZWF0ZVNwYWNlc1Bvb2w6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZm9yKHZhciBpPTA7aTx0aGlzLkRhdGEubGVuZ3RoO2krKylcclxuICAgICAge1xyXG4gICAgICAgIGlmKHRoaXMuRGF0YVtpXS5SZWZlcmVuY2VMb2NhdGlvbi5jaGlsZHJlbkNvdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgdGhpcy5EYXRhW2ldLlJlZmVyZW5jZUxvY2F0aW9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgdGhpcy5EYXRhW2ldLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuSW5pdGlhbGl6ZURhdGEodGhpcy5EYXRhW2ldKTtcclxuICAgICAgICAgIHRoaXMuRGF0YVtpXS5SZWZlcmVuY2VMb2NhdGlvbi5jaGlsZHJlblswXS5hY3RpdmU9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuRGF0YVtpXS5DYW5IYXZlQkcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGF0YVtpXS5SZWZlcmVuY2VMb2NhdGlvbi5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGF0YVtpXS5SZWZlcmVuY2VMb2NhdGlvbi5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jb2xvcj10aGlzLkRhdGFbaV0uQkdDb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGF0YVtpXS5SZWZlcmVuY2VMb2NhdGlvbi5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9ZmFsc2U7IFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLkRhdGFbaV0uUmVmZXJlbmNlTG9jYXRpb24uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9YWxsU3BhY2VzW3BhcnNlSW50KHRoaXMuRGF0YVtpXS5TcGFjZXNUeXBlKV1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG4vL21vZHVsZS5leHBvcnRzPSBTcGFjZURhdGE7XHJcbm1vZHVsZS5leHBvcnRzPSBTcGFjZXNNYW5hZ2VyO1xyXG4iXX0=