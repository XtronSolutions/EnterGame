
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
var ShowRoom = false; //---------------------------------------class data related to RoomProperty------------------------------------------------//

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
  //this function is called when instance of this class is created
  onLoad: function onLoad() {
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
  RestartGame: function RestartGame() {
    MultiplayerController.Instance.JoinedRoom = false;
    MultiplayerController.Instance.ResetState();
    MultiplayerController.Instance.DisconnectPhoton();
    GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
    GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
    GamePlayReferenceManager.Instance.RemovePersistNode();
    cc.director.loadScene("Splash");
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
                    cc.director.loadScene("Splash");
                  }, 2100);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJSb29tUHJvcGVydHkiLCJjYyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJQbGF5ZXIiLCJ0eXBlIiwiSW50ZWdlciIsInNlcmlhbGl6YWJsZSIsIkluaXRpYWxTZXR1cCIsIkJvb2xlYW4iLCJQbGF5ZXJHYW1lSW5mbyIsIlRleHQiLCJUdXJuTnVtYmVyIiwiQXBwX0luZm8iLCJBcHBJRCIsInRvb2x0aXAiLCJBcHBWZXJzaW9uIiwiV3NzIiwiZGlzcGxheU5hbWUiLCJNYXN0ZXJTZXJ2ZXIiLCJGYkFwcElEIiwiTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiQ29tcG9uZW50IiwiUGhvdG9uQXBwSW5mbyIsIk1heFBsYXllcnMiLCJNYXhTcGVjdGF0b3JzIiwiTW9kZVNlbGVjdGlvbiIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIm9uTG9hZCIsIkluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTW9kZVNlbGVjdGlvbiIsIl92YWwiLCJHZXRTZWxlY3RlZE1vZGUiLCJnYW1lIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIkluaXRpYWxpemVQaG90b24iLCJjb25zb2xlIiwibG9nIiwiQXBwSW5mbyIsIkRlbW9Mb2FkQmFsYW5jaW5nIiwiTGVhdmVSb29tIiwiUm9vbU5hbWUiLCJNZXNzYWdlIiwiSm9pbmVkUm9vbSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsImdldFNjZW5lTmFtZSIsInNjZW5lTmFtZSIsIl9zY2VuZUluZm9zIiwiaSIsImxlbmd0aCIsInV1aWQiLCJkaXJlY3RvciIsIl9zY2VuZSIsIl9pZCIsInVybCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibWF0Y2giLCJUb2dnbGVTaG93Um9vbV9Cb29sIiwiX3N0YXRlIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJnZXRQaG90b25SZWYiLCJQaG90b25BY3RvciIsIm15QWN0b3IiLCJSb29tQWN0b3JzIiwibXlSb29tQWN0b3JzQXJyYXkiLCJDaGVja1NwZWN0YXRlIiwiY3VzdG9tUHJvcGVydGllcyIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIkFwcElkIiwiRmJBcHBJZCIsIlJlcXVlc3RDb25uZWN0aW9uIiwic3RhdGUiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5Iiwic3RhcnQiLCJEaXNjb25uZWN0UGhvdG9uIiwiaXNKb2luZWRUb1Jvb20iLCJkaXNjb25uZWN0IiwiUmVzZXRTdGF0ZSIsIk9uUm9vbU5hbWVDaGFuZ2UiLCJPbk1lc3NhZ2VDaGFuZ2UiLCJtc2ciLCJVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyIsIl9wbGF5ZXJVcGRhdGUiLCJfcGxheWVyVmFsdWUiLCJfaW5pdGlhbFNldHVwVXBkYXRlIiwiX2luaXRpYWxTZXR1cFZhbHVlIiwiX3BsYXllckdhbWVJbmZvVXBkYXRlIiwiX3BsYXllckdhbWVJbmZvVmFsdWUiLCJfdHVybk51bWJlclVwZGF0ZSIsIl90dXJuTnVtYmVydmFsdWUiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNyZWF0ZVJvb20iLCJfZGF0YSIsInJvb21PcHRpb25zIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU3R1ZGVudERhdGEiLCJzZXRVc2VySWQiLCJ1c2VySUQiLCJSb29tSUQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJEYXRlIiwibm93IiwiY3JlYXRlUm9vbSIsIkpvaW5Sb29tIiwiX3Jvb21OYW1lIiwiam9pblJvb20iLCJKb2luUmFuZG9tUm9vbSIsImpvaW5SYW5kb21Sb29tIiwiU2VuZENhcmREYXRhIiwicmFpc2VFdmVudCIsIkNhcmREYXRhIiwic2VuZGVyTmFtZSIsInNlbmRlcklEIiwiYWN0b3JOciIsInJlY2VpdmVycyIsIlBob3RvbiIsIkxvYWRCYWxhbmNpbmciLCJDb25zdGFudHMiLCJSZWNlaXZlckdyb3VwIiwiQWxsIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwiU2VuZEdhbWVPdmVyIiwiRGF0YSIsIlNlbmRCYW5rcnVwdERhdGEiLCJPdGhlcnMiLCJTZW5kRGF0YSIsIlBsYXllckluZm8iLCJTZW5kT25lUXVlc3Rpb25EYXRhIiwiU2VuZFBhcnRuZXJQcm9maXRMb3NzIiwiU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhIiwiRGljZVJvbGxFdmVudCIsIkRpY2VDb3VudCIsIlNlbmRHb0JhY2tTcGFjZURhdGEiLCJTZW5kUGFydG5lclNoaXBPZmZlckRhdGEiLCJTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhIiwiU3luY1R1cm5Db21wbGV0aW9uIiwiVUlEIiwiU3RhcnRUdXJuIiwiU2hvd1RvYXN0IiwiQ2FsbFJlY2lldmVFdmVudCIsIl9ldmVudENvZGUiLCJfc2VuZGVyTmFtZSIsIl9zZW5kZXJJRCIsIkluc3RhbmNlTnVsbCIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwic2V0VGltZW91dCIsIlJlY2VpdmVFdmVudCIsIlJlc3RhcnRHYW1lIiwibG9hZFNjZW5lIiwidXBkYXRlIiwiZHQiLCJvblN0YXRlQ2hhbmdlIiwiTEJDIiwiTG9hZEJhbGFuY2luZ0NsaWVudCIsIlN0YXRlVG9OYW1lIiwic3lzdGVtRXZlbnQiLCJlbWl0IiwiR2V0X1VJTWFuYWdlciIsIlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSSIsIlRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSSIsImxvZ2dlciIsImRlYnVnIiwibWVzcyIsImluZm8iLCJwYXJhbSIsIndhcm4iLCJwYXJhbTEiLCJwYXJhbTIiLCJwYXJhbTMiLCJUb2dnbGVMb2FkaW5nTm9kZSIsImV4Y2VwdGlvbiIsImZvcm1hdCIsIm9uUm9vbUxpc3QiLCJyb29tcyIsIlJlc2V0Um9vbUxpc3QiLCJVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSSIsInBsYXllckNvdW50Iiwib25Sb29tTGlzdFVwZGF0ZSIsInJvb21zVXBkYXRlZCIsInJvb21zQWRkZWQiLCJyb29tc1JlbW92ZWQiLCJvbkpvaW5Sb29tIiwibG9hZEJhbGFuY2luZ0NsaWVudCIsInVzZXJJZCIsIl9jdXN0b21Qcm9wZXJ0aWVzIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJvbkFjdG9ySm9pbiIsImFjdG9yIiwibXlSb29tQWN0b3JDb3VudCIsIm9uQWN0b3JMZWF2ZSIsIlBsYXllclNlc3Npb25EYXRhIiwiR2FtZU92ZXIiLCJHZXRfR2FtZU1hbmFnZXIiLCJDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyIiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsIm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlIiwib25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlIiwib25FcnJvciIsImVycm9yQ29kZSIsImVycm9yTXNnIiwib25FdmVudCIsImNvZGUiLCJjb250ZW50IiwiUGxheWVySW5mb0RhdGEiLCJfVHVybiIsIl9kaWNlIiwiX0lEIiwiX2NhcmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsU0FBSjtBQUNBLElBQUlDLFNBQVMsR0FBQyxFQUFkO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUMsSUFBN0I7QUFDQSxJQUFJQyxRQUFRLEdBQUMsS0FBYixFQUVBOztBQUNBLElBQUlDLFlBQVksR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBQyxjQURpQjtBQUV0QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLENBREw7QUFFSkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLE9BRkw7QUFH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MkhGO0FBeHFDNkIsQ0FBVCxDQUExQjtBQTRxQ0EwSCxNQUFNLENBQUNDLE9BQVAsR0FBZTNNLHFCQUFmIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJpYWJsZXNcclxudmFyIFBob3RvblJlZjtcclxudmFyIHN0YXRlVGV4dD1cIlwiO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBTaG93Um9vbT1mYWxzZTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIFJvb21Qcm9wZXJ0eS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSb29tUHJvcGVydHk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlJvb21Qcm9wZXJ0eVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIFBsYXllcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEluaXRpYWxTZXR1cDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBQbGF5ZXJHYW1lSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFR1cm5OdW1iZXI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIEFwcF9JbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEFwcF9JbmZvPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJBcHBfSW5mb1wiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIEFwcElEOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiQXBwIGlkIGZvcm0gcGhvdG9uIGRhc2hib2FyZFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBBcHBWZXJzaW9uOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiQXBwIHZlcnNpb24gZm9yIHBob3RvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBXc3M6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJJc1NlY3VyZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJJZiBwaG90b24gc2hvdWxkIHVzZSBzZWN1cmUgYW5kIHJlbGlhYmxlIHByb3RvY29sc1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBNYXN0ZXJTZXJ2ZXI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJtYXN0ZXIgc2VydmVyIGZvciBwaG90b24gdG8gY29ubmVjdFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBGYkFwcElEOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiRkIgYXBwIGlkIHVzZWQgZm9yIEZCIGF1dGhlcml6YXRpb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBNdWx0aXBsYXllckNvbnRyb2xsZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIk11bHRpcGxheWVyQ29udHJvbGxlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIFBob3RvbkFwcEluZm86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBBcHBfSW5mbyxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgICAgTWF4UGxheWVyczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LCBcclxuICAgICAgICBNYXhTcGVjdGF0b3JzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sIFxyXG4gICAgICAgIE1vZGVTZWxlY3Rpb246IHsgLy8gMSBtZWFucyBib3QgLCAyIG1lYW5zIHJlYWwgcGxheWVyc1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LCBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHsgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICAgICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIGNyZWF0ZWRcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5Jbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVNb2RlU2VsZWN0aW9uKF92YWwpLy8gMSBtZWFucyBib3QgLCAyIG1lYW5zIHJlYWwgcGxheWVyc1xyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTW9kZVNlbGVjdGlvbj1fdmFsO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZXRTZWxlY3RlZE1vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vZGVTZWxlY3Rpb247XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgSW5pdGlhbGl6ZSBzb21lIGVzc2VudGFpbHMgZGF0YSBmb3IgbXVsdGlwbGF5ZXIgY29udHJvbGxlciBjbGFzc1xyXG4gICAgQG1ldGhvZCBJbml0X011bHRpcGxheWVyQ29udHJvbGxlclxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBJbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pdGlhbGl6ZVBob3RvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhBcHBJbmZvKTtcclxuICAgICAgICAgICAgUGhvdG9uUmVmID0gbmV3IERlbW9Mb2FkQmFsYW5jaW5nKCk7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5MZWF2ZVJvb209ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb29tTmFtZT1cIlwiO1xyXG4gICAgICAgIHRoaXMuTWVzc2FnZT1cIlwiO1xyXG4gICAgICAgIFNob3dSb29tPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNoZWNrIHJlZmVyZW5jZSB0byBzb21lIHZhcmlhYmxlcyBhbmQgY2xhc3Nlc1xyXG4gICAgQG1ldGhvZCBDaGVja1JlZmVyZW5jZXNcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgfSxcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmVtb3ZlIHBlcnNpc3Qgbm9kZSB3aGVuIHdhbnQgdG8gcmVzdGFydCBzY2VuZVxyXG4gICAgQG1ldGhvZCBSZW1vdmVQZXJzaXN0Tm9kZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBSZW1vdmVQZXJzaXN0Tm9kZSgpXHJcbiAgICB7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlPW51bGw7XHJcbiAgICAgICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBnZXQgbmFtZSBvZiBjdXJyZW50IG9wZW5lZCBzY2VuZVxyXG4gICAgQG1ldGhvZCBnZXRTY2VuZU5hbWVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7c3RyaW5nfSBzY2VuZU5hbWVcclxuICAgICoqLyBcclxuICAgIGdldFNjZW5lTmFtZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNjZW5lTmFtZTtcclxuICAgICAgICB2YXIgX3NjZW5lSW5mb3MgPSBjYy5nYW1lLl9zY2VuZUluZm9zO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3NjZW5lSW5mb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoX3NjZW5lSW5mb3NbaV0udXVpZCA9PSBjYy5kaXJlY3Rvci5fc2NlbmUuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSBfc2NlbmVJbmZvc1tpXS51cmw7XHJcbiAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSBzY2VuZU5hbWUuc3Vic3RyaW5nKHNjZW5lTmFtZS5sYXN0SW5kZXhPZignLycpKzEpLm1hdGNoKC9bXlxcLl0rLylbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NlbmVOYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIHNldCBcIlNob3dSb29tXCIgYm9vbCB2YWx1ZVxyXG4gICAgQG1ldGhvZCBUb2dnbGVTaG93Um9vbV9Cb29sXHJcbiAgICBAcGFyYW0ge2Jvb2xlYW59IF9zdGF0ZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAqKi8gXHJcbiAgICBUb2dnbGVTaG93Um9vbV9Cb29sKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBTaG93Um9vbT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gc2V0IFwiTGVhdmVSb29tXCIgYm9vbCB2YWx1ZVxyXG4gICAgQG1ldGhvZCBUb2dnbGVMZWF2ZVJvb21fQm9vbFxyXG4gICAgQHBhcmFtIHtib29sZWFufSBfc3RhdGVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgKiovIFxyXG4gICAgVG9nZ2xlTGVhdmVSb29tX0Jvb2woX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTGVhdmVSb29tPV9zdGF0ZTtcclxuICAgIH0sXHJcbiAgICAgXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgUGhvdG9uIFwiUGhvdG9uUmVmXCIgaW5zdGFuY2UgY3JlYXRlZCBieSBtdWx0aXBsYXllciBjbGFzc1xyXG4gICAgQG1ldGhvZCBnZXRQaG90b25SZWZcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBQaG90b25SZWZcclxuICAgICoqLyBcclxuICAgIGdldFBob3RvblJlZigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBob3RvblJlZjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIG15QWN0b3IgaW5zdGFuY2UgY3JlYXRlZCBieSBwaG90b25cclxuICAgIEBtZXRob2QgUGhvdG9uQWN0b3JcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBBY3RvclxyXG4gICAgKiovIFxyXG4gICAgUGhvdG9uQWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQaG90b25SZWYubXlBY3RvcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgbXlSb29tQWN0b3JzQXJyYXkgY3JlYXRlZCBieSBwaG90b25cclxuICAgIEBtZXRob2QgUm9vbUFjdG9yc1xyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IEFjdG9yXHJcbiAgICAqKi8gXHJcbiAgICBSb29tQWN0b3JzKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBpc1NwZWN0YXRlIHZhcmlhYmxlIGZyb20gY3VzdG9tIHByb3BlcnR5IG9mIGN1cnJlbnQgYWN0b3JcclxuICAgIEBtZXRob2QgQ2hlY2tTcGVjdGF0ZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBpc1NwZWN0YXRlXHJcbiAgICAqKi8gXHJcbiAgICBDaGVja1NwZWN0YXRlKClcclxuICAgIHtcclxuICAgICAgICAgcmV0dXJuIFBob3RvblJlZi5teUFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBJbml0aWFsaXplIHBob3RvbiB3aXRoIGFwcGlkLGFwcCB2ZXJzaW9uLCBXc3MgZXRjXHJcbiAgICBAbWV0aG9kIEluaXRpYWxpemVQaG90b25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgSW5pdGlhbGl6ZVBob3RvbigpXHJcbiAgICB7XHJcbiAgICAgICAgQXBwSW5mby5BcHBJZD10aGlzLlBob3RvbkFwcEluZm8uQXBwSUQ7XHJcbiAgICAgICAgQXBwSW5mby5BcHBWZXJzaW9uPXRoaXMuUGhvdG9uQXBwSW5mby5BcHBWZXJzaW9uO1xyXG4gICAgICAgIEFwcEluZm8uV3NzPXRoaXMuUGhvdG9uQXBwSW5mby5Xc3M7XHJcbiAgICAgICAgQXBwSW5mby5NYXN0ZXJTZXJ2ZXI9dGhpcy5QaG90b25BcHBJbmZvLk1hc3RlclNlcnZlcjtcclxuICAgICAgICBBcHBJbmZvLkZiQXBwSWQ9dGhpcy5QaG90b25BcHBJbmZvLkZiQXBwSUQ7ICBcclxuICAgIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgY29ubmVjdGlvbiByZXF1ZXN0IHRvIHBob3RvblxyXG4gICAgQG1ldGhvZCBSZXF1ZXN0Q29ubmVjdGlvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBSZXF1ZXN0Q29ubmVjdGlvbiAoKSB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLnN0YXRlPT01IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCk9PXRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpPT10cnVlKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgY29ubmVjdGVkXCIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgUGhvdG9uUmVmLnN0YXJ0KCk7ICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IERpc2Nvbm5lY3QgZnJvbSBwaG90b25cclxuICAgIEBtZXRob2QgRGlzY29ubmVjdFBob3RvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBEaXNjb25uZWN0UGhvdG9uICgpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCk9PXRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpPT10cnVlICB8fFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICBQaG90b25SZWYuZGlzY29ubmVjdCgpOyAgIFxyXG4gICAgICAgIHRoaXMuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICAvL1Bob3RvblJlZi5sZWF2ZVJvb20oKTtcclxuICAgICAgICB0aGlzLlJlc2V0U3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgaW5zaWRlIGFueSByb29tIG9yIGxvYmJ5IG9yIGNvbm5lY3RlZCB0byBwaG90b25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJlc2V0aW5nIGZldyB2YWx1ZXNcclxuICAgIEBtZXRob2QgUmVzZXRTdGF0ZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBSZXNldFN0YXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxlYXZlUm9vbT1mYWxzZTsgICAgXHJcbiAgICAgICAgdGhpcy5Kb2luZWRSb29tPWZhbHNlO1xyXG4gICAgICAgIFNob3dSb29tPWZhbHNlO1xyXG4gICAgICAgIHN0YXRlVGV4dD1cIlwiO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIHJvb20gbmFtZSBnb3QgaW5wdXQgZnJvbSBnYW1lXHJcbiAgICBAbWV0aG9kIE9uUm9vbU5hbWVDaGFuZ2VcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgT25Sb29tTmFtZUNoYW5nZShuYW1lKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUm9vbU5hbWU9bmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBtZXNzYWdlIHdpbmRvdyBnb3QgaW5wdXQgZnJvbSBnYW1lXHJcbiAgICBAbWV0aG9kIE9uTWVzc2FnZUNoYW5nZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG1zZ1xyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIE9uTWVzc2FnZUNoYW5nZShtc2cpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5NZXNzYWdlPW1zZztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSB1cGRhdGUgY3VzdG9tIHJvb20gcHJvcGVydGllc1xyXG4gICAgQG1ldGhvZCBVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlc1xyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKF9wbGF5ZXJVcGRhdGU9ZmFsc2UsX3BsYXllclZhbHVlPTAsX2luaXRpYWxTZXR1cFVwZGF0ZT1mYWxzZSxfaW5pdGlhbFNldHVwVmFsdWU9ZmFsc2UsX3BsYXllckdhbWVJbmZvVXBkYXRlPWZhbHNlLF9wbGF5ZXJHYW1lSW5mb1ZhbHVlPW51bGwsX3R1cm5OdW1iZXJVcGRhdGU9ZmFsc2UsX3R1cm5OdW1iZXJ2YWx1ZT0wKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9wbGF5ZXJVcGRhdGUpXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclwiLF9wbGF5ZXJWYWx1ZSx0cnVlKTtcclxuXHJcbiAgICAgICAgaWYoX2luaXRpYWxTZXR1cFVwZGF0ZSlcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIsX2luaXRpYWxTZXR1cFZhbHVlLHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKF9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSlcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIixfcGxheWVyR2FtZUluZm9WYWx1ZSx0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihfdHVybk51bWJlclVwZGF0ZSlcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLF90dXJuTnVtYmVydmFsdWUsdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY3JlYXRlIHJvb20gcmVxdWVzdFxyXG4gICAgQG1ldGhvZCBDcmVhdGVSb29tXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENyZWF0ZVJvb20gKCkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCk9PXRydWUgfHxQaG90b25SZWYuaXNJbkxvYmJ5KCk9PXRydWUgfHwgUGhvdG9uUmVmLnN0YXRlPT04KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PWZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhPW5ldyBSb29tUHJvcGVydHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBfZGF0YS5QbGF5ZXI9MDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvb21PcHRpb25zID17XHJcbiAgICAgICAgICAgICAgICAgICAgICBcImlzVmlzaWJsZVwiOnRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJpc09wZW5cIjp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJtYXhQbGF5ZXJzXCI6dGhpcy5NYXhQbGF5ZXJzK3RoaXMuTWF4U3BlY3RhdG9ycyxcclxuICAgICAgICAgICAgICAgICAgICAgIFwiY3VzdG9tR2FtZVByb3BlcnRpZXNcIjpfZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7SXNTcGVjdGF0ZTpmYWxzZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgUm9vbUlEPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERhdGUubm93KCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYuY3JlYXRlUm9vbShcIlJvb21fXCIrUm9vbUlELHJvb21PcHRpb25zKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIilcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGpvaW4gcm9vbSByZXF1ZXN0IGJ5IG5hbWVcclxuICAgIEBtZXRob2QgSm9pblJvb21cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBfcm9vbU5hbWVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBKb2luUm9vbSAoX3Jvb21OYW1lKSB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLnN0YXRlPT01IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCk9PXRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpPT10cnVlIHx8UGhvdG9uUmVmLnN0YXRlPT04KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PWZhbHNlIHx8IFBob3RvblJlZi5zdGF0ZSE9OClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvb21PcHRpb25zID17XHJcbiAgICAgICAgICAgICAgICAgICAgXCJpc1Zpc2libGVcIjp0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICBcImlzT3BlblwiOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWF4UGxheWVyc1wiOnRoaXMuTWF4UGxheWVycyt0aGlzLk1heFNwZWN0YXRvcnNcclxuICAgICAgICAgICAgICAgICAgICAvL1wiY3VzdG9tR2FtZVByb3BlcnRpZXNcIjp7XCJSb29tRXNzZW50aWFsc1wiOiB7SXNTcGVjdGF0ZTp0cnVlfX1cclxuICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWU9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwge0lzU3BlY3RhdGU6dHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBQaG90b25SZWYuam9pblJvb20oX3Jvb21OYW1lLHJvb21PcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgam9pbiByYW5kb20gcm9vbVxyXG4gICAgQG1ldGhvZCBKb2luUmFuZG9tUm9vbVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgSm9pblJhbmRvbVJvb20gKCkge1xyXG4gICAgaWYoUGhvdG9uUmVmLnN0YXRlPT01IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCk9PXRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpPT10cnVlIHx8UGhvdG9uUmVmLnN0YXRlPT04KVxyXG4gICAge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT1mYWxzZSB8fCBQaG90b25SZWYuc3RhdGUhPTgpXHJcbiAgICAgICAgeyAgXHJcbiAgICAgICAgICAgIHZhciBfZGF0YT1uZXcgUm9vbVByb3BlcnR5KCk7XHJcbiAgICAgICAgICAgIF9kYXRhLlBsYXllcj0wO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHJvb21PcHRpb25zID17XHJcbiAgICAgICAgICAgICAgICAvL1wiZXhwZWN0ZWRNYXhQbGF5ZXJzXCI6dGhpcy5NYXhQbGF5ZXJzK01heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICAgICAgICBcImV4cGVjdGVkQ3VzdG9tUm9vbVByb3BlcnRpZXNcIjpfZGF0YVxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHtJc1NwZWN0YXRlOmZhbHNlfSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5qb2luUmFuZG9tUm9vbShyb29tT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIilcclxuICAgIH1cclxuICAgICAgICBcclxufSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGNhcmQgaW5kZXggb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRDYXJkRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRDYXJkRGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBjYXJkIGRhdGFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoNSwgeyBDYXJkRGF0YTogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgZ2FtZSBvdmVyIGNhbGxcclxuICAgIEBtZXRob2QgU2VuZEdhbWVPdmVyXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZEdhbWVPdmVyIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGdhbWUgb3ZlciBjYWxsXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDYsIHsgRGF0YTogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGJhY2tydXB0IGRhdGFcclxuICAgIEBtZXRob2QgU2VuZEJhbmtydXB0RGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRCYW5rcnVwdERhdGEgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgYmFua3J1cGN5IGRhdGFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoOSwgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgUGxheWVyIERhdGEgb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZERhdGEgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgcGxheWVyIGRhdGFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoMSwgeyBQbGF5ZXJJbmZvOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIG9uZSBxdWVzdGlvbiBEYXRhIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kT25lUXVlc3Rpb25EYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZE9uZVF1ZXN0aW9uRGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCg3LCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICAgIH0sXHJcbiAgXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIHByb2ZpdCBvciBsb3NzIHRvIHlvdXIgcGFzcnRuZXJcclxuICAgIEBtZXRob2QgU2VuZFBhcnRuZXJQcm9maXRMb3NzXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZFBhcnRuZXJQcm9maXRMb3NzIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDEzLCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnN9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgb25lIHF1ZXN0aW9uIHJlc3BvbnNlIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGEgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIHJlc3BvbnNlIGRhdGFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoOCwgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGRpY2UgZGF0YVxyXG4gICAgQG1ldGhvZCBEaWNlUm9sbEV2ZW50XHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgRGljZVJvbGxFdmVudCAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBkaWNlIGNvdW50XCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDMsIHsgRGljZUNvdW50OiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBnbyBiYWNrIHNwYWNlcyBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRHb0JhY2tTcGFjZURhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kR29CYWNrU3BhY2VEYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kIGdvIGJhY2sgc3BhY2VzIGRhdGFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoMTAsIHsgRGF0YTogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVyc30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZGluZyBvcGVuIGludml0YXRpb24gdG8gYWxsIHBsYXllcnMgZm9yIHBhcnRuZXIgc2hpcFxyXG4gICAgQG1ldGhvZCBTZW5kUGFydG5lclNoaXBPZmZlckRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kUGFydG5lclNoaXBPZmZlckRhdGEgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgcGFydG5lciBzaGlwIG9mZmVyXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDExLCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnN9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICAgIH0sXHJcbiAgXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kaW5nIHBhcnRuZXIgYW5zd2VyIGRhdGEgKGFjY2VwdCBvciByZWplY3QpXHJcbiAgICBAbWV0aG9kIFNlbmRQYXJ0bmVyU2hpcEFuc3dlckRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBhcnRlbnJzaGlwIGFuc3dlciBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDEyLCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnN9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgdXNlciBpZCBvZiBwbGF5ZXIgdG8gYWxsIG90aGVyIHdobyBoYWQgY29tcGxldGVkIHRoZWlyIHR1cm5cclxuICAgIEBtZXRob2QgU3luY1R1cm5Db21wbGV0aW9uXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTeW5jVHVybkNvbXBsZXRpb24gKF9kYXRhKSB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgdHVybiBjb21wbGV0aW9uIGRhdGFcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoNCwgeyBVSUQ6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTdGFydCBUdXJuIGZvciBpbml0aWFsIHR1cm5cclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTdGFydFR1cm4gKF9kYXRhKSB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXJ0aW5nIFR1cm5cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoMiwgeyBUdXJuTnVtYmVyOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICBcclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IFNob3cgdG9hc3QgbWVzc2FnZSBvbiB0aGUgY29uc29sZVxyXG4gICAgQG1ldGhvZCBTaG93VG9hc3RcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIG1lc3NhZ2UgdG8gYmUgc2hvd24gXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU2hvd1RvYXN0OmZ1bmN0aW9uKG1zZylcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRvYXN0IG1lc3NhZ2U6IFwiK21zZyk7XHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IFJlY2VpdmUgZXZlbnQgZnJvbSBwaG90b24gcmFpc2Ugb24gXHJcbiAgICBAbWV0aG9kIENhbGxSZWNpZXZlRXZlbnRcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDYWxsUmVjaWV2ZUV2ZW50OmZ1bmN0aW9uKF9ldmVudENvZGUsX3NlbmRlck5hbWUsX3NlbmRlcklELF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBJbnN0YW5jZU51bGw9dHJ1ZTtcclxuXHJcbiAgICAgICAgLy90byBjaGVjayBpZiBpbnN0YW5jZSBpcyBudWxsIGluIGNhc2UgY2xhc3MgaW5zdGFuY2UgaXMgbm90IGxvYWRlZCBhbmQgaXRzIHJlY2VpdmVzIGNhbGxiYWNrXHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCk9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbnN0YW5jZU51bGw9dHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbGxSZWNpZXZlRXZlbnQoX2V2ZW50Q29kZSxfc2VuZGVyTmFtZSxfc2VuZGVySUQsX2RhdGEpO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEluc3RhbmNlTnVsbD1mYWxzZTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsX3NlbmRlck5hbWUsX3NlbmRlcklELF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFJlc3RhcnRHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPWZhbHNlO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiU3BsYXNoXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAvL2NhbGxlZCBldmVyeSBmcmFtZVxyXG4gICAgdXBkYXRlIChkdCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBzb21lIGNoYW5nZSBpbiBjb25uZWN0aW9uIHN0YXRlXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25TdGF0ZUNoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gc3RhdGVcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vblN0YXRlQ2hhbmdlPWZ1bmN0aW9uKHN0YXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8jcmVnaW9uIENvbm5lY3Rpb24gU3RhdGVzXHJcbiAgICAgICAgICAgIC8vc3RhdGUgMSA6IGNvbm5lY3RpbmdUb05hbWVTZXJ2ZXJcclxuICAgICAgICAgICAgLy9TdGF0ZSAyIDogQ29ubmVjdGVkVG9OYW1lU2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgMyA6IENvbm5lY3RpbmdUb01hc3RlclNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDQgOiBDb25uZWN0ZWRUb01hc3RlclNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDU6ICBKb2luZWRMb2JieVxyXG4gICAgICAgICAgICAvL1N0YXRlIDYgOiBDb25uZWN0aW5nVG9HYW1lc2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgNyA6IENvbm5lY3RlZFRvR2FtZXNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDggOiBKb2luZWRcclxuICAgICAgICAgICAgLy9TdGF0ZSAxMDogRGlzY29ubmVjdGVkIFxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIHZhciBMQkMgPSBQaG90b24uTG9hZEJhbGFuY2luZy5Mb2FkQmFsYW5jaW5nQ2xpZW50O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXRlQ29kZTogXCIrc3RhdGUrXCIgXCIrTEJDLlN0YXRlVG9OYW1lKHN0YXRlKSk7XHJcblxyXG4gICAgICAgICAgICBpZihzdGF0ZT09MSlcclxuICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcImNvbm5lY3RpbmcgdG8gc2VydmVyLi4uXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHN0YXRlPT00KVxyXG4gICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwiY29ubmVjdGVkIHRvIHNlcnZlclwiKTtcclxuICAgICAgICAgICAgZWxzZSBpZihzdGF0ZT09NSkgLy9oYXMgam9pbmVkIGxvYmJ5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKFNob3dSb29tPT1mYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJ3YWl0aW5nIGZvciBvdGhlciBwbGF5ZXJzLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luUmFuZG9tUm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihTaG93Um9vbT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJzaG93aW5nIHJvb21zIGxpc3QuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZGVidWdcclxuICAgICAgICAgICAgQG1ldGhvZCBkZWJ1Z1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5kZWJ1Zz1mdW5jdGlvbihtZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGluZm9cclxuICAgICAgICAgICAgQG1ldGhvZCBpbmZvXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5pbmZvID0gZnVuY3Rpb24gKG1lc3MscGFyYW0pIHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzK3BhcmFtKTtcclxuICAgICAgICAgICBzdGF0ZVRleHQrPSBtZXNzK1wiIFwiK3BhcmFtK1wiXFxuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHdhcm5cclxuICAgICAgICAgICAgQG1ldGhvZCB3YXJuXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTFcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtMlxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYubG9nZ2VyLndhcm4gPSBmdW5jdGlvbiAobWVzcyxwYXJhbTEscGFyYW0yLHBhcmFtMykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzK1wiIFwiK3BhcmFtMStcIiBcIitwYXJhbTIrXCIgXCIrcGFyYW0zKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHBhcmFtMT09MjI1KSAvL25vIHJvb20gZm91bmRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyByYW5kb20gcm9vbSB3YXMgZm91bmQsIGNyZWF0aW5nIG9uZVwiKTtcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DcmVhdGVSb29tKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHBhcmFtMT09MjI2KSAvL3Jvb20gZG9lcyBub3QgZXhpc3RzIG9yIGlzIGZ1bGxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlNob3dUb2FzdChcIlJvb20gaXMgZnVsbCwgcGxlYXNlIHNlbGVjdCBhbnkgb3RoZXIgcm9vbSB0byBzcGVjdGF0ZS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBlcnJvclxyXG4gICAgICAgICAgICBAbWV0aG9kIGVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgIFBob3RvblJlZi5sb2dnZXIuZXJyb3IgPSBmdW5jdGlvbiAobWVzcyxwYXJhbSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5leGNlcHRpb24gPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBzb21lIGZvcm1hdFxyXG4gICAgICAgICAgICBAbWV0aG9kIGZvcm1hdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgIFBob3RvblJlZi5sb2dnZXIuZm9ybWF0ID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHBsYXllciBqb2lucyBsb2JieVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgUGhvdG9uUmVmLm9uUm9vbUxpc3QgPSBmdW5jdGlvbiAocm9vbXMpIHtcclxuICAgICAgICAgICAgc3RhdGVUZXh0Kz1cIlxcblwiK1wiUm9vbXMgTGlzdDpcIitcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgaWYocm9vbXMubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVRleHQrPVwiTm8gcm9vbXMgaW4gbG9iYnkuXCIrXCJcXG5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUscm9vbXNbaV0ucGxheWVyQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbSBuYW1lOiBcIityb29tc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZVRleHQrPVwiUm9vbTogXCIrcm9vbXNbaV0ubmFtZStcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBjaGFuZ2UgaW4gcm9vbXMgbGlzdCAocm9vbSBhZGRlZCx1cGRhdGVkLHJlbW92ZWQgZXRjKVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RVcGRhdGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1VwZGF0ZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zQWRkZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zUmVtb3ZlZFxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uUm9vbUxpc3RVcGRhdGUgPSBmdW5jdGlvbiAocm9vbXMsIHJvb21zVXBkYXRlZCwgcm9vbXNBZGRlZCwgcm9vbXNSZW1vdmVkKSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkocm9vbXNbaV0ubmFtZSxyb29tc1tpXS5wbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJvb20gbmFtZTogXCIrcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVRleHQrPVwiUm9vbTogXCIrcm9vbXNbaV0ubmFtZStcIlxcblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbXMgTGlzdCB1cGRhdGVkOiBcIiArIHJvb21zVXBkYXRlZC5sZW5ndGggKyBcIiB1cGRhdGVkLCBcIiArIHJvb21zQWRkZWQubGVuZ3RoICsgXCIgYWRkZWQsIFwiICsgcm9vbXNSZW1vdmVkLmxlbmd0aCArIFwiIHJlbW92ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGxvY2FsbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uSm9pblJvb21cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkpvaW5Sb29tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gTG9ncyBmb3IgZ2FtZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgXCIgKyB0aGlzLm15Um9vbSgpLm5hbWUgKyBcIiBqb2luZWRcIik7ICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15QWN0b3IoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KClbMF0ubG9hZEJhbGFuY2luZ0NsaWVudC51c2VySWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkuX2N1c3RvbVByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdKTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgIGlmKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl09PXRydWUpIC8vY2hlY2sgaWYgcGxheWVyIHdobyBqb2luZWQgaXMgc3BlY3RhdGVcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPXRydWU7XHJcbiAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge2NjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLHRydWUsdHJ1ZSxcIkdhbWVQbGF5XCIpO30sIDEwMDApOyAvL2Z1bmN0aW9uIGluIFVJTWFuYWdlclxyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgcmVtb3RlbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JKb2luXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uQWN0b3JKb2luID0gZnVuY3Rpb24gKGFjdG9yKSB7XHJcbiAgICAgICAgICAgIGlmKFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCk9PU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzKSAvL3doZW4gbWF4IHBsYXllciByZXF1aXJlZCB0byBzdGFydCBnYW1lIGhhcyBiZWVuIGFkZGVkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHJlcXVpcmVkIHBsYXllcnMgam9pbmVkLCBzdGFydGluZyB0aGUgZ2FtZS4uXCIpXHJcbiAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJwbGF5ZXJzIGZvdW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPXRydWU7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIix0cnVlLHRydWUsXCJHYW1lUGxheVwiKTt9LCAxMDAwKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXModHJ1ZSxQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpLGZhbHNlLGZhbHNlLGZhbHNlLG51bGwsZmFsc2UsMCk7XHJcbiAgICAgICAgICAgICAgICAvL1Bob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclwiLFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksdHJ1ZSk7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBqb2luZWRcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUb3RhbCBQbGF5ZXJzOiBcIitQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBsZWF2ZXMgYSByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckxlYXZlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uQWN0b3JMZWF2ZSA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICAgICAgICBpZihNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT09dHJ1ZSlcclxuICAgICAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIWFjdG9yLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuR2FtZU92ZXIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZighTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkxlYXZlUm9vbSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWN0YXRvciBsZWZ0LCBzbyBkb250IG1pbmQsIGNvbnQgZ2FtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGxlZnRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5nZXRTY2VuZU5hbWUoKT09XCJHYW1lUGxheVwiKSAvL2lmIHNjZW5lIGlzIGdhbWVwbGF5IGxldCBwbGF5ZXIgZmluaXNoIGdhbWUgZm9yY2VmdWxseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwib3RoZXIgcGxheWVyIFwiK2FjdG9yLm5hbWUrXCIgaGFzIGxlZnRcIiwyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJTcGxhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgb3duIHByb3BlcnRpZXMgZ290IGNoYW5nZWRcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9yUHJvcGVydGllc0NoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkFjdG9yUHJvcGVydGllc0NoYW5nZSA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgcm9vbSBwcm9wZXJ0aWVzIGdvdCBjaGFuZ2VkXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uTXlSb29tUHJvcGVydGllc0NoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gdG8gaGFuZGxlIGVycm9yc1xyXG4gICAgICAgICAgICBAbWV0aG9kIG9uRXJyb3JcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGVycm9yQ29kZVxyXG4gICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGVycm9yTXNnXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25FcnJvciA9IGZ1bmN0aW9uIChlcnJvckNvZGUsIGVycm9yTXNnKSB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBcIiArIGVycm9yQ29kZSArIFwiOiBcIiArIGVycm9yTXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGFuIGV2ZW50IGlzIHJlY2VpdmVkIHdpdGggc29tZSBkYXRhXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25FdmVudFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gY29kZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gY29udGVudFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JOclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uRXZlbnQgPSBmdW5jdGlvbiAoY29kZSwgY29udGVudCwgYWN0b3JOcikge1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY29kZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOi8vcmVjZXZpbmcgcGxheWVyZGF0YSBpbmZvXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwbGF5ZXIgZGF0YVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBQbGF5ZXJJbmZvRGF0YSA9IGNvbnRlbnQuUGxheWVySW5mbztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxLHNlbmRlck5hbWUsc2VuZGVySUQsUGxheWVySW5mb0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6IC8vc3RhcnQgdHVybiByYWlzZSBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgc3RhcnQgdHVybiBldmVudFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfVHVybiA9IGNvbnRlbnQuVHVybk51bWJlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyLHNlbmRlck5hbWUsc2VuZGVySUQsX1R1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOiAvLyBkaWNlIGNvdW50XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkaWNlIGNvdW50XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kaWNlID0gY29udGVudC5EaWNlQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMyxzZW5kZXJOYW1lLHNlbmRlcklELF9kaWNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IC8vcmVjZWluZyB1c2VyIGlkIG9mIHBsYXllciB3aG8gaGFzIGNvbXBsZXRlZCB0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwbGF5ZXIgdHVybiBjb21wbGV0ZWRcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX0lEID0gY29udGVudC5VSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNCxzZW5kZXJOYW1lLHNlbmRlcklELF9JRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiAvL3JlY2VpdmluZyBjYXJkIGRhdGEgKGluZGV4KSBzbyBvdGhlciB1c2VycyBjYW4gc3luYyB0aGVtXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBjYXJkIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2NhcmQgPSBjb250ZW50LkNhcmREYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNSxzZW5kZXJOYW1lLHNlbmRlcklELF9jYXJkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6IC8vcmVjZWl2ZSBnYW1lIG92ZXIgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZ2FtZSBvdmVyIGNhbGxcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg2LHNlbmRlck5hbWUsc2VuZGVySUQsX2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogLy9yZWNlaXZlIG9uZSBRdWVzdGlvbiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBvbmUgcXVlc3Rpb24gZGF0YVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDcsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA4OiAvL3JlY2VpdmUgb25lIFF1ZXN0aW9uIHJlc3BvbnNlIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIG9uZSBxdWVzdGlvIHJlc3BvbnNlIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg4LHNlbmRlck5hbWUsc2VuZGVySUQsX2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgOTogLy9yZWNlaXZlIGJhbmtydXB0IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGJhbmtydXB0IGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg5LHNlbmRlck5hbWUsc2VuZGVySUQsX2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTA6IC8vcmVjZWl2ZSBiYWNrc3BhY2UgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgYmFja3NwYWNlIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMCxzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDExOiAvL3JlY2VpdmVpbmcgcGFydG5lcnNoaXAgb2ZmZXJcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMSxzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgY2FzZSAxMjogLy9yZWNlaXZlaW5nIHBhcnRuZXJzaGlwIGFuc3dlciBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBhbndzZXIgZGF0YVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEyLHNlbmRlck5hbWUsc2VuZGVySUQsX2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTM6IC8vcmVjZWl2aW5nIHByb2ZpdC9sb3NzIGRhdGEgZm9yIHBhcnRuZXJcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTMsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgXHJcbiAgICAgfSxcclxuICAgICBcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cz1NdWx0aXBsYXllckNvbnRyb2xsZXI7Il19