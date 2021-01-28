var GamePlayReferenceManager = null;

var StorageManager = cc.Class({
  name: "StorageManager",
  extends: cc.Component,

  properties: {
    Loader: {
      default: null,
      type: cc.Node,
      serializable: true,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    console.log("V6");
    GamePlayReferenceManager = null;
    this.Loader.active = true;
    var anim = this.Loader.children[0].children[1].getComponent(cc.Animation);
    anim.play("loading");

    this.CheckReferences();
    this.ReadData();
  },

  onEnable: function () {
    //events subscription to be called
    cc.systemEvent.on("WriteData", this.WriteData, this);
    cc.systemEvent.on("RefreshData", this.RefreshData, this);
    cc.systemEvent.on("ClearData", this.ClearData, this);
  },

  onDisable: function () {
    cc.systemEvent.off("WriteData", this.WriteData, this);
    cc.systemEvent.off("RefreshData", this.RefreshData, this);
    cc.systemEvent.off("ClearData", this.ClearData, this);
  },

  CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
  },

  ReadData() {
    //var userData = null;
    var userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
    var server = GamePlayReferenceManager.Instance.Get_ServerBackend();
    if (userData === null) {
      console.log("no session data found");
      this.Loader.active = false;

      var _data;
      if (typeof window.getUserData === "function") {
        _data = window.getUserData();
        console.error(_data);
        // safe to use the function
      } else {
        console.error("not a function");
      }

      // console.log(window.getUserData());
      //  console.log(cc.sys.localStorage.getItem("userData"));
      // console.log(localStorage.getItem("userData"));
      //console.log(window.localStorage.getItem("userData"));
      // console.log(_data);
      // try {
      //   var _data = window.getUserData();
      //   //   console.log(getUserData());
      // } catch (error) {
      //   console.log(error);
      // }
    } else {
      //console.error(userData);
      //check if token is expired or not
      server.GetUserData(userData.data.SK, userData.data.roleType, userData.data.userToken, 0);
    }
  },

  WriteData(_data) {
    cc.sys.localStorage.setItem("userData", JSON.stringify(_data));
  },

  RefreshData(_response) {
    if (_response == 0) {
      //means successful
      var userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
      setTimeout(() => {
        var server = GamePlayReferenceManager.Instance.Get_ServerBackend();
        server.ReloginFromStorage(userData);
      }, 500);

      setTimeout(() => {
        this.Loader.active = false;
      }, 1200);
    } else {
      //not successful
      this.Loader.active = false;
      var UIManag = GamePlayReferenceManager.Instance.Get_UIManager();
      UIManag.ShowToast("session expires, please login again.", 2400);
    }
  },

  ClearData() {
    cc.sys.localStorage.removeItem("userData");
  },
});
