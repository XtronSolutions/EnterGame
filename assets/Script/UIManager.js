import Tweeen from "TweenManager";
import ServerBackend from "./ServerBackend";
var GamePlayReferenceManager = null;
var TweenRef;
var TotalRoom = [];
var AvatarSelection = 0;
var _tempAvatarSelection = 0;
var Roles = ["Student", "Teacher", "ProgramAmbassador", "SchoolAdmin", "ProgramDirector"];
//-------------------------------------------class for Profile UI-------------------------//
var ProfileUI = cc.Class({
  name: "ProfileUI",
  properties: {
    NameLabel: {
      displayName: "Name",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to name label of profile",
    },
    EmailAddressLabel: {
      displayName: "EmailAddress",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference for email address label of profile ",
    },
    DOBLabel: {
      displayName: "DOB",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to DOB label of profile",
    },
    GradeLevelLabel: {
      displayName: "GradeLevel",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Grade Level label of profile",
    },
    TeacherNameLabel: {
      displayName: "TeacherName",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Teacher Name label of profile",
    },
    GamesWonLabel: {
      displayName: "GamesWon",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to games won label of profile",
    },
    FBPageLabel: {
      displayName: "FBPage",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to facebook page label of profile",
    },
    TestTakenLabel: {
      displayName: "TestTaken",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to test taken label of profile",
    },
    TestingAvgLabel: {
      displayName: "TestingAverage",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Testing Average label of profile",
    },
    CashLabel: {
      displayName: "Cash",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to cash label of profile",
    },
    StatusNode: {
      displayName: "StatusScreen",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to Status Screen of profile",
    },
    PlayButtonNode: {
      displayName: "PlayButton",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to play button of profile",
    },
    StatusLabel: {
      displayName: "StatusText",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Status label of profile",
    },
    PlayerCountInput: {
      displayName: "PlayerCountInput",
      default: null,
      type: cc.EditBox,
      serializable: true,
      tooltip: "reference to PlayerCountInput of profile",
    },
    DistrictLabel: {
      displayName: "DistrictLabel",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to DistrictLabel of profile",
    },
    PlayGameButton: {
      displayName: "PlayGameButton",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to PlayGameButton of profile",
    },
    SpectateButton: {
      displayName: "SpectateButton",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to SpectateButton of profile",
    },
    CashNode: {
      displayName: "CashNode",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to CashNode of profile",
    },
  },
});
//-------------------------------------------class for teacher Profile UI-------------------------//
var TeacherProfileUI = cc.Class({
  name: "TeacherProfileUI",
  properties: {
    NameLabel: {
      displayName: "Name",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to name label of profile",
    },
    EmailAddressLabel: {
      displayName: "EmailAddress",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference for email address label of profile ",
    },
    ClassTaught: {
      displayName: "ClassTaught",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to ClassTaught label of profile",
    },
    SchoolNameLabel: {
      displayName: "SchoolName",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to SchoolName label of profile",
    },
    ContactLabel: {
      displayName: "Contact",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Contact label of profile",
    },
  },
});

//-------------------------------------------class for Mentor Profile UI-------------------------//
var MentorProfileUI = cc.Class({
  name: "MentorProfileUI",
  properties: {
    NameLabel: {
      displayName: "Name",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to name label of profile",
    },
    EmailAddressLabel: {
      displayName: "EmailAddress",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference for email address label of profile ",
    },
    Addresslabel: {
      displayName: "Address",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Address label of profile",
    },
    ContactLabel: {
      displayName: "Contact",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Contact label of profile",
    },
  },
});

//-------------------------------------------class for Admin Profile UI-------------------------//
var AdminProfileUI = cc.Class({
  name: "AdminProfileUI",
  properties: {
    NameLabel: {
      displayName: "Name",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to name label of profile",
    },
    EmailAddressLabel: {
      displayName: "EmailAddress",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference for email address label of profile ",
    },
    SchoolNameLabel: {
      displayName: "SchoolName",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to SchoolName label of profile",
    },
    ContactLabel: {
      displayName: "Contact",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to Contact label of profile",
    },
  },
});

//-------------------------------------------class for director Profile UI-------------------------//
var DirectorProfileUI = cc.Class({
  name: "DirectorProfileUI",
  properties: {
    NameLabel: {
      displayName: "Name",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference to name label of profile",
    },
    EmailAddressLabel: {
      displayName: "EmailAddress",
      default: null,
      type: cc.Label,
      serializable: true,
      tooltip: "reference for email address label of profile ",
    },
  },
});
//-------------------------------------------class for SpectateUI-------------------------//
var SpectateUI = cc.Class({
  name: "SpectateUI",
  properties: {
    RoomScreenNode: {
      displayName: "RoomScreen",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Reference to the node of room screen",
    },
    ScrollBarContent: {
      displayName: "ScrollBarContent",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Reference to the node of ScrollBarContent of room screen",
    },
    ProfileScreenNode: {
      displayName: "ProfileScreen",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "Reference to the node of profile screen",
    },
    RoomPrefab: {
      displayName: "RoomPrefab",
      default: null,
      type: cc.Prefab,
      serializable: true,
      tooltip: "Reference to the prefab of Room on room screen",
    },
  },
});

//-------------------------------------------class for AvatarUI-------------------------//
var AvatarUI = cc.Class({
  name: "AvatarUI",
  properties: {
    AvatarSelectionScreen: {
      displayName: "AvatarSelectionScreen",
      default: null,
      type: cc.Node,
      serializable: true,
    },
    AvatarNodes: {
      displayName: "AvatarNodes",
      default: [],
      type: [cc.Node],
      serializable: true,
    },
    AvatarButtons: {
      displayName: "AvatarButtons",
      default: [],
      type: [cc.Node],
      serializable: true,
    },
  },
});

//-------------------------------------------class for UIManager-------------------------//
var UIManager = cc.Class({
  name: "UIManager",
  extends: cc.Component,

  properties: {
    UIProfile: {
      displayName: "UIProfile",
      default: null,
      type: ProfileUI,
      serializable: true,
      tooltip: "reference to ProfileUI class intance",
    },
    TeacherUIProfile: {
      displayName: "TeacherUIProfile",
      default: null,
      type: TeacherProfileUI,
      serializable: true,
      tooltip: "reference to TeacherProfileUI class intance",
    },

    MentorUIProfile: {
      displayName: "MentorUIProfile",
      default: null,
      type: MentorProfileUI,
      serializable: true,
      tooltip: "reference to MentorProfileUI class intance",
    },

    AdminUIProfile: {
      displayName: "AdminUIProfile",
      default: null,
      type: AdminProfileUI,
      serializable: true,
      tooltip: "reference to AdminProfileUI class intance",
    },

    DirectorUIProfile: {
      displayName: "DirectorUIProfile",
      default: null,
      type: DirectorProfileUI,
      serializable: true,
      tooltip: "reference to DirectorProfileUI class intance",
    },

    AvatarUISetup: {
      displayName: "AvatarUISetup",
      default: null,
      type: AvatarUI,
      serializable: true,
      tooltip: "reference to AvatarUI class intance",
    },

    ScreenNodes: {
      displayName: "ScreenNodes",
      default: [],
      type: [cc.Node],
      serializable: true,
      tooltip: "reference to login screen node",
    },
    TweenManagerRef: {
      displayName: "TweenManagerRef",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for Tween Manager Script ",
    },
    Logo: {
      displayName: "LogoNode",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for the logo node",
    },
    ToastNode: {
      displayName: "ToastNode",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for the toast node",
    },
    LoadingNode: {
      displayName: "LoadingNode",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for the Loading Node",
    },
    ReferenceManagerRef: {
      displayName: "ReferenceManagerRef",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference for the reference manager node",
    },
    ModeSelectionScreen: {
      displayName: "ModeSelectionScreen",
      default: null,
      type: cc.Node,
      serializable: true,
      tooltip: "reference to mode selection screen node",
    },
    UISpectate: {
      displayName: "UISpectate",
      default: null,
      type: SpectateUI,
      serializable: true,
      tooltip: "reference to SpectateUI class intance",
    },
    UIContainer: {
      displayName: "UIContainer",
      default: [],
      type: [cc.Node],
      serializable: true,
      tooltip: "reference to UIContainer nodes",
    },
  },

  statics: {
    //creating static instance of the class
    Instance: null,
  },

  ResetAllData() {
    GamePlayReferenceManager = null;
    TweenRef;
    TotalRoom = [];
    AvatarSelection = 0;
    _tempAvatarSelection = 0;
  },

  onEnable: function () {
    //events subscription to be called
    cc.systemEvent.on("AssignProfileData", this.AssignProfileData, this);
    cc.systemEvent.on("UpdateStatusWindow", this.UpdateStatusWindow, this);
    cc.systemEvent.on("ChangePanelScreen", this.ChangePanelScreen, this);
  },

  onDisable: function () {
    cc.systemEvent.off("AssignProfileData", this.AssignProfileData, this);
    cc.systemEvent.off("UpdateStatusWindow", this.UpdateStatusWindow, this);
    cc.systemEvent.off("ChangePanelScreen", this.ChangePanelScreen, this);
  },

  onLoad() {
    this.ResetAllData();
    this.ReferenceManagerRef = this.ReferenceManagerRef.getComponent("GamePlayReferenceManager");

    this.SelectedRole = Roles[0];
    this.SelectedRoleIndex = 0;
    UIManager.Instance = this;
    TotalRoom = [];
    //Private Variables
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

  TogglePlayButton(_state) {
    this.UIProfile.PlayGameButton.active = _state;
  },

  ToggleSpectateButton(_state) {
    this.UIProfile.SpectateButton.active = _state;
  },

  CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
  },

  ChangePanelScreen: function (isNext, changeScreen, sceneName) {
    TweenRef.FadeNodeInOut(this.ScreenNodes[this.nodeCounter], 0.55, 255, 0, "quadInOut");

    if (changeScreen == false) {
      if (isNext == true) {
        if (this.nodeCounter < this.ScreenNodes.length) this.nodeCounter = this.nodeCounter + 1;
      } else {
        if (this.nodeCounter > 0) this.nodeCounter = this.nodeCounter - 1;
      }
      setTimeout(() => {
        this.ManipulateNodes(this.nodeCounter);
      }, 600);
    } else {
      setTimeout(() => {
        cc.director.loadScene(sceneName);
      }, 600);
    }
  },

  ManipulateNodes: function (counter) {
    for (let index = 0; index < this.ScreenNodes.length; index++) {
      if (counter == index) {
        this.ScreenNodes[index].active = true;
        console.log("seting it true");
        TweenRef.FadeNodeInOut(this.ScreenNodes[index], 1.5, 0, 255, "quadInOut");
      } else {
        this.ScreenNodes[index].active = false;
      }
    }
  },

  SlideInLoginComponents: function () {
    TweenRef.LoginScreenTween(this.ScreenNodes[this.nodeCounter].children[1], -1000);
  },

  RepeatLogoAnimation: function () {
    TweenRef.RepeatTweenScale(this.Logo, 1.1, 1, 0.8);
  },

  GetTweenManagerReference: function () {
    TweenRef = this.TweenManagerRef.getComponent("TweenManager");
  },

  ResetPlayerCountInput() {
    this.UIProfile.PlayerCountInput.string = "";
    this.TotalPlayers = "";
  },

  OnplayerNumberChanged(_number) {
    this.TotalPlayers = _number;
  },

  PlayGame: function () {
    this.ResetPlayerCountInput();
    // this.VersesPlayerMode();
    this.ToggleModeSelection(true);
  },

  BackSelectionMode: function () {
    this.ResetPlayerCountInput();
    this.ToggleModeSelection(false);
  },

  ToggleModeSelection(_state) {
    this.ModeSelectionScreen.active = _state;
  },

  VersesPlayerMode() {
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
    this.UIProfile.StatusNode.active = true;
    //this.UIProfile.PlayButtonNode.active=false;
    this.UIProfile.StatusLabel.string = "";
    //GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers=_players;

    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isConnectedToMaster() || GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().isInLobby()) {
      cc.systemEvent.emit("UpdateStatusWindow", "waiting for other players...");
      GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinRandomRoom();
    } else {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().RequestConnection();
    }
    //     }
    //     else
    //     {
    //         this.ResetPlayerCountInput();
    //         this.ShowToast("please enter player amount for multiplayer from 2-6, make sure to have same amount on different connecting devices if you want to connect them.",3500);
    //     }
    // }
  },

  VersesAIMode() {
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleModeSelection(1);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleShowRoom_Bool(false);
    this.UIProfile.StatusNode.active = true;
    this.UIProfile.StatusLabel.string = "";
    GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = 2;
    cc.systemEvent.emit("UpdateStatusWindow", "setting up game...");
    cc.systemEvent.emit("UpdateStatusWindow", "waiting for AI Setup...");
    cc.systemEvent.emit("UpdateStatusWindow", "starting game...");

    setTimeout(() => {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinedRoom = true;
      cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay"); //function in ui manager
    }, 1000);
  },

  UpdateStatusWindow: function (msg) {
    this.StatusText = this.StatusText + msg + "\n";
    this.UIProfile.StatusLabel.string = this.StatusText;
  },

  ExitConnecting: function () {
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

  ToggleLoadingNode(state) {
    this.LoadingNode.active = state;
  },

  LoginUser: function () {
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

  OnRoleToggled(_val) {
    //console.log(_val);
    console.log(_val.node.name.split("_")[1]);
    this.SelectedRoleIndex = _val.node.name.split("_")[1];
    this.SelectedRole = Roles[this.SelectedRoleIndex];
  },

  SetEmailText: function (text) {
    this.EmailText = text;
  },

  SetPasswordText: function (text) {
    this.PasswordText = text;
  },

  SetLicenseText: function (text) {
    this.LicenseText = text;
  },

  ToggleUIContainer(_mainIndex) {
    for (let index = 0; index < this.UIContainer.length; index++) {
      if (_mainIndex == index) this.UIContainer[index].active = true;
      else this.UIContainer[index].active = false;
    }
  },

  AssignAvatar(_index = 0) {
    for (let index = 0; index < this.AvatarUISetup.AvatarNodes.length; index++) {
      if (_index == index) this.AvatarUISetup.AvatarNodes[index].active = true;
      else this.AvatarUISetup.AvatarNodes[index].active = false;
    }
  },

  ToggleAvatarScreen(_state) {
    this.AvatarUISetup.AvatarSelectionScreen.active = _state;
  },

  EnableAvatarScreen() {
    this.ToggleAvatarScreen(true);

    for (let index = 0; index < this.AvatarUISetup.AvatarButtons.length; index++) {
      if (AvatarSelection == index) this.AvatarUISetup.AvatarButtons[index].children[1].active = true;
      else this.AvatarUISetup.AvatarButtons[index].children[1].active = false;
    }
  },

  DisableAvatarScreen() {
    this.ToggleAvatarScreen(false);

    if (_tempAvatarSelection != AvatarSelection) {
      AvatarSelection = _tempAvatarSelection;
      this.AssignAvatar(AvatarSelection);
      this.AssignDataClasses(AvatarSelection);
      GamePlayReferenceManager.Instance.Get_ServerBackend().UpdateUserData(-1, -1, AvatarSelection);
    }
  },
  AssignAvatarSelection(event = null) {
    _tempAvatarSelection = parseInt(event.currentTarget.name.split("_")[1]);
    console.log(_tempAvatarSelection);

    for (let index = 0; index < this.AvatarUISetup.AvatarButtons.length; index++) {
      if (_tempAvatarSelection == index) this.AvatarUISetup.AvatarButtons[index].children[1].active = true;
      else this.AvatarUISetup.AvatarButtons[index].children[1].active = false;
    }
  },

  AssignDataClasses(_ID) {
    GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.avatarId = _ID.toString();
    GamePlayReferenceManager.Instance.Get_ServerBackend().TeacherData.avatarId = _ID.toString();
    GamePlayReferenceManager.Instance.Get_ServerBackend().MentorData.avatarId = _ID.toString();
    GamePlayReferenceManager.Instance.Get_ServerBackend().AdminData = _ID.toString();
    GamePlayReferenceManager.Instance.Get_ServerBackend().DirectorData.avatarId = _ID.toString();
  },

  AssignProfileData: function (_isStudent = false, _isTeacher = false, _isMentor = false, _isAdmin = false, _isDirector = false) {
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
  ToggleRoomScreen_SpectateUI(_state) {
    if (_state) this.UIProfile.StatusNode.active = false;

    this.UISpectate.RoomScreenNode.active = _state;
  },

  ToggleProfileScreen_SpectateUI(_state) {
    this.UISpectate.ProfileScreenNode.active = _state;
  },

  ShowAvailableRooms_SpectateUI() {
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

  UpdateRoomsList_SpectateUI(_name, _players) {
    var node = cc.instantiate(this.UISpectate.RoomPrefab);
    node.parent = this.UISpectate.ScrollBarContent;
    node.getComponent("RoomListHandler").SetRoomName(_name);
    node.getComponent("RoomListHandler").SetPlayerCount(_players);
    TotalRoom.push(node);
  },

  ResetRoomList() {
    for (let index = 0; index < TotalRoom.length; index++) {
      TotalRoom[index].destroy();
    }

    TotalRoom = [];
  },

  Exit_SpectateUI() {
    this.ToggleProfileScreen_SpectateUI(true);
    this.ToggleRoomScreen_SpectateUI(false);
    this.ExitConnecting();
  },

  Logout() {
    cc.systemEvent.emit("ClearData"); //function written in storage Manager class

    if (GamePlayReferenceManager.Instance.Get_GameManager() != null) GamePlayReferenceManager.Instance.Get_GameManager().ClearDisplayTimeout();
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController() != null) GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();

    if (GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager() != null) GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();

    if (GamePlayReferenceManager.Instance.Get_ServerBackend() != null) GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();

    GamePlayReferenceManager.Instance.RemovePersistNode();

    cc.director.loadScene("MainMenu");
  },
  //#endregion

  ShowToast: function (msg, _time = 2000) {
    this.ToastNode.active = true;
    this.ToastNode.children[1].children[1].getComponent(cc.Label).string = msg;
    var SelfToast = this;
    setTimeout(function () {
      SelfToast.ToastNode.active = false;
    }, _time);
  },
});

module.exports = UIManager;
