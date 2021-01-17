
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
    GamePlayReferenceManager = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxTcGFjZUhhbmRsZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU3BhY2VzTWFuYWdlciIsInJlcXVpcmUiLCJTcGFjZUhhbmRsZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJTcGFjZURhdGEiLCJJbml0aWFsaXplRGF0YSIsIl9kYXRhIiwiT25MYW5kZWRPblNwYWNlIiwiX2lzT3duZXIiLCJfcmFuZG9tVmFsdWUiLCJpc0JvdCIsImNvbnNvbGUiLCJsb2ciLCJTcGFjZXNUeXBlIiwiZXJyb3IiLCJJbnN0YW5jZSIsIkdldF9EZWNrc0RhdGEiLCJHZW5lcmF0ZVJhbmRvbVdpbGRDYXJkIiwiR2VuZXJhdGVSYW5kb21CaWdCdXNpbmVzc0NhcmQiLCJHZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQiLCJTcGFjZUludmVzdCIsIkdlbmVyYXRlUmFuZG9tTG9zc2VzQ2FyZCIsIlNwYWNlUGF5RGF5IiwiU3BhY2VEb3VibGVQYXlEYXkiLCJTcGFjZU9uZVF1ZXN0aW9uIiwiU3BhY2VTZWxsIiwiU3BhY2VCdXlPclNlbGwiLCJTcGFjZUdvQmFja1NwYWNlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBQyxJQUE3Qjs7QUFDQSxJQUFJQyxhQUFhLEdBQUNDLE9BQU8sQ0FBQyxlQUFELENBQXpCLEVBQ0E7OztBQUVBLElBQUlDLFlBQVksR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBRSxjQURnQjtBQUV0QixhQUFTRixFQUFFLENBQUNHLFNBRlU7QUFJdEJDLEVBQUFBLFVBQVUsRUFBRSxFQUpVO0FBT3RCQyxFQUFBQSxNQVBzQixvQkFRdEI7QUFDSVQsSUFBQUEsd0JBQXdCLEdBQUcsSUFBM0I7QUFDQSxTQUFLVSxlQUFM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NkUsS0FBS0osU0FBTCxDQUFlUyxVQUE1RixFQUF1R0gsS0FBdkc7QUFDQTs7QUFDSixXQUFLLENBQUw7QUFBTztBQUNIQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaO0FBQ0FuQixRQUFBQSx3QkFBd0IsQ0FBQ3NCLFFBQXpCLENBQWtDQyxhQUFsQyxHQUFrRFEsZ0JBQWxELENBQW1FaEIsUUFBbkUsRUFBNEUsS0FBS0osU0FBTCxDQUFlUyxVQUEzRixFQUFzR0gsS0FBdEc7QUFDQTs7QUFDSixXQUFLLENBQUw7QUFBTztBQUNIQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FuQixRQUFBQSx3QkFBd0IsQ0FBQ3NCLFFBQXpCLENBQWtDQyxhQUFsQyxHQUFrRFMsU0FBbEQsQ0FBNERqQixRQUE1RCxFQUFxRSxLQUFLSixTQUFMLENBQWVTLFVBQXBGLEVBQStGSCxLQUEvRjtBQUNBOztBQUNKLFdBQUssRUFBTDtBQUFRO0FBQ0pDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVo7QUFDQW5CLFFBQUFBLHdCQUF3QixDQUFDc0IsUUFBekIsQ0FBa0NDLGFBQWxDLEdBQWtEVSxjQUFsRCxDQUFpRWxCLFFBQWpFLEVBQTBFLEtBQUtKLFNBQUwsQ0FBZVMsVUFBekYsRUFBb0dILEtBQXBHO0FBQ0E7O0FBQ0osV0FBSyxFQUFMO0FBQVE7QUFDSkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUNBbkIsUUFBQUEsd0JBQXdCLENBQUNzQixRQUF6QixDQUFrQ0MsYUFBbEMsR0FBa0RXLGlCQUFsRCxDQUFvRW5CLFFBQXBFLEVBQTZFLEtBQUtKLFNBQUwsQ0FBZVMsVUFBNUYsRUFBdUdILEtBQXZHO0FBQ0E7O0FBQ0o7QUFDSTtBQWxEUjtBQXFESDtBQXBGcUIsQ0FBVCxDQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgU3BhY2VzTWFuYWdlcj1yZXF1aXJlKCdTcGFjZXNNYW5hZ2VyJyk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTcGFjZUhhbmRsZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuXHJcbnZhciBTcGFjZUhhbmRsZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJTcGFjZUhhbmRsZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuU3BhY2VEYXRhPW51bGw7XHJcbiAgICAgICAvLyBTcGFjZURhdGE9bmV3IFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgfSxcclxuXHJcbiAgICBJbml0aWFsaXplRGF0YShfZGF0YSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlNwYWNlRGF0YT1fZGF0YTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuU3BhY2VEYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgT25MYW5kZWRPblNwYWNlKF9pc093bmVyPWZhbHNlLF9yYW5kb21WYWx1ZT0wLGlzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuU3BhY2VEYXRhKTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuU3BhY2VEYXRhLlNwYWNlc1R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOi8vTm9uZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImxhbmRlZCBvbiBub25lXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLlNwYWNlSW52ZXN0KF9pc093bmVyLHRoaXMuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTovL1dpbGRDYXJkXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldpbGRDYXJkXCIpOyAgICBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuR2VuZXJhdGVSYW5kb21XaWxkQ2FyZChfaXNPd25lcixfcmFuZG9tVmFsdWUsaXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjovL0JpZ0J1c2luZXNzXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJpZ0J1c2luZXNzXCIpOyAgIFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5HZW5lcmF0ZVJhbmRvbUJpZ0J1c2luZXNzQ2FyZChfaXNPd25lcixfcmFuZG9tVmFsdWUsaXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzovL01hcmtldGluZ1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNYXJrZXRpbmdcIik7IFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5HZW5lcmF0ZVJhbmRvbU1hcmtldGluZ0NhcmQoX2lzT3duZXIsX3JhbmRvbVZhbHVlLGlzQm90KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6Ly9JbnZlc3RcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW52ZXN0XCIpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuU3BhY2VJbnZlc3QoX2lzT3duZXIsdGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSxpc0JvdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1Oi8vTG9zc2VzXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvc3Nlc1wiKTsgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLkdlbmVyYXRlUmFuZG9tTG9zc2VzQ2FyZChfaXNPd25lcixfcmFuZG9tVmFsdWUsaXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjovL1BheWRheVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXlkYXlcIik7IFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5TcGFjZVBheURheShfaXNPd25lcix0aGlzLlNwYWNlRGF0YS5TcGFjZXNUeXBlLGlzQm90KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDc6Ly9Eb3VibGVQYXlEYXlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRG91YmxlUGF5RGF5XCIpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuU3BhY2VEb3VibGVQYXlEYXkoX2lzT3duZXIsdGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSxpc0JvdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA4Oi8vT25lUXVlc3Rpb25cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT25lUXVlc3Rpb25cIik7IFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9EZWNrc0RhdGEoKS5TcGFjZU9uZVF1ZXN0aW9uKF9pc093bmVyLHRoaXMuU3BhY2VEYXRhLlNwYWNlc1R5cGUsaXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgOTovL1NlbGxcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsbFwiKTsgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLlNwYWNlU2VsbChfaXNPd25lcix0aGlzLlNwYWNlRGF0YS5TcGFjZXNUeXBlLGlzQm90KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDEwOi8vQnV5T3JTZWxsXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJ1eU9yU2VsbFwiKTsgXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0RlY2tzRGF0YSgpLlNwYWNlQnV5T3JTZWxsKF9pc093bmVyLHRoaXMuU3BhY2VEYXRhLlNwYWNlc1R5cGUsaXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTE6Ly9Hb0JhY2tTcGFjZXNcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29CYWNrU3BhY2VzXCIpOyBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfRGVja3NEYXRhKCkuU3BhY2VHb0JhY2tTcGFjZXMoX2lzT3duZXIsdGhpcy5TcGFjZURhdGEuU3BhY2VzVHlwZSxpc0JvdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG59KTtcclxuIl19