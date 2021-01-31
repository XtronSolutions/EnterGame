
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
var RestartSpectate = false;
var IsGameStarted = false;
var Timeouts = []; //---------------------------------------class data related to RoomProperty------------------------------------------------//

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
  onLoad: function onLoad() {
    this.ResetAllData();
    this.Init_MultiplayerController();
  },
  ToggleModeSelection: function ToggleModeSelection(_val // 1 means bot , 2 means real players
  ) {
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
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
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
          isVisible: true,
          isOpen: true,
          maxPlayers: this.MaxPlayers + this.MaxSpectators,
          customGameProperties: _data
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
          isVisible: true,
          isOpen: false,
          maxPlayers: this.MaxPlayers + this.MaxSpectators //"customGameProperties":{"RoomEssentials": {IsSpectate:true}}

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
          expectedCustomRoomProperties: _data
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
  SendGameOverData: function SendGameOverData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending game over data to sync");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(16, {
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
  SendInfo: function SendInfo(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending info");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(15, {
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
      console.trace("Starting Turn");
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

    IsGameStarted = false;
    MultiplayerController.Instance.JoinedRoom = false;
    MultiplayerController.Instance.ResetState();
    MultiplayerController.Instance.DisconnectPhoton();

    for (var index = 0; index < Timeouts.length; index++) {
      clearTimeout(Timeouts[index]);
    }

    setTimeout(function () {
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
    } //console.error(_isMaster);


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
          _timer--;

          _this2.RoomCounter(_timer);
        } else {
          console.error("timer completed");

          if (_this2.GetRealActors() > 1) {
            //if has more than one player start real game
            _this2.SendRoomCompletedData();
          } //start game with bot
          else {
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
    @summary Send room completed data
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

      IsGameStarted = true;
      MultiplayerController.Instance.MaxPlayers = _realPlayer;
      console.log("all required players joined, starting the game..");
      cc.systemEvent.emit("UpdateStatusWindow", "players found");
      cc.systemEvent.emit("UpdateStatusWindow", "starting game...");
      MultiplayerController.Instance.JoinedRoom = true;
      Timeouts.push(setTimeout(function () {
        cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay");
      }, 1000)); //function in ui manager

      MultiplayerController.Instance.UpdateRoomCustomProperites(true, _realPlayer, false, false, false, null, false, 0);
    }
  },
  UpdateActorActiveData: function UpdateActorActiveData(_actor) {
    var _actorsArray = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();

    var _data = null;

    for (var index = 0; index < _actorsArray.length; index++) {
      _data = _actorsArray[index].customProperties.PlayerSessionData;

      if (_data.PlayerUID == _actor.customProperties.Data.userID) {
        _data.IsActive = false;

        _actorsArray[index].setCustomProperty("PlayerSessionData", _data);
      }
    }

    console.log("updating active status of the player who has left........................");
    console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray());
  },
  HandlePlayerLeave: function HandlePlayerLeave(actor, PhotonReferece, _manager, _playerTurn, _initialSetupDone, _isSpectate) {
    if (actor === void 0) {
      actor = null;
    }

    if (PhotonReferece === void 0) {
      PhotonReferece = null;
    }

    if (_manager === void 0) {
      _manager = null;
    }

    if (_playerTurn === void 0) {
      _playerTurn = 0;
    }

    if (_initialSetupDone === void 0) {
      _initialSetupDone = false;
    }

    if (_isSpectate === void 0) {
      _isSpectate = false;
    }

    if (_initialSetupDone) {
      for (var index = 0; index < _manager.PlayerGameInfo.length; index++) {
        if (_manager.PlayerGameInfo[index].PlayerUID == actor.customProperties.Data.userID) {
          _manager.PlayerGameInfo[index].IsActive = false;
          MultiplayerController.Instance.UpdateActorActiveData(actor);

          if (!_isSpectate) {
            _manager.ReceiveEventTurnComplete(_manager.PlayerGameInfo[index].PlayerUID);

            if (_playerTurn == index && PhotonReferece.myActor().actorNr == PhotonReferece.myRoomMasterActorNr()) {
              _manager.ChangeTurnForcefully();

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

      for (var _index = 0; _index < _manager.PlayerGameInfo.length; _index++) {
        if (_manager.PlayerGameInfo[_index].PlayerUID == actor.customProperties.Data.userID) {
          _manager.PlayerGameInfo[_index].IsActive = false;

          _manager.PlayerGameInfo.splice(_index, 1);

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
      if (state == 1) cc.systemEvent.emit("UpdateStatusWindow", "connecting to server...");else if (state == 4) cc.systemEvent.emit("UpdateStatusWindow", "connected to server");else if (state == 5) {
        //has joined lobby
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
      console.log(PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"]); //#endregion

      if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == true) {
        //check if player who joined is spectate
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

      if (_realPlayer == MaxStudents) {
        //when max player required to start game has been added
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
                      for (var index = 0; index < _manager.PlayerGameInfo.length; index++) {
                        if (_manager.PlayerGameInfo[index].PlayerUID == actor.customProperties.Data.userID) {
                          _manager.PlayerGameInfo[index].IsActive = false;
                          MultiplayerController.Instance.UpdateActorActiveData(actor);
                          break;
                        }
                      }

                      _manager.GameOver(true);
                    } else {
                      if (_uIGameManager) MultiplayerController.Instance.RestartGame(1200);else MultiplayerController.Instance.RestartGame(0);
                    }

                    if (_uIGameManager) {
                      _uIGameManager.ShowToast("player " + actor.name + " has left", 1150, false);
                    }
                  } // MultiplayerController.Instance.JoinedRoom = false;
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


    PhotonRef.onMyRoomPropertiesChange = function (_data) {// console.log(_data);
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

        case 15:
          //receiving payday info
          console.log("received info");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(15, senderName, senderID, _data);
          break;

        case 16:
          //receiving game over data to sync
          console.log("received game over sync data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(16, senderName, senderID, _data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJHYW1lRmluaXNoZWQiLCJJc01hc3RlckNsaWVudCIsIlRvdGFsVGltZXIiLCJUaW1lclN0YXJ0ZWQiLCJTY2hlZHVsYXIiLCJNYXhTdHVkZW50cyIsIlJlc3RhcnRTcGVjdGF0ZSIsIklzR2FtZVN0YXJ0ZWQiLCJUaW1lb3V0cyIsIlJvb21Qcm9wZXJ0eSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllciIsInR5cGUiLCJJbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiSW5pdGlhbFNldHVwIiwiQm9vbGVhbiIsIlBsYXllckdhbWVJbmZvIiwiVGV4dCIsIlR1cm5OdW1iZXIiLCJBcHBfSW5mbyIsIkFwcElEIiwidG9vbHRpcCIsIkFwcFZlcnNpb24iLCJXc3MiLCJkaXNwbGF5TmFtZSIsIk1hc3RlclNlcnZlciIsIkZiQXBwSUQiLCJNdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDb21wb25lbnQiLCJQaG90b25BcHBJbmZvIiwiTWF4UGxheWVycyIsIk1heFNwZWN0YXRvcnMiLCJNb2RlU2VsZWN0aW9uIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwiUmVzZXRSb29tVmFsdWVzIiwib25Mb2FkIiwiSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJUb2dnbGVNb2RlU2VsZWN0aW9uIiwiX3ZhbCIsIkdldFNlbGVjdGVkTW9kZSIsImdhbWUiLCJhZGRQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwiSW5pdGlhbGl6ZVBob3RvbiIsImNvbnNvbGUiLCJsb2ciLCJBcHBJbmZvIiwiRGVtb0xvYWRCYWxhbmNpbmciLCJMZWF2ZVJvb20iLCJSb29tTmFtZSIsIk1lc3NhZ2UiLCJKb2luZWRSb29tIiwiQ2hlY2tSZWZlcmVuY2VzIiwicmVxdWlyZSIsIlJlbW92ZVBlcnNpc3ROb2RlIiwicmVtb3ZlUGVyc2lzdFJvb3ROb2RlIiwiZ2V0U2NlbmVOYW1lIiwic2NlbmVOYW1lIiwiX3NjZW5lSW5mb3MiLCJpIiwibGVuZ3RoIiwidXVpZCIsImRpcmVjdG9yIiwiX3NjZW5lIiwiX2lkIiwidXJsIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJtYXRjaCIsIlRvZ2dsZVNob3dSb29tX0Jvb2wiLCJfc3RhdGUiLCJUb2dnbGVMZWF2ZVJvb21fQm9vbCIsImdldFBob3RvblJlZiIsIlBob3RvbkFjdG9yIiwibXlBY3RvciIsIlJvb21BY3RvcnMiLCJteVJvb21BY3RvcnNBcnJheSIsIkNoZWNrU3BlY3RhdGUiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwiQXBwSWQiLCJGYkFwcElkIiwiUmVxdWVzdENvbm5lY3Rpb24iLCJzdGF0ZSIsImlzQ29ubmVjdGVkVG9NYXN0ZXIiLCJpc0luTG9iYnkiLCJzdGFydCIsIkRpc2Nvbm5lY3RQaG90b24iLCJpc0pvaW5lZFRvUm9vbSIsImRpc2Nvbm5lY3QiLCJSZXNldFN0YXRlIiwiT25Sb29tTmFtZUNoYW5nZSIsIk9uTWVzc2FnZUNoYW5nZSIsIm1zZyIsIlVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzIiwiX3BsYXllclVwZGF0ZSIsIl9wbGF5ZXJWYWx1ZSIsIl9pbml0aWFsU2V0dXBVcGRhdGUiLCJfaW5pdGlhbFNldHVwVmFsdWUiLCJfcGxheWVyR2FtZUluZm9VcGRhdGUiLCJfcGxheWVyR2FtZUluZm9WYWx1ZSIsIl90dXJuTnVtYmVyVXBkYXRlIiwiX3R1cm5OdW1iZXJ2YWx1ZSIsIm15Um9vbSIsInNldEN1c3RvbVByb3BlcnR5IiwiQ3JlYXRlUm9vbSIsIl9kYXRhIiwicm9vbU9wdGlvbnMiLCJpc1Zpc2libGUiLCJpc09wZW4iLCJtYXhQbGF5ZXJzIiwiY3VzdG9tR2FtZVByb3BlcnRpZXMiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJTdHVkZW50RGF0YSIsIkNvdW50ZXIiLCJzZXRVc2VySWQiLCJ1c2VySUQiLCJSb29tSUQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJEYXRlIiwibm93IiwiY3JlYXRlUm9vbSIsIkpvaW5Sb29tIiwiX3Jvb21OYW1lIiwiam9pblJvb20iLCJKb2luUmFuZG9tUm9vbSIsImV4cGVjdGVkQ3VzdG9tUm9vbVByb3BlcnRpZXMiLCJqb2luUmFuZG9tUm9vbSIsIlNlbmRDYXJkRGF0YSIsInJhaXNlRXZlbnQiLCJDYXJkRGF0YSIsInNlbmRlck5hbWUiLCJzZW5kZXJJRCIsImFjdG9yTnIiLCJyZWNlaXZlcnMiLCJQaG90b24iLCJMb2FkQmFsYW5jaW5nIiwiQ29uc3RhbnRzIiwiUmVjZWl2ZXJHcm91cCIsIkFsbCIsImVyciIsImVycm9yIiwibWVzc2FnZSIsIlNlbmRHYW1lT3ZlciIsIkRhdGEiLCJTZW5kR2FtZU92ZXJEYXRhIiwiU2VuZEJhbmtydXB0RGF0YSIsIk90aGVycyIsIlNlbmREYXRhIiwiUGxheWVySW5mbyIsIlNlbmRPbmVRdWVzdGlvbkRhdGEiLCJTZW5kUGFydG5lclByb2ZpdExvc3MiLCJTZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGEiLCJEaWNlUm9sbEV2ZW50IiwiRGljZUNvdW50IiwiU2VuZEdvQmFja1NwYWNlRGF0YSIsIlNlbmRQYXJ0bmVyU2hpcE9mZmVyRGF0YSIsIlNlbmRQYXJ0bmVyU2hpcEFuc3dlckRhdGEiLCJTZW5kSW5mbyIsIlN5bmNUdXJuQ29tcGxldGlvbiIsIlVJRCIsIlN0YXJ0VHVybiIsInRyYWNlIiwiU2hvd1RvYXN0IiwiQ2FsbFJlY2lldmVFdmVudCIsIl9ldmVudENvZGUiLCJfc2VuZGVyTmFtZSIsIl9zZW5kZXJJRCIsIkluc3RhbmNlTnVsbCIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwic2V0VGltZW91dCIsIlJlY2VpdmVFdmVudCIsIkRpc2Nvbm5lY3REYXRhIiwiUmVzdGFydEdhbWUiLCJfdGltZXIiLCJpbmRleCIsImNsZWFyVGltZW91dCIsIkdldF9HYW1lTWFuYWdlciIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJsb2FkU2NlbmUiLCJDaGVja01hc3RlckNsaWVudCIsIl9pc01hc3RlciIsIm15Um9vbU1hc3RlckFjdG9yTnIiLCJDaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQiLCJHZXRSZWFsQWN0b3JzIiwiX3JlYWxQbGF5ZXIiLCJBbGxQbGF5ZXJzIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJSb29tQ291bnRlciIsIlNlbmRSb29tQ29tcGxldGVkRGF0YSIsInN5c3RlbUV2ZW50IiwiZW1pdCIsIlByb2Nlc3NDb3VudGVyIiwiX21hc3RlciIsIl9jb3VudGVyIiwiUm9vbUNvbXBsZXRlZCIsInB1c2giLCJVcGRhdGVBY3RvckFjdGl2ZURhdGEiLCJfYWN0b3IiLCJfYWN0b3JzQXJyYXkiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIlBsYXllclVJRCIsIklzQWN0aXZlIiwiSGFuZGxlUGxheWVyTGVhdmUiLCJhY3RvciIsIlBob3RvblJlZmVyZWNlIiwiX21hbmFnZXIiLCJfcGxheWVyVHVybiIsIl9pbml0aWFsU2V0dXBEb25lIiwiX2lzU3BlY3RhdGUiLCJSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUiLCJDaGFuZ2VUdXJuRm9yY2VmdWxseSIsIlNldFBsYXllckxlZnQiLCJSZXNldFNvbWVWYWx1ZXMiLCJfcGxheWVyZm91bmQiLCJzcGxpY2UiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTeW5jRGF0YSIsInVwZGF0ZSIsImR0Iiwib25TdGF0ZUNoYW5nZSIsIkxCQyIsIkxvYWRCYWxhbmNpbmdDbGllbnQiLCJTdGF0ZVRvTmFtZSIsIkdldF9VSU1hbmFnZXIiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJsb2dnZXIiLCJkZWJ1ZyIsIm1lc3MiLCJpbmZvIiwicGFyYW0iLCJ3YXJuIiwicGFyYW0xIiwicGFyYW0yIiwicGFyYW0zIiwiVG9nZ2xlTG9hZGluZ05vZGUiLCJleGNlcHRpb24iLCJmb3JtYXQiLCJvblJvb21MaXN0Iiwicm9vbXMiLCJSZXNldFJvb21MaXN0IiwiVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkiLCJwbGF5ZXJDb3VudCIsIm9uUm9vbUxpc3RVcGRhdGUiLCJyb29tc1VwZGF0ZWQiLCJyb29tc0FkZGVkIiwicm9vbXNSZW1vdmVkIiwib25Kb2luUm9vbSIsImxvYWRCYWxhbmNpbmdDbGllbnQiLCJ1c2VySWQiLCJfY3VzdG9tUHJvcGVydGllcyIsIm9uQWN0b3JKb2luIiwibXlSb29tQWN0b3JDb3VudCIsIm9uQWN0b3JMZWF2ZSIsIkdhbWVPdmVyIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIkdldFR1cm5OdW1iZXIiLCJfdUlHYW1lTWFuYWdlciIsIm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlIiwib25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlIiwib25FcnJvciIsImVycm9yQ29kZSIsImVycm9yTXNnIiwib25FdmVudCIsImNvZGUiLCJjb250ZW50IiwiUGxheWVySW5mb0RhdGEiLCJfVHVybiIsIl9kaWNlIiwiX0lEIiwiX2NhcmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsU0FBSjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsS0FBckI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsSUFBaEI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxJQUFJQyxlQUFlLEdBQUcs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QUFPLENBQUN0SSxRQUF2QjtBQUVBL0csVUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCd0ksZ0JBQS9CLENBQWdELEVBQWhELEVBQW9EakMsVUFBcEQsRUFBZ0VDLFFBQWhFLEVBQTBFN0IsS0FBMUU7QUFFQTs7QUFDRjtBQWpKRjtBQW1KRCxLQXJKRDtBQXNKRDtBQTdoRGtDLENBQVQsQ0FBNUI7QUFnaURBeUssTUFBTSxDQUFDQyxPQUFQLEdBQWlCNVAscUJBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJpYWJsZXNcclxudmFyIFBob3RvblJlZjtcclxudmFyIHN0YXRlVGV4dCA9IFwiXCI7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgU2hvd1Jvb20gPSBmYWxzZTtcclxudmFyIEdhbWVGaW5pc2hlZCA9IGZhbHNlO1xyXG52YXIgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxudmFyIFRvdGFsVGltZXIgPSAzMDtcclxudmFyIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG52YXIgU2NoZWR1bGFyID0gbnVsbDtcclxudmFyIE1heFN0dWRlbnRzID0gNjtcclxudmFyIFJlc3RhcnRTcGVjdGF0ZSA9IGZhbHNlO1xyXG52YXIgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG52YXIgVGltZW91dHMgPSBbXTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gUm9vbVByb3BlcnR5LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvb21Qcm9wZXJ0eSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlJvb21Qcm9wZXJ0eVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllcjoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSW5pdGlhbFNldHVwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyR2FtZUluZm86IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFR1cm5OdW1iZXI6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gQXBwX0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQXBwX0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJBcHBfSW5mb1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEFwcElEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBcHAgaWQgZm9ybSBwaG90b24gZGFzaGJvYXJkXCIsXHJcbiAgICB9LFxyXG4gICAgQXBwVmVyc2lvbjoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQXBwIHZlcnNpb24gZm9yIHBob3RvblwiLFxyXG4gICAgfSxcclxuICAgIFdzczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc1NlY3VyZVwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklmIHBob3RvbiBzaG91bGQgdXNlIHNlY3VyZSBhbmQgcmVsaWFibGUgcHJvdG9jb2xzXCIsXHJcbiAgICB9LFxyXG4gICAgTWFzdGVyU2VydmVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJtYXN0ZXIgc2VydmVyIGZvciBwaG90b24gdG8gY29ubmVjdFwiLFxyXG4gICAgfSxcclxuICAgIEZiQXBwSUQ6IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkZCIGFwcCBpZCB1c2VkIGZvciBGQiBhdXRoZXJpemF0aW9uXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGRhdGEgcmVsYXRlZCB0byBNdWx0aXBsYXllckNvbnRyb2xsZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE11bHRpcGxheWVyQ29udHJvbGxlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk11bHRpcGxheWVyQ29udHJvbGxlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQaG90b25BcHBJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEFwcF9JbmZvLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTWF4UGxheWVyczoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTWF4U3BlY3RhdG9yczoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTW9kZVNlbGVjdGlvbjoge1xyXG4gICAgICAvLyAxIG1lYW5zIGJvdCAsIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgc3RhdGljczoge1xyXG4gICAgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICBJbnN0YW5jZTogbnVsbCxcclxuICB9LFxyXG5cclxuICBSZXNldEFsbERhdGEoKSB7XHJcbiAgICBUaW1lb3V0cyA9IFtdO1xyXG4gICAgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgUGhvdG9uUmVmID0gbnVsbDtcclxuICAgIHN0YXRlVGV4dCA9IFwiXCI7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgU2hvd1Jvb20gPSBmYWxzZTtcclxuICAgIEdhbWVGaW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxuICAgIFRvdGFsVGltZXIgPSAzMDtcclxuICAgIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgU2NoZWR1bGFyID0gbnVsbDtcclxuICAgIHRoaXMuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICBNYXhTdHVkZW50cyA9IDY7XHJcbiAgICBSZXN0YXJ0U3BlY3RhdGUgPSBmYWxzZTtcclxuICB9LFxyXG4gIC8vdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIGNyZWF0ZWRcclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsRGF0YSgpO1xyXG4gICAgdGhpcy5Jbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZU1vZGVTZWxlY3Rpb24oXHJcbiAgICBfdmFsIC8vIDEgbWVhbnMgYm90ICwgMiBtZWFucyByZWFsIHBsYXllcnNcclxuICApIHtcclxuICAgIHRoaXMuTW9kZVNlbGVjdGlvbiA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0U2VsZWN0ZWRNb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuTW9kZVNlbGVjdGlvbjtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IEluaXRpYWxpemUgc29tZSBlc3NlbnRhaWxzIGRhdGEgZm9yIG11bHRpcGxheWVyIGNvbnRyb2xsZXIgY2xhc3NcclxuICAgIEBtZXRob2QgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXJcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKSB7XHJcbiAgICBpZiAoIU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSkge1xyXG4gICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICB0aGlzLkluaXRpYWxpemVQaG90b24oKTtcclxuICAgICAgY29uc29sZS5sb2coQXBwSW5mbyk7XHJcbiAgICAgIFBob3RvblJlZiA9IG5ldyBEZW1vTG9hZEJhbGFuY2luZygpO1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuTGVhdmVSb29tID0gZmFsc2U7XHJcbiAgICB0aGlzLlJvb21OYW1lID0gXCJcIjtcclxuICAgIHRoaXMuTWVzc2FnZSA9IFwiXCI7XHJcbiAgICBTaG93Um9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2hlY2sgcmVmZXJlbmNlIHRvIHNvbWUgdmFyaWFibGVzIGFuZCBjbGFzc2VzXHJcbiAgICBAbWV0aG9kIENoZWNrUmVmZXJlbmNlc1xyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJlbW92ZSBwZXJzaXN0IG5vZGUgd2hlbiB3YW50IHRvIHJlc3RhcnQgc2NlbmVcclxuICAgIEBtZXRob2QgUmVtb3ZlUGVyc2lzdE5vZGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgUmVtb3ZlUGVyc2lzdE5vZGUoKSB7XHJcbiAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UgPSBudWxsO1xyXG4gICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIGdldCBuYW1lIG9mIGN1cnJlbnQgb3BlbmVkIHNjZW5lXHJcbiAgICBAbWV0aG9kIGdldFNjZW5lTmFtZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtzdHJpbmd9IHNjZW5lTmFtZVxyXG4gICAgKiovXHJcbiAgZ2V0U2NlbmVOYW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2NlbmVOYW1lO1xyXG4gICAgdmFyIF9zY2VuZUluZm9zID0gY2MuZ2FtZS5fc2NlbmVJbmZvcztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3NjZW5lSW5mb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKF9zY2VuZUluZm9zW2ldLnV1aWQgPT0gY2MuZGlyZWN0b3IuX3NjZW5lLl9pZCkge1xyXG4gICAgICAgIHNjZW5lTmFtZSA9IF9zY2VuZUluZm9zW2ldLnVybDtcclxuICAgICAgICBzY2VuZU5hbWUgPSBzY2VuZU5hbWUuc3Vic3RyaW5nKHNjZW5lTmFtZS5sYXN0SW5kZXhPZihcIi9cIikgKyAxKS5tYXRjaCgvW15cXC5dKy8pWzBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2NlbmVOYW1lO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gc2V0IFwiU2hvd1Jvb21cIiBib29sIHZhbHVlXHJcbiAgICBAbWV0aG9kIFRvZ2dsZVNob3dSb29tX0Jvb2xcclxuICAgIEBwYXJhbSB7Ym9vbGVhbn0gX3N0YXRlXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICoqL1xyXG4gIFRvZ2dsZVNob3dSb29tX0Jvb2woX3N0YXRlKSB7XHJcbiAgICBTaG93Um9vbSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIHNldCBcIkxlYXZlUm9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlTGVhdmVSb29tX0Jvb2xcclxuICAgIEBwYXJhbSB7Ym9vbGVhbn0gX3N0YXRlXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICoqL1xyXG4gIFRvZ2dsZUxlYXZlUm9vbV9Cb29sKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5MZWF2ZVJvb20gPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIFBob3RvbiBcIlBob3RvblJlZlwiIGluc3RhbmNlIGNyZWF0ZWQgYnkgbXVsdGlwbGF5ZXIgY2xhc3NcclxuICAgIEBtZXRob2QgZ2V0UGhvdG9uUmVmXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gUGhvdG9uUmVmXHJcbiAgICAqKi9cclxuICBnZXRQaG90b25SZWYoKSB7XHJcbiAgICByZXR1cm4gUGhvdG9uUmVmO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBteUFjdG9yIGluc3RhbmNlIGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFBob3RvbkFjdG9yXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gQWN0b3JcclxuICAgICoqL1xyXG4gIFBob3RvbkFjdG9yKCkge1xyXG4gICAgcmV0dXJuIFBob3RvblJlZi5teUFjdG9yKCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIG15Um9vbUFjdG9yc0FycmF5IGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFJvb21BY3RvcnNcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBBY3RvclxyXG4gICAgKiovXHJcbiAgUm9vbUFjdG9ycygpIHtcclxuICAgIHJldHVybiBQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgaXNTcGVjdGF0ZSB2YXJpYWJsZSBmcm9tIGN1c3RvbSBwcm9wZXJ0eSBvZiBjdXJyZW50IGFjdG9yXHJcbiAgICBAbWV0aG9kIENoZWNrU3BlY3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gaXNTcGVjdGF0ZVxyXG4gICAgKiovXHJcbiAgQ2hlY2tTcGVjdGF0ZSgpIHtcclxuICAgIHJldHVybiBQaG90b25SZWYubXlBY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IEluaXRpYWxpemUgcGhvdG9uIHdpdGggYXBwaWQsYXBwIHZlcnNpb24sIFdzcyBldGNcclxuICAgIEBtZXRob2QgSW5pdGlhbGl6ZVBob3RvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBJbml0aWFsaXplUGhvdG9uKCkge1xyXG4gICAgQXBwSW5mby5BcHBJZCA9IHRoaXMuUGhvdG9uQXBwSW5mby5BcHBJRDtcclxuICAgIEFwcEluZm8uQXBwVmVyc2lvbiA9IHRoaXMuUGhvdG9uQXBwSW5mby5BcHBWZXJzaW9uO1xyXG4gICAgQXBwSW5mby5Xc3MgPSB0aGlzLlBob3RvbkFwcEluZm8uV3NzO1xyXG4gICAgQXBwSW5mby5NYXN0ZXJTZXJ2ZXIgPSB0aGlzLlBob3RvbkFwcEluZm8uTWFzdGVyU2VydmVyO1xyXG4gICAgQXBwSW5mby5GYkFwcElkID0gdGhpcy5QaG90b25BcHBJbmZvLkZiQXBwSUQ7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGNvbm5lY3Rpb24gcmVxdWVzdCB0byBwaG90b25cclxuICAgIEBtZXRob2QgUmVxdWVzdENvbm5lY3Rpb25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgUmVxdWVzdENvbm5lY3Rpb24oKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLnN0YXRlID09IDUgfHwgUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlKSBjb25zb2xlLmxvZyhcImFscmVhZHkgY29ubmVjdGVkXCIpO1xyXG4gICAgZWxzZSBQaG90b25SZWYuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IERpc2Nvbm5lY3QgZnJvbSBwaG90b25cclxuICAgIEBtZXRob2QgRGlzY29ubmVjdFBob3RvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBEaXNjb25uZWN0UGhvdG9uKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIFBob3RvblJlZi5kaXNjb25uZWN0KCk7XHJcbiAgICAgIHRoaXMuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgICAvL1Bob3RvblJlZi5sZWF2ZVJvb20oKTtcclxuICAgICAgdGhpcy5SZXNldFN0YXRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vdCBpbnNpZGUgYW55IHJvb20gb3IgbG9iYnkgb3IgY29ubmVjdGVkIHRvIHBob3RvblwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJlc2V0aW5nIGZldyB2YWx1ZXNcclxuICAgIEBtZXRob2QgUmVzZXRTdGF0ZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBSZXNldFN0YXRlKCkge1xyXG4gICAgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5MZWF2ZVJvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgU2hvd1Jvb20gPSBmYWxzZTtcclxuICAgIHN0YXRlVGV4dCA9IFwiXCI7XHJcbiAgICB0aGlzLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gcm9vbSBuYW1lIGdvdCBpbnB1dCBmcm9tIGdhbWVcclxuICAgIEBtZXRob2QgT25Sb29tTmFtZUNoYW5nZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBPblJvb21OYW1lQ2hhbmdlKG5hbWUpIHtcclxuICAgIHRoaXMuUm9vbU5hbWUgPSBuYW1lO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gbWVzc2FnZSB3aW5kb3cgZ290IGlucHV0IGZyb20gZ2FtZVxyXG4gICAgQG1ldGhvZCBPbk1lc3NhZ2VDaGFuZ2VcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBtc2dcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBPbk1lc3NhZ2VDaGFuZ2UobXNnKSB7XHJcbiAgICB0aGlzLk1lc3NhZ2UgPSBtc2c7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSB1cGRhdGUgY3VzdG9tIHJvb20gcHJvcGVydGllc1xyXG4gICAgQG1ldGhvZCBVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlc1xyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKF9wbGF5ZXJVcGRhdGUgPSBmYWxzZSwgX3BsYXllclZhbHVlID0gMCwgX2luaXRpYWxTZXR1cFVwZGF0ZSA9IGZhbHNlLCBfaW5pdGlhbFNldHVwVmFsdWUgPSBmYWxzZSwgX3BsYXllckdhbWVJbmZvVXBkYXRlID0gZmFsc2UsIF9wbGF5ZXJHYW1lSW5mb1ZhbHVlID0gbnVsbCwgX3R1cm5OdW1iZXJVcGRhdGUgPSBmYWxzZSwgX3R1cm5OdW1iZXJ2YWx1ZSA9IDApIHtcclxuICAgIGlmIChfcGxheWVyVXBkYXRlKSBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJcIiwgX3BsYXllclZhbHVlLCB0cnVlKTtcclxuXHJcbiAgICBpZiAoX2luaXRpYWxTZXR1cFVwZGF0ZSkgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIsIF9pbml0aWFsU2V0dXBWYWx1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKF9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSkgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIiwgX3BsYXllckdhbWVJbmZvVmFsdWUsIHRydWUpO1xyXG5cclxuICAgIGlmIChfdHVybk51bWJlclVwZGF0ZSkgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLCBfdHVybk51bWJlcnZhbHVlLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNyZWF0ZSByb29tIHJlcXVlc3RcclxuICAgIEBtZXRob2QgQ3JlYXRlUm9vbVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBDcmVhdGVSb29tKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuc3RhdGUgPT0gOCkge1xyXG4gICAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gZmFsc2UpIHtcclxuICAgICAgICB2YXIgX2RhdGEgPSBuZXcgUm9vbVByb3BlcnR5KCk7XHJcbiAgICAgICAgX2RhdGEuUGxheWVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIHJvb21PcHRpb25zID0ge1xyXG4gICAgICAgICAgaXNWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgaXNPcGVuOiB0cnVlLFxyXG4gICAgICAgICAgbWF4UGxheWVyczogdGhpcy5NYXhQbGF5ZXJzICsgdGhpcy5NYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgY3VzdG9tR2FtZVByb3BlcnRpZXM6IF9kYXRhLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHsgSXNTcGVjdGF0ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIsIHsgQ291bnRlcjogVG90YWxUaW1lciB9KTtcclxuICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgICAgdmFyIFJvb21JRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERhdGUubm93KCkpO1xyXG5cclxuICAgICAgICBQaG90b25SZWYuY3JlYXRlUm9vbShcIlJvb21fXCIgKyBSb29tSUQsIHJvb21PcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBqb2luIHJvb20gcmVxdWVzdCBieSBuYW1lXHJcbiAgICBAbWV0aG9kIEpvaW5Sb29tXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gX3Jvb21OYW1lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgSm9pblJvb20oX3Jvb21OYW1lKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLnN0YXRlID09IDUgfHwgUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5zdGF0ZSA9PSA4KSB7XHJcbiAgICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSBmYWxzZSB8fCBQaG90b25SZWYuc3RhdGUgIT0gOCkge1xyXG4gICAgICAgIHZhciByb29tT3B0aW9ucyA9IHtcclxuICAgICAgICAgIGlzVmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgIGlzT3BlbjogZmFsc2UsXHJcbiAgICAgICAgICBtYXhQbGF5ZXJzOiB0aGlzLk1heFBsYXllcnMgKyB0aGlzLk1heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICAvL1wiY3VzdG9tR2FtZVByb3BlcnRpZXNcIjp7XCJSb29tRXNzZW50aWFsc1wiOiB7SXNTcGVjdGF0ZTp0cnVlfX1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7IElzU3BlY3RhdGU6IHRydWUgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIsIHsgQ291bnRlcjogVG90YWxUaW1lciB9KTtcclxuICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcblxyXG4gICAgICAgIFBob3RvblJlZi5qb2luUm9vbShfcm9vbU5hbWUsIHJvb21PcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBqb2luIHJhbmRvbSByb29tXHJcbiAgICBAbWV0aG9kIEpvaW5SYW5kb21Sb29tXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEpvaW5SYW5kb21Sb29tKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuc3RhdGUgPT0gOCkge1xyXG4gICAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gZmFsc2UgfHwgUGhvdG9uUmVmLnN0YXRlICE9IDgpIHtcclxuICAgICAgICB2YXIgX2RhdGEgPSBuZXcgUm9vbVByb3BlcnR5KCk7XHJcbiAgICAgICAgX2RhdGEuUGxheWVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIHJvb21PcHRpb25zID0ge1xyXG4gICAgICAgICAgLy9cImV4cGVjdGVkTWF4UGxheWVyc1wiOnRoaXMuTWF4UGxheWVycytNYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgZXhwZWN0ZWRDdXN0b21Sb29tUHJvcGVydGllczogX2RhdGEsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwgeyBJc1NwZWN0YXRlOiBmYWxzZSB9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIiwgeyBDb3VudGVyOiBUb3RhbFRpbWVyIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuXHJcbiAgICAgICAgUGhvdG9uUmVmLmpvaW5SYW5kb21Sb29tKHJvb21PcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGNhcmQgaW5kZXggb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRDYXJkRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZENhcmREYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgY2FyZCBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA1LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBDYXJkRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBnYW1lIG92ZXIgY2FsbFxyXG4gICAgQG1ldGhvZCBTZW5kR2FtZU92ZXJcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRHYW1lT3ZlcihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGdhbWUgb3ZlciBjYWxsXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA2LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZEdhbWVPdmVyRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGdhbWUgb3ZlciBkYXRhIHRvIHN5bmNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE2LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGJhY2tydXB0IGRhdGFcclxuICAgIEBtZXRob2QgU2VuZEJhbmtydXB0RGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZEJhbmtydXB0RGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGJhbmtydXBjeSBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA5LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIFBsYXllciBEYXRhIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBwbGF5ZXIgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVySW5mbzogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBvbmUgcXVlc3Rpb24gRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZE9uZVF1ZXN0aW9uRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA3LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIHByb2ZpdCBvciBsb3NzIHRvIHlvdXIgcGFzcnRuZXJcclxuICAgIEBtZXRob2QgU2VuZFBhcnRuZXJQcm9maXRMb3NzXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kUGFydG5lclByb2ZpdExvc3MoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgb25lIHF1ZXN0aW9uIHJlc3BvbnNlIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiByZXNwb25zZSBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA4LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGRpY2UgZGF0YVxyXG4gICAgQG1ldGhvZCBEaWNlUm9sbEV2ZW50XHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBEaWNlUm9sbEV2ZW50KF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZGljZSBjb3VudFwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGljZUNvdW50OiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGdvIGJhY2sgc3BhY2VzIGRhdGFcclxuICAgIEBtZXRob2QgU2VuZEdvQmFja1NwYWNlRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZEdvQmFja1NwYWNlRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kIGdvIGJhY2sgc3BhY2VzIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEwLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kaW5nIG9wZW4gaW52aXRhdGlvbiB0byBhbGwgcGxheWVycyBmb3IgcGFydG5lciBzaGlwXHJcbiAgICBAbWV0aG9kIFNlbmRQYXJ0bmVyU2hpcE9mZmVyRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgcGFydG5lciBzaGlwIG9mZmVyXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZGluZyBwYXJ0bmVyIGFuc3dlciBkYXRhIChhY2NlcHQgb3IgcmVqZWN0KVxyXG4gICAgQG1ldGhvZCBTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgcGFydGVucnNoaXAgYW5zd2VyIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEyLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZEluZm8oX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBpbmZvXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxNSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCB1c2VyIGlkIG9mIHBsYXllciB0byBhbGwgb3RoZXIgd2hvIGhhZCBjb21wbGV0ZWQgdGhlaXIgdHVyblxyXG4gICAgQG1ldGhvZCBTeW5jVHVybkNvbXBsZXRpb25cclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFN5bmNUdXJuQ29tcGxldGlvbihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHR1cm4gY29tcGxldGlvbiBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA0LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBVSUQ6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFN0YXJ0IFR1cm4gZm9yIGluaXRpYWwgdHVyblxyXG4gICAgQG1ldGhvZCBTdGFydFR1cm5cclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFN0YXJ0VHVybihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlN0YXJ0aW5nIFR1cm5cIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDIsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFR1cm5OdW1iZXI6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNob3cgdG9hc3QgbWVzc2FnZSBvbiB0aGUgY29uc29sZVxyXG4gICAgQG1ldGhvZCBTaG93VG9hc3RcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIG1lc3NhZ2UgdG8gYmUgc2hvd24gXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2hvd1RvYXN0OiBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInRvYXN0IG1lc3NhZ2U6IFwiICsgbXNnKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFJlY2VpdmUgZXZlbnQgZnJvbSBwaG90b24gcmFpc2Ugb24gXHJcbiAgICBAbWV0aG9kIENhbGxSZWNpZXZlRXZlbnRcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBDYWxsUmVjaWV2ZUV2ZW50OiBmdW5jdGlvbiAoX2V2ZW50Q29kZSwgX3NlbmRlck5hbWUsIF9zZW5kZXJJRCwgX2RhdGEpIHtcclxuICAgIHZhciBJbnN0YW5jZU51bGwgPSB0cnVlO1xyXG5cclxuICAgIC8vdG8gY2hlY2sgaWYgaW5zdGFuY2UgaXMgbnVsbCBpbiBjYXNlIGNsYXNzIGluc3RhbmNlIGlzIG5vdCBsb2FkZWQgYW5kIGl0cyByZWNlaXZlcyBjYWxsYmFja1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpID09IG51bGwpIHtcclxuICAgICAgSW5zdGFuY2VOdWxsID0gdHJ1ZTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5DYWxsUmVjaWV2ZUV2ZW50KF9ldmVudENvZGUsIF9zZW5kZXJOYW1lLCBfc2VuZGVySUQsIF9kYXRhKTtcclxuICAgICAgfSwgNTApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgSW5zdGFuY2VOdWxsID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLCBfc2VuZGVyTmFtZSwgX3NlbmRlcklELCBfZGF0YSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRGlzY29ubmVjdERhdGEoKSB7XHJcbiAgICBHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG4gICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICB9LFxyXG5cclxuICBSZXN0YXJ0R2FtZShfdGltZXIgPSAwKSB7XHJcbiAgICBJc0dhbWVTdGFydGVkID0gZmFsc2U7XHJcbiAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0U3RhdGUoKTtcclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFRpbWVvdXRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBjbGVhclRpbWVvdXQoVGltZW91dHNbaW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKSkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKSkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKSkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpbk1lbnVcIik7XHJcbiAgICB9LCBfdGltZXIpO1xyXG4gICAgLy8gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpXHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tNYXN0ZXJDbGllbnQoX2lkKSB7XHJcbiAgICB2YXIgX2lzTWFzdGVyID0gZmFsc2U7XHJcbiAgICBpZiAoUGhvdG9uUmVmLm15Um9vbU1hc3RlckFjdG9yTnIoKSA9PSBfaWQgJiYgUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yID09IF9pZCkge1xyXG4gICAgICBfaXNNYXN0ZXIgPSB0cnVlO1xyXG4gICAgICBJc01hc3RlckNsaWVudCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jb25zb2xlLmVycm9yKF9pc01hc3Rlcik7XHJcbiAgICByZXR1cm4gX2lzTWFzdGVyO1xyXG4gIH0sXHJcblxyXG4gIENoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCgpIHtcclxuICAgIHZhciBfaXNNYXN0ZXIgPSBmYWxzZTtcclxuICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgPT0gUGhvdG9uUmVmLm15Um9vbU1hc3RlckFjdG9yTnIoKSkge1xyXG4gICAgICBfaXNNYXN0ZXIgPSB0cnVlO1xyXG4gICAgICBJc01hc3RlckNsaWVudCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJc01hc3RlckNsaWVudCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5lcnJvcihfaXNNYXN0ZXIpO1xyXG4gICAgcmV0dXJuIF9pc01hc3RlcjtcclxuICB9LFxyXG5cclxuICBSZXNldFJvb21WYWx1ZXMoKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxuICAgICAgVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICB9LCAxMDAwKTtcclxuICB9LFxyXG5cclxuICBHZXRSZWFsQWN0b3JzKCkge1xyXG4gICAgdmFyIF9yZWFsUGxheWVyID0gMDtcclxuICAgIHZhciBBbGxQbGF5ZXJzID0gUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQWxsUGxheWVycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKEFsbFBsYXllcnNbaW5kZXhdLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgX3JlYWxQbGF5ZXIrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9yZWFsUGxheWVyO1xyXG4gIH0sXHJcblxyXG4gIFJvb21Db3VudGVyKF90aW1lcikge1xyXG4gICAgY2xlYXJUaW1lb3V0KFNjaGVkdWxhcik7XHJcbiAgICB2YXIgX2RhdGEgPSBudWxsO1xyXG4gICAgU2NoZWR1bGFyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmIChJc01hc3RlckNsaWVudCkge1xyXG4gICAgICAgIGlmIChfdGltZXIgPiAwKSB7XHJcbiAgICAgICAgICBfdGltZXItLTtcclxuICAgICAgICAgIHRoaXMuUm9vbUNvdW50ZXIoX3RpbWVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcInRpbWVyIGNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgIGlmICh0aGlzLkdldFJlYWxBY3RvcnMoKSA+IDEpIHtcclxuICAgICAgICAgICAgLy9pZiBoYXMgbW9yZSB0aGFuIG9uZSBwbGF5ZXIgc3RhcnQgcmVhbCBnYW1lXHJcbiAgICAgICAgICAgIHRoaXMuU2VuZFJvb21Db21wbGV0ZWREYXRhKCk7XHJcbiAgICAgICAgICB9IC8vc3RhcnQgZ2FtZSB3aXRoIGJvdFxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFJvb21WYWx1ZXMoKTtcclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Ub2dnbGVNb2RlU2VsZWN0aW9uKDEpO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVG9nZ2xlU2hvd1Jvb21fQm9vbChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycyA9IDI7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJwbGF5ZXJzIGZvdW5kXCIpO1xyXG4gICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7IC8vZnVuY3Rpb24gaW4gdWkgbWFuYWdlclxyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KFNjaGVkdWxhcik7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwMDApO1xyXG4gIH0sXHJcblxyXG4gIFByb2Nlc3NDb3VudGVyKCkge1xyXG4gICAgdmFyIF9tYXN0ZXIgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCk7XHJcbiAgICBpZiAoX21hc3Rlcikge1xyXG4gICAgICBpZiAoIVRpbWVyU3RhcnRlZCkge1xyXG4gICAgICAgIFRpbWVyU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgdmFyIF9jb3VudGVyID0gUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIpW1wiQ291bnRlclwiXTtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUm9vbUNvdW50ZXIoX2NvdW50ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIHJvb20gY29tcGxldGVkIGRhdGFcclxuICAgIEBtZXRob2QgU2VuZFJvb21Db21wbGV0ZWREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kUm9vbUNvbXBsZXRlZERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBSb29tQ29tcGxldGVkRGF0YVwiKTtcclxuICAgICAgLy8gIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE0LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUm9vbUNvbXBsZXRlZCgpIHtcclxuICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfcmVhbFBsYXllciA9IHRoaXMuR2V0UmVhbEFjdG9ycygpO1xyXG4gICAgICBJc0dhbWVTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMgPSBfcmVhbFBsYXllcjtcclxuICAgICAgY29uc29sZS5sb2coXCJhbGwgcmVxdWlyZWQgcGxheWVycyBqb2luZWQsIHN0YXJ0aW5nIHRoZSBnYW1lLi5cIik7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJwbGF5ZXJzIGZvdW5kXCIpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICBUaW1lb3V0cy5wdXNoKFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7XHJcbiAgICAgICAgfSwgMTAwMClcclxuICAgICAgKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyh0cnVlLCBfcmVhbFBsYXllciwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgbnVsbCwgZmFsc2UsIDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUFjdG9yQWN0aXZlRGF0YShfYWN0b3IpIHtcclxuICAgIHZhciBfYWN0b3JzQXJyYXkgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICB2YXIgX2RhdGEgPSBudWxsO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgX2RhdGEgPSBfYWN0b3JzQXJyYXlbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgIGlmIChfZGF0YS5QbGF5ZXJVSUQgPT0gX2FjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICBfZGF0YS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIF9hY3RvcnNBcnJheVtpbmRleF0uc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInVwZGF0aW5nIGFjdGl2ZSBzdGF0dXMgb2YgdGhlIHBsYXllciB3aG8gaGFzIGxlZnQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIik7XHJcbiAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gIH0sXHJcblxyXG4gIEhhbmRsZVBsYXllckxlYXZlKGFjdG9yID0gbnVsbCwgUGhvdG9uUmVmZXJlY2UgPSBudWxsLCBfbWFuYWdlciA9IG51bGwsIF9wbGF5ZXJUdXJuID0gMCwgX2luaXRpYWxTZXR1cERvbmUgPSBmYWxzZSwgX2lzU3BlY3RhdGUgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pbml0aWFsU2V0dXBEb25lKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVBY3RvckFjdGl2ZURhdGEoYWN0b3IpO1xyXG4gICAgICAgICAgaWYgKCFfaXNTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgICBfbWFuYWdlci5SZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIGlmIChfcGxheWVyVHVybiA9PSBpbmRleCAmJiBQaG90b25SZWZlcmVjZS5teUFjdG9yKCkuYWN0b3JOciA9PSBQaG90b25SZWZlcmVjZS5teVJvb21NYXN0ZXJBY3Rvck5yKCkpIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5DaGFuZ2VUdXJuRm9yY2VmdWxseSgpO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNldFBsYXllckxlZnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJlc2V0U29tZVZhbHVlcygpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gX3VJTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTAwMCk7XHJcbiAgICAgIHZhciBfcGxheWVyZm91bmQgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm8uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzLS07XHJcbiAgICAgICAgICBfcGxheWVyZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZUFjdG9yQWN0aXZlRGF0YShhY3Rvcik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghX3BsYXllcmZvdW5kKSB7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMtLTtcclxuICAgICAgICBpZiAoIV9pc1NwZWN0YXRlKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3luY0RhdGEobnVsbCwgYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhfbWFuYWdlci5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vY2FsbGVkIGV2ZXJ5IGZyYW1lXHJcbiAgdXBkYXRlKGR0KSB7XHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBzb21lIGNoYW5nZSBpbiBjb25uZWN0aW9uIHN0YXRlXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25TdGF0ZUNoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gc3RhdGVcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25TdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xyXG4gICAgICAvLyNyZWdpb24gQ29ubmVjdGlvbiBTdGF0ZXNcclxuICAgICAgLy9zdGF0ZSAxIDogY29ubmVjdGluZ1RvTmFtZVNlcnZlclxyXG4gICAgICAvL1N0YXRlIDIgOiBDb25uZWN0ZWRUb05hbWVTZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSAzIDogQ29ubmVjdGluZ1RvTWFzdGVyU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgNCA6IENvbm5lY3RlZFRvTWFzdGVyU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgNTogIEpvaW5lZExvYmJ5XHJcbiAgICAgIC8vU3RhdGUgNiA6IENvbm5lY3RpbmdUb0dhbWVzZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSA3IDogQ29ubmVjdGVkVG9HYW1lc2VydmVyXHJcbiAgICAgIC8vU3RhdGUgOCA6IEpvaW5lZFxyXG4gICAgICAvL1N0YXRlIDEwOiBEaXNjb25uZWN0ZWRcclxuICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICB2YXIgTEJDID0gUGhvdG9uLkxvYWRCYWxhbmNpbmcuTG9hZEJhbGFuY2luZ0NsaWVudDtcclxuICAgICAgY29uc29sZS5sb2coXCJTdGF0ZUNvZGU6IFwiICsgc3RhdGUgKyBcIiBcIiArIExCQy5TdGF0ZVRvTmFtZShzdGF0ZSkpO1xyXG5cclxuICAgICAgaWYgKHN0YXRlID09IDEpIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJjb25uZWN0aW5nIHRvIHNlcnZlci4uLlwiKTtcclxuICAgICAgZWxzZSBpZiAoc3RhdGUgPT0gNCkgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcImNvbm5lY3RlZCB0byBzZXJ2ZXJcIik7XHJcbiAgICAgIGVsc2UgaWYgKHN0YXRlID09IDUpIHtcclxuICAgICAgICAvL2hhcyBqb2luZWQgbG9iYnlcclxuICAgICAgICBpZiAoU2hvd1Jvb20gPT0gZmFsc2UpIHtcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJ3YWl0aW5nIGZvciBvdGhlciBwbGF5ZXJzLi4uXCIpO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5SYW5kb21Sb29tKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChTaG93Um9vbSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic2hvd2luZyByb29tcyBsaXN0Li4uXCIpO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBkZWJ1Z1xyXG4gICAgICAgICAgICBAbWV0aG9kIGRlYnVnXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5kZWJ1ZyA9IGZ1bmN0aW9uIChtZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGluZm9cclxuICAgICAgICAgICAgQG1ldGhvZCBpbmZvXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuaW5mbyA9IGZ1bmN0aW9uIChtZXNzLCBwYXJhbSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzICsgcGFyYW0pO1xyXG4gICAgICBzdGF0ZVRleHQgKz0gbWVzcyArIFwiIFwiICsgcGFyYW0gKyBcIlxcblwiO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHdhcm5cclxuICAgICAgICAgICAgQG1ldGhvZCB3YXJuXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTFcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtMlxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci53YXJuID0gZnVuY3Rpb24gKG1lc3MsIHBhcmFtMSwgcGFyYW0yLCBwYXJhbTMpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyArIFwiIFwiICsgcGFyYW0xICsgXCIgXCIgKyBwYXJhbTIgKyBcIiBcIiArIHBhcmFtMyk7XHJcblxyXG4gICAgICBpZiAocGFyYW0xID09IDIyNSkge1xyXG4gICAgICAgIC8vbm8gcm9vbSBmb3VuZFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibm8gcmFuZG9tIHJvb20gd2FzIGZvdW5kLCBjcmVhdGluZyBvbmVcIik7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNyZWF0ZVJvb20oKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmFtMSA9PSAyMjYpIHtcclxuICAgICAgICAvL3Jvb20gZG9lcyBub3QgZXhpc3RzIG9yIGlzIGZ1bGxcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlNob3dUb2FzdChcIlJvb20gaXMgZnVsbCwgcGxlYXNlIHNlbGVjdCBhbnkgb3RoZXIgcm9vbSB0byBzcGVjdGF0ZS5cIik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBlcnJvclxyXG4gICAgICAgICAgICBAbWV0aG9kIGVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZXJyb3IgPSBmdW5jdGlvbiAobWVzcywgcGFyYW0pIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5leGNlcHRpb24gPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBzb21lIGZvcm1hdFxyXG4gICAgICAgICAgICBAbWV0aG9kIGZvcm1hdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZm9ybWF0ID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHBsYXllciBqb2lucyBsb2JieVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uUm9vbUxpc3QgPSBmdW5jdGlvbiAocm9vbXMpIHtcclxuICAgICAgc3RhdGVUZXh0ICs9IFwiXFxuXCIgKyBcIlJvb21zIExpc3Q6XCIgKyBcIlxcblwiO1xyXG5cclxuICAgICAgaWYgKHJvb21zLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgc3RhdGVUZXh0ICs9IFwiTm8gcm9vbXMgaW4gbG9iYnkuXCIgKyBcIlxcblwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUsIHJvb21zW2ldLnBsYXllckNvdW50KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbSBuYW1lOiBcIiArIHJvb21zW2ldLm5hbWUpO1xyXG4gICAgICAgICAgc3RhdGVUZXh0ICs9IFwiUm9vbTogXCIgKyByb29tc1tpXS5uYW1lICsgXCJcXG5cIjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgdGhlcmUgaXMgY2hhbmdlIGluIHJvb21zIGxpc3QgKHJvb20gYWRkZWQsdXBkYXRlZCxyZW1vdmVkIGV0YylcclxuICAgICAgICAgICAgQG1ldGhvZCBvblJvb21MaXN0VXBkYXRlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNVcGRhdGVkXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc0FkZGVkXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1JlbW92ZWRcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Sb29tTGlzdFVwZGF0ZSA9IGZ1bmN0aW9uIChyb29tcywgcm9vbXNVcGRhdGVkLCByb29tc0FkZGVkLCByb29tc1JlbW92ZWQpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5SZXNldFJvb21MaXN0KCk7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5VcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShyb29tc1tpXS5uYW1lLCByb29tc1tpXS5wbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSb29tIG5hbWU6IFwiICsgcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgc3RhdGVUZXh0ICs9IFwiUm9vbTogXCIgKyByb29tc1tpXS5uYW1lICsgXCJcXG5cIjtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhcIlJvb21zIExpc3QgdXBkYXRlZDogXCIgKyByb29tc1VwZGF0ZWQubGVuZ3RoICsgXCIgdXBkYXRlZCwgXCIgKyByb29tc0FkZGVkLmxlbmd0aCArIFwiIGFkZGVkLCBcIiArIHJvb21zUmVtb3ZlZC5sZW5ndGggKyBcIiByZW1vdmVkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGxvY2FsbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uSm9pblJvb21cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Kb2luUm9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8jcmVnaW9uIExvZ3MgZm9yIGdhbWVcclxuICAgICAgY29uc29sZS5sb2coXCJHYW1lIFwiICsgdGhpcy5teVJvb20oKS5uYW1lICsgXCIgam9pbmVkXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlBY3RvcigpKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGgpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKVswXS5sb2FkQmFsYW5jaW5nQ2xpZW50LnVzZXJJZCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKS5fY3VzdG9tUHJvcGVydGllcyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0pO1xyXG4gICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IHRydWUpIHtcclxuICAgICAgICAvL2NoZWNrIGlmIHBsYXllciB3aG8gam9pbmVkIGlzIHNwZWN0YXRlXHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7XHJcbiAgICAgICAgfSwgMTAwMCk7IC8vZnVuY3Rpb24gaW4gVUlNYW5hZ2VyXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlByb2Nlc3NDb3VudGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBqb2lucyByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckpvaW5cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgKFBob3RvblJlZi5vbkFjdG9ySm9pbiA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICB2YXIgX3JlYWxQbGF5ZXIgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuR2V0UmVhbEFjdG9ycygpO1xyXG5cclxuICAgICAgaWYgKF9yZWFsUGxheWVyID09IE1heFN0dWRlbnRzKSB7XHJcbiAgICAgICAgLy93aGVuIG1heCBwbGF5ZXIgcmVxdWlyZWQgdG8gc3RhcnQgZ2FtZSBoYXMgYmVlbiBhZGRlZFxyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFJvb21WYWx1ZXMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCByZXF1aXJlZCBwbGF5ZXJzIGpvaW5lZCwgc3RhcnRpbmcgdGhlIGdhbWUuLlwiKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwicGxheWVycyBmb3VuZFwiKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTtcclxuICAgICAgICB9LCAxMDAwKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKHRydWUsIFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksIGZhbHNlLCBmYWxzZSwgZmFsc2UsIG51bGwsIGZhbHNlLCAwKTtcclxuICAgICAgICAvL1Bob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclwiLFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksdHJ1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoYWN0b3IuYWN0b3JOcik7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgam9pbmVkXCIpO1xyXG4gICAgICAvLyBjb25zb2xlLmVycm9yKFwiVG90YWwgUGxheWVyczogXCIrUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKSk7XHJcbiAgICB9KSxcclxuICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBsZWF2ZXMgYSByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckxlYXZlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgICAgKFBob3RvblJlZi5vbkFjdG9yTGVhdmUgPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgICBpZiAoIUdhbWVGaW5pc2hlZCAmJiAhUmVzdGFydFNwZWN0YXRlKSB7XHJcbiAgICAgICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoIWFjdG9yLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICBpZiAoIU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5MZWF2ZVJvb20pIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzcGVjdGF0b3IgbGVmdCwgc28gZG9udCBtaW5kLCBjb250IGdhbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgbGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBQaG90b25SZWZlcmVjZSA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5nZXRQaG90b25SZWYoKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJUdXJuID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICB2YXIgX3VJR2FtZU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICB2YXIgX3JlYWxQbGF5ZXIgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuR2V0UmVhbEFjdG9ycygpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgX2luaXRpYWxTZXR1cERvbmUgPSBQaG90b25SZWZlcmVjZS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfcmVhbFBsYXllciA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5IYW5kbGVQbGF5ZXJMZWF2ZShhY3RvciwgUGhvdG9uUmVmZXJlY2UsIF9tYW5hZ2VyLCBfcGxheWVyVHVybiwgX2luaXRpYWxTZXR1cERvbmUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfdUlHYW1lTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdUlHYW1lTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTE1MCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX2luaXRpYWxTZXR1cERvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZUFjdG9yQWN0aXZlRGF0YShhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuR2FtZU92ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3VJR2FtZU1hbmFnZXIpIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXN0YXJ0R2FtZSgxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzdGFydEdhbWUoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKF91SUdhbWVNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF91SUdhbWVNYW5hZ2VyLlNob3dUb2FzdChcInBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAxMTUwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuZ2V0U2NlbmVOYW1lKCkgPT0gXCJHYW1lUGxheVwiKSAvL2lmIHNjZW5lIGlzIGdhbWVwbGF5IGxldCBwbGF5ZXIgZmluaXNoIGdhbWUgZm9yY2VmdWxseVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwib3RoZXIgcGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDIwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3VJR2FtZU1hbmFnZXIuU2hvd1RvYXN0KFwicGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDExNTAsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9yZWFsUGxheWVyID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkhhbmRsZVBsYXllckxlYXZlKGFjdG9yLCBQaG90b25SZWZlcmVjZSwgX21hbmFnZXIsIF9wbGF5ZXJUdXJuLCBfaW5pdGlhbFNldHVwRG9uZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfaW5pdGlhbFNldHVwRG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5HYW1lT3Zlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPT0gdHJ1ZSAmJiAhSXNHYW1lU3RhcnRlZCkge1xyXG4gICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Qcm9jZXNzQ291bnRlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCkgPT0gMSAmJiAhUmVzdGFydFNwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBSZXN0YXJ0U3BlY3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc3RhcnRHYW1lKDE1MDApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInJlYXRydGVkXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBvd24gcHJvcGVydGllcyBnb3QgY2hhbmdlZFxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkFjdG9yUHJvcGVydGllc0NoYW5nZSA9IGZ1bmN0aW9uIChhY3Rvcikge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciByb29tIHByb3BlcnRpZXMgZ290IGNoYW5nZWRcclxuICAgICAgICAgICAgQG1ldGhvZCBvbk15Um9vbVByb3BlcnRpZXNDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uTXlSb29tUHJvcGVydGllc0NoYW5nZSA9IGZ1bmN0aW9uIChfZGF0YSkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHRvIGhhbmRsZSBlcnJvcnNcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvckNvZGVcclxuICAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1zZ1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkVycm9yID0gZnVuY3Rpb24gKGVycm9yQ29kZSwgZXJyb3JNc2cpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciBcIiArIGVycm9yQ29kZSArIFwiOiBcIiArIGVycm9yTXNnKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgYW4gZXZlbnQgaXMgcmVjZWl2ZWQgd2l0aCBzb21lIGRhdGFcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkV2ZW50XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBjb2RlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBjb250ZW50XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3Rvck5yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uRXZlbnQgPSBmdW5jdGlvbiAoY29kZSwgY29udGVudCwgYWN0b3JOcikge1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIHN3aXRjaCAoY29kZSkge1xyXG4gICAgICAgIGNhc2UgMTogLy9yZWNldmluZyBwbGF5ZXJkYXRhIGluZm9cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgUGxheWVySW5mb0RhdGEgPSBjb250ZW50LlBsYXllckluZm87XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIFBsYXllckluZm9EYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6IC8vc3RhcnQgdHVybiByYWlzZSBldmVudFxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBzdGFydCB0dXJuIGV2ZW50XCIpO1xyXG4gICAgICAgICAgdmFyIF9UdXJuID0gY29udGVudC5UdXJuTnVtYmVyO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDIsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfVHVybik7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOiAvLyBkaWNlIGNvdW50XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRpY2UgY291bnRcIik7XHJcbiAgICAgICAgICB2YXIgX2RpY2UgPSBjb250ZW50LkRpY2VDb3VudDtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgzLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RpY2UpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDogLy9yZWNlaW5nIHVzZXIgaWQgb2YgcGxheWVyIHdobyBoYXMgY29tcGxldGVkIHR1cm5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIHR1cm4gY29tcGxldGVkXCIpO1xyXG4gICAgICAgICAgdmFyIF9JRCA9IGNvbnRlbnQuVUlEO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDQsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfSUQpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTogLy9yZWNlaXZpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBjYXJkIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2NhcmQgPSBjb250ZW50LkNhcmREYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDUsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfY2FyZCk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OiAvL3JlY2VpdmUgZ2FtZSBvdmVyIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZ2FtZSBvdmVyIGNhbGxcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6IC8vcmVjZWl2ZSBvbmUgUXVlc3Rpb24gZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg3LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgODogLy9yZWNlaXZlIG9uZSBRdWVzdGlvbiByZXNwb25zZSBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIG9uZSBxdWVzdGlvIHJlc3BvbnNlIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoOCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDk6IC8vcmVjZWl2ZSBiYW5rcnVwdCBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGJhbmtydXB0IGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoOSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEwOiAvL3JlY2VpdmUgYmFja3NwYWNlIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgYmFja3NwYWNlIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTAsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMTogLy9yZWNlaXZlaW5nIHBhcnRuZXJzaGlwIG9mZmVyXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTEsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMjogLy9yZWNlaXZlaW5nIHBhcnRuZXJzaGlwIGFuc3dlciBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEyLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTM6IC8vcmVjZWl2aW5nIHByb2ZpdC9sb3NzIGRhdGEgZm9yIHBhcnRuZXJcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgYW53c2VyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTMsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNDogLy9yZWNlaXZpbmcgcm9vbSBjb21wbGV0ZSBkYXRhIHRvIHN0YXJ0IEdhbWVcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgYW53c2VyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJvb21Db21wbGV0ZWQoKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE1OiAvL3JlY2VpdmluZyBwYXlkYXkgaW5mb1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBpbmZvXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE1LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTY6IC8vcmVjZWl2aW5nIGdhbWUgb3ZlciBkYXRhIHRvIHN5bmNcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZ2FtZSBvdmVyIHN5bmMgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxNiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aXBsYXllckNvbnRyb2xsZXI7XHJcbiJdfQ==