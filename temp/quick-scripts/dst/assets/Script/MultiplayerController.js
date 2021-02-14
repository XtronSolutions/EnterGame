
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
    this.ResetAllData();
    this.Init_MultiplayerController();
  },
  ToggleModeSelection: function ToggleModeSelection(_val // 1 means bot , 2 means real players
  ) {
    this.ModeSelection = _val;
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
        //room does not exists or is full
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

      if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == true) {
        //check if player who joined is spectate
        MultiplayerController.Instance.JoinedRoom = true;
        setTimeout(function () {
          cc.systemEvent.emit("ChangePanelScreen", true, true, "GamePlay");
        }, 1000); //function in UIManager
      }

      if (PhotonRef.myActor().getCustomProperty("RoomEssentials")["IsSpectate"] == false) {
        MultiplayerController.Instance.ProcessCounter();
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

        if (MultiplayerController.Instance.JoinedRoom == true && !IsGameStarted) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNdWx0aXBsYXllckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGhvdG9uUmVmIiwic3RhdGVUZXh0IiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiU2hvd1Jvb20iLCJHYW1lRmluaXNoZWQiLCJJc01hc3RlckNsaWVudCIsIlRvdGFsVGltZXIiLCJUaW1lclN0YXJ0ZWQiLCJTY2hlZHVsYXIiLCJNYXhTdHVkZW50cyIsIlJlc3RhcnRTcGVjdGF0ZSIsIklzR2FtZVN0YXJ0ZWQiLCJUaW1lb3V0cyIsIlJvb21Qcm9wZXJ0eSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllciIsInR5cGUiLCJJbnRlZ2VyIiwic2VyaWFsaXphYmxlIiwiSW5pdGlhbFNldHVwIiwiQm9vbGVhbiIsIlBsYXllckdhbWVJbmZvIiwiVGV4dCIsIlR1cm5OdW1iZXIiLCJBcHBfSW5mbyIsIkFwcElEIiwidG9vbHRpcCIsIkFwcFZlcnNpb24iLCJXc3MiLCJkaXNwbGF5TmFtZSIsIk1hc3RlclNlcnZlciIsIkZiQXBwSUQiLCJNdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDb21wb25lbnQiLCJQaG90b25BcHBJbmZvIiwiTWF4UGxheWVycyIsIk1heFNwZWN0YXRvcnMiLCJNb2RlU2VsZWN0aW9uIiwic3RhdGljcyIsIkluc3RhbmNlIiwiUmVzZXRBbGxEYXRhIiwiUmVzZXRSb29tVmFsdWVzIiwib25Mb2FkIiwiSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJUb2dnbGVNb2RlU2VsZWN0aW9uIiwiX3ZhbCIsIkdldEFjdGl2ZVN0YXR1cyIsIl91SUQiLCJfaXNBY3RpdmUiLCJfYXJyYXkiLCJHZXRfR2FtZU1hbmFnZXIiLCJpbmRleCIsImxlbmd0aCIsIlBsYXllclVJRCIsIklzQWN0aXZlIiwiR2V0U2VsZWN0ZWRNb2RlIiwiZ2FtZSIsImFkZFBlcnNpc3RSb290Tm9kZSIsIm5vZGUiLCJJbml0aWFsaXplUGhvdG9uIiwiY29uc29sZSIsImxvZyIsIkFwcEluZm8iLCJEZW1vTG9hZEJhbGFuY2luZyIsIkxlYXZlUm9vbSIsIlJvb21OYW1lIiwiTWVzc2FnZSIsIkpvaW5lZFJvb20iLCJDaGVja1JlZmVyZW5jZXMiLCJyZXF1aXJlIiwiUmVtb3ZlUGVyc2lzdE5vZGUiLCJyZW1vdmVQZXJzaXN0Um9vdE5vZGUiLCJnZXRTY2VuZU5hbWUiLCJzY2VuZU5hbWUiLCJfc2NlbmVJbmZvcyIsImkiLCJ1dWlkIiwiZGlyZWN0b3IiLCJfc2NlbmUiLCJfaWQiLCJ1cmwiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsIm1hdGNoIiwiVG9nZ2xlU2hvd1Jvb21fQm9vbCIsIl9zdGF0ZSIsIlRvZ2dsZUxlYXZlUm9vbV9Cb29sIiwiZ2V0UGhvdG9uUmVmIiwiUGhvdG9uQWN0b3IiLCJteUFjdG9yIiwiUm9vbUFjdG9ycyIsIm15Um9vbUFjdG9yc0FycmF5IiwiQ2hlY2tTcGVjdGF0ZSIsImN1c3RvbVByb3BlcnRpZXMiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJBcHBJZCIsIkZiQXBwSWQiLCJSZXF1ZXN0Q29ubmVjdGlvbiIsInN0YXRlIiwiaXNDb25uZWN0ZWRUb01hc3RlciIsImlzSW5Mb2JieSIsInN0YXJ0IiwiRGlzY29ubmVjdFBob3RvbiIsImlzSm9pbmVkVG9Sb29tIiwiZGlzY29ubmVjdCIsIlJlc2V0U3RhdGUiLCJPblJvb21OYW1lQ2hhbmdlIiwiT25NZXNzYWdlQ2hhbmdlIiwibXNnIiwiVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXMiLCJfcGxheWVyVXBkYXRlIiwiX3BsYXllclZhbHVlIiwiX2luaXRpYWxTZXR1cFVwZGF0ZSIsIl9pbml0aWFsU2V0dXBWYWx1ZSIsIl9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSIsIl9wbGF5ZXJHYW1lSW5mb1ZhbHVlIiwiX3R1cm5OdW1iZXJVcGRhdGUiLCJfdHVybk51bWJlcnZhbHVlIiwibXlSb29tIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDcmVhdGVSb29tIiwiX2RhdGEiLCJyb29tT3B0aW9ucyIsImlzVmlzaWJsZSIsImlzT3BlbiIsIm1heFBsYXllcnMiLCJjdXN0b21HYW1lUHJvcGVydGllcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsIlN0dWRlbnREYXRhIiwiQ291bnRlciIsInNldFVzZXJJZCIsInVzZXJJRCIsIlJvb21JRCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIkRhdGUiLCJub3ciLCJjcmVhdGVSb29tIiwiSm9pblJvb20iLCJfcm9vbU5hbWUiLCJqb2luUm9vbSIsIkpvaW5SYW5kb21Sb29tIiwiZXhwZWN0ZWRDdXN0b21Sb29tUHJvcGVydGllcyIsImpvaW5SYW5kb21Sb29tIiwiU2VuZENhcmREYXRhIiwicmFpc2VFdmVudCIsIkNhcmREYXRhIiwic2VuZGVyTmFtZSIsInNlbmRlcklEIiwiYWN0b3JOciIsInJlY2VpdmVycyIsIlBob3RvbiIsIkxvYWRCYWxhbmNpbmciLCJDb25zdGFudHMiLCJSZWNlaXZlckdyb3VwIiwiQWxsIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwiU2VuZEdhbWVPdmVyIiwiRGF0YSIsIlNlbmRHYW1lT3ZlckRhdGEiLCJTZW5kU2VsZWN0ZWRQbGF5ZXJGb3JQcm9maXQiLCJPdGhlcnMiLCJTZW5kQmFua3J1cHREYXRhIiwiU2VuZERhdGEiLCJQbGF5ZXJJbmZvIiwiU2VuZE9uZVF1ZXN0aW9uRGF0YSIsIlNlbmRPbmVRdWVzdGlvbkFycmF5cyIsIlNlbmREZWNrc0FycmF5cyIsIlNlbmREZWNrc0FycmF5Q291bnRlciIsIlNlbmRQYXJ0bmVyUHJvZml0TG9zcyIsIlNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YSIsIkRpY2VSb2xsRXZlbnQiLCJEaWNlQ291bnQiLCJTZW5kR29CYWNrU3BhY2VEYXRhIiwiU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhIiwiU2VuZFBhcnRuZXJTaGlwQW5zd2VyRGF0YSIsIlNlbmRJbmZvIiwiU3luY1R1cm5Db21wbGV0aW9uIiwiVUlEIiwiU3RhcnRUdXJuIiwidHJhY2UiLCJTaG93VG9hc3QiLCJDYWxsUmVjaWV2ZUV2ZW50IiwiX2V2ZW50Q29kZSIsIl9zZW5kZXJOYW1lIiwiX3NlbmRlcklEIiwiSW5zdGFuY2VOdWxsIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJzZXRUaW1lb3V0IiwiUmVjZWl2ZUV2ZW50IiwiRGlzY29ubmVjdERhdGEiLCJSZXN0YXJ0R2FtZSIsIl90aW1lciIsImNsZWFyVGltZW91dCIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJsb2FkU2NlbmUiLCJDaGVja01hc3RlckNsaWVudCIsIl9pc01hc3RlciIsIm15Um9vbU1hc3RlckFjdG9yTnIiLCJDaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQiLCJHZXRSZWFsQWN0b3JzIiwiX3JlYWxQbGF5ZXIiLCJBbGxQbGF5ZXJzIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJSb29tQ291bnRlciIsIlNlbmRSb29tQ29tcGxldGVkRGF0YSIsIkdldF9VSU1hbmFnZXIiLCJFeGl0Q29ubmVjdGluZyIsIlByb2Nlc3NDb3VudGVyIiwiX21hc3RlciIsIl9jb3VudGVyIiwiUm9vbUNvbXBsZXRlZCIsInN5c3RlbUV2ZW50IiwiZW1pdCIsInB1c2giLCJVcGRhdGVBY3RvckFjdGl2ZURhdGEiLCJfYWN0b3IiLCJfYWN0b3JzQXJyYXkiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIkhhbmRsZVBsYXllckxlYXZlIiwiYWN0b3IiLCJQaG90b25SZWZlcmVjZSIsIl9tYW5hZ2VyIiwiX3BsYXllclR1cm4iLCJfaW5pdGlhbFNldHVwRG9uZSIsIl9pc1NwZWN0YXRlIiwiUmVtb3ZlRnJvbUNoZWNrQXJyYXkiLCJ0b1N0cmluZyIsIkNoZWNrVHVybkNvbXBsZXRlIiwiQ2hhbmdlVHVybkZvcmNlZnVsbHkiLCJTZXRQbGF5ZXJMZWZ0IiwiUmVzZXRTb21lVmFsdWVzIiwiX3BsYXllcmZvdW5kIiwic3BsaWNlIiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiU3luY0RhdGEiLCJ1cGRhdGUiLCJkdCIsIm9uU3RhdGVDaGFuZ2UiLCJMQkMiLCJMb2FkQmFsYW5jaW5nQ2xpZW50IiwiU3RhdGVUb05hbWUiLCJUb2dnbGVQcm9maWxlU2NyZWVuX1NwZWN0YXRlVUkiLCJUb2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkiLCJsb2dnZXIiLCJkZWJ1ZyIsIm1lc3MiLCJpbmZvIiwicGFyYW0iLCJ3YXJuIiwicGFyYW0xIiwicGFyYW0yIiwicGFyYW0zIiwiVG9nZ2xlTG9hZGluZ05vZGUiLCJleGNlcHRpb24iLCJmb3JtYXQiLCJvblJvb21MaXN0Iiwicm9vbXMiLCJSZXNldFJvb21MaXN0IiwiVXBkYXRlUm9vbXNMaXN0X1NwZWN0YXRlVUkiLCJwbGF5ZXJDb3VudCIsIm9uUm9vbUxpc3RVcGRhdGUiLCJyb29tc1VwZGF0ZWQiLCJyb29tc0FkZGVkIiwicm9vbXNSZW1vdmVkIiwib25Kb2luUm9vbSIsImxvYWRCYWxhbmNpbmdDbGllbnQiLCJ1c2VySWQiLCJfY3VzdG9tUHJvcGVydGllcyIsIm9uQWN0b3JKb2luIiwibXlSb29tQWN0b3JDb3VudCIsIm9uQWN0b3JMZWF2ZSIsIkdhbWVPdmVyIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIkdldFR1cm5OdW1iZXIiLCJfdUlHYW1lTWFuYWdlciIsIm9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlIiwib25NeVJvb21Qcm9wZXJ0aWVzQ2hhbmdlIiwib25FcnJvciIsImVycm9yQ29kZSIsImVycm9yTXNnIiwib25FdmVudCIsImNvZGUiLCJjb250ZW50IiwiUGxheWVySW5mb0RhdGEiLCJfVHVybiIsIl9kaWNlIiwiX0lEIiwiX2NhcmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSUEsU0FBSjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLEtB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QkFBcUIsQ0FBQ08sUUFBdEIsQ0FBK0JvSixnQkFBL0IsQ0FBZ0QsRUFBaEQsRUFBb0RyQyxVQUFwRCxFQUFnRUMsUUFBaEUsRUFBMEU3QixLQUExRTtBQUVBOztBQUNGLGFBQUssRUFBTDtBQUFTO0FBQ1A5RCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwrQkFBWjtBQUNBLGNBQUk2RCxLQUFLLEdBQUdzSyxPQUFPLENBQUM3SCxJQUFwQjtBQUNBLGNBQUliLFVBQVUsR0FBRzBJLE9BQU8sQ0FBQzFJLFVBQXpCO0FBQ0EsY0FBSUMsUUFBUSxHQUFHeUksT0FBTyxDQUFDekksUUFBdkI7QUFFQXZILFVBQUFBLHFCQUFxQixDQUFDTyxRQUF0QixDQUErQm9KLGdCQUEvQixDQUFnRCxFQUFoRCxFQUFvRHJDLFVBQXBELEVBQWdFQyxRQUFoRSxFQUEwRTdCLEtBQTFFO0FBRUE7O0FBQ0YsYUFBSyxFQUFMO0FBQVM7QUFDUDlELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVDQUFaO0FBQ0EsY0FBSTZELEtBQUssR0FBR3NLLE9BQU8sQ0FBQzdILElBQXBCO0FBQ0EsY0FBSWIsVUFBVSxHQUFHMEksT0FBTyxDQUFDMUksVUFBekI7QUFDQSxjQUFJQyxRQUFRLEdBQUd5SSxPQUFPLENBQUN6SSxRQUF2QjtBQUVBdkgsVUFBQUEscUJBQXFCLENBQUNPLFFBQXRCLENBQStCb0osZ0JBQS9CLENBQWdELEVBQWhELEVBQW9EckMsVUFBcEQsRUFBZ0VDLFFBQWhFLEVBQTBFN0IsS0FBMUU7QUFFQTs7QUFDRjtBQXJMRjtBQXVMRCxLQXpMRDtBQTBMRDtBQTlxRGtDLENBQVQsQ0FBNUI7QUFpckRBNEssTUFBTSxDQUFDQyxPQUFQLEdBQWlCdlEscUJBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJpYWJsZXNcclxudmFyIFBob3RvblJlZjtcclxudmFyIHN0YXRlVGV4dCA9IFwiXCI7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgU2hvd1Jvb20gPSBmYWxzZTtcclxudmFyIEdhbWVGaW5pc2hlZCA9IGZhbHNlO1xyXG52YXIgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxudmFyIFRvdGFsVGltZXIgPSAzMDtcclxudmFyIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG52YXIgU2NoZWR1bGFyID0gbnVsbDtcclxudmFyIE1heFN0dWRlbnRzID0gNjtcclxudmFyIFJlc3RhcnRTcGVjdGF0ZSA9IGZhbHNlO1xyXG52YXIgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG52YXIgVGltZW91dHMgPSBbXTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gUm9vbVByb3BlcnR5LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvb21Qcm9wZXJ0eSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlJvb21Qcm9wZXJ0eVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllcjoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSW5pdGlhbFNldHVwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyR2FtZUluZm86IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFR1cm5OdW1iZXI6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBkYXRhIHJlbGF0ZWQgdG8gQXBwX0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQXBwX0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJBcHBfSW5mb1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIEFwcElEOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBcHAgaWQgZm9ybSBwaG90b24gZGFzaGJvYXJkXCIsXHJcbiAgICB9LFxyXG4gICAgQXBwVmVyc2lvbjoge1xyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQXBwIHZlcnNpb24gZm9yIHBob3RvblwiLFxyXG4gICAgfSxcclxuICAgIFdzczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc1NlY3VyZVwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklmIHBob3RvbiBzaG91bGQgdXNlIHNlY3VyZSBhbmQgcmVsaWFibGUgcHJvdG9jb2xzXCIsXHJcbiAgICB9LFxyXG4gICAgTWFzdGVyU2VydmVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJtYXN0ZXIgc2VydmVyIGZvciBwaG90b24gdG8gY29ubmVjdFwiLFxyXG4gICAgfSxcclxuICAgIEZiQXBwSUQ6IHtcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkZCIGFwcCBpZCB1c2VkIGZvciBGQiBhdXRoZXJpemF0aW9uXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGRhdGEgcmVsYXRlZCB0byBNdWx0aXBsYXllckNvbnRyb2xsZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE11bHRpcGxheWVyQ29udHJvbGxlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIk11bHRpcGxheWVyQ29udHJvbGxlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQaG90b25BcHBJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IEFwcF9JbmZvLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTWF4UGxheWVyczoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTWF4U3BlY3RhdG9yczoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTW9kZVNlbGVjdGlvbjoge1xyXG4gICAgICAvLyAxIG1lYW5zIGJvdCAsIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgc3RhdGljczoge1xyXG4gICAgLy9jcmVhdGluZyBzdGF0aWMgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICBJbnN0YW5jZTogbnVsbCxcclxuICB9LFxyXG5cclxuICBSZXNldEFsbERhdGEoKSB7XHJcbiAgICBUaW1lb3V0cyA9IFtdO1xyXG4gICAgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgUGhvdG9uUmVmID0gbnVsbDtcclxuICAgIHN0YXRlVGV4dCA9IFwiXCI7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgU2hvd1Jvb20gPSBmYWxzZTtcclxuICAgIEdhbWVGaW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgSXNNYXN0ZXJDbGllbnQgPSBmYWxzZTtcclxuICAgIFRvdGFsVGltZXIgPSAzMDtcclxuICAgIFRpbWVyU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgU2NoZWR1bGFyID0gbnVsbDtcclxuICAgIHRoaXMuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICBNYXhTdHVkZW50cyA9IDY7XHJcbiAgICBSZXN0YXJ0U3BlY3RhdGUgPSBmYWxzZTtcclxuICB9LFxyXG4gIC8vdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIGNyZWF0ZWRcclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsRGF0YSgpO1xyXG4gICAgdGhpcy5Jbml0X011bHRpcGxheWVyQ29udHJvbGxlcigpO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZU1vZGVTZWxlY3Rpb24oXHJcbiAgICBfdmFsIC8vIDEgbWVhbnMgYm90ICwgMiBtZWFucyByZWFsIHBsYXllcnNcclxuICApIHtcclxuICAgIHRoaXMuTW9kZVNlbGVjdGlvbiA9IF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0QWN0aXZlU3RhdHVzKF91SUQgPSBcIlwiKSB7XHJcbiAgICB2YXIgX2lzQWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgX2FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfYXJyYXlbaW5kZXhdLlBsYXllclVJRCA9PSBfdUlEKSB7XHJcbiAgICAgICAgaWYgKF9hcnJheVtpbmRleF0uSXNBY3RpdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIF9pc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfaXNBY3RpdmU7XHJcbiAgfSxcclxuXHJcbiAgR2V0U2VsZWN0ZWRNb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuTW9kZVNlbGVjdGlvbjtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IEluaXRpYWxpemUgc29tZSBlc3NlbnRhaWxzIGRhdGEgZm9yIG11bHRpcGxheWVyIGNvbnRyb2xsZXIgY2xhc3NcclxuICAgIEBtZXRob2QgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXJcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgSW5pdF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKSB7XHJcbiAgICBpZiAoIU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSkge1xyXG4gICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICB0aGlzLkluaXRpYWxpemVQaG90b24oKTtcclxuICAgICAgY29uc29sZS5sb2coQXBwSW5mbyk7XHJcbiAgICAgIFBob3RvblJlZiA9IG5ldyBEZW1vTG9hZEJhbGFuY2luZygpO1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuTGVhdmVSb29tID0gZmFsc2U7XHJcbiAgICB0aGlzLlJvb21OYW1lID0gXCJcIjtcclxuICAgIHRoaXMuTWVzc2FnZSA9IFwiXCI7XHJcbiAgICBTaG93Um9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2hlY2sgcmVmZXJlbmNlIHRvIHNvbWUgdmFyaWFibGVzIGFuZCBjbGFzc2VzXHJcbiAgICBAbWV0aG9kIENoZWNrUmVmZXJlbmNlc1xyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJlbW92ZSBwZXJzaXN0IG5vZGUgd2hlbiB3YW50IHRvIHJlc3RhcnQgc2NlbmVcclxuICAgIEBtZXRob2QgUmVtb3ZlUGVyc2lzdE5vZGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgUmVtb3ZlUGVyc2lzdE5vZGUoKSB7XHJcbiAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UgPSBudWxsO1xyXG4gICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIGdldCBuYW1lIG9mIGN1cnJlbnQgb3BlbmVkIHNjZW5lXHJcbiAgICBAbWV0aG9kIGdldFNjZW5lTmFtZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIHtzdHJpbmd9IHNjZW5lTmFtZVxyXG4gICAgKiovXHJcbiAgZ2V0U2NlbmVOYW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2NlbmVOYW1lO1xyXG4gICAgdmFyIF9zY2VuZUluZm9zID0gY2MuZ2FtZS5fc2NlbmVJbmZvcztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3NjZW5lSW5mb3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKF9zY2VuZUluZm9zW2ldLnV1aWQgPT0gY2MuZGlyZWN0b3IuX3NjZW5lLl9pZCkge1xyXG4gICAgICAgIHNjZW5lTmFtZSA9IF9zY2VuZUluZm9zW2ldLnVybDtcclxuICAgICAgICBzY2VuZU5hbWUgPSBzY2VuZU5hbWUuc3Vic3RyaW5nKHNjZW5lTmFtZS5sYXN0SW5kZXhPZihcIi9cIikgKyAxKS5tYXRjaCgvW15cXC5dKy8pWzBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2NlbmVOYW1lO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZnVuY3Rpb24gdG8gc2V0IFwiU2hvd1Jvb21cIiBib29sIHZhbHVlXHJcbiAgICBAbWV0aG9kIFRvZ2dsZVNob3dSb29tX0Jvb2xcclxuICAgIEBwYXJhbSB7Ym9vbGVhbn0gX3N0YXRlXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICoqL1xyXG4gIFRvZ2dsZVNob3dSb29tX0Jvb2woX3N0YXRlKSB7XHJcbiAgICBTaG93Um9vbSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIHRvIHNldCBcIkxlYXZlUm9vbVwiIGJvb2wgdmFsdWVcclxuICAgIEBtZXRob2QgVG9nZ2xlTGVhdmVSb29tX0Jvb2xcclxuICAgIEBwYXJhbSB7Ym9vbGVhbn0gX3N0YXRlXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICoqL1xyXG4gIFRvZ2dsZUxlYXZlUm9vbV9Cb29sKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5MZWF2ZVJvb20gPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIFBob3RvbiBcIlBob3RvblJlZlwiIGluc3RhbmNlIGNyZWF0ZWQgYnkgbXVsdGlwbGF5ZXIgY2xhc3NcclxuICAgIEBtZXRob2QgZ2V0UGhvdG9uUmVmXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gUGhvdG9uUmVmXHJcbiAgICAqKi9cclxuICBnZXRQaG90b25SZWYoKSB7XHJcbiAgICByZXR1cm4gUGhvdG9uUmVmO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmV0dXJucyBteUFjdG9yIGluc3RhbmNlIGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFBob3RvbkFjdG9yXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMge29iamVjdH0gQWN0b3JcclxuICAgICoqL1xyXG4gIFBob3RvbkFjdG9yKCkge1xyXG4gICAgcmV0dXJuIFBob3RvblJlZi5teUFjdG9yKCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByZXR1cm5zIG15Um9vbUFjdG9yc0FycmF5IGNyZWF0ZWQgYnkgcGhvdG9uXHJcbiAgICBAbWV0aG9kIFJvb21BY3RvcnNcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7b2JqZWN0fSBBY3RvclxyXG4gICAgKiovXHJcbiAgUm9vbUFjdG9ycygpIHtcclxuICAgIHJldHVybiBQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJldHVybnMgaXNTcGVjdGF0ZSB2YXJpYWJsZSBmcm9tIGN1c3RvbSBwcm9wZXJ0eSBvZiBjdXJyZW50IGFjdG9yXHJcbiAgICBAbWV0aG9kIENoZWNrU3BlY3RhdGVcclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gaXNTcGVjdGF0ZVxyXG4gICAgKiovXHJcbiAgQ2hlY2tTcGVjdGF0ZSgpIHtcclxuICAgIHJldHVybiBQaG90b25SZWYubXlBY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IEluaXRpYWxpemUgcGhvdG9uIHdpdGggYXBwaWQsYXBwIHZlcnNpb24sIFdzcyBldGNcclxuICAgIEBtZXRob2QgSW5pdGlhbGl6ZVBob3RvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBJbml0aWFsaXplUGhvdG9uKCkge1xyXG4gICAgQXBwSW5mby5BcHBJZCA9IHRoaXMuUGhvdG9uQXBwSW5mby5BcHBJRDtcclxuICAgIEFwcEluZm8uQXBwVmVyc2lvbiA9IHRoaXMuUGhvdG9uQXBwSW5mby5BcHBWZXJzaW9uO1xyXG4gICAgQXBwSW5mby5Xc3MgPSB0aGlzLlBob3RvbkFwcEluZm8uV3NzO1xyXG4gICAgQXBwSW5mby5NYXN0ZXJTZXJ2ZXIgPSB0aGlzLlBob3RvbkFwcEluZm8uTWFzdGVyU2VydmVyO1xyXG4gICAgQXBwSW5mby5GYkFwcElkID0gdGhpcy5QaG90b25BcHBJbmZvLkZiQXBwSUQ7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIGNvbm5lY3Rpb24gcmVxdWVzdCB0byBwaG90b25cclxuICAgIEBtZXRob2QgUmVxdWVzdENvbm5lY3Rpb25cclxuICAgIEBwYXJhbSBub25lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgUmVxdWVzdENvbm5lY3Rpb24oKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLnN0YXRlID09IDUgfHwgUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlKSBjb25zb2xlLmxvZyhcImFscmVhZHkgY29ubmVjdGVkXCIpO1xyXG4gICAgZWxzZSBQaG90b25SZWYuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IERpc2Nvbm5lY3QgZnJvbSBwaG90b25cclxuICAgIEBtZXRob2QgRGlzY29ubmVjdFBob3RvblxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBEaXNjb25uZWN0UGhvdG9uKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIFBob3RvblJlZi5kaXNjb25uZWN0KCk7XHJcbiAgICAgIHRoaXMuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgICAvL1Bob3RvblJlZi5sZWF2ZVJvb20oKTtcclxuICAgICAgdGhpcy5SZXNldFN0YXRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vdCBpbnNpZGUgYW55IHJvb20gb3IgbG9iYnkgb3IgY29ubmVjdGVkIHRvIHBob3RvblwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJlc2V0aW5nIGZldyB2YWx1ZXNcclxuICAgIEBtZXRob2QgUmVzZXRTdGF0ZVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBSZXNldFN0YXRlKCkge1xyXG4gICAgSXNHYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5MZWF2ZVJvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgU2hvd1Jvb20gPSBmYWxzZTtcclxuICAgIHN0YXRlVGV4dCA9IFwiXCI7XHJcbiAgICB0aGlzLlJlc2V0Um9vbVZhbHVlcygpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gcm9vbSBuYW1lIGdvdCBpbnB1dCBmcm9tIGdhbWVcclxuICAgIEBtZXRob2QgT25Sb29tTmFtZUNoYW5nZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBPblJvb21OYW1lQ2hhbmdlKG5hbWUpIHtcclxuICAgIHRoaXMuUm9vbU5hbWUgPSBuYW1lO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gbWVzc2FnZSB3aW5kb3cgZ290IGlucHV0IGZyb20gZ2FtZVxyXG4gICAgQG1ldGhvZCBPbk1lc3NhZ2VDaGFuZ2VcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBtc2dcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBPbk1lc3NhZ2VDaGFuZ2UobXNnKSB7XHJcbiAgICB0aGlzLk1lc3NhZ2UgPSBtc2c7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSB1cGRhdGUgY3VzdG9tIHJvb20gcHJvcGVydGllc1xyXG4gICAgQG1ldGhvZCBVcGRhdGVSb29tQ3VzdG9tUHJvcGVyaXRlc1xyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKF9wbGF5ZXJVcGRhdGUgPSBmYWxzZSwgX3BsYXllclZhbHVlID0gMCwgX2luaXRpYWxTZXR1cFVwZGF0ZSA9IGZhbHNlLCBfaW5pdGlhbFNldHVwVmFsdWUgPSBmYWxzZSwgX3BsYXllckdhbWVJbmZvVXBkYXRlID0gZmFsc2UsIF9wbGF5ZXJHYW1lSW5mb1ZhbHVlID0gbnVsbCwgX3R1cm5OdW1iZXJVcGRhdGUgPSBmYWxzZSwgX3R1cm5OdW1iZXJ2YWx1ZSA9IDApIHtcclxuICAgIGlmIChfcGxheWVyVXBkYXRlKSBQaG90b25SZWYubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJcIiwgX3BsYXllclZhbHVlLCB0cnVlKTtcclxuXHJcbiAgICBpZiAoX2luaXRpYWxTZXR1cFVwZGF0ZSkgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIsIF9pbml0aWFsU2V0dXBWYWx1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKF9wbGF5ZXJHYW1lSW5mb1VwZGF0ZSkgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIiwgX3BsYXllckdhbWVJbmZvVmFsdWUsIHRydWUpO1xyXG5cclxuICAgIGlmIChfdHVybk51bWJlclVwZGF0ZSkgUGhvdG9uUmVmLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLCBfdHVybk51bWJlcnZhbHVlLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNyZWF0ZSByb29tIHJlcXVlc3RcclxuICAgIEBtZXRob2QgQ3JlYXRlUm9vbVxyXG4gICAgQHBhcmFtIG5vbmVcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBDcmVhdGVSb29tKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuc3RhdGUgPT0gOCkge1xyXG4gICAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gZmFsc2UpIHtcclxuICAgICAgICB2YXIgX2RhdGEgPSBuZXcgUm9vbVByb3BlcnR5KCk7XHJcbiAgICAgICAgX2RhdGEuUGxheWVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIHJvb21PcHRpb25zID0ge1xyXG4gICAgICAgICAgaXNWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgaXNPcGVuOiB0cnVlLFxyXG4gICAgICAgICAgbWF4UGxheWVyczogdGhpcy5NYXhQbGF5ZXJzICsgdGhpcy5NYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgY3VzdG9tR2FtZVByb3BlcnRpZXM6IF9kYXRhLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woZmFsc2UpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkubmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWU7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIkRhdGFcIiwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEpO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB7fSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIsIHsgSXNTcGVjdGF0ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIsIHsgQ291bnRlcjogVG90YWxUaW1lciB9KTtcclxuICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgICAgdmFyIFJvb21JRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERhdGUubm93KCkpO1xyXG5cclxuICAgICAgICBQaG90b25SZWYuY3JlYXRlUm9vbShcIlJvb21fXCIgKyBSb29tSUQsIHJvb21PcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBqb2luIHJvb20gcmVxdWVzdCBieSBuYW1lXHJcbiAgICBAbWV0aG9kIEpvaW5Sb29tXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gX3Jvb21OYW1lXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgSm9pblJvb20oX3Jvb21OYW1lKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLnN0YXRlID09IDUgfHwgUGhvdG9uUmVmLmlzQ29ubmVjdGVkVG9NYXN0ZXIoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5pc0luTG9iYnkoKSA9PSB0cnVlIHx8IFBob3RvblJlZi5zdGF0ZSA9PSA4KSB7XHJcbiAgICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSBmYWxzZSB8fCBQaG90b25SZWYuc3RhdGUgIT0gOCkge1xyXG4gICAgICAgIHZhciByb29tT3B0aW9ucyA9IHtcclxuICAgICAgICAgIGlzVmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgIGlzT3BlbjogZmFsc2UsXHJcbiAgICAgICAgICBtYXhQbGF5ZXJzOiB0aGlzLk1heFBsYXllcnMgKyB0aGlzLk1heFNwZWN0YXRvcnMsXHJcbiAgICAgICAgICAvL1wiY3VzdG9tR2FtZVByb3BlcnRpZXNcIjp7XCJSb29tRXNzZW50aWFsc1wiOiB7SXNTcGVjdGF0ZTp0cnVlfX1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlRvZ2dsZUxlYXZlUm9vbV9Cb29sKGZhbHNlKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLm5hbWUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJEYXRhXCIsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhKTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwge30pO1xyXG4gICAgICAgIFBob3RvblJlZi5teUFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiLCB7IElzU3BlY3RhdGU6IHRydWUgfSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Db3VudGVyXCIsIHsgQ291bnRlcjogVG90YWxUaW1lciB9KTtcclxuICAgICAgICBQaG90b25SZWYuc2V0VXNlcklkKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcblxyXG4gICAgICAgIFBob3RvblJlZi5qb2luUm9vbShfcm9vbU5hbWUsIHJvb21PcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBqb2luIHJhbmRvbSByb29tXHJcbiAgICBAbWV0aG9kIEpvaW5SYW5kb21Sb29tXHJcbiAgICBAcGFyYW0gbm9uZVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEpvaW5SYW5kb21Sb29tKCkge1xyXG4gICAgaWYgKFBob3RvblJlZi5zdGF0ZSA9PSA1IHx8IFBob3RvblJlZi5pc0Nvbm5lY3RlZFRvTWFzdGVyKCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuaXNJbkxvYmJ5KCkgPT0gdHJ1ZSB8fCBQaG90b25SZWYuc3RhdGUgPT0gOCkge1xyXG4gICAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gZmFsc2UgfHwgUGhvdG9uUmVmLnN0YXRlICE9IDgpIHtcclxuICAgICAgICB2YXIgX2RhdGEgPSBuZXcgUm9vbVByb3BlcnR5KCk7XHJcbiAgICAgICAgX2RhdGEuUGxheWVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIHJvb21PcHRpb25zID0ge1xyXG4gICAgICAgICAgLy9cImV4cGVjdGVkTWF4UGxheWVyc1wiOnRoaXMuTWF4UGxheWVycytNYXhTcGVjdGF0b3JzLFxyXG4gICAgICAgICAgZXhwZWN0ZWRDdXN0b21Sb29tUHJvcGVydGllczogX2RhdGEsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChmYWxzZSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiRGF0YVwiLCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YSk7XHJcbiAgICAgICAgUGhvdG9uUmVmLm15QWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHt9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIiwgeyBJc1NwZWN0YXRlOiBmYWxzZSB9KTtcclxuICAgICAgICBQaG90b25SZWYubXlBY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUm9vbUNvdW50ZXJcIiwgeyBDb3VudGVyOiBUb3RhbFRpbWVyIH0pO1xyXG4gICAgICAgIFBob3RvblJlZi5zZXRVc2VySWQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEKTtcclxuXHJcbiAgICAgICAgUGhvdG9uUmVmLmpvaW5SYW5kb21Sb29tKHJvb21PcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgam9pbmVkIHRoZSByb29tXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGNvbm5lY3RlZCBvciBjb25uZWN0aW9uIGlzIGRyb3BwZWQsIHBsZWFzZSBjb25uZWN0IHRvIHBob3RvbiBhZ2Fpbi5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIGNhcmQgaW5kZXggb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRDYXJkRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZENhcmREYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgY2FyZCBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA1LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBDYXJkRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBnYW1lIG92ZXIgY2FsbFxyXG4gICAgQG1ldGhvZCBTZW5kR2FtZU92ZXJcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRHYW1lT3ZlcihfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGdhbWUgb3ZlciBjYWxsXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA2LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZEdhbWVPdmVyRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGdhbWUgb3ZlciBkYXRhIHRvIHN5bmNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE2LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VuZFNlbGVjdGVkUGxheWVyRm9yUHJvZml0KF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgZ2FtZSBvdmVyIGRhdGEgdG8gc3luY1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTcsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgYmFja3J1cHQgZGF0YVxyXG4gICAgQG1ldGhvZCBTZW5kQmFua3J1cHREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kQmFua3J1cHREYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgYmFua3J1cGN5IGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDksXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgUGxheWVyIERhdGEgb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmREYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kRGF0YShfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIHBsYXllciBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBQbGF5ZXJJbmZvOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5BbGwgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBTZW5kIG9uZSBxdWVzdGlvbiBEYXRhIG92ZXIgbmV0d29ya1xyXG4gICAgQG1ldGhvZCBTZW5kT25lUXVlc3Rpb25EYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kT25lUXVlc3Rpb25EYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDcsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kT25lUXVlc3Rpb25BcnJheXMoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBvbmUgcXVlc3Rpb24gYXJyYXlzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxOCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbmREZWNrc0FycmF5cyhfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGRlY2tzIGFycmF5c1wiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTksXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kRGVja3NBcnJheUNvdW50ZXIoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBkZWNrcyBhcnJheXMgY291bnRlcnNcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDIwLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvKipcclxuICAgIEBzdW1tYXJ5IFNlbmQgcHJvZml0IG9yIGxvc3MgdG8geW91ciBwYXNydG5lclxyXG4gICAgQG1ldGhvZCBTZW5kUGFydG5lclByb2ZpdExvc3NcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRQYXJ0bmVyUHJvZml0TG9zcyhfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG9uZSBxdWVzdGlvbiBkYXRhXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxMyxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuT3RoZXJzIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCBvbmUgcXVlc3Rpb24gcmVzcG9uc2Ugb3ZlciBuZXR3b3JrXHJcbiAgICBAbWV0aG9kIFNlbmRPbmVRdWVzdGlvblJlc3BvbnNlRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZE9uZVF1ZXN0aW9uUmVzcG9uc2VEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgb25lIHF1ZXN0aW9uIHJlc3BvbnNlIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDgsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgZGljZSBkYXRhXHJcbiAgICBAbWV0aG9kIERpY2VSb2xsRXZlbnRcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIERpY2VSb2xsRXZlbnQoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBkaWNlIGNvdW50XCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAzLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEaWNlQ291bnQ6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLkFsbCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmQgZ28gYmFjayBzcGFjZXMgZGF0YVxyXG4gICAgQG1ldGhvZCBTZW5kR29CYWNrU3BhY2VEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kR29CYWNrU3BhY2VEYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmQgZ28gYmFjayBzcGFjZXMgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTAsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHNlbmRpbmcgb3BlbiBpbnZpdGF0aW9uIHRvIGFsbCBwbGF5ZXJzIGZvciBwYXJ0bmVyIHNoaXBcclxuICAgIEBtZXRob2QgU2VuZFBhcnRuZXJTaGlwT2ZmZXJEYXRhXHJcbiAgICBAcGFyYW0ge09iamVjdH0gX2RhdGFcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTZW5kUGFydG5lclNoaXBPZmZlckRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBwYXJ0bmVyIHNoaXAgb2ZmZXJcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDExLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kaW5nIHBhcnRuZXIgYW5zd2VyIGRhdGEgKGFjY2VwdCBvciByZWplY3QpXHJcbiAgICBAbWV0aG9kIFNlbmRQYXJ0bmVyU2hpcEFuc3dlckRhdGFcclxuICAgIEBwYXJhbSB7T2JqZWN0fSBfZGF0YVxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFNlbmRQYXJ0bmVyU2hpcEFuc3dlckRhdGEoX2RhdGEpIHtcclxuICAgIGlmIChQaG90b25SZWYuaXNKb2luZWRUb1Jvb20oKSA9PSB0cnVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBwYXJ0ZW5yc2hpcCBhbnN3ZXIgZGF0YVwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMTIsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGE6IF9kYXRhLFxyXG4gICAgICAgICAgICBzZW5kZXJOYW1lOiBQaG90b25SZWYubXlBY3RvcigpLm5hbWUsXHJcbiAgICAgICAgICAgIHNlbmRlcklEOiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyByZWNlaXZlcnM6IFBob3Rvbi5Mb2FkQmFsYW5jaW5nLkNvbnN0YW50cy5SZWNlaXZlckdyb3VwLk90aGVycyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG5vdCBpbiByb29tLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZW5kSW5mbyhfZGF0YSkge1xyXG4gICAgaWYgKFBob3RvblJlZi5pc0pvaW5lZFRvUm9vbSgpID09IHRydWUpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIGluZm9cIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDE1LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhOiBfZGF0YSxcclxuICAgICAgICAgICAgc2VuZGVyTmFtZTogUGhvdG9uUmVmLm15QWN0b3IoKS5uYW1lLFxyXG4gICAgICAgICAgICBzZW5kZXJJRDogUGhvdG9uUmVmLm15QWN0b3IoKS5hY3Rvck5yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgcmVjZWl2ZXJzOiBQaG90b24uTG9hZEJhbGFuY2luZy5Db25zdGFudHMuUmVjZWl2ZXJHcm91cC5PdGhlcnMgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBub3QgaW4gcm9vbS5cIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBzZW5kIHVzZXIgaWQgb2YgcGxheWVyIHRvIGFsbCBvdGhlciB3aG8gaGFkIGNvbXBsZXRlZCB0aGVpciB0dXJuXHJcbiAgICBAbWV0aG9kIFN5bmNUdXJuQ29tcGxldGlvblxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU3luY1R1cm5Db21wbGV0aW9uKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgdHVybiBjb21wbGV0aW9uIGRhdGFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBQaG90b25SZWYucmFpc2VFdmVudChcclxuICAgICAgICAgIDQsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFVJRDogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU3RhcnQgVHVybiBmb3IgaW5pdGlhbCB0dXJuXHJcbiAgICBAbWV0aG9kIFN0YXJ0VHVyblxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU3RhcnRUdXJuKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLnRyYWNlKFwiU3RhcnRpbmcgVHVyblwiKTtcclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFBob3RvblJlZi5yYWlzZUV2ZW50KFxyXG4gICAgICAgICAgMixcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgVHVybk51bWJlcjogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2hvdyB0b2FzdCBtZXNzYWdlIG9uIHRoZSBjb25zb2xlXHJcbiAgICBAbWV0aG9kIFNob3dUb2FzdFxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgbWVzc2FnZSB0byBiZSBzaG93biBcclxuICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIGNvbnNvbGUubG9nKFwidG9hc3QgbWVzc2FnZTogXCIgKyBtc2cpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgUmVjZWl2ZSBldmVudCBmcm9tIHBob3RvbiByYWlzZSBvbiBcclxuICAgIEBtZXRob2QgQ2FsbFJlY2lldmVFdmVudFxyXG4gICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIENhbGxSZWNpZXZlRXZlbnQ6IGZ1bmN0aW9uIChfZXZlbnRDb2RlLCBfc2VuZGVyTmFtZSwgX3NlbmRlcklELCBfZGF0YSkge1xyXG4gICAgdmFyIEluc3RhbmNlTnVsbCA9IHRydWU7XHJcblxyXG4gICAgLy90byBjaGVjayBpZiBpbnN0YW5jZSBpcyBudWxsIGluIGNhc2UgY2xhc3MgaW5zdGFuY2UgaXMgbm90IGxvYWRlZCBhbmQgaXRzIHJlY2VpdmVzIGNhbGxiYWNrXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkgPT0gbnVsbCkge1xyXG4gICAgICBJbnN0YW5jZU51bGwgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkNhbGxSZWNpZXZlRXZlbnQoX2V2ZW50Q29kZSwgX3NlbmRlck5hbWUsIF9zZW5kZXJJRCwgX2RhdGEpO1xyXG4gICAgICB9LCA1MCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnN0YW5jZU51bGwgPSBmYWxzZTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVjZWl2ZUV2ZW50KF9ldmVudENvZGUsIF9zZW5kZXJOYW1lLCBfc2VuZGVySUQsIF9kYXRhKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBEaXNjb25uZWN0RGF0YSgpIHtcclxuICAgIEdhbWVGaW5pc2hlZCA9IHRydWU7XHJcbiAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbT1mYWxzZTtcclxuICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gIH0sXHJcblxyXG4gIFJlc3RhcnRHYW1lKF90aW1lciA9IDApIHtcclxuICAgIElzR2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gZmFsc2U7XHJcbiAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRTdGF0ZSgpO1xyXG4gICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgVGltZW91dHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChUaW1lb3V0c1tpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJNYWluTWVudVwiKTtcclxuICAgIH0sIF90aW1lcik7XHJcbiAgICAvLyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKClcclxuICB9LFxyXG5cclxuICBDaGVja01hc3RlckNsaWVudChfaWQpIHtcclxuICAgIHZhciBfaXNNYXN0ZXIgPSBmYWxzZTtcclxuICAgIGlmIChQaG90b25SZWYubXlSb29tTWFzdGVyQWN0b3JOcigpID09IF9pZCAmJiBQaG90b25SZWYubXlBY3RvcigpLmFjdG9yTnIgPT0gX2lkKSB7XHJcbiAgICAgIF9pc01hc3RlciA9IHRydWU7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUuZXJyb3IoX2lzTWFzdGVyKTtcclxuICAgIHJldHVybiBfaXNNYXN0ZXI7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCkge1xyXG4gICAgdmFyIF9pc01hc3RlciA9IGZhbHNlO1xyXG4gICAgaWYgKFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOciA9PSBQaG90b25SZWYubXlSb29tTWFzdGVyQWN0b3JOcigpKSB7XHJcbiAgICAgIF9pc01hc3RlciA9IHRydWU7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIElzTWFzdGVyQ2xpZW50ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jb25zb2xlLmVycm9yKF9pc01hc3Rlcik7XHJcbiAgICByZXR1cm4gX2lzTWFzdGVyO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0Um9vbVZhbHVlcygpIHtcclxuICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBJc01hc3RlckNsaWVudCA9IGZhbHNlO1xyXG4gICAgICBUaW1lclN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIH0sIDEwMDApO1xyXG4gIH0sXHJcblxyXG4gIEdldFJlYWxBY3RvcnMoKSB7XHJcbiAgICB2YXIgX3JlYWxQbGF5ZXIgPSAwO1xyXG4gICAgdmFyIEFsbFBsYXllcnMgPSBQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBbGxQbGF5ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoQWxsUGxheWVyc1tpbmRleF0uZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICBfcmVhbFBsYXllcisrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3JlYWxQbGF5ZXI7XHJcbiAgfSxcclxuXHJcbiAgUm9vbUNvdW50ZXIoX3RpbWVyKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoU2NoZWR1bGFyKTtcclxuICAgIHZhciBfZGF0YSA9IG51bGw7XHJcbiAgICBTY2hlZHVsYXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKElzTWFzdGVyQ2xpZW50KSB7XHJcbiAgICAgICAgaWYgKF90aW1lciA+IDApIHtcclxuICAgICAgICAgIF90aW1lci0tO1xyXG4gICAgICAgICAgdGhpcy5Sb29tQ291bnRlcihfdGltZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwidGltZXIgY29tcGxldGVkXCIpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuR2V0UmVhbEFjdG9ycygpID4gMSkge1xyXG4gICAgICAgICAgICAvL2lmIGhhcyBtb3JlIHRoYW4gb25lIHBsYXllciBzdGFydCByZWFsIGdhbWVcclxuICAgICAgICAgICAgdGhpcy5TZW5kUm9vbUNvbXBsZXRlZERhdGEoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlNob3dUb2FzdChcIk5vIG9ubGluZSBwbGF5ZXIgd2FzIGZvdW5kLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyXCIpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLkV4aXRDb25uZWN0aW5nKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzZXRSb29tVmFsdWVzKCk7XHJcbiAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVG9nZ2xlTW9kZVNlbGVjdGlvbigxKTtcclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlRvZ2dsZVNob3dSb29tX0Jvb2woZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMgPSAyO1xyXG4gICAgICAgICAgICAvLyBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwicGxheWVycyBmb3VuZFwiKTtcclxuICAgICAgICAgICAgLy8gY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0cnVlLCB0cnVlLCBcIkdhbWVQbGF5XCIpOyAvL2Z1bmN0aW9uIGluIHVpIG1hbmFnZXJcclxuICAgICAgICAgICAgLy8gfSwgMTAwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChTY2hlZHVsYXIpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMDAwKTtcclxuICB9LFxyXG5cclxuICBQcm9jZXNzQ291bnRlcigpIHtcclxuICAgIHZhciBfbWFzdGVyID0gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCgpO1xyXG4gICAgaWYgKF9tYXN0ZXIpIHtcclxuICAgICAgaWYgKCFUaW1lclN0YXJ0ZWQpIHtcclxuICAgICAgICBUaW1lclN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHZhciBfY291bnRlciA9IFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tQ291bnRlclwiKVtcIkNvdW50ZXJcIl07XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJvb21Db3VudGVyKF9jb3VudGVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgU2VuZCByb29tIGNvbXBsZXRlZCBkYXRhXHJcbiAgICBAbWV0aG9kIFNlbmRSb29tQ29tcGxldGVkRGF0YVxyXG4gICAgQHBhcmFtIHtPYmplY3R9IF9kYXRhXHJcbiAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU2VuZFJvb21Db21wbGV0ZWREYXRhKF9kYXRhKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLmlzSm9pbmVkVG9Sb29tKCkgPT0gdHJ1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgUm9vbUNvbXBsZXRlZERhdGFcIik7XHJcbiAgICAgIC8vICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgUGhvdG9uUmVmLnJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxNCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YTogX2RhdGEsXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWU6IFBob3RvblJlZi5teUFjdG9yKCkubmFtZSxcclxuICAgICAgICAgICAgc2VuZGVySUQ6IFBob3RvblJlZi5teUFjdG9yKCkuYWN0b3JOcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHJlY2VpdmVyczogUGhvdG9uLkxvYWRCYWxhbmNpbmcuQ29uc3RhbnRzLlJlY2VpdmVyR3JvdXAuQWxsIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInlvdSBhcmUgbm90IGluIHJvb20uXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJvb21Db21wbGV0ZWQoKSB7XHJcbiAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX3JlYWxQbGF5ZXIgPSB0aGlzLkdldFJlYWxBY3RvcnMoKTtcclxuICAgICAgSXNHYW1lU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzID0gX3JlYWxQbGF5ZXI7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHJlcXVpcmVkIHBsYXllcnMgam9pbmVkLCBzdGFydGluZyB0aGUgZ2FtZS4uXCIpO1xyXG4gICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwicGxheWVycyBmb3VuZFwiKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcInN0YXJ0aW5nIGdhbWUuLi5cIik7XHJcbiAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Kb2luZWRSb29tID0gdHJ1ZTtcclxuICAgICAgVGltZW91dHMucHVzaChcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJDaGFuZ2VQYW5lbFNjcmVlblwiLCB0cnVlLCB0cnVlLCBcIkdhbWVQbGF5XCIpO1xyXG4gICAgICAgIH0sIDEwMDApXHJcbiAgICAgICk7IC8vZnVuY3Rpb24gaW4gdWkgbWFuYWdlclxyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlUm9vbUN1c3RvbVByb3Blcml0ZXModHJ1ZSwgX3JlYWxQbGF5ZXIsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIG51bGwsIGZhbHNlLCAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBVcGRhdGVBY3RvckFjdGl2ZURhdGEoX2FjdG9yKSB7XHJcbiAgICB2YXIgX2FjdG9yc0FycmF5ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgdmFyIF9kYXRhID0gbnVsbDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIF9kYXRhID0gX2FjdG9yc0FycmF5W2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICBpZiAoX2RhdGEuUGxheWVyVUlEID09IF9hY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgX2RhdGEuSXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBfYWN0b3JzQXJyYXlbaW5kZXhdLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgX2RhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJ1cGRhdGluZyBhY3RpdmUgc3RhdHVzIG9mIHRoZSBwbGF5ZXIgd2hvIGhhcyBsZWZ0Li4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXCIpO1xyXG4gICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICB9LFxyXG5cclxuICBIYW5kbGVQbGF5ZXJMZWF2ZShhY3RvciA9IG51bGwsIFBob3RvblJlZmVyZWNlID0gbnVsbCwgX21hbmFnZXIgPSBudWxsLCBfcGxheWVyVHVybiA9IDAsIF9pbml0aWFsU2V0dXBEb25lID0gZmFsc2UsIF9pc1NwZWN0YXRlID0gZmFsc2UpIHtcclxuICAgIGlmIChfaW5pdGlhbFNldHVwRG9uZSkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQgPT0gYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLklzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuVXBkYXRlQWN0b3JBY3RpdmVEYXRhKGFjdG9yKTtcclxuICAgICAgICAgIGlmICghX2lzU3BlY3RhdGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbGVmdDogXCIgKyBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuUmVtb3ZlRnJvbUNoZWNrQXJyYXkoX21hbmFnZXIuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuQ2hlY2tUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgaWYgKF9wbGF5ZXJUdXJuID09IGluZGV4ICYmIFBob3RvblJlZmVyZWNlLm15QWN0b3IoKS5hY3Rvck5yID09IFBob3RvblJlZmVyZWNlLm15Um9vbU1hc3RlckFjdG9yTnIoKSkge1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLkNoYW5nZVR1cm5Gb3JjZWZ1bGx5KCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2UgdHVybiBmb3JjZWZ1bGx5XCIpO1xyXG4gICAgICAgICAgICAgIF9tYW5hZ2VyLlNldFBsYXllckxlZnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJlc2V0U29tZVZhbHVlcygpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gX3VJTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTAwMCk7XHJcbiAgICAgIHZhciBfcGxheWVyZm91bmQgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm8uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzLS07XHJcbiAgICAgICAgICBfcGxheWVyZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZUFjdG9yQWN0aXZlRGF0YShhY3Rvcik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghX3BsYXllcmZvdW5kKSB7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLk1heFBsYXllcnMtLTtcclxuICAgICAgICBpZiAoIV9pc1NwZWN0YXRlKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3luY0RhdGEobnVsbCwgYWN0b3IuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhfbWFuYWdlci5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5NYXhQbGF5ZXJzKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vY2FsbGVkIGV2ZXJ5IGZyYW1lXHJcbiAgdXBkYXRlKGR0KSB7XHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciB0aGVyZSBpcyBzb21lIGNoYW5nZSBpbiBjb25uZWN0aW9uIHN0YXRlXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25TdGF0ZUNoYW5nZVxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gc3RhdGVcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25TdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xyXG4gICAgICAvLyNyZWdpb24gQ29ubmVjdGlvbiBTdGF0ZXNcclxuICAgICAgLy9zdGF0ZSAxIDogY29ubmVjdGluZ1RvTmFtZVNlcnZlclxyXG4gICAgICAvL1N0YXRlIDIgOiBDb25uZWN0ZWRUb05hbWVTZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSAzIDogQ29ubmVjdGluZ1RvTWFzdGVyU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgNCA6IENvbm5lY3RlZFRvTWFzdGVyU2VydmVyXHJcbiAgICAgIC8vU3RhdGUgNTogIEpvaW5lZExvYmJ5XHJcbiAgICAgIC8vU3RhdGUgNiA6IENvbm5lY3RpbmdUb0dhbWVzZXJ2ZXJcclxuICAgICAgLy9TdGF0ZSA3IDogQ29ubmVjdGVkVG9HYW1lc2VydmVyXHJcbiAgICAgIC8vU3RhdGUgOCA6IEpvaW5lZFxyXG4gICAgICAvL1N0YXRlIDEwOiBEaXNjb25uZWN0ZWRcclxuICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICB2YXIgTEJDID0gUGhvdG9uLkxvYWRCYWxhbmNpbmcuTG9hZEJhbGFuY2luZ0NsaWVudDtcclxuICAgICAgY29uc29sZS5sb2coXCJTdGF0ZUNvZGU6IFwiICsgc3RhdGUgKyBcIiBcIiArIExCQy5TdGF0ZVRvTmFtZShzdGF0ZSkpO1xyXG5cclxuICAgICAgaWYgKHN0YXRlID09IDEpIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJjb25uZWN0aW5nIHRvIHNlcnZlci4uLlwiKTtcclxuICAgICAgZWxzZSBpZiAoc3RhdGUgPT0gNCkgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlVwZGF0ZVN0YXR1c1dpbmRvd1wiLCBcImNvbm5lY3RlZCB0byBzZXJ2ZXJcIik7XHJcbiAgICAgIGVsc2UgaWYgKHN0YXRlID09IDUpIHtcclxuICAgICAgICAvL2hhcyBqb2luZWQgbG9iYnlcclxuICAgICAgICBpZiAoU2hvd1Jvb20gPT0gZmFsc2UpIHtcclxuICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmVtaXQoXCJVcGRhdGVTdGF0dXNXaW5kb3dcIiwgXCJ3YWl0aW5nIGZvciBvdGhlciBwbGF5ZXJzLi4uXCIpO1xyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5SYW5kb21Sb29tKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChTaG93Um9vbSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic2hvd2luZyByb29tcyBsaXN0Li4uXCIpO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuVG9nZ2xlUHJvZmlsZVNjcmVlbl9TcGVjdGF0ZVVJKGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5Ub2dnbGVSb29tU2NyZWVuX1NwZWN0YXRlVUkodHJ1ZSk7XHJcbiAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBkZWJ1Z1xyXG4gICAgICAgICAgICBAbWV0aG9kIGRlYnVnXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5kZWJ1ZyA9IGZ1bmN0aW9uIChtZXNzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIGluZm9cclxuICAgICAgICAgICAgQG1ldGhvZCBpbmZvXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuaW5mbyA9IGZ1bmN0aW9uIChtZXNzLCBwYXJhbSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzICsgcGFyYW0pO1xyXG4gICAgICBzdGF0ZVRleHQgKz0gbWVzcyArIFwiIFwiICsgcGFyYW0gKyBcIlxcblwiO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGJ5IHBob3RvbiB3aGVuZXZlciBpdHMgbG9nZ2VyIHJlY2VpdmVzIHdhcm5cclxuICAgICAgICAgICAgQG1ldGhvZCB3YXJuXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTFcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHBhcmFtMlxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcGFyYW0zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci53YXJuID0gZnVuY3Rpb24gKG1lc3MsIHBhcmFtMSwgcGFyYW0yLCBwYXJhbTMpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyArIFwiIFwiICsgcGFyYW0xICsgXCIgXCIgKyBwYXJhbTIgKyBcIiBcIiArIHBhcmFtMyk7XHJcblxyXG4gICAgICBpZiAocGFyYW0xID09IDIyNSkge1xyXG4gICAgICAgIC8vbm8gcm9vbSBmb3VuZFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibm8gcmFuZG9tIHJvb20gd2FzIGZvdW5kLCBjcmVhdGluZyBvbmVcIik7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNyZWF0ZVJvb20oKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmFtMSA9PSAyMjYpIHtcclxuICAgICAgICAvL3Jvb20gZG9lcyBub3QgZXhpc3RzIG9yIGlzIGZ1bGxcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlRvZ2dsZUxvYWRpbmdOb2RlKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlNob3dUb2FzdChcIlJvb20gaXMgZnVsbCwgcGxlYXNlIHNlbGVjdCBhbnkgb3RoZXIgcm9vbSB0byBzcGVjdGF0ZS5cIik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBlcnJvclxyXG4gICAgICAgICAgICBAbWV0aG9kIGVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZXJyb3IgPSBmdW5jdGlvbiAobWVzcywgcGFyYW0pIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIGl0cyBsb2dnZXIgcmVjZWl2ZXMgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBtZXRob2QgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBtZXNzXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLmxvZ2dlci5leGNlcHRpb24gPSBmdW5jdGlvbiAobWVzcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgaXRzIGxvZ2dlciByZWNlaXZlcyBzb21lIGZvcm1hdFxyXG4gICAgICAgICAgICBAbWV0aG9kIGZvcm1hdFxyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gbWVzc1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5sb2dnZXIuZm9ybWF0ID0gZnVuY3Rpb24gKG1lc3MpIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHdoZW5ldmVyIHBsYXllciBqb2lucyBsb2JieVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uUm9vbUxpc3RcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IHJvb21zXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uUm9vbUxpc3QgPSBmdW5jdGlvbiAocm9vbXMpIHtcclxuICAgICAgc3RhdGVUZXh0ICs9IFwiXFxuXCIgKyBcIlJvb21zIExpc3Q6XCIgKyBcIlxcblwiO1xyXG5cclxuICAgICAgaWYgKHJvb21zLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgc3RhdGVUZXh0ICs9IFwiTm8gcm9vbXMgaW4gbG9iYnkuXCIgKyBcIlxcblwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfVUlNYW5hZ2VyKCkuUmVzZXRSb29tTGlzdCgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1VJTWFuYWdlcigpLlVwZGF0ZVJvb21zTGlzdF9TcGVjdGF0ZVVJKHJvb21zW2ldLm5hbWUsIHJvb21zW2ldLnBsYXllckNvdW50KTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUm9vbSBuYW1lOiBcIiArIHJvb21zW2ldLm5hbWUpO1xyXG4gICAgICAgICAgc3RhdGVUZXh0ICs9IFwiUm9vbTogXCIgKyByb29tc1tpXS5uYW1lICsgXCJcXG5cIjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgdGhlcmUgaXMgY2hhbmdlIGluIHJvb21zIGxpc3QgKHJvb20gYWRkZWQsdXBkYXRlZCxyZW1vdmVkIGV0YylcclxuICAgICAgICAgICAgQG1ldGhvZCBvblJvb21MaXN0VXBkYXRlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1xyXG4gICAgICAgICAgICBAcGFyYW0ge29iamVjdH0gcm9vbXNVcGRhdGVkXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc0FkZGVkXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSByb29tc1JlbW92ZWRcclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Sb29tTGlzdFVwZGF0ZSA9IGZ1bmN0aW9uIChyb29tcywgcm9vbXNVcGRhdGVkLCByb29tc0FkZGVkLCByb29tc1JlbW92ZWQpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5SZXNldFJvb21MaXN0KCk7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9VSU1hbmFnZXIoKS5VcGRhdGVSb29tc0xpc3RfU3BlY3RhdGVVSShyb29tc1tpXS5uYW1lLCByb29tc1tpXS5wbGF5ZXJDb3VudCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSb29tIG5hbWU6IFwiICsgcm9vbXNbaV0ubmFtZSk7XHJcbiAgICAgICAgc3RhdGVUZXh0ICs9IFwiUm9vbTogXCIgKyByb29tc1tpXS5uYW1lICsgXCJcXG5cIjtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhcIlJvb21zIExpc3QgdXBkYXRlZDogXCIgKyByb29tc1VwZGF0ZWQubGVuZ3RoICsgXCIgdXBkYXRlZCwgXCIgKyByb29tc0FkZGVkLmxlbmd0aCArIFwiIGFkZGVkLCBcIiArIHJvb21zUmVtb3ZlZC5sZW5ndGggKyBcIiByZW1vdmVkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAgICAgICAgQHN1bW1hcnkgZnVuY3Rpb24gY2FsbGVkIGxvY2FsbHkgYnkgcGhvdG9uIHdoZW4gZXZlbiBwbGF5ZXIgam9pbnMgcm9vbVxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uSm9pblJvb21cclxuICAgICAgICAgICAgQHJldHVybnMgbm8gcmV0dXJuXHJcbiAgICAgICAgKiovXHJcbiAgICBQaG90b25SZWYub25Kb2luUm9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8jcmVnaW9uIExvZ3MgZm9yIGdhbWVcclxuICAgICAgY29uc29sZS5sb2coXCJHYW1lIFwiICsgdGhpcy5teVJvb20oKS5uYW1lICsgXCIgam9pbmVkXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlBY3RvcigpKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbSgpKTtcclxuICAgICAgY29uc29sZS5sb2coUGhvdG9uUmVmLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGgpO1xyXG4gICAgICBjb25zb2xlLmxvZyhQaG90b25SZWYubXlSb29tQWN0b3JzQXJyYXkoKVswXS5sb2FkQmFsYW5jaW5nQ2xpZW50LnVzZXJJZCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKS5fY3VzdG9tUHJvcGVydGllcyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFBob3RvblJlZi5teUFjdG9yKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJSb29tRXNzZW50aWFsc1wiKVtcIklzU3BlY3RhdGVcIl0pO1xyXG4gICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IHRydWUpIHtcclxuICAgICAgICAvL2NoZWNrIGlmIHBsYXllciB3aG8gam9pbmVkIGlzIHNwZWN0YXRlXHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIkNoYW5nZVBhbmVsU2NyZWVuXCIsIHRydWUsIHRydWUsIFwiR2FtZVBsYXlcIik7XHJcbiAgICAgICAgfSwgMTAwMCk7IC8vZnVuY3Rpb24gaW4gVUlNYW5hZ2VyXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlByb2Nlc3NDb3VudGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBqb2lucyByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckpvaW5cclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgKFBob3RvblJlZi5vbkFjdG9ySm9pbiA9IGZ1bmN0aW9uIChhY3Rvcikge1xyXG4gICAgICB2YXIgX3JlYWxQbGF5ZXIgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuR2V0UmVhbEFjdG9ycygpO1xyXG5cclxuICAgICAgaWYgKF9yZWFsUGxheWVyID09IE1heFN0dWRlbnRzKSB7XHJcbiAgICAgICAgLy93aGVuIG1heCBwbGF5ZXIgcmVxdWlyZWQgdG8gc3RhcnQgZ2FtZSBoYXMgYmVlbiBhZGRlZFxyXG4gICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFJvb21WYWx1ZXMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCByZXF1aXJlZCBwbGF5ZXJzIGpvaW5lZCwgc3RhcnRpbmcgdGhlIGdhbWUuLlwiKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwicGxheWVycyBmb3VuZFwiKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiVXBkYXRlU3RhdHVzV2luZG93XCIsIFwic3RhcnRpbmcgZ2FtZS4uLlwiKTtcclxuICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IHRydWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5lbWl0KFwiQ2hhbmdlUGFuZWxTY3JlZW5cIiwgdHJ1ZSwgdHJ1ZSwgXCJHYW1lUGxheVwiKTtcclxuICAgICAgICB9LCAxMDAwKTsgLy9mdW5jdGlvbiBpbiB1aSBtYW5hZ2VyXHJcbiAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZVJvb21DdXN0b21Qcm9wZXJpdGVzKHRydWUsIFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksIGZhbHNlLCBmYWxzZSwgZmFsc2UsIG51bGwsIGZhbHNlLCAwKTtcclxuICAgICAgICAvL1Bob3RvblJlZi5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclwiLFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCksdHJ1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoYWN0b3IuYWN0b3JOcik7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgam9pbmVkXCIpO1xyXG4gICAgICAvLyBjb25zb2xlLmVycm9yKFwiVG90YWwgUGxheWVyczogXCIrUGhvdG9uUmVmLm15Um9vbUFjdG9yQ291bnQoKSk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFBob3RvblJlZi5teVJvb20oKSk7XHJcbiAgICB9KSxcclxuICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCByZW1vdGVseSBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBsZWF2ZXMgYSByb29tXHJcbiAgICAgICAgICAgIEBtZXRob2Qgb25BY3RvckxlYXZlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgICAgKFBob3RvblJlZi5vbkFjdG9yTGVhdmUgPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgICBpZiAoIUdhbWVGaW5pc2hlZCAmJiAhUmVzdGFydFNwZWN0YXRlKSB7XHJcbiAgICAgICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoIWFjdG9yLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICBpZiAoIU11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5MZWF2ZVJvb20pIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rvci5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzcGVjdGF0b3IgbGVmdCwgc28gZG9udCBtaW5kLCBjb250IGdhbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0b3IgXCIgKyBhY3Rvci5hY3Rvck5yICsgXCIgbGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBQaG90b25SZWZlcmVjZSA9IE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5nZXRQaG90b25SZWYoKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKF9tYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJUdXJuID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICB2YXIgX3VJR2FtZU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICB2YXIgX3JlYWxQbGF5ZXIgPSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuR2V0UmVhbEFjdG9ycygpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgX2luaXRpYWxTZXR1cERvbmUgPSBQaG90b25SZWZlcmVjZS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChQaG90b25SZWYubXlBY3RvcigpLmdldEN1c3RvbVByb3BlcnR5KFwiUm9vbUVzc2VudGlhbHNcIilbXCJJc1NwZWN0YXRlXCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3RvciBcIiArIGFjdG9yLmFjdG9yTnIgKyBcIiBsZWZ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfcmVhbFBsYXllciA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5IYW5kbGVQbGF5ZXJMZWF2ZShhY3RvciwgUGhvdG9uUmVmZXJlY2UsIF9tYW5hZ2VyLCBfcGxheWVyVHVybiwgX2luaXRpYWxTZXR1cERvbmUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfdUlHYW1lTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdUlHYW1lTWFuYWdlci5TaG93VG9hc3QoXCJwbGF5ZXIgXCIgKyBhY3Rvci5uYW1lICsgXCIgaGFzIGxlZnRcIiwgMTE1MCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoX2luaXRpYWxTZXR1cERvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IGFjdG9yLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlVwZGF0ZUFjdG9yQWN0aXZlRGF0YShhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZXIuR2FtZU92ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3VJR2FtZU1hbmFnZXIpIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXN0YXJ0R2FtZSgxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuUmVzdGFydEdhbWUoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKF91SUdhbWVNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF91SUdhbWVNYW5hZ2VyLlNob3dUb2FzdChcInBsYXllciBcIiArIGFjdG9yLm5hbWUgKyBcIiBoYXMgbGVmdFwiLCAxMTUwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuSm9pbmVkUm9vbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5SZXNldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmIChNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuZ2V0U2NlbmVOYW1lKCkgPT0gXCJHYW1lUGxheVwiKSAvL2lmIHNjZW5lIGlzIGdhbWVwbGF5IGxldCBwbGF5ZXIgZmluaXNoIGdhbWUgZm9yY2VmdWxseVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwib3RoZXIgcGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDIwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5NZW51XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSwgMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3VJR2FtZU1hbmFnZXIuU2hvd1RvYXN0KFwicGxheWVyIFwiICsgYWN0b3IubmFtZSArIFwiIGhhcyBsZWZ0XCIsIDExNTAsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9yZWFsUGxheWVyID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkhhbmRsZVBsYXllckxlYXZlKGFjdG9yLCBQaG90b25SZWZlcmVjZSwgX21hbmFnZXIsIF9wbGF5ZXJUdXJuLCBfaW5pdGlhbFNldHVwRG9uZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChfaW5pdGlhbFNldHVwRG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlci5HYW1lT3Zlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkpvaW5lZFJvb20gPT0gdHJ1ZSAmJiAhSXNHYW1lU3RhcnRlZCkge1xyXG4gICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5Qcm9jZXNzQ291bnRlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoUGhvdG9uUmVmLm15QWN0b3IoKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlJvb21Fc3NlbnRpYWxzXCIpW1wiSXNTcGVjdGF0ZVwiXSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgaWYgKFBob3RvblJlZi5teVJvb21BY3RvckNvdW50KCkgPT0gMSAmJiAhUmVzdGFydFNwZWN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBSZXN0YXJ0U3BlY3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJlc3RhcnRHYW1lKDE1MDApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInJlYXRydGVkXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciBvd24gcHJvcGVydGllcyBnb3QgY2hhbmdlZFxyXG4gICAgICAgICAgICBAbWV0aG9kIG9uQWN0b3JQcm9wZXJ0aWVzQ2hhbmdlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3RvclxyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkFjdG9yUHJvcGVydGllc0NoYW5nZSA9IGZ1bmN0aW9uIChhY3Rvcikge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbiBldmVuIHBsYXllciByb29tIHByb3BlcnRpZXMgZ290IGNoYW5nZWRcclxuICAgICAgICAgICAgQG1ldGhvZCBvbk15Um9vbVByb3BlcnRpZXNDaGFuZ2VcclxuICAgICAgICAgICAgQHBhcmFtIHtvYmplY3R9IGFjdG9yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uTXlSb29tUHJvcGVydGllc0NoYW5nZSA9IGZ1bmN0aW9uIChfZGF0YSkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICAgICBAc3VtbWFyeSBmdW5jdGlvbiBjYWxsZWQgYnkgcGhvdG9uIHRvIGhhbmRsZSBlcnJvcnNcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkVycm9yXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvckNvZGVcclxuICAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBlcnJvck1zZ1xyXG4gICAgICAgICAgICBAcmV0dXJucyBubyByZXR1cm5cclxuICAgICAgICAqKi9cclxuICAgIFBob3RvblJlZi5vbkVycm9yID0gZnVuY3Rpb24gKGVycm9yQ29kZSwgZXJyb3JNc2cpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJFcnJvciBcIiArIGVycm9yQ29kZSArIFwiOiBcIiArIGVycm9yTXNnKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAgICAgIEBzdW1tYXJ5IGZ1bmN0aW9uIGNhbGxlZCBieSBwaG90b24gd2hlbmV2ZXIgYW4gZXZlbnQgaXMgcmVjZWl2ZWQgd2l0aCBzb21lIGRhdGFcclxuICAgICAgICAgICAgQG1ldGhvZCBvbkV2ZW50XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBjb2RlXHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBjb250ZW50XHJcbiAgICAgICAgICAgIEBwYXJhbSB7b2JqZWN0fSBhY3Rvck5yXHJcbiAgICAgICAgICAgIEByZXR1cm5zIG5vIHJldHVyblxyXG4gICAgICAgICoqL1xyXG4gICAgUGhvdG9uUmVmLm9uRXZlbnQgPSBmdW5jdGlvbiAoY29kZSwgY29udGVudCwgYWN0b3JOcikge1xyXG4gICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIHN3aXRjaCAoY29kZSkge1xyXG4gICAgICAgIGNhc2UgMTogLy9yZWNldmluZyBwbGF5ZXJkYXRhIGluZm9cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgUGxheWVySW5mb0RhdGEgPSBjb250ZW50LlBsYXllckluZm87XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIFBsYXllckluZm9EYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6IC8vc3RhcnQgdHVybiByYWlzZSBldmVudFxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBzdGFydCB0dXJuIGV2ZW50XCIpO1xyXG4gICAgICAgICAgdmFyIF9UdXJuID0gY29udGVudC5UdXJuTnVtYmVyO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDIsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfVHVybik7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOiAvLyBkaWNlIGNvdW50XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGRpY2UgY291bnRcIik7XHJcbiAgICAgICAgICB2YXIgX2RpY2UgPSBjb250ZW50LkRpY2VDb3VudDtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgzLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RpY2UpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDogLy9yZWNlaW5nIHVzZXIgaWQgb2YgcGxheWVyIHdobyBoYXMgY29tcGxldGVkIHR1cm5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGxheWVyIHR1cm4gY29tcGxldGVkXCIpO1xyXG4gICAgICAgICAgdmFyIF9JRCA9IGNvbnRlbnQuVUlEO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDQsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfSUQpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTogLy9yZWNlaXZpbmcgY2FyZCBkYXRhIChpbmRleCkgc28gb3RoZXIgdXNlcnMgY2FuIHN5bmMgdGhlbVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBjYXJkIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2NhcmQgPSBjb250ZW50LkNhcmREYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDUsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfY2FyZCk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OiAvL3JlY2VpdmUgZ2FtZSBvdmVyIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZ2FtZSBvdmVyIGNhbGxcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoNiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6IC8vcmVjZWl2ZSBvbmUgUXVlc3Rpb24gZGF0YVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBvbmUgcXVlc3Rpb24gZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCg3LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgODogLy9yZWNlaXZlIG9uZSBRdWVzdGlvbiByZXNwb25zZSBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIG9uZSBxdWVzdGlvIHJlc3BvbnNlIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoOCwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDk6IC8vcmVjZWl2ZSBiYW5rcnVwdCBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGJhbmtydXB0IGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoOSwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEwOiAvL3JlY2VpdmUgYmFja3NwYWNlIGRhdGFcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgYmFja3NwYWNlIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTAsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMTogLy9yZWNlaXZlaW5nIHBhcnRuZXJzaGlwIG9mZmVyXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTEsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxMjogLy9yZWNlaXZlaW5nIHBhcnRuZXJzaGlwIGFuc3dlciBkYXRhXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIHBhcnRuZXJzaGlwIGFud3NlciBkYXRhXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDEyLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTM6IC8vcmVjZWl2aW5nIHByb2ZpdC9sb3NzIGRhdGEgZm9yIHBhcnRuZXJcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgYW53c2VyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTMsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxNDogLy9yZWNlaXZpbmcgcm9vbSBjb21wbGV0ZSBkYXRhIHRvIHN0YXJ0IEdhbWVcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgcGFydG5lcnNoaXAgYW53c2VyIGRhdGFcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLlJvb21Db21wbGV0ZWQoKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE1OiAvL3JlY2VpdmluZyBwYXlkYXkgaW5mb1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBpbmZvXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE1LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTY6IC8vcmVjZWl2aW5nIGdhbWUgb3ZlciBkYXRhIHRvIHN5bmNcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZ2FtZSBvdmVyIHN5bmMgZGF0YVwiKTtcclxuICAgICAgICAgIHZhciBfZGF0YSA9IGNvbnRlbnQuRGF0YTtcclxuICAgICAgICAgIHZhciBzZW5kZXJOYW1lID0gY29udGVudC5zZW5kZXJOYW1lO1xyXG4gICAgICAgICAgdmFyIHNlbmRlcklEID0gY29udGVudC5zZW5kZXJJRDtcclxuXHJcbiAgICAgICAgICBNdWx0aXBsYXllckNvbnRyb2xsZXIuSW5zdGFuY2UuQ2FsbFJlY2lldmVFdmVudCgxNiwgc2VuZGVyTmFtZSwgc2VuZGVySUQsIF9kYXRhKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE3OiAvL3JlY2VpdmluZyBkYXRhIG9mIHBsYXllciB0byBnZXQgYWxsIHByb2ZpdCBuZXh0IHBheSBkYXlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGF0YSBvZiBwbGF5ZXIgdG8gZ2V0IGFsbCBwcm9maXQgbmV4dCBwYXkgZGF5XCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDE3LCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTg6IC8vcmVjZWl2aW5nIG9uZSBxdWVzdGlvbiBhcnJheVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkYXRhIGZvciBvbmUgcXVlc3Rpb24gYXJyYXlcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTgsIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOTogLy9yZWNlaXZpbmcgZGVja3MgYXJyYXlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZGF0YSBmb3IgZGVja3MgYXJyYXlcIik7XHJcbiAgICAgICAgICB2YXIgX2RhdGEgPSBjb250ZW50LkRhdGE7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyTmFtZSA9IGNvbnRlbnQuc2VuZGVyTmFtZTtcclxuICAgICAgICAgIHZhciBzZW5kZXJJRCA9IGNvbnRlbnQuc2VuZGVySUQ7XHJcblxyXG4gICAgICAgICAgTXVsdGlwbGF5ZXJDb250cm9sbGVyLkluc3RhbmNlLkNhbGxSZWNpZXZlRXZlbnQoMTksIHNlbmRlck5hbWUsIHNlbmRlcklELCBfZGF0YSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyMDogLy9yZWNlaXZpbmcgZGVja3MgYXJyYXkgQ291bnRlclxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBkYXRhIGZvciBkZWNrcyBhcnJheSBjb3VudGVyXCIpO1xyXG4gICAgICAgICAgdmFyIF9kYXRhID0gY29udGVudC5EYXRhO1xyXG4gICAgICAgICAgdmFyIHNlbmRlck5hbWUgPSBjb250ZW50LnNlbmRlck5hbWU7XHJcbiAgICAgICAgICB2YXIgc2VuZGVySUQgPSBjb250ZW50LnNlbmRlcklEO1xyXG5cclxuICAgICAgICAgIE11bHRpcGxheWVyQ29udHJvbGxlci5JbnN0YW5jZS5DYWxsUmVjaWV2ZUV2ZW50KDIwLCBzZW5kZXJOYW1lLCBzZW5kZXJJRCwgX2RhdGEpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxheWVyQ29udHJvbGxlcjtcclxuIl19