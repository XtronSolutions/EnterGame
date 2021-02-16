
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
    this.ExitConnecting = false;
    this.ResetAllData();
    this.Init_MultiplayerController();
  },
  ToggleModeSelection: function ToggleModeSelection(_val // 1 means bot , 2 means real players
  ) {
    this.ModeSelection = _val;
  },
  SetConneting: function SetConneting(_state) {
    this.ExitConnecting = _state;
  },
  GetActiveStatus: function GetActiveStatus(_uID) {
    if (_uID === void 0) {
      _uID = "";
    }

    var _isActive = true;
    var _array = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;

    for (var index = 0; index < _array.length; index++) {
      if (_array[index].PlayerUID == _uID) {
        if (_array[index].IsActive == false) {
          _isActive = false;
        }
      }
    }

    return _isActive;
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
  CheckConnectionState: function CheckConnectionState() {
    var _connected = false;

    if (PhotonRef.state == 5 || PhotonRef.state == 7 || PhotonRef.isConnectedToMaster() == true || PhotonRef.isInLobby() == true || PhotonRef.isJoinedToRoom() == true) {
      console.log("already connected");
      _connected = true;
    }

    console.log(PhotonRef.state);
    return _connected;
  },

  /**
    @summary Disconnect from photon
    @method DisconnectPhoton
    @param none
    @returns no return
   **/
  DisconnectPhoton: function DisconnectPhoton() {
    //if (PhotonRef.isConnectedToMaster() == true || PhotonRef.state == 5 || PhotonRef.state == 7 || PhotonRef.isInLobby() == true || PhotonRef.isJoinedToRoom() == true) {
    PhotonRef.disconnect();
    this.JoinedRoom = false; //PhotonRef.leaveRoom();

    this.ResetState(); //  } else {
    //    console.log("not inside any room or lobby or connected to photon");
  },
  // },

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
          receivers: Photon.LoadBalancing.Constants.ReceiverGroup.Others
        });
      } catch (err) {
        console.error("error: " + err.message);
      }
    } else {
      console.log("you are not in room.");
    }
  },
  SendOneQuestionArrays: function SendOneQuestionArrays(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending one question arrays");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(18, {
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
  SendDecksArrays: function SendDecksArrays(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending decks arrays");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(19, {
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
  SendDecksArrayCounter: function SendDecksArrayCounter(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending decks arrays counters");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(20, {
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
          console.log(_timer);

          _this2.RoomCounter(_timer);
        } else {
          console.error("timer completed");

          if (_this2.GetRealActors() > 1) {
            //if has more than one player start real game
            _this2.SendRoomCompletedData();
          } else {
            clearTimeout(Schedular);
            GamePlayReferenceManager.Instance.Get_UIManager().ShowToast("No online player was found, please try again later");
            GamePlayReferenceManager.Instance.Get_UIManager().ExitConnecting(); // MultiplayerController.Instance.ResetRoomValues();
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
  ClearTimer: function ClearTimer() {
    TimerStarted = false;
    _timer = 0;
    clearTimeout(Schedular);
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
        if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == false) {
          GamePlayReferenceManager.Instance.Get_UIManager().ShowToast("Room does not exists anymore,please try again by exiting."); // MultiplayerController.Instance.ClearTimer();
          // MultiplayerController.Instance.SetConneting(false);
          // MultiplayerController.Instance.ResetRoomValues();
          // MultiplayerController.Instance.DisconnectPhoton();
        } else {
          //room does not exists or is full
          GamePlayReferenceManager.Instance.Get_UIManager().ToggleLoadingNode(false);
          GamePlayReferenceManager.Instance.Get_UIManager().ShowToast("Room is full, please select any other room to spectate.");
        }
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
      } // if (MultiplayerController.Instance.ExitConnecting) {
      //   MultiplayerController.Instance.ClearTimer();
      //   MultiplayerController.Instance.SetConneting(false);
      //   MultiplayerController.Instance.ResetRoomValues();
      //   MultiplayerController.Instance.DisconnectPhoton();
      // } else {


      if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == false) {
        MultiplayerController.Instance.ProcessCounter(); //}
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

        console.log("actor has left");
        console.log(PhotonRef.isJoinedToRoom());
        console.log(IsGameStarted);

        if (PhotonRef.isJoinedToRoom() == true && !IsGameStarted) {
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

        case 18:
          //receiving one question array
          console.log("received data for one question array");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(18, senderName, senderID, _data);
          break;

        case 19:
          //receiving decks array
          console.log("received data for decks array");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(19, senderName, senderID, _data);
          break;

        case 20:
          //receiving decks array Counter
          console.log("received data for decks array counter");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(20, senderName, senderID, _data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJHYW1lRmluaXNoZWQiLCJJc01hc3RlckNsaWVudCIsIlRvdGFsVGltZXIiLCJUaW1lclN0YXJ0ZWQiLCJTY2hlZHVsYXIiLCJNYXhTdHVkZW50cyIsIlJlc3RhcnRTcGVjdGF0ZSIsIklzR2FtZVN0YXJ0ZWQiLCJUaW1lb3V0cyIsIlJvb21Qcm9wZXJ0eSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllciIsInR5cGUiLCJJbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiSW5pdGlhbFNldHVwIiwiQm9vbGVhbiIsIlBsYXllckdhbWVJbmZvIiwiVGV4dCIsIlR1cm5OdW1iZXIiLCJBcHBfSW5mbyIsIkFwcElEIiwidG9vbHRpcCIsIkFwcFZlcnNpb24iLCJXc3MiLCJkaXNwbGF5TmFtZSIsIk1hc3RlclNlcnZlciIsIkZiQXBwSUQiLCJNdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDb21wb25lbnQiLCJQaG90b25BcHBJbmZvIiwiTWF4UGxheWVycyIsIk1heFNwZWN0YXRvcnMiLCJNb2RlU2VsZWN0aW9uIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwiUmVzZXRSb29tVmFsdWVzIiwib25Mb2FkIiwiRXhpdENvbm5lY3RpbmciLCJJbml0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZU1vZGVTZWxlY3Rpb24iLCJfdmFsIiwiU2V0Q29ubmV0aW5nIiwiX3N0YXRlIiwiR2V0QWN0aXZlU3RhdHVzIiwiX3VJRCIsIl9pc0FjdGl2ZSIsIl9hcnJheSIsIkdldF9HYW1lTWFuYWdlciIsImluZGV4IiwibGVuZ3RoIiwiUGxheWVyVUlEIiwiSXNBY3RpdmUiLCJHZXRTZWxlY3RlZE1vZGUiLCJnYW1lIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIkluaXRpYWxpemVQaG90b24iLCJjb25zb2xlIiwibG9nIiwiQXBwSW5mbyIsIkRlbW9Mb2FkQmFsYW5jaW5nIiwiTGVhdmVSb29tIiwiUm9vbU5hbWUiLCJNZXNzYWdlIiwiSm9pbmVkUm9vbSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsImdldFNjZW5lTmFtZSIsInNjZW5lTmFtZSIsIl9zY2VuZUluZm9zIiwiaSIsInV1aWQiLCJkaXJlY3RvciIsIl9zY2VuZSIsIl9pZCIsInVybCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibWF0Y2giLCJUb2dnbGVTaG93Um9vbV9Cb29sIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJnZXRQaG90b25SZWYiLCJQaG90b25BY3RvciIsIm15QWN0b3IiLCJSb29tQWN0b3JzIiwibXlSb29tQWN0b3JzQXJyYXkiLCJDaGVja1NwZWN0YXRlIiwiY3VzdG9tUHJvcGVydGllcyIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIkFwcElkIiwiRmJBcHBJZCIsIlJlcXVlc3RDb25uZWN0aW9uIiwic3RhdGUiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5Iiwic3RhcnQiLCJDaGVja0Nvbm5lY3Rpb25TdGF0ZSIsIl9jb25uZWN0ZWQiLCJpc0pvaW5lZFRvUm9vbSIsIkRpc2Nvbm5lY3RQaG90b24iLCJkaXNjb25uZWN0IiwiUmVzZXRTdGF0ZSIsIk9uUm9vbU5hbWVDaGFuZ2UiLCJPbk1lc3NhZ2VDaGFuZ2UiLCJtc2ciLCJVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyIsIl9wbGF5ZXJVcGRhdGUiLCJfcGxheWVyVmFsdWUiLCJfaW5pdGlhbFNldHVwVXBkYXRlIiwiX2luaXRpYWxTZXR1cFZhbHVlIiwiX3BsYXllckdhbWVJbmZvVXBkYXRlIiwiX3BsYXllckdhbWVJbmZvVmFsdWUiLCJfdHVybk51bWJlclVwZGF0ZSIsIl90dXJuTnVtYmVydmFsdWUiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNyZWF0ZVJvb20iLCJfZGF0YSIsInJvb21PcHRpb25zIiwiaXNWaXNpYmxlIiwiaXNPcGVuIiwibWF4UGxheWVycyIsImN1c3RvbUdhbWVQcm9wZXJ0aWVzIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU3R1ZGVudERhdGEiLCJDb3VudGVyIiwic2V0VXNlcklkIiwidXNlcklEIiwiUm9vbUlEIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiRGF0ZSIsIm5vdyIsImNyZWF0ZVJvb20iLCJKb2luUm9vbSIsIl9yb29tTmFtZSIsImpvaW5Sb29tIiwiSm9pblJhbmRvbVJvb20iLCJleHBlY3RlZEN1c3RvbVJvb21Qcm9wZXJ0aWVzIiwiam9pblJhbmRvbVJvb20iLCJTZW5kQ2FyZERhdGEiLCJyYWlzZUV2ZW50IiwiQ2FyZERhdGEiLCJzZW5kZXJOYW1lIiwic2VuZGVySUQiLCJhY3Rvck5yIiwicmVjZWl2ZXJzIiwiUGhvdG9uIiwiTG9hZEJhbGFuY2luZyIsIkNvbnN0YW50cyIsIlJlY2VpdmVyR3JvdXAiLCJBbGwiLCJlcnIiLCJlcnJvciIsIm1lc3NhZ2UiLCJTZW5kR2FtZU92ZXIiLCJEYXRhIiwiU2VuZEdhbWVPdmVyRGF0YSIsIlNlbmRTZWxlY3RlZFBsYXllckZvclByb2ZpdCIsIk90aGVycyIsIlNlbmRCYW5rcnVwdERhdGEiLCJTZW5kRGF0YSIsIlBsYXllckluZm8iLCJTZW5kT25lUXVlc3Rpb25EYXRhIiwiU2VuZE9uZVF1ZXN0aW9uQXJyYXlzIiwiU2VuZERlY2tzQXJyYXlzIiwiU2VuZERlY2tzQXJyYXlDb3VudGVyIiwiU2VuZFBhcnRuZXJQcm9maXRMb3NzIiwiU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhIiwiRGljZVJvbGxFdmVudCIsIkRpY2VDb3VudCIsIlNlbmRHb0JhY2tTcGFjZURhdGEiLCJTZW5kUGFydG5lclNoaXBPZmZlckRhdGEiLCJTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhIiwiU2VuZEluZm8iLCJTeW5jVHVybkNvbXBsZXRpb24iLCJVSUQiLCJTdGFydFR1cm4iLCJ0cmFjZSIsIlNob3dUb2FzdCIsIkNhbGxSZWNpZXZlRXZlbnQiLCJfZXZlbnRDb2RlIiwiX3NlbmRlck5hbWUiLCJfc2VuZGVySUQiLCJJbnN0YW5jZU51bGwiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsInNldFRpbWVvdXQiLCJSZWNlaXZlRXZlbnQiLCJEaXNjb25uZWN0RGF0YSIsIlJlc3RhcnRHYW1lIiwiX3RpbWVyIiwiY2xlYXJUaW1lb3V0IiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsImxvYWRTY2VuZSIsIkNoZWNrTWFzdGVyQ2xpZW50IiwiX2lzTWFzdGVyIiwibXlSb29tTWFzdGVyQWN0b3JOciIsIkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCIsIkdldFJlYWxBY3RvcnMiLCJfcmVhbFBsYXllciIsIkFsbFBsYXllcnMiLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIlJvb21Db3VudGVyIiwiU2VuZFJvb21Db21wbGV0ZWREYXRhIiwiR2V0X1VJTWFuYWdlciIsIkNsZWFyVGltZXIiLCJQcm9jZXNzQ291bnRlciIsIl9tYXN0ZXIiLCJfY291bnRlciIsIlJvb21Db21wbGV0ZWQiLCJzeXN0ZW1FdmVudCIsImVtaXQiLCJwdXNoIiwiVXBkYXRlQWN0b3JBY3RpdmVEYXRhIiwiX2FjdG9yIiwiX2FjdG9yc0FycmF5IiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJIYW5kbGVQbGF5ZXJMZWF2ZSIsImFjdG9yIiwiUGhvdG9uUmVmZXJlY2UiLCJfbWFuYWdlciIsIl9wbGF5ZXJUdXJuIiwiX2luaXRpYWxTZXR1cERvbmUiLCJfaXNTcGVjdGF0ZSIsIlJlbW92ZUZyb21DaGVja0FycmF5IiwidG9TdHJpbmciLCJDaGVja1R1cm5Db21wbGV0ZSIsIkNoYW5nZVR1cm5Gb3JjZWZ1bGx5IiwiU2V0UGxheWVyTGVmdCIsIlJlc2V0U29tZVZhbHVlcyIsIl9wbGF5ZXJmb3VuZCIsInNwbGljZSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlN5bmNEYXRhIiwidXBkYXRlIiwiZHQiLCJvblN0YXRlQ2hhbmdlIiwiTEJDIiwiTG9hZEJhbGFuY2luZ0NsaWVudCIsIlN0YXRlVG9OYW1lIiwiVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJIiwiVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJIiwibG9nZ2VyIiwiZGVidWciLCJtZXNzIiwiaW5mbyIsInBhcmFtIiwid2FybiIsInBhcmFtMSIsInBhcmFtMiIsInBhcmFtMyIsIlRvZ2dsZUxvYWRpbmdOb2RlIiwiZXhjZXB0aW9uIiwiZm9ybWF0Iiwib25Sb29tTGlzdCIsInJvb21zIiwiUmVzZXRSb29tTGlzdCIsIlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJIiwicGxheWVyQ291bnQiLCJvblJvb21MaXN0VXBkYXRlIiwicm9vbXNVcGRhdGVkIiwicm9vbXNBZGRlZCIsInJvb21zUmVtb3ZlZCIsIm9uSm9pblJvb20iLCJsb2FkQmFsYW5jaW5nQ2xpZW50IiwidXNlcklkIiwiX2N1c3RvbVByb3BlcnRpZXMiLCJvbkFjdG9ySm9pbiIsIm15Um9vbUFjdG9yQ291bnQiLCJvbkFjdG9yTGVhdmUiLCJHYW1lT3ZlciIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJHZXRUdXJuTnVtYmVyIiwiX3VJR2FtZU1hbmFnZXIiLCJvbkFjdG9yUHJvcGVydGllc0NoYW5nZSIsIm9uTXlSb29tUHJvcGVydGllc0NoYW5nZSIsIm9uRXJyb3IiLCJlcnJvckNvZGUiLCJlcnJvck1zZyIsIm9uRXZlbnQiLCJjb2RlIiwiY29udGVudCIsIlBsYXllckluZm9EYXRhIiwiX1R1cm4iLCJfZGljZSIsIl9JRCIsIl9jYXJkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUlBLFNBQUo7QUFDQSxJQUFJQyxTQUFT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Ii8vR2xvYmFsIFZhcmlhYmxlc1xyXG52YXIgUGhvdG9uUmVmO1xyXG52YXIgc3RhdGVUZXh0ID0gXCJcIjtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBTaG93Um9vbSA9IGZhbHNlO1xyXG52YXIgR2FtZUZpbmlzaGVkID0gZmFsc2U7XHJcbnZhciBJc01hc3RlckNsaWVudCA9IGZhbHNlO1xyXG52YXIgVG90YWxUaW1lciA9IDMwO1xyXG52YXIgVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbnZhciBTY2hlZHVsYXIgPSBudWxsO1xyXG52YXIgTWF4U3R1ZGVudHMgPSA2O1xyXG52YXIgUmVzdGFydFNwZWN0YXRlID0gZmFsc2U7XHJcbnZhciBJc0dhbWVTdGFydGVkID0gZmFsc2U7XHJcbnZhciBUaW1lb3V0cyA9IFtdO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gUm9vbVByb3BlcnR5LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvb21Qcm9wZXJ0eSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlJvb21Qcm9wZXJ0eVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllcjoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSW5pdGlhbFNldHVwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyR2FtZUluZm86IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFR1cm5OdW1iZXI6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gQXBwX0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQXBwX0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJBcHBfSW5mb1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEFwcElEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBcHAgaWQgZm9ybSBwaG90b24gZGFzaGJvYXJkXCIsXHJcbiAgICB9LFxyXG4gICAgQXBwVmVyc2lvbjoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQXBwIHZlcnNpb24gZm9yIHBob3RvblwiLFxyXG4gICAgfSxcclxuICAgIFdzczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc1NlY3VyZVwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklmIHBob3RvbiBzaG91bGQgdXNlIHNlY3VyZSBhbmQgcmVsaWFibGUgcHJvdG9jb2xzXCIsXHJcbiAgICB9LFxyXG4gICAgTWFzdGVyU2VydmVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJtYXN0ZXIgc2VydmVyIGZvciBwaG90b24gdG8gY29ubmVjdFwiLFxyXG4gICAgfSxcclxuICAgIEZiQXBwSUQ6IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkZCIGFwcCBpZCB1c2VkIGZvciBGQiBhdXRoZXJpemF0aW9uXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGRhdGEgcmVsYXRlZCB0byBNdWx0aXBsYXllckNvbnRyb2xsZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE11bHRpcGxheWVyQ29udHJvbGxlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk11bHRpcGxheWVyQ29udHJvbGxlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQaG90b25BcHBJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEFwcF9JbmZvLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTWF4UGxheWVyczoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTWF4U3BlY3RhdG9yczoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTW9kZVNlbGVjdGlvbjoge1xyXG4gICAgICAvLyAxIG1lYW5zIGJvdCAsIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgc3RhdGljczoge1xyXG4gICAgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICBJbnN0YW5jZTogbnVsbCxcclxuICB9LFxyXG5cclxuICBSZXNldEFsbERhdGEoKSB7XHJcbiAgICBUaW1lb3V0cyA9IFtdO1xyXG4gICAgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgUGhvdG9uUmVmID0gbnVsbDtcclxuICAgIHN0YXRlVGV4dCA9IFwiXCI7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgU2hvd1Jvb20gPSBmYWxzZTtcclxuICAgIEdhbWVGaW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxuICAgIFRvdGFsVGltZXIgPSAzMDtcclxuICAgIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgU2NoZWR1bGFyID0gbnVsbDtcclxuICAgIHRoaXMuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICBNYXhTdHVkZW50cyA9IDY7XHJcbiAgICBSZXN0YXJ0U3BlY3RhdGUgPSBmYWxzZTtcclxuICB9LFxyXG4gIC8vdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIGNyZWF0ZWRcclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLkV4aXRDb25uZWN0aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLlJlc2V0QWxsRGF0YSgpO1xyXG4gICAgdGhpcy5Jbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZU1vZGVTZWxlY3Rpb24oXHJcbiAgICBfdmFsIC8vIDEgbWVhbnMgYm90ICwgMiBtZWFucyByZWFsIHBsYXllcnNcclxuICApIHtcclxuICAgIHRoaXMuTW9kZVNlbGVjdGlvbiA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgU2V0Q29ubmV0aW5nKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5FeGl0Q29ubmVjdGluZyA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBHZXRBY3RpdmVTdGF0dXMoX3VJRCA9IFwiXCIpIHtcclxuICAgIHZhciBfaXNBY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIHZhciBfYXJyYXkgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9hcnJheVtpbmRleF0uUGxheWVyVUlEID09IF91SUQpIHtcclxuICAgICAgICBpZiAoX2FycmF5W2luZGV4XS5Jc0FjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgX2lzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9pc0FjdGl2ZTtcclxuICB9LFxyXG5cclxuICBHZXRTZWxlY3RlZE1vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5Nb2RlU2VsZWN0aW9uO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgSW5pdGlhbGl6ZSBzb21lIGVzc2VudGFpbHMgZGF0YSBmb3IgbXVsdGlwbGF5ZXIgY29udHJvbGxlciBjbGFzc1xyXG4gICAgQG1ldGhvZCBJbml0X011bHRpcGxheWVyQ29udHJvbGxlclxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBJbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpIHtcclxuICAgIGlmICghTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlKSB7XHJcbiAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgIHRoaXMuSW5pdGlhbGl6ZVBob3RvbigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhBcHBJbmZvKTtcclxuICAgICAgUGhvdG9uUmVmID0gbmV3IERlbW9Mb2FkQmFsYW5jaW5nKCk7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5MZWF2ZVJvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuUm9vbU5hbWUgPSBcIlwiO1xyXG4gICAgdGhpcy5NZXNzYWdlID0gXCJcIjtcclxuICAgIFNob3dSb29tID0gZmFsc2U7XHJcbiAgICB0aGlzLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjaGVjayByZWZlcmVuY2UgdG8gc29tZSB2YXJpYWJsZXMgYW5kIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmVtb3ZlIHBlcnNpc3Qgbm9kZSB3aGVuIHdhbnQgdG8gcmVzdGFydCBzY2VuZVxyXG4gICAgQG1ldGhvZCBSZW1vdmVQZXJzaXN0Tm9kZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBSZW1vdmVQZXJzaXN0Tm9kZSgpIHtcclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSA9IG51bGw7XHJcbiAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gZ2V0IG5hbWUgb2YgY3VycmVudCBvcGVuZWQgc2NlbmVcclxuICAgIEBtZXRob2QgZ2V0U2NlbmVOYW1lXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge3N0cmluZ30gc2NlbmVOYW1lXHJcbiAgICAqKi9cclxuICBnZXRTY2VuZU5hbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzY2VuZU5hbWU7XHJcbiAgICB2YXIgX3NjZW5lSW5mb3MgPSBjYy5nYW1lLl9zY2VuZUluZm9zO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfc2NlbmVJbmZvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoX3NjZW5lSW5mb3NbaV0udXVpZCA9PSBjYy5kaXJlY3Rvci5fc2NlbmUuX2lkKSB7XHJcbiAgICAgICAgc2NlbmVOYW1lID0gX3NjZW5lSW5mb3NbaV0udXJsO1xyXG4gICAgICAgIHNjZW5lTmFtZSA9IHNjZW5lTmFtZS5zdWJzdHJpbmcoc2NlbmVOYW1lLmxhc3RJbmRleE9mKFwiL1wiKSArIDEpLm1hdGNoKC9bXlxcLl0rLylbMF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzY2VuZU5hbWU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBzZXQgXCJTaG93Um9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlU2hvd1Jvb21fQm9vbFxyXG4gICAgQHBhcmFtIHtib29sZWFufSBfc3RhdGVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgKiovXHJcbiAgVG9nZ2xlU2hvd1Jvb21fQm9vbChfc3RhdGUpIHtcclxuICAgIFNob3dSb29tID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gc2V0IFwiTGVhdmVSb29tXCIgYm9vbCB2YWx1ZVxyXG4gICAgQG1ldGhvZCBUb2dnbGVMZWF2ZVJvb21fQm9vbFxyXG4gICAgQHBhcmFtIHtib29sZWFufSBfc3RhdGVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgKiovXHJcbiAgVG9nZ2xlTGVhdmVSb29tX0Jvb2woX3N0YXRlKSB7XHJcbiAgICB0aGlzLkxlYXZlUm9vbSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgUGhvdG9uIFwiUGhvdG9uUmVmXCIgaW5zdGFuY2UgY3JlYXRlZCBieSBtdWx0aXBsYXllciBjbGFzc1xyXG4gICAgQG1ldGhvZCBnZXRQaG90b25SZWZcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBQaG90b25SZWZcclxuICAgICoqL1xyXG4gIGdldFBob3RvblJlZigpIHtcclxuICAgIHJldHVybiBQaG90b25SZWY7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIG15QWN0b3IgaW5zdGFuY2UgY3JlYXRlZCBieSBwaG90b25cclxuICAgIEBtZXRob2QgUGhvdG9uQWN0b3JcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBBY3RvclxyXG4gICAgKiovXHJcbiAgUGhvdG9uQWN0b3IoKSB7XHJcbiAgICByZXR1cm4gUGhvdG9uUmVmLm15QWN0b3IoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgbXlSb29tQWN0b3JzQXJyYXkgY3JlYXRlZCBieSBwaG90b25cclxuICAgIEBtZXRob2QgUm9vbUFjdG9yc1xyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IEFjdG9yXHJcbiAgICAqKi9cclxuICBSb29tQWN0b3JzKCkge1xyXG4gICAgcmV0dXJuIFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBpc1NwZWN0YXRlIHZhcmlhYmxlIGZyb20gY3VzdG9tIHByb3BlcnR5IG9mIGN1cnJlbnQgYWN0b3JcclxuICAgIEBtZXRob2QgQ2hlY2tTcGVjdGF0ZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBpc1NwZWN0YXRlXHJcbiAgICAqKi9cclxuICBDaGVja1NwZWN0YXRlKCkge1xyXG4gICAgcmV0dXJuIFBob3RvblJlZi5teUFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgSW5pdGlhbGl6ZSBwaG90b24gd2l0aCBhcHBpZCxhcHAgdmVyc2lvbiwgV3NzIGV0Y1xyXG4gICAgQG1ldGhvZCBJbml0aWFsaXplUGhvdG9uXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEluaXRpYWxpemVQaG90b24oKSB7XHJcbiAgICBBcHBJbmZvLkFwcElkID0gdGhpcy5QaG90b25BcHBJbmZvLkFwcElEO1xyXG4gICAgQXBwSW5mby5BcHBWZXJzaW9uID0gdGhpcy5QaG90b25BcHBJbmZvLkFwcFZlcnNpb247XHJcbiAgICBBcHBJbmZvLldzcyA9IHRoaXMuUGhvdG9uQXBwSW5mby5Xc3M7XHJcbiAgICBBcHBJbmZvLk1hc3RlclNlcnZlciA9IHRoaXMuUGhvdG9uQXBwSW5mby5NYXN0ZXJTZXJ2ZXI7XHJcbiAgICBBcHBJbmZvLkZiQXBwSWQgPSB0aGlzLlBob3RvbkFwcEluZm8uRmJBcHBJRDtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgY29ubmVjdGlvbiByZXF1ZXN0IHRvIHBob3RvblxyXG4gICAgQG1ldGhvZCBSZXF1ZXN0Q29ubmVjdGlvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBSZXF1ZXN0Q29ubmVjdGlvbigpIHtcclxuICAgIGlmIChQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUpIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBjb25uZWN0ZWRcIik7XHJcbiAgICBlbHNlIFBob3RvblJlZi5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIENoZWNrQ29ubmVjdGlvblN0YXRlKCkge1xyXG4gICAgdmFyIF9jb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgIGlmIChQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuc3RhdGUgPT0gNyB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgY29ubmVjdGVkXCIpO1xyXG4gICAgICBfY29ubmVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhQaG90b25SZWYuc3RhdGUpO1xyXG4gICAgcmV0dXJuIF9jb25uZWN0ZWQ7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBEaXNjb25uZWN0IGZyb20gcGhvdG9uXHJcbiAgICBAbWV0aG9kIERpc2Nvbm5lY3RQaG90b25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgRGlzY29ubmVjdFBob3RvbigpIHtcclxuICAgIC8vaWYgKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuc3RhdGUgPT0gNyB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICBQaG90b25SZWYuZGlzY29ubmVjdCgpO1xyXG4gICAgdGhpcy5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICAvL1Bob3RvblJlZi5sZWF2ZVJvb20oKTtcclxuICAgIHRoaXMuUmVzZXRTdGF0ZSgpO1xyXG4gICAgLy8gIH0gZWxzZSB7XHJcbiAgICAvLyAgICBjb25zb2xlLmxvZyhcIm5vdCBpbnNpZGUgYW55IHJvb20gb3IgbG9iYnkgb3IgY29ubmVjdGVkIHRvIHBob3RvblwiKTtcclxuICB9LFxyXG4gIC8vIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmVzZXRpbmcgZmV3IHZhbHVlc1xyXG4gICAgQG1ldGhvZCBSZXNldFN0YXRlXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFJlc2V0U3RhdGUoKSB7XHJcbiAgICBJc0dhbWVTdGFydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkxlYXZlUm9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICBTaG93Um9vbSA9IGZhbHNlO1xyXG4gICAgc3RhdGVUZXh0ID0gXCJcIjtcclxuICAgIHRoaXMuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiByb29tIG5hbWUgZ290IGlucHV0IGZyb20gZ2FtZVxyXG4gICAgQG1ldGhvZCBPblJvb21OYW1lQ2hhbmdlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIE9uUm9vbU5hbWVDaGFuZ2UobmFtZSkge1xyXG4gICAgdGhpcy5Sb29tTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBtZXNzYWdlIHdpbmRvdyBnb3QgaW5wdXQgZnJvbSBnYW1lXHJcbiAgICBAbWV0aG9kIE9uTWVzc2FnZUNoYW5nZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG1zZ1xyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIE9uTWVzc2FnZUNoYW5nZShtc2cpIHtcclxuICAgIHRoaXMuTWVzc2FnZSA9IG1zZztcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHVwZGF0ZSBjdXN0b20gcm9vbSBwcm9wZXJ0aWVzXHJcbiAgICBAbWV0aG9kIFVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXMoX3BsYXllclVwZGF0ZSA9IGZhbHNlLCBfcGxheWVyVmFsdWUgPSAwLCBfaW5pdGlhbFNldHVwVXBkYXRlID0gZmFsc2UsIF9pbml0aWFsU2V0dXBWYWx1ZSA9IGZhbHNlLCBfcGxheWVyR2FtZUluZm9VcGRhdGUgPSBmYWxzZSwgX3BsYXllckdhbWVJbmZvVmFsdWUgPSBudWxsLCBfdHVybk51bWJlclVwZGF0ZSA9IGZhbHNlLCBfdHVybk51bWJlcnZhbHVlID0gMCkge1xyXG4gICAgaWYgKF9wbGF5ZXJVcGRhdGUpIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclwiLCBfcGxheWVyVmFsdWUsIHRydWUpO1xyXG5cclxuICAgIGlmIChfaW5pdGlhbFNldHVwVXBkYXRlKSBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIiwgX2luaXRpYWxTZXR1cFZhbHVlLCB0cnVlKTtcclxuXHJcbiAgICBpZiAoX3BsYXllckdhbWVJbmZvVXBkYXRlKSBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCBfcGxheWVyR2FtZUluZm9WYWx1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKF90dXJuTnVtYmVyVXBkYXRlKSBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIF90dXJuTnVtYmVydmFsdWUsIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY3JlYXRlIHJvb20gcmVxdWVzdFxyXG4gICAgQG1ldGhvZCBDcmVhdGVSb29tXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIENyZWF0ZVJvb20oKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5zdGF0ZSA9PSA4KSB7XHJcbiAgICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBfZGF0YSA9IG5ldyBSb29tUHJvcGVydHkoKTtcclxuICAgICAgICBfZGF0YS5QbGF5ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBpc1Zpc2libGU6IHRydWUsXHJcbiAgICAgICAgICBpc09wZW46IHRydWUsXHJcbiAgICAgICAgICBtYXhQbGF5ZXJzOiB0aGlzLk1heFBsYXllcnMgKyB0aGlzLk1heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICBjdXN0b21HYW1lUHJvcGVydGllczogX2RhdGEsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwgeyBJc1NwZWN0YXRlOiBmYWxzZSB9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIiwgeyBDb3VudGVyOiBUb3RhbFRpbWVyIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuICAgICAgICB2YXIgUm9vbUlEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSk7XHJcblxyXG4gICAgICAgIFBob3RvblJlZi5jcmVhdGVSb29tKFwiUm9vbV9cIiArIFJvb21JRCwgcm9vbU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGpvaW4gcm9vbSByZXF1ZXN0IGJ5IG5hbWVcclxuICAgIEBtZXRob2QgSm9pblJvb21cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBfcm9vbU5hbWVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBKb2luUm9vbShfcm9vbU5hbWUpIHtcclxuICAgIGlmIChQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUgfHwgUGhvdG9uUmVmLnN0YXRlID09IDgpIHtcclxuICAgICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IGZhbHNlIHx8IFBob3RvblJlZi5zdGF0ZSAhPSA4KSB7XHJcbiAgICAgICAgdmFyIHJvb21PcHRpb25zID0ge1xyXG4gICAgICAgICAgaXNWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgaXNPcGVuOiBmYWxzZSxcclxuICAgICAgICAgIG1heFBsYXllcnM6IHRoaXMuTWF4UGxheWVycyArIHRoaXMuTWF4U3BlY3RhdG9ycyxcclxuICAgICAgICAgIC8vXCJjdXN0b21HYW1lUHJvcGVydGllc1wiOntcIlJvb21Fc3NlbnRpYWxzXCI6IHtJc1NwZWN0YXRlOnRydWV9fVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHsgSXNTcGVjdGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIiwgeyBDb3VudGVyOiBUb3RhbFRpbWVyIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuXHJcbiAgICAgICAgUGhvdG9uUmVmLmpvaW5Sb29tKF9yb29tTmFtZSwgcm9vbU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGpvaW4gcmFuZG9tIHJvb21cclxuICAgIEBtZXRob2QgSm9pblJhbmRvbVJvb21cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgSm9pblJhbmRvbVJvb20oKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLnN0YXRlID09IDUgfHwgUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5zdGF0ZSA9PSA4KSB7XHJcbiAgICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSBmYWxzZSB8fCBQaG90b25SZWYuc3RhdGUgIT0gOCkge1xyXG4gICAgICAgIHZhciBfZGF0YSA9IG5ldyBSb29tUHJvcGVydHkoKTtcclxuICAgICAgICBfZGF0YS5QbGF5ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAvL1wiZXhwZWN0ZWRNYXhQbGF5ZXJzXCI6dGhpcy5NYXhQbGF5ZXJzK01heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICBleHBlY3RlZEN1c3RvbVJvb21Qcm9wZXJ0aWVzOiBfZGF0YSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7IElzU3BlY3RhdGU6IGZhbHNlIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tQ291bnRlclwiLCB7IENvdW50ZXI6IFRvdGFsVGltZXIgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG5cclxuICAgICAgICBQaG90b25SZWYuam9pblJhbmRvbVJvb20ocm9vbU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgY2FyZCBpbmRleCBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZENhcmREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kQ2FyZERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBjYXJkIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDUsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIENhcmREYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGdhbWUgb3ZlciBjYWxsXHJcbiAgICBAbWV0aG9kIFNlbmRHYW1lT3ZlclxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZEdhbWVPdmVyKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZ2FtZSBvdmVyIGNhbGxcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDYsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kR2FtZU92ZXJEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZ2FtZSBvdmVyIGRhdGEgdG8gc3luY1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTYsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kU2VsZWN0ZWRQbGF5ZXJGb3JQcm9maXQoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBnYW1lIG92ZXIgZGF0YSB0byBzeW5jXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxNyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBiYWNrcnVwdCBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRCYW5rcnVwdERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRCYW5rcnVwdERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBiYW5rcnVwY3kgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgOSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBQbGF5ZXIgRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmREYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgcGxheWVyIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllckluZm86IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgb25lIHF1ZXN0aW9uIERhdGEgb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRPbmVRdWVzdGlvbkRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRPbmVRdWVzdGlvbkRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRPbmVRdWVzdGlvbkFycmF5cyhfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiBhcnJheXNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE4LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZERlY2tzQXJyYXlzKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZGVja3MgYXJyYXlzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxOSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmREZWNrc0FycmF5Q291bnRlcihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGRlY2tzIGFycmF5cyBjb3VudGVyc1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjAsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBwcm9maXQgb3IgbG9zcyB0byB5b3VyIHBhc3J0bmVyXHJcbiAgICBAbWV0aG9kIFNlbmRQYXJ0bmVyUHJvZml0TG9zc1xyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFBhcnRuZXJQcm9maXRMb3NzKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEzLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIG9uZSBxdWVzdGlvbiByZXNwb25zZSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gcmVzcG9uc2UgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgOCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBkaWNlIGRhdGFcclxuICAgIEBtZXRob2QgRGljZVJvbGxFdmVudFxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgRGljZVJvbGxFdmVudChfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGRpY2UgY291bnRcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERpY2VDb3VudDogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBnbyBiYWNrIHNwYWNlcyBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRHb0JhY2tTcGFjZURhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRHb0JhY2tTcGFjZURhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZCBnbyBiYWNrIHNwYWNlcyBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZGluZyBvcGVuIGludml0YXRpb24gdG8gYWxsIHBsYXllcnMgZm9yIHBhcnRuZXIgc2hpcFxyXG4gICAgQG1ldGhvZCBTZW5kUGFydG5lclNoaXBPZmZlckRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRQYXJ0bmVyU2hpcE9mZmVyRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBhcnRuZXIgc2hpcCBvZmZlclwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTEsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmRpbmcgcGFydG5lciBhbnN3ZXIgZGF0YSAoYWNjZXB0IG9yIHJlamVjdClcclxuICAgIEBtZXRob2QgU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBhcnRlbnJzaGlwIGFuc3dlciBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRJbmZvKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgaW5mb1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTUsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgdXNlciBpZCBvZiBwbGF5ZXIgdG8gYWxsIG90aGVyIHdobyBoYWQgY29tcGxldGVkIHRoZWlyIHR1cm5cclxuICAgIEBtZXRob2QgU3luY1R1cm5Db21wbGV0aW9uXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTeW5jVHVybkNvbXBsZXRpb24oX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyB0dXJuIGNvbXBsZXRpb24gZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgVUlEOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTdGFydCBUdXJuIGZvciBpbml0aWFsIHR1cm5cclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTdGFydFR1cm4oX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTdGFydGluZyBUdXJuXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBUdXJuTnVtYmVyOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTaG93IHRvYXN0IG1lc3NhZ2Ugb24gdGhlIGNvbnNvbGVcclxuICAgIEBtZXRob2QgU2hvd1RvYXN0XHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIHNob3duIFxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNob3dUb2FzdDogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgY29uc29sZS5sb2coXCJ0b2FzdCBtZXNzYWdlOiBcIiArIG1zZyk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZWNlaXZlIGV2ZW50IGZyb20gcGhvdG9uIHJhaXNlIG9uIFxyXG4gICAgQG1ldGhvZCBDYWxsUmVjaWV2ZUV2ZW50XHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgQ2FsbFJlY2lldmVFdmVudDogZnVuY3Rpb24gKF9ldmVudENvZGUsIF9zZW5kZXJOYW1lLCBfc2VuZGVySUQsIF9kYXRhKSB7XHJcbiAgICB2YXIgSW5zdGFuY2VOdWxsID0gdHJ1ZTtcclxuXHJcbiAgICAvL3RvIGNoZWNrIGlmIGluc3RhbmNlIGlzIG51bGwgaW4gY2FzZSBjbGFzcyBpbnN0YW5jZSBpcyBub3QgbG9hZGVkIGFuZCBpdHMgcmVjZWl2ZXMgY2FsbGJhY2tcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKSA9PSBudWxsKSB7XHJcbiAgICAgIEluc3RhbmNlTnVsbCA9IHRydWU7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuQ2FsbFJlY2lldmVFdmVudChfZXZlbnRDb2RlLCBfc2VuZGVyTmFtZSwgX3NlbmRlcklELCBfZGF0YSk7XHJcbiAgICAgIH0sIDUwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEluc3RhbmNlTnVsbCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgX3NlbmRlck5hbWUsIF9zZW5kZXJJRCwgX2RhdGEpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIERpc2Nvbm5lY3REYXRhKCkge1xyXG4gICAgR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPWZhbHNlO1xyXG4gICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0U3RhdGUoKTtcclxuICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgfSxcclxuXHJcbiAgUmVzdGFydEdhbWUoX3RpbWVyID0gMCkge1xyXG4gICAgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBUaW1lb3V0cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRzW2luZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgfSwgX3RpbWVyKTtcclxuICAgIC8vIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gIH0sXHJcblxyXG4gIENoZWNrTWFzdGVyQ2xpZW50KF9pZCkge1xyXG4gICAgdmFyIF9pc01hc3RlciA9IGZhbHNlO1xyXG4gICAgaWYgKFBob3RvblJlZi5teVJvb21NYXN0ZXJBY3Rvck5yKCkgPT0gX2lkICYmIFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciA9PSBfaWQpIHtcclxuICAgICAgX2lzTWFzdGVyID0gdHJ1ZTtcclxuICAgICAgSXNNYXN0ZXJDbGllbnQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5lcnJvcihfaXNNYXN0ZXIpO1xyXG4gICAgcmV0dXJuIF9pc01hc3RlcjtcclxuICB9LFxyXG5cclxuICBDaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoKSB7XHJcbiAgICB2YXIgX2lzTWFzdGVyID0gZmFsc2U7XHJcbiAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yID09IFBob3RvblJlZi5teVJvb21NYXN0ZXJBY3Rvck5yKCkpIHtcclxuICAgICAgX2lzTWFzdGVyID0gdHJ1ZTtcclxuICAgICAgSXNNYXN0ZXJDbGllbnQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUuZXJyb3IoX2lzTWFzdGVyKTtcclxuICAgIHJldHVybiBfaXNNYXN0ZXI7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRSb29tVmFsdWVzKCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KFNjaGVkdWxhcik7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbiAgICAgIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuXHJcbiAgR2V0UmVhbEFjdG9ycygpIHtcclxuICAgIHZhciBfcmVhbFBsYXllciA9IDA7XHJcbiAgICB2YXIgQWxsUGxheWVycyA9IFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEFsbFBsYXllcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChBbGxQbGF5ZXJzW2luZGV4XS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgIF9yZWFsUGxheWVyKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfcmVhbFBsYXllcjtcclxuICB9LFxyXG5cclxuICBSb29tQ291bnRlcihfdGltZXIpIHtcclxuICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gICAgdmFyIF9kYXRhID0gbnVsbDtcclxuICAgIFNjaGVkdWxhciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoSXNNYXN0ZXJDbGllbnQpIHtcclxuICAgICAgICBpZiAoX3RpbWVyID4gMCkge1xyXG4gICAgICAgICAgX3RpbWVyLS07XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhfdGltZXIpO1xyXG4gICAgICAgICAgdGhpcy5Sb29tQ291bnRlcihfdGltZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwidGltZXIgY29tcGxldGVkXCIpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuR2V0UmVhbEFjdG9ycygpID4gMSkge1xyXG4gICAgICAgICAgICAvL2lmIGhhcyBtb3JlIHRoYW4gb25lIHBsYXllciBzdGFydCByZWFsIGdhbWVcclxuICAgICAgICAgICAgdGhpcy5TZW5kUm9vbUNvbXBsZXRlZERhdGEoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlNob3dUb2FzdChcIk5vIG9ubGluZSBwbGF5ZXIgd2FzIGZvdW5kLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyXCIpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLkV4aXRDb25uZWN0aW5nKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVG9nZ2xlTW9kZVNlbGVjdGlvbigxKTtcclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlRvZ2dsZVNob3dSb29tX0Jvb2woZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMgPSAyO1xyXG4gICAgICAgICAgICAvLyBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwicGxheWVycyBmb3VuZFwiKTtcclxuICAgICAgICAgICAgLy8gY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0cnVlLCB0cnVlLCBcIkdhbWVQbGF5XCIpOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgICAgICAgLy8gfSwgMTAwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMDAwKTtcclxuICB9LFxyXG5cclxuICBDbGVhclRpbWVyKCkge1xyXG4gICAgVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICBfdGltZXIgPSAwO1xyXG4gICAgY2xlYXJUaW1lb3V0KFNjaGVkdWxhcik7XHJcbiAgfSxcclxuXHJcbiAgUHJvY2Vzc0NvdW50ZXIoKSB7XHJcbiAgICB2YXIgX21hc3RlciA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoKTtcclxuICAgIGlmIChfbWFzdGVyKSB7XHJcbiAgICAgIGlmICghVGltZXJTdGFydGVkKSB7XHJcbiAgICAgICAgVGltZXJTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICB2YXIgX2NvdW50ZXIgPSBQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIilbXCJDb3VudGVyXCJdO1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Sb29tQ291bnRlcihfY291bnRlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgcm9vbSBjb21wbGV0ZWQgZGF0YVxyXG4gICAgQG1ldGhvZCBTZW5kUm9vbUNvbXBsZXRlZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRSb29tQ29tcGxldGVkRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIFJvb21Db21wbGV0ZWREYXRhXCIpO1xyXG4gICAgICAvLyAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTQsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSb29tQ29tcGxldGVkKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9yZWFsUGxheWVyID0gdGhpcy5HZXRSZWFsQWN0b3JzKCk7XHJcbiAgICAgIElzR2FtZVN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycyA9IF9yZWFsUGxheWVyO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFsbCByZXF1aXJlZCBwbGF5ZXJzIGpvaW5lZCwgc3RhcnRpbmcgdGhlIGdhbWUuLlwiKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgIFRpbWVvdXRzLnB1c2goXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTtcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgICApOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKHRydWUsIF9yZWFsUGxheWVyLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBudWxsLCBmYWxzZSwgMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQWN0b3JBY3RpdmVEYXRhKF9hY3Rvcikge1xyXG4gICAgdmFyIF9hY3RvcnNBcnJheSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIHZhciBfZGF0YSA9IG51bGw7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBfZGF0YSA9IF9hY3RvcnNBcnJheVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgaWYgKF9kYXRhLlBsYXllclVJRCA9PSBfYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgIF9kYXRhLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgX2FjdG9yc0FycmF5W2luZGV4XS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwidXBkYXRpbmcgYWN0aXZlIHN0YXR1cyBvZiB0aGUgcGxheWVyIHdobyBoYXMgbGVmdC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlwiKTtcclxuICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgfSxcclxuXHJcbiAgSGFuZGxlUGxheWVyTGVhdmUoYWN0b3IgPSBudWxsLCBQaG90b25SZWZlcmVjZSA9IG51bGwsIF9tYW5hZ2VyID0gbnVsbCwgX3BsYXllclR1cm4gPSAwLCBfaW5pdGlhbFNldHVwRG9uZSA9IGZhbHNlLCBfaXNTcGVjdGF0ZSA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2luaXRpYWxTZXR1cERvbmUpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZUFjdG9yQWN0aXZlRGF0YShhY3Rvcik7XHJcbiAgICAgICAgICBpZiAoIV9pc1NwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGxlZnQ6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJlbW92ZUZyb21DaGVja0FycmF5KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLkNoZWNrVHVybkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChfcGxheWVyVHVybiA9PSBpbmRleCAmJiBQaG90b25SZWZlcmVjZS5teUFjdG9yKCkuYWN0b3JOciA9PSBQaG90b25SZWZlcmVjZS5teVJvb21NYXN0ZXJBY3Rvck5yKCkpIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5DaGFuZ2VUdXJuRm9yY2VmdWxseSgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlIHR1cm4gZm9yY2VmdWxseVwiKTtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5TZXRQbGF5ZXJMZWZ0KHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfbWFuYWdlci5SZXNldFNvbWVWYWx1ZXMoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIF91SU1hbmFnZXIuU2hvd1RvYXN0KFwicGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDEwMDApO1xyXG4gICAgICB2YXIgX3BsYXllcmZvdW5kID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycy0tO1xyXG4gICAgICAgICAgX3BsYXllcmZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVBY3RvckFjdGl2ZURhdGEoYWN0b3IpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIV9wbGF5ZXJmb3VuZCkge1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzLS07XHJcbiAgICAgICAgaWYgKCFfaXNTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN5bmNEYXRhKG51bGwsIGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coX21hbmFnZXIuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICBjb25zb2xlLmxvZyhNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvL2NhbGxlZCBldmVyeSBmcmFtZVxyXG4gIHVwZGF0ZShkdCkge1xyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgdGhlcmUgaXMgc29tZSBjaGFuZ2UgaW4gY29ubmVjdGlvbiBzdGF0ZVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uU3RhdGVDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHN0YXRlXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgICAgLy8jcmVnaW9uIENvbm5lY3Rpb24gU3RhdGVzXHJcbiAgICAgIC8vc3RhdGUgMSA6IGNvbm5lY3RpbmdUb05hbWVTZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSAyIDogQ29ubmVjdGVkVG9OYW1lU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgMyA6IENvbm5lY3RpbmdUb01hc3RlclNlcnZlclxyXG4gICAgICAvL1N0YXRlIDQgOiBDb25uZWN0ZWRUb01hc3RlclNlcnZlclxyXG4gICAgICAvL1N0YXRlIDU6ICBKb2luZWRMb2JieVxyXG4gICAgICAvL1N0YXRlIDYgOiBDb25uZWN0aW5nVG9HYW1lc2VydmVyXHJcbiAgICAgIC8vU3RhdGUgNyA6IENvbm5lY3RlZFRvR2FtZXNlcnZlclxyXG4gICAgICAvL1N0YXRlIDggOiBKb2luZWRcclxuICAgICAgLy9TdGF0ZSAxMDogRGlzY29ubmVjdGVkXHJcbiAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgdmFyIExCQyA9IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkxvYWRCYWxhbmNpbmdDbGllbnQ7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU3RhdGVDb2RlOiBcIiArIHN0YXRlICsgXCIgXCIgKyBMQkMuU3RhdGVUb05hbWUoc3RhdGUpKTtcclxuXHJcbiAgICAgIGlmIChzdGF0ZSA9PSAxKSBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwiY29ubmVjdGluZyB0byBzZXJ2ZXIuLi5cIik7XHJcbiAgICAgIGVsc2UgaWYgKHN0YXRlID09IDQpIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJjb25uZWN0ZWQgdG8gc2VydmVyXCIpO1xyXG4gICAgICBlbHNlIGlmIChzdGF0ZSA9PSA1KSB7XHJcbiAgICAgICAgLy9oYXMgam9pbmVkIGxvYmJ5XHJcbiAgICAgICAgaWYgKFNob3dSb29tID09IGZhbHNlKSB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwid2FpdGluZyBmb3Igb3RoZXIgcGxheWVycy4uLlwiKTtcclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luUmFuZG9tUm9vbSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoU2hvd1Jvb20gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInNob3dpbmcgcm9vbXMgbGlzdC4uLlwiKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKHRydWUpO1xyXG4gICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZGVidWdcclxuICAgICAgICAgICAgQG1ldGhvZCBkZWJ1Z1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZGVidWcgPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBpbmZvXHJcbiAgICAgICAgICAgIEBtZXRob2QgaW5mb1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW1cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYubG9nZ2VyLmluZm8gPSBmdW5jdGlvbiAobWVzcywgcGFyYW0pIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyArIHBhcmFtKTtcclxuICAgICAgc3RhdGVUZXh0ICs9IG1lc3MgKyBcIiBcIiArIHBhcmFtICsgXCJcXG5cIjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyB3YXJuXHJcbiAgICAgICAgICAgIEBtZXRob2Qgd2FyblxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0xXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTJcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtM1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIud2FybiA9IGZ1bmN0aW9uIChtZXNzLCBwYXJhbTEsIHBhcmFtMiwgcGFyYW0zKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MgKyBcIiBcIiArIHBhcmFtMSArIFwiIFwiICsgcGFyYW0yICsgXCIgXCIgKyBwYXJhbTMpO1xyXG5cclxuICAgICAgaWYgKHBhcmFtMSA9PSAyMjUpIHtcclxuICAgICAgICAvL25vIHJvb20gZm91bmRcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5vIHJhbmRvbSByb29tIHdhcyBmb3VuZCwgY3JlYXRpbmcgb25lXCIpO1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DcmVhdGVSb29tKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJhbTEgPT0gMjI2KSB7XHJcbiAgICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUm9vbSBkb2VzIG5vdCBleGlzdHMgYW55bW9yZSxwbGVhc2UgdHJ5IGFnYWluIGJ5IGV4aXRpbmcuXCIpO1xyXG4gICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNsZWFyVGltZXIoKTtcclxuICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5TZXRDb25uZXRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9yb29tIGRvZXMgbm90IGV4aXN0cyBvciBpcyBmdWxsXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUm9vbSBpcyBmdWxsLCBwbGVhc2Ugc2VsZWN0IGFueSBvdGhlciByb29tIHRvIHNwZWN0YXRlLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBlcnJvclxyXG4gICAgICAgICAgICBAbWV0aG9kIGVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZXJyb3IgPSBmdW5jdGlvbiAobWVzcywgcGFyYW0pIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5leGNlcHRpb24gPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBzb21lIGZvcm1hdFxyXG4gICAgICAgICAgICBAbWV0aG9kIGZvcm1hdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZm9ybWF0ID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHBsYXllciBqb2lucyBsb2JieVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uUm9vbUxpc3QgPSBmdW5jdGlvbiAocm9vbXMpIHtcclxuICAgICAgc3RhdGVUZXh0ICs9IFwiXFxuXCIgKyBcIlJvb21zIExpc3Q6XCIgKyBcIlxcblwiO1xyXG5cclxuICAgICAgaWYgKHJvb21zLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgc3RhdGVUZXh0ICs9IFwiTm8gcm9vbXMgaW4gbG9iYnkuXCIgKyBcIlxcblwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUsIHJvb21zW2ldLnBsYXllckNvdW50KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbSBuYW1lOiBcIiArIHJvb21zW2ldLm5hbWUpO1xyXG4gICAgICAgICAgc3RhdGVUZXh0ICs9IFwiUm9vbTogXCIgKyByb29tc1tpXS5uYW1lICsgXCJcXG5cIjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgdGhlcmUgaXMgY2hhbmdlIGluIHJvb21zIGxpc3QgKHJvb20gYWRkZWQsdXBkYXRlZCxyZW1vdmVkIGV0YylcclxuICAgICAgICAgICAgQG1ldGhvZCBvblJvb21MaXN0VXBkYXRlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNVcGRhdGVkXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc0FkZGVkXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1JlbW92ZWRcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Sb29tTGlzdFVwZGF0ZSA9IGZ1bmN0aW9uIChyb29tcywgcm9vbXNVcGRhdGVkLCByb29tc0FkZGVkLCByb29tc1JlbW92ZWQpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5SZXNldFJvb21MaXN0KCk7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5VcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShyb29tc1tpXS5uYW1lLCByb29tc1tpXS5wbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSb29tIG5hbWU6IFwiICsgcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgc3RhdGVUZXh0ICs9IFwiUm9vbTogXCIgKyByb29tc1tpXS5uYW1lICsgXCJcXG5cIjtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhcIlJvb21zIExpc3QgdXBkYXRlZDogXCIgKyByb29tc1VwZGF0ZWQubGVuZ3RoICsgXCIgdXBkYXRlZCwgXCIgKyByb29tc0FkZGVkLmxlbmd0aCArIFwiIGFkZGVkLCBcIiArIHJvb21zUmVtb3ZlZC5sZW5ndGggKyBcIiByZW1vdmVkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGxvY2FsbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uSm9pblJvb21cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Kb2luUm9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8jcmVnaW9uIExvZ3MgZm9yIGdhbWVcclxuICAgICAgY29uc29sZS5sb2coXCJHYW1lIFwiICsgdGhpcy5teVJvb20oKS5uYW1lICsgXCIgam9pbmVkXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlBY3RvcigpKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGgpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKVswXS5sb2FkQmFsYW5jaW5nQ2xpZW50LnVzZXJJZCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKS5fY3VzdG9tUHJvcGVydGllcyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0pO1xyXG4gICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IHRydWUpIHtcclxuICAgICAgICAvL2NoZWNrIGlmIHBsYXllciB3aG8gam9pbmVkIGlzIHNwZWN0YXRlXHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7XHJcbiAgICAgICAgfSwgMTAwMCk7IC8vZnVuY3Rpb24gaW4gVUlNYW5hZ2VyXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRXhpdENvbm5lY3RpbmcpIHtcclxuICAgICAgLy8gICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2xlYXJUaW1lcigpO1xyXG4gICAgICAvLyAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5TZXRDb25uZXRpbmcoZmFsc2UpO1xyXG4gICAgICAvLyAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFJvb21WYWx1ZXMoKTtcclxuICAgICAgLy8gICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Qcm9jZXNzQ291bnRlcigpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgcmVtb3RlbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JKb2luXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIChQaG90b25SZWYub25BY3RvckpvaW4gPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgdmFyIF9yZWFsUGxheWVyID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkdldFJlYWxBY3RvcnMoKTtcclxuXHJcbiAgICAgIGlmIChfcmVhbFBsYXllciA9PSBNYXhTdHVkZW50cykge1xyXG4gICAgICAgIC8vd2hlbiBtYXggcGxheWVyIHJlcXVpcmVkIHRvIHN0YXJ0IGdhbWUgaGFzIGJlZW4gYWRkZWRcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgcmVxdWlyZWQgcGxheWVycyBqb2luZWQsIHN0YXJ0aW5nIHRoZSBnYW1lLi5cIik7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7XHJcbiAgICAgICAgfSwgMTAwMCk7IC8vZnVuY3Rpb24gaW4gdWkgbWFuYWdlclxyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyh0cnVlLCBQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBudWxsLCBmYWxzZSwgMCk7XHJcbiAgICAgICAgLy9QaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJcIixQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpLHRydWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KGFjdG9yLmFjdG9yTnIpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGpvaW5lZFwiKTtcclxuICAgICAgLy8gY29uc29sZS5lcnJvcihcIlRvdGFsIFBsYXllcnM6IFwiK1Bob3RvblJlZi5teVJvb21BY3RvckNvdW50KCkpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkpO1xyXG4gICAgfSksXHJcbiAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgcmVtb3RlbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgbGVhdmVzIGEgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JMZWF2ZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICAgIChQaG90b25SZWYub25BY3RvckxlYXZlID0gZnVuY3Rpb24gKGFjdG9yKSB7XHJcbiAgICAgICAgaWYgKCFHYW1lRmluaXNoZWQgJiYgIVJlc3RhcnRTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID09IHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKCFhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTGVhdmVSb29tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0b3IuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3BlY3RhdG9yIGxlZnQsIHNvIGRvbnQgbWluZCwgY29udCBnYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgUGhvdG9uUmVmZXJlY2UgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuZ2V0UGhvdG9uUmVmKCk7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfcGxheWVyVHVybiA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgdmFyIF91SUdhbWVNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgdmFyIF9yZWFsUGxheWVyID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkdldFJlYWxBY3RvcnMoKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIF9pbml0aWFsU2V0dXBEb25lID0gUGhvdG9uUmVmZXJlY2UubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgbGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3JlYWxQbGF5ZXIgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSGFuZGxlUGxheWVyTGVhdmUoYWN0b3IsIFBob3RvblJlZmVyZWNlLCBfbWFuYWdlciwgX3BsYXllclR1cm4sIF9pbml0aWFsU2V0dXBEb25lLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX3VJR2FtZU1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3VJR2FtZU1hbmFnZXIuU2hvd1RvYXN0KFwicGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDExNTAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKF9pbml0aWFsU2V0dXBEb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVBY3RvckFjdGl2ZURhdGEoYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLkdhbWVPdmVyKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF91SUdhbWVNYW5hZ2VyKSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzdGFydEdhbWUoMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc3RhcnRHYW1lKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfdUlHYW1lTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdUlHYW1lTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTE1MCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLmdldFNjZW5lTmFtZSgpID09IFwiR2FtZVBsYXlcIikgLy9pZiBzY2VuZSBpcyBnYW1lcGxheSBsZXQgcGxheWVyIGZpbmlzaCBnYW1lIGZvcmNlZnVsbHlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIm90aGVyIHBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0sIDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF91SUdhbWVNYW5hZ2VyLlNob3dUb2FzdChcInBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAxMTUwLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfcmVhbFBsYXllciA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5IYW5kbGVQbGF5ZXJMZWF2ZShhY3RvciwgUGhvdG9uUmVmZXJlY2UsIF9tYW5hZ2VyLCBfcGxheWVyVHVybiwgX2luaXRpYWxTZXR1cERvbmUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX2luaXRpYWxTZXR1cERvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuR2FtZU92ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBoYXMgbGVmdFwiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKElzR2FtZVN0YXJ0ZWQpO1xyXG4gICAgICAgICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUgJiYgIUlzR2FtZVN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUHJvY2Vzc0NvdW50ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpID09IDEgJiYgIVJlc3RhcnRTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgUmVzdGFydFNwZWN0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXN0YXJ0R2FtZSgxNTAwKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZWF0cnRlZFwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgb3duIHByb3BlcnRpZXMgZ290IGNoYW5nZWRcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9yUHJvcGVydGllc0NoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25BY3RvclByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoYWN0b3IpIHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgcm9vbSBwcm9wZXJ0aWVzIGdvdCBjaGFuZ2VkXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbk15Um9vbVByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoX2RhdGEpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB0byBoYW5kbGUgZXJyb3JzXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25FcnJvclxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gZXJyb3JDb2RlXHJcbiAgICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gZXJyb3JNc2dcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25FcnJvciA9IGZ1bmN0aW9uIChlcnJvckNvZGUsIGVycm9yTXNnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBlcnJvckNvZGUgKyBcIjogXCIgKyBlcnJvck1zZyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGFuIGV2ZW50IGlzIHJlY2VpdmVkIHdpdGggc29tZSBkYXRhXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25FdmVudFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gY29kZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gY29udGVudFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JOclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkV2ZW50ID0gZnVuY3Rpb24gKGNvZGUsIGNvbnRlbnQsIGFjdG9yTnIpIHtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBzd2l0Y2ggKGNvZGUpIHtcclxuICAgICAgICBjYXNlIDE6IC8vcmVjZXZpbmcgcGxheWVyZGF0YSBpbmZvXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBsYXllciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIFBsYXllckluZm9EYXRhID0gY29udGVudC5QbGF5ZXJJbmZvO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEsIHNlbmRlck5hbWUsIHNlbmRlcklELCBQbGF5ZXJJbmZvRGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOiAvL3N0YXJ0IHR1cm4gcmFpc2UgZXZlbnRcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgc3RhcnQgdHVybiBldmVudFwiKTtcclxuICAgICAgICAgIHZhciBfVHVybiA9IGNvbnRlbnQuVHVybk51bWJlcjtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX1R1cm4pO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzogLy8gZGljZSBjb3VudFxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkaWNlIGNvdW50XCIpO1xyXG4gICAgICAgICAgdmFyIF9kaWNlID0gY29udGVudC5EaWNlQ291bnQ7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kaWNlKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQ6IC8vcmVjZWluZyB1c2VyIGlkIG9mIHBsYXllciB3aG8gaGFzIGNvbXBsZXRlZCB0dXJuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBsYXllciB0dXJuIGNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgIHZhciBfSUQgPSBjb250ZW50LlVJRDtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg0LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX0lEKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6IC8vcmVjZWl2aW5nIGNhcmQgZGF0YSAoaW5kZXgpIHNvIG90aGVyIHVzZXJzIGNhbiBzeW5jIHRoZW1cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgY2FyZCBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9jYXJkID0gY29udGVudC5DYXJkRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg1LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2NhcmQpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNjogLy9yZWNlaXZlIGdhbWUgb3ZlciBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGdhbWUgb3ZlciBjYWxsXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDYsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OiAvL3JlY2VpdmUgb25lIFF1ZXN0aW9uIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgb25lIHF1ZXN0aW9uIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDg6IC8vcmVjZWl2ZSBvbmUgUXVlc3Rpb24gcmVzcG9uc2UgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBvbmUgcXVlc3RpbyByZXNwb25zZSBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDgsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA5OiAvL3JlY2VpdmUgYmFua3J1cHQgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBiYW5rcnVwdCBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDksIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMDogLy9yZWNlaXZlIGJhY2tzcGFjZSBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGJhY2tzcGFjZSBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEwLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTE6IC8vcmVjZWl2ZWluZyBwYXJ0bmVyc2hpcCBvZmZlclxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBvZmZlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDExLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTI6IC8vcmVjZWl2ZWluZyBwYXJ0bmVyc2hpcCBhbnN3ZXIgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBhbndzZXIgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEzOiAvL3JlY2VpdmluZyBwcm9maXQvbG9zcyBkYXRhIGZvciBwYXJ0bmVyXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEzLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTQ6IC8vcmVjZWl2aW5nIHJvb20gY29tcGxldGUgZGF0YSB0byBzdGFydCBHYW1lXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Sb29tQ29tcGxldGVkKCk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNTogLy9yZWNlaXZpbmcgcGF5ZGF5IGluZm9cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgaW5mb1wiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxNSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE2OiAvL3JlY2VpdmluZyBnYW1lIG92ZXIgZGF0YSB0byBzeW5jXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGdhbWUgb3ZlciBzeW5jIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTYsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNzogLy9yZWNlaXZpbmcgZGF0YSBvZiBwbGF5ZXIgdG8gZ2V0IGFsbCBwcm9maXQgbmV4dCBwYXkgZGF5XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRhdGEgb2YgcGxheWVyIHRvIGdldCBhbGwgcHJvZml0IG5leHQgcGF5IGRheVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxNywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE4OiAvL3JlY2VpdmluZyBvbmUgcXVlc3Rpb24gYXJyYXlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGF0YSBmb3Igb25lIHF1ZXN0aW9uIGFycmF5XCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE4LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTk6IC8vcmVjZWl2aW5nIGRlY2tzIGFycmF5XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRhdGEgZm9yIGRlY2tzIGFycmF5XCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE5LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjA6IC8vcmVjZWl2aW5nIGRlY2tzIGFycmF5IENvdW50ZXJcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGF0YSBmb3IgZGVja3MgYXJyYXkgY291bnRlclwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyMCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aXBsYXllckNvbnRyb2xsZXI7XHJcbiJdfQ==