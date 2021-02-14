
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
    this.ResetPlayerCountInput(); // this.VersesPlayerMode();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxVSU1hbmFnZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHdlZW5SZWYiLCJUb3RhbFJvb20iLCJBdmF0YXJTZWxlY3Rpb24iLCJfdGVtcEF2YXRhclNlbGVjdGlvbiIsIlJvbGVzIiwiUHJvZmlsZVVJIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiTmFtZUxhYmVsIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiRW1haWxBZGRyZXNzTGFiZWwiLCJET0JMYWJlbCIsIkdyYWRlTGV2ZWxMYWJlbCIsIlRlYWNoZXJOYW1lTGFiZWwiLCJHYW1lc1dvbkxhYmVsIiwiRkJQYWdlTGFiZWwiLCJUZXN0VGFrZW5MYWJlbCIsIlRlc3RpbmdBdmdMYWJlbCIsIkNhc2hMYWJlbCIsIlN0YXR1c05vZGUiLCJOb2RlIiwiUGxheUJ1dHRvbk5vZGUiLCJTdGF0dXNMYWJlbCIsIlBsYXllckNvdW50SW5wdXQiLCJFZGl0Qm94IiwiRGlzdHJpY3RMYWJlbCIsIlBsYXlHYW1lQnV0dG9uIiwiU3BlY3RhdGVCdXR0b24iLCJDYXNoTm9kZSIsIlRlYWNoZXJQcm9maWxlVUkiLCJDbGFzc1RhdWdodCIsIlNjaG9vbE5hbWVMYWJlbCIsIkNvbnRhY3RMYWJlbCIsIk1lbnRvclByb2ZpbGVVSSIsIkFkZHJlc3NsYWJlbCIsIkFkbWluUHJvZmlsZVVJIiwiRGlyZWN0b3JQcm9maWxlVUkiLCJTcGVjdGF0ZVVJIiwiUm9vbVNjcmVlbk5vZGUiLCJTY3JvbGxCYXJDb250ZW50IiwiUHJvZmlsZVNjcmVlbk5vZGUiLCJSb29tUHJlZmFiIiwiUHJlZmFiIiwiQXZhdGFyVUkiLCJBdmF0YXJTZWxlY3Rpb25TY3JlZW4iLCJBdmF0YXJOb2RlcyIsIkF2YXRhckJ1dHRvbnMiLCJVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJVSVByb2ZpbGUiLCJUZWFjaGVyVUlQcm9maWxlIiwiTWVudG9yVUlQcm9maWxlIiwiQWRtaW5VSVByb2ZpbGUiLCJEaXJlY3RvclVJUHJvZmlsZSIsIkF2YXRhclVJU2V0dXAiLCJTY3JlZW5Ob2RlcyIsIlR3ZWVuTWFuYWdlclJlZiIsIkxvZ28iLCJUb2FzdE5vZGUiLCJMb2FkaW5nTm9kZSIsIlJlZmVyZW5jZU1hbmFnZXJSZWYiLCJNb2RlU2VsZWN0aW9uU2NyZWVuIiwiVUlTcGVjdGF0ZSIsIlVJQ29udGFpbmVyIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiQXNzaWduUHJvZmlsZURhdGEiLCJVcGRhdGVTdGF0dXNXaW5kb3ciLCJDaGFuZ2VQYW5lbFNjcmVlbiIsIm9uRGlzYWJsZSIsIm9mZiIsIm9uTG9hZCIsImdldENvbXBvbmVudCIsIlNlbGVjdGVkUm9sZSIsIlNlbGVjdGVkUm9sZUluZGV4IiwiRW1haWxUZXh0IiwiUGFzc3dvcmRUZXh0IiwiTGljZW5zZVRleHQiLCJub2RlQ291bnRlciIsIlN0YXR1c1RleHQiLCJUb3RhbFBsYXllcnMiLCJSZXNldFBsYXllckNvdW50SW5wdXQiLCJHZXRUd2Vlbk1hbmFnZXJSZWZlcmVuY2UiLCJTbGlkZUluTG9naW5Db21wb25lbnRzIiwiUmVwZWF0TG9nb0FuaW1hdGlvbiIsIkNoZWNrUmVmZXJlbmNlcyIsIlRvZ2dsZVBsYXlCdXR0b24iLCJfc3RhdGUiLCJhY3RpdmUiLCJUb2dnbGVTcGVjdGF0ZUJ1dHRvbiIsInJlcXVpcmUiLCJpc05leHQiLCJjaGFuZ2VTY3JlZW4iLCJzY2VuZU5hbWUiLCJGYWRlTm9kZUluT3V0IiwibGVuZ3RoIiwic2V0VGltZW91dCIsIk1hbmlwdWxhdGVOb2RlcyIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiY291bnRlciIsImluZGV4IiwiY29uc29sZSIsImxvZyIsIkxvZ2luU2NyZWVuVHdlZW4iLCJjaGlsZHJlbiIsIlJlcGVhdFR3ZWVuU2NhbGUiLCJzdHJpbmciLCJPbnBsYXllck51bWJlckNoYW5nZWQiLCJfbnVtYmVyIiwiUGxheUdhbWUiLCJUb2dnbGVNb2RlU2VsZWN0aW9uIiwiQmFja1NlbGVjdGlvbk1vZGUiLCJWZXJzZXNQbGF5ZXJNb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZVNob3dSb29tX0Jvb2wiLCJnZXRQaG90b25SZWYiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5IiwiZW1pdCIsIkpvaW5SYW5kb21Sb29tIiwiUmVxdWVzdENvbm5lY3Rpb24iLCJWZXJzZXNBSU1vZGUiLCJNYXhQbGF5ZXJzIiwiSm9pbmVkUm9vbSIsIm1zZyIsIkV4aXRDb25uZWN0aW5nIiwiUmVzZXRSb29tVmFsdWVzIiwiRGlzY29ubmVjdFBob3RvbiIsIlRvZ2dsZUxvYWRpbmdOb2RlIiwic3RhdGUiLCJMb2dpblVzZXIiLCJhbmltIiwiQW5pbWF0aW9uIiwicGxheSIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU2hvd1RvYXN0IiwiT25Sb2xlVG9nZ2xlZCIsIl92YWwiLCJub2RlIiwic3BsaXQiLCJTZXRFbWFpbFRleHQiLCJ0ZXh0IiwiU2V0UGFzc3dvcmRUZXh0IiwiU2V0TGljZW5zZVRleHQiLCJUb2dnbGVVSUNvbnRhaW5lciIsIl9tYWluSW5kZXgiLCJBc3NpZ25BdmF0YXIiLCJfaW5kZXgiLCJUb2dnbGVBdmF0YXJTY3JlZW4iLCJFbmFibGVBdmF0YXJTY3JlZW4iLCJEaXNhYmxlQXZhdGFyU2NyZWVuIiwiQXNzaWduRGF0YUNsYXNzZXMiLCJVcGRhdGVVc2VyRGF0YSIsIkFzc2lnbkF2YXRhclNlbGVjdGlvbiIsImV2ZW50IiwicGFyc2VJbnQiLCJjdXJyZW50VGFyZ2V0IiwiX0lEIiwiU3R1ZGVudERhdGEiLCJhdmF0YXJJZCIsInRvU3RyaW5nIiwiVGVhY2hlckRhdGEiLCJNZW50b3JEYXRhIiwiQWRtaW5EYXRhIiwiRGlyZWN0b3JEYXRhIiwiX2lzU3R1ZGVudCIsIl9pc1RlYWNoZXIiLCJfaXNNZW50b3IiLCJfaXNBZG1pbiIsIl9pc0RpcmVjdG9yIiwiUmVzcG9uc2VUeXBlIiwiX2F2YXRhciIsInVuZGVmaW5lZCIsImlzTmFOIiwiZW1haWxBZGRyZXNzIiwiZE9CIiwiZ3JhZGVMZXZlbCIsInRlYWNoZXJOYW1lIiwiZ2FtZXNXb24iLCJmYWNlYm9va1BhZ2UiLCJ0ZXN0c1Rha2VuIiwidGVzdGluZ0F2ZXJhZ2UiLCJnYW1lQ2FzaCIsImNsYXNzVGF1Z2h0Iiwic2Nob29sIiwiY29udGFjdE51bWJlciIsImFkZHJlc3MiLCJzY2hvb2xOYW1lIiwiVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJIiwiVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJIiwiU2hvd0F2YWlsYWJsZVJvb21zX1NwZWN0YXRlVUkiLCJVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSSIsIl9uYW1lIiwiX3BsYXllcnMiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIlNldFJvb21OYW1lIiwiU2V0UGxheWVyQ291bnQiLCJwdXNoIiwiUmVzZXRSb29tTGlzdCIsImRlc3Ryb3kiLCJFeGl0X1NwZWN0YXRlVUkiLCJMb2dvdXQiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIl90aW1lIiwiU2VsZlRvYXN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBLElBQUlBLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsUUFBSjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLGVBQWUsR0FBRyxDQUF0QjtBQUNBLElBQUlDLG9CQUFvQixHQUFHLENBQTNCO0FBQ0EsSUFBSUMsS0FBSyxHQUFHLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsbUJBQXZCLEVBQTRDLGFBQTVDLEVBQTJELGlCQUEzRCxDQUFaLEVBQ0E7O0FBQ0EsSUFBSUMsU0FBUyxH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R0FBdUVrQixHQUF2RTtBQUNBLFFBQUlvRixTQUFTLEdBQUcsSUFBaEI7QUFDQWpILElBQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ3JCaUgsTUFBQUEsU0FBUyxDQUFDM0osU0FBVixDQUFvQmtDLE1BQXBCLEdBQTZCLEtBQTdCO0FBQ0QsS0FGUyxFQUVQd0gsS0FGTyxDQUFWO0FBR0Q7QUF0bEJzQixDQUFULENBQWhCO0FBeWxCQUUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCeEssU0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUd2VlZW4gZnJvbSBcIlR3ZWVuTWFuYWdlclwiO1xyXG5pbXBvcnQgU2VydmVyQmFja2VuZCBmcm9tIFwiLi9TZXJ2ZXJCYWNrZW5kXCI7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgVHdlZW5SZWY7XHJcbnZhciBUb3RhbFJvb20gPSBbXTtcclxudmFyIEF2YXRhclNlbGVjdGlvbiA9IDA7XHJcbnZhciBfdGVtcEF2YXRhclNlbGVjdGlvbiA9IDA7XHJcbnZhciBSb2xlcyA9IFtcIlN0dWRlbnRcIiwgXCJUZWFjaGVyXCIsIFwiUHJvZ3JhbUFtYmFzc2Fkb3JcIiwgXCJTY2hvb2xBZG1pblwiLCBcIlByb2dyYW1EaXJlY3RvclwiXTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFByb2ZpbGVVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlByb2ZpbGVVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLFxyXG4gICAgfSxcclxuICAgIERPQkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRPQlwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBET0IgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEdyYWRlTGV2ZWxMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHcmFkZUxldmVsXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIEdyYWRlIExldmVsIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBUZWFjaGVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRlYWNoZXJOYW1lXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFRlYWNoZXIgTmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgR2FtZXNXb25MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHYW1lc1dvblwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBnYW1lcyB3b24gbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEZCUGFnZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkZCUGFnZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBmYWNlYm9vayBwYWdlIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBUZXN0VGFrZW5MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUZXN0VGFrZW5cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gdGVzdCB0YWtlbiBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgVGVzdGluZ0F2Z0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRlc3RpbmdBdmVyYWdlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFRlc3RpbmcgQXZlcmFnZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gY2FzaCBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgU3RhdHVzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdGF0dXNTY3JlZW5cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTdGF0dXMgU2NyZWVuIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5QnV0dG9uTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5QnV0dG9uXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gcGxheSBidXR0b24gb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIFN0YXR1c0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0YXR1c1RleHRcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU3RhdHVzIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJDb3VudElucHV0OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNvdW50SW5wdXRcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBQbGF5ZXJDb3VudElucHV0IG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBEaXN0cmljdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpc3RyaWN0TGFiZWxcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gRGlzdHJpY3RMYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheUdhbWVCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheUdhbWVCdXR0b25cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBQbGF5R2FtZUJ1dHRvbiBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgU3BlY3RhdGVCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3BlY3RhdGVCdXR0b25cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTcGVjdGF0ZUJ1dHRvbiBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaE5vZGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBDYXNoTm9kZSBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgdGVhY2hlciBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBUZWFjaGVyUHJvZmlsZVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVGVhY2hlclByb2ZpbGVVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLFxyXG4gICAgfSxcclxuICAgIENsYXNzVGF1Z2h0OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNsYXNzVGF1Z2h0XCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIENsYXNzVGF1Z2h0IGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBTY2hvb2xOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nob29sTmFtZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTY2hvb2xOYW1lIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBDb250YWN0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ29udGFjdFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBDb250YWN0IGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgTWVudG9yIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE1lbnRvclByb2ZpbGVVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk1lbnRvclByb2ZpbGVVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLFxyXG4gICAgfSxcclxuICAgIEFkZHJlc3NsYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBZGRyZXNzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIEFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIENvbnRhY3RMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDb250YWN0XCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIENvbnRhY3QgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBBZG1pbiBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBBZG1pblByb2ZpbGVVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkFkbWluUHJvZmlsZVVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5hbWVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgRW1haWxBZGRyZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRW1haWxBZGRyZXNzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBlbWFpbCBhZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGUgXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nob29sTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjaG9vbE5hbWVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU2Nob29sTmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgQ29udGFjdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNvbnRhY3RcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQ29udGFjdCBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGRpcmVjdG9yIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERpcmVjdG9yUHJvZmlsZVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiRGlyZWN0b3JQcm9maWxlVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFbWFpbEFkZHJlc3NcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGVtYWlsIGFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZSBcIixcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTcGVjdGF0ZVVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTcGVjdGF0ZVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU3BlY3RhdGVVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFJvb21TY3JlZW5Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJvb21TY3JlZW5cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byB0aGUgbm9kZSBvZiByb29tIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbEJhckNvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQmFyQ29udGVudFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBub2RlIG9mIFNjcm9sbEJhckNvbnRlbnQgb2Ygcm9vbSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQcm9maWxlU2NyZWVuTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcm9maWxlU2NyZWVuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2YgcHJvZmlsZSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBSb29tUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJvb21QcmVmYWJcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgUm9vbSBvbiByb29tIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBBdmF0YXJVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQXZhdGFyVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJBdmF0YXJVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEF2YXRhclNlbGVjdGlvblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBdmF0YXJTZWxlY3Rpb25TY3JlZW5cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEF2YXRhck5vZGVzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhck5vZGVzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBBdmF0YXJCdXR0b25zOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhckJ1dHRvbnNcIixcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBVSU1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVJTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVJTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVUlQcm9maWxlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlVJUHJvZmlsZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBQcm9maWxlVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgIH0sXHJcbiAgICBUZWFjaGVyVUlQcm9maWxlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRlYWNoZXJVSVByb2ZpbGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVGVhY2hlclByb2ZpbGVVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBUZWFjaGVyUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgIH0sXHJcblxyXG4gICAgTWVudG9yVUlQcm9maWxlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1lbnRvclVJUHJvZmlsZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBNZW50b3JQcm9maWxlVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gTWVudG9yUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgIH0sXHJcblxyXG4gICAgQWRtaW5VSVByb2ZpbGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQWRtaW5VSVByb2ZpbGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogQWRtaW5Qcm9maWxlVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQWRtaW5Qcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBEaXJlY3RvclVJUHJvZmlsZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaXJlY3RvclVJUHJvZmlsZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBEaXJlY3RvclByb2ZpbGVVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBEaXJlY3RvclByb2ZpbGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIEF2YXRhclVJU2V0dXA6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFyVUlTZXR1cFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBBdmF0YXJVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBBdmF0YXJVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIFNjcmVlbk5vZGVzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcmVlbk5vZGVzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbG9naW4gc2NyZWVuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUd2Vlbk1hbmFnZXJSZWY6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHdlZW5NYW5hZ2VyUmVmXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIFR3ZWVuIE1hbmFnZXIgU2NyaXB0IFwiLFxyXG4gICAgfSxcclxuICAgIExvZ286IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9nb05vZGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIGxvZ28gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvYXN0Tm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb2FzdE5vZGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIHRvYXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FkaW5nTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FkaW5nTm9kZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgTG9hZGluZyBOb2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVmZXJlbmNlTWFuYWdlclJlZjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZWZlcmVuY2VNYW5hZ2VyUmVmXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIHRoZSByZWZlcmVuY2UgbWFuYWdlciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTW9kZVNlbGVjdGlvblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb2RlU2VsZWN0aW9uU2NyZWVuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbW9kZSBzZWxlY3Rpb24gc2NyZWVuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBVSVNwZWN0YXRlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlVJU3BlY3RhdGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogU3BlY3RhdGVVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTcGVjdGF0ZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgIH0sXHJcbiAgICBVSUNvbnRhaW5lcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJVSUNvbnRhaW5lclwiLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFVJQ29udGFpbmVyIG5vZGVzXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIC8vY3JlYXRpbmcgc3RhdGljIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxEYXRhKCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIFR3ZWVuUmVmO1xyXG4gICAgVG90YWxSb29tID0gW107XHJcbiAgICBBdmF0YXJTZWxlY3Rpb24gPSAwO1xyXG4gICAgX3RlbXBBdmF0YXJTZWxlY3Rpb24gPSAwO1xyXG4gIH0sXHJcblxyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIkFzc2lnblByb2ZpbGVEYXRhXCIsIHRoaXMuQXNzaWduUHJvZmlsZURhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgdGhpcy5VcGRhdGVTdGF0dXNXaW5kb3csIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIkFzc2lnblByb2ZpbGVEYXRhXCIsIHRoaXMuQXNzaWduUHJvZmlsZURhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIHRoaXMuVXBkYXRlU3RhdHVzV2luZG93LCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRoaXMuQ2hhbmdlUGFuZWxTY3JlZW4sIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuUmVzZXRBbGxEYXRhKCk7XHJcbiAgICB0aGlzLlJlZmVyZW5jZU1hbmFnZXJSZWYgPSB0aGlzLlJlZmVyZW5jZU1hbmFnZXJSZWYuZ2V0Q29tcG9uZW50KFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG5cclxuICAgIHRoaXMuU2VsZWN0ZWRSb2xlID0gUm9sZXNbMF07XHJcbiAgICB0aGlzLlNlbGVjdGVkUm9sZUluZGV4ID0gMDtcclxuICAgIFVJTWFuYWdlci5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICBUb3RhbFJvb20gPSBbXTtcclxuICAgIC8vUHJpdmF0ZSBWYXJpYWJsZXNcclxuICAgIHRoaXMuRW1haWxUZXh0ID0gXCJcIjtcclxuICAgIHRoaXMuUGFzc3dvcmRUZXh0ID0gXCJcIjtcclxuICAgIHRoaXMuTGljZW5zZVRleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5ub2RlQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLlN0YXR1c1RleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5Ub3RhbFBsYXllcnMgPSBcIlwiO1xyXG4gICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuXHJcbiAgICB0aGlzLkdldFR3ZWVuTWFuYWdlclJlZmVyZW5jZSgpO1xyXG4gICAgdGhpcy5TbGlkZUluTG9naW5Db21wb25lbnRzKCk7XHJcbiAgICB0aGlzLlJlcGVhdExvZ29BbmltYXRpb24oKTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlUGxheUJ1dHRvbihfc3RhdGUpIHtcclxuICAgIHRoaXMuVUlQcm9maWxlLlBsYXlHYW1lQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTcGVjdGF0ZUJ1dHRvbihfc3RhdGUpIHtcclxuICAgIHRoaXMuVUlQcm9maWxlLlNwZWN0YXRlQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBDaGFuZ2VQYW5lbFNjcmVlbjogZnVuY3Rpb24gKGlzTmV4dCwgY2hhbmdlU2NyZWVuLCBzY2VuZU5hbWUpIHtcclxuICAgIFR3ZWVuUmVmLkZhZGVOb2RlSW5PdXQodGhpcy5TY3JlZW5Ob2Rlc1t0aGlzLm5vZGVDb3VudGVyXSwgMC41NSwgMjU1LCAwLCBcInF1YWRJbk91dFwiKTtcclxuXHJcbiAgICBpZiAoY2hhbmdlU2NyZWVuID09IGZhbHNlKSB7XHJcbiAgICAgIGlmIChpc05leHQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGVDb3VudGVyIDwgdGhpcy5TY3JlZW5Ob2Rlcy5sZW5ndGgpIHRoaXMubm9kZUNvdW50ZXIgPSB0aGlzLm5vZGVDb3VudGVyICsgMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlQ291bnRlciA+IDApIHRoaXMubm9kZUNvdW50ZXIgPSB0aGlzLm5vZGVDb3VudGVyIC0gMTtcclxuICAgICAgfVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLk1hbmlwdWxhdGVOb2Rlcyh0aGlzLm5vZGVDb3VudGVyKTtcclxuICAgICAgfSwgNjAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShzY2VuZU5hbWUpO1xyXG4gICAgICB9LCA2MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE1hbmlwdWxhdGVOb2RlczogZnVuY3Rpb24gKGNvdW50ZXIpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlNjcmVlbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoY291bnRlciA9PSBpbmRleCkge1xyXG4gICAgICAgIHRoaXMuU2NyZWVuTm9kZXNbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXRpbmcgaXQgdHJ1ZVwiKTtcclxuICAgICAgICBUd2VlblJlZi5GYWRlTm9kZUluT3V0KHRoaXMuU2NyZWVuTm9kZXNbaW5kZXhdLCAxLjUsIDAsIDI1NSwgXCJxdWFkSW5PdXRcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TY3JlZW5Ob2Rlc1tpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTbGlkZUluTG9naW5Db21wb25lbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBUd2VlblJlZi5Mb2dpblNjcmVlblR3ZWVuKHRoaXMuU2NyZWVuTm9kZXNbdGhpcy5ub2RlQ291bnRlcl0uY2hpbGRyZW5bMV0sIC0xMDAwKTtcclxuICB9LFxyXG5cclxuICBSZXBlYXRMb2dvQW5pbWF0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBUd2VlblJlZi5SZXBlYXRUd2VlblNjYWxlKHRoaXMuTG9nbywgMS4xLCAxLCAwLjgpO1xyXG4gIH0sXHJcblxyXG4gIEdldFR3ZWVuTWFuYWdlclJlZmVyZW5jZTogZnVuY3Rpb24gKCkge1xyXG4gICAgVHdlZW5SZWYgPSB0aGlzLlR3ZWVuTWFuYWdlclJlZi5nZXRDb21wb25lbnQoXCJUd2Vlbk1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRQbGF5ZXJDb3VudElucHV0KCkge1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuUGxheWVyQ291bnRJbnB1dC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5Ub3RhbFBsYXllcnMgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIE9ucGxheWVyTnVtYmVyQ2hhbmdlZChfbnVtYmVyKSB7XHJcbiAgICB0aGlzLlRvdGFsUGxheWVycyA9IF9udW1iZXI7XHJcbiAgfSxcclxuXHJcbiAgUGxheUdhbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICAvLyB0aGlzLlZlcnNlc1BsYXllck1vZGUoKTtcclxuICAgIHRoaXMuVG9nZ2xlTW9kZVNlbGVjdGlvbih0cnVlKTtcclxuICB9LFxyXG5cclxuICBCYWNrU2VsZWN0aW9uTW9kZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgIHRoaXMuVG9nZ2xlTW9kZVNlbGVjdGlvbihmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlTW9kZVNlbGVjdGlvbihfc3RhdGUpIHtcclxuICAgIHRoaXMuTW9kZVNlbGVjdGlvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVmVyc2VzUGxheWVyTW9kZSgpIHtcclxuICAgIC8vIGlmKHRoaXMuVG90YWxQbGF5ZXJzPT1cIlwiKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIGVudGVyIHBsYXllciBhbW91bnQgZm9yIG11bHRpcGxheWVyIGZyb20gMi02LCBtYWtlIHN1cmUgdG8gaGF2ZSBzYW1lIGFtb3VudCBvbiBkaWZmZXJlbnQgY29ubmVjdGluZyBkZXZpY2VzIGlmIHlvdSB3YW50IHRvIGNvbm5lY3QgdGhlbS5cIiwzNTAwKTtcclxuICAgIC8vIH1cclxuICAgIC8vIGVsc2VcclxuICAgIC8vIHtcclxuICAgIC8vICAgICB2YXIgX3BsYXllcnM9cGFyc2VJbnQodGhpcy5Ub3RhbFBsYXllcnMpO1xyXG4gICAgLy8gICAgIGlmKF9wbGF5ZXJzPj0yICYmIF9wbGF5ZXJzPD02KVxyXG4gICAgLy8gICAgIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTW9kZVNlbGVjdGlvbigyKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlU2hvd1Jvb21fQm9vbChmYWxzZSk7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAvL3RoaXMuVUlQcm9maWxlLlBsYXlCdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAvL0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz1fcGxheWVycztcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0luTG9iYnkoKSkge1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwid2FpdGluZyBmb3Igb3RoZXIgcGxheWVycy4uLlwiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luUmFuZG9tUm9vbSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXF1ZXN0Q29ubmVjdGlvbigpO1xyXG4gICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBlbHNlXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBlbnRlciBwbGF5ZXIgYW1vdW50IGZvciBtdWx0aXBsYXllciBmcm9tIDItNiwgbWFrZSBzdXJlIHRvIGhhdmUgc2FtZSBhbW91bnQgb24gZGlmZmVyZW50IGNvbm5lY3RpbmcgZGV2aWNlcyBpZiB5b3Ugd2FudCB0byBjb25uZWN0IHRoZW0uXCIsMzUwMCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gIH0sXHJcblxyXG4gIFZlcnNlc0FJTW9kZSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTW9kZVNlbGVjdGlvbigxKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlU2hvd1Jvb21fQm9vbChmYWxzZSk7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gMjtcclxuICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzZXR0aW5nIHVwIGdhbWUuLi5cIik7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwid2FpdGluZyBmb3IgQUkgU2V0dXAuLi5cIik7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luZWRSb29tID0gdHJ1ZTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7IC8vZnVuY3Rpb24gaW4gdWkgbWFuYWdlclxyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlU3RhdHVzV2luZG93OiBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICB0aGlzLlN0YXR1c1RleHQgPSB0aGlzLlN0YXR1c1RleHQgKyBtc2cgKyBcIlxcblwiO1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTGFiZWwuc3RyaW5nID0gdGhpcy5TdGF0dXNUZXh0O1xyXG4gIH0sXHJcblxyXG4gIEV4aXRDb25uZWN0aW5nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuUGxheUJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkVtYWlsVGV4dCA9IFwiXCI7XHJcbiAgICB0aGlzLlBhc3N3b3JkVGV4dCA9IFwiXCI7XHJcbiAgICB0aGlzLlN0YXR1c1RleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5Ub3RhbFBsYXllcnMgPSBcIlwiO1xyXG4gICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVMb2FkaW5nTm9kZShzdGF0ZSkge1xyXG4gICAgdGhpcy5Mb2FkaW5nTm9kZS5hY3RpdmUgPSBzdGF0ZTtcclxuICB9LFxyXG5cclxuICBMb2dpblVzZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLkVtYWlsVGV4dCAhPSBcIlwiICYmIHRoaXMuUGFzc3dvcmRUZXh0ICE9IFwiXCIpIHtcclxuICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZSh0cnVlKTtcclxuICAgICAgdmFyIGFuaW0gPSB0aGlzLkxvYWRpbmdOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICBhbmltLnBsYXkoXCJsb2FkaW5nXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5Mb2dpblVzZXIodGhpcy5FbWFpbFRleHQsIHRoaXMuUGFzc3dvcmRUZXh0LCB0aGlzLlNlbGVjdGVkUm9sZSwgdGhpcy5MaWNlbnNlVGV4dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJFbWFpbCBvciBwYXNzd29yZCBpbnZhbGlkIG9yIGVtcHR5LlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblJvbGVUb2dnbGVkKF92YWwpIHtcclxuICAgIC8vY29uc29sZS5sb2coX3ZhbCk7XHJcbiAgICBjb25zb2xlLmxvZyhfdmFsLm5vZGUubmFtZS5zcGxpdChcIl9cIilbMV0pO1xyXG4gICAgdGhpcy5TZWxlY3RlZFJvbGVJbmRleCA9IF92YWwubm9kZS5uYW1lLnNwbGl0KFwiX1wiKVsxXTtcclxuICAgIHRoaXMuU2VsZWN0ZWRSb2xlID0gUm9sZXNbdGhpcy5TZWxlY3RlZFJvbGVJbmRleF07XHJcbiAgfSxcclxuXHJcbiAgU2V0RW1haWxUZXh0OiBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgdGhpcy5FbWFpbFRleHQgPSB0ZXh0O1xyXG4gIH0sXHJcblxyXG4gIFNldFBhc3N3b3JkVGV4dDogZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIHRoaXMuUGFzc3dvcmRUZXh0ID0gdGV4dDtcclxuICB9LFxyXG5cclxuICBTZXRMaWNlbnNlVGV4dDogZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIHRoaXMuTGljZW5zZVRleHQgPSB0ZXh0O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVVJQ29udGFpbmVyKF9tYWluSW5kZXgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlVJQ29udGFpbmVyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX21haW5JbmRleCA9PSBpbmRleCkgdGhpcy5VSUNvbnRhaW5lcltpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLlVJQ29udGFpbmVyW2luZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBc3NpZ25BdmF0YXIoX2luZGV4ID0gMCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9pbmRleCA9PSBpbmRleCkgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhck5vZGVzW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBlbHNlIHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJOb2Rlc1tpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlQXZhdGFyU2NyZWVuKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhclNlbGVjdGlvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlQXZhdGFyU2NyZWVuKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVBdmF0YXJTY3JlZW4odHJ1ZSk7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJCdXR0b25zLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoQXZhdGFyU2VsZWN0aW9uID09IGluZGV4KSB0aGlzLkF2YXRhclVJU2V0dXAuQXZhdGFyQnV0dG9uc1tpbmRleF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLkF2YXRhclVJU2V0dXAuQXZhdGFyQnV0dG9uc1tpbmRleF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRGlzYWJsZUF2YXRhclNjcmVlbigpIHtcclxuICAgIHRoaXMuVG9nZ2xlQXZhdGFyU2NyZWVuKGZhbHNlKTtcclxuXHJcbiAgICBpZiAoX3RlbXBBdmF0YXJTZWxlY3Rpb24gIT0gQXZhdGFyU2VsZWN0aW9uKSB7XHJcbiAgICAgIEF2YXRhclNlbGVjdGlvbiA9IF90ZW1wQXZhdGFyU2VsZWN0aW9uO1xyXG4gICAgICB0aGlzLkFzc2lnbkF2YXRhcihBdmF0YXJTZWxlY3Rpb24pO1xyXG4gICAgICB0aGlzLkFzc2lnbkRhdGFDbGFzc2VzKEF2YXRhclNlbGVjdGlvbik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKC0xLCAtMSwgQXZhdGFyU2VsZWN0aW9uKTtcclxuICAgIH1cclxuICB9LFxyXG4gIEFzc2lnbkF2YXRhclNlbGVjdGlvbihldmVudCA9IG51bGwpIHtcclxuICAgIF90ZW1wQXZhdGFyU2VsZWN0aW9uID0gcGFyc2VJbnQoZXZlbnQuY3VycmVudFRhcmdldC5uYW1lLnNwbGl0KFwiX1wiKVsxXSk7XHJcbiAgICBjb25zb2xlLmxvZyhfdGVtcEF2YXRhclNlbGVjdGlvbik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJCdXR0b25zLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX3RlbXBBdmF0YXJTZWxlY3Rpb24gPT0gaW5kZXgpIHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJCdXR0b25zW2luZGV4XS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBlbHNlIHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJCdXR0b25zW2luZGV4XS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBc3NpZ25EYXRhQ2xhc3NlcyhfSUQpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmF2YXRhcklkID0gX0lELnRvU3RyaW5nKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5UZWFjaGVyRGF0YS5hdmF0YXJJZCA9IF9JRC50b1N0cmluZygpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YS5hdmF0YXJJZCA9IF9JRC50b1N0cmluZygpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhID0gX0lELnRvU3RyaW5nKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5EaXJlY3RvckRhdGEuYXZhdGFySWQgPSBfSUQudG9TdHJpbmcoKTtcclxuICB9LFxyXG5cclxuICBBc3NpZ25Qcm9maWxlRGF0YTogZnVuY3Rpb24gKF9pc1N0dWRlbnQgPSBmYWxzZSwgX2lzVGVhY2hlciA9IGZhbHNlLCBfaXNNZW50b3IgPSBmYWxzZSwgX2lzQWRtaW4gPSBmYWxzZSwgX2lzRGlyZWN0b3IgPSBmYWxzZSkge1xyXG4gICAgLy9jb25zb2xlLmVycm9yKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlc3BvbnNlVHlwZSkpO1xyXG4gICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlc3BvbnNlVHlwZSkgPT0gMSkge1xyXG4gICAgICAvL21lYW5zIHN1Y2Nlc3NmdWxcclxuICAgICAgdGhpcy5DaGFuZ2VQYW5lbFNjcmVlbih0cnVlLCBmYWxzZSwgXCJcIik7XHJcblxyXG4gICAgICBpZiAoX2lzU3R1ZGVudCkge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlVUlDb250YWluZXIoMCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLkNhc2hOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG5cclxuICAgICAgICB2YXIgX2F2YXRhciA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmF2YXRhcklkKTtcclxuICAgICAgICBpZiAoX2F2YXRhciA9PSB1bmRlZmluZWQgfHwgaXNOYU4oX2F2YXRhcikgPT0gdHJ1ZSB8fCBfYXZhdGFyID09IG51bGwpIHtcclxuICAgICAgICAgIF9hdmF0YXIgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25BdmF0YXIoX2F2YXRhcik7XHJcbiAgICAgICAgQXZhdGFyU2VsZWN0aW9uID0gX2F2YXRhcjtcclxuXHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLkRPQkxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmRPQjtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5HcmFkZUxldmVsTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ3JhZGVMZXZlbDtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5UZWFjaGVyTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnRlYWNoZXJOYW1lO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLkdhbWVzV29uTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb247XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuRkJQYWdlTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZmFjZWJvb2tQYWdlO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlRlc3RUYWtlbkxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnRlc3RzVGFrZW47XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuVGVzdGluZ0F2Z0xhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnRlc3RpbmdBdmVyYWdlO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiQgXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaDtcclxuXHJcbiAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoX2lzVGVhY2hlcikge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlVUlDb250YWluZXIoMSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVNwZWN0YXRlQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLkNhc2hOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhKTtcclxuXHJcbiAgICAgICAgdmFyIF9hdmF0YXIgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5UZWFjaGVyRGF0YS5hdmF0YXJJZCk7XHJcbiAgICAgICAgaWYgKF9hdmF0YXIgPT0gdW5kZWZpbmVkIHx8IGlzTmFOKF9hdmF0YXIpID09IHRydWUgfHwgX2F2YXRhciA9PSBudWxsKSB7XHJcbiAgICAgICAgICBfYXZhdGFyID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduQXZhdGFyKF9hdmF0YXIpO1xyXG4gICAgICAgIEF2YXRhclNlbGVjdGlvbiA9IF9hdmF0YXI7XHJcblxyXG4gICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5OYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEubmFtZTtcclxuICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5DbGFzc1RhdWdodC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5UZWFjaGVyRGF0YS5jbGFzc1RhdWdodDtcclxuICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuU2Nob29sTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLnNjaG9vbDtcclxuICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuQ29udGFjdExhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLmNvbnRhY3ROdW1iZXI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoX2lzTWVudG9yKSB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcigyKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVBsYXlCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YSk7XHJcblxyXG4gICAgICAgIHZhciBfYXZhdGFyID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YS5hdmF0YXJJZCk7XHJcbiAgICAgICAgaWYgKF9hdmF0YXIgPT0gdW5kZWZpbmVkIHx8IGlzTmFOKF9hdmF0YXIpID09IHRydWUgfHwgX2F2YXRhciA9PSBudWxsKSB7XHJcbiAgICAgICAgICBfYXZhdGFyID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduQXZhdGFyKF9hdmF0YXIpO1xyXG4gICAgICAgIEF2YXRhclNlbGVjdGlvbiA9IF9hdmF0YXI7XHJcbiAgICAgICAgdGhpcy5NZW50b3JVSVByb2ZpbGUuTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLk1lbnRvckRhdGEubmFtZTtcclxuICAgICAgICB0aGlzLk1lbnRvclVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICB0aGlzLk1lbnRvclVJUHJvZmlsZS5BZGRyZXNzbGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YS5hZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuTWVudG9yVUlQcm9maWxlLkNvbnRhY3RMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLmNvbnRhY3ROdW1iZXI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoX2lzQWRtaW4pIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVVJQ29udGFpbmVyKDMpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUGxheUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTcGVjdGF0ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEpO1xyXG5cclxuICAgICAgICB2YXIgX2F2YXRhciA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YS5hdmF0YXJJZCk7XHJcbiAgICAgICAgaWYgKF9hdmF0YXIgPT0gdW5kZWZpbmVkIHx8IGlzTmFOKF9hdmF0YXIpID09IHRydWUgfHwgX2F2YXRhciA9PSBudWxsKSB7XHJcbiAgICAgICAgICBfYXZhdGFyID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduQXZhdGFyKF9hdmF0YXIpO1xyXG4gICAgICAgIEF2YXRhclNlbGVjdGlvbiA9IF9hdmF0YXI7XHJcbiAgICAgICAgdGhpcy5BZG1pblVJUHJvZmlsZS5OYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5BZG1pblVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuQWRtaW5VSVByb2ZpbGUuU2Nob29sTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YS5zY2hvb2xOYW1lO1xyXG4gICAgICAgIHRoaXMuQWRtaW5VSVByb2ZpbGUuQ29udGFjdExhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB9IGVsc2UgaWYgKF9pc0RpcmVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcig0KTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVBsYXlCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuRGlyZWN0b3JEYXRhKTtcclxuXHJcbiAgICAgICAgdmFyIF9hdmF0YXIgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5EaXJlY3RvckRhdGEuYXZhdGFySWQpO1xyXG4gICAgICAgIGlmIChfYXZhdGFyID09IHVuZGVmaW5lZCB8fCBpc05hTihfYXZhdGFyKSA9PSB0cnVlIHx8IF9hdmF0YXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgX2F2YXRhciA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkF2YXRhcihfYXZhdGFyKTtcclxuICAgICAgICBBdmF0YXJTZWxlY3Rpb24gPSBfYXZhdGFyO1xyXG4gICAgICAgIHRoaXMuRGlyZWN0b3JVSVByb2ZpbGUuTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkRpcmVjdG9yRGF0YS5uYW1lO1xyXG4gICAgICAgIHRoaXMuRGlyZWN0b3JVSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuRGlyZWN0b3JEYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpID09IDIpIHtcclxuICAgICAgLy91c2VyIG5vdCBmb3VuZFxyXG4gICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJubyB1c2VyIHJlZ2lzdGVyZWQgd2l0aCBlbnRlcmVkIGVtYWlsLlwiKTtcclxuICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKSA9PSAzKSB7XHJcbiAgICAgIC8vcGFzcy9lbWFpbCBpbnZhbGlkXHJcbiAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInVzZXIgZW1haWwgb3IgcGFzc3dvcmQgaXMgd3JvbmdcIik7XHJcbiAgICB9IGVsc2UgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlc3BvbnNlVHlwZSkgPT0gNCkge1xyXG4gICAgICAvL3NvbWV0aGluZyB3ZW50IHdyb25nXHJcbiAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInNvbWV0aGluZyB3ZW50IHdyb25nIHBsZWFzZSB0cnkgYWdhaW4uXCIpO1xyXG4gICAgfSBlbHNlIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpID09IDUpIHtcclxuICAgICAgLy9zb21ldGhpbmcgd2VudCB3cm9uZ1xyXG4gICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJsaWNlbnNlIGtleSBpcyBub3QgdmFsaWQuXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVaSBXb3JrXHJcbiAgVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKF9zdGF0ZSkge1xyXG4gICAgaWYgKF9zdGF0ZSkgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLlVJU3BlY3RhdGUuUm9vbVNjcmVlbk5vZGUuYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuVUlTcGVjdGF0ZS5Qcm9maWxlU2NyZWVuTm9kZS5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2hvd0F2YWlsYWJsZVJvb21zX1NwZWN0YXRlVUkoKSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0luTG9iYnkoKSkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZVNob3dSb29tX0Jvb2wodHJ1ZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVxdWVzdENvbm5lY3Rpb24oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShfbmFtZSwgX3BsYXllcnMpIHtcclxuICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5VSVNwZWN0YXRlLlJvb21QcmVmYWIpO1xyXG4gICAgbm9kZS5wYXJlbnQgPSB0aGlzLlVJU3BlY3RhdGUuU2Nyb2xsQmFyQ29udGVudDtcclxuICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUm9vbUxpc3RIYW5kbGVyXCIpLlNldFJvb21OYW1lKF9uYW1lKTtcclxuICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUm9vbUxpc3RIYW5kbGVyXCIpLlNldFBsYXllckNvdW50KF9wbGF5ZXJzKTtcclxuICAgIFRvdGFsUm9vbS5wdXNoKG5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0Um9vbUxpc3QoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgVG90YWxSb29tLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBUb3RhbFJvb21baW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBUb3RhbFJvb20gPSBbXTtcclxuICB9LFxyXG5cclxuICBFeGl0X1NwZWN0YXRlVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSSh0cnVlKTtcclxuICAgIHRoaXMuVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgIHRoaXMuRXhpdENvbm5lY3RpbmcoKTtcclxuICB9LFxyXG5cclxuICBMb2dvdXQoKSB7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2xlYXJEYXRhXCIpOyAvL2Z1bmN0aW9uIHdyaXR0ZW4gaW4gc3RvcmFnZSBNYW5hZ2VyIGNsYXNzXHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKSAhPSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkgIT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKSAhPSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKSAhPSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG5cclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG5cclxuICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIFNob3dUb2FzdDogZnVuY3Rpb24gKG1zZywgX3RpbWUgPSAyMDAwKSB7XHJcbiAgICB0aGlzLlRvYXN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5Ub2FzdE5vZGUuY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtc2c7XHJcbiAgICB2YXIgU2VsZlRvYXN0ID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBTZWxmVG9hc3QuVG9hc3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSwgX3RpbWUpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVSU1hbmFnZXI7XHJcbiJdfQ==