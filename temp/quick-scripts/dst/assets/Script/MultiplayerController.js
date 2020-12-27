
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJSb29tUHJvcGVydHkiLCJjYyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJQbGF5ZXIiLCJ0eXBlIiwiSW50ZWdlciIsInNlcmlhbGl6YWJsZSIsIkluaXRpYWxTZXR1cCIsIkJvb2xlYW4iLCJQbGF5ZXJHYW1lSW5mbyIsIlRleHQiLCJUdXJuTnVtYmVyIiwiQXBwX0luZm8iLCJBcHBJRCIsInRvb2x0aXAiLCJBcHBWZXJzaW9uIiwiV3NzIiwiZGlzcGxheU5hbWUiLCJNYXN0ZXJTZXJ2ZXIiLCJGYkFwcElEIiwiTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiQ29tcG9uZW50IiwiUGhvdG9uQXBwSW5mbyIsIk1heFBsYXllcnMiLCJNYXhTcGVjdGF0b3JzIiwic3RhdGljcyIsIkluc3RhbmNlIiwib25Mb2FkIiwiSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJnYW1lIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIkluaXRpYWxpemVQaG90b24iLCJjb25zb2xlIiwibG9nIiwiQXBwSW5mbyIsIkRlbW9Mb2FkQmFsYW5jaW5nIiwiTGVhdmVSb29tIiwiUm9vbU5hbWUiLCJNZXNzYWdlIiwiSm9pbmVkUm9vbSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsImdldFNjZW5lTmFtZSIsInNjZW5lTmFtZSIsIl9zY2VuZUluZm9zIiwiaSIsImxlbmd0aCIsInV1aWQiLCJkaXJlY3RvciIsIl9zY2VuZSIsIl9pZCIsInVybCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibWF0Y2giLCJUb2dnbGVTaG93Um9vbV9Cb29sIiwiX3N0YXRlIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJnZXRQaG90b25SZWYiLCJQaG90b25BY3RvciIsIm15QWN0b3IiLCJSb29tQWN0b3JzIiwibXlSb29tQWN0b3JzQXJyYXkiLCJDaGVja1NwZWN0YXRlIiwiY3VzdG9tUHJvcGVydGllcyIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIkFwcElkIiwiRmJBcHBJZCIsIlJlcXVlc3RDb25uZWN0aW9uIiwic3RhdGUiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5Iiwic3RhcnQiLCJEaXNjb25uZWN0UGhvdG9uIiwiaXNKb2luZWRUb1Jvb20iLCJkaXNjb25uZWN0IiwiUmVzZXRTdGF0ZSIsIk9uUm9vbU5hbWVDaGFuZ2UiLCJPbk1lc3NhZ2VDaGFuZ2UiLCJtc2ciLCJVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyIsIl9wbGF5ZXJVcGRhdGUiLCJfcGxheWVyVmFsdWUiLCJfaW5pdGlhbFNldHVwVXBkYXRlIiwiX2luaXRpYWxTZXR1cFZhbHVlIiwiX3BsYXllckdhbWVJbmZvVXBkYXRlIiwiX3BsYXllckdhbWVJbmZvVmFsdWUiLCJfdHVybk51bWJlclVwZGF0ZSIsIl90dXJuTnVtYmVydmFsdWUiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNyZWF0ZVJvb20iLCJfZGF0YSIsInJvb21PcHRpb25zIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU3R1ZGVudERhdGEiLCJzZXRVc2VySWQiLCJ1c2VySUQiLCJSb29tSUQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJEYXRlIiwibm93IiwiY3JlYXRlUm9vbSIsIkpvaW5Sb29tIiwiX3Jvb21OYW1lIiwiam9pblJvb20iLCJKb2luUmFuZG9tUm9vbSIsImpvaW5SYW5kb21Sb29tIiwiU2VuZENhcmREYXRhIiwicmFpc2VFdmVudCIsIkNhcmREYXRhIiwic2VuZGVyTmFtZSIsInNlbmRlcklEIiwiYWN0b3JOciIsInJlY2VpdmVycyIsIlBob3RvbiIsIkxvYWRCYWxhbmNpbmciLCJDb25zdGFudHMiLCJSZWNlaXZlckdyb3VwIiwiQWxsIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwiU2VuZEdhbWVPdmVyIiwiRGF0YSIsIlNlbmREYXRhIiwiUGxheWVySW5mbyIsIlNlbmRPbmVRdWVzdGlvbkRhdGEiLCJTZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGEiLCJPdGhlcnMiLCJEaWNlUm9sbEV2ZW50IiwiRGljZUNvdW50IiwiU3luY1R1cm5Db21wbGV0aW9uIiwiVUlEIiwiU3RhcnRUdXJuIiwiU2hvd1RvYXN0IiwiQ2FsbFJlY2lldmVFdmVudCIsIl9ldmVudENvZGUiLCJfc2VuZGVyTmFtZSIsIl9zZW5kZXJJRCIsIkluc3RhbmNlTnVsbCIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwic2V0VGltZW91dCIsIlJlY2VpdmVFdmVudCIsIlJlc3RhcnRHYW1lIiwibG9hZFNjZW5lIiwidXBkYXRlIiwiZHQiLCJvblN0YXRlQ2hhbmdlIiwiTEJDIiwiTG9hZEJhbGFuY2luZ0NsaWVudCIsIlN0YXRlVG9OYW1lIiwic3lzdGVtRXZlbnQiLCJlbWl0IiwiR2V0X1VJTWFuYWdlciIsIlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSSIsIlRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSSIsImxvZ2dlciIsImRlYnVnIiwibWVzcyIsImluZm8iLCJwYXJhbSIsIndhcm4iLCJwYXJhbTEiLCJwYXJhbTIiLCJwYXJhbTMiLCJUb2dnbGVMb2FkaW5nTm9kZSIsImV4Y2VwdGlvbiIsImZvcm1hdCIsIm9uUm9vbUxpc3QiLCJyb29tcyIsIlJlc2V0Um9vbUxpc3QiLCJVcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSSIsInBsYXllckNvdW50Iiwib25Sb29tTGlzdFVwZGF0ZSIsInJvb21zVXBkYXRlZCIsInJvb21zQWRkZWQiLCJyb29tc1JlbW92ZWQiLCJvbkpvaW5Sb29tIiwibG9hZEJhbGFuY2luZ0NsaWVudCIsInVzZXJJZCIsIl9jdXN0b21Qcm9wZXJ0aWVzIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJvbkFjdG9ySm9pbiIsImFjdG9yIiwibXlSb29tQWN0b3JDb3VudCIsIm9uQWN0b3JMZWF2ZSIsIlBsYXllclNlc3Npb25EYXRhIiwiR2FtZU92ZXIiLCJHZXRfR2FtZU1hbmFnZXIiLCJDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyIiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsIm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlIiwib25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlIiwib25FcnJvciIsImVycm9yQ29kZSIsImVycm9yTXNnIiwib25FdmVudCIsImNvZGUiLCJjb250ZW50IiwiUGxheWVySW5mb0RhdGEiLCJfVHVybiIsIl9kaWNlIiwiX0lEIiwiX2NhcmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsU0FBSjtBQUNBLElBQUlDLFNBQVMsR0FBQyxFQUFkO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUMsSUFBN0I7QUFDQSxJQUFJQyxRQUFRLEdBQUMsS0FBYixFQUVBOztBQUNBLElBQUlDLFlBQVksR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBQyxjQURpQjtBQUV0QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLENBREw7QUFFSkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLE9BRkw7QUFHSkMsTUFBQUEsWUFBWSxFQUFFO0FBSFYsS0FEQTtBQU1SQyxJQUFBQSxZQUFZLEVBQUU7QUFDVixpQkFBUyxLQURDO0FBRVZILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUyxPQUZDO0FBR1ZGLE1BQUFBLFlBQVksRUFBRTtBQUhKLEtBTk47QUFXUkcsSUFBQUEsY0FBYyxFQUFFO0FBQ1osaUJBQVMsRUFERztBQUVaTCxN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RytHLE9BQU8sQ0FBQzVFLElBQXBCO0FBQ0EsY0FBSWIsVUFBVSxHQUFHeUYsT0FBTyxDQUFDekYsVUFBekI7QUFDQSxjQUFJQyxRQUFRLEdBQUd3RixPQUFPLENBQUN4RixRQUF2QjtBQUVBbkcsVUFBQUEscUJBQXFCLENBQUNNLFFBQXRCLENBQStCcUgsZ0JBQS9CLENBQWdELENBQWhELEVBQWtEekIsVUFBbEQsRUFBNkRDLFFBQTdELEVBQXNFdkIsS0FBdEU7QUFFQTs7QUFDSjtBQXpFSjtBQTJFSCxLQTdFRDtBQThFRjtBQXAvQjZCLENBQVQsQ0FBMUI7QUF3L0JBcUgsTUFBTSxDQUFDQyxPQUFQLEdBQWVsTSxxQkFBZiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9HbG9iYWwgVmFyaWFibGVzXHJcbnZhciBQaG90b25SZWY7XHJcbnZhciBzdGF0ZVRleHQ9XCJcIjtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgU2hvd1Jvb209ZmFsc2U7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGRhdGEgcmVsYXRlZCB0byBSb29tUHJvcGVydHktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUm9vbVByb3BlcnR5PWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJSb29tUHJvcGVydHlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBQbGF5ZXI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBJbml0aWFsU2V0dXA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgUGxheWVyR2FtZUluZm86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBUdXJuTnVtYmVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGRhdGEgcmVsYXRlZCB0byBBcHBfSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBBcHBfSW5mbz1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiQXBwX0luZm9cIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBBcHBJRDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIkFwcCBpZCBmb3JtIHBob3RvbiBkYXNoYm9hcmRcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQXBwVmVyc2lvbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIkFwcCB2ZXJzaW9uIGZvciBwaG90b25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgV3NzOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiSXNTZWN1cmVcIixcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiSWYgcGhvdG9uIHNob3VsZCB1c2Ugc2VjdXJlIGFuZCByZWxpYWJsZSBwcm90b2NvbHNcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTWFzdGVyU2VydmVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwibWFzdGVyIHNlcnZlciBmb3IgcGhvdG9uIHRvIGNvbm5lY3RcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRmJBcHBJRDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIkZCIGFwcCBpZCB1c2VkIGZvciBGQiBhdXRoZXJpemF0aW9uXCJcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIE11bHRpcGxheWVyQ29udHJvbGxlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgTXVsdGlwbGF5ZXJDb250cm9sbGVyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJNdWx0aXBsYXllckNvbnRyb2xsZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBQaG90b25BcHBJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogQXBwX0luZm8sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgICAgIE1heFBsYXllcnM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSwgXHJcbiAgICAgICAgTWF4U3BlY3RhdG9yczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LCBcclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczogeyAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgICAgICBJbnN0YW5jZTogbnVsbCxcclxuICAgIH0sXHJcblxyXG4gICAgLy90aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3MgaXMgY3JlYXRlZFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLkluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgSW5pdGlhbGl6ZSBzb21lIGVzc2VudGFpbHMgZGF0YSBmb3IgbXVsdGlwbGF5ZXIgY29udHJvbGxlciBjbGFzc1xyXG4gICAgQG1ldGhvZCBJbml0X011bHRpcGxheWVyQ29udHJvbGxlclxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBJbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pdGlhbGl6ZVBob3RvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhBcHBJbmZvKTtcclxuICAgICAgICAgICAgUGhvdG9uUmVmID0gbmV3IERlbW9Mb2FkQmFsYW5jaW5nKCk7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5MZWF2ZVJvb209ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb29tTmFtZT1cIlwiO1xyXG4gICAgICAgIHRoaXMuTWVzc2FnZT1cIlwiO1xyXG4gICAgICAgIFNob3dSb29tPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNoZWNrIHJlZmVyZW5jZSB0byBzb21lIHZhcmlhYmxlcyBhbmQgY2xhc3Nlc1xyXG4gICAgQG1ldGhvZCBDaGVja1JlZmVyZW5jZXNcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgfSxcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmVtb3ZlIHBlcnNpc3Qgbm9kZSB3aGVuIHdhbnQgdG8gcmVzdGFydCBzY2VuZVxyXG4gICAgQG1ldGhvZCBSZW1vdmVQZXJzaXN0Tm9kZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBSZW1vdmVQZXJzaXN0Tm9kZSgpXHJcbiAgICB7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlPW51bGw7XHJcbiAgICAgICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBnZXQgbmFtZSBvZiBjdXJyZW50IG9wZW5lZCBzY2VuZVxyXG4gICAgQG1ldGhvZCBnZXRTY2VuZU5hbWVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7c3RyaW5nfSBzY2VuZU5hbWVcclxuICAgICoqLyBcclxuICAgIGdldFNjZW5lTmFtZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNjZW5lTmFtZTtcclxuICAgICAgICB2YXIgX3NjZW5lSW5mb3MgPSBjYy5nYW1lLl9zY2VuZUluZm9zO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3NjZW5lSW5mb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoX3NjZW5lSW5mb3NbaV0udXVpZCA9PSBjYy5kaXJlY3Rvci5fc2NlbmUuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSBfc2NlbmVJbmZvc1tpXS51cmw7XHJcbiAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSBzY2VuZU5hbWUuc3Vic3RyaW5nKHNjZW5lTmFtZS5sYXN0SW5kZXhPZignLycpKzEpLm1hdGNoKC9bXlxcLl0rLylbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NlbmVOYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIHNldCBcIlNob3dSb29tXCIgYm9vbCB2YWx1ZVxyXG4gICAgQG1ldGhvZCBUb2dnbGVTaG93Um9vbV9Cb29sXHJcbiAgICBAcGFyYW0ge2Jvb2xlYW59IF9zdGF0ZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAqKi8gXHJcbiAgICBUb2dnbGVTaG93Um9vbV9Cb29sKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBTaG93Um9vbT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gc2V0IFwiTGVhdmVSb29tXCIgYm9vbCB2YWx1ZVxyXG4gICAgQG1ldGhvZCBUb2dnbGVMZWF2ZVJvb21fQm9vbFxyXG4gICAgQHBhcmFtIHtib29sZWFufSBfc3RhdGVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgKiovIFxyXG4gICAgVG9nZ2xlTGVhdmVSb29tX0Jvb2woX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTGVhdmVSb29tPV9zdGF0ZTtcclxuICAgIH0sXHJcbiAgICAgXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgUGhvdG9uIFwiUGhvdG9uUmVmXCIgaW5zdGFuY2UgY3JlYXRlZCBieSBtdWx0aXBsYXllciBjbGFzc1xyXG4gICAgQG1ldGhvZCBnZXRQaG90b25SZWZcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBQaG90b25SZWZcclxuICAgICoqLyBcclxuICAgIGdldFBob3RvblJlZigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBob3RvblJlZjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIG15QWN0b3IgaW5zdGFuY2UgY3JlYXRlZCBieSBwaG90b25cclxuICAgIEBtZXRob2QgUGhvdG9uQWN0b3JcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBBY3RvclxyXG4gICAgKiovIFxyXG4gICAgUGhvdG9uQWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQaG90b25SZWYubXlBY3RvcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgbXlSb29tQWN0b3JzQXJyYXkgY3JlYXRlZCBieSBwaG90b25cclxuICAgIEBtZXRob2QgUm9vbUFjdG9yc1xyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IEFjdG9yXHJcbiAgICAqKi8gXHJcbiAgICBSb29tQWN0b3JzKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBpc1NwZWN0YXRlIHZhcmlhYmxlIGZyb20gY3VzdG9tIHByb3BlcnR5IG9mIGN1cnJlbnQgYWN0b3JcclxuICAgIEBtZXRob2QgQ2hlY2tTcGVjdGF0ZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBpc1NwZWN0YXRlXHJcbiAgICAqKi8gXHJcbiAgICBDaGVja1NwZWN0YXRlKClcclxuICAgIHtcclxuICAgICAgICAgcmV0dXJuIFBob3RvblJlZi5teUFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBJbml0aWFsaXplIHBob3RvbiB3aXRoIGFwcGlkLGFwcCB2ZXJzaW9uLCBXc3MgZXRjXHJcbiAgICBAbWV0aG9kIEluaXRpYWxpemVQaG90b25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgSW5pdGlhbGl6ZVBob3RvbigpXHJcbiAgICB7XHJcbiAgICAgICAgQXBwSW5mby5BcHBJZD10aGlzLlBob3RvbkFwcEluZm8uQXBwSUQ7XHJcbiAgICAgICAgQXBwSW5mby5BcHBWZXJzaW9uPXRoaXMuUGhvdG9uQXBwSW5mby5BcHBWZXJzaW9uO1xyXG4gICAgICAgIEFwcEluZm8uV3NzPXRoaXMuUGhvdG9uQXBwSW5mby5Xc3M7XHJcbiAgICAgICAgQXBwSW5mby5NYXN0ZXJTZXJ2ZXI9dGhpcy5QaG90b25BcHBJbmZvLk1hc3RlclNlcnZlcjtcclxuICAgICAgICBBcHBJbmZvLkZiQXBwSWQ9dGhpcy5QaG90b25BcHBJbmZvLkZiQXBwSUQ7ICBcclxuICAgIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgY29ubmVjdGlvbiByZXF1ZXN0IHRvIHBob3RvblxyXG4gICAgQG1ldGhvZCBSZXF1ZXN0Q29ubmVjdGlvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBSZXF1ZXN0Q29ubmVjdGlvbiAoKSB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLnN0YXRlPT01IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCk9PXRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpPT10cnVlKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgY29ubmVjdGVkXCIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgUGhvdG9uUmVmLnN0YXJ0KCk7ICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IERpc2Nvbm5lY3QgZnJvbSBwaG90b25cclxuICAgIEBtZXRob2QgRGlzY29ubmVjdFBob3RvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBEaXNjb25uZWN0UGhvdG9uICgpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCk9PXRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpPT10cnVlICB8fFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICBQaG90b25SZWYuZGlzY29ubmVjdCgpOyAgIFxyXG4gICAgICAgIHRoaXMuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICAvL1Bob3RvblJlZi5sZWF2ZVJvb20oKTtcclxuICAgICAgICB0aGlzLlJlc2V0U3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgaW5zaWRlIGFueSByb29tIG9yIGxvYmJ5IG9yIGNvbm5lY3RlZCB0byBwaG90b25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJlc2V0aW5nIGZldyB2YWx1ZXNcclxuICAgIEBtZXRob2QgUmVzZXRTdGF0ZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBSZXNldFN0YXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxlYXZlUm9vbT1mYWxzZTsgICAgXHJcbiAgICAgICAgdGhpcy5Kb2luZWRSb29tPWZhbHNlO1xyXG4gICAgICAgIFNob3dSb29tPWZhbHNlO1xyXG4gICAgICAgIHN0YXRlVGV4dD1cIlwiO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIHJvb20gbmFtZSBnb3QgaW5wdXQgZnJvbSBnYW1lXHJcbiAgICBAbWV0aG9kIE9uUm9vbU5hbWVDaGFuZ2VcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgT25Sb29tTmFtZUNoYW5nZShuYW1lKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUm9vbU5hbWU9bmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBtZXNzYWdlIHdpbmRvdyBnb3QgaW5wdXQgZnJvbSBnYW1lXHJcbiAgICBAbWV0aG9kIE9uTWVzc2FnZUNoYW5nZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG1zZ1xyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIE9uTWVzc2FnZUNoYW5nZShtc2cpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5NZXNzYWdlPW1zZztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSB1cGRhdGUgY3VzdG9tIHJvb20gcHJvcGVydGllc1xyXG4gICAgQG1ldGhvZCBVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlc1xyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKF9wbGF5ZXJVcGRhdGU9ZmFsc2UsX3BsYXllclZhbHVlPTAsX2luaXRpYWxTZXR1cFVwZGF0ZT1mYWxzZSxfaW5pdGlhbFNldHVwVmFsdWU9ZmFsc2UsX3BsYXllckdhbWVJbmZvVXBkYXRlPWZhbHNlLF9wbGF5ZXJHYW1lSW5mb1ZhbHVlPW51bGwsX3R1cm5OdW1iZXJVcGRhdGU9ZmFsc2UsX3R1cm5OdW1iZXJ2YWx1ZT0wKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9wbGF5ZXJVcGRhdGUpXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclwiLF9wbGF5ZXJWYWx1ZSx0cnVlKTtcclxuXHJcbiAgICAgICAgaWYoX2luaXRpYWxTZXR1cFVwZGF0ZSlcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIsX2luaXRpYWxTZXR1cFZhbHVlLHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKF9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSlcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIixfcGxheWVyR2FtZUluZm9WYWx1ZSx0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihfdHVybk51bWJlclVwZGF0ZSlcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLF90dXJuTnVtYmVydmFsdWUsdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY3JlYXRlIHJvb20gcmVxdWVzdFxyXG4gICAgQG1ldGhvZCBDcmVhdGVSb29tXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENyZWF0ZVJvb20gKCkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCk9PXRydWUgfHxQaG90b25SZWYuaXNJbkxvYmJ5KCk9PXRydWUgfHwgUGhvdG9uUmVmLnN0YXRlPT04KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PWZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhPW5ldyBSb29tUHJvcGVydHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBfZGF0YS5QbGF5ZXI9MDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvb21PcHRpb25zID17XHJcbiAgICAgICAgICAgICAgICAgICAgICBcImlzVmlzaWJsZVwiOnRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJpc09wZW5cIjp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJtYXhQbGF5ZXJzXCI6dGhpcy5NYXhQbGF5ZXJzK3RoaXMuTWF4U3BlY3RhdG9ycyxcclxuICAgICAgICAgICAgICAgICAgICAgIFwiY3VzdG9tR2FtZVByb3BlcnRpZXNcIjpfZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7SXNTcGVjdGF0ZTpmYWxzZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgUm9vbUlEPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERhdGUubm93KCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYuY3JlYXRlUm9vbShcIlJvb21fXCIrUm9vbUlELHJvb21PcHRpb25zKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIilcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGpvaW4gcm9vbSByZXF1ZXN0IGJ5IG5hbWVcclxuICAgIEBtZXRob2QgSm9pblJvb21cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBfcm9vbU5hbWVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBKb2luUm9vbSAoX3Jvb21OYW1lKSB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLnN0YXRlPT01IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCk9PXRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpPT10cnVlIHx8UGhvdG9uUmVmLnN0YXRlPT04KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PWZhbHNlIHx8IFBob3RvblJlZi5zdGF0ZSE9OClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvb21PcHRpb25zID17XHJcbiAgICAgICAgICAgICAgICAgICAgXCJpc1Zpc2libGVcIjp0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICBcImlzT3BlblwiOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWF4UGxheWVyc1wiOnRoaXMuTWF4UGxheWVycyt0aGlzLk1heFNwZWN0YXRvcnNcclxuICAgICAgICAgICAgICAgICAgICAvL1wiY3VzdG9tR2FtZVByb3BlcnRpZXNcIjp7XCJSb29tRXNzZW50aWFsc1wiOiB7SXNTcGVjdGF0ZTp0cnVlfX1cclxuICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWU9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwge0lzU3BlY3RhdGU6dHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBQaG90b25SZWYuam9pblJvb20oX3Jvb21OYW1lLHJvb21PcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgam9pbiByYW5kb20gcm9vbVxyXG4gICAgQG1ldGhvZCBKb2luUmFuZG9tUm9vbVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgSm9pblJhbmRvbVJvb20gKCkge1xyXG4gICAgaWYoUGhvdG9uUmVmLnN0YXRlPT01IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCk9PXRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpPT10cnVlIHx8UGhvdG9uUmVmLnN0YXRlPT04KVxyXG4gICAge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT1mYWxzZSB8fCBQaG90b25SZWYuc3RhdGUhPTgpXHJcbiAgICAgICAgeyAgXHJcbiAgICAgICAgICAgIHZhciBfZGF0YT1uZXcgUm9vbVByb3BlcnR5KCk7XHJcbiAgICAgICAgICAgIF9kYXRhLlBsYXllcj0wO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHJvb21PcHRpb25zID17XHJcbiAgICAgICAgICAgICAgICAvL1wiZXhwZWN0ZWRNYXhQbGF5ZXJzXCI6dGhpcy5NYXhQbGF5ZXJzK01heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICAgICAgICBcImV4cGVjdGVkQ3VzdG9tUm9vbVByb3BlcnRpZXNcIjpfZGF0YVxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHtJc1NwZWN0YXRlOmZhbHNlfSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5qb2luUmFuZG9tUm9vbShyb29tT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIilcclxuICAgIH1cclxuICAgICAgICBcclxufSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGNhcmQgaW5kZXggb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRDYXJkRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRDYXJkRGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBjYXJkIGRhdGFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoNSwgeyBDYXJkRGF0YTogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgZ2FtZSBvdmVyIGNhbGxcclxuICAgIEBtZXRob2QgU2VuZEdhbWVPdmVyXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZEdhbWVPdmVyIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGdhbWUgb3ZlciBjYWxsXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDYsIHsgRGF0YTogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIFBsYXllciBEYXRhIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmREYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBsYXllciBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDEsIHsgUGxheWVySW5mbzogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBvbmUgcXVlc3Rpb24gRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRPbmVRdWVzdGlvbkRhdGEgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIGRhdGFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoNywgeyBEYXRhOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIG9uZSBxdWVzdGlvbiByZXNwb25zZSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhIChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiByZXNwb25zZSBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDgsIHsgRGF0YTogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVyc30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBkaWNlIGRhdGFcclxuICAgIEBtZXRob2QgRGljZVJvbGxFdmVudFxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIERpY2VSb2xsRXZlbnQgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZGljZSBjb3VudFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgzLCB7IERpY2VDb3VudDogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCB1c2VyIGlkIG9mIHBsYXllciB0byBhbGwgb3RoZXIgd2hvIGhhZCBjb21wbGV0ZWQgdGhlaXIgdHVyblxyXG4gICAgQG1ldGhvZCBTeW5jVHVybkNvbXBsZXRpb25cclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFN5bmNUdXJuQ29tcGxldGlvbiAoX2RhdGEpIHtcclxuICAgICAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyB0dXJuIGNvbXBsZXRpb24gZGF0YVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCg0LCB7IFVJRDogX2RhdGEsIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxzZW5kZXJJRDpQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgfSx7cmVjZWl2ZXJzOlBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IFN0YXJ0IFR1cm4gZm9yIGluaXRpYWwgdHVyblxyXG4gICAgQG1ldGhvZCBTdGFydFR1cm5cclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFN0YXJ0VHVybiAoX2RhdGEpIHtcclxuICAgICAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RhcnRpbmcgVHVyblwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgyLCB7IFR1cm5OdW1iZXI6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gIFxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU2hvdyB0b2FzdCBtZXNzYWdlIG9uIHRoZSBjb25zb2xlXHJcbiAgICBAbWV0aG9kIFNob3dUb2FzdFxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgbWVzc2FnZSB0byBiZSBzaG93biBcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTaG93VG9hc3Q6ZnVuY3Rpb24obXNnKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidG9hc3QgbWVzc2FnZTogXCIrbXNnKTtcclxuICAgIH0sXHJcblxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgUmVjZWl2ZSBldmVudCBmcm9tIHBob3RvbiByYWlzZSBvbiBcclxuICAgIEBtZXRob2QgQ2FsbFJlY2lldmVFdmVudFxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENhbGxSZWNpZXZlRXZlbnQ6ZnVuY3Rpb24oX2V2ZW50Q29kZSxfc2VuZGVyTmFtZSxfc2VuZGVySUQsX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIEluc3RhbmNlTnVsbD10cnVlO1xyXG5cclxuICAgICAgICAvL3RvIGNoZWNrIGlmIGluc3RhbmNlIGlzIG51bGwgaW4gY2FzZSBjbGFzcyBpbnN0YW5jZSBpcyBub3QgbG9hZGVkIGFuZCBpdHMgcmVjZWl2ZXMgY2FsbGJhY2tcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEluc3RhbmNlTnVsbD10cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FsbFJlY2lldmVFdmVudChfZXZlbnRDb2RlLF9zZW5kZXJOYW1lLF9zZW5kZXJJRCxfZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSW5zdGFuY2VOdWxsPWZhbHNlO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSxfc2VuZGVyTmFtZSxfc2VuZGVySUQsX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUmVzdGFydEdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJTcGxhc2hcIik7XHJcbiAgICAgICAgfSxcclxuICAgIC8vY2FsbGVkIGV2ZXJ5IGZyYW1lXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHRoZXJlIGlzIHNvbWUgY2hhbmdlIGluIGNvbm5lY3Rpb24gc3RhdGVcclxuICAgICAgICAgICAgQG1ldGhvZCBvblN0YXRlQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uU3RhdGVDaGFuZ2U9ZnVuY3Rpb24oc3RhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gQ29ubmVjdGlvbiBTdGF0ZXNcclxuICAgICAgICAgICAgLy9zdGF0ZSAxIDogY29ubmVjdGluZ1RvTmFtZVNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDIgOiBDb25uZWN0ZWRUb05hbWVTZXJ2ZXJcclxuICAgICAgICAgICAgLy9TdGF0ZSAzIDogQ29ubmVjdGluZ1RvTWFzdGVyU2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgNCA6IENvbm5lY3RlZFRvTWFzdGVyU2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgNTogIEpvaW5lZExvYmJ5XHJcbiAgICAgICAgICAgIC8vU3RhdGUgNiA6IENvbm5lY3RpbmdUb0dhbWVzZXJ2ZXJcclxuICAgICAgICAgICAgLy9TdGF0ZSA3IDogQ29ubmVjdGVkVG9HYW1lc2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgOCA6IEpvaW5lZFxyXG4gICAgICAgICAgICAvL1N0YXRlIDEwOiBEaXNjb25uZWN0ZWQgXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgdmFyIExCQyA9IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkxvYWRCYWxhbmNpbmdDbGllbnQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RhdGVDb2RlOiBcIitzdGF0ZStcIiBcIitMQkMuU3RhdGVUb05hbWUoc3RhdGUpKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHN0YXRlPT0xKVxyXG4gICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwiY29ubmVjdGluZyB0byBzZXJ2ZXIuLi5cIik7XHJcbiAgICAgICAgICAgIGVsc2UgaWYoc3RhdGU9PTQpXHJcbiAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJjb25uZWN0ZWQgdG8gc2VydmVyXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHN0YXRlPT01KSAvL2hhcyBqb2luZWQgbG9iYnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoU2hvd1Jvb209PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcIndhaXRpbmcgZm9yIG90aGVyIHBsYXllcnMuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5SYW5kb21Sb29tKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKFNob3dSb29tPT10cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcInNob3dpbmcgcm9vbXMgbGlzdC4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBkZWJ1Z1xyXG4gICAgICAgICAgICBAbWV0aG9kIGRlYnVnXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYubG9nZ2VyLmRlYnVnPWZ1bmN0aW9uKG1lc3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgaW5mb1xyXG4gICAgICAgICAgICBAbWV0aG9kIGluZm9cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYubG9nZ2VyLmluZm8gPSBmdW5jdGlvbiAobWVzcyxwYXJhbSkge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3MrcGFyYW0pO1xyXG4gICAgICAgICAgIHN0YXRlVGV4dCs9IG1lc3MrXCIgXCIrcGFyYW0rXCJcXG5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgd2FyblxyXG4gICAgICAgICAgICBAbWV0aG9kIHdhcm5cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtMVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTNcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5sb2dnZXIud2FybiA9IGZ1bmN0aW9uIChtZXNzLHBhcmFtMSxwYXJhbTIscGFyYW0zKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3MrXCIgXCIrcGFyYW0xK1wiIFwiK3BhcmFtMitcIiBcIitwYXJhbTMpO1xyXG5cclxuICAgICAgICAgICAgaWYocGFyYW0xPT0yMjUpIC8vbm8gcm9vbSBmb3VuZFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIHJhbmRvbSByb29tIHdhcyBmb3VuZCwgY3JlYXRpbmcgb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNyZWF0ZVJvb20oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYocGFyYW0xPT0yMjYpIC8vcm9vbSBkb2VzIG5vdCBleGlzdHMgb3IgaXMgZnVsbFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUm9vbSBpcyBmdWxsLCBwbGVhc2Ugc2VsZWN0IGFueSBvdGhlciByb29tIHRvIHNwZWN0YXRlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGVycm9yXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXJyb3JcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5lcnJvciA9IGZ1bmN0aW9uIChtZXNzLHBhcmFtKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBleGNlcHRpb25cclxuICAgICAgICAgICAgQG1ldGhvZCBleGNlcHRpb25cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgICBQaG90b25SZWYubG9nZ2VyLmV4Y2VwdGlvbiA9IGZ1bmN0aW9uIChtZXNzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHNvbWUgZm9ybWF0XHJcbiAgICAgICAgICAgIEBtZXRob2QgZm9ybWF0XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5mb3JtYXQgPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgcGxheWVyIGpvaW5zIGxvYmJ5XHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Sb29tTGlzdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgICBQaG90b25SZWYub25Sb29tTGlzdCA9IGZ1bmN0aW9uIChyb29tcykge1xyXG4gICAgICAgICAgICBzdGF0ZVRleHQrPVwiXFxuXCIrXCJSb29tcyBMaXN0OlwiK1wiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICBpZihyb29tcy5sZW5ndGg9PTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlVGV4dCs9XCJObyByb29tcyBpbiBsb2JieS5cIitcIlxcblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5SZXNldFJvb21MaXN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb29tcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkocm9vbXNbaV0ubmFtZSxyb29tc1tpXS5wbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSb29tIG5hbWU6IFwiK3Jvb21zW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlVGV4dCs9XCJSb29tOiBcIityb29tc1tpXS5uYW1lK1wiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHRoZXJlIGlzIGNoYW5nZSBpbiByb29tcyBsaXN0IChyb29tIGFkZGVkLHVwZGF0ZWQscmVtb3ZlZCBldGMpXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Sb29tTGlzdFVwZGF0ZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zVXBkYXRlZFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNBZGRlZFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNSZW1vdmVkXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25Sb29tTGlzdFVwZGF0ZSA9IGZ1bmN0aW9uIChyb29tcywgcm9vbXNVcGRhdGVkLCByb29tc0FkZGVkLCByb29tc1JlbW92ZWQpIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5SZXNldFJvb21MaXN0KCk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb29tcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5VcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShyb29tc1tpXS5uYW1lLHJvb21zW2ldLnBsYXllckNvdW50KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbSBuYW1lOiBcIityb29tc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlVGV4dCs9XCJSb29tOiBcIityb29tc1tpXS5uYW1lK1wiXFxuXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSb29tcyBMaXN0IHVwZGF0ZWQ6IFwiICsgcm9vbXNVcGRhdGVkLmxlbmd0aCArIFwiIHVwZGF0ZWQsIFwiICsgcm9vbXNBZGRlZC5sZW5ndGggKyBcIiBhZGRlZCwgXCIgKyByb29tc1JlbW92ZWQubGVuZ3RoICsgXCIgcmVtb3ZlZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgbG9jYWxseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBqb2lucyByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Kb2luUm9vbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uSm9pblJvb20gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBMb2dzIGZvciBnYW1lXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBcIiArIHRoaXMubXlSb29tKCkubmFtZSArIFwiIGpvaW5lZFwiKTsgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlBY3RvcigpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKVswXS5sb2FkQmFsYW5jaW5nQ2xpZW50LnVzZXJJZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKS5fY3VzdG9tUHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0pO1xyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgaWYoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXT09dHJ1ZSkgLy9jaGVjayBpZiBwbGF5ZXIgd2hvIGpvaW5lZCBpcyBzcGVjdGF0ZVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb209dHJ1ZTtcclxuICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7Y2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsdHJ1ZSx0cnVlLFwiR2FtZVBsYXlcIik7fSwgMTAwMCk7IC8vZnVuY3Rpb24gaW4gVUlNYW5hZ2VyXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBqb2lucyByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckpvaW5cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25BY3RvckpvaW4gPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgICAgICAgaWYoUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKT09TXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMpIC8vd2hlbiBtYXggcGxheWVyIHJlcXVpcmVkIHRvIHN0YXJ0IGdhbWUgaGFzIGJlZW4gYWRkZWRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgcmVxdWlyZWQgcGxheWVycyBqb2luZWQsIHN0YXJ0aW5nIHRoZSBnYW1lLi5cIilcclxuICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb209dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge2NjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLHRydWUsdHJ1ZSxcIkdhbWVQbGF5XCIpO30sIDEwMDApOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyh0cnVlLFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksZmFsc2UsZmFsc2UsZmFsc2UsbnVsbCxmYWxzZSwwKTtcclxuICAgICAgICAgICAgICAgIC8vUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyXCIsUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSx0cnVlKTsgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGpvaW5lZFwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRvdGFsIFBsYXllcnM6IFwiK1Bob3RvblJlZi5teVJvb21BY3RvckNvdW50KCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIHJlbW90ZWx5IGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIGxlYXZlcyBhIHJvb21cclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9yTGVhdmVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25BY3RvckxlYXZlID0gZnVuY3Rpb24gKGFjdG9yKSB7XHJcbiAgICAgICAgICAgIGlmKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPT10cnVlKVxyXG4gICAgICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgICAgICBpZighYWN0b3IuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3ZlcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKCFNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTGVhdmVSb29tKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3BlY3RhdG9yIGxlZnQsIHNvIGRvbnQgbWluZCwgY29udCBnYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgbGVmdFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLmdldFNjZW5lTmFtZSgpPT1cIkdhbWVQbGF5XCIpIC8vaWYgc2NlbmUgaXMgZ2FtZXBsYXkgbGV0IHBsYXllciBmaW5pc2ggZ2FtZSBmb3JjZWZ1bGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJvdGhlciBwbGF5ZXIgXCIrYWN0b3IubmFtZStcIiBoYXMgbGVmdFwiLDIwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIlNwbGFzaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBvd24gcHJvcGVydGllcyBnb3QgY2hhbmdlZFxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlID0gZnVuY3Rpb24gKGFjdG9yKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciByb29tIHByb3BlcnRpZXMgZ290IGNoYW5nZWRcclxuICAgICAgICAgICAgQG1ldGhvZCBvbk15Um9vbVByb3BlcnRpZXNDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB0byBoYW5kbGUgZXJyb3JzXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25FcnJvclxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gZXJyb3JDb2RlXHJcbiAgICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gZXJyb3JNc2dcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkVycm9yID0gZnVuY3Rpb24gKGVycm9yQ29kZSwgZXJyb3JNc2cpIHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIFwiICsgZXJyb3JDb2RlICsgXCI6IFwiICsgZXJyb3JNc2cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgYW4gZXZlbnQgaXMgcmVjZWl2ZWQgd2l0aCBzb21lIGRhdGFcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkV2ZW50XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBjb2RlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBjb250ZW50XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3Rvck5yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25FdmVudCA9IGZ1bmN0aW9uIChjb2RlLCBjb250ZW50LCBhY3Rvck5yKSB7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICAgICAgc3dpdGNoIChjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6Ly9yZWNldmluZyBwbGF5ZXJkYXRhIGluZm9cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBsYXllciBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFBsYXllckluZm9EYXRhID0gY29udGVudC5QbGF5ZXJJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEsc2VuZGVyTmFtZSxzZW5kZXJJRCxQbGF5ZXJJbmZvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjogLy9zdGFydCB0dXJuIHJhaXNlIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBzdGFydCB0dXJuIGV2ZW50XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9UdXJuID0gY29udGVudC5UdXJuTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDIsc2VuZGVyTmFtZSxzZW5kZXJJRCxfVHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6IC8vIGRpY2UgY291bnRcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRpY2UgY291bnRcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RpY2UgPSBjb250ZW50LkRpY2VDb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgzLHNlbmRlck5hbWUsc2VuZGVySUQsX2RpY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogLy9yZWNlaW5nIHVzZXIgaWQgb2YgcGxheWVyIHdobyBoYXMgY29tcGxldGVkIHR1cm5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBsYXllciB0dXJuIGNvbXBsZXRlZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfSUQgPSBjb250ZW50LlVJRDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg0LHNlbmRlck5hbWUsc2VuZGVySUQsX0lEKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IC8vcmVjZWl2aW5nIGNhcmQgZGF0YSAoaW5kZXgpIHNvIG90aGVyIHVzZXJzIGNhbiBzeW5jIHRoZW1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGNhcmQgZGF0YVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfY2FyZCA9IGNvbnRlbnQuQ2FyZERhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg1LHNlbmRlck5hbWUsc2VuZGVySUQsX2NhcmQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjogLy9yZWNlaXZlIGdhbWUgb3ZlciBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBnYW1lIG92ZXIgY2FsbFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDYsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiAvL3JlY2VpdmUgb25lIFF1ZXN0aW9uIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIG9uZSBxdWVzdGlvbiBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNyxzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDg6IC8vcmVjZWl2ZSBvbmUgUXVlc3Rpb24gcmVzcG9uc2UgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgb25lIHF1ZXN0aW8gcmVzcG9uc2UgZGF0YVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDgsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgXHJcbiAgICAgfSxcclxuICAgICBcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cz1NdWx0aXBsYXllckNvbnRyb2xsZXI7Il19