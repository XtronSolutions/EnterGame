
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Preloading.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cf8e5kuaxFOD65om5VmK3Ax', 'Preloading');
// Script/Preloading.js

"use strict";

var Preloading = cc.Class({
  name: "Preloading",
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    cc.director.preloadScene("GamePlay", function () {
      cc.log("Next scene Gameplay preloaded");
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQcmVsb2FkaW5nLmpzIl0sIm5hbWVzIjpbIlByZWxvYWRpbmciLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJkaXJlY3RvciIsInByZWxvYWRTY2VuZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxVQUFVLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsWUFEa0I7QUFFeEIsYUFBU0YsRUFBRSxDQUFDRyxTQUZZO0FBSXhCQyxFQUFBQSxVQUFVLEVBQUUsRUFKWTtBQU14QkMsRUFBQUEsTUFOd0Isb0JBTWY7QUFDUEwsSUFBQUEsRUFBRSxDQUFDTSxRQUFILENBQVlDLFlBQVosQ0FBeUIsVUFBekIsRUFBcUMsWUFBWTtBQUMvQ1AsTUFBQUEsRUFBRSxDQUFDUSxHQUFILENBQU8sK0JBQVA7QUFDRCxLQUZEO0FBR0Q7QUFWdUIsQ0FBVCxDQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFByZWxvYWRpbmcgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQcmVsb2FkaW5nXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7fSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKFwiR2FtZVBsYXlcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICBjYy5sb2coXCJOZXh0IHNjZW5lIEdhbWVwbGF5IHByZWxvYWRlZFwiKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbn0pO1xyXG4iXX0=