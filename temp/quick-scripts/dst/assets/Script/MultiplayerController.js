
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
  SendCompareDiceData: function SendCompareDiceData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.trace("Send player dice to compare");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(27, {
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
  SendCompareDiceDataDecision: function SendCompareDiceDataDecision(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.trace("Send player dice to compare decison");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(28, {
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
  SendTVADData: function SendTVADData(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.trace("SendTVADData");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(29, {
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
  SendTVADDataVotes: function SendTVADDataVotes(_data) {
    if (PhotonRef.isJoinedToRoom() == true) {
      console.trace("SendTVADDataVotes");
      console.log(_data);

      try {
        PhotonRef.raiseEvent(30, {
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

        case 27:
          //receiving dice compare data
          console.log("receiving dice compare data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(27, senderName, senderID, _data);
          break;

        case 28:
          //receiving dice compare data decison
          console.log("receiving dice compare data decison");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(28, senderName, senderID, _data);
          break;

        case 29:
          //receiving TV ad data
          console.log("receiving TV ad data");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(29, senderName, senderID, _data);
          break;

        case 30:
          //receiving TV ad data votes
          console.log("receiving TV ad data votes");
          var _data = content.Data;
          var senderName = content.senderName;
          var senderID = content.senderID;
          MultiplayerController.Instance.CallRecieveEvent(30, senderName, senderID, _data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJHYW1lRmluaXNoZWQiLCJJc01hc3RlckNsaWVudCIsIlRvdGFsVGltZXIiLCJUaW1lclN0YXJ0ZWQiLCJTY2hlZHVsYXIiLCJNYXhTdHVkZW50cyIsIlJlc3RhcnRTcGVjdGF0ZSIsIklzR2FtZVN0YXJ0ZWQiLCJUaW1lb3V0cyIsIlJvb21Qcm9wZXJ0eSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllciIsInR5cGUiLCJJbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiSW5pdGlhbFNldHVwIiwiQm9vbGVhbiIsIlBsYXllckdhbWVJbmZvIiwiVGV4dCIsIlR1cm5OdW1iZXIiLCJBcHBfSW5mbyIsIkFwcElEIiwidG9vbHRpcCIsIkFwcFZlcnNpb24iLCJXc3MiLCJkaXNwbGF5TmFtZSIsIk1hc3RlclNlcnZlciIsIkZiQXBwSUQiLCJNdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDb21wb25lbnQiLCJQaG90b25BcHBJbmZvIiwiTWF4UGxheWVycyIsIk1heFNwZWN0YXRvcnMiLCJNb2RlU2VsZWN0aW9uIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwiUmVzZXRSb29tVmFsdWVzIiwib25Mb2FkIiwiRXhpdENvbm5lY3RpbmciLCJJbml0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZU1vZGVTZWxlY3Rpb24iLCJfdmFsIiwiU2V0Q29ubmV0aW5nIiwiX3N0YXRlIiwiR2V0QWN0aXZlU3RhdHVzIiwiX3VJRCIsIl9pc0FjdGl2ZSIsIl9hcnJheSIsIkdldF9HYW1lTWFuYWdlciIsImluZGV4IiwibGVuZ3RoIiwiUGxheWVyVUlEIiwiSXNBY3RpdmUiLCJHZXRCYW5rcnVwdGVkU3RhdHVzIiwiX2lzQmFua3J1cHRlZCIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiQmFua3J1cHRlZE5leHRUdXJuIiwiR2V0U2VsZWN0ZWRNb2RlIiwiZ2FtZSIsImFkZFBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJJbml0aWFsaXplUGhvdG9uIiwiY29uc29sZSIsImxvZyIsIkFwcEluZm8iLCJEZW1vTG9hZEJhbGFuY2luZyIsIkxlYXZlUm9vbSIsIlJvb21OYW1lIiwiTWVzc2FnZSIsIkpvaW5lZFJvb20iLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJnZXRTY2VuZU5hbWUiLCJzY2VuZU5hbWUiLCJfc2NlbmVJbmZvcyIsImkiLCJ1dWlkIiwiZGlyZWN0b3IiLCJfc2NlbmUiLCJfaWQiLCJ1cmwiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsIm1hdGNoIiwiVG9nZ2xlU2hvd1Jvb21fQm9vbCIsIlRvZ2dsZUxlYXZlUm9vbV9Cb29sIiwiZ2V0UGhvdG9uUmVmIiwiUGhvdG9uQWN0b3IiLCJteUFjdG9yIiwiUm9vbUFjdG9ycyIsIm15Um9vbUFjdG9yc0FycmF5IiwiQ2hlY2tTcGVjdGF0ZSIsImN1c3RvbVByb3BlcnRpZXMiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJBcHBJZCIsIkZiQXBwSWQiLCJSZXF1ZXN0Q29ubmVjdGlvbiIsInN0YXRlIiwiaXNDb25uZWN0ZWRUb01hc3RlciIsImlzSW5Mb2JieSIsInN0YXJ0IiwiQ2hlY2tDb25uZWN0aW9uU3RhdGUiLCJfY29ubmVjdGVkIiwiaXNKb2luZWRUb1Jvb20iLCJEaXNjb25uZWN0UGhvdG9uIiwiZGlzY29ubmVjdCIsIlJlc2V0U3RhdGUiLCJPblJvb21OYW1lQ2hhbmdlIiwiT25NZXNzYWdlQ2hhbmdlIiwibXNnIiwiVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXMiLCJfcGxheWVyVXBkYXRlIiwiX3BsYXllclZhbHVlIiwiX2luaXRpYWxTZXR1cFVwZGF0ZSIsIl9pbml0aWFsU2V0dXBWYWx1ZSIsIl9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSIsIl9wbGF5ZXJHYW1lSW5mb1ZhbHVlIiwiX3R1cm5OdW1iZXJVcGRhdGUiLCJfdHVybk51bWJlcnZhbHVlIiwibXlSb29tIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDcmVhdGVSb29tIiwiX2RhdGEiLCJyb29tT3B0aW9ucyIsImlzVmlzaWJsZSIsImlzT3BlbiIsIm1heFBsYXllcnMiLCJjdXN0b21HYW1lUHJvcGVydGllcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsIlN0dWRlbnREYXRhIiwiQ291bnRlciIsInNldFVzZXJJZCIsInVzZXJJRCIsIlJvb21JRCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIkRhdGUiLCJub3ciLCJjcmVhdGVSb29tIiwiSm9pblJvb20iLCJfcm9vbU5hbWUiLCJqb2luUm9vbSIsIkpvaW5SYW5kb21Sb29tIiwiZXhwZWN0ZWRDdXN0b21Sb29tUHJvcGVydGllcyIsImpvaW5SYW5kb21Sb29tIiwiU2VuZENhcmREYXRhIiwicmFpc2VFdmVudCIsIkNhcmREYXRhIiwic2VuZGVyTmFtZSIsInNlbmRlcklEIiwiYWN0b3JOciIsInJlY2VpdmVycyIsIlBob3RvbiIsIkxvYWRCYWxhbmNpbmciLCJDb25zdGFudHMiLCJSZWNlaXZlckdyb3VwIiwiQWxsIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwiU2VuZEdhbWVPdmVyIiwiRGF0YSIsIlNlbmRHYW1lT3ZlckRhdGEiLCJTZW5kU2VsZWN0ZWRQbGF5ZXJGb3JQcm9maXQiLCJPdGhlcnMiLCJTZW5kQmFua3J1cHREYXRhIiwiU2VuZERhdGEiLCJQbGF5ZXJJbmZvIiwiU2VuZE9uZVF1ZXN0aW9uRGF0YSIsIlNlbmRPbmVRdWVzdGlvbkFycmF5cyIsIlNlbmREZWNrc0FycmF5cyIsIlNlbmREZWNrc0FycmF5Q291bnRlciIsIlNlbmRQYXJ0bmVyUHJvZml0TG9zcyIsIlNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YSIsIkRpY2VSb2xsRXZlbnQiLCJEaWNlQ291bnQiLCJTZW5kR29CYWNrU3BhY2VEYXRhIiwiU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhIiwiU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YSIsIlNlbmRJbmZvIiwiU3luY1R1cm5Db21wbGV0aW9uIiwiVUlEIiwiU3RhcnRUdXJuIiwidHJhY2UiLCJTZW5kVGFrZUJ1c2luZXNzRGF0YSIsIlNlbmREYW1hZ2luZ0RhdGEiLCJTZW5kRGFtYWdpbmdEZWNpc2lvbkRhdGEiLCJTZW5kQnV5SGFsZkJ1c2luZXNzRGF0YSIsIlNlbmRDb21wYXJlRGljZURhdGEiLCJTZW5kQ29tcGFyZURpY2VEYXRhRGVjaXNpb24iLCJTZW5kVFZBRERhdGEiLCJTZW5kVFZBRERhdGFWb3RlcyIsIlNob3dUb2FzdCIsIkNhbGxSZWNpZXZlRXZlbnQiLCJfZXZlbnRDb2RlIiwiX3NlbmRlck5hbWUiLCJfc2VuZGVySUQiLCJJbnN0YW5jZU51bGwiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsInNldFRpbWVvdXQiLCJSZWNlaXZlRXZlbnQiLCJEaXNjb25uZWN0RGF0YSIsIlJlc3RhcnRHYW1lIiwiX3RpbWVyIiwiY2xlYXJUaW1lb3V0IiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsImxvYWRTY2VuZSIsIkNoZWNrTWFzdGVyQ2xpZW50IiwiX2lzTWFzdGVyIiwibXlSb29tTWFzdGVyQWN0b3JOciIsIkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCIsIkdldFJlYWxBY3RvcnMiLCJfcmVhbFBsYXllciIsIkFsbFBsYXllcnMiLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIlJvb21Db3VudGVyIiwiU2VuZFJvb21Db21wbGV0ZWREYXRhIiwiR2V0X1VJTWFuYWdlciIsIkNsZWFyVGltZXIiLCJQcm9jZXNzQ291bnRlciIsIl9tYXN0ZXIiLCJfY291bnRlciIsIlNlbmRDYXNoRGVkdWN0RGF0YSIsIlNlbmRDYXNoQWRkaXRpb25EYXRhIiwiUm9vbUNvbXBsZXRlZCIsInN5c3RlbUV2ZW50IiwiZW1pdCIsInB1c2giLCJVcGRhdGVBY3RvckFjdGl2ZURhdGEiLCJfYWN0b3IiLCJfYWN0b3JzQXJyYXkiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkhhbmRsZVBsYXllckxlYXZlIiwiYWN0b3IiLCJQaG90b25SZWZlcmVjZSIsIl9tYW5hZ2VyIiwiX3BsYXllclR1cm4iLCJfaW5pdGlhbFNldHVwRG9uZSIsIl9pc1NwZWN0YXRlIiwiUmVtb3ZlRnJvbUNoZWNrQXJyYXkiLCJ0b1N0cmluZyIsIkNoZWNrVHVybkNvbXBsZXRlIiwiQ2hhbmdlVHVybkZvcmNlZnVsbHkiLCJTZXRQbGF5ZXJMZWZ0IiwiUmVzZXRTb21lVmFsdWVzIiwiX3BsYXllcmZvdW5kIiwic3BsaWNlIiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU3luY0RhdGEiLCJ1cGRhdGUiLCJkdCIsIm9uU3RhdGVDaGFuZ2UiLCJMQkMiLCJMb2FkQmFsYW5jaW5nQ2xpZW50IiwiU3RhdGVUb05hbWUiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJsb2dnZXIiLCJkZWJ1ZyIsIm1lc3MiLCJpbmZvIiwicGFyYW0iLCJ3YXJuIiwicGFyYW0xIiwicGFyYW0yIiwicGFyYW0zIiwiVG9nZ2xlTG9hZGluZ05vZGUiLCJleGNlcHRpb24iLCJmb3JtYXQiLCJvblJvb21MaXN0Iiwicm9vbXMiLCJSZXNldFJvb21MaXN0IiwiVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkiLCJwbGF5ZXJDb3VudCIsIm9uUm9vbUxpc3RVcGRhdGUiLCJyb29tc1VwZGF0ZWQiLCJyb29tc0FkZGVkIiwicm9vbXNSZW1vdmVkIiwib25Kb2luUm9vbSIsImxvYWRCYWxhbmNpbmdDbGllbnQiLCJ1c2VySWQiLCJfY3VzdG9tUHJvcGVydGllcyIsIm9uQWN0b3JKb2luIiwibXlSb29tQWN0b3JDb3VudCIsIm9uQWN0b3JMZWF2ZSIsIkdhbWVPdmVyIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIkdldFR1cm5OdW1iZXIiLCJfdUlHYW1lTWFuYWdlciIsIm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlIiwib25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlIiwib25FcnJvciIsImVycm9yQ29kZSIsImVycm9yTXNnIiwib25FdmVudCIsImNvZGUiLCJjb250ZW50IiwiUGxheWVySW5mb0RhdGEiLCJfVHVybiIsIl9kaWNlIiwiX0lEIiwiX2NhcmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsU0FBSjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsS0FBckI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsSUFBaEI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxJQUFJQyxlQUFlLEdBQUcsS0FBdEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsS0FBcEI7QUFDQSxJQUFJQyxRQUFRLEdBQUcsRUFBZixFQUVBOztBQUNBLElBQUlDLFlBQVksR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDMUJDLEVBQUFBLElBQUksRUFBRSxjQURvQjtBQUUxQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLE1BQU0sRUFBRTtBQUNOLGlCQUFTLENBREg7QUFFTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLE9BRkg7QUFHTkMsTUFBQUEsWUFBWSxFQUFFO0FBSFIsS0FERTtBQU1WQyxJQUFBQSxZQUFZLEVBQUU7QUFDWixpQkFBUyxLQURHO0FBRVpILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUyxPQUZH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LEtBQTFFO0FBRUE7O0FBQ0Y7QUFqUkY7QUFtUkQsS0FyUkQ7QUFzUkQ7QUEvaEVrQyxDQUFULENBQTVCO0FBa2lFQXNMLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpSLHFCQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9HbG9iYWwgVmFyaWFibGVzXHJcbnZhciBQaG90b25SZWY7XHJcbnZhciBzdGF0ZVRleHQgPSBcIlwiO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIFNob3dSb29tID0gZmFsc2U7XHJcbnZhciBHYW1lRmluaXNoZWQgPSBmYWxzZTtcclxudmFyIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbnZhciBUb3RhbFRpbWVyID0gMzA7XHJcbnZhciBUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxudmFyIFNjaGVkdWxhciA9IG51bGw7XHJcbnZhciBNYXhTdHVkZW50cyA9IDY7XHJcbnZhciBSZXN0YXJ0U3BlY3RhdGUgPSBmYWxzZTtcclxudmFyIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxudmFyIFRpbWVvdXRzID0gW107XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGRhdGEgcmVsYXRlZCB0byBSb29tUHJvcGVydHktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUm9vbVByb3BlcnR5ID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUm9vbVByb3BlcnR5XCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBJbml0aWFsU2V0dXA6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJHYW1lSW5mbzoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVHVybk51bWJlcjoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGRhdGEgcmVsYXRlZCB0byBBcHBfSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBBcHBfSW5mbyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkFwcF9JbmZvXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgQXBwSUQ6IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFwcCBpZCBmb3JtIHBob3RvbiBkYXNoYm9hcmRcIixcclxuICAgIH0sXHJcbiAgICBBcHBWZXJzaW9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBcHAgdmVyc2lvbiBmb3IgcGhvdG9uXCIsXHJcbiAgICB9LFxyXG4gICAgV3NzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzU2VjdXJlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiSWYgcGhvdG9uIHNob3VsZCB1c2Ugc2VjdXJlIGFuZCByZWxpYWJsZSBwcm90b2NvbHNcIixcclxuICAgIH0sXHJcbiAgICBNYXN0ZXJTZXJ2ZXI6IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm1hc3RlciBzZXJ2ZXIgZm9yIHBob3RvbiB0byBjb25uZWN0XCIsXHJcbiAgICB9LFxyXG4gICAgRmJBcHBJRDoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiRkIgYXBwIGlkIHVzZWQgZm9yIEZCIGF1dGhlcml6YXRpb25cIixcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIE11bHRpcGxheWVyQ29udHJvbGxlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgTXVsdGlwbGF5ZXJDb250cm9sbGVyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiTXVsdGlwbGF5ZXJDb250cm9sbGVyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBob3RvbkFwcEluZm86IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogQXBwX0luZm8sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBNYXhQbGF5ZXJzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBNYXhTcGVjdGF0b3JzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBNb2RlU2VsZWN0aW9uOiB7XHJcbiAgICAgIC8vIDEgbWVhbnMgYm90ICwgMiBtZWFucyByZWFsIHBsYXllcnNcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICAvL2NyZWF0aW5nIHN0YXRpYyBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFJlc2V0QWxsRGF0YSgpIHtcclxuICAgIFRpbWVvdXRzID0gW107XHJcbiAgICBJc0dhbWVTdGFydGVkID0gZmFsc2U7XHJcbiAgICBQaG90b25SZWYgPSBudWxsO1xyXG4gICAgc3RhdGVUZXh0ID0gXCJcIjtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICBTaG93Um9vbSA9IGZhbHNlO1xyXG4gICAgR2FtZUZpbmlzaGVkID0gZmFsc2U7XHJcbiAgICBJc01hc3RlckNsaWVudCA9IGZhbHNlO1xyXG4gICAgVG90YWxUaW1lciA9IDMwO1xyXG4gICAgVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICBTY2hlZHVsYXIgPSBudWxsO1xyXG4gICAgdGhpcy5SZXNldFJvb21WYWx1ZXMoKTtcclxuICAgIE1heFN0dWRlbnRzID0gNjtcclxuICAgIFJlc3RhcnRTcGVjdGF0ZSA9IGZhbHNlO1xyXG4gIH0sXHJcbiAgLy90aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3MgaXMgY3JlYXRlZFxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuRXhpdENvbm5lY3RpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuUmVzZXRBbGxEYXRhKCk7XHJcbiAgICB0aGlzLkluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlTW9kZVNlbGVjdGlvbihcclxuICAgIF92YWwgLy8gMSBtZWFucyBib3QgLCAyIG1lYW5zIHJlYWwgcGxheWVyc1xyXG4gICkge1xyXG4gICAgdGhpcy5Nb2RlU2VsZWN0aW9uID0gX3ZhbDtcclxuICB9LFxyXG5cclxuICBTZXRDb25uZXRpbmcoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkV4aXRDb25uZWN0aW5nID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEdldEFjdGl2ZVN0YXR1cyhfdUlEID0gXCJcIikge1xyXG4gICAgdmFyIF9pc0FjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgdmFyIF9hcnJheSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX2FycmF5W2luZGV4XS5QbGF5ZXJVSUQgPT0gX3VJRCkge1xyXG4gICAgICAgIGlmIChfYXJyYXlbaW5kZXhdLklzQWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICBfaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2lzQWN0aXZlO1xyXG4gIH0sXHJcblxyXG4gIEdldEJhbmtydXB0ZWRTdGF0dXMoX3VJRCA9IFwiXCIpIHtcclxuICAgIHZhciBfaXNCYW5rcnVwdGVkID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIF9hcnJheSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX2FycmF5W2luZGV4XS5QbGF5ZXJVSUQgPT0gX3VJRCkge1xyXG4gICAgICAgIGlmIChfYXJyYXlbaW5kZXhdLkNhcmRGdW5jdGlvbmFsaXR5LkJhbmtydXB0ZWROZXh0VHVybiA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBfaXNCYW5rcnVwdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2lzQmFua3J1cHRlZDtcclxuICB9LFxyXG5cclxuICBHZXRTZWxlY3RlZE1vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5Nb2RlU2VsZWN0aW9uO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgSW5pdGlhbGl6ZSBzb21lIGVzc2VudGFpbHMgZGF0YSBmb3IgbXVsdGlwbGF5ZXIgY29udHJvbGxlciBjbGFzc1xyXG4gICAgQG1ldGhvZCBJbml0X011bHRpcGxheWVyQ29udHJvbGxlclxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBJbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpIHtcclxuICAgIGlmICghTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlKSB7XHJcbiAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgIHRoaXMuSW5pdGlhbGl6ZVBob3RvbigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhBcHBJbmZvKTtcclxuICAgICAgUGhvdG9uUmVmID0gbmV3IERlbW9Mb2FkQmFsYW5jaW5nKCk7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5MZWF2ZVJvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuUm9vbU5hbWUgPSBcIlwiO1xyXG4gICAgdGhpcy5NZXNzYWdlID0gXCJcIjtcclxuICAgIFNob3dSb29tID0gZmFsc2U7XHJcbiAgICB0aGlzLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjaGVjayByZWZlcmVuY2UgdG8gc29tZSB2YXJpYWJsZXMgYW5kIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmVtb3ZlIHBlcnNpc3Qgbm9kZSB3aGVuIHdhbnQgdG8gcmVzdGFydCBzY2VuZVxyXG4gICAgQG1ldGhvZCBSZW1vdmVQZXJzaXN0Tm9kZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBSZW1vdmVQZXJzaXN0Tm9kZSgpIHtcclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSA9IG51bGw7XHJcbiAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gZ2V0IG5hbWUgb2YgY3VycmVudCBvcGVuZWQgc2NlbmVcclxuICAgIEBtZXRob2QgZ2V0U2NlbmVOYW1lXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge3N0cmluZ30gc2NlbmVOYW1lXHJcbiAgICAqKi9cclxuICBnZXRTY2VuZU5hbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzY2VuZU5hbWU7XHJcbiAgICB2YXIgX3NjZW5lSW5mb3MgPSBjYy5nYW1lLl9zY2VuZUluZm9zO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfc2NlbmVJbmZvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoX3NjZW5lSW5mb3NbaV0udXVpZCA9PSBjYy5kaXJlY3Rvci5fc2NlbmUuX2lkKSB7XHJcbiAgICAgICAgc2NlbmVOYW1lID0gX3NjZW5lSW5mb3NbaV0udXJsO1xyXG4gICAgICAgIHNjZW5lTmFtZSA9IHNjZW5lTmFtZS5zdWJzdHJpbmcoc2NlbmVOYW1lLmxhc3RJbmRleE9mKFwiL1wiKSArIDEpLm1hdGNoKC9bXlxcLl0rLylbMF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzY2VuZU5hbWU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBzZXQgXCJTaG93Um9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlU2hvd1Jvb21fQm9vbFxyXG4gICAgQHBhcmFtIHtib29sZWFufSBfc3RhdGVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgKiovXHJcbiAgVG9nZ2xlU2hvd1Jvb21fQm9vbChfc3RhdGUpIHtcclxuICAgIFNob3dSb29tID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gc2V0IFwiTGVhdmVSb29tXCIgYm9vbCB2YWx1ZVxyXG4gICAgQG1ldGhvZCBUb2dnbGVMZWF2ZVJvb21fQm9vbFxyXG4gICAgQHBhcmFtIHtib29sZWFufSBfc3RhdGVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgKiovXHJcbiAgVG9nZ2xlTGVhdmVSb29tX0Jvb2woX3N0YXRlKSB7XHJcbiAgICB0aGlzLkxlYXZlUm9vbSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgUGhvdG9uIFwiUGhvdG9uUmVmXCIgaW5zdGFuY2UgY3JlYXRlZCBieSBtdWx0aXBsYXllciBjbGFzc1xyXG4gICAgQG1ldGhvZCBnZXRQaG90b25SZWZcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBQaG90b25SZWZcclxuICAgICoqL1xyXG4gIGdldFBob3RvblJlZigpIHtcclxuICAgIHJldHVybiBQaG90b25SZWY7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIG15QWN0b3IgaW5zdGFuY2UgY3JlYXRlZCBieSBwaG90b25cclxuICAgIEBtZXRob2QgUGhvdG9uQWN0b3JcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBBY3RvclxyXG4gICAgKiovXHJcbiAgUGhvdG9uQWN0b3IoKSB7XHJcbiAgICByZXR1cm4gUGhvdG9uUmVmLm15QWN0b3IoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgbXlSb29tQWN0b3JzQXJyYXkgY3JlYXRlZCBieSBwaG90b25cclxuICAgIEBtZXRob2QgUm9vbUFjdG9yc1xyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IEFjdG9yXHJcbiAgICAqKi9cclxuICBSb29tQWN0b3JzKCkge1xyXG4gICAgcmV0dXJuIFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBpc1NwZWN0YXRlIHZhcmlhYmxlIGZyb20gY3VzdG9tIHByb3BlcnR5IG9mIGN1cnJlbnQgYWN0b3JcclxuICAgIEBtZXRob2QgQ2hlY2tTcGVjdGF0ZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBpc1NwZWN0YXRlXHJcbiAgICAqKi9cclxuICBDaGVja1NwZWN0YXRlKCkge1xyXG4gICAgcmV0dXJuIFBob3RvblJlZi5teUFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgSW5pdGlhbGl6ZSBwaG90b24gd2l0aCBhcHBpZCxhcHAgdmVyc2lvbiwgV3NzIGV0Y1xyXG4gICAgQG1ldGhvZCBJbml0aWFsaXplUGhvdG9uXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEluaXRpYWxpemVQaG90b24oKSB7XHJcbiAgICBBcHBJbmZvLkFwcElkID0gdGhpcy5QaG90b25BcHBJbmZvLkFwcElEO1xyXG4gICAgQXBwSW5mby5BcHBWZXJzaW9uID0gdGhpcy5QaG90b25BcHBJbmZvLkFwcFZlcnNpb247XHJcbiAgICBBcHBJbmZvLldzcyA9IHRoaXMuUGhvdG9uQXBwSW5mby5Xc3M7XHJcbiAgICBBcHBJbmZvLk1hc3RlclNlcnZlciA9IHRoaXMuUGhvdG9uQXBwSW5mby5NYXN0ZXJTZXJ2ZXI7XHJcbiAgICBBcHBJbmZvLkZiQXBwSWQgPSB0aGlzLlBob3RvbkFwcEluZm8uRmJBcHBJRDtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgY29ubmVjdGlvbiByZXF1ZXN0IHRvIHBob3RvblxyXG4gICAgQG1ldGhvZCBSZXF1ZXN0Q29ubmVjdGlvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBSZXF1ZXN0Q29ubmVjdGlvbigpIHtcclxuICAgIGlmIChQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUpIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBjb25uZWN0ZWRcIik7XHJcbiAgICBlbHNlIFBob3RvblJlZi5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIENoZWNrQ29ubmVjdGlvblN0YXRlKCkge1xyXG4gICAgdmFyIF9jb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgIGlmIChQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuc3RhdGUgPT0gNyB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgY29ubmVjdGVkXCIpO1xyXG4gICAgICBfY29ubmVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhQaG90b25SZWYuc3RhdGUpO1xyXG4gICAgcmV0dXJuIF9jb25uZWN0ZWQ7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBEaXNjb25uZWN0IGZyb20gcGhvdG9uXHJcbiAgICBAbWV0aG9kIERpc2Nvbm5lY3RQaG90b25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgRGlzY29ubmVjdFBob3RvbigpIHtcclxuICAgIC8vaWYgKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuc3RhdGUgPT0gNyB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICBQaG90b25SZWYuZGlzY29ubmVjdCgpO1xyXG4gICAgdGhpcy5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICAvL1Bob3RvblJlZi5sZWF2ZVJvb20oKTtcclxuICAgIHRoaXMuUmVzZXRTdGF0ZSgpO1xyXG4gICAgLy8gIH0gZWxzZSB7XHJcbiAgICAvLyAgICBjb25zb2xlLmxvZyhcIm5vdCBpbnNpZGUgYW55IHJvb20gb3IgbG9iYnkgb3IgY29ubmVjdGVkIHRvIHBob3RvblwiKTtcclxuICB9LFxyXG4gIC8vIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmVzZXRpbmcgZmV3IHZhbHVlc1xyXG4gICAgQG1ldGhvZCBSZXNldFN0YXRlXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFJlc2V0U3RhdGUoKSB7XHJcbiAgICBJc0dhbWVTdGFydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkxlYXZlUm9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICBTaG93Um9vbSA9IGZhbHNlO1xyXG4gICAgc3RhdGVUZXh0ID0gXCJcIjtcclxuICAgIHRoaXMuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiByb29tIG5hbWUgZ290IGlucHV0IGZyb20gZ2FtZVxyXG4gICAgQG1ldGhvZCBPblJvb21OYW1lQ2hhbmdlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIE9uUm9vbU5hbWVDaGFuZ2UobmFtZSkge1xyXG4gICAgdGhpcy5Sb29tTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBtZXNzYWdlIHdpbmRvdyBnb3QgaW5wdXQgZnJvbSBnYW1lXHJcbiAgICBAbWV0aG9kIE9uTWVzc2FnZUNoYW5nZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG1zZ1xyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIE9uTWVzc2FnZUNoYW5nZShtc2cpIHtcclxuICAgIHRoaXMuTWVzc2FnZSA9IG1zZztcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHVwZGF0ZSBjdXN0b20gcm9vbSBwcm9wZXJ0aWVzXHJcbiAgICBAbWV0aG9kIFVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXMoX3BsYXllclVwZGF0ZSA9IGZhbHNlLCBfcGxheWVyVmFsdWUgPSAwLCBfaW5pdGlhbFNldHVwVXBkYXRlID0gZmFsc2UsIF9pbml0aWFsU2V0dXBWYWx1ZSA9IGZhbHNlLCBfcGxheWVyR2FtZUluZm9VcGRhdGUgPSBmYWxzZSwgX3BsYXllckdhbWVJbmZvVmFsdWUgPSBudWxsLCBfdHVybk51bWJlclVwZGF0ZSA9IGZhbHNlLCBfdHVybk51bWJlcnZhbHVlID0gMCkge1xyXG4gICAgaWYgKF9wbGF5ZXJVcGRhdGUpIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclwiLCBfcGxheWVyVmFsdWUsIHRydWUpO1xyXG5cclxuICAgIGlmIChfaW5pdGlhbFNldHVwVXBkYXRlKSBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIiwgX2luaXRpYWxTZXR1cFZhbHVlLCB0cnVlKTtcclxuXHJcbiAgICBpZiAoX3BsYXllckdhbWVJbmZvVXBkYXRlKSBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCBfcGxheWVyR2FtZUluZm9WYWx1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKF90dXJuTnVtYmVyVXBkYXRlKSBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIF90dXJuTnVtYmVydmFsdWUsIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY3JlYXRlIHJvb20gcmVxdWVzdFxyXG4gICAgQG1ldGhvZCBDcmVhdGVSb29tXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIENyZWF0ZVJvb20oKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5zdGF0ZSA9PSA4KSB7XHJcbiAgICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBfZGF0YSA9IG5ldyBSb29tUHJvcGVydHkoKTtcclxuICAgICAgICBfZGF0YS5QbGF5ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBpc1Zpc2libGU6IHRydWUsXHJcbiAgICAgICAgICBpc09wZW46IHRydWUsXHJcbiAgICAgICAgICBtYXhQbGF5ZXJzOiB0aGlzLk1heFBsYXllcnMgKyB0aGlzLk1heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICBjdXN0b21HYW1lUHJvcGVydGllczogX2RhdGEsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwgeyBJc1NwZWN0YXRlOiBmYWxzZSB9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIiwgeyBDb3VudGVyOiBUb3RhbFRpbWVyIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuICAgICAgICB2YXIgUm9vbUlEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSk7XHJcblxyXG4gICAgICAgIFBob3RvblJlZi5jcmVhdGVSb29tKFwiUm9vbV9cIiArIFJvb21JRCwgcm9vbU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGpvaW4gcm9vbSByZXF1ZXN0IGJ5IG5hbWVcclxuICAgIEBtZXRob2QgSm9pblJvb21cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBfcm9vbU5hbWVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBKb2luUm9vbShfcm9vbU5hbWUpIHtcclxuICAgIGlmIChQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUgfHwgUGhvdG9uUmVmLnN0YXRlID09IDgpIHtcclxuICAgICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IGZhbHNlIHx8IFBob3RvblJlZi5zdGF0ZSAhPSA4KSB7XHJcbiAgICAgICAgdmFyIHJvb21PcHRpb25zID0ge1xyXG4gICAgICAgICAgaXNWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgaXNPcGVuOiBmYWxzZSxcclxuICAgICAgICAgIG1heFBsYXllcnM6IHRoaXMuTWF4UGxheWVycyArIHRoaXMuTWF4U3BlY3RhdG9ycyxcclxuICAgICAgICAgIC8vXCJjdXN0b21HYW1lUHJvcGVydGllc1wiOntcIlJvb21Fc3NlbnRpYWxzXCI6IHtJc1NwZWN0YXRlOnRydWV9fVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHsgSXNTcGVjdGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIiwgeyBDb3VudGVyOiBUb3RhbFRpbWVyIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuXHJcbiAgICAgICAgUGhvdG9uUmVmLmpvaW5Sb29tKF9yb29tTmFtZSwgcm9vbU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGpvaW4gcmFuZG9tIHJvb21cclxuICAgIEBtZXRob2QgSm9pblJhbmRvbVJvb21cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgSm9pblJhbmRvbVJvb20oKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLnN0YXRlID09IDUgfHwgUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5zdGF0ZSA9PSA4KSB7XHJcbiAgICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSBmYWxzZSB8fCBQaG90b25SZWYuc3RhdGUgIT0gOCkge1xyXG4gICAgICAgIHZhciBfZGF0YSA9IG5ldyBSb29tUHJvcGVydHkoKTtcclxuICAgICAgICBfZGF0YS5QbGF5ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAvL1wiZXhwZWN0ZWRNYXhQbGF5ZXJzXCI6dGhpcy5NYXhQbGF5ZXJzK01heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICBleHBlY3RlZEN1c3RvbVJvb21Qcm9wZXJ0aWVzOiBfZGF0YSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7IElzU3BlY3RhdGU6IGZhbHNlIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tQ291bnRlclwiLCB7IENvdW50ZXI6IFRvdGFsVGltZXIgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG5cclxuICAgICAgICBQaG90b25SZWYuam9pblJhbmRvbVJvb20ocm9vbU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgY2FyZCBpbmRleCBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZENhcmREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kQ2FyZERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBjYXJkIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDUsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIENhcmREYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGdhbWUgb3ZlciBjYWxsXHJcbiAgICBAbWV0aG9kIFNlbmRHYW1lT3ZlclxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZEdhbWVPdmVyKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZ2FtZSBvdmVyIGNhbGxcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDYsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kR2FtZU92ZXJEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZ2FtZSBvdmVyIGRhdGEgdG8gc3luY1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTYsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kU2VsZWN0ZWRQbGF5ZXJGb3JQcm9maXQoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBnYW1lIG92ZXIgZGF0YSB0byBzeW5jXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxNyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBiYWNrcnVwdCBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRCYW5rcnVwdERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRCYW5rcnVwdERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBiYW5rcnVwY3kgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgOSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBQbGF5ZXIgRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmREYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgcGxheWVyIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllckluZm86IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgb25lIHF1ZXN0aW9uIERhdGEgb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRPbmVRdWVzdGlvbkRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRPbmVRdWVzdGlvbkRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRPbmVRdWVzdGlvbkFycmF5cyhfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiBhcnJheXNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE4LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZERlY2tzQXJyYXlzKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZGVja3MgYXJyYXlzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxOSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmREZWNrc0FycmF5Q291bnRlcihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGRlY2tzIGFycmF5cyBjb3VudGVyc1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjAsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBwcm9maXQgb3IgbG9zcyB0byB5b3VyIHBhc3J0bmVyXHJcbiAgICBAbWV0aG9kIFNlbmRQYXJ0bmVyUHJvZml0TG9zc1xyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFBhcnRuZXJQcm9maXRMb3NzKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEzLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIG9uZSBxdWVzdGlvbiByZXNwb25zZSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gcmVzcG9uc2UgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgOCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBkaWNlIGRhdGFcclxuICAgIEBtZXRob2QgRGljZVJvbGxFdmVudFxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgRGljZVJvbGxFdmVudChfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGRpY2UgY291bnRcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERpY2VDb3VudDogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBnbyBiYWNrIHNwYWNlcyBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRHb0JhY2tTcGFjZURhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRHb0JhY2tTcGFjZURhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZCBnbyBiYWNrIHNwYWNlcyBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZGluZyBvcGVuIGludml0YXRpb24gdG8gYWxsIHBsYXllcnMgZm9yIHBhcnRuZXIgc2hpcFxyXG4gICAgQG1ldGhvZCBTZW5kUGFydG5lclNoaXBPZmZlckRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRQYXJ0bmVyU2hpcE9mZmVyRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBhcnRuZXIgc2hpcCBvZmZlclwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTEsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmRpbmcgcGFydG5lciBhbnN3ZXIgZGF0YSAoYWNjZXB0IG9yIHJlamVjdClcclxuICAgIEBtZXRob2QgU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBhcnRlbnJzaGlwIGFuc3dlciBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRJbmZvKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgaW5mb1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTUsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgdXNlciBpZCBvZiBwbGF5ZXIgdG8gYWxsIG90aGVyIHdobyBoYWQgY29tcGxldGVkIHRoZWlyIHR1cm5cclxuICAgIEBtZXRob2QgU3luY1R1cm5Db21wbGV0aW9uXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTeW5jVHVybkNvbXBsZXRpb24oX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyB0dXJuIGNvbXBsZXRpb24gZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgVUlEOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTdGFydCBUdXJuIGZvciBpbml0aWFsIHR1cm5cclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTdGFydFR1cm4oX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTdGFydGluZyBUdXJuXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBUdXJuTnVtYmVyOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZFRha2VCdXNpbmVzc0RhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTZW5kIFRha2UgQnVzaW5lc3MgRGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kRGFtYWdpbmdEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLnRyYWNlKFwiU2VuZCBwbGF5ZXIgcmVjZWl2ZWQgZGFtYWdpbmcgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjQsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kRGFtYWdpbmdEZWNpc2lvbkRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTZW5kIHBsYXllciByZWNlaXZlZCBkYW1hZ2luZyBkYXRhIGRlY2lzaW9uXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyNSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRCdXlIYWxmQnVzaW5lc3NEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLnRyYWNlKFwiU2VuZCBwbGF5ZXIgcmVjZWl2ZWQgZGFtYWdpbmcgZGF0YSBkZWNpc2lvblwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjYsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kQ29tcGFyZURpY2VEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLnRyYWNlKFwiU2VuZCBwbGF5ZXIgZGljZSB0byBjb21wYXJlXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyNyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRDb21wYXJlRGljZURhdGFEZWNpc2lvbihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlNlbmQgcGxheWVyIGRpY2UgdG8gY29tcGFyZSBkZWNpc29uXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyOCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRUVkFERGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlNlbmRUVkFERGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjksXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kVFZBRERhdGFWb3RlcyhfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlNlbmRUVkFERGF0YVZvdGVzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAzMCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2hvdyB0b2FzdCBtZXNzYWdlIG9uIHRoZSBjb25zb2xlXHJcbiAgICBAbWV0aG9kIFNob3dUb2FzdFxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgbWVzc2FnZSB0byBiZSBzaG93biBcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidG9hc3QgbWVzc2FnZTogXCIgKyBtc2cpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgUmVjZWl2ZSBldmVudCBmcm9tIHBob3RvbiByYWlzZSBvbiBcclxuICAgIEBtZXRob2QgQ2FsbFJlY2lldmVFdmVudFxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIENhbGxSZWNpZXZlRXZlbnQ6IGZ1bmN0aW9uIChfZXZlbnRDb2RlLCBfc2VuZGVyTmFtZSwgX3NlbmRlcklELCBfZGF0YSkge1xyXG4gICAgdmFyIEluc3RhbmNlTnVsbCA9IHRydWU7XHJcblxyXG4gICAgLy90byBjaGVjayBpZiBpbnN0YW5jZSBpcyBudWxsIGluIGNhc2UgY2xhc3MgaW5zdGFuY2UgaXMgbm90IGxvYWRlZCBhbmQgaXRzIHJlY2VpdmVzIGNhbGxiYWNrXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkgPT0gbnVsbCkge1xyXG4gICAgICBJbnN0YW5jZU51bGwgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkNhbGxSZWNpZXZlRXZlbnQoX2V2ZW50Q29kZSwgX3NlbmRlck5hbWUsIF9zZW5kZXJJRCwgX2RhdGEpO1xyXG4gICAgICB9LCA1MCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnN0YW5jZU51bGwgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIF9zZW5kZXJOYW1lLCBfc2VuZGVySUQsIF9kYXRhKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBEaXNjb25uZWN0RGF0YSgpIHtcclxuICAgIEdhbWVGaW5pc2hlZCA9IHRydWU7XHJcbiAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gIH0sXHJcblxyXG4gIFJlc3RhcnRHYW1lKF90aW1lciA9IDApIHtcclxuICAgIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgVGltZW91dHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0c1tpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgIH0sIF90aW1lcik7XHJcbiAgICAvLyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKClcclxuICB9LFxyXG5cclxuICBDaGVja01hc3RlckNsaWVudChfaWQpIHtcclxuICAgIHZhciBfaXNNYXN0ZXIgPSBmYWxzZTtcclxuICAgIGlmIChQaG90b25SZWYubXlSb29tTWFzdGVyQWN0b3JOcigpID09IF9pZCAmJiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgPT0gX2lkKSB7XHJcbiAgICAgIF9pc01hc3RlciA9IHRydWU7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUuZXJyb3IoX2lzTWFzdGVyKTtcclxuICAgIHJldHVybiBfaXNNYXN0ZXI7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCkge1xyXG4gICAgdmFyIF9pc01hc3RlciA9IGZhbHNlO1xyXG4gICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciA9PSBQaG90b25SZWYubXlSb29tTWFzdGVyQWN0b3JOcigpKSB7XHJcbiAgICAgIF9pc01hc3RlciA9IHRydWU7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jb25zb2xlLmVycm9yKF9pc01hc3Rlcik7XHJcbiAgICByZXR1cm4gX2lzTWFzdGVyO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0Um9vbVZhbHVlcygpIHtcclxuICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBJc01hc3RlckNsaWVudCA9IGZhbHNlO1xyXG4gICAgICBUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIH0sIDEwMDApO1xyXG4gIH0sXHJcblxyXG4gIEdldFJlYWxBY3RvcnMoKSB7XHJcbiAgICB2YXIgX3JlYWxQbGF5ZXIgPSAwO1xyXG4gICAgdmFyIEFsbFBsYXllcnMgPSBQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBbGxQbGF5ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoQWxsUGxheWVyc1tpbmRleF0uZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICBfcmVhbFBsYXllcisrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3JlYWxQbGF5ZXI7XHJcbiAgfSxcclxuXHJcbiAgUm9vbUNvdW50ZXIoX3RpbWVyKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICAgIHZhciBfZGF0YSA9IG51bGw7XHJcbiAgICBTY2hlZHVsYXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKElzTWFzdGVyQ2xpZW50KSB7XHJcbiAgICAgICAgaWYgKF90aW1lciA+IDApIHtcclxuICAgICAgICAgIF90aW1lci0tO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coX3RpbWVyKTtcclxuICAgICAgICAgIHRoaXMuUm9vbUNvdW50ZXIoX3RpbWVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcInRpbWVyIGNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgIGlmICh0aGlzLkdldFJlYWxBY3RvcnMoKSA+IDEpIHtcclxuICAgICAgICAgICAgLy9pZiBoYXMgbW9yZSB0aGFuIG9uZSBwbGF5ZXIgc3RhcnQgcmVhbCBnYW1lXHJcbiAgICAgICAgICAgIHRoaXMuU2VuZFJvb21Db21wbGV0ZWREYXRhKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJObyBvbmxpbmUgcGxheWVyIHdhcyBmb3VuZCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlclwiKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5FeGl0Q29ubmVjdGluZygpO1xyXG5cclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlRvZ2dsZU1vZGVTZWxlY3Rpb24oMSk7XHJcbiAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Ub2dnbGVTaG93Um9vbV9Cb29sKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzID0gMjtcclxuICAgICAgICAgICAgLy8gY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgICAgICAgIC8vIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luZWRSb29tID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgICAgIC8vIH0sIDEwMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICAgICAgfVxyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJUaW1lcigpIHtcclxuICAgIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgX3RpbWVyID0gMDtcclxuICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gIH0sXHJcblxyXG4gIFByb2Nlc3NDb3VudGVyKCkge1xyXG4gICAgdmFyIF9tYXN0ZXIgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCk7XHJcbiAgICBpZiAoX21hc3Rlcikge1xyXG4gICAgICBpZiAoIVRpbWVyU3RhcnRlZCkge1xyXG4gICAgICAgIFRpbWVyU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgdmFyIF9jb3VudGVyID0gUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIpW1wiQ291bnRlclwiXTtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUm9vbUNvdW50ZXIoX2NvdW50ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIHJvb20gY29tcGxldGVkIGRhdGFcclxuICAgIEBtZXRob2QgU2VuZFJvb21Db21wbGV0ZWREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kUm9vbUNvbXBsZXRlZERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBSb29tQ29tcGxldGVkRGF0YVwiKTtcclxuICAgICAgLy8gIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE0LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZENhc2hEZWR1Y3REYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgU2VuZENhc2hEZWR1Y3REYXRhXCIpO1xyXG4gICAgICAvLyAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjEsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kQ2FzaEFkZGl0aW9uRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIFNlbmRDYXNoQWRkaXRpb25EYXRhXCIpO1xyXG4gICAgICAvLyAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjIsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSb29tQ29tcGxldGVkKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9yZWFsUGxheWVyID0gdGhpcy5HZXRSZWFsQWN0b3JzKCk7XHJcbiAgICAgIElzR2FtZVN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycyA9IF9yZWFsUGxheWVyO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFsbCByZXF1aXJlZCBwbGF5ZXJzIGpvaW5lZCwgc3RhcnRpbmcgdGhlIGdhbWUuLlwiKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgIFRpbWVvdXRzLnB1c2goXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTtcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgICApOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKHRydWUsIF9yZWFsUGxheWVyLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBudWxsLCBmYWxzZSwgMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQWN0b3JBY3RpdmVEYXRhKF9hY3Rvcikge1xyXG4gICAgdmFyIF9hY3RvcnNBcnJheSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIHZhciBfZGF0YSA9IG51bGw7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBfZGF0YSA9IF9hY3RvcnNBcnJheVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgaWYgKF9kYXRhLlBsYXllclVJRCA9PSBfYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgIF9kYXRhLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgX2FjdG9yc0FycmF5W2luZGV4XS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwidXBkYXRpbmcgYWN0aXZlIHN0YXR1cyBvZiB0aGUgcGxheWVyIHdobyBoYXMgbGVmdC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlwiKTtcclxuICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgfSxcclxuXHJcbiAgSGFuZGxlUGxheWVyTGVhdmUoYWN0b3IgPSBudWxsLCBQaG90b25SZWZlcmVjZSA9IG51bGwsIF9tYW5hZ2VyID0gbnVsbCwgX3BsYXllclR1cm4gPSAwLCBfaW5pdGlhbFNldHVwRG9uZSA9IGZhbHNlLCBfaXNTcGVjdGF0ZSA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2luaXRpYWxTZXR1cERvbmUpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZUFjdG9yQWN0aXZlRGF0YShhY3Rvcik7XHJcbiAgICAgICAgICBpZiAoIV9pc1NwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGxlZnQ6IFwiICsgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJlbW92ZUZyb21DaGVja0FycmF5KF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLkNoZWNrVHVybkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChfcGxheWVyVHVybiA9PSBpbmRleCAmJiBQaG90b25SZWZlcmVjZS5teUFjdG9yKCkuYWN0b3JOciA9PSBQaG90b25SZWZlcmVjZS5teVJvb21NYXN0ZXJBY3Rvck5yKCkpIHtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5DaGFuZ2VUdXJuRm9yY2VmdWxseSgpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlIHR1cm4gZm9yY2VmdWxseVwiKTtcclxuICAgICAgICAgICAgICBfbWFuYWdlci5TZXRQbGF5ZXJMZWZ0KHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfbWFuYWdlci5SZXNldFNvbWVWYWx1ZXMoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIF91SU1hbmFnZXIuU2hvd1RvYXN0KFwicGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDEwMDApO1xyXG4gICAgICB2YXIgX3BsYXllcmZvdW5kID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycy0tO1xyXG4gICAgICAgICAgX3BsYXllcmZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVBY3RvckFjdGl2ZURhdGEoYWN0b3IpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIV9wbGF5ZXJmb3VuZCkge1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzLS07XHJcbiAgICAgICAgaWYgKCFfaXNTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN5bmNEYXRhKG51bGwsIGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coX21hbmFnZXIuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICBjb25zb2xlLmxvZyhNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvL2NhbGxlZCBldmVyeSBmcmFtZVxyXG4gIHVwZGF0ZShkdCkge1xyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgdGhlcmUgaXMgc29tZSBjaGFuZ2UgaW4gY29ubmVjdGlvbiBzdGF0ZVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uU3RhdGVDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHN0YXRlXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgICAgLy8jcmVnaW9uIENvbm5lY3Rpb24gU3RhdGVzXHJcbiAgICAgIC8vc3RhdGUgMSA6IGNvbm5lY3RpbmdUb05hbWVTZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSAyIDogQ29ubmVjdGVkVG9OYW1lU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgMyA6IENvbm5lY3RpbmdUb01hc3RlclNlcnZlclxyXG4gICAgICAvL1N0YXRlIDQgOiBDb25uZWN0ZWRUb01hc3RlclNlcnZlclxyXG4gICAgICAvL1N0YXRlIDU6ICBKb2luZWRMb2JieVxyXG4gICAgICAvL1N0YXRlIDYgOiBDb25uZWN0aW5nVG9HYW1lc2VydmVyXHJcbiAgICAgIC8vU3RhdGUgNyA6IENvbm5lY3RlZFRvR2FtZXNlcnZlclxyXG4gICAgICAvL1N0YXRlIDggOiBKb2luZWRcclxuICAgICAgLy9TdGF0ZSAxMDogRGlzY29ubmVjdGVkXHJcbiAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgdmFyIExCQyA9IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkxvYWRCYWxhbmNpbmdDbGllbnQ7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU3RhdGVDb2RlOiBcIiArIHN0YXRlICsgXCIgXCIgKyBMQkMuU3RhdGVUb05hbWUoc3RhdGUpKTtcclxuXHJcbiAgICAgIGlmIChzdGF0ZSA9PSAxKSBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwiY29ubmVjdGluZyB0byBzZXJ2ZXIuLi5cIik7XHJcbiAgICAgIGVsc2UgaWYgKHN0YXRlID09IDQpIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJjb25uZWN0ZWQgdG8gc2VydmVyXCIpO1xyXG4gICAgICBlbHNlIGlmIChzdGF0ZSA9PSA1KSB7XHJcbiAgICAgICAgLy9oYXMgam9pbmVkIGxvYmJ5XHJcbiAgICAgICAgaWYgKFNob3dSb29tID09IGZhbHNlKSB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwid2FpdGluZyBmb3Igb3RoZXIgcGxheWVycy4uLlwiKTtcclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luUmFuZG9tUm9vbSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoU2hvd1Jvb20gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInNob3dpbmcgcm9vbXMgbGlzdC4uLlwiKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZVByb2ZpbGVTY3JlZW5fU3BlY3RhdGVVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlUm9vbVNjcmVlbl9TcGVjdGF0ZVVJKHRydWUpO1xyXG4gICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZGVidWdcclxuICAgICAgICAgICAgQG1ldGhvZCBkZWJ1Z1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZGVidWcgPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBpbmZvXHJcbiAgICAgICAgICAgIEBtZXRob2QgaW5mb1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW1cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYubG9nZ2VyLmluZm8gPSBmdW5jdGlvbiAobWVzcywgcGFyYW0pIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyArIHBhcmFtKTtcclxuICAgICAgc3RhdGVUZXh0ICs9IG1lc3MgKyBcIiBcIiArIHBhcmFtICsgXCJcXG5cIjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyB3YXJuXHJcbiAgICAgICAgICAgIEBtZXRob2Qgd2FyblxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0xXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTJcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtM1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIud2FybiA9IGZ1bmN0aW9uIChtZXNzLCBwYXJhbTEsIHBhcmFtMiwgcGFyYW0zKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MgKyBcIiBcIiArIHBhcmFtMSArIFwiIFwiICsgcGFyYW0yICsgXCIgXCIgKyBwYXJhbTMpO1xyXG5cclxuICAgICAgaWYgKHBhcmFtMSA9PSAyMjUpIHtcclxuICAgICAgICAvL25vIHJvb20gZm91bmRcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5vIHJhbmRvbSByb29tIHdhcyBmb3VuZCwgY3JlYXRpbmcgb25lXCIpO1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DcmVhdGVSb29tKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJhbTEgPT0gMjI2KSB7XHJcbiAgICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUm9vbSBkb2VzIG5vdCBleGlzdHMgYW55bW9yZSxwbGVhc2UgdHJ5IGFnYWluIGJ5IGV4aXRpbmcuXCIpO1xyXG4gICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNsZWFyVGltZXIoKTtcclxuICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5TZXRDb25uZXRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9yb29tIGRvZXMgbm90IGV4aXN0cyBvciBpcyBmdWxsXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUm9vbSBpcyBmdWxsLCBwbGVhc2Ugc2VsZWN0IGFueSBvdGhlciByb29tIHRvIHNwZWN0YXRlLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBlcnJvclxyXG4gICAgICAgICAgICBAbWV0aG9kIGVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZXJyb3IgPSBmdW5jdGlvbiAobWVzcywgcGFyYW0pIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5leGNlcHRpb24gPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBzb21lIGZvcm1hdFxyXG4gICAgICAgICAgICBAbWV0aG9kIGZvcm1hdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZm9ybWF0ID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHBsYXllciBqb2lucyBsb2JieVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uUm9vbUxpc3QgPSBmdW5jdGlvbiAocm9vbXMpIHtcclxuICAgICAgc3RhdGVUZXh0ICs9IFwiXFxuXCIgKyBcIlJvb21zIExpc3Q6XCIgKyBcIlxcblwiO1xyXG5cclxuICAgICAgaWYgKHJvb21zLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgc3RhdGVUZXh0ICs9IFwiTm8gcm9vbXMgaW4gbG9iYnkuXCIgKyBcIlxcblwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUsIHJvb21zW2ldLnBsYXllckNvdW50KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbSBuYW1lOiBcIiArIHJvb21zW2ldLm5hbWUpO1xyXG4gICAgICAgICAgc3RhdGVUZXh0ICs9IFwiUm9vbTogXCIgKyByb29tc1tpXS5uYW1lICsgXCJcXG5cIjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgdGhlcmUgaXMgY2hhbmdlIGluIHJvb21zIGxpc3QgKHJvb20gYWRkZWQsdXBkYXRlZCxyZW1vdmVkIGV0YylcclxuICAgICAgICAgICAgQG1ldGhvZCBvblJvb21MaXN0VXBkYXRlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNVcGRhdGVkXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc0FkZGVkXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1JlbW92ZWRcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Sb29tTGlzdFVwZGF0ZSA9IGZ1bmN0aW9uIChyb29tcywgcm9vbXNVcGRhdGVkLCByb29tc0FkZGVkLCByb29tc1JlbW92ZWQpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5SZXNldFJvb21MaXN0KCk7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5VcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShyb29tc1tpXS5uYW1lLCByb29tc1tpXS5wbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSb29tIG5hbWU6IFwiICsgcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgc3RhdGVUZXh0ICs9IFwiUm9vbTogXCIgKyByb29tc1tpXS5uYW1lICsgXCJcXG5cIjtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhcIlJvb21zIExpc3QgdXBkYXRlZDogXCIgKyByb29tc1VwZGF0ZWQubGVuZ3RoICsgXCIgdXBkYXRlZCwgXCIgKyByb29tc0FkZGVkLmxlbmd0aCArIFwiIGFkZGVkLCBcIiArIHJvb21zUmVtb3ZlZC5sZW5ndGggKyBcIiByZW1vdmVkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGxvY2FsbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uSm9pblJvb21cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Kb2luUm9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8jcmVnaW9uIExvZ3MgZm9yIGdhbWVcclxuICAgICAgY29uc29sZS5sb2coXCJHYW1lIFwiICsgdGhpcy5teVJvb20oKS5uYW1lICsgXCIgam9pbmVkXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlBY3RvcigpKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGgpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKVswXS5sb2FkQmFsYW5jaW5nQ2xpZW50LnVzZXJJZCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKS5fY3VzdG9tUHJvcGVydGllcyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0pO1xyXG4gICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IHRydWUpIHtcclxuICAgICAgICAvL2NoZWNrIGlmIHBsYXllciB3aG8gam9pbmVkIGlzIHNwZWN0YXRlXHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7XHJcbiAgICAgICAgfSwgMTAwMCk7IC8vZnVuY3Rpb24gaW4gVUlNYW5hZ2VyXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRXhpdENvbm5lY3RpbmcpIHtcclxuICAgICAgLy8gICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2xlYXJUaW1lcigpO1xyXG4gICAgICAvLyAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5TZXRDb25uZXRpbmcoZmFsc2UpO1xyXG4gICAgICAvLyAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFJvb21WYWx1ZXMoKTtcclxuICAgICAgLy8gICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Qcm9jZXNzQ291bnRlcigpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgcmVtb3RlbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JKb2luXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIChQaG90b25SZWYub25BY3RvckpvaW4gPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgdmFyIF9yZWFsUGxheWVyID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkdldFJlYWxBY3RvcnMoKTtcclxuXHJcbiAgICAgIGlmIChfcmVhbFBsYXllciA9PSBNYXhTdHVkZW50cykge1xyXG4gICAgICAgIC8vd2hlbiBtYXggcGxheWVyIHJlcXVpcmVkIHRvIHN0YXJ0IGdhbWUgaGFzIGJlZW4gYWRkZWRcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgcmVxdWlyZWQgcGxheWVycyBqb2luZWQsIHN0YXJ0aW5nIHRoZSBnYW1lLi5cIik7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7XHJcbiAgICAgICAgfSwgMTAwMCk7IC8vZnVuY3Rpb24gaW4gdWkgbWFuYWdlclxyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyh0cnVlLCBQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBudWxsLCBmYWxzZSwgMCk7XHJcbiAgICAgICAgLy9QaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJcIixQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpLHRydWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KGFjdG9yLmFjdG9yTnIpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGpvaW5lZFwiKTtcclxuICAgICAgLy8gY29uc29sZS5lcnJvcihcIlRvdGFsIFBsYXllcnM6IFwiK1Bob3RvblJlZi5teVJvb21BY3RvckNvdW50KCkpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkpO1xyXG4gICAgfSksXHJcbiAgICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgcmVtb3RlbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgbGVhdmVzIGEgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JMZWF2ZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICAgIChQaG90b25SZWYub25BY3RvckxlYXZlID0gZnVuY3Rpb24gKGFjdG9yKSB7XHJcbiAgICAgICAgaWYgKCFHYW1lRmluaXNoZWQgJiYgIVJlc3RhcnRTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID09IHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKCFhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTGVhdmVSb29tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0b3IuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3BlY3RhdG9yIGxlZnQsIHNvIGRvbnQgbWluZCwgY29udCBnYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgUGhvdG9uUmVmZXJlY2UgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuZ2V0UGhvdG9uUmVmKCk7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfcGxheWVyVHVybiA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgdmFyIF91SUdhbWVNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgdmFyIF9yZWFsUGxheWVyID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkdldFJlYWxBY3RvcnMoKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIF9pbml0aWFsU2V0dXBEb25lID0gUGhvdG9uUmVmZXJlY2UubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgbGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3JlYWxQbGF5ZXIgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSGFuZGxlUGxheWVyTGVhdmUoYWN0b3IsIFBob3RvblJlZmVyZWNlLCBfbWFuYWdlciwgX3BsYXllclR1cm4sIF9pbml0aWFsU2V0dXBEb25lLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX3VJR2FtZU1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3VJR2FtZU1hbmFnZXIuU2hvd1RvYXN0KFwicGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDExNTAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKF9pbml0aWFsU2V0dXBEb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVBY3RvckFjdGl2ZURhdGEoYWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLkdhbWVPdmVyKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF91SUdhbWVNYW5hZ2VyKSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzdGFydEdhbWUoMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc3RhcnRHYW1lKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfdUlHYW1lTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdUlHYW1lTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTE1MCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLmdldFNjZW5lTmFtZSgpID09IFwiR2FtZVBsYXlcIikgLy9pZiBzY2VuZSBpcyBnYW1lcGxheSBsZXQgcGxheWVyIGZpbmlzaCBnYW1lIGZvcmNlZnVsbHlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIm90aGVyIHBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0sIDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF91SUdhbWVNYW5hZ2VyLlNob3dUb2FzdChcInBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAxMTUwLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfcmVhbFBsYXllciA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5IYW5kbGVQbGF5ZXJMZWF2ZShhY3RvciwgUGhvdG9uUmVmZXJlY2UsIF9tYW5hZ2VyLCBfcGxheWVyVHVybiwgX2luaXRpYWxTZXR1cERvbmUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX2luaXRpYWxTZXR1cERvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuR2FtZU92ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBoYXMgbGVmdFwiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKElzR2FtZVN0YXJ0ZWQpO1xyXG4gICAgICAgICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUgJiYgIUlzR2FtZVN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUHJvY2Vzc0NvdW50ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpID09IDEgJiYgIVJlc3RhcnRTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgUmVzdGFydFNwZWN0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXN0YXJ0R2FtZSgxNTAwKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZWF0cnRlZFwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgb3duIHByb3BlcnRpZXMgZ290IGNoYW5nZWRcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9yUHJvcGVydGllc0NoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25BY3RvclByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoYWN0b3IpIHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgcm9vbSBwcm9wZXJ0aWVzIGdvdCBjaGFuZ2VkXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbk15Um9vbVByb3BlcnRpZXNDaGFuZ2UgPSBmdW5jdGlvbiAoX2RhdGEpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB0byBoYW5kbGUgZXJyb3JzXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25FcnJvclxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gZXJyb3JDb2RlXHJcbiAgICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gZXJyb3JNc2dcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25FcnJvciA9IGZ1bmN0aW9uIChlcnJvckNvZGUsIGVycm9yTXNnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBlcnJvckNvZGUgKyBcIjogXCIgKyBlcnJvck1zZyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGFuIGV2ZW50IGlzIHJlY2VpdmVkIHdpdGggc29tZSBkYXRhXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25FdmVudFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gY29kZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gY29udGVudFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JOclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkV2ZW50ID0gZnVuY3Rpb24gKGNvZGUsIGNvbnRlbnQsIGFjdG9yTnIpIHtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBzd2l0Y2ggKGNvZGUpIHtcclxuICAgICAgICBjYXNlIDE6IC8vcmVjZXZpbmcgcGxheWVyZGF0YSBpbmZvXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBsYXllciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIFBsYXllckluZm9EYXRhID0gY29udGVudC5QbGF5ZXJJbmZvO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEsIHNlbmRlck5hbWUsIHNlbmRlcklELCBQbGF5ZXJJbmZvRGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOiAvL3N0YXJ0IHR1cm4gcmFpc2UgZXZlbnRcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgc3RhcnQgdHVybiBldmVudFwiKTtcclxuICAgICAgICAgIHZhciBfVHVybiA9IGNvbnRlbnQuVHVybk51bWJlcjtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX1R1cm4pO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzogLy8gZGljZSBjb3VudFxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkaWNlIGNvdW50XCIpO1xyXG4gICAgICAgICAgdmFyIF9kaWNlID0gY29udGVudC5EaWNlQ291bnQ7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kaWNlKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQ6IC8vcmVjZWluZyB1c2VyIGlkIG9mIHBsYXllciB3aG8gaGFzIGNvbXBsZXRlZCB0dXJuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBsYXllciB0dXJuIGNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgIHZhciBfSUQgPSBjb250ZW50LlVJRDtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg0LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX0lEKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6IC8vcmVjZWl2aW5nIGNhcmQgZGF0YSAoaW5kZXgpIHNvIG90aGVyIHVzZXJzIGNhbiBzeW5jIHRoZW1cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgY2FyZCBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9jYXJkID0gY29udGVudC5DYXJkRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg1LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2NhcmQpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNjogLy9yZWNlaXZlIGdhbWUgb3ZlciBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGdhbWUgb3ZlciBjYWxsXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDYsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OiAvL3JlY2VpdmUgb25lIFF1ZXN0aW9uIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgb25lIHF1ZXN0aW9uIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDg6IC8vcmVjZWl2ZSBvbmUgUXVlc3Rpb24gcmVzcG9uc2UgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBvbmUgcXVlc3RpbyByZXNwb25zZSBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDgsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA5OiAvL3JlY2VpdmUgYmFua3J1cHQgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBiYW5rcnVwdCBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDksIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMDogLy9yZWNlaXZlIGJhY2tzcGFjZSBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGJhY2tzcGFjZSBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEwLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTE6IC8vcmVjZWl2ZWluZyBwYXJ0bmVyc2hpcCBvZmZlclxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBvZmZlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDExLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTI6IC8vcmVjZWl2ZWluZyBwYXJ0bmVyc2hpcCBhbnN3ZXIgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBhbndzZXIgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEzOiAvL3JlY2VpdmluZyBwcm9maXQvbG9zcyBkYXRhIGZvciBwYXJ0bmVyXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEzLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTQ6IC8vcmVjZWl2aW5nIHJvb20gY29tcGxldGUgZGF0YSB0byBzdGFydCBHYW1lXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Sb29tQ29tcGxldGVkKCk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNTogLy9yZWNlaXZpbmcgcGF5ZGF5IGluZm9cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgaW5mb1wiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxNSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE2OiAvL3JlY2VpdmluZyBnYW1lIG92ZXIgZGF0YSB0byBzeW5jXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGdhbWUgb3ZlciBzeW5jIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTYsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNzogLy9yZWNlaXZpbmcgZGF0YSBvZiBwbGF5ZXIgdG8gZ2V0IGFsbCBwcm9maXQgbmV4dCBwYXkgZGF5XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRhdGEgb2YgcGxheWVyIHRvIGdldCBhbGwgcHJvZml0IG5leHQgcGF5IGRheVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxNywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE4OiAvL3JlY2VpdmluZyBvbmUgcXVlc3Rpb24gYXJyYXlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGF0YSBmb3Igb25lIHF1ZXN0aW9uIGFycmF5XCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE4LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTk6IC8vcmVjZWl2aW5nIGRlY2tzIGFycmF5XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRhdGEgZm9yIGRlY2tzIGFycmF5XCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE5LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjA6IC8vcmVjZWl2aW5nIGRlY2tzIGFycmF5IENvdW50ZXJcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGF0YSBmb3IgZGVja3MgYXJyYXkgY291bnRlclwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyMCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDIxOiAvL3JlY2VpdmluZyBjYXNoIGRlZHVjdCBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGNhc2ggZGVkdWN0IGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjEsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMjI6IC8vcmVjZWl2aW5nIGNhc2ggYWRkIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgY2FzaCBhZGQgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyMiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDIzOiAvL3JlY2VpdmluZyB0YWtlIG92ZXIgYnVzaW5lc3MgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZpbmcgdGFrZSBvdmVyIGJ1c2luZXNzIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjMsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyNDogLy9yZWNlaXZpbmcgZGFtYWdpbmcgaW5mb3JtYXRpb25cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2aW5nIGRhbWFnaW5nIGluZm9ybWF0aW9uXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDI0LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjU6IC8vcmVjZWl2aW5nIGRhbWFnaW5nIGluZm9ybWF0aW9uXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmluZyBkYW1hZ2luZyBpbmZvcm1hdGlvbiBEZWNpc29uXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDI1LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjY6IC8vcmVjZWl2aW5nIGJ1eSBoYWxmIGJ1c2luZXNzIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2aW5nIGJ1eSBoYWxmIGJ1c2luZXNzIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjYsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyNzogLy9yZWNlaXZpbmcgZGljZSBjb21wYXJlIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2aW5nIGRpY2UgY29tcGFyZSBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDI3LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDI4OiAvL3JlY2VpdmluZyBkaWNlIGNvbXBhcmUgZGF0YSBkZWNpc29uXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmluZyBkaWNlIGNvbXBhcmUgZGF0YSBkZWNpc29uXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDI4LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjk6IC8vcmVjZWl2aW5nIFRWIGFkIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2aW5nIFRWIGFkIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjksIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzMDogLy9yZWNlaXZpbmcgVFYgYWQgZGF0YSB2b3Rlc1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZpbmcgVFYgYWQgZGF0YSB2b3Rlc1wiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgzMCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aXBsYXllckNvbnRyb2xsZXI7XHJcbiJdfQ==