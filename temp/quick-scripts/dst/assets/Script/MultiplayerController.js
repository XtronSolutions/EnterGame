
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
    TotalTimer = 5;
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
  SendSelectedPlayerForProfit: function SendSelectedPlayerForProfit(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending game over data to sync");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(17, {
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

        case 17:
          //receiving data of player to get all profit next pay day
          console.log("received data of player to get all profit next pay day");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(17, senderName, senderID, _data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJHYW1lRmluaXNoZWQiLCJJc01hc3RlckNsaWVudCIsIlRvdGFsVGltZXIiLCJUaW1lclN0YXJ0ZWQiLCJTY2hlZHVsYXIiLCJNYXhTdHVkZW50cyIsIlJlc3RhcnRTcGVjdGF0ZSIsIklzR2FtZVN0YXJ0ZWQiLCJUaW1lb3V0cyIsIlJvb21Qcm9wZXJ0eSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllciIsInR5cGUiLCJJbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiSW5pdGlhbFNldHVwIiwiQm9vbGVhbiIsIlBsYXllckdhbWVJbmZvIiwiVGV4dCIsIlR1cm5OdW1iZXIiLCJBcHBfSW5mbyIsIkFwcElEIiwidG9vbHRpcCIsIkFwcFZlcnNpb24iLCJXc3MiLCJkaXNwbGF5TmFtZSIsIk1hc3RlclNlcnZlciIsIkZiQXBwSUQiLCJNdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDb21wb25lbnQiLCJQaG90b25BcHBJbmZvIiwiTWF4UGxheWVycyIsIk1heFNwZWN0YXRvcnMiLCJNb2RlU2VsZWN0aW9uIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwiUmVzZXRSb29tVmFsdWVzIiwib25Mb2FkIiwiSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJUb2dnbGVNb2RlU2VsZWN0aW9uIiwiX3ZhbCIsIkdldFNlbGVjdGVkTW9kZSIsImdhbWUiLCJhZGRQZXJzaXN0Um9vdE5vZGUiLCJub2RlIiwiSW5pdGlhbGl6ZVBob3RvbiIsImNvbnNvbGUiLCJsb2ciLCJBcHBJbmZvIiwiRGVtb0xvYWRCYWxhbmNpbmciLCJMZWF2ZVJvb20iLCJSb29tTmFtZSIsIk1lc3NhZ2UiLCJKb2luZWRSb29tIiwiQ2hlY2tSZWZlcmVuY2VzIiwicmVxdWlyZSIsIlJlbW92ZVBlcnNpc3ROb2RlIiwicmVtb3ZlUGVyc2lzdFJvb3ROb2RlIiwiZ2V0U2NlbmVOYW1lIiwic2NlbmVOYW1lIiwiX3NjZW5lSW5mb3MiLCJpIiwibGVuZ3RoIiwidXVpZCIsImRpcmVjdG9yIiwiX3NjZW5lIiwiX2lkIiwidXJsIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJtYXRjaCIsIlRvZ2dsZVNob3dSb29tX0Jvb2wiLCJfc3RhdGUiLCJUb2dnbGVMZWF2ZVJvb21fQm9vbCIsImdldFBob3RvblJlZiIsIlBob3RvbkFjdG9yIiwibXlBY3RvciIsIlJvb21BY3RvcnMiLCJteVJvb21BY3RvcnNBcnJheSIsIkNoZWNrU3BlY3RhdGUiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwiQXBwSWQiLCJGYkFwcElkIiwiUmVxdWVzdENvbm5lY3Rpb24iLCJzdGF0ZSIsImlzQ29ubmVjdGVkVG9NYXN0ZXIiLCJpc0luTG9iYnkiLCJzdGFydCIsIkRpc2Nvbm5lY3RQaG90b24iLCJpc0pvaW5lZFRvUm9vbSIsImRpc2Nvbm5lY3QiLCJSZXNldFN0YXRlIiwiT25Sb29tTmFtZUNoYW5nZSIsIk9uTWVzc2FnZUNoYW5nZSIsIm1zZyIsIlVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzIiwiX3BsYXllclVwZGF0ZSIsIl9wbGF5ZXJWYWx1ZSIsIl9pbml0aWFsU2V0dXBVcGRhdGUiLCJfaW5pdGlhbFNldHVwVmFsdWUiLCJfcGxheWVyR2FtZUluZm9VcGRhdGUiLCJfcGxheWVyR2FtZUluZm9WYWx1ZSIsIl90dXJuTnVtYmVyVXBkYXRlIiwiX3R1cm5OdW1iZXJ2YWx1ZSIsIm15Um9vbSIsInNldEN1c3RvbVByb3BlcnR5IiwiQ3JlYXRlUm9vbSIsIl9kYXRhIiwicm9vbU9wdGlvbnMiLCJpc1Zpc2libGUiLCJpc09wZW4iLCJtYXhQbGF5ZXJzIiwiY3VzdG9tR2FtZVByb3BlcnRpZXMiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJTdHVkZW50RGF0YSIsIkNvdW50ZXIiLCJzZXRVc2VySWQiLCJ1c2VySUQiLCJSb29tSUQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJEYXRlIiwibm93IiwiY3JlYXRlUm9vbSIsIkpvaW5Sb29tIiwiX3Jvb21OYW1lIiwiam9pblJvb20iLCJKb2luUmFuZG9tUm9vbSIsImV4cGVjdGVkQ3VzdG9tUm9vbVByb3BlcnRpZXMiLCJqb2luUmFuZG9tUm9vbSIsIlNlbmRDYXJkRGF0YSIsInJhaXNlRXZlbnQiLCJDYXJkRGF0YSIsInNlbmRlck5hbWUiLCJzZW5kZXJJRCIsImFjdG9yTnIiLCJyZWNlaXZlcnMiLCJQaG90b24iLCJMb2FkQmFsYW5jaW5nIiwiQ29uc3RhbnRzIiwiUmVjZWl2ZXJHcm91cCIsIkFsbCIsImVyciIsImVycm9yIiwibWVzc2FnZSIsIlNlbmRHYW1lT3ZlciIsIkRhdGEiLCJTZW5kR2FtZU92ZXJEYXRhIiwiU2VuZFNlbGVjdGVkUGxheWVyRm9yUHJvZml0IiwiT3RoZXJzIiwiU2VuZEJhbmtydXB0RGF0YSIsIlNlbmREYXRhIiwiUGxheWVySW5mbyIsIlNlbmRPbmVRdWVzdGlvbkRhdGEiLCJTZW5kUGFydG5lclByb2ZpdExvc3MiLCJTZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGEiLCJEaWNlUm9sbEV2ZW50IiwiRGljZUNvdW50IiwiU2VuZEdvQmFja1NwYWNlRGF0YSIsIlNlbmRQYXJ0bmVyU2hpcE9mZmVyRGF0YSIsIlNlbmRQYXJ0bmVyU2hpcEFuc3dlckRhdGEiLCJTZW5kSW5mbyIsIlN5bmNUdXJuQ29tcGxldGlvbiIsIlVJRCIsIlN0YXJ0VHVybiIsInRyYWNlIiwiU2hvd1RvYXN0IiwiQ2FsbFJlY2lldmVFdmVudCIsIl9ldmVudENvZGUiLCJfc2VuZGVyTmFtZSIsIl9zZW5kZXJJRCIsIkluc3RhbmNlTnVsbCIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwic2V0VGltZW91dCIsIlJlY2VpdmVFdmVudCIsIkRpc2Nvbm5lY3REYXRhIiwiUmVzdGFydEdhbWUiLCJfdGltZXIiLCJpbmRleCIsImNsZWFyVGltZW91dCIsIkdldF9HYW1lTWFuYWdlciIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJsb2FkU2NlbmUiLCJDaGVja01hc3RlckNsaWVudCIsIl9pc01hc3RlciIsIm15Um9vbU1hc3RlckFjdG9yTnIiLCJDaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQiLCJHZXRSZWFsQWN0b3JzIiwiX3JlYWxQbGF5ZXIiLCJBbGxQbGF5ZXJzIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJSb29tQ291bnRlciIsIlNlbmRSb29tQ29tcGxldGVkRGF0YSIsInN5c3RlbUV2ZW50IiwiZW1pdCIsIlByb2Nlc3NDb3VudGVyIiwiX21hc3RlciIsIl9jb3VudGVyIiwiUm9vbUNvbXBsZXRlZCIsInB1c2giLCJVcGRhdGVBY3RvckFjdGl2ZURhdGEiLCJfYWN0b3IiLCJfYWN0b3JzQXJyYXkiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIlBsYXllclVJRCIsIklzQWN0aXZlIiwiSGFuZGxlUGxheWVyTGVhdmUiLCJhY3RvciIsIlBob3RvblJlZmVyZWNlIiwiX21hbmFnZXIiLCJfcGxheWVyVHVybiIsIl9pbml0aWFsU2V0dXBEb25lIiwiX2lzU3BlY3RhdGUiLCJSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUiLCJDaGFuZ2VUdXJuRm9yY2VmdWxseSIsIlNldFBsYXllckxlZnQiLCJSZXNldFNvbWVWYWx1ZXMiLCJfcGxheWVyZm91bmQiLCJzcGxpY2UiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJTeW5jRGF0YSIsInVwZGF0ZSIsImR0Iiwib25TdGF0ZUNoYW5nZSIsIkxCQyIsIkxvYWRCYWxhbmNpbmdDbGllbnQiLCJTdGF0ZVRvTmFtZSIsIkdldF9VSU1hbmFnZXIiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJsb2dnZXIiLCJkZWJ1ZyIsIm1lc3MiLCJpbmZvIiwicGFyYW0iLCJ3YXJuIiwicGFyYW0xIiwicGFyYW0yIiwicGFyYW0zIiwiVG9nZ2xlTG9hZGluZ05vZGUiLCJleGNlcHRpb24iLCJmb3JtYXQiLCJvblJvb21MaXN0Iiwicm9vbXMiLCJSZXNldFJvb21MaXN0IiwiVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkiLCJwbGF5ZXJDb3VudCIsIm9uUm9vbUxpc3RVcGRhdGUiLCJyb29tc1VwZGF0ZWQiLCJyb29tc0FkZGVkIiwicm9vbXNSZW1vdmVkIiwib25Kb2luUm9vbSIsImxvYWRCYWxhbmNpbmdDbGllbnQiLCJ1c2VySWQiLCJfY3VzdG9tUHJvcGVydGllcyIsIm9uQWN0b3JKb2luIiwibXlSb29tQWN0b3JDb3VudCIsIm9uQWN0b3JMZWF2ZSIsIkdhbWVPdmVyIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIkdldFR1cm5OdW1iZXIiLCJfdUlHYW1lTWFuYWdlciIsIm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlIiwib25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlIiwib25FcnJvciIsImVycm9yQ29kZSIsImVycm9yTXNnIiwib25FdmVudCIsImNvZGUiLCJjb250ZW50IiwiUGxheWVySW5mb0RhdGEiLCJfVHVybiIsIl9kaWNlIiwiX0lEIiwiX2NhcmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsU0FBSjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsS0FBckI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsSUFBaEI7QUFDQSxJQUFJQyxXQUFXLEdB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LFVBQVUsR0FBR3dJLE9BQU8sQ0FBQ3hJLFVBQXpCO0FBQ0EsY0FBSUMsUUFBUSxHQUFHdUksT0FBTyxDQUFDdkksUUFBdkI7QUFFQS9HLFVBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQnlJLGdCQUEvQixDQUFnRCxFQUFoRCxFQUFvRGxDLFVBQXBELEVBQWdFQyxRQUFoRSxFQUEwRTdCLEtBQTFFO0FBRUE7O0FBQ0Y7QUExSkY7QUE0SkQsS0E5SkQ7QUErSkQ7QUE1akRrQyxDQUFULENBQTVCO0FBK2pEQTBLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdQLHFCQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9HbG9iYWwgVmFyaWFibGVzXHJcbnZhciBQaG90b25SZWY7XHJcbnZhciBzdGF0ZVRleHQgPSBcIlwiO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIFNob3dSb29tID0gZmFsc2U7XHJcbnZhciBHYW1lRmluaXNoZWQgPSBmYWxzZTtcclxudmFyIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbnZhciBUb3RhbFRpbWVyID0gMzA7XHJcbnZhciBUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxudmFyIFNjaGVkdWxhciA9IG51bGw7XHJcbnZhciBNYXhTdHVkZW50cyA9IDY7XHJcbnZhciBSZXN0YXJ0U3BlY3RhdGUgPSBmYWxzZTtcclxudmFyIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxudmFyIFRpbWVvdXRzID0gW107XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIFJvb21Qcm9wZXJ0eS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSb29tUHJvcGVydHkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJSb29tUHJvcGVydHlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXI6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEluaXRpYWxTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUdXJuTnVtYmVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIEFwcF9JbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEFwcF9JbmZvID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQXBwX0luZm9cIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBBcHBJRDoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQXBwIGlkIGZvcm0gcGhvdG9uIGRhc2hib2FyZFwiLFxyXG4gICAgfSxcclxuICAgIEFwcFZlcnNpb246IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFwcCB2ZXJzaW9uIGZvciBwaG90b25cIixcclxuICAgIH0sXHJcbiAgICBXc3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNTZWN1cmVcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJJZiBwaG90b24gc2hvdWxkIHVzZSBzZWN1cmUgYW5kIHJlbGlhYmxlIHByb3RvY29sc1wiLFxyXG4gICAgfSxcclxuICAgIE1hc3RlclNlcnZlcjoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibWFzdGVyIHNlcnZlciBmb3IgcGhvdG9uIHRvIGNvbm5lY3RcIixcclxuICAgIH0sXHJcbiAgICBGYkFwcElEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJGQiBhcHAgaWQgdXNlZCBmb3IgRkIgYXV0aGVyaXphdGlvblwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBNdWx0aXBsYXllckNvbnRyb2xsZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJNdWx0aXBsYXllckNvbnRyb2xsZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGhvdG9uQXBwSW5mbzoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBBcHBfSW5mbyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1heFBsYXllcnM6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1heFNwZWN0YXRvcnM6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1vZGVTZWxlY3Rpb246IHtcclxuICAgICAgLy8gMSBtZWFucyBib3QgLCAyIG1lYW5zIHJlYWwgcGxheWVyc1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIC8vY3JlYXRpbmcgc3RhdGljIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxEYXRhKCkge1xyXG4gICAgVGltZW91dHMgPSBbXTtcclxuICAgIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIFBob3RvblJlZiA9IG51bGw7XHJcbiAgICBzdGF0ZVRleHQgPSBcIlwiO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIFNob3dSb29tID0gZmFsc2U7XHJcbiAgICBHYW1lRmluaXNoZWQgPSBmYWxzZTtcclxuICAgIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbiAgICBUb3RhbFRpbWVyID0gNTtcclxuICAgIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgU2NoZWR1bGFyID0gbnVsbDtcclxuICAgIHRoaXMuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICBNYXhTdHVkZW50cyA9IDY7XHJcbiAgICBSZXN0YXJ0U3BlY3RhdGUgPSBmYWxzZTtcclxuICB9LFxyXG4gIC8vdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIGNyZWF0ZWRcclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsRGF0YSgpO1xyXG4gICAgdGhpcy5Jbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZU1vZGVTZWxlY3Rpb24oXHJcbiAgICBfdmFsIC8vIDEgbWVhbnMgYm90ICwgMiBtZWFucyByZWFsIHBsYXllcnNcclxuICApIHtcclxuICAgIHRoaXMuTW9kZVNlbGVjdGlvbiA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0U2VsZWN0ZWRNb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuTW9kZVNlbGVjdGlvbjtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IEluaXRpYWxpemUgc29tZSBlc3NlbnRhaWxzIGRhdGEgZm9yIG11bHRpcGxheWVyIGNvbnRyb2xsZXIgY2xhc3NcclxuICAgIEBtZXRob2QgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXJcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKSB7XHJcbiAgICBpZiAoIU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSkge1xyXG4gICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICB0aGlzLkluaXRpYWxpemVQaG90b24oKTtcclxuICAgICAgY29uc29sZS5sb2coQXBwSW5mbyk7XHJcbiAgICAgIFBob3RvblJlZiA9IG5ldyBEZW1vTG9hZEJhbGFuY2luZygpO1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuTGVhdmVSb29tID0gZmFsc2U7XHJcbiAgICB0aGlzLlJvb21OYW1lID0gXCJcIjtcclxuICAgIHRoaXMuTWVzc2FnZSA9IFwiXCI7XHJcbiAgICBTaG93Um9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2hlY2sgcmVmZXJlbmNlIHRvIHNvbWUgdmFyaWFibGVzIGFuZCBjbGFzc2VzXHJcbiAgICBAbWV0aG9kIENoZWNrUmVmZXJlbmNlc1xyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJlbW92ZSBwZXJzaXN0IG5vZGUgd2hlbiB3YW50IHRvIHJlc3RhcnQgc2NlbmVcclxuICAgIEBtZXRob2QgUmVtb3ZlUGVyc2lzdE5vZGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgUmVtb3ZlUGVyc2lzdE5vZGUoKSB7XHJcbiAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UgPSBudWxsO1xyXG4gICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIGdldCBuYW1lIG9mIGN1cnJlbnQgb3BlbmVkIHNjZW5lXHJcbiAgICBAbWV0aG9kIGdldFNjZW5lTmFtZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtzdHJpbmd9IHNjZW5lTmFtZVxyXG4gICAgKiovXHJcbiAgZ2V0U2NlbmVOYW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2NlbmVOYW1lO1xyXG4gICAgdmFyIF9zY2VuZUluZm9zID0gY2MuZ2FtZS5fc2NlbmVJbmZvcztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3NjZW5lSW5mb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKF9zY2VuZUluZm9zW2ldLnV1aWQgPT0gY2MuZGlyZWN0b3IuX3NjZW5lLl9pZCkge1xyXG4gICAgICAgIHNjZW5lTmFtZSA9IF9zY2VuZUluZm9zW2ldLnVybDtcclxuICAgICAgICBzY2VuZU5hbWUgPSBzY2VuZU5hbWUuc3Vic3RyaW5nKHNjZW5lTmFtZS5sYXN0SW5kZXhPZihcIi9cIikgKyAxKS5tYXRjaCgvW15cXC5dKy8pWzBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2NlbmVOYW1lO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gc2V0IFwiU2hvd1Jvb21cIiBib29sIHZhbHVlXHJcbiAgICBAbWV0aG9kIFRvZ2dsZVNob3dSb29tX0Jvb2xcclxuICAgIEBwYXJhbSB7Ym9vbGVhbn0gX3N0YXRlXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICoqL1xyXG4gIFRvZ2dsZVNob3dSb29tX0Jvb2woX3N0YXRlKSB7XHJcbiAgICBTaG93Um9vbSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIHNldCBcIkxlYXZlUm9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlTGVhdmVSb29tX0Jvb2xcclxuICAgIEBwYXJhbSB7Ym9vbGVhbn0gX3N0YXRlXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICoqL1xyXG4gIFRvZ2dsZUxlYXZlUm9vbV9Cb29sKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5MZWF2ZVJvb20gPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIFBob3RvbiBcIlBob3RvblJlZlwiIGluc3RhbmNlIGNyZWF0ZWQgYnkgbXVsdGlwbGF5ZXIgY2xhc3NcclxuICAgIEBtZXRob2QgZ2V0UGhvdG9uUmVmXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gUGhvdG9uUmVmXHJcbiAgICAqKi9cclxuICBnZXRQaG90b25SZWYoKSB7XHJcbiAgICByZXR1cm4gUGhvdG9uUmVmO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBteUFjdG9yIGluc3RhbmNlIGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFBob3RvbkFjdG9yXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gQWN0b3JcclxuICAgICoqL1xyXG4gIFBob3RvbkFjdG9yKCkge1xyXG4gICAgcmV0dXJuIFBob3RvblJlZi5teUFjdG9yKCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIG15Um9vbUFjdG9yc0FycmF5IGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFJvb21BY3RvcnNcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBBY3RvclxyXG4gICAgKiovXHJcbiAgUm9vbUFjdG9ycygpIHtcclxuICAgIHJldHVybiBQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgaXNTcGVjdGF0ZSB2YXJpYWJsZSBmcm9tIGN1c3RvbSBwcm9wZXJ0eSBvZiBjdXJyZW50IGFjdG9yXHJcbiAgICBAbWV0aG9kIENoZWNrU3BlY3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gaXNTcGVjdGF0ZVxyXG4gICAgKiovXHJcbiAgQ2hlY2tTcGVjdGF0ZSgpIHtcclxuICAgIHJldHVybiBQaG90b25SZWYubXlBY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IEluaXRpYWxpemUgcGhvdG9uIHdpdGggYXBwaWQsYXBwIHZlcnNpb24sIFdzcyBldGNcclxuICAgIEBtZXRob2QgSW5pdGlhbGl6ZVBob3RvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBJbml0aWFsaXplUGhvdG9uKCkge1xyXG4gICAgQXBwSW5mby5BcHBJZCA9IHRoaXMuUGhvdG9uQXBwSW5mby5BcHBJRDtcclxuICAgIEFwcEluZm8uQXBwVmVyc2lvbiA9IHRoaXMuUGhvdG9uQXBwSW5mby5BcHBWZXJzaW9uO1xyXG4gICAgQXBwSW5mby5Xc3MgPSB0aGlzLlBob3RvbkFwcEluZm8uV3NzO1xyXG4gICAgQXBwSW5mby5NYXN0ZXJTZXJ2ZXIgPSB0aGlzLlBob3RvbkFwcEluZm8uTWFzdGVyU2VydmVyO1xyXG4gICAgQXBwSW5mby5GYkFwcElkID0gdGhpcy5QaG90b25BcHBJbmZvLkZiQXBwSUQ7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGNvbm5lY3Rpb24gcmVxdWVzdCB0byBwaG90b25cclxuICAgIEBtZXRob2QgUmVxdWVzdENvbm5lY3Rpb25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgUmVxdWVzdENvbm5lY3Rpb24oKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLnN0YXRlID09IDUgfHwgUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlKSBjb25zb2xlLmxvZyhcImFscmVhZHkgY29ubmVjdGVkXCIpO1xyXG4gICAgZWxzZSBQaG90b25SZWYuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IERpc2Nvbm5lY3QgZnJvbSBwaG90b25cclxuICAgIEBtZXRob2QgRGlzY29ubmVjdFBob3RvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBEaXNjb25uZWN0UGhvdG9uKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIFBob3RvblJlZi5kaXNjb25uZWN0KCk7XHJcbiAgICAgIHRoaXMuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgICAvL1Bob3RvblJlZi5sZWF2ZVJvb20oKTtcclxuICAgICAgdGhpcy5SZXNldFN0YXRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vdCBpbnNpZGUgYW55IHJvb20gb3IgbG9iYnkgb3IgY29ubmVjdGVkIHRvIHBob3RvblwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJlc2V0aW5nIGZldyB2YWx1ZXNcclxuICAgIEBtZXRob2QgUmVzZXRTdGF0ZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBSZXNldFN0YXRlKCkge1xyXG4gICAgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5MZWF2ZVJvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgU2hvd1Jvb20gPSBmYWxzZTtcclxuICAgIHN0YXRlVGV4dCA9IFwiXCI7XHJcbiAgICB0aGlzLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gcm9vbSBuYW1lIGdvdCBpbnB1dCBmcm9tIGdhbWVcclxuICAgIEBtZXRob2QgT25Sb29tTmFtZUNoYW5nZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBPblJvb21OYW1lQ2hhbmdlKG5hbWUpIHtcclxuICAgIHRoaXMuUm9vbU5hbWUgPSBuYW1lO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gbWVzc2FnZSB3aW5kb3cgZ290IGlucHV0IGZyb20gZ2FtZVxyXG4gICAgQG1ldGhvZCBPbk1lc3NhZ2VDaGFuZ2VcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBtc2dcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBPbk1lc3NhZ2VDaGFuZ2UobXNnKSB7XHJcbiAgICB0aGlzLk1lc3NhZ2UgPSBtc2c7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSB1cGRhdGUgY3VzdG9tIHJvb20gcHJvcGVydGllc1xyXG4gICAgQG1ldGhvZCBVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlc1xyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKF9wbGF5ZXJVcGRhdGUgPSBmYWxzZSwgX3BsYXllclZhbHVlID0gMCwgX2luaXRpYWxTZXR1cFVwZGF0ZSA9IGZhbHNlLCBfaW5pdGlhbFNldHVwVmFsdWUgPSBmYWxzZSwgX3BsYXllckdhbWVJbmZvVXBkYXRlID0gZmFsc2UsIF9wbGF5ZXJHYW1lSW5mb1ZhbHVlID0gbnVsbCwgX3R1cm5OdW1iZXJVcGRhdGUgPSBmYWxzZSwgX3R1cm5OdW1iZXJ2YWx1ZSA9IDApIHtcclxuICAgIGlmIChfcGxheWVyVXBkYXRlKSBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJcIiwgX3BsYXllclZhbHVlLCB0cnVlKTtcclxuXHJcbiAgICBpZiAoX2luaXRpYWxTZXR1cFVwZGF0ZSkgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIsIF9pbml0aWFsU2V0dXBWYWx1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKF9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSkgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIiwgX3BsYXllckdhbWVJbmZvVmFsdWUsIHRydWUpO1xyXG5cclxuICAgIGlmIChfdHVybk51bWJlclVwZGF0ZSkgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLCBfdHVybk51bWJlcnZhbHVlLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNyZWF0ZSByb29tIHJlcXVlc3RcclxuICAgIEBtZXRob2QgQ3JlYXRlUm9vbVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBDcmVhdGVSb29tKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuc3RhdGUgPT0gOCkge1xyXG4gICAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gZmFsc2UpIHtcclxuICAgICAgICB2YXIgX2RhdGEgPSBuZXcgUm9vbVByb3BlcnR5KCk7XHJcbiAgICAgICAgX2RhdGEuUGxheWVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIHJvb21PcHRpb25zID0ge1xyXG4gICAgICAgICAgaXNWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgaXNPcGVuOiB0cnVlLFxyXG4gICAgICAgICAgbWF4UGxheWVyczogdGhpcy5NYXhQbGF5ZXJzICsgdGhpcy5NYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgY3VzdG9tR2FtZVByb3BlcnRpZXM6IF9kYXRhLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHsgSXNTcGVjdGF0ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIsIHsgQ291bnRlcjogVG90YWxUaW1lciB9KTtcclxuICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgICAgdmFyIFJvb21JRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERhdGUubm93KCkpO1xyXG5cclxuICAgICAgICBQaG90b25SZWYuY3JlYXRlUm9vbShcIlJvb21fXCIgKyBSb29tSUQsIHJvb21PcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBqb2luIHJvb20gcmVxdWVzdCBieSBuYW1lXHJcbiAgICBAbWV0aG9kIEpvaW5Sb29tXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gX3Jvb21OYW1lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgSm9pblJvb20oX3Jvb21OYW1lKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLnN0YXRlID09IDUgfHwgUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5zdGF0ZSA9PSA4KSB7XHJcbiAgICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSBmYWxzZSB8fCBQaG90b25SZWYuc3RhdGUgIT0gOCkge1xyXG4gICAgICAgIHZhciByb29tT3B0aW9ucyA9IHtcclxuICAgICAgICAgIGlzVmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgIGlzT3BlbjogZmFsc2UsXHJcbiAgICAgICAgICBtYXhQbGF5ZXJzOiB0aGlzLk1heFBsYXllcnMgKyB0aGlzLk1heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICAvL1wiY3VzdG9tR2FtZVByb3BlcnRpZXNcIjp7XCJSb29tRXNzZW50aWFsc1wiOiB7SXNTcGVjdGF0ZTp0cnVlfX1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7IElzU3BlY3RhdGU6IHRydWUgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIsIHsgQ291bnRlcjogVG90YWxUaW1lciB9KTtcclxuICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcblxyXG4gICAgICAgIFBob3RvblJlZi5qb2luUm9vbShfcm9vbU5hbWUsIHJvb21PcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBqb2luIHJhbmRvbSByb29tXHJcbiAgICBAbWV0aG9kIEpvaW5SYW5kb21Sb29tXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEpvaW5SYW5kb21Sb29tKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuc3RhdGUgPT0gOCkge1xyXG4gICAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gZmFsc2UgfHwgUGhvdG9uUmVmLnN0YXRlICE9IDgpIHtcclxuICAgICAgICB2YXIgX2RhdGEgPSBuZXcgUm9vbVByb3BlcnR5KCk7XHJcbiAgICAgICAgX2RhdGEuUGxheWVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIHJvb21PcHRpb25zID0ge1xyXG4gICAgICAgICAgLy9cImV4cGVjdGVkTWF4UGxheWVyc1wiOnRoaXMuTWF4UGxheWVycytNYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgZXhwZWN0ZWRDdXN0b21Sb29tUHJvcGVydGllczogX2RhdGEsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwgeyBJc1NwZWN0YXRlOiBmYWxzZSB9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIiwgeyBDb3VudGVyOiBUb3RhbFRpbWVyIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuXHJcbiAgICAgICAgUGhvdG9uUmVmLmpvaW5SYW5kb21Sb29tKHJvb21PcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGNhcmQgaW5kZXggb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRDYXJkRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZENhcmREYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgY2FyZCBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA1LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBDYXJkRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBnYW1lIG92ZXIgY2FsbFxyXG4gICAgQG1ldGhvZCBTZW5kR2FtZU92ZXJcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRHYW1lT3ZlcihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGdhbWUgb3ZlciBjYWxsXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA2LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZEdhbWVPdmVyRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGdhbWUgb3ZlciBkYXRhIHRvIHN5bmNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE2LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZFNlbGVjdGVkUGxheWVyRm9yUHJvZml0KF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZ2FtZSBvdmVyIGRhdGEgdG8gc3luY1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTcsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgYmFja3J1cHQgZGF0YVxyXG4gICAgQG1ldGhvZCBTZW5kQmFua3J1cHREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kQmFua3J1cHREYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgYmFua3J1cGN5IGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDksXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgUGxheWVyIERhdGEgb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBsYXllciBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBQbGF5ZXJJbmZvOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIG9uZSBxdWVzdGlvbiBEYXRhIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kT25lUXVlc3Rpb25EYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kT25lUXVlc3Rpb25EYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDcsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgcHJvZml0IG9yIGxvc3MgdG8geW91ciBwYXNydG5lclxyXG4gICAgQG1ldGhvZCBTZW5kUGFydG5lclByb2ZpdExvc3NcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRQYXJ0bmVyUHJvZml0TG9zcyhfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBvbmUgcXVlc3Rpb24gcmVzcG9uc2Ugb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIHJlc3BvbnNlIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDgsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgZGljZSBkYXRhXHJcbiAgICBAbWV0aG9kIERpY2VSb2xsRXZlbnRcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIERpY2VSb2xsRXZlbnQoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBkaWNlIGNvdW50XCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAzLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEaWNlQ291bnQ6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgZ28gYmFjayBzcGFjZXMgZGF0YVxyXG4gICAgQG1ldGhvZCBTZW5kR29CYWNrU3BhY2VEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kR29CYWNrU3BhY2VEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmQgZ28gYmFjayBzcGFjZXMgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTAsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmRpbmcgb3BlbiBpbnZpdGF0aW9uIHRvIGFsbCBwbGF5ZXJzIGZvciBwYXJ0bmVyIHNoaXBcclxuICAgIEBtZXRob2QgU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kUGFydG5lclNoaXBPZmZlckRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBwYXJ0bmVyIHNoaXAgb2ZmZXJcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDExLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kaW5nIHBhcnRuZXIgYW5zd2VyIGRhdGEgKGFjY2VwdCBvciByZWplY3QpXHJcbiAgICBAbWV0aG9kIFNlbmRQYXJ0bmVyU2hpcEFuc3dlckRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRQYXJ0bmVyU2hpcEFuc3dlckRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBwYXJ0ZW5yc2hpcCBhbnN3ZXIgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTIsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kSW5mbyhfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGluZm9cIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE1LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIHVzZXIgaWQgb2YgcGxheWVyIHRvIGFsbCBvdGhlciB3aG8gaGFkIGNvbXBsZXRlZCB0aGVpciB0dXJuXHJcbiAgICBAbWV0aG9kIFN5bmNUdXJuQ29tcGxldGlvblxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU3luY1R1cm5Db21wbGV0aW9uKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgdHVybiBjb21wbGV0aW9uIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDQsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFVJRDogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU3RhcnQgVHVybiBmb3IgaW5pdGlhbCB0dXJuXHJcbiAgICBAbWV0aG9kIFN0YXJ0VHVyblxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU3RhcnRUdXJuKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLnRyYWNlKFwiU3RhcnRpbmcgVHVyblwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgVHVybk51bWJlcjogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2hvdyB0b2FzdCBtZXNzYWdlIG9uIHRoZSBjb25zb2xlXHJcbiAgICBAbWV0aG9kIFNob3dUb2FzdFxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgbWVzc2FnZSB0byBiZSBzaG93biBcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidG9hc3QgbWVzc2FnZTogXCIgKyBtc2cpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgUmVjZWl2ZSBldmVudCBmcm9tIHBob3RvbiByYWlzZSBvbiBcclxuICAgIEBtZXRob2QgQ2FsbFJlY2lldmVFdmVudFxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIENhbGxSZWNpZXZlRXZlbnQ6IGZ1bmN0aW9uIChfZXZlbnRDb2RlLCBfc2VuZGVyTmFtZSwgX3NlbmRlcklELCBfZGF0YSkge1xyXG4gICAgdmFyIEluc3RhbmNlTnVsbCA9IHRydWU7XHJcblxyXG4gICAgLy90byBjaGVjayBpZiBpbnN0YW5jZSBpcyBudWxsIGluIGNhc2UgY2xhc3MgaW5zdGFuY2UgaXMgbm90IGxvYWRlZCBhbmQgaXRzIHJlY2VpdmVzIGNhbGxiYWNrXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkgPT0gbnVsbCkge1xyXG4gICAgICBJbnN0YW5jZU51bGwgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkNhbGxSZWNpZXZlRXZlbnQoX2V2ZW50Q29kZSwgX3NlbmRlck5hbWUsIF9zZW5kZXJJRCwgX2RhdGEpO1xyXG4gICAgICB9LCA1MCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnN0YW5jZU51bGwgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIF9zZW5kZXJOYW1lLCBfc2VuZGVySUQsIF9kYXRhKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBEaXNjb25uZWN0RGF0YSgpIHtcclxuICAgIEdhbWVGaW5pc2hlZCA9IHRydWU7XHJcbiAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gIH0sXHJcblxyXG4gIFJlc3RhcnRHYW1lKF90aW1lciA9IDApIHtcclxuICAgIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgVGltZW91dHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0c1tpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgIH0sIF90aW1lcik7XHJcbiAgICAvLyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKClcclxuICB9LFxyXG5cclxuICBDaGVja01hc3RlckNsaWVudChfaWQpIHtcclxuICAgIHZhciBfaXNNYXN0ZXIgPSBmYWxzZTtcclxuICAgIGlmIChQaG90b25SZWYubXlSb29tTWFzdGVyQWN0b3JOcigpID09IF9pZCAmJiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgPT0gX2lkKSB7XHJcbiAgICAgIF9pc01hc3RlciA9IHRydWU7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUuZXJyb3IoX2lzTWFzdGVyKTtcclxuICAgIHJldHVybiBfaXNNYXN0ZXI7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCkge1xyXG4gICAgdmFyIF9pc01hc3RlciA9IGZhbHNlO1xyXG4gICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciA9PSBQaG90b25SZWYubXlSb29tTWFzdGVyQWN0b3JOcigpKSB7XHJcbiAgICAgIF9pc01hc3RlciA9IHRydWU7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jb25zb2xlLmVycm9yKF9pc01hc3Rlcik7XHJcbiAgICByZXR1cm4gX2lzTWFzdGVyO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0Um9vbVZhbHVlcygpIHtcclxuICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBJc01hc3RlckNsaWVudCA9IGZhbHNlO1xyXG4gICAgICBUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIH0sIDEwMDApO1xyXG4gIH0sXHJcblxyXG4gIEdldFJlYWxBY3RvcnMoKSB7XHJcbiAgICB2YXIgX3JlYWxQbGF5ZXIgPSAwO1xyXG4gICAgdmFyIEFsbFBsYXllcnMgPSBQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBbGxQbGF5ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoQWxsUGxheWVyc1tpbmRleF0uZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICBfcmVhbFBsYXllcisrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3JlYWxQbGF5ZXI7XHJcbiAgfSxcclxuXHJcbiAgUm9vbUNvdW50ZXIoX3RpbWVyKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICAgIHZhciBfZGF0YSA9IG51bGw7XHJcbiAgICBTY2hlZHVsYXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKElzTWFzdGVyQ2xpZW50KSB7XHJcbiAgICAgICAgaWYgKF90aW1lciA+IDApIHtcclxuICAgICAgICAgIF90aW1lci0tO1xyXG4gICAgICAgICAgdGhpcy5Sb29tQ291bnRlcihfdGltZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwidGltZXIgY29tcGxldGVkXCIpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuR2V0UmVhbEFjdG9ycygpID4gMSkge1xyXG4gICAgICAgICAgICAvL2lmIGhhcyBtb3JlIHRoYW4gb25lIHBsYXllciBzdGFydCByZWFsIGdhbWVcclxuICAgICAgICAgICAgdGhpcy5TZW5kUm9vbUNvbXBsZXRlZERhdGEoKTtcclxuICAgICAgICAgIH0gLy9zdGFydCBnYW1lIHdpdGggYm90XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlRvZ2dsZU1vZGVTZWxlY3Rpb24oMSk7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Ub2dnbGVTaG93Um9vbV9Cb29sKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzID0gMjtcclxuICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luZWRSb29tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICAgICAgfVxyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuXHJcbiAgUHJvY2Vzc0NvdW50ZXIoKSB7XHJcbiAgICB2YXIgX21hc3RlciA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoKTtcclxuICAgIGlmIChfbWFzdGVyKSB7XHJcbiAgICAgIGlmICghVGltZXJTdGFydGVkKSB7XHJcbiAgICAgICAgVGltZXJTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICB2YXIgX2NvdW50ZXIgPSBQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIilbXCJDb3VudGVyXCJdO1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Sb29tQ291bnRlcihfY291bnRlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgcm9vbSBjb21wbGV0ZWQgZGF0YVxyXG4gICAgQG1ldGhvZCBTZW5kUm9vbUNvbXBsZXRlZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRSb29tQ29tcGxldGVkRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIFJvb21Db21wbGV0ZWREYXRhXCIpO1xyXG4gICAgICAvLyAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTQsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSb29tQ29tcGxldGVkKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9yZWFsUGxheWVyID0gdGhpcy5HZXRSZWFsQWN0b3JzKCk7XHJcbiAgICAgIElzR2FtZVN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycyA9IF9yZWFsUGxheWVyO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFsbCByZXF1aXJlZCBwbGF5ZXJzIGpvaW5lZCwgc3RhcnRpbmcgdGhlIGdhbWUuLlwiKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgIFRpbWVvdXRzLnB1c2goXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTtcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgICApOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKHRydWUsIF9yZWFsUGxheWVyLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBudWxsLCBmYWxzZSwgMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQWN0b3JBY3RpdmVEYXRhKF9hY3Rvcikge1xyXG4gICAgdmFyIF9hY3RvcnNBcnJheSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIHZhciBfZGF0YSA9IG51bGw7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBfZGF0YSA9IF9hY3RvcnNBcnJheVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgaWYgKF9kYXRhLlBsYXllclVJRCA9PSBfYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgIF9kYXRhLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgX2FjdG9yc0FycmF5W2luZGV4XS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwidXBkYXRpbmcgYWN0aXZlIHN0YXR1cyBvZiB0aGUgcGxheWVyIHdobyBoYXMgbGVmdC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlwiKTtcclxuICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgfSxcclxuXHJcbiAgSGFuZGxlUGxheWVyTGVhdmUoYWN0b3IgPSBudWxsLCBQaG90b25SZWZlcmVjZSA9IG51bGwsIF9tYW5hZ2VyID0gbnVsbCwgX3BsYXllclR1cm4gPSAwLCBfaW5pdGlhbFNldHVwRG9uZSA9IGZhbHNlLCBfaXNTcGVjdGF0ZSA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2luaXRpYWxTZXR1cERvbmUpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZUFjdG9yQWN0aXZlRGF0YShhY3Rvcik7XHJcbiAgICAgICAgICBpZiAoIV9pc1NwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZShfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgaWYgKF9wbGF5ZXJUdXJuID09IGluZGV4ICYmIFBob3RvblJlZmVyZWNlLm15QWN0b3IoKS5hY3Rvck5yID09IFBob3RvblJlZmVyZWNlLm15Um9vbU1hc3RlckFjdG9yTnIoKSkge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLkNoYW5nZVR1cm5Gb3JjZWZ1bGx5KCk7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2V0UGxheWVyTGVmdCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX21hbmFnZXIuUmVzZXRTb21lVmFsdWVzKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBfdUlNYW5hZ2VyLlNob3dUb2FzdChcInBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAxMDAwKTtcclxuICAgICAgdmFyIF9wbGF5ZXJmb3VuZCA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQgPT0gYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMtLTtcclxuICAgICAgICAgIF9wbGF5ZXJmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlQWN0b3JBY3RpdmVEYXRhKGFjdG9yKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFfcGxheWVyZm91bmQpIHtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycy0tO1xyXG4gICAgICAgIGlmICghX2lzU3BlY3RhdGUpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TeW5jRGF0YShudWxsLCBhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklELCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgY29uc29sZS5sb2coTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy9jYWxsZWQgZXZlcnkgZnJhbWVcclxuICB1cGRhdGUoZHQpIHtcclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHRoZXJlIGlzIHNvbWUgY2hhbmdlIGluIGNvbm5lY3Rpb24gc3RhdGVcclxuICAgICAgICAgICAgQG1ldGhvZCBvblN0YXRlQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vblN0YXRlQ2hhbmdlID0gZnVuY3Rpb24gKHN0YXRlKSB7XHJcbiAgICAgIC8vI3JlZ2lvbiBDb25uZWN0aW9uIFN0YXRlc1xyXG4gICAgICAvL3N0YXRlIDEgOiBjb25uZWN0aW5nVG9OYW1lU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgMiA6IENvbm5lY3RlZFRvTmFtZVNlcnZlclxyXG4gICAgICAvL1N0YXRlIDMgOiBDb25uZWN0aW5nVG9NYXN0ZXJTZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSA0IDogQ29ubmVjdGVkVG9NYXN0ZXJTZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSA1OiAgSm9pbmVkTG9iYnlcclxuICAgICAgLy9TdGF0ZSA2IDogQ29ubmVjdGluZ1RvR2FtZXNlcnZlclxyXG4gICAgICAvL1N0YXRlIDcgOiBDb25uZWN0ZWRUb0dhbWVzZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSA4IDogSm9pbmVkXHJcbiAgICAgIC8vU3RhdGUgMTA6IERpc2Nvbm5lY3RlZFxyXG4gICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgIHZhciBMQkMgPSBQaG90b24uTG9hZEJhbGFuY2luZy5Mb2FkQmFsYW5jaW5nQ2xpZW50O1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlN0YXRlQ29kZTogXCIgKyBzdGF0ZSArIFwiIFwiICsgTEJDLlN0YXRlVG9OYW1lKHN0YXRlKSk7XHJcblxyXG4gICAgICBpZiAoc3RhdGUgPT0gMSkgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcImNvbm5lY3RpbmcgdG8gc2VydmVyLi4uXCIpO1xyXG4gICAgICBlbHNlIGlmIChzdGF0ZSA9PSA0KSBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwiY29ubmVjdGVkIHRvIHNlcnZlclwiKTtcclxuICAgICAgZWxzZSBpZiAoc3RhdGUgPT0gNSkge1xyXG4gICAgICAgIC8vaGFzIGpvaW5lZCBsb2JieVxyXG4gICAgICAgIGlmIChTaG93Um9vbSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcIndhaXRpbmcgZm9yIG90aGVyIHBsYXllcnMuLi5cIik7XHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pblJhbmRvbVJvb20oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFNob3dSb29tID09IHRydWUpIHtcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzaG93aW5nIHJvb21zIGxpc3QuLi5cIik7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSSh0cnVlKTtcclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGRlYnVnXHJcbiAgICAgICAgICAgIEBtZXRob2QgZGVidWdcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYubG9nZ2VyLmRlYnVnID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgaW5mb1xyXG4gICAgICAgICAgICBAbWV0aG9kIGluZm9cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5pbmZvID0gZnVuY3Rpb24gKG1lc3MsIHBhcmFtKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MgKyBwYXJhbSk7XHJcbiAgICAgIHN0YXRlVGV4dCArPSBtZXNzICsgXCIgXCIgKyBwYXJhbSArIFwiXFxuXCI7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgd2FyblxyXG4gICAgICAgICAgICBAbWV0aG9kIHdhcm5cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtMVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTNcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYubG9nZ2VyLndhcm4gPSBmdW5jdGlvbiAobWVzcywgcGFyYW0xLCBwYXJhbTIsIHBhcmFtMykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzICsgXCIgXCIgKyBwYXJhbTEgKyBcIiBcIiArIHBhcmFtMiArIFwiIFwiICsgcGFyYW0zKTtcclxuXHJcbiAgICAgIGlmIChwYXJhbTEgPT0gMjI1KSB7XHJcbiAgICAgICAgLy9ubyByb29tIGZvdW5kXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJubyByYW5kb20gcm9vbSB3YXMgZm91bmQsIGNyZWF0aW5nIG9uZVwiKTtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ3JlYXRlUm9vbSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyYW0xID09IDIyNikge1xyXG4gICAgICAgIC8vcm9vbSBkb2VzIG5vdCBleGlzdHMgb3IgaXMgZnVsbFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUm9vbSBpcyBmdWxsLCBwbGVhc2Ugc2VsZWN0IGFueSBvdGhlciByb29tIHRvIHNwZWN0YXRlLlwiKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGVycm9yXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXJyb3JcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5lcnJvciA9IGZ1bmN0aW9uIChtZXNzLCBwYXJhbSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBleGNlcHRpb25cclxuICAgICAgICAgICAgQG1ldGhvZCBleGNlcHRpb25cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYubG9nZ2VyLmV4Y2VwdGlvbiA9IGZ1bmN0aW9uIChtZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHNvbWUgZm9ybWF0XHJcbiAgICAgICAgICAgIEBtZXRob2QgZm9ybWF0XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5mb3JtYXQgPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgcGxheWVyIGpvaW5zIGxvYmJ5XHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Sb29tTGlzdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Sb29tTGlzdCA9IGZ1bmN0aW9uIChyb29tcykge1xyXG4gICAgICBzdGF0ZVRleHQgKz0gXCJcXG5cIiArIFwiUm9vbXMgTGlzdDpcIiArIFwiXFxuXCI7XHJcblxyXG4gICAgICBpZiAocm9vbXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICBzdGF0ZVRleHQgKz0gXCJObyByb29tcyBpbiBsb2JieS5cIiArIFwiXFxuXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5SZXNldFJvb21MaXN0KCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkocm9vbXNbaV0ubmFtZSwgcm9vbXNbaV0ucGxheWVyQ291bnQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJSb29tIG5hbWU6IFwiICsgcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICBzdGF0ZVRleHQgKz0gXCJSb29tOiBcIiArIHJvb21zW2ldLm5hbWUgKyBcIlxcblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBjaGFuZ2UgaW4gcm9vbXMgbGlzdCAocm9vbSBhZGRlZCx1cGRhdGVkLHJlbW92ZWQgZXRjKVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RVcGRhdGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1VwZGF0ZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zQWRkZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zUmVtb3ZlZFxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vblJvb21MaXN0VXBkYXRlID0gZnVuY3Rpb24gKHJvb21zLCByb29tc1VwZGF0ZWQsIHJvb21zQWRkZWQsIHJvb21zUmVtb3ZlZCkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlJlc2V0Um9vbUxpc3QoKTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUsIHJvb21zW2ldLnBsYXllckNvdW50KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJvb20gbmFtZTogXCIgKyByb29tc1tpXS5uYW1lKTtcclxuICAgICAgICBzdGF0ZVRleHQgKz0gXCJSb29tOiBcIiArIHJvb21zW2ldLm5hbWUgKyBcIlxcblwiO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiUm9vbXMgTGlzdCB1cGRhdGVkOiBcIiArIHJvb21zVXBkYXRlZC5sZW5ndGggKyBcIiB1cGRhdGVkLCBcIiArIHJvb21zQWRkZWQubGVuZ3RoICsgXCIgYWRkZWQsIFwiICsgcm9vbXNSZW1vdmVkLmxlbmd0aCArIFwiIHJlbW92ZWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgbG9jYWxseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBqb2lucyByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Kb2luUm9vbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkpvaW5Sb29tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyNyZWdpb24gTG9ncyBmb3IgZ2FtZVxyXG4gICAgICBjb25zb2xlLmxvZyhcIkdhbWUgXCIgKyB0aGlzLm15Um9vbSgpLm5hbWUgKyBcIiBqb2luZWRcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teUFjdG9yKCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpWzBdLmxvYWRCYWxhbmNpbmdDbGllbnQudXNlcklkKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpLl9jdXN0b21Qcm9wZXJ0aWVzKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSk7XHJcbiAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIHdobyBqb2luZWQgaXMgc3BlY3RhdGVcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTtcclxuICAgICAgICB9LCAxMDAwKTsgLy9mdW5jdGlvbiBpbiBVSU1hbmFnZXJcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUHJvY2Vzc0NvdW50ZXIoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIHJlbW90ZWx5IGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIGpvaW5zIHJvb21cclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9ySm9pblxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICAoUGhvdG9uUmVmLm9uQWN0b3JKb2luID0gZnVuY3Rpb24gKGFjdG9yKSB7XHJcbiAgICAgIHZhciBfcmVhbFBsYXllciA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5HZXRSZWFsQWN0b3JzKCk7XHJcblxyXG4gICAgICBpZiAoX3JlYWxQbGF5ZXIgPT0gTWF4U3R1ZGVudHMpIHtcclxuICAgICAgICAvL3doZW4gbWF4IHBsYXllciByZXF1aXJlZCB0byBzdGFydCBnYW1lIGhhcyBiZWVuIGFkZGVkXHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHJlcXVpcmVkIHBsYXllcnMgam9pbmVkLCBzdGFydGluZyB0aGUgZ2FtZS4uXCIpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJwbGF5ZXJzIGZvdW5kXCIpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0cnVlLCB0cnVlLCBcIkdhbWVQbGF5XCIpO1xyXG4gICAgICAgIH0sIDEwMDApOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXModHJ1ZSwgUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgbnVsbCwgZmFsc2UsIDApO1xyXG4gICAgICAgIC8vUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyXCIsUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSx0cnVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudChhY3Rvci5hY3Rvck5yKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBqb2luZWRcIik7XHJcbiAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJUb3RhbCBQbGF5ZXJzOiBcIitQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpKTtcclxuICAgIH0pLFxyXG4gICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIHJlbW90ZWx5IGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIGxlYXZlcyBhIHJvb21cclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9yTGVhdmVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgICAoUGhvdG9uUmVmLm9uQWN0b3JMZWF2ZSA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICAgIGlmICghR2FtZUZpbmlzaGVkICYmICFSZXN0YXJ0U3BlY3RhdGUpIHtcclxuICAgICAgICAgIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmICghYWN0b3IuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgIGlmICghTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkxlYXZlUm9vbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWN0YXRvciBsZWZ0LCBzbyBkb250IG1pbmQsIGNvbnQgZ2FtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIFBob3RvblJlZmVyZWNlID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLmdldFBob3RvblJlZigpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX3BsYXllclR1cm4gPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIHZhciBfdUlHYW1lTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVhbFBsYXllciA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5HZXRSZWFsQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBfaW5pdGlhbFNldHVwRG9uZSA9IFBob3RvblJlZmVyZWNlLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9yZWFsUGxheWVyID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkhhbmRsZVBsYXllckxlYXZlKGFjdG9yLCBQaG90b25SZWZlcmVjZSwgX21hbmFnZXIsIF9wbGF5ZXJUdXJuLCBfaW5pdGlhbFNldHVwRG9uZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKF91SUdhbWVNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF91SUdhbWVNYW5hZ2VyLlNob3dUb2FzdChcInBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAxMTUwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfaW5pdGlhbFNldHVwRG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQgPT0gYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlQWN0b3JBY3RpdmVEYXRhKGFjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5HYW1lT3Zlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdUlHYW1lTWFuYWdlcikgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc3RhcnRHYW1lKDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXN0YXJ0R2FtZSgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX3VJR2FtZU1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3VJR2FtZU1hbmFnZXIuU2hvd1RvYXN0KFwicGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDExNTAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5nZXRTY2VuZU5hbWUoKSA9PSBcIkdhbWVQbGF5XCIpIC8vaWYgc2NlbmUgaXMgZ2FtZXBsYXkgbGV0IHBsYXllciBmaW5pc2ggZ2FtZSBmb3JjZWZ1bGx5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJvdGhlciBwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpbk1lbnVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9LCAyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfdUlHYW1lTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTE1MCwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3JlYWxQbGF5ZXIgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSGFuZGxlUGxheWVyTGVhdmUoYWN0b3IsIFBob3RvblJlZmVyZWNlLCBfbWFuYWdlciwgX3BsYXllclR1cm4sIF9pbml0aWFsU2V0dXBEb25lLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKF9pbml0aWFsU2V0dXBEb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLkdhbWVPdmVyKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9PSB0cnVlICYmICFJc0dhbWVTdGFydGVkKSB7XHJcbiAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlByb2Nlc3NDb3VudGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IHRydWUpIHtcclxuICAgICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSA9PSAxICYmICFSZXN0YXJ0U3BlY3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIFJlc3RhcnRTcGVjdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzdGFydEdhbWUoMTUwMCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVhdHJ0ZWRcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIG93biBwcm9wZXJ0aWVzIGdvdCBjaGFuZ2VkXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvclByb3BlcnRpZXNDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlID0gZnVuY3Rpb24gKGFjdG9yKSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIHJvb20gcHJvcGVydGllcyBnb3QgY2hhbmdlZFxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uTXlSb29tUHJvcGVydGllc0NoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlID0gZnVuY3Rpb24gKF9kYXRhKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gdG8gaGFuZGxlIGVycm9yc1xyXG4gICAgICAgICAgICBAbWV0aG9kIG9uRXJyb3JcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGVycm9yQ29kZVxyXG4gICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGVycm9yTXNnXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3JDb2RlLCBlcnJvck1zZykge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIFwiICsgZXJyb3JDb2RlICsgXCI6IFwiICsgZXJyb3JNc2cpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBhbiBldmVudCBpcyByZWNlaXZlZCB3aXRoIHNvbWUgZGF0YVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uRXZlbnRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvZGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvbnRlbnRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yTnJcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25FdmVudCA9IGZ1bmN0aW9uIChjb2RlLCBjb250ZW50LCBhY3Rvck5yKSB7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgc3dpdGNoIChjb2RlKSB7XHJcbiAgICAgICAgY2FzZSAxOiAvL3JlY2V2aW5nIHBsYXllcmRhdGEgaW5mb1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwbGF5ZXIgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBQbGF5ZXJJbmZvRGF0YSA9IGNvbnRlbnQuUGxheWVySW5mbztcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgUGxheWVySW5mb0RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjogLy9zdGFydCB0dXJuIHJhaXNlIGV2ZW50XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHN0YXJ0IHR1cm4gZXZlbnRcIik7XHJcbiAgICAgICAgICB2YXIgX1R1cm4gPSBjb250ZW50LlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9UdXJuKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6IC8vIGRpY2UgY291bnRcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGljZSBjb3VudFwiKTtcclxuICAgICAgICAgIHZhciBfZGljZSA9IGNvbnRlbnQuRGljZUNvdW50O1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDMsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGljZSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OiAvL3JlY2VpbmcgdXNlciBpZCBvZiBwbGF5ZXIgd2hvIGhhcyBjb21wbGV0ZWQgdHVyblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwbGF5ZXIgdHVybiBjb21wbGV0ZWRcIik7XHJcbiAgICAgICAgICB2YXIgX0lEID0gY29udGVudC5VSUQ7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9JRCk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OiAvL3JlY2VpdmluZyBjYXJkIGRhdGEgKGluZGV4KSBzbyBvdGhlciB1c2VycyBjYW4gc3luYyB0aGVtXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGNhcmQgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfY2FyZCA9IGNvbnRlbnQuQ2FyZERhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9jYXJkKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDY6IC8vcmVjZWl2ZSBnYW1lIG92ZXIgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBnYW1lIG92ZXIgY2FsbFwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg2LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNzogLy9yZWNlaXZlIG9uZSBRdWVzdGlvbiBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIG9uZSBxdWVzdGlvbiBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDcsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA4OiAvL3JlY2VpdmUgb25lIFF1ZXN0aW9uIHJlc3BvbnNlIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgb25lIHF1ZXN0aW8gcmVzcG9uc2UgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg4LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgOTogLy9yZWNlaXZlIGJhbmtydXB0IGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgYmFua3J1cHQgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg5LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTA6IC8vcmVjZWl2ZSBiYWNrc3BhY2UgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBiYWNrc3BhY2UgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDExOiAvL3JlY2VpdmVpbmcgcGFydG5lcnNoaXAgb2ZmZXJcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgb2ZmZXIgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEyOiAvL3JlY2VpdmVpbmcgcGFydG5lcnNoaXAgYW5zd2VyIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgYW53c2VyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTIsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMzogLy9yZWNlaXZpbmcgcHJvZml0L2xvc3MgZGF0YSBmb3IgcGFydG5lclxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBhbndzZXIgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE0OiAvL3JlY2VpdmluZyByb29tIGNvbXBsZXRlIGRhdGEgdG8gc3RhcnQgR2FtZVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBhbndzZXIgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUm9vbUNvbXBsZXRlZCgpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTU6IC8vcmVjZWl2aW5nIHBheWRheSBpbmZvXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGluZm9cIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTUsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNjogLy9yZWNlaXZpbmcgZ2FtZSBvdmVyIGRhdGEgdG8gc3luY1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBnYW1lIG92ZXIgc3luYyBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE2LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTc6IC8vcmVjZWl2aW5nIGRhdGEgb2YgcGxheWVyIHRvIGdldCBhbGwgcHJvZml0IG5leHQgcGF5IGRheVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkYXRhIG9mIHBsYXllciB0byBnZXQgYWxsIHByb2ZpdCBuZXh0IHBheSBkYXlcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTcsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyO1xyXG4iXX0=