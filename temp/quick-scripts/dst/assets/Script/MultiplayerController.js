
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJSb29tUHJvcGVydHkiLCJjYyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJQbGF5ZXIiLCJ0eXBlIiwiSW50ZWdlciIsInNlcmlhbGl6YWJsZSIsIkluaXRpYWxTZXR1cCIsIkJvb2xlYW4iLCJQbGF5ZXJHYW1lSW5mbyIsIlRleHQiLCJUdXJuTnVtYmVyIiwiQXBwX0luZm8iLCJBcHBJRCIsInRvb2x0aXAiLCJBcHBWZXJzaW9uIiwiV3NzIiwiZGlzcGxheU5hbWUiLCJNYXN0ZXJTZXJ2ZXIiLCJGYkFwcElEIiwiTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiQ29tcG9uZW50IiwiUGhvdG9uQXBwSW5mbyIsIk1heFBsYXllcnMiLCJNYXhTcGVjdGF0b3JzIiwic3RhdGljcyIsIkluc3RhbmNlIiwib25Mb2FkIiwiSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJnYW1lIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIkluaXRpYWxpemVQaG90b24iLCJjb25zb2xlIiwibG9nIiwiQXBwSW5mbyIsIkRlbW9Mb2FkQmFsYW5jaW5nIiwiTGVhdmVSb29tIiwiUm9vbU5hbWUiLCJNZXNzYWdlIiwiSm9pbmVkUm9vbSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsImdldFNjZW5lTmFtZSIsInNjZW5lTmFtZSIsIl9zY2VuZUluZm9zIiwiaSIsImxlbmd0aCIsInV1aWQiLCJkaXJlY3RvciIsIl9zY2VuZSIsIl9pZCIsInVybCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibWF0Y2giLCJUb2dnbGVTaG93Um9vbV9Cb29sIiwiX3N0YXRlIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJnZXRQaG90b25SZWYiLCJQaG90b25BY3RvciIsIm15QWN0b3IiLCJSb29tQWN0b3JzIiwibXlSb29tQWN0b3JzQXJyYXkiLCJDaGVja1NwZWN0YXRlIiwiY3VzdG9tUHJvcGVydGllcyIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIkFwcElkIiwiRmJBcHBJZCIsIlJlcXVlc3RDb25uZWN0aW9uIiwic3RhdGUiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5Iiwic3RhcnQiLCJEaXNjb25uZWN0UGhvdG9uIiwiaXNKb2luZWRUb1Jvb20iLCJkaXNjb25uZWN0IiwiUmVzZXRTdGF0ZSIsIk9uUm9vbU5hbWVDaGFuZ2UiLCJPbk1lc3NhZ2VDaGFuZ2UiLCJtc2ciLCJVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyIsIl9wbGF5ZXJVcGRhdGUiLCJfcGxheWVyVmFsdWUiLCJfaW5pdGlhbFNldHVwVXBkYXRlIiwiX2luaXRpYWxTZXR1cFZhbHVlIiwiX3BsYXllckdhbWVJbmZvVXBkYXRlIiwiX3BsYXllckdhbWVJbmZvVmFsdWUiLCJfdHVybk51bWJlclVwZGF0ZSIsIl90dXJuTnVtYmVydmFsdWUiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNyZWF0ZVJvb20iLCJfZGF0YSIsInJvb21PcHRpb25zIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU3R1ZGVudERhdGEiLCJzZXRVc2VySWQiLCJ1c2VySUQiLCJSb29tSUQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJEYXRlIiwibm93IiwiY3JlYXRlUm9vbSIsIkpvaW5Sb29tIiwiX3Jvb21OYW1lIiwiam9pblJvb20iLCJKb2luUmFuZG9tUm9vbSIsImpvaW5SYW5kb21Sb29tIiwiU2VuZENhcmREYXRhIiwicmFpc2VFdmVudCIsIkNhcmREYXRhIiwic2VuZGVyTmFtZSIsInNlbmRlcklEIiwiYWN0b3JOciIsInJlY2VpdmVycyIsIlBob3RvbiIsIkxvYWRCYWxhbmNpbmciLCJDb25zdGFudHMiLCJSZWNlaXZlckdyb3VwIiwiQWxsIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwiU2VuZEdhbWVPdmVyIiwiRGF0YSIsIlNlbmREYXRhIiwiUGxheWVySW5mbyIsIkRpY2VSb2xsRXZlbnQiLCJEaWNlQ291bnQiLCJTeW5jVHVybkNvbXBsZXRpb24iLCJVSUQiLCJTdGFydFR1cm4iLCJTaG93VG9hc3QiLCJDYWxsUmVjaWV2ZUV2ZW50IiwiX2V2ZW50Q29kZSIsIl9zZW5kZXJOYW1lIiwiX3NlbmRlcklEIiwiSW5zdGFuY2VOdWxsIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJzZXRUaW1lb3V0IiwiUmVjZWl2ZUV2ZW50IiwiUmVzdGFydEdhbWUiLCJsb2FkU2NlbmUiLCJ1cGRhdGUiLCJkdCIsIm9uU3RhdGVDaGFuZ2UiLCJMQkMiLCJMb2FkQmFsYW5jaW5nQ2xpZW50IiwiU3RhdGVUb05hbWUiLCJzeXN0ZW1FdmVudCIsImVtaXQiLCJHZXRfVUlNYW5hZ2VyIiwiVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJIiwiVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJIiwibG9nZ2VyIiwiZGVidWciLCJtZXNzIiwiaW5mbyIsInBhcmFtIiwid2FybiIsInBhcmFtMSIsInBhcmFtMiIsInBhcmFtMyIsIlRvZ2dsZUxvYWRpbmdOb2RlIiwiZXhjZXB0aW9uIiwiZm9ybWF0Iiwib25Sb29tTGlzdCIsInJvb21zIiwiUmVzZXRSb29tTGlzdCIsIlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJIiwicGxheWVyQ291bnQiLCJvblJvb21MaXN0VXBkYXRlIiwicm9vbXNVcGRhdGVkIiwicm9vbXNBZGRlZCIsInJvb21zUmVtb3ZlZCIsIm9uSm9pblJvb20iLCJsb2FkQmFsYW5jaW5nQ2xpZW50IiwidXNlcklkIiwiX2N1c3RvbVByb3BlcnRpZXMiLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIm9uQWN0b3JKb2luIiwiYWN0b3IiLCJteVJvb21BY3RvckNvdW50Iiwib25BY3RvckxlYXZlIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJHYW1lT3ZlciIsIkdldF9HYW1lTWFuYWdlciIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJvbkFjdG9yUHJvcGVydGllc0NoYW5nZSIsIm9uTXlSb29tUHJvcGVydGllc0NoYW5nZSIsIm9uRXJyb3IiLCJlcnJvckNvZGUiLCJlcnJvck1zZyIsIm9uRXZlbnQiLCJjb2RlIiwiY29udGVudCIsIlBsYXllckluZm9EYXRhIiwiX1R1cm4iLCJfZGljZSIsIl9JRCIsIl9jYXJkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUlBLFNBQUo7QUFDQSxJQUFJQyxTQUFTLEdBQUMsRUFBZDtBQUNBLElBQUlDLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsUUFBUSxHQUFDLEtBQWIsRUFFQTs7QUFDQSxJQUFJQyxZQUFZLEdBQUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUMsY0FEaUI7QUFFdEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxDQURMO0FBRUpDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxPQUZMO0FBR0pDLE1BQUFBLFlBQVksRUFBRTtBQUhWLEtBREE7QUFNUkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsS0FEQztBQUVWSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1MsT0FGQztBQUdWRixNQUFBQSxZQUFZLEVBQUU7QUFISixLQU5OO0FBV1JHLElBQUFBLGNBQWMsRUFBRTtBQUNaLGlCQUFTLEVBREc7QUFFWkwsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNXLElBRkc7QUFHWkosTUFBQUEsWUFBWSxFQUFFO0FBSEYsS0FYUjtBQWdCUkssSUFBQUEsVUFBVSxF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S0EzREQ7QUE0REY7QUFqN0I2QixDQUFULENBQTFCO0FBcTdCQWlILE1BQU0sQ0FBQ0MsT0FBUCxHQUFlOUwscUJBQWYiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vR2xvYmFsIFZhcmlhYmxlc1xyXG52YXIgUGhvdG9uUmVmO1xyXG52YXIgc3RhdGVUZXh0PVwiXCI7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFNob3dSb29tPWZhbHNlO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gUm9vbVByb3BlcnR5LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvb21Qcm9wZXJ0eT1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUm9vbVByb3BlcnR5XCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUGxheWVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSW5pdGlhbFNldHVwOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgVHVybk51bWJlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gQXBwX0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQXBwX0luZm89Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkFwcF9JbmZvXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgQXBwSUQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJBcHAgaWQgZm9ybSBwaG90b24gZGFzaGJvYXJkXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEFwcFZlcnNpb246IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJBcHAgdmVyc2lvbiBmb3IgcGhvdG9uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFdzczoge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIklzU2VjdXJlXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIklmIHBob3RvbiBzaG91bGQgdXNlIHNlY3VyZSBhbmQgcmVsaWFibGUgcHJvdG9jb2xzXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIE1hc3RlclNlcnZlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIm1hc3RlciBzZXJ2ZXIgZm9yIHBob3RvbiB0byBjb25uZWN0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEZiQXBwSUQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJcIiwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJGQiBhcHAgaWQgdXNlZCBmb3IgRkIgYXV0aGVyaXphdGlvblwiXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGRhdGEgcmVsYXRlZCB0byBNdWx0aXBsYXllckNvbnRyb2xsZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE11bHRpcGxheWVyQ29udHJvbGxlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiTXVsdGlwbGF5ZXJDb250cm9sbGVyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUGhvdG9uQXBwSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEFwcF9JbmZvLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICAgICBNYXhQbGF5ZXJzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sIFxyXG4gICAgICAgIE1heFNwZWN0YXRvcnM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCwgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSwgXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHsgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICAgICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIGNyZWF0ZWRcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5Jbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IEluaXRpYWxpemUgc29tZSBlc3NlbnRhaWxzIGRhdGEgZm9yIG11bHRpcGxheWVyIGNvbnRyb2xsZXIgY2xhc3NcclxuICAgIEBtZXRob2QgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXJcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLkluaXRpYWxpemVQaG90b24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coQXBwSW5mbyk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZiA9IG5ldyBEZW1vTG9hZEJhbGFuY2luZygpO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuTGVhdmVSb29tPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9vbU5hbWU9XCJcIjtcclxuICAgICAgICB0aGlzLk1lc3NhZ2U9XCJcIjtcclxuICAgICAgICBTaG93Um9vbT1mYWxzZTtcclxuICAgICAgICB0aGlzLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjaGVjayByZWZlcmVuY2UgdG8gc29tZSB2YXJpYWJsZXMgYW5kIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgIH0sXHJcblxyXG4gICAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJlbW92ZSBwZXJzaXN0IG5vZGUgd2hlbiB3YW50IHRvIHJlc3RhcnQgc2NlbmVcclxuICAgIEBtZXRob2QgUmVtb3ZlUGVyc2lzdE5vZGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZT1udWxsO1xyXG4gICAgICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gZ2V0IG5hbWUgb2YgY3VycmVudCBvcGVuZWQgc2NlbmVcclxuICAgIEBtZXRob2QgZ2V0U2NlbmVOYW1lXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge3N0cmluZ30gc2NlbmVOYW1lXHJcbiAgICAqKi8gXHJcbiAgICBnZXRTY2VuZU5hbWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzY2VuZU5hbWU7XHJcbiAgICAgICAgdmFyIF9zY2VuZUluZm9zID0gY2MuZ2FtZS5fc2NlbmVJbmZvcztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9zY2VuZUluZm9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKF9zY2VuZUluZm9zW2ldLnV1aWQgPT0gY2MuZGlyZWN0b3IuX3NjZW5lLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gX3NjZW5lSW5mb3NbaV0udXJsO1xyXG4gICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gc2NlbmVOYW1lLnN1YnN0cmluZyhzY2VuZU5hbWUubGFzdEluZGV4T2YoJy8nKSsxKS5tYXRjaCgvW15cXC5dKy8pWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjZW5lTmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBzZXQgXCJTaG93Um9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlU2hvd1Jvb21fQm9vbFxyXG4gICAgQHBhcmFtIHtib29sZWFufSBfc3RhdGVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgKiovIFxyXG4gICAgVG9nZ2xlU2hvd1Jvb21fQm9vbChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgU2hvd1Jvb209X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIHNldCBcIkxlYXZlUm9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlTGVhdmVSb29tX0Jvb2xcclxuICAgIEBwYXJhbSB7Ym9vbGVhbn0gX3N0YXRlXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICoqLyBcclxuICAgIFRvZ2dsZUxlYXZlUm9vbV9Cb29sKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxlYXZlUm9vbT1fc3RhdGU7XHJcbiAgICB9LFxyXG4gICAgIFxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIFBob3RvbiBcIlBob3RvblJlZlwiIGluc3RhbmNlIGNyZWF0ZWQgYnkgbXVsdGlwbGF5ZXIgY2xhc3NcclxuICAgIEBtZXRob2QgZ2V0UGhvdG9uUmVmXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gUGhvdG9uUmVmXHJcbiAgICAqKi8gXHJcbiAgICBnZXRQaG90b25SZWYoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBQaG90b25SZWY7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBteUFjdG9yIGluc3RhbmNlIGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFBob3RvbkFjdG9yXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gQWN0b3JcclxuICAgICoqLyBcclxuICAgIFBob3RvbkFjdG9yKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gUGhvdG9uUmVmLm15QWN0b3IoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIG15Um9vbUFjdG9yc0FycmF5IGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFJvb21BY3RvcnNcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBBY3RvclxyXG4gICAgKiovIFxyXG4gICAgUm9vbUFjdG9ycygpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgaXNTcGVjdGF0ZSB2YXJpYWJsZSBmcm9tIGN1c3RvbSBwcm9wZXJ0eSBvZiBjdXJyZW50IGFjdG9yXHJcbiAgICBAbWV0aG9kIENoZWNrU3BlY3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gaXNTcGVjdGF0ZVxyXG4gICAgKiovIFxyXG4gICAgQ2hlY2tTcGVjdGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgIHJldHVybiBQaG90b25SZWYubXlBY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgSW5pdGlhbGl6ZSBwaG90b24gd2l0aCBhcHBpZCxhcHAgdmVyc2lvbiwgV3NzIGV0Y1xyXG4gICAgQG1ldGhvZCBJbml0aWFsaXplUGhvdG9uXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEluaXRpYWxpemVQaG90b24oKVxyXG4gICAge1xyXG4gICAgICAgIEFwcEluZm8uQXBwSWQ9dGhpcy5QaG90b25BcHBJbmZvLkFwcElEO1xyXG4gICAgICAgIEFwcEluZm8uQXBwVmVyc2lvbj10aGlzLlBob3RvbkFwcEluZm8uQXBwVmVyc2lvbjtcclxuICAgICAgICBBcHBJbmZvLldzcz10aGlzLlBob3RvbkFwcEluZm8uV3NzO1xyXG4gICAgICAgIEFwcEluZm8uTWFzdGVyU2VydmVyPXRoaXMuUGhvdG9uQXBwSW5mby5NYXN0ZXJTZXJ2ZXI7XHJcbiAgICAgICAgQXBwSW5mby5GYkFwcElkPXRoaXMuUGhvdG9uQXBwSW5mby5GYkFwcElEOyAgXHJcbiAgICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGNvbm5lY3Rpb24gcmVxdWVzdCB0byBwaG90b25cclxuICAgIEBtZXRob2QgUmVxdWVzdENvbm5lY3Rpb25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgUmVxdWVzdENvbm5lY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5zdGF0ZT09NSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGNvbm5lY3RlZFwiKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5zdGFydCgpOyAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBEaXNjb25uZWN0IGZyb20gcGhvdG9uXHJcbiAgICBAbWV0aG9kIERpc2Nvbm5lY3RQaG90b25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgRGlzY29ubmVjdFBob3RvbiAoKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSAgfHxQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgUGhvdG9uUmVmLmRpc2Nvbm5lY3QoKTsgICBcclxuICAgICAgICB0aGlzLkpvaW5lZFJvb209ZmFsc2U7XHJcbiAgICAgICAgLy9QaG90b25SZWYubGVhdmVSb29tKCk7XHJcbiAgICAgICAgdGhpcy5SZXNldFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGluc2lkZSBhbnkgcm9vbSBvciBsb2JieSBvciBjb25uZWN0ZWQgdG8gcGhvdG9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXNldGluZyBmZXcgdmFsdWVzXHJcbiAgICBAbWV0aG9kIFJlc2V0U3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgUmVzZXRTdGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5MZWF2ZVJvb209ZmFsc2U7ICAgIFxyXG4gICAgICAgIHRoaXMuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICBTaG93Um9vbT1mYWxzZTtcclxuICAgICAgICBzdGF0ZVRleHQ9XCJcIjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiByb29tIG5hbWUgZ290IGlucHV0IGZyb20gZ2FtZVxyXG4gICAgQG1ldGhvZCBPblJvb21OYW1lQ2hhbmdlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIE9uUm9vbU5hbWVDaGFuZ2UobmFtZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlJvb21OYW1lPW5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gbWVzc2FnZSB3aW5kb3cgZ290IGlucHV0IGZyb20gZ2FtZVxyXG4gICAgQG1ldGhvZCBPbk1lc3NhZ2VDaGFuZ2VcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBtc2dcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBPbk1lc3NhZ2VDaGFuZ2UobXNnKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTWVzc2FnZT1tc2c7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgdXBkYXRlIGN1c3RvbSByb29tIHByb3BlcnRpZXNcclxuICAgIEBtZXRob2QgVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXNcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyhfcGxheWVyVXBkYXRlPWZhbHNlLF9wbGF5ZXJWYWx1ZT0wLF9pbml0aWFsU2V0dXBVcGRhdGU9ZmFsc2UsX2luaXRpYWxTZXR1cFZhbHVlPWZhbHNlLF9wbGF5ZXJHYW1lSW5mb1VwZGF0ZT1mYWxzZSxfcGxheWVyR2FtZUluZm9WYWx1ZT1udWxsLF90dXJuTnVtYmVyVXBkYXRlPWZhbHNlLF90dXJuTnVtYmVydmFsdWU9MClcclxuICAgIHtcclxuICAgICAgICBpZihfcGxheWVyVXBkYXRlKVxyXG4gICAgICAgICAgICBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJcIixfcGxheWVyVmFsdWUsdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmKF9pbml0aWFsU2V0dXBVcGRhdGUpXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLF9pbml0aWFsU2V0dXBWYWx1ZSx0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihfcGxheWVyR2FtZUluZm9VcGRhdGUpXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsX3BsYXllckdhbWVJbmZvVmFsdWUsdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoX3R1cm5OdW1iZXJVcGRhdGUpXHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIixfdHVybk51bWJlcnZhbHVlLHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNyZWF0ZSByb29tIHJlcXVlc3RcclxuICAgIEBtZXRob2QgQ3JlYXRlUm9vbVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDcmVhdGVSb29tICgpIHtcclxuICAgICAgICBpZihQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8UGhvdG9uUmVmLmlzSW5Mb2JieSgpPT10cnVlIHx8IFBob3RvblJlZi5zdGF0ZT09OClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT1mYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGF0YT1uZXcgUm9vbVByb3BlcnR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGEuUGxheWVyPTA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb29tT3B0aW9ucyA9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgXCJpc1Zpc2libGVcIjp0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgIFwiaXNPcGVuXCI6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgIFwibWF4UGxheWVyc1wiOnRoaXMuTWF4UGxheWVycyt0aGlzLk1heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICBcImN1c3RvbUdhbWVQcm9wZXJ0aWVzXCI6X2RhdGFcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWU9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwge0lzU3BlY3RhdGU6ZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFJvb21JRD1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLmNyZWF0ZVJvb20oXCJSb29tX1wiK1Jvb21JRCxyb29tT3B0aW9ucyk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBqb2luIHJvb20gcmVxdWVzdCBieSBuYW1lXHJcbiAgICBAbWV0aG9kIEpvaW5Sb29tXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gX3Jvb21OYW1lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgSm9pblJvb20gKF9yb29tTmFtZSkge1xyXG4gICAgICAgIGlmKFBob3RvblJlZi5zdGF0ZT09NSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSB8fFBob3RvblJlZi5zdGF0ZT09OClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT1mYWxzZSB8fCBQaG90b25SZWYuc3RhdGUhPTgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByb29tT3B0aW9ucyA9e1xyXG4gICAgICAgICAgICAgICAgICAgIFwiaXNWaXNpYmxlXCI6dHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpc09wZW5cIjpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1heFBsYXllcnNcIjp0aGlzLk1heFBsYXllcnMrdGhpcy5NYXhTcGVjdGF0b3JzXHJcbiAgICAgICAgICAgICAgICAgICAgLy9cImN1c3RvbUdhbWVQcm9wZXJ0aWVzXCI6e1wiUm9vbUVzc2VudGlhbHNcIjoge0lzU3BlY3RhdGU6dHJ1ZX19XHJcbiAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHtJc1NwZWN0YXRlOnRydWV9KTtcclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLmpvaW5Sb29tKF9yb29tTmFtZSxyb29tT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGpvaW4gcmFuZG9tIHJvb21cclxuICAgIEBtZXRob2QgSm9pblJhbmRvbVJvb21cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIEpvaW5SYW5kb21Sb29tICgpIHtcclxuICAgIGlmKFBob3RvblJlZi5zdGF0ZT09NSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpPT10cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKT09dHJ1ZSB8fFBob3RvblJlZi5zdGF0ZT09OClcclxuICAgIHtcclxuICAgICAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09ZmFsc2UgfHwgUGhvdG9uUmVmLnN0YXRlIT04KVxyXG4gICAgICAgIHsgIFxyXG4gICAgICAgICAgICB2YXIgX2RhdGE9bmV3IFJvb21Qcm9wZXJ0eSgpO1xyXG4gICAgICAgICAgICBfZGF0YS5QbGF5ZXI9MDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByb29tT3B0aW9ucyA9e1xyXG4gICAgICAgICAgICAgICAgLy9cImV4cGVjdGVkTWF4UGxheWVyc1wiOnRoaXMuTWF4UGxheWVycytNYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgICAgICAgXCJleHBlY3RlZEN1c3RvbVJvb21Qcm9wZXJ0aWVzXCI6X2RhdGFcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7SXNTcGVjdGF0ZTpmYWxzZX0pO1xyXG4gICAgICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcblxyXG4gICAgICAgICAgICBQaG90b25SZWYuam9pblJhbmRvbVJvb20ocm9vbU9wdGlvbnMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpXHJcbiAgICB9XHJcbiAgICAgICAgXHJcbn0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBjYXJkIGluZGV4IG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kQ2FyZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kQ2FyZERhdGEgKF9kYXRhKSB7XHJcbiAgICBpZihQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKT09dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgY2FyZCBkYXRhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KDUsIHsgQ2FyZERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGdhbWUgb3ZlciBjYWxsXHJcbiAgICBAbWV0aG9kIFNlbmRHYW1lT3ZlclxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFNlbmRHYW1lT3ZlciAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBnYW1lIG92ZXIgY2FsbFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCg2LCB7IERhdGE6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBQbGF5ZXIgRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBTZW5kRGF0YSAoX2RhdGEpIHtcclxuICAgIGlmKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBwbGF5ZXIgZGF0YVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudCgxLCB7IFBsYXllckluZm86IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgZGljZSBkYXRhXHJcbiAgICBAbWV0aG9kIERpY2VSb2xsRXZlbnRcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBEaWNlUm9sbEV2ZW50IChfZGF0YSkge1xyXG4gICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGRpY2UgY291bnRcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoMywgeyBEaWNlQ291bnQ6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgdXNlciBpZCBvZiBwbGF5ZXIgdG8gYWxsIG90aGVyIHdobyBoYWQgY29tcGxldGVkIHRoZWlyIHR1cm5cclxuICAgIEBtZXRob2QgU3luY1R1cm5Db21wbGV0aW9uXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTeW5jVHVybkNvbXBsZXRpb24gKF9kYXRhKSB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgdHVybiBjb21wbGV0aW9uIGRhdGFcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoNCwgeyBVSUQ6IF9kYXRhLCBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsc2VuZGVySUQ6UGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yIH0se3JlY2VpdmVyczpQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGx9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBTdGFydCBUdXJuIGZvciBpbml0aWFsIHR1cm5cclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTdGFydFR1cm4gKF9kYXRhKSB7XHJcbiAgICAgICAgaWYoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXJ0aW5nIFR1cm5cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoMiwgeyBUdXJuTnVtYmVyOiBfZGF0YSwgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLHNlbmRlcklEOlBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciB9LHtyZWNlaXZlcnM6UGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICBcclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IFNob3cgdG9hc3QgbWVzc2FnZSBvbiB0aGUgY29uc29sZVxyXG4gICAgQG1ldGhvZCBTaG93VG9hc3RcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIG1lc3NhZ2UgdG8gYmUgc2hvd24gXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU2hvd1RvYXN0OmZ1bmN0aW9uKG1zZylcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRvYXN0IG1lc3NhZ2U6IFwiK21zZyk7XHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IFJlY2VpdmUgZXZlbnQgZnJvbSBwaG90b24gcmFpc2Ugb24gXHJcbiAgICBAbWV0aG9kIENhbGxSZWNpZXZlRXZlbnRcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDYWxsUmVjaWV2ZUV2ZW50OmZ1bmN0aW9uKF9ldmVudENvZGUsX3NlbmRlck5hbWUsX3NlbmRlcklELF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBJbnN0YW5jZU51bGw9dHJ1ZTtcclxuXHJcbiAgICAgICAgLy90byBjaGVjayBpZiBpbnN0YW5jZSBpcyBudWxsIGluIGNhc2UgY2xhc3MgaW5zdGFuY2UgaXMgbm90IGxvYWRlZCBhbmQgaXRzIHJlY2VpdmVzIGNhbGxiYWNrXHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCk9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbnN0YW5jZU51bGw9dHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbGxSZWNpZXZlRXZlbnQoX2V2ZW50Q29kZSxfc2VuZGVyTmFtZSxfc2VuZGVySUQsX2RhdGEpO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEluc3RhbmNlTnVsbD1mYWxzZTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsX3NlbmRlck5hbWUsX3NlbmRlcklELF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFJlc3RhcnRHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPWZhbHNlO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiU3BsYXNoXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAvL2NhbGxlZCBldmVyeSBmcmFtZVxyXG4gICAgdXBkYXRlIChkdCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBzb21lIGNoYW5nZSBpbiBjb25uZWN0aW9uIHN0YXRlXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25TdGF0ZUNoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gc3RhdGVcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vblN0YXRlQ2hhbmdlPWZ1bmN0aW9uKHN0YXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8jcmVnaW9uIENvbm5lY3Rpb24gU3RhdGVzXHJcbiAgICAgICAgICAgIC8vc3RhdGUgMSA6IGNvbm5lY3RpbmdUb05hbWVTZXJ2ZXJcclxuICAgICAgICAgICAgLy9TdGF0ZSAyIDogQ29ubmVjdGVkVG9OYW1lU2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgMyA6IENvbm5lY3RpbmdUb01hc3RlclNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDQgOiBDb25uZWN0ZWRUb01hc3RlclNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDU6ICBKb2luZWRMb2JieVxyXG4gICAgICAgICAgICAvL1N0YXRlIDYgOiBDb25uZWN0aW5nVG9HYW1lc2VydmVyXHJcbiAgICAgICAgICAgIC8vU3RhdGUgNyA6IENvbm5lY3RlZFRvR2FtZXNlcnZlclxyXG4gICAgICAgICAgICAvL1N0YXRlIDggOiBKb2luZWRcclxuICAgICAgICAgICAgLy9TdGF0ZSAxMDogRGlzY29ubmVjdGVkIFxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIHZhciBMQkMgPSBQaG90b24uTG9hZEJhbGFuY2luZy5Mb2FkQmFsYW5jaW5nQ2xpZW50O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXRlQ29kZTogXCIrc3RhdGUrXCIgXCIrTEJDLlN0YXRlVG9OYW1lKHN0YXRlKSk7XHJcblxyXG4gICAgICAgICAgICBpZihzdGF0ZT09MSlcclxuICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIixcImNvbm5lY3RpbmcgdG8gc2VydmVyLi4uXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHN0YXRlPT00KVxyXG4gICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwiY29ubmVjdGVkIHRvIHNlcnZlclwiKTtcclxuICAgICAgICAgICAgZWxzZSBpZihzdGF0ZT09NSkgLy9oYXMgam9pbmVkIGxvYmJ5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKFNob3dSb29tPT1mYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJ3YWl0aW5nIGZvciBvdGhlciBwbGF5ZXJzLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luUmFuZG9tUm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihTaG93Um9vbT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJzaG93aW5nIHJvb21zIGxpc3QuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZGVidWdcclxuICAgICAgICAgICAgQG1ldGhvZCBkZWJ1Z1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5kZWJ1Zz1mdW5jdGlvbihtZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGluZm9cclxuICAgICAgICAgICAgQG1ldGhvZCBpbmZvXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5pbmZvID0gZnVuY3Rpb24gKG1lc3MscGFyYW0pIHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzK3BhcmFtKTtcclxuICAgICAgICAgICBzdGF0ZVRleHQrPSBtZXNzK1wiIFwiK3BhcmFtK1wiXFxuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHdhcm5cclxuICAgICAgICAgICAgQG1ldGhvZCB3YXJuXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTFcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtMlxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYubG9nZ2VyLndhcm4gPSBmdW5jdGlvbiAobWVzcyxwYXJhbTEscGFyYW0yLHBhcmFtMykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzK1wiIFwiK3BhcmFtMStcIiBcIitwYXJhbTIrXCIgXCIrcGFyYW0zKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHBhcmFtMT09MjI1KSAvL25vIHJvb20gZm91bmRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyByYW5kb20gcm9vbSB3YXMgZm91bmQsIGNyZWF0aW5nIG9uZVwiKTtcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DcmVhdGVSb29tKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHBhcmFtMT09MjI2KSAvL3Jvb20gZG9lcyBub3QgZXhpc3RzIG9yIGlzIGZ1bGxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlNob3dUb2FzdChcIlJvb20gaXMgZnVsbCwgcGxlYXNlIHNlbGVjdCBhbnkgb3RoZXIgcm9vbSB0byBzcGVjdGF0ZS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBlcnJvclxyXG4gICAgICAgICAgICBAbWV0aG9kIGVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgIFBob3RvblJlZi5sb2dnZXIuZXJyb3IgPSBmdW5jdGlvbiAobWVzcyxwYXJhbSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgUGhvdG9uUmVmLmxvZ2dlci5leGNlcHRpb24gPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBzb21lIGZvcm1hdFxyXG4gICAgICAgICAgICBAbWV0aG9kIGZvcm1hdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgIFBob3RvblJlZi5sb2dnZXIuZm9ybWF0ID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHBsYXllciBqb2lucyBsb2JieVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICAgUGhvdG9uUmVmLm9uUm9vbUxpc3QgPSBmdW5jdGlvbiAocm9vbXMpIHtcclxuICAgICAgICAgICAgc3RhdGVUZXh0Kz1cIlxcblwiK1wiUm9vbXMgTGlzdDpcIitcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgaWYocm9vbXMubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVRleHQrPVwiTm8gcm9vbXMgaW4gbG9iYnkuXCIrXCJcXG5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUscm9vbXNbaV0ucGxheWVyQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbSBuYW1lOiBcIityb29tc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZVRleHQrPVwiUm9vbTogXCIrcm9vbXNbaV0ubmFtZStcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBjaGFuZ2UgaW4gcm9vbXMgbGlzdCAocm9vbSBhZGRlZCx1cGRhdGVkLHJlbW92ZWQgZXRjKVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RVcGRhdGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1VwZGF0ZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zQWRkZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zUmVtb3ZlZFxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uUm9vbUxpc3RVcGRhdGUgPSBmdW5jdGlvbiAocm9vbXMsIHJvb21zVXBkYXRlZCwgcm9vbXNBZGRlZCwgcm9vbXNSZW1vdmVkKSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkocm9vbXNbaV0ubmFtZSxyb29tc1tpXS5wbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJvb20gbmFtZTogXCIrcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVRleHQrPVwiUm9vbTogXCIrcm9vbXNbaV0ubmFtZStcIlxcblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbXMgTGlzdCB1cGRhdGVkOiBcIiArIHJvb21zVXBkYXRlZC5sZW5ndGggKyBcIiB1cGRhdGVkLCBcIiArIHJvb21zQWRkZWQubGVuZ3RoICsgXCIgYWRkZWQsIFwiICsgcm9vbXNSZW1vdmVkLmxlbmd0aCArIFwiIHJlbW92ZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGxvY2FsbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uSm9pblJvb21cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkpvaW5Sb29tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gTG9ncyBmb3IgZ2FtZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgXCIgKyB0aGlzLm15Um9vbSgpLm5hbWUgKyBcIiBqb2luZWRcIik7ICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15QWN0b3IoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KClbMF0ubG9hZEJhbGFuY2luZ0NsaWVudC51c2VySWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkuX2N1c3RvbVByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdKTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgIGlmKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl09PXRydWUpIC8vY2hlY2sgaWYgcGxheWVyIHdobyBqb2luZWQgaXMgc3BlY3RhdGVcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPXRydWU7XHJcbiAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge2NjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLHRydWUsdHJ1ZSxcIkdhbWVQbGF5XCIpO30sIDEwMDApOyAvL2Z1bmN0aW9uIGluIFVJTWFuYWdlclxyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgcmVtb3RlbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JKb2luXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uQWN0b3JKb2luID0gZnVuY3Rpb24gKGFjdG9yKSB7XHJcbiAgICAgICAgICAgIGlmKFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCk9PU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzKSAvL3doZW4gbWF4IHBsYXllciByZXF1aXJlZCB0byBzdGFydCBnYW1lIGhhcyBiZWVuIGFkZGVkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHJlcXVpcmVkIHBsYXllcnMgam9pbmVkLCBzdGFydGluZyB0aGUgZ2FtZS4uXCIpXHJcbiAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsXCJwbGF5ZXJzIGZvdW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPXRydWU7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIix0cnVlLHRydWUsXCJHYW1lUGxheVwiKTt9LCAxMDAwKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXModHJ1ZSxQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpLGZhbHNlLGZhbHNlLGZhbHNlLG51bGwsZmFsc2UsMCk7XHJcbiAgICAgICAgICAgICAgICAvL1Bob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclwiLFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksdHJ1ZSk7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBqb2luZWRcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUb3RhbCBQbGF5ZXJzOiBcIitQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBsZWF2ZXMgYSByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckxlYXZlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uQWN0b3JMZWF2ZSA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICAgICAgICBpZihNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT09dHJ1ZSlcclxuICAgICAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIWFjdG9yLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuR2FtZU92ZXIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZighTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkxlYXZlUm9vbSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWN0YXRvciBsZWZ0LCBzbyBkb250IG1pbmQsIGNvbnQgZ2FtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGxlZnRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5nZXRTY2VuZU5hbWUoKT09XCJHYW1lUGxheVwiKSAvL2lmIHNjZW5lIGlzIGdhbWVwbGF5IGxldCBwbGF5ZXIgZmluaXNoIGdhbWUgZm9yY2VmdWxseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwib3RoZXIgcGxheWVyIFwiK2FjdG9yLm5hbWUrXCIgaGFzIGxlZnRcIiwyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiU3BsYXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIG93biBwcm9wZXJ0aWVzIGdvdCBjaGFuZ2VkXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvclByb3BlcnRpZXNDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqLyBcclxuICAgICAgICBQaG90b25SZWYub25BY3RvclByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIHJvb20gcHJvcGVydGllcyBnb3QgY2hhbmdlZFxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uTXlSb29tUHJvcGVydGllc0NoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbk15Um9vbVByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHRvIGhhbmRsZSBlcnJvcnNcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvckNvZGVcclxuICAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1zZ1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi8gXHJcbiAgICAgICAgUGhvdG9uUmVmLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3JDb2RlLCBlcnJvck1zZykge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBlcnJvckNvZGUgKyBcIjogXCIgKyBlcnJvck1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBhbiBldmVudCBpcyByZWNlaXZlZCB3aXRoIHNvbWUgZGF0YVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uRXZlbnRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvZGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvbnRlbnRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yTnJcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovIFxyXG4gICAgICAgIFBob3RvblJlZi5vbkV2ZW50ID0gZnVuY3Rpb24gKGNvZGUsIGNvbnRlbnQsIGFjdG9yTnIpIHtcclxuICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTovL3JlY2V2aW5nIHBsYXllcmRhdGEgaW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIGRhdGFcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgUGxheWVySW5mb0RhdGEgPSBjb250ZW50LlBsYXllckluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMSxzZW5kZXJOYW1lLHNlbmRlcklELFBsYXllckluZm9EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiAvL3N0YXJ0IHR1cm4gcmFpc2UgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHN0YXJ0IHR1cm4gZXZlbnRcIilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX1R1cm4gPSBjb250ZW50LlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMixzZW5kZXJOYW1lLHNlbmRlcklELF9UdXJuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzogLy8gZGljZSBjb3VudFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGljZSBjb3VudFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGljZSA9IGNvbnRlbnQuRGljZUNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDMsc2VuZGVyTmFtZSxzZW5kZXJJRCxfZGljZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiAvL3JlY2VpbmcgdXNlciBpZCBvZiBwbGF5ZXIgd2hvIGhhcyBjb21wbGV0ZWQgdHVyblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIHR1cm4gY29tcGxldGVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9JRCA9IGNvbnRlbnQuVUlEO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDQsc2VuZGVyTmFtZSxzZW5kZXJJRCxfSUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogLy9yZWNlaXZpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgY2FyZCBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9jYXJkID0gY29udGVudC5DYXJkRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDUsc2VuZGVyTmFtZSxzZW5kZXJJRCxfY2FyZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OiAvL3JlY2VpdmUgZ2FtZSBvdmVyIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGdhbWUgb3ZlciBjYWxsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNixzZW5kZXJOYW1lLHNlbmRlcklELF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICBcclxuICAgICB9LFxyXG4gICAgIFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzPU11bHRpcGxheWVyQ29udHJvbGxlcjsiXX0=