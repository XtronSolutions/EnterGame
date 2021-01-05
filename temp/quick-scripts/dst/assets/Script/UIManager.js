
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
var TotalRoom = [];
var Roles = ["Student", "Teacher", "ProgramAmbassador", "SchoolAdmin", "ProgramDirector"]; //-------------------------------------------class for Profile UI-------------------------//

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
    },
    DistrictLabel: {
      displayName: "DistrictLabel",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to DistrictLabel of profile"
    },
    PlayGameButton: {
      displayName: "PlayGameButton",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to PlayGameButton of profile"
    },
    SpectateButton: {
      displayName: "SpectateButton",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to SpectateButton of profile"
    },
    CashNode: {
      displayName: "CashNode",
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to CashNode of profile"
    }
  }
}); //-------------------------------------------class for teacher Profile UI-------------------------//

var TeacherProfileUI = cc.Class({
  name: "TeacherProfileUI",
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
    ClassTaught: {
      displayName: "ClassTaught",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to ClassTaught label of profile"
    },
    SchoolNameLabel: {
      displayName: "SchoolName",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to SchoolName label of profile"
    },
    ContactLabel: {
      displayName: "Contact",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Contact label of profile"
    }
  }
}); //-------------------------------------------class for Mentor Profile UI-------------------------//

var MentorProfileUI = cc.Class({
  name: "MentorProfileUI",
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
    Addresslabel: {
      displayName: "Address",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Address label of profile"
    },
    ContactLabel: {
      displayName: "Contact",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Contact label of profile"
    }
  }
}); //-------------------------------------------class for Admin Profile UI-------------------------//

var AdminProfileUI = cc.Class({
  name: "AdminProfileUI",
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
    SchoolNameLabel: {
      displayName: "SchoolName",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to SchoolName label of profile"
    },
    ContactLabel: {
      displayName: "Contact",
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Contact label of profile"
    }
  }
}); //-------------------------------------------class for director Profile UI-------------------------//

var DirectorProfileUI = cc.Class({
  name: "DirectorProfileUI",
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
    TeacherUIProfile: {
      displayName: "TeacherUIProfile",
      "default": null,
      type: TeacherProfileUI,
      serializable: true,
      tooltip: "reference to TeacherProfileUI class intance"
    },
    MentorUIProfile: {
      displayName: "MentorUIProfile",
      "default": null,
      type: MentorProfileUI,
      serializable: true,
      tooltip: "reference to MentorProfileUI class intance"
    },
    AdminUIProfile: {
      displayName: "AdminUIProfile",
      "default": null,
      type: AdminProfileUI,
      serializable: true,
      tooltip: "reference to AdminProfileUI class intance"
    },
    DirectorUIProfile: {
      displayName: "DirectorUIProfile",
      "default": null,
      type: DirectorProfileUI,
      serializable: true,
      tooltip: "reference to DirectorProfileUI class intance"
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
    },
    UIContainer: {
      displayName: "UIContainer",
      "default": [],
      type: [cc.Node],
      serializable: true,
      tooltip: "reference to UIContainer nodes"
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
    this.SelectedRole = Roles[0];
    this.SelectedRoleIndex = 0;
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
  TogglePlayButton: function TogglePlayButton(_state) {
    this.UIProfile.PlayGameButton.active = _state;
  },
  ToggleSpectateButton: function ToggleSpectateButton(_state) {
    this.UIProfile.SpectateButton.active = _state;
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
      GamePlayReferenceManager.Instance.Get_ServerBackend().LoginUser(this.EmailText, this.PasswordText, this.SelectedRole);
    } else {
      this.ToggleLoadingNode(false);
      this.ShowToast("Email or password invalid or empty.");
    }
  },
  OnRoleToggled: function OnRoleToggled(_val) {
    //console.log(_val);
    console.log(_val.node.name.split("_")[1]);
    this.SelectedRoleIndex = _val.node.name.split("_")[1];
    this.SelectedRole = Roles[this.SelectedRoleIndex];
  },
  SetEmailText: function SetEmailText(text) {
    this.EmailText = text;
  },
  SetPasswordText: function SetPasswordText(text) {
    this.PasswordText = text;
  },
  ToggleUIContainer: function ToggleUIContainer() {
    for (var index = 0; index < this.UIContainer.length; index++) {
      if (this.SelectedRoleIndex == index) this.UIContainer[index].active = true;else this.UIContainer[index].active = false;
    }
  },
  AssignProfileData: function AssignProfileData(_isStudent, _isTeacher, _isMentor, _isAdmin, _isDirector) {
    if (_isStudent === void 0) {
      _isStudent = false;
    }

    if (_isTeacher === void 0) {
      _isTeacher = false;
    }

    if (_isMentor === void 0) {
      _isMentor = false;
    }

    if (_isAdmin === void 0) {
      _isAdmin = false;
    }

    if (_isDirector === void 0) {
      _isDirector = false;
    }

    if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 1) //means successful
      {
        this.ChangePanelScreen(true, false, "");
        this.ToggleUIContainer();

        if (_isStudent) {
          this.TogglePlayButton(true);
          this.ToggleSpectateButton(false);
          this.UIProfile.CashNode.active = true;
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
        } else if (_isTeacher) {
          this.TogglePlayButton(false);
          this.ToggleSpectateButton(true);
          this.UIProfile.CashNode.active = false;
          console.log(GamePlayReferenceManager.Instance.Get_ServerBackend().TeacherData);
          this.TeacherUIProfile.NameLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().TeacherData.name;
          this.TeacherUIProfile.EmailAddressLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().TeacherData.emailAddress;
          this.TeacherUIProfile.ClassTaught.string = GamePlayReferenceManager.Instance.Get_ServerBackend().TeacherData.classTaught;
          this.TeacherUIProfile.SchoolNameLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().TeacherData.school;
          this.TeacherUIProfile.ContactLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().TeacherData.contactNumber;
          this.ToggleLoadingNode(false);
        } else if (_isMentor) {
          this.TogglePlayButton(false);
          this.ToggleSpectateButton(true);
          this.UIProfile.CashNode.active = false;
          console.log(GamePlayReferenceManager.Instance.Get_ServerBackend().MentorData);
          this.MentorUIProfile.NameLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().MentorData.name;
          this.MentorUIProfile.EmailAddressLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().MentorData.emailAddress;
          this.MentorUIProfile.Addresslabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().MentorData.address;
          this.MentorUIProfile.ContactLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().MentorData.contactNumber;
          this.ToggleLoadingNode(false);
        } else if (_isAdmin) {
          this.TogglePlayButton(false);
          this.ToggleSpectateButton(true);
          this.UIProfile.CashNode.active = false;
          console.log(GamePlayReferenceManager.Instance.Get_ServerBackend().AdminData);
          this.AdminUIProfile.NameLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().AdminData.name;
          this.AdminUIProfile.EmailAddressLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().AdminData.emailAddress;
          this.AdminUIProfile.SchoolNameLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().AdminData.schoolName;
          this.AdminUIProfile.ContactLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().AdminData.contactNumber;
          this.ToggleLoadingNode(false);
        } else if (_isDirector) {
          this.TogglePlayButton(false);
          this.ToggleSpectateButton(true);
          this.UIProfile.CashNode.active = false;
          console.log(GamePlayReferenceManager.Instance.Get_ServerBackend().DirectorData);
          this.DirectorUIProfile.NameLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().DirectorData.name;
          this.DirectorUIProfile.EmailAddressLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().DirectorData.emailAddress;
          this.ToggleLoadingNode(false);
        }
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
    this.ToastNode.children[1].children[1].getComponent(cc.Label).string = msg;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxVSU1hbmFnZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHdlZW5SZWYiLCJUb3RhbFJvb20iLCJSb2xlcyIsIlByb2ZpbGVVSSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWVMYWJlbCIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkVtYWlsQWRkcmVzc0xhYmVsIiwiRE9CTGFiZWwiLCJHcmFkZUxldmVsTGFiZWwiLCJUZWFjaGVyTmFtZUxhYmVsIiwiR2FtZXNXb25MYWJlbCIsIkZCUGFnZUxhYmVsIiwiVGVzdFRha2VuTGFiZWwiLCJUZXN0aW5nQXZnTGFiZWwiLCJDYXNoTGFiZWwiLCJTdGF0dXNOb2RlIiwiTm9kZSIsIlBsYXlCdXR0b25Ob2RlIiwiU3RhdHVzTGFiZWwiLCJQbGF5ZXJDb3VudElucHV0IiwiRWRpdEJveCIsIkRpc3RyaWN0TGFiZWwiLCJQbGF5R2FtZUJ1dHRvbiIsIlNwZWN0YXRlQnV0dG9uIiwiQ2FzaE5vZGUiLCJUZWFjaGVyUHJvZmlsZVVJIiwiQ2xhc3NUYXVnaHQiLCJTY2hvb2xOYW1lTGFiZWwiLCJDb250YWN0TGFiZWwiLCJNZW50b3JQcm9maWxlVUkiLCJBZGRyZXNzbGFiZWwiLCJBZG1pblByb2ZpbGVVSSIsIkRpcmVjdG9yUHJvZmlsZVVJIiwiU3BlY3RhdGVVSSIsIlJvb21TY3JlZW5Ob2RlIiwiU2Nyb2xsQmFyQ29udGVudCIsIlByb2ZpbGVTY3JlZW5Ob2RlIiwiUm9vbVByZWZhYiIsIlByZWZhYiIsIlVJTWFuYWdlciIsIkNvbXBvbmVudCIsIlVJUHJvZmlsZSIsIlRlYWNoZXJVSVByb2ZpbGUiLCJNZW50b3JVSVByb2ZpbGUiLCJBZG1pblVJUHJvZmlsZSIsIkRpcmVjdG9yVUlQcm9maWxlIiwiU2NyZWVuTm9kZXMiLCJUd2Vlbk1hbmFnZXJSZWYiLCJMb2dvIiwiVG9hc3ROb2RlIiwiTG9hZGluZ05vZGUiLCJSZWZlcmVuY2VNYW5hZ2VyUmVmIiwiTW9kZVNlbGVjdGlvblNjcmVlbiIsIlVJU3BlY3RhdGUiLCJVSUNvbnRhaW5lciIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIkFzc2lnblByb2ZpbGVEYXRhIiwiVXBkYXRlU3RhdHVzV2luZG93IiwiQ2hhbmdlUGFuZWxTY3JlZW4iLCJvbkRpc2FibGUiLCJvZmYiLCJvbkxvYWQiLCJnZXRDb21wb25lbnQiLCJTZWxlY3RlZFJvbGUiLCJTZWxlY3RlZFJvbGVJbmRleCIsIkVtYWlsVGV4dCIsIlBhc3N3b3JkVGV4dCIsIm5vZGVDb3VudGVyIiwiU3RhdHVzVGV4dCIsIlRvdGFsUGxheWVycyIsIlJlc2V0UGxheWVyQ291bnRJbnB1dCIsIkdldFR3ZWVuTWFuYWdlclJlZmVyZW5jZSIsIlNsaWRlSW5Mb2dpbkNvbXBvbmVudHMiLCJSZXBlYXRMb2dvQW5pbWF0aW9uIiwiQ2hlY2tSZWZlcmVuY2VzIiwiVG9nZ2xlUGxheUJ1dHRvbiIsIl9zdGF0ZSIsImFjdGl2ZSIsIlRvZ2dsZVNwZWN0YXRlQnV0dG9uIiwicmVxdWlyZSIsImlzTmV4dCIsImNoYW5nZVNjcmVlbiIsInNjZW5lTmFtZSIsIkZhZGVOb2RlSW5PdXQiLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiTWFuaXB1bGF0ZU5vZGVzIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJjb3VudGVyIiwiaW5kZXgiLCJjb25zb2xlIiwibG9nIiwiTG9naW5TY3JlZW5Ud2VlbiIsImNoaWxkcmVuIiwiUmVwZWF0VHdlZW5TY2FsZSIsInN0cmluZyIsIk9ucGxheWVyTnVtYmVyQ2hhbmdlZCIsIl9udW1iZXIiLCJQbGF5R2FtZSIsIlRvZ2dsZU1vZGVTZWxlY3Rpb24iLCJCYWNrU2VsZWN0aW9uTW9kZSIsIlZlcnNlc1BsYXllck1vZGUiLCJTaG93VG9hc3QiLCJfcGxheWVycyIsInBhcnNlSW50IiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZVNob3dSb29tX0Jvb2wiLCJNYXhQbGF5ZXJzIiwiZ2V0UGhvdG9uUmVmIiwiaXNDb25uZWN0ZWRUb01hc3RlciIsImlzSW5Mb2JieSIsImVtaXQiLCJKb2luUmFuZG9tUm9vbSIsIlJlcXVlc3RDb25uZWN0aW9uIiwiVmVyc2VzQUlNb2RlIiwiSm9pbmVkUm9vbSIsIm1zZyIsIkV4aXRDb25uZWN0aW5nIiwiRGlzY29ubmVjdFBob3RvbiIsIlRvZ2dsZUxvYWRpbmdOb2RlIiwic3RhdGUiLCJMb2dpblVzZXIiLCJhbmltIiwiQW5pbWF0aW9uIiwicGxheSIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiT25Sb2xlVG9nZ2xlZCIsIl92YWwiLCJub2RlIiwic3BsaXQiLCJTZXRFbWFpbFRleHQiLCJ0ZXh0IiwiU2V0UGFzc3dvcmRUZXh0IiwiVG9nZ2xlVUlDb250YWluZXIiLCJfaXNTdHVkZW50IiwiX2lzVGVhY2hlciIsIl9pc01lbnRvciIsIl9pc0FkbWluIiwiX2lzRGlyZWN0b3IiLCJSZXNwb25zZVR5cGUiLCJTdHVkZW50RGF0YSIsImVtYWlsQWRkcmVzcyIsImRPQiIsImdyYWRlTGV2ZWwiLCJ0ZWFjaGVyTmFtZSIsImdhbWVzV29uIiwiZmFjZWJvb2tQYWdlIiwidGVzdHNUYWtlbiIsInRlc3RpbmdBdmVyYWdlIiwiZ2FtZUNhc2giLCJUZWFjaGVyRGF0YSIsImNsYXNzVGF1Z2h0Iiwic2Nob29sIiwiY29udGFjdE51bWJlciIsIk1lbnRvckRhdGEiLCJhZGRyZXNzIiwiQWRtaW5EYXRhIiwic2Nob29sTmFtZSIsIkRpcmVjdG9yRGF0YSIsIlRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSSIsIlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSSIsIlNob3dBdmFpbGFibGVSb29tc19TcGVjdGF0ZVVJIiwiVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkiLCJfbmFtZSIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiU2V0Um9vbU5hbWUiLCJTZXRQbGF5ZXJDb3VudCIsInB1c2giLCJSZXNldFJvb21MaXN0IiwiZGVzdHJveSIsIkV4aXRfU3BlY3RhdGVVSSIsIl90aW1lIiwiU2VsZlRvYXN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsUUFBSjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLEtBQUssR0FBQyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXNCLG1CQUF0QixFQUEwQyxhQUExQyxFQUF3RCxpQkFBeEQsQ0FBVixFQUNBOztBQUNBLElBQUlDLFNBQVMsR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDbkJDLEVBQUFBLElBQUksRUFBQyxXQURjO0FBRW5CQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1BDLE1BQUFBLFdBQVcsRUFBQyxNQURMO0FBRVAsaUJBQVMsSUFGRjtBQUdQQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FIRjtBQUlQQyxNQUFBQSxZQUFZLEVBQUUsSUFKUDtBQUtQQyxNQUFBQSxPQUFPLEVBQUU7QUFMRixLQURIO0FBT1BDLElBQUFBLGlCQUFpQixFQUFFO0FBQ2hCTCxNQUFBQSxXQUFXLEVBQUMsY0FESTtBQUVoQixpQkFBUyxJQUZPO0FBR2hCQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FITztBQUloQkMsTUFBQUEsWUFBWSxFQUFFLElBSkU7QUFLaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxPLEtBUFo7QUFhUEUsSUFBQUEsUUFBUSxFQUFFO0FBQ1BOLE1BQUFBLFdBQVcsRUFBQyxLQURMO0FBRVAsaUJBQVMsSUFGRjtBQUdQQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FIRjtBQUlQQyxNQUFBQSxZQUFZLEVBQUUsSUFKUDtBQUtQQyxNQUFBQSxPQUFPLEVBQUU7QUFMRixLQWJIO0FBbUJQRyxJQUFBQSxlQUFl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QU0sQ0FBQ0MsT0FBUCxHQUFnQjdJLFNBQWhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHdlZWVuIGZyb20gJ1R3ZWVuTWFuYWdlcic7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFR3ZWVuUmVmO1xyXG52YXIgVG90YWxSb29tID0gW107XHJcbnZhciBSb2xlcz1bXCJTdHVkZW50XCIsIFwiVGVhY2hlclwiLFwiUHJvZ3JhbUFtYmFzc2Fkb3JcIixcIlNjaG9vbEFkbWluXCIsXCJQcm9ncmFtRGlyZWN0b3JcIl07XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQcm9maWxlVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlByb2ZpbGVVSVwiLFxyXG4gICAgcHJvcGVydGllczogeyAgIFxyXG4gICAgICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIk5hbWVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgRW1haWxBZGRyZXNzTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFbWFpbEFkZHJlc3NcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGVtYWlsIGFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZSBcIiwgfSxcclxuICAgICAgICAgRE9CTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJET0JcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gRE9CIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBHcmFkZUxldmVsTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJHcmFkZUxldmVsXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIEdyYWRlIExldmVsIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBUZWFjaGVyTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVGVhY2hlck5hbWVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gVGVhY2hlciBOYW1lIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBHYW1lc1dvbkxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiR2FtZXNXb25cIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gZ2FtZXMgd29uIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBGQlBhZ2VMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkZCUGFnZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBmYWNlYm9vayBwYWdlIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBUZXN0VGFrZW5MYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRlc3RUYWtlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byB0ZXN0IHRha2VuIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBUZXN0aW5nQXZnTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUZXN0aW5nQXZlcmFnZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBUZXN0aW5nIEF2ZXJhZ2UgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBjYXNoIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgIFN0YXR1c05vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTdGF0dXNTY3JlZW5cIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTdGF0dXMgU2NyZWVuIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgIFBsYXlCdXR0b25Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheUJ1dHRvblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIHBsYXkgYnV0dG9uIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgIFN0YXR1c0xhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU3RhdHVzVGV4dFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTdGF0dXMgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgUGxheWVyQ291bnRJbnB1dDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllckNvdW50SW5wdXRcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBQbGF5ZXJDb3VudElucHV0IG9mIHByb2ZpbGVcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIERpc3RyaWN0TGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJEaXN0cmljdExhYmVsXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIERpc3RyaWN0TGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgUGxheUdhbWVCdXR0b246IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJQbGF5R2FtZUJ1dHRvblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFBsYXlHYW1lQnV0dG9uIG9mIHByb2ZpbGVcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFNwZWN0YXRlQnV0dG9uOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU3BlY3RhdGVCdXR0b25cIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTcGVjdGF0ZUJ1dHRvbiBvZiBwcm9maWxlXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBDYXNoTm9kZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkNhc2hOb2RlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQ2FzaE5vZGUgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIHRlYWNoZXIgUHJvZmlsZSBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVGVhY2hlclByb2ZpbGVVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiVGVhY2hlclByb2ZpbGVVSVwiLFxyXG4gICAgcHJvcGVydGllczogeyAgIFxyXG4gICAgICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIk5hbWVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgRW1haWxBZGRyZXNzTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFbWFpbEFkZHJlc3NcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGVtYWlsIGFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZSBcIiwgfSxcclxuICAgICAgICAgQ2xhc3NUYXVnaHQ6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJDbGFzc1RhdWdodFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBDbGFzc1RhdWdodCBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgU2Nob29sTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU2Nob29sTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTY2hvb2xOYW1lIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBDb250YWN0TGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJDb250YWN0XCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIENvbnRhY3QgbGFiZWwgb2YgcHJvZmlsZVwiLH0gXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBNZW50b3IgUHJvZmlsZSBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgTWVudG9yUHJvZmlsZVVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJNZW50b3JQcm9maWxlVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHsgICBcclxuICAgICAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJOYW1lXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRW1haWxBZGRyZXNzXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBlbWFpbCBhZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGUgXCIsIH0sXHJcbiAgICAgICAgIEFkZHJlc3NsYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkFkZHJlc3NcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgQ29udGFjdExhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiQ29udGFjdFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBDb250YWN0IGxhYmVsIG9mIHByb2ZpbGVcIix9IFxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQWRtaW4gUHJvZmlsZSBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQWRtaW5Qcm9maWxlVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkFkbWluUHJvZmlsZVVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7ICAgXHJcbiAgICAgICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLCB9LFxyXG4gICAgICAgICBTY2hvb2xOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTY2hvb2xOYW1lXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFNjaG9vbE5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIENvbnRhY3RMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkNvbnRhY3RcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQ29udGFjdCBsYWJlbCBvZiBwcm9maWxlXCIsfSBcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGRpcmVjdG9yIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERpcmVjdG9yUHJvZmlsZVVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJEaXJlY3RvclByb2ZpbGVVSVwiLFxyXG4gICAgcHJvcGVydGllczogeyAgIFxyXG4gICAgICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIk5hbWVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgRW1haWxBZGRyZXNzTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFbWFpbEFkZHJlc3NcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGVtYWlsIGFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZSBcIiwgfSxcclxuICAgIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3BlY3RhdGVVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3BlY3RhdGVVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiU3BlY3RhdGVVSVwiLFxyXG4gICAgcHJvcGVydGllczogeyAgIFxyXG4gICAgICAgIFJvb21TY3JlZW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUm9vbVNjcmVlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBub2RlIG9mIHJvb20gc2NyZWVuXCIsfSxcclxuICAgICAgICBTY3JvbGxCYXJDb250ZW50OiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU2Nyb2xsQmFyQ29udGVudFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBub2RlIG9mIFNjcm9sbEJhckNvbnRlbnQgb2Ygcm9vbSBzY3JlZW5cIix9LFxyXG4gICAgICAgIFByb2ZpbGVTY3JlZW5Ob2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUHJvZmlsZVNjcmVlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBub2RlIG9mIHByb2ZpbGUgc2NyZWVuXCIsfSxcclxuICAgICAgICBSb29tUHJlZmFiOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUm9vbVByZWZhYlwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBSb29tIG9uIHJvb20gc2NyZWVuXCIsfSxcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFVJTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVUlNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJVSU1hbmFnZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7IFxyXG4gICAgICAgIFVJUHJvZmlsZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlVJUHJvZmlsZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBQcm9maWxlVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgICAgICB9LCAgXHJcbiAgICAgICAgVGVhY2hlclVJUHJvZmlsZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRlYWNoZXJVSVByb2ZpbGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogVGVhY2hlclByb2ZpbGVVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBUZWFjaGVyUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgICAgICB9LCAgXHJcblxyXG4gICAgICAgIE1lbnRvclVJUHJvZmlsZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIk1lbnRvclVJUHJvZmlsZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBNZW50b3JQcm9maWxlVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gTWVudG9yUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgICAgICB9LCAgXHJcblxyXG4gICAgICAgIEFkbWluVUlQcm9maWxlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiQWRtaW5VSVByb2ZpbGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogQWRtaW5Qcm9maWxlVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQWRtaW5Qcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgICAgIH0sICBcclxuXHJcbiAgICAgICAgRGlyZWN0b3JVSVByb2ZpbGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJEaXJlY3RvclVJUHJvZmlsZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBEaXJlY3RvclByb2ZpbGVVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBEaXJlY3RvclByb2ZpbGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICAgICAgfSwgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFNjcmVlbk5vZGVzOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU2NyZWVuTm9kZXNcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBsb2dpbiBzY3JlZW4gbm9kZVwiLH0sXHJcbiAgICAgICAgIFR3ZWVuTWFuYWdlclJlZjoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlR3ZWVuTWFuYWdlclJlZlwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBUd2VlbiBNYW5hZ2VyIFNjcmlwdCBcIiwgfSxcclxuICAgICAgICAgTG9nbzoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvZ29Ob2RlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIHRoZSBsb2dvIG5vZGVcIix9LFxyXG4gICAgICAgICBUb2FzdE5vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUb2FzdE5vZGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIHRvYXN0IG5vZGVcIix9LFxyXG4gICAgICAgICBMb2FkaW5nTm9kZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYWRpbmdOb2RlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIHRoZSBMb2FkaW5nIE5vZGVcIix9LCAgIFxyXG4gICAgICAgIFJlZmVyZW5jZU1hbmFnZXJSZWY6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJSZWZlcmVuY2VNYW5hZ2VyUmVmXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIHRoZSByZWZlcmVuY2UgbWFuYWdlciBub2RlXCIsfSwgIFxyXG4gICAgICAgIE1vZGVTZWxlY3Rpb25TY3JlZW46IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJNb2RlU2VsZWN0aW9uU2NyZWVuXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbW9kZSBzZWxlY3Rpb24gc2NyZWVuIG5vZGVcIix9LCAgIFxyXG4gICAgICAgIFVJU3BlY3RhdGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJVSVNwZWN0YXRlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IFNwZWN0YXRlVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU3BlY3RhdGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICAgICAgfSwgICBcclxuICAgICAgICBVSUNvbnRhaW5lcjoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlVJQ29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gVUlDb250YWluZXIgbm9kZXNcIix9LCAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7IC8vY3JlYXRpbmcgc3RhdGljIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xyXG4gICAgICAgIEluc3RhbmNlOiBudWxsLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vZXZlbnRzIHN1YnNjcmlwdGlvbiB0byBiZSBjYWxsZWQgXHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oJ0Fzc2lnblByb2ZpbGVEYXRhJywgdGhpcy5Bc3NpZ25Qcm9maWxlRGF0YSwgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oJ1VwZGF0ZVN0YXR1c1dpbmRvdycsIHRoaXMuVXBkYXRlU3RhdHVzV2luZG93LCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbignQ2hhbmdlUGFuZWxTY3JlZW4nLCB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuLCB0aGlzKTtcclxuICAgICAgfSxcclxuICAgIFxyXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKCdBc3NpZ25Qcm9maWxlRGF0YScsIHRoaXMuQXNzaWduUHJvZmlsZURhdGEsIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZignVXBkYXRlU3RhdHVzV2luZG93JywgdGhpcy5VcGRhdGVTdGF0dXNXaW5kb3csIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZignQ2hhbmdlUGFuZWxTY3JlZW4nLCB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuLCB0aGlzKTtcclxuICAgICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuUmVmZXJlbmNlTWFuYWdlclJlZj10aGlzLlJlZmVyZW5jZU1hbmFnZXJSZWYuZ2V0Q29tcG9uZW50KFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG5cclxuICAgICAgICB0aGlzLlNlbGVjdGVkUm9sZSA9IFJvbGVzWzBdO1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRSb2xlSW5kZXggPSAwO1xyXG4gICAgICAgIFVJTWFuYWdlci5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIFRvdGFsUm9vbT1bXTtcclxuICAgICAgICAvL1ByaXZhdGUgVmFyaWFibGVzXHJcbiAgICAgICAgdGhpcy5FbWFpbFRleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlBhc3N3b3JkVGV4dD1cIlwiO1xyXG4gICAgICAgIHRoaXMubm9kZUNvdW50ZXI9MDtcclxuICAgICAgICB0aGlzLlN0YXR1c1RleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlRvdGFsUGxheWVycz1cIlwiO1xyXG4gICAgICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuR2V0VHdlZW5NYW5hZ2VyUmVmZXJlbmNlKCk7XHJcbiAgICAgICAgdGhpcy5TbGlkZUluTG9naW5Db21wb25lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5SZXBlYXRMb2dvQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlUGxheUJ1dHRvbihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuUGxheUdhbWVCdXR0b24uYWN0aXZlID0gX3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTcGVjdGF0ZUJ1dHRvbihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3BlY3RhdGVCdXR0b24uYWN0aXZlID0gX3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgIH0sXHJcblxyXG4gICAgQ2hhbmdlUGFuZWxTY3JlZW46IGZ1bmN0aW9uIChpc05leHQsY2hhbmdlU2NyZWVuLHNjZW5lTmFtZSkge1xyXG4gICAgICAgIFR3ZWVuUmVmLkZhZGVOb2RlSW5PdXQodGhpcy5TY3JlZW5Ob2Rlc1t0aGlzLm5vZGVDb3VudGVyXSwwLjU1LDI1NSwwLFwicXVhZEluT3V0XCIpO1xyXG5cclxuICAgIGlmKGNoYW5nZVNjcmVlbj09ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaXNOZXh0PT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlQ291bnRlcjx0aGlzLlNjcmVlbk5vZGVzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZUNvdW50ZXI9dGhpcy5ub2RlQ291bnRlcisxO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGVDb3VudGVyPjApXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVDb3VudGVyPXRoaXMubm9kZUNvdW50ZXItMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7dGhpcy5NYW5pcHVsYXRlTm9kZXModGhpcy5ub2RlQ291bnRlcik7fSwgNjAwKTtcclxuICAgIH1lbHNlXHJcbiAgICB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7Y2MuZGlyZWN0b3IubG9hZFNjZW5lKHNjZW5lTmFtZSk7fSwgNjAwKTtcclxuICAgIH19LFxyXG5cclxuICAgIE1hbmlwdWxhdGVOb2RlczogZnVuY3Rpb24gKGNvdW50ZXIpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5TY3JlZW5Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoY291bnRlcj09aW5kZXgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2NyZWVuTm9kZXNbaW5kZXhdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXRpbmcgaXQgdHJ1ZVwiKTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuUmVmLkZhZGVOb2RlSW5PdXQodGhpcy5TY3JlZW5Ob2Rlc1tpbmRleF0sMS41LDAsMjU1LFwicXVhZEluT3V0XCIpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2NyZWVuTm9kZXNbaW5kZXhdLmFjdGl2ZT1mYWxzZTsgXHJcbiAgICAgICAgICAgIH0gICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNsaWRlSW5Mb2dpbkNvbXBvbmVudHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBUd2VlblJlZi5Mb2dpblNjcmVlblR3ZWVuKHRoaXMuU2NyZWVuTm9kZXNbdGhpcy5ub2RlQ291bnRlcl0uY2hpbGRyZW5bMV0sLTEwMDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXBlYXRMb2dvQW5pbWF0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgVHdlZW5SZWYuUmVwZWF0VHdlZW5TY2FsZSh0aGlzLkxvZ28sMS4xLDEsMC44KTtcclxuICAgIH0sXHJcblxyXG4gICAgR2V0VHdlZW5NYW5hZ2VyUmVmZXJlbmNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgVHdlZW5SZWY9dGhpcy5Ud2Vlbk1hbmFnZXJSZWYuZ2V0Q29tcG9uZW50KFwiVHdlZW5NYW5hZ2VyXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXNldFBsYXllckNvdW50SW5wdXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlBsYXllckNvdW50SW5wdXQuc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub3RhbFBsYXllcnM9XCJcIjtcclxuICAgIH0sXHJcblxyXG4gICAgT25wbGF5ZXJOdW1iZXJDaGFuZ2VkKF9udW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub3RhbFBsYXllcnM9X251bWJlcjtcclxuICAgIH0sXHJcblxyXG4gICAgUGxheUdhbWU6ZnVuY3Rpb24oKVxyXG4gICAgeyAgXHJcbiAgICAgICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZU1vZGVTZWxlY3Rpb24odHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEJhY2tTZWxlY3Rpb25Nb2RlOmZ1bmN0aW9uKClcclxuICAgIHsgIFxyXG4gICAgICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVNb2RlU2VsZWN0aW9uKGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlTW9kZVNlbGVjdGlvbihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Nb2RlU2VsZWN0aW9uU2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFZlcnNlc1BsYXllck1vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuVG90YWxQbGF5ZXJzPT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2UgZW50ZXIgcGxheWVyIGFtb3VudCBmb3IgbXVsdGlwbGF5ZXIgZnJvbSAyLTYsIG1ha2Ugc3VyZSB0byBoYXZlIHNhbWUgYW1vdW50IG9uIGRpZmZlcmVudCBjb25uZWN0aW5nIGRldmljZXMgaWYgeW91IHdhbnQgdG8gY29ubmVjdCB0aGVtLlwiLDM1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3BsYXllcnM9cGFyc2VJbnQodGhpcy5Ub3RhbFBsYXllcnMpO1xyXG4gICAgICAgICAgICBpZihfcGxheWVycz49MiAmJiBfcGxheWVyczw9NilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVNb2RlU2VsZWN0aW9uKDIpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVTaG93Um9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuVUlQcm9maWxlLlBsYXlCdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzPV9wbGF5ZXJzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLmlzSW5Mb2JieSgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcIndhaXRpbmcgZm9yIG90aGVyIHBsYXllcnMuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luUmFuZG9tUm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVxdWVzdENvbm5lY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBlbnRlciBwbGF5ZXIgYW1vdW50IGZvciBtdWx0aXBsYXllciBmcm9tIDItNiwgbWFrZSBzdXJlIHRvIGhhdmUgc2FtZSBhbW91bnQgb24gZGlmZmVyZW50IGNvbm5lY3RpbmcgZGV2aWNlcyBpZiB5b3Ugd2FudCB0byBjb25uZWN0IHRoZW0uXCIsMzUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFZlcnNlc0FJTW9kZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVNb2RlU2VsZWN0aW9uKDEpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlU2hvd1Jvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM9MjtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJzZXR0aW5nIHVwIGdhbWUuLi5cIik7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwid2FpdGluZyBmb3IgQUkgU2V0dXAuLi5cIik7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuSm9pbmVkUm9vbT10cnVlO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIix0cnVlLHRydWUsXCJHYW1lUGxheVwiKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZVN0YXR1c1dpbmRvdzpmdW5jdGlvbihtc2cpXHJcbiAgICB7ICBcclxuICAgICAgICB0aGlzLlN0YXR1c1RleHQ9dGhpcy5TdGF0dXNUZXh0K21zZytcIlxcblwiO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz10aGlzLlN0YXR1c1RleHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRDb25uZWN0aW5nOmZ1bmN0aW9uKClcclxuICAgIHsgIFxyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlBsYXlCdXR0b25Ob2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgIHRoaXMuRW1haWxUZXh0PVwiXCI7XHJcbiAgICAgICAgdGhpcy5QYXNzd29yZFRleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlN0YXR1c1RleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlRvdGFsUGxheWVycz1cIlwiO1xyXG4gICAgICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUxvYWRpbmdOb2RlKHN0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTG9hZGluZ05vZGUuYWN0aXZlPXN0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBMb2dpblVzZXI6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuRW1haWxUZXh0IT1cIlwiICYmIHRoaXMuUGFzc3dvcmRUZXh0IT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgdmFyIGFuaW0gPSB0aGlzLkxvYWRpbmdOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICBhbmltLnBsYXkoJ2xvYWRpbmcnKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTG9naW5Vc2VyKHRoaXMuRW1haWxUZXh0LHRoaXMuUGFzc3dvcmRUZXh0LHRoaXMuU2VsZWN0ZWRSb2xlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiRW1haWwgb3IgcGFzc3dvcmQgaW52YWxpZCBvciBlbXB0eS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPblJvbGVUb2dnbGVkKF92YWwpXHJcbiAgICB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhfdmFsKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfdmFsLm5vZGUubmFtZS5zcGxpdChcIl9cIilbMV0pO1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRSb2xlSW5kZXggPSBfdmFsLm5vZGUubmFtZS5zcGxpdChcIl9cIilbMV07XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZFJvbGUgPSBSb2xlc1t0aGlzLlNlbGVjdGVkUm9sZUluZGV4XTtcclxuICAgIH0sXHJcblxyXG4gICAgU2V0RW1haWxUZXh0OmZ1bmN0aW9uKHRleHQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5FbWFpbFRleHQ9dGV4dDtcclxuICAgIH0sXHJcblxyXG4gICAgU2V0UGFzc3dvcmRUZXh0OmZ1bmN0aW9uKHRleHQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QYXNzd29yZFRleHQ9dGV4dDtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlVUlDb250YWluZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlVJQ29udGFpbmVyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TZWxlY3RlZFJvbGVJbmRleCA9PSBpbmRleClcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlDb250YWluZXJbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlDb250YWluZXJbaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgQXNzaWduUHJvZmlsZURhdGE6ZnVuY3Rpb24oX2lzU3R1ZGVudD1mYWxzZSxfaXNUZWFjaGVyPWZhbHNlLF9pc01lbnRvcj1mYWxzZSxfaXNBZG1pbj1mYWxzZSxfaXNEaXJlY3Rvcj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpPT0xKSAvL21lYW5zIHN1Y2Nlc3NmdWxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlUGFuZWxTY3JlZW4odHJ1ZSxmYWxzZSxcIlwiKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9pc1N0dWRlbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlUGxheUJ1dHRvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuRE9CTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZE9CO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuR3JhZGVMZXZlbExhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdyYWRlTGV2ZWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5UZWFjaGVyTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnRlYWNoZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuR2FtZXNXb25MYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLkZCUGFnZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmZhY2Vib29rUGFnZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlRlc3RUYWtlbkxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnRlc3RzVGFrZW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5UZXN0aW5nQXZnTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkIFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2g7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoX2lzVGVhY2hlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5OYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5UZWFjaGVyRGF0YS5lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuQ2xhc3NUYXVnaHQuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuY2xhc3NUYXVnaHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuU2Nob29sTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLnNjaG9vbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5Db250YWN0TGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuY29udGFjdE51bWJlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF9pc01lbnRvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLk1lbnRvckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NZW50b3JVSVByb2ZpbGUuTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLk1lbnRvckRhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWVudG9yVUlQcm9maWxlLkVtYWlsQWRkcmVzc0xhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLk1lbnRvckRhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NZW50b3JVSVByb2ZpbGUuQWRkcmVzc2xhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLk1lbnRvckRhdGEuYWRkcmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMuTWVudG9yVUlQcm9maWxlLkNvbnRhY3RMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLmNvbnRhY3ROdW1iZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfaXNBZG1pbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFkbWluVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWRtaW5VSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMuQWRtaW5VSVByb2ZpbGUuU2Nob29sTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YS5zY2hvb2xOYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BZG1pblVJUHJvZmlsZS5Db250YWN0TGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhLmNvbnRhY3ROdW1iZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfaXNEaXJlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkRpcmVjdG9yRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpcmVjdG9yVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5EaXJlY3RvckRhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlyZWN0b3JVSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuRGlyZWN0b3JEYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09MikgLy91c2VyIG5vdCBmb3VuZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwibm8gdXNlciByZWdpc3RlcmVkIHdpdGggZW50ZXJlZCBlbWFpbC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09MykgLy9wYXNzL2VtYWlsIGludmFsaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInVzZXIgZW1haWwgb3IgcGFzc3dvcmQgaXMgd3JvbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09NCkgLy9zb21ldGhpbmcgd2VudCB3cm9uZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29tZXRoaW5nIHdlbnQgd3JvbmcgcGxlYXNlIHRyeSBhZ2Fpbi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNyZWdpb24gU3BlY3RhdGUgVWkgV29ya1xyXG4gICAgVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBpZihfc3RhdGUpXHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVJU3BlY3RhdGUuUm9vbVNjcmVlbk5vZGUuYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJU3BlY3RhdGUuUHJvZmlsZVNjcmVlbk5vZGUuYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgU2hvd0F2YWlsYWJsZVJvb21zX1NwZWN0YXRlVUkoKVxyXG4gICAge1xyXG4gICAgIFxyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNDb25uZWN0ZWRUb01hc3RlcigpIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNJbkxvYmJ5KCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVTaG93Um9vbV9Cb29sKHRydWUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlcXVlc3RDb25uZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShfbmFtZSxfcGxheWVycylcclxuICAgIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuVUlTcGVjdGF0ZS5Sb29tUHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuVUlTcGVjdGF0ZS5TY3JvbGxCYXJDb250ZW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdSb29tTGlzdEhhbmRsZXInKS5TZXRSb29tTmFtZShfbmFtZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ1Jvb21MaXN0SGFuZGxlcicpLlNldFBsYXllckNvdW50KF9wbGF5ZXJzKTtcclxuICAgICAgICBUb3RhbFJvb20ucHVzaChub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRSb29tTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFRvdGFsUm9vbS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgVG90YWxSb29tW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUb3RhbFJvb209W107XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRfU3BlY3RhdGVVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuRXhpdENvbm5lY3RpbmcoKTtcclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICBTaG93VG9hc3Q6ZnVuY3Rpb24obXNnLF90aW1lPTIwMDApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2FzdE5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5Ub2FzdE5vZGUuY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bXNnO1xyXG4gICAgICAgIHZhciBTZWxmVG9hc3Q9dGhpcztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ICBTZWxmVG9hc3QuVG9hc3ROb2RlLmFjdGl2ZT1mYWxzZTsgfSwgX3RpbWUpO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cz0gVUlNYW5hZ2VyO1xyXG4iXX0=