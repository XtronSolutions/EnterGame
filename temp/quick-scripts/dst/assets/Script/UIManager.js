
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
  ResetAllData: function ResetAllData() {
    GamePlayReferenceManager = null;
    TweenRef;
    TotalRoom = [];
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
    this.ResetAllData();
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
  ToggleUIContainer: function ToggleUIContainer(_mainIndex) {
    for (var index = 0; index < this.UIContainer.length; index++) {
      if (_mainIndex == index) this.UIContainer[index].active = true;else this.UIContainer[index].active = false;
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

    //console.error(parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType));
    if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 1) //means successful
      {
        this.ChangePanelScreen(true, false, "");

        if (_isStudent) {
          this.ToggleUIContainer(0);
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
          this.ToggleUIContainer(1);
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
          this.ToggleUIContainer(2);
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
          this.ToggleUIContainer(3);
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
          this.ToggleUIContainer(4);
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
  Logout: function Logout() {
    cc.systemEvent.emit("ClearData"); //function written in storage Manager class

    if (GamePlayReferenceManager.Instance.Get_GameManager() != null) GamePlayReferenceManager.Instance.Get_GameManager().ClearDisplayTimeout();
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController() != null) GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();
    if (GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager() != null) GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
    if (GamePlayReferenceManager.Instance.Get_ServerBackend() != null) GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
    GamePlayReferenceManager.Instance.RemovePersistNode();
    cc.director.loadScene("MainMenu");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxVSU1hbmFnZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHdlZW5SZWYiLCJUb3RhbFJvb20iLCJSb2xlcyIsIlByb2ZpbGVVSSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWVMYWJlbCIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkVtYWlsQWRkcmVzc0xhYmVsIiwiRE9CTGFiZWwiLCJHcmFkZUxldmVsTGFiZWwiLCJUZWFjaGVyTmFtZUxhYmVsIiwiR2FtZXNXb25MYWJlbCIsIkZCUGFnZUxhYmVsIiwiVGVzdFRha2VuTGFiZWwiLCJUZXN0aW5nQXZnTGFiZWwiLCJDYXNoTGFiZWwiLCJTdGF0dXNOb2RlIiwiTm9kZSIsIlBsYXlCdXR0b25Ob2RlIiwiU3RhdHVzTGFiZWwiLCJQbGF5ZXJDb3VudElucHV0IiwiRWRpdEJveCIsIkRpc3RyaWN0TGFiZWwiLCJQbGF5R2FtZUJ1dHRvbiIsIlNwZWN0YXRlQnV0dG9uIiwiQ2FzaE5vZGUiLCJUZWFjaGVyUHJvZmlsZVVJIiwiQ2xhc3NUYXVnaHQiLCJTY2hvb2xOYW1lTGFiZWwiLCJDb250YWN0TGFiZWwiLCJNZW50b3JQcm9maWxlVUkiLCJBZGRyZXNzbGFiZWwiLCJBZG1pblByb2ZpbGVVSSIsIkRpcmVjdG9yUHJvZmlsZVVJIiwiU3BlY3RhdGVVSSIsIlJvb21TY3JlZW5Ob2RlIiwiU2Nyb2xsQmFyQ29udGVudCIsIlByb2ZpbGVTY3JlZW5Ob2RlIiwiUm9vbVByZWZhYiIsIlByZWZhYiIsIlVJTWFuYWdlciIsIkNvbXBvbmVudCIsIlVJUHJvZmlsZSIsIlRlYWNoZXJVSVByb2ZpbGUiLCJNZW50b3JVSVByb2ZpbGUiLCJBZG1pblVJUHJvZmlsZSIsIkRpcmVjdG9yVUlQcm9maWxlIiwiU2NyZWVuTm9kZXMiLCJUd2Vlbk1hbmFnZXJSZWYiLCJMb2dvIiwiVG9hc3ROb2RlIiwiTG9hZGluZ05vZGUiLCJSZWZlcmVuY2VNYW5hZ2VyUmVmIiwiTW9kZVNlbGVjdGlvblNjcmVlbiIsIlVJU3BlY3RhdGUiLCJVSUNvbnRhaW5lciIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlJlc2V0QWxsRGF0YSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIkFzc2lnblByb2ZpbGVEYXRhIiwiVXBkYXRlU3RhdHVzV2luZG93IiwiQ2hhbmdlUGFuZWxTY3JlZW4iLCJvbkRpc2FibGUiLCJvZmYiLCJvbkxvYWQiLCJnZXRDb21wb25lbnQiLCJTZWxlY3RlZFJvbGUiLCJTZWxlY3RlZFJvbGVJbmRleCIsIkVtYWlsVGV4dCIsIlBhc3N3b3JkVGV4dCIsIm5vZGVDb3VudGVyIiwiU3RhdHVzVGV4dCIsIlRvdGFsUGxheWVycyIsIlJlc2V0UGxheWVyQ291bnRJbnB1dCIsIkdldFR3ZWVuTWFuYWdlclJlZmVyZW5jZSIsIlNsaWRlSW5Mb2dpbkNvbXBvbmVudHMiLCJSZXBlYXRMb2dvQW5pbWF0aW9uIiwiQ2hlY2tSZWZlcmVuY2VzIiwiVG9nZ2xlUGxheUJ1dHRvbiIsIl9zdGF0ZSIsImFjdGl2ZSIsIlRvZ2dsZVNwZWN0YXRlQnV0dG9uIiwicmVxdWlyZSIsImlzTmV4dCIsImNoYW5nZVNjcmVlbiIsInNjZW5lTmFtZSIsIkZhZGVOb2RlSW5PdXQiLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiTWFuaXB1bGF0ZU5vZGVzIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJjb3VudGVyIiwiaW5kZXgiLCJjb25zb2xlIiwibG9nIiwiTG9naW5TY3JlZW5Ud2VlbiIsImNoaWxkcmVuIiwiUmVwZWF0VHdlZW5TY2FsZSIsInN0cmluZyIsIk9ucGxheWVyTnVtYmVyQ2hhbmdlZCIsIl9udW1iZXIiLCJQbGF5R2FtZSIsIlRvZ2dsZU1vZGVTZWxlY3Rpb24iLCJCYWNrU2VsZWN0aW9uTW9kZSIsIlZlcnNlc1BsYXllck1vZGUiLCJTaG93VG9hc3QiLCJfcGxheWVycyIsInBhcnNlSW50IiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZVNob3dSb29tX0Jvb2wiLCJNYXhQbGF5ZXJzIiwiZ2V0UGhvdG9uUmVmIiwiaXNDb25uZWN0ZWRUb01hc3RlciIsImlzSW5Mb2JieSIsImVtaXQiLCJKb2luUmFuZG9tUm9vbSIsIlJlcXVlc3RDb25uZWN0aW9uIiwiVmVyc2VzQUlNb2RlIiwiSm9pbmVkUm9vbSIsIm1zZyIsIkV4aXRDb25uZWN0aW5nIiwiRGlzY29ubmVjdFBob3RvbiIsIlRvZ2dsZUxvYWRpbmdOb2RlIiwic3RhdGUiLCJMb2dpblVzZXIiLCJhbmltIiwiQW5pbWF0aW9uIiwicGxheSIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiT25Sb2xlVG9nZ2xlZCIsIl92YWwiLCJub2RlIiwic3BsaXQiLCJTZXRFbWFpbFRleHQiLCJ0ZXh0IiwiU2V0UGFzc3dvcmRUZXh0IiwiVG9nZ2xlVUlDb250YWluZXIiLCJfbWFpbkluZGV4IiwiX2lzU3R1ZGVudCIsIl9pc1RlYWNoZXIiLCJfaXNNZW50b3IiLCJfaXNBZG1pbiIsIl9pc0RpcmVjdG9yIiwiUmVzcG9uc2VUeXBlIiwiU3R1ZGVudERhdGEiLCJlbWFpbEFkZHJlc3MiLCJkT0IiLCJncmFkZUxldmVsIiwidGVhY2hlck5hbWUiLCJnYW1lc1dvbiIsImZhY2Vib29rUGFnZSIsInRlc3RzVGFrZW4iLCJ0ZXN0aW5nQXZlcmFnZSIsImdhbWVDYXNoIiwiVGVhY2hlckRhdGEiLCJjbGFzc1RhdWdodCIsInNjaG9vbCIsImNvbnRhY3ROdW1iZXIiLCJNZW50b3JEYXRhIiwiYWRkcmVzcyIsIkFkbWluRGF0YSIsInNjaG9vbE5hbWUiLCJEaXJlY3RvckRhdGEiLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJTaG93QXZhaWxhYmxlUm9vbXNfU3BlY3RhdGVVSSIsIlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJIiwiX25hbWUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIlNldFJvb21OYW1lIiwiU2V0UGxheWVyQ291bnQiLCJwdXNoIiwiUmVzZXRSb29tTGlzdCIsImRlc3Ryb3kiLCJFeGl0X1NwZWN0YXRlVUkiLCJMb2dvdXQiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIl90aW1lIiwiU2VsZlRvYXN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsUUFBSjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLEtBQUssR0FBQyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXNCLG1CQUF0QixFQUEwQyxhQUExQyxFQUF3RCxpQkFBeEQsQ0FBVixFQUNBOztBQUNBLElBQUlDLFNBQVMsR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDbkJDLEVBQUFBLElBQUksRUFBQyxXQURjO0FBRW5CQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1BDLE1BQUFBLFdBQVcsRUFBQyxNQURMO0FBRVAsaUJBQVMsSUFGRjtBQUdQQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FIRjtBQUlQQyxNQUFBQSxZQUFZLEVBQUUsSUFKUDtBQUtQQyxNQUFBQSxPQUFPLEVBQUU7QUFMRixLQURIO0FBT1BDLElBQUFBLGlCQUFpQixFQUFFO0FBQ2hCTCxNQUFBQSxXQUFXLEVBQUMsY0FESTtBQUVoQixpQkFBUyxJQUZPO0FBR2hCQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FITztBQUloQkMsTUFBQUEsWUFBWSxFQUFFLElBSkU7QUFLaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxPLEtBUFo7QUFhUEUsSUFBQUEsUUFBUSxFQUFFO0FBQ1BOLE1BQUFBLFdBQVcsRUFBQyxLQURMO0FBRVAs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cUIsR0FBckU7QUFDQSxRQUFJK0QsU0FBUyxHQUFDLElBQWQ7QUFDQS9GLElBQUFBLFVBQVUsQ0FBQyxZQUFVO0FBQUcrRixNQUFBQSxTQUFTLENBQUN4SSxTQUFWLENBQW9CaUMsTUFBcEIsR0FBMkIsS0FBM0I7QUFBbUMsS0FBakQsRUFBbURzRyxLQUFuRCxDQUFWO0FBQ0g7QUF0aEJrQixDQUFULENBQWQ7QUF5aEJBRSxNQUFNLENBQUNDLE9BQVAsR0FBZ0JwSixTQUFoQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFR3ZWVlbiBmcm9tICdUd2Vlbk1hbmFnZXInO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBUd2VlblJlZjtcclxudmFyIFRvdGFsUm9vbSA9IFtdO1xyXG52YXIgUm9sZXM9W1wiU3R1ZGVudFwiLCBcIlRlYWNoZXJcIixcIlByb2dyYW1BbWJhc3NhZG9yXCIsXCJTY2hvb2xBZG1pblwiLFwiUHJvZ3JhbURpcmVjdG9yXCJdO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUHJvZmlsZSBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUHJvZmlsZVVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJQcm9maWxlVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHsgICBcclxuICAgICAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJOYW1lXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRW1haWxBZGRyZXNzXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBlbWFpbCBhZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGUgXCIsIH0sXHJcbiAgICAgICAgIERPQkxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRE9CXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIERPQiBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgR3JhZGVMZXZlbExhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiR3JhZGVMZXZlbFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBHcmFkZSBMZXZlbCBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgVGVhY2hlck5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRlYWNoZXJOYW1lXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFRlYWNoZXIgTmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgR2FtZXNXb25MYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkdhbWVzV29uXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGdhbWVzIHdvbiBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgRkJQYWdlTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJGQlBhZ2VcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gZmFjZWJvb2sgcGFnZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgVGVzdFRha2VuTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUZXN0VGFrZW5cIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gdGVzdCB0YWtlbiBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgVGVzdGluZ0F2Z0xhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVGVzdGluZ0F2ZXJhZ2VcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gVGVzdGluZyBBdmVyYWdlIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgIENhc2hMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkNhc2hcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gY2FzaCBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICBTdGF0dXNOb2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU3RhdHVzU2NyZWVuXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU3RhdHVzIFNjcmVlbiBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICBQbGF5QnV0dG9uTm9kZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXlCdXR0b25cIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBwbGF5IGJ1dHRvbiBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICBTdGF0dXNMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlN0YXR1c1RleHRcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU3RhdHVzIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgIFBsYXllckNvdW50SW5wdXQ6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJDb3VudElucHV0XCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gUGxheWVyQ291bnRJbnB1dCBvZiBwcm9maWxlXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBEaXN0cmljdExhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRGlzdHJpY3RMYWJlbFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBEaXN0cmljdExhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFBsYXlHYW1lQnV0dG9uOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheUdhbWVCdXR0b25cIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBQbGF5R2FtZUJ1dHRvbiBvZiBwcm9maWxlXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBTcGVjdGF0ZUJ1dHRvbjoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlNwZWN0YXRlQnV0dG9uXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU3BlY3RhdGVCdXR0b24gb2YgcHJvZmlsZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQ2FzaE5vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJDYXNoTm9kZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIENhc2hOb2RlIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciB0ZWFjaGVyIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFRlYWNoZXJQcm9maWxlVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlRlYWNoZXJQcm9maWxlVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHsgICBcclxuICAgICAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJOYW1lXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRW1haWxBZGRyZXNzXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBlbWFpbCBhZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGUgXCIsIH0sXHJcbiAgICAgICAgIENsYXNzVGF1Z2h0OiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiQ2xhc3NUYXVnaHRcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQ2xhc3NUYXVnaHQgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIFNjaG9vbE5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlNjaG9vbE5hbWVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU2Nob29sTmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgQ29udGFjdExhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiQ29udGFjdFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBDb250YWN0IGxhYmVsIG9mIHByb2ZpbGVcIix9IFxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgTWVudG9yIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE1lbnRvclByb2ZpbGVVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiTWVudG9yUHJvZmlsZVVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7ICAgXHJcbiAgICAgICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLCB9LFxyXG4gICAgICAgICBBZGRyZXNzbGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJBZGRyZXNzXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIEFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIENvbnRhY3RMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkNvbnRhY3RcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQ29udGFjdCBsYWJlbCBvZiBwcm9maWxlXCIsfSBcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEFkbWluIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEFkbWluUHJvZmlsZVVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJBZG1pblByb2ZpbGVVSVwiLFxyXG4gICAgcHJvcGVydGllczogeyAgIFxyXG4gICAgICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIk5hbWVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgRW1haWxBZGRyZXNzTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFbWFpbEFkZHJlc3NcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGVtYWlsIGFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZSBcIiwgfSxcclxuICAgICAgICAgU2Nob29sTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiU2Nob29sTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTY2hvb2xOYW1lIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBDb250YWN0TGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJDb250YWN0XCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIENvbnRhY3QgbGFiZWwgb2YgcHJvZmlsZVwiLH0gXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBkaXJlY3RvciBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBEaXJlY3RvclByb2ZpbGVVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiRGlyZWN0b3JQcm9maWxlVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHsgICBcclxuICAgICAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJOYW1lXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRW1haWxBZGRyZXNzXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBlbWFpbCBhZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGUgXCIsIH0sXHJcbiAgICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFNwZWN0YXRlVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNwZWN0YXRlVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlNwZWN0YXRlVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHsgICBcclxuICAgICAgICBSb29tU2NyZWVuTm9kZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlJvb21TY3JlZW5cIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byB0aGUgbm9kZSBvZiByb29tIHNjcmVlblwiLH0sXHJcbiAgICAgICAgU2Nyb2xsQmFyQ29udGVudDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlNjcm9sbEJhckNvbnRlbnRcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byB0aGUgbm9kZSBvZiBTY3JvbGxCYXJDb250ZW50IG9mIHJvb20gc2NyZWVuXCIsfSxcclxuICAgICAgICBQcm9maWxlU2NyZWVuTm9kZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlByb2ZpbGVTY3JlZW5cIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byB0aGUgbm9kZSBvZiBwcm9maWxlIHNjcmVlblwiLH0sXHJcbiAgICAgICAgUm9vbVByZWZhYjoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlJvb21QcmVmYWJcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgUm9vbSBvbiByb29tIHNjcmVlblwiLH0sXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBVSU1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVJTWFuYWdlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiVUlNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczogeyBcclxuICAgICAgICBVSVByb2ZpbGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJVSVByb2ZpbGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogUHJvZmlsZVVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFByb2ZpbGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICAgICAgfSwgIFxyXG4gICAgICAgIFRlYWNoZXJVSVByb2ZpbGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUZWFjaGVyVUlQcm9maWxlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IFRlYWNoZXJQcm9maWxlVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gVGVhY2hlclByb2ZpbGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICAgICAgfSwgIFxyXG5cclxuICAgICAgICBNZW50b3JVSVByb2ZpbGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJNZW50b3JVSVByb2ZpbGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogTWVudG9yUHJvZmlsZVVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIE1lbnRvclByb2ZpbGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICAgICAgfSwgIFxyXG5cclxuICAgICAgICBBZG1pblVJUHJvZmlsZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkFkbWluVUlQcm9maWxlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IEFkbWluUHJvZmlsZVVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIEFkbWluUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgICAgICB9LCAgXHJcblxyXG4gICAgICAgIERpcmVjdG9yVUlQcm9maWxlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRGlyZWN0b3JVSVByb2ZpbGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogRGlyZWN0b3JQcm9maWxlVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gRGlyZWN0b3JQcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgICAgIH0sICBcclxuICAgICAgICBcclxuICAgICAgICBTY3JlZW5Ob2Rlczoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlNjcmVlbk5vZGVzXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbG9naW4gc2NyZWVuIG5vZGVcIix9LFxyXG4gICAgICAgICBUd2Vlbk1hbmFnZXJSZWY6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUd2Vlbk1hbmFnZXJSZWZcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgVHdlZW4gTWFuYWdlciBTY3JpcHQgXCIsIH0sXHJcbiAgICAgICAgIExvZ286IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2dvTm9kZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgbG9nbyBub2RlXCIsfSxcclxuICAgICAgICAgVG9hc3ROb2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG9hc3ROb2RlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIHRoZSB0b2FzdCBub2RlXCIsfSxcclxuICAgICAgICAgTG9hZGluZ05vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FkaW5nTm9kZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgTG9hZGluZyBOb2RlXCIsfSwgICBcclxuICAgICAgICBSZWZlcmVuY2VNYW5hZ2VyUmVmOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUmVmZXJlbmNlTWFuYWdlclJlZlwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgcmVmZXJlbmNlIG1hbmFnZXIgbm9kZVwiLH0sICBcclxuICAgICAgICBNb2RlU2VsZWN0aW9uU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTW9kZVNlbGVjdGlvblNjcmVlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG1vZGUgc2VsZWN0aW9uIHNjcmVlbiBub2RlXCIsfSwgICBcclxuICAgICAgICBVSVNwZWN0YXRlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVUlTcGVjdGF0ZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBTcGVjdGF0ZVVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFNwZWN0YXRlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgICAgIH0sICAgXHJcbiAgICAgICAgVUlDb250YWluZXI6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJVSUNvbnRhaW5lclwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFVJQ29udGFpbmVyIG5vZGVzXCIsfSwgICBcclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczogeyAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgICAgICBJbnN0YW5jZTogbnVsbCxcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRBbGxEYXRhKClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIFR3ZWVuUmVmO1xyXG4gICAgICAgIFRvdGFsUm9vbSA9IFtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vZXZlbnRzIHN1YnNjcmlwdGlvbiB0byBiZSBjYWxsZWQgXHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oJ0Fzc2lnblByb2ZpbGVEYXRhJywgdGhpcy5Bc3NpZ25Qcm9maWxlRGF0YSwgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oJ1VwZGF0ZVN0YXR1c1dpbmRvdycsIHRoaXMuVXBkYXRlU3RhdHVzV2luZG93LCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbignQ2hhbmdlUGFuZWxTY3JlZW4nLCB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuLCB0aGlzKTtcclxuICAgICAgfSxcclxuICAgIFxyXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKCdBc3NpZ25Qcm9maWxlRGF0YScsIHRoaXMuQXNzaWduUHJvZmlsZURhdGEsIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZignVXBkYXRlU3RhdHVzV2luZG93JywgdGhpcy5VcGRhdGVTdGF0dXNXaW5kb3csIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZignQ2hhbmdlUGFuZWxTY3JlZW4nLCB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuLCB0aGlzKTtcclxuICAgICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5SZXNldEFsbERhdGEoKTtcclxuICAgICAgICB0aGlzLlJlZmVyZW5jZU1hbmFnZXJSZWY9dGhpcy5SZWZlcmVuY2VNYW5hZ2VyUmVmLmdldENvbXBvbmVudChcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZFJvbGUgPSBSb2xlc1swXTtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkUm9sZUluZGV4ID0gMDtcclxuICAgICAgICBVSU1hbmFnZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICBUb3RhbFJvb209W107XHJcbiAgICAgICAgLy9Qcml2YXRlIFZhcmlhYmxlc1xyXG4gICAgICAgIHRoaXMuRW1haWxUZXh0PVwiXCI7XHJcbiAgICAgICAgdGhpcy5QYXNzd29yZFRleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLm5vZGVDb3VudGVyPTA7XHJcbiAgICAgICAgdGhpcy5TdGF0dXNUZXh0PVwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub3RhbFBsYXllcnM9XCJcIjtcclxuICAgICAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG5cclxuICAgICAgICB0aGlzLkdldFR3ZWVuTWFuYWdlclJlZmVyZW5jZSgpO1xyXG4gICAgICAgIHRoaXMuU2xpZGVJbkxvZ2luQ29tcG9uZW50cygpO1xyXG4gICAgICAgIHRoaXMuUmVwZWF0TG9nb0FuaW1hdGlvbigpO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVBsYXlCdXR0b24oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlBsYXlHYW1lQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU3BlY3RhdGVCdXR0b24oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlNwZWN0YXRlQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgICB9LFxyXG5cclxuICAgIENoYW5nZVBhbmVsU2NyZWVuOiBmdW5jdGlvbiAoaXNOZXh0LGNoYW5nZVNjcmVlbixzY2VuZU5hbWUpIHtcclxuICAgICAgICBUd2VlblJlZi5GYWRlTm9kZUluT3V0KHRoaXMuU2NyZWVuTm9kZXNbdGhpcy5ub2RlQ291bnRlcl0sMC41NSwyNTUsMCxcInF1YWRJbk91dFwiKTtcclxuXHJcbiAgICBpZihjaGFuZ2VTY3JlZW49PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGlzTmV4dD09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZUNvdW50ZXI8dGhpcy5TY3JlZW5Ob2Rlcy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVDb3VudGVyPXRoaXMubm9kZUNvdW50ZXIrMTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlQ291bnRlcj4wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlQ291bnRlcj10aGlzLm5vZGVDb3VudGVyLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge3RoaXMuTWFuaXB1bGF0ZU5vZGVzKHRoaXMubm9kZUNvdW50ZXIpO30sIDYwMCk7XHJcbiAgICB9ZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge2NjLmRpcmVjdG9yLmxvYWRTY2VuZShzY2VuZU5hbWUpO30sIDYwMCk7XHJcbiAgICB9fSxcclxuXHJcbiAgICBNYW5pcHVsYXRlTm9kZXM6IGZ1bmN0aW9uIChjb3VudGVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuU2NyZWVuTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKGNvdW50ZXI9PWluZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNjcmVlbk5vZGVzW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0aW5nIGl0IHRydWVcIik7XHJcbiAgICAgICAgICAgICAgICBUd2VlblJlZi5GYWRlTm9kZUluT3V0KHRoaXMuU2NyZWVuTm9kZXNbaW5kZXhdLDEuNSwwLDI1NSxcInF1YWRJbk91dFwiKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNjcmVlbk5vZGVzW2luZGV4XS5hY3RpdmU9ZmFsc2U7IFxyXG4gICAgICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTbGlkZUluTG9naW5Db21wb25lbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgVHdlZW5SZWYuTG9naW5TY3JlZW5Ud2Vlbih0aGlzLlNjcmVlbk5vZGVzW3RoaXMubm9kZUNvdW50ZXJdLmNoaWxkcmVuWzFdLC0xMDAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVwZWF0TG9nb0FuaW1hdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFR3ZWVuUmVmLlJlcGVhdFR3ZWVuU2NhbGUodGhpcy5Mb2dvLDEuMSwxLDAuOCk7XHJcbiAgICB9LFxyXG5cclxuICAgIEdldFR3ZWVuTWFuYWdlclJlZmVyZW5jZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFR3ZWVuUmVmPXRoaXMuVHdlZW5NYW5hZ2VyUmVmLmdldENvbXBvbmVudChcIlR3ZWVuTWFuYWdlclwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRQbGF5ZXJDb3VudElucHV0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5QbGF5ZXJDb3VudElucHV0LnN0cmluZz1cIlwiO1xyXG4gICAgICAgIHRoaXMuVG90YWxQbGF5ZXJzPVwiXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIE9ucGxheWVyTnVtYmVyQ2hhbmdlZChfbnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG90YWxQbGF5ZXJzPV9udW1iZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIFBsYXlHYW1lOmZ1bmN0aW9uKClcclxuICAgIHsgIFxyXG4gICAgICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVNb2RlU2VsZWN0aW9uKHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBCYWNrU2VsZWN0aW9uTW9kZTpmdW5jdGlvbigpXHJcbiAgICB7ICBcclxuICAgICAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlTW9kZVNlbGVjdGlvbihmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZU1vZGVTZWxlY3Rpb24oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTW9kZVNlbGVjdGlvblNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBWZXJzZXNQbGF5ZXJNb2RlKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlRvdGFsUGxheWVycz09XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIGVudGVyIHBsYXllciBhbW91bnQgZm9yIG11bHRpcGxheWVyIGZyb20gMi02LCBtYWtlIHN1cmUgdG8gaGF2ZSBzYW1lIGFtb3VudCBvbiBkaWZmZXJlbnQgY29ubmVjdGluZyBkZXZpY2VzIGlmIHlvdSB3YW50IHRvIGNvbm5lY3QgdGhlbS5cIiwzNTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJzPXBhcnNlSW50KHRoaXMuVG90YWxQbGF5ZXJzKTtcclxuICAgICAgICAgICAgaWYoX3BsYXllcnM+PTIgJiYgX3BsYXllcnM8PTYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTW9kZVNlbGVjdGlvbigyKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlU2hvd1Jvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLlVJUHJvZmlsZS5QbGF5QnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz1fcGxheWVycztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0luTG9iYnkoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJ3YWl0aW5nIGZvciBvdGhlciBwbGF5ZXJzLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuSm9pblJhbmRvbVJvb20oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlcXVlc3RDb25uZWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2UgZW50ZXIgcGxheWVyIGFtb3VudCBmb3IgbXVsdGlwbGF5ZXIgZnJvbSAyLTYsIG1ha2Ugc3VyZSB0byBoYXZlIHNhbWUgYW1vdW50IG9uIGRpZmZlcmVudCBjb25uZWN0aW5nIGRldmljZXMgaWYgeW91IHdhbnQgdG8gY29ubmVjdCB0aGVtLlwiLDM1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBWZXJzZXNBSU1vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTW9kZVNlbGVjdGlvbigxKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZVNob3dSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTGFiZWwuc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzPTI7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwic2V0dGluZyB1cCBnYW1lLi4uXCIpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcIndhaXRpbmcgZm9yIEFJIFNldHVwLi4uXCIpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkpvaW5lZFJvb209dHJ1ZTtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsdHJ1ZSx0cnVlLFwiR2FtZVBsYXlcIik7IC8vZnVuY3Rpb24gaW4gdWkgbWFuYWdlclxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVTdGF0dXNXaW5kb3c6ZnVuY3Rpb24obXNnKVxyXG4gICAgeyAgXHJcbiAgICAgICAgdGhpcy5TdGF0dXNUZXh0PXRoaXMuU3RhdHVzVGV4dCttc2crXCJcXG5cIjtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmc9dGhpcy5TdGF0dXNUZXh0O1xyXG4gICAgfSxcclxuXHJcbiAgICBFeGl0Q29ubmVjdGluZzpmdW5jdGlvbigpXHJcbiAgICB7ICBcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5QbGF5QnV0dG9uTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICB0aGlzLkVtYWlsVGV4dD1cIlwiO1xyXG4gICAgICAgIHRoaXMuUGFzc3dvcmRUZXh0PVwiXCI7XHJcbiAgICAgICAgdGhpcy5TdGF0dXNUZXh0PVwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub3RhbFBsYXllcnM9XCJcIjtcclxuICAgICAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVMb2FkaW5nTm9kZShzdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxvYWRpbmdOb2RlLmFjdGl2ZT1zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgTG9naW5Vc2VyOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkVtYWlsVGV4dCE9XCJcIiAmJiB0aGlzLlBhc3N3b3JkVGV4dCE9XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHZhciBhbmltID0gdGhpcy5Mb2FkaW5nTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgYW5pbS5wbGF5KCdsb2FkaW5nJyk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkxvZ2luVXNlcih0aGlzLkVtYWlsVGV4dCx0aGlzLlBhc3N3b3JkVGV4dCx0aGlzLlNlbGVjdGVkUm9sZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIkVtYWlsIG9yIHBhc3N3b3JkIGludmFsaWQgb3IgZW1wdHkuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25Sb2xlVG9nZ2xlZChfdmFsKVxyXG4gICAge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coX3ZhbCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX3ZhbC5ub2RlLm5hbWUuc3BsaXQoXCJfXCIpWzFdKTtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkUm9sZUluZGV4ID0gX3ZhbC5ub2RlLm5hbWUuc3BsaXQoXCJfXCIpWzFdO1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRSb2xlID0gUm9sZXNbdGhpcy5TZWxlY3RlZFJvbGVJbmRleF07XHJcbiAgICB9LFxyXG5cclxuICAgIFNldEVtYWlsVGV4dDpmdW5jdGlvbih0ZXh0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuRW1haWxUZXh0PXRleHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldFBhc3N3b3JkVGV4dDpmdW5jdGlvbih0ZXh0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGFzc3dvcmRUZXh0PXRleHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVVJQ29udGFpbmVyKF9tYWluSW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuVUlDb250YWluZXIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChfbWFpbkluZGV4ID09IGluZGV4KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5VSUNvbnRhaW5lcltpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5VSUNvbnRhaW5lcltpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBBc3NpZ25Qcm9maWxlRGF0YTpmdW5jdGlvbihfaXNTdHVkZW50PWZhbHNlLF9pc1RlYWNoZXI9ZmFsc2UsX2lzTWVudG9yPWZhbHNlLF9pc0FkbWluPWZhbHNlLF9pc0RpcmVjdG9yPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpKTtcclxuICAgICAgICBpZihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpPT0xKSAvL21lYW5zIHN1Y2Nlc3NmdWxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlUGFuZWxTY3JlZW4odHJ1ZSxmYWxzZSxcIlwiKTtcclxuICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGlmIChfaXNTdHVkZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVVJQ29udGFpbmVyKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVTcGVjdGF0ZUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5ET0JMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5kT0I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5HcmFkZUxldmVsTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ3JhZGVMZXZlbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlRlYWNoZXJOYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudGVhY2hlck5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5HYW1lc1dvbkxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuRkJQYWdlTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZmFjZWJvb2tQYWdlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuVGVzdFRha2VuTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudGVzdHNUYWtlbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlRlc3RpbmdBdmdMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS50ZXN0aW5nQXZlcmFnZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiQgXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfaXNUZWFjaGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVVJQ29udGFpbmVyKDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5OYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5UZWFjaGVyRGF0YS5lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuQ2xhc3NUYXVnaHQuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuY2xhc3NUYXVnaHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuU2Nob29sTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLnNjaG9vbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5Db250YWN0TGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuY29udGFjdE51bWJlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF9pc01lbnRvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcigyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlUGxheUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVNwZWN0YXRlQnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWVudG9yVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1lbnRvclVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMuTWVudG9yVUlQcm9maWxlLkFkZHJlc3NsYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLmFkZHJlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1lbnRvclVJUHJvZmlsZS5Db250YWN0TGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoX2lzQWRtaW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVUlDb250YWluZXIoMyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVBsYXlCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVTcGVjdGF0ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLkNhc2hOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWRtaW5VSVByb2ZpbGUuTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BZG1pblVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BZG1pblVJUHJvZmlsZS5TY2hvb2xOYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhLnNjaG9vbE5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFkbWluVUlQcm9maWxlLkNvbnRhY3RMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEuY29udGFjdE51bWJlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF9pc0RpcmVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVVJQ29udGFpbmVyKDQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkRpcmVjdG9yRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpcmVjdG9yVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5EaXJlY3RvckRhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlyZWN0b3JVSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuRGlyZWN0b3JEYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09MikgLy91c2VyIG5vdCBmb3VuZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwibm8gdXNlciByZWdpc3RlcmVkIHdpdGggZW50ZXJlZCBlbWFpbC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09MykgLy9wYXNzL2VtYWlsIGludmFsaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInVzZXIgZW1haWwgb3IgcGFzc3dvcmQgaXMgd3JvbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09NCkgLy9zb21ldGhpbmcgd2VudCB3cm9uZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29tZXRoaW5nIHdlbnQgd3JvbmcgcGxlYXNlIHRyeSBhZ2Fpbi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNyZWdpb24gU3BlY3RhdGUgVWkgV29ya1xyXG4gICAgVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBpZihfc3RhdGUpXHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVJU3BlY3RhdGUuUm9vbVNjcmVlbk5vZGUuYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJU3BlY3RhdGUuUHJvZmlsZVNjcmVlbk5vZGUuYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgU2hvd0F2YWlsYWJsZVJvb21zX1NwZWN0YXRlVUkoKVxyXG4gICAge1xyXG4gICAgIFxyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNDb25uZWN0ZWRUb01hc3RlcigpIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNJbkxvYmJ5KCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVTaG93Um9vbV9Cb29sKHRydWUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlcXVlc3RDb25uZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShfbmFtZSxfcGxheWVycylcclxuICAgIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuVUlTcGVjdGF0ZS5Sb29tUHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuVUlTcGVjdGF0ZS5TY3JvbGxCYXJDb250ZW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdSb29tTGlzdEhhbmRsZXInKS5TZXRSb29tTmFtZShfbmFtZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ1Jvb21MaXN0SGFuZGxlcicpLlNldFBsYXllckNvdW50KF9wbGF5ZXJzKTtcclxuICAgICAgICBUb3RhbFJvb20ucHVzaChub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRSb29tTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFRvdGFsUm9vbS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgVG90YWxSb29tW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUb3RhbFJvb209W107XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRfU3BlY3RhdGVVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuRXhpdENvbm5lY3RpbmcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgTG9nb3V0KClcclxuICAgIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2xlYXJEYXRhXCIpOyAvL2Z1bmN0aW9uIHdyaXR0ZW4gaW4gc3RvcmFnZSBNYW5hZ2VyIGNsYXNzXHJcblxyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKSE9bnVsbClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpIT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkhPW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkhPW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIFNob3dUb2FzdDpmdW5jdGlvbihtc2csX3RpbWU9MjAwMClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvYXN0Tm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLlRvYXN0Tm9kZS5jaGlsZHJlblsxXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1tc2c7XHJcbiAgICAgICAgdmFyIFNlbGZUb2FzdD10aGlzO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgIFNlbGZUb2FzdC5Ub2FzdE5vZGUuYWN0aXZlPWZhbHNlOyB9LCBfdGltZSk7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzPSBVSU1hbmFnZXI7XHJcbiJdfQ==