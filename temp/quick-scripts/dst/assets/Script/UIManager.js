
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxVSU1hbmFnZXIuanMiXSwibmFtZXMiOlsiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHdlZW5SZWYiLCJUb3RhbFJvb20iLCJSb2xlcyIsIlByb2ZpbGVVSSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWVMYWJlbCIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkVtYWlsQWRkcmVzc0xhYmVsIiwiRE9CTGFiZWwiLCJHcmFkZUxldmVsTGFiZWwiLCJUZWFjaGVyTmFtZUxhYmVsIiwiR2FtZXNXb25MYWJlbCIsIkZCUGFnZUxhYmVsIiwiVGVzdFRha2VuTGFiZWwiLCJUZXN0aW5nQXZnTGFiZWwiLCJDYXNoTGFiZWwiLCJTdGF0dXNOb2RlIiwiTm9kZSIsIlBsYXlCdXR0b25Ob2RlIiwiU3RhdHVzTGFiZWwiLCJQbGF5ZXJDb3VudElucHV0IiwiRWRpdEJveCIsIkRpc3RyaWN0TGFiZWwiLCJQbGF5R2FtZUJ1dHRvbiIsIlNwZWN0YXRlQnV0dG9uIiwiQ2FzaE5vZGUiLCJUZWFjaGVyUHJvZmlsZVVJIiwiQ2xhc3NUYXVnaHQiLCJTY2hvb2xOYW1lTGFiZWwiLCJDb250YWN0TGFiZWwiLCJNZW50b3JQcm9maWxlVUkiLCJBZGRyZXNzbGFiZWwiLCJBZG1pblByb2ZpbGVVSSIsIkRpcmVjdG9yUHJvZmlsZVVJIiwiU3BlY3RhdGVVSSIsIlJvb21TY3JlZW5Ob2RlIiwiU2Nyb2xsQmFyQ29udGVudCIsIlByb2ZpbGVTY3JlZW5Ob2RlIiwiUm9vbVByZWZhYiIsIlByZWZhYiIsIlVJTWFuYWdlciIsIkNvbXBvbmVudCIsIlVJUHJvZmlsZSIsIlRlYWNoZXJVSVByb2ZpbGUiLCJNZW50b3JVSVByb2ZpbGUiLCJBZG1pblVJUHJvZmlsZSIsIkRpcmVjdG9yVUlQcm9maWxlIiwiU2NyZWVuTm9kZXMiLCJUd2Vlbk1hbmFnZXJSZWYiLCJMb2dvIiwiVG9hc3ROb2RlIiwiTG9hZGluZ05vZGUiLCJSZWZlcmVuY2VNYW5hZ2VyUmVmIiwiTW9kZVNlbGVjdGlvblNjcmVlbiIsIlVJU3BlY3RhdGUiLCJVSUNvbnRhaW5lciIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlJlc2V0QWxsRGF0YSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIkFzc2lnblByb2ZpbGVEYXRhIiwiVXBkYXRlU3RhdHVzV2luZG93IiwiQ2hhbmdlUGFuZWxTY3JlZW4iLCJvbkRpc2FibGUiLCJvZmYiLCJvbkxvYWQiLCJnZXRDb21wb25lbnQiLCJTZWxlY3RlZFJvbGUiLCJTZWxlY3RlZFJvbGVJbmRleCIsIkVtYWlsVGV4dCIsIlBhc3N3b3JkVGV4dCIsIm5vZGVDb3VudGVyIiwiU3RhdHVzVGV4dCIsIlRvdGFsUGxheWVycyIsIlJlc2V0UGxheWVyQ291bnRJbnB1dCIsIkdldFR3ZWVuTWFuYWdlclJlZmVyZW5jZSIsIlNsaWRlSW5Mb2dpbkNvbXBvbmVudHMiLCJSZXBlYXRMb2dvQW5pbWF0aW9uIiwiQ2hlY2tSZWZlcmVuY2VzIiwiVG9nZ2xlUGxheUJ1dHRvbiIsIl9zdGF0ZSIsImFjdGl2ZSIsIlRvZ2dsZVNwZWN0YXRlQnV0dG9uIiwicmVxdWlyZSIsImlzTmV4dCIsImNoYW5nZVNjcmVlbiIsInNjZW5lTmFtZSIsIkZhZGVOb2RlSW5PdXQiLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiTWFuaXB1bGF0ZU5vZGVzIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJjb3VudGVyIiwiaW5kZXgiLCJjb25zb2xlIiwibG9nIiwiTG9naW5TY3JlZW5Ud2VlbiIsImNoaWxkcmVuIiwiUmVwZWF0VHdlZW5TY2FsZSIsInN0cmluZyIsIk9ucGxheWVyTnVtYmVyQ2hhbmdlZCIsIl9udW1iZXIiLCJQbGF5R2FtZSIsIlZlcnNlc1BsYXllck1vZGUiLCJCYWNrU2VsZWN0aW9uTW9kZSIsIlRvZ2dsZU1vZGVTZWxlY3Rpb24iLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlU2hvd1Jvb21fQm9vbCIsImdldFBob3RvblJlZiIsImlzQ29ubmVjdGVkVG9NYXN0ZXIiLCJpc0luTG9iYnkiLCJlbWl0IiwiSm9pblJhbmRvbVJvb20iLCJSZXF1ZXN0Q29ubmVjdGlvbiIsIlZlcnNlc0FJTW9kZSIsIk1heFBsYXllcnMiLCJKb2luZWRSb29tIiwibXNnIiwiRXhpdENvbm5lY3RpbmciLCJSZXNldFJvb21WYWx1ZXMiLCJEaXNjb25uZWN0UGhvdG9uIiwiVG9nZ2xlTG9hZGluZ05vZGUiLCJzdGF0ZSIsIkxvZ2luVXNlciIsImFuaW0iLCJBbmltYXRpb24iLCJwbGF5IiwiR2V0X1NlcnZlckJhY2tlbmQiLCJTaG93VG9hc3QiLCJPblJvbGVUb2dnbGVkIiwiX3ZhbCIsIm5vZGUiLCJzcGxpdCIsIlNldEVtYWlsVGV4dCIsInRleHQiLCJTZXRQYXNzd29yZFRleHQiLCJUb2dnbGVVSUNvbnRhaW5lciIsIl9tYWluSW5kZXgiLCJfaXNTdHVkZW50IiwiX2lzVGVhY2hlciIsIl9pc01lbnRvciIsIl9pc0FkbWluIiwiX2lzRGlyZWN0b3IiLCJwYXJzZUludCIsIlJlc3BvbnNlVHlwZSIsIlN0dWRlbnREYXRhIiwiZW1haWxBZGRyZXNzIiwiZE9CIiwiZ3JhZGVMZXZlbCIsInRlYWNoZXJOYW1lIiwiZ2FtZXNXb24iLCJmYWNlYm9va1BhZ2UiLCJ0ZXN0c1Rha2VuIiwidGVzdGluZ0F2ZXJhZ2UiLCJnYW1lQ2FzaCIsIlRlYWNoZXJEYXRhIiwiY2xhc3NUYXVnaHQiLCJzY2hvb2wiLCJjb250YWN0TnVtYmVyIiwiTWVudG9yRGF0YSIsImFkZHJlc3MiLCJBZG1pbkRhdGEiLCJzY2hvb2xOYW1lIiwiRGlyZWN0b3JEYXRhIiwiVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJIiwiVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJIiwiU2hvd0F2YWlsYWJsZVJvb21zX1NwZWN0YXRlVUkiLCJVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSSIsIl9uYW1lIiwiX3BsYXllcnMiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIlNldFJvb21OYW1lIiwiU2V0UGxheWVyQ291bnQiLCJwdXNoIiwiUmVzZXRSb29tTGlzdCIsImRlc3Ryb3kiLCJFeGl0X1NwZWN0YXRlVUkiLCJMb2dvdXQiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIl90aW1lIiwiU2VsZlRvYXN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBLElBQUlBLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsUUFBSjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLEtBQUssR0FBQyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXNCLG1CQUF0QixFQUEwQyxhQUExQyxFQUF3RCxpQkFBeEQsQ0FBVixFQUNBOztBQUNBLElBQUlDLFNBQVMsR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDbkJDLEVBQUFBLElBQUksRUFBQyxXQURjO0FBRW5CQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1BDLE1BQUFBLFdBQVcsRUFBQyxNQURMO0FBRVAsaUJBQVMsSUFGRjtBQUdQQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FIRjtBQUlQQyxNQUFBQSxZQUFZLEVBQUUsSUFKUDtBQUtQQyxNQUFBQSxPQUFPLEVBQUU7QUFMRixLQURIO0FBT1BDLElBQUFBLGlCQUFpQixFQUFFO0FBQ2hCTCxNQUFBQSxXQUFXLEVBQUMsY0FESTtBQUVoQixpQkFBUyxJQUZPO0FBR2hCQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sS0FITztBQUloQkMsTUFBQUEsWUFBWSxFQUFFLElBSkU7QUFLaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxPLEtBUFo7QUFhUEUsSUFBQUEsUUFBUSxFQUFFO0FBQ1BOLE1BQUFBLFdB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TSxDQUFDQyxPQUFQLEdBQWdCckosU0FBaEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUd2VlZW4gZnJvbSAnVHdlZW5NYW5hZ2VyJztcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgVHdlZW5SZWY7XHJcbnZhciBUb3RhbFJvb20gPSBbXTtcclxudmFyIFJvbGVzPVtcIlN0dWRlbnRcIiwgXCJUZWFjaGVyXCIsXCJQcm9ncmFtQW1iYXNzYWRvclwiLFwiU2Nob29sQWRtaW5cIixcIlByb2dyYW1EaXJlY3RvclwiXTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFByb2ZpbGUgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFByb2ZpbGVVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUHJvZmlsZVVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7ICAgXHJcbiAgICAgICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLCB9LFxyXG4gICAgICAgICBET0JMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkRPQlwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBET0IgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEdyYWRlTGV2ZWxMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkdyYWRlTGV2ZWxcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gR3JhZGUgTGV2ZWwgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIFRlYWNoZXJOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUZWFjaGVyTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBUZWFjaGVyIE5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEdhbWVzV29uTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJHYW1lc1dvblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBnYW1lcyB3b24gbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEZCUGFnZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRkJQYWdlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGZhY2Vib29rIHBhZ2UgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIFRlc3RUYWtlbkxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVGVzdFRha2VuXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIHRlc3QgdGFrZW4gbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIFRlc3RpbmdBdmdMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRlc3RpbmdBdmVyYWdlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFRlc3RpbmcgQXZlcmFnZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJDYXNoXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGNhc2ggbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgU3RhdHVzTm9kZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlN0YXR1c1NjcmVlblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFN0YXR1cyBTY3JlZW4gb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgUGxheUJ1dHRvbk5vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJQbGF5QnV0dG9uXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gcGxheSBidXR0b24gb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgU3RhdHVzTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTdGF0dXNUZXh0XCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFN0YXR1cyBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICBQbGF5ZXJDb3VudElucHV0OiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyQ291bnRJbnB1dFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFBsYXllckNvdW50SW5wdXQgb2YgcHJvZmlsZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRGlzdHJpY3RMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkRpc3RyaWN0TGFiZWxcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gRGlzdHJpY3RMYWJlbCBvZiBwcm9maWxlXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBQbGF5R2FtZUJ1dHRvbjoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXlHYW1lQnV0dG9uXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gUGxheUdhbWVCdXR0b24gb2YgcHJvZmlsZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU3BlY3RhdGVCdXR0b246IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTcGVjdGF0ZUJ1dHRvblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFNwZWN0YXRlQnV0dG9uIG9mIHByb2ZpbGVcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIENhc2hOb2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaE5vZGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBDYXNoTm9kZSBvZiBwcm9maWxlXCIsfSxcclxuICAgIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgdGVhY2hlciBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBUZWFjaGVyUHJvZmlsZVVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJUZWFjaGVyUHJvZmlsZVVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7ICAgXHJcbiAgICAgICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLCB9LFxyXG4gICAgICAgICBDbGFzc1RhdWdodDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkNsYXNzVGF1Z2h0XCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIENsYXNzVGF1Z2h0IGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBTY2hvb2xOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTY2hvb2xOYW1lXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFNjaG9vbE5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIENvbnRhY3RMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkNvbnRhY3RcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gQ29udGFjdCBsYWJlbCBvZiBwcm9maWxlXCIsfSBcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIE1lbnRvciBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBNZW50b3JQcm9maWxlVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIk1lbnRvclByb2ZpbGVVSVwiLFxyXG4gICAgcHJvcGVydGllczogeyAgIFxyXG4gICAgICAgIE5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIk5hbWVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gbmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgRW1haWxBZGRyZXNzTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFbWFpbEFkZHJlc3NcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGVtYWlsIGFkZHJlc3MgbGFiZWwgb2YgcHJvZmlsZSBcIiwgfSxcclxuICAgICAgICAgQWRkcmVzc2xhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiQWRkcmVzc1wiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBBZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBDb250YWN0TGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJDb250YWN0XCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIENvbnRhY3QgbGFiZWwgb2YgcHJvZmlsZVwiLH0gXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBBZG1pbiBQcm9maWxlIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBBZG1pblByb2ZpbGVVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiQWRtaW5Qcm9maWxlVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHsgICBcclxuICAgICAgICBOYW1lTGFiZWw6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJOYW1lXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIG5hbWUgbGFiZWwgb2YgcHJvZmlsZVwiLH0sXHJcbiAgICAgICAgIEVtYWlsQWRkcmVzc0xhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiRW1haWxBZGRyZXNzXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBlbWFpbCBhZGRyZXNzIGxhYmVsIG9mIHByb2ZpbGUgXCIsIH0sXHJcbiAgICAgICAgIFNjaG9vbE5hbWVMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlNjaG9vbE5hbWVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgdG8gU2Nob29sTmFtZSBsYWJlbCBvZiBwcm9maWxlXCIsfSxcclxuICAgICAgICAgQ29udGFjdExhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiQ29udGFjdFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBDb250YWN0IGxhYmVsIG9mIHByb2ZpbGVcIix9IFxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgZGlyZWN0b3IgUHJvZmlsZSBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRGlyZWN0b3JQcm9maWxlVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkRpcmVjdG9yUHJvZmlsZVVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7ICAgXHJcbiAgICAgICAgTmFtZUxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBuYW1lIGxhYmVsIG9mIHByb2ZpbGVcIix9LFxyXG4gICAgICAgICBFbWFpbEFkZHJlc3NMYWJlbDoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkVtYWlsQWRkcmVzc1wiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgZW1haWwgYWRkcmVzcyBsYWJlbCBvZiBwcm9maWxlIFwiLCB9LFxyXG4gICAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTcGVjdGF0ZVVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTcGVjdGF0ZVVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJTcGVjdGF0ZVVJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7ICAgXHJcbiAgICAgICAgUm9vbVNjcmVlbk5vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJSb29tU2NyZWVuXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2Ygcm9vbSBzY3JlZW5cIix9LFxyXG4gICAgICAgIFNjcm9sbEJhckNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTY3JvbGxCYXJDb250ZW50XCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2YgU2Nyb2xsQmFyQ29udGVudCBvZiByb29tIHNjcmVlblwiLH0sXHJcbiAgICAgICAgUHJvZmlsZVNjcmVlbk5vZGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJQcm9maWxlU2NyZWVuXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgdG8gdGhlIG5vZGUgb2YgcHJvZmlsZSBzY3JlZW5cIix9LFxyXG4gICAgICAgIFJvb21QcmVmYWI6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJSb29tUHJlZmFiXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFJvb20gb24gcm9vbSBzY3JlZW5cIix9LFxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgVUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBVSU1hbmFnZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlVJTWFuYWdlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHsgXHJcbiAgICAgICAgVUlQcm9maWxlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVUlQcm9maWxlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IFByb2ZpbGVVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBQcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgICAgIH0sICBcclxuICAgICAgICBUZWFjaGVyVUlQcm9maWxlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVGVhY2hlclVJUHJvZmlsZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBUZWFjaGVyUHJvZmlsZVVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIFRlYWNoZXJQcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgICAgIH0sICBcclxuXHJcbiAgICAgICAgTWVudG9yVUlQcm9maWxlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTWVudG9yVUlQcm9maWxlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IE1lbnRvclByb2ZpbGVVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBNZW50b3JQcm9maWxlVUkgY2xhc3MgaW50YW5jZVwiLFxyXG4gICAgICAgIH0sICBcclxuXHJcbiAgICAgICAgQWRtaW5VSVByb2ZpbGU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJBZG1pblVJUHJvZmlsZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBBZG1pblByb2ZpbGVVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBBZG1pblByb2ZpbGVVSSBjbGFzcyBpbnRhbmNlXCIsXHJcbiAgICAgICAgfSwgIFxyXG5cclxuICAgICAgICBEaXJlY3RvclVJUHJvZmlsZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkRpcmVjdG9yVUlQcm9maWxlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IERpcmVjdG9yUHJvZmlsZVVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIERpcmVjdG9yUHJvZmlsZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgICAgICB9LCAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgU2NyZWVuTm9kZXM6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJTY3JlZW5Ob2Rlc1wiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIHRvIGxvZ2luIHNjcmVlbiBub2RlXCIsfSxcclxuICAgICAgICAgVHdlZW5NYW5hZ2VyUmVmOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVHdlZW5NYW5hZ2VyUmVmXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIFR3ZWVuIE1hbmFnZXIgU2NyaXB0IFwiLCB9LFxyXG4gICAgICAgICBMb2dvOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9nb05vZGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIGxvZ28gbm9kZVwiLH0sXHJcbiAgICAgICAgIFRvYXN0Tm9kZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvYXN0Tm9kZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciB0aGUgdG9hc3Qgbm9kZVwiLH0sXHJcbiAgICAgICAgIExvYWRpbmdOb2RlOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hZGluZ05vZGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIExvYWRpbmcgTm9kZVwiLH0sICAgXHJcbiAgICAgICAgUmVmZXJlbmNlTWFuYWdlclJlZjoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlJlZmVyZW5jZU1hbmFnZXJSZWZcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBmb3IgdGhlIHJlZmVyZW5jZSBtYW5hZ2VyIG5vZGVcIix9LCAgXHJcbiAgICAgICAgTW9kZVNlbGVjdGlvblNjcmVlbjoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIk1vZGVTZWxlY3Rpb25TY3JlZW5cIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBtb2RlIHNlbGVjdGlvbiBzY3JlZW4gbm9kZVwiLH0sICAgXHJcbiAgICAgICAgVUlTcGVjdGF0ZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlVJU3BlY3RhdGVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogU3BlY3RhdGVVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBTcGVjdGF0ZVVJIGNsYXNzIGludGFuY2VcIixcclxuICAgICAgICB9LCAgIFxyXG4gICAgICAgIFVJQ29udGFpbmVyOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVUlDb250YWluZXJcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSB0byBVSUNvbnRhaW5lciBub2Rlc1wiLH0sICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHsgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICAgICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgICB9LFxyXG5cclxuICAgIFJlc2V0QWxsRGF0YSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBUd2VlblJlZjtcclxuICAgICAgICBUb3RhbFJvb20gPSBbXTtcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkIFxyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKCdBc3NpZ25Qcm9maWxlRGF0YScsIHRoaXMuQXNzaWduUHJvZmlsZURhdGEsIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKCdVcGRhdGVTdGF0dXNXaW5kb3cnLCB0aGlzLlVwZGF0ZVN0YXR1c1dpbmRvdywgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oJ0NoYW5nZVBhbmVsU2NyZWVuJywgdGhpcy5DaGFuZ2VQYW5lbFNjcmVlbiwgdGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICBcclxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZignQXNzaWduUHJvZmlsZURhdGEnLCB0aGlzLkFzc2lnblByb2ZpbGVEYXRhLCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoJ1VwZGF0ZVN0YXR1c1dpbmRvdycsIHRoaXMuVXBkYXRlU3RhdHVzV2luZG93LCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoJ0NoYW5nZVBhbmVsU2NyZWVuJywgdGhpcy5DaGFuZ2VQYW5lbFNjcmVlbiwgdGhpcyk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuUmVzZXRBbGxEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5SZWZlcmVuY2VNYW5hZ2VyUmVmPXRoaXMuUmVmZXJlbmNlTWFuYWdlclJlZi5nZXRDb21wb25lbnQoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcblxyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRSb2xlID0gUm9sZXNbMF07XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZFJvbGVJbmRleCA9IDA7XHJcbiAgICAgICAgVUlNYW5hZ2VyLkluc3RhbmNlPXRoaXM7XHJcbiAgICAgICAgVG90YWxSb29tPVtdO1xyXG4gICAgICAgIC8vUHJpdmF0ZSBWYXJpYWJsZXNcclxuICAgICAgICB0aGlzLkVtYWlsVGV4dD1cIlwiO1xyXG4gICAgICAgIHRoaXMuUGFzc3dvcmRUZXh0PVwiXCI7XHJcbiAgICAgICAgdGhpcy5ub2RlQ291bnRlcj0wO1xyXG4gICAgICAgIHRoaXMuU3RhdHVzVGV4dD1cIlwiO1xyXG4gICAgICAgIHRoaXMuVG90YWxQbGF5ZXJzPVwiXCI7XHJcbiAgICAgICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5HZXRUd2Vlbk1hbmFnZXJSZWZlcmVuY2UoKTtcclxuICAgICAgICB0aGlzLlNsaWRlSW5Mb2dpbkNvbXBvbmVudHMoKTtcclxuICAgICAgICB0aGlzLlJlcGVhdExvZ29BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVQbGF5QnV0dG9uKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5QbGF5R2FtZUJ1dHRvbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNwZWN0YXRlQnV0dG9uKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5TcGVjdGF0ZUJ1dHRvbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICBDaGFuZ2VQYW5lbFNjcmVlbjogZnVuY3Rpb24gKGlzTmV4dCxjaGFuZ2VTY3JlZW4sc2NlbmVOYW1lKSB7XHJcbiAgICAgICAgVHdlZW5SZWYuRmFkZU5vZGVJbk91dCh0aGlzLlNjcmVlbk5vZGVzW3RoaXMubm9kZUNvdW50ZXJdLDAuNTUsMjU1LDAsXCJxdWFkSW5PdXRcIik7XHJcblxyXG4gICAgaWYoY2hhbmdlU2NyZWVuPT1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihpc05leHQ9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGVDb3VudGVyPHRoaXMuU2NyZWVuTm9kZXMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlQ291bnRlcj10aGlzLm5vZGVDb3VudGVyKzE7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZUNvdW50ZXI+MClcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZUNvdW50ZXI9dGhpcy5ub2RlQ291bnRlci0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHt0aGlzLk1hbmlwdWxhdGVOb2Rlcyh0aGlzLm5vZGVDb3VudGVyKTt9LCA2MDApO1xyXG4gICAgfWVsc2VcclxuICAgIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtjYy5kaXJlY3Rvci5sb2FkU2NlbmUoc2NlbmVOYW1lKTt9LCA2MDApO1xyXG4gICAgfX0sXHJcblxyXG4gICAgTWFuaXB1bGF0ZU5vZGVzOiBmdW5jdGlvbiAoY291bnRlcikge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlNjcmVlbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihjb3VudGVyPT1pbmRleClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TY3JlZW5Ob2Rlc1tpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNldGluZyBpdCB0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgVHdlZW5SZWYuRmFkZU5vZGVJbk91dCh0aGlzLlNjcmVlbk5vZGVzW2luZGV4XSwxLjUsMCwyNTUsXCJxdWFkSW5PdXRcIik7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TY3JlZW5Ob2Rlc1tpbmRleF0uYWN0aXZlPWZhbHNlOyBcclxuICAgICAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2xpZGVJbkxvZ2luQ29tcG9uZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFR3ZWVuUmVmLkxvZ2luU2NyZWVuVHdlZW4odGhpcy5TY3JlZW5Ob2Rlc1t0aGlzLm5vZGVDb3VudGVyXS5jaGlsZHJlblsxXSwtMTAwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlcGVhdExvZ29BbmltYXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBUd2VlblJlZi5SZXBlYXRUd2VlblNjYWxlKHRoaXMuTG9nbywxLjEsMSwwLjgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZXRUd2Vlbk1hbmFnZXJSZWZlcmVuY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBUd2VlblJlZj10aGlzLlR3ZWVuTWFuYWdlclJlZi5nZXRDb21wb25lbnQoXCJUd2Vlbk1hbmFnZXJcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlc2V0UGxheWVyQ291bnRJbnB1dCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuUGxheWVyQ291bnRJbnB1dC5zdHJpbmc9XCJcIjtcclxuICAgICAgICB0aGlzLlRvdGFsUGxheWVycz1cIlwiO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbnBsYXllck51bWJlckNoYW5nZWQoX251bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvdGFsUGxheWVycz1fbnVtYmVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBQbGF5R2FtZTpmdW5jdGlvbigpXHJcbiAgICB7ICBcclxuICAgICAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuVmVyc2VzUGxheWVyTW9kZSgpO1xyXG4gICAgICAgIC8vdGhpcy5Ub2dnbGVNb2RlU2VsZWN0aW9uKHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBCYWNrU2VsZWN0aW9uTW9kZTpmdW5jdGlvbigpXHJcbiAgICB7ICBcclxuICAgICAgICB0aGlzLlJlc2V0UGxheWVyQ291bnRJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlTW9kZVNlbGVjdGlvbihmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZU1vZGVTZWxlY3Rpb24oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTW9kZVNlbGVjdGlvblNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBWZXJzZXNQbGF5ZXJNb2RlKClcclxuICAgIHtcclxuICAgICAgICAvLyBpZih0aGlzLlRvdGFsUGxheWVycz09XCJcIilcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIGVudGVyIHBsYXllciBhbW91bnQgZm9yIG11bHRpcGxheWVyIGZyb20gMi02LCBtYWtlIHN1cmUgdG8gaGF2ZSBzYW1lIGFtb3VudCBvbiBkaWZmZXJlbnQgY29ubmVjdGluZyBkZXZpY2VzIGlmIHlvdSB3YW50IHRvIGNvbm5lY3QgdGhlbS5cIiwzNTAwKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdmFyIF9wbGF5ZXJzPXBhcnNlSW50KHRoaXMuVG90YWxQbGF5ZXJzKTtcclxuICAgICAgICAvLyAgICAgaWYoX3BsYXllcnM+PTIgJiYgX3BsYXllcnM8PTYpXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTW9kZVNlbGVjdGlvbigyKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlU2hvd1Jvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLlVJUHJvZmlsZS5QbGF5QnV0dG9uTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM9X3BsYXllcnM7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNDb25uZWN0ZWRUb01hc3RlcigpIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNJbkxvYmJ5KCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwid2FpdGluZyBmb3Igb3RoZXIgcGxheWVycy4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkpvaW5SYW5kb21Sb29tKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXF1ZXN0Q29ubmVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGVsc2VcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIGVudGVyIHBsYXllciBhbW91bnQgZm9yIG11bHRpcGxheWVyIGZyb20gMi02LCBtYWtlIHN1cmUgdG8gaGF2ZSBzYW1lIGFtb3VudCBvbiBkaWZmZXJlbnQgY29ubmVjdGluZyBkZXZpY2VzIGlmIHlvdSB3YW50IHRvIGNvbm5lY3QgdGhlbS5cIiwzNTAwKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgVmVyc2VzQUlNb2RlKClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZU1vZGVTZWxlY3Rpb24oMSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVTaG93Um9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c0xhYmVsLnN0cmluZz1cIlwiO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz0yO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcInNldHRpbmcgdXAgZ2FtZS4uLlwiKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJ3YWl0aW5nIGZvciBBSSBTZXR1cC4uLlwiKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luZWRSb29tPXRydWU7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLHRydWUsdHJ1ZSxcIkdhbWVQbGF5XCIpOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlU3RhdHVzV2luZG93OmZ1bmN0aW9uKG1zZylcclxuICAgIHsgIFxyXG4gICAgICAgIHRoaXMuU3RhdHVzVGV4dD10aGlzLlN0YXR1c1RleHQrbXNnK1wiXFxuXCI7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTGFiZWwuc3RyaW5nPXRoaXMuU3RhdHVzVGV4dDtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdENvbm5lY3Rpbmc6ZnVuY3Rpb24oKVxyXG4gICAgeyAgXHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuUGxheUJ1dHRvbk5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5VSVByb2ZpbGUuU3RhdHVzTGFiZWwuc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgdGhpcy5FbWFpbFRleHQ9XCJcIjtcclxuICAgICAgICB0aGlzLlBhc3N3b3JkVGV4dD1cIlwiO1xyXG4gICAgICAgIHRoaXMuU3RhdHVzVGV4dD1cIlwiO1xyXG4gICAgICAgIHRoaXMuVG90YWxQbGF5ZXJzPVwiXCI7XHJcbiAgICAgICAgdGhpcy5SZXNldFBsYXllckNvdW50SW5wdXQoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVMb2FkaW5nTm9kZShzdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxvYWRpbmdOb2RlLmFjdGl2ZT1zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgTG9naW5Vc2VyOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkVtYWlsVGV4dCE9XCJcIiAmJiB0aGlzLlBhc3N3b3JkVGV4dCE9XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHZhciBhbmltID0gdGhpcy5Mb2FkaW5nTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgYW5pbS5wbGF5KCdsb2FkaW5nJyk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkxvZ2luVXNlcih0aGlzLkVtYWlsVGV4dCx0aGlzLlBhc3N3b3JkVGV4dCx0aGlzLlNlbGVjdGVkUm9sZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIkVtYWlsIG9yIHBhc3N3b3JkIGludmFsaWQgb3IgZW1wdHkuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25Sb2xlVG9nZ2xlZChfdmFsKVxyXG4gICAge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coX3ZhbCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX3ZhbC5ub2RlLm5hbWUuc3BsaXQoXCJfXCIpWzFdKTtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkUm9sZUluZGV4ID0gX3ZhbC5ub2RlLm5hbWUuc3BsaXQoXCJfXCIpWzFdO1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRSb2xlID0gUm9sZXNbdGhpcy5TZWxlY3RlZFJvbGVJbmRleF07XHJcbiAgICB9LFxyXG5cclxuICAgIFNldEVtYWlsVGV4dDpmdW5jdGlvbih0ZXh0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuRW1haWxUZXh0PXRleHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIFNldFBhc3N3b3JkVGV4dDpmdW5jdGlvbih0ZXh0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGFzc3dvcmRUZXh0PXRleHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVVJQ29udGFpbmVyKF9tYWluSW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuVUlDb250YWluZXIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChfbWFpbkluZGV4ID09IGluZGV4KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5VSUNvbnRhaW5lcltpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5VSUNvbnRhaW5lcltpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBBc3NpZ25Qcm9maWxlRGF0YTpmdW5jdGlvbihfaXNTdHVkZW50PWZhbHNlLF9pc1RlYWNoZXI9ZmFsc2UsX2lzTWVudG9yPWZhbHNlLF9pc0FkbWluPWZhbHNlLF9pc0RpcmVjdG9yPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpKTtcclxuICAgICAgICBpZihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZXNwb25zZVR5cGUpPT0xKSAvL21lYW5zIHN1Y2Nlc3NmdWxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlUGFuZWxTY3JlZW4odHJ1ZSxmYWxzZSxcIlwiKTtcclxuICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGlmIChfaXNTdHVkZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVVJQ29udGFpbmVyKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVTcGVjdGF0ZUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5ET0JMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5kT0I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5HcmFkZUxldmVsTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ3JhZGVMZXZlbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlRlYWNoZXJOYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudGVhY2hlck5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5HYW1lc1dvbkxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuRkJQYWdlTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZmFjZWJvb2tQYWdlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuVGVzdFRha2VuTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudGVzdHNUYWtlbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlRlc3RpbmdBdmdMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS50ZXN0aW5nQXZlcmFnZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiQgXCIgKyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfaXNUZWFjaGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVVJQ29udGFpbmVyKDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5OYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5UZWFjaGVyRGF0YS5lbWFpbEFkZHJlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuQ2xhc3NUYXVnaHQuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuY2xhc3NUYXVnaHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRlYWNoZXJVSVByb2ZpbGUuU2Nob29sTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlRlYWNoZXJEYXRhLnNjaG9vbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGVhY2hlclVJUHJvZmlsZS5Db250YWN0TGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVGVhY2hlckRhdGEuY29udGFjdE51bWJlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF9pc01lbnRvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVVSUNvbnRhaW5lcigyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlUGxheUJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVNwZWN0YXRlQnV0dG9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVByb2ZpbGUuQ2FzaE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWVudG9yVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1lbnRvclVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMuTWVudG9yVUlQcm9maWxlLkFkZHJlc3NsYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5NZW50b3JEYXRhLmFkZHJlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1lbnRvclVJUHJvZmlsZS5Db250YWN0TGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuTWVudG9yRGF0YS5jb250YWN0TnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoX2lzQWRtaW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVUlDb250YWluZXIoMyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVBsYXlCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVTcGVjdGF0ZUJ1dHRvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLkNhc2hOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWRtaW5VSVByb2ZpbGUuTmFtZUxhYmVsLnN0cmluZyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkFkbWluRGF0YS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BZG1pblVJUHJvZmlsZS5FbWFpbEFkZHJlc3NMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEuZW1haWxBZGRyZXNzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BZG1pblVJUHJvZmlsZS5TY2hvb2xOYW1lTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuQWRtaW5EYXRhLnNjaG9vbE5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFkbWluVUlQcm9maWxlLkNvbnRhY3RMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5BZG1pbkRhdGEuY29udGFjdE51bWJlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF9pc0RpcmVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVVJQ29udGFpbmVyKDQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVQbGF5QnV0dG9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU3BlY3RhdGVCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5DYXNoTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLkRpcmVjdG9yRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpcmVjdG9yVUlQcm9maWxlLk5hbWVMYWJlbC5zdHJpbmcgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5EaXJlY3RvckRhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlyZWN0b3JVSVByb2ZpbGUuRW1haWxBZGRyZXNzTGFiZWwuc3RyaW5nID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuRGlyZWN0b3JEYXRhLmVtYWlsQWRkcmVzcztcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09MikgLy91c2VyIG5vdCBmb3VuZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwibm8gdXNlciByZWdpc3RlcmVkIHdpdGggZW50ZXJlZCBlbWFpbC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09MykgLy9wYXNzL2VtYWlsIGludmFsaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInVzZXIgZW1haWwgb3IgcGFzc3dvcmQgaXMgd3JvbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVzcG9uc2VUeXBlKT09NCkgLy9zb21ldGhpbmcgd2VudCB3cm9uZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29tZXRoaW5nIHdlbnQgd3JvbmcgcGxlYXNlIHRyeSBhZ2Fpbi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNyZWdpb24gU3BlY3RhdGUgVWkgV29ya1xyXG4gICAgVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBpZihfc3RhdGUpXHJcbiAgICAgICAgICAgIHRoaXMuVUlQcm9maWxlLlN0YXR1c05vZGUuYWN0aXZlPWZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVJU3BlY3RhdGUuUm9vbVNjcmVlbk5vZGUuYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJU3BlY3RhdGUuUHJvZmlsZVNjcmVlbk5vZGUuYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgU2hvd0F2YWlsYWJsZVJvb21zX1NwZWN0YXRlVUkoKVxyXG4gICAge1xyXG4gICAgIFxyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNDb25uZWN0ZWRUb01hc3RlcigpIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkuaXNJbkxvYmJ5KCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlVJUHJvZmlsZS5TdGF0dXNMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVTaG93Um9vbV9Cb29sKHRydWUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlcXVlc3RDb25uZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShfbmFtZSxfcGxheWVycylcclxuICAgIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuVUlTcGVjdGF0ZS5Sb29tUHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuVUlTcGVjdGF0ZS5TY3JvbGxCYXJDb250ZW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdSb29tTGlzdEhhbmRsZXInKS5TZXRSb29tTmFtZShfbmFtZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ1Jvb21MaXN0SGFuZGxlcicpLlNldFBsYXllckNvdW50KF9wbGF5ZXJzKTtcclxuICAgICAgICBUb3RhbFJvb20ucHVzaChub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRSb29tTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFRvdGFsUm9vbS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgVG90YWxSb29tW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUb3RhbFJvb209W107XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRfU3BlY3RhdGVVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuRXhpdENvbm5lY3RpbmcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgTG9nb3V0KClcclxuICAgIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2xlYXJEYXRhXCIpOyAvL2Z1bmN0aW9uIHdyaXR0ZW4gaW4gc3RvcmFnZSBNYW5hZ2VyIGNsYXNzXHJcblxyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKSE9bnVsbClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpIT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkhPW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkhPW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIFNob3dUb2FzdDpmdW5jdGlvbihtc2csX3RpbWU9MjAwMClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlRvYXN0Tm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLlRvYXN0Tm9kZS5jaGlsZHJlblsxXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1tc2c7XHJcbiAgICAgICAgdmFyIFNlbGZUb2FzdD10aGlzO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgIFNlbGZUb2FzdC5Ub2FzdE5vZGUuYWN0aXZlPWZhbHNlOyB9LCBfdGltZSk7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzPSBVSU1hbmFnZXI7XHJcbiJdfQ==