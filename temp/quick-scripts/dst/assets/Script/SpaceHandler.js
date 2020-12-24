
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/SpaceHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1f79fWXVqRNRb/WmZ+i4SUE', 'SpaceHandler');
// Script/SpaceHandler.js

"use strict";

var GamePlayReferenceManager = null;

var SpacesManager = require('SpacesManager'); //-------------------------------------------class for SpaceHandler-------------------------//


var SpaceHandler = cc.Class({
  name: "SpaceHandler",
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this.CheckReferences();
    this.SpaceData = null; // SpaceData=new 
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  InitializeData: function InitializeData(_data) {
    this.SpaceData = _data; //console.log(this.SpaceData);
  },
  OnLandedOnSpace: function OnLandedOnSpace(_isOwner, _randomValue) {
    if (_isOwner === void 0) {
      _isOwner = false;
    }

    if (_randomValue === void 0) {
      _randomValue = 0;
    }

    console.log(this.SpaceData);

    switch (this.SpaceData.SpacesType) {
      case 0:
        //None
        console.error("landed on none"); //GamePlayReferenceManager.Instance.Get_DecksData().SpaceInvest(_isOwner,this.SpaceData.SpacesType);

        break;

      case 1:
        //WildCard
        console.log("WildCard");
        GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomWildCard(_isOwner, _randomValue);
        break;

      case 2:
        //BigBusiness
        console.log("BigBusiness");
        GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomBigBusinessCard(_isOwner, _randomValue);
        break;

      case 3:
        //Marketing
        console.log("Marketing");
        GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomMarketingCard(_isOwner, _randomValue);
        break;

      case 4:
        //Invest
        console.log("Invest");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceInvest(_isOwner, this.SpaceData.SpacesType);
        break;

      case 5:
        //Losses
        console.log("Losses");
        GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomLossesCard(_isOwner, _randomValue);
        break;

      case 6:
        //Payday
        console.log("Payday");
        GamePlayReferenceManager.Instance.Get_DecksData().SpacePayDay(_isOwner, this.SpaceData.SpacesType);
        break;

      case 7:
        //DoublePayDay
        console.log("DoublePayDay");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceDoublePayDay(_isOwner, this.SpaceData.SpacesType);
        break;

      case 8:
        //OneQuestion
        console.log("OneQuestion");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceOneQuestion(_isOwner, this.SpaceData.SpacesType);
        break;

      case 9:
        //Sell
        console.log("Sell");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceSell(_isOwner, this.SpaceData.SpacesType);
        break;

      case 10:
        //BuyOrSell
        console.log("BuyOrSell");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceBuyOrSell(_isOwner, this.SpaceData.SpacesType);
        break;

      case 11:
        //GoBackSpaces
        console.log("GoBackSpaces");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceGoBackSpaces(_isOwner, this.SpaceData.SpacesType);
        break;

      default:
        break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTcGFjZUhhbmRsZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU3BhY2VzTWFuYWdlciIsInJlcXVpcmUiLCJTcGFjZUhhbmRsZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJTcGFjZURhdGEiLCJJbml0aWFsaXplRGF0YSIsIl9kYXRhIiwiT25MYW5kZWRPblNwYWNlIiwiX2lzT3duZXIiLCJfcmFuZG9tVmFsdWUiLCJjb25zb2xlIiwibG9nIiwiU3BhY2VzVHlwZSIsImVycm9yIiwiSW5zdGFuY2UiLCJHZXRfRGVja3NEYXRhIiwiR2VuZXJhdGVSYW5kb21XaWxkQ2FyZCIsIkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkIiwiR2VuZXJhdGVSYW5kb21NYXJrZXRpbmdDYXJkIiwiU3BhY2VJbnZlc3QiLCJHZW5lcmF0ZVJhbmRvbUxvc3Nlc0NhcmQiLCJTcGFjZVBheURheSIsIlNwYWNlRG91YmxlUGF5RGF5IiwiU3BhY2VPbmVRdWVzdGlvbiIsIlNwYWNlU2VsbCIsIlNwYWNlQnV5T3JTZWxsIiwiU3BhY2VHb0JhY2tTcGFjZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsd0JBQXdCLEdBQUMsSUFBN0I7O0FBQ0EsSUFBSUMsYUFBYSxHQUFDQyxPQUFPLENBQUMsZUFBRCxDQUF6QixFQUNBOzs7QUFFQSxJQUFJQyxZQUFZLEdBQUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsY0FEZ0I7QUFFdEIsYUFBU0YsRUFBRSxDQUFDRyxTQUZVO0FBSXRCQyxFQUFBQSxVQUFVLEVBQUUsRUFKVTtBQU90QkMsRUFBQUEsTUFQc0Isb0JBUXRCO0FBQ0ksU0FBS0MsZUFBTDtBQUNBLFNBQUtDLFNBQUwsR0FBZSxJQUFmLENBRkosQ0FHRztB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QTNGO0FBQ0E7O0FBQ0osV0FBSyxDQUFMO0FBQU87QUFDSEYsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNBbEIsUUFBQUEsd0JBQXdCLENBQUNxQixRQUF6QixDQUFrQ0MsYUFBbEMsR0FBa0RTLFNBQWxELENBQTREaEIsUUFBNUQsRUFBcUUsS0FBS0osU0FBTCxDQUFlUSxVQUFwRjtBQUNBOztBQUNKLFdBQUssRUFBTDtBQUFRO0FBQ0pGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVo7QUFDQWxCLFFBQUFBLHdCQUF3QixDQUFDcUIsUUFBekIsQ0FBa0NDLGFBQWxDLEdBQWtEVSxjQUFsRCxDQUFpRWpCLFFBQWpFLEVBQTBFLEtBQUtKLFNBQUwsQ0FBZVEsVUFBekY7QUFDQTs7QUFDSixXQUFLLEVBQUw7QUFBUTtBQUNKRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaO0FBQ0FsQixRQUFBQSx3QkFBd0IsQ0FBQ3FCLFFBQXpCLENBQWtDQyxhQUFsQyxHQUFrRFcsaUJBQWxELENBQW9FbEIsUUFBcEUsRUFBNkUsS0FBS0osU0FBTCxDQUFlUSxVQUE1RjtBQUNBOztBQUNKO0FBQ0k7QUFsRFI7QUFxREg7QUFuRnFCLENBQVQsQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFNwYWNlc01hbmFnZXI9cmVxdWlyZSgnU3BhY2VzTWFuYWdlcicpO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3BhY2VIYW5kbGVyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG52YXIgU3BhY2VIYW5kbGVyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiU3BhY2VIYW5kbGVyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgdGhpcy5TcGFjZURhdGE9bnVsbDtcclxuICAgICAgIC8vIFNwYWNlRGF0YT1uZXcgXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIEluaXRpYWxpemVEYXRhKF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU3BhY2VEYXRhPV9kYXRhO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5TcGFjZURhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbkxhbmRlZE9uU3BhY2UoX2lzT3duZXI9ZmFsc2UsX3JhbmRvbVZhbHVlPTApXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5TcGFjZURhdGEpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6Ly9Ob25lXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibGFuZGVkIG9uIG5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAvL0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuU3BhY2VJbnZlc3QoX2lzT3duZXIsdGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOi8vV2lsZENhcmRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2lsZENhcmRcIik7ICAgIFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5HZW5lcmF0ZVJhbmRvbVdpbGRDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOi8vQmlnQnVzaW5lc3NcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmlnQnVzaW5lc3NcIik7ICAgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOi8vTWFya2V0aW5nXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcmtldGluZ1wiKTsgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLkdlbmVyYXRlUmFuZG9tTWFya2V0aW5nQ2FyZChfaXNPd25lcixfcmFuZG9tVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDovL0ludmVzdFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbnZlc3RcIik7IFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5TcGFjZUludmVzdChfaXNPd25lcix0aGlzLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6Ly9Mb3NzZXNcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9zc2VzXCIpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuR2VuZXJhdGVSYW5kb21Mb3NzZXNDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2Oi8vUGF5ZGF5XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBheWRheVwiKTsgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLlNwYWNlUGF5RGF5KF9pc093bmVyLHRoaXMuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzovL0RvdWJsZVBheURheVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEb3VibGVQYXlEYXlcIik7IFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5TcGFjZURvdWJsZVBheURheShfaXNPd25lcix0aGlzLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDg6Ly9PbmVRdWVzdGlvblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPbmVRdWVzdGlvblwiKTsgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLlNwYWNlT25lUXVlc3Rpb24oX2lzT3duZXIsdGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA5Oi8vU2VsbFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWxsXCIpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuU3BhY2VTZWxsKF9pc093bmVyLHRoaXMuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTA6Ly9CdXlPclNlbGxcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnV5T3JTZWxsXCIpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuU3BhY2VCdXlPclNlbGwoX2lzT3duZXIsdGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMTovL0dvQmFja1NwYWNlc1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb0JhY2tTcGFjZXNcIik7IFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5TcGFjZUdvQmFja1NwYWNlcyhfaXNPd25lcix0aGlzLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=