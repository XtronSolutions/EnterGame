
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '72485pNAFJIIpZ225FqWNsJ', 'GameManager');
// Script/GameManager.js

"use strict";

//#region superclasses and enumerations
//-------------------------------------------enumeration for type of business-------------------------//
var EnumBusinessType = cc.Enum({
  None: 0,
  HomeBased: 1,
  //a business that you operate out of your home
  brickAndmortar: 2 //a store front business

}); //-------------------------------------------class for BusinessInfo-------------------------//

var BusinessInfo = cc.Class({
  name: "BusinessInfo",
  properties: {
    Name: "BusinessData",
    BusinessType: {
      displayName: "Mode",
      type: EnumBusinessType,
      "default": EnumBusinessType.None,
      serializable: true,
      tooltip: "Business catogory for players"
    },
    BusinessTypeDescription: {
      displayName: "Type",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Type (by name) of business player is opening"
    },
    BusinessName: {
      displayName: "Name",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "Name of the business player is opening"
    },
    Amount: {
      displayName: "Amount",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "balance of business"
    },
    IsPartnership: {
      displayName: "IsPartnership",
      "default": false,
      typw: cc.Boolean,
      serializable: true,
      tooltip: "Check if player has done partnership with someone with current business"
    },
    PartnerID: {
      displayName: "PartnerID",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "ID of the partner with whom player has formed partnership"
    },
    LocationsName: {
      displayName: "LocationsName",
      type: [cc.Text],
      "default": [],
      serializable: true,
      tooltip: "if player owns brick and mortar he/she can expand to new location"
    },
    LoanTaken: {
      displayName: "LoanTaken",
      type: cc.Boolean,
      "default": false,
      serializable: true
    },
    LoanAmount: {
      displayName: "LoanAmount",
      type: cc.Integer,
      "default": 0,
      serializable: true
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for StockInfo-------------------------//

var StockInfo = cc.Class({
  name: "StockInfo",
  properties: {
    Name: "StockData",
    BusinessName: {
      displayName: "BusinessName",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "name of the business in which stocks will be held"
    },
    ShareAmount: {
      displayName: "ShareAmount",
      type: cc.Integer,
      "default": 0,
      serializable: true,
      tooltip: "Share amount of the stock"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for  Player Data-------------------------//

var PlayerData = cc.Class({
  name: "PlayerData",
  properties: {
    PlayerName: {
      displayName: "PlayerName",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "name of the player"
    },
    PlayerUID: {
      displayName: "PlayerUID",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "ID of the player"
    },
    AvatarID: {
      displayName: "AvatarID",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "id reference for player avatar selection"
    },
    IsBot: {
      displayName: "IsBot",
      "default": false,
      typw: cc.Boolean,
      serializable: true,
      tooltip: "Check if current player is bot"
    },
    NoOfBusiness: {
      displayName: "Business",
      type: [BusinessInfo],
      "default": [],
      serializable: true,
      tooltip: "Number of business a player can own"
    },
    HomeBasedAmount: {
      displayName: "HomeBasedAmount",
      type: cc.Integer,
      "default": 0,
      serializable: true,
      tooltip: "number of home based business a player owns"
    },
    BrickAndMortarAmount: {
      displayName: "BrickAndMortarAmount",
      type: cc.Integer,
      "default": 0,
      serializable: true,
      tooltip: "number of brick and mortar business a player owns"
    },
    TotalLocationsAmount: {
      displayName: "TotalLocationsAmount",
      type: cc.Integer,
      "default": 0,
      serializable: true,
      tooltip: "number of locations of all brick and mortar businessess"
    },
    NoOfStocks: {
      displayName: "Stocks",
      type: [StockInfo],
      "default": [],
      serializable: true,
      tooltip: "Number of stock a player owns"
    },
    Cash: {
      displayName: "PlayerCash",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "Amount of cash player owns"
    },
    GoldCount: {
      displayName: "GoldCount",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "count of gold a player owns"
    },
    StockCount: {
      displayName: "StockCount",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "count of stocks a player owns"
    },
    LoanTaken: {
      displayName: "LoanTaken",
      "default": false,
      typw: cc.Boolean,
      serializable: true,
      tooltip: "Check if player has taken loan from bank or not"
    },
    LoanAmount: {
      displayName: "LoanAmount",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "Amount of loan taken from the bank"
    },
    MarketingAmount: {
      displayName: "MarketingAmount",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "marketing amount a player owns"
    },
    LawyerStatus: {
      displayName: "LawyerStatus",
      "default": false,
      type: cc.Boolean,
      serializable: true,
      tooltip: "Check if player has hired a lawyer or not"
    },
    IsBankrupt: {
      displayName: "IsBankrupt",
      "default": false,
      type: cc.Boolean,
      serializable: true,
      tooltip: "Check if player has been Bankrupted or not"
    },
    PlayerRollCounter: {
      displayName: "PlayerRollCounter",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "integer to store roll countor for player"
    },
    InitialCounterAssigned: {
      displayName: "InitialCounterAssigned",
      "default": false,
      type: cc.Boolean,
      serializable: true
    },
    isGameFinished: {
      displayName: "isGameFinished",
      type: cc.Boolean,
      "default": false,
      serializable: true
    },
    TotalScore: {
      displayName: "TotalScore",
      type: cc.Integer,
      "default": 0,
      serializable: true
    },
    GameOver: {
      displayName: "GameOver",
      type: cc.Boolean,
      "default": false,
      serializable: true
    }
  },
  ctor: function ctor() {//constructor
  }
}); //#endregion
//#region Game Manager Class
//-------------------------------------------(main class) class for Game Manager-------------------------//

var RollCounter = 0;
var DiceTemp = 0;
var DiceRoll = 0;
var IsTweening = false;
var GamePlayReferenceManager = null;
var TurnCheckArray = [];
var BusinessLocationNodes = [];
var PassedPayDay = false;
var DoublePayDay = false; //cards functionality

var NextTurnDoublePay = false;
var SkipNextTurn = false;
var SkipNextPayday = false; //skip whole pay day

var SkipHMNextPayday = false; //skip pay day for home based businessess only

var SkipBMNextPayday = false; //skip pay day for brick & mortar businessess only

var CardEventReceived = false;
var isGameOver = false;
var GameManager = cc.Class({
  name: "GameManager",
  "extends": cc.Component,
  properties: {
    PlayerGameInfo: {
      "default": [],
      type: [PlayerData],
      serializable: true,
      tooltip: "all player's data"
    },
    PlayerNode: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for player"
    },
    CameraNode: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for camera"
    },
    AllPlayerUI: {
      "default": [],
      type: [cc.Node],
      serializable: true,
      tooltip: "Node reference of ui of all players"
    },
    AllPlayerNodes: {
      "default": [],
      type: [cc.Node],
      serializable: true,
      tooltip: "Node reference of node of all players inside gameplay"
    },
    StartLocationNodes: {
      "default": [],
      type: [cc.Node],
      serializable: true,
      tooltip: "Node reference of attay of locations"
    }
  },
  statics: {
    PlayerData: PlayerData,
    BusinessInfo: BusinessInfo,
    EnumBusinessType: EnumBusinessType,
    Instance: null
  },
  //#region All Functions of GameManager

  /**
  @summary called when instance of class is created
  @method onLoad
  @param {string} none
  @returns {boolean} no return
  **/
  onLoad: function onLoad() {
    GameManager.Instance = this;
    this.TurnNumber = 0;
    this.TurnCompleted = false;
    TurnCheckArray = [];
    this.CheckReferences();
    this.Init_GameManager();
    this.RandomCardIndex = 0;
    this.CardCounter = 0;
    this.CardDisplayed = false;
    CardEventReceived = false;
  },

  /**
  @summary called to assign reference of required classes
  @method CheckReferences
  @param {string} none
  @returns {boolean} no return
  **/
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },

  /**
  @summary initial gamemanager essetials
  @method Init_GameManager
  @param {string} none
  @returns {boolean} no return
  **/
  Init_GameManager: function Init_GameManager() {
    this.Camera = this.CameraNode.getComponent(cc.Camera);
    this.isCameraZooming = false;
    this.PlayerGameInfo = [];
    RollCounter = 0;
    DiceTemp = 0;
    DiceRoll = 0; //if joined player is spectate

    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == true) {
      console.log("status of initial business setp: " + GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("InitialSetup")); //if inital setup has been done and game is under way

      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("InitialSetup") == true) {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleLeaveRoomButton_SpectateModeUI(true);
        var AllData = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("PlayerGameInfo");
        this.PlayerGameInfo = AllData;
        console.log(this.PlayerGameInfo);
        this.SyncDataToPlayerGameInfo(0);
        this.SyncAllData_SpectateManager();
        this.TurnNumber = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("TurnNumber");
        this.UpdateGameUI(true, this.TurnNumber);
      } else {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleLeaveRoomButton_SpectateModeUI(true);
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().InitialScreen_SpectateMode();
      }
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(true);
    }
  },
  //#region public functions to get data (accessible from other classes)
  GetTurnNumber: function GetTurnNumber() {
    return this.TurnNumber;
  },
  //#endregion
  //#region SpectateMode Code
  SyncAllData_SpectateManager: function SyncAllData_SpectateManager() {
    this.AssignPlayerGameUI();

    for (var index = 0; index < this.PlayerGameInfo.length; index++) {
      var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.y);

      this.AllPlayerNodes[index].setPosition(_toPos.x, _toPos.y);
    }

    console.log("synced playernodes");

    for (var _index2 = 0; _index2 < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; _index2++) {
      this.AllPlayerNodes[_index2].active = true;
    }
  },
  CheckTurnOnSpectateLeave_SpectateManager: function CheckTurnOnSpectateLeave_SpectateManager() {
    var TotalConnectedPlayers = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorCount();

    if (TurnCheckArray.length == TotalConnectedPlayers) {
      TurnCheckArray = [];
      this.TurnCompleted = true;

      if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
        this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = RollCounter;
        GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[this.TurnNumber]);
        this.ChangeTurn();
        console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor());
        console.log("Change Turn is called by: " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
      }
    }
  },
  //#endregion
  //#region functions related to Turn Mechanism

  /**
   @summary raised event on all connected clients to let others know a what card has been selected by player
   @method RaiseEventForCard
   @param {string} none
   @returns {boolean} no return
  **/
  RaiseEventForCard: function RaiseEventForCard(_data) {
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(5, _data);
  },
  DisplayCardOnOthers: function DisplayCardOnOthers() {
    var _this = this;

    console.error(CardEventReceived);

    if (CardEventReceived == true) {
      console.error(this.CardCounter);
      CardEventReceived = false;

      if (!this.CardDisplayed) {
        this.CardDisplayed = true;
        GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.CardCounter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(false, this.RandomCardIndex);
      }
    } else {
      setTimeout(function () {
        //check after every 0.5 seconds
        _this.DisplayCardOnOthers();
      }, 500);
    }
  },
  ResetCardDisplay: function ResetCardDisplay() {
    this.CardDisplayed = false;
  },
  ReceiveEventForCard: function ReceiveEventForCard(_data) {
    this.CheckReferences();
    console.log(_data);
    var RandomCard = _data.randomCard;
    var counter = _data.counter;
    this.RandomCardIndex = RandomCard;
    this.CardCounter = counter;
    console.error(CardEventReceived);

    if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
      GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(true, RandomCard);
    } else {
      CardEventReceived = true; // if(IsTweening==false && this.CardDisplayed==false)
      // {
      //     GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(false,RandomCard);
      //     this.CardDisplayed=true;
      // }
    }

    console.error(CardEventReceived);
  },

  /**
   @summary raised event on all connected clients to let others know a particular player has complete their move
   @method RaiseEventTurnComplete
   @param {string} none
   @returns {boolean} no return
  **/
  RaiseEventTurnComplete: function RaiseEventTurnComplete() {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(4, GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID);
    }
  },

  /**
    @summary called on all players to validate if move is completed on all connected clients
    @method ReceiveEventTurnComplete
    @param {string} none
    @returns {boolean} no return
   **/
  ReceiveEventTurnComplete: function ReceiveEventTurnComplete(_uid) {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
      console.log(TurnCheckArray.length);
      if (TurnCheckArray.length == 0) TurnCheckArray.push(_uid);
      var ArrayLength = TurnCheckArray.length;
      var IDFound = false;

      for (var index = 0; index < ArrayLength; index++) {
        if (TurnCheckArray[index] == _uid) IDFound = true;
      }

      if (!IDFound) {
        TurnCheckArray.push(_uid);
      }

      console.log(TurnCheckArray);
      console.log(TurnCheckArray.length); // var TotalConnectedPlayers=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorCount();

      var TotalConnectedPlayers = this.PlayerGameInfo.length;

      if (TurnCheckArray.length == TotalConnectedPlayers) {
        TurnCheckArray = [];
        this.TurnCompleted = true;

        if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = RollCounter;
          GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[this.TurnNumber]);
          this.ChangeTurn();
          console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor());
          console.log("Change Turn is called by: " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
        }
      }
    }
  },

  /**
   @summary called when dice animation is played on all players
   @method ChangeTurn
   @param {string} none
   @returns {boolean} no return
  **/
  ChangeTurn: function ChangeTurn() {
    if (this.TurnNumber < this.PlayerGameInfo.length - 1) this.TurnNumber = this.TurnNumber + 1;else this.TurnNumber = 0;
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(2, this.TurnNumber);
  },

  /**
  @summary called from raise on event (from function "StartTurn" and "ChangeTurn" of this same class) to handle turn
  @method TurnHandler
  @param {string} none
  @returns {boolean} no return
  **/
  TurnHandler: function TurnHandler(_turn) {
    var _this2 = this;

    var _playerMatched = false;

    if (IsTweening) //check if animation of turn being played on other players 
      {
        setTimeout(function () {
          _this2.TurnHandler(_turn);
        }, 800);
      } else {
      this.TurnNumber = _turn;

      if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
        _playerMatched = true;

        if (!SkipNextTurn) {
          setTimeout(function () {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);
          }, 1000);
          console.log("its your turn " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
        }
      }

      this.UpdateGameUI(true, this.TurnNumber);
      GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("TurnNumber", this.TurnNumber, true);
      console.log("Turn Of: " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
      console.log(this.AllPlayerUI[this.TurnNumber].getComponent('PlayerProfileManager').PlayerInfo);
      console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor());
      console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors());
      this.SyncDataToPlayerGameInfo(0); //force sync spectator after completion of each turn

      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == true) this.SyncAllData_SpectateManager(); //skip this turn as skip turn has been called before

      if (_playerMatched && SkipNextTurn) {
        IsTweening = false;
        this.ChangeTurn();
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Skipping current turn", 1200);
        SkipNextTurn = false;
      }

      if (_playerMatched && this.PlayerGameInfo[this.TurnNumber].isGameFinished) {
        IsTweening = false;
        this.ChangeTurn();
      }
    }
  },
  SyncDataToPlayerGameInfo: function SyncDataToPlayerGameInfo(_ind) {
    var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();
    var MyData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
    var _counter = _ind;
    console.log(this.PlayerGameInfo[_counter].PlayerUID);
    console.log(MyData.customProperties.PlayerSessionData.PlayerUID);

    if (this.PlayerGameInfo[_counter].PlayerUID != MyData.customProperties.PlayerSessionData.PlayerUID) //dont update my own data
      {
        for (var index = 0; index < MainSessionData.length; index++) {
          if (this.PlayerGameInfo[_counter].PlayerUID == MainSessionData[index].customProperties.PlayerSessionData.PlayerUID) {
            this.PlayerGameInfo[_counter] = MainSessionData[index].customProperties.PlayerSessionData;

            if (_counter < this.PlayerGameInfo.length - 1) {
              _counter++;
              console.log("adding counter: " + _counter);
              this.SyncDataToPlayerGameInfo(_counter);
            } else {
              console.log(this.PlayerGameInfo);
            }
          }
        }
      } else {
      if (_counter < this.PlayerGameInfo.length - 1) {
        _counter++;
        console.log("adding counter: " + _counter);
        this.SyncDataToPlayerGameInfo(_counter);
      } else {
        console.log(this.PlayerGameInfo);
      }
    }
  },

  /**
  @summary called when all players have done their initial setup and first turn starts
  @method StartTurn
  @param {string} none
  @returns {boolean} no return
  **/
  StartTurn: function StartTurn() {
    this.AssignPlayerGameUI();
    this.EnablePlayerNodes();
    this.TurnNumber = 0; //reseting the turn number on start of the game
    //sending initial turn number over the network to start turn simultanously on all connected player's devices

    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(2, this.TurnNumber);
  },
  //#endregion
  //#region Function for gameplay

  /**
  @summary called to assign player UI (name/icons/number of players that to be active etc)
  @method AssignPlayerGameUI
  @param {string} none
  @returns {boolean} no return
  **/
  AssignPlayerGameUI: function AssignPlayerGameUI() {
    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
      this.AllPlayerUI[index].active = true;
      this.AllPlayerUI[index].getComponent('PlayerProfileManager').PlayerInfo = this.PlayerGameInfo[index];
      this.AllPlayerUI[index].getComponent('PlayerProfileManager').SetName(this.PlayerGameInfo[index].PlayerName);
    }
  },
  UpdateGameUI: function UpdateGameUI(_toggleHighlight, _index) {
    if (_toggleHighlight) {
      this.AllPlayerUI[_index].getComponent('PlayerProfileManager').PlayerInfo = this.PlayerGameInfo[_index];

      for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
        if (_index == index) {
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleBGHighlighter(true);
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleTextighlighter(true);
        } else {
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleBGHighlighter(false);
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleTextighlighter(false);
        }
      }
    }
  },

  /**
  @summary called to enbale respective players nodes inside gamaplay
  @method EnablePlayerNodes
  @param {string} none
  @returns {boolean} no return
  **/
  EnablePlayerNodes: function EnablePlayerNodes() {
    for (var index = 0; index < this.PlayerGameInfo.length; index++) {
      if (this.PlayerGameInfo[index].HomeBasedAmount == 1) this.AllPlayerNodes[index].setPosition(this.StartLocationNodes[0].position.x, this.StartLocationNodes[0].position.y);else if (this.PlayerGameInfo[index].BrickAndMortarAmount == 1) this.AllPlayerNodes[index].setPosition(this.StartLocationNodes[1].position.x, this.StartLocationNodes[1].position.y);
    }

    for (var _index3 = 0; _index3 < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; _index3++) {
      this.AllPlayerNodes[_index3].active = true;
    }
  },
  SetFollowCameraProperties: function SetFollowCameraProperties() {
    var targetPos = this.AllPlayerNodes[this.TurnNumber].convertToWorldSpaceAR(cc.Vec2(0, 120));
    this.CameraNode.position = this.CameraNode.parent.convertToNodeSpaceAR(targetPos);
    var ratio = targetPos.y / cc.winSize.height;
    this.Camera.zoomRatio = 2;
  },
  lateUpdate: function lateUpdate() {
    if (this.isCameraZooming) this.SetFollowCameraProperties();
  },
  syncDiceRoll: function syncDiceRoll(_roll) {
    IsTweening = true;
    this.CardDisplayed = false;

    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray().length; index++) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.Data.userID == this.PlayerGameInfo[this.TurnNumber].PlayerUID) {
        console.log("player matched:" + this.PlayerGameInfo[this.TurnNumber].PlayerName);
        this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.PlayerSessionData.PlayerRollCounter;
      }
    }

    if (this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter == 0 && !this.PlayerGameInfo[this.TurnNumber].InitialCounterAssigned) {
      if (this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[0].BusinessType == 1) {
        RollCounter = 0;
        this.PlayerGameInfo[this.TurnNumber].InitialCounterAssigned = true;
        console.error(RollCounter);
      } else {
        this.PlayerGameInfo[this.TurnNumber].InitialCounterAssigned = true;
        RollCounter = 13;
        console.error(RollCounter);
      }
    } else {
      if (this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter == 12) this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter + 21;else this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter + 1;
      RollCounter = this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter;
      console.error(RollCounter - 1);
    }

    DiceRoll = _roll;
    DiceTemp = 0;
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().PrintDiceValue_TurnDecision(DiceRoll);
    var targetPos = this.AllPlayerNodes[this.TurnNumber].convertToWorldSpaceAR(cc.Vec2(0, 120));

    var _pos = this.CameraNode.parent.convertToNodeSpaceAR(targetPos);

    this.TweenCamera(_pos, true, 0.4);
  },
  TempCheckSpace: function TempCheckSpace(_rolling) {
    var tempcounter = 0;
    var tempcounter2 = 0;

    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray().length; index++) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.Data.userID == this.PlayerGameInfo[this.TurnNumber].PlayerUID) {
        //console.log("player matched:"+this.PlayerGameInfo[this.TurnNumber].PlayerName);
        tempcounter2 = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.PlayerSessionData.PlayerRollCounter;
      }
    } // console.error(tempcounter2+" "+_roll);
    // if((tempcounter2+_roll)<33)
    // {
    //     if(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[0].BusinessType==1)
    //     {
    //         tempcounter=0+_roll-1;
    //         console.error(tempcounter);
    //     }
    //     else
    //     {
    //         tempcounter=13+_roll-1;
    //         console.error(tempcounter);
    //     }
    // }
    // else
    // {
    //     console.error(tempcounter2+" "+_roll);
    //     tempcounter=tempcounter2+_roll;
    // }


    if (tempcounter2 - 1 < 0) {
      console.error("starting from oblivion");
      tempcounter = tempcounter2 + _rolling - 1;
      var dicetobe = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[tempcounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType);
      console.error("to be: " + dicetobe);
    } else {
      tempcounter = tempcounter2 + _rolling;
      var dicetobe = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[tempcounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType);
      console.error("to be: " + dicetobe);
    }
  },
  RollDice: function RollDice() {
    var Dice1 = this.getRandom(1, 7);
    var Dice2 = this.getRandom(1, 7); // var Dice1=this.getRandom(8,25);
    // var Dice2=this.getRandom(8,25);

    DiceRoll = Dice1 + Dice2; //this.TempCheckSpace(DiceRoll);

    console.log("dice number: " + DiceRoll);
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(3, DiceRoll);
  },
  RollOneDice: function RollOneDice() {
    var Dice1 = this.getRandom(1, 7);
    return Dice1;
  },
  RollTwoDices: function RollTwoDices() {
    var Dice1 = this.getRandom(1, 7);
    var Dice2 = this.getRandom(1, 7);
    return Dice1 + Dice2;
  },
  callUponCard: function callUponCard() {
    var _spaceID = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType);

    if (_spaceID != 6 && _spaceID != 7) //6 menas payday and 7 means double payday
      {
        var RandomCard = this.getRandom(0, 15); //for testing only

        if (_spaceID == 2) //landed on some big buseinss
          {
            var valueIndex = [0, 1, 7, 10];
            var index = this.getRandom(0, 4);
            RandomCard = valueIndex[index];
          } else if (_spaceID == 5) //landed on some losses cards
          {
            var valueIndex = [0, 5, 6, 2];
            var index = this.getRandom(0, 4);
            RandomCard = valueIndex[index];
          } else if (_spaceID == 3) //landed on some marketing cards
          {
            var valueIndex = [0, 7, 3, 8, 13, 9];
            var index = this.getRandom(0, 6);
            RandomCard = valueIndex[index];
          } else if (_spaceID == 1) //landed on some marketing cards
          {
            var valueIndex = [0, 1, 6, 10];
            var index = this.getRandom(0, 4);
            RandomCard = valueIndex[index];
          }

        IsTweening = false;

        if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          var SendingData = {
            "randomCard": RandomCard,
            "counter": RollCounter
          };
          this.RaiseEventForCard(SendingData);
        } else {
          this.DisplayCardOnOthers();
        }
      } else {
      IsTweening = false;
      console.log("landed on pay day or double pay day and work is done so changing turn");
      this.RaiseEventTurnComplete();
    }
  },
  CallGameComplete: function CallGameComplete() {
    if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
      var _playerIndex = this.TurnNumber;

      if (this.PlayerGameInfo[_playerIndex].isGameFinished == false) {
        this.PlayerGameInfo[_playerIndex].isGameFinished = true;
        var _cash = this.PlayerGameInfo[this.TurnNumber].Cash;

        var HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;

        var BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;

        var BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

        var loanAmount = 0;

        for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
          if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
            loanAmount += GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanAmount;
          }
        }

        var BMCash = (BMAmount + BMLocations) * 150000;
        var HMCash = 0;
        if (HMAmount == 1) HMCash = 60000;else if (HMAmount == 2) HMCash = 25000 + 60000;else if (HMAmount == 3) HMCash = 25000 + 25000 + 60000;
        var TotalAssets = _cash + BMCash + HMCash - loanAmount;
        this.PlayerGameInfo[this.TurnNumber].TotalScore = TotalAssets;
        GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[this.TurnNumber]);
      }
    }
  },
  RaiseEventForGameComplete: function RaiseEventForGameComplete(_data) {
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(6, _data);
  },
  SyncGameOver: function SyncGameOver(_UID) {
    var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();
    var MyData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
    console.log(_UID);
    console.log(MyData.customProperties.PlayerSessionData.PlayerUID);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData.GameOver = true;

    if (MyData.customProperties.PlayerSessionData.PlayerUID == _UID) {
      //you won
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Total Cash: " + MyData.customProperties.PlayerSessionData.TotalScore + "\n" + '\n' + "Congrats! your cash is highest, you have won the game." + "\n" + '\n' + "\n" + "Game will be restarted automatcally after 15 seconds", 15000);
    } else {
      //you lose
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Total Cash: " + MyData.customProperties.PlayerSessionData.TotalScore + "\n" + '\n' + "unfortunately you have lost the game." + "\n" + '\n' + "\n" + "Game will be restarted automatcally after 15 seconds", 15000);
    }

    setTimeout(function () {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().RestartGame();
    }, 15060);
  },
  StartDiceRoll: function StartDiceRoll() {
    if (RollCounter >= GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
      console.log("Gameover");
      isGameOver = true;
      this.ZoomCameraOut();

      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
        this.CallGameComplete();
        var playercompleted = 0;
        var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();

        for (var index = 0; index < MainSessionData.length; index++) {
          if (MainSessionData[index].customProperties.PlayerSessionData.isGameFinished) {
            playercompleted++;
          }
        }

        if (playercompleted == this.PlayerGameInfo.length) {
          var max = 0;
          var SelectedInd = 0;
          var SessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();

          for (var _index4 = 0; _index4 < SessionData.length; _index4++) {
            var _value = SessionData[_index4].customProperties.PlayerSessionData.TotalScore;

            if (_value > max) {
              SelectedInd = _index4;
              max = _value;
            }
          }

          console.log("game won by player id: " + SessionData[SelectedInd].customProperties.PlayerSessionData.PlayerUID);
          this.RaiseEventForGameComplete(SessionData[SelectedInd].customProperties.PlayerSessionData.PlayerUID); //game completed on all systems
        } else {
          IsTweening = false;
          this.ChangeTurn();
        }
      }
    } else {
      DiceTemp = DiceTemp + 1;

      var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.y);

      this.TweenPlayer(this.AllPlayerNodes[this.TurnNumber], _toPos);
    }
  },
  getRandom: function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min included and max excluded
  },
  TweenCamera: function TweenCamera(_pos, isZoom, time) {
    var _this3 = this;

    cc.tween(this.CameraNode).to(time, {
      position: cc.v2(_pos.x, _pos.y)
    }, {
      easing: "quadInOut"
    }).call(function () {
      if (isZoom) _this3.ZoomCameraIn();else _this3.ZoomCameraOut();
    }).start();
  },
  ZoomCameraIn: function ZoomCameraIn() {
    var _this4 = this;

    setTimeout(function () {
      if (_this4.Camera.zoomRatio < 2) {
        _this4.Camera.zoomRatio = _this4.Camera.zoomRatio + 0.03;

        _this4.ZoomCameraIn();
      } else {
        _this4.Camera.zoomRatio = 2;
        _this4.isCameraZooming = true;

        _this4.StartDiceRoll();
      }
    }, 10);
  },
  ZoomCameraOut: function ZoomCameraOut() {
    var _this5 = this;

    setTimeout(function () {
      if (_this5.Camera.zoomRatio >= 1) {
        _this5.isCameraZooming = false;
        _this5.Camera.zoomRatio = _this5.Camera.zoomRatio - 0.03;

        _this5.ZoomCameraOut();
      } else {
        _this5.CameraNode.position = cc.Vec2(0, 0);
        _this5.Camera.zoomRatio = 1; //GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);

        GamePlayReferenceManager.Instance.Get_GameplayUIManager().PrintDiceValue_TurnDecision(0);

        if (!isGameOver) {
          if (_this5.PlayerGameInfo[_this5.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
            if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) PassedPayDay = true;
            if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 7) DoublePayDay = true;

            if (PassedPayDay && !DoublePayDay && !NextTurnDoublePay) {
              NextTurnDoublePay = false;
              PassedPayDay = false;
              DoublePayDay = false;

              _this5.ProcessPayDay_TurnDecision(false);
            } else if (PassedPayDay && DoublePayDay || PassedPayDay && NextTurnDoublePay) {
              NextTurnDoublePay = false;
              PassedPayDay = false;
              DoublePayDay = false;

              _this5.ProcessPayDay_TurnDecision(true);
            } else {
              _this5.callUponCard();
            }
          } else {
            _this5.callUponCard();
          }
        }
      }
    }, 10);
  },
  TweenPlayer: function TweenPlayer(Node, ToPos) {
    var _this6 = this;

    cc.tween(Node).to(0.4, {
      position: cc.v2(ToPos.x, ToPos.y)
    }, {
      easing: "quadInOut"
    }).call(function () {
      if (DiceTemp < DiceRoll) {
        if (_this6.PlayerGameInfo[_this6.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) PassedPayDay = true;
          if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 7) DoublePayDay = true;
        }

        if (RollCounter == 12) RollCounter = RollCounter + 21;else RollCounter = RollCounter + 1; //DiceTemp=DiceTemp+1; 

        console.log(DiceTemp + " " + RollCounter);

        _this6.StartDiceRoll(); //this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter=RollCounter;

      } else {
        var _newpos = cc.Vec2(0, 0);

        _this6.TweenCamera(_newpos, false, 0.6); //zoomout

      }
    }).start();
  },
  //rules implmentation during turn (turn decisions)
  TogglePayDay: function TogglePayDay(_st1, _St2) {
    PassedPayDay = _st1;
    DoublePayDay = _St2;
  },
  ExpandBusiness_TurnDecision: function ExpandBusiness_TurnDecision(amount, _index, _locationName) {
    if (this.PlayerGameInfo[this.TurnNumber].Cash >= amount) {
      this.PlayerGameInfo[this.TurnNumber].Cash = this.PlayerGameInfo[this.TurnNumber].Cash - amount;
      this.PlayerGameInfo[this.TurnNumber].TotalLocationsAmount = this.PlayerGameInfo[this.TurnNumber].TotalLocationsAmount + 1;

      this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[_index].LocationsName.push(_locationName);

      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully expanded your business.", 1000);
      setTimeout(function () {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().OnExpandButtonExitClicked_TurnDecision();
      }, 1200);
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You don't have enough cash to expand this business, cash needed $ " + amount);
    }
  },
  GenerateExpandBusiness_Prefabs_TurnDecision: function GenerateExpandBusiness_Prefabs_TurnDecision() {
    BusinessLocationNodes = [];
    console.log(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness);

    for (var i = 0; i < this.PlayerGameInfo[this.TurnNumber].NoOfBusiness.length; i++) {
      if (parseInt(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[i].BusinessType) == 2) //this means there is brick and mortar in list
        {
          var node = cc.instantiate(GamePlayReferenceManager.Instance.Get_GameplayUIManager().TurnDecisionSetupUI.ExpandBusinessPrefab);
          node.parent = GamePlayReferenceManager.Instance.Get_GameplayUIManager().TurnDecisionSetupUI.ExpandBusinessScrollContent;
          node.getComponent('ExpandBusinessHandler').SetBusinessIndex(i);
          node.getComponent('ExpandBusinessHandler').SetName(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[i].BusinessName);
          node.getComponent('ExpandBusinessHandler').ResetEditBox();
          BusinessLocationNodes.push(node);
        }
    }

    console.log(BusinessLocationNodes);
    return BusinessLocationNodes.length;
  },
  DestroyGeneratedNodes: function DestroyGeneratedNodes() {
    for (var index = 0; index < BusinessLocationNodes.length; index++) {
      BusinessLocationNodes[index].destroy();
    }

    BusinessLocationNodes = [];
  },
  UpdateStocks_TurnDecision: function UpdateStocks_TurnDecision(_name, _ShareAmount, _isAdding) {
    if (_isAdding) {
      var _stock = new StockInfo();

      _stock.BusinessName = _name;
      _stock.ShareAmount = _ShareAmount;
      this.PlayerGameInfo[this.TurnNumber].NoOfStocks.push(_stock);
    }
  },
  ProcessPayDay_TurnDecision: function ProcessPayDay_TurnDecision(_isDoublePayDay) {
    var _this7 = this;

    if (_isDoublePayDay === void 0) {
      _isDoublePayDay = false;
    }

    if (SkipNextPayday) //if previously skip payday was stored by any card
      {
        SkipNextPayday = false;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Skipping PayDay.", 1600);
        setTimeout(function () {
          _this7.callUponCard();
        }, 1650);
      } else {
      var _title = "";
      if (_isDoublePayDay) _title = "DoublePayDay";else _title = "PayDay";
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title, _isDoublePayDay, SkipHMNextPayday, SkipBMNextPayday);
    }
  },
  //#endregion
  //#region Cards Rules
  ToggleDoublePayNextTurn: function ToggleDoublePayNextTurn(_state) {
    NextTurnDoublePay = _state;
  },
  ToggleSkipNextTurn: function ToggleSkipNextTurn(_state) {
    SkipNextTurn = _state;
  },
  ToggleSkipPayDay_Whole: function ToggleSkipPayDay_Whole(_state) {
    SkipNextPayday = _state;
  },
  ToggleSkipPayDay_HomeBased: function ToggleSkipPayDay_HomeBased(_state) {
    SkipHMNextPayday = _state;
  },
  ToggleSkipPayDay_BrickAndMortar: function ToggleSkipPayDay_BrickAndMortar(_state) {
    SkipBMNextPayday = _state;
  },
  LoseAllMarketingMoney: function LoseAllMarketingMoney() {
    var _loseAmount = -1;

    if (this.PlayerGameInfo[this.TurnNumber].MarketingAmount > 0) {
      _loseAmount = this.PlayerGameInfo[this.TurnNumber].MarketingAmount;
      this.PlayerGameInfo[this.TurnNumber].MarketingAmount = 0;
    } else {
      _loseAmount = 0;
    }

    return _loseAmount;
  },
  MultiplyMarketingMoney: function MultiplyMarketingMoney(_multiplier) {
    var _amountIncreased = -1;

    if (this.PlayerGameInfo[this.TurnNumber].MarketingAmount > 0) {
      _amountIncreased = this.PlayerGameInfo[this.TurnNumber].MarketingAmount *= _multiplier;
    } else {
      _amountIncreased = 0;
    }

    return _amountIncreased;
  },
  GetMarketingMoney: function GetMarketingMoney(_profit) {
    var _amount = -1;

    if (this.PlayerGameInfo[this.TurnNumber].MarketingAmount > 0) {
      _profit = _profit / 100;
      _amount = this.PlayerGameInfo[this.TurnNumber].MarketingAmount *= _profit;
      this.PlayerGameInfo[this.TurnNumber].MarketingAmount = 0;
      this.PlayerGameInfo[this.TurnNumber].Cash += _amount;
    } else {
      _amount = 0;
    }

    return _amount;
  } //#endregion
  //#endregion

}); //module.exports  = PlayerData; //when imports in another script only reference of playerdata class would be able to accessed from Gamemanager import

module.exports = GameManager; //#endregion

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIkxvY2F0aW9uc05hbWUiLCJMb2FuVGFrZW4iLCJMb2FuQW1vdW50IiwiY3RvciIsIlN0b2NrSW5mbyIsIlNoYXJlQW1vdW50IiwiUGxheWVyRGF0YSIsIlBsYXllck5hbWUiLCJQbGF5ZXJVSUQiLCJBdmF0YXJJRCIsIklzQm90IiwiTm9PZkJ1c2luZXNzIiwiSG9tZUJhc2VkQW1vdW50IiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIk5vT2ZTdG9ja3MiLCJDYXNoIiwiR29sZENvdW50IiwiU3RvY2tDb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkxhd3llclN0YXR1cyIsIklzQmFua3J1cHQiLCJQbGF5ZXJSb2xsQ291bnRlciIsIkluaXRpYWxDb3VudGVyQXNzaWduZWQiLCJpc0dhbWVGaW5pc2hlZCIsIlRvdGFsU2NvcmUiLCJHYW1lT3ZlciIsIlJvbGxDb3VudGVyIiwiRGljZVRlbXAiLCJEaWNlUm9sbCIsIklzVHdlZW5pbmciLCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJUdXJuQ2hlY2tBcnJheSIsIkJ1c2luZXNzTG9jYXRpb25Ob2RlcyIsIlBhc3NlZFBheURheSIsIkRvdWJsZVBheURheSIsIk5leHRUdXJuRG91YmxlUGF5IiwiU2tpcE5leHRUdXJuIiwiU2tpcE5leHRQYXlkYXkiLCJTa2lwSE1OZXh0UGF5ZGF5IiwiU2tpcEJNTmV4dFBheWRheSIsIkNhcmRFdmVudFJlY2VpdmVkIiwiaXNHYW1lT3ZlciIsIkdhbWVNYW5hZ2VyIiwiQ29tcG9uZW50IiwiUGxheWVyR2FtZUluZm8iLCJQbGF5ZXJOb2RlIiwiTm9kZSIsIkNhbWVyYU5vZGUiLCJBbGxQbGF5ZXJVSSIsIkFsbFBsYXllck5vZGVzIiwiU3RhcnRMb2NhdGlvbk5vZGVzIiwic3RhdGljcyIsIkluc3RhbmNlIiwib25Mb2FkIiwiVHVybk51bWJlciIsIlR1cm5Db21wbGV0ZWQiLCJDaGVja1JlZmVyZW5jZXMiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDaGVja1NwZWN0YXRlIiwiY29uc29sZSIsImxvZyIsImdldFBob3RvblJlZiIsIm15Um9vbSIsImdldEN1c3RvbVByb3BlcnR5IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJIiwiQWxsRGF0YSIsIlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyIsIlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlciIsIlVwZGF0ZUdhbWVVSSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiR2V0VHVybk51bWJlciIsIkFzc2lnblBsYXllckdhbWVVSSIsImluZGV4IiwibGVuZ3RoIiwiX3RvUG9zIiwiVmVjMiIsIkdldF9TcGFjZU1hbmFnZXIiLCJEYXRhIiwiUmVmZXJlbmNlTG9jYXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5Iiwic2V0UG9zaXRpb24iLCJNYXhQbGF5ZXJzIiwiYWN0aXZlIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIlRvdGFsQ29ubmVjdGVkUGxheWVycyIsIm15Um9vbUFjdG9yQ291bnQiLCJQaG90b25BY3RvciIsImN1c3RvbVByb3BlcnRpZXMiLCJ1c2VySUQiLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNoYW5nZVR1cm4iLCJSYWlzZUV2ZW50Rm9yQ2FyZCIsIl9kYXRhIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJSYWlzZUV2ZW50IiwiRGlzcGxheUNhcmRPbk90aGVycyIsImVycm9yIiwiT25MYW5kZWRPblNwYWNlIiwic2V0VGltZW91dCIsIlJlc2V0Q2FyZERpc3BsYXkiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiUmFuZG9tQ2FyZCIsInJhbmRvbUNhcmQiLCJjb3VudGVyIiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZSIsIl91aWQiLCJwdXNoIiwiQXJyYXlMZW5ndGgiLCJJREZvdW5kIiwiVHVybkhhbmRsZXIiLCJfdHVybiIsIl9wbGF5ZXJNYXRjaGVkIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUGxheWVySW5mbyIsIlJvb21BY3RvcnMiLCJTaG93VG9hc3QiLCJfaW5kIiwiTWFpblNlc3Npb25EYXRhIiwiTXlEYXRhIiwiX2NvdW50ZXIiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIlN0YXJ0VHVybiIsIkVuYWJsZVBsYXllck5vZGVzIiwiU2V0TmFtZSIsIl90b2dnbGVIaWdobGlnaHQiLCJfaW5kZXgiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzIiwidGFyZ2V0UG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicGFyZW50IiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJyYXRpbyIsIndpblNpemUiLCJoZWlnaHQiLCJ6b29tUmF0aW8iLCJsYXRlVXBkYXRlIiwic3luY0RpY2VSb2xsIiwiX3JvbGwiLCJteVJvb21BY3RvcnNBcnJheSIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsIl9wb3MiLCJUd2VlbkNhbWVyYSIsIlRlbXBDaGVja1NwYWNlIiwiX3JvbGxpbmciLCJ0ZW1wY291bnRlciIsInRlbXBjb3VudGVyMiIsImRpY2V0b2JlIiwicGFyc2VJbnQiLCJTcGFjZURhdGEiLCJTcGFjZXNUeXBlIiwiUm9sbERpY2UiLCJEaWNlMSIsImdldFJhbmRvbSIsIkRpY2UyIiwiUm9sbE9uZURpY2UiLCJSb2xsVHdvRGljZXMiLCJjYWxsVXBvbkNhcmQiLCJfc3BhY2VJRCIsInZhbHVlSW5kZXgiLCJTZW5kaW5nRGF0YSIsIkNhbGxHYW1lQ29tcGxldGUiLCJfcGxheWVySW5kZXgiLCJfY2FzaCIsIkhNQW1vdW50IiwiR2V0X0dhbWVNYW5hZ2VyIiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsImxvYW5BbW91bnQiLCJCTUNhc2giLCJITUNhc2giLCJUb3RhbEFzc2V0cyIsIlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUiLCJTeW5jR2FtZU92ZXIiLCJfVUlEIiwiUmVzdGFydEdhbWUiLCJTdGFydERpY2VSb2xsIiwiWm9vbUNhbWVyYU91dCIsInBsYXllcmNvbXBsZXRlZCIsIm1heCIsIlNlbGVjdGVkSW5kIiwiU2Vzc2lvbkRhdGEiLCJfdmFsdWUiLCJUd2VlblBsYXllciIsIm1pbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImlzWm9vbSIsInRpbWUiLCJ0d2VlbiIsInRvIiwidjIiLCJlYXNpbmciLCJjYWxsIiwiWm9vbUNhbWVyYUluIiwic3RhcnQiLCJQcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbiIsIlRvUG9zIiwiX25ld3BvcyIsIlRvZ2dsZVBheURheSIsIl9zdDEiLCJfU3QyIiwiRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiYW1vdW50IiwiX2xvY2F0aW9uTmFtZSIsIk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uIiwiR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbiIsImkiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQiLCJTZXRCdXNpbmVzc0luZGV4IiwiUmVzZXRFZGl0Qm94IiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiZGVzdHJveSIsIlVwZGF0ZVN0b2Nrc19UdXJuRGVjaXNpb24iLCJfbmFtZSIsIl9TaGFyZUFtb3VudCIsIl9pc0FkZGluZyIsIl9zdG9jayIsIl9pc0RvdWJsZVBheURheSIsIl90aXRsZSIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4iLCJfc3RhdGUiLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiTG9zZUFsbE1hcmtldGluZ01vbmV5IiwiX2xvc2VBbW91bnQiLCJNdWx0aXBseU1hcmtldGluZ01vbmV5IiwiX211bHRpcGxpZXIiLCJfYW1vdW50SW5jcmVhc2VkIiwiR2V0TWFya2V0aW5nTW9uZXkiLCJfcHJvZml0IiwiX2Ftb3VudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBLElBQUlBLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUMzQkMsRUFBQUEsSUFBSSxFQUFDLENBRHNCO0FBRTNCQyxFQUFBQSxTQUFTLEVBQUUsQ0FGZ0I7QUFFSztBQUNoQ0MsRUFBQUEsY0FBYyxFQUFFLENBSFcsQ0FHSzs7QUFITCxDQUFSLENBQXZCLEVBTUE7O0FBQ0EsSUFBSUMsWUFB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QUFDSCxLQU5ELE1BUUE7QUFDSUEsTUFBQUEsT0FBTyxHQUFDLENBQVI7QUFDSDs7QUFFRCxXQUFPQSxPQUFQO0FBQ0gsR0FubUNvQixDQXNtQ3JCO0FBQ0E7O0FBdm1DcUIsQ0FBVCxDQUFoQixFQXltQ0E7O0FBQ0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFrQnZOLFdBQWxCLEVBQ0EiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vI3JlZ2lvbiBzdXBlcmNsYXNzZXMgYW5kIGVudW1lcmF0aW9uc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bUJ1c2luZXNzVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgSG9tZUJhc2VkOiAxLCAgICAgICAgICAgICAgICAgICAvL2EgYnVzaW5lc3MgdGhhdCB5b3Ugb3BlcmF0ZSBvdXQgb2YgeW91ciBob21lXHJcbiAgICBicmlja0FuZG1vcnRhcjogMiAgICAgICAgICAgICAgIC8vYSBzdG9yZSBmcm9udCBidXNpbmVzc1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzc0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzSW5mbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiQnVzaW5lc3NJbmZvXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOYW1lOiBcIkJ1c2luZXNzRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NUeXBlOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1vZGVcIixcclxuICAgICAgIHR5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICAgICBkZWZhdWx0OiBFbnVtQnVzaW5lc3NUeXBlLk5vbmUsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiQnVzaW5lc3MgY2F0b2dvcnkgZm9yIHBsYXllcnNcIix9LCBcclxuICAgIEJ1c2luZXNzVHlwZURlc2NyaXB0aW9uOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiVHlwZSAoYnkgbmFtZSkgb2YgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgQnVzaW5lc3NOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiTmFtZSBvZiB0aGUgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgIEFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJiYWxhbmNlIG9mIGJ1c2luZXNzXCIsfSxcclxuICAgICAgSXNQYXJ0bmVyc2hpcDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc1BhcnRuZXJzaGlwXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwdzpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgZG9uZSBwYXJ0bmVyc2hpcCB3aXRoIHNvbWVvbmUgd2l0aCBjdXJyZW50IGJ1c2luZXNzXCIsfSxcclxuICAgICAgIFBhcnRuZXJJRDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGFydG5lcklEXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgdG9vbHRpcDpcIklEIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLH0sXHJcbiAgICAgICAgTG9jYXRpb25zTmFtZTpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9jYXRpb25zTmFtZVwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBbY2MuVGV4dF0sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgIHRvb2x0aXA6XCJpZiBwbGF5ZXIgb3ducyBicmljayBhbmQgbW9ydGFyIGhlL3NoZSBjYW4gZXhwYW5kIHRvIG5ldyBsb2NhdGlvblwiLH0sXHJcbiAgICAgICAgTG9hblRha2VuOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5BbW91bnRcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcblxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3RvY2tJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTdG9ja0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIlN0b2NrSW5mb1wiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgTmFtZTogXCJTdG9ja0RhdGFcIixcclxuICAgIEJ1c2luZXNzTmFtZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc05hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm5hbWUgb2YgdGhlIGJ1c2luZXNzIGluIHdoaWNoIHN0b2NrcyB3aWxsIGJlIGhlbGRcIix9LCBcclxuICAgIFNoYXJlQW1vdW50OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJTaGFyZUFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOiBcIlNoYXJlIGFtb3VudCBvZiB0aGUgc3RvY2tcIix9LFxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgIFBsYXllciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlBsYXllckRhdGFcIixcclxucHJvcGVydGllczogeyBcclxuICAgIFBsYXllck5hbWU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibmFtZSBvZiB0aGUgcGxheWVyXCIsfSxcclxuICAgIFBsYXllclVJRDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJVSURcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIklEIG9mIHRoZSBwbGF5ZXJcIix9LFxyXG4gICAgQXZhdGFySUQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFySURcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJpZCByZWZlcmVuY2UgZm9yIHBsYXllciBhdmF0YXIgc2VsZWN0aW9uXCIsfSxcclxuICAgIElzQm90OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIklzQm90XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwdzpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIGN1cnJlbnQgcGxheWVyIGlzIGJvdFwiLH0sIFxyXG4gICAgTm9PZkJ1c2luZXNzOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzXCIsXHJcbiAgICAgICB0eXBlOiBbQnVzaW5lc3NJbmZvXSxcclxuICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIk51bWJlciBvZiBidXNpbmVzcyBhIHBsYXllciBjYW4gb3duXCIsfSwgXHJcbiAgICBIb21lQmFzZWRBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJudW1iZXIgb2YgaG9tZSBiYXNlZCBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBCcmlja0FuZE1vcnRhckFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja0FuZE1vcnRhckFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibnVtYmVyIG9mIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLH0sIFxyXG4gICAgVG90YWxMb2NhdGlvbnNBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxMb2NhdGlvbnNBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm51bWJlciBvZiBsb2NhdGlvbnMgb2YgYWxsIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3Nlc3NcIix9LCBcclxuICAgIE5vT2ZTdG9ja3M6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU3RvY2tzXCIsXHJcbiAgICAgICB0eXBlOiBbU3RvY2tJbmZvXSxcclxuICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIk51bWJlciBvZiBzdG9jayBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBDYXNoOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgY2FzaCBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBHb2xkQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiR29sZENvdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiY291bnQgb2YgZ29sZCBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIFN0b2NrQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tDb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImNvdW50IG9mIHN0b2NrcyBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIExvYW5UYWtlbjpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXB3OmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyB0YWtlbiBsb2FuIGZyb20gYmFuayBvciBub3RcIix9LFxyXG4gICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBsb2FuIHRha2VuIGZyb20gdGhlIGJhbmtcIix9LFxyXG4gICAgTWFya2V0aW5nQW1vdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0Ftb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIm1hcmtldGluZyBhbW91bnQgYSBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBMYXd5ZXJTdGF0dXM6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTGF3eWVyU3RhdHVzXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgaGlyZWQgYSBsYXd5ZXIgb3Igbm90XCIsfSxcclxuICAgIElzQmFua3J1cHQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNCYW5rcnVwdFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGJlZW4gQmFua3J1cHRlZCBvciBub3RcIix9LFxyXG4gICAgUGxheWVyUm9sbENvdW50ZXI6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyUm9sbENvdW50ZXJcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHRvIHN0b3JlIHJvbGwgY291bnRvciBmb3IgcGxheWVyXCIsfSxcclxuICAgIEluaXRpYWxDb3VudGVyQXNzaWduZWQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICBpc0dhbWVGaW5pc2hlZDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiaXNHYW1lRmluaXNoZWRcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgIFRvdGFsU2NvcmU6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsU2NvcmVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICBHYW1lT3ZlcjpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiR2FtZU92ZXJcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG59LFxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG5cclxufSk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIEdhbWUgTWFuYWdlciBDbGFzc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0obWFpbiBjbGFzcykgY2xhc3MgZm9yIEdhbWUgTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUm9sbENvdW50ZXI9MDtcclxudmFyIERpY2VUZW1wPTA7XHJcbnZhciBEaWNlUm9sbD0wO1xyXG52YXIgSXNUd2VlbmluZz1mYWxzZTtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgVHVybkNoZWNrQXJyYXk9W107XHJcbnZhciBCdXNpbmVzc0xvY2F0aW9uTm9kZXM9W107XHJcblxyXG52YXIgUGFzc2VkUGF5RGF5PWZhbHNlO1xyXG52YXIgRG91YmxlUGF5RGF5PWZhbHNlO1xyXG5cclxuLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbnZhciBOZXh0VHVybkRvdWJsZVBheT1mYWxzZTtcclxudmFyIFNraXBOZXh0VHVybj1mYWxzZTtcclxudmFyIFNraXBOZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG52YXIgU2tpcEhNTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgU2tpcEJNTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG5cclxudmFyIGlzR2FtZU92ZXI9ZmFsc2U7XHJcblxyXG52YXIgR2FtZU1hbmFnZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkdhbWVNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUGxheWVyR2FtZUluZm86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJhbGwgcGxheWVyJ3MgZGF0YVwifSxcclxuICAgICAgICBQbGF5ZXJOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBwbGF5ZXJcIix9LCAgICBcclxuICAgICAgICBDYW1lcmFOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBjYW1lcmFcIix9LCAgICBcclxuICAgICAgICBBbGxQbGF5ZXJVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBvZiB1aSBvZiBhbGwgcGxheWVyc1wiLH0sICAgICAgXHJcbiAgICAgICAgQWxsUGxheWVyTm9kZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2Ygbm9kZSBvZiBhbGwgcGxheWVycyBpbnNpZGUgZ2FtZXBsYXlcIix9LCAgIFxyXG4gICAgICAgIFN0YXJ0TG9jYXRpb25Ob2Rlczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBvZiBhdHRheSBvZiBsb2NhdGlvbnNcIix9LCAgIFxyXG4gICAgfSxcclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBQbGF5ZXJEYXRhOiBQbGF5ZXJEYXRhLFxyXG4gICAgICAgIEJ1c2luZXNzSW5mbzpCdXNpbmVzc0luZm8sXHJcbiAgICAgICAgRW51bUJ1c2luZXNzVHlwZTpFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgICAgIEluc3RhbmNlOm51bGxcclxuICAgIH0sXHJcblxyXG4gICAgLy8jcmVnaW9uIEFsbCBGdW5jdGlvbnMgb2YgR2FtZU1hbmFnZXJcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiBjbGFzcyBpcyBjcmVhdGVkXHJcbiAgICBAbWV0aG9kIG9uTG9hZFxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIHRoaXMuVHVybk51bWJlcj0wO1xyXG4gICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD1mYWxzZTtcclxuICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuSW5pdF9HYW1lTWFuYWdlcigpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4PTA7XHJcbiAgICAgICAgdGhpcy5DYXJkQ291bnRlcj0wO1xyXG4gICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD1mYWxzZTtcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD1mYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gYXNzaWduIHJlZmVyZW5jZSBvZiByZXF1aXJlZCBjbGFzc2VzXHJcbiAgICBAbWV0aG9kIENoZWNrUmVmZXJlbmNlc1xyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBpbml0aWFsIGdhbWVtYW5hZ2VyIGVzc2V0aWFsc1xyXG4gICAgQG1ldGhvZCBJbml0X0dhbWVNYW5hZ2VyXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBJbml0X0dhbWVNYW5hZ2VyICgpIHtcclxuICAgICAgICB0aGlzLkNhbWVyYT10aGlzLkNhbWVyYU5vZGUuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSk7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmc9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1bXTtcclxuICAgICAgICBSb2xsQ291bnRlcj0wO1xyXG4gICAgICAgIERpY2VUZW1wPTA7XHJcbiAgICAgICAgRGljZVJvbGw9MDsgIFxyXG5cclxuICAgICAgICAvL2lmIGpvaW5lZCBwbGF5ZXIgaXMgc3BlY3RhdGVcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3RhdHVzIG9mIGluaXRpYWwgYnVzaW5lc3Mgc2V0cDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKSk7XHJcbiAgICAgICAgICAgIC8vaWYgaW5pdGFsIHNldHVwIGhhcyBiZWVuIGRvbmUgYW5kIGdhbWUgaXMgdW5kZXIgd2F5XHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIik9PXRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgQWxsRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvPUFsbERhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Jbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNyZWdpb24gcHVibGljIGZ1bmN0aW9ucyB0byBnZXQgZGF0YSAoYWNjZXNzaWJsZSBmcm9tIG90aGVyIGNsYXNzZXMpXHJcbiAgICBHZXRUdXJuTnVtYmVyICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5UdXJuTnVtYmVyO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gU3BlY3RhdGVNb2RlIENvZGVcclxuXHJcbiAgICBTeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB2YXIgX3RvUG9zPWNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKF90b1Bvcy54LF90b1Bvcy55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3luY2VkIHBsYXllcm5vZGVzXCIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlcigpXHJcbiAgICB7XHJcbiAgICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICAgIGlmKFR1cm5DaGVja0FycmF5Lmxlbmd0aD09VG90YWxDb25uZWN0ZWRQbGF5ZXJzKVxyXG4gICAgICB7XHJcbiAgICAgICAgVHVybkNoZWNrQXJyYXk9W107XHJcbiAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkPXRydWU7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgVHVybiBpcyBjYWxsZWQgYnk6IFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gZnVuY3Rpb25zIHJlbGF0ZWQgdG8gVHVybiBNZWNoYW5pc21cclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSB3aGF0IGNhcmQgaGFzIGJlZW4gc2VsZWN0ZWQgYnkgcGxheWVyXHJcbiAgICBAbWV0aG9kIFJhaXNlRXZlbnRGb3JDYXJkXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmFpc2VFdmVudEZvckNhcmQoX2RhdGEpXHJcbiAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNSxfZGF0YSk7XHJcbiAgfSxcclxuXHJcblxyXG4gIERpc3BsYXlDYXJkT25PdGhlcnMoKVxyXG4gIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG4gICAgaWYoQ2FyZEV2ZW50UmVjZWl2ZWQ9PXRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLkNhcmRDb3VudGVyKTtcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD1mYWxzZTtcclxuICAgICAgICBpZighdGhpcy5DYXJkRGlzcGxheWVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPXRydWU7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLkNhcmRDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLk9uTGFuZGVkT25TcGFjZShmYWxzZSx0aGlzLlJhbmRvbUNhcmRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvL2NoZWNrIGFmdGVyIGV2ZXJ5IDAuNSBzZWNvbmRzXHJcbiAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRDYXJkRGlzcGxheSgpXHJcbiAge1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpXHJcbiAge1xyXG5cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcblxyXG4gICAgdmFyIFJhbmRvbUNhcmQ9X2RhdGEucmFuZG9tQ2FyZDtcclxuICAgIHZhciBjb3VudGVyPV9kYXRhLmNvdW50ZXI7XHJcblxyXG4gICAgdGhpcy5SYW5kb21DYXJkSW5kZXg9UmFuZG9tQ2FyZDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXI9Y291bnRlcjtcclxuXHJcbiAgIFxyXG4gICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UodHJ1ZSxSYW5kb21DYXJkKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD10cnVlO1xyXG4gICAgICAgIC8vIGlmKElzVHdlZW5pbmc9PWZhbHNlICYmIHRoaXMuQ2FyZERpc3BsYXllZD09ZmFsc2UpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsUmFuZG9tQ2FyZCk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuQ2FyZERpc3BsYXllZD10cnVlO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuXHJcbiAgICBcclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHBhcnRpY3VsYXIgcGxheWVyIGhhcyBjb21wbGV0ZSB0aGVpciBtb3ZlXHJcbiAgICBAbWV0aG9kIFJhaXNlRXZlbnRUdXJuQ29tcGxldGVcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSYWlzZUV2ZW50VHVybkNvbXBsZXRlKClcclxuICB7XHJcbiAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT1mYWxzZSlcclxuICAgIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg0LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgb24gYWxsIHBsYXllcnMgdG8gdmFsaWRhdGUgaWYgbW92ZSBpcyBjb21wbGV0ZWQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzXHJcbiAgICBAbWV0aG9kIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZShfdWlkKVxyXG4gIHtcclxuICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PTApXHJcbiAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpOyBcclxuXHJcbiAgICAgICAgdmFyIEFycmF5TGVuZ3RoPVR1cm5DaGVja0FycmF5Lmxlbmd0aDtcclxuICAgICAgICB2YXIgSURGb3VuZD1mYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQXJyYXlMZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5W2luZGV4XT09X3VpZClcclxuICAgICAgICAgICAgICAgIElERm91bmQ9dHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFJREZvdW5kKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICAgICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycz10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PVRvdGFsQ29ubmVjdGVkUGxheWVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgVHVybiBpcyBjYWxsZWQgYnk6IFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gZGljZSBhbmltYXRpb24gaXMgcGxheWVkIG9uIGFsbCBwbGF5ZXJzXHJcbiAgICBAbWV0aG9kIENoYW5nZVR1cm5cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENoYW5nZVR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuVHVybk51bWJlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9dGhpcy5UdXJuTnVtYmVyKzE7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLHRoaXMuVHVybk51bWJlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIGZyb20gcmFpc2Ugb24gZXZlbnQgKGZyb20gZnVuY3Rpb24gXCJTdGFydFR1cm5cIiBhbmQgXCJDaGFuZ2VUdXJuXCIgb2YgdGhpcyBzYW1lIGNsYXNzKSB0byBoYW5kbGUgdHVyblxyXG4gICAgQG1ldGhvZCBUdXJuSGFuZGxlclxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgVHVybkhhbmRsZXIoX3R1cm4pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJNYXRjaGVkPWZhbHNlO1xyXG4gICAgICAgIGlmKElzVHdlZW5pbmcpIC8vY2hlY2sgaWYgYW5pbWF0aW9uIG9mIHR1cm4gYmVpbmcgcGxheWVkIG9uIG90aGVyIHBsYXllcnMgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkhhbmRsZXIoX3R1cm4pO1xyXG4gICAgICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPV90dXJuO1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3BsYXllck1hdGNoZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZighU2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIHlvdXIgdHVybiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsdGhpcy5UdXJuTnVtYmVyLHRydWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlR1cm4gT2Y6IFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGxQbGF5ZXJVSVt0aGlzLlR1cm5OdW1iZXJdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5QbGF5ZXJJbmZvKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCkpO1xyXG4gICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PXRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG5cclxuICAgICAgICAgICAgLy9za2lwIHRoaXMgdHVybiBhcyBza2lwIHR1cm4gaGFzIGJlZW4gY2FsbGVkIGJlZm9yZVxyXG4gICAgICAgICAgICBpZihfcGxheWVyTWF0Y2hlZCAmJiBTa2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTa2lwcGluZyBjdXJyZW50IHR1cm5cIiwxMjAwKTtcclxuICAgICAgICAgICAgICAgIFNraXBOZXh0VHVybj1mYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZClcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgIHZhciBNeURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgICAgIHZhciBfY291bnRlcj1faW5kO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQhPU15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkgLy9kb250IHVwZGF0ZSBteSBvd24gZGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQ9PU1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXT1NYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gYWxsIHBsYXllcnMgaGF2ZSBkb25lIHRoZWlyIGluaXRpYWwgc2V0dXAgYW5kIGZpcnN0IHR1cm4gc3RhcnRzXHJcbiAgICBAbWV0aG9kIFN0YXJ0VHVyblxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU3RhcnRUdXJuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDsgLy9yZXNldGluZyB0aGUgdHVybiBudW1iZXIgb24gc3RhcnQgb2YgdGhlIGdhbWVcclxuXHJcbiAgICAgICAgLy9zZW5kaW5nIGluaXRpYWwgdHVybiBudW1iZXIgb3ZlciB0aGUgbmV0d29yayB0byBzdGFydCB0dXJuIHNpbXVsdGFub3VzbHkgb24gYWxsIGNvbm5lY3RlZCBwbGF5ZXIncyBkZXZpY2VzXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLHRoaXMuVHVybk51bWJlcik7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBGdW5jdGlvbiBmb3IgZ2FtZXBsYXlcclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcGxheWVyIFVJIChuYW1lL2ljb25zL251bWJlciBvZiBwbGF5ZXJzIHRoYXQgdG8gYmUgYWN0aXZlIGV0YylcclxuICAgIEBtZXRob2QgQXNzaWduUGxheWVyR2FtZVVJXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBBc3NpZ25QbGF5ZXJHYW1lVUkoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5QbGF5ZXJJbmZvPXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZUdhbWVVSShfdG9nZ2xlSGlnaGxpZ2h0LF9pbmRleClcclxuICAgIHtcclxuICAgICAgICBpZihfdG9nZ2xlSGlnaGxpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtfaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5QbGF5ZXJJbmZvPXRoaXMuUGxheWVyR2FtZUluZm9bX2luZGV4XTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKF9pbmRleD09aW5kZXgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVCR0hpZ2hsaWdodGVyKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gZW5iYWxlIHJlc3BlY3RpdmUgcGxheWVycyBub2RlcyBpbnNpZGUgZ2FtYXBsYXlcclxuICAgIEBtZXRob2QgRW5hYmxlUGxheWVyTm9kZXNcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEVuYWJsZVBsYXllck5vZGVzKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSG9tZUJhc2VkQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudD09MSkgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb249dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICBcclxuICAgICAgICBsZXQgcmF0aW89dGFyZ2V0UG9zLnkvY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTI7XHJcbiAgICB9LFxyXG5cclxuICAgIGxhdGVVcGRhdGUgKCkge1xyXG4gICAgICAgIGlmKHRoaXMuaXNDYW1lcmFab29taW5nKSAgICBcclxuICAgICAgICAgICAgdGhpcy5TZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN5bmNEaWNlUm9sbChfcm9sbClcclxuICAgIHtcclxuICAgICAgICBJc1R3ZWVuaW5nPXRydWU7XHJcbiAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQ9PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj09MCAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzWzBdLkJ1c2luZXNzVHlwZT09MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9sbENvdW50ZXI9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj0xMztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj09MTIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyKzIxOyAgXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIrMTtcclxuXHJcbiAgICAgICAgICAgIFJvbGxDb3VudGVyPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlci0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIERpY2VSb2xsPV9yb2xsO1xyXG4gICAgICAgIERpY2VUZW1wPTA7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbihEaWNlUm9sbCk7XHJcbiAgICAgICAgbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgICAgICB2YXIgX3Bvcz10aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgICAgICAgdGhpcy5Ud2VlbkNhbWVyYShfcG9zLHRydWUsMC40KTsgICBcclxuICAgIH0sXHJcblxyXG4gICAgVGVtcENoZWNrU3BhY2UoX3JvbGxpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRlbXBjb3VudGVyPTA7XHJcbiAgICAgICAgdmFyIHRlbXBjb3VudGVyMj0wO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIHRlbXBjb3VudGVyMj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmVycm9yKHRlbXBjb3VudGVyMitcIiBcIitfcm9sbCk7XHJcbiAgICAgICAgLy8gaWYoKHRlbXBjb3VudGVyMitfcm9sbCk8MzMpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzWzBdLkJ1c2luZXNzVHlwZT09MSlcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgdGVtcGNvdW50ZXI9MCtfcm9sbC0xO1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5lcnJvcih0ZW1wY291bnRlcik7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgZWxzZVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICB0ZW1wY291bnRlcj0xMytfcm9sbC0xO1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5lcnJvcih0ZW1wY291bnRlcik7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5lcnJvcih0ZW1wY291bnRlcjIrXCIgXCIrX3JvbGwpO1xyXG4gICAgICAgIC8vICAgICB0ZW1wY291bnRlcj10ZW1wY291bnRlcjIrX3JvbGw7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgaWYodGVtcGNvdW50ZXIyLTE8MClcclxuICAgICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzdGFydGluZyBmcm9tIG9ibGl2aW9uXCIpO1xyXG4gICAgICAgIHRlbXBjb3VudGVyPXRlbXBjb3VudGVyMitfcm9sbGluZy0xO1xyXG4gICAgICAgIHZhciBkaWNldG9iZT1wYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIrZGljZXRvYmUpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBjb3VudGVyPXRlbXBjb3VudGVyMitfcm9sbGluZztcclxuICAgICAgICB2YXIgZGljZXRvYmU9cGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwidG8gYmU6IFwiK2RpY2V0b2JlKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgUm9sbERpY2U6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaWNlMT10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgIHZhciBEaWNlMj10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG5cclxuICAgICAgICAvLyB2YXIgRGljZTE9dGhpcy5nZXRSYW5kb20oOCwyNSk7XHJcbiAgICAgICAgLy8gdmFyIERpY2UyPXRoaXMuZ2V0UmFuZG9tKDgsMjUpO1xyXG5cclxuICAgICAgICBEaWNlUm9sbD1EaWNlMStEaWNlMjtcclxuICAgICAgICAvL3RoaXMuVGVtcENoZWNrU3BhY2UoRGljZVJvbGwpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGljZSBudW1iZXI6IFwiK0RpY2VSb2xsKTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgzLERpY2VSb2xsKTsgXHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxPbmVEaWNlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuICAgICAgICByZXR1cm4gRGljZTE7XHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxUd29EaWNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgdmFyIERpY2UyPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgcmV0dXJuIChEaWNlMStEaWNlMik7XHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGxVcG9uQ2FyZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9zcGFjZUlEPXBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgaWYoX3NwYWNlSUQhPTYgJiYgX3NwYWNlSUQhPTcpIC8vNiBtZW5hcyBwYXlkYXkgYW5kIDcgbWVhbnMgZG91YmxlIHBheWRheVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIFJhbmRvbUNhcmQ9dGhpcy5nZXRSYW5kb20oMCwxNSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2ZvciB0ZXN0aW5nIG9ubHlcclxuICAgICAgICAgICAgaWYoX3NwYWNlSUQ9PTIpIC8vbGFuZGVkIG9uIHNvbWUgYmlnIGJ1c2VpbnNzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNywxMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw0KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKF9zcGFjZUlEPT01KSAvL2xhbmRlZCBvbiBzb21lIGxvc3NlcyBjYXJkc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleD1bMCw1LDYsMl07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw0KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihfc3BhY2VJRD09MykgLy9sYW5kZWQgb24gc29tZSBtYXJrZXRpbmcgY2FyZHNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXg9WzAsNywzLDgsMTMsOV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw2KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYoX3NwYWNlSUQ9PTEpIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNiwxMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw0KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIFNlbmRpbmdEYXRhPXtcInJhbmRvbUNhcmRcIjpSYW5kb21DYXJkLFwiY291bnRlclwiOlJvbGxDb3VudGVyfTsgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFuZGVkIG9uIHBheSBkYXkgb3IgZG91YmxlIHBheSBkYXkgYW5kIHdvcmsgaXMgZG9uZSBzbyBjaGFuZ2luZyB0dXJuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENhbGxHYW1lQ29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD10aGlzLlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD09ZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfY2FzaD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaDtcclxuICAgICAgICAgICAgICAgIHZhciBITUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgQk1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FuQW1vdW50Kz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgQk1DYXNoPShCTUFtb3VudCtCTUxvY2F0aW9ucykqMTUwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBITUNhc2g9MDtcclxuICAgICAgICAgICAgICAgIGlmKEhNQW1vdW50PT0xKVxyXG4gICAgICAgICAgICAgICAgICAgIEhNQ2FzaD02MDAwMDtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoSE1BbW91bnQ9PTIpXHJcbiAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzYwMDAwO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MylcclxuICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArMjUwMDArNjAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIFRvdGFsQXNzZXRzPV9jYXNoK0JNQ2FzaCtITUNhc2gtbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxTY29yZT1Ub3RhbEFzc2V0cztcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKVxyXG4gICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg2LF9kYXRhKTtcclxuICAgfSxcclxuXHJcbiAgIFN5bmNHYW1lT3ZlcihfVUlEKVxyXG4gICB7XHJcbiAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgdmFyIE15RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgIGNvbnNvbGUubG9nKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3Zlcj10cnVlO1xyXG5cclxuICAgIGlmKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRD09X1VJRClcclxuICAgIHtcclxuICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIlRvdGFsIENhc2g6IFwiK015RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUrXCJcXG5cIisnXFxuJytcclxuICAgICAgICAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAxNTAwMFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICBcInVuZm9ydHVuYXRlbHkgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAxNTAwMFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXN0YXJ0R2FtZSgpO1xyXG4gICAgfSwgMTUwNjApO1xyXG5cclxuICAgfSxcclxuXHJcbiAgICBTdGFydERpY2VSb2xsOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZihSb2xsQ291bnRlcj49R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZW92ZXJcIik7XHJcbiAgICAgICAgICAgIGlzR2FtZU92ZXI9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcblxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT1mYWxzZSlcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZD0wO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihwbGF5ZXJjb21wbGV0ZWQ9PXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXg9MDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQ9MDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF92YWx1ZSA+IG1heClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWRJbmQ9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9X3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIrU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2dhbWUgY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1zXHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGljZVRlbXA9RGljZVRlbXArMTsgXHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgdGhpcy5Ud2VlblBsYXllcih0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFJhbmRvbTpmdW5jdGlvbihtaW4sbWF4KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSApICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gICAgfSxcclxuXHJcbiAgICBUd2VlbkNhbWVyYTogZnVuY3Rpb24gKF9wb3MsIGlzWm9vbSx0aW1lKSB7ICAgXHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5DYW1lcmFOb2RlKVxyXG4gICAgICAgIC50byh0aW1lLCB7IHBvc2l0aW9uOiBjYy52MihfcG9zLngsIF9wb3MueSl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmKGlzWm9vbSlcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFpvb21DYW1lcmFJbiAoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICBpZih0aGlzLkNhbWVyYS56b29tUmF0aW88MilcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz10aGlzLkNhbWVyYS56b29tUmF0aW8rMC4wMztcclxuICAgICAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIDEwKTtcclxuICAgIH0sXHJcblxyXG4gICAgWm9vbUNhbWVyYU91dCAoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ2FtZXJhLnpvb21SYXRpbz49MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz1mYWxzZTtcclxuICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPXRoaXMuQ2FtZXJhLnpvb21SYXRpby0wLjAzO1xyXG4gICAgICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbj1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKDApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZighaXNHYW1lT3ZlcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERvdWJsZVBheURheT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSAmJiAhTmV4dFR1cm5Eb3VibGVQYXkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBOZXh0VHVybkRvdWJsZVBheT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEb3VibGVQYXlEYXk9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKCAoUGFzc2VkUGF5RGF5ICYmIERvdWJsZVBheURheSkgfHwgKFBhc3NlZFBheURheSAmJiBOZXh0VHVybkRvdWJsZVBheSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBOZXh0VHVybkRvdWJsZVBheT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEb3VibGVQYXlEYXk9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgVHdlZW5QbGF5ZXI6IGZ1bmN0aW9uIChOb2RlLFRvUG9zKSB7XHJcbiAgICAgICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgICAudG8oMC40LCB7IHBvc2l0aW9uOiBjYy52MihUb1Bvcy54LCBUb1Bvcy55KX0se2Vhc2luZzpcInF1YWRJbk91dFwifSlcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYoRGljZVRlbXA8RGljZVJvbGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NilcclxuICAgICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXk9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NylcclxuICAgICAgICAgICAgICAgICAgICBEb3VibGVQYXlEYXk9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoUm9sbENvdW50ZXI9PTEyKVxyXG4gICAgICAgICAgICAgICAgUm9sbENvdW50ZXI9Um9sbENvdW50ZXIrMjE7ICBcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgUm9sbENvdW50ZXI9Um9sbENvdW50ZXIrMTtcclxuXHJcbiAgICAgICAgICAgIC8vRGljZVRlbXA9RGljZVRlbXArMTsgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKERpY2VUZW1wK1wiIFwiK1JvbGxDb3VudGVyKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9uZXdwb3M9Y2MuVmVjMigwLDApO1xyXG4gICAgICAgICAgICB0aGlzLlR3ZWVuQ2FtZXJhKF9uZXdwb3MsZmFsc2UsMC42KTsgLy96b29tb3V0XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL3J1bGVzIGltcGxtZW50YXRpb24gZHVyaW5nIHR1cm4gKHR1cm4gZGVjaXNpb25zKVxyXG5cclxuICAgIFRvZ2dsZVBheURheShfc3QxLF9TdDIpXHJcbiAgICB7XHJcbiAgICAgICAgUGFzc2VkUGF5RGF5PV9zdDE7XHJcbiAgICAgICAgRG91YmxlUGF5RGF5PV9TdDI7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihhbW91bnQsX2luZGV4LF9sb2NhdGlvbk5hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g+PWFtb3VudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoLWFtb3VudDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCsxO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5wdXNoKF9sb2NhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsMTAwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgICAgIH0sIDEyMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2ggdG8gZXhwYW5kIHRoaXMgYnVzaW5lc3MsIGNhc2ggbmVlZGVkICQgXCIrYW1vdW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKClcclxuICAgIHtcclxuICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXM9W107XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihwYXJzZUludCh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzVHlwZSk9PTIpIC8vdGhpcyBtZWFucyB0aGVyZSBpcyBicmljayBhbmQgbW9ydGFyIGluIGxpc3RcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc1ByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5TZXRCdXNpbmVzc0luZGV4KGkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlJlc2V0RWRpdEJveCgpO1xyXG4gICAgICAgICAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKEJ1c2luZXNzTG9jYXRpb25Ob2Rlcyk7XHJcbiAgICAgICAgcmV0dXJuIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7XHJcbiAgICB9LFxyXG5cclxuICAgIERlc3Ryb3lHZW5lcmF0ZWROb2RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXM9W107XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZVN0b2Nrc19UdXJuRGVjaXNpb24oX25hbWUsX1NoYXJlQW1vdW50LF9pc0FkZGluZylcclxuICAgIHtcclxuICAgICAgICBpZihfaXNBZGRpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3N0b2NrPW5ldyBTdG9ja0luZm8oKTtcclxuICAgICAgICAgICAgX3N0b2NrLkJ1c2luZXNzTmFtZT1fbmFtZTtcclxuICAgICAgICAgICAgX3N0b2NrLlNoYXJlQW1vdW50PV9TaGFyZUFtb3VudDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mU3RvY2tzLnB1c2goX3N0b2NrKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKF9pc0RvdWJsZVBheURheT1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihTa2lwTmV4dFBheWRheSkgLy9pZiBwcmV2aW91c2x5IHNraXAgcGF5ZGF5IHdhcyBzdG9yZWQgYnkgYW55IGNhcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNraXBOZXh0UGF5ZGF5PWZhbHNlO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgUGF5RGF5LlwiLDE2MDApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgICAgIH0sIDE2NTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3RpdGxlPVwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZihfaXNEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICBfdGl0bGU9XCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgX3RpdGxlPVwiUGF5RGF5XCI7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLF9pc0RvdWJsZVBheURheSxTa2lwSE1OZXh0UGF5ZGF5LFNraXBCTU5leHRQYXlkYXkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4vLyNlbmRyZWdpb25cclxuICAgXHJcbiAgICAvLyNyZWdpb24gQ2FyZHMgUnVsZXNcclxuICAgIFRvZ2dsZURvdWJsZVBheU5leHRUdXJuKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBOZXh0VHVybkRvdWJsZVBheT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNraXBOZXh0VHVybihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgU2tpcE5leHRUdXJuPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgU2tpcE5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgU2tpcEhNTmV4dFBheWRheT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIFNraXBCTU5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBMb3NlQWxsTWFya2V0aW5nTW9uZXkoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbG9zZUFtb3VudD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfbG9zZUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9sb3NlQW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2xvc2VBbW91bnRcclxuICAgIH0sXHJcblxyXG4gICAgTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcilcclxuICAgIHtcclxuICAgICAgICB2YXIgX2Ftb3VudEluY3JlYXNlZD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50SW5jcmVhc2VkPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQqPV9tdWx0aXBsaWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50SW5jcmVhc2VkPTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2Ftb3VudEluY3JlYXNlZFxyXG4gICAgfSxcclxuXHJcbiAgICBHZXRNYXJrZXRpbmdNb25leShfcHJvZml0KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfYW1vdW50PS0xO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9wcm9maXQ9KF9wcm9maXQvMTAwKTtcclxuICAgICAgICAgICAgX2Ftb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50Kj1fcHJvZml0O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoKz1fYW1vdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2Ftb3VudFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICAvLyNlbmRyZWdpb25cclxufSk7XHJcbi8vbW9kdWxlLmV4cG9ydHMgID0gUGxheWVyRGF0YTsgLy93aGVuIGltcG9ydHMgaW4gYW5vdGhlciBzY3JpcHQgb25seSByZWZlcmVuY2Ugb2YgcGxheWVyZGF0YSBjbGFzcyB3b3VsZCBiZSBhYmxlIHRvIGFjY2Vzc2VkIGZyb20gR2FtZW1hbmFnZXIgaW1wb3J0XHJcbm1vZHVsZS5leHBvcnRzICA9IEdhbWVNYW5hZ2VyO1xyXG4vLyNlbmRyZWdpb24iXX0=