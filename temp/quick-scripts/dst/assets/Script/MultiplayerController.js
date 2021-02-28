
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
  GetBankruptedStatus: function GetBankruptedStatus(_uID) {
    if (_uID === void 0) {
      _uID = "";
    }

    var _isBankrupted = false;
    var _array = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo;

    for (var index = 0; index < _array.length; index++) {
      if (_array[index].PlayerUID == _uID) {
        if (_array[index].CardFunctionality.BankruptedNextTurn == true) {
          _isBankrupted = true;
        }
      }
    }

    return _isBankrupted;
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
  SendTakeBusinessData: function SendTakeBusinessData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.trace("Send Take Business Data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(23, {
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
  SendDamagingData: function SendDamagingData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.trace("Send player received damaging data");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(24, {
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
  SendDamagingDecisionData: function SendDamagingDecisionData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.trace("Send player received damaging data decision");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(25, {
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
  SendBuyHalfBusinessData: function SendBuyHalfBusinessData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.trace("Send player received damaging data decision");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(26, {
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
  SendCashDeductData: function SendCashDeductData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending SendCashDeductData"); //  console.log(_data);

      try {
        PhotonRef.raiseEvent(21, {
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
  SendCashAdditionData: function SendCashAdditionData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.log("sending SendCashAdditionData"); //  console.log(_data);

      try {
        PhotonRef.raiseEvent(22, {
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

        case 21:
          //receiving cash deduct data
          console.log("received cash deduct data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(21, senderName, senderID, _data);
          break;

        case 22:
          //receiving cash add data
          console.log("received cash add data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(22, senderName, senderID, _data);
          break;

        case 23:
          //receiving take over business data
          console.log("receiving take over business data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(23, senderName, senderID, _data);
          break;

        case 24:
          //receiving damaging information
          console.log("receiving damaging information");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(24, senderName, senderID, _data);
          break;

        case 25:
          //receiving damaging information
          console.log("receiving damaging information Decison");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(25, senderName, senderID, _data);
          break;

        case 26:
          //receiving buy half business data
          console.log("receiving buy half business data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(26, senderName, senderID, _data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJHYW1lRmluaXNoZWQiLCJJc01hc3RlckNsaWVudCIsIlRvdGFsVGltZXIiLCJUaW1lclN0YXJ0ZWQiLCJTY2hlZHVsYXIiLCJNYXhTdHVkZW50cyIsIlJlc3RhcnRTcGVjdGF0ZSIsIklzR2FtZVN0YXJ0ZWQiLCJUaW1lb3V0cyIsIlJvb21Qcm9wZXJ0eSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllciIsInR5cGUiLCJJbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiSW5pdGlhbFNldHVwIiwiQm9vbGVhbiIsIlBsYXllckdhbWVJbmZvIiwiVGV4dCIsIlR1cm5OdW1iZXIiLCJBcHBfSW5mbyIsIkFwcElEIiwidG9vbHRpcCIsIkFwcFZlcnNpb24iLCJXc3MiLCJkaXNwbGF5TmFtZSIsIk1hc3RlclNlcnZlciIsIkZiQXBwSUQiLCJNdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDb21wb25lbnQiLCJQaG90b25BcHBJbmZvIiwiTWF4UGxheWVycyIsIk1heFNwZWN0YXRvcnMiLCJNb2RlU2VsZWN0aW9uIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwiUmVzZXRSb29tVmFsdWVzIiwib25Mb2FkIiwiRXhpdENvbm5lY3RpbmciLCJJbml0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZU1vZGVTZWxlY3Rpb24iLCJfdmFsIiwiU2V0Q29ubmV0aW5nIiwiX3N0YXRlIiwiR2V0QWN0aXZlU3RhdHVzIiwiX3VJRCIsIl9pc0FjdGl2ZSIsIl9hcnJheSIsIkdldF9HYW1lTWFuYWdlciIsImluZGV4IiwibGVuZ3RoIiwiUGxheWVyVUlEIiwiSXNBY3RpdmUiLCJHZXRCYW5rcnVwdGVkU3RhdHVzIiwiX2lzQmFua3J1cHRlZCIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiQmFua3J1cHRlZE5leHRUdXJuIiwiR2V0U2VsZWN0ZWRNb2RlIiwiZ2FtZSIsImFkZFBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJJbml0aWFsaXplUGhvdG9uIiwiY29uc29sZSIsImxvZyIsIkFwcEluZm8iLCJEZW1vTG9hZEJhbGFuY2luZyIsIkxlYXZlUm9vbSIsIlJvb21OYW1lIiwiTWVzc2FnZSIsIkpvaW5lZFJvb20iLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJnZXRTY2VuZU5hbWUiLCJzY2VuZU5hbWUiLCJfc2NlbmVJbmZvcyIsImkiLCJ1dWlkIiwiZGlyZWN0b3IiLCJfc2NlbmUiLCJfaWQiLCJ1cmwiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsIm1hdGNoIiwiVG9nZ2xlU2hvd1Jvb21fQm9vbCIsIlRvZ2dsZUxlYXZlUm9vbV9Cb29sIiwiZ2V0UGhvdG9uUmVmIiwiUGhvdG9uQWN0b3IiLCJteUFjdG9yIiwiUm9vbUFjdG9ycyIsIm15Um9vbUFjdG9yc0FycmF5IiwiQ2hlY2tTcGVjdGF0ZSIsImN1c3RvbVByb3BlcnRpZXMiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJBcHBJZCIsIkZiQXBwSWQiLCJSZXF1ZXN0Q29ubmVjdGlvbiIsInN0YXRlIiwiaXNDb25uZWN0ZWRUb01hc3RlciIsImlzSW5Mb2JieSIsInN0YXJ0IiwiQ2hlY2tDb25uZWN0aW9uU3RhdGUiLCJfY29ubmVjdGVkIiwiaXNKb2luZWRUb1Jvb20iLCJEaXNjb25uZWN0UGhvdG9uIiwiZGlzY29ubmVjdCIsIlJlc2V0U3RhdGUiLCJPblJvb21OYW1lQ2hhbmdlIiwiT25NZXNzYWdlQ2hhbmdlIiwibXNnIiwiVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXMiLCJfcGxheWVyVXBkYXRlIiwiX3BsYXllclZhbHVlIiwiX2luaXRpYWxTZXR1cFVwZGF0ZSIsIl9pbml0aWFsU2V0dXBWYWx1ZSIsIl9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSIsIl9wbGF5ZXJHYW1lSW5mb1ZhbHVlIiwiX3R1cm5OdW1iZXJVcGRhdGUiLCJfdHVybk51bWJlcnZhbHVlIiwibXlSb29tIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDcmVhdGVSb29tIiwiX2RhdGEiLCJyb29tT3B0aW9ucyIsImlzVmlzaWJsZSIsImlzT3BlbiIsIm1heFBsYXllcnMiLCJjdXN0b21HYW1lUHJvcGVydGllcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsIlN0dWRlbnREYXRhIiwiQ291bnRlciIsInNldFVzZXJJZCIsInVzZXJJRCIsIlJvb21JRCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIkRhdGUiLCJub3ciLCJjcmVhdGVSb29tIiwiSm9pblJvb20iLCJfcm9vbU5hbWUiLCJqb2luUm9vbSIsIkpvaW5SYW5kb21Sb29tIiwiZXhwZWN0ZWRDdXN0b21Sb29tUHJvcGVydGllcyIsImpvaW5SYW5kb21Sb29tIiwiU2VuZENhcmREYXRhIiwicmFpc2VFdmVudCIsIkNhcmREYXRhIiwic2VuZGVyTmFtZSIsInNlbmRlcklEIiwiYWN0b3JOciIsInJlY2VpdmVycyIsIlBob3RvbiIsIkxvYWRCYWxhbmNpbmciLCJDb25zdGFudHMiLCJSZWNlaXZlckdyb3VwIiwiQWxsIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwiU2VuZEdhbWVPdmVyIiwiRGF0YSIsIlNlbmRHYW1lT3ZlckRhdGEiLCJTZW5kU2VsZWN0ZWRQbGF5ZXJGb3JQcm9maXQiLCJPdGhlcnMiLCJTZW5kQmFua3J1cHREYXRhIiwiU2VuZERhdGEiLCJQbGF5ZXJJbmZvIiwiU2VuZE9uZVF1ZXN0aW9uRGF0YSIsIlNlbmRPbmVRdWVzdGlvbkFycmF5cyIsIlNlbmREZWNrc0FycmF5cyIsIlNlbmREZWNrc0FycmF5Q291bnRlciIsIlNlbmRQYXJ0bmVyUHJvZml0TG9zcyIsIlNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YSIsIkRpY2VSb2xsRXZlbnQiLCJEaWNlQ291bnQiLCJTZW5kR29CYWNrU3BhY2VEYXRhIiwiU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhIiwiU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YSIsIlNlbmRJbmZvIiwiU3luY1R1cm5Db21wbGV0aW9uIiwiVUlEIiwiU3RhcnRUdXJuIiwidHJhY2UiLCJTZW5kVGFrZUJ1c2luZXNzRGF0YSIsIlNlbmREYW1hZ2luZ0RhdGEiLCJTZW5kRGFtYWdpbmdEZWNpc2lvbkRhdGEiLCJTZW5kQnV5SGFsZkJ1c2luZXNzRGF0YSIsIlNob3dUb2FzdCIsIkNhbGxSZWNpZXZlRXZlbnQiLCJfZXZlbnRDb2RlIiwiX3NlbmRlck5hbWUiLCJfc2VuZGVySUQiLCJJbnN0YW5jZU51bGwiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsInNldFRpbWVvdXQiLCJSZWNlaXZlRXZlbnQiLCJEaXNjb25uZWN0RGF0YSIsIlJlc3RhcnRHYW1lIiwiX3RpbWVyIiwiY2xlYXJUaW1lb3V0IiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsImxvYWRTY2VuZSIsIkNoZWNrTWFzdGVyQ2xpZW50IiwiX2lzTWFzdGVyIiwibXlSb29tTWFzdGVyQWN0b3JOciIsIkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCIsIkdldFJlYWxBY3RvcnMiLCJfcmVhbFBsYXllciIsIkFsbFBsYXllcnMiLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIlJvb21Db3VudGVyIiwiU2VuZFJvb21Db21wbGV0ZWREYXRhIiwiR2V0X1VJTWFuYWdlciIsIkNsZWFyVGltZXIiLCJQcm9jZXNzQ291bnRlciIsIl9tYXN0ZXIiLCJfY291bnRlciIsIlNlbmRDYXNoRGVkdWN0RGF0YSIsIlNlbmRDYXNoQWRkaXRpb25EYXRhIiwiUm9vbUNvbXBsZXRlZCIsInN5c3RlbUV2ZW50IiwiZW1pdCIsInB1c2giLCJVcGRhdGVBY3RvckFjdGl2ZURhdGEiLCJfYWN0b3IiLCJfYWN0b3JzQXJyYXkiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkhhbmRsZVBsYXllckxlYXZlIiwiYWN0b3IiLCJQaG90b25SZWZlcmVjZSIsIl9tYW5hZ2VyIiwiX3BsYXllclR1cm4iLCJfaW5pdGlhbFNldHVwRG9uZSIsIl9pc1NwZWN0YXRlIiwiUmVtb3ZlRnJvbUNoZWNrQXJyYXkiLCJ0b1N0cmluZyIsIkNoZWNrVHVybkNvbXBsZXRlIiwiQ2hhbmdlVHVybkZvcmNlZnVsbHkiLCJTZXRQbGF5ZXJMZWZ0IiwiUmVzZXRTb21lVmFsdWVzIiwiX3BsYXllcmZvdW5kIiwic3BsaWNlIiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU3luY0RhdGEiLCJ1cGRhdGUiLCJkdCIsIm9uU3RhdGVDaGFuZ2UiLCJMQkMiLCJMb2FkQmFsYW5jaW5nQ2xpZW50IiwiU3RhdGVUb05hbWUiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJsb2dnZXIiLCJkZWJ1ZyIsIm1lc3MiLCJpbmZvIiwicGFyYW0iLCJ3YXJuIiwicGFyYW0xIiwicGFyYW0yIiwicGFyYW0zIiwiVG9nZ2xlTG9hZGluZ05vZGUiLCJleGNlcHRpb24iLCJmb3JtYXQiLCJvblJvb21MaXN0Iiwicm9vbXMiLCJSZXNldFJvb21MaXN0IiwiVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkiLCJwbGF5ZXJDb3VudCIsIm9uUm9vbUxpc3RVcGRhdGUiLCJyb29tc1VwZGF0ZWQiLCJyb29tc0FkZGVkIiwicm9vbXNSZW1vdmVkIiwib25Kb2luUm9vbSIsImxvYWRCYWxhbmNpbmdDbGllbnQiLCJ1c2VySWQiLCJfY3VzdG9tUHJvcGVydGllcyIsIm9uQWN0b3JKb2luIiwibXlSb29tQWN0b3JDb3VudCIsIm9uQWN0b3JMZWF2ZSIsIkdhbWVPdmVyIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIkdldFR1cm5OdW1iZXIiLCJfdUlHYW1lTWFuYWdlciIsIm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlIiwib25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlIiwib25FcnJvciIsImVycm9yQ29kZSIsImVycm9yTXNnIiwib25FdmVudCIsImNvZGUiLCJjb250ZW50IiwiUGxheWVySW5mb0RhdGEiLCJfVHVybiIsIl9kaWNlIiwiX0lEIiwiX2NhcmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsU0FBSjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsS0FBckI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsSUFBaEI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxJQUFJQyxlQUFlLEdBQUcsS0FBdEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsS0FBcEI7QUFDQSxJQUFJQyxRQUFRLEdBQUcsRUFBZixFQUVBOztBQUNBLElBQUlDLFlBQVksR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDMUJDLEVBQUFBLElBQUksRUFBRSxjQURvQjtBQUUxQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLE1BQU0sRUFBRTtBQUNOLGlCQUFTLENBREg7QUFFTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLE9BRkg7QUFHTkMsTUFBQUEsWUFBWSxFQUFFO0FBSFIsS0FERTtBQU1WQyxJQUFBQSxZQUFZLEVBQUU7QUFDWixpQkFBUyxLQURHO0FBRVpILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUyxPQUZHO0FBR1pGLE1BQUFBLFlBQVksRUFBRTtBQUhGLEtBTko7QUFXVkcsSUFBQUEsY0FBYyxFQUFFO0FBQ2QsaUJBQVMsRUFESztBQUVkTCxNQUFBQSxJQUFJ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RytJLE9BQU8sQ0FBQy9JLFFBQXZCO0FBRUEvSCxVQUFBQSxxQkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0JnSyxnQkFBL0IsQ0FBZ0QsRUFBaEQsRUFBb0R6QyxVQUFwRCxFQUFnRUMsUUFBaEUsRUFBMEU3QixLQUExRTtBQUVBOztBQUNGLGFBQUssRUFBTDtBQUFTO0FBQ1AvRCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx3Q0FBWjtBQUNBLGNBQUk4RCxLQUFLLEdBQUc0SyxPQUFPLENBQUNuSSxJQUFwQjtBQUNBLGNBQUliLFVBQVUsR0FBR2dKLE9BQU8sQ0FBQ2hKLFVBQXpCO0FBQ0EsY0FBSUMsUUFBUSxHQUFHK0ksT0FBTyxDQUFDL0ksUUFBdkI7QUFFQS9ILFVBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQmdLLGdCQUEvQixDQUFnRCxFQUFoRCxFQUFvRHpDLFVBQXBELEVBQWdFQyxRQUFoRSxFQUEwRTdCLEtBQTFFO0FBRUE7O0FBQ0YsYUFBSyxFQUFMO0FBQVM7QUFDUC9ELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtDQUFaO0FBQ0EsY0FBSThELEtBQUssR0FBRzRLLE9BQU8sQ0FBQ25JLElBQXBCO0FBQ0EsY0FBSWIsVUFBVSxHQUFHZ0osT0FBTyxDQUFDaEosVUFBekI7QUFDQSxjQUFJQyxRQUFRLEdBQUcrSSxPQUFPLENBQUMvSSxRQUF2QjtBQUVBL0gsVUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCZ0ssZ0JBQS9CLENBQWdELEVBQWhELEVBQW9EekMsVUFBcEQsRUFBZ0VDLFFBQWhFLEVBQTBFN0IsS0FBMUU7QUFFQTs7QUFDRjtBQTVPRjtBQThPRCxLQWhQRDtBQWlQRDtBQWw2RGtDLENBQVQsQ0FBNUI7QUFxNkRBa0wsTUFBTSxDQUFDQyxPQUFQLEdBQWlCclIscUJBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJpYWJsZXNcclxudmFyIFBob3RvblJlZjtcclxudmFyIHN0YXRlVGV4dCA9IFwiXCI7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgU2hvd1Jvb20gPSBmYWxzZTtcclxudmFyIEdhbWVGaW5pc2hlZCA9IGZhbHNlO1xyXG52YXIgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxudmFyIFRvdGFsVGltZXIgPSAzMDtcclxudmFyIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG52YXIgU2NoZWR1bGFyID0gbnVsbDtcclxudmFyIE1heFN0dWRlbnRzID0gNjtcclxudmFyIFJlc3RhcnRTcGVjdGF0ZSA9IGZhbHNlO1xyXG52YXIgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG52YXIgVGltZW91dHMgPSBbXTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIFJvb21Qcm9wZXJ0eS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSb29tUHJvcGVydHkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJSb29tUHJvcGVydHlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXI6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEluaXRpYWxTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUdXJuTnVtYmVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIEFwcF9JbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEFwcF9JbmZvID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQXBwX0luZm9cIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBBcHBJRDoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQXBwIGlkIGZvcm0gcGhvdG9uIGRhc2hib2FyZFwiLFxyXG4gICAgfSxcclxuICAgIEFwcFZlcnNpb246IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFwcCB2ZXJzaW9uIGZvciBwaG90b25cIixcclxuICAgIH0sXHJcbiAgICBXc3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNTZWN1cmVcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJJZiBwaG90b24gc2hvdWxkIHVzZSBzZWN1cmUgYW5kIHJlbGlhYmxlIHByb3RvY29sc1wiLFxyXG4gICAgfSxcclxuICAgIE1hc3RlclNlcnZlcjoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibWFzdGVyIHNlcnZlciBmb3IgcGhvdG9uIHRvIGNvbm5lY3RcIixcclxuICAgIH0sXHJcbiAgICBGYkFwcElEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJGQiBhcHAgaWQgdXNlZCBmb3IgRkIgYXV0aGVyaXphdGlvblwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBNdWx0aXBsYXllckNvbnRyb2xsZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJNdWx0aXBsYXllckNvbnRyb2xsZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGhvdG9uQXBwSW5mbzoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBBcHBfSW5mbyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1heFBsYXllcnM6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1heFNwZWN0YXRvcnM6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1vZGVTZWxlY3Rpb246IHtcclxuICAgICAgLy8gMSBtZWFucyBib3QgLCAyIG1lYW5zIHJlYWwgcGxheWVyc1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIC8vY3JlYXRpbmcgc3RhdGljIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxEYXRhKCkge1xyXG4gICAgVGltZW91dHMgPSBbXTtcclxuICAgIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIFBob3RvblJlZiA9IG51bGw7XHJcbiAgICBzdGF0ZVRleHQgPSBcIlwiO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIFNob3dSb29tID0gZmFsc2U7XHJcbiAgICBHYW1lRmluaXNoZWQgPSBmYWxzZTtcclxuICAgIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbiAgICBUb3RhbFRpbWVyID0gMzA7XHJcbiAgICBUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIFNjaGVkdWxhciA9IG51bGw7XHJcbiAgICB0aGlzLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgTWF4U3R1ZGVudHMgPSA2O1xyXG4gICAgUmVzdGFydFNwZWN0YXRlID0gZmFsc2U7XHJcbiAgfSxcclxuICAvL3RoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBpcyBjcmVhdGVkXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5FeGl0Q29ubmVjdGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5SZXNldEFsbERhdGEoKTtcclxuICAgIHRoaXMuSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVNb2RlU2VsZWN0aW9uKFxyXG4gICAgX3ZhbCAvLyAxIG1lYW5zIGJvdCAsIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXHJcbiAgKSB7XHJcbiAgICB0aGlzLk1vZGVTZWxlY3Rpb24gPSBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFNldENvbm5ldGluZyhfc3RhdGUpIHtcclxuICAgIHRoaXMuRXhpdENvbm5lY3RpbmcgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgR2V0QWN0aXZlU3RhdHVzKF91SUQgPSBcIlwiKSB7XHJcbiAgICB2YXIgX2lzQWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgX2FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfYXJyYXlbaW5kZXhdLlBsYXllclVJRCA9PSBfdUlEKSB7XHJcbiAgICAgICAgaWYgKF9hcnJheVtpbmRleF0uSXNBY3RpdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIF9pc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfaXNBY3RpdmU7XHJcbiAgfSxcclxuXHJcbiAgR2V0QmFua3J1cHRlZFN0YXR1cyhfdUlEID0gXCJcIikge1xyXG4gICAgdmFyIF9pc0JhbmtydXB0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgX2FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfYXJyYXlbaW5kZXhdLlBsYXllclVJRCA9PSBfdUlEKSB7XHJcbiAgICAgICAgaWYgKF9hcnJheVtpbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuQmFua3J1cHRlZE5leHRUdXJuID09IHRydWUpIHtcclxuICAgICAgICAgIF9pc0JhbmtydXB0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfaXNCYW5rcnVwdGVkO1xyXG4gIH0sXHJcblxyXG4gIEdldFNlbGVjdGVkTW9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLk1vZGVTZWxlY3Rpb247XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBJbml0aWFsaXplIHNvbWUgZXNzZW50YWlscyBkYXRhIGZvciBtdWx0aXBsYXllciBjb250cm9sbGVyIGNsYXNzXHJcbiAgICBAbWV0aG9kIEluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkge1xyXG4gICAgaWYgKCFNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UpIHtcclxuICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgdGhpcy5Jbml0aWFsaXplUGhvdG9uKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKEFwcEluZm8pO1xyXG4gICAgICBQaG90b25SZWYgPSBuZXcgRGVtb0xvYWRCYWxhbmNpbmcoKTtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLkxlYXZlUm9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5Sb29tTmFtZSA9IFwiXCI7XHJcbiAgICB0aGlzLk1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgU2hvd1Jvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNoZWNrIHJlZmVyZW5jZSB0byBzb21lIHZhcmlhYmxlcyBhbmQgY2xhc3Nlc1xyXG4gICAgQG1ldGhvZCBDaGVja1JlZmVyZW5jZXNcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZW1vdmUgcGVyc2lzdCBub2RlIHdoZW4gd2FudCB0byByZXN0YXJ0IHNjZW5lXHJcbiAgICBAbWV0aG9kIFJlbW92ZVBlcnNpc3ROb2RlXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFJlbW92ZVBlcnNpc3ROb2RlKCkge1xyXG4gICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlID0gbnVsbDtcclxuICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBnZXQgbmFtZSBvZiBjdXJyZW50IG9wZW5lZCBzY2VuZVxyXG4gICAgQG1ldGhvZCBnZXRTY2VuZU5hbWVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7c3RyaW5nfSBzY2VuZU5hbWVcclxuICAgICoqL1xyXG4gIGdldFNjZW5lTmFtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNjZW5lTmFtZTtcclxuICAgIHZhciBfc2NlbmVJbmZvcyA9IGNjLmdhbWUuX3NjZW5lSW5mb3M7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9zY2VuZUluZm9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChfc2NlbmVJbmZvc1tpXS51dWlkID09IGNjLmRpcmVjdG9yLl9zY2VuZS5faWQpIHtcclxuICAgICAgICBzY2VuZU5hbWUgPSBfc2NlbmVJbmZvc1tpXS51cmw7XHJcbiAgICAgICAgc2NlbmVOYW1lID0gc2NlbmVOYW1lLnN1YnN0cmluZyhzY2VuZU5hbWUubGFzdEluZGV4T2YoXCIvXCIpICsgMSkubWF0Y2goL1teXFwuXSsvKVswXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNjZW5lTmFtZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIHNldCBcIlNob3dSb29tXCIgYm9vbCB2YWx1ZVxyXG4gICAgQG1ldGhvZCBUb2dnbGVTaG93Um9vbV9Cb29sXHJcbiAgICBAcGFyYW0ge2Jvb2xlYW59IF9zdGF0ZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAqKi9cclxuICBUb2dnbGVTaG93Um9vbV9Cb29sKF9zdGF0ZSkge1xyXG4gICAgU2hvd1Jvb20gPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBzZXQgXCJMZWF2ZVJvb21cIiBib29sIHZhbHVlXHJcbiAgICBAbWV0aG9kIFRvZ2dsZUxlYXZlUm9vbV9Cb29sXHJcbiAgICBAcGFyYW0ge2Jvb2xlYW59IF9zdGF0ZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAqKi9cclxuICBUb2dnbGVMZWF2ZVJvb21fQm9vbChfc3RhdGUpIHtcclxuICAgIHRoaXMuTGVhdmVSb29tID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBQaG90b24gXCJQaG90b25SZWZcIiBpbnN0YW5jZSBjcmVhdGVkIGJ5IG11bHRpcGxheWVyIGNsYXNzXHJcbiAgICBAbWV0aG9kIGdldFBob3RvblJlZlxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IFBob3RvblJlZlxyXG4gICAgKiovXHJcbiAgZ2V0UGhvdG9uUmVmKCkge1xyXG4gICAgcmV0dXJuIFBob3RvblJlZjtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgbXlBY3RvciBpbnN0YW5jZSBjcmVhdGVkIGJ5IHBob3RvblxyXG4gICAgQG1ldGhvZCBQaG90b25BY3RvclxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IEFjdG9yXHJcbiAgICAqKi9cclxuICBQaG90b25BY3RvcigpIHtcclxuICAgIHJldHVybiBQaG90b25SZWYubXlBY3RvcigpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBteVJvb21BY3RvcnNBcnJheSBjcmVhdGVkIGJ5IHBob3RvblxyXG4gICAgQG1ldGhvZCBSb29tQWN0b3JzXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gQWN0b3JcclxuICAgICoqL1xyXG4gIFJvb21BY3RvcnMoKSB7XHJcbiAgICByZXR1cm4gUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIGlzU3BlY3RhdGUgdmFyaWFibGUgZnJvbSBjdXN0b20gcHJvcGVydHkgb2YgY3VycmVudCBhY3RvclxyXG4gICAgQG1ldGhvZCBDaGVja1NwZWN0YXRlXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IGlzU3BlY3RhdGVcclxuICAgICoqL1xyXG4gIENoZWNrU3BlY3RhdGUoKSB7XHJcbiAgICByZXR1cm4gUGhvdG9uUmVmLm15QWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBJbml0aWFsaXplIHBob3RvbiB3aXRoIGFwcGlkLGFwcCB2ZXJzaW9uLCBXc3MgZXRjXHJcbiAgICBAbWV0aG9kIEluaXRpYWxpemVQaG90b25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgSW5pdGlhbGl6ZVBob3RvbigpIHtcclxuICAgIEFwcEluZm8uQXBwSWQgPSB0aGlzLlBob3RvbkFwcEluZm8uQXBwSUQ7XHJcbiAgICBBcHBJbmZvLkFwcFZlcnNpb24gPSB0aGlzLlBob3RvbkFwcEluZm8uQXBwVmVyc2lvbjtcclxuICAgIEFwcEluZm8uV3NzID0gdGhpcy5QaG90b25BcHBJbmZvLldzcztcclxuICAgIEFwcEluZm8uTWFzdGVyU2VydmVyID0gdGhpcy5QaG90b25BcHBJbmZvLk1hc3RlclNlcnZlcjtcclxuICAgIEFwcEluZm8uRmJBcHBJZCA9IHRoaXMuUGhvdG9uQXBwSW5mby5GYkFwcElEO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBjb25uZWN0aW9uIHJlcXVlc3QgdG8gcGhvdG9uXHJcbiAgICBAbWV0aG9kIFJlcXVlc3RDb25uZWN0aW9uXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFJlcXVlc3RDb25uZWN0aW9uKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSkgY29uc29sZS5sb2coXCJhbHJlYWR5IGNvbm5lY3RlZFwiKTtcclxuICAgIGVsc2UgUGhvdG9uUmVmLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tDb25uZWN0aW9uU3RhdGUoKSB7XHJcbiAgICB2YXIgX2Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgaWYgKFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5zdGF0ZSA9PSA3IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBjb25uZWN0ZWRcIik7XHJcbiAgICAgIF9jb25uZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5zdGF0ZSk7XHJcbiAgICByZXR1cm4gX2Nvbm5lY3RlZDtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IERpc2Nvbm5lY3QgZnJvbSBwaG90b25cclxuICAgIEBtZXRob2QgRGlzY29ubmVjdFBob3RvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBEaXNjb25uZWN0UGhvdG9uKCkge1xyXG4gICAgLy9pZiAoUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5zdGF0ZSA9PSA3IHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgIFBob3RvblJlZi5kaXNjb25uZWN0KCk7XHJcbiAgICB0aGlzLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgIC8vUGhvdG9uUmVmLmxlYXZlUm9vbSgpO1xyXG4gICAgdGhpcy5SZXNldFN0YXRlKCk7XHJcbiAgICAvLyAgfSBlbHNlIHtcclxuICAgIC8vICAgIGNvbnNvbGUubG9nKFwibm90IGluc2lkZSBhbnkgcm9vbSBvciBsb2JieSBvciBjb25uZWN0ZWQgdG8gcGhvdG9uXCIpO1xyXG4gIH0sXHJcbiAgLy8gfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXNldGluZyBmZXcgdmFsdWVzXHJcbiAgICBAbWV0aG9kIFJlc2V0U3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgUmVzZXRTdGF0ZSgpIHtcclxuICAgIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuTGVhdmVSb29tID0gZmFsc2U7XHJcbiAgICB0aGlzLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgIFNob3dSb29tID0gZmFsc2U7XHJcbiAgICBzdGF0ZVRleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5SZXNldFJvb21WYWx1ZXMoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIHJvb20gbmFtZSBnb3QgaW5wdXQgZnJvbSBnYW1lXHJcbiAgICBAbWV0aG9kIE9uUm9vbU5hbWVDaGFuZ2VcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgT25Sb29tTmFtZUNoYW5nZShuYW1lKSB7XHJcbiAgICB0aGlzLlJvb21OYW1lID0gbmFtZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIG1lc3NhZ2Ugd2luZG93IGdvdCBpbnB1dCBmcm9tIGdhbWVcclxuICAgIEBtZXRob2QgT25NZXNzYWdlQ2hhbmdlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbXNnXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgT25NZXNzYWdlQ2hhbmdlKG1zZykge1xyXG4gICAgdGhpcy5NZXNzYWdlID0gbXNnO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgdXBkYXRlIGN1c3RvbSByb29tIHByb3BlcnRpZXNcclxuICAgIEBtZXRob2QgVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXNcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyhfcGxheWVyVXBkYXRlID0gZmFsc2UsIF9wbGF5ZXJWYWx1ZSA9IDAsIF9pbml0aWFsU2V0dXBVcGRhdGUgPSBmYWxzZSwgX2luaXRpYWxTZXR1cFZhbHVlID0gZmFsc2UsIF9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSA9IGZhbHNlLCBfcGxheWVyR2FtZUluZm9WYWx1ZSA9IG51bGwsIF90dXJuTnVtYmVyVXBkYXRlID0gZmFsc2UsIF90dXJuTnVtYmVydmFsdWUgPSAwKSB7XHJcbiAgICBpZiAoX3BsYXllclVwZGF0ZSkgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyXCIsIF9wbGF5ZXJWYWx1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKF9pbml0aWFsU2V0dXBVcGRhdGUpIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLCBfaW5pdGlhbFNldHVwVmFsdWUsIHRydWUpO1xyXG5cclxuICAgIGlmIChfcGxheWVyR2FtZUluZm9VcGRhdGUpIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsIF9wbGF5ZXJHYW1lSW5mb1ZhbHVlLCB0cnVlKTtcclxuXHJcbiAgICBpZiAoX3R1cm5OdW1iZXJVcGRhdGUpIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgX3R1cm5OdW1iZXJ2YWx1ZSwgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjcmVhdGUgcm9vbSByZXF1ZXN0XHJcbiAgICBAbWV0aG9kIENyZWF0ZVJvb21cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgQ3JlYXRlUm9vbSgpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUgfHwgUGhvdG9uUmVmLnN0YXRlID09IDgpIHtcclxuICAgICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IGZhbHNlKSB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0gbmV3IFJvb21Qcm9wZXJ0eSgpO1xyXG4gICAgICAgIF9kYXRhLlBsYXllciA9IDA7XHJcblxyXG4gICAgICAgIHZhciByb29tT3B0aW9ucyA9IHtcclxuICAgICAgICAgIGlzVmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgIGlzT3BlbjogdHJ1ZSxcclxuICAgICAgICAgIG1heFBsYXllcnM6IHRoaXMuTWF4UGxheWVycyArIHRoaXMuTWF4U3BlY3RhdG9ycyxcclxuICAgICAgICAgIGN1c3RvbUdhbWVQcm9wZXJ0aWVzOiBfZGF0YSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7IElzU3BlY3RhdGU6IGZhbHNlIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tQ291bnRlclwiLCB7IENvdW50ZXI6IFRvdGFsVGltZXIgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG4gICAgICAgIHZhciBSb29tSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKTtcclxuXHJcbiAgICAgICAgUGhvdG9uUmVmLmNyZWF0ZVJvb20oXCJSb29tX1wiICsgUm9vbUlELCByb29tT3B0aW9ucyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgam9pbiByb29tIHJlcXVlc3QgYnkgbmFtZVxyXG4gICAgQG1ldGhvZCBKb2luUm9vbVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IF9yb29tTmFtZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEpvaW5Sb29tKF9yb29tTmFtZSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuc3RhdGUgPT0gOCkge1xyXG4gICAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gZmFsc2UgfHwgUGhvdG9uUmVmLnN0YXRlICE9IDgpIHtcclxuICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBpc1Zpc2libGU6IHRydWUsXHJcbiAgICAgICAgICBpc09wZW46IGZhbHNlLFxyXG4gICAgICAgICAgbWF4UGxheWVyczogdGhpcy5NYXhQbGF5ZXJzICsgdGhpcy5NYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgLy9cImN1c3RvbUdhbWVQcm9wZXJ0aWVzXCI6e1wiUm9vbUVzc2VudGlhbHNcIjoge0lzU3BlY3RhdGU6dHJ1ZX19XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwgeyBJc1NwZWN0YXRlOiB0cnVlIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tQ291bnRlclwiLCB7IENvdW50ZXI6IFRvdGFsVGltZXIgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG5cclxuICAgICAgICBQaG90b25SZWYuam9pblJvb20oX3Jvb21OYW1lLCByb29tT3B0aW9ucyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgam9pbiByYW5kb20gcm9vbVxyXG4gICAgQG1ldGhvZCBKb2luUmFuZG9tUm9vbVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBKb2luUmFuZG9tUm9vbSgpIHtcclxuICAgIGlmIChQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUgfHwgUGhvdG9uUmVmLnN0YXRlID09IDgpIHtcclxuICAgICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IGZhbHNlIHx8IFBob3RvblJlZi5zdGF0ZSAhPSA4KSB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0gbmV3IFJvb21Qcm9wZXJ0eSgpO1xyXG4gICAgICAgIF9kYXRhLlBsYXllciA9IDA7XHJcblxyXG4gICAgICAgIHZhciByb29tT3B0aW9ucyA9IHtcclxuICAgICAgICAgIC8vXCJleHBlY3RlZE1heFBsYXllcnNcIjp0aGlzLk1heFBsYXllcnMrTWF4U3BlY3RhdG9ycyxcclxuICAgICAgICAgIGV4cGVjdGVkQ3VzdG9tUm9vbVByb3BlcnRpZXM6IF9kYXRhLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHsgSXNTcGVjdGF0ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIsIHsgQ291bnRlcjogVG90YWxUaW1lciB9KTtcclxuICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcblxyXG4gICAgICAgIFBob3RvblJlZi5qb2luUmFuZG9tUm9vbShyb29tT3B0aW9ucyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBjYXJkIGluZGV4IG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kQ2FyZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRDYXJkRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGNhcmQgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgQ2FyZERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgZ2FtZSBvdmVyIGNhbGxcclxuICAgIEBtZXRob2QgU2VuZEdhbWVPdmVyXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kR2FtZU92ZXIoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBnYW1lIG92ZXIgY2FsbFwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRHYW1lT3ZlckRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBnYW1lIG92ZXIgZGF0YSB0byBzeW5jXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxNixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRTZWxlY3RlZFBsYXllckZvclByb2ZpdChfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGdhbWUgb3ZlciBkYXRhIHRvIHN5bmNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE3LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGJhY2tydXB0IGRhdGFcclxuICAgIEBtZXRob2QgU2VuZEJhbmtydXB0RGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZEJhbmtydXB0RGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGJhbmtydXBjeSBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA5LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIFBsYXllciBEYXRhIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBwbGF5ZXIgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVySW5mbzogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBvbmUgcXVlc3Rpb24gRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZE9uZVF1ZXN0aW9uRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA3LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZE9uZVF1ZXN0aW9uQXJyYXlzKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIGFycmF5c1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTgsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kRGVja3NBcnJheXMoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBkZWNrcyBhcnJheXNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE5LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZERlY2tzQXJyYXlDb3VudGVyKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZGVja3MgYXJyYXlzIGNvdW50ZXJzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyMCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIHByb2ZpdCBvciBsb3NzIHRvIHlvdXIgcGFzcnRuZXJcclxuICAgIEBtZXRob2QgU2VuZFBhcnRuZXJQcm9maXRMb3NzXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kUGFydG5lclByb2ZpdExvc3MoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgb25lIHF1ZXN0aW9uIHJlc3BvbnNlIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiByZXNwb25zZSBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA4LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGRpY2UgZGF0YVxyXG4gICAgQG1ldGhvZCBEaWNlUm9sbEV2ZW50XHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBEaWNlUm9sbEV2ZW50KF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZGljZSBjb3VudFwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGljZUNvdW50OiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGdvIGJhY2sgc3BhY2VzIGRhdGFcclxuICAgIEBtZXRob2QgU2VuZEdvQmFja1NwYWNlRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZEdvQmFja1NwYWNlRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kIGdvIGJhY2sgc3BhY2VzIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEwLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kaW5nIG9wZW4gaW52aXRhdGlvbiB0byBhbGwgcGxheWVycyBmb3IgcGFydG5lciBzaGlwXHJcbiAgICBAbWV0aG9kIFNlbmRQYXJ0bmVyU2hpcE9mZmVyRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgcGFydG5lciBzaGlwIG9mZmVyXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZGluZyBwYXJ0bmVyIGFuc3dlciBkYXRhIChhY2NlcHQgb3IgcmVqZWN0KVxyXG4gICAgQG1ldGhvZCBTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgcGFydGVucnNoaXAgYW5zd2VyIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEyLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZEluZm8oX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBpbmZvXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxNSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCB1c2VyIGlkIG9mIHBsYXllciB0byBhbGwgb3RoZXIgd2hvIGhhZCBjb21wbGV0ZWQgdGhlaXIgdHVyblxyXG4gICAgQG1ldGhvZCBTeW5jVHVybkNvbXBsZXRpb25cclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFN5bmNUdXJuQ29tcGxldGlvbihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHR1cm4gY29tcGxldGlvbiBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA0LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBVSUQ6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFN0YXJ0IFR1cm4gZm9yIGluaXRpYWwgdHVyblxyXG4gICAgQG1ldGhvZCBTdGFydFR1cm5cclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFN0YXJ0VHVybihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlN0YXJ0aW5nIFR1cm5cIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDIsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFR1cm5OdW1iZXI6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kVGFrZUJ1c2luZXNzRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlNlbmQgVGFrZSBCdXNpbmVzcyBEYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyMyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmREYW1hZ2luZ0RhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTZW5kIHBsYXllciByZWNlaXZlZCBkYW1hZ2luZyBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyNCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmREYW1hZ2luZ0RlY2lzaW9uRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlNlbmQgcGxheWVyIHJlY2VpdmVkIGRhbWFnaW5nIGRhdGEgZGVjaXNpb25cIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDI1LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZEJ1eUhhbGZCdXNpbmVzc0RhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTZW5kIHBsYXllciByZWNlaXZlZCBkYW1hZ2luZyBkYXRhIGRlY2lzaW9uXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyNixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2hvdyB0b2FzdCBtZXNzYWdlIG9uIHRoZSBjb25zb2xlXHJcbiAgICBAbWV0aG9kIFNob3dUb2FzdFxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgbWVzc2FnZSB0byBiZSBzaG93biBcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidG9hc3QgbWVzc2FnZTogXCIgKyBtc2cpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgUmVjZWl2ZSBldmVudCBmcm9tIHBob3RvbiByYWlzZSBvbiBcclxuICAgIEBtZXRob2QgQ2FsbFJlY2lldmVFdmVudFxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIENhbGxSZWNpZXZlRXZlbnQ6IGZ1bmN0aW9uIChfZXZlbnRDb2RlLCBfc2VuZGVyTmFtZSwgX3NlbmRlcklELCBfZGF0YSkge1xyXG4gICAgdmFyIEluc3RhbmNlTnVsbCA9IHRydWU7XHJcblxyXG4gICAgLy90byBjaGVjayBpZiBpbnN0YW5jZSBpcyBudWxsIGluIGNhc2UgY2xhc3MgaW5zdGFuY2UgaXMgbm90IGxvYWRlZCBhbmQgaXRzIHJlY2VpdmVzIGNhbGxiYWNrXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkgPT0gbnVsbCkge1xyXG4gICAgICBJbnN0YW5jZU51bGwgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkNhbGxSZWNpZXZlRXZlbnQoX2V2ZW50Q29kZSwgX3NlbmRlck5hbWUsIF9zZW5kZXJJRCwgX2RhdGEpO1xyXG4gICAgICB9LCA1MCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnN0YW5jZU51bGwgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIF9zZW5kZXJOYW1lLCBfc2VuZGVySUQsIF9kYXRhKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBEaXNjb25uZWN0RGF0YSgpIHtcclxuICAgIEdhbWVGaW5pc2hlZCA9IHRydWU7XHJcbiAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gIH0sXHJcblxyXG4gIFJlc3RhcnRHYW1lKF90aW1lciA9IDApIHtcclxuICAgIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgVGltZW91dHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0c1tpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgIH0sIF90aW1lcik7XHJcbiAgICAvLyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKClcclxuICB9LFxyXG5cclxuICBDaGVja01hc3RlckNsaWVudChfaWQpIHtcclxuICAgIHZhciBfaXNNYXN0ZXIgPSBmYWxzZTtcclxuICAgIGlmIChQaG90b25SZWYubXlSb29tTWFzdGVyQWN0b3JOcigpID09IF9pZCAmJiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgPT0gX2lkKSB7XHJcbiAgICAgIF9pc01hc3RlciA9IHRydWU7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUuZXJyb3IoX2lzTWFzdGVyKTtcclxuICAgIHJldHVybiBfaXNNYXN0ZXI7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCkge1xyXG4gICAgdmFyIF9pc01hc3RlciA9IGZhbHNlO1xyXG4gICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciA9PSBQaG90b25SZWYubXlSb29tTWFzdGVyQWN0b3JOcigpKSB7XHJcbiAgICAgIF9pc01hc3RlciA9IHRydWU7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jb25zb2xlLmVycm9yKF9pc01hc3Rlcik7XHJcbiAgICByZXR1cm4gX2lzTWFzdGVyO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0Um9vbVZhbHVlcygpIHtcclxuICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBJc01hc3RlckNsaWVudCA9IGZhbHNlO1xyXG4gICAgICBUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIH0sIDEwMDApO1xyXG4gIH0sXHJcblxyXG4gIEdldFJlYWxBY3RvcnMoKSB7XHJcbiAgICB2YXIgX3JlYWxQbGF5ZXIgPSAwO1xyXG4gICAgdmFyIEFsbFBsYXllcnMgPSBQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBbGxQbGF5ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoQWxsUGxheWVyc1tpbmRleF0uZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICBfcmVhbFBsYXllcisrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3JlYWxQbGF5ZXI7XHJcbiAgfSxcclxuXHJcbiAgUm9vbUNvdW50ZXIoX3RpbWVyKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICAgIHZhciBfZGF0YSA9IG51bGw7XHJcbiAgICBTY2hlZHVsYXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKElzTWFzdGVyQ2xpZW50KSB7XHJcbiAgICAgICAgaWYgKF90aW1lciA+IDApIHtcclxuICAgICAgICAgIF90aW1lci0tO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coX3RpbWVyKTtcclxuICAgICAgICAgIHRoaXMuUm9vbUNvdW50ZXIoX3RpbWVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcInRpbWVyIGNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgIGlmICh0aGlzLkdldFJlYWxBY3RvcnMoKSA+IDEpIHtcclxuICAgICAgICAgICAgLy9pZiBoYXMgbW9yZSB0aGFuIG9uZSBwbGF5ZXIgc3RhcnQgcmVhbCBnYW1lXHJcbiAgICAgICAgICAgIHRoaXMuU2VuZFJvb21Db21wbGV0ZWREYXRhKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJObyBvbmxpbmUgcGxheWVyIHdhcyBmb3VuZCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlclwiKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5FeGl0Q29ubmVjdGluZygpO1xyXG5cclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlRvZ2dsZU1vZGVTZWxlY3Rpb24oMSk7XHJcbiAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Ub2dnbGVTaG93Um9vbV9Cb29sKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzID0gMjtcclxuICAgICAgICAgICAgLy8gY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgICAgICAgIC8vIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luZWRSb29tID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgICAgIC8vIH0sIDEwMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICAgICAgfVxyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJUaW1lcigpIHtcclxuICAgIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgX3RpbWVyID0gMDtcclxuICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gIH0sXHJcblxyXG4gIFByb2Nlc3NDb3VudGVyKCkge1xyXG4gICAgdmFyIF9tYXN0ZXIgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCk7XHJcbiAgICBpZiAoX21hc3Rlcikge1xyXG4gICAgICBpZiAoIVRpbWVyU3RhcnRlZCkge1xyXG4gICAgICAgIFRpbWVyU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgdmFyIF9jb3VudGVyID0gUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIpW1wiQ291bnRlclwiXTtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUm9vbUNvdW50ZXIoX2NvdW50ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIHJvb20gY29tcGxldGVkIGRhdGFcclxuICAgIEBtZXRob2QgU2VuZFJvb21Db21wbGV0ZWREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kUm9vbUNvbXBsZXRlZERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBSb29tQ29tcGxldGVkRGF0YVwiKTtcclxuICAgICAgLy8gIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE0LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZENhc2hEZWR1Y3REYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgU2VuZENhc2hEZWR1Y3REYXRhXCIpO1xyXG4gICAgICAvLyAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjEsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kQ2FzaEFkZGl0aW9uRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIFNlbmRDYXNoQWRkaXRpb25EYXRhXCIpO1xyXG4gICAgICAvLyAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjIsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSb29tQ29tcGxldGVkKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9yZWFsUGxheWVyID0gdGhpcy5HZXRSZWFsQWN0b3JzKCk7XHJcbiAgICAgIElzR2FtZVN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycyA9IF9yZWFsUGxheWVyO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFsbCByZXF1aXJlZCBwbGF5ZXJzIGpvaW5lZCwgc3RhcnRpbmcgdGhlIGdhbWUuLlwiKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgIFRpbWVvdXRzLnB1c2goXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTtcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgICApOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKHRydWUsIF9yZWFsUGxheWVyLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBudWxsLCBmYWxzZSwgMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQWN0b3JBY3RpdmVEYXRhKF9hY3Rvcikge1xyXG4gICAgdmFyIF9hY3RvcnNBcnJheSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIHZhciBfZGF0YSA9IG51bGw7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBfZGF0YSA9IF9hY3RvcnNBcnJheVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgaWYgKF9kYXRhLlBsYXllclVJRCA9PSBfYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgIF9kYXRhLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgX2FjdG9yc0FycmF5W2luZGV4XS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwidXBkYXRpbmcgYWN0aXZlIHN0YXR1cyBvZiB0aGUgcGxheWVyIHdobyBoYXMgbGVmdC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlwiKTtcclxuICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgfSxcclxuXHJcbiAgSGFuZGxlUGxheWVyTGVhdmUoYWN0b3IgPSBudWxsLCBQaG90b25SZWZlcmVjZSA9IG51bGwsIF9tYW5hZ2VyID0gbnVsbCwgX3BsYXllclR1cm4gPSAwLCBfaW5pdGlhbFNldHVwRG9uZSA9IGZhbHNlLCBfaXNTcGVjdGF0ZSA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2luaXRpYWxTZXR1cERvbmUpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZUFjdG9yQWN0aXZlRGF0YShhY3Rvcik7XHJcbiAgICAgICAgICBpZiAoIV9pc1NwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGxlZnQ6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJlbW92ZUZyb21DaGVja0FycmF5KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLkNoZWNrVHVybkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChfcGxheWVyVHVybiA9PSBpbmRleCAmJiBQaG90b25SZWZlcmVjZS5teUFjdG9yKCkuYWN0b3JOciA9PSBQaG90b25SZWZlcmVjZS5teVJvb21NYXN0ZXJBY3Rvck5yKCkpIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5DaGFuZ2VUdXJuRm9yY2VmdWxseSgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlIHR1cm4gZm9yY2VmdWxseVwiKTtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5TZXRQbGF5ZXJMZWZ0KHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfbWFuYWdlci5SZXNldFNvbWVWYWx1ZXMoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIF91SU1hbmFnZXIuU2hvd1RvYXN0KFwicGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDEwMDApO1xyXG4gICAgICB2YXIgX3BsYXllcmZvdW5kID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycy0tO1xyXG4gICAgICAgICAgX3BsYXllcmZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVBY3RvckFjdGl2ZURhdGEoYWN0b3IpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIV9wbGF5ZXJmb3VuZCkge1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzLS07XHJcbiAgICAgICAgaWYgKCFfaXNTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN5bmNEYXRhKG51bGwsIGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coX21hbmFnZXIuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICBjb25zb2xlLmxvZyhNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvL2NhbGxlZCBldmVyeSBmcmFtZVxyXG4gIHVwZGF0ZShkdCkge1xyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgdGhlcmUgaXMgc29tZSBjaGFuZ2UgaW4gY29ubmVjdGlvbiBzdGF0ZVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uU3RhdGVDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHN0YXRlXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgICAgLy8jcmVnaW9uIENvbm5lY3Rpb24gU3RhdGVzXHJcbiAgICAgIC8vc3RhdGUgMSA6IGNvbm5lY3RpbmdUb05hbWVTZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSAyIDogQ29ubmVjdGVkVG9OYW1lU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgMyA6IENvbm5lY3RpbmdUb01hc3RlclNlcnZlclxyXG4gICAgICAvL1N0YXRlIDQgOiBDb25uZWN0ZWRUb01hc3RlclNlcnZlclxyXG4gICAgICAvL1N0YXRlIDU6ICBKb2luZWRMb2JieVxyXG4gICAgICAvL1N0YXRlIDYgOiBDb25uZWN0aW5nVG9HYW1lc2VydmVyXHJcbiAgICAgIC8vU3RhdGUgNyA6IENvbm5lY3RlZFRvR2FtZXNlcnZlclxyXG4gICAgICAvL1N0YXRlIDggOiBKb2luZWRcclxuICAgICAgLy9TdGF0ZSAxMDogRGlzY29ubmVjdGVkXHJcbiAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgdmFyIExCQyA9IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkxvYWRCYWxhbmNpbmdDbGllbnQ7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU3RhdGVDb2RlOiBcIiArIHN0YXRlICsgXCIgXCIgKyBMQkMuU3RhdGVUb05hbWUoc3RhdGUpKTtcclxuXHJcbiAgICAgIGlmIChzdGF0ZSA9PSAxKSBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwiY29ubmVjdGluZyB0byBzZXJ2ZXIuLi5cIik7XHJcbiAgICAgIGVsc2UgaWYgKHN0YXRlID09IDQpIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJjb25uZWN0ZWQgdG8gc2VydmVyXCIpO1xyXG4gICAgICBlbHNlIGlmIChzdGF0ZSA9PSA1KSB7XHJcbiAgICAgICAgLy9oYXMgam9pbmVkIGxvYmJ5XHJcbiAgICAgICAgaWYgKFNob3dSb29tID09IGZhbHNlKSB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwid2FpdGluZyBmb3Igb3RoZXIgcGxheWVycy4uLlwiKTtcclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luUmFuZG9tUm9vbSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoU2hvd1Jvb20gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInNob3dpbmcgcm9vbXMgbGlzdC4uLlwiKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKHRydWUpO1xyXG4gICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZGVidWdcclxuICAgICAgICAgICAgQG1ldGhvZCBkZWJ1Z1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZGVidWcgPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBpbmZvXHJcbiAgICAgICAgICAgIEBtZXRob2QgaW5mb1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW1cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYubG9nZ2VyLmluZm8gPSBmdW5jdGlvbiAobWVzcywgcGFyYW0pIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyArIHBhcmFtKTtcclxuICAgICAgc3RhdGVUZXh0ICs9IG1lc3MgKyBcIiBcIiArIHBhcmFtICsgXCJcXG5cIjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyB3YXJuXHJcbiAgICAgICAgICAgIEBtZXRob2Qgd2FyblxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0xXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTJcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtM1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIud2FybiA9IGZ1bmN0aW9uIChtZXNzLCBwYXJhbTEsIHBhcmFtMiwgcGFyYW0zKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MgKyBcIiBcIiArIHBhcmFtMSArIFwiIFwiICsgcGFyYW0yICsgXCIgXCIgKyBwYXJhbTMpO1xyXG5cclxuICAgICAgaWYgKHBhcmFtMSA9PSAyMjUpIHtcclxuICAgICAgICAvL25vIHJvb20gZm91bmRcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5vIHJhbmRvbSByb29tIHdhcyBmb3VuZCwgY3JlYXRpbmcgb25lXCIpO1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DcmVhdGVSb29tKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJhbTEgPT0gMjI2KSB7XHJcbiAgICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUm9vbSBkb2VzIG5vdCBleGlzdHMgYW55bW9yZSxwbGVhc2UgdHJ5IGFnYWluIGJ5IGV4aXRpbmcuXCIpO1xyXG4gICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNsZWFyVGltZXIoKTtcclxuICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5TZXRDb25uZXRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9yb29tIGRvZXMgbm90IGV4aXN0cyBvciBpcyBmdWxsXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUm9vbSBpcyBmdWxsLCBwbGVhc2Ugc2VsZWN0IGFueSBvdGhlciByb29tIHRvIHNwZWN0YXRlLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBlcnJvclxyXG4gICAgICAgICAgICBAbWV0aG9kIGVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZXJyb3IgPSBmdW5jdGlvbiAobWVzcywgcGFyYW0pIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5leGNlcHRpb24gPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBzb21lIGZvcm1hdFxyXG4gICAgICAgICAgICBAbWV0aG9kIGZvcm1hdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZm9ybWF0ID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHBsYXllciBqb2lucyBsb2JieVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uUm9vbUxpc3QgPSBmdW5jdGlvbiAocm9vbXMpIHtcclxuICAgICAgc3RhdGVUZXh0ICs9IFwiXFxuXCIgKyBcIlJvb21zIExpc3Q6XCIgKyBcIlxcblwiO1xyXG5cclxuICAgICAgaWYgKHJvb21zLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgc3RhdGVUZXh0ICs9IFwiTm8gcm9vbXMgaW4gbG9iYnkuXCIgKyBcIlxcblwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUsIHJvb21zW2ldLnBsYXllckNvdW50KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbSBuYW1lOiBcIiArIHJvb21zW2ldLm5hbWUpO1xyXG4gICAgICAgICAgc3RhdGVUZXh0ICs9IFwiUm9vbTogXCIgKyByb29tc1tpXS5uYW1lICsgXCJcXG5cIjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgdGhlcmUgaXMgY2hhbmdlIGluIHJvb21zIGxpc3QgKHJvb20gYWRkZWQsdXBkYXRlZCxyZW1vdmVkIGV0YylcclxuICAgICAgICAgICAgQG1ldGhvZCBvblJvb21MaXN0VXBkYXRlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNVcGRhdGVkXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc0FkZGVkXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1JlbW92ZWRcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Sb29tTGlzdFVwZGF0ZSA9IGZ1bmN0aW9uIChyb29tcywgcm9vbXNVcGRhdGVkLCByb29tc0FkZGVkLCByb29tc1JlbW92ZWQpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5SZXNldFJvb21MaXN0KCk7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5VcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShyb29tc1tpXS5uYW1lLCByb29tc1tpXS5wbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSb29tIG5hbWU6IFwiICsgcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgc3RhdGVUZXh0ICs9IFwiUm9vbTogXCIgKyByb29tc1tpXS5uYW1lICsgXCJcXG5cIjtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhcIlJvb21zIExpc3QgdXBkYXRlZDogXCIgKyByb29tc1VwZGF0ZWQubGVuZ3RoICsgXCIgdXBkYXRlZCwgXCIgKyByb29tc0FkZGVkLmxlbmd0aCArIFwiIGFkZGVkLCBcIiArIHJvb21zUmVtb3ZlZC5sZW5ndGggKyBcIiByZW1vdmVkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGxvY2FsbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uSm9pblJvb21cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Kb2luUm9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8jcmVnaW9uIExvZ3MgZm9yIGdhbWVcclxuICAgICAgY29uc29sZS5sb2coXCJHYW1lIFwiICsgdGhpcy5teVJvb20oKS5uYW1lICsgXCIgam9pbmVkXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlBY3RvcigpKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGgpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKVswXS5sb2FkQmFsYW5jaW5nQ2xpZW50LnVzZXJJZCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKS5fY3VzdG9tUHJvcGVydGllcyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0pO1xyXG4gICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IHRydWUpIHtcclxuICAgICAgICAvL2NoZWNrIGlmIHBsYXllciB3aG8gam9pbmVkIGlzIHNwZWN0YXRlXHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7XHJcbiAgICAgICAgfSwgMTAwMCk7IC8vZnVuY3Rpb24gaW4gVUlNYW5hZ2VyXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRXhpdENvbm5lY3RpbmcpIHtcclxuICAgICAgLy8gICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2xlYXJUaW1lcigpO1xyXG4gICAgICAvLyAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5TZXRDb25uZXRpbmcoZmFsc2UpO1xyXG4gICAgICAvLyAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFJvb21WYWx1ZXMoKTtcclxuICAgICAgLy8gICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Qcm9jZXNzQ291bnRlcigpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgcmVtb3RlbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JKb2luXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIChQaG90b25SZWYub25BY3RvckpvaW4gPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgdmFyIF9yZWFsUGxheWVyID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkdldFJlYWxBY3RvcnMoKTtcclxuXHJcbiAgICAgIGlmIChfcmVhbFBsYXllciA9PSBNYXhTdHVkZW50cykge1xyXG4gICAgICAgIC8vd2hlbiBtYXggcGxheWVyIHJlcXVpcmVkIHRvIHN0YXJ0IGdhbWUgaGFzIGJlZW4gYWRkZWRcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgcmVxdWlyZWQgcGxheWVycyBqb2luZWQsIHN0YXJ0aW5nIHRoZSBnYW1lLi5cIik7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7XHJcbiAgICAgICAgfSwgMTAwMCk7IC8vZnVuY3Rpb24gaW4gdWkgbWFuYWdlclxyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyh0cnVlLCBQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBudWxsLCBmYWxzZSwgMCk7XHJcbiAgICAgICAgLy9QaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJcIixQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpLHRydWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KGFjdG9yLmFjdG9yTnIpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGpvaW5lZFwiKTtcclxuICAgICAgLy8gY29uc29sZS5lcnJvcihcIlRvdGFsIFBsYXllcnM6IFwiK1Bob3RvblJlZi5teVJvb21BY3RvckNvdW50KCkpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkpO1xyXG4gICAgfSksXHJcbiAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgcmVtb3RlbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgbGVhdmVzIGEgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JMZWF2ZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICAgIChQaG90b25SZWYub25BY3RvckxlYXZlID0gZnVuY3Rpb24gKGFjdG9yKSB7XHJcbiAgICAgICAgaWYgKCFHYW1lRmluaXNoZWQgJiYgIVJlc3RhcnRTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID09IHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKCFhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTGVhdmVSb29tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0b3IuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3BlY3RhdG9yIGxlZnQsIHNvIGRvbnQgbWluZCwgY29udCBnYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgUGhvdG9uUmVmZXJlY2UgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuZ2V0UGhvdG9uUmVmKCk7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfcGxheWVyVHVybiA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgdmFyIF91SUdhbWVNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgdmFyIF9yZWFsUGxheWVyID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkdldFJlYWxBY3RvcnMoKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIF9pbml0aWFsU2V0dXBEb25lID0gUGhvdG9uUmVmZXJlY2UubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgbGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3JlYWxQbGF5ZXIgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSGFuZGxlUGxheWVyTGVhdmUoYWN0b3IsIFBob3RvblJlZmVyZWNlLCBfbWFuYWdlciwgX3BsYXllclR1cm4sIF9pbml0aWFsU2V0dXBEb25lLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX3VJR2FtZU1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3VJR2FtZU1hbmFnZXIuU2hvd1RvYXN0KFwicGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDExNTAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKF9pbml0aWFsU2V0dXBEb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVBY3RvckFjdGl2ZURhdGEoYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLkdhbWVPdmVyKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF91SUdhbWVNYW5hZ2VyKSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzdGFydEdhbWUoMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc3RhcnRHYW1lKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfdUlHYW1lTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdUlHYW1lTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTE1MCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLmdldFNjZW5lTmFtZSgpID09IFwiR2FtZVBsYXlcIikgLy9pZiBzY2VuZSBpcyBnYW1lcGxheSBsZXQgcGxheWVyIGZpbmlzaCBnYW1lIGZvcmNlZnVsbHlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIm90aGVyIHBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0sIDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF91SUdhbWVNYW5hZ2VyLlNob3dUb2FzdChcInBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAxMTUwLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfcmVhbFBsYXllciA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5IYW5kbGVQbGF5ZXJMZWF2ZShhY3RvciwgUGhvdG9uUmVmZXJlY2UsIF9tYW5hZ2VyLCBfcGxheWVyVHVybiwgX2luaXRpYWxTZXR1cERvbmUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX2luaXRpYWxTZXR1cERvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuR2FtZU92ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBoYXMgbGVmdFwiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKElzR2FtZVN0YXJ0ZWQpO1xyXG4gICAgICAgICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUgJiYgIUlzR2FtZVN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUHJvY2Vzc0NvdW50ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpID09IDEgJiYgIVJlc3RhcnRTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgUmVzdGFydFNwZWN0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXN0YXJ0R2FtZSgxNTAwKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZWF0cnRlZFwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgb3duIHByb3BlcnRpZXMgZ290IGNoYW5nZWRcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9yUHJvcGVydGllc0NoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25BY3RvclByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoYWN0b3IpIHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgcm9vbSBwcm9wZXJ0aWVzIGdvdCBjaGFuZ2VkXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbk15Um9vbVByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoX2RhdGEpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB0byBoYW5kbGUgZXJyb3JzXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25FcnJvclxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gZXJyb3JDb2RlXHJcbiAgICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gZXJyb3JNc2dcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25FcnJvciA9IGZ1bmN0aW9uIChlcnJvckNvZGUsIGVycm9yTXNnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBlcnJvckNvZGUgKyBcIjogXCIgKyBlcnJvck1zZyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGFuIGV2ZW50IGlzIHJlY2VpdmVkIHdpdGggc29tZSBkYXRhXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25FdmVudFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gY29kZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gY29udGVudFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JOclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkV2ZW50ID0gZnVuY3Rpb24gKGNvZGUsIGNvbnRlbnQsIGFjdG9yTnIpIHtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBzd2l0Y2ggKGNvZGUpIHtcclxuICAgICAgICBjYXNlIDE6IC8vcmVjZXZpbmcgcGxheWVyZGF0YSBpbmZvXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBsYXllciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIFBsYXllckluZm9EYXRhID0gY29udGVudC5QbGF5ZXJJbmZvO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEsIHNlbmRlck5hbWUsIHNlbmRlcklELCBQbGF5ZXJJbmZvRGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOiAvL3N0YXJ0IHR1cm4gcmFpc2UgZXZlbnRcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgc3RhcnQgdHVybiBldmVudFwiKTtcclxuICAgICAgICAgIHZhciBfVHVybiA9IGNvbnRlbnQuVHVybk51bWJlcjtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX1R1cm4pO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzogLy8gZGljZSBjb3VudFxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkaWNlIGNvdW50XCIpO1xyXG4gICAgICAgICAgdmFyIF9kaWNlID0gY29udGVudC5EaWNlQ291bnQ7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kaWNlKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQ6IC8vcmVjZWluZyB1c2VyIGlkIG9mIHBsYXllciB3aG8gaGFzIGNvbXBsZXRlZCB0dXJuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBsYXllciB0dXJuIGNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgIHZhciBfSUQgPSBjb250ZW50LlVJRDtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg0LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX0lEKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6IC8vcmVjZWl2aW5nIGNhcmQgZGF0YSAoaW5kZXgpIHNvIG90aGVyIHVzZXJzIGNhbiBzeW5jIHRoZW1cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgY2FyZCBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9jYXJkID0gY29udGVudC5DYXJkRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg1LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2NhcmQpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNjogLy9yZWNlaXZlIGdhbWUgb3ZlciBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGdhbWUgb3ZlciBjYWxsXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDYsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OiAvL3JlY2VpdmUgb25lIFF1ZXN0aW9uIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgb25lIHF1ZXN0aW9uIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDg6IC8vcmVjZWl2ZSBvbmUgUXVlc3Rpb24gcmVzcG9uc2UgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBvbmUgcXVlc3RpbyByZXNwb25zZSBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDgsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA5OiAvL3JlY2VpdmUgYmFua3J1cHQgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBiYW5rcnVwdCBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDksIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMDogLy9yZWNlaXZlIGJhY2tzcGFjZSBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGJhY2tzcGFjZSBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEwLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTE6IC8vcmVjZWl2ZWluZyBwYXJ0bmVyc2hpcCBvZmZlclxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBvZmZlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDExLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTI6IC8vcmVjZWl2ZWluZyBwYXJ0bmVyc2hpcCBhbnN3ZXIgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBhbndzZXIgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEzOiAvL3JlY2VpdmluZyBwcm9maXQvbG9zcyBkYXRhIGZvciBwYXJ0bmVyXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEzLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTQ6IC8vcmVjZWl2aW5nIHJvb20gY29tcGxldGUgZGF0YSB0byBzdGFydCBHYW1lXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Sb29tQ29tcGxldGVkKCk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNTogLy9yZWNlaXZpbmcgcGF5ZGF5IGluZm9cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgaW5mb1wiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxNSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE2OiAvL3JlY2VpdmluZyBnYW1lIG92ZXIgZGF0YSB0byBzeW5jXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGdhbWUgb3ZlciBzeW5jIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTYsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNzogLy9yZWNlaXZpbmcgZGF0YSBvZiBwbGF5ZXIgdG8gZ2V0IGFsbCBwcm9maXQgbmV4dCBwYXkgZGF5XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRhdGEgb2YgcGxheWVyIHRvIGdldCBhbGwgcHJvZml0IG5leHQgcGF5IGRheVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxNywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE4OiAvL3JlY2VpdmluZyBvbmUgcXVlc3Rpb24gYXJyYXlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGF0YSBmb3Igb25lIHF1ZXN0aW9uIGFycmF5XCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE4LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTk6IC8vcmVjZWl2aW5nIGRlY2tzIGFycmF5XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRhdGEgZm9yIGRlY2tzIGFycmF5XCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE5LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjA6IC8vcmVjZWl2aW5nIGRlY2tzIGFycmF5IENvdW50ZXJcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGF0YSBmb3IgZGVja3MgYXJyYXkgY291bnRlclwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyMCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDIxOiAvL3JlY2VpdmluZyBjYXNoIGRlZHVjdCBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGNhc2ggZGVkdWN0IGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjEsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMjI6IC8vcmVjZWl2aW5nIGNhc2ggYWRkIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgY2FzaCBhZGQgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyMiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDIzOiAvL3JlY2VpdmluZyB0YWtlIG92ZXIgYnVzaW5lc3MgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZpbmcgdGFrZSBvdmVyIGJ1c2luZXNzIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjMsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyNDogLy9yZWNlaXZpbmcgZGFtYWdpbmcgaW5mb3JtYXRpb25cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2aW5nIGRhbWFnaW5nIGluZm9ybWF0aW9uXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDI0LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjU6IC8vcmVjZWl2aW5nIGRhbWFnaW5nIGluZm9ybWF0aW9uXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmluZyBkYW1hZ2luZyBpbmZvcm1hdGlvbiBEZWNpc29uXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDI1LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjY6IC8vcmVjZWl2aW5nIGJ1eSBoYWxmIGJ1c2luZXNzIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2aW5nIGJ1eSBoYWxmIGJ1c2luZXNzIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjYsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyO1xyXG4iXX0=