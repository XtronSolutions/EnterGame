
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxVSU1hbmFnZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHdlZW5SZWYiLCJUb3RhbFJvb20iLCJBdmF0YXJTZWxlY3Rpb24iLCJfdGVtcEF2YXRhclNlbGVjdGlvbiIsIlJvbGVzIiwiUHJvZmlsZVVJIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiTmFtZUxhYmVsIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiRW1haWxBZGRyZXNzTGFiZWwiLCJET0JMYWJlbCIsIkdyYWRlTGV2ZWxMYWJlbCIsIlRlYWNoZXJOYW1lTGFiZWwiLCJHYW1lc1dvbkxhYmVsIiwiRkJQYWdlTGFiZWwiLCJUZXN0VGFrZW5MYWJlbCIsIlRlc3RpbmdBdmdMYWJlbCIsIkNhc2hMYWJlbCIsIlN0YXR1c05vZGUiLCJOb2RlIiwiUGxheUJ1dHRvbk5vZGUiLCJTdGF0dXNMYWJlbCIsIlBsYXllckNvdW50SW5wdXQiLCJFZGl0Qm94IiwiRGlzdHJpY3RMYWJlbCIsIlBsYXlHYW1lQnV0dG9uIiwiU3BlY3RhdGVCdXR0b24iLCJDYXNoTm9kZSIsIlRlYWNoZXJQcm9maWxlVUkiLCJDbGFzc1RhdWdodCIsIlNjaG9vbE5hbWVMYWJlbCIsIkNvbnRhY3RMYWJlbCIsIk1lbnRvclByb2ZpbGVVSSIsIkFkZHJlc3NsYWJlbCIsIkFkbWluUHJvZmlsZVVJIiwiRGlyZWN0b3JQcm9maWxlVUkiLCJTcGVjdGF0ZVVJIiwiUm9vbVNjcmVlbk5vZGUiLCJTY3JvbGxCYXJDb250ZW50IiwiUHJvZmlsZVNjcmVlbk5vZGUiLCJSb29tUHJlZmFiIiwiUHJlZmFiIiwiQXZhdGFyVUkiLCJBdmF0YXJTZWxlY3Rpb25TY3JlZW4iLCJBdmF0YXJOb2RlcyIsIkF2YXRhckJ1dHRvbnMiLCJVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJVSVByb2ZpbGUiLCJUZWFjaGVyVUlQcm9maWxlIiwiTWVudG9yVUlQcm9maWxlIiwiQWRtaW5VSVByb2ZpbGUiLCJEaXJlY3RvclVJUHJvZmlsZSIsIkF2YXRhclVJU2V0dXAiLCJTY3JlZW5Ob2RlcyIsIlR3ZWVuTWFuYWdlclJlZiIsIkxvZ28iLCJUb2FzdE5vZGUiLCJMb2FkaW5nTm9kZSIsIlJlZmVyZW5jZU1hbmFnZXJSZWYiLCJNb2RlU2VsZWN0aW9uU2NyZWVuIiwiVUlTcGVjdGF0ZSIsIlVJQ29udGFpbmVyIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiQXNzaWduUHJvZmlsZURhdGEiLCJVcGRhdGVTdGF0dXNXaW5kb3ciLCJDaGFuZ2VQYW5lbFNjcmVlbiIsIm9uRGlzYWJsZSIsIm9mZiIsIm9uTG9hZCIsImdldENvbXBvbmVudCIsIlNlbGVjdGVkUm9sZSIsIlNlbGVjdGVkUm9sZUluZGV4IiwiRW1haWxUZXh0IiwiUGFzc3dvcmRUZXh0Iiwibm9kZUNvdW50ZXIiLCJTdGF0dXNUZXh0IiwiVG90YWxQbGF5ZXJzIiwiUmVzZXRQbGF5ZXJDb3VudElucHV0IiwiR2V0VHdlZW5NYW5hZ2VyUmVmZXJlbmNlIiwiU2xpZGVJbkxvZ2luQ29tcG9uZW50cyIsIlJlcGVhdExvZ29BbmltYXRpb24iLCJDaGVja1JlZmVyZW5jZXMiLCJUb2dnbGVQbGF5QnV0dG9uIiwiX3N0YXRlIiwiYWN0aXZlIiwiVG9nZ2xlU3BlY3RhdGVCdXR0b24iLCJyZXF1aXJlIiwiaXNOZXh0IiwiY2hhbmdlU2NyZWVuIiwic2NlbmVOYW1lIiwiRmFkZU5vZGVJbk91dCIsImxlbmd0aCIsInNldFRpbWVvdXQiLCJNYW5pcHVsYXRlTm9kZXMiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsImNvdW50ZXIiLCJpbmRleCIsImNvbnNvbGUiLCJsb2ciLCJMb2dpblNjcmVlblR3ZWVuIiwiY2hpbGRyZW4iLCJSZXBlYXRUd2VlblNjYWxlIiwic3RyaW5nIiwiT25wbGF5ZXJOdW1iZXJDaGFuZ2VkIiwiX251bWJlciIsIlBsYXlHYW1lIiwiVmVyc2VzUGxheWVyTW9kZSIsIkJhY2tTZWxlY3Rpb25Nb2RlIiwiVG9nZ2xlTW9kZVNlbGVjdGlvbiIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJUb2dnbGVTaG93Um9vbV9Cb29sIiwiZ2V0UGhvdG9uUmVmIiwiaXNDb25uZWN0ZWRUb01hc3RlciIsImlzSW5Mb2JieSIsImVtaXQiLCJKb2luUmFuZG9tUm9vbSIsIlJlcXVlc3RDb25uZWN0aW9uIiwiVmVyc2VzQUlNb2RlIiwiTWF4UGxheWVycyIsIkpvaW5lZFJvb20iLCJtc2ciLCJFeGl0Q29ubmVjdGluZyIsIlJlc2V0Um9vbVZhbHVlcyIsIkRpc2Nvbm5lY3RQaG90b24iLCJUb2dnbGVMb2FkaW5nTm9kZSIsInN0YXRlIiwiTG9naW5Vc2VyIiwiYW5pbSIsIkFuaW1hdGlvbiIsInBsYXkiLCJHZXRfU2VydmVyQmFja2VuZCIsIlNob3dUb2FzdCIsIk9uUm9sZVRvZ2dsZWQiLCJfdmFsIiwibm9kZSIsInNwbGl0IiwiU2V0RW1haWxUZXh0IiwidGV4dCIsIlNldFBhc3N3b3JkVGV4dCIsIlRvZ2dsZVVJQ29udGFpbmVyIiwiX21haW5JbmRleCIsIkFzc2lnbkF2YXRhciIsIl9pbmRleCIsIlRvZ2dsZUF2YXRhclNjcmVlbiIsIkVuYWJsZUF2YXRhclNjcmVlbiIsIkRpc2FibGVBdmF0YXJTY3JlZW4iLCJBc3NpZ25EYXRhQ2xhc3NlcyIsIlVwZGF0ZVVzZXJEYXRhIiwiQXNzaWduQXZhdGFyU2VsZWN0aW9uIiwiZXZlbnQiLCJwYXJzZUludCIsImN1cnJlbnRUYXJnZXQiLCJfSUQiLCJTdHVkZW50RGF0YSIsImF2YXRhcklkIiwidG9TdHJpbmciLCJUZWFjaGVyRGF0YSIsIk1lbnRvckRhdGEiLCJBZG1pbkRhdGEiLCJEaXJlY3RvckRhdGEiLCJfaXNTdHVkZW50IiwiX2lzVGVhY2hlciIsIl9pc01lbnRvciIsIl9pc0FkbWluIiwiX2lzRGlyZWN0b3IiLCJSZXNwb25zZVR5cGUiLCJfYXZhdGFyIiwidW5kZWZpbmVkIiwiaXNOYU4iLCJlbWFpbEFkZHJlc3MiLCJkT0IiLCJncmFkZUxldmVsIiwidGVhY2hlck5hbWUiLCJnYW1lc1dvbiIsImZhY2Vib29rUGFnZSIsInRlc3RzVGFrZW4iLCJ0ZXN0aW5nQXZlcmFnZSIsImdhbWVDYXNoIiwiY2xhc3NUYXVnaHQiLCJzY2hvb2wiLCJjb250YWN0TnVtYmVyIiwiYWRkcmVzcyIsInNjaG9vbE5hbWUiLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJTaG93QXZhaWxhYmxlUm9vbXNfU3BlY3RhdGVVSSIsIlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJIiwiX25hbWUiLCJfcGxheWVycyIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiU2V0Um9vbU5hbWUiLCJTZXRQbGF5ZXJDb3VudCIsInB1c2giLCJSZXNldFJvb21MaXN0IiwiZGVzdHJveSIsIkV4aXRfU3BlY3RhdGVVSSIsIkxvZ291dCIsIkdldF9HYW1lTWFuYWdlciIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiX3RpbWUiLCJTZWxmVG9hc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0EsSUFBSUEsd0JBQXdCLEdBQUcsSUFBL0I7QUFDQSxJQUFJQyxRQUFKO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLENBQXRCO0FBQ0EsSUFBSUMsb0JBQW9CLEdBQUcsQ0FBM0I7QUFDQSxJQUFJQyxLQUFLLEdBQUcsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixtQkFBdkIsRUFBNEMsYUFBNUMsRUFBMkQsaUJBQTNELENBQVosRUFDQTs7QUFDQSxJQUFJQyxTQUFTLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3ZC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LENBQUN3RSxRQUF6QixDQUFrQ2dKLDBCQUFsQyxHQUErREQsaUJBQS9EO0FBRTVFLFFBQUl2Tix3QkFBd0IsQ0FBQ3dFLFFBQXpCLENBQWtDeUUsaUJBQWxDLE1BQXlELElBQTdELEVBQW1Fakosd0JBQXdCLENBQUN3RSxRQUF6QixDQUFrQ3lFLGlCQUFsQyxHQUFzRHNFLGlCQUF0RDtBQUVuRXZOLElBQUFBLHdCQUF3QixDQUFDd0UsUUFBekIsQ0FBa0MrSSxpQkFBbEM7QUFFQWhOLElBQUFBLEVBQUUsQ0FBQ3FHLFFBQUgsQ0FBWUMsU0FBWixDQUFzQixVQUF0QjtBQUNELEdBemtCc0I7QUEwa0J2QjtBQUVBcUMsRUFBQUEsU0FBUyxFQUFFLG1CQUFVWCxHQUFWLEVBQWVrRixLQUFmLEVBQTZCO0FBQUEsUUFBZEEsS0FBYztBQUFkQSxNQUFBQSxLQUFjLEdBQU4sSUFBTTtBQUFBOztBQUN0QyxTQUFLeEosU0FBTCxDQUFlaUMsTUFBZixHQUF3QixJQUF4QjtBQUNBLFNBQUtqQyxTQUFMLENBQWVrRCxRQUFmLENBQXdCLENBQXhCLEVBQTJCQSxRQUEzQixDQUFvQyxDQUFwQyxFQUF1Q2hDLFlBQXZDLENBQW9ENUUsRUFBRSxDQUFDTyxLQUF2RCxFQUE4RHVHLE1BQTlELEdBQXVFa0IsR0FBdkU7QUFDQSxRQUFJbUYsU0FBUyxHQUFHLElBQWhCO0FBQ0FoSCxJQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNyQmdILE1BQUFBLFNBQVMsQ0FBQ3pKLFNBQVYsQ0FBb0JpQyxNQUFwQixHQUE2QixLQUE3QjtBQUNELEtBRlMsRUFFUHVILEtBRk8sQ0FBVjtBQUdEO0FBbmxCc0IsQ0FBVCxDQUFoQjtBQXNsQkFFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnRLLFNBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHdlZWVuIGZyb20gXCJUd2Vlbk1hbmFnZXJcIjtcclxuaW1wb3J0IFNlcnZlckJhY2tlbmQgZnJvbSBcIi4vU2VydmVyQmFja2VuZFwiO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIFR3ZWVuUmVmO1xyXG52YXIgVG90YWxSb29tID0gW107XHJcbnZhciBBdmF0YXJTZWxlY3Rpb24gPSAwO1xyXG52YXIgX3RlbXBBdmF0YXJTZWxlY3Rpb24gPSAwO1xyXG52YXIgUm9sZXMgPSBbXCJTdHVkZW50XCIsIFwiVGVhY2hlclwiLCBcIlByb2dyYW1BbWJhc3NhZG9yXCIsIFwiU2Nob29sQWRtaW5cIiwgXCJQcm9ncmFtRGlyZWN0b3JcIl07XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQcm9maWxlVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQcm9maWxlVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFbWFpbEFkZHJlc3NcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGVtYWlsIGFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZSBcIixcclxuICAgIH0sXHJcbiAgICBET0JMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJET0JcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gRE9CIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBHcmFkZUxldmVsTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR3JhZGVMZXZlbFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBHcmFkZSBMZXZlbCBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgVGVhY2hlck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUZWFjaGVyTmFtZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBUZWFjaGVyIE5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEdhbWVzV29uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR2FtZXNXb25cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gZ2FtZXMgd29uIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBGQlBhZ2VMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJGQlBhZ2VcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gZmFjZWJvb2sgcGFnZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgVGVzdFRha2VuTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGVzdFRha2VuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIHRlc3QgdGFrZW4gbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIFRlc3RpbmdBdmdMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUZXN0aW5nQXZlcmFnZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBUZXN0aW5nIEF2ZXJhZ2UgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGNhc2ggbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIFN0YXR1c05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RhdHVzU2NyZWVuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU3RhdHVzIFNjcmVlbiBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheUJ1dHRvbk5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheUJ1dHRvblwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIHBsYXkgYnV0dG9uIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBTdGF0dXNMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdGF0dXNUZXh0XCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFN0YXR1cyBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ291bnRJbnB1dDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDb3VudElucHV0XCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gUGxheWVyQ291bnRJbnB1dCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgRGlzdHJpY3RMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaXN0cmljdExhYmVsXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIERpc3RyaWN0TGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXlHYW1lQnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXlHYW1lQnV0dG9uXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gUGxheUdhbWVCdXR0b24gb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIFNwZWN0YXRlQnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNwZWN0YXRlQnV0dG9uXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU3BlY3RhdGVCdXR0b24gb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hOb2RlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQ2FzaE5vZGUgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIHRlYWNoZXIgUHJvZmlsZSBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVGVhY2hlclByb2ZpbGVVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlRlYWNoZXJQcm9maWxlVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFbWFpbEFkZHJlc3NcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGVtYWlsIGFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZSBcIixcclxuICAgIH0sXHJcbiAgICBDbGFzc1RhdWdodDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDbGFzc1RhdWdodFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBDbGFzc1RhdWdodCBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nob29sTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjaG9vbE5hbWVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU2Nob29sTmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgQ29udGFjdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNvbnRhY3RcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQ29udGFjdCBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIE1lbnRvciBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBNZW50b3JQcm9maWxlVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJNZW50b3JQcm9maWxlVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFbWFpbEFkZHJlc3NcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGVtYWlsIGFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZSBcIixcclxuICAgIH0sXHJcbiAgICBBZGRyZXNzbGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQWRkcmVzc1wiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBBZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBDb250YWN0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ29udGFjdFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBDb250YWN0IGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQWRtaW4gUHJvZmlsZSBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQWRtaW5Qcm9maWxlVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJBZG1pblByb2ZpbGVVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLFxyXG4gICAgfSxcclxuICAgIFNjaG9vbE5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY2hvb2xOYW1lXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFNjaG9vbE5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIENvbnRhY3RMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDb250YWN0XCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIENvbnRhY3QgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBkaXJlY3RvciBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBEaXJlY3RvclByb2ZpbGVVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkRpcmVjdG9yUHJvZmlsZVVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5hbWVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgRW1haWxBZGRyZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRW1haWxBZGRyZXNzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBlbWFpbCBhZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGUgXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3BlY3RhdGVVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3BlY3RhdGVVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNwZWN0YXRlVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBSb29tU2NyZWVuTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSb29tU2NyZWVuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2Ygcm9vbSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBTY3JvbGxCYXJDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbEJhckNvbnRlbnRcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byB0aGUgbm9kZSBvZiBTY3JvbGxCYXJDb250ZW50IG9mIHJvb20gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUHJvZmlsZVNjcmVlbk5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUHJvZmlsZVNjcmVlblwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBub2RlIG9mIHByb2ZpbGUgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUm9vbVByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSb29tUHJlZmFiXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFJvb20gb24gcm9vbSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQXZhdGFyVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEF2YXRhclVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQXZhdGFyVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBBdmF0YXJTZWxlY3Rpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFyU2VsZWN0aW9uU2NyZWVuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBBdmF0YXJOb2Rlczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBdmF0YXJOb2Rlc1wiLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQXZhdGFyQnV0dG9uczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBdmF0YXJCdXR0b25zXCIsXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVSU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJVSU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFVJUHJvZmlsZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJVSVByb2ZpbGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUHJvZmlsZVVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFByb2ZpbGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICB9LFxyXG4gICAgVGVhY2hlclVJUHJvZmlsZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUZWFjaGVyVUlQcm9maWxlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFRlYWNoZXJQcm9maWxlVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gVGVhY2hlclByb2ZpbGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIE1lbnRvclVJUHJvZmlsZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNZW50b3JVSVByb2ZpbGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogTWVudG9yUHJvZmlsZVVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIE1lbnRvclByb2ZpbGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIEFkbWluVUlQcm9maWxlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFkbWluVUlQcm9maWxlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEFkbWluUHJvZmlsZVVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIEFkbWluUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgIH0sXHJcblxyXG4gICAgRGlyZWN0b3JVSVByb2ZpbGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGlyZWN0b3JVSVByb2ZpbGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogRGlyZWN0b3JQcm9maWxlVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gRGlyZWN0b3JQcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBBdmF0YXJVSVNldHVwOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhclVJU2V0dXBcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogQXZhdGFyVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQXZhdGFyVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBTY3JlZW5Ob2Rlczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JlZW5Ob2Rlc1wiLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGxvZ2luIHNjcmVlbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHdlZW5NYW5hZ2VyUmVmOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR3ZWVuTWFuYWdlclJlZlwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBUd2VlbiBNYW5hZ2VyIFNjcmlwdCBcIixcclxuICAgIH0sXHJcbiAgICBMb2dvOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvZ29Ob2RlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIHRoZSBsb2dvIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb2FzdE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG9hc3ROb2RlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIHRoZSB0b2FzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hZGluZ05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hZGluZ05vZGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIExvYWRpbmcgTm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFJlZmVyZW5jZU1hbmFnZXJSZWY6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVmZXJlbmNlTWFuYWdlclJlZlwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgcmVmZXJlbmNlIG1hbmFnZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIE1vZGVTZWxlY3Rpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTW9kZVNlbGVjdGlvblNjcmVlblwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG1vZGUgc2VsZWN0aW9uIHNjcmVlbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVUlTcGVjdGF0ZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJVSVNwZWN0YXRlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IFNwZWN0YXRlVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU3BlY3RhdGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICB9LFxyXG4gICAgVUlDb250YWluZXI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVUlDb250YWluZXJcIixcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBVSUNvbnRhaW5lciBub2Rlc1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFJlc2V0QWxsRGF0YSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICBUd2VlblJlZjtcclxuICAgIFRvdGFsUm9vbSA9IFtdO1xyXG4gICAgQXZhdGFyU2VsZWN0aW9uID0gMDtcclxuICAgIF90ZW1wQXZhdGFyU2VsZWN0aW9uID0gMDtcclxuICB9LFxyXG5cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCB0aGlzLkFzc2lnblByb2ZpbGVEYXRhLCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIHRoaXMuVXBkYXRlU3RhdHVzV2luZG93LCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9uKFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdGhpcy5DaGFuZ2VQYW5lbFNjcmVlbiwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJBc3NpZ25Qcm9maWxlRGF0YVwiLCB0aGlzLkFzc2lnblByb2ZpbGVEYXRhLCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCB0aGlzLlVwZGF0ZVN0YXR1c1dpbmRvdywgdGhpcyk7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vZmYoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsRGF0YSgpO1xyXG4gICAgdGhpcy5SZWZlcmVuY2VNYW5hZ2VyUmVmID0gdGhpcy5SZWZlcmVuY2VNYW5hZ2VyUmVmLmdldENvbXBvbmVudChcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuXHJcbiAgICB0aGlzLlNlbGVjdGVkUm9sZSA9IFJvbGVzWzBdO1xyXG4gICAgdGhpcy5TZWxlY3RlZFJvbGVJbmRleCA9IDA7XHJcbiAgICBVSU1hbmFnZXIuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgVG90YWxSb29tID0gW107XHJcbiAgICAvL1ByaXZhdGUgVmFyaWFibGVzXHJcbiAgICB0aGlzLkVtYWlsVGV4dCA9IFwiXCI7XHJcbiAgICB0aGlzLlBhc3N3b3JkVGV4dCA9IFwiXCI7XHJcbiAgICB0aGlzLm5vZGVDb3VudGVyID0gMDtcclxuICAgIHRoaXMuU3RhdHVzVGV4dCA9IFwiXCI7XHJcbiAgICB0aGlzLlRvdGFsUGxheWVycyA9IFwiXCI7XHJcbiAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG5cclxuICAgIHRoaXMuR2V0VHdlZW5NYW5hZ2VyUmVmZXJlbmNlKCk7XHJcbiAgICB0aGlzLlNsaWRlSW5Mb2dpbkNvbXBvbmVudHMoKTtcclxuICAgIHRoaXMuUmVwZWF0TG9nb0FuaW1hdGlvbigpO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVQbGF5QnV0dG9uKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuUGxheUdhbWVCdXR0b24uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNwZWN0YXRlQnV0dG9uKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3BlY3RhdGVCdXR0b24uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZVBhbmVsU2NyZWVuOiBmdW5jdGlvbiAoaXNOZXh0LCBjaGFuZ2VTY3JlZW4sIHNjZW5lTmFtZSkge1xyXG4gICAgVHdlZW5SZWYuRmFkZU5vZGVJbk91dCh0aGlzLlNjcmVlbk5vZGVzW3RoaXMubm9kZUNvdW50ZXJdLCAwLjU1LCAyNTUsIDAsIFwicXVhZEluT3V0XCIpO1xyXG5cclxuICAgIGlmIChjaGFuZ2VTY3JlZW4gPT0gZmFsc2UpIHtcclxuICAgICAgaWYgKGlzTmV4dCA9PSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZUNvdW50ZXIgPCB0aGlzLlNjcmVlbk5vZGVzLmxlbmd0aCkgdGhpcy5ub2RlQ291bnRlciA9IHRoaXMubm9kZUNvdW50ZXIgKyAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGVDb3VudGVyID4gMCkgdGhpcy5ub2RlQ291bnRlciA9IHRoaXMubm9kZUNvdW50ZXIgLSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuTWFuaXB1bGF0ZU5vZGVzKHRoaXMubm9kZUNvdW50ZXIpO1xyXG4gICAgICB9LCA2MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHNjZW5lTmFtZSk7XHJcbiAgICAgIH0sIDYwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgTWFuaXB1bGF0ZU5vZGVzOiBmdW5jdGlvbiAoY291bnRlcikge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuU2NyZWVuTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChjb3VudGVyID09IGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5TY3JlZW5Ob2Rlc1tpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNldGluZyBpdCB0cnVlXCIpO1xyXG4gICAgICAgIFR3ZWVuUmVmLkZhZGVOb2RlSW5PdXQodGhpcy5TY3JlZW5Ob2Rlc1tpbmRleF0sIDEuNSwgMCwgMjU1LCBcInF1YWRJbk91dFwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNjcmVlbk5vZGVzW2luZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNsaWRlSW5Mb2dpbkNvbXBvbmVudHM6IGZ1bmN0aW9uICgpIHtcclxuICAgIFR3ZWVuUmVmLkxvZ2luU2NyZWVuVHdlZW4odGhpcy5TY3JlZW5Ob2Rlc1t0aGlzLm5vZGVDb3VudGVyXS5jaGlsZHJlblsxXSwgLTEwMDApO1xyXG4gIH0sXHJcblxyXG4gIFJlcGVhdExvZ29BbmltYXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIFR3ZWVuUmVmLlJlcGVhdFR3ZWVuU2NhbGUodGhpcy5Mb2dvLCAxLjEsIDEsIDAuOCk7XHJcbiAgfSxcclxuXHJcbiAgR2V0VHdlZW5NYW5hZ2VyUmVmZXJlbmNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBUd2VlblJlZiA9IHRoaXMuVHdlZW5NYW5hZ2VyUmVmLmdldENvbXBvbmVudChcIlR3ZWVuTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBSZXNldFBsYXllckNvdW50SW5wdXQoKSB7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5QbGF5ZXJDb3VudElucHV0LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLlRvdGFsUGxheWVycyA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgT25wbGF5ZXJOdW1iZXJDaGFuZ2VkKF9udW1iZXIpIHtcclxuICAgIHRoaXMuVG90YWxQbGF5ZXJzID0gX251bWJlcjtcclxuICB9LFxyXG5cclxuICBQbGF5R2FtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgIHRoaXMuVmVyc2VzUGxheWVyTW9kZSgpO1xyXG4gICAgLy90aGlzLlRvZ2dsZU1vZGVTZWxlY3Rpb24odHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgQmFja1NlbGVjdGlvbk1vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICB0aGlzLlRvZ2dsZU1vZGVTZWxlY3Rpb24oZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZU1vZGVTZWxlY3Rpb24oX3N0YXRlKSB7XHJcbiAgICB0aGlzLk1vZGVTZWxlY3Rpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFZlcnNlc1BsYXllck1vZGUoKSB7XHJcbiAgICAvLyBpZih0aGlzLlRvdGFsUGxheWVycz09XCJcIilcclxuICAgIC8vIHtcclxuICAgIC8vICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBlbnRlciBwbGF5ZXIgYW1vdW50IGZvciBtdWx0aXBsYXllciBmcm9tIDItNiwgbWFrZSBzdXJlIHRvIGhhdmUgc2FtZSBhbW91bnQgb24gZGlmZmVyZW50IGNvbm5lY3RpbmcgZGV2aWNlcyBpZiB5b3Ugd2FudCB0byBjb25uZWN0IHRoZW0uXCIsMzUwMCk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBlbHNlXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgdmFyIF9wbGF5ZXJzPXBhcnNlSW50KHRoaXMuVG90YWxQbGF5ZXJzKTtcclxuICAgIC8vICAgICBpZihfcGxheWVycz49MiAmJiBfcGxheWVyczw9NilcclxuICAgIC8vICAgICB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZU1vZGVTZWxlY3Rpb24oMik7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZVNob3dSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgLy90aGlzLlVJUHJvZmlsZS5QbGF5QnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM9X3BsYXllcnM7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSB8fFxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLmlzSW5Mb2JieSgpXHJcbiAgICApIHtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcIndhaXRpbmcgZm9yIG90aGVyIHBsYXllcnMuLi5cIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuSm9pblJhbmRvbVJvb20oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVxdWVzdENvbm5lY3Rpb24oKTtcclxuICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2UgZW50ZXIgcGxheWVyIGFtb3VudCBmb3IgbXVsdGlwbGF5ZXIgZnJvbSAyLTYsIG1ha2Ugc3VyZSB0byBoYXZlIHNhbWUgYW1vdW50IG9uIGRpZmZlcmVudCBjb25uZWN0aW5nIGRldmljZXMgaWYgeW91IHdhbnQgdG8gY29ubmVjdCB0aGVtLlwiLDM1MDApO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICB9LFxyXG5cclxuICBWZXJzZXNBSU1vZGUoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZU1vZGVTZWxlY3Rpb24oMSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZVNob3dSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IDI7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic2V0dGluZyB1cCBnYW1lLi4uXCIpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcIndhaXRpbmcgZm9yIEFJIFNldHVwLi4uXCIpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0cnVlLCB0cnVlLCBcIkdhbWVQbGF5XCIpOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgIH0sIDEwMDApO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVN0YXR1c1dpbmRvdzogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgdGhpcy5TdGF0dXNUZXh0ID0gdGhpcy5TdGF0dXNUZXh0ICsgbXNnICsgXCJcXG5cIjtcclxuICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZyA9IHRoaXMuU3RhdHVzVGV4dDtcclxuICB9LFxyXG5cclxuICBFeGl0Q29ubmVjdGluZzogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuVUlQcm9maWxlLlBsYXlCdXR0b25Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5FbWFpbFRleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5QYXNzd29yZFRleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5TdGF0dXNUZXh0ID0gXCJcIjtcclxuICAgIHRoaXMuVG90YWxQbGF5ZXJzID0gXCJcIjtcclxuICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlTG9hZGluZ05vZGUoc3RhdGUpIHtcclxuICAgIHRoaXMuTG9hZGluZ05vZGUuYWN0aXZlID0gc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgTG9naW5Vc2VyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5FbWFpbFRleHQgIT0gXCJcIiAmJiB0aGlzLlBhc3N3b3JkVGV4dCAhPSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUodHJ1ZSk7XHJcbiAgICAgIHZhciBhbmltID0gdGhpcy5Mb2FkaW5nTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgYW5pbS5wbGF5KFwibG9hZGluZ1wiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTG9naW5Vc2VyKHRoaXMuRW1haWxUZXh0LCB0aGlzLlBhc3N3b3JkVGV4dCwgdGhpcy5TZWxlY3RlZFJvbGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiRW1haWwgb3IgcGFzc3dvcmQgaW52YWxpZCBvciBlbXB0eS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25Sb2xlVG9nZ2xlZChfdmFsKSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKF92YWwpO1xyXG4gICAgY29uc29sZS5sb2coX3ZhbC5ub2RlLm5hbWUuc3BsaXQoXCJfXCIpWzFdKTtcclxuICAgIHRoaXMuU2VsZWN0ZWRSb2xlSW5kZXggPSBfdmFsLm5vZGUubmFtZS5zcGxpdChcIl9cIilbMV07XHJcbiAgICB0aGlzLlNlbGVjdGVkUm9sZSA9IFJvbGVzW3RoaXMuU2VsZWN0ZWRSb2xlSW5kZXhdO1xyXG4gIH0sXHJcblxyXG4gIFNldEVtYWlsVGV4dDogZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIHRoaXMuRW1haWxUZXh0ID0gdGV4dDtcclxuICB9LFxyXG5cclxuICBTZXRQYXNzd29yZFRleHQ6IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICB0aGlzLlBhc3N3b3JkVGV4dCA9IHRleHQ7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlVUlDb250YWluZXIoX21haW5JbmRleCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuVUlDb250YWluZXIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfbWFpbkluZGV4ID09IGluZGV4KSB0aGlzLlVJQ29udGFpbmVyW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBlbHNlIHRoaXMuVUlDb250YWluZXJbaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkF2YXRhcihfaW5kZXggPSAwKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhck5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX2luZGV4ID09IGluZGV4KSB0aGlzLkF2YXRhclVJU2V0dXAuQXZhdGFyTm9kZXNbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhck5vZGVzW2luZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUb2dnbGVBdmF0YXJTY3JlZW4oX3N0YXRlKSB7XHJcbiAgICB0aGlzLkF2YXRhclVJU2V0dXAuQXZhdGFyU2VsZWN0aW9uU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVBdmF0YXJTY3JlZW4oKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUF2YXRhclNjcmVlbih0cnVlKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhckJ1dHRvbnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChBdmF0YXJTZWxlY3Rpb24gPT0gaW5kZXgpIHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJCdXR0b25zW2luZGV4XS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBlbHNlIHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJCdXR0b25zW2luZGV4XS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBEaXNhYmxlQXZhdGFyU2NyZWVuKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVBdmF0YXJTY3JlZW4oZmFsc2UpO1xyXG5cclxuICAgIGlmIChfdGVtcEF2YXRhclNlbGVjdGlvbiAhPSBBdmF0YXJTZWxlY3Rpb24pIHtcclxuICAgICAgQXZhdGFyU2VsZWN0aW9uID0gX3RlbXBBdmF0YXJTZWxlY3Rpb247XHJcbiAgICAgIHRoaXMuQXNzaWduQXZhdGFyKEF2YXRhclNlbGVjdGlvbik7XHJcbiAgICAgIHRoaXMuQXNzaWduRGF0YUNsYXNzZXMoQXZhdGFyU2VsZWN0aW9uKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVXBkYXRlVXNlckRhdGEoLTEsIC0xLCBBdmF0YXJTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgQXNzaWduQXZhdGFyU2VsZWN0aW9uKGV2ZW50ID0gbnVsbCkge1xyXG4gICAgX3RlbXBBdmF0YXJTZWxlY3Rpb24gPSBwYXJzZUludChldmVudC5jdXJyZW50VGFyZ2V0Lm5hbWUuc3BsaXQoXCJfXCIpWzFdKTtcclxuICAgIGNvbnNvbGUubG9nKF90ZW1wQXZhdGFyU2VsZWN0aW9uKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhckJ1dHRvbnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfdGVtcEF2YXRhclNlbGVjdGlvbiA9PSBpbmRleCkgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhckJ1dHRvbnNbaW5kZXhdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhckJ1dHRvbnNbaW5kZXhdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFDbGFzc2VzKF9JRCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuYXZhdGFySWQgPSBfSUQudG9TdHJpbmcoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLmF2YXRhcklkID0gX0lELnRvU3RyaW5nKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLmF2YXRhcklkID0gX0lELnRvU3RyaW5nKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEgPSBfSUQudG9TdHJpbmcoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkRpcmVjdG9yRGF0YS5hdmF0YXJJZCA9IF9JRC50b1N0cmluZygpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnblByb2ZpbGVEYXRhOiBmdW5jdGlvbiAoX2lzU3R1ZGVudCA9IGZhbHNlLCBfaXNUZWFjaGVyID0gZmFsc2UsIF9pc01lbnRvciA9IGZhbHNlLCBfaXNBZG1pbiA9IGZhbHNlLCBfaXNEaXJlY3RvciA9IGZhbHNlKSB7XHJcbiAgICAvL2NvbnNvbGUuZXJyb3IocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKSk7XHJcbiAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKSA9PSAxKSB7XHJcbiAgICAgIC8vbWVhbnMgc3VjY2Vzc2Z1bFxyXG4gICAgICB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuKHRydWUsIGZhbHNlLCBcIlwiKTtcclxuXHJcbiAgICAgIGlmIChfaXNTdHVkZW50KSB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcigwKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVBsYXlCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTcGVjdGF0ZUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcblxyXG4gICAgICAgIHZhciBfYXZhdGFyID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuYXZhdGFySWQpO1xyXG4gICAgICAgIGlmIChfYXZhdGFyID09IHVuZGVmaW5lZCB8fCBpc05hTihfYXZhdGFyKSA9PSB0cnVlIHx8IF9hdmF0YXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgX2F2YXRhciA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkF2YXRhcihfYXZhdGFyKTtcclxuICAgICAgICBBdmF0YXJTZWxlY3Rpb24gPSBfYXZhdGFyO1xyXG5cclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5OYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuRE9CTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZE9CO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLkdyYWRlTGV2ZWxMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5ncmFkZUxldmVsO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlRlYWNoZXJOYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudGVhY2hlck5hbWU7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuR2FtZXNXb25MYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbjtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5GQlBhZ2VMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5mYWNlYm9va1BhZ2U7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuVGVzdFRha2VuTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudGVzdHNUYWtlbjtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5UZXN0aW5nQXZnTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaExhYmVsLnN0cmluZyA9IFwiJCBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoO1xyXG5cclxuICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgfSBlbHNlIGlmIChfaXNUZWFjaGVyKSB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcigxKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVBsYXlCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEpO1xyXG5cclxuICAgICAgICB2YXIgX2F2YXRhciA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLmF2YXRhcklkKTtcclxuICAgICAgICBpZiAoX2F2YXRhciA9PSB1bmRlZmluZWQgfHwgaXNOYU4oX2F2YXRhcikgPT0gdHJ1ZSB8fCBfYXZhdGFyID09IG51bGwpIHtcclxuICAgICAgICAgIF9hdmF0YXIgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25BdmF0YXIoX2F2YXRhcik7XHJcbiAgICAgICAgQXZhdGFyU2VsZWN0aW9uID0gX2F2YXRhcjtcclxuXHJcbiAgICAgICAgdGhpcy5UZWFjaGVyVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5UZWFjaGVyRGF0YS5uYW1lO1xyXG4gICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5UZWFjaGVyRGF0YS5lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5UZWFjaGVyVUlQcm9maWxlLkNsYXNzVGF1Z2h0LnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLmNsYXNzVGF1Z2h0O1xyXG4gICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5TY2hvb2xOYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuc2Nob29sO1xyXG4gICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5Db250YWN0TGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuY29udGFjdE51bWJlcjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgfSBlbHNlIGlmIChfaXNNZW50b3IpIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVVJQ29udGFpbmVyKDIpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUGxheUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTcGVjdGF0ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhKTtcclxuXHJcbiAgICAgICAgdmFyIF9hdmF0YXIgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLmF2YXRhcklkKTtcclxuICAgICAgICBpZiAoX2F2YXRhciA9PSB1bmRlZmluZWQgfHwgaXNOYU4oX2F2YXRhcikgPT0gdHJ1ZSB8fCBfYXZhdGFyID09IG51bGwpIHtcclxuICAgICAgICAgIF9hdmF0YXIgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25BdmF0YXIoX2F2YXRhcik7XHJcbiAgICAgICAgQXZhdGFyU2VsZWN0aW9uID0gX2F2YXRhcjtcclxuICAgICAgICB0aGlzLk1lbnRvclVJUHJvZmlsZS5OYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YS5uYW1lO1xyXG4gICAgICAgIHRoaXMuTWVudG9yVUlQcm9maWxlLkVtYWlsQWRkcmVzc0xhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLk1lbnRvckRhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuTWVudG9yVUlQcm9maWxlLkFkZHJlc3NsYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLmFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5NZW50b3JVSVByb2ZpbGUuQ29udGFjdExhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLk1lbnRvckRhdGEuY29udGFjdE51bWJlcjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgfSBlbHNlIGlmIChfaXNBZG1pbikge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlVUlDb250YWluZXIoMyk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVNwZWN0YXRlQnV0dG9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLkNhc2hOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YSk7XHJcblxyXG4gICAgICAgIHZhciBfYXZhdGFyID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhLmF2YXRhcklkKTtcclxuICAgICAgICBpZiAoX2F2YXRhciA9PSB1bmRlZmluZWQgfHwgaXNOYU4oX2F2YXRhcikgPT0gdHJ1ZSB8fCBfYXZhdGFyID09IG51bGwpIHtcclxuICAgICAgICAgIF9hdmF0YXIgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25BdmF0YXIoX2F2YXRhcik7XHJcbiAgICAgICAgQXZhdGFyU2VsZWN0aW9uID0gX2F2YXRhcjtcclxuICAgICAgICB0aGlzLkFkbWluVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEubmFtZTtcclxuICAgICAgICB0aGlzLkFkbWluVUlQcm9maWxlLkVtYWlsQWRkcmVzc0xhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YS5lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5BZG1pblVJUHJvZmlsZS5TY2hvb2xOYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhLnNjaG9vbE5hbWU7XHJcbiAgICAgICAgdGhpcy5BZG1pblVJUHJvZmlsZS5Db250YWN0TGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhLmNvbnRhY3ROdW1iZXI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoX2lzRGlyZWN0b3IpIHtcclxuICAgICAgICB0aGlzLlRvZ2dsZVVJQ29udGFpbmVyKDQpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUGxheUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTcGVjdGF0ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5EaXJlY3RvckRhdGEpO1xyXG5cclxuICAgICAgICB2YXIgX2F2YXRhciA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkRpcmVjdG9yRGF0YS5hdmF0YXJJZCk7XHJcbiAgICAgICAgaWYgKF9hdmF0YXIgPT0gdW5kZWZpbmVkIHx8IGlzTmFOKF9hdmF0YXIpID09IHRydWUgfHwgX2F2YXRhciA9PSBudWxsKSB7XHJcbiAgICAgICAgICBfYXZhdGFyID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduQXZhdGFyKF9hdmF0YXIpO1xyXG4gICAgICAgIEF2YXRhclNlbGVjdGlvbiA9IF9hdmF0YXI7XHJcbiAgICAgICAgdGhpcy5EaXJlY3RvclVJUHJvZmlsZS5OYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuRGlyZWN0b3JEYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5EaXJlY3RvclVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5EaXJlY3RvckRhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlc3BvbnNlVHlwZSkgPT0gMikge1xyXG4gICAgICAvL3VzZXIgbm90IGZvdW5kXHJcbiAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIm5vIHVzZXIgcmVnaXN0ZXJlZCB3aXRoIGVudGVyZWQgZW1haWwuXCIpO1xyXG4gICAgfSBlbHNlIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpID09IDMpIHtcclxuICAgICAgLy9wYXNzL2VtYWlsIGludmFsaWRcclxuICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwidXNlciBlbWFpbCBvciBwYXNzd29yZCBpcyB3cm9uZ1wiKTtcclxuICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKSA9PSA0KSB7XHJcbiAgICAgIC8vc29tZXRoaW5nIHdlbnQgd3JvbmdcclxuICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29tZXRoaW5nIHdlbnQgd3JvbmcgcGxlYXNlIHRyeSBhZ2Fpbi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jcmVnaW9uIFNwZWN0YXRlIFVpIFdvcmtcclxuICBUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkoX3N0YXRlKSB7XHJcbiAgICBpZiAoX3N0YXRlKSB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuVUlTcGVjdGF0ZS5Sb29tU2NyZWVuTm9kZS5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5VSVNwZWN0YXRlLlByb2ZpbGVTY3JlZW5Ob2RlLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTaG93QXZhaWxhYmxlUm9vbXNfU3BlY3RhdGVVSSgpIHtcclxuICAgIGlmIChcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgfHxcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0luTG9iYnkoKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgICAgdGhpcy5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlU2hvd1Jvb21fQm9vbCh0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXF1ZXN0Q29ubmVjdGlvbigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKF9uYW1lLCBfcGxheWVycykge1xyXG4gICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlVJU3BlY3RhdGUuUm9vbVByZWZhYik7XHJcbiAgICBub2RlLnBhcmVudCA9IHRoaXMuVUlTcGVjdGF0ZS5TY3JvbGxCYXJDb250ZW50O1xyXG4gICAgbm9kZS5nZXRDb21wb25lbnQoXCJSb29tTGlzdEhhbmRsZXJcIikuU2V0Um9vbU5hbWUoX25hbWUpO1xyXG4gICAgbm9kZS5nZXRDb21wb25lbnQoXCJSb29tTGlzdEhhbmRsZXJcIikuU2V0UGxheWVyQ291bnQoX3BsYXllcnMpO1xyXG4gICAgVG90YWxSb29tLnB1c2gobm9kZSk7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRSb29tTGlzdCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBUb3RhbFJvb20ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIFRvdGFsUm9vbVtpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIFRvdGFsUm9vbSA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfU3BlY3RhdGVVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKHRydWUpO1xyXG4gICAgdGhpcy5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkoZmFsc2UpO1xyXG4gICAgdGhpcy5FeGl0Q29ubmVjdGluZygpO1xyXG4gIH0sXHJcblxyXG4gIExvZ291dCgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDbGVhckRhdGFcIik7IC8vZnVuY3Rpb24gd3JpdHRlbiBpbiBzdG9yYWdlIE1hbmFnZXIgY2xhc3NcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpICE9IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKSAhPSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpICE9IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpICE9IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcblxyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcblxyXG4gICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpbk1lbnVcIik7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgU2hvd1RvYXN0OiBmdW5jdGlvbiAobXNnLCBfdGltZSA9IDIwMDApIHtcclxuICAgIHRoaXMuVG9hc3ROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlRvYXN0Tm9kZS5jaGlsZHJlblsxXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG1zZztcclxuICAgIHZhciBTZWxmVG9hc3QgPSB0aGlzO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIFNlbGZUb2FzdC5Ub2FzdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LCBfdGltZSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVJTWFuYWdlcjtcclxuIl19