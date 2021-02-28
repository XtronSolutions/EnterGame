
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
var halfBusinessAmount = 0;
var halfBusinessAmountID = "";
var halfBusinessAmountIndex = 0;
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
var CorrectAnswer = 0;
var VocabularyQuestions = [];
var EstablishmentQuestions = [];
var VocabularyQuestionsCounter = 0;
var EstablishmentQuestionsCounter = 0;
var BigBusinessArray = [];
var LossesArray = [];
var MarketingArray = [];
var WildCardArray = [];
var BigBusinessArrayCounter = 0;
var LossesArrayCounter = 0;
var MarketingArrayCounter = 0;
var WildCardArrayCounter = 0; //#region superclasses and enumerations
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
    },
    HasMarketingCompany: {
      displayName: "HasMarketingCompany",
      type: cc.Boolean,
      "default": false,
      serializable: true
    },
    BankruptedNextTurn: {
      displayName: "BankruptedNextTurn",
      type: cc.Boolean,
      "default": false,
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
    VocabularyQuestions = [];
    EstablishmentQuestions = [];
    VocabularyQuestionsCounter = 0;
    EstablishmentQuestionsCounter = 0;
    BigBusinessArray = [];
    LossesArray = [];
    MarketingArray = [];
    WildCardArray = [];
    BigBusinessArrayCounter = 0;
    LossesArrayCounter = 0;
    MarketingArrayCounter = 0;
    WildCardArrayCounter = 0;
    _diceinput1 = "";
    _diceinput2 = "";
    PreviousDiceRoll1 = -1;
    PreviousDiceRoll2 = -1;
    PlayerLeft = false;
    halfBusinessAmount = 0;
    halfBusinessAmountID = "";
    halfBusinessAmountIndex = 0;
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
    this.ResetPayDay();
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
  ResetPayDay: function ResetPayDay() {
    console.log("reseting payday");
    _skipNextPayday = false;
    _skipHMNextPayday = false;
    _skipBMNextPayday = false;
    PassedPayDay = false;
    DoublePayDay = false;
    PassedPayDayCounter = 0;
    DoublePayDayCounter = 0;
    _nextTurnDoublePay = false;
    _nextTurnhalfPay = false;
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
      console.log("reseting for spectate");

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
  RemoveFromCheckArray: function RemoveFromCheckArray(_uid) {
    if (this.SelectedMode == 2) {
      var _ind = -1;

      for (var index = 0; index < TurnCheckArray.length; index++) {
        if (TurnCheckArray[index] == _uid) _ind = index;
      }

      if (_ind != -1) {
        console.log("removing from turn check array");
        TurnCheckArray.splice(_ind, 1);
      }
    }
  },
  CheckTurnComplete: function CheckTurnComplete() {
    var TotalConnectedPlayers = 0;

    for (var j = 0; j < this.PlayerGameInfo.length; j++) {
      if (this.PlayerGameInfo[j].IsActive) TotalConnectedPlayers++;
    }

    console.log("Turn Check: " + TurnCheckArray.length);
    console.log("Total Connected Players: " + TotalConnectedPlayers);
    console.log(TurnCheckArray);

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

        this.CheckTurnComplete();
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
  ResetSomeValues: function ResetSomeValues() {//TurnCheckArray = [];
    //this.TurnCompleted = true;
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
              if (this.PlayerGameInfo[this.TurnNumber].CardFunctionality.BankruptedNextTurn) {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ResetTurnVariable();
                this.PlayerGameInfo[this.TurnNumber].CardFunctionality.BankruptedNextTurn = false;
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewGame_BankRupted("You were bankrupted and will start from begin.");
                return;
              } else {
                setTimeout(function () {
                  GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);
                  GamePlayReferenceManager.Instance.Get_GameplayUIManager().ResetTurnVariable();
                  IsTweening = false;
                }, 1000);
              }

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

    this.UpdateUIData();
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
        RollCounter = 14;
        console.error(RollCounter);
      }
    } else {
      if (this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter == 13) this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter + 22;else this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter + 1;
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
    }

    this.UpdateUIData(); // let targetPos=this.AllPlayerNodes[this.TurnNumber].convertToWorldSpaceAR(cc.Vec2(0,120));
    // var _pos=this.CameraNode.parent.convertToNodeSpaceAR(targetPos);
    // this.TweenCamera(_pos,true,0.4);
  },
  UpdateUIData: function UpdateUIData() {
    if (this.SelectedMode == 2) {
      this.SyncDataToPlayerGameInfo(0);
    }

    for (var index = 0; index < this.AllPlayerUI.length; index++) {
      this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
    }
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
  PopulateDecksArray: function PopulateDecksArray(_isBigBusiness, _isLosses, _isMarketing, _isWildCard, _data) {
    if (_isBigBusiness === void 0) {
      _isBigBusiness = false;
    }

    if (_isLosses === void 0) {
      _isLosses = false;
    }

    if (_isMarketing === void 0) {
      _isMarketing = false;
    }

    if (_isWildCard === void 0) {
      _isWildCard = false;
    }

    if (_data === void 0) {
      _data = null;
    }

    // BigBusinessArray = [];
    // LossesArray = [];
    // MarketingArray = [];
    // WildCardArray = [];
    // BigBusinessArrayCounter = 0;
    // LossesArrayCounter = 0;
    // MarketingArrayCounter = 0;
    // WildCardArrayCounter = 0;
    if (_isBigBusiness) {
      if (_data == null) {
        BigBusinessArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        BigBusinessArray.sort(function () {
          return 0.5 - Math.random();
        });
        console.log(BigBusinessArray);
        BigBusinessArrayCounter = 0;
        var _tempData = {
          BigArray: BigBusinessArray,
          LossArray: null,
          MarketArray: null,
          WildArrya: null
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(19, _tempData);
      }
    } else if (_isLosses) {
      if (_data == null) {
        LossesArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        LossesArray.sort(function () {
          return 0.5 - Math.random();
        });
        console.log(LossesArray);
        LossesArrayCounter = 0;
        var _tempData = {
          BigArray: null,
          LossArray: LossesArray,
          MarketArray: null,
          WildArrya: null
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(19, _tempData);
      }
    } else if (_isMarketing) {
      if (_data == null) {
        MarketingArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13];
        MarketingArray.sort(function () {
          return 0.5 - Math.random();
        });
        console.log(MarketingArray);
        MarketingArrayCounter = 0;
        var _tempData = {
          BigArray: null,
          LossArray: null,
          MarketArray: MarketingArray,
          WildArrya: null
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(19, _tempData);
      }
    } else if (_isWildCard) {
      if (_data == null) {
        WildCardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        WildCardArray.sort(function () {
          return 0.5 - Math.random();
        });
        console.log(WildCardArray);
        WildCardArrayCounter = 0;
        var _tempData = {
          BigArray: null,
          LossArray: null,
          MarketArray: null,
          WildArrya: WildCardArray
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(19, _tempData);
      }
    }

    if (_data != null) {
      if (_data.BigArray != null) {
        BigBusinessArray = _data.BigArray;
        console.log(BigBusinessArray);
        BigBusinessArrayCounter = 0;
      }

      if (_data.LossArray != null) {
        LossesArray = _data.LossArray;
        console.log(LossesArray);
        LossesArrayCounter = 0;
      }

      if (_data.MarketArray != null) {
        MarketingArray = _data.MarketArray;
        console.log(MarketingArray);
        MarketingArrayCounter = 0;
      }

      if (_data.WildArrya != null) {
        WildCardArray = _data.WildArrya;
        console.log(WildCardArray);
        WildCardArrayCounter = 0;
      }
    }
  },
  GetBigBusinessIndex: function GetBigBusinessIndex(_index) {
    var _val = -1;

    if (BigBusinessArray.length > 0) {
      if (BigBusinessArrayCounter < BigBusinessArray.length) {
        _val = BigBusinessArray[BigBusinessArrayCounter];
        BigBusinessArrayCounter++;
        var _tempData = {
          BigArray: true,
          LossArray: false,
          MarketArray: false,
          WildArrya: false
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(20, _tempData);
      } else {
        this.PopulateDecksArray(true, false, false, false, null);
      }
    } else {
      this.PopulateDecksArray(true, false, false, false, null);
    }

    return _val;
  },
  GetLossesIndex: function GetLossesIndex(_index) {
    var _val = -1;

    if (LossesArray.length > 0) {
      if (LossesArrayCounter < LossesArray.length) {
        _val = LossesArray[LossesArrayCounter];
        LossesArrayCounter++;
        var _tempData = {
          BigArray: false,
          LossArray: true,
          MarketArray: false,
          WildArrya: false
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(20, _tempData);
      } else {
        this.PopulateDecksArray(false, true, false, false, null);
      }
    } else {
      this.PopulateDecksArray(false, true, false, false, null);
    }

    return _val;
  },
  GetMarketingIndex: function GetMarketingIndex(_index) {
    var _val = -1;

    if (MarketingArray.length > 0) {
      if (MarketingArrayCounter < MarketingArray.length) {
        _val = MarketingArray[MarketingArrayCounter];
        MarketingArrayCounter++;
        var _tempData = {
          BigArray: false,
          LossArray: false,
          MarketArray: true,
          WildArrya: false
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(20, _tempData);
      } else {
        this.PopulateDecksArray(false, false, true, false, null);
      }
    } else {
      this.PopulateDecksArray(false, false, true, false, null);
    }

    return _val;
  },
  GetWildCardIndex: function GetWildCardIndex(_index) {
    var _val = -1;

    if (WildCardArray.length > 0) {
      if (WildCardArrayCounter < WildCardArray.length) {
        _val = WildCardArray[WildCardArrayCounter];
        WildCardArrayCounter++;
        var _tempData = {
          BigArray: false,
          LossArray: false,
          MarketArray: false,
          WildArrya: true
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(20, _tempData);
      } else {
        this.PopulateDecksArray(false, false, false, true, null);
      }
    } else {
      this.PopulateDecksArray(false, false, false, true, null);
    }

    return _val;
  },
  UpdateCounters: function UpdateCounters(_data) {
    if (_data === void 0) {
      _data = null;
    }

    if (_data.BigArray) {
      BigBusinessArrayCounter++;
    }

    if (_data.LossArray) {
      LossesArrayCounter++;
    }

    if (_data.MarketArray) {
      MarketingArrayCounter++;
    }

    if (_data.WildArrya) {
      WildCardArrayCounter++;
    }
  },
  SelectRelatedCard: function SelectRelatedCard(_isBigBusiness, _isLosses, _isMarketing, _isWildCard) {
    if (_isBigBusiness === void 0) {
      _isBigBusiness = false;
    }

    if (_isLosses === void 0) {
      _isLosses = false;
    }

    if (_isMarketing === void 0) {
      _isMarketing = false;
    }

    if (_isWildCard === void 0) {
      _isWildCard = false;
    }

    if (_isBigBusiness) {
      if (this.SelectedMode == 2) {
        if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          var index = this.GetBigBusinessIndex();

          if (index == -1) {
            index = this.GetBigBusinessIndex();
          }

          return index;
        }
      } else if (this.SelectedMode == 1) {
        var index = this.GetBigBusinessIndex();

        if (index == -1) {
          index = this.GetBigBusinessIndex();
        }

        return index;
      }
    } else if (_isLosses) {
      if (this.SelectedMode == 2) {
        if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          var index = this.GetLossesIndex();

          if (index == -1) {
            index = this.GetLossesIndex();
          }

          return index;
        }
      } else if (this.SelectedMode == 1) {
        var index = this.GetLossesIndex();

        if (index == -1) {
          index = this.GetLossesIndex();
        }

        return index;
      }
    } else if (_isMarketing) {
      if (this.SelectedMode == 2) {
        if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          var index = this.GetMarketingIndex();

          if (index == -1) {
            index = this.GetMarketingIndex();
          }

          return index;
        }
      } else if (this.SelectedMode == 1) {
        var index = this.GetMarketingIndex();

        if (index == -1) {
          index = this.GetMarketingIndex();
        }

        return index;
      }
    } else if (_isWildCard) {
      if (this.SelectedMode == 2) {
        if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          var index = this.GetWildCardIndex();

          if (index == -1) {
            index = this.GetWildCardIndex();
          }

          return index;
        }
      } else if (this.SelectedMode == 1) {
        var index = this.GetWildCardIndex();

        if (index == -1) {
          index = this.GetWildCardIndex();
        }

        return index;
      }
    }
  },
  callUponCard: function callUponCard() {
    if (!isGameOver) {
      if (RollCounter < GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
        var _spaceID = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType);

        this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = RollCounter;

        if (_spaceID != 6 && _spaceID != 7) {
          //6 means payday and 7 means double payday, 9 means sell space
          var RandomCard = this.getRandom(0, 15);

          if (_spaceID == 2) {
            //landed on big business cards
            RandomCard = this.SelectRelatedCard(true, false, false, false); //RandomCard = 14;
          } else if (_spaceID == 5) {
            //landed on some losses cards
            RandomCard = this.SelectRelatedCard(false, true, false, false); //RandomCard = 14;
          } else if (_spaceID == 3) {
            //landed on some marketing cards
            RandomCard = this.SelectRelatedCard(false, false, true, false); //RandomCard = 11;
            //RandomCard = 10;
          } else if (_spaceID == 1) {
            //landed on some wild cards
            RandomCard = this.SelectRelatedCard(false, false, false, true); //RandomCard = 11;
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
            GamePlayReferenceManager.Instance.Get_ServerBackend().UpdateUserData(-1, _won, -1);
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
        GamePlayReferenceManager.Instance.Get_ServerBackend().UpdateUserData(-1, _won, -1);
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

    var speed = 0.4; //if (_isTest) speed = 0.04;

    cc.tween(Node) //0.4
    .to(speed, {
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
          if (RollCounter == 13) RollCounter = RollCounter + 22;else RollCounter = RollCounter + 1;
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
  GetVocabularyQuestionsIndex: function GetVocabularyQuestionsIndex() {
    var _val = -1;

    if (VocabularyQuestions.length > 0) {
      if (VocabularyQuestionsCounter < VocabularyQuestions.length) {
        _val = VocabularyQuestions[VocabularyQuestionsCounter];
        VocabularyQuestionsCounter++;
      } else {
        this.PopulateOneQuestionArray_Vocabulary();
      }
    } else {
      this.PopulateOneQuestionArray_Vocabulary();
    }

    return _val;
  },
  GetEstablishmentQuestionsIndex: function GetEstablishmentQuestionsIndex() {
    var _val = -1;

    if (EstablishmentQuestions.length > 0) {
      if (EstablishmentQuestionsCounter < EstablishmentQuestions.length) {
        _val = EstablishmentQuestions[EstablishmentQuestionsCounter];
        EstablishmentQuestionsCounter++;
      } else {
        this.PopulateOneQuestionArray_Establishment();
      }
    } else {
      this.PopulateOneQuestionArray_Establishment();
    }

    return _val;
  },
  PopulateOneQuestionArray_Vocabulary: function PopulateOneQuestionArray_Vocabulary(_data) {
    if (_data === void 0) {
      _data = null;
    }

    if (_data == null) {
      VocabularyQuestions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      VocabularyQuestions.sort(function () {
        return 0.5 - Math.random();
      });
      console.log(VocabularyQuestions);
      VocabularyQuestionsCounter = 0;
      var _tempData = {
        VocArray: VocabularyQuestions,
        EstArray: null
      };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(18, _tempData);
    } else {
      if (_data.VocArray != null) {
        VocabularyQuestions = _data.VocArray;
        console.log(VocabularyQuestions);
        VocabularyQuestionsCounter = 0;
      }
    }
  },
  PopulateOneQuestionArray_Establishment: function PopulateOneQuestionArray_Establishment(_data) {
    if (_data === void 0) {
      _data = null;
    }

    if (_data == null) {
      EstablishmentQuestions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      EstablishmentQuestions.sort(function () {
        return 0.5 - Math.random();
      });
      console.log(EstablishmentQuestions);
      EstablishmentQuestionsCounter = 0;
      var _tempData = {
        VocArray: null,
        EstArray: EstablishmentQuestions
      };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(18, _tempData);
    } else {
      if (_data.EstArray != null) {
        EstablishmentQuestions = _data.EstArray;
        console.log(EstablishmentQuestions);
        EstablishmentQuestionsCounter = 0;
      }
    }
  },
  QuestionPopUp_OtherUser_OneQuestion: function QuestionPopUp_OtherUser_OneQuestion(_data) {
    var _questionRef = GamePlayReferenceManager.Instance.Get_QuestionsData();

    var _userID = _data.UserID;
    var _questionIndex = _data.Question;
    var _playerIndex = _data.UserIndex;
    var _isVoc = _data.IsVoc;

    var _gameplayUIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

    if (_isVoc) {
      VocabularyQuestionsCounter++;
    } else {
      EstablishmentQuestionsCounter++;
    }

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
  SelectPlayerTakeOver_Space_CardFunctionality: function SelectPlayerTakeOver_Space_CardFunctionality(_isTurnOver) {
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

    _gameplayUIManager.ToggleScreen_SelectPlayerTakeOver(true);

    _gameplayUIManager.ResetSpaceScreen_SelectPlayerTakeOver();

    _gameplayUIManager.SetUpSpaceScreen_SelectPlayerTakeOver(_myData, _roomData, _isTurnOver, this.SelectedMode);
  },
  SelectPlayerBuyHalfBusiness_Space_CardFunctionality: function SelectPlayerBuyHalfBusiness_Space_CardFunctionality(_isTurnOver) {
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

    _gameplayUIManager.ToggleScreen_SelectPlayerTakeOver(true);

    _gameplayUIManager.ResetSpaceScreen_SelectPlayerTakeOver();

    _gameplayUIManager.SetUpSpaceScreen_SelectPlayerTakeOver(_myData, _roomData, _isTurnOver, this.SelectedMode, true);
  },
  SelectPlayerDamagingInformation_Space_CardFunctionality: function SelectPlayerDamagingInformation_Space_CardFunctionality(_isTurnOver) {
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

    _gameplayUIManager.ToggleScreen_SelectPlayerDamaging(true);

    _gameplayUIManager.ResetSpaceScreen_SelectPlayerDamaging();

    _gameplayUIManager.SetUpSpaceScreen_SelectPlayerDamaging(_myData, _roomData, _isTurnOver, this.SelectedMode);
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
  DeductCash_CardFunctionality: function DeductCash_CardFunctionality(_amount) {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == false) {
      var _myIndex = this.GetMyIndex();

      if (this.PlayerGameInfo[_myIndex].Cash >= _amount) {
        this.PlayerGameInfo[_myIndex].Cash -= _amount;
      } else if (this.PlayerGameInfo[_myIndex].Cash < _amount) {
        this.PlayerGameInfo[_myIndex].Cash = 0;
      }

      GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[_myIndex]);
    }
  },
  AddCash_CardFunctionality: function AddCash_CardFunctionality(_data) {
    var _amount = _data.amount;
    var _ID = _data.ID;
    var _msg = _data.msg;
    var mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

    if (mode == 2) {
      var _actor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;

      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == false) {
        var _myIndex = this.GetMyIndex();

        if (_actor.PlayerUID == _ID) {
          this.PlayerGameInfo[_myIndex].Cash += _amount;
          GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[_myIndex]);
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(_msg);
        }
      }
    } else if (mode == 1) {
      for (var index = 0; index < this.PlayerGameInfo.length; index++) {
        if (this.PlayerGameInfo[index].PlayerUID == _ID && index != this.TurnNumber) {
          this.PlayerGameInfo[index].Cash += _amount;
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(_msg);
        }
      }
    }

    this.UpdateUIData();
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().UpdateCash_TurnDecision();
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
  },
  ReceiveEvent_TakeOverBusiness_CardFunctionality: function ReceiveEvent_TakeOverBusiness_CardFunctionality(_data) {
    if (this.SelectedMode == 2) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
        var _id = _data.ID;
        var _playerData = _data.Player;
        var _business = _data.Business;
        var _businessIndex = _data.BusinessIndex;
        var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;

        var _myIndex = -1;

        console.log(_myActor.PlayerUID);
        console.log(_id);

        if (_myActor.PlayerUID.toString() == _id.toString()) {
          for (var index = 0; index < this.PlayerGameInfo.length; index++) {
            if (this.PlayerGameInfo[index].PlayerUID == _id) {
              if (this.PlayerGameInfo[index].NoOfBusiness[_businessIndex].BusinessType == 1) {
                //home based
                this.PlayerGameInfo[index].HomeBasedAmount--;
              } else if (this.PlayerGameInfo[index].NoOfBusiness[_businessIndex].BusinessType == 2) {
                //brick and mortar
                var _locations = this.PlayerGameInfo[index].NoOfBusiness[_businessIndex].LocationsName.length;
                this.PlayerGameInfo[index].BrickAndMortarAmount--;
                this.PlayerGameInfo[index].TotalLocationsAmount -= _locations;
              }

              this.PlayerGameInfo[index].NoOfBusiness.splice(_businessIndex, 1);
              _myIndex = index;
              break;
            }
          }

          console.log(this.PlayerGameInfo[_myIndex]);

          if (_myIndex != -1) {
            if (this.PlayerGameInfo[_myIndex].NoOfBusiness.length > 0) {
              //check if player has lost all businesses or not
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Your business " + _business.BusinessName + " was forcefully took over, you have lost that business");
            } else {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Your business " + _business.BusinessName + " was forcefully took over, you have lost that business, you have been bankrupted, you will start again in next turn.");
              this.PlayerGameInfo[_myIndex].CardFunctionality.BankruptedNextTurn = true;
            }

            GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[_myIndex]);
          }
        }
      }
    }
  },
  TakeOverBusiness_CardFunctionality: function TakeOverBusiness_CardFunctionality(_data, _index, _playerIndex, _buyHalfBusiness) {
    if (_playerIndex === void 0) {
      _playerIndex = 0;
    }

    if (_buyHalfBusiness === void 0) {
      _buyHalfBusiness = false;
    }

    var _business = _data.NoOfBusiness[_index];
    console.log(_business);

    var _diceRoll = this.RollTwoDices();

    var _multiplierBusiness = 10000;

    var _result = _diceRoll * _multiplierBusiness;

    var _player = null; //send rpc to other player as well

    _player = this.PlayerGameInfo[_playerIndex];
    var _sendingData = {
      ID: _player.PlayerUID,
      Player: _player,
      Business: _business,
      BusinessIndex: _index
    };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(23, _sendingData);

    if (!_business.LoanTaken) {
      this.PlayerGameInfo[this.TurnNumber].Cash += _result;
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("\n" + "Dice Result : " + _diceRoll + "\n" + "\n" + "Amount : " + _diceRoll + " * " + _multiplierBusiness + " = $" + _result + "\n" + "\n" + "Cash amount of $" + _result + " added after deducting supposed loan, total cash becomes $" + this.PlayerGameInfo[this.TurnNumber].Cash);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitScreenAlongTurnOver__BusinessGenric();
    } else {
      var _tempSum = this.PlayerGameInfo[this.TurnNumber].Cash + _result;

      if (_tempSum >= _business.LoanAmount) {
        _tempSum -= _business.LoanAmount;
        this.PlayerGameInfo[this.TurnNumber].Cash = _tempSum;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("\n" + "Dice Result : " + _diceRoll + "\n" + "\n" + "Loan Amount : $" + _business.LoanAmount + "\n" + "\n" + "Amount : " + _diceRoll + " * " + _multiplierBusiness + " = $" + _result + "\n" + "\n" + "After deducting supposed loan, total cash becomes $" + this.PlayerGameInfo[this.TurnNumber].Cash);
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitScreenAlongTurnOver__BusinessGenric();
      } else {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You don't have enough cash to pay off loan, turn will be skipped now");
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitScreenAlongTurnOver__BusinessGenric();
      }
    }
  },
  ReceiveEvent_BuyHalfBusiness_CardFunctionality: function ReceiveEvent_BuyHalfBusiness_CardFunctionality(_data) {
    if (this.SelectedMode == 2) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
        var _id = _data.ID;
        var _cashAmount = _data.Amount;
        var _businessIndex = _data.BusinessIndex;
        var _senderID = _data.MyID;
        var _senderName = _data.MyName;
        var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;

        var _myIndex = this.GetMyIndex();

        if (_myActor.PlayerUID == _id.toString()) {
          this.PlayerGameInfo[_myIndex].Cash += parseInt(_cashAmount);
          this.PlayerGameInfo[_myIndex].NoOfBusiness[_businessIndex].IsPartnership = true;
          this.PlayerGameInfo[_myIndex].NoOfBusiness[_businessIndex].PartnerID = _senderID;
          this.PlayerGameInfo[_myIndex].NoOfBusiness[_businessIndex].PartnerName = _senderName;
          GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[_myIndex]);
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(_senderName + " has send you cash amount $" + _cashAmount + " and has become 50% owner of your business " + this.PlayerGameInfo[_myIndex].NoOfBusiness[_businessIndex].BusinessName);
        }
      }
    }
  },
  PayAmount_BuyHalfBusiness_CardFunctionality: function PayAmount_BuyHalfBusiness_CardFunctionality() {
    if (this.PlayerGameInfo[this.TurnNumber].Cash >= halfBusinessAmount) {
      this.PlayerGameInfo[this.TurnNumber].Cash -= halfBusinessAmount;
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully bought half ownership of the business, remaining cash $" + this.PlayerGameInfo[this.TurnNumber].Cash);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ExitScreenAlongTurnOver__BusinessGenric();
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_BuyHalfBusiness(false);
      var _sendingData = {
        ID: halfBusinessAmountID,
        Amount: halfBusinessAmount,
        BusinessIndex: halfBusinessAmountIndex,
        MyID: this.PlayerGameInfo[this.TurnNumber].PlayerUID,
        MyName: this.PlayerGameInfo[this.TurnNumber].PlayerName
      };
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(26, _sendingData);
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true); //GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You don't have enough cash.");
    }
  },
  BuyHalfBusiness_CardFunctionality: function BuyHalfBusiness_CardFunctionality(_data, _index, _playerIndex) {
    if (_playerIndex === void 0) {
      _playerIndex = 0;
    }

    //var _business = _data.NoOfBusiness[_index];
    //console.log(_business);
    var _diceRoll = this.RollTwoDices();

    var _multiplierBusiness = 3000;

    var _result = _diceRoll * _multiplierBusiness;

    halfBusinessAmount = _result;
    halfBusinessAmountID = this.PlayerGameInfo[_playerIndex].PlayerUID;
    halfBusinessAmountIndex = _index;
    var _player = null;

    var _text = "\n" + "Dice Result : " + _diceRoll + "\n" + "\n" + "Payable Amount : " + _diceRoll + " * " + _multiplierBusiness + " = $" + _result;

    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_BuyHalfBusiness(true);
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetTitleText_BuyHalfBusiness(_text);
  },
  ReceiveEvent_SelectPlayerDamagingDecision_Space_CardFunctionality: function ReceiveEvent_SelectPlayerDamagingDecision_Space_CardFunctionality(_data) {
    if (this.SelectedMode == 2) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
        var _player = _data.Player;

        var _playerIndex = parseInt(_data.PlayerIndex);

        var _senderID = _data.MyUserID;

        var _gameplayUIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

        if (_player.PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          console.log("received event: " + _player.PlayerName);

          _gameplayUIManager.SetSenderID_DamageDecision(_senderID);

          _gameplayUIManager.ToggleMainScreen_DamageDecision(true);

          _gameplayUIManager.ToggleDiceResultScreen_DamageDecision(false);
        }
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJoYWxmQnVzaW5lc3NBbW91bnQiLCJoYWxmQnVzaW5lc3NBbW91bnRJRCIsImhhbGZCdXNpbmVzc0Ftb3VudEluZGV4IiwiUHJldmlvdXNEaWNlUm9sbDMiLCJQcmV2aW91c0RpY2VSb2xsNCIsIlByZXZpb3VzRGljZVJvbGw1IiwidXNlckdhbWVPdmVyIiwiQm90R2FtZU92ZXIiLCJUb3RhbENvdW50ZXJSZWFjaGVkIiwiUGFzc2VkUGF5RGF5Q291bnRlciIsIkRvdWJsZVBheURheUNvdW50ZXIiLCJOb0NhcmRGdW5jdGlvbmFsaXR5IiwiUGxheWVyTGVmdCIsIkZvcmNlQ2hhbmdlVGltZU91dCIsIkdhbWVDb21wbGV0ZWQiLCJDb3JyZWN0QW5zd2VyIiwiVm9jYWJ1bGFyeVF1ZXN0aW9ucyIsIkVzdGFibGlzaG1lbnRRdWVzdGlvbnMiLCJWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlciIsIkVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyIiwiQmlnQnVzaW5lc3NBcnJheSIsIkxvc3Nlc0FycmF5IiwiTWFya2V0aW5nQXJyYXkiLCJXaWxkQ2FyZEFycmF5IiwiQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIiLCJMb3NzZXNBcnJheUNvdW50ZXIiLCJNYXJrZXRpbmdBcnJheUNvdW50ZXIiLCJXaWxkQ2FyZEFycmF5Q291bnRlciIsIkVudW1CdXNpbmVzc1R5cGUiLCJjYyIsIkVudW0iLCJOb25lIiwiSG9tZUJhc2VkIiwiYnJpY2tBbmRtb3J0YXIiLCJCdXNpbmVzc0luZm8iLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiTmFtZSIsIkJ1c2luZXNzVHlwZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIlRleHQiLCJCdXNpbmVzc05hbWUiLCJBbW91bnQiLCJJbnRlZ2VyIiwiSXNQYXJ0bmVyc2hpcCIsInR5cHciLCJCb29sZWFuIiwiUGFydG5lcklEIiwiUGFydG5lck5hbWUiLCJMb2NhdGlvbnNOYW1lIiwiTG9hblRha2VuIiwiTG9hbkFtb3VudCIsIlJlY2VpdmVEb3VibGVQYXlEYXkiLCJjdG9yIiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiTmV4dFR1cm5Eb3VibGVQYXkiLCJTa2lwTmV4dFR1cm4iLCJTa2lwTmV4dFBheWRheSIsIlNraXBITU5leHRQYXlkYXkiLCJTa2lwQk1OZXh0UGF5ZGF5IiwiTmV4dFR1cm5IYWxmUGF5RGF5IiwiTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlciIsIkhhc01hcmtldGluZ0NvbXBhbnkiLCJCYW5rcnVwdGVkTmV4dFR1cm4iLCJTdG9ja0luZm8iLCJTaGFyZUFtb3VudCIsIlBsYXllckRhdGEiLCJQbGF5ZXJOYW1lIiwiUGxheWVyVUlEIiwiQXZhdGFySUQiLCJJc0JvdCIsIk5vT2ZCdXNpbmVzcyIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiSG9tZUJhc2VkQW1vdW50IiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJSZWNlaXZlRG91YmxlUGF5RGF5QW1vdW50IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJOb09mU3RvY2tzIiwiQ2FzaCIsIkdvbGRDb3VudCIsIlN0b2NrQ291bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJMYXd5ZXJTdGF0dXMiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQbGF5ZXJSb2xsQ291bnRlciIsIkluaXRpYWxDb3VudGVyQXNzaWduZWQiLCJpc0dhbWVGaW5pc2hlZCIsIlRvdGFsU2NvcmUiLCJUb3RhbEhCQ2FzaCIsIlRvdGFsQk1DYXNoIiwiVG90YWxHb2xkQ2FzaCIsIlRvdGFsTG9hbkJhbGFuY2UiLCJUb3RhbFN0b2Nrc0Nhc2giLCJHYW1lT3ZlciIsIklzQWN0aXZlIiwiQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5IiwiVXNlcklERm9yUHJvZml0UGF5RGF5IiwiUm9sbENvdW50ZXIiLCJEaWNlVGVtcCIsIkRpY2VSb2xsIiwiSXNUd2VlbmluZyIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlR1cm5DaGVja0FycmF5IiwiQnVzaW5lc3NMb2NhdGlvbk5vZGVzIiwiUGFzc2VkUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiX25leHRUdXJuRG91YmxlUGF5IiwiX25leHRUdXJuaGFsZlBheSIsIl9za2lwTmV4dFR1cm4iLCJfc2tpcE5leHRQYXlkYXkiLCJfc2tpcEhNTmV4dFBheWRheSIsIl9za2lwQk1OZXh0UGF5ZGF5IiwiQ2FyZEV2ZW50UmVjZWl2ZWQiLCJUdXJuSW5Qcm9ncmVzcyIsIkJhY2tzcGFjZXMiLCJpc0dhbWVPdmVyIiwiQ2FyZERpc3BsYXlTZXRUaW1vdXQiLCJHYW1lTWFuYWdlciIsIkNvbXBvbmVudCIsIlBsYXllckdhbWVJbmZvIiwiQm90R2FtZUluZm8iLCJQbGF5ZXJOb2RlIiwiTm9kZSIsIkNhbWVyYU5vZGUiLCJBbGxQbGF5ZXJVSSIsIkFsbFBsYXllck5vZGVzIiwiU3RhcnRMb2NhdGlvbk5vZGVzIiwiU2VsZWN0ZWRNb2RlIiwic3RhdGljcyIsIkluc3RhbmNlIiwiU2V0UGxheWVyTGVmdCIsIl9zdGF0ZSIsIlJlc2V0QWxsVmFyaWFibGVzIiwiSW5wdXRUZXN0RGljZTEiLCJfdmFsIiwiSW5wdXRUZXN0RGljZTIiLCJvbkxvYWQiLCJSZXNldFBheURheSIsIlR1cm5OdW1iZXIiLCJUdXJuQ29tcGxldGVkIiwiQ2hlY2tSZWZlcmVuY2VzIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsIkluaXRfR2FtZU1hbmFnZXIiLCJSYW5kb21DYXJkSW5kZXgiLCJDYXJkQ291bnRlciIsIkNhcmREaXNwbGF5ZWQiLCJjb25zb2xlIiwibG9nIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsIkNoZWNrU3BlY3RhdGUiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIkFsbERhdGEiLCJNYXhQbGF5ZXJzIiwibGVuZ3RoIiwiU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyIiwiVXBkYXRlR2FtZVVJIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJHZXRUdXJuTnVtYmVyIiwiR2V0TXlJbmRleCIsIm15SW5kZXgiLCJfYWN0b3IiLCJQaG90b25BY3RvciIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9hbGxBY3RvcnMiLCJpbmRleCIsIlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyIsIkFzc2lnblBsYXllckdhbWVVSSIsIkVuYWJsZVBsYXllck5vZGVzIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIl90b1BvcyIsIlZlYzIiLCJHZXRfU3BhY2VNYW5hZ2VyIiwiRGF0YSIsIlJlZmVyZW5jZUxvY2F0aW9uIiwicG9zaXRpb24iLCJ4IiwieSIsInNldFBvc2l0aW9uIiwiX2xhc3RJbmRleCIsImFjdGl2ZSIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJUb3RhbENvbm5lY3RlZFBsYXllcnMiLCJteVJvb21BY3RvckNvdW50IiwidXNlcklEIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDaGFuZ2VUdXJuIiwiUmFpc2VFdmVudEZvckNhcmQiLCJfZGF0YSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiUmFpc2VFdmVudCIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJEaXNwbGF5Q2FyZE9uT3RoZXJzIiwiT25MYW5kZWRPblNwYWNlIiwic2V0VGltZW91dCIsIlJlc2V0Q2FyZERpc3BsYXkiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiUmFuZG9tQ2FyZCIsInJhbmRvbUNhcmQiLCJjb3VudGVyIiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIlN5bmNBbGxEYXRhIiwiUmVtb3ZlRnJvbUNoZWNrQXJyYXkiLCJfdWlkIiwiX2luZCIsInNwbGljZSIsIkNoZWNrVHVybkNvbXBsZXRlIiwiaiIsIlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZSIsInB1c2giLCJBcnJheUxlbmd0aCIsIklERm91bmQiLCJSZXNldFNvbWVWYWx1ZXMiLCJDaGFuZ2VUdXJuRm9yY2VmdWxseSIsIlVwZGF0ZVZpc3VhbERhdGEiLCJSZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkiLCJUdXJuSGFuZGxlciIsIl90dXJuIiwiX2lzTWFzdGVyIiwiQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50IiwiX3BsYXllck1hdGNoZWQiLCJUb2dnbGVUdXJuUHJvZ3Jlc3MiLCJSZXNldFR1cm5WYXJpYWJsZSIsIlN0YXJ0TmV3R2FtZV9CYW5rUnVwdGVkIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUm9sbERpY2UiLCJEaWNlUm9sbFNjcmVlbiIsIlBsYXllckluZm8iLCJteVJvb21BY3RvcnNBcnJheSIsIlNob3dUb2FzdCIsIlRvZ2dsZVNraXBOZXh0VHVybiIsIlVwZGF0ZVVJRGF0YSIsIk1haW5TZXNzaW9uRGF0YSIsIk15RGF0YSIsIl9jb3VudGVyIiwiU3RhcnRUdXJuIiwiUmVjZWl2ZUJhbmtydXB0RGF0YSIsIl9pc0JhbmtydXB0ZWQiLCJiYW5rcnVwdGVkIiwidHVybiIsIl9wbGF5ZXJEYXRhIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiX3JhbmRvbUluZGV4IiwiZ2V0UmFuZG9tIiwiU2V0TmFtZSIsIlNldEF2YXRhciIsIl90b2dnbGVIaWdobGlnaHQiLCJfaW5kZXgiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJjaGlsZHJlbiIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiQXZhdGFyU3ByaXRlcyIsIlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMiLCJ0YXJnZXRQb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInJhdGlvIiwid2luU2l6ZSIsImhlaWdodCIsInpvb21SYXRpbyIsImxhdGVVcGRhdGUiLCJzeW5jRGljZVJvbGwiLCJfcm9sbCIsIl9kaWNlMSIsImRpY2UxIiwiX2RpY2UyIiwiZGljZTIiLCJfcmVzdWx0IiwiZXJyb3IiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJBbmltYXRlRGljZSIsIkRpY2VGdW50aW9uYWxpdHkiLCJfcG9zIiwiVHdlZW5DYW1lcmEiLCJUZW1wQ2hlY2tTcGFjZSIsIl9yb2xsaW5nIiwidGVtcGNvdW50ZXIiLCJ0ZW1wY291bnRlcjIiLCJkaWNldG9iZSIsInBhcnNlSW50IiwiU3BhY2VEYXRhIiwiU3BhY2VzVHlwZSIsIkRpY2UxIiwiRGljZTIiLCJfbmV3Um9sbCIsIlJvbGxPbmVEaWNlIiwiUm9sbFR3b0RpY2VzIiwiUG9wdWxhdGVEZWNrc0FycmF5IiwiX2lzQmlnQnVzaW5lc3MiLCJfaXNMb3NzZXMiLCJfaXNNYXJrZXRpbmciLCJfaXNXaWxkQ2FyZCIsInNvcnQiLCJNYXRoIiwicmFuZG9tIiwiX3RlbXBEYXRhIiwiQmlnQXJyYXkiLCJMb3NzQXJyYXkiLCJNYXJrZXRBcnJheSIsIldpbGRBcnJ5YSIsIkdldEJpZ0J1c2luZXNzSW5kZXgiLCJHZXRMb3NzZXNJbmRleCIsIkdldE1hcmtldGluZ0luZGV4IiwiR2V0V2lsZENhcmRJbmRleCIsIlVwZGF0ZUNvdW50ZXJzIiwiU2VsZWN0UmVsYXRlZENhcmQiLCJjYWxsVXBvbkNhcmQiLCJfc3BhY2VJRCIsIlN0YXJ0RGljZVJvbGwiLCJTZW5kaW5nRGF0YSIsImlzQm90IiwiY29tcGxldGVDYXJkVHVybiIsIkFsbFBsYXllcnNHYW1lQ29tcGxldGVkIiwiQ2FsbEdhbWVDb21wbGV0ZSIsIl9pc0JvdCIsIl9mb3JjZUdhbWVPdmVyIiwiX3BsYXllckluZGV4IiwiX2Nhc2giLCJITUFtb3VudCIsIkdldF9HYW1lTWFuYWdlciIsIkJNQW1vdW50IiwiQk1Mb2NhdGlvbnMiLCJsb2FuQW1vdW50IiwiX2dvbGQiLCJfc3RvY2tzIiwiX2RpY2VSYW5kb20iLCJPbmNlT3JTaGFyZSIsIkdvbGRDYXNoIiwiU3RvY2tDYXNoIiwiQk1DYXNoIiwiSE1DYXNoIiwiVG90YWxBc3NldHMiLCJSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlIiwiUmFpc2VFdmVudFRvU3luY0dhbWVDb21wbGV0ZURhdGEiLCJTeW5jR2FtZU92ZXIiLCJfVUlEIiwiaW5mb1RleHQiLCJzdGF0dXNUZXh0IiwiRGlzY29ubmVjdERhdGEiLCJTaG93UmVzdWx0U2NyZWVuIiwiX2N1cnJlbnRDYXNoIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJTdHVkZW50RGF0YSIsImdhbWVDYXNoIiwiX3RvdGFsIiwidG9TdHJpbmciLCJfd29uIiwiZ2FtZXNXb24iLCJVcGRhdGVVc2VyRGF0YSIsIlN5bmNHYW1lQ29tcGxldGVEYXRhIiwiQm90IiwiWm9vbUNhbWVyYU91dE9ubHkiLCJtYXgiLCJTZWxlY3RlZEluZCIsIlNlc3Npb25EYXRhIiwiX3ZhbHVlIiwidHJhY2UiLCJwbGF5ZXJjb21wbGV0ZWQiLCJab29tQ2FtZXJhT3V0IiwiVHdlZW5QbGF5ZXIiLCJtaW4iLCJmbG9vciIsImlzWm9vbSIsInRpbWUiLCJ0d2VlbiIsInRvIiwidjIiLCJlYXNpbmciLCJjYWxsIiwiWm9vbUNhbWVyYUluIiwic3RhcnQiLCJDaGVja1BheURheUNvbmRpdGlvbnMiLCJQcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbiIsIlRvUG9zIiwic3BlZWQiLCJfbmV3cG9zIiwiVG9nZ2xlUGF5RGF5IiwiX3N0MSIsIl9TdDIiLCJJbmNyZWFzZURvdWJsZVBheURheSIsIkV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsImFtb3VudCIsIl9sb2NhdGlvbk5hbWUiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIlNldEJ1c2luZXNzSW5kZXgiLCJTZXRDYXJkRnVuY3Rpb25hbGl0eSIsIlNldEdpdmVuQ2FzaCIsIlNldFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIlJlc2V0RWRpdEJveCIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsImRlc3Ryb3kiLCJVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJfU2hhcmVBbW91bnQiLCJfaXNBZGRpbmciLCJfc3RvY2siLCJfaXNEb3VibGVQYXlEYXkiLCJfZm9yU2VsZWN0ZWRCdXNpbmVzcyIsIl9TZWxlY3RlZEJ1c2luZXNzSW5kZXgiLCJIQkFtb3VudCIsIl90aXRsZSIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJfYW1vdW50IiwiX3VJRCIsIklEIiwiUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9pRCIsIl9teUluZGV4IiwiVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4iLCJUb2dnbGVIYWxmUGF5TmV4dFR1cm4iLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJSZXR1cm5UdXJuUHJvZ3Jlc3MiLCJMb3NlQWxsTWFya2V0aW5nTW9uZXkiLCJfbG9zZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfbXVsdGlwbGllciIsIl9hbW91bnRJbmNyZWFzZWQiLCJHZXRNYXJrZXRpbmdNb25leSIsIl9wcm9maXQiLCJHZXRWb2NhYnVsYXJ5UXVlc3Rpb25zSW5kZXgiLCJQb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfVm9jYWJ1bGFyeSIsIkdldEVzdGFibGlzaG1lbnRRdWVzdGlvbnNJbmRleCIsIlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Fc3RhYmxpc2htZW50IiwiVm9jQXJyYXkiLCJFc3RBcnJheSIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiX3F1ZXN0aW9uUmVmIiwiR2V0X1F1ZXN0aW9uc0RhdGEiLCJfdXNlcklEIiwiVXNlcklEIiwiX3F1ZXN0aW9uSW5kZXgiLCJRdWVzdGlvbiIsIlVzZXJJbmRleCIsIl9pc1ZvYyIsIklzVm9jIiwiX2dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX1FkYXRhIiwiQ29ycmVjdE9wdGlvbiIsIl9tZXNzYWdlIiwiT3B0aW9uMSIsIk9wdGlvbjIiLCJPcHRpb24zIiwiT3B0aW9uNCIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJfaXNUdXJuT3ZlciIsIl9teURhdGEiLCJfcm9vbURhdGEiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9TZWxlY3RPcHRpb25fT25lUXVlc3Rpb24iLCJldmVudCIsIl9zZWxlY3Rpb24iLCJjdXJyZW50VGFyZ2V0Iiwic3BsaXQiLCJSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJTZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJTZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIlNlbGVjdFBsYXllclRha2VPdmVyX1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5IiwiVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyIiwiUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlciIsIlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIiLCJTZWxlY3RQbGF5ZXJCdXlIYWxmQnVzaW5lc3NfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJTZWxlY3RQbGF5ZXJEYW1hZ2luZ0luZm9ybWF0aW9uX1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5IiwiVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckRhbWFnaW5nIiwiUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyIsIlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmciLCJSZWNlaXZlRXZlbnRfU2VsZWN0UGxheWVyRm9yUHJvZml0X1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5IiwiX293bklEIiwiX3BsYXllck5hbWUiLCJVc2VyTmFtZSIsIl9wbGF5ZXJJRCIsIk93blBsYXllcklEIiwiX2hhc0RvbmVQYXltZW50IiwiX2hhc0Fuc3dlcmVkUXVlc3Rpb24iLCJfVXNlcklEIiwiUGF5bWVudERvbmUiLCJRdWVzdGlvbkFuc3dlcmVkIiwiUXVlc3Rpb25JbmRleCIsIkRlZHVjdENhc2hfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJBZGRDYXNoX0NhcmRGdW5jdGlvbmFsaXR5IiwiX0lEIiwiX21zZyIsIm1zZyIsIm1vZGUiLCJVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbiIsIlJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfc2VsZWN0ZWRQbGF5ZXJJbmRleCIsIl9hY3RvcnNEYXRhIiwiUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5IiwiX3NwYWNlcyIsImJhY2tzcGFjZXMiLCJDb3VudGVyIiwiVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzIiwiR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSIsIlJlY2VpdmVFdmVudF9UYWtlT3ZlckJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5IiwiX2lkIiwiUGxheWVyIiwiX2J1c2luZXNzIiwiQnVzaW5lc3MiLCJfYnVzaW5lc3NJbmRleCIsIkJ1c2luZXNzSW5kZXgiLCJfbXlBY3RvciIsIl9sb2NhdGlvbnMiLCJUYWtlT3ZlckJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5IiwiX2J1eUhhbGZCdXNpbmVzcyIsIl9kaWNlUm9sbCIsIl9tdWx0aXBsaWVyQnVzaW5lc3MiLCJfcGxheWVyIiwiX3NlbmRpbmdEYXRhIiwiRXhpdFNjcmVlbkFsb25nVHVybk92ZXJfX0J1c2luZXNzR2VucmljIiwiX3RlbXBTdW0iLCJSZWNlaXZlRXZlbnRfQnV5SGFsZkJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5IiwiX2Nhc2hBbW91bnQiLCJfc2VuZGVySUQiLCJNeUlEIiwiX3NlbmRlck5hbWUiLCJNeU5hbWUiLCJQYXlBbW91bnRfQnV5SGFsZkJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5IiwiVG9nZ2xlU2NyZWVuX0J1eUhhbGZCdXNpbmVzcyIsIlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlIiwiQnV5SGFsZkJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5IiwiX3RleHQiLCJTZXRUaXRsZVRleHRfQnV5SGFsZkJ1c2luZXNzIiwiUmVjZWl2ZUV2ZW50X1NlbGVjdFBsYXllckRhbWFnaW5nRGVjaXNpb25fU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJQbGF5ZXJJbmRleCIsIk15VXNlcklEIiwiU2V0U2VuZGVySURfRGFtYWdlRGVjaXNpb24iLCJUb2dnbGVNYWluU2NyZWVuX0RhbWFnZURlY2lzaW9uIiwiVG9nZ2xlRGljZVJlc3VsdFNjcmVlbl9EYW1hZ2VEZWNpc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHLEtBQWQ7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUNBLElBQUlDLGtCQUFrQixHQUFHLENBQXpCO0FBQ0EsSUFBSUMsb0JBQW9CLEdBQUcsRUFBM0I7QUFDQSxJQUFJQyx1QkFBdUIsR0FBRyxDQUE5QjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBRUEsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUVBLElBQUlDLFlBQVksR0FBRyxLQUFuQjtBQUNBLElBQUlDLFdBQVcsR0FBRyxLQUFsQjtBQUNBLElBQUlDLG1CQUFtQixHQUFHLEtBQTFCO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsQ0FBMUI7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxDQUExQjtBQUNBLElBQUlDLG1CQUFtQixHQUFHLEtBQTFCO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEtBQWpCO0FBQ0EsSUFBSUMsa0JBQWtCLEdBQUcsSUFBekI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsS0FBcEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsQ0FBcEI7QUFFQSxJQUFJQyxtQkFBbUIsR0FBRyxFQUExQjtBQUNBLElBQUlDLHNCQUFzQixHQUFHLEVBQTdCO0FBQ0EsSUFBSUMsMEJBQTBCLEdBQUcsQ0FBakM7QUFDQSxJQUFJQyw2QkFBNkIsR0FBRyxDQUFwQztBQUVBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsY0FBYyxHQUFHLEVBQXJCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLEVBQXBCO0FBQ0EsSUFBSUMsdUJBQXVCLEdBQUcsQ0FBOUI7QUFDQSxJQUFJQyxrQkFBa0IsR0FBRyxDQUF6QjtBQUNBLElBQUlDLHFCQUFxQixHQUFHLENBQTVCO0FBQ0EsSUFBSUMsb0JBQW9CLEdBQUcsQ0FBM0IsRUFFQTtBQUNBOztBQUNBLElBQUlDLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUM3QkMsRUFBQUEsSUFBSSxFQUFFLENBRHVCO0FBRTdCQyxFQUFBQSxTQUFTLEVBQUUsQ0FGa0I7QUFFZjtBQUNkQyxFQUFBQSxjQUFjLEVBQUUsQ0FIYSxDQUdWOztBQUhVLENBQVIsQ0FBdkIsRUFNQTs7QUFDQSxJQUFJQyxZQUFZLEdBQUdMLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQzFCQyxFQUFBQSxJQUFJLEVBQUUsY0FEb0I7QUFFMUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxJQUFJLEVBQUUsY0FESTtBQUVWQyxJQUFBQSxZQUFZLEVBQUU7QUFDWkMsTUFBQUEsV0FBVyxFQUFFLE1BREQ7QUFFWkMsTUFBQUEsSUFBSSxFQUFFYixnQkFGTTtBQUdaLGlCQUFTQSxnQkFBZ0IsQ0FBQ0csSUFIZDtBQUlaVyxNQUFBQSxZQUFZLEVBQUUsSUFKRjtBQUtaQyxNQUFBQSxPQUFPLEVBQUU7QUFMRyxLQUZKO0FBU1ZDLElBQUFBLHVCQUF1QixFQUFFO0FBQ3ZCSixNQUFBQSxXQUFXLEVBQUUsTUFEVTtBQUV2QkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZjO0FBR3ZCLGlCQUFTLEVBSGM7QUFJdkJILE1BQUFBLFlBQVksRUFBRSxJQUpTO0FBS3ZCQyxNQUFBQSxPQUFPLEVBQUU7QUFMYyxLQVRmO0FBZ0JWRyxJQUFBQSxZQUFZLEVBQUU7QUFDWk4sTUFBQUEsV0FBVyxFQUFFLE1BREQ7QUFFWkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZHO0FBR1osaUJBQVMsRUFIRztBQUlaSCxNQUFBQSxZQUFZLEVBQUUsSUFKRjtBQUtaQyxNQUFBQSxPQUFPLEVBQUU7QUFMRyxLQWhCSjtBQXVCVkksSUFBQUEsTUFBTSxFQUFFO0FBQ05QLE1BQUFBLFdBQVcsRUFBRSxRQURQO0FBRU4saUJBQVMsQ0FGSDtBQUdOQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BSEg7QUFJTk4sTUFBQUEsWUFBWSxFQUFFLElBSlI7QUFLTkMsTUFBQUEsT0FBTyxFQUFFO0FBTEgsS0F2QkU7QUE4QlZNLElBQUFBLGFBQWEsRUFBRTtBQUNiVCxNQUFBQSxXQUFXLEVBQUUsZUFEQTtBQUViLGlCQUFTLEtBRkk7QUFHYlUsTUFBQUEsSUFBSSxFQUFFckIsRUFBRSxDQUFDc0IsT0FISTtBQUliVCxNQUFBQSxZQUFZLEVBQUUsSUFKRDtBQUtiQyxNQUFBQSxPQUFPLEVBQUU7QUFMSSxLQTlCTDtBQXFDVlMsSUFBQUEsU0FBUyxFQUFFO0FBQ1RaLE1BQUFBLFdBQVcsRUFBRSxXQURKO0FBRVRDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGQTtBQUdULGlCQUFTLEVBSEE7QUFJVEgsTUFBQUEsWUFBWSxFQUFFLElBSkw7QUFLVEMsTUFBQUEsT0FBTyxFQUFFO0FBTEEsS0FyQ0Q7QUE0Q1ZVLElBQUFBLFdBQVcsRUFBRTtBQUNYYixNQUFBQSxXQUFXLEVBQUUsYUFERjtBQUVYQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRkU7QUFHWCxpQkFBUyxFQUhFO0FBSVhILE1BQUFBLFlBQVksRUFBRSxJQUpIO0FBS1hDLE1BQUFBLE9BQU8sRUFBRTtBQUxFLEtBNUNIO0FBbURWVyxJQUFBQSxhQUFhLEVBQUU7QUFDYmQsTUFBQUEsV0FBVyxFQUFFLGVBREE7QUFFYkMsTUFBQUEsSUFBSSxFQUFFLENBQUNaLEVBQUUsQ0FBQ2dCLElBQUosQ0FGTztBQUdiLGlCQUFTLEVBSEk7QUFJYkgsTUFBQUEsWUFBWSxFQUFFLElBSkQ7QUFLYkMsTUFBQUEsT0FBTyxFQUFFO0FBTEksS0FuREw7QUEwRFZZLElBQUFBLFNBQVMsRUFBRTtBQUNUZixNQUFBQSxXQUFXLEVBQUUsV0FESjtBQUVUQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRkE7QUFHVCxpQkFBUyxLQUhBO0FBSVRULE1BQUFBLFlBQVksRUFBRTtBQUpMLEtBMUREO0FBZ0VWYyxJQUFBQSxVQUFVLEVBQUU7QUFDVmhCLE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGQztBQUdWLGlCQUFTLENBSEM7QUFJVk4sTUFBQUEsWUFBWSxFQUFFO0FBSkosS0FoRUY7QUFzRVZlLElBQUFBLG1CQUFtQixFQUFFO0FBQ25CakIsTUFBQUEsV0FBVyxFQUFFLHFCQURNO0FBRW5CQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRlU7QUFHbkIsaUJBQVMsS0FIVTtBQUluQlQsTUFBQUEsWUFBWSxFQUFFO0FBSks7QUF0RVgsR0FGYztBQWdGMUJnQixFQUFBQSxJQUFJLEVBQUUsZ0JBQVksQ0FDaEI7QUFDRDtBQWxGeUIsQ0FBVCxDQUFuQixFQW9GQTs7QUFDQSxJQUFJQyxxQkFBcUIsR0FBRzlCLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ25DQyxFQUFBQSxJQUFJLEVBQUUsdUJBRDZCO0FBRW5DQyxFQUFBQSxVQUFVLEVBQUU7QUFDVnVCLElBQUFBLGlCQUFpQixFQUFFO0FBQ2pCcEIsTUFBQUEsV0FBVyxFQUFFLG1CQURJO0FBRWpCQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRlE7QUFHakIsaUJBQVMsS0FIUTtBQUlqQlQsTUFBQUEsWUFBWSxFQUFFLElBSkc7QUFLakJDLE1BQUFBLE9BQU8sRUFBRTtBQUxRLEtBRFQ7QUFRVmtCLElBQUFBLFlBQVksRUFBRTtBQUNackIsTUFBQUEsV0FBVyxFQUFFLGNBREQ7QUFFWkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZHO0FBR1osaUJBQVMsS0FIRztBQUlaVCxNQUFBQSxZQUFZLEVBQUUsSUFKRjtBQUtaQyxNQUFBQSxPQUFPLEVBQUU7QUFMRyxLQVJKO0FBZVZtQixJQUFBQSxjQUFjLEVBQUU7QUFDZHRCLE1BQUFBLFdBQVcsRUFBRSxnQkFEQztBQUVkQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRks7QUFHZCxpQkFBUyxLQUhLO0FBSWRULE1BQUFBLFlBQVksRUFBRSxJQUpBO0FBS2RDLE1BQUFBLE9BQU8sRUFBRTtBQUxLLEtBZk47QUFzQlZvQixJQUFBQSxnQkFBZ0IsRUFBRTtBQUNoQnZCLE1BQUFBLFdBQVcsRUFBRSxrQkFERztBQUVoQkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZPO0FBR2hCLGlCQUFTLEtBSE87QUFJaEJULE1BQUFBLFlBQVksRUFBRSxJQUpFO0FBS2hCQyxNQUFBQSxPQUFPLEVBQUU7QUFMTyxLQXRCUjtBQTZCVnFCLElBQUFBLGdCQUFnQixFQUFFO0FBQ2hCeEIsTUFBQUEsV0FBVyxFQUFFLGtCQURHO0FBRWhCQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRk87QUFHaEIsaUJBQVMsS0FITztBQUloQlQsTUFBQUEsWUFBWSxFQUFFLElBSkU7QUFLaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxPLEtBN0JSO0FBb0NWc0IsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEJ6QixNQUFBQSxXQUFXLEVBQUUsb0JBREs7QUFFbEJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGUztBQUdsQixpQkFBUyxLQUhTO0FBSWxCVCxNQUFBQSxZQUFZLEVBQUU7QUFKSSxLQXBDVjtBQTBDVndCLElBQUFBLHlCQUF5QixFQUFFO0FBQ3pCMUIsTUFBQUEsV0FBVyxFQUFFLDJCQURZO0FBRXpCQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRmdCO0FBR3pCLGlCQUFTLENBSGdCO0FBSXpCTixNQUFBQSxZQUFZLEVBQUU7QUFKVyxLQTFDakI7QUFnRFZ5QixJQUFBQSxtQkFBbUIsRUFBRTtBQUNuQjNCLE1BQUFBLFdBQVcsRUFBRSxxQkFETTtBQUVuQkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZVO0FBR25CLGlCQUFTLEtBSFU7QUFJbkJULE1BQUFBLFlBQVksRUFBRTtBQUpLLEtBaERYO0FBc0RWMEIsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEI1QixNQUFBQSxXQUFXLEVBQUUsb0JBREs7QUFFbEJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGUztBQUdsQixpQkFBUyxLQUhTO0FBSWxCVCxNQUFBQSxZQUFZLEVBQUU7QUFKSTtBQXREVixHQUZ1QjtBQWdFbkNnQixFQUFBQSxJQUFJLEVBQUUsZ0JBQVksQ0FDaEI7QUFDRDtBQWxFa0MsQ0FBVCxDQUE1QixFQW9FQTs7QUFDQSxJQUFJVyxTQUFTLEdBQUd4QyxFQUFFLENBQUNNLEtBQUgsQ0FBUztBQUN2QkMsRUFBQUEsSUFBSSxFQUFFLFdBRGlCO0FBRXZCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsSUFBSSxFQUFFLFdBREk7QUFFVlEsSUFBQUEsWUFBWSxFQUFFO0FBQ1pOLE1BQUFBLFdBQVcsRUFBRSxjQUREO0FBRVpDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGRztBQUdaLGlCQUFTLEVBSEc7QUFJWkgsTUFBQUEsWUFBWSxFQUFFLElBSkY7QUFLWkMsTUFBQUEsT0FBTyxFQUFFO0FBTEcsS0FGSjtBQVNWMkIsSUFBQUEsV0FBVyxFQUFFO0FBQ1g5QixNQUFBQSxXQUFXLEVBQUUsYUFERjtBQUVYQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRkU7QUFHWCxpQkFBUyxDQUhFO0FBSVhOLE1BQUFBLFlBQVksRUFBRSxJQUpIO0FBS1hDLE1BQUFBLE9BQU8sRUFBRTtBQUxFO0FBVEgsR0FGVztBQW9CdkJlLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBdEJzQixDQUFULENBQWhCLEVBeUJBOztBQUNBLElBQUlhLFVBQVUsR0FBRzFDLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsWUFEa0I7QUFFeEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWbUMsSUFBQUEsVUFBVSxFQUFFO0FBQ1ZoQyxNQUFBQSxXQUFXLEVBQUUsWUFESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRkM7QUFHVixpQkFBUyxFQUhDO0FBSVZILE1BQUFBLFlBQVksRUFBRSxJQUpKO0FBS1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxDLEtBREY7QUFRVjhCLElBQUFBLFNBQVMsRUFBRTtBQUNUakMsTUFBQUEsV0FBVyxFQUFFLFdBREo7QUFFVEMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZBO0FBR1QsaUJBQVMsRUFIQTtBQUlUSCxNQUFBQSxZQUFZLEVBQUUsSUFKTDtBQUtUQyxNQUFBQSxPQUFPLEVBQUU7QUFMQSxLQVJEO0FBZVYrQixJQUFBQSxRQUFRLEVBQUU7QUFDUmxDLE1BQUFBLFdBQVcsRUFBRSxVQURMO0FBRVIsaUJBQVMsQ0FGRDtBQUdSQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BSEQ7QUFJUk4sTUFBQUEsWUFBWSxFQUFFLElBSk47QUFLUkMsTUFBQUEsT0FBTyxFQUFFO0FBTEQsS0FmQTtBQXNCVmdDLElBQUFBLEtBQUssRUFBRTtBQUNMbkMsTUFBQUEsV0FBVyxFQUFFLE9BRFI7QUFFTCxpQkFBUyxLQUZKO0FBR0xVLE1BQUFBLElBQUksRUFBRXJCLEVBQUUsQ0FBQ3NCLE9BSEo7QUFJTFQsTUFBQUEsWUFBWSxFQUFFLElBSlQ7QUFLTEMsTUFBQUEsT0FBTyxFQUFFO0FBTEosS0F0Qkc7QUE2QlZpQyxJQUFBQSxZQUFZLEVBQUU7QUFDWnBDLE1BQUFBLFdBQVcsRUFBRSxVQUREO0FBRVpDLE1BQUFBLElBQUksRUFBRSxDQUFDUCxZQUFELENBRk07QUFHWixpQkFBUyxFQUhHO0FBSVpRLE1BQUFBLFlBQVksRUFBRSxJQUpGO0FBS1pDLE1BQUFBLE9BQU8sRUFBRTtBQUxHLEtBN0JKO0FBb0NWa0MsSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJyQyxNQUFBQSxXQUFXLEVBQUUsbUJBREk7QUFFakJDLE1BQUFBLElBQUksRUFBRWtCLHFCQUZXO0FBR2pCLGlCQUFTLElBSFE7QUFJakJqQixNQUFBQSxZQUFZLEVBQUUsSUFKRztBQUtqQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFEsS0FwQ1Q7QUEyQ1ZtQyxJQUFBQSxlQUFlLEVBQUU7QUFDZnRDLE1BQUFBLFdBQVcsRUFBRSxpQkFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRk07QUFHZixpQkFBUyxDQUhNO0FBSWZOLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNLEtBM0NQO0FBa0RWb0MsSUFBQUEsb0JBQW9CLEVBQUU7QUFDcEJ2QyxNQUFBQSxXQUFXLEVBQUUsc0JBRE87QUFFcEJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGVztBQUdwQixpQkFBUyxDQUhXO0FBSXBCTixNQUFBQSxZQUFZLEVBQUUsSUFKTTtBQUtwQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFcsS0FsRFo7QUF5RFZxQyxJQUFBQSx5QkFBeUIsRUFBRTtBQUN6QnhDLE1BQUFBLFdBQVcsRUFBRSwyQkFEWTtBQUV6QkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZnQjtBQUd6QixpQkFBUyxDQUhnQjtBQUl6Qk4sTUFBQUEsWUFBWSxFQUFFO0FBSlcsS0F6RGpCO0FBK0RWdUMsSUFBQUEsb0JBQW9CLEVBQUU7QUFDcEJ6QyxNQUFBQSxXQUFXLEVBQUUsc0JBRE87QUFFcEJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGVztBQUdwQixpQkFBUyxDQUhXO0FBSXBCTixNQUFBQSxZQUFZLEVBQUUsSUFKTTtBQUtwQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFcsS0EvRFo7QUFzRVZ1QyxJQUFBQSxVQUFVLEVBQUU7QUFDVjFDLE1BQUFBLFdBQVcsRUFBRSxRQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRSxDQUFDNEIsU0FBRCxDQUZJO0FBR1YsaUJBQVMsRUFIQztBQUlWM0IsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0F0RUY7QUE2RVZ3QyxJQUFBQSxJQUFJLEVBQUU7QUFDSjNDLE1BQUFBLFdBQVcsRUFBRSxZQURUO0FBRUosaUJBQVMsQ0FGTDtBQUdKQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BSEw7QUFJSk4sTUFBQUEsWUFBWSxFQUFFLElBSlY7QUFLSkMsTUFBQUEsT0FBTyxFQUFFO0FBTEwsS0E3RUk7QUFvRlZ5QyxJQUFBQSxTQUFTLEVBQUU7QUFDVDVDLE1BQUFBLFdBQVcsRUFBRSxXQURKO0FBRVQsaUJBQVMsQ0FGQTtBQUdUQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BSEE7QUFJVE4sTUFBQUEsWUFBWSxFQUFFLElBSkw7QUFLVEMsTUFBQUEsT0FBTyxFQUFFO0FBTEEsS0FwRkQ7QUEyRlYwQyxJQUFBQSxVQUFVLEVBQUU7QUFDVjdDLE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVYsaUJBQVMsQ0FGQztBQUdWQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BSEM7QUFJVk4sTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0EzRkY7QUFrR1ZZLElBQUFBLFNBQVMsRUFBRTtBQUNUZixNQUFBQSxXQUFXLEVBQUUsV0FESjtBQUVULGlCQUFTLEtBRkE7QUFHVEMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUhBO0FBSVRULE1BQUFBLFlBQVksRUFBRSxJQUpMO0FBS1RDLE1BQUFBLE9BQU8sRUFBRTtBQUxBLEtBbEdEO0FBeUdWYSxJQUFBQSxVQUFVLEVBQUU7QUFDVmhCLE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVYsaUJBQVMsQ0FGQztBQUdWQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BSEM7QUFJVk4sTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0F6R0Y7QUFnSFYyQyxJQUFBQSxlQUFlLEVBQUU7QUFDZjlDLE1BQUFBLFdBQVcsRUFBRSxpQkFERTtBQUVmLGlCQUFTLENBRk07QUFHZkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUhNO0FBSWZOLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNLEtBaEhQO0FBdUhWNEMsSUFBQUEsWUFBWSxFQUFFO0FBQ1ovQyxNQUFBQSxXQUFXLEVBQUUsY0FERDtBQUVaLGlCQUFTLEtBRkc7QUFHWkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUhHO0FBSVpULE1BQUFBLFlBQVksRUFBRSxJQUpGO0FBS1pDLE1BQUFBLE9BQU8sRUFBRTtBQUxHLEtBdkhKO0FBOEhWNkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1ZoRCxNQUFBQSxXQUFXLEVBQUUsWUFESDtBQUVWLGlCQUFTLEtBRkM7QUFHVkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUhDO0FBSVZULE1BQUFBLFlBQVksRUFBRSxJQUpKO0FBS1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxDLEtBOUhGO0FBcUlWOEMsSUFBQUEsY0FBYyxFQUFFO0FBQ2RqRCxNQUFBQSxXQUFXLEVBQUUsZ0JBREM7QUFFZCxpQkFBUyxDQUZLO0FBR2RDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FISztBQUlkTixNQUFBQSxZQUFZLEVBQUUsSUFKQTtBQUtkQyxNQUFBQSxPQUFPLEVBQUU7QUFMSyxLQXJJTjtBQTRJVitDLElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCbEQsTUFBQUEsV0FBVyxFQUFFLG9CQURLO0FBRWxCLGlCQUFTLEtBRlM7QUFHbEJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FIUztBQUlsQlQsTUFBQUEsWUFBWSxFQUFFLElBSkk7QUFLbEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxTLEtBNUlWO0FBbUpWZ0QsSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJuRCxNQUFBQSxXQUFXLEVBQUUsbUJBREk7QUFFakIsaUJBQVMsQ0FGUTtBQUdqQkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUhRO0FBSWpCTixNQUFBQSxZQUFZLEVBQUUsSUFKRztBQUtqQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFEsS0FuSlQ7QUEwSlZpRCxJQUFBQSxzQkFBc0IsRUFBRTtBQUN0QnBELE1BQUFBLFdBQVcsRUFBRSx3QkFEUztBQUV0QixpQkFBUyxLQUZhO0FBR3RCQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BSGE7QUFJdEJULE1BQUFBLFlBQVksRUFBRTtBQUpRLEtBMUpkO0FBZ0tWbUQsSUFBQUEsY0FBYyxFQUFFO0FBQ2RyRCxNQUFBQSxXQUFXLEVBQUUsZ0JBREM7QUFFZEMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZLO0FBR2QsaUJBQVMsS0FISztBQUlkVCxNQUFBQSxZQUFZLEVBQUU7QUFKQSxLQWhLTjtBQXNLVm9ELElBQUFBLFVBQVUsRUFBRTtBQUNWdEQsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZDO0FBR1YsaUJBQVMsQ0FIQztBQUlWTixNQUFBQSxZQUFZLEVBQUU7QUFKSixLQXRLRjtBQTRLVnFELElBQUFBLFdBQVcsRUFBRTtBQUNYdkQsTUFBQUEsV0FBVyxFQUFFLGFBREY7QUFFWEMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZFO0FBR1gsaUJBQVMsQ0FIRTtBQUlYTixNQUFBQSxZQUFZLEVBQUU7QUFKSCxLQTVLSDtBQWtMVnNELElBQUFBLFdBQVcsRUFBRTtBQUNYeEQsTUFBQUEsV0FBVyxFQUFFLGFBREY7QUFFWEMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZFO0FBR1gsaUJBQVMsQ0FIRTtBQUlYTixNQUFBQSxZQUFZLEVBQUU7QUFKSCxLQWxMSDtBQXdMVnVELElBQUFBLGFBQWEsRUFBRTtBQUNiekQsTUFBQUEsV0FBVyxFQUFFLGVBREE7QUFFYkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZJO0FBR2IsaUJBQVMsQ0FISTtBQUliTixNQUFBQSxZQUFZLEVBQUU7QUFKRCxLQXhMTDtBQThMVndELElBQUFBLGdCQUFnQixFQUFFO0FBQ2hCMUQsTUFBQUEsV0FBVyxFQUFFLGtCQURHO0FBRWhCQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRk87QUFHaEIsaUJBQVMsQ0FITztBQUloQk4sTUFBQUEsWUFBWSxFQUFFO0FBSkUsS0E5TFI7QUFvTVZ5RCxJQUFBQSxlQUFlLEVBQUU7QUFDZjNELE1BQUFBLFdBQVcsRUFBRSxpQkFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRk07QUFHZixpQkFBUyxDQUhNO0FBSWZOLE1BQUFBLFlBQVksRUFBRTtBQUpDLEtBcE1QO0FBME1WMEQsSUFBQUEsUUFBUSxFQUFFO0FBQ1I1RCxNQUFBQSxXQUFXLEVBQUUsVUFETDtBQUVSQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRkQ7QUFHUixpQkFBUyxLQUhEO0FBSVJULE1BQUFBLFlBQVksRUFBRTtBQUpOLEtBMU1BO0FBZ05WMkQsSUFBQUEsUUFBUSxFQUFFO0FBQ1I3RCxNQUFBQSxXQUFXLEVBQUUsVUFETDtBQUVSQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRkQ7QUFHUixpQkFBUyxJQUhEO0FBSVJULE1BQUFBLFlBQVksRUFBRTtBQUpOLEtBaE5BO0FBc05WNEQsSUFBQUEscUJBQXFCLEVBQUU7QUFDckI5RCxNQUFBQSxXQUFXLEVBQUUsdUJBRFE7QUFFckJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGWTtBQUdyQixpQkFBUyxJQUhZO0FBSXJCVCxNQUFBQSxZQUFZLEVBQUU7QUFKTyxLQXROYjtBQTZOVjZELElBQUFBLHFCQUFxQixFQUFFO0FBQ3JCL0QsTUFBQUEsV0FBVyxFQUFFLHVCQURRO0FBRXJCQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRlk7QUFHckIsaUJBQVMsRUFIWTtBQUlyQkgsTUFBQUEsWUFBWSxFQUFFO0FBSk87QUE3TmIsR0FGWTtBQXNPeEJnQixFQUFBQSxJQUFJLEVBQUUsZ0JBQVksQ0FDaEI7QUFDRDtBQXhPdUIsQ0FBVCxDQUFqQixFQTBPQTtBQUVBO0FBQ0E7O0FBQ0EsSUFBSThDLFdBQVcsR0FBRyxDQUFsQjtBQUNBLElBQUlDLFFBQVEsR0FBRyxDQUFmO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxVQUFVLEdBQUcsS0FBakI7QUFDQSxJQUFJQyx3QkFBd0IsR0FBRyxJQUEvQjtBQUNBLElBQUlDLGNBQWMsR0FBRyxFQUFyQjtBQUNBLElBQUlDLHFCQUFxQixHQUFHLEVBQTVCO0FBRUEsSUFBSUMsWUFBWSxHQUFHLEtBQW5CO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLEtBQW5CLEVBRUE7O0FBQ0EsSUFBSUMsa0JBQWtCLEdBQUcsS0FBekI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBRyxLQUF2QjtBQUNBLElBQUlDLGFBQWEsR0FBRyxLQUFwQjtBQUNBLElBQUlDLGVBQWUsR0FBRyxLQUF0QixFQUE2Qjs7QUFDN0IsSUFBSUMsaUJBQWlCLEdBQUcsS0FBeEIsRUFBK0I7O0FBQy9CLElBQUlDLGlCQUFpQixHQUFHLEtBQXhCLEVBQStCOztBQUMvQixJQUFJQyxpQkFBaUIsR0FBRyxLQUF4QjtBQUNBLElBQUlDLGNBQWMsR0FBRyxLQUFyQjtBQUVBLElBQUlDLFVBQVUsR0FBRyxDQUFqQjtBQUNBLElBQUlDLFVBQVUsR0FBRyxLQUFqQjtBQUVBLElBQUlDLG9CQUFvQixHQUFHLElBQTNCO0FBRUEsSUFBSUMsV0FBVyxHQUFHL0YsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDekJDLEVBQUFBLElBQUksRUFBRSxhQURtQjtBQUV6QixhQUFTUCxFQUFFLENBQUNnRyxTQUZhO0FBR3pCeEYsRUFBQUEsVUFBVSxFQUFFO0FBQ1Z5RixJQUFBQSxjQUFjLEVBQUU7QUFDZCxpQkFBUyxFQURLO0FBRWRyRixNQUFBQSxJQUFJLEVBQUUsQ0FBQzhCLFVBQUQsQ0FGUTtBQUdkN0IsTUFBQUEsWUFBWSxFQUFFLElBSEE7QUFJZEMsTUFBQUEsT0FBTyxFQUFFO0FBSkssS0FETjtBQU9Wb0YsSUFBQUEsV0FBVyxFQUFFO0FBQ1gsaUJBQVMsRUFERTtBQUVYdEYsTUFBQUEsSUFBSSxFQUFFLENBQUM4QixVQUFELENBRks7QUFHWDdCLE1BQUFBLFlBQVksRUFBRSxJQUhIO0FBSVhDLE1BQUFBLE9BQU8sRUFBRTtBQUpFLEtBUEg7QUFhVnFGLElBQUFBLFVBQVUsRUFBRTtBQUNWLGlCQUFTLElBREM7QUFFVnZGLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDb0csSUFGQztBQUdWdkYsTUFBQUEsWUFBWSxFQUFFLElBSEo7QUFJVkMsTUFBQUEsT0FBTyxFQUFFO0FBSkMsS0FiRjtBQW1CVnVGLElBQUFBLFVBQVUsRUFBRTtBQUNWLGlCQUFTLElBREM7QUFFVnpGLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDb0csSUFGQztBQUdWdkYsTUFBQUEsWUFBWSxFQUFFLElBSEo7QUFJVkMsTUFBQUEsT0FBTyxFQUFFO0FBSkMsS0FuQkY7QUF5QlZ3RixJQUFBQSxXQUFXLEVBQUU7QUFDWCxpQkFBUyxFQURFO0FBRVgxRixNQUFBQSxJQUFJLEVBQUUsQ0FBQ1osRUFBRSxDQUFDb0csSUFBSixDQUZLO0FBR1h2RixNQUFBQSxZQUFZLEVBQUUsSUFISDtBQUlYQyxNQUFBQSxPQUFPLEVBQUU7QUFKRSxLQXpCSDtBQStCVnlGLElBQUFBLGNBQWMsRUFBRTtBQUNkLGlCQUFTLEVBREs7QUFFZDNGLE1BQUFBLElBQUksRUFBRSxDQUFDWixFQUFFLENBQUNvRyxJQUFKLENBRlE7QUFHZHZGLE1BQUFBLFlBQVksRUFBRSxJQUhBO0FBSWRDLE1BQUFBLE9BQU8sRUFBRTtBQUpLLEtBL0JOO0FBcUNWMEYsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEIsaUJBQVMsRUFEUztBQUVsQjVGLE1BQUFBLElBQUksRUFBRSxDQUFDWixFQUFFLENBQUNvRyxJQUFKLENBRlk7QUFHbEJ2RixNQUFBQSxZQUFZLEVBQUUsSUFISTtBQUlsQkMsTUFBQUEsT0FBTyxFQUFFO0FBSlMsS0FyQ1Y7QUEyQ1YyRixJQUFBQSxZQUFZLEVBQUU7QUFDWixpQkFBUyxDQURHO0FBRVo3RixNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRkc7QUFHWk4sTUFBQUEsWUFBWSxFQUFFLElBSEY7QUFJWkMsTUFBQUEsT0FBTyxFQUFFO0FBSkc7QUEzQ0osR0FIYTtBQXNEekI0RixFQUFBQSxPQUFPLEVBQUU7QUFDUGhFLElBQUFBLFVBQVUsRUFBRUEsVUFETDtBQUVQckMsSUFBQUEsWUFBWSxFQUFFQSxZQUZQO0FBR1B5QixJQUFBQSxxQkFBcUIsRUFBRUEscUJBSGhCO0FBSVAvQixJQUFBQSxnQkFBZ0IsRUFBRUEsZ0JBSlg7QUFLUDRHLElBQUFBLFFBQVEsRUFBRTtBQUxILEdBdERnQjtBQThEekJDLEVBQUFBLGFBOUR5Qix5QkE4RFhDLE1BOURXLEVBOERIO0FBQ3BCOUgsSUFBQUEsVUFBVSxHQUFHOEgsTUFBYjtBQUNELEdBaEV3QjtBQWtFekJDLEVBQUFBLGlCQWxFeUIsK0JBa0VMO0FBQ2xCM0gsSUFBQUEsbUJBQW1CLEdBQUcsRUFBdEI7QUFDQUMsSUFBQUEsc0JBQXNCLEdBQUcsRUFBekI7QUFDQUMsSUFBQUEsMEJBQTBCLEdBQUcsQ0FBN0I7QUFDQUMsSUFBQUEsNkJBQTZCLEdBQUcsQ0FBaEM7QUFFQUMsSUFBQUEsZ0JBQWdCLEdBQUcsRUFBbkI7QUFDQUMsSUFBQUEsV0FBVyxHQUFHLEVBQWQ7QUFDQUMsSUFBQUEsY0FBYyxHQUFHLEVBQWpCO0FBQ0FDLElBQUFBLGFBQWEsR0FBRyxFQUFoQjtBQUNBQyxJQUFBQSx1QkFBdUIsR0FBRyxDQUExQjtBQUNBQyxJQUFBQSxrQkFBa0IsR0FBRyxDQUFyQjtBQUNBQyxJQUFBQSxxQkFBcUIsR0FBRyxDQUF4QjtBQUNBQyxJQUFBQSxvQkFBb0IsR0FBRyxDQUF2QjtBQUVBL0IsSUFBQUEsV0FBVyxHQUFHLEVBQWQ7QUFDQUMsSUFBQUEsV0FBVyxHQUFHLEVBQWQ7QUFDQUMsSUFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxDQUFyQjtBQUNBQyxJQUFBQSxpQkFBaUIsR0FBRyxDQUFDLENBQXJCO0FBQ0FhLElBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0FaLElBQUFBLGtCQUFrQixHQUFHLENBQXJCO0FBQ0FDLElBQUFBLG9CQUFvQixHQUFHLEVBQXZCO0FBQ0FDLElBQUFBLHVCQUF1QixHQUFHLENBQTFCO0FBQ0FDLElBQUFBLGlCQUFpQixHQUFHLENBQUMsQ0FBckI7QUFDQUMsSUFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxDQUFyQjtBQUNBOEcsSUFBQUEsZ0JBQWdCLEdBQUcsS0FBbkI7QUFDQTdHLElBQUFBLGlCQUFpQixHQUFHLENBQUMsQ0FBckI7QUFDQVMsSUFBQUEsYUFBYSxHQUFHLEtBQWhCO0FBQ0FSLElBQUFBLFlBQVksR0FBRyxLQUFmO0FBQ0FDLElBQUFBLFdBQVcsR0FBRyxLQUFkO0FBQ0FRLElBQUFBLGFBQWEsR0FBRyxDQUFoQjtBQUNBeUYsSUFBQUEsV0FBVyxHQUFHLENBQWQ7QUFDQUMsSUFBQUEsUUFBUSxHQUFHLENBQVg7QUFDQUMsSUFBQUEsUUFBUSxHQUFHLENBQVg7QUFDQUMsSUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQUMsSUFBQUEsd0JBQXdCLEdBQUcsSUFBM0I7QUFDQUMsSUFBQUEsY0FBYyxHQUFHLEVBQWpCO0FBQ0FDLElBQUFBLHFCQUFxQixHQUFHLEVBQXhCO0FBQ0FqRyxJQUFBQSxrQkFBa0IsR0FBRyxJQUFyQjtBQUNBa0csSUFBQUEsWUFBWSxHQUFHLEtBQWY7QUFDQUMsSUFBQUEsWUFBWSxHQUFHLEtBQWY7QUFDQXZHLElBQUFBLG1CQUFtQixHQUFHLENBQXRCO0FBQ0FDLElBQUFBLG1CQUFtQixHQUFHLENBQXRCLENBMUNrQixDQTRDbEI7O0FBQ0F1RyxJQUFBQSxrQkFBa0IsR0FBRyxLQUFyQjtBQUNBRSxJQUFBQSxhQUFhLEdBQUcsS0FBaEI7QUFDQUMsSUFBQUEsZUFBZSxHQUFHLEtBQWxCLENBL0NrQixDQStDTzs7QUFDekJDLElBQUFBLGlCQUFpQixHQUFHLEtBQXBCLENBaERrQixDQWdEUzs7QUFDM0JDLElBQUFBLGlCQUFpQixHQUFHLEtBQXBCLENBakRrQixDQWlEUzs7QUFDM0JDLElBQUFBLGlCQUFpQixHQUFHLEtBQXBCO0FBQ0FDLElBQUFBLGNBQWMsR0FBRyxLQUFqQjtBQUVBQyxJQUFBQSxVQUFVLEdBQUcsQ0FBYjtBQUNBQyxJQUFBQSxVQUFVLEdBQUcsS0FBYjtBQUVBQyxJQUFBQSxvQkFBb0IsR0FBRyxJQUF2QjtBQUNBbkgsSUFBQUEsbUJBQW1CLEdBQUcsS0FBdEI7QUFDQUcsSUFBQUEsbUJBQW1CLEdBQUcsS0FBdEI7QUFDRCxHQTdId0I7QUErSHpCaUksRUFBQUEsY0EvSHlCLDBCQStIVkMsSUEvSFUsRUErSEo7QUFDbkIsUUFBSWxKLE9BQUosRUFBYTtBQUNYQyxNQUFBQSxXQUFXLEdBQUdpSixJQUFkO0FBQ0Q7QUFDRixHQW5Jd0I7QUFxSXpCQyxFQUFBQSxjQXJJeUIsMEJBcUlWRCxJQXJJVSxFQXFJSjtBQUNuQixRQUFJbEosT0FBSixFQUFhO0FBQ1hFLE1BQUFBLFdBQVcsR0FBR2dKLElBQWQ7QUFDRDtBQUNGLEdBekl3QjtBQTJJekI7O0FBRUE7OztBQUdBRSxFQUFBQSxNQWhKeUIsb0JBZ0poQjtBQUNQLFNBQUtKLGlCQUFMO0FBQ0EsU0FBS0ssV0FBTDtBQUNBcEIsSUFBQUEsV0FBVyxDQUFDWSxRQUFaLEdBQXVCLElBQXZCO0FBQ0EsU0FBS1MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsS0FBckI7QUFDQXJDLElBQUFBLGNBQWMsR0FBRyxFQUFqQjtBQUNBLFNBQUtzQyxlQUFMO0FBQ0EsU0FBS2IsWUFBTCxHQUFvQjFCLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4REMsZUFBOUQsRUFBcEI7QUFDQSxTQUFLQyxnQkFBTDtBQUVBLFNBQUtDLGVBQUwsR0FBdUIsQ0FBdkI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixLQUFyQjtBQUNBbEMsSUFBQUEsaUJBQWlCLEdBQUcsS0FBcEI7QUFDRCxHQS9Kd0I7QUFpS3pCeUIsRUFBQUEsV0FqS3lCLHlCQWlLWDtBQUNaVSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBdkMsSUFBQUEsZUFBZSxHQUFHLEtBQWxCO0FBQ0FDLElBQUFBLGlCQUFpQixHQUFHLEtBQXBCO0FBQ0FDLElBQUFBLGlCQUFpQixHQUFHLEtBQXBCO0FBQ0FQLElBQUFBLFlBQVksR0FBRyxLQUFmO0FBQ0FDLElBQUFBLFlBQVksR0FBRyxLQUFmO0FBQ0F2RyxJQUFBQSxtQkFBbUIsR0FBRyxDQUF0QjtBQUNBQyxJQUFBQSxtQkFBbUIsR0FBRyxDQUF0QjtBQUNBdUcsSUFBQUEsa0JBQWtCLEdBQUcsS0FBckI7QUFDQUMsSUFBQUEsZ0JBQWdCLEdBQUcsS0FBbkI7QUFDRCxHQTVLd0I7O0FBOEt6Qjs7O0FBR0FpQyxFQUFBQSxlQWpMeUIsNkJBaUxQO0FBQ2hCLFFBQUksQ0FBQ3ZDLHdCQUFELElBQTZCQSx3QkFBd0IsSUFBSSxJQUE3RCxFQUFtRUEsd0JBQXdCLEdBQUdnRCxPQUFPLENBQUMsMEJBQUQsQ0FBbEM7QUFDcEUsR0FuTHdCOztBQXFMekI7OztBQUdBTixFQUFBQSxnQkF4THlCLDhCQXdMTjtBQUNqQixTQUFLTyxNQUFMLEdBQWMsS0FBSzNCLFVBQUwsQ0FBZ0I0QixZQUFoQixDQUE2QmpJLEVBQUUsQ0FBQ2dJLE1BQWhDLENBQWQ7QUFDQSxTQUFLRSxlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsU0FBS2pDLGNBQUwsR0FBc0IsRUFBdEI7QUFDQXRCLElBQUFBLFdBQVcsR0FBRyxDQUFkO0FBQ0FDLElBQUFBLFFBQVEsR0FBRyxDQUFYO0FBQ0FDLElBQUFBLFFBQVEsR0FBRyxDQUFYOztBQUVBLFFBQUksS0FBSzRCLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQTtBQUNBLFVBQUkxQix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERZLGFBQTlELE1BQWlGLElBQXJGLEVBQTJGO0FBQ3pGO0FBRUE7QUFDQSxZQUFJcEQsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0ZDLGlCQUF0RixDQUF3RyxjQUF4RyxLQUEySCxJQUEvSCxFQUFxSTtBQUNuSXZELFVBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERDLG9DQUExRCxDQUErRixJQUEvRjtBQUNBLGNBQUlDLE9BQU8sR0FBRzFELHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGQyxpQkFBdEYsQ0FBd0csZ0JBQXhHLENBQWQ7QUFDQSxlQUFLckMsY0FBTCxHQUFzQndDLE9BQXRCO0FBQ0ExRCxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERtQixVQUE5RCxHQUEyRSxLQUFLekMsY0FBTCxDQUFvQjBDLE1BQS9GO0FBQ0EsZUFBS0MsMkJBQUw7QUFDQSxlQUFLeEIsVUFBTCxHQUFrQnJDLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGQyxpQkFBdEYsQ0FBd0csWUFBeEcsQ0FBbEI7QUFDQSxlQUFLTyxZQUFMLENBQWtCLElBQWxCLEVBQXdCLEtBQUt6QixVQUE3QixFQVBtSSxDQVFuSTtBQUNBO0FBQ0QsU0FWRCxNQVVPO0FBQ0xyQyxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERtQixVQUE5RCxHQUEyRSxDQUEzRSxDQURLLENBRUw7O0FBQ0EzRCxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEQyxvQ0FBMUQsQ0FBK0YsSUFBL0Y7QUFDQXpELFVBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERPLDBCQUExRDtBQUNEO0FBQ0YsT0FwQkQsTUFvQk87QUFDTC9ELFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERRLDhCQUExRCxDQUF5RixJQUF6RixFQUErRixLQUEvRixFQUFzRyxLQUFLdEMsWUFBM0c7QUFDRDtBQUNGLEtBMUJELE1BMEJPLElBQUksS0FBS0EsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQztBQUNBMUIsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRFEsOEJBQTFELENBQXlGLElBQXpGLEVBQStGLEtBQS9GLEVBQXNHLEtBQUt0QyxZQUEzRztBQUNEO0FBQ0YsR0E5TndCO0FBZ096QjtBQUNBdUMsRUFBQUEsYUFqT3lCLDJCQWlPVDtBQUNkLFdBQU8sS0FBSzVCLFVBQVo7QUFDRCxHQW5Pd0I7O0FBcU96Qjs7O0FBR0E2QixFQUFBQSxVQXhPeUIsd0JBd09aO0FBQ1gsUUFBSUMsT0FBTyxHQUFHLENBQWQ7QUFDQSxRQUFJQyxNQUFNLEdBQUdwRSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBMUc7QUFDQSxRQUFJQyxVQUFVLEdBQUcsS0FBS3RELGNBQXRCOztBQUVBLFNBQUssSUFBSXVELEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHRCxVQUFVLENBQUNaLE1BQXZDLEVBQStDYSxLQUFLLEVBQXBELEVBQXdEO0FBQ3RELFVBQUlMLE1BQU0sQ0FBQ3ZHLFNBQVAsSUFBb0IyRyxVQUFVLENBQUNDLEtBQUQsQ0FBVixDQUFrQjVHLFNBQTFDLEVBQXFEO0FBQ25Ec0csUUFBQUEsT0FBTyxHQUFHTSxLQUFWO0FBQ0E7QUFDRDtBQUNGOztBQUVELFdBQU9OLE9BQVA7QUFDRCxHQXJQd0I7QUFzUHpCO0FBRUE7QUFFQU4sRUFBQUEsMkJBMVB5Qix5Q0EwUEs7QUFDNUIsUUFBSUgsT0FBTyxHQUFHMUQsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0ZDLGlCQUF0RixDQUF3RyxnQkFBeEcsQ0FBZDtBQUNBLFNBQUtyQyxjQUFMLEdBQXNCd0MsT0FBdEI7QUFDQSxTQUFLZ0Isd0JBQUwsQ0FBOEIsQ0FBOUI7QUFDQTFFLElBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RG1CLFVBQTlELEdBQTJFLEtBQUt6QyxjQUFMLENBQW9CMEMsTUFBL0Y7QUFDQSxTQUFLZSxrQkFBTDtBQUNBLFNBQUtDLGlCQUFMO0FBQ0E1RSxJQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEcUIsK0JBQTFEO0FBRUEvQixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwrQkFBWjs7QUFDQSxTQUFLLElBQUkwQixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLdkQsY0FBTCxDQUFvQjBDLE1BQWhELEVBQXdEYSxLQUFLLEVBQTdELEVBQWlFO0FBQy9ELFVBQUksS0FBS3ZELGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQjFGLGlCQUEzQixHQUErQyxDQUEvQyxJQUFvRCxLQUFLbUMsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCekYsc0JBQTNCLElBQXFELElBQXpHLElBQWlILENBQUMsS0FBS2tDLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQnhGLGNBQWpKLEVBQWlLO0FBQy9KLFlBQUk2RixNQUFNLEdBQUc3SixFQUFFLENBQUM4SixJQUFILENBQVEvRSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRCxLQUFLL0QsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCMUYsaUJBQXJGLEVBQXdHbUcsaUJBQXhHLENBQTBIQyxRQUExSCxDQUFtSUMsQ0FBM0ksRUFBOElwRix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRCxLQUFLL0QsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCMUYsaUJBQXJGLEVBQXdHbUcsaUJBQXhHLENBQTBIQyxRQUExSCxDQUFtSUUsQ0FBalIsQ0FBYjs7QUFDQSxhQUFLN0QsY0FBTCxDQUFvQmlELEtBQXBCLEVBQTJCYSxXQUEzQixDQUF1Q1IsTUFBTSxDQUFDTSxDQUE5QyxFQUFpRE4sTUFBTSxDQUFDTyxDQUF4RDtBQUNBdkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUNELE9BSkQsTUFJTztBQUNMRCxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBcUIsS0FBSzdCLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQjFGLGlCQUE1RDtBQUNBK0QsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQStCLEtBQUs3QixjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ6RixzQkFBdEU7QUFDQThELFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFxQixLQUFLN0IsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCeEYsY0FBNUQ7QUFDRDs7QUFFRCxVQUFJLEtBQUtpQyxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ4RixjQUEvQixFQUErQztBQUM3QyxZQUFJc0csVUFBVSxHQUFHdkYsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyQixNQUExRCxHQUFtRSxDQUFwRjs7QUFDQSxZQUFJa0IsTUFBTSxHQUFHN0osRUFBRSxDQUFDOEosSUFBSCxDQUFRL0Usd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERNLFVBQTFELEVBQXNFTCxpQkFBdEUsQ0FBd0ZDLFFBQXhGLENBQWlHQyxDQUF6RyxFQUE0R3BGLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NvRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBETSxVQUExRCxFQUFzRUwsaUJBQXRFLENBQXdGQyxRQUF4RixDQUFpR0UsQ0FBN00sQ0FBYjs7QUFDQSxhQUFLN0QsY0FBTCxDQUFvQmlELEtBQXBCLEVBQTJCYSxXQUEzQixDQUF1Q1IsTUFBTSxDQUFDTSxDQUE5QyxFQUFpRE4sTUFBTSxDQUFDTyxDQUF4RDtBQUNBdkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUNEO0FBQ0YsS0EzQjJCLENBNkI1Qjs7O0FBRUEsU0FBSyxJQUFJMEIsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUd6RSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERtQixVQUExRixFQUFzR2MsT0FBSyxFQUEzRyxFQUErRztBQUM3RyxXQUFLakQsY0FBTCxDQUFvQmlELE9BQXBCLEVBQTJCZSxNQUEzQixHQUFvQyxJQUFwQztBQUNEO0FBQ0YsR0E1UndCO0FBOFJ6QkMsRUFBQUEsd0NBOVJ5QixzREE4UmtCO0FBQ3pDLFFBQUlDLHFCQUFxQixHQUFHMUYsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXNDLGdCQUE3RSxFQUE1Qjs7QUFDQSxRQUFJMUYsY0FBYyxDQUFDMkQsTUFBZixJQUF5QjhCLHFCQUE3QixFQUFvRDtBQUNsRHpGLE1BQUFBLGNBQWMsR0FBRyxFQUFqQjtBQUNBLFdBQUtxQyxhQUFMLEdBQXFCLElBQXJCO0FBQ0FRLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVCQUFaOztBQUNBLFVBQUksS0FBSzdCLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDeEUsU0FBckMsSUFBa0RtQyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGVyxJQUE3RixDQUFrR1csTUFBeEosRUFBZ0s7QUFDOUosYUFBSzFFLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDdEQsaUJBQXJDLEdBQXlEYSxXQUF6RDtBQUNBSSxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RXdCLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUgsS0FBSzNFLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLENBQW5IO0FBQ0EsYUFBS3lELFVBQUw7QUFDQWhELFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZL0Msd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsRUFBWjtBQUNBdkIsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQStCLEtBQUs3QixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3pFLFVBQWhGO0FBQ0Q7QUFDRjtBQUNGLEdBNVN3QjtBQThTekI7QUFFQTs7QUFFQTs7O0FBR0FtSSxFQUFBQSxpQkFyVHlCLDZCQXFUUEMsS0FyVE8sRUFxVEE7QUFDdkJoRyxJQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE2RUYsS0FBN0U7QUFDRCxHQXZUd0I7QUF5VHpCRyxFQUFBQSxtQkF6VHlCLGlDQXlUSDtBQUNwQkMsSUFBQUEsWUFBWSxDQUFDckYsb0JBQUQsQ0FBWjtBQUNELEdBM1R3QjtBQTZUekJzRixFQUFBQSxtQkE3VHlCLGlDQTZUSDtBQUFBOztBQUNwQixRQUFJLEtBQUszRSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0FvQixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBMEJwQyxpQkFBdEM7O0FBQ0EsVUFBSUEsaUJBQWlCLElBQUksSUFBekIsRUFBK0I7QUFDN0J5RixRQUFBQSxZQUFZLENBQUNyRixvQkFBRCxDQUFaLENBRDZCLENBRTdCOztBQUNBSixRQUFBQSxpQkFBaUIsR0FBRyxLQUFwQjs7QUFDQSxZQUFJLENBQUMsS0FBS2tDLGFBQVYsRUFBeUI7QUFDdkIsZUFBS0EsYUFBTCxHQUFxQixJQUFyQjtBQUNBN0MsVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMEQsS0FBS3JDLFdBQS9ELEVBQTRFc0MsaUJBQTVFLENBQThGaEMsWUFBOUYsQ0FBMkcsY0FBM0csRUFBMkhvRCxlQUEzSCxDQUEySSxLQUEzSSxFQUFrSixLQUFLM0QsZUFBdko7QUFDRDtBQUNGLE9BUkQsTUFRTztBQUNMNUIsUUFBQUEsb0JBQW9CLEdBQUd3RixVQUFVLENBQUMsWUFBTTtBQUN0QztBQUNBLFVBQUEsS0FBSSxDQUFDRixtQkFBTDtBQUNELFNBSGdDLEVBRzlCLElBSDhCLENBQWpDO0FBSUQ7QUFDRjtBQUNGLEdBaFZ3QjtBQWtWekJHLEVBQUFBLGdCQWxWeUIsOEJBa1ZOO0FBQ2pCLFNBQUszRCxhQUFMLEdBQXFCLEtBQXJCO0FBQ0QsR0FwVndCO0FBc1Z6QjRELEVBQUFBLG1CQXRWeUIsK0JBc1ZMVCxLQXRWSyxFQXNWRTtBQUN6QixTQUFLekQsZUFBTDtBQUNBTyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBWjtBQUNBRCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWWlELEtBQVo7QUFFQSxRQUFJVSxVQUFVLEdBQUdWLEtBQUssQ0FBQ1csVUFBdkI7QUFDQSxRQUFJQyxPQUFPLEdBQUdaLEtBQUssQ0FBQ1ksT0FBcEI7QUFFQSxTQUFLakUsZUFBTCxHQUF1QitELFVBQXZCO0FBQ0EsU0FBSzlELFdBQUwsR0FBbUJnRSxPQUFuQjs7QUFFQSxRQUFJLEtBQUtsRixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFVBQUksS0FBS1IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN4RSxTQUFyQyxJQUFrRG1DLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZXLElBQTdGLENBQWtHVyxNQUF4SixFQUNFNUYsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMEQyQixPQUExRCxFQUFtRTFCLGlCQUFuRSxDQUFxRmhDLFlBQXJGLENBQWtHLGNBQWxHLEVBQWtIb0QsZUFBbEgsQ0FBa0ksSUFBbEksRUFBd0lJLFVBQXhJLEVBREYsS0FFSy9GLGlCQUFpQixHQUFHLElBQXBCO0FBQ04sS0FKRCxNQUlPLElBQUksS0FBS2UsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQyxVQUFJLEtBQUtSLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDdEUsS0FBckMsSUFBOEMsS0FBbEQsRUFBeURpQyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRDJCLE9BQTFELEVBQW1FMUIsaUJBQW5FLENBQXFGaEMsWUFBckYsQ0FBa0csY0FBbEcsRUFBa0hvRCxlQUFsSCxDQUFrSSxJQUFsSSxFQUF3SUksVUFBeEksRUFBekQsS0FDSzFHLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NvRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEMkIsT0FBMUQsRUFBbUUxQixpQkFBbkUsQ0FBcUZoQyxZQUFyRixDQUFrRyxjQUFsRyxFQUFrSG9ELGVBQWxILENBQWtJLEtBQWxJLEVBQXlJSSxVQUF6SSxFQUFxSixJQUFySjtBQUNOLEtBbEJ3QixDQW9CekI7O0FBQ0QsR0EzV3dCOztBQTZXekI7OztBQUdBRyxFQUFBQSxzQkFoWHlCLG9DQWdYQTtBQUN2QixRQUFJLEtBQUtuRixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFVBQUkxQix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGd0MsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILEtBQTlILEVBQXFJO0FBQ25JL0csUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3FFLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNkVsRyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGVyxJQUE3RixDQUFrR1csTUFBL0s7QUFDRDtBQUNGLEtBSkQsTUFJTyxJQUFJLEtBQUtsRSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDb0IsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksMEJBQVo7QUFDQS9DLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NxRSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTZFLEtBQUtoRixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQWxIO0FBQ0Q7QUFDRixHQXpYd0I7QUEyWHpCbUosRUFBQUEsV0EzWHlCLHlCQTJYWDtBQUNaLFFBQUksS0FBSzlGLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDeEUsU0FBckMsSUFBa0RtQyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGVyxJQUE3RixDQUFrR1csTUFBeEosRUFBZ0s7QUFDOUo1RixNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RXdCLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUgsS0FBSzNFLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLENBQW5IO0FBQ0FyQyxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRnVDLGlCQUF0RixDQUF3RyxnQkFBeEcsRUFBMEgsS0FBSzNFLGNBQS9ILEVBQStJLElBQS9JO0FBQ0Q7QUFDRixHQWhZd0I7QUFrWXpCK0YsRUFBQUEsb0JBbFl5QixnQ0FrWUpDLElBbFlJLEVBa1lFO0FBQ3pCLFFBQUksS0FBS3hGLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBSXlGLElBQUksR0FBRyxDQUFDLENBQVo7O0FBRUEsV0FBSyxJQUFJMUMsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd4RSxjQUFjLENBQUMyRCxNQUEzQyxFQUFtRGEsS0FBSyxFQUF4RCxFQUE0RDtBQUMxRCxZQUFJeEUsY0FBYyxDQUFDd0UsS0FBRCxDQUFkLElBQXlCeUMsSUFBN0IsRUFBbUNDLElBQUksR0FBRzFDLEtBQVA7QUFDcEM7O0FBRUQsVUFBSTBDLElBQUksSUFBSSxDQUFDLENBQWIsRUFBZ0I7QUFDZHJFLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdDQUFaO0FBQ0E5QyxRQUFBQSxjQUFjLENBQUNtSCxNQUFmLENBQXNCRCxJQUF0QixFQUE0QixDQUE1QjtBQUNEO0FBQ0Y7QUFDRixHQS9Zd0I7QUFpWnpCRSxFQUFBQSxpQkFqWnlCLCtCQWlaTDtBQUNsQixRQUFJM0IscUJBQXFCLEdBQUcsQ0FBNUI7O0FBRUEsU0FBSyxJQUFJNEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLcEcsY0FBTCxDQUFvQjBDLE1BQXhDLEVBQWdEMEQsQ0FBQyxFQUFqRCxFQUFxRDtBQUNuRCxVQUFJLEtBQUtwRyxjQUFMLENBQW9Cb0csQ0FBcEIsRUFBdUI3SCxRQUEzQixFQUFxQ2lHLHFCQUFxQjtBQUMzRDs7QUFFRDVDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFpQjlDLGNBQWMsQ0FBQzJELE1BQTVDO0FBQ0FkLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDhCQUE4QjJDLHFCQUExQztBQUNBNUMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk5QyxjQUFaOztBQUVBLFFBQUlBLGNBQWMsQ0FBQzJELE1BQWYsSUFBeUI4QixxQkFBN0IsRUFBb0Q7QUFDbER6RixNQUFBQSxjQUFjLEdBQUcsRUFBakI7QUFDQSxXQUFLcUMsYUFBTCxHQUFxQixJQUFyQjs7QUFFQSxVQUFJLEtBQUtwQixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLGFBQUsxRSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3RELGlCQUFyQyxHQUF5RGEsV0FBekQsQ0FEOEosQ0FFOUo7O0FBQ0EsYUFBS2tHLFVBQUw7QUFDQWhELFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZL0Msd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsRUFBWjtBQUNBdkIsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQStCLEtBQUs3QixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3pFLFVBQWhGO0FBQ0Q7QUFDRjtBQUNGLEdBeGF3Qjs7QUEwYXpCOzs7QUFHQTJKLEVBQUFBLHdCQTdheUIsb0NBNmFBTCxJQTdhQSxFQTZhTTtBQUM3QixRQUFJLEtBQUt4RixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0EsVUFBSTFCLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZ3QyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsS0FBOUgsRUFBcUk7QUFDbkksWUFBSTlHLGNBQWMsQ0FBQzJELE1BQWYsSUFBeUIsQ0FBN0IsRUFBZ0MzRCxjQUFjLENBQUN1SCxJQUFmLENBQW9CTixJQUFwQjtBQUVoQyxZQUFJTyxXQUFXLEdBQUd4SCxjQUFjLENBQUMyRCxNQUFqQztBQUNBLFlBQUk4RCxPQUFPLEdBQUcsS0FBZDs7QUFDQSxhQUFLLElBQUlqRCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR2dELFdBQTVCLEVBQXlDaEQsS0FBSyxFQUE5QyxFQUFrRDtBQUNoRCxjQUFJeEUsY0FBYyxDQUFDd0UsS0FBRCxDQUFkLElBQXlCeUMsSUFBN0IsRUFBbUNRLE9BQU8sR0FBRyxJQUFWO0FBQ3BDOztBQUVELFlBQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQ1p6SCxVQUFBQSxjQUFjLENBQUN1SCxJQUFmLENBQW9CTixJQUFwQjtBQUNEOztBQUVELGFBQUtHLGlCQUFMO0FBQ0Q7QUFDRixLQWpCRCxNQWlCTyxJQUFJLEtBQUszRixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDLFdBQUtZLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxXQUFLcEIsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN0RCxpQkFBckMsR0FBeURhLFdBQXpEO0FBQ0EsV0FBS2tHLFVBQUw7QUFDRDtBQUNGLEdBcGN3Qjs7QUFzY3pCOzs7QUFHQUEsRUFBQUEsVUF6Y3lCLHdCQXljWjtBQUNYLFFBQUksS0FBS3BFLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsV0FBS3NGLFdBQUw7QUFDRDs7QUFFRCxRQUFJLEtBQUszRSxVQUFMLEdBQWtCLEtBQUtuQixjQUFMLENBQW9CMEMsTUFBcEIsR0FBNkIsQ0FBbkQsRUFBc0QsS0FBS3ZCLFVBQUwsR0FBa0IsS0FBS0EsVUFBTCxHQUFrQixDQUFwQyxDQUF0RCxLQUNLLEtBQUtBLFVBQUwsR0FBa0IsQ0FBbEI7QUFFTHJDLElBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NxRSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTZFLEtBQUs3RCxVQUFsRjtBQUNELEdBbGR3QjtBQW9kekJzRixFQUFBQSxlQXBkeUIsNkJBb2RQLENBQ2hCO0FBQ0E7QUFDRCxHQXZkd0I7QUF5ZHpCQyxFQUFBQSxvQkF6ZHlCLGtDQXlkRjtBQUFBOztBQUNyQixRQUFJN0gsVUFBSixFQUFnQjtBQUNkcUcsTUFBQUEsWUFBWSxDQUFDbk0sa0JBQUQsQ0FBWjtBQUNBQSxNQUFBQSxrQkFBa0IsR0FBR3NNLFVBQVUsQ0FBQyxZQUFNO0FBQ3BDLFFBQUEsTUFBSSxDQUFDcUIsb0JBQUw7QUFDRCxPQUY4QixFQUU1QixJQUY0QixDQUEvQjtBQUdELEtBTEQsTUFLTztBQUNMeEIsTUFBQUEsWUFBWSxDQUFDbk0sa0JBQUQsQ0FBWjtBQUNBLFdBQUs2TCxVQUFMO0FBQ0Q7QUFDRixHQW5ld0I7QUFxZXpCK0IsRUFBQUEsZ0JBcmV5Qiw4QkFxZU47QUFDakIsU0FBSyxJQUFJcEQsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBS2xELFdBQUwsQ0FBaUJxQyxNQUE3QyxFQUFxRGEsS0FBSyxFQUExRCxFQUE4RDtBQUM1RCxXQUFLbEQsV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZENEUsd0JBQTdEO0FBQ0Q7QUFDRixHQXpld0I7O0FBMmV6Qjs7O0FBR0FDLEVBQUFBLFdBOWV5Qix1QkE4ZWJDLEtBOWVhLEVBOGVOO0FBQUE7O0FBQ2pCLFFBQUksS0FBS3RHLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBSXVHLFNBQVMsR0FBR2pJLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDBGLDhCQUE5RCxFQUFoQjs7QUFDQSxVQUFJLENBQUMsS0FBS2hILGNBQUwsQ0FBb0I4RyxLQUFwQixFQUEyQnZJLFFBQWhDLEVBQTBDO0FBQ3hDLFlBQUl3SSxTQUFKLEVBQWU7QUFDYixlQUFLbkMsVUFBTDtBQUNBO0FBQ0QsU0FIRCxNQUdPO0FBQ0w7QUFDRDtBQUNGO0FBQ0YsS0FYZ0IsQ0FhakI7OztBQUNBLFNBQUsrQixnQkFBTDtBQUNBL0UsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBV2lGLEtBQXZCO0FBQ0EsUUFBSUcsY0FBYyxHQUFHLEtBQXJCO0FBQ0E1SCxJQUFBQSxhQUFhLEdBQUcsS0FBaEI7O0FBQ0EsUUFBSVIsVUFBSixFQUFnQjtBQUNkO0FBQ0EsVUFBSUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RndDLGNBQTdGLENBQTRHQyxVQUE1RyxJQUEwSCxJQUE5SCxFQUFvSTtBQUNsSWhILFFBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0Q7O0FBRUR3RyxNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFlBQUksQ0FBQ3pGLFVBQUwsRUFBaUI7QUFDZixVQUFBLE1BQUksQ0FBQ2lILFdBQUwsQ0FBaUJDLEtBQWpCO0FBQ0Q7QUFDRixPQUpTLEVBSVAsR0FKTyxDQUFWO0FBS0QsS0FYRCxNQVdPO0FBQ0wsV0FBSzNGLFVBQUwsR0FBa0IyRixLQUFsQjs7QUFDQSxVQUFJLEtBQUt0RyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFlBQUksS0FBS1IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN4RSxTQUFyQyxJQUFrRG1DLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZXLElBQTdGLENBQWtHVyxNQUF4SixFQUFnSztBQUM5SnVDLFVBQUFBLGNBQWMsR0FBRyxJQUFqQjtBQUNBNUgsVUFBQUEsYUFBYSxHQUFHLEtBQUtXLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDcEUsaUJBQXJDLENBQXVEaEIsWUFBdkU7O0FBQ0EsY0FBSSxDQUFDLEtBQUtpRSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BELGNBQTFDLEVBQTBEO0FBQ3hELGlCQUFLbUosa0JBQUwsQ0FBd0IsSUFBeEI7O0FBQ0EsZ0JBQUksQ0FBQzdILGFBQUwsRUFBb0I7QUFDbEIsa0JBQUksS0FBS1csY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNwRSxpQkFBckMsQ0FBdURULGtCQUEzRCxFQUErRTtBQUM3RXdDLGdCQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBENkUsaUJBQTFEO0FBQ0EscUJBQUtuSCxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RFQsa0JBQXZELEdBQTRFLEtBQTVFO0FBQ0F3QyxnQkFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRDhFLHVCQUExRCxDQUFrRixnREFBbEY7QUFDQTtBQUNELGVBTEQsTUFLTztBQUNML0IsZ0JBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z2RyxrQkFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRCtFLDJCQUExRCxDQUFzRixJQUF0RjtBQUNBdkksa0JBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMEQ2RSxpQkFBMUQ7QUFDQXRJLGtCQUFBQSxVQUFVLEdBQUcsS0FBYjtBQUNELGlCQUpTLEVBSVAsSUFKTyxDQUFWO0FBS0Q7O0FBQ0QrQyxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBbUIsS0FBSzdCLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDekUsVUFBcEU7QUFDRDtBQUNGO0FBQ0YsU0FyQkQsTUFxQk87QUFDTCxlQUFLd0ssa0JBQUwsQ0FBd0IsS0FBeEI7QUFDRDtBQUNGLE9BekJELE1BeUJPLElBQUksS0FBSzFHLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakM7QUFDQTtBQUNBO0FBQ0EsWUFBSSxLQUFLUixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3RFLEtBQXJDLElBQThDLEtBQWxELEVBQXlEO0FBQ3ZEb0ssVUFBQUEsY0FBYyxHQUFHLElBQWpCO0FBQ0E1SCxVQUFBQSxhQUFhLEdBQUcsS0FBS1csY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNwRSxpQkFBckMsQ0FBdURoQixZQUF2RTs7QUFDQSxjQUFJLENBQUN2RCxZQUFMLEVBQW1CO0FBQ2pCLGlCQUFLME8sa0JBQUwsQ0FBd0IsSUFBeEI7O0FBQ0EsZ0JBQUksQ0FBQzdILGFBQUwsRUFBb0I7QUFDbEJnRyxjQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmeEcsZ0JBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0FDLGdCQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEK0UsMkJBQTFELENBQXNGLElBQXRGO0FBQ0F2SSxnQkFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRDZFLGlCQUExRDtBQUNELGVBSlMsRUFJUCxJQUpPLENBQVY7QUFLQXZGLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFtQixLQUFLN0IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN6RSxVQUFwRTtBQUNEO0FBQ0Y7QUFDRixTQWRELENBY0U7QUFkRixhQWVLO0FBQ0h1SyxZQUFBQSxjQUFjLEdBQUcsSUFBakI7QUFDQTVILFlBQUFBLGFBQWEsR0FBRyxLQUFLVyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RGhCLFlBQXZFOztBQUNBLGdCQUFJLENBQUN0RCxXQUFMLEVBQWtCO0FBQ2hCLG1CQUFLeU8sa0JBQUwsQ0FBd0IsS0FBeEI7O0FBQ0Esa0JBQUksQ0FBQzdILGFBQUwsRUFBb0I7QUFDbEJnRyxnQkFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZnhHLGtCQUFBQSxVQUFVLEdBQUcsS0FBYjs7QUFDQSxrQkFBQSxNQUFJLENBQUN5SSxRQUFMO0FBQ0QsaUJBSFMsRUFHUCxJQUhPLENBQVY7QUFJRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRCxXQUFLMUUsWUFBTCxDQUFrQixJQUFsQixFQUF3QixLQUFLekIsVUFBN0I7O0FBRUEsV0FBSyxJQUFJb0MsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBS2xELFdBQUwsQ0FBaUJxQyxNQUE3QyxFQUFxRGEsS0FBSyxFQUExRCxFQUE4RDtBQUM1RCxhQUFLbEQsV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEdUYsY0FBN0QsQ0FBNEVqRCxNQUE1RSxHQUFxRixLQUFyRjtBQUNBLGFBQUtqRSxXQUFMLENBQWlCa0QsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQ0RSx3QkFBN0Q7QUFDRDs7QUFFRCxVQUFJLEtBQUtwRyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0ExQixRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRnVDLGlCQUF0RixDQUF3RyxZQUF4RyxFQUFzSCxLQUFLeEQsVUFBM0gsRUFBdUksSUFBdkk7QUFDQVMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBYyxLQUFLN0IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN6RSxVQUEvRDtBQUNBa0YsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS3hCLFdBQUwsQ0FBaUIsS0FBS2MsVUFBdEIsRUFBa0NhLFlBQWxDLENBQStDLHNCQUEvQyxFQUF1RXdGLFVBQW5GO0FBQ0E1RixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWS9DLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEVBQVo7QUFDQXZCLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZL0Msd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXNGLGlCQUE3RSxFQUFaO0FBQ0EsYUFBS2pFLHdCQUFMLENBQThCLENBQTlCLEVBUDBCLENBUzFCOztBQUNBLFlBQUkxRSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGd0MsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILElBQTlILEVBQW9JLEtBQUtsRCwyQkFBTDtBQUNySSxPQS9FSSxDQWlGTDs7O0FBQ0EsVUFBSXNFLGNBQWMsSUFBSTVILGFBQXRCLEVBQXFDO0FBQ25DUixRQUFBQSxVQUFVLEdBQUcsS0FBYjtBQUNBQyxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb0YsU0FBMUQsQ0FBb0UsdUJBQXBFLEVBQTZGLElBQTdGO0FBQ0EsYUFBS0Msa0JBQUwsQ0FBd0IsS0FBeEI7QUFDQSxhQUFLL0MsVUFBTDtBQUNBLGFBQUtzQyxrQkFBTCxDQUF3QixLQUF4QjtBQUNBO0FBQ0Q7O0FBRUQsVUFBSUQsY0FBYyxJQUFJLEtBQUtqSCxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BELGNBQTNELEVBQTJFO0FBQ3pFc0gsUUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZnhHLFVBQUFBLFVBQVUsR0FBRyxLQUFiOztBQUNBLFVBQUEsTUFBSSxDQUFDK0YsVUFBTDs7QUFDQSxVQUFBLE1BQUksQ0FBQ3NDLGtCQUFMLENBQXdCLEtBQXhCOztBQUNBO0FBQ0QsU0FMUyxFQUtQLEdBTE8sQ0FBVjtBQU1EO0FBQ0Y7O0FBRUQsU0FBS1UsWUFBTDtBQUNELEdBam5Cd0I7QUFtbkJ6QnBFLEVBQUFBLHdCQW5uQnlCLG9DQW1uQkF5QyxJQW5uQkEsRUFtbkJNO0FBQzdCLFFBQUk0QixlQUFlLEdBQUcvSSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFc0YsaUJBQTdFLEVBQXRCO0FBQ0EsUUFBSUssTUFBTSxHQUFHaEosd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsRUFBYjtBQUNBLFFBQUk0RSxRQUFRLEdBQUc5QixJQUFmLENBSDZCLENBSTdCO0FBQ0E7O0FBRUEsU0FBSyxJQUFJMUMsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdzRSxlQUFlLENBQUNuRixNQUE1QyxFQUFvRGEsS0FBSyxFQUF6RCxFQUE2RDtBQUMzRCxVQUFJLEtBQUt2RCxjQUFMLENBQW9CK0gsUUFBcEIsRUFBOEJ4SixRQUE5QixJQUEwQyxLQUE5QyxFQUFxRDtBQUNuRCxZQUFJd0osUUFBUSxHQUFHLEtBQUsvSCxjQUFMLENBQW9CMEMsTUFBcEIsR0FBNkIsQ0FBNUMsRUFBK0M7QUFDN0NxRixVQUFBQSxRQUFRO0FBQ1IsZUFBS3ZFLHdCQUFMLENBQThCdUUsUUFBOUI7QUFDRCxTQUhELE1BR087QUFDTG5HLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDQUQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzdCLGNBQWpCO0FBQ0Q7QUFDRixPQVJELE1BUU87QUFDTCxZQUFJLEtBQUtBLGNBQUwsQ0FBb0IrSCxRQUFwQixFQUE4QnBMLFNBQTlCLElBQTJDa0wsZUFBZSxDQUFDdEUsS0FBRCxDQUFmLENBQXVCSCxnQkFBdkIsQ0FBd0NDLGlCQUF4QyxDQUEwRDFHLFNBQXpHLEVBQW9IO0FBQ2xILGVBQUtxRCxjQUFMLENBQW9CK0gsUUFBcEIsSUFBZ0NGLGVBQWUsQ0FBQ3RFLEtBQUQsQ0FBZixDQUF1QkgsZ0JBQXZCLENBQXdDQyxpQkFBeEU7O0FBRUEsY0FBSTBFLFFBQVEsR0FBRyxLQUFLL0gsY0FBTCxDQUFvQjBDLE1BQXBCLEdBQTZCLENBQTVDLEVBQStDO0FBQzdDcUYsWUFBQUEsUUFBUSxHQURxQyxDQUU3Qzs7QUFDQSxpQkFBS3ZFLHdCQUFMLENBQThCdUUsUUFBOUI7QUFDRCxXQUpELE1BSU87QUFDTG5HLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDQUQsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzdCLGNBQWpCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRixHQWxwQndCOztBQW9wQnpCOzs7Ozs7QUFNQWdJLEVBQUFBLFNBMXBCeUIsdUJBMHBCYjtBQUNWcEcsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzdCLGNBQWpCO0FBQ0EsU0FBS3lELGtCQUFMO0FBQ0EsU0FBS0MsaUJBQUw7QUFDQSxTQUFLdkMsVUFBTCxHQUFrQixDQUFsQixDQUpVLENBSVc7QUFFckI7O0FBQ0FyQyxJQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE2RSxLQUFLN0QsVUFBbEY7QUFDRCxHQWxxQndCO0FBb3FCekI4RyxFQUFBQSxtQkFwcUJ5QiwrQkFvcUJMbkQsS0FwcUJLLEVBb3FCRTtBQUN6QjtBQUNBLFFBQUlvRCxhQUFhLEdBQUdwRCxLQUFLLENBQUNmLElBQU4sQ0FBV29FLFVBQS9CO0FBQ0EsUUFBSXJCLEtBQUssR0FBR2hDLEtBQUssQ0FBQ2YsSUFBTixDQUFXcUUsSUFBdkI7QUFDQSxRQUFJQyxXQUFXLEdBQUd2RCxLQUFLLENBQUNmLElBQU4sQ0FBV3VFLGNBQTdCO0FBRUExRyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWWlELEtBQVosRUFOeUIsQ0FPekI7QUFDQTtBQUNBOztBQUVBLFNBQUs5RSxjQUFMLENBQW9COEcsS0FBcEIsSUFBNkJ1QixXQUE3QjtBQUVBLFNBQUs1RSxrQkFBTCxDQUF3QixJQUF4QjtBQUNBLFNBQUtDLGlCQUFMLENBQXVCLElBQXZCO0FBRUEsU0FBS2QsWUFBTCxDQUFrQixJQUFsQixFQUF3QixLQUFLekIsVUFBN0I7O0FBRUEsU0FBSyxJQUFJb0MsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBS2xELFdBQUwsQ0FBaUJxQyxNQUE3QyxFQUFxRGEsS0FBSyxFQUExRCxFQUE4RDtBQUM1RCxXQUFLbEQsV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEdUYsY0FBN0QsQ0FBNEVqRCxNQUE1RSxHQUFxRixLQUFyRjtBQUNBLFdBQUtqRSxXQUFMLENBQWlCa0QsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQ0RSx3QkFBN0Q7QUFDRDs7QUFFRCxRQUFJLEtBQUtwRyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0ExQixNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRnVDLGlCQUF0RixDQUF3RyxZQUF4RyxFQUFzSCxLQUFLeEQsVUFBM0gsRUFBdUksSUFBdkk7QUFDQSxXQUFLcUMsd0JBQUwsQ0FBOEIsQ0FBOUIsRUFIMEIsQ0FLMUI7O0FBQ0EsVUFBSTFFLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZ3QyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsSUFBOUgsRUFBb0ksS0FBS2xELDJCQUFMO0FBQ3JJO0FBQ0YsR0Fuc0J3QjtBQXFzQnpCNEYsRUFBQUEsc0JBcnNCeUIsb0NBcXNCQTtBQUN2QixTQUFLOUUsa0JBQUwsQ0FBd0IsSUFBeEI7QUFDQSxTQUFLQyxpQkFBTCxDQUF1QixJQUF2QjtBQUNBMkIsSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZnZHLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMEQrRSwyQkFBMUQsQ0FBc0YsSUFBdEY7QUFDQXZJLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMEQ2RSxpQkFBMUQ7QUFDRCxLQUhTLEVBR1AsSUFITyxDQUFWO0FBS0EsU0FBS3ZFLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsS0FBS3pCLFVBQTdCOztBQUVBLFNBQUssSUFBSW9DLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUtsRCxXQUFMLENBQWlCcUMsTUFBN0MsRUFBcURhLEtBQUssRUFBMUQsRUFBOEQ7QUFDNUQsV0FBS2xELFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHVGLGNBQTdELENBQTRFakQsTUFBNUUsR0FBcUYsS0FBckY7QUFDQSxXQUFLakUsV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZENEUsd0JBQTdEO0FBQ0Q7O0FBRUQsUUFBSSxLQUFLcEcsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBMUIsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0Z1QyxpQkFBdEYsQ0FBd0csWUFBeEcsRUFBc0gsS0FBS3hELFVBQTNILEVBQXVJLElBQXZJO0FBQ0EsV0FBS3FDLHdCQUFMLENBQThCLENBQTlCLEVBSDBCLENBSzFCOztBQUNBLFVBQUkxRSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGd0MsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILElBQTlILEVBQW9JLEtBQUtsRCwyQkFBTDtBQUNySTtBQUNGLEdBNXRCd0I7QUE2dEJ6QjtBQUVBOztBQUNBOzs7Ozs7QUFNQWMsRUFBQUEsa0JBdHVCeUIsOEJBc3VCTnlFLGFBdHVCTSxFQXN1QmlCO0FBQUEsUUFBdkJBLGFBQXVCO0FBQXZCQSxNQUFBQSxhQUF1QixHQUFQLEtBQU87QUFBQTs7QUFDeEMsUUFBSSxLQUFLMUgsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLFVBQUksQ0FBQzBILGFBQUwsRUFBb0I7QUFDbEIsWUFBSU0sWUFBWSxHQUFHLEtBQUtDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLEtBQUt4SSxXQUFMLENBQWlCeUMsTUFBbkMsQ0FBbkI7O0FBQ0EsYUFBSzFDLGNBQUwsQ0FBb0JzRyxJQUFwQixDQUF5QixLQUFLckcsV0FBTCxDQUFpQnVJLFlBQWpCLENBQXpCO0FBQ0ExSixRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERtQixVQUE5RCxHQUEyRSxDQUEzRTtBQUNEO0FBQ0Y7O0FBRUQsU0FBSyxJQUFJYyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3pFLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RG1CLFVBQTFGLEVBQXNHYyxLQUFLLEVBQTNHLEVBQStHO0FBQzdHLFdBQUtsRCxXQUFMLENBQWlCa0QsS0FBakIsRUFBd0JlLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0EsV0FBS2pFLFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHdGLFVBQTdELEdBQTBFLEtBQUt4SCxjQUFMLENBQW9CdUQsS0FBcEIsQ0FBMUU7QUFDQSxXQUFLbEQsV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEMEcsT0FBN0QsQ0FBcUUsS0FBSzFJLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQjdHLFVBQWhHO0FBQ0EsV0FBSzJELFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RDJHLFNBQTdELENBQXVFLEtBQUszSSxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkIzRyxRQUFsRztBQUNBLFdBQUt5RCxXQUFMLENBQWlCa0QsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQ0RSx3QkFBN0Q7QUFDRDtBQUNGLEdBdnZCd0I7QUF5dkJ6QmhFLEVBQUFBLFlBenZCeUIsd0JBeXZCWmdHLGdCQXp2QlksRUF5dkJNQyxNQXp2Qk4sRUF5dkJjO0FBQ3JDLFFBQUlELGdCQUFKLEVBQXNCO0FBQ3BCLFdBQUt2SSxXQUFMLENBQWlCd0ksTUFBakIsRUFBeUI3RyxZQUF6QixDQUFzQyxzQkFBdEMsRUFBOER3RixVQUE5RCxHQUEyRSxLQUFLeEgsY0FBTCxDQUFvQjZJLE1BQXBCLENBQTNFOztBQUVBLFdBQUssSUFBSXRGLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHekUsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEbUIsVUFBMUYsRUFBc0djLEtBQUssRUFBM0csRUFBK0c7QUFDN0csWUFBSXNGLE1BQU0sSUFBSXRGLEtBQWQsRUFBcUI7QUFDbkIsZUFBS2xELFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RDhHLG1CQUE3RCxDQUFpRixJQUFqRjtBQUNBLGVBQUt6SSxXQUFMLENBQWlCa0QsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQrRyxvQkFBN0QsQ0FBa0YsSUFBbEY7QUFDQSxlQUFLMUksV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZENEUsd0JBQTdEO0FBQ0QsU0FKRCxNQUlPO0FBQ0wsZUFBS3ZHLFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RDRFLHdCQUE3RDtBQUNBLGVBQUt2RyxXQUFMLENBQWlCa0QsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQ4RyxtQkFBN0QsQ0FBaUYsS0FBakY7QUFDQSxlQUFLekksV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEK0csb0JBQTdELENBQWtGLEtBQWxGO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsR0F6d0J3Qjs7QUEyd0J6Qjs7Ozs7O0FBTUFyRixFQUFBQSxpQkFqeEJ5Qiw2QkFpeEJQd0UsYUFqeEJPLEVBaXhCZ0I7QUFBQSxRQUF2QkEsYUFBdUI7QUFBdkJBLE1BQUFBLGFBQXVCLEdBQVAsS0FBTztBQUFBOztBQUN2QyxRQUFJLENBQUNBLGFBQUwsRUFBb0I7QUFDbEIsV0FBSyxJQUFJM0UsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBS3ZELGNBQUwsQ0FBb0IwQyxNQUFoRCxFQUF3RGEsS0FBSyxFQUE3RCxFQUFpRTtBQUMvRCxZQUFJLEtBQUt2RCxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ2RyxlQUEzQixJQUE4QyxDQUE5QyxJQUFtRCxDQUFDLEtBQUtnRCxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ6RixzQkFBbkYsRUFBMkcsS0FBS3dDLGNBQUwsQ0FBb0JpRCxLQUFwQixFQUEyQmEsV0FBM0IsQ0FBdUMsS0FBSzdELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCMEQsUUFBM0IsQ0FBb0NDLENBQTNFLEVBQThFLEtBQUszRCxrQkFBTCxDQUF3QixDQUF4QixFQUEyQjBELFFBQTNCLENBQW9DRSxDQUFsSCxFQUEzRyxLQUNLLElBQUksS0FBS25FLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQnRHLG9CQUEzQixJQUFtRCxDQUFuRCxJQUF3RCxDQUFDLEtBQUsrQyxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ6RixzQkFBeEYsRUFBZ0gsS0FBS3dDLGNBQUwsQ0FBb0JpRCxLQUFwQixFQUEyQmEsV0FBM0IsQ0FBdUMsS0FBSzdELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCMEQsUUFBM0IsQ0FBb0NDLENBQTNFLEVBQThFLEtBQUszRCxrQkFBTCxDQUF3QixDQUF4QixFQUEyQjBELFFBQTNCLENBQW9DRSxDQUFsSDtBQUN0SDtBQUNGLEtBTEQsTUFLTztBQUNMLFVBQUksS0FBS25FLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDbkUsZUFBckMsSUFBd0QsQ0FBNUQsRUFBK0QsS0FBS3NELGNBQUwsQ0FBb0IsS0FBS2EsVUFBekIsRUFBcUNpRCxXQUFyQyxDQUFpRCxLQUFLN0Qsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkIwRCxRQUEzQixDQUFvQ0MsQ0FBckYsRUFBd0YsS0FBSzNELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCMEQsUUFBM0IsQ0FBb0NFLENBQTVILEVBQS9ELEtBQ0ssSUFBSSxLQUFLbkUsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNsRSxvQkFBckMsSUFBNkQsQ0FBakUsRUFBb0UsS0FBS3FELGNBQUwsQ0FBb0IsS0FBS2EsVUFBekIsRUFBcUNpRCxXQUFyQyxDQUFpRCxLQUFLN0Qsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkIwRCxRQUEzQixDQUFvQ0MsQ0FBckYsRUFBd0YsS0FBSzNELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCMEQsUUFBM0IsQ0FBb0NFLENBQTVIO0FBQzFFOztBQUVELFNBQUssSUFBSVosT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUd6RSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERtQixVQUExRixFQUFzR2MsT0FBSyxFQUEzRyxFQUErRztBQUM3RyxXQUFLakQsY0FBTCxDQUFvQmlELE9BQXBCLEVBQTJCZSxNQUEzQixHQUFvQyxJQUFwQztBQUNEOztBQUVELFNBQUssSUFBSWYsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUcsS0FBS3ZELGNBQUwsQ0FBb0IwQyxNQUFoRCxFQUF3RGEsT0FBSyxFQUE3RCxFQUFpRTtBQUMvRCxXQUFLakQsY0FBTCxDQUFvQmlELE9BQXBCLEVBQTJCeUYsUUFBM0IsQ0FBb0MsQ0FBcEMsRUFBdUNoSCxZQUF2QyxDQUFvRGpJLEVBQUUsQ0FBQ2tQLE1BQXZELEVBQStEQyxXQUEvRCxHQUE2RXBLLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMEQ2RyxhQUExRCxDQUF3RSxLQUFLbkosY0FBTCxDQUFvQnVELE9BQXBCLEVBQTJCM0csUUFBbkcsQ0FBN0U7QUFDRDtBQUNGLEdBbnlCd0I7QUFxeUJ6QndNLEVBQUFBLHlCQXJ5QnlCLHVDQXF5Qkc7QUFDMUIsUUFBSUMsU0FBUyxHQUFHLEtBQUsvSSxjQUFMLENBQW9CLEtBQUthLFVBQXpCLEVBQXFDbUkscUJBQXJDLENBQTJEdlAsRUFBRSxDQUFDOEosSUFBSCxDQUFRLENBQVIsRUFBVyxHQUFYLENBQTNELENBQWhCO0FBQ0EsU0FBS3pELFVBQUwsQ0FBZ0I2RCxRQUFoQixHQUEyQixLQUFLN0QsVUFBTCxDQUFnQm1KLE1BQWhCLENBQXVCQyxvQkFBdkIsQ0FBNENILFNBQTVDLENBQTNCO0FBRUEsUUFBSUksS0FBSyxHQUFHSixTQUFTLENBQUNsRixDQUFWLEdBQWNwSyxFQUFFLENBQUMyUCxPQUFILENBQVdDLE1BQXJDO0FBQ0EsU0FBSzVILE1BQUwsQ0FBWTZILFNBQVosR0FBd0IsQ0FBeEI7QUFDRCxHQTN5QndCO0FBNnlCekJDLEVBQUFBLFVBN3lCeUIsd0JBNnlCWjtBQUNYLFFBQUksS0FBSzVILGVBQVQsRUFBMEIsS0FBS21ILHlCQUFMO0FBQzNCLEdBL3lCd0I7QUFpekJ6QlUsRUFBQUEsWUFqekJ5Qix3QkFpekJaQyxLQWp6QlksRUFpekJMO0FBQ2xCLFFBQUlDLE1BQU0sR0FBR0QsS0FBSyxDQUFDRSxLQUFuQjtBQUNBLFFBQUlDLE1BQU0sR0FBR0gsS0FBSyxDQUFDSSxLQUFuQjs7QUFDQSxRQUFJQyxPQUFPLEdBQUdKLE1BQU0sR0FBR0UsTUFBdkI7O0FBRUFyTCxJQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBLFNBQUs4QyxhQUFMLEdBQXFCLEtBQXJCOztBQUVBLFFBQUksS0FBS25CLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQSxXQUFLLElBQUkrQyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3pFLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVzRixpQkFBN0UsR0FBaUcvRSxNQUE3SCxFQUFxSWEsS0FBSyxFQUExSSxFQUE4STtBQUM1SSxZQUFJekUsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXNGLGlCQUE3RSxHQUFpR2xFLEtBQWpHLEVBQXdHSCxnQkFBeEcsQ0FBeUhXLElBQXpILENBQThIVyxNQUE5SCxJQUF3SSxLQUFLMUUsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN4RSxTQUFqTCxFQUE0TDtBQUMxTGlGLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFvQixLQUFLN0IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN6RSxVQUFyRTtBQUNBLGVBQUtzRCxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3RELGlCQUFyQyxHQUF5RGlCLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVzRixpQkFBN0UsR0FBaUdsRSxLQUFqRyxFQUF3R0gsZ0JBQXhHLENBQXlIQyxpQkFBekgsQ0FBMkl4RixpQkFBcE07QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsUUFBSSxLQUFLbUMsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN0RCxpQkFBckMsSUFBMEQsQ0FBMUQsSUFBK0QsQ0FBQyxLQUFLbUMsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNyRCxzQkFBekcsRUFBaUk7QUFDL0gsVUFBSSxLQUFLa0MsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNyRSxZQUFyQyxDQUFrRCxDQUFsRCxFQUFxRHJDLFlBQXJELElBQXFFLENBQXpFLEVBQTRFO0FBQzFFaUUsUUFBQUEsV0FBVyxHQUFHLENBQWQ7QUFDQSxhQUFLc0IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNyRCxzQkFBckMsR0FBOEQsSUFBOUQ7QUFDQThELFFBQUFBLE9BQU8sQ0FBQ3lJLEtBQVIsQ0FBYzNMLFdBQWQ7QUFDRCxPQUpELE1BSU87QUFDTCxhQUFLc0IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNyRCxzQkFBckMsR0FBOEQsSUFBOUQ7QUFDQVksUUFBQUEsV0FBVyxHQUFHLEVBQWQ7QUFDQWtELFFBQUFBLE9BQU8sQ0FBQ3lJLEtBQVIsQ0FBYzNMLFdBQWQ7QUFDRDtBQUNGLEtBVkQsTUFVTztBQUNMLFVBQUksS0FBS3NCLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDdEQsaUJBQXJDLElBQTBELEVBQTlELEVBQWtFLEtBQUttQyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3RELGlCQUFyQyxHQUF5RCxLQUFLbUMsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN0RCxpQkFBckMsR0FBeUQsRUFBbEgsQ0FBbEUsS0FDSyxLQUFLbUMsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN0RCxpQkFBckMsR0FBeUQsS0FBS21DLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDdEQsaUJBQXJDLEdBQXlELENBQWxIO0FBRUxhLE1BQUFBLFdBQVcsR0FBRyxLQUFLc0IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN0RCxpQkFBbkQ7QUFDQStELE1BQUFBLE9BQU8sQ0FBQ3lJLEtBQVIsQ0FBYzNMLFdBQVcsR0FBRyxDQUE1QjtBQUNEOztBQUVERSxJQUFBQSxRQUFRLEdBQUd3TCxPQUFYO0FBQ0F6TCxJQUFBQSxRQUFRLEdBQUcsQ0FBWDtBQUNBRyxJQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEZ0ksMkJBQTFELENBQXNGMUwsUUFBdEY7O0FBRUEsU0FBSyxJQUFJMkUsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUcsS0FBS2xELFdBQUwsQ0FBaUJxQyxNQUE3QyxFQUFxRGEsT0FBSyxFQUExRCxFQUE4RDtBQUM1RCxVQUFJLEtBQUtwQyxVQUFMLElBQW1Cb0MsT0FBdkIsRUFBOEI7QUFDNUIsYUFBS2xELFdBQUwsQ0FBaUJrRCxPQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHVGLGNBQTdELENBQTRFakQsTUFBNUUsR0FBcUYsSUFBckY7O0FBQ0EsYUFBS2pFLFdBQUwsQ0FBaUJrRCxPQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHVGLGNBQTdELENBQTRFdkYsWUFBNUUsQ0FBeUYsZ0JBQXpGLEVBQTJHdUksV0FBM0csQ0FBdUhQLE1BQXZILEVBQStIRSxNQUEvSDs7QUFDQSxhQUFLN0osV0FBTCxDQUFpQmtELE9BQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZENEUsd0JBQTdEO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsYUFBS3ZHLFdBQUwsQ0FBaUJrRCxPQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHVGLGNBQTdELENBQTRFakQsTUFBNUUsR0FBcUYsS0FBckY7O0FBQ0EsYUFBS2pFLFdBQUwsQ0FBaUJrRCxPQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RDRFLHdCQUE3RDtBQUNEO0FBQ0Y7O0FBRUQsU0FBS2dCLFlBQUwsR0FuRGtCLENBb0RsQjtBQUNBO0FBQ0E7QUFDRCxHQXgyQndCO0FBMDJCekJBLEVBQUFBLFlBMTJCeUIsMEJBMDJCVjtBQUNiLFFBQUksS0FBS3BILFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsV0FBS2dELHdCQUFMLENBQThCLENBQTlCO0FBQ0Q7O0FBRUQsU0FBSyxJQUFJRCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLbEQsV0FBTCxDQUFpQnFDLE1BQTdDLEVBQXFEYSxLQUFLLEVBQTFELEVBQThEO0FBQzVELFdBQUtsRCxXQUFMLENBQWlCa0QsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQ0RSx3QkFBN0Q7QUFDRDtBQUNGLEdBbDNCd0I7QUFtM0J6QjRELEVBQUFBLGdCQW4zQnlCLDhCQW0zQk47QUFDakIsUUFBSW5CLFNBQVMsR0FBRyxLQUFLL0ksY0FBTCxDQUFvQixLQUFLYSxVQUF6QixFQUFxQ21JLHFCQUFyQyxDQUEyRHZQLEVBQUUsQ0FBQzhKLElBQUgsQ0FBUSxDQUFSLEVBQVcsR0FBWCxDQUEzRCxDQUFoQjs7QUFDQSxRQUFJNEcsSUFBSSxHQUFHLEtBQUtySyxVQUFMLENBQWdCbUosTUFBaEIsQ0FBdUJDLG9CQUF2QixDQUE0Q0gsU0FBNUMsQ0FBWDs7QUFDQSxTQUFLcUIsV0FBTCxDQUFpQkQsSUFBakIsRUFBdUIsSUFBdkIsRUFBNkIsR0FBN0I7QUFDRCxHQXYzQndCO0FBeTNCekJFLEVBQUFBLGNBejNCeUIsMEJBeTNCVkMsUUF6M0JVLEVBeTNCQTtBQUN2QixRQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxRQUFJQyxZQUFZLEdBQUcsQ0FBbkI7O0FBQ0EsU0FBSyxJQUFJdkgsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd6RSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFc0YsaUJBQTdFLEdBQWlHL0UsTUFBN0gsRUFBcUlhLEtBQUssRUFBMUksRUFBOEk7QUFDNUksVUFBSXpFLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVzRixpQkFBN0UsR0FBaUdsRSxLQUFqRyxFQUF3R0gsZ0JBQXhHLENBQXlIVyxJQUF6SCxDQUE4SFcsTUFBOUgsSUFBd0ksS0FBSzFFLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDeEUsU0FBakwsRUFBNEw7QUFDMUw7QUFDQW1PLFFBQUFBLFlBQVksR0FBR2hNLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVzRixpQkFBN0UsR0FBaUdsRSxLQUFqRyxFQUF3R0gsZ0JBQXhHLENBQXlIQyxpQkFBekgsQ0FBMkl4RixpQkFBMUo7QUFDRDtBQUNGOztBQUVELFFBQUlpTixZQUFZLEdBQUcsQ0FBZixHQUFtQixDQUF2QixFQUEwQjtBQUN4QmxKLE1BQUFBLE9BQU8sQ0FBQ3lJLEtBQVIsQ0FBYyx3QkFBZDtBQUNBUSxNQUFBQSxXQUFXLEdBQUdDLFlBQVksR0FBR0YsUUFBZixHQUEwQixDQUF4QztBQUNBLFVBQUlHLFFBQVEsR0FBR0MsUUFBUSxDQUFDbE0sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMEQ4RyxXQUExRCxFQUF1RTdHLGlCQUF2RSxDQUF5RmhDLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIaUosU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQXZCO0FBQ0F0SixNQUFBQSxPQUFPLENBQUN5SSxLQUFSLENBQWMsWUFBWVUsUUFBMUI7QUFDRCxLQUxELE1BS087QUFDTEYsTUFBQUEsV0FBVyxHQUFHQyxZQUFZLEdBQUdGLFFBQTdCO0FBQ0EsVUFBSUcsUUFBUSxHQUFHQyxRQUFRLENBQUNsTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRDhHLFdBQTFELEVBQXVFN0csaUJBQXZFLENBQXlGaEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0hpSixTQUF0SCxDQUFnSUMsVUFBakksQ0FBdkI7QUFDQXRKLE1BQUFBLE9BQU8sQ0FBQ3lJLEtBQVIsQ0FBYyxZQUFZVSxRQUExQjtBQUNEO0FBQ0YsR0E3NEJ3QjtBQSs0QnpCekQsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ3BCLFFBQUksQ0FBQzFILFVBQUwsRUFBaUI7QUFDZixVQUFJdUwsS0FBSjtBQUNBLFVBQUlDLEtBQUo7O0FBQ0EsVUFBSXZULE9BQU8sSUFBSSxLQUFLbUksY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN0RSxLQUFyQyxJQUE4QyxLQUE3RCxFQUFvRTtBQUNsRXNPLFFBQUFBLEtBQUssR0FBR0gsUUFBUSxDQUFDbFQsV0FBRCxDQUFoQjtBQUNBc1QsUUFBQUEsS0FBSyxHQUFHSixRQUFRLENBQUNqVCxXQUFELENBQWhCO0FBQ0QsT0FIRCxNQUdPLElBQUksS0FBS2lJLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDdEUsS0FBckMsSUFBOEMsSUFBOUMsSUFBc0RoRixPQUExRCxFQUFtRTtBQUN4RXNULFFBQUFBLEtBQUssR0FBRyxDQUFSO0FBQ0FDLFFBQUFBLEtBQUssR0FBRyxDQUFSO0FBQ0QsT0FITSxNQUdBO0FBQ0xELFFBQUFBLEtBQUssR0FBRyxLQUFLMUMsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBUjtBQUNBMkMsUUFBQUEsS0FBSyxHQUFHLEtBQUszQyxTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFSO0FBRUEsWUFBSXpRLGlCQUFpQixJQUFJbVQsS0FBekIsRUFBZ0NBLEtBQUssR0FBRyxLQUFLMUMsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBUjtBQUVoQyxZQUFJeFEsaUJBQWlCLElBQUltVCxLQUF6QixFQUFnQ0EsS0FBSyxHQUFHLEtBQUszQyxTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFSO0FBRWhDelEsUUFBQUEsaUJBQWlCLEdBQUdtVCxLQUFwQjtBQUNBbFQsUUFBQUEsaUJBQWlCLEdBQUdtVCxLQUFwQjtBQUNELE9BbkJjLENBcUJmO0FBQ0E7OztBQUVBeE0sTUFBQUEsUUFBUSxHQUFHdU0sS0FBSyxHQUFHQyxLQUFuQjtBQUNBLFVBQUlDLFFBQVEsR0FBRztBQUFFcEIsUUFBQUEsS0FBSyxFQUFFa0IsS0FBVDtBQUFnQmhCLFFBQUFBLEtBQUssRUFBRWlCO0FBQXZCLE9BQWYsQ0F6QmUsQ0EwQmY7QUFDQTs7QUFDQXhKLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQmpELFFBQWxCLEdBQTZCLFVBQTdCLEdBQTBDdU0sS0FBMUMsR0FBa0QsVUFBbEQsR0FBK0RDLEtBQTNFO0FBRUF0TSxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE2RXFHLFFBQTdFO0FBQ0Q7QUFDRixHQWg3QndCO0FBazdCekJDLEVBQUFBLFdBbDdCeUIseUJBazdCWDtBQUNaLFFBQUlILEtBQUssR0FBRyxLQUFLMUMsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBWjtBQUVBLFFBQUlsUSxpQkFBaUIsSUFBSTRTLEtBQXpCLEVBQWdDQSxLQUFLLEdBQUcsS0FBSzFDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVI7QUFFaENsUSxJQUFBQSxpQkFBaUIsR0FBRzRTLEtBQXBCO0FBRUEsV0FBT0EsS0FBUDtBQUNELEdBMTdCd0I7QUE0N0J6QkksRUFBQUEsWUE1N0J5QiwwQkE0N0JWO0FBQ2IsUUFBSUosS0FBSyxHQUFHLEtBQUsxQyxTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFaO0FBQ0EsUUFBSTJDLEtBQUssR0FBRyxLQUFLM0MsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBWjtBQUVBLFFBQUlwUSxpQkFBaUIsSUFBSThTLEtBQXpCLEVBQWdDQSxLQUFLLEdBQUcsS0FBSzFDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVI7QUFFaEMsUUFBSW5RLGlCQUFpQixJQUFJOFMsS0FBekIsRUFBZ0NBLEtBQUssR0FBRyxLQUFLM0MsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBUjtBQUVoQ3BRLElBQUFBLGlCQUFpQixHQUFHOFMsS0FBcEI7QUFDQTdTLElBQUFBLGlCQUFpQixHQUFHOFMsS0FBcEI7QUFFQSxXQUFPRCxLQUFLLEdBQUdDLEtBQWY7QUFDRCxHQXg4QndCO0FBMDhCekJJLEVBQUFBLGtCQTE4QnlCLDhCQTA4Qk5DLGNBMThCTSxFQTA4QmtCQyxTQTE4QmxCLEVBMDhCcUNDLFlBMThCckMsRUEwOEIyREMsV0ExOEIzRCxFQTA4QmdGOUcsS0ExOEJoRixFQTA4QjhGO0FBQUEsUUFBcEcyRyxjQUFvRztBQUFwR0EsTUFBQUEsY0FBb0csR0FBbkYsS0FBbUY7QUFBQTs7QUFBQSxRQUE1RUMsU0FBNEU7QUFBNUVBLE1BQUFBLFNBQTRFLEdBQWhFLEtBQWdFO0FBQUE7O0FBQUEsUUFBekRDLFlBQXlEO0FBQXpEQSxNQUFBQSxZQUF5RCxHQUExQyxLQUEwQztBQUFBOztBQUFBLFFBQW5DQyxXQUFtQztBQUFuQ0EsTUFBQUEsV0FBbUMsR0FBckIsS0FBcUI7QUFBQTs7QUFBQSxRQUFkOUcsS0FBYztBQUFkQSxNQUFBQSxLQUFjLEdBQU4sSUFBTTtBQUFBOztBQUNySDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsUUFBSTJHLGNBQUosRUFBb0I7QUFDbEIsVUFBSTNHLEtBQUssSUFBSSxJQUFiLEVBQW1CO0FBQ2pCeEwsUUFBQUEsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixFQUEvQixFQUFtQyxFQUFuQyxFQUF1QyxFQUF2QyxFQUEyQyxFQUEzQyxFQUErQyxFQUEvQyxDQUFuQjtBQUVBQSxRQUFBQSxnQkFBZ0IsQ0FBQ3VTLElBQWpCLENBQXNCO0FBQUEsaUJBQU0sTUFBTUMsSUFBSSxDQUFDQyxNQUFMLEVBQVo7QUFBQSxTQUF0QjtBQUVBbkssUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl2SSxnQkFBWjtBQUNBSSxRQUFBQSx1QkFBdUIsR0FBRyxDQUExQjtBQUVBLFlBQUlzUyxTQUFTLEdBQUc7QUFBRUMsVUFBQUEsUUFBUSxFQUFFM1MsZ0JBQVo7QUFBOEI0UyxVQUFBQSxTQUFTLEVBQUUsSUFBekM7QUFBK0NDLFVBQUFBLFdBQVcsRUFBRSxJQUE1RDtBQUFrRUMsVUFBQUEsU0FBUyxFQUFFO0FBQTdFLFNBQWhCO0FBQ0F0TixRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RWdILFNBQTlFO0FBQ0Q7QUFDRixLQVpELE1BWU8sSUFBSU4sU0FBSixFQUFlO0FBQ3BCLFVBQUk1RyxLQUFLLElBQUksSUFBYixFQUFtQjtBQUNqQnZMLFFBQUFBLFdBQVcsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLEVBQS9CLEVBQW1DLEVBQW5DLEVBQXVDLEVBQXZDLEVBQTJDLEVBQTNDLEVBQStDLEVBQS9DLENBQWQ7QUFFQUEsUUFBQUEsV0FBVyxDQUFDc1MsSUFBWixDQUFpQjtBQUFBLGlCQUFNLE1BQU1DLElBQUksQ0FBQ0MsTUFBTCxFQUFaO0FBQUEsU0FBakI7QUFFQW5LLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZdEksV0FBWjtBQUNBSSxRQUFBQSxrQkFBa0IsR0FBRyxDQUFyQjtBQUVBLFlBQUlxUyxTQUFTLEdBQUc7QUFBRUMsVUFBQUEsUUFBUSxFQUFFLElBQVo7QUFBa0JDLFVBQUFBLFNBQVMsRUFBRTNTLFdBQTdCO0FBQTBDNFMsVUFBQUEsV0FBVyxFQUFFLElBQXZEO0FBQTZEQyxVQUFBQSxTQUFTLEVBQUU7QUFBeEUsU0FBaEI7QUFDQXROLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NxRSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFZ0gsU0FBOUU7QUFDRDtBQUNGLEtBWk0sTUFZQSxJQUFJTCxZQUFKLEVBQWtCO0FBQ3ZCLFVBQUk3RyxLQUFLLElBQUksSUFBYixFQUFtQjtBQUNqQnRMLFFBQUFBLGNBQWMsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLEVBQS9CLEVBQW1DLEVBQW5DLEVBQXVDLEVBQXZDLENBQWpCO0FBRUFBLFFBQUFBLGNBQWMsQ0FBQ3FTLElBQWYsQ0FBb0I7QUFBQSxpQkFBTSxNQUFNQyxJQUFJLENBQUNDLE1BQUwsRUFBWjtBQUFBLFNBQXBCO0FBRUFuSyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXJJLGNBQVo7QUFDQUksUUFBQUEscUJBQXFCLEdBQUcsQ0FBeEI7QUFFQSxZQUFJb1MsU0FBUyxHQUFHO0FBQUVDLFVBQUFBLFFBQVEsRUFBRSxJQUFaO0FBQWtCQyxVQUFBQSxTQUFTLEVBQUUsSUFBN0I7QUFBbUNDLFVBQUFBLFdBQVcsRUFBRTNTLGNBQWhEO0FBQWdFNFMsVUFBQUEsU0FBUyxFQUFFO0FBQTNFLFNBQWhCO0FBQ0F0TixRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RWdILFNBQTlFO0FBQ0Q7QUFDRixLQVpNLE1BWUEsSUFBSUosV0FBSixFQUFpQjtBQUN0QixVQUFJOUcsS0FBSyxJQUFJLElBQWIsRUFBbUI7QUFDakJyTCxRQUFBQSxhQUFhLEdBQUcsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixFQUEvQixFQUFtQyxFQUFuQyxDQUFoQjtBQUVBQSxRQUFBQSxhQUFhLENBQUNvUyxJQUFkLENBQW1CO0FBQUEsaUJBQU0sTUFBTUMsSUFBSSxDQUFDQyxNQUFMLEVBQVo7QUFBQSxTQUFuQjtBQUVBbkssUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlwSSxhQUFaO0FBQ0FJLFFBQUFBLG9CQUFvQixHQUFHLENBQXZCO0FBRUEsWUFBSW1TLFNBQVMsR0FBRztBQUFFQyxVQUFBQSxRQUFRLEVBQUUsSUFBWjtBQUFrQkMsVUFBQUEsU0FBUyxFQUFFLElBQTdCO0FBQW1DQyxVQUFBQSxXQUFXLEVBQUUsSUFBaEQ7QUFBc0RDLFVBQUFBLFNBQVMsRUFBRTNTO0FBQWpFLFNBQWhCO0FBQ0FxRixRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RWdILFNBQTlFO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJbEgsS0FBSyxJQUFJLElBQWIsRUFBbUI7QUFDakIsVUFBSUEsS0FBSyxDQUFDbUgsUUFBTixJQUFrQixJQUF0QixFQUE0QjtBQUMxQjNTLFFBQUFBLGdCQUFnQixHQUFHd0wsS0FBSyxDQUFDbUgsUUFBekI7QUFDQXJLLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZdkksZ0JBQVo7QUFDQUksUUFBQUEsdUJBQXVCLEdBQUcsQ0FBMUI7QUFDRDs7QUFFRCxVQUFJb0wsS0FBSyxDQUFDb0gsU0FBTixJQUFtQixJQUF2QixFQUE2QjtBQUMzQjNTLFFBQUFBLFdBQVcsR0FBR3VMLEtBQUssQ0FBQ29ILFNBQXBCO0FBQ0F0SyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXRJLFdBQVo7QUFDQUksUUFBQUEsa0JBQWtCLEdBQUcsQ0FBckI7QUFDRDs7QUFFRCxVQUFJbUwsS0FBSyxDQUFDcUgsV0FBTixJQUFxQixJQUF6QixFQUErQjtBQUM3QjNTLFFBQUFBLGNBQWMsR0FBR3NMLEtBQUssQ0FBQ3FILFdBQXZCO0FBQ0F2SyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXJJLGNBQVo7QUFDQUksUUFBQUEscUJBQXFCLEdBQUcsQ0FBeEI7QUFDRDs7QUFFRCxVQUFJa0wsS0FBSyxDQUFDc0gsU0FBTixJQUFtQixJQUF2QixFQUE2QjtBQUMzQjNTLFFBQUFBLGFBQWEsR0FBR3FMLEtBQUssQ0FBQ3NILFNBQXRCO0FBQ0F4SyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXBJLGFBQVo7QUFDQUksUUFBQUEsb0JBQW9CLEdBQUcsQ0FBdkI7QUFDRDtBQUNGO0FBQ0YsR0EvaEN3QjtBQWlpQ3pCd1MsRUFBQUEsbUJBamlDeUIsK0JBaWlDTHhELE1BamlDSyxFQWlpQ0c7QUFDMUIsUUFBSTlILElBQUksR0FBRyxDQUFDLENBQVo7O0FBQ0EsUUFBSXpILGdCQUFnQixDQUFDb0osTUFBakIsR0FBMEIsQ0FBOUIsRUFBaUM7QUFDL0IsVUFBSWhKLHVCQUF1QixHQUFHSixnQkFBZ0IsQ0FBQ29KLE1BQS9DLEVBQXVEO0FBQ3JEM0IsUUFBQUEsSUFBSSxHQUFHekgsZ0JBQWdCLENBQUNJLHVCQUFELENBQXZCO0FBQ0FBLFFBQUFBLHVCQUF1QjtBQUN2QixZQUFJc1MsU0FBUyxHQUFHO0FBQUVDLFVBQUFBLFFBQVEsRUFBRSxJQUFaO0FBQWtCQyxVQUFBQSxTQUFTLEVBQUUsS0FBN0I7QUFBb0NDLFVBQUFBLFdBQVcsRUFBRSxLQUFqRDtBQUF3REMsVUFBQUEsU0FBUyxFQUFFO0FBQW5FLFNBQWhCO0FBQ0F0TixRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RWdILFNBQTlFO0FBQ0QsT0FMRCxNQUtPO0FBQ0wsYUFBS1Isa0JBQUwsQ0FBd0IsSUFBeEIsRUFBOEIsS0FBOUIsRUFBcUMsS0FBckMsRUFBNEMsS0FBNUMsRUFBbUQsSUFBbkQ7QUFDRDtBQUNGLEtBVEQsTUFTTztBQUNMLFdBQUtBLGtCQUFMLENBQXdCLElBQXhCLEVBQThCLEtBQTlCLEVBQXFDLEtBQXJDLEVBQTRDLEtBQTVDLEVBQW1ELElBQW5EO0FBQ0Q7O0FBQ0QsV0FBT3pLLElBQVA7QUFDRCxHQWhqQ3dCO0FBa2pDekJ1TCxFQUFBQSxjQWxqQ3lCLDBCQWtqQ1Z6RCxNQWxqQ1UsRUFrakNGO0FBQ3JCLFFBQUk5SCxJQUFJLEdBQUcsQ0FBQyxDQUFaOztBQUNBLFFBQUl4SCxXQUFXLENBQUNtSixNQUFaLEdBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFVBQUkvSSxrQkFBa0IsR0FBR0osV0FBVyxDQUFDbUosTUFBckMsRUFBNkM7QUFDM0MzQixRQUFBQSxJQUFJLEdBQUd4SCxXQUFXLENBQUNJLGtCQUFELENBQWxCO0FBQ0FBLFFBQUFBLGtCQUFrQjtBQUNsQixZQUFJcVMsU0FBUyxHQUFHO0FBQUVDLFVBQUFBLFFBQVEsRUFBRSxLQUFaO0FBQW1CQyxVQUFBQSxTQUFTLEVBQUUsSUFBOUI7QUFBb0NDLFVBQUFBLFdBQVcsRUFBRSxLQUFqRDtBQUF3REMsVUFBQUEsU0FBUyxFQUFFO0FBQW5FLFNBQWhCO0FBQ0F0TixRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RWdILFNBQTlFO0FBQ0QsT0FMRCxNQUtPO0FBQ0wsYUFBS1Isa0JBQUwsQ0FBd0IsS0FBeEIsRUFBK0IsSUFBL0IsRUFBcUMsS0FBckMsRUFBNEMsS0FBNUMsRUFBbUQsSUFBbkQ7QUFDRDtBQUNGLEtBVEQsTUFTTztBQUNMLFdBQUtBLGtCQUFMLENBQXdCLEtBQXhCLEVBQStCLElBQS9CLEVBQXFDLEtBQXJDLEVBQTRDLEtBQTVDLEVBQW1ELElBQW5EO0FBQ0Q7O0FBQ0QsV0FBT3pLLElBQVA7QUFDRCxHQWprQ3dCO0FBbWtDekJ3TCxFQUFBQSxpQkFua0N5Qiw2QkFta0NQMUQsTUFua0NPLEVBbWtDQztBQUN4QixRQUFJOUgsSUFBSSxHQUFHLENBQUMsQ0FBWjs7QUFDQSxRQUFJdkgsY0FBYyxDQUFDa0osTUFBZixHQUF3QixDQUE1QixFQUErQjtBQUM3QixVQUFJOUkscUJBQXFCLEdBQUdKLGNBQWMsQ0FBQ2tKLE1BQTNDLEVBQW1EO0FBQ2pEM0IsUUFBQUEsSUFBSSxHQUFHdkgsY0FBYyxDQUFDSSxxQkFBRCxDQUFyQjtBQUNBQSxRQUFBQSxxQkFBcUI7QUFDckIsWUFBSW9TLFNBQVMsR0FBRztBQUFFQyxVQUFBQSxRQUFRLEVBQUUsS0FBWjtBQUFtQkMsVUFBQUEsU0FBUyxFQUFFLEtBQTlCO0FBQXFDQyxVQUFBQSxXQUFXLEVBQUUsSUFBbEQ7QUFBd0RDLFVBQUFBLFNBQVMsRUFBRTtBQUFuRSxTQUFoQjtBQUNBdE4sUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3FFLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsRUFBMUUsRUFBOEVnSCxTQUE5RTtBQUNELE9BTEQsTUFLTztBQUNMLGFBQUtSLGtCQUFMLENBQXdCLEtBQXhCLEVBQStCLEtBQS9CLEVBQXNDLElBQXRDLEVBQTRDLEtBQTVDLEVBQW1ELElBQW5EO0FBQ0Q7QUFDRixLQVRELE1BU087QUFDTCxXQUFLQSxrQkFBTCxDQUF3QixLQUF4QixFQUErQixLQUEvQixFQUFzQyxJQUF0QyxFQUE0QyxLQUE1QyxFQUFtRCxJQUFuRDtBQUNEOztBQUNELFdBQU96SyxJQUFQO0FBQ0QsR0FsbEN3QjtBQW9sQ3pCeUwsRUFBQUEsZ0JBcGxDeUIsNEJBb2xDUjNELE1BcGxDUSxFQW9sQ0E7QUFDdkIsUUFBSTlILElBQUksR0FBRyxDQUFDLENBQVo7O0FBQ0EsUUFBSXRILGFBQWEsQ0FBQ2lKLE1BQWQsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDNUIsVUFBSTdJLG9CQUFvQixHQUFHSixhQUFhLENBQUNpSixNQUF6QyxFQUFpRDtBQUMvQzNCLFFBQUFBLElBQUksR0FBR3RILGFBQWEsQ0FBQ0ksb0JBQUQsQ0FBcEI7QUFDQUEsUUFBQUEsb0JBQW9CO0FBQ3BCLFlBQUltUyxTQUFTLEdBQUc7QUFBRUMsVUFBQUEsUUFBUSxFQUFFLEtBQVo7QUFBbUJDLFVBQUFBLFNBQVMsRUFBRSxLQUE5QjtBQUFxQ0MsVUFBQUEsV0FBVyxFQUFFLEtBQWxEO0FBQXlEQyxVQUFBQSxTQUFTLEVBQUU7QUFBcEUsU0FBaEI7QUFDQXROLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NxRSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFZ0gsU0FBOUU7QUFDRCxPQUxELE1BS087QUFDTCxhQUFLUixrQkFBTCxDQUF3QixLQUF4QixFQUErQixLQUEvQixFQUFzQyxLQUF0QyxFQUE2QyxJQUE3QyxFQUFtRCxJQUFuRDtBQUNEO0FBQ0YsS0FURCxNQVNPO0FBQ0wsV0FBS0Esa0JBQUwsQ0FBd0IsS0FBeEIsRUFBK0IsS0FBL0IsRUFBc0MsS0FBdEMsRUFBNkMsSUFBN0MsRUFBbUQsSUFBbkQ7QUFDRDs7QUFDRCxXQUFPekssSUFBUDtBQUNELEdBbm1Dd0I7QUFxbUN6QjBMLEVBQUFBLGNBcm1DeUIsMEJBcW1DVjNILEtBcm1DVSxFQXFtQ0k7QUFBQSxRQUFkQSxLQUFjO0FBQWRBLE1BQUFBLEtBQWMsR0FBTixJQUFNO0FBQUE7O0FBQzNCLFFBQUlBLEtBQUssQ0FBQ21ILFFBQVYsRUFBb0I7QUFDbEJ2UyxNQUFBQSx1QkFBdUI7QUFDeEI7O0FBQ0QsUUFBSW9MLEtBQUssQ0FBQ29ILFNBQVYsRUFBcUI7QUFDbkJ2UyxNQUFBQSxrQkFBa0I7QUFDbkI7O0FBQ0QsUUFBSW1MLEtBQUssQ0FBQ3FILFdBQVYsRUFBdUI7QUFDckJ2UyxNQUFBQSxxQkFBcUI7QUFDdEI7O0FBQ0QsUUFBSWtMLEtBQUssQ0FBQ3NILFNBQVYsRUFBcUI7QUFDbkJ2UyxNQUFBQSxvQkFBb0I7QUFDckI7QUFDRixHQWxuQ3dCO0FBb25DekI2UyxFQUFBQSxpQkFwbkN5Qiw2QkFvbkNQakIsY0FwbkNPLEVBb25DaUJDLFNBcG5DakIsRUFvbkNvQ0MsWUFwbkNwQyxFQW9uQzBEQyxXQXBuQzFELEVBb25DK0U7QUFBQSxRQUF0RkgsY0FBc0Y7QUFBdEZBLE1BQUFBLGNBQXNGLEdBQXJFLEtBQXFFO0FBQUE7O0FBQUEsUUFBOURDLFNBQThEO0FBQTlEQSxNQUFBQSxTQUE4RCxHQUFsRCxLQUFrRDtBQUFBOztBQUFBLFFBQTNDQyxZQUEyQztBQUEzQ0EsTUFBQUEsWUFBMkMsR0FBNUIsS0FBNEI7QUFBQTs7QUFBQSxRQUFyQkMsV0FBcUI7QUFBckJBLE1BQUFBLFdBQXFCLEdBQVAsS0FBTztBQUFBOztBQUN0RyxRQUFJSCxjQUFKLEVBQW9CO0FBQ2xCLFVBQUksS0FBS2pMLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsWUFBSSxLQUFLUixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLGNBQUluQixLQUFLLEdBQUcsS0FBSzhJLG1CQUFMLEVBQVo7O0FBQ0EsY0FBSTlJLEtBQUssSUFBSSxDQUFDLENBQWQsRUFBaUI7QUFDZkEsWUFBQUEsS0FBSyxHQUFHLEtBQUs4SSxtQkFBTCxFQUFSO0FBQ0Q7O0FBQ0QsaUJBQU85SSxLQUFQO0FBQ0Q7QUFDRixPQVJELE1BUU8sSUFBSSxLQUFLL0MsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQyxZQUFJK0MsS0FBSyxHQUFHLEtBQUs4SSxtQkFBTCxFQUFaOztBQUNBLFlBQUk5SSxLQUFLLElBQUksQ0FBQyxDQUFkLEVBQWlCO0FBQ2ZBLFVBQUFBLEtBQUssR0FBRyxLQUFLOEksbUJBQUwsRUFBUjtBQUNEOztBQUNELGVBQU85SSxLQUFQO0FBQ0Q7QUFDRixLQWhCRCxNQWdCTyxJQUFJbUksU0FBSixFQUFlO0FBQ3BCLFVBQUksS0FBS2xMLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsWUFBSSxLQUFLUixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLGNBQUluQixLQUFLLEdBQUcsS0FBSytJLGNBQUwsRUFBWjs7QUFDQSxjQUFJL0ksS0FBSyxJQUFJLENBQUMsQ0FBZCxFQUFpQjtBQUNmQSxZQUFBQSxLQUFLLEdBQUcsS0FBSytJLGNBQUwsRUFBUjtBQUNEOztBQUNELGlCQUFPL0ksS0FBUDtBQUNEO0FBQ0YsT0FSRCxNQVFPLElBQUksS0FBSy9DLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakMsWUFBSStDLEtBQUssR0FBRyxLQUFLK0ksY0FBTCxFQUFaOztBQUNBLFlBQUkvSSxLQUFLLElBQUksQ0FBQyxDQUFkLEVBQWlCO0FBQ2ZBLFVBQUFBLEtBQUssR0FBRyxLQUFLK0ksY0FBTCxFQUFSO0FBQ0Q7O0FBQ0QsZUFBTy9JLEtBQVA7QUFDRDtBQUNGLEtBaEJNLE1BZ0JBLElBQUlvSSxZQUFKLEVBQWtCO0FBQ3ZCLFVBQUksS0FBS25MLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsWUFBSSxLQUFLUixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLGNBQUluQixLQUFLLEdBQUcsS0FBS2dKLGlCQUFMLEVBQVo7O0FBQ0EsY0FBSWhKLEtBQUssSUFBSSxDQUFDLENBQWQsRUFBaUI7QUFDZkEsWUFBQUEsS0FBSyxHQUFHLEtBQUtnSixpQkFBTCxFQUFSO0FBQ0Q7O0FBQ0QsaUJBQU9oSixLQUFQO0FBQ0Q7QUFDRixPQVJELE1BUU8sSUFBSSxLQUFLL0MsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQyxZQUFJK0MsS0FBSyxHQUFHLEtBQUtnSixpQkFBTCxFQUFaOztBQUNBLFlBQUloSixLQUFLLElBQUksQ0FBQyxDQUFkLEVBQWlCO0FBQ2ZBLFVBQUFBLEtBQUssR0FBRyxLQUFLZ0osaUJBQUwsRUFBUjtBQUNEOztBQUNELGVBQU9oSixLQUFQO0FBQ0Q7QUFDRixLQWhCTSxNQWdCQSxJQUFJcUksV0FBSixFQUFpQjtBQUN0QixVQUFJLEtBQUtwTCxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFlBQUksS0FBS1IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN4RSxTQUFyQyxJQUFrRG1DLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZXLElBQTdGLENBQWtHVyxNQUF4SixFQUFnSztBQUM5SixjQUFJbkIsS0FBSyxHQUFHLEtBQUtpSixnQkFBTCxFQUFaOztBQUNBLGNBQUlqSixLQUFLLElBQUksQ0FBQyxDQUFkLEVBQWlCO0FBQ2ZBLFlBQUFBLEtBQUssR0FBRyxLQUFLaUosZ0JBQUwsRUFBUjtBQUNEOztBQUNELGlCQUFPakosS0FBUDtBQUNEO0FBQ0YsT0FSRCxNQVFPLElBQUksS0FBSy9DLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakMsWUFBSStDLEtBQUssR0FBRyxLQUFLaUosZ0JBQUwsRUFBWjs7QUFDQSxZQUFJakosS0FBSyxJQUFJLENBQUMsQ0FBZCxFQUFpQjtBQUNmQSxVQUFBQSxLQUFLLEdBQUcsS0FBS2lKLGdCQUFMLEVBQVI7QUFDRDs7QUFDRCxlQUFPakosS0FBUDtBQUNEO0FBQ0Y7QUFDRixHQXRyQ3dCO0FBd3JDekJvSixFQUFBQSxZQXhyQ3lCLDBCQXdyQ1Y7QUFDYixRQUFJLENBQUMvTSxVQUFMLEVBQWlCO0FBQ2YsVUFBSWxCLFdBQVcsR0FBR0ksd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyQixNQUE1RSxFQUFvRjtBQUNsRixZQUFJa0ssUUFBUSxHQUFHNUIsUUFBUSxDQUFDbE0sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RmhDLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIaUosU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQXZCOztBQUNBLGFBQUtsTCxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3RELGlCQUFyQyxHQUF5RGEsV0FBekQ7O0FBQ0EsWUFBSWtPLFFBQVEsSUFBSSxDQUFaLElBQWlCQSxRQUFRLElBQUksQ0FBakMsRUFBb0M7QUFDbEM7QUFDQSxjQUFJcEgsVUFBVSxHQUFHLEtBQUtpRCxTQUFMLENBQWUsQ0FBZixFQUFrQixFQUFsQixDQUFqQjs7QUFFQSxjQUFJbUUsUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ2pCO0FBQ0FwSCxZQUFBQSxVQUFVLEdBQUcsS0FBS2tILGlCQUFMLENBQXVCLElBQXZCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQTNDLENBQWIsQ0FGaUIsQ0FHakI7QUFDRCxXQUpELE1BSU8sSUFBSUUsUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ3hCO0FBQ0FwSCxZQUFBQSxVQUFVLEdBQUcsS0FBS2tILGlCQUFMLENBQXVCLEtBQXZCLEVBQThCLElBQTlCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQTNDLENBQWIsQ0FGd0IsQ0FHeEI7QUFDRCxXQUpNLE1BSUEsSUFBSUUsUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ3hCO0FBQ0FwSCxZQUFBQSxVQUFVLEdBQUcsS0FBS2tILGlCQUFMLENBQXVCLEtBQXZCLEVBQThCLEtBQTlCLEVBQXFDLElBQXJDLEVBQTJDLEtBQTNDLENBQWIsQ0FGd0IsQ0FHeEI7QUFDQTtBQUNELFdBTE0sTUFLQSxJQUFJRSxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDeEI7QUFDQXBILFlBQUFBLFVBQVUsR0FBRyxLQUFLa0gsaUJBQUwsQ0FBdUIsS0FBdkIsRUFBOEIsS0FBOUIsRUFBcUMsS0FBckMsRUFBNEMsSUFBNUMsQ0FBYixDQUZ3QixDQUd4QjtBQUNEOztBQUVEN04sVUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQStDLFVBQUFBLE9BQU8sQ0FBQ3lJLEtBQVIsQ0FBY3VDLFFBQWQ7O0FBRUEsY0FBSSxLQUFLcE0sWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLGdCQUFJb00sUUFBUSxJQUFJLEVBQWhCLEVBQW9CO0FBQ2xCO0FBQ0FsTyxjQUFBQSxXQUFXLEdBQUdBLFdBQVcsR0FBRyxDQUE1QjtBQUNBLG1CQUFLbU8sYUFBTDtBQUNELGFBSkQsTUFJTztBQUNMLGtCQUFJLEtBQUs3TSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLG9CQUFJb0ksV0FBVyxHQUFHO0FBQUVySCxrQkFBQUEsVUFBVSxFQUFFRCxVQUFkO0FBQTBCRSxrQkFBQUEsT0FBTyxFQUFFaEg7QUFBbkMsaUJBQWxCO0FBQ0EscUJBQUttRyxpQkFBTCxDQUF1QmlJLFdBQXZCO0FBQ0QsZUFIRCxNQUdPO0FBQ0wscUJBQUszSCxtQkFBTDtBQUNEO0FBQ0Y7QUFDRixXQWRELE1BY08sSUFBSSxLQUFLM0UsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQztBQUNBLGdCQUFJb00sUUFBUSxJQUFJLEVBQWhCLEVBQW9CO0FBQ2xCO0FBQ0FsTyxjQUFBQSxXQUFXLEdBQUdBLFdBQVcsR0FBRyxDQUE1QjtBQUNBLG1CQUFLbU8sYUFBTDtBQUNELGFBSkQsTUFJTztBQUNMLGtCQUFJQyxXQUFXLEdBQUc7QUFBRXJILGdCQUFBQSxVQUFVLEVBQUVELFVBQWQ7QUFBMEJFLGdCQUFBQSxPQUFPLEVBQUVoSDtBQUFuQyxlQUFsQjtBQUNBLG1CQUFLbUcsaUJBQUwsQ0FBdUJpSSxXQUF2QjtBQUNEO0FBQ0Y7QUFDRixTQW5ERCxNQW1ETztBQUNMak8sVUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQStDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVFQUFaO0FBQ0EsZUFBSzhELHNCQUFMO0FBQ0Q7QUFDRixPQTNERCxNQTJETztBQUNMLFlBQUksS0FBS25GLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsY0FBSSxDQUFDWixVQUFMLEVBQWlCO0FBQ2YsZ0JBQUksS0FBS0ksY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM0TCxLQUFyQyxJQUE4Q3RVLFdBQWxELEVBQStELEtBQUt1VSxnQkFBTDtBQUUvRCxnQkFBSSxDQUFDLEtBQUtoTixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzRMLEtBQXRDLElBQStDdlUsWUFBbkQsRUFBaUUsS0FBS3dVLGdCQUFMO0FBQ2xFO0FBQ0YsU0FORCxNQU1PLElBQUksS0FBS3hNLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakMsY0FBSSxDQUFDWixVQUFMLEVBQWlCO0FBQ2YsZ0JBQUksS0FBS0ksY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNwRCxjQUF6QyxFQUF5RDtBQUN2RCxtQkFBS2lQLGdCQUFMO0FBQ0FwTCxjQUFBQSxPQUFPLENBQUN5SSxLQUFSLENBQWMseUJBQWQ7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGLEtBNUVELE1BNEVPO0FBQ0wsVUFBSSxLQUFLN0osWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixhQUFLeU0sdUJBQUwsQ0FBNkIsSUFBN0I7QUFDRCxPQUZELE1BRU8sSUFBSSxLQUFLek0sWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQyxhQUFLeU0sdUJBQUwsQ0FBNkIsS0FBN0I7QUFDRDtBQUNGO0FBQ0YsR0E1d0N3QjtBQTh3Q3pCRCxFQUFBQSxnQkE5d0N5Qiw4QkE4d0NOO0FBQ2pCbk8sSUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQStDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVFQUFaO0FBQ0EsU0FBSzhELHNCQUFMO0FBQ0QsR0FseEN3QjtBQW94Q3pCdUgsRUFBQUEsZ0JBcHhDeUIsNEJBb3hDUkMsTUFweENRLEVBb3hDUUMsY0FweENSLEVBb3hDZ0M7QUFBQSxRQUF4Q0QsTUFBd0M7QUFBeENBLE1BQUFBLE1BQXdDLEdBQS9CLEtBQStCO0FBQUE7O0FBQUEsUUFBeEJDLGNBQXdCO0FBQXhCQSxNQUFBQSxjQUF3QixHQUFQLEtBQU87QUFBQTs7QUFDdkQsUUFBSUQsTUFBTSxJQUFJLEtBQWQsRUFBcUI7QUFDbkI7QUFDQTtBQUNBO0FBRUEsVUFBSUUsWUFBWSxHQUFHLEtBQUtySyxVQUFMLEVBQW5COztBQUVBLFVBQUksQ0FBQyxLQUFLaEQsY0FBTCxDQUFvQnFOLFlBQXBCLEVBQWtDOU8sUUFBdkMsRUFBaUQ7QUFDL0MsYUFBS3lCLGNBQUwsQ0FBb0JxTixZQUFwQixFQUFrQ3RQLGNBQWxDLEdBQW1ELElBQW5EO0FBQ0EsYUFBS2lDLGNBQUwsQ0FBb0JxTixZQUFwQixFQUFrQ3JQLFVBQWxDLEdBQStDLENBQS9DO0FBQ0E0RCxRQUFBQSxPQUFPLENBQUN5SSxLQUFSLENBQWMsZ0NBQWQ7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJLEtBQUtySyxjQUFMLENBQW9CcU4sWUFBcEIsRUFBa0MxUSxTQUFsQyxJQUErQ21DLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZXLElBQTdGLENBQWtHVyxNQUFySixFQUE2SjtBQUMzSjlDLFVBQUFBLE9BQU8sQ0FBQ3lJLEtBQVIsQ0FBYyxpQkFBZDtBQUNBekksVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVo7QUFDQSxlQUFLN0IsY0FBTCxDQUFvQnFOLFlBQXBCLEVBQWtDdFAsY0FBbEMsR0FBbUQsSUFBbkQ7QUFFQSxjQUFJdVAsS0FBSyxHQUFHLEtBQUt0TixjQUFMLENBQW9CcU4sWUFBcEIsRUFBa0NoUSxJQUE5Qzs7QUFDQSxjQUFJa1EsUUFBUSxHQUFHek8sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzhNLGVBQWxDLEdBQW9EeE4sY0FBcEQsQ0FBbUVxTixZQUFuRSxFQUFpRnJRLGVBQWhHOztBQUNBLGNBQUl5USxRQUFRLEdBQUczTyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDOE0sZUFBbEMsR0FBb0R4TixjQUFwRCxDQUFtRXFOLFlBQW5FLEVBQWlGcFEsb0JBQWhHOztBQUNBLGNBQUl5USxXQUFXLEdBQUc1Tyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDOE0sZUFBbEMsR0FBb0R4TixjQUFwRCxDQUFtRXFOLFlBQW5FLEVBQWlGbFEsb0JBQW5HOztBQUVBLGNBQUl3USxVQUFVLEdBQUcsQ0FBakI7O0FBQ0EsZUFBSyxJQUFJcEssS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd6RSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDOE0sZUFBbEMsR0FBb0R4TixjQUFwRCxDQUFtRXFOLFlBQW5FLEVBQWlGdlEsWUFBakYsQ0FBOEY0RixNQUExSCxFQUFrSWEsS0FBSyxFQUF2SSxFQUEySTtBQUN6SSxnQkFBSXpFLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M4TSxlQUFsQyxHQUFvRHhOLGNBQXBELENBQW1FcU4sWUFBbkUsRUFBaUZ2USxZQUFqRixDQUE4RnlHLEtBQTlGLEVBQXFHOUgsU0FBekcsRUFBb0g7QUFDbEhrUyxjQUFBQSxVQUFVLElBQUk3Tyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDOE0sZUFBbEMsR0FBb0R4TixjQUFwRCxDQUFtRXFOLFlBQW5FLEVBQWlGdlEsWUFBakYsQ0FBOEZ5RyxLQUE5RixFQUFxRzdILFVBQW5IO0FBQ0Q7QUFDRjs7QUFFRCxjQUFJa1MsS0FBSyxHQUFHLEtBQUs1TixjQUFMLENBQW9CcU4sWUFBcEIsRUFBa0MvUCxTQUE5QztBQUNBLGNBQUl1USxPQUFPLEdBQUcsS0FBSzdOLGNBQUwsQ0FBb0JxTixZQUFwQixFQUFrQzlQLFVBQWhEOztBQUVBLGNBQUl1USxXQUFXLEdBQUcsS0FBS3ZDLFlBQUwsRUFBbEI7O0FBQ0EsY0FBSXdDLFdBQVcsR0FBR0QsV0FBVyxHQUFHLElBQWhDO0FBRUEsY0FBSUUsUUFBUSxHQUFHRCxXQUFXLEdBQUdILEtBQTdCO0FBQ0EsY0FBSUssU0FBUyxHQUFHRixXQUFXLEdBQUdGLE9BQTlCO0FBRUEsY0FBSUssTUFBTSxHQUFHLENBQUNULFFBQVEsR0FBR0MsV0FBWixJQUEyQixNQUF4QztBQUVBLGNBQUlTLE1BQU0sR0FBRyxDQUFiO0FBQ0EsY0FBSVosUUFBUSxJQUFJLENBQWhCLEVBQW1CWSxNQUFNLEdBQUcsS0FBVCxDQUFuQixLQUNLLElBQUlaLFFBQVEsSUFBSSxDQUFoQixFQUFtQlksTUFBTSxHQUFHLFFBQVEsS0FBakIsQ0FBbkIsS0FDQSxJQUFJWixRQUFRLElBQUksQ0FBaEIsRUFBbUJZLE1BQU0sR0FBRyxRQUFRLEtBQVIsR0FBZ0IsS0FBekI7QUFFeEIsY0FBSUMsV0FBVyxHQUFHZCxLQUFLLEdBQUdZLE1BQVIsR0FBaUJDLE1BQWpCLEdBQTBCSCxRQUExQixHQUFxQ0MsU0FBckMsR0FBaUROLFVBQW5FO0FBRUEsZUFBSzNOLGNBQUwsQ0FBb0JxTixZQUFwQixFQUFrQ3JQLFVBQWxDLEdBQStDb1EsV0FBL0M7QUFDQSxlQUFLcE8sY0FBTCxDQUFvQnFOLFlBQXBCLEVBQWtDcFAsV0FBbEMsR0FBZ0RrUSxNQUFoRDtBQUNBLGVBQUtuTyxjQUFMLENBQW9CcU4sWUFBcEIsRUFBa0NuUCxXQUFsQyxHQUFnRGdRLE1BQWhEO0FBQ0EsZUFBS2xPLGNBQUwsQ0FBb0JxTixZQUFwQixFQUFrQ2xQLGFBQWxDLEdBQWtENlAsUUFBbEQ7QUFDQSxlQUFLaE8sY0FBTCxDQUFvQnFOLFlBQXBCLEVBQWtDaFAsZUFBbEMsR0FBb0Q0UCxTQUFwRDtBQUNBLGVBQUtqTyxjQUFMLENBQW9CcU4sWUFBcEIsRUFBa0NqUCxnQkFBbEMsR0FBcUR1UCxVQUFyRDtBQUNBN08sVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEV3QixpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUszRSxjQUFMLENBQW9CcU4sWUFBcEIsQ0FBbkg7QUFFQXpMLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVo7QUFDRCxTQTdDSSxDQThDTDs7QUFDRDtBQUNGLEtBM0RELE1BMkRPO0FBQ0wsV0FBSyxJQUFJd0wsYUFBWSxHQUFHLENBQXhCLEVBQTJCQSxhQUFZLEdBQUcsS0FBS3JOLGNBQUwsQ0FBb0IwQyxNQUE5RCxFQUFzRTJLLGFBQVksRUFBbEYsRUFBc0Y7QUFDcEYsYUFBS3JOLGNBQUwsQ0FBb0JxTixhQUFwQixFQUFrQ3RQLGNBQWxDLEdBQW1ELElBQW5EO0FBRUEsWUFBSXVQLEtBQUssR0FBRyxLQUFLdE4sY0FBTCxDQUFvQnFOLGFBQXBCLEVBQWtDaFEsSUFBOUM7QUFDQSxZQUFJa1EsUUFBUSxHQUFHLEtBQUt2TixjQUFMLENBQW9CcU4sYUFBcEIsRUFBa0NyUSxlQUFqRDtBQUNBLFlBQUl5USxRQUFRLEdBQUcsS0FBS3pOLGNBQUwsQ0FBb0JxTixhQUFwQixFQUFrQ3BRLG9CQUFqRDtBQUNBLFlBQUl5USxXQUFXLEdBQUcsS0FBSzFOLGNBQUwsQ0FBb0JxTixhQUFwQixFQUFrQ2xRLG9CQUFwRDtBQUVBLFlBQUl3USxVQUFVLEdBQUcsQ0FBakI7O0FBQ0EsYUFBSyxJQUFJcEssT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUcsS0FBS3ZELGNBQUwsQ0FBb0JxTixhQUFwQixFQUFrQ3ZRLFlBQWxDLENBQStDNEYsTUFBM0UsRUFBbUZhLE9BQUssRUFBeEYsRUFBNEY7QUFDMUYsY0FBSXpFLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M4TSxlQUFsQyxHQUFvRHhOLGNBQXBELENBQW1FcU4sYUFBbkUsRUFBaUZ2USxZQUFqRixDQUE4RnlHLE9BQTlGLEVBQXFHOUgsU0FBekcsRUFBb0g7QUFDbEhrUyxZQUFBQSxVQUFVLElBQUk3Tyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDOE0sZUFBbEMsR0FBb0R4TixjQUFwRCxDQUFtRXFOLGFBQW5FLEVBQWlGdlEsWUFBakYsQ0FBOEZ5RyxPQUE5RixFQUFxRzdILFVBQW5IO0FBQ0Q7QUFDRjs7QUFFRCxZQUFJa1MsS0FBSyxHQUFHLEtBQUs1TixjQUFMLENBQW9CcU4sYUFBcEIsRUFBa0MvUCxTQUE5QztBQUNBLFlBQUl1USxPQUFPLEdBQUcsS0FBSzdOLGNBQUwsQ0FBb0JxTixhQUFwQixFQUFrQzlQLFVBQWhEOztBQUVBLFlBQUl1USxXQUFXLEdBQUcsS0FBS3ZDLFlBQUwsRUFBbEI7O0FBQ0EsWUFBSXdDLFdBQVcsR0FBR0QsV0FBVyxHQUFHLElBQWhDO0FBRUEsWUFBSUUsUUFBUSxHQUFHRCxXQUFXLEdBQUdILEtBQTdCO0FBQ0EsWUFBSUssU0FBUyxHQUFHRixXQUFXLEdBQUdGLE9BQTlCO0FBRUEsWUFBSUssTUFBTSxHQUFHLENBQUNULFFBQVEsR0FBR0MsV0FBWixJQUEyQixNQUF4QztBQUVBLFlBQUlTLE1BQU0sR0FBRyxDQUFiO0FBQ0EsWUFBSVosUUFBUSxJQUFJLENBQWhCLEVBQW1CWSxNQUFNLEdBQUcsS0FBVCxDQUFuQixLQUNLLElBQUlaLFFBQVEsSUFBSSxDQUFoQixFQUFtQlksTUFBTSxHQUFHLFFBQVEsS0FBakIsQ0FBbkIsS0FDQSxJQUFJWixRQUFRLElBQUksQ0FBaEIsRUFBbUJZLE1BQU0sR0FBRyxRQUFRLEtBQVIsR0FBZ0IsS0FBekI7QUFFeEIsWUFBSUMsV0FBVyxHQUFHZCxLQUFLLEdBQUdZLE1BQVIsR0FBaUJDLE1BQWpCLEdBQTBCSCxRQUExQixHQUFxQ0MsU0FBckMsR0FBaUROLFVBQW5FO0FBRUEsYUFBSzNOLGNBQUwsQ0FBb0JxTixhQUFwQixFQUFrQ3JQLFVBQWxDLEdBQStDb1EsV0FBL0M7QUFDQSxhQUFLcE8sY0FBTCxDQUFvQnFOLGFBQXBCLEVBQWtDcFAsV0FBbEMsR0FBZ0RrUSxNQUFoRDtBQUNBLGFBQUtuTyxjQUFMLENBQW9CcU4sYUFBcEIsRUFBa0NuUCxXQUFsQyxHQUFnRGdRLE1BQWhEO0FBQ0EsYUFBS2xPLGNBQUwsQ0FBb0JxTixhQUFwQixFQUFrQ2xQLGFBQWxDLEdBQWtENlAsUUFBbEQ7QUFDQSxhQUFLaE8sY0FBTCxDQUFvQnFOLGFBQXBCLEVBQWtDaFAsZUFBbEMsR0FBb0Q0UCxTQUFwRDtBQUNBLGFBQUtqTyxjQUFMLENBQW9CcU4sYUFBcEIsRUFBa0NqUCxnQkFBbEMsR0FBcUR1UCxVQUFyRDtBQUNEO0FBQ0Y7QUFDRixHQTEzQ3dCO0FBNDNDekJVLEVBQUFBLHlCQTUzQ3lCLHFDQTQzQ0N2SixLQTUzQ0QsRUE0M0NRO0FBQy9CaEcsSUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3FFLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNkVGLEtBQTdFO0FBQ0QsR0E5M0N3QjtBQWc0Q3pCd0osRUFBQUEsZ0NBaDRDeUIsNENBZzRDUXhKLEtBaDRDUixFQWc0Q2U7QUFDdENoRyxJQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RUYsS0FBOUU7QUFDRCxHQWw0Q3dCO0FBbzRDekJ5SixFQUFBQSxZQXA0Q3lCLHdCQW80Q1pDLElBcDRDWSxFQW80Q047QUFDakIsUUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFDQSxRQUFJQyxVQUFVLEdBQUcsRUFBakI7O0FBQ0EsUUFBSSxLQUFLbE8sWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLFVBQUksQ0FBQ3hILGFBQUwsRUFBb0I7QUFDbEJBLFFBQUFBLGFBQWEsR0FBRyxJQUFoQjtBQUNBOEYsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEcU4sY0FBOUQ7QUFDQS9PLFFBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0EsWUFBSWlJLGVBQWUsR0FBRy9JLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVzRixpQkFBN0UsRUFBdEI7QUFDQSxZQUFJSyxNQUFNLEdBQUdoSix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxFQUFiO0FBQ0F2QixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTJNLElBQVo7QUFDQTVNLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZaUcsTUFBTSxDQUFDMUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQzFHLFNBQXREO0FBQ0FtQyxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBN0YsQ0FBK0cvRSxRQUEvRyxHQUEwSCxJQUExSDs7QUFFQSxZQUFJUSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGd0MsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILElBQTlILEVBQW9JO0FBQ2xJLGNBQUlnRCxNQUFNLEdBQUcsQ0FBQyxDQUFkOztBQUNBLGVBQUssSUFBSXRGLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHc0UsZUFBZSxDQUFDbkYsTUFBNUMsRUFBb0RhLEtBQUssRUFBekQsRUFBNkQ7QUFDM0QsZ0JBQUlzRSxlQUFlLENBQUN0RSxLQUFELENBQWYsQ0FBdUJILGdCQUF2QixDQUF3Q0MsaUJBQXhDLENBQTBEMUcsU0FBMUQsSUFBdUU2UixJQUEzRSxFQUFpRjtBQUMvRTNGLGNBQUFBLE1BQU0sR0FBR3RGLEtBQVQ7QUFDQTtBQUNEO0FBQ0Y7O0FBRURtTCxVQUFBQSxVQUFVLEdBQUcsaUJBQWlCN0csZUFBZSxDQUFDZ0IsTUFBRCxDQUFmLENBQXdCekYsZ0JBQXhCLENBQXlDQyxpQkFBekMsQ0FBMkQzRyxVQUF6RjtBQUNBK1IsVUFBQUEsUUFBUSxHQUNOLHFCQUNBNUcsZUFBZSxDQUFDZ0IsTUFBRCxDQUFmLENBQXdCekYsZ0JBQXhCLENBQXlDQyxpQkFBekMsQ0FBMkRoRyxJQUQzRCxHQUVBLElBRkEsR0FHQSxpQ0FIQSxHQUlBd0ssZUFBZSxDQUFDZ0IsTUFBRCxDQUFmLENBQXdCekYsZ0JBQXhCLENBQXlDQyxpQkFBekMsQ0FBMkRwRixXQUozRCxHQUtBLElBTEEsR0FNQSx1Q0FOQSxHQU9BNEosZUFBZSxDQUFDZ0IsTUFBRCxDQUFmLENBQXdCekYsZ0JBQXhCLENBQXlDQyxpQkFBekMsQ0FBMkRuRixXQVAzRCxHQVFBLElBUkEsR0FTQSxnQkFUQSxHQVVBMkosZUFBZSxDQUFDZ0IsTUFBRCxDQUFmLENBQXdCekYsZ0JBQXhCLENBQXlDQyxpQkFBekMsQ0FBMkRsRixhQVYzRCxHQVdBLElBWEEsR0FZQSxrQkFaQSxHQWFBMEosZUFBZSxDQUFDZ0IsTUFBRCxDQUFmLENBQXdCekYsZ0JBQXhCLENBQXlDQyxpQkFBekMsQ0FBMkRoRixlQWIzRCxHQWNBLElBZEEsR0FlQSxrQkFmQSxHQWdCQXdKLGVBQWUsQ0FBQ2dCLE1BQUQsQ0FBZixDQUF3QnpGLGdCQUF4QixDQUF5Q0MsaUJBQXpDLENBQTJEakYsZ0JBaEIzRCxHQWlCQSxJQWpCQSxHQWtCQSx1QkFsQkEsR0FtQkF5SixlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0J6RixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRHJGLFVBbkIzRCxHQW9CQSxJQXJCRjtBQXVCQWMsVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNNLGdCQUExRCxDQUEyRUYsVUFBM0UsRUFBdUZELFFBQXZGO0FBQ0QsU0FsQ0QsTUFrQ087QUFDTCxjQUFJM0csTUFBTSxDQUFDMUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQzFHLFNBQTFDLElBQXVENlIsSUFBM0QsRUFBaUU7QUFDL0Q7QUFDQUUsWUFBQUEsVUFBVSxHQUFHLGtDQUFiO0FBQ0FELFlBQUFBLFFBQVEsR0FDTixxQkFDQTNHLE1BQU0sQ0FBQzFFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMENoRyxJQUQxQyxHQUVBLElBRkEsR0FHQSxpQ0FIQSxHQUlBeUssTUFBTSxDQUFDMUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ3BGLFdBSjFDLEdBS0EsSUFMQSxHQU1BLHVDQU5BLEdBT0E2SixNQUFNLENBQUMxRSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDbkYsV0FQMUMsR0FRQSxJQVJBLEdBU0EsZ0JBVEEsR0FVQTRKLE1BQU0sQ0FBQzFFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMENsRixhQVYxQyxHQVdBLElBWEEsR0FZQSxrQkFaQSxHQWFBMkosTUFBTSxDQUFDMUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ2hGLGVBYjFDLEdBY0EsSUFkQSxHQWVBLGtCQWZBLEdBZ0JBeUosTUFBTSxDQUFDMUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ2pGLGdCQWhCMUMsR0FpQkEsSUFqQkEsR0FrQkEsdUJBbEJBLEdBbUJBMEosTUFBTSxDQUFDMUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ3JGLFVBbkIxQyxHQW9CQSxJQXJCRjs7QUF1QkEsZ0JBQUk2USxZQUFZLEdBQUc3RCxRQUFRLENBQUNsTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb08saUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUMsUUFBbkUsQ0FBM0I7O0FBQ0EsZ0JBQUlDLE1BQU0sR0FBR0osWUFBWSxHQUFHN0QsUUFBUSxDQUFDbEQsTUFBTSxDQUFDMUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ3JGLFVBQTNDLENBQXBDOztBQUNBYyxZQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb08saUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUMsUUFBbEUsR0FBNkVDLE1BQU0sQ0FBQ0MsUUFBUCxFQUE3RTs7QUFFQSxnQkFBSUMsSUFBSSxHQUFHbkUsUUFBUSxDQUFDbE0sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29PLGlCQUFsQyxHQUFzREMsV0FBdEQsQ0FBa0VLLFFBQW5FLENBQW5COztBQUNBRCxZQUFBQSxJQUFJLEdBQUdBLElBQUksR0FBRyxDQUFkO0FBQ0FyUSxZQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb08saUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUssUUFBbEUsR0FBNkVELElBQUksQ0FBQ0QsUUFBTCxFQUE3RTtBQUVBcFEsWUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29PLGlCQUFsQyxHQUFzRE8sY0FBdEQsQ0FBcUUsQ0FBQyxDQUF0RSxFQUF5RUYsSUFBekUsRUFBK0UsQ0FBQyxDQUFoRjtBQUVBclEsWUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNNLGdCQUExRCxDQUEyRUYsVUFBM0UsRUFBdUZELFFBQXZGO0FBQ0QsV0FyQ0QsTUFxQ087QUFDTDtBQUNBQyxZQUFBQSxVQUFVLEdBQUcsd0NBQWI7QUFDQUQsWUFBQUEsUUFBUSxHQUNOLHFCQUNBM0csTUFBTSxDQUFDMUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ2hHLElBRDFDLEdBRUEsSUFGQSxHQUdBLGlDQUhBLEdBSUF5SyxNQUFNLENBQUMxRSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDcEYsV0FKMUMsR0FLQSxJQUxBLEdBTUEsdUNBTkEsR0FPQTZKLE1BQU0sQ0FBQzFFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMENuRixXQVAxQyxHQVFBLElBUkEsR0FTQSxnQkFUQSxHQVVBNEosTUFBTSxDQUFDMUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ2xGLGFBVjFDLEdBV0EsSUFYQSxHQVlBLGtCQVpBLEdBYUEySixNQUFNLENBQUMxRSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDaEYsZUFiMUMsR0FjQSxJQWRBLEdBZUEsa0JBZkEsR0FnQkF5SixNQUFNLENBQUMxRSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDakYsZ0JBaEIxQyxHQWlCQSxJQWpCQSxHQWtCQSx1QkFsQkEsR0FtQkEwSixNQUFNLENBQUMxRSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDckYsVUFuQjFDLEdBb0JBLElBckJGO0FBdUJBYyxZQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEc00sZ0JBQTFELENBQTJFRixVQUEzRSxFQUF1RkQsUUFBdkY7QUFDRDtBQUNGO0FBQ0Y7QUFDRixLQWxIRCxNQWtITyxJQUFJLEtBQUtqTyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDO0FBQ0FaLE1BQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0EsVUFBSWlJLGVBQWUsR0FBRyxLQUFLN0gsY0FBM0I7QUFDQSxVQUFJOEgsTUFBTSxHQUFHLEtBQUs5SCxjQUFMLENBQW9CLENBQXBCLENBQWI7QUFDQTRCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMk0sSUFBWjtBQUNBNU0sTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlpRyxNQUFNLENBQUNuTCxTQUFuQjtBQUNBLFdBQUtxRCxjQUFMLENBQW9CLENBQXBCLEVBQXVCMUIsUUFBdkIsR0FBa0MsSUFBbEM7O0FBRUEsVUFBSXdKLE1BQU0sQ0FBQ25MLFNBQVAsSUFBb0I2UixJQUF4QixFQUE4QjtBQUM1QjtBQUNBRSxRQUFBQSxVQUFVLEdBQUcsa0NBQWI7QUFDQUQsUUFBQUEsUUFBUSxHQUNOLHFCQUNBM0csTUFBTSxDQUFDekssSUFEUCxHQUVBLElBRkEsR0FHQSxpQ0FIQSxHQUlBeUssTUFBTSxDQUFDN0osV0FKUCxHQUtBLElBTEEsR0FNQSx1Q0FOQSxHQU9BNkosTUFBTSxDQUFDNUosV0FQUCxHQVFBLElBUkEsR0FTQSxnQkFUQSxHQVVBNEosTUFBTSxDQUFDM0osYUFWUCxHQVdBLElBWEEsR0FZQSxrQkFaQSxHQWFBMkosTUFBTSxDQUFDekosZUFiUCxHQWNBLElBZEEsR0FlQSxrQkFmQSxHQWdCQXlKLE1BQU0sQ0FBQzFKLGdCQWhCUCxHQWlCQSxJQWpCQSxHQWtCQSx1QkFsQkEsR0FtQkEwSixNQUFNLENBQUM5SixVQW5CUCxHQW9CQSxJQXBCQSxHQXFCQSw4QkFyQkEsR0FzQkEsS0FBS2dDLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUJoQyxVQXRCdkIsR0F1QkEsSUF4QkY7O0FBMEJBLFlBQUk2USxZQUFZLEdBQUc3RCxRQUFRLENBQUNsTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb08saUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUMsUUFBbkUsQ0FBM0I7O0FBQ0EsWUFBSUMsTUFBTSxHQUFHSixZQUFZLEdBQUc3RCxRQUFRLENBQUNsRCxNQUFNLENBQUM5SixVQUFSLENBQXBDOztBQUNBYyxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb08saUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUMsUUFBbEUsR0FBNkVDLE1BQU0sQ0FBQ0MsUUFBUCxFQUE3RTs7QUFFQSxZQUFJQyxJQUFJLEdBQUduRSxRQUFRLENBQUNsTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb08saUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUssUUFBbkUsQ0FBbkI7O0FBQ0FELFFBQUFBLElBQUksR0FBR0EsSUFBSSxHQUFHLENBQWQ7QUFDQXJRLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NvTyxpQkFBbEMsR0FBc0RDLFdBQXRELENBQWtFSyxRQUFsRSxHQUE2RUQsSUFBSSxDQUFDRCxRQUFMLEVBQTdFO0FBQ0FwUSxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb08saUJBQWxDLEdBQXNETyxjQUF0RCxDQUFxRSxDQUFDLENBQXRFLEVBQXlFRixJQUF6RSxFQUErRSxDQUFDLENBQWhGO0FBRUFyUSxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEc00sZ0JBQTFELENBQTJFRixVQUEzRSxFQUF1RkQsUUFBdkY7QUFDRCxPQXZDRCxNQXVDTztBQUNMO0FBRUFDLFFBQUFBLFVBQVUsR0FBRyx3Q0FBYjtBQUNBRCxRQUFBQSxRQUFRLEdBQ04scUJBQ0EzRyxNQUFNLENBQUN6SyxJQURQLEdBRUEsSUFGQSxHQUdBLGlDQUhBLEdBSUF5SyxNQUFNLENBQUM3SixXQUpQLEdBS0EsSUFMQSxHQU1BLHVDQU5BLEdBT0E2SixNQUFNLENBQUM1SixXQVBQLEdBUUEsSUFSQSxHQVNBLGdCQVRBLEdBVUE0SixNQUFNLENBQUMzSixhQVZQLEdBV0EsSUFYQSxHQVlBLGtCQVpBLEdBYUEySixNQUFNLENBQUN6SixlQWJQLEdBY0EsSUFkQSxHQWVBLGtCQWZBLEdBZ0JBeUosTUFBTSxDQUFDMUosZ0JBaEJQLEdBaUJBLElBakJBLEdBa0JBLHVCQWxCQSxHQW1CQTBKLE1BQU0sQ0FBQzlKLFVBbkJQLEdBb0JBLElBcEJBLEdBcUJBLDhCQXJCQSxHQXNCQSxLQUFLZ0MsY0FBTCxDQUFvQixDQUFwQixFQUF1QmhDLFVBdEJ2QixHQXVCQSxJQXhCRjtBQTBCQWMsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNNLGdCQUExRCxDQUEyRUYsVUFBM0UsRUFBdUZELFFBQXZGO0FBQ0Q7QUFDRjtBQUNGLEdBMWtEd0I7QUE0a0R6QmEsRUFBQUEsb0JBNWtEeUIsZ0NBNGtESnhLLEtBNWtESSxFQTRrREc7QUFBQTs7QUFDMUIsUUFBSXFJLE1BQU0sR0FBR3JJLEtBQUssQ0FBQ3lLLEdBQW5COztBQUNBLFFBQUlwQyxNQUFKLEVBQVk7QUFDVixXQUFLRCxnQkFBTCxDQUFzQixJQUF0QixFQUE0QixLQUE1QjtBQUVBcE8sTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRG9GLFNBQTFELENBQW9FLHNDQUFwRSxFQUE0RyxJQUE1RyxFQUFrSCxLQUFsSDtBQUNBckMsTUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixRQUFBLE1BQUksQ0FBQ21LLGlCQUFMOztBQUVBLFlBQUlDLEdBQUcsR0FBRyxDQUFDLENBQVg7QUFDQSxZQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxZQUFJQyxXQUFXLEdBQUcsTUFBSSxDQUFDM1AsY0FBdkI7O0FBRUEsYUFBSyxJQUFJdUQsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdvTSxXQUFXLENBQUNqTixNQUF4QyxFQUFnRGEsS0FBSyxFQUFyRCxFQUF5RDtBQUN2RCxjQUFJcU0sTUFBTSxHQUFHRCxXQUFXLENBQUNwTSxLQUFELENBQVgsQ0FBbUJ2RixVQUFoQzs7QUFFQSxjQUFJNFIsTUFBTSxHQUFHSCxHQUFiLEVBQWtCO0FBQ2hCQyxZQUFBQSxXQUFXLEdBQUduTSxLQUFkO0FBQ0FrTSxZQUFBQSxHQUFHLEdBQUdHLE1BQU47QUFDRDtBQUNGOztBQUVELGFBQUssSUFBSXJNLE9BQUssR0FBRyxDQUFqQixFQUFvQkEsT0FBSyxHQUFHb00sV0FBVyxDQUFDak4sTUFBeEMsRUFBZ0RhLE9BQUssRUFBckQsRUFBeUQ7QUFDdkQsY0FBSW9NLFdBQVcsQ0FBQ3BNLE9BQUQsQ0FBWCxDQUFtQmhGLFFBQXZCLEVBQWlDO0FBQy9CLGdCQUFJcVIsTUFBTSxHQUFHRCxXQUFXLENBQUNwTSxPQUFELENBQVgsQ0FBbUJ2RixVQUFoQztBQUNBNEQsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkrTixNQUFaO0FBQ0Q7QUFDRjs7QUFFRGhPLFFBQUFBLE9BQU8sQ0FBQ2lPLEtBQVIsQ0FBYyw0QkFBNEJGLFdBQVcsQ0FBQ0QsV0FBRCxDQUFYLENBQXlCL1MsU0FBbkU7O0FBQ0EsUUFBQSxNQUFJLENBQUMwUix5QkFBTCxDQUErQnNCLFdBQVcsQ0FBQ0QsV0FBRCxDQUFYLENBQXlCL1MsU0FBeEQ7QUFDRCxPQXpCUyxFQXlCUCxJQXpCTyxDQUFWO0FBMEJELEtBOUJELE1BOEJPO0FBQ0wsVUFBSW1DLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZ3QyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsS0FBOUgsRUFBcUk7QUFDbkksYUFBS3FILGdCQUFMLENBQXNCLEtBQXRCLEVBQTZCLEtBQTdCO0FBRUFwTyxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb0YsU0FBMUQsQ0FBb0Usc0NBQXBFLEVBQTRHLElBQTVHLEVBQWtILEtBQWxIO0FBQ0FyQyxRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmekQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkvQyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFc0YsaUJBQTdFLEVBQVo7O0FBQ0EsVUFBQSxNQUFJLENBQUMrSCxpQkFBTDs7QUFFQSxVQUFBLE1BQUksQ0FBQ2hNLHdCQUFMLENBQThCLENBQTlCOztBQUVBLGNBQUlpTSxHQUFHLEdBQUcsQ0FBQyxDQUFYO0FBQ0EsY0FBSUMsV0FBVyxHQUFHLENBQWxCO0FBQ0EsY0FBSUMsV0FBVyxHQUFHLE1BQUksQ0FBQzNQLGNBQXZCO0FBQ0E0QixVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWThOLFdBQVo7O0FBRUEsZUFBSyxJQUFJcE0sS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdvTSxXQUFXLENBQUNqTixNQUF4QyxFQUFnRGEsS0FBSyxFQUFyRCxFQUF5RDtBQUN2RCxnQkFBSW9NLFdBQVcsQ0FBQ3BNLEtBQUQsQ0FBWCxDQUFtQmhGLFFBQXZCLEVBQWlDO0FBQy9CLGtCQUFJcVIsTUFBTSxHQUFHRCxXQUFXLENBQUNwTSxLQUFELENBQVgsQ0FBbUJ2RixVQUFoQzs7QUFFQSxrQkFBSTRSLE1BQU0sR0FBR0gsR0FBYixFQUFrQjtBQUNoQkMsZ0JBQUFBLFdBQVcsR0FBR25NLEtBQWQ7QUFDQWtNLGdCQUFBQSxHQUFHLEdBQUdHLE1BQU47QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsZUFBSyxJQUFJck0sT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUdvTSxXQUFXLENBQUNqTixNQUF4QyxFQUFnRGEsT0FBSyxFQUFyRCxFQUF5RDtBQUN2RCxnQkFBSW9NLFdBQVcsQ0FBQ3BNLE9BQUQsQ0FBWCxDQUFtQmhGLFFBQXZCLEVBQWlDO0FBQy9CLGtCQUFJcVIsTUFBTSxHQUFHRCxXQUFXLENBQUNwTSxPQUFELENBQVgsQ0FBbUJ2RixVQUFoQztBQUNBNEQsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkrTixNQUFaO0FBQ0Q7QUFDRjs7QUFFRGhPLFVBQUFBLE9BQU8sQ0FBQ2lPLEtBQVIsQ0FBYyw0QkFBNEJGLFdBQVcsQ0FBQ0QsV0FBRCxDQUFYLENBQXlCL1MsU0FBbkU7O0FBQ0EsVUFBQSxNQUFJLENBQUMwUix5QkFBTCxDQUErQnNCLFdBQVcsQ0FBQ0QsV0FBRCxDQUFYLENBQXlCL1MsU0FBeEQ7QUFDRCxTQS9CUyxFQStCUCxJQS9CTyxDQUFWO0FBZ0NEO0FBQ0Y7QUFDRixHQW5wRHdCO0FBcXBEekJzUSxFQUFBQSx1QkFycER5QixtQ0FxcERERSxNQXJwREMsRUFxcERlO0FBQUEsUUFBaEJBLE1BQWdCO0FBQWhCQSxNQUFBQSxNQUFnQixHQUFQLEtBQU87QUFBQTs7QUFDdEMsUUFBSXJJLEtBQUssR0FBRztBQUFFeUssTUFBQUEsR0FBRyxFQUFFcEM7QUFBUCxLQUFaO0FBQ0EsU0FBS21CLGdDQUFMLENBQXNDeEosS0FBdEM7QUFDRCxHQXhwRHdCO0FBMHBEekJ4RyxFQUFBQSxRQTFwRHlCLG9CQTBwRGhCOE8sY0ExcERnQixFQTBwRFE7QUFBQTs7QUFBQSxRQUF4QkEsY0FBd0I7QUFBeEJBLE1BQUFBLGNBQXdCLEdBQVAsS0FBTztBQUFBOztBQUMvQixRQUFJLEtBQUs1TSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0EsVUFBSTRNLGNBQUosRUFBb0I7QUFDbEIsYUFBS29DLGlCQUFMO0FBQ0Q7O0FBRUQsVUFBSTFRLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZ3QyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsS0FBOUgsRUFBcUk7QUFDbkksYUFBS3JDLHdCQUFMLENBQThCLENBQTlCO0FBRUEsWUFBSXFFLGVBQWUsR0FBRy9JLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVzRixpQkFBN0UsRUFBdEI7QUFDQSxZQUFJcUksZUFBZSxHQUFHLENBQXRCO0FBRUEsYUFBSzlQLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDcEQsY0FBckMsR0FBc0QsSUFBdEQsQ0FObUksQ0FRbkk7QUFDQTtBQUNBOztBQUVBLGFBQUssSUFBSXdGLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUt2RCxjQUFMLENBQW9CMEMsTUFBaEQsRUFBd0RhLEtBQUssRUFBN0QsRUFBaUU7QUFDL0QsY0FBSSxLQUFLdkQsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCaEYsUUFBM0IsSUFBdUMsS0FBdkMsSUFBZ0QsS0FBS3lCLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQnhGLGNBQS9FLEVBQStGK1IsZUFBZTtBQUMvRzs7QUFFRGxPLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVCQUF1QmlPLGVBQW5DO0FBQ0FsTyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw2QkFBNkIsS0FBSzdCLGNBQUwsQ0FBb0IwQyxNQUE3RDs7QUFDQSxZQUFJb04sZUFBZSxJQUFJLEtBQUs5UCxjQUFMLENBQW9CMEMsTUFBdkMsSUFBaUQwSyxjQUFyRCxFQUFxRTtBQUNuRTtBQUNBeE4sVUFBQUEsVUFBVSxHQUFHLElBQWI7O0FBQ0EsY0FBSXdOLGNBQUosRUFBb0I7QUFDbEIvSCxZQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLGNBQUEsTUFBSSxDQUFDNEgsdUJBQUwsQ0FBNkIsS0FBN0I7QUFDRCxhQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsV0FKRCxNQUlPLElBQUksS0FBS2pOLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDeEUsU0FBckMsSUFBa0RtQyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGVyxJQUE3RixDQUFrR1csTUFBeEosRUFBZ0s7QUFDckssZ0JBQUksQ0FBQ3pGLFlBQUQsSUFBaUIsQ0FBQ0MsWUFBdEIsRUFBb0M7QUFDbEMsbUJBQUsrTix1QkFBTCxDQUE2QixLQUE3QjtBQUNELGFBRkQsTUFFTztBQUNMcE8sY0FBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQSxtQkFBS21PLGdCQUFMO0FBQ0Q7QUFDRjtBQUNGLFNBZkQsTUFlTztBQUNMLGNBQUksQ0FBQ3BOLFVBQUwsRUFBaUI7QUFDZixnQkFBSSxLQUFLSSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLGtCQUFJLENBQUN6RixZQUFELElBQWlCLENBQUNDLFlBQXRCLEVBQW9DO0FBQ2xDTCxnQkFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQSxxQkFBS21PLGdCQUFMO0FBQ0Q7QUFDRixhQUxELE1BS087QUFDTG5PLGNBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0EsbUJBQUttTyxnQkFBTDtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0YsS0FyREQsTUFxRE8sSUFBSSxLQUFLeE0sWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQztBQUNBLFVBQUksS0FBS1IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN0RSxLQUF6QyxFQUFnRHBFLFdBQVcsR0FBRyxJQUFkLENBQWhELEtBQ0tELFlBQVksR0FBRyxJQUFmO0FBRUxvSixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBbUJySixZQUEvQjtBQUNBb0osTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQWtCcEosV0FBOUIsRUFOaUMsQ0FPakM7O0FBQ0EsVUFBSXFYLGVBQWUsR0FBRyxDQUF0QjtBQUNBLFdBQUs5UCxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BELGNBQXJDLEdBQXNELElBQXREO0FBRUEsVUFBSThKLGVBQWUsR0FBRyxLQUFLN0gsY0FBM0I7O0FBQ0EsV0FBSyxJQUFJdUQsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUdzRSxlQUFlLENBQUNuRixNQUE1QyxFQUFvRGEsT0FBSyxFQUF6RCxFQUE2RDtBQUMzRCxZQUFJc0UsZUFBZSxDQUFDdEUsT0FBRCxDQUFmLENBQXVCeEYsY0FBM0IsRUFBMkMrUixlQUFlO0FBQzNEOztBQUVELFVBQUlBLGVBQWUsSUFBSSxLQUFLOVAsY0FBTCxDQUFvQjBDLE1BQTNDLEVBQW1EO0FBQ2pEO0FBQ0FqSyxRQUFBQSxXQUFXLEdBQUcsSUFBZDtBQUNBRCxRQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNBb0gsUUFBQUEsVUFBVSxHQUFHLElBQWI7O0FBRUEsWUFBSSxDQUFDWCxZQUFELElBQWlCLENBQUNDLFlBQXRCLEVBQW9DO0FBQ2xDLGVBQUsrTix1QkFBTCxDQUE2QixJQUE3QjtBQUNEO0FBQ0YsT0FURCxNQVNPO0FBQ0wsWUFBSSxDQUFDck4sVUFBTCxFQUFpQjtBQUNmLGNBQUksQ0FBQ1gsWUFBRCxJQUFpQixDQUFDQyxZQUF0QixFQUFvQztBQUNsQ0wsWUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQSxpQkFBS21PLGdCQUFMO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRixHQWx2RHdCO0FBbXZEekJILEVBQUFBLGFBQWEsRUFBRSx5QkFBWTtBQUFBOztBQUN6QixRQUFJbk8sV0FBVyxJQUFJSSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJCLE1BQTdFLEVBQXFGO0FBQ25GZCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaO0FBQ0EsV0FBS2tPLGFBQUw7QUFFQTFLLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsUUFBQSxNQUFJLENBQUMvRyxRQUFMLENBQWMsS0FBZDtBQUNELE9BRlMsRUFFUCxJQUZPLENBQVY7QUFHRCxLQVBELE1BT087QUFDTCxVQUFJLENBQUNzQixVQUFMLEVBQWlCO0FBQ2ZqQixRQUFBQSxRQUFRLEdBQUdBLFFBQVEsR0FBRyxDQUF0Qjs7QUFDQSxZQUFJaUYsTUFBTSxHQUFHN0osRUFBRSxDQUFDOEosSUFBSCxDQUFRL0Usd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dDLENBQTFHLEVBQTZHcEYsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dFLENBQS9NLENBQWI7O0FBQ0EsYUFBSzZMLFdBQUwsQ0FBaUIsS0FBSzFQLGNBQUwsQ0FBb0IsS0FBS2EsVUFBekIsQ0FBakIsRUFBdUR5QyxNQUF2RDtBQUNEO0FBQ0Y7QUFDRixHQWx3RHdCO0FBb3dEekI2RSxFQUFBQSxTQUFTLEVBQUUsbUJBQVV3SCxHQUFWLEVBQWVSLEdBQWYsRUFBb0I7QUFDN0IsV0FBTzNELElBQUksQ0FBQ29FLEtBQUwsQ0FBV3BFLElBQUksQ0FBQ0MsTUFBTCxNQUFpQjBELEdBQUcsR0FBR1EsR0FBdkIsQ0FBWCxJQUEwQ0EsR0FBakQsQ0FENkIsQ0FDeUI7QUFDdkQsR0F0d0R3QjtBQXd3RHpCdkYsRUFBQUEsV0FBVyxFQUFFLHFCQUFVRCxJQUFWLEVBQWdCMEYsTUFBaEIsRUFBd0JDLElBQXhCLEVBQThCO0FBQUE7O0FBQ3pDclcsSUFBQUEsRUFBRSxDQUFDc1csS0FBSCxDQUFTLEtBQUtqUSxVQUFkLEVBQ0drUSxFQURILENBQ01GLElBRE4sRUFDWTtBQUFFbk0sTUFBQUEsUUFBUSxFQUFFbEssRUFBRSxDQUFDd1csRUFBSCxDQUFNOUYsSUFBSSxDQUFDdkcsQ0FBWCxFQUFjdUcsSUFBSSxDQUFDdEcsQ0FBbkI7QUFBWixLQURaLEVBQ2lEO0FBQUVxTSxNQUFBQSxNQUFNLEVBQUU7QUFBVixLQURqRCxFQUVHQyxJQUZILENBRVEsWUFBTTtBQUNWLFVBQUlOLE1BQUosRUFBWSxNQUFJLENBQUNPLFlBQUwsR0FBWixLQUNLLE1BQUksQ0FBQ1gsYUFBTDtBQUNOLEtBTEgsRUFNR1ksS0FOSDtBQU9ELEdBaHhEd0I7QUFreER6QkQsRUFBQUEsWUFseER5QiwwQkFreERWO0FBQUE7O0FBQ2JyTCxJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFVBQUksTUFBSSxDQUFDdEQsTUFBTCxDQUFZNkgsU0FBWixHQUF3QixDQUE1QixFQUErQjtBQUM3QixRQUFBLE1BQUksQ0FBQzdILE1BQUwsQ0FBWTZILFNBQVosR0FBd0IsTUFBSSxDQUFDN0gsTUFBTCxDQUFZNkgsU0FBWixHQUF3QixJQUFoRDs7QUFDQSxRQUFBLE1BQUksQ0FBQzhHLFlBQUw7QUFDRCxPQUhELE1BR087QUFDTCxRQUFBLE1BQUksQ0FBQzNPLE1BQUwsQ0FBWTZILFNBQVosR0FBd0IsQ0FBeEI7QUFDQSxRQUFBLE1BQUksQ0FBQzNILGVBQUwsR0FBdUIsSUFBdkI7O0FBQ0EsUUFBQSxNQUFJLENBQUM0SyxhQUFMO0FBQ0Q7QUFDRixLQVRTLEVBU1AsRUFUTyxDQUFWO0FBVUQsR0E3eER3QjtBQSt4RHpCK0QsRUFBQUEscUJBL3hEeUIsaUNBK3hESHpELE1BL3hERyxFQSt4RGE7QUFBQSxRQUFoQkEsTUFBZ0I7QUFBaEJBLE1BQUFBLE1BQWdCLEdBQVAsS0FBTztBQUFBOztBQUNwQyxRQUFJek8sV0FBVyxHQUFHSSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJCLE1BQTVFLEVBQW9GO0FBQ2xGLFVBQUlzSSxRQUFRLENBQUNsTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJGLFdBQTFELEVBQXVFc0YsaUJBQXZFLENBQXlGaEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0hpSixTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUF3SixDQUE1SixFQUErSjtBQUM3SmpNLFFBQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0F0RyxRQUFBQSxtQkFBbUIsR0FBR0EsbUJBQW1CLEdBQUcsQ0FBNUM7QUFDRDs7QUFFRCxVQUFJcVMsUUFBUSxDQUFDbE0sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RmhDLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIaUosU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQVIsSUFBd0osQ0FBNUosRUFBK0o7QUFDN0poTSxRQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNBdEcsUUFBQUEsbUJBQW1CO0FBQ25CRCxRQUFBQSxtQkFBbUI7QUFDcEI7QUFDRjs7QUFFRHdHLElBQUFBLGtCQUFrQixHQUFHLEtBQUthLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDcEUsaUJBQXJDLENBQXVEakIsaUJBQTVFO0FBQ0FzRCxJQUFBQSxnQkFBZ0IsR0FBRyxLQUFLWSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RFosa0JBQTFFOztBQUVBLFFBQUk4QyxZQUFZLElBQUksQ0FBQ0MsWUFBakIsSUFBaUMsQ0FBQ0Msa0JBQXRDLEVBQTBEO0FBQ3hEO0FBQ0E7QUFDQSxXQUFLMFIsMEJBQUwsQ0FBZ0MsS0FBaEMsRUFBdUMxRCxNQUF2QztBQUNELEtBSkQsTUFJTyxJQUFJak8sWUFBWSxJQUFLRCxZQUFZLElBQUlFLGtCQUFyQyxFQUEwRDtBQUMvRDtBQUNBO0FBQ0EsV0FBSzBSLDBCQUFMLENBQWdDLElBQWhDLEVBQXNDMUQsTUFBdEM7QUFDRCxLQUpNLE1BSUE7QUFDTCxXQUFLUixZQUFMO0FBQ0Q7QUFDRixHQTN6RHdCO0FBNnpEekI2QyxFQUFBQSxpQkE3ekR5QiwrQkE2ekRMO0FBQUE7O0FBQ2xCbkssSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixVQUFJLE1BQUksQ0FBQ3RELE1BQUwsQ0FBWTZILFNBQVosSUFBeUIsQ0FBN0IsRUFBZ0M7QUFDOUIsUUFBQSxNQUFJLENBQUMzSCxlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsUUFBQSxNQUFJLENBQUNGLE1BQUwsQ0FBWTZILFNBQVosR0FBd0IsTUFBSSxDQUFDN0gsTUFBTCxDQUFZNkgsU0FBWixHQUF3QixJQUFoRDs7QUFDQSxRQUFBLE1BQUksQ0FBQzRGLGlCQUFMO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsUUFBQSxNQUFJLENBQUNwUCxVQUFMLENBQWdCNkQsUUFBaEIsR0FBMkJsSyxFQUFFLENBQUM4SixJQUFILENBQVEsQ0FBUixFQUFXLENBQVgsQ0FBM0I7QUFDQSxRQUFBLE1BQUksQ0FBQzlCLE1BQUwsQ0FBWTZILFNBQVosR0FBd0IsQ0FBeEI7QUFDRDtBQUNGLEtBVFMsRUFTUCxFQVRPLENBQVY7QUFVRCxHQXgwRHdCO0FBMDBEekJtRyxFQUFBQSxhQTEwRHlCLDJCQTAwRFQ7QUFBQTs7QUFDZDFLLElBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsVUFBSSxPQUFJLENBQUN0RCxNQUFMLENBQVk2SCxTQUFaLElBQXlCLENBQTdCLEVBQWdDO0FBQzlCLFFBQUEsT0FBSSxDQUFDM0gsZUFBTCxHQUF1QixLQUF2QjtBQUNBLFFBQUEsT0FBSSxDQUFDRixNQUFMLENBQVk2SCxTQUFaLEdBQXdCLE9BQUksQ0FBQzdILE1BQUwsQ0FBWTZILFNBQVosR0FBd0IsSUFBaEQ7O0FBQ0EsUUFBQSxPQUFJLENBQUNtRyxhQUFMO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsUUFBQSxPQUFJLENBQUMzUCxVQUFMLENBQWdCNkQsUUFBaEIsR0FBMkJsSyxFQUFFLENBQUM4SixJQUFILENBQVEsQ0FBUixFQUFXLENBQVgsQ0FBM0I7QUFDQSxRQUFBLE9BQUksQ0FBQzlCLE1BQUwsQ0FBWTZILFNBQVosR0FBd0IsQ0FBeEIsQ0FGSyxDQUdMOztBQUNBOUssUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRGdJLDJCQUExRCxDQUFzRixDQUF0Rjs7QUFFQSxZQUFJLE9BQUksQ0FBQzlKLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsY0FBSSxPQUFJLENBQUNSLGNBQUwsQ0FBb0IsT0FBSSxDQUFDbUIsVUFBekIsRUFBcUN0RSxLQUFyQyxJQUE4QyxDQUFDcEUsV0FBbkQsRUFBZ0U7QUFDOUQsWUFBQSxPQUFJLENBQUNtWSxxQkFBTCxDQUEyQixPQUFJLENBQUM1USxjQUFMLENBQW9CLE9BQUksQ0FBQ21CLFVBQXpCLEVBQXFDdEUsS0FBaEU7QUFDRCxXQUZELE1BRU87QUFDTCxnQkFBSSxDQUFDLE9BQUksQ0FBQ21ELGNBQUwsQ0FBb0IsT0FBSSxDQUFDbUIsVUFBekIsRUFBcUN0RSxLQUF0QyxJQUErQyxDQUFDckUsWUFBcEQsRUFBa0U7QUFDaEUsY0FBQSxPQUFJLENBQUNvWSxxQkFBTCxDQUEyQixPQUFJLENBQUM1USxjQUFMLENBQW9CLE9BQUksQ0FBQ21CLFVBQXpCLEVBQXFDdEUsS0FBaEU7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsWUFBSSxPQUFJLENBQUMyRCxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0EsY0FBSTFILFVBQUosRUFBZ0I7QUFDZDtBQUNBQSxZQUFBQSxVQUFVLEdBQUcsS0FBYjtBQUNEOztBQUVELGNBQUksT0FBSSxDQUFDa0gsY0FBTCxDQUFvQixPQUFJLENBQUNtQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLLE9BQUksQ0FBQ2tNLHFCQUFMLEdBQWhLLEtBQ0ssT0FBSSxDQUFDakUsWUFBTDtBQUNOO0FBQ0Y7QUFDRixLQWhDUyxFQWdDUCxFQWhDTyxDQUFWO0FBaUNELEdBNTJEd0I7QUE4MkR6QnFELEVBQUFBLFdBQVcsRUFBRSxxQkFBVTdQLElBQVYsRUFBZ0IyUSxLQUFoQixFQUF1QjtBQUFBOztBQUNsQyxRQUFJQyxLQUFLLEdBQUcsR0FBWixDQURrQyxDQUVsQzs7QUFFQWhYLElBQUFBLEVBQUUsQ0FBQ3NXLEtBQUgsQ0FBU2xRLElBQVQsRUFBZTtBQUFmLEtBQ0dtUSxFQURILENBQ01TLEtBRE4sRUFDYTtBQUFFOU0sTUFBQUEsUUFBUSxFQUFFbEssRUFBRSxDQUFDd1csRUFBSCxDQUFNTyxLQUFLLENBQUM1TSxDQUFaLEVBQWU0TSxLQUFLLENBQUMzTSxDQUFyQjtBQUFaLEtBRGIsRUFDb0Q7QUFBRXFNLE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBRHBELEVBRUdDLElBRkgsQ0FFUSxZQUFNO0FBQ1YsVUFBSTlSLFFBQVEsR0FBR0MsUUFBZixFQUF5QjtBQUN2QjtBQUVBLFlBQUksT0FBSSxDQUFDNEIsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLGNBQUksT0FBSSxDQUFDUixjQUFMLENBQW9CLE9BQUksQ0FBQ21CLFVBQXpCLEVBQXFDdEUsS0FBekMsRUFBZ0Q7QUFDOUMsZ0JBQUksQ0FBQ3BFLFdBQUwsRUFBa0I7QUFDaEIsa0JBQ0V1UyxRQUFRLENBQUNsTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJGLFdBQTFELEVBQXVFc0YsaUJBQXZFLENBQXlGaEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0hpSixTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUF3SixDQUF4SixJQUNBRixRQUFRLENBQUNsTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJGLFdBQTFELEVBQXVFc0YsaUJBQXZFLENBQXlGaEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0hpSixTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUF3SixDQUYxSixFQUdFO0FBQ0FqTSxnQkFBQUEsWUFBWSxHQUFHLElBQWY7QUFDQXRHLGdCQUFBQSxtQkFBbUI7QUFDcEI7QUFDRixhQVJELE1BUU87QUFDTGlKLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0FBQ0Q7QUFDRixXQVpELE1BWU87QUFDTCxnQkFBSSxDQUFDckosWUFBTCxFQUFtQjtBQUNqQixrQkFDRXdTLFFBQVEsQ0FBQ2xNLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NvRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEckYsV0FBMUQsRUFBdUVzRixpQkFBdkUsQ0FBeUZoQyxZQUF6RixDQUFzRyxjQUF0RyxFQUFzSGlKLFNBQXRILENBQWdJQyxVQUFqSSxDQUFSLElBQXdKLENBQXhKLElBQ0FGLFFBQVEsQ0FBQ2xNLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NvRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEckYsV0FBMUQsRUFBdUVzRixpQkFBdkUsQ0FBeUZoQyxZQUF6RixDQUFzRyxjQUF0RyxFQUFzSGlKLFNBQXRILENBQWdJQyxVQUFqSSxDQUFSLElBQXdKLENBRjFKLEVBR0U7QUFDQWpNLGdCQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNBdEcsZ0JBQUFBLG1CQUFtQjtBQUNwQixlQVBnQixDQVNqQjs7QUFDRCxhQVZELE1BVU87QUFDTGlKLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFaO0FBQ0Q7QUFDRixXQTVCeUIsQ0E4QjFCOztBQUNEOztBQUVELFlBQUksT0FBSSxDQUFDckIsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixjQUFJLE9BQUksQ0FBQ1IsY0FBTCxDQUFvQixPQUFJLENBQUNtQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLGdCQUFJLENBQUMsT0FBSSxDQUFDMUUsY0FBTCxDQUFvQixPQUFJLENBQUNtQixVQUF6QixFQUFxQ3BELGNBQTFDLEVBQTBEO0FBQ3hELGtCQUFJaU4sUUFBUSxDQUFDbE0sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RmhDLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIaUosU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQVIsSUFBd0osQ0FBNUosRUFBK0o7QUFDN0pqTSxnQkFBQUEsWUFBWSxHQUFHLElBQWY7QUFDQXRHLGdCQUFBQSxtQkFBbUI7QUFDcEI7O0FBRUQsa0JBQUlxUyxRQUFRLENBQUNsTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJGLFdBQTFELEVBQXVFc0YsaUJBQXZFLENBQXlGaEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0hpSixTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUF3SixDQUE1SixFQUErSjtBQUM3SmhNLGdCQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNBdEcsZ0JBQUFBLG1CQUFtQjtBQUNuQkQsZ0JBQUFBLG1CQUFtQjtBQUNwQjtBQUNGLGFBWEQsTUFXTztBQUNMaUosY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQXdCLE9BQUksQ0FBQzdCLGNBQUwsQ0FBb0IsT0FBSSxDQUFDbUIsVUFBekIsRUFBcUN6RSxVQUF6RTtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxZQUFJZ0MsV0FBVyxHQUFHSSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJCLE1BQTVFLEVBQW9GO0FBQ2xGLGNBQUloRSxXQUFXLElBQUksRUFBbkIsRUFBdUJBLFdBQVcsR0FBR0EsV0FBVyxHQUFHLEVBQTVCLENBQXZCLEtBQ0tBLFdBQVcsR0FBR0EsV0FBVyxHQUFHLENBQTVCO0FBQ04sU0FIRCxNQUdPO0FBQ0xBLFVBQUFBLFdBQVcsR0FBR0EsV0FBVyxHQUFHLENBQTVCO0FBQ0FDLFVBQUFBLFFBQVEsR0FBR0MsUUFBWDtBQUNELFNBN0RzQixDQStEdkI7QUFDQTs7O0FBRUEsUUFBQSxPQUFJLENBQUNpTyxhQUFMLEdBbEV1QixDQW1FdkI7O0FBQ0QsT0FwRUQsTUFvRU87QUFDTCxZQUFJbUUsT0FBTyxHQUFHalgsRUFBRSxDQUFDOEosSUFBSCxDQUFRLENBQVIsRUFBVyxDQUFYLENBQWQ7O0FBQ0EsUUFBQSxPQUFJLENBQUM2RyxXQUFMLENBQWlCc0csT0FBakIsRUFBMEIsS0FBMUIsRUFBaUMsR0FBakMsRUFGSyxDQUVrQzs7QUFDeEM7QUFDRixLQTNFSCxFQTRFR0wsS0E1RUg7QUE2RUQsR0EvN0R3QjtBQWk4RHpCO0FBRUFNLEVBQUFBLFlBbjhEeUIsd0JBbThEWkMsSUFuOERZLEVBbThETkMsSUFuOERNLEVBbThEQTtBQUN2QmxTLElBQUFBLFlBQVksR0FBR2lTLElBQWY7QUFDQWhTLElBQUFBLFlBQVksR0FBR2lTLElBQWY7O0FBRUEsUUFBSSxDQUFDRCxJQUFMLEVBQVc7QUFDVHZZLE1BQUFBLG1CQUFtQixHQUFHLENBQXRCO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDd1ksSUFBTCxFQUFXO0FBQ1R2WSxNQUFBQSxtQkFBbUIsR0FBRyxDQUF0QjtBQUNEO0FBQ0YsR0E5OER3QjtBQWc5RHpCd1ksRUFBQUEsb0JBaDlEeUIsa0NBZzlERjtBQUNyQnhZLElBQUFBLG1CQUFtQjtBQUNwQixHQWw5RHdCO0FBbzlEekJ5WSxFQUFBQSwyQkFwOUR5Qix1Q0FvOURHQyxNQXA5REgsRUFvOURXekksTUFwOURYLEVBbzlEbUIwSSxhQXA5RG5CLEVBbzlEa0NDLG9CQXA5RGxDLEVBbzlEZ0VDLFVBcDlEaEUsRUFvOURnRkMsNEJBcDlEaEYsRUFvOURzSDtBQUFBLFFBQXBGRixvQkFBb0Y7QUFBcEZBLE1BQUFBLG9CQUFvRixHQUE3RCxLQUE2RDtBQUFBOztBQUFBLFFBQXREQyxVQUFzRDtBQUF0REEsTUFBQUEsVUFBc0QsR0FBekMsQ0FBeUM7QUFBQTs7QUFBQSxRQUF0Q0MsNEJBQXNDO0FBQXRDQSxNQUFBQSw0QkFBc0MsR0FBUCxLQUFPO0FBQUE7O0FBQzdJLFFBQUksS0FBSzFSLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDckUsWUFBckMsQ0FBa0QrTCxNQUFsRCxFQUEwRHJOLGFBQTFELENBQXdFa0gsTUFBeEUsR0FBaUYsQ0FBckYsRUFBd0Y7QUFDdEYsVUFBSSxDQUFDOE8sb0JBQUwsRUFBMkI7QUFDekIsWUFBSSxLQUFLeFIsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUFyQyxJQUE2Q2lVLE1BQWpELEVBQXlEO0FBQ3ZELGVBQUt0UixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzlELElBQXJDLEdBQTRDLEtBQUsyQyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzlELElBQXJDLEdBQTRDaVUsTUFBeEY7QUFDQSxlQUFLdFIsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNoRSxvQkFBckMsR0FBNEQsS0FBSzZDLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDaEUsb0JBQXJDLEdBQTRELENBQXhIOztBQUNBLGVBQUs2QyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3JFLFlBQXJDLENBQWtEK0wsTUFBbEQsRUFBMERyTixhQUExRCxDQUF3RThLLElBQXhFLENBQTZFaUwsYUFBN0U7O0FBQ0F6UyxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb0YsU0FBMUQsQ0FBb0UsK0NBQXBFLEVBQXFILElBQXJIO0FBQ0FyQyxVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmdkcsWUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHFQLHNDQUExRDtBQUNELFdBRlMsRUFFUCxJQUZPLENBQVY7QUFHRCxTQVJELE1BUU87QUFDTDdTLFVBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERvRixTQUExRCxDQUFvRSx1RUFBdUU0SixNQUEzSTtBQUNEO0FBQ0YsT0FaRCxNQVlPO0FBQ0wsWUFBSUcsVUFBVSxJQUFJSCxNQUFsQixFQUEwQjtBQUN4QkcsVUFBQUEsVUFBVSxHQUFHQSxVQUFVLEdBQUdILE1BQTFCO0FBQ0EsZUFBS3RSLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDaEUsb0JBQXJDLEdBQTRELEtBQUs2QyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ2hFLG9CQUFyQyxHQUE0RCxDQUF4SDs7QUFDQSxlQUFLNkMsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNyRSxZQUFyQyxDQUFrRCtMLE1BQWxELEVBQTBEck4sYUFBMUQsQ0FBd0U4SyxJQUF4RSxDQUE2RWlMLGFBQTdFOztBQUNBelMsVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRG9GLFNBQTFELENBQW9FLCtDQUFwRSxFQUFxSCxJQUFySDtBQUNBckMsVUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZnZHLFlBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERxUCxzQ0FBMUQ7QUFDRCxXQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsU0FSRCxNQVFPO0FBQ0w3UyxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb0YsU0FBMUQsQ0FBb0UsdUVBQXVFNEosTUFBdkUsR0FBZ0YsZ0JBQWhGLEdBQW1HRyxVQUF2SztBQUNEO0FBQ0Y7QUFDRixLQTFCRCxNQTBCTztBQUNMM1MsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRG9GLFNBQTFELENBQW9FLG9FQUFwRTtBQUNEO0FBQ0YsR0FsL0R3QjtBQW8vRHpCa0ssRUFBQUEsMkNBcC9EeUIsdURBby9EbUJKLG9CQXAvRG5CLEVBby9EaURDLFVBcC9EakQsRUFvL0RpRUMsNEJBcC9EakUsRUFvL0R1RztBQUFBLFFBQXBGRixvQkFBb0Y7QUFBcEZBLE1BQUFBLG9CQUFvRixHQUE3RCxLQUE2RDtBQUFBOztBQUFBLFFBQXREQyxVQUFzRDtBQUF0REEsTUFBQUEsVUFBc0QsR0FBekMsQ0FBeUM7QUFBQTs7QUFBQSxRQUF0Q0MsNEJBQXNDO0FBQXRDQSxNQUFBQSw0QkFBc0MsR0FBUCxLQUFPO0FBQUE7O0FBQzlIMVMsSUFBQUEscUJBQXFCLEdBQUcsRUFBeEI7QUFFQTRDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs3QixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3JFLFlBQWpEOztBQUNBLFNBQUssSUFBSStVLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBSzdSLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDckUsWUFBckMsQ0FBa0Q0RixNQUF0RSxFQUE4RW1QLENBQUMsRUFBL0UsRUFBbUY7QUFDakYsVUFBSTdHLFFBQVEsQ0FBQyxLQUFLaEwsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNyRSxZQUFyQyxDQUFrRCtVLENBQWxELEVBQXFEcFgsWUFBdEQsQ0FBUixJQUErRSxDQUFuRixFQUFzRjtBQUNwRjtBQUNBLFlBQUlxWCxJQUFJLEdBQUcvWCxFQUFFLENBQUNnWSxXQUFILENBQWVqVCx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEMFAsbUJBQTFELENBQThFQyxvQkFBN0YsQ0FBWDtBQUNBSCxRQUFBQSxJQUFJLENBQUN2SSxNQUFMLEdBQWN6Syx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEMFAsbUJBQTFELENBQThFRSwyQkFBNUY7QUFDQUosUUFBQUEsSUFBSSxDQUFDOVAsWUFBTCxDQUFrQix1QkFBbEIsRUFBMkNtUSxnQkFBM0MsQ0FBNEROLENBQTVEO0FBQ0FDLFFBQUFBLElBQUksQ0FBQzlQLFlBQUwsQ0FBa0IsdUJBQWxCLEVBQTJDMEcsT0FBM0MsQ0FBbUQsS0FBSzFJLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDckUsWUFBckMsQ0FBa0QrVSxDQUFsRCxFQUFxRDdXLFlBQXhHO0FBQ0E4VyxRQUFBQSxJQUFJLENBQUM5UCxZQUFMLENBQWtCLHVCQUFsQixFQUEyQ29RLG9CQUEzQyxDQUFnRVosb0JBQWhFO0FBQ0FNLFFBQUFBLElBQUksQ0FBQzlQLFlBQUwsQ0FBa0IsdUJBQWxCLEVBQTJDcVEsWUFBM0MsQ0FBd0RaLFVBQXhEO0FBQ0FLLFFBQUFBLElBQUksQ0FBQzlQLFlBQUwsQ0FBa0IsdUJBQWxCLEVBQTJDc1EsOEJBQTNDLENBQTBFWiw0QkFBMUU7QUFDQUksUUFBQUEsSUFBSSxDQUFDOVAsWUFBTCxDQUFrQix1QkFBbEIsRUFBMkN1USxZQUEzQztBQUNBdlQsUUFBQUEscUJBQXFCLENBQUNzSCxJQUF0QixDQUEyQndMLElBQTNCO0FBQ0Q7QUFDRjs7QUFDRGxRLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZN0MscUJBQVo7QUFDQSxXQUFPQSxxQkFBcUIsQ0FBQzBELE1BQTdCO0FBQ0QsR0F4Z0V3QjtBQTBnRXpCOFAsRUFBQUEscUJBMWdFeUIsbUNBMGdFRDtBQUN0QixTQUFLLElBQUlqUCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3ZFLHFCQUFxQixDQUFDMEQsTUFBbEQsRUFBMERhLEtBQUssRUFBL0QsRUFBbUU7QUFDakV2RSxNQUFBQSxxQkFBcUIsQ0FBQ3VFLEtBQUQsQ0FBckIsQ0FBNkJrUCxPQUE3QjtBQUNEOztBQUVEelQsSUFBQUEscUJBQXFCLEdBQUcsRUFBeEI7QUFDRCxHQWhoRXdCO0FBa2hFekIwVCxFQUFBQSx5QkFsaEV5QixxQ0FraEVDQyxLQWxoRUQsRUFraEVRQyxZQWxoRVIsRUFraEVzQkMsU0FsaEV0QixFQWtoRWlDO0FBQ3hELFFBQUlBLFNBQUosRUFBZTtBQUNiLFVBQUlDLE1BQU0sR0FBRyxJQUFJdlcsU0FBSixFQUFiOztBQUNBdVcsTUFBQUEsTUFBTSxDQUFDOVgsWUFBUCxHQUFzQjJYLEtBQXRCO0FBQ0FHLE1BQUFBLE1BQU0sQ0FBQ3RXLFdBQVAsR0FBcUJvVyxZQUFyQjtBQUVBLFdBQUs1UyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQy9ELFVBQXJDLENBQWdEa0osSUFBaEQsQ0FBcUR3TSxNQUFyRDtBQUNEO0FBQ0YsR0ExaEV3QjtBQTRoRXpCakMsRUFBQUEsMEJBNWhFeUIsc0NBNGhFRWtDLGVBNWhFRixFQTRoRTJCNUYsTUE1aEUzQixFQTRoRTJDNkYsb0JBNWhFM0MsRUE0aEV5RUMsc0JBNWhFekUsRUE0aEVxR0MsUUE1aEVyRyxFQTRoRW1IekYsUUE1aEVuSCxFQTRoRWlJQyxXQTVoRWpJLEVBNGhFa0o7QUFBQTs7QUFBQSxRQUFoSnFGLGVBQWdKO0FBQWhKQSxNQUFBQSxlQUFnSixHQUE5SCxLQUE4SDtBQUFBOztBQUFBLFFBQXZINUYsTUFBdUg7QUFBdkhBLE1BQUFBLE1BQXVILEdBQTlHLEtBQThHO0FBQUE7O0FBQUEsUUFBdkc2RixvQkFBdUc7QUFBdkdBLE1BQUFBLG9CQUF1RyxHQUFoRixLQUFnRjtBQUFBOztBQUFBLFFBQXpFQyxzQkFBeUU7QUFBekVBLE1BQUFBLHNCQUF5RSxHQUFoRCxDQUFnRDtBQUFBOztBQUFBLFFBQTdDQyxRQUE2QztBQUE3Q0EsTUFBQUEsUUFBNkMsR0FBbEMsQ0FBa0M7QUFBQTs7QUFBQSxRQUEvQnpGLFFBQStCO0FBQS9CQSxNQUFBQSxRQUErQixHQUFwQixDQUFvQjtBQUFBOztBQUFBLFFBQWpCQyxXQUFpQjtBQUFqQkEsTUFBQUEsV0FBaUIsR0FBSCxDQUFHO0FBQUE7O0FBQ3pLLFFBQUlzRixvQkFBSixFQUEwQjtBQUN4QixVQUFJRyxNQUFNLEdBQUcsUUFBYjtBQUNBclUsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRDhRLGlCQUExRCxDQUE0RUQsTUFBNUUsRUFBb0YsS0FBcEYsRUFBMkYsS0FBM0YsRUFBa0csS0FBbEcsRUFBeUdoRyxNQUF6RyxFQUFpSDZGLG9CQUFqSCxFQUF1SUMsc0JBQXZJLEVBQStKQyxRQUEvSixFQUF5S3pGLFFBQXpLLEVBQW1MQyxXQUFuTCxFQUFnTSxDQUFoTSxFQUFtTSxDQUFuTSxFQUFzTXRPLGdCQUF0TTtBQUNELEtBSEQsTUFHTztBQUNMLFVBQUlGLFlBQVksSUFBSUQsWUFBaEIsSUFBZ0NFLGtCQUFwQyxFQUF3RDtBQUN0RHZHLFFBQUFBLG1CQUFtQixHQUFHLENBQXRCO0FBQ0Q7O0FBRUQwRyxNQUFBQSxlQUFlLEdBQUcsS0FBS1UsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNwRSxpQkFBckMsQ0FBdURmLGNBQXpFO0FBQ0F1RCxNQUFBQSxpQkFBaUIsR0FBRyxLQUFLUyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RGQsZ0JBQTNFO0FBQ0F1RCxNQUFBQSxpQkFBaUIsR0FBRyxLQUFLUSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RGIsZ0JBQTNFOztBQUVBLFVBQUlvRCxlQUFKLEVBQXFCO0FBQ25CO0FBQ0EsYUFBSytULHNCQUFMLENBQTRCLEtBQTVCOztBQUVBLFlBQUksQ0FBQ2xHLE1BQUwsRUFBYTtBQUNYck8sVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRG9GLFNBQTFELENBQW9FLGtCQUFwRSxFQUF3RixJQUF4RjtBQUNBckMsVUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixZQUFBLE9BQUksQ0FBQ3NILFlBQUw7QUFDRCxXQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsU0FMRCxNQUtPO0FBQ0wvSyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUNBd0QsVUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixZQUFBLE9BQUksQ0FBQ3NILFlBQUw7QUFDRCxXQUZTLEVBRVAsR0FGTyxDQUFWO0FBR0Q7QUFDRixPQWZELE1BZU87QUFDTCxZQUFJd0csTUFBTSxHQUFHLEVBQWI7QUFFQSxZQUFJSixlQUFKLEVBQXFCSSxNQUFNLEdBQUcsY0FBVCxDQUFyQixLQUNLQSxNQUFNLEdBQUcsUUFBVDtBQUVMclUsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRDhRLGlCQUExRCxDQUE0RUQsTUFBNUUsRUFBb0ZKLGVBQXBGLEVBQXFHeFQsaUJBQXJHLEVBQXdIQyxpQkFBeEgsRUFBMkkyTixNQUEzSSxFQUFtSixLQUFuSixFQUEwSixDQUExSixFQUE2SixDQUE3SixFQUFnSyxDQUFoSyxFQUFtSyxDQUFuSyxFQUFzS3hVLG1CQUF0SyxFQUEyTEMsbUJBQTNMLEVBQWdOd0csZ0JBQWhOO0FBQ0Q7QUFDRjtBQUNGLEdBamtFd0I7QUFta0V6QmtVLEVBQUFBLHFCQW5rRXlCLG1DQW1rRUQ7QUFDdEIsU0FBS3RULGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDekQsVUFBckMsR0FBa0QsSUFBbEQ7QUFDQSxTQUFLc0MsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN4RCxjQUFyQyxJQUF1RCxDQUF2RDtBQUNBbUIsSUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRFEsOEJBQTFELENBQXlGLElBQXpGLEVBQStGLEtBQS9GLEVBQXNHLEtBQUt0QyxZQUEzRyxFQUF5SCxLQUFLUixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3pELFVBQTlKLEVBQTBLLEtBQUtzQyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hELGNBQS9NO0FBQ0QsR0F2a0V3QjtBQXlrRXpCNFYsRUFBQUEsK0JBemtFeUIsMkNBeWtFT0MsT0F6a0VQLEVBeWtFZ0JDLElBemtFaEIsRUF5a0VzQjtBQUM3QyxRQUFJM08sS0FBSyxHQUFHO0FBQUVmLE1BQUFBLElBQUksRUFBRTtBQUFFMUcsUUFBQUEsSUFBSSxFQUFFbVcsT0FBUjtBQUFpQkUsUUFBQUEsRUFBRSxFQUFFRDtBQUFyQjtBQUFSLEtBQVo7QUFDQTNVLElBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NxRSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFRixLQUE5RTtBQUNELEdBNWtFd0I7QUE4a0V6QjZPLEVBQUFBLGtDQTlrRXlCLDhDQThrRVU3TyxLQTlrRVYsRUE4a0VpQjtBQUN4QyxRQUFJaEcsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEWSxhQUE5RCxNQUFpRixLQUFyRixFQUE0RjtBQUMxRixVQUFJc1IsT0FBTyxHQUFHMU8sS0FBSyxDQUFDZixJQUFOLENBQVcxRyxJQUF6QjtBQUNBLFVBQUl1VyxHQUFHLEdBQUc5TyxLQUFLLENBQUNmLElBQU4sQ0FBVzJQLEVBQXJCOztBQUVBLFVBQUlHLFFBQVEsR0FBRyxLQUFLN1EsVUFBTCxFQUFmOztBQUVBLFVBQUksS0FBS2hELGNBQUwsQ0FBb0I2VCxRQUFwQixFQUE4QmxYLFNBQTlCLElBQTJDaVgsR0FBL0MsRUFBb0Q7QUFDbEQsWUFBSSxLQUFLNVQsY0FBTCxDQUFvQjZULFFBQXBCLEVBQThCOVYsY0FBOUIsSUFBZ0QsSUFBcEQsRUFBMEQ7QUFDeEQsZUFBS2lDLGNBQUwsQ0FBb0I2VCxRQUFwQixFQUE4QjdWLFVBQTlCLElBQTRDd1YsT0FBNUM7QUFDRDs7QUFFRCxhQUFLeFQsY0FBTCxDQUFvQjZULFFBQXBCLEVBQThCeFcsSUFBOUIsSUFBc0NtVyxPQUF0QztBQUNBMVUsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRG9GLFNBQTFELENBQW9FLGtDQUFrQzhMLE9BQWxDLEdBQTRDLHFCQUFoSCxFQUF1SSxJQUF2STtBQUNBMVUsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEV3QixpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUszRSxjQUFMLENBQW9CNlQsUUFBcEIsQ0FBbkg7QUFDRDtBQUNGO0FBQ0YsR0EvbEV3QjtBQWltRXpCO0FBRUE7QUFDQUMsRUFBQUEsdUJBcG1FeUIsbUNBb21FRGxULE1BcG1FQyxFQW9tRU87QUFDOUJ6QixJQUFBQSxrQkFBa0IsR0FBR3lCLE1BQXJCO0FBQ0EsU0FBS1osY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNwRSxpQkFBckMsQ0FBdURqQixpQkFBdkQsR0FBMkVxRCxrQkFBM0U7QUFDRCxHQXZtRXdCO0FBeW1FekI0VSxFQUFBQSxxQkF6bUV5QixpQ0F5bUVIblQsTUF6bUVHLEVBeW1FSztBQUM1QnhCLElBQUFBLGdCQUFnQixHQUFHd0IsTUFBbkI7QUFDQSxTQUFLWixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RFosa0JBQXZELEdBQTRFaUQsZ0JBQTVFO0FBQ0QsR0E1bUV3QjtBQThtRXpCdUksRUFBQUEsa0JBOW1FeUIsOEJBOG1FTi9HLE1BOW1FTSxFQThtRUU7QUFDekJ2QixJQUFBQSxhQUFhLEdBQUd1QixNQUFoQjtBQUNBLFNBQUtaLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDcEUsaUJBQXJDLENBQXVEaEIsWUFBdkQsR0FBc0VzRCxhQUF0RTtBQUNELEdBam5Fd0I7QUFtbkV6QmdVLEVBQUFBLHNCQW5uRXlCLGtDQW1uRUZ6UyxNQW5uRUUsRUFtbkVNO0FBQzdCdEIsSUFBQUEsZUFBZSxHQUFHc0IsTUFBbEI7QUFDQSxTQUFLWixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RGYsY0FBdkQsR0FBd0VzRCxlQUF4RTtBQUNELEdBdG5Fd0I7QUF3bkV6QjBVLEVBQUFBLDBCQXhuRXlCLHNDQXduRUVwVCxNQXhuRUYsRUF3bkVVO0FBQ2pDckIsSUFBQUEsaUJBQWlCLEdBQUdxQixNQUFwQjtBQUNBLFNBQUtaLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDcEUsaUJBQXJDLENBQXVEZCxnQkFBdkQsR0FBMEVzRCxpQkFBMUU7QUFDRCxHQTNuRXdCO0FBNm5FekIwVSxFQUFBQSwrQkE3bkV5QiwyQ0E2bkVPclQsTUE3bkVQLEVBNm5FZTtBQUN0Q3BCLElBQUFBLGlCQUFpQixHQUFHb0IsTUFBcEI7QUFDQSxTQUFLWixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RGIsZ0JBQXZELEdBQTBFc0QsaUJBQTFFO0FBQ0QsR0Fob0V3QjtBQWtvRXpCMEgsRUFBQUEsa0JBbG9FeUIsOEJBa29FTnRHLE1BbG9FTSxFQWtvRUU7QUFDekJsQixJQUFBQSxjQUFjLEdBQUdrQixNQUFqQjtBQUNELEdBcG9Fd0I7QUFzb0V6QnNULEVBQUFBLGtCQXRvRXlCLGdDQXNvRUo7QUFDbkIsV0FBT3hVLGNBQVA7QUFDRCxHQXhvRXdCO0FBMG9FekJ5VSxFQUFBQSxxQkExb0V5QixtQ0Ewb0VEO0FBQ3RCLFFBQUlDLFdBQVcsR0FBRyxDQUFDLENBQW5COztBQUNBLFFBQUksS0FBS3BVLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDM0QsZUFBckMsR0FBdUQsQ0FBM0QsRUFBOEQ7QUFDNUQ0VyxNQUFBQSxXQUFXLEdBQUcsS0FBS3BVLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDM0QsZUFBbkQ7QUFDQSxXQUFLd0MsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUMzRCxlQUFyQyxHQUF1RCxDQUF2RDtBQUNELEtBSEQsTUFHTztBQUNMNFcsTUFBQUEsV0FBVyxHQUFHLENBQWQ7QUFDRDs7QUFFRCxXQUFPQSxXQUFQO0FBQ0QsR0FwcEV3QjtBQXNwRXpCQyxFQUFBQSxzQkF0cEV5QixrQ0FzcEVGQyxXQXRwRUUsRUFzcEVXO0FBQ2xDLFFBQUlDLGdCQUFnQixHQUFHLENBQUMsQ0FBeEI7O0FBQ0EsUUFBSSxLQUFLdlUsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUMzRCxlQUFyQyxHQUF1RCxDQUEzRCxFQUE4RDtBQUM1RCtXLE1BQUFBLGdCQUFnQixHQUFHLEtBQUt2VSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzNELGVBQXJDLElBQXdEOFcsV0FBM0U7QUFDRCxLQUZELE1BRU87QUFDTEMsTUFBQUEsZ0JBQWdCLEdBQUcsQ0FBbkI7QUFDRDs7QUFFRCxXQUFPQSxnQkFBUDtBQUNELEdBL3BFd0I7QUFpcUV6QkMsRUFBQUEsaUJBanFFeUIsNkJBaXFFUEMsT0FqcUVPLEVBaXFFRTtBQUN6QixRQUFJakIsT0FBTyxHQUFHLENBQUMsQ0FBZjs7QUFDQSxRQUFJLEtBQUt4VCxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzNELGVBQXJDLEdBQXVELENBQTNELEVBQThEO0FBQzVEaVgsTUFBQUEsT0FBTyxHQUFHQSxPQUFPLEdBQUcsR0FBcEI7QUFDQWpCLE1BQUFBLE9BQU8sR0FBRyxLQUFLeFQsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUMzRCxlQUFyQyxJQUF3RGlYLE9BQWxFO0FBQ0EsV0FBS3pVLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDM0QsZUFBckMsR0FBdUQsQ0FBdkQ7QUFDQSxXQUFLd0MsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUFyQyxJQUE2Q21XLE9BQTdDO0FBQ0QsS0FMRCxNQUtPO0FBQ0xBLE1BQUFBLE9BQU8sR0FBRyxDQUFWO0FBQ0Q7O0FBRUQsV0FBT0EsT0FBUDtBQUNELEdBN3FFd0I7QUErcUV6QmtCLEVBQUFBLDJCQS9xRXlCLHlDQStxRUs7QUFDNUIsUUFBSTNULElBQUksR0FBRyxDQUFDLENBQVo7O0FBQ0EsUUFBSTdILG1CQUFtQixDQUFDd0osTUFBcEIsR0FBNkIsQ0FBakMsRUFBb0M7QUFDbEMsVUFBSXRKLDBCQUEwQixHQUFHRixtQkFBbUIsQ0FBQ3dKLE1BQXJELEVBQTZEO0FBQzNEM0IsUUFBQUEsSUFBSSxHQUFHN0gsbUJBQW1CLENBQUNFLDBCQUFELENBQTFCO0FBQ0FBLFFBQUFBLDBCQUEwQjtBQUMzQixPQUhELE1BR087QUFDTCxhQUFLdWIsbUNBQUw7QUFDRDtBQUNGLEtBUEQsTUFPTztBQUNMLFdBQUtBLG1DQUFMO0FBQ0Q7O0FBQ0QsV0FBTzVULElBQVA7QUFDRCxHQTVyRXdCO0FBOHJFekI2VCxFQUFBQSw4QkE5ckV5Qiw0Q0E4ckVRO0FBQy9CLFFBQUk3VCxJQUFJLEdBQUcsQ0FBQyxDQUFaOztBQUNBLFFBQUk1SCxzQkFBc0IsQ0FBQ3VKLE1BQXZCLEdBQWdDLENBQXBDLEVBQXVDO0FBQ3JDLFVBQUlySiw2QkFBNkIsR0FBR0Ysc0JBQXNCLENBQUN1SixNQUEzRCxFQUFtRTtBQUNqRTNCLFFBQUFBLElBQUksR0FBRzVILHNCQUFzQixDQUFDRSw2QkFBRCxDQUE3QjtBQUNBQSxRQUFBQSw2QkFBNkI7QUFDOUIsT0FIRCxNQUdPO0FBQ0wsYUFBS3diLHNDQUFMO0FBQ0Q7QUFDRixLQVBELE1BT087QUFDTCxXQUFLQSxzQ0FBTDtBQUNEOztBQUNELFdBQU85VCxJQUFQO0FBQ0QsR0Ezc0V3QjtBQTZzRXpCNFQsRUFBQUEsbUNBN3NFeUIsK0NBNnNFVzdQLEtBN3NFWCxFQTZzRXlCO0FBQUEsUUFBZEEsS0FBYztBQUFkQSxNQUFBQSxLQUFjLEdBQU4sSUFBTTtBQUFBOztBQUNoRCxRQUFJQSxLQUFLLElBQUksSUFBYixFQUFtQjtBQUNqQjVMLE1BQUFBLG1CQUFtQixHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsRUFBL0IsRUFBbUMsRUFBbkMsQ0FBdEI7QUFFQUEsTUFBQUEsbUJBQW1CLENBQUMyUyxJQUFwQixDQUF5QjtBQUFBLGVBQU0sTUFBTUMsSUFBSSxDQUFDQyxNQUFMLEVBQVo7QUFBQSxPQUF6QjtBQUVBbkssTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkzSSxtQkFBWjtBQUNBRSxNQUFBQSwwQkFBMEIsR0FBRyxDQUE3QjtBQUVBLFVBQUk0UyxTQUFTLEdBQUc7QUFBRThJLFFBQUFBLFFBQVEsRUFBRTViLG1CQUFaO0FBQWlDNmIsUUFBQUEsUUFBUSxFQUFFO0FBQTNDLE9BQWhCO0FBQ0FqVyxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RWdILFNBQTlFO0FBQ0QsS0FWRCxNQVVPO0FBQ0wsVUFBSWxILEtBQUssQ0FBQ2dRLFFBQU4sSUFBa0IsSUFBdEIsRUFBNEI7QUFDMUI1YixRQUFBQSxtQkFBbUIsR0FBRzRMLEtBQUssQ0FBQ2dRLFFBQTVCO0FBQ0FsVCxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTNJLG1CQUFaO0FBQ0FFLFFBQUFBLDBCQUEwQixHQUFHLENBQTdCO0FBQ0Q7QUFDRjtBQUNGLEdBL3RFd0I7QUFpdUV6QnliLEVBQUFBLHNDQWp1RXlCLGtEQWl1RWMvUCxLQWp1RWQsRUFpdUU0QjtBQUFBLFFBQWRBLEtBQWM7QUFBZEEsTUFBQUEsS0FBYyxHQUFOLElBQU07QUFBQTs7QUFDbkQsUUFBSUEsS0FBSyxJQUFJLElBQWIsRUFBbUI7QUFDakIzTCxNQUFBQSxzQkFBc0IsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLEVBQS9CLEVBQW1DLEVBQW5DLENBQXpCO0FBRUFBLE1BQUFBLHNCQUFzQixDQUFDMFMsSUFBdkIsQ0FBNEI7QUFBQSxlQUFNLE1BQU1DLElBQUksQ0FBQ0MsTUFBTCxFQUFaO0FBQUEsT0FBNUI7QUFFQW5LLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMUksc0JBQVo7QUFDQUUsTUFBQUEsNkJBQTZCLEdBQUcsQ0FBaEM7QUFFQSxVQUFJMlMsU0FBUyxHQUFHO0FBQUU4SSxRQUFBQSxRQUFRLEVBQUUsSUFBWjtBQUFrQkMsUUFBQUEsUUFBUSxFQUFFNWI7QUFBNUIsT0FBaEI7QUFDQTJGLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NxRSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFZ0gsU0FBOUU7QUFDRCxLQVZELE1BVU87QUFDTCxVQUFJbEgsS0FBSyxDQUFDaVEsUUFBTixJQUFrQixJQUF0QixFQUE0QjtBQUMxQjViLFFBQUFBLHNCQUFzQixHQUFHMkwsS0FBSyxDQUFDaVEsUUFBL0I7QUFDQW5ULFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMUksc0JBQVo7QUFDQUUsUUFBQUEsNkJBQTZCLEdBQUcsQ0FBaEM7QUFDRDtBQUNGO0FBQ0YsR0FudkV3QjtBQXF2RXpCMmIsRUFBQUEsbUNBcnZFeUIsK0NBcXZFV2xRLEtBcnZFWCxFQXF2RWtCO0FBQ3pDLFFBQUltUSxZQUFZLEdBQUduVyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDd1UsaUJBQWxDLEVBQW5COztBQUNBLFFBQUlDLE9BQU8sR0FBR3JRLEtBQUssQ0FBQ3NRLE1BQXBCO0FBQ0EsUUFBSUMsY0FBYyxHQUFHdlEsS0FBSyxDQUFDd1EsUUFBM0I7QUFDQSxRQUFJakksWUFBWSxHQUFHdkksS0FBSyxDQUFDeVEsU0FBekI7QUFDQSxRQUFJQyxNQUFNLEdBQUcxUSxLQUFLLENBQUMyUSxLQUFuQjs7QUFDQSxRQUFJQyxrQkFBa0IsR0FBRzVXLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsRUFBekI7O0FBRUEsUUFBSWtULE1BQUosRUFBWTtBQUNWcGMsTUFBQUEsMEJBQTBCO0FBQzNCLEtBRkQsTUFFTztBQUNMQyxNQUFBQSw2QkFBNkI7QUFDOUI7O0FBRUQsUUFBSThiLE9BQU8sSUFBSXJXLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUE3RixDQUErRzFHLFNBQTlILEVBQXlJO0FBQ3ZJaUYsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWjs7QUFFQTZULE1BQUFBLGtCQUFrQixDQUFDQyx1Q0FBbkIsQ0FBMkQsSUFBM0Q7O0FBRUEsVUFBSUMsTUFBSjs7QUFDQSxVQUFJSixNQUFKLEVBQVk7QUFDVjVULFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQVo7QUFDQStULFFBQUFBLE1BQU0sR0FBR1gsWUFBWSxDQUFDL2IsbUJBQWIsQ0FBaUNtYyxjQUFqQyxDQUFUO0FBQ0QsT0FIRCxNQUdPO0FBQ0x6VCxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFaO0FBQ0ErVCxRQUFBQSxNQUFNLEdBQUdYLFlBQVksQ0FBQzliLHNCQUFiLENBQW9Da2MsY0FBcEMsQ0FBVDtBQUNEOztBQUVEcGMsTUFBQUEsYUFBYSxHQUFHMmMsTUFBTSxDQUFDQyxhQUF2Qjs7QUFDQSxVQUFJQyxRQUFRLEdBQUcsK0JBQStCLElBQS9CLEdBQXNDLDhDQUF0QyxHQUF1RixJQUF2RixHQUE4RixJQUE5RixHQUFxR0YsTUFBTSxDQUFDTixRQUE1RyxHQUF1SCxJQUF2SCxHQUE4SCxLQUE5SCxHQUFzSU0sTUFBTSxDQUFDRyxPQUE3SSxHQUF1SixJQUF2SixHQUE4SixLQUE5SixHQUFzS0gsTUFBTSxDQUFDSSxPQUE3SyxHQUF1TCxJQUF2TCxHQUE4TCxLQUE5TCxHQUFzTUosTUFBTSxDQUFDSyxPQUE3TSxHQUF1TixJQUF2TixHQUE4TixLQUE5TixHQUFzT0wsTUFBTSxDQUFDTSxPQUE1UCxDQWZ1SSxDQWlCdkk7OztBQUNBUixNQUFBQSxrQkFBa0IsQ0FBQ1Msc0NBQW5CLENBQTBETCxRQUExRDtBQUNEO0FBQ0YsR0F2eEV3QjtBQXl4RXpCTSxFQUFBQSxtQ0F6eEV5QiwrQ0F5eEVXQyxXQXp4RVgsRUF5eEVnQztBQUFBLFFBQXJCQSxXQUFxQjtBQUFyQkEsTUFBQUEsV0FBcUIsR0FBUCxLQUFPO0FBQUE7O0FBQ3ZELFFBQUlYLGtCQUFrQixHQUFHNVcsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxFQUF6Qjs7QUFDQSxRQUFJZ1UsT0FBSjs7QUFDQSxRQUFJQyxTQUFKOztBQUNBLFFBQUksS0FBSy9WLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQStWLE1BQUFBLFNBQVMsR0FBR3pYLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVzRixpQkFBN0UsRUFBWjtBQUNBNk8sTUFBQUEsT0FBTyxHQUFHeFgsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RkMsaUJBQXZHO0FBQ0QsS0FKRCxNQUlPLElBQUksS0FBSzdDLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakM7QUFDQThWLE1BQUFBLE9BQU8sR0FBRyxLQUFLdFcsY0FBTCxDQUFvQixDQUFwQixDQUFWO0FBQ0F1VyxNQUFBQSxTQUFTLEdBQUcsS0FBS3ZXLGNBQWpCO0FBQ0Q7O0FBQ0QwVixJQUFBQSxrQkFBa0IsQ0FBQ2Msb0NBQW5CLENBQXdELElBQXhEOztBQUNBZCxJQUFBQSxrQkFBa0IsQ0FBQ2UsbUNBQW5COztBQUNBZixJQUFBQSxrQkFBa0IsQ0FBQ2dCLG1DQUFuQixDQUF1REosT0FBdkQsRUFBZ0VDLFNBQWhFLEVBQTJFRixXQUEzRSxFQUF3RixLQUFLN1YsWUFBN0Y7QUFDRCxHQXp5RXdCO0FBMnlFekJtVyxFQUFBQSw0Q0EzeUV5Qix3REEyeUVvQkMsS0EzeUVwQixFQTJ5RWtDO0FBQUEsUUFBZEEsS0FBYztBQUFkQSxNQUFBQSxLQUFjLEdBQU4sSUFBTTtBQUFBOztBQUN6RCxRQUFJTixPQUFPLEdBQUd4WCx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBM0c7O0FBQ0EsUUFBSXFTLGtCQUFrQixHQUFHNVcsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxFQUF6Qjs7QUFDQSxRQUFJdVUsVUFBVSxHQUFHN0wsUUFBUSxDQUFDNEwsS0FBSyxDQUFDRSxhQUFOLENBQW9CeGMsSUFBcEIsQ0FBeUJ5YyxLQUF6QixDQUErQixHQUEvQixFQUFvQyxDQUFwQyxDQUFELENBQXpCOztBQUVBblYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQXNCZ1YsVUFBbEM7QUFDQWpWLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFvQjVJLGFBQWhDOztBQUNBLFFBQUk0ZCxVQUFVLElBQUk1ZCxhQUFsQixFQUFpQztBQUMvQjZGLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERvRixTQUExRCxDQUFvRSwyQkFBcEUsRUFBaUcsSUFBakc7O0FBQ0FnTyxNQUFBQSxrQkFBa0IsQ0FBQ0MsdUNBQW5CLENBQTJELEtBQTNEOztBQUNBLFdBQUtxQiw4QkFBTCxDQUFvQyxLQUFwQyxFQUEyQyxJQUEzQyxFQUFpRCxDQUFDLENBQWxELEVBQXFEVixPQUFPLENBQUMzWixTQUE3RDtBQUNELEtBSkQsTUFJTztBQUNMLFVBQUkyWixPQUFPLENBQUNqWixJQUFSLElBQWdCLElBQXBCLEVBQTBCO0FBQ3hCLGFBQUssSUFBSWtHLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUt2RCxjQUFMLENBQW9CMEMsTUFBaEQsRUFBd0RhLEtBQUssRUFBN0QsRUFBaUU7QUFDL0QsY0FBSStTLE9BQU8sQ0FBQzNaLFNBQVIsSUFBcUIsS0FBS3FELGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQjVHLFNBQXBELEVBQStEO0FBQzdELGlCQUFLcUQsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCbEcsSUFBM0IsSUFBbUMsSUFBbkM7QUFDQXlCLFlBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFd0IsaUJBQTVFLENBQThGLG1CQUE5RixFQUFtSCxLQUFLM0UsY0FBTCxDQUFvQnVELEtBQXBCLENBQW5IO0FBQ0E7QUFDRDtBQUNGOztBQUVEekUsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRG9GLFNBQTFELENBQW9FLCtEQUFwRSxFQUFxSSxJQUFySTs7QUFDQWdPLFFBQUFBLGtCQUFrQixDQUFDQyx1Q0FBbkIsQ0FBMkQsS0FBM0Q7O0FBQ0EsYUFBS3FCLDhCQUFMLENBQW9DLElBQXBDLEVBQTBDLEtBQTFDLEVBQWlELENBQUMsQ0FBbEQsRUFBcURWLE9BQU8sQ0FBQzNaLFNBQTdEO0FBQ0QsT0FaRCxNQVlPO0FBQ0xtQyxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb0YsU0FBMUQsQ0FBb0UsK0NBQXBFOztBQUNBZ08sUUFBQUEsa0JBQWtCLENBQUNDLHVDQUFuQixDQUEyRCxLQUEzRDs7QUFDQSxhQUFLcUIsOEJBQUwsQ0FBb0MsS0FBcEMsRUFBMkMsS0FBM0MsRUFBa0QsQ0FBbEQsRUFBcURWLE9BQU8sQ0FBQzNaLFNBQTdELEVBSEssQ0FJTDtBQUNEO0FBQ0Y7QUFDRixHQTEwRXdCO0FBNDBFekI7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQXNhLEVBQUFBLDBDQXoyRXlCLHNEQXkyRWtCWixXQXoyRWxCLEVBeTJFdUM7QUFBQSxRQUFyQkEsV0FBcUI7QUFBckJBLE1BQUFBLFdBQXFCLEdBQVAsS0FBTztBQUFBOztBQUM5RCxRQUFJWCxrQkFBa0IsR0FBRzVXLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsRUFBekI7O0FBQ0EsUUFBSWdVLE9BQUo7O0FBQ0EsUUFBSUMsU0FBSjs7QUFDQSxRQUFJLEtBQUsvVixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0ErVixNQUFBQSxTQUFTLEdBQUd6WCx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFc0YsaUJBQTdFLEVBQVo7QUFDQTZPLE1BQUFBLE9BQU8sR0FBR3hYLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUF2RztBQUNELEtBSkQsTUFJTyxJQUFJLEtBQUs3QyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDO0FBQ0E4VixNQUFBQSxPQUFPLEdBQUcsS0FBS3RXLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBVjtBQUNBdVcsTUFBQUEsU0FBUyxHQUFHLEtBQUt2VyxjQUFqQjtBQUNEOztBQUNEMFYsSUFBQUEsa0JBQWtCLENBQUN3QixrQ0FBbkIsQ0FBc0QsSUFBdEQ7O0FBQ0F4QixJQUFBQSxrQkFBa0IsQ0FBQ3lCLHNDQUFuQjs7QUFDQXpCLElBQUFBLGtCQUFrQixDQUFDMEIsc0NBQW5CLENBQTBEZCxPQUExRCxFQUFtRUMsU0FBbkUsRUFBOEVGLFdBQTlFLEVBQTJGLEtBQUs3VixZQUFoRztBQUNELEdBejNFd0I7QUEyM0V6QjZXLEVBQUFBLDRDQTMzRXlCLHdEQTIzRW9CaEIsV0EzM0VwQixFQTIzRXlDO0FBQUEsUUFBckJBLFdBQXFCO0FBQXJCQSxNQUFBQSxXQUFxQixHQUFQLEtBQU87QUFBQTs7QUFDaEUsUUFBSVgsa0JBQWtCLEdBQUc1Vyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEVBQXpCOztBQUNBLFFBQUlnVSxPQUFKOztBQUNBLFFBQUlDLFNBQUo7O0FBQ0EsUUFBSSxLQUFLL1YsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBK1YsTUFBQUEsU0FBUyxHQUFHelgsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXNGLGlCQUE3RSxFQUFaO0FBQ0E2TyxNQUFBQSxPQUFPLEdBQUd4WCx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBdkc7QUFDRCxLQUpELE1BSU8sSUFBSSxLQUFLN0MsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQztBQUNBOFYsTUFBQUEsT0FBTyxHQUFHLEtBQUt0VyxjQUFMLENBQW9CLENBQXBCLENBQVY7QUFDQXVXLE1BQUFBLFNBQVMsR0FBRyxLQUFLdlcsY0FBakI7QUFDRDs7QUFDRDBWLElBQUFBLGtCQUFrQixDQUFDNEIsaUNBQW5CLENBQXFELElBQXJEOztBQUNBNUIsSUFBQUEsa0JBQWtCLENBQUM2QixxQ0FBbkI7O0FBQ0E3QixJQUFBQSxrQkFBa0IsQ0FBQzhCLHFDQUFuQixDQUF5RGxCLE9BQXpELEVBQWtFQyxTQUFsRSxFQUE2RUYsV0FBN0UsRUFBMEYsS0FBSzdWLFlBQS9GO0FBQ0QsR0EzNEV3QjtBQTY0RXpCaVgsRUFBQUEsbURBNzRFeUIsK0RBNjRFMkJwQixXQTc0RTNCLEVBNjRFZ0Q7QUFBQSxRQUFyQkEsV0FBcUI7QUFBckJBLE1BQUFBLFdBQXFCLEdBQVAsS0FBTztBQUFBOztBQUN2RSxRQUFJWCxrQkFBa0IsR0FBRzVXLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsRUFBekI7O0FBQ0EsUUFBSWdVLE9BQUo7O0FBQ0EsUUFBSUMsU0FBSjs7QUFDQSxRQUFJLEtBQUsvVixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0ErVixNQUFBQSxTQUFTLEdBQUd6WCx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFc0YsaUJBQTdFLEVBQVo7QUFDQTZPLE1BQUFBLE9BQU8sR0FBR3hYLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUF2RztBQUNELEtBSkQsTUFJTyxJQUFJLEtBQUs3QyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDO0FBQ0E4VixNQUFBQSxPQUFPLEdBQUcsS0FBS3RXLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBVjtBQUNBdVcsTUFBQUEsU0FBUyxHQUFHLEtBQUt2VyxjQUFqQjtBQUNEOztBQUVEMFYsSUFBQUEsa0JBQWtCLENBQUM0QixpQ0FBbkIsQ0FBcUQsSUFBckQ7O0FBQ0E1QixJQUFBQSxrQkFBa0IsQ0FBQzZCLHFDQUFuQjs7QUFDQTdCLElBQUFBLGtCQUFrQixDQUFDOEIscUNBQW5CLENBQXlEbEIsT0FBekQsRUFBa0VDLFNBQWxFLEVBQTZFRixXQUE3RSxFQUEwRixLQUFLN1YsWUFBL0YsRUFBNkcsSUFBN0c7QUFDRCxHQTk1RXdCO0FBZzZFekJrWCxFQUFBQSx1REFoNkV5QixtRUFnNkUrQnJCLFdBaDZFL0IsRUFnNkVvRDtBQUFBLFFBQXJCQSxXQUFxQjtBQUFyQkEsTUFBQUEsV0FBcUIsR0FBUCxLQUFPO0FBQUE7O0FBQzNFLFFBQUlYLGtCQUFrQixHQUFHNVcsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxFQUF6Qjs7QUFDQSxRQUFJZ1UsT0FBSjs7QUFDQSxRQUFJQyxTQUFKOztBQUNBLFFBQUksS0FBSy9WLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQStWLE1BQUFBLFNBQVMsR0FBR3pYLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVzRixpQkFBN0UsRUFBWjtBQUNBNk8sTUFBQUEsT0FBTyxHQUFHeFgsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RkMsaUJBQXZHO0FBQ0QsS0FKRCxNQUlPLElBQUksS0FBSzdDLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakM7QUFDQThWLE1BQUFBLE9BQU8sR0FBRyxLQUFLdFcsY0FBTCxDQUFvQixDQUFwQixDQUFWO0FBQ0F1VyxNQUFBQSxTQUFTLEdBQUcsS0FBS3ZXLGNBQWpCO0FBQ0Q7O0FBQ0QwVixJQUFBQSxrQkFBa0IsQ0FBQ2lDLGlDQUFuQixDQUFxRCxJQUFyRDs7QUFDQWpDLElBQUFBLGtCQUFrQixDQUFDa0MscUNBQW5COztBQUNBbEMsSUFBQUEsa0JBQWtCLENBQUNtQyxxQ0FBbkIsQ0FBeUR2QixPQUF6RCxFQUFrRUMsU0FBbEUsRUFBNkVGLFdBQTdFLEVBQTBGLEtBQUs3VixZQUEvRjtBQUNELEdBaDdFd0I7QUFrN0V6QnNYLEVBQUFBLDBEQWw3RXlCLHNFQWs3RWtDaFQsS0FsN0VsQyxFQWs3RXlDO0FBQ2hFLFFBQUlpVCxNQUFNLEdBQUdqVCxLQUFLLENBQUNzUSxNQUFOLENBQWFsRyxRQUFiLEVBQWI7O0FBQ0EsUUFBSTdCLFlBQVksR0FBR3JDLFFBQVEsQ0FBQ2xHLEtBQUssQ0FBQ3lRLFNBQVAsQ0FBM0I7O0FBQ0EsUUFBSXlDLFdBQVcsR0FBR2xULEtBQUssQ0FBQ21ULFFBQXhCOztBQUNBLFFBQUlDLFNBQVMsR0FBR3BULEtBQUssQ0FBQ3FULFdBQU4sQ0FBa0JqSixRQUFsQixFQUFoQjs7QUFDQSxRQUFJd0csa0JBQWtCLEdBQUc1Vyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEVBQXpCOztBQUNBLFFBQUl5VixNQUFNLElBQUlqWix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGVyxJQUE3RixDQUFrR1csTUFBaEgsRUFBd0g7QUFDdEg5QyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBcUJtVyxXQUFqQzs7QUFFQSxXQUFLLElBQUl6VSxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLdkQsY0FBTCxDQUFvQjBDLE1BQWhELEVBQXdEYSxLQUFLLEVBQTdELEVBQWlFO0FBQy9ELFlBQUksS0FBS3ZELGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQjVHLFNBQTNCLElBQXdDb2IsTUFBNUMsRUFBb0Q7QUFDbEQsZUFBSy9YLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQi9FLHFCQUEzQixHQUFtRCxJQUFuRDtBQUNBLGVBQUt3QixjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkI5RSxxQkFBM0IsR0FBbUR5WixTQUFuRDtBQUVBcFosVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEV3QixpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUszRSxjQUFMLENBQW9CdUQsS0FBcEIsQ0FBbkg7QUFDQXpFLFVBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGdUMsaUJBQXRGLENBQXdHLGdCQUF4RyxFQUEwSCxLQUFLM0UsY0FBL0gsRUFBK0ksSUFBL0k7O0FBQ0EwVixVQUFBQSxrQkFBa0IsQ0FBQ2hPLFNBQW5CLENBQTZCLFlBQVlzUSxXQUFaLEdBQTBCLDZDQUF2RCxFQUFzRyxJQUF0Rzs7QUFDQTtBQUNEO0FBQ0Y7QUFDRjtBQUNGLEdBdjhFd0I7QUF5OEV6QmhCLEVBQUFBLDhCQXo4RXlCLDBDQXk4RU1vQixlQXo4RU4sRUF5OEV1QkMsb0JBejhFdkIsRUF5OEU2Q2hELGNBejhFN0MsRUF5OEU2RGlELE9BejhFN0QsRUF5OEVzRTtBQUM3RixRQUFJeFQsS0FBSyxHQUFHO0FBQUV5VCxNQUFBQSxXQUFXLEVBQUVILGVBQWY7QUFBZ0NJLE1BQUFBLGdCQUFnQixFQUFFSCxvQkFBbEQ7QUFBd0VJLE1BQUFBLGFBQWEsRUFBRXBELGNBQXZGO0FBQXVHM0IsTUFBQUEsRUFBRSxFQUFFNEU7QUFBM0csS0FBWjtBQUNBeFosSUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3FFLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNkVGLEtBQTdFO0FBQ0QsR0E1OEV3QjtBQTg4RXpCNFQsRUFBQUEsNEJBOThFeUIsd0NBODhFSWxGLE9BOThFSixFQTg4RWE7QUFDcEMsUUFBSTFVLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RFksYUFBOUQsTUFBaUYsS0FBckYsRUFBNEY7QUFDMUYsVUFBSTJSLFFBQVEsR0FBRyxLQUFLN1EsVUFBTCxFQUFmOztBQUVBLFVBQUksS0FBS2hELGNBQUwsQ0FBb0I2VCxRQUFwQixFQUE4QnhXLElBQTlCLElBQXNDbVcsT0FBMUMsRUFBbUQ7QUFDakQsYUFBS3hULGNBQUwsQ0FBb0I2VCxRQUFwQixFQUE4QnhXLElBQTlCLElBQXNDbVcsT0FBdEM7QUFDRCxPQUZELE1BRU8sSUFBSSxLQUFLeFQsY0FBTCxDQUFvQjZULFFBQXBCLEVBQThCeFcsSUFBOUIsR0FBcUNtVyxPQUF6QyxFQUFrRDtBQUN2RCxhQUFLeFQsY0FBTCxDQUFvQjZULFFBQXBCLEVBQThCeFcsSUFBOUIsR0FBcUMsQ0FBckM7QUFDRDs7QUFFRHlCLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFd0IsaUJBQTVFLENBQThGLG1CQUE5RixFQUFtSCxLQUFLM0UsY0FBTCxDQUFvQjZULFFBQXBCLENBQW5IO0FBQ0Q7QUFDRixHQTE5RXdCO0FBNDlFekI4RSxFQUFBQSx5QkE1OUV5QixxQ0E0OUVDN1QsS0E1OUVELEVBNDlFUTtBQUMvQixRQUFJME8sT0FBTyxHQUFHMU8sS0FBSyxDQUFDd00sTUFBcEI7QUFDQSxRQUFJc0gsR0FBRyxHQUFHOVQsS0FBSyxDQUFDNE8sRUFBaEI7QUFDQSxRQUFJbUYsSUFBSSxHQUFHL1QsS0FBSyxDQUFDZ1UsR0FBakI7QUFFQSxRQUFJQyxJQUFJLEdBQUdqYSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERDLGVBQTlELEVBQVg7O0FBQ0EsUUFBSXdYLElBQUksSUFBSSxDQUFaLEVBQWU7QUFDYixVQUFJN1YsTUFBTSxHQUFHcEUsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RkMsaUJBQTFHOztBQUVBLFVBQUl2RSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERZLGFBQTlELE1BQWlGLEtBQXJGLEVBQTRGO0FBQzFGLFlBQUkyUixRQUFRLEdBQUcsS0FBSzdRLFVBQUwsRUFBZjs7QUFDQSxZQUFJRSxNQUFNLENBQUN2RyxTQUFQLElBQW9CaWMsR0FBeEIsRUFBNkI7QUFDM0IsZUFBSzVZLGNBQUwsQ0FBb0I2VCxRQUFwQixFQUE4QnhXLElBQTlCLElBQXNDbVcsT0FBdEM7QUFDQTFVLFVBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFd0IsaUJBQTVFLENBQThGLG1CQUE5RixFQUFtSCxLQUFLM0UsY0FBTCxDQUFvQjZULFFBQXBCLENBQW5IO0FBQ0EvVSxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb0YsU0FBMUQsQ0FBb0VtUixJQUFwRTtBQUNEO0FBQ0Y7QUFDRixLQVhELE1BV08sSUFBSUUsSUFBSSxJQUFJLENBQVosRUFBZTtBQUNwQixXQUFLLElBQUl4VixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLdkQsY0FBTCxDQUFvQjBDLE1BQWhELEVBQXdEYSxLQUFLLEVBQTdELEVBQWlFO0FBQy9ELFlBQUksS0FBS3ZELGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQjVHLFNBQTNCLElBQXdDaWMsR0FBeEMsSUFBK0NyVixLQUFLLElBQUksS0FBS3BDLFVBQWpFLEVBQTZFO0FBQzNFLGVBQUtuQixjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJsRyxJQUEzQixJQUFtQ21XLE9BQW5DO0FBQ0ExVSxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb0YsU0FBMUQsQ0FBb0VtUixJQUFwRTtBQUNEO0FBQ0Y7QUFDRjs7QUFDRCxTQUFLalIsWUFBTDtBQUNBOUksSUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRDBXLHVCQUExRDtBQUNELEdBdi9Fd0I7QUF5L0V6QkMsRUFBQUEsZ0NBei9FeUIsNENBeS9FUW5VLEtBei9FUixFQXkvRWU7QUFBQTs7QUFDdEMsUUFBSTRRLGtCQUFrQixHQUFHNVcsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxFQUF6Qjs7QUFDQSxRQUFJLEtBQUt0QyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLFVBQUkwVCxlQUFlLEdBQUd0VCxLQUFLLENBQUN5VCxXQUE1QjtBQUNBLFVBQUlGLG9CQUFvQixHQUFHdlQsS0FBSyxDQUFDMFQsZ0JBQWpDO0FBQ0EsVUFBSW5ELGNBQWMsR0FBR3ZRLEtBQUssQ0FBQzJULGFBQTNCO0FBQ0EsVUFBSWhGLElBQUksR0FBRzNPLEtBQUssQ0FBQzRPLEVBQWpCOztBQUVBZ0MsTUFBQUEsa0JBQWtCLENBQUNDLHVDQUFuQixDQUEyRCxLQUEzRDs7QUFDQSxVQUFJTixjQUFjLElBQUksQ0FBdEIsRUFBeUI7QUFDdkJ2VyxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb0YsU0FBMUQsQ0FBb0UsOERBQXBFLEVBQW9JLElBQXBJOztBQUNBZ08sUUFBQUEsa0JBQWtCLENBQUNjLG9DQUFuQixDQUF3RCxLQUF4RDs7QUFDQSxhQUFLeEosZ0JBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJb0wsZUFBSixFQUFxQjtBQUNuQnRaLFVBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMEQ0VyxzQ0FBMUQsQ0FBaUcsS0FBakc7QUFDQSxlQUFLbFosY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUFyQyxJQUE2QyxJQUE3QztBQUNBeUIsVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRG9GLFNBQTFELENBQW9FLDJEQUFwRSxFQUFpSSxJQUFqSTs7QUFDQWdPLFVBQUFBLGtCQUFrQixDQUFDYyxvQ0FBbkIsQ0FBd0QsS0FBeEQ7O0FBQ0EsZUFBS3hKLGdCQUFMO0FBQ0QsU0FORCxNQU1PLElBQUlxTCxvQkFBSixFQUEwQjtBQUMvQixjQUFJYyxvQkFBb0IsR0FBRyxDQUEzQjs7QUFDQSxjQUFJQyxXQUFXLEdBQUd0YSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFc0YsaUJBQTdFLEVBQWxCOztBQUVBLGVBQUssSUFBSWxFLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHNlYsV0FBVyxDQUFDMVcsTUFBeEMsRUFBZ0RhLEtBQUssRUFBckQsRUFBeUQ7QUFDdkQsZ0JBQUlrUSxJQUFJLElBQUkyRixXQUFXLENBQUM3VixLQUFELENBQVgsQ0FBbUJILGdCQUFuQixDQUFvQ0MsaUJBQXBDLENBQXNEMUcsU0FBbEUsRUFBNkU7QUFDM0V3YyxjQUFBQSxvQkFBb0IsR0FBRzVWLEtBQXZCO0FBQ0E7QUFDRDtBQUNGOztBQUVEekUsVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRG9GLFNBQTFELENBQW9FLHdEQUFwRSxFQUE4SCxJQUE5SCxFQVgrQixDQWEvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQXJDLFVBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2ZxUSxZQUFBQSxrQkFBa0IsQ0FBQ2Msb0NBQW5CLENBQXdELEtBQXhEOztBQUNBLFlBQUEsT0FBSSxDQUFDeEosZ0JBQUw7QUFDRCxXQUhTLEVBR1AsR0FITyxDQUFWO0FBSUQ7QUFDRjtBQUNGO0FBQ0YsR0E5a0Z3QjtBQWdsRnpCcU0sRUFBQUEsMENBaGxGeUIsc0RBZ2xGa0J2VSxLQWhsRmxCLEVBZ2xGeUI7QUFBQTs7QUFDaEQsUUFBSWpHLFVBQVUsSUFBSSxJQUFsQixFQUF3QjtBQUN0QndHLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsUUFBQSxPQUFJLENBQUNnVSwwQ0FBTCxDQUFnRHZVLEtBQWhEO0FBQ0QsT0FGUyxFQUVQLEdBRk8sQ0FBVjtBQUdELEtBSkQsTUFJTztBQUNMLFVBQUl3VSxPQUFPLEdBQUd4VSxLQUFLLENBQUNmLElBQU4sQ0FBV3dWLFVBQXpCO0FBQ0EsVUFBSXhSLFFBQVEsR0FBR2pELEtBQUssQ0FBQ2YsSUFBTixDQUFXeVYsT0FBMUI7O0FBRUEsVUFBSTVWLE1BQU0sR0FBRzdKLEVBQUUsQ0FBQzhKLElBQUgsQ0FBUS9FLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NvRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEZ0UsUUFBUSxHQUFHcEksVUFBckUsRUFBaUZxRSxpQkFBakYsQ0FBbUdDLFFBQW5HLENBQTRHQyxDQUFwSCxFQUF1SHBGLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NvRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEckYsV0FBMUQsRUFBdUVzRixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHRSxDQUF6TixDQUFiOztBQUNBLFdBQUtzVix3QkFBTCxDQUE4QixLQUFLblosY0FBTCxDQUFvQixLQUFLYSxVQUF6QixDQUE5QixFQUFvRXlDLE1BQXBFLEVBQTRFLEdBQTVFO0FBRUFsRixNQUFBQSxXQUFXLEdBQUdxSixRQUFkOztBQUNBLFVBQUluRSxNQUFNLEdBQUc3SixFQUFFLENBQUM4SixJQUFILENBQVEvRSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJGLFdBQTFELEVBQXVFc0YsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0MsQ0FBMUcsRUFBNkdwRix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJGLFdBQTFELEVBQXVFc0YsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0UsQ0FBL00sQ0FBYjs7QUFDQSxXQUFLc1Ysd0JBQUwsQ0FBOEIsS0FBS25aLGNBQUwsQ0FBb0IsS0FBS2EsVUFBekIsQ0FBOUIsRUFBb0V5QyxNQUFwRTtBQUNEO0FBQ0YsR0FobUZ3QjtBQWttRnpCNlYsRUFBQUEsd0JBQXdCLEVBQUUsa0NBQVV0WixJQUFWLEVBQWdCMlEsS0FBaEIsRUFBdUJDLEtBQXZCLEVBQW9DO0FBQUEsUUFBYkEsS0FBYTtBQUFiQSxNQUFBQSxLQUFhLEdBQUwsR0FBSztBQUFBOztBQUM1RGhYLElBQUFBLEVBQUUsQ0FBQ3NXLEtBQUgsQ0FBU2xRLElBQVQsRUFDR21RLEVBREgsQ0FDTVMsS0FETixFQUNhO0FBQUU5TSxNQUFBQSxRQUFRLEVBQUVsSyxFQUFFLENBQUN3VyxFQUFILENBQU1PLEtBQUssQ0FBQzVNLENBQVosRUFBZTRNLEtBQUssQ0FBQzNNLENBQXJCO0FBQVosS0FEYixFQUNvRDtBQUFFcU0sTUFBQUEsTUFBTSxFQUFFO0FBQVYsS0FEcEQsRUFFR0MsSUFGSCxDQUVRLFlBQU0sQ0FBRSxDQUZoQixFQUdHRSxLQUhIO0FBSUQsR0F2bUZ3QjtBQXltRnpCK0ksRUFBQUEsK0JBem1GeUIsNkNBeW1GUztBQUNoQ2hiLElBQUFBLFdBQVcsSUFBSWlCLFVBQWY7O0FBRUEsUUFBSSxLQUFLYSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFVBQUlzRSxLQUFLLEdBQUc7QUFBRWYsUUFBQUEsSUFBSSxFQUFFO0FBQUV3VixVQUFBQSxVQUFVLEVBQUU1WixVQUFkO0FBQTBCNlosVUFBQUEsT0FBTyxFQUFFOWE7QUFBbkM7QUFBUixPQUFaO0FBQ0FJLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NxRSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFRixLQUE5RTtBQUNEOztBQUVELFFBQUlsQixNQUFNLEdBQUc3SixFQUFFLENBQUM4SixJQUFILENBQVEvRSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJGLFdBQTFELEVBQXVFc0YsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0MsQ0FBMUcsRUFBNkdwRix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJGLFdBQTFELEVBQXVFc0YsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0UsQ0FBL00sQ0FBYjs7QUFDQSxTQUFLc1Ysd0JBQUwsQ0FBOEIsS0FBS25aLGNBQUwsQ0FBb0IsS0FBS2EsVUFBekIsQ0FBOUIsRUFBb0V5QyxNQUFwRTtBQUNBLFNBQUtvSixnQkFBTDtBQUNELEdBcG5Gd0I7QUFzbkZ6QjJNLEVBQUFBLCtDQXRuRnlCLDJEQXNuRnVCN1UsS0F0bkZ2QixFQXNuRjhCO0FBQ3JELFFBQUksS0FBS3RFLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBSTFCLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZ3QyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsS0FBOUgsRUFBcUk7QUFDbkksWUFBSStULEdBQUcsR0FBRzlVLEtBQUssQ0FBQzRPLEVBQWhCO0FBQ0EsWUFBSXJMLFdBQVcsR0FBR3ZELEtBQUssQ0FBQytVLE1BQXhCO0FBQ0EsWUFBSUMsU0FBUyxHQUFHaFYsS0FBSyxDQUFDaVYsUUFBdEI7QUFDQSxZQUFJQyxjQUFjLEdBQUdsVixLQUFLLENBQUNtVixhQUEzQjtBQUNBLFlBQUlDLFFBQVEsR0FBR3BiLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUE1Rzs7QUFFQSxZQUFJd1EsUUFBUSxHQUFHLENBQUMsQ0FBaEI7O0FBQ0FqUyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXFZLFFBQVEsQ0FBQ3ZkLFNBQXJCO0FBQ0FpRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWStYLEdBQVo7O0FBRUEsWUFBSU0sUUFBUSxDQUFDdmQsU0FBVCxDQUFtQnVTLFFBQW5CLE1BQWlDMEssR0FBRyxDQUFDMUssUUFBSixFQUFyQyxFQUFxRDtBQUNuRCxlQUFLLElBQUkzTCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLdkQsY0FBTCxDQUFvQjBDLE1BQWhELEVBQXdEYSxLQUFLLEVBQTdELEVBQWlFO0FBQy9ELGdCQUFJLEtBQUt2RCxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkI1RyxTQUEzQixJQUF3Q2lkLEdBQTVDLEVBQWlEO0FBQy9DLGtCQUFJLEtBQUs1WixjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ6RyxZQUEzQixDQUF3Q2tkLGNBQXhDLEVBQXdEdmYsWUFBeEQsSUFBd0UsQ0FBNUUsRUFBK0U7QUFDN0U7QUFDQSxxQkFBS3VGLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQnZHLGVBQTNCO0FBQ0QsZUFIRCxNQUdPLElBQUksS0FBS2dELGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQnpHLFlBQTNCLENBQXdDa2QsY0FBeEMsRUFBd0R2ZixZQUF4RCxJQUF3RSxDQUE1RSxFQUErRTtBQUNwRjtBQUNBLG9CQUFJMGYsVUFBVSxHQUFHLEtBQUtuYSxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ6RyxZQUEzQixDQUF3Q2tkLGNBQXhDLEVBQXdEeGUsYUFBeEQsQ0FBc0VrSCxNQUF2RjtBQUNBLHFCQUFLMUMsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCdEcsb0JBQTNCO0FBQ0EscUJBQUsrQyxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJwRyxvQkFBM0IsSUFBbURnZCxVQUFuRDtBQUNEOztBQUVELG1CQUFLbmEsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCekcsWUFBM0IsQ0FBd0NvSixNQUF4QyxDQUErQzhULGNBQS9DLEVBQStELENBQS9EO0FBQ0FuRyxjQUFBQSxRQUFRLEdBQUd0USxLQUFYO0FBQ0E7QUFDRDtBQUNGOztBQUVEM0IsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzdCLGNBQUwsQ0FBb0I2VCxRQUFwQixDQUFaOztBQUNBLGNBQUlBLFFBQVEsSUFBSSxDQUFDLENBQWpCLEVBQW9CO0FBQ2xCLGdCQUFJLEtBQUs3VCxjQUFMLENBQW9CNlQsUUFBcEIsRUFBOEIvVyxZQUE5QixDQUEyQzRGLE1BQTNDLEdBQW9ELENBQXhELEVBQTJEO0FBQ3pEO0FBQ0E1RCxjQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb0YsU0FBMUQsQ0FBb0UsbUJBQW1Cb1MsU0FBUyxDQUFDOWUsWUFBN0IsR0FBNEMsd0RBQWhIO0FBQ0QsYUFIRCxNQUdPO0FBQ0w4RCxjQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb0YsU0FBMUQsQ0FBb0UsbUJBQW1Cb1MsU0FBUyxDQUFDOWUsWUFBN0IsR0FBNEMsc0hBQWhIO0FBQ0EsbUJBQUtnRixjQUFMLENBQW9CNlQsUUFBcEIsRUFBOEI5VyxpQkFBOUIsQ0FBZ0RULGtCQUFoRCxHQUFxRSxJQUFyRTtBQUNEOztBQUVEd0MsWUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEV3QixpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUszRSxjQUFMLENBQW9CNlQsUUFBcEIsQ0FBbkg7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGLEdBcnFGd0I7QUF1cUZ6QnVHLEVBQUFBLGtDQXZxRnlCLDhDQXVxRlV0VixLQXZxRlYsRUF1cUZpQitELE1BdnFGakIsRUF1cUZ5QndFLFlBdnFGekIsRUF1cUYyQ2dOLGdCQXZxRjNDLEVBdXFGcUU7QUFBQSxRQUE1Q2hOLFlBQTRDO0FBQTVDQSxNQUFBQSxZQUE0QyxHQUE3QixDQUE2QjtBQUFBOztBQUFBLFFBQTFCZ04sZ0JBQTBCO0FBQTFCQSxNQUFBQSxnQkFBMEIsR0FBUCxLQUFPO0FBQUE7O0FBQzVGLFFBQUlQLFNBQVMsR0FBR2hWLEtBQUssQ0FBQ2hJLFlBQU4sQ0FBbUIrTCxNQUFuQixDQUFoQjtBQUNBakgsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlpWSxTQUFaOztBQUVBLFFBQUlRLFNBQVMsR0FBRyxLQUFLL08sWUFBTCxFQUFoQjs7QUFDQSxRQUFJZ1AsbUJBQW1CLEdBQUcsS0FBMUI7O0FBQ0EsUUFBSW5RLE9BQU8sR0FBR2tRLFNBQVMsR0FBR0MsbUJBQTFCOztBQUNBLFFBQUlDLE9BQU8sR0FBRyxJQUFkLENBUDRGLENBUzVGOztBQUNBQSxJQUFBQSxPQUFPLEdBQUcsS0FBS3hhLGNBQUwsQ0FBb0JxTixZQUFwQixDQUFWO0FBRUEsUUFBSW9OLFlBQVksR0FBRztBQUFFL0csTUFBQUEsRUFBRSxFQUFFOEcsT0FBTyxDQUFDN2QsU0FBZDtBQUF5QmtkLE1BQUFBLE1BQU0sRUFBRVcsT0FBakM7QUFBMENULE1BQUFBLFFBQVEsRUFBRUQsU0FBcEQ7QUFBK0RHLE1BQUFBLGFBQWEsRUFBRXBSO0FBQTlFLEtBQW5CO0FBQ0EvSixJQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RXlWLFlBQTlFOztBQUVBLFFBQUksQ0FBQ1gsU0FBUyxDQUFDcmUsU0FBZixFQUEwQjtBQUN4QixXQUFLdUUsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUFyQyxJQUE2QytNLE9BQTdDO0FBRUF0TCxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb0YsU0FBMUQsQ0FDRSxPQUFPLGdCQUFQLEdBQTBCNFMsU0FBMUIsR0FBc0MsSUFBdEMsR0FBNkMsSUFBN0MsR0FBb0QsV0FBcEQsR0FBa0VBLFNBQWxFLEdBQThFLEtBQTlFLEdBQXNGQyxtQkFBdEYsR0FBNEcsTUFBNUcsR0FBcUhuUSxPQUFySCxHQUErSCxJQUEvSCxHQUFzSSxJQUF0SSxHQUE2SSxrQkFBN0ksR0FBa0tBLE9BQWxLLEdBQTRLLDREQUE1SyxHQUEyTyxLQUFLcEssY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQURsUjtBQUlBeUIsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRG9ZLHVDQUExRDtBQUNELEtBUkQsTUFRTztBQUNMLFVBQUlDLFFBQVEsR0FBRyxLQUFLM2EsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUFyQyxHQUE0QytNLE9BQTNEOztBQUNBLFVBQUl1USxRQUFRLElBQUliLFNBQVMsQ0FBQ3BlLFVBQTFCLEVBQXNDO0FBQ3BDaWYsUUFBQUEsUUFBUSxJQUFJYixTQUFTLENBQUNwZSxVQUF0QjtBQUNBLGFBQUtzRSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzlELElBQXJDLEdBQTRDc2QsUUFBNUM7QUFFQTdiLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERvRixTQUExRCxDQUNFLE9BQ0UsZ0JBREYsR0FFRTRTLFNBRkYsR0FHRSxJQUhGLEdBSUUsSUFKRixHQUtFLGlCQUxGLEdBTUVSLFNBQVMsQ0FBQ3BlLFVBTlosR0FPRSxJQVBGLEdBUUUsSUFSRixHQVNFLFdBVEYsR0FVRTRlLFNBVkYsR0FXRSxLQVhGLEdBWUVDLG1CQVpGLEdBYUUsTUFiRixHQWNFblEsT0FkRixHQWVFLElBZkYsR0FnQkUsSUFoQkYsR0FpQkUscURBakJGLEdBa0JFLEtBQUtwSyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzlELElBbkJ6QztBQXFCQXlCLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERvWSx1Q0FBMUQ7QUFDRCxPQTFCRCxNQTBCTztBQUNMNWIsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRG9GLFNBQTFELENBQW9FLHNFQUFwRTtBQUNBNUksUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRG9ZLHVDQUExRDtBQUNEO0FBQ0Y7QUFDRixHQS90RndCO0FBaXVGekJFLEVBQUFBLDhDQWp1RnlCLDBEQWl1RnNCOVYsS0FqdUZ0QixFQWl1RjZCO0FBQ3BELFFBQUksS0FBS3RFLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBSTFCLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZ3QyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsS0FBOUgsRUFBcUk7QUFDbkksWUFBSStULEdBQUcsR0FBRzlVLEtBQUssQ0FBQzRPLEVBQWhCO0FBQ0EsWUFBSW1ILFdBQVcsR0FBRy9WLEtBQUssQ0FBQzdKLE1BQXhCO0FBQ0EsWUFBSStlLGNBQWMsR0FBR2xWLEtBQUssQ0FBQ21WLGFBQTNCO0FBQ0EsWUFBSWEsU0FBUyxHQUFHaFcsS0FBSyxDQUFDaVcsSUFBdEI7QUFDQSxZQUFJQyxXQUFXLEdBQUdsVyxLQUFLLENBQUNtVyxNQUF4QjtBQUNBLFlBQUlmLFFBQVEsR0FBR3BiLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUE1Rzs7QUFDQSxZQUFJd1EsUUFBUSxHQUFHLEtBQUs3USxVQUFMLEVBQWY7O0FBQ0EsWUFBSWtYLFFBQVEsQ0FBQ3ZkLFNBQVQsSUFBc0JpZCxHQUFHLENBQUMxSyxRQUFKLEVBQTFCLEVBQTBDO0FBQ3hDLGVBQUtsUCxjQUFMLENBQW9CNlQsUUFBcEIsRUFBOEJ4VyxJQUE5QixJQUFzQzJOLFFBQVEsQ0FBQzZQLFdBQUQsQ0FBOUM7QUFDQSxlQUFLN2EsY0FBTCxDQUFvQjZULFFBQXBCLEVBQThCL1csWUFBOUIsQ0FBMkNrZCxjQUEzQyxFQUEyRDdlLGFBQTNELEdBQTJFLElBQTNFO0FBQ0EsZUFBSzZFLGNBQUwsQ0FBb0I2VCxRQUFwQixFQUE4Qi9XLFlBQTlCLENBQTJDa2QsY0FBM0MsRUFBMkQxZSxTQUEzRCxHQUF1RXdmLFNBQXZFO0FBQ0EsZUFBSzlhLGNBQUwsQ0FBb0I2VCxRQUFwQixFQUE4Qi9XLFlBQTlCLENBQTJDa2QsY0FBM0MsRUFBMkR6ZSxXQUEzRCxHQUF5RXlmLFdBQXpFO0FBRUFsYyxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RXdCLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUgsS0FBSzNFLGNBQUwsQ0FBb0I2VCxRQUFwQixDQUFuSDtBQUNBL1UsVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRG9GLFNBQTFELENBQW9Fc1QsV0FBVyxHQUFHLDZCQUFkLEdBQThDSCxXQUE5QyxHQUE0RCw2Q0FBNUQsR0FBNEcsS0FBSzdhLGNBQUwsQ0FBb0I2VCxRQUFwQixFQUE4Qi9XLFlBQTlCLENBQTJDa2QsY0FBM0MsRUFBMkRoZixZQUEzTztBQUNEO0FBQ0Y7QUFDRjtBQUNGLEdBdHZGd0I7QUF1dkZ6QmtnQixFQUFBQSwyQ0F2dkZ5Qix5REF1dkZxQjtBQUM1QyxRQUFJLEtBQUtsYixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzlELElBQXJDLElBQTZDbkYsa0JBQWpELEVBQXFFO0FBQ25FLFdBQUs4SCxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzlELElBQXJDLElBQTZDbkYsa0JBQTdDO0FBQ0E0RyxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb0YsU0FBMUQsQ0FBb0Usa0ZBQWtGLEtBQUsxSCxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzlELElBQTNMO0FBQ0F5QixNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEb1ksdUNBQTFEO0FBQ0E1YixNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBENlksNEJBQTFELENBQXVGLEtBQXZGO0FBQ0EsVUFBSVYsWUFBWSxHQUFHO0FBQUUvRyxRQUFBQSxFQUFFLEVBQUV2YixvQkFBTjtBQUE0QjhDLFFBQUFBLE1BQU0sRUFBRS9DLGtCQUFwQztBQUF3RCtoQixRQUFBQSxhQUFhLEVBQUU3aEIsdUJBQXZFO0FBQWdHMmlCLFFBQUFBLElBQUksRUFBRSxLQUFLL2EsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN4RSxTQUEzSTtBQUFzSnNlLFFBQUFBLE1BQU0sRUFBRSxLQUFLamIsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN6RTtBQUFuTSxPQUFuQjtBQUNBb0MsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3FFLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsRUFBMUUsRUFBOEV5VixZQUE5RTtBQUNELEtBUEQsTUFPTztBQUNMM2IsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRDhZLGdDQUExRCxDQUEyRixJQUEzRixFQURLLENBRUw7QUFDRDtBQUNGLEdBbndGd0I7QUFvd0Z6QkMsRUFBQUEsaUNBcHdGeUIsNkNBb3dGU3ZXLEtBcHdGVCxFQW93RmdCK0QsTUFwd0ZoQixFQW93RndCd0UsWUFwd0Z4QixFQW93RjBDO0FBQUEsUUFBbEJBLFlBQWtCO0FBQWxCQSxNQUFBQSxZQUFrQixHQUFILENBQUc7QUFBQTs7QUFDakU7QUFDQTtBQUVBLFFBQUlpTixTQUFTLEdBQUcsS0FBSy9PLFlBQUwsRUFBaEI7O0FBQ0EsUUFBSWdQLG1CQUFtQixHQUFHLElBQTFCOztBQUNBLFFBQUluUSxPQUFPLEdBQUdrUSxTQUFTLEdBQUdDLG1CQUExQjs7QUFFQXJpQixJQUFBQSxrQkFBa0IsR0FBR2tTLE9BQXJCO0FBQ0FqUyxJQUFBQSxvQkFBb0IsR0FBRyxLQUFLNkgsY0FBTCxDQUFvQnFOLFlBQXBCLEVBQWtDMVEsU0FBekQ7QUFDQXZFLElBQUFBLHVCQUF1QixHQUFHeVEsTUFBMUI7QUFFQSxRQUFJMlIsT0FBTyxHQUFHLElBQWQ7O0FBQ0EsUUFBSWMsS0FBSyxHQUFHLE9BQU8sZ0JBQVAsR0FBMEJoQixTQUExQixHQUFzQyxJQUF0QyxHQUE2QyxJQUE3QyxHQUFvRCxtQkFBcEQsR0FBMEVBLFNBQTFFLEdBQXNGLEtBQXRGLEdBQThGQyxtQkFBOUYsR0FBb0gsTUFBcEgsR0FBNkhuUSxPQUF6STs7QUFFQXRMLElBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMEQ2WSw0QkFBMUQsQ0FBdUYsSUFBdkY7QUFDQXJjLElBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERpWiw0QkFBMUQsQ0FBdUZELEtBQXZGO0FBQ0QsR0FyeEZ3QjtBQXN4RnpCRSxFQUFBQSxpRUF0eEZ5Qiw2RUFzeEZ5QzFXLEtBdHhGekMsRUFzeEZnRDtBQUN2RSxRQUFJLEtBQUt0RSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFVBQUkxQix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGd0MsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILEtBQTlILEVBQXFJO0FBQ25JLFlBQUkyVSxPQUFPLEdBQUcxVixLQUFLLENBQUMrVSxNQUFwQjs7QUFDQSxZQUFJeE0sWUFBWSxHQUFHckMsUUFBUSxDQUFDbEcsS0FBSyxDQUFDMlcsV0FBUCxDQUEzQjs7QUFDQSxZQUFJWCxTQUFTLEdBQUdoVyxLQUFLLENBQUM0VyxRQUF0Qjs7QUFFQSxZQUFJaEcsa0JBQWtCLEdBQUc1Vyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEVBQXpCOztBQUNBLFlBQUlrWSxPQUFPLENBQUM3ZCxTQUFSLElBQXFCbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQTNILEVBQW1JO0FBQ2pJOUMsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQXFCMlksT0FBTyxDQUFDOWQsVUFBekM7O0FBRUFnWixVQUFBQSxrQkFBa0IsQ0FBQ2lHLDBCQUFuQixDQUE4Q2IsU0FBOUM7O0FBQ0FwRixVQUFBQSxrQkFBa0IsQ0FBQ2tHLCtCQUFuQixDQUFtRCxJQUFuRDs7QUFDQWxHLFVBQUFBLGtCQUFrQixDQUFDbUcscUNBQW5CLENBQXlELEtBQXpEO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsR0F2eUZ3QixDQXl5RnpCO0FBQ0E7O0FBMXlGeUIsQ0FBVCxDQUFsQixFQTR5RkE7O0FBQ0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmpjLFdBQWpCLEVBQ0EiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfaXNUZXN0ID0gZmFsc2U7XHJcbnZhciBfZGljZWlucHV0MSA9IFwiXCI7XHJcbnZhciBfZGljZWlucHV0MiA9IFwiXCI7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsMSA9IC0xO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDIgPSAtMTtcclxudmFyIGhhbGZCdXNpbmVzc0Ftb3VudCA9IDA7XHJcbnZhciBoYWxmQnVzaW5lc3NBbW91bnRJRCA9IFwiXCI7XHJcbnZhciBoYWxmQnVzaW5lc3NBbW91bnRJbmRleCA9IDA7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsMyA9IC0xO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDQgPSAtMTtcclxuXHJcbnZhciBQcmV2aW91c0RpY2VSb2xsNSA9IC0xO1xyXG5cclxudmFyIHVzZXJHYW1lT3ZlciA9IGZhbHNlO1xyXG52YXIgQm90R2FtZU92ZXIgPSBmYWxzZTtcclxudmFyIFRvdGFsQ291bnRlclJlYWNoZWQgPSBmYWxzZTtcclxudmFyIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG52YXIgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcbnZhciBOb0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbnZhciBQbGF5ZXJMZWZ0ID0gZmFsc2U7XHJcbnZhciBGb3JjZUNoYW5nZVRpbWVPdXQgPSBudWxsO1xyXG52YXIgR2FtZUNvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgQ29ycmVjdEFuc3dlciA9IDA7XHJcblxyXG52YXIgVm9jYWJ1bGFyeVF1ZXN0aW9ucyA9IFtdO1xyXG52YXIgRXN0YWJsaXNobWVudFF1ZXN0aW9ucyA9IFtdO1xyXG52YXIgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG52YXIgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG5cclxudmFyIEJpZ0J1c2luZXNzQXJyYXkgPSBbXTtcclxudmFyIExvc3Nlc0FycmF5ID0gW107XHJcbnZhciBNYXJrZXRpbmdBcnJheSA9IFtdO1xyXG52YXIgV2lsZENhcmRBcnJheSA9IFtdO1xyXG52YXIgQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIgPSAwO1xyXG52YXIgTG9zc2VzQXJyYXlDb3VudGVyID0gMDtcclxudmFyIE1hcmtldGluZ0FycmF5Q291bnRlciA9IDA7XHJcbnZhciBXaWxkQ2FyZEFycmF5Q291bnRlciA9IDA7XHJcblxyXG4vLyNyZWdpb24gc3VwZXJjbGFzc2VzIGFuZCBlbnVtZXJhdGlvbnNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIHR5cGUgb2YgYnVzaW5lc3MtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEVudW1CdXNpbmVzc1R5cGUgPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIEhvbWVCYXNlZDogMSwgLy9hIGJ1c2luZXNzIHRoYXQgeW91IG9wZXJhdGUgb3V0IG9mIHlvdXIgaG9tZVxyXG4gIGJyaWNrQW5kbW9ydGFyOiAyLCAvL2Egc3RvcmUgZnJvbnQgYnVzaW5lc3NcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3NJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc0luZm9cIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lOiBcIkJ1c2luZXNzRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NUeXBlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vZGVcIixcclxuICAgICAgdHlwZTogRW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgZGVmYXVsdDogRW51bUJ1c2luZXNzVHlwZS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQnVzaW5lc3MgY2F0b2dvcnkgZm9yIHBsYXllcnNcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUeXBlXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJUeXBlIChieSBuYW1lKSBvZiBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOYW1lIG9mIHRoZSBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLFxyXG4gICAgfSxcclxuICAgIEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImJhbGFuY2Ugb2YgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBJc1BhcnRuZXJzaGlwOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzUGFydG5lcnNoaXBcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cHc6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGRvbmUgcGFydG5lcnNoaXAgd2l0aCBzb21lb25lIHdpdGggY3VycmVudCBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXJ0bmVySURcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklEIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhcnRuZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJuYW1lIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLFxyXG4gICAgfSxcclxuICAgIExvY2F0aW9uc05hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9jYXRpb25zTmFtZVwiLFxyXG4gICAgICB0eXBlOiBbY2MuVGV4dF0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaWYgcGxheWVyIG93bnMgYnJpY2sgYW5kIG1vcnRhciBoZS9zaGUgY2FuIGV4cGFuZCB0byBuZXcgbG9jYXRpb25cIixcclxuICAgIH0sXHJcbiAgICBMb2FuVGFrZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblRha2VuXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBSZWNlaXZlRG91YmxlUGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlY2VpdmVEb3VibGVQYXlEYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQ2FyZERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhRnVuY3Rpb25hbGl0eSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkNhcmREYXRhRnVuY3Rpb25hbGl0eVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5leHRUdXJuRG91YmxlUGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5leHRUdXJuRG91YmxlUGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBpdHMgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcE5leHRUdXJuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBOZXh0VHVyblwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgdHVybiBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgdHVybiBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTmV4dFBheWRheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcEhNTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwSE1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGhvbWUgYmFzZWQgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcEJNTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwQk1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGJyaWNrYSBhbmQgbW1vcnRhciBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBOZXh0VHVybkhhbGZQYXlEYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmV4dFR1cm5IYWxmUGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBIYXNNYXJrZXRpbmdDb21wYW55OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhhc01hcmtldGluZ0NvbXBhbnlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBCYW5rcnVwdGVkTmV4dFR1cm46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQmFua3J1cHRlZE5leHRUdXJuXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFN0b2NrSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3RvY2tJbmZvID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU3RvY2tJbmZvXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZTogXCJTdG9ja0RhdGFcIixcclxuICAgIEJ1c2luZXNzTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc05hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5hbWUgb2YgdGhlIGJ1c2luZXNzIGluIHdoaWNoIHN0b2NrcyB3aWxsIGJlIGhlbGRcIixcclxuICAgIH0sXHJcbiAgICBTaGFyZUFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTaGFyZUFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiU2hhcmUgYW1vdW50IG9mIHRoZSBzdG9ja1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgIFBsYXllciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGxheWVyRGF0YVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibmFtZSBvZiB0aGUgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyVUlEOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclVJRFwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiSUQgb2YgdGhlIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEF2YXRhcklEOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhcklEXCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpZCByZWZlcmVuY2UgZm9yIHBsYXllciBhdmF0YXIgc2VsZWN0aW9uXCIsXHJcbiAgICB9LFxyXG4gICAgSXNCb3Q6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNCb3RcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cHc6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBjdXJyZW50IHBsYXllciBpcyBib3RcIixcclxuICAgIH0sXHJcbiAgICBOb09mQnVzaW5lc3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NcIixcclxuICAgICAgdHlwZTogW0J1c2luZXNzSW5mb10sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTnVtYmVyIG9mIGJ1c2luZXNzIGEgcGxheWVyIGNhbiBvd25cIixcclxuICAgIH0sXHJcbiAgICBDYXJkRnVuY3Rpb25hbGl0eToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXJkRnVuY3Rpb25hbGl0eVwiLFxyXG4gICAgICB0eXBlOiBDYXJkRGF0YUZ1bmN0aW9uYWxpdHksXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjYXJkIGZ1bmN0aW9uYWxpdHkgc3RvcmVkIGJ5IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWRBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm51bWJlciBvZiBob21lIGJhc2VkIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhckFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhckFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIG9mIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIFJlY2VpdmVEb3VibGVQYXlEYXlBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVjZWl2ZURvdWJsZVBheURheUFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxMb2NhdGlvbnNBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxMb2NhdGlvbnNBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm51bWJlciBvZiBsb2NhdGlvbnMgb2YgYWxsIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3Nlc3NcIixcclxuICAgIH0sXHJcbiAgICBOb09mU3RvY2tzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2Nrc1wiLFxyXG4gICAgICB0eXBlOiBbU3RvY2tJbmZvXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOdW1iZXIgb2Ygc3RvY2sgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIENhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQW1vdW50IG9mIGNhc2ggcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBHb2xkQ291bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR29sZENvdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjb3VudCBvZiBnb2xkIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBTdG9ja0NvdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2NrQ291bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImNvdW50IG9mIHN0b2NrcyBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblRha2VuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5UYWtlblwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgdGFrZW4gbG9hbiBmcm9tIGJhbmsgb3Igbm90XCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgbG9hbiB0YWtlbiBmcm9tIHRoZSBiYW5rXCIsXHJcbiAgICB9LFxyXG4gICAgTWFya2V0aW5nQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0Ftb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibWFya2V0aW5nIGFtb3VudCBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgTGF3eWVyU3RhdHVzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxhd3llclN0YXR1c1wiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgaGlyZWQgYSBsYXd5ZXIgb3Igbm90XCIsXHJcbiAgICB9LFxyXG4gICAgSXNCYW5rcnVwdDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc0JhbmtydXB0XCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBiZWVuIEJhbmtydXB0ZWQgb3Igbm90XCIsXHJcbiAgICB9LFxyXG4gICAgQmFua3J1cHRBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQmFua3J1cHRBbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaG93IG11Y2ggdGltZSBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFwiLFxyXG4gICAgfSxcclxuICAgIFNraXBwZWRMb2FuUGF5bWVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwcGVkTG9hblBheW1lbnRcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHNraXBwZWQgbG9hbiBwYXltZW50XCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyUm9sbENvdW50ZXI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyUm9sbENvdW50ZXJcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImludGVnZXIgdG8gc3RvcmUgcm9sbCBjb3VudG9yIGZvciBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBJbml0aWFsQ291bnRlckFzc2lnbmVkOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkluaXRpYWxDb3VudGVyQXNzaWduZWRcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBpc0dhbWVGaW5pc2hlZDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJpc0dhbWVGaW5pc2hlZFwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsU2NvcmU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxTY29yZVwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxIQkNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxIQkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQk1DYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQk1DYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEdvbGRDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsR29sZENhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsTG9hbkJhbGFuY2U6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxMb2FuQmFsYW5jZVwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxTdG9ja3NDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsU3RvY2tzQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgR2FtZU92ZXI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR2FtZU92ZXJcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBJc0FjdGl2ZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc0FjdGl2ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhbkdpdmVQcm9maXRPblBheURheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFVzZXJJREZvclByb2ZpdFBheURheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJVc2VySURGb3JQcm9maXRQYXlEYXlcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gR2FtZSBNYW5hZ2VyIENsYXNzXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLShtYWluIGNsYXNzKSBjbGFzcyBmb3IgR2FtZSBNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSb2xsQ291bnRlciA9IDA7XHJcbnZhciBEaWNlVGVtcCA9IDA7XHJcbnZhciBEaWNlUm9sbCA9IDA7XHJcbnZhciBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxudmFyIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG5cclxudmFyIFBhc3NlZFBheURheSA9IGZhbHNlO1xyXG52YXIgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcblxyXG4vL2NhcmRzIGZ1bmN0aW9uYWxpdHlcclxudmFyIF9uZXh0VHVybkRvdWJsZVBheSA9IGZhbHNlO1xyXG52YXIgX25leHRUdXJuaGFsZlBheSA9IGZhbHNlO1xyXG52YXIgX3NraXBOZXh0VHVybiA9IGZhbHNlO1xyXG52YXIgX3NraXBOZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCB3aG9sZSBwYXkgZGF5XHJcbnZhciBfc2tpcEhNTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBfc2tpcEJNTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxudmFyIFR1cm5JblByb2dyZXNzID0gZmFsc2U7XHJcblxyXG52YXIgQmFja3NwYWNlcyA9IDM7XHJcbnZhciBpc0dhbWVPdmVyID0gZmFsc2U7XHJcblxyXG52YXIgQ2FyZERpc3BsYXlTZXRUaW1vdXQgPSBudWxsO1xyXG5cclxudmFyIEdhbWVNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiR2FtZU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyR2FtZUluZm86IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImFsbCBwbGF5ZXIncyBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgQm90R2FtZUluZm86IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImFsbCBib3QncyBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIENhbWVyYU5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBjYW1lcmFcIixcclxuICAgIH0sXHJcbiAgICBBbGxQbGF5ZXJVSToge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2Ugb2YgdWkgb2YgYWxsIHBsYXllcnNcIixcclxuICAgIH0sXHJcbiAgICBBbGxQbGF5ZXJOb2Rlczoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2Ugb2Ygbm9kZSBvZiBhbGwgcGxheWVycyBpbnNpZGUgZ2FtZXBsYXlcIixcclxuICAgIH0sXHJcbiAgICBTdGFydExvY2F0aW9uTm9kZXM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIGF0dGF5IG9mIGxvY2F0aW9uc1wiLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdGVkTW9kZToge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciByZWZlcmVuY2UgZm9yIGdhbWUgbW9kZSAxIG1lYW5zIGJvdCBhbmQgMiBtZWFucyByZWFsIHBsYXllcnNcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgc3RhdGljczoge1xyXG4gICAgUGxheWVyRGF0YTogUGxheWVyRGF0YSxcclxuICAgIEJ1c2luZXNzSW5mbzogQnVzaW5lc3NJbmZvLFxyXG4gICAgQ2FyZERhdGFGdW5jdGlvbmFsaXR5OiBDYXJkRGF0YUZ1bmN0aW9uYWxpdHksXHJcbiAgICBFbnVtQnVzaW5lc3NUeXBlOiBFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgU2V0UGxheWVyTGVmdChfc3RhdGUpIHtcclxuICAgIFBsYXllckxlZnQgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxWYXJpYWJsZXMoKSB7XHJcbiAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zID0gW107XHJcbiAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zID0gW107XHJcbiAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcbiAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcblxyXG4gICAgQmlnQnVzaW5lc3NBcnJheSA9IFtdO1xyXG4gICAgTG9zc2VzQXJyYXkgPSBbXTtcclxuICAgIE1hcmtldGluZ0FycmF5ID0gW107XHJcbiAgICBXaWxkQ2FyZEFycmF5ID0gW107XHJcbiAgICBCaWdCdXNpbmVzc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICBMb3NzZXNBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgTWFya2V0aW5nQXJyYXlDb3VudGVyID0gMDtcclxuICAgIFdpbGRDYXJkQXJyYXlDb3VudGVyID0gMDtcclxuXHJcbiAgICBfZGljZWlucHV0MSA9IFwiXCI7XHJcbiAgICBfZGljZWlucHV0MiA9IFwiXCI7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMSA9IC0xO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDIgPSAtMTtcclxuICAgIFBsYXllckxlZnQgPSBmYWxzZTtcclxuICAgIGhhbGZCdXNpbmVzc0Ftb3VudCA9IDA7XHJcbiAgICBoYWxmQnVzaW5lc3NBbW91bnRJRCA9IFwiXCI7XHJcbiAgICBoYWxmQnVzaW5lc3NBbW91bnRJbmRleCA9IDA7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMyA9IC0xO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDQgPSAtMTtcclxuICAgIF9uZXh0VHVybmhhbGZQYXkgPSBmYWxzZTtcclxuICAgIFByZXZpb3VzRGljZVJvbGw1ID0gLTE7XHJcbiAgICBHYW1lQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICB1c2VyR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgIEJvdEdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICBDb3JyZWN0QW5zd2VyID0gMDtcclxuICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIERpY2VSb2xsID0gMDtcclxuICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcbiAgICBGb3JjZUNoYW5nZVRpbWVPdXQgPSBudWxsO1xyXG4gICAgUGFzc2VkUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG4gICAgX3NraXBITU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG4gICAgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxuICAgIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICBUdXJuSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxuICAgIEJhY2tzcGFjZXMgPSAzO1xyXG4gICAgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxuICAgIENhcmREaXNwbGF5U2V0VGltb3V0ID0gbnVsbDtcclxuICAgIFRvdGFsQ291bnRlclJlYWNoZWQgPSBmYWxzZTtcclxuICAgIE5vQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBJbnB1dFRlc3REaWNlMShfdmFsKSB7XHJcbiAgICBpZiAoX2lzVGVzdCkge1xyXG4gICAgICBfZGljZWlucHV0MSA9IF92YWw7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5wdXRUZXN0RGljZTIoX3ZhbCkge1xyXG4gICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgX2RpY2VpbnB1dDIgPSBfdmFsO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBBbGwgRnVuY3Rpb25zIG9mIEdhbWVNYW5hZ2VyXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgY2xhc3MgaXMgY3JlYXRlZFxyXG4gICAqKi9cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsVmFyaWFibGVzKCk7XHJcbiAgICB0aGlzLlJlc2V0UGF5RGF5KCk7XHJcbiAgICBHYW1lTWFuYWdlci5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB0aGlzLlR1cm5OdW1iZXIgPSAwO1xyXG4gICAgdGhpcy5UdXJuQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuU2VsZWN0ZWRNb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIHRoaXMuSW5pdF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4ID0gMDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0UGF5RGF5KCkge1xyXG4gICAgY29uc29sZS5sb2coXCJyZXNldGluZyBwYXlkYXlcIik7XHJcbiAgICBfc2tpcE5leHRQYXlkYXkgPSBmYWxzZTtcclxuICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gZmFsc2U7XHJcbiAgICBfc2tpcEJNTmV4dFBheWRheSA9IGZhbHNlO1xyXG4gICAgUGFzc2VkUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxuICAgIF9uZXh0VHVybmhhbGZQYXkgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcmVmZXJlbmNlIG9mIHJlcXVpcmVkIGNsYXNzZXNcclxuICAgKiovXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBpbml0aWFsIGdhbWVtYW5hZ2VyIGVzc2V0aWFsc1xyXG4gICAqKi9cclxuICBJbml0X0dhbWVNYW5hZ2VyKCkge1xyXG4gICAgdGhpcy5DYW1lcmEgPSB0aGlzLkNhbWVyYU5vZGUuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSk7XHJcbiAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mbyA9IFtdO1xyXG4gICAgUm9sbENvdW50ZXIgPSAwO1xyXG4gICAgRGljZVRlbXAgPSAwO1xyXG4gICAgRGljZVJvbGwgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIC8vaWYgam9pbmVkIHBsYXllciBpcyBzcGVjdGF0ZVxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzdGF0dXMgb2YgaW5pdGlhbCBidXNpbmVzcyBzZXRwOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpKTtcclxuXHJcbiAgICAgICAgLy9pZiBpbml0YWwgc2V0dXAgaGFzIGJlZW4gZG9uZSBhbmQgZ2FtZSBpcyB1bmRlciB3YXlcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgdmFyIEFsbERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gQWxsRGF0YTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgIHRoaXMuVHVybk51bWJlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIpO1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSwgdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAvL3RoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSA4O1xyXG4gICAgICAgICAgLy90aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSwgZmFsc2UsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgYm90IGFsb25nIHdpdGggb25lIHBsYXllclxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jcmVnaW9uIHB1YmxpYyBmdW5jdGlvbnMgdG8gZ2V0IGRhdGEgKGFjY2Vzc2libGUgZnJvbSBvdGhlciBjbGFzc2VzKVxyXG4gIEdldFR1cm5OdW1iZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5UdXJuTnVtYmVyO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZ2V0IG15IGluZGV4IGluIGFycmF5IG9mIFBsYXllckdhbWVJbmZvIFxyXG4gICAqKi9cclxuICBHZXRNeUluZGV4KCkge1xyXG4gICAgdmFyIG15SW5kZXggPSAwO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9hbGxBY3RvcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWxsQWN0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX2FjdG9yLlBsYXllclVJRCA9PSBfYWxsQWN0b3JzW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICBteUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbXlJbmRleDtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU3BlY3RhdGVNb2RlIENvZGVcclxuXHJcbiAgU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCkge1xyXG4gICAgdmFyIEFsbERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gQWxsRGF0YTtcclxuICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInN5bmNpbmcgYWxsIGRhdGEgZm9yIHNwZWN0YXRlXCIpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlciA+IDAgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCA9PSB0cnVlICYmICF0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCwgX3RvUG9zLnkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZyBwb3MxXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNvdW50ZXI6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5pdGlhbCBDb3VudGVyIEFzc2lnbmVkOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBmaW5pc2hlZCA6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICB2YXIgX2xhc3RJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGggLSAxO1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtfbGFzdEluZGV4XS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2xhc3RJbmRleF0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsIF90b1Bvcy55KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNldHRpbmcgcG9zMlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5sb2coXCJzeW5jZWQgcGxheWVybm9kZXNcIik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKSB7XHJcbiAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID09IFRvdGFsQ29ubmVjdGVkUGxheWVycykge1xyXG4gICAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInJlc2V0aW5nIGZvciBzcGVjdGF0ZVwiKTtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgVHVybiBpcyBjYWxsZWQgYnk6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBmdW5jdGlvbnMgcmVsYXRlZCB0byBUdXJuIE1lY2hhbmlzbSBhbmQgY2FyZCBtZWNoYW5pc21cclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHdoYXQgY2FyZCBoYXMgYmVlbiBzZWxlY3RlZCBieSBwbGF5ZXJcclxuICAgKiovXHJcbiAgUmFpc2VFdmVudEZvckNhcmQoX2RhdGEpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNSwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIENsZWFyRGlzcGxheVRpbWVvdXQoKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gIH0sXHJcblxyXG4gIERpc3BsYXlDYXJkT25PdGhlcnMoKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgY29uc29sZS5sb2coXCJjYXJkIGV2ZW50IHJlY2VpdmVkOiBcIiArIENhcmRFdmVudFJlY2VpdmVkKTtcclxuICAgICAgaWYgKENhcmRFdmVudFJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcih0aGlzLkNhcmRDb3VudGVyKTtcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5DYXJkRGlzcGxheWVkKSB7XHJcbiAgICAgICAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuQ2FyZENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsIHRoaXMuUmFuZG9tQ2FyZEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgQ2FyZERpc3BsYXlTZXRUaW1vdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIC8vY2hlY2sgYWZ0ZXIgZXZlcnkgMC41IHNlY29uZHNcclxuICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRDYXJkRGlzcGxheSgpIHtcclxuICAgIHRoaXMuQ2FyZERpc3BsYXllZCA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpIHtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNhcmQgRGF0YSBSZWNlaXZlZDpcIik7XHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcblxyXG4gICAgdmFyIFJhbmRvbUNhcmQgPSBfZGF0YS5yYW5kb21DYXJkO1xyXG4gICAgdmFyIGNvdW50ZXIgPSBfZGF0YS5jb3VudGVyO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4ID0gUmFuZG9tQ2FyZDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXIgPSBjb3VudGVyO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKHRydWUsIFJhbmRvbUNhcmQpO1xyXG4gICAgICBlbHNlIENhcmRFdmVudFJlY2VpdmVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZSh0cnVlLCBSYW5kb21DYXJkKTtcclxuICAgICAgZWxzZSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZShmYWxzZSwgUmFuZG9tQ2FyZCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHBhcnRpY3VsYXIgcGxheWVyIGhhcyBjb21wbGV0ZSB0aGVpciBtb3ZlXHJcbiAgICoqL1xyXG4gIFJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJyYWlzZWQgZm9yIHR1cm4gY29tcGxldGVcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0FsbERhdGEoKSB7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIiwgdGhpcy5QbGF5ZXJHYW1lSW5mbywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVtb3ZlRnJvbUNoZWNrQXJyYXkoX3VpZCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdmFyIF9pbmQgPSAtMTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBUdXJuQ2hlY2tBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoVHVybkNoZWNrQXJyYXlbaW5kZXhdID09IF91aWQpIF9pbmQgPSBpbmRleDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9pbmQgIT0gLTEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlbW92aW5nIGZyb20gdHVybiBjaGVjayBhcnJheVwiKTtcclxuICAgICAgICBUdXJuQ2hlY2tBcnJheS5zcGxpY2UoX2luZCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDaGVja1R1cm5Db21wbGV0ZSgpIHtcclxuICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnMgPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGorKykge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tqXS5Jc0FjdGl2ZSkgVG90YWxDb25uZWN0ZWRQbGF5ZXJzKys7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJUdXJuIENoZWNrOiBcIiArIFR1cm5DaGVja0FycmF5Lmxlbmd0aCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlRvdGFsIENvbm5lY3RlZCBQbGF5ZXJzOiBcIiArIFRvdGFsQ29ubmVjdGVkUGxheWVycyk7XHJcbiAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheSk7XHJcblxyXG4gICAgaWYgKFR1cm5DaGVja0FycmF5Lmxlbmd0aCA+PSBUb3RhbENvbm5lY3RlZFBsYXllcnMpIHtcclxuICAgICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgICAgdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgICAgLy90aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBvbiBhbGwgcGxheWVycyB0byB2YWxpZGF0ZSBpZiBtb3ZlIGlzIGNvbXBsZXRlZCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHNcclxuICAgKiovXHJcbiAgUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlKF91aWQpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKFR1cm5DaGVja0FycmF5Lmxlbmd0aCA9PSAwKSBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpO1xyXG5cclxuICAgICAgICB2YXIgQXJyYXlMZW5ndGggPSBUdXJuQ2hlY2tBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIElERm91bmQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQXJyYXlMZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChUdXJuQ2hlY2tBcnJheVtpbmRleF0gPT0gX3VpZCkgSURGb3VuZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIUlERm91bmQpIHtcclxuICAgICAgICAgIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkNoZWNrVHVybkNvbXBsZXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBkaWNlIGFuaW1hdGlvbiBpcyBwbGF5ZWQgb24gYWxsIHBsYXllcnNcclxuICAgKiovXHJcbiAgQ2hhbmdlVHVybigpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHRoaXMuU3luY0FsbERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5UdXJuTnVtYmVyIDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB0aGlzLlR1cm5OdW1iZXIgPSB0aGlzLlR1cm5OdW1iZXIgKyAxO1xyXG4gICAgZWxzZSB0aGlzLlR1cm5OdW1iZXIgPSAwO1xyXG5cclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMiwgdGhpcy5UdXJuTnVtYmVyKTtcclxuICB9LFxyXG5cclxuICBSZXNldFNvbWVWYWx1ZXMoKSB7XHJcbiAgICAvL1R1cm5DaGVja0FycmF5ID0gW107XHJcbiAgICAvL3RoaXMuVHVybkNvbXBsZXRlZCA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlVHVybkZvcmNlZnVsbHkoKSB7XHJcbiAgICBpZiAoSXNUd2VlbmluZykge1xyXG4gICAgICBjbGVhclRpbWVvdXQoRm9yY2VDaGFuZ2VUaW1lT3V0KTtcclxuICAgICAgRm9yY2VDaGFuZ2VUaW1lT3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VUdXJuRm9yY2VmdWxseSgpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChGb3JjZUNoYW5nZVRpbWVPdXQpO1xyXG4gICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBVcGRhdGVWaXN1YWxEYXRhKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIGZyb20gcmFpc2Ugb24gZXZlbnQgKGZyb20gZnVuY3Rpb24gXCJTdGFydFR1cm5cIiBhbmQgXCJDaGFuZ2VUdXJuXCIgb2YgdGhpcyBzYW1lIGNsYXNzKSB0byBoYW5kbGUgdHVyblxyXG4gICAqKi9cclxuICBUdXJuSGFuZGxlcihfdHVybikge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdmFyIF9pc01hc3RlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCk7XHJcbiAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1tfdHVybl0uSXNBY3RpdmUpIHtcclxuICAgICAgICBpZiAoX2lzTWFzdGVyKSB7XHJcbiAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vdGhpcy5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICB0aGlzLlVwZGF0ZVZpc3VhbERhdGEoKTtcclxuICAgIGNvbnNvbGUubG9nKFwiVHVybjogXCIgKyBfdHVybik7XHJcbiAgICB2YXIgX3BsYXllck1hdGNoZWQgPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxuICAgIGlmIChJc1R3ZWVuaW5nKSB7XHJcbiAgICAgIC8vY2hlY2sgaWYgYW5pbWF0aW9uIG9mIHR1cm4gYmVpbmcgcGxheWVkIG9uIG90aGVyIHBsYXllcnNcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICB0aGlzLlR1cm5IYW5kbGVyKF90dXJuKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDgwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlR1cm5OdW1iZXIgPSBfdHVybjtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgX3NraXBOZXh0VHVybiA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5CYW5rcnVwdGVkTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LkJhbmtydXB0ZWROZXh0VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3R2FtZV9CYW5rUnVwdGVkKFwiWW91IHdlcmUgYmFua3J1cHRlZCBhbmQgd2lsbCBzdGFydCBmcm9tIGJlZ2luLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codXNlckdhbWVPdmVyKTtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgIGlmICghdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IC8vdHVybiBkZWNpc2lvbnMgZm9yIGJvdFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgX3NraXBOZXh0VHVybiA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICBpZiAoIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJvbGxEaWNlKCk7XHJcbiAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLCB0aGlzLlR1cm5OdW1iZXIsIHRydWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVHVybiBPZjogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGxQbGF5ZXJVSVt0aGlzLlR1cm5OdW1iZXJdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vc2tpcCB0aGlzIHR1cm4gYXMgc2tpcCB0dXJuIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmVcclxuICAgICAgaWYgKF9wbGF5ZXJNYXRjaGVkICYmIF9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIGN1cnJlbnQgdHVyblwiLCAxMjAwKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVNraXBOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9wbGF5ZXJNYXRjaGVkICYmIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuVXBkYXRlVUlEYXRhKCk7XHJcbiAgfSxcclxuXHJcbiAgU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9pbmQpIHtcclxuICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICB2YXIgTXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgdmFyIF9jb3VudGVyID0gX2luZDtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAvLyAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uSXNBY3RpdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoX2NvdW50ZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwic3luY2VkIERhdGE6XCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQgPT0gTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0gPSBNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcblxyXG4gICAgICAgICAgaWYgKF9jb3VudGVyIDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN5bmNlZCBEYXRhOlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBhbGwgcGxheWVycyBoYXZlIGRvbmUgdGhlaXIgaW5pdGlhbCBzZXR1cCBhbmQgZmlyc3QgdHVybiBzdGFydHNcclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTdGFydFR1cm4oKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICB0aGlzLlR1cm5OdW1iZXIgPSAwOyAvL3Jlc2V0aW5nIHRoZSB0dXJuIG51bWJlciBvbiBzdGFydCBvZiB0aGUgZ2FtZVxyXG5cclxuICAgIC8vc2VuZGluZyBpbml0aWFsIHR1cm4gbnVtYmVyIG92ZXIgdGhlIG5ldHdvcmsgdG8gc3RhcnQgdHVybiBzaW11bHRhbm91c2x5IG9uIGFsbCBjb25uZWN0ZWQgcGxheWVyJ3MgZGV2aWNlc1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVCYW5rcnVwdERhdGEoX2RhdGEpIHtcclxuICAgIC8vb3RoZXIgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcclxuICAgIHZhciBfaXNCYW5rcnVwdGVkID0gX2RhdGEuRGF0YS5iYW5rcnVwdGVkO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS50dXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhTWFpbjtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhfaXNCYW5rcnVwdGVkKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF90dXJuKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF9wbGF5ZXJEYXRhKTtcclxuXHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW190dXJuXSA9IF9wbGF5ZXJEYXRhO1xyXG5cclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuXHJcbiAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIHRoaXMuVHVybk51bWJlciwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKSB7XHJcbiAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSh0cnVlKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXModHJ1ZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB9LCAxMDAwKTtcclxuXHJcbiAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIHRoaXMuVHVybk51bWJlciwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBGdW5jdGlvbiBmb3IgZ2FtZXBsYXlcclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcGxheWVyIFVJIChuYW1lL2ljb25zL251bWJlciBvZiBwbGF5ZXJzIHRoYXQgdG8gYmUgYWN0aXZlIGV0YylcclxuICAgIEBtZXRob2QgQXNzaWduUGxheWVyR2FtZVVJXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi9cclxuICBBc3NpZ25QbGF5ZXJHYW1lVUkoX2lzQmFua3J1cHRlZCA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgaWYgKCFfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgdmFyIF9yYW5kb21JbmRleCA9IHRoaXMuZ2V0UmFuZG9tKDAsIHRoaXMuQm90R2FtZUluZm8ubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvLnB1c2godGhpcy5Cb3RHYW1lSW5mb1tfcmFuZG9tSW5kZXhdKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSAyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5QbGF5ZXJJbmZvID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlNldEF2YXRhcih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCk7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUdhbWVVSShfdG9nZ2xlSGlnaGxpZ2h0LCBfaW5kZXgpIHtcclxuICAgIGlmIChfdG9nZ2xlSGlnaGxpZ2h0KSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbX2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5QbGF5ZXJJbmZvID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfaW5kZXhdO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfaW5kZXggPT0gaW5kZXgpIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5Ub2dnbGVUZXh0aWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGVuYmFsZSByZXNwZWN0aXZlIHBsYXllcnMgbm9kZXMgaW5zaWRlIGdhbWFwbGF5XHJcbiAgICBAbWV0aG9kIEVuYWJsZVBsYXllck5vZGVzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi9cclxuICBFbmFibGVQbGF5ZXJOb2RlcyhfaXNCYW5rcnVwdGVkID0gZmFsc2UpIHtcclxuICAgIGlmICghX2lzQmFua3J1cHRlZCkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSG9tZUJhc2VkQW1vdW50ID09IDEgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLngsIHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50ID09IDEgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLngsIHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLnkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkhvbWVCYXNlZEFtb3VudCA9PSAxKSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ccmlja0FuZE1vcnRhckFtb3VudCA9PSAxKSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5BdmF0YXJTcHJpdGVzW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEXTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKCkge1xyXG4gICAgbGV0IHRhcmdldFBvcyA9IHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLCAxMjApKTtcclxuICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IHRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuXHJcbiAgICBsZXQgcmF0aW8gPSB0YXJnZXRQb3MueSAvIGNjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMjtcclxuICB9LFxyXG5cclxuICBsYXRlVXBkYXRlKCkge1xyXG4gICAgaWYgKHRoaXMuaXNDYW1lcmFab29taW5nKSB0aGlzLlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKTtcclxuICB9LFxyXG5cclxuICBzeW5jRGljZVJvbGwoX3JvbGwpIHtcclxuICAgIHZhciBfZGljZTEgPSBfcm9sbC5kaWNlMTtcclxuICAgIHZhciBfZGljZTIgPSBfcm9sbC5kaWNlMjtcclxuICAgIHZhciBfcmVzdWx0ID0gX2RpY2UxICsgX2RpY2UyO1xyXG5cclxuICAgIElzVHdlZW5pbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPT0gMCAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICBSb2xsQ291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICBSb2xsQ291bnRlciA9IDE0O1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID09IDEzKSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgKyAyMjtcclxuICAgICAgZWxzZSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgKyAxO1xyXG5cclxuICAgICAgUm9sbENvdW50ZXIgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIgLSAxKTtcclxuICAgIH1cclxuXHJcbiAgICBEaWNlUm9sbCA9IF9yZXN1bHQ7XHJcbiAgICBEaWNlVGVtcCA9IDA7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKERpY2VSb2xsKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHRoaXMuVHVybk51bWJlciA9PSBpbmRleCkge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uZ2V0Q29tcG9uZW50KFwiRGljZUNvbnRyb2xsZXJcIikuQW5pbWF0ZURpY2UoX2RpY2UxLCBfZGljZTIpO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5VcGRhdGVVSURhdGEoKTtcclxuICAgIC8vIGxldCB0YXJnZXRQb3M9dGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsMTIwKSk7XHJcbiAgICAvLyB2YXIgX3Bvcz10aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgICAvLyB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsdHJ1ZSwwLjQpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVVJRGF0YSgpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIERpY2VGdW50aW9uYWxpdHkoKSB7XHJcbiAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsIDEyMCkpO1xyXG4gICAgdmFyIF9wb3MgPSB0aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgICB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsIHRydWUsIDAuNCk7XHJcbiAgfSxcclxuXHJcbiAgVGVtcENoZWNrU3BhY2UoX3JvbGxpbmcpIHtcclxuICAgIHZhciB0ZW1wY291bnRlciA9IDA7XHJcbiAgICB2YXIgdGVtcGNvdW50ZXIyID0gMDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJwbGF5ZXIgbWF0Y2hlZDpcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgdGVtcGNvdW50ZXIyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRlbXBjb3VudGVyMiAtIDEgPCAwKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJzdGFydGluZyBmcm9tIG9ibGl2aW9uXCIpO1xyXG4gICAgICB0ZW1wY291bnRlciA9IHRlbXBjb3VudGVyMiArIF9yb2xsaW5nIC0gMTtcclxuICAgICAgdmFyIGRpY2V0b2JlID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwidG8gYmU6IFwiICsgZGljZXRvYmUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGVtcGNvdW50ZXIgPSB0ZW1wY291bnRlcjIgKyBfcm9sbGluZztcclxuICAgICAgdmFyIGRpY2V0b2JlID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwidG8gYmU6IFwiICsgZGljZXRvYmUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJvbGxEaWNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgdmFyIERpY2UxO1xyXG4gICAgICB2YXIgRGljZTI7XHJcbiAgICAgIGlmIChfaXNUZXN0ICYmIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgIERpY2UxID0gcGFyc2VJbnQoX2RpY2VpbnB1dDEpO1xyXG4gICAgICAgIERpY2UyID0gcGFyc2VJbnQoX2RpY2VpbnB1dDIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSB0cnVlICYmIF9pc1Rlc3QpIHtcclxuICAgICAgICBEaWNlMSA9IDE7XHJcbiAgICAgICAgRGljZTIgPSAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcbiAgICAgICAgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICAgICAgaWYgKFByZXZpb3VzRGljZVJvbGwxID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDIgPT0gRGljZTIpIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgICAgIFByZXZpb3VzRGljZVJvbGwxID0gRGljZTE7XHJcbiAgICAgICAgUHJldmlvdXNEaWNlUm9sbDIgPSBEaWNlMjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdmFyIERpY2UxPTIwO1xyXG4gICAgICAvLyB2YXIgRGljZTI9MTtcclxuXHJcbiAgICAgIERpY2VSb2xsID0gRGljZTEgKyBEaWNlMjtcclxuICAgICAgdmFyIF9uZXdSb2xsID0geyBkaWNlMTogRGljZTEsIGRpY2UyOiBEaWNlMiB9O1xyXG4gICAgICAvL0RpY2VSb2xsPTIzO1xyXG4gICAgICAvL3RoaXMuVGVtcENoZWNrU3BhY2UoRGljZVJvbGwpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImRpY2UgbnVtYmVyOiBcIiArIERpY2VSb2xsICsgXCIsIERpY2UxOlwiICsgRGljZTEgKyBcIiwgRGljZTI6XCIgKyBEaWNlMik7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDMsIF9uZXdSb2xsKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSb2xsT25lRGljZSgpIHtcclxuICAgIHZhciBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIGlmIChQcmV2aW91c0RpY2VSb2xsNSA9PSBEaWNlMSkgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBQcmV2aW91c0RpY2VSb2xsNSA9IERpY2UxO1xyXG5cclxuICAgIHJldHVybiBEaWNlMTtcclxuICB9LFxyXG5cclxuICBSb2xsVHdvRGljZXMoKSB7XHJcbiAgICB2YXIgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuICAgIHZhciBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMyA9PSBEaWNlMSkgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDQgPT0gRGljZTIpIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgUHJldmlvdXNEaWNlUm9sbDMgPSBEaWNlMTtcclxuICAgIFByZXZpb3VzRGljZVJvbGw0ID0gRGljZTI7XHJcblxyXG4gICAgcmV0dXJuIERpY2UxICsgRGljZTI7XHJcbiAgfSxcclxuXHJcbiAgUG9wdWxhdGVEZWNrc0FycmF5KF9pc0JpZ0J1c2luZXNzID0gZmFsc2UsIF9pc0xvc3NlcyA9IGZhbHNlLCBfaXNNYXJrZXRpbmcgPSBmYWxzZSwgX2lzV2lsZENhcmQgPSBmYWxzZSwgX2RhdGEgPSBudWxsKSB7XHJcbiAgICAvLyBCaWdCdXNpbmVzc0FycmF5ID0gW107XHJcbiAgICAvLyBMb3NzZXNBcnJheSA9IFtdO1xyXG4gICAgLy8gTWFya2V0aW5nQXJyYXkgPSBbXTtcclxuICAgIC8vIFdpbGRDYXJkQXJyYXkgPSBbXTtcclxuICAgIC8vIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyID0gMDtcclxuICAgIC8vIExvc3Nlc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAvLyBNYXJrZXRpbmdBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgLy8gV2lsZENhcmRBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgIGlmIChfaXNCaWdCdXNpbmVzcykge1xyXG4gICAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXkgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0XTtcclxuXHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhCaWdCdXNpbmVzc0FycmF5KTtcclxuICAgICAgICBCaWdCdXNpbmVzc0FycmF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBCaWdCdXNpbmVzc0FycmF5LCBMb3NzQXJyYXk6IG51bGwsIE1hcmtldEFycmF5OiBudWxsLCBXaWxkQXJyeWE6IG51bGwgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE5LCBfdGVtcERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9pc0xvc3Nlcykge1xyXG4gICAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgIExvc3Nlc0FycmF5ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNF07XHJcblxyXG4gICAgICAgIExvc3Nlc0FycmF5LnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKExvc3Nlc0FycmF5KTtcclxuICAgICAgICBMb3NzZXNBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogbnVsbCwgTG9zc0FycmF5OiBMb3NzZXNBcnJheSwgTWFya2V0QXJyYXk6IG51bGwsIFdpbGRBcnJ5YTogbnVsbCB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTksIF90ZW1wRGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2lzTWFya2V0aW5nKSB7XHJcbiAgICAgIGlmIChfZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXkgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxM107XHJcblxyXG4gICAgICAgIE1hcmtldGluZ0FycmF5LnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKE1hcmtldGluZ0FycmF5KTtcclxuICAgICAgICBNYXJrZXRpbmdBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogbnVsbCwgTG9zc0FycmF5OiBudWxsLCBNYXJrZXRBcnJheTogTWFya2V0aW5nQXJyYXksIFdpbGRBcnJ5YTogbnVsbCB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTksIF90ZW1wRGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2lzV2lsZENhcmQpIHtcclxuICAgICAgaWYgKF9kYXRhID09IG51bGwpIHtcclxuICAgICAgICBXaWxkQ2FyZEFycmF5ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV07XHJcblxyXG4gICAgICAgIFdpbGRDYXJkQXJyYXkuc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coV2lsZENhcmRBcnJheSk7XHJcbiAgICAgICAgV2lsZENhcmRBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogbnVsbCwgTG9zc0FycmF5OiBudWxsLCBNYXJrZXRBcnJheTogbnVsbCwgV2lsZEFycnlhOiBXaWxkQ2FyZEFycmF5IH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxOSwgX3RlbXBEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgIGlmIChfZGF0YS5CaWdBcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheSA9IF9kYXRhLkJpZ0FycmF5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEJpZ0J1c2luZXNzQXJyYXkpO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9kYXRhLkxvc3NBcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgTG9zc2VzQXJyYXkgPSBfZGF0YS5Mb3NzQXJyYXk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTG9zc2VzQXJyYXkpO1xyXG4gICAgICAgIExvc3Nlc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfZGF0YS5NYXJrZXRBcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXkgPSBfZGF0YS5NYXJrZXRBcnJheTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNYXJrZXRpbmdBcnJheSk7XHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXlDb3VudGVyID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9kYXRhLldpbGRBcnJ5YSAhPSBudWxsKSB7XHJcbiAgICAgICAgV2lsZENhcmRBcnJheSA9IF9kYXRhLldpbGRBcnJ5YTtcclxuICAgICAgICBjb25zb2xlLmxvZyhXaWxkQ2FyZEFycmF5KTtcclxuICAgICAgICBXaWxkQ2FyZEFycmF5Q291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZXRCaWdCdXNpbmVzc0luZGV4KF9pbmRleCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChCaWdCdXNpbmVzc0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyIDwgQmlnQnVzaW5lc3NBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gQmlnQnVzaW5lc3NBcnJheVtCaWdCdXNpbmVzc0FycmF5Q291bnRlcl07XHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIrKztcclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogdHJ1ZSwgTG9zc0FycmF5OiBmYWxzZSwgTWFya2V0QXJyYXk6IGZhbHNlLCBXaWxkQXJyeWE6IGZhbHNlIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyMCwgX3RlbXBEYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheSh0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkodHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3ZhbDtcclxuICB9LFxyXG5cclxuICBHZXRMb3NzZXNJbmRleChfaW5kZXgpIHtcclxuICAgIHZhciBfdmFsID0gLTE7XHJcbiAgICBpZiAoTG9zc2VzQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoTG9zc2VzQXJyYXlDb3VudGVyIDwgTG9zc2VzQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgX3ZhbCA9IExvc3Nlc0FycmF5W0xvc3Nlc0FycmF5Q291bnRlcl07XHJcbiAgICAgICAgTG9zc2VzQXJyYXlDb3VudGVyKys7XHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IGZhbHNlLCBMb3NzQXJyYXk6IHRydWUsIE1hcmtldEFycmF5OiBmYWxzZSwgV2lsZEFycnlhOiBmYWxzZSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjAsIF90ZW1wRGF0YSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkoZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgbnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0TWFya2V0aW5nSW5kZXgoX2luZGV4KSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKE1hcmtldGluZ0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKE1hcmtldGluZ0FycmF5Q291bnRlciA8IE1hcmtldGluZ0FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBNYXJrZXRpbmdBcnJheVtNYXJrZXRpbmdBcnJheUNvdW50ZXJdO1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5Q291bnRlcisrO1xyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBmYWxzZSwgTG9zc0FycmF5OiBmYWxzZSwgTWFya2V0QXJyYXk6IHRydWUsIFdpbGRBcnJ5YTogZmFsc2UgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIwLCBfdGVtcERhdGEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIEdldFdpbGRDYXJkSW5kZXgoX2luZGV4KSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKFdpbGRDYXJkQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoV2lsZENhcmRBcnJheUNvdW50ZXIgPCBXaWxkQ2FyZEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBXaWxkQ2FyZEFycmF5W1dpbGRDYXJkQXJyYXlDb3VudGVyXTtcclxuICAgICAgICBXaWxkQ2FyZEFycmF5Q291bnRlcisrO1xyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBmYWxzZSwgTG9zc0FycmF5OiBmYWxzZSwgTWFya2V0QXJyYXk6IGZhbHNlLCBXaWxkQXJyeWE6IHRydWUgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIwLCBfdGVtcERhdGEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUNvdW50ZXJzKF9kYXRhID0gbnVsbCkge1xyXG4gICAgaWYgKF9kYXRhLkJpZ0FycmF5KSB7XHJcbiAgICAgIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyKys7XHJcbiAgICB9XHJcbiAgICBpZiAoX2RhdGEuTG9zc0FycmF5KSB7XHJcbiAgICAgIExvc3Nlc0FycmF5Q291bnRlcisrO1xyXG4gICAgfVxyXG4gICAgaWYgKF9kYXRhLk1hcmtldEFycmF5KSB7XHJcbiAgICAgIE1hcmtldGluZ0FycmF5Q291bnRlcisrO1xyXG4gICAgfVxyXG4gICAgaWYgKF9kYXRhLldpbGRBcnJ5YSkge1xyXG4gICAgICBXaWxkQ2FyZEFycmF5Q291bnRlcisrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbGVjdFJlbGF0ZWRDYXJkKF9pc0JpZ0J1c2luZXNzID0gZmFsc2UsIF9pc0xvc3NlcyA9IGZhbHNlLCBfaXNNYXJrZXRpbmcgPSBmYWxzZSwgX2lzV2lsZENhcmQgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc0JpZ0J1c2luZXNzKSB7XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0QmlnQnVzaW5lc3NJbmRleCgpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRCaWdCdXNpbmVzc0luZGV4KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldEJpZ0J1c2luZXNzSW5kZXgoKTtcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRCaWdCdXNpbmVzc0luZGV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNMb3NzZXMpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRMb3NzZXNJbmRleCgpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRMb3NzZXNJbmRleCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRMb3NzZXNJbmRleCgpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgaW5kZXggPSB0aGlzLkdldExvc3Nlc0luZGV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNNYXJrZXRpbmcpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRNYXJrZXRpbmdJbmRleCgpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRNYXJrZXRpbmdJbmRleCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRNYXJrZXRpbmdJbmRleCgpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgaW5kZXggPSB0aGlzLkdldE1hcmtldGluZ0luZGV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNXaWxkQ2FyZCkge1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldFdpbGRDYXJkSW5kZXgoKTtcclxuICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0V2lsZENhcmRJbmRleCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRXaWxkQ2FyZEluZGV4KCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0V2lsZENhcmRJbmRleCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjYWxsVXBvbkNhcmQoKSB7XHJcbiAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBfc3BhY2VJRCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICBpZiAoX3NwYWNlSUQgIT0gNiAmJiBfc3BhY2VJRCAhPSA3KSB7XHJcbiAgICAgICAgICAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVhbnMgc2VsbCBzcGFjZVxyXG4gICAgICAgICAgdmFyIFJhbmRvbUNhcmQgPSB0aGlzLmdldFJhbmRvbSgwLCAxNSk7XHJcblxyXG4gICAgICAgICAgaWYgKF9zcGFjZUlEID09IDIpIHtcclxuICAgICAgICAgICAgLy9sYW5kZWQgb24gYmlnIGJ1c2luZXNzIGNhcmRzXHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB0aGlzLlNlbGVjdFJlbGF0ZWRDYXJkKHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSAxNDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3NwYWNlSUQgPT0gNSkge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIGxvc3NlcyBjYXJkc1xyXG4gICAgICAgICAgICBSYW5kb21DYXJkID0gdGhpcy5TZWxlY3RSZWxhdGVkQ2FyZChmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gMTQ7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF9zcGFjZUlEID09IDMpIHtcclxuICAgICAgICAgICAgLy9sYW5kZWQgb24gc29tZSBtYXJrZXRpbmcgY2FyZHNcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHRoaXMuU2VsZWN0UmVsYXRlZENhcmQoZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vUmFuZG9tQ2FyZCA9IDExO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSAxMDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3NwYWNlSUQgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIHdpbGQgY2FyZHNcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHRoaXMuU2VsZWN0UmVsYXRlZENhcmQoZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vUmFuZG9tQ2FyZCA9IDExO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoX3NwYWNlSUQpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIHJlYWwgcGxheWVyXHJcbiAgICAgICAgICAgIGlmIChfc3BhY2VJRCA9PSAxMikge1xyXG4gICAgICAgICAgICAgIC8vIGlmIHBsYXllciBsYW5kZWQgb24gZmluaXNoIHNwYWNlXHJcbiAgICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDU7XHJcbiAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YSA9IHsgcmFuZG9tQ2FyZDogUmFuZG9tQ2FyZCwgY291bnRlcjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICAgICAgaWYgKF9zcGFjZUlEID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgLy8gaWYgcGxheWVyIGxhbmRlZCBvbiBmaW5pc2ggc3BhY2VcclxuICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGEgPSB7IHJhbmRvbUNhcmQ6IFJhbmRvbUNhcmQsIGNvdW50ZXI6IFJvbGxDb3VudGVyIH07XHJcbiAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIEJvdEdhbWVPdmVyKSB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIHVzZXJHYW1lT3ZlcikgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wbGV0ZSB0dXJuIGlzIGNhbGxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKHRydWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBsZXRlQ2FyZFR1cm4oKSB7XHJcbiAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gIH0sXHJcblxyXG4gIENhbGxHYW1lQ29tcGxldGUoX2lzQm90ID0gZmFsc2UsIF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgLy8gaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgIC8vICAgICB0aGlzLlR1cm5OdW1iZXIgPSB0aGlzLkdldE15SW5kZXgoKTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gMDtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicGxheWVyIGlzIG5vdCBhY3RpdmUgcmV0dXJuaW5nXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY2FsY3VsYXRpbmcuLi4uXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJhZ21lIGlzIG5vdCBmaW5pc2hlZFwiKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgdmFyIF9jYXNoID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgICAgICB2YXIgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICB2YXIgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgIHZhciBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICAgIGxvYW5BbW91bnQgKz0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIF9nb2xkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudDtcclxuICAgICAgICAgIHZhciBfc3RvY2tzID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgIHZhciBPbmNlT3JTaGFyZSA9IF9kaWNlUmFuZG9tICogMTAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgR29sZENhc2ggPSBPbmNlT3JTaGFyZSAqIF9nb2xkO1xyXG4gICAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgICB2YXIgQk1DYXNoID0gKEJNQW1vdW50ICsgQk1Mb2NhdGlvbnMpICogMTUwMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBITUNhc2ggPSAwO1xyXG4gICAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMikgSE1DYXNoID0gMjUwMDAgKyA2MDAwMDtcclxuICAgICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDMpIEhNQ2FzaCA9IDI1MDAwICsgMjUwMDAgKyA2MDAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTY29yZSA9IFRvdGFsQXNzZXRzO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsSEJDYXNoID0gSE1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsR29sZENhc2ggPSBHb2xkQ2FzaDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFN0b2Nrc0Nhc2ggPSBTdG9ja0Nhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0pO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0YSBwdXNoZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBfcGxheWVySW5kZXggPSAwOyBfcGxheWVySW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgX3BsYXllckluZGV4KyspIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX2Nhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICB2YXIgSE1BbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICB2YXIgQk1Mb2NhdGlvbnMgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBsb2FuQW1vdW50ICs9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBfZ29sZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ7XHJcbiAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICB2YXIgT25jZU9yU2hhcmUgPSBfZGljZVJhbmRvbSAqIDEwMDA7XHJcblxyXG4gICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgdmFyIEJNQ2FzaCA9IChCTUFtb3VudCArIEJNTG9jYXRpb25zKSAqIDE1MDAwMDtcclxuXHJcbiAgICAgICAgdmFyIEhNQ2FzaCA9IDA7XHJcbiAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDIpIEhNQ2FzaCA9IDI1MDAwICsgNjAwMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMykgSE1DYXNoID0gMjUwMDAgKyAyNTAwMCArIDYwMDAwO1xyXG5cclxuICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU2NvcmUgPSBUb3RhbEFzc2V0cztcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxIQkNhc2ggPSBITUNhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEdvbGRDYXNoID0gR29sZENhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU3RvY2tzQ2FzaCA9IFN0b2NrQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDYsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50VG9TeW5jR2FtZUNvbXBsZXRlRGF0YShfZGF0YSkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNiwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFN5bmNHYW1lT3ZlcihfVUlEKSB7XHJcbiAgICB2YXIgaW5mb1RleHQgPSBcIlwiO1xyXG4gICAgdmFyIHN0YXR1c1RleHQgPSBcIlwiO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGlmICghR2FtZUNvbXBsZXRlZCkge1xyXG4gICAgICAgIEdhbWVDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdERhdGEoKTtcclxuICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgIHZhciBNeURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHtcclxuICAgICAgICAgIHZhciBfaW5kZXggPSAtMTtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAgICAgICBfaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkdhbWUgd29uIGJ5IFwiICsgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCA9PSBfVUlEKSB7XHJcbiAgICAgICAgICAgIC8veW91IHdvblxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJDb25ncmF0cyEgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiO1xyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIF9jdXJyZW50Q2FzaCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoKTtcclxuICAgICAgICAgICAgdmFyIF90b3RhbCA9IF9jdXJyZW50Q2FzaCArIHBhcnNlSW50KE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IF90b3RhbC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIF93b24gPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbik7XHJcbiAgICAgICAgICAgIF93b24gPSBfd29uICsgMTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb24gPSBfd29uLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5VcGRhdGVVc2VyRGF0YSgtMSwgX3dvbiwgLTEpO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJVbmZvcnR1bmF0ZWx5ISB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiO1xyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vd2l0aCBib3RcclxuICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICB2YXIgTXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKE15RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzBdLkdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmIChNeURhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICBzdGF0dXNUZXh0ID0gXCJDb25ncmF0cyEgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiO1xyXG4gICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiT3RoZXIgUGxheWVyIEVhcm5lZCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMV0uVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICB2YXIgX2N1cnJlbnRDYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgICAgIHZhciBfdG90YWwgPSBfY3VycmVudENhc2ggKyBwYXJzZUludChNeURhdGEuVG90YWxTY29yZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2ggPSBfdG90YWwudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgdmFyIF93b24gPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbik7XHJcbiAgICAgICAgX3dvbiA9IF93b24gKyAxO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uID0gX3dvbi50b1N0cmluZygpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKC0xLCBfd29uLCAtMSk7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL3lvdSBsb3NlXHJcblxyXG4gICAgICAgIHN0YXR1c1RleHQgPSBcIlVuZm9ydHVuYXRlbHkhIHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLkNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJPdGhlciBQbGF5ZXIgRWFybmVkIENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1sxXS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN5bmNHYW1lQ29tcGxldGVEYXRhKF9kYXRhKSB7XHJcbiAgICB2YXIgX2lzQm90ID0gX2RhdGEuQm90O1xyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUodHJ1ZSwgZmFsc2UpO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIkdhbWUgb3ZlciwgY2FsY3VsYXRpbmcgdG90YWwgY2FzaC4uLlwiLCAxNTAwLCBmYWxzZSk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dE9ubHkoKTtcclxuXHJcbiAgICAgICAgdmFyIG1heCA9IC0xO1xyXG4gICAgICAgIHZhciBTZWxlY3RlZEluZCA9IDA7XHJcbiAgICAgICAgdmFyIFNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG5cclxuICAgICAgICAgIGlmIChfdmFsdWUgPiBtYXgpIHtcclxuICAgICAgICAgICAgU2VsZWN0ZWRJbmQgPSBpbmRleDtcclxuICAgICAgICAgICAgbWF4ID0gX3ZhbHVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKFNlc3Npb25EYXRhW2luZGV4XS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF92YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLnRyYWNlKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIiArIFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgfSwgMTUwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZShmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiR2FtZSBvdmVyLCBjYWxjdWxhdGluZyB0b3RhbCBjYXNoLi4uXCIsIDE1MDAsIGZhbHNlKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgICAgdmFyIG1heCA9IC0xO1xyXG4gICAgICAgICAgdmFyIFNlbGVjdGVkSW5kID0gMDtcclxuICAgICAgICAgIHZhciBTZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhTZXNzaW9uRGF0YSk7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoX3ZhbHVlID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBTZWxlY3RlZEluZCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gX3ZhbHVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKFNlc3Npb25EYXRhW2luZGV4XS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS50cmFjZShcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIgKyBTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFsbFBsYXllcnNHYW1lQ29tcGxldGVkKF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IEJvdDogX2lzQm90IH07XHJcbiAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhKF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBHYW1lT3ZlcihfZm9yY2VHYW1lT3ZlciA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgIHZhciBwbGF5ZXJjb21wbGV0ZWQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIC8vICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9PSBmYWxzZSB8fCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjb21wbGV0ZWQ6IFwiICsgcGxheWVyY29tcGxldGVkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBnYW1laW5mbyBsZW5ndGg6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpO1xyXG4gICAgICAgIGlmIChwbGF5ZXJjb21wbGV0ZWQgPj0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGggfHwgX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgICAgIC8vZ2FtZSBjb21wbGV0ZWQgb24gYWxsIHN5c3RlbVxyXG4gICAgICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgICBpZiAoX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KSBCb3RHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgIGVsc2UgdXNlckdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwidXNlcmdhbWVvdmVyOiBcIiArIHVzZXJHYW1lT3Zlcik7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYm90Z2FtZW92ZXI6IFwiICsgQm90R2FtZU92ZXIpO1xyXG4gICAgICAvLyB0aGlzLkNhbGxHYW1lQ29tcGxldGUodHJ1ZSk7XHJcbiAgICAgIHZhciBwbGF5ZXJjb21wbGV0ZWQgPSAwO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uaXNHYW1lRmluaXNoZWQpIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGxheWVyY29tcGxldGVkID09IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKSB7XHJcbiAgICAgICAgLy9nYW1lY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1zXHJcbiAgICAgICAgQm90R2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIHVzZXJHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgU3RhcnREaWNlUm9sbDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFJvbGxDb3VudGVyID49IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJHYW1lb3ZlclwiKTtcclxuICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkdhbWVPdmVyKGZhbHNlKTtcclxuICAgICAgfSwgMTUwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICBEaWNlVGVtcCA9IERpY2VUZW1wICsgMTtcclxuICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5Ud2VlblBsYXllcih0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1Bvcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRSYW5kb206IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICB9LFxyXG5cclxuICBUd2VlbkNhbWVyYTogZnVuY3Rpb24gKF9wb3MsIGlzWm9vbSwgdGltZSkge1xyXG4gICAgY2MudHdlZW4odGhpcy5DYW1lcmFOb2RlKVxyXG4gICAgICAudG8odGltZSwgeyBwb3NpdGlvbjogY2MudjIoX3Bvcy54LCBfcG9zLnkpIH0sIHsgZWFzaW5nOiBcInF1YWRJbk91dFwiIH0pXHJcbiAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZiAoaXNab29tKSB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICAgIGVsc2UgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIFpvb21DYW1lcmFJbigpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5DYW1lcmEuem9vbVJhdGlvIDwgMikge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IHRoaXMuQ2FtZXJhLnpvb21SYXRpbyArIDAuMDM7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAyO1xyXG4gICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIENoZWNrUGF5RGF5Q29uZGl0aW9ucyhfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYpIHtcclxuICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSBQYXNzZWRQYXlEYXlDb3VudGVyICsgMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3KSB7XHJcbiAgICAgICAgRG91YmxlUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5O1xyXG4gICAgX25leHRUdXJuaGFsZlBheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkhhbGZQYXlEYXk7XHJcblxyXG4gICAgaWYgKFBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5ICYmICFfbmV4dFR1cm5Eb3VibGVQYXkpIHtcclxuICAgICAgLy90aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgLy90aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UsIF9pc0JvdCk7XHJcbiAgICB9IGVsc2UgaWYgKERvdWJsZVBheURheSB8fCAoUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkpIHtcclxuICAgICAgLy90aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgLy90aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24odHJ1ZSwgX2lzQm90KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgWm9vbUNhbWVyYU91dE9ubHkoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA+PSAxKSB7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSB0aGlzLkNhbWVyYS56b29tUmF0aW8gLSAwLjAzO1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dE9ubHkoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb24gPSBjYy5WZWMyKDAsIDApO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IDE7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICB9LFxyXG5cclxuICBab29tQ2FtZXJhT3V0KCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkNhbWVyYS56b29tUmF0aW8gPj0gMSkge1xyXG4gICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gdGhpcy5DYW1lcmEuem9vbVJhdGlvIC0gMC4wMztcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb24gPSBjYy5WZWMyKDAsIDApO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IDE7XHJcbiAgICAgICAgLy8gSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5QcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24oMCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ICYmICFCb3RHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgJiYgIXVzZXJHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL3JlYWwgcGxheWVyXHJcbiAgICAgICAgICBpZiAoUGxheWVyTGVmdCkge1xyXG4gICAgICAgICAgICAvLyBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFBsYXllckxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnMoKTtcclxuICAgICAgICAgIGVsc2UgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICB9LFxyXG5cclxuICBUd2VlblBsYXllcjogZnVuY3Rpb24gKE5vZGUsIFRvUG9zKSB7XHJcbiAgICB2YXIgc3BlZWQgPSAwLjQ7XHJcbiAgICAvL2lmIChfaXNUZXN0KSBzcGVlZCA9IDAuMDQ7XHJcblxyXG4gICAgY2MudHdlZW4oTm9kZSkgLy8wLjRcclxuICAgICAgLnRvKHNwZWVkLCB7IHBvc2l0aW9uOiBjYy52MihUb1Bvcy54LCBUb1Bvcy55KSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKERpY2VUZW1wIDwgRGljZVJvbGwpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKERpY2VUZW1wICsgXCIgXCIgKyBSb2xsQ291bnRlcik7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpIHtcclxuICAgICAgICAgICAgICBpZiAoIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2IHx8XHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3XHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJvdCBnYW1lIGlzIG92ZXJcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmICghdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2IHx8XHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3XHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLyBjb25zb2xlLmVycm9yKFBhc3NlZFBheURheUNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgZ2FtZSBpcyBvdmVyIHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coUGFzc2VkUGF5RGF5KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYpIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICBEb3VibGVQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIGZpbmlzaGVkIGZvcjogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoUm9sbENvdW50ZXIgPT0gMTMpIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyAyMjtcclxuICAgICAgICAgICAgZWxzZSBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyAxO1xyXG4gICAgICAgICAgICBEaWNlVGVtcCA9IERpY2VSb2xsO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vRGljZVRlbXA9RGljZVRlbXArMTtcclxuICAgICAgICAgIC8vICBjb25zb2xlLmxvZyhEaWNlVGVtcCArIFwiIFwiICsgUm9sbENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgLy90aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBfbmV3cG9zID0gY2MuVmVjMigwLCAwKTtcclxuICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcywgZmFsc2UsIDAuNik7IC8vem9vbW91dFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgLy9ydWxlcyBpbXBsbWVudGF0aW9uIGR1cmluZyB0dXJuICh0dXJuIGRlY2lzaW9ucylcclxuXHJcbiAgVG9nZ2xlUGF5RGF5KF9zdDEsIF9TdDIpIHtcclxuICAgIFBhc3NlZFBheURheSA9IF9zdDE7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfU3QyO1xyXG5cclxuICAgIGlmICghX3N0MSkge1xyXG4gICAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9TdDIpIHtcclxuICAgICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5jcmVhc2VEb3VibGVQYXlEYXkoKSB7XHJcbiAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgfSxcclxuXHJcbiAgRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKGFtb3VudCwgX2luZGV4LCBfbG9jYXRpb25OYW1lLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoIDwgMykge1xyXG4gICAgICBpZiAoIV9pc0NhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCAtIGFtb3VudDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCArIDE7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5wdXNoKF9sb2NhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLCAxMDAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgIH0sIDEyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2ggdG8gZXhwYW5kIHRoaXMgYnVzaW5lc3MsIGNhc2ggbmVlZGVkICQgXCIgKyBhbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX0dpdmVuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIF9HaXZlbkNhc2ggPSBfR2l2ZW5DYXNoIC0gYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ICsgMTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsIDEwMDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIiArIGFtb3VudCArIFwiLCBDYXNoIEdpdmVuICRcIiArIF9HaXZlbkNhc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGxvY2F0aW9uc1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChwYXJzZUludCh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIC8vdGhpcyBtZWFucyB0aGVyZSBpcyBicmljayBhbmQgbW9ydGFyIGluIGxpc3RcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRCdXNpbmVzc0luZGV4KGkpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldENhcmRGdW5jdGlvbmFsaXR5KF9pc0NhcmRGdW5jdGlvbmFsaXR5KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRHaXZlbkNhc2goX0dpdmVuQ2FzaCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlJlc2V0RWRpdEJveCgpO1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhCdXNpbmVzc0xvY2F0aW9uTm9kZXMpO1xyXG4gICAgcmV0dXJuIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7XHJcbiAgfSxcclxuXHJcbiAgRGVzdHJveUdlbmVyYXRlZE5vZGVzKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbihfbmFtZSwgX1NoYXJlQW1vdW50LCBfaXNBZGRpbmcpIHtcclxuICAgIGlmIChfaXNBZGRpbmcpIHtcclxuICAgICAgdmFyIF9zdG9jayA9IG5ldyBTdG9ja0luZm8oKTtcclxuICAgICAgX3N0b2NrLkJ1c2luZXNzTmFtZSA9IF9uYW1lO1xyXG4gICAgICBfc3RvY2suU2hhcmVBbW91bnQgPSBfU2hhcmVBbW91bnQ7XHJcblxyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZlN0b2Nrcy5wdXNoKF9zdG9jayk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfZm9yU2VsZWN0ZWRCdXNpbmVzcyA9IGZhbHNlLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMCwgSEJBbW91bnQgPSAwLCBCTUFtb3VudCA9IDAsIEJNTG9jYXRpb25zID0gMCkge1xyXG4gICAgaWYgKF9mb3JTZWxlY3RlZEJ1c2luZXNzKSB7XHJcbiAgICAgIHZhciBfdGl0bGUgPSBcIlBheURheVwiO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBfaXNCb3QsIF9mb3JTZWxlY3RlZEJ1c2luZXNzLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4LCBIQkFtb3VudCwgQk1BbW91bnQsIEJNTG9jYXRpb25zLCAxLCAwLCBfbmV4dFR1cm5oYWxmUGF5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChEb3VibGVQYXlEYXkgJiYgUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBfc2tpcE5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk7XHJcbiAgICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXk7XHJcbiAgICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk7XHJcblxyXG4gICAgICBpZiAoX3NraXBOZXh0UGF5ZGF5KSB7XHJcbiAgICAgICAgLy9pZiBwcmV2aW91c2x5IHNraXAgcGF5ZGF5IHdhcyBzdG9yZWQgYnkgYW55IGNhcmRcclxuICAgICAgICB0aGlzLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG5cclxuICAgICAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIFBheURheS5cIiwgMTYwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgIH0sIDE2NTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIFBheURheS5cIik7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBfdGl0bGUgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZiAoX2lzRG91YmxlUGF5RGF5KSBfdGl0bGUgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgIGVsc2UgX3RpdGxlID0gXCJQYXlEYXlcIjtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSwgX2lzRG91YmxlUGF5RGF5LCBfc2tpcEhNTmV4dFBheWRheSwgX3NraXBCTU5leHRQYXlkYXksIF9pc0JvdCwgZmFsc2UsIDAsIDAsIDAsIDAsIFBhc3NlZFBheURheUNvdW50ZXIsIERvdWJsZVBheURheUNvdW50ZXIsIF9uZXh0VHVybmhhbGZQYXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQmFua3J1cHRfVHVybkRlY2lzaW9uKCkge1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50ICs9IDE7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCk7XHJcbiAgfSxcclxuXHJcbiAgU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50LCBfdUlEKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgQ2FzaDogX2Ftb3VudCwgSUQ6IF91SUQgfSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMywgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2RhdGEpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IF9kYXRhLkRhdGEuQ2FzaDtcclxuICAgICAgdmFyIF9pRCA9IF9kYXRhLkRhdGEuSUQ7XHJcblxyXG4gICAgICB2YXIgX215SW5kZXggPSB0aGlzLkdldE15SW5kZXgoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5QbGF5ZXJVSUQgPT0gX2lEKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLmlzR2FtZUZpbmlzaGVkID09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlRvdGFsU2NvcmUgKz0gX2Ftb3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgcmVjZWl2ZWQgcHJvZml0IG9mICRcIiArIF9hbW91bnQgKyBcIiBmcm9tIG90aGVyIHBsYXllci5cIiwgMjgwMCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBDYXJkcyBSdWxlc1xyXG4gIFRvZ2dsZURvdWJsZVBheU5leHRUdXJuKF9zdGF0ZSkge1xyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5ID0gX25leHRUdXJuRG91YmxlUGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUhhbGZQYXlOZXh0VHVybihfc3RhdGUpIHtcclxuICAgIF9uZXh0VHVybmhhbGZQYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5IYWxmUGF5RGF5ID0gX25leHRUdXJuaGFsZlBheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwTmV4dFR1cm4oX3N0YXRlKSB7XHJcbiAgICBfc2tpcE5leHRUdXJuID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybiA9IF9za2lwTmV4dFR1cm47XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpIHtcclxuICAgIF9za2lwTmV4dFBheWRheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheSA9IF9za2lwTmV4dFBheWRheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpIHtcclxuICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXkgPSBfc2tpcEhNTmV4dFBheWRheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKF9zdGF0ZSkge1xyXG4gICAgX3NraXBCTU5leHRQYXlkYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheSA9IF9za2lwQk1OZXh0UGF5ZGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVR1cm5Qcm9ncmVzcyhfc3RhdGUpIHtcclxuICAgIFR1cm5JblByb2dyZXNzID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFJldHVyblR1cm5Qcm9ncmVzcygpIHtcclxuICAgIHJldHVybiBUdXJuSW5Qcm9ncmVzcztcclxuICB9LFxyXG5cclxuICBMb3NlQWxsTWFya2V0aW5nTW9uZXkoKSB7XHJcbiAgICB2YXIgX2xvc2VBbW91bnQgPSAtMTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID4gMCkge1xyXG4gICAgICBfbG9zZUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX2xvc2VBbW91bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfbG9zZUFtb3VudDtcclxuICB9LFxyXG5cclxuICBNdWx0aXBseU1hcmtldGluZ01vbmV5KF9tdWx0aXBsaWVyKSB7XHJcbiAgICB2YXIgX2Ftb3VudEluY3JlYXNlZCA9IC0xO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPiAwKSB7XHJcbiAgICAgIF9hbW91bnRJbmNyZWFzZWQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ICo9IF9tdWx0aXBsaWVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX2Ftb3VudEluY3JlYXNlZCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9hbW91bnRJbmNyZWFzZWQ7XHJcbiAgfSxcclxuXHJcbiAgR2V0TWFya2V0aW5nTW9uZXkoX3Byb2ZpdCkge1xyXG4gICAgdmFyIF9hbW91bnQgPSAtMTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID4gMCkge1xyXG4gICAgICBfcHJvZml0ID0gX3Byb2ZpdCAvIDEwMDtcclxuICAgICAgX2Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgKj0gX3Byb2ZpdDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfYW1vdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2Ftb3VudDtcclxuICB9LFxyXG5cclxuICBHZXRWb2NhYnVsYXJ5UXVlc3Rpb25zSW5kZXgoKSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKFZvY2FidWxhcnlRdWVzdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPCBWb2NhYnVsYXJ5UXVlc3Rpb25zLmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBWb2NhYnVsYXJ5UXVlc3Rpb25zW1ZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyXTtcclxuICAgICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlcisrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X1ZvY2FidWxhcnkoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfVm9jYWJ1bGFyeSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0RXN0YWJsaXNobWVudFF1ZXN0aW9uc0luZGV4KCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChFc3RhYmxpc2htZW50UXVlc3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyIDwgRXN0YWJsaXNobWVudFF1ZXN0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gRXN0YWJsaXNobWVudFF1ZXN0aW9uc1tFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlcl07XHJcbiAgICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIrKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Fc3RhYmxpc2htZW50KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X0VzdGFibGlzaG1lbnQoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Wb2NhYnVsYXJ5KF9kYXRhID0gbnVsbCkge1xyXG4gICAgaWYgKF9kYXRhID09IG51bGwpIHtcclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9ucyA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTFdO1xyXG5cclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9ucy5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coVm9jYWJ1bGFyeVF1ZXN0aW9ucyk7XHJcbiAgICAgIFZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuXHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSB7IFZvY0FycmF5OiBWb2NhYnVsYXJ5UXVlc3Rpb25zLCBFc3RBcnJheTogbnVsbCB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE4LCBfdGVtcERhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9kYXRhLlZvY0FycmF5ICE9IG51bGwpIHtcclxuICAgICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zID0gX2RhdGEuVm9jQXJyYXk7XHJcbiAgICAgICAgY29uc29sZS5sb2coVm9jYWJ1bGFyeVF1ZXN0aW9ucyk7XHJcbiAgICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X0VzdGFibGlzaG1lbnQoX2RhdGEgPSBudWxsKSB7XHJcbiAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV07XHJcblxyXG4gICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhFc3RhYmxpc2htZW50UXVlc3Rpb25zKTtcclxuICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgVm9jQXJyYXk6IG51bGwsIEVzdEFycmF5OiBFc3RhYmxpc2htZW50UXVlc3Rpb25zIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTgsIF90ZW1wRGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2RhdGEuRXN0QXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnMgPSBfZGF0YS5Fc3RBcnJheTtcclxuICAgICAgICBjb25zb2xlLmxvZyhFc3RhYmxpc2htZW50UXVlc3Rpb25zKTtcclxuICAgICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbihfZGF0YSkge1xyXG4gICAgdmFyIF9xdWVzdGlvblJlZiA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfUXVlc3Rpb25zRGF0YSgpO1xyXG4gICAgdmFyIF91c2VySUQgPSBfZGF0YS5Vc2VySUQ7XHJcbiAgICB2YXIgX3F1ZXN0aW9uSW5kZXggPSBfZGF0YS5RdWVzdGlvbjtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfZGF0YS5Vc2VySW5kZXg7XHJcbiAgICB2YXIgX2lzVm9jID0gX2RhdGEuSXNWb2M7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAgIGlmIChfaXNWb2MpIHtcclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIrKztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyKys7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF91c2VySUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSUQgbWF0Y2hlZFwiKTtcclxuXHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcblxyXG4gICAgICB2YXIgX1FkYXRhO1xyXG4gICAgICBpZiAoX2lzVm9jKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2b2NcIik7XHJcbiAgICAgICAgX1FkYXRhID0gX3F1ZXN0aW9uUmVmLlZvY2FidWxhcnlRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXhdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXN0XCIpO1xyXG4gICAgICAgIF9RZGF0YSA9IF9xdWVzdGlvblJlZi5Fc3RhYmxpc2htZW50UXVlc3Rpb25zW19xdWVzdGlvbkluZGV4XTtcclxuICAgICAgfVxyXG5cclxuICAgICAgQ29ycmVjdEFuc3dlciA9IF9RZGF0YS5Db3JyZWN0T3B0aW9uO1xyXG4gICAgICB2YXIgX21lc3NhZ2UgPSBcIkNob29zZSB0aGUgY29ycmVjdCBhbnN3ZXIuXCIgKyBcIlxcblwiICsgXCIqd3JvbmcgYW5zd2VyIHdpbGwgY29zdCB5b3UgYSBmaW5lIG9mICQ1MDAwLlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBfUWRhdGEuUXVlc3Rpb24gKyBcIlxcblwiICsgXCJBLiBcIiArIF9RZGF0YS5PcHRpb24xICsgXCJcXG5cIiArIFwiQi4gXCIgKyBfUWRhdGEuT3B0aW9uMiArIFwiXFxuXCIgKyBcIkMuIFwiICsgX1FkYXRhLk9wdGlvbjMgKyBcIlxcblwiICsgXCJELiBcIiArIF9RZGF0YS5PcHRpb240O1xyXG5cclxuICAgICAgLy8gdmFyIF9xdWVzdGlvbkFza2VkID0gT25lUXVlc3Rpb25zW19xdWVzdGlvbkluZGV4IC0gMV07XHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24oX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX215RGF0YSwgX3Jvb21EYXRhLCBfaXNUdXJuT3ZlciwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gIH0sXHJcblxyXG4gIE9uZVF1ZXN0aW9uRGVjaXNpb25fU2VsZWN0T3B0aW9uX09uZVF1ZXN0aW9uKGV2ZW50ID0gbnVsbCkge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3NlbGVjdGlvbiA9IHBhcnNlSW50KGV2ZW50LmN1cnJlbnRUYXJnZXQubmFtZS5zcGxpdChcIl9cIilbMV0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwib3B0aW9uIHNlbGVjdGVkOiBcIiArIF9zZWxlY3Rpb24pO1xyXG4gICAgY29uc29sZS5sb2coXCJDb3JyZWN0QW5zd2VyOiBcIiArIENvcnJlY3RBbnN3ZXIpO1xyXG4gICAgaWYgKF9zZWxlY3Rpb24gPT0gQ29ycmVjdEFuc3dlcikge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91ciBhbnN3ZXIgd2FzIGNvcnJlY3QhLlwiLCAxMjAwKTtcclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKGZhbHNlLCB0cnVlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9teURhdGEuQ2FzaCA+PSA1MDAwKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggLT0gNTAwMDtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbnN3ZXJlZCB3cm9uZywgZmluZSBhbW91bnQgd2FzIHBheWVkIHRvIHRoZSBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKHRydWUsIGZhbHNlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCwgU2tpcHBpbmcgcXVlc3Rpb25cIik7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIGZhbHNlLCAwLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBPbmVRdWVzdGlvbkRlY2lzaW9uX1BheUFtb3VudF9PbmVRdWVzdGlvbigpIHtcclxuICAvLyAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgLy8gICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAvLyAgIGlmIChfbXlEYXRhLkNhc2ggPj0gNTAwMCkge1xyXG4gIC8vICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAvLyAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgLy8gICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoIC09IDUwMDA7XHJcbiAgLy8gICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7XHJcbiAgLy8gICAgICAgICBicmVhaztcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgIH1cclxuXHJcbiAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgcGFpZCBjYXNoIGFtb3VudCB0byBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gIC8vICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAvLyAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24odHJ1ZSwgZmFsc2UsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH0sXHJcblxyXG4gIC8vIE9uZVF1ZXN0aW9uRGVjaXNpb25fQW5zd2VyUXVlc3Rpb25fT25lUXVlc3Rpb24oKSB7XHJcbiAgLy8gICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gIC8vICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAvLyAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYW5zd2VyZWQgdGhlIHF1ZXN0aW9uLlwiLCAxMjAwKTtcclxuICAvLyAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIC8vICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIHRydWUsIE9uZVF1ZXN0aW9uSW5kZXgsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAvLyB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCh0cnVlKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5SZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCgpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KF9teURhdGEsIF9yb29tRGF0YSwgX2lzVHVybk92ZXIsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJUYWtlT3Zlcl9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgdmFyIF9teURhdGE7XHJcbiAgICB2YXIgX3Jvb21EYXRhO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIF9yb29tRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBfbXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgX3Jvb21EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgIH1cclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIodHJ1ZSk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcigpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIoX215RGF0YSwgX3Jvb21EYXRhLCBfaXNUdXJuT3ZlciwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gIH0sXHJcblxyXG4gIFNlbGVjdFBsYXllckJ1eUhhbGZCdXNpbmVzc19TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgdmFyIF9teURhdGE7XHJcbiAgICB2YXIgX3Jvb21EYXRhO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIF9yb29tRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBfbXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgX3Jvb21EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgIH1cclxuXHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyKHRydWUpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIoKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyKF9teURhdGEsIF9yb29tRGF0YSwgX2lzVHVybk92ZXIsIHRoaXMuU2VsZWN0ZWRNb2RlLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJEYW1hZ2luZ0luZm9ybWF0aW9uX1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5KF9pc1R1cm5PdmVyID0gZmFsc2UpIHtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX215RGF0YTtcclxuICAgIHZhciBfcm9vbURhdGE7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgX3Jvb21EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIF9teURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICBfcm9vbURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgfVxyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyh0cnVlKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5SZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckRhbWFnaW5nKCk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyhfbXlEYXRhLCBfcm9vbURhdGEsIF9pc1R1cm5PdmVyLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50X1NlbGVjdFBsYXllckZvclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgdmFyIF9vd25JRCA9IF9kYXRhLlVzZXJJRC50b1N0cmluZygpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IHBhcnNlSW50KF9kYXRhLlVzZXJJbmRleCk7XHJcbiAgICB2YXIgX3BsYXllck5hbWUgPSBfZGF0YS5Vc2VyTmFtZTtcclxuICAgIHZhciBfcGxheWVySUQgPSBfZGF0YS5Pd25QbGF5ZXJJRC50b1N0cmluZygpO1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIGlmIChfb3duSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBldmVudDogXCIgKyBfcGxheWVyTmFtZSk7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IF9vd25JRCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlVzZXJJREZvclByb2ZpdFBheURheSA9IF9wbGF5ZXJJRDtcclxuXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIiwgdGhpcy5QbGF5ZXJHYW1lSW5mbywgdHJ1ZSk7XHJcbiAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2hvd1RvYXN0KFwiUGxheWVyIFwiICsgX3BsYXllck5hbWUgKyBcIiB3aWxsIHJlY2VpdmUgYWxsIHlvdXIgbmV4dCBwYXkgZGF5IHByb2ZpdHNcIiwgMzIwMCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2hhc0RvbmVQYXltZW50LCBfaGFzQW5zd2VyZWRRdWVzdGlvbiwgX3F1ZXN0aW9uSW5kZXgsIF9Vc2VySUQpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgUGF5bWVudERvbmU6IF9oYXNEb25lUGF5bWVudCwgUXVlc3Rpb25BbnN3ZXJlZDogX2hhc0Fuc3dlcmVkUXVlc3Rpb24sIFF1ZXN0aW9uSW5kZXg6IF9xdWVzdGlvbkluZGV4LCBJRDogX1VzZXJJRCB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg4LCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgRGVkdWN0Q2FzaF9DYXJkRnVuY3Rpb25hbGl0eShfYW1vdW50KSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCA+PSBfYW1vdW50KSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCAtPSBfYW1vdW50O1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggPCBfYW1vdW50KSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBZGRDYXNoX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICB2YXIgX2Ftb3VudCA9IF9kYXRhLmFtb3VudDtcclxuICAgIHZhciBfSUQgPSBfZGF0YS5JRDtcclxuICAgIHZhciBfbXNnID0gX2RhdGEubXNnO1xyXG5cclxuICAgIHZhciBtb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIGlmIChtb2RlID09IDIpIHtcclxuICAgICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcbiAgICAgICAgaWYgKF9hY3Rvci5QbGF5ZXJVSUQgPT0gX0lEKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KF9tc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChtb2RlID09IDEpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBfSUQgJiYgaW5kZXggIT0gdGhpcy5UdXJuTnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KF9tc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5VcGRhdGVVSURhdGEoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9kYXRhKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgdmFyIF9oYXNEb25lUGF5bWVudCA9IF9kYXRhLlBheW1lbnREb25lO1xyXG4gICAgICB2YXIgX2hhc0Fuc3dlcmVkUXVlc3Rpb24gPSBfZGF0YS5RdWVzdGlvbkFuc3dlcmVkO1xyXG4gICAgICB2YXIgX3F1ZXN0aW9uSW5kZXggPSBfZGF0YS5RdWVzdGlvbkluZGV4O1xyXG4gICAgICB2YXIgX3VJRCA9IF9kYXRhLklEO1xyXG5cclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgIGlmIChfcXVlc3Rpb25JbmRleCA9PSAwKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcInBsYXllciBkb2VzIG5vdCBoYXZlIGVub3VnaCBjYXNoLCBzbyBxdWVzdGlvbnMgd2VyZSBza2lwcGVkLlwiLCAyMTAwKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX2hhc0RvbmVQYXltZW50KSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggKz0gNTAwMDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGF5ZXIgaGFzIGdpdmVuIHdyb25nIGFuc3dlciwgY2FzaCAkNTAwMCBoYXMgYmVlbiBhZGRlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2hhc0Fuc3dlcmVkUXVlc3Rpb24pIHtcclxuICAgICAgICAgIHZhciBfc2VsZWN0ZWRQbGF5ZXJJbmRleCA9IDA7XHJcbiAgICAgICAgICB2YXIgX2FjdG9yc0RhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoX3VJRCA9PSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgICBfc2VsZWN0ZWRQbGF5ZXJJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcInBsYXllciBoYXMgZ2l2ZW4gY29ycmVjdCBhbnN3ZXIsIG5vIGNhc2ggd2FzIHJlY2VpdmVkLlwiLCAyMTAwKTtcclxuXHJcbiAgICAgICAgICAvLyBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMSkge1xyXG4gICAgICAgICAgLy8gICAvL2hhdmUgeW91IHNraXBwZWQgbG9hbiBwcmV2aW91cyBwYXlkYXk/XHJcbiAgICAgICAgICAvLyAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ta2lwcGVkTG9hblBheW1lbnQpIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgc2tpcHBlZCBsb2FuIHBheWVtZW50IGluIHByZXZpb3VzIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSAyKSB7XHJcbiAgICAgICAgICAvLyAgIC8vSGF2ZSB5b3UgdGFrZW4gYW55IGxvYW4/XHJcbiAgICAgICAgICAvLyAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICAvLyAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAvLyAgICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAvLyAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgIC8vICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgIC8vICAgfVxyXG5cclxuICAgICAgICAgIC8vICAgaWYgKF9sb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHRha2VuIHNvbWUgbG9hblwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSB0YWtlbiBhbnkgbG9hblwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSAzKSB7XHJcbiAgICAgICAgICAvLyAgIC8vQXJlIHlvdSBiYW5rcnVwdGVkPyBpZiBtb3JlIHRoYW4gb25jZSwgdGVsbCBtZSB0aGUgYW1vdW50P1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuSXNCYW5rcnVwdCkge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkIFwiICsgX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQmFua3J1cHRBbW91bnQgKyBcIiB0aW1lL2VzLlwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSBiZWVuIGJhbmtydXB0ZWRcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gNCkge1xyXG4gICAgICAgICAgLy8gICAvL0lzIHlvdXIgdHVybiBnb2luZyB0byBiZSBza2lwcGVkIG5leHQgdGltZT9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBiZSBza2lwcGVkLlwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgbm90IGJlIHNraXBwZWQuXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDUpIHtcclxuICAgICAgICAgIC8vICAgLy9JcyBpdCBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSB5b3VyIG5leHQgcGF5ZGF5P1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXkpIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBiZSBkb3VibGUgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIG5vdCBiZSBkb3VibGUgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICBpZiAoSXNUd2VlbmluZyA9PSB0cnVlKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5KF9kYXRhKTtcclxuICAgICAgfSwgODAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfc3BhY2VzID0gX2RhdGEuRGF0YS5iYWNrc3BhY2VzO1xyXG4gICAgICB2YXIgX2NvdW50ZXIgPSBfZGF0YS5EYXRhLkNvdW50ZXI7XHJcblxyXG4gICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2NvdW50ZXIgKyBCYWNrc3BhY2VzXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1BvcywgMC4xKTtcclxuXHJcbiAgICAgIFJvbGxDb3VudGVyID0gX2NvdW50ZXI7XHJcbiAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFR3ZWVuUGxheWVyX0dvQmFja1NwYWNlczogZnVuY3Rpb24gKE5vZGUsIFRvUG9zLCBzcGVlZCA9IDAuNikge1xyXG4gICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgLnRvKHNwZWVkLCB7IHBvc2l0aW9uOiBjYy52MihUb1Bvcy54LCBUb1Bvcy55KSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7fSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIFJvbGxDb3VudGVyIC09IEJhY2tzcGFjZXM7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IGJhY2tzcGFjZXM6IEJhY2tzcGFjZXMsIENvdW50ZXI6IFJvbGxDb3VudGVyIH0gfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMCwgX2RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9UYWtlT3ZlckJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBfaWQgPSBfZGF0YS5JRDtcclxuICAgICAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5QbGF5ZXI7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzcyA9IF9kYXRhLkJ1c2luZXNzO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9kYXRhLkJ1c2luZXNzSW5kZXg7XHJcbiAgICAgICAgdmFyIF9teUFjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcblxyXG4gICAgICAgIHZhciBfbXlJbmRleCA9IC0xO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9teUFjdG9yLlBsYXllclVJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2lkKTtcclxuXHJcbiAgICAgICAgaWYgKF9teUFjdG9yLlBsYXllclVJRC50b1N0cmluZygpID09IF9pZC50b1N0cmluZygpKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBfaWQpIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy9ob21lIGJhc2VkXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQtLTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50IC09IF9sb2NhdGlvbnM7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ob09mQnVzaW5lc3Muc3BsaWNlKF9idXNpbmVzc0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICBfbXlJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICAgICAgaWYgKF9teUluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIGhhcyBsb3N0IGFsbCBidXNpbmVzc2VzIG9yIG5vdFxyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3VyIGJ1c2luZXNzIFwiICsgX2J1c2luZXNzLkJ1c2luZXNzTmFtZSArIFwiIHdhcyBmb3JjZWZ1bGx5IHRvb2sgb3ZlciwgeW91IGhhdmUgbG9zdCB0aGF0IGJ1c2luZXNzXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3VyIGJ1c2luZXNzIFwiICsgX2J1c2luZXNzLkJ1c2luZXNzTmFtZSArIFwiIHdhcyBmb3JjZWZ1bGx5IHRvb2sgb3ZlciwgeW91IGhhdmUgbG9zdCB0aGF0IGJ1c2luZXNzLCB5b3UgaGF2ZSBiZWVuIGJhbmtydXB0ZWQsIHlvdSB3aWxsIHN0YXJ0IGFnYWluIGluIG5leHQgdHVybi5cIik7XHJcbiAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuQmFua3J1cHRlZE5leHRUdXJuID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRha2VPdmVyQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkoX2RhdGEsIF9pbmRleCwgX3BsYXllckluZGV4ID0gMCwgX2J1eUhhbGZCdXNpbmVzcyA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2J1c2luZXNzID0gX2RhdGEuTm9PZkJ1c2luZXNzW19pbmRleF07XHJcbiAgICBjb25zb2xlLmxvZyhfYnVzaW5lc3MpO1xyXG5cclxuICAgIHZhciBfZGljZVJvbGwgPSB0aGlzLlJvbGxUd29EaWNlcygpO1xyXG4gICAgdmFyIF9tdWx0aXBsaWVyQnVzaW5lc3MgPSAxMDAwMDtcclxuICAgIHZhciBfcmVzdWx0ID0gX2RpY2VSb2xsICogX211bHRpcGxpZXJCdXNpbmVzcztcclxuICAgIHZhciBfcGxheWVyID0gbnVsbDtcclxuXHJcbiAgICAvL3NlbmQgcnBjIHRvIG90aGVyIHBsYXllciBhcyB3ZWxsXHJcbiAgICBfcGxheWVyID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIHZhciBfc2VuZGluZ0RhdGEgPSB7IElEOiBfcGxheWVyLlBsYXllclVJRCwgUGxheWVyOiBfcGxheWVyLCBCdXNpbmVzczogX2J1c2luZXNzLCBCdXNpbmVzc0luZGV4OiBfaW5kZXggfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjMsIF9zZW5kaW5nRGF0YSk7XHJcblxyXG4gICAgaWYgKCFfYnVzaW5lc3MuTG9hblRha2VuKSB7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoICs9IF9yZXN1bHQ7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgIFwiXFxuXCIgKyBcIkRpY2UgUmVzdWx0IDogXCIgKyBfZGljZVJvbGwgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiQW1vdW50IDogXCIgKyBfZGljZVJvbGwgKyBcIiAqIFwiICsgX211bHRpcGxpZXJCdXNpbmVzcyArIFwiID0gJFwiICsgX3Jlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJDYXNoIGFtb3VudCBvZiAkXCIgKyBfcmVzdWx0ICsgXCIgYWRkZWQgYWZ0ZXIgZGVkdWN0aW5nIHN1cHBvc2VkIGxvYW4sIHRvdGFsIGNhc2ggYmVjb21lcyAkXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaFxyXG4gICAgICApO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTY3JlZW5BbG9uZ1R1cm5PdmVyX19CdXNpbmVzc0dlbnJpYygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF90ZW1wU3VtID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggKyBfcmVzdWx0O1xyXG4gICAgICBpZiAoX3RlbXBTdW0gPj0gX2J1c2luZXNzLkxvYW5BbW91bnQpIHtcclxuICAgICAgICBfdGVtcFN1bSAtPSBfYnVzaW5lc3MuTG9hbkFtb3VudDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCA9IF90ZW1wU3VtO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiRGljZSBSZXN1bHQgOiBcIiArXHJcbiAgICAgICAgICAgIF9kaWNlUm9sbCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJMb2FuIEFtb3VudCA6ICRcIiArXHJcbiAgICAgICAgICAgIF9idXNpbmVzcy5Mb2FuQW1vdW50ICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkFtb3VudCA6IFwiICtcclxuICAgICAgICAgICAgX2RpY2VSb2xsICtcclxuICAgICAgICAgICAgXCIgKiBcIiArXHJcbiAgICAgICAgICAgIF9tdWx0aXBsaWVyQnVzaW5lc3MgK1xyXG4gICAgICAgICAgICBcIiA9ICRcIiArXHJcbiAgICAgICAgICAgIF9yZXN1bHQgK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiQWZ0ZXIgZGVkdWN0aW5nIHN1cHBvc2VkIGxvYW4sIHRvdGFsIGNhc2ggYmVjb21lcyAkXCIgK1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTY3JlZW5BbG9uZ1R1cm5PdmVyX19CdXNpbmVzc0dlbnJpYygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBwYXkgb2ZmIGxvYW4sIHR1cm4gd2lsbCBiZSBza2lwcGVkIG5vd1wiKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNjcmVlbkFsb25nVHVybk92ZXJfX0J1c2luZXNzR2VucmljKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfQnV5SGFsZkJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBfaWQgPSBfZGF0YS5JRDtcclxuICAgICAgICB2YXIgX2Nhc2hBbW91bnQgPSBfZGF0YS5BbW91bnQ7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gX2RhdGEuQnVzaW5lc3NJbmRleDtcclxuICAgICAgICB2YXIgX3NlbmRlcklEID0gX2RhdGEuTXlJRDtcclxuICAgICAgICB2YXIgX3NlbmRlck5hbWUgPSBfZGF0YS5NeU5hbWU7XHJcbiAgICAgICAgdmFyIF9teUFjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcbiAgICAgICAgaWYgKF9teUFjdG9yLlBsYXllclVJRCA9PSBfaWQudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCArPSBwYXJzZUludChfY2FzaEFtb3VudCk7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXAgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVySUQgPSBfc2VuZGVySUQ7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLlBhcnRuZXJOYW1lID0gX3NlbmRlck5hbWU7XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChfc2VuZGVyTmFtZSArIFwiIGhhcyBzZW5kIHlvdSBjYXNoIGFtb3VudCAkXCIgKyBfY2FzaEFtb3VudCArIFwiIGFuZCBoYXMgYmVjb21lIDUwJSBvd25lciBvZiB5b3VyIGJ1c2luZXNzIFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgUGF5QW1vdW50X0J1eUhhbGZCdXNpbmVzc19DYXJkRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCA+PSBoYWxmQnVzaW5lc3NBbW91bnQpIHtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggLT0gaGFsZkJ1c2luZXNzQW1vdW50O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBoYWxmIG93bmVyc2hpcCBvZiB0aGUgYnVzaW5lc3MsIHJlbWFpbmluZyBjYXNoICRcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTY3JlZW5BbG9uZ1R1cm5PdmVyX19CdXNpbmVzc0dlbnJpYygpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0J1eUhhbGZCdXNpbmVzcyhmYWxzZSk7XHJcbiAgICAgIHZhciBfc2VuZGluZ0RhdGEgPSB7IElEOiBoYWxmQnVzaW5lc3NBbW91bnRJRCwgQW1vdW50OiBoYWxmQnVzaW5lc3NBbW91bnQsIEJ1c2luZXNzSW5kZXg6IGhhbGZCdXNpbmVzc0Ftb3VudEluZGV4LCBNeUlEOiB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlELCBNeU5hbWU6IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjYsIF9zZW5kaW5nRGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgIC8vR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIEJ1eUhhbGZCdXNpbmVzc19DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSwgX2luZGV4LCBfcGxheWVySW5kZXggPSAwKSB7XHJcbiAgICAvL3ZhciBfYnVzaW5lc3MgPSBfZGF0YS5Ob09mQnVzaW5lc3NbX2luZGV4XTtcclxuICAgIC8vY29uc29sZS5sb2coX2J1c2luZXNzKTtcclxuXHJcbiAgICB2YXIgX2RpY2VSb2xsID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgIHZhciBfbXVsdGlwbGllckJ1c2luZXNzID0gMzAwMDtcclxuICAgIHZhciBfcmVzdWx0ID0gX2RpY2VSb2xsICogX211bHRpcGxpZXJCdXNpbmVzcztcclxuXHJcbiAgICBoYWxmQnVzaW5lc3NBbW91bnQgPSBfcmVzdWx0O1xyXG4gICAgaGFsZkJ1c2luZXNzQW1vdW50SUQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEO1xyXG4gICAgaGFsZkJ1c2luZXNzQW1vdW50SW5kZXggPSBfaW5kZXg7XHJcblxyXG4gICAgdmFyIF9wbGF5ZXIgPSBudWxsO1xyXG4gICAgdmFyIF90ZXh0ID0gXCJcXG5cIiArIFwiRGljZSBSZXN1bHQgOiBcIiArIF9kaWNlUm9sbCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJQYXlhYmxlIEFtb3VudCA6IFwiICsgX2RpY2VSb2xsICsgXCIgKiBcIiArIF9tdWx0aXBsaWVyQnVzaW5lc3MgKyBcIiA9ICRcIiArIF9yZXN1bHQ7XHJcblxyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9CdXlIYWxmQnVzaW5lc3ModHJ1ZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2V0VGl0bGVUZXh0X0J1eUhhbGZCdXNpbmVzcyhfdGV4dCk7XHJcbiAgfSxcclxuICBSZWNlaXZlRXZlbnRfU2VsZWN0UGxheWVyRGFtYWdpbmdEZWNpc2lvbl9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICB2YXIgX3BsYXllciA9IF9kYXRhLlBsYXllcjtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gcGFyc2VJbnQoX2RhdGEuUGxheWVySW5kZXgpO1xyXG4gICAgICAgIHZhciBfc2VuZGVySUQgPSBfZGF0YS5NeVVzZXJJRDtcclxuXHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICBpZiAoX3BsYXllci5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZXZlbnQ6IFwiICsgX3BsYXllci5QbGF5ZXJOYW1lKTtcclxuXHJcbiAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0U2VuZGVySURfRGFtYWdlRGVjaXNpb24oX3NlbmRlcklEKTtcclxuICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVNYWluU2NyZWVuX0RhbWFnZURlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURpY2VSZXN1bHRTY3JlZW5fRGFtYWdlRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG4gIC8vI2VuZHJlZ2lvblxyXG59KTtcclxuLy9tb2R1bGUuZXhwb3J0cyAgPSBQbGF5ZXJEYXRhOyAvL3doZW4gaW1wb3J0cyBpbiBhbm90aGVyIHNjcmlwdCBvbmx5IHJlZmVyZW5jZSBvZiBwbGF5ZXJkYXRhIGNsYXNzIHdvdWxkIGJlIGFibGUgdG8gYWNjZXNzZWQgZnJvbSBHYW1lbWFuYWdlciBpbXBvcnRcclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lTWFuYWdlcjtcclxuLy8jZW5kcmVnaW9uXHJcbiJdfQ==