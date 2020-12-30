
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
    ModeSelectionScreen: {
      displayName: "ModeSelectionScreen",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to mode selection screen node"
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
    this.ResetPlayerCountInput();
    this.ToggleModeSelection(true);
  },
  BackSelectionMode: function BackSelectionMode() {
    this.ResetPlayerCountInput();
    this.ToggleModeSelection(false);
  },
  ToggleModeSelection: function ToggleModeSelection(_state) {
    this.ModeSelectionScreen.active = _state;
  },
  VersesPlayerMode: function VersesPlayerMode() {
    if (this.TotalPlayers == "") {
      this.ShowToast("please enter player amount for multiplayer from 2-6, make sure to have same amount on different connecting devices if you want to connect them.", 3500);
    } else {
      var _players = parseInt(this.TotalPlayers);

      if (_players >= 2 && _players <= 6) {
        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleModeSelection(2);
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
  VersesAIMode: function VersesAIMode() {
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleModeSelection(1);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleShowRoom_Bool(false);
    this.UIProfile.StatusNode.active = true;
    this.UIProfile.StatusLabel.string = "";
    GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = 2;
    cc.systemEvent.emit("UpdateStatusWindow", "setting up game...");
    cc.systemEvent.emit("UpdateStatusWindow", "waiting for AI Setup...");
    cc.systemEvent.emit("UpdateStatusWindow", "starting game...");
    setTimeout(function () {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinedRoom = true;
      cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay"); //function in ui manager
    }, 1000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxVSU1hbmFnZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHdlZW5SZWYiLCJUb3RhbFJvb20iLCJQcm9maWxlVUkiLCJjYyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJOYW1lTGFiZWwiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJMYWJlbCIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJFbWFpbEFkZHJlc3NMYWJlbCIsIkRPQkxhYmVsIiwiR3JhZGVMZXZlbExhYmVsIiwiVGVhY2hlck5hbWVMYWJlbCIsIkdhbWVzV29uTGFiZWwiLCJGQlBhZ2VMYWJlbCIsIlRlc3RUYWtlbkxhYmVsIiwiVGVzdGluZ0F2Z0xhYmVsIiwiQ2FzaExhYmVsIiwiU3RhdHVzTm9kZSIsIk5vZGUiLCJQbGF5QnV0dG9uTm9kZSIsIlN0YXR1c0xhYmVsIiwiUGxheWVyQ291bnRJbnB1dCIsIkVkaXRCb3giLCJTcGVjdGF0ZVVJIiwiUm9vbVNjcmVlbk5vZGUiLCJTY3JvbGxCYXJDb250ZW50IiwiUHJvZmlsZVNjcmVlbk5vZGUiLCJSb29tUHJlZmFiIiwiUHJlZmFiIiwiVUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiVUlQcm9maWxlIiwiU2NyZWVuTm9kZXMiLCJUd2Vlbk1hbmFnZXJSZWYiLCJMb2dvIiwiVG9hc3ROb2RlIiwiTG9hZGluZ05vZGUiLCJSZWZlcmVuY2VNYW5hZ2VyUmVmIiwiTW9kZVNlbGVjdGlvblNjcmVlbiIsIlVJU3BlY3RhdGUiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJvbkVuYWJsZSIsInN5c3RlbUV2ZW50Iiwib24iLCJBc3NpZ25Qcm9maWxlRGF0YSIsIlVwZGF0ZVN0YXR1c1dpbmRvdyIsIkNoYW5nZVBhbmVsU2NyZWVuIiwib25EaXNhYmxlIiwib2ZmIiwib25Mb2FkIiwiZ2V0Q29tcG9uZW50IiwiRW1haWxUZXh0IiwiUGFzc3dvcmRUZXh0Iiwibm9kZUNvdW50ZXIiLCJTdGF0dXNUZXh0IiwiVG90YWxQbGF5ZXJzIiwiUmVzZXRQbGF5ZXJDb3VudElucHV0IiwiR2V0VHdlZW5NYW5hZ2VyUmVmZXJlbmNlIiwiU2xpZGVJbkxvZ2luQ29tcG9uZW50cyIsIlJlcGVhdExvZ29BbmltYXRpb24iLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwiaXNOZXh0IiwiY2hhbmdlU2NyZWVuIiwic2NlbmVOYW1lIiwiRmFkZU5vZGVJbk91dCIsImxlbmd0aCIsInNldFRpbWVvdXQiLCJNYW5pcHVsYXRlTm9kZXMiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsImNvdW50ZXIiLCJpbmRleCIsImFjdGl2ZSIsImNvbnNvbGUiLCJsb2ciLCJMb2dpblNjcmVlblR3ZWVuIiwiY2hpbGRyZW4iLCJSZXBlYXRUd2VlblNjYWxlIiwic3RyaW5nIiwiT25wbGF5ZXJOdW1iZXJDaGFuZ2VkIiwiX251bWJlciIsIlBsYXlHYW1lIiwiVG9nZ2xlTW9kZVNlbGVjdGlvbiIsIkJhY2tTZWxlY3Rpb25Nb2RlIiwiX3N0YXRlIiwiVmVyc2VzUGxheWVyTW9kZSIsIlNob3dUb2FzdCIsIl9wbGF5ZXJzIiwicGFyc2VJbnQiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlU2hvd1Jvb21fQm9vbCIsIk1heFBsYXllcnMiLCJnZXRQaG90b25SZWYiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5IiwiZW1pdCIsIkpvaW5SYW5kb21Sb29tIiwiUmVxdWVzdENvbm5lY3Rpb24iLCJWZXJzZXNBSU1vZGUiLCJKb2luZWRSb29tIiwibXNnIiwiRXhpdENvbm5lY3RpbmciLCJEaXNjb25uZWN0UGhvdG9uIiwiVG9nZ2xlTG9hZGluZ05vZGUiLCJzdGF0ZSIsIkxvZ2luVXNlciIsImFuaW0iLCJBbmltYXRpb24iLCJwbGF5IiwiR2V0X1NlcnZlckJhY2tlbmQiLCJTZXRFbWFpbFRleHQiLCJ0ZXh0IiwiU2V0UGFzc3dvcmRUZXh0IiwiUmVzcG9uc2VUeXBlIiwiU3R1ZGVudERhdGEiLCJlbWFpbEFkZHJlc3MiLCJkT0IiLCJncmFkZUxldmVsIiwidGVhY2hlck5hbWUiLCJnYW1lc1dvbiIsImZhY2Vib29rUGFnZSIsInRlc3RzVGFrZW4iLCJ0ZXN0aW5nQXZlcmFnZSIsImdhbWVDYXNoIiwiVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJIiwiVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJIiwiU2hvd0F2YWlsYWJsZVJvb21zX1NwZWN0YXRlVUkiLCJVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSSIsIl9uYW1lIiwibm9kZSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiU2V0Um9vbU5hbWUiLCJTZXRQbGF5ZXJDb3VudCIsInB1c2giLCJSZXNldFJvb21MaXN0IiwiZGVzdHJveSIsIkV4aXRfU3BlY3RhdGVVSSIsIl90aW1lIiwiU2VsZlRvYXN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsUUFBSjtBQUNBLElBQUlDLFNBQVMsR0FBQyxFQUFkLEVBQ0E7O0FBQ0EsSUFBSUMsU0FBUyxHQUFDQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNuQkMsRUFBQUEsSUFBSSxFQUFDLFdBRGM7QUFFbkJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUEMsTUFBQUEsV0FBVyxFQUFDLE1BREw7QUFFUCxpQkFBUyxJQUZGO0FBR1BDLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTyxLQUhGO0FBSVBDLE1BQUFBLFlBQVksRUFBRSxJQUpQO0FBS1BDLE1BQUFBLE9BQU8sRUFBRTtBQUxGLEtBREg7QUFPUEMsSUFBQUEsaUJBQWlCLEVBQUU7QUFDaEJMLE1BQUFBLFdBQVcsRUFBQyxjQURJO0FBRWhCLGlCQUFTLElBRk87QUFHaEJDLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTyxLQUhPO0FBSWhCQyxNQUFBQSxZQUFZLEVBQUUsSUFK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TCxDQUFpQyxLQUFqQztBQUNBLFNBQUt2QixjQUFMO0FBQ0gsR0FwWGtCO0FBcVhuQjtBQUVBZixFQUFBQSxTQUFTLEVBQUMsbUJBQVNjLEdBQVQsRUFBYXNDLEtBQWIsRUFDVjtBQUFBLFFBRHVCQSxLQUN2QjtBQUR1QkEsTUFBQUEsS0FDdkIsR0FENkIsSUFDN0I7QUFBQTs7QUFDSSxTQUFLekcsU0FBTCxDQUFldUMsTUFBZixHQUFzQixJQUF0QjtBQUNBLFNBQUt2QyxTQUFMLENBQWUyQyxRQUFmLENBQXdCLENBQXhCLEVBQTJCQSxRQUEzQixDQUFvQyxDQUFwQyxFQUF1QzNCLFlBQXZDLENBQW9EckQsRUFBRSxDQUFDTyxLQUF2RCxFQUE4RDJFLE1BQTlELEdBQXFFc0IsR0FBckU7QUFDQSxRQUFJdUMsU0FBUyxHQUFDLElBQWQ7QUFDQXpFLElBQUFBLFVBQVUsQ0FBQyxZQUFVO0FBQUd5RSxNQUFBQSxTQUFTLENBQUMxRyxTQUFWLENBQW9CdUMsTUFBcEIsR0FBMkIsS0FBM0I7QUFBbUMsS0FBakQsRUFBbURrRSxLQUFuRCxDQUFWO0FBQ0g7QUE3WGtCLENBQVQsQ0FBZDtBQWdZQUUsTUFBTSxDQUFDQyxPQUFQLEdBQWdCbEgsU0FBaEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUd2VlZW4gZnJvbSAnVHdlZW5NYW5hZ2VyJztcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgVHdlZW5SZWY7XHJcbnZhciBUb3RhbFJvb209W107XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQcm9maWxlVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlByb2ZpbGVVSVwiLFxyXG4gICAgcHJvcGVydGllczogeyAgIFxyXG4gICAgICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIk5hbWVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgRW1haWxBZGRyZXNzTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFbWFpbEFkZHJlc3NcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGVtYWlsIGFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZSBcIiwgfSxcclxuICAgICAgICAgRE9CTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJET0JcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gRE9CIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBHcmFkZUxldmVsTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJHcmFkZUxldmVsXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIEdyYWRlIExldmVsIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBUZWFjaGVyTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVGVhY2hlck5hbWVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gVGVhY2hlciBOYW1lIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBHYW1lc1dvbkxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiR2FtZXNXb25cIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gZ2FtZXMgd29uIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBGQlBhZ2VMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkZCUGFnZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBmYWNlYm9vayBwYWdlIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBUZXN0VGFrZW5MYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRlc3RUYWtlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byB0ZXN0IHRha2VuIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBUZXN0aW5nQXZnTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUZXN0aW5nQXZlcmFnZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBUZXN0aW5nIEF2ZXJhZ2UgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBjYXNoIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgIFN0YXR1c05vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTdGF0dXNTY3JlZW5cIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTdGF0dXMgU2NyZWVuIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgIFBsYXlCdXR0b25Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheUJ1dHRvblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIHBsYXkgYnV0dG9uIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgIFN0YXR1c0xhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU3RhdHVzVGV4dFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTdGF0dXMgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgUGxheWVyQ291bnRJbnB1dDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllckNvdW50SW5wdXRcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBQbGF5ZXJDb3VudElucHV0IG9mIHByb2ZpbGVcIix9LFxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3BlY3RhdGVVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3BlY3RhdGVVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiU3BlY3RhdGVVSVwiLFxyXG4gICAgcHJvcGVydGllczogeyAgIFxyXG4gICAgICAgIFJvb21TY3JlZW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUm9vbVNjcmVlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBub2RlIG9mIHJvb20gc2NyZWVuXCIsfSxcclxuICAgICAgICBTY3JvbGxCYXJDb250ZW50OiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU2Nyb2xsQmFyQ29udGVudFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBub2RlIG9mIFNjcm9sbEJhckNvbnRlbnQgb2Ygcm9vbSBzY3JlZW5cIix9LFxyXG4gICAgICAgIFByb2ZpbGVTY3JlZW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUHJvZmlsZVNjcmVlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBub2RlIG9mIHByb2ZpbGUgc2NyZWVuXCIsfSxcclxuICAgICAgICBSb29tUHJlZmFiOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUm9vbVByZWZhYlwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBSb29tIG9uIHJvb20gc2NyZWVuXCIsfSxcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFVJTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVUlNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJVSU1hbmFnZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7IFxyXG4gICAgICAgIFVJUHJvZmlsZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlVJUHJvZmlsZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBQcm9maWxlVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIix9LCAgXHJcbiAgICAgICAgU2NyZWVuTm9kZXM6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTY3JlZW5Ob2Rlc1wiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGxvZ2luIHNjcmVlbiBub2RlXCIsfSxcclxuICAgICAgICAgVHdlZW5NYW5hZ2VyUmVmOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVHdlZW5NYW5hZ2VyUmVmXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIFR3ZWVuIE1hbmFnZXIgU2NyaXB0IFwiLCB9LFxyXG4gICAgICAgICBMb2dvOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9nb05vZGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIGxvZ28gbm9kZVwiLH0sXHJcbiAgICAgICAgIFRvYXN0Tm9kZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvYXN0Tm9kZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgdG9hc3Qgbm9kZVwiLH0sXHJcbiAgICAgICAgIExvYWRpbmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hZGluZ05vZGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIExvYWRpbmcgTm9kZVwiLH0sICAgXHJcbiAgICAgICAgUmVmZXJlbmNlTWFuYWdlclJlZjoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlJlZmVyZW5jZU1hbmFnZXJSZWZcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIHJlZmVyZW5jZSBtYW5hZ2VyIG5vZGVcIix9LCAgXHJcbiAgICAgICAgTW9kZVNlbGVjdGlvblNjcmVlbjoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIk1vZGVTZWxlY3Rpb25TY3JlZW5cIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBtb2RlIHNlbGVjdGlvbiBzY3JlZW4gbm9kZVwiLH0sICAgXHJcbiAgICAgICAgVUlTcGVjdGF0ZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlVJU3BlY3RhdGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogU3BlY3RhdGVVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTcGVjdGF0ZVVJIGNsYXNzIGludGFuY2VcIix9LCAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7IC8vY3JlYXRpbmcgc3RhdGljIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xyXG4gICAgICAgIEluc3RhbmNlOiBudWxsLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vZXZlbnRzIHN1YnNjcmlwdGlvbiB0byBiZSBjYWxsZWQgXHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oJ0Fzc2lnblByb2ZpbGVEYXRhJywgdGhpcy5Bc3NpZ25Qcm9maWxlRGF0YSwgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oJ1VwZGF0ZVN0YXR1c1dpbmRvdycsIHRoaXMuVXBkYXRlU3RhdHVzV2luZG93LCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbignQ2hhbmdlUGFuZWxTY3JlZW4nLCB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuLCB0aGlzKTtcclxuICAgICAgfSxcclxuICAgIFxyXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKCdBc3NpZ25Qcm9maWxlRGF0YScsIHRoaXMuQXNzaWduUHJvZmlsZURhdGEsIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZignVXBkYXRlU3RhdHVzV2luZG93JywgdGhpcy5VcGRhdGVTdGF0dXNXaW5kb3csIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZignQ2hhbmdlUGFuZWxTY3JlZW4nLCB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuLCB0aGlzKTtcclxuICAgICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuUmVmZXJlbmNlTWFuYWdlclJlZj10aGlzLlJlZmVyZW5jZU1hbmFnZXJSZWYuZ2V0Q29tcG9uZW50KFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG5cclxuICAgICAgICBVSU1hbmFnZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICBUb3RhbFJvb209W107XHJcbiAgICAgICAgLy9Qcml2YXRlIFZhcmlhYmxlc1xyXG4gICAgICAgIHRoaXMuRW1haWxUZXh0PVwiXCI7XHJcbiAgICAgICAgdGhpcy5QYXNzd29yZFRleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLm5vZGVDb3VudGVyPTA7XHJcbiAgICAgICAgdGhpcy5TdGF0dXNUZXh0PVwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub3RhbFBsYXllcnM9XCJcIjtcclxuICAgICAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG5cclxuICAgICAgICB0aGlzLkdldFR3ZWVuTWFuYWdlclJlZmVyZW5jZSgpO1xyXG4gICAgICAgIHRoaXMuU2xpZGVJbkxvZ2luQ29tcG9uZW50cygpO1xyXG4gICAgICAgIHRoaXMuUmVwZWF0TG9nb0FuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICBDaGFuZ2VQYW5lbFNjcmVlbjogZnVuY3Rpb24gKGlzTmV4dCxjaGFuZ2VTY3JlZW4sc2NlbmVOYW1lKSB7XHJcbiAgICAgICAgVHdlZW5SZWYuRmFkZU5vZGVJbk91dCh0aGlzLlNjcmVlbk5vZGVzW3RoaXMubm9kZUNvdW50ZXJdLDAuNTUsMjU1LDAsXCJxdWFkSW5PdXRcIik7XHJcblxyXG4gICAgaWYoY2hhbmdlU2NyZWVuPT1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihpc05leHQ9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGVDb3VudGVyPHRoaXMuU2NyZWVuTm9kZXMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlQ291bnRlcj10aGlzLm5vZGVDb3VudGVyKzE7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZUNvdW50ZXI+MClcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZUNvdW50ZXI9dGhpcy5ub2RlQ291bnRlci0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHt0aGlzLk1hbmlwdWxhdGVOb2Rlcyh0aGlzLm5vZGVDb3VudGVyKTt9LCA2MDApO1xyXG4gICAgfWVsc2VcclxuICAgIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtjYy5kaXJlY3Rvci5sb2FkU2NlbmUoc2NlbmVOYW1lKTt9LCA2MDApO1xyXG4gICAgfX0sXHJcblxyXG4gICAgTWFuaXB1bGF0ZU5vZGVzOiBmdW5jdGlvbiAoY291bnRlcikge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlNjcmVlbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihjb3VudGVyPT1pbmRleClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TY3JlZW5Ob2Rlc1tpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNldGluZyBpdCB0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgVHdlZW5SZWYuRmFkZU5vZGVJbk91dCh0aGlzLlNjcmVlbk5vZGVzW2luZGV4XSwxLjUsMCwyNTUsXCJxdWFkSW5PdXRcIik7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TY3JlZW5Ob2Rlc1tpbmRleF0uYWN0aXZlPWZhbHNlOyBcclxuICAgICAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2xpZGVJbkxvZ2luQ29tcG9uZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFR3ZWVuUmVmLkxvZ2luU2NyZWVuVHdlZW4odGhpcy5TY3JlZW5Ob2Rlc1t0aGlzLm5vZGVDb3VudGVyXS5jaGlsZHJlblsxXSwtMTAwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlcGVhdExvZ29BbmltYXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBUd2VlblJlZi5SZXBlYXRUd2VlblNjYWxlKHRoaXMuTG9nbywxLjEsMSwwLjgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZXRUd2Vlbk1hbmFnZXJSZWZlcmVuY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBUd2VlblJlZj10aGlzLlR3ZWVuTWFuYWdlclJlZi5nZXRDb21wb25lbnQoXCJUd2Vlbk1hbmFnZXJcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlc2V0UGxheWVyQ291bnRJbnB1dCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuUGxheWVyQ291bnRJbnB1dC5zdHJpbmc9XCJcIjtcclxuICAgICAgICB0aGlzLlRvdGFsUGxheWVycz1cIlwiO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbnBsYXllck51bWJlckNoYW5nZWQoX251bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvdGFsUGxheWVycz1fbnVtYmVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBQbGF5R2FtZTpmdW5jdGlvbigpXHJcbiAgICB7ICBcclxuICAgICAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlTW9kZVNlbGVjdGlvbih0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgQmFja1NlbGVjdGlvbk1vZGU6ZnVuY3Rpb24oKVxyXG4gICAgeyAgXHJcbiAgICAgICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZU1vZGVTZWxlY3Rpb24oZmFsc2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVNb2RlU2VsZWN0aW9uKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLk1vZGVTZWxlY3Rpb25TY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVmVyc2VzUGxheWVyTW9kZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5Ub3RhbFBsYXllcnM9PVwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBlbnRlciBwbGF5ZXIgYW1vdW50IGZvciBtdWx0aXBsYXllciBmcm9tIDItNiwgbWFrZSBzdXJlIHRvIGhhdmUgc2FtZSBhbW91bnQgb24gZGlmZmVyZW50IGNvbm5lY3RpbmcgZGV2aWNlcyBpZiB5b3Ugd2FudCB0byBjb25uZWN0IHRoZW0uXCIsMzUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVycz1wYXJzZUludCh0aGlzLlRvdGFsUGxheWVycyk7XHJcbiAgICAgICAgICAgIGlmKF9wbGF5ZXJzPj0yICYmIF9wbGF5ZXJzPD02KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZU1vZGVTZWxlY3Rpb24oMik7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZVNob3dSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5VSVByb2ZpbGUuUGxheUJ1dHRvbk5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTGFiZWwuc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM9X3BsYXllcnM7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNDb25uZWN0ZWRUb01hc3RlcigpIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNJbkxvYmJ5KCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwid2FpdGluZyBmb3Igb3RoZXIgcGxheWVycy4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkpvaW5SYW5kb21Sb29tKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXF1ZXN0Q29ubmVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIGVudGVyIHBsYXllciBhbW91bnQgZm9yIG11bHRpcGxheWVyIGZyb20gMi02LCBtYWtlIHN1cmUgdG8gaGF2ZSBzYW1lIGFtb3VudCBvbiBkaWZmZXJlbnQgY29ubmVjdGluZyBkZXZpY2VzIGlmIHlvdSB3YW50IHRvIGNvbm5lY3QgdGhlbS5cIiwzNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVmVyc2VzQUlNb2RlKClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZU1vZGVTZWxlY3Rpb24oMSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVTaG93Um9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz0yO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcInNldHRpbmcgdXAgZ2FtZS4uLlwiKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJ3YWl0aW5nIGZvciBBSSBTZXR1cC4uLlwiKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luZWRSb29tPXRydWU7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLHRydWUsdHJ1ZSxcIkdhbWVQbGF5XCIpOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlU3RhdHVzV2luZG93OmZ1bmN0aW9uKG1zZylcclxuICAgIHsgIFxyXG4gICAgICAgIHRoaXMuU3RhdHVzVGV4dD10aGlzLlN0YXR1c1RleHQrbXNnK1wiXFxuXCI7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTGFiZWwuc3RyaW5nPXRoaXMuU3RhdHVzVGV4dDtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdENvbm5lY3Rpbmc6ZnVuY3Rpb24oKVxyXG4gICAgeyAgXHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuUGxheUJ1dHRvbk5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTGFiZWwuc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgdGhpcy5FbWFpbFRleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlBhc3N3b3JkVGV4dD1cIlwiO1xyXG4gICAgICAgIHRoaXMuU3RhdHVzVGV4dD1cIlwiO1xyXG4gICAgICAgIHRoaXMuVG90YWxQbGF5ZXJzPVwiXCI7XHJcbiAgICAgICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlTG9hZGluZ05vZGUoc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Mb2FkaW5nTm9kZS5hY3RpdmU9c3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIExvZ2luVXNlcjpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5FbWFpbFRleHQhPVwiXCIgJiYgdGhpcy5QYXNzd29yZFRleHQhPVwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICB2YXIgYW5pbSA9IHRoaXMuTG9hZGluZ05vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgIGFuaW0ucGxheSgnbG9hZGluZycpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5Mb2dpblVzZXIodGhpcy5FbWFpbFRleHQsdGhpcy5QYXNzd29yZFRleHQsXCJTdHVkZW50XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJFbWFpbCBvciBwYXNzd29yZCBpbnZhbGlkIG9yIGVtcHR5LlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNldEVtYWlsVGV4dDpmdW5jdGlvbih0ZXh0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuRW1haWxUZXh0PXRleHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldFBhc3N3b3JkVGV4dDpmdW5jdGlvbih0ZXh0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGFzc3dvcmRUZXh0PXRleHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnblByb2ZpbGVEYXRhOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpPT0xKSAvL21lYW5zIHN1Y2Nlc3NmdWxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlUGFuZWxTY3JlZW4odHJ1ZSxmYWxzZSxcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuTmFtZUxhYmVsLnN0cmluZz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmc9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5ET0JMYWJlbC5zdHJpbmc9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZE9CO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5HcmFkZUxldmVsTGFiZWwuc3RyaW5nPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdyYWRlTGV2ZWw7XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlRlYWNoZXJOYW1lTGFiZWwuc3RyaW5nPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnRlYWNoZXJOYW1lO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5HYW1lc1dvbkxhYmVsLnN0cmluZz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbjtcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuRkJQYWdlTGFiZWwuc3RyaW5nPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmZhY2Vib29rUGFnZTtcclxuICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuVGVzdFRha2VuTGFiZWwuc3RyaW5nPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnRlc3RzVGFrZW47XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlRlc3RpbmdBdmdMYWJlbC5zdHJpbmc9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLkNhc2hMYWJlbC5zdHJpbmc9XCIkIFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09MikgLy91c2VyIG5vdCBmb3VuZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwibm8gdXNlciByZWdpc3RlcmVkIHdpdGggZW50ZXJlZCBlbWFpbC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09MykgLy9wYXNzL2VtYWlsIGludmFsaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInVzZXIgZW1haWwgb3IgcGFzc3dvcmQgaXMgd3JvbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09NCkgLy9zb21ldGhpbmcgd2VudCB3cm9uZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29tZXRoaW5nIHdlbnQgd3JvbmcgcGxlYXNlIHRyeSBhZ2Fpbi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNyZWdpb24gU3BlY3RhdGUgVWkgV29ya1xyXG4gICAgVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBpZihfc3RhdGUpXHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVJU3BlY3RhdGUuUm9vbVNjcmVlbk5vZGUuYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJU3BlY3RhdGUuUHJvZmlsZVNjcmVlbk5vZGUuYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgU2hvd0F2YWlsYWJsZVJvb21zX1NwZWN0YXRlVUkoKVxyXG4gICAge1xyXG4gICAgIFxyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNDb25uZWN0ZWRUb01hc3RlcigpIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNJbkxvYmJ5KCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVTaG93Um9vbV9Cb29sKHRydWUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlcXVlc3RDb25uZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShfbmFtZSxfcGxheWVycylcclxuICAgIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuVUlTcGVjdGF0ZS5Sb29tUHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuVUlTcGVjdGF0ZS5TY3JvbGxCYXJDb250ZW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdSb29tTGlzdEhhbmRsZXInKS5TZXRSb29tTmFtZShfbmFtZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ1Jvb21MaXN0SGFuZGxlcicpLlNldFBsYXllckNvdW50KF9wbGF5ZXJzKTtcclxuICAgICAgICBUb3RhbFJvb20ucHVzaChub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRSb29tTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFRvdGFsUm9vbS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgVG90YWxSb29tW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUb3RhbFJvb209W107XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRfU3BlY3RhdGVVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuRXhpdENvbm5lY3RpbmcoKTtcclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICBTaG93VG9hc3Q6ZnVuY3Rpb24obXNnLF90aW1lPTIwMDApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2FzdE5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5Ub2FzdE5vZGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bXNnO1xyXG4gICAgICAgIHZhciBTZWxmVG9hc3Q9dGhpcztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ICBTZWxmVG9hc3QuVG9hc3ROb2RlLmFjdGl2ZT1mYWxzZTsgfSwgX3RpbWUpO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cz0gVUlNYW5hZ2VyO1xyXG4iXX0=