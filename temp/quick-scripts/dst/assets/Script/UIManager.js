
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
    // if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckConnectionState() == true) {
    this.UIProfile.StatusNode.active = false;
    this.UIProfile.PlayButtonNode.active = true;
    this.UIProfile.StatusLabel.string = "";
    this.EmailText = "";
    this.PasswordText = "";
    this.StatusText = "";
    this.TotalPlayers = "";
    this.ResetPlayerCountInput();
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ClearTimer();
    GamePlayReferenceManager.Instance.Get_MultiplayerController().SetConneting(true);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ResetRoomValues();
    GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton(); // }
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
  // OnChangAvatarID: function (UID) {
  //   if (isNaN(UID) || UID == undefined) UID = 0;
  //   AvatarSelection = UID;
  // },
  DisableAvatarScreen: function DisableAvatarScreen() {
    this.ToggleAvatarScreen(false);

    if (_tempAvatarSelection != AvatarSelection) {
      AvatarSelection = _tempAvatarSelection;
      this.AssignAvatar(AvatarSelection);
      this.AssignDataClasses(AvatarSelection);
      console.log("Sending avatar selection to update: " + AvatarSelection);
      GamePlayReferenceManager.Instance.Get_ServerBackend().UpdateUserData(-1, -1, AvatarSelection);
    }
  },
  AssignAvatarSelection: function AssignAvatarSelection(event, _Selection) {
    if (event === void 0) {
      event = null;
    }

    if (_Selection === void 0) {
      _Selection = -1;
    }

    if (_Selection != -1) {
      _tempAvatarSelection = _Selection;
      console.log(_Selection);
    } else {
      _tempAvatarSelection = parseInt(event.currentTarget.name.split("_")[1]);
      console.log(_tempAvatarSelection);
    }

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
          _avatar = -1;
          this.AssignAvatarSelection(null, 0);
          this.EnableAvatarScreen();
        } //this.AssignAvatar(_avatar);


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
          this.AssignAvatarSelection(null, 0); //this.EnableAvatarScreen();
        } //this.AssignAvatar(_avatar);


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
          this.AssignAvatarSelection(null, 0); //this.EnableAvatarScreen();
        } //this.AssignAvatar(_avatar);


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
          this.AssignAvatarSelection(null, 0); // this.EnableAvatarScreen();
        } //this.AssignAvatar(_avatar);


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
          this.AssignAvatarSelection(null, 0); // this.EnableAvatarScreen();
        } //this.AssignAvatar(_avatar);


        AvatarSelection = _avatar;
        this.DirectorUIProfile.NameLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().DirectorData.name;
        this.DirectorUIProfile.EmailAddressLabel.string = GamePlayReferenceManager.Instance.Get_ServerBackend().DirectorData.emailAddress;
        this.ToggleLoadingNode(false);
      }

      this.AssignAvatar(AvatarSelection);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxVSU1hbmFnZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHdlZW5SZWYiLCJUb3RhbFJvb20iLCJBdmF0YXJTZWxlY3Rpb24iLCJfdGVtcEF2YXRhclNlbGVjdGlvbiIsIlJvbGVzIiwiUHJvZmlsZVVJIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiTmFtZUxhYmVsIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiRW1haWxBZGRyZXNzTGFiZWwiLCJET0JMYWJlbCIsIkdyYWRlTGV2ZWxMYWJlbCIsIlRlYWNoZXJOYW1lTGFiZWwiLCJHYW1lc1dvbkxhYmVsIiwiRkJQYWdlTGFiZWwiLCJUZXN0VGFrZW5MYWJlbCIsIlRlc3RpbmdBdmdMYWJlbCIsIkNhc2hMYWJlbCIsIlN0YXR1c05vZGUiLCJOb2RlIiwiUGxheUJ1dHRvbk5vZGUiLCJTdGF0dXNMYWJlbCIsIlBsYXllckNvdW50SW5wdXQiLCJFZGl0Qm94IiwiRGlzdHJpY3RMYWJlbCIsIlBsYXlHYW1lQnV0dG9uIiwiU3BlY3RhdGVCdXR0b24iLCJDYXNoTm9kZSIsIlRlYWNoZXJQcm9maWxlVUkiLCJDbGFzc1RhdWdodCIsIlNjaG9vbE5hbWVMYWJlbCIsIkNvbnRhY3RMYWJlbCIsIk1lbnRvclByb2ZpbGVVSSIsIkFkZHJlc3NsYWJlbCIsIkFkbWluUHJvZmlsZVVJIiwiRGlyZWN0b3JQcm9maWxlVUkiLCJTcGVjdGF0ZVVJIiwiUm9vbVNjcmVlbk5vZGUiLCJTY3JvbGxCYXJDb250ZW50IiwiUHJvZmlsZVNjcmVlbk5vZGUiLCJSb29tUHJlZmFiIiwiUHJlZmFiIiwiQXZhdGFyVUkiLCJBdmF0YXJTZWxlY3Rpb25TY3JlZW4iLCJBdmF0YXJOb2RlcyIsIkF2YXRhckJ1dHRvbnMiLCJVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJVSVByb2ZpbGUiLCJUZWFjaGVyVUlQcm9maWxlIiwiTWVudG9yVUlQcm9maWxlIiwiQWRtaW5VSVByb2ZpbGUiLCJEaXJlY3RvclVJUHJvZmlsZSIsIkF2YXRhclVJU2V0dXAiLCJTY3JlZW5Ob2RlcyIsIlR3ZWVuTWFuYWdlclJlZiIsIkxvZ28iLCJUb2FzdE5vZGUiLCJMb2FkaW5nTm9kZSIsIlJlZmVyZW5jZU1hbmFnZXJSZWYiLCJNb2RlU2VsZWN0aW9uU2NyZWVuIiwiVUlTcGVjdGF0ZSIsIlVJQ29udGFpbmVyIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiQXNzaWduUHJvZmlsZURhdGEiLCJVcGRhdGVTdGF0dXNXaW5kb3ciLCJDaGFuZ2VQYW5lbFNjcmVlbiIsIm9uRGlzYWJsZSIsIm9mZiIsIm9uTG9hZCIsImdldENvbXBvbmVudCIsIlNlbGVjdGVkUm9sZSIsIlNlbGVjdGVkUm9sZUluZGV4IiwiRW1haWxUZXh0IiwiUGFzc3dvcmRUZXh0IiwiTGljZW5zZVRleHQiLCJub2RlQ291bnRlciIsIlN0YXR1c1RleHQiLCJUb3RhbFBsYXllcnMiLCJSZXNldFBsYXllckNvdW50SW5wdXQiLCJHZXRUd2Vlbk1hbmFnZXJSZWZlcmVuY2UiLCJTbGlkZUluTG9naW5Db21wb25lbnRzIiwiUmVwZWF0TG9nb0FuaW1hdGlvbiIsIkNoZWNrUmVmZXJlbmNlcyIsIlRvZ2dsZVBsYXlCdXR0b24iLCJfc3RhdGUiLCJhY3RpdmUiLCJUb2dnbGVTcGVjdGF0ZUJ1dHRvbiIsInJlcXVpcmUiLCJpc05leHQiLCJjaGFuZ2VTY3JlZW4iLCJzY2VuZU5hbWUiLCJGYWRlTm9kZUluT3V0IiwibGVuZ3RoIiwic2V0VGltZW91dCIsIk1hbmlwdWxhdGVOb2RlcyIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiY291bnRlciIsImluZGV4IiwiY29uc29sZSIsImxvZyIsIkxvZ2luU2NyZWVuVHdlZW4iLCJjaGlsZHJlbiIsIlJlcGVhdFR3ZWVuU2NhbGUiLCJzdHJpbmciLCJPbnBsYXllck51bWJlckNoYW5nZWQiLCJfbnVtYmVyIiwiUGxheUdhbWUiLCJUb2dnbGVNb2RlU2VsZWN0aW9uIiwiQmFja1NlbGVjdGlvbk1vZGUiLCJWZXJzZXNQbGF5ZXJNb2RlIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZVNob3dSb29tX0Jvb2wiLCJnZXRQaG90b25SZWYiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5IiwiZW1pdCIsIkpvaW5SYW5kb21Sb29tIiwiUmVxdWVzdENvbm5lY3Rpb24iLCJWZXJzZXNBSU1vZGUiLCJNYXhQbGF5ZXJzIiwiSm9pbmVkUm9vbSIsIm1zZyIsIkV4aXRDb25uZWN0aW5nIiwiQ2xlYXJUaW1lciIsIlNldENvbm5ldGluZyIsIlJlc2V0Um9vbVZhbHVlcyIsIkRpc2Nvbm5lY3RQaG90b24iLCJUb2dnbGVMb2FkaW5nTm9kZSIsInN0YXRlIiwiTG9naW5Vc2VyIiwiYW5pbSIsIkFuaW1hdGlvbiIsInBsYXkiLCJHZXRfU2VydmVyQmFja2VuZCIsIlNob3dUb2FzdCIsIk9uUm9sZVRvZ2dsZWQiLCJfdmFsIiwibm9kZSIsInNwbGl0IiwiU2V0RW1haWxUZXh0IiwidGV4dCIsIlNldFBhc3N3b3JkVGV4dCIsIlNldExpY2Vuc2VUZXh0IiwiVG9nZ2xlVUlDb250YWluZXIiLCJfbWFpbkluZGV4IiwiQXNzaWduQXZhdGFyIiwiX2luZGV4IiwiVG9nZ2xlQXZhdGFyU2NyZWVuIiwiRW5hYmxlQXZhdGFyU2NyZWVuIiwiRGlzYWJsZUF2YXRhclNjcmVlbiIsIkFzc2lnbkRhdGFDbGFzc2VzIiwiVXBkYXRlVXNlckRhdGEiLCJBc3NpZ25BdmF0YXJTZWxlY3Rpb24iLCJldmVudCIsIl9TZWxlY3Rpb24iLCJwYXJzZUludCIsImN1cnJlbnRUYXJnZXQiLCJfSUQiLCJTdHVkZW50RGF0YSIsImF2YXRhcklkIiwidG9TdHJpbmciLCJUZWFjaGVyRGF0YSIsIk1lbnRvckRhdGEiLCJBZG1pbkRhdGEiLCJEaXJlY3RvckRhdGEiLCJfaXNTdHVkZW50IiwiX2lzVGVhY2hlciIsIl9pc01lbnRvciIsIl9pc0FkbWluIiwiX2lzRGlyZWN0b3IiLCJSZXNwb25zZVR5cGUiLCJfYXZhdGFyIiwidW5kZWZpbmVkIiwiaXNOYU4iLCJlbWFpbEFkZHJlc3MiLCJkT0IiLCJncmFkZUxldmVsIiwidGVhY2hlck5hbWUiLCJnYW1lc1dvbiIsImZhY2Vib29rUGFnZSIsInRlc3RzVGFrZW4iLCJ0ZXN0aW5nQXZlcmFnZSIsImdhbWVDYXNoIiwiY2xhc3NUYXVnaHQiLCJzY2hvb2wiLCJjb250YWN0TnVtYmVyIiwiYWRkcmVzcyIsInNjaG9vbE5hbWUiLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJTaG93QXZhaWxhYmxlUm9vbXNfU3BlY3RhdGVVSSIsIlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJIiwiX25hbWUiLCJfcGxheWVycyIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiU2V0Um9vbU5hbWUiLCJTZXRQbGF5ZXJDb3VudCIsInB1c2giLCJSZXNldFJvb21MaXN0IiwiZGVzdHJveSIsIkV4aXRfU3BlY3RhdGVVSSIsIkxvZ291dCIsIkdldF9HYW1lTWFuYWdlciIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiX3RpbWUiLCJTZWxmVG9hc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0EsSUFBSUEsd0JBQXdCLEdBQUcsSUFBL0I7QUFDQSxJQUFJQyxRQUFKO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLENBQXRCO0FBQ0EsSUFBSUMsb0JBQW9CLEdBQUcsQ0FBM0I7QUFDQSxJQUFJQyxLQUFLLEdBQUcsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixtQkFBdkIsRUFBNEMsYUFBNUMs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M0ssU0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUd2VlZW4gZnJvbSBcIlR3ZWVuTWFuYWdlclwiO1xyXG5pbXBvcnQgU2VydmVyQmFja2VuZCBmcm9tIFwiLi9TZXJ2ZXJCYWNrZW5kXCI7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgVHdlZW5SZWY7XHJcbnZhciBUb3RhbFJvb20gPSBbXTtcclxudmFyIEF2YXRhclNlbGVjdGlvbiA9IDA7XHJcbnZhciBfdGVtcEF2YXRhclNlbGVjdGlvbiA9IDA7XHJcbnZhciBSb2xlcyA9IFtcIlN0dWRlbnRcIiwgXCJUZWFjaGVyXCIsIFwiUHJvZ3JhbUFtYmFzc2Fkb3JcIiwgXCJTY2hvb2xBZG1pblwiLCBcIlByb2dyYW1EaXJlY3RvclwiXTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFByb2ZpbGVVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlByb2ZpbGVVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLFxyXG4gICAgfSxcclxuICAgIERPQkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRPQlwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBET0IgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEdyYWRlTGV2ZWxMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHcmFkZUxldmVsXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIEdyYWRlIExldmVsIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBUZWFjaGVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRlYWNoZXJOYW1lXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFRlYWNoZXIgTmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgR2FtZXNXb25MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHYW1lc1dvblwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBnYW1lcyB3b24gbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEZCUGFnZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkZCUGFnZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBmYWNlYm9vayBwYWdlIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBUZXN0VGFrZW5MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUZXN0VGFrZW5cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gdGVzdCB0YWtlbiBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgVGVzdGluZ0F2Z0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRlc3RpbmdBdmVyYWdlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFRlc3RpbmcgQXZlcmFnZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gY2FzaCBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgU3RhdHVzTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdGF0dXNTY3JlZW5cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTdGF0dXMgU2NyZWVuIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5QnV0dG9uTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5QnV0dG9uXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gcGxheSBidXR0b24gb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIFN0YXR1c0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0YXR1c1RleHRcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU3RhdHVzIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJDb3VudElucHV0OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNvdW50SW5wdXRcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBQbGF5ZXJDb3VudElucHV0IG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBEaXN0cmljdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpc3RyaWN0TGFiZWxcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gRGlzdHJpY3RMYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheUdhbWVCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheUdhbWVCdXR0b25cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBQbGF5R2FtZUJ1dHRvbiBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgU3BlY3RhdGVCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3BlY3RhdGVCdXR0b25cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTcGVjdGF0ZUJ1dHRvbiBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaE5vZGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBDYXNoTm9kZSBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgdGVhY2hlciBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBUZWFjaGVyUHJvZmlsZVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiVGVhY2hlclByb2ZpbGVVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLFxyXG4gICAgfSxcclxuICAgIENsYXNzVGF1Z2h0OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNsYXNzVGF1Z2h0XCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIENsYXNzVGF1Z2h0IGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBTY2hvb2xOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nob29sTmFtZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTY2hvb2xOYW1lIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBDb250YWN0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ29udGFjdFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBDb250YWN0IGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgTWVudG9yIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE1lbnRvclByb2ZpbGVVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk1lbnRvclByb2ZpbGVVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLFxyXG4gICAgfSxcclxuICAgIEFkZHJlc3NsYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBZGRyZXNzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIEFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICAgIENvbnRhY3RMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDb250YWN0XCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIENvbnRhY3QgbGFiZWwgb2YgcHJvZmlsZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBBZG1pbiBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBBZG1pblByb2ZpbGVVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkFkbWluUHJvZmlsZVVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5hbWVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgRW1haWxBZGRyZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRW1haWxBZGRyZXNzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBlbWFpbCBhZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGUgXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nob29sTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjaG9vbE5hbWVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU2Nob29sTmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gICAgQ29udGFjdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNvbnRhY3RcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQ29udGFjdCBsYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIGRpcmVjdG9yIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIERpcmVjdG9yUHJvZmlsZVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiRGlyZWN0b3JQcm9maWxlVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIixcclxuICAgIH0sXHJcbiAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFbWFpbEFkZHJlc3NcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGVtYWlsIGFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZSBcIixcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTcGVjdGF0ZVVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTcGVjdGF0ZVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU3BlY3RhdGVVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFJvb21TY3JlZW5Ob2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJvb21TY3JlZW5cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byB0aGUgbm9kZSBvZiByb29tIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFNjcm9sbEJhckNvbnRlbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQmFyQ29udGVudFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBub2RlIG9mIFNjcm9sbEJhckNvbnRlbnQgb2Ygcm9vbSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQcm9maWxlU2NyZWVuTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcm9maWxlU2NyZWVuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2YgcHJvZmlsZSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBSb29tUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJvb21QcmVmYWJcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgUm9vbSBvbiByb29tIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBBdmF0YXJVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQXZhdGFyVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJBdmF0YXJVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEF2YXRhclNlbGVjdGlvblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBdmF0YXJTZWxlY3Rpb25TY3JlZW5cIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEF2YXRhck5vZGVzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhck5vZGVzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBBdmF0YXJCdXR0b25zOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhckJ1dHRvbnNcIixcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBVSU1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFVJTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlVJTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVUlQcm9maWxlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlVJUHJvZmlsZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBQcm9maWxlVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgIH0sXHJcbiAgICBUZWFjaGVyVUlQcm9maWxlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRlYWNoZXJVSVByb2ZpbGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVGVhY2hlclByb2ZpbGVVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBUZWFjaGVyUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgIH0sXHJcblxyXG4gICAgTWVudG9yVUlQcm9maWxlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1lbnRvclVJUHJvZmlsZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBNZW50b3JQcm9maWxlVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gTWVudG9yUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgIH0sXHJcblxyXG4gICAgQWRtaW5VSVByb2ZpbGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQWRtaW5VSVByb2ZpbGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogQWRtaW5Qcm9maWxlVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQWRtaW5Qcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgfSxcclxuXHJcbiAgICBEaXJlY3RvclVJUHJvZmlsZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaXJlY3RvclVJUHJvZmlsZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBEaXJlY3RvclByb2ZpbGVVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBEaXJlY3RvclByb2ZpbGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIEF2YXRhclVJU2V0dXA6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFyVUlTZXR1cFwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBBdmF0YXJVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBBdmF0YXJVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIFNjcmVlbk5vZGVzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcmVlbk5vZGVzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbG9naW4gc2NyZWVuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUd2Vlbk1hbmFnZXJSZWY6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHdlZW5NYW5hZ2VyUmVmXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIFR3ZWVuIE1hbmFnZXIgU2NyaXB0IFwiLFxyXG4gICAgfSxcclxuICAgIExvZ286IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9nb05vZGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIGxvZ28gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvYXN0Tm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb2FzdE5vZGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIHRvYXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FkaW5nTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FkaW5nTm9kZVwiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgTG9hZGluZyBOb2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVmZXJlbmNlTWFuYWdlclJlZjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZWZlcmVuY2VNYW5hZ2VyUmVmXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIHRoZSByZWZlcmVuY2UgbWFuYWdlciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTW9kZVNlbGVjdGlvblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb2RlU2VsZWN0aW9uU2NyZWVuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbW9kZSBzZWxlY3Rpb24gc2NyZWVuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBVSVNwZWN0YXRlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlVJU3BlY3RhdGVcIixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogU3BlY3RhdGVVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTcGVjdGF0ZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgIH0sXHJcbiAgICBVSUNvbnRhaW5lcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJVSUNvbnRhaW5lclwiLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFVJQ29udGFpbmVyIG5vZGVzXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIC8vY3JlYXRpbmcgc3RhdGljIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxEYXRhKCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIFR3ZWVuUmVmO1xyXG4gICAgVG90YWxSb29tID0gW107XHJcbiAgICBBdmF0YXJTZWxlY3Rpb24gPSAwO1xyXG4gICAgX3RlbXBBdmF0YXJTZWxlY3Rpb24gPSAwO1xyXG4gIH0sXHJcblxyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIkFzc2lnblByb2ZpbGVEYXRhXCIsIHRoaXMuQXNzaWduUHJvZmlsZURhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgdGhpcy5VcGRhdGVTdGF0dXNXaW5kb3csIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIkFzc2lnblByb2ZpbGVEYXRhXCIsIHRoaXMuQXNzaWduUHJvZmlsZURhdGEsIHRoaXMpO1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIHRoaXMuVXBkYXRlU3RhdHVzV2luZG93LCB0aGlzKTtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRoaXMuQ2hhbmdlUGFuZWxTY3JlZW4sIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuUmVzZXRBbGxEYXRhKCk7XHJcbiAgICB0aGlzLlJlZmVyZW5jZU1hbmFnZXJSZWYgPSB0aGlzLlJlZmVyZW5jZU1hbmFnZXJSZWYuZ2V0Q29tcG9uZW50KFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG5cclxuICAgIHRoaXMuU2VsZWN0ZWRSb2xlID0gUm9sZXNbMF07XHJcbiAgICB0aGlzLlNlbGVjdGVkUm9sZUluZGV4ID0gMDtcclxuICAgIFVJTWFuYWdlci5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICBUb3RhbFJvb20gPSBbXTtcclxuICAgIC8vUHJpdmF0ZSBWYXJpYWJsZXNcclxuICAgIHRoaXMuRW1haWxUZXh0ID0gXCJcIjtcclxuICAgIHRoaXMuUGFzc3dvcmRUZXh0ID0gXCJcIjtcclxuICAgIHRoaXMuTGljZW5zZVRleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5ub2RlQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLlN0YXR1c1RleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5Ub3RhbFBsYXllcnMgPSBcIlwiO1xyXG4gICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuXHJcbiAgICB0aGlzLkdldFR3ZWVuTWFuYWdlclJlZmVyZW5jZSgpO1xyXG4gICAgdGhpcy5TbGlkZUluTG9naW5Db21wb25lbnRzKCk7XHJcbiAgICB0aGlzLlJlcGVhdExvZ29BbmltYXRpb24oKTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlUGxheUJ1dHRvbihfc3RhdGUpIHtcclxuICAgIHRoaXMuVUlQcm9maWxlLlBsYXlHYW1lQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTcGVjdGF0ZUJ1dHRvbihfc3RhdGUpIHtcclxuICAgIHRoaXMuVUlQcm9maWxlLlNwZWN0YXRlQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBDaGFuZ2VQYW5lbFNjcmVlbjogZnVuY3Rpb24gKGlzTmV4dCwgY2hhbmdlU2NyZWVuLCBzY2VuZU5hbWUpIHtcclxuICAgIFR3ZWVuUmVmLkZhZGVOb2RlSW5PdXQodGhpcy5TY3JlZW5Ob2Rlc1t0aGlzLm5vZGVDb3VudGVyXSwgMC41NSwgMjU1LCAwLCBcInF1YWRJbk91dFwiKTtcclxuXHJcbiAgICBpZiAoY2hhbmdlU2NyZWVuID09IGZhbHNlKSB7XHJcbiAgICAgIGlmIChpc05leHQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGVDb3VudGVyIDwgdGhpcy5TY3JlZW5Ob2Rlcy5sZW5ndGgpIHRoaXMubm9kZUNvdW50ZXIgPSB0aGlzLm5vZGVDb3VudGVyICsgMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlQ291bnRlciA+IDApIHRoaXMubm9kZUNvdW50ZXIgPSB0aGlzLm5vZGVDb3VudGVyIC0gMTtcclxuICAgICAgfVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLk1hbmlwdWxhdGVOb2Rlcyh0aGlzLm5vZGVDb3VudGVyKTtcclxuICAgICAgfSwgNjAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShzY2VuZU5hbWUpO1xyXG4gICAgICB9LCA2MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE1hbmlwdWxhdGVOb2RlczogZnVuY3Rpb24gKGNvdW50ZXIpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlNjcmVlbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoY291bnRlciA9PSBpbmRleCkge1xyXG4gICAgICAgIHRoaXMuU2NyZWVuTm9kZXNbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXRpbmcgaXQgdHJ1ZVwiKTtcclxuICAgICAgICBUd2VlblJlZi5GYWRlTm9kZUluT3V0KHRoaXMuU2NyZWVuTm9kZXNbaW5kZXhdLCAxLjUsIDAsIDI1NSwgXCJxdWFkSW5PdXRcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TY3JlZW5Ob2Rlc1tpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTbGlkZUluTG9naW5Db21wb25lbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBUd2VlblJlZi5Mb2dpblNjcmVlblR3ZWVuKHRoaXMuU2NyZWVuTm9kZXNbdGhpcy5ub2RlQ291bnRlcl0uY2hpbGRyZW5bMV0sIC0xMDAwKTtcclxuICB9LFxyXG5cclxuICBSZXBlYXRMb2dvQW5pbWF0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBUd2VlblJlZi5SZXBlYXRUd2VlblNjYWxlKHRoaXMuTG9nbywgMS4xLCAxLCAwLjgpO1xyXG4gIH0sXHJcblxyXG4gIEdldFR3ZWVuTWFuYWdlclJlZmVyZW5jZTogZnVuY3Rpb24gKCkge1xyXG4gICAgVHdlZW5SZWYgPSB0aGlzLlR3ZWVuTWFuYWdlclJlZi5nZXRDb21wb25lbnQoXCJUd2Vlbk1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRQbGF5ZXJDb3VudElucHV0KCkge1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuUGxheWVyQ291bnRJbnB1dC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5Ub3RhbFBsYXllcnMgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIE9ucGxheWVyTnVtYmVyQ2hhbmdlZChfbnVtYmVyKSB7XHJcbiAgICB0aGlzLlRvdGFsUGxheWVycyA9IF9udW1iZXI7XHJcbiAgfSxcclxuXHJcbiAgUGxheUdhbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuUmVzZXRQbGF5ZXJDb3VudElucHV0KCk7XHJcbiAgICAvLyB0aGlzLlZlcnNlc1BsYXllck1vZGUoKTtcclxuICAgIHRoaXMuVG9nZ2xlTW9kZVNlbGVjdGlvbih0cnVlKTtcclxuICB9LFxyXG5cclxuICBCYWNrU2VsZWN0aW9uTW9kZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgIHRoaXMuVG9nZ2xlTW9kZVNlbGVjdGlvbihmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlTW9kZVNlbGVjdGlvbihfc3RhdGUpIHtcclxuICAgIHRoaXMuTW9kZVNlbGVjdGlvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVmVyc2VzUGxheWVyTW9kZSgpIHtcclxuICAgIC8vIGlmKHRoaXMuVG90YWxQbGF5ZXJzPT1cIlwiKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIGVudGVyIHBsYXllciBhbW91bnQgZm9yIG11bHRpcGxheWVyIGZyb20gMi02LCBtYWtlIHN1cmUgdG8gaGF2ZSBzYW1lIGFtb3VudCBvbiBkaWZmZXJlbnQgY29ubmVjdGluZyBkZXZpY2VzIGlmIHlvdSB3YW50IHRvIGNvbm5lY3QgdGhlbS5cIiwzNTAwKTtcclxuICAgIC8vIH1cclxuICAgIC8vIGVsc2VcclxuICAgIC8vIHtcclxuICAgIC8vICAgICB2YXIgX3BsYXllcnM9cGFyc2VJbnQodGhpcy5Ub3RhbFBsYXllcnMpO1xyXG4gICAgLy8gICAgIGlmKF9wbGF5ZXJzPj0yICYmIF9wbGF5ZXJzPD02KVxyXG4gICAgLy8gICAgIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTW9kZVNlbGVjdGlvbigyKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlU2hvd1Jvb21fQm9vbChmYWxzZSk7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAvL3RoaXMuVUlQcm9maWxlLlBsYXlCdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAvL0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz1fcGxheWVycztcclxuXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0luTG9iYnkoKSkge1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwid2FpdGluZyBmb3Igb3RoZXIgcGxheWVycy4uLlwiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luUmFuZG9tUm9vbSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXF1ZXN0Q29ubmVjdGlvbigpO1xyXG4gICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBlbHNlXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSBlbnRlciBwbGF5ZXIgYW1vdW50IGZvciBtdWx0aXBsYXllciBmcm9tIDItNiwgbWFrZSBzdXJlIHRvIGhhdmUgc2FtZSBhbW91bnQgb24gZGlmZmVyZW50IGNvbm5lY3RpbmcgZGV2aWNlcyBpZiB5b3Ugd2FudCB0byBjb25uZWN0IHRoZW0uXCIsMzUwMCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gIH0sXHJcblxyXG4gIFZlcnNlc0FJTW9kZSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTW9kZVNlbGVjdGlvbigxKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlU2hvd1Jvb21fQm9vbChmYWxzZSk7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gMjtcclxuICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzZXR0aW5nIHVwIGdhbWUuLi5cIik7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwid2FpdGluZyBmb3IgQUkgU2V0dXAuLi5cIik7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luZWRSb29tID0gdHJ1ZTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7IC8vZnVuY3Rpb24gaW4gdWkgbWFuYWdlclxyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlU3RhdHVzV2luZG93OiBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICB0aGlzLlN0YXR1c1RleHQgPSB0aGlzLlN0YXR1c1RleHQgKyBtc2cgKyBcIlxcblwiO1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTGFiZWwuc3RyaW5nID0gdGhpcy5TdGF0dXNUZXh0O1xyXG4gIH0sXHJcblxyXG4gIEV4aXRDb25uZWN0aW5nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja0Nvbm5lY3Rpb25TdGF0ZSgpID09IHRydWUpIHtcclxuICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLlVJUHJvZmlsZS5QbGF5QnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuRW1haWxUZXh0ID0gXCJcIjtcclxuICAgIHRoaXMuUGFzc3dvcmRUZXh0ID0gXCJcIjtcclxuICAgIHRoaXMuU3RhdHVzVGV4dCA9IFwiXCI7XHJcbiAgICB0aGlzLlRvdGFsUGxheWVycyA9IFwiXCI7XHJcbiAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DbGVhclRpbWVyKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlNldENvbm5ldGluZyh0cnVlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgIC8vIH1cclxuICB9LFxyXG5cclxuICBUb2dnbGVMb2FkaW5nTm9kZShzdGF0ZSkge1xyXG4gICAgdGhpcy5Mb2FkaW5nTm9kZS5hY3RpdmUgPSBzdGF0ZTtcclxuICB9LFxyXG5cclxuICBMb2dpblVzZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLkVtYWlsVGV4dCAhPSBcIlwiICYmIHRoaXMuUGFzc3dvcmRUZXh0ICE9IFwiXCIpIHtcclxuICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZSh0cnVlKTtcclxuICAgICAgdmFyIGFuaW0gPSB0aGlzLkxvYWRpbmdOb2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICBhbmltLnBsYXkoXCJsb2FkaW5nXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5Mb2dpblVzZXIodGhpcy5FbWFpbFRleHQsIHRoaXMuUGFzc3dvcmRUZXh0LCB0aGlzLlNlbGVjdGVkUm9sZSwgdGhpcy5MaWNlbnNlVGV4dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJFbWFpbCBvciBwYXNzd29yZCBpbnZhbGlkIG9yIGVtcHR5LlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblJvbGVUb2dnbGVkKF92YWwpIHtcclxuICAgIC8vY29uc29sZS5sb2coX3ZhbCk7XHJcbiAgICBjb25zb2xlLmxvZyhfdmFsLm5vZGUubmFtZS5zcGxpdChcIl9cIilbMV0pO1xyXG4gICAgdGhpcy5TZWxlY3RlZFJvbGVJbmRleCA9IF92YWwubm9kZS5uYW1lLnNwbGl0KFwiX1wiKVsxXTtcclxuICAgIHRoaXMuU2VsZWN0ZWRSb2xlID0gUm9sZXNbdGhpcy5TZWxlY3RlZFJvbGVJbmRleF07XHJcbiAgfSxcclxuXHJcbiAgU2V0RW1haWxUZXh0OiBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgdGhpcy5FbWFpbFRleHQgPSB0ZXh0O1xyXG4gIH0sXHJcblxyXG4gIFNldFBhc3N3b3JkVGV4dDogZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIHRoaXMuUGFzc3dvcmRUZXh0ID0gdGV4dDtcclxuICB9LFxyXG5cclxuICBTZXRMaWNlbnNlVGV4dDogZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIHRoaXMuTGljZW5zZVRleHQgPSB0ZXh0O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVVJQ29udGFpbmVyKF9tYWluSW5kZXgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlVJQ29udGFpbmVyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX21haW5JbmRleCA9PSBpbmRleCkgdGhpcy5VSUNvbnRhaW5lcltpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLlVJQ29udGFpbmVyW2luZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBc3NpZ25BdmF0YXIoX2luZGV4ID0gMCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9pbmRleCA9PSBpbmRleCkgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhck5vZGVzW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBlbHNlIHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJOb2Rlc1tpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlQXZhdGFyU2NyZWVuKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhclNlbGVjdGlvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlQXZhdGFyU2NyZWVuKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVBdmF0YXJTY3JlZW4odHJ1ZSk7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQXZhdGFyVUlTZXR1cC5BdmF0YXJCdXR0b25zLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoQXZhdGFyU2VsZWN0aW9uID09IGluZGV4KSB0aGlzLkF2YXRhclVJU2V0dXAuQXZhdGFyQnV0dG9uc1tpbmRleF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLkF2YXRhclVJU2V0dXAuQXZhdGFyQnV0dG9uc1tpbmRleF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gT25DaGFuZ0F2YXRhcklEOiBmdW5jdGlvbiAoVUlEKSB7XHJcbiAgLy8gICBpZiAoaXNOYU4oVUlEKSB8fCBVSUQgPT0gdW5kZWZpbmVkKSBVSUQgPSAwO1xyXG5cclxuICAvLyAgIEF2YXRhclNlbGVjdGlvbiA9IFVJRDtcclxuICAvLyB9LFxyXG5cclxuICBEaXNhYmxlQXZhdGFyU2NyZWVuKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVBdmF0YXJTY3JlZW4oZmFsc2UpO1xyXG5cclxuICAgIGlmIChfdGVtcEF2YXRhclNlbGVjdGlvbiAhPSBBdmF0YXJTZWxlY3Rpb24pIHtcclxuICAgICAgQXZhdGFyU2VsZWN0aW9uID0gX3RlbXBBdmF0YXJTZWxlY3Rpb247XHJcbiAgICAgIHRoaXMuQXNzaWduQXZhdGFyKEF2YXRhclNlbGVjdGlvbik7XHJcbiAgICAgIHRoaXMuQXNzaWduRGF0YUNsYXNzZXMoQXZhdGFyU2VsZWN0aW9uKTtcclxuICAgICAgY29uc29sZS5sb2coXCJTZW5kaW5nIGF2YXRhciBzZWxlY3Rpb24gdG8gdXBkYXRlOiBcIiArIEF2YXRhclNlbGVjdGlvbik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKC0xLCAtMSwgQXZhdGFyU2VsZWN0aW9uKTtcclxuICAgIH1cclxuICB9LFxyXG4gIEFzc2lnbkF2YXRhclNlbGVjdGlvbihldmVudCA9IG51bGwsIF9TZWxlY3Rpb24gPSAtMSkge1xyXG4gICAgaWYgKF9TZWxlY3Rpb24gIT0gLTEpIHtcclxuICAgICAgX3RlbXBBdmF0YXJTZWxlY3Rpb24gPSBfU2VsZWN0aW9uO1xyXG4gICAgICBjb25zb2xlLmxvZyhfU2VsZWN0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF90ZW1wQXZhdGFyU2VsZWN0aW9uID0gcGFyc2VJbnQoZXZlbnQuY3VycmVudFRhcmdldC5uYW1lLnNwbGl0KFwiX1wiKVsxXSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKF90ZW1wQXZhdGFyU2VsZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhckJ1dHRvbnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfdGVtcEF2YXRhclNlbGVjdGlvbiA9PSBpbmRleCkgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhckJ1dHRvbnNbaW5kZXhdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5BdmF0YXJVSVNldHVwLkF2YXRhckJ1dHRvbnNbaW5kZXhdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFDbGFzc2VzKF9JRCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuYXZhdGFySWQgPSBfSUQudG9TdHJpbmcoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLmF2YXRhcklkID0gX0lELnRvU3RyaW5nKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLmF2YXRhcklkID0gX0lELnRvU3RyaW5nKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEgPSBfSUQudG9TdHJpbmcoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkRpcmVjdG9yRGF0YS5hdmF0YXJJZCA9IF9JRC50b1N0cmluZygpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnblByb2ZpbGVEYXRhOiBmdW5jdGlvbiAoX2lzU3R1ZGVudCA9IGZhbHNlLCBfaXNUZWFjaGVyID0gZmFsc2UsIF9pc01lbnRvciA9IGZhbHNlLCBfaXNBZG1pbiA9IGZhbHNlLCBfaXNEaXJlY3RvciA9IGZhbHNlKSB7XHJcbiAgICAvL2NvbnNvbGUuZXJyb3IocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKSk7XHJcbiAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKSA9PSAxKSB7XHJcbiAgICAgIC8vbWVhbnMgc3VjY2Vzc2Z1bFxyXG4gICAgICB0aGlzLkNoYW5nZVBhbmVsU2NyZWVuKHRydWUsIGZhbHNlLCBcIlwiKTtcclxuXHJcbiAgICAgIGlmIChfaXNTdHVkZW50KSB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcigwKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVBsYXlCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTcGVjdGF0ZUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcblxyXG4gICAgICAgIHZhciBfYXZhdGFyID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuYXZhdGFySWQpO1xyXG4gICAgICAgIGlmIChfYXZhdGFyID09IHVuZGVmaW5lZCB8fCBpc05hTihfYXZhdGFyKSA9PSB0cnVlIHx8IF9hdmF0YXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgX2F2YXRhciA9IC0xO1xyXG4gICAgICAgICAgdGhpcy5Bc3NpZ25BdmF0YXJTZWxlY3Rpb24obnVsbCwgMCk7XHJcbiAgICAgICAgICB0aGlzLkVuYWJsZUF2YXRhclNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy90aGlzLkFzc2lnbkF2YXRhcihfYXZhdGFyKTtcclxuICAgICAgICBBdmF0YXJTZWxlY3Rpb24gPSBfYXZhdGFyO1xyXG5cclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5OYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuRE9CTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZE9CO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLkdyYWRlTGV2ZWxMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5ncmFkZUxldmVsO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlRlYWNoZXJOYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudGVhY2hlck5hbWU7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuR2FtZXNXb25MYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbjtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5GQlBhZ2VMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5mYWNlYm9va1BhZ2U7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuVGVzdFRha2VuTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudGVzdHNUYWtlbjtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5UZXN0aW5nQXZnTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudGVzdGluZ0F2ZXJhZ2U7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaExhYmVsLnN0cmluZyA9IFwiJCBcIiArIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoO1xyXG5cclxuICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgfSBlbHNlIGlmIChfaXNUZWFjaGVyKSB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcigxKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVBsYXlCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEpO1xyXG5cclxuICAgICAgICB2YXIgX2F2YXRhciA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLmF2YXRhcklkKTtcclxuICAgICAgICBpZiAoX2F2YXRhciA9PSB1bmRlZmluZWQgfHwgaXNOYU4oX2F2YXRhcikgPT0gdHJ1ZSB8fCBfYXZhdGFyID09IG51bGwpIHtcclxuICAgICAgICAgIF9hdmF0YXIgPSAwO1xyXG4gICAgICAgICAgdGhpcy5Bc3NpZ25BdmF0YXJTZWxlY3Rpb24obnVsbCwgMCk7XHJcbiAgICAgICAgICAvL3RoaXMuRW5hYmxlQXZhdGFyU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RoaXMuQXNzaWduQXZhdGFyKF9hdmF0YXIpO1xyXG4gICAgICAgIEF2YXRhclNlbGVjdGlvbiA9IF9hdmF0YXI7XHJcblxyXG4gICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5OYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEubmFtZTtcclxuICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5DbGFzc1RhdWdodC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5UZWFjaGVyRGF0YS5jbGFzc1RhdWdodDtcclxuICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuU2Nob29sTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLnNjaG9vbDtcclxuICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuQ29udGFjdExhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLmNvbnRhY3ROdW1iZXI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoX2lzTWVudG9yKSB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcigyKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVBsYXlCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YSk7XHJcblxyXG4gICAgICAgIHZhciBfYXZhdGFyID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YS5hdmF0YXJJZCk7XHJcbiAgICAgICAgaWYgKF9hdmF0YXIgPT0gdW5kZWZpbmVkIHx8IGlzTmFOKF9hdmF0YXIpID09IHRydWUgfHwgX2F2YXRhciA9PSBudWxsKSB7XHJcbiAgICAgICAgICBfYXZhdGFyID0gMDtcclxuICAgICAgICAgIHRoaXMuQXNzaWduQXZhdGFyU2VsZWN0aW9uKG51bGwsIDApO1xyXG4gICAgICAgICAgLy90aGlzLkVuYWJsZUF2YXRhclNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy90aGlzLkFzc2lnbkF2YXRhcihfYXZhdGFyKTtcclxuICAgICAgICBBdmF0YXJTZWxlY3Rpb24gPSBfYXZhdGFyO1xyXG4gICAgICAgIHRoaXMuTWVudG9yVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5NZW50b3JVSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YS5lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5NZW50b3JVSVByb2ZpbGUuQWRkcmVzc2xhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLk1lbnRvckRhdGEuYWRkcmVzcztcclxuICAgICAgICB0aGlzLk1lbnRvclVJUHJvZmlsZS5Db250YWN0TGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB9IGVsc2UgaWYgKF9pc0FkbWluKSB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcigzKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVBsYXlCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhKTtcclxuXHJcbiAgICAgICAgdmFyIF9hdmF0YXIgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEuYXZhdGFySWQpO1xyXG4gICAgICAgIGlmIChfYXZhdGFyID09IHVuZGVmaW5lZCB8fCBpc05hTihfYXZhdGFyKSA9PSB0cnVlIHx8IF9hdmF0YXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgX2F2YXRhciA9IDA7XHJcbiAgICAgICAgICB0aGlzLkFzc2lnbkF2YXRhclNlbGVjdGlvbihudWxsLCAwKTtcclxuICAgICAgICAgIC8vIHRoaXMuRW5hYmxlQXZhdGFyU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RoaXMuQXNzaWduQXZhdGFyKF9hdmF0YXIpO1xyXG4gICAgICAgIEF2YXRhclNlbGVjdGlvbiA9IF9hdmF0YXI7XHJcbiAgICAgICAgdGhpcy5BZG1pblVJUHJvZmlsZS5OYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5BZG1pblVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuQWRtaW5VSVByb2ZpbGUuU2Nob29sTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YS5zY2hvb2xOYW1lO1xyXG4gICAgICAgIHRoaXMuQWRtaW5VSVByb2ZpbGUuQ29udGFjdExhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB9IGVsc2UgaWYgKF9pc0RpcmVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcig0KTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVBsYXlCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuRGlyZWN0b3JEYXRhKTtcclxuXHJcbiAgICAgICAgdmFyIF9hdmF0YXIgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5EaXJlY3RvckRhdGEuYXZhdGFySWQpO1xyXG4gICAgICAgIGlmIChfYXZhdGFyID09IHVuZGVmaW5lZCB8fCBpc05hTihfYXZhdGFyKSA9PSB0cnVlIHx8IF9hdmF0YXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgX2F2YXRhciA9IDA7XHJcbiAgICAgICAgICB0aGlzLkFzc2lnbkF2YXRhclNlbGVjdGlvbihudWxsLCAwKTtcclxuICAgICAgICAgIC8vIHRoaXMuRW5hYmxlQXZhdGFyU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RoaXMuQXNzaWduQXZhdGFyKF9hdmF0YXIpO1xyXG4gICAgICAgIEF2YXRhclNlbGVjdGlvbiA9IF9hdmF0YXI7XHJcbiAgICAgICAgdGhpcy5EaXJlY3RvclVJUHJvZmlsZS5OYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuRGlyZWN0b3JEYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5EaXJlY3RvclVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5EaXJlY3RvckRhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLkFzc2lnbkF2YXRhcihBdmF0YXJTZWxlY3Rpb24pO1xyXG4gICAgfSBlbHNlIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpID09IDIpIHtcclxuICAgICAgLy91c2VyIG5vdCBmb3VuZFxyXG4gICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJubyB1c2VyIHJlZ2lzdGVyZWQgd2l0aCBlbnRlcmVkIGVtYWlsLlwiKTtcclxuICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKSA9PSAzKSB7XHJcbiAgICAgIC8vcGFzcy9lbWFpbCBpbnZhbGlkXHJcbiAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInVzZXIgZW1haWwgb3IgcGFzc3dvcmQgaXMgd3JvbmdcIik7XHJcbiAgICB9IGVsc2UgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlc3BvbnNlVHlwZSkgPT0gNCkge1xyXG4gICAgICAvL3NvbWV0aGluZyB3ZW50IHdyb25nXHJcbiAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInNvbWV0aGluZyB3ZW50IHdyb25nIHBsZWFzZSB0cnkgYWdhaW4uXCIpO1xyXG4gICAgfSBlbHNlIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpID09IDUpIHtcclxuICAgICAgLy9zb21ldGhpbmcgd2VudCB3cm9uZ1xyXG4gICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJsaWNlbnNlIGtleSBpcyBub3QgdmFsaWQuXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVaSBXb3JrXHJcbiAgVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKF9zdGF0ZSkge1xyXG4gICAgaWYgKF9zdGF0ZSkgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLlVJU3BlY3RhdGUuUm9vbVNjcmVlbk5vZGUuYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuVUlTcGVjdGF0ZS5Qcm9maWxlU2NyZWVuTm9kZS5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2hvd0F2YWlsYWJsZVJvb21zX1NwZWN0YXRlVUkoKSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5pc0luTG9iYnkoKSkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZVNob3dSb29tX0Jvb2wodHJ1ZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVxdWVzdENvbm5lY3Rpb24oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShfbmFtZSwgX3BsYXllcnMpIHtcclxuICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5VSVNwZWN0YXRlLlJvb21QcmVmYWIpO1xyXG4gICAgbm9kZS5wYXJlbnQgPSB0aGlzLlVJU3BlY3RhdGUuU2Nyb2xsQmFyQ29udGVudDtcclxuICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUm9vbUxpc3RIYW5kbGVyXCIpLlNldFJvb21OYW1lKF9uYW1lKTtcclxuICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUm9vbUxpc3RIYW5kbGVyXCIpLlNldFBsYXllckNvdW50KF9wbGF5ZXJzKTtcclxuICAgIFRvdGFsUm9vbS5wdXNoKG5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0Um9vbUxpc3QoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgVG90YWxSb29tLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBUb3RhbFJvb21baW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBUb3RhbFJvb20gPSBbXTtcclxuICB9LFxyXG5cclxuICBFeGl0X1NwZWN0YXRlVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSSh0cnVlKTtcclxuICAgIHRoaXMuVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgIHRoaXMuRXhpdENvbm5lY3RpbmcoKTtcclxuICB9LFxyXG5cclxuICBMb2dvdXQoKSB7XHJcbiAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2xlYXJEYXRhXCIpOyAvL2Z1bmN0aW9uIHdyaXR0ZW4gaW4gc3RvcmFnZSBNYW5hZ2VyIGNsYXNzXHJcblxyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKSAhPSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkgIT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKSAhPSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG5cclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKSAhPSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG5cclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG5cclxuICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIFNob3dUb2FzdDogZnVuY3Rpb24gKG1zZywgX3RpbWUgPSAyMDAwKSB7XHJcbiAgICB0aGlzLlRvYXN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5Ub2FzdE5vZGUuY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtc2c7XHJcbiAgICB2YXIgU2VsZlRvYXN0ID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBTZWxmVG9hc3QuVG9hc3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSwgX3RpbWUpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVSU1hbmFnZXI7XHJcbiJdfQ==