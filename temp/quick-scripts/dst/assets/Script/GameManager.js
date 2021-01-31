
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

var _isTest = false;
var _diceinput1 = "";
var _diceinput2 = "";
var PreviousDiceRoll1 = -1;
var PreviousDiceRoll2 = -1;
var PreviousDiceRoll3 = -1;
var PreviousDiceRoll4 = -1;
var PreviousDiceRoll5 = -1;
var userGameOver = false;
var BotGameOver = false;
var TotalCounterReached = false;
var PassedPayDayCounter = 0;
var DoublePayDayCounter = 0;
var NoCardFunctionality = false;
var PlayerLeft = false;
var ForceChangeTimeOut = null;
var GameCompleted = false;
var CorrectAnswer = 0; //#region superclasses and enumerations
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
    PartnerName: {
      displayName: "PartnerName",
      type: cc.Text,
      "default": "",
      serializable: true,
      tooltip: "name of the partner with whom player has formed partnership"
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
}); //-------------------------------------------class for CardData-------------------------//

var CardDataFunctionality = cc.Class({
  name: "CardDataFunctionality",
  properties: {
    NextTurnDoublePay: {
      displayName: "NextTurnDoublePay",
      type: cc.Boolean,
      "default": false,
      serializable: true,
      tooltip: "keep track if its going to be double pay day on next payday for current player"
    },
    SkipNextTurn: {
      displayName: "SkipNextTurn",
      type: cc.Boolean,
      "default": false,
      serializable: true,
      tooltip: "keep track if turn is going to skipped on next turn for current player"
    },
    SkipNextPayday: {
      displayName: "SkipNextPayday",
      type: cc.Boolean,
      "default": false,
      serializable: true,
      tooltip: "keep track if payday is going to skipped on next payday for current player"
    },
    SkipHMNextPayday: {
      displayName: "SkipHMNextPayday",
      type: cc.Boolean,
      "default": false,
      serializable: true,
      tooltip: "keep track if payday for home based buisiness is going to skipped on next payday for current player"
    },
    SkipBMNextPayday: {
      displayName: "SkipBMNextPayday",
      type: cc.Boolean,
      "default": false,
      serializable: true,
      tooltip: "keep track if payday for bricka and mmortar buisiness is going to skipped on next payday for current player"
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
    CardFunctionality: {
      displayName: "CardFunctionality",
      type: CardDataFunctionality,
      "default": null,
      serializable: true,
      tooltip: "card functionality stored by player"
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
      type: cc.Boolean,
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
    BankruptAmount: {
      displayName: "BankruptAmount",
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "keep track how much time player has been bankrupted"
    },
    SkippedLoanPayment: {
      displayName: "SkippedLoanPayment",
      "default": false,
      type: cc.Boolean,
      serializable: true,
      tooltip: "Check if player has skipped loan payment"
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
    TotalHBCash: {
      displayName: "TotalHBCash",
      type: cc.Integer,
      "default": 0,
      serializable: true
    },
    TotalBMCash: {
      displayName: "TotalBMCash",
      type: cc.Integer,
      "default": 0,
      serializable: true
    },
    TotalGoldCash: {
      displayName: "TotalGoldCash",
      type: cc.Integer,
      "default": 0,
      serializable: true
    },
    TotalLoanBalance: {
      displayName: "TotalLoanBalance",
      type: cc.Integer,
      "default": 0,
      serializable: true
    },
    TotalStocksCash: {
      displayName: "TotalStocksCash",
      type: cc.Integer,
      "default": 0,
      serializable: true
    },
    GameOver: {
      displayName: "GameOver",
      type: cc.Boolean,
      "default": false,
      serializable: true
    },
    IsActive: {
      displayName: "IsActive",
      type: cc.Boolean,
      "default": true,
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

var _nextTurnDoublePay = false;
var _skipNextTurn = false;
var _skipNextPayday = false; //skip whole pay day

var _skipHMNextPayday = false; //skip pay day for home based businessess only

var _skipBMNextPayday = false; //skip pay day for brick & mortar businessess only

var CardEventReceived = false;
var TurnInProgress = false;
var Backspaces = 3;
var isGameOver = false;
var OneQuestionIndex = -1;
var OneQuestions = ["you have skipped loan previous payday?", "you have taken any loan?", "you have bankrupted ever?", "your next turn is going to be skipped?", "your next payday is going to be double payday?"];
var CardDisplaySetTimout = null;
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
    BotGameInfo: {
      "default": [],
      type: [PlayerData],
      serializable: true,
      tooltip: "all bot's data"
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
    },
    SelectedMode: {
      "default": 0,
      type: cc.Integer,
      serializable: true,
      tooltip: "integer reference for game mode 1 means bot and 2 means real players"
    }
  },
  statics: {
    PlayerData: PlayerData,
    BusinessInfo: BusinessInfo,
    CardDataFunctionality: CardDataFunctionality,
    EnumBusinessType: EnumBusinessType,
    Instance: null
  },
  SetPlayerLeft: function SetPlayerLeft(_state) {
    PlayerLeft = _state;
  },
  ResetAllVariables: function ResetAllVariables() {
    _diceinput1 = "";
    _diceinput2 = "";
    PreviousDiceRoll1 = -1;
    PreviousDiceRoll2 = -1;
    PlayerLeft = false;
    PreviousDiceRoll3 = -1;
    PreviousDiceRoll4 = -1;
    PreviousDiceRoll5 = -1;
    GameCompleted = false;
    userGameOver = false;
    BotGameOver = false;
    CorrectAnswer = 0;
    RollCounter = 0;
    DiceTemp = 0;
    DiceRoll = 0;
    IsTweening = false;
    GamePlayReferenceManager = null;
    TurnCheckArray = [];
    BusinessLocationNodes = [];
    ForceChangeTimeOut = null;
    PassedPayDay = false;
    DoublePayDay = false;
    PassedPayDayCounter = 0;
    DoublePayDayCounter = 0; //cards functionality

    _nextTurnDoublePay = false;
    _skipNextTurn = false;
    _skipNextPayday = false; //skip whole pay day

    _skipHMNextPayday = false; //skip pay day for home based businessess only

    _skipBMNextPayday = false; //skip pay day for brick & mortar businessess only

    CardEventReceived = false;
    TurnInProgress = false;
    Backspaces = 3;
    isGameOver = false;
    OneQuestionIndex = -1;
    OneQuestions = ["you have skipped loan previous payday?", "you have taken any loan?", "you have bankrupted ever?", "your next turn is going to be skipped?", "your next payday is going to be double payday?"];
    CardDisplaySetTimout = null;
    TotalCounterReached = false;
    NoCardFunctionality = false;
  },
  InputTestDice1: function InputTestDice1(_val) {
    if (_isTest) {
      _diceinput1 = _val;
    }
  },
  InputTestDice2: function InputTestDice2(_val) {
    if (_isTest) {
      _diceinput2 = _val;
    }
  },
  //#region All Functions of GameManager

  /**
    @summary called when instance of class is created
   **/
  onLoad: function onLoad() {
    this.ResetAllVariables();
    GameManager.Instance = this;
    this.TurnNumber = 0;
    this.TurnCompleted = false;
    TurnCheckArray = [];
    this.CheckReferences();
    this.SelectedMode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();
    this.Init_GameManager();
    this.RandomCardIndex = 0;
    this.CardCounter = 0;
    this.CardDisplayed = false;
    CardEventReceived = false;
  },

  /**
    @summary called to assign reference of required classes
   **/
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
  },

  /**
    @summary initial gamemanager essetials
   **/
  Init_GameManager: function Init_GameManager() {
    this.Camera = this.CameraNode.getComponent(cc.Camera);
    this.isCameraZooming = false;
    this.PlayerGameInfo = [];
    RollCounter = 0;
    DiceTemp = 0;
    DiceRoll = 0;

    if (this.SelectedMode == 2) {
      //game is being played by real players
      //if joined player is spectate
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == true) {
        //console.log("status of initial business setp: "+GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("InitialSetup"));
        //if inital setup has been done and game is under way
        if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("InitialSetup") == true) {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleLeaveRoomButton_SpectateModeUI(true);
          var AllData = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("PlayerGameInfo");
          this.PlayerGameInfo = AllData;
          GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = this.PlayerGameInfo.length;
          this.SyncAllData_SpectateManager();
          this.TurnNumber = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("TurnNumber");
          this.UpdateGameUI(true, this.TurnNumber); //console.log(this.PlayerGameInfo);
          //this.SyncDataToPlayerGameInfo(0);
        } else {
          GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = 8; //this.EnablePlayerNodes();

          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleLeaveRoomButton_SpectateModeUI(true);
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().InitialScreen_SpectateMode();
        }
      } else {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(true, false, this.SelectedMode);
      }
    } else if (this.SelectedMode == 1) {
      //game is being played by bot along with one player
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(true, false, this.SelectedMode);
    }
  },
  //#region public functions to get data (accessible from other classes)
  GetTurnNumber: function GetTurnNumber() {
    return this.TurnNumber;
  },

  /**
    @summary get my index in array of PlayerGameInfo 
   **/
  GetMyIndex: function GetMyIndex() {
    var myIndex = 0;
    var _actor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    var _allActors = this.PlayerGameInfo;

    for (var index = 0; index < _allActors.length; index++) {
      if (_actor.PlayerUID == _allActors[index].PlayerUID) {
        myIndex = index;
        break;
      }
    }

    return myIndex;
  },
  //#endregion
  //#region SpectateMode Code
  SyncAllData_SpectateManager: function SyncAllData_SpectateManager() {
    var AllData = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("PlayerGameInfo");
    this.PlayerGameInfo = AllData;
    this.SyncDataToPlayerGameInfo(0);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = this.PlayerGameInfo.length;
    this.AssignPlayerGameUI();
    this.EnablePlayerNodes();
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().CloseInitialScreen_SpectateMode();
    console.log("syncing all data for spectate");

    for (var index = 0; index < this.PlayerGameInfo.length; index++) {
      if (this.PlayerGameInfo[index].PlayerRollCounter > 0 && this.PlayerGameInfo[index].InitialCounterAssigned == true && !this.PlayerGameInfo[index].isGameFinished) {
        var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.y);

        this.AllPlayerNodes[index].setPosition(_toPos.x, _toPos.y);
        console.log("setting pos1");
      } else {
        console.log("player counter: " + this.PlayerGameInfo[index].PlayerRollCounter);
        console.log("Initial Counter Assigned: " + this.PlayerGameInfo[index].InitialCounterAssigned);
        console.log("game finished : " + this.PlayerGameInfo[index].isGameFinished);
      }

      if (this.PlayerGameInfo[index].isGameFinished) {
        var _lastIndex = GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length - 1;

        var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[_lastIndex].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[_lastIndex].ReferenceLocation.position.y);

        this.AllPlayerNodes[index].setPosition(_toPos.x, _toPos.y);
        console.log("setting pos2");
      }
    } //console.log("synced playernodes");


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
  //#region functions related to Turn Mechanism and card mechanism

  /**
    @summary raised event on all connected clients to let others know a what card has been selected by player
   **/
  RaiseEventForCard: function RaiseEventForCard(_data) {
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(5, _data);
  },
  ClearDisplayTimeout: function ClearDisplayTimeout() {
    clearTimeout(CardDisplaySetTimout);
  },
  DisplayCardOnOthers: function DisplayCardOnOthers() {
    var _this = this;

    if (this.SelectedMode == 2) {
      //for real players
      console.log("card event received: " + CardEventReceived);

      if (CardEventReceived == true) {
        clearTimeout(CardDisplaySetTimout); //console.error(this.CardCounter);

        CardEventReceived = false;

        if (!this.CardDisplayed) {
          this.CardDisplayed = true;
          GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.CardCounter].ReferenceLocation.getComponent("SpaceHandler").OnLandedOnSpace(false, this.RandomCardIndex);
        }
      } else {
        CardDisplaySetTimout = setTimeout(function () {
          //check after every 0.5 seconds
          _this.DisplayCardOnOthers();
        }, 1000);
      }
    }
  },
  ResetCardDisplay: function ResetCardDisplay() {
    this.CardDisplayed = false;
  },
  ReceiveEventForCard: function ReceiveEventForCard(_data) {
    this.CheckReferences();
    console.log("Card Data Received:");
    console.log(_data);
    var RandomCard = _data.randomCard;
    var counter = _data.counter;
    this.RandomCardIndex = RandomCard;
    this.CardCounter = counter;

    if (this.SelectedMode == 2) {
      if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent("SpaceHandler").OnLandedOnSpace(true, RandomCard);else CardEventReceived = true;
    } else if (this.SelectedMode == 1) {
      if (this.PlayerGameInfo[this.TurnNumber].IsBot == false) GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent("SpaceHandler").OnLandedOnSpace(true, RandomCard);else GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent("SpaceHandler").OnLandedOnSpace(false, RandomCard, true);
    } // console.error(CardEventReceived);

  },

  /**
    @summary raised event on all connected clients to let others know a particular player has complete their move
   **/
  RaiseEventTurnComplete: function RaiseEventTurnComplete() {
    if (this.SelectedMode == 2) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(4, GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID);
      }
    } else if (this.SelectedMode == 1) {
      console.log("raised for turn complete");
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(4, this.PlayerGameInfo[this.TurnNumber].PlayerUID);
    }
  },
  SyncAllData: function SyncAllData() {
    if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[this.TurnNumber]);
      GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("PlayerGameInfo", this.PlayerGameInfo, true);
    }
  },

  /**
    @summary called on all players to validate if move is completed on all connected clients
   **/
  ReceiveEventTurnComplete: function ReceiveEventTurnComplete(_uid) {
    if (this.SelectedMode == 2) {
      //real players
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
        if (TurnCheckArray.length == 0) TurnCheckArray.push(_uid);
        var ArrayLength = TurnCheckArray.length;
        var IDFound = false;

        for (var index = 0; index < ArrayLength; index++) {
          if (TurnCheckArray[index] == _uid) IDFound = true;
        }

        if (!IDFound) {
          TurnCheckArray.push(_uid);
        }

        var TotalConnectedPlayers = 0;

        for (var j = 0; j < this.PlayerGameInfo.length; j++) {
          if (this.PlayerGameInfo[j].IsActive) TotalConnectedPlayers++;
        }

        console.log("Turn Check: " + TurnCheckArray.length);
        console.log("Total Connected Players: " + TotalConnectedPlayers);

        if (TurnCheckArray.length >= TotalConnectedPlayers) {
          TurnCheckArray = [];
          this.TurnCompleted = true;

          if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
            this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = RollCounter; //this.SyncAllData();

            this.ChangeTurn();
            console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor());
            console.log("Change Turn is called by: " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
          }
        }
      }
    } else if (this.SelectedMode == 1) {
      this.TurnCompleted = true;
      this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = RollCounter;
      this.ChangeTurn();
    }
  },

  /**
    @summary called when dice animation is played on all players
   **/
  ChangeTurn: function ChangeTurn() {
    if (this.SelectedMode == 2) {
      this.SyncAllData();
    }

    if (this.TurnNumber < this.PlayerGameInfo.length - 1) this.TurnNumber = this.TurnNumber + 1;else this.TurnNumber = 0;
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(2, this.TurnNumber);
  },
  ResetSomeValues: function ResetSomeValues() {
    TurnCheckArray = [];
    this.TurnCompleted = true;
  },
  ChangeTurnForcefully: function ChangeTurnForcefully() {
    var _this2 = this;

    if (IsTweening) {
      clearTimeout(ForceChangeTimeOut);
      ForceChangeTimeOut = setTimeout(function () {
        _this2.ChangeTurnForcefully();
      }, 1000);
    } else {
      clearTimeout(ForceChangeTimeOut);
      this.ChangeTurn();
    }
  },
  UpdateVisualData: function UpdateVisualData() {
    for (var index = 0; index < this.AllPlayerUI.length; index++) {
      this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
    }
  },

  /**
    @summary called from raise on event (from function "StartTurn" and "ChangeTurn" of this same class) to handle turn
   **/
  TurnHandler: function TurnHandler(_turn) {
    var _this3 = this;

    if (this.SelectedMode == 2) {
      var _isMaster = GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckCurrentActiveMasterClient();

      if (!this.PlayerGameInfo[_turn].IsActive) {
        if (_isMaster) {
          this.ChangeTurn();
          return;
        } else {
          return;
        }
      }
    } //this.ClearDisplayTimeout();


    this.UpdateVisualData();
    console.log("Turn: " + _turn);
    var _playerMatched = false;
    _skipNextTurn = false;

    if (IsTweening) {
      //check if animation of turn being played on other players
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == true) {
        IsTweening = false;
      }

      setTimeout(function () {
        if (!isGameOver) {
          _this3.TurnHandler(_turn);
        }
      }, 800);
    } else {
      this.TurnNumber = _turn;

      if (this.SelectedMode == 2) {
        if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          _playerMatched = true;
          _skipNextTurn = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn;

          if (!this.PlayerGameInfo[this.TurnNumber].isGameFinished) {
            this.ToggleTurnProgress(true);

            if (!_skipNextTurn) {
              setTimeout(function () {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ResetTurnVariable();
                IsTweening = false;
              }, 1000);
              console.log("its your turn " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
            }
          }
        } else {
          this.ToggleTurnProgress(false);
        }
      } else if (this.SelectedMode == 1) {
        // console.log(this.PlayerGameInfo[this.TurnNumber].IsBot);
        // console.log(this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn);
        // console.log(userGameOver);
        if (this.PlayerGameInfo[this.TurnNumber].IsBot == false) {
          _playerMatched = true;
          _skipNextTurn = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn;

          if (!userGameOver) {
            this.ToggleTurnProgress(true);

            if (!_skipNextTurn) {
              setTimeout(function () {
                IsTweening = false;
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ResetTurnVariable();
              }, 1000);
              console.log("its your turn " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
            }
          }
        } //turn decisions for bot
        else {
            _playerMatched = true;
            _skipNextTurn = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn;

            if (!BotGameOver) {
              this.ToggleTurnProgress(false);

              if (!_skipNextTurn) {
                setTimeout(function () {
                  IsTweening = false;

                  _this3.RollDice();
                }, 1000);
              }
            }
          }
      }

      this.UpdateGameUI(true, this.TurnNumber);

      for (var index = 0; index < this.AllPlayerUI.length; index++) {
        this.AllPlayerUI[index].getComponent("PlayerProfileManager").DiceRollScreen.active = false;
        this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
      }

      if (this.SelectedMode == 2) {
        //for real players
        GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("TurnNumber", this.TurnNumber, true);
        console.log("Turn Of: " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
        console.log(this.AllPlayerUI[this.TurnNumber].getComponent("PlayerProfileManager").PlayerInfo);
        console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor());
        console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray());
        this.SyncDataToPlayerGameInfo(0); //force sync spectator after completion of each turn

        if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == true) this.SyncAllData_SpectateManager();
      } //skip this turn as skip turn has been called before


      if (_playerMatched && _skipNextTurn) {
        IsTweening = false;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Skipping current turn", 1200);
        this.ToggleSkipNextTurn(false);
        this.ChangeTurn();
        this.ToggleTurnProgress(false);
        return;
      }

      if (_playerMatched && this.PlayerGameInfo[this.TurnNumber].isGameFinished) {
        setTimeout(function () {
          IsTweening = false;

          _this3.ChangeTurn();

          _this3.ToggleTurnProgress(false);

          return;
        }, 500);
      }
    }
  },
  SyncDataToPlayerGameInfo: function SyncDataToPlayerGameInfo(_ind) {
    var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();
    var MyData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
    var _counter = _ind; // console.log(this.PlayerGameInfo[_counter].PlayerUID);
    //  console.log(MyData.customProperties.PlayerSessionData.PlayerUID);

    for (var index = 0; index < MainSessionData.length; index++) {
      if (this.PlayerGameInfo[_counter].IsActive == false) {
        if (_counter < this.PlayerGameInfo.length - 1) {
          _counter++;
          this.SyncDataToPlayerGameInfo(_counter);
        } else {
          console.log("synced Data:");
          console.log(this.PlayerGameInfo);
        }
      } else {
        if (this.PlayerGameInfo[_counter].PlayerUID == MainSessionData[index].customProperties.PlayerSessionData.PlayerUID) {
          this.PlayerGameInfo[_counter] = MainSessionData[index].customProperties.PlayerSessionData;

          if (_counter < this.PlayerGameInfo.length - 1) {
            _counter++; //console.log("adding counter: "+_counter);

            this.SyncDataToPlayerGameInfo(_counter);
          } else {
            console.log("synced Data:");
            console.log(this.PlayerGameInfo);
          }
        }
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
    console.log(this.PlayerGameInfo);
    this.AssignPlayerGameUI();
    this.EnablePlayerNodes();
    this.TurnNumber = 0; //reseting the turn number on start of the game
    //sending initial turn number over the network to start turn simultanously on all connected player's devices

    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(2, this.TurnNumber);
  },
  ReceiveBankruptData: function ReceiveBankruptData(_data) {
    //other player has been bankrupted
    var _isBankrupted = _data.Data.bankrupted;
    var _turn = _data.Data.turn;
    var _playerData = _data.Data.PlayerDataMain;
    console.log(_data); // console.log(_isBankrupted);
    // console.log(_turn);
    // console.log(_playerData);

    this.PlayerGameInfo[_turn] = _playerData;
    this.AssignPlayerGameUI(true);
    this.EnablePlayerNodes(true);
    this.UpdateGameUI(true, this.TurnNumber);

    for (var index = 0; index < this.AllPlayerUI.length; index++) {
      this.AllPlayerUI[index].getComponent("PlayerProfileManager").DiceRollScreen.active = false;
      this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
    }

    if (this.SelectedMode == 2) {
      //for real players
      GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("TurnNumber", this.TurnNumber, true);
      this.SyncDataToPlayerGameInfo(0); //force sync spectator after completion of each turn

      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == true) this.SyncAllData_SpectateManager();
    }
  },
  StartTurnAfterBankrupt: function StartTurnAfterBankrupt() {
    this.AssignPlayerGameUI(true);
    this.EnablePlayerNodes(true);
    setTimeout(function () {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ResetTurnVariable();
    }, 1000);
    this.UpdateGameUI(true, this.TurnNumber);

    for (var index = 0; index < this.AllPlayerUI.length; index++) {
      this.AllPlayerUI[index].getComponent("PlayerProfileManager").DiceRollScreen.active = false;
      this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
    }

    if (this.SelectedMode == 2) {
      //for real players
      GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("TurnNumber", this.TurnNumber, true);
      this.SyncDataToPlayerGameInfo(0); //force sync spectator after completion of each turn

      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == true) this.SyncAllData_SpectateManager();
    }
  },
  //#endregion
  //#region Function for gameplay

  /**
    @summary called to assign player UI (name/icons/number of players that to be active etc)
    @method AssignPlayerGameUI
    @param {string} none
    @returns {boolean} no return
   **/
  AssignPlayerGameUI: function AssignPlayerGameUI(_isBankrupted) {
    if (_isBankrupted === void 0) {
      _isBankrupted = false;
    }

    if (this.SelectedMode == 1) {
      //for bot
      if (!_isBankrupted) {
        var _randomIndex = this.getRandom(0, this.BotGameInfo.length);

        this.PlayerGameInfo.push(this.BotGameInfo[_randomIndex]);
        GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = 2;
      }
    }

    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
      this.AllPlayerUI[index].active = true;
      this.AllPlayerUI[index].getComponent("PlayerProfileManager").PlayerInfo = this.PlayerGameInfo[index];
      this.AllPlayerUI[index].getComponent("PlayerProfileManager").SetName(this.PlayerGameInfo[index].PlayerName);
      this.AllPlayerUI[index].getComponent("PlayerProfileManager").SetAvatar(this.PlayerGameInfo[index].AvatarID);
      this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
    }
  },
  UpdateGameUI: function UpdateGameUI(_toggleHighlight, _index) {
    if (_toggleHighlight) {
      this.AllPlayerUI[_index].getComponent("PlayerProfileManager").PlayerInfo = this.PlayerGameInfo[_index];

      for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
        if (_index == index) {
          this.AllPlayerUI[index].getComponent("PlayerProfileManager").ToggleBGHighlighter(true);
          this.AllPlayerUI[index].getComponent("PlayerProfileManager").ToggleTextighlighter(true);
          this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
        } else {
          this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
          this.AllPlayerUI[index].getComponent("PlayerProfileManager").ToggleBGHighlighter(false);
          this.AllPlayerUI[index].getComponent("PlayerProfileManager").ToggleTextighlighter(false);
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
  EnablePlayerNodes: function EnablePlayerNodes(_isBankrupted) {
    if (_isBankrupted === void 0) {
      _isBankrupted = false;
    }

    if (!_isBankrupted) {
      for (var index = 0; index < this.PlayerGameInfo.length; index++) {
        if (this.PlayerGameInfo[index].HomeBasedAmount == 1 && !this.PlayerGameInfo[index].InitialCounterAssigned) this.AllPlayerNodes[index].setPosition(this.StartLocationNodes[0].position.x, this.StartLocationNodes[0].position.y);else if (this.PlayerGameInfo[index].BrickAndMortarAmount == 1 && !this.PlayerGameInfo[index].InitialCounterAssigned) this.AllPlayerNodes[index].setPosition(this.StartLocationNodes[1].position.x, this.StartLocationNodes[1].position.y);
      }
    } else {
      if (this.PlayerGameInfo[this.TurnNumber].HomeBasedAmount == 1) this.AllPlayerNodes[this.TurnNumber].setPosition(this.StartLocationNodes[0].position.x, this.StartLocationNodes[0].position.y);else if (this.PlayerGameInfo[this.TurnNumber].BrickAndMortarAmount == 1) this.AllPlayerNodes[this.TurnNumber].setPosition(this.StartLocationNodes[1].position.x, this.StartLocationNodes[1].position.y);
    }

    for (var _index3 = 0; _index3 < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; _index3++) {
      this.AllPlayerNodes[_index3].active = true;
    }

    for (var _index4 = 0; _index4 < this.PlayerGameInfo.length; _index4++) {
      this.AllPlayerNodes[_index4].children[0].getComponent(cc.Sprite).spriteFrame = GamePlayReferenceManager.Instance.Get_GameplayUIManager().AvatarSprites[this.PlayerGameInfo[_index4].AvatarID];
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
    var _dice1 = _roll.dice1;
    var _dice2 = _roll.dice2;

    var _result = _dice1 + _dice2;

    IsTweening = true;
    this.CardDisplayed = false;

    if (this.SelectedMode == 2) {
      //for real players
      for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray().length; index++) {
        if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.Data.userID == this.PlayerGameInfo[this.TurnNumber].PlayerUID) {
          console.log("player matched:" + this.PlayerGameInfo[this.TurnNumber].PlayerName);
          this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.PlayerSessionData.PlayerRollCounter;
        }
      }
    }

    if (this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter == 0 && !this.PlayerGameInfo[this.TurnNumber].InitialCounterAssigned) {
      if (this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[0].BusinessType == 2) {
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

    DiceRoll = _result;
    DiceTemp = 0;
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().PrintDiceValue_TurnDecision(DiceRoll);

    for (var _index5 = 0; _index5 < this.AllPlayerUI.length; _index5++) {
      if (this.TurnNumber == _index5) {
        this.AllPlayerUI[_index5].getComponent("PlayerProfileManager").DiceRollScreen.active = true;

        this.AllPlayerUI[_index5].getComponent("PlayerProfileManager").DiceRollScreen.getComponent("DiceController").AnimateDice(_dice1, _dice2);

        this.AllPlayerUI[_index5].getComponent("PlayerProfileManager").RefreshDataAutomatically();
      } else {
        this.AllPlayerUI[_index5].getComponent("PlayerProfileManager").DiceRollScreen.active = false;

        this.AllPlayerUI[_index5].getComponent("PlayerProfileManager").RefreshDataAutomatically();
      }
    } // let targetPos=this.AllPlayerNodes[this.TurnNumber].convertToWorldSpaceAR(cc.Vec2(0,120));
    // var _pos=this.CameraNode.parent.convertToNodeSpaceAR(targetPos);
    // this.TweenCamera(_pos,true,0.4);

  },
  DiceFuntionality: function DiceFuntionality() {
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
    }

    if (tempcounter2 - 1 < 0) {
      console.error("starting from oblivion");
      tempcounter = tempcounter2 + _rolling - 1;
      var dicetobe = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[tempcounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType);
      console.error("to be: " + dicetobe);
    } else {
      tempcounter = tempcounter2 + _rolling;
      var dicetobe = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[tempcounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType);
      console.error("to be: " + dicetobe);
    }
  },
  RollDice: function RollDice() {
    if (!isGameOver) {
      var Dice1;
      var Dice2;

      if (_isTest && this.PlayerGameInfo[this.TurnNumber].IsBot == false) {
        Dice1 = parseInt(_diceinput1);
        Dice2 = parseInt(_diceinput2);
      } else if (this.PlayerGameInfo[this.TurnNumber].IsBot == true && _isTest) {
        Dice1 = 50;
        Dice2 = 3;
      } else {
        Dice1 = this.getRandom(1, 7);
        Dice2 = this.getRandom(1, 7);
        if (PreviousDiceRoll1 == Dice1) Dice1 = this.getRandom(1, 7);
        if (PreviousDiceRoll2 == Dice2) Dice2 = this.getRandom(1, 7);
        PreviousDiceRoll1 = Dice1;
        PreviousDiceRoll2 = Dice2;
      } // var Dice1=20;
      // var Dice2=1;


      DiceRoll = Dice1 + Dice2;
      var _newRoll = {
        dice1: Dice1,
        dice2: Dice2
      }; //DiceRoll=23;
      //this.TempCheckSpace(DiceRoll);

      console.log("dice number: " + DiceRoll + ", Dice1:" + Dice1 + ", Dice2:" + Dice2);
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(3, _newRoll);
    }
  },
  RollOneDice: function RollOneDice() {
    var Dice1 = this.getRandom(1, 7);
    if (PreviousDiceRoll5 == Dice1) Dice1 = this.getRandom(1, 7);
    PreviousDiceRoll5 = Dice1;
    return Dice1;
  },
  RollTwoDices: function RollTwoDices() {
    var Dice1 = this.getRandom(1, 7);
    var Dice2 = this.getRandom(1, 7);
    if (PreviousDiceRoll3 == Dice1) Dice1 = this.getRandom(1, 7);
    if (PreviousDiceRoll4 == Dice2) Dice2 = this.getRandom(1, 7);
    PreviousDiceRoll3 = Dice1;
    PreviousDiceRoll4 = Dice2;
    return Dice1 + Dice2;
  },
  callUponCard: function callUponCard() {
    if (!isGameOver) {
      if (RollCounter < GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
        var _spaceID = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType);

        this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = RollCounter;

        if (_spaceID != 6 && _spaceID != 7) {
          //6 means payday and 7 means double payday, 9 menas sell space
          var RandomCard = this.getRandom(0, 15); //for testing only

          if (_spaceID == 2) {
            //landed on some big business
            var valueIndex = [0, 1, 7, 10, 2, 3, 4, 5, 6, 8];
            var index = this.getRandom(0, 10);
            RandomCard = valueIndex[index]; //RandomCard = 1;
          } else if (_spaceID == 5) {
            //landed on some losses cards
            var valueIndex = [0, 1, 5, 6, 2, 7, 3, 4, 8, 9];
            var index = this.getRandom(0, 10);
            RandomCard = valueIndex[index]; // RandomCard = 0;
          } else if (_spaceID == 3) {
            //landed on some marketing cards
            var valueIndex = [0, 7, 3, 8, 13, 9, 1, 2, 4, 5];
            var index = this.getRandom(0, 10);
            RandomCard = valueIndex[index]; //RandomCard = 5;
          } else if (_spaceID == 1) {
            //landed on some wild cards
            var valueIndex = [0, 1, 6, 10, 2, 3, 4];
            var index = this.getRandom(0, 7);
            RandomCard = valueIndex[index]; //RandomCard = 0;
          }

          IsTweening = false;
          console.error(_spaceID);

          if (this.SelectedMode == 2) {
            //for real player
            if (_spaceID == 12) {
              // if player landed on finish space
              RollCounter = RollCounter + 5;
              this.StartDiceRoll();
            } else {
              if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
                var SendingData = {
                  randomCard: RandomCard,
                  counter: RollCounter
                };
                this.RaiseEventForCard(SendingData);
              } else {
                this.DisplayCardOnOthers();
              }
            }
          } else if (this.SelectedMode == 1) {
            //for bot
            if (_spaceID == 12) {
              // if player landed on finish space
              RollCounter = RollCounter + 5;
              this.StartDiceRoll();
            } else {
              var SendingData = {
                randomCard: RandomCard,
                counter: RollCounter
              };
              this.RaiseEventForCard(SendingData);
            }
          }
        } else {
          IsTweening = false;
          console.log("landed on pay day or double pay day and work is done so changing turn");
          this.RaiseEventTurnComplete();
        }
      } else {
        if (this.SelectedMode == 1) {
          if (!isGameOver) {
            if (this.PlayerGameInfo[this.TurnNumber].isBot && BotGameOver) this.completeCardTurn();
            if (!this.PlayerGameInfo[this.TurnNumber].isBot && userGameOver) this.completeCardTurn();
          }
        } else if (this.SelectedMode == 2) {
          if (!isGameOver) {
            if (this.PlayerGameInfo[this.TurnNumber].isGameFinished) {
              this.completeCardTurn();
              console.error("complete turn is called");
            }
          }
        }
      }
    } else {
      if (this.SelectedMode == 1) {
        this.AllPlayersGameCompleted(true);
      } else if (this.SelectedMode == 2) {
        this.AllPlayersGameCompleted(false);
      }
    }
  },
  completeCardTurn: function completeCardTurn() {
    IsTweening = false;
    console.log("landed on pay day or double pay day and work is done so changing turn");
    this.RaiseEventTurnComplete();
  },
  CallGameComplete: function CallGameComplete(_isBot, _forceGameOver) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    if (_forceGameOver === void 0) {
      _forceGameOver = false;
    }

    if (_isBot == false) {
      // if (_forceGameOver) {
      //     this.TurnNumber = this.GetMyIndex();
      // }
      var _playerIndex = this.GetMyIndex();

      if (!this.PlayerGameInfo[_playerIndex].IsActive) {
        this.PlayerGameInfo[_playerIndex].isGameFinished = true;
        this.PlayerGameInfo[_playerIndex].TotalScore = 0;
        console.error("player is not active returning");
      } else {
        if (this.PlayerGameInfo[_playerIndex].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          console.error("calculating....");
          console.log("agme is not finished");
          this.PlayerGameInfo[_playerIndex].isGameFinished = true;
          var _cash = this.PlayerGameInfo[_playerIndex].Cash;

          var HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;

          var BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;

          var BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

          var loanAmount = 0;

          for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
            if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
              loanAmount += GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanAmount;
            }
          }

          var _gold = this.PlayerGameInfo[_playerIndex].GoldCount;
          var _stocks = this.PlayerGameInfo[_playerIndex].StockCount;

          var _diceRandom = this.RollTwoDices();

          var OnceOrShare = _diceRandom * 1000;
          var GoldCash = OnceOrShare * _gold;
          var StockCash = OnceOrShare * _stocks;
          var BMCash = (BMAmount + BMLocations) * 150000;
          var HMCash = 0;
          if (HMAmount == 1) HMCash = 60000;else if (HMAmount == 2) HMCash = 25000 + 60000;else if (HMAmount == 3) HMCash = 25000 + 25000 + 60000;
          var TotalAssets = _cash + BMCash + HMCash + GoldCash + StockCash - loanAmount;
          this.PlayerGameInfo[_playerIndex].TotalScore = TotalAssets;
          this.PlayerGameInfo[_playerIndex].TotalHBCash = HMCash;
          this.PlayerGameInfo[_playerIndex].TotalBMCash = BMCash;
          this.PlayerGameInfo[_playerIndex].TotalGoldCash = GoldCash;
          this.PlayerGameInfo[_playerIndex].TotalStocksCash = StockCash;
          this.PlayerGameInfo[_playerIndex].TotalLoanBalance = loanAmount;
          GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[_playerIndex]);
          console.log("Data pushed");
        } //console.log(this.PlayerGameInfo[this.TurnNumber])

      }
    } else {
      for (var _playerIndex2 = 0; _playerIndex2 < this.PlayerGameInfo.length; _playerIndex2++) {
        this.PlayerGameInfo[_playerIndex2].isGameFinished = true;
        var _cash = this.PlayerGameInfo[_playerIndex2].Cash;
        var HMAmount = this.PlayerGameInfo[_playerIndex2].HomeBasedAmount;
        var BMAmount = this.PlayerGameInfo[_playerIndex2].BrickAndMortarAmount;
        var BMLocations = this.PlayerGameInfo[_playerIndex2].TotalLocationsAmount;
        var loanAmount = 0;

        for (var _index6 = 0; _index6 < this.PlayerGameInfo[_playerIndex2].NoOfBusiness.length; _index6++) {
          if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex2].NoOfBusiness[_index6].LoanTaken) {
            loanAmount += GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex2].NoOfBusiness[_index6].LoanAmount;
          }
        }

        var _gold = this.PlayerGameInfo[_playerIndex2].GoldCount;
        var _stocks = this.PlayerGameInfo[_playerIndex2].StockCount;

        var _diceRandom = this.RollTwoDices();

        var OnceOrShare = _diceRandom * 1000;
        var GoldCash = OnceOrShare * _gold;
        var StockCash = OnceOrShare * _stocks;
        var BMCash = (BMAmount + BMLocations) * 150000;
        var HMCash = 0;
        if (HMAmount == 1) HMCash = 60000;else if (HMAmount == 2) HMCash = 25000 + 60000;else if (HMAmount == 3) HMCash = 25000 + 25000 + 60000;
        var TotalAssets = _cash + BMCash + HMCash + GoldCash + StockCash - loanAmount;
        this.PlayerGameInfo[_playerIndex2].TotalScore = TotalAssets;
        this.PlayerGameInfo[_playerIndex2].TotalHBCash = HMCash;
        this.PlayerGameInfo[_playerIndex2].TotalBMCash = BMCash;
        this.PlayerGameInfo[_playerIndex2].TotalGoldCash = GoldCash;
        this.PlayerGameInfo[_playerIndex2].TotalStocksCash = StockCash;
        this.PlayerGameInfo[_playerIndex2].TotalLoanBalance = loanAmount;
      }
    }
  },
  RaiseEventForGameComplete: function RaiseEventForGameComplete(_data) {
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(6, _data);
  },
  RaiseEventToSyncGameCompleteData: function RaiseEventToSyncGameCompleteData(_data) {
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(16, _data);
  },
  SyncGameOver: function SyncGameOver(_UID) {
    var infoText = "";
    var statusText = "";

    if (this.SelectedMode == 2) {
      //for real players
      if (!GameCompleted) {
        GameCompleted = true;
        GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectData();
        isGameOver = true;
        var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();
        var MyData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
        console.log(_UID);
        console.log(MyData.customProperties.PlayerSessionData.PlayerUID);
        GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData.GameOver = true;

        if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == true) {
          var _index = -1;

          for (var index = 0; index < MainSessionData.length; index++) {
            if (MainSessionData[index].customProperties.PlayerSessionData.PlayerUID == _UID) {
              _index = index;
              break;
            }
          }

          statusText = "Game won by " + MainSessionData[_index].customProperties.PlayerSessionData.PlayerName;
          infoText = "Current Cash : $" + MainSessionData[_index].customProperties.PlayerSessionData.Cash + "\n" + "Home Based Businesses Value : $" + MainSessionData[_index].customProperties.PlayerSessionData.TotalHBCash + "\n" + "Brick And Mortar Businesses Value : $" + MainSessionData[_index].customProperties.PlayerSessionData.TotalBMCash + "\n" + "Gold Value : $" + MainSessionData[_index].customProperties.PlayerSessionData.TotalGoldCash + "\n" + "Stocks Value : $" + MainSessionData[_index].customProperties.PlayerSessionData.TotalStocksCash + "\n" + "Loan Balance : $" + MainSessionData[_index].customProperties.PlayerSessionData.TotalLoanBalance + "\n" + "Total Cash Earned : $" + MainSessionData[_index].customProperties.PlayerSessionData.TotalScore + "\n";
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText);
        } else {
          if (MyData.customProperties.PlayerSessionData.PlayerUID == _UID) {
            //you won
            statusText = "Congrats! you have won the game.";
            infoText = "Current Cash : $" + MyData.customProperties.PlayerSessionData.Cash + "\n" + "Home Based Businesses Value : $" + MyData.customProperties.PlayerSessionData.TotalHBCash + "\n" + "Brick And Mortar Businesses Value : $" + MyData.customProperties.PlayerSessionData.TotalBMCash + "\n" + "Gold Value : $" + MyData.customProperties.PlayerSessionData.TotalGoldCash + "\n" + "Stocks Value : $" + MyData.customProperties.PlayerSessionData.TotalStocksCash + "\n" + "Loan Balance : $" + MyData.customProperties.PlayerSessionData.TotalLoanBalance + "\n" + "Total Cash Earned : $" + MyData.customProperties.PlayerSessionData.TotalScore + "\n";

            var _currentCash = parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gameCash);

            var _total = _currentCash + parseInt(MyData.customProperties.PlayerSessionData.TotalScore);

            GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gameCash = _total.toString();

            var _won = parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gamesWon);

            _won = _won + 1;
            GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gamesWon = _won.toString();
            GamePlayReferenceManager.Instance.Get_ServerBackend().UpdateUserData(_total, _won, -1);
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText);
          } else {
            //you lose
            statusText = "Unfortunately! you have lost the game.";
            infoText = "Current Cash : $" + MyData.customProperties.PlayerSessionData.Cash + "\n" + "Home Based Businesses Value : $" + MyData.customProperties.PlayerSessionData.TotalHBCash + "\n" + "Brick And Mortar Businesses Value : $" + MyData.customProperties.PlayerSessionData.TotalBMCash + "\n" + "Gold Value : $" + MyData.customProperties.PlayerSessionData.TotalGoldCash + "\n" + "Stocks Value : $" + MyData.customProperties.PlayerSessionData.TotalStocksCash + "\n" + "Loan Balance : $" + MyData.customProperties.PlayerSessionData.TotalLoanBalance + "\n" + "Total Cash Earned : $" + MyData.customProperties.PlayerSessionData.TotalScore + "\n";
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText);
          }
        }
      }
    } else if (this.SelectedMode == 1) {
      //with bot
      isGameOver = true;
      var MainSessionData = this.PlayerGameInfo;
      var MyData = this.PlayerGameInfo[0];
      console.log(_UID);
      console.log(MyData.PlayerUID);
      this.PlayerGameInfo[0].GameOver = true;

      if (MyData.PlayerUID == _UID) {
        //you won
        statusText = "Congrats! you have won the game.";
        infoText = "Current Cash : $" + MyData.Cash + "\n" + "Home Based Businesses Value : $" + MyData.TotalHBCash + "\n" + "Brick And Mortar Businesses Value : $" + MyData.TotalBMCash + "\n" + "Gold Value : $" + MyData.TotalGoldCash + "\n" + "Stocks Value : $" + MyData.TotalStocksCash + "\n" + "Loan Balance : $" + MyData.TotalLoanBalance + "\n" + "Total Cash Earned : $" + MyData.TotalScore + "\n" + "Other Player Earned Cash : $" + this.PlayerGameInfo[1].TotalScore + "\n";

        var _currentCash = parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gameCash);

        var _total = _currentCash + parseInt(MyData.TotalScore);

        GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gameCash = _total.toString();

        var _won = parseInt(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gamesWon);

        _won = _won + 1;
        GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.gamesWon = _won.toString();
        GamePlayReferenceManager.Instance.Get_ServerBackend().UpdateUserData(_total, _won, -1);
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText);
      } else {
        //you lose
        statusText = "Unfortunately! you have lost the game.";
        infoText = "Current Cash : $" + MyData.Cash + "\n" + "Home Based Businesses Value : $" + MyData.TotalHBCash + "\n" + "Brick And Mortar Businesses Value : $" + MyData.TotalBMCash + "\n" + "Gold Value : $" + MyData.TotalGoldCash + "\n" + "Stocks Value : $" + MyData.TotalStocksCash + "\n" + "Loan Balance : $" + MyData.TotalLoanBalance + "\n" + "Total Cash Earned : $" + MyData.TotalScore + "\n" + "Other Player Earned Cash : $" + this.PlayerGameInfo[1].TotalScore + "\n";
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText);
      }
    }
  },
  SyncGameCompleteData: function SyncGameCompleteData(_data) {
    var _this4 = this;

    var _isBot = _data.Bot;

    if (_isBot) {
      this.CallGameComplete(true, false);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Game over, calculating total cash...", 1500, false);
      setTimeout(function () {
        _this4.ZoomCameraOutOnly();

        var max = -1;
        var SelectedInd = 0;
        var SessionData = _this4.PlayerGameInfo;

        for (var index = 0; index < SessionData.length; index++) {
          var _value = SessionData[index].TotalScore;

          if (_value > max) {
            SelectedInd = index;
            max = _value;
          }
        }

        for (var _index7 = 0; _index7 < SessionData.length; _index7++) {
          if (SessionData[_index7].IsActive) {
            var _value = SessionData[_index7].TotalScore;
            console.log(_value);
          }
        }

        console.trace("game won by player id: " + SessionData[SelectedInd].PlayerUID);

        _this4.RaiseEventForGameComplete(SessionData[SelectedInd].PlayerUID);
      }, 1500);
    } else {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
        this.CallGameComplete(false, false);
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Game over, calculating total cash...", 1500, false);
        setTimeout(function () {
          console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray());

          _this4.ZoomCameraOutOnly();

          _this4.SyncDataToPlayerGameInfo(0);

          var max = -1;
          var SelectedInd = 0;
          var SessionData = _this4.PlayerGameInfo;
          console.log(SessionData);

          for (var index = 0; index < SessionData.length; index++) {
            if (SessionData[index].IsActive) {
              var _value = SessionData[index].TotalScore;

              if (_value > max) {
                SelectedInd = index;
                max = _value;
              }
            }
          }

          for (var _index8 = 0; _index8 < SessionData.length; _index8++) {
            if (SessionData[_index8].IsActive) {
              var _value = SessionData[_index8].TotalScore;
              console.log(_value);
            }
          }

          console.trace("game won by player id: " + SessionData[SelectedInd].PlayerUID);

          _this4.RaiseEventForGameComplete(SessionData[SelectedInd].PlayerUID);
        }, 1500);
      }
    }
  },
  AllPlayersGameCompleted: function AllPlayersGameCompleted(_isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    var _data = {
      Bot: _isBot
    };
    this.RaiseEventToSyncGameCompleteData(_data);
  },
  GameOver: function GameOver(_forceGameOver) {
    var _this5 = this;

    if (_forceGameOver === void 0) {
      _forceGameOver = false;
    }

    if (this.SelectedMode == 2) {
      //for real players
      if (_forceGameOver) {
        this.ZoomCameraOutOnly();
      }

      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
        this.SyncDataToPlayerGameInfo(0);
        var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();
        var playercompleted = 0;
        this.PlayerGameInfo[this.TurnNumber].isGameFinished = true; // for (let index = 0; index < MainSessionData.length; index++) {
        //   if (MainSessionData[index].customProperties.PlayerSessionData.isGameFinished) playercompleted++;
        // }

        for (var index = 0; index < this.PlayerGameInfo.length; index++) {
          if (this.PlayerGameInfo[index].IsActive == false || this.PlayerGameInfo[index].isGameFinished) playercompleted++;
        }

        console.log("player completed: " + playercompleted);
        console.log("player gameinfo length: " + this.PlayerGameInfo.length);

        if (playercompleted >= this.PlayerGameInfo.length || _forceGameOver) {
          //game completed on all system
          isGameOver = true;

          if (_forceGameOver) {
            setTimeout(function () {
              _this5.AllPlayersGameCompleted(false);
            }, 1000);
          } else if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
            if (!PassedPayDay && !DoublePayDay) {
              this.AllPlayersGameCompleted(false);
            } else {
              IsTweening = false;
              this.completeCardTurn();
            }
          }
        } else {
          if (!isGameOver) {
            if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
              if (!PassedPayDay && !DoublePayDay) {
                IsTweening = false;
                this.completeCardTurn();
              }
            } else {
              IsTweening = false;
              this.completeCardTurn();
            }
          }
        }
      }
    } else if (this.SelectedMode == 1) {
      //for bot
      if (this.PlayerGameInfo[this.TurnNumber].IsBot) BotGameOver = true;else userGameOver = true;
      console.log("usergameover: " + userGameOver);
      console.log("botgameover: " + BotGameOver); // this.CallGameComplete(true);

      var playercompleted = 0;
      this.PlayerGameInfo[this.TurnNumber].isGameFinished = true;
      var MainSessionData = this.PlayerGameInfo;

      for (var _index9 = 0; _index9 < MainSessionData.length; _index9++) {
        if (MainSessionData[_index9].isGameFinished) playercompleted++;
      }

      if (playercompleted == this.PlayerGameInfo.length) {
        //gamecompleted on all systems
        BotGameOver = true;
        userGameOver = true;
        isGameOver = true;

        if (!PassedPayDay && !DoublePayDay) {
          this.AllPlayersGameCompleted(true);
        }
      } else {
        if (!isGameOver) {
          if (!PassedPayDay && !DoublePayDay) {
            IsTweening = false;
            this.completeCardTurn();
          }
        }
      }
    }
  },
  StartDiceRoll: function StartDiceRoll() {
    var _this6 = this;

    if (RollCounter >= GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
      console.log("Gameover");
      this.ZoomCameraOut();
      setTimeout(function () {
        _this6.GameOver(false);
      }, 1500);
    } else {
      if (!isGameOver) {
        DiceTemp = DiceTemp + 1;

        var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.y);

        this.TweenPlayer(this.AllPlayerNodes[this.TurnNumber], _toPos);
      }
    }
  },
  getRandom: function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min included and max excluded
  },
  TweenCamera: function TweenCamera(_pos, isZoom, time) {
    var _this7 = this;

    cc.tween(this.CameraNode).to(time, {
      position: cc.v2(_pos.x, _pos.y)
    }, {
      easing: "quadInOut"
    }).call(function () {
      if (isZoom) _this7.ZoomCameraIn();else _this7.ZoomCameraOut();
    }).start();
  },
  ZoomCameraIn: function ZoomCameraIn() {
    var _this8 = this;

    setTimeout(function () {
      if (_this8.Camera.zoomRatio < 2) {
        _this8.Camera.zoomRatio = _this8.Camera.zoomRatio + 0.03;

        _this8.ZoomCameraIn();
      } else {
        _this8.Camera.zoomRatio = 2;
        _this8.isCameraZooming = true;

        _this8.StartDiceRoll();
      }
    }, 10);
  },
  CheckPayDayConditions: function CheckPayDayConditions(_isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    if (RollCounter < GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
      if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType) == 6) {
        PassedPayDay = true;
        PassedPayDayCounter = PassedPayDayCounter + 1;
      }

      if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType) == 7) {
        DoublePayDay = true;
        DoublePayDayCounter++;
        PassedPayDayCounter++;
      }
    }

    _nextTurnDoublePay = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.NextTurnDoublePay;

    if (PassedPayDay && !DoublePayDay && !_nextTurnDoublePay) {
      //this.ToggleDoublePayNextTurn(false);
      //this.TogglePayDay(false,false);
      this.ProcessPayDay_TurnDecision(false, _isBot);
    } else if (DoublePayDay || PassedPayDay && _nextTurnDoublePay) {
      //this.ToggleDoublePayNextTurn(false);
      //this.TogglePayDay(false,false);
      this.ProcessPayDay_TurnDecision(true, _isBot);
    } else {
      this.callUponCard();
    }
  },
  ZoomCameraOutOnly: function ZoomCameraOutOnly() {
    var _this9 = this;

    setTimeout(function () {
      if (_this9.Camera.zoomRatio >= 1) {
        _this9.isCameraZooming = false;
        _this9.Camera.zoomRatio = _this9.Camera.zoomRatio - 0.03;

        _this9.ZoomCameraOutOnly();
      } else {
        _this9.CameraNode.position = cc.Vec2(0, 0);
        _this9.Camera.zoomRatio = 1;
      }
    }, 10);
  },
  ZoomCameraOut: function ZoomCameraOut() {
    var _this10 = this;

    setTimeout(function () {
      if (_this10.Camera.zoomRatio >= 1) {
        _this10.isCameraZooming = false;
        _this10.Camera.zoomRatio = _this10.Camera.zoomRatio - 0.03;

        _this10.ZoomCameraOut();
      } else {
        _this10.CameraNode.position = cc.Vec2(0, 0);
        _this10.Camera.zoomRatio = 1; // IsTweening = false;

        GamePlayReferenceManager.Instance.Get_GameplayUIManager().PrintDiceValue_TurnDecision(0);

        if (_this10.SelectedMode == 1) {
          if (_this10.PlayerGameInfo[_this10.TurnNumber].IsBot && !BotGameOver) {
            _this10.CheckPayDayConditions(_this10.PlayerGameInfo[_this10.TurnNumber].IsBot);
          } else {
            if (!_this10.PlayerGameInfo[_this10.TurnNumber].IsBot && !userGameOver) {
              _this10.CheckPayDayConditions(_this10.PlayerGameInfo[_this10.TurnNumber].IsBot);
            }
          }
        }

        if (_this10.SelectedMode == 2) {
          //real player
          if (PlayerLeft) {
            // IsTweening = false;
            PlayerLeft = false;
          }

          if (_this10.PlayerGameInfo[_this10.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) _this10.CheckPayDayConditions();else _this10.callUponCard();
        }
      }
    }, 10);
  },
  TweenPlayer: function TweenPlayer(Node, ToPos) {
    var _this11 = this;

    cc.tween(Node) //0.4
    .to(0.4, {
      position: cc.v2(ToPos.x, ToPos.y)
    }, {
      easing: "quadInOut"
    }).call(function () {
      if (DiceTemp < DiceRoll) {
        // console.log(DiceTemp + " " + RollCounter);
        if (_this11.SelectedMode == 1) {
          //for bot
          if (_this11.PlayerGameInfo[_this11.TurnNumber].IsBot) {
            if (!BotGameOver) {
              if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType) == 6 || parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType) == 7) {
                PassedPayDay = true;
                PassedPayDayCounter++;
              }
            } else {
              console.log("bot game is over");
            }
          } else {
            if (!userGameOver) {
              if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType) == 6 || parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType) == 7) {
                PassedPayDay = true;
                PassedPayDayCounter++;
              } /// console.error(PassedPayDayCounter);

            } else {
              console.log("user game is over skipping");
            }
          } // console.log(PassedPayDay);

        }

        if (_this11.SelectedMode == 2) {
          if (_this11.PlayerGameInfo[_this11.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
            if (!_this11.PlayerGameInfo[_this11.TurnNumber].isGameFinished) {
              if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType) == 6) {
                PassedPayDay = true;
                PassedPayDayCounter++;
              }

              if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType) == 7) {
                DoublePayDay = true;
                DoublePayDayCounter++;
                PassedPayDayCounter++;
              }
            } else {
              console.log("Game finished for: " + _this11.PlayerGameInfo[_this11.TurnNumber].PlayerName);
            }
          }
        }

        if (RollCounter < GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
          if (RollCounter == 12) RollCounter = RollCounter + 21;else RollCounter = RollCounter + 1;
        } else {
          RollCounter = RollCounter + 1;
          DiceTemp = DiceRoll;
        } //DiceTemp=DiceTemp+1;
        //  console.log(DiceTemp + " " + RollCounter);


        _this11.StartDiceRoll(); //this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter=RollCounter;

      } else {
        var _newpos = cc.Vec2(0, 0);

        _this11.TweenCamera(_newpos, false, 0.6); //zoomout

      }
    }).start();
  },
  //rules implmentation during turn (turn decisions)
  TogglePayDay: function TogglePayDay(_st1, _St2) {
    PassedPayDay = _st1;
    DoublePayDay = _St2;

    if (!_st1) {
      PassedPayDayCounter = 0;
    }

    if (!_St2) {
      DoublePayDayCounter = 0;
    }
  },
  IncreaseDoublePayDay: function IncreaseDoublePayDay() {
    DoublePayDayCounter++;
  },
  ExpandBusiness_TurnDecision: function ExpandBusiness_TurnDecision(amount, _index, _locationName, _isCardFunctionality, _GivenCash, _StartAnyBusinessWithoutCash) {
    if (_isCardFunctionality === void 0) {
      _isCardFunctionality = false;
    }

    if (_GivenCash === void 0) {
      _GivenCash = 0;
    }

    if (_StartAnyBusinessWithoutCash === void 0) {
      _StartAnyBusinessWithoutCash = false;
    }

    if (this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[_index].LocationsName.length < 3) {
      if (!_isCardFunctionality) {
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
      } else {
        if (_GivenCash >= amount) {
          _GivenCash = _GivenCash - amount;
          this.PlayerGameInfo[this.TurnNumber].TotalLocationsAmount = this.PlayerGameInfo[this.TurnNumber].TotalLocationsAmount + 1;

          this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[_index].LocationsName.push(_locationName);

          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully expanded your business.", 1000);
          setTimeout(function () {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().OnExpandButtonExitClicked_TurnDecision();
          }, 1200);
        } else {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You don't have enough cash to expand this business, cash needed $ " + amount + ", Cash Given $" + _GivenCash);
        }
      }
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You cannot own more than three brick and mortar business locations");
    }
  },
  GenerateExpandBusiness_Prefabs_TurnDecision: function GenerateExpandBusiness_Prefabs_TurnDecision(_isCardFunctionality, _GivenCash, _StartAnyBusinessWithoutCash) {
    if (_isCardFunctionality === void 0) {
      _isCardFunctionality = false;
    }

    if (_GivenCash === void 0) {
      _GivenCash = 0;
    }

    if (_StartAnyBusinessWithoutCash === void 0) {
      _StartAnyBusinessWithoutCash = false;
    }

    BusinessLocationNodes = [];
    console.log(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness);

    for (var i = 0; i < this.PlayerGameInfo[this.TurnNumber].NoOfBusiness.length; i++) {
      if (parseInt(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[i].BusinessType) == 2) {
        //this means there is brick and mortar in list
        var node = cc.instantiate(GamePlayReferenceManager.Instance.Get_GameplayUIManager().TurnDecisionSetupUI.ExpandBusinessPrefab);
        node.parent = GamePlayReferenceManager.Instance.Get_GameplayUIManager().TurnDecisionSetupUI.ExpandBusinessScrollContent;
        node.getComponent("ExpandBusinessHandler").SetBusinessIndex(i);
        node.getComponent("ExpandBusinessHandler").SetName(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[i].BusinessName);
        node.getComponent("ExpandBusinessHandler").SetCardFunctionality(_isCardFunctionality);
        node.getComponent("ExpandBusinessHandler").SetGivenCash(_GivenCash);
        node.getComponent("ExpandBusinessHandler").SetStartAnyBusinessWithoutCash(_StartAnyBusinessWithoutCash);
        node.getComponent("ExpandBusinessHandler").ResetEditBox();
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
  ProcessPayDay_TurnDecision: function ProcessPayDay_TurnDecision(_isDoublePayDay, _isBot, _forSelectedBusiness, _SelectedBusinessIndex, HBAmount, BMAmount, BMLocations) {
    var _this12 = this;

    if (_isDoublePayDay === void 0) {
      _isDoublePayDay = false;
    }

    if (_isBot === void 0) {
      _isBot = false;
    }

    if (_forSelectedBusiness === void 0) {
      _forSelectedBusiness = false;
    }

    if (_SelectedBusinessIndex === void 0) {
      _SelectedBusinessIndex = 0;
    }

    if (HBAmount === void 0) {
      HBAmount = 0;
    }

    if (BMAmount === void 0) {
      BMAmount = 0;
    }

    if (BMLocations === void 0) {
      BMLocations = 0;
    }

    if (_forSelectedBusiness) {
      var _title = "PayDay";
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title, false, false, false, _isBot, _forSelectedBusiness, _SelectedBusinessIndex, HBAmount, BMAmount, BMLocations, 1, 0);
    } else {
      if (DoublePayDay && PassedPayDay && _nextTurnDoublePay) {
        DoublePayDayCounter = 2;
      }

      _skipNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextPayday;
      _skipHMNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipHMNextPayday;
      _skipBMNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipBMNextPayday;

      if (_skipNextPayday) {
        //if previously skip payday was stored by any card
        this.ToggleSkipPayDay_Whole(false);

        if (!_isBot) {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Skipping PayDay.", 1600);
          setTimeout(function () {
            _this12.callUponCard();
          }, 1650);
        } else {
          console.log("Skipping PayDay.");
          setTimeout(function () {
            _this12.callUponCard();
          }, 800);
        }
      } else {
        var _title = "";
        if (_isDoublePayDay) _title = "DoublePayDay";else _title = "PayDay";
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title, _isDoublePayDay, _skipHMNextPayday, _skipBMNextPayday, _isBot, false, 0, 0, 0, 0, PassedPayDayCounter, DoublePayDayCounter);
      }
    }
  },
  Bankrupt_TurnDecision: function Bankrupt_TurnDecision() {
    this.PlayerGameInfo[this.TurnNumber].IsBankrupt = true;
    this.PlayerGameInfo[this.TurnNumber].BankruptAmount += 1;
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(true, false, this.SelectedMode, this.PlayerGameInfo[this.TurnNumber].IsBankrupt, this.PlayerGameInfo[this.TurnNumber].BankruptAmount);
  },
  SendProfit_Partner_TurnDecision: function SendProfit_Partner_TurnDecision(_amount, _uID) {
    var _data = {
      Data: {
        Cash: _amount,
        ID: _uID
      }
    };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(13, _data);
  },
  ReceiveProfit_Partner_TurnDecision: function ReceiveProfit_Partner_TurnDecision(_data) {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == false) {
      var _amount = _data.Data.Cash;
      var _iD = _data.Data.ID;

      var _myIndex = this.GetMyIndex();

      if (this.PlayerGameInfo[_myIndex].PlayerUID == _iD) {
        if (this.PlayerGameInfo[_myIndex].isGameFinished == true) {
          this.PlayerGameInfo[_myIndex].TotalScore += _amount;
        }

        this.PlayerGameInfo[_myIndex].Cash += _amount;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have received profit of $" + _amount + " from your partner.", 2800);
        GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[_myIndex]);
      }
    }
  },
  //#endregion
  //#region Cards Rules
  ToggleDoublePayNextTurn: function ToggleDoublePayNextTurn(_state) {
    _nextTurnDoublePay = _state;
    this.PlayerGameInfo[this.TurnNumber].CardFunctionality.NextTurnDoublePay = _nextTurnDoublePay;
  },
  ToggleSkipNextTurn: function ToggleSkipNextTurn(_state) {
    _skipNextTurn = _state;
    this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn = _skipNextTurn;
  },
  ToggleSkipPayDay_Whole: function ToggleSkipPayDay_Whole(_state) {
    _skipNextPayday = _state;
    this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextPayday = _skipNextPayday;
  },
  ToggleSkipPayDay_HomeBased: function ToggleSkipPayDay_HomeBased(_state) {
    _skipHMNextPayday = _state;
    this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipHMNextPayday = _skipHMNextPayday;
  },
  ToggleSkipPayDay_BrickAndMortar: function ToggleSkipPayDay_BrickAndMortar(_state) {
    _skipBMNextPayday = _state;
    this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipBMNextPayday = _skipBMNextPayday;
  },
  ToggleTurnProgress: function ToggleTurnProgress(_state) {
    TurnInProgress = _state;
  },
  ReturnTurnProgress: function ReturnTurnProgress() {
    return TurnInProgress;
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
  },
  QuestionPopUp_OtherUser_OneQuestion: function QuestionPopUp_OtherUser_OneQuestion(_data) {
    var _questionRef = GamePlayReferenceManager.Instance.Get_QuestionsData();

    var _userID = _data.UserID;
    var _questionIndex = _data.Question;
    var _playerIndex = _data.UserIndex;
    var _isVoc = _data.IsVoc;

    var _gameplayUIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

    if (_userID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData.PlayerUID) {
      console.log("ID matched");

      _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(true);

      var _Qdata;

      if (_isVoc) {
        console.log("voc");
        _Qdata = _questionRef.VocabularyQuestions[_questionIndex];
      } else {
        console.log("est");
        _Qdata = _questionRef.EstablishmentQuestions[_questionIndex];
      }

      CorrectAnswer = _Qdata.CorrectOption;

      var _message = "Choose the correct answer." + "\n" + "*wrong answer will cost you a fine of $5000." + "\n" + "\n" + _Qdata.Question + "\n" + "A. " + _Qdata.Option1 + "\n" + "B. " + _Qdata.Option2 + "\n" + "C. " + _Qdata.Option3 + "\n" + "D. " + _Qdata.Option4; // var _questionAsked = OneQuestions[_questionIndex - 1];


      _gameplayUIManager.SetUpDecisionScreen_OneQuestionSetupUI(_message);
    }
  },
  OneQuestionScreen_Space_OneQuestion: function OneQuestionScreen_Space_OneQuestion(_isTurnOver) {
    if (_isTurnOver === void 0) {
      _isTurnOver = false;
    }

    var _gameplayUIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

    var _myData;

    var _roomData;

    if (this.SelectedMode == 2) {
      //for real players
      _roomData = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();
      _myData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    } else if (this.SelectedMode == 1) {
      //for bot
      _myData = this.PlayerGameInfo[0];
      _roomData = this.PlayerGameInfo;
    }

    _gameplayUIManager.ToggleSpaceScreen_OneQuestionSetupUI(true);

    _gameplayUIManager.ResetSpaceScreen_OneQuestionSetupUI();

    _gameplayUIManager.SetUpSpaceScreen_OneQuestionSetupUI(_myData, _roomData, _isTurnOver, this.SelectedMode);
  },
  OneQuestionDecision_SelectOption_OneQuestion: function OneQuestionDecision_SelectOption_OneQuestion(event) {
    if (event === void 0) {
      event = null;
    }

    var _myData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;

    var _gameplayUIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

    var _selection = parseInt(event.currentTarget.name.split("_")[1]);

    console.log("option selected: " + _selection);
    console.log("CorrectAnswer: " + CorrectAnswer);

    if (_selection == CorrectAnswer) {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Your answer was correct!.", 1200);

      _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(false);

      this.RaiseEventDecision_OneQuestion(false, true, -1, _myData.PlayerUID);
    } else {
      if (_myData.Cash >= 5000) {
        for (var index = 0; index < this.PlayerGameInfo.length; index++) {
          if (_myData.PlayerUID == this.PlayerGameInfo[index].PlayerUID) {
            this.PlayerGameInfo[index].Cash -= 5000;
            GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[index]);
            break;
          }
        }

        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have answered wrong, fine amount was payed to the player.", 1200);

        _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(false);

        this.RaiseEventDecision_OneQuestion(true, false, -1, _myData.PlayerUID);
      } else {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You don't have enough cash, Skipping question");

        _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(false);

        this.RaiseEventDecision_OneQuestion(false, false, 0, _myData.PlayerUID); //GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
      }
    }
  },
  // OneQuestionDecision_PayAmount_OneQuestion() {
  //   var _myData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
  //   var _gameplayUIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();
  //   if (_myData.Cash >= 5000) {
  //     for (let index = 0; index < this.PlayerGameInfo.length; index++) {
  //       if (_myData.PlayerUID == this.PlayerGameInfo[index].PlayerUID) {
  //         this.PlayerGameInfo[index].Cash -= 5000;
  //         GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[index]);
  //         break;
  //       }
  //     }
  //     GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully paid cash amount to player.", 1200);
  //     _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(false);
  //     this.RaiseEventDecision_OneQuestion(true, false, -1, _myData.PlayerUID);
  //   } else {
  //     GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You don't have enough cash.");
  //   }
  // },
  // OneQuestionDecision_AnswerQuestion_OneQuestion() {
  //   var _gameplayUIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();
  //   var _myData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
  //   GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully answered the question.", 1200);
  //   _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(false);
  //   this.RaiseEventDecision_OneQuestion(false, true, OneQuestionIndex, _myData.PlayerUID);
  // },
  RaiseEventDecision_OneQuestion: function RaiseEventDecision_OneQuestion(_hasDonePayment, _hasAnsweredQuestion, _questionIndex, _UserID) {
    var _data = {
      PaymentDone: _hasDonePayment,
      QuestionAnswered: _hasAnsweredQuestion,
      QuestionIndex: _questionIndex,
      ID: _UserID
    };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(8, _data);
  },
  ReceiveEventDecision_OneQuestion: function ReceiveEventDecision_OneQuestion(_data) {
    var _this13 = this;

    var _gameplayUIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

    if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
      var _hasDonePayment = _data.PaymentDone;
      var _hasAnsweredQuestion = _data.QuestionAnswered;
      var _questionIndex = _data.QuestionIndex;
      var _uID = _data.ID;

      _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(false);

      if (_questionIndex == 0) {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("player does not have enough cash, so questions were skipped.", 2100);

        _gameplayUIManager.ToggleSpaceScreen_OneQuestionSetupUI(false);

        this.completeCardTurn();
      } else {
        if (_hasDonePayment) {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(false);
          this.PlayerGameInfo[this.TurnNumber].Cash += 5000;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("player has given wrong answer, cash $5000 has been added.", 2100);

          _gameplayUIManager.ToggleSpaceScreen_OneQuestionSetupUI(false);

          this.completeCardTurn();
        } else if (_hasAnsweredQuestion) {
          var _selectedPlayerIndex = 0;

          var _actorsData = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();

          for (var index = 0; index < _actorsData.length; index++) {
            if (_uID == _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
              _selectedPlayerIndex = index;
              break;
            }
          }

          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("player has given correct answer, no cash was received.", 2100); // if (_questionIndex == 1) {
          //   //have you skipped loan previous payday?
          //   if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.SkippedLoanPayment) {
          //     GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered to have skipped loan payement in previous payday", 2100);
          //   } else {
          //     GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered not to have skipped loan payement in previous payday", 2100);
          //   }
          // } else if (_questionIndex == 2) {
          //   //Have you taken any loan?
          //   var _loanTaken = false;
          //   for (let index = 0; index < _actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.NoOfBusiness.length; index++) {
          //     if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.NoOfBusiness[index].LoanTaken) {
          //       _loanTaken = true;
          //       break;
          //     }
          //   }
          //   if (_loanTaken) {
          //     GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered to have taken some loan", 2100);
          //   } else {
          //     GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered not to have taken any loan", 2100);
          //   }
          // } else if (_questionIndex == 3) {
          //   //Are you bankrupted? if more than once, tell me the amount?
          //   if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.IsBankrupt) {
          //     GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered to have been bankrupted " + _actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.BankruptAmount + " time/es.", 2100);
          //   } else {
          //     GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered not to have been bankrupted", 2100);
          //   }
          // } else if (_questionIndex == 4) {
          //   //Is your turn going to be skipped next time?
          //   if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.CardFunctionality.SkipNextTurn) {
          //     GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered, next turn will be skipped.", 2100);
          //   } else {
          //     GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered, next turn will not be skipped.", 2100);
          //   }
          // } else if (_questionIndex == 5) {
          //   //Is it going to be double pay day your next payday?
          //   if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.CardFunctionality.NextTurnDoublePay) {
          //     GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered, next payday will be double payday", 2100);
          //   } else {
          //     GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered, next payday will not be double payday", 2100);
          //   }
          // }

          setTimeout(function () {
            _gameplayUIManager.ToggleSpaceScreen_OneQuestionSetupUI(false);

            _this13.completeCardTurn();
          }, 200);
        }
      }
    }
  },
  ReceiveGoBackSpacesData_spaceFunctionality: function ReceiveGoBackSpacesData_spaceFunctionality(_data) {
    var _this14 = this;

    if (IsTweening == true) {
      setTimeout(function () {
        _this14.ReceiveGoBackSpacesData_spaceFunctionality(_data);
      }, 800);
    } else {
      var _spaces = _data.Data.backspaces;
      var _counter = _data.Data.Counter;

      var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[_counter + Backspaces].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.y);

      this.TweenPlayer_GoBackSpaces(this.AllPlayerNodes[this.TurnNumber], _toPos, 0.1);
      RollCounter = _counter;

      var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.y);

      this.TweenPlayer_GoBackSpaces(this.AllPlayerNodes[this.TurnNumber], _toPos);
    }
  },
  TweenPlayer_GoBackSpaces: function TweenPlayer_GoBackSpaces(Node, ToPos, speed) {
    if (speed === void 0) {
      speed = 0.6;
    }

    cc.tween(Node).to(speed, {
      position: cc.v2(ToPos.x, ToPos.y)
    }, {
      easing: "quadInOut"
    }).call(function () {}).start();
  },
  GoBackSpaces_spaceFunctionality: function GoBackSpaces_spaceFunctionality() {
    RollCounter -= Backspaces;

    if (this.SelectedMode == 2) {
      var _data = {
        Data: {
          backspaces: Backspaces,
          Counter: RollCounter
        }
      };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(10, _data);
    }

    var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.y);

    this.TweenPlayer_GoBackSpaces(this.AllPlayerNodes[this.TurnNumber], _toPos);
    this.completeCardTurn();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJQcmV2aW91c0RpY2VSb2xsMyIsIlByZXZpb3VzRGljZVJvbGw0IiwiUHJldmlvdXNEaWNlUm9sbDUiLCJ1c2VyR2FtZU92ZXIiLCJCb3RHYW1lT3ZlciIsIlRvdGFsQ291bnRlclJlYWNoZWQiLCJQYXNzZWRQYXlEYXlDb3VudGVyIiwiRG91YmxlUGF5RGF5Q291bnRlciIsIk5vQ2FyZEZ1bmN0aW9uYWxpdHkiLCJQbGF5ZXJMZWZ0IiwiRm9yY2VDaGFuZ2VUaW1lT3V0IiwiR2FtZUNvbXBsZXRlZCIsIkNvcnJlY3RBbnN3ZXIiLCJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIlBhcnRuZXJOYW1lIiwiTG9jYXRpb25zTmFtZSIsIkxvYW5UYWtlbiIsIkxvYW5BbW91bnQiLCJjdG9yIiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiTmV4dFR1cm5Eb3VibGVQYXkiLCJTa2lwTmV4dFR1cm4iLCJTa2lwTmV4dFBheWRheSIsIlNraXBITU5leHRQYXlkYXkiLCJTa2lwQk1OZXh0UGF5ZGF5IiwiU3RvY2tJbmZvIiwiU2hhcmVBbW91bnQiLCJQbGF5ZXJEYXRhIiwiUGxheWVyTmFtZSIsIlBsYXllclVJRCIsIkF2YXRhcklEIiwiSXNCb3QiLCJOb09mQnVzaW5lc3MiLCJDYXJkRnVuY3Rpb25hbGl0eSIsIkhvbWVCYXNlZEFtb3VudCIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJOb09mU3RvY2tzIiwiQ2FzaCIsIkdvbGRDb3VudCIsIlN0b2NrQ291bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJMYXd5ZXJTdGF0dXMiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQbGF5ZXJSb2xsQ291bnRlciIsIkluaXRpYWxDb3VudGVyQXNzaWduZWQiLCJpc0dhbWVGaW5pc2hlZCIsIlRvdGFsU2NvcmUiLCJUb3RhbEhCQ2FzaCIsIlRvdGFsQk1DYXNoIiwiVG90YWxHb2xkQ2FzaCIsIlRvdGFsTG9hbkJhbGFuY2UiLCJUb3RhbFN0b2Nrc0Nhc2giLCJHYW1lT3ZlciIsIklzQWN0aXZlIiwiUm9sbENvdW50ZXIiLCJEaWNlVGVtcCIsIkRpY2VSb2xsIiwiSXNUd2VlbmluZyIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlR1cm5DaGVja0FycmF5IiwiQnVzaW5lc3NMb2NhdGlvbk5vZGVzIiwiUGFzc2VkUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiX25leHRUdXJuRG91YmxlUGF5IiwiX3NraXBOZXh0VHVybiIsIl9za2lwTmV4dFBheWRheSIsIl9za2lwSE1OZXh0UGF5ZGF5IiwiX3NraXBCTU5leHRQYXlkYXkiLCJDYXJkRXZlbnRSZWNlaXZlZCIsIlR1cm5JblByb2dyZXNzIiwiQmFja3NwYWNlcyIsImlzR2FtZU92ZXIiLCJPbmVRdWVzdGlvbkluZGV4IiwiT25lUXVlc3Rpb25zIiwiQ2FyZERpc3BsYXlTZXRUaW1vdXQiLCJHYW1lTWFuYWdlciIsIkNvbXBvbmVudCIsIlBsYXllckdhbWVJbmZvIiwiQm90R2FtZUluZm8iLCJQbGF5ZXJOb2RlIiwiTm9kZSIsIkNhbWVyYU5vZGUiLCJBbGxQbGF5ZXJVSSIsIkFsbFBsYXllck5vZGVzIiwiU3RhcnRMb2NhdGlvbk5vZGVzIiwiU2VsZWN0ZWRNb2RlIiwic3RhdGljcyIsIkluc3RhbmNlIiwiU2V0UGxheWVyTGVmdCIsIl9zdGF0ZSIsIlJlc2V0QWxsVmFyaWFibGVzIiwiSW5wdXRUZXN0RGljZTEiLCJfdmFsIiwiSW5wdXRUZXN0RGljZTIiLCJvbkxvYWQiLCJUdXJuTnVtYmVyIiwiVHVybkNvbXBsZXRlZCIsIkNoZWNrUmVmZXJlbmNlcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRTZWxlY3RlZE1vZGUiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsIkNoZWNrU3BlY3RhdGUiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIkFsbERhdGEiLCJNYXhQbGF5ZXJzIiwibGVuZ3RoIiwiU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyIiwiVXBkYXRlR2FtZVVJIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJHZXRUdXJuTnVtYmVyIiwiR2V0TXlJbmRleCIsIm15SW5kZXgiLCJfYWN0b3IiLCJQaG90b25BY3RvciIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9hbGxBY3RvcnMiLCJpbmRleCIsIlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyIsIkFzc2lnblBsYXllckdhbWVVSSIsIkVuYWJsZVBsYXllck5vZGVzIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsImNvbnNvbGUiLCJsb2ciLCJfdG9Qb3MiLCJWZWMyIiwiR2V0X1NwYWNlTWFuYWdlciIsIkRhdGEiLCJSZWZlcmVuY2VMb2NhdGlvbiIsInBvc2l0aW9uIiwieCIsInkiLCJzZXRQb3NpdGlvbiIsIl9sYXN0SW5kZXgiLCJhY3RpdmUiLCJDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyIiwiVG90YWxDb25uZWN0ZWRQbGF5ZXJzIiwibXlSb29tQWN0b3JDb3VudCIsInVzZXJJRCIsInNldEN1c3RvbVByb3BlcnR5IiwiQ2hhbmdlVHVybiIsIlJhaXNlRXZlbnRGb3JDYXJkIiwiX2RhdGEiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiRGlzcGxheUNhcmRPbk90aGVycyIsIk9uTGFuZGVkT25TcGFjZSIsInNldFRpbWVvdXQiLCJSZXNldENhcmREaXNwbGF5IiwiUmVjZWl2ZUV2ZW50Rm9yQ2FyZCIsIlJhbmRvbUNhcmQiLCJyYW5kb21DYXJkIiwiY291bnRlciIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJTeW5jQWxsRGF0YSIsIlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZSIsIl91aWQiLCJwdXNoIiwiQXJyYXlMZW5ndGgiLCJJREZvdW5kIiwiaiIsIlJlc2V0U29tZVZhbHVlcyIsIkNoYW5nZVR1cm5Gb3JjZWZ1bGx5IiwiVXBkYXRlVmlzdWFsRGF0YSIsIlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSIsIlR1cm5IYW5kbGVyIiwiX3R1cm4iLCJfaXNNYXN0ZXIiLCJDaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQiLCJfcGxheWVyTWF0Y2hlZCIsIlRvZ2dsZVR1cm5Qcm9ncmVzcyIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlJlc2V0VHVyblZhcmlhYmxlIiwiUm9sbERpY2UiLCJEaWNlUm9sbFNjcmVlbiIsIlBsYXllckluZm8iLCJteVJvb21BY3RvcnNBcnJheSIsIlNob3dUb2FzdCIsIlRvZ2dsZVNraXBOZXh0VHVybiIsIl9pbmQiLCJNYWluU2Vzc2lvbkRhdGEiLCJNeURhdGEiLCJfY291bnRlciIsIlN0YXJ0VHVybiIsIlJlY2VpdmVCYW5rcnVwdERhdGEiLCJfaXNCYW5rcnVwdGVkIiwiYmFua3J1cHRlZCIsInR1cm4iLCJfcGxheWVyRGF0YSIsIlBsYXllckRhdGFNYWluIiwiU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCIsIl9yYW5kb21JbmRleCIsImdldFJhbmRvbSIsIlNldE5hbWUiLCJTZXRBdmF0YXIiLCJfdG9nZ2xlSGlnaGxpZ2h0IiwiX2luZGV4IiwiVG9nZ2xlQkdIaWdobGlnaHRlciIsIlRvZ2dsZVRleHRpZ2hsaWdodGVyIiwiY2hpbGRyZW4iLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIkF2YXRhclNwcml0ZXMiLCJTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzIiwidGFyZ2V0UG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicGFyZW50IiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJyYXRpbyIsIndpblNpemUiLCJoZWlnaHQiLCJ6b29tUmF0aW8iLCJsYXRlVXBkYXRlIiwic3luY0RpY2VSb2xsIiwiX3JvbGwiLCJfZGljZTEiLCJkaWNlMSIsIl9kaWNlMiIsImRpY2UyIiwiX3Jlc3VsdCIsImVycm9yIiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwiQW5pbWF0ZURpY2UiLCJEaWNlRnVudGlvbmFsaXR5IiwiX3BvcyIsIlR3ZWVuQ2FtZXJhIiwiVGVtcENoZWNrU3BhY2UiLCJfcm9sbGluZyIsInRlbXBjb3VudGVyIiwidGVtcGNvdW50ZXIyIiwiZGljZXRvYmUiLCJwYXJzZUludCIsIlNwYWNlRGF0YSIsIlNwYWNlc1R5cGUiLCJEaWNlMSIsIkRpY2UyIiwiX25ld1JvbGwiLCJSb2xsT25lRGljZSIsIlJvbGxUd29EaWNlcyIsImNhbGxVcG9uQ2FyZCIsIl9zcGFjZUlEIiwidmFsdWVJbmRleCIsIlN0YXJ0RGljZVJvbGwiLCJTZW5kaW5nRGF0YSIsImlzQm90IiwiY29tcGxldGVDYXJkVHVybiIsIkFsbFBsYXllcnNHYW1lQ29tcGxldGVkIiwiQ2FsbEdhbWVDb21wbGV0ZSIsIl9pc0JvdCIsIl9mb3JjZUdhbWVPdmVyIiwiX3BsYXllckluZGV4IiwiX2Nhc2giLCJITUFtb3VudCIsIkdldF9HYW1lTWFuYWdlciIsIkJNQW1vdW50IiwiQk1Mb2NhdGlvbnMiLCJsb2FuQW1vdW50IiwiX2dvbGQiLCJfc3RvY2tzIiwiX2RpY2VSYW5kb20iLCJPbmNlT3JTaGFyZSIsIkdvbGRDYXNoIiwiU3RvY2tDYXNoIiwiQk1DYXNoIiwiSE1DYXNoIiwiVG90YWxBc3NldHMiLCJSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlIiwiUmFpc2VFdmVudFRvU3luY0dhbWVDb21wbGV0ZURhdGEiLCJTeW5jR2FtZU92ZXIiLCJfVUlEIiwiaW5mb1RleHQiLCJzdGF0dXNUZXh0IiwiRGlzY29ubmVjdERhdGEiLCJTaG93UmVzdWx0U2NyZWVuIiwiX2N1cnJlbnRDYXNoIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJTdHVkZW50RGF0YSIsImdhbWVDYXNoIiwiX3RvdGFsIiwidG9TdHJpbmciLCJfd29uIiwiZ2FtZXNXb24iLCJVcGRhdGVVc2VyRGF0YSIsIlN5bmNHYW1lQ29tcGxldGVEYXRhIiwiQm90IiwiWm9vbUNhbWVyYU91dE9ubHkiLCJtYXgiLCJTZWxlY3RlZEluZCIsIlNlc3Npb25EYXRhIiwiX3ZhbHVlIiwidHJhY2UiLCJwbGF5ZXJjb21wbGV0ZWQiLCJab29tQ2FtZXJhT3V0IiwiVHdlZW5QbGF5ZXIiLCJtaW4iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJpc1pvb20iLCJ0aW1lIiwidHdlZW4iLCJ0byIsInYyIiwiZWFzaW5nIiwiY2FsbCIsIlpvb21DYW1lcmFJbiIsInN0YXJ0IiwiQ2hlY2tQYXlEYXlDb25kaXRpb25zIiwiUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24iLCJUb1BvcyIsIl9uZXdwb3MiLCJUb2dnbGVQYXlEYXkiLCJfc3QxIiwiX1N0MiIsIkluY3JlYXNlRG91YmxlUGF5RGF5IiwiRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiYW1vdW50IiwiX2xvY2F0aW9uTmFtZSIsIl9pc0NhcmRGdW5jdGlvbmFsaXR5IiwiX0dpdmVuQ2FzaCIsIl9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJpIiwibm9kZSIsImluc3RhbnRpYXRlIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiU2V0QnVzaW5lc3NJbmRleCIsIlNldENhcmRGdW5jdGlvbmFsaXR5IiwiU2V0R2l2ZW5DYXNoIiwiU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiUmVzZXRFZGl0Qm94IiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiZGVzdHJveSIsIlVwZGF0ZVN0b2Nrc19UdXJuRGVjaXNpb24iLCJfbmFtZSIsIl9TaGFyZUFtb3VudCIsIl9pc0FkZGluZyIsIl9zdG9jayIsIl9pc0RvdWJsZVBheURheSIsIl9mb3JTZWxlY3RlZEJ1c2luZXNzIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIkhCQW1vdW50IiwiX3RpdGxlIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9hbW91bnQiLCJfdUlEIiwiSUQiLCJSZWNlaXZlUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiX2lEIiwiX215SW5kZXgiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlJldHVyblR1cm5Qcm9ncmVzcyIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9sb3NlQW1vdW50IiwiTXVsdGlwbHlNYXJrZXRpbmdNb25leSIsIl9tdWx0aXBsaWVyIiwiX2Ftb3VudEluY3JlYXNlZCIsIkdldE1hcmtldGluZ01vbmV5IiwiX3Byb2ZpdCIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiX3F1ZXN0aW9uUmVmIiwiR2V0X1F1ZXN0aW9uc0RhdGEiLCJfdXNlcklEIiwiVXNlcklEIiwiX3F1ZXN0aW9uSW5kZXgiLCJRdWVzdGlvbiIsIlVzZXJJbmRleCIsIl9pc1ZvYyIsIklzVm9jIiwiX2dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX1FkYXRhIiwiVm9jYWJ1bGFyeVF1ZXN0aW9ucyIsIkVzdGFibGlzaG1lbnRRdWVzdGlvbnMiLCJDb3JyZWN0T3B0aW9uIiwiX21lc3NhZ2UiLCJPcHRpb24xIiwiT3B0aW9uMiIsIk9wdGlvbjMiLCJPcHRpb240IiwiU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbiIsIl9pc1R1cm5PdmVyIiwiX215RGF0YSIsIl9yb29tRGF0YSIsIlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJPbmVRdWVzdGlvbkRlY2lzaW9uX1NlbGVjdE9wdGlvbl9PbmVRdWVzdGlvbiIsImV2ZW50IiwiX3NlbGVjdGlvbiIsImN1cnJlbnRUYXJnZXQiLCJzcGxpdCIsIlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbiIsIl9oYXNEb25lUGF5bWVudCIsIl9oYXNBbnN3ZXJlZFF1ZXN0aW9uIiwiX1VzZXJJRCIsIlBheW1lbnREb25lIiwiUXVlc3Rpb25BbnN3ZXJlZCIsIlF1ZXN0aW9uSW5kZXgiLCJSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbiIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX3NlbGVjdGVkUGxheWVySW5kZXgiLCJfYWN0b3JzRGF0YSIsIlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eSIsIl9zcGFjZXMiLCJiYWNrc3BhY2VzIiwiQ291bnRlciIsIlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyIsInNwZWVkIiwiR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHLEtBQWQ7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUVBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBRUEsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUVBLElBQUlDLFlBQVksR0FBRyxLQUFuQjtBQUNBLElBQUlDLFdBQVcsR0FBRyxLQUFsQjtBQUNBLElBQUlDLG1CQUFtQixHQUFHLEtBQTFCO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsQ0FBMUI7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxDQUExQjtBQUNBLElBQUlDLG1CQUFtQixHQUFHLEtBQTFCO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEtBQWpCO0FBQ0EsSUFBSUMsa0JBQWtCLEdBQUcsSUFBekI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsS0FBcEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsQ0FBcEIsRUFDQTtBQUNBOztBQUNBLElBQUlDLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUM3QkMsRUFBQUEsSUFBSSxFQUFFLENBRHVCO0FBRTdCQyxFQUFBQSxTQUFTLEVBQUUsQ0FGa0I7QUFFZjtBQUNkQyxFQUFBQSxjQUFjLEVBQUUsQ0FIYSxDQUdWOztBQUhVLENBQVIsQ0FBdkIsRUFNQTs7QUFDQSxJQUFJQyxZQUFZLEdBQUdMLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQzFCQyxFQUFBQSxJQUFJLEVBQUUsY0FEb0I7QUFFMUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxJQUFJLEVBQUUsY0FESTtBQUVWQyxJQUFBQSxZQUFZLEVBQUU7QUFDWkMsTUFBQUEsV0FBVyxFQUFFLE1BREQ7QUFFWkMsTUFBQUEsSUFBSSxFQUFFYixnQkFGTTtBQUdaLGlCQUFTQSxnQkFBZ0IsQ0FBQ0csSUFIZDtBQUlaVyxNQUFBQSxZQUFZLEVBQUUsSUFKRjtBQUtaQyxNQUFBQSxPQUFPLEVBQUU7QUFMRyxLQUZKO0FBU1ZDLElBQUFBLHVCQUF1QixFQUFFO0FBQ3ZCSixNQUFBQSxXQUFXLEVBQUUsTUFEVTtBQUV2QkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZjO0FBR3ZCLGlCQUFTLEVBSGM7QUFJdkJILE1BQUFBLFlBQVksRUFBRSxJQUpTO0FBS3ZCQyxNQUFBQSxPQUFPLEVBQUU7QUFMYyxLQVRmO0FBZ0JWRyxJQUFBQSxZQUFZLEVBQUU7QUFDWk4sTUFBQUEsV0FBVyxFQUFFLE1BREQ7QUFFWkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZHO0FBR1osaUJBQVMsRUFIRztBQUlaSCxNQUFBQSxZQUFZLEVBQUUsSUFKRjtBQUtaQyxNQUFBQSxPQUFPLEVBQUU7QUFMRyxLQWhCSjtBQXVCVkksSUFBQUEsTUFBTSxFQUFFO0FBQ05QLE1BQUFBLFdBQVcsRUFBRSxRQURQO0FBRU4saUJBQVMsQ0FGSDtBQUdOQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BSEg7QUFJTk4sTUFBQUEsWUFBWSxFQUFFLElBSlI7QUFLTkMsTUFBQUEsT0FBTyxFQUFFO0FBTEgsS0F2QkU7QUE4QlZNLElBQUFBLGFBQWEsRUFBRTtBQUNiVCxNQUFBQSxXQUFXLEVBQUUsZUFEQTtBQUViLGlCQUFTLEtBRkk7QUFHYlUsTUFBQUEsSUFBSSxFQUFFckIsRUFBRSxDQUFDc0IsT0FISTtBQUliVCxNQUFBQSxZQUFZLEVBQUUsSUFKRDtBQUtiQyxNQUFBQSxPQUFPLEVBQUU7QUFMSSxLQTlCTDtBQXFDVlMsSUFBQUEsU0FBUyxFQUFFO0FBQ1RaLE1BQUFBLFdBQVcsRUFBRSxXQURKO0FBRVRDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGQTtBQUdULGlCQUFTLEVBSEE7QUFJVEgsTUFBQUEsWUFBWSxFQUFFLElBSkw7QUFLVEMsTUFBQUEsT0FBTyxFQUFFO0FBTEEsS0FyQ0Q7QUE0Q1ZVLElBQUFBLFdBQVcsRUFBRTtBQUNYYixNQUFBQSxXQUFXLEVBQUUsYUFERjtBQUVYQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRkU7QUFHWCxpQkFBUyxFQUhFO0FBSVhILE1BQUFBLFlBQVksRUFBRSxJQUpIO0FBS1hDLE1BQUFBLE9BQU8sRUFBRTtBQUxFLEtBNUNIO0FBbURWVyxJQUFBQSxhQUFhLEVBQUU7QUFDYmQsTUFBQUEsV0FBVyxFQUFFLGVBREE7QUFFYkMsTUFBQUEsSUFBSSxFQUFFLENBQUNaLEVBQUUsQ0FBQ2dCLElBQUosQ0FGTztBQUdiLGlCQUFTLEVBSEk7QUFJYkgsTUFBQUEsWUFBWSxFQUFFLElBSkQ7QUFLYkMsTUFBQUEsT0FBTyxFQUFFO0FBTEksS0FuREw7QUEwRFZZLElBQUFBLFNBQVMsRUFBRTtBQUNUZixNQUFBQSxXQUFXLEVBQUUsV0FESjtBQUVUQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRkE7QUFHVCxpQkFBUyxLQUhBO0FBSVRULE1BQUFBLFlBQVksRUFBRTtBQUpMLEtBMUREO0FBZ0VWYyxJQUFBQSxVQUFVLEVBQUU7QUFDVmhCLE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGQztBQUdWLGlCQUFTLENBSEM7QUFJVk4sTUFBQUEsWUFBWSxFQUFFO0FBSko7QUFoRUYsR0FGYztBQTBFMUJlLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBNUV5QixDQUFULENBQW5CLEVBOEVBOztBQUNBLElBQUlDLHFCQUFxQixHQUFHN0IsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDbkNDLEVBQUFBLElBQUksRUFBRSx1QkFENkI7QUFFbkNDLEVBQUFBLFVBQVUsRUFBRTtBQUNWc0IsSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJuQixNQUFBQSxXQUFXLEVBQUUsbUJBREk7QUFFakJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGUTtBQUdqQixpQkFBUyxLQUhRO0FBSWpCVCxNQUFBQSxZQUFZLEVBQUUsSUFKRztBQUtqQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFEsS0FEVDtBQVFWaUIsSUFBQUEsWUFBWSxFQUFFO0FBQ1pwQixNQUFBQSxXQUFXLEVBQUUsY0FERDtBQUVaQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRkc7QUFHWixpQkFBUyxLQUhHO0FBSVpULE1BQUFBLFlBQVksRUFBRSxJQUpGO0FBS1pDLE1BQUFBLE9BQU8sRUFBRTtBQUxHLEtBUko7QUFlVmtCLElBQUFBLGNBQWMsRUFBRTtBQUNkckIsTUFBQUEsV0FBVyxFQUFFLGdCQURDO0FBRWRDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGSztBQUdkLGlCQUFTLEtBSEs7QUFJZFQsTUFBQUEsWUFBWSxFQUFFLElBSkE7QUFLZEMsTUFBQUEsT0FBTyxFQUFFO0FBTEssS0FmTjtBQXNCVm1CLElBQUFBLGdCQUFnQixFQUFFO0FBQ2hCdEIsTUFBQUEsV0FBVyxFQUFFLGtCQURHO0FBRWhCQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRk87QUFHaEIsaUJBQVMsS0FITztBQUloQlQsTUFBQUEsWUFBWSxFQUFFLElBSkU7QUFLaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxPLEtBdEJSO0FBNkJWb0IsSUFBQUEsZ0JBQWdCLEVBQUU7QUFDaEJ2QixNQUFBQSxXQUFXLEVBQUUsa0JBREc7QUFFaEJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGTztBQUdoQixpQkFBUyxLQUhPO0FBSWhCVCxNQUFBQSxZQUFZLEVBQUUsSUFKRTtBQUtoQkMsTUFBQUEsT0FBTyxFQUFFO0FBTE87QUE3QlIsR0FGdUI7QUF3Q25DYyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVksQ0FDaEI7QUFDRDtBQTFDa0MsQ0FBVCxDQUE1QixFQTRDQTs7QUFDQSxJQUFJTyxTQUFTLEdBQUduQyxFQUFFLENBQUNNLEtBQUgsQ0FBUztBQUN2QkMsRUFBQUEsSUFBSSxFQUFFLFdBRGlCO0FBRXZCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsSUFBSSxFQUFFLFdBREk7QUFFVlEsSUFBQUEsWUFBWSxFQUFFO0FBQ1pOLE1BQUFBLFdBQVcsRUFBRSxjQUREO0FBRVpDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGRztBQUdaLGlCQUFTLEVBSEc7QUFJWkgsTUFBQUEsWUFBWSxFQUFFLElBSkY7QUFLWkMsTUFBQUEsT0FBTyxFQUFFO0FBTEcsS0FGSjtBQVNWc0IsSUFBQUEsV0FBVyxFQUFFO0FBQ1h6QixNQUFBQSxXQUFXLEVBQUUsYUFERjtBQUVYQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRkU7QUFHWCxpQkFBUyxDQUhFO0FBSVhOLE1BQUFBLFlBQVksRUFBRSxJQUpIO0FBS1hDLE1BQUFBLE9BQU8sRUFBRTtBQUxFO0FBVEgsR0FGVztBQW9CdkJjLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBdEJzQixDQUFULENBQWhCLEVBeUJBOztBQUNBLElBQUlTLFVBQVUsR0FBR3JDLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsWUFEa0I7QUFFeEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWOEIsSUFBQUEsVUFBVSxFQUFFO0FBQ1YzQixNQUFBQSxXQUFXLEVBQUUsWUFESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRkM7QUFHVixpQkFBUyxFQUhDO0FBSVZILE1BQUFBLFlBQVksRUFBRSxJQUpKO0FBS1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxDLEtBREY7QUFRVnlCLElBQUFBLFNBQVMsRUFBRTtBQUNUNUIsTUFBQUEsV0FBVyxFQUFFLFdBREo7QUFFVEMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZBO0FBR1QsaUJBQVMsRUFIQTtBQUlUSCxNQUFBQSxZQUFZLEVBQUUsSUFKTDtBQUtUQyxNQUFBQSxPQUFPLEVBQUU7QUFMQSxLQVJEO0FBZVYwQixJQUFBQSxRQUFRLEVBQUU7QUFDUjdCLE1BQUFBLFdBQVcsRUFBRSxVQURMO0FBRVIsaUJBQVMsQ0FGRDtBQUdSQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BSEQ7QUFJUk4sTUFBQUEsWUFBWSxFQUFFLElBSk47QUFLUkMsTUFBQUEsT0FBTyxFQUFFO0FBTEQsS0FmQTtBQXNCVjJCLElBQUFBLEtBQUssRUFBRTtBQUNMOUIsTUFBQUEsV0FBVyxFQUFFLE9BRFI7QUFFTCxpQkFBUyxLQUZKO0FBR0xVLE1BQUFBLElBQUksRUFBRXJCLEVBQUUsQ0FBQ3NCLE9BSEo7QUFJTFQsTUFBQUEsWUFBWSxFQUFFLElBSlQ7QUFLTEMsTUFBQUEsT0FBTyxFQUFFO0FBTEosS0F0Qkc7QUE2QlY0QixJQUFBQSxZQUFZLEVBQUU7QUFDWi9CLE1BQUFBLFdBQVcsRUFBRSxVQUREO0FBRVpDLE1BQUFBLElBQUksRUFBRSxDQUFDUCxZQUFELENBRk07QUFHWixpQkFBUyxFQUhHO0FBSVpRLE1BQUFBLFlBQVksRUFBRSxJQUpGO0FBS1pDLE1BQUFBLE9BQU8sRUFBRTtBQUxHLEtBN0JKO0FBb0NWNkIsSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJoQyxNQUFBQSxXQUFXLEVBQUUsbUJBREk7QUFFakJDLE1BQUFBLElBQUksRUFBRWlCLHFCQUZXO0FBR2pCLGlCQUFTLElBSFE7QUFJakJoQixNQUFBQSxZQUFZLEVBQUUsSUFKRztBQUtqQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFEsS0FwQ1Q7QUEyQ1Y4QixJQUFBQSxlQUFlLEVBQUU7QUFDZmpDLE1BQUFBLFdBQVcsRUFBRSxpQkFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRk07QUFHZixpQkFBUyxDQUhNO0FBSWZOLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNLEtBM0NQO0FBa0RWK0IsSUFBQUEsb0JBQW9CLEVBQUU7QUFDcEJsQyxNQUFBQSxXQUFXLEVBQUUsc0JBRE87QUFFcEJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGVztBQUdwQixpQkFBUyxDQUhXO0FBSXBCTixNQUFBQSxZQUFZLEVBQUUsSUFKTTtBQUtwQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFcsS0FsRFo7QUF5RFZnQyxJQUFBQSxvQkFBb0IsRUFBRTtBQUNwQm5DLE1BQUFBLFdBQVcsRUFBRSxzQkFETztBQUVwQkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZXO0FBR3BCLGlCQUFTLENBSFc7QUFJcEJOLE1BQUFBLFlBQVksRUFBRSxJQUpNO0FBS3BCQyxNQUFBQSxPQUFPLEVBQUU7QUFMVyxLQXpEWjtBQWdFVmlDLElBQUFBLFVBQVUsRUFBRTtBQUNWcEMsTUFBQUEsV0FBVyxFQUFFLFFBREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFLENBQUN1QixTQUFELENBRkk7QUFHVixpQkFBUyxFQUhDO0FBSVZ0QixNQUFBQSxZQUFZLEVBQUUsSUFKSjtBQUtWQyxNQUFBQSxPQUFPLEVBQUU7QUFMQyxLQWhFRjtBQXVFVmtDLElBQUFBLElBQUksRUFBRTtBQUNKckMsTUFBQUEsV0FBVyxFQUFFLFlBRFQ7QUFFSixpQkFBUyxDQUZMO0FBR0pDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FITDtBQUlKTixNQUFBQSxZQUFZLEVBQUUsSUFKVjtBQUtKQyxNQUFBQSxPQUFPLEVBQUU7QUFMTCxLQXZFSTtBQThFVm1DLElBQUFBLFNBQVMsRUFBRTtBQUNUdEMsTUFBQUEsV0FBVyxFQUFFLFdBREo7QUFFVCxpQkFBUyxDQUZBO0FBR1RDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FIQTtBQUlUTixNQUFBQSxZQUFZLEVBQUUsSUFKTDtBQUtUQyxNQUFBQSxPQUFPLEVBQUU7QUFMQSxLQTlFRDtBQXFGVm9DLElBQUFBLFVBQVUsRUFBRTtBQUNWdkMsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVixpQkFBUyxDQUZDO0FBR1ZDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FIQztBQUlWTixNQUFBQSxZQUFZLEVBQUUsSUFKSjtBQUtWQyxNQUFBQSxPQUFPLEVBQUU7QUFMQyxLQXJGRjtBQTRGVlksSUFBQUEsU0FBUyxFQUFFO0FBQ1RmLE1BQUFBLFdBQVcsRUFBRSxXQURKO0FBRVQsaUJBQVMsS0FGQTtBQUdUQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BSEE7QUFJVFQsTUFBQUEsWUFBWSxFQUFFLElBSkw7QUFLVEMsTUFBQUEsT0FBTyxFQUFFO0FBTEEsS0E1RkQ7QUFtR1ZhLElBQUFBLFVBQVUsRUFBRTtBQUNWaEIsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVixpQkFBUyxDQUZDO0FBR1ZDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FIQztBQUlWTixNQUFBQSxZQUFZLEVBQUUsSUFKSjtBQUtWQyxNQUFBQSxPQUFPLEVBQUU7QUFMQyxLQW5HRjtBQTBHVnFDLElBQUFBLGVBQWUsRUFBRTtBQUNmeEMsTUFBQUEsV0FBVyxFQUFFLGlCQURFO0FBRWYsaUJBQVMsQ0FGTTtBQUdmQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BSE07QUFJZk4sTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0ExR1A7QUFpSFZzQyxJQUFBQSxZQUFZLEVBQUU7QUFDWnpDLE1BQUFBLFdBQVcsRUFBRSxjQUREO0FBRVosaUJBQVMsS0FGRztBQUdaQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BSEc7QUFJWlQsTUFBQUEsWUFBWSxFQUFFLElBSkY7QUFLWkMsTUFBQUEsT0FBTyxFQUFFO0FBTEcsS0FqSEo7QUF3SFZ1QyxJQUFBQSxVQUFVLEVBQUU7QUFDVjFDLE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVYsaUJBQVMsS0FGQztBQUdWQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BSEM7QUFJVlQsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0F4SEY7QUErSFZ3QyxJQUFBQSxjQUFjLEVBQUU7QUFDZDNDLE1BQUFBLFdBQVcsRUFBRSxnQkFEQztBQUVkLGlCQUFTLENBRks7QUFHZEMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUhLO0FBSWROLE1BQUFBLFlBQVksRUFBRSxJQUpBO0FBS2RDLE1BQUFBLE9BQU8sRUFBRTtBQUxLLEtBL0hOO0FBc0lWeUMsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEI1QyxNQUFBQSxXQUFXLEVBQUUsb0JBREs7QUFFbEIsaUJBQVMsS0FGUztBQUdsQkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUhTO0FBSWxCVCxNQUFBQSxZQUFZLEVBQUUsSUFKSTtBQUtsQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFMsS0F0SVY7QUE2SVYwQyxJQUFBQSxpQkFBaUIsRUFBRTtBQUNqQjdDLE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQixpQkFBUyxDQUZRO0FBR2pCQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BSFE7QUFJakJOLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQTdJVDtBQW9KVjJDLElBQUFBLHNCQUFzQixFQUFFO0FBQ3RCOUMsTUFBQUEsV0FBVyxFQUFFLHdCQURTO0FBRXRCLGlCQUFTLEtBRmE7QUFHdEJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FIYTtBQUl0QlQsTUFBQUEsWUFBWSxFQUFFO0FBSlEsS0FwSmQ7QUEwSlY2QyxJQUFBQSxjQUFjLEVBQUU7QUFDZC9DLE1BQUFBLFdBQVcsRUFBRSxnQkFEQztBQUVkQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRks7QUFHZCxpQkFBUyxLQUhLO0FBSWRULE1BQUFBLFlBQVksRUFBRTtBQUpBLEtBMUpOO0FBZ0tWOEMsSUFBQUEsVUFBVSxFQUFFO0FBQ1ZoRCxNQUFBQSxXQUFXLEVBQUUsWUFESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRkM7QUFHVixpQkFBUyxDQUhDO0FBSVZOLE1BQUFBLFlBQVksRUFBRTtBQUpKLEtBaEtGO0FBc0tWK0MsSUFBQUEsV0FBVyxFQUFFO0FBQ1hqRCxNQUFBQSxXQUFXLEVBQUUsYUFERjtBQUVYQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRkU7QUFHWCxpQkFBUyxDQUhFO0FBSVhOLE1BQUFBLFlBQVksRUFBRTtBQUpILEtBdEtIO0FBNEtWZ0QsSUFBQUEsV0FBVyxFQUFFO0FBQ1hsRCxNQUFBQSxXQUFXLEVBQUUsYUFERjtBQUVYQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRkU7QUFHWCxpQkFBUyxDQUhFO0FBSVhOLE1BQUFBLFlBQVksRUFBRTtBQUpILEtBNUtIO0FBa0xWaUQsSUFBQUEsYUFBYSxFQUFFO0FBQ2JuRCxNQUFBQSxXQUFXLEVBQUUsZUFEQTtBQUViQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRkk7QUFHYixpQkFBUyxDQUhJO0FBSWJOLE1BQUFBLFlBQVksRUFBRTtBQUpELEtBbExMO0FBd0xWa0QsSUFBQUEsZ0JBQWdCLEVBQUU7QUFDaEJwRCxNQUFBQSxXQUFXLEVBQUUsa0JBREc7QUFFaEJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGTztBQUdoQixpQkFBUyxDQUhPO0FBSWhCTixNQUFBQSxZQUFZLEVBQUU7QUFKRSxLQXhMUjtBQThMVm1ELElBQUFBLGVBQWUsRUFBRTtBQUNmckQsTUFBQUEsV0FBVyxFQUFFLGlCQURFO0FBRWZDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGTTtBQUdmLGlCQUFTLENBSE07QUFJZk4sTUFBQUEsWUFBWSxFQUFFO0FBSkMsS0E5TFA7QUFvTVZvRCxJQUFBQSxRQUFRLEVBQUU7QUFDUnRELE1BQUFBLFdBQVcsRUFBRSxVQURMO0FBRVJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGRDtBQUdSLGlCQUFTLEtBSEQ7QUFJUlQsTUFBQUEsWUFBWSxFQUFFO0FBSk4sS0FwTUE7QUEwTVZxRCxJQUFBQSxRQUFRLEVBQUU7QUFDUnZELE1BQUFBLFdBQVcsRUFBRSxVQURMO0FBRVJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGRDtBQUdSLGlCQUFTLElBSEQ7QUFJUlQsTUFBQUEsWUFBWSxFQUFFO0FBSk47QUExTUEsR0FGWTtBQW1OeEJlLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBck51QixDQUFULENBQWpCLEVBdU5BO0FBRUE7QUFDQTs7QUFDQSxJQUFJdUMsV0FBVyxHQUFHLENBQWxCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxRQUFRLEdBQUcsQ0FBZjtBQUNBLElBQUlDLFVBQVUsR0FBRyxLQUFqQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsY0FBYyxHQUFHLEVBQXJCO0FBQ0EsSUFBSUMscUJBQXFCLEdBQUcsRUFBNUI7QUFFQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkIsRUFFQTs7QUFDQSxJQUFJQyxrQkFBa0IsR0FBRyxLQUF6QjtBQUNBLElBQUlDLGFBQWEsR0FBRyxLQUFwQjtBQUNBLElBQUlDLGVBQWUsR0FBRyxLQUF0QixFQUE2Qjs7QUFDN0IsSUFBSUMsaUJBQWlCLEdBQUcsS0FBeEIsRUFBK0I7O0FBQy9CLElBQUlDLGlCQUFpQixHQUFHLEtBQXhCLEVBQStCOztBQUMvQixJQUFJQyxpQkFBaUIsR0FBRyxLQUF4QjtBQUNBLElBQUlDLGNBQWMsR0FBRyxLQUFyQjtBQUVBLElBQUlDLFVBQVUsR0FBRyxDQUFqQjtBQUNBLElBQUlDLFVBQVUsR0FBRyxLQUFqQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLENBQUMsQ0FBeEI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsQ0FBQyx3Q0FBRCxFQUEyQywwQkFBM0MsRUFBdUUsMkJBQXZFLEVBQW9HLHdDQUFwRyxFQUE4SSxnREFBOUksQ0FBbkI7QUFFQSxJQUFJQyxvQkFBb0IsR0FBRyxJQUEzQjtBQUVBLElBQUlDLFdBQVcsR0FBR3hGLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ3pCQyxFQUFBQSxJQUFJLEVBQUUsYUFEbUI7QUFFekIsYUFBU1AsRUFBRSxDQUFDeUYsU0FGYTtBQUd6QmpGLEVBQUFBLFVBQVUsRUFBRTtBQUNWa0YsSUFBQUEsY0FBYyxFQUFFO0FBQ2QsaUJBQVMsRUFESztBQUVkOUUsTUFBQUEsSUFBSSxFQUFFLENBQUN5QixVQUFELENBRlE7QUFHZHhCLE1BQUFBLFlBQVksRUFBRSxJQUhBO0FBSWRDLE1BQUFBLE9BQU8sRUFBRTtBQUpLLEtBRE47QUFPVjZFLElBQUFBLFdBQVcsRUFBRTtBQUNYLGlCQUFTLEVBREU7QUFFWC9FLE1BQUFBLElBQUksRUFBRSxDQUFDeUIsVUFBRCxDQUZLO0FBR1h4QixNQUFBQSxZQUFZLEVBQUUsSUFISDtBQUlYQyxNQUFBQSxPQUFPLEVBQUU7QUFKRSxLQVBIO0FBYVY4RSxJQUFBQSxVQUFVLEVBQUU7QUFDVixpQkFBUyxJQURDO0FBRVZoRixNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQzZGLElBRkM7QUFHVmhGLE1BQUFBLFlBQVksRUFBRSxJQUhKO0FBSVZDLE1BQUFBLE9BQU8sRUFBRTtBQUpDLEtBYkY7QUFtQlZnRixJQUFBQSxVQUFVLEVBQUU7QUFDVixpQkFBUyxJQURDO0FBRVZsRixNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQzZGLElBRkM7QUFHVmhGLE1BQUFBLFlBQVksRUFBRSxJQUhKO0FBSVZDLE1BQUFBLE9BQU8sRUFBRTtBQUpDLEtBbkJGO0FBeUJWaUYsSUFBQUEsV0FBVyxFQUFFO0FBQ1gsaUJBQVMsRUFERTtBQUVYbkYsTUFBQUEsSUFBSSxFQUFFLENBQUNaLEVBQUUsQ0FBQzZGLElBQUosQ0FGSztBQUdYaEYsTUFBQUEsWUFBWSxFQUFFLElBSEg7QUFJWEMsTUFBQUEsT0FBTyxFQUFFO0FBSkUsS0F6Qkg7QUErQlZrRixJQUFBQSxjQUFjLEVBQUU7QUFDZCxpQkFBUyxFQURLO0FBRWRwRixNQUFBQSxJQUFJLEVBQUUsQ0FBQ1osRUFBRSxDQUFDNkYsSUFBSixDQUZRO0FBR2RoRixNQUFBQSxZQUFZLEVBQUUsSUFIQTtBQUlkQyxNQUFBQSxPQUFPLEVBQUU7QUFKSyxLQS9CTjtBQXFDVm1GLElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCLGlCQUFTLEVBRFM7QUFFbEJyRixNQUFBQSxJQUFJLEVBQUUsQ0FBQ1osRUFBRSxDQUFDNkYsSUFBSixDQUZZO0FBR2xCaEYsTUFBQUEsWUFBWSxFQUFFLElBSEk7QUFJbEJDLE1BQUFBLE9BQU8sRUFBRTtBQUpTLEtBckNWO0FBMkNWb0YsSUFBQUEsWUFBWSxFQUFFO0FBQ1osaUJBQVMsQ0FERztBQUVadEYsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZHO0FBR1pOLE1BQUFBLFlBQVksRUFBRSxJQUhGO0FBSVpDLE1BQUFBLE9BQU8sRUFBRTtBQUpHO0FBM0NKLEdBSGE7QUFzRHpCcUYsRUFBQUEsT0FBTyxFQUFFO0FBQ1A5RCxJQUFBQSxVQUFVLEVBQUVBLFVBREw7QUFFUGhDLElBQUFBLFlBQVksRUFBRUEsWUFGUDtBQUdQd0IsSUFBQUEscUJBQXFCLEVBQUVBLHFCQUhoQjtBQUlQOUIsSUFBQUEsZ0JBQWdCLEVBQUVBLGdCQUpYO0FBS1BxRyxJQUFBQSxRQUFRLEVBQUU7QUFMSCxHQXREZ0I7QUE4RHpCQyxFQUFBQSxhQTlEeUIseUJBOERYQyxNQTlEVyxFQThESDtBQUNwQjNHLElBQUFBLFVBQVUsR0FBRzJHLE1BQWI7QUFDRCxHQWhFd0I7QUFrRXpCQyxFQUFBQSxpQkFsRXlCLCtCQWtFTDtBQUNsQnpILElBQUFBLFdBQVcsR0FBRyxFQUFkO0FBQ0FDLElBQUFBLFdBQVcsR0FBRyxFQUFkO0FBQ0FDLElBQUFBLGlCQUFpQixHQUFHLENBQUMsQ0FBckI7QUFDQUMsSUFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxDQUFyQjtBQUNBVSxJQUFBQSxVQUFVLEdBQUcsS0FBYjtBQUNBVCxJQUFBQSxpQkFBaUIsR0FBRyxDQUFDLENBQXJCO0FBQ0FDLElBQUFBLGlCQUFpQixHQUFHLENBQUMsQ0FBckI7QUFFQUMsSUFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxDQUFyQjtBQUNBUyxJQUFBQSxhQUFhLEdBQUcsS0FBaEI7QUFDQVIsSUFBQUEsWUFBWSxHQUFHLEtBQWY7QUFDQUMsSUFBQUEsV0FBVyxHQUFHLEtBQWQ7QUFDQVEsSUFBQUEsYUFBYSxHQUFHLENBQWhCO0FBQ0FxRSxJQUFBQSxXQUFXLEdBQUcsQ0FBZDtBQUNBQyxJQUFBQSxRQUFRLEdBQUcsQ0FBWDtBQUNBQyxJQUFBQSxRQUFRLEdBQUcsQ0FBWDtBQUNBQyxJQUFBQSxVQUFVLEdBQUcsS0FBYjtBQUNBQyxJQUFBQSx3QkFBd0IsR0FBRyxJQUEzQjtBQUNBQyxJQUFBQSxjQUFjLEdBQUcsRUFBakI7QUFDQUMsSUFBQUEscUJBQXFCLEdBQUcsRUFBeEI7QUFDQTdFLElBQUFBLGtCQUFrQixHQUFHLElBQXJCO0FBQ0E4RSxJQUFBQSxZQUFZLEdBQUcsS0FBZjtBQUNBQyxJQUFBQSxZQUFZLEdBQUcsS0FBZjtBQUNBbkYsSUFBQUEsbUJBQW1CLEdBQUcsQ0FBdEI7QUFDQUMsSUFBQUEsbUJBQW1CLEdBQUcsQ0FBdEIsQ0F6QmtCLENBMkJsQjs7QUFDQW1GLElBQUFBLGtCQUFrQixHQUFHLEtBQXJCO0FBQ0FDLElBQUFBLGFBQWEsR0FBRyxLQUFoQjtBQUNBQyxJQUFBQSxlQUFlLEdBQUcsS0FBbEIsQ0E5QmtCLENBOEJPOztBQUN6QkMsSUFBQUEsaUJBQWlCLEdBQUcsS0FBcEIsQ0EvQmtCLENBK0JTOztBQUMzQkMsSUFBQUEsaUJBQWlCLEdBQUcsS0FBcEIsQ0FoQ2tCLENBZ0NTOztBQUMzQkMsSUFBQUEsaUJBQWlCLEdBQUcsS0FBcEI7QUFDQUMsSUFBQUEsY0FBYyxHQUFHLEtBQWpCO0FBRUFDLElBQUFBLFVBQVUsR0FBRyxDQUFiO0FBQ0FDLElBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0FDLElBQUFBLGdCQUFnQixHQUFHLENBQUMsQ0FBcEI7QUFDQUMsSUFBQUEsWUFBWSxHQUFHLENBQUMsd0NBQUQsRUFBMkMsMEJBQTNDLEVBQXVFLDJCQUF2RSxFQUFvRyx3Q0FBcEcsRUFBOEksZ0RBQTlJLENBQWY7QUFFQUMsSUFBQUEsb0JBQW9CLEdBQUcsSUFBdkI7QUFDQWhHLElBQUFBLG1CQUFtQixHQUFHLEtBQXRCO0FBQ0FHLElBQUFBLG1CQUFtQixHQUFHLEtBQXRCO0FBQ0QsR0E5R3dCO0FBZ0h6QjhHLEVBQUFBLGNBaEh5QiwwQkFnSFZDLElBaEhVLEVBZ0hKO0FBQ25CLFFBQUk1SCxPQUFKLEVBQWE7QUFDWEMsTUFBQUEsV0FBVyxHQUFHMkgsSUFBZDtBQUNEO0FBQ0YsR0FwSHdCO0FBc0h6QkMsRUFBQUEsY0F0SHlCLDBCQXNIVkQsSUF0SFUsRUFzSEo7QUFDbkIsUUFBSTVILE9BQUosRUFBYTtBQUNYRSxNQUFBQSxXQUFXLEdBQUcwSCxJQUFkO0FBQ0Q7QUFDRixHQTFId0I7QUE0SHpCOztBQUVBOzs7QUFHQUUsRUFBQUEsTUFqSXlCLG9CQWlJaEI7QUFDUCxTQUFLSixpQkFBTDtBQUNBZixJQUFBQSxXQUFXLENBQUNZLFFBQVosR0FBdUIsSUFBdkI7QUFDQSxTQUFLUSxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixLQUFyQjtBQUNBckMsSUFBQUEsY0FBYyxHQUFHLEVBQWpCO0FBQ0EsU0FBS3NDLGVBQUw7QUFDQSxTQUFLWixZQUFMLEdBQW9CM0Isd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEQyxlQUE5RCxFQUFwQjtBQUNBLFNBQUtDLGdCQUFMO0FBRUEsU0FBS0MsZUFBTCxHQUF1QixDQUF2QjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0FuQyxJQUFBQSxpQkFBaUIsR0FBRyxLQUFwQjtBQUNELEdBL0l3Qjs7QUFpSnpCOzs7QUFHQTZCLEVBQUFBLGVBcEp5Qiw2QkFvSlA7QUFDaEIsUUFBSSxDQUFDdkMsd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFJLElBQTdELEVBQW1FQSx3QkFBd0IsR0FBRzhDLE9BQU8sQ0FBQywwQkFBRCxDQUFsQztBQUNwRSxHQXRKd0I7O0FBd0p6Qjs7O0FBR0FKLEVBQUFBLGdCQTNKeUIsOEJBMkpOO0FBQ2pCLFNBQUtLLE1BQUwsR0FBYyxLQUFLeEIsVUFBTCxDQUFnQnlCLFlBQWhCLENBQTZCdkgsRUFBRSxDQUFDc0gsTUFBaEMsQ0FBZDtBQUNBLFNBQUtFLGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxTQUFLOUIsY0FBTCxHQUFzQixFQUF0QjtBQUNBdkIsSUFBQUEsV0FBVyxHQUFHLENBQWQ7QUFDQUMsSUFBQUEsUUFBUSxHQUFHLENBQVg7QUFDQUMsSUFBQUEsUUFBUSxHQUFHLENBQVg7O0FBRUEsUUFBSSxLQUFLNkIsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBO0FBQ0EsVUFBSTNCLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RFUsYUFBOUQsTUFBaUYsSUFBckYsRUFBMkY7QUFDekY7QUFFQTtBQUNBLFlBQUlsRCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOERXLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRkMsaUJBQXRGLENBQXdHLGNBQXhHLEtBQTJILElBQS9ILEVBQXFJO0FBQ25JckQsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwREMsb0NBQTFELENBQStGLElBQS9GO0FBQ0EsY0FBSUMsT0FBTyxHQUFHeEQsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEVyxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0ZDLGlCQUF0RixDQUF3RyxnQkFBeEcsQ0FBZDtBQUNBLGVBQUtsQyxjQUFMLEdBQXNCcUMsT0FBdEI7QUFDQXhELFVBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RGlCLFVBQTlELEdBQTJFLEtBQUt0QyxjQUFMLENBQW9CdUMsTUFBL0Y7QUFDQSxlQUFLQywyQkFBTDtBQUNBLGVBQUt0QixVQUFMLEdBQWtCckMsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEVyxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0ZDLGlCQUF0RixDQUF3RyxZQUF4RyxDQUFsQjtBQUNBLGVBQUtPLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsS0FBS3ZCLFVBQTdCLEVBUG1JLENBUW5JO0FBQ0E7QUFDRCxTQVZELE1BVU87QUFDTHJDLFVBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RGlCLFVBQTlELEdBQTJFLENBQTNFLENBREssQ0FFTDs7QUFDQXpELFVBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMERDLG9DQUExRCxDQUErRixJQUEvRjtBQUNBdkQsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRE8sMEJBQTFEO0FBQ0Q7QUFDRixPQXBCRCxNQW9CTztBQUNMN0QsUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRFEsOEJBQTFELENBQXlGLElBQXpGLEVBQStGLEtBQS9GLEVBQXNHLEtBQUtuQyxZQUEzRztBQUNEO0FBQ0YsS0ExQkQsTUEwQk8sSUFBSSxLQUFLQSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDO0FBQ0EzQixNQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBEUSw4QkFBMUQsQ0FBeUYsSUFBekYsRUFBK0YsS0FBL0YsRUFBc0csS0FBS25DLFlBQTNHO0FBQ0Q7QUFDRixHQWpNd0I7QUFtTXpCO0FBQ0FvQyxFQUFBQSxhQXBNeUIsMkJBb01UO0FBQ2QsV0FBTyxLQUFLMUIsVUFBWjtBQUNELEdBdE13Qjs7QUF3TXpCOzs7QUFHQTJCLEVBQUFBLFVBM015Qix3QkEyTVo7QUFDWCxRQUFJQyxPQUFPLEdBQUcsQ0FBZDtBQUNBLFFBQUlDLE1BQU0sR0FBR2xFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUExRztBQUNBLFFBQUlDLFVBQVUsR0FBRyxLQUFLbkQsY0FBdEI7O0FBRUEsU0FBSyxJQUFJb0QsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdELFVBQVUsQ0FBQ1osTUFBdkMsRUFBK0NhLEtBQUssRUFBcEQsRUFBd0Q7QUFDdEQsVUFBSUwsTUFBTSxDQUFDbEcsU0FBUCxJQUFvQnNHLFVBQVUsQ0FBQ0MsS0FBRCxDQUFWLENBQWtCdkcsU0FBMUMsRUFBcUQ7QUFDbkRpRyxRQUFBQSxPQUFPLEdBQUdNLEtBQVY7QUFDQTtBQUNEO0FBQ0Y7O0FBRUQsV0FBT04sT0FBUDtBQUNELEdBeE53QjtBQXlOekI7QUFFQTtBQUVBTixFQUFBQSwyQkE3TnlCLHlDQTZOSztBQUM1QixRQUFJSCxPQUFPLEdBQUd4RCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOERXLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRkMsaUJBQXRGLENBQXdHLGdCQUF4RyxDQUFkO0FBQ0EsU0FBS2xDLGNBQUwsR0FBc0JxQyxPQUF0QjtBQUNBLFNBQUtnQix3QkFBTCxDQUE4QixDQUE5QjtBQUNBeEUsSUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEaUIsVUFBOUQsR0FBMkUsS0FBS3RDLGNBQUwsQ0FBb0J1QyxNQUEvRjtBQUNBLFNBQUtlLGtCQUFMO0FBQ0EsU0FBS0MsaUJBQUw7QUFDQTFFLElBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMERxQiwrQkFBMUQ7QUFFQUMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQVo7O0FBQ0EsU0FBSyxJQUFJTixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLcEQsY0FBTCxDQUFvQnVDLE1BQWhELEVBQXdEYSxLQUFLLEVBQTdELEVBQWlFO0FBQy9ELFVBQUksS0FBS3BELGNBQUwsQ0FBb0JvRCxLQUFwQixFQUEyQnRGLGlCQUEzQixHQUErQyxDQUEvQyxJQUFvRCxLQUFLa0MsY0FBTCxDQUFvQm9ELEtBQXBCLEVBQTJCckYsc0JBQTNCLElBQXFELElBQXpHLElBQWlILENBQUMsS0FBS2lDLGNBQUwsQ0FBb0JvRCxLQUFwQixFQUEyQnBGLGNBQWpKLEVBQWlLO0FBQy9KLFlBQUkyRixNQUFNLEdBQUdySixFQUFFLENBQUNzSixJQUFILENBQVEvRSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRCxLQUFLOUQsY0FBTCxDQUFvQm9ELEtBQXBCLEVBQTJCdEYsaUJBQXJGLEVBQXdHaUcsaUJBQXhHLENBQTBIQyxRQUExSCxDQUFtSUMsQ0FBM0ksRUFBOElwRix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRCxLQUFLOUQsY0FBTCxDQUFvQm9ELEtBQXBCLEVBQTJCdEYsaUJBQXJGLEVBQXdHaUcsaUJBQXhHLENBQTBIQyxRQUExSCxDQUFtSUUsQ0FBalIsQ0FBYjs7QUFDQSxhQUFLNUQsY0FBTCxDQUFvQjhDLEtBQXBCLEVBQTJCZSxXQUEzQixDQUF1Q1IsTUFBTSxDQUFDTSxDQUE5QyxFQUFpRE4sTUFBTSxDQUFDTyxDQUF4RDtBQUNBVCxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaO0FBQ0QsT0FKRCxNQUlPO0FBQ0xELFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFxQixLQUFLMUQsY0FBTCxDQUFvQm9ELEtBQXBCLEVBQTJCdEYsaUJBQTVEO0FBQ0EyRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwrQkFBK0IsS0FBSzFELGNBQUwsQ0FBb0JvRCxLQUFwQixFQUEyQnJGLHNCQUF0RTtBQUNBMEYsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQXFCLEtBQUsxRCxjQUFMLENBQW9Cb0QsS0FBcEIsRUFBMkJwRixjQUE1RDtBQUNEOztBQUVELFVBQUksS0FBS2dDLGNBQUwsQ0FBb0JvRCxLQUFwQixFQUEyQnBGLGNBQS9CLEVBQStDO0FBQzdDLFlBQUlvRyxVQUFVLEdBQUd2Rix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZCLE1BQTFELEdBQW1FLENBQXBGOztBQUNBLFlBQUlvQixNQUFNLEdBQUdySixFQUFFLENBQUNzSixJQUFILENBQVEvRSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRE0sVUFBMUQsRUFBc0VMLGlCQUF0RSxDQUF3RkMsUUFBeEYsQ0FBaUdDLENBQXpHLEVBQTRHcEYsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERNLFVBQTFELEVBQXNFTCxpQkFBdEUsQ0FBd0ZDLFFBQXhGLENBQWlHRSxDQUE3TSxDQUFiOztBQUNBLGFBQUs1RCxjQUFMLENBQW9COEMsS0FBcEIsRUFBMkJlLFdBQTNCLENBQXVDUixNQUFNLENBQUNNLENBQTlDLEVBQWlETixNQUFNLENBQUNPLENBQXhEO0FBQ0FULFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDRDtBQUNGLEtBM0IyQixDQTZCNUI7OztBQUVBLFNBQUssSUFBSU4sT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUd2RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOERpQixVQUExRixFQUFzR2MsT0FBSyxFQUEzRyxFQUErRztBQUM3RyxXQUFLOUMsY0FBTCxDQUFvQjhDLE9BQXBCLEVBQTJCaUIsTUFBM0IsR0FBb0MsSUFBcEM7QUFDRDtBQUNGLEdBL1B3QjtBQWlRekJDLEVBQUFBLHdDQWpReUIsc0RBaVFrQjtBQUN6QyxRQUFJQyxxQkFBcUIsR0FBRzFGLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RFcsWUFBOUQsR0FBNkV3QyxnQkFBN0UsRUFBNUI7O0FBQ0EsUUFBSTFGLGNBQWMsQ0FBQ3lELE1BQWYsSUFBeUJnQyxxQkFBN0IsRUFBb0Q7QUFDbER6RixNQUFBQSxjQUFjLEdBQUcsRUFBakI7QUFDQSxXQUFLcUMsYUFBTCxHQUFxQixJQUFyQjs7QUFFQSxVQUFJLEtBQUtuQixjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3JFLFNBQXJDLElBQWtEZ0Msd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEMkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RmEsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLGFBQUt6RSxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3BELGlCQUFyQyxHQUF5RFcsV0FBekQ7QUFDQUksUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEMkIsV0FBOUQsR0FBNEUwQixpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUsxRSxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixDQUFuSDtBQUNBLGFBQUt5RCxVQUFMO0FBQ0FsQixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTdFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEVBQVo7QUFDQVMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQStCLEtBQUsxRCxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3RFLFVBQWhGO0FBQ0Q7QUFDRjtBQUNGLEdBL1F3QjtBQWlSekI7QUFFQTs7QUFFQTs7O0FBR0FnSSxFQUFBQSxpQkF4UnlCLDZCQXdSUEMsS0F4Uk8sRUF3UkE7QUFDdkJoRyxJQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDb0UsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE2RUYsS0FBN0U7QUFDRCxHQTFSd0I7QUE0UnpCRyxFQUFBQSxtQkE1UnlCLGlDQTRSSDtBQUNwQkMsSUFBQUEsWUFBWSxDQUFDcEYsb0JBQUQsQ0FBWjtBQUNELEdBOVJ3QjtBQWdTekJxRixFQUFBQSxtQkFoU3lCLGlDQWdTSDtBQUFBOztBQUNwQixRQUFJLEtBQUsxRSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0FpRCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBMEJuRSxpQkFBdEM7O0FBQ0EsVUFBSUEsaUJBQWlCLElBQUksSUFBekIsRUFBK0I7QUFDN0IwRixRQUFBQSxZQUFZLENBQUNwRixvQkFBRCxDQUFaLENBRDZCLENBRTdCOztBQUNBTixRQUFBQSxpQkFBaUIsR0FBRyxLQUFwQjs7QUFDQSxZQUFJLENBQUMsS0FBS21DLGFBQVYsRUFBeUI7QUFDdkIsZUFBS0EsYUFBTCxHQUFxQixJQUFyQjtBQUNBN0MsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMEQsS0FBS3JDLFdBQS9ELEVBQTRFc0MsaUJBQTVFLENBQThGbEMsWUFBOUYsQ0FBMkcsY0FBM0csRUFBMkhzRCxlQUEzSCxDQUEySSxLQUEzSSxFQUFrSixLQUFLM0QsZUFBdko7QUFDRDtBQUNGLE9BUkQsTUFRTztBQUNMM0IsUUFBQUEsb0JBQW9CLEdBQUd1RixVQUFVLENBQUMsWUFBTTtBQUN0QztBQUNBLFVBQUEsS0FBSSxDQUFDRixtQkFBTDtBQUNELFNBSGdDLEVBRzlCLElBSDhCLENBQWpDO0FBSUQ7QUFDRjtBQUNGLEdBblR3QjtBQXFUekJHLEVBQUFBLGdCQXJUeUIsOEJBcVROO0FBQ2pCLFNBQUszRCxhQUFMLEdBQXFCLEtBQXJCO0FBQ0QsR0F2VHdCO0FBeVR6QjRELEVBQUFBLG1CQXpUeUIsK0JBeVRMVCxLQXpUSyxFQXlURTtBQUN6QixTQUFLekQsZUFBTDtBQUNBcUMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQVo7QUFDQUQsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVltQixLQUFaO0FBRUEsUUFBSVUsVUFBVSxHQUFHVixLQUFLLENBQUNXLFVBQXZCO0FBQ0EsUUFBSUMsT0FBTyxHQUFHWixLQUFLLENBQUNZLE9BQXBCO0FBRUEsU0FBS2pFLGVBQUwsR0FBdUIrRCxVQUF2QjtBQUNBLFNBQUs5RCxXQUFMLEdBQW1CZ0UsT0FBbkI7O0FBRUEsUUFBSSxLQUFLakYsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixVQUFJLEtBQUtSLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDckUsU0FBckMsSUFBa0RnQyx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOEQyQixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGYSxJQUE3RixDQUFrR1csTUFBeEosRUFDRTVGLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NtRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEMkIsT0FBMUQsRUFBbUUxQixpQkFBbkUsQ0FBcUZsQyxZQUFyRixDQUFrRyxjQUFsRyxFQUFrSHNELGVBQWxILENBQWtJLElBQWxJLEVBQXdJSSxVQUF4SSxFQURGLEtBRUtoRyxpQkFBaUIsR0FBRyxJQUFwQjtBQUNOLEtBSkQsTUFJTyxJQUFJLEtBQUtpQixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDLFVBQUksS0FBS1IsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNuRSxLQUFyQyxJQUE4QyxLQUFsRCxFQUF5RDhCLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NtRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEMkIsT0FBMUQsRUFBbUUxQixpQkFBbkUsQ0FBcUZsQyxZQUFyRixDQUFrRyxjQUFsRyxFQUFrSHNELGVBQWxILENBQWtJLElBQWxJLEVBQXdJSSxVQUF4SSxFQUF6RCxLQUNLMUcsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMEQyQixPQUExRCxFQUFtRTFCLGlCQUFuRSxDQUFxRmxDLFlBQXJGLENBQWtHLGNBQWxHLEVBQWtIc0QsZUFBbEgsQ0FBa0ksS0FBbEksRUFBeUlJLFVBQXpJLEVBQXFKLElBQXJKO0FBQ04sS0FsQndCLENBb0J6Qjs7QUFDRCxHQTlVd0I7O0FBZ1Z6Qjs7O0FBR0FHLEVBQUFBLHNCQW5WeUIsb0NBbVZBO0FBQ3ZCLFFBQUksS0FBS2xGLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBSTNCLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYwQyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsS0FBOUgsRUFBcUk7QUFDbkkvRyxRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDb0UsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE2RWxHLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZhLElBQTdGLENBQWtHVyxNQUEvSztBQUNEO0FBQ0YsS0FKRCxNQUlPLElBQUksS0FBS2pFLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakNpRCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBWjtBQUNBN0UsTUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ29FLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNkUsS0FBSy9FLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDckUsU0FBbEg7QUFDRDtBQUNGLEdBNVZ3QjtBQThWekJnSixFQUFBQSxXQTlWeUIseUJBOFZYO0FBQ1osUUFBSSxLQUFLN0YsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNyRSxTQUFyQyxJQUFrRGdDLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZhLElBQTdGLENBQWtHVyxNQUF4SixFQUFnSztBQUM5SjVGLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFMEIsaUJBQTVFLENBQThGLG1CQUE5RixFQUFtSCxLQUFLMUUsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsQ0FBbkg7QUFDQXJDLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RFcsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGeUMsaUJBQXRGLENBQXdHLGdCQUF4RyxFQUEwSCxLQUFLMUUsY0FBL0gsRUFBK0ksSUFBL0k7QUFDRDtBQUNGLEdBbld3Qjs7QUFxV3pCOzs7QUFHQThGLEVBQUFBLHdCQXhXeUIsb0NBd1dBQyxJQXhXQSxFQXdXTTtBQUM3QixRQUFJLEtBQUt2RixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0EsVUFBSTNCLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYwQyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsS0FBOUgsRUFBcUk7QUFDbkksWUFBSTlHLGNBQWMsQ0FBQ3lELE1BQWYsSUFBeUIsQ0FBN0IsRUFBZ0N6RCxjQUFjLENBQUNrSCxJQUFmLENBQW9CRCxJQUFwQjtBQUVoQyxZQUFJRSxXQUFXLEdBQUduSCxjQUFjLENBQUN5RCxNQUFqQztBQUNBLFlBQUkyRCxPQUFPLEdBQUcsS0FBZDs7QUFDQSxhQUFLLElBQUk5QyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRzZDLFdBQTVCLEVBQXlDN0MsS0FBSyxFQUE5QyxFQUFrRDtBQUNoRCxjQUFJdEUsY0FBYyxDQUFDc0UsS0FBRCxDQUFkLElBQXlCMkMsSUFBN0IsRUFBbUNHLE9BQU8sR0FBRyxJQUFWO0FBQ3BDOztBQUVELFlBQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQ1pwSCxVQUFBQSxjQUFjLENBQUNrSCxJQUFmLENBQW9CRCxJQUFwQjtBQUNEOztBQUVELFlBQUl4QixxQkFBcUIsR0FBRyxDQUE1Qjs7QUFFQSxhQUFLLElBQUk0QixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtuRyxjQUFMLENBQW9CdUMsTUFBeEMsRUFBZ0Q0RCxDQUFDLEVBQWpELEVBQXFEO0FBQ25ELGNBQUksS0FBS25HLGNBQUwsQ0FBb0JtRyxDQUFwQixFQUF1QjNILFFBQTNCLEVBQXFDK0YscUJBQXFCO0FBQzNEOztBQUVEZCxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBaUI1RSxjQUFjLENBQUN5RCxNQUE1QztBQUNBa0IsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksOEJBQThCYSxxQkFBMUM7O0FBRUEsWUFBSXpGLGNBQWMsQ0FBQ3lELE1BQWYsSUFBeUJnQyxxQkFBN0IsRUFBb0Q7QUFDbER6RixVQUFBQSxjQUFjLEdBQUcsRUFBakI7QUFDQSxlQUFLcUMsYUFBTCxHQUFxQixJQUFyQjs7QUFFQSxjQUFJLEtBQUtuQixjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3JFLFNBQXJDLElBQWtEZ0Msd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEMkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RmEsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLGlCQUFLekUsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNwRCxpQkFBckMsR0FBeURXLFdBQXpELENBRDhKLENBRTlKOztBQUNBLGlCQUFLa0csVUFBTDtBQUNBbEIsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk3RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOEQyQixXQUE5RCxFQUFaO0FBQ0FTLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLCtCQUErQixLQUFLMUQsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUN0RSxVQUFoRjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLEtBckNELE1BcUNPLElBQUksS0FBSzRELFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakMsV0FBS1csYUFBTCxHQUFxQixJQUFyQjtBQUNBLFdBQUtuQixjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3BELGlCQUFyQyxHQUF5RFcsV0FBekQ7QUFDQSxXQUFLa0csVUFBTDtBQUNEO0FBQ0YsR0FuWndCOztBQXFaekI7OztBQUdBQSxFQUFBQSxVQXhaeUIsd0JBd1paO0FBQ1gsUUFBSSxLQUFLbkUsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixXQUFLcUYsV0FBTDtBQUNEOztBQUVELFFBQUksS0FBSzNFLFVBQUwsR0FBa0IsS0FBS2xCLGNBQUwsQ0FBb0J1QyxNQUFwQixHQUE2QixDQUFuRCxFQUFzRCxLQUFLckIsVUFBTCxHQUFrQixLQUFLQSxVQUFMLEdBQWtCLENBQXBDLENBQXRELEtBQ0ssS0FBS0EsVUFBTCxHQUFrQixDQUFsQjtBQUVMckMsSUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ29FLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNkUsS0FBSzdELFVBQWxGO0FBQ0QsR0FqYXdCO0FBbWF6QmtGLEVBQUFBLGVBbmF5Qiw2QkFtYVA7QUFDaEJ0SCxJQUFBQSxjQUFjLEdBQUcsRUFBakI7QUFDQSxTQUFLcUMsYUFBTCxHQUFxQixJQUFyQjtBQUNELEdBdGF3QjtBQXdhekJrRixFQUFBQSxvQkF4YXlCLGtDQXdhRjtBQUFBOztBQUNyQixRQUFJekgsVUFBSixFQUFnQjtBQUNkcUcsTUFBQUEsWUFBWSxDQUFDL0ssa0JBQUQsQ0FBWjtBQUNBQSxNQUFBQSxrQkFBa0IsR0FBR2tMLFVBQVUsQ0FBQyxZQUFNO0FBQ3BDLFFBQUEsTUFBSSxDQUFDaUIsb0JBQUw7QUFDRCxPQUY4QixFQUU1QixJQUY0QixDQUEvQjtBQUdELEtBTEQsTUFLTztBQUNMcEIsTUFBQUEsWUFBWSxDQUFDL0ssa0JBQUQsQ0FBWjtBQUNBLFdBQUt5SyxVQUFMO0FBQ0Q7QUFDRixHQWxid0I7QUFvYnpCMkIsRUFBQUEsZ0JBcGJ5Qiw4QkFvYk47QUFDakIsU0FBSyxJQUFJbEQsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBSy9DLFdBQUwsQ0FBaUJrQyxNQUE3QyxFQUFxRGEsS0FBSyxFQUExRCxFQUE4RDtBQUM1RCxXQUFLL0MsV0FBTCxDQUFpQitDLEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEMEUsd0JBQTdEO0FBQ0Q7QUFDRixHQXhid0I7O0FBMGJ6Qjs7O0FBR0FDLEVBQUFBLFdBN2J5Qix1QkE2YmJDLEtBN2JhLEVBNmJOO0FBQUE7O0FBQ2pCLFFBQUksS0FBS2pHLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBSWtHLFNBQVMsR0FBRzdILHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RHNGLDhCQUE5RCxFQUFoQjs7QUFDQSxVQUFJLENBQUMsS0FBSzNHLGNBQUwsQ0FBb0J5RyxLQUFwQixFQUEyQmpJLFFBQWhDLEVBQTBDO0FBQ3hDLFlBQUlrSSxTQUFKLEVBQWU7QUFDYixlQUFLL0IsVUFBTDtBQUNBO0FBQ0QsU0FIRCxNQUdPO0FBQ0w7QUFDRDtBQUNGO0FBQ0YsS0FYZ0IsQ0FhakI7OztBQUNBLFNBQUsyQixnQkFBTDtBQUNBN0MsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBVytDLEtBQXZCO0FBQ0EsUUFBSUcsY0FBYyxHQUFHLEtBQXJCO0FBQ0F6SCxJQUFBQSxhQUFhLEdBQUcsS0FBaEI7O0FBQ0EsUUFBSVAsVUFBSixFQUFnQjtBQUNkO0FBQ0EsVUFBSUMsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEMkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RjBDLGNBQTdGLENBQTRHQyxVQUE1RyxJQUEwSCxJQUE5SCxFQUFvSTtBQUNsSWhILFFBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0Q7O0FBRUR3RyxNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFlBQUksQ0FBQzFGLFVBQUwsRUFBaUI7QUFDZixVQUFBLE1BQUksQ0FBQzhHLFdBQUwsQ0FBaUJDLEtBQWpCO0FBQ0Q7QUFDRixPQUpTLEVBSVAsR0FKTyxDQUFWO0FBS0QsS0FYRCxNQVdPO0FBQ0wsV0FBS3ZGLFVBQUwsR0FBa0J1RixLQUFsQjs7QUFDQSxVQUFJLEtBQUtqRyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFlBQUksS0FBS1IsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNyRSxTQUFyQyxJQUFrRGdDLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZhLElBQTdGLENBQWtHVyxNQUF4SixFQUFnSztBQUM5Sm1DLFVBQUFBLGNBQWMsR0FBRyxJQUFqQjtBQUNBekgsVUFBQUEsYUFBYSxHQUFHLEtBQUthLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDakUsaUJBQXJDLENBQXVEWixZQUF2RTs7QUFDQSxjQUFJLENBQUMsS0FBSzJELGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDbEQsY0FBMUMsRUFBMEQ7QUFDeEQsaUJBQUs2SSxrQkFBTCxDQUF3QixJQUF4Qjs7QUFDQSxnQkFBSSxDQUFDMUgsYUFBTCxFQUFvQjtBQUNsQmlHLGNBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z2RyxnQkFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRDJFLDJCQUExRCxDQUFzRixJQUF0RjtBQUNBakksZ0JBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMEQ0RSxpQkFBMUQ7QUFDQW5JLGdCQUFBQSxVQUFVLEdBQUcsS0FBYjtBQUNELGVBSlMsRUFJUCxJQUpPLENBQVY7QUFLQTZFLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFtQixLQUFLMUQsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUN0RSxVQUFwRTtBQUNEO0FBQ0Y7QUFDRixTQWRELE1BY087QUFDTCxlQUFLaUssa0JBQUwsQ0FBd0IsS0FBeEI7QUFDRDtBQUNGLE9BbEJELE1Ba0JPLElBQUksS0FBS3JHLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakM7QUFDQTtBQUNBO0FBQ0EsWUFBSSxLQUFLUixjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ25FLEtBQXJDLElBQThDLEtBQWxELEVBQXlEO0FBQ3ZENkosVUFBQUEsY0FBYyxHQUFHLElBQWpCO0FBQ0F6SCxVQUFBQSxhQUFhLEdBQUcsS0FBS2EsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNqRSxpQkFBckMsQ0FBdURaLFlBQXZFOztBQUNBLGNBQUksQ0FBQzFDLFlBQUwsRUFBbUI7QUFDakIsaUJBQUtrTixrQkFBTCxDQUF3QixJQUF4Qjs7QUFDQSxnQkFBSSxDQUFDMUgsYUFBTCxFQUFvQjtBQUNsQmlHLGNBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z4RyxnQkFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQUMsZ0JBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMEQyRSwyQkFBMUQsQ0FBc0YsSUFBdEY7QUFDQWpJLGdCQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBENEUsaUJBQTFEO0FBQ0QsZUFKUyxFQUlQLElBSk8sQ0FBVjtBQUtBdEQsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksbUJBQW1CLEtBQUsxRCxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3RFLFVBQXBFO0FBQ0Q7QUFDRjtBQUNGLFNBZEQsQ0FjRTtBQWRGLGFBZUs7QUFDSGdLLFlBQUFBLGNBQWMsR0FBRyxJQUFqQjtBQUNBekgsWUFBQUEsYUFBYSxHQUFHLEtBQUthLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDakUsaUJBQXJDLENBQXVEWixZQUF2RTs7QUFDQSxnQkFBSSxDQUFDekMsV0FBTCxFQUFrQjtBQUNoQixtQkFBS2lOLGtCQUFMLENBQXdCLEtBQXhCOztBQUNBLGtCQUFJLENBQUMxSCxhQUFMLEVBQW9CO0FBQ2xCaUcsZ0JBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z4RyxrQkFBQUEsVUFBVSxHQUFHLEtBQWI7O0FBQ0Esa0JBQUEsTUFBSSxDQUFDb0ksUUFBTDtBQUNELGlCQUhTLEVBR1AsSUFITyxDQUFWO0FBSUQ7QUFDRjtBQUNGO0FBQ0Y7O0FBRUQsV0FBS3ZFLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsS0FBS3ZCLFVBQTdCOztBQUVBLFdBQUssSUFBSWtDLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUsvQyxXQUFMLENBQWlCa0MsTUFBN0MsRUFBcURhLEtBQUssRUFBMUQsRUFBOEQ7QUFDNUQsYUFBSy9DLFdBQUwsQ0FBaUIrQyxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RG9GLGNBQTdELENBQTRFNUMsTUFBNUUsR0FBcUYsS0FBckY7QUFDQSxhQUFLaEUsV0FBTCxDQUFpQitDLEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEMEUsd0JBQTdEO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLL0YsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBM0IsUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEVyxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0Z5QyxpQkFBdEYsQ0FBd0csWUFBeEcsRUFBc0gsS0FBS3hELFVBQTNILEVBQXVJLElBQXZJO0FBQ0F1QyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFjLEtBQUsxRCxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3RFLFVBQS9EO0FBQ0E2RyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLckQsV0FBTCxDQUFpQixLQUFLYSxVQUF0QixFQUFrQ1csWUFBbEMsQ0FBK0Msc0JBQS9DLEVBQXVFcUYsVUFBbkY7QUFDQXpELFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZN0Usd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEMkIsV0FBOUQsRUFBWjtBQUNBUyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTdFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RFcsWUFBOUQsR0FBNkVtRixpQkFBN0UsRUFBWjtBQUNBLGFBQUs5RCx3QkFBTCxDQUE4QixDQUE5QixFQVAwQixDQVMxQjs7QUFDQSxZQUFJeEUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEMkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RjBDLGNBQTdGLENBQTRHQyxVQUE1RyxJQUEwSCxJQUE5SCxFQUFvSSxLQUFLcEQsMkJBQUw7QUFDckksT0F4RUksQ0EwRUw7OztBQUNBLFVBQUlvRSxjQUFjLElBQUl6SCxhQUF0QixFQUFxQztBQUNuQ1AsUUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQUMsUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRGlGLFNBQTFELENBQW9FLHVCQUFwRSxFQUE2RixJQUE3RjtBQUNBLGFBQUtDLGtCQUFMLENBQXdCLEtBQXhCO0FBQ0EsYUFBSzFDLFVBQUw7QUFDQSxhQUFLa0Msa0JBQUwsQ0FBd0IsS0FBeEI7QUFDQTtBQUNEOztBQUVELFVBQUlELGNBQWMsSUFBSSxLQUFLNUcsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNsRCxjQUEzRCxFQUEyRTtBQUN6RW9ILFFBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z4RyxVQUFBQSxVQUFVLEdBQUcsS0FBYjs7QUFDQSxVQUFBLE1BQUksQ0FBQytGLFVBQUw7O0FBQ0EsVUFBQSxNQUFJLENBQUNrQyxrQkFBTCxDQUF3QixLQUF4Qjs7QUFDQTtBQUNELFNBTFMsRUFLUCxHQUxPLENBQVY7QUFNRDtBQUNGO0FBQ0YsR0F2akJ3QjtBQXlqQnpCeEQsRUFBQUEsd0JBempCeUIsb0NBeWpCQWlFLElBempCQSxFQXlqQk07QUFDN0IsUUFBSUMsZUFBZSxHQUFHMUksd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEVyxZQUE5RCxHQUE2RW1GLGlCQUE3RSxFQUF0QjtBQUNBLFFBQUlLLE1BQU0sR0FBRzNJLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEVBQWI7QUFDQSxRQUFJeUUsUUFBUSxHQUFHSCxJQUFmLENBSDZCLENBSTdCO0FBQ0E7O0FBRUEsU0FBSyxJQUFJbEUsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdtRSxlQUFlLENBQUNoRixNQUE1QyxFQUFvRGEsS0FBSyxFQUF6RCxFQUE2RDtBQUMzRCxVQUFJLEtBQUtwRCxjQUFMLENBQW9CeUgsUUFBcEIsRUFBOEJqSixRQUE5QixJQUEwQyxLQUE5QyxFQUFxRDtBQUNuRCxZQUFJaUosUUFBUSxHQUFHLEtBQUt6SCxjQUFMLENBQW9CdUMsTUFBcEIsR0FBNkIsQ0FBNUMsRUFBK0M7QUFDN0NrRixVQUFBQSxRQUFRO0FBQ1IsZUFBS3BFLHdCQUFMLENBQThCb0UsUUFBOUI7QUFDRCxTQUhELE1BR087QUFDTGhFLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDQUQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzFELGNBQWpCO0FBQ0Q7QUFDRixPQVJELE1BUU87QUFDTCxZQUFJLEtBQUtBLGNBQUwsQ0FBb0J5SCxRQUFwQixFQUE4QjVLLFNBQTlCLElBQTJDMEssZUFBZSxDQUFDbkUsS0FBRCxDQUFmLENBQXVCSCxnQkFBdkIsQ0FBd0NDLGlCQUF4QyxDQUEwRHJHLFNBQXpHLEVBQW9IO0FBQ2xILGVBQUttRCxjQUFMLENBQW9CeUgsUUFBcEIsSUFBZ0NGLGVBQWUsQ0FBQ25FLEtBQUQsQ0FBZixDQUF1QkgsZ0JBQXZCLENBQXdDQyxpQkFBeEU7O0FBRUEsY0FBSXVFLFFBQVEsR0FBRyxLQUFLekgsY0FBTCxDQUFvQnVDLE1BQXBCLEdBQTZCLENBQTVDLEVBQStDO0FBQzdDa0YsWUFBQUEsUUFBUSxHQURxQyxDQUU3Qzs7QUFDQSxpQkFBS3BFLHdCQUFMLENBQThCb0UsUUFBOUI7QUFDRCxXQUpELE1BSU87QUFDTGhFLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDQUQsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzFELGNBQWpCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRixHQXhsQndCOztBQTBsQnpCOzs7Ozs7QUFNQTBILEVBQUFBLFNBaG1CeUIsdUJBZ21CYjtBQUNWakUsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzFELGNBQWpCO0FBQ0EsU0FBS3NELGtCQUFMO0FBQ0EsU0FBS0MsaUJBQUw7QUFDQSxTQUFLckMsVUFBTCxHQUFrQixDQUFsQixDQUpVLENBSVc7QUFFckI7O0FBQ0FyQyxJQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDb0UsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE2RSxLQUFLN0QsVUFBbEY7QUFDRCxHQXhtQndCO0FBMG1CekJ5RyxFQUFBQSxtQkExbUJ5QiwrQkEwbUJMOUMsS0ExbUJLLEVBMG1CRTtBQUN6QjtBQUNBLFFBQUkrQyxhQUFhLEdBQUcvQyxLQUFLLENBQUNmLElBQU4sQ0FBVytELFVBQS9CO0FBQ0EsUUFBSXBCLEtBQUssR0FBRzVCLEtBQUssQ0FBQ2YsSUFBTixDQUFXZ0UsSUFBdkI7QUFDQSxRQUFJQyxXQUFXLEdBQUdsRCxLQUFLLENBQUNmLElBQU4sQ0FBV2tFLGNBQTdCO0FBRUF2RSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWW1CLEtBQVosRUFOeUIsQ0FPekI7QUFDQTtBQUNBOztBQUVBLFNBQUs3RSxjQUFMLENBQW9CeUcsS0FBcEIsSUFBNkJzQixXQUE3QjtBQUVBLFNBQUt6RSxrQkFBTCxDQUF3QixJQUF4QjtBQUNBLFNBQUtDLGlCQUFMLENBQXVCLElBQXZCO0FBRUEsU0FBS2QsWUFBTCxDQUFrQixJQUFsQixFQUF3QixLQUFLdkIsVUFBN0I7O0FBRUEsU0FBSyxJQUFJa0MsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBSy9DLFdBQUwsQ0FBaUJrQyxNQUE3QyxFQUFxRGEsS0FBSyxFQUExRCxFQUE4RDtBQUM1RCxXQUFLL0MsV0FBTCxDQUFpQitDLEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEb0YsY0FBN0QsQ0FBNEU1QyxNQUE1RSxHQUFxRixLQUFyRjtBQUNBLFdBQUtoRSxXQUFMLENBQWlCK0MsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQwRSx3QkFBN0Q7QUFDRDs7QUFFRCxRQUFJLEtBQUsvRixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0EzQixNQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOERXLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRnlDLGlCQUF0RixDQUF3RyxZQUF4RyxFQUFzSCxLQUFLeEQsVUFBM0gsRUFBdUksSUFBdkk7QUFDQSxXQUFLbUMsd0JBQUwsQ0FBOEIsQ0FBOUIsRUFIMEIsQ0FLMUI7O0FBQ0EsVUFBSXhFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYwQyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsSUFBOUgsRUFBb0ksS0FBS3BELDJCQUFMO0FBQ3JJO0FBQ0YsR0F6b0J3QjtBQTJvQnpCeUYsRUFBQUEsc0JBM29CeUIsb0NBMm9CQTtBQUN2QixTQUFLM0Usa0JBQUwsQ0FBd0IsSUFBeEI7QUFDQSxTQUFLQyxpQkFBTCxDQUF1QixJQUF2QjtBQUNBNkIsSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZnZHLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMEQyRSwyQkFBMUQsQ0FBc0YsSUFBdEY7QUFDQWpJLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMEQ0RSxpQkFBMUQ7QUFDRCxLQUhTLEVBR1AsSUFITyxDQUFWO0FBS0EsU0FBS3RFLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsS0FBS3ZCLFVBQTdCOztBQUVBLFNBQUssSUFBSWtDLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUsvQyxXQUFMLENBQWlCa0MsTUFBN0MsRUFBcURhLEtBQUssRUFBMUQsRUFBOEQ7QUFDNUQsV0FBSy9DLFdBQUwsQ0FBaUIrQyxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RG9GLGNBQTdELENBQTRFNUMsTUFBNUUsR0FBcUYsS0FBckY7QUFDQSxXQUFLaEUsV0FBTCxDQUFpQitDLEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEMEUsd0JBQTdEO0FBQ0Q7O0FBRUQsUUFBSSxLQUFLL0YsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBM0IsTUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEVyxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0Z5QyxpQkFBdEYsQ0FBd0csWUFBeEcsRUFBc0gsS0FBS3hELFVBQTNILEVBQXVJLElBQXZJO0FBQ0EsV0FBS21DLHdCQUFMLENBQThCLENBQTlCLEVBSDBCLENBSzFCOztBQUNBLFVBQUl4RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOEQyQixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGMEMsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILElBQTlILEVBQW9JLEtBQUtwRCwyQkFBTDtBQUNySTtBQUNGLEdBbHFCd0I7QUFtcUJ6QjtBQUVBOztBQUNBOzs7Ozs7QUFNQWMsRUFBQUEsa0JBNXFCeUIsOEJBNHFCTnNFLGFBNXFCTSxFQTRxQmlCO0FBQUEsUUFBdkJBLGFBQXVCO0FBQXZCQSxNQUFBQSxhQUF1QixHQUFQLEtBQU87QUFBQTs7QUFDeEMsUUFBSSxLQUFLcEgsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLFVBQUksQ0FBQ29ILGFBQUwsRUFBb0I7QUFDbEIsWUFBSU0sWUFBWSxHQUFHLEtBQUtDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLEtBQUtsSSxXQUFMLENBQWlCc0MsTUFBbkMsQ0FBbkI7O0FBQ0EsYUFBS3ZDLGNBQUwsQ0FBb0JnRyxJQUFwQixDQUF5QixLQUFLL0YsV0FBTCxDQUFpQmlJLFlBQWpCLENBQXpCO0FBQ0FySixRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOERpQixVQUE5RCxHQUEyRSxDQUEzRTtBQUNEO0FBQ0Y7O0FBRUQsU0FBSyxJQUFJYyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3ZFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RGlCLFVBQTFGLEVBQXNHYyxLQUFLLEVBQTNHLEVBQStHO0FBQzdHLFdBQUsvQyxXQUFMLENBQWlCK0MsS0FBakIsRUFBd0JpQixNQUF4QixHQUFpQyxJQUFqQztBQUNBLFdBQUtoRSxXQUFMLENBQWlCK0MsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkRxRixVQUE3RCxHQUEwRSxLQUFLbEgsY0FBTCxDQUFvQm9ELEtBQXBCLENBQTFFO0FBQ0EsV0FBSy9DLFdBQUwsQ0FBaUIrQyxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHVHLE9BQTdELENBQXFFLEtBQUtwSSxjQUFMLENBQW9Cb0QsS0FBcEIsRUFBMkJ4RyxVQUFoRztBQUNBLFdBQUt5RCxXQUFMLENBQWlCK0MsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkR3RyxTQUE3RCxDQUF1RSxLQUFLckksY0FBTCxDQUFvQm9ELEtBQXBCLEVBQTJCdEcsUUFBbEc7QUFDQSxXQUFLdUQsV0FBTCxDQUFpQitDLEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEMEUsd0JBQTdEO0FBQ0Q7QUFDRixHQTdyQndCO0FBK3JCekI5RCxFQUFBQSxZQS9yQnlCLHdCQStyQlo2RixnQkEvckJZLEVBK3JCTUMsTUEvckJOLEVBK3JCYztBQUNyQyxRQUFJRCxnQkFBSixFQUFzQjtBQUNwQixXQUFLakksV0FBTCxDQUFpQmtJLE1BQWpCLEVBQXlCMUcsWUFBekIsQ0FBc0Msc0JBQXRDLEVBQThEcUYsVUFBOUQsR0FBMkUsS0FBS2xILGNBQUwsQ0FBb0J1SSxNQUFwQixDQUEzRTs7QUFFQSxXQUFLLElBQUluRixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3ZFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RGlCLFVBQTFGLEVBQXNHYyxLQUFLLEVBQTNHLEVBQStHO0FBQzdHLFlBQUltRixNQUFNLElBQUluRixLQUFkLEVBQXFCO0FBQ25CLGVBQUsvQyxXQUFMLENBQWlCK0MsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQyRyxtQkFBN0QsQ0FBaUYsSUFBakY7QUFDQSxlQUFLbkksV0FBTCxDQUFpQitDLEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZENEcsb0JBQTdELENBQWtGLElBQWxGO0FBQ0EsZUFBS3BJLFdBQUwsQ0FBaUIrQyxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RDBFLHdCQUE3RDtBQUNELFNBSkQsTUFJTztBQUNMLGVBQUtsRyxXQUFMLENBQWlCK0MsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQwRSx3QkFBN0Q7QUFDQSxlQUFLbEcsV0FBTCxDQUFpQitDLEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEMkcsbUJBQTdELENBQWlGLEtBQWpGO0FBQ0EsZUFBS25JLFdBQUwsQ0FBaUIrQyxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RDRHLG9CQUE3RCxDQUFrRixLQUFsRjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLEdBL3NCd0I7O0FBaXRCekI7Ozs7OztBQU1BbEYsRUFBQUEsaUJBdnRCeUIsNkJBdXRCUHFFLGFBdnRCTyxFQXV0QmdCO0FBQUEsUUFBdkJBLGFBQXVCO0FBQXZCQSxNQUFBQSxhQUF1QixHQUFQLEtBQU87QUFBQTs7QUFDdkMsUUFBSSxDQUFDQSxhQUFMLEVBQW9CO0FBQ2xCLFdBQUssSUFBSXhFLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUtwRCxjQUFMLENBQW9CdUMsTUFBaEQsRUFBd0RhLEtBQUssRUFBN0QsRUFBaUU7QUFDL0QsWUFBSSxLQUFLcEQsY0FBTCxDQUFvQm9ELEtBQXBCLEVBQTJCbEcsZUFBM0IsSUFBOEMsQ0FBOUMsSUFBbUQsQ0FBQyxLQUFLOEMsY0FBTCxDQUFvQm9ELEtBQXBCLEVBQTJCckYsc0JBQW5GLEVBQTJHLEtBQUt1QyxjQUFMLENBQW9COEMsS0FBcEIsRUFBMkJlLFdBQTNCLENBQXVDLEtBQUs1RCxrQkFBTCxDQUF3QixDQUF4QixFQUEyQnlELFFBQTNCLENBQW9DQyxDQUEzRSxFQUE4RSxLQUFLMUQsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkJ5RCxRQUEzQixDQUFvQ0UsQ0FBbEgsRUFBM0csS0FDSyxJQUFJLEtBQUtsRSxjQUFMLENBQW9Cb0QsS0FBcEIsRUFBMkJqRyxvQkFBM0IsSUFBbUQsQ0FBbkQsSUFBd0QsQ0FBQyxLQUFLNkMsY0FBTCxDQUFvQm9ELEtBQXBCLEVBQTJCckYsc0JBQXhGLEVBQWdILEtBQUt1QyxjQUFMLENBQW9COEMsS0FBcEIsRUFBMkJlLFdBQTNCLENBQXVDLEtBQUs1RCxrQkFBTCxDQUF3QixDQUF4QixFQUEyQnlELFFBQTNCLENBQW9DQyxDQUEzRSxFQUE4RSxLQUFLMUQsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkJ5RCxRQUEzQixDQUFvQ0UsQ0FBbEg7QUFDdEg7QUFDRixLQUxELE1BS087QUFDTCxVQUFJLEtBQUtsRSxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ2hFLGVBQXJDLElBQXdELENBQTVELEVBQStELEtBQUtvRCxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDaUQsV0FBckMsQ0FBaUQsS0FBSzVELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCeUQsUUFBM0IsQ0FBb0NDLENBQXJGLEVBQXdGLEtBQUsxRCxrQkFBTCxDQUF3QixDQUF4QixFQUEyQnlELFFBQTNCLENBQW9DRSxDQUE1SCxFQUEvRCxLQUNLLElBQUksS0FBS2xFLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDL0Qsb0JBQXJDLElBQTZELENBQWpFLEVBQW9FLEtBQUttRCxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDaUQsV0FBckMsQ0FBaUQsS0FBSzVELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCeUQsUUFBM0IsQ0FBb0NDLENBQXJGLEVBQXdGLEtBQUsxRCxrQkFBTCxDQUF3QixDQUF4QixFQUEyQnlELFFBQTNCLENBQW9DRSxDQUE1SDtBQUMxRTs7QUFFRCxTQUFLLElBQUlkLE9BQUssR0FBRyxDQUFqQixFQUFvQkEsT0FBSyxHQUFHdkUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEaUIsVUFBMUYsRUFBc0djLE9BQUssRUFBM0csRUFBK0c7QUFDN0csV0FBSzlDLGNBQUwsQ0FBb0I4QyxPQUFwQixFQUEyQmlCLE1BQTNCLEdBQW9DLElBQXBDO0FBQ0Q7O0FBRUQsU0FBSyxJQUFJakIsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUcsS0FBS3BELGNBQUwsQ0FBb0J1QyxNQUFoRCxFQUF3RGEsT0FBSyxFQUE3RCxFQUFpRTtBQUMvRCxXQUFLOUMsY0FBTCxDQUFvQjhDLE9BQXBCLEVBQTJCc0YsUUFBM0IsQ0FBb0MsQ0FBcEMsRUFBdUM3RyxZQUF2QyxDQUFvRHZILEVBQUUsQ0FBQ3FPLE1BQXZELEVBQStEQyxXQUEvRCxHQUE2RS9KLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMEQwRyxhQUExRCxDQUF3RSxLQUFLN0ksY0FBTCxDQUFvQm9ELE9BQXBCLEVBQTJCdEcsUUFBbkcsQ0FBN0U7QUFDRDtBQUNGLEdBenVCd0I7QUEydUJ6QmdNLEVBQUFBLHlCQTN1QnlCLHVDQTJ1Qkc7QUFDMUIsUUFBSUMsU0FBUyxHQUFHLEtBQUt6SSxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDOEgscUJBQXJDLENBQTJEMU8sRUFBRSxDQUFDc0osSUFBSCxDQUFRLENBQVIsRUFBVyxHQUFYLENBQTNELENBQWhCO0FBQ0EsU0FBS3hELFVBQUwsQ0FBZ0I0RCxRQUFoQixHQUEyQixLQUFLNUQsVUFBTCxDQUFnQjZJLE1BQWhCLENBQXVCQyxvQkFBdkIsQ0FBNENILFNBQTVDLENBQTNCO0FBRUEsUUFBSUksS0FBSyxHQUFHSixTQUFTLENBQUM3RSxDQUFWLEdBQWM1SixFQUFFLENBQUM4TyxPQUFILENBQVdDLE1BQXJDO0FBQ0EsU0FBS3pILE1BQUwsQ0FBWTBILFNBQVosR0FBd0IsQ0FBeEI7QUFDRCxHQWp2QndCO0FBbXZCekJDLEVBQUFBLFVBbnZCeUIsd0JBbXZCWjtBQUNYLFFBQUksS0FBS3pILGVBQVQsRUFBMEIsS0FBS2dILHlCQUFMO0FBQzNCLEdBcnZCd0I7QUF1dkJ6QlUsRUFBQUEsWUF2dkJ5Qix3QkF1dkJaQyxLQXZ2QlksRUF1dkJMO0FBQ2xCLFFBQUlDLE1BQU0sR0FBR0QsS0FBSyxDQUFDRSxLQUFuQjtBQUNBLFFBQUlDLE1BQU0sR0FBR0gsS0FBSyxDQUFDSSxLQUFuQjs7QUFDQSxRQUFJQyxPQUFPLEdBQUdKLE1BQU0sR0FBR0UsTUFBdkI7O0FBRUFoTCxJQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBLFNBQUs4QyxhQUFMLEdBQXFCLEtBQXJCOztBQUVBLFFBQUksS0FBS2xCLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQSxXQUFLLElBQUk0QyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3ZFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RFcsWUFBOUQsR0FBNkVtRixpQkFBN0UsR0FBaUc1RSxNQUE3SCxFQUFxSWEsS0FBSyxFQUExSSxFQUE4STtBQUM1SSxZQUFJdkUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEVyxZQUE5RCxHQUE2RW1GLGlCQUE3RSxHQUFpRy9ELEtBQWpHLEVBQXdHSCxnQkFBeEcsQ0FBeUhhLElBQXpILENBQThIVyxNQUE5SCxJQUF3SSxLQUFLekUsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNyRSxTQUFqTCxFQUE0TDtBQUMxTDRHLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFvQixLQUFLMUQsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUN0RSxVQUFyRTtBQUNBLGVBQUtvRCxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3BELGlCQUFyQyxHQUF5RGUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEVyxZQUE5RCxHQUE2RW1GLGlCQUE3RSxHQUFpRy9ELEtBQWpHLEVBQXdHSCxnQkFBeEcsQ0FBeUhDLGlCQUF6SCxDQUEySXBGLGlCQUFwTTtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxRQUFJLEtBQUtrQyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3BELGlCQUFyQyxJQUEwRCxDQUExRCxJQUErRCxDQUFDLEtBQUtrQyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ25ELHNCQUF6RyxFQUFpSTtBQUMvSCxVQUFJLEtBQUtpQyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ2xFLFlBQXJDLENBQWtELENBQWxELEVBQXFEaEMsWUFBckQsSUFBcUUsQ0FBekUsRUFBNEU7QUFDMUV5RCxRQUFBQSxXQUFXLEdBQUcsQ0FBZDtBQUNBLGFBQUt1QixjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ25ELHNCQUFyQyxHQUE4RCxJQUE5RDtBQUNBMEYsUUFBQUEsT0FBTyxDQUFDc0csS0FBUixDQUFjdEwsV0FBZDtBQUNELE9BSkQsTUFJTztBQUNMLGFBQUt1QixjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ25ELHNCQUFyQyxHQUE4RCxJQUE5RDtBQUNBVSxRQUFBQSxXQUFXLEdBQUcsRUFBZDtBQUNBZ0YsUUFBQUEsT0FBTyxDQUFDc0csS0FBUixDQUFjdEwsV0FBZDtBQUNEO0FBQ0YsS0FWRCxNQVVPO0FBQ0wsVUFBSSxLQUFLdUIsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNwRCxpQkFBckMsSUFBMEQsRUFBOUQsRUFBa0UsS0FBS2tDLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDcEQsaUJBQXJDLEdBQXlELEtBQUtrQyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3BELGlCQUFyQyxHQUF5RCxFQUFsSCxDQUFsRSxLQUNLLEtBQUtrQyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3BELGlCQUFyQyxHQUF5RCxLQUFLa0MsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNwRCxpQkFBckMsR0FBeUQsQ0FBbEg7QUFFTFcsTUFBQUEsV0FBVyxHQUFHLEtBQUt1QixjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3BELGlCQUFuRDtBQUNBMkYsTUFBQUEsT0FBTyxDQUFDc0csS0FBUixDQUFjdEwsV0FBVyxHQUFHLENBQTVCO0FBQ0Q7O0FBRURFLElBQUFBLFFBQVEsR0FBR21MLE9BQVg7QUFDQXBMLElBQUFBLFFBQVEsR0FBRyxDQUFYO0FBQ0FHLElBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMEQ2SCwyQkFBMUQsQ0FBc0ZyTCxRQUF0Rjs7QUFFQSxTQUFLLElBQUl5RSxPQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE9BQUssR0FBRyxLQUFLL0MsV0FBTCxDQUFpQmtDLE1BQTdDLEVBQXFEYSxPQUFLLEVBQTFELEVBQThEO0FBQzVELFVBQUksS0FBS2xDLFVBQUwsSUFBbUJrQyxPQUF2QixFQUE4QjtBQUM1QixhQUFLL0MsV0FBTCxDQUFpQitDLE9BQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEb0YsY0FBN0QsQ0FBNEU1QyxNQUE1RSxHQUFxRixJQUFyRjs7QUFDQSxhQUFLaEUsV0FBTCxDQUFpQitDLE9BQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEb0YsY0FBN0QsQ0FBNEVwRixZQUE1RSxDQUF5RixnQkFBekYsRUFBMkdvSSxXQUEzRyxDQUF1SFAsTUFBdkgsRUFBK0hFLE1BQS9IOztBQUNBLGFBQUt2SixXQUFMLENBQWlCK0MsT0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQwRSx3QkFBN0Q7QUFDRCxPQUpELE1BSU87QUFDTCxhQUFLbEcsV0FBTCxDQUFpQitDLE9BQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEb0YsY0FBN0QsQ0FBNEU1QyxNQUE1RSxHQUFxRixLQUFyRjs7QUFDQSxhQUFLaEUsV0FBTCxDQUFpQitDLE9BQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEMEUsd0JBQTdEO0FBQ0Q7QUFDRixLQWpEaUIsQ0FtRGxCO0FBQ0E7QUFDQTs7QUFDRCxHQTd5QndCO0FBK3lCekIyRCxFQUFBQSxnQkEveUJ5Qiw4QkEreUJOO0FBQ2pCLFFBQUluQixTQUFTLEdBQUcsS0FBS3pJLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUM4SCxxQkFBckMsQ0FBMkQxTyxFQUFFLENBQUNzSixJQUFILENBQVEsQ0FBUixFQUFXLEdBQVgsQ0FBM0QsQ0FBaEI7O0FBQ0EsUUFBSXVHLElBQUksR0FBRyxLQUFLL0osVUFBTCxDQUFnQjZJLE1BQWhCLENBQXVCQyxvQkFBdkIsQ0FBNENILFNBQTVDLENBQVg7O0FBQ0EsU0FBS3FCLFdBQUwsQ0FBaUJELElBQWpCLEVBQXVCLElBQXZCLEVBQTZCLEdBQTdCO0FBQ0QsR0FuekJ3QjtBQXF6QnpCRSxFQUFBQSxjQXJ6QnlCLDBCQXF6QlZDLFFBcnpCVSxFQXF6QkE7QUFDdkIsUUFBSUMsV0FBVyxHQUFHLENBQWxCO0FBQ0EsUUFBSUMsWUFBWSxHQUFHLENBQW5COztBQUNBLFNBQUssSUFBSXBILEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHdkUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEVyxZQUE5RCxHQUE2RW1GLGlCQUE3RSxHQUFpRzVFLE1BQTdILEVBQXFJYSxLQUFLLEVBQTFJLEVBQThJO0FBQzVJLFVBQUl2RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOERXLFlBQTlELEdBQTZFbUYsaUJBQTdFLEdBQWlHL0QsS0FBakcsRUFBd0dILGdCQUF4RyxDQUF5SGEsSUFBekgsQ0FBOEhXLE1BQTlILElBQXdJLEtBQUt6RSxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3JFLFNBQWpMLEVBQTRMO0FBQzFMO0FBQ0EyTixRQUFBQSxZQUFZLEdBQUczTCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOERXLFlBQTlELEdBQTZFbUYsaUJBQTdFLEdBQWlHL0QsS0FBakcsRUFBd0dILGdCQUF4RyxDQUF5SEMsaUJBQXpILENBQTJJcEYsaUJBQTFKO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJME0sWUFBWSxHQUFHLENBQWYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIvRyxNQUFBQSxPQUFPLENBQUNzRyxLQUFSLENBQWMsd0JBQWQ7QUFDQVEsTUFBQUEsV0FBVyxHQUFHQyxZQUFZLEdBQUdGLFFBQWYsR0FBMEIsQ0FBeEM7QUFDQSxVQUFJRyxRQUFRLEdBQUdDLFFBQVEsQ0FBQzdMLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NtRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEeUcsV0FBMUQsRUFBdUV4RyxpQkFBdkUsQ0FBeUZsQyxZQUF6RixDQUFzRyxjQUF0RyxFQUFzSDhJLFNBQXRILENBQWdJQyxVQUFqSSxDQUF2QjtBQUNBbkgsTUFBQUEsT0FBTyxDQUFDc0csS0FBUixDQUFjLFlBQVlVLFFBQTFCO0FBQ0QsS0FMRCxNQUtPO0FBQ0xGLE1BQUFBLFdBQVcsR0FBR0MsWUFBWSxHQUFHRixRQUE3QjtBQUNBLFVBQUlHLFFBQVEsR0FBR0MsUUFBUSxDQUFDN0wsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER5RyxXQUExRCxFQUF1RXhHLGlCQUF2RSxDQUF5RmxDLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIOEksU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQXZCO0FBQ0FuSCxNQUFBQSxPQUFPLENBQUNzRyxLQUFSLENBQWMsWUFBWVUsUUFBMUI7QUFDRDtBQUNGLEdBejBCd0I7QUEyMEJ6QnpELEVBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNwQixRQUFJLENBQUN0SCxVQUFMLEVBQWlCO0FBQ2YsVUFBSW1MLEtBQUo7QUFDQSxVQUFJQyxLQUFKOztBQUNBLFVBQUkzUixPQUFPLElBQUksS0FBSzZHLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDbkUsS0FBckMsSUFBOEMsS0FBN0QsRUFBb0U7QUFDbEU4TixRQUFBQSxLQUFLLEdBQUdILFFBQVEsQ0FBQ3RSLFdBQUQsQ0FBaEI7QUFDQTBSLFFBQUFBLEtBQUssR0FBR0osUUFBUSxDQUFDclIsV0FBRCxDQUFoQjtBQUNELE9BSEQsTUFHTyxJQUFJLEtBQUsyRyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ25FLEtBQXJDLElBQThDLElBQTlDLElBQXNENUQsT0FBMUQsRUFBbUU7QUFDeEUwUixRQUFBQSxLQUFLLEdBQUcsRUFBUjtBQUNBQyxRQUFBQSxLQUFLLEdBQUcsQ0FBUjtBQUNELE9BSE0sTUFHQTtBQUNMRCxRQUFBQSxLQUFLLEdBQUcsS0FBSzFDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVI7QUFDQTJDLFFBQUFBLEtBQUssR0FBRyxLQUFLM0MsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBUjtBQUVBLFlBQUk3TyxpQkFBaUIsSUFBSXVSLEtBQXpCLEVBQWdDQSxLQUFLLEdBQUcsS0FBSzFDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVI7QUFFaEMsWUFBSTVPLGlCQUFpQixJQUFJdVIsS0FBekIsRUFBZ0NBLEtBQUssR0FBRyxLQUFLM0MsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBUjtBQUVoQzdPLFFBQUFBLGlCQUFpQixHQUFHdVIsS0FBcEI7QUFDQXRSLFFBQUFBLGlCQUFpQixHQUFHdVIsS0FBcEI7QUFDRCxPQW5CYyxDQXFCZjtBQUNBOzs7QUFFQW5NLE1BQUFBLFFBQVEsR0FBR2tNLEtBQUssR0FBR0MsS0FBbkI7QUFDQSxVQUFJQyxRQUFRLEdBQUc7QUFBRXBCLFFBQUFBLEtBQUssRUFBRWtCLEtBQVQ7QUFBZ0JoQixRQUFBQSxLQUFLLEVBQUVpQjtBQUF2QixPQUFmLENBekJlLENBMEJmO0FBQ0E7O0FBQ0FySCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBa0IvRSxRQUFsQixHQUE2QixVQUE3QixHQUEwQ2tNLEtBQTFDLEdBQWtELFVBQWxELEdBQStEQyxLQUEzRTtBQUVBak0sTUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ29FLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNkVnRyxRQUE3RTtBQUNEO0FBQ0YsR0E1MkJ3QjtBQTgyQnpCQyxFQUFBQSxXQTkyQnlCLHlCQTgyQlg7QUFDWixRQUFJSCxLQUFLLEdBQUcsS0FBSzFDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVo7QUFFQSxRQUFJek8saUJBQWlCLElBQUltUixLQUF6QixFQUFnQ0EsS0FBSyxHQUFHLEtBQUsxQyxTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFSO0FBRWhDek8sSUFBQUEsaUJBQWlCLEdBQUdtUixLQUFwQjtBQUVBLFdBQU9BLEtBQVA7QUFDRCxHQXQzQndCO0FBdzNCekJJLEVBQUFBLFlBeDNCeUIsMEJBdzNCVjtBQUNiLFFBQUlKLEtBQUssR0FBRyxLQUFLMUMsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBWjtBQUNBLFFBQUkyQyxLQUFLLEdBQUcsS0FBSzNDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVo7QUFFQSxRQUFJM08saUJBQWlCLElBQUlxUixLQUF6QixFQUFnQ0EsS0FBSyxHQUFHLEtBQUsxQyxTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFSO0FBRWhDLFFBQUkxTyxpQkFBaUIsSUFBSXFSLEtBQXpCLEVBQWdDQSxLQUFLLEdBQUcsS0FBSzNDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVI7QUFFaEMzTyxJQUFBQSxpQkFBaUIsR0FBR3FSLEtBQXBCO0FBQ0FwUixJQUFBQSxpQkFBaUIsR0FBR3FSLEtBQXBCO0FBRUEsV0FBT0QsS0FBSyxHQUFHQyxLQUFmO0FBQ0QsR0FwNEJ3QjtBQXM0QnpCSSxFQUFBQSxZQXQ0QnlCLDBCQXM0QlY7QUFDYixRQUFJLENBQUN4TCxVQUFMLEVBQWlCO0FBQ2YsVUFBSWpCLFdBQVcsR0FBR0ksd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER2QixNQUE1RSxFQUFvRjtBQUNsRixZQUFJNEksUUFBUSxHQUFHVCxRQUFRLENBQUM3TCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJGLFdBQTFELEVBQXVFc0YsaUJBQXZFLENBQXlGbEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0g4SSxTQUF0SCxDQUFnSUMsVUFBakksQ0FBdkI7O0FBQ0EsYUFBSzVLLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDcEQsaUJBQXJDLEdBQXlEVyxXQUF6RDs7QUFDQSxZQUFJME0sUUFBUSxJQUFJLENBQVosSUFBaUJBLFFBQVEsSUFBSSxDQUFqQyxFQUFvQztBQUNsQztBQUNBLGNBQUk1RixVQUFVLEdBQUcsS0FBSzRDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLEVBQWxCLENBQWpCLENBRmtDLENBSWxDOztBQUNBLGNBQUlnRCxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDakI7QUFDQSxnQkFBSUMsVUFBVSxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsRUFBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsQ0FBakI7QUFDQSxnQkFBSWhJLEtBQUssR0FBRyxLQUFLK0UsU0FBTCxDQUFlLENBQWYsRUFBa0IsRUFBbEIsQ0FBWjtBQUNBNUMsWUFBQUEsVUFBVSxHQUFHNkYsVUFBVSxDQUFDaEksS0FBRCxDQUF2QixDQUppQixDQUtqQjtBQUNELFdBTkQsTUFNTyxJQUFJK0gsUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ3hCO0FBQ0EsZ0JBQUlDLFVBQVUsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLENBQWpCO0FBQ0EsZ0JBQUloSSxLQUFLLEdBQUcsS0FBSytFLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLEVBQWxCLENBQVo7QUFDQTVDLFlBQUFBLFVBQVUsR0FBRzZGLFVBQVUsQ0FBQ2hJLEtBQUQsQ0FBdkIsQ0FKd0IsQ0FLeEI7QUFDRCxXQU5NLE1BTUEsSUFBSStILFFBQVEsSUFBSSxDQUFoQixFQUFtQjtBQUN4QjtBQUNBLGdCQUFJQyxVQUFVLEdBQUcsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsRUFBYixFQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixDQUE3QixDQUFqQjtBQUNBLGdCQUFJaEksS0FBSyxHQUFHLEtBQUsrRSxTQUFMLENBQWUsQ0FBZixFQUFrQixFQUFsQixDQUFaO0FBQ0E1QyxZQUFBQSxVQUFVLEdBQUc2RixVQUFVLENBQUNoSSxLQUFELENBQXZCLENBSndCLENBS3hCO0FBQ0QsV0FOTSxNQU1BLElBQUkrSCxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDeEI7QUFDQSxnQkFBSUMsVUFBVSxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsRUFBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsQ0FBakI7QUFDQSxnQkFBSWhJLEtBQUssR0FBRyxLQUFLK0UsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBWjtBQUNBNUMsWUFBQUEsVUFBVSxHQUFHNkYsVUFBVSxDQUFDaEksS0FBRCxDQUF2QixDQUp3QixDQUt4QjtBQUNEOztBQUVEeEUsVUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQTZFLFVBQUFBLE9BQU8sQ0FBQ3NHLEtBQVIsQ0FBY29CLFFBQWQ7O0FBRUEsY0FBSSxLQUFLM0ssWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLGdCQUFJMkssUUFBUSxJQUFJLEVBQWhCLEVBQW9CO0FBQ2xCO0FBQ0ExTSxjQUFBQSxXQUFXLEdBQUdBLFdBQVcsR0FBRyxDQUE1QjtBQUNBLG1CQUFLNE0sYUFBTDtBQUNELGFBSkQsTUFJTztBQUNMLGtCQUFJLEtBQUtyTCxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3JFLFNBQXJDLElBQWtEZ0Msd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEMkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RmEsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLG9CQUFJNkcsV0FBVyxHQUFHO0FBQUU5RixrQkFBQUEsVUFBVSxFQUFFRCxVQUFkO0FBQTBCRSxrQkFBQUEsT0FBTyxFQUFFaEg7QUFBbkMsaUJBQWxCO0FBQ0EscUJBQUttRyxpQkFBTCxDQUF1QjBHLFdBQXZCO0FBQ0QsZUFIRCxNQUdPO0FBQ0wscUJBQUtwRyxtQkFBTDtBQUNEO0FBQ0Y7QUFDRixXQWRELE1BY08sSUFBSSxLQUFLMUUsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQztBQUNBLGdCQUFJMkssUUFBUSxJQUFJLEVBQWhCLEVBQW9CO0FBQ2xCO0FBQ0ExTSxjQUFBQSxXQUFXLEdBQUdBLFdBQVcsR0FBRyxDQUE1QjtBQUNBLG1CQUFLNE0sYUFBTDtBQUNELGFBSkQsTUFJTztBQUNMLGtCQUFJQyxXQUFXLEdBQUc7QUFBRTlGLGdCQUFBQSxVQUFVLEVBQUVELFVBQWQ7QUFBMEJFLGdCQUFBQSxPQUFPLEVBQUVoSDtBQUFuQyxlQUFsQjtBQUNBLG1CQUFLbUcsaUJBQUwsQ0FBdUIwRyxXQUF2QjtBQUNEO0FBQ0Y7QUFDRixTQTNERCxNQTJETztBQUNMMU0sVUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQTZFLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVFQUFaO0FBQ0EsZUFBS2dDLHNCQUFMO0FBQ0Q7QUFDRixPQW5FRCxNQW1FTztBQUNMLFlBQUksS0FBS2xGLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsY0FBSSxDQUFDZCxVQUFMLEVBQWlCO0FBQ2YsZ0JBQUksS0FBS00sY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNxSyxLQUFyQyxJQUE4QzNSLFdBQWxELEVBQStELEtBQUs0UixnQkFBTDtBQUUvRCxnQkFBSSxDQUFDLEtBQUt4TCxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3FLLEtBQXRDLElBQStDNVIsWUFBbkQsRUFBaUUsS0FBSzZSLGdCQUFMO0FBQ2xFO0FBQ0YsU0FORCxNQU1PLElBQUksS0FBS2hMLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakMsY0FBSSxDQUFDZCxVQUFMLEVBQWlCO0FBQ2YsZ0JBQUksS0FBS00sY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNsRCxjQUF6QyxFQUF5RDtBQUN2RCxtQkFBS3dOLGdCQUFMO0FBQ0EvSCxjQUFBQSxPQUFPLENBQUNzRyxLQUFSLENBQWMseUJBQWQ7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGLEtBcEZELE1Bb0ZPO0FBQ0wsVUFBSSxLQUFLdkosWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixhQUFLaUwsdUJBQUwsQ0FBNkIsSUFBN0I7QUFDRCxPQUZELE1BRU8sSUFBSSxLQUFLakwsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQyxhQUFLaUwsdUJBQUwsQ0FBNkIsS0FBN0I7QUFDRDtBQUNGO0FBQ0YsR0FsK0J3QjtBQW8rQnpCRCxFQUFBQSxnQkFwK0J5Qiw4QkFvK0JOO0FBQ2pCNU0sSUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQTZFLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVFQUFaO0FBQ0EsU0FBS2dDLHNCQUFMO0FBQ0QsR0F4K0J3QjtBQTArQnpCZ0csRUFBQUEsZ0JBMStCeUIsNEJBMCtCUkMsTUExK0JRLEVBMCtCUUMsY0ExK0JSLEVBMCtCZ0M7QUFBQSxRQUF4Q0QsTUFBd0M7QUFBeENBLE1BQUFBLE1BQXdDLEdBQS9CLEtBQStCO0FBQUE7O0FBQUEsUUFBeEJDLGNBQXdCO0FBQXhCQSxNQUFBQSxjQUF3QixHQUFQLEtBQU87QUFBQTs7QUFDdkQsUUFBSUQsTUFBTSxJQUFJLEtBQWQsRUFBcUI7QUFDbkI7QUFDQTtBQUNBO0FBRUEsVUFBSUUsWUFBWSxHQUFHLEtBQUtoSixVQUFMLEVBQW5COztBQUVBLFVBQUksQ0FBQyxLQUFLN0MsY0FBTCxDQUFvQjZMLFlBQXBCLEVBQWtDck4sUUFBdkMsRUFBaUQ7QUFDL0MsYUFBS3dCLGNBQUwsQ0FBb0I2TCxZQUFwQixFQUFrQzdOLGNBQWxDLEdBQW1ELElBQW5EO0FBQ0EsYUFBS2dDLGNBQUwsQ0FBb0I2TCxZQUFwQixFQUFrQzVOLFVBQWxDLEdBQStDLENBQS9DO0FBQ0F3RixRQUFBQSxPQUFPLENBQUNzRyxLQUFSLENBQWMsZ0NBQWQ7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJLEtBQUsvSixjQUFMLENBQW9CNkwsWUFBcEIsRUFBa0NoUCxTQUFsQyxJQUErQ2dDLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZhLElBQTdGLENBQWtHVyxNQUFySixFQUE2SjtBQUMzSmhCLFVBQUFBLE9BQU8sQ0FBQ3NHLEtBQVIsQ0FBYyxpQkFBZDtBQUNBdEcsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVo7QUFDQSxlQUFLMUQsY0FBTCxDQUFvQjZMLFlBQXBCLEVBQWtDN04sY0FBbEMsR0FBbUQsSUFBbkQ7QUFFQSxjQUFJOE4sS0FBSyxHQUFHLEtBQUs5TCxjQUFMLENBQW9CNkwsWUFBcEIsRUFBa0N2TyxJQUE5Qzs7QUFDQSxjQUFJeU8sUUFBUSxHQUFHbE4sd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NMLGVBQWxDLEdBQW9EaE0sY0FBcEQsQ0FBbUU2TCxZQUFuRSxFQUFpRjNPLGVBQWhHOztBQUNBLGNBQUkrTyxRQUFRLEdBQUdwTix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0wsZUFBbEMsR0FBb0RoTSxjQUFwRCxDQUFtRTZMLFlBQW5FLEVBQWlGMU8sb0JBQWhHOztBQUNBLGNBQUkrTyxXQUFXLEdBQUdyTix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0wsZUFBbEMsR0FBb0RoTSxjQUFwRCxDQUFtRTZMLFlBQW5FLEVBQWlGek8sb0JBQW5HOztBQUVBLGNBQUkrTyxVQUFVLEdBQUcsQ0FBakI7O0FBQ0EsZUFBSyxJQUFJL0ksS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd2RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0wsZUFBbEMsR0FBb0RoTSxjQUFwRCxDQUFtRTZMLFlBQW5FLEVBQWlGN08sWUFBakYsQ0FBOEZ1RixNQUExSCxFQUFrSWEsS0FBSyxFQUF2SSxFQUEySTtBQUN6SSxnQkFBSXZFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzTCxlQUFsQyxHQUFvRGhNLGNBQXBELENBQW1FNkwsWUFBbkUsRUFBaUY3TyxZQUFqRixDQUE4Rm9HLEtBQTlGLEVBQXFHcEgsU0FBekcsRUFBb0g7QUFDbEhtUSxjQUFBQSxVQUFVLElBQUl0Tix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0wsZUFBbEMsR0FBb0RoTSxjQUFwRCxDQUFtRTZMLFlBQW5FLEVBQWlGN08sWUFBakYsQ0FBOEZvRyxLQUE5RixFQUFxR25ILFVBQW5IO0FBQ0Q7QUFDRjs7QUFFRCxjQUFJbVEsS0FBSyxHQUFHLEtBQUtwTSxjQUFMLENBQW9CNkwsWUFBcEIsRUFBa0N0TyxTQUE5QztBQUNBLGNBQUk4TyxPQUFPLEdBQUcsS0FBS3JNLGNBQUwsQ0FBb0I2TCxZQUFwQixFQUFrQ3JPLFVBQWhEOztBQUVBLGNBQUk4TyxXQUFXLEdBQUcsS0FBS3JCLFlBQUwsRUFBbEI7O0FBQ0EsY0FBSXNCLFdBQVcsR0FBR0QsV0FBVyxHQUFHLElBQWhDO0FBRUEsY0FBSUUsUUFBUSxHQUFHRCxXQUFXLEdBQUdILEtBQTdCO0FBQ0EsY0FBSUssU0FBUyxHQUFHRixXQUFXLEdBQUdGLE9BQTlCO0FBRUEsY0FBSUssTUFBTSxHQUFHLENBQUNULFFBQVEsR0FBR0MsV0FBWixJQUEyQixNQUF4QztBQUVBLGNBQUlTLE1BQU0sR0FBRyxDQUFiO0FBQ0EsY0FBSVosUUFBUSxJQUFJLENBQWhCLEVBQW1CWSxNQUFNLEdBQUcsS0FBVCxDQUFuQixLQUNLLElBQUlaLFFBQVEsSUFBSSxDQUFoQixFQUFtQlksTUFBTSxHQUFHLFFBQVEsS0FBakIsQ0FBbkIsS0FDQSxJQUFJWixRQUFRLElBQUksQ0FBaEIsRUFBbUJZLE1BQU0sR0FBRyxRQUFRLEtBQVIsR0FBZ0IsS0FBekI7QUFFeEIsY0FBSUMsV0FBVyxHQUFHZCxLQUFLLEdBQUdZLE1BQVIsR0FBaUJDLE1BQWpCLEdBQTBCSCxRQUExQixHQUFxQ0MsU0FBckMsR0FBaUROLFVBQW5FO0FBRUEsZUFBS25NLGNBQUwsQ0FBb0I2TCxZQUFwQixFQUFrQzVOLFVBQWxDLEdBQStDMk8sV0FBL0M7QUFDQSxlQUFLNU0sY0FBTCxDQUFvQjZMLFlBQXBCLEVBQWtDM04sV0FBbEMsR0FBZ0R5TyxNQUFoRDtBQUNBLGVBQUszTSxjQUFMLENBQW9CNkwsWUFBcEIsRUFBa0MxTixXQUFsQyxHQUFnRHVPLE1BQWhEO0FBQ0EsZUFBSzFNLGNBQUwsQ0FBb0I2TCxZQUFwQixFQUFrQ3pOLGFBQWxDLEdBQWtEb08sUUFBbEQ7QUFDQSxlQUFLeE0sY0FBTCxDQUFvQjZMLFlBQXBCLEVBQWtDdk4sZUFBbEMsR0FBb0RtTyxTQUFwRDtBQUNBLGVBQUt6TSxjQUFMLENBQW9CNkwsWUFBcEIsRUFBa0N4TixnQkFBbEMsR0FBcUQ4TixVQUFyRDtBQUNBdE4sVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEMkIsV0FBOUQsR0FBNEUwQixpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUsxRSxjQUFMLENBQW9CNkwsWUFBcEIsQ0FBbkg7QUFFQXBJLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVo7QUFDRCxTQTdDSSxDQThDTDs7QUFDRDtBQUNGLEtBM0RELE1BMkRPO0FBQ0wsV0FBSyxJQUFJbUksYUFBWSxHQUFHLENBQXhCLEVBQTJCQSxhQUFZLEdBQUcsS0FBSzdMLGNBQUwsQ0FBb0J1QyxNQUE5RCxFQUFzRXNKLGFBQVksRUFBbEYsRUFBc0Y7QUFDcEYsYUFBSzdMLGNBQUwsQ0FBb0I2TCxhQUFwQixFQUFrQzdOLGNBQWxDLEdBQW1ELElBQW5EO0FBRUEsWUFBSThOLEtBQUssR0FBRyxLQUFLOUwsY0FBTCxDQUFvQjZMLGFBQXBCLEVBQWtDdk8sSUFBOUM7QUFDQSxZQUFJeU8sUUFBUSxHQUFHLEtBQUsvTCxjQUFMLENBQW9CNkwsYUFBcEIsRUFBa0MzTyxlQUFqRDtBQUNBLFlBQUkrTyxRQUFRLEdBQUcsS0FBS2pNLGNBQUwsQ0FBb0I2TCxhQUFwQixFQUFrQzFPLG9CQUFqRDtBQUNBLFlBQUkrTyxXQUFXLEdBQUcsS0FBS2xNLGNBQUwsQ0FBb0I2TCxhQUFwQixFQUFrQ3pPLG9CQUFwRDtBQUVBLFlBQUkrTyxVQUFVLEdBQUcsQ0FBakI7O0FBQ0EsYUFBSyxJQUFJL0ksT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUcsS0FBS3BELGNBQUwsQ0FBb0I2TCxhQUFwQixFQUFrQzdPLFlBQWxDLENBQStDdUYsTUFBM0UsRUFBbUZhLE9BQUssRUFBeEYsRUFBNEY7QUFDMUYsY0FBSXZFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzTCxlQUFsQyxHQUFvRGhNLGNBQXBELENBQW1FNkwsYUFBbkUsRUFBaUY3TyxZQUFqRixDQUE4Rm9HLE9BQTlGLEVBQXFHcEgsU0FBekcsRUFBb0g7QUFDbEhtUSxZQUFBQSxVQUFVLElBQUl0Tix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0wsZUFBbEMsR0FBb0RoTSxjQUFwRCxDQUFtRTZMLGFBQW5FLEVBQWlGN08sWUFBakYsQ0FBOEZvRyxPQUE5RixFQUFxR25ILFVBQW5IO0FBQ0Q7QUFDRjs7QUFFRCxZQUFJbVEsS0FBSyxHQUFHLEtBQUtwTSxjQUFMLENBQW9CNkwsYUFBcEIsRUFBa0N0TyxTQUE5QztBQUNBLFlBQUk4TyxPQUFPLEdBQUcsS0FBS3JNLGNBQUwsQ0FBb0I2TCxhQUFwQixFQUFrQ3JPLFVBQWhEOztBQUVBLFlBQUk4TyxXQUFXLEdBQUcsS0FBS3JCLFlBQUwsRUFBbEI7O0FBQ0EsWUFBSXNCLFdBQVcsR0FBR0QsV0FBVyxHQUFHLElBQWhDO0FBRUEsWUFBSUUsUUFBUSxHQUFHRCxXQUFXLEdBQUdILEtBQTdCO0FBQ0EsWUFBSUssU0FBUyxHQUFHRixXQUFXLEdBQUdGLE9BQTlCO0FBRUEsWUFBSUssTUFBTSxHQUFHLENBQUNULFFBQVEsR0FBR0MsV0FBWixJQUEyQixNQUF4QztBQUVBLFlBQUlTLE1BQU0sR0FBRyxDQUFiO0FBQ0EsWUFBSVosUUFBUSxJQUFJLENBQWhCLEVBQW1CWSxNQUFNLEdBQUcsS0FBVCxDQUFuQixLQUNLLElBQUlaLFFBQVEsSUFBSSxDQUFoQixFQUFtQlksTUFBTSxHQUFHLFFBQVEsS0FBakIsQ0FBbkIsS0FDQSxJQUFJWixRQUFRLElBQUksQ0FBaEIsRUFBbUJZLE1BQU0sR0FBRyxRQUFRLEtBQVIsR0FBZ0IsS0FBekI7QUFFeEIsWUFBSUMsV0FBVyxHQUFHZCxLQUFLLEdBQUdZLE1BQVIsR0FBaUJDLE1BQWpCLEdBQTBCSCxRQUExQixHQUFxQ0MsU0FBckMsR0FBaUROLFVBQW5FO0FBRUEsYUFBS25NLGNBQUwsQ0FBb0I2TCxhQUFwQixFQUFrQzVOLFVBQWxDLEdBQStDMk8sV0FBL0M7QUFDQSxhQUFLNU0sY0FBTCxDQUFvQjZMLGFBQXBCLEVBQWtDM04sV0FBbEMsR0FBZ0R5TyxNQUFoRDtBQUNBLGFBQUszTSxjQUFMLENBQW9CNkwsYUFBcEIsRUFBa0MxTixXQUFsQyxHQUFnRHVPLE1BQWhEO0FBQ0EsYUFBSzFNLGNBQUwsQ0FBb0I2TCxhQUFwQixFQUFrQ3pOLGFBQWxDLEdBQWtEb08sUUFBbEQ7QUFDQSxhQUFLeE0sY0FBTCxDQUFvQjZMLGFBQXBCLEVBQWtDdk4sZUFBbEMsR0FBb0RtTyxTQUFwRDtBQUNBLGFBQUt6TSxjQUFMLENBQW9CNkwsYUFBcEIsRUFBa0N4TixnQkFBbEMsR0FBcUQ4TixVQUFyRDtBQUNEO0FBQ0Y7QUFDRixHQWhsQ3dCO0FBa2xDekJVLEVBQUFBLHlCQWxsQ3lCLHFDQWtsQ0NoSSxLQWxsQ0QsRUFrbENRO0FBQy9CaEcsSUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ29FLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNkVGLEtBQTdFO0FBQ0QsR0FwbEN3QjtBQXNsQ3pCaUksRUFBQUEsZ0NBdGxDeUIsNENBc2xDUWpJLEtBdGxDUixFQXNsQ2U7QUFDdENoRyxJQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDb0UsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RUYsS0FBOUU7QUFDRCxHQXhsQ3dCO0FBMGxDekJrSSxFQUFBQSxZQTFsQ3lCLHdCQTBsQ1pDLElBMWxDWSxFQTBsQ047QUFDakIsUUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFDQSxRQUFJQyxVQUFVLEdBQUcsRUFBakI7O0FBQ0EsUUFBSSxLQUFLMU0sWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLFVBQUksQ0FBQ3JHLGFBQUwsRUFBb0I7QUFDbEJBLFFBQUFBLGFBQWEsR0FBRyxJQUFoQjtBQUNBMEUsUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEOEwsY0FBOUQ7QUFDQXpOLFFBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0EsWUFBSTZILGVBQWUsR0FBRzFJLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RFcsWUFBOUQsR0FBNkVtRixpQkFBN0UsRUFBdEI7QUFDQSxZQUFJSyxNQUFNLEdBQUczSSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOEQyQixXQUE5RCxFQUFiO0FBQ0FTLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZc0osSUFBWjtBQUNBdkosUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk4RCxNQUFNLENBQUN2RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDckcsU0FBdEQ7QUFDQWdDLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUE3RixDQUErRzNFLFFBQS9HLEdBQTBILElBQTFIOztBQUVBLFlBQUlNLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYwQyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsSUFBOUgsRUFBb0k7QUFDbEksY0FBSTJDLE1BQU0sR0FBRyxDQUFDLENBQWQ7O0FBQ0EsZUFBSyxJQUFJbkYsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdtRSxlQUFlLENBQUNoRixNQUE1QyxFQUFvRGEsS0FBSyxFQUF6RCxFQUE2RDtBQUMzRCxnQkFBSW1FLGVBQWUsQ0FBQ25FLEtBQUQsQ0FBZixDQUF1QkgsZ0JBQXZCLENBQXdDQyxpQkFBeEMsQ0FBMERyRyxTQUExRCxJQUF1RW1RLElBQTNFLEVBQWlGO0FBQy9FekUsY0FBQUEsTUFBTSxHQUFHbkYsS0FBVDtBQUNBO0FBQ0Q7QUFDRjs7QUFFRDhKLFVBQUFBLFVBQVUsR0FBRyxpQkFBaUIzRixlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0J0RixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRHRHLFVBQXpGO0FBQ0FxUSxVQUFBQSxRQUFRLEdBQ04scUJBQ0ExRixlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0J0RixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRDVGLElBRDNELEdBRUEsSUFGQSxHQUdBLGlDQUhBLEdBSUFpSyxlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0J0RixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRGhGLFdBSjNELEdBS0EsSUFMQSxHQU1BLHVDQU5BLEdBT0FxSixlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0J0RixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRC9FLFdBUDNELEdBUUEsSUFSQSxHQVNBLGdCQVRBLEdBVUFvSixlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0J0RixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRDlFLGFBVjNELEdBV0EsSUFYQSxHQVlBLGtCQVpBLEdBYUFtSixlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0J0RixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRDVFLGVBYjNELEdBY0EsSUFkQSxHQWVBLGtCQWZBLEdBZ0JBaUosZUFBZSxDQUFDZ0IsTUFBRCxDQUFmLENBQXdCdEYsZ0JBQXhCLENBQXlDQyxpQkFBekMsQ0FBMkQ3RSxnQkFoQjNELEdBaUJBLElBakJBLEdBa0JBLHVCQWxCQSxHQW1CQWtKLGVBQWUsQ0FBQ2dCLE1BQUQsQ0FBZixDQUF3QnRGLGdCQUF4QixDQUF5Q0MsaUJBQXpDLENBQTJEakYsVUFuQjNELEdBb0JBLElBckJGO0FBdUJBWSxVQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBEaUwsZ0JBQTFELENBQTJFRixVQUEzRSxFQUF1RkQsUUFBdkY7QUFDRCxTQWxDRCxNQWtDTztBQUNMLGNBQUl6RixNQUFNLENBQUN2RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDckcsU0FBMUMsSUFBdURtUSxJQUEzRCxFQUFpRTtBQUMvRDtBQUNBRSxZQUFBQSxVQUFVLEdBQUcsa0NBQWI7QUFDQUQsWUFBQUEsUUFBUSxHQUNOLHFCQUNBekYsTUFBTSxDQUFDdkUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQzVGLElBRDFDLEdBRUEsSUFGQSxHQUdBLGlDQUhBLEdBSUFrSyxNQUFNLENBQUN2RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDaEYsV0FKMUMsR0FLQSxJQUxBLEdBTUEsdUNBTkEsR0FPQXNKLE1BQU0sQ0FBQ3ZFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMEMvRSxXQVAxQyxHQVFBLElBUkEsR0FTQSxnQkFUQSxHQVVBcUosTUFBTSxDQUFDdkUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQzlFLGFBVjFDLEdBV0EsSUFYQSxHQVlBLGtCQVpBLEdBYUFvSixNQUFNLENBQUN2RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDNUUsZUFiMUMsR0FjQSxJQWRBLEdBZUEsa0JBZkEsR0FnQkFrSixNQUFNLENBQUN2RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDN0UsZ0JBaEIxQyxHQWlCQSxJQWpCQSxHQWtCQSx1QkFsQkEsR0FtQkFtSixNQUFNLENBQUN2RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDakYsVUFuQjFDLEdBb0JBLElBckJGOztBQXVCQSxnQkFBSW9QLFlBQVksR0FBRzNDLFFBQVEsQ0FBQzdMLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0M0TSxpQkFBbEMsR0FBc0RDLFdBQXRELENBQWtFQyxRQUFuRSxDQUEzQjs7QUFDQSxnQkFBSUMsTUFBTSxHQUFHSixZQUFZLEdBQUczQyxRQUFRLENBQUNsRCxNQUFNLENBQUN2RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDakYsVUFBM0MsQ0FBcEM7O0FBQ0FZLFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0M0TSxpQkFBbEMsR0FBc0RDLFdBQXRELENBQWtFQyxRQUFsRSxHQUE2RUMsTUFBTSxDQUFDQyxRQUFQLEVBQTdFOztBQUVBLGdCQUFJQyxJQUFJLEdBQUdqRCxRQUFRLENBQUM3TCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDNE0saUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUssUUFBbkUsQ0FBbkI7O0FBQ0FELFlBQUFBLElBQUksR0FBR0EsSUFBSSxHQUFHLENBQWQ7QUFDQTlPLFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0M0TSxpQkFBbEMsR0FBc0RDLFdBQXRELENBQWtFSyxRQUFsRSxHQUE2RUQsSUFBSSxDQUFDRCxRQUFMLEVBQTdFO0FBRUE3TyxZQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDNE0saUJBQWxDLEdBQXNETyxjQUF0RCxDQUFxRUosTUFBckUsRUFBNkVFLElBQTdFLEVBQW1GLENBQUMsQ0FBcEY7QUFFQTlPLFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMERpTCxnQkFBMUQsQ0FBMkVGLFVBQTNFLEVBQXVGRCxRQUF2RjtBQUNELFdBckNELE1BcUNPO0FBQ0w7QUFDQUMsWUFBQUEsVUFBVSxHQUFHLHdDQUFiO0FBQ0FELFlBQUFBLFFBQVEsR0FDTixxQkFDQXpGLE1BQU0sQ0FBQ3ZFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMEM1RixJQUQxQyxHQUVBLElBRkEsR0FHQSxpQ0FIQSxHQUlBa0ssTUFBTSxDQUFDdkUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ2hGLFdBSjFDLEdBS0EsSUFMQSxHQU1BLHVDQU5BLEdBT0FzSixNQUFNLENBQUN2RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDL0UsV0FQMUMsR0FRQSxJQVJBLEdBU0EsZ0JBVEEsR0FVQXFKLE1BQU0sQ0FBQ3ZFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMEM5RSxhQVYxQyxHQVdBLElBWEEsR0FZQSxrQkFaQSxHQWFBb0osTUFBTSxDQUFDdkUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQzVFLGVBYjFDLEdBY0EsSUFkQSxHQWVBLGtCQWZBLEdBZ0JBa0osTUFBTSxDQUFDdkUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQzdFLGdCQWhCMUMsR0FpQkEsSUFqQkEsR0FrQkEsdUJBbEJBLEdBbUJBbUosTUFBTSxDQUFDdkUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ2pGLFVBbkIxQyxHQW9CQSxJQXJCRjtBQXVCQVksWUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRGlMLGdCQUExRCxDQUEyRUYsVUFBM0UsRUFBdUZELFFBQXZGO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsS0FsSEQsTUFrSE8sSUFBSSxLQUFLek0sWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQztBQUNBZCxNQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBLFVBQUk2SCxlQUFlLEdBQUcsS0FBS3ZILGNBQTNCO0FBQ0EsVUFBSXdILE1BQU0sR0FBRyxLQUFLeEgsY0FBTCxDQUFvQixDQUFwQixDQUFiO0FBQ0F5RCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXNKLElBQVo7QUFDQXZKLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEQsTUFBTSxDQUFDM0ssU0FBbkI7QUFDQSxXQUFLbUQsY0FBTCxDQUFvQixDQUFwQixFQUF1QnpCLFFBQXZCLEdBQWtDLElBQWxDOztBQUVBLFVBQUlpSixNQUFNLENBQUMzSyxTQUFQLElBQW9CbVEsSUFBeEIsRUFBOEI7QUFDNUI7QUFDQUUsUUFBQUEsVUFBVSxHQUFHLGtDQUFiO0FBQ0FELFFBQUFBLFFBQVEsR0FDTixxQkFDQXpGLE1BQU0sQ0FBQ2xLLElBRFAsR0FFQSxJQUZBLEdBR0EsaUNBSEEsR0FJQWtLLE1BQU0sQ0FBQ3RKLFdBSlAsR0FLQSxJQUxBLEdBTUEsdUNBTkEsR0FPQXNKLE1BQU0sQ0FBQ3JKLFdBUFAsR0FRQSxJQVJBLEdBU0EsZ0JBVEEsR0FVQXFKLE1BQU0sQ0FBQ3BKLGFBVlAsR0FXQSxJQVhBLEdBWUEsa0JBWkEsR0FhQW9KLE1BQU0sQ0FBQ2xKLGVBYlAsR0FjQSxJQWRBLEdBZUEsa0JBZkEsR0FnQkFrSixNQUFNLENBQUNuSixnQkFoQlAsR0FpQkEsSUFqQkEsR0FrQkEsdUJBbEJBLEdBbUJBbUosTUFBTSxDQUFDdkosVUFuQlAsR0FvQkEsSUFwQkEsR0FxQkEsOEJBckJBLEdBc0JBLEtBQUsrQixjQUFMLENBQW9CLENBQXBCLEVBQXVCL0IsVUF0QnZCLEdBdUJBLElBeEJGOztBQTBCQSxZQUFJb1AsWUFBWSxHQUFHM0MsUUFBUSxDQUFDN0wsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzRNLGlCQUFsQyxHQUFzREMsV0FBdEQsQ0FBa0VDLFFBQW5FLENBQTNCOztBQUNBLFlBQUlDLE1BQU0sR0FBR0osWUFBWSxHQUFHM0MsUUFBUSxDQUFDbEQsTUFBTSxDQUFDdkosVUFBUixDQUFwQzs7QUFDQVksUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzRNLGlCQUFsQyxHQUFzREMsV0FBdEQsQ0FBa0VDLFFBQWxFLEdBQTZFQyxNQUFNLENBQUNDLFFBQVAsRUFBN0U7O0FBRUEsWUFBSUMsSUFBSSxHQUFHakQsUUFBUSxDQUFDN0wsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzRNLGlCQUFsQyxHQUFzREMsV0FBdEQsQ0FBa0VLLFFBQW5FLENBQW5COztBQUNBRCxRQUFBQSxJQUFJLEdBQUdBLElBQUksR0FBRyxDQUFkO0FBQ0E5TyxRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDNE0saUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUssUUFBbEUsR0FBNkVELElBQUksQ0FBQ0QsUUFBTCxFQUE3RTtBQUNBN08sUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzRNLGlCQUFsQyxHQUFzRE8sY0FBdEQsQ0FBcUVKLE1BQXJFLEVBQTZFRSxJQUE3RSxFQUFtRixDQUFDLENBQXBGO0FBRUE5TyxRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBEaUwsZ0JBQTFELENBQTJFRixVQUEzRSxFQUF1RkQsUUFBdkY7QUFDRCxPQXZDRCxNQXVDTztBQUNMO0FBRUFDLFFBQUFBLFVBQVUsR0FBRyx3Q0FBYjtBQUNBRCxRQUFBQSxRQUFRLEdBQ04scUJBQ0F6RixNQUFNLENBQUNsSyxJQURQLEdBRUEsSUFGQSxHQUdBLGlDQUhBLEdBSUFrSyxNQUFNLENBQUN0SixXQUpQLEdBS0EsSUFMQSxHQU1BLHVDQU5BLEdBT0FzSixNQUFNLENBQUNySixXQVBQLEdBUUEsSUFSQSxHQVNBLGdCQVRBLEdBVUFxSixNQUFNLENBQUNwSixhQVZQLEdBV0EsSUFYQSxHQVlBLGtCQVpBLEdBYUFvSixNQUFNLENBQUNsSixlQWJQLEdBY0EsSUFkQSxHQWVBLGtCQWZBLEdBZ0JBa0osTUFBTSxDQUFDbkosZ0JBaEJQLEdBaUJBLElBakJBLEdBa0JBLHVCQWxCQSxHQW1CQW1KLE1BQU0sQ0FBQ3ZKLFVBbkJQLEdBb0JBLElBcEJBLEdBcUJBLDhCQXJCQSxHQXNCQSxLQUFLK0IsY0FBTCxDQUFvQixDQUFwQixFQUF1Qi9CLFVBdEJ2QixHQXVCQSxJQXhCRjtBQTBCQVksUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRGlMLGdCQUExRCxDQUEyRUYsVUFBM0UsRUFBdUZELFFBQXZGO0FBQ0Q7QUFDRjtBQUNGLEdBaHlDd0I7QUFreUN6QmEsRUFBQUEsb0JBbHlDeUIsZ0NBa3lDSmpKLEtBbHlDSSxFQWt5Q0c7QUFBQTs7QUFDMUIsUUFBSThHLE1BQU0sR0FBRzlHLEtBQUssQ0FBQ2tKLEdBQW5COztBQUNBLFFBQUlwQyxNQUFKLEVBQVk7QUFDVixXQUFLRCxnQkFBTCxDQUFzQixJQUF0QixFQUE0QixLQUE1QjtBQUVBN00sTUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRGlGLFNBQTFELENBQW9FLHNDQUFwRSxFQUE0RyxJQUE1RyxFQUFrSCxLQUFsSDtBQUNBaEMsTUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixRQUFBLE1BQUksQ0FBQzRJLGlCQUFMOztBQUVBLFlBQUlDLEdBQUcsR0FBRyxDQUFDLENBQVg7QUFDQSxZQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxZQUFJQyxXQUFXLEdBQUcsTUFBSSxDQUFDbk8sY0FBdkI7O0FBRUEsYUFBSyxJQUFJb0QsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcrSyxXQUFXLENBQUM1TCxNQUF4QyxFQUFnRGEsS0FBSyxFQUFyRCxFQUF5RDtBQUN2RCxjQUFJZ0wsTUFBTSxHQUFHRCxXQUFXLENBQUMvSyxLQUFELENBQVgsQ0FBbUJuRixVQUFoQzs7QUFFQSxjQUFJbVEsTUFBTSxHQUFHSCxHQUFiLEVBQWtCO0FBQ2hCQyxZQUFBQSxXQUFXLEdBQUc5SyxLQUFkO0FBQ0E2SyxZQUFBQSxHQUFHLEdBQUdHLE1BQU47QUFDRDtBQUNGOztBQUVELGFBQUssSUFBSWhMLE9BQUssR0FBRyxDQUFqQixFQUFvQkEsT0FBSyxHQUFHK0ssV0FBVyxDQUFDNUwsTUFBeEMsRUFBZ0RhLE9BQUssRUFBckQsRUFBeUQ7QUFDdkQsY0FBSStLLFdBQVcsQ0FBQy9LLE9BQUQsQ0FBWCxDQUFtQjVFLFFBQXZCLEVBQWlDO0FBQy9CLGdCQUFJNFAsTUFBTSxHQUFHRCxXQUFXLENBQUMvSyxPQUFELENBQVgsQ0FBbUJuRixVQUFoQztBQUNBd0YsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkwSyxNQUFaO0FBQ0Q7QUFDRjs7QUFFRDNLLFFBQUFBLE9BQU8sQ0FBQzRLLEtBQVIsQ0FBYyw0QkFBNEJGLFdBQVcsQ0FBQ0QsV0FBRCxDQUFYLENBQXlCclIsU0FBbkU7O0FBQ0EsUUFBQSxNQUFJLENBQUNnUSx5QkFBTCxDQUErQnNCLFdBQVcsQ0FBQ0QsV0FBRCxDQUFYLENBQXlCclIsU0FBeEQ7QUFDRCxPQXpCUyxFQXlCUCxJQXpCTyxDQUFWO0FBMEJELEtBOUJELE1BOEJPO0FBQ0wsVUFBSWdDLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYwQyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsS0FBOUgsRUFBcUk7QUFDbkksYUFBSzhGLGdCQUFMLENBQXNCLEtBQXRCLEVBQTZCLEtBQTdCO0FBRUE3TSxRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBEaUYsU0FBMUQsQ0FBb0Usc0NBQXBFLEVBQTRHLElBQTVHLEVBQWtILEtBQWxIO0FBQ0FoQyxRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmM0IsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk3RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOERXLFlBQTlELEdBQTZFbUYsaUJBQTdFLEVBQVo7O0FBQ0EsVUFBQSxNQUFJLENBQUM2RyxpQkFBTDs7QUFFQSxVQUFBLE1BQUksQ0FBQzNLLHdCQUFMLENBQThCLENBQTlCOztBQUVBLGNBQUk0SyxHQUFHLEdBQUcsQ0FBQyxDQUFYO0FBQ0EsY0FBSUMsV0FBVyxHQUFHLENBQWxCO0FBQ0EsY0FBSUMsV0FBVyxHQUFHLE1BQUksQ0FBQ25PLGNBQXZCO0FBQ0F5RCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXlLLFdBQVo7O0FBRUEsZUFBSyxJQUFJL0ssS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcrSyxXQUFXLENBQUM1TCxNQUF4QyxFQUFnRGEsS0FBSyxFQUFyRCxFQUF5RDtBQUN2RCxnQkFBSStLLFdBQVcsQ0FBQy9LLEtBQUQsQ0FBWCxDQUFtQjVFLFFBQXZCLEVBQWlDO0FBQy9CLGtCQUFJNFAsTUFBTSxHQUFHRCxXQUFXLENBQUMvSyxLQUFELENBQVgsQ0FBbUJuRixVQUFoQzs7QUFFQSxrQkFBSW1RLE1BQU0sR0FBR0gsR0FBYixFQUFrQjtBQUNoQkMsZ0JBQUFBLFdBQVcsR0FBRzlLLEtBQWQ7QUFDQTZLLGdCQUFBQSxHQUFHLEdBQUdHLE1BQU47QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsZUFBSyxJQUFJaEwsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUcrSyxXQUFXLENBQUM1TCxNQUF4QyxFQUFnRGEsT0FBSyxFQUFyRCxFQUF5RDtBQUN2RCxnQkFBSStLLFdBQVcsQ0FBQy9LLE9BQUQsQ0FBWCxDQUFtQjVFLFFBQXZCLEVBQWlDO0FBQy9CLGtCQUFJNFAsTUFBTSxHQUFHRCxXQUFXLENBQUMvSyxPQUFELENBQVgsQ0FBbUJuRixVQUFoQztBQUNBd0YsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkwSyxNQUFaO0FBQ0Q7QUFDRjs7QUFFRDNLLFVBQUFBLE9BQU8sQ0FBQzRLLEtBQVIsQ0FBYyw0QkFBNEJGLFdBQVcsQ0FBQ0QsV0FBRCxDQUFYLENBQXlCclIsU0FBbkU7O0FBQ0EsVUFBQSxNQUFJLENBQUNnUSx5QkFBTCxDQUErQnNCLFdBQVcsQ0FBQ0QsV0FBRCxDQUFYLENBQXlCclIsU0FBeEQ7QUFDRCxTQS9CUyxFQStCUCxJQS9CTyxDQUFWO0FBZ0NEO0FBQ0Y7QUFDRixHQXoyQ3dCO0FBMjJDekI0TyxFQUFBQSx1QkEzMkN5QixtQ0EyMkNERSxNQTMyQ0MsRUEyMkNlO0FBQUEsUUFBaEJBLE1BQWdCO0FBQWhCQSxNQUFBQSxNQUFnQixHQUFQLEtBQU87QUFBQTs7QUFDdEMsUUFBSTlHLEtBQUssR0FBRztBQUFFa0osTUFBQUEsR0FBRyxFQUFFcEM7QUFBUCxLQUFaO0FBQ0EsU0FBS21CLGdDQUFMLENBQXNDakksS0FBdEM7QUFDRCxHQTkyQ3dCO0FBZzNDekJ0RyxFQUFBQSxRQWgzQ3lCLG9CQWczQ2hCcU4sY0FoM0NnQixFQWczQ1E7QUFBQTs7QUFBQSxRQUF4QkEsY0FBd0I7QUFBeEJBLE1BQUFBLGNBQXdCLEdBQVAsS0FBTztBQUFBOztBQUMvQixRQUFJLEtBQUtwTCxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0EsVUFBSW9MLGNBQUosRUFBb0I7QUFDbEIsYUFBS29DLGlCQUFMO0FBQ0Q7O0FBRUQsVUFBSW5QLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYwQyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsS0FBOUgsRUFBcUk7QUFDbkksYUFBS3ZDLHdCQUFMLENBQThCLENBQTlCO0FBRUEsWUFBSWtFLGVBQWUsR0FBRzFJLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RFcsWUFBOUQsR0FBNkVtRixpQkFBN0UsRUFBdEI7QUFDQSxZQUFJbUgsZUFBZSxHQUFHLENBQXRCO0FBRUEsYUFBS3RPLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDbEQsY0FBckMsR0FBc0QsSUFBdEQsQ0FObUksQ0FRbkk7QUFDQTtBQUNBOztBQUVBLGFBQUssSUFBSW9GLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUtwRCxjQUFMLENBQW9CdUMsTUFBaEQsRUFBd0RhLEtBQUssRUFBN0QsRUFBaUU7QUFDL0QsY0FBSSxLQUFLcEQsY0FBTCxDQUFvQm9ELEtBQXBCLEVBQTJCNUUsUUFBM0IsSUFBdUMsS0FBdkMsSUFBZ0QsS0FBS3dCLGNBQUwsQ0FBb0JvRCxLQUFwQixFQUEyQnBGLGNBQS9FLEVBQStGc1EsZUFBZTtBQUMvRzs7QUFFRDdLLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVCQUF1QjRLLGVBQW5DO0FBQ0E3SyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw2QkFBNkIsS0FBSzFELGNBQUwsQ0FBb0J1QyxNQUE3RDs7QUFDQSxZQUFJK0wsZUFBZSxJQUFJLEtBQUt0TyxjQUFMLENBQW9CdUMsTUFBdkMsSUFBaURxSixjQUFyRCxFQUFxRTtBQUNuRTtBQUNBbE0sVUFBQUEsVUFBVSxHQUFHLElBQWI7O0FBQ0EsY0FBSWtNLGNBQUosRUFBb0I7QUFDbEJ4RyxZQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLGNBQUEsTUFBSSxDQUFDcUcsdUJBQUwsQ0FBNkIsS0FBN0I7QUFDRCxhQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsV0FKRCxNQUlPLElBQUksS0FBS3pMLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDckUsU0FBckMsSUFBa0RnQyx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOEQyQixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGYSxJQUE3RixDQUFrR1csTUFBeEosRUFBZ0s7QUFDckssZ0JBQUksQ0FBQ3pGLFlBQUQsSUFBaUIsQ0FBQ0MsWUFBdEIsRUFBb0M7QUFDbEMsbUJBQUt3TSx1QkFBTCxDQUE2QixLQUE3QjtBQUNELGFBRkQsTUFFTztBQUNMN00sY0FBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQSxtQkFBSzRNLGdCQUFMO0FBQ0Q7QUFDRjtBQUNGLFNBZkQsTUFlTztBQUNMLGNBQUksQ0FBQzlMLFVBQUwsRUFBaUI7QUFDZixnQkFBSSxLQUFLTSxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3JFLFNBQXJDLElBQWtEZ0Msd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEMkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RmEsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLGtCQUFJLENBQUN6RixZQUFELElBQWlCLENBQUNDLFlBQXRCLEVBQW9DO0FBQ2xDTCxnQkFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQSxxQkFBSzRNLGdCQUFMO0FBQ0Q7QUFDRixhQUxELE1BS087QUFDTDVNLGNBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0EsbUJBQUs0TSxnQkFBTDtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0YsS0FyREQsTUFxRE8sSUFBSSxLQUFLaEwsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQztBQUNBLFVBQUksS0FBS1IsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNuRSxLQUF6QyxFQUFnRG5ELFdBQVcsR0FBRyxJQUFkLENBQWhELEtBQ0tELFlBQVksR0FBRyxJQUFmO0FBRUw4SixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBbUIvSixZQUEvQjtBQUNBOEosTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQWtCOUosV0FBOUIsRUFOaUMsQ0FPakM7O0FBQ0EsVUFBSTBVLGVBQWUsR0FBRyxDQUF0QjtBQUNBLFdBQUt0TyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ2xELGNBQXJDLEdBQXNELElBQXREO0FBRUEsVUFBSXVKLGVBQWUsR0FBRyxLQUFLdkgsY0FBM0I7O0FBQ0EsV0FBSyxJQUFJb0QsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUdtRSxlQUFlLENBQUNoRixNQUE1QyxFQUFvRGEsT0FBSyxFQUF6RCxFQUE2RDtBQUMzRCxZQUFJbUUsZUFBZSxDQUFDbkUsT0FBRCxDQUFmLENBQXVCcEYsY0FBM0IsRUFBMkNzUSxlQUFlO0FBQzNEOztBQUVELFVBQUlBLGVBQWUsSUFBSSxLQUFLdE8sY0FBTCxDQUFvQnVDLE1BQTNDLEVBQW1EO0FBQ2pEO0FBQ0EzSSxRQUFBQSxXQUFXLEdBQUcsSUFBZDtBQUNBRCxRQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNBK0YsUUFBQUEsVUFBVSxHQUFHLElBQWI7O0FBRUEsWUFBSSxDQUFDVixZQUFELElBQWlCLENBQUNDLFlBQXRCLEVBQW9DO0FBQ2xDLGVBQUt3TSx1QkFBTCxDQUE2QixJQUE3QjtBQUNEO0FBQ0YsT0FURCxNQVNPO0FBQ0wsWUFBSSxDQUFDL0wsVUFBTCxFQUFpQjtBQUNmLGNBQUksQ0FBQ1YsWUFBRCxJQUFpQixDQUFDQyxZQUF0QixFQUFvQztBQUNsQ0wsWUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQSxpQkFBSzRNLGdCQUFMO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRixHQXg4Q3dCO0FBeThDekJILEVBQUFBLGFBQWEsRUFBRSx5QkFBWTtBQUFBOztBQUN6QixRQUFJNU0sV0FBVyxJQUFJSSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZCLE1BQTdFLEVBQXFGO0FBQ25Ga0IsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksVUFBWjtBQUNBLFdBQUs2SyxhQUFMO0FBRUFuSixNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFFBQUEsTUFBSSxDQUFDN0csUUFBTCxDQUFjLEtBQWQ7QUFDRCxPQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsS0FQRCxNQU9PO0FBQ0wsVUFBSSxDQUFDbUIsVUFBTCxFQUFpQjtBQUNmaEIsUUFBQUEsUUFBUSxHQUFHQSxRQUFRLEdBQUcsQ0FBdEI7O0FBQ0EsWUFBSWlGLE1BQU0sR0FBR3JKLEVBQUUsQ0FBQ3NKLElBQUgsQ0FBUS9FLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NtRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEckYsV0FBMUQsRUFBdUVzRixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHQyxDQUExRyxFQUE2R3BGLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NtRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEckYsV0FBMUQsRUFBdUVzRixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHRSxDQUEvTSxDQUFiOztBQUNBLGFBQUtzSyxXQUFMLENBQWlCLEtBQUtsTyxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLENBQWpCLEVBQXVEeUMsTUFBdkQ7QUFDRDtBQUNGO0FBQ0YsR0F4OUN3QjtBQTA5Q3pCd0UsRUFBQUEsU0FBUyxFQUFFLG1CQUFVc0csR0FBVixFQUFlUixHQUFmLEVBQW9CO0FBQzdCLFdBQU9TLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBaUJYLEdBQUcsR0FBR1EsR0FBdkIsQ0FBWCxJQUEwQ0EsR0FBakQsQ0FENkIsQ0FDeUI7QUFDdkQsR0E1OUN3QjtBQTg5Q3pCckUsRUFBQUEsV0FBVyxFQUFFLHFCQUFVRCxJQUFWLEVBQWdCMEUsTUFBaEIsRUFBd0JDLElBQXhCLEVBQThCO0FBQUE7O0FBQ3pDeFUsSUFBQUEsRUFBRSxDQUFDeVUsS0FBSCxDQUFTLEtBQUszTyxVQUFkLEVBQ0c0TyxFQURILENBQ01GLElBRE4sRUFDWTtBQUFFOUssTUFBQUEsUUFBUSxFQUFFMUosRUFBRSxDQUFDMlUsRUFBSCxDQUFNOUUsSUFBSSxDQUFDbEcsQ0FBWCxFQUFja0csSUFBSSxDQUFDakcsQ0FBbkI7QUFBWixLQURaLEVBQ2lEO0FBQUVnTCxNQUFBQSxNQUFNLEVBQUU7QUFBVixLQURqRCxFQUVHQyxJQUZILENBRVEsWUFBTTtBQUNWLFVBQUlOLE1BQUosRUFBWSxNQUFJLENBQUNPLFlBQUwsR0FBWixLQUNLLE1BQUksQ0FBQ2IsYUFBTDtBQUNOLEtBTEgsRUFNR2MsS0FOSDtBQU9ELEdBdCtDd0I7QUF3K0N6QkQsRUFBQUEsWUF4K0N5QiwwQkF3K0NWO0FBQUE7O0FBQ2JoSyxJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFVBQUksTUFBSSxDQUFDeEQsTUFBTCxDQUFZMEgsU0FBWixHQUF3QixDQUE1QixFQUErQjtBQUM3QixRQUFBLE1BQUksQ0FBQzFILE1BQUwsQ0FBWTBILFNBQVosR0FBd0IsTUFBSSxDQUFDMUgsTUFBTCxDQUFZMEgsU0FBWixHQUF3QixJQUFoRDs7QUFDQSxRQUFBLE1BQUksQ0FBQzhGLFlBQUw7QUFDRCxPQUhELE1BR087QUFDTCxRQUFBLE1BQUksQ0FBQ3hOLE1BQUwsQ0FBWTBILFNBQVosR0FBd0IsQ0FBeEI7QUFDQSxRQUFBLE1BQUksQ0FBQ3hILGVBQUwsR0FBdUIsSUFBdkI7O0FBQ0EsUUFBQSxNQUFJLENBQUN1SixhQUFMO0FBQ0Q7QUFDRixLQVRTLEVBU1AsRUFUTyxDQUFWO0FBVUQsR0FuL0N3QjtBQXEvQ3pCaUUsRUFBQUEscUJBci9DeUIsaUNBcS9DSDNELE1Bci9DRyxFQXEvQ2E7QUFBQSxRQUFoQkEsTUFBZ0I7QUFBaEJBLE1BQUFBLE1BQWdCLEdBQVAsS0FBTztBQUFBOztBQUNwQyxRQUFJbE4sV0FBVyxHQUFHSSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZCLE1BQTVFLEVBQW9GO0FBQ2xGLFVBQUltSSxRQUFRLENBQUM3TCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJGLFdBQTFELEVBQXVFc0YsaUJBQXZFLENBQXlGbEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0g4SSxTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUF3SixDQUE1SixFQUErSjtBQUM3SjVMLFFBQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0FsRixRQUFBQSxtQkFBbUIsR0FBR0EsbUJBQW1CLEdBQUcsQ0FBNUM7QUFDRDs7QUFFRCxVQUFJNFEsUUFBUSxDQUFDN0wsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RmxDLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIOEksU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQVIsSUFBd0osQ0FBNUosRUFBK0o7QUFDN0ozTCxRQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNBbEYsUUFBQUEsbUJBQW1CO0FBQ25CRCxRQUFBQSxtQkFBbUI7QUFDcEI7QUFDRjs7QUFFRG9GLElBQUFBLGtCQUFrQixHQUFHLEtBQUtjLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDakUsaUJBQXJDLENBQXVEYixpQkFBNUU7O0FBQ0EsUUFBSTRDLFlBQVksSUFBSSxDQUFDQyxZQUFqQixJQUFpQyxDQUFDQyxrQkFBdEMsRUFBMEQ7QUFDeEQ7QUFDQTtBQUNBLFdBQUtxUSwwQkFBTCxDQUFnQyxLQUFoQyxFQUF1QzVELE1BQXZDO0FBQ0QsS0FKRCxNQUlPLElBQUkxTSxZQUFZLElBQUtELFlBQVksSUFBSUUsa0JBQXJDLEVBQTBEO0FBQy9EO0FBQ0E7QUFDQSxXQUFLcVEsMEJBQUwsQ0FBZ0MsSUFBaEMsRUFBc0M1RCxNQUF0QztBQUNELEtBSk0sTUFJQTtBQUNMLFdBQUtULFlBQUw7QUFDRDtBQUNGLEdBL2dEd0I7QUFpaER6QjhDLEVBQUFBLGlCQWpoRHlCLCtCQWloREw7QUFBQTs7QUFDbEI1SSxJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFVBQUksTUFBSSxDQUFDeEQsTUFBTCxDQUFZMEgsU0FBWixJQUF5QixDQUE3QixFQUFnQztBQUM5QixRQUFBLE1BQUksQ0FBQ3hILGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxRQUFBLE1BQUksQ0FBQ0YsTUFBTCxDQUFZMEgsU0FBWixHQUF3QixNQUFJLENBQUMxSCxNQUFMLENBQVkwSCxTQUFaLEdBQXdCLElBQWhEOztBQUNBLFFBQUEsTUFBSSxDQUFDMEUsaUJBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxRQUFBLE1BQUksQ0FBQzVOLFVBQUwsQ0FBZ0I0RCxRQUFoQixHQUEyQjFKLEVBQUUsQ0FBQ3NKLElBQUgsQ0FBUSxDQUFSLEVBQVcsQ0FBWCxDQUEzQjtBQUNBLFFBQUEsTUFBSSxDQUFDaEMsTUFBTCxDQUFZMEgsU0FBWixHQUF3QixDQUF4QjtBQUNEO0FBQ0YsS0FUUyxFQVNQLEVBVE8sQ0FBVjtBQVVELEdBNWhEd0I7QUE4aER6QmlGLEVBQUFBLGFBOWhEeUIsMkJBOGhEVDtBQUFBOztBQUNkbkosSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixVQUFJLE9BQUksQ0FBQ3hELE1BQUwsQ0FBWTBILFNBQVosSUFBeUIsQ0FBN0IsRUFBZ0M7QUFDOUIsUUFBQSxPQUFJLENBQUN4SCxlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsUUFBQSxPQUFJLENBQUNGLE1BQUwsQ0FBWTBILFNBQVosR0FBd0IsT0FBSSxDQUFDMUgsTUFBTCxDQUFZMEgsU0FBWixHQUF3QixJQUFoRDs7QUFDQSxRQUFBLE9BQUksQ0FBQ2lGLGFBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxRQUFBLE9BQUksQ0FBQ25PLFVBQUwsQ0FBZ0I0RCxRQUFoQixHQUEyQjFKLEVBQUUsQ0FBQ3NKLElBQUgsQ0FBUSxDQUFSLEVBQVcsQ0FBWCxDQUEzQjtBQUNBLFFBQUEsT0FBSSxDQUFDaEMsTUFBTCxDQUFZMEgsU0FBWixHQUF3QixDQUF4QixDQUZLLENBR0w7O0FBQ0F6SyxRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBENkgsMkJBQTFELENBQXNGLENBQXRGOztBQUVBLFlBQUksT0FBSSxDQUFDeEosWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixjQUFJLE9BQUksQ0FBQ1IsY0FBTCxDQUFvQixPQUFJLENBQUNrQixVQUF6QixFQUFxQ25FLEtBQXJDLElBQThDLENBQUNuRCxXQUFuRCxFQUFnRTtBQUM5RCxZQUFBLE9BQUksQ0FBQzBWLHFCQUFMLENBQTJCLE9BQUksQ0FBQ3RQLGNBQUwsQ0FBb0IsT0FBSSxDQUFDa0IsVUFBekIsRUFBcUNuRSxLQUFoRTtBQUNELFdBRkQsTUFFTztBQUNMLGdCQUFJLENBQUMsT0FBSSxDQUFDaUQsY0FBTCxDQUFvQixPQUFJLENBQUNrQixVQUF6QixFQUFxQ25FLEtBQXRDLElBQStDLENBQUNwRCxZQUFwRCxFQUFrRTtBQUNoRSxjQUFBLE9BQUksQ0FBQzJWLHFCQUFMLENBQTJCLE9BQUksQ0FBQ3RQLGNBQUwsQ0FBb0IsT0FBSSxDQUFDa0IsVUFBekIsRUFBcUNuRSxLQUFoRTtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxZQUFJLE9BQUksQ0FBQ3lELFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQSxjQUFJdkcsVUFBSixFQUFnQjtBQUNkO0FBQ0FBLFlBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0Q7O0FBRUQsY0FBSSxPQUFJLENBQUMrRixjQUFMLENBQW9CLE9BQUksQ0FBQ2tCLFVBQXpCLEVBQXFDckUsU0FBckMsSUFBa0RnQyx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOEQyQixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGYSxJQUE3RixDQUFrR1csTUFBeEosRUFBZ0ssT0FBSSxDQUFDNksscUJBQUwsR0FBaEssS0FDSyxPQUFJLENBQUNwRSxZQUFMO0FBQ047QUFDRjtBQUNGLEtBaENTLEVBZ0NQLEVBaENPLENBQVY7QUFpQ0QsR0Foa0R3QjtBQWtrRHpCc0QsRUFBQUEsV0FBVyxFQUFFLHFCQUFVck8sSUFBVixFQUFnQnFQLEtBQWhCLEVBQXVCO0FBQUE7O0FBQ2xDbFYsSUFBQUEsRUFBRSxDQUFDeVUsS0FBSCxDQUFTNU8sSUFBVCxFQUFlO0FBQWYsS0FDRzZPLEVBREgsQ0FDTSxHQUROLEVBQ1c7QUFBRWhMLE1BQUFBLFFBQVEsRUFBRTFKLEVBQUUsQ0FBQzJVLEVBQUgsQ0FBTU8sS0FBSyxDQUFDdkwsQ0FBWixFQUFldUwsS0FBSyxDQUFDdEwsQ0FBckI7QUFBWixLQURYLEVBQ2tEO0FBQUVnTCxNQUFBQSxNQUFNLEVBQUU7QUFBVixLQURsRCxFQUVHQyxJQUZILENBRVEsWUFBTTtBQUNWLFVBQUl6USxRQUFRLEdBQUdDLFFBQWYsRUFBeUI7QUFDdkI7QUFFQSxZQUFJLE9BQUksQ0FBQzZCLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQSxjQUFJLE9BQUksQ0FBQ1IsY0FBTCxDQUFvQixPQUFJLENBQUNrQixVQUF6QixFQUFxQ25FLEtBQXpDLEVBQWdEO0FBQzlDLGdCQUFJLENBQUNuRCxXQUFMLEVBQWtCO0FBQ2hCLGtCQUNFOFEsUUFBUSxDQUFDN0wsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RmxDLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIOEksU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQVIsSUFBd0osQ0FBeEosSUFDQUYsUUFBUSxDQUFDN0wsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RmxDLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIOEksU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQVIsSUFBd0osQ0FGMUosRUFHRTtBQUNBNUwsZ0JBQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0FsRixnQkFBQUEsbUJBQW1CO0FBQ3BCO0FBQ0YsYUFSRCxNQVFPO0FBQ0wySixjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUNEO0FBQ0YsV0FaRCxNQVlPO0FBQ0wsZ0JBQUksQ0FBQy9KLFlBQUwsRUFBbUI7QUFDakIsa0JBQ0UrUSxRQUFRLENBQUM3TCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJGLFdBQTFELEVBQXVFc0YsaUJBQXZFLENBQXlGbEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0g4SSxTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUF3SixDQUF4SixJQUNBRixRQUFRLENBQUM3TCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJGLFdBQTFELEVBQXVFc0YsaUJBQXZFLENBQXlGbEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0g4SSxTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUF3SixDQUYxSixFQUdFO0FBQ0E1TCxnQkFBQUEsWUFBWSxHQUFHLElBQWY7QUFDQWxGLGdCQUFBQSxtQkFBbUI7QUFDcEIsZUFQZ0IsQ0FTakI7O0FBQ0QsYUFWRCxNQVVPO0FBQ0wySixjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw0QkFBWjtBQUNEO0FBQ0YsV0E1QnlCLENBOEIxQjs7QUFDRDs7QUFFRCxZQUFJLE9BQUksQ0FBQ2xELFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsY0FBSSxPQUFJLENBQUNSLGNBQUwsQ0FBb0IsT0FBSSxDQUFDa0IsVUFBekIsRUFBcUNyRSxTQUFyQyxJQUFrRGdDLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZhLElBQTdGLENBQWtHVyxNQUF4SixFQUFnSztBQUM5SixnQkFBSSxDQUFDLE9BQUksQ0FBQ3pFLGNBQUwsQ0FBb0IsT0FBSSxDQUFDa0IsVUFBekIsRUFBcUNsRCxjQUExQyxFQUEwRDtBQUN4RCxrQkFBSTBNLFFBQVEsQ0FBQzdMLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NtRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEckYsV0FBMUQsRUFBdUVzRixpQkFBdkUsQ0FBeUZsQyxZQUF6RixDQUFzRyxjQUF0RyxFQUFzSDhJLFNBQXRILENBQWdJQyxVQUFqSSxDQUFSLElBQXdKLENBQTVKLEVBQStKO0FBQzdKNUwsZ0JBQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0FsRixnQkFBQUEsbUJBQW1CO0FBQ3BCOztBQUVELGtCQUFJNFEsUUFBUSxDQUFDN0wsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RmxDLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIOEksU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQVIsSUFBd0osQ0FBNUosRUFBK0o7QUFDN0ozTCxnQkFBQUEsWUFBWSxHQUFHLElBQWY7QUFDQWxGLGdCQUFBQSxtQkFBbUI7QUFDbkJELGdCQUFBQSxtQkFBbUI7QUFDcEI7QUFDRixhQVhELE1BV087QUFDTDJKLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUF3QixPQUFJLENBQUMxRCxjQUFMLENBQW9CLE9BQUksQ0FBQ2tCLFVBQXpCLEVBQXFDdEUsVUFBekU7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsWUFBSTZCLFdBQVcsR0FBR0ksd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER2QixNQUE1RSxFQUFvRjtBQUNsRixjQUFJOUQsV0FBVyxJQUFJLEVBQW5CLEVBQXVCQSxXQUFXLEdBQUdBLFdBQVcsR0FBRyxFQUE1QixDQUF2QixLQUNLQSxXQUFXLEdBQUdBLFdBQVcsR0FBRyxDQUE1QjtBQUNOLFNBSEQsTUFHTztBQUNMQSxVQUFBQSxXQUFXLEdBQUdBLFdBQVcsR0FBRyxDQUE1QjtBQUNBQyxVQUFBQSxRQUFRLEdBQUdDLFFBQVg7QUFDRCxTQTdEc0IsQ0ErRHZCO0FBQ0E7OztBQUVBLFFBQUEsT0FBSSxDQUFDME0sYUFBTCxHQWxFdUIsQ0FtRXZCOztBQUNELE9BcEVELE1Bb0VPO0FBQ0wsWUFBSW9FLE9BQU8sR0FBR25WLEVBQUUsQ0FBQ3NKLElBQUgsQ0FBUSxDQUFSLEVBQVcsQ0FBWCxDQUFkOztBQUNBLFFBQUEsT0FBSSxDQUFDd0csV0FBTCxDQUFpQnFGLE9BQWpCLEVBQTBCLEtBQTFCLEVBQWlDLEdBQWpDLEVBRkssQ0FFa0M7O0FBQ3hDO0FBQ0YsS0EzRUgsRUE0RUdKLEtBNUVIO0FBNkVELEdBaHBEd0I7QUFrcER6QjtBQUVBSyxFQUFBQSxZQXBwRHlCLHdCQW9wRFpDLElBcHBEWSxFQW9wRE5DLElBcHBETSxFQW9wREE7QUFDdkI1USxJQUFBQSxZQUFZLEdBQUcyUSxJQUFmO0FBQ0ExUSxJQUFBQSxZQUFZLEdBQUcyUSxJQUFmOztBQUVBLFFBQUksQ0FBQ0QsSUFBTCxFQUFXO0FBQ1Q3VixNQUFBQSxtQkFBbUIsR0FBRyxDQUF0QjtBQUNEOztBQUVELFFBQUksQ0FBQzhWLElBQUwsRUFBVztBQUNUN1YsTUFBQUEsbUJBQW1CLEdBQUcsQ0FBdEI7QUFDRDtBQUNGLEdBL3BEd0I7QUFpcUR6QjhWLEVBQUFBLG9CQWpxRHlCLGtDQWlxREY7QUFDckI5VixJQUFBQSxtQkFBbUI7QUFDcEIsR0FucUR3QjtBQXFxRHpCK1YsRUFBQUEsMkJBcnFEeUIsdUNBcXFER0MsTUFycURILEVBcXFEV3hILE1BcnFEWCxFQXFxRG1CeUgsYUFycURuQixFQXFxRGtDQyxvQkFycURsQyxFQXFxRGdFQyxVQXJxRGhFLEVBcXFEZ0ZDLDRCQXJxRGhGLEVBcXFEc0g7QUFBQSxRQUFwRkYsb0JBQW9GO0FBQXBGQSxNQUFBQSxvQkFBb0YsR0FBN0QsS0FBNkQ7QUFBQTs7QUFBQSxRQUF0REMsVUFBc0Q7QUFBdERBLE1BQUFBLFVBQXNELEdBQXpDLENBQXlDO0FBQUE7O0FBQUEsUUFBdENDLDRCQUFzQztBQUF0Q0EsTUFBQUEsNEJBQXNDLEdBQVAsS0FBTztBQUFBOztBQUM3SSxRQUFJLEtBQUtuUSxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ2xFLFlBQXJDLENBQWtEdUwsTUFBbEQsRUFBMER4TSxhQUExRCxDQUF3RXdHLE1BQXhFLEdBQWlGLENBQXJGLEVBQXdGO0FBQ3RGLFVBQUksQ0FBQzBOLG9CQUFMLEVBQTJCO0FBQ3pCLFlBQUksS0FBS2pRLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDNUQsSUFBckMsSUFBNkN5UyxNQUFqRCxFQUF5RDtBQUN2RCxlQUFLL1AsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUM1RCxJQUFyQyxHQUE0QyxLQUFLMEMsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUM1RCxJQUFyQyxHQUE0Q3lTLE1BQXhGO0FBQ0EsZUFBSy9QLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDOUQsb0JBQXJDLEdBQTRELEtBQUs0QyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQzlELG9CQUFyQyxHQUE0RCxDQUF4SDs7QUFDQSxlQUFLNEMsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNsRSxZQUFyQyxDQUFrRHVMLE1BQWxELEVBQTBEeE0sYUFBMUQsQ0FBd0VpSyxJQUF4RSxDQUE2RWdLLGFBQTdFOztBQUNBblIsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRGlGLFNBQTFELENBQW9FLCtDQUFwRSxFQUFxSCxJQUFySDtBQUNBaEMsVUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZnZHLFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMERpTyxzQ0FBMUQ7QUFDRCxXQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsU0FSRCxNQVFPO0FBQ0x2UixVQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBEaUYsU0FBMUQsQ0FBb0UsdUVBQXVFMkksTUFBM0k7QUFDRDtBQUNGLE9BWkQsTUFZTztBQUNMLFlBQUlHLFVBQVUsSUFBSUgsTUFBbEIsRUFBMEI7QUFDeEJHLFVBQUFBLFVBQVUsR0FBR0EsVUFBVSxHQUFHSCxNQUExQjtBQUNBLGVBQUsvUCxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQzlELG9CQUFyQyxHQUE0RCxLQUFLNEMsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUM5RCxvQkFBckMsR0FBNEQsQ0FBeEg7O0FBQ0EsZUFBSzRDLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDbEUsWUFBckMsQ0FBa0R1TCxNQUFsRCxFQUEwRHhNLGFBQTFELENBQXdFaUssSUFBeEUsQ0FBNkVnSyxhQUE3RTs7QUFDQW5SLFVBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMERpRixTQUExRCxDQUFvRSwrQ0FBcEUsRUFBcUgsSUFBckg7QUFDQWhDLFVBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z2RyxZQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBEaU8sc0NBQTFEO0FBQ0QsV0FGUyxFQUVQLElBRk8sQ0FBVjtBQUdELFNBUkQsTUFRTztBQUNMdlIsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRGlGLFNBQTFELENBQW9FLHVFQUF1RTJJLE1BQXZFLEdBQWdGLGdCQUFoRixHQUFtR0csVUFBdks7QUFDRDtBQUNGO0FBQ0YsS0ExQkQsTUEwQk87QUFDTHJSLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMERpRixTQUExRCxDQUFvRSxvRUFBcEU7QUFDRDtBQUNGLEdBbnNEd0I7QUFxc0R6QmlKLEVBQUFBLDJDQXJzRHlCLHVEQXFzRG1CSixvQkFyc0RuQixFQXFzRGlEQyxVQXJzRGpELEVBcXNEaUVDLDRCQXJzRGpFLEVBcXNEdUc7QUFBQSxRQUFwRkYsb0JBQW9GO0FBQXBGQSxNQUFBQSxvQkFBb0YsR0FBN0QsS0FBNkQ7QUFBQTs7QUFBQSxRQUF0REMsVUFBc0Q7QUFBdERBLE1BQUFBLFVBQXNELEdBQXpDLENBQXlDO0FBQUE7O0FBQUEsUUFBdENDLDRCQUFzQztBQUF0Q0EsTUFBQUEsNEJBQXNDLEdBQVAsS0FBTztBQUFBOztBQUM5SHBSLElBQUFBLHFCQUFxQixHQUFHLEVBQXhCO0FBRUEwRSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLMUQsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNsRSxZQUFqRDs7QUFDQSxTQUFLLElBQUlzVCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUt0USxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ2xFLFlBQXJDLENBQWtEdUYsTUFBdEUsRUFBOEUrTixDQUFDLEVBQS9FLEVBQW1GO0FBQ2pGLFVBQUk1RixRQUFRLENBQUMsS0FBSzFLLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDbEUsWUFBckMsQ0FBa0RzVCxDQUFsRCxFQUFxRHRWLFlBQXRELENBQVIsSUFBK0UsQ0FBbkYsRUFBc0Y7QUFDcEY7QUFDQSxZQUFJdVYsSUFBSSxHQUFHalcsRUFBRSxDQUFDa1csV0FBSCxDQUFlM1Isd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRHNPLG1CQUExRCxDQUE4RUMsb0JBQTdGLENBQVg7QUFDQUgsUUFBQUEsSUFBSSxDQUFDdEgsTUFBTCxHQUFjcEssd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRHNPLG1CQUExRCxDQUE4RUUsMkJBQTVGO0FBQ0FKLFFBQUFBLElBQUksQ0FBQzFPLFlBQUwsQ0FBa0IsdUJBQWxCLEVBQTJDK08sZ0JBQTNDLENBQTRETixDQUE1RDtBQUNBQyxRQUFBQSxJQUFJLENBQUMxTyxZQUFMLENBQWtCLHVCQUFsQixFQUEyQ3VHLE9BQTNDLENBQW1ELEtBQUtwSSxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ2xFLFlBQXJDLENBQWtEc1QsQ0FBbEQsRUFBcUQvVSxZQUF4RztBQUNBZ1YsUUFBQUEsSUFBSSxDQUFDMU8sWUFBTCxDQUFrQix1QkFBbEIsRUFBMkNnUCxvQkFBM0MsQ0FBZ0VaLG9CQUFoRTtBQUNBTSxRQUFBQSxJQUFJLENBQUMxTyxZQUFMLENBQWtCLHVCQUFsQixFQUEyQ2lQLFlBQTNDLENBQXdEWixVQUF4RDtBQUNBSyxRQUFBQSxJQUFJLENBQUMxTyxZQUFMLENBQWtCLHVCQUFsQixFQUEyQ2tQLDhCQUEzQyxDQUEwRVosNEJBQTFFO0FBQ0FJLFFBQUFBLElBQUksQ0FBQzFPLFlBQUwsQ0FBa0IsdUJBQWxCLEVBQTJDbVAsWUFBM0M7QUFDQWpTLFFBQUFBLHFCQUFxQixDQUFDaUgsSUFBdEIsQ0FBMkJ1SyxJQUEzQjtBQUNEO0FBQ0Y7O0FBQ0Q5TSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTNFLHFCQUFaO0FBQ0EsV0FBT0EscUJBQXFCLENBQUN3RCxNQUE3QjtBQUNELEdBenREd0I7QUEydER6QjBPLEVBQUFBLHFCQTN0RHlCLG1DQTJ0REQ7QUFDdEIsU0FBSyxJQUFJN04sS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdyRSxxQkFBcUIsQ0FBQ3dELE1BQWxELEVBQTBEYSxLQUFLLEVBQS9ELEVBQW1FO0FBQ2pFckUsTUFBQUEscUJBQXFCLENBQUNxRSxLQUFELENBQXJCLENBQTZCOE4sT0FBN0I7QUFDRDs7QUFFRG5TLElBQUFBLHFCQUFxQixHQUFHLEVBQXhCO0FBQ0QsR0FqdUR3QjtBQW11RHpCb1MsRUFBQUEseUJBbnVEeUIscUNBbXVEQ0MsS0FudURELEVBbXVEUUMsWUFudURSLEVBbXVEc0JDLFNBbnVEdEIsRUFtdURpQztBQUN4RCxRQUFJQSxTQUFKLEVBQWU7QUFDYixVQUFJQyxNQUFNLEdBQUcsSUFBSTlVLFNBQUosRUFBYjs7QUFDQThVLE1BQUFBLE1BQU0sQ0FBQ2hXLFlBQVAsR0FBc0I2VixLQUF0QjtBQUNBRyxNQUFBQSxNQUFNLENBQUM3VSxXQUFQLEdBQXFCMlUsWUFBckI7QUFFQSxXQUFLclIsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUM3RCxVQUFyQyxDQUFnRDJJLElBQWhELENBQXFEdUwsTUFBckQ7QUFDRDtBQUNGLEdBM3VEd0I7QUE2dUR6QmhDLEVBQUFBLDBCQTd1RHlCLHNDQTZ1REVpQyxlQTd1REYsRUE2dUQyQjdGLE1BN3VEM0IsRUE2dUQyQzhGLG9CQTd1RDNDLEVBNnVEeUVDLHNCQTd1RHpFLEVBNnVEcUdDLFFBN3VEckcsRUE2dURtSDFGLFFBN3VEbkgsRUE2dURpSUMsV0E3dURqSSxFQTZ1RGtKO0FBQUE7O0FBQUEsUUFBaEpzRixlQUFnSjtBQUFoSkEsTUFBQUEsZUFBZ0osR0FBOUgsS0FBOEg7QUFBQTs7QUFBQSxRQUF2SDdGLE1BQXVIO0FBQXZIQSxNQUFBQSxNQUF1SCxHQUE5RyxLQUE4RztBQUFBOztBQUFBLFFBQXZHOEYsb0JBQXVHO0FBQXZHQSxNQUFBQSxvQkFBdUcsR0FBaEYsS0FBZ0Y7QUFBQTs7QUFBQSxRQUF6RUMsc0JBQXlFO0FBQXpFQSxNQUFBQSxzQkFBeUUsR0FBaEQsQ0FBZ0Q7QUFBQTs7QUFBQSxRQUE3Q0MsUUFBNkM7QUFBN0NBLE1BQUFBLFFBQTZDLEdBQWxDLENBQWtDO0FBQUE7O0FBQUEsUUFBL0IxRixRQUErQjtBQUEvQkEsTUFBQUEsUUFBK0IsR0FBcEIsQ0FBb0I7QUFBQTs7QUFBQSxRQUFqQkMsV0FBaUI7QUFBakJBLE1BQUFBLFdBQWlCLEdBQUgsQ0FBRztBQUFBOztBQUN6SyxRQUFJdUYsb0JBQUosRUFBMEI7QUFDeEIsVUFBSUcsTUFBTSxHQUFHLFFBQWI7QUFDQS9TLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMEQwUCxpQkFBMUQsQ0FBNEVELE1BQTVFLEVBQW9GLEtBQXBGLEVBQTJGLEtBQTNGLEVBQWtHLEtBQWxHLEVBQXlHakcsTUFBekcsRUFBaUg4RixvQkFBakgsRUFBdUlDLHNCQUF2SSxFQUErSkMsUUFBL0osRUFBeUsxRixRQUF6SyxFQUFtTEMsV0FBbkwsRUFBZ00sQ0FBaE0sRUFBbU0sQ0FBbk07QUFDRCxLQUhELE1BR087QUFDTCxVQUFJak4sWUFBWSxJQUFJRCxZQUFoQixJQUFnQ0Usa0JBQXBDLEVBQXdEO0FBQ3REbkYsUUFBQUEsbUJBQW1CLEdBQUcsQ0FBdEI7QUFDRDs7QUFFRHFGLE1BQUFBLGVBQWUsR0FBRyxLQUFLWSxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ2pFLGlCQUFyQyxDQUF1RFgsY0FBekU7QUFDQStDLE1BQUFBLGlCQUFpQixHQUFHLEtBQUtXLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDakUsaUJBQXJDLENBQXVEVixnQkFBM0U7QUFDQStDLE1BQUFBLGlCQUFpQixHQUFHLEtBQUtVLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDakUsaUJBQXJDLENBQXVEVCxnQkFBM0U7O0FBRUEsVUFBSTRDLGVBQUosRUFBcUI7QUFDbkI7QUFDQSxhQUFLMFMsc0JBQUwsQ0FBNEIsS0FBNUI7O0FBRUEsWUFBSSxDQUFDbkcsTUFBTCxFQUFhO0FBQ1g5TSxVQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBEaUYsU0FBMUQsQ0FBb0Usa0JBQXBFLEVBQXdGLElBQXhGO0FBQ0FoQyxVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFlBQUEsT0FBSSxDQUFDOEYsWUFBTDtBQUNELFdBRlMsRUFFUCxJQUZPLENBQVY7QUFHRCxTQUxELE1BS087QUFDTHpILFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0FBQ0EwQixVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFlBQUEsT0FBSSxDQUFDOEYsWUFBTDtBQUNELFdBRlMsRUFFUCxHQUZPLENBQVY7QUFHRDtBQUNGLE9BZkQsTUFlTztBQUNMLFlBQUkwRyxNQUFNLEdBQUcsRUFBYjtBQUVBLFlBQUlKLGVBQUosRUFBcUJJLE1BQU0sR0FBRyxjQUFULENBQXJCLEtBQ0tBLE1BQU0sR0FBRyxRQUFUO0FBRUwvUyxRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBEMFAsaUJBQTFELENBQTRFRCxNQUE1RSxFQUFvRkosZUFBcEYsRUFBcUduUyxpQkFBckcsRUFBd0hDLGlCQUF4SCxFQUEySXFNLE1BQTNJLEVBQW1KLEtBQW5KLEVBQTBKLENBQTFKLEVBQTZKLENBQTdKLEVBQWdLLENBQWhLLEVBQW1LLENBQW5LLEVBQXNLN1IsbUJBQXRLLEVBQTJMQyxtQkFBM0w7QUFDRDtBQUNGO0FBQ0YsR0FseER3QjtBQW94RHpCZ1ksRUFBQUEscUJBcHhEeUIsbUNBb3hERDtBQUN0QixTQUFLL1IsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUN2RCxVQUFyQyxHQUFrRCxJQUFsRDtBQUNBLFNBQUtxQyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3RELGNBQXJDLElBQXVELENBQXZEO0FBQ0FpQixJQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBEUSw4QkFBMUQsQ0FBeUYsSUFBekYsRUFBK0YsS0FBL0YsRUFBc0csS0FBS25DLFlBQTNHLEVBQXlILEtBQUtSLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDdkQsVUFBOUosRUFBMEssS0FBS3FDLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDdEQsY0FBL007QUFDRCxHQXh4RHdCO0FBMHhEekJvVSxFQUFBQSwrQkExeER5QiwyQ0EweERPQyxPQTF4RFAsRUEweERnQkMsSUExeERoQixFQTB4RHNCO0FBQzdDLFFBQUlyTixLQUFLLEdBQUc7QUFBRWYsTUFBQUEsSUFBSSxFQUFFO0FBQUV4RyxRQUFBQSxJQUFJLEVBQUUyVSxPQUFSO0FBQWlCRSxRQUFBQSxFQUFFLEVBQUVEO0FBQXJCO0FBQVIsS0FBWjtBQUNBclQsSUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ29FLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsRUFBMUUsRUFBOEVGLEtBQTlFO0FBQ0QsR0E3eER3QjtBQSt4RHpCdU4sRUFBQUEsa0NBL3hEeUIsOENBK3hEVXZOLEtBL3hEVixFQSt4RGlCO0FBQ3hDLFFBQUloRyx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOERVLGFBQTlELE1BQWlGLEtBQXJGLEVBQTRGO0FBQzFGLFVBQUlrUSxPQUFPLEdBQUdwTixLQUFLLENBQUNmLElBQU4sQ0FBV3hHLElBQXpCO0FBQ0EsVUFBSStVLEdBQUcsR0FBR3hOLEtBQUssQ0FBQ2YsSUFBTixDQUFXcU8sRUFBckI7O0FBRUEsVUFBSUcsUUFBUSxHQUFHLEtBQUt6UCxVQUFMLEVBQWY7O0FBRUEsVUFBSSxLQUFLN0MsY0FBTCxDQUFvQnNTLFFBQXBCLEVBQThCelYsU0FBOUIsSUFBMkN3VixHQUEvQyxFQUFvRDtBQUNsRCxZQUFJLEtBQUtyUyxjQUFMLENBQW9Cc1MsUUFBcEIsRUFBOEJ0VSxjQUE5QixJQUFnRCxJQUFwRCxFQUEwRDtBQUN4RCxlQUFLZ0MsY0FBTCxDQUFvQnNTLFFBQXBCLEVBQThCclUsVUFBOUIsSUFBNENnVSxPQUE1QztBQUNEOztBQUVELGFBQUtqUyxjQUFMLENBQW9Cc1MsUUFBcEIsRUFBOEJoVixJQUE5QixJQUFzQzJVLE9BQXRDO0FBQ0FwVCxRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBEaUYsU0FBMUQsQ0FBb0Usa0NBQWtDNkssT0FBbEMsR0FBNEMscUJBQWhILEVBQXVJLElBQXZJO0FBQ0FwVCxRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOEQyQixXQUE5RCxHQUE0RTBCLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUgsS0FBSzFFLGNBQUwsQ0FBb0JzUyxRQUFwQixDQUFuSDtBQUNEO0FBQ0Y7QUFDRixHQWh6RHdCO0FBa3pEekI7QUFFQTtBQUNBQyxFQUFBQSx1QkFyekR5QixtQ0FxekREM1IsTUFyekRDLEVBcXpETztBQUM5QjFCLElBQUFBLGtCQUFrQixHQUFHMEIsTUFBckI7QUFDQSxTQUFLWixjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ2pFLGlCQUFyQyxDQUF1RGIsaUJBQXZELEdBQTJFOEMsa0JBQTNFO0FBQ0QsR0F4ekR3QjtBQTB6RHpCbUksRUFBQUEsa0JBMXpEeUIsOEJBMHpETnpHLE1BMXpETSxFQTB6REU7QUFDekJ6QixJQUFBQSxhQUFhLEdBQUd5QixNQUFoQjtBQUNBLFNBQUtaLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDakUsaUJBQXJDLENBQXVEWixZQUF2RCxHQUFzRThDLGFBQXRFO0FBQ0QsR0E3ekR3QjtBQSt6RHpCMlMsRUFBQUEsc0JBL3pEeUIsa0NBK3pERmxSLE1BL3pERSxFQSt6RE07QUFDN0J4QixJQUFBQSxlQUFlLEdBQUd3QixNQUFsQjtBQUNBLFNBQUtaLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDakUsaUJBQXJDLENBQXVEWCxjQUF2RCxHQUF3RThDLGVBQXhFO0FBQ0QsR0FsMER3QjtBQW8wRHpCb1QsRUFBQUEsMEJBcDBEeUIsc0NBbzBERTVSLE1BcDBERixFQW8wRFU7QUFDakN2QixJQUFBQSxpQkFBaUIsR0FBR3VCLE1BQXBCO0FBQ0EsU0FBS1osY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUNqRSxpQkFBckMsQ0FBdURWLGdCQUF2RCxHQUEwRThDLGlCQUExRTtBQUNELEdBdjBEd0I7QUF5MER6Qm9ULEVBQUFBLCtCQXowRHlCLDJDQXkwRE83UixNQXowRFAsRUF5MERlO0FBQ3RDdEIsSUFBQUEsaUJBQWlCLEdBQUdzQixNQUFwQjtBQUNBLFNBQUtaLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDakUsaUJBQXJDLENBQXVEVCxnQkFBdkQsR0FBMEU4QyxpQkFBMUU7QUFDRCxHQTUwRHdCO0FBODBEekJ1SCxFQUFBQSxrQkE5MER5Qiw4QkE4MEROakcsTUE5MERNLEVBODBERTtBQUN6QnBCLElBQUFBLGNBQWMsR0FBR29CLE1BQWpCO0FBQ0QsR0FoMUR3QjtBQWsxRHpCOFIsRUFBQUEsa0JBbDFEeUIsZ0NBazFESjtBQUNuQixXQUFPbFQsY0FBUDtBQUNELEdBcDFEd0I7QUFzMUR6Qm1ULEVBQUFBLHFCQXQxRHlCLG1DQXMxREQ7QUFDdEIsUUFBSUMsV0FBVyxHQUFHLENBQUMsQ0FBbkI7O0FBQ0EsUUFBSSxLQUFLNVMsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUN6RCxlQUFyQyxHQUF1RCxDQUEzRCxFQUE4RDtBQUM1RG1WLE1BQUFBLFdBQVcsR0FBRyxLQUFLNVMsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUN6RCxlQUFuRDtBQUNBLFdBQUt1QyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3pELGVBQXJDLEdBQXVELENBQXZEO0FBQ0QsS0FIRCxNQUdPO0FBQ0xtVixNQUFBQSxXQUFXLEdBQUcsQ0FBZDtBQUNEOztBQUVELFdBQU9BLFdBQVA7QUFDRCxHQWgyRHdCO0FBazJEekJDLEVBQUFBLHNCQWwyRHlCLGtDQWsyREZDLFdBbDJERSxFQWsyRFc7QUFDbEMsUUFBSUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUF4Qjs7QUFDQSxRQUFJLEtBQUsvUyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3pELGVBQXJDLEdBQXVELENBQTNELEVBQThEO0FBQzVEc1YsTUFBQUEsZ0JBQWdCLEdBQUcsS0FBSy9TLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDekQsZUFBckMsSUFBd0RxVixXQUEzRTtBQUNELEtBRkQsTUFFTztBQUNMQyxNQUFBQSxnQkFBZ0IsR0FBRyxDQUFuQjtBQUNEOztBQUVELFdBQU9BLGdCQUFQO0FBQ0QsR0EzMkR3QjtBQTYyRHpCQyxFQUFBQSxpQkE3MkR5Qiw2QkE2MkRQQyxPQTcyRE8sRUE2MkRFO0FBQ3pCLFFBQUloQixPQUFPLEdBQUcsQ0FBQyxDQUFmOztBQUNBLFFBQUksS0FBS2pTLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDekQsZUFBckMsR0FBdUQsQ0FBM0QsRUFBOEQ7QUFDNUR3VixNQUFBQSxPQUFPLEdBQUdBLE9BQU8sR0FBRyxHQUFwQjtBQUNBaEIsTUFBQUEsT0FBTyxHQUFHLEtBQUtqUyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQ3pELGVBQXJDLElBQXdEd1YsT0FBbEU7QUFDQSxXQUFLalQsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUN6RCxlQUFyQyxHQUF1RCxDQUF2RDtBQUNBLFdBQUt1QyxjQUFMLENBQW9CLEtBQUtrQixVQUF6QixFQUFxQzVELElBQXJDLElBQTZDMlUsT0FBN0M7QUFDRCxLQUxELE1BS087QUFDTEEsTUFBQUEsT0FBTyxHQUFHLENBQVY7QUFDRDs7QUFFRCxXQUFPQSxPQUFQO0FBQ0QsR0F6M0R3QjtBQTIzRHpCaUIsRUFBQUEsbUNBMzNEeUIsK0NBMjNEV3JPLEtBMzNEWCxFQTIzRGtCO0FBQ3pDLFFBQUlzTyxZQUFZLEdBQUd0VSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMFMsaUJBQWxDLEVBQW5COztBQUNBLFFBQUlDLE9BQU8sR0FBR3hPLEtBQUssQ0FBQ3lPLE1BQXBCO0FBQ0EsUUFBSUMsY0FBYyxHQUFHMU8sS0FBSyxDQUFDMk8sUUFBM0I7QUFDQSxRQUFJM0gsWUFBWSxHQUFHaEgsS0FBSyxDQUFDNE8sU0FBekI7QUFDQSxRQUFJQyxNQUFNLEdBQUc3TyxLQUFLLENBQUM4TyxLQUFuQjs7QUFDQSxRQUFJQyxrQkFBa0IsR0FBRy9VLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsRUFBekI7O0FBRUEsUUFBSWtSLE9BQU8sSUFBSXhVLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUE3RixDQUErR3JHLFNBQTlILEVBQXlJO0FBQ3ZJNEcsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWjs7QUFFQWtRLE1BQUFBLGtCQUFrQixDQUFDQyx1Q0FBbkIsQ0FBMkQsSUFBM0Q7O0FBRUEsVUFBSUMsTUFBSjs7QUFDQSxVQUFJSixNQUFKLEVBQVk7QUFDVmpRLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQVo7QUFDQW9RLFFBQUFBLE1BQU0sR0FBR1gsWUFBWSxDQUFDWSxtQkFBYixDQUFpQ1IsY0FBakMsQ0FBVDtBQUNELE9BSEQsTUFHTztBQUNMOVAsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBWjtBQUNBb1EsUUFBQUEsTUFBTSxHQUFHWCxZQUFZLENBQUNhLHNCQUFiLENBQW9DVCxjQUFwQyxDQUFUO0FBQ0Q7O0FBRURuWixNQUFBQSxhQUFhLEdBQUcwWixNQUFNLENBQUNHLGFBQXZCOztBQUNBLFVBQUlDLFFBQVEsR0FBRywrQkFBK0IsSUFBL0IsR0FBc0MsOENBQXRDLEdBQXVGLElBQXZGLEdBQThGLElBQTlGLEdBQXFHSixNQUFNLENBQUNOLFFBQTVHLEdBQXVILElBQXZILEdBQThILEtBQTlILEdBQXNJTSxNQUFNLENBQUNLLE9BQTdJLEdBQXVKLElBQXZKLEdBQThKLEtBQTlKLEdBQXNLTCxNQUFNLENBQUNNLE9BQTdLLEdBQXVMLElBQXZMLEdBQThMLEtBQTlMLEdBQXNNTixNQUFNLENBQUNPLE9BQTdNLEdBQXVOLElBQXZOLEdBQThOLEtBQTlOLEdBQXNPUCxNQUFNLENBQUNRLE9BQTVQLENBZnVJLENBaUJ2STs7O0FBQ0FWLE1BQUFBLGtCQUFrQixDQUFDVyxzQ0FBbkIsQ0FBMERMLFFBQTFEO0FBQ0Q7QUFDRixHQXY1RHdCO0FBeTVEekJNLEVBQUFBLG1DQXo1RHlCLCtDQXk1RFdDLFdBejVEWCxFQXk1RGdDO0FBQUEsUUFBckJBLFdBQXFCO0FBQXJCQSxNQUFBQSxXQUFxQixHQUFQLEtBQU87QUFBQTs7QUFDdkQsUUFBSWIsa0JBQWtCLEdBQUcvVSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEVBQXpCOztBQUNBLFFBQUl1UyxPQUFKOztBQUNBLFFBQUlDLFNBQUo7O0FBQ0EsUUFBSSxLQUFLblUsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBbVUsTUFBQUEsU0FBUyxHQUFHOVYsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEVyxZQUE5RCxHQUE2RW1GLGlCQUE3RSxFQUFaO0FBQ0F1TixNQUFBQSxPQUFPLEdBQUc3Vix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOEQyQixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBdkc7QUFDRCxLQUpELE1BSU8sSUFBSSxLQUFLMUMsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQztBQUNBa1UsTUFBQUEsT0FBTyxHQUFHLEtBQUsxVSxjQUFMLENBQW9CLENBQXBCLENBQVY7QUFDQTJVLE1BQUFBLFNBQVMsR0FBRyxLQUFLM1UsY0FBakI7QUFDRDs7QUFDRDRULElBQUFBLGtCQUFrQixDQUFDZ0Isb0NBQW5CLENBQXdELElBQXhEOztBQUNBaEIsSUFBQUEsa0JBQWtCLENBQUNpQixtQ0FBbkI7O0FBQ0FqQixJQUFBQSxrQkFBa0IsQ0FBQ2tCLG1DQUFuQixDQUF1REosT0FBdkQsRUFBZ0VDLFNBQWhFLEVBQTJFRixXQUEzRSxFQUF3RixLQUFLalUsWUFBN0Y7QUFDRCxHQXo2RHdCO0FBMjZEekJ1VSxFQUFBQSw0Q0EzNkR5Qix3REEyNkRvQkMsS0EzNkRwQixFQTI2RGtDO0FBQUEsUUFBZEEsS0FBYztBQUFkQSxNQUFBQSxLQUFjLEdBQU4sSUFBTTtBQUFBOztBQUN6RCxRQUFJTixPQUFPLEdBQUc3Vix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOEQyQixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBM0c7O0FBQ0EsUUFBSTBRLGtCQUFrQixHQUFHL1Usd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxFQUF6Qjs7QUFDQSxRQUFJOFMsVUFBVSxHQUFHdkssUUFBUSxDQUFDc0ssS0FBSyxDQUFDRSxhQUFOLENBQW9CcmEsSUFBcEIsQ0FBeUJzYSxLQUF6QixDQUErQixHQUEvQixFQUFvQyxDQUFwQyxDQUFELENBQXpCOztBQUVBMVIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQXNCdVIsVUFBbEM7QUFDQXhSLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFvQnRKLGFBQWhDOztBQUNBLFFBQUk2YSxVQUFVLElBQUk3YSxhQUFsQixFQUFpQztBQUMvQnlFLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMERpRixTQUExRCxDQUFvRSwyQkFBcEUsRUFBaUcsSUFBakc7O0FBQ0F3TSxNQUFBQSxrQkFBa0IsQ0FBQ0MsdUNBQW5CLENBQTJELEtBQTNEOztBQUNBLFdBQUt1Qiw4QkFBTCxDQUFvQyxLQUFwQyxFQUEyQyxJQUEzQyxFQUFpRCxDQUFDLENBQWxELEVBQXFEVixPQUFPLENBQUM3WCxTQUE3RDtBQUNELEtBSkQsTUFJTztBQUNMLFVBQUk2WCxPQUFPLENBQUNwWCxJQUFSLElBQWdCLElBQXBCLEVBQTBCO0FBQ3hCLGFBQUssSUFBSThGLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUtwRCxjQUFMLENBQW9CdUMsTUFBaEQsRUFBd0RhLEtBQUssRUFBN0QsRUFBaUU7QUFDL0QsY0FBSXNSLE9BQU8sQ0FBQzdYLFNBQVIsSUFBcUIsS0FBS21ELGNBQUwsQ0FBb0JvRCxLQUFwQixFQUEyQnZHLFNBQXBELEVBQStEO0FBQzdELGlCQUFLbUQsY0FBTCxDQUFvQm9ELEtBQXBCLEVBQTJCOUYsSUFBM0IsSUFBbUMsSUFBbkM7QUFDQXVCLFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NXLHlCQUFsQyxHQUE4RDJCLFdBQTlELEdBQTRFMEIsaUJBQTVFLENBQThGLG1CQUE5RixFQUFtSCxLQUFLMUUsY0FBTCxDQUFvQm9ELEtBQXBCLENBQW5IO0FBQ0E7QUFDRDtBQUNGOztBQUVEdkUsUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRGlGLFNBQTFELENBQW9FLCtEQUFwRSxFQUFxSSxJQUFySTs7QUFDQXdNLFFBQUFBLGtCQUFrQixDQUFDQyx1Q0FBbkIsQ0FBMkQsS0FBM0Q7O0FBQ0EsYUFBS3VCLDhCQUFMLENBQW9DLElBQXBDLEVBQTBDLEtBQTFDLEVBQWlELENBQUMsQ0FBbEQsRUFBcURWLE9BQU8sQ0FBQzdYLFNBQTdEO0FBQ0QsT0FaRCxNQVlPO0FBQ0xnQyxRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEdBQTBEaUYsU0FBMUQsQ0FBb0UsK0NBQXBFOztBQUNBd00sUUFBQUEsa0JBQWtCLENBQUNDLHVDQUFuQixDQUEyRCxLQUEzRDs7QUFDQSxhQUFLdUIsOEJBQUwsQ0FBb0MsS0FBcEMsRUFBMkMsS0FBM0MsRUFBa0QsQ0FBbEQsRUFBcURWLE9BQU8sQ0FBQzdYLFNBQTdELEVBSEssQ0FJTDtBQUNEO0FBQ0Y7QUFDRixHQTE4RHdCO0FBNDhEekI7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQXVZLEVBQUFBLDhCQXorRHlCLDBDQXkrRE1DLGVBeitETixFQXkrRHVCQyxvQkF6K0R2QixFQXkrRDZDL0IsY0F6K0Q3QyxFQXkrRDZEZ0MsT0F6K0Q3RCxFQXkrRHNFO0FBQzdGLFFBQUkxUSxLQUFLLEdBQUc7QUFBRTJRLE1BQUFBLFdBQVcsRUFBRUgsZUFBZjtBQUFnQ0ksTUFBQUEsZ0JBQWdCLEVBQUVILG9CQUFsRDtBQUF3RUksTUFBQUEsYUFBYSxFQUFFbkMsY0FBdkY7QUFBdUdwQixNQUFBQSxFQUFFLEVBQUVvRDtBQUEzRyxLQUFaO0FBQ0ExVyxJQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDb0UsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE2RUYsS0FBN0U7QUFDRCxHQTUrRHdCO0FBOCtEekI4USxFQUFBQSxnQ0E5K0R5Qiw0Q0E4K0RROVEsS0E5K0RSLEVBOCtEZTtBQUFBOztBQUN0QyxRQUFJK08sa0JBQWtCLEdBQUcvVSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDeUIscUJBQWxDLEVBQXpCOztBQUNBLFFBQUksS0FBS25DLGNBQUwsQ0FBb0IsS0FBS2tCLFVBQXpCLEVBQXFDckUsU0FBckMsSUFBa0RnQyx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDVyx5QkFBbEMsR0FBOEQyQixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGYSxJQUE3RixDQUFrR1csTUFBeEosRUFBZ0s7QUFDOUosVUFBSTRRLGVBQWUsR0FBR3hRLEtBQUssQ0FBQzJRLFdBQTVCO0FBQ0EsVUFBSUYsb0JBQW9CLEdBQUd6USxLQUFLLENBQUM0USxnQkFBakM7QUFDQSxVQUFJbEMsY0FBYyxHQUFHMU8sS0FBSyxDQUFDNlEsYUFBM0I7QUFDQSxVQUFJeEQsSUFBSSxHQUFHck4sS0FBSyxDQUFDc04sRUFBakI7O0FBRUF5QixNQUFBQSxrQkFBa0IsQ0FBQ0MsdUNBQW5CLENBQTJELEtBQTNEOztBQUNBLFVBQUlOLGNBQWMsSUFBSSxDQUF0QixFQUF5QjtBQUN2QjFVLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMERpRixTQUExRCxDQUFvRSw4REFBcEUsRUFBb0ksSUFBcEk7O0FBQ0F3TSxRQUFBQSxrQkFBa0IsQ0FBQ2dCLG9DQUFuQixDQUF3RCxLQUF4RDs7QUFDQSxhQUFLcEosZ0JBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJNkosZUFBSixFQUFxQjtBQUNuQnhXLFVBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMER5VCxzQ0FBMUQsQ0FBaUcsS0FBakc7QUFDQSxlQUFLNVYsY0FBTCxDQUFvQixLQUFLa0IsVUFBekIsRUFBcUM1RCxJQUFyQyxJQUE2QyxJQUE3QztBQUNBdUIsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3lCLHFCQUFsQyxHQUEwRGlGLFNBQTFELENBQW9FLDJEQUFwRSxFQUFpSSxJQUFqSTs7QUFDQXdNLFVBQUFBLGtCQUFrQixDQUFDZ0Isb0NBQW5CLENBQXdELEtBQXhEOztBQUNBLGVBQUtwSixnQkFBTDtBQUNELFNBTkQsTUFNTyxJQUFJOEosb0JBQUosRUFBMEI7QUFDL0IsY0FBSU8sb0JBQW9CLEdBQUcsQ0FBM0I7O0FBQ0EsY0FBSUMsV0FBVyxHQUFHalgsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1cseUJBQWxDLEdBQThEVyxZQUE5RCxHQUE2RW1GLGlCQUE3RSxFQUFsQjs7QUFFQSxlQUFLLElBQUkvRCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRzBTLFdBQVcsQ0FBQ3ZULE1BQXhDLEVBQWdEYSxLQUFLLEVBQXJELEVBQXlEO0FBQ3ZELGdCQUFJOE8sSUFBSSxJQUFJNEQsV0FBVyxDQUFDMVMsS0FBRCxDQUFYLENBQW1CSCxnQkFBbkIsQ0FBb0NDLGlCQUFwQyxDQUFzRHJHLFNBQWxFLEVBQTZFO0FBQzNFZ1osY0FBQUEsb0JBQW9CLEdBQUd6UyxLQUF2QjtBQUNBO0FBQ0Q7QUFDRjs7QUFFRHZFLFVBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N5QixxQkFBbEMsR0FBMERpRixTQUExRCxDQUFvRSx3REFBcEUsRUFBOEgsSUFBOUgsRUFYK0IsQ0FhL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFoQyxVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmd08sWUFBQUEsa0JBQWtCLENBQUNnQixvQ0FBbkIsQ0FBd0QsS0FBeEQ7O0FBQ0EsWUFBQSxPQUFJLENBQUNwSixnQkFBTDtBQUNELFdBSFMsRUFHUCxHQUhPLENBQVY7QUFJRDtBQUNGO0FBQ0Y7QUFDRixHQW5rRXdCO0FBcWtFekJ1SyxFQUFBQSwwQ0Fya0V5QixzREFxa0VrQmxSLEtBcmtFbEIsRUFxa0V5QjtBQUFBOztBQUNoRCxRQUFJakcsVUFBVSxJQUFJLElBQWxCLEVBQXdCO0FBQ3RCd0csTUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixRQUFBLE9BQUksQ0FBQzJRLDBDQUFMLENBQWdEbFIsS0FBaEQ7QUFDRCxPQUZTLEVBRVAsR0FGTyxDQUFWO0FBR0QsS0FKRCxNQUlPO0FBQ0wsVUFBSW1SLE9BQU8sR0FBR25SLEtBQUssQ0FBQ2YsSUFBTixDQUFXbVMsVUFBekI7QUFDQSxVQUFJeE8sUUFBUSxHQUFHNUMsS0FBSyxDQUFDZixJQUFOLENBQVdvUyxPQUExQjs7QUFFQSxVQUFJdlMsTUFBTSxHQUFHckosRUFBRSxDQUFDc0osSUFBSCxDQUFRL0Usd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMEQyRCxRQUFRLEdBQUdoSSxVQUFyRSxFQUFpRnNFLGlCQUFqRixDQUFtR0MsUUFBbkcsQ0FBNEdDLENBQXBILEVBQXVIcEYsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dFLENBQXpOLENBQWI7O0FBQ0EsV0FBS2lTLHdCQUFMLENBQThCLEtBQUs3VixjQUFMLENBQW9CLEtBQUtZLFVBQXpCLENBQTlCLEVBQW9FeUMsTUFBcEUsRUFBNEUsR0FBNUU7QUFFQWxGLE1BQUFBLFdBQVcsR0FBR2dKLFFBQWQ7O0FBQ0EsVUFBSTlELE1BQU0sR0FBR3JKLEVBQUUsQ0FBQ3NKLElBQUgsQ0FBUS9FLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NtRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEckYsV0FBMUQsRUFBdUVzRixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHQyxDQUExRyxFQUE2R3BGLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NtRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEckYsV0FBMUQsRUFBdUVzRixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHRSxDQUEvTSxDQUFiOztBQUNBLFdBQUtpUyx3QkFBTCxDQUE4QixLQUFLN1YsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixDQUE5QixFQUFvRXlDLE1BQXBFO0FBQ0Q7QUFDRixHQXJsRXdCO0FBdWxFekJ3UyxFQUFBQSx3QkFBd0IsRUFBRSxrQ0FBVWhXLElBQVYsRUFBZ0JxUCxLQUFoQixFQUF1QjRHLEtBQXZCLEVBQW9DO0FBQUEsUUFBYkEsS0FBYTtBQUFiQSxNQUFBQSxLQUFhLEdBQUwsR0FBSztBQUFBOztBQUM1RDliLElBQUFBLEVBQUUsQ0FBQ3lVLEtBQUgsQ0FBUzVPLElBQVQsRUFDRzZPLEVBREgsQ0FDTW9ILEtBRE4sRUFDYTtBQUFFcFMsTUFBQUEsUUFBUSxFQUFFMUosRUFBRSxDQUFDMlUsRUFBSCxDQUFNTyxLQUFLLENBQUN2TCxDQUFaLEVBQWV1TCxLQUFLLENBQUN0TCxDQUFyQjtBQUFaLEtBRGIsRUFDb0Q7QUFBRWdMLE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBRHBELEVBRUdDLElBRkgsQ0FFUSxZQUFNLENBQUUsQ0FGaEIsRUFHR0UsS0FISDtBQUlELEdBNWxFd0I7QUE4bEV6QmdILEVBQUFBLCtCQTlsRXlCLDZDQThsRVM7QUFDaEM1WCxJQUFBQSxXQUFXLElBQUlnQixVQUFmOztBQUVBLFFBQUksS0FBS2UsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixVQUFJcUUsS0FBSyxHQUFHO0FBQUVmLFFBQUFBLElBQUksRUFBRTtBQUFFbVMsVUFBQUEsVUFBVSxFQUFFeFcsVUFBZDtBQUEwQnlXLFVBQUFBLE9BQU8sRUFBRXpYO0FBQW5DO0FBQVIsT0FBWjtBQUNBSSxNQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDb0UsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RUYsS0FBOUU7QUFDRDs7QUFFRCxRQUFJbEIsTUFBTSxHQUFHckosRUFBRSxDQUFDc0osSUFBSCxDQUFRL0Usd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dDLENBQTFHLEVBQTZHcEYsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dFLENBQS9NLENBQWI7O0FBQ0EsU0FBS2lTLHdCQUFMLENBQThCLEtBQUs3VixjQUFMLENBQW9CLEtBQUtZLFVBQXpCLENBQTlCLEVBQW9FeUMsTUFBcEU7QUFDQSxTQUFLNkgsZ0JBQUw7QUFDRCxHQXptRXdCLENBMm1FekI7QUFDQTs7QUE1bUV5QixDQUFULENBQWxCLEVBOG1FQTs7QUFDQThLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpXLFdBQWpCLEVBQ0EiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfaXNUZXN0ID0gZmFsc2U7XHJcbnZhciBfZGljZWlucHV0MSA9IFwiXCI7XHJcbnZhciBfZGljZWlucHV0MiA9IFwiXCI7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsMSA9IC0xO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDIgPSAtMTtcclxuXHJcbnZhciBQcmV2aW91c0RpY2VSb2xsMyA9IC0xO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDQgPSAtMTtcclxuXHJcbnZhciBQcmV2aW91c0RpY2VSb2xsNSA9IC0xO1xyXG5cclxudmFyIHVzZXJHYW1lT3ZlciA9IGZhbHNlO1xyXG52YXIgQm90R2FtZU92ZXIgPSBmYWxzZTtcclxudmFyIFRvdGFsQ291bnRlclJlYWNoZWQgPSBmYWxzZTtcclxudmFyIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG52YXIgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcbnZhciBOb0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbnZhciBQbGF5ZXJMZWZ0ID0gZmFsc2U7XHJcbnZhciBGb3JjZUNoYW5nZVRpbWVPdXQgPSBudWxsO1xyXG52YXIgR2FtZUNvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgQ29ycmVjdEFuc3dlciA9IDA7XHJcbi8vI3JlZ2lvbiBzdXBlcmNsYXNzZXMgYW5kIGVudW1lcmF0aW9uc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bUJ1c2luZXNzVHlwZSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgSG9tZUJhc2VkOiAxLCAvL2EgYnVzaW5lc3MgdGhhdCB5b3Ugb3BlcmF0ZSBvdXQgb2YgeW91ciBob21lXHJcbiAgYnJpY2tBbmRtb3J0YXI6IDIsIC8vYSBzdG9yZSBmcm9udCBidXNpbmVzc1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzc0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzSW5mbyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1c2luZXNzSW5mb1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWU6IFwiQnVzaW5lc3NEYXRhXCIsXHJcbiAgICBCdXNpbmVzc1R5cGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTW9kZVwiLFxyXG4gICAgICB0eXBlOiBFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgICBkZWZhdWx0OiBFbnVtQnVzaW5lc3NUeXBlLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJCdXNpbmVzcyBjYXRvZ29yeSBmb3IgcGxheWVyc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzVHlwZURlc2NyaXB0aW9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR5cGVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlR5cGUgKGJ5IG5hbWUpIG9mIGJ1c2luZXNzIHBsYXllciBpcyBvcGVuaW5nXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5hbWUgb2YgdGhlIGJ1c2luZXNzIHBsYXllciBpcyBvcGVuaW5nXCIsXHJcbiAgICB9LFxyXG4gICAgQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFtb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYmFsYW5jZSBvZiBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIElzUGFydG5lcnNoaXA6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNQYXJ0bmVyc2hpcFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwdzogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgZG9uZSBwYXJ0bmVyc2hpcCB3aXRoIHNvbWVvbmUgd2l0aCBjdXJyZW50IGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lcklEOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhcnRuZXJJRFwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiSUQgb2YgdGhlIHBhcnRuZXIgd2l0aCB3aG9tIHBsYXllciBoYXMgZm9ybWVkIHBhcnRuZXJzaGlwXCIsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5hbWUgb2YgdGhlIHBhcnRuZXIgd2l0aCB3aG9tIHBsYXllciBoYXMgZm9ybWVkIHBhcnRuZXJzaGlwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9jYXRpb25zTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2NhdGlvbnNOYW1lXCIsXHJcbiAgICAgIHR5cGU6IFtjYy5UZXh0XSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpZiBwbGF5ZXIgb3ducyBicmljayBhbmQgbW9ydGFyIGhlL3NoZSBjYW4gZXhwYW5kIHRvIG5ldyBsb2NhdGlvblwiLFxyXG4gICAgfSxcclxuICAgIExvYW5UYWtlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBDYXJkRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZERhdGFGdW5jdGlvbmFsaXR5ID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5XCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmV4dFR1cm5Eb3VibGVQYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmV4dFR1cm5Eb3VibGVQYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIGl0cyBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTmV4dFR1cm46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcE5leHRUdXJuXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiB0dXJuIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCB0dXJuIGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFNraXBOZXh0UGF5ZGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBOZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwSE1OZXh0UGF5ZGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBITU5leHRQYXlkYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgaG9tZSBiYXNlZCBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwQk1OZXh0UGF5ZGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBCTU5leHRQYXlkYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgYnJpY2thIGFuZCBtbW9ydGFyIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdG9ja0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0b2NrSW5mbyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlN0b2NrSW5mb1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWU6IFwiU3RvY2tEYXRhXCIsXHJcbiAgICBCdXNpbmVzc05hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJuYW1lIG9mIHRoZSBidXNpbmVzcyBpbiB3aGljaCBzdG9ja3Mgd2lsbCBiZSBoZWxkXCIsXHJcbiAgICB9LFxyXG4gICAgU2hhcmVBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2hhcmVBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlNoYXJlIGFtb3VudCBvZiB0aGUgc3RvY2tcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yICBQbGF5ZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlBsYXllckRhdGFcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5hbWUgb2YgdGhlIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllclVJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJVSURcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklEIG9mIHRoZSBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBBdmF0YXJJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBdmF0YXJJRFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaWQgcmVmZXJlbmNlIGZvciBwbGF5ZXIgYXZhdGFyIHNlbGVjdGlvblwiLFxyXG4gICAgfSxcclxuICAgIElzQm90OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQm90XCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXB3OiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgY3VycmVudCBwbGF5ZXIgaXMgYm90XCIsXHJcbiAgICB9LFxyXG4gICAgTm9PZkJ1c2luZXNzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzXCIsXHJcbiAgICAgIHR5cGU6IFtCdXNpbmVzc0luZm9dLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk51bWJlciBvZiBidXNpbmVzcyBhIHBsYXllciBjYW4gb3duXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FyZEZ1bmN0aW9uYWxpdHk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FyZEZ1bmN0aW9uYWxpdHlcIixcclxuICAgICAgdHlwZTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY2FyZCBmdW5jdGlvbmFsaXR5IHN0b3JlZCBieSBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWRBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJudW1iZXIgb2YgaG9tZSBiYXNlZCBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgQnJpY2tBbmRNb3J0YXJBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tBbmRNb3J0YXJBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm51bWJlciBvZiBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbExvY2F0aW9uc0Ftb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbExvY2F0aW9uc0Ftb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIG9mIGxvY2F0aW9ucyBvZiBhbGwgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc2Vzc1wiLFxyXG4gICAgfSxcclxuICAgIE5vT2ZTdG9ja3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tzXCIsXHJcbiAgICAgIHR5cGU6IFtTdG9ja0luZm9dLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk51bWJlciBvZiBzdG9jayBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgY2FzaCBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIEdvbGRDb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHb2xkQ291bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImNvdW50IG9mIGdvbGQgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIFN0b2NrQ291bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tDb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY291bnQgb2Ygc3RvY2tzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBMb2FuVGFrZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblRha2VuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyB0YWtlbiBsb2FuIGZyb20gYmFuayBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBsb2FuIHRha2VuIGZyb20gdGhlIGJhbmtcIixcclxuICAgIH0sXHJcbiAgICBNYXJrZXRpbmdBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nQW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJtYXJrZXRpbmcgYW1vdW50IGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBMYXd5ZXJTdGF0dXM6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTGF3eWVyU3RhdHVzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBoaXJlZCBhIGxhd3llciBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBJc0JhbmtydXB0OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQmFua3J1cHRcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGJlZW4gQmFua3J1cHRlZCBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBCYW5rcnVwdEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCYW5rcnVwdEFtb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBob3cgbXVjaCB0aW1lIHBsYXllciBoYXMgYmVlbiBiYW5rcnVwdGVkXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcHBlZExvYW5QYXltZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBwZWRMb2FuUGF5bWVudFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgc2tpcHBlZCBsb2FuIHBheW1lbnRcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJSb2xsQ291bnRlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJSb2xsQ291bnRlclwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciB0byBzdG9yZSByb2xsIGNvdW50b3IgZm9yIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEluaXRpYWxDb3VudGVyQXNzaWduZWQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGlzR2FtZUZpbmlzaGVkOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcImlzR2FtZUZpbmlzaGVkXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxTY29yZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbFNjb3JlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEhCQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEhCQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxCTUNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCTUNhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsR29sZENhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxHb2xkQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxMb2FuQmFsYW5jZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbExvYW5CYWxhbmNlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbFN0b2Nrc0Nhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxTdG9ja3NDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBHYW1lT3Zlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHYW1lT3ZlclwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIElzQWN0aXZlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQWN0aXZlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIEdhbWUgTWFuYWdlciBDbGFzc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0obWFpbiBjbGFzcykgY2xhc3MgZm9yIEdhbWUgTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUm9sbENvdW50ZXIgPSAwO1xyXG52YXIgRGljZVRlbXAgPSAwO1xyXG52YXIgRGljZVJvbGwgPSAwO1xyXG52YXIgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIFR1cm5DaGVja0FycmF5ID0gW107XHJcbnZhciBCdXNpbmVzc0xvY2F0aW9uTm9kZXMgPSBbXTtcclxuXHJcbnZhciBQYXNzZWRQYXlEYXkgPSBmYWxzZTtcclxudmFyIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG5cclxuLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbnZhciBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxudmFyIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxudmFyIF9za2lwTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG52YXIgX3NraXBITU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbnZhciBUdXJuSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxudmFyIEJhY2tzcGFjZXMgPSAzO1xyXG52YXIgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG52YXIgT25lUXVlc3Rpb25JbmRleCA9IC0xO1xyXG52YXIgT25lUXVlc3Rpb25zID0gW1wieW91IGhhdmUgc2tpcHBlZCBsb2FuIHByZXZpb3VzIHBheWRheT9cIiwgXCJ5b3UgaGF2ZSB0YWtlbiBhbnkgbG9hbj9cIiwgXCJ5b3UgaGF2ZSBiYW5rcnVwdGVkIGV2ZXI/XCIsIFwieW91ciBuZXh0IHR1cm4gaXMgZ29pbmcgdG8gYmUgc2tpcHBlZD9cIiwgXCJ5b3VyIG5leHQgcGF5ZGF5IGlzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXlkYXk/XCJdO1xyXG5cclxudmFyIENhcmREaXNwbGF5U2V0VGltb3V0ID0gbnVsbDtcclxuXHJcbnZhciBHYW1lTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkdhbWVNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgcGxheWVyJ3MgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIEJvdEdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgYm90J3MgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBDYW1lcmFOb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgY2FtZXJhXCIsXHJcbiAgICB9LFxyXG4gICAgQWxsUGxheWVyVUk6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIHVpIG9mIGFsbCBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gICAgQWxsUGxheWVyTm9kZXM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIG5vZGUgb2YgYWxsIHBsYXllcnMgaW5zaWRlIGdhbWVwbGF5XCIsXHJcbiAgICB9LFxyXG4gICAgU3RhcnRMb2NhdGlvbk5vZGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBvZiBhdHRheSBvZiBsb2NhdGlvbnNcIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RlZE1vZGU6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImludGVnZXIgcmVmZXJlbmNlIGZvciBnYW1lIG1vZGUgMSBtZWFucyBib3QgYW5kIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIFBsYXllckRhdGE6IFBsYXllckRhdGEsXHJcbiAgICBCdXNpbmVzc0luZm86IEJ1c2luZXNzSW5mbyxcclxuICAgIENhcmREYXRhRnVuY3Rpb25hbGl0eTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgRW51bUJ1c2luZXNzVHlwZTogRW51bUJ1c2luZXNzVHlwZSxcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFNldFBsYXllckxlZnQoX3N0YXRlKSB7XHJcbiAgICBQbGF5ZXJMZWZ0ID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0QWxsVmFyaWFibGVzKCkge1xyXG4gICAgX2RpY2VpbnB1dDEgPSBcIlwiO1xyXG4gICAgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDEgPSAtMTtcclxuICAgIFByZXZpb3VzRGljZVJvbGwyID0gLTE7XHJcbiAgICBQbGF5ZXJMZWZ0ID0gZmFsc2U7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMyA9IC0xO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDQgPSAtMTtcclxuXHJcbiAgICBQcmV2aW91c0RpY2VSb2xsNSA9IC0xO1xyXG4gICAgR2FtZUNvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgdXNlckdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICBCb3RHYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgQ29ycmVjdEFuc3dlciA9IDA7XHJcbiAgICBSb2xsQ291bnRlciA9IDA7XHJcbiAgICBEaWNlVGVtcCA9IDA7XHJcbiAgICBEaWNlUm9sbCA9IDA7XHJcbiAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG4gICAgRm9yY2VDaGFuZ2VUaW1lT3V0ID0gbnVsbDtcclxuICAgIFBhc3NlZFBheURheSA9IGZhbHNlO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgIC8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gZmFsc2U7XHJcbiAgICBfc2tpcE5leHRUdXJuID0gZmFsc2U7XHJcbiAgICBfc2tpcE5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxuICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBob21lIGJhc2VkIGJ1c2luZXNzZXNzIG9ubHlcclxuICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyBvbmx5XHJcbiAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgVHVybkluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHJcbiAgICBCYWNrc3BhY2VzID0gMztcclxuICAgIGlzR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgIE9uZVF1ZXN0aW9uSW5kZXggPSAtMTtcclxuICAgIE9uZVF1ZXN0aW9ucyA9IFtcInlvdSBoYXZlIHNraXBwZWQgbG9hbiBwcmV2aW91cyBwYXlkYXk/XCIsIFwieW91IGhhdmUgdGFrZW4gYW55IGxvYW4/XCIsIFwieW91IGhhdmUgYmFua3J1cHRlZCBldmVyP1wiLCBcInlvdXIgbmV4dCB0dXJuIGlzIGdvaW5nIHRvIGJlIHNraXBwZWQ/XCIsIFwieW91ciBuZXh0IHBheWRheSBpcyBnb2luZyB0byBiZSBkb3VibGUgcGF5ZGF5P1wiXTtcclxuXHJcbiAgICBDYXJkRGlzcGxheVNldFRpbW91dCA9IG51bGw7XHJcbiAgICBUb3RhbENvdW50ZXJSZWFjaGVkID0gZmFsc2U7XHJcbiAgICBOb0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgSW5wdXRUZXN0RGljZTEoX3ZhbCkge1xyXG4gICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgX2RpY2VpbnB1dDEgPSBfdmFsO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIElucHV0VGVzdERpY2UyKF92YWwpIHtcclxuICAgIGlmIChfaXNUZXN0KSB7XHJcbiAgICAgIF9kaWNlaW5wdXQyID0gX3ZhbDtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNyZWdpb24gQWxsIEZ1bmN0aW9ucyBvZiBHYW1lTWFuYWdlclxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIGNsYXNzIGlzIGNyZWF0ZWRcclxuICAgKiovXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5SZXNldEFsbFZhcmlhYmxlcygpO1xyXG4gICAgR2FtZU1hbmFnZXIuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgdGhpcy5UdXJuTnVtYmVyID0gMDtcclxuICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLlNlbGVjdGVkTW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICB0aGlzLkluaXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleCA9IDA7XHJcbiAgICB0aGlzLkNhcmRDb3VudGVyID0gMDtcclxuICAgIHRoaXMuQ2FyZERpc3BsYXllZCA9IGZhbHNlO1xyXG4gICAgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcmVmZXJlbmNlIG9mIHJlcXVpcmVkIGNsYXNzZXNcclxuICAgKiovXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBpbml0aWFsIGdhbWVtYW5hZ2VyIGVzc2V0aWFsc1xyXG4gICAqKi9cclxuICBJbml0X0dhbWVNYW5hZ2VyKCkge1xyXG4gICAgdGhpcy5DYW1lcmEgPSB0aGlzLkNhbWVyYU5vZGUuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSk7XHJcbiAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mbyA9IFtdO1xyXG4gICAgUm9sbENvdW50ZXIgPSAwO1xyXG4gICAgRGljZVRlbXAgPSAwO1xyXG4gICAgRGljZVJvbGwgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIC8vaWYgam9pbmVkIHBsYXllciBpcyBzcGVjdGF0ZVxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzdGF0dXMgb2YgaW5pdGlhbCBidXNpbmVzcyBzZXRwOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpKTtcclxuXHJcbiAgICAgICAgLy9pZiBpbml0YWwgc2V0dXAgaGFzIGJlZW4gZG9uZSBhbmQgZ2FtZSBpcyB1bmRlciB3YXlcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgdmFyIEFsbERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gQWxsRGF0YTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgIHRoaXMuVHVybk51bWJlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIpO1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSwgdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAvL3RoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSA4O1xyXG4gICAgICAgICAgLy90aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSwgZmFsc2UsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgYm90IGFsb25nIHdpdGggb25lIHBsYXllclxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jcmVnaW9uIHB1YmxpYyBmdW5jdGlvbnMgdG8gZ2V0IGRhdGEgKGFjY2Vzc2libGUgZnJvbSBvdGhlciBjbGFzc2VzKVxyXG4gIEdldFR1cm5OdW1iZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5UdXJuTnVtYmVyO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZ2V0IG15IGluZGV4IGluIGFycmF5IG9mIFBsYXllckdhbWVJbmZvIFxyXG4gICAqKi9cclxuICBHZXRNeUluZGV4KCkge1xyXG4gICAgdmFyIG15SW5kZXggPSAwO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9hbGxBY3RvcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWxsQWN0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX2FjdG9yLlBsYXllclVJRCA9PSBfYWxsQWN0b3JzW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICBteUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbXlJbmRleDtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU3BlY3RhdGVNb2RlIENvZGVcclxuXHJcbiAgU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCkge1xyXG4gICAgdmFyIEFsbERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gQWxsRGF0YTtcclxuICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInN5bmNpbmcgYWxsIGRhdGEgZm9yIHNwZWN0YXRlXCIpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlciA+IDAgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCA9PSB0cnVlICYmICF0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCwgX3RvUG9zLnkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZyBwb3MxXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNvdW50ZXI6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5pdGlhbCBDb3VudGVyIEFzc2lnbmVkOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBmaW5pc2hlZCA6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICB2YXIgX2xhc3RJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGggLSAxO1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtfbGFzdEluZGV4XS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2xhc3RJbmRleF0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsIF90b1Bvcy55KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNldHRpbmcgcG9zMlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5sb2coXCJzeW5jZWQgcGxheWVybm9kZXNcIik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKSB7XHJcbiAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID09IFRvdGFsQ29ubmVjdGVkUGxheWVycykge1xyXG4gICAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgVHVybiBpcyBjYWxsZWQgYnk6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBmdW5jdGlvbnMgcmVsYXRlZCB0byBUdXJuIE1lY2hhbmlzbSBhbmQgY2FyZCBtZWNoYW5pc21cclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHdoYXQgY2FyZCBoYXMgYmVlbiBzZWxlY3RlZCBieSBwbGF5ZXJcclxuICAgKiovXHJcbiAgUmFpc2VFdmVudEZvckNhcmQoX2RhdGEpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNSwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIENsZWFyRGlzcGxheVRpbWVvdXQoKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gIH0sXHJcblxyXG4gIERpc3BsYXlDYXJkT25PdGhlcnMoKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgY29uc29sZS5sb2coXCJjYXJkIGV2ZW50IHJlY2VpdmVkOiBcIiArIENhcmRFdmVudFJlY2VpdmVkKTtcclxuICAgICAgaWYgKENhcmRFdmVudFJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcih0aGlzLkNhcmRDb3VudGVyKTtcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5DYXJkRGlzcGxheWVkKSB7XHJcbiAgICAgICAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuQ2FyZENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsIHRoaXMuUmFuZG9tQ2FyZEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgQ2FyZERpc3BsYXlTZXRUaW1vdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIC8vY2hlY2sgYWZ0ZXIgZXZlcnkgMC41IHNlY29uZHNcclxuICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRDYXJkRGlzcGxheSgpIHtcclxuICAgIHRoaXMuQ2FyZERpc3BsYXllZCA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpIHtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNhcmQgRGF0YSBSZWNlaXZlZDpcIik7XHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcblxyXG4gICAgdmFyIFJhbmRvbUNhcmQgPSBfZGF0YS5yYW5kb21DYXJkO1xyXG4gICAgdmFyIGNvdW50ZXIgPSBfZGF0YS5jb3VudGVyO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4ID0gUmFuZG9tQ2FyZDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXIgPSBjb3VudGVyO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKHRydWUsIFJhbmRvbUNhcmQpO1xyXG4gICAgICBlbHNlIENhcmRFdmVudFJlY2VpdmVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZSh0cnVlLCBSYW5kb21DYXJkKTtcclxuICAgICAgZWxzZSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZShmYWxzZSwgUmFuZG9tQ2FyZCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHBhcnRpY3VsYXIgcGxheWVyIGhhcyBjb21wbGV0ZSB0aGVpciBtb3ZlXHJcbiAgICoqL1xyXG4gIFJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJyYWlzZWQgZm9yIHR1cm4gY29tcGxldGVcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0FsbERhdGEoKSB7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIiwgdGhpcy5QbGF5ZXJHYW1lSW5mbywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgb24gYWxsIHBsYXllcnMgdG8gdmFsaWRhdGUgaWYgbW92ZSBpcyBjb21wbGV0ZWQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzXHJcbiAgICoqL1xyXG4gIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZShfdWlkKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL3JlYWwgcGxheWVyc1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChUdXJuQ2hlY2tBcnJheS5sZW5ndGggPT0gMCkgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTtcclxuXHJcbiAgICAgICAgdmFyIEFycmF5TGVuZ3RoID0gVHVybkNoZWNrQXJyYXkubGVuZ3RoO1xyXG4gICAgICAgIHZhciBJREZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEFycmF5TGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoVHVybkNoZWNrQXJyYXlbaW5kZXhdID09IF91aWQpIElERm91bmQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFJREZvdW5kKSB7XHJcbiAgICAgICAgICBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycyA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bal0uSXNBY3RpdmUpIFRvdGFsQ29ubmVjdGVkUGxheWVycysrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUdXJuIENoZWNrOiBcIiArIFR1cm5DaGVja0FycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUb3RhbCBDb25uZWN0ZWQgUGxheWVyczogXCIgKyBUb3RhbENvbm5lY3RlZFBsYXllcnMpO1xyXG5cclxuICAgICAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID49IFRvdGFsQ29ubmVjdGVkUGxheWVycykge1xyXG4gICAgICAgICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIC8vdGhpcy5TeW5jQWxsRGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgVHVybiBpcyBjYWxsZWQgYnk6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyO1xyXG4gICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGRpY2UgYW5pbWF0aW9uIGlzIHBsYXllZCBvbiBhbGwgcGxheWVyc1xyXG4gICAqKi9cclxuICBDaGFuZ2VUdXJuKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdGhpcy5TeW5jQWxsRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLlR1cm5OdW1iZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHRoaXMuVHVybk51bWJlciA9IHRoaXMuVHVybk51bWJlciArIDE7XHJcbiAgICBlbHNlIHRoaXMuVHVybk51bWJlciA9IDA7XHJcblxyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0U29tZVZhbHVlcygpIHtcclxuICAgIFR1cm5DaGVja0FycmF5ID0gW107XHJcbiAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZVR1cm5Gb3JjZWZ1bGx5KCkge1xyXG4gICAgaWYgKElzVHdlZW5pbmcpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KEZvcmNlQ2hhbmdlVGltZU91dCk7XHJcbiAgICAgIEZvcmNlQ2hhbmdlVGltZU91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlVHVybkZvcmNlZnVsbHkoKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbGVhclRpbWVvdXQoRm9yY2VDaGFuZ2VUaW1lT3V0KTtcclxuICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVmlzdWFsRGF0YSgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBmcm9tIHJhaXNlIG9uIGV2ZW50IChmcm9tIGZ1bmN0aW9uIFwiU3RhcnRUdXJuXCIgYW5kIFwiQ2hhbmdlVHVyblwiIG9mIHRoaXMgc2FtZSBjbGFzcykgdG8gaGFuZGxlIHR1cm5cclxuICAgKiovXHJcbiAgVHVybkhhbmRsZXIoX3R1cm4pIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHZhciBfaXNNYXN0ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCgpO1xyXG4gICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bX3R1cm5dLklzQWN0aXZlKSB7XHJcbiAgICAgICAgaWYgKF9pc01hc3Rlcikge1xyXG4gICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3RoaXMuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgdGhpcy5VcGRhdGVWaXN1YWxEYXRhKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlR1cm46IFwiICsgX3R1cm4pO1xyXG4gICAgdmFyIF9wbGF5ZXJNYXRjaGVkID0gZmFsc2U7XHJcbiAgICBfc2tpcE5leHRUdXJuID0gZmFsc2U7XHJcbiAgICBpZiAoSXNUd2VlbmluZykge1xyXG4gICAgICAvL2NoZWNrIGlmIGFuaW1hdGlvbiBvZiB0dXJuIGJlaW5nIHBsYXllZCBvbiBvdGhlciBwbGF5ZXJzXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHtcclxuICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgdGhpcy5UdXJuSGFuZGxlcihfdHVybik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCA4MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5UdXJuTnVtYmVyID0gX3R1cm47XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIF9za2lwTmV4dFR1cm4gPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3ModHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICghX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIHlvdXIgdHVybiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJHYW1lT3Zlcik7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgX3NraXBOZXh0VHVybiA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICBpZiAoIXVzZXJHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSAvL3R1cm4gZGVjaXNpb25zIGZvciBib3RcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIF9za2lwTmV4dFR1cm4gPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgaWYgKCFCb3RHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmICghX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Sb2xsRGljZSgpO1xyXG4gICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlR1cm4gT2Y6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQWxsUGxheWVyVUlbdGhpcy5UdXJuTnVtYmVyXS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5QbGF5ZXJJbmZvKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL3NraXAgdGhpcyB0dXJuIGFzIHNraXAgdHVybiBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlXHJcbiAgICAgIGlmIChfcGxheWVyTWF0Y2hlZCAmJiBfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTa2lwcGluZyBjdXJyZW50IHR1cm5cIiwgMTIwMCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTa2lwTmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfcGxheWVyTWF0Y2hlZCAmJiB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZCkge1xyXG4gICAgdmFyIE1haW5TZXNzaW9uRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIHZhciBNeURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX2NvdW50ZXIgPSBfaW5kO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEKTtcclxuICAgIC8vICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5Jc0FjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChfY291bnRlciA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzeW5jZWQgRGF0YTpcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCA9PSBNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXSA9IE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuXHJcbiAgICAgICAgICBpZiAoX2NvdW50ZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImFkZGluZyBjb3VudGVyOiBcIitfY291bnRlcik7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3luY2VkIERhdGE6XCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGFsbCBwbGF5ZXJzIGhhdmUgZG9uZSB0aGVpciBpbml0aWFsIHNldHVwIGFuZCBmaXJzdCB0dXJuIHN0YXJ0c1xyXG4gICAgQG1ldGhvZCBTdGFydFR1cm5cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFN0YXJ0VHVybigpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgIHRoaXMuVHVybk51bWJlciA9IDA7IC8vcmVzZXRpbmcgdGhlIHR1cm4gbnVtYmVyIG9uIHN0YXJ0IG9mIHRoZSBnYW1lXHJcblxyXG4gICAgLy9zZW5kaW5nIGluaXRpYWwgdHVybiBudW1iZXIgb3ZlciB0aGUgbmV0d29yayB0byBzdGFydCB0dXJuIHNpbXVsdGFub3VzbHkgb24gYWxsIGNvbm5lY3RlZCBwbGF5ZXIncyBkZXZpY2VzXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsIHRoaXMuVHVybk51bWJlcik7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUJhbmtydXB0RGF0YShfZGF0YSkge1xyXG4gICAgLy9vdGhlciBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFxyXG4gICAgdmFyIF9pc0JhbmtydXB0ZWQgPSBfZGF0YS5EYXRhLmJhbmtydXB0ZWQ7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLnR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGFNYWluO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF9pc0JhbmtydXB0ZWQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coX3R1cm4pO1xyXG4gICAgLy8gY29uc29sZS5sb2coX3BsYXllckRhdGEpO1xyXG5cclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3R1cm5dID0gX3BsYXllckRhdGE7XHJcblxyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkodHJ1ZSk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKHRydWUpO1xyXG5cclxuICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpIHtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIH0sIDEwMDApO1xyXG5cclxuICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEZ1bmN0aW9uIGZvciBnYW1lcGxheVxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiBwbGF5ZXIgVUkgKG5hbWUvaWNvbnMvbnVtYmVyIG9mIHBsYXllcnMgdGhhdCB0byBiZSBhY3RpdmUgZXRjKVxyXG4gICAgQG1ldGhvZCBBc3NpZ25QbGF5ZXJHYW1lVUlcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEFzc2lnblBsYXllckdhbWVVSShfaXNCYW5rcnVwdGVkID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBpZiAoIV9pc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB2YXIgX3JhbmRvbUluZGV4ID0gdGhpcy5nZXRSYW5kb20oMCwgdGhpcy5Cb3RHYW1lSW5mby5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm8ucHVzaCh0aGlzLkJvdEdhbWVJbmZvW19yYW5kb21JbmRleF0pO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IDI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8gPSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuU2V0QXZhdGFyKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlR2FtZVVJKF90b2dnbGVIaWdobGlnaHQsIF9pbmRleCkge1xyXG4gICAgaWYgKF90b2dnbGVIaWdobGlnaHQpIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtfaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8gPSB0aGlzLlBsYXllckdhbWVJbmZvW19pbmRleF07XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9pbmRleCA9PSBpbmRleCkge1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlQkdIaWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlQkdIaWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5Ub2dnbGVUZXh0aWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gZW5iYWxlIHJlc3BlY3RpdmUgcGxheWVycyBub2RlcyBpbnNpZGUgZ2FtYXBsYXlcclxuICAgIEBtZXRob2QgRW5hYmxlUGxheWVyTm9kZXNcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEVuYWJsZVBsYXllck5vZGVzKF9pc0JhbmtydXB0ZWQgPSBmYWxzZSkge1xyXG4gICAgaWYgKCFfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQgPT0gMSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQgPT0gMSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSG9tZUJhc2VkQW1vdW50ID09IDEpIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJyaWNrQW5kTW9ydGFyQW1vdW50ID09IDEpIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkF2YXRhclNwcml0ZXNbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySURdO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKSB7XHJcbiAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsIDEyMCkpO1xyXG4gICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uID0gdGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG5cclxuICAgIGxldCByYXRpbyA9IHRhcmdldFBvcy55IC8gY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAyO1xyXG4gIH0sXHJcblxyXG4gIGxhdGVVcGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5pc0NhbWVyYVpvb21pbmcpIHRoaXMuU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpO1xyXG4gIH0sXHJcblxyXG4gIHN5bmNEaWNlUm9sbChfcm9sbCkge1xyXG4gICAgdmFyIF9kaWNlMSA9IF9yb2xsLmRpY2UxO1xyXG4gICAgdmFyIF9kaWNlMiA9IF9yb2xsLmRpY2UyO1xyXG4gICAgdmFyIF9yZXN1bHQgPSBfZGljZTEgKyBfZGljZTI7XHJcblxyXG4gICAgSXNUd2VlbmluZyA9IHRydWU7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEID09IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9PSAwICYmICF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgIFJvbGxDb3VudGVyID0gMTM7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPT0gMTIpIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciArIDIxO1xyXG4gICAgICBlbHNlIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciArIDE7XHJcblxyXG4gICAgICBSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlciAtIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIERpY2VSb2xsID0gX3Jlc3VsdDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5QcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24oRGljZVJvbGwpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5UdXJuTnVtYmVyID09IGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5nZXRDb21wb25lbnQoXCJEaWNlQ29udHJvbGxlclwiKS5BbmltYXRlRGljZShfZGljZTEsIF9kaWNlMik7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgLy8gdmFyIF9wb3M9dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgLy8gdGhpcy5Ud2VlbkNhbWVyYShfcG9zLHRydWUsMC40KTtcclxuICB9LFxyXG5cclxuICBEaWNlRnVudGlvbmFsaXR5KCkge1xyXG4gICAgbGV0IHRhcmdldFBvcyA9IHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLCAxMjApKTtcclxuICAgIHZhciBfcG9zID0gdGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgdGhpcy5Ud2VlbkNhbWVyYShfcG9zLCB0cnVlLCAwLjQpO1xyXG4gIH0sXHJcblxyXG4gIFRlbXBDaGVja1NwYWNlKF9yb2xsaW5nKSB7XHJcbiAgICB2YXIgdGVtcGNvdW50ZXIgPSAwO1xyXG4gICAgdmFyIHRlbXBjb3VudGVyMiA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEID09IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIHRlbXBjb3VudGVyMiA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0ZW1wY291bnRlcjIgLSAxIDwgMCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwic3RhcnRpbmcgZnJvbSBvYmxpdmlvblwiKTtcclxuICAgICAgdGVtcGNvdW50ZXIgPSB0ZW1wY291bnRlcjIgKyBfcm9sbGluZyAtIDE7XHJcbiAgICAgIHZhciBkaWNldG9iZSA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIiArIGRpY2V0b2JlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRlbXBjb3VudGVyID0gdGVtcGNvdW50ZXIyICsgX3JvbGxpbmc7XHJcbiAgICAgIHZhciBkaWNldG9iZSA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIiArIGRpY2V0b2JlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSb2xsRGljZTogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgIHZhciBEaWNlMTtcclxuICAgICAgdmFyIERpY2UyO1xyXG4gICAgICBpZiAoX2lzVGVzdCAmJiB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICBEaWNlMSA9IHBhcnNlSW50KF9kaWNlaW5wdXQxKTtcclxuICAgICAgICBEaWNlMiA9IHBhcnNlSW50KF9kaWNlaW5wdXQyKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gdHJ1ZSAmJiBfaXNUZXN0KSB7XHJcbiAgICAgICAgRGljZTEgPSA1MDtcclxuICAgICAgICBEaWNlMiA9IDM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuICAgICAgICBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDEgPT0gRGljZTEpIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMiA9PSBEaWNlMikgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICAgICAgUHJldmlvdXNEaWNlUm9sbDEgPSBEaWNlMTtcclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsMiA9IERpY2UyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB2YXIgRGljZTE9MjA7XHJcbiAgICAgIC8vIHZhciBEaWNlMj0xO1xyXG5cclxuICAgICAgRGljZVJvbGwgPSBEaWNlMSArIERpY2UyO1xyXG4gICAgICB2YXIgX25ld1JvbGwgPSB7IGRpY2UxOiBEaWNlMSwgZGljZTI6IERpY2UyIH07XHJcbiAgICAgIC8vRGljZVJvbGw9MjM7XHJcbiAgICAgIC8vdGhpcy5UZW1wQ2hlY2tTcGFjZShEaWNlUm9sbCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZGljZSBudW1iZXI6IFwiICsgRGljZVJvbGwgKyBcIiwgRGljZTE6XCIgKyBEaWNlMSArIFwiLCBEaWNlMjpcIiArIERpY2UyKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMywgX25ld1JvbGwpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJvbGxPbmVEaWNlKCkge1xyXG4gICAgdmFyIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGw1ID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIFByZXZpb3VzRGljZVJvbGw1ID0gRGljZTE7XHJcblxyXG4gICAgcmV0dXJuIERpY2UxO1xyXG4gIH0sXHJcblxyXG4gIFJvbGxUd29EaWNlcygpIHtcclxuICAgIHZhciBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgdmFyIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGwzID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIGlmIChQcmV2aW91c0RpY2VSb2xsNCA9PSBEaWNlMikgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMyA9IERpY2UxO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDQgPSBEaWNlMjtcclxuXHJcbiAgICByZXR1cm4gRGljZTEgKyBEaWNlMjtcclxuICB9LFxyXG5cclxuICBjYWxsVXBvbkNhcmQoKSB7XHJcbiAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBfc3BhY2VJRCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICBpZiAoX3NwYWNlSUQgIT0gNiAmJiBfc3BhY2VJRCAhPSA3KSB7XHJcbiAgICAgICAgICAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVuYXMgc2VsbCBzcGFjZVxyXG4gICAgICAgICAgdmFyIFJhbmRvbUNhcmQgPSB0aGlzLmdldFJhbmRvbSgwLCAxNSk7XHJcblxyXG4gICAgICAgICAgLy9mb3IgdGVzdGluZyBvbmx5XHJcbiAgICAgICAgICBpZiAoX3NwYWNlSUQgPT0gMikge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIGJpZyBidXNpbmVzc1xyXG4gICAgICAgICAgICB2YXIgdmFsdWVJbmRleCA9IFswLCAxLCA3LCAxMCwgMiwgMywgNCwgNSwgNiwgOF07XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDEwKTtcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSAxO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSA1KSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgbG9zc2VzIGNhcmRzXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4ID0gWzAsIDEsIDUsIDYsIDIsIDcsIDMsIDQsIDgsIDldO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCAxMCk7XHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB2YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgLy8gUmFuZG9tQ2FyZCA9IDA7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF9zcGFjZUlEID09IDMpIHtcclxuICAgICAgICAgICAgLy9sYW5kZWQgb24gc29tZSBtYXJrZXRpbmcgY2FyZHNcclxuICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXggPSBbMCwgNywgMywgOCwgMTMsIDksIDEsIDIsIDQsIDVdO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCAxMCk7XHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB2YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gNTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3NwYWNlSUQgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIHdpbGQgY2FyZHNcclxuICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXggPSBbMCwgMSwgNiwgMTAsIDIsIDMsIDRdO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCA3KTtcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoX3NwYWNlSUQpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIHJlYWwgcGxheWVyXHJcbiAgICAgICAgICAgIGlmIChfc3BhY2VJRCA9PSAxMikge1xyXG4gICAgICAgICAgICAgIC8vIGlmIHBsYXllciBsYW5kZWQgb24gZmluaXNoIHNwYWNlXHJcbiAgICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDU7XHJcbiAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YSA9IHsgcmFuZG9tQ2FyZDogUmFuZG9tQ2FyZCwgY291bnRlcjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICAgICAgaWYgKF9zcGFjZUlEID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgLy8gaWYgcGxheWVyIGxhbmRlZCBvbiBmaW5pc2ggc3BhY2VcclxuICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGEgPSB7IHJhbmRvbUNhcmQ6IFJhbmRvbUNhcmQsIGNvdW50ZXI6IFJvbGxDb3VudGVyIH07XHJcbiAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIEJvdEdhbWVPdmVyKSB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIHVzZXJHYW1lT3ZlcikgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wbGV0ZSB0dXJuIGlzIGNhbGxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKHRydWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBsZXRlQ2FyZFR1cm4oKSB7XHJcbiAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gIH0sXHJcblxyXG4gIENhbGxHYW1lQ29tcGxldGUoX2lzQm90ID0gZmFsc2UsIF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgLy8gaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgIC8vICAgICB0aGlzLlR1cm5OdW1iZXIgPSB0aGlzLkdldE15SW5kZXgoKTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gMDtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicGxheWVyIGlzIG5vdCBhY3RpdmUgcmV0dXJuaW5nXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY2FsY3VsYXRpbmcuLi4uXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJhZ21lIGlzIG5vdCBmaW5pc2hlZFwiKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgdmFyIF9jYXNoID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgICAgICB2YXIgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICB2YXIgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgIHZhciBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICAgIGxvYW5BbW91bnQgKz0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIF9nb2xkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudDtcclxuICAgICAgICAgIHZhciBfc3RvY2tzID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgIHZhciBPbmNlT3JTaGFyZSA9IF9kaWNlUmFuZG9tICogMTAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgR29sZENhc2ggPSBPbmNlT3JTaGFyZSAqIF9nb2xkO1xyXG4gICAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgICB2YXIgQk1DYXNoID0gKEJNQW1vdW50ICsgQk1Mb2NhdGlvbnMpICogMTUwMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBITUNhc2ggPSAwO1xyXG4gICAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMikgSE1DYXNoID0gMjUwMDAgKyA2MDAwMDtcclxuICAgICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDMpIEhNQ2FzaCA9IDI1MDAwICsgMjUwMDAgKyA2MDAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTY29yZSA9IFRvdGFsQXNzZXRzO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsSEJDYXNoID0gSE1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsR29sZENhc2ggPSBHb2xkQ2FzaDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFN0b2Nrc0Nhc2ggPSBTdG9ja0Nhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0pO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0YSBwdXNoZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBfcGxheWVySW5kZXggPSAwOyBfcGxheWVySW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgX3BsYXllckluZGV4KyspIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX2Nhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICB2YXIgSE1BbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICB2YXIgQk1Mb2NhdGlvbnMgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBsb2FuQW1vdW50ICs9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBfZ29sZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ7XHJcbiAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICB2YXIgT25jZU9yU2hhcmUgPSBfZGljZVJhbmRvbSAqIDEwMDA7XHJcblxyXG4gICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgdmFyIEJNQ2FzaCA9IChCTUFtb3VudCArIEJNTG9jYXRpb25zKSAqIDE1MDAwMDtcclxuXHJcbiAgICAgICAgdmFyIEhNQ2FzaCA9IDA7XHJcbiAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDIpIEhNQ2FzaCA9IDI1MDAwICsgNjAwMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMykgSE1DYXNoID0gMjUwMDAgKyAyNTAwMCArIDYwMDAwO1xyXG5cclxuICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU2NvcmUgPSBUb3RhbEFzc2V0cztcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxIQkNhc2ggPSBITUNhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEdvbGRDYXNoID0gR29sZENhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU3RvY2tzQ2FzaCA9IFN0b2NrQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDYsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50VG9TeW5jR2FtZUNvbXBsZXRlRGF0YShfZGF0YSkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNiwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFN5bmNHYW1lT3ZlcihfVUlEKSB7XHJcbiAgICB2YXIgaW5mb1RleHQgPSBcIlwiO1xyXG4gICAgdmFyIHN0YXR1c1RleHQgPSBcIlwiO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGlmICghR2FtZUNvbXBsZXRlZCkge1xyXG4gICAgICAgIEdhbWVDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdERhdGEoKTtcclxuICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgIHZhciBNeURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHtcclxuICAgICAgICAgIHZhciBfaW5kZXggPSAtMTtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAgICAgICBfaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkdhbWUgd29uIGJ5IFwiICsgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCA9PSBfVUlEKSB7XHJcbiAgICAgICAgICAgIC8veW91IHdvblxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJDb25ncmF0cyEgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiO1xyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIF9jdXJyZW50Q2FzaCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoKTtcclxuICAgICAgICAgICAgdmFyIF90b3RhbCA9IF9jdXJyZW50Q2FzaCArIHBhcnNlSW50KE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IF90b3RhbC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIF93b24gPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbik7XHJcbiAgICAgICAgICAgIF93b24gPSBfd29uICsgMTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb24gPSBfd29uLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5VcGRhdGVVc2VyRGF0YShfdG90YWwsIF93b24sIC0xKTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8veW91IGxvc2VcclxuICAgICAgICAgICAgc3RhdHVzVGV4dCA9IFwiVW5mb3J0dW5hdGVseSEgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIjtcclxuICAgICAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiQnJpY2sgQW5kIE1vcnRhciBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEJNQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkxvYW4gQmFsYW5jZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxMb2FuQmFsYW5jZSArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIjtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL3dpdGggYm90XHJcbiAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgdmFyIE15RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIGNvbnNvbGUubG9nKF9VSUQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhNeURhdGEuUGxheWVyVUlEKTtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1swXS5HYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICBpZiAoTXlEYXRhLlBsYXllclVJRCA9PSBfVUlEKSB7XHJcbiAgICAgICAgLy95b3Ugd29uXHJcbiAgICAgICAgc3RhdHVzVGV4dCA9IFwiQ29uZ3JhdHMhIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIjtcclxuICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiQnJpY2sgQW5kIE1vcnRhciBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEJNQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkxvYW4gQmFsYW5jZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxMb2FuQmFsYW5jZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIk90aGVyIFBsYXllciBFYXJuZWQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzFdLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIjtcclxuXHJcbiAgICAgICAgdmFyIF9jdXJyZW50Q2FzaCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoKTtcclxuICAgICAgICB2YXIgX3RvdGFsID0gX2N1cnJlbnRDYXNoICsgcGFyc2VJbnQoTXlEYXRhLlRvdGFsU2NvcmUpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gX3RvdGFsLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHZhciBfd29uID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb24pO1xyXG4gICAgICAgIF93b24gPSBfd29uICsgMTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbiA9IF93b24udG9TdHJpbmcoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5VcGRhdGVVc2VyRGF0YShfdG90YWwsIF93b24sIC0xKTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8veW91IGxvc2VcclxuXHJcbiAgICAgICAgc3RhdHVzVGV4dCA9IFwiVW5mb3J0dW5hdGVseSEgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIjtcclxuICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiQnJpY2sgQW5kIE1vcnRhciBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEJNQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkxvYW4gQmFsYW5jZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxMb2FuQmFsYW5jZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIk90aGVyIFBsYXllciBFYXJuZWQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzFdLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIjtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0dhbWVDb21wbGV0ZURhdGEoX2RhdGEpIHtcclxuICAgIHZhciBfaXNCb3QgPSBfZGF0YS5Cb3Q7XHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSh0cnVlLCBmYWxzZSk7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiR2FtZSBvdmVyLCBjYWxjdWxhdGluZyB0b3RhbCBjYXNoLi4uXCIsIDE1MDAsIGZhbHNlKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG5cclxuICAgICAgICB2YXIgbWF4ID0gLTE7XHJcbiAgICAgICAgdmFyIFNlbGVjdGVkSW5kID0gMDtcclxuICAgICAgICB2YXIgU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgaWYgKF92YWx1ZSA+IG1heCkge1xyXG4gICAgICAgICAgICBTZWxlY3RlZEluZCA9IGluZGV4O1xyXG4gICAgICAgICAgICBtYXggPSBfdmFsdWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coX3ZhbHVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUudHJhY2UoXCJnYW1lIHdvbiBieSBwbGF5ZXIgaWQ6IFwiICsgU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLlBsYXllclVJRCk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJHYW1lIG92ZXIsIGNhbGN1bGF0aW5nIHRvdGFsIGNhc2guLi5cIiwgMTUwMCwgZmFsc2UpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dE9ubHkoKTtcclxuXHJcbiAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgICAgICB2YXIgbWF4ID0gLTE7XHJcbiAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQgPSAwO1xyXG4gICAgICAgICAgdmFyIFNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFNlc3Npb25EYXRhKTtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChTZXNzaW9uRGF0YVtpbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChfdmFsdWUgPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIFNlbGVjdGVkSW5kID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBtYXggPSBfdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKF92YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLnRyYWNlKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIiArIFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIH0sIDE1MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgQm90OiBfaXNCb3QgfTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0dhbWVDb21wbGV0ZURhdGEoX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEdhbWVPdmVyKF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBpZiAoX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgLy8gICBpZiAoTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLklzQWN0aXZlID09IGZhbHNlIHx8IHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNvbXBsZXRlZDogXCIgKyBwbGF5ZXJjb21wbGV0ZWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGdhbWVpbmZvIGxlbmd0aDogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCk7XHJcbiAgICAgICAgaWYgKHBsYXllcmNvbXBsZXRlZCA+PSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCB8fCBfZm9yY2VHYW1lT3Zlcikge1xyXG4gICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtXHJcbiAgICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICAgIGlmIChfZm9yY2VHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpIEJvdEdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgZWxzZSB1c2VyR2FtZU92ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJ1c2VyZ2FtZW92ZXI6IFwiICsgdXNlckdhbWVPdmVyKTtcclxuICAgICAgY29uc29sZS5sb2coXCJib3RnYW1lb3ZlcjogXCIgKyBCb3RHYW1lT3Zlcik7XHJcbiAgICAgIC8vIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSh0cnVlKTtcclxuICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZCA9IDA7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoTWFpblNlc3Npb25EYXRhW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwbGF5ZXJjb21wbGV0ZWQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpIHtcclxuICAgICAgICAvL2dhbWVjb21wbGV0ZWQgb24gYWxsIHN5c3RlbXNcclxuICAgICAgICBCb3RHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgdXNlckdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBTdGFydERpY2VSb2xsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoUm9sbENvdW50ZXIgPj0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkdhbWVvdmVyXCIpO1xyXG4gICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuR2FtZU92ZXIoZmFsc2UpO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgIERpY2VUZW1wID0gRGljZVRlbXAgKyAxO1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLlR3ZWVuUGxheWVyKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldFJhbmRvbTogZnVuY3Rpb24gKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gIH0sXHJcblxyXG4gIFR3ZWVuQ2FtZXJhOiBmdW5jdGlvbiAoX3BvcywgaXNab29tLCB0aW1lKSB7XHJcbiAgICBjYy50d2Vlbih0aGlzLkNhbWVyYU5vZGUpXHJcbiAgICAgIC50byh0aW1lLCB7IHBvc2l0aW9uOiBjYy52MihfcG9zLngsIF9wb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc1pvb20pIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgZWxzZSB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgfSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgWm9vbUNhbWVyYUluKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkNhbWVyYS56b29tUmF0aW8gPCAyKSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gdGhpcy5DYW1lcmEuem9vbVJhdGlvICsgMC4wMztcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IDI7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tQYXlEYXlDb25kaXRpb25zKF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICBpZiAoUm9sbENvdW50ZXIgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNikge1xyXG4gICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlciA9IFBhc3NlZFBheURheUNvdW50ZXIgKyAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDcpIHtcclxuICAgICAgICBEb3VibGVQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgIERvdWJsZVBheURheUNvdW50ZXIrKztcclxuICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgICBpZiAoUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkgJiYgIV9uZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSwgX2lzQm90KTtcclxuICAgIH0gZWxzZSBpZiAoRG91YmxlUGF5RGF5IHx8IChQYXNzZWRQYXlEYXkgJiYgX25leHRUdXJuRG91YmxlUGF5KSkge1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbih0cnVlLCBfaXNCb3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBab29tQ2FtZXJhT3V0T25seSgpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5DYW1lcmEuem9vbVJhdGlvID49IDEpIHtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IHRoaXMuQ2FtZXJhLnpvb21SYXRpbyAtIDAuMDM7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMTtcclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIFpvb21DYW1lcmFPdXQoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA+PSAxKSB7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSB0aGlzLkNhbWVyYS56b29tUmF0aW8gLSAwLjAzO1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMTtcclxuICAgICAgICAvLyBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbigwKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgJiYgIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCAmJiAhdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnModGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgIC8vcmVhbCBwbGF5ZXJcclxuICAgICAgICAgIGlmIChQbGF5ZXJMZWZ0KSB7XHJcbiAgICAgICAgICAgIC8vIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgUGxheWVyTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucygpO1xyXG4gICAgICAgICAgZWxzZSB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIFR3ZWVuUGxheWVyOiBmdW5jdGlvbiAoTm9kZSwgVG9Qb3MpIHtcclxuICAgIGNjLnR3ZWVuKE5vZGUpIC8vMC40XHJcbiAgICAgIC50bygwLjQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpIH0sIHsgZWFzaW5nOiBcInF1YWRJbk91dFwiIH0pXHJcbiAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZiAoRGljZVRlbXAgPCBEaWNlUm9sbCkge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coRGljZVRlbXAgKyBcIiBcIiArIFJvbGxDb3VudGVyKTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCkge1xyXG4gICAgICAgICAgICAgIGlmICghQm90R2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYgfHxcclxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDdcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYm90IGdhbWUgaXMgb3ZlclwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKCF1c2VyR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYgfHxcclxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDdcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8vIGNvbnNvbGUuZXJyb3IoUGFzc2VkUGF5RGF5Q291bnRlcik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlciBnYW1lIGlzIG92ZXIgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhQYXNzZWRQYXlEYXkpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3KSB7XHJcbiAgICAgICAgICAgICAgICAgIERvdWJsZVBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIERvdWJsZVBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgZmluaXNoZWQgZm9yOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoUm9sbENvdW50ZXIgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmIChSb2xsQ291bnRlciA9PSAxMikgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDIxO1xyXG4gICAgICAgICAgICBlbHNlIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyAxO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDE7XHJcbiAgICAgICAgICAgIERpY2VUZW1wID0gRGljZVJvbGw7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy9EaWNlVGVtcD1EaWNlVGVtcCsxO1xyXG4gICAgICAgICAgLy8gIGNvbnNvbGUubG9nKERpY2VUZW1wICsgXCIgXCIgKyBSb2xsQ291bnRlcik7XHJcblxyXG4gICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAvL3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIF9uZXdwb3MgPSBjYy5WZWMyKDAsIDApO1xyXG4gICAgICAgICAgdGhpcy5Ud2VlbkNhbWVyYShfbmV3cG9zLCBmYWxzZSwgMC42KTsgLy96b29tb3V0XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICAvL3J1bGVzIGltcGxtZW50YXRpb24gZHVyaW5nIHR1cm4gKHR1cm4gZGVjaXNpb25zKVxyXG5cclxuICBUb2dnbGVQYXlEYXkoX3N0MSwgX1N0Mikge1xyXG4gICAgUGFzc2VkUGF5RGF5ID0gX3N0MTtcclxuICAgIERvdWJsZVBheURheSA9IF9TdDI7XHJcblxyXG4gICAgaWYgKCFfc3QxKSB7XHJcbiAgICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghX1N0Mikge1xyXG4gICAgICBEb3VibGVQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBJbmNyZWFzZURvdWJsZVBheURheSgpIHtcclxuICAgIERvdWJsZVBheURheUNvdW50ZXIrKztcclxuICB9LFxyXG5cclxuICBFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oYW1vdW50LCBfaW5kZXgsIF9sb2NhdGlvbk5hbWUsIF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPCAzKSB7XHJcbiAgICAgIGlmICghX2lzQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoIC0gYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ICsgMTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsIDEwMDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIiArIGFtb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfR2l2ZW5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgX0dpdmVuQ2FzaCA9IF9HaXZlbkNhc2ggLSBhbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgKyAxO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUucHVzaChfbG9jYXRpb25OYW1lKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZXhwYW5kZWQgeW91ciBidXNpbmVzcy5cIiwgMTAwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgICB9LCAxMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoIHRvIGV4cGFuZCB0aGlzIGJ1c2luZXNzLCBjYXNoIG5lZWRlZCAkIFwiICsgYW1vdW50ICsgXCIsIENhc2ggR2l2ZW4gJFwiICsgX0dpdmVuQ2FzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgbG9jYXRpb25zXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSwgX0dpdmVuQ2FzaCA9IDAsIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZSkge1xyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHBhcnNlSW50KHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgLy90aGlzIG1lYW5zIHRoZXJlIGlzIGJyaWNrIGFuZCBtb3J0YXIgaW4gbGlzdFxyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldEJ1c2luZXNzSW5kZXgoaSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0Q2FyZEZ1bmN0aW9uYWxpdHkoX2lzQ2FyZEZ1bmN0aW9uYWxpdHkpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldEdpdmVuQ2FzaChfR2l2ZW5DYXNoKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2goX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuUmVzZXRFZGl0Qm94KCk7XHJcbiAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKEJ1c2luZXNzTG9jYXRpb25Ob2Rlcyk7XHJcbiAgICByZXR1cm4gQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDtcclxuICB9LFxyXG5cclxuICBEZXN0cm95R2VuZXJhdGVkTm9kZXMoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uKF9uYW1lLCBfU2hhcmVBbW91bnQsIF9pc0FkZGluZykge1xyXG4gICAgaWYgKF9pc0FkZGluZykge1xyXG4gICAgICB2YXIgX3N0b2NrID0gbmV3IFN0b2NrSW5mbygpO1xyXG4gICAgICBfc3RvY2suQnVzaW5lc3NOYW1lID0gX25hbWU7XHJcbiAgICAgIF9zdG9jay5TaGFyZUFtb3VudCA9IF9TaGFyZUFtb3VudDtcclxuXHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mU3RvY2tzLnB1c2goX3N0b2NrKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihfaXNEb3VibGVQYXlEYXkgPSBmYWxzZSwgX2lzQm90ID0gZmFsc2UsIF9mb3JTZWxlY3RlZEJ1c2luZXNzID0gZmFsc2UsIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSAwLCBIQkFtb3VudCA9IDAsIEJNQW1vdW50ID0gMCwgQk1Mb2NhdGlvbnMgPSAwKSB7XHJcbiAgICBpZiAoX2ZvclNlbGVjdGVkQnVzaW5lc3MpIHtcclxuICAgICAgdmFyIF90aXRsZSA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Bc3NpZ25EYXRhX1BheURheShfdGl0bGUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIF9pc0JvdCwgX2ZvclNlbGVjdGVkQnVzaW5lc3MsIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgsIEhCQW1vdW50LCBCTUFtb3VudCwgQk1Mb2NhdGlvbnMsIDEsIDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKERvdWJsZVBheURheSAmJiBQYXNzZWRQYXlEYXkgJiYgX25leHRUdXJuRG91YmxlUGF5KSB7XHJcbiAgICAgICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIF9za2lwTmV4dFBheWRheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheTtcclxuICAgICAgX3NraXBITU5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEhNTmV4dFBheWRheTtcclxuICAgICAgX3NraXBCTU5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheTtcclxuXHJcbiAgICAgIGlmIChfc2tpcE5leHRQYXlkYXkpIHtcclxuICAgICAgICAvL2lmIHByZXZpb3VzbHkgc2tpcCBwYXlkYXkgd2FzIHN0b3JlZCBieSBhbnkgY2FyZFxyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmICghX2lzQm90KSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgUGF5RGF5LlwiLCAxNjAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgfSwgMTY1MCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2tpcHBpbmcgUGF5RGF5LlwiKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIF90aXRsZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmIChfaXNEb3VibGVQYXlEYXkpIF90aXRsZSA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgICAgZWxzZSBfdGl0bGUgPSBcIlBheURheVwiO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBfaXNEb3VibGVQYXlEYXksIF9za2lwSE1OZXh0UGF5ZGF5LCBfc2tpcEJNTmV4dFBheWRheSwgX2lzQm90LCBmYWxzZSwgMCwgMCwgMCwgMCwgUGFzc2VkUGF5RGF5Q291bnRlciwgRG91YmxlUGF5RGF5Q291bnRlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBCYW5rcnVwdF9UdXJuRGVjaXNpb24oKSB7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCYW5rcnVwdCA9IHRydWU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQmFua3J1cHRBbW91bnQgKz0gMTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSwgZmFsc2UsIHRoaXMuU2VsZWN0ZWRNb2RlLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCYW5rcnVwdCwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50KTtcclxuICB9LFxyXG5cclxuICBTZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnQsIF91SUQpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgRGF0YTogeyBDYXNoOiBfYW1vdW50LCBJRDogX3VJRCB9IH07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEzLCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfZGF0YSkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gX2RhdGEuRGF0YS5DYXNoO1xyXG4gICAgICB2YXIgX2lEID0gX2RhdGEuRGF0YS5JRDtcclxuXHJcbiAgICAgIHZhciBfbXlJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlBsYXllclVJRCA9PSBfaUQpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uaXNHYW1lRmluaXNoZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uVG90YWxTY29yZSArPSBfYW1vdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSByZWNlaXZlZCBwcm9maXQgb2YgJFwiICsgX2Ftb3VudCArIFwiIGZyb20geW91ciBwYXJ0bmVyLlwiLCAyODAwKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIENhcmRzIFJ1bGVzXHJcbiAgVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oX3N0YXRlKSB7XHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXkgPSBfbmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcE5leHRUdXJuKF9zdGF0ZSkge1xyXG4gICAgX3NraXBOZXh0VHVybiA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4gPSBfc2tpcE5leHRUdXJuO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoX3N0YXRlKSB7XHJcbiAgICBfc2tpcE5leHRQYXlkYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXkgPSBfc2tpcE5leHRQYXlkYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoX3N0YXRlKSB7XHJcbiAgICBfc2tpcEhNTmV4dFBheWRheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5ID0gX3NraXBITU5leHRQYXlkYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihfc3RhdGUpIHtcclxuICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXkgPSBfc2tpcEJNTmV4dFBheWRheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVUdXJuUHJvZ3Jlc3MoX3N0YXRlKSB7XHJcbiAgICBUdXJuSW5Qcm9ncmVzcyA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBSZXR1cm5UdXJuUHJvZ3Jlc3MoKSB7XHJcbiAgICByZXR1cm4gVHVybkluUHJvZ3Jlc3M7XHJcbiAgfSxcclxuXHJcbiAgTG9zZUFsbE1hcmtldGluZ01vbmV5KCkge1xyXG4gICAgdmFyIF9sb3NlQW1vdW50ID0gLTE7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA+IDApIHtcclxuICAgICAgX2xvc2VBbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9sb3NlQW1vdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2xvc2VBbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcikge1xyXG4gICAgdmFyIF9hbW91bnRJbmNyZWFzZWQgPSAtMTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID4gMCkge1xyXG4gICAgICBfYW1vdW50SW5jcmVhc2VkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCAqPSBfbXVsdGlwbGllcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9hbW91bnRJbmNyZWFzZWQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfYW1vdW50SW5jcmVhc2VkO1xyXG4gIH0sXHJcblxyXG4gIEdldE1hcmtldGluZ01vbmV5KF9wcm9maXQpIHtcclxuICAgIHZhciBfYW1vdW50ID0gLTE7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA+IDApIHtcclxuICAgICAgX3Byb2ZpdCA9IF9wcm9maXQgLyAxMDA7XHJcbiAgICAgIF9hbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ICo9IF9wcm9maXQ7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX2Ftb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9hbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24oX2RhdGEpIHtcclxuICAgIHZhciBfcXVlc3Rpb25SZWYgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1F1ZXN0aW9uc0RhdGEoKTtcclxuICAgIHZhciBfdXNlcklEID0gX2RhdGEuVXNlcklEO1xyXG4gICAgdmFyIF9xdWVzdGlvbkluZGV4ID0gX2RhdGEuUXVlc3Rpb247XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX2RhdGEuVXNlckluZGV4O1xyXG4gICAgdmFyIF9pc1ZvYyA9IF9kYXRhLklzVm9jO1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcbiAgICBpZiAoX3VzZXJJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJJRCBtYXRjaGVkXCIpO1xyXG5cclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfUWRhdGE7XHJcbiAgICAgIGlmIChfaXNWb2MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInZvY1wiKTtcclxuICAgICAgICBfUWRhdGEgPSBfcXVlc3Rpb25SZWYuVm9jYWJ1bGFyeVF1ZXN0aW9uc1tfcXVlc3Rpb25JbmRleF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlc3RcIik7XHJcbiAgICAgICAgX1FkYXRhID0gX3F1ZXN0aW9uUmVmLkVzdGFibGlzaG1lbnRRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXhdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBDb3JyZWN0QW5zd2VyID0gX1FkYXRhLkNvcnJlY3RPcHRpb247XHJcbiAgICAgIHZhciBfbWVzc2FnZSA9IFwiQ2hvb3NlIHRoZSBjb3JyZWN0IGFuc3dlci5cIiArIFwiXFxuXCIgKyBcIip3cm9uZyBhbnN3ZXIgd2lsbCBjb3N0IHlvdSBhIGZpbmUgb2YgJDUwMDAuXCIgKyBcIlxcblwiICsgXCJcXG5cIiArIF9RZGF0YS5RdWVzdGlvbiArIFwiXFxuXCIgKyBcIkEuIFwiICsgX1FkYXRhLk9wdGlvbjEgKyBcIlxcblwiICsgXCJCLiBcIiArIF9RZGF0YS5PcHRpb24yICsgXCJcXG5cIiArIFwiQy4gXCIgKyBfUWRhdGEuT3B0aW9uMyArIFwiXFxuXCIgKyBcIkQuIFwiICsgX1FkYXRhLk9wdGlvbjQ7XHJcblxyXG4gICAgICAvLyB2YXIgX3F1ZXN0aW9uQXNrZWQgPSBPbmVRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXggLSAxXTtcclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9tZXNzYWdlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbihfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgdmFyIF9teURhdGE7XHJcbiAgICB2YXIgX3Jvb21EYXRhO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIF9yb29tRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBfbXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgX3Jvb21EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgIH1cclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXlEYXRhLCBfcm9vbURhdGEsIF9pc1R1cm5PdmVyLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgfSxcclxuXHJcbiAgT25lUXVlc3Rpb25EZWNpc2lvbl9TZWxlY3RPcHRpb25fT25lUXVlc3Rpb24oZXZlbnQgPSBudWxsKSB7XHJcbiAgICB2YXIgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfc2VsZWN0aW9uID0gcGFyc2VJbnQoZXZlbnQuY3VycmVudFRhcmdldC5uYW1lLnNwbGl0KFwiX1wiKVsxXSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJvcHRpb24gc2VsZWN0ZWQ6IFwiICsgX3NlbGVjdGlvbik7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNvcnJlY3RBbnN3ZXI6IFwiICsgQ29ycmVjdEFuc3dlcik7XHJcbiAgICBpZiAoX3NlbGVjdGlvbiA9PSBDb3JyZWN0QW5zd2VyKSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3VyIGFuc3dlciB3YXMgY29ycmVjdCEuXCIsIDEyMDApO1xyXG4gICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIHRydWUsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX215RGF0YS5DYXNoID49IDUwMDApIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCAtPSA1MDAwO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIGFuc3dlcmVkIHdyb25nLCBmaW5lIGFtb3VudCB3YXMgcGF5ZWQgdG8gdGhlIHBsYXllci5cIiwgMTIwMCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24odHJ1ZSwgZmFsc2UsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLCBTa2lwcGluZyBxdWVzdGlvblwiKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihmYWxzZSwgZmFsc2UsIDAsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAvL0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vIE9uZVF1ZXN0aW9uRGVjaXNpb25fUGF5QW1vdW50X09uZVF1ZXN0aW9uKCkge1xyXG4gIC8vICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAvLyAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gIC8vICAgaWYgKF9teURhdGEuQ2FzaCA+PSA1MDAwKSB7XHJcbiAgLy8gICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gIC8vICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAvLyAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggLT0gNTAwMDtcclxuICAvLyAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdKTtcclxuICAvLyAgICAgICAgIGJyZWFrO1xyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgfVxyXG5cclxuICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBwYWlkIGNhc2ggYW1vdW50IHRvIHBsYXllci5cIiwgMTIwMCk7XHJcbiAgLy8gICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIC8vICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbih0cnVlLCBmYWxzZSwgLTEsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAvLyAgIH0gZWxzZSB7XHJcbiAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgLy8gICB9XHJcbiAgLy8gfSxcclxuXHJcbiAgLy8gT25lUXVlc3Rpb25EZWNpc2lvbl9BbnN3ZXJRdWVzdGlvbl9PbmVRdWVzdGlvbigpIHtcclxuICAvLyAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgLy8gICB2YXIgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gIC8vICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBhbnN3ZXJlZCB0aGUgcXVlc3Rpb24uXCIsIDEyMDApO1xyXG4gIC8vICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgLy8gICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihmYWxzZSwgdHJ1ZSwgT25lUXVlc3Rpb25JbmRleCwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gIC8vIH0sXHJcblxyXG4gIFJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfaGFzRG9uZVBheW1lbnQsIF9oYXNBbnN3ZXJlZFF1ZXN0aW9uLCBfcXVlc3Rpb25JbmRleCwgX1VzZXJJRCkge1xyXG4gICAgdmFyIF9kYXRhID0geyBQYXltZW50RG9uZTogX2hhc0RvbmVQYXltZW50LCBRdWVzdGlvbkFuc3dlcmVkOiBfaGFzQW5zd2VyZWRRdWVzdGlvbiwgUXVlc3Rpb25JbmRleDogX3F1ZXN0aW9uSW5kZXgsIElEOiBfVXNlcklEIH07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDgsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfZGF0YSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgIHZhciBfaGFzRG9uZVBheW1lbnQgPSBfZGF0YS5QYXltZW50RG9uZTtcclxuICAgICAgdmFyIF9oYXNBbnN3ZXJlZFF1ZXN0aW9uID0gX2RhdGEuUXVlc3Rpb25BbnN3ZXJlZDtcclxuICAgICAgdmFyIF9xdWVzdGlvbkluZGV4ID0gX2RhdGEuUXVlc3Rpb25JbmRleDtcclxuICAgICAgdmFyIF91SUQgPSBfZGF0YS5JRDtcclxuXHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGF5ZXIgZG9lcyBub3QgaGF2ZSBlbm91Z2ggY2FzaCwgc28gcXVlc3Rpb25zIHdlcmUgc2tpcHBlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9oYXNEb25lUGF5bWVudCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoICs9IDUwMDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwicGxheWVyIGhhcyBnaXZlbiB3cm9uZyBhbnN3ZXIsIGNhc2ggJDUwMDAgaGFzIGJlZW4gYWRkZWQuXCIsIDIxMDApO1xyXG4gICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9oYXNBbnN3ZXJlZFF1ZXN0aW9uKSB7XHJcbiAgICAgICAgICB2YXIgX3NlbGVjdGVkUGxheWVySW5kZXggPSAwO1xyXG4gICAgICAgICAgdmFyIF9hY3RvcnNEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG5cclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKF91SUQgPT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgICAgX3NlbGVjdGVkUGxheWVySW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGF5ZXIgaGFzIGdpdmVuIGNvcnJlY3QgYW5zd2VyLCBubyBjYXNoIHdhcyByZWNlaXZlZC5cIiwgMjEwMCk7XHJcblxyXG4gICAgICAgICAgLy8gaWYgKF9xdWVzdGlvbkluZGV4ID09IDEpIHtcclxuICAgICAgICAgIC8vICAgLy9oYXZlIHlvdSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuU2tpcHBlZExvYW5QYXltZW50KSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSBza2lwcGVkIGxvYW4gcGF5ZW1lbnQgaW4gcHJldmlvdXMgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMikge1xyXG4gICAgICAgICAgLy8gICAvL0hhdmUgeW91IHRha2VuIGFueSBsb2FuP1xyXG4gICAgICAgICAgLy8gICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgLy8gICAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgLy8gICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICAvLyAgICAgICBicmVhaztcclxuICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAvLyAgIH1cclxuXHJcbiAgICAgICAgICAvLyAgIGlmIChfbG9hblRha2VuKSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSB0YWtlbiBzb21lIGxvYW5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgdGFrZW4gYW55IGxvYW5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMykge1xyXG4gICAgICAgICAgLy8gICAvL0FyZSB5b3UgYmFua3J1cHRlZD8gaWYgbW9yZSB0aGFuIG9uY2UsIHRlbGwgbWUgdGhlIGFtb3VudD9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLklzQmFua3J1cHQpIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZCBcIiArIF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkJhbmtydXB0QW1vdW50ICsgXCIgdGltZS9lcy5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDQpIHtcclxuICAgICAgICAgIC8vICAgLy9JcyB5b3VyIHR1cm4gZ29pbmcgdG8gYmUgc2tpcHBlZCBuZXh0IHRpbWU/XHJcbiAgICAgICAgICAvLyAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgYmUgc2tpcHBlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIG5vdCBiZSBza2lwcGVkLlwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSA1KSB7XHJcbiAgICAgICAgICAvLyAgIC8vSXMgaXQgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgeW91ciBuZXh0IHBheWRheT9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5KSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgcGF5ZGF5IHdpbGwgYmUgZG91YmxlIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBub3QgYmUgZG91YmxlIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgaWYgKElzVHdlZW5pbmcgPT0gdHJ1ZSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICAgIH0sIDgwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3NwYWNlcyA9IF9kYXRhLkRhdGEuYmFja3NwYWNlcztcclxuICAgICAgdmFyIF9jb3VudGVyID0gX2RhdGEuRGF0YS5Db3VudGVyO1xyXG5cclxuICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19jb3VudGVyICsgQmFja3NwYWNlc10uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MsIDAuMSk7XHJcblxyXG4gICAgICBSb2xsQ291bnRlciA9IF9jb3VudGVyO1xyXG4gICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUd2VlblBsYXllcl9Hb0JhY2tTcGFjZXM6IGZ1bmN0aW9uIChOb2RlLCBUb1Bvcywgc3BlZWQgPSAwLjYpIHtcclxuICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgIC50byhzcGVlZCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge30pXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIEdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICBSb2xsQ291bnRlciAtPSBCYWNrc3BhY2VzO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHZhciBfZGF0YSA9IHsgRGF0YTogeyBiYWNrc3BhY2VzOiBCYWNrc3BhY2VzLCBDb3VudGVyOiBSb2xsQ291bnRlciB9IH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTAsIF9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1Bvcyk7XHJcbiAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuICAvLyNlbmRyZWdpb25cclxufSk7XHJcbi8vbW9kdWxlLmV4cG9ydHMgID0gUGxheWVyRGF0YTsgLy93aGVuIGltcG9ydHMgaW4gYW5vdGhlciBzY3JpcHQgb25seSByZWZlcmVuY2Ugb2YgcGxheWVyZGF0YSBjbGFzcyB3b3VsZCBiZSBhYmxlIHRvIGFjY2Vzc2VkIGZyb20gR2FtZW1hbmFnZXIgaW1wb3J0XHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZU1hbmFnZXI7XHJcbi8vI2VuZHJlZ2lvblxyXG4iXX0=