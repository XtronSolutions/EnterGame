var Preloading = cc.Class({
  name: "Preloading",
  extends: cc.Component,

  properties: {},

  onLoad() {
    cc.director.preloadScene("GamePlay", function () {
      cc.log("Next scene Gameplay preloaded");
    });
  },
});
