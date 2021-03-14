
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
    TimerStarted = false; //_timer = 0;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJHYW1lRmluaXNoZWQiLCJJc01hc3RlckNsaWVudCIsIlRvdGFsVGltZXIiLCJUaW1lclN0YXJ0ZWQiLCJTY2hlZHVsYXIiLCJNYXhTdHVkZW50cyIsIlJlc3RhcnRTcGVjdGF0ZSIsIklzR2FtZVN0YXJ0ZWQiLCJUaW1lb3V0cyIsIlJvb21Qcm9wZXJ0eSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllciIsInR5cGUiLCJJbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiSW5pdGlhbFNldHVwIiwiQm9vbGVhbiIsIlBsYXllckdhbWVJbmZvIiwiVGV4dCIsIlR1cm5OdW1iZXIiLCJBcHBfSW5mbyIsIkFwcElEIiwidG9vbHRpcCIsIkFwcFZlcnNpb24iLCJXc3MiLCJkaXNwbGF5TmFtZSIsIk1hc3RlclNlcnZlciIsIkZiQXBwSUQiLCJNdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDb21wb25lbnQiLCJQaG90b25BcHBJbmZvIiwiTWF4UGxheWVycyIsIk1heFNwZWN0YXRvcnMiLCJNb2RlU2VsZWN0aW9uIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwiUmVzZXRSb29tVmFsdWVzIiwib25Mb2FkIiwiRXhpdENvbm5lY3RpbmciLCJJbml0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZU1vZGVTZWxlY3Rpb24iLCJfdmFsIiwiU2V0Q29ubmV0aW5nIiwiX3N0YXRlIiwiR2V0QWN0aXZlU3RhdHVzIiwiX3VJRCIsIl9pc0FjdGl2ZSIsIl9hcnJheSIsIkdldF9HYW1lTWFuYWdlciIsImluZGV4IiwibGVuZ3RoIiwiUGxheWVyVUlEIiwiSXNBY3RpdmUiLCJHZXRCYW5rcnVwdGVkU3RhdHVzIiwiX2lzQmFua3J1cHRlZCIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiQmFua3J1cHRlZE5leHRUdXJuIiwiR2V0U2VsZWN0ZWRNb2RlIiwiZ2FtZSIsImFkZFBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJJbml0aWFsaXplUGhvdG9uIiwiY29uc29sZSIsImxvZyIsIkFwcEluZm8iLCJEZW1vTG9hZEJhbGFuY2luZyIsIkxlYXZlUm9vbSIsIlJvb21OYW1lIiwiTWVzc2FnZSIsIkpvaW5lZFJvb20iLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJnZXRTY2VuZU5hbWUiLCJzY2VuZU5hbWUiLCJfc2NlbmVJbmZvcyIsImkiLCJ1dWlkIiwiZGlyZWN0b3IiLCJfc2NlbmUiLCJfaWQiLCJ1cmwiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsIm1hdGNoIiwiVG9nZ2xlU2hvd1Jvb21fQm9vbCIsIlRvZ2dsZUxlYXZlUm9vbV9Cb29sIiwiZ2V0UGhvdG9uUmVmIiwiUGhvdG9uQWN0b3IiLCJteUFjdG9yIiwiUm9vbUFjdG9ycyIsIm15Um9vbUFjdG9yc0FycmF5IiwiQ2hlY2tTcGVjdGF0ZSIsImN1c3RvbVByb3BlcnRpZXMiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJBcHBJZCIsIkZiQXBwSWQiLCJSZXF1ZXN0Q29ubmVjdGlvbiIsInN0YXRlIiwiaXNDb25uZWN0ZWRUb01hc3RlciIsImlzSW5Mb2JieSIsInN0YXJ0IiwiQ2hlY2tDb25uZWN0aW9uU3RhdGUiLCJfY29ubmVjdGVkIiwiaXNKb2luZWRUb1Jvb20iLCJEaXNjb25uZWN0UGhvdG9uIiwiZGlzY29ubmVjdCIsIlJlc2V0U3RhdGUiLCJPblJvb21OYW1lQ2hhbmdlIiwiT25NZXNzYWdlQ2hhbmdlIiwibXNnIiwiVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXMiLCJfcGxheWVyVXBkYXRlIiwiX3BsYXllclZhbHVlIiwiX2luaXRpYWxTZXR1cFVwZGF0ZSIsIl9pbml0aWFsU2V0dXBWYWx1ZSIsIl9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSIsIl9wbGF5ZXJHYW1lSW5mb1ZhbHVlIiwiX3R1cm5OdW1iZXJVcGRhdGUiLCJfdHVybk51bWJlcnZhbHVlIiwibXlSb29tIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDcmVhdGVSb29tIiwiX2RhdGEiLCJyb29tT3B0aW9ucyIsImlzVmlzaWJsZSIsImlzT3BlbiIsIm1heFBsYXllcnMiLCJjdXN0b21HYW1lUHJvcGVydGllcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsIlN0dWRlbnREYXRhIiwiQ291bnRlciIsInNldFVzZXJJZCIsInVzZXJJRCIsIlJvb21JRCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIkRhdGUiLCJub3ciLCJjcmVhdGVSb29tIiwiSm9pblJvb20iLCJfcm9vbU5hbWUiLCJqb2luUm9vbSIsIkpvaW5SYW5kb21Sb29tIiwiZXhwZWN0ZWRDdXN0b21Sb29tUHJvcGVydGllcyIsImpvaW5SYW5kb21Sb29tIiwiU2VuZENhcmREYXRhIiwicmFpc2VFdmVudCIsIkNhcmREYXRhIiwic2VuZGVyTmFtZSIsInNlbmRlcklEIiwiYWN0b3JOciIsInJlY2VpdmVycyIsIlBob3RvbiIsIkxvYWRCYWxhbmNpbmciLCJDb25zdGFudHMiLCJSZWNlaXZlckdyb3VwIiwiQWxsIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwiU2VuZEdhbWVPdmVyIiwiRGF0YSIsIlNlbmRHYW1lT3ZlckRhdGEiLCJTZW5kU2VsZWN0ZWRQbGF5ZXJGb3JQcm9maXQiLCJPdGhlcnMiLCJTZW5kQmFua3J1cHREYXRhIiwiU2VuZERhdGEiLCJQbGF5ZXJJbmZvIiwiU2VuZE9uZVF1ZXN0aW9uRGF0YSIsIlNlbmRPbmVRdWVzdGlvbkFycmF5cyIsIlNlbmREZWNrc0FycmF5cyIsIlNlbmREZWNrc0FycmF5Q291bnRlciIsIlNlbmRQYXJ0bmVyUHJvZml0TG9zcyIsIlNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YSIsIkRpY2VSb2xsRXZlbnQiLCJEaWNlQ291bnQiLCJTZW5kR29CYWNrU3BhY2VEYXRhIiwiU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhIiwiU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YSIsIlNlbmRJbmZvIiwiU3luY1R1cm5Db21wbGV0aW9uIiwiVUlEIiwiU3RhcnRUdXJuIiwidHJhY2UiLCJTZW5kVGFrZUJ1c2luZXNzRGF0YSIsIlNlbmREYW1hZ2luZ0RhdGEiLCJTZW5kRGFtYWdpbmdEZWNpc2lvbkRhdGEiLCJTZW5kQnV5SGFsZkJ1c2luZXNzRGF0YSIsIlNlbmRDb21wYXJlRGljZURhdGEiLCJTZW5kQ29tcGFyZURpY2VEYXRhRGVjaXNpb24iLCJTZW5kVFZBRERhdGEiLCJTZW5kVFZBRERhdGFWb3RlcyIsIlNob3dUb2FzdCIsIkNhbGxSZWNpZXZlRXZlbnQiLCJfZXZlbnRDb2RlIiwiX3NlbmRlck5hbWUiLCJfc2VuZGVySUQiLCJJbnN0YW5jZU51bGwiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsInNldFRpbWVvdXQiLCJSZWNlaXZlRXZlbnQiLCJEaXNjb25uZWN0RGF0YSIsIlJlc3RhcnRHYW1lIiwiX3RpbWVyIiwiY2xlYXJUaW1lb3V0IiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsImxvYWRTY2VuZSIsIkNoZWNrTWFzdGVyQ2xpZW50IiwiX2lzTWFzdGVyIiwibXlSb29tTWFzdGVyQWN0b3JOciIsIkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCIsIkdldFJlYWxBY3RvcnMiLCJfcmVhbFBsYXllciIsIkFsbFBsYXllcnMiLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIlJvb21Db3VudGVyIiwiU2VuZFJvb21Db21wbGV0ZWREYXRhIiwiR2V0X1VJTWFuYWdlciIsIkNsZWFyVGltZXIiLCJQcm9jZXNzQ291bnRlciIsIl9tYXN0ZXIiLCJfY291bnRlciIsIlNlbmRDYXNoRGVkdWN0RGF0YSIsIlNlbmRDYXNoQWRkaXRpb25EYXRhIiwiUm9vbUNvbXBsZXRlZCIsInN5c3RlbUV2ZW50IiwiZW1pdCIsInB1c2giLCJVcGRhdGVBY3RvckFjdGl2ZURhdGEiLCJfYWN0b3IiLCJfYWN0b3JzQXJyYXkiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkhhbmRsZVBsYXllckxlYXZlIiwiYWN0b3IiLCJQaG90b25SZWZlcmVjZSIsIl9tYW5hZ2VyIiwiX3BsYXllclR1cm4iLCJfaW5pdGlhbFNldHVwRG9uZSIsIl9pc1NwZWN0YXRlIiwiUmVtb3ZlRnJvbUNoZWNrQXJyYXkiLCJ0b1N0cmluZyIsIkNoZWNrVHVybkNvbXBsZXRlIiwiQ2hhbmdlVHVybkZvcmNlZnVsbHkiLCJTZXRQbGF5ZXJMZWZ0IiwiUmVzZXRTb21lVmFsdWVzIiwiX3BsYXllcmZvdW5kIiwic3BsaWNlIiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU3luY0RhdGEiLCJ1cGRhdGUiLCJkdCIsIm9uU3RhdGVDaGFuZ2UiLCJMQkMiLCJMb2FkQmFsYW5jaW5nQ2xpZW50IiwiU3RhdGVUb05hbWUiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJsb2dnZXIiLCJkZWJ1ZyIsIm1lc3MiLCJpbmZvIiwicGFyYW0iLCJ3YXJuIiwicGFyYW0xIiwicGFyYW0yIiwicGFyYW0zIiwiVG9nZ2xlTG9hZGluZ05vZGUiLCJleGNlcHRpb24iLCJmb3JtYXQiLCJvblJvb21MaXN0Iiwicm9vbXMiLCJSZXNldFJvb21MaXN0IiwiVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkiLCJwbGF5ZXJDb3VudCIsIm9uUm9vbUxpc3RVcGRhdGUiLCJyb29tc1VwZGF0ZWQiLCJyb29tc0FkZGVkIiwicm9vbXNSZW1vdmVkIiwib25Kb2luUm9vbSIsImxvYWRCYWxhbmNpbmdDbGllbnQiLCJ1c2VySWQiLCJfY3VzdG9tUHJvcGVydGllcyIsIm9uQWN0b3JKb2luIiwibXlSb29tQWN0b3JDb3VudCIsIm9uQWN0b3JMZWF2ZSIsIkdhbWVPdmVyIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIkdldFR1cm5OdW1iZXIiLCJfdUlHYW1lTWFuYWdlciIsIm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlIiwib25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlIiwib25FcnJvciIsImVycm9yQ29kZSIsImVycm9yTXNnIiwib25FdmVudCIsImNvZGUiLCJjb250ZW50IiwiUGxheWVySW5mb0RhdGEiLCJfVHVybiIsIl9kaWNlIiwiX0lEIiwiX2NhcmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsU0FBSjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsS0FBckI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsSUFBaEI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxJQUFJQyxlQUFlLEdBQUcsS0FBdEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsS0FBcEI7QUFDQSxJQUFJQyxRQUFRLEdBQUcsRUFBZixFQUVBOztBQUNBLElBQUlDLFlBQVksR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDMUJDLEVBQUFBLElBQUksRUFBRSxjQURvQjtBQUUxQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLE1BQU0sRUFBRTtBQUNOLGlCQUFTLENBREg7QUFFTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLE9BRkg7QUFHTkMsTUFBQUEsWUFBWSxFQUFFO0FBSFIsS0FERTtBQU1WQyxJQUFBQSxZQUFZLEVBQUU7QUFDWixpQkFBUyxLQURHO0FBRVpILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUyxPQUZH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RjtBQWpSRjtBQW1SRCxLQXJSRDtBQXNSRDtBQS9oRWtDLENBQVQsQ0FBNUI7QUFraUVBc0wsTUFBTSxDQUFDQyxPQUFQLEdBQWlCelIscUJBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJpYWJsZXNcclxudmFyIFBob3RvblJlZjtcclxudmFyIHN0YXRlVGV4dCA9IFwiXCI7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgU2hvd1Jvb20gPSBmYWxzZTtcclxudmFyIEdhbWVGaW5pc2hlZCA9IGZhbHNlO1xyXG52YXIgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxudmFyIFRvdGFsVGltZXIgPSAzMDtcclxudmFyIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG52YXIgU2NoZWR1bGFyID0gbnVsbDtcclxudmFyIE1heFN0dWRlbnRzID0gNjtcclxudmFyIFJlc3RhcnRTcGVjdGF0ZSA9IGZhbHNlO1xyXG52YXIgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG52YXIgVGltZW91dHMgPSBbXTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIFJvb21Qcm9wZXJ0eS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSb29tUHJvcGVydHkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJSb29tUHJvcGVydHlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXI6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEluaXRpYWxTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUdXJuTnVtYmVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIEFwcF9JbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEFwcF9JbmZvID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQXBwX0luZm9cIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBBcHBJRDoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQXBwIGlkIGZvcm0gcGhvdG9uIGRhc2hib2FyZFwiLFxyXG4gICAgfSxcclxuICAgIEFwcFZlcnNpb246IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFwcCB2ZXJzaW9uIGZvciBwaG90b25cIixcclxuICAgIH0sXHJcbiAgICBXc3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNTZWN1cmVcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJJZiBwaG90b24gc2hvdWxkIHVzZSBzZWN1cmUgYW5kIHJlbGlhYmxlIHByb3RvY29sc1wiLFxyXG4gICAgfSxcclxuICAgIE1hc3RlclNlcnZlcjoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibWFzdGVyIHNlcnZlciBmb3IgcGhvdG9uIHRvIGNvbm5lY3RcIixcclxuICAgIH0sXHJcbiAgICBGYkFwcElEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJGQiBhcHAgaWQgdXNlZCBmb3IgRkIgYXV0aGVyaXphdGlvblwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBNdWx0aXBsYXllckNvbnRyb2xsZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJNdWx0aXBsYXllckNvbnRyb2xsZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGhvdG9uQXBwSW5mbzoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBBcHBfSW5mbyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1heFBsYXllcnM6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1heFNwZWN0YXRvcnM6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1vZGVTZWxlY3Rpb246IHtcclxuICAgICAgLy8gMSBtZWFucyBib3QgLCAyIG1lYW5zIHJlYWwgcGxheWVyc1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIC8vY3JlYXRpbmcgc3RhdGljIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxEYXRhKCkge1xyXG4gICAgVGltZW91dHMgPSBbXTtcclxuICAgIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIFBob3RvblJlZiA9IG51bGw7XHJcbiAgICBzdGF0ZVRleHQgPSBcIlwiO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIFNob3dSb29tID0gZmFsc2U7XHJcbiAgICBHYW1lRmluaXNoZWQgPSBmYWxzZTtcclxuICAgIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbiAgICBUb3RhbFRpbWVyID0gMzA7XHJcbiAgICBUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIFNjaGVkdWxhciA9IG51bGw7XHJcbiAgICB0aGlzLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgTWF4U3R1ZGVudHMgPSA2O1xyXG4gICAgUmVzdGFydFNwZWN0YXRlID0gZmFsc2U7XHJcbiAgfSxcclxuICAvL3RoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBpcyBjcmVhdGVkXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5FeGl0Q29ubmVjdGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5SZXNldEFsbERhdGEoKTtcclxuICAgIHRoaXMuSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVNb2RlU2VsZWN0aW9uKFxyXG4gICAgX3ZhbCAvLyAxIG1lYW5zIGJvdCAsIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXHJcbiAgKSB7XHJcbiAgICB0aGlzLk1vZGVTZWxlY3Rpb24gPSBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFNldENvbm5ldGluZyhfc3RhdGUpIHtcclxuICAgIHRoaXMuRXhpdENvbm5lY3RpbmcgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgR2V0QWN0aXZlU3RhdHVzKF91SUQgPSBcIlwiKSB7XHJcbiAgICB2YXIgX2lzQWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgX2FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfYXJyYXlbaW5kZXhdLlBsYXllclVJRCA9PSBfdUlEKSB7XHJcbiAgICAgICAgaWYgKF9hcnJheVtpbmRleF0uSXNBY3RpdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIF9pc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfaXNBY3RpdmU7XHJcbiAgfSxcclxuXHJcbiAgR2V0QmFua3J1cHRlZFN0YXR1cyhfdUlEID0gXCJcIikge1xyXG4gICAgdmFyIF9pc0JhbmtydXB0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgX2FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfYXJyYXlbaW5kZXhdLlBsYXllclVJRCA9PSBfdUlEKSB7XHJcbiAgICAgICAgaWYgKF9hcnJheVtpbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuQmFua3J1cHRlZE5leHRUdXJuID09IHRydWUpIHtcclxuICAgICAgICAgIF9pc0JhbmtydXB0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfaXNCYW5rcnVwdGVkO1xyXG4gIH0sXHJcblxyXG4gIEdldFNlbGVjdGVkTW9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLk1vZGVTZWxlY3Rpb247XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBJbml0aWFsaXplIHNvbWUgZXNzZW50YWlscyBkYXRhIGZvciBtdWx0aXBsYXllciBjb250cm9sbGVyIGNsYXNzXHJcbiAgICBAbWV0aG9kIEluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkge1xyXG4gICAgaWYgKCFNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UpIHtcclxuICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgdGhpcy5Jbml0aWFsaXplUGhvdG9uKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKEFwcEluZm8pO1xyXG4gICAgICBQaG90b25SZWYgPSBuZXcgRGVtb0xvYWRCYWxhbmNpbmcoKTtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLkxlYXZlUm9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5Sb29tTmFtZSA9IFwiXCI7XHJcbiAgICB0aGlzLk1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgU2hvd1Jvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNoZWNrIHJlZmVyZW5jZSB0byBzb21lIHZhcmlhYmxlcyBhbmQgY2xhc3Nlc1xyXG4gICAgQG1ldGhvZCBDaGVja1JlZmVyZW5jZXNcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZW1vdmUgcGVyc2lzdCBub2RlIHdoZW4gd2FudCB0byByZXN0YXJ0IHNjZW5lXHJcbiAgICBAbWV0aG9kIFJlbW92ZVBlcnNpc3ROb2RlXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFJlbW92ZVBlcnNpc3ROb2RlKCkge1xyXG4gICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlID0gbnVsbDtcclxuICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBnZXQgbmFtZSBvZiBjdXJyZW50IG9wZW5lZCBzY2VuZVxyXG4gICAgQG1ldGhvZCBnZXRTY2VuZU5hbWVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7c3RyaW5nfSBzY2VuZU5hbWVcclxuICAgICoqL1xyXG4gIGdldFNjZW5lTmFtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNjZW5lTmFtZTtcclxuICAgIHZhciBfc2NlbmVJbmZvcyA9IGNjLmdhbWUuX3NjZW5lSW5mb3M7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9zY2VuZUluZm9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChfc2NlbmVJbmZvc1tpXS51dWlkID09IGNjLmRpcmVjdG9yLl9zY2VuZS5faWQpIHtcclxuICAgICAgICBzY2VuZU5hbWUgPSBfc2NlbmVJbmZvc1tpXS51cmw7XHJcbiAgICAgICAgc2NlbmVOYW1lID0gc2NlbmVOYW1lLnN1YnN0cmluZyhzY2VuZU5hbWUubGFzdEluZGV4T2YoXCIvXCIpICsgMSkubWF0Y2goL1teXFwuXSsvKVswXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNjZW5lTmFtZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIHNldCBcIlNob3dSb29tXCIgYm9vbCB2YWx1ZVxyXG4gICAgQG1ldGhvZCBUb2dnbGVTaG93Um9vbV9Cb29sXHJcbiAgICBAcGFyYW0ge2Jvb2xlYW59IF9zdGF0ZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAqKi9cclxuICBUb2dnbGVTaG93Um9vbV9Cb29sKF9zdGF0ZSkge1xyXG4gICAgU2hvd1Jvb20gPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBzZXQgXCJMZWF2ZVJvb21cIiBib29sIHZhbHVlXHJcbiAgICBAbWV0aG9kIFRvZ2dsZUxlYXZlUm9vbV9Cb29sXHJcbiAgICBAcGFyYW0ge2Jvb2xlYW59IF9zdGF0ZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAqKi9cclxuICBUb2dnbGVMZWF2ZVJvb21fQm9vbChfc3RhdGUpIHtcclxuICAgIHRoaXMuTGVhdmVSb29tID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBQaG90b24gXCJQaG90b25SZWZcIiBpbnN0YW5jZSBjcmVhdGVkIGJ5IG11bHRpcGxheWVyIGNsYXNzXHJcbiAgICBAbWV0aG9kIGdldFBob3RvblJlZlxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IFBob3RvblJlZlxyXG4gICAgKiovXHJcbiAgZ2V0UGhvdG9uUmVmKCkge1xyXG4gICAgcmV0dXJuIFBob3RvblJlZjtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgbXlBY3RvciBpbnN0YW5jZSBjcmVhdGVkIGJ5IHBob3RvblxyXG4gICAgQG1ldGhvZCBQaG90b25BY3RvclxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IEFjdG9yXHJcbiAgICAqKi9cclxuICBQaG90b25BY3RvcigpIHtcclxuICAgIHJldHVybiBQaG90b25SZWYubXlBY3RvcigpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBteVJvb21BY3RvcnNBcnJheSBjcmVhdGVkIGJ5IHBob3RvblxyXG4gICAgQG1ldGhvZCBSb29tQWN0b3JzXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gQWN0b3JcclxuICAgICoqL1xyXG4gIFJvb21BY3RvcnMoKSB7XHJcbiAgICByZXR1cm4gUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIGlzU3BlY3RhdGUgdmFyaWFibGUgZnJvbSBjdXN0b20gcHJvcGVydHkgb2YgY3VycmVudCBhY3RvclxyXG4gICAgQG1ldGhvZCBDaGVja1NwZWN0YXRlXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IGlzU3BlY3RhdGVcclxuICAgICoqL1xyXG4gIENoZWNrU3BlY3RhdGUoKSB7XHJcbiAgICByZXR1cm4gUGhvdG9uUmVmLm15QWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBJbml0aWFsaXplIHBob3RvbiB3aXRoIGFwcGlkLGFwcCB2ZXJzaW9uLCBXc3MgZXRjXHJcbiAgICBAbWV0aG9kIEluaXRpYWxpemVQaG90b25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgSW5pdGlhbGl6ZVBob3RvbigpIHtcclxuICAgIEFwcEluZm8uQXBwSWQgPSB0aGlzLlBob3RvbkFwcEluZm8uQXBwSUQ7XHJcbiAgICBBcHBJbmZvLkFwcFZlcnNpb24gPSB0aGlzLlBob3RvbkFwcEluZm8uQXBwVmVyc2lvbjtcclxuICAgIEFwcEluZm8uV3NzID0gdGhpcy5QaG90b25BcHBJbmZvLldzcztcclxuICAgIEFwcEluZm8uTWFzdGVyU2VydmVyID0gdGhpcy5QaG90b25BcHBJbmZvLk1hc3RlclNlcnZlcjtcclxuICAgIEFwcEluZm8uRmJBcHBJZCA9IHRoaXMuUGhvdG9uQXBwSW5mby5GYkFwcElEO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBjb25uZWN0aW9uIHJlcXVlc3QgdG8gcGhvdG9uXHJcbiAgICBAbWV0aG9kIFJlcXVlc3RDb25uZWN0aW9uXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFJlcXVlc3RDb25uZWN0aW9uKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSkgY29uc29sZS5sb2coXCJhbHJlYWR5IGNvbm5lY3RlZFwiKTtcclxuICAgIGVsc2UgUGhvdG9uUmVmLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tDb25uZWN0aW9uU3RhdGUoKSB7XHJcbiAgICB2YXIgX2Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgaWYgKFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5zdGF0ZSA9PSA3IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBjb25uZWN0ZWRcIik7XHJcbiAgICAgIF9jb25uZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5zdGF0ZSk7XHJcbiAgICByZXR1cm4gX2Nvbm5lY3RlZDtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IERpc2Nvbm5lY3QgZnJvbSBwaG90b25cclxuICAgIEBtZXRob2QgRGlzY29ubmVjdFBob3RvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBEaXNjb25uZWN0UGhvdG9uKCkge1xyXG4gICAgLy9pZiAoUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5zdGF0ZSA9PSA3IHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgIFBob3RvblJlZi5kaXNjb25uZWN0KCk7XHJcbiAgICB0aGlzLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgIC8vUGhvdG9uUmVmLmxlYXZlUm9vbSgpO1xyXG4gICAgdGhpcy5SZXNldFN0YXRlKCk7XHJcbiAgICAvLyAgfSBlbHNlIHtcclxuICAgIC8vICAgIGNvbnNvbGUubG9nKFwibm90IGluc2lkZSBhbnkgcm9vbSBvciBsb2JieSBvciBjb25uZWN0ZWQgdG8gcGhvdG9uXCIpO1xyXG4gIH0sXHJcbiAgLy8gfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXNldGluZyBmZXcgdmFsdWVzXHJcbiAgICBAbWV0aG9kIFJlc2V0U3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgUmVzZXRTdGF0ZSgpIHtcclxuICAgIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuTGVhdmVSb29tID0gZmFsc2U7XHJcbiAgICB0aGlzLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgIFNob3dSb29tID0gZmFsc2U7XHJcbiAgICBzdGF0ZVRleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5SZXNldFJvb21WYWx1ZXMoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIHJvb20gbmFtZSBnb3QgaW5wdXQgZnJvbSBnYW1lXHJcbiAgICBAbWV0aG9kIE9uUm9vbU5hbWVDaGFuZ2VcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgT25Sb29tTmFtZUNoYW5nZShuYW1lKSB7XHJcbiAgICB0aGlzLlJvb21OYW1lID0gbmFtZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIG1lc3NhZ2Ugd2luZG93IGdvdCBpbnB1dCBmcm9tIGdhbWVcclxuICAgIEBtZXRob2QgT25NZXNzYWdlQ2hhbmdlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbXNnXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgT25NZXNzYWdlQ2hhbmdlKG1zZykge1xyXG4gICAgdGhpcy5NZXNzYWdlID0gbXNnO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgdXBkYXRlIGN1c3RvbSByb29tIHByb3BlcnRpZXNcclxuICAgIEBtZXRob2QgVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXNcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyhfcGxheWVyVXBkYXRlID0gZmFsc2UsIF9wbGF5ZXJWYWx1ZSA9IDAsIF9pbml0aWFsU2V0dXBVcGRhdGUgPSBmYWxzZSwgX2luaXRpYWxTZXR1cFZhbHVlID0gZmFsc2UsIF9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSA9IGZhbHNlLCBfcGxheWVyR2FtZUluZm9WYWx1ZSA9IG51bGwsIF90dXJuTnVtYmVyVXBkYXRlID0gZmFsc2UsIF90dXJuTnVtYmVydmFsdWUgPSAwKSB7XHJcbiAgICBpZiAoX3BsYXllclVwZGF0ZSkgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyXCIsIF9wbGF5ZXJWYWx1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKF9pbml0aWFsU2V0dXBVcGRhdGUpIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLCBfaW5pdGlhbFNldHVwVmFsdWUsIHRydWUpO1xyXG5cclxuICAgIGlmIChfcGxheWVyR2FtZUluZm9VcGRhdGUpIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsIF9wbGF5ZXJHYW1lSW5mb1ZhbHVlLCB0cnVlKTtcclxuXHJcbiAgICBpZiAoX3R1cm5OdW1iZXJVcGRhdGUpIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgX3R1cm5OdW1iZXJ2YWx1ZSwgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjcmVhdGUgcm9vbSByZXF1ZXN0XHJcbiAgICBAbWV0aG9kIENyZWF0ZVJvb21cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgQ3JlYXRlUm9vbSgpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUgfHwgUGhvdG9uUmVmLnN0YXRlID09IDgpIHtcclxuICAgICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IGZhbHNlKSB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0gbmV3IFJvb21Qcm9wZXJ0eSgpO1xyXG4gICAgICAgIF9kYXRhLlBsYXllciA9IDA7XHJcblxyXG4gICAgICAgIHZhciByb29tT3B0aW9ucyA9IHtcclxuICAgICAgICAgIGlzVmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgIGlzT3BlbjogdHJ1ZSxcclxuICAgICAgICAgIG1heFBsYXllcnM6IHRoaXMuTWF4UGxheWVycyArIHRoaXMuTWF4U3BlY3RhdG9ycyxcclxuICAgICAgICAgIGN1c3RvbUdhbWVQcm9wZXJ0aWVzOiBfZGF0YSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7IElzU3BlY3RhdGU6IGZhbHNlIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tQ291bnRlclwiLCB7IENvdW50ZXI6IFRvdGFsVGltZXIgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG4gICAgICAgIHZhciBSb29tSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKTtcclxuXHJcbiAgICAgICAgUGhvdG9uUmVmLmNyZWF0ZVJvb20oXCJSb29tX1wiICsgUm9vbUlELCByb29tT3B0aW9ucyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgam9pbiByb29tIHJlcXVlc3QgYnkgbmFtZVxyXG4gICAgQG1ldGhvZCBKb2luUm9vbVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IF9yb29tTmFtZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEpvaW5Sb29tKF9yb29tTmFtZSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuc3RhdGUgPT0gOCkge1xyXG4gICAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gZmFsc2UgfHwgUGhvdG9uUmVmLnN0YXRlICE9IDgpIHtcclxuICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBpc1Zpc2libGU6IHRydWUsXHJcbiAgICAgICAgICBpc09wZW46IGZhbHNlLFxyXG4gICAgICAgICAgbWF4UGxheWVyczogdGhpcy5NYXhQbGF5ZXJzICsgdGhpcy5NYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgLy9cImN1c3RvbUdhbWVQcm9wZXJ0aWVzXCI6e1wiUm9vbUVzc2VudGlhbHNcIjoge0lzU3BlY3RhdGU6dHJ1ZX19XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwgeyBJc1NwZWN0YXRlOiB0cnVlIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tQ291bnRlclwiLCB7IENvdW50ZXI6IFRvdGFsVGltZXIgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG5cclxuICAgICAgICBQaG90b25SZWYuam9pblJvb20oX3Jvb21OYW1lLCByb29tT3B0aW9ucyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgam9pbiByYW5kb20gcm9vbVxyXG4gICAgQG1ldGhvZCBKb2luUmFuZG9tUm9vbVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBKb2luUmFuZG9tUm9vbSgpIHtcclxuICAgIGlmIChQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUgfHwgUGhvdG9uUmVmLnN0YXRlID09IDgpIHtcclxuICAgICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IGZhbHNlIHx8IFBob3RvblJlZi5zdGF0ZSAhPSA4KSB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0gbmV3IFJvb21Qcm9wZXJ0eSgpO1xyXG4gICAgICAgIF9kYXRhLlBsYXllciA9IDA7XHJcblxyXG4gICAgICAgIHZhciByb29tT3B0aW9ucyA9IHtcclxuICAgICAgICAgIC8vXCJleHBlY3RlZE1heFBsYXllcnNcIjp0aGlzLk1heFBsYXllcnMrTWF4U3BlY3RhdG9ycyxcclxuICAgICAgICAgIGV4cGVjdGVkQ3VzdG9tUm9vbVByb3BlcnRpZXM6IF9kYXRhLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHsgSXNTcGVjdGF0ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIsIHsgQ291bnRlcjogVG90YWxUaW1lciB9KTtcclxuICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcblxyXG4gICAgICAgIFBob3RvblJlZi5qb2luUmFuZG9tUm9vbShyb29tT3B0aW9ucyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBjYXJkIGluZGV4IG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kQ2FyZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRDYXJkRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGNhcmQgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgQ2FyZERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgZ2FtZSBvdmVyIGNhbGxcclxuICAgIEBtZXRob2QgU2VuZEdhbWVPdmVyXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kR2FtZU92ZXIoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBnYW1lIG92ZXIgY2FsbFwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRHYW1lT3ZlckRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBnYW1lIG92ZXIgZGF0YSB0byBzeW5jXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxNixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRTZWxlY3RlZFBsYXllckZvclByb2ZpdChfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGdhbWUgb3ZlciBkYXRhIHRvIHN5bmNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE3LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGJhY2tydXB0IGRhdGFcclxuICAgIEBtZXRob2QgU2VuZEJhbmtydXB0RGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZEJhbmtydXB0RGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGJhbmtydXBjeSBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA5LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIFBsYXllciBEYXRhIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBwbGF5ZXIgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVySW5mbzogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBvbmUgcXVlc3Rpb24gRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZE9uZVF1ZXN0aW9uRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA3LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZE9uZVF1ZXN0aW9uQXJyYXlzKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIGFycmF5c1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTgsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kRGVja3NBcnJheXMoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBkZWNrcyBhcnJheXNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE5LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZERlY2tzQXJyYXlDb3VudGVyKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZGVja3MgYXJyYXlzIGNvdW50ZXJzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyMCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIHByb2ZpdCBvciBsb3NzIHRvIHlvdXIgcGFzcnRuZXJcclxuICAgIEBtZXRob2QgU2VuZFBhcnRuZXJQcm9maXRMb3NzXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kUGFydG5lclByb2ZpdExvc3MoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgb25lIHF1ZXN0aW9uIHJlc3BvbnNlIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiByZXNwb25zZSBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA4LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGRpY2UgZGF0YVxyXG4gICAgQG1ldGhvZCBEaWNlUm9sbEV2ZW50XHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBEaWNlUm9sbEV2ZW50KF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZGljZSBjb3VudFwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGljZUNvdW50OiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGdvIGJhY2sgc3BhY2VzIGRhdGFcclxuICAgIEBtZXRob2QgU2VuZEdvQmFja1NwYWNlRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZEdvQmFja1NwYWNlRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kIGdvIGJhY2sgc3BhY2VzIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEwLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kaW5nIG9wZW4gaW52aXRhdGlvbiB0byBhbGwgcGxheWVycyBmb3IgcGFydG5lciBzaGlwXHJcbiAgICBAbWV0aG9kIFNlbmRQYXJ0bmVyU2hpcE9mZmVyRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgcGFydG5lciBzaGlwIG9mZmVyXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZGluZyBwYXJ0bmVyIGFuc3dlciBkYXRhIChhY2NlcHQgb3IgcmVqZWN0KVxyXG4gICAgQG1ldGhvZCBTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgcGFydGVucnNoaXAgYW5zd2VyIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEyLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZEluZm8oX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBpbmZvXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxNSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCB1c2VyIGlkIG9mIHBsYXllciB0byBhbGwgb3RoZXIgd2hvIGhhZCBjb21wbGV0ZWQgdGhlaXIgdHVyblxyXG4gICAgQG1ldGhvZCBTeW5jVHVybkNvbXBsZXRpb25cclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFN5bmNUdXJuQ29tcGxldGlvbihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHR1cm4gY29tcGxldGlvbiBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA0LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBVSUQ6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFN0YXJ0IFR1cm4gZm9yIGluaXRpYWwgdHVyblxyXG4gICAgQG1ldGhvZCBTdGFydFR1cm5cclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFN0YXJ0VHVybihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlN0YXJ0aW5nIFR1cm5cIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDIsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFR1cm5OdW1iZXI6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kVGFrZUJ1c2luZXNzRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlNlbmQgVGFrZSBCdXNpbmVzcyBEYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyMyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmREYW1hZ2luZ0RhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTZW5kIHBsYXllciByZWNlaXZlZCBkYW1hZ2luZyBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyNCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmREYW1hZ2luZ0RlY2lzaW9uRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlNlbmQgcGxheWVyIHJlY2VpdmVkIGRhbWFnaW5nIGRhdGEgZGVjaXNpb25cIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDI1LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZEJ1eUhhbGZCdXNpbmVzc0RhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTZW5kIHBsYXllciByZWNlaXZlZCBkYW1hZ2luZyBkYXRhIGRlY2lzaW9uXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyNixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRDb21wYXJlRGljZURhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTZW5kIHBsYXllciBkaWNlIHRvIGNvbXBhcmVcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDI3LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZENvbXBhcmVEaWNlRGF0YURlY2lzaW9uKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLnRyYWNlKFwiU2VuZCBwbGF5ZXIgZGljZSB0byBjb21wYXJlIGRlY2lzb25cIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDI4LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZFRWQUREYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLnRyYWNlKFwiU2VuZFRWQUREYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyOSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRUVkFERGF0YVZvdGVzKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLnRyYWNlKFwiU2VuZFRWQUREYXRhVm90ZXNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDMwLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTaG93IHRvYXN0IG1lc3NhZ2Ugb24gdGhlIGNvbnNvbGVcclxuICAgIEBtZXRob2QgU2hvd1RvYXN0XHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIHNob3duIFxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNob3dUb2FzdDogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgY29uc29sZS5sb2coXCJ0b2FzdCBtZXNzYWdlOiBcIiArIG1zZyk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZWNlaXZlIGV2ZW50IGZyb20gcGhvdG9uIHJhaXNlIG9uIFxyXG4gICAgQG1ldGhvZCBDYWxsUmVjaWV2ZUV2ZW50XHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgQ2FsbFJlY2lldmVFdmVudDogZnVuY3Rpb24gKF9ldmVudENvZGUsIF9zZW5kZXJOYW1lLCBfc2VuZGVySUQsIF9kYXRhKSB7XHJcbiAgICB2YXIgSW5zdGFuY2VOdWxsID0gdHJ1ZTtcclxuXHJcbiAgICAvL3RvIGNoZWNrIGlmIGluc3RhbmNlIGlzIG51bGwgaW4gY2FzZSBjbGFzcyBpbnN0YW5jZSBpcyBub3QgbG9hZGVkIGFuZCBpdHMgcmVjZWl2ZXMgY2FsbGJhY2tcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKSA9PSBudWxsKSB7XHJcbiAgICAgIEluc3RhbmNlTnVsbCA9IHRydWU7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuQ2FsbFJlY2lldmVFdmVudChfZXZlbnRDb2RlLCBfc2VuZGVyTmFtZSwgX3NlbmRlcklELCBfZGF0YSk7XHJcbiAgICAgIH0sIDUwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEluc3RhbmNlTnVsbCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgX3NlbmRlck5hbWUsIF9zZW5kZXJJRCwgX2RhdGEpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIERpc2Nvbm5lY3REYXRhKCkge1xyXG4gICAgR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPWZhbHNlO1xyXG4gICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0U3RhdGUoKTtcclxuICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgfSxcclxuXHJcbiAgUmVzdGFydEdhbWUoX3RpbWVyID0gMCkge1xyXG4gICAgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBUaW1lb3V0cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRzW2luZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgfSwgX3RpbWVyKTtcclxuICAgIC8vIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gIH0sXHJcblxyXG4gIENoZWNrTWFzdGVyQ2xpZW50KF9pZCkge1xyXG4gICAgdmFyIF9pc01hc3RlciA9IGZhbHNlO1xyXG4gICAgaWYgKFBob3RvblJlZi5teVJvb21NYXN0ZXJBY3Rvck5yKCkgPT0gX2lkICYmIFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciA9PSBfaWQpIHtcclxuICAgICAgX2lzTWFzdGVyID0gdHJ1ZTtcclxuICAgICAgSXNNYXN0ZXJDbGllbnQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5lcnJvcihfaXNNYXN0ZXIpO1xyXG4gICAgcmV0dXJuIF9pc01hc3RlcjtcclxuICB9LFxyXG5cclxuICBDaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoKSB7XHJcbiAgICB2YXIgX2lzTWFzdGVyID0gZmFsc2U7XHJcbiAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yID09IFBob3RvblJlZi5teVJvb21NYXN0ZXJBY3Rvck5yKCkpIHtcclxuICAgICAgX2lzTWFzdGVyID0gdHJ1ZTtcclxuICAgICAgSXNNYXN0ZXJDbGllbnQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUuZXJyb3IoX2lzTWFzdGVyKTtcclxuICAgIHJldHVybiBfaXNNYXN0ZXI7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRSb29tVmFsdWVzKCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KFNjaGVkdWxhcik7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbiAgICAgIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuXHJcbiAgR2V0UmVhbEFjdG9ycygpIHtcclxuICAgIHZhciBfcmVhbFBsYXllciA9IDA7XHJcbiAgICB2YXIgQWxsUGxheWVycyA9IFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEFsbFBsYXllcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChBbGxQbGF5ZXJzW2luZGV4XS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgIF9yZWFsUGxheWVyKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfcmVhbFBsYXllcjtcclxuICB9LFxyXG5cclxuICBSb29tQ291bnRlcihfdGltZXIpIHtcclxuICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gICAgdmFyIF9kYXRhID0gbnVsbDtcclxuICAgIFNjaGVkdWxhciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoSXNNYXN0ZXJDbGllbnQpIHtcclxuICAgICAgICBpZiAoX3RpbWVyID4gMCkge1xyXG4gICAgICAgICAgX3RpbWVyLS07XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhfdGltZXIpO1xyXG4gICAgICAgICAgdGhpcy5Sb29tQ291bnRlcihfdGltZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwidGltZXIgY29tcGxldGVkXCIpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuR2V0UmVhbEFjdG9ycygpID4gMSkge1xyXG4gICAgICAgICAgICAvL2lmIGhhcyBtb3JlIHRoYW4gb25lIHBsYXllciBzdGFydCByZWFsIGdhbWVcclxuICAgICAgICAgICAgdGhpcy5TZW5kUm9vbUNvbXBsZXRlZERhdGEoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlNob3dUb2FzdChcIk5vIG9ubGluZSBwbGF5ZXIgd2FzIGZvdW5kLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyXCIpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLkV4aXRDb25uZWN0aW5nKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVG9nZ2xlTW9kZVNlbGVjdGlvbigxKTtcclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlRvZ2dsZVNob3dSb29tX0Jvb2woZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMgPSAyO1xyXG4gICAgICAgICAgICAvLyBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwicGxheWVycyBmb3VuZFwiKTtcclxuICAgICAgICAgICAgLy8gY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0cnVlLCB0cnVlLCBcIkdhbWVQbGF5XCIpOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgICAgICAgLy8gfSwgMTAwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMDAwKTtcclxuICB9LFxyXG5cclxuICBDbGVhclRpbWVyKCkge1xyXG4gICAgVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICAvL190aW1lciA9IDA7XHJcbiAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICB9LFxyXG5cclxuICBQcm9jZXNzQ291bnRlcigpIHtcclxuICAgIHZhciBfbWFzdGVyID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCgpO1xyXG4gICAgaWYgKF9tYXN0ZXIpIHtcclxuICAgICAgaWYgKCFUaW1lclN0YXJ0ZWQpIHtcclxuICAgICAgICBUaW1lclN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHZhciBfY291bnRlciA9IFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tQ291bnRlclwiKVtcIkNvdW50ZXJcIl07XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJvb21Db3VudGVyKF9jb3VudGVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCByb29tIGNvbXBsZXRlZCBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRSb29tQ29tcGxldGVkRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFJvb21Db21wbGV0ZWREYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgUm9vbUNvbXBsZXRlZERhdGFcIik7XHJcbiAgICAgIC8vICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxNCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRDYXNoRGVkdWN0RGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIFNlbmRDYXNoRGVkdWN0RGF0YVwiKTtcclxuICAgICAgLy8gIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDIxLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZENhc2hBZGRpdGlvbkRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBTZW5kQ2FzaEFkZGl0aW9uRGF0YVwiKTtcclxuICAgICAgLy8gIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDIyLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUm9vbUNvbXBsZXRlZCgpIHtcclxuICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfcmVhbFBsYXllciA9IHRoaXMuR2V0UmVhbEFjdG9ycygpO1xyXG4gICAgICBJc0dhbWVTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMgPSBfcmVhbFBsYXllcjtcclxuICAgICAgY29uc29sZS5sb2coXCJhbGwgcmVxdWlyZWQgcGxheWVycyBqb2luZWQsIHN0YXJ0aW5nIHRoZSBnYW1lLi5cIik7XHJcbiAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJwbGF5ZXJzIGZvdW5kXCIpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICBUaW1lb3V0cy5wdXNoKFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7XHJcbiAgICAgICAgfSwgMTAwMClcclxuICAgICAgKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyh0cnVlLCBfcmVhbFBsYXllciwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgbnVsbCwgZmFsc2UsIDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUFjdG9yQWN0aXZlRGF0YShfYWN0b3IpIHtcclxuICAgIHZhciBfYWN0b3JzQXJyYXkgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICB2YXIgX2RhdGEgPSBudWxsO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgX2RhdGEgPSBfYWN0b3JzQXJyYXlbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgIGlmIChfZGF0YS5QbGF5ZXJVSUQgPT0gX2FjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICBfZGF0YS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIF9hY3RvcnNBcnJheVtpbmRleF0uc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInVwZGF0aW5nIGFjdGl2ZSBzdGF0dXMgb2YgdGhlIHBsYXllciB3aG8gaGFzIGxlZnQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIik7XHJcbiAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gIH0sXHJcblxyXG4gIEhhbmRsZVBsYXllckxlYXZlKGFjdG9yID0gbnVsbCwgUGhvdG9uUmVmZXJlY2UgPSBudWxsLCBfbWFuYWdlciA9IG51bGwsIF9wbGF5ZXJUdXJuID0gMCwgX2luaXRpYWxTZXR1cERvbmUgPSBmYWxzZSwgX2lzU3BlY3RhdGUgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pbml0aWFsU2V0dXBEb25lKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5VcGRhdGVBY3RvckFjdGl2ZURhdGEoYWN0b3IpO1xyXG4gICAgICAgICAgaWYgKCFfaXNTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBsZWZ0OiBcIiArIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5SZW1vdmVGcm9tQ2hlY2tBcnJheShfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlELnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5DaGVja1R1cm5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoX3BsYXllclR1cm4gPT0gaW5kZXggJiYgUGhvdG9uUmVmZXJlY2UubXlBY3RvcigpLmFjdG9yTnIgPT0gUGhvdG9uUmVmZXJlY2UubXlSb29tTWFzdGVyQWN0b3JOcigpKSB7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuQ2hhbmdlVHVybkZvcmNlZnVsbHkoKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoYW5nZSB0dXJuIGZvcmNlZnVsbHlcIik7XHJcbiAgICAgICAgICAgICAgX21hbmFnZXIuU2V0UGxheWVyTGVmdCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX21hbmFnZXIuUmVzZXRTb21lVmFsdWVzKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBfdUlNYW5hZ2VyLlNob3dUb2FzdChcInBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAxMDAwKTtcclxuICAgICAgdmFyIF9wbGF5ZXJmb3VuZCA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQgPT0gYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMtLTtcclxuICAgICAgICAgIF9wbGF5ZXJmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlQWN0b3JBY3RpdmVEYXRhKGFjdG9yKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFfcGxheWVyZm91bmQpIHtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuTWF4UGxheWVycy0tO1xyXG4gICAgICAgIGlmICghX2lzU3BlY3RhdGUpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TeW5jRGF0YShudWxsLCBhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklELCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgY29uc29sZS5sb2coTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy9jYWxsZWQgZXZlcnkgZnJhbWVcclxuICB1cGRhdGUoZHQpIHtcclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHRoZXJlIGlzIHNvbWUgY2hhbmdlIGluIGNvbm5lY3Rpb24gc3RhdGVcclxuICAgICAgICAgICAgQG1ldGhvZCBvblN0YXRlQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vblN0YXRlQ2hhbmdlID0gZnVuY3Rpb24gKHN0YXRlKSB7XHJcbiAgICAgIC8vI3JlZ2lvbiBDb25uZWN0aW9uIFN0YXRlc1xyXG4gICAgICAvL3N0YXRlIDEgOiBjb25uZWN0aW5nVG9OYW1lU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgMiA6IENvbm5lY3RlZFRvTmFtZVNlcnZlclxyXG4gICAgICAvL1N0YXRlIDMgOiBDb25uZWN0aW5nVG9NYXN0ZXJTZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSA0IDogQ29ubmVjdGVkVG9NYXN0ZXJTZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSA1OiAgSm9pbmVkTG9iYnlcclxuICAgICAgLy9TdGF0ZSA2IDogQ29ubmVjdGluZ1RvR2FtZXNlcnZlclxyXG4gICAgICAvL1N0YXRlIDcgOiBDb25uZWN0ZWRUb0dhbWVzZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSA4IDogSm9pbmVkXHJcbiAgICAgIC8vU3RhdGUgMTA6IERpc2Nvbm5lY3RlZFxyXG4gICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgIHZhciBMQkMgPSBQaG90b24uTG9hZEJhbGFuY2luZy5Mb2FkQmFsYW5jaW5nQ2xpZW50O1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlN0YXRlQ29kZTogXCIgKyBzdGF0ZSArIFwiIFwiICsgTEJDLlN0YXRlVG9OYW1lKHN0YXRlKSk7XHJcblxyXG4gICAgICBpZiAoc3RhdGUgPT0gMSkgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcImNvbm5lY3RpbmcgdG8gc2VydmVyLi4uXCIpO1xyXG4gICAgICBlbHNlIGlmIChzdGF0ZSA9PSA0KSBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwiY29ubmVjdGVkIHRvIHNlcnZlclwiKTtcclxuICAgICAgZWxzZSBpZiAoc3RhdGUgPT0gNSkge1xyXG4gICAgICAgIC8vaGFzIGpvaW5lZCBsb2JieVxyXG4gICAgICAgIGlmIChTaG93Um9vbSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcIndhaXRpbmcgZm9yIG90aGVyIHBsYXllcnMuLi5cIik7XHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pblJhbmRvbVJvb20oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFNob3dSb29tID09IHRydWUpIHtcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzaG93aW5nIHJvb21zIGxpc3QuLi5cIik7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZVJvb21TY3JlZW5fU3BlY3RhdGVVSSh0cnVlKTtcclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGRlYnVnXHJcbiAgICAgICAgICAgIEBtZXRob2QgZGVidWdcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYubG9nZ2VyLmRlYnVnID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgaW5mb1xyXG4gICAgICAgICAgICBAbWV0aG9kIGluZm9cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5pbmZvID0gZnVuY3Rpb24gKG1lc3MsIHBhcmFtKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MgKyBwYXJhbSk7XHJcbiAgICAgIHN0YXRlVGV4dCArPSBtZXNzICsgXCIgXCIgKyBwYXJhbSArIFwiXFxuXCI7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgd2FyblxyXG4gICAgICAgICAgICBAbWV0aG9kIHdhcm5cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtMVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTNcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYubG9nZ2VyLndhcm4gPSBmdW5jdGlvbiAobWVzcywgcGFyYW0xLCBwYXJhbTIsIHBhcmFtMykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzICsgXCIgXCIgKyBwYXJhbTEgKyBcIiBcIiArIHBhcmFtMiArIFwiIFwiICsgcGFyYW0zKTtcclxuXHJcbiAgICAgIGlmIChwYXJhbTEgPT0gMjI1KSB7XHJcbiAgICAgICAgLy9ubyByb29tIGZvdW5kXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJubyByYW5kb20gcm9vbSB3YXMgZm91bmQsIGNyZWF0aW5nIG9uZVwiKTtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ3JlYXRlUm9vbSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyYW0xID09IDIyNikge1xyXG4gICAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlNob3dUb2FzdChcIlJvb20gZG9lcyBub3QgZXhpc3RzIGFueW1vcmUscGxlYXNlIHRyeSBhZ2FpbiBieSBleGl0aW5nLlwiKTtcclxuICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DbGVhclRpbWVyKCk7XHJcbiAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuU2V0Q29ubmV0aW5nKGZhbHNlKTtcclxuICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFJvb21WYWx1ZXMoKTtcclxuICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vcm9vbSBkb2VzIG5vdCBleGlzdHMgb3IgaXMgZnVsbFxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVMb2FkaW5nTm9kZShmYWxzZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlNob3dUb2FzdChcIlJvb20gaXMgZnVsbCwgcGxlYXNlIHNlbGVjdCBhbnkgb3RoZXIgcm9vbSB0byBzcGVjdGF0ZS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZXJyb3JcclxuICAgICAgICAgICAgQG1ldGhvZCBlcnJvclxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW1cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYubG9nZ2VyLmVycm9yID0gZnVuY3Rpb24gKG1lc3MsIHBhcmFtKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGV4Y2VwdGlvblxyXG4gICAgICAgICAgICBAbWV0aG9kIGV4Y2VwdGlvblxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZXhjZXB0aW9uID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgc29tZSBmb3JtYXRcclxuICAgICAgICAgICAgQG1ldGhvZCBmb3JtYXRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYubG9nZ2VyLmZvcm1hdCA9IGZ1bmN0aW9uIChtZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBwbGF5ZXIgam9pbnMgbG9iYnlcclxuICAgICAgICAgICAgQG1ldGhvZCBvblJvb21MaXN0XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vblJvb21MaXN0ID0gZnVuY3Rpb24gKHJvb21zKSB7XHJcbiAgICAgIHN0YXRlVGV4dCArPSBcIlxcblwiICsgXCJSb29tcyBMaXN0OlwiICsgXCJcXG5cIjtcclxuXHJcbiAgICAgIGlmIChyb29tcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgIHN0YXRlVGV4dCArPSBcIk5vIHJvb21zIGluIGxvYmJ5LlwiICsgXCJcXG5cIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlJlc2V0Um9vbUxpc3QoKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb29tcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5VcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShyb29tc1tpXS5uYW1lLCByb29tc1tpXS5wbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJvb20gbmFtZTogXCIgKyByb29tc1tpXS5uYW1lKTtcclxuICAgICAgICAgIHN0YXRlVGV4dCArPSBcIlJvb206IFwiICsgcm9vbXNbaV0ubmFtZSArIFwiXFxuXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHRoZXJlIGlzIGNoYW5nZSBpbiByb29tcyBsaXN0IChyb29tIGFkZGVkLHVwZGF0ZWQscmVtb3ZlZCBldGMpXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Sb29tTGlzdFVwZGF0ZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zVXBkYXRlZFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNBZGRlZFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNSZW1vdmVkXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uUm9vbUxpc3RVcGRhdGUgPSBmdW5jdGlvbiAocm9vbXMsIHJvb21zVXBkYXRlZCwgcm9vbXNBZGRlZCwgcm9vbXNSZW1vdmVkKSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb29tcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkocm9vbXNbaV0ubmFtZSwgcm9vbXNbaV0ucGxheWVyQ291bnQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbSBuYW1lOiBcIiArIHJvb21zW2ldLm5hbWUpO1xyXG4gICAgICAgIHN0YXRlVGV4dCArPSBcIlJvb206IFwiICsgcm9vbXNbaV0ubmFtZSArIFwiXFxuXCI7XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2coXCJSb29tcyBMaXN0IHVwZGF0ZWQ6IFwiICsgcm9vbXNVcGRhdGVkLmxlbmd0aCArIFwiIHVwZGF0ZWQsIFwiICsgcm9vbXNBZGRlZC5sZW5ndGggKyBcIiBhZGRlZCwgXCIgKyByb29tc1JlbW92ZWQubGVuZ3RoICsgXCIgcmVtb3ZlZFwiKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBsb2NhbGx5IGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIGpvaW5zIHJvb21cclxuICAgICAgICAgICAgQG1ldGhvZCBvbkpvaW5Sb29tXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uSm9pblJvb20gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8vI3JlZ2lvbiBMb2dzIGZvciBnYW1lXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBcIiArIHRoaXMubXlSb29tKCkubmFtZSArIFwiIGpvaW5lZFwiKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15QWN0b3IoKSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KClbMF0ubG9hZEJhbGFuY2luZ0NsaWVudC51c2VySWQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkuX2N1c3RvbVByb3BlcnRpZXMpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdKTtcclxuICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSB0cnVlKSB7XHJcbiAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgd2hvIGpvaW5lZCBpcyBzcGVjdGF0ZVxyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0cnVlLCB0cnVlLCBcIkdhbWVQbGF5XCIpO1xyXG4gICAgICAgIH0sIDEwMDApOyAvL2Z1bmN0aW9uIGluIFVJTWFuYWdlclxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkV4aXRDb25uZWN0aW5nKSB7XHJcbiAgICAgIC8vICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNsZWFyVGltZXIoKTtcclxuICAgICAgLy8gICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuU2V0Q29ubmV0aW5nKGZhbHNlKTtcclxuICAgICAgLy8gICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICAgIC8vICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUHJvY2Vzc0NvdW50ZXIoKTtcclxuICAgICAgICAvL31cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIHJlbW90ZWx5IGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIGpvaW5zIHJvb21cclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9ySm9pblxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICAoUGhvdG9uUmVmLm9uQWN0b3JKb2luID0gZnVuY3Rpb24gKGFjdG9yKSB7XHJcbiAgICAgIHZhciBfcmVhbFBsYXllciA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5HZXRSZWFsQWN0b3JzKCk7XHJcblxyXG4gICAgICBpZiAoX3JlYWxQbGF5ZXIgPT0gTWF4U3R1ZGVudHMpIHtcclxuICAgICAgICAvL3doZW4gbWF4IHBsYXllciByZXF1aXJlZCB0byBzdGFydCBnYW1lIGhhcyBiZWVuIGFkZGVkXHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHJlcXVpcmVkIHBsYXllcnMgam9pbmVkLCBzdGFydGluZyB0aGUgZ2FtZS4uXCIpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJwbGF5ZXJzIGZvdW5kXCIpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0cnVlLCB0cnVlLCBcIkdhbWVQbGF5XCIpO1xyXG4gICAgICAgIH0sIDEwMDApOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXModHJ1ZSwgUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgbnVsbCwgZmFsc2UsIDApO1xyXG4gICAgICAgIC8vUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyXCIsUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSx0cnVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudChhY3Rvci5hY3Rvck5yKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBqb2luZWRcIik7XHJcbiAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJUb3RhbCBQbGF5ZXJzOiBcIitQaG90b25SZWYubXlSb29tQWN0b3JDb3VudCgpKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpKTtcclxuICAgIH0pLFxyXG4gICAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIHJlbW90ZWx5IGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIGxlYXZlcyBhIHJvb21cclxuICAgICAgICAgICAgQG1ldGhvZCBvbkFjdG9yTGVhdmVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgICAoUGhvdG9uUmVmLm9uQWN0b3JMZWF2ZSA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICAgIGlmICghR2FtZUZpbmlzaGVkICYmICFSZXN0YXJ0U3BlY3RhdGUpIHtcclxuICAgICAgICAgIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmICghYWN0b3IuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgIGlmICghTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkxlYXZlUm9vbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWN0YXRvciBsZWZ0LCBzbyBkb250IG1pbmQsIGNvbnQgZ2FtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIFBob3RvblJlZmVyZWNlID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLmdldFBob3RvblJlZigpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBpZiAoX21hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX3BsYXllclR1cm4gPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIHZhciBfdUlHYW1lTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVhbFBsYXllciA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5HZXRSZWFsQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBfaW5pdGlhbFNldHVwRG9uZSA9IFBob3RvblJlZmVyZWNlLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIFwiICsgYWN0b3IuYWN0b3JOciArIFwiIGxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9yZWFsUGxheWVyID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkhhbmRsZVBsYXllckxlYXZlKGFjdG9yLCBQaG90b25SZWZlcmVjZSwgX21hbmFnZXIsIF9wbGF5ZXJUdXJuLCBfaW5pdGlhbFNldHVwRG9uZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKF91SUdhbWVNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF91SUdhbWVNYW5hZ2VyLlNob3dUb2FzdChcInBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAxMTUwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfaW5pdGlhbFNldHVwRG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQgPT0gYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlQWN0b3JBY3RpdmVEYXRhKGFjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5HYW1lT3Zlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdUlHYW1lTWFuYWdlcikgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc3RhcnRHYW1lKDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXN0YXJ0R2FtZSgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX3VJR2FtZU1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3VJR2FtZU1hbmFnZXIuU2hvd1RvYXN0KFwicGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDExNTAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5nZXRTY2VuZU5hbWUoKSA9PSBcIkdhbWVQbGF5XCIpIC8vaWYgc2NlbmUgaXMgZ2FtZXBsYXkgbGV0IHBsYXllciBmaW5pc2ggZ2FtZSBmb3JjZWZ1bGx5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJvdGhlciBwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpbk1lbnVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9LCAyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfdUlHYW1lTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTE1MCwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3JlYWxQbGF5ZXIgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSGFuZGxlUGxheWVyTGVhdmUoYWN0b3IsIFBob3RvblJlZmVyZWNlLCBfbWFuYWdlciwgX3BsYXllclR1cm4sIF9pbml0aWFsU2V0dXBEb25lLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKF9pbml0aWFsU2V0dXBEb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLkdhbWVPdmVyKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0b3IgaGFzIGxlZnRcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhJc0dhbWVTdGFydGVkKTtcclxuICAgICAgICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlICYmICFJc0dhbWVTdGFydGVkKSB7XHJcbiAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlByb2Nlc3NDb3VudGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IHRydWUpIHtcclxuICAgICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSA9PSAxICYmICFSZXN0YXJ0U3BlY3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIFJlc3RhcnRTcGVjdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzdGFydEdhbWUoMTUwMCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVhdHJ0ZWRcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIG93biBwcm9wZXJ0aWVzIGdvdCBjaGFuZ2VkXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvclByb3BlcnRpZXNDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlID0gZnVuY3Rpb24gKGFjdG9yKSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuIGV2ZW4gcGxheWVyIHJvb20gcHJvcGVydGllcyBnb3QgY2hhbmdlZFxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uTXlSb29tUHJvcGVydGllc0NoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gYWN0b3JcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlID0gZnVuY3Rpb24gKF9kYXRhKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gdG8gaGFuZGxlIGVycm9yc1xyXG4gICAgICAgICAgICBAbWV0aG9kIG9uRXJyb3JcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGVycm9yQ29kZVxyXG4gICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGVycm9yTXNnXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3JDb2RlLCBlcnJvck1zZykge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIFwiICsgZXJyb3JDb2RlICsgXCI6IFwiICsgZXJyb3JNc2cpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBhbiBldmVudCBpcyByZWNlaXZlZCB3aXRoIHNvbWUgZGF0YVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uRXZlbnRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvZGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGNvbnRlbnRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yTnJcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25FdmVudCA9IGZ1bmN0aW9uIChjb2RlLCBjb250ZW50LCBhY3Rvck5yKSB7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgc3dpdGNoIChjb2RlKSB7XHJcbiAgICAgICAgY2FzZSAxOiAvL3JlY2V2aW5nIHBsYXllcmRhdGEgaW5mb1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwbGF5ZXIgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBQbGF5ZXJJbmZvRGF0YSA9IGNvbnRlbnQuUGxheWVySW5mbztcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgUGxheWVySW5mb0RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjogLy9zdGFydCB0dXJuIHJhaXNlIGV2ZW50XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHN0YXJ0IHR1cm4gZXZlbnRcIik7XHJcbiAgICAgICAgICB2YXIgX1R1cm4gPSBjb250ZW50LlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9UdXJuKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6IC8vIGRpY2UgY291bnRcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGljZSBjb3VudFwiKTtcclxuICAgICAgICAgIHZhciBfZGljZSA9IGNvbnRlbnQuRGljZUNvdW50O1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDMsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGljZSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OiAvL3JlY2VpbmcgdXNlciBpZCBvZiBwbGF5ZXIgd2hvIGhhcyBjb21wbGV0ZWQgdHVyblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwbGF5ZXIgdHVybiBjb21wbGV0ZWRcIik7XHJcbiAgICAgICAgICB2YXIgX0lEID0gY29udGVudC5VSUQ7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9JRCk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OiAvL3JlY2VpdmluZyBjYXJkIGRhdGEgKGluZGV4KSBzbyBvdGhlciB1c2VycyBjYW4gc3luYyB0aGVtXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGNhcmQgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfY2FyZCA9IGNvbnRlbnQuQ2FyZERhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9jYXJkKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDY6IC8vcmVjZWl2ZSBnYW1lIG92ZXIgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBnYW1lIG92ZXIgY2FsbFwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg2LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNzogLy9yZWNlaXZlIG9uZSBRdWVzdGlvbiBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIG9uZSBxdWVzdGlvbiBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDcsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA4OiAvL3JlY2VpdmUgb25lIFF1ZXN0aW9uIHJlc3BvbnNlIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgb25lIHF1ZXN0aW8gcmVzcG9uc2UgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg4LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgOTogLy9yZWNlaXZlIGJhbmtydXB0IGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgYmFua3J1cHQgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg5LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTA6IC8vcmVjZWl2ZSBiYWNrc3BhY2UgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBiYWNrc3BhY2UgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDExOiAvL3JlY2VpdmVpbmcgcGFydG5lcnNoaXAgb2ZmZXJcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgb2ZmZXIgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEyOiAvL3JlY2VpdmVpbmcgcGFydG5lcnNoaXAgYW5zd2VyIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgYW53c2VyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTIsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMzogLy9yZWNlaXZpbmcgcHJvZml0L2xvc3MgZGF0YSBmb3IgcGFydG5lclxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBhbndzZXIgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxMywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE0OiAvL3JlY2VpdmluZyByb29tIGNvbXBsZXRlIGRhdGEgdG8gc3RhcnQgR2FtZVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBwYXJ0bmVyc2hpcCBhbndzZXIgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUm9vbUNvbXBsZXRlZCgpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTU6IC8vcmVjZWl2aW5nIHBheWRheSBpbmZvXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGluZm9cIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTUsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNjogLy9yZWNlaXZpbmcgZ2FtZSBvdmVyIGRhdGEgdG8gc3luY1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBnYW1lIG92ZXIgc3luYyBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE2LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTc6IC8vcmVjZWl2aW5nIGRhdGEgb2YgcGxheWVyIHRvIGdldCBhbGwgcHJvZml0IG5leHQgcGF5IGRheVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkYXRhIG9mIHBsYXllciB0byBnZXQgYWxsIHByb2ZpdCBuZXh0IHBheSBkYXlcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTcsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxODogLy9yZWNlaXZpbmcgb25lIHF1ZXN0aW9uIGFycmF5XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRhdGEgZm9yIG9uZSBxdWVzdGlvbiBhcnJheVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxOCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE5OiAvL3JlY2VpdmluZyBkZWNrcyBhcnJheVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkYXRhIGZvciBkZWNrcyBhcnJheVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxOSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDIwOiAvL3JlY2VpdmluZyBkZWNrcyBhcnJheSBDb3VudGVyXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRhdGEgZm9yIGRlY2tzIGFycmF5IGNvdW50ZXJcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjAsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyMTogLy9yZWNlaXZpbmcgY2FzaCBkZWR1Y3QgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBjYXNoIGRlZHVjdCBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDIxLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIDIyOiAvL3JlY2VpdmluZyBjYXNoIGFkZCBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGNhc2ggYWRkIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjIsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyMzogLy9yZWNlaXZpbmcgdGFrZSBvdmVyIGJ1c2luZXNzIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2aW5nIHRha2Ugb3ZlciBidXNpbmVzcyBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDIzLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjQ6IC8vcmVjZWl2aW5nIGRhbWFnaW5nIGluZm9ybWF0aW9uXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmluZyBkYW1hZ2luZyBpbmZvcm1hdGlvblwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyNCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI1OiAvL3JlY2VpdmluZyBkYW1hZ2luZyBpbmZvcm1hdGlvblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZpbmcgZGFtYWdpbmcgaW5mb3JtYXRpb24gRGVjaXNvblwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyNSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI2OiAvL3JlY2VpdmluZyBidXkgaGFsZiBidXNpbmVzcyBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmluZyBidXkgaGFsZiBidXNpbmVzcyBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDI2LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjc6IC8vcmVjZWl2aW5nIGRpY2UgY29tcGFyZSBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmluZyBkaWNlIGNvbXBhcmUgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyNywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAyODogLy9yZWNlaXZpbmcgZGljZSBjb21wYXJlIGRhdGEgZGVjaXNvblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZpbmcgZGljZSBjb21wYXJlIGRhdGEgZGVjaXNvblwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyOCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI5OiAvL3JlY2VpdmluZyBUViBhZCBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmluZyBUViBhZCBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDI5LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzA6IC8vcmVjZWl2aW5nIFRWIGFkIGRhdGEgdm90ZXNcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2aW5nIFRWIGFkIGRhdGEgdm90ZXNcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMzAsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyO1xyXG4iXX0=