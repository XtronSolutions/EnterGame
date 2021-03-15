var GamePlayReferenceManager = null;
//for web make: IsWeb=true
//for mobile make: IsWeb=false
var IsWeb = false;
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

  update() {
    // if (cc.sys.getNetworkType() == cc.sys.NetworkType.LAN || cc.sys.getNetworkType() == cc.sys.NetworkType.WWAN) {
    //   console.log("connected");
    // } else if (cc.sys.getNetworkType() == cc.sys.NetworkType.NONE) {
    //   console.log("not connected");
    // }
  },
  onLoad() {
    console.log("V15");
    if(IsWeb)
    {
      console.log = function () {};
      console.error = function () {};
      console.warn = function () {};
      console.info = function () {};
      console.trace = function () {};
    }
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
    var userData;
    if (IsWeb) {
      var storedData = window.AllData;
      console.log(storedData);
      if (storedData == undefined || storedData == null) {
        userData = null;
      } else {
        userData = JSON.parse(storedData);
      }
    } else {
      userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
    }
    var server = GamePlayReferenceManager.Instance.Get_ServerBackend();
    if (userData === null) {
      console.log("no session data found");
      this.Loader.active = false;
    } else {
      //check if token is expired or not
      server.GetUserData(userData.SK, userData.roleType, userData.userToken, 0);
    }
  },

  WriteData(_data) {
    if (IsWeb) {
      window.AllData = JSON.stringify(_data);
    } else {
      cc.sys.localStorage.setItem("userData", JSON.stringify(_data));
    }
  },

  RefreshData(_response) {
    if (_response == 0) {
      //means successful
      var userData;
      if (IsWeb) {
        userData = JSON.parse(window.AllData);
      } else {
        userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
      }
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
    if (IsWeb) {
      window.AllData = null;
    } else {
      cc.sys.localStorage.removeItem("userData");
    }
  },
});
