
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/BusinessDetail.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb8a5ZUBJFFQJtaaJU+yKsK', 'BusinessDetail');
// Script/BusinessDetail.js

"use strict";

var BusinessDetail = cc.Class({
  name: "BusinessDetail",
  "extends": cc.Component,
  properties: {
    BusinessName: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    BusinessType: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    BusinessMode: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    BusinessBalance: {
      "default": null,
      type: cc.Label,
      serializable: true
    },
    BusinessLocations: {
      "default": null,
      type: cc.Label,
      serializable: true
    }
  },
  SetName: function SetName(_name) {
    this.BusinessName.string = _name;
  },
  SetType: function SetType(_type) {
    this.BusinessType.string = _type;
  },
  SetMode: function SetMode(_mode) {
    this.BusinessMode.string = _mode;
  },
  SetBalance: function SetBalance(_balance) {
    this.BusinessBalance.string = _balance;
  },
  SetLocations: function SetLocations(_locations) {
    this.BusinessLocations.string = _locations;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCdXNpbmVzc0RldGFpbC5qcyJdLCJuYW1lcyI6WyJCdXNpbmVzc0RldGFpbCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIkJ1c2luZXNzTmFtZSIsInR5cGUiLCJMYWJlbCIsInNlcmlhbGl6YWJsZSIsIkJ1c2luZXNzVHlwZSIsIkJ1c2luZXNzTW9kZSIsIkJ1c2luZXNzQmFsYW5jZSIsIkJ1c2luZXNzTG9jYXRpb25zIiwiU2V0TmFtZSIsIl9uYW1lIiwic3RyaW5nIiwiU2V0VHlwZSIsIl90eXBlIiwiU2V0TW9kZSIsIl9tb2RlIiwiU2V0QmFsYW5jZSIsIl9iYWxhbmNlIiwiU2V0TG9jYXRpb25zIiwiX2xvY2F0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxjQUFjLEdBQUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUMsZ0JBRG1CO0FBRXhCLGFBQVNGLEVBQUUsQ0FBQ0csU0FGWTtBQUl4QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFlBQVksRUFBRTtBQUNWLGlCQUFTLElBREM7QUFFVkMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLEtBRkM7QUFHVkMsTUFBQUEsWUFBWSxFQUFFO0FBSEosS0FETjtBQU9SQyxJQUFBQSxZQUFZLEVBQUU7QUFDVixpQkFBUyxJQURDO0FBRVZILE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTyxLQUZDO0FBR1ZDLE1BQUFBLFlBQVksRUFBRTtBQUhKLEtBUE47QUFhUkUsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWSixNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FGQztBQUdWQyxNQUFBQSxZQUFZLEVBQUU7QUFISixLQWJOO0FBbUJSRyxJQUFBQSxlQUFlLEVBQUU7QUFDYixpQkFBUyxJQURJO0FBRWJMLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTyxLQUZJO0FBR2JDLE1BQUFBLFlBQVksRUFBRTtBQUhELEtBbkJUO0FBeUJSSSxJQUFBQSxpQkFBaUIsRUFBRTtBQUNmLGlCQUFTLElBRE07QUFFZk4sTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLEtBRk07QUFHZkMsTUFBQUEsWUFBWSxFQUFFO0FBSEM7QUF6QlgsR0FKWTtBQXFDeEJLLEVBQUFBLE9BckN3QixtQkFxQ2hCQyxLQXJDZ0IsRUFzQ3hCO0FBQ0ksU0FBS1QsWUFBTCxDQUFrQlUsTUFBbEIsR0FBeUJELEtBQXpCO0FBQ0gsR0F4Q3VCO0FBMEN4QkUsRUFBQUEsT0ExQ3dCLG1CQTBDaEJDLEtBMUNnQixFQTJDeEI7QUFDSSxTQUFLUixZQUFMLENBQWtCTSxNQUFsQixHQUF5QkUsS0FBekI7QUFDSCxHQTdDdUI7QUErQ3hCQyxFQUFBQSxPQS9Dd0IsbUJBK0NoQkMsS0EvQ2dCLEVBZ0R4QjtBQUNJLFNBQUtULFlBQUwsQ0FBa0JLLE1BQWxCLEdBQXlCSSxLQUF6QjtBQUNILEdBbER1QjtBQW9EeEJDLEVBQUFBLFVBcER3QixzQkFvRGJDLFFBcERhLEVBcUR4QjtBQUNJLFNBQUtWLGVBQUwsQ0FBcUJJLE1BQXJCLEdBQTRCTSxRQUE1QjtBQUNILEdBdkR1QjtBQXlEeEJDLEVBQUFBLFlBekR3Qix3QkF5RFhDLFVBekRXLEVBMER4QjtBQUNJLFNBQUtYLGlCQUFMLENBQXVCRyxNQUF2QixHQUE4QlEsVUFBOUI7QUFDSDtBQTVEdUIsQ0FBVCxDQUFuQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEJ1c2luZXNzRGV0YWlsPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJCdXNpbmVzc0RldGFpbFwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBCdXNpbmVzc05hbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEJ1c2luZXNzVHlwZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQnVzaW5lc3NNb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCdXNpbmVzc0JhbGFuY2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25zOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgU2V0TmFtZShfbmFtZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzTmFtZS5zdHJpbmc9X25hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldFR5cGUoX3R5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1R5cGUuc3RyaW5nPV90eXBlO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRNb2RlKF9tb2RlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NNb2RlLnN0cmluZz1fbW9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgU2V0QmFsYW5jZShfYmFsYW5jZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzQmFsYW5jZS5zdHJpbmc9X2JhbGFuY2U7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldExvY2F0aW9ucyhfbG9jYXRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NMb2NhdGlvbnMuc3RyaW5nPV9sb2NhdGlvbnM7XHJcbiAgICB9LFxyXG59KTtcclxuIl19