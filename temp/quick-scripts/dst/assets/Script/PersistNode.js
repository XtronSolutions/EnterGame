
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/PersistNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bfecfllkSBBWqaV7Q6V0YJ7', 'PersistNode');
// Script/PersistNode.js

"use strict";

var PersistNode = cc.Class({
  name: "PersistNode",
  "extends": cc.Component,
  properties: {
    musicProp: {
      // ATTRIBUTES:
      "default": null,
      type: cc.AudioClip,
      serializable: true
    } // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },

  },
  statics: {
    //creating static instance of the class
    Instance: null
  },
  onLoad: function onLoad() {
    if (!PersistNode.Instance) {
      cc.game.addPersistRootNode(this.node);
      PersistNode.Instance = this;
      var iD = cc.audioEngine.playMusic(this.musicProp, true);
      cc.audioEngine.setVolume(iD, 0.8);
    }
  },
  update: function update() {
    console.log("here");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQZXJzaXN0Tm9kZS5qcyJdLCJuYW1lcyI6WyJQZXJzaXN0Tm9kZSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm11c2ljUHJvcCIsInR5cGUiLCJBdWRpb0NsaXAiLCJzZXJpYWxpemFibGUiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJvbkxvYWQiLCJnYW1lIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsImlEIiwiYXVkaW9FbmdpbmUiLCJwbGF5TXVzaWMiLCJzZXRWb2x1bWUiLCJ1cGRhdGUiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDckJDLEVBQUFBLElBQUksRUFBQyxhQURnQjtBQUVyQixhQUFTRixFQUFFLENBQUNHLFNBRlM7QUFJckJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUDtBQUNBLGlCQUFTLElBRkY7QUFHUEMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLFNBSEY7QUFJUEMsTUFBQUEsWUFBWSxFQUFFO0FBSlAsS0FESCxDQU9SO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBZFEsR0FKUztBQXFCckJDLEVBQUFBLE9BQU8sRUFBRTtBQUNMO0FBQ0FDLElBQUFBLFFBQVEsRUFBRTtBQUZMLEdBckJZO0FBMEJyQkMsRUFBQUEsTUExQnFCLG9CQTBCWDtBQUNOLFFBQUksQ0FBQ1osV0FBVyxDQUFDVyxRQUFqQixFQUEyQjtBQUN2QlYsTUFBQUEsRUFBRSxDQUFDWSxJQUFILENBQVFDLGtCQUFSLENBQTJCLEtBQUtDLElBQWhDO0FBQ0FmLE1BQUFBLFdBQVcsQ0FBQ1csUUFBWixHQUFxQixJQUFyQjtBQUNBLFVBQUlLLEVBQUUsR0FBQ2YsRUFBRSxDQUFDZ0IsV0FBSCxDQUFlQyxTQUFmLENBQXlCLEtBQUtaLFNBQTlCLEVBQXdDLElBQXhDLENBQVA7QUFDQUwsTUFBQUEsRUFBRSxDQUFDZ0IsV0FBSCxDQUFlRSxTQUFmLENBQXlCSCxFQUF6QixFQUE2QixHQUE3QjtBQUNIO0FBQ0osR0FqQ29CO0FBbUNyQkksRUFBQUEsTUFuQ3FCLG9CQW9DckI7QUFDSUMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNIO0FBdENvQixDQUFULENBQWhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUGVyc2lzdE5vZGU9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlBlcnNpc3ROb2RlXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG11c2ljUHJvcDoge1xyXG4gICAgICAgICAgICAvLyBBVFRSSUJVVEVTOlxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGJhcjoge1xyXG4gICAgICAgIC8vICAgICBnZXQgKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICAgICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgICAgIH0sXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBpZiAoIVBlcnNpc3ROb2RlLkluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIFBlcnNpc3ROb2RlLkluc3RhbmNlPXRoaXM7XHJcbiAgICAgICAgICAgIHZhciBpRD1jYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5tdXNpY1Byb3AsdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldFZvbHVtZShpRCwgMC44KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJoZXJlXCIpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==