"use strict";
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