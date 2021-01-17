
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/MultiplayerController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5cea0jqhyxPXpiAtmjtC7+U', 'MultiplayerController');
// Script/MultiplayerController.js

"use strict";

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
var RestartSpectate = false; //---------------------------------------class data related to RoomProperty------------------------------------------------//

var RoomProperty = cc.Class({
  name: "RoomProperty",
  properties: {
    Player: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    },
    InitialSetup: {
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    PlayerGameInfo: {
      "default": "",
      type: cc.Text,
      serializable: true
    },
    TurnNumber: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    }
  }
}); //---------------------------------------class data related to App_Info------------------------------------------------//

var App_Info = cc.Class({
  name: "App_Info",
  properties: {
    AppID: {
      "default": "",
      type: cc.Text,
      serializable: true,
      tooltip: "App id form photon dashboard"
    },
    AppVersion: {
      "default": "",
      type: cc.Text,
      serializable: true,
      tooltip: "App version for photon"
    },
    Wss: {
      displayName: "IsSecure",
      "default": false,
      type: cc.Boolean,
      serializable: true,
      tooltip: "If photon should use secure and reliable protocols"
    },
    MasterServer: {
      "default": "",
      type: cc.Text,
      serializable: true,
      tooltip: "master server for photon to connect"
    },
    FbAppID: {
      "default": "",
      type: cc.Text,
      serializable: true,
      tooltip: "FB app id used for FB autherization"
    }
  }
}); //---------------------------------------class data related to MultiplayerController----------------------------------//

var MultiplayerController = cc.Class({
  name: "MultiplayerController",
  "extends": cc.Component,
  properties: {
    PhotonAppInfo: {
      "default": null,
      type: App_Info,
      serializable: true
    },
    MaxPlayers: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    },
    MaxSpectators: {
      "default": 0,
      type: cc.Integer,
      serializable: true
    },
    ModeSelection: {
      // 1 means bot , 2 means real players
      "default": 0,
      type: cc.Integer,
      serializable: true
    }
  },
  statics: {
    //creating static instance of the class
    Instance: null
  },
  ResetAllData: function ResetAllData() {
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
  onLoad: function onLoad() {
    this.ResetAllData();
    this.Init_MultiplayerController();
  },
  ToggleModeSelection: function ToggleModeSelection(_val) // 1 means bot , 2 means real players
  {
    this.ModeSelection = _val;
  },
  GetSelectedMode: function GetSelectedMode() {
    return this.ModeSelection;
  },

  /**
  @summary Initialize some essentails data for multiplayer controller class
  @method Init_MultiplayerController
  @param none
  @returns no return
  **/
  Init_MultiplayerController: function Init_MultiplayerController() {
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
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },

  /**
  @summary remove persist node when want to restart scene
  @method RemovePersistNode
  @param none
  @returns no return
  **/
  RemovePersistNode: function RemovePersistNode() {
    MultiplayerController.Instance = null;
    cc.game.removePersistRootNode(this.node);
  },

  /**
  @summary function to get name of current opened scene
  @method getSceneName
  @param none
  @returns {string} sceneName
  **/
  getSceneName: function getSceneName() {
    var sceneName;
    var _sceneInfos = cc.game._sceneInfos;

    for (var i = 0; i < _sceneInfos.length; i++) {
      if (_sceneInfos[i].uuid == cc.director._scene._id) {
        sceneName = _sceneInfos[i].url;
        sceneName = sceneName.substring(sceneName.lastIndexOf('/') + 1).match(/[^\.]+/)[0];
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
  ToggleShowRoom_Bool: function ToggleShowRoom_Bool(_state) {
    ShowRoom = _state;
  },

  /**
  @summary function to set "LeaveRoom" bool value
  @method ToggleLeaveRoom_Bool
  @param {boolean} _state
  @returns no return
  **/
  ToggleLeaveRoom_Bool: function ToggleLeaveRoom_Bool(_state) {
    this.LeaveRoom = _state;
  },

  /**
  @summary returns Photon "PhotonRef" instance created by multiplayer class
  @method getPhotonRef
  @param none
  @returns {object} PhotonRef
  **/
  getPhotonRef: function getPhotonRef() {
    return PhotonRef;
  },

  /**
  @summary returns myActor instance created by photon
  @method PhotonActor
  @param none
  @returns {object} Actor
  **/
  PhotonActor: function PhotonActor() {
    return PhotonRef.myActor();
  },

  /**
  @summary returns myRoomActorsArray created by photon
  @method RoomActors
  @param none
  @returns {object} Actor
  **/
  RoomActors: function RoomActors() {
    return PhotonRef.myRoomActorsArray();
  },

  /**
  @summary returns isSpectate variable from custom property of current actor
  @method CheckSpectate
  @param none
  @returns {boolean} isSpectate
  **/
  CheckSpectate: function CheckSpectate() {
    return PhotonRef.myActor().customProperties.RoomEssentials.IsSpectate;
  },

  /**
  @summary Initialize photon with appid,app version, Wss etc
  @method InitializePhoton
  @param none
  @returns no return
  **/
  InitializePhoton: function InitializePhoton() {
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
  RequestConnection: function RequestConnection() {
    if (PhotonRef.state == 5 || PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true) console.log("already connected");else PhotonRef.start();
  },

  /**
  @summary Disconnect from photon
  @method DisconnectPhoton
  @param none
  @returns no return
  **/
  DisconnectPhoton: function DisconnectPhoton() {
    if (PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.isJoinedToRoom() == true) {
      PhotonRef.disconnect();
      this.JoinedRoom = false; //PhotonRef.leaveRoom();

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
  ResetState: function ResetState() {
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
  OnRoomNameChange: function OnRoomNameChange(name) {
    this.RoomName = name;
  },

  /**
  @summary called when message window got input from game
  @method OnMessageChange
  @param {string} msg
  @returns no return
  **/
  OnMessageChange: function OnMessageChange(msg) {
    this.Message = msg;
  },

  /**
  @summary update custom room properties
  @method UpdateRoomCustomProperites
  @returns no return
  **/
  UpdateRoomCustomProperites: function UpdateRoomCustomProperites(_playerUpdate, _playerValue, _initialSetupUpdate, _initialSetupValue, _playerGameInfoUpdate, _playerGameInfoValue, _turnNumberUpdate, _turnNumbervalue) {
    if (_playerUpdate === void 0) {
      _playerUpdate = false;
    }

    if (_playerValue === void 0) {
      _playerValue = 0;
    }

    if (_initialSetupUpdate === void 0) {
      _initialSetupUpdate = false;
    }

    if (_initialSetupValue === void 0) {
      _initialSetupValue = false;
    }

    if (_playerGameInfoUpdate === void 0) {
      _playerGameInfoUpdate = false;
    }

    if (_playerGameInfoValue === void 0) {
      _playerGameInfoValue = null;
    }

    if (_turnNumberUpdate === void 0) {
      _turnNumberUpdate = false;
    }

    if (_turnNumbervalue === void 0) {
      _turnNumbervalue = 0;
    }

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
  CreateRoom: function CreateRoom() {
    if (PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.state == 8) {
      if (PhotonRef.isJoinedToRoom() == false) {
        var _data = new RoomProperty();

        _data.Player = 0;
        var roomOptions = {
          "isVisible": true,
          "isOpen": true,
          "maxPlayers": this.MaxPlayers + this.MaxSpectators,
          "customGameProperties": _data
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(false);
        PhotonRef.myActor().name = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name;
        PhotonRef.myActor().setCustomProperty("Data", GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);
        PhotonRef.myActor().setCustomProperty("PlayerSessionData", {});
        PhotonRef.myActor().setCustomProperty("RoomEssentials", {
          IsSpectate: false
        });
        PhotonRef.myActor().setCustomProperty("RoomCounter", {
          Counter: TotalTimer
        });
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
  JoinRoom: function JoinRoom(_roomName) {
    if (PhotonRef.state == 5 || PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.state == 8) {
      if (PhotonRef.isJoinedToRoom() == false || PhotonRef.state != 8) {
        var roomOptions = {
          "isVisible": true,
          "isOpen": false,
          "maxPlayers": this.MaxPlayers + this.MaxSpectators //"customGameProperties":{"RoomEssentials": {IsSpectate:true}}

        };
        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(false);
        PhotonRef.myActor().name = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name;
        PhotonRef.myActor().setCustomProperty("Data", GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);
        PhotonRef.myActor().setCustomProperty("PlayerSessionData", {});
        PhotonRef.myActor().setCustomProperty("RoomEssentials", {
          IsSpectate: true
        });
        PhotonRef.myActor().setCustomProperty("RoomCounter", {
          Counter: TotalTimer
        });
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
  JoinRandomRoom: function JoinRandomRoom() {
    if (PhotonRef.state == 5 || PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.state == 8) {
      if (PhotonRef.isJoinedToRoom() == false || PhotonRef.state != 8) {
        var _data = new RoomProperty();

        _data.Player = 0;
        var roomOptions = {
          //"expectedMaxPlayers":this.MaxPlayers+MaxSpectators,
          "expectedCustomRoomProperties": _data
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(false);
        PhotonRef.myActor().name = GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name;
        PhotonRef.myActor().setCustomProperty("Data", GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData);
        PhotonRef.myActor().setCustomProperty("PlayerSessionData", {});
        PhotonRef.myActor().setCustomProperty("RoomEssentials", {
          IsSpectate: false
        });
        PhotonRef.myActor().setCustomProperty("RoomCounter", {
          Counter: TotalTimer
        });
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
  SendCardData: function SendCardData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending card data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(5, {
          CardData: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
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
  SendGameOver: function SendGameOver(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending game over call");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(6, {
          Data: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
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
  SendBankruptData: function SendBankruptData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending bankrupcy data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(9, {
          Data: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others
        });
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
  SendData: function SendData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending player data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(1, {
          PlayerInfo: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
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
  SendOneQuestionData: function SendOneQuestionData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending one question data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(7, {
          Data: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
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
  SendPartnerProfitLoss: function SendPartnerProfitLoss(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending one question data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(13, {
          Data: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others
        });
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
  SendOneQuestionResponseData: function SendOneQuestionResponseData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending one question response data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(8, {
          Data: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others
        });
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
  DiceRollEvent: function DiceRollEvent(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending dice count");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(3, {
          DiceCount: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
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
  SendGoBackSpaceData: function SendGoBackSpaceData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("send go back spaces data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(10, {
          Data: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others
        });
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
  SendPartnerShipOfferData: function SendPartnerShipOfferData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending partner ship offer");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(11, {
          Data: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others
        });
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
  SendPartnerShipAnswerData: function SendPartnerShipAnswerData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending partenrship answer data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(12, {
          Data: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others
        });
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
  SyncTurnCompletion: function SyncTurnCompletion(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending turn completion data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(4, {
          UID: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
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
  StartTurn: function StartTurn(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("Starting Turn");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(2, {
          TurnNumber: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
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
  ShowToast: function ShowToast(msg) {
    console.log("toast message: " + msg);
  },

  /**
  @summary Receive event from photon raise on 
  @method CallRecieveEvent
  @returns no return
  **/
  CallRecieveEvent: function CallRecieveEvent(_eventCode, _senderName, _senderID, _data) {
    var _this = this;

    var InstanceNull = true; //to check if instance is null in case class instance is not loaded and its receives callback

    if (GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager() == null) {
      InstanceNull = true;
      setTimeout(function () {
        _this.CallRecieveEvent(_eventCode, _senderName, _senderID, _data);
      }, 50);
    } else {
      InstanceNull = false;
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().ReceiveEvent(_eventCode, _senderName, _senderID, _data);
    }
  },
  DisconnectData: function DisconnectData() {
    GameFinished = true; // MultiplayerController.Instance.JoinedRoom=false;
    // MultiplayerController.Instance.ResetState();
    // MultiplayerController.Instance.DisconnectPhoton();
  },
  RestartGame: function RestartGame(_timer) {
    if (_timer === void 0) {
      _timer = 0;
    }

    MultiplayerController.Instance.JoinedRoom = false;
    MultiplayerController.Instance.ResetState();
    MultiplayerController.Instance.DisconnectPhoton();
    setTimeout(function () {
      GamePlayReferenceManager.Instance.Get_GameManager().ClearDisplayTimeout();
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
      GamePlayReferenceManager.Instance.RemovePersistNode();
      MultiplayerController.Instance.RemovePersistNode();
      cc.director.loadScene("MainMenu");
    }, _timer); // GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode()
  },
  CheckMasterClient: function CheckMasterClient(_id) {
    var _isMaster = false;

    if (PhotonRef.myRoomMasterActorNr() == _id && PhotonRef.myActor().actorNr == _id) {
      _isMaster = true;
      IsMasterClient = true;
    } //console.error(_isMaster);


    return _isMaster;
  },
  CheckCurrentActiveMasterClient: function CheckCurrentActiveMasterClient() {
    var _isMaster = false;

    if (PhotonRef.myActor().actorNr == PhotonRef.myRoomMasterActorNr()) {
      _isMaster = true;
      IsMasterClient = true;
    } else {
      IsMasterClient = false;
    }

    console.error(_isMaster);
    return _isMaster;
  },
  ResetRoomValues: function ResetRoomValues() {
    clearTimeout(Schedular);
    setTimeout(function () {
      IsMasterClient = false;
      TimerStarted = false;
    }, 1000);
  },
  GetRealActors: function GetRealActors() {
    var _realPlayer = 0;
    var AllPlayers = PhotonRef.myRoomActorsArray();

    for (var index = 0; index < AllPlayers.length; index++) {
      if (AllPlayers[index].getCustomProperty("RoomEssentials")["IsSpectate"] == false) {
        _realPlayer++;
      }
    }

    return _realPlayer;
  },
  RoomCounter: function RoomCounter(_timer) {
    var _this2 = this;

    clearTimeout(Schedular);
    var _data = null;
    Schedular = setTimeout(function () {
      if (IsMasterClient) {
        if (_timer > 0) {
          _timer--; //_data = { Counter: _timer };
          //PhotonRef.myRoom().setCustomProperty("RoomCounter", _data, true);
          // console.error(_timer);

          _this2.RoomCounter(_timer);
        } else {
          console.error("timer completed");

          if (_this2.GetRealActors() > 1) {
            //if has more than one player start real game
            _this2.SendRoomCompletedData();
          } else //start game with bot
            {
              MultiplayerController.Instance.ResetRoomValues();
              MultiplayerController.Instance.DisconnectPhoton();
              MultiplayerController.Instance.ToggleModeSelection(1);
              MultiplayerController.Instance.ToggleShowRoom_Bool(false);
              MultiplayerController.Instance.MaxPlayers = 2;
              cc.systemEvent.emit("UpdateStatusWindow", "players found");
              cc.systemEvent.emit("UpdateStatusWindow", "starting game...");
              setTimeout(function () {
                GamePlayReferenceManager.Instance.Get_MultiplayerController().JoinedRoom = true;
                cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay"); //function in ui manager
              }, 1000);
            }
        }
      } else {
        clearTimeout(Schedular);
      }
    }, 1000);
  },
  ProcessCounter: function ProcessCounter() {
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
  @summary Send card index over network
  @method SendRoomCompletedData
  @param {Object} _data
  @returns no return
  **/
  SendRoomCompletedData: function SendRoomCompletedData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending RoomCompletedData"); //  console.log(_data);

      try {
        PhotonRef.raiseEvent(14, {
          Data: _data,
          senderName: PhotonRef.myActor().name,
          senderID: PhotonRef.myActor().actorNr
        }, {
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.All
        });
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },
  RoomCompleted: function RoomCompleted() {
    if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == false) {
      var _realPlayer = this.GetRealActors();

      MultiplayerController.Instance.MaxPlayers = _realPlayer;
      console.log("all required players joined, starting the game..");
      cc.systemEvent.emit("UpdateStatusWindow", "players found");
      cc.systemEvent.emit("UpdateStatusWindow", "starting game...");
      MultiplayerController.Instance.JoinedRoom = true;
      setTimeout(function () {
        cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay");
      }, 1000); //function in ui manager

      MultiplayerController.Instance.UpdateRoomCustomProperites(true, _realPlayer, false, false, false, null, false, 0);
    }
  },
  //called every frame
  update: function update(dt) {
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
      if (state == 1) cc.systemEvent.emit("UpdateStatusWindow", "connecting to server...");else if (state == 4) cc.systemEvent.emit("UpdateStatusWindow", "connected to server");else if (state == 5) //has joined lobby
        {
          if (ShowRoom == false) {
            cc.systemEvent.emit("UpdateStatusWindow", "waiting for other players...");
            MultiplayerController.Instance.JoinRandomRoom();
          } else if (ShowRoom == true) {
            cc.systemEvent.emit("UpdateStatusWindow", "showing rooms list...");
            setTimeout(function () {
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

      if (param1 == 225) //no room found
        {
          console.log("no random room was found, creating one");
          MultiplayerController.Instance.CreateRoom();
        }

      if (param1 == 226) //room does not exists or is full
        {
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
      console.log(PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"]); //#endregion

      if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == true) //check if player who joined is spectate
        {
          MultiplayerController.Instance.JoinedRoom = true;
          setTimeout(function () {
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


    PhotonRef.onActorJoin = function (actor) {
      var _realPlayer = MultiplayerController.Instance.GetRealActors();

      if (_realPlayer == MaxStudents) //when max player required to start game has been added
        {
          MultiplayerController.Instance.ResetRoomValues();
          console.log("all required players joined, starting the game..");
          cc.systemEvent.emit("UpdateStatusWindow", "players found");
          cc.systemEvent.emit("UpdateStatusWindow", "starting game...");
          MultiplayerController.Instance.JoinedRoom = true;
          setTimeout(function () {
            cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay");
          }, 1000); //function in ui manager

          MultiplayerController.Instance.UpdateRoomCustomProperites(true, PhotonRef.myRoomActorCount(), false, false, false, null, false, 0); //PhotonRef.myRoom().setCustomProperty("Player",PhotonRef.myRoomActorCount(),true);  
        } // MultiplayerController.Instance.CheckCurrentActiveMasterClient(actor.actorNr);
      // console.log("actor " + actor.actorNr + " joined");
      // console.error("Total Players: "+PhotonRef.myRoomActorCount());
      // console.log(PhotonRef.myRoom());

    },
    /**
        @summary function called remotely by photon when even player leaves a room
        @method onActorLeave
        @param {object} actor
        @returns no return
    **/
    PhotonRef.onActorLeave = function (actor) {
      if (!GameFinished && !RestartSpectate) {
        if (MultiplayerController.Instance.JoinedRoom == true) {
          if (!actor.customProperties.PlayerSessionData.GameOver) {
            if (!MultiplayerController.Instance.LeaveRoom) {
              if (actor.customProperties.RoomEssentials.IsSpectate) {
                console.log("spectator left, so dont mind, cont game");
                console.log("actor " + actor.actorNr + " left");
                GamePlayReferenceManager.Instance.Get_GameManager().CheckTurnOnSpectateLeave_SpectateManager();
              } else {
                if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == false) {
                  console.log("actor " + actor.actorNr + " left");
                  MultiplayerController.Instance.JoinedRoom = false;
                  MultiplayerController.Instance.ResetState();
                  MultiplayerController.Instance.DisconnectPhoton();

                  if (MultiplayerController.Instance != null) {
                    if (MultiplayerController.Instance.getSceneName() == "GamePlay") //if scene is gameplay let player finish game forcefully
                      {
                        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("other player " + actor.name + " has left", 2000);
                        setTimeout(function () {
                          GamePlayReferenceManager.Instance.Get_GameManager().ClearDisplayTimeout();
                          GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();
                          GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
                          GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
                          GamePlayReferenceManager.Instance.RemovePersistNode();
                          cc.director.loadScene("MainMenu");
                        }, 2100);
                      }
                  }
                }
              }
            }
          }
        }

        if (MultiplayerController.Instance.JoinedRoom == true) {
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
    };
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
      console.log(_data);
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
        case 1:
          //receving playerdata info
          console.log("received player data");
          var PlayerInfoData = content.PlayerInfo;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(1, senderName, senderID, PlayerInfoData);
          break;

        case 2:
          //start turn raise event
          console.log("received start turn event");
          var _Turn = content.TurnNumber;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(2, senderName, senderID, _Turn);
          break;

        case 3:
          // dice count
          console.log("received dice count");
          var _dice = content.DiceCount;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(3, senderName, senderID, _dice);
          break;

        case 4:
          //receing user id of player who has completed turn
          console.log("received player turn completed");
          var _ID = content.UID;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(4, senderName, senderID, _ID);
          break;

        case 5:
          //receiving card data (index) so other users can sync them
          console.log("received card data");
          var _card = content.CardData;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(5, senderName, senderID, _card);
          break;

        case 6:
          //receive game over data
          console.log("received game over call");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(6, senderName, senderID, _data);
          break;

        case 7:
          //receive one Question data
          console.log("received one question data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(7, senderName, senderID, _data);
          break;

        case 8:
          //receive one Question response data
          console.log("received one questio response data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(8, senderName, senderID, _data);
          break;

        case 9:
          //receive bankrupt data
          console.log("received bankrupt data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(9, senderName, senderID, _data);
          break;

        case 10:
          //receive backspace data
          console.log("received backspace data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(10, senderName, senderID, _data);
          break;

        case 11:
          //receiveing partnership offer
          console.log("received partnership offer data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(11, senderName, senderID, _data);
          break;

        case 12:
          //receiveing partnership answer data
          console.log("received partnership anwser data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(12, senderName, senderID, _data);
          break;

        case 13:
          //receiving profit/loss data for partner
          console.log("received partnership anwser data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(13, senderName, senderID, _data);
          break;

        case 14:
          //receiving room complete data to start Game
          console.log("received partnership anwser data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.RoomCompleted();
          break;

        default:
      }
    };
  }
});
module.exports = MultiplayerController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJHYW1lRmluaXNoZWQiLCJJc01hc3RlckNsaWVudCIsIlRvdGFsVGltZXIiLCJUaW1lclN0YXJ0ZWQiLCJTY2hlZHVsYXIiLCJNYXhTdHVkZW50cyIsIlJlc3RhcnRTcGVjdGF0ZSIsIlJvb21Qcm9wZXJ0eSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllciIsInR5cGUiLCJJbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiSW5pdGlhbFNldHVwIiwiQm9vbGVhbiIsIlBsYXllckdhbWVJbmZvIiwiVGV4dCIsIlR1cm5OdW1iZXIiLCJBcHBfSW5mbyIsIkFwcElEIiwidG9vbHRpcCIsIkFwcFZlcnNpb24iLCJXc3MiLCJkaXNwbGF5TmFtZSIsIk1hc3RlclNlcnZlciIsIkZiQXBwSUQiLCJNdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDb21wb25lbnQiLCJQaG90b25BcHBJbmZvIiwiTWF4UGxheWVycyIsIk1heFNwZWN0YXRvcnMiLCJNb2RlU2VsZWN0aW9uIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwiUmVzZXRSb29tVmFsdWVzIiwib25Mb2FkIiwiSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJUb2dnbGVNb2RlU2VsZWN0aW9uIiwiX3ZhbCIsIkdldFNlbGVjdGVkTW9kZSIsImdhbWUiLCJhZGRQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwiSW5pdGlhbGl6ZVBob3RvbiIsImNvbnNvbGUiLCJsb2ciLCJBcHBJbmZvIiwiRGVtb0xvYWRCYWxhbmNpbmciLCJMZWF2ZVJvb20iLCJSb29tTmFtZSIsIk1lc3NhZ2UiLCJKb2luZWRSb29tIiwiQ2hlY2tSZWZlcmVuY2VzIiwicmVxdWlyZSIsIlJlbW92ZVBlcnNpc3ROb2RlIiwicmVtb3ZlUGVyc2lzdFJvb3ROb2RlIiwiZ2V0U2NlbmVOYW1lIiwic2NlbmVOYW1lIiwiX3NjZW5lSW5mb3MiLCJpIiwibGVuZ3RoIiwidXVpZCIsImRpcmVjdG9yIiwiX3NjZW5lIiwiX2lkIiwidXJsIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJtYXRjaCIsIlRvZ2dsZVNob3dSb29tX0Jvb2wiLCJfc3RhdGUiLCJUb2dnbGVMZWF2ZVJvb21fQm9vbCIsImdldFBob3RvblJlZiIsIlBob3RvbkFjdG9yIiwibXlBY3RvciIsIlJvb21BY3RvcnMiLCJteVJvb21BY3RvcnNBcnJheSIsIkNoZWNrU3BlY3RhdGUiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwiQXBwSWQiLCJGYkFwcElkIiwiUmVxdWVzdENvbm5lY3Rpb24iLCJzdGF0ZSIsImlzQ29ubmVjdGVkVG9NYXN0ZXIiLCJpc0luTG9iYnkiLCJzdGFydCIsIkRpc2Nvbm5lY3RQaG90b24iLCJpc0pvaW5lZFRvUm9vbSIsImRpc2Nvbm5lY3QiLCJSZXNldFN0YXRlIiwiT25Sb29tTmFtZUNoYW5nZSIsIk9uTWVzc2FnZUNoYW5nZSIsIm1zZyIsIlVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzIiwiX3BsYXllclVwZGF0ZSIsIl9wbGF5ZXJWYWx1ZSIsIl9pbml0aWFsU2V0dXBVcGRhdGUiLCJfaW5pdGlhbFNldHVwVmFsdWUiLCJfcGxheWVyR2FtZUluZm9VcGRhdGUiLCJfcGxheWVyR2FtZUluZm9WYWx1ZSIsIl90dXJuTnVtYmVyVXBkYXRlIiwiX3R1cm5OdW1iZXJ2YWx1ZSIsIm15Um9vbSIsInNldEN1c3RvbVByb3BlcnR5IiwiQ3JlYXRlUm9vbSIsIl9kYXRhIiwicm9vbU9wdGlvbnMiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJTdHVkZW50RGF0YSIsIkNvdW50ZXIiLCJzZXRVc2VySWQiLCJ1c2VySUQiLCJSb29tSUQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJEYXRlIiwibm93IiwiY3JlYXRlUm9vbSIsIkpvaW5Sb29tIiwiX3Jvb21OYW1lIiwiam9pblJvb20iLCJKb2luUmFuZG9tUm9vbSIsImpvaW5SYW5kb21Sb29tIiwiU2VuZENhcmREYXRhIiwicmFpc2VFdmVudCIsIkNhcmREYXRhIiwic2VuZGVyTmFtZSIsInNlbmRlcklEIiwiYWN0b3JOciIsInJlY2VpdmVycyIsIlBob3RvbiIsIkxvYWRCYWxhbmNpbmciLCJDb25zdGFudHMiLCJSZWNlaXZlckdyb3VwIiwiQWxsIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwiU2VuZEdhbWVPdmVyIiwiRGF0YSIsIlNlbmRCYW5rcnVwdERhdGEiLCJPdGhlcnMiLCJTZW5kRGF0YSIsIlBsYXllckluZm8iLCJTZW5kT25lUXVlc3Rpb25EYXRhIiwiU2VuZFBhcnRuZXJQcm9maXRMb3NzIiwiU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhIiwiRGljZVJvbGxFdmVudCIsIkRpY2VDb3VudCIsIlNlbmRHb0JhY2tTcGFjZURhdGEiLCJTZW5kUGFydG5lclNoaXBPZmZlckRhdGEiLCJTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhIiwiU3luY1R1cm5Db21wbGV0aW9uIiwiVUlEIiwiU3RhcnRUdXJuIiwiU2hvd1RvYXN0IiwiQ2FsbFJlY2lldmVFdmVudCIsIl9ldmVudENvZGUiLCJfc2VuZGVyTmFtZSIsIl9zZW5kZXJJRCIsIkluc3RhbmNlTnVsbCIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwic2V0VGltZW91dCIsIlJlY2VpdmVFdmVudCIsIkRpc2Nvbm5lY3REYXRhIiwiUmVzdGFydEdhbWUiLCJfdGltZXIiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwibG9hZFNjZW5lIiwiQ2hlY2tNYXN0ZXJDbGllbnQiLCJfaXNNYXN0ZXIiLCJteVJvb21NYXN0ZXJBY3Rvck5yIiwiQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50IiwiY2xlYXJUaW1lb3V0IiwiR2V0UmVhbEFjdG9ycyIsIl9yZWFsUGxheWVyIiwiQWxsUGxheWVycyIsImluZGV4IiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJSb29tQ291bnRlciIsIlNlbmRSb29tQ29tcGxldGVkRGF0YSIsInN5c3RlbUV2ZW50IiwiZW1pdCIsIlByb2Nlc3NDb3VudGVyIiwiX21hc3RlciIsIl9jb3VudGVyIiwiUm9vbUNvbXBsZXRlZCIsInVwZGF0ZSIsImR0Iiwib25TdGF0ZUNoYW5nZSIsIkxCQyIsIkxvYWRCYWxhbmNpbmdDbGllbnQiLCJTdGF0ZVRvTmFtZSIsIkdldF9VSU1hbmFnZXIiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJsb2dnZXIiLCJkZWJ1ZyIsIm1lc3MiLCJpbmZvIiwicGFyYW0iLCJ3YXJuIiwicGFyYW0xIiwicGFyYW0yIiwicGFyYW0zIiwiVG9nZ2xlTG9hZGluZ05vZGUiLCJleGNlcHRpb24iLCJmb3JtYXQiLCJvblJvb21MaXN0Iiwicm9vbXMiLCJSZXNldFJvb21MaXN0IiwiVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkiLCJwbGF5ZXJDb3VudCIsIm9uUm9vbUxpc3RVcGRhdGUiLCJyb29tc1VwZGF0ZWQiLCJyb29tc0FkZGVkIiwicm9vbXNSZW1vdmVkIiwib25Kb2luUm9vbSIsImxvYWRCYWxhbmNpbmdDbGllbnQiLCJ1c2VySWQiLCJfY3VzdG9tUHJvcGVydGllcyIsIm9uQWN0b3JKb2luIiwiYWN0b3IiLCJteVJvb21BY3RvckNvdW50Iiwib25BY3RvckxlYXZlIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJHYW1lT3ZlciIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJvbkFjdG9yUHJvcGVydGllc0NoYW5nZSIsIm9uTXlSb29tUHJvcGVydGllc0NoYW5nZSIsIm9uRXJyb3IiLCJlcnJvckNvZGUiLCJlcnJvck1zZyIsIm9uRXZlbnQiLCJjb2RlIiwiY29udGVudCIsIlBsYXllckluZm9EYXRhIiwiX1R1cm4iLCJfZGljZSIsIl9JRCIsIl9jYXJkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUlBLFNBQUo7QUFDQSxJQUFJQyxTQUFTLEdBQUMsRUFBZDtBQUNBLElBQUlDLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsS0FBckI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsSUFBaEI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxJQUFJQyxlQUFlLEdBQUcsS0FBdEIsRUFDQTs7QUFDQSxJQUFJQyxZQUFZLEdBQUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUMsY0FEaUI7QUFFdEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxDQURMO0FBRUpDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxPQUZMO0FBR0pDLE1BQUFBLFlBQVksRUFBRTtBQUhWLEtBREE7QUFNUkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsS0FEQztBQUVWSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1MsT0FGQztBQUdWRixNQUFBQSxZQUFZLEVBQUU7QUFISixLQU5OO0FBV1JHLElBQUFBLGNBQWMsRUFBRTtBQUNaLGlCQUFTLEVBREc7QUFFWkwsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNXLElBRkc7QUFHWkosTUFBQUEsWUFBWSxFQUFFO0FBSEYsS0FYUjtBQWdCUkssSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsQ0FERDtBQUVSUCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sT0FGRDtBQUdSQyxNQUFBQSxZQUFZLEVBQUU7QUFITjtBQWhCSjtBQUZVLENBQVQsQ0FBakIsRUF5QkE7O0FBQ0EsSUFBSU0sUUFBUSxHQUFDYixFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNsQkMsRUFBQUEsSUFBSSxFQUFDLFVBRGE7QUFFbEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSVyxJQUFBQSxLQUFLLEVBQUU7QUFDSCxpQkFBUyxFQUROO0FBRUhULE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDVyxJQUZOO0FBR0hKLE1BQUFBLFlBQVksRUFBRSxJQUhYO0FBSUhRLE1BQUFBLE9BQU8sRUFBQztBQUpMLEtBREM7QUFPUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsRUFERDtBQUVSWCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1csSUFGRDtBQUdSSixNQUFBQSxZQUFZLEVBQUUsSUFITjtBQUlSUSxNQUFBQSxPQUFPLEVBQUM7QUFKQSxLQVBKO0FBYVJFLElBQUFBLEdBQUcsRUFBRTtBQUNEQyxNQUFBQSxXQUFXLEVBQUMsVUFEWDtBQUVELGlCQUFTLEtBRlI7QUFHRGIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTLE9BSFI7QUFJREYsTUFBQUEsWUFBWSxFQUFFLElBSmI7QUFLRFEsTUFBQUEsT0FBTyxFQUFDO0FBTFAsS0FiRztBQW9CUkksSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsRUFEQztBQUVWZCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1csSUFGQztBQUdWSixNQUFBQSxZQUFZLEVBQUUsSUFISjtBQUlWUSxNQUFBQSxPQUFPLEVBQUM7QUFKRSxLQXBCTjtBQTBCUkssSUFBQUEsT0FBTyxFQUFFO0FBQ0wsaUJBQVMsRUFESjtBQUVMZixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1csSUFGSjtBQUdMSixNQUFBQSxZQUFZLEVBQUUsSUFIVDtBQUlMUSxNQUFBQSxPQUFPLEVBQUM7QUFKSDtBQTFCRDtBQUZNLENBQVQsQ0FBYixFQW9DQTs7QUFDQSxJQUFJTSxxQkFBcUIsR0FBQ3JCLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQy9CQyxFQUFBQSxJQUFJLEVBQUMsdUJBRDBCO0FBRS9CLGFBQVNGLEVBQUUsQ0FBQ3NCLFNBRm1CO0FBRy9CbkIsRUFBQUEsVUFBVSxFQUFFO0FBQ1JvQixJQUFBQSxhQUFhLEVBQUU7QUFDWCxpQkFBUyxJQURFO0FBRVhsQixNQUFBQSxJQUFJLEVBQUVRLFFBRks7QUFHWE4sTUFBQUEsWUFBWSxFQUFFO0FBSEgsS0FEUDtBQUtSaUIsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsQ0FERDtBQUVSbkIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLE9BRkQ7QUFHUkMsTUFBQUEsWUFBWSxFQUFFO0FBSE4sS0FMSjtBQVNSa0IsSUFBQUEsYUFBYSxFQUFFO0FBQ1gsaUJBQVMsQ0FERTtBQUVYcEIsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLE9BRkU7QUFHWEMsTUFBQUEsWUFBWSxFQUFFO0FBSEgsS0FUUDtBQWFSbUIsSUFBQUEsYUFBYSxFQUFFO0FBQUU7QUFDYixpQkFBUyxDQURFO0FBRVhyQixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sT0FGRTtBQUdYQyxNQUFBQSxZQUFZLEVBQUU7QUFISDtBQWJQLEdBSG1CO0FBdUIvQm9CLEVBQUFBLE9BQU8sRUFBRTtBQUFFO0FBQ1BDLElBQUFBLFFBQVEsRUFBRTtBQURMLEdBdkJzQjtBQTJCL0JDLEVBQUFBLFlBM0IrQiwwQkE0Qi9CO0FBQ0l6QyxJQUFBQSxTQUFTLEdBQUMsSUFBVjtBQUNBQyxJQUFBQSxTQUFTLEdBQUMsRUFBVjtBQUNBQyxJQUFBQSx3QkFBd0IsR0FBQyxJQUF6QjtBQUNBQyxJQUFBQSxRQUFRLEdBQUcsS0FBWDtBQUNBQyxJQUFBQSxZQUFZLEdBQUcsS0FBZjtBQUNBQyxJQUFBQSxjQUFjLEdBQUcsS0FBakI7QUFDQUMsSUFBQUEsVUFBVSxHQUFHLEVBQWI7QUFDQUMsSUFBQUEsWUFBWSxHQUFHLEtBQWY7QUFDQUMsSUFBQUEsU0FBUyxHQUFHLElBQVo7QUFDQSxTQUFLa0MsZUFBTDtBQUNBakMsSUFBQUEsV0FBVyxHQUFHLENBQWQ7QUFDQUMsSUFBQUEsZUFBZSxHQUFHLEtBQWxCO0FBQ0gsR0F6QzhCO0FBMEMvQjtBQUNBaUMsRUFBQUEsTUEzQytCLG9CQTJDdEI7QUFDTCxTQUFLRixZQUFMO0FBQ0EsU0FBS0csMEJBQUw7QUFDSCxHQTlDOEI7QUFnRC9CQyxFQUFBQSxtQkFoRCtCLCtCQWdEWEMsSUFoRFcsRUFnRE47QUFDekI7QUFDSSxTQUFLUixhQUFMLEdBQW1CUSxJQUFuQjtBQUNILEdBbkQ4QjtBQXFEL0JDLEVBQUFBLGVBckQrQiw2QkFzRC9CO0FBQ0ksV0FBTyxLQUFLVCxhQUFaO0FBQ0gsR0F4RDhCOztBQTBEL0I7Ozs7OztBQU1BTSxFQUFBQSwwQkFoRStCLHdDQWlFL0I7QUFDSSxRQUFHLENBQUNYLHFCQUFxQixDQUFDTyxRQUExQixFQUNBO0FBQ0k1QixNQUFBQSxFQUFFLENBQUNvQyxJQUFILENBQVFDLGtCQUFSLENBQTJCLEtBQUtDLElBQWhDO0FBQ0EsV0FBS0MsZ0JBQUw7QUFDQUMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlDLE9BQVo7QUFDQXRELE1BQUFBLFNBQVMsR0FBRyxJQUFJdUQsaUJBQUosRUFBWjtBQUNBdEIsTUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLEdBQStCLElBQS9CO0FBQ0g7O0FBRUQsU0FBS2dCLFNBQUwsR0FBZSxLQUFmO0FBQ0EsU0FBS0MsUUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLQyxPQUFMLEdBQWEsRUFBYjtBQUNBdkQsSUFBQUEsUUFBUSxHQUFDLEtBQVQ7QUFDQSxTQUFLd0QsVUFBTCxHQUFnQixLQUFoQjtBQUNBLFNBQUtDLGVBQUw7QUFDSCxHQWpGOEI7O0FBbUYvQjs7Ozs7O0FBTUFBLEVBQUFBLGVBekYrQiw2QkEwRi9CO0FBQ0ksUUFBRyxDQUFDMUQsd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFFLElBQTFELEVBQ0lBLHdCQUF3QixHQUFDMkQsT0FBTyxDQUFDLDBCQUFELENBQWhDO0FBQ1AsR0E3RjhCOztBQStGN0I7Ozs7OztBQU1GQyxFQUFBQSxpQkFyRytCLCtCQXNHL0I7QUFDSTdCLElBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixHQUErQixJQUEvQjtBQUNBNUIsSUFBQUEsRUFBRSxDQUFDb0MsSUFBSCxDQUFRZSxxQkFBUixDQUE4QixLQUFLYixJQUFuQztBQUNILEdBekc4Qjs7QUEyRy9COzs7Ozs7QUFNQWMsRUFBQUEsWUFBWSxFQUFFLHdCQUFXO0FBQ3JCLFFBQUlDLFNBQUo7QUFDQSxRQUFJQyxXQUFXLEdBQUd0RCxFQUFFLENBQUNvQyxJQUFILENBQVFrQixXQUExQjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELFdBQVcsQ0FBQ0UsTUFBaEMsRUFBd0NELENBQUMsRUFBekMsRUFBNkM7QUFDekMsVUFBR0QsV0FBVyxDQUFDQyxDQUFELENBQVgsQ0FBZUUsSUFBZixJQUF1QnpELEVBQUUsQ0FBQzBELFFBQUgsQ0FBWUMsTUFBWixDQUFtQkMsR0FBN0MsRUFBa0Q7QUFDOUNQLFFBQUFBLFNBQVMsR0FBR0MsV0FBVyxDQUFDQyxDQUFELENBQVgsQ0FBZU0sR0FBM0I7QUFDQVIsUUFBQUEsU0FBUyxHQUFHQSxTQUFTLENBQUNTLFNBQVYsQ0FBb0JULFNBQVMsQ0FBQ1UsV0FBVixDQUFzQixHQUF0QixJQUEyQixDQUEvQyxFQUFrREMsS0FBbEQsQ0FBd0QsUUFBeEQsRUFBa0UsQ0FBbEUsQ0FBWjtBQUNIO0FBRUo7O0FBQ0QsV0FBT1gsU0FBUDtBQUNILEdBNUg4Qjs7QUE4SC9COzs7Ozs7QUFNQVksRUFBQUEsbUJBcEkrQiwrQkFvSVhDLE1BcElXLEVBcUkvQjtBQUNJM0UsSUFBQUEsUUFBUSxHQUFDMkUsTUFBVDtBQUNILEdBdkk4Qjs7QUF5SS9COzs7Ozs7QUFNQUMsRUFBQUEsb0JBL0krQixnQ0ErSVZELE1BL0lVLEVBZ0ovQjtBQUNJLFNBQUt0QixTQUFMLEdBQWVzQixNQUFmO0FBQ0gsR0FsSjhCOztBQW9KL0I7Ozs7OztBQU1BRSxFQUFBQSxZQTFKK0IsMEJBMkovQjtBQUNJLFdBQU9oRixTQUFQO0FBQ0gsR0E3SjhCOztBQStKL0I7Ozs7OztBQU1BaUYsRUFBQUEsV0FySytCLHlCQXNLL0I7QUFDSSxXQUFPakYsU0FBUyxDQUFDa0YsT0FBVixFQUFQO0FBQ0gsR0F4SzhCOztBQTBLL0I7Ozs7OztBQU1BQyxFQUFBQSxVQWhMK0Isd0JBaUwvQjtBQUNJLFdBQU9uRixTQUFTLENBQUNvRixpQkFBVixFQUFQO0FBQ0gsR0FuTDhCOztBQXFML0I7Ozs7OztBQU1BQyxFQUFBQSxhQTNMK0IsMkJBNEwvQjtBQUNLLFdBQU9yRixTQUFTLENBQUNrRixPQUFWLEdBQW9CSSxnQkFBcEIsQ0FBcUNDLGNBQXJDLENBQW9EQyxVQUEzRDtBQUNKLEdBOUw4Qjs7QUFnTTlCOzs7Ozs7QUFNRHJDLEVBQUFBLGdCQXRNK0IsOEJBdU0vQjtBQUNJRyxJQUFBQSxPQUFPLENBQUNtQyxLQUFSLEdBQWMsS0FBS3RELGFBQUwsQ0FBbUJULEtBQWpDO0FBQ0E0QixJQUFBQSxPQUFPLENBQUMxQixVQUFSLEdBQW1CLEtBQUtPLGFBQUwsQ0FBbUJQLFVBQXRDO0FBQ0EwQixJQUFBQSxPQUFPLENBQUN6QixHQUFSLEdBQVksS0FBS00sYUFBTCxDQUFtQk4sR0FBL0I7QUFDQXlCLElBQUFBLE9BQU8sQ0FBQ3ZCLFlBQVIsR0FBcUIsS0FBS0ksYUFBTCxDQUFtQkosWUFBeEM7QUFDQXVCLElBQUFBLE9BQU8sQ0FBQ29DLE9BQVIsR0FBZ0IsS0FBS3ZELGFBQUwsQ0FBbUJILE9BQW5DO0FBQ0gsR0E3TThCOztBQStNaEM7Ozs7OztBQU1DMkQsRUFBQUEsaUJBck4rQiwrQkFxTlY7QUFDakIsUUFBRzNGLFNBQVMsQ0FBQzRGLEtBQVYsSUFBaUIsQ0FBakIsSUFBc0I1RixTQUFTLENBQUM2RixtQkFBVixNQUFpQyxJQUF2RCxJQUErRDdGLFNBQVMsQ0FBQzhGLFNBQVYsTUFBdUIsSUFBekYsRUFDSTFDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaLEVBREosS0FHSXJELFNBQVMsQ0FBQytGLEtBQVY7QUFDUCxHQTFOOEI7O0FBNE4vQjs7Ozs7O0FBTUFDLEVBQUFBLGdCQWxPK0IsOEJBa09YO0FBQ3BCLFFBQUdoRyxTQUFTLENBQUM2RixtQkFBVixNQUFpQyxJQUFqQyxJQUF5QzdGLFNBQVMsQ0FBQzhGLFNBQVYsTUFBdUIsSUFBaEUsSUFBd0U5RixTQUFTLENBQUNpRyxjQUFWLE1BQTRCLElBQXZHLEVBQ0k7QUFDQWpHLE1BQUFBLFNBQVMsQ0FBQ2tHLFVBQVY7QUFDQSxXQUFLdkMsVUFBTCxHQUFnQixLQUFoQixDQUZBLENBR0E7O0FBQ0EsV0FBS3dDLFVBQUw7QUFDQyxLQU5MLE1BUUk7QUFDSS9DLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFEQUFaO0FBQ0g7QUFDSixHQTlPOEI7O0FBZ1AvQjs7Ozs7O0FBTUE4QyxFQUFBQSxVQXRQK0Isd0JBdVAvQjtBQUNJLFNBQUszQyxTQUFMLEdBQWUsS0FBZjtBQUNBLFNBQUtHLFVBQUwsR0FBZ0IsS0FBaEI7QUFDQXhELElBQUFBLFFBQVEsR0FBQyxLQUFUO0FBQ0FGLElBQUFBLFNBQVMsR0FBRyxFQUFaO0FBQ0EsU0FBS3lDLGVBQUw7QUFDSCxHQTdQOEI7O0FBK1AvQjs7Ozs7O0FBTUEwRCxFQUFBQSxnQkFyUStCLDRCQXFRZHRGLElBclFjLEVBc1EvQjtBQUNJLFNBQUsyQyxRQUFMLEdBQWMzQyxJQUFkO0FBQ0gsR0F4UThCOztBQTBRL0I7Ozs7OztBQU1BdUYsRUFBQUEsZUFoUitCLDJCQWdSZkMsR0FoUmUsRUFpUi9CO0FBQ0ksU0FBSzVDLE9BQUwsR0FBYTRDLEdBQWI7QUFDSCxHQW5SOEI7O0FBcVIvQjs7Ozs7QUFLQUMsRUFBQUEsMEJBMVIrQixzQ0EwUkpDLGFBMVJJLEVBMFJnQkMsWUExUmhCLEVBMFIrQkMsbUJBMVIvQixFQTBSeURDLGtCQTFSekQsRUEwUmtGQyxxQkExUmxGLEVBMFI4R0Msb0JBMVI5RyxFQTBSd0lDLGlCQTFSeEksRUEwUmdLQyxnQkExUmhLLEVBMlIvQjtBQUFBLFFBRDJCUCxhQUMzQjtBQUQyQkEsTUFBQUEsYUFDM0IsR0FEeUMsS0FDekM7QUFBQTs7QUFBQSxRQUQrQ0MsWUFDL0M7QUFEK0NBLE1BQUFBLFlBQy9DLEdBRDRELENBQzVEO0FBQUE7O0FBQUEsUUFEOERDLG1CQUM5RDtBQUQ4REEsTUFBQUEsbUJBQzlELEdBRGtGLEtBQ2xGO0FBQUE7O0FBQUEsUUFEd0ZDLGtCQUN4RjtBQUR3RkEsTUFBQUEsa0JBQ3hGLEdBRDJHLEtBQzNHO0FBQUE7O0FBQUEsUUFEaUhDLHFCQUNqSDtBQURpSEEsTUFBQUEscUJBQ2pILEdBRHVJLEtBQ3ZJO0FBQUE7O0FBQUEsUUFENklDLG9CQUM3STtBQUQ2SUEsTUFBQUEsb0JBQzdJLEdBRGtLLElBQ2xLO0FBQUE7O0FBQUEsUUFEdUtDLGlCQUN2SztBQUR1S0EsTUFBQUEsaUJBQ3ZLLEdBRHlMLEtBQ3pMO0FBQUE7O0FBQUEsUUFEK0xDLGdCQUMvTDtBQUQrTEEsTUFBQUEsZ0JBQy9MLEdBRGdOLENBQ2hOO0FBQUE7O0FBQ0ksUUFBR1AsYUFBSCxFQUNJeEcsU0FBUyxDQUFDZ0gsTUFBVixHQUFtQkMsaUJBQW5CLENBQXFDLFFBQXJDLEVBQThDUixZQUE5QyxFQUEyRCxJQUEzRDtBQUVKLFFBQUdDLG1CQUFILEVBQ0kxRyxTQUFTLENBQUNnSCxNQUFWLEdBQW1CQyxpQkFBbkIsQ0FBcUMsY0FBckMsRUFBb0ROLGtCQUFwRCxFQUF1RSxJQUF2RTtBQUVKLFFBQUdDLHFCQUFILEVBQ0k1RyxTQUFTLENBQUNnSCxNQUFWLEdBQW1CQyxpQkFBbkIsQ0FBcUMsZ0JBQXJDLEVBQXNESixvQkFBdEQsRUFBMkUsSUFBM0U7QUFFSixRQUFHQyxpQkFBSCxFQUNJOUcsU0FBUyxDQUFDZ0gsTUFBVixHQUFtQkMsaUJBQW5CLENBQXFDLFlBQXJDLEVBQWtERixnQkFBbEQsRUFBbUUsSUFBbkU7QUFDUCxHQXZTOEI7O0FBeVMvQjs7Ozs7O0FBTUFHLEVBQUFBLFVBL1MrQix3QkErU2pCO0FBQ1YsUUFBR2xILFNBQVMsQ0FBQzZGLG1CQUFWLE1BQWlDLElBQWpDLElBQXdDN0YsU0FBUyxDQUFDOEYsU0FBVixNQUF1QixJQUEvRCxJQUF1RTlGLFNBQVMsQ0FBQzRGLEtBQVYsSUFBaUIsQ0FBM0YsRUFDQTtBQUNJLFVBQUc1RixTQUFTLENBQUNpRyxjQUFWLE1BQTRCLEtBQS9CLEVBQ0E7QUFDUSxZQUFJa0IsS0FBSyxHQUFDLElBQUl4RyxZQUFKLEVBQVY7O0FBQ0F3RyxRQUFBQSxLQUFLLENBQUNuRyxNQUFOLEdBQWEsQ0FBYjtBQUVBLFlBQUlvRyxXQUFXLEdBQUU7QUFDZix1QkFBWSxJQURHO0FBRWYsb0JBQVMsSUFGTTtBQUdmLHdCQUFhLEtBQUtoRixVQUFMLEdBQWdCLEtBQUtDLGFBSG5CO0FBSWYsa0NBQXVCOEU7QUFKUixTQUFqQjtBQU9BakgsUUFBQUEsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQzZFLHlCQUFsQyxHQUE4RHRDLG9CQUE5RCxDQUFtRixLQUFuRjtBQUNBL0UsUUFBQUEsU0FBUyxDQUFDa0YsT0FBVixHQUFvQnBFLElBQXBCLEdBQXlCWix3QkFBd0IsQ0FBQ3NDLFFBQXpCLENBQWtDOEUsaUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRXpHLElBQTNGO0FBQ0FkLFFBQUFBLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IrQixpQkFBcEIsQ0FBc0MsTUFBdEMsRUFBOEMvRyx3QkFBd0IsQ0FBQ3NDLFFBQXpCLENBQWtDOEUsaUJBQWxDLEdBQXNEQyxXQUFwRztBQUNBdkgsUUFBQUEsU0FBUyxDQUFDa0YsT0FBVixHQUFvQitCLGlCQUFwQixDQUFzQyxtQkFBdEMsRUFBMkQsRUFBM0Q7QUFDQWpILFFBQUFBLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IrQixpQkFBcEIsQ0FBc0MsZ0JBQXRDLEVBQXdEO0FBQUV6QixVQUFBQSxVQUFVLEVBQUU7QUFBZCxTQUF4RDtBQUNBeEYsUUFBQUEsU0FBUyxDQUFDa0YsT0FBVixHQUFvQitCLGlCQUFwQixDQUFzQyxhQUF0QyxFQUFxRDtBQUFDTyxVQUFBQSxPQUFPLEVBQUNsSDtBQUFULFNBQXJEO0FBQ0FOLFFBQUFBLFNBQVMsQ0FBQ3lILFNBQVYsQ0FBb0J2SCx3QkFBd0IsQ0FBQ3NDLFFBQXpCLENBQWtDOEUsaUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUcsTUFBdEY7QUFDQSxZQUFJQyxNQUFNLEdBQUNDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0JDLElBQUksQ0FBQ0MsR0FBTCxFQUEzQixDQUFYO0FBRUFoSSxRQUFBQSxTQUFTLENBQUNpSSxVQUFWLENBQXFCLFVBQVFOLE1BQTdCLEVBQW9DUCxXQUFwQztBQUNQLE9BdEJELE1Bd0JBO0FBQ0loRSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx5QkFBWjtBQUNIO0FBRUosS0E5QkQsTUErQkE7QUFDSUQsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUZBQVo7QUFDSDtBQUVKLEdBblY4Qjs7QUFxVi9COzs7Ozs7QUFNQTZFLEVBQUFBLFFBM1YrQixvQkEyVnJCQyxTQTNWcUIsRUEyVlY7QUFDakIsUUFBR25JLFNBQVMsQ0FBQzRGLEtBQVYsSUFBaUIsQ0FBakIsSUFBc0I1RixTQUFTLENBQUM2RixtQkFBVixNQUFpQyxJQUF2RCxJQUErRDdGLFNBQVMsQ0FBQzhGLFNBQVYsTUFBdUIsSUFBdEYsSUFBNkY5RixTQUFTLENBQUM0RixLQUFWLElBQWlCLENBQWpILEVBQ0E7QUFDSSxVQUFHNUYsU0FBUyxDQUFDaUcsY0FBVixNQUE0QixLQUE1QixJQUFxQ2pHLFNBQVMsQ0FBQzRGLEtBQVYsSUFBaUIsQ0FBekQsRUFDQTtBQUNJLFlBQUl3QixXQUFXLEdBQUU7QUFDYix1QkFBWSxJQURDO0FBRWIsb0JBQVMsS0FGSTtBQUdiLHdCQUFhLEtBQUtoRixVQUFMLEdBQWdCLEtBQUtDLGFBSHJCLENBSWI7O0FBSmEsU0FBakI7QUFPRW5DLFFBQUFBLHdCQUF3QixDQUFDc0MsUUFBekIsQ0FBa0M2RSx5QkFBbEMsR0FBOER0QyxvQkFBOUQsQ0FBbUYsS0FBbkY7QUFDQS9FLFFBQUFBLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0JwRSxJQUFwQixHQUF5Qlosd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQzhFLGlCQUFsQyxHQUFzREMsV0FBdEQsQ0FBa0V6RyxJQUEzRjtBQUNBZCxRQUFBQSxTQUFTLENBQUNrRixPQUFWLEdBQW9CK0IsaUJBQXBCLENBQXNDLE1BQXRDLEVBQThDL0csd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQzhFLGlCQUFsQyxHQUFzREMsV0FBcEc7QUFDQXZILFFBQUFBLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IrQixpQkFBcEIsQ0FBc0MsbUJBQXRDLEVBQTJELEVBQTNEO0FBQ0FqSCxRQUFBQSxTQUFTLENBQUNrRixPQUFWLEdBQW9CK0IsaUJBQXBCLENBQXNDLGdCQUF0QyxFQUF3RDtBQUFFekIsVUFBQUEsVUFBVSxFQUFFO0FBQWQsU0FBeEQ7QUFDQXhGLFFBQUFBLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IrQixpQkFBcEIsQ0FBc0MsYUFBdEMsRUFBcUQ7QUFBQ08sVUFBQUEsT0FBTyxFQUFDbEg7QUFBVCxTQUFyRDtBQUNBTixRQUFBQSxTQUFTLENBQUN5SCxTQUFWLENBQW9Cdkgsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQzhFLGlCQUFsQyxHQUFzREMsV0FBdEQsQ0FBa0VHLE1BQXRGO0FBRUExSCxRQUFBQSxTQUFTLENBQUNvSSxRQUFWLENBQW1CRCxTQUFuQixFQUE2QmYsV0FBN0I7QUFDTCxPQWxCRCxNQW9CQTtBQUNJaEUsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkseUJBQVo7QUFDSDtBQUNKLEtBekJELE1BMkJBO0FBQ0lELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlGQUFaO0FBQ0g7QUFFSixHQTNYOEI7O0FBNlg5Qjs7Ozs7O0FBTUhnRixFQUFBQSxjQW5ZaUMsNEJBbVlmO0FBQ2hCLFFBQUdySSxTQUFTLENBQUM0RixLQUFWLElBQWlCLENBQWpCLElBQXNCNUYsU0FBUyxDQUFDNkYsbUJBQVYsTUFBaUMsSUFBdkQsSUFBK0Q3RixTQUFTLENBQUM4RixTQUFWLE1BQXVCLElBQXRGLElBQTZGOUYsU0FBUyxDQUFDNEYsS0FBVixJQUFpQixDQUFqSCxFQUNBO0FBQ0ksVUFBRzVGLFNBQVMsQ0FBQ2lHLGNBQVYsTUFBNEIsS0FBNUIsSUFBcUNqRyxTQUFTLENBQUM0RixLQUFWLElBQWlCLENBQXpELEVBQ0E7QUFDSSxZQUFJdUIsS0FBSyxHQUFDLElBQUl4RyxZQUFKLEVBQVY7O0FBQ0F3RyxRQUFBQSxLQUFLLENBQUNuRyxNQUFOLEdBQWEsQ0FBYjtBQUVBLFlBQUlvRyxXQUFXLEdBQUU7QUFDYjtBQUNBLDBDQUErQkQ7QUFGbEIsU0FBakI7QUFLQWpILFFBQUFBLHdCQUF3QixDQUFDc0MsUUFBekIsQ0FBa0M2RSx5QkFBbEMsR0FBOER0QyxvQkFBOUQsQ0FBbUYsS0FBbkY7QUFDQS9FLFFBQUFBLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0JwRSxJQUFwQixHQUF5Qlosd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQzhFLGlCQUFsQyxHQUFzREMsV0FBdEQsQ0FBa0V6RyxJQUEzRjtBQUNBZCxRQUFBQSxTQUFTLENBQUNrRixPQUFWLEdBQW9CK0IsaUJBQXBCLENBQXNDLE1BQXRDLEVBQThDL0csd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQzhFLGlCQUFsQyxHQUFzREMsV0FBcEc7QUFDQXZILFFBQUFBLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IrQixpQkFBcEIsQ0FBc0MsbUJBQXRDLEVBQTJELEVBQTNEO0FBQ0FqSCxRQUFBQSxTQUFTLENBQUNrRixPQUFWLEdBQW9CK0IsaUJBQXBCLENBQXNDLGdCQUF0QyxFQUF3RDtBQUFFekIsVUFBQUEsVUFBVSxFQUFFO0FBQWQsU0FBeEQ7QUFDQXhGLFFBQUFBLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IrQixpQkFBcEIsQ0FBc0MsYUFBdEMsRUFBcUQ7QUFBQ08sVUFBQUEsT0FBTyxFQUFDbEg7QUFBVCxTQUFyRDtBQUNBTixRQUFBQSxTQUFTLENBQUN5SCxTQUFWLENBQW9Cdkgsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQzhFLGlCQUFsQyxHQUFzREMsV0FBdEQsQ0FBa0VHLE1BQXRGO0FBRUExSCxRQUFBQSxTQUFTLENBQUNzSSxjQUFWLENBQXlCbEIsV0FBekI7QUFFSCxPQXBCRCxNQXNCQTtBQUNJaEUsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkseUJBQVo7QUFDSDtBQUNKLEtBM0JELE1BNkJBO0FBQ0lELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlGQUFaO0FBQ0g7QUFFSixHQXJha0M7O0FBd2EvQjs7Ozs7O0FBTUZrRixFQUFBQSxZQTlhaUMsd0JBOGFuQnBCLEtBOWFtQixFQThhWjtBQUNuQixRQUFHbkgsU0FBUyxDQUFDaUcsY0FBVixNQUE0QixJQUEvQixFQUNBO0FBQ0k3QyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWjtBQUNBRCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWThELEtBQVo7O0FBQ0ksVUFBSTtBQUNBbkgsUUFBQUEsU0FBUyxDQUFDd0ksVUFBVixDQUFxQixDQUFyQixFQUF3QjtBQUFFQyxVQUFBQSxRQUFRLEVBQUV0QixLQUFaO0FBQW1CdUIsVUFBQUEsVUFBVSxFQUFFMUksU0FBUyxDQUFDa0YsT0FBVixHQUFvQnBFLElBQW5EO0FBQXdENkgsVUFBQUEsUUFBUSxFQUFDM0ksU0FBUyxDQUFDa0YsT0FBVixHQUFvQjBEO0FBQXJGLFNBQXhCLEVBQXVIO0FBQUNDLFVBQUFBLFNBQVMsRUFBQ0MsTUFBTSxDQUFDQyxhQUFQLENBQXFCQyxTQUFyQixDQUErQkMsYUFBL0IsQ0FBNkNDO0FBQXhELFNBQXZIO0FBQ0gsT0FGRCxDQUdBLE9BQU9DLEdBQVAsRUFBWTtBQUNSL0YsUUFBQUEsT0FBTyxDQUFDZ0csS0FBUixDQUFjLFlBQVlELEdBQUcsQ0FBQ0UsT0FBOUI7QUFDSDtBQUNSLEtBVkQsTUFZQTtBQUNJakcsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVo7QUFDSDtBQUNGLEdBOWJnQzs7QUFnY2hDOzs7Ozs7QUFNRGlHLEVBQUFBLFlBdGNpQyx3QkFzY25CbkMsS0F0Y21CLEVBc2NaO0FBQ25CLFFBQUduSCxTQUFTLENBQUNpRyxjQUFWLE1BQTRCLElBQS9CLEVBQ0E7QUFDSTdDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUFaO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEQsS0FBWjs7QUFDSSxVQUFJO0FBQ0FuSCxRQUFBQSxTQUFTLENBQUN3SSxVQUFWLENBQXFCLENBQXJCLEVBQXdCO0FBQUVlLFVBQUFBLElBQUksRUFBRXBDLEtBQVI7QUFBZXVCLFVBQUFBLFVBQVUsRUFBRTFJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0JwRSxJQUEvQztBQUFvRDZILFVBQUFBLFFBQVEsRUFBQzNJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IwRDtBQUFqRixTQUF4QixFQUFtSDtBQUFDQyxVQUFBQSxTQUFTLEVBQUNDLE1BQU0sQ0FBQ0MsYUFBUCxDQUFxQkMsU0FBckIsQ0FBK0JDLGFBQS9CLENBQTZDQztBQUF4RCxTQUFuSDtBQUNILE9BRkQsQ0FHQSxPQUFPQyxHQUFQLEVBQVk7QUFDUi9GLFFBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBYyxZQUFZRCxHQUFHLENBQUNFLE9BQTlCO0FBQ0g7QUFDUixLQVZELE1BWUE7QUFDSWpHLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0g7QUFDRixHQXRkZ0M7O0FBd2QvQjs7Ozs7O0FBTUZtRyxFQUFBQSxnQkE5ZGlDLDRCQThkZnJDLEtBOWRlLEVBOGRSO0FBQ3ZCLFFBQUduSCxTQUFTLENBQUNpRyxjQUFWLE1BQTRCLElBQS9CLEVBQ0E7QUFDSTdDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUFaO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEQsS0FBWjs7QUFDSSxVQUFJO0FBQ0FuSCxRQUFBQSxTQUFTLENBQUN3SSxVQUFWLENBQXFCLENBQXJCLEVBQXdCO0FBQUVlLFVBQUFBLElBQUksRUFBRXBDLEtBQVI7QUFBZXVCLFVBQUFBLFVBQVUsRUFBRTFJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0JwRSxJQUEvQztBQUFvRDZILFVBQUFBLFFBQVEsRUFBQzNJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IwRDtBQUFqRixTQUF4QixFQUFtSDtBQUFDQyxVQUFBQSxTQUFTLEVBQUNDLE1BQU0sQ0FBQ0MsYUFBUCxDQUFxQkMsU0FBckIsQ0FBK0JDLGFBQS9CLENBQTZDUTtBQUF4RCxTQUFuSDtBQUNILE9BRkQsQ0FHQSxPQUFPTixHQUFQLEVBQVk7QUFDUi9GLFFBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBYyxZQUFZRCxHQUFHLENBQUNFLE9BQTlCO0FBQ0g7QUFDUixLQVZELE1BWUE7QUFDSWpHLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0g7QUFDRixHQTllZ0M7O0FBZ2YvQjs7Ozs7O0FBTUZxRyxFQUFBQSxRQXRmaUMsb0JBc2Z2QnZDLEtBdGZ1QixFQXNmaEI7QUFDZixRQUFHbkgsU0FBUyxDQUFDaUcsY0FBVixNQUE0QixJQUEvQixFQUNBO0FBQ0k3QyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBWjtBQUNBRCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWThELEtBQVo7O0FBQ0ksVUFBSTtBQUNBbkgsUUFBQUEsU0FBUyxDQUFDd0ksVUFBVixDQUFxQixDQUFyQixFQUF3QjtBQUFFbUIsVUFBQUEsVUFBVSxFQUFFeEMsS0FBZDtBQUFxQnVCLFVBQUFBLFVBQVUsRUFBRTFJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0JwRSxJQUFyRDtBQUEwRDZILFVBQUFBLFFBQVEsRUFBQzNJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IwRDtBQUF2RixTQUF4QixFQUF5SDtBQUFDQyxVQUFBQSxTQUFTLEVBQUNDLE1BQU0sQ0FBQ0MsYUFBUCxDQUFxQkMsU0FBckIsQ0FBK0JDLGFBQS9CLENBQTZDQztBQUF4RCxTQUF6SDtBQUNILE9BRkQsQ0FHQSxPQUFPQyxHQUFQLEVBQVk7QUFDUi9GLFFBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBYyxZQUFZRCxHQUFHLENBQUNFLE9BQTlCO0FBQ0g7QUFDUixLQVZELE1BWUE7QUFDSWpHLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0g7QUFDRixHQXRnQmdDOztBQXdnQmpDOzs7Ozs7QUFNQXVHLEVBQUFBLG1CQTlnQmlDLCtCQThnQlp6QyxLQTlnQlksRUE4Z0JMO0FBQzFCLFFBQUduSCxTQUFTLENBQUNpRyxjQUFWLE1BQTRCLElBQS9CLEVBQ0E7QUFDSTdDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDJCQUFaO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEQsS0FBWjs7QUFDSSxVQUFJO0FBQ0FuSCxRQUFBQSxTQUFTLENBQUN3SSxVQUFWLENBQXFCLENBQXJCLEVBQXdCO0FBQUVlLFVBQUFBLElBQUksRUFBRXBDLEtBQVI7QUFBZXVCLFVBQUFBLFVBQVUsRUFBRTFJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0JwRSxJQUEvQztBQUFvRDZILFVBQUFBLFFBQVEsRUFBQzNJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IwRDtBQUFqRixTQUF4QixFQUFtSDtBQUFDQyxVQUFBQSxTQUFTLEVBQUNDLE1BQU0sQ0FBQ0MsYUFBUCxDQUFxQkMsU0FBckIsQ0FBK0JDLGFBQS9CLENBQTZDQztBQUF4RCxTQUFuSDtBQUNILE9BRkQsQ0FHQSxPQUFPQyxHQUFQLEVBQVk7QUFDUi9GLFFBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBYyxZQUFZRCxHQUFHLENBQUNFLE9BQTlCO0FBQ0g7QUFDUixLQVZELE1BWUE7QUFDSWpHLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0g7QUFDQSxHQTloQjhCOztBQWdpQmpDOzs7Ozs7QUFNQXdHLEVBQUFBLHFCQXRpQmlDLGlDQXNpQlYxQyxLQXRpQlUsRUFzaUJIO0FBQzVCLFFBQUduSCxTQUFTLENBQUNpRyxjQUFWLE1BQTRCLElBQS9CLEVBQ0E7QUFDSTdDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDJCQUFaO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEQsS0FBWjs7QUFDSSxVQUFJO0FBQ0FuSCxRQUFBQSxTQUFTLENBQUN3SSxVQUFWLENBQXFCLEVBQXJCLEVBQXlCO0FBQUVlLFVBQUFBLElBQUksRUFBRXBDLEtBQVI7QUFBZXVCLFVBQUFBLFVBQVUsRUFBRTFJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0JwRSxJQUEvQztBQUFvRDZILFVBQUFBLFFBQVEsRUFBQzNJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IwRDtBQUFqRixTQUF6QixFQUFvSDtBQUFDQyxVQUFBQSxTQUFTLEVBQUNDLE1BQU0sQ0FBQ0MsYUFBUCxDQUFxQkMsU0FBckIsQ0FBK0JDLGFBQS9CLENBQTZDUTtBQUF4RCxTQUFwSDtBQUNILE9BRkQsQ0FHQSxPQUFPTixHQUFQLEVBQVk7QUFDUi9GLFFBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBYyxZQUFZRCxHQUFHLENBQUNFLE9BQTlCO0FBQ0g7QUFDUixLQVZELE1BWUE7QUFDSWpHLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0g7QUFDRixHQXRqQmdDOztBQXdqQmpDOzs7Ozs7QUFNQXlHLEVBQUFBLDJCQTlqQmlDLHVDQThqQkozQyxLQTlqQkksRUE4akJHO0FBQ2xDLFFBQUduSCxTQUFTLENBQUNpRyxjQUFWLE1BQTRCLElBQS9CLEVBQ0E7QUFDSTdDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9DQUFaO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEQsS0FBWjs7QUFDSSxVQUFJO0FBQ0FuSCxRQUFBQSxTQUFTLENBQUN3SSxVQUFWLENBQXFCLENBQXJCLEVBQXdCO0FBQUVlLFVBQUFBLElBQUksRUFBRXBDLEtBQVI7QUFBZXVCLFVBQUFBLFVBQVUsRUFBRTFJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0JwRSxJQUEvQztBQUFvRDZILFVBQUFBLFFBQVEsRUFBQzNJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IwRDtBQUFqRixTQUF4QixFQUFtSDtBQUFDQyxVQUFBQSxTQUFTLEVBQUNDLE1BQU0sQ0FBQ0MsYUFBUCxDQUFxQkMsU0FBckIsQ0FBK0JDLGFBQS9CLENBQTZDUTtBQUF4RCxTQUFuSDtBQUNILE9BRkQsQ0FHQSxPQUFPTixHQUFQLEVBQVk7QUFDUi9GLFFBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBYyxZQUFZRCxHQUFHLENBQUNFLE9BQTlCO0FBQ0g7QUFDUixLQVZELE1BWUE7QUFDSWpHLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0g7QUFDRixHQTlrQmdDOztBQWdsQmpDOzs7Ozs7QUFNQTBHLEVBQUFBLGFBdGxCaUMseUJBc2xCbEI1QyxLQXRsQmtCLEVBc2xCWDtBQUNwQixRQUFHbkgsU0FBUyxDQUFDaUcsY0FBVixNQUE0QixJQUEvQixFQUNBO0FBQ0k3QyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBWjtBQUNBRCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWThELEtBQVo7O0FBQ0ksVUFBSTtBQUNBbkgsUUFBQUEsU0FBUyxDQUFDd0ksVUFBVixDQUFxQixDQUFyQixFQUF3QjtBQUFFd0IsVUFBQUEsU0FBUyxFQUFFN0MsS0FBYjtBQUFvQnVCLFVBQUFBLFVBQVUsRUFBRTFJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0JwRSxJQUFwRDtBQUF5RDZILFVBQUFBLFFBQVEsRUFBQzNJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IwRDtBQUF0RixTQUF4QixFQUF3SDtBQUFDQyxVQUFBQSxTQUFTLEVBQUNDLE1BQU0sQ0FBQ0MsYUFBUCxDQUFxQkMsU0FBckIsQ0FBK0JDLGFBQS9CLENBQTZDQztBQUF4RCxTQUF4SDtBQUNILE9BRkQsQ0FHQSxPQUFPQyxHQUFQLEVBQVk7QUFDUi9GLFFBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBYyxZQUFZRCxHQUFHLENBQUNFLE9BQTlCO0FBQ0g7QUFDUixLQVZELE1BWUE7QUFDSWpHLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0g7QUFDRixHQXRtQmdDOztBQXdtQmhDOzs7Ozs7QUFNRDRHLEVBQUFBLG1CQTltQmlDLCtCQThtQlo5QyxLQTltQlksRUE4bUJMO0FBQzFCLFFBQUduSCxTQUFTLENBQUNpRyxjQUFWLE1BQTRCLElBQS9CLEVBQ0E7QUFDSTdDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDBCQUFaO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEQsS0FBWjs7QUFDSSxVQUFJO0FBQ0FuSCxRQUFBQSxTQUFTLENBQUN3SSxVQUFWLENBQXFCLEVBQXJCLEVBQXlCO0FBQUVlLFVBQUFBLElBQUksRUFBRXBDLEtBQVI7QUFBZXVCLFVBQUFBLFVBQVUsRUFBRTFJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0JwRSxJQUEvQztBQUFvRDZILFVBQUFBLFFBQVEsRUFBQzNJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IwRDtBQUFqRixTQUF6QixFQUFvSDtBQUFDQyxVQUFBQSxTQUFTLEVBQUNDLE1BQU0sQ0FBQ0MsYUFBUCxDQUFxQkMsU0FBckIsQ0FBK0JDLGFBQS9CLENBQTZDUTtBQUF4RCxTQUFwSDtBQUNILE9BRkQsQ0FHQSxPQUFPTixHQUFQLEVBQVk7QUFDUi9GLFFBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBYyxZQUFZRCxHQUFHLENBQUNFLE9BQTlCO0FBQ0g7QUFDUixLQVZELE1BWUE7QUFDSWpHLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0g7QUFDRixHQTluQmdDOztBQWdvQmpDOzs7Ozs7QUFNQTZHLEVBQUFBLHdCQXRvQmlDLG9DQXNvQlAvQyxLQXRvQk8sRUFzb0JBO0FBQy9CLFFBQUduSCxTQUFTLENBQUNpRyxjQUFWLE1BQTRCLElBQS9CLEVBQ0E7QUFDSTdDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFaO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEQsS0FBWjs7QUFDSSxVQUFJO0FBQ0FuSCxRQUFBQSxTQUFTLENBQUN3SSxVQUFWLENBQXFCLEVBQXJCLEVBQXlCO0FBQUVlLFVBQUFBLElBQUksRUFBRXBDLEtBQVI7QUFBZXVCLFVBQUFBLFVBQVUsRUFBRTFJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0JwRSxJQUEvQztBQUFvRDZILFVBQUFBLFFBQVEsRUFBQzNJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IwRDtBQUFqRixTQUF6QixFQUFvSDtBQUFDQyxVQUFBQSxTQUFTLEVBQUNDLE1BQU0sQ0FBQ0MsYUFBUCxDQUFxQkMsU0FBckIsQ0FBK0JDLGFBQS9CLENBQTZDUTtBQUF4RCxTQUFwSDtBQUNILE9BRkQsQ0FHQSxPQUFPTixHQUFQLEVBQVk7QUFDUi9GLFFBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBYyxZQUFZRCxHQUFHLENBQUNFLE9BQTlCO0FBQ0g7QUFDUixLQVZELE1BWUE7QUFDSWpHLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0g7QUFDQSxHQXRwQjhCOztBQXdwQmpDOzs7Ozs7QUFNQThHLEVBQUFBLHlCQTlwQmlDLHFDQThwQk5oRCxLQTlwQk0sRUE4cEJDO0FBQ2hDLFFBQUduSCxTQUFTLENBQUNpRyxjQUFWLE1BQTRCLElBQS9CLEVBQ0E7QUFDSTdDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlDQUFaO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEQsS0FBWjs7QUFDSSxVQUFJO0FBQ0FuSCxRQUFBQSxTQUFTLENBQUN3SSxVQUFWLENBQXFCLEVBQXJCLEVBQXlCO0FBQUVlLFVBQUFBLElBQUksRUFBRXBDLEtBQVI7QUFBZXVCLFVBQUFBLFVBQVUsRUFBRTFJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0JwRSxJQUEvQztBQUFvRDZILFVBQUFBLFFBQVEsRUFBQzNJLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IwRDtBQUFqRixTQUF6QixFQUFvSDtBQUFDQyxVQUFBQSxTQUFTLEVBQUNDLE1BQU0sQ0FBQ0MsYUFBUCxDQUFxQkMsU0FBckIsQ0FBK0JDLGFBQS9CLENBQTZDUTtBQUF4RCxTQUFwSDtBQUNILE9BRkQsQ0FHQSxPQUFPTixHQUFQLEVBQVk7QUFDUi9GLFFBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBYyxZQUFZRCxHQUFHLENBQUNFLE9BQTlCO0FBQ0g7QUFDUixLQVZELE1BWUE7QUFDSWpHLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0g7QUFDRixHQTlxQmdDOztBQWdyQmpDOzs7Ozs7QUFNRStHLEVBQUFBLGtCQXRyQitCLDhCQXNyQlhqRCxLQXRyQlcsRUFzckJKO0FBQ3ZCLFFBQUduSCxTQUFTLENBQUNpRyxjQUFWLE1BQTRCLElBQS9CLEVBQ0E7QUFDSTdDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDhCQUFaO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEQsS0FBWjs7QUFDSSxVQUFJO0FBQ0FuSCxRQUFBQSxTQUFTLENBQUN3SSxVQUFWLENBQXFCLENBQXJCLEVBQXdCO0FBQUU2QixVQUFBQSxHQUFHLEVBQUVsRCxLQUFQO0FBQWN1QixVQUFBQSxVQUFVLEVBQUUxSSxTQUFTLENBQUNrRixPQUFWLEdBQW9CcEUsSUFBOUM7QUFBbUQ2SCxVQUFBQSxRQUFRLEVBQUMzSSxTQUFTLENBQUNrRixPQUFWLEdBQW9CMEQ7QUFBaEYsU0FBeEIsRUFBa0g7QUFBQ0MsVUFBQUEsU0FBUyxFQUFDQyxNQUFNLENBQUNDLGFBQVAsQ0FBcUJDLFNBQXJCLENBQStCQyxhQUEvQixDQUE2Q0M7QUFBeEQsU0FBbEg7QUFDSCxPQUZELENBR0EsT0FBT0MsR0FBUCxFQUFZO0FBQ1IvRixRQUFBQSxPQUFPLENBQUNnRyxLQUFSLENBQWMsWUFBWUQsR0FBRyxDQUFDRSxPQUE5QjtBQUNIO0FBQ1IsS0FWRCxNQVlBO0FBQ0lqRyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWjtBQUNIO0FBQ0osR0F0c0I4Qjs7QUF3c0IvQjs7Ozs7O0FBTUFpSCxFQUFBQSxTQTlzQitCLHFCQThzQnBCbkQsS0E5c0JvQixFQThzQmI7QUFDZCxRQUFHbkgsU0FBUyxDQUFDaUcsY0FBVixNQUE0QixJQUEvQixFQUNBO0FBQ0k3QyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEQsS0FBWjs7QUFDSSxVQUFJO0FBQ0FuSCxRQUFBQSxTQUFTLENBQUN3SSxVQUFWLENBQXFCLENBQXJCLEVBQXdCO0FBQUVoSCxVQUFBQSxVQUFVLEVBQUUyRixLQUFkO0FBQXFCdUIsVUFBQUEsVUFBVSxFQUFFMUksU0FBUyxDQUFDa0YsT0FBVixHQUFvQnBFLElBQXJEO0FBQTBENkgsVUFBQUEsUUFBUSxFQUFDM0ksU0FBUyxDQUFDa0YsT0FBVixHQUFvQjBEO0FBQXZGLFNBQXhCLEVBQXlIO0FBQUNDLFVBQUFBLFNBQVMsRUFBQ0MsTUFBTSxDQUFDQyxhQUFQLENBQXFCQyxTQUFyQixDQUErQkMsYUFBL0IsQ0FBNkNDO0FBQXhELFNBQXpIO0FBQ0gsT0FGRCxDQUdBLE9BQU9DLEdBQVAsRUFBWTtBQUNSL0YsUUFBQUEsT0FBTyxDQUFDZ0csS0FBUixDQUFjLFlBQVlELEdBQUcsQ0FBQ0UsT0FBOUI7QUFDSDtBQUNSLEtBVkQsTUFZQTtBQUNJakcsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVo7QUFDSDtBQUVKLEdBL3RCOEI7O0FBaXVCOUI7Ozs7OztBQU1Ea0gsRUFBQUEsU0FBUyxFQUFDLG1CQUFTakUsR0FBVCxFQUNWO0FBQ0lsRCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBa0JpRCxHQUE5QjtBQUNILEdBMXVCOEI7O0FBNHVCOUI7Ozs7O0FBS0RrRSxFQUFBQSxnQkFBZ0IsRUFBQywwQkFBU0MsVUFBVCxFQUFvQkMsV0FBcEIsRUFBZ0NDLFNBQWhDLEVBQTBDeEQsS0FBMUMsRUFDakI7QUFBQTs7QUFDSSxRQUFJeUQsWUFBWSxHQUFDLElBQWpCLENBREosQ0FHSTs7QUFDQSxRQUFHMUssd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQ3FJLDBCQUFsQyxNQUFnRSxJQUFuRSxFQUNBO0FBQ0lELE1BQUFBLFlBQVksR0FBQyxJQUFiO0FBQ0FFLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsUUFBQSxLQUFJLENBQUNOLGdCQUFMLENBQXNCQyxVQUF0QixFQUFpQ0MsV0FBakMsRUFBNkNDLFNBQTdDLEVBQXVEeEQsS0FBdkQ7QUFDSCxPQUZTLEVBRVAsRUFGTyxDQUFWO0FBR0gsS0FORCxNQVFBO0FBQ0l5RCxNQUFBQSxZQUFZLEdBQUMsS0FBYjtBQUNBMUssTUFBQUEsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQ3FJLDBCQUFsQyxHQUErREUsWUFBL0QsQ0FBNEVOLFVBQTVFLEVBQXVGQyxXQUF2RixFQUFtR0MsU0FBbkcsRUFBNkd4RCxLQUE3RztBQUNIO0FBQ0osR0Fsd0I4QjtBQW93Qi9CNkQsRUFBQUEsY0Fwd0IrQiw0QkFxd0IvQjtBQUNJNUssSUFBQUEsWUFBWSxHQUFHLElBQWYsQ0FESixDQUVJO0FBQ0E7QUFDQTtBQUNILEdBMXdCOEI7QUE0d0IvQjZLLEVBQUFBLFdBNXdCK0IsdUJBNHdCbkJDLE1BNXdCbUIsRUE2d0IzQjtBQUFBLFFBRFFBLE1BQ1I7QUFEUUEsTUFBQUEsTUFDUixHQURlLENBQ2Y7QUFBQTs7QUFDSWpKLElBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQm1CLFVBQS9CLEdBQTBDLEtBQTFDO0FBQ0ExQixJQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0IyRCxVQUEvQjtBQUNBbEUsSUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCd0QsZ0JBQS9CO0FBRUE4RSxJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiNUssTUFBQUEsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQzJJLGVBQWxDLEdBQW9EQyxtQkFBcEQ7QUFDQWxMLE1BQUFBLHdCQUF3QixDQUFDc0MsUUFBekIsQ0FBa0NxSSwwQkFBbEMsR0FBK0QvRyxpQkFBL0Q7QUFDQTVELE1BQUFBLHdCQUF3QixDQUFDc0MsUUFBekIsQ0FBa0M4RSxpQkFBbEMsR0FBc0R4RCxpQkFBdEQ7QUFDQTVELE1BQUFBLHdCQUF3QixDQUFDc0MsUUFBekIsQ0FBa0NzQixpQkFBbEM7QUFDQTdCLE1BQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQnNCLGlCQUEvQjtBQUNBbEQsTUFBQUEsRUFBRSxDQUFDMEQsUUFBSCxDQUFZK0csU0FBWixDQUFzQixVQUF0QjtBQUNILEtBUFMsRUFPUEgsTUFQTyxDQUFWLENBTEosQ0FhRztBQUNGLEdBM3hCMEI7QUE2eEIvQkksRUFBQUEsaUJBN3hCK0IsNkJBNnhCYjlHLEdBN3hCYSxFQTh4Qi9CO0FBQ0ksUUFBSStHLFNBQVMsR0FBRyxLQUFoQjs7QUFDQSxRQUFJdkwsU0FBUyxDQUFDd0wsbUJBQVYsTUFBbUNoSCxHQUFuQyxJQUEwQ3hFLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0IwRCxPQUFwQixJQUErQnBFLEdBQTdFLEVBQWtGO0FBQzlFK0csTUFBQUEsU0FBUyxHQUFHLElBQVo7QUFDQWxMLE1BQUFBLGNBQWMsR0FBRyxJQUFqQjtBQUNILEtBTEwsQ0FPSTs7O0FBQ0EsV0FBT2tMLFNBQVA7QUFDSCxHQXZ5QjhCO0FBeXlCL0JFLEVBQUFBLDhCQXp5QitCLDRDQTB5Qi9CO0FBQ0ksUUFBSUYsU0FBUyxHQUFHLEtBQWhCOztBQUNBLFFBQUl2TCxTQUFTLENBQUNrRixPQUFWLEdBQW9CMEQsT0FBcEIsSUFBK0I1SSxTQUFTLENBQUN3TCxtQkFBVixFQUFuQyxFQUFvRTtBQUNoRUQsTUFBQUEsU0FBUyxHQUFHLElBQVo7QUFDQWxMLE1BQUFBLGNBQWMsR0FBRyxJQUFqQjtBQUNILEtBSEQsTUFJQTtBQUNJQSxNQUFBQSxjQUFjLEdBQUcsS0FBakI7QUFDSDs7QUFFRCtDLElBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBY21DLFNBQWQ7QUFDQSxXQUFPQSxTQUFQO0FBQ0gsR0F0ekI4QjtBQXd6Qi9CN0ksRUFBQUEsZUF4ekIrQiw2QkF5ekIvQjtBQUNJZ0osSUFBQUEsWUFBWSxDQUFDbEwsU0FBRCxDQUFaO0FBRUFzSyxJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiekssTUFBQUEsY0FBYyxHQUFHLEtBQWpCO0FBQ0FFLE1BQUFBLFlBQVksR0FBRyxLQUFmO0FBQ0gsS0FIUyxFQUdQLElBSE8sQ0FBVjtBQUtILEdBajBCOEI7QUFtMEIvQm9MLEVBQUFBLGFBbjBCK0IsMkJBbzBCL0I7QUFDSSxRQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxRQUFJQyxVQUFVLEdBQUc3TCxTQUFTLENBQUNvRixpQkFBVixFQUFqQjs7QUFDQSxTQUFLLElBQUkwRyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR0QsVUFBVSxDQUFDekgsTUFBdkMsRUFBK0MwSCxLQUFLLEVBQXBELEVBQXdEO0FBQ3BELFVBQUlELFVBQVUsQ0FBQ0MsS0FBRCxDQUFWLENBQWtCQyxpQkFBbEIsQ0FBb0MsZ0JBQXBDLEVBQXNELFlBQXRELEtBQXVFLEtBQTNFLEVBQ0E7QUFDSUgsUUFBQUEsV0FBVztBQUNkO0FBQ0o7O0FBQ0QsV0FBT0EsV0FBUDtBQUNILEdBOTBCOEI7QUFnMUIvQkksRUFBQUEsV0FoMUIrQix1QkFnMUJuQmQsTUFoMUJtQixFQWkxQi9CO0FBQUE7O0FBQ0lRLElBQUFBLFlBQVksQ0FBQ2xMLFNBQUQsQ0FBWjtBQUNBLFFBQUkyRyxLQUFLLEdBQUcsSUFBWjtBQUNBM0csSUFBQUEsU0FBUyxHQUFHc0ssVUFBVSxDQUFDLFlBQU07QUFDekIsVUFBSXpLLGNBQUosRUFBb0I7QUFDaEIsWUFBSTZLLE1BQU0sR0FBRyxDQUFiLEVBQWdCO0FBQ1pBLFVBQUFBLE1BQU0sR0FETSxDQUVaO0FBQ0E7QUFDRDs7QUFDQyxVQUFBLE1BQUksQ0FBQ2MsV0FBTCxDQUFpQmQsTUFBakI7QUFDSCxTQU5ELE1BTU87QUFDSDlILFVBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBYyxpQkFBZDs7QUFDQSxjQUFJLE1BQUksQ0FBQ3VDLGFBQUwsS0FBdUIsQ0FBM0IsRUFBOEI7QUFBRTtBQUM1QixZQUFBLE1BQUksQ0FBQ00scUJBQUw7QUFDSCxXQUZELE1BRU87QUFDUDtBQUNJaEssY0FBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCRSxlQUEvQjtBQUNBVCxjQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0J3RCxnQkFBL0I7QUFFQS9ELGNBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQkssbUJBQS9CLENBQW1ELENBQW5EO0FBQ0FaLGNBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQnFDLG1CQUEvQixDQUFtRCxLQUFuRDtBQUVBNUMsY0FBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCSixVQUEvQixHQUEwQyxDQUExQztBQUNBeEIsY0FBQUEsRUFBRSxDQUFDc0wsV0FBSCxDQUFlQyxJQUFmLENBQW9CLG9CQUFwQixFQUEwQyxlQUExQztBQUNBdkwsY0FBQUEsRUFBRSxDQUFDc0wsV0FBSCxDQUFlQyxJQUFmLENBQW9CLG9CQUFwQixFQUEwQyxrQkFBMUM7QUFFQXJCLGNBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2I1SyxnQkFBQUEsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQzZFLHlCQUFsQyxHQUE4RDFELFVBQTlELEdBQXlFLElBQXpFO0FBQ0EvQyxnQkFBQUEsRUFBRSxDQUFDc0wsV0FBSCxDQUFlQyxJQUFmLENBQW9CLG1CQUFwQixFQUF3QyxJQUF4QyxFQUE2QyxJQUE3QyxFQUFrRCxVQUFsRCxFQUZhLENBRWtEO0FBQ2xFLGVBSFMsRUFHUCxJQUhPLENBQVY7QUFJSDtBQUNKO0FBQ0osT0E3QkQsTUE4QkE7QUFDSVQsUUFBQUEsWUFBWSxDQUFDbEwsU0FBRCxDQUFaO0FBQ0g7QUFDSixLQWxDcUIsRUFrQ25CLElBbENtQixDQUF0QjtBQW1DSCxHQXYzQjhCO0FBeTNCL0I0TCxFQUFBQSxjQXozQitCLDRCQTAzQi9CO0FBQ0ksUUFBSUMsT0FBTyxHQUFHcEsscUJBQXFCLENBQUNPLFFBQXRCLENBQStCaUosOEJBQS9CLEVBQWQ7O0FBQ0EsUUFBSVksT0FBSixFQUFhO0FBQ1QsVUFBSSxDQUFDOUwsWUFBTCxFQUNBO0FBQ0lBLFFBQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0EsWUFBSStMLFFBQVEsR0FBR3RNLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0I2RyxpQkFBcEIsQ0FBc0MsYUFBdEMsRUFBcUQsU0FBckQsQ0FBZjtBQUNBOUosUUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCd0osV0FBL0IsQ0FBMkNNLFFBQTNDO0FBQ0g7QUFDSjtBQUNKLEdBcDRCOEI7O0FBczRCN0I7Ozs7OztBQU1KTCxFQUFBQSxxQkE1NEJpQyxpQ0E0NEJWOUUsS0E1NEJVLEVBNDRCSDtBQUM1QixRQUFHbkgsU0FBUyxDQUFDaUcsY0FBVixNQUE0QixJQUEvQixFQUNBO0FBQ0k3QyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwyQkFBWixFQURKLENBRUU7O0FBQ00sVUFBSTtBQUNBckQsUUFBQUEsU0FBUyxDQUFDd0ksVUFBVixDQUFxQixFQUFyQixFQUF5QjtBQUFFZSxVQUFBQSxJQUFJLEVBQUVwQyxLQUFSO0FBQWV1QixVQUFBQSxVQUFVLEVBQUUxSSxTQUFTLENBQUNrRixPQUFWLEdBQW9CcEUsSUFBL0M7QUFBb0Q2SCxVQUFBQSxRQUFRLEVBQUMzSSxTQUFTLENBQUNrRixPQUFWLEdBQW9CMEQ7QUFBakYsU0FBekIsRUFBb0g7QUFBQ0MsVUFBQUEsU0FBUyxFQUFDQyxNQUFNLENBQUNDLGFBQVAsQ0FBcUJDLFNBQXJCLENBQStCQyxhQUEvQixDQUE2Q0M7QUFBeEQsU0FBcEg7QUFDSCxPQUZELENBR0EsT0FBT0MsR0FBUCxFQUFZO0FBQ1IvRixRQUFBQSxPQUFPLENBQUNnRyxLQUFSLENBQWMsWUFBWUQsR0FBRyxDQUFDRSxPQUE5QjtBQUNIO0FBQ1IsS0FWRCxNQVlBO0FBQ0lqRyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWjtBQUNIO0FBQ0YsR0E1NUJnQztBQTY1Qi9Ca0osRUFBQUEsYUE3NUIrQiwyQkE2NUJmO0FBRVosUUFBSXZNLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0I2RyxpQkFBcEIsQ0FBc0MsZ0JBQXRDLEVBQXdELFlBQXhELEtBQXlFLEtBQTdFLEVBQ0E7QUFDSSxVQUFJSCxXQUFXLEdBQUcsS0FBS0QsYUFBTCxFQUFsQjs7QUFFQTFKLE1BQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQkosVUFBL0IsR0FBNEN3SixXQUE1QztBQUNBeEksTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0RBQVo7QUFDQXpDLE1BQUFBLEVBQUUsQ0FBQ3NMLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixvQkFBcEIsRUFBMEMsZUFBMUM7QUFDQXZMLE1BQUFBLEVBQUUsQ0FBQ3NMLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixvQkFBcEIsRUFBMEMsa0JBQTFDO0FBQ0FsSyxNQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0JtQixVQUEvQixHQUE0QyxJQUE1QztBQUNBbUgsTUFBQUEsVUFBVSxDQUFDLFlBQU07QUFBRWxLLFFBQUFBLEVBQUUsQ0FBQ3NMLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBeUMsSUFBekMsRUFBK0MsSUFBL0MsRUFBcUQsVUFBckQ7QUFBbUUsT0FBNUUsRUFBOEUsSUFBOUUsQ0FBVixDQVJKLENBUW1HOztBQUMvRmxLLE1BQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQitELDBCQUEvQixDQUEwRCxJQUExRCxFQUFnRXFGLFdBQWhFLEVBQTZFLEtBQTdFLEVBQW9GLEtBQXBGLEVBQTJGLEtBQTNGLEVBQWtHLElBQWxHLEVBQXdHLEtBQXhHLEVBQStHLENBQS9HO0FBRUg7QUFDUixHQTU2QmtDO0FBNjZCL0I7QUFDQVksRUFBQUEsTUE5NkIrQixrQkE4NkJ2QkMsRUE5NkJ1QixFQTg2Qm5CO0FBRVI7Ozs7OztBQU1Bek0sSUFBQUEsU0FBUyxDQUFDME0sYUFBVixHQUF3QixVQUFTOUcsS0FBVCxFQUN4QjtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxVQUFJK0csR0FBRyxHQUFHN0QsTUFBTSxDQUFDQyxhQUFQLENBQXFCNkQsbUJBQS9CO0FBQ0F4SixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBY3VDLEtBQWQsR0FBb0IsR0FBcEIsR0FBd0IrRyxHQUFHLENBQUNFLFdBQUosQ0FBZ0JqSCxLQUFoQixDQUFwQztBQUVBLFVBQUdBLEtBQUssSUFBRSxDQUFWLEVBQ0loRixFQUFFLENBQUNzTCxXQUFILENBQWVDLElBQWYsQ0FBb0Isb0JBQXBCLEVBQXlDLHlCQUF6QyxFQURKLEtBRUssSUFBR3ZHLEtBQUssSUFBRSxDQUFWLEVBQ0RoRixFQUFFLENBQUNzTCxXQUFILENBQWVDLElBQWYsQ0FBb0Isb0JBQXBCLEVBQXlDLHFCQUF6QyxFQURDLEtBRUEsSUFBR3ZHLEtBQUssSUFBRSxDQUFWLEVBQWE7QUFDbEI7QUFDSSxjQUFHekYsUUFBUSxJQUFFLEtBQWIsRUFDQTtBQUNJUyxZQUFBQSxFQUFFLENBQUNzTCxXQUFILENBQWVDLElBQWYsQ0FBb0Isb0JBQXBCLEVBQXlDLDhCQUF6QztBQUNBbEssWUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCNkYsY0FBL0I7QUFDSCxXQUpELE1BS0ssSUFBR2xJLFFBQVEsSUFBRSxJQUFiLEVBQ0w7QUFDSVMsWUFBQUEsRUFBRSxDQUFDc0wsV0FBSCxDQUFlQyxJQUFmLENBQW9CLG9CQUFwQixFQUF5Qyx1QkFBekM7QUFDQXJCLFlBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2I1SyxjQUFBQSx3QkFBd0IsQ0FBQ3NDLFFBQXpCLENBQWtDc0ssYUFBbEMsR0FBa0RDLDhCQUFsRCxDQUFpRixLQUFqRjtBQUNBN00sY0FBQUEsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQ3NLLGFBQWxDLEdBQWtERSwyQkFBbEQsQ0FBOEUsSUFBOUU7QUFDSCxhQUhTLEVBR1AsSUFITyxDQUFWO0FBSUg7QUFDSjtBQUNKLEtBckNEO0FBdUNBOzs7Ozs7OztBQU1BaE4sSUFBQUEsU0FBUyxDQUFDaU4sTUFBVixDQUFpQkMsS0FBakIsR0FBdUIsVUFBU0MsSUFBVCxFQUN2QjtBQUNJL0osTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk4SixJQUFaO0FBQ0gsS0FIRDtBQUtBOzs7Ozs7Ozs7QUFPQW5OLElBQUFBLFNBQVMsQ0FBQ2lOLE1BQVYsQ0FBaUJHLElBQWpCLEdBQXdCLFVBQVVELElBQVYsRUFBZUUsS0FBZixFQUFzQjtBQUMzQ2pLLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEosSUFBSSxHQUFDRSxLQUFqQjtBQUNBcE4sTUFBQUEsU0FBUyxJQUFHa04sSUFBSSxHQUFDLEdBQUwsR0FBU0UsS0FBVCxHQUFlLElBQTNCO0FBQ0YsS0FIRDtBQUtBOzs7Ozs7Ozs7OztBQVNBck4sSUFBQUEsU0FBUyxDQUFDaU4sTUFBVixDQUFpQkssSUFBakIsR0FBd0IsVUFBVUgsSUFBVixFQUFlSSxNQUFmLEVBQXNCQyxNQUF0QixFQUE2QkMsTUFBN0IsRUFBcUM7QUFDekRySyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWThKLElBQUksR0FBQyxHQUFMLEdBQVNJLE1BQVQsR0FBZ0IsR0FBaEIsR0FBb0JDLE1BQXBCLEdBQTJCLEdBQTNCLEdBQStCQyxNQUEzQzs7QUFFQSxVQUFHRixNQUFNLElBQUUsR0FBWCxFQUFnQjtBQUNoQjtBQUNJbkssVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0NBQVo7QUFDQXBCLFVBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQjBFLFVBQS9CO0FBQ0g7O0FBRUQsVUFBR3FHLE1BQU0sSUFBRSxHQUFYLEVBQWdCO0FBQ2hCO0FBQ0lyTixVQUFBQSx3QkFBd0IsQ0FBQ3NDLFFBQXpCLENBQWtDc0ssYUFBbEMsR0FBa0RZLGlCQUFsRCxDQUFvRSxLQUFwRTtBQUNBeE4sVUFBQUEsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQ3NLLGFBQWxDLEdBQWtEdkMsU0FBbEQsQ0FBNEQseURBQTVEO0FBQ0g7QUFDSCxLQWRGO0FBZ0JDOzs7Ozs7Ozs7QUFPQXZLLElBQUFBLFNBQVMsQ0FBQ2lOLE1BQVYsQ0FBaUI3RCxLQUFqQixHQUF5QixVQUFVK0QsSUFBVixFQUFlRSxLQUFmLEVBQXNCO0FBQzVDakssTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk4SixJQUFaO0FBQ0YsS0FGRDtBQUlDOzs7Ozs7OztBQU1Ebk4sSUFBQUEsU0FBUyxDQUFDaU4sTUFBVixDQUFpQlUsU0FBakIsR0FBNkIsVUFBVVIsSUFBVixFQUFnQjtBQUMxQy9KLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEosSUFBWjtBQUNGLEtBRkQ7QUFJQTs7Ozs7Ozs7QUFNQW5OLElBQUFBLFNBQVMsQ0FBQ2lOLE1BQVYsQ0FBaUJXLE1BQWpCLEdBQTBCLFVBQVVULElBQVYsRUFBZ0I7QUFDdkMvSixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWThKLElBQVo7QUFDRixLQUZEO0FBSUE7Ozs7Ozs7O0FBTUFuTixJQUFBQSxTQUFTLENBQUM2TixVQUFWLEdBQXVCLFVBQVVDLEtBQVYsRUFBaUI7QUFDckM3TixNQUFBQSxTQUFTLElBQUUsT0FBSyxhQUFMLEdBQW1CLElBQTlCOztBQUVBLFVBQUc2TixLQUFLLENBQUMxSixNQUFOLElBQWMsQ0FBakIsRUFDQTtBQUNJbkUsUUFBQUEsU0FBUyxJQUFFLHVCQUFxQixJQUFoQztBQUNILE9BSEQsTUFLQTtBQUNJQyxRQUFBQSx3QkFBd0IsQ0FBQ3NDLFFBQXpCLENBQWtDc0ssYUFBbEMsR0FBa0RpQixhQUFsRDs7QUFFQSxhQUFLLElBQUk1SixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHMkosS0FBSyxDQUFDMUosTUFBMUIsRUFBa0MsRUFBRUQsQ0FBcEMsRUFBdUM7QUFDbkNqRSxVQUFBQSx3QkFBd0IsQ0FBQ3NDLFFBQXpCLENBQWtDc0ssYUFBbEMsR0FBa0RrQiwwQkFBbEQsQ0FBNkVGLEtBQUssQ0FBQzNKLENBQUQsQ0FBTCxDQUFTckQsSUFBdEYsRUFBMkZnTixLQUFLLENBQUMzSixDQUFELENBQUwsQ0FBUzhKLFdBQXBHO0FBQ0E3SyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBY3lLLEtBQUssQ0FBQzNKLENBQUQsQ0FBTCxDQUFTckQsSUFBbkM7QUFDQWIsVUFBQUEsU0FBUyxJQUFFLFdBQVM2TixLQUFLLENBQUMzSixDQUFELENBQUwsQ0FBU3JELElBQWxCLEdBQXVCLElBQWxDO0FBQ0g7QUFDSjtBQUNKLEtBakJBO0FBbUJEOzs7Ozs7Ozs7OztBQVNBZCxJQUFBQSxTQUFTLENBQUNrTyxnQkFBVixHQUE2QixVQUFVSixLQUFWLEVBQWlCSyxZQUFqQixFQUErQkMsVUFBL0IsRUFBMkNDLFlBQTNDLEVBQXlEO0FBQ2xGbk8sTUFBQUEsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQ3NLLGFBQWxDLEdBQWtEaUIsYUFBbEQ7O0FBRUEsV0FBSyxJQUFJNUosQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzJKLEtBQUssQ0FBQzFKLE1BQTFCLEVBQWtDLEVBQUVELENBQXBDLEVBQXVDO0FBQ25DakUsUUFBQUEsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQ3NLLGFBQWxDLEdBQWtEa0IsMEJBQWxELENBQTZFRixLQUFLLENBQUMzSixDQUFELENBQUwsQ0FBU3JELElBQXRGLEVBQTJGZ04sS0FBSyxDQUFDM0osQ0FBRCxDQUFMLENBQVM4SixXQUFwRztBQUNBN0ssUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQWN5SyxLQUFLLENBQUMzSixDQUFELENBQUwsQ0FBU3JELElBQW5DO0FBQ0FiLFFBQUFBLFNBQVMsSUFBRSxXQUFTNk4sS0FBSyxDQUFDM0osQ0FBRCxDQUFMLENBQVNyRCxJQUFsQixHQUF1QixJQUFsQztBQUNIOztBQUNEc0MsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkseUJBQXlCOEssWUFBWSxDQUFDL0osTUFBdEMsR0FBK0MsWUFBL0MsR0FBOERnSyxVQUFVLENBQUNoSyxNQUF6RSxHQUFrRixVQUFsRixHQUErRmlLLFlBQVksQ0FBQ2pLLE1BQTVHLEdBQXFILFVBQWpJO0FBQ0gsS0FURDtBQVdBOzs7Ozs7O0FBS0FwRSxJQUFBQSxTQUFTLENBQUNzTyxVQUFWLEdBQXVCLFlBQVk7QUFDL0I7QUFDQWxMLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVUsS0FBSzJELE1BQUwsR0FBY2xHLElBQXhCLEdBQStCLFNBQTNDO0FBQ0FzQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXJELFNBQVMsQ0FBQ2tGLE9BQVYsRUFBWjtBQUNBOUIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlyRCxTQUFTLENBQUNnSCxNQUFWLEVBQVo7QUFDQTVELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZckQsU0FBUyxDQUFDb0YsaUJBQVYsRUFBWjtBQUNBaEMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlyRCxTQUFTLENBQUNvRixpQkFBVixHQUE4QmhCLE1BQTFDO0FBQ0FoQixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXJELFNBQVMsQ0FBQ29GLGlCQUFWLEdBQThCLENBQTlCLEVBQWlDbUosbUJBQWpDLENBQXFEQyxNQUFqRTtBQUNBcEwsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlyRCxTQUFTLENBQUNnSCxNQUFWLEdBQW1CeUgsaUJBQS9CO0FBQ0FyTCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXJELFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0I2RyxpQkFBcEIsQ0FBc0MsZ0JBQXRDLEVBQXdELFlBQXhELENBQVosRUFUK0IsQ0FVL0I7O0FBRUQsVUFBRy9MLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0I2RyxpQkFBcEIsQ0FBc0MsZ0JBQXRDLEVBQXdELFlBQXhELEtBQXVFLElBQTFFLEVBQWdGO0FBQ2hGO0FBQ0k5SixVQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0JtQixVQUEvQixHQUEwQyxJQUExQztBQUNBbUgsVUFBQUEsVUFBVSxDQUFDLFlBQU07QUFBQ2xLLFlBQUFBLEVBQUUsQ0FBQ3NMLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixtQkFBcEIsRUFBd0MsSUFBeEMsRUFBNkMsSUFBN0MsRUFBa0QsVUFBbEQ7QUFBK0QsV0FBdkUsRUFBeUUsSUFBekUsQ0FBVixDQUZKLENBRThGO0FBQzdGOztBQUVBLFVBQUluTSxTQUFTLENBQUNrRixPQUFWLEdBQW9CNkcsaUJBQXBCLENBQXNDLGdCQUF0QyxFQUF3RCxZQUF4RCxLQUF5RSxLQUE3RSxFQUNBO0FBQ0k5SixRQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0I0SixjQUEvQjtBQUNIO0FBQ0osS0F0QkQ7QUF3QkE7Ozs7Ozs7O0FBTUFwTSxJQUFBQSxTQUFTLENBQUMwTyxXQUFWLEdBQXdCLFVBQVVDLEtBQVYsRUFBaUI7QUFFckMsVUFBSS9DLFdBQVcsR0FBRzNKLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQm1KLGFBQS9CLEVBQWxCOztBQUVBLFVBQUdDLFdBQVcsSUFBRW5MLFdBQWhCLEVBQTZCO0FBQzdCO0FBQ0l3QixVQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0JFLGVBQS9CO0FBQ0FVLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtEQUFaO0FBQ0F6QyxVQUFBQSxFQUFFLENBQUNzTCxXQUFILENBQWVDLElBQWYsQ0FBb0Isb0JBQXBCLEVBQXlDLGVBQXpDO0FBQ0F2TCxVQUFBQSxFQUFFLENBQUNzTCxXQUFILENBQWVDLElBQWYsQ0FBb0Isb0JBQXBCLEVBQXlDLGtCQUF6QztBQUNBbEssVUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCbUIsVUFBL0IsR0FBMEMsSUFBMUM7QUFDQW1ILFVBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQUNsSyxZQUFBQSxFQUFFLENBQUNzTCxXQUFILENBQWVDLElBQWYsQ0FBb0IsbUJBQXBCLEVBQXdDLElBQXhDLEVBQTZDLElBQTdDLEVBQWtELFVBQWxEO0FBQStELFdBQXZFLEVBQXlFLElBQXpFLENBQVYsQ0FOSixDQU04Rjs7QUFDMUZsSyxVQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0IrRCwwQkFBL0IsQ0FBMEQsSUFBMUQsRUFBK0R2RyxTQUFTLENBQUM0TyxnQkFBVixFQUEvRCxFQUE0RixLQUE1RixFQUFrRyxLQUFsRyxFQUF3RyxLQUF4RyxFQUE4RyxJQUE5RyxFQUFtSCxLQUFuSCxFQUF5SCxDQUF6SCxFQVBKLENBUUk7QUFDSCxTQWRvQyxDQWdCckM7QUFDQTtBQUNBO0FBQ0E7O0FBQ0gsS0FwQkQ7QUF3QkE7Ozs7OztBQU1JNU8sSUFBQUEsU0FBUyxDQUFDNk8sWUFBVixHQUF5QixVQUFVRixLQUFWLEVBQWlCO0FBQzFDLFVBQUksQ0FBQ3ZPLFlBQUQsSUFBaUIsQ0FBQ00sZUFBdEIsRUFBdUM7QUFDbkMsWUFBSXVCLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQm1CLFVBQS9CLElBQTZDLElBQWpELEVBQXVEO0FBQ25ELGNBQUksQ0FBQ2dMLEtBQUssQ0FBQ3JKLGdCQUFOLENBQXVCd0osaUJBQXZCLENBQXlDQyxRQUE5QyxFQUF3RDtBQUNwRCxnQkFBSSxDQUFDOU0scUJBQXFCLENBQUNPLFFBQXRCLENBQStCZ0IsU0FBcEMsRUFBK0M7QUFDM0Msa0JBQUltTCxLQUFLLENBQUNySixnQkFBTixDQUF1QkMsY0FBdkIsQ0FBc0NDLFVBQTFDLEVBQXNEO0FBQ2xEcEMsZ0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHlDQUFaO0FBQ0FELGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFXc0wsS0FBSyxDQUFDL0YsT0FBakIsR0FBMkIsT0FBdkM7QUFDQTFJLGdCQUFBQSx3QkFBd0IsQ0FBQ3NDLFFBQXpCLENBQWtDMkksZUFBbEMsR0FBb0Q2RCx3Q0FBcEQ7QUFDSCxlQUpELE1BS0s7QUFFRCxvQkFBSWhQLFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0I2RyxpQkFBcEIsQ0FBc0MsZ0JBQXRDLEVBQXdELFlBQXhELEtBQXlFLEtBQTdFLEVBQW9GO0FBQ2hGM0ksa0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVdzTCxLQUFLLENBQUMvRixPQUFqQixHQUEyQixPQUF2QztBQUVBM0csa0JBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQm1CLFVBQS9CLEdBQTRDLEtBQTVDO0FBQ0ExQixrQkFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCMkQsVUFBL0I7QUFDQWxFLGtCQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0J3RCxnQkFBL0I7O0FBRUEsc0JBQUkvRCxxQkFBcUIsQ0FBQ08sUUFBdEIsSUFBa0MsSUFBdEMsRUFBNEM7QUFDeEMsd0JBQUlQLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQndCLFlBQS9CLE1BQWlELFVBQXJELEVBQWlFO0FBQ2pFO0FBQ0k5RCx3QkFBQUEsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQ3lNLHFCQUFsQyxHQUEwRDFFLFNBQTFELENBQW9FLGtCQUFrQm9FLEtBQUssQ0FBQzdOLElBQXhCLEdBQStCLFdBQW5HLEVBQWdILElBQWhIO0FBQ0FnSyx3QkFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYjVLLDBCQUFBQSx3QkFBd0IsQ0FBQ3NDLFFBQXpCLENBQWtDMkksZUFBbEMsR0FBb0RDLG1CQUFwRDtBQUNBbEwsMEJBQUFBLHdCQUF3QixDQUFDc0MsUUFBekIsQ0FBa0M2RSx5QkFBbEMsR0FBOER2RCxpQkFBOUQ7QUFDQTVELDBCQUFBQSx3QkFBd0IsQ0FBQ3NDLFFBQXpCLENBQWtDcUksMEJBQWxDLEdBQStEL0csaUJBQS9EO0FBQ0E1RCwwQkFBQUEsd0JBQXdCLENBQUNzQyxRQUF6QixDQUFrQzhFLGlCQUFsQyxHQUFzRHhELGlCQUF0RDtBQUNBNUQsMEJBQUFBLHdCQUF3QixDQUFDc0MsUUFBekIsQ0FBa0NzQixpQkFBbEM7QUFDQWxELDBCQUFBQSxFQUFFLENBQUMwRCxRQUFILENBQVkrRyxTQUFaLENBQXNCLFVBQXRCO0FBQ0gseUJBUFMsRUFPUCxJQVBPLENBQVY7QUFRSDtBQUNKO0FBQ0o7QUFDSjtBQUNKO0FBQ0o7QUFDSjs7QUFFRCxZQUFJcEoscUJBQXFCLENBQUNPLFFBQXRCLENBQStCbUIsVUFBL0IsSUFBNkMsSUFBakQsRUFBdUQ7QUFDbkQsY0FBSTNELFNBQVMsQ0FBQ2tGLE9BQVYsR0FBb0I2RyxpQkFBcEIsQ0FBc0MsZ0JBQXRDLEVBQXdELFlBQXhELEtBQXlFLEtBQTdFLEVBQW9GO0FBQ2hGOUosWUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCNEosY0FBL0I7QUFDSDs7QUFFRCxjQUFJcE0sU0FBUyxDQUFDa0YsT0FBVixHQUFvQjZHLGlCQUFwQixDQUFzQyxnQkFBdEMsRUFBd0QsWUFBeEQsS0FBeUUsSUFBN0UsRUFBbUY7QUFDL0UsZ0JBQUkvTCxTQUFTLENBQUM0TyxnQkFBVixNQUFnQyxDQUFoQyxJQUFxQyxDQUFDbE8sZUFBMUMsRUFBMkQ7QUFDdkRBLGNBQUFBLGVBQWUsR0FBRyxJQUFsQjtBQUNBdUIsY0FBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCeUksV0FBL0IsQ0FBMkMsSUFBM0M7QUFDQTdILGNBQUFBLE9BQU8sQ0FBQ2dHLEtBQVIsQ0FBYyxVQUFkO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUFDSixLQW5GRDtBQXFGQTs7Ozs7OztBQU1BcEosSUFBQUEsU0FBUyxDQUFDa1AsdUJBQVYsR0FBb0MsVUFBVVAsS0FBVixFQUFpQixDQUVwRCxDQUZEO0FBSUE7Ozs7Ozs7O0FBTUEzTyxJQUFBQSxTQUFTLENBQUNtUCx3QkFBVixHQUFxQyxVQUFVaEksS0FBVixFQUFpQjtBQUNsRC9ELE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEQsS0FBWjtBQUNILEtBRkQ7QUFJQzs7Ozs7Ozs7O0FBT0RuSCxJQUFBQSxTQUFTLENBQUNvUCxPQUFWLEdBQW9CLFVBQVVDLFNBQVYsRUFBcUJDLFFBQXJCLEVBQStCO0FBQ2hEbE0sTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBV2dNLFNBQVgsR0FBdUIsSUFBdkIsR0FBOEJDLFFBQTFDO0FBQ0YsS0FGRDtBQUlBOzs7Ozs7Ozs7O0FBUUF0UCxJQUFBQSxTQUFTLENBQUN1UCxPQUFWLEdBQW9CLFVBQVVDLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCN0csT0FBekIsRUFBa0M7QUFDbEQzRyxNQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0JvQixlQUEvQjs7QUFDQSxjQUFRNEwsSUFBUjtBQUNJLGFBQUssQ0FBTDtBQUFPO0FBQ0hwTSxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWjtBQUNBLGNBQUlxTSxjQUFjLEdBQUdELE9BQU8sQ0FBQzlGLFVBQTdCO0FBQ0EsY0FBSWpCLFVBQVUsR0FBRytHLE9BQU8sQ0FBQy9HLFVBQXpCO0FBQ0EsY0FBSUMsUUFBUSxHQUFHOEcsT0FBTyxDQUFDOUcsUUFBdkI7QUFFQTFHLFVBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQmdJLGdCQUEvQixDQUFnRCxDQUFoRCxFQUFrRDlCLFVBQWxELEVBQTZEQyxRQUE3RCxFQUFzRStHLGNBQXRFO0FBRUE7O0FBQ0osYUFBSyxDQUFMO0FBQVE7QUFDSnRNLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDJCQUFaO0FBQ0EsY0FBSXNNLEtBQUssR0FBR0YsT0FBTyxDQUFDak8sVUFBcEI7QUFDQSxjQUFJa0gsVUFBVSxHQUFHK0csT0FBTyxDQUFDL0csVUFBekI7QUFDQSxjQUFJQyxRQUFRLEdBQUc4RyxPQUFPLENBQUM5RyxRQUF2QjtBQUVBMUcsVUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCZ0ksZ0JBQS9CLENBQWdELENBQWhELEVBQWtEOUIsVUFBbEQsRUFBNkRDLFFBQTdELEVBQXNFZ0gsS0FBdEU7QUFFQTs7QUFDSixhQUFLLENBQUw7QUFBUTtBQUNKdk0sVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQVo7QUFDQSxjQUFJdU0sS0FBSyxHQUFHSCxPQUFPLENBQUN6RixTQUFwQjtBQUNBLGNBQUl0QixVQUFVLEdBQUcrRyxPQUFPLENBQUMvRyxVQUF6QjtBQUNBLGNBQUlDLFFBQVEsR0FBRzhHLE9BQU8sQ0FBQzlHLFFBQXZCO0FBRUExRyxVQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0JnSSxnQkFBL0IsQ0FBZ0QsQ0FBaEQsRUFBa0Q5QixVQUFsRCxFQUE2REMsUUFBN0QsRUFBc0VpSCxLQUF0RTtBQUVBOztBQUNKLGFBQUssQ0FBTDtBQUFRO0FBQ0p4TSxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQ0FBWjtBQUNBLGNBQUl3TSxHQUFHLEdBQUdKLE9BQU8sQ0FBQ3BGLEdBQWxCO0FBQ0EsY0FBSTNCLFVBQVUsR0FBRytHLE9BQU8sQ0FBQy9HLFVBQXpCO0FBQ0EsY0FBSUMsUUFBUSxHQUFHOEcsT0FBTyxDQUFDOUcsUUFBdkI7QUFFQTFHLFVBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQmdJLGdCQUEvQixDQUFnRCxDQUFoRCxFQUFrRDlCLFVBQWxELEVBQTZEQyxRQUE3RCxFQUFzRWtILEdBQXRFO0FBRUE7O0FBQ0osYUFBSyxDQUFMO0FBQVE7QUFDSnpNLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaO0FBQ0EsY0FBSXlNLEtBQUssR0FBR0wsT0FBTyxDQUFDaEgsUUFBcEI7QUFDQSxjQUFJQyxVQUFVLEdBQUcrRyxPQUFPLENBQUMvRyxVQUF6QjtBQUNBLGNBQUlDLFFBQVEsR0FBRzhHLE9BQU8sQ0FBQzlHLFFBQXZCO0FBRUExRyxVQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0JnSSxnQkFBL0IsQ0FBZ0QsQ0FBaEQsRUFBa0Q5QixVQUFsRCxFQUE2REMsUUFBN0QsRUFBc0VtSCxLQUF0RTtBQUVBOztBQUNKLGFBQUssQ0FBTDtBQUFRO0FBQ0oxTSxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx5QkFBWjtBQUNBLGNBQUk4RCxLQUFLLEdBQUdzSSxPQUFPLENBQUNsRyxJQUFwQjtBQUNBLGNBQUliLFVBQVUsR0FBRytHLE9BQU8sQ0FBQy9HLFVBQXpCO0FBQ0EsY0FBSUMsUUFBUSxHQUFHOEcsT0FBTyxDQUFDOUcsUUFBdkI7QUFFQTFHLFVBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQmdJLGdCQUEvQixDQUFnRCxDQUFoRCxFQUFrRDlCLFVBQWxELEVBQTZEQyxRQUE3RCxFQUFzRXhCLEtBQXRFO0FBRUE7O0FBQ0osYUFBSyxDQUFMO0FBQVE7QUFDSi9ELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFaO0FBQ0EsY0FBSThELEtBQUssR0FBR3NJLE9BQU8sQ0FBQ2xHLElBQXBCO0FBQ0EsY0FBSWIsVUFBVSxHQUFHK0csT0FBTyxDQUFDL0csVUFBekI7QUFDQSxjQUFJQyxRQUFRLEdBQUc4RyxPQUFPLENBQUM5RyxRQUF2QjtBQUVBMUcsVUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCZ0ksZ0JBQS9CLENBQWdELENBQWhELEVBQWtEOUIsVUFBbEQsRUFBNkRDLFFBQTdELEVBQXNFeEIsS0FBdEU7QUFFQTs7QUFDSixhQUFLLENBQUw7QUFBUTtBQUNKL0QsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksb0NBQVo7QUFDQSxjQUFJOEQsS0FBSyxHQUFHc0ksT0FBTyxDQUFDbEcsSUFBcEI7QUFDQSxjQUFJYixVQUFVLEdBQUcrRyxPQUFPLENBQUMvRyxVQUF6QjtBQUNBLGNBQUlDLFFBQVEsR0FBRzhHLE9BQU8sQ0FBQzlHLFFBQXZCO0FBRUExRyxVQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0JnSSxnQkFBL0IsQ0FBZ0QsQ0FBaEQsRUFBa0Q5QixVQUFsRCxFQUE2REMsUUFBN0QsRUFBc0V4QixLQUF0RTtBQUVBOztBQUNKLGFBQUssQ0FBTDtBQUFRO0FBQ0ovRCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx3QkFBWjtBQUNBLGNBQUk4RCxLQUFLLEdBQUdzSSxPQUFPLENBQUNsRyxJQUFwQjtBQUNBLGNBQUliLFVBQVUsR0FBRytHLE9BQU8sQ0FBQy9HLFVBQXpCO0FBQ0EsY0FBSUMsUUFBUSxHQUFHOEcsT0FBTyxDQUFDOUcsUUFBdkI7QUFFQTFHLFVBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQmdJLGdCQUEvQixDQUFnRCxDQUFoRCxFQUFrRDlCLFVBQWxELEVBQTZEQyxRQUE3RCxFQUFzRXhCLEtBQXRFO0FBRUE7O0FBQ0osYUFBSyxFQUFMO0FBQVM7QUFDTC9ELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHlCQUFaO0FBQ0EsY0FBSThELEtBQUssR0FBR3NJLE9BQU8sQ0FBQ2xHLElBQXBCO0FBQ0EsY0FBSWIsVUFBVSxHQUFHK0csT0FBTyxDQUFDL0csVUFBekI7QUFDQSxjQUFJQyxRQUFRLEdBQUc4RyxPQUFPLENBQUM5RyxRQUF2QjtBQUVBMUcsVUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCZ0ksZ0JBQS9CLENBQWdELEVBQWhELEVBQW1EOUIsVUFBbkQsRUFBOERDLFFBQTlELEVBQXVFeEIsS0FBdkU7QUFFQTs7QUFDSixhQUFLLEVBQUw7QUFBUztBQUNML0QsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUNBQVo7QUFDQSxjQUFJOEQsS0FBSyxHQUFHc0ksT0FBTyxDQUFDbEcsSUFBcEI7QUFDQSxjQUFJYixVQUFVLEdBQUcrRyxPQUFPLENBQUMvRyxVQUF6QjtBQUNBLGNBQUlDLFFBQVEsR0FBRzhHLE9BQU8sQ0FBQzlHLFFBQXZCO0FBRUExRyxVQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0JnSSxnQkFBL0IsQ0FBZ0QsRUFBaEQsRUFBbUQ5QixVQUFuRCxFQUE4REMsUUFBOUQsRUFBdUV4QixLQUF2RTtBQUVBOztBQUNILGFBQUssRUFBTDtBQUFTO0FBQ04vRCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQ0FBWjtBQUNBLGNBQUk4RCxLQUFLLEdBQUdzSSxPQUFPLENBQUNsRyxJQUFwQjtBQUNBLGNBQUliLFVBQVUsR0FBRytHLE9BQU8sQ0FBQy9HLFVBQXpCO0FBQ0EsY0FBSUMsUUFBUSxHQUFHOEcsT0FBTyxDQUFDOUcsUUFBdkI7QUFFQTFHLFVBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQmdJLGdCQUEvQixDQUFnRCxFQUFoRCxFQUFtRDlCLFVBQW5ELEVBQThEQyxRQUE5RCxFQUF1RXhCLEtBQXZFO0FBRUE7O0FBQ0osYUFBSyxFQUFMO0FBQVM7QUFDTC9ELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtDQUFaO0FBQ0EsY0FBSThELEtBQUssR0FBR3NJLE9BQU8sQ0FBQ2xHLElBQXBCO0FBQ0EsY0FBSWIsVUFBVSxHQUFHK0csT0FBTyxDQUFDL0csVUFBekI7QUFDQSxjQUFJQyxRQUFRLEdBQUc4RyxPQUFPLENBQUM5RyxRQUF2QjtBQUVBMUcsVUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCZ0ksZ0JBQS9CLENBQWdELEVBQWhELEVBQW1EOUIsVUFBbkQsRUFBOERDLFFBQTlELEVBQXVFeEIsS0FBdkU7QUFFQTs7QUFDSixhQUFLLEVBQUw7QUFBUztBQUNML0QsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0NBQVo7QUFDQSxjQUFJOEQsS0FBSyxHQUFHc0ksT0FBTyxDQUFDbEcsSUFBcEI7QUFDQSxjQUFJYixVQUFVLEdBQUcrRyxPQUFPLENBQUMvRyxVQUF6QjtBQUNBLGNBQUlDLFFBQVEsR0FBRzhHLE9BQU8sQ0FBQzlHLFFBQXZCO0FBRUExRyxVQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0IrSixhQUEvQjtBQUVBOztBQUNKO0FBL0hKO0FBaUlILEtBbklEO0FBb0lGO0FBNTNDNkIsQ0FBVCxDQUExQjtBQWc0Q0F3RCxNQUFNLENBQUNDLE9BQVAsR0FBZS9OLHFCQUFmIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJpYWJsZXNcclxudmFyIFBob3RvblJlZjtcclxudmFyIHN0YXRlVGV4dD1cIlwiO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBTaG93Um9vbSA9IGZhbHNlO1xyXG52YXIgR2FtZUZpbmlzaGVkID0gZmFsc2U7XHJcbnZhciBJc01hc3RlckNsaWVudCA9IGZhbHNlO1xyXG52YXIgVG90YWxUaW1lciA9IDMwO1xyXG52YXIgVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbnZhciBTY2hlZHVsYXIgPSBudWxsO1xyXG52YXIgTWF4U3R1ZGVudHMgPSA2O1xyXG52YXIgUmVzdGFydFNwZWN0YXRlID0gZmFsc2U7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIFJvb21Qcm9wZXJ0eS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSb29tUHJvcGVydHk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlJvb21Qcm9wZXJ0eVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIFBsYXllcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEluaXRpYWxTZXR1cDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBQbGF5ZXJHYW1lSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFR1cm5OdW1iZXI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIEFwcF9JbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEFwcF9JbmZvPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJBcHBfSW5mb1wiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIEFwcElEOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiQXBwIGlkIGZvcm0gcGhvdG9uIGRhc2hib2FyZFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBBcHBWZXJzaW9uOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiQXBwIHZlcnNpb24gZm9yIHBob3RvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBXc3M6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJJc1NlY3VyZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJJZiBwaG90b24gc2hvdWxkIHVzZSBzZWN1cmUgYW5kIHJlbGlhYmxlIHByb3RvY29sc1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBNYXN0ZXJTZXJ2ZXI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJtYXN0ZXIgc2VydmVyIGZvciBwaG90b24gdG8gY29ubmVjdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBGYkFwcElEOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiRkIgYXBwIGlkIHVzZWQgZm9yIEZCIGF1dGhlcml6YXRpb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBNdWx0aXBsYXllckNvbnRyb2xsZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIk11bHRpcGxheWVyQ29udHJvbGxlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIFBob3RvbkFwcEluZm86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBBcHBfSW5mbyxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgICAgTWF4UGxheWVyczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LCBcclxuICAgICAgICBNYXhTcGVjdGF0b3JzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sIFxyXG4gICAgICAgIE1vZGVTZWxlY3Rpb246IHsgLy8gMSBtZWFucyBib3QgLCAyIG1lYW5zIHJlYWwgcGxheWVyc1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LCBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHsgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICAgICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgICB9LFxyXG5cclxuICAgIFJlc2V0QWxsRGF0YSgpXHJcbiAgICB7XHJcbiAgICAgICAgUGhvdG9uUmVmPW51bGw7XHJcbiAgICAgICAgc3RhdGVUZXh0PVwiXCI7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbiAgICAgICAgU2hvd1Jvb20gPSBmYWxzZTtcclxuICAgICAgICBHYW1lRmluaXNoZWQgPSBmYWxzZTtcclxuICAgICAgICBJc01hc3RlckNsaWVudCA9IGZhbHNlO1xyXG4gICAgICAgIFRvdGFsVGltZXIgPSAzMDtcclxuICAgICAgICBUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICBTY2hlZHVsYXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICAgICAgTWF4U3R1ZGVudHMgPSA2O1xyXG4gICAgICAgIFJlc3RhcnRTcGVjdGF0ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIC8vdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIGNyZWF0ZWRcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLlJlc2V0QWxsRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlTW9kZVNlbGVjdGlvbihfdmFsKS8vIDEgbWVhbnMgYm90ICwgMiBtZWFucyByZWFsIHBsYXllcnNcclxuICAgIHtcclxuICAgICAgICB0aGlzLk1vZGVTZWxlY3Rpb249X3ZhbDtcclxuICAgIH0sXHJcblxyXG4gICAgR2V0U2VsZWN0ZWRNb2RlKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Nb2RlU2VsZWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IEluaXRpYWxpemUgc29tZSBlc3NlbnRhaWxzIGRhdGEgZm9yIG11bHRpcGxheWVyIGNvbnRyb2xsZXIgY2xhc3NcclxuICAgIEBtZXRob2QgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXJcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLkluaXRpYWxpemVQaG90b24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coQXBwSW5mbyk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZiA9IG5ldyBEZW1vTG9hZEJhbGFuY2luZygpO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuTGVhdmVSb29tPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9vbU5hbWU9XCJcIjtcclxuICAgICAgICB0aGlzLk1lc3NhZ2U9XCJcIjtcclxuICAgICAgICBTaG93Um9vbT1mYWxzZTtcclxuICAgICAgICB0aGlzLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjaGVjayByZWZlcmVuY2UgdG8gc29tZSB2YXJpYWJsZXMgYW5kIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgIH0sXHJcblxyXG4gICAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJlbW92ZSBwZXJzaXN0IG5vZGUgd2hlbiB3YW50IHRvIHJlc3RhcnQgc2NlbmVcclxuICAgIEBtZXRob2QgUmVtb3ZlUGVyc2lzdE5vZGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZT1udWxsO1xyXG4gICAgICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gZ2V0IG5hbWUgb2YgY3VycmVudCBvcGVuZWQgc2NlbmVcclxuICAgIEBtZXRob2QgZ2V0U2NlbmVOYW1lXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge3N0cmluZ30gc2NlbmVOYW1lXHJcbiAgICAqKi8gXHJcbiAgICBnZXRTY2VuZU5hbWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzY2VuZU5hbWU7XHJcbiAgICAgICAgdmFyIF9zY2VuZUluZm9zID0gY2MuZ2FtZS5fc2NlbmVJbmZvcztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9zY2VuZUluZm9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKF9zY2VuZUluZm9zW2ldLnV1aWQgPT0gY2MuZGlyZWN0b3IuX3NjZW5lLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gX3NjZW5lSW5mb3NbaV0udXJsO1xyXG4gICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gc2NlbmVOYW1lLnN1YnN0cmluZyhzY2VuZU5hbWUubGFzdEluZGV4T2YoJy8nKSsxKS5tYXRjaCgvW15cXC5dKy8pWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjZW5lTmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBzZXQgXCJTaG93Um9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlU2hvd1Jvb21fQm9vbFxyXG4gICAgQHBhcmFtIHtib29sZWFufSBfc3RhdGVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgKiovIFxyXG4gICAgVG9nZ2xlU2hvd1Jvb21fQm9vbChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgU2hvd1Jvb209X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIHNldCBcIkxlYXZlUm9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlTGVhdmVSb29tX0Jvb2xcclxuICAgIEBwYXJhbSB7Ym9vbGVhbn0gX3N0YXRlXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICoqLyBcclxuICAgIFRvZ2dsZUxlYXZlUm9vbV9Cb29sKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxlYXZlUm9vbT1fc3RhdGU7XHJcbiAgICB9LFxyXG4gICAgIFxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIFBob3RvbiBcIlBob3RvblJlZlwiIGluc3RhbmNlIGNyZWF0ZWQgYnkgbXVsdGlwbGF5ZXIgY2xhc3NcclxuICAgIEBtZXRob2QgZ2V0UGhvdG9uUmVmXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gUGhvdG9uUmVmXHJcbiAgICAqKi8gXHJcbiAgICBnZXRQaG90b25SZWYoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQaG90b25SZWY7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBteUFjdG9yIGluc3RhbmNlIGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFBob3RvbkFjdG9yXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gQWN0b3JcclxuICAgICoqLyBcclxuICAgIFBob3RvbkFjdG9yKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUGhvdG9uUmVmLm15QWN0b3IoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIG15Um9vbUFjdG9yc0FycmF5IGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFJvb21BY3RvcnNcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBBY3RvclxyXG4gICAgKiovIFxyXG4gICAgUm9vbUFjdG9ycygpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgaXNTcGVjdGF0ZSB2YXJpYWJsZSBmcm9tIGN1c3RvbSBwcm9wZXJ0eSBvZiBjdXJyZW50IGFjdG9yXHJcbiAgICBAbWV0aG9kIENoZWNrU3BlY3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gaXNTcGVjdGF0ZVxyXG4gICAgKiovIFxyXG4gICAgQ2hlY2tTcGVjdGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgIHJldHVybiBQaG90b25SZWYubXlBY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgSW5pdGlhbGl6ZSBwaG90b24gd2l0aCBhcHBpZCxhcHAgdmVyc2lvbiwgV3NzIGV0Y1xyXG4gICAgQG1ldGhvZCBJbml0aWFsaXplUGhvdG9uXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEluaXRpYWxpemVQaG90b24oKVxyXG4gICAge1xyXG4gICAgICAgIEFwcEluZm8uQXBwSWQ9dGhpcy5QaG90b25BcHBJbmZvLkFwcElEO1xyXG4gICAgICAgIEFwcEluZm8uQXBwVmVyc2lvbj10aGlzLlBob3RvbkFwcEluZm8uQXBwVmVyc2lvbjtcclxuICAgICAgICBBcHBJbmZvLldzcz10aGlzLlBob3RvbkFwcEluZm8uV3NzO1xyXG4gICAgICAgIEFwcEluZm8uTWFzdGVyU2VydmVyPXRoaXMuUGhvdG9uQXBwSW5mby5NYXN0ZXJTZXJ2ZXI7XHJcbiAgICAgICAgQXBwSW5mby5GYkFwcElkPXRoaXMuUGhvdG9uQXBwSW5mby5GYkFwcElEOyAgXHJcbiAgICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGNvbm5lY3Rpb24gcmVxdWVzdCB0byBwaG90b25cclxuICAgIEBtZXRob2QgUmVxdWVzdENvbm5lY3Rpb25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgUmVxdWVzdENvbm5lY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5zdGF0ZT09NSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGNvbm5lY3RlZFwiKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5zdGFydCgpOyAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBEaXNjb25uZWN0IGZyb20gcGhvdG9uXHJcbiAgICBAbWV0aG9kIERpc2Nvbm5lY3RQaG90b25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgRGlzY29ubmVjdFBob3RvbiAoKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSAgfHxQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgUGhvdG9uUmVmLmRpc2Nvbm5lY3QoKTsgICBcclxuICAgICAgICB0aGlzLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAgICAgLy9QaG90b25SZWYubGVhdmVSb29tKCk7XHJcbiAgICAgICAgdGhpcy5SZXNldFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGluc2lkZSBhbnkgcm9vbSBvciBsb2JieSBvciBjb25uZWN0ZWQgdG8gcGhvdG9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXNldGluZyBmZXcgdmFsdWVzXHJcbiAgICBAbWV0aG9kIFJlc2V0U3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgUmVzZXRTdGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5MZWF2ZVJvb209ZmFsc2U7ICAgIFxyXG4gICAgICAgIHRoaXMuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICBTaG93Um9vbT1mYWxzZTtcclxuICAgICAgICBzdGF0ZVRleHQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gcm9vbSBuYW1lIGdvdCBpbnB1dCBmcm9tIGdhbWVcclxuICAgIEBtZXRob2QgT25Sb29tTmFtZUNoYW5nZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBPblJvb21OYW1lQ2hhbmdlKG5hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Sb29tTmFtZT1uYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIG1lc3NhZ2Ugd2luZG93IGdvdCBpbnB1dCBmcm9tIGdhbWVcclxuICAgIEBtZXRob2QgT25NZXNzYWdlQ2hhbmdlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbXNnXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgT25NZXNzYWdlQ2hhbmdlKG1zZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLk1lc3NhZ2U9bXNnO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHVwZGF0ZSBjdXN0b20gcm9vbSBwcm9wZXJ0aWVzXHJcbiAgICBAbWV0aG9kIFVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXMoX3BsYXllclVwZGF0ZT1mYWxzZSxfcGxheWVyVmFsdWU9MCxfaW5pdGlhbFNldHVwVXBkYXRlPWZhbHNlLF9pbml0aWFsU2V0dXBWYWx1ZT1mYWxzZSxfcGxheWVyR2FtZUluZm9VcGRhdGU9ZmFsc2UsX3BsYXllckdhbWVJbmZvVmFsdWU9bnVsbCxfdHVybk51bWJlclVwZGF0ZT1mYWxzZSxfdHVybk51bWJlcnZhbHVlPTApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX3BsYXllclVwZGF0ZSlcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyXCIsX3BsYXllclZhbHVlLHRydWUpO1xyXG5cclxuICAgICAgICBpZihfaW5pdGlhbFNldHVwVXBkYXRlKVxyXG4gICAgICAgICAgICBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIixfaW5pdGlhbFNldHVwVmFsdWUsdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoX3BsYXllckdhbWVJbmZvVXBkYXRlKVxyXG4gICAgICAgICAgICBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLF9wbGF5ZXJHYW1lSW5mb1ZhbHVlLHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKF90dXJuTnVtYmVyVXBkYXRlKVxyXG4gICAgICAgICAgICBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsX3R1cm5OdW1iZXJ2YWx1ZSx0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjcmVhdGUgcm9vbSByZXF1ZXN0XHJcbiAgICBAbWV0aG9kIENyZWF0ZVJvb21cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ3JlYXRlUm9vbSAoKSB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKT09dHJ1ZSB8fFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSB8fCBQaG90b25SZWYuc3RhdGU9PTgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09ZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGE9bmV3IFJvb21Qcm9wZXJ0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9kYXRhLlBsYXllcj0wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPXtcclxuICAgICAgICAgICAgICAgICAgICAgIFwiaXNWaXNpYmxlXCI6dHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBcImlzT3BlblwiOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICBcIm1heFBsYXllcnNcIjp0aGlzLk1heFBsYXllcnMrdGhpcy5NYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJjdXN0b21HYW1lUHJvcGVydGllc1wiOl9kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHsgSXNTcGVjdGF0ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIsIHtDb3VudGVyOlRvdGFsVGltZXJ9KTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFJvb21JRD1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLmNyZWF0ZVJvb20oXCJSb29tX1wiK1Jvb21JRCxyb29tT3B0aW9ucyk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBqb2luIHJvb20gcmVxdWVzdCBieSBuYW1lXHJcbiAgICBAbWV0aG9kIEpvaW5Sb29tXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gX3Jvb21OYW1lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgSm9pblJvb20gKF9yb29tTmFtZSkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5zdGF0ZT09NSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSB8fFBob3RvblJlZi5zdGF0ZT09OClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT1mYWxzZSB8fCBQaG90b25SZWYuc3RhdGUhPTgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByb29tT3B0aW9ucyA9e1xyXG4gICAgICAgICAgICAgICAgICAgIFwiaXNWaXNpYmxlXCI6dHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpc09wZW5cIjpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1heFBsYXllcnNcIjp0aGlzLk1heFBsYXllcnMrdGhpcy5NYXhTcGVjdGF0b3JzXHJcbiAgICAgICAgICAgICAgICAgICAgLy9cImN1c3RvbUdhbWVQcm9wZXJ0aWVzXCI6e1wiUm9vbUVzc2VudGlhbHNcIjoge0lzU3BlY3RhdGU6dHJ1ZX19XHJcbiAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHsgSXNTcGVjdGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIsIHtDb3VudGVyOlRvdGFsVGltZXJ9KTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLmpvaW5Sb29tKF9yb29tTmFtZSxyb29tT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGpvaW4gcmFuZG9tIHJvb21cclxuICAgIEBtZXRob2QgSm9pblJhbmRvbVJvb21cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIEpvaW5SYW5kb21Sb29tICgpIHtcclxuICAgIGlmKFBob3RvblJlZi5zdGF0ZT09NSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSB8fFBob3RvblJlZi5zdGF0ZT09OClcclxuICAgIHtcclxuICAgICAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09ZmFsc2UgfHwgUGhvdG9uUmVmLnN0YXRlIT04KVxyXG4gICAgICAgIHsgIFxyXG4gICAgICAgICAgICB2YXIgX2RhdGE9bmV3IFJvb21Qcm9wZXJ0eSgpO1xyXG4gICAgICAgICAgICBfZGF0YS5QbGF5ZXI9MDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByb29tT3B0aW9ucyA9e1xyXG4gICAgICAgICAgICAgICAgLy9cImV4cGVjdGVkTWF4UGxheWVyc1wiOnRoaXMuTWF4UGxheWVycytNYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgICAgICAgXCJleHBlY3RlZEN1c3RvbVJvb21Qcm9wZXJ0aWVzXCI6X2RhdGFcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7IElzU3BlY3RhdGU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIiwge0NvdW50ZXI6VG90YWxUaW1lcn0pO1xyXG4gICAgICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcblxyXG4gICAgICAgICAgICBQaG90b25SZWYuam9pblJhbmRvbVJvb20ocm9vbU9wdGlvbnMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpXHJcbiAgICB9XHJcbiAgICAgICAgXHJcbn0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBjYXJkIGluZGV4IG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kQ2FyZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kQ2FyZERhdGEgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgY2FyZCBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDUsIHsgQ2FyZERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGdhbWUgb3ZlciBjYWxsXHJcbiAgICBAbWV0aG9kIFNlbmRHYW1lT3ZlclxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRHYW1lT3ZlciAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBnYW1lIG92ZXIgY2FsbFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCg2LCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBiYWNrcnVwdCBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRCYW5rcnVwdERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kQmFua3J1cHREYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGJhbmtydXBjeSBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDksIHsgRGF0YTogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVyc30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIFBsYXllciBEYXRhIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmREYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBsYXllciBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDEsIHsgUGxheWVySW5mbzogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBvbmUgcXVlc3Rpb24gRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRPbmVRdWVzdGlvbkRhdGEgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIGRhdGFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoNywgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgICB9LFxyXG4gIFxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBwcm9maXQgb3IgbG9zcyB0byB5b3VyIHBhc3J0bmVyXHJcbiAgICBAbWV0aG9kIFNlbmRQYXJ0bmVyUHJvZml0TG9zc1xyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRQYXJ0bmVyUHJvZml0TG9zcyAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgxMywgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIG9uZSBxdWVzdGlvbiByZXNwb25zZSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiByZXNwb25zZSBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDgsIHsgRGF0YTogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVyc30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBkaWNlIGRhdGFcclxuICAgIEBtZXRob2QgRGljZVJvbGxFdmVudFxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIERpY2VSb2xsRXZlbnQgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZGljZSBjb3VudFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgzLCB7IERpY2VDb3VudDogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgZ28gYmFjayBzcGFjZXMgZGF0YVxyXG4gICAgQG1ldGhvZCBTZW5kR29CYWNrU3BhY2VEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZEdvQmFja1NwYWNlRGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZCBnbyBiYWNrIHNwYWNlcyBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDEwLCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnN9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmRpbmcgb3BlbiBpbnZpdGF0aW9uIHRvIGFsbCBwbGF5ZXJzIGZvciBwYXJ0bmVyIHNoaXBcclxuICAgIEBtZXRob2QgU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBhcnRuZXIgc2hpcCBvZmZlclwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgxMSwgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgICB9LFxyXG4gIFxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZGluZyBwYXJ0bmVyIGFuc3dlciBkYXRhIChhY2NlcHQgb3IgcmVqZWN0KVxyXG4gICAgQG1ldGhvZCBTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBwYXJ0ZW5yc2hpcCBhbnN3ZXIgZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgxMiwgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIHVzZXIgaWQgb2YgcGxheWVyIHRvIGFsbCBvdGhlciB3aG8gaGFkIGNvbXBsZXRlZCB0aGVpciB0dXJuXHJcbiAgICBAbWV0aG9kIFN5bmNUdXJuQ29tcGxldGlvblxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU3luY1R1cm5Db21wbGV0aW9uIChfZGF0YSkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHR1cm4gY29tcGxldGlvbiBkYXRhXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDQsIHsgVUlEOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU3RhcnQgVHVybiBmb3IgaW5pdGlhbCB0dXJuXHJcbiAgICBAbWV0aG9kIFN0YXJ0VHVyblxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU3RhcnRUdXJuIChfZGF0YSkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdGFydGluZyBUdXJuXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDIsIHsgVHVybk51bWJlcjogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgXHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTaG93IHRvYXN0IG1lc3NhZ2Ugb24gdGhlIGNvbnNvbGVcclxuICAgIEBtZXRob2QgU2hvd1RvYXN0XHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIHNob3duIFxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFNob3dUb2FzdDpmdW5jdGlvbihtc2cpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0b2FzdCBtZXNzYWdlOiBcIittc2cpO1xyXG4gICAgfSxcclxuXHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZWNlaXZlIGV2ZW50IGZyb20gcGhvdG9uIHJhaXNlIG9uIFxyXG4gICAgQG1ldGhvZCBDYWxsUmVjaWV2ZUV2ZW50XHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ2FsbFJlY2lldmVFdmVudDpmdW5jdGlvbihfZXZlbnRDb2RlLF9zZW5kZXJOYW1lLF9zZW5kZXJJRCxfZGF0YSlcclxuICAgIHtcclxuICAgICAgICB2YXIgSW5zdGFuY2VOdWxsPXRydWU7XHJcblxyXG4gICAgICAgIC8vdG8gY2hlY2sgaWYgaW5zdGFuY2UgaXMgbnVsbCBpbiBjYXNlIGNsYXNzIGluc3RhbmNlIGlzIG5vdCBsb2FkZWQgYW5kIGl0cyByZWNlaXZlcyBjYWxsYmFja1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSW5zdGFuY2VOdWxsPXRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYWxsUmVjaWV2ZUV2ZW50KF9ldmVudENvZGUsX3NlbmRlck5hbWUsX3NlbmRlcklELF9kYXRhKTtcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbnN0YW5jZU51bGw9ZmFsc2U7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLF9zZW5kZXJOYW1lLF9zZW5kZXJJRCxfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBEaXNjb25uZWN0RGF0YSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlc3RhcnRHYW1lKF90aW1lcj0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgICAgICAgICB9LCBfdGltZXIpO1xyXG4gICAgICAgICAgIC8vIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgQ2hlY2tNYXN0ZXJDbGllbnQoX2lkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfaXNNYXN0ZXIgPSBmYWxzZTtcclxuICAgICAgICBpZiAoUGhvdG9uUmVmLm15Um9vbU1hc3RlckFjdG9yTnIoKSA9PSBfaWQgJiYgUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yID09IF9pZCkge1xyXG4gICAgICAgICAgICBfaXNNYXN0ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICBJc01hc3RlckNsaWVudCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoX2lzTWFzdGVyKTtcclxuICAgICAgICByZXR1cm4gX2lzTWFzdGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfaXNNYXN0ZXIgPSBmYWxzZTtcclxuICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yID09IFBob3RvblJlZi5teVJvb21NYXN0ZXJBY3Rvck5yKCkpIHtcclxuICAgICAgICAgICAgX2lzTWFzdGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgSXNNYXN0ZXJDbGllbnQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoX2lzTWFzdGVyKTtcclxuICAgICAgICByZXR1cm4gX2lzTWFzdGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXNldFJvb21WYWx1ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBHZXRSZWFsQWN0b3JzKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX3JlYWxQbGF5ZXIgPSAwO1xyXG4gICAgICAgIHZhciBBbGxQbGF5ZXJzID0gUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEFsbFBsYXllcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChBbGxQbGF5ZXJzW2luZGV4XS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3JlYWxQbGF5ZXIrKztcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfcmVhbFBsYXllcjtcclxuICAgIH0sXHJcblxyXG4gICAgUm9vbUNvdW50ZXIoX3RpbWVyKVxyXG4gICAge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gICAgICAgIHZhciBfZGF0YSA9IG51bGw7XHJcbiAgICAgICAgU2NoZWR1bGFyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChJc01hc3RlckNsaWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aW1lciA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGltZXItLTtcclxuICAgICAgICAgICAgICAgICAgICAvL19kYXRhID0geyBDb3VudGVyOiBfdGltZXIgfTtcclxuICAgICAgICAgICAgICAgICAgICAvL1Bob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIsIF9kYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoX3RpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJvb21Db3VudGVyKF90aW1lcik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0aW1lciBjb21wbGV0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuR2V0UmVhbEFjdG9ycygpID4gMSkgeyAvL2lmIGhhcyBtb3JlIHRoYW4gb25lIHBsYXllciBzdGFydCByZWFsIGdhbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TZW5kUm9vbUNvbXBsZXRlZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgLy9zdGFydCBnYW1lIHdpdGggYm90XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVG9nZ2xlTW9kZVNlbGVjdGlvbigxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlRvZ2dsZVNob3dSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnM9MjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luZWRSb29tPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIix0cnVlLHRydWUsXCJHYW1lUGxheVwiKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBQcm9jZXNzQ291bnRlcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9tYXN0ZXIgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCk7XHJcbiAgICAgICAgaWYgKF9tYXN0ZXIpIHsgXHJcbiAgICAgICAgICAgIGlmICghVGltZXJTdGFydGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUaW1lclN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9jb3VudGVyID0gUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIpW1wiQ291bnRlclwiXTtcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Sb29tQ291bnRlcihfY291bnRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGNhcmQgaW5kZXggb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRSb29tQ29tcGxldGVkRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRSb29tQ29tcGxldGVkRGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBSb29tQ29tcGxldGVkRGF0YVwiKTtcclxuICAgICAgLy8gIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDE0LCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gICAgUm9vbUNvbXBsZXRlZCgpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcmVhbFBsYXllciA9IHRoaXMuR2V0UmVhbEFjdG9ycygpO1xyXG5cclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMgPSBfcmVhbFBsYXllcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgcmVxdWlyZWQgcGxheWVycyBqb2luZWQsIHN0YXJ0aW5nIHRoZSBnYW1lLi5cIilcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTsgfSwgMTAwMCk7IC8vZnVuY3Rpb24gaW4gdWkgbWFuYWdlclxyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXModHJ1ZSwgX3JlYWxQbGF5ZXIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIG51bGwsIGZhbHNlLCAwKTtcclxuICAgICAgICBcclxuICAgICAgICB9XHJcbn0sXHJcbiAgICAvL2NhbGxlZCBldmVyeSBmcmFtZVxyXG4gICAgdXBkYXRlIChkdCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBzb21lIGNoYW5nZSBpbiBjb25uZWN0aW9uIHN0YXRlXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25TdGF0ZUNoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gc3RhdGVcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vblN0YXRlQ2hhbmdlPWZ1bmN0aW9uKHN0YXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8jcmVnaW9uIENvbm5lY3Rpb24gU3RhdGVzXHJcbiAgICAgICAgICAgIC8vc3RhdGUgMSA6IGNvbm5lY3RpbmdUb05hbWVTZXJ2ZXJcclxuICAgICAgICAgICAgLy9TdGF0ZSAyIDogQ29ubmVjdGVkVG9OYW1lU2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgMyA6IENvbm5lY3RpbmdUb01hc3RlclNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDQgOiBDb25uZWN0ZWRUb01hc3RlclNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDU6ICBKb2luZWRMb2JieVxyXG4gICAgICAgICAgICAvL1N0YXRlIDYgOiBDb25uZWN0aW5nVG9HYW1lc2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgNyA6IENvbm5lY3RlZFRvR2FtZXNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDggOiBKb2luZWRcclxuICAgICAgICAgICAgLy9TdGF0ZSAxMDogRGlzY29ubmVjdGVkIFxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIHZhciBMQkMgPSBQaG90b24uTG9hZEJhbGFuY2luZy5Mb2FkQmFsYW5jaW5nQ2xpZW50O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXRlQ29kZTogXCIrc3RhdGUrXCIgXCIrTEJDLlN0YXRlVG9OYW1lKHN0YXRlKSk7XHJcblxyXG4gICAgICAgICAgICBpZihzdGF0ZT09MSlcclxuICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcImNvbm5lY3RpbmcgdG8gc2VydmVyLi4uXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHN0YXRlPT00KVxyXG4gICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwiY29ubmVjdGVkIHRvIHNlcnZlclwiKTtcclxuICAgICAgICAgICAgZWxzZSBpZihzdGF0ZT09NSkgLy9oYXMgam9pbmVkIGxvYmJ5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKFNob3dSb29tPT1mYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJ3YWl0aW5nIGZvciBvdGhlciBwbGF5ZXJzLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luUmFuZG9tUm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihTaG93Um9vbT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJzaG93aW5nIHJvb21zIGxpc3QuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZGVidWdcclxuICAgICAgICAgICAgQG1ldGhvZCBkZWJ1Z1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5kZWJ1Zz1mdW5jdGlvbihtZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGluZm9cclxuICAgICAgICAgICAgQG1ldGhvZCBpbmZvXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5pbmZvID0gZnVuY3Rpb24gKG1lc3MscGFyYW0pIHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzK3BhcmFtKTtcclxuICAgICAgICAgICBzdGF0ZVRleHQrPSBtZXNzK1wiIFwiK3BhcmFtK1wiXFxuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHdhcm5cclxuICAgICAgICAgICAgQG1ldGhvZCB3YXJuXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTFcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtMlxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYubG9nZ2VyLndhcm4gPSBmdW5jdGlvbiAobWVzcyxwYXJhbTEscGFyYW0yLHBhcmFtMykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzK1wiIFwiK3BhcmFtMStcIiBcIitwYXJhbTIrXCIgXCIrcGFyYW0zKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHBhcmFtMT09MjI1KSAvL25vIHJvb20gZm91bmRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyByYW5kb20gcm9vbSB3YXMgZm91bmQsIGNyZWF0aW5nIG9uZVwiKTtcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DcmVhdGVSb29tKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHBhcmFtMT09MjI2KSAvL3Jvb20gZG9lcyBub3QgZXhpc3RzIG9yIGlzIGZ1bGxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlNob3dUb2FzdChcIlJvb20gaXMgZnVsbCwgcGxlYXNlIHNlbGVjdCBhbnkgb3RoZXIgcm9vbSB0byBzcGVjdGF0ZS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBlcnJvclxyXG4gICAgICAgICAgICBAbWV0aG9kIGVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgIFBob3RvblJlZi5sb2dnZXIuZXJyb3IgPSBmdW5jdGlvbiAobWVzcyxwYXJhbSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5leGNlcHRpb24gPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBzb21lIGZvcm1hdFxyXG4gICAgICAgICAgICBAbWV0aG9kIGZvcm1hdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgIFBob3RvblJlZi5sb2dnZXIuZm9ybWF0ID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHBsYXllciBqb2lucyBsb2JieVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgUGhvdG9uUmVmLm9uUm9vbUxpc3QgPSBmdW5jdGlvbiAocm9vbXMpIHtcclxuICAgICAgICAgICAgc3RhdGVUZXh0Kz1cIlxcblwiK1wiUm9vbXMgTGlzdDpcIitcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgaWYocm9vbXMubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVRleHQrPVwiTm8gcm9vbXMgaW4gbG9iYnkuXCIrXCJcXG5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUscm9vbXNbaV0ucGxheWVyQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbSBuYW1lOiBcIityb29tc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZVRleHQrPVwiUm9vbTogXCIrcm9vbXNbaV0ubmFtZStcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBjaGFuZ2UgaW4gcm9vbXMgbGlzdCAocm9vbSBhZGRlZCx1cGRhdGVkLHJlbW92ZWQgZXRjKVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RVcGRhdGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1VwZGF0ZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zQWRkZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zUmVtb3ZlZFxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uUm9vbUxpc3RVcGRhdGUgPSBmdW5jdGlvbiAocm9vbXMsIHJvb21zVXBkYXRlZCwgcm9vbXNBZGRlZCwgcm9vbXNSZW1vdmVkKSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkocm9vbXNbaV0ubmFtZSxyb29tc1tpXS5wbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJvb20gbmFtZTogXCIrcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVRleHQrPVwiUm9vbTogXCIrcm9vbXNbaV0ubmFtZStcIlxcblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbXMgTGlzdCB1cGRhdGVkOiBcIiArIHJvb21zVXBkYXRlZC5sZW5ndGggKyBcIiB1cGRhdGVkLCBcIiArIHJvb21zQWRkZWQubGVuZ3RoICsgXCIgYWRkZWQsIFwiICsgcm9vbXNSZW1vdmVkLmxlbmd0aCArIFwiIHJlbW92ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGxvY2FsbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uSm9pblJvb21cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkpvaW5Sb29tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gTG9ncyBmb3IgZ2FtZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgXCIgKyB0aGlzLm15Um9vbSgpLm5hbWUgKyBcIiBqb2luZWRcIik7ICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15QWN0b3IoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KClbMF0ubG9hZEJhbGFuY2luZ0NsaWVudC51c2VySWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkuX2N1c3RvbVByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdKTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgIGlmKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl09PXRydWUpIC8vY2hlY2sgaWYgcGxheWVyIHdobyBqb2luZWQgaXMgc3BlY3RhdGVcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPXRydWU7XHJcbiAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge2NjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLHRydWUsdHJ1ZSxcIkdhbWVQbGF5XCIpO30sIDEwMDApOyAvL2Z1bmN0aW9uIGluIFVJTWFuYWdlclxyXG4gICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUHJvY2Vzc0NvdW50ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBqb2lucyByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckpvaW5cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25BY3RvckpvaW4gPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBfcmVhbFBsYXllciA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5HZXRSZWFsQWN0b3JzKCk7XHJcblxyXG4gICAgICAgICAgICBpZihfcmVhbFBsYXllcj09TWF4U3R1ZGVudHMpIC8vd2hlbiBtYXggcGxheWVyIHJlcXVpcmVkIHRvIHN0YXJ0IGdhbWUgaGFzIGJlZW4gYWRkZWRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgcmVxdWlyZWQgcGxheWVycyBqb2luZWQsIHN0YXJ0aW5nIHRoZSBnYW1lLi5cIilcclxuICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb209dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge2NjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLHRydWUsdHJ1ZSxcIkdhbWVQbGF5XCIpO30sIDEwMDApOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyh0cnVlLFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksZmFsc2UsZmFsc2UsZmFsc2UsbnVsbCxmYWxzZSwwKTtcclxuICAgICAgICAgICAgICAgIC8vUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyXCIsUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSx0cnVlKTsgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KGFjdG9yLmFjdG9yTnIpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGpvaW5lZFwiKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIlRvdGFsIFBsYXllcnM6IFwiK1Bob3RvblJlZi5teVJvb21BY3RvckNvdW50KCkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIHJlbW90ZWx5IGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIGxlYXZlcyBhIHJvb21cclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9yTGVhdmVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm9uQWN0b3JMZWF2ZSA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICAgICAgICBpZiAoIUdhbWVGaW5pc2hlZCAmJiAhUmVzdGFydFNwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWN0b3IuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5MZWF2ZVJvb20pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWN0YXRvciBsZWZ0LCBzbyBkb250IG1pbmQsIGNvbnQgZ2FtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGxlZnRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLmdldFNjZW5lTmFtZSgpID09IFwiR2FtZVBsYXlcIikgLy9pZiBzY2VuZSBpcyBnYW1lcGxheSBsZXQgcGxheWVyIGZpbmlzaCBnYW1lIGZvcmNlZnVsbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwib3RoZXIgcGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDIwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Qcm9jZXNzQ291bnRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSA9PSAxICYmICFSZXN0YXJ0U3BlY3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc3RhcnRTcGVjdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzdGFydEdhbWUoMTUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVhdHJ0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgb3duIHByb3BlcnRpZXMgZ290IGNoYW5nZWRcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9yUHJvcGVydGllc0NoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkFjdG9yUHJvcGVydGllc0NoYW5nZSA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgcm9vbSBwcm9wZXJ0aWVzIGdvdCBjaGFuZ2VkXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uTXlSb29tUHJvcGVydGllc0NoYW5nZSA9IGZ1bmN0aW9uIChfZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gdG8gaGFuZGxlIGVycm9yc1xyXG4gICAgICAgICAgICBAbWV0aG9kIG9uRXJyb3JcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGVycm9yQ29kZVxyXG4gICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGVycm9yTXNnXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25FcnJvciA9IGZ1bmN0aW9uIChlcnJvckNvZGUsIGVycm9yTXNnKSB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBcIiArIGVycm9yQ29kZSArIFwiOiBcIiArIGVycm9yTXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGFuIGV2ZW50IGlzIHJlY2VpdmVkIHdpdGggc29tZSBkYXRhXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25FdmVudFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gY29kZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gY29udGVudFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JOclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uRXZlbnQgPSBmdW5jdGlvbiAoY29kZSwgY29udGVudCwgYWN0b3JOcikge1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY29kZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOi8vcmVjZXZpbmcgcGxheWVyZGF0YSBpbmZvXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwbGF5ZXIgZGF0YVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBQbGF5ZXJJbmZvRGF0YSA9IGNvbnRlbnQuUGxheWVySW5mbztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxLHNlbmRlck5hbWUsc2VuZGVySUQsUGxheWVySW5mb0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6IC8vc3RhcnQgdHVybiByYWlzZSBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgc3RhcnQgdHVybiBldmVudFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfVHVybiA9IGNvbnRlbnQuVHVybk51bWJlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyLHNlbmRlck5hbWUsc2VuZGVySUQsX1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOiAvLyBkaWNlIGNvdW50XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkaWNlIGNvdW50XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kaWNlID0gY29udGVudC5EaWNlQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMyxzZW5kZXJOYW1lLHNlbmRlcklELF9kaWNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IC8vcmVjZWluZyB1c2VyIGlkIG9mIHBsYXllciB3aG8gaGFzIGNvbXBsZXRlZCB0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwbGF5ZXIgdHVybiBjb21wbGV0ZWRcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX0lEID0gY29udGVudC5VSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNCxzZW5kZXJOYW1lLHNlbmRlcklELF9JRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiAvL3JlY2VpdmluZyBjYXJkIGRhdGEgKGluZGV4KSBzbyBvdGhlciB1c2VycyBjYW4gc3luYyB0aGVtXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBjYXJkIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2NhcmQgPSBjb250ZW50LkNhcmREYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNSxzZW5kZXJOYW1lLHNlbmRlcklELF9jYXJkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6IC8vcmVjZWl2ZSBnYW1lIG92ZXIgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZ2FtZSBvdmVyIGNhbGxcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg2LHNlbmRlck5hbWUsc2VuZGVySUQsX2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogLy9yZWNlaXZlIG9uZSBRdWVzdGlvbiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBvbmUgcXVlc3Rpb24gZGF0YVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDcsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA4OiAvL3JlY2VpdmUgb25lIFF1ZXN0aW9uIHJlc3BvbnNlIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIG9uZSBxdWVzdGlvIHJlc3BvbnNlIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg4LHNlbmRlck5hbWUsc2VuZGVySUQsX2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgOTogLy9yZWNlaXZlIGJhbmtydXB0IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGJhbmtydXB0IGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg5LHNlbmRlck5hbWUsc2VuZGVySUQsX2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTA6IC8vcmVjZWl2ZSBiYWNrc3BhY2UgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgYmFja3NwYWNlIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMCxzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDExOiAvL3JlY2VpdmVpbmcgcGFydG5lcnNoaXAgb2ZmZXJcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMSxzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgY2FzZSAxMjogLy9yZWNlaXZlaW5nIHBhcnRuZXJzaGlwIGFuc3dlciBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBhbndzZXIgZGF0YVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEyLHNlbmRlck5hbWUsc2VuZGVySUQsX2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTM6IC8vcmVjZWl2aW5nIHByb2ZpdC9sb3NzIGRhdGEgZm9yIHBhcnRuZXJcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTMsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxNDogLy9yZWNlaXZpbmcgcm9vbSBjb21wbGV0ZSBkYXRhIHRvIHN0YXJ0IEdhbWVcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJvb21Db21wbGV0ZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICBcclxuICAgICB9LFxyXG4gICAgIFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzPU11bHRpcGxheWVyQ29udHJvbGxlcjsiXX0=