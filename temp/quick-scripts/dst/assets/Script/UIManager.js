
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/UIManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a9f82II+PtD3bbDNSBZacU7', 'UIManager');
// Script/UIManager.js

"use strict";

var _TweenManager = _interopRequireDefault(require("TweenManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GamePlayReferenceManager = null;
var TweenRef;
var TotalRoom = []; //-------------------------------------------class for Profile UI-------------------------//

var ProfileUI = cc.Class({
  name: "ProfileUI",
  properties: {
    NameLabel: {
      displayName: "Name",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to name label of profile"
    },
    EmailAddressLabel: {
      displayName: "EmailAddress",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference for email address label of profile "
    },
    DOBLabel: {
      displayName: "DOB",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to DOB label of profile"
    },
    GradeLevelLabel: {
      displayName: "GradeLevel",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Grade Level label of profile"
    },
    TeacherNameLabel: {
      displayName: "TeacherName",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Teacher Name label of profile"
    },
    GamesWonLabel: {
      displayName: "GamesWon",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to games won label of profile"
    },
    FBPageLabel: {
      displayName: "FBPage",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to facebook page label of profile"
    },
    TestTakenLabel: {
      displayName: "TestTaken",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to test taken label of profile"
    },
    TestingAvgLabel: {
      displayName: "TestingAverage",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Testing Average label of profile"
    },
    CashLabel: {
      displayName: "Cash",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to cash label of profile"
    },
    StatusNode: {
      displayName: "StatusScreen",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to Status Screen of profile"
    },
    PlayButtonNode: {
      displayName: "PlayButton",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to play button of profile"
    },
    StatusLabel: {
      displayName: "StatusText",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Status label of profile"
    },
    PlayerCountInput: {
      displayName: "PlayerCountInput",
      "default": null,
      type: cc.EditBox,
      serializable: true,
      tooltip: "reference to PlayerCountInput of profile"
    }
  }
}); //-------------------------------------------class for SpectateUI-------------------------//

var SpectateUI = cc.Class({
  name: "SpectateUI",
  properties: {
    RoomScreenNode: {
      displayName: "RoomScreen",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Reference to the node of room screen"
    },
    ScrollBarContent: {
      displayName: "ScrollBarContent",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Reference to the node of ScrollBarContent of room screen"
    },
    ProfileScreenNode: {
      displayName: "ProfileScreen",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Reference to the node of profile screen"
    },
    RoomPrefab: {
      displayName: "RoomPrefab",
      "default": null,
      type: cc.Prefab,
      serializable: true,
      tooltip: "Reference to the prefab of Room on room screen"
    }
  }
}); //-------------------------------------------class for UIManager-------------------------//

var UIManager = cc.Class({
  name: "UIManager",
  "extends": cc.Component,
  properties: {
    UIProfile: {
      displayName: "UIProfile",
      "default": null,
      type: ProfileUI,
      serializable: true,
      tooltip: "reference to ProfileUI class intance"
    },
    ScreenNodes: {
      displayName: "ScreenNodes",
      "default": [],
      type: [cc.Node],
      serializable: true,
      tooltip: "reference to login screen node"
    },
    TweenManagerRef: {
      displayName: "TweenManagerRef",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for Tween Manager Script "
    },
    Logo: {
      displayName: "LogoNode",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for the logo node"
    },
    ToastNode: {
      displayName: "ToastNode",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for the toast node"
    },
    LoadingNode: {
      displayName: "LoadingNode",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for the Loading Node"
    },
    ReferenceManagerRef: {
      displayName: "ReferenceManagerRef",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for the reference manager node"
    },
    UISpectate: {
      displayName: "UISpectate",
      "default": null,
      type: SpectateUI,
      serializable: true,
      tooltip: "reference to SpectateUI class intance"
    }
  },
  statics: {
    //creating static instance of the class
    Instance: null
  },
  onEnable: function onEnable() {
    //events subscription to be called 
    cc.systemEvent.on('AssignProfileData', this.AssignProfileData, this);
    cc.systemEvent.on('UpdateStatusWindow', this.UpdateStatusWindow, this);
    cc.systemEvent.on('ChangePanelScreen', this.ChangePanelScreen, this);
  },
  onDisable: function onDisable() {
    cc.systemEvent.off('AssignProfileData', this.AssignProfileData, this);
    cc.systemEvent.off('UpdateStatusWindow', this.UpdateStatusWindow, this);
    cc.systemEvent.off('ChangePanelScreen', this.ChangePanelScreen, this);
  },
  onLoad: function onLoad() {
    this.ReferenceManagerRef = this.ReferenceManagerRef.getComponent("GamePlayReferenceManager");
    UIManager.Instance = this;
    TotalRoom = []; //Private Variables

    this.EmailText = "";
    this.PasswordText = "";
    this.nodeCounter = 0;
    this.StatusText = "";
    this.TotalPlayers = "";
    this.ResetPlayerCountInput();
    this.GetTweenManagerReference();
    this.SlideInLoginComponents();
    this.RepeatLogoAnimation();
    this.CheckReferences();
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },
  start: function start() {},
  ChangePanelScreen: function ChangePanelScreen(isNext, changeScreen, sceneName) {
    var _this = this;

    TweenRef.FadeNodeInOut(this.ScreenNodes[this.nodeCounter], 0.55, 255, 0, "quadInOut");

    if (changeScreen == false) {
      if (isNext == true) {
        if (this.nodeCounter < this.ScreenNodes.length) this.nodeCounter = this.nodeCounter + 1;
      } else {
        if (this.nodeCounter > 0) this.nodeCounter = this.nodeCounter - 1;
      }

      setTimeout(function () {
        _this.ManipulateNodes(_this.nodeCounter);
      }, 600);
    } else {
      setTimeout(function () {
        cc.director.loadScene(sceneName);
      }, 600);
    }
  },
  ManipulateNodes: function ManipulateNodes(counter) {
    for (var index = 0; index < this.ScreenNodes.length; index++) {
      if (counter == index) {
        this.ScreenNodes[index].active = true;
        console.log("seting it true");
        TweenRef.FadeNodeInOut(this.ScreenNodes[index], 1.5, 0, 255, "quadInOut");
      } else {
        this.ScreenNodes[index].active = false;
      }
    }
  },
  SlideInLoginComponents: function SlideInLoginComponents() {
    TweenRef.LoginScreenTween(this.ScreenNodes[this.nodeCounter].children[1], -1000);
  },
  RepeatLogoAnimation: function RepeatLogoAnimation() {
    TweenRef.RepeatTweenScale(this.Logo, 1.1, 1, 0.8);
  },
  GetTweenManagerReference: function GetTweenManagerReference() {
    TweenRef = this.TweenManagerRef.getComponent("TweenManager");
  },
  ResetPlayerCountInput: function ResetPlayerCountInput() {
    this.UIProfile.PlayerCountInput.string = "";
    this.TotalPlayers = "";
  },
  OnplayerNumberChanged: function OnplayerNumberChanged(_number) {
    this.TotalPlayers = _number;
  },
  PlayGame: function PlayGame() {
    if (this.TotalPlayers == "") {
      this.ShowToast("please enter player amount for multiplayer from 2-6, make sure to have same amount on different connecting devices if you want to connect them.", 3500);
    } else {
      var _players = parseInt(this.TotalPlayers);

      if (_players >= 2 && _players <= 6) {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleShowRoom_Bool(false);
        this.UIProfile.StatusNode.active = true; //this.UIProfile.PlayButtonNode.active=false;

        this.UIProfile.StatusLabel.string = "";
        GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = _players;

        if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isConnectedToMaster() || GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isInLobby()) {
          cc.systemEvent.emit("UpdateStatusWindow", "waiting for other players...");
          GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinRandomRoom();
        } else {
          GamePlayReferenceManager.Instance.Get_MultiplayerController().RequestConnection();
        }
      } else {
        this.ResetPlayerCountInput();
        this.ShowToast("please enter player amount for multiplayer from 2-6, make sure to have same amount on different connecting devices if you want to connect them.", 3500);
      }
    }
  },
  UpdateStatusWindow: function UpdateStatusWindow(msg) {
    this.StatusText = this.StatusText + msg + "\n";
    this.UIProfile.StatusLabel.string = this.StatusText;
  },
  ExitConnecting: function ExitConnecting() {
    this.UIProfile.StatusNode.active = false;
    this.UIProfile.PlayButtonNode.active = true;
    this.UIProfile.StatusLabel.string = "";
    this.EmailText = "";
    this.PasswordText = "";
    this.StatusText = "";
    this.TotalPlayers = "";
    this.ResetPlayerCountInput();
    GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
  },
  ToggleLoadingNode: function ToggleLoadingNode(state) {
    this.LoadingNode.active = state;
  },
  LoginUser: function LoginUser() {
    if (this.EmailText != "" && this.PasswordText != "") {
      this.ToggleLoadingNode(true);
      var anim = this.LoadingNode.children[0].children[1].getComponent(cc.Animation);
      anim.play('loading');
      GamePlayReferenceManager.Instance.Get_ServerBackend().LoginUser(this.EmailText, this.PasswordText, "Student");
    } else {
      this.ToggleLoadingNode(false);
      this.ShowToast("Email or password invalid or empty.");
    }
  },
  SetEmailText: function SetEmailText(text) {
    this.EmailText = text;
  },
  SetPasswordText: function SetPasswordText(text) {
    this.PasswordText = text;
  },
  AssignProfileData: function AssignProfileData() {
    if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 1) //means successful
      {
        this.ChangePanelScreen(true, false, "");
        console.log(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);
        this.UIProfile.NameLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name;
        this.UIProfile.EmailAddressLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.emailAddress;
        this.UIProfile.DOBLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.dOB;
        this.UIProfile.GradeLevelLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gradeLevel;
        this.UIProfile.TeacherNameLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.teacherName;
        this.UIProfile.GamesWonLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gamesWon;
        this.UIProfile.FBPageLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.facebookPage;
        this.UIProfile.TestTakenLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.testsTaken;
        this.UIProfile.TestingAvgLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.testingAverage;
        this.UIProfile.CashLabel.string = "$ " + GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gameCash;
        this.ToggleLoadingNode(false);
      } else if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 2) //user not found
      {
        this.ToggleLoadingNode(false);
        this.ShowToast("no user registered with entered email.");
      } else if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 3) //pass/email invalid
      {
        this.ToggleLoadingNode(false);
        this.ShowToast("user email or password is wrong");
      } else if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 4) //something went wrong
      {
        this.ToggleLoadingNode(false);
        this.ShowToast("something went wrong please try again.");
      }
  },
  //#region Spectate Ui Work
  ToggleRoomScreen_SpectateUI: function ToggleRoomScreen_SpectateUI(_state) {
    if (_state) this.UIProfile.StatusNode.active = false;
    this.UISpectate.RoomScreenNode.active = _state;
  },
  ToggleProfileScreen_SpectateUI: function ToggleProfileScreen_SpectateUI(_state) {
    this.UISpectate.ProfileScreenNode.active = _state;
  },
  ShowAvailableRooms_SpectateUI: function ShowAvailableRooms_SpectateUI() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isConnectedToMaster() || GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isInLobby()) {
      this.ToggleProfileScreen_SpectateUI(false);
      this.ToggleRoomScreen_SpectateUI(true);
    } else {
      this.UIProfile.StatusNode.active = true;
      this.UIProfile.StatusLabel.string = "";
      GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleShowRoom_Bool(true);
      GamePlayReferenceManager.Instance.Get_MultiplayerController().RequestConnection();
    }
  },
  UpdateRoomsList_SpectateUI: function UpdateRoomsList_SpectateUI(_name, _players) {
    var node = cc.instantiate(this.UISpectate.RoomPrefab);
    node.parent = this.UISpectate.ScrollBarContent;
    node.getComponent('RoomListHandler').SetRoomName(_name);
    node.getComponent('RoomListHandler').SetPlayerCount(_players);
    TotalRoom.push(node);
  },
  ResetRoomList: function ResetRoomList() {
    for (var index = 0; index < TotalRoom.length; index++) {
      TotalRoom[index].destroy();
    }

    TotalRoom = [];
  },
  Exit_SpectateUI: function Exit_SpectateUI() {
    this.ToggleProfileScreen_SpectateUI(true);
    this.ToggleRoomScreen_SpectateUI(false);
    this.ExitConnecting();
  },
  //#endregion
  ShowToast: function ShowToast(msg, _time) {
    if (_time === void 0) {
      _time = 2000;
    }

    this.ToastNode.active = true;
    this.ToastNode.children[0].children[0].getComponent(cc.Label).string = msg;
    var SelfToast = this;
    setTimeout(function () {
      SelfToast.ToastNode.active = false;
    }, _time);
  }
});
module.exports = UIManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxVSU1hbmFnZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHdlZW5SZWYiLCJUb3RhbFJvb20iLCJQcm9maWxlVUkiLCJjYyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJOYW1lTGFiZWwiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJMYWJlbCIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJFbWFpbEFkZHJlc3NMYWJlbCIsIkRPQkxhYmVsIiwiR3JhZGVMZXZlbExhYmVsIiwiVGVhY2hlck5hbWVMYWJlbCIsIkdhbWVzV29uTGFiZWwiLCJGQlBhZ2VMYWJlbCIsIlRlc3RUYWtlbkxhYmVsIiwiVGVzdGluZ0F2Z0xhYmVsIiwiQ2FzaExhYmVsIiwiU3RhdHVzTm9kZSIsIk5vZGUiLCJQbGF5QnV0dG9uTm9kZSIsIlN0YXR1c0xhYmVsIiwiUGxheWVyQ291bnRJbnB1dCIsIkVkaXRCb3giLCJTcGVjdGF0ZVVJIiwiUm9vbVNjcmVlbk5vZGUiLCJTY3JvbGxCYXJDb250ZW50IiwiUHJvZmlsZVNjcmVlbk5vZGUiLCJSb29tUHJlZmFiIiwiUHJlZmFiIiwiVUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiVUlQcm9maWxlIiwiU2NyZWVuTm9kZXMiLCJUd2Vlbk1hbmFnZXJSZWYiLCJMb2dvIiwiVG9hc3ROb2RlIiwiTG9hZGluZ05vZGUiLCJSZWZlcmVuY2VNYW5hZ2VyUmVmIiwiVUlTcGVjdGF0ZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIkFzc2lnblByb2ZpbGVEYXRhIiwiVXBkYXRlU3RhdHVzV2luZG93IiwiQ2hhbmdlUGFuZWxTY3JlZW4iLCJvbkRpc2FibGUiLCJvZmYiLCJvbkxvYWQiLCJnZXRDb21wb25lbnQiLCJFbWFpbFRleHQiLCJQYXNzd29yZFRleHQiLCJub2RlQ291bnRlciIsIlN0YXR1c1RleHQiLCJUb3RhbFBsYXllcnMiLCJSZXNldFBsYXllckNvdW50SW5wdXQiLCJHZXRUd2Vlbk1hbmFnZXJSZWZlcmVuY2UiLCJTbGlkZUluTG9naW5Db21wb25lbnRzIiwiUmVwZWF0TG9nb0FuaW1hdGlvbiIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJzdGFydCIsImlzTmV4dCIsImNoYW5nZVNjcmVlbiIsInNjZW5lTmFtZSIsIkZhZGVOb2RlSW5PdXQiLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiTWFuaXB1bGF0ZU5vZGVzIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJjb3VudGVyIiwiaW5kZXgiLCJhY3RpdmUiLCJjb25zb2xlIiwibG9nIiwiTG9naW5TY3JlZW5Ud2VlbiIsImNoaWxkcmVuIiwiUmVwZWF0VHdlZW5TY2FsZSIsInN0cmluZyIsIk9ucGxheWVyTnVtYmVyQ2hhbmdlZCIsIl9udW1iZXIiLCJQbGF5R2FtZSIsIlNob3dUb2FzdCIsIl9wbGF5ZXJzIiwicGFyc2VJbnQiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlU2hvd1Jvb21fQm9vbCIsIk1heFBsYXllcnMiLCJnZXRQaG90b25SZWYiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5IiwiZW1pdCIsIkpvaW5SYW5kb21Sb29tIiwiUmVxdWVzdENvbm5lY3Rpb24iLCJtc2ciLCJFeGl0Q29ubmVjdGluZyIsIkRpc2Nvbm5lY3RQaG90b24iLCJUb2dnbGVMb2FkaW5nTm9kZSIsInN0YXRlIiwiTG9naW5Vc2VyIiwiYW5pbSIsIkFuaW1hdGlvbiIsInBsYXkiLCJHZXRfU2VydmVyQmFja2VuZCIsIlNldEVtYWlsVGV4dCIsInRleHQiLCJTZXRQYXNzd29yZFRleHQiLCJSZXNwb25zZVR5cGUiLCJTdHVkZW50RGF0YSIsImVtYWlsQWRkcmVzcyIsImRPQiIsImdyYWRlTGV2ZWwiLCJ0ZWFjaGVyTmFtZSIsImdhbWVzV29uIiwiZmFjZWJvb2tQYWdlIiwidGVzdHNUYWtlbiIsInRlc3RpbmdBdmVyYWdlIiwiZ2FtZUNhc2giLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJfc3RhdGUiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJTaG93QXZhaWxhYmxlUm9vbXNfU3BlY3RhdGVVSSIsIlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJIiwiX25hbWUiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJTZXRSb29tTmFtZSIsIlNldFBsYXllckNvdW50IiwicHVzaCIsIlJlc2V0Um9vbUxpc3QiLCJkZXN0cm95IiwiRXhpdF9TcGVjdGF0ZVVJIiwiX3RpbWUiLCJTZWxmVG9hc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0EsSUFBSUEsd0JBQXdCLEdBQUMsSUFBN0I7QUFDQSxJQUFJQyxRQUFKO0FBQ0EsSUFBSUMsU0FBUyxHQUFDLEVBQWQsRUFDQTs7QUFDQSxJQUFJQyxTQUFTLEdBQUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ25CQyxFQUFBQSxJQUFJLEVBQUMsV0FEYztBQUVuQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRTtBQUNQQyxNQUFBQSxXQUFXLEVBQUMsTUFETDtBQUVQLGlCQUFTLElBRkY7QUFHUEMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLEtBSEY7QUFJUEMsTUFBQUEsWUFBWSxFQUFFLElBSlA7QUFLUEMsTUFBQUEsT0FBTyxFQUFFO0FBTEYsS0FESDtBQU9QQyxJQUFBQSxpQkFBaUIsRUFBRTtBQUNoQkwsTUFBQUEsV0FBVyxFQUFDLGNBREk7QUFFaEIsaUJBQVMsSUFGTztBQUdoQkMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLEtBSE87QUFJaEJDLE1BQUFBLFlBQVksRUFBRSxJQUpFO0FBS2hCQyxNQUFBQSxPQUFPLEVBQUU7QUFMTyxLQVBaO0FBYVBFLElBQUFBLFFBQVEsRUFBRTtBQUNQTixNQUFBQSxXQUFXLEVBQUMsS0FETDtBQUVQLGlCQUFTLElBRkY7QUFH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QUFNLENBQUNDLE9BQVAsR0FBZ0I3RyxTQUFoQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFR3ZWVlbiBmcm9tICdUd2Vlbk1hbmFnZXInO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBUd2VlblJlZjtcclxudmFyIFRvdGFsUm9vbT1bXTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFByb2ZpbGVVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUHJvZmlsZVVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7ICAgXHJcbiAgICAgICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLCB9LFxyXG4gICAgICAgICBET0JMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkRPQlwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBET0IgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEdyYWRlTGV2ZWxMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkdyYWRlTGV2ZWxcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gR3JhZGUgTGV2ZWwgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIFRlYWNoZXJOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUZWFjaGVyTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBUZWFjaGVyIE5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEdhbWVzV29uTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJHYW1lc1dvblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBnYW1lcyB3b24gbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEZCUGFnZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRkJQYWdlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGZhY2Vib29rIHBhZ2UgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIFRlc3RUYWtlbkxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVGVzdFRha2VuXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIHRlc3QgdGFrZW4gbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIFRlc3RpbmdBdmdMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRlc3RpbmdBdmVyYWdlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFRlc3RpbmcgQXZlcmFnZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJDYXNoXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGNhc2ggbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgU3RhdHVzTm9kZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlN0YXR1c1NjcmVlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFN0YXR1cyBTY3JlZW4gb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgUGxheUJ1dHRvbk5vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJQbGF5QnV0dG9uXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gcGxheSBidXR0b24gb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgU3RhdHVzTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTdGF0dXNUZXh0XCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFN0YXR1cyBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICBQbGF5ZXJDb3VudElucHV0OiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyQ291bnRJbnB1dFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFBsYXllckNvdW50SW5wdXQgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTcGVjdGF0ZVVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTcGVjdGF0ZVVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJTcGVjdGF0ZVVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7ICAgXHJcbiAgICAgICAgUm9vbVNjcmVlbk5vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJSb29tU2NyZWVuXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2Ygcm9vbSBzY3JlZW5cIix9LFxyXG4gICAgICAgIFNjcm9sbEJhckNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTY3JvbGxCYXJDb250ZW50XCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2YgU2Nyb2xsQmFyQ29udGVudCBvZiByb29tIHNjcmVlblwiLH0sXHJcbiAgICAgICAgUHJvZmlsZVNjcmVlbk5vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJQcm9maWxlU2NyZWVuXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2YgcHJvZmlsZSBzY3JlZW5cIix9LFxyXG4gICAgICAgIFJvb21QcmVmYWI6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJSb29tUHJlZmFiXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFJvb20gb24gcm9vbSBzY3JlZW5cIix9LFxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVSU1hbmFnZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlVJTWFuYWdlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHsgXHJcbiAgICAgICAgVUlQcm9maWxlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVUlQcm9maWxlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IFByb2ZpbGVVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBQcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLH0sICBcclxuICAgICAgICBTY3JlZW5Ob2Rlczoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlNjcmVlbk5vZGVzXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbG9naW4gc2NyZWVuIG5vZGVcIix9LFxyXG4gICAgICAgICBUd2Vlbk1hbmFnZXJSZWY6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUd2Vlbk1hbmFnZXJSZWZcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgVHdlZW4gTWFuYWdlciBTY3JpcHQgXCIsIH0sXHJcbiAgICAgICAgIExvZ286IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2dvTm9kZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgbG9nbyBub2RlXCIsfSxcclxuICAgICAgICAgVG9hc3ROb2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG9hc3ROb2RlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIHRoZSB0b2FzdCBub2RlXCIsfSxcclxuICAgICAgICAgTG9hZGluZ05vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FkaW5nTm9kZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgTG9hZGluZyBOb2RlXCIsfSwgICBcclxuICAgICAgICBSZWZlcmVuY2VNYW5hZ2VyUmVmOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUmVmZXJlbmNlTWFuYWdlclJlZlwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgcmVmZXJlbmNlIG1hbmFnZXIgbm9kZVwiLH0sICBcclxuICAgICAgICBVSVNwZWN0YXRlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVUlTcGVjdGF0ZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBTcGVjdGF0ZVVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFNwZWN0YXRlVUkgY2xhc3MgaW50YW5jZVwiLH0sICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHsgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICAgICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZCBcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbignQXNzaWduUHJvZmlsZURhdGEnLCB0aGlzLkFzc2lnblByb2ZpbGVEYXRhLCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbignVXBkYXRlU3RhdHVzV2luZG93JywgdGhpcy5VcGRhdGVTdGF0dXNXaW5kb3csIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKCdDaGFuZ2VQYW5lbFNjcmVlbicsIHRoaXMuQ2hhbmdlUGFuZWxTY3JlZW4sIHRoaXMpO1xyXG4gICAgICB9LFxyXG4gICAgXHJcbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoJ0Fzc2lnblByb2ZpbGVEYXRhJywgdGhpcy5Bc3NpZ25Qcm9maWxlRGF0YSwgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKCdVcGRhdGVTdGF0dXNXaW5kb3cnLCB0aGlzLlVwZGF0ZVN0YXR1c1dpbmRvdywgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKCdDaGFuZ2VQYW5lbFNjcmVlbicsIHRoaXMuQ2hhbmdlUGFuZWxTY3JlZW4sIHRoaXMpO1xyXG4gICAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5SZWZlcmVuY2VNYW5hZ2VyUmVmPXRoaXMuUmVmZXJlbmNlTWFuYWdlclJlZi5nZXRDb21wb25lbnQoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcblxyXG4gICAgICAgIFVJTWFuYWdlci5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIFRvdGFsUm9vbT1bXTtcclxuICAgICAgICAvL1ByaXZhdGUgVmFyaWFibGVzXHJcbiAgICAgICAgdGhpcy5FbWFpbFRleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlBhc3N3b3JkVGV4dD1cIlwiO1xyXG4gICAgICAgIHRoaXMubm9kZUNvdW50ZXI9MDtcclxuICAgICAgICB0aGlzLlN0YXR1c1RleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlRvdGFsUGxheWVycz1cIlwiO1xyXG4gICAgICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuR2V0VHdlZW5NYW5hZ2VyUmVmZXJlbmNlKCk7XHJcbiAgICAgICAgdGhpcy5TbGlkZUluTG9naW5Db21wb25lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5SZXBlYXRMb2dvQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIENoYW5nZVBhbmVsU2NyZWVuOiBmdW5jdGlvbiAoaXNOZXh0LGNoYW5nZVNjcmVlbixzY2VuZU5hbWUpIHtcclxuICAgICAgICBUd2VlblJlZi5GYWRlTm9kZUluT3V0KHRoaXMuU2NyZWVuTm9kZXNbdGhpcy5ub2RlQ291bnRlcl0sMC41NSwyNTUsMCxcInF1YWRJbk91dFwiKTtcclxuXHJcbiAgICBpZihjaGFuZ2VTY3JlZW49PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGlzTmV4dD09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZUNvdW50ZXI8dGhpcy5TY3JlZW5Ob2Rlcy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVDb3VudGVyPXRoaXMubm9kZUNvdW50ZXIrMTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlQ291bnRlcj4wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlQ291bnRlcj10aGlzLm5vZGVDb3VudGVyLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge3RoaXMuTWFuaXB1bGF0ZU5vZGVzKHRoaXMubm9kZUNvdW50ZXIpO30sIDYwMCk7XHJcbiAgICB9ZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge2NjLmRpcmVjdG9yLmxvYWRTY2VuZShzY2VuZU5hbWUpO30sIDYwMCk7XHJcbiAgICB9fSxcclxuXHJcbiAgICBNYW5pcHVsYXRlTm9kZXM6IGZ1bmN0aW9uIChjb3VudGVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuU2NyZWVuTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKGNvdW50ZXI9PWluZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNjcmVlbk5vZGVzW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0aW5nIGl0IHRydWVcIik7XHJcbiAgICAgICAgICAgICAgICBUd2VlblJlZi5GYWRlTm9kZUluT3V0KHRoaXMuU2NyZWVuTm9kZXNbaW5kZXhdLDEuNSwwLDI1NSxcInF1YWRJbk91dFwiKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNjcmVlbk5vZGVzW2luZGV4XS5hY3RpdmU9ZmFsc2U7IFxyXG4gICAgICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTbGlkZUluTG9naW5Db21wb25lbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgVHdlZW5SZWYuTG9naW5TY3JlZW5Ud2Vlbih0aGlzLlNjcmVlbk5vZGVzW3RoaXMubm9kZUNvdW50ZXJdLmNoaWxkcmVuWzFdLC0xMDAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVwZWF0TG9nb0FuaW1hdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFR3ZWVuUmVmLlJlcGVhdFR3ZWVuU2NhbGUodGhpcy5Mb2dvLDEuMSwxLDAuOCk7XHJcbiAgICB9LFxyXG5cclxuICAgIEdldFR3ZWVuTWFuYWdlclJlZmVyZW5jZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFR3ZWVuUmVmPXRoaXMuVHdlZW5NYW5hZ2VyUmVmLmdldENvbXBvbmVudChcIlR3ZWVuTWFuYWdlclwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRQbGF5ZXJDb3VudElucHV0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5QbGF5ZXJDb3VudElucHV0LnN0cmluZz1cIlwiO1xyXG4gICAgICAgIHRoaXMuVG90YWxQbGF5ZXJzPVwiXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIE9ucGxheWVyTnVtYmVyQ2hhbmdlZChfbnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG90YWxQbGF5ZXJzPV9udW1iZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIFBsYXlHYW1lOmZ1bmN0aW9uKClcclxuICAgIHsgIFxyXG4gICAgICAgIGlmKHRoaXMuVG90YWxQbGF5ZXJzPT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2UgZW50ZXIgcGxheWVyIGFtb3VudCBmb3IgbXVsdGlwbGF5ZXIgZnJvbSAyLTYsIG1ha2Ugc3VyZSB0byBoYXZlIHNhbWUgYW1vdW50IG9uIGRpZmZlcmVudCBjb25uZWN0aW5nIGRldmljZXMgaWYgeW91IHdhbnQgdG8gY29ubmVjdCB0aGVtLlwiLDM1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3BsYXllcnM9cGFyc2VJbnQodGhpcy5Ub3RhbFBsYXllcnMpO1xyXG4gICAgICAgICAgICBpZihfcGxheWVycz49MiAmJiBfcGxheWVyczw9NilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVTaG93Um9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuVUlQcm9maWxlLlBsYXlCdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzPV9wbGF5ZXJzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLmlzSW5Mb2JieSgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcIndhaXRpbmcgZm9yIG90aGVyIHBsYXllcnMuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luUmFuZG9tUm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVxdWVzdENvbm5lY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBlbnRlciBwbGF5ZXIgYW1vdW50IGZvciBtdWx0aXBsYXllciBmcm9tIDItNiwgbWFrZSBzdXJlIHRvIGhhdmUgc2FtZSBhbW91bnQgb24gZGlmZmVyZW50IGNvbm5lY3RpbmcgZGV2aWNlcyBpZiB5b3Ugd2FudCB0byBjb25uZWN0IHRoZW0uXCIsMzUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZVN0YXR1c1dpbmRvdzpmdW5jdGlvbihtc2cpXHJcbiAgICB7ICBcclxuICAgICAgICB0aGlzLlN0YXR1c1RleHQ9dGhpcy5TdGF0dXNUZXh0K21zZytcIlxcblwiO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz10aGlzLlN0YXR1c1RleHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRDb25uZWN0aW5nOmZ1bmN0aW9uKClcclxuICAgIHsgIFxyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlBsYXlCdXR0b25Ob2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgIHRoaXMuRW1haWxUZXh0PVwiXCI7XHJcbiAgICAgICAgdGhpcy5QYXNzd29yZFRleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlN0YXR1c1RleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlRvdGFsUGxheWVycz1cIlwiO1xyXG4gICAgICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUxvYWRpbmdOb2RlKHN0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTG9hZGluZ05vZGUuYWN0aXZlPXN0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBMb2dpblVzZXI6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuRW1haWxUZXh0IT1cIlwiICYmIHRoaXMuUGFzc3dvcmRUZXh0IT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgdmFyIGFuaW0gPSB0aGlzLkxvYWRpbmdOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICBhbmltLnBsYXkoJ2xvYWRpbmcnKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTG9naW5Vc2VyKHRoaXMuRW1haWxUZXh0LHRoaXMuUGFzc3dvcmRUZXh0LFwiU3R1ZGVudFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiRW1haWwgb3IgcGFzc3dvcmQgaW52YWxpZCBvciBlbXB0eS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTZXRFbWFpbFRleHQ6ZnVuY3Rpb24odGV4dClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkVtYWlsVGV4dD10ZXh0O1xyXG4gICAgfSxcclxuXHJcbiAgICBTZXRQYXNzd29yZFRleHQ6ZnVuY3Rpb24odGV4dClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBhc3N3b3JkVGV4dD10ZXh0O1xyXG4gICAgfSxcclxuXHJcbiAgICBBc3NpZ25Qcm9maWxlRGF0YTpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09MSkgLy9tZWFucyBzdWNjZXNzZnVsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuKHRydWUsZmFsc2UsXCJcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmc9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuRE9CTGFiZWwuc3RyaW5nPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmRPQjtcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuR3JhZGVMZXZlbExhYmVsLnN0cmluZz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5ncmFkZUxldmVsO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5UZWFjaGVyTmFtZUxhYmVsLnN0cmluZz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS50ZWFjaGVyTmFtZTtcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuR2FtZXNXb25MYWJlbC5zdHJpbmc9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb247XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLkZCUGFnZUxhYmVsLnN0cmluZz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5mYWNlYm9va1BhZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlRlc3RUYWtlbkxhYmVsLnN0cmluZz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS50ZXN0c1Rha2VuO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5UZXN0aW5nQXZnTGFiZWwuc3RyaW5nPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnRlc3RpbmdBdmVyYWdlO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTGFiZWwuc3RyaW5nPVwiJCBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlc3BvbnNlVHlwZSk9PTIpIC8vdXNlciBub3QgZm91bmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIm5vIHVzZXIgcmVnaXN0ZXJlZCB3aXRoIGVudGVyZWQgZW1haWwuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlc3BvbnNlVHlwZSk9PTMpIC8vcGFzcy9lbWFpbCBpbnZhbGlkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ1c2VyIGVtYWlsIG9yIHBhc3N3b3JkIGlzIHdyb25nXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlc3BvbnNlVHlwZSk9PTQpIC8vc29tZXRoaW5nIHdlbnQgd3JvbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInNvbWV0aGluZyB3ZW50IHdyb25nIHBsZWFzZSB0cnkgYWdhaW4uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVaSBXb3JrXHJcbiAgICBUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9zdGF0ZSlcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuVUlTcGVjdGF0ZS5Sb29tU2NyZWVuTm9kZS5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUlTcGVjdGF0ZS5Qcm9maWxlU2NyZWVuTm9kZS5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBTaG93QXZhaWxhYmxlUm9vbXNfU3BlY3RhdGVVSSgpXHJcbiAgICB7XHJcbiAgICAgXHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0luTG9iYnkoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZVNob3dSb29tX0Jvb2wodHJ1ZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVxdWVzdENvbm5lY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKF9uYW1lLF9wbGF5ZXJzKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5VSVNwZWN0YXRlLlJvb21QcmVmYWIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5VSVNwZWN0YXRlLlNjcm9sbEJhckNvbnRlbnQ7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ1Jvb21MaXN0SGFuZGxlcicpLlNldFJvb21OYW1lKF9uYW1lKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudCgnUm9vbUxpc3RIYW5kbGVyJykuU2V0UGxheWVyQ291bnQoX3BsYXllcnMpO1xyXG4gICAgICAgIFRvdGFsUm9vbS5wdXNoKG5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXNldFJvb21MaXN0KClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgVG90YWxSb29tLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBUb3RhbFJvb21baW5kZXhdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRvdGFsUm9vbT1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdF9TcGVjdGF0ZVVJKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5FeGl0Q29ubmVjdGluZygpO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIFNob3dUb2FzdDpmdW5jdGlvbihtc2csX3RpbWU9MjAwMClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvYXN0Tm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLlRvYXN0Tm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1tc2c7XHJcbiAgICAgICAgdmFyIFNlbGZUb2FzdD10aGlzO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgIFNlbGZUb2FzdC5Ub2FzdE5vZGUuYWN0aXZlPWZhbHNlOyB9LCBfdGltZSk7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzPSBVSU1hbmFnZXI7XHJcbiJdfQ==