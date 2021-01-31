
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

var _ServerBackend = _interopRequireDefault(require("./ServerBackend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GamePlayReferenceManager = null;
var TweenRef;
var TotalRoom = [];
var AvatarSelection = 0;
var _tempAvatarSelection = 0;
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
}); //-------------------------------------------class for AvatarUI-------------------------//

var AvatarUI = cc.Class({
  name: "AvatarUI",
  properties: {
    AvatarSelectionScreen: {
      displayName: "AvatarSelectionScreen",
      "default": null,
      type: cc.Node,
      serializable: true
    },
    AvatarNodes: {
      displayName: "AvatarNodes",
      "default": [],
      type: [cc.Node],
      serializable: true
    },
    AvatarButtons: {
      displayName: "AvatarButtons",
      "default": [],
      type: [cc.Node],
      serializable: true
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
    AvatarUISetup: {
      displayName: "AvatarUISetup",
      "default": null,
      type: AvatarUI,
      serializable: true,
      tooltip: "reference to AvatarUI class intance"
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
    AvatarSelection = 0;
    _tempAvatarSelection = 0;
  },
  onEnable: function onEnable() {
    //events subscription to be called
    cc.systemEvent.on("AssignProfileData", this.AssignProfileData, this);
    cc.systemEvent.on("UpdateStatusWindow", this.UpdateStatusWindow, this);
    cc.systemEvent.on("ChangePanelScreen", this.ChangePanelScreen, this);
  },
  onDisable: function onDisable() {
    cc.systemEvent.off("AssignProfileData", this.AssignProfileData, this);
    cc.systemEvent.off("UpdateStatusWindow", this.UpdateStatusWindow, this);
    cc.systemEvent.off("ChangePanelScreen", this.ChangePanelScreen, this);
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
    this.LicenseText = "";
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
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
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
    this.VersesPlayerMode(); //this.ToggleModeSelection(true);
  },
  BackSelectionMode: function BackSelectionMode() {
    this.ResetPlayerCountInput();
    this.ToggleModeSelection(false);
  },
  ToggleModeSelection: function ToggleModeSelection(_state) {
    this.ModeSelectionScreen.active = _state;
  },
  VersesPlayerMode: function VersesPlayerMode() {
    // if(this.TotalPlayers=="")
    // {
    //     this.ShowToast("please enter player amount for multiplayer from 2-6, make sure to have same amount on different connecting devices if you want to connect them.",3500);
    // }
    // else
    // {
    //     var _players=parseInt(this.TotalPlayers);
    //     if(_players>=2 && _players<=6)
    //     {
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleModeSelection(2);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleShowRoom_Bool(false);
    this.UIProfile.StatusNode.active = true; //this.UIProfile.PlayButtonNode.active=false;

    this.UIProfile.StatusLabel.string = ""; //GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers=_players;

    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isConnectedToMaster() || GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isInLobby()) {
      cc.systemEvent.emit("UpdateStatusWindow", "waiting for other players...");
      GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinRandomRoom();
    } else {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().RequestConnection();
    } //     }
    //     else
    //     {
    //         this.ResetPlayerCountInput();
    //         this.ShowToast("please enter player amount for multiplayer from 2-6, make sure to have same amount on different connecting devices if you want to connect them.",3500);
    //     }
    // }

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
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ResetRoomValues();
    GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
  },
  ToggleLoadingNode: function ToggleLoadingNode(state) {
    this.LoadingNode.active = state;
  },
  LoginUser: function LoginUser() {
    if (this.EmailText != "" && this.PasswordText != "") {
      this.ToggleLoadingNode(true);
      var anim = this.LoadingNode.children[0].children[1].getComponent(cc.Animation);
      anim.play("loading");
      GamePlayReferenceManager.Instance.Get_ServerBackend().LoginUser(this.EmailText, this.PasswordText, this.SelectedRole, this.LicenseText);
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
  SetLicenseText: function SetLicenseText(text) {
    this.LicenseText = text;
  },
  ToggleUIContainer: function ToggleUIContainer(_mainIndex) {
    for (var index = 0; index < this.UIContainer.length; index++) {
      if (_mainIndex == index) this.UIContainer[index].active = true;else this.UIContainer[index].active = false;
    }
  },
  AssignAvatar: function AssignAvatar(_index) {
    if (_index === void 0) {
      _index = 0;
    }

    for (var index = 0; index < this.AvatarUISetup.AvatarNodes.length; index++) {
      if (_index == index) this.AvatarUISetup.AvatarNodes[index].active = true;else this.AvatarUISetup.AvatarNodes[index].active = false;
    }
  },
  ToggleAvatarScreen: function ToggleAvatarScreen(_state) {
    this.AvatarUISetup.AvatarSelectionScreen.active = _state;
  },
  EnableAvatarScreen: function EnableAvatarScreen() {
    this.ToggleAvatarScreen(true);

    for (var index = 0; index < this.AvatarUISetup.AvatarButtons.length; index++) {
      if (AvatarSelection == index) this.AvatarUISetup.AvatarButtons[index].children[1].active = true;else this.AvatarUISetup.AvatarButtons[index].children[1].active = false;
    }
  },
  DisableAvatarScreen: function DisableAvatarScreen() {
    this.ToggleAvatarScreen(false);

    if (_tempAvatarSelection != AvatarSelection) {
      AvatarSelection = _tempAvatarSelection;
      this.AssignAvatar(AvatarSelection);
      this.AssignDataClasses(AvatarSelection);
      GamePlayReferenceManager.Instance.Get_ServerBackend().UpdateUserData(-1, -1, AvatarSelection);
    }
  },
  AssignAvatarSelection: function AssignAvatarSelection(event) {
    if (event === void 0) {
      event = null;
    }

    _tempAvatarSelection = parseInt(event.currentTarget.name.split("_")[1]);
    console.log(_tempAvatarSelection);

    for (var index = 0; index < this.AvatarUISetup.AvatarButtons.length; index++) {
      if (_tempAvatarSelection == index) this.AvatarUISetup.AvatarButtons[index].children[1].active = true;else this.AvatarUISetup.AvatarButtons[index].children[1].active = false;
    }
  },
  AssignDataClasses: function AssignDataClasses(_ID) {
    GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.avatarId = _ID.toString();
    GamePlayReferenceManager.Instance.Get_ServerBackend().TeacherData.avatarId = _ID.toString();
    GamePlayReferenceManager.Instance.Get_ServerBackend().MentorData.avatarId = _ID.toString();
    GamePlayReferenceManager.Instance.Get_ServerBackend().AdminData = _ID.toString();
    GamePlayReferenceManager.Instance.Get_ServerBackend().DirectorData.avatarId = _ID.toString();
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
    if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 1) {
      //means successful
      this.ChangePanelScreen(true, false, "");

      if (_isStudent) {
        this.ToggleUIContainer(0);
        this.TogglePlayButton(true);
        this.ToggleSpectateButton(false);
        this.UIProfile.CashNode.active = true;
        console.log(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);

        var _avatar = parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.avatarId);

        if (_avatar == undefined || isNaN(_avatar) == true || _avatar == null) {
          _avatar = 0;
        }

        this.AssignAvatar(_avatar);
        AvatarSelection = _avatar;
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

        var _avatar = parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().TeacherData.avatarId);

        if (_avatar == undefined || isNaN(_avatar) == true || _avatar == null) {
          _avatar = 0;
        }

        this.AssignAvatar(_avatar);
        AvatarSelection = _avatar;
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

        var _avatar = parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().MentorData.avatarId);

        if (_avatar == undefined || isNaN(_avatar) == true || _avatar == null) {
          _avatar = 0;
        }

        this.AssignAvatar(_avatar);
        AvatarSelection = _avatar;
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

        var _avatar = parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().AdminData.avatarId);

        if (_avatar == undefined || isNaN(_avatar) == true || _avatar == null) {
          _avatar = 0;
        }

        this.AssignAvatar(_avatar);
        AvatarSelection = _avatar;
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

        var _avatar = parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().DirectorData.avatarId);

        if (_avatar == undefined || isNaN(_avatar) == true || _avatar == null) {
          _avatar = 0;
        }

        this.AssignAvatar(_avatar);
        AvatarSelection = _avatar;
        this.DirectorUIProfile.NameLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().DirectorData.name;
        this.DirectorUIProfile.EmailAddressLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().DirectorData.emailAddress;
        this.ToggleLoadingNode(false);
      }
    } else if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 2) {
      //user not found
      this.ToggleLoadingNode(false);
      this.ShowToast("no user registered with entered email.");
    } else if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 3) {
      //pass/email invalid
      this.ToggleLoadingNode(false);
      this.ShowToast("user email or password is wrong");
    } else if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 4) {
      //something went wrong
      this.ToggleLoadingNode(false);
      this.ShowToast("something went wrong please try again.");
    } else if (parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().ResponseType) == 5) {
      //something went wrong
      this.ToggleLoadingNode(false);
      this.ShowToast("license key is not valid.");
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
    node.getComponent("RoomListHandler").SetRoomName(_name);
    node.getComponent("RoomListHandler").SetPlayerCount(_players);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxVSU1hbmFnZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHdlZW5SZWYiLCJUb3RhbFJvb20iLCJBdmF0YXJTZWxlY3Rpb24iLCJfdGVtcEF2YXRhclNlbGVjdGlvbiIsIlJvbGVzIiwiUHJvZmlsZVVJIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiTmFtZUxhYmVsIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiRW1haWxBZGRyZXNzTGFiZWwiLCJET0JMYWJlbCIsIkdyYWRlTGV2ZWxMYWJlbCIsIlRlYWNoZXJOYW1lTGFiZWwiLCJHYW1lc1dvbkxhYmVsIiwiRkJQYWdlTGFiZWwiLCJUZXN0VGFrZW5MYWJlbCIsIlRlc3RpbmdBdmdMYWJlbCIsIkNhc2hMYWJlbCIsIlN0YXR1c05vZGUiLCJOb2RlIiwiUGxheUJ1dHRvbk5vZGUiLCJTdGF0dXNMYWJlbCIsIlBsYXllckNvdW50SW5wdXQiLCJFZGl0Qm94IiwiRGlzdHJpY3RMYWJlbCIsIlBsYXlHYW1lQnV0dG9uIiwiU3BlY3RhdGVCdXR0b24iLCJDYXNoTm9kZSIsIlRlYWNoZXJQcm9maWxlVUkiLCJDbGFzc1RhdWdodCIsIlNjaG9vbE5hbWVMYWJlbCIsIkNvbnRhY3RMYWJlbCIsIk1lbnRvclByb2ZpbGVVSSIsIkFkZHJlc3NsYWJlbCIsIkFkbWluUHJvZmlsZVVJIiwiRGlyZWN0b3JQcm9maWxlVUkiLCJTcGVjdGF0ZVVJIiwiUm9vbVNjcmVlbk5vZGUiLCJTY3JvbGxCYXJDb250ZW50IiwiUHJvZmlsZVNjcmVlbk5vZGUiLCJSb29tUHJlZmFiIiwiUHJlZmFiIiwiQXZhdGFyVUkiLCJBdmF0YXJTZWxlY3Rpb25TY3JlZW4iLCJBdmF0YXJOb2RlcyIsIkF2YXRhckJ1dHRvbnMiLCJVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJVSVByb2ZpbGUiLCJUZWFjaGVyVUlQcm9maWxlIiwiTWVudG9yVUlQcm9maWxlIiwiQWRtaW5VSVByb2ZpbGUiLCJEaXJlY3RvclVJUHJvZmlsZSIsIkF2YXRhclVJU2V0dXAiLCJTY3JlZW5Ob2RlcyIsIlR3ZWVuTWFuYWdlclJlZiIsIkxvZ28iLCJUb2FzdE5vZGUiLCJMb2FkaW5nTm9kZSIsIlJlZmVyZW5jZU1hbmFnZXJSZWYiLCJNb2RlU2VsZWN0aW9uU2NyZWVuIiwiVUlTcGVjdGF0ZSIsIlVJQ29udGFpbmVyIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiQXNzaWduUHJvZmlsZURhdGEiLCJVcGRhdGVTdGF0dXNXaW5kb3ciLCJDaGFuZ2VQYW5lbFNjcmVlbiIsIm9uRGlzYWJsZSIsIm9mZiIsIm9uTG9hZCIsImdldENvbXBvbmVudCIsIlNlbGVjdGVkUm9sZSIsIlNlbGVjdGVkUm9sZUluZGV4IiwiRW1haWxUZXh0IiwiUGFzc3dvcmRUZXh0IiwiTGljZW5zZVRleHQiLCJub2RlQ291bnRlciIsIlN0YXR1c1RleHQiLCJUb3RhbFBsYXllcnMiLCJSZXNldFBsYXllckNvdW50SW5wdXQiLCJHZXRUd2Vlbk1hbmFnZXJSZWZlcmVuY2UiLCJTbGlkZUluTG9naW5Db21wb25lbnRzIiwiUmVwZWF0TG9nb0FuaW1hdGlvbiIsIkNoZWNrUmVmZXJlbmNlcyIsIlRvZ2dsZVBsYXlCdXR0b24iLCJfc3RhdGUiLCJhY3RpdmUiLCJUb2dnbGVTcGVjdGF0ZUJ1dHRvbiIsInJlcXVpcmUiLCJpc05leHQiLCJjaGFuZ2VTY3JlZW4iLCJzY2VuZU5hbWUiLCJGYWRlTm9kZUluT3V0IiwibGVuZ3RoIiwic2V0VGltZW91dCIsIk1hbmlwdWxhdGVOb2RlcyIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiY291bnRlciIsImluZGV4IiwiY29uc29sZSIsImxvZyIsIkxvZ2luU2NyZWVuVHdlZW4iLCJjaGlsZHJlbiIsIlJlcGVhdFR3ZWVuU2NhbGUiLCJzdHJpbmciLCJPbnBsYXllck51bWJlckNoYW5nZWQiLCJfbnVtYmVyIiwiUGxheUdhbWUiLCJWZXJzZXNQbGF5ZXJNb2RlIiwiQmFja1NlbGVjdGlvbk1vZGUiLCJUb2dnbGVNb2RlU2VsZWN0aW9uIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZVNob3dSb29tX0Jvb2wiLCJnZXRQaG90b25SZWYiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5IiwiZW1pdCIsIkpvaW5SYW5kb21Sb29tIiwiUmVxdWVzdENvbm5lY3Rpb24iLCJWZXJzZXNBSU1vZGUiLCJNYXhQbGF5ZXJzIiwiSm9pbmVkUm9vbSIsIm1zZyIsIkV4aXRDb25uZWN0aW5nIiwiUmVzZXRSb29tVmFsdWVzIiwiRGlzY29ubmVjdFBob3RvbiIsIlRvZ2dsZUxvYWRpbmdOb2RlIiwic3RhdGUiLCJMb2dpblVzZXIiLCJhbmltIiwiQW5pbWF0aW9uIiwicGxheSIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU2hvd1RvYXN0IiwiT25Sb2xlVG9nZ2xlZCIsIl92YWwiLCJub2RlIiwic3BsaXQiLCJTZXRFbWFpbFRleHQiLCJ0ZXh0IiwiU2V0UGFzc3dvcmRUZXh0IiwiU2V0TGljZW5zZVRleHQiLCJUb2dnbGVVSUNvbnRhaW5lciIsIl9tYWluSW5kZXgiLCJBc3NpZ25BdmF0YXIiLCJfaW5kZXgiLCJUb2dnbGVBdmF0YXJTY3JlZW4iLCJFbmFibGVBdmF0YXJTY3JlZW4iLCJEaXNhYmxlQXZhdGFyU2NyZWVuIiwiQXNzaWduRGF0YUNsYXNzZXMiLCJVcGRhdGVVc2VyRGF0YSIsIkFzc2lnbkF2YXRhclNlbGVjdGlvbiIsImV2ZW50IiwicGFyc2VJbnQiLCJjdXJyZW50VGFyZ2V0IiwiX0lEIiwiU3R1ZGVudERhdGEiLCJhdmF0YXJJZCIsInRvU3RyaW5nIiwiVGVhY2hlckRhdGEiLCJNZW50b3JEYXRhIiwiQWRtaW5EYXRhIiwiRGlyZWN0b3JEYXRhIiwiX2lzU3R1ZGVudCIsIl9pc1RlYWNoZXIiLCJfaXNNZW50b3IiLCJfaXNBZG1pbiIsIl9pc0RpcmVjdG9yIiwiUmVzcG9uc2VUeXBlIiwiX2F2YXRhciIsInVuZGVmaW5lZCIsImlzTmFOIiwiZW1haWxBZGRyZXNzIiwiZE9CIiwiZ3JhZGVMZXZlbCIsInRlYWNoZXJOYW1lIiwiZ2FtZXNXb24iLCJmYWNlYm9va1BhZ2UiLCJ0ZXN0c1Rha2VuIiwidGVzdGluZ0F2ZXJhZ2UiLCJnYW1lQ2FzaCIsImNsYXNzVGF1Z2h0Iiwic2Nob29sIiwiY29udGFjdE51bWJlciIsImFkZHJlc3MiLCJzY2hvb2xOYW1lIiwiVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJIiwiVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJIiwiU2hvd0F2YWlsYWJsZVJvb21zX1NwZWN0YXRlVUkiLCJVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSSIsIl9uYW1lIiwiX3BsYXllcnMiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIlNldFJvb21OYW1lIiwiU2V0UGxheWVyQ291bnQiLCJwdXNoIiwiUmVzZXRSb29tTGlzdCIsImRlc3Ryb3kiLCJFeGl0X1NwZWN0YXRlVUkiLCJMb2dvdXQiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIl90aW1lIiwiU2VsZlRvYXN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBLElBQUlBLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsUUFBSjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLGVBQWUsR0FBRyxDQUF0QjtBQUNBLElBQUlDLG9CQUFvQixHQUFHLENBQTNCO0FBQ0EsSUFBSUMsS0FBSyxHQUFHLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsbUJBQXZCLEVBQTRDLGFBQTVDLEVBQTJELGlCQUEzRCxDQUFaLEVBQ0E7O0FBQ0EsSUFBSUMsU0FBUyxH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O0FBQ0EsUUFBSW9GLFNBQVMsR0FBRyxJQUFoQjtBQUNBakgsSUFBQUEsVUFBVSxDQUFDLFlBQVk7QUFDckJpSCxNQUFBQSxTQUFTLENBQUMzSixTQUFWLENBQW9Ca0MsTUFBcEIsR0FBNkIsS0FBN0I7QUFDRCxLQUZTLEVBRVB3SCxLQUZPLENBQVY7QUFHRDtBQXRsQnNCLENBQVQsQ0FBaEI7QUF5bEJBRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJ4SyxTQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFR3ZWVlbiBmcm9tIFwiVHdlZW5NYW5hZ2VyXCI7XHJcbmltcG9ydCBTZXJ2ZXJCYWNrZW5kIGZyb20gXCIuL1NlcnZlckJhY2tlbmRcIjtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBUd2VlblJlZjtcclxudmFyIFRvdGFsUm9vbSA9IFtdO1xyXG52YXIgQXZhdGFyU2VsZWN0aW9uID0gMDtcclxudmFyIF90ZW1wQXZhdGFyU2VsZWN0aW9uID0gMDtcclxudmFyIFJvbGVzID0gW1wiU3R1ZGVudFwiLCBcIlRlYWNoZXJcIiwgXCJQcm9ncmFtQW1iYXNzYWRvclwiLCBcIlNjaG9vbEFkbWluXCIsIFwiUHJvZ3JhbURpcmVjdG9yXCJdO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUHJvZmlsZSBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUHJvZmlsZVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUHJvZmlsZVVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5hbWVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgRW1haWxBZGRyZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRW1haWxBZGRyZXNzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBlbWFpbCBhZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGUgXCIsXHJcbiAgICB9LFxyXG4gICAgRE9CTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRE9CXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIERPQiBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgR3JhZGVMZXZlbExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdyYWRlTGV2ZWxcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gR3JhZGUgTGV2ZWwgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIFRlYWNoZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGVhY2hlck5hbWVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gVGVhY2hlciBOYW1lIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBHYW1lc1dvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdhbWVzV29uXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGdhbWVzIHdvbiBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgRkJQYWdlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRkJQYWdlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGZhY2Vib29rIHBhZ2UgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIFRlc3RUYWtlbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRlc3RUYWtlblwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byB0ZXN0IHRha2VuIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBUZXN0aW5nQXZnTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGVzdGluZ0F2ZXJhZ2VcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gVGVzdGluZyBBdmVyYWdlIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBjYXNoIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBTdGF0dXNOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0YXR1c1NjcmVlblwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFN0YXR1cyBTY3JlZW4gb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXlCdXR0b25Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXlCdXR0b25cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBwbGF5IGJ1dHRvbiBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgU3RhdHVzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RhdHVzVGV4dFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTdGF0dXMgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllckNvdW50SW5wdXQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ291bnRJbnB1dFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFBsYXllckNvdW50SW5wdXQgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIERpc3RyaWN0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGlzdHJpY3RMYWJlbFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBEaXN0cmljdExhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5R2FtZUJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5R2FtZUJ1dHRvblwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFBsYXlHYW1lQnV0dG9uIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBTcGVjdGF0ZUJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTcGVjdGF0ZUJ1dHRvblwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFNwZWN0YXRlQnV0dG9uIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTm9kZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIENhc2hOb2RlIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciB0ZWFjaGVyIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFRlYWNoZXJQcm9maWxlVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJUZWFjaGVyUHJvZmlsZVVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5hbWVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgRW1haWxBZGRyZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRW1haWxBZGRyZXNzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBlbWFpbCBhZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGUgXCIsXHJcbiAgICB9LFxyXG4gICAgQ2xhc3NUYXVnaHQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2xhc3NUYXVnaHRcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQ2xhc3NUYXVnaHQgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIFNjaG9vbE5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY2hvb2xOYW1lXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFNjaG9vbE5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIENvbnRhY3RMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDb250YWN0XCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIENvbnRhY3QgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBNZW50b3IgUHJvZmlsZSBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgTWVudG9yUHJvZmlsZVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiTWVudG9yUHJvZmlsZVVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5hbWVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgRW1haWxBZGRyZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRW1haWxBZGRyZXNzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBlbWFpbCBhZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGUgXCIsXHJcbiAgICB9LFxyXG4gICAgQWRkcmVzc2xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkZHJlc3NcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgQ29udGFjdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNvbnRhY3RcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQ29udGFjdCBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEFkbWluIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEFkbWluUHJvZmlsZVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQWRtaW5Qcm9maWxlVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFbWFpbEFkZHJlc3NcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGVtYWlsIGFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZSBcIixcclxuICAgIH0sXHJcbiAgICBTY2hvb2xOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nob29sTmFtZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTY2hvb2xOYW1lIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBDb250YWN0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ29udGFjdFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBDb250YWN0IGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgZGlyZWN0b3IgUHJvZmlsZSBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRGlyZWN0b3JQcm9maWxlVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJEaXJlY3RvclByb2ZpbGVVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFNwZWN0YXRlVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFNwZWN0YXRlVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTcGVjdGF0ZVVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUm9vbVNjcmVlbk5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUm9vbVNjcmVlblwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBub2RlIG9mIHJvb20gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQmFyQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxCYXJDb250ZW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2YgU2Nyb2xsQmFyQ29udGVudCBvZiByb29tIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFByb2ZpbGVTY3JlZW5Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByb2ZpbGVTY3JlZW5cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byB0aGUgbm9kZSBvZiBwcm9maWxlIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFJvb21QcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUm9vbVByZWZhYlwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBSb29tIG9uIHJvb20gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEF2YXRhclVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBBdmF0YXJVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkF2YXRhclVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgQXZhdGFyU2VsZWN0aW9uU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhclNlbGVjdGlvblNjcmVlblwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQXZhdGFyTm9kZXM6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFyTm9kZXNcIixcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEF2YXRhckJ1dHRvbnM6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFyQnV0dG9uc1wiLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFVJTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVUlNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVUlNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBVSVByb2ZpbGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVUlQcm9maWxlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFByb2ZpbGVVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBQcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgfSxcclxuICAgIFRlYWNoZXJVSVByb2ZpbGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGVhY2hlclVJUHJvZmlsZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBUZWFjaGVyUHJvZmlsZVVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFRlYWNoZXJQcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBNZW50b3JVSVByb2ZpbGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWVudG9yVUlQcm9maWxlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IE1lbnRvclByb2ZpbGVVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBNZW50b3JQcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBBZG1pblVJUHJvZmlsZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBZG1pblVJUHJvZmlsZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBBZG1pblByb2ZpbGVVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBBZG1pblByb2ZpbGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIERpcmVjdG9yVUlQcm9maWxlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpcmVjdG9yVUlQcm9maWxlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IERpcmVjdG9yUHJvZmlsZVVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIERpcmVjdG9yUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgIH0sXHJcblxyXG4gICAgQXZhdGFyVUlTZXR1cDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBdmF0YXJVSVNldHVwXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEF2YXRhclVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIEF2YXRhclVJIGNsYXNzIGludGFuY2VcIixcclxuICAgIH0sXHJcblxyXG4gICAgU2NyZWVuTm9kZXM6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2NyZWVuTm9kZXNcIixcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBsb2dpbiBzY3JlZW4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR3ZWVuTWFuYWdlclJlZjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUd2Vlbk1hbmFnZXJSZWZcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgVHdlZW4gTWFuYWdlciBTY3JpcHQgXCIsXHJcbiAgICB9LFxyXG4gICAgTG9nbzoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2dvTm9kZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgbG9nbyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG9hc3ROb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvYXN0Tm9kZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgdG9hc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYWRpbmdOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYWRpbmdOb2RlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIHRoZSBMb2FkaW5nIE5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZWZlcmVuY2VNYW5hZ2VyUmVmOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlZmVyZW5jZU1hbmFnZXJSZWZcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIHJlZmVyZW5jZSBtYW5hZ2VyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBNb2RlU2VsZWN0aW9uU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vZGVTZWxlY3Rpb25TY3JlZW5cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBtb2RlIHNlbGVjdGlvbiBzY3JlZW4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFVJU3BlY3RhdGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVUlTcGVjdGF0ZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBTcGVjdGF0ZVVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFNwZWN0YXRlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgfSxcclxuICAgIFVJQ29udGFpbmVyOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlVJQ29udGFpbmVyXCIsXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gVUlDb250YWluZXIgbm9kZXNcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgc3RhdGljczoge1xyXG4gICAgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICBJbnN0YW5jZTogbnVsbCxcclxuICB9LFxyXG5cclxuICBSZXNldEFsbERhdGEoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgVHdlZW5SZWY7XHJcbiAgICBUb3RhbFJvb20gPSBbXTtcclxuICAgIEF2YXRhclNlbGVjdGlvbiA9IDA7XHJcbiAgICBfdGVtcEF2YXRhclNlbGVjdGlvbiA9IDA7XHJcbiAgfSxcclxuXHJcbiAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vZXZlbnRzIHN1YnNjcmlwdGlvbiB0byBiZSBjYWxsZWRcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiQXNzaWduUHJvZmlsZURhdGFcIiwgdGhpcy5Bc3NpZ25Qcm9maWxlRGF0YSwgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCB0aGlzLlVwZGF0ZVN0YXR1c1dpbmRvdywgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRoaXMuQ2hhbmdlUGFuZWxTY3JlZW4sIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiQXNzaWduUHJvZmlsZURhdGFcIiwgdGhpcy5Bc3NpZ25Qcm9maWxlRGF0YSwgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgdGhpcy5VcGRhdGVTdGF0dXNXaW5kb3csIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdGhpcy5DaGFuZ2VQYW5lbFNjcmVlbiwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5SZXNldEFsbERhdGEoKTtcclxuICAgIHRoaXMuUmVmZXJlbmNlTWFuYWdlclJlZiA9IHRoaXMuUmVmZXJlbmNlTWFuYWdlclJlZi5nZXRDb21wb25lbnQoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcblxyXG4gICAgdGhpcy5TZWxlY3RlZFJvbGUgPSBSb2xlc1swXTtcclxuICAgIHRoaXMuU2VsZWN0ZWRSb2xlSW5kZXggPSAwO1xyXG4gICAgVUlNYW5hZ2VyLkluc3RhbmNlID0gdGhpcztcclxuICAgIFRvdGFsUm9vbSA9IFtdO1xyXG4gICAgLy9Qcml2YXRlIFZhcmlhYmxlc1xyXG4gICAgdGhpcy5FbWFpbFRleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5QYXNzd29yZFRleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5MaWNlbnNlVGV4dCA9IFwiXCI7XHJcbiAgICB0aGlzLm5vZGVDb3VudGVyID0gMDtcclxuICAgIHRoaXMuU3RhdHVzVGV4dCA9IFwiXCI7XHJcbiAgICB0aGlzLlRvdGFsUGxheWVycyA9IFwiXCI7XHJcbiAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG5cclxuICAgIHRoaXMuR2V0VHdlZW5NYW5hZ2VyUmVmZXJlbmNlKCk7XHJcbiAgICB0aGlzLlNsaWRlSW5Mb2dpbkNvbXBvbmVudHMoKTtcclxuICAgIHRoaXMuUmVwZWF0TG9nb0FuaW1hdGlvbigpO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVQbGF5QnV0dG9uKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuUGxheUdhbWVCdXR0b24uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNwZWN0YXRlQnV0dG9uKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3BlY3RhdGVCdXR0b24uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZVBhbmVsU2NyZWVuOiBmdW5jdGlvbiAoaXNOZXh0LCBjaGFuZ2VTY3JlZW4sIHNjZW5lTmFtZSkge1xyXG4gICAgVHdlZW5SZWYuRmFkZU5vZGVJbk91dCh0aGlzLlNjcmVlbk5vZGVzW3RoaXMubm9kZUNvdW50ZXJdLCAwLjU1LCAyNTUsIDAsIFwicXVhZEluT3V0XCIpO1xyXG5cclxuICAgIGlmIChjaGFuZ2VTY3JlZW4gPT0gZmFsc2UpIHtcclxuICAgICAgaWYgKGlzTmV4dCA9PSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZUNvdW50ZXIgPCB0aGlzLlNjcmVlbk5vZGVzLmxlbmd0aCkgdGhpcy5ub2RlQ291bnRlciA9IHRoaXMubm9kZUNvdW50ZXIgKyAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGVDb3VudGVyID4gMCkgdGhpcy5ub2RlQ291bnRlciA9IHRoaXMubm9kZUNvdW50ZXIgLSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuTWFuaXB1bGF0ZU5vZGVzKHRoaXMubm9kZUNvdW50ZXIpO1xyXG4gICAgICB9LCA2MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHNjZW5lTmFtZSk7XHJcbiAgICAgIH0sIDYwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgTWFuaXB1bGF0ZU5vZGVzOiBmdW5jdGlvbiAoY291bnRlcikge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuU2NyZWVuTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChjb3VudGVyID09IGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5TY3JlZW5Ob2Rlc1tpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNldGluZyBpdCB0cnVlXCIpO1xyXG4gICAgICAgIFR3ZWVuUmVmLkZhZGVOb2RlSW5PdXQodGhpcy5TY3JlZW5Ob2Rlc1tpbmRleF0sIDEuNSwgMCwgMjU1LCBcInF1YWRJbk91dFwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNjcmVlbk5vZGVzW2luZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNsaWRlSW5Mb2dpbkNvbXBvbmVudHM6IGZ1bmN0aW9uICgpIHtcclxuICAgIFR3ZWVuUmVmLkxvZ2luU2NyZWVuVHdlZW4odGhpcy5TY3JlZW5Ob2Rlc1t0aGlzLm5vZGVDb3VudGVyXS5jaGlsZHJlblsxXSwgLTEwMDApO1xyXG4gIH0sXHJcblxyXG4gIFJlcGVhdExvZ29BbmltYXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIFR3ZWVuUmVmLlJlcGVhdFR3ZWVuU2NhbGUodGhpcy5Mb2dvLCAxLjEsIDEsIDAuOCk7XHJcbiAgfSxcclxuXHJcbiAgR2V0VHdlZW5NYW5hZ2VyUmVmZXJlbmNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBUd2VlblJlZiA9IHRoaXMuVHdlZW5NYW5hZ2VyUmVmLmdldENvbXBvbmVudChcIlR3ZWVuTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBSZXNldFBsYXllckNvdW50SW5wdXQoKSB7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5QbGF5ZXJDb3VudElucHV0LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLlRvdGFsUGxheWVycyA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgT25wbGF5ZXJOdW1iZXJDaGFuZ2VkKF9udW1iZXIpIHtcclxuICAgIHRoaXMuVG90YWxQbGF5ZXJzID0gX251bWJlcjtcclxuICB9LFxyXG5cclxuICBQbGF5R2FtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgIHRoaXMuVmVyc2VzUGxheWVyTW9kZSgpO1xyXG4gICAgLy90aGlzLlRvZ2dsZU1vZGVTZWxlY3Rpb24odHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgQmFja1NlbGVjdGlvbk1vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICB0aGlzLlRvZ2dsZU1vZGVTZWxlY3Rpb24oZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZU1vZGVTZWxlY3Rpb24oX3N0YXRlKSB7XHJcbiAgICB0aGlzLk1vZGVTZWxlY3Rpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFZlcnNlc1BsYXllck1vZGUoKSB7XHJcbiAgICAvLyBpZih0aGlzLlRvdGFsUGxheWVycz09XCJcIilcclxuICAgIC8vIHtcclxuICAgIC8vICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBlbnRlciBwbGF5ZXIgYW1vdW50IGZvciBtdWx0aXBsYXllciBmcm9tIDItNiwgbWFrZSBzdXJlIHRvIGhhdmUgc2FtZSBhbW91bnQgb24gZGlmZmVyZW50IGNvbm5lY3RpbmcgZGV2aWNlcyBpZiB5b3Ugd2FudCB0byBjb25uZWN0IHRoZW0uXCIsMzUwMCk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBlbHNlXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgdmFyIF9wbGF5ZXJzPXBhcnNlSW50KHRoaXMuVG90YWxQbGF5ZXJzKTtcclxuICAgIC8vICAgICBpZihfcGxheWVycz49MiAmJiBfcGxheWVyczw9NilcclxuICAgIC8vICAgICB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZU1vZGVTZWxlY3Rpb24oMik7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZVNob3dSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgLy90aGlzLlVJUHJvZmlsZS5QbGF5QnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM9X3BsYXllcnM7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNDb25uZWN0ZWRUb01hc3RlcigpIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNJbkxvYmJ5KCkpIHtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcIndhaXRpbmcgZm9yIG90aGVyIHBsYXllcnMuLi5cIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuSm9pblJhbmRvbVJvb20oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVxdWVzdENvbm5lY3Rpb24oKTtcclxuICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2UgZW50ZXIgcGxheWVyIGFtb3VudCBmb3IgbXVsdGlwbGF5ZXIgZnJvbSAyLTYsIG1ha2Ugc3VyZSB0byBoYXZlIHNhbWUgYW1vdW50IG9uIGRpZmZlcmVudCBjb25uZWN0aW5nIGRldmljZXMgaWYgeW91IHdhbnQgdG8gY29ubmVjdCB0aGVtLlwiLDM1MDApO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICB9LFxyXG5cclxuICBWZXJzZXNBSU1vZGUoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZU1vZGVTZWxlY3Rpb24oMSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZVNob3dSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IDI7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic2V0dGluZyB1cCBnYW1lLi4uXCIpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcIndhaXRpbmcgZm9yIEFJIFNldHVwLi4uXCIpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0cnVlLCB0cnVlLCBcIkdhbWVQbGF5XCIpOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgIH0sIDEwMDApO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVN0YXR1c1dpbmRvdzogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgdGhpcy5TdGF0dXNUZXh0ID0gdGhpcy5TdGF0dXNUZXh0ICsgbXNnICsgXCJcXG5cIjtcclxuICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZyA9IHRoaXMuU3RhdHVzVGV4dDtcclxuICB9LFxyXG5cclxuICBFeGl0Q29ubmVjdGluZzogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuVUlQcm9maWxlLlBsYXlCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5FbWFpbFRleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5QYXNzd29yZFRleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5TdGF0dXNUZXh0ID0gXCJcIjtcclxuICAgIHRoaXMuVG90YWxQbGF5ZXJzID0gXCJcIjtcclxuICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlTG9hZGluZ05vZGUoc3RhdGUpIHtcclxuICAgIHRoaXMuTG9hZGluZ05vZGUuYWN0aXZlID0gc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgTG9naW5Vc2VyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5FbWFpbFRleHQgIT0gXCJcIiAmJiB0aGlzLlBhc3N3b3JkVGV4dCAhPSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUodHJ1ZSk7XHJcbiAgICAgIHZhciBhbmltID0gdGhpcy5Mb2FkaW5nTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgYW5pbS5wbGF5KFwibG9hZGluZ1wiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTG9naW5Vc2VyKHRoaXMuRW1haWxUZXh0LCB0aGlzLlBhc3N3b3JkVGV4dCwgdGhpcy5TZWxlY3RlZFJvbGUsIHRoaXMuTGljZW5zZVRleHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiRW1haWwgb3IgcGFzc3dvcmQgaW52YWxpZCBvciBlbXB0eS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25Sb2xlVG9nZ2xlZChfdmFsKSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKF92YWwpO1xyXG4gICAgY29uc29sZS5sb2coX3ZhbC5ub2RlLm5hbWUuc3BsaXQoXCJfXCIpWzFdKTtcclxuICAgIHRoaXMuU2VsZWN0ZWRSb2xlSW5kZXggPSBfdmFsLm5vZGUubmFtZS5zcGxpdChcIl9cIilbMV07XHJcbiAgICB0aGlzLlNlbGVjdGVkUm9sZSA9IFJvbGVzW3RoaXMuU2VsZWN0ZWRSb2xlSW5kZXhdO1xyXG4gIH0sXHJcblxyXG4gIFNldEVtYWlsVGV4dDogZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIHRoaXMuRW1haWxUZXh0ID0gdGV4dDtcclxuICB9LFxyXG5cclxuICBTZXRQYXNzd29yZFRleHQ6IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICB0aGlzLlBhc3N3b3JkVGV4dCA9IHRleHQ7XHJcbiAgfSxcclxuXHJcbiAgU2V0TGljZW5zZVRleHQ6IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICB0aGlzLkxpY2Vuc2VUZXh0ID0gdGV4dDtcclxuICB9LFxyXG5cclxuICBUb2dnbGVVSUNvbnRhaW5lcihfbWFpbkluZGV4KSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5VSUNvbnRhaW5lci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9tYWluSW5kZXggPT0gaW5kZXgpIHRoaXMuVUlDb250YWluZXJbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5VSUNvbnRhaW5lcltpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduQXZhdGFyKF9pbmRleCA9IDApIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkF2YXRhclVJU2V0dXAuQXZhdGFyTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfaW5kZXggPT0gaW5kZXgpIHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJOb2Rlc1tpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLkF2YXRhclVJU2V0dXAuQXZhdGFyTm9kZXNbaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUF2YXRhclNjcmVlbihfc3RhdGUpIHtcclxuICAgIHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJTZWxlY3Rpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUF2YXRhclNjcmVlbigpIHtcclxuICAgIHRoaXMuVG9nZ2xlQXZhdGFyU2NyZWVuKHRydWUpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkF2YXRhclVJU2V0dXAuQXZhdGFyQnV0dG9ucy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKEF2YXRhclNlbGVjdGlvbiA9PSBpbmRleCkgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhckJ1dHRvbnNbaW5kZXhdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhckJ1dHRvbnNbaW5kZXhdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIERpc2FibGVBdmF0YXJTY3JlZW4oKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUF2YXRhclNjcmVlbihmYWxzZSk7XHJcblxyXG4gICAgaWYgKF90ZW1wQXZhdGFyU2VsZWN0aW9uICE9IEF2YXRhclNlbGVjdGlvbikge1xyXG4gICAgICBBdmF0YXJTZWxlY3Rpb24gPSBfdGVtcEF2YXRhclNlbGVjdGlvbjtcclxuICAgICAgdGhpcy5Bc3NpZ25BdmF0YXIoQXZhdGFyU2VsZWN0aW9uKTtcclxuICAgICAgdGhpcy5Bc3NpZ25EYXRhQ2xhc3NlcyhBdmF0YXJTZWxlY3Rpb24pO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5VcGRhdGVVc2VyRGF0YSgtMSwgLTEsIEF2YXRhclNlbGVjdGlvbik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBBc3NpZ25BdmF0YXJTZWxlY3Rpb24oZXZlbnQgPSBudWxsKSB7XHJcbiAgICBfdGVtcEF2YXRhclNlbGVjdGlvbiA9IHBhcnNlSW50KGV2ZW50LmN1cnJlbnRUYXJnZXQubmFtZS5zcGxpdChcIl9cIilbMV0pO1xyXG4gICAgY29uc29sZS5sb2coX3RlbXBBdmF0YXJTZWxlY3Rpb24pO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkF2YXRhclVJU2V0dXAuQXZhdGFyQnV0dG9ucy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF90ZW1wQXZhdGFyU2VsZWN0aW9uID09IGluZGV4KSB0aGlzLkF2YXRhclVJU2V0dXAuQXZhdGFyQnV0dG9uc1tpbmRleF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLkF2YXRhclVJU2V0dXAuQXZhdGFyQnV0dG9uc1tpbmRleF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGF0YUNsYXNzZXMoX0lEKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5hdmF0YXJJZCA9IF9JRC50b1N0cmluZygpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuYXZhdGFySWQgPSBfSUQudG9TdHJpbmcoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLk1lbnRvckRhdGEuYXZhdGFySWQgPSBfSUQudG9TdHJpbmcoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YSA9IF9JRC50b1N0cmluZygpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuRGlyZWN0b3JEYXRhLmF2YXRhcklkID0gX0lELnRvU3RyaW5nKCk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduUHJvZmlsZURhdGE6IGZ1bmN0aW9uIChfaXNTdHVkZW50ID0gZmFsc2UsIF9pc1RlYWNoZXIgPSBmYWxzZSwgX2lzTWVudG9yID0gZmFsc2UsIF9pc0FkbWluID0gZmFsc2UsIF9pc0RpcmVjdG9yID0gZmFsc2UpIHtcclxuICAgIC8vY29uc29sZS5lcnJvcihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpKTtcclxuICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpID09IDEpIHtcclxuICAgICAgLy9tZWFucyBzdWNjZXNzZnVsXHJcbiAgICAgIHRoaXMuQ2hhbmdlUGFuZWxTY3JlZW4odHJ1ZSwgZmFsc2UsIFwiXCIpO1xyXG5cclxuICAgICAgaWYgKF9pc1N0dWRlbnQpIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVVJQ29udGFpbmVyKDApO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUGxheUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVNwZWN0YXRlQnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuXHJcbiAgICAgICAgdmFyIF9hdmF0YXIgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5hdmF0YXJJZCk7XHJcbiAgICAgICAgaWYgKF9hdmF0YXIgPT0gdW5kZWZpbmVkIHx8IGlzTmFOKF9hdmF0YXIpID09IHRydWUgfHwgX2F2YXRhciA9PSBudWxsKSB7XHJcbiAgICAgICAgICBfYXZhdGFyID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduQXZhdGFyKF9hdmF0YXIpO1xyXG4gICAgICAgIEF2YXRhclNlbGVjdGlvbiA9IF9hdmF0YXI7XHJcblxyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLkVtYWlsQWRkcmVzc0xhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5ET0JMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5kT0I7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuR3JhZGVMZXZlbExhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdyYWRlTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuVGVhY2hlck5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS50ZWFjaGVyTmFtZTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5HYW1lc1dvbkxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLkZCUGFnZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmZhY2Vib29rUGFnZTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5UZXN0VGFrZW5MYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS50ZXN0c1Rha2VuO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlRlc3RpbmdBdmdMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS50ZXN0aW5nQXZlcmFnZTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkIFwiICsgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2g7XHJcblxyXG4gICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB9IGVsc2UgaWYgKF9pc1RlYWNoZXIpIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVVJQ29udGFpbmVyKDEpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUGxheUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTcGVjdGF0ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5UZWFjaGVyRGF0YSk7XHJcblxyXG4gICAgICAgIHZhciBfYXZhdGFyID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuYXZhdGFySWQpO1xyXG4gICAgICAgIGlmIChfYXZhdGFyID09IHVuZGVmaW5lZCB8fCBpc05hTihfYXZhdGFyKSA9PSB0cnVlIHx8IF9hdmF0YXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgX2F2YXRhciA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkF2YXRhcihfYXZhdGFyKTtcclxuICAgICAgICBBdmF0YXJTZWxlY3Rpb24gPSBfYXZhdGFyO1xyXG5cclxuICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5UZWFjaGVyVUlQcm9maWxlLkVtYWlsQWRkcmVzc0xhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuQ2xhc3NUYXVnaHQuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuY2xhc3NUYXVnaHQ7XHJcbiAgICAgICAgdGhpcy5UZWFjaGVyVUlQcm9maWxlLlNjaG9vbE5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5UZWFjaGVyRGF0YS5zY2hvb2w7XHJcbiAgICAgICAgdGhpcy5UZWFjaGVyVUlQcm9maWxlLkNvbnRhY3RMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5UZWFjaGVyRGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB9IGVsc2UgaWYgKF9pc01lbnRvcikge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlVUlDb250YWluZXIoMik7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVNwZWN0YXRlQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLkNhc2hOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLk1lbnRvckRhdGEpO1xyXG5cclxuICAgICAgICB2YXIgX2F2YXRhciA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLk1lbnRvckRhdGEuYXZhdGFySWQpO1xyXG4gICAgICAgIGlmIChfYXZhdGFyID09IHVuZGVmaW5lZCB8fCBpc05hTihfYXZhdGFyKSA9PSB0cnVlIHx8IF9hdmF0YXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgX2F2YXRhciA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkF2YXRhcihfYXZhdGFyKTtcclxuICAgICAgICBBdmF0YXJTZWxlY3Rpb24gPSBfYXZhdGFyO1xyXG4gICAgICAgIHRoaXMuTWVudG9yVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5NZW50b3JVSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YS5lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5NZW50b3JVSVByb2ZpbGUuQWRkcmVzc2xhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLk1lbnRvckRhdGEuYWRkcmVzcztcclxuICAgICAgICB0aGlzLk1lbnRvclVJUHJvZmlsZS5Db250YWN0TGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB9IGVsc2UgaWYgKF9pc0FkbWluKSB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcigzKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVBsYXlCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhKTtcclxuXHJcbiAgICAgICAgdmFyIF9hdmF0YXIgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEuYXZhdGFySWQpO1xyXG4gICAgICAgIGlmIChfYXZhdGFyID09IHVuZGVmaW5lZCB8fCBpc05hTihfYXZhdGFyKSA9PSB0cnVlIHx8IF9hdmF0YXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgX2F2YXRhciA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkF2YXRhcihfYXZhdGFyKTtcclxuICAgICAgICBBdmF0YXJTZWxlY3Rpb24gPSBfYXZhdGFyO1xyXG4gICAgICAgIHRoaXMuQWRtaW5VSVByb2ZpbGUuTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YS5uYW1lO1xyXG4gICAgICAgIHRoaXMuQWRtaW5VSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICB0aGlzLkFkbWluVUlQcm9maWxlLlNjaG9vbE5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEuc2Nob29sTmFtZTtcclxuICAgICAgICB0aGlzLkFkbWluVUlQcm9maWxlLkNvbnRhY3RMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEuY29udGFjdE51bWJlcjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgfSBlbHNlIGlmIChfaXNEaXJlY3Rvcikge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlVUlDb250YWluZXIoNCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVNwZWN0YXRlQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLkNhc2hOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkRpcmVjdG9yRGF0YSk7XHJcblxyXG4gICAgICAgIHZhciBfYXZhdGFyID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuRGlyZWN0b3JEYXRhLmF2YXRhcklkKTtcclxuICAgICAgICBpZiAoX2F2YXRhciA9PSB1bmRlZmluZWQgfHwgaXNOYU4oX2F2YXRhcikgPT0gdHJ1ZSB8fCBfYXZhdGFyID09IG51bGwpIHtcclxuICAgICAgICAgIF9hdmF0YXIgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25BdmF0YXIoX2F2YXRhcik7XHJcbiAgICAgICAgQXZhdGFyU2VsZWN0aW9uID0gX2F2YXRhcjtcclxuICAgICAgICB0aGlzLkRpcmVjdG9yVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5EaXJlY3RvckRhdGEubmFtZTtcclxuICAgICAgICB0aGlzLkRpcmVjdG9yVUlQcm9maWxlLkVtYWlsQWRkcmVzc0xhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkRpcmVjdG9yRGF0YS5lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKSA9PSAyKSB7XHJcbiAgICAgIC8vdXNlciBub3QgZm91bmRcclxuICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwibm8gdXNlciByZWdpc3RlcmVkIHdpdGggZW50ZXJlZCBlbWFpbC5cIik7XHJcbiAgICB9IGVsc2UgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlc3BvbnNlVHlwZSkgPT0gMykge1xyXG4gICAgICAvL3Bhc3MvZW1haWwgaW52YWxpZFxyXG4gICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ1c2VyIGVtYWlsIG9yIHBhc3N3b3JkIGlzIHdyb25nXCIpO1xyXG4gICAgfSBlbHNlIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpID09IDQpIHtcclxuICAgICAgLy9zb21ldGhpbmcgd2VudCB3cm9uZ1xyXG4gICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJzb21ldGhpbmcgd2VudCB3cm9uZyBwbGVhc2UgdHJ5IGFnYWluLlwiKTtcclxuICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKSA9PSA1KSB7XHJcbiAgICAgIC8vc29tZXRoaW5nIHdlbnQgd3JvbmdcclxuICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwibGljZW5zZSBrZXkgaXMgbm90IHZhbGlkLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNyZWdpb24gU3BlY3RhdGUgVWkgV29ya1xyXG4gIFRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSShfc3RhdGUpIHtcclxuICAgIGlmIChfc3RhdGUpIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5VSVNwZWN0YXRlLlJvb21TY3JlZW5Ob2RlLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlVJU3BlY3RhdGUuUHJvZmlsZVNjcmVlbk5vZGUuYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNob3dBdmFpbGFibGVSb29tc19TcGVjdGF0ZVVJKCkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNDb25uZWN0ZWRUb01hc3RlcigpIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNJbkxvYmJ5KCkpIHtcclxuICAgICAgdGhpcy5Ub2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkoZmFsc2UpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSSh0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVTaG93Um9vbV9Cb29sKHRydWUpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlcXVlc3RDb25uZWN0aW9uKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkoX25hbWUsIF9wbGF5ZXJzKSB7XHJcbiAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuVUlTcGVjdGF0ZS5Sb29tUHJlZmFiKTtcclxuICAgIG5vZGUucGFyZW50ID0gdGhpcy5VSVNwZWN0YXRlLlNjcm9sbEJhckNvbnRlbnQ7XHJcbiAgICBub2RlLmdldENvbXBvbmVudChcIlJvb21MaXN0SGFuZGxlclwiKS5TZXRSb29tTmFtZShfbmFtZSk7XHJcbiAgICBub2RlLmdldENvbXBvbmVudChcIlJvb21MaXN0SGFuZGxlclwiKS5TZXRQbGF5ZXJDb3VudChfcGxheWVycyk7XHJcbiAgICBUb3RhbFJvb20ucHVzaChub2RlKTtcclxuICB9LFxyXG5cclxuICBSZXNldFJvb21MaXN0KCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFRvdGFsUm9vbS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgVG90YWxSb29tW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgVG90YWxSb29tID0gW107XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9TcGVjdGF0ZVVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICB0aGlzLkV4aXRDb25uZWN0aW5nKCk7XHJcbiAgfSxcclxuXHJcbiAgTG9nb3V0KCkge1xyXG4gICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNsZWFyRGF0YVwiKTsgLy9mdW5jdGlvbiB3cml0dGVuIGluIHN0b3JhZ2UgTWFuYWdlciBjbGFzc1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkgIT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpICE9IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkgIT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkgIT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuXHJcbiAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtc2csIF90aW1lID0gMjAwMCkge1xyXG4gICAgdGhpcy5Ub2FzdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuVG9hc3ROb2RlLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbXNnO1xyXG4gICAgdmFyIFNlbGZUb2FzdCA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgU2VsZlRvYXN0LlRvYXN0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sIF90aW1lKTtcclxuICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVUlNYW5hZ2VyO1xyXG4iXX0=