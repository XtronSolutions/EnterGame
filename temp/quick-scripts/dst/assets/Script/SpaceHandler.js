
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
  OnLandedOnSpace: function OnLandedOnSpace(_isOwner, _randomValue, isBot) {
    if (_isOwner === void 0) {
      _isOwner = false;
    }

    if (_randomValue === void 0) {
      _randomValue = 0;
    }

    if (isBot === void 0) {
      isBot = false;
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
        GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomWildCard(_isOwner, _randomValue, isBot);
        break;

      case 2:
        //BigBusiness
        console.log("BigBusiness");
        GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomBigBusinessCard(_isOwner, _randomValue, isBot);
        break;

      case 3:
        //Marketing
        console.log("Marketing");
        GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomMarketingCard(_isOwner, _randomValue, isBot);
        break;

      case 4:
        //Invest
        console.log("Invest");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceInvest(_isOwner, this.SpaceData.SpacesType, isBot);
        break;

      case 5:
        //Losses
        console.log("Losses");
        GamePlayReferenceManager.Instance.Get_DecksData().GenerateRandomLossesCard(_isOwner, _randomValue, isBot);
        break;

      case 6:
        //Payday
        console.log("Payday");
        GamePlayReferenceManager.Instance.Get_DecksData().SpacePayDay(_isOwner, this.SpaceData.SpacesType, isBot);
        break;

      case 7:
        //DoublePayDay
        console.log("DoublePayDay");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceDoublePayDay(_isOwner, this.SpaceData.SpacesType, isBot);
        break;

      case 8:
        //OneQuestion
        console.log("OneQuestion");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceOneQuestion(_isOwner, this.SpaceData.SpacesType, isBot);
        break;

      case 9:
        //Sell
        console.log("Sell");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceSell(_isOwner, this.SpaceData.SpacesType, isBot);
        break;

      case 10:
        //BuyOrSell
        console.log("BuyOrSell");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceBuyOrSell(_isOwner, this.SpaceData.SpacesType, isBot);
        break;

      case 11:
        //GoBackSpaces
        console.log("GoBackSpaces");
        GamePlayReferenceManager.Instance.Get_DecksData().SpaceGoBackSpaces(_isOwner, this.SpaceData.SpacesType, isBot);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTcGFjZUhhbmRsZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU3BhY2VzTWFuYWdlciIsInJlcXVpcmUiLCJTcGFjZUhhbmRsZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJTcGFjZURhdGEiLCJJbml0aWFsaXplRGF0YSIsIl9kYXRhIiwiT25MYW5kZWRPblNwYWNlIiwiX2lzT3duZXIiLCJfcmFuZG9tVmFsdWUiLCJpc0JvdCIsImNvbnNvbGUiLCJsb2ciLCJTcGFjZXNUeXBlIiwiZXJyb3IiLCJJbnN0YW5jZSIsIkdldF9EZWNrc0RhdGEiLCJHZW5lcmF0ZVJhbmRvbVdpbGRDYXJkIiwiR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQiLCJHZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQiLCJTcGFjZUludmVzdCIsIkdlbmVyYXRlUmFuZG9tTG9zc2VzQ2FyZCIsIlNwYWNlUGF5RGF5IiwiU3BhY2VEb3VibGVQYXlEYXkiLCJTcGFjZU9uZVF1ZXN0aW9uIiwiU3BhY2VTZWxsIiwiU3BhY2VCdXlPclNlbGwiLCJTcGFjZUdvQmFja1NwYWNlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBQyxJQUE3Qjs7QUFDQSxJQUFJQyxhQUFhLEdBQUNDLE9BQU8sQ0FBQyxlQUFELENBQXpCLEVBQ0E7OztBQUVBLElBQUlDLFlBQVksR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBRSxjQURnQjtBQUV0QixhQUFTRixFQUFFLENBQUNHLFNBRlU7QUFJdEJDLEVBQUFBLFVBQVUsRUFBRSxFQUpVO0FBT3RCQyxFQUFBQSxNQVBzQixvQkFRdEI7QUFDSSxTQUFLQyxlQUFMO0FBQ0EsU0FBS0MsU0FBTCxHQUFlLElBQWYsQ0FG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LEtBQXZHO0FBQ0E7O0FBQ0osV0FBSyxDQUFMO0FBQU87QUFDSEMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksYUFBWjtBQUNBbkIsUUFBQUEsd0JBQXdCLENBQUNzQixRQUF6QixDQUFrQ0MsYUFBbEMsR0FBa0RRLGdCQUFsRCxDQUFtRWhCLFFBQW5FLEVBQTRFLEtBQUtKLFNBQUwsQ0FBZVMsVUFBM0YsRUFBc0dILEtBQXRHO0FBQ0E7O0FBQ0osV0FBSyxDQUFMO0FBQU87QUFDSEMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNBbkIsUUFBQUEsd0JBQXdCLENBQUNzQixRQUF6QixDQUFrQ0MsYUFBbEMsR0FBa0RTLFNBQWxELENBQTREakIsUUFBNUQsRUFBcUUsS0FBS0osU0FBTCxDQUFlUyxVQUFwRixFQUErRkgsS0FBL0Y7QUFDQTs7QUFDSixXQUFLLEVBQUw7QUFBUTtBQUNKQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaO0FBQ0FuQixRQUFBQSx3QkFBd0IsQ0FBQ3NCLFFBQXpCLENBQWtDQyxhQUFsQyxHQUFrRFUsY0FBbEQsQ0FBaUVsQixRQUFqRSxFQUEwRSxLQUFLSixTQUFMLENBQWVTLFVBQXpGLEVBQW9HSCxLQUFwRztBQUNBOztBQUNKLFdBQUssRUFBTDtBQUFRO0FBQ0pDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDQW5CLFFBQUFBLHdCQUF3QixDQUFDc0IsUUFBekIsQ0FBa0NDLGFBQWxDLEdBQWtEVyxpQkFBbEQsQ0FBb0VuQixRQUFwRSxFQUE2RSxLQUFLSixTQUFMLENBQWVTLFVBQTVGLEVBQXVHSCxLQUF2RztBQUNBOztBQUNKO0FBQ0k7QUFsRFI7QUFxREg7QUFuRnFCLENBQVQsQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFNwYWNlc01hbmFnZXI9cmVxdWlyZSgnU3BhY2VzTWFuYWdlcicpO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3BhY2VIYW5kbGVyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG52YXIgU3BhY2VIYW5kbGVyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiU3BhY2VIYW5kbGVyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgdGhpcy5TcGFjZURhdGE9bnVsbDtcclxuICAgICAgIC8vIFNwYWNlRGF0YT1uZXcgXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIEluaXRpYWxpemVEYXRhKF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU3BhY2VEYXRhPV9kYXRhO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5TcGFjZURhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbkxhbmRlZE9uU3BhY2UoX2lzT3duZXI9ZmFsc2UsX3JhbmRvbVZhbHVlPTAsaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5TcGFjZURhdGEpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6Ly9Ob25lXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibGFuZGVkIG9uIG5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAvL0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuU3BhY2VJbnZlc3QoX2lzT3duZXIsdGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOi8vV2lsZENhcmRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2lsZENhcmRcIik7ICAgIFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5HZW5lcmF0ZVJhbmRvbVdpbGRDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSxpc0JvdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOi8vQmlnQnVzaW5lc3NcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmlnQnVzaW5lc3NcIik7ICAgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLkdlbmVyYXRlUmFuZG9tQmlnQnVzaW5lc3NDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSxpc0JvdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOi8vTWFya2V0aW5nXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcmtldGluZ1wiKTsgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLkdlbmVyYXRlUmFuZG9tTWFya2V0aW5nQ2FyZChfaXNPd25lcixfcmFuZG9tVmFsdWUsaXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDovL0ludmVzdFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbnZlc3RcIik7IFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5TcGFjZUludmVzdChfaXNPd25lcix0aGlzLlNwYWNlRGF0YS5TcGFjZXNUeXBlLGlzQm90KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6Ly9Mb3NzZXNcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9zc2VzXCIpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuR2VuZXJhdGVSYW5kb21Mb3NzZXNDYXJkKF9pc093bmVyLF9yYW5kb21WYWx1ZSxpc0JvdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2Oi8vUGF5ZGF5XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBheWRheVwiKTsgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLlNwYWNlUGF5RGF5KF9pc093bmVyLHRoaXMuU3BhY2VEYXRhLlNwYWNlc1R5cGUsaXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzovL0RvdWJsZVBheURheVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEb3VibGVQYXlEYXlcIik7IFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5TcGFjZURvdWJsZVBheURheShfaXNPd25lcix0aGlzLlNwYWNlRGF0YS5TcGFjZXNUeXBlLGlzQm90KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDg6Ly9PbmVRdWVzdGlvblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPbmVRdWVzdGlvblwiKTsgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLlNwYWNlT25lUXVlc3Rpb24oX2lzT3duZXIsdGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSxpc0JvdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA5Oi8vU2VsbFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWxsXCIpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuU3BhY2VTZWxsKF9pc093bmVyLHRoaXMuU3BhY2VEYXRhLlNwYWNlc1R5cGUsaXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTA6Ly9CdXlPclNlbGxcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnV5T3JTZWxsXCIpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuU3BhY2VCdXlPclNlbGwoX2lzT3duZXIsdGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSxpc0JvdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMTovL0dvQmFja1NwYWNlc1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb0JhY2tTcGFjZXNcIik7IFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5TcGFjZUdvQmFja1NwYWNlcyhfaXNPd25lcix0aGlzLlNwYWNlRGF0YS5TcGFjZXNUeXBlLGlzQm90KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=