
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
var GameFinished = false; //---------------------------------------class data related to RoomProperty------------------------------------------------//

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
  RestartGame: function RestartGame() {
    MultiplayerController.Instance.JoinedRoom = false;
    MultiplayerController.Instance.ResetState();
    MultiplayerController.Instance.DisconnectPhoton();
    GamePlayReferenceManager.Instance.Get_GameManager().ClearDisplayTimeout();
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
    GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
    GamePlayReferenceManager.Instance.RemovePersistNode();
    MultiplayerController.Instance.RemovePersistNode(); // GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();

    cc.director.loadScene("MainMenu");
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
    };
    /**
        @summary function called remotely by photon when even player joins room
        @method onActorJoin
        @param {object} actor
        @returns no return
    **/


    PhotonRef.onActorJoin = function (actor) {
      if (PhotonRef.myRoomActorCount() == MultiplayerController.Instance.MaxPlayers) //when max player required to start game has been added
        {
          console.log("all required players joined, starting the game..");
          cc.systemEvent.emit("UpdateStatusWindow", "players found");
          cc.systemEvent.emit("UpdateStatusWindow", "starting game...");
          MultiplayerController.Instance.JoinedRoom = true;
          setTimeout(function () {
            cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay");
          }, 1000); //function in ui manager

          MultiplayerController.Instance.UpdateRoomCustomProperites(true, PhotonRef.myRoomActorCount(), false, false, false, null, false, 0); //PhotonRef.myRoom().setCustomProperty("Player",PhotonRef.myRoomActorCount(),true);  
        }

      console.log("actor " + actor.actorNr + " joined");
      console.error("Total Players: " + PhotonRef.myRoomActorCount());
      console.log(PhotonRef.myRoom());
    },
    /**
        @summary function called remotely by photon when even player leaves a room
        @method onActorLeave
        @param {object} actor
        @returns no return
    **/
    PhotonRef.onActorLeave = function (actor) {
      if (!GameFinished) {
        if (MultiplayerController.Instance.JoinedRoom == true) {
          if (!actor.customProperties.PlayerSessionData.GameOver) {
            if (!MultiplayerController.Instance.LeaveRoom) {
              if (actor.customProperties.RoomEssentials.IsSpectate) {
                console.log("spectator left, so dont mind, cont game");
                console.log("actor " + actor.actorNr + " left");
                GamePlayReferenceManager.Instance.Get_GameManager().CheckTurnOnSpectateLeave_SpectateManager();
              } else {
                console.log("actor " + actor.actorNr + " left");
                MultiplayerController.Instance.JoinedRoom = false;
                MultiplayerController.Instance.ResetState();
                MultiplayerController.Instance.DisconnectPhoton();

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


    PhotonRef.onMyRoomPropertiesChange = function () {};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJHYW1lRmluaXNoZWQiLCJSb29tUHJvcGVydHkiLCJjYyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJQbGF5ZXIiLCJ0eXBlIiwiSW50ZWdlciIsInNlcmlhbGl6YWJsZSIsIkluaXRpYWxTZXR1cCIsIkJvb2xlYW4iLCJQbGF5ZXJHYW1lSW5mbyIsIlRleHQiLCJUdXJuTnVtYmVyIiwiQXBwX0luZm8iLCJBcHBJRCIsInRvb2x0aXAiLCJBcHBWZXJzaW9uIiwiV3NzIiwiZGlzcGxheU5hbWUiLCJNYXN0ZXJTZXJ2ZXIiLCJGYkFwcElEIiwiTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiQ29tcG9uZW50IiwiUGhvdG9uQXBwSW5mbyIsIk1heFBsYXllcnMiLCJNYXhTcGVjdGF0b3JzIiwiTW9kZVNlbGVjdGlvbiIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlJlc2V0QWxsRGF0YSIsIm9uTG9hZCIsIkluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTW9kZVNlbGVjdGlvbiIsIl92YWwiLCJHZXRTZWxlY3RlZE1vZGUiLCJnYW1lIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIkluaXRpYWxpemVQaG90b24iLCJjb25zb2xlIiwibG9nIiwiQXBwSW5mbyIsIkRlbW9Mb2FkQmFsYW5jaW5nIiwiTGVhdmVSb29tIiwiUm9vbU5hbWUiLCJNZXNzYWdlIiwiSm9pbmVkUm9vbSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsImdldFNjZW5lTmFtZSIsInNjZW5lTmFtZSIsIl9zY2VuZUluZm9zIiwiaSIsImxlbmd0aCIsInV1aWQiLCJkaXJlY3RvciIsIl9zY2VuZSIsIl9pZCIsInVybCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibWF0Y2giLCJUb2dnbGVTaG93Um9vbV9Cb29sIiwiX3N0YXRlIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJnZXRQaG90b25SZWYiLCJQaG90b25BY3RvciIsIm15QWN0b3IiLCJSb29tQWN0b3JzIiwibXlSb29tQWN0b3JzQXJyYXkiLCJDaGVja1NwZWN0YXRlIiwiY3VzdG9tUHJvcGVydGllcyIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIkFwcElkIiwiRmJBcHBJZCIsIlJlcXVlc3RDb25uZWN0aW9uIiwic3RhdGUiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5Iiwic3RhcnQiLCJEaXNjb25uZWN0UGhvdG9uIiwiaXNKb2luZWRUb1Jvb20iLCJkaXNjb25uZWN0IiwiUmVzZXRTdGF0ZSIsIk9uUm9vbU5hbWVDaGFuZ2UiLCJPbk1lc3NhZ2VDaGFuZ2UiLCJtc2ciLCJVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyIsIl9wbGF5ZXJVcGRhdGUiLCJfcGxheWVyVmFsdWUiLCJfaW5pdGlhbFNldHVwVXBkYXRlIiwiX2luaXRpYWxTZXR1cFZhbHVlIiwiX3BsYXllckdhbWVJbmZvVXBkYXRlIiwiX3BsYXllckdhbWVJbmZvVmFsdWUiLCJfdHVybk51bWJlclVwZGF0ZSIsIl90dXJuTnVtYmVydmFsdWUiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNyZWF0ZVJvb20iLCJfZGF0YSIsInJvb21PcHRpb25zIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU3R1ZGVudERhdGEiLCJzZXRVc2VySWQiLCJ1c2VySUQiLCJSb29tSUQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJEYXRlIiwibm93IiwiY3JlYXRlUm9vbSIsIkpvaW5Sb29tIiwiX3Jvb21OYW1lIiwiam9pblJvb20iLCJKb2luUmFuZG9tUm9vbSIsImpvaW5SYW5kb21Sb29tIiwiU2VuZENhcmREYXRhIiwicmFpc2VFdmVudCIsIkNhcmREYXRhIiwic2VuZGVyTmFtZSIsInNlbmRlcklEIiwiYWN0b3JOciIsInJlY2VpdmVycyIsIlBob3RvbiIsIkxvYWRCYWxhbmNpbmciLCJDb25zdGFudHMiLCJSZWNlaXZlckdyb3VwIiwiQWxsIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwiU2VuZEdhbWVPdmVyIiwiRGF0YSIsIlNlbmRCYW5rcnVwdERhdGEiLCJPdGhlcnMiLCJTZW5kRGF0YSIsIlBsYXllckluZm8iLCJTZW5kT25lUXVlc3Rpb25EYXRhIiwiU2VuZFBhcnRuZXJQcm9maXRMb3NzIiwiU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhIiwiRGljZVJvbGxFdmVudCIsIkRpY2VDb3VudCIsIlNlbmRHb0JhY2tTcGFjZURhdGEiLCJTZW5kUGFydG5lclNoaXBPZmZlckRhdGEiLCJTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhIiwiU3luY1R1cm5Db21wbGV0aW9uIiwiVUlEIiwiU3RhcnRUdXJuIiwiU2hvd1RvYXN0IiwiQ2FsbFJlY2lldmVFdmVudCIsIl9ldmVudENvZGUiLCJfc2VuZGVyTmFtZSIsIl9zZW5kZXJJRCIsIkluc3RhbmNlTnVsbCIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwic2V0VGltZW91dCIsIlJlY2VpdmVFdmVudCIsIkRpc2Nvbm5lY3REYXRhIiwiUmVzdGFydEdhbWUiLCJHZXRfR2FtZU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwibG9hZFNjZW5lIiwidXBkYXRlIiwiZHQiLCJvblN0YXRlQ2hhbmdlIiwiTEJDIiwiTG9hZEJhbGFuY2luZ0NsaWVudCIsIlN0YXRlVG9OYW1lIiwic3lzdGVtRXZlbnQiLCJlbWl0IiwiR2V0X1VJTWFuYWdlciIsIlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSSIsIlRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSSIsImxvZ2dlciIsImRlYnVnIiwibWVzcyIsImluZm8iLCJwYXJhbSIsIndhcm4iLCJwYXJhbTEiLCJwYXJhbTIiLCJwYXJhbTMiLCJUb2dnbGVMb2FkaW5nTm9kZSIsImV4Y2VwdGlvbiIsImZvcm1hdCIsIm9uUm9vbUxpc3QiLCJyb29tcyIsIlJlc2V0Um9vbUxpc3QiLCJVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSSIsInBsYXllckNvdW50Iiwib25Sb29tTGlzdFVwZGF0ZSIsInJvb21zVXBkYXRlZCIsInJvb21zQWRkZWQiLCJyb29tc1JlbW92ZWQiLCJvbkpvaW5Sb29tIiwibG9hZEJhbGFuY2luZ0NsaWVudCIsInVzZXJJZCIsIl9jdXN0b21Qcm9wZXJ0aWVzIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJvbkFjdG9ySm9pbiIsImFjdG9yIiwibXlSb29tQWN0b3JDb3VudCIsIm9uQWN0b3JMZWF2ZSIsIlBsYXllclNlc3Npb25EYXRhIiwiR2FtZU92ZXIiLCJDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyIiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwib25BY3RvclByb3BlcnRpZXNDaGFuZ2UiLCJvbk15Um9vbVByb3BlcnRpZXNDaGFuZ2UiLCJvbkVycm9yIiwiZXJyb3JDb2RlIiwiZXJyb3JNc2ciLCJvbkV2ZW50IiwiY29kZSIsImNvbnRlbnQiLCJQbGF5ZXJJbmZvRGF0YSIsIl9UdXJuIiwiX2RpY2UiLCJfSUQiLCJfY2FyZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJQSxTQUFKO0FBQ0EsSUFBSUMsU0FBUyxHQUFDLEVBQWQ7QUFDQSxJQUFJQyx3QkFBd0IsR0FBQyxJQUE3QjtBQUNBLElBQUlDLFFBQVEsR0FBRyxLQUFmO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLEtBQW5CLEVBRUE7O0FBQ0EsSUFBSUMsWUFBWSxHQUFDQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN0QkMsRUFBQUEsSUFBSSxFQUFDLGNBRGlCO0FBRXRCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMs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Q0FBQy9GLFVBQXpCO0FBQ0EsY0FBSUMsUUFBUSxHQUFHOEYsT0FBTyxDQUFDOUYsUUFBdkI7QUFFQXhHLFVBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQjhILGdCQUEvQixDQUFnRCxFQUFoRCxFQUFtRDlCLFVBQW5ELEVBQThEQyxRQUE5RCxFQUF1RXZCLEtBQXZFO0FBRUE7O0FBQ0osYUFBSyxFQUFMO0FBQVM7QUFDTC9ELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtDQUFaO0FBQ0EsY0FBSThELEtBQUssR0FBR3FILE9BQU8sQ0FBQ2xGLElBQXBCO0FBQ0EsY0FBSWIsVUFBVSxHQUFHK0YsT0FBTyxDQUFDL0YsVUFBekI7QUFDQSxjQUFJQyxRQUFRLEdBQUc4RixPQUFPLENBQUM5RixRQUF2QjtBQUVBeEcsVUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCOEgsZ0JBQS9CLENBQWdELEVBQWhELEVBQW1EOUIsVUFBbkQsRUFBOERDLFFBQTlELEVBQXVFdkIsS0FBdkU7QUFFQTs7QUFDSjtBQXRISjtBQXdISCxLQTFIRDtBQTJIRjtBQXhyQzZCLENBQVQsQ0FBMUI7QUE0ckNBMkgsTUFBTSxDQUFDQyxPQUFQLEdBQWU3TSxxQkFBZiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9HbG9iYWwgVmFyaWFibGVzXHJcbnZhciBQaG90b25SZWY7XHJcbnZhciBzdGF0ZVRleHQ9XCJcIjtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgU2hvd1Jvb20gPSBmYWxzZTtcclxudmFyIEdhbWVGaW5pc2hlZCA9IGZhbHNlO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gUm9vbVByb3BlcnR5LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvb21Qcm9wZXJ0eT1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUm9vbVByb3BlcnR5XCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUGxheWVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSW5pdGlhbFNldHVwOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgVHVybk51bWJlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gQXBwX0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQXBwX0luZm89Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkFwcF9JbmZvXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgQXBwSUQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJBcHAgaWQgZm9ybSBwaG90b24gZGFzaGJvYXJkXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEFwcFZlcnNpb246IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJBcHAgdmVyc2lvbiBmb3IgcGhvdG9uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFdzczoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIklzU2VjdXJlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIklmIHBob3RvbiBzaG91bGQgdXNlIHNlY3VyZSBhbmQgcmVsaWFibGUgcHJvdG9jb2xzXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIE1hc3RlclNlcnZlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIm1hc3RlciBzZXJ2ZXIgZm9yIHBob3RvbiB0byBjb25uZWN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEZiQXBwSUQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJGQiBhcHAgaWQgdXNlZCBmb3IgRkIgYXV0aGVyaXphdGlvblwiXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGRhdGEgcmVsYXRlZCB0byBNdWx0aXBsYXllckNvbnRyb2xsZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE11bHRpcGxheWVyQ29udHJvbGxlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiTXVsdGlwbGF5ZXJDb250cm9sbGVyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUGhvdG9uQXBwSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEFwcF9JbmZvLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICAgICBNYXhQbGF5ZXJzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sIFxyXG4gICAgICAgIE1heFNwZWN0YXRvcnM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSwgXHJcbiAgICAgICAgTW9kZVNlbGVjdGlvbjogeyAvLyAxIG1lYW5zIGJvdCAsIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sIFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczogeyAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgICAgICBJbnN0YW5jZTogbnVsbCxcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRBbGxEYXRhKClcclxuICAgIHtcclxuICAgICAgICAgUGhvdG9uUmVmPW51bGw7XHJcbiAgICAgICAgIHN0YXRlVGV4dD1cIlwiO1xyXG4gICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxuICAgICAgICBTaG93Um9vbSA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVGaW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIC8vdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIGNyZWF0ZWRcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLlJlc2V0QWxsRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlTW9kZVNlbGVjdGlvbihfdmFsKS8vIDEgbWVhbnMgYm90ICwgMiBtZWFucyByZWFsIHBsYXllcnNcclxuICAgIHtcclxuICAgICAgICB0aGlzLk1vZGVTZWxlY3Rpb249X3ZhbDtcclxuICAgIH0sXHJcblxyXG4gICAgR2V0U2VsZWN0ZWRNb2RlKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Nb2RlU2VsZWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IEluaXRpYWxpemUgc29tZSBlc3NlbnRhaWxzIGRhdGEgZm9yIG11bHRpcGxheWVyIGNvbnRyb2xsZXIgY2xhc3NcclxuICAgIEBtZXRob2QgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXJcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLkluaXRpYWxpemVQaG90b24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coQXBwSW5mbyk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZiA9IG5ldyBEZW1vTG9hZEJhbGFuY2luZygpO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuTGVhdmVSb29tPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9vbU5hbWU9XCJcIjtcclxuICAgICAgICB0aGlzLk1lc3NhZ2U9XCJcIjtcclxuICAgICAgICBTaG93Um9vbT1mYWxzZTtcclxuICAgICAgICB0aGlzLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjaGVjayByZWZlcmVuY2UgdG8gc29tZSB2YXJpYWJsZXMgYW5kIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgIH0sXHJcblxyXG4gICAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJlbW92ZSBwZXJzaXN0IG5vZGUgd2hlbiB3YW50IHRvIHJlc3RhcnQgc2NlbmVcclxuICAgIEBtZXRob2QgUmVtb3ZlUGVyc2lzdE5vZGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZT1udWxsO1xyXG4gICAgICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gZ2V0IG5hbWUgb2YgY3VycmVudCBvcGVuZWQgc2NlbmVcclxuICAgIEBtZXRob2QgZ2V0U2NlbmVOYW1lXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge3N0cmluZ30gc2NlbmVOYW1lXHJcbiAgICAqKi8gXHJcbiAgICBnZXRTY2VuZU5hbWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzY2VuZU5hbWU7XHJcbiAgICAgICAgdmFyIF9zY2VuZUluZm9zID0gY2MuZ2FtZS5fc2NlbmVJbmZvcztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9zY2VuZUluZm9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKF9zY2VuZUluZm9zW2ldLnV1aWQgPT0gY2MuZGlyZWN0b3IuX3NjZW5lLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gX3NjZW5lSW5mb3NbaV0udXJsO1xyXG4gICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gc2NlbmVOYW1lLnN1YnN0cmluZyhzY2VuZU5hbWUubGFzdEluZGV4T2YoJy8nKSsxKS5tYXRjaCgvW15cXC5dKy8pWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjZW5lTmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBzZXQgXCJTaG93Um9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlU2hvd1Jvb21fQm9vbFxyXG4gICAgQHBhcmFtIHtib29sZWFufSBfc3RhdGVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgKiovIFxyXG4gICAgVG9nZ2xlU2hvd1Jvb21fQm9vbChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgU2hvd1Jvb209X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIHNldCBcIkxlYXZlUm9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlTGVhdmVSb29tX0Jvb2xcclxuICAgIEBwYXJhbSB7Ym9vbGVhbn0gX3N0YXRlXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICoqLyBcclxuICAgIFRvZ2dsZUxlYXZlUm9vbV9Cb29sKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxlYXZlUm9vbT1fc3RhdGU7XHJcbiAgICB9LFxyXG4gICAgIFxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIFBob3RvbiBcIlBob3RvblJlZlwiIGluc3RhbmNlIGNyZWF0ZWQgYnkgbXVsdGlwbGF5ZXIgY2xhc3NcclxuICAgIEBtZXRob2QgZ2V0UGhvdG9uUmVmXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gUGhvdG9uUmVmXHJcbiAgICAqKi8gXHJcbiAgICBnZXRQaG90b25SZWYoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQaG90b25SZWY7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBteUFjdG9yIGluc3RhbmNlIGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFBob3RvbkFjdG9yXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gQWN0b3JcclxuICAgICoqLyBcclxuICAgIFBob3RvbkFjdG9yKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUGhvdG9uUmVmLm15QWN0b3IoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIG15Um9vbUFjdG9yc0FycmF5IGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFJvb21BY3RvcnNcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBBY3RvclxyXG4gICAgKiovIFxyXG4gICAgUm9vbUFjdG9ycygpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgaXNTcGVjdGF0ZSB2YXJpYWJsZSBmcm9tIGN1c3RvbSBwcm9wZXJ0eSBvZiBjdXJyZW50IGFjdG9yXHJcbiAgICBAbWV0aG9kIENoZWNrU3BlY3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gaXNTcGVjdGF0ZVxyXG4gICAgKiovIFxyXG4gICAgQ2hlY2tTcGVjdGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgIHJldHVybiBQaG90b25SZWYubXlBY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgSW5pdGlhbGl6ZSBwaG90b24gd2l0aCBhcHBpZCxhcHAgdmVyc2lvbiwgV3NzIGV0Y1xyXG4gICAgQG1ldGhvZCBJbml0aWFsaXplUGhvdG9uXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEluaXRpYWxpemVQaG90b24oKVxyXG4gICAge1xyXG4gICAgICAgIEFwcEluZm8uQXBwSWQ9dGhpcy5QaG90b25BcHBJbmZvLkFwcElEO1xyXG4gICAgICAgIEFwcEluZm8uQXBwVmVyc2lvbj10aGlzLlBob3RvbkFwcEluZm8uQXBwVmVyc2lvbjtcclxuICAgICAgICBBcHBJbmZvLldzcz10aGlzLlBob3RvbkFwcEluZm8uV3NzO1xyXG4gICAgICAgIEFwcEluZm8uTWFzdGVyU2VydmVyPXRoaXMuUGhvdG9uQXBwSW5mby5NYXN0ZXJTZXJ2ZXI7XHJcbiAgICAgICAgQXBwSW5mby5GYkFwcElkPXRoaXMuUGhvdG9uQXBwSW5mby5GYkFwcElEOyAgXHJcbiAgICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGNvbm5lY3Rpb24gcmVxdWVzdCB0byBwaG90b25cclxuICAgIEBtZXRob2QgUmVxdWVzdENvbm5lY3Rpb25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgUmVxdWVzdENvbm5lY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5zdGF0ZT09NSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGNvbm5lY3RlZFwiKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5zdGFydCgpOyAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBEaXNjb25uZWN0IGZyb20gcGhvdG9uXHJcbiAgICBAbWV0aG9kIERpc2Nvbm5lY3RQaG90b25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgRGlzY29ubmVjdFBob3RvbiAoKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSAgfHxQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgUGhvdG9uUmVmLmRpc2Nvbm5lY3QoKTsgICBcclxuICAgICAgICB0aGlzLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAgICAgLy9QaG90b25SZWYubGVhdmVSb29tKCk7XHJcbiAgICAgICAgdGhpcy5SZXNldFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGluc2lkZSBhbnkgcm9vbSBvciBsb2JieSBvciBjb25uZWN0ZWQgdG8gcGhvdG9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXNldGluZyBmZXcgdmFsdWVzXHJcbiAgICBAbWV0aG9kIFJlc2V0U3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgUmVzZXRTdGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5MZWF2ZVJvb209ZmFsc2U7ICAgIFxyXG4gICAgICAgIHRoaXMuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICBTaG93Um9vbT1mYWxzZTtcclxuICAgICAgICBzdGF0ZVRleHQ9XCJcIjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiByb29tIG5hbWUgZ290IGlucHV0IGZyb20gZ2FtZVxyXG4gICAgQG1ldGhvZCBPblJvb21OYW1lQ2hhbmdlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIE9uUm9vbU5hbWVDaGFuZ2UobmFtZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlJvb21OYW1lPW5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gbWVzc2FnZSB3aW5kb3cgZ290IGlucHV0IGZyb20gZ2FtZVxyXG4gICAgQG1ldGhvZCBPbk1lc3NhZ2VDaGFuZ2VcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBtc2dcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBPbk1lc3NhZ2VDaGFuZ2UobXNnKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTWVzc2FnZT1tc2c7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgdXBkYXRlIGN1c3RvbSByb29tIHByb3BlcnRpZXNcclxuICAgIEBtZXRob2QgVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXNcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyhfcGxheWVyVXBkYXRlPWZhbHNlLF9wbGF5ZXJWYWx1ZT0wLF9pbml0aWFsU2V0dXBVcGRhdGU9ZmFsc2UsX2luaXRpYWxTZXR1cFZhbHVlPWZhbHNlLF9wbGF5ZXJHYW1lSW5mb1VwZGF0ZT1mYWxzZSxfcGxheWVyR2FtZUluZm9WYWx1ZT1udWxsLF90dXJuTnVtYmVyVXBkYXRlPWZhbHNlLF90dXJuTnVtYmVydmFsdWU9MClcclxuICAgIHtcclxuICAgICAgICBpZihfcGxheWVyVXBkYXRlKVxyXG4gICAgICAgICAgICBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJcIixfcGxheWVyVmFsdWUsdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmKF9pbml0aWFsU2V0dXBVcGRhdGUpXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLF9pbml0aWFsU2V0dXBWYWx1ZSx0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihfcGxheWVyR2FtZUluZm9VcGRhdGUpXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsX3BsYXllckdhbWVJbmZvVmFsdWUsdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoX3R1cm5OdW1iZXJVcGRhdGUpXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIixfdHVybk51bWJlcnZhbHVlLHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNyZWF0ZSByb29tIHJlcXVlc3RcclxuICAgIEBtZXRob2QgQ3JlYXRlUm9vbVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDcmVhdGVSb29tICgpIHtcclxuICAgICAgICBpZihQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8UGhvdG9uUmVmLmlzSW5Mb2JieSgpPT10cnVlIHx8IFBob3RvblJlZi5zdGF0ZT09OClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT1mYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGF0YT1uZXcgUm9vbVByb3BlcnR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGEuUGxheWVyPTA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb29tT3B0aW9ucyA9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgXCJpc1Zpc2libGVcIjp0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgIFwiaXNPcGVuXCI6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgIFwibWF4UGxheWVyc1wiOnRoaXMuTWF4UGxheWVycyt0aGlzLk1heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICBcImN1c3RvbUdhbWVQcm9wZXJ0aWVzXCI6X2RhdGFcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWU9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwge0lzU3BlY3RhdGU6ZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFJvb21JRD1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLmNyZWF0ZVJvb20oXCJSb29tX1wiK1Jvb21JRCxyb29tT3B0aW9ucyk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBqb2luIHJvb20gcmVxdWVzdCBieSBuYW1lXHJcbiAgICBAbWV0aG9kIEpvaW5Sb29tXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gX3Jvb21OYW1lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgSm9pblJvb20gKF9yb29tTmFtZSkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5zdGF0ZT09NSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSB8fFBob3RvblJlZi5zdGF0ZT09OClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT1mYWxzZSB8fCBQaG90b25SZWYuc3RhdGUhPTgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByb29tT3B0aW9ucyA9e1xyXG4gICAgICAgICAgICAgICAgICAgIFwiaXNWaXNpYmxlXCI6dHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpc09wZW5cIjpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1heFBsYXllcnNcIjp0aGlzLk1heFBsYXllcnMrdGhpcy5NYXhTcGVjdGF0b3JzXHJcbiAgICAgICAgICAgICAgICAgICAgLy9cImN1c3RvbUdhbWVQcm9wZXJ0aWVzXCI6e1wiUm9vbUVzc2VudGlhbHNcIjoge0lzU3BlY3RhdGU6dHJ1ZX19XHJcbiAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHtJc1NwZWN0YXRlOnRydWV9KTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLmpvaW5Sb29tKF9yb29tTmFtZSxyb29tT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGpvaW4gcmFuZG9tIHJvb21cclxuICAgIEBtZXRob2QgSm9pblJhbmRvbVJvb21cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIEpvaW5SYW5kb21Sb29tICgpIHtcclxuICAgIGlmKFBob3RvblJlZi5zdGF0ZT09NSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSB8fFBob3RvblJlZi5zdGF0ZT09OClcclxuICAgIHtcclxuICAgICAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09ZmFsc2UgfHwgUGhvdG9uUmVmLnN0YXRlIT04KVxyXG4gICAgICAgIHsgIFxyXG4gICAgICAgICAgICB2YXIgX2RhdGE9bmV3IFJvb21Qcm9wZXJ0eSgpO1xyXG4gICAgICAgICAgICBfZGF0YS5QbGF5ZXI9MDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByb29tT3B0aW9ucyA9e1xyXG4gICAgICAgICAgICAgICAgLy9cImV4cGVjdGVkTWF4UGxheWVyc1wiOnRoaXMuTWF4UGxheWVycytNYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgICAgICAgXCJleHBlY3RlZEN1c3RvbVJvb21Qcm9wZXJ0aWVzXCI6X2RhdGFcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7SXNTcGVjdGF0ZTpmYWxzZX0pO1xyXG4gICAgICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcblxyXG4gICAgICAgICAgICBQaG90b25SZWYuam9pblJhbmRvbVJvb20ocm9vbU9wdGlvbnMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpXHJcbiAgICB9XHJcbiAgICAgICAgXHJcbn0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBjYXJkIGluZGV4IG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kQ2FyZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kQ2FyZERhdGEgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgY2FyZCBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDUsIHsgQ2FyZERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGdhbWUgb3ZlciBjYWxsXHJcbiAgICBAbWV0aG9kIFNlbmRHYW1lT3ZlclxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRHYW1lT3ZlciAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBnYW1lIG92ZXIgY2FsbFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCg2LCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBiYWNrcnVwdCBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRCYW5rcnVwdERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kQmFua3J1cHREYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGJhbmtydXBjeSBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDksIHsgRGF0YTogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVyc30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIFBsYXllciBEYXRhIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmREYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBsYXllciBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDEsIHsgUGxheWVySW5mbzogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBvbmUgcXVlc3Rpb24gRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRPbmVRdWVzdGlvbkRhdGEgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIGRhdGFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoNywgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgICB9LFxyXG4gIFxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBwcm9maXQgb3IgbG9zcyB0byB5b3VyIHBhc3J0bmVyXHJcbiAgICBAbWV0aG9kIFNlbmRQYXJ0bmVyUHJvZml0TG9zc1xyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRQYXJ0bmVyUHJvZml0TG9zcyAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgxMywgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIG9uZSBxdWVzdGlvbiByZXNwb25zZSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiByZXNwb25zZSBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDgsIHsgRGF0YTogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVyc30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBkaWNlIGRhdGFcclxuICAgIEBtZXRob2QgRGljZVJvbGxFdmVudFxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIERpY2VSb2xsRXZlbnQgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZGljZSBjb3VudFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgzLCB7IERpY2VDb3VudDogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgZ28gYmFjayBzcGFjZXMgZGF0YVxyXG4gICAgQG1ldGhvZCBTZW5kR29CYWNrU3BhY2VEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZEdvQmFja1NwYWNlRGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZCBnbyBiYWNrIHNwYWNlcyBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDEwLCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnN9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmRpbmcgb3BlbiBpbnZpdGF0aW9uIHRvIGFsbCBwbGF5ZXJzIGZvciBwYXJ0bmVyIHNoaXBcclxuICAgIEBtZXRob2QgU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBhcnRuZXIgc2hpcCBvZmZlclwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgxMSwgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgICB9LFxyXG4gIFxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZGluZyBwYXJ0bmVyIGFuc3dlciBkYXRhIChhY2NlcHQgb3IgcmVqZWN0KVxyXG4gICAgQG1ldGhvZCBTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBwYXJ0ZW5yc2hpcCBhbnN3ZXIgZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgxMiwgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIHVzZXIgaWQgb2YgcGxheWVyIHRvIGFsbCBvdGhlciB3aG8gaGFkIGNvbXBsZXRlZCB0aGVpciB0dXJuXHJcbiAgICBAbWV0aG9kIFN5bmNUdXJuQ29tcGxldGlvblxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU3luY1R1cm5Db21wbGV0aW9uIChfZGF0YSkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHR1cm4gY29tcGxldGlvbiBkYXRhXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDQsIHsgVUlEOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU3RhcnQgVHVybiBmb3IgaW5pdGlhbCB0dXJuXHJcbiAgICBAbWV0aG9kIFN0YXJ0VHVyblxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU3RhcnRUdXJuIChfZGF0YSkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdGFydGluZyBUdXJuXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDIsIHsgVHVybk51bWJlcjogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgXHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTaG93IHRvYXN0IG1lc3NhZ2Ugb24gdGhlIGNvbnNvbGVcclxuICAgIEBtZXRob2QgU2hvd1RvYXN0XHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIHNob3duIFxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFNob3dUb2FzdDpmdW5jdGlvbihtc2cpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0b2FzdCBtZXNzYWdlOiBcIittc2cpO1xyXG4gICAgfSxcclxuXHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZWNlaXZlIGV2ZW50IGZyb20gcGhvdG9uIHJhaXNlIG9uIFxyXG4gICAgQG1ldGhvZCBDYWxsUmVjaWV2ZUV2ZW50XHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ2FsbFJlY2lldmVFdmVudDpmdW5jdGlvbihfZXZlbnRDb2RlLF9zZW5kZXJOYW1lLF9zZW5kZXJJRCxfZGF0YSlcclxuICAgIHtcclxuICAgICAgICB2YXIgSW5zdGFuY2VOdWxsPXRydWU7XHJcblxyXG4gICAgICAgIC8vdG8gY2hlY2sgaWYgaW5zdGFuY2UgaXMgbnVsbCBpbiBjYXNlIGNsYXNzIGluc3RhbmNlIGlzIG5vdCBsb2FkZWQgYW5kIGl0cyByZWNlaXZlcyBjYWxsYmFja1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSW5zdGFuY2VOdWxsPXRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYWxsUmVjaWV2ZUV2ZW50KF9ldmVudENvZGUsX3NlbmRlck5hbWUsX3NlbmRlcklELF9kYXRhKTtcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbnN0YW5jZU51bGw9ZmFsc2U7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLF9zZW5kZXJOYW1lLF9zZW5kZXJJRCxfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBEaXNjb25uZWN0RGF0YSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlc3RhcnRHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPWZhbHNlO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgIC8vIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpbk1lbnVcIik7XHJcbiAgICAgICAgfSxcclxuICAgIC8vY2FsbGVkIGV2ZXJ5IGZyYW1lXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHRoZXJlIGlzIHNvbWUgY2hhbmdlIGluIGNvbm5lY3Rpb24gc3RhdGVcclxuICAgICAgICAgICAgQG1ldGhvZCBvblN0YXRlQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uU3RhdGVDaGFuZ2U9ZnVuY3Rpb24oc3RhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gQ29ubmVjdGlvbiBTdGF0ZXNcclxuICAgICAgICAgICAgLy9zdGF0ZSAxIDogY29ubmVjdGluZ1RvTmFtZVNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDIgOiBDb25uZWN0ZWRUb05hbWVTZXJ2ZXJcclxuICAgICAgICAgICAgLy9TdGF0ZSAzIDogQ29ubmVjdGluZ1RvTWFzdGVyU2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgNCA6IENvbm5lY3RlZFRvTWFzdGVyU2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgNTogIEpvaW5lZExvYmJ5XHJcbiAgICAgICAgICAgIC8vU3RhdGUgNiA6IENvbm5lY3RpbmdUb0dhbWVzZXJ2ZXJcclxuICAgICAgICAgICAgLy9TdGF0ZSA3IDogQ29ubmVjdGVkVG9HYW1lc2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgOCA6IEpvaW5lZFxyXG4gICAgICAgICAgICAvL1N0YXRlIDEwOiBEaXNjb25uZWN0ZWQgXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgdmFyIExCQyA9IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkxvYWRCYWxhbmNpbmdDbGllbnQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RhdGVDb2RlOiBcIitzdGF0ZStcIiBcIitMQkMuU3RhdGVUb05hbWUoc3RhdGUpKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHN0YXRlPT0xKVxyXG4gICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwiY29ubmVjdGluZyB0byBzZXJ2ZXIuLi5cIik7XHJcbiAgICAgICAgICAgIGVsc2UgaWYoc3RhdGU9PTQpXHJcbiAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJjb25uZWN0ZWQgdG8gc2VydmVyXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHN0YXRlPT01KSAvL2hhcyBqb2luZWQgbG9iYnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoU2hvd1Jvb209PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcIndhaXRpbmcgZm9yIG90aGVyIHBsYXllcnMuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5SYW5kb21Sb29tKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKFNob3dSb29tPT10cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcInNob3dpbmcgcm9vbXMgbGlzdC4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBkZWJ1Z1xyXG4gICAgICAgICAgICBAbWV0aG9kIGRlYnVnXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYubG9nZ2VyLmRlYnVnPWZ1bmN0aW9uKG1lc3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgaW5mb1xyXG4gICAgICAgICAgICBAbWV0aG9kIGluZm9cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYubG9nZ2VyLmluZm8gPSBmdW5jdGlvbiAobWVzcyxwYXJhbSkge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3MrcGFyYW0pO1xyXG4gICAgICAgICAgIHN0YXRlVGV4dCs9IG1lc3MrXCIgXCIrcGFyYW0rXCJcXG5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgd2FyblxyXG4gICAgICAgICAgICBAbWV0aG9kIHdhcm5cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtMVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTNcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5sb2dnZXIud2FybiA9IGZ1bmN0aW9uIChtZXNzLHBhcmFtMSxwYXJhbTIscGFyYW0zKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3MrXCIgXCIrcGFyYW0xK1wiIFwiK3BhcmFtMitcIiBcIitwYXJhbTMpO1xyXG5cclxuICAgICAgICAgICAgaWYocGFyYW0xPT0yMjUpIC8vbm8gcm9vbSBmb3VuZFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIHJhbmRvbSByb29tIHdhcyBmb3VuZCwgY3JlYXRpbmcgb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNyZWF0ZVJvb20oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYocGFyYW0xPT0yMjYpIC8vcm9vbSBkb2VzIG5vdCBleGlzdHMgb3IgaXMgZnVsbFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUm9vbSBpcyBmdWxsLCBwbGVhc2Ugc2VsZWN0IGFueSBvdGhlciByb29tIHRvIHNwZWN0YXRlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGVycm9yXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXJyb3JcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5lcnJvciA9IGZ1bmN0aW9uIChtZXNzLHBhcmFtKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBleGNlcHRpb25cclxuICAgICAgICAgICAgQG1ldGhvZCBleGNlcHRpb25cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgICBQaG90b25SZWYubG9nZ2VyLmV4Y2VwdGlvbiA9IGZ1bmN0aW9uIChtZXNzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHNvbWUgZm9ybWF0XHJcbiAgICAgICAgICAgIEBtZXRob2QgZm9ybWF0XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5mb3JtYXQgPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgcGxheWVyIGpvaW5zIGxvYmJ5XHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Sb29tTGlzdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgICBQaG90b25SZWYub25Sb29tTGlzdCA9IGZ1bmN0aW9uIChyb29tcykge1xyXG4gICAgICAgICAgICBzdGF0ZVRleHQrPVwiXFxuXCIrXCJSb29tcyBMaXN0OlwiK1wiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICBpZihyb29tcy5sZW5ndGg9PTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlVGV4dCs9XCJObyByb29tcyBpbiBsb2JieS5cIitcIlxcblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5SZXNldFJvb21MaXN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb29tcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkocm9vbXNbaV0ubmFtZSxyb29tc1tpXS5wbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSb29tIG5hbWU6IFwiK3Jvb21zW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlVGV4dCs9XCJSb29tOiBcIityb29tc1tpXS5uYW1lK1wiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHRoZXJlIGlzIGNoYW5nZSBpbiByb29tcyBsaXN0IChyb29tIGFkZGVkLHVwZGF0ZWQscmVtb3ZlZCBldGMpXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Sb29tTGlzdFVwZGF0ZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zVXBkYXRlZFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNBZGRlZFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNSZW1vdmVkXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25Sb29tTGlzdFVwZGF0ZSA9IGZ1bmN0aW9uIChyb29tcywgcm9vbXNVcGRhdGVkLCByb29tc0FkZGVkLCByb29tc1JlbW92ZWQpIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5SZXNldFJvb21MaXN0KCk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb29tcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5VcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShyb29tc1tpXS5uYW1lLHJvb21zW2ldLnBsYXllckNvdW50KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbSBuYW1lOiBcIityb29tc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlVGV4dCs9XCJSb29tOiBcIityb29tc1tpXS5uYW1lK1wiXFxuXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSb29tcyBMaXN0IHVwZGF0ZWQ6IFwiICsgcm9vbXNVcGRhdGVkLmxlbmd0aCArIFwiIHVwZGF0ZWQsIFwiICsgcm9vbXNBZGRlZC5sZW5ndGggKyBcIiBhZGRlZCwgXCIgKyByb29tc1JlbW92ZWQubGVuZ3RoICsgXCIgcmVtb3ZlZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgbG9jYWxseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBqb2lucyByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Kb2luUm9vbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uSm9pblJvb20gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBMb2dzIGZvciBnYW1lXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBcIiArIHRoaXMubXlSb29tKCkubmFtZSArIFwiIGpvaW5lZFwiKTsgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlBY3RvcigpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKVswXS5sb2FkQmFsYW5jaW5nQ2xpZW50LnVzZXJJZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKS5fY3VzdG9tUHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0pO1xyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgaWYoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXT09dHJ1ZSkgLy9jaGVjayBpZiBwbGF5ZXIgd2hvIGpvaW5lZCBpcyBzcGVjdGF0ZVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb209dHJ1ZTtcclxuICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7Y2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsdHJ1ZSx0cnVlLFwiR2FtZVBsYXlcIik7fSwgMTAwMCk7IC8vZnVuY3Rpb24gaW4gVUlNYW5hZ2VyXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBqb2lucyByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckpvaW5cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25BY3RvckpvaW4gPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgICAgICAgaWYoUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKT09TXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMpIC8vd2hlbiBtYXggcGxheWVyIHJlcXVpcmVkIHRvIHN0YXJ0IGdhbWUgaGFzIGJlZW4gYWRkZWRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgcmVxdWlyZWQgcGxheWVycyBqb2luZWQsIHN0YXJ0aW5nIHRoZSBnYW1lLi5cIilcclxuICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb209dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge2NjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLHRydWUsdHJ1ZSxcIkdhbWVQbGF5XCIpO30sIDEwMDApOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyh0cnVlLFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksZmFsc2UsZmFsc2UsZmFsc2UsbnVsbCxmYWxzZSwwKTtcclxuICAgICAgICAgICAgICAgIC8vUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyXCIsUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSx0cnVlKTsgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGpvaW5lZFwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRvdGFsIFBsYXllcnM6IFwiK1Bob3RvblJlZi5teVJvb21BY3RvckNvdW50KCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIHJlbW90ZWx5IGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIGxlYXZlcyBhIHJvb21cclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9yTGVhdmVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm9uQWN0b3JMZWF2ZSA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICAgICAgICBpZiAoIUdhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdG9yLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTGVhdmVSb29tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0b3IuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzcGVjdGF0b3IgbGVmdCwgc28gZG9udCBtaW5kLCBjb250IGdhbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGxlZnRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLmdldFNjZW5lTmFtZSgpID09IFwiR2FtZVBsYXlcIikgLy9pZiBzY2VuZSBpcyBnYW1lcGxheSBsZXQgcGxheWVyIGZpbmlzaCBnYW1lIGZvcmNlZnVsbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJvdGhlciBwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIG93biBwcm9wZXJ0aWVzIGdvdCBjaGFuZ2VkXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvclByb3BlcnRpZXNDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25BY3RvclByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIHJvb20gcHJvcGVydGllcyBnb3QgY2hhbmdlZFxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uTXlSb29tUHJvcGVydGllc0NoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbk15Um9vbVByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHRvIGhhbmRsZSBlcnJvcnNcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvckNvZGVcclxuICAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1zZ1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3JDb2RlLCBlcnJvck1zZykge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBlcnJvckNvZGUgKyBcIjogXCIgKyBlcnJvck1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBhbiBldmVudCBpcyByZWNlaXZlZCB3aXRoIHNvbWUgZGF0YVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uRXZlbnRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvZGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvbnRlbnRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yTnJcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkV2ZW50ID0gZnVuY3Rpb24gKGNvZGUsIGNvbnRlbnQsIGFjdG9yTnIpIHtcclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTovL3JlY2V2aW5nIHBsYXllcmRhdGEgaW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgUGxheWVySW5mb0RhdGEgPSBjb250ZW50LlBsYXllckluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMSxzZW5kZXJOYW1lLHNlbmRlcklELFBsYXllckluZm9EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiAvL3N0YXJ0IHR1cm4gcmFpc2UgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHN0YXJ0IHR1cm4gZXZlbnRcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX1R1cm4gPSBjb250ZW50LlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMixzZW5kZXJOYW1lLHNlbmRlcklELF9UdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzogLy8gZGljZSBjb3VudFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGljZSBjb3VudFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGljZSA9IGNvbnRlbnQuRGljZUNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDMsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGljZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiAvL3JlY2VpbmcgdXNlciBpZCBvZiBwbGF5ZXIgd2hvIGhhcyBjb21wbGV0ZWQgdHVyblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIHR1cm4gY29tcGxldGVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9JRCA9IGNvbnRlbnQuVUlEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDQsc2VuZGVyTmFtZSxzZW5kZXJJRCxfSUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogLy9yZWNlaXZpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgY2FyZCBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9jYXJkID0gY29udGVudC5DYXJkRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDUsc2VuZGVyTmFtZSxzZW5kZXJJRCxfY2FyZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OiAvL3JlY2VpdmUgZ2FtZSBvdmVyIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGdhbWUgb3ZlciBjYWxsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNixzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IC8vcmVjZWl2ZSBvbmUgUXVlc3Rpb24gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgb25lIHF1ZXN0aW9uIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg3LHNlbmRlck5hbWUsc2VuZGVySUQsX2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgODogLy9yZWNlaXZlIG9uZSBRdWVzdGlvbiByZXNwb25zZSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBvbmUgcXVlc3RpbyByZXNwb25zZSBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoOCxzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDk6IC8vcmVjZWl2ZSBiYW5rcnVwdCBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBiYW5rcnVwdCBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoOSxzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEwOiAvL3JlY2VpdmUgYmFja3NwYWNlIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGJhY2tzcGFjZSBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTAsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMTogLy9yZWNlaXZlaW5nIHBhcnRuZXJzaGlwIG9mZmVyXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBvZmZlciBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTEsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgIGNhc2UgMTI6IC8vcmVjZWl2ZWluZyBwYXJ0bmVyc2hpcCBhbnN3ZXIgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgYW53c2VyIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMixzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEzOiAvL3JlY2VpdmluZyBwcm9maXQvbG9zcyBkYXRhIGZvciBwYXJ0bmVyXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBhbndzZXIgZGF0YVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEzLHNlbmRlck5hbWUsc2VuZGVySUQsX2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgIFxyXG4gICAgIH0sXHJcbiAgICAgXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHM9TXVsdGlwbGF5ZXJDb250cm9sbGVyOyJdfQ==