
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/DiceController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '23d62/RS6BCHLlnlqi2id9x', 'DiceController');
// Script/DiceController.js

"use strict";

var GamePlayReferenceManager = null;
var DiceData = cc.Class({
  name: "DiceData",
  properties: {
    BGSprite: {
      "default": null,
      type: cc.Sprite,
      serializable: true
    },
    DiceNodes: {
      "default": [],
      type: [cc.Node],
      serializable: true
    }
  },
  ctor: function ctor() {//constructor//
  }
});
var DiceController = cc.Class({
  name: "DiceController",
  "extends": cc.Component,
  properties: {
    HasOneDice: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    HasTwoDices: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    DiceOneData: {
      "default": {},
      type: DiceData,
      serializable: true
    },
    DiceTwoData: {
      "default": {},
      type: DiceData,
      serializable: true
    }
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  onEnable: function onEnable() {
    this.CheckReferences();
    this.ResetDice();
    this.DiceCounter = 0;
    this.MaxCounter = this.getRandom(12, 21);
    this.DiceSpeed = 150; //this.AnimateDice(4,5);
  },
  start: function start() {},
  IterateDice: function IterateDice(_dice, _index) {
    for (var index = 0; index < _dice.length; index++) {
      if (_index == index) _dice[index].active = true;else _dice[index].active = false;
    }
  },
  AnimateDice: function AnimateDice(_dice1Value, _dice2Value) {
    var _this = this;

    if (_dice1Value === void 0) {
      _dice1Value = 0;
    }

    if (_dice2Value === void 0) {
      _dice2Value = 0;
    }

    if (this.DiceCounter < this.MaxCounter) {
      if (this.HasOneDice) {
        var _displayIndex = this.getRandom(0, 6);

        this.IterateDice(this.DiceOneData.DiceNodes, _displayIndex);
      }

      if (this.HasTwoDices) {
        var _displayIndex2 = this.getRandom(0, 6);

        this.IterateDice(this.DiceTwoData.DiceNodes, _displayIndex2);
      }

      setTimeout(function () {
        _this.DiceCounter++;

        _this.AnimateDice(_dice1Value, _dice2Value);
      }, this.DiceSpeed);
    } else {
      this.DiceCounter = 0;
      if (this.HasOneDice) this.IterateDice(this.DiceOneData.DiceNodes, _dice1Value - 1);
      if (this.HasTwoDices) this.IterateDice(this.DiceTwoData.DiceNodes, _dice2Value - 1);
      setTimeout(function () {
        GamePlayReferenceManager.Instance.Get_GameManager().DiceFuntionality();
      }, 1000);
    }
  },
  getRandom: function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min included and max excluded
  },
  ResetDice: function ResetDice() {
    this.IterateDice(this.DiceOneData.DiceNodes, 0);
    this.IterateDice(this.DiceTwoData.DiceNodes, 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxEaWNlQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJEaWNlRGF0YSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIkJHU3ByaXRlIiwidHlwZSIsIlNwcml0ZSIsInNlcmlhbGl6YWJsZSIsIkRpY2VOb2RlcyIsIk5vZGUiLCJjdG9yIiwiRGljZUNvbnRyb2xsZXIiLCJDb21wb25lbnQiLCJIYXNPbmVEaWNlIiwiQm9vbGVhbiIsIkhhc1R3b0RpY2VzIiwiRGljZU9uZURhdGEiLCJEaWNlVHdvRGF0YSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJvbkVuYWJsZSIsIlJlc2V0RGljZSIsIkRpY2VDb3VudGVyIiwiTWF4Q291bnRlciIsImdldFJhbmRvbSIsIkRpY2VTcGVlZCIsInN0YXJ0IiwiSXRlcmF0ZURpY2UiLCJfZGljZSIsIl9pbmRleCIsImluZGV4IiwibGVuZ3RoIiwiYWN0aXZlIiwiQW5pbWF0ZURpY2UiLCJfZGljZTFWYWx1ZSIsIl9kaWNlMlZhbHVlIiwiX2Rpc3BsYXlJbmRleCIsIl9kaXNwbGF5SW5kZXgyIiwic2V0VGltZW91dCIsIkluc3RhbmNlIiwiR2V0X0dhbWVNYW5hZ2VyIiwiRGljZUZ1bnRpb25hbGl0eSIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSx3QkFBd0IsR0FBQyxJQUE3QjtBQUNBLElBQUlDLFFBQVEsR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDbEJDLEVBQUFBLElBQUksRUFBQyxVQURhO0FBRWxCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsSUFESDtBQUVOQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sTUFGSDtBQUdOQyxNQUFBQSxZQUFZLEVBQUU7QUFIUixLQURGO0FBTVJDLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLEVBREY7QUFFUEgsTUFBQUEsSUFBSSxFQUFFLENBQUNMLEVBQUUsQ0FBQ1MsSUFBSixDQUZDO0FBR1BGLE1BQUFBLFlBQVksRUFBRTtBQUhQO0FBTkgsR0FGTTtBQWVsQkcsRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQUM7QUFDbEI7QUFoQmlCLENBQVQsQ0FBYjtBQWtCQSxJQUFJQyxjQUFjLEdBQUNYLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUMsZ0JBRG1CO0FBRXhCLGFBQVNGLEVBQUUsQ0FBQ1ksU0FGWTtBQUl4QlQsRUFBQUEsVUFBVSxFQUFFO0FBQ1JVLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLEtBREQ7QUFFUlIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNjLE9BRkQ7QUFHUlAsTUFBQUEsWUFBWSxFQUFFO0FBSE4sS0FESjtBQU1SUSxJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxLQURBO0FBRVRWLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDYyxPQUZBO0FBR1RQLE1BQUFBLFlBQVksRUFBRTtBQUhMLEtBTkw7QUFXUlMsSUFBQUEsV0FBVyxFQUFFO0FBQ1QsaUJBQVMsRUFEQTtBQUVUWCxNQUFBQSxJQUFJLEVBQUVOLFFBRkc7QUFHVFEsTUFBQUEsWUFBWSxFQUFFO0FBSEwsS0FYTDtBQWdCUlUsSUFBQUEsV0FBVyxFQUFFO0FBQ1QsaUJBQVMsRUFEQTtBQUVUWixNQUFBQSxJQUFJLEVBQUVOLFFBRkc7QUFHVFEsTUFBQUEsWUFBWSxFQUFFO0FBSEw7QUFoQkwsR0FKWTtBQTJCeEJXLEVBQUFBLGVBM0J3Qiw2QkE0QnhCO0FBQ0ksUUFBRyxDQUFDcEIsd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFFLElBQTFELEVBQ0FBLHdCQUF3QixHQUFDcUIsT0FBTyxDQUFDLDBCQUFELENBQWhDO0FBQ0gsR0EvQnVCO0FBaUN4QkMsRUFBQUEsUUFqQ3dCLHNCQWtDeEI7QUFDSSxTQUFLRixlQUFMO0FBQ0EsU0FBS0csU0FBTDtBQUNBLFNBQUtDLFdBQUwsR0FBaUIsQ0FBakI7QUFDQSxTQUFLQyxVQUFMLEdBQWdCLEtBQUtDLFNBQUwsQ0FBZSxFQUFmLEVBQWtCLEVBQWxCLENBQWhCO0FBQ0EsU0FBS0MsU0FBTCxHQUFlLEdBQWYsQ0FMSixDQU1JO0FBQ0gsR0F6Q3VCO0FBMkN4QkMsRUFBQUEsS0EzQ3dCLG1CQTJDZixDQUVSLENBN0N1QjtBQStDeEJDLEVBQUFBLFdBL0N3Qix1QkErQ1pDLEtBL0NZLEVBK0NOQyxNQS9DTSxFQWdEeEI7QUFDSSxTQUFLLElBQUlDLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHRixLQUFLLENBQUNHLE1BQWxDLEVBQTBDRCxLQUFLLEVBQS9DLEVBQW1EO0FBQy9DLFVBQUdELE1BQU0sSUFBRUMsS0FBWCxFQUNJRixLQUFLLENBQUNFLEtBQUQsQ0FBTCxDQUFhRSxNQUFiLEdBQW9CLElBQXBCLENBREosS0FHSUosS0FBSyxDQUFDRSxLQUFELENBQUwsQ0FBYUUsTUFBYixHQUFvQixLQUFwQjtBQUNQO0FBQ0osR0F2RHVCO0FBeUR4QkMsRUFBQUEsV0F6RHdCLHVCQXlEWkMsV0F6RFksRUF5REVDLFdBekRGLEVBMER4QjtBQUFBOztBQUFBLFFBRFlELFdBQ1o7QUFEWUEsTUFBQUEsV0FDWixHQUR3QixDQUN4QjtBQUFBOztBQUFBLFFBRDBCQyxXQUMxQjtBQUQwQkEsTUFBQUEsV0FDMUIsR0FEc0MsQ0FDdEM7QUFBQTs7QUFDSSxRQUFHLEtBQUtiLFdBQUwsR0FBaUIsS0FBS0MsVUFBekIsRUFDQTtBQUNJLFVBQUcsS0FBS1YsVUFBUixFQUNBO0FBQ0ksWUFBSXVCLGFBQWEsR0FBQyxLQUFLWixTQUFMLENBQWUsQ0FBZixFQUFpQixDQUFqQixDQUFsQjs7QUFDQSxhQUFLRyxXQUFMLENBQWlCLEtBQUtYLFdBQUwsQ0FBaUJSLFNBQWxDLEVBQTRDNEIsYUFBNUM7QUFDSDs7QUFFRCxVQUFHLEtBQUtyQixXQUFSLEVBQ0E7QUFDSSxZQUFJc0IsY0FBYyxHQUFDLEtBQUtiLFNBQUwsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLENBQW5COztBQUNBLGFBQUtHLFdBQUwsQ0FBaUIsS0FBS1YsV0FBTCxDQUFpQlQsU0FBbEMsRUFBNEM2QixjQUE1QztBQUNIOztBQUVEQyxNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLFFBQUEsS0FBSSxDQUFDaEIsV0FBTDs7QUFDQSxRQUFBLEtBQUksQ0FBQ1csV0FBTCxDQUFpQkMsV0FBakIsRUFBNkJDLFdBQTdCO0FBQ0YsT0FIUSxFQUdQLEtBQUtWLFNBSEUsQ0FBVjtBQUlILEtBbEJELE1Bb0JBO0FBQ0ksV0FBS0gsV0FBTCxHQUFpQixDQUFqQjtBQUVBLFVBQUcsS0FBS1QsVUFBUixFQUNJLEtBQUtjLFdBQUwsQ0FBaUIsS0FBS1gsV0FBTCxDQUFpQlIsU0FBbEMsRUFBNkMwQixXQUFXLEdBQUMsQ0FBekQ7QUFFSixVQUFHLEtBQUtuQixXQUFSLEVBQ0ksS0FBS1ksV0FBTCxDQUFpQixLQUFLVixXQUFMLENBQWlCVCxTQUFsQyxFQUE2QzJCLFdBQVcsR0FBQyxDQUF6RDtBQUVMRyxNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNaeEMsUUFBQUEsd0JBQXdCLENBQUN5QyxRQUF6QixDQUFrQ0MsZUFBbEMsR0FBb0RDLGdCQUFwRDtBQUNKLE9BRlMsRUFFUCxJQUZPLENBQVY7QUFHRjtBQUNKLEdBNUZ1QjtBQThGeEJqQixFQUFBQSxTQUFTLEVBQUMsbUJBQVNrQixHQUFULEVBQWFDLEdBQWIsRUFDVjtBQUNJLFdBQU9DLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBaUJILEdBQUcsR0FBR0QsR0FBdkIsQ0FBWCxJQUEyQ0EsR0FBbEQsQ0FESixDQUMyRDtBQUMxRCxHQWpHdUI7QUFtR3hCckIsRUFBQUEsU0FuR3dCLHVCQW9HeEI7QUFDSSxTQUFLTSxXQUFMLENBQWlCLEtBQUtYLFdBQUwsQ0FBaUJSLFNBQWxDLEVBQTRDLENBQTVDO0FBQ0EsU0FBS21CLFdBQUwsQ0FBaUIsS0FBS1YsV0FBTCxDQUFpQlQsU0FBbEMsRUFBNEMsQ0FBNUM7QUFDSDtBQXZHdUIsQ0FBVCxDQUFuQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgRGljZURhdGE9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkRpY2VEYXRhXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgQkdTcHJpdGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBEaWNlTm9kZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yLy9cclxuICAgIH0sXHJcbn0pO1xyXG52YXIgRGljZUNvbnRyb2xsZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkRpY2VDb250cm9sbGVyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIEhhc09uZURpY2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEhhc1R3b0RpY2VzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBEaWNlT25lRGF0YToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgICAgICAgdHlwZTogRGljZURhdGEsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIERpY2VUd29EYXRhOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICAgICAgICB0eXBlOiBEaWNlRGF0YSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLlJlc2V0RGljZSgpO1xyXG4gICAgICAgIHRoaXMuRGljZUNvdW50ZXI9MDtcclxuICAgICAgICB0aGlzLk1heENvdW50ZXI9dGhpcy5nZXRSYW5kb20oMTIsMjEpO1xyXG4gICAgICAgIHRoaXMuRGljZVNwZWVkPTE1MDtcclxuICAgICAgICAvL3RoaXMuQW5pbWF0ZURpY2UoNCw1KTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgSXRlcmF0ZURpY2UoX2RpY2UsX2luZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfZGljZS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoX2luZGV4PT1pbmRleClcclxuICAgICAgICAgICAgICAgIF9kaWNlW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgX2RpY2VbaW5kZXhdLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEFuaW1hdGVEaWNlKF9kaWNlMVZhbHVlPTAsX2RpY2UyVmFsdWU9MClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkRpY2VDb3VudGVyPHRoaXMuTWF4Q291bnRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuSGFzT25lRGljZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9kaXNwbGF5SW5kZXg9dGhpcy5nZXRSYW5kb20oMCw2KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5JdGVyYXRlRGljZSh0aGlzLkRpY2VPbmVEYXRhLkRpY2VOb2RlcyxfZGlzcGxheUluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5IYXNUd29EaWNlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9kaXNwbGF5SW5kZXgyPXRoaXMuZ2V0UmFuZG9tKDAsNilcclxuICAgICAgICAgICAgICAgIHRoaXMuSXRlcmF0ZURpY2UodGhpcy5EaWNlVHdvRGF0YS5EaWNlTm9kZXMsX2Rpc3BsYXlJbmRleDIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGljZUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIHRoaXMuQW5pbWF0ZURpY2UoX2RpY2UxVmFsdWUsX2RpY2UyVmFsdWUpO1xyXG4gICAgICAgICAgICAgfSx0aGlzLkRpY2VTcGVlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGljZUNvdW50ZXI9MDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuSGFzT25lRGljZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuSXRlcmF0ZURpY2UodGhpcy5EaWNlT25lRGF0YS5EaWNlTm9kZXMsKF9kaWNlMVZhbHVlLTEpKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuSGFzVHdvRGljZXMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkl0ZXJhdGVEaWNlKHRoaXMuRGljZVR3b0RhdGEuRGljZU5vZGVzLChfZGljZTJWYWx1ZS0xKSk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EaWNlRnVudGlvbmFsaXR5KCk7XHJcbiAgICAgICAgICAgfSwgMTAwMCk7IFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UmFuZG9tOmZ1bmN0aW9uKG1pbixtYXgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgICB9LFxyXG5cclxuICAgIFJlc2V0RGljZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5JdGVyYXRlRGljZSh0aGlzLkRpY2VPbmVEYXRhLkRpY2VOb2RlcywwKTtcclxuICAgICAgICB0aGlzLkl0ZXJhdGVEaWNlKHRoaXMuRGljZVR3b0RhdGEuRGljZU5vZGVzLDApO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==