
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJHYW1lRmluaXNoZWQiLCJJc01hc3RlckNsaWVudCIsIlRvdGFsVGltZXIiLCJUaW1lclN0YXJ0ZWQiLCJTY2hlZHVsYXIiLCJNYXhTdHVkZW50cyIsIlJlc3RhcnRTcGVjdGF0ZSIsIklzR2FtZVN0YXJ0ZWQiLCJUaW1lb3V0cyIsIlJvb21Qcm9wZXJ0eSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllciIsInR5cGUiLCJJbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiSW5pdGlhbFNldHVwIiwiQm9vbGVhbiIsIlBsYXllckdhbWVJbmZvIiwiVGV4dCIsIlR1cm5OdW1iZXIiLCJBcHBfSW5mbyIsIkFwcElEIiwidG9vbHRpcCIsIkFwcFZlcnNpb24iLCJXc3MiLCJkaXNwbGF5TmFtZSIsIk1hc3RlclNlcnZlciIsIkZiQXBwSUQiLCJNdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDb21wb25lbnQiLCJQaG90b25BcHBJbmZvIiwiTWF4UGxheWVycyIsIk1heFNwZWN0YXRvcnMiLCJNb2RlU2VsZWN0aW9uIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwiUmVzZXRSb29tVmFsdWVzIiwib25Mb2FkIiwiRXhpdENvbm5lY3RpbmciLCJJbml0X011bHRpcGxheWVyQ29udHJvbGxlciIsIlRvZ2dsZU1vZGVTZWxlY3Rpb24iLCJfdmFsIiwiU2V0Q29ubmV0aW5nIiwiX3N0YXRlIiwiR2V0QWN0aXZlU3RhdHVzIiwiX3VJRCIsIl9pc0FjdGl2ZSIsIl9hcnJheSIsIkdldF9HYW1lTWFuYWdlciIsImluZGV4IiwibGVuZ3RoIiwiUGxheWVyVUlEIiwiSXNBY3RpdmUiLCJHZXRTZWxlY3RlZE1vZGUiLCJnYW1lIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIkluaXRpYWxpemVQaG90b24iLCJjb25zb2xlIiwibG9nIiwiQXBwSW5mbyIsIkRlbW9Mb2FkQmFsYW5jaW5nIiwiTGVhdmVSb29tIiwiUm9vbU5hbWUiLCJNZXNzYWdlIiwiSm9pbmVkUm9vbSIsIkNoZWNrUmVmZXJlbmNlcyIsInJlcXVpcmUiLCJSZW1vdmVQZXJzaXN0Tm9kZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsImdldFNjZW5lTmFtZSIsInNjZW5lTmFtZSIsIl9zY2VuZUluZm9zIiwiaSIsInV1aWQiLCJkaXJlY3RvciIsIl9zY2VuZSIsIl9pZCIsInVybCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibWF0Y2giLCJUb2dnbGVTaG93Um9vbV9Cb29sIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJnZXRQaG90b25SZWYiLCJQaG90b25BY3RvciIsIm15QWN0b3IiLCJSb29tQWN0b3JzIiwibXlSb29tQWN0b3JzQXJyYXkiLCJDaGVja1NwZWN0YXRlIiwiY3VzdG9tUHJvcGVydGllcyIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIkFwcElkIiwiRmJBcHBJZCIsIlJlcXVlc3RDb25uZWN0aW9uIiwic3RhdGUiLCJpc0Nvbm5lY3RlZFRvTWFzdGVyIiwiaXNJbkxvYmJ5Iiwic3RhcnQiLCJDaGVja0Nvbm5lY3Rpb25TdGF0ZSIsIl9jb25uZWN0ZWQiLCJpc0pvaW5lZFRvUm9vbSIsIkRpc2Nvbm5lY3RQaG90b24iLCJkaXNjb25uZWN0IiwiUmVzZXRTdGF0ZSIsIk9uUm9vbU5hbWVDaGFuZ2UiLCJPbk1lc3NhZ2VDaGFuZ2UiLCJtc2ciLCJVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlcyIsIl9wbGF5ZXJVcGRhdGUiLCJfcGxheWVyVmFsdWUiLCJfaW5pdGlhbFNldHVwVXBkYXRlIiwiX2luaXRpYWxTZXR1cFZhbHVlIiwiX3BsYXllckdhbWVJbmZvVXBkYXRlIiwiX3BsYXllckdhbWVJbmZvVmFsdWUiLCJfdHVybk51bWJlclVwZGF0ZSIsIl90dXJuTnVtYmVydmFsdWUiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNyZWF0ZVJvb20iLCJfZGF0YSIsInJvb21PcHRpb25zIiwiaXNWaXNpYmxlIiwiaXNPcGVuIiwibWF4UGxheWVycyIsImN1c3RvbUdhbWVQcm9wZXJ0aWVzIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU3R1ZGVudERhdGEiLCJDb3VudGVyIiwic2V0VXNlcklkIiwidXNlcklEIiwiUm9vbUlEIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiRGF0ZSIsIm5vdyIsImNyZWF0ZVJvb20iLCJKb2luUm9vbSIsIl9yb29tTmFtZSIsImpvaW5Sb29tIiwiSm9pblJhbmRvbVJvb20iLCJleHBlY3RlZEN1c3RvbVJvb21Qcm9wZXJ0aWVzIiwiam9pblJhbmRvbVJvb20iLCJTZW5kQ2FyZERhdGEiLCJyYWlzZUV2ZW50IiwiQ2FyZERhdGEiLCJzZW5kZXJOYW1lIiwic2VuZGVySUQiLCJhY3Rvck5yIiwicmVjZWl2ZXJzIiwiUGhvdG9uIiwiTG9hZEJhbGFuY2luZyIsIkNvbnN0YW50cyIsIlJlY2VpdmVyR3JvdXAiLCJBbGwiLCJlcnIiLCJlcnJvciIsIm1lc3NhZ2UiLCJTZW5kR2FtZU92ZXIiLCJEYXRhIiwiU2VuZEdhbWVPdmVyRGF0YSIsIlNlbmRTZWxlY3RlZFBsYXllckZvclByb2ZpdCIsIk90aGVycyIsIlNlbmRCYW5rcnVwdERhdGEiLCJTZW5kRGF0YSIsIlBsYXllckluZm8iLCJTZW5kT25lUXVlc3Rpb25EYXRhIiwiU2VuZE9uZVF1ZXN0aW9uQXJyYXlzIiwiU2VuZERlY2tzQXJyYXlzIiwiU2VuZERlY2tzQXJyYXlDb3VudGVyIiwiU2VuZFBhcnRuZXJQcm9maXRMb3NzIiwiU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhIiwiRGljZVJvbGxFdmVudCIsIkRpY2VDb3VudCIsIlNlbmRHb0JhY2tTcGFjZURhdGEiLCJTZW5kUGFydG5lclNoaXBPZmZlckRhdGEiLCJTZW5kUGFydG5lclNoaXBBbnN3ZXJEYXRhIiwiU2VuZEluZm8iLCJTeW5jVHVybkNvbXBsZXRpb24iLCJVSUQiLCJTdGFydFR1cm4iLCJ0cmFjZSIsIlNob3dUb2FzdCIsIkNhbGxSZWNpZXZlRXZlbnQiLCJfZXZlbnRDb2RlIiwiX3NlbmRlck5hbWUiLCJfc2VuZGVySUQiLCJJbnN0YW5jZU51bGwiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsInNldFRpbWVvdXQiLCJSZWNlaXZlRXZlbnQiLCJEaXNjb25uZWN0RGF0YSIsIlJlc3RhcnRHYW1lIiwiX3RpbWVyIiwiY2xlYXJUaW1lb3V0IiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsImxvYWRTY2VuZSIsIkNoZWNrTWFzdGVyQ2xpZW50IiwiX2lzTWFzdGVyIiwibXlSb29tTWFzdGVyQWN0b3JOciIsIkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCIsIkdldFJlYWxBY3RvcnMiLCJfcmVhbFBsYXllciIsIkFsbFBsYXllcnMiLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIlJvb21Db3VudGVyIiwiU2VuZFJvb21Db21wbGV0ZWREYXRhIiwiR2V0X1VJTWFuYWdlciIsIkNsZWFyVGltZXIiLCJQcm9jZXNzQ291bnRlciIsIl9tYXN0ZXIiLCJfY291bnRlciIsIlNlbmRDYXNoRGVkdWN0RGF0YSIsIlNlbmRDYXNoQWRkaXRpb25EYXRhIiwiUm9vbUNvbXBsZXRlZCIsInN5c3RlbUV2ZW50IiwiZW1pdCIsInB1c2giLCJVcGRhdGVBY3RvckFjdGl2ZURhdGEiLCJfYWN0b3IiLCJfYWN0b3JzQXJyYXkiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkhhbmRsZVBsYXllckxlYXZlIiwiYWN0b3IiLCJQaG90b25SZWZlcmVjZSIsIl9tYW5hZ2VyIiwiX3BsYXllclR1cm4iLCJfaW5pdGlhbFNldHVwRG9uZSIsIl9pc1NwZWN0YXRlIiwiUmVtb3ZlRnJvbUNoZWNrQXJyYXkiLCJ0b1N0cmluZyIsIkNoZWNrVHVybkNvbXBsZXRlIiwiQ2hhbmdlVHVybkZvcmNlZnVsbHkiLCJTZXRQbGF5ZXJMZWZ0IiwiUmVzZXRTb21lVmFsdWVzIiwiX3BsYXllcmZvdW5kIiwic3BsaWNlIiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU3luY0RhdGEiLCJ1cGRhdGUiLCJkdCIsIm9uU3RhdGVDaGFuZ2UiLCJMQkMiLCJMb2FkQmFsYW5jaW5nQ2xpZW50IiwiU3RhdGVUb05hbWUiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJsb2dnZXIiLCJkZWJ1ZyIsIm1lc3MiLCJpbmZvIiwicGFyYW0iLCJ3YXJuIiwicGFyYW0xIiwicGFyYW0yIiwicGFyYW0zIiwiVG9nZ2xlTG9hZGluZ05vZGUiLCJleGNlcHRpb24iLCJmb3JtYXQiLCJvblJvb21MaXN0Iiwicm9vbXMiLCJSZXNldFJvb21MaXN0IiwiVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkiLCJwbGF5ZXJDb3VudCIsIm9uUm9vbUxpc3RVcGRhdGUiLCJyb29tc1VwZGF0ZWQiLCJyb29tc0FkZGVkIiwicm9vbXNSZW1vdmVkIiwib25Kb2luUm9vbSIsImxvYWRCYWxhbmNpbmdDbGllbnQiLCJ1c2VySWQiLCJfY3VzdG9tUHJvcGVydGllcyIsIm9uQWN0b3JKb2luIiwibXlSb29tQWN0b3JDb3VudCIsIm9uQWN0b3JMZWF2ZSIsIkdhbWVPdmVyIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIkdldFR1cm5OdW1iZXIiLCJfdUlHYW1lTWFuYWdlciIsIm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlIiwib25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlIiwib25FcnJvciIsImVycm9yQ29kZSIsImVycm9yTXNnIiwib25FdmVudCIsImNvZGUiLCJjb250ZW50IiwiUGxheWVySW5mb0RhdGEiLCJfVHVybiIsIl9kaWNlIiwiX0lEIiwiX2NhcmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7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USxxQkFBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vR2xvYmFsIFZhcmlhYmxlc1xyXG52YXIgUGhvdG9uUmVmO1xyXG52YXIgc3RhdGVUZXh0ID0gXCJcIjtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBTaG93Um9vbSA9IGZhbHNlO1xyXG52YXIgR2FtZUZpbmlzaGVkID0gZmFsc2U7XHJcbnZhciBJc01hc3RlckNsaWVudCA9IGZhbHNlO1xyXG52YXIgVG90YWxUaW1lciA9IDMwO1xyXG52YXIgVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbnZhciBTY2hlZHVsYXIgPSBudWxsO1xyXG52YXIgTWF4U3R1ZGVudHMgPSA2O1xyXG52YXIgUmVzdGFydFNwZWN0YXRlID0gZmFsc2U7XHJcbnZhciBJc0dhbWVTdGFydGVkID0gZmFsc2U7XHJcbnZhciBUaW1lb3V0cyA9IFtdO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gUm9vbVByb3BlcnR5LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvb21Qcm9wZXJ0eSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlJvb21Qcm9wZXJ0eVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllcjoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSW5pdGlhbFNldHVwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyR2FtZUluZm86IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFR1cm5OdW1iZXI6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gQXBwX0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQXBwX0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJBcHBfSW5mb1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEFwcElEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBcHAgaWQgZm9ybSBwaG90b24gZGFzaGJvYXJkXCIsXHJcbiAgICB9LFxyXG4gICAgQXBwVmVyc2lvbjoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQXBwIHZlcnNpb24gZm9yIHBob3RvblwiLFxyXG4gICAgfSxcclxuICAgIFdzczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc1NlY3VyZVwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklmIHBob3RvbiBzaG91bGQgdXNlIHNlY3VyZSBhbmQgcmVsaWFibGUgcHJvdG9jb2xzXCIsXHJcbiAgICB9LFxyXG4gICAgTWFzdGVyU2VydmVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJtYXN0ZXIgc2VydmVyIGZvciBwaG90b24gdG8gY29ubmVjdFwiLFxyXG4gICAgfSxcclxuICAgIEZiQXBwSUQ6IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkZCIGFwcCBpZCB1c2VkIGZvciBGQiBhdXRoZXJpemF0aW9uXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGRhdGEgcmVsYXRlZCB0byBNdWx0aXBsYXllckNvbnRyb2xsZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE11bHRpcGxheWVyQ29udHJvbGxlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk11bHRpcGxheWVyQ29udHJvbGxlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQaG90b25BcHBJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEFwcF9JbmZvLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTWF4UGxheWVyczoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTWF4U3BlY3RhdG9yczoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTW9kZVNlbGVjdGlvbjoge1xyXG4gICAgICAvLyAxIG1lYW5zIGJvdCAsIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgc3RhdGljczoge1xyXG4gICAgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICBJbnN0YW5jZTogbnVsbCxcclxuICB9LFxyXG5cclxuICBSZXNldEFsbERhdGEoKSB7XHJcbiAgICBUaW1lb3V0cyA9IFtdO1xyXG4gICAgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgUGhvdG9uUmVmID0gbnVsbDtcclxuICAgIHN0YXRlVGV4dCA9IFwiXCI7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgU2hvd1Jvb20gPSBmYWxzZTtcclxuICAgIEdhbWVGaW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxuICAgIFRvdGFsVGltZXIgPSAzMDtcclxuICAgIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgU2NoZWR1bGFyID0gbnVsbDtcclxuICAgIHRoaXMuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICBNYXhTdHVkZW50cyA9IDY7XHJcbiAgICBSZXN0YXJ0U3BlY3RhdGUgPSBmYWxzZTtcclxuICB9LFxyXG4gIC8vdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIGNyZWF0ZWRcclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLkV4aXRDb25uZWN0aW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLlJlc2V0QWxsRGF0YSgpO1xyXG4gICAgdGhpcy5Jbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZU1vZGVTZWxlY3Rpb24oXHJcbiAgICBfdmFsIC8vIDEgbWVhbnMgYm90ICwgMiBtZWFucyByZWFsIHBsYXllcnNcclxuICApIHtcclxuICAgIHRoaXMuTW9kZVNlbGVjdGlvbiA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgU2V0Q29ubmV0aW5nKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5FeGl0Q29ubmVjdGluZyA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBHZXRBY3RpdmVTdGF0dXMoX3VJRCA9IFwiXCIpIHtcclxuICAgIHZhciBfaXNBY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIHZhciBfYXJyYXkgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9hcnJheVtpbmRleF0uUGxheWVyVUlEID09IF91SUQpIHtcclxuICAgICAgICBpZiAoX2FycmF5W2luZGV4XS5Jc0FjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgX2lzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9pc0FjdGl2ZTtcclxuICB9LFxyXG5cclxuICBHZXRTZWxlY3RlZE1vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5Nb2RlU2VsZWN0aW9uO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgSW5pdGlhbGl6ZSBzb21lIGVzc2VudGFpbHMgZGF0YSBmb3IgbXVsdGlwbGF5ZXIgY29udHJvbGxlciBjbGFzc1xyXG4gICAgQG1ldGhvZCBJbml0X011bHRpcGxheWVyQ29udHJvbGxlclxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBJbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpIHtcclxuICAgIGlmICghTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlKSB7XHJcbiAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgIHRoaXMuSW5pdGlhbGl6ZVBob3RvbigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhBcHBJbmZvKTtcclxuICAgICAgUGhvdG9uUmVmID0gbmV3IERlbW9Mb2FkQmFsYW5jaW5nKCk7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5MZWF2ZVJvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuUm9vbU5hbWUgPSBcIlwiO1xyXG4gICAgdGhpcy5NZXNzYWdlID0gXCJcIjtcclxuICAgIFNob3dSb29tID0gZmFsc2U7XHJcbiAgICB0aGlzLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjaGVjayByZWZlcmVuY2UgdG8gc29tZSB2YXJpYWJsZXMgYW5kIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmVtb3ZlIHBlcnNpc3Qgbm9kZSB3aGVuIHdhbnQgdG8gcmVzdGFydCBzY2VuZVxyXG4gICAgQG1ldGhvZCBSZW1vdmVQZXJzaXN0Tm9kZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBSZW1vdmVQZXJzaXN0Tm9kZSgpIHtcclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSA9IG51bGw7XHJcbiAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gZ2V0IG5hbWUgb2YgY3VycmVudCBvcGVuZWQgc2NlbmVcclxuICAgIEBtZXRob2QgZ2V0U2NlbmVOYW1lXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge3N0cmluZ30gc2NlbmVOYW1lXHJcbiAgICAqKi9cclxuICBnZXRTY2VuZU5hbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzY2VuZU5hbWU7XHJcbiAgICB2YXIgX3NjZW5lSW5mb3MgPSBjYy5nYW1lLl9zY2VuZUluZm9zO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfc2NlbmVJbmZvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoX3NjZW5lSW5mb3NbaV0udXVpZCA9PSBjYy5kaXJlY3Rvci5fc2NlbmUuX2lkKSB7XHJcbiAgICAgICAgc2NlbmVOYW1lID0gX3NjZW5lSW5mb3NbaV0udXJsO1xyXG4gICAgICAgIHNjZW5lTmFtZSA9IHNjZW5lTmFtZS5zdWJzdHJpbmcoc2NlbmVOYW1lLmxhc3RJbmRleE9mKFwiL1wiKSArIDEpLm1hdGNoKC9bXlxcLl0rLylbMF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzY2VuZU5hbWU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBmdW5jdGlvbiB0byBzZXQgXCJTaG93Um9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlU2hvd1Jvb21fQm9vbFxyXG4gICAgQHBhcmFtIHtib29sZWFufSBfc3RhdGVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgKiovXHJcbiAgVG9nZ2xlU2hvd1Jvb21fQm9vbChfc3RhdGUpIHtcclxuICAgIFNob3dSb29tID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gc2V0IFwiTGVhdmVSb29tXCIgYm9vbCB2YWx1ZVxyXG4gICAgQG1ldGhvZCBUb2dnbGVMZWF2ZVJvb21fQm9vbFxyXG4gICAgQHBhcmFtIHtib29sZWFufSBfc3RhdGVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgKiovXHJcbiAgVG9nZ2xlTGVhdmVSb29tX0Jvb2woX3N0YXRlKSB7XHJcbiAgICB0aGlzLkxlYXZlUm9vbSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgUGhvdG9uIFwiUGhvdG9uUmVmXCIgaW5zdGFuY2UgY3JlYXRlZCBieSBtdWx0aXBsYXllciBjbGFzc1xyXG4gICAgQG1ldGhvZCBnZXRQaG90b25SZWZcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBQaG90b25SZWZcclxuICAgICoqL1xyXG4gIGdldFBob3RvblJlZigpIHtcclxuICAgIHJldHVybiBQaG90b25SZWY7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIG15QWN0b3IgaW5zdGFuY2UgY3JlYXRlZCBieSBwaG90b25cclxuICAgIEBtZXRob2QgUGhvdG9uQWN0b3JcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBBY3RvclxyXG4gICAgKiovXHJcbiAgUGhvdG9uQWN0b3IoKSB7XHJcbiAgICByZXR1cm4gUGhvdG9uUmVmLm15QWN0b3IoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgbXlSb29tQWN0b3JzQXJyYXkgY3JlYXRlZCBieSBwaG90b25cclxuICAgIEBtZXRob2QgUm9vbUFjdG9yc1xyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtvYmplY3R9IEFjdG9yXHJcbiAgICAqKi9cclxuICBSb29tQWN0b3JzKCkge1xyXG4gICAgcmV0dXJuIFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBpc1NwZWN0YXRlIHZhcmlhYmxlIGZyb20gY3VzdG9tIHByb3BlcnR5IG9mIGN1cnJlbnQgYWN0b3JcclxuICAgIEBtZXRob2QgQ2hlY2tTcGVjdGF0ZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBpc1NwZWN0YXRlXHJcbiAgICAqKi9cclxuICBDaGVja1NwZWN0YXRlKCkge1xyXG4gICAgcmV0dXJuIFBob3RvblJlZi5teUFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgSW5pdGlhbGl6ZSBwaG90b24gd2l0aCBhcHBpZCxhcHAgdmVyc2lvbiwgV3NzIGV0Y1xyXG4gICAgQG1ldGhvZCBJbml0aWFsaXplUGhvdG9uXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEluaXRpYWxpemVQaG90b24oKSB7XHJcbiAgICBBcHBJbmZvLkFwcElkID0gdGhpcy5QaG90b25BcHBJbmZvLkFwcElEO1xyXG4gICAgQXBwSW5mby5BcHBWZXJzaW9uID0gdGhpcy5QaG90b25BcHBJbmZvLkFwcFZlcnNpb247XHJcbiAgICBBcHBJbmZvLldzcyA9IHRoaXMuUGhvdG9uQXBwSW5mby5Xc3M7XHJcbiAgICBBcHBJbmZvLk1hc3RlclNlcnZlciA9IHRoaXMuUGhvdG9uQXBwSW5mby5NYXN0ZXJTZXJ2ZXI7XHJcbiAgICBBcHBJbmZvLkZiQXBwSWQgPSB0aGlzLlBob3RvbkFwcEluZm8uRmJBcHBJRDtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgY29ubmVjdGlvbiByZXF1ZXN0IHRvIHBob3RvblxyXG4gICAgQG1ldGhvZCBSZXF1ZXN0Q29ubmVjdGlvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBSZXF1ZXN0Q29ubmVjdGlvbigpIHtcclxuICAgIGlmIChQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUpIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBjb25uZWN0ZWRcIik7XHJcbiAgICBlbHNlIFBob3RvblJlZi5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIENoZWNrQ29ubmVjdGlvblN0YXRlKCkge1xyXG4gICAgdmFyIF9jb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgIGlmIChQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuc3RhdGUgPT0gNyB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgY29ubmVjdGVkXCIpO1xyXG4gICAgICBfY29ubmVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhQaG90b25SZWYuc3RhdGUpO1xyXG4gICAgcmV0dXJuIF9jb25uZWN0ZWQ7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBEaXNjb25uZWN0IGZyb20gcGhvdG9uXHJcbiAgICBAbWV0aG9kIERpc2Nvbm5lY3RQaG90b25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgRGlzY29ubmVjdFBob3RvbigpIHtcclxuICAgIC8vaWYgKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuc3RhdGUgPT0gNyB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICBQaG90b25SZWYuZGlzY29ubmVjdCgpO1xyXG4gICAgdGhpcy5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICAvL1Bob3RvblJlZi5sZWF2ZVJvb20oKTtcclxuICAgIHRoaXMuUmVzZXRTdGF0ZSgpO1xyXG4gICAgLy8gIH0gZWxzZSB7XHJcbiAgICAvLyAgICBjb25zb2xlLmxvZyhcIm5vdCBpbnNpZGUgYW55IHJvb20gb3IgbG9iYnkgb3IgY29ubmVjdGVkIHRvIHBob3RvblwiKTtcclxuICB9LFxyXG4gIC8vIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmVzZXRpbmcgZmV3IHZhbHVlc1xyXG4gICAgQG1ldGhvZCBSZXNldFN0YXRlXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFJlc2V0U3RhdGUoKSB7XHJcbiAgICBJc0dhbWVTdGFydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkxlYXZlUm9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICBTaG93Um9vbSA9IGZhbHNlO1xyXG4gICAgc3RhdGVUZXh0ID0gXCJcIjtcclxuICAgIHRoaXMuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiByb29tIG5hbWUgZ290IGlucHV0IGZyb20gZ2FtZVxyXG4gICAgQG1ldGhvZCBPblJvb21OYW1lQ2hhbmdlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIE9uUm9vbU5hbWVDaGFuZ2UobmFtZSkge1xyXG4gICAgdGhpcy5Sb29tTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBtZXNzYWdlIHdpbmRvdyBnb3QgaW5wdXQgZnJvbSBnYW1lXHJcbiAgICBAbWV0aG9kIE9uTWVzc2FnZUNoYW5nZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG1zZ1xyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIE9uTWVzc2FnZUNoYW5nZShtc2cpIHtcclxuICAgIHRoaXMuTWVzc2FnZSA9IG1zZztcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHVwZGF0ZSBjdXN0b20gcm9vbSBwcm9wZXJ0aWVzXHJcbiAgICBAbWV0aG9kIFVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXMoX3BsYXllclVwZGF0ZSA9IGZhbHNlLCBfcGxheWVyVmFsdWUgPSAwLCBfaW5pdGlhbFNldHVwVXBkYXRlID0gZmFsc2UsIF9pbml0aWFsU2V0dXBWYWx1ZSA9IGZhbHNlLCBfcGxheWVyR2FtZUluZm9VcGRhdGUgPSBmYWxzZSwgX3BsYXllckdhbWVJbmZvVmFsdWUgPSBudWxsLCBfdHVybk51bWJlclVwZGF0ZSA9IGZhbHNlLCBfdHVybk51bWJlcnZhbHVlID0gMCkge1xyXG4gICAgaWYgKF9wbGF5ZXJVcGRhdGUpIFBob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclwiLCBfcGxheWVyVmFsdWUsIHRydWUpO1xyXG5cclxuICAgIGlmIChfaW5pdGlhbFNldHVwVXBkYXRlKSBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIiwgX2luaXRpYWxTZXR1cFZhbHVlLCB0cnVlKTtcclxuXHJcbiAgICBpZiAoX3BsYXllckdhbWVJbmZvVXBkYXRlKSBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCBfcGxheWVyR2FtZUluZm9WYWx1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKF90dXJuTnVtYmVyVXBkYXRlKSBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIF90dXJuTnVtYmVydmFsdWUsIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY3JlYXRlIHJvb20gcmVxdWVzdFxyXG4gICAgQG1ldGhvZCBDcmVhdGVSb29tXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIENyZWF0ZVJvb20oKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5zdGF0ZSA9PSA4KSB7XHJcbiAgICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBfZGF0YSA9IG5ldyBSb29tUHJvcGVydHkoKTtcclxuICAgICAgICBfZGF0YS5QbGF5ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBpc1Zpc2libGU6IHRydWUsXHJcbiAgICAgICAgICBpc09wZW46IHRydWUsXHJcbiAgICAgICAgICBtYXhQbGF5ZXJzOiB0aGlzLk1heFBsYXllcnMgKyB0aGlzLk1heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICBjdXN0b21HYW1lUHJvcGVydGllczogX2RhdGEsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwgeyBJc1NwZWN0YXRlOiBmYWxzZSB9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIiwgeyBDb3VudGVyOiBUb3RhbFRpbWVyIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuICAgICAgICB2YXIgUm9vbUlEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSk7XHJcblxyXG4gICAgICAgIFBob3RvblJlZi5jcmVhdGVSb29tKFwiUm9vbV9cIiArIFJvb21JRCwgcm9vbU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGpvaW4gcm9vbSByZXF1ZXN0IGJ5IG5hbWVcclxuICAgIEBtZXRob2QgSm9pblJvb21cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBfcm9vbU5hbWVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBKb2luUm9vbShfcm9vbU5hbWUpIHtcclxuICAgIGlmIChQaG90b25SZWYuc3RhdGUgPT0gNSB8fCBQaG90b25SZWYuaXNDb25uZWN0ZWRUb01hc3RlcigpID09IHRydWUgfHwgUGhvdG9uUmVmLmlzSW5Mb2JieSgpID09IHRydWUgfHwgUGhvdG9uUmVmLnN0YXRlID09IDgpIHtcclxuICAgICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IGZhbHNlIHx8IFBob3RvblJlZi5zdGF0ZSAhPSA4KSB7XHJcbiAgICAgICAgdmFyIHJvb21PcHRpb25zID0ge1xyXG4gICAgICAgICAgaXNWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgaXNPcGVuOiBmYWxzZSxcclxuICAgICAgICAgIG1heFBsYXllcnM6IHRoaXMuTWF4UGxheWVycyArIHRoaXMuTWF4U3BlY3RhdG9ycyxcclxuICAgICAgICAgIC8vXCJjdXN0b21HYW1lUHJvcGVydGllc1wiOntcIlJvb21Fc3NlbnRpYWxzXCI6IHtJc1NwZWN0YXRlOnRydWV9fVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHsgSXNTcGVjdGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIiwgeyBDb3VudGVyOiBUb3RhbFRpbWVyIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuXHJcbiAgICAgICAgUGhvdG9uUmVmLmpvaW5Sb29tKF9yb29tTmFtZSwgcm9vbU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGpvaW4gcmFuZG9tIHJvb21cclxuICAgIEBtZXRob2QgSm9pblJhbmRvbVJvb21cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgSm9pblJhbmRvbVJvb20oKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLnN0YXRlID09IDUgfHwgUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5zdGF0ZSA9PSA4KSB7XHJcbiAgICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSBmYWxzZSB8fCBQaG90b25SZWYuc3RhdGUgIT0gOCkge1xyXG4gICAgICAgIHZhciBfZGF0YSA9IG5ldyBSb29tUHJvcGVydHkoKTtcclxuICAgICAgICBfZGF0YS5QbGF5ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgcm9vbU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAvL1wiZXhwZWN0ZWRNYXhQbGF5ZXJzXCI6dGhpcy5NYXhQbGF5ZXJzK01heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICBleHBlY3RlZEN1c3RvbVJvb21Qcm9wZXJ0aWVzOiBfZGF0YSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7IElzU3BlY3RhdGU6IGZhbHNlIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tQ291bnRlclwiLCB7IENvdW50ZXI6IFRvdGFsVGltZXIgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLnNldFVzZXJJZChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQpO1xyXG5cclxuICAgICAgICBQaG90b25SZWYuam9pblJhbmRvbVJvb20ocm9vbU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBqb2luZWQgdGhlIHJvb21cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgY29ubmVjdGVkIG9yIGNvbm5lY3Rpb24gaXMgZHJvcHBlZCwgcGxlYXNlIGNvbm5lY3QgdG8gcGhvdG9uIGFnYWluLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgY2FyZCBpbmRleCBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZENhcmREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kQ2FyZERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBjYXJkIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDUsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIENhcmREYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGdhbWUgb3ZlciBjYWxsXHJcbiAgICBAbWV0aG9kIFNlbmRHYW1lT3ZlclxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZEdhbWVPdmVyKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZ2FtZSBvdmVyIGNhbGxcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDYsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kR2FtZU92ZXJEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZ2FtZSBvdmVyIGRhdGEgdG8gc3luY1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTYsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kU2VsZWN0ZWRQbGF5ZXJGb3JQcm9maXQoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBnYW1lIG92ZXIgZGF0YSB0byBzeW5jXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxNyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBiYWNrcnVwdCBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRCYW5rcnVwdERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRCYW5rcnVwdERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBiYW5rcnVwY3kgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgOSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBQbGF5ZXIgRGF0YSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmREYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgcGxheWVyIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllckluZm86IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgb25lIHF1ZXN0aW9uIERhdGEgb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRPbmVRdWVzdGlvbkRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRPbmVRdWVzdGlvbkRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRPbmVRdWVzdGlvbkFycmF5cyhfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiBhcnJheXNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE4LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZERlY2tzQXJyYXlzKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZGVja3MgYXJyYXlzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxOSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmREZWNrc0FycmF5Q291bnRlcihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGRlY2tzIGFycmF5cyBjb3VudGVyc1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMjAsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBwcm9maXQgb3IgbG9zcyB0byB5b3VyIHBhc3J0bmVyXHJcbiAgICBAbWV0aG9kIFNlbmRQYXJ0bmVyUHJvZml0TG9zc1xyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFBhcnRuZXJQcm9maXRMb3NzKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDEzLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIG9uZSBxdWVzdGlvbiByZXNwb25zZSBvdmVyIG5ldHdvcmtcclxuICAgIEBtZXRob2QgU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kT25lUXVlc3Rpb25SZXNwb25zZURhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gcmVzcG9uc2UgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgOCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBkaWNlIGRhdGFcclxuICAgIEBtZXRob2QgRGljZVJvbGxFdmVudFxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgRGljZVJvbGxFdmVudChfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGRpY2UgY291bnRcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDMsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERpY2VDb3VudDogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZCBnbyBiYWNrIHNwYWNlcyBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRHb0JhY2tTcGFjZURhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRHb0JhY2tTcGFjZURhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZCBnbyBiYWNrIHNwYWNlcyBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgc2VuZGluZyBvcGVuIGludml0YXRpb24gdG8gYWxsIHBsYXllcnMgZm9yIHBhcnRuZXIgc2hpcFxyXG4gICAgQG1ldGhvZCBTZW5kUGFydG5lclNoaXBPZmZlckRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRQYXJ0bmVyU2hpcE9mZmVyRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBhcnRuZXIgc2hpcCBvZmZlclwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTEsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmRpbmcgcGFydG5lciBhbnN3ZXIgZGF0YSAoYWNjZXB0IG9yIHJlamVjdClcclxuICAgIEBtZXRob2QgU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBhcnRlbnJzaGlwIGFuc3dlciBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRJbmZvKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgaW5mb1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTUsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgdXNlciBpZCBvZiBwbGF5ZXIgdG8gYWxsIG90aGVyIHdobyBoYWQgY29tcGxldGVkIHRoZWlyIHR1cm5cclxuICAgIEBtZXRob2QgU3luY1R1cm5Db21wbGV0aW9uXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTeW5jVHVybkNvbXBsZXRpb24oX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyB0dXJuIGNvbXBsZXRpb24gZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgNCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgVUlEOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTdGFydCBUdXJuIGZvciBpbml0aWFsIHR1cm5cclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTdGFydFR1cm4oX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUudHJhY2UoXCJTdGFydGluZyBUdXJuXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBUdXJuTnVtYmVyOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTaG93IHRvYXN0IG1lc3NhZ2Ugb24gdGhlIGNvbnNvbGVcclxuICAgIEBtZXRob2QgU2hvd1RvYXN0XHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIHNob3duIFxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNob3dUb2FzdDogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgY29uc29sZS5sb2coXCJ0b2FzdCBtZXNzYWdlOiBcIiArIG1zZyk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBSZWNlaXZlIGV2ZW50IGZyb20gcGhvdG9uIHJhaXNlIG9uIFxyXG4gICAgQG1ldGhvZCBDYWxsUmVjaWV2ZUV2ZW50XHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgQ2FsbFJlY2lldmVFdmVudDogZnVuY3Rpb24gKF9ldmVudENvZGUsIF9zZW5kZXJOYW1lLCBfc2VuZGVySUQsIF9kYXRhKSB7XHJcbiAgICB2YXIgSW5zdGFuY2VOdWxsID0gdHJ1ZTtcclxuXHJcbiAgICAvL3RvIGNoZWNrIGlmIGluc3RhbmNlIGlzIG51bGwgaW4gY2FzZSBjbGFzcyBpbnN0YW5jZSBpcyBub3QgbG9hZGVkIGFuZCBpdHMgcmVjZWl2ZXMgY2FsbGJhY2tcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKSA9PSBudWxsKSB7XHJcbiAgICAgIEluc3RhbmNlTnVsbCA9IHRydWU7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuQ2FsbFJlY2lldmVFdmVudChfZXZlbnRDb2RlLCBfc2VuZGVyTmFtZSwgX3NlbmRlcklELCBfZGF0YSk7XHJcbiAgICAgIH0sIDUwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEluc3RhbmNlTnVsbCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZWNlaXZlRXZlbnQoX2V2ZW50Q29kZSwgX3NlbmRlck5hbWUsIF9zZW5kZXJJRCwgX2RhdGEpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIERpc2Nvbm5lY3REYXRhKCkge1xyXG4gICAgR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tPWZhbHNlO1xyXG4gICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0U3RhdGUoKTtcclxuICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgfSxcclxuXHJcbiAgUmVzdGFydEdhbWUoX3RpbWVyID0gMCkge1xyXG4gICAgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSBmYWxzZTtcclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBUaW1lb3V0cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KFRpbWVvdXRzW2luZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgfSwgX3RpbWVyKTtcclxuICAgIC8vIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKVxyXG4gIH0sXHJcblxyXG4gIENoZWNrTWFzdGVyQ2xpZW50KF9pZCkge1xyXG4gICAgdmFyIF9pc01hc3RlciA9IGZhbHNlO1xyXG4gICAgaWYgKFBob3RvblJlZi5teVJvb21NYXN0ZXJBY3Rvck5yKCkgPT0gX2lkICYmIFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciA9PSBfaWQpIHtcclxuICAgICAgX2lzTWFzdGVyID0gdHJ1ZTtcclxuICAgICAgSXNNYXN0ZXJDbGllbnQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5lcnJvcihfaXNNYXN0ZXIpO1xyXG4gICAgcmV0dXJuIF9pc01hc3RlcjtcclxuICB9LFxyXG5cclxuICBDaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoKSB7XHJcbiAgICB2YXIgX2lzTWFzdGVyID0gZmFsc2U7XHJcbiAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yID09IFBob3RvblJlZi5teVJvb21NYXN0ZXJBY3Rvck5yKCkpIHtcclxuICAgICAgX2lzTWFzdGVyID0gdHJ1ZTtcclxuICAgICAgSXNNYXN0ZXJDbGllbnQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUuZXJyb3IoX2lzTWFzdGVyKTtcclxuICAgIHJldHVybiBfaXNNYXN0ZXI7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRSb29tVmFsdWVzKCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KFNjaGVkdWxhcik7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbiAgICAgIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuXHJcbiAgR2V0UmVhbEFjdG9ycygpIHtcclxuICAgIHZhciBfcmVhbFBsYXllciA9IDA7XHJcbiAgICB2YXIgQWxsUGxheWVycyA9IFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEFsbFBsYXllcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChBbGxQbGF5ZXJzW2luZGV4XS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgIF9yZWFsUGxheWVyKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfcmVhbFBsYXllcjtcclxuICB9LFxyXG5cclxuICBSb29tQ291bnRlcihfdGltZXIpIHtcclxuICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gICAgdmFyIF9kYXRhID0gbnVsbDtcclxuICAgIFNjaGVkdWxhciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoSXNNYXN0ZXJDbGllbnQpIHtcclxuICAgICAgICBpZiAoX3RpbWVyID4gMCkge1xyXG4gICAgICAgICAgX3RpbWVyLS07XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhfdGltZXIpO1xyXG4gICAgICAgICAgdGhpcy5Sb29tQ291bnRlcihfdGltZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwidGltZXIgY29tcGxldGVkXCIpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuR2V0UmVhbEFjdG9ycygpID4gMSkge1xyXG4gICAgICAgICAgICAvL2lmIGhhcyBtb3JlIHRoYW4gb25lIHBsYXllciBzdGFydCByZWFsIGdhbWVcclxuICAgICAgICAgICAgdGhpcy5TZW5kUm9vbUNvbXBsZXRlZERhdGEoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlNob3dUb2FzdChcIk5vIG9ubGluZSBwbGF5ZXIgd2FzIGZvdW5kLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyXCIpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLkV4aXRDb25uZWN0aW5nKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVG9nZ2xlTW9kZVNlbGVjdGlvbigxKTtcclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlRvZ2dsZVNob3dSb29tX0Jvb2woZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMgPSAyO1xyXG4gICAgICAgICAgICAvLyBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwicGxheWVycyBmb3VuZFwiKTtcclxuICAgICAgICAgICAgLy8gY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0cnVlLCB0cnVlLCBcIkdhbWVQbGF5XCIpOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgICAgICAgLy8gfSwgMTAwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMDAwKTtcclxuICB9LFxyXG5cclxuICBDbGVhclRpbWVyKCkge1xyXG4gICAgVGltZXJTdGFydGVkID0gZmFsc2U7XHJcbiAgICBfdGltZXIgPSAwO1xyXG4gICAgY2xlYXJUaW1lb3V0KFNjaGVkdWxhcik7XHJcbiAgfSxcclxuXHJcbiAgUHJvY2Vzc0NvdW50ZXIoKSB7XHJcbiAgICB2YXIgX21hc3RlciA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoKTtcclxuICAgIGlmIChfbWFzdGVyKSB7XHJcbiAgICAgIGlmICghVGltZXJTdGFydGVkKSB7XHJcbiAgICAgICAgVGltZXJTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICB2YXIgX2NvdW50ZXIgPSBQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIilbXCJDb3VudGVyXCJdO1xyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Sb29tQ291bnRlcihfY291bnRlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgcm9vbSBjb21wbGV0ZWQgZGF0YVxyXG4gICAgQG1ldGhvZCBTZW5kUm9vbUNvbXBsZXRlZERhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRSb29tQ29tcGxldGVkRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIFJvb21Db21wbGV0ZWREYXRhXCIpO1xyXG4gICAgICAvLyAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTQsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kQ2FzaERlZHVjdERhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBTZW5kQ2FzaERlZHVjdERhdGFcIik7XHJcbiAgICAgIC8vICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyMSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmRDYXNoQWRkaXRpb25EYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgU2VuZENhc2hBZGRpdGlvbkRhdGFcIik7XHJcbiAgICAgIC8vICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAyMixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJvb21Db21wbGV0ZWQoKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX3JlYWxQbGF5ZXIgPSB0aGlzLkdldFJlYWxBY3RvcnMoKTtcclxuICAgICAgSXNHYW1lU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzID0gX3JlYWxQbGF5ZXI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHJlcXVpcmVkIHBsYXllcnMgam9pbmVkLCBzdGFydGluZyB0aGUgZ2FtZS4uXCIpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwicGxheWVycyBmb3VuZFwiKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gdHJ1ZTtcclxuICAgICAgVGltZW91dHMucHVzaChcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0cnVlLCB0cnVlLCBcIkdhbWVQbGF5XCIpO1xyXG4gICAgICAgIH0sIDEwMDApXHJcbiAgICAgICk7IC8vZnVuY3Rpb24gaW4gdWkgbWFuYWdlclxyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXModHJ1ZSwgX3JlYWxQbGF5ZXIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIG51bGwsIGZhbHNlLCAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBVcGRhdGVBY3RvckFjdGl2ZURhdGEoX2FjdG9yKSB7XHJcbiAgICB2YXIgX2FjdG9yc0FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgdmFyIF9kYXRhID0gbnVsbDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIF9kYXRhID0gX2FjdG9yc0FycmF5W2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICBpZiAoX2RhdGEuUGxheWVyVUlEID09IF9hY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgX2RhdGEuSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX2RhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJ1cGRhdGluZyBhY3RpdmUgc3RhdHVzIG9mIHRoZSBwbGF5ZXIgd2hvIGhhcyBsZWZ0Li4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXCIpO1xyXG4gICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICB9LFxyXG5cclxuICBIYW5kbGVQbGF5ZXJMZWF2ZShhY3RvciA9IG51bGwsIFBob3RvblJlZmVyZWNlID0gbnVsbCwgX21hbmFnZXIgPSBudWxsLCBfcGxheWVyVHVybiA9IDAsIF9pbml0aWFsU2V0dXBEb25lID0gZmFsc2UsIF9pc1NwZWN0YXRlID0gZmFsc2UpIHtcclxuICAgIGlmIChfaW5pdGlhbFNldHVwRG9uZSkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQgPT0gYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlQWN0b3JBY3RpdmVEYXRhKGFjdG9yKTtcclxuICAgICAgICAgIGlmICghX2lzU3BlY3RhdGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbGVmdDogXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuUmVtb3ZlRnJvbUNoZWNrQXJyYXkoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuQ2hlY2tUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgaWYgKF9wbGF5ZXJUdXJuID09IGluZGV4ICYmIFBob3RvblJlZmVyZWNlLm15QWN0b3IoKS5hY3Rvck5yID09IFBob3RvblJlZmVyZWNlLm15Um9vbU1hc3RlckFjdG9yTnIoKSkge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLkNoYW5nZVR1cm5Gb3JjZWZ1bGx5KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2UgdHVybiBmb3JjZWZ1bGx5XCIpO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNldFBsYXllckxlZnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJlc2V0U29tZVZhbHVlcygpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gX3VJTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTAwMCk7XHJcbiAgICAgIHZhciBfcGxheWVyZm91bmQgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm8uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzLS07XHJcbiAgICAgICAgICBfcGxheWVyZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZUFjdG9yQWN0aXZlRGF0YShhY3Rvcik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghX3BsYXllcmZvdW5kKSB7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMtLTtcclxuICAgICAgICBpZiAoIV9pc1NwZWN0YXRlKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3luY0RhdGEobnVsbCwgYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhfbWFuYWdlci5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vY2FsbGVkIGV2ZXJ5IGZyYW1lXHJcbiAgdXBkYXRlKGR0KSB7XHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBzb21lIGNoYW5nZSBpbiBjb25uZWN0aW9uIHN0YXRlXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25TdGF0ZUNoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gc3RhdGVcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25TdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xyXG4gICAgICAvLyNyZWdpb24gQ29ubmVjdGlvbiBTdGF0ZXNcclxuICAgICAgLy9zdGF0ZSAxIDogY29ubmVjdGluZ1RvTmFtZVNlcnZlclxyXG4gICAgICAvL1N0YXRlIDIgOiBDb25uZWN0ZWRUb05hbWVTZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSAzIDogQ29ubmVjdGluZ1RvTWFzdGVyU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgNCA6IENvbm5lY3RlZFRvTWFzdGVyU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgNTogIEpvaW5lZExvYmJ5XHJcbiAgICAgIC8vU3RhdGUgNiA6IENvbm5lY3RpbmdUb0dhbWVzZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSA3IDogQ29ubmVjdGVkVG9HYW1lc2VydmVyXHJcbiAgICAgIC8vU3RhdGUgOCA6IEpvaW5lZFxyXG4gICAgICAvL1N0YXRlIDEwOiBEaXNjb25uZWN0ZWRcclxuICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICB2YXIgTEJDID0gUGhvdG9uLkxvYWRCYWxhbmNpbmcuTG9hZEJhbGFuY2luZ0NsaWVudDtcclxuICAgICAgY29uc29sZS5sb2coXCJTdGF0ZUNvZGU6IFwiICsgc3RhdGUgKyBcIiBcIiArIExCQy5TdGF0ZVRvTmFtZShzdGF0ZSkpO1xyXG5cclxuICAgICAgaWYgKHN0YXRlID09IDEpIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJjb25uZWN0aW5nIHRvIHNlcnZlci4uLlwiKTtcclxuICAgICAgZWxzZSBpZiAoc3RhdGUgPT0gNCkgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcImNvbm5lY3RlZCB0byBzZXJ2ZXJcIik7XHJcbiAgICAgIGVsc2UgaWYgKHN0YXRlID09IDUpIHtcclxuICAgICAgICAvL2hhcyBqb2luZWQgbG9iYnlcclxuICAgICAgICBpZiAoU2hvd1Jvb20gPT0gZmFsc2UpIHtcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJ3YWl0aW5nIGZvciBvdGhlciBwbGF5ZXJzLi4uXCIpO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5SYW5kb21Sb29tKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChTaG93Um9vbSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic2hvd2luZyByb29tcyBsaXN0Li4uXCIpO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBkZWJ1Z1xyXG4gICAgICAgICAgICBAbWV0aG9kIGRlYnVnXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5kZWJ1ZyA9IGZ1bmN0aW9uIChtZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGluZm9cclxuICAgICAgICAgICAgQG1ldGhvZCBpbmZvXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuaW5mbyA9IGZ1bmN0aW9uIChtZXNzLCBwYXJhbSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzICsgcGFyYW0pO1xyXG4gICAgICBzdGF0ZVRleHQgKz0gbWVzcyArIFwiIFwiICsgcGFyYW0gKyBcIlxcblwiO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHdhcm5cclxuICAgICAgICAgICAgQG1ldGhvZCB3YXJuXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTFcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtMlxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci53YXJuID0gZnVuY3Rpb24gKG1lc3MsIHBhcmFtMSwgcGFyYW0yLCBwYXJhbTMpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyArIFwiIFwiICsgcGFyYW0xICsgXCIgXCIgKyBwYXJhbTIgKyBcIiBcIiArIHBhcmFtMyk7XHJcblxyXG4gICAgICBpZiAocGFyYW0xID09IDIyNSkge1xyXG4gICAgICAgIC8vbm8gcm9vbSBmb3VuZFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibm8gcmFuZG9tIHJvb20gd2FzIGZvdW5kLCBjcmVhdGluZyBvbmVcIik7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNyZWF0ZVJvb20oKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmFtMSA9PSAyMjYpIHtcclxuICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJSb29tIGRvZXMgbm90IGV4aXN0cyBhbnltb3JlLHBsZWFzZSB0cnkgYWdhaW4gYnkgZXhpdGluZy5cIik7XHJcbiAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2xlYXJUaW1lcigpO1xyXG4gICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlNldENvbm5ldGluZyhmYWxzZSk7XHJcbiAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvL3Jvb20gZG9lcyBub3QgZXhpc3RzIG9yIGlzIGZ1bGxcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlTG9hZGluZ05vZGUoZmFsc2UpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJSb29tIGlzIGZ1bGwsIHBsZWFzZSBzZWxlY3QgYW55IG90aGVyIHJvb20gdG8gc3BlY3RhdGUuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGVycm9yXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXJyb3JcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5lcnJvciA9IGZ1bmN0aW9uIChtZXNzLCBwYXJhbSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBleGNlcHRpb25cclxuICAgICAgICAgICAgQG1ldGhvZCBleGNlcHRpb25cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IG1lc3NcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYubG9nZ2VyLmV4Y2VwdGlvbiA9IGZ1bmN0aW9uIChtZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHNvbWUgZm9ybWF0XHJcbiAgICAgICAgICAgIEBtZXRob2QgZm9ybWF0XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5mb3JtYXQgPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgcGxheWVyIGpvaW5zIGxvYmJ5XHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Sb29tTGlzdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Sb29tTGlzdCA9IGZ1bmN0aW9uIChyb29tcykge1xyXG4gICAgICBzdGF0ZVRleHQgKz0gXCJcXG5cIiArIFwiUm9vbXMgTGlzdDpcIiArIFwiXFxuXCI7XHJcblxyXG4gICAgICBpZiAocm9vbXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICBzdGF0ZVRleHQgKz0gXCJObyByb29tcyBpbiBsb2JieS5cIiArIFwiXFxuXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5SZXNldFJvb21MaXN0KCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkocm9vbXNbaV0ubmFtZSwgcm9vbXNbaV0ucGxheWVyQ291bnQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJSb29tIG5hbWU6IFwiICsgcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICBzdGF0ZVRleHQgKz0gXCJSb29tOiBcIiArIHJvb21zW2ldLm5hbWUgKyBcIlxcblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBjaGFuZ2UgaW4gcm9vbXMgbGlzdCAocm9vbSBhZGRlZCx1cGRhdGVkLHJlbW92ZWQgZXRjKVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RVcGRhdGVcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1VwZGF0ZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zQWRkZWRcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zUmVtb3ZlZFxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vblJvb21MaXN0VXBkYXRlID0gZnVuY3Rpb24gKHJvb21zLCByb29tc1VwZGF0ZWQsIHJvb21zQWRkZWQsIHJvb21zUmVtb3ZlZCkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlJlc2V0Um9vbUxpc3QoKTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUsIHJvb21zW2ldLnBsYXllckNvdW50KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJvb20gbmFtZTogXCIgKyByb29tc1tpXS5uYW1lKTtcclxuICAgICAgICBzdGF0ZVRleHQgKz0gXCJSb29tOiBcIiArIHJvb21zW2ldLm5hbWUgKyBcIlxcblwiO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiUm9vbXMgTGlzdCB1cGRhdGVkOiBcIiArIHJvb21zVXBkYXRlZC5sZW5ndGggKyBcIiB1cGRhdGVkLCBcIiArIHJvb21zQWRkZWQubGVuZ3RoICsgXCIgYWRkZWQsIFwiICsgcm9vbXNSZW1vdmVkLmxlbmd0aCArIFwiIHJlbW92ZWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgbG9jYWxseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBqb2lucyByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25Kb2luUm9vbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkpvaW5Sb29tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyNyZWdpb24gTG9ncyBmb3IgZ2FtZVxyXG4gICAgICBjb25zb2xlLmxvZyhcIkdhbWUgXCIgKyB0aGlzLm15Um9vbSgpLm5hbWUgKyBcIiBqb2luZWRcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teUFjdG9yKCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tKCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb21BY3RvcnNBcnJheSgpWzBdLmxvYWRCYWxhbmNpbmdDbGllbnQudXNlcklkKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpLl9jdXN0b21Qcm9wZXJ0aWVzKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSk7XHJcbiAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIHdobyBqb2luZWQgaXMgc3BlY3RhdGVcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTtcclxuICAgICAgICB9LCAxMDAwKTsgLy9mdW5jdGlvbiBpbiBVSU1hbmFnZXJcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5FeGl0Q29ubmVjdGluZykge1xyXG4gICAgICAvLyAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DbGVhclRpbWVyKCk7XHJcbiAgICAgIC8vICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlNldENvbm5ldGluZyhmYWxzZSk7XHJcbiAgICAgIC8vICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gICAgICAvLyAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlByb2Nlc3NDb3VudGVyKCk7XHJcbiAgICAgICAgLy99XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBqb2lucyByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckpvaW5cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgKFBob3RvblJlZi5vbkFjdG9ySm9pbiA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICB2YXIgX3JlYWxQbGF5ZXIgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuR2V0UmVhbEFjdG9ycygpO1xyXG5cclxuICAgICAgaWYgKF9yZWFsUGxheWVyID09IE1heFN0dWRlbnRzKSB7XHJcbiAgICAgICAgLy93aGVuIG1heCBwbGF5ZXIgcmVxdWlyZWQgdG8gc3RhcnQgZ2FtZSBoYXMgYmVlbiBhZGRlZFxyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFJvb21WYWx1ZXMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCByZXF1aXJlZCBwbGF5ZXJzIGpvaW5lZCwgc3RhcnRpbmcgdGhlIGdhbWUuLlwiKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwicGxheWVycyBmb3VuZFwiKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTtcclxuICAgICAgICB9LCAxMDAwKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKHRydWUsIFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksIGZhbHNlLCBmYWxzZSwgZmFsc2UsIG51bGwsIGZhbHNlLCAwKTtcclxuICAgICAgICAvL1Bob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclwiLFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksdHJ1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoYWN0b3IuYWN0b3JOcik7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgam9pbmVkXCIpO1xyXG4gICAgICAvLyBjb25zb2xlLmVycm9yKFwiVG90YWwgUGxheWVyczogXCIrUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKSk7XHJcbiAgICB9KSxcclxuICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBsZWF2ZXMgYSByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckxlYXZlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgICAgKFBob3RvblJlZi5vbkFjdG9yTGVhdmUgPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgICBpZiAoIUdhbWVGaW5pc2hlZCAmJiAhUmVzdGFydFNwZWN0YXRlKSB7XHJcbiAgICAgICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoIWFjdG9yLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICBpZiAoIU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5MZWF2ZVJvb20pIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzcGVjdGF0b3IgbGVmdCwgc28gZG9udCBtaW5kLCBjb250IGdhbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgbGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBQaG90b25SZWZlcmVjZSA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5nZXRQaG90b25SZWYoKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJUdXJuID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICB2YXIgX3VJR2FtZU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICB2YXIgX3JlYWxQbGF5ZXIgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuR2V0UmVhbEFjdG9ycygpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgX2luaXRpYWxTZXR1cERvbmUgPSBQaG90b25SZWZlcmVjZS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfcmVhbFBsYXllciA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5IYW5kbGVQbGF5ZXJMZWF2ZShhY3RvciwgUGhvdG9uUmVmZXJlY2UsIF9tYW5hZ2VyLCBfcGxheWVyVHVybiwgX2luaXRpYWxTZXR1cERvbmUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfdUlHYW1lTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdUlHYW1lTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTE1MCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX2luaXRpYWxTZXR1cERvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZUFjdG9yQWN0aXZlRGF0YShhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuR2FtZU92ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3VJR2FtZU1hbmFnZXIpIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXN0YXJ0R2FtZSgxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzdGFydEdhbWUoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKF91SUdhbWVNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF91SUdhbWVNYW5hZ2VyLlNob3dUb2FzdChcInBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAxMTUwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuZ2V0U2NlbmVOYW1lKCkgPT0gXCJHYW1lUGxheVwiKSAvL2lmIHNjZW5lIGlzIGdhbWVwbGF5IGxldCBwbGF5ZXIgZmluaXNoIGdhbWUgZm9yY2VmdWxseVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwib3RoZXIgcGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDIwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3VJR2FtZU1hbmFnZXIuU2hvd1RvYXN0KFwicGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDExNTAsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9yZWFsUGxheWVyID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkhhbmRsZVBsYXllckxlYXZlKGFjdG9yLCBQaG90b25SZWZlcmVjZSwgX21hbmFnZXIsIF9wbGF5ZXJUdXJuLCBfaW5pdGlhbFNldHVwRG9uZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfaW5pdGlhbFNldHVwRG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5HYW1lT3Zlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdG9yIGhhcyBsZWZ0XCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coSXNHYW1lU3RhcnRlZCk7XHJcbiAgICAgICAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSAmJiAhSXNHYW1lU3RhcnRlZCkge1xyXG4gICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Qcm9jZXNzQ291bnRlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCkgPT0gMSAmJiAhUmVzdGFydFNwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBSZXN0YXJ0U3BlY3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc3RhcnRHYW1lKDE1MDApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInJlYXRydGVkXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBvd24gcHJvcGVydGllcyBnb3QgY2hhbmdlZFxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkFjdG9yUHJvcGVydGllc0NoYW5nZSA9IGZ1bmN0aW9uIChhY3Rvcikge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciByb29tIHByb3BlcnRpZXMgZ290IGNoYW5nZWRcclxuICAgICAgICAgICAgQG1ldGhvZCBvbk15Um9vbVByb3BlcnRpZXNDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uTXlSb29tUHJvcGVydGllc0NoYW5nZSA9IGZ1bmN0aW9uIChfZGF0YSkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHRvIGhhbmRsZSBlcnJvcnNcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvckNvZGVcclxuICAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1zZ1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkVycm9yID0gZnVuY3Rpb24gKGVycm9yQ29kZSwgZXJyb3JNc2cpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciBcIiArIGVycm9yQ29kZSArIFwiOiBcIiArIGVycm9yTXNnKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgYW4gZXZlbnQgaXMgcmVjZWl2ZWQgd2l0aCBzb21lIGRhdGFcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkV2ZW50XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBjb2RlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBjb250ZW50XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3Rvck5yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uRXZlbnQgPSBmdW5jdGlvbiAoY29kZSwgY29udGVudCwgYWN0b3JOcikge1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIHN3aXRjaCAoY29kZSkge1xyXG4gICAgICAgIGNhc2UgMTogLy9yZWNldmluZyBwbGF5ZXJkYXRhIGluZm9cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgUGxheWVySW5mb0RhdGEgPSBjb250ZW50LlBsYXllckluZm87XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIFBsYXllckluZm9EYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6IC8vc3RhcnQgdHVybiByYWlzZSBldmVudFxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBzdGFydCB0dXJuIGV2ZW50XCIpO1xyXG4gICAgICAgICAgdmFyIF9UdXJuID0gY29udGVudC5UdXJuTnVtYmVyO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDIsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfVHVybik7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOiAvLyBkaWNlIGNvdW50XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRpY2UgY291bnRcIik7XHJcbiAgICAgICAgICB2YXIgX2RpY2UgPSBjb250ZW50LkRpY2VDb3VudDtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgzLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RpY2UpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDogLy9yZWNlaW5nIHVzZXIgaWQgb2YgcGxheWVyIHdobyBoYXMgY29tcGxldGVkIHR1cm5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIHR1cm4gY29tcGxldGVkXCIpO1xyXG4gICAgICAgICAgdmFyIF9JRCA9IGNvbnRlbnQuVUlEO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDQsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfSUQpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTogLy9yZWNlaXZpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBjYXJkIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2NhcmQgPSBjb250ZW50LkNhcmREYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDUsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfY2FyZCk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OiAvL3JlY2VpdmUgZ2FtZSBvdmVyIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZ2FtZSBvdmVyIGNhbGxcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6IC8vcmVjZWl2ZSBvbmUgUXVlc3Rpb24gZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg3LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgODogLy9yZWNlaXZlIG9uZSBRdWVzdGlvbiByZXNwb25zZSBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIG9uZSBxdWVzdGlvIHJlc3BvbnNlIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoOCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDk6IC8vcmVjZWl2ZSBiYW5rcnVwdCBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGJhbmtydXB0IGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoOSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEwOiAvL3JlY2VpdmUgYmFja3NwYWNlIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgYmFja3NwYWNlIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTAsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMTogLy9yZWNlaXZlaW5nIHBhcnRuZXJzaGlwIG9mZmVyXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTEsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMjogLy9yZWNlaXZlaW5nIHBhcnRuZXJzaGlwIGFuc3dlciBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEyLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTM6IC8vcmVjZWl2aW5nIHByb2ZpdC9sb3NzIGRhdGEgZm9yIHBhcnRuZXJcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgYW53c2VyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTMsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNDogLy9yZWNlaXZpbmcgcm9vbSBjb21wbGV0ZSBkYXRhIHRvIHN0YXJ0IEdhbWVcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgYW53c2VyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJvb21Db21wbGV0ZWQoKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE1OiAvL3JlY2VpdmluZyBwYXlkYXkgaW5mb1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBpbmZvXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE1LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTY6IC8vcmVjZWl2aW5nIGdhbWUgb3ZlciBkYXRhIHRvIHN5bmNcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZ2FtZSBvdmVyIHN5bmMgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxNiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE3OiAvL3JlY2VpdmluZyBkYXRhIG9mIHBsYXllciB0byBnZXQgYWxsIHByb2ZpdCBuZXh0IHBheSBkYXlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGF0YSBvZiBwbGF5ZXIgdG8gZ2V0IGFsbCBwcm9maXQgbmV4dCBwYXkgZGF5XCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE3LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTg6IC8vcmVjZWl2aW5nIG9uZSBxdWVzdGlvbiBhcnJheVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkYXRhIGZvciBvbmUgcXVlc3Rpb24gYXJyYXlcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTgsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOTogLy9yZWNlaXZpbmcgZGVja3MgYXJyYXlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGF0YSBmb3IgZGVja3MgYXJyYXlcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTksIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyMDogLy9yZWNlaXZpbmcgZGVja3MgYXJyYXkgQ291bnRlclxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkYXRhIGZvciBkZWNrcyBhcnJheSBjb3VudGVyXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDIwLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjE6IC8vcmVjZWl2aW5nIGNhc2ggZGVkdWN0IGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgY2FzaCBkZWR1Y3QgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgyMSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAyMjogLy9yZWNlaXZpbmcgY2FzaCBhZGQgZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBjYXNoIGFkZCBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDIyLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxheWVyQ29udHJvbGxlcjtcclxuIl19