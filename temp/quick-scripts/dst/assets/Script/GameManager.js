
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
    },
    ReceiveDoublePayDay: {
      displayName: "ReceiveDoublePayDay",
      type: cc.Boolean,
      "default": false,
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
    },
    NextTurnHalfPayDay: {
      displayName: "NextTurnHalfPayDay",
      type: cc.Boolean,
      "default": false,
      serializable: true
    },
    NextTurnHalfPayDayCounter: {
      displayName: "NextTurnHalfPayDayCounter",
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
    ReceiveDoublePayDayAmount: {
      displayName: "ReceiveDoublePayDayAmount",
      type: cc.Integer,
      "default": 0,
      serializable: true
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
    },
    CanGiveProfitOnPayDay: {
      displayName: "CanGiveProfitOnPayDay",
      type: cc.Boolean,
      "default": true,
      serializable: true
    },
    UserIDForProfitPayDay: {
      displayName: "UserIDForProfitPayDay",
      type: cc.Text,
      "default": "",
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
var _nextTurnhalfPay = false;
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
    _nextTurnhalfPay = false;
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
        Dice1 = 1;
        Dice2 = 1;
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
            var valueIndex = [0, 1, 5, 6, 2, 7, 3, 4, 8, 9, 10, 11, 12, 13, 14];
            var index = this.getRandom(0, 15);
            RandomCard = valueIndex[index]; //RandomCard = 14;
          } else if (_spaceID == 3) {
            //landed on some marketing cards
            var valueIndex = [0, 7, 3, 8, 13, 9, 1, 2, 4, 5];
            var index = this.getRandom(0, 10);
            RandomCard = valueIndex[index]; //RandomCard = 5;
          } else if (_spaceID == 1) {
            //landed on some wild cards
            var valueIndex = [0, 1, 6, 10, 2, 3, 4, 5, 7, 8, 9];
            var index = this.getRandom(0, 11);
            RandomCard = valueIndex[index]; // RandomCard = 9;
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
    _nextTurnhalfPay = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.NextTurnHalfPayDay;

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
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title, false, false, false, _isBot, _forSelectedBusiness, _SelectedBusinessIndex, HBAmount, BMAmount, BMLocations, 1, 0, _nextTurnhalfPay);
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
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title, _isDoublePayDay, _skipHMNextPayday, _skipBMNextPayday, _isBot, false, 0, 0, 0, 0, PassedPayDayCounter, DoublePayDayCounter, _nextTurnhalfPay);
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
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have received profit of $" + _amount + " from other player.", 2800);
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
  ToggleHalfPayNextTurn: function ToggleHalfPayNextTurn(_state) {
    _nextTurnhalfPay = _state;
    this.PlayerGameInfo[this.TurnNumber].CardFunctionality.NextTurnHalfPayDay = _nextTurnhalfPay;
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
  SelectPlayerProfit_Space_CardFunctionality: function SelectPlayerProfit_Space_CardFunctionality(_isTurnOver) {
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

    _gameplayUIManager.ToggleScreen_SelectPlayerForProfit(true);

    _gameplayUIManager.ResetSpaceScreen_SelectPlayerForProfit();

    _gameplayUIManager.SetUpSpaceScreen_SelectPlayerForProfit(_myData, _roomData, _isTurnOver, this.SelectedMode);
  },
  ReceiveEvent_SelectPlayerForProfit_Space_CardFunctionality: function ReceiveEvent_SelectPlayerForProfit_Space_CardFunctionality(_data) {
    var _ownID = _data.UserID.toString();

    var _playerIndex = parseInt(_data.UserIndex);

    var _playerName = _data.UserName;

    var _playerID = _data.OwnPlayerID.toString();

    var _gameplayUIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

    if (_ownID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
      console.log("received event: " + _playerName);

      for (var index = 0; index < this.PlayerGameInfo.length; index++) {
        if (this.PlayerGameInfo[index].PlayerUID == _ownID) {
          this.PlayerGameInfo[index].CanGiveProfitOnPayDay = true;
          this.PlayerGameInfo[index].UserIDForProfitPayDay = _playerID;
          GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[index]);
          GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("PlayerGameInfo", this.PlayerGameInfo, true);

          _gameplayUIManager.ShowToast("Player " + _playerName + " will receive all your next pay day profits", 3200);

          break;
        }
      }
    }
  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJQcmV2aW91c0RpY2VSb2xsMyIsIlByZXZpb3VzRGljZVJvbGw0IiwiUHJldmlvdXNEaWNlUm9sbDUiLCJ1c2VyR2FtZU92ZXIiLCJCb3RHYW1lT3ZlciIsIlRvdGFsQ291bnRlclJlYWNoZWQiLCJQYXNzZWRQYXlEYXlDb3VudGVyIiwiRG91YmxlUGF5RGF5Q291bnRlciIsIk5vQ2FyZEZ1bmN0aW9uYWxpdHkiLCJQbGF5ZXJMZWZ0IiwiRm9yY2VDaGFuZ2VUaW1lT3V0IiwiR2FtZUNvbXBsZXRlZCIsIkNvcnJlY3RBbnN3ZXIiLCJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIlBhcnRuZXJOYW1lIiwiTG9jYXRpb25zTmFtZSIsIkxvYW5UYWtlbiIsIkxvYW5BbW91bnQiLCJSZWNlaXZlRG91YmxlUGF5RGF5IiwiY3RvciIsIkNhcmREYXRhRnVuY3Rpb25hbGl0eSIsIk5leHRUdXJuRG91YmxlUGF5IiwiU2tpcE5leHRUdXJuIiwiU2tpcE5leHRQYXlkYXkiLCJTa2lwSE1OZXh0UGF5ZGF5IiwiU2tpcEJNTmV4dFBheWRheSIsIk5leHRUdXJuSGFsZlBheURheSIsIk5leHRUdXJuSGFsZlBheURheUNvdW50ZXIiLCJTdG9ja0luZm8iLCJTaGFyZUFtb3VudCIsIlBsYXllckRhdGEiLCJQbGF5ZXJOYW1lIiwiUGxheWVyVUlEIiwiQXZhdGFySUQiLCJJc0JvdCIsIk5vT2ZCdXNpbmVzcyIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiSG9tZUJhc2VkQW1vdW50IiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJSZWNlaXZlRG91YmxlUGF5RGF5QW1vdW50IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJOb09mU3RvY2tzIiwiQ2FzaCIsIkdvbGRDb3VudCIsIlN0b2NrQ291bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJMYXd5ZXJTdGF0dXMiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQbGF5ZXJSb2xsQ291bnRlciIsIkluaXRpYWxDb3VudGVyQXNzaWduZWQiLCJpc0dhbWVGaW5pc2hlZCIsIlRvdGFsU2NvcmUiLCJUb3RhbEhCQ2FzaCIsIlRvdGFsQk1DYXNoIiwiVG90YWxHb2xkQ2FzaCIsIlRvdGFsTG9hbkJhbGFuY2UiLCJUb3RhbFN0b2Nrc0Nhc2giLCJHYW1lT3ZlciIsIklzQWN0aXZlIiwiQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5IiwiVXNlcklERm9yUHJvZml0UGF5RGF5IiwiUm9sbENvdW50ZXIiLCJEaWNlVGVtcCIsIkRpY2VSb2xsIiwiSXNUd2VlbmluZyIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlR1cm5DaGVja0FycmF5IiwiQnVzaW5lc3NMb2NhdGlvbk5vZGVzIiwiUGFzc2VkUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiX25leHRUdXJuRG91YmxlUGF5IiwiX25leHRUdXJuaGFsZlBheSIsIl9za2lwTmV4dFR1cm4iLCJfc2tpcE5leHRQYXlkYXkiLCJfc2tpcEhNTmV4dFBheWRheSIsIl9za2lwQk1OZXh0UGF5ZGF5IiwiQ2FyZEV2ZW50UmVjZWl2ZWQiLCJUdXJuSW5Qcm9ncmVzcyIsIkJhY2tzcGFjZXMiLCJpc0dhbWVPdmVyIiwiT25lUXVlc3Rpb25JbmRleCIsIk9uZVF1ZXN0aW9ucyIsIkNhcmREaXNwbGF5U2V0VGltb3V0IiwiR2FtZU1hbmFnZXIiLCJDb21wb25lbnQiLCJQbGF5ZXJHYW1lSW5mbyIsIkJvdEdhbWVJbmZvIiwiUGxheWVyTm9kZSIsIk5vZGUiLCJDYW1lcmFOb2RlIiwiQWxsUGxheWVyVUkiLCJBbGxQbGF5ZXJOb2RlcyIsIlN0YXJ0TG9jYXRpb25Ob2RlcyIsIlNlbGVjdGVkTW9kZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlNldFBsYXllckxlZnQiLCJfc3RhdGUiLCJSZXNldEFsbFZhcmlhYmxlcyIsIklucHV0VGVzdERpY2UxIiwiX3ZhbCIsIklucHV0VGVzdERpY2UyIiwib25Mb2FkIiwiVHVybk51bWJlciIsIlR1cm5Db21wbGV0ZWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiSW5pdF9HYW1lTWFuYWdlciIsIlJhbmRvbUNhcmRJbmRleCIsIkNhcmRDb3VudGVyIiwiQ2FyZERpc3BsYXllZCIsInJlcXVpcmUiLCJDYW1lcmEiLCJnZXRDb21wb25lbnQiLCJpc0NhbWVyYVpvb21pbmciLCJDaGVja1NwZWN0YXRlIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkiLCJBbGxEYXRhIiwiTWF4UGxheWVycyIsImxlbmd0aCIsIlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlciIsIlVwZGF0ZUdhbWVVSSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiR2V0VHVybk51bWJlciIsIkdldE15SW5kZXgiLCJteUluZGV4IiwiX2FjdG9yIiwiUGhvdG9uQWN0b3IiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJfYWxsQWN0b3JzIiwiaW5kZXgiLCJTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8iLCJBc3NpZ25QbGF5ZXJHYW1lVUkiLCJFbmFibGVQbGF5ZXJOb2RlcyIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJjb25zb2xlIiwibG9nIiwiX3RvUG9zIiwiVmVjMiIsIkdldF9TcGFjZU1hbmFnZXIiLCJEYXRhIiwiUmVmZXJlbmNlTG9jYXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5Iiwic2V0UG9zaXRpb24iLCJfbGFzdEluZGV4IiwiYWN0aXZlIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIlRvdGFsQ29ubmVjdGVkUGxheWVycyIsIm15Um9vbUFjdG9yQ291bnQiLCJ1c2VySUQiLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNoYW5nZVR1cm4iLCJSYWlzZUV2ZW50Rm9yQ2FyZCIsIl9kYXRhIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJSYWlzZUV2ZW50IiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsImNsZWFyVGltZW91dCIsIkRpc3BsYXlDYXJkT25PdGhlcnMiLCJPbkxhbmRlZE9uU3BhY2UiLCJzZXRUaW1lb3V0IiwiUmVzZXRDYXJkRGlzcGxheSIsIlJlY2VpdmVFdmVudEZvckNhcmQiLCJSYW5kb21DYXJkIiwicmFuZG9tQ2FyZCIsImNvdW50ZXIiLCJSYWlzZUV2ZW50VHVybkNvbXBsZXRlIiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwiU3luY0FsbERhdGEiLCJSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUiLCJfdWlkIiwicHVzaCIsIkFycmF5TGVuZ3RoIiwiSURGb3VuZCIsImoiLCJSZXNldFNvbWVWYWx1ZXMiLCJDaGFuZ2VUdXJuRm9yY2VmdWxseSIsIlVwZGF0ZVZpc3VhbERhdGEiLCJSZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkiLCJUdXJuSGFuZGxlciIsIl90dXJuIiwiX2lzTWFzdGVyIiwiQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50IiwiX3BsYXllck1hdGNoZWQiLCJUb2dnbGVUdXJuUHJvZ3Jlc3MiLCJUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24iLCJSZXNldFR1cm5WYXJpYWJsZSIsIlJvbGxEaWNlIiwiRGljZVJvbGxTY3JlZW4iLCJQbGF5ZXJJbmZvIiwibXlSb29tQWN0b3JzQXJyYXkiLCJTaG93VG9hc3QiLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJfaW5kIiwiTWFpblNlc3Npb25EYXRhIiwiTXlEYXRhIiwiX2NvdW50ZXIiLCJTdGFydFR1cm4iLCJSZWNlaXZlQmFua3J1cHREYXRhIiwiX2lzQmFua3J1cHRlZCIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiX3BsYXllckRhdGEiLCJQbGF5ZXJEYXRhTWFpbiIsIlN0YXJ0VHVybkFmdGVyQmFua3J1cHQiLCJfcmFuZG9tSW5kZXgiLCJnZXRSYW5kb20iLCJTZXROYW1lIiwiU2V0QXZhdGFyIiwiX3RvZ2dsZUhpZ2hsaWdodCIsIl9pbmRleCIsIlRvZ2dsZUJHSGlnaGxpZ2h0ZXIiLCJUb2dnbGVUZXh0aWdobGlnaHRlciIsImNoaWxkcmVuIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJBdmF0YXJTcHJpdGVzIiwiU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcyIsInRhcmdldFBvcyIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsInBhcmVudCIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwicmF0aW8iLCJ3aW5TaXplIiwiaGVpZ2h0Iiwiem9vbVJhdGlvIiwibGF0ZVVwZGF0ZSIsInN5bmNEaWNlUm9sbCIsIl9yb2xsIiwiX2RpY2UxIiwiZGljZTEiLCJfZGljZTIiLCJkaWNlMiIsIl9yZXN1bHQiLCJlcnJvciIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsIkFuaW1hdGVEaWNlIiwiRGljZUZ1bnRpb25hbGl0eSIsIl9wb3MiLCJUd2VlbkNhbWVyYSIsIlRlbXBDaGVja1NwYWNlIiwiX3JvbGxpbmciLCJ0ZW1wY291bnRlciIsInRlbXBjb3VudGVyMiIsImRpY2V0b2JlIiwicGFyc2VJbnQiLCJTcGFjZURhdGEiLCJTcGFjZXNUeXBlIiwiRGljZTEiLCJEaWNlMiIsIl9uZXdSb2xsIiwiUm9sbE9uZURpY2UiLCJSb2xsVHdvRGljZXMiLCJjYWxsVXBvbkNhcmQiLCJfc3BhY2VJRCIsInZhbHVlSW5kZXgiLCJTdGFydERpY2VSb2xsIiwiU2VuZGluZ0RhdGEiLCJpc0JvdCIsImNvbXBsZXRlQ2FyZFR1cm4iLCJBbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZCIsIkNhbGxHYW1lQ29tcGxldGUiLCJfaXNCb3QiLCJfZm9yY2VHYW1lT3ZlciIsIl9wbGF5ZXJJbmRleCIsIl9jYXNoIiwiSE1BbW91bnQiLCJHZXRfR2FtZU1hbmFnZXIiLCJCTUFtb3VudCIsIkJNTG9jYXRpb25zIiwibG9hbkFtb3VudCIsIl9nb2xkIiwiX3N0b2NrcyIsIl9kaWNlUmFuZG9tIiwiT25jZU9yU2hhcmUiLCJHb2xkQ2FzaCIsIlN0b2NrQ2FzaCIsIkJNQ2FzaCIsIkhNQ2FzaCIsIlRvdGFsQXNzZXRzIiwiUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZSIsIlJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhIiwiU3luY0dhbWVPdmVyIiwiX1VJRCIsImluZm9UZXh0Iiwic3RhdHVzVGV4dCIsIkRpc2Nvbm5lY3REYXRhIiwiU2hvd1Jlc3VsdFNjcmVlbiIsIl9jdXJyZW50Q2FzaCIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU3R1ZGVudERhdGEiLCJnYW1lQ2FzaCIsIl90b3RhbCIsInRvU3RyaW5nIiwiX3dvbiIsImdhbWVzV29uIiwiVXBkYXRlVXNlckRhdGEiLCJTeW5jR2FtZUNvbXBsZXRlRGF0YSIsIkJvdCIsIlpvb21DYW1lcmFPdXRPbmx5IiwibWF4IiwiU2VsZWN0ZWRJbmQiLCJTZXNzaW9uRGF0YSIsIl92YWx1ZSIsInRyYWNlIiwicGxheWVyY29tcGxldGVkIiwiWm9vbUNhbWVyYU91dCIsIlR3ZWVuUGxheWVyIiwibWluIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaXNab29tIiwidGltZSIsInR3ZWVuIiwidG8iLCJ2MiIsImVhc2luZyIsImNhbGwiLCJab29tQ2FtZXJhSW4iLCJzdGFydCIsIkNoZWNrUGF5RGF5Q29uZGl0aW9ucyIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIiwiVG9Qb3MiLCJfbmV3cG9zIiwiVG9nZ2xlUGF5RGF5IiwiX3N0MSIsIl9TdDIiLCJJbmNyZWFzZURvdWJsZVBheURheSIsIkV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsImFtb3VudCIsIl9sb2NhdGlvbk5hbWUiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIlNldEJ1c2luZXNzSW5kZXgiLCJTZXRDYXJkRnVuY3Rpb25hbGl0eSIsIlNldEdpdmVuQ2FzaCIsIlNldFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIlJlc2V0RWRpdEJveCIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsImRlc3Ryb3kiLCJVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJfU2hhcmVBbW91bnQiLCJfaXNBZGRpbmciLCJfc3RvY2siLCJfaXNEb3VibGVQYXlEYXkiLCJfZm9yU2VsZWN0ZWRCdXNpbmVzcyIsIl9TZWxlY3RlZEJ1c2luZXNzSW5kZXgiLCJIQkFtb3VudCIsIl90aXRsZSIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJfYW1vdW50IiwiX3VJRCIsIklEIiwiUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9pRCIsIl9teUluZGV4IiwiVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4iLCJUb2dnbGVIYWxmUGF5TmV4dFR1cm4iLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJSZXR1cm5UdXJuUHJvZ3Jlc3MiLCJMb3NlQWxsTWFya2V0aW5nTW9uZXkiLCJfbG9zZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfbXVsdGlwbGllciIsIl9hbW91bnRJbmNyZWFzZWQiLCJHZXRNYXJrZXRpbmdNb25leSIsIl9wcm9maXQiLCJRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbiIsIl9xdWVzdGlvblJlZiIsIkdldF9RdWVzdGlvbnNEYXRhIiwiX3VzZXJJRCIsIlVzZXJJRCIsIl9xdWVzdGlvbkluZGV4IiwiUXVlc3Rpb24iLCJVc2VySW5kZXgiLCJfaXNWb2MiLCJJc1ZvYyIsIl9nYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9RZGF0YSIsIlZvY2FidWxhcnlRdWVzdGlvbnMiLCJFc3RhYmxpc2htZW50UXVlc3Rpb25zIiwiQ29ycmVjdE9wdGlvbiIsIl9tZXNzYWdlIiwiT3B0aW9uMSIsIk9wdGlvbjIiLCJPcHRpb24zIiwiT3B0aW9uNCIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJfaXNUdXJuT3ZlciIsIl9teURhdGEiLCJfcm9vbURhdGEiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9TZWxlY3RPcHRpb25fT25lUXVlc3Rpb24iLCJldmVudCIsIl9zZWxlY3Rpb24iLCJjdXJyZW50VGFyZ2V0Iiwic3BsaXQiLCJSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJTZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJTZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIlJlY2VpdmVFdmVudF9TZWxlY3RQbGF5ZXJGb3JQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfb3duSUQiLCJfcGxheWVyTmFtZSIsIlVzZXJOYW1lIiwiX3BsYXllcklEIiwiT3duUGxheWVySUQiLCJfaGFzRG9uZVBheW1lbnQiLCJfaGFzQW5zd2VyZWRRdWVzdGlvbiIsIl9Vc2VySUQiLCJQYXltZW50RG9uZSIsIlF1ZXN0aW9uQW5zd2VyZWQiLCJRdWVzdGlvbkluZGV4IiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9zZWxlY3RlZFBsYXllckluZGV4IiwiX2FjdG9yc0RhdGEiLCJSZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkiLCJfc3BhY2VzIiwiYmFja3NwYWNlcyIsIkNvdW50ZXIiLCJUd2VlblBsYXllcl9Hb0JhY2tTcGFjZXMiLCJzcGVlZCIsIkdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBRyxLQUFkO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FB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QXdCLENBQUM4QixRQUF6QixDQUFrQ29FLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsRUFBMUUsRUFBOEVGLEtBQTlFO0FBQ0Q7O0FBRUQsUUFBSWxCLE1BQU0sR0FBRzVKLEVBQUUsQ0FBQzZKLElBQUgsQ0FBUWhGLHdCQUF3QixDQUFDOEIsUUFBekIsQ0FBa0NtRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEdEYsV0FBMUQsRUFBdUV1RixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHQyxDQUExRyxFQUE2R3JGLHdCQUF3QixDQUFDOEIsUUFBekIsQ0FBa0NtRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEdEYsV0FBMUQsRUFBdUV1RixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHRSxDQUEvTSxDQUFiOztBQUNBLFNBQUs0Uyx3QkFBTCxDQUE4QixLQUFLeFcsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixDQUE5QixFQUFvRXlDLE1BQXBFO0FBQ0EsU0FBSzZILGdCQUFMO0FBQ0QsR0F6cEV3QixDQTJwRXpCO0FBQ0E7O0FBNXBFeUIsQ0FBVCxDQUFsQixFQThwRUE7O0FBQ0F5TCxNQUFNLENBQUNDLE9BQVAsR0FBaUJwWCxXQUFqQixFQUNBIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX2lzVGVzdCA9IGZhbHNlO1xyXG52YXIgX2RpY2VpbnB1dDEgPSBcIlwiO1xyXG52YXIgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDEgPSAtMTtcclxudmFyIFByZXZpb3VzRGljZVJvbGwyID0gLTE7XHJcblxyXG52YXIgUHJldmlvdXNEaWNlUm9sbDMgPSAtMTtcclxudmFyIFByZXZpb3VzRGljZVJvbGw0ID0gLTE7XHJcblxyXG52YXIgUHJldmlvdXNEaWNlUm9sbDUgPSAtMTtcclxuXHJcbnZhciB1c2VyR2FtZU92ZXIgPSBmYWxzZTtcclxudmFyIEJvdEdhbWVPdmVyID0gZmFsc2U7XHJcbnZhciBUb3RhbENvdW50ZXJSZWFjaGVkID0gZmFsc2U7XHJcbnZhciBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxudmFyIERvdWJsZVBheURheUNvdW50ZXIgPSAwO1xyXG52YXIgTm9DYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG52YXIgUGxheWVyTGVmdCA9IGZhbHNlO1xyXG52YXIgRm9yY2VDaGFuZ2VUaW1lT3V0ID0gbnVsbDtcclxudmFyIEdhbWVDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIENvcnJlY3RBbnN3ZXIgPSAwO1xyXG4vLyNyZWdpb24gc3VwZXJjbGFzc2VzIGFuZCBlbnVtZXJhdGlvbnNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIHR5cGUgb2YgYnVzaW5lc3MtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEVudW1CdXNpbmVzc1R5cGUgPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIEhvbWVCYXNlZDogMSwgLy9hIGJ1c2luZXNzIHRoYXQgeW91IG9wZXJhdGUgb3V0IG9mIHlvdXIgaG9tZVxyXG4gIGJyaWNrQW5kbW9ydGFyOiAyLCAvL2Egc3RvcmUgZnJvbnQgYnVzaW5lc3NcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3NJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc0luZm9cIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lOiBcIkJ1c2luZXNzRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NUeXBlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vZGVcIixcclxuICAgICAgdHlwZTogRW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgZGVmYXVsdDogRW51bUJ1c2luZXNzVHlwZS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQnVzaW5lc3MgY2F0b2dvcnkgZm9yIHBsYXllcnNcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUeXBlXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJUeXBlIChieSBuYW1lKSBvZiBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOYW1lIG9mIHRoZSBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLFxyXG4gICAgfSxcclxuICAgIEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImJhbGFuY2Ugb2YgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBJc1BhcnRuZXJzaGlwOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzUGFydG5lcnNoaXBcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cHc6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGRvbmUgcGFydG5lcnNoaXAgd2l0aCBzb21lb25lIHdpdGggY3VycmVudCBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXJ0bmVySURcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklEIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhcnRuZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJuYW1lIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLFxyXG4gICAgfSxcclxuICAgIExvY2F0aW9uc05hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9jYXRpb25zTmFtZVwiLFxyXG4gICAgICB0eXBlOiBbY2MuVGV4dF0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaWYgcGxheWVyIG93bnMgYnJpY2sgYW5kIG1vcnRhciBoZS9zaGUgY2FuIGV4cGFuZCB0byBuZXcgbG9jYXRpb25cIixcclxuICAgIH0sXHJcbiAgICBMb2FuVGFrZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblRha2VuXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBSZWNlaXZlRG91YmxlUGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlY2VpdmVEb3VibGVQYXlEYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQ2FyZERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhRnVuY3Rpb25hbGl0eSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkNhcmREYXRhRnVuY3Rpb25hbGl0eVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5leHRUdXJuRG91YmxlUGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5leHRUdXJuRG91YmxlUGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBpdHMgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcE5leHRUdXJuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBOZXh0VHVyblwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgdHVybiBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgdHVybiBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTmV4dFBheWRheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcEhNTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwSE1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGhvbWUgYmFzZWQgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcEJNTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwQk1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGJyaWNrYSBhbmQgbW1vcnRhciBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBOZXh0VHVybkhhbGZQYXlEYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmV4dFR1cm5IYWxmUGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3RvY2tJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTdG9ja0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTdG9ja0luZm9cIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lOiBcIlN0b2NrRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibmFtZSBvZiB0aGUgYnVzaW5lc3MgaW4gd2hpY2ggc3RvY2tzIHdpbGwgYmUgaGVsZFwiLFxyXG4gICAgfSxcclxuICAgIFNoYXJlQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNoYXJlQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJTaGFyZSBhbW91bnQgb2YgdGhlIHN0b2NrXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciAgUGxheWVyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBsYXllckRhdGEgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQbGF5ZXJEYXRhXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJuYW1lIG9mIHRoZSBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJVSUQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyVUlEXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJJRCBvZiB0aGUgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgQXZhdGFySUQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFySURcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImlkIHJlZmVyZW5jZSBmb3IgcGxheWVyIGF2YXRhciBzZWxlY3Rpb25cIixcclxuICAgIH0sXHJcbiAgICBJc0JvdDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc0JvdFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwdzogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIGN1cnJlbnQgcGxheWVyIGlzIGJvdFwiLFxyXG4gICAgfSxcclxuICAgIE5vT2ZCdXNpbmVzczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1wiLFxyXG4gICAgICB0eXBlOiBbQnVzaW5lc3NJbmZvXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOdW1iZXIgb2YgYnVzaW5lc3MgYSBwbGF5ZXIgY2FuIG93blwiLFxyXG4gICAgfSxcclxuICAgIENhcmRGdW5jdGlvbmFsaXR5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhcmRGdW5jdGlvbmFsaXR5XCIsXHJcbiAgICAgIHR5cGU6IENhcmREYXRhRnVuY3Rpb25hbGl0eSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImNhcmQgZnVuY3Rpb25hbGl0eSBzdG9yZWQgYnkgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZEFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIG9mIGhvbWUgYmFzZWQgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIEJyaWNrQW5kTW9ydGFyQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrQW5kTW9ydGFyQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJudW1iZXIgb2YgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgUmVjZWl2ZURvdWJsZVBheURheUFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZWNlaXZlRG91YmxlUGF5RGF5QW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbExvY2F0aW9uc0Ftb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbExvY2F0aW9uc0Ftb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIG9mIGxvY2F0aW9ucyBvZiBhbGwgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc2Vzc1wiLFxyXG4gICAgfSxcclxuICAgIE5vT2ZTdG9ja3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tzXCIsXHJcbiAgICAgIHR5cGU6IFtTdG9ja0luZm9dLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk51bWJlciBvZiBzdG9jayBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgY2FzaCBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIEdvbGRDb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHb2xkQ291bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImNvdW50IG9mIGdvbGQgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIFN0b2NrQ291bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tDb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY291bnQgb2Ygc3RvY2tzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBMb2FuVGFrZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblRha2VuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyB0YWtlbiBsb2FuIGZyb20gYmFuayBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBsb2FuIHRha2VuIGZyb20gdGhlIGJhbmtcIixcclxuICAgIH0sXHJcbiAgICBNYXJrZXRpbmdBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nQW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJtYXJrZXRpbmcgYW1vdW50IGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBMYXd5ZXJTdGF0dXM6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTGF3eWVyU3RhdHVzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBoaXJlZCBhIGxhd3llciBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBJc0JhbmtydXB0OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQmFua3J1cHRcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGJlZW4gQmFua3J1cHRlZCBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBCYW5rcnVwdEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCYW5rcnVwdEFtb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBob3cgbXVjaCB0aW1lIHBsYXllciBoYXMgYmVlbiBiYW5rcnVwdGVkXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcHBlZExvYW5QYXltZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBwZWRMb2FuUGF5bWVudFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgc2tpcHBlZCBsb2FuIHBheW1lbnRcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJSb2xsQ291bnRlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJSb2xsQ291bnRlclwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciB0byBzdG9yZSByb2xsIGNvdW50b3IgZm9yIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEluaXRpYWxDb3VudGVyQXNzaWduZWQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGlzR2FtZUZpbmlzaGVkOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcImlzR2FtZUZpbmlzaGVkXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxTY29yZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbFNjb3JlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEhCQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEhCQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxCTUNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCTUNhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsR29sZENhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxHb2xkQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxMb2FuQmFsYW5jZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbExvYW5CYWxhbmNlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbFN0b2Nrc0Nhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxTdG9ja3NDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBHYW1lT3Zlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHYW1lT3ZlclwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIElzQWN0aXZlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQWN0aXZlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBDYW5HaXZlUHJvZml0T25QYXlEYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgVXNlcklERm9yUHJvZml0UGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlVzZXJJREZvclByb2ZpdFBheURheVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiBHYW1lIE1hbmFnZXIgQ2xhc3NcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKG1haW4gY2xhc3MpIGNsYXNzIGZvciBHYW1lIE1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvbGxDb3VudGVyID0gMDtcclxudmFyIERpY2VUZW1wID0gMDtcclxudmFyIERpY2VSb2xsID0gMDtcclxudmFyIElzVHdlZW5pbmcgPSBmYWxzZTtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG52YXIgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcblxyXG52YXIgUGFzc2VkUGF5RGF5ID0gZmFsc2U7XHJcbnZhciBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuXHJcbi8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG52YXIgX25leHRUdXJuRG91YmxlUGF5ID0gZmFsc2U7XHJcbnZhciBfbmV4dFR1cm5oYWxmUGF5ID0gZmFsc2U7XHJcbnZhciBfc2tpcE5leHRUdXJuID0gZmFsc2U7XHJcbnZhciBfc2tpcE5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxudmFyIF9za2lwSE1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBob21lIGJhc2VkIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIF9za2lwQk1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG52YXIgVHVybkluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHJcbnZhciBCYWNrc3BhY2VzID0gMztcclxudmFyIGlzR2FtZU92ZXIgPSBmYWxzZTtcclxudmFyIE9uZVF1ZXN0aW9uSW5kZXggPSAtMTtcclxudmFyIE9uZVF1ZXN0aW9ucyA9IFtcInlvdSBoYXZlIHNraXBwZWQgbG9hbiBwcmV2aW91cyBwYXlkYXk/XCIsIFwieW91IGhhdmUgdGFrZW4gYW55IGxvYW4/XCIsIFwieW91IGhhdmUgYmFua3J1cHRlZCBldmVyP1wiLCBcInlvdXIgbmV4dCB0dXJuIGlzIGdvaW5nIHRvIGJlIHNraXBwZWQ/XCIsIFwieW91ciBuZXh0IHBheWRheSBpcyBnb2luZyB0byBiZSBkb3VibGUgcGF5ZGF5P1wiXTtcclxuXHJcbnZhciBDYXJkRGlzcGxheVNldFRpbW91dCA9IG51bGw7XHJcblxyXG52YXIgR2FtZU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJHYW1lTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJHYW1lSW5mbzoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYWxsIHBsYXllcidzIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBCb3RHYW1lSW5mbzoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYWxsIGJvdCdzIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FtZXJhTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIGNhbWVyYVwiLFxyXG4gICAgfSxcclxuICAgIEFsbFBsYXllclVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBvZiB1aSBvZiBhbGwgcGxheWVyc1wiLFxyXG4gICAgfSxcclxuICAgIEFsbFBsYXllck5vZGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBvZiBub2RlIG9mIGFsbCBwbGF5ZXJzIGluc2lkZSBnYW1lcGxheVwiLFxyXG4gICAgfSxcclxuICAgIFN0YXJ0TG9jYXRpb25Ob2Rlczoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2Ugb2YgYXR0YXkgb2YgbG9jYXRpb25zXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0ZWRNb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHJlZmVyZW5jZSBmb3IgZ2FtZSBtb2RlIDEgbWVhbnMgYm90IGFuZCAyIG1lYW5zIHJlYWwgcGxheWVyc1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICBQbGF5ZXJEYXRhOiBQbGF5ZXJEYXRhLFxyXG4gICAgQnVzaW5lc3NJbmZvOiBCdXNpbmVzc0luZm8sXHJcbiAgICBDYXJkRGF0YUZ1bmN0aW9uYWxpdHk6IENhcmREYXRhRnVuY3Rpb25hbGl0eSxcclxuICAgIEVudW1CdXNpbmVzc1R5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICBJbnN0YW5jZTogbnVsbCxcclxuICB9LFxyXG5cclxuICBTZXRQbGF5ZXJMZWZ0KF9zdGF0ZSkge1xyXG4gICAgUGxheWVyTGVmdCA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBSZXNldEFsbFZhcmlhYmxlcygpIHtcclxuICAgIF9kaWNlaW5wdXQxID0gXCJcIjtcclxuICAgIF9kaWNlaW5wdXQyID0gXCJcIjtcclxuICAgIFByZXZpb3VzRGljZVJvbGwxID0gLTE7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMiA9IC0xO1xyXG4gICAgUGxheWVyTGVmdCA9IGZhbHNlO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDMgPSAtMTtcclxuICAgIFByZXZpb3VzRGljZVJvbGw0ID0gLTE7XHJcbiAgICBfbmV4dFR1cm5oYWxmUGF5ID0gZmFsc2U7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsNSA9IC0xO1xyXG4gICAgR2FtZUNvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgdXNlckdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICBCb3RHYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgQ29ycmVjdEFuc3dlciA9IDA7XHJcbiAgICBSb2xsQ291bnRlciA9IDA7XHJcbiAgICBEaWNlVGVtcCA9IDA7XHJcbiAgICBEaWNlUm9sbCA9IDA7XHJcbiAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG4gICAgRm9yY2VDaGFuZ2VUaW1lT3V0ID0gbnVsbDtcclxuICAgIFBhc3NlZFBheURheSA9IGZhbHNlO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgIC8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gZmFsc2U7XHJcbiAgICBfc2tpcE5leHRUdXJuID0gZmFsc2U7XHJcbiAgICBfc2tpcE5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxuICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBob21lIGJhc2VkIGJ1c2luZXNzZXNzIG9ubHlcclxuICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyBvbmx5XHJcbiAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgVHVybkluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHJcbiAgICBCYWNrc3BhY2VzID0gMztcclxuICAgIGlzR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgIE9uZVF1ZXN0aW9uSW5kZXggPSAtMTtcclxuICAgIE9uZVF1ZXN0aW9ucyA9IFtcInlvdSBoYXZlIHNraXBwZWQgbG9hbiBwcmV2aW91cyBwYXlkYXk/XCIsIFwieW91IGhhdmUgdGFrZW4gYW55IGxvYW4/XCIsIFwieW91IGhhdmUgYmFua3J1cHRlZCBldmVyP1wiLCBcInlvdXIgbmV4dCB0dXJuIGlzIGdvaW5nIHRvIGJlIHNraXBwZWQ/XCIsIFwieW91ciBuZXh0IHBheWRheSBpcyBnb2luZyB0byBiZSBkb3VibGUgcGF5ZGF5P1wiXTtcclxuXHJcbiAgICBDYXJkRGlzcGxheVNldFRpbW91dCA9IG51bGw7XHJcbiAgICBUb3RhbENvdW50ZXJSZWFjaGVkID0gZmFsc2U7XHJcbiAgICBOb0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgSW5wdXRUZXN0RGljZTEoX3ZhbCkge1xyXG4gICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgX2RpY2VpbnB1dDEgPSBfdmFsO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIElucHV0VGVzdERpY2UyKF92YWwpIHtcclxuICAgIGlmIChfaXNUZXN0KSB7XHJcbiAgICAgIF9kaWNlaW5wdXQyID0gX3ZhbDtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNyZWdpb24gQWxsIEZ1bmN0aW9ucyBvZiBHYW1lTWFuYWdlclxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIGNsYXNzIGlzIGNyZWF0ZWRcclxuICAgKiovXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5SZXNldEFsbFZhcmlhYmxlcygpO1xyXG4gICAgR2FtZU1hbmFnZXIuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgdGhpcy5UdXJuTnVtYmVyID0gMDtcclxuICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLlNlbGVjdGVkTW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICB0aGlzLkluaXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleCA9IDA7XHJcbiAgICB0aGlzLkNhcmRDb3VudGVyID0gMDtcclxuICAgIHRoaXMuQ2FyZERpc3BsYXllZCA9IGZhbHNlO1xyXG4gICAgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcmVmZXJlbmNlIG9mIHJlcXVpcmVkIGNsYXNzZXNcclxuICAgKiovXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBpbml0aWFsIGdhbWVtYW5hZ2VyIGVzc2V0aWFsc1xyXG4gICAqKi9cclxuICBJbml0X0dhbWVNYW5hZ2VyKCkge1xyXG4gICAgdGhpcy5DYW1lcmEgPSB0aGlzLkNhbWVyYU5vZGUuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSk7XHJcbiAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mbyA9IFtdO1xyXG4gICAgUm9sbENvdW50ZXIgPSAwO1xyXG4gICAgRGljZVRlbXAgPSAwO1xyXG4gICAgRGljZVJvbGwgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIC8vaWYgam9pbmVkIHBsYXllciBpcyBzcGVjdGF0ZVxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzdGF0dXMgb2YgaW5pdGlhbCBidXNpbmVzcyBzZXRwOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpKTtcclxuXHJcbiAgICAgICAgLy9pZiBpbml0YWwgc2V0dXAgaGFzIGJlZW4gZG9uZSBhbmQgZ2FtZSBpcyB1bmRlciB3YXlcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgdmFyIEFsbERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gQWxsRGF0YTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgIHRoaXMuVHVybk51bWJlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIpO1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSwgdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAvL3RoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSA4O1xyXG4gICAgICAgICAgLy90aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSwgZmFsc2UsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgYm90IGFsb25nIHdpdGggb25lIHBsYXllclxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jcmVnaW9uIHB1YmxpYyBmdW5jdGlvbnMgdG8gZ2V0IGRhdGEgKGFjY2Vzc2libGUgZnJvbSBvdGhlciBjbGFzc2VzKVxyXG4gIEdldFR1cm5OdW1iZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5UdXJuTnVtYmVyO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZ2V0IG15IGluZGV4IGluIGFycmF5IG9mIFBsYXllckdhbWVJbmZvIFxyXG4gICAqKi9cclxuICBHZXRNeUluZGV4KCkge1xyXG4gICAgdmFyIG15SW5kZXggPSAwO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9hbGxBY3RvcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWxsQWN0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX2FjdG9yLlBsYXllclVJRCA9PSBfYWxsQWN0b3JzW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICBteUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbXlJbmRleDtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU3BlY3RhdGVNb2RlIENvZGVcclxuXHJcbiAgU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCkge1xyXG4gICAgdmFyIEFsbERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gQWxsRGF0YTtcclxuICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInN5bmNpbmcgYWxsIGRhdGEgZm9yIHNwZWN0YXRlXCIpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlciA+IDAgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCA9PSB0cnVlICYmICF0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCwgX3RvUG9zLnkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZyBwb3MxXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNvdW50ZXI6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5pdGlhbCBDb3VudGVyIEFzc2lnbmVkOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBmaW5pc2hlZCA6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICB2YXIgX2xhc3RJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGggLSAxO1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtfbGFzdEluZGV4XS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2xhc3RJbmRleF0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsIF90b1Bvcy55KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNldHRpbmcgcG9zMlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5sb2coXCJzeW5jZWQgcGxheWVybm9kZXNcIik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKSB7XHJcbiAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID09IFRvdGFsQ29ubmVjdGVkUGxheWVycykge1xyXG4gICAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgVHVybiBpcyBjYWxsZWQgYnk6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBmdW5jdGlvbnMgcmVsYXRlZCB0byBUdXJuIE1lY2hhbmlzbSBhbmQgY2FyZCBtZWNoYW5pc21cclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHdoYXQgY2FyZCBoYXMgYmVlbiBzZWxlY3RlZCBieSBwbGF5ZXJcclxuICAgKiovXHJcbiAgUmFpc2VFdmVudEZvckNhcmQoX2RhdGEpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNSwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIENsZWFyRGlzcGxheVRpbWVvdXQoKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gIH0sXHJcblxyXG4gIERpc3BsYXlDYXJkT25PdGhlcnMoKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgY29uc29sZS5sb2coXCJjYXJkIGV2ZW50IHJlY2VpdmVkOiBcIiArIENhcmRFdmVudFJlY2VpdmVkKTtcclxuICAgICAgaWYgKENhcmRFdmVudFJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcih0aGlzLkNhcmRDb3VudGVyKTtcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5DYXJkRGlzcGxheWVkKSB7XHJcbiAgICAgICAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuQ2FyZENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsIHRoaXMuUmFuZG9tQ2FyZEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgQ2FyZERpc3BsYXlTZXRUaW1vdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIC8vY2hlY2sgYWZ0ZXIgZXZlcnkgMC41IHNlY29uZHNcclxuICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRDYXJkRGlzcGxheSgpIHtcclxuICAgIHRoaXMuQ2FyZERpc3BsYXllZCA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpIHtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNhcmQgRGF0YSBSZWNlaXZlZDpcIik7XHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcblxyXG4gICAgdmFyIFJhbmRvbUNhcmQgPSBfZGF0YS5yYW5kb21DYXJkO1xyXG4gICAgdmFyIGNvdW50ZXIgPSBfZGF0YS5jb3VudGVyO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4ID0gUmFuZG9tQ2FyZDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXIgPSBjb3VudGVyO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKHRydWUsIFJhbmRvbUNhcmQpO1xyXG4gICAgICBlbHNlIENhcmRFdmVudFJlY2VpdmVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZSh0cnVlLCBSYW5kb21DYXJkKTtcclxuICAgICAgZWxzZSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZShmYWxzZSwgUmFuZG9tQ2FyZCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHBhcnRpY3VsYXIgcGxheWVyIGhhcyBjb21wbGV0ZSB0aGVpciBtb3ZlXHJcbiAgICoqL1xyXG4gIFJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJyYWlzZWQgZm9yIHR1cm4gY29tcGxldGVcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0FsbERhdGEoKSB7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIiwgdGhpcy5QbGF5ZXJHYW1lSW5mbywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgb24gYWxsIHBsYXllcnMgdG8gdmFsaWRhdGUgaWYgbW92ZSBpcyBjb21wbGV0ZWQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzXHJcbiAgICoqL1xyXG4gIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZShfdWlkKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL3JlYWwgcGxheWVyc1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChUdXJuQ2hlY2tBcnJheS5sZW5ndGggPT0gMCkgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTtcclxuXHJcbiAgICAgICAgdmFyIEFycmF5TGVuZ3RoID0gVHVybkNoZWNrQXJyYXkubGVuZ3RoO1xyXG4gICAgICAgIHZhciBJREZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEFycmF5TGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoVHVybkNoZWNrQXJyYXlbaW5kZXhdID09IF91aWQpIElERm91bmQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFJREZvdW5kKSB7XHJcbiAgICAgICAgICBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycyA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bal0uSXNBY3RpdmUpIFRvdGFsQ29ubmVjdGVkUGxheWVycysrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUdXJuIENoZWNrOiBcIiArIFR1cm5DaGVja0FycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUb3RhbCBDb25uZWN0ZWQgUGxheWVyczogXCIgKyBUb3RhbENvbm5lY3RlZFBsYXllcnMpO1xyXG5cclxuICAgICAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID49IFRvdGFsQ29ubmVjdGVkUGxheWVycykge1xyXG4gICAgICAgICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIC8vdGhpcy5TeW5jQWxsRGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgVHVybiBpcyBjYWxsZWQgYnk6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyO1xyXG4gICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGRpY2UgYW5pbWF0aW9uIGlzIHBsYXllZCBvbiBhbGwgcGxheWVyc1xyXG4gICAqKi9cclxuICBDaGFuZ2VUdXJuKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdGhpcy5TeW5jQWxsRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLlR1cm5OdW1iZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHRoaXMuVHVybk51bWJlciA9IHRoaXMuVHVybk51bWJlciArIDE7XHJcbiAgICBlbHNlIHRoaXMuVHVybk51bWJlciA9IDA7XHJcblxyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0U29tZVZhbHVlcygpIHtcclxuICAgIFR1cm5DaGVja0FycmF5ID0gW107XHJcbiAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZVR1cm5Gb3JjZWZ1bGx5KCkge1xyXG4gICAgaWYgKElzVHdlZW5pbmcpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KEZvcmNlQ2hhbmdlVGltZU91dCk7XHJcbiAgICAgIEZvcmNlQ2hhbmdlVGltZU91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlVHVybkZvcmNlZnVsbHkoKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbGVhclRpbWVvdXQoRm9yY2VDaGFuZ2VUaW1lT3V0KTtcclxuICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVmlzdWFsRGF0YSgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBmcm9tIHJhaXNlIG9uIGV2ZW50IChmcm9tIGZ1bmN0aW9uIFwiU3RhcnRUdXJuXCIgYW5kIFwiQ2hhbmdlVHVyblwiIG9mIHRoaXMgc2FtZSBjbGFzcykgdG8gaGFuZGxlIHR1cm5cclxuICAgKiovXHJcbiAgVHVybkhhbmRsZXIoX3R1cm4pIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHZhciBfaXNNYXN0ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCgpO1xyXG4gICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bX3R1cm5dLklzQWN0aXZlKSB7XHJcbiAgICAgICAgaWYgKF9pc01hc3Rlcikge1xyXG4gICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3RoaXMuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgdGhpcy5VcGRhdGVWaXN1YWxEYXRhKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlR1cm46IFwiICsgX3R1cm4pO1xyXG4gICAgdmFyIF9wbGF5ZXJNYXRjaGVkID0gZmFsc2U7XHJcbiAgICBfc2tpcE5leHRUdXJuID0gZmFsc2U7XHJcbiAgICBpZiAoSXNUd2VlbmluZykge1xyXG4gICAgICAvL2NoZWNrIGlmIGFuaW1hdGlvbiBvZiB0dXJuIGJlaW5nIHBsYXllZCBvbiBvdGhlciBwbGF5ZXJzXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHtcclxuICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgdGhpcy5UdXJuSGFuZGxlcihfdHVybik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCA4MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5UdXJuTnVtYmVyID0gX3R1cm47XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIF9za2lwTmV4dFR1cm4gPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3ModHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICghX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIHlvdXIgdHVybiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJHYW1lT3Zlcik7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgX3NraXBOZXh0VHVybiA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICBpZiAoIXVzZXJHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSAvL3R1cm4gZGVjaXNpb25zIGZvciBib3RcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIF9za2lwTmV4dFR1cm4gPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgaWYgKCFCb3RHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmICghX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Sb2xsRGljZSgpO1xyXG4gICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlR1cm4gT2Y6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQWxsUGxheWVyVUlbdGhpcy5UdXJuTnVtYmVyXS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5QbGF5ZXJJbmZvKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL3NraXAgdGhpcyB0dXJuIGFzIHNraXAgdHVybiBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlXHJcbiAgICAgIGlmIChfcGxheWVyTWF0Y2hlZCAmJiBfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTa2lwcGluZyBjdXJyZW50IHR1cm5cIiwgMTIwMCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTa2lwTmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfcGxheWVyTWF0Y2hlZCAmJiB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZCkge1xyXG4gICAgdmFyIE1haW5TZXNzaW9uRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIHZhciBNeURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX2NvdW50ZXIgPSBfaW5kO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEKTtcclxuICAgIC8vICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5Jc0FjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChfY291bnRlciA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzeW5jZWQgRGF0YTpcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCA9PSBNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXSA9IE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuXHJcbiAgICAgICAgICBpZiAoX2NvdW50ZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImFkZGluZyBjb3VudGVyOiBcIitfY291bnRlcik7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3luY2VkIERhdGE6XCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGFsbCBwbGF5ZXJzIGhhdmUgZG9uZSB0aGVpciBpbml0aWFsIHNldHVwIGFuZCBmaXJzdCB0dXJuIHN0YXJ0c1xyXG4gICAgQG1ldGhvZCBTdGFydFR1cm5cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFN0YXJ0VHVybigpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgIHRoaXMuVHVybk51bWJlciA9IDA7IC8vcmVzZXRpbmcgdGhlIHR1cm4gbnVtYmVyIG9uIHN0YXJ0IG9mIHRoZSBnYW1lXHJcblxyXG4gICAgLy9zZW5kaW5nIGluaXRpYWwgdHVybiBudW1iZXIgb3ZlciB0aGUgbmV0d29yayB0byBzdGFydCB0dXJuIHNpbXVsdGFub3VzbHkgb24gYWxsIGNvbm5lY3RlZCBwbGF5ZXIncyBkZXZpY2VzXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsIHRoaXMuVHVybk51bWJlcik7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUJhbmtydXB0RGF0YShfZGF0YSkge1xyXG4gICAgLy9vdGhlciBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFxyXG4gICAgdmFyIF9pc0JhbmtydXB0ZWQgPSBfZGF0YS5EYXRhLmJhbmtydXB0ZWQ7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLnR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGFNYWluO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF9pc0JhbmtydXB0ZWQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coX3R1cm4pO1xyXG4gICAgLy8gY29uc29sZS5sb2coX3BsYXllckRhdGEpO1xyXG5cclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3R1cm5dID0gX3BsYXllckRhdGE7XHJcblxyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkodHJ1ZSk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKHRydWUpO1xyXG5cclxuICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpIHtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIH0sIDEwMDApO1xyXG5cclxuICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEZ1bmN0aW9uIGZvciBnYW1lcGxheVxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiBwbGF5ZXIgVUkgKG5hbWUvaWNvbnMvbnVtYmVyIG9mIHBsYXllcnMgdGhhdCB0byBiZSBhY3RpdmUgZXRjKVxyXG4gICAgQG1ldGhvZCBBc3NpZ25QbGF5ZXJHYW1lVUlcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEFzc2lnblBsYXllckdhbWVVSShfaXNCYW5rcnVwdGVkID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBpZiAoIV9pc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB2YXIgX3JhbmRvbUluZGV4ID0gdGhpcy5nZXRSYW5kb20oMCwgdGhpcy5Cb3RHYW1lSW5mby5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm8ucHVzaCh0aGlzLkJvdEdhbWVJbmZvW19yYW5kb21JbmRleF0pO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IDI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8gPSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuU2V0QXZhdGFyKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlR2FtZVVJKF90b2dnbGVIaWdobGlnaHQsIF9pbmRleCkge1xyXG4gICAgaWYgKF90b2dnbGVIaWdobGlnaHQpIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtfaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8gPSB0aGlzLlBsYXllckdhbWVJbmZvW19pbmRleF07XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9pbmRleCA9PSBpbmRleCkge1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlQkdIaWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlQkdIaWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5Ub2dnbGVUZXh0aWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gZW5iYWxlIHJlc3BlY3RpdmUgcGxheWVycyBub2RlcyBpbnNpZGUgZ2FtYXBsYXlcclxuICAgIEBtZXRob2QgRW5hYmxlUGxheWVyTm9kZXNcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEVuYWJsZVBsYXllck5vZGVzKF9pc0JhbmtydXB0ZWQgPSBmYWxzZSkge1xyXG4gICAgaWYgKCFfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQgPT0gMSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQgPT0gMSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSG9tZUJhc2VkQW1vdW50ID09IDEpIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJyaWNrQW5kTW9ydGFyQW1vdW50ID09IDEpIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkF2YXRhclNwcml0ZXNbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySURdO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKSB7XHJcbiAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsIDEyMCkpO1xyXG4gICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uID0gdGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG5cclxuICAgIGxldCByYXRpbyA9IHRhcmdldFBvcy55IC8gY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAyO1xyXG4gIH0sXHJcblxyXG4gIGxhdGVVcGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5pc0NhbWVyYVpvb21pbmcpIHRoaXMuU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpO1xyXG4gIH0sXHJcblxyXG4gIHN5bmNEaWNlUm9sbChfcm9sbCkge1xyXG4gICAgdmFyIF9kaWNlMSA9IF9yb2xsLmRpY2UxO1xyXG4gICAgdmFyIF9kaWNlMiA9IF9yb2xsLmRpY2UyO1xyXG4gICAgdmFyIF9yZXN1bHQgPSBfZGljZTEgKyBfZGljZTI7XHJcblxyXG4gICAgSXNUd2VlbmluZyA9IHRydWU7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEID09IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9PSAwICYmICF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgIFJvbGxDb3VudGVyID0gMTM7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPT0gMTIpIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciArIDIxO1xyXG4gICAgICBlbHNlIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciArIDE7XHJcblxyXG4gICAgICBSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlciAtIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIERpY2VSb2xsID0gX3Jlc3VsdDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5QcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24oRGljZVJvbGwpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5UdXJuTnVtYmVyID09IGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5nZXRDb21wb25lbnQoXCJEaWNlQ29udHJvbGxlclwiKS5BbmltYXRlRGljZShfZGljZTEsIF9kaWNlMik7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgLy8gdmFyIF9wb3M9dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgLy8gdGhpcy5Ud2VlbkNhbWVyYShfcG9zLHRydWUsMC40KTtcclxuICB9LFxyXG5cclxuICBEaWNlRnVudGlvbmFsaXR5KCkge1xyXG4gICAgbGV0IHRhcmdldFBvcyA9IHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLCAxMjApKTtcclxuICAgIHZhciBfcG9zID0gdGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgdGhpcy5Ud2VlbkNhbWVyYShfcG9zLCB0cnVlLCAwLjQpO1xyXG4gIH0sXHJcblxyXG4gIFRlbXBDaGVja1NwYWNlKF9yb2xsaW5nKSB7XHJcbiAgICB2YXIgdGVtcGNvdW50ZXIgPSAwO1xyXG4gICAgdmFyIHRlbXBjb3VudGVyMiA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEID09IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIHRlbXBjb3VudGVyMiA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0ZW1wY291bnRlcjIgLSAxIDwgMCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwic3RhcnRpbmcgZnJvbSBvYmxpdmlvblwiKTtcclxuICAgICAgdGVtcGNvdW50ZXIgPSB0ZW1wY291bnRlcjIgKyBfcm9sbGluZyAtIDE7XHJcbiAgICAgIHZhciBkaWNldG9iZSA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIiArIGRpY2V0b2JlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRlbXBjb3VudGVyID0gdGVtcGNvdW50ZXIyICsgX3JvbGxpbmc7XHJcbiAgICAgIHZhciBkaWNldG9iZSA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIiArIGRpY2V0b2JlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSb2xsRGljZTogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgIHZhciBEaWNlMTtcclxuICAgICAgdmFyIERpY2UyO1xyXG4gICAgICBpZiAoX2lzVGVzdCAmJiB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICBEaWNlMSA9IHBhcnNlSW50KF9kaWNlaW5wdXQxKTtcclxuICAgICAgICBEaWNlMiA9IHBhcnNlSW50KF9kaWNlaW5wdXQyKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gdHJ1ZSAmJiBfaXNUZXN0KSB7XHJcbiAgICAgICAgRGljZTEgPSAxO1xyXG4gICAgICAgIERpY2UyID0gMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgICAgIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMSA9PSBEaWNlMSkgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICAgICAgaWYgKFByZXZpb3VzRGljZVJvbGwyID09IERpY2UyKSBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsMSA9IERpY2UxO1xyXG4gICAgICAgIFByZXZpb3VzRGljZVJvbGwyID0gRGljZTI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHZhciBEaWNlMT0yMDtcclxuICAgICAgLy8gdmFyIERpY2UyPTE7XHJcblxyXG4gICAgICBEaWNlUm9sbCA9IERpY2UxICsgRGljZTI7XHJcbiAgICAgIHZhciBfbmV3Um9sbCA9IHsgZGljZTE6IERpY2UxLCBkaWNlMjogRGljZTIgfTtcclxuICAgICAgLy9EaWNlUm9sbD0yMztcclxuICAgICAgLy90aGlzLlRlbXBDaGVja1NwYWNlKERpY2VSb2xsKTtcclxuICAgICAgY29uc29sZS5sb2coXCJkaWNlIG51bWJlcjogXCIgKyBEaWNlUm9sbCArIFwiLCBEaWNlMTpcIiArIERpY2UxICsgXCIsIERpY2UyOlwiICsgRGljZTIpO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgzLCBfbmV3Um9sbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUm9sbE9uZURpY2UoKSB7XHJcbiAgICB2YXIgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDUgPT0gRGljZTEpIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgUHJldmlvdXNEaWNlUm9sbDUgPSBEaWNlMTtcclxuXHJcbiAgICByZXR1cm4gRGljZTE7XHJcbiAgfSxcclxuXHJcbiAgUm9sbFR3b0RpY2VzKCkge1xyXG4gICAgdmFyIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcbiAgICB2YXIgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDMgPT0gRGljZTEpIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGw0ID09IERpY2UyKSBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIFByZXZpb3VzRGljZVJvbGwzID0gRGljZTE7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsNCA9IERpY2UyO1xyXG5cclxuICAgIHJldHVybiBEaWNlMSArIERpY2UyO1xyXG4gIH0sXHJcblxyXG4gIGNhbGxVcG9uQ2FyZCgpIHtcclxuICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICBpZiAoUm9sbENvdW50ZXIgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIF9zcGFjZUlEID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyO1xyXG4gICAgICAgIGlmIChfc3BhY2VJRCAhPSA2ICYmIF9zcGFjZUlEICE9IDcpIHtcclxuICAgICAgICAgIC8vNiBtZWFucyBwYXlkYXkgYW5kIDcgbWVhbnMgZG91YmxlIHBheWRheSwgOSBtZW5hcyBzZWxsIHNwYWNlXHJcbiAgICAgICAgICB2YXIgUmFuZG9tQ2FyZCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDE1KTtcclxuXHJcbiAgICAgICAgICAvL2ZvciB0ZXN0aW5nIG9ubHlcclxuICAgICAgICAgIGlmIChfc3BhY2VJRCA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgYmlnIGJ1c2luZXNzXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4ID0gWzAsIDEsIDcsIDEwLCAyLCAzLCA0LCA1LCA2LCA4XTtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRSYW5kb20oMCwgMTApO1xyXG4gICAgICAgICAgICBSYW5kb21DYXJkID0gdmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIC8vUmFuZG9tQ2FyZCA9IDE7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF9zcGFjZUlEID09IDUpIHtcclxuICAgICAgICAgICAgLy9sYW5kZWQgb24gc29tZSBsb3NzZXMgY2FyZHNcclxuICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXggPSBbMCwgMSwgNSwgNiwgMiwgNywgMywgNCwgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0XTtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRSYW5kb20oMCwgMTUpO1xyXG4gICAgICAgICAgICBSYW5kb21DYXJkID0gdmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIC8vUmFuZG9tQ2FyZCA9IDE0O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSAzKSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4ID0gWzAsIDcsIDMsIDgsIDEzLCA5LCAxLCAyLCA0LCA1XTtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRSYW5kb20oMCwgMTApO1xyXG4gICAgICAgICAgICBSYW5kb21DYXJkID0gdmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIC8vUmFuZG9tQ2FyZCA9IDU7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF9zcGFjZUlEID09IDEpIHtcclxuICAgICAgICAgICAgLy9sYW5kZWQgb24gc29tZSB3aWxkIGNhcmRzXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4ID0gWzAsIDEsIDYsIDEwLCAyLCAzLCA0LCA1LCA3LCA4LCA5XTtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRSYW5kb20oMCwgMTEpO1xyXG4gICAgICAgICAgICBSYW5kb21DYXJkID0gdmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIC8vIFJhbmRvbUNhcmQgPSA5O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoX3NwYWNlSUQpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIHJlYWwgcGxheWVyXHJcbiAgICAgICAgICAgIGlmIChfc3BhY2VJRCA9PSAxMikge1xyXG4gICAgICAgICAgICAgIC8vIGlmIHBsYXllciBsYW5kZWQgb24gZmluaXNoIHNwYWNlXHJcbiAgICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDU7XHJcbiAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YSA9IHsgcmFuZG9tQ2FyZDogUmFuZG9tQ2FyZCwgY291bnRlcjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICAgICAgaWYgKF9zcGFjZUlEID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgLy8gaWYgcGxheWVyIGxhbmRlZCBvbiBmaW5pc2ggc3BhY2VcclxuICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGEgPSB7IHJhbmRvbUNhcmQ6IFJhbmRvbUNhcmQsIGNvdW50ZXI6IFJvbGxDb3VudGVyIH07XHJcbiAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIEJvdEdhbWVPdmVyKSB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIHVzZXJHYW1lT3ZlcikgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wbGV0ZSB0dXJuIGlzIGNhbGxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKHRydWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBsZXRlQ2FyZFR1cm4oKSB7XHJcbiAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gIH0sXHJcblxyXG4gIENhbGxHYW1lQ29tcGxldGUoX2lzQm90ID0gZmFsc2UsIF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgLy8gaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgIC8vICAgICB0aGlzLlR1cm5OdW1iZXIgPSB0aGlzLkdldE15SW5kZXgoKTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gMDtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicGxheWVyIGlzIG5vdCBhY3RpdmUgcmV0dXJuaW5nXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY2FsY3VsYXRpbmcuLi4uXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJhZ21lIGlzIG5vdCBmaW5pc2hlZFwiKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgdmFyIF9jYXNoID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgICAgICB2YXIgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICB2YXIgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgIHZhciBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICAgIGxvYW5BbW91bnQgKz0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIF9nb2xkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudDtcclxuICAgICAgICAgIHZhciBfc3RvY2tzID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgIHZhciBPbmNlT3JTaGFyZSA9IF9kaWNlUmFuZG9tICogMTAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgR29sZENhc2ggPSBPbmNlT3JTaGFyZSAqIF9nb2xkO1xyXG4gICAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgICB2YXIgQk1DYXNoID0gKEJNQW1vdW50ICsgQk1Mb2NhdGlvbnMpICogMTUwMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBITUNhc2ggPSAwO1xyXG4gICAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMikgSE1DYXNoID0gMjUwMDAgKyA2MDAwMDtcclxuICAgICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDMpIEhNQ2FzaCA9IDI1MDAwICsgMjUwMDAgKyA2MDAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTY29yZSA9IFRvdGFsQXNzZXRzO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsSEJDYXNoID0gSE1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsR29sZENhc2ggPSBHb2xkQ2FzaDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFN0b2Nrc0Nhc2ggPSBTdG9ja0Nhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0pO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0YSBwdXNoZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBfcGxheWVySW5kZXggPSAwOyBfcGxheWVySW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgX3BsYXllckluZGV4KyspIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX2Nhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICB2YXIgSE1BbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICB2YXIgQk1Mb2NhdGlvbnMgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBsb2FuQW1vdW50ICs9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBfZ29sZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ7XHJcbiAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICB2YXIgT25jZU9yU2hhcmUgPSBfZGljZVJhbmRvbSAqIDEwMDA7XHJcblxyXG4gICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgdmFyIEJNQ2FzaCA9IChCTUFtb3VudCArIEJNTG9jYXRpb25zKSAqIDE1MDAwMDtcclxuXHJcbiAgICAgICAgdmFyIEhNQ2FzaCA9IDA7XHJcbiAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDIpIEhNQ2FzaCA9IDI1MDAwICsgNjAwMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMykgSE1DYXNoID0gMjUwMDAgKyAyNTAwMCArIDYwMDAwO1xyXG5cclxuICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU2NvcmUgPSBUb3RhbEFzc2V0cztcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxIQkNhc2ggPSBITUNhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEdvbGRDYXNoID0gR29sZENhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU3RvY2tzQ2FzaCA9IFN0b2NrQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDYsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50VG9TeW5jR2FtZUNvbXBsZXRlRGF0YShfZGF0YSkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNiwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFN5bmNHYW1lT3ZlcihfVUlEKSB7XHJcbiAgICB2YXIgaW5mb1RleHQgPSBcIlwiO1xyXG4gICAgdmFyIHN0YXR1c1RleHQgPSBcIlwiO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGlmICghR2FtZUNvbXBsZXRlZCkge1xyXG4gICAgICAgIEdhbWVDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdERhdGEoKTtcclxuICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgIHZhciBNeURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHtcclxuICAgICAgICAgIHZhciBfaW5kZXggPSAtMTtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAgICAgICBfaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkdhbWUgd29uIGJ5IFwiICsgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCA9PSBfVUlEKSB7XHJcbiAgICAgICAgICAgIC8veW91IHdvblxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJDb25ncmF0cyEgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiO1xyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIF9jdXJyZW50Q2FzaCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoKTtcclxuICAgICAgICAgICAgdmFyIF90b3RhbCA9IF9jdXJyZW50Q2FzaCArIHBhcnNlSW50KE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IF90b3RhbC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIF93b24gPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbik7XHJcbiAgICAgICAgICAgIF93b24gPSBfd29uICsgMTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb24gPSBfd29uLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5VcGRhdGVVc2VyRGF0YShfdG90YWwsIF93b24sIC0xKTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8veW91IGxvc2VcclxuICAgICAgICAgICAgc3RhdHVzVGV4dCA9IFwiVW5mb3J0dW5hdGVseSEgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIjtcclxuICAgICAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiQnJpY2sgQW5kIE1vcnRhciBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEJNQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkxvYW4gQmFsYW5jZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxMb2FuQmFsYW5jZSArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIjtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL3dpdGggYm90XHJcbiAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgdmFyIE15RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIGNvbnNvbGUubG9nKF9VSUQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhNeURhdGEuUGxheWVyVUlEKTtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1swXS5HYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICBpZiAoTXlEYXRhLlBsYXllclVJRCA9PSBfVUlEKSB7XHJcbiAgICAgICAgLy95b3Ugd29uXHJcbiAgICAgICAgc3RhdHVzVGV4dCA9IFwiQ29uZ3JhdHMhIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIjtcclxuICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiQnJpY2sgQW5kIE1vcnRhciBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEJNQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkxvYW4gQmFsYW5jZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxMb2FuQmFsYW5jZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIk90aGVyIFBsYXllciBFYXJuZWQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzFdLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIjtcclxuXHJcbiAgICAgICAgdmFyIF9jdXJyZW50Q2FzaCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoKTtcclxuICAgICAgICB2YXIgX3RvdGFsID0gX2N1cnJlbnRDYXNoICsgcGFyc2VJbnQoTXlEYXRhLlRvdGFsU2NvcmUpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gX3RvdGFsLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHZhciBfd29uID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb24pO1xyXG4gICAgICAgIF93b24gPSBfd29uICsgMTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbiA9IF93b24udG9TdHJpbmcoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5VcGRhdGVVc2VyRGF0YShfdG90YWwsIF93b24sIC0xKTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8veW91IGxvc2VcclxuXHJcbiAgICAgICAgc3RhdHVzVGV4dCA9IFwiVW5mb3J0dW5hdGVseSEgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIjtcclxuICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiQnJpY2sgQW5kIE1vcnRhciBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEJNQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkxvYW4gQmFsYW5jZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxMb2FuQmFsYW5jZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIk90aGVyIFBsYXllciBFYXJuZWQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzFdLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIjtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0dhbWVDb21wbGV0ZURhdGEoX2RhdGEpIHtcclxuICAgIHZhciBfaXNCb3QgPSBfZGF0YS5Cb3Q7XHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSh0cnVlLCBmYWxzZSk7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiR2FtZSBvdmVyLCBjYWxjdWxhdGluZyB0b3RhbCBjYXNoLi4uXCIsIDE1MDAsIGZhbHNlKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG5cclxuICAgICAgICB2YXIgbWF4ID0gLTE7XHJcbiAgICAgICAgdmFyIFNlbGVjdGVkSW5kID0gMDtcclxuICAgICAgICB2YXIgU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgaWYgKF92YWx1ZSA+IG1heCkge1xyXG4gICAgICAgICAgICBTZWxlY3RlZEluZCA9IGluZGV4O1xyXG4gICAgICAgICAgICBtYXggPSBfdmFsdWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coX3ZhbHVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUudHJhY2UoXCJnYW1lIHdvbiBieSBwbGF5ZXIgaWQ6IFwiICsgU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLlBsYXllclVJRCk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJHYW1lIG92ZXIsIGNhbGN1bGF0aW5nIHRvdGFsIGNhc2guLi5cIiwgMTUwMCwgZmFsc2UpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dE9ubHkoKTtcclxuXHJcbiAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgICAgICB2YXIgbWF4ID0gLTE7XHJcbiAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQgPSAwO1xyXG4gICAgICAgICAgdmFyIFNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFNlc3Npb25EYXRhKTtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChTZXNzaW9uRGF0YVtpbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChfdmFsdWUgPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIFNlbGVjdGVkSW5kID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBtYXggPSBfdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKF92YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLnRyYWNlKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIiArIFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIH0sIDE1MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgQm90OiBfaXNCb3QgfTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0dhbWVDb21wbGV0ZURhdGEoX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEdhbWVPdmVyKF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBpZiAoX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgLy8gICBpZiAoTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLklzQWN0aXZlID09IGZhbHNlIHx8IHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNvbXBsZXRlZDogXCIgKyBwbGF5ZXJjb21wbGV0ZWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGdhbWVpbmZvIGxlbmd0aDogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCk7XHJcbiAgICAgICAgaWYgKHBsYXllcmNvbXBsZXRlZCA+PSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCB8fCBfZm9yY2VHYW1lT3Zlcikge1xyXG4gICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtXHJcbiAgICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICAgIGlmIChfZm9yY2VHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpIEJvdEdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgZWxzZSB1c2VyR2FtZU92ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJ1c2VyZ2FtZW92ZXI6IFwiICsgdXNlckdhbWVPdmVyKTtcclxuICAgICAgY29uc29sZS5sb2coXCJib3RnYW1lb3ZlcjogXCIgKyBCb3RHYW1lT3Zlcik7XHJcbiAgICAgIC8vIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSh0cnVlKTtcclxuICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZCA9IDA7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoTWFpblNlc3Npb25EYXRhW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwbGF5ZXJjb21wbGV0ZWQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpIHtcclxuICAgICAgICAvL2dhbWVjb21wbGV0ZWQgb24gYWxsIHN5c3RlbXNcclxuICAgICAgICBCb3RHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgdXNlckdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBTdGFydERpY2VSb2xsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoUm9sbENvdW50ZXIgPj0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkdhbWVvdmVyXCIpO1xyXG4gICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuR2FtZU92ZXIoZmFsc2UpO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgIERpY2VUZW1wID0gRGljZVRlbXAgKyAxO1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLlR3ZWVuUGxheWVyKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldFJhbmRvbTogZnVuY3Rpb24gKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gIH0sXHJcblxyXG4gIFR3ZWVuQ2FtZXJhOiBmdW5jdGlvbiAoX3BvcywgaXNab29tLCB0aW1lKSB7XHJcbiAgICBjYy50d2Vlbih0aGlzLkNhbWVyYU5vZGUpXHJcbiAgICAgIC50byh0aW1lLCB7IHBvc2l0aW9uOiBjYy52MihfcG9zLngsIF9wb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc1pvb20pIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgZWxzZSB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgfSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgWm9vbUNhbWVyYUluKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkNhbWVyYS56b29tUmF0aW8gPCAyKSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gdGhpcy5DYW1lcmEuem9vbVJhdGlvICsgMC4wMztcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IDI7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tQYXlEYXlDb25kaXRpb25zKF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICBpZiAoUm9sbENvdW50ZXIgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNikge1xyXG4gICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlciA9IFBhc3NlZFBheURheUNvdW50ZXIgKyAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDcpIHtcclxuICAgICAgICBEb3VibGVQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgIERvdWJsZVBheURheUNvdW50ZXIrKztcclxuICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgICBfbmV4dFR1cm5oYWxmUGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuSGFsZlBheURheTtcclxuXHJcbiAgICBpZiAoUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkgJiYgIV9uZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSwgX2lzQm90KTtcclxuICAgIH0gZWxzZSBpZiAoRG91YmxlUGF5RGF5IHx8IChQYXNzZWRQYXlEYXkgJiYgX25leHRUdXJuRG91YmxlUGF5KSkge1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbih0cnVlLCBfaXNCb3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBab29tQ2FtZXJhT3V0T25seSgpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5DYW1lcmEuem9vbVJhdGlvID49IDEpIHtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IHRoaXMuQ2FtZXJhLnpvb21SYXRpbyAtIDAuMDM7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMTtcclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIFpvb21DYW1lcmFPdXQoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA+PSAxKSB7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSB0aGlzLkNhbWVyYS56b29tUmF0aW8gLSAwLjAzO1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMTtcclxuICAgICAgICAvLyBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbigwKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgJiYgIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCAmJiAhdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnModGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgIC8vcmVhbCBwbGF5ZXJcclxuICAgICAgICAgIGlmIChQbGF5ZXJMZWZ0KSB7XHJcbiAgICAgICAgICAgIC8vIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgUGxheWVyTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucygpO1xyXG4gICAgICAgICAgZWxzZSB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIFR3ZWVuUGxheWVyOiBmdW5jdGlvbiAoTm9kZSwgVG9Qb3MpIHtcclxuICAgIGNjLnR3ZWVuKE5vZGUpIC8vMC40XHJcbiAgICAgIC50bygwLjQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpIH0sIHsgZWFzaW5nOiBcInF1YWRJbk91dFwiIH0pXHJcbiAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZiAoRGljZVRlbXAgPCBEaWNlUm9sbCkge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coRGljZVRlbXAgKyBcIiBcIiArIFJvbGxDb3VudGVyKTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCkge1xyXG4gICAgICAgICAgICAgIGlmICghQm90R2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYgfHxcclxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDdcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYm90IGdhbWUgaXMgb3ZlclwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKCF1c2VyR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYgfHxcclxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDdcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8vIGNvbnNvbGUuZXJyb3IoUGFzc2VkUGF5RGF5Q291bnRlcik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlciBnYW1lIGlzIG92ZXIgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhQYXNzZWRQYXlEYXkpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3KSB7XHJcbiAgICAgICAgICAgICAgICAgIERvdWJsZVBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIERvdWJsZVBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgZmluaXNoZWQgZm9yOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoUm9sbENvdW50ZXIgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmIChSb2xsQ291bnRlciA9PSAxMikgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDIxO1xyXG4gICAgICAgICAgICBlbHNlIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyAxO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDE7XHJcbiAgICAgICAgICAgIERpY2VUZW1wID0gRGljZVJvbGw7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy9EaWNlVGVtcD1EaWNlVGVtcCsxO1xyXG4gICAgICAgICAgLy8gIGNvbnNvbGUubG9nKERpY2VUZW1wICsgXCIgXCIgKyBSb2xsQ291bnRlcik7XHJcblxyXG4gICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAvL3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIF9uZXdwb3MgPSBjYy5WZWMyKDAsIDApO1xyXG4gICAgICAgICAgdGhpcy5Ud2VlbkNhbWVyYShfbmV3cG9zLCBmYWxzZSwgMC42KTsgLy96b29tb3V0XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICAvL3J1bGVzIGltcGxtZW50YXRpb24gZHVyaW5nIHR1cm4gKHR1cm4gZGVjaXNpb25zKVxyXG5cclxuICBUb2dnbGVQYXlEYXkoX3N0MSwgX1N0Mikge1xyXG4gICAgUGFzc2VkUGF5RGF5ID0gX3N0MTtcclxuICAgIERvdWJsZVBheURheSA9IF9TdDI7XHJcblxyXG4gICAgaWYgKCFfc3QxKSB7XHJcbiAgICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghX1N0Mikge1xyXG4gICAgICBEb3VibGVQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBJbmNyZWFzZURvdWJsZVBheURheSgpIHtcclxuICAgIERvdWJsZVBheURheUNvdW50ZXIrKztcclxuICB9LFxyXG5cclxuICBFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oYW1vdW50LCBfaW5kZXgsIF9sb2NhdGlvbk5hbWUsIF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPCAzKSB7XHJcbiAgICAgIGlmICghX2lzQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoIC0gYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ICsgMTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsIDEwMDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIiArIGFtb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfR2l2ZW5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgX0dpdmVuQ2FzaCA9IF9HaXZlbkNhc2ggLSBhbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgKyAxO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUucHVzaChfbG9jYXRpb25OYW1lKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZXhwYW5kZWQgeW91ciBidXNpbmVzcy5cIiwgMTAwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgICB9LCAxMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoIHRvIGV4cGFuZCB0aGlzIGJ1c2luZXNzLCBjYXNoIG5lZWRlZCAkIFwiICsgYW1vdW50ICsgXCIsIENhc2ggR2l2ZW4gJFwiICsgX0dpdmVuQ2FzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgbG9jYXRpb25zXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSwgX0dpdmVuQ2FzaCA9IDAsIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZSkge1xyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHBhcnNlSW50KHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgLy90aGlzIG1lYW5zIHRoZXJlIGlzIGJyaWNrIGFuZCBtb3J0YXIgaW4gbGlzdFxyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldEJ1c2luZXNzSW5kZXgoaSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0Q2FyZEZ1bmN0aW9uYWxpdHkoX2lzQ2FyZEZ1bmN0aW9uYWxpdHkpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldEdpdmVuQ2FzaChfR2l2ZW5DYXNoKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2goX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuUmVzZXRFZGl0Qm94KCk7XHJcbiAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKEJ1c2luZXNzTG9jYXRpb25Ob2Rlcyk7XHJcbiAgICByZXR1cm4gQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDtcclxuICB9LFxyXG5cclxuICBEZXN0cm95R2VuZXJhdGVkTm9kZXMoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uKF9uYW1lLCBfU2hhcmVBbW91bnQsIF9pc0FkZGluZykge1xyXG4gICAgaWYgKF9pc0FkZGluZykge1xyXG4gICAgICB2YXIgX3N0b2NrID0gbmV3IFN0b2NrSW5mbygpO1xyXG4gICAgICBfc3RvY2suQnVzaW5lc3NOYW1lID0gX25hbWU7XHJcbiAgICAgIF9zdG9jay5TaGFyZUFtb3VudCA9IF9TaGFyZUFtb3VudDtcclxuXHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mU3RvY2tzLnB1c2goX3N0b2NrKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihfaXNEb3VibGVQYXlEYXkgPSBmYWxzZSwgX2lzQm90ID0gZmFsc2UsIF9mb3JTZWxlY3RlZEJ1c2luZXNzID0gZmFsc2UsIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSAwLCBIQkFtb3VudCA9IDAsIEJNQW1vdW50ID0gMCwgQk1Mb2NhdGlvbnMgPSAwKSB7XHJcbiAgICBpZiAoX2ZvclNlbGVjdGVkQnVzaW5lc3MpIHtcclxuICAgICAgdmFyIF90aXRsZSA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Bc3NpZ25EYXRhX1BheURheShfdGl0bGUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIF9pc0JvdCwgX2ZvclNlbGVjdGVkQnVzaW5lc3MsIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgsIEhCQW1vdW50LCBCTUFtb3VudCwgQk1Mb2NhdGlvbnMsIDEsIDAsIF9uZXh0VHVybmhhbGZQYXkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKERvdWJsZVBheURheSAmJiBQYXNzZWRQYXlEYXkgJiYgX25leHRUdXJuRG91YmxlUGF5KSB7XHJcbiAgICAgICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIF9za2lwTmV4dFBheWRheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheTtcclxuICAgICAgX3NraXBITU5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEhNTmV4dFBheWRheTtcclxuICAgICAgX3NraXBCTU5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheTtcclxuXHJcbiAgICAgIGlmIChfc2tpcE5leHRQYXlkYXkpIHtcclxuICAgICAgICAvL2lmIHByZXZpb3VzbHkgc2tpcCBwYXlkYXkgd2FzIHN0b3JlZCBieSBhbnkgY2FyZFxyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmICghX2lzQm90KSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgUGF5RGF5LlwiLCAxNjAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgfSwgMTY1MCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2tpcHBpbmcgUGF5RGF5LlwiKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIF90aXRsZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmIChfaXNEb3VibGVQYXlEYXkpIF90aXRsZSA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgICAgZWxzZSBfdGl0bGUgPSBcIlBheURheVwiO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBfaXNEb3VibGVQYXlEYXksIF9za2lwSE1OZXh0UGF5ZGF5LCBfc2tpcEJNTmV4dFBheWRheSwgX2lzQm90LCBmYWxzZSwgMCwgMCwgMCwgMCwgUGFzc2VkUGF5RGF5Q291bnRlciwgRG91YmxlUGF5RGF5Q291bnRlciwgX25leHRUdXJuaGFsZlBheSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBCYW5rcnVwdF9UdXJuRGVjaXNpb24oKSB7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCYW5rcnVwdCA9IHRydWU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQmFua3J1cHRBbW91bnQgKz0gMTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSwgZmFsc2UsIHRoaXMuU2VsZWN0ZWRNb2RlLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCYW5rcnVwdCwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50KTtcclxuICB9LFxyXG5cclxuICBTZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnQsIF91SUQpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgRGF0YTogeyBDYXNoOiBfYW1vdW50LCBJRDogX3VJRCB9IH07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEzLCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfZGF0YSkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gX2RhdGEuRGF0YS5DYXNoO1xyXG4gICAgICB2YXIgX2lEID0gX2RhdGEuRGF0YS5JRDtcclxuXHJcbiAgICAgIHZhciBfbXlJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlBsYXllclVJRCA9PSBfaUQpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uaXNHYW1lRmluaXNoZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uVG90YWxTY29yZSArPSBfYW1vdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSByZWNlaXZlZCBwcm9maXQgb2YgJFwiICsgX2Ftb3VudCArIFwiIGZyb20gb3RoZXIgcGxheWVyLlwiLCAyODAwKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIENhcmRzIFJ1bGVzXHJcbiAgVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oX3N0YXRlKSB7XHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXkgPSBfbmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlSGFsZlBheU5leHRUdXJuKF9zdGF0ZSkge1xyXG4gICAgX25leHRUdXJuaGFsZlBheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkhhbGZQYXlEYXkgPSBfbmV4dFR1cm5oYWxmUGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBOZXh0VHVybihfc3RhdGUpIHtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuID0gX3NraXBOZXh0VHVybjtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwUGF5RGF5X1dob2xlKF9zdGF0ZSkge1xyXG4gICAgX3NraXBOZXh0UGF5ZGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0UGF5ZGF5ID0gX3NraXBOZXh0UGF5ZGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKF9zdGF0ZSkge1xyXG4gICAgX3NraXBITU5leHRQYXlkYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEhNTmV4dFBheWRheSA9IF9za2lwSE1OZXh0UGF5ZGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoX3N0YXRlKSB7XHJcbiAgICBfc2tpcEJNTmV4dFBheWRheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwQk1OZXh0UGF5ZGF5ID0gX3NraXBCTU5leHRQYXlkYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlVHVyblByb2dyZXNzKF9zdGF0ZSkge1xyXG4gICAgVHVybkluUHJvZ3Jlc3MgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgUmV0dXJuVHVyblByb2dyZXNzKCkge1xyXG4gICAgcmV0dXJuIFR1cm5JblByb2dyZXNzO1xyXG4gIH0sXHJcblxyXG4gIExvc2VBbGxNYXJrZXRpbmdNb25leSgpIHtcclxuICAgIHZhciBfbG9zZUFtb3VudCA9IC0xO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPiAwKSB7XHJcbiAgICAgIF9sb3NlQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfbG9zZUFtb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9sb3NlQW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE11bHRpcGx5TWFya2V0aW5nTW9uZXkoX211bHRpcGxpZXIpIHtcclxuICAgIHZhciBfYW1vdW50SW5jcmVhc2VkID0gLTE7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA+IDApIHtcclxuICAgICAgX2Ftb3VudEluY3JlYXNlZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgKj0gX211bHRpcGxpZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfYW1vdW50SW5jcmVhc2VkID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2Ftb3VudEluY3JlYXNlZDtcclxuICB9LFxyXG5cclxuICBHZXRNYXJrZXRpbmdNb25leShfcHJvZml0KSB7XHJcbiAgICB2YXIgX2Ftb3VudCA9IC0xO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPiAwKSB7XHJcbiAgICAgIF9wcm9maXQgPSBfcHJvZml0IC8gMTAwO1xyXG4gICAgICBfYW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCAqPSBfcHJvZml0O1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9hbW91bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIFF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uKF9kYXRhKSB7XHJcbiAgICB2YXIgX3F1ZXN0aW9uUmVmID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9RdWVzdGlvbnNEYXRhKCk7XHJcbiAgICB2YXIgX3VzZXJJRCA9IF9kYXRhLlVzZXJJRDtcclxuICAgIHZhciBfcXVlc3Rpb25JbmRleCA9IF9kYXRhLlF1ZXN0aW9uO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9kYXRhLlVzZXJJbmRleDtcclxuICAgIHZhciBfaXNWb2MgPSBfZGF0YS5Jc1ZvYztcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gICAgaWYgKF91c2VySUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSUQgbWF0Y2hlZFwiKTtcclxuXHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcblxyXG4gICAgICB2YXIgX1FkYXRhO1xyXG4gICAgICBpZiAoX2lzVm9jKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2b2NcIik7XHJcbiAgICAgICAgX1FkYXRhID0gX3F1ZXN0aW9uUmVmLlZvY2FidWxhcnlRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXhdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXN0XCIpO1xyXG4gICAgICAgIF9RZGF0YSA9IF9xdWVzdGlvblJlZi5Fc3RhYmxpc2htZW50UXVlc3Rpb25zW19xdWVzdGlvbkluZGV4XTtcclxuICAgICAgfVxyXG5cclxuICAgICAgQ29ycmVjdEFuc3dlciA9IF9RZGF0YS5Db3JyZWN0T3B0aW9uO1xyXG4gICAgICB2YXIgX21lc3NhZ2UgPSBcIkNob29zZSB0aGUgY29ycmVjdCBhbnN3ZXIuXCIgKyBcIlxcblwiICsgXCIqd3JvbmcgYW5zd2VyIHdpbGwgY29zdCB5b3UgYSBmaW5lIG9mICQ1MDAwLlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBfUWRhdGEuUXVlc3Rpb24gKyBcIlxcblwiICsgXCJBLiBcIiArIF9RZGF0YS5PcHRpb24xICsgXCJcXG5cIiArIFwiQi4gXCIgKyBfUWRhdGEuT3B0aW9uMiArIFwiXFxuXCIgKyBcIkMuIFwiICsgX1FkYXRhLk9wdGlvbjMgKyBcIlxcblwiICsgXCJELiBcIiArIF9RZGF0YS5PcHRpb240O1xyXG5cclxuICAgICAgLy8gdmFyIF9xdWVzdGlvbkFza2VkID0gT25lUXVlc3Rpb25zW19xdWVzdGlvbkluZGV4IC0gMV07XHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24oX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX215RGF0YSwgX3Jvb21EYXRhLCBfaXNUdXJuT3ZlciwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gIH0sXHJcblxyXG4gIE9uZVF1ZXN0aW9uRGVjaXNpb25fU2VsZWN0T3B0aW9uX09uZVF1ZXN0aW9uKGV2ZW50ID0gbnVsbCkge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3NlbGVjdGlvbiA9IHBhcnNlSW50KGV2ZW50LmN1cnJlbnRUYXJnZXQubmFtZS5zcGxpdChcIl9cIilbMV0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwib3B0aW9uIHNlbGVjdGVkOiBcIiArIF9zZWxlY3Rpb24pO1xyXG4gICAgY29uc29sZS5sb2coXCJDb3JyZWN0QW5zd2VyOiBcIiArIENvcnJlY3RBbnN3ZXIpO1xyXG4gICAgaWYgKF9zZWxlY3Rpb24gPT0gQ29ycmVjdEFuc3dlcikge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91ciBhbnN3ZXIgd2FzIGNvcnJlY3QhLlwiLCAxMjAwKTtcclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKGZhbHNlLCB0cnVlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9teURhdGEuQ2FzaCA+PSA1MDAwKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggLT0gNTAwMDtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbnN3ZXJlZCB3cm9uZywgZmluZSBhbW91bnQgd2FzIHBheWVkIHRvIHRoZSBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKHRydWUsIGZhbHNlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCwgU2tpcHBpbmcgcXVlc3Rpb25cIik7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIGZhbHNlLCAwLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBPbmVRdWVzdGlvbkRlY2lzaW9uX1BheUFtb3VudF9PbmVRdWVzdGlvbigpIHtcclxuICAvLyAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgLy8gICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAvLyAgIGlmIChfbXlEYXRhLkNhc2ggPj0gNTAwMCkge1xyXG4gIC8vICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAvLyAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgLy8gICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoIC09IDUwMDA7XHJcbiAgLy8gICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7XHJcbiAgLy8gICAgICAgICBicmVhaztcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgIH1cclxuXHJcbiAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgcGFpZCBjYXNoIGFtb3VudCB0byBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gIC8vICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAvLyAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24odHJ1ZSwgZmFsc2UsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH0sXHJcblxyXG4gIC8vIE9uZVF1ZXN0aW9uRGVjaXNpb25fQW5zd2VyUXVlc3Rpb25fT25lUXVlc3Rpb24oKSB7XHJcbiAgLy8gICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gIC8vICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAvLyAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYW5zd2VyZWQgdGhlIHF1ZXN0aW9uLlwiLCAxMjAwKTtcclxuICAvLyAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIC8vICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIHRydWUsIE9uZVF1ZXN0aW9uSW5kZXgsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAvLyB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCh0cnVlKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5SZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCgpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KF9teURhdGEsIF9yb29tRGF0YSwgX2lzVHVybk92ZXIsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfU2VsZWN0UGxheWVyRm9yUHJvZml0X1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICB2YXIgX293bklEID0gX2RhdGEuVXNlcklELnRvU3RyaW5nKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gcGFyc2VJbnQoX2RhdGEuVXNlckluZGV4KTtcclxuICAgIHZhciBfcGxheWVyTmFtZSA9IF9kYXRhLlVzZXJOYW1lO1xyXG4gICAgdmFyIF9wbGF5ZXJJRCA9IF9kYXRhLk93blBsYXllcklELnRvU3RyaW5nKCk7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgaWYgKF9vd25JRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGV2ZW50OiBcIiArIF9wbGF5ZXJOYW1lKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQgPT0gX293bklEKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYW5HaXZlUHJvZml0T25QYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uVXNlcklERm9yUHJvZml0UGF5RGF5ID0gX3BsYXllcklEO1xyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCB0aGlzLlBsYXllckdhbWVJbmZvLCB0cnVlKTtcclxuICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TaG93VG9hc3QoXCJQbGF5ZXIgXCIgKyBfcGxheWVyTmFtZSArIFwiIHdpbGwgcmVjZWl2ZSBhbGwgeW91ciBuZXh0IHBheSBkYXkgcHJvZml0c1wiLCAzMjAwKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfaGFzRG9uZVBheW1lbnQsIF9oYXNBbnN3ZXJlZFF1ZXN0aW9uLCBfcXVlc3Rpb25JbmRleCwgX1VzZXJJRCkge1xyXG4gICAgdmFyIF9kYXRhID0geyBQYXltZW50RG9uZTogX2hhc0RvbmVQYXltZW50LCBRdWVzdGlvbkFuc3dlcmVkOiBfaGFzQW5zd2VyZWRRdWVzdGlvbiwgUXVlc3Rpb25JbmRleDogX3F1ZXN0aW9uSW5kZXgsIElEOiBfVXNlcklEIH07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDgsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfZGF0YSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgIHZhciBfaGFzRG9uZVBheW1lbnQgPSBfZGF0YS5QYXltZW50RG9uZTtcclxuICAgICAgdmFyIF9oYXNBbnN3ZXJlZFF1ZXN0aW9uID0gX2RhdGEuUXVlc3Rpb25BbnN3ZXJlZDtcclxuICAgICAgdmFyIF9xdWVzdGlvbkluZGV4ID0gX2RhdGEuUXVlc3Rpb25JbmRleDtcclxuICAgICAgdmFyIF91SUQgPSBfZGF0YS5JRDtcclxuXHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGF5ZXIgZG9lcyBub3QgaGF2ZSBlbm91Z2ggY2FzaCwgc28gcXVlc3Rpb25zIHdlcmUgc2tpcHBlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9oYXNEb25lUGF5bWVudCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoICs9IDUwMDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwicGxheWVyIGhhcyBnaXZlbiB3cm9uZyBhbnN3ZXIsIGNhc2ggJDUwMDAgaGFzIGJlZW4gYWRkZWQuXCIsIDIxMDApO1xyXG4gICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9oYXNBbnN3ZXJlZFF1ZXN0aW9uKSB7XHJcbiAgICAgICAgICB2YXIgX3NlbGVjdGVkUGxheWVySW5kZXggPSAwO1xyXG4gICAgICAgICAgdmFyIF9hY3RvcnNEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG5cclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKF91SUQgPT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgICAgX3NlbGVjdGVkUGxheWVySW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGF5ZXIgaGFzIGdpdmVuIGNvcnJlY3QgYW5zd2VyLCBubyBjYXNoIHdhcyByZWNlaXZlZC5cIiwgMjEwMCk7XHJcblxyXG4gICAgICAgICAgLy8gaWYgKF9xdWVzdGlvbkluZGV4ID09IDEpIHtcclxuICAgICAgICAgIC8vICAgLy9oYXZlIHlvdSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuU2tpcHBlZExvYW5QYXltZW50KSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSBza2lwcGVkIGxvYW4gcGF5ZW1lbnQgaW4gcHJldmlvdXMgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMikge1xyXG4gICAgICAgICAgLy8gICAvL0hhdmUgeW91IHRha2VuIGFueSBsb2FuP1xyXG4gICAgICAgICAgLy8gICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgLy8gICAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgLy8gICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICAvLyAgICAgICBicmVhaztcclxuICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAvLyAgIH1cclxuXHJcbiAgICAgICAgICAvLyAgIGlmIChfbG9hblRha2VuKSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSB0YWtlbiBzb21lIGxvYW5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgdGFrZW4gYW55IGxvYW5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMykge1xyXG4gICAgICAgICAgLy8gICAvL0FyZSB5b3UgYmFua3J1cHRlZD8gaWYgbW9yZSB0aGFuIG9uY2UsIHRlbGwgbWUgdGhlIGFtb3VudD9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLklzQmFua3J1cHQpIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZCBcIiArIF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkJhbmtydXB0QW1vdW50ICsgXCIgdGltZS9lcy5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDQpIHtcclxuICAgICAgICAgIC8vICAgLy9JcyB5b3VyIHR1cm4gZ29pbmcgdG8gYmUgc2tpcHBlZCBuZXh0IHRpbWU/XHJcbiAgICAgICAgICAvLyAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgYmUgc2tpcHBlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIG5vdCBiZSBza2lwcGVkLlwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSA1KSB7XHJcbiAgICAgICAgICAvLyAgIC8vSXMgaXQgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgeW91ciBuZXh0IHBheWRheT9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5KSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgcGF5ZGF5IHdpbGwgYmUgZG91YmxlIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBub3QgYmUgZG91YmxlIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgaWYgKElzVHdlZW5pbmcgPT0gdHJ1ZSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICAgIH0sIDgwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3NwYWNlcyA9IF9kYXRhLkRhdGEuYmFja3NwYWNlcztcclxuICAgICAgdmFyIF9jb3VudGVyID0gX2RhdGEuRGF0YS5Db3VudGVyO1xyXG5cclxuICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19jb3VudGVyICsgQmFja3NwYWNlc10uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MsIDAuMSk7XHJcblxyXG4gICAgICBSb2xsQ291bnRlciA9IF9jb3VudGVyO1xyXG4gICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUd2VlblBsYXllcl9Hb0JhY2tTcGFjZXM6IGZ1bmN0aW9uIChOb2RlLCBUb1Bvcywgc3BlZWQgPSAwLjYpIHtcclxuICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgIC50byhzcGVlZCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge30pXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIEdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICBSb2xsQ291bnRlciAtPSBCYWNrc3BhY2VzO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHZhciBfZGF0YSA9IHsgRGF0YTogeyBiYWNrc3BhY2VzOiBCYWNrc3BhY2VzLCBDb3VudGVyOiBSb2xsQ291bnRlciB9IH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTAsIF9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1Bvcyk7XHJcbiAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuICAvLyNlbmRyZWdpb25cclxufSk7XHJcbi8vbW9kdWxlLmV4cG9ydHMgID0gUGxheWVyRGF0YTsgLy93aGVuIGltcG9ydHMgaW4gYW5vdGhlciBzY3JpcHQgb25seSByZWZlcmVuY2Ugb2YgcGxheWVyZGF0YSBjbGFzcyB3b3VsZCBiZSBhYmxlIHRvIGFjY2Vzc2VkIGZyb20gR2FtZW1hbmFnZXIgaW1wb3J0XHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZU1hbmFnZXI7XHJcbi8vI2VuZHJlZ2lvblxyXG4iXX0=