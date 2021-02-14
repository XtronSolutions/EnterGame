//Global Variables
var PhotonRef;
var stateText = "";
var GamePlayReferenceManager = null;
var ShowRoom = false;
var GameFinished = false;
var IsMasterClient = false;
var TotalTimer = 30;
var TimerStarted = false;
var Schedular = null;
var MaxStudents = 6;
var RestartSpectate = false;
var IsGameStarted = false;
var Timeouts = [];
//---------------------------------------class data related to RoomProperty------------------------------------------------//
var RoomProperty = cc.Class({
  name: "RoomProperty",
  properties: {
    Player: {
      default: 0,
      type: cc.Integer,
      serializable: true,
    },
    InitialSetup: {
      default: false,
      type: cc.Boolean,
      serializable: true,
    },
    PlayerGameInfo: {
      default: "",
      type: cc.Text,
      serializable: true,
    },
    TurnNumber: {
      default: 0,
      type: cc.Integer,
      serializable: true,
    },
  },
});
//---------------------------------------class data related to App_Info------------------------------------------------//
var App_Info = cc.Class({
  name: "App_Info",
  properties: {
    AppID: {
      default: "",
      type: cc.Text,
      serializable: true,
      tooltip: "App id form photon dashboard",
    },
    AppVersion: {
      default: "",
      type: cc.Text,
      serializable: true,
      tooltip: "App version for photon",
    },
    Wss: {
      displayName: "IsSecure",
      default: false,
      type: cc.Boolean,
      serializable: true,
      tooltip: "If photon should use secure and reliable protocols",
    },
    MasterServer: {
      default: "",
      type: cc.Text,
      serializable: true,
      tooltip: "master server for photon to connect",
    },
    FbAppID: {
      default: "",
      type: cc.Text,
      serializable: true,
      tooltip: "FB app id used for FB autherization",
    },
  },
});
//---------------------------------------class data related to MultiplayerController----------------------------------//
var MultiplayerController = cc.Class({
  name: "MultiplayerController",
  extends: cc.Component,
  properties: {
    PhotonAppInfo: {
      default: null,
      type: App_Info,
      serializable: true,
    },
    MaxPlayers: {
      default: 0,
      type: cc.Integer,
      serializable: true,
    },
    MaxSpectators: {
      default: 0,
      type: cc.Integer,
      serializable: true,
    },
    ModeSelection: {
      // 1 means bot , 2 means real players
      default: 0,
      type: cc.Integer,
      serializable: true,
    },
  },

  statics: {
    //creating static instance of the class
    Instance: null,
  },

  ResetAllData() {
    Timeouts = [];
    IsGameStarted = false;
    PhotonRef = null;
    stateText = "";
    GamePlayReferenceManager = null;
    ShowRoom = false;
    GameFinished = false;
    IsMasterClient = false;
    TotalTimer = 30;
    TimerStarted = false;
    Schedular = null;
    this.ResetRoomValues();
    MaxStudents = 6;
    RestartSpectate = false;
  },
  //this function is called when instance of this class is created
  onLoad() {
    this.ResetAllData();
    this.Init_MultiplayerController();
  },

  ToggleModeSelection(
    _val // 1 means bot , 2 means real players
  ) {
    this.ModeSelection = _val;
  },

  GetActiveStatus(_uID = "") {
    var _isActive = true;

    var _array = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;

    for (let index = 0; index < _array.length; index++) {
      if (_array[index].PlayerUID == _uID) {
        if (_array[index].IsActive == false) {
          _isActive = false;
        }
      }
    }

    return _isActive;
  },

  GetSelectedMode() {
    return this.ModeSelection;
  },

  /**
    @summary Initialize some essentails data for multiplayer controller class
    @method Init_MultiplayerController
    @param none
    @returns no return
   **/
  Init_MultiplayerController() {
    if (!MultiplayerController.Instance) {
      cc.game.addPersistRootNode(this.node);
      this.InitializePhoton();
      console.log(AppInfo);
      PhotonRef = new DemoLoadBalancing();
      MultiplayerController.Instance = this;
    }

    this.LeaveRoom = false;
    this.RoomName = "";
    this.Message = "";
    ShowRoom = false;
    this.JoinedRoom = false;
    this.CheckReferences();
  },

  /**
    @summary check reference to some variables and classes
    @method CheckReferences
    @param none
    @returns no return
   **/
  CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
  },

  /**
    @summary remove persist node when want to restart scene
    @method RemovePersistNode
    @param none
    @returns no return
   **/
  RemovePersistNode() {
    MultiplayerController.Instance = null;
    cc.game.removePersistRootNode(this.node);
  },

  /**
    @summary function to get name of current opened scene
    @method getSceneName
    @param none
    @returns {string} sceneName
    **/
  getSceneName: function () {
    var sceneName;
    var _sceneInfos = cc.game._sceneInfos;
    for (var i = 0; i < _sceneInfos.length; i++) {
      if (_sceneInfos[i].uuid == cc.director._scene._id) {
        sceneName = _sceneInfos[i].url;
        sceneName = sceneName.substring(sceneName.lastIndexOf("/") + 1).match(/[^\.]+/)[0];
      }
    }
    return sceneName;
  },

  /**
    @summary function to set "ShowRoom" bool value
    @method ToggleShowRoom_Bool
    @param {boolean} _state
    @returns no return
    **/
  ToggleShowRoom_Bool(_state) {
    ShowRoom = _state;
  },

  /**
    @summary function to set "LeaveRoom" bool value
    @method ToggleLeaveRoom_Bool
    @param {boolean} _state
    @returns no return
    **/
  ToggleLeaveRoom_Bool(_state) {
    this.LeaveRoom = _state;
  },

  /**
    @summary returns Photon "PhotonRef" instance created by multiplayer class
    @method getPhotonRef
    @param none
    @returns {object} PhotonRef
    **/
  getPhotonRef() {
    return PhotonRef;
  },

  /**
    @summary returns myActor instance created by photon
    @method PhotonActor
    @param none
    @returns {object} Actor
    **/
  PhotonActor() {
    return PhotonRef.myActor();
  },

  /**
    @summary returns myRoomActorsArray created by photon
    @method RoomActors
    @param none
    @returns {object} Actor
    **/
  RoomActors() {
    return PhotonRef.myRoomActorsArray();
  },

  /**
    @summary returns isSpectate variable from custom property of current actor
    @method CheckSpectate
    @param none
    @returns {boolean} isSpectate
    **/
  CheckSpectate() {
    return PhotonRef.myActor().customProperties.RoomEssentials.IsSpectate;
  },

  /**
    @summary Initialize photon with appid,app version, Wss etc
    @method InitializePhoton
    @param none
    @returns no return
   **/
  InitializePhoton() {
    AppInfo.AppId = this.PhotonAppInfo.AppID;
    AppInfo.AppVersion = this.PhotonAppInfo.AppVersion;
    AppInfo.Wss = this.PhotonAppInfo.Wss;
    AppInfo.MasterServer = this.PhotonAppInfo.MasterServer;
    AppInfo.FbAppId = this.PhotonAppInfo.FbAppID;
  },

  /**
    @summary send connection request to photon
    @method RequestConnection
    @param none
    @returns no return
   **/
  RequestConnection() {
    if (PhotonRef.state == 5 || PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true) console.log("already connected");
    else PhotonRef.start();
  },

  /**
    @summary Disconnect from photon
    @method DisconnectPhoton
    @param none
    @returns no return
   **/
  DisconnectPhoton() {
    if (PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.isJoinedToRoom() == true) {
      PhotonRef.disconnect();
      this.JoinedRoom = false;
      //PhotonRef.leaveRoom();
      this.ResetState();
    } else {
      console.log("not inside any room or lobby or connected to photon");
    }
  },

  /**
    @summary reseting few values
    @method ResetState
    @param none
    @returns no return
   **/
  ResetState() {
    IsGameStarted = false;
    this.LeaveRoom = false;
    this.JoinedRoom = false;
    ShowRoom = false;
    stateText = "";
    this.ResetRoomValues();
  },

  /**
    @summary called when room name got input from game
    @method OnRoomNameChange
    @param {string} name
    @returns no return
   **/
  OnRoomNameChange(name) {
    this.RoomName = name;
  },

  /**
    @summary called when message window got input from game
    @method OnMessageChange
    @param {string} msg
    @returns no return
   **/
  OnMessageChange(msg) {
    this.Message = msg;
  },

  /**
    @summary update custom room properties
    @method UpdateRoomCustomProperites
    @returns no return
   **/
  UpdateRoomCustomProperites(_playerUpdate = false, _playerValue = 0, _initialSetupUpdate = false, _initialSetupValue = false, _playerGameInfoUpdate = false, _playerGameInfoValue = null, _turnNumberUpdate = false, _turnNumbervalue = 0) {
    if (_playerUpdate) PhotonRef.myRoom().setCustomProperty("Player", _playerValue, true);

    if (_initialSetupUpdate) PhotonRef.myRoom().setCustomProperty("InitialSetup", _initialSetupValue, true);

    if (_playerGameInfoUpdate) PhotonRef.myRoom().setCustomProperty("PlayerGameInfo", _playerGameInfoValue, true);

    if (_turnNumberUpdate) PhotonRef.myRoom().setCustomProperty("TurnNumber", _turnNumbervalue, true);
  },

  /**
    @summary create room request
    @method CreateRoom
    @param none
    @returns no return
   **/
  CreateRoom() {
    if (PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.state == 8) {
      if (PhotonRef.isJoinedToRoom() == false) {
        var _data = new RoomProperty();
        _data.Player = 0;

        var roomOptions = {
          isVisible: true,
          isOpen: true,
          maxPlayers: this.MaxPlayers + this.MaxSpectators,
          customGameProperties: _data,
        };

        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(false);
        PhotonRef.myActor().name = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name;
        PhotonRef.myActor().setCustomProperty("Data", GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);
        PhotonRef.myActor().setCustomProperty("PlayerSessionData", {});
        PhotonRef.myActor().setCustomProperty("RoomEssentials", { IsSpectate: false });
        PhotonRef.myActor().setCustomProperty("RoomCounter", { Counter: TotalTimer });
        PhotonRef.setUserId(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID);
        var RoomID = Math.floor(Math.random() * Date.now());

        PhotonRef.createRoom("Room_" + RoomID, roomOptions);
      } else {
        console.log("already joined the room");
      }
    } else {
      console.log("you are not connected or connection is dropped, please connect to photon again.");
    }
  },

  /**
    @summary join room request by name
    @method JoinRoom
    @param {string} _roomName
    @returns no return
   **/
  JoinRoom(_roomName) {
    if (PhotonRef.state == 5 || PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.state == 8) {
      if (PhotonRef.isJoinedToRoom() == false || PhotonRef.state != 8) {
        var roomOptions = {
          isVisible: true,
          isOpen: false,
          maxPlayers: this.MaxPlayers + this.MaxSpectators,
          //"customGameProperties":{"RoomEssentials": {IsSpectate:true}}
        };

        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(false);
        PhotonRef.myActor().name = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name;
        PhotonRef.myActor().setCustomProperty("Data", GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);
        PhotonRef.myActor().setCustomProperty("PlayerSessionData", {});
        PhotonRef.myActor().setCustomProperty("RoomEssentials", { IsSpectate: true });
        PhotonRef.myActor().setCustomProperty("RoomCounter", { Counter: TotalTimer });
        PhotonRef.setUserId(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID);

        PhotonRef.joinRoom(_roomName, roomOptions);
      } else {
        console.log("already joined the room");
      }
    } else {
      console.log("you are not connected or connection is dropped, please connect to photon again.");
    }
  },

  /**
    @summary join random room
    @method JoinRandomRoom
    @param none
    @returns no return
   **/
  JoinRandomRoom() {
    if (PhotonRef.state == 5 || PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.state == 8) {
      if (PhotonRef.isJoinedToRoom() == false || PhotonRef.state != 8) {
        var _data = new RoomProperty();
        _data.Player = 0;

        var roomOptions = {
          //"expectedMaxPlayers":this.MaxPlayers+MaxSpectators,
          expectedCustomRoomProperties: _data,
        };

        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(false);
        PhotonRef.myActor().name = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name;
        PhotonRef.myActor().setCustomProperty("Data", GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);
        PhotonRef.myActor().setCustomProperty("PlayerSessionData", {});
        PhotonRef.myActor().setCustomProperty("RoomEssentials", { IsSpectate: false });
        PhotonRef.myActor().setCustomProperty("RoomCounter", { Counter: TotalTimer });
        PhotonRef.setUserId(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID);

        PhotonRef.joinRandomRoom(roomOptions);
      } else {
        console.log("already joined the room");
      }
    } else {
      console.log("you are not connected or connection is dropped, please connect to photon again.");
    }
  },

  /**
    @summary Send card index over network
    @method SendCardData
    @param {Object} _data
    @returns no return
   **/
  SendCardData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending card data");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          5,
          {
            CardData: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary Send game over call
    @method SendGameOver
    @param {Object} _data
    @returns no return
   **/
  SendGameOver(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending game over call");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          6,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  SendGameOverData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending game over data to sync");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          16,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  SendSelectedPlayerForProfit(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending game over data to sync");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          17,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary Send backrupt data
    @method SendBankruptData
    @param {Object} _data
    @returns no return
   **/
  SendBankruptData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending bankrupcy data");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          9,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary Send Player Data over network
    @method SendData
    @param {Object} _data
    @returns no return
   **/
  SendData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending player data");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          1,
          {
            PlayerInfo: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary Send one question Data over network
    @method SendOneQuestionData
    @param {Object} _data
    @returns no return
   **/
  SendOneQuestionData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending one question data");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          7,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  SendOneQuestionArrays(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending one question arrays");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          18,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  SendDecksArrays(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending decks arrays");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          19,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  SendDecksArrayCounter(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending decks arrays counters");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          20,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },
  /**
    @summary Send profit or loss to your pasrtner
    @method SendPartnerProfitLoss
    @param {Object} _data
    @returns no return
   **/
  SendPartnerProfitLoss(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending one question data");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          13,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary Send one question response over network
    @method SendOneQuestionResponseData
    @param {Object} _data
    @returns no return
   **/
  SendOneQuestionResponseData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending one question response data");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          8,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary send dice data
    @method DiceRollEvent
    @param {Object} _data
    @returns no return
   **/
  DiceRollEvent(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending dice count");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          3,
          {
            DiceCount: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary send go back spaces data
    @method SendGoBackSpaceData
    @param {Object} _data
    @returns no return
   **/
  SendGoBackSpaceData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("send go back spaces data");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          10,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary sending open invitation to all players for partner ship
    @method SendPartnerShipOfferData
    @param {Object} _data
    @returns no return
   **/
  SendPartnerShipOfferData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending partner ship offer");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          11,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary sending partner answer data (accept or reject)
    @method SendPartnerShipAnswerData
    @param {Object} _data
    @returns no return
   **/
  SendPartnerShipAnswerData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending partenrship answer data");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          12,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  SendInfo(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending info");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          15,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary send user id of player to all other who had completed their turn
    @method SyncTurnCompletion
    @param {Object} _data
    @returns no return
   **/
  SyncTurnCompletion(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending turn completion data");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          4,
          {
            UID: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary Start Turn for initial turn
    @method StartTurn
    @param {Object} _data
    @returns no return
   **/
  StartTurn(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.trace("Starting Turn");
      console.log(_data);
      try {
        PhotonRef.raiseEvent(
          2,
          {
            TurnNumber: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  /**
    @summary Show toast message on the console
    @method ShowToast
    @param {string} message message to be shown 
    @returns no return
   **/
  ShowToast: function (msg) {
    console.log("toast message: " + msg);
  },

  /**
    @summary Receive event from photon raise on 
    @method CallRecieveEvent
    @returns no return
   **/
  CallRecieveEvent: function (_eventCode, _senderName, _senderID, _data) {
    var InstanceNull = true;

    //to check if instance is null in case class instance is not loaded and its receives callback
    if (GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager() == null) {
      InstanceNull = true;
      setTimeout(() => {
        this.CallRecieveEvent(_eventCode, _senderName, _senderID, _data);
      }, 50);
    } else {
      InstanceNull = false;
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().ReceiveEvent(_eventCode, _senderName, _senderID, _data);
    }
  },

  DisconnectData() {
    GameFinished = true;
    // MultiplayerController.Instance.JoinedRoom=false;
    // MultiplayerController.Instance.ResetState();
    // MultiplayerController.Instance.DisconnectPhoton();
  },

  RestartGame(_timer = 0) {
    IsGameStarted = false;
    MultiplayerController.Instance.JoinedRoom = false;
    MultiplayerController.Instance.ResetState();
    MultiplayerController.Instance.DisconnectPhoton();

    for (let index = 0; index < Timeouts.length; index++) {
      clearTimeout(Timeouts[index]);
    }

    setTimeout(() => {
      if (GamePlayReferenceManager.Instance.Get_GameManager()) {
        GamePlayReferenceManager.Instance.Get_GameManager().ClearDisplayTimeout();
      }

      if (GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager()) {
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
      }

      if (GamePlayReferenceManager.Instance.Get_ServerBackend()) {
        GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
      }

      GamePlayReferenceManager.Instance.RemovePersistNode();
      MultiplayerController.Instance.RemovePersistNode();
      cc.director.loadScene("MainMenu");
    }, _timer);
    // GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode()
  },

  CheckMasterClient(_id) {
    var _isMaster = false;
    if (PhotonRef.myRoomMasterActorNr() == _id && PhotonRef.myActor().actorNr == _id) {
      _isMaster = true;
      IsMasterClient = true;
    }

    //console.error(_isMaster);
    return _isMaster;
  },

  CheckCurrentActiveMasterClient() {
    var _isMaster = false;
    if (PhotonRef.myActor().actorNr == PhotonRef.myRoomMasterActorNr()) {
      _isMaster = true;
      IsMasterClient = true;
    } else {
      IsMasterClient = false;
    }

    //console.error(_isMaster);
    return _isMaster;
  },

  ResetRoomValues() {
    clearTimeout(Schedular);

    setTimeout(() => {
      IsMasterClient = false;
      TimerStarted = false;
    }, 1000);
  },

  GetRealActors() {
    var _realPlayer = 0;
    var AllPlayers = PhotonRef.myRoomActorsArray();
    for (let index = 0; index < AllPlayers.length; index++) {
      if (AllPlayers[index].getCustomProperty("RoomEssentials")["IsSpectate"] == false) {
        _realPlayer++;
      }
    }
    return _realPlayer;
  },

  RoomCounter(_timer) {
    clearTimeout(Schedular);
    var _data = null;
    Schedular = setTimeout(() => {
      if (IsMasterClient) {
        if (_timer > 0) {
          _timer--;
          this.RoomCounter(_timer);
        } else {
          console.error("timer completed");
          if (this.GetRealActors() > 1) {
            //if has more than one player start real game
            this.SendRoomCompletedData();
          } else {
            clearTimeout(Schedular);
            GamePlayReferenceManager.Instance.Get_UIManager().ShowToast("No online player was found, please try again later");
            GamePlayReferenceManager.Instance.Get_UIManager().ExitConnecting();

            // MultiplayerController.Instance.ResetRoomValues();
            // MultiplayerController.Instance.DisconnectPhoton();

            // MultiplayerController.Instance.ToggleModeSelection(1);
            // MultiplayerController.Instance.ToggleShowRoom_Bool(false);

            // MultiplayerController.Instance.MaxPlayers = 2;
            // cc.systemEvent.emit("UpdateStatusWindow", "players found");
            // cc.systemEvent.emit("UpdateStatusWindow", "starting game...");

            // setTimeout(() => {
            //   GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinedRoom = true;
            //   cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay"); //function in ui manager
            // }, 1000);
          }
        }
      } else {
        clearTimeout(Schedular);
      }
    }, 1000);
  },

  ProcessCounter() {
    var _master = MultiplayerController.Instance.CheckCurrentActiveMasterClient();
    if (_master) {
      if (!TimerStarted) {
        TimerStarted = true;
        var _counter = PhotonRef.myActor().getCustomProperty("RoomCounter")["Counter"];
        MultiplayerController.Instance.RoomCounter(_counter);
      }
    }
  },

  /**
    @summary Send room completed data
    @method SendRoomCompletedData
    @param {Object} _data
    @returns no return
   **/
  SendRoomCompletedData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending RoomCompletedData");
      //  console.log(_data);
      try {
        PhotonRef.raiseEvent(
          14,
          {
            Data: _data,
            senderName: PhotonRef.myActor().name,
            senderID: PhotonRef.myActor().actorNr,
          },
          { receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All }
        );
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },

  RoomCompleted() {
    if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == false) {
      var _realPlayer = this.GetRealActors();
      IsGameStarted = true;
      MultiplayerController.Instance.MaxPlayers = _realPlayer;
      console.log("all required players joined, starting the game..");
      cc.systemEvent.emit("UpdateStatusWindow", "players found");
      cc.systemEvent.emit("UpdateStatusWindow", "starting game...");
      MultiplayerController.Instance.JoinedRoom = true;
      Timeouts.push(
        setTimeout(() => {
          cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay");
        }, 1000)
      ); //function in ui manager
      MultiplayerController.Instance.UpdateRoomCustomProperites(true, _realPlayer, false, false, false, null, false, 0);
    }
  },

  UpdateActorActiveData(_actor) {
    var _actorsArray = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();
    var _data = null;
    for (let index = 0; index < _actorsArray.length; index++) {
      _data = _actorsArray[index].customProperties.PlayerSessionData;
      if (_data.PlayerUID == _actor.customProperties.Data.userID) {
        _data.IsActive = false;
        _actorsArray[index].setCustomProperty("PlayerSessionData", _data);
      }
    }

    console.log("updating active status of the player who has left........................");
    console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray());
  },

  HandlePlayerLeave(actor = null, PhotonReferece = null, _manager = null, _playerTurn = 0, _initialSetupDone = false, _isSpectate = false) {
    if (_initialSetupDone) {
      for (let index = 0; index < _manager.PlayerGameInfo.length; index++) {
        if (_manager.PlayerGameInfo[index].PlayerUID == actor.customProperties.Data.userID) {
          _manager.PlayerGameInfo[index].IsActive = false;
          MultiplayerController.Instance.UpdateActorActiveData(actor);
          if (!_isSpectate) {
            console.log("player left: " + _manager.PlayerGameInfo[index].PlayerUID);
            _manager.RemoveFromCheckArray(_manager.PlayerGameInfo[index].PlayerUID.toString());
            _manager.CheckTurnComplete();
            if (_playerTurn == index && PhotonReferece.myActor().actorNr == PhotonReferece.myRoomMasterActorNr()) {
              _manager.ChangeTurnForcefully();
              console.log("change turn forcefully");
              _manager.SetPlayerLeft(true);
            }

            _manager.ResetSomeValues();
          }

          break;
        }
      }
    } else {
      // _uIManager.ShowToast("player " + actor.name + " has left", 1000);
      var _playerfound = false;
      for (let index = 0; index < _manager.PlayerGameInfo.length; index++) {
        if (_manager.PlayerGameInfo[index].PlayerUID == actor.customProperties.Data.userID) {
          _manager.PlayerGameInfo[index].IsActive = false;
          _manager.PlayerGameInfo.splice(index, 1);
          MultiplayerController.Instance.MaxPlayers--;
          _playerfound = true;
          MultiplayerController.Instance.UpdateActorActiveData(actor);
          break;
        }
      }

      if (!_playerfound) {
        MultiplayerController.Instance.MaxPlayers--;
        if (!_isSpectate) {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().SyncData(null, actor.customProperties.Data.userID, true);
        }
      }

      console.log(_manager.PlayerGameInfo);
      console.log(MultiplayerController.Instance.MaxPlayers);
    }
  },
  //called every frame
  update(dt) {
    /**
            @summary function called by photon whenever there is some change in connection state
            @method onStateChange
            @param {object} state
            @returns no return
        **/
    PhotonRef.onStateChange = function (state) {
      //#region Connection States
      //state 1 : connectingToNameServer
      //State 2 : ConnectedToNameServer
      //State 3 : ConnectingToMasterServer
      //State 4 : ConnectedToMasterServer
      //State 5:  JoinedLobby
      //State 6 : ConnectingToGameserver
      //State 7 : ConnectedToGameserver
      //State 8 : Joined
      //State 10: Disconnected
      //#endregion

      var LBC = Photon.LoadBalancing.LoadBalancingClient;
      console.log("StateCode: " + state + " " + LBC.StateToName(state));

      if (state == 1) cc.systemEvent.emit("UpdateStatusWindow", "connecting to server...");
      else if (state == 4) cc.systemEvent.emit("UpdateStatusWindow", "connected to server");
      else if (state == 5) {
        //has joined lobby
        if (ShowRoom == false) {
          cc.systemEvent.emit("UpdateStatusWindow", "waiting for other players...");
          MultiplayerController.Instance.JoinRandomRoom();
        } else if (ShowRoom == true) {
          cc.systemEvent.emit("UpdateStatusWindow", "showing rooms list...");
          setTimeout(() => {
            GamePlayReferenceManager.Instance.Get_UIManager().ToggleProfileScreen_SpectateUI(false);
            GamePlayReferenceManager.Instance.Get_UIManager().ToggleRoomScreen_SpectateUI(true);
          }, 1000);
        }
      }
    };

    /**
            @summary function called by photon whenever its logger receives debug
            @method debug
            @param {object} mess
            @returns no return
        **/
    PhotonRef.logger.debug = function (mess) {
      console.log(mess);
    };

    /**
            @summary function called by photon whenever its logger receives info
            @method info
            @param {object} mess
            @param {object} param
            @returns no return
        **/
    PhotonRef.logger.info = function (mess, param) {
      console.log(mess + param);
      stateText += mess + " " + param + "\n";
    };

    /**
            @summary function called by photon whenever its logger receives warn
            @method warn
            @param {object} mess
            @param {object} param1
            @param {object} param2
            @param {object} param3
            @returns no return
        **/
    PhotonRef.logger.warn = function (mess, param1, param2, param3) {
      console.log(mess + " " + param1 + " " + param2 + " " + param3);

      if (param1 == 225) {
        //no room found
        console.log("no random room was found, creating one");
        MultiplayerController.Instance.CreateRoom();
      }

      if (param1 == 226) {
        //room does not exists or is full
        GamePlayReferenceManager.Instance.Get_UIManager().ToggleLoadingNode(false);
        GamePlayReferenceManager.Instance.Get_UIManager().ShowToast("Room is full, please select any other room to spectate.");
      }
    };

    /**
            @summary function called by photon whenever its logger receives error
            @method error
            @param {object} mess
            @param {object} param
            @returns no return
        **/
    PhotonRef.logger.error = function (mess, param) {
      console.log(mess);
    };

    /**
            @summary function called by photon whenever its logger receives exception
            @method exception
            @param {object} mess
            @returns no return
        **/
    PhotonRef.logger.exception = function (mess) {
      console.log(mess);
    };

    /**
            @summary function called by photon whenever its logger receives some format
            @method format
            @param {object} mess
            @returns no return
        **/
    PhotonRef.logger.format = function (mess) {
      console.log(mess);
    };

    /**
            @summary function called by photon whenever player joins lobby
            @method onRoomList
            @param {object} rooms
            @returns no return
        **/
    PhotonRef.onRoomList = function (rooms) {
      stateText += "\n" + "Rooms List:" + "\n";

      if (rooms.length == 0) {
        stateText += "No rooms in lobby." + "\n";
      } else {
        GamePlayReferenceManager.Instance.Get_UIManager().ResetRoomList();

        for (var i = 0; i < rooms.length; ++i) {
          GamePlayReferenceManager.Instance.Get_UIManager().UpdateRoomsList_SpectateUI(rooms[i].name, rooms[i].playerCount);
          console.log("Room name: " + rooms[i].name);
          stateText += "Room: " + rooms[i].name + "\n";
        }
      }
    };

    /**
            @summary function called by photon whenever there is change in rooms list (room added,updated,removed etc)
            @method onRoomListUpdate
            @param {object} rooms
            @param {object} roomsUpdated
            @param {object} roomsAdded
            @param {object} roomsRemoved
            @returns no return
        **/
    PhotonRef.onRoomListUpdate = function (rooms, roomsUpdated, roomsAdded, roomsRemoved) {
      GamePlayReferenceManager.Instance.Get_UIManager().ResetRoomList();

      for (var i = 0; i < rooms.length; ++i) {
        GamePlayReferenceManager.Instance.Get_UIManager().UpdateRoomsList_SpectateUI(rooms[i].name, rooms[i].playerCount);
        console.log("Room name: " + rooms[i].name);
        stateText += "Room: " + rooms[i].name + "\n";
      }
      console.log("Rooms List updated: " + roomsUpdated.length + " updated, " + roomsAdded.length + " added, " + roomsRemoved.length + " removed");
    };

    /**
            @summary function called locally by photon when even player joins room
            @method onJoinRoom
            @returns no return
        **/
    PhotonRef.onJoinRoom = function () {
      //#region Logs for game
      console.log("Game " + this.myRoom().name + " joined");
      console.log(PhotonRef.myActor());
      console.log(PhotonRef.myRoom());
      console.log(PhotonRef.myRoomActorsArray());
      console.log(PhotonRef.myRoomActorsArray().length);
      console.log(PhotonRef.myRoomActorsArray()[0].loadBalancingClient.userId);
      console.log(PhotonRef.myRoom()._customProperties);
      console.log(PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"]);
      //#endregion

      if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == true) {
        //check if player who joined is spectate
        MultiplayerController.Instance.JoinedRoom = true;
        setTimeout(() => {
          cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay");
        }, 1000); //function in UIManager
      }

      if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == false) {
        MultiplayerController.Instance.ProcessCounter();
      }
    };

    /**
            @summary function called remotely by photon when even player joins room
            @method onActorJoin
            @param {object} actor
            @returns no return
        **/
    (PhotonRef.onActorJoin = function (actor) {
      var _realPlayer = MultiplayerController.Instance.GetRealActors();

      if (_realPlayer == MaxStudents) {
        //when max player required to start game has been added
        MultiplayerController.Instance.ResetRoomValues();
        console.log("all required players joined, starting the game..");
        cc.systemEvent.emit("UpdateStatusWindow", "players found");
        cc.systemEvent.emit("UpdateStatusWindow", "starting game...");
        MultiplayerController.Instance.JoinedRoom = true;
        setTimeout(() => {
          cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay");
        }, 1000); //function in ui manager
        MultiplayerController.Instance.UpdateRoomCustomProperites(true, PhotonRef.myRoomActorCount(), false, false, false, null, false, 0);
        //PhotonRef.myRoom().setCustomProperty("Player",PhotonRef.myRoomActorCount(),true);
      }

      // MultiplayerController.Instance.CheckCurrentActiveMasterClient(actor.actorNr);
      // console.log("actor " + actor.actorNr + " joined");
      // console.error("Total Players: "+PhotonRef.myRoomActorCount());
      // console.log(PhotonRef.myRoom());
    }),
      /**
            @summary function called remotely by photon when even player leaves a room
            @method onActorLeave
            @param {object} actor
            @returns no return
        **/
      (PhotonRef.onActorLeave = function (actor) {
        if (!GameFinished && !RestartSpectate) {
          if (MultiplayerController.Instance.JoinedRoom == true) {
            if (!actor.customProperties.PlayerSessionData.GameOver) {
              if (!MultiplayerController.Instance.LeaveRoom) {
                if (actor.customProperties.RoomEssentials.IsSpectate) {
                  console.log("spectator left, so dont mind, cont game");
                  console.log("actor " + actor.actorNr + " left");
                  GamePlayReferenceManager.Instance.Get_GameManager().CheckTurnOnSpectateLeave_SpectateManager();
                } else {
                  var PhotonReferece = MultiplayerController.Instance.getPhotonRef();
                  var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

                  if (_manager) {
                    var _playerTurn = _manager.GetTurnNumber();
                  }

                  var _uIGameManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

                  var _realPlayer = MultiplayerController.Instance.GetRealActors();
                  var _initialSetupDone = PhotonReferece.myRoom().getCustomProperty("InitialSetup");

                  if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == false) {
                    console.log("actor " + actor.actorNr + " left");
                    if (_realPlayer > 1) {
                      MultiplayerController.Instance.HandlePlayerLeave(actor, PhotonReferece, _manager, _playerTurn, _initialSetupDone, false);
                      if (_uIGameManager) {
                        _uIGameManager.ShowToast("player " + actor.name + " has left", 1150, false);
                      }
                    } else {
                      if (_initialSetupDone) {
                        for (let index = 0; index < _manager.PlayerGameInfo.length; index++) {
                          if (_manager.PlayerGameInfo[index].PlayerUID == actor.customProperties.Data.userID) {
                            _manager.PlayerGameInfo[index].IsActive = false;
                            MultiplayerController.Instance.UpdateActorActiveData(actor);
                            break;
                          }
                        }
                        _manager.GameOver(true);
                      } else {
                        if (_uIGameManager) MultiplayerController.Instance.RestartGame(1200);
                        else MultiplayerController.Instance.RestartGame(0);
                      }

                      if (_uIGameManager) {
                        _uIGameManager.ShowToast("player " + actor.name + " has left", 1150, false);
                      }
                    }

                    // MultiplayerController.Instance.JoinedRoom = false;
                    // MultiplayerController.Instance.ResetState();
                    // MultiplayerController.Instance.DisconnectPhoton();

                    // if (MultiplayerController.Instance != null) {
                    //     if (MultiplayerController.Instance.getSceneName() == "GamePlay") //if scene is gameplay let player finish game forcefully
                    //     {
                    //         GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("other player " + actor.name + " has left", 2000);
                    //         setTimeout(() => {
                    //             GamePlayReferenceManager.Instance.Get_GameManager().ClearDisplayTimeout();
                    //             GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();
                    //             GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
                    //             GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
                    //             GamePlayReferenceManager.Instance.RemovePersistNode();
                    //             cc.director.loadScene("MainMenu");
                    //         }, 2100);
                    //     }
                    // }
                  } else {
                    _uIGameManager.ShowToast("player " + actor.name + " has left", 1150, false);

                    if (_realPlayer > 1) {
                      MultiplayerController.Instance.HandlePlayerLeave(actor, PhotonReferece, _manager, _playerTurn, _initialSetupDone, true);
                    } else {
                      if (_initialSetupDone) {
                        _manager.GameOver(true);
                      }
                    }
                  }
                }
              }
            }
          }

          if (MultiplayerController.Instance.JoinedRoom == true && !IsGameStarted) {
            if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == false) {
              MultiplayerController.Instance.ProcessCounter();
            }

            if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == true) {
              if (PhotonRef.myRoomActorCount() == 1 && !RestartSpectate) {
                RestartSpectate = true;
                MultiplayerController.Instance.RestartGame(1500);
                console.error("reatrted");
              }
            }
          }
        }
      });

    /**
            @summary function called by photon when even player own properties got changed
            @method onActorPropertiesChange
            @param {object} actor
            @returns no return
        **/
    PhotonRef.onActorPropertiesChange = function (actor) {};

    /**
            @summary function called by photon when even player room properties got changed
            @method onMyRoomPropertiesChange
            @param {object} actor
            @returns no return
        **/
    PhotonRef.onMyRoomPropertiesChange = function (_data) {
      // console.log(_data);
    };

    /**
            @summary function called by photon to handle errors
            @method onError
            @param {object} errorCode
             @param {object} errorMsg
            @returns no return
        **/
    PhotonRef.onError = function (errorCode, errorMsg) {
      console.log("Error " + errorCode + ": " + errorMsg);
    };

    /**
            @summary function called by photon whenever an event is received with some data
            @method onEvent
            @param {object} code
            @param {object} content
            @param {object} actorNr
            @returns no return
        **/
    PhotonRef.onEvent = function (code, content, actorNr) {
      MultiplayerController.Instance.CheckReferences();
      switch (code) {
        case 1: //receving playerdata info
          console.log("received player data");
          var PlayerInfoData = content.PlayerInfo;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(1, senderName, senderID, PlayerInfoData);

          break;
        case 2: //start turn raise event
          console.log("received start turn event");
          var _Turn = content.TurnNumber;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(2, senderName, senderID, _Turn);

          break;
        case 3: // dice count
          console.log("received dice count");
          var _dice = content.DiceCount;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(3, senderName, senderID, _dice);

          break;
        case 4: //receing user id of player who has completed turn
          console.log("received player turn completed");
          var _ID = content.UID;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(4, senderName, senderID, _ID);

          break;
        case 5: //receiving card data (index) so other users can sync them
          console.log("received card data");
          var _card = content.CardData;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(5, senderName, senderID, _card);

          break;
        case 6: //receive game over data
          console.log("received game over call");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(6, senderName, senderID, _data);

          break;
        case 7: //receive one Question data
          console.log("received one question data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(7, senderName, senderID, _data);

          break;
        case 8: //receive one Question response data
          console.log("received one questio response data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(8, senderName, senderID, _data);

          break;
        case 9: //receive bankrupt data
          console.log("received bankrupt data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(9, senderName, senderID, _data);

          break;
        case 10: //receive backspace data
          console.log("received backspace data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(10, senderName, senderID, _data);

          break;
        case 11: //receiveing partnership offer
          console.log("received partnership offer data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(11, senderName, senderID, _data);

          break;
        case 12: //receiveing partnership answer data
          console.log("received partnership anwser data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(12, senderName, senderID, _data);

          break;
        case 13: //receiving profit/loss data for partner
          console.log("received partnership anwser data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(13, senderName, senderID, _data);

          break;
        case 14: //receiving room complete data to start Game
          console.log("received partnership anwser data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.RoomCompleted();

          break;
        case 15: //receiving payday info
          console.log("received info");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(15, senderName, senderID, _data);

          break;
        case 16: //receiving game over data to sync
          console.log("received game over sync data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(16, senderName, senderID, _data);

          break;
        case 17: //receiving data of player to get all profit next pay day
          console.log("received data of player to get all profit next pay day");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(17, senderName, senderID, _data);

          break;
        case 18: //receiving one question array
          console.log("received data for one question array");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(18, senderName, senderID, _data);

          break;
        case 19: //receiving decks array
          console.log("received data for decks array");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(19, senderName, senderID, _data);

          break;
        case 20: //receiving decks array Counter
          console.log("received data for decks array counter");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;

          MultiplayerController.Instance.CallRecieveEvent(20, senderName, senderID, _data);

          break;
        default:
      }
    };
  },
});

module.exports = MultiplayerController;
