
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
        console.log("error: " + err.message);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJHYW1lRmluaXNoZWQiLCJJc01hc3RlckNsaWVudCIsIlRvdGFsVGltZXIiLCJUaW1lclN0YXJ0ZWQiLCJTY2hlZHVsYXIiLCJNYXhTdHVkZW50cyIsIlJlc3RhcnRTcGVjdGF0ZSIsIklzR2FtZVN0YXJ0ZWQiLCJUaW1lb3V0cyIsIlJvb21Qcm9wZXJ0eSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllciIsInR5cGUiLCJJbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiSW5pdGlhbFNldHVwIiwiQm9vbGVhbiIsIlBsYXllckdhbWVJbmZvIiwiVGV4dCIsIlR1cm5OdW1iZXIiLCJBcHBfSW5mbyIsIkFwcElEIiwidG9vbHRpcCIsIkFwcFZlcnNpb24iLCJXc3MiLCJkaXNwbGF5TmFtZSIsIk1hc3RlclNlcnZlciIsIkZiQXBwSUQiLCJNdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDb21wb25lbnQiLCJQaG90b25BcHBJbmZvIiwiTWF4UGxheWVycyIsIk1heFNwZWN0YXRvcnMiLCJNb2RlU2VsZWN0aW9uIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwiUmVzZXRSb29tVmFsdWVzIiwib25Mb2FkIiwiRXhpdENvbm5lY3RpbmciLCJJbml0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZU1vZGVTZWxlY3Rpb24iLCJfdmFsIiwiU2V0Q29ubmV0aW5nIiwiX3N0YXRlIiwiR2V0QWN0aXZlU3RhdHVzIiwiX3VJRCIsIl9pc0FjdGl2ZSIsIl9hcnJheSIsIkdldF9HYW1lTWFuYWdlciIsImluZGV4IiwibGVuZ3RoIiwiUGxheWVyVUlEIiwiSXNBY3RpdmUiLCJHZXRCYW5rcnVwdGVkU3RhdHVzIiwiX2lzQmFua3J1cHRlZCIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiQmFua3J1cHRlZE5leHRUdXJuIiwiR2V0U2VsZWN0ZWRNb2RlIiwiZ2FtZSIsImFkZFBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJJbml0aWFsaXplUGhvdG9uIiwiY29uc29sZSIsImxvZyIsIkFwcEluZm8iLCJEZW1vTG9hZEJhbGFuY2luZyIsIkxlYXZlUm9vbSIsIlJvb21OYW1lIiwiTWVzc2FnZSIsIkpvaW5lZFJvb20iLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJnZXRTY2VuZU5hbWUiLCJzY2VuZU5hbWUiLCJfc2NlbmVJbmZvcyIsImkiLCJ1dWlkIiwiZGlyZWN0b3IiLCJfc2NlbmUiLCJfaWQiLCJ1cmwiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsIm1hdGNoIiwiVG9nZ2xlU2hvd1Jvb21fQm9vbCIsIlRvZ2dsZUxlYXZlUm9vbV9Cb29sIiwiZ2V0UGhvdG9uUmVmIiwiUGhvdG9uQWN0b3IiLCJteUFjdG9yIiwiUm9vbUFjdG9ycyIsIm15Um9vbUFjdG9yc0FycmF5IiwiQ2hlY2tTcGVjdGF0ZSIsImN1c3RvbVByb3BlcnRpZXMiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJBcHBJZCIsIkZiQXBwSWQiLCJSZXF1ZXN0Q29ubmVjdGlvbiIsInN0YXRlIiwiaXNDb25uZWN0ZWRUb01hc3RlciIsImlzSW5Mb2JieSIsInN0YXJ0IiwiQ2hlY2tDb25uZWN0aW9uU3RhdGUiLCJfY29ubmVjdGVkIiwiaXNKb2luZWRUb1Jvb20iLCJEaXNjb25uZWN0UGhvdG9uIiwiZGlzY29ubmVjdCIsIlJlc2V0U3RhdGUiLCJPblJvb21OYW1lQ2hhbmdlIiwiT25NZXNzYWdlQ2hhbmdlIiwibXNnIiwiVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXMiLCJfcGxheWVyVXBkYXRlIiwiX3BsYXllclZhbHVlIiwiX2luaXRpYWxTZXR1cFVwZGF0ZSIsIl9pbml0aWFsU2V0dXBWYWx1ZSIsIl9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSIsIl9wbGF5ZXJHYW1lSW5mb1ZhbHVlIiwiX3R1cm5OdW1iZXJVcGRhdGUiLCJfdHVybk51bWJlcnZhbHVlIiwibXlSb29tIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDcmVhdGVSb29tIiwiX2RhdGEiLCJyb29tT3B0aW9ucyIsImlzVmlzaWJsZSIsImlzT3BlbiIsIm1heFBsYXllcnMiLCJjdXN0b21HYW1lUHJvcGVydGllcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsIlN0dWRlbnREYXRhIiwiQ291bnRlciIsInNldFVzZXJJZCIsInVzZXJJRCIsIlJvb21JRCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIkRhdGUiLCJub3ciLCJjcmVhdGVSb29tIiwiSm9pblJvb20iLCJfcm9vbU5hbWUiLCJqb2luUm9vbSIsIkpvaW5SYW5kb21Sb29tIiwiZXhwZWN0ZWRDdXN0b21Sb29tUHJvcGVydGllcyIsImpvaW5SYW5kb21Sb29tIiwiU2VuZENhcmREYXRhIiwicmFpc2VFdmVudCIsIkNhcmREYXRhIiwic2VuZGVyTmFtZSIsInNlbmRlcklEIiwiYWN0b3JOciIsInJlY2VpdmVycyIsIlBob3RvbiIsIkxvYWRCYWxhbmNpbmciLCJDb25zdGFudHMiLCJSZWNlaXZlckdyb3VwIiwiQWxsIiwiZXJyIiwibWVzc2FnZSIsIlNlbmRHYW1lT3ZlciIsIkRhdGEiLCJlcnJvciIsIlNlbmRHYW1lT3ZlckRhdGEiLCJTZW5kU2VsZWN0ZWRQbGF5ZXJGb3JQcm9maXQiLCJPdGhlcnMiLCJTZW5kQmFua3J1cHREYXRhIiwiU2VuZERhdGEiLCJQbGF5ZXJJbmZvIiwiU2VuZE9uZVF1ZXN0aW9uRGF0YSIsIlNlbmRPbmVRdWVzdGlvbkFycmF5cyIsIlNlbmREZWNrc0FycmF5cyIsIlNlbmREZWNrc0FycmF5Q291bnRlciIsIlNlbmRQYXJ0bmVyUHJvZml0TG9zcyIsIlNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YSIsIkRpY2VSb2xsRXZlbnQiLCJEaWNlQ291bnQiLCJTZW5kR29CYWNrU3BhY2VEYXRhIiwiU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhIiwiU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YSIsIlNlbmRJbmZvIiwiU3luY1R1cm5Db21wbGV0aW9uIiwiVUlEIiwiU3RhcnRUdXJuIiwidHJhY2UiLCJTZW5kVGFrZUJ1c2luZXNzRGF0YSIsIlNlbmREYW1hZ2luZ0RhdGEiLCJTZW5kRGFtYWdpbmdEZWNpc2lvbkRhdGEiLCJTZW5kQnV5SGFsZkJ1c2luZXNzRGF0YSIsIlNlbmRDb21wYXJlRGljZURhdGEiLCJTZW5kQ29tcGFyZURpY2VEYXRhRGVjaXNpb24iLCJTZW5kVFZBRERhdGEiLCJTZW5kVFZBRERhdGFWb3RlcyIsIlNob3dUb2FzdCIsIkNhbGxSZWNpZXZlRXZlbnQiLCJfZXZlbnRDb2RlIiwiX3NlbmRlck5hbWUiLCJfc2VuZGVySUQiLCJJbnN0YW5jZU51bGwiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsInNldFRpbWVvdXQiLCJSZWNlaXZlRXZlbnQiLCJEaXNjb25uZWN0RGF0YSIsIlJlc3RhcnRHYW1lIiwiX3RpbWVyIiwiY2xlYXJUaW1lb3V0IiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsImxvYWRTY2VuZSIsIkNoZWNrTWFzdGVyQ2xpZW50IiwiX2lzTWFzdGVyIiwibXlSb29tTWFzdGVyQWN0b3JOciIsIkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCIsIkdldFJlYWxBY3RvcnMiLCJfcmVhbFBsYXllciIsIkFsbFBsYXllcnMiLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIlJvb21Db3VudGVyIiwiU2VuZFJvb21Db21wbGV0ZWREYXRhIiwiR2V0X1VJTWFuYWdlciIsIkNsZWFyVGltZXIiLCJQcm9jZXNzQ291bnRlciIsIl9tYXN0ZXIiLCJfY291bnRlciIsIlNlbmRDYXNoRGVkdWN0RGF0YSIsIlNlbmRDYXNoQWRkaXRpb25EYXRhIiwiUm9vbUNvbXBsZXRlZCIsInN5c3RlbUV2ZW50IiwiZW1pdCIsInB1c2giLCJVcGRhdGVBY3RvckFjdGl2ZURhdGEiLCJfYWN0b3IiLCJfYWN0b3JzQXJyYXkiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkhhbmRsZVBsYXllckxlYXZlIiwiYWN0b3IiLCJQaG90b25SZWZlcmVjZSIsIl9tYW5hZ2VyIiwiX3BsYXllclR1cm4iLCJfaW5pdGlhbFNldHVwRG9uZSIsIl9pc1NwZWN0YXRlIiwiUmVtb3ZlRnJvbUNoZWNrQXJyYXkiLCJ0b1N0cmluZyIsIkNoZWNrVHVybkNvbXBsZXRlIiwiQ2hhbmdlVHVybkZvcmNlZnVsbHkiLCJTZXRQbGF5ZXJMZWZ0IiwiUmVzZXRTb21lVmFsdWVzIiwiX3BsYXllcmZvdW5kIiwic3BsaWNlIiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU3luY0RhdGEiLCJ1cGRhdGUiLCJkdCIsIm9uU3RhdGVDaGFuZ2UiLCJMQkMiLCJMb2FkQmFsYW5jaW5nQ2xpZW50IiwiU3RhdGVUb05hbWUiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJsb2dnZXIiLCJkZWJ1ZyIsIm1lc3MiLCJpbmZvIiwicGFyYW0iLCJ3YXJuIiwicGFyYW0xIiwicGFyYW0yIiwicGFyYW0zIiwiVG9nZ2xlTG9hZGluZ05vZGUiLCJleGNlcHRpb24iLCJmb3JtYXQiLCJvblJvb21MaXN0Iiwicm9vbXMiLCJSZXNldFJvb21MaXN0IiwiVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkiLCJwbGF5ZXJDb3VudCIsIm9uUm9vbUxpc3RVcGRhdGUiLCJyb29tc1VwZGF0ZWQiLCJyb29tc0FkZGVkIiwicm9vbXNSZW1vdmVkIiwib25Kb2luUm9vbSIsImxvYWRCYWxhbmNpbmdDbGllbnQiLCJ1c2VySWQiLCJfY3VzdG9tUHJvcGVydGllcyIsIm9uQWN0b3JKb2luIiwibXlSb29tQWN0b3JDb3VudCIsIm9uQWN0b3JMZWF2ZSIsIkdhbWVPdmVyIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIkdldFR1cm5OdW1iZXIiLCJfdUlHYW1lTWFuYWdlciIsIm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlIiwib25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlIiwib25FcnJvciIsImVycm9yQ29kZSIsImVycm9yTXNnIiwib25FdmVudCIsImNvZGUiLCJjb250ZW50IiwiUGxheWVySW5mb0RhdGEiLCJfVHVybiIsIl9kaWNlIiwiX0lEIiwiX2NhcmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsU0FBSjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLEtBQWY7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsS0FBckI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsSUFBaEI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxJQUFJQyxlQUFlLEdBQUcsS0FBdEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsS0FBcEI7QUFDQSxJQUFJQyxRQUFRLEdBQUcsRUFBZixFQUVBOztBQUNBLElBQUlDLFlBQVksR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDMUJDLEVBQUFBLElBQUksRUFBRSxjQURvQjtBQUUxQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLE1BQU0sRUFBRTtBQUNOLGlCQUFTLENBREg7QUFFTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLE9BRkg7QUFHTkMsTUFBQUEsWUFBWSxFQUFFO0FBSFIsS0FERTtBQU1WQyxJQUFBQSxZQUFZLEVBQUU7QUFDWixpQkFBUyxLQURHO0FBRVpILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUyxPQUZH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RjtBQWpSRjtBQW1SRCxLQXJSRDtBQXNSRDtBQS9oRWtDLENBQVQsQ0FBNUI7QUFraUVBc0wsTUFBTSxDQUFDQyxPQUFQLEdBQWlCelIscUJBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJpYWJsZXNcclxudmFyIFBob3RvblJlZjtcclxudmFyIHN0YXRlVGV4dCA9IFwiXCI7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgU2hvd1Jvb20gPSBmYWxzZTtcclxudmFyIEdhbWVGaW5pc2hlZCA9IGZhbHNlO1xyXG52YXIgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxudmFyIFRvdGFsVGltZXIgPSAzMDtcclxudmFyIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG52YXIgU2NoZWR1bGFyID0gbnVsbDtcclxudmFyIE1heFN0dWRlbnRzID0gNjtcclxudmFyIFJlc3RhcnRTcGVjdGF0ZSA9IGZhbHNlO1xyXG52YXIgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG52YXIgVGltZW91dHMgPSBbXTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIFJvb21Qcm9wZXJ0eS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSb29tUHJvcGVydHkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJSb29tUHJvcGVydHlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXI6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEluaXRpYWxTZXR1cDoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUdXJuTnVtYmVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZGF0YSByZWxhdGVkIHRvIEFwcF9JbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEFwcF9JbmZvID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQXBwX0luZm9cIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBBcHBJRDoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQXBwIGlkIGZvcm0gcGhvdG9uIGRhc2hib2FyZFwiLFxyXG4gICAgfSxcclxuICAgIEFwcFZlcnNpb246IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFwcCB2ZXJzaW9uIGZvciBwaG90b25cIixcclxuICAgIH0sXHJcbiAgICBXc3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNTZWN1cmVcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJJZiBwaG90b24gc2hvdWxkIHVzZSBzZWN1cmUgYW5kIHJlbGlhYmxlIHByb3RvY29sc1wiLFxyXG4gICAgfSxcclxuICAgIE1hc3RlclNlcnZlcjoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibWFzdGVyIHNlcnZlciBmb3IgcGhvdG9uIHRvIGNvbm5lY3RcIixcclxuICAgIH0sXHJcbiAgICBGYkFwcElEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJGQiBhcHAgaWQgdXNlZCBmb3IgRkIgYXV0aGVyaXphdGlvblwiLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBNdWx0aXBsYXllckNvbnRyb2xsZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJNdWx0aXBsYXllckNvbnRyb2xsZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGhvdG9uQXBwSW5mbzoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBBcHBfSW5mbyxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1heFBsYXllcnM6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1heFNwZWN0YXRvcnM6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE1vZGVTZWxlY3Rpb246IHtcclxuICAgICAgLy8gMSBtZWFucyBib3QgLCAyIG1lYW5zIHJlYWwgcGxheWVyc1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIC8vY3JlYXRpbmcgc3RhdGljIGluc3RhbmNlIG9mIHRoZSBjbGFzc1xyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxEYXRhKCkge1xyXG4gICAgVGltZW91dHMgPSBbXTtcclxuICAgIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIFBob3RvblJlZiA9IG51bGw7XHJcbiAgICBzdGF0ZVRleHQgPSBcIlwiO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIFNob3dSb29tID0gZmFsc2U7XHJcbiAgICBHYW1lRmluaXNoZWQgPSBmYWxzZTtcclxuICAgIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbiAgICBUb3RhbFRpbWVyID0gMzA7XHJcbiAgICBUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIFNjaGVkdWxhciA9IG51bGw7XHJcbiAgICB0aGlzLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgTWF4U3R1ZGVudHMgPSA2O1xyXG4gICAgUmVzdGFydFNwZWN0YXRlID0gZmFsc2U7XHJcbiAgfSxcclxuICAvL3RoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBpcyBjcmVhdGVkXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5FeGl0Q29ubmVjdGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5SZXNldEFsbERhdGEoKTtcclxuICAgIHRoaXMuSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVNb2RlU2VsZWN0aW9uKFxyXG4gICAgX3ZhbCAvLyAxIG1lYW5zIGJvdCAsIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXHJcbiAgKSB7XHJcbiAgICB0aGlzLk1vZGVTZWxlY3Rpb24gPSBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFNldENvbm5ldGluZyhfc3RhdGUpIHtcclxuICAgIHRoaXMuRXhpdENvbm5lY3RpbmcgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgR2V0QWN0aXZlU3RhdHVzKF91SUQgPSBcIlwiKSB7XHJcbiAgICB2YXIgX2lzQWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgX2FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfYXJyYXlbaW5kZXhdLlBsYXllclVJRCA9PSBfdUlEKSB7XHJcbiAgICAgICAgaWYgKF9hcnJheVtpbmRleF0uSXNBY3RpdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIF9pc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfaXNBY3RpdmU7XHJcbiAgfSxcclxuXHJcbiAgR2V0QmFua3J1cHRlZFN0YXR1cyhfdUlEID0gXCJcIikge1xyXG4gICAgdmFyIF9pc0JhbmtydXB0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgX2FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfYXJyYXlbaW5kZXhdLlBsYXllclVJRCA9PSBfdUlEKSB7XHJcbiAgICAgICAgaWYgKF9hcnJheVtpbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuQmFua3J1cHRlZE5leHRUdXJuID09IHRydWUpIHtcclxuICAgICAgICAgIF9pc0JhbmtydXB0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfaXNCYW5rcnVwdGVkO1xyXG4gIH0sXHJcblxyXG4gIEdldFNlbGVjdGVkTW9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLk1vZGVTZWxlY3Rpb247XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBJbml0aWFsaXplIHNvbWUgZXNzZW50YWlscyBkYXRhIGZvciBtdWx0aXBsYXllciBjb250cm9sbGVyIGNsYXNzXHJcbiAgICBAbWV0aG9kIEluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEluaXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkge1xyXG4gICAgaWYgKCFNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UpIHtcclxuICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgdGhpcy5Jbml0aWFsaXplUGhvdG9uKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKEFwcEluZm8pO1xyXG4gICAgICBQaG90b25SZWYgPSBuZXcgRGVtb0xvYWRCYWxhbmNpbmcoKTtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLkxlYXZlUm9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5Sb29tTmFtZSA9IFwiXCI7XHJcbiAgICB0aGlzLk1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgU2hvd1Jvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNoZWNrIHJlZmVyZW5jZSB0byBzb21lIHZhcmlhYmxlcyBhbmQgY2xhc3Nlc1xyXG4gICAgQG1ldGhvZCBDaGVja1JlZmVyZW5jZXNcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZW1vdmUgcGVyc2lzdCBub2RlIHdoZW4gd2FudCB0byByZXN0YXJ0IHNjZW5lXHJcbiAgICBAbWV0aG9kIFJlbW92ZVBlcnNpc3ROb2RlXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFJlbW92ZVBlcnNpc3ROb2RlKCkge1xyXG4gICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlID0gbnVsbDtcclxuICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBnZXQgbmFtZSBvZiBjdXJyZW50IG9wZW5lZCBzY2VuZVxyXG4gICAgQG1ldGhvZCBnZXRTY2VuZU5hbWVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7c3RyaW5nfSBzY2VuZU5hbWVcclxuICAgICoqL1xyXG4gIGdldFNjZW5lTmFtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNjZW5lTmFtZTtcclxuICAgIHZhciBfc2NlbmVJbmZvcyA9IGNjLmdhbWUuX3NjZW5lSW5mb3M7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9zY2VuZUluZm9zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChfc2NlbmVJbmZvc1tpXS51dWlkID09IGNjLmRpcmVjdG9yLl9zY2VuZS5faWQpIHtcclxuICAgICAgICBzY2VuZU5hbWUgPSBfc2NlbmVJbmZvc1tpXS51cmw7XHJcbiAgICAgICAgc2NlbmVOYW1lID0gc2NlbmVOYW1lLnN1YnN0cmluZyhzY2VuZU5hbWUubGFzdEluZGV4T2YoXCIvXCIpICsgMSkubWF0Y2goL1teXFwuXSsvKVswXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNjZW5lTmFtZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIHNldCBcIlNob3dSb29tXCIgYm9vbCB2YWx1ZVxyXG4gICAgQG1ldGhvZCBUb2dnbGVTaG93Um9vbV9Cb29sXHJcbiAgICBAcGFyYW0ge2Jvb2xlYW59IF9zdGF0ZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAqKi9cclxuICBUb2dnbGVTaG93Um9vbV9Cb29sKF9zdGF0ZSkge1xyXG4gICAgU2hvd1Jvb20gPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBzZXQgXCJMZWF2ZVJvb21cIiBib29sIHZhbHVlXHJcbiAgICBAbWV0aG9kIFRvZ2dsZUxlYXZlUm9vbV9Cb29sXHJcbiAgICBAcGFyYW0ge2Jvb2xlYW59IF9zdGF0ZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAqKi9cclxuICBUb2dnbGVMZWF2ZVJvb21fQm9vbChfc3RhdGUpIHtcclxuICAgIHRoaXMuTGVhdmVSb29tID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBQaG90b24gXCJQaG90b25SZWZcIiBpbnN0YW5jZSBjcmVhdGVkIGJ5IG11bHRpcGxheWVyIGNsYXNzXHJcbiAgICBAbWV0aG9kIGdldFBob3RvblJlZlxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IFBob3RvblJlZlxyXG4gICAgKiovXHJcbiAgZ2V0UGhvdG9uUmVmKCkge1xyXG4gICAgcmV0dXJuIFBob3RvblJlZjtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgbXlBY3RvciBpbnN0YW5jZSBjcmVhdGVkIGJ5IHBob3RvblxyXG4gICAgQG1ldGhvZCBQaG90b25BY3RvclxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IEFjdG9yXHJcbiAgICAqKi9cclxuICBQaG90b25BY3RvcigpIHtcclxuICAgIHJldHVybiBQaG90b25SZWYubXlBY3RvcigpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBteVJvb21BY3RvcnNBcnJheSBjcmVhdGVkIGJ5IHBob3RvblxyXG4gICAgQG1ldGhvZCBSb29tQWN0b3JzXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gQWN0b3JcclxuICAgICoqL1xyXG4gIFJvb21BY3RvcnMoKSB7XHJcbiAgICByZXR1cm4gUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIGlzU3BlY3RhdGUgdmFyaWFibGUgZnJvbSBjdXN0b20gcHJvcGVydHkgb2YgY3VycmVudCBhY3RvclxyXG4gICAgQG1ldGhvZCBDaGVja1NwZWN0YXRlXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IGlzU3BlY3RhdGVcclxuICAgICoqL1xyXG4gIENoZWNrU3BlY3RhdGUoKSB7XHJcbiAgICByZXR1cm4gUGhvdG9uUmVmLm15QWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBJbml0aWFsaXplIHBob3RvbiB3aXRoIGFwcGlkLGFwcCB2ZXJzaW9uLCBXc3MgZXRjXHJcbiAgICBAbWV0aG9kIEluaXRpYWxpemVQaG90b25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgSW5pdGlhbGl6ZVBob3RvbigpIHtcclxuICAgIEFwcEluZm8uQXBwSWQgPSB0aGlzLlBob3RvbkFwcEluZm8uQXBwSUQ7XHJcbiAgICBBcHBJbmZvLkFwcFZlcnNpb24gPSB0aGlzLlBob3RvbkFwcEluZm8uQXBwVmVyc2lvbjtcclxuICAgIEFwcEluZm8uV3NzID0gdGhpcy5QaG90b25BcHBJbmZvLldzcztcclxuICAgIEFwcEluZm8uTWFzdGVyU2VydmVyID0gdGhpcy5QaG90b25BcHBJbmZvLk1hc3RlclNlcnZlcjtcclxuICAgIEFwcEluZm8uRmJBcHBJZCA9IHRoaXMuUGhvdG9uQXBwSW5mby5GYkFwcElEO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBjb25uZWN0aW9uIHJlcXVlc3QgdG8gcGhvdG9uXHJcbiAgICBAbWV0aG9kIFJlcXVlc3RDb25uZWN0aW9uXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFJlcXVlc3RDb25uZWN0aW9uKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSkgY29uc29sZS5sb2coXCJhbHJlYWR5IGNvbm5lY3RlZFwiKTtcclxuICAgIGVsc2UgUGhvdG9uUmVmLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tDb25uZWN0aW9uU3RhdGUoKSB7XHJcbiAgICB2YXIgX2Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgaWYgKFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5zdGF0ZSA9PSA3IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBjb25uZWN0ZWRcIik7XHJcbiAgICAgIF9jb25uZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5zdGF0ZSk7XHJcbiAgICByZXR1cm4gX2Nvbm5lY3RlZDtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IERpc2Nvbm5lY3QgZnJvbSBwaG90b25cclxuICAgIEBtZXRob2QgRGlzY29ubmVjdFBob3RvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBEaXNjb25uZWN0UGhvdG9uKCkge1xyXG4gICAgLy9pZiAoUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5zdGF0ZSA9PSA3IHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgIFBob3RvblJlZi5kaXNjb25uZWN0KCk7XHJcbiAgICB0aGlzLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgIC8vUGhvdG9uUmVmLmxlYXZlUm9vbSgpO1xyXG4gICAgdGhpcy5SZXNldFN0YXRlKCk7XHJcbiAgICAvLyAgfSBlbHNlIHtcclxuICAgIC8vICAgIGNvbnNvbGUubG9nKFwibm90IGluc2lkZSBhbnkgcm9vbSBvciBsb2JieSBvciBjb25uZWN0ZWQgdG8gcGhvdG9uXCIpO1xyXG4gIH0sXHJcbiAgLy8gfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXNldGluZyBmZXcgdmFsdWVzXHJcbiAgICBAbWV0aG9kIFJlc2V0U3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgUmVzZXRTdGF0ZSgpIHtcclxuICAgIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuTGVhdmVSb29tID0gZmFsc2U7XHJcbiAgICB0aGlzLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgIFNob3dSb29tID0gZmFsc2U7XHJcbiAgICBzdGF0ZVRleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5SZXNldFJvb21WYWx1ZXMoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIHJvb20gbmFtZSBnb3QgaW5wdXQgZnJvbSBnYW1lXHJcbiAgICBAbWV0aG9kIE9uUm9vbU5hbWVDaGFuZ2VcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgT25Sb29tTmFtZUNoYW5nZShuYW1lKSB7XHJcbiAgICB0aGlzLlJvb21OYW1lID0gbmFtZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIG1lc3NhZ2Ugd2luZG93IGdvdCBpbnB1dCBmcm9tIGdhbWVcclxuICAgIEBtZXRob2QgT25NZXNzYWdlQ2hhbmdlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbXNnXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgT25NZXNzYWdlQ2hhbmdlKG1zZykge1xyXG4gICAgdGhpcy5NZXNzYWdlID0gbXNnO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgdXBkYXRlIGN1c3RvbSByb29tIHByb3BlcnRpZXNcclxuICAgIEBtZXRob2QgVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXNcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyhfcGxheWVyVXBkYXRlID0gZmFsc2UsIF9wbGF5ZXJWYWx1ZSA9IDAsIF9pbml0aWFsU2V0dXBVcGRhdGUgPSBmYWxzZSwgX2luaXRpYWxTZXR1cFZhbHVlID0gZmFsc2UsIF9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSA9IGZhbHNlLCBfcGxheWVyR2FtZUluZm9WYWx1ZSA9IG51bGwsIF90dXJuTnVtYmVyVXBkYXRlID0gZmFsc2UsIF90dXJuTnVtYmVydmFsdWUgPSAwKSB7XHJcbiAgICBpZiAoX3BsYXllclVwZGF0ZSkgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyXCIsIF9wbGF5ZXJWYWx1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKF9pbml0aWFsU2V0dXBVcGRhdGUpIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLCBfaW5pdGlhbFNldHVwVmFsdWUsIHRydWUpO1xyXG5cclxuICAgIGlmIChfcGxheWVyR2FtZUluZm9VcGRhdGUpIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsIF9wbGF5ZXJHYW1lSW5mb1ZhbHVlLCB0cnVlKTtcclxuXHJcbiAgICBpZiAoX3R1cm5OdW1iZXJVcGRhdGUpIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgX3R1cm5OdW1iZXJ2YWx1ZSwgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjcmVhdGUgcm9vbSByZXF1ZXN0XHJcbiAgICBAbWV0aG9kIENyZWF0ZVJvb21cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgQ3JlYXRlUm9vbSgpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUgfHwgUGhvdG9uUmVmLnN0YXRlID09IDgpIHtcclxuICAgICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IGZhbHNlKSB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0gbmV3IFJvb21Qcm9wZXJ0eSgpO1xyXG4gICAgICAgIF9kYXRhLlBsYXllciA9IDA7XHJcblxyXG4gICAgICAgIHZhciByb29tT3B0aW9ucyA9IHtcclxuICAgICAgICAgIGlzVmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgIGlzT3BlbjogdHJ1ZSxcclxuICAgICAgICAgIG1heFBsYXllcnM6IHRoaXMuTWF4UGxheWVycyArIHRoaXMuTWF4U3BlY3RhdG9ycyxcclxuICAgICAgICAgIGN1c3RvbUdhbWVQcm9wZXJ0aWVzOiBfZGF0YSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7IElzU3BlY3RhdGU6IGZhbHNlIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tQ291bnRlclwiLCB7IENvdW50ZXI6IFRvdGFsVGltZXIgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG4gICAgICAgIHZhciBSb29tSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKTtcclxuXHJcbiAgICAgICAgUGhvdG9uUmVmLmNyZWF0ZVJvb20oXCJSb29tX1wiICsgUm9vbUlELCByb29tT3B0aW9ucyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgam9pbiByb29tIHJlcXVlc3QgYnkgbmFtZVxyXG4gICAgQG1ldGhvZCBKb2luUm9vbVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IF9yb29tTmFtZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEpvaW5Sb29tKF9yb29tTmFtZSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuc3RhdGUgPT0gOCkge1xyXG4gICAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gZmFsc2UgfHwgUGhvdG9uUmVmLnN0YXRlICE9IDgpIHtcclxuICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBpc1Zpc2libGU6IHRydWUsXHJcbiAgICAgICAgICBpc09wZW46IGZhbHNlLFxyXG4gICAgICAgICAgbWF4UGxheWVyczogdGhpcy5NYXhQbGF5ZXJzICsgdGhpcy5NYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgLy9cImN1c3RvbUdhbWVQcm9wZXJ0aWVzXCI6e1wiUm9vbUVzc2VudGlhbHNcIjoge0lzU3BlY3RhdGU6dHJ1ZX19XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwgeyBJc1NwZWN0YXRlOiB0cnVlIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tQ291bnRlclwiLCB7IENvdW50ZXI6IFRvdGFsVGltZXIgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG5cclxuICAgICAgICBQaG90b25SZWYuam9pblJvb20oX3Jvb21OYW1lLCByb29tT3B0aW9ucyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgam9pbiByYW5kb20gcm9vbVxyXG4gICAgQG1ldGhvZCBKb2luUmFuZG9tUm9vbVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBKb2luUmFuZG9tUm9vbSgpIHtcclxuICAgIGlmIChQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUgfHwgUGhvdG9uUmVmLnN0YXRlID09IDgpIHtcclxuICAgICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IGZhbHNlIHx8IFBob3RvblJlZi5zdGF0ZSAhPSA4KSB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0gbmV3IFJvb21Qcm9wZXJ0eSgpO1xyXG4gICAgICAgIF9kYXRhLlBsYXllciA9IDA7XHJcblxyXG4gICAgICAgIHZhciByb29tT3B0aW9ucyA9IHtcclxuICAgICAgICAgIC8vXCJleHBlY3RlZE1heFBsYXllcnNcIjp0aGlzLk1heFBsYXllcnMrTWF4U3BlY3RhdG9ycyxcclxuICAgICAgICAgIGV4cGVjdGVkQ3VzdG9tUm9vbVByb3BlcnRpZXM6IF9kYXRhLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHsgSXNTcGVjdGF0ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIsIHsgQ291bnRlcjogVG90YWxUaW1lciB9KTtcclxuICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcblxyXG4gICAgICAgIFBob3RvblJlZi5qb2luUmFuZG9tUm9vbShyb29tT3B0aW9ucyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGpvaW5lZCB0aGUgcm9vbVwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBjb25uZWN0ZWQgb3IgY29ubmVjdGlvbiBpcyBkcm9wcGVkLCBwbGVhc2UgY29ubmVjdCB0byBwaG90b24gYWdhaW4uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBjYXJkIGluZGV4IG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kQ2FyZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRDYXJkRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGNhcmQgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgQ2FyZERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGdhbWUgb3ZlciBjYWxsXHJcbiAgICBAbWV0aG9kIFNlbmRHYW1lT3ZlclxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZEdhbWVPdmVyKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZ2FtZSBvdmVyIGNhbGxcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDYsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kR2FtZU92ZXJEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZ2FtZSBvdmVyIGRhdGEgdG8gc3luY1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTYsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kU2VsZWN0ZWRQbGF5ZXJGb3JQcm9maXQoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBnYW1lIG92ZXIgZGF0YSB0byBzeW5jXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxNyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBiYWNrcnVwdCBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRCYW5rcnVwdERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRCYW5rcnVwdERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBiYW5rcnVwY3kgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgOSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBQbGF5ZXIgRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmREYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgcGxheWVyIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllckluZm86IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgb25lIHF1ZXN0aW9uIERhdGEgb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRPbmVRdWVzdGlvbkRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRPbmVRdWVzdGlvbkRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRPbmVRdWVzdGlvbkFycmF5cyhfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiBhcnJheXNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE4LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZERlY2tzQXJyYXlzKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZGVja3MgYXJyYXlzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxOSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmREZWNrc0FycmF5Q291bnRlcihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGRlY2tzIGFycmF5cyBjb3VudGVyc1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjAsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBwcm9maXQgb3IgbG9zcyB0byB5b3VyIHBhc3J0bmVyXHJcbiAgICBAbWV0aG9kIFNlbmRQYXJ0bmVyUHJvZml0TG9zc1xyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFBhcnRuZXJQcm9maXRMb3NzKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEzLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIG9uZSBxdWVzdGlvbiByZXNwb25zZSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gcmVzcG9uc2UgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgOCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBkaWNlIGRhdGFcclxuICAgIEBtZXRob2QgRGljZVJvbGxFdmVudFxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgRGljZVJvbGxFdmVudChfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGRpY2UgY291bnRcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERpY2VDb3VudDogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBnbyBiYWNrIHNwYWNlcyBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRHb0JhY2tTcGFjZURhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRHb0JhY2tTcGFjZURhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZCBnbyBiYWNrIHNwYWNlcyBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZGluZyBvcGVuIGludml0YXRpb24gdG8gYWxsIHBsYXllcnMgZm9yIHBhcnRuZXIgc2hpcFxyXG4gICAgQG1ldGhvZCBTZW5kUGFydG5lclNoaXBPZmZlckRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRQYXJ0bmVyU2hpcE9mZmVyRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBhcnRuZXIgc2hpcCBvZmZlclwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTEsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmRpbmcgcGFydG5lciBhbnN3ZXIgZGF0YSAoYWNjZXB0IG9yIHJlamVjdClcclxuICAgIEBtZXRob2QgU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBhcnRlbnJzaGlwIGFuc3dlciBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRJbmZvKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgaW5mb1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTUsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgdXNlciBpZCBvZiBwbGF5ZXIgdG8gYWxsIG90aGVyIHdobyBoYWQgY29tcGxldGVkIHRoZWlyIHR1cm5cclxuICAgIEBtZXRob2QgU3luY1R1cm5Db21wbGV0aW9uXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTeW5jVHVybkNvbXBsZXRpb24oX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyB0dXJuIGNvbXBsZXRpb24gZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgVUlEOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTdGFydCBUdXJuIGZvciBpbml0aWFsIHR1cm5cclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTdGFydFR1cm4oX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTdGFydGluZyBUdXJuXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBUdXJuTnVtYmVyOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZFRha2VCdXNpbmVzc0RhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTZW5kIFRha2UgQnVzaW5lc3MgRGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kRGFtYWdpbmdEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLnRyYWNlKFwiU2VuZCBwbGF5ZXIgcmVjZWl2ZWQgZGFtYWdpbmcgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjQsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kRGFtYWdpbmdEZWNpc2lvbkRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTZW5kIHBsYXllciByZWNlaXZlZCBkYW1hZ2luZyBkYXRhIGRlY2lzaW9uXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyNSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRCdXlIYWxmQnVzaW5lc3NEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLnRyYWNlKFwiU2VuZCBwbGF5ZXIgcmVjZWl2ZWQgZGFtYWdpbmcgZGF0YSBkZWNpc2lvblwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjYsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kQ29tcGFyZURpY2VEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLnRyYWNlKFwiU2VuZCBwbGF5ZXIgZGljZSB0byBjb21wYXJlXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyNyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRDb21wYXJlRGljZURhdGFEZWNpc2lvbihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlNlbmQgcGxheWVyIGRpY2UgdG8gY29tcGFyZSBkZWNpc29uXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyOCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRUVkFERGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlNlbmRUVkFERGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjksXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kVFZBRERhdGFWb3RlcyhfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS50cmFjZShcIlNlbmRUVkFERGF0YVZvdGVzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAzMCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2hvdyB0b2FzdCBtZXNzYWdlIG9uIHRoZSBjb25zb2xlXHJcbiAgICBAbWV0aG9kIFNob3dUb2FzdFxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgbWVzc2FnZSB0byBiZSBzaG93biBcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidG9hc3QgbWVzc2FnZTogXCIgKyBtc2cpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgUmVjZWl2ZSBldmVudCBmcm9tIHBob3RvbiByYWlzZSBvbiBcclxuICAgIEBtZXRob2QgQ2FsbFJlY2lldmVFdmVudFxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIENhbGxSZWNpZXZlRXZlbnQ6IGZ1bmN0aW9uIChfZXZlbnRDb2RlLCBfc2VuZGVyTmFtZSwgX3NlbmRlcklELCBfZGF0YSkge1xyXG4gICAgdmFyIEluc3RhbmNlTnVsbCA9IHRydWU7XHJcblxyXG4gICAgLy90byBjaGVjayBpZiBpbnN0YW5jZSBpcyBudWxsIGluIGNhc2UgY2xhc3MgaW5zdGFuY2UgaXMgbm90IGxvYWRlZCBhbmQgaXRzIHJlY2VpdmVzIGNhbGxiYWNrXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkgPT0gbnVsbCkge1xyXG4gICAgICBJbnN0YW5jZU51bGwgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkNhbGxSZWNpZXZlRXZlbnQoX2V2ZW50Q29kZSwgX3NlbmRlck5hbWUsIF9zZW5kZXJJRCwgX2RhdGEpO1xyXG4gICAgICB9LCA1MCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnN0YW5jZU51bGwgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIF9zZW5kZXJOYW1lLCBfc2VuZGVySUQsIF9kYXRhKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBEaXNjb25uZWN0RGF0YSgpIHtcclxuICAgIEdhbWVGaW5pc2hlZCA9IHRydWU7XHJcbiAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gIH0sXHJcblxyXG4gIFJlc3RhcnRHYW1lKF90aW1lciA9IDApIHtcclxuICAgIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgVGltZW91dHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0c1tpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgIH0sIF90aW1lcik7XHJcbiAgICAvLyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKClcclxuICB9LFxyXG5cclxuICBDaGVja01hc3RlckNsaWVudChfaWQpIHtcclxuICAgIHZhciBfaXNNYXN0ZXIgPSBmYWxzZTtcclxuICAgIGlmIChQaG90b25SZWYubXlSb29tTWFzdGVyQWN0b3JOcigpID09IF9pZCAmJiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgPT0gX2lkKSB7XHJcbiAgICAgIF9pc01hc3RlciA9IHRydWU7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUuZXJyb3IoX2lzTWFzdGVyKTtcclxuICAgIHJldHVybiBfaXNNYXN0ZXI7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCkge1xyXG4gICAgdmFyIF9pc01hc3RlciA9IGZhbHNlO1xyXG4gICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciA9PSBQaG90b25SZWYubXlSb29tTWFzdGVyQWN0b3JOcigpKSB7XHJcbiAgICAgIF9pc01hc3RlciA9IHRydWU7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jb25zb2xlLmVycm9yKF9pc01hc3Rlcik7XHJcbiAgICByZXR1cm4gX2lzTWFzdGVyO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0Um9vbVZhbHVlcygpIHtcclxuICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBJc01hc3RlckNsaWVudCA9IGZhbHNlO1xyXG4gICAgICBUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIH0sIDEwMDApO1xyXG4gIH0sXHJcblxyXG4gIEdldFJlYWxBY3RvcnMoKSB7XHJcbiAgICB2YXIgX3JlYWxQbGF5ZXIgPSAwO1xyXG4gICAgdmFyIEFsbFBsYXllcnMgPSBQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBbGxQbGF5ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoQWxsUGxheWVyc1tpbmRleF0uZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICBfcmVhbFBsYXllcisrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3JlYWxQbGF5ZXI7XHJcbiAgfSxcclxuXHJcbiAgUm9vbUNvdW50ZXIoX3RpbWVyKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICAgIHZhciBfZGF0YSA9IG51bGw7XHJcbiAgICBTY2hlZHVsYXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKElzTWFzdGVyQ2xpZW50KSB7XHJcbiAgICAgICAgaWYgKF90aW1lciA+IDApIHtcclxuICAgICAgICAgIF90aW1lci0tO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coX3RpbWVyKTtcclxuICAgICAgICAgIHRoaXMuUm9vbUNvdW50ZXIoX3RpbWVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcInRpbWVyIGNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgIGlmICh0aGlzLkdldFJlYWxBY3RvcnMoKSA+IDEpIHtcclxuICAgICAgICAgICAgLy9pZiBoYXMgbW9yZSB0aGFuIG9uZSBwbGF5ZXIgc3RhcnQgcmVhbCBnYW1lXHJcbiAgICAgICAgICAgIHRoaXMuU2VuZFJvb21Db21wbGV0ZWREYXRhKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJObyBvbmxpbmUgcGxheWVyIHdhcyBmb3VuZCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlclwiKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5FeGl0Q29ubmVjdGluZygpO1xyXG5cclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlRvZ2dsZU1vZGVTZWxlY3Rpb24oMSk7XHJcbiAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Ub2dnbGVTaG93Um9vbV9Cb29sKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzID0gMjtcclxuICAgICAgICAgICAgLy8gY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInBsYXllcnMgZm91bmRcIik7XHJcbiAgICAgICAgICAgIC8vIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJzdGFydGluZyBnYW1lLi4uXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Kb2luZWRSb29tID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgICAgIC8vIH0sIDEwMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICAgICAgfVxyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJUaW1lcigpIHtcclxuICAgIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgLy9fdGltZXIgPSAwO1xyXG4gICAgY2xlYXJUaW1lb3V0KFNjaGVkdWxhcik7XHJcbiAgfSxcclxuXHJcbiAgUHJvY2Vzc0NvdW50ZXIoKSB7XHJcbiAgICB2YXIgX21hc3RlciA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoKTtcclxuICAgIGlmIChfbWFzdGVyKSB7XHJcbiAgICAgIGlmICghVGltZXJTdGFydGVkKSB7XHJcbiAgICAgICAgVGltZXJTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICB2YXIgX2NvdW50ZXIgPSBQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIilbXCJDb3VudGVyXCJdO1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Sb29tQ291bnRlcihfY291bnRlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgcm9vbSBjb21wbGV0ZWQgZGF0YVxyXG4gICAgQG1ldGhvZCBTZW5kUm9vbUNvbXBsZXRlZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRSb29tQ29tcGxldGVkRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIFJvb21Db21wbGV0ZWREYXRhXCIpO1xyXG4gICAgICAvLyAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTQsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kQ2FzaERlZHVjdERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBTZW5kQ2FzaERlZHVjdERhdGFcIik7XHJcbiAgICAgIC8vICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyMSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRDYXNoQWRkaXRpb25EYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgU2VuZENhc2hBZGRpdGlvbkRhdGFcIik7XHJcbiAgICAgIC8vICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyMixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJvb21Db21wbGV0ZWQoKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX3JlYWxQbGF5ZXIgPSB0aGlzLkdldFJlYWxBY3RvcnMoKTtcclxuICAgICAgSXNHYW1lU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzID0gX3JlYWxQbGF5ZXI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHJlcXVpcmVkIHBsYXllcnMgam9pbmVkLCBzdGFydGluZyB0aGUgZ2FtZS4uXCIpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwicGxheWVycyBmb3VuZFwiKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gdHJ1ZTtcclxuICAgICAgVGltZW91dHMucHVzaChcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0cnVlLCB0cnVlLCBcIkdhbWVQbGF5XCIpO1xyXG4gICAgICAgIH0sIDEwMDApXHJcbiAgICAgICk7IC8vZnVuY3Rpb24gaW4gdWkgbWFuYWdlclxyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXModHJ1ZSwgX3JlYWxQbGF5ZXIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIG51bGwsIGZhbHNlLCAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBVcGRhdGVBY3RvckFjdGl2ZURhdGEoX2FjdG9yKSB7XHJcbiAgICB2YXIgX2FjdG9yc0FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgdmFyIF9kYXRhID0gbnVsbDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIF9kYXRhID0gX2FjdG9yc0FycmF5W2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICBpZiAoX2RhdGEuUGxheWVyVUlEID09IF9hY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgX2RhdGEuSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX2RhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJ1cGRhdGluZyBhY3RpdmUgc3RhdHVzIG9mIHRoZSBwbGF5ZXIgd2hvIGhhcyBsZWZ0Li4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXCIpO1xyXG4gICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICB9LFxyXG5cclxuICBIYW5kbGVQbGF5ZXJMZWF2ZShhY3RvciA9IG51bGwsIFBob3RvblJlZmVyZWNlID0gbnVsbCwgX21hbmFnZXIgPSBudWxsLCBfcGxheWVyVHVybiA9IDAsIF9pbml0aWFsU2V0dXBEb25lID0gZmFsc2UsIF9pc1NwZWN0YXRlID0gZmFsc2UpIHtcclxuICAgIGlmIChfaW5pdGlhbFNldHVwRG9uZSkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQgPT0gYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlQWN0b3JBY3RpdmVEYXRhKGFjdG9yKTtcclxuICAgICAgICAgIGlmICghX2lzU3BlY3RhdGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbGVmdDogXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuUmVtb3ZlRnJvbUNoZWNrQXJyYXkoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuQ2hlY2tUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgaWYgKF9wbGF5ZXJUdXJuID09IGluZGV4ICYmIFBob3RvblJlZmVyZWNlLm15QWN0b3IoKS5hY3Rvck5yID09IFBob3RvblJlZmVyZWNlLm15Um9vbU1hc3RlckFjdG9yTnIoKSkge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLkNoYW5nZVR1cm5Gb3JjZWZ1bGx5KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2UgdHVybiBmb3JjZWZ1bGx5XCIpO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNldFBsYXllckxlZnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJlc2V0U29tZVZhbHVlcygpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gX3VJTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTAwMCk7XHJcbiAgICAgIHZhciBfcGxheWVyZm91bmQgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm8uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzLS07XHJcbiAgICAgICAgICBfcGxheWVyZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZUFjdG9yQWN0aXZlRGF0YShhY3Rvcik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghX3BsYXllcmZvdW5kKSB7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMtLTtcclxuICAgICAgICBpZiAoIV9pc1NwZWN0YXRlKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3luY0RhdGEobnVsbCwgYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhfbWFuYWdlci5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vY2FsbGVkIGV2ZXJ5IGZyYW1lXHJcbiAgdXBkYXRlKGR0KSB7XHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBzb21lIGNoYW5nZSBpbiBjb25uZWN0aW9uIHN0YXRlXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25TdGF0ZUNoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gc3RhdGVcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25TdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xyXG4gICAgICAvLyNyZWdpb24gQ29ubmVjdGlvbiBTdGF0ZXNcclxuICAgICAgLy9zdGF0ZSAxIDogY29ubmVjdGluZ1RvTmFtZVNlcnZlclxyXG4gICAgICAvL1N0YXRlIDIgOiBDb25uZWN0ZWRUb05hbWVTZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSAzIDogQ29ubmVjdGluZ1RvTWFzdGVyU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgNCA6IENvbm5lY3RlZFRvTWFzdGVyU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgNTogIEpvaW5lZExvYmJ5XHJcbiAgICAgIC8vU3RhdGUgNiA6IENvbm5lY3RpbmdUb0dhbWVzZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSA3IDogQ29ubmVjdGVkVG9HYW1lc2VydmVyXHJcbiAgICAgIC8vU3RhdGUgOCA6IEpvaW5lZFxyXG4gICAgICAvL1N0YXRlIDEwOiBEaXNjb25uZWN0ZWRcclxuICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICB2YXIgTEJDID0gUGhvdG9uLkxvYWRCYWxhbmNpbmcuTG9hZEJhbGFuY2luZ0NsaWVudDtcclxuICAgICAgY29uc29sZS5sb2coXCJTdGF0ZUNvZGU6IFwiICsgc3RhdGUgKyBcIiBcIiArIExCQy5TdGF0ZVRvTmFtZShzdGF0ZSkpO1xyXG5cclxuICAgICAgaWYgKHN0YXRlID09IDEpIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJjb25uZWN0aW5nIHRvIHNlcnZlci4uLlwiKTtcclxuICAgICAgZWxzZSBpZiAoc3RhdGUgPT0gNCkgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcImNvbm5lY3RlZCB0byBzZXJ2ZXJcIik7XHJcbiAgICAgIGVsc2UgaWYgKHN0YXRlID09IDUpIHtcclxuICAgICAgICAvL2hhcyBqb2luZWQgbG9iYnlcclxuICAgICAgICBpZiAoU2hvd1Jvb20gPT0gZmFsc2UpIHtcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJ3YWl0aW5nIGZvciBvdGhlciBwbGF5ZXJzLi4uXCIpO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5SYW5kb21Sb29tKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChTaG93Um9vbSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic2hvd2luZyByb29tcyBsaXN0Li4uXCIpO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBkZWJ1Z1xyXG4gICAgICAgICAgICBAbWV0aG9kIGRlYnVnXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5kZWJ1ZyA9IGZ1bmN0aW9uIChtZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGluZm9cclxuICAgICAgICAgICAgQG1ldGhvZCBpbmZvXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuaW5mbyA9IGZ1bmN0aW9uIChtZXNzLCBwYXJhbSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzICsgcGFyYW0pO1xyXG4gICAgICBzdGF0ZVRleHQgKz0gbWVzcyArIFwiIFwiICsgcGFyYW0gKyBcIlxcblwiO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHdhcm5cclxuICAgICAgICAgICAgQG1ldGhvZCB3YXJuXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTFcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtMlxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci53YXJuID0gZnVuY3Rpb24gKG1lc3MsIHBhcmFtMSwgcGFyYW0yLCBwYXJhbTMpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyArIFwiIFwiICsgcGFyYW0xICsgXCIgXCIgKyBwYXJhbTIgKyBcIiBcIiArIHBhcmFtMyk7XHJcblxyXG4gICAgICBpZiAocGFyYW0xID09IDIyNSkge1xyXG4gICAgICAgIC8vbm8gcm9vbSBmb3VuZFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibm8gcmFuZG9tIHJvb20gd2FzIGZvdW5kLCBjcmVhdGluZyBvbmVcIik7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNyZWF0ZVJvb20oKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmFtMSA9PSAyMjYpIHtcclxuICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJSb29tIGRvZXMgbm90IGV4aXN0cyBhbnltb3JlLHBsZWFzZSB0cnkgYWdhaW4gYnkgZXhpdGluZy5cIik7XHJcbiAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2xlYXJUaW1lcigpO1xyXG4gICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlNldENvbm5ldGluZyhmYWxzZSk7XHJcbiAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvL3Jvb20gZG9lcyBub3QgZXhpc3RzIG9yIGlzIGZ1bGxcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJSb29tIGlzIGZ1bGwsIHBsZWFzZSBzZWxlY3QgYW55IG90aGVyIHJvb20gdG8gc3BlY3RhdGUuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGVycm9yXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXJyb3JcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5lcnJvciA9IGZ1bmN0aW9uIChtZXNzLCBwYXJhbSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBleGNlcHRpb25cclxuICAgICAgICAgICAgQG1ldGhvZCBleGNlcHRpb25cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYubG9nZ2VyLmV4Y2VwdGlvbiA9IGZ1bmN0aW9uIChtZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHNvbWUgZm9ybWF0XHJcbiAgICAgICAgICAgIEBtZXRob2QgZm9ybWF0XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5mb3JtYXQgPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgcGxheWVyIGpvaW5zIGxvYmJ5XHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Sb29tTGlzdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Sb29tTGlzdCA9IGZ1bmN0aW9uIChyb29tcykge1xyXG4gICAgICBzdGF0ZVRleHQgKz0gXCJcXG5cIiArIFwiUm9vbXMgTGlzdDpcIiArIFwiXFxuXCI7XHJcblxyXG4gICAgICBpZiAocm9vbXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICBzdGF0ZVRleHQgKz0gXCJObyByb29tcyBpbiBsb2JieS5cIiArIFwiXFxuXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5SZXNldFJvb21MaXN0KCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkocm9vbXNbaV0ubmFtZSwgcm9vbXNbaV0ucGxheWVyQ291bnQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJSb29tIG5hbWU6IFwiICsgcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICBzdGF0ZVRleHQgKz0gXCJSb29tOiBcIiArIHJvb21zW2ldLm5hbWUgKyBcIlxcblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBjaGFuZ2UgaW4gcm9vbXMgbGlzdCAocm9vbSBhZGRlZCx1cGRhdGVkLHJlbW92ZWQgZXRjKVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RVcGRhdGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1VwZGF0ZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zQWRkZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zUmVtb3ZlZFxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vblJvb21MaXN0VXBkYXRlID0gZnVuY3Rpb24gKHJvb21zLCByb29tc1VwZGF0ZWQsIHJvb21zQWRkZWQsIHJvb21zUmVtb3ZlZCkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlJlc2V0Um9vbUxpc3QoKTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUsIHJvb21zW2ldLnBsYXllckNvdW50KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJvb20gbmFtZTogXCIgKyByb29tc1tpXS5uYW1lKTtcclxuICAgICAgICBzdGF0ZVRleHQgKz0gXCJSb29tOiBcIiArIHJvb21zW2ldLm5hbWUgKyBcIlxcblwiO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiUm9vbXMgTGlzdCB1cGRhdGVkOiBcIiArIHJvb21zVXBkYXRlZC5sZW5ndGggKyBcIiB1cGRhdGVkLCBcIiArIHJvb21zQWRkZWQubGVuZ3RoICsgXCIgYWRkZWQsIFwiICsgcm9vbXNSZW1vdmVkLmxlbmd0aCArIFwiIHJlbW92ZWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgbG9jYWxseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBqb2lucyByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Kb2luUm9vbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkpvaW5Sb29tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyNyZWdpb24gTG9ncyBmb3IgZ2FtZVxyXG4gICAgICBjb25zb2xlLmxvZyhcIkdhbWUgXCIgKyB0aGlzLm15Um9vbSgpLm5hbWUgKyBcIiBqb2luZWRcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teUFjdG9yKCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpWzBdLmxvYWRCYWxhbmNpbmdDbGllbnQudXNlcklkKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpLl9jdXN0b21Qcm9wZXJ0aWVzKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSk7XHJcbiAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIHdobyBqb2luZWQgaXMgc3BlY3RhdGVcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTtcclxuICAgICAgICB9LCAxMDAwKTsgLy9mdW5jdGlvbiBpbiBVSU1hbmFnZXJcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5FeGl0Q29ubmVjdGluZykge1xyXG4gICAgICAvLyAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DbGVhclRpbWVyKCk7XHJcbiAgICAgIC8vICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlNldENvbm5ldGluZyhmYWxzZSk7XHJcbiAgICAgIC8vICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAvLyAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlByb2Nlc3NDb3VudGVyKCk7XHJcbiAgICAgICAgLy99XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBqb2lucyByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckpvaW5cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgKFBob3RvblJlZi5vbkFjdG9ySm9pbiA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICB2YXIgX3JlYWxQbGF5ZXIgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuR2V0UmVhbEFjdG9ycygpO1xyXG5cclxuICAgICAgaWYgKF9yZWFsUGxheWVyID09IE1heFN0dWRlbnRzKSB7XHJcbiAgICAgICAgLy93aGVuIG1heCBwbGF5ZXIgcmVxdWlyZWQgdG8gc3RhcnQgZ2FtZSBoYXMgYmVlbiBhZGRlZFxyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFJvb21WYWx1ZXMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCByZXF1aXJlZCBwbGF5ZXJzIGpvaW5lZCwgc3RhcnRpbmcgdGhlIGdhbWUuLlwiKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwicGxheWVycyBmb3VuZFwiKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTtcclxuICAgICAgICB9LCAxMDAwKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKHRydWUsIFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksIGZhbHNlLCBmYWxzZSwgZmFsc2UsIG51bGwsIGZhbHNlLCAwKTtcclxuICAgICAgICAvL1Bob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclwiLFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksdHJ1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoYWN0b3IuYWN0b3JOcik7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgam9pbmVkXCIpO1xyXG4gICAgICAvLyBjb25zb2xlLmVycm9yKFwiVG90YWwgUGxheWVyczogXCIrUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKSk7XHJcbiAgICB9KSxcclxuICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBsZWF2ZXMgYSByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckxlYXZlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgICAgKFBob3RvblJlZi5vbkFjdG9yTGVhdmUgPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgICBpZiAoIUdhbWVGaW5pc2hlZCAmJiAhUmVzdGFydFNwZWN0YXRlKSB7XHJcbiAgICAgICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoIWFjdG9yLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICBpZiAoIU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5MZWF2ZVJvb20pIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzcGVjdGF0b3IgbGVmdCwgc28gZG9udCBtaW5kLCBjb250IGdhbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgbGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBQaG90b25SZWZlcmVjZSA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5nZXRQaG90b25SZWYoKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJUdXJuID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICB2YXIgX3VJR2FtZU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICB2YXIgX3JlYWxQbGF5ZXIgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuR2V0UmVhbEFjdG9ycygpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgX2luaXRpYWxTZXR1cERvbmUgPSBQaG90b25SZWZlcmVjZS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfcmVhbFBsYXllciA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5IYW5kbGVQbGF5ZXJMZWF2ZShhY3RvciwgUGhvdG9uUmVmZXJlY2UsIF9tYW5hZ2VyLCBfcGxheWVyVHVybiwgX2luaXRpYWxTZXR1cERvbmUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfdUlHYW1lTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdUlHYW1lTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTE1MCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX2luaXRpYWxTZXR1cERvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZUFjdG9yQWN0aXZlRGF0YShhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuR2FtZU92ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3VJR2FtZU1hbmFnZXIpIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXN0YXJ0R2FtZSgxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzdGFydEdhbWUoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKF91SUdhbWVNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF91SUdhbWVNYW5hZ2VyLlNob3dUb2FzdChcInBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAxMTUwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuZ2V0U2NlbmVOYW1lKCkgPT0gXCJHYW1lUGxheVwiKSAvL2lmIHNjZW5lIGlzIGdhbWVwbGF5IGxldCBwbGF5ZXIgZmluaXNoIGdhbWUgZm9yY2VmdWxseVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwib3RoZXIgcGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDIwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3VJR2FtZU1hbmFnZXIuU2hvd1RvYXN0KFwicGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDExNTAsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9yZWFsUGxheWVyID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkhhbmRsZVBsYXllckxlYXZlKGFjdG9yLCBQaG90b25SZWZlcmVjZSwgX21hbmFnZXIsIF9wbGF5ZXJUdXJuLCBfaW5pdGlhbFNldHVwRG9uZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfaW5pdGlhbFNldHVwRG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5HYW1lT3Zlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIGhhcyBsZWZ0XCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coSXNHYW1lU3RhcnRlZCk7XHJcbiAgICAgICAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSAmJiAhSXNHYW1lU3RhcnRlZCkge1xyXG4gICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Qcm9jZXNzQ291bnRlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCkgPT0gMSAmJiAhUmVzdGFydFNwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBSZXN0YXJ0U3BlY3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc3RhcnRHYW1lKDE1MDApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInJlYXRydGVkXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBvd24gcHJvcGVydGllcyBnb3QgY2hhbmdlZFxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkFjdG9yUHJvcGVydGllc0NoYW5nZSA9IGZ1bmN0aW9uIChhY3Rvcikge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciByb29tIHByb3BlcnRpZXMgZ290IGNoYW5nZWRcclxuICAgICAgICAgICAgQG1ldGhvZCBvbk15Um9vbVByb3BlcnRpZXNDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uTXlSb29tUHJvcGVydGllc0NoYW5nZSA9IGZ1bmN0aW9uIChfZGF0YSkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHRvIGhhbmRsZSBlcnJvcnNcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvckNvZGVcclxuICAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1zZ1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkVycm9yID0gZnVuY3Rpb24gKGVycm9yQ29kZSwgZXJyb3JNc2cpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciBcIiArIGVycm9yQ29kZSArIFwiOiBcIiArIGVycm9yTXNnKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgYW4gZXZlbnQgaXMgcmVjZWl2ZWQgd2l0aCBzb21lIGRhdGFcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkV2ZW50XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBjb2RlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBjb250ZW50XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3Rvck5yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uRXZlbnQgPSBmdW5jdGlvbiAoY29kZSwgY29udGVudCwgYWN0b3JOcikge1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIHN3aXRjaCAoY29kZSkge1xyXG4gICAgICAgIGNhc2UgMTogLy9yZWNldmluZyBwbGF5ZXJkYXRhIGluZm9cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgUGxheWVySW5mb0RhdGEgPSBjb250ZW50LlBsYXllckluZm87XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIFBsYXllckluZm9EYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6IC8vc3RhcnQgdHVybiByYWlzZSBldmVudFxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBzdGFydCB0dXJuIGV2ZW50XCIpO1xyXG4gICAgICAgICAgdmFyIF9UdXJuID0gY29udGVudC5UdXJuTnVtYmVyO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDIsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfVHVybik7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOiAvLyBkaWNlIGNvdW50XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRpY2UgY291bnRcIik7XHJcbiAgICAgICAgICB2YXIgX2RpY2UgPSBjb250ZW50LkRpY2VDb3VudDtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgzLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RpY2UpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDogLy9yZWNlaW5nIHVzZXIgaWQgb2YgcGxheWVyIHdobyBoYXMgY29tcGxldGVkIHR1cm5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIHR1cm4gY29tcGxldGVkXCIpO1xyXG4gICAgICAgICAgdmFyIF9JRCA9IGNvbnRlbnQuVUlEO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDQsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfSUQpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTogLy9yZWNlaXZpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBjYXJkIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2NhcmQgPSBjb250ZW50LkNhcmREYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDUsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfY2FyZCk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OiAvL3JlY2VpdmUgZ2FtZSBvdmVyIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZ2FtZSBvdmVyIGNhbGxcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6IC8vcmVjZWl2ZSBvbmUgUXVlc3Rpb24gZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg3LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgODogLy9yZWNlaXZlIG9uZSBRdWVzdGlvbiByZXNwb25zZSBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIG9uZSBxdWVzdGlvIHJlc3BvbnNlIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoOCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDk6IC8vcmVjZWl2ZSBiYW5rcnVwdCBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGJhbmtydXB0IGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoOSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEwOiAvL3JlY2VpdmUgYmFja3NwYWNlIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgYmFja3NwYWNlIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTAsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMTogLy9yZWNlaXZlaW5nIHBhcnRuZXJzaGlwIG9mZmVyXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTEsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMjogLy9yZWNlaXZlaW5nIHBhcnRuZXJzaGlwIGFuc3dlciBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEyLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTM6IC8vcmVjZWl2aW5nIHByb2ZpdC9sb3NzIGRhdGEgZm9yIHBhcnRuZXJcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgYW53c2VyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTMsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNDogLy9yZWNlaXZpbmcgcm9vbSBjb21wbGV0ZSBkYXRhIHRvIHN0YXJ0IEdhbWVcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgYW53c2VyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJvb21Db21wbGV0ZWQoKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE1OiAvL3JlY2VpdmluZyBwYXlkYXkgaW5mb1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBpbmZvXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE1LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTY6IC8vcmVjZWl2aW5nIGdhbWUgb3ZlciBkYXRhIHRvIHN5bmNcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZ2FtZSBvdmVyIHN5bmMgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxNiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE3OiAvL3JlY2VpdmluZyBkYXRhIG9mIHBsYXllciB0byBnZXQgYWxsIHByb2ZpdCBuZXh0IHBheSBkYXlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGF0YSBvZiBwbGF5ZXIgdG8gZ2V0IGFsbCBwcm9maXQgbmV4dCBwYXkgZGF5XCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE3LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTg6IC8vcmVjZWl2aW5nIG9uZSBxdWVzdGlvbiBhcnJheVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkYXRhIGZvciBvbmUgcXVlc3Rpb24gYXJyYXlcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTgsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOTogLy9yZWNlaXZpbmcgZGVja3MgYXJyYXlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGF0YSBmb3IgZGVja3MgYXJyYXlcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTksIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyMDogLy9yZWNlaXZpbmcgZGVja3MgYXJyYXkgQ291bnRlclxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkYXRhIGZvciBkZWNrcyBhcnJheSBjb3VudGVyXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDIwLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjE6IC8vcmVjZWl2aW5nIGNhc2ggZGVkdWN0IGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgY2FzaCBkZWR1Y3QgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyMSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAyMjogLy9yZWNlaXZpbmcgY2FzaCBhZGQgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBjYXNoIGFkZCBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDIyLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjM6IC8vcmVjZWl2aW5nIHRha2Ugb3ZlciBidXNpbmVzcyBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmluZyB0YWtlIG92ZXIgYnVzaW5lc3MgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyMywgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI0OiAvL3JlY2VpdmluZyBkYW1hZ2luZyBpbmZvcm1hdGlvblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZpbmcgZGFtYWdpbmcgaW5mb3JtYXRpb25cIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjQsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyNTogLy9yZWNlaXZpbmcgZGFtYWdpbmcgaW5mb3JtYXRpb25cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2aW5nIGRhbWFnaW5nIGluZm9ybWF0aW9uIERlY2lzb25cIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjUsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyNjogLy9yZWNlaXZpbmcgYnV5IGhhbGYgYnVzaW5lc3MgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZpbmcgYnV5IGhhbGYgYnVzaW5lc3MgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyNiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI3OiAvL3JlY2VpdmluZyBkaWNlIGNvbXBhcmUgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZpbmcgZGljZSBjb21wYXJlIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjcsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgMjg6IC8vcmVjZWl2aW5nIGRpY2UgY29tcGFyZSBkYXRhIGRlY2lzb25cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2aW5nIGRpY2UgY29tcGFyZSBkYXRhIGRlY2lzb25cIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMjgsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOTogLy9yZWNlaXZpbmcgVFYgYWQgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZpbmcgVFYgYWQgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyOSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDMwOiAvL3JlY2VpdmluZyBUViBhZCBkYXRhIHZvdGVzXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmluZyBUViBhZCBkYXRhIHZvdGVzXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDMwLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxheWVyQ29udHJvbGxlcjtcclxuIl19