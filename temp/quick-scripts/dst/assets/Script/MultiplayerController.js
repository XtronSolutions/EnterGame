
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJSb29tUHJvcGVydHkiLCJjYyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJQbGF5ZXIiLCJ0eXBlIiwiSW50ZWdlciIsInNlcmlhbGl6YWJsZSIsIkluaXRpYWxTZXR1cCIsIkJvb2xlYW4iLCJQbGF5ZXJHYW1lSW5mbyIsIlRleHQiLCJUdXJuTnVtYmVyIiwiQXBwX0luZm8iLCJBcHBJRCIsInRvb2x0aXAiLCJBcHBWZXJzaW9uIiwiV3NzIiwiZGlzcGxheU5hbWUiLCJNYXN0ZXJTZXJ2ZXIiLCJGYkFwcElEIiwiTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiQ29tcG9uZW50IiwiUGhvdG9uQXBwSW5mbyIsIk1heFBsYXllcnMiLCJNYXhTcGVjdGF0b3JzIiwiTW9kZVNlbGVjdGlvbiIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIm9uTG9hZCIsIkluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTW9kZVNlbGVjdGlvbiIsIl92YWwiLCJHZXRTZWxlY3RlZE1vZGUiLCJnYW1lIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIkluaXRpYWxpemVQaG90b24iLCJjb25zb2xlIiwibG9nIiwiQXBwSW5mbyIsIkRlbW9Mb2FkQmFsYW5jaW5nIiwiTGVhdmVSb29tIiwiUm9vbU5hbWUiLCJNZXNzYWdlIiwiSm9pbmVkUm9vbSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsImdldFNjZW5lTmFtZSIsInNjZW5lTmFtZSIsIl9zY2VuZUluZm9zIiwiaSIsImxlbmd0aCIsInV1aWQiLCJkaXJlY3RvciIsIl9zY2VuZSIsIl9pZCIsInVybCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibWF0Y2giLCJUb2dnbGVTaG93Um9vbV9Cb29sIiwiX3N0YXRlIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJnZXRQaG90b25SZWYiLCJQaG90b25BY3RvciIsIm15QWN0b3IiLCJSb29tQWN0b3JzIiwibXlSb29tQWN0b3JzQXJyYXkiLCJDaGVja1NwZWN0YXRlIiwiY3VzdG9tUHJvcGVydGllcyIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIkFwcElkIiwiRmJBcHBJZCIsIlJlcXVlc3RDb25uZWN0aW9uIiwic3RhdGUiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5Iiwic3RhcnQiLCJEaXNjb25uZWN0UGhvdG9uIiwiaXNKb2luZWRUb1Jvb20iLCJkaXNjb25uZWN0IiwiUmVzZXRTdGF0ZSIsIk9uUm9vbU5hbWVDaGFuZ2UiLCJPbk1lc3NhZ2VDaGFuZ2UiLCJtc2ciLCJVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyIsIl9wbGF5ZXJVcGRhdGUiLCJfcGxheWVyVmFsdWUiLCJfaW5pdGlhbFNldHVwVXBkYXRlIiwiX2luaXRpYWxTZXR1cFZhbHVlIiwiX3BsYXllckdhbWVJbmZvVXBkYXRlIiwiX3BsYXllckdhbWVJbmZvVmFsdWUiLCJfdHVybk51bWJlclVwZGF0ZSIsIl90dXJuTnVtYmVydmFsdWUiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNyZWF0ZVJvb20iLCJfZGF0YSIsInJvb21PcHRpb25zIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU3R1ZGVudERhdGEiLCJzZXRVc2VySWQiLCJ1c2VySUQiLCJSb29tSUQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJEYXRlIiwibm93IiwiY3JlYXRlUm9vbSIsIkpvaW5Sb29tIiwiX3Jvb21OYW1lIiwiam9pblJvb20iLCJKb2luUmFuZG9tUm9vbSIsImpvaW5SYW5kb21Sb29tIiwiU2VuZENhcmREYXRhIiwicmFpc2VFdmVudCIsIkNhcmREYXRhIiwic2VuZGVyTmFtZSIsInNlbmRlcklEIiwiYWN0b3JOciIsInJlY2VpdmVycyIsIlBob3RvbiIsIkxvYWRCYWxhbmNpbmciLCJDb25zdGFudHMiLCJSZWNlaXZlckdyb3VwIiwiQWxsIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwiU2VuZEdhbWVPdmVyIiwiRGF0YSIsIlNlbmRCYW5rcnVwdERhdGEiLCJPdGhlcnMiLCJTZW5kRGF0YSIsIlBsYXllckluZm8iLCJTZW5kT25lUXVlc3Rpb25EYXRhIiwiU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhIiwiRGljZVJvbGxFdmVudCIsIkRpY2VDb3VudCIsIlNlbmRHb0JhY2tTcGFjZURhdGEiLCJTeW5jVHVybkNvbXBsZXRpb24iLCJVSUQiLCJTdGFydFR1cm4iLCJTaG93VG9hc3QiLCJDYWxsUmVjaWV2ZUV2ZW50IiwiX2V2ZW50Q29kZSIsIl9zZW5kZXJOYW1lIiwiX3NlbmRlcklEIiwiSW5zdGFuY2VOdWxsIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJzZXRUaW1lb3V0IiwiUmVjZWl2ZUV2ZW50IiwiUmVzdGFydEdhbWUiLCJsb2FkU2NlbmUiLCJ1cGRhdGUiLCJkdCIsIm9uU3RhdGVDaGFuZ2UiLCJMQkMiLCJMb2FkQmFsYW5jaW5nQ2xpZW50IiwiU3RhdGVUb05hbWUiLCJzeXN0ZW1FdmVudCIsImVtaXQiLCJHZXRfVUlNYW5hZ2VyIiwiVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJIiwiVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJIiwibG9nZ2VyIiwiZGVidWciLCJtZXNzIiwiaW5mbyIsInBhcmFtIiwid2FybiIsInBhcmFtMSIsInBhcmFtMiIsInBhcmFtMyIsIlRvZ2dsZUxvYWRpbmdOb2RlIiwiZXhjZXB0aW9uIiwiZm9ybWF0Iiwib25Sb29tTGlzdCIsInJvb21zIiwiUmVzZXRSb29tTGlzdCIsIlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJIiwicGxheWVyQ291bnQiLCJvblJvb21MaXN0VXBkYXRlIiwicm9vbXNVcGRhdGVkIiwicm9vbXNBZGRlZCIsInJvb21zUmVtb3ZlZCIsIm9uSm9pblJvb20iLCJsb2FkQmFsYW5jaW5nQ2xpZW50IiwidXNlcklkIiwiX2N1c3RvbVByb3BlcnRpZXMiLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIm9uQWN0b3JKb2luIiwiYWN0b3IiLCJteVJvb21BY3RvckNvdW50Iiwib25BY3RvckxlYXZlIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJHYW1lT3ZlciIsIkdldF9HYW1lTWFuYWdlciIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJDbGVhckRpc3BsYXlUaW1lb3V0Iiwib25BY3RvclByb3BlcnRpZXNDaGFuZ2UiLCJvbk15Um9vbVByb3BlcnRpZXNDaGFuZ2UiLCJvbkVycm9yIiwiZXJyb3JDb2RlIiwiZXJyb3JNc2ciLCJvbkV2ZW50IiwiY29kZSIsImNvbnRlbnQiLCJQbGF5ZXJJbmZvRGF0YSIsIl9UdXJuIiwiX2RpY2UiLCJfSUQiLCJfY2FyZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJQSxTQUFKO0FBQ0EsSUFBSUMsU0FBUyxHQUFDLEVBQWQ7QUFDQSxJQUFJQyx3QkFBd0IsR0FBQyxJQUE3QjtBQUNBLElBQUlDLFFBQVEsR0FBQyxLQUFiLEVBRUE7O0FBQ0EsSUFBSUMsWUFBWSxHQUFDQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN0QkMsRUFBQUEsSUFBSSxFQUFDLGNBRGlCO0FBRXRCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsQ0FETDtBQUVKQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00sT0FGTDtBQUdKQyxNQUFBQSxZQUFZLEVBQUU7QUFIVixLQURBO0FBTVJDLElBQUFBLFlBQVksRUFBRTtBQUNWLGlCQUFTLEtBREM7QUFFVkgsTUFBQUEs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cUJBQXFCLENBQUNPLFFBQXRCLENBQStCMEgsZ0JBQS9CLENBQWdELENBQWhELEVBQWtEM0IsVUFBbEQsRUFBNkRDLFFBQTdELEVBQXNFdkIsS0FBdEU7QUFFQTs7QUFDSixhQUFLLENBQUw7QUFBUTtBQUNKL0QsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQVo7QUFDQSxjQUFJOEQsS0FBSyxHQUFHaUgsT0FBTyxDQUFDOUUsSUFBcEI7QUFDQSxjQUFJYixVQUFVLEdBQUcyRixPQUFPLENBQUMzRixVQUF6QjtBQUNBLGNBQUlDLFFBQVEsR0FBRzBGLE9BQU8sQ0FBQzFGLFFBQXZCO0FBRUF2RyxVQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0IwSCxnQkFBL0IsQ0FBZ0QsQ0FBaEQsRUFBa0QzQixVQUFsRCxFQUE2REMsUUFBN0QsRUFBc0V2QixLQUF0RTtBQUVBOztBQUNKLGFBQUssRUFBTDtBQUFTO0FBQ0wvRCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx5QkFBWjtBQUNBLGNBQUk4RCxLQUFLLEdBQUdpSCxPQUFPLENBQUM5RSxJQUFwQjtBQUNBLGNBQUliLFVBQVUsR0FBRzJGLE9BQU8sQ0FBQzNGLFVBQXpCO0FBQ0EsY0FBSUMsUUFBUSxHQUFHMEYsT0FBTyxDQUFDMUYsUUFBdkI7QUFFQXZHLFVBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQjBILGdCQUEvQixDQUFnRCxFQUFoRCxFQUFtRDNCLFVBQW5ELEVBQThEQyxRQUE5RCxFQUF1RXZCLEtBQXZFO0FBRUE7O0FBQ0o7QUEzRko7QUE2RkgsS0EvRkQ7QUFnR0Y7QUFya0M2QixDQUFULENBQTFCO0FBeWtDQXVILE1BQU0sQ0FBQ0MsT0FBUCxHQUFleE0scUJBQWYiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vR2xvYmFsIFZhcmlhYmxlc1xyXG52YXIgUGhvdG9uUmVmO1xyXG52YXIgc3RhdGVUZXh0PVwiXCI7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFNob3dSb29tPWZhbHNlO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gUm9vbVByb3BlcnR5LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvb21Qcm9wZXJ0eT1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUm9vbVByb3BlcnR5XCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUGxheWVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSW5pdGlhbFNldHVwOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgVHVybk51bWJlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gQXBwX0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQXBwX0luZm89Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkFwcF9JbmZvXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgQXBwSUQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJBcHAgaWQgZm9ybSBwaG90b24gZGFzaGJvYXJkXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEFwcFZlcnNpb246IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJBcHAgdmVyc2lvbiBmb3IgcGhvdG9uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFdzczoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIklzU2VjdXJlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIklmIHBob3RvbiBzaG91bGQgdXNlIHNlY3VyZSBhbmQgcmVsaWFibGUgcHJvdG9jb2xzXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIE1hc3RlclNlcnZlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIm1hc3RlciBzZXJ2ZXIgZm9yIHBob3RvbiB0byBjb25uZWN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEZiQXBwSUQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJGQiBhcHAgaWQgdXNlZCBmb3IgRkIgYXV0aGVyaXphdGlvblwiXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGRhdGEgcmVsYXRlZCB0byBNdWx0aXBsYXllckNvbnRyb2xsZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE11bHRpcGxheWVyQ29udHJvbGxlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiTXVsdGlwbGF5ZXJDb250cm9sbGVyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUGhvdG9uQXBwSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEFwcF9JbmZvLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICAgICBNYXhQbGF5ZXJzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sIFxyXG4gICAgICAgIE1heFNwZWN0YXRvcnM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSwgXHJcbiAgICAgICAgTW9kZVNlbGVjdGlvbjogeyAvLyAxIG1lYW5zIGJvdCAsIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sIFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczogeyAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgICAgICBJbnN0YW5jZTogbnVsbCxcclxuICAgIH0sXHJcblxyXG4gICAgLy90aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3MgaXMgY3JlYXRlZFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLkluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZU1vZGVTZWxlY3Rpb24oX3ZhbCkvLyAxIG1lYW5zIGJvdCAsIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Nb2RlU2VsZWN0aW9uPV92YWw7XHJcbiAgICB9LFxyXG5cclxuICAgIEdldFNlbGVjdGVkTW9kZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTW9kZVNlbGVjdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBJbml0aWFsaXplIHNvbWUgZXNzZW50YWlscyBkYXRhIGZvciBtdWx0aXBsYXllciBjb250cm9sbGVyIGNsYXNzXHJcbiAgICBAbWV0aG9kIEluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKClcclxuICAgIHtcclxuICAgICAgICBpZighTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgdGhpcy5Jbml0aWFsaXplUGhvdG9uKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEFwcEluZm8pO1xyXG4gICAgICAgICAgICBQaG90b25SZWYgPSBuZXcgRGVtb0xvYWRCYWxhbmNpbmcoKTtcclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlPXRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkxlYXZlUm9vbT1mYWxzZTtcclxuICAgICAgICB0aGlzLlJvb21OYW1lPVwiXCI7XHJcbiAgICAgICAgdGhpcy5NZXNzYWdlPVwiXCI7XHJcbiAgICAgICAgU2hvd1Jvb209ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Kb2luZWRSb29tPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2hlY2sgcmVmZXJlbmNlIHRvIHNvbWUgdmFyaWFibGVzIGFuZCBjbGFzc2VzXHJcbiAgICBAbWV0aG9kIENoZWNrUmVmZXJlbmNlc1xyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICB9LFxyXG5cclxuICAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZW1vdmUgcGVyc2lzdCBub2RlIHdoZW4gd2FudCB0byByZXN0YXJ0IHNjZW5lXHJcbiAgICBAbWV0aG9kIFJlbW92ZVBlcnNpc3ROb2RlXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFJlbW92ZVBlcnNpc3ROb2RlKClcclxuICAgIHtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2U9bnVsbDtcclxuICAgICAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIGdldCBuYW1lIG9mIGN1cnJlbnQgb3BlbmVkIHNjZW5lXHJcbiAgICBAbWV0aG9kIGdldFNjZW5lTmFtZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtzdHJpbmd9IHNjZW5lTmFtZVxyXG4gICAgKiovIFxyXG4gICAgZ2V0U2NlbmVOYW1lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2NlbmVOYW1lO1xyXG4gICAgICAgIHZhciBfc2NlbmVJbmZvcyA9IGNjLmdhbWUuX3NjZW5lSW5mb3M7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfc2NlbmVJbmZvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihfc2NlbmVJbmZvc1tpXS51dWlkID09IGNjLmRpcmVjdG9yLl9zY2VuZS5faWQpIHtcclxuICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9IF9zY2VuZUluZm9zW2ldLnVybDtcclxuICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9IHNjZW5lTmFtZS5zdWJzdHJpbmcoc2NlbmVOYW1lLmxhc3RJbmRleE9mKCcvJykrMSkubWF0Y2goL1teXFwuXSsvKVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2VuZU5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gc2V0IFwiU2hvd1Jvb21cIiBib29sIHZhbHVlXHJcbiAgICBAbWV0aG9kIFRvZ2dsZVNob3dSb29tX0Jvb2xcclxuICAgIEBwYXJhbSB7Ym9vbGVhbn0gX3N0YXRlXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICoqLyBcclxuICAgIFRvZ2dsZVNob3dSb29tX0Jvb2woX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIFNob3dSb29tPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBzZXQgXCJMZWF2ZVJvb21cIiBib29sIHZhbHVlXHJcbiAgICBAbWV0aG9kIFRvZ2dsZUxlYXZlUm9vbV9Cb29sXHJcbiAgICBAcGFyYW0ge2Jvb2xlYW59IF9zdGF0ZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAqKi8gXHJcbiAgICBUb2dnbGVMZWF2ZVJvb21fQm9vbChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5MZWF2ZVJvb209X3N0YXRlO1xyXG4gICAgfSxcclxuICAgICBcclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBQaG90b24gXCJQaG90b25SZWZcIiBpbnN0YW5jZSBjcmVhdGVkIGJ5IG11bHRpcGxheWVyIGNsYXNzXHJcbiAgICBAbWV0aG9kIGdldFBob3RvblJlZlxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IFBob3RvblJlZlxyXG4gICAgKiovIFxyXG4gICAgZ2V0UGhvdG9uUmVmKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUGhvdG9uUmVmO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgbXlBY3RvciBpbnN0YW5jZSBjcmVhdGVkIGJ5IHBob3RvblxyXG4gICAgQG1ldGhvZCBQaG90b25BY3RvclxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IEFjdG9yXHJcbiAgICAqKi8gXHJcbiAgICBQaG90b25BY3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBob3RvblJlZi5teUFjdG9yKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBteVJvb21BY3RvcnNBcnJheSBjcmVhdGVkIGJ5IHBob3RvblxyXG4gICAgQG1ldGhvZCBSb29tQWN0b3JzXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gQWN0b3JcclxuICAgICoqLyBcclxuICAgIFJvb21BY3RvcnMoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIGlzU3BlY3RhdGUgdmFyaWFibGUgZnJvbSBjdXN0b20gcHJvcGVydHkgb2YgY3VycmVudCBhY3RvclxyXG4gICAgQG1ldGhvZCBDaGVja1NwZWN0YXRlXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IGlzU3BlY3RhdGVcclxuICAgICoqLyBcclxuICAgIENoZWNrU3BlY3RhdGUoKVxyXG4gICAge1xyXG4gICAgICAgICByZXR1cm4gUGhvdG9uUmVmLm15QWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IEluaXRpYWxpemUgcGhvdG9uIHdpdGggYXBwaWQsYXBwIHZlcnNpb24sIFdzcyBldGNcclxuICAgIEBtZXRob2QgSW5pdGlhbGl6ZVBob3RvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBJbml0aWFsaXplUGhvdG9uKClcclxuICAgIHtcclxuICAgICAgICBBcHBJbmZvLkFwcElkPXRoaXMuUGhvdG9uQXBwSW5mby5BcHBJRDtcclxuICAgICAgICBBcHBJbmZvLkFwcFZlcnNpb249dGhpcy5QaG90b25BcHBJbmZvLkFwcFZlcnNpb247XHJcbiAgICAgICAgQXBwSW5mby5Xc3M9dGhpcy5QaG90b25BcHBJbmZvLldzcztcclxuICAgICAgICBBcHBJbmZvLk1hc3RlclNlcnZlcj10aGlzLlBob3RvbkFwcEluZm8uTWFzdGVyU2VydmVyO1xyXG4gICAgICAgIEFwcEluZm8uRmJBcHBJZD10aGlzLlBob3RvbkFwcEluZm8uRmJBcHBJRDsgIFxyXG4gICAgfSxcclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBjb25uZWN0aW9uIHJlcXVlc3QgdG8gcGhvdG9uXHJcbiAgICBAbWV0aG9kIFJlcXVlc3RDb25uZWN0aW9uXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFJlcXVlc3RDb25uZWN0aW9uICgpIHtcclxuICAgICAgICBpZihQaG90b25SZWYuc3RhdGU9PTUgfHwgUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKT09dHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCk9PXRydWUpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBjb25uZWN0ZWRcIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBQaG90b25SZWYuc3RhcnQoKTsgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgRGlzY29ubmVjdCBmcm9tIHBob3RvblxyXG4gICAgQG1ldGhvZCBEaXNjb25uZWN0UGhvdG9uXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIERpc2Nvbm5lY3RQaG90b24gKCkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKT09dHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCk9PXRydWUgIHx8UGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgIFBob3RvblJlZi5kaXNjb25uZWN0KCk7ICAgXHJcbiAgICAgICAgdGhpcy5Kb2luZWRSb29tPWZhbHNlO1xyXG4gICAgICAgIC8vUGhvdG9uUmVmLmxlYXZlUm9vbSgpO1xyXG4gICAgICAgIHRoaXMuUmVzZXRTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBpbnNpZGUgYW55IHJvb20gb3IgbG9iYnkgb3IgY29ubmVjdGVkIHRvIHBob3RvblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmVzZXRpbmcgZmV3IHZhbHVlc1xyXG4gICAgQG1ldGhvZCBSZXNldFN0YXRlXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFJlc2V0U3RhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTGVhdmVSb29tPWZhbHNlOyAgICBcclxuICAgICAgICB0aGlzLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAgICAgU2hvd1Jvb209ZmFsc2U7XHJcbiAgICAgICAgc3RhdGVUZXh0PVwiXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gcm9vbSBuYW1lIGdvdCBpbnB1dCBmcm9tIGdhbWVcclxuICAgIEBtZXRob2QgT25Sb29tTmFtZUNoYW5nZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBPblJvb21OYW1lQ2hhbmdlKG5hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Sb29tTmFtZT1uYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIG1lc3NhZ2Ugd2luZG93IGdvdCBpbnB1dCBmcm9tIGdhbWVcclxuICAgIEBtZXRob2QgT25NZXNzYWdlQ2hhbmdlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbXNnXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgT25NZXNzYWdlQ2hhbmdlKG1zZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLk1lc3NhZ2U9bXNnO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHVwZGF0ZSBjdXN0b20gcm9vbSBwcm9wZXJ0aWVzXHJcbiAgICBAbWV0aG9kIFVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXMoX3BsYXllclVwZGF0ZT1mYWxzZSxfcGxheWVyVmFsdWU9MCxfaW5pdGlhbFNldHVwVXBkYXRlPWZhbHNlLF9pbml0aWFsU2V0dXBWYWx1ZT1mYWxzZSxfcGxheWVyR2FtZUluZm9VcGRhdGU9ZmFsc2UsX3BsYXllckdhbWVJbmZvVmFsdWU9bnVsbCxfdHVybk51bWJlclVwZGF0ZT1mYWxzZSxfdHVybk51bWJlcnZhbHVlPTApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX3BsYXllclVwZGF0ZSlcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyXCIsX3BsYXllclZhbHVlLHRydWUpO1xyXG5cclxuICAgICAgICBpZihfaW5pdGlhbFNldHVwVXBkYXRlKVxyXG4gICAgICAgICAgICBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIixfaW5pdGlhbFNldHVwVmFsdWUsdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoX3BsYXllckdhbWVJbmZvVXBkYXRlKVxyXG4gICAgICAgICAgICBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLF9wbGF5ZXJHYW1lSW5mb1ZhbHVlLHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKF90dXJuTnVtYmVyVXBkYXRlKVxyXG4gICAgICAgICAgICBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsX3R1cm5OdW1iZXJ2YWx1ZSx0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjcmVhdGUgcm9vbSByZXF1ZXN0XHJcbiAgICBAbWV0aG9kIENyZWF0ZVJvb21cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ3JlYXRlUm9vbSAoKSB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKT09dHJ1ZSB8fFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSB8fCBQaG90b25SZWYuc3RhdGU9PTgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09ZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGE9bmV3IFJvb21Qcm9wZXJ0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9kYXRhLlBsYXllcj0wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPXtcclxuICAgICAgICAgICAgICAgICAgICAgIFwiaXNWaXNpYmxlXCI6dHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBcImlzT3BlblwiOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICBcIm1heFBsYXllcnNcIjp0aGlzLk1heFBsYXllcnMrdGhpcy5NYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJjdXN0b21HYW1lUHJvcGVydGllc1wiOl9kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHtJc1NwZWN0YXRlOmZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBSb29tSUQ9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5jcmVhdGVSb29tKFwiUm9vbV9cIitSb29tSUQscm9vbU9wdGlvbnMpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgam9pbiByb29tIHJlcXVlc3QgYnkgbmFtZVxyXG4gICAgQG1ldGhvZCBKb2luUm9vbVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IF9yb29tTmFtZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEpvaW5Sb29tIChfcm9vbU5hbWUpIHtcclxuICAgICAgICBpZihQaG90b25SZWYuc3RhdGU9PTUgfHwgUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKT09dHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCk9PXRydWUgfHxQaG90b25SZWYuc3RhdGU9PTgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09ZmFsc2UgfHwgUGhvdG9uUmVmLnN0YXRlIT04KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPXtcclxuICAgICAgICAgICAgICAgICAgICBcImlzVmlzaWJsZVwiOnRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaXNPcGVuXCI6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtYXhQbGF5ZXJzXCI6dGhpcy5NYXhQbGF5ZXJzK3RoaXMuTWF4U3BlY3RhdG9yc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vXCJjdXN0b21HYW1lUHJvcGVydGllc1wiOntcIlJvb21Fc3NlbnRpYWxzXCI6IHtJc1NwZWN0YXRlOnRydWV9fVxyXG4gICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7SXNTcGVjdGF0ZTp0cnVlfSk7XHJcbiAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5qb2luUm9vbShfcm9vbU5hbWUscm9vbU9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIilcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBqb2luIHJhbmRvbSByb29tXHJcbiAgICBAbWV0aG9kIEpvaW5SYW5kb21Sb29tXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBKb2luUmFuZG9tUm9vbSAoKSB7XHJcbiAgICBpZihQaG90b25SZWYuc3RhdGU9PTUgfHwgUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKT09dHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCk9PXRydWUgfHxQaG90b25SZWYuc3RhdGU9PTgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PWZhbHNlIHx8IFBob3RvblJlZi5zdGF0ZSE9OClcclxuICAgICAgICB7ICBcclxuICAgICAgICAgICAgdmFyIF9kYXRhPW5ldyBSb29tUHJvcGVydHkoKTtcclxuICAgICAgICAgICAgX2RhdGEuUGxheWVyPTA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPXtcclxuICAgICAgICAgICAgICAgIC8vXCJleHBlY3RlZE1heFBsYXllcnNcIjp0aGlzLk1heFBsYXllcnMrTWF4U3BlY3RhdG9ycyxcclxuICAgICAgICAgICAgICAgIFwiZXhwZWN0ZWRDdXN0b21Sb29tUHJvcGVydGllc1wiOl9kYXRhXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWU9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwge0lzU3BlY3RhdGU6ZmFsc2V9KTtcclxuICAgICAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG5cclxuICAgICAgICAgICAgUGhvdG9uUmVmLmpvaW5SYW5kb21Sb29tKHJvb21PcHRpb25zKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG59LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgY2FyZCBpbmRleCBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZENhcmREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZENhcmREYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGNhcmQgZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCg1LCB7IENhcmREYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBnYW1lIG92ZXIgY2FsbFxyXG4gICAgQG1ldGhvZCBTZW5kR2FtZU92ZXJcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kR2FtZU92ZXIgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZ2FtZSBvdmVyIGNhbGxcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoNiwgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgYmFja3J1cHQgZGF0YVxyXG4gICAgQG1ldGhvZCBTZW5kQmFua3J1cHREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZEJhbmtydXB0RGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBiYW5rcnVwY3kgZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCg5LCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnN9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBQbGF5ZXIgRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kRGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBwbGF5ZXIgZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgxLCB7IFBsYXllckluZm86IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgb25lIHF1ZXN0aW9uIERhdGEgb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRPbmVRdWVzdGlvbkRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kT25lUXVlc3Rpb25EYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDcsIHsgRGF0YTogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBvbmUgcXVlc3Rpb24gcmVzcG9uc2Ugb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gcmVzcG9uc2UgZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCg4LCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnN9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgZGljZSBkYXRhXHJcbiAgICBAbWV0aG9kIERpY2VSb2xsRXZlbnRcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBEaWNlUm9sbEV2ZW50IChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGRpY2UgY291bnRcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoMywgeyBEaWNlQ291bnQ6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGdvIGJhY2sgc3BhY2VzIGRhdGFcclxuICAgIEBtZXRob2QgU2VuZEdvQmFja1NwYWNlRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRHb0JhY2tTcGFjZURhdGEgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmQgZ28gYmFjayBzcGFjZXMgZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgxMCwgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIHVzZXIgaWQgb2YgcGxheWVyIHRvIGFsbCBvdGhlciB3aG8gaGFkIGNvbXBsZXRlZCB0aGVpciB0dXJuXHJcbiAgICBAbWV0aG9kIFN5bmNUdXJuQ29tcGxldGlvblxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU3luY1R1cm5Db21wbGV0aW9uIChfZGF0YSkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHR1cm4gY29tcGxldGlvbiBkYXRhXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDQsIHsgVUlEOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU3RhcnQgVHVybiBmb3IgaW5pdGlhbCB0dXJuXHJcbiAgICBAbWV0aG9kIFN0YXJ0VHVyblxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU3RhcnRUdXJuIChfZGF0YSkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdGFydGluZyBUdXJuXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDIsIHsgVHVybk51bWJlcjogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgXHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTaG93IHRvYXN0IG1lc3NhZ2Ugb24gdGhlIGNvbnNvbGVcclxuICAgIEBtZXRob2QgU2hvd1RvYXN0XHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIHNob3duIFxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFNob3dUb2FzdDpmdW5jdGlvbihtc2cpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0b2FzdCBtZXNzYWdlOiBcIittc2cpO1xyXG4gICAgfSxcclxuXHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZWNlaXZlIGV2ZW50IGZyb20gcGhvdG9uIHJhaXNlIG9uIFxyXG4gICAgQG1ldGhvZCBDYWxsUmVjaWV2ZUV2ZW50XHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ2FsbFJlY2lldmVFdmVudDpmdW5jdGlvbihfZXZlbnRDb2RlLF9zZW5kZXJOYW1lLF9zZW5kZXJJRCxfZGF0YSlcclxuICAgIHtcclxuICAgICAgICB2YXIgSW5zdGFuY2VOdWxsPXRydWU7XHJcblxyXG4gICAgICAgIC8vdG8gY2hlY2sgaWYgaW5zdGFuY2UgaXMgbnVsbCBpbiBjYXNlIGNsYXNzIGluc3RhbmNlIGlzIG5vdCBsb2FkZWQgYW5kIGl0cyByZWNlaXZlcyBjYWxsYmFja1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSW5zdGFuY2VOdWxsPXRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYWxsUmVjaWV2ZUV2ZW50KF9ldmVudENvZGUsX3NlbmRlck5hbWUsX3NlbmRlcklELF9kYXRhKTtcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbnN0YW5jZU51bGw9ZmFsc2U7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlY2VpdmVFdmVudChfZXZlbnRDb2RlLF9zZW5kZXJOYW1lLF9zZW5kZXJJRCxfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBSZXN0YXJ0R2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIlNwbGFzaFwiKTtcclxuICAgICAgICB9LFxyXG4gICAgLy9jYWxsZWQgZXZlcnkgZnJhbWVcclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgdGhlcmUgaXMgc29tZSBjaGFuZ2UgaW4gY29ubmVjdGlvbiBzdGF0ZVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uU3RhdGVDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHN0YXRlXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25TdGF0ZUNoYW5nZT1mdW5jdGlvbihzdGF0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBDb25uZWN0aW9uIFN0YXRlc1xyXG4gICAgICAgICAgICAvL3N0YXRlIDEgOiBjb25uZWN0aW5nVG9OYW1lU2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgMiA6IENvbm5lY3RlZFRvTmFtZVNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDMgOiBDb25uZWN0aW5nVG9NYXN0ZXJTZXJ2ZXJcclxuICAgICAgICAgICAgLy9TdGF0ZSA0IDogQ29ubmVjdGVkVG9NYXN0ZXJTZXJ2ZXJcclxuICAgICAgICAgICAgLy9TdGF0ZSA1OiAgSm9pbmVkTG9iYnlcclxuICAgICAgICAgICAgLy9TdGF0ZSA2IDogQ29ubmVjdGluZ1RvR2FtZXNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDcgOiBDb25uZWN0ZWRUb0dhbWVzZXJ2ZXJcclxuICAgICAgICAgICAgLy9TdGF0ZSA4IDogSm9pbmVkXHJcbiAgICAgICAgICAgIC8vU3RhdGUgMTA6IERpc2Nvbm5lY3RlZCBcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICB2YXIgTEJDID0gUGhvdG9uLkxvYWRCYWxhbmNpbmcuTG9hZEJhbGFuY2luZ0NsaWVudDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdGF0ZUNvZGU6IFwiK3N0YXRlK1wiIFwiK0xCQy5TdGF0ZVRvTmFtZShzdGF0ZSkpO1xyXG5cclxuICAgICAgICAgICAgaWYoc3RhdGU9PTEpXHJcbiAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJjb25uZWN0aW5nIHRvIHNlcnZlci4uLlwiKTtcclxuICAgICAgICAgICAgZWxzZSBpZihzdGF0ZT09NClcclxuICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcImNvbm5lY3RlZCB0byBzZXJ2ZXJcIik7XHJcbiAgICAgICAgICAgIGVsc2UgaWYoc3RhdGU9PTUpIC8vaGFzIGpvaW5lZCBsb2JieVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihTaG93Um9vbT09ZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwid2FpdGluZyBmb3Igb3RoZXIgcGxheWVycy4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pblJhbmRvbVJvb20oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoU2hvd1Jvb209PXRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwic2hvd2luZyByb29tcyBsaXN0Li4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGRlYnVnXHJcbiAgICAgICAgICAgIEBtZXRob2QgZGVidWdcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5sb2dnZXIuZGVidWc9ZnVuY3Rpb24obWVzcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBpbmZvXHJcbiAgICAgICAgICAgIEBtZXRob2QgaW5mb1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW1cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5sb2dnZXIuaW5mbyA9IGZ1bmN0aW9uIChtZXNzLHBhcmFtKSB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2cobWVzcytwYXJhbSk7XHJcbiAgICAgICAgICAgc3RhdGVUZXh0Kz0gbWVzcytcIiBcIitwYXJhbStcIlxcblwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyB3YXJuXHJcbiAgICAgICAgICAgIEBtZXRob2Qgd2FyblxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0xXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTJcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtM1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci53YXJuID0gZnVuY3Rpb24gKG1lc3MscGFyYW0xLHBhcmFtMixwYXJhbTMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzcytcIiBcIitwYXJhbTErXCIgXCIrcGFyYW0yK1wiIFwiK3BhcmFtMyk7XHJcblxyXG4gICAgICAgICAgICBpZihwYXJhbTE9PTIyNSkgLy9ubyByb29tIGZvdW5kXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gcmFuZG9tIHJvb20gd2FzIGZvdW5kLCBjcmVhdGluZyBvbmVcIik7XHJcbiAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ3JlYXRlUm9vbSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihwYXJhbTE9PTIyNikgLy9yb29tIGRvZXMgbm90IGV4aXN0cyBvciBpcyBmdWxsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJSb29tIGlzIGZ1bGwsIHBsZWFzZSBzZWxlY3QgYW55IG90aGVyIHJvb20gdG8gc3BlY3RhdGUuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZXJyb3JcclxuICAgICAgICAgICAgQG1ldGhvZCBlcnJvclxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW1cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgICBQaG90b25SZWYubG9nZ2VyLmVycm9yID0gZnVuY3Rpb24gKG1lc3MscGFyYW0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGV4Y2VwdGlvblxyXG4gICAgICAgICAgICBAbWV0aG9kIGV4Y2VwdGlvblxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgIFBob3RvblJlZi5sb2dnZXIuZXhjZXB0aW9uID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgc29tZSBmb3JtYXRcclxuICAgICAgICAgICAgQG1ldGhvZCBmb3JtYXRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgICBQaG90b25SZWYubG9nZ2VyLmZvcm1hdCA9IGZ1bmN0aW9uIChtZXNzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBwbGF5ZXIgam9pbnMgbG9iYnlcclxuICAgICAgICAgICAgQG1ldGhvZCBvblJvb21MaXN0XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgIFBob3RvblJlZi5vblJvb21MaXN0ID0gZnVuY3Rpb24gKHJvb21zKSB7XHJcbiAgICAgICAgICAgIHN0YXRlVGV4dCs9XCJcXG5cIitcIlJvb21zIExpc3Q6XCIrXCJcXG5cIjtcclxuXHJcbiAgICAgICAgICAgIGlmKHJvb21zLmxlbmd0aD09MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhdGVUZXh0Kz1cIk5vIHJvb21zIGluIGxvYmJ5LlwiK1wiXFxuXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlJlc2V0Um9vbUxpc3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5VcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShyb29tc1tpXS5uYW1lLHJvb21zW2ldLnBsYXllckNvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJvb20gbmFtZTogXCIrcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVUZXh0Kz1cIlJvb206IFwiK3Jvb21zW2ldLm5hbWUrXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgdGhlcmUgaXMgY2hhbmdlIGluIHJvb21zIGxpc3QgKHJvb20gYWRkZWQsdXBkYXRlZCxyZW1vdmVkIGV0YylcclxuICAgICAgICAgICAgQG1ldGhvZCBvblJvb21MaXN0VXBkYXRlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNVcGRhdGVkXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc0FkZGVkXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1JlbW92ZWRcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vblJvb21MaXN0VXBkYXRlID0gZnVuY3Rpb24gKHJvb21zLCByb29tc1VwZGF0ZWQsIHJvb21zQWRkZWQsIHJvb21zUmVtb3ZlZCkge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlJlc2V0Um9vbUxpc3QoKTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUscm9vbXNbaV0ucGxheWVyQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSb29tIG5hbWU6IFwiK3Jvb21zW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGVUZXh0Kz1cIlJvb206IFwiK3Jvb21zW2ldLm5hbWUrXCJcXG5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJvb21zIExpc3QgdXBkYXRlZDogXCIgKyByb29tc1VwZGF0ZWQubGVuZ3RoICsgXCIgdXBkYXRlZCwgXCIgKyByb29tc0FkZGVkLmxlbmd0aCArIFwiIGFkZGVkLCBcIiArIHJvb21zUmVtb3ZlZC5sZW5ndGggKyBcIiByZW1vdmVkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBsb2NhbGx5IGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIGpvaW5zIHJvb21cclxuICAgICAgICAgICAgQG1ldGhvZCBvbkpvaW5Sb29tXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25Kb2luUm9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8jcmVnaW9uIExvZ3MgZm9yIGdhbWVcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIFwiICsgdGhpcy5teVJvb20oKS5uYW1lICsgXCIgam9pbmVkXCIpOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teUFjdG9yKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpWzBdLmxvYWRCYWxhbmNpbmdDbGllbnQudXNlcklkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpLl9jdXN0b21Qcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSk7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICBpZihQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdPT10cnVlKSAvL2NoZWNrIGlmIHBsYXllciB3aG8gam9pbmVkIGlzIHNwZWN0YXRlXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT10cnVlO1xyXG4gICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIix0cnVlLHRydWUsXCJHYW1lUGxheVwiKTt9LCAxMDAwKTsgLy9mdW5jdGlvbiBpbiBVSU1hbmFnZXJcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIHJlbW90ZWx5IGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIGpvaW5zIHJvb21cclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9ySm9pblxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkFjdG9ySm9pbiA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICAgICAgICBpZihQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpPT1NdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycykgLy93aGVuIG1heCBwbGF5ZXIgcmVxdWlyZWQgdG8gc3RhcnQgZ2FtZSBoYXMgYmVlbiBhZGRlZFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbCByZXF1aXJlZCBwbGF5ZXJzIGpvaW5lZCwgc3RhcnRpbmcgdGhlIGdhbWUuLlwiKVxyXG4gICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwicGxheWVycyBmb3VuZFwiKTtcclxuICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcbiAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT10cnVlO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7Y2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsdHJ1ZSx0cnVlLFwiR2FtZVBsYXlcIik7fSwgMTAwMCk7IC8vZnVuY3Rpb24gaW4gdWkgbWFuYWdlclxyXG4gICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKHRydWUsUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSxmYWxzZSxmYWxzZSxmYWxzZSxudWxsLGZhbHNlLDApO1xyXG4gICAgICAgICAgICAgICAgLy9QaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJcIixQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpLHRydWUpOyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgam9pbmVkXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVG90YWwgUGxheWVyczogXCIrUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgcmVtb3RlbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgbGVhdmVzIGEgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JMZWF2ZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkFjdG9yTGVhdmUgPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgICAgICAgaWYoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb209PXRydWUpXHJcbiAgICAgICAgICAgIHsgICBcclxuICAgICAgICAgICAgICAgIGlmKCFhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoIU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5MZWF2ZVJvb20pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYWN0b3IuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzcGVjdGF0b3IgbGVmdCwgc28gZG9udCBtaW5kLCBjb250IGdhbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgbGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBsZWZ0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuZ2V0U2NlbmVOYW1lKCk9PVwiR2FtZVBsYXlcIikgLy9pZiBzY2VuZSBpcyBnYW1lcGxheSBsZXQgcGxheWVyIGZpbmlzaCBnYW1lIGZvcmNlZnVsbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIm90aGVyIHBsYXllciBcIithY3Rvci5uYW1lK1wiIGhhcyBsZWZ0XCIsMjAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiU3BsYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIG93biBwcm9wZXJ0aWVzIGdvdCBjaGFuZ2VkXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvclByb3BlcnRpZXNDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25BY3RvclByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIHJvb20gcHJvcGVydGllcyBnb3QgY2hhbmdlZFxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uTXlSb29tUHJvcGVydGllc0NoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbk15Um9vbVByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHRvIGhhbmRsZSBlcnJvcnNcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvckNvZGVcclxuICAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1zZ1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3JDb2RlLCBlcnJvck1zZykge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBlcnJvckNvZGUgKyBcIjogXCIgKyBlcnJvck1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBhbiBldmVudCBpcyByZWNlaXZlZCB3aXRoIHNvbWUgZGF0YVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uRXZlbnRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvZGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvbnRlbnRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yTnJcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkV2ZW50ID0gZnVuY3Rpb24gKGNvZGUsIGNvbnRlbnQsIGFjdG9yTnIpIHtcclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTovL3JlY2V2aW5nIHBsYXllcmRhdGEgaW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgUGxheWVySW5mb0RhdGEgPSBjb250ZW50LlBsYXllckluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMSxzZW5kZXJOYW1lLHNlbmRlcklELFBsYXllckluZm9EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiAvL3N0YXJ0IHR1cm4gcmFpc2UgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHN0YXJ0IHR1cm4gZXZlbnRcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX1R1cm4gPSBjb250ZW50LlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMixzZW5kZXJOYW1lLHNlbmRlcklELF9UdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzogLy8gZGljZSBjb3VudFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGljZSBjb3VudFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGljZSA9IGNvbnRlbnQuRGljZUNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDMsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGljZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiAvL3JlY2VpbmcgdXNlciBpZCBvZiBwbGF5ZXIgd2hvIGhhcyBjb21wbGV0ZWQgdHVyblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIHR1cm4gY29tcGxldGVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9JRCA9IGNvbnRlbnQuVUlEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDQsc2VuZGVyTmFtZSxzZW5kZXJJRCxfSUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogLy9yZWNlaXZpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgY2FyZCBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9jYXJkID0gY29udGVudC5DYXJkRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDUsc2VuZGVyTmFtZSxzZW5kZXJJRCxfY2FyZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OiAvL3JlY2VpdmUgZ2FtZSBvdmVyIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGdhbWUgb3ZlciBjYWxsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNixzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IC8vcmVjZWl2ZSBvbmUgUXVlc3Rpb24gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgb25lIHF1ZXN0aW9uIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg3LHNlbmRlck5hbWUsc2VuZGVySUQsX2RhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgODogLy9yZWNlaXZlIG9uZSBRdWVzdGlvbiByZXNwb25zZSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBvbmUgcXVlc3RpbyByZXNwb25zZSBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoOCxzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDk6IC8vcmVjZWl2ZSBiYW5rcnVwdCBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBiYW5rcnVwdCBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoOSxzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEwOiAvL3JlY2VpdmUgYmFja3NwYWNlIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGJhY2tzcGFjZSBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTAsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgXHJcbiAgICAgfSxcclxuICAgICBcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cz1NdWx0aXBsYXllckNvbnRyb2xsZXI7Il19