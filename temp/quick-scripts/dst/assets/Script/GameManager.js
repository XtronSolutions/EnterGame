
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
        BigBusinessArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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
        MarketingArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13];
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
        WildCardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
            RandomCard = this.SelectRelatedCard(true, false, false, false); //RandomCard = 11;
          } else if (_spaceID == 5) {
            //landed on some losses cards
            RandomCard = this.SelectRelatedCard(false, true, false, false); //RandomCard = 14;
          } else if (_spaceID == 3) {
            //landed on some marketing cards
            RandomCard = this.SelectRelatedCard(false, false, true, false); //RandomCard = 10;
          } else if (_spaceID == 1) {
            //landed on some wild cards
            RandomCard = this.SelectRelatedCard(false, false, false, true); // RandomCard = 9;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJQcmV2aW91c0RpY2VSb2xsMyIsIlByZXZpb3VzRGljZVJvbGw0IiwiUHJldmlvdXNEaWNlUm9sbDUiLCJ1c2VyR2FtZU92ZXIiLCJCb3RHYW1lT3ZlciIsIlRvdGFsQ291bnRlclJlYWNoZWQiLCJQYXNzZWRQYXlEYXlDb3VudGVyIiwiRG91YmxlUGF5RGF5Q291bnRlciIsIk5vQ2FyZEZ1bmN0aW9uYWxpdHkiLCJQbGF5ZXJMZWZ0IiwiRm9yY2VDaGFuZ2VUaW1lT3V0IiwiR2FtZUNvbXBsZXRlZCIsIkNvcnJlY3RBbnN3ZXIiLCJWb2NhYnVsYXJ5UXVlc3Rpb25zIiwiRXN0YWJsaXNobWVudFF1ZXN0aW9ucyIsIlZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyIiwiRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIiLCJCaWdCdXNpbmVzc0FycmF5IiwiTG9zc2VzQXJyYXkiLCJNYXJrZXRpbmdBcnJheSIsIldpbGRDYXJkQXJyYXkiLCJCaWdCdXNpbmVzc0FycmF5Q291bnRlciIsIkxvc3Nlc0FycmF5Q291bnRlciIsIk1hcmtldGluZ0FycmF5Q291bnRlciIsIldpbGRDYXJkQXJyYXlDb3VudGVyIiwiRW51bUJ1c2luZXNzVHlwZSIsImNjIiwiRW51bSIsIk5vbmUiLCJIb21lQmFzZWQiLCJicmlja0FuZG1vcnRhciIsIkJ1c2luZXNzSW5mbyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJOYW1lIiwiQnVzaW5lc3NUeXBlIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uIiwiVGV4dCIsIkJ1c2luZXNzTmFtZSIsIkFtb3VudCIsIkludGVnZXIiLCJJc1BhcnRuZXJzaGlwIiwidHlwdyIsIkJvb2xlYW4iLCJQYXJ0bmVySUQiLCJQYXJ0bmVyTmFtZSIsIkxvY2F0aW9uc05hbWUiLCJMb2FuVGFrZW4iLCJMb2FuQW1vdW50IiwiUmVjZWl2ZURvdWJsZVBheURheSIsImN0b3IiLCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHkiLCJOZXh0VHVybkRvdWJsZVBheSIsIlNraXBOZXh0VHVybiIsIlNraXBOZXh0UGF5ZGF5IiwiU2tpcEhNTmV4dFBheWRheSIsIlNraXBCTU5leHRQYXlkYXkiLCJOZXh0VHVybkhhbGZQYXlEYXkiLCJOZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyIiwiSGFzTWFya2V0aW5nQ29tcGFueSIsIlN0b2NrSW5mbyIsIlNoYXJlQW1vdW50IiwiUGxheWVyRGF0YSIsIlBsYXllck5hbWUiLCJQbGF5ZXJVSUQiLCJBdmF0YXJJRCIsIklzQm90IiwiTm9PZkJ1c2luZXNzIiwiQ2FyZEZ1bmN0aW9uYWxpdHkiLCJIb21lQmFzZWRBbW91bnQiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIlJlY2VpdmVEb3VibGVQYXlEYXlBbW91bnQiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIk5vT2ZTdG9ja3MiLCJDYXNoIiwiR29sZENvdW50IiwiU3RvY2tDb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkxhd3llclN0YXR1cyIsIklzQmFua3J1cHQiLCJCYW5rcnVwdEFtb3VudCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBsYXllclJvbGxDb3VudGVyIiwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZCIsImlzR2FtZUZpbmlzaGVkIiwiVG90YWxTY29yZSIsIlRvdGFsSEJDYXNoIiwiVG90YWxCTUNhc2giLCJUb3RhbEdvbGRDYXNoIiwiVG90YWxMb2FuQmFsYW5jZSIsIlRvdGFsU3RvY2tzQ2FzaCIsIkdhbWVPdmVyIiwiSXNBY3RpdmUiLCJDYW5HaXZlUHJvZml0T25QYXlEYXkiLCJVc2VySURGb3JQcm9maXRQYXlEYXkiLCJSb2xsQ291bnRlciIsIkRpY2VUZW1wIiwiRGljZVJvbGwiLCJJc1R3ZWVuaW5nIiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHVybkNoZWNrQXJyYXkiLCJCdXNpbmVzc0xvY2F0aW9uTm9kZXMiLCJQYXNzZWRQYXlEYXkiLCJEb3VibGVQYXlEYXkiLCJfbmV4dFR1cm5Eb3VibGVQYXkiLCJfbmV4dFR1cm5oYWxmUGF5IiwiX3NraXBOZXh0VHVybiIsIl9za2lwTmV4dFBheWRheSIsIl9za2lwSE1OZXh0UGF5ZGF5IiwiX3NraXBCTU5leHRQYXlkYXkiLCJDYXJkRXZlbnRSZWNlaXZlZCIsIlR1cm5JblByb2dyZXNzIiwiQmFja3NwYWNlcyIsImlzR2FtZU92ZXIiLCJDYXJkRGlzcGxheVNldFRpbW91dCIsIkdhbWVNYW5hZ2VyIiwiQ29tcG9uZW50IiwiUGxheWVyR2FtZUluZm8iLCJCb3RHYW1lSW5mbyIsIlBsYXllck5vZGUiLCJOb2RlIiwiQ2FtZXJhTm9kZSIsIkFsbFBsYXllclVJIiwiQWxsUGxheWVyTm9kZXMiLCJTdGFydExvY2F0aW9uTm9kZXMiLCJTZWxlY3RlZE1vZGUiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJTZXRQbGF5ZXJMZWZ0IiwiX3N0YXRlIiwiUmVzZXRBbGxWYXJpYWJsZXMiLCJJbnB1dFRlc3REaWNlMSIsIl92YWwiLCJJbnB1dFRlc3REaWNlMiIsIm9uTG9hZCIsIlJlc2V0UGF5RGF5IiwiVHVybk51bWJlciIsIlR1cm5Db21wbGV0ZWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiSW5pdF9HYW1lTWFuYWdlciIsIlJhbmRvbUNhcmRJbmRleCIsIkNhcmRDb3VudGVyIiwiQ2FyZERpc3BsYXllZCIsImNvbnNvbGUiLCJsb2ciLCJyZXF1aXJlIiwiQ2FtZXJhIiwiZ2V0Q29tcG9uZW50IiwiaXNDYW1lcmFab29taW5nIiwiQ2hlY2tTcGVjdGF0ZSIsImdldFBob3RvblJlZiIsIm15Um9vbSIsImdldEN1c3RvbVByb3BlcnR5IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJIiwiQWxsRGF0YSIsIk1heFBsYXllcnMiLCJsZW5ndGgiLCJTeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIiLCJVcGRhdGVHYW1lVUkiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsIkdldFR1cm5OdW1iZXIiLCJHZXRNeUluZGV4IiwibXlJbmRleCIsIl9hY3RvciIsIlBob3RvbkFjdG9yIiwiY3VzdG9tUHJvcGVydGllcyIsIlBsYXllclNlc3Npb25EYXRhIiwiX2FsbEFjdG9ycyIsImluZGV4IiwiU3luY0RhdGFUb1BsYXllckdhbWVJbmZvIiwiQXNzaWduUGxheWVyR2FtZVVJIiwiRW5hYmxlUGxheWVyTm9kZXMiLCJDbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiX3RvUG9zIiwiVmVjMiIsIkdldF9TcGFjZU1hbmFnZXIiLCJEYXRhIiwiUmVmZXJlbmNlTG9jYXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5Iiwic2V0UG9zaXRpb24iLCJfbGFzdEluZGV4IiwiYWN0aXZlIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIlRvdGFsQ29ubmVjdGVkUGxheWVycyIsIm15Um9vbUFjdG9yQ291bnQiLCJ1c2VySUQiLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNoYW5nZVR1cm4iLCJSYWlzZUV2ZW50Rm9yQ2FyZCIsIl9kYXRhIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJSYWlzZUV2ZW50IiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsImNsZWFyVGltZW91dCIsIkRpc3BsYXlDYXJkT25PdGhlcnMiLCJPbkxhbmRlZE9uU3BhY2UiLCJzZXRUaW1lb3V0IiwiUmVzZXRDYXJkRGlzcGxheSIsIlJlY2VpdmVFdmVudEZvckNhcmQiLCJSYW5kb21DYXJkIiwicmFuZG9tQ2FyZCIsImNvdW50ZXIiLCJSYWlzZUV2ZW50VHVybkNvbXBsZXRlIiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwiU3luY0FsbERhdGEiLCJSZW1vdmVGcm9tQ2hlY2tBcnJheSIsIl91aWQiLCJfaW5kIiwic3BsaWNlIiwiQ2hlY2tUdXJuQ29tcGxldGUiLCJqIiwiUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlIiwicHVzaCIsIkFycmF5TGVuZ3RoIiwiSURGb3VuZCIsIlJlc2V0U29tZVZhbHVlcyIsIkNoYW5nZVR1cm5Gb3JjZWZ1bGx5IiwiVXBkYXRlVmlzdWFsRGF0YSIsIlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSIsIlR1cm5IYW5kbGVyIiwiX3R1cm4iLCJfaXNNYXN0ZXIiLCJDaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQiLCJfcGxheWVyTWF0Y2hlZCIsIlRvZ2dsZVR1cm5Qcm9ncmVzcyIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlJlc2V0VHVyblZhcmlhYmxlIiwiUm9sbERpY2UiLCJEaWNlUm9sbFNjcmVlbiIsIlBsYXllckluZm8iLCJteVJvb21BY3RvcnNBcnJheSIsIlNob3dUb2FzdCIsIlRvZ2dsZVNraXBOZXh0VHVybiIsIlVwZGF0ZVVJRGF0YSIsIk1haW5TZXNzaW9uRGF0YSIsIk15RGF0YSIsIl9jb3VudGVyIiwiU3RhcnRUdXJuIiwiUmVjZWl2ZUJhbmtydXB0RGF0YSIsIl9pc0JhbmtydXB0ZWQiLCJiYW5rcnVwdGVkIiwidHVybiIsIl9wbGF5ZXJEYXRhIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiX3JhbmRvbUluZGV4IiwiZ2V0UmFuZG9tIiwiU2V0TmFtZSIsIlNldEF2YXRhciIsIl90b2dnbGVIaWdobGlnaHQiLCJfaW5kZXgiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJjaGlsZHJlbiIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiQXZhdGFyU3ByaXRlcyIsIlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMiLCJ0YXJnZXRQb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInJhdGlvIiwid2luU2l6ZSIsImhlaWdodCIsInpvb21SYXRpbyIsImxhdGVVcGRhdGUiLCJzeW5jRGljZVJvbGwiLCJfcm9sbCIsIl9kaWNlMSIsImRpY2UxIiwiX2RpY2UyIiwiZGljZTIiLCJfcmVzdWx0IiwiZXJyb3IiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJBbmltYXRlRGljZSIsIkRpY2VGdW50aW9uYWxpdHkiLCJfcG9zIiwiVHdlZW5DYW1lcmEiLCJUZW1wQ2hlY2tTcGFjZSIsIl9yb2xsaW5nIiwidGVtcGNvdW50ZXIiLCJ0ZW1wY291bnRlcjIiLCJkaWNldG9iZSIsInBhcnNlSW50IiwiU3BhY2VEYXRhIiwiU3BhY2VzVHlwZSIsIkRpY2UxIiwiRGljZTIiLCJfbmV3Um9sbCIsIlJvbGxPbmVEaWNlIiwiUm9sbFR3b0RpY2VzIiwiUG9wdWxhdGVEZWNrc0FycmF5IiwiX2lzQmlnQnVzaW5lc3MiLCJfaXNMb3NzZXMiLCJfaXNNYXJrZXRpbmciLCJfaXNXaWxkQ2FyZCIsInNvcnQiLCJNYXRoIiwicmFuZG9tIiwiX3RlbXBEYXRhIiwiQmlnQXJyYXkiLCJMb3NzQXJyYXkiLCJNYXJrZXRBcnJheSIsIldpbGRBcnJ5YSIsIkdldEJpZ0J1c2luZXNzSW5kZXgiLCJHZXRMb3NzZXNJbmRleCIsIkdldE1hcmtldGluZ0luZGV4IiwiR2V0V2lsZENhcmRJbmRleCIsIlVwZGF0ZUNvdW50ZXJzIiwiU2VsZWN0UmVsYXRlZENhcmQiLCJjYWxsVXBvbkNhcmQiLCJfc3BhY2VJRCIsIlN0YXJ0RGljZVJvbGwiLCJTZW5kaW5nRGF0YSIsImlzQm90IiwiY29tcGxldGVDYXJkVHVybiIsIkFsbFBsYXllcnNHYW1lQ29tcGxldGVkIiwiQ2FsbEdhbWVDb21wbGV0ZSIsIl9pc0JvdCIsIl9mb3JjZUdhbWVPdmVyIiwiX3BsYXllckluZGV4IiwiX2Nhc2giLCJITUFtb3VudCIsIkdldF9HYW1lTWFuYWdlciIsIkJNQW1vdW50IiwiQk1Mb2NhdGlvbnMiLCJsb2FuQW1vdW50IiwiX2dvbGQiLCJfc3RvY2tzIiwiX2RpY2VSYW5kb20iLCJPbmNlT3JTaGFyZSIsIkdvbGRDYXNoIiwiU3RvY2tDYXNoIiwiQk1DYXNoIiwiSE1DYXNoIiwiVG90YWxBc3NldHMiLCJSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlIiwiUmFpc2VFdmVudFRvU3luY0dhbWVDb21wbGV0ZURhdGEiLCJTeW5jR2FtZU92ZXIiLCJfVUlEIiwiaW5mb1RleHQiLCJzdGF0dXNUZXh0IiwiRGlzY29ubmVjdERhdGEiLCJTaG93UmVzdWx0U2NyZWVuIiwiX2N1cnJlbnRDYXNoIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJTdHVkZW50RGF0YSIsImdhbWVDYXNoIiwiX3RvdGFsIiwidG9TdHJpbmciLCJfd29uIiwiZ2FtZXNXb24iLCJVcGRhdGVVc2VyRGF0YSIsIlN5bmNHYW1lQ29tcGxldGVEYXRhIiwiQm90IiwiWm9vbUNhbWVyYU91dE9ubHkiLCJtYXgiLCJTZWxlY3RlZEluZCIsIlNlc3Npb25EYXRhIiwiX3ZhbHVlIiwidHJhY2UiLCJwbGF5ZXJjb21wbGV0ZWQiLCJab29tQ2FtZXJhT3V0IiwiVHdlZW5QbGF5ZXIiLCJtaW4iLCJmbG9vciIsImlzWm9vbSIsInRpbWUiLCJ0d2VlbiIsInRvIiwidjIiLCJlYXNpbmciLCJjYWxsIiwiWm9vbUNhbWVyYUluIiwic3RhcnQiLCJDaGVja1BheURheUNvbmRpdGlvbnMiLCJQcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbiIsIlRvUG9zIiwic3BlZWQiLCJfbmV3cG9zIiwiVG9nZ2xlUGF5RGF5IiwiX3N0MSIsIl9TdDIiLCJJbmNyZWFzZURvdWJsZVBheURheSIsIkV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsImFtb3VudCIsIl9sb2NhdGlvbk5hbWUiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIlNldEJ1c2luZXNzSW5kZXgiLCJTZXRDYXJkRnVuY3Rpb25hbGl0eSIsIlNldEdpdmVuQ2FzaCIsIlNldFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIlJlc2V0RWRpdEJveCIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsImRlc3Ryb3kiLCJVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJfU2hhcmVBbW91bnQiLCJfaXNBZGRpbmciLCJfc3RvY2siLCJfaXNEb3VibGVQYXlEYXkiLCJfZm9yU2VsZWN0ZWRCdXNpbmVzcyIsIl9TZWxlY3RlZEJ1c2luZXNzSW5kZXgiLCJIQkFtb3VudCIsIl90aXRsZSIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJfYW1vdW50IiwiX3VJRCIsIklEIiwiUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9pRCIsIl9teUluZGV4IiwiVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4iLCJUb2dnbGVIYWxmUGF5TmV4dFR1cm4iLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJSZXR1cm5UdXJuUHJvZ3Jlc3MiLCJMb3NlQWxsTWFya2V0aW5nTW9uZXkiLCJfbG9zZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfbXVsdGlwbGllciIsIl9hbW91bnRJbmNyZWFzZWQiLCJHZXRNYXJrZXRpbmdNb25leSIsIl9wcm9maXQiLCJHZXRWb2NhYnVsYXJ5UXVlc3Rpb25zSW5kZXgiLCJQb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfVm9jYWJ1bGFyeSIsIkdldEVzdGFibGlzaG1lbnRRdWVzdGlvbnNJbmRleCIsIlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Fc3RhYmxpc2htZW50IiwiVm9jQXJyYXkiLCJFc3RBcnJheSIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiX3F1ZXN0aW9uUmVmIiwiR2V0X1F1ZXN0aW9uc0RhdGEiLCJfdXNlcklEIiwiVXNlcklEIiwiX3F1ZXN0aW9uSW5kZXgiLCJRdWVzdGlvbiIsIlVzZXJJbmRleCIsIl9pc1ZvYyIsIklzVm9jIiwiX2dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX1FkYXRhIiwiQ29ycmVjdE9wdGlvbiIsIl9tZXNzYWdlIiwiT3B0aW9uMSIsIk9wdGlvbjIiLCJPcHRpb24zIiwiT3B0aW9uNCIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJfaXNUdXJuT3ZlciIsIl9teURhdGEiLCJfcm9vbURhdGEiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9TZWxlY3RPcHRpb25fT25lUXVlc3Rpb24iLCJldmVudCIsIl9zZWxlY3Rpb24iLCJjdXJyZW50VGFyZ2V0Iiwic3BsaXQiLCJSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJTZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJTZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIlJlY2VpdmVFdmVudF9TZWxlY3RQbGF5ZXJGb3JQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfb3duSUQiLCJfcGxheWVyTmFtZSIsIlVzZXJOYW1lIiwiX3BsYXllcklEIiwiT3duUGxheWVySUQiLCJfaGFzRG9uZVBheW1lbnQiLCJfaGFzQW5zd2VyZWRRdWVzdGlvbiIsIl9Vc2VySUQiLCJQYXltZW50RG9uZSIsIlF1ZXN0aW9uQW5zd2VyZWQiLCJRdWVzdGlvbkluZGV4IiwiRGVkdWN0Q2FzaF9DYXJkRnVuY3Rpb25hbGl0eSIsIkFkZENhc2hfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfSUQiLCJfbXNnIiwibXNnIiwibW9kZSIsIlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uIiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9zZWxlY3RlZFBsYXllckluZGV4IiwiX2FjdG9yc0RhdGEiLCJSZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkiLCJfc3BhY2VzIiwiYmFja3NwYWNlcyIsIkNvdW50ZXIiLCJUd2VlblBsYXllcl9Hb0JhY2tTcGFjZXMiLCJHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLEdBQUcsS0FBZDtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFD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QixFQUFvRXlDLE1BQXBFO0FBQ0EsU0FBS21KLGdCQUFMO0FBQ0QsR0FsakZ3QixDQW9qRnpCO0FBQ0E7O0FBcmpGeUIsQ0FBVCxDQUFsQixFQXVqRkE7O0FBQ0FrTSxNQUFNLENBQUNDLE9BQVAsR0FBaUJwWixXQUFqQixFQUNBIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX2lzVGVzdCA9IGZhbHNlO1xyXG52YXIgX2RpY2VpbnB1dDEgPSBcIlwiO1xyXG52YXIgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDEgPSAtMTtcclxudmFyIFByZXZpb3VzRGljZVJvbGwyID0gLTE7XHJcblxyXG52YXIgUHJldmlvdXNEaWNlUm9sbDMgPSAtMTtcclxudmFyIFByZXZpb3VzRGljZVJvbGw0ID0gLTE7XHJcblxyXG52YXIgUHJldmlvdXNEaWNlUm9sbDUgPSAtMTtcclxuXHJcbnZhciB1c2VyR2FtZU92ZXIgPSBmYWxzZTtcclxudmFyIEJvdEdhbWVPdmVyID0gZmFsc2U7XHJcbnZhciBUb3RhbENvdW50ZXJSZWFjaGVkID0gZmFsc2U7XHJcbnZhciBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxudmFyIERvdWJsZVBheURheUNvdW50ZXIgPSAwO1xyXG52YXIgTm9DYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG52YXIgUGxheWVyTGVmdCA9IGZhbHNlO1xyXG52YXIgRm9yY2VDaGFuZ2VUaW1lT3V0ID0gbnVsbDtcclxudmFyIEdhbWVDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIENvcnJlY3RBbnN3ZXIgPSAwO1xyXG5cclxudmFyIFZvY2FidWxhcnlRdWVzdGlvbnMgPSBbXTtcclxudmFyIEVzdGFibGlzaG1lbnRRdWVzdGlvbnMgPSBbXTtcclxudmFyIFZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyID0gMDtcclxudmFyIEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuXHJcbnZhciBCaWdCdXNpbmVzc0FycmF5ID0gW107XHJcbnZhciBMb3NzZXNBcnJheSA9IFtdO1xyXG52YXIgTWFya2V0aW5nQXJyYXkgPSBbXTtcclxudmFyIFdpbGRDYXJkQXJyYXkgPSBbXTtcclxudmFyIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyID0gMDtcclxudmFyIExvc3Nlc0FycmF5Q291bnRlciA9IDA7XHJcbnZhciBNYXJrZXRpbmdBcnJheUNvdW50ZXIgPSAwO1xyXG52YXIgV2lsZENhcmRBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuLy8jcmVnaW9uIHN1cGVyY2xhc3NlcyBhbmQgZW51bWVyYXRpb25zXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciB0eXBlIG9mIGJ1c2luZXNzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBFbnVtQnVzaW5lc3NUeXBlID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBIb21lQmFzZWQ6IDEsIC8vYSBidXNpbmVzcyB0aGF0IHlvdSBvcGVyYXRlIG91dCBvZiB5b3VyIGhvbWVcclxuICBicmlja0FuZG1vcnRhcjogMiwgLy9hIHN0b3JlIGZyb250IGJ1c2luZXNzXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NJbmZvID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NJbmZvXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZTogXCJCdXNpbmVzc0RhdGFcIixcclxuICAgIEJ1c2luZXNzVHlwZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb2RlXCIsXHJcbiAgICAgIHR5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICAgIGRlZmF1bHQ6IEVudW1CdXNpbmVzc1R5cGUuTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkJ1c2luZXNzIGNhdG9nb3J5IGZvciBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlRGVzY3JpcHRpb246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVHlwZSAoYnkgbmFtZSkgb2YgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc05hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTmFtZSBvZiB0aGUgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIixcclxuICAgIH0sXHJcbiAgICBBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJiYWxhbmNlIG9mIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSXNQYXJ0bmVyc2hpcDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc1BhcnRuZXJzaGlwXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXB3OiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBkb25lIHBhcnRuZXJzaGlwIHdpdGggc29tZW9uZSB3aXRoIGN1cnJlbnQgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVySUQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lcklEXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJJRCBvZiB0aGUgcGFydG5lciB3aXRoIHdob20gcGxheWVyIGhhcyBmb3JtZWQgcGFydG5lcnNoaXBcIixcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXJ0bmVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibmFtZSBvZiB0aGUgcGFydG5lciB3aXRoIHdob20gcGxheWVyIGhhcyBmb3JtZWQgcGFydG5lcnNoaXBcIixcclxuICAgIH0sXHJcbiAgICBMb2NhdGlvbnNOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvY2F0aW9uc05hbWVcIixcclxuICAgICAgdHlwZTogW2NjLlRleHRdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImlmIHBsYXllciBvd25zIGJyaWNrIGFuZCBtb3J0YXIgaGUvc2hlIGNhbiBleHBhbmQgdG8gbmV3IGxvY2F0aW9uXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblRha2VuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5UYWtlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUmVjZWl2ZURvdWJsZVBheURheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZWNlaXZlRG91YmxlUGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIENhcmREYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkRGF0YUZ1bmN0aW9uYWxpdHkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOZXh0VHVybkRvdWJsZVBheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOZXh0VHVybkRvdWJsZVBheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgaXRzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXkgZGF5IG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFNraXBOZXh0VHVybjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTmV4dFR1cm5cIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIHR1cm4gaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHR1cm4gZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcE5leHRQYXlkYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcE5leHRQYXlkYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIHBheWRheSBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFNraXBITU5leHRQYXlkYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcEhNTmV4dFBheWRheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBob21lIGJhc2VkIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFNraXBCTU5leHRQYXlkYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcEJNTmV4dFBheWRheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBicmlja2EgYW5kIG1tb3J0YXIgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgTmV4dFR1cm5IYWxmUGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5leHRUdXJuSGFsZlBheURheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE5leHRUdXJuSGFsZlBheURheUNvdW50ZXI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlclwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIEhhc01hcmtldGluZ0NvbXBhbnk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSGFzTWFya2V0aW5nQ29tcGFueVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdG9ja0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0b2NrSW5mbyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlN0b2NrSW5mb1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWU6IFwiU3RvY2tEYXRhXCIsXHJcbiAgICBCdXNpbmVzc05hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJuYW1lIG9mIHRoZSBidXNpbmVzcyBpbiB3aGljaCBzdG9ja3Mgd2lsbCBiZSBoZWxkXCIsXHJcbiAgICB9LFxyXG4gICAgU2hhcmVBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2hhcmVBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlNoYXJlIGFtb3VudCBvZiB0aGUgc3RvY2tcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yICBQbGF5ZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlBsYXllckRhdGFcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5hbWUgb2YgdGhlIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllclVJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJVSURcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklEIG9mIHRoZSBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBBdmF0YXJJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBdmF0YXJJRFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaWQgcmVmZXJlbmNlIGZvciBwbGF5ZXIgYXZhdGFyIHNlbGVjdGlvblwiLFxyXG4gICAgfSxcclxuICAgIElzQm90OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQm90XCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXB3OiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgY3VycmVudCBwbGF5ZXIgaXMgYm90XCIsXHJcbiAgICB9LFxyXG4gICAgTm9PZkJ1c2luZXNzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzXCIsXHJcbiAgICAgIHR5cGU6IFtCdXNpbmVzc0luZm9dLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk51bWJlciBvZiBidXNpbmVzcyBhIHBsYXllciBjYW4gb3duXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FyZEZ1bmN0aW9uYWxpdHk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FyZEZ1bmN0aW9uYWxpdHlcIixcclxuICAgICAgdHlwZTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY2FyZCBmdW5jdGlvbmFsaXR5IHN0b3JlZCBieSBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWRBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJudW1iZXIgb2YgaG9tZSBiYXNlZCBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgQnJpY2tBbmRNb3J0YXJBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tBbmRNb3J0YXJBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm51bWJlciBvZiBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBSZWNlaXZlRG91YmxlUGF5RGF5QW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlY2VpdmVEb3VibGVQYXlEYXlBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsTG9jYXRpb25zQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsTG9jYXRpb25zQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJudW1iZXIgb2YgbG9jYXRpb25zIG9mIGFsbCBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgTm9PZlN0b2Nrczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja3NcIixcclxuICAgICAgdHlwZTogW1N0b2NrSW5mb10sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTnVtYmVyIG9mIHN0b2NrIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBjYXNoIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgR29sZENvdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdvbGRDb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY291bnQgb2YgZ29sZCBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgU3RvY2tDb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja0NvdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjb3VudCBvZiBzdG9ja3MgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIExvYW5UYWtlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHRha2VuIGxvYW4gZnJvbSBiYW5rIG9yIG5vdFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQW1vdW50IG9mIGxvYW4gdGFrZW4gZnJvbSB0aGUgYmFua1wiLFxyXG4gICAgfSxcclxuICAgIE1hcmtldGluZ0Ftb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYXJrZXRpbmdBbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm1hcmtldGluZyBhbW91bnQgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIExhd3llclN0YXR1czoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMYXd5ZXJTdGF0dXNcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGhpcmVkIGEgbGF3eWVyIG9yIG5vdFwiLFxyXG4gICAgfSxcclxuICAgIElzQmFua3J1cHQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNCYW5rcnVwdFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgYmVlbiBCYW5rcnVwdGVkIG9yIG5vdFwiLFxyXG4gICAgfSxcclxuICAgIEJhbmtydXB0QW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJhbmtydXB0QW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGhvdyBtdWNoIHRpbWUgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcIixcclxuICAgIH0sXHJcbiAgICBTa2lwcGVkTG9hblBheW1lbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcHBlZExvYW5QYXltZW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBza2lwcGVkIGxvYW4gcGF5bWVudFwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllclJvbGxDb3VudGVyOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclJvbGxDb3VudGVyXCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHRvIHN0b3JlIHJvbGwgY291bnRvciBmb3IgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgSW5pdGlhbENvdW50ZXJBc3NpZ25lZDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJbml0aWFsQ291bnRlckFzc2lnbmVkXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgaXNHYW1lRmluaXNoZWQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiaXNHYW1lRmluaXNoZWRcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbFNjb3JlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsU2NvcmVcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsSEJDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsSEJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEJNQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEJNQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxHb2xkQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEdvbGRDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbExvYW5CYWxhbmNlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsTG9hbkJhbGFuY2VcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsU3RvY2tzQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbFN0b2Nrc0Nhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEdhbWVPdmVyOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdhbWVPdmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSXNBY3RpdmU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNBY3RpdmVcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIENhbkdpdmVQcm9maXRPblBheURheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYW5HaXZlUHJvZml0T25QYXlEYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBVc2VySURGb3JQcm9maXRQYXlEYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVXNlcklERm9yUHJvZml0UGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIEdhbWUgTWFuYWdlciBDbGFzc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0obWFpbiBjbGFzcykgY2xhc3MgZm9yIEdhbWUgTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUm9sbENvdW50ZXIgPSAwO1xyXG52YXIgRGljZVRlbXAgPSAwO1xyXG52YXIgRGljZVJvbGwgPSAwO1xyXG52YXIgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIFR1cm5DaGVja0FycmF5ID0gW107XHJcbnZhciBCdXNpbmVzc0xvY2F0aW9uTm9kZXMgPSBbXTtcclxuXHJcbnZhciBQYXNzZWRQYXlEYXkgPSBmYWxzZTtcclxudmFyIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG5cclxuLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbnZhciBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxudmFyIF9uZXh0VHVybmhhbGZQYXkgPSBmYWxzZTtcclxudmFyIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxudmFyIF9za2lwTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG52YXIgX3NraXBITU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbnZhciBUdXJuSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxudmFyIEJhY2tzcGFjZXMgPSAzO1xyXG52YXIgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxudmFyIENhcmREaXNwbGF5U2V0VGltb3V0ID0gbnVsbDtcclxuXHJcbnZhciBHYW1lTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkdhbWVNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgcGxheWVyJ3MgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIEJvdEdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgYm90J3MgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBDYW1lcmFOb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgY2FtZXJhXCIsXHJcbiAgICB9LFxyXG4gICAgQWxsUGxheWVyVUk6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIHVpIG9mIGFsbCBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gICAgQWxsUGxheWVyTm9kZXM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIG5vZGUgb2YgYWxsIHBsYXllcnMgaW5zaWRlIGdhbWVwbGF5XCIsXHJcbiAgICB9LFxyXG4gICAgU3RhcnRMb2NhdGlvbk5vZGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBvZiBhdHRheSBvZiBsb2NhdGlvbnNcIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RlZE1vZGU6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImludGVnZXIgcmVmZXJlbmNlIGZvciBnYW1lIG1vZGUgMSBtZWFucyBib3QgYW5kIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIFBsYXllckRhdGE6IFBsYXllckRhdGEsXHJcbiAgICBCdXNpbmVzc0luZm86IEJ1c2luZXNzSW5mbyxcclxuICAgIENhcmREYXRhRnVuY3Rpb25hbGl0eTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgRW51bUJ1c2luZXNzVHlwZTogRW51bUJ1c2luZXNzVHlwZSxcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFNldFBsYXllckxlZnQoX3N0YXRlKSB7XHJcbiAgICBQbGF5ZXJMZWZ0ID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0QWxsVmFyaWFibGVzKCkge1xyXG4gICAgVm9jYWJ1bGFyeVF1ZXN0aW9ucyA9IFtdO1xyXG4gICAgRXN0YWJsaXNobWVudFF1ZXN0aW9ucyA9IFtdO1xyXG4gICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG4gICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG5cclxuICAgIEJpZ0J1c2luZXNzQXJyYXkgPSBbXTtcclxuICAgIExvc3Nlc0FycmF5ID0gW107XHJcbiAgICBNYXJrZXRpbmdBcnJheSA9IFtdO1xyXG4gICAgV2lsZENhcmRBcnJheSA9IFtdO1xyXG4gICAgQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgTG9zc2VzQXJyYXlDb3VudGVyID0gMDtcclxuICAgIE1hcmtldGluZ0FycmF5Q291bnRlciA9IDA7XHJcbiAgICBXaWxkQ2FyZEFycmF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgX2RpY2VpbnB1dDEgPSBcIlwiO1xyXG4gICAgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDEgPSAtMTtcclxuICAgIFByZXZpb3VzRGljZVJvbGwyID0gLTE7XHJcbiAgICBQbGF5ZXJMZWZ0ID0gZmFsc2U7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMyA9IC0xO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDQgPSAtMTtcclxuICAgIF9uZXh0VHVybmhhbGZQYXkgPSBmYWxzZTtcclxuICAgIFByZXZpb3VzRGljZVJvbGw1ID0gLTE7XHJcbiAgICBHYW1lQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICB1c2VyR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgIEJvdEdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICBDb3JyZWN0QW5zd2VyID0gMDtcclxuICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIERpY2VSb2xsID0gMDtcclxuICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcbiAgICBGb3JjZUNoYW5nZVRpbWVPdXQgPSBudWxsO1xyXG4gICAgUGFzc2VkUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG4gICAgX3NraXBITU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG4gICAgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxuICAgIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICBUdXJuSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxuICAgIEJhY2tzcGFjZXMgPSAzO1xyXG4gICAgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxuICAgIENhcmREaXNwbGF5U2V0VGltb3V0ID0gbnVsbDtcclxuICAgIFRvdGFsQ291bnRlclJlYWNoZWQgPSBmYWxzZTtcclxuICAgIE5vQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBJbnB1dFRlc3REaWNlMShfdmFsKSB7XHJcbiAgICBpZiAoX2lzVGVzdCkge1xyXG4gICAgICBfZGljZWlucHV0MSA9IF92YWw7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5wdXRUZXN0RGljZTIoX3ZhbCkge1xyXG4gICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgX2RpY2VpbnB1dDIgPSBfdmFsO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBBbGwgRnVuY3Rpb25zIG9mIEdhbWVNYW5hZ2VyXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgY2xhc3MgaXMgY3JlYXRlZFxyXG4gICAqKi9cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsVmFyaWFibGVzKCk7XHJcbiAgICB0aGlzLlJlc2V0UGF5RGF5KCk7XHJcbiAgICBHYW1lTWFuYWdlci5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB0aGlzLlR1cm5OdW1iZXIgPSAwO1xyXG4gICAgdGhpcy5UdXJuQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuU2VsZWN0ZWRNb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIHRoaXMuSW5pdF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4ID0gMDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0UGF5RGF5KCkge1xyXG4gICAgY29uc29sZS5sb2coXCJyZXNldGluZyBwYXlkYXlcIik7XHJcbiAgICBfc2tpcE5leHRQYXlkYXkgPSBmYWxzZTtcclxuICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gZmFsc2U7XHJcbiAgICBfc2tpcEJNTmV4dFBheWRheSA9IGZhbHNlO1xyXG4gICAgUGFzc2VkUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxuICAgIF9uZXh0VHVybmhhbGZQYXkgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcmVmZXJlbmNlIG9mIHJlcXVpcmVkIGNsYXNzZXNcclxuICAgKiovXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBpbml0aWFsIGdhbWVtYW5hZ2VyIGVzc2V0aWFsc1xyXG4gICAqKi9cclxuICBJbml0X0dhbWVNYW5hZ2VyKCkge1xyXG4gICAgdGhpcy5DYW1lcmEgPSB0aGlzLkNhbWVyYU5vZGUuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSk7XHJcbiAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mbyA9IFtdO1xyXG4gICAgUm9sbENvdW50ZXIgPSAwO1xyXG4gICAgRGljZVRlbXAgPSAwO1xyXG4gICAgRGljZVJvbGwgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIC8vaWYgam9pbmVkIHBsYXllciBpcyBzcGVjdGF0ZVxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzdGF0dXMgb2YgaW5pdGlhbCBidXNpbmVzcyBzZXRwOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpKTtcclxuXHJcbiAgICAgICAgLy9pZiBpbml0YWwgc2V0dXAgaGFzIGJlZW4gZG9uZSBhbmQgZ2FtZSBpcyB1bmRlciB3YXlcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgdmFyIEFsbERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gQWxsRGF0YTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgIHRoaXMuVHVybk51bWJlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIpO1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSwgdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAvL3RoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSA4O1xyXG4gICAgICAgICAgLy90aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSwgZmFsc2UsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgYm90IGFsb25nIHdpdGggb25lIHBsYXllclxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jcmVnaW9uIHB1YmxpYyBmdW5jdGlvbnMgdG8gZ2V0IGRhdGEgKGFjY2Vzc2libGUgZnJvbSBvdGhlciBjbGFzc2VzKVxyXG4gIEdldFR1cm5OdW1iZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5UdXJuTnVtYmVyO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZ2V0IG15IGluZGV4IGluIGFycmF5IG9mIFBsYXllckdhbWVJbmZvIFxyXG4gICAqKi9cclxuICBHZXRNeUluZGV4KCkge1xyXG4gICAgdmFyIG15SW5kZXggPSAwO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9hbGxBY3RvcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWxsQWN0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX2FjdG9yLlBsYXllclVJRCA9PSBfYWxsQWN0b3JzW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICBteUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbXlJbmRleDtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU3BlY3RhdGVNb2RlIENvZGVcclxuXHJcbiAgU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCkge1xyXG4gICAgdmFyIEFsbERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gQWxsRGF0YTtcclxuICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInN5bmNpbmcgYWxsIGRhdGEgZm9yIHNwZWN0YXRlXCIpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlciA+IDAgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCA9PSB0cnVlICYmICF0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCwgX3RvUG9zLnkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZyBwb3MxXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNvdW50ZXI6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5pdGlhbCBDb3VudGVyIEFzc2lnbmVkOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBmaW5pc2hlZCA6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICB2YXIgX2xhc3RJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGggLSAxO1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtfbGFzdEluZGV4XS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2xhc3RJbmRleF0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsIF90b1Bvcy55KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNldHRpbmcgcG9zMlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5sb2coXCJzeW5jZWQgcGxheWVybm9kZXNcIik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKSB7XHJcbiAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID09IFRvdGFsQ29ubmVjdGVkUGxheWVycykge1xyXG4gICAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInJlc2V0aW5nIGZvciBzcGVjdGF0ZVwiKTtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgVHVybiBpcyBjYWxsZWQgYnk6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBmdW5jdGlvbnMgcmVsYXRlZCB0byBUdXJuIE1lY2hhbmlzbSBhbmQgY2FyZCBtZWNoYW5pc21cclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHdoYXQgY2FyZCBoYXMgYmVlbiBzZWxlY3RlZCBieSBwbGF5ZXJcclxuICAgKiovXHJcbiAgUmFpc2VFdmVudEZvckNhcmQoX2RhdGEpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNSwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIENsZWFyRGlzcGxheVRpbWVvdXQoKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gIH0sXHJcblxyXG4gIERpc3BsYXlDYXJkT25PdGhlcnMoKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgY29uc29sZS5sb2coXCJjYXJkIGV2ZW50IHJlY2VpdmVkOiBcIiArIENhcmRFdmVudFJlY2VpdmVkKTtcclxuICAgICAgaWYgKENhcmRFdmVudFJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcih0aGlzLkNhcmRDb3VudGVyKTtcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5DYXJkRGlzcGxheWVkKSB7XHJcbiAgICAgICAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuQ2FyZENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsIHRoaXMuUmFuZG9tQ2FyZEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgQ2FyZERpc3BsYXlTZXRUaW1vdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIC8vY2hlY2sgYWZ0ZXIgZXZlcnkgMC41IHNlY29uZHNcclxuICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRDYXJkRGlzcGxheSgpIHtcclxuICAgIHRoaXMuQ2FyZERpc3BsYXllZCA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpIHtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNhcmQgRGF0YSBSZWNlaXZlZDpcIik7XHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcblxyXG4gICAgdmFyIFJhbmRvbUNhcmQgPSBfZGF0YS5yYW5kb21DYXJkO1xyXG4gICAgdmFyIGNvdW50ZXIgPSBfZGF0YS5jb3VudGVyO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4ID0gUmFuZG9tQ2FyZDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXIgPSBjb3VudGVyO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKHRydWUsIFJhbmRvbUNhcmQpO1xyXG4gICAgICBlbHNlIENhcmRFdmVudFJlY2VpdmVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZSh0cnVlLCBSYW5kb21DYXJkKTtcclxuICAgICAgZWxzZSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZShmYWxzZSwgUmFuZG9tQ2FyZCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHBhcnRpY3VsYXIgcGxheWVyIGhhcyBjb21wbGV0ZSB0aGVpciBtb3ZlXHJcbiAgICoqL1xyXG4gIFJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJyYWlzZWQgZm9yIHR1cm4gY29tcGxldGVcIik7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0FsbERhdGEoKSB7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIiwgdGhpcy5QbGF5ZXJHYW1lSW5mbywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVtb3ZlRnJvbUNoZWNrQXJyYXkoX3VpZCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdmFyIF9pbmQgPSAtMTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBUdXJuQ2hlY2tBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoVHVybkNoZWNrQXJyYXlbaW5kZXhdID09IF91aWQpIF9pbmQgPSBpbmRleDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9pbmQgIT0gLTEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlbW92aW5nIGZyb20gdHVybiBjaGVjayBhcnJheVwiKTtcclxuICAgICAgICBUdXJuQ2hlY2tBcnJheS5zcGxpY2UoX2luZCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDaGVja1R1cm5Db21wbGV0ZSgpIHtcclxuICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnMgPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGorKykge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tqXS5Jc0FjdGl2ZSkgVG90YWxDb25uZWN0ZWRQbGF5ZXJzKys7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJUdXJuIENoZWNrOiBcIiArIFR1cm5DaGVja0FycmF5Lmxlbmd0aCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlRvdGFsIENvbm5lY3RlZCBQbGF5ZXJzOiBcIiArIFRvdGFsQ29ubmVjdGVkUGxheWVycyk7XHJcbiAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheSk7XHJcblxyXG4gICAgaWYgKFR1cm5DaGVja0FycmF5Lmxlbmd0aCA+PSBUb3RhbENvbm5lY3RlZFBsYXllcnMpIHtcclxuICAgICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgICAgdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgICAgLy90aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBvbiBhbGwgcGxheWVycyB0byB2YWxpZGF0ZSBpZiBtb3ZlIGlzIGNvbXBsZXRlZCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHNcclxuICAgKiovXHJcbiAgUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlKF91aWQpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKFR1cm5DaGVja0FycmF5Lmxlbmd0aCA9PSAwKSBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpO1xyXG5cclxuICAgICAgICB2YXIgQXJyYXlMZW5ndGggPSBUdXJuQ2hlY2tBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIElERm91bmQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQXJyYXlMZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChUdXJuQ2hlY2tBcnJheVtpbmRleF0gPT0gX3VpZCkgSURGb3VuZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIUlERm91bmQpIHtcclxuICAgICAgICAgIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkNoZWNrVHVybkNvbXBsZXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBkaWNlIGFuaW1hdGlvbiBpcyBwbGF5ZWQgb24gYWxsIHBsYXllcnNcclxuICAgKiovXHJcbiAgQ2hhbmdlVHVybigpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHRoaXMuU3luY0FsbERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5UdXJuTnVtYmVyIDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB0aGlzLlR1cm5OdW1iZXIgPSB0aGlzLlR1cm5OdW1iZXIgKyAxO1xyXG4gICAgZWxzZSB0aGlzLlR1cm5OdW1iZXIgPSAwO1xyXG5cclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMiwgdGhpcy5UdXJuTnVtYmVyKTtcclxuICB9LFxyXG5cclxuICBSZXNldFNvbWVWYWx1ZXMoKSB7XHJcbiAgICAvL1R1cm5DaGVja0FycmF5ID0gW107XHJcbiAgICAvL3RoaXMuVHVybkNvbXBsZXRlZCA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlVHVybkZvcmNlZnVsbHkoKSB7XHJcbiAgICBpZiAoSXNUd2VlbmluZykge1xyXG4gICAgICBjbGVhclRpbWVvdXQoRm9yY2VDaGFuZ2VUaW1lT3V0KTtcclxuICAgICAgRm9yY2VDaGFuZ2VUaW1lT3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VUdXJuRm9yY2VmdWxseSgpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChGb3JjZUNoYW5nZVRpbWVPdXQpO1xyXG4gICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBVcGRhdGVWaXN1YWxEYXRhKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIGZyb20gcmFpc2Ugb24gZXZlbnQgKGZyb20gZnVuY3Rpb24gXCJTdGFydFR1cm5cIiBhbmQgXCJDaGFuZ2VUdXJuXCIgb2YgdGhpcyBzYW1lIGNsYXNzKSB0byBoYW5kbGUgdHVyblxyXG4gICAqKi9cclxuICBUdXJuSGFuZGxlcihfdHVybikge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdmFyIF9pc01hc3RlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCk7XHJcbiAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1tfdHVybl0uSXNBY3RpdmUpIHtcclxuICAgICAgICBpZiAoX2lzTWFzdGVyKSB7XHJcbiAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vdGhpcy5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICB0aGlzLlVwZGF0ZVZpc3VhbERhdGEoKTtcclxuICAgIGNvbnNvbGUubG9nKFwiVHVybjogXCIgKyBfdHVybik7XHJcbiAgICB2YXIgX3BsYXllck1hdGNoZWQgPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxuICAgIGlmIChJc1R3ZWVuaW5nKSB7XHJcbiAgICAgIC8vY2hlY2sgaWYgYW5pbWF0aW9uIG9mIHR1cm4gYmVpbmcgcGxheWVkIG9uIG90aGVyIHBsYXllcnNcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICB0aGlzLlR1cm5IYW5kbGVyKF90dXJuKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDgwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlR1cm5OdW1iZXIgPSBfdHVybjtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgX3NraXBOZXh0VHVybiA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codXNlckdhbWVPdmVyKTtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgIGlmICghdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IC8vdHVybiBkZWNpc2lvbnMgZm9yIGJvdFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgX3NraXBOZXh0VHVybiA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICBpZiAoIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJvbGxEaWNlKCk7XHJcbiAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLCB0aGlzLlR1cm5OdW1iZXIsIHRydWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVHVybiBPZjogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGxQbGF5ZXJVSVt0aGlzLlR1cm5OdW1iZXJdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vc2tpcCB0aGlzIHR1cm4gYXMgc2tpcCB0dXJuIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmVcclxuICAgICAgaWYgKF9wbGF5ZXJNYXRjaGVkICYmIF9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIGN1cnJlbnQgdHVyblwiLCAxMjAwKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVNraXBOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9wbGF5ZXJNYXRjaGVkICYmIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuVXBkYXRlVUlEYXRhKCk7XHJcbiAgfSxcclxuXHJcbiAgU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9pbmQpIHtcclxuICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICB2YXIgTXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgdmFyIF9jb3VudGVyID0gX2luZDtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAvLyAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uSXNBY3RpdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoX2NvdW50ZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwic3luY2VkIERhdGE6XCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQgPT0gTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0gPSBNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcblxyXG4gICAgICAgICAgaWYgKF9jb3VudGVyIDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN5bmNlZCBEYXRhOlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBhbGwgcGxheWVycyBoYXZlIGRvbmUgdGhlaXIgaW5pdGlhbCBzZXR1cCBhbmQgZmlyc3QgdHVybiBzdGFydHNcclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTdGFydFR1cm4oKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICB0aGlzLlR1cm5OdW1iZXIgPSAwOyAvL3Jlc2V0aW5nIHRoZSB0dXJuIG51bWJlciBvbiBzdGFydCBvZiB0aGUgZ2FtZVxyXG5cclxuICAgIC8vc2VuZGluZyBpbml0aWFsIHR1cm4gbnVtYmVyIG92ZXIgdGhlIG5ldHdvcmsgdG8gc3RhcnQgdHVybiBzaW11bHRhbm91c2x5IG9uIGFsbCBjb25uZWN0ZWQgcGxheWVyJ3MgZGV2aWNlc1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVCYW5rcnVwdERhdGEoX2RhdGEpIHtcclxuICAgIC8vb3RoZXIgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcclxuICAgIHZhciBfaXNCYW5rcnVwdGVkID0gX2RhdGEuRGF0YS5iYW5rcnVwdGVkO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS50dXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhTWFpbjtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhfaXNCYW5rcnVwdGVkKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF90dXJuKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF9wbGF5ZXJEYXRhKTtcclxuXHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW190dXJuXSA9IF9wbGF5ZXJEYXRhO1xyXG5cclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuXHJcbiAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIHRoaXMuVHVybk51bWJlciwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKSB7XHJcbiAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSh0cnVlKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXModHJ1ZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB9LCAxMDAwKTtcclxuXHJcbiAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIHRoaXMuVHVybk51bWJlciwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBGdW5jdGlvbiBmb3IgZ2FtZXBsYXlcclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcGxheWVyIFVJIChuYW1lL2ljb25zL251bWJlciBvZiBwbGF5ZXJzIHRoYXQgdG8gYmUgYWN0aXZlIGV0YylcclxuICAgIEBtZXRob2QgQXNzaWduUGxheWVyR2FtZVVJXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi9cclxuICBBc3NpZ25QbGF5ZXJHYW1lVUkoX2lzQmFua3J1cHRlZCA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgaWYgKCFfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgdmFyIF9yYW5kb21JbmRleCA9IHRoaXMuZ2V0UmFuZG9tKDAsIHRoaXMuQm90R2FtZUluZm8ubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvLnB1c2godGhpcy5Cb3RHYW1lSW5mb1tfcmFuZG9tSW5kZXhdKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSAyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5QbGF5ZXJJbmZvID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlNldEF2YXRhcih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCk7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUdhbWVVSShfdG9nZ2xlSGlnaGxpZ2h0LCBfaW5kZXgpIHtcclxuICAgIGlmIChfdG9nZ2xlSGlnaGxpZ2h0KSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbX2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5QbGF5ZXJJbmZvID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfaW5kZXhdO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfaW5kZXggPT0gaW5kZXgpIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5Ub2dnbGVUZXh0aWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGVuYmFsZSByZXNwZWN0aXZlIHBsYXllcnMgbm9kZXMgaW5zaWRlIGdhbWFwbGF5XHJcbiAgICBAbWV0aG9kIEVuYWJsZVBsYXllck5vZGVzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi9cclxuICBFbmFibGVQbGF5ZXJOb2RlcyhfaXNCYW5rcnVwdGVkID0gZmFsc2UpIHtcclxuICAgIGlmICghX2lzQmFua3J1cHRlZCkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSG9tZUJhc2VkQW1vdW50ID09IDEgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLngsIHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50ID09IDEgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLngsIHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLnkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkhvbWVCYXNlZEFtb3VudCA9PSAxKSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ccmlja0FuZE1vcnRhckFtb3VudCA9PSAxKSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5BdmF0YXJTcHJpdGVzW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEXTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKCkge1xyXG4gICAgbGV0IHRhcmdldFBvcyA9IHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLCAxMjApKTtcclxuICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IHRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuXHJcbiAgICBsZXQgcmF0aW8gPSB0YXJnZXRQb3MueSAvIGNjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMjtcclxuICB9LFxyXG5cclxuICBsYXRlVXBkYXRlKCkge1xyXG4gICAgaWYgKHRoaXMuaXNDYW1lcmFab29taW5nKSB0aGlzLlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKTtcclxuICB9LFxyXG5cclxuICBzeW5jRGljZVJvbGwoX3JvbGwpIHtcclxuICAgIHZhciBfZGljZTEgPSBfcm9sbC5kaWNlMTtcclxuICAgIHZhciBfZGljZTIgPSBfcm9sbC5kaWNlMjtcclxuICAgIHZhciBfcmVzdWx0ID0gX2RpY2UxICsgX2RpY2UyO1xyXG5cclxuICAgIElzVHdlZW5pbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPT0gMCAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICBSb2xsQ291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICBSb2xsQ291bnRlciA9IDE0O1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID09IDEzKSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgKyAyMjtcclxuICAgICAgZWxzZSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgKyAxO1xyXG5cclxuICAgICAgUm9sbENvdW50ZXIgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIgLSAxKTtcclxuICAgIH1cclxuXHJcbiAgICBEaWNlUm9sbCA9IF9yZXN1bHQ7XHJcbiAgICBEaWNlVGVtcCA9IDA7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKERpY2VSb2xsKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHRoaXMuVHVybk51bWJlciA9PSBpbmRleCkge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uZ2V0Q29tcG9uZW50KFwiRGljZUNvbnRyb2xsZXJcIikuQW5pbWF0ZURpY2UoX2RpY2UxLCBfZGljZTIpO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5VcGRhdGVVSURhdGEoKTtcclxuICAgIC8vIGxldCB0YXJnZXRQb3M9dGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsMTIwKSk7XHJcbiAgICAvLyB2YXIgX3Bvcz10aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgICAvLyB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsdHJ1ZSwwLjQpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVVJRGF0YSgpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIERpY2VGdW50aW9uYWxpdHkoKSB7XHJcbiAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsIDEyMCkpO1xyXG4gICAgdmFyIF9wb3MgPSB0aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgICB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsIHRydWUsIDAuNCk7XHJcbiAgfSxcclxuXHJcbiAgVGVtcENoZWNrU3BhY2UoX3JvbGxpbmcpIHtcclxuICAgIHZhciB0ZW1wY291bnRlciA9IDA7XHJcbiAgICB2YXIgdGVtcGNvdW50ZXIyID0gMDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJwbGF5ZXIgbWF0Y2hlZDpcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgdGVtcGNvdW50ZXIyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRlbXBjb3VudGVyMiAtIDEgPCAwKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJzdGFydGluZyBmcm9tIG9ibGl2aW9uXCIpO1xyXG4gICAgICB0ZW1wY291bnRlciA9IHRlbXBjb3VudGVyMiArIF9yb2xsaW5nIC0gMTtcclxuICAgICAgdmFyIGRpY2V0b2JlID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwidG8gYmU6IFwiICsgZGljZXRvYmUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGVtcGNvdW50ZXIgPSB0ZW1wY291bnRlcjIgKyBfcm9sbGluZztcclxuICAgICAgdmFyIGRpY2V0b2JlID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwidG8gYmU6IFwiICsgZGljZXRvYmUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJvbGxEaWNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgdmFyIERpY2UxO1xyXG4gICAgICB2YXIgRGljZTI7XHJcbiAgICAgIGlmIChfaXNUZXN0ICYmIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgIERpY2UxID0gcGFyc2VJbnQoX2RpY2VpbnB1dDEpO1xyXG4gICAgICAgIERpY2UyID0gcGFyc2VJbnQoX2RpY2VpbnB1dDIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSB0cnVlICYmIF9pc1Rlc3QpIHtcclxuICAgICAgICBEaWNlMSA9IDE7XHJcbiAgICAgICAgRGljZTIgPSAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcbiAgICAgICAgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICAgICAgaWYgKFByZXZpb3VzRGljZVJvbGwxID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDIgPT0gRGljZTIpIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgICAgIFByZXZpb3VzRGljZVJvbGwxID0gRGljZTE7XHJcbiAgICAgICAgUHJldmlvdXNEaWNlUm9sbDIgPSBEaWNlMjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdmFyIERpY2UxPTIwO1xyXG4gICAgICAvLyB2YXIgRGljZTI9MTtcclxuXHJcbiAgICAgIERpY2VSb2xsID0gRGljZTEgKyBEaWNlMjtcclxuICAgICAgdmFyIF9uZXdSb2xsID0geyBkaWNlMTogRGljZTEsIGRpY2UyOiBEaWNlMiB9O1xyXG4gICAgICAvL0RpY2VSb2xsPTIzO1xyXG4gICAgICAvL3RoaXMuVGVtcENoZWNrU3BhY2UoRGljZVJvbGwpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImRpY2UgbnVtYmVyOiBcIiArIERpY2VSb2xsICsgXCIsIERpY2UxOlwiICsgRGljZTEgKyBcIiwgRGljZTI6XCIgKyBEaWNlMik7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDMsIF9uZXdSb2xsKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSb2xsT25lRGljZSgpIHtcclxuICAgIHZhciBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIGlmIChQcmV2aW91c0RpY2VSb2xsNSA9PSBEaWNlMSkgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBQcmV2aW91c0RpY2VSb2xsNSA9IERpY2UxO1xyXG5cclxuICAgIHJldHVybiBEaWNlMTtcclxuICB9LFxyXG5cclxuICBSb2xsVHdvRGljZXMoKSB7XHJcbiAgICB2YXIgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuICAgIHZhciBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMyA9PSBEaWNlMSkgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDQgPT0gRGljZTIpIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgUHJldmlvdXNEaWNlUm9sbDMgPSBEaWNlMTtcclxuICAgIFByZXZpb3VzRGljZVJvbGw0ID0gRGljZTI7XHJcblxyXG4gICAgcmV0dXJuIERpY2UxICsgRGljZTI7XHJcbiAgfSxcclxuXHJcbiAgUG9wdWxhdGVEZWNrc0FycmF5KF9pc0JpZ0J1c2luZXNzID0gZmFsc2UsIF9pc0xvc3NlcyA9IGZhbHNlLCBfaXNNYXJrZXRpbmcgPSBmYWxzZSwgX2lzV2lsZENhcmQgPSBmYWxzZSwgX2RhdGEgPSBudWxsKSB7XHJcbiAgICAvLyBCaWdCdXNpbmVzc0FycmF5ID0gW107XHJcbiAgICAvLyBMb3NzZXNBcnJheSA9IFtdO1xyXG4gICAgLy8gTWFya2V0aW5nQXJyYXkgPSBbXTtcclxuICAgIC8vIFdpbGRDYXJkQXJyYXkgPSBbXTtcclxuICAgIC8vIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyID0gMDtcclxuICAgIC8vIExvc3Nlc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAvLyBNYXJrZXRpbmdBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgLy8gV2lsZENhcmRBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgIGlmIChfaXNCaWdCdXNpbmVzcykge1xyXG4gICAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXkgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExXTtcclxuXHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhCaWdCdXNpbmVzc0FycmF5KTtcclxuICAgICAgICBCaWdCdXNpbmVzc0FycmF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBCaWdCdXNpbmVzc0FycmF5LCBMb3NzQXJyYXk6IG51bGwsIE1hcmtldEFycmF5OiBudWxsLCBXaWxkQXJyeWE6IG51bGwgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE5LCBfdGVtcERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9pc0xvc3Nlcykge1xyXG4gICAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgIExvc3Nlc0FycmF5ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNF07XHJcblxyXG4gICAgICAgIExvc3Nlc0FycmF5LnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKExvc3Nlc0FycmF5KTtcclxuICAgICAgICBMb3NzZXNBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogbnVsbCwgTG9zc0FycmF5OiBMb3NzZXNBcnJheSwgTWFya2V0QXJyYXk6IG51bGwsIFdpbGRBcnJ5YTogbnVsbCB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTksIF90ZW1wRGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2lzTWFya2V0aW5nKSB7XHJcbiAgICAgIGlmIChfZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXkgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDEzXTtcclxuXHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXkuc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coTWFya2V0aW5nQXJyYXkpO1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBudWxsLCBMb3NzQXJyYXk6IG51bGwsIE1hcmtldEFycmF5OiBNYXJrZXRpbmdBcnJheSwgV2lsZEFycnlhOiBudWxsIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxOSwgX3RlbXBEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNXaWxkQ2FyZCkge1xyXG4gICAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgIFdpbGRDYXJkQXJyYXkgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xyXG5cclxuICAgICAgICBXaWxkQ2FyZEFycmF5LnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFdpbGRDYXJkQXJyYXkpO1xyXG4gICAgICAgIFdpbGRDYXJkQXJyYXlDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IG51bGwsIExvc3NBcnJheTogbnVsbCwgTWFya2V0QXJyYXk6IG51bGwsIFdpbGRBcnJ5YTogV2lsZENhcmRBcnJheSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTksIF90ZW1wRGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICBpZiAoX2RhdGEuQmlnQXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXkgPSBfZGF0YS5CaWdBcnJheTtcclxuICAgICAgICBjb25zb2xlLmxvZyhCaWdCdXNpbmVzc0FycmF5KTtcclxuICAgICAgICBCaWdCdXNpbmVzc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfZGF0YS5Mb3NzQXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIExvc3Nlc0FycmF5ID0gX2RhdGEuTG9zc0FycmF5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKExvc3Nlc0FycmF5KTtcclxuICAgICAgICBMb3NzZXNBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2RhdGEuTWFya2V0QXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5ID0gX2RhdGEuTWFya2V0QXJyYXk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTWFya2V0aW5nQXJyYXkpO1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfZGF0YS5XaWxkQXJyeWEgIT0gbnVsbCkge1xyXG4gICAgICAgIFdpbGRDYXJkQXJyYXkgPSBfZGF0YS5XaWxkQXJyeWE7XHJcbiAgICAgICAgY29uc29sZS5sb2coV2lsZENhcmRBcnJheSk7XHJcbiAgICAgICAgV2lsZENhcmRBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2V0QmlnQnVzaW5lc3NJbmRleChfaW5kZXgpIHtcclxuICAgIHZhciBfdmFsID0gLTE7XHJcbiAgICBpZiAoQmlnQnVzaW5lc3NBcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChCaWdCdXNpbmVzc0FycmF5Q291bnRlciA8IEJpZ0J1c2luZXNzQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgX3ZhbCA9IEJpZ0J1c2luZXNzQXJyYXlbQmlnQnVzaW5lc3NBcnJheUNvdW50ZXJdO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyKys7XHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IHRydWUsIExvc3NBcnJheTogZmFsc2UsIE1hcmtldEFycmF5OiBmYWxzZSwgV2lsZEFycnlhOiBmYWxzZSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjAsIF90ZW1wRGF0YSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkodHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgbnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0TG9zc2VzSW5kZXgoX2luZGV4KSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKExvc3Nlc0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKExvc3Nlc0FycmF5Q291bnRlciA8IExvc3Nlc0FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBMb3NzZXNBcnJheVtMb3NzZXNBcnJheUNvdW50ZXJdO1xyXG4gICAgICAgIExvc3Nlc0FycmF5Q291bnRlcisrO1xyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBmYWxzZSwgTG9zc0FycmF5OiB0cnVlLCBNYXJrZXRBcnJheTogZmFsc2UsIFdpbGRBcnJ5YTogZmFsc2UgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIwLCBfdGVtcERhdGEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIEdldE1hcmtldGluZ0luZGV4KF9pbmRleCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChNYXJrZXRpbmdBcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChNYXJrZXRpbmdBcnJheUNvdW50ZXIgPCBNYXJrZXRpbmdBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gTWFya2V0aW5nQXJyYXlbTWFya2V0aW5nQXJyYXlDb3VudGVyXTtcclxuICAgICAgICBNYXJrZXRpbmdBcnJheUNvdW50ZXIrKztcclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogZmFsc2UsIExvc3NBcnJheTogZmFsc2UsIE1hcmtldEFycmF5OiB0cnVlLCBXaWxkQXJyeWE6IGZhbHNlIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyMCwgX3RlbXBEYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkoZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3ZhbDtcclxuICB9LFxyXG5cclxuICBHZXRXaWxkQ2FyZEluZGV4KF9pbmRleCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChXaWxkQ2FyZEFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKFdpbGRDYXJkQXJyYXlDb3VudGVyIDwgV2lsZENhcmRBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gV2lsZENhcmRBcnJheVtXaWxkQ2FyZEFycmF5Q291bnRlcl07XHJcbiAgICAgICAgV2lsZENhcmRBcnJheUNvdW50ZXIrKztcclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogZmFsc2UsIExvc3NBcnJheTogZmFsc2UsIE1hcmtldEFycmF5OiBmYWxzZSwgV2lsZEFycnlhOiB0cnVlIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyMCwgX3RlbXBEYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkoZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3ZhbDtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDb3VudGVycyhfZGF0YSA9IG51bGwpIHtcclxuICAgIGlmIChfZGF0YS5CaWdBcnJheSkge1xyXG4gICAgICBCaWdCdXNpbmVzc0FycmF5Q291bnRlcisrO1xyXG4gICAgfVxyXG4gICAgaWYgKF9kYXRhLkxvc3NBcnJheSkge1xyXG4gICAgICBMb3NzZXNBcnJheUNvdW50ZXIrKztcclxuICAgIH1cclxuICAgIGlmIChfZGF0YS5NYXJrZXRBcnJheSkge1xyXG4gICAgICBNYXJrZXRpbmdBcnJheUNvdW50ZXIrKztcclxuICAgIH1cclxuICAgIGlmIChfZGF0YS5XaWxkQXJyeWEpIHtcclxuICAgICAgV2lsZENhcmRBcnJheUNvdW50ZXIrKztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxlY3RSZWxhdGVkQ2FyZChfaXNCaWdCdXNpbmVzcyA9IGZhbHNlLCBfaXNMb3NzZXMgPSBmYWxzZSwgX2lzTWFya2V0aW5nID0gZmFsc2UsIF9pc1dpbGRDYXJkID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNCaWdCdXNpbmVzcykge1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldEJpZ0J1c2luZXNzSW5kZXgoKTtcclxuICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0QmlnQnVzaW5lc3NJbmRleCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRCaWdCdXNpbmVzc0luZGV4KCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0QmlnQnVzaW5lc3NJbmRleCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2lzTG9zc2VzKSB7XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0TG9zc2VzSW5kZXgoKTtcclxuICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0TG9zc2VzSW5kZXgoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0TG9zc2VzSW5kZXgoKTtcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRMb3NzZXNJbmRleCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2lzTWFya2V0aW5nKSB7XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0TWFya2V0aW5nSW5kZXgoKTtcclxuICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0TWFya2V0aW5nSW5kZXgoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0TWFya2V0aW5nSW5kZXgoKTtcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRNYXJrZXRpbmdJbmRleCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2lzV2lsZENhcmQpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRXaWxkQ2FyZEluZGV4KCk7XHJcbiAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLkdldFdpbGRDYXJkSW5kZXgoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0V2lsZENhcmRJbmRleCgpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgaW5kZXggPSB0aGlzLkdldFdpbGRDYXJkSW5kZXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY2FsbFVwb25DYXJkKCkge1xyXG4gICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgIGlmIChSb2xsQ291bnRlciA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICB2YXIgX3NwYWNlSUQgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgICAgaWYgKF9zcGFjZUlEICE9IDYgJiYgX3NwYWNlSUQgIT0gNykge1xyXG4gICAgICAgICAgLy82IG1lYW5zIHBheWRheSBhbmQgNyBtZWFucyBkb3VibGUgcGF5ZGF5LCA5IG1lYW5zIHNlbGwgc3BhY2VcclxuICAgICAgICAgIHZhciBSYW5kb21DYXJkID0gdGhpcy5nZXRSYW5kb20oMCwgMTUpO1xyXG5cclxuICAgICAgICAgIGlmIChfc3BhY2VJRCA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIGJpZyBidXNpbmVzcyBjYXJkc1xyXG4gICAgICAgICAgICBSYW5kb21DYXJkID0gdGhpcy5TZWxlY3RSZWxhdGVkQ2FyZCh0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gMTE7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF9zcGFjZUlEID09IDUpIHtcclxuICAgICAgICAgICAgLy9sYW5kZWQgb24gc29tZSBsb3NzZXMgY2FyZHNcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHRoaXMuU2VsZWN0UmVsYXRlZENhcmQoZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vUmFuZG9tQ2FyZCA9IDE0O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSAzKSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB0aGlzLlNlbGVjdFJlbGF0ZWRDYXJkKGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSAxMDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3NwYWNlSUQgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIHdpbGQgY2FyZHNcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHRoaXMuU2VsZWN0UmVsYXRlZENhcmQoZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIFJhbmRvbUNhcmQgPSA5O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoX3NwYWNlSUQpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIHJlYWwgcGxheWVyXHJcbiAgICAgICAgICAgIGlmIChfc3BhY2VJRCA9PSAxMikge1xyXG4gICAgICAgICAgICAgIC8vIGlmIHBsYXllciBsYW5kZWQgb24gZmluaXNoIHNwYWNlXHJcbiAgICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDU7XHJcbiAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YSA9IHsgcmFuZG9tQ2FyZDogUmFuZG9tQ2FyZCwgY291bnRlcjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICAgICAgaWYgKF9zcGFjZUlEID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgLy8gaWYgcGxheWVyIGxhbmRlZCBvbiBmaW5pc2ggc3BhY2VcclxuICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGEgPSB7IHJhbmRvbUNhcmQ6IFJhbmRvbUNhcmQsIGNvdW50ZXI6IFJvbGxDb3VudGVyIH07XHJcbiAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIEJvdEdhbWVPdmVyKSB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIHVzZXJHYW1lT3ZlcikgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wbGV0ZSB0dXJuIGlzIGNhbGxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKHRydWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBsZXRlQ2FyZFR1cm4oKSB7XHJcbiAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gIH0sXHJcblxyXG4gIENhbGxHYW1lQ29tcGxldGUoX2lzQm90ID0gZmFsc2UsIF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgLy8gaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgIC8vICAgICB0aGlzLlR1cm5OdW1iZXIgPSB0aGlzLkdldE15SW5kZXgoKTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gMDtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicGxheWVyIGlzIG5vdCBhY3RpdmUgcmV0dXJuaW5nXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY2FsY3VsYXRpbmcuLi4uXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJhZ21lIGlzIG5vdCBmaW5pc2hlZFwiKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgdmFyIF9jYXNoID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgICAgICB2YXIgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICB2YXIgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgIHZhciBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICAgIGxvYW5BbW91bnQgKz0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIF9nb2xkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudDtcclxuICAgICAgICAgIHZhciBfc3RvY2tzID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgIHZhciBPbmNlT3JTaGFyZSA9IF9kaWNlUmFuZG9tICogMTAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgR29sZENhc2ggPSBPbmNlT3JTaGFyZSAqIF9nb2xkO1xyXG4gICAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgICB2YXIgQk1DYXNoID0gKEJNQW1vdW50ICsgQk1Mb2NhdGlvbnMpICogMTUwMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBITUNhc2ggPSAwO1xyXG4gICAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMikgSE1DYXNoID0gMjUwMDAgKyA2MDAwMDtcclxuICAgICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDMpIEhNQ2FzaCA9IDI1MDAwICsgMjUwMDAgKyA2MDAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTY29yZSA9IFRvdGFsQXNzZXRzO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsSEJDYXNoID0gSE1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsR29sZENhc2ggPSBHb2xkQ2FzaDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFN0b2Nrc0Nhc2ggPSBTdG9ja0Nhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0pO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0YSBwdXNoZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBfcGxheWVySW5kZXggPSAwOyBfcGxheWVySW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgX3BsYXllckluZGV4KyspIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX2Nhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICB2YXIgSE1BbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICB2YXIgQk1Mb2NhdGlvbnMgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBsb2FuQW1vdW50ICs9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBfZ29sZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ7XHJcbiAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICB2YXIgT25jZU9yU2hhcmUgPSBfZGljZVJhbmRvbSAqIDEwMDA7XHJcblxyXG4gICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgdmFyIEJNQ2FzaCA9IChCTUFtb3VudCArIEJNTG9jYXRpb25zKSAqIDE1MDAwMDtcclxuXHJcbiAgICAgICAgdmFyIEhNQ2FzaCA9IDA7XHJcbiAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDIpIEhNQ2FzaCA9IDI1MDAwICsgNjAwMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMykgSE1DYXNoID0gMjUwMDAgKyAyNTAwMCArIDYwMDAwO1xyXG5cclxuICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU2NvcmUgPSBUb3RhbEFzc2V0cztcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxIQkNhc2ggPSBITUNhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEdvbGRDYXNoID0gR29sZENhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU3RvY2tzQ2FzaCA9IFN0b2NrQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDYsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50VG9TeW5jR2FtZUNvbXBsZXRlRGF0YShfZGF0YSkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNiwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFN5bmNHYW1lT3ZlcihfVUlEKSB7XHJcbiAgICB2YXIgaW5mb1RleHQgPSBcIlwiO1xyXG4gICAgdmFyIHN0YXR1c1RleHQgPSBcIlwiO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGlmICghR2FtZUNvbXBsZXRlZCkge1xyXG4gICAgICAgIEdhbWVDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdERhdGEoKTtcclxuICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgIHZhciBNeURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHtcclxuICAgICAgICAgIHZhciBfaW5kZXggPSAtMTtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAgICAgICBfaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkdhbWUgd29uIGJ5IFwiICsgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCA9PSBfVUlEKSB7XHJcbiAgICAgICAgICAgIC8veW91IHdvblxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJDb25ncmF0cyEgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiO1xyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIF9jdXJyZW50Q2FzaCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoKTtcclxuICAgICAgICAgICAgdmFyIF90b3RhbCA9IF9jdXJyZW50Q2FzaCArIHBhcnNlSW50KE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IF90b3RhbC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIF93b24gPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbik7XHJcbiAgICAgICAgICAgIF93b24gPSBfd29uICsgMTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb24gPSBfd29uLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5VcGRhdGVVc2VyRGF0YSgtMSwgX3dvbiwgLTEpO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJVbmZvcnR1bmF0ZWx5ISB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiO1xyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vd2l0aCBib3RcclxuICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICB2YXIgTXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKE15RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzBdLkdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmIChNeURhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICBzdGF0dXNUZXh0ID0gXCJDb25ncmF0cyEgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiO1xyXG4gICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiT3RoZXIgUGxheWVyIEVhcm5lZCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMV0uVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICB2YXIgX2N1cnJlbnRDYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgICAgIHZhciBfdG90YWwgPSBfY3VycmVudENhc2ggKyBwYXJzZUludChNeURhdGEuVG90YWxTY29yZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2ggPSBfdG90YWwudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgdmFyIF93b24gPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbik7XHJcbiAgICAgICAgX3dvbiA9IF93b24gKyAxO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uID0gX3dvbi50b1N0cmluZygpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKC0xLCBfd29uLCAtMSk7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL3lvdSBsb3NlXHJcblxyXG4gICAgICAgIHN0YXR1c1RleHQgPSBcIlVuZm9ydHVuYXRlbHkhIHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLkNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJPdGhlciBQbGF5ZXIgRWFybmVkIENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1sxXS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN5bmNHYW1lQ29tcGxldGVEYXRhKF9kYXRhKSB7XHJcbiAgICB2YXIgX2lzQm90ID0gX2RhdGEuQm90O1xyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUodHJ1ZSwgZmFsc2UpO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIkdhbWUgb3ZlciwgY2FsY3VsYXRpbmcgdG90YWwgY2FzaC4uLlwiLCAxNTAwLCBmYWxzZSk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dE9ubHkoKTtcclxuXHJcbiAgICAgICAgdmFyIG1heCA9IC0xO1xyXG4gICAgICAgIHZhciBTZWxlY3RlZEluZCA9IDA7XHJcbiAgICAgICAgdmFyIFNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG5cclxuICAgICAgICAgIGlmIChfdmFsdWUgPiBtYXgpIHtcclxuICAgICAgICAgICAgU2VsZWN0ZWRJbmQgPSBpbmRleDtcclxuICAgICAgICAgICAgbWF4ID0gX3ZhbHVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKFNlc3Npb25EYXRhW2luZGV4XS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF92YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLnRyYWNlKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIiArIFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgfSwgMTUwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZShmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiR2FtZSBvdmVyLCBjYWxjdWxhdGluZyB0b3RhbCBjYXNoLi4uXCIsIDE1MDAsIGZhbHNlKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgICAgdmFyIG1heCA9IC0xO1xyXG4gICAgICAgICAgdmFyIFNlbGVjdGVkSW5kID0gMDtcclxuICAgICAgICAgIHZhciBTZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhTZXNzaW9uRGF0YSk7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoX3ZhbHVlID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBTZWxlY3RlZEluZCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gX3ZhbHVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKFNlc3Npb25EYXRhW2luZGV4XS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS50cmFjZShcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIgKyBTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFsbFBsYXllcnNHYW1lQ29tcGxldGVkKF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IEJvdDogX2lzQm90IH07XHJcbiAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhKF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBHYW1lT3ZlcihfZm9yY2VHYW1lT3ZlciA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgIHZhciBwbGF5ZXJjb21wbGV0ZWQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIC8vICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9PSBmYWxzZSB8fCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjb21wbGV0ZWQ6IFwiICsgcGxheWVyY29tcGxldGVkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBnYW1laW5mbyBsZW5ndGg6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpO1xyXG4gICAgICAgIGlmIChwbGF5ZXJjb21wbGV0ZWQgPj0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGggfHwgX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgICAgIC8vZ2FtZSBjb21wbGV0ZWQgb24gYWxsIHN5c3RlbVxyXG4gICAgICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgICBpZiAoX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KSBCb3RHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgIGVsc2UgdXNlckdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwidXNlcmdhbWVvdmVyOiBcIiArIHVzZXJHYW1lT3Zlcik7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYm90Z2FtZW92ZXI6IFwiICsgQm90R2FtZU92ZXIpO1xyXG4gICAgICAvLyB0aGlzLkNhbGxHYW1lQ29tcGxldGUodHJ1ZSk7XHJcbiAgICAgIHZhciBwbGF5ZXJjb21wbGV0ZWQgPSAwO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uaXNHYW1lRmluaXNoZWQpIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGxheWVyY29tcGxldGVkID09IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKSB7XHJcbiAgICAgICAgLy9nYW1lY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1zXHJcbiAgICAgICAgQm90R2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIHVzZXJHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgU3RhcnREaWNlUm9sbDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFJvbGxDb3VudGVyID49IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJHYW1lb3ZlclwiKTtcclxuICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkdhbWVPdmVyKGZhbHNlKTtcclxuICAgICAgfSwgMTUwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICBEaWNlVGVtcCA9IERpY2VUZW1wICsgMTtcclxuICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5Ud2VlblBsYXllcih0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1Bvcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRSYW5kb206IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICB9LFxyXG5cclxuICBUd2VlbkNhbWVyYTogZnVuY3Rpb24gKF9wb3MsIGlzWm9vbSwgdGltZSkge1xyXG4gICAgY2MudHdlZW4odGhpcy5DYW1lcmFOb2RlKVxyXG4gICAgICAudG8odGltZSwgeyBwb3NpdGlvbjogY2MudjIoX3Bvcy54LCBfcG9zLnkpIH0sIHsgZWFzaW5nOiBcInF1YWRJbk91dFwiIH0pXHJcbiAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZiAoaXNab29tKSB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICAgIGVsc2UgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIFpvb21DYW1lcmFJbigpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5DYW1lcmEuem9vbVJhdGlvIDwgMikge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IHRoaXMuQ2FtZXJhLnpvb21SYXRpbyArIDAuMDM7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAyO1xyXG4gICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIENoZWNrUGF5RGF5Q29uZGl0aW9ucyhfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYpIHtcclxuICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSBQYXNzZWRQYXlEYXlDb3VudGVyICsgMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3KSB7XHJcbiAgICAgICAgRG91YmxlUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5O1xyXG4gICAgX25leHRUdXJuaGFsZlBheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkhhbGZQYXlEYXk7XHJcblxyXG4gICAgaWYgKFBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5ICYmICFfbmV4dFR1cm5Eb3VibGVQYXkpIHtcclxuICAgICAgLy90aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgLy90aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UsIF9pc0JvdCk7XHJcbiAgICB9IGVsc2UgaWYgKERvdWJsZVBheURheSB8fCAoUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkpIHtcclxuICAgICAgLy90aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgLy90aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24odHJ1ZSwgX2lzQm90KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgWm9vbUNhbWVyYU91dE9ubHkoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA+PSAxKSB7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSB0aGlzLkNhbWVyYS56b29tUmF0aW8gLSAwLjAzO1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dE9ubHkoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb24gPSBjYy5WZWMyKDAsIDApO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IDE7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICB9LFxyXG5cclxuICBab29tQ2FtZXJhT3V0KCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkNhbWVyYS56b29tUmF0aW8gPj0gMSkge1xyXG4gICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gdGhpcy5DYW1lcmEuem9vbVJhdGlvIC0gMC4wMztcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb24gPSBjYy5WZWMyKDAsIDApO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IDE7XHJcbiAgICAgICAgLy8gSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5QcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24oMCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ICYmICFCb3RHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgJiYgIXVzZXJHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL3JlYWwgcGxheWVyXHJcbiAgICAgICAgICBpZiAoUGxheWVyTGVmdCkge1xyXG4gICAgICAgICAgICAvLyBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFBsYXllckxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnMoKTtcclxuICAgICAgICAgIGVsc2UgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICB9LFxyXG5cclxuICBUd2VlblBsYXllcjogZnVuY3Rpb24gKE5vZGUsIFRvUG9zKSB7XHJcbiAgICB2YXIgc3BlZWQgPSAwLjQ7XHJcbiAgICAvL2lmIChfaXNUZXN0KSBzcGVlZCA9IDAuMDQ7XHJcblxyXG4gICAgY2MudHdlZW4oTm9kZSkgLy8wLjRcclxuICAgICAgLnRvKHNwZWVkLCB7IHBvc2l0aW9uOiBjYy52MihUb1Bvcy54LCBUb1Bvcy55KSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKERpY2VUZW1wIDwgRGljZVJvbGwpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKERpY2VUZW1wICsgXCIgXCIgKyBSb2xsQ291bnRlcik7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpIHtcclxuICAgICAgICAgICAgICBpZiAoIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2IHx8XHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3XHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJvdCBnYW1lIGlzIG92ZXJcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmICghdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2IHx8XHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3XHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLyBjb25zb2xlLmVycm9yKFBhc3NlZFBheURheUNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgZ2FtZSBpcyBvdmVyIHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coUGFzc2VkUGF5RGF5KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYpIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICBEb3VibGVQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIGZpbmlzaGVkIGZvcjogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoUm9sbENvdW50ZXIgPT0gMTMpIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyAyMjtcclxuICAgICAgICAgICAgZWxzZSBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyAxO1xyXG4gICAgICAgICAgICBEaWNlVGVtcCA9IERpY2VSb2xsO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vRGljZVRlbXA9RGljZVRlbXArMTtcclxuICAgICAgICAgIC8vICBjb25zb2xlLmxvZyhEaWNlVGVtcCArIFwiIFwiICsgUm9sbENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgLy90aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBfbmV3cG9zID0gY2MuVmVjMigwLCAwKTtcclxuICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcywgZmFsc2UsIDAuNik7IC8vem9vbW91dFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgLy9ydWxlcyBpbXBsbWVudGF0aW9uIGR1cmluZyB0dXJuICh0dXJuIGRlY2lzaW9ucylcclxuXHJcbiAgVG9nZ2xlUGF5RGF5KF9zdDEsIF9TdDIpIHtcclxuICAgIFBhc3NlZFBheURheSA9IF9zdDE7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfU3QyO1xyXG5cclxuICAgIGlmICghX3N0MSkge1xyXG4gICAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9TdDIpIHtcclxuICAgICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5jcmVhc2VEb3VibGVQYXlEYXkoKSB7XHJcbiAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgfSxcclxuXHJcbiAgRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKGFtb3VudCwgX2luZGV4LCBfbG9jYXRpb25OYW1lLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoIDwgMykge1xyXG4gICAgICBpZiAoIV9pc0NhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCAtIGFtb3VudDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCArIDE7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5wdXNoKF9sb2NhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLCAxMDAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgIH0sIDEyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2ggdG8gZXhwYW5kIHRoaXMgYnVzaW5lc3MsIGNhc2ggbmVlZGVkICQgXCIgKyBhbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX0dpdmVuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIF9HaXZlbkNhc2ggPSBfR2l2ZW5DYXNoIC0gYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ICsgMTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsIDEwMDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIiArIGFtb3VudCArIFwiLCBDYXNoIEdpdmVuICRcIiArIF9HaXZlbkNhc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGxvY2F0aW9uc1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChwYXJzZUludCh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIC8vdGhpcyBtZWFucyB0aGVyZSBpcyBicmljayBhbmQgbW9ydGFyIGluIGxpc3RcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRCdXNpbmVzc0luZGV4KGkpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldENhcmRGdW5jdGlvbmFsaXR5KF9pc0NhcmRGdW5jdGlvbmFsaXR5KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRHaXZlbkNhc2goX0dpdmVuQ2FzaCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlJlc2V0RWRpdEJveCgpO1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhCdXNpbmVzc0xvY2F0aW9uTm9kZXMpO1xyXG4gICAgcmV0dXJuIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7XHJcbiAgfSxcclxuXHJcbiAgRGVzdHJveUdlbmVyYXRlZE5vZGVzKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbihfbmFtZSwgX1NoYXJlQW1vdW50LCBfaXNBZGRpbmcpIHtcclxuICAgIGlmIChfaXNBZGRpbmcpIHtcclxuICAgICAgdmFyIF9zdG9jayA9IG5ldyBTdG9ja0luZm8oKTtcclxuICAgICAgX3N0b2NrLkJ1c2luZXNzTmFtZSA9IF9uYW1lO1xyXG4gICAgICBfc3RvY2suU2hhcmVBbW91bnQgPSBfU2hhcmVBbW91bnQ7XHJcblxyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZlN0b2Nrcy5wdXNoKF9zdG9jayk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfZm9yU2VsZWN0ZWRCdXNpbmVzcyA9IGZhbHNlLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMCwgSEJBbW91bnQgPSAwLCBCTUFtb3VudCA9IDAsIEJNTG9jYXRpb25zID0gMCkge1xyXG4gICAgaWYgKF9mb3JTZWxlY3RlZEJ1c2luZXNzKSB7XHJcbiAgICAgIHZhciBfdGl0bGUgPSBcIlBheURheVwiO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBfaXNCb3QsIF9mb3JTZWxlY3RlZEJ1c2luZXNzLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4LCBIQkFtb3VudCwgQk1BbW91bnQsIEJNTG9jYXRpb25zLCAxLCAwLCBfbmV4dFR1cm5oYWxmUGF5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChEb3VibGVQYXlEYXkgJiYgUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBfc2tpcE5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk7XHJcbiAgICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXk7XHJcbiAgICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk7XHJcblxyXG4gICAgICBpZiAoX3NraXBOZXh0UGF5ZGF5KSB7XHJcbiAgICAgICAgLy9pZiBwcmV2aW91c2x5IHNraXAgcGF5ZGF5IHdhcyBzdG9yZWQgYnkgYW55IGNhcmRcclxuICAgICAgICB0aGlzLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG5cclxuICAgICAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIFBheURheS5cIiwgMTYwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgIH0sIDE2NTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIFBheURheS5cIik7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBfdGl0bGUgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZiAoX2lzRG91YmxlUGF5RGF5KSBfdGl0bGUgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgIGVsc2UgX3RpdGxlID0gXCJQYXlEYXlcIjtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSwgX2lzRG91YmxlUGF5RGF5LCBfc2tpcEhNTmV4dFBheWRheSwgX3NraXBCTU5leHRQYXlkYXksIF9pc0JvdCwgZmFsc2UsIDAsIDAsIDAsIDAsIFBhc3NlZFBheURheUNvdW50ZXIsIERvdWJsZVBheURheUNvdW50ZXIsIF9uZXh0VHVybmhhbGZQYXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQmFua3J1cHRfVHVybkRlY2lzaW9uKCkge1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50ICs9IDE7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCk7XHJcbiAgfSxcclxuXHJcbiAgU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50LCBfdUlEKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgQ2FzaDogX2Ftb3VudCwgSUQ6IF91SUQgfSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMywgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2RhdGEpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IF9kYXRhLkRhdGEuQ2FzaDtcclxuICAgICAgdmFyIF9pRCA9IF9kYXRhLkRhdGEuSUQ7XHJcblxyXG4gICAgICB2YXIgX215SW5kZXggPSB0aGlzLkdldE15SW5kZXgoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5QbGF5ZXJVSUQgPT0gX2lEKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLmlzR2FtZUZpbmlzaGVkID09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlRvdGFsU2NvcmUgKz0gX2Ftb3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgcmVjZWl2ZWQgcHJvZml0IG9mICRcIiArIF9hbW91bnQgKyBcIiBmcm9tIG90aGVyIHBsYXllci5cIiwgMjgwMCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBDYXJkcyBSdWxlc1xyXG4gIFRvZ2dsZURvdWJsZVBheU5leHRUdXJuKF9zdGF0ZSkge1xyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5ID0gX25leHRUdXJuRG91YmxlUGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUhhbGZQYXlOZXh0VHVybihfc3RhdGUpIHtcclxuICAgIF9uZXh0VHVybmhhbGZQYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5IYWxmUGF5RGF5ID0gX25leHRUdXJuaGFsZlBheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwTmV4dFR1cm4oX3N0YXRlKSB7XHJcbiAgICBfc2tpcE5leHRUdXJuID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybiA9IF9za2lwTmV4dFR1cm47XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpIHtcclxuICAgIF9za2lwTmV4dFBheWRheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheSA9IF9za2lwTmV4dFBheWRheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpIHtcclxuICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXkgPSBfc2tpcEhNTmV4dFBheWRheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKF9zdGF0ZSkge1xyXG4gICAgX3NraXBCTU5leHRQYXlkYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheSA9IF9za2lwQk1OZXh0UGF5ZGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVR1cm5Qcm9ncmVzcyhfc3RhdGUpIHtcclxuICAgIFR1cm5JblByb2dyZXNzID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFJldHVyblR1cm5Qcm9ncmVzcygpIHtcclxuICAgIHJldHVybiBUdXJuSW5Qcm9ncmVzcztcclxuICB9LFxyXG5cclxuICBMb3NlQWxsTWFya2V0aW5nTW9uZXkoKSB7XHJcbiAgICB2YXIgX2xvc2VBbW91bnQgPSAtMTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID4gMCkge1xyXG4gICAgICBfbG9zZUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX2xvc2VBbW91bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfbG9zZUFtb3VudDtcclxuICB9LFxyXG5cclxuICBNdWx0aXBseU1hcmtldGluZ01vbmV5KF9tdWx0aXBsaWVyKSB7XHJcbiAgICB2YXIgX2Ftb3VudEluY3JlYXNlZCA9IC0xO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPiAwKSB7XHJcbiAgICAgIF9hbW91bnRJbmNyZWFzZWQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ICo9IF9tdWx0aXBsaWVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX2Ftb3VudEluY3JlYXNlZCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9hbW91bnRJbmNyZWFzZWQ7XHJcbiAgfSxcclxuXHJcbiAgR2V0TWFya2V0aW5nTW9uZXkoX3Byb2ZpdCkge1xyXG4gICAgdmFyIF9hbW91bnQgPSAtMTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID4gMCkge1xyXG4gICAgICBfcHJvZml0ID0gX3Byb2ZpdCAvIDEwMDtcclxuICAgICAgX2Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgKj0gX3Byb2ZpdDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfYW1vdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2Ftb3VudDtcclxuICB9LFxyXG5cclxuICBHZXRWb2NhYnVsYXJ5UXVlc3Rpb25zSW5kZXgoKSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKFZvY2FidWxhcnlRdWVzdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPCBWb2NhYnVsYXJ5UXVlc3Rpb25zLmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBWb2NhYnVsYXJ5UXVlc3Rpb25zW1ZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyXTtcclxuICAgICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlcisrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X1ZvY2FidWxhcnkoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfVm9jYWJ1bGFyeSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0RXN0YWJsaXNobWVudFF1ZXN0aW9uc0luZGV4KCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChFc3RhYmxpc2htZW50UXVlc3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyIDwgRXN0YWJsaXNobWVudFF1ZXN0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gRXN0YWJsaXNobWVudFF1ZXN0aW9uc1tFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlcl07XHJcbiAgICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIrKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Fc3RhYmxpc2htZW50KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X0VzdGFibGlzaG1lbnQoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Wb2NhYnVsYXJ5KF9kYXRhID0gbnVsbCkge1xyXG4gICAgaWYgKF9kYXRhID09IG51bGwpIHtcclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9ucyA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTFdO1xyXG5cclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9ucy5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coVm9jYWJ1bGFyeVF1ZXN0aW9ucyk7XHJcbiAgICAgIFZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuXHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSB7IFZvY0FycmF5OiBWb2NhYnVsYXJ5UXVlc3Rpb25zLCBFc3RBcnJheTogbnVsbCB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE4LCBfdGVtcERhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9kYXRhLlZvY0FycmF5ICE9IG51bGwpIHtcclxuICAgICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zID0gX2RhdGEuVm9jQXJyYXk7XHJcbiAgICAgICAgY29uc29sZS5sb2coVm9jYWJ1bGFyeVF1ZXN0aW9ucyk7XHJcbiAgICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X0VzdGFibGlzaG1lbnQoX2RhdGEgPSBudWxsKSB7XHJcbiAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV07XHJcblxyXG4gICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhFc3RhYmxpc2htZW50UXVlc3Rpb25zKTtcclxuICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgVm9jQXJyYXk6IG51bGwsIEVzdEFycmF5OiBFc3RhYmxpc2htZW50UXVlc3Rpb25zIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTgsIF90ZW1wRGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2RhdGEuRXN0QXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnMgPSBfZGF0YS5Fc3RBcnJheTtcclxuICAgICAgICBjb25zb2xlLmxvZyhFc3RhYmxpc2htZW50UXVlc3Rpb25zKTtcclxuICAgICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbihfZGF0YSkge1xyXG4gICAgdmFyIF9xdWVzdGlvblJlZiA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfUXVlc3Rpb25zRGF0YSgpO1xyXG4gICAgdmFyIF91c2VySUQgPSBfZGF0YS5Vc2VySUQ7XHJcbiAgICB2YXIgX3F1ZXN0aW9uSW5kZXggPSBfZGF0YS5RdWVzdGlvbjtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfZGF0YS5Vc2VySW5kZXg7XHJcbiAgICB2YXIgX2lzVm9jID0gX2RhdGEuSXNWb2M7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAgIGlmIChfaXNWb2MpIHtcclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIrKztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyKys7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF91c2VySUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSUQgbWF0Y2hlZFwiKTtcclxuXHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcblxyXG4gICAgICB2YXIgX1FkYXRhO1xyXG4gICAgICBpZiAoX2lzVm9jKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2b2NcIik7XHJcbiAgICAgICAgX1FkYXRhID0gX3F1ZXN0aW9uUmVmLlZvY2FidWxhcnlRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXhdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXN0XCIpO1xyXG4gICAgICAgIF9RZGF0YSA9IF9xdWVzdGlvblJlZi5Fc3RhYmxpc2htZW50UXVlc3Rpb25zW19xdWVzdGlvbkluZGV4XTtcclxuICAgICAgfVxyXG5cclxuICAgICAgQ29ycmVjdEFuc3dlciA9IF9RZGF0YS5Db3JyZWN0T3B0aW9uO1xyXG4gICAgICB2YXIgX21lc3NhZ2UgPSBcIkNob29zZSB0aGUgY29ycmVjdCBhbnN3ZXIuXCIgKyBcIlxcblwiICsgXCIqd3JvbmcgYW5zd2VyIHdpbGwgY29zdCB5b3UgYSBmaW5lIG9mICQ1MDAwLlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBfUWRhdGEuUXVlc3Rpb24gKyBcIlxcblwiICsgXCJBLiBcIiArIF9RZGF0YS5PcHRpb24xICsgXCJcXG5cIiArIFwiQi4gXCIgKyBfUWRhdGEuT3B0aW9uMiArIFwiXFxuXCIgKyBcIkMuIFwiICsgX1FkYXRhLk9wdGlvbjMgKyBcIlxcblwiICsgXCJELiBcIiArIF9RZGF0YS5PcHRpb240O1xyXG5cclxuICAgICAgLy8gdmFyIF9xdWVzdGlvbkFza2VkID0gT25lUXVlc3Rpb25zW19xdWVzdGlvbkluZGV4IC0gMV07XHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24oX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX215RGF0YSwgX3Jvb21EYXRhLCBfaXNUdXJuT3ZlciwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gIH0sXHJcblxyXG4gIE9uZVF1ZXN0aW9uRGVjaXNpb25fU2VsZWN0T3B0aW9uX09uZVF1ZXN0aW9uKGV2ZW50ID0gbnVsbCkge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3NlbGVjdGlvbiA9IHBhcnNlSW50KGV2ZW50LmN1cnJlbnRUYXJnZXQubmFtZS5zcGxpdChcIl9cIilbMV0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwib3B0aW9uIHNlbGVjdGVkOiBcIiArIF9zZWxlY3Rpb24pO1xyXG4gICAgY29uc29sZS5sb2coXCJDb3JyZWN0QW5zd2VyOiBcIiArIENvcnJlY3RBbnN3ZXIpO1xyXG4gICAgaWYgKF9zZWxlY3Rpb24gPT0gQ29ycmVjdEFuc3dlcikge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91ciBhbnN3ZXIgd2FzIGNvcnJlY3QhLlwiLCAxMjAwKTtcclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKGZhbHNlLCB0cnVlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9teURhdGEuQ2FzaCA+PSA1MDAwKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggLT0gNTAwMDtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbnN3ZXJlZCB3cm9uZywgZmluZSBhbW91bnQgd2FzIHBheWVkIHRvIHRoZSBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKHRydWUsIGZhbHNlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCwgU2tpcHBpbmcgcXVlc3Rpb25cIik7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIGZhbHNlLCAwLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBPbmVRdWVzdGlvbkRlY2lzaW9uX1BheUFtb3VudF9PbmVRdWVzdGlvbigpIHtcclxuICAvLyAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgLy8gICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAvLyAgIGlmIChfbXlEYXRhLkNhc2ggPj0gNTAwMCkge1xyXG4gIC8vICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAvLyAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgLy8gICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoIC09IDUwMDA7XHJcbiAgLy8gICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7XHJcbiAgLy8gICAgICAgICBicmVhaztcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgIH1cclxuXHJcbiAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgcGFpZCBjYXNoIGFtb3VudCB0byBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gIC8vICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAvLyAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24odHJ1ZSwgZmFsc2UsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH0sXHJcblxyXG4gIC8vIE9uZVF1ZXN0aW9uRGVjaXNpb25fQW5zd2VyUXVlc3Rpb25fT25lUXVlc3Rpb24oKSB7XHJcbiAgLy8gICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gIC8vICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAvLyAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYW5zd2VyZWQgdGhlIHF1ZXN0aW9uLlwiLCAxMjAwKTtcclxuICAvLyAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIC8vICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIHRydWUsIE9uZVF1ZXN0aW9uSW5kZXgsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAvLyB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCh0cnVlKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5SZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCgpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KF9teURhdGEsIF9yb29tRGF0YSwgX2lzVHVybk92ZXIsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfU2VsZWN0UGxheWVyRm9yUHJvZml0X1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICB2YXIgX293bklEID0gX2RhdGEuVXNlcklELnRvU3RyaW5nKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gcGFyc2VJbnQoX2RhdGEuVXNlckluZGV4KTtcclxuICAgIHZhciBfcGxheWVyTmFtZSA9IF9kYXRhLlVzZXJOYW1lO1xyXG4gICAgdmFyIF9wbGF5ZXJJRCA9IF9kYXRhLk93blBsYXllcklELnRvU3RyaW5nKCk7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgaWYgKF9vd25JRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGV2ZW50OiBcIiArIF9wbGF5ZXJOYW1lKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQgPT0gX293bklEKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYW5HaXZlUHJvZml0T25QYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uVXNlcklERm9yUHJvZml0UGF5RGF5ID0gX3BsYXllcklEO1xyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCB0aGlzLlBsYXllckdhbWVJbmZvLCB0cnVlKTtcclxuICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TaG93VG9hc3QoXCJQbGF5ZXIgXCIgKyBfcGxheWVyTmFtZSArIFwiIHdpbGwgcmVjZWl2ZSBhbGwgeW91ciBuZXh0IHBheSBkYXkgcHJvZml0c1wiLCAzMjAwKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfaGFzRG9uZVBheW1lbnQsIF9oYXNBbnN3ZXJlZFF1ZXN0aW9uLCBfcXVlc3Rpb25JbmRleCwgX1VzZXJJRCkge1xyXG4gICAgdmFyIF9kYXRhID0geyBQYXltZW50RG9uZTogX2hhc0RvbmVQYXltZW50LCBRdWVzdGlvbkFuc3dlcmVkOiBfaGFzQW5zd2VyZWRRdWVzdGlvbiwgUXVlc3Rpb25JbmRleDogX3F1ZXN0aW9uSW5kZXgsIElEOiBfVXNlcklEIH07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDgsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBEZWR1Y3RDYXNoX0NhcmRGdW5jdGlvbmFsaXR5KF9hbW91bnQpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX215SW5kZXggPSB0aGlzLkdldE15SW5kZXgoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5DYXNoID49IF9hbW91bnQpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5DYXNoIC09IF9hbW91bnQ7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCA8IF9hbW91bnQpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5DYXNoID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFkZENhc2hfQ2FyZEZ1bmN0aW9uYWxpdHkoX2RhdGEpIHtcclxuICAgIHZhciBfYW1vdW50ID0gX2RhdGEuYW1vdW50O1xyXG4gICAgdmFyIF9JRCA9IF9kYXRhLklEO1xyXG4gICAgdmFyIF9tc2cgPSBfZGF0YS5tc2c7XHJcblxyXG4gICAgdmFyIG1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgaWYgKG1vZGUgPT0gMikge1xyXG4gICAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgICB2YXIgX215SW5kZXggPSB0aGlzLkdldE15SW5kZXgoKTtcclxuICAgICAgICBpZiAoX2FjdG9yLlBsYXllclVJRCA9PSBfSUQpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoX21zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT0gMSkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IF9JRCAmJiBpbmRleCAhPSB0aGlzLlR1cm5OdW1iZXIpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoX21zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLlVwZGF0ZVVJRGF0YSgpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2RhdGEpIHtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICB2YXIgX2hhc0RvbmVQYXltZW50ID0gX2RhdGEuUGF5bWVudERvbmU7XHJcbiAgICAgIHZhciBfaGFzQW5zd2VyZWRRdWVzdGlvbiA9IF9kYXRhLlF1ZXN0aW9uQW5zd2VyZWQ7XHJcbiAgICAgIHZhciBfcXVlc3Rpb25JbmRleCA9IF9kYXRhLlF1ZXN0aW9uSW5kZXg7XHJcbiAgICAgIHZhciBfdUlEID0gX2RhdGEuSUQ7XHJcblxyXG4gICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgaWYgKF9xdWVzdGlvbkluZGV4ID09IDApIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwicGxheWVyIGRvZXMgbm90IGhhdmUgZW5vdWdoIGNhc2gsIHNvIHF1ZXN0aW9ucyB3ZXJlIHNraXBwZWQuXCIsIDIxMDApO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfaGFzRG9uZVBheW1lbnQpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCArPSA1MDAwO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcInBsYXllciBoYXMgZ2l2ZW4gd3JvbmcgYW5zd2VyLCBjYXNoICQ1MDAwIGhhcyBiZWVuIGFkZGVkLlwiLCAyMTAwKTtcclxuICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfaGFzQW5zd2VyZWRRdWVzdGlvbikge1xyXG4gICAgICAgICAgdmFyIF9zZWxlY3RlZFBsYXllckluZGV4ID0gMDtcclxuICAgICAgICAgIHZhciBfYWN0b3JzRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChfdUlEID09IF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICAgIF9zZWxlY3RlZFBsYXllckluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwicGxheWVyIGhhcyBnaXZlbiBjb3JyZWN0IGFuc3dlciwgbm8gY2FzaCB3YXMgcmVjZWl2ZWQuXCIsIDIxMDApO1xyXG5cclxuICAgICAgICAgIC8vIGlmIChfcXVlc3Rpb25JbmRleCA9PSAxKSB7XHJcbiAgICAgICAgICAvLyAgIC8vaGF2ZSB5b3Ugc2tpcHBlZCBsb2FuIHByZXZpb3VzIHBheWRheT9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlNraXBwZWRMb2FuUGF5bWVudCkge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgc2tpcHBlZCBsb2FuIHBheWVtZW50IGluIHByZXZpb3VzIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSBza2lwcGVkIGxvYW4gcGF5ZW1lbnQgaW4gcHJldmlvdXMgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDIpIHtcclxuICAgICAgICAgIC8vICAgLy9IYXZlIHlvdSB0YWtlbiBhbnkgbG9hbj9cclxuICAgICAgICAgIC8vICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICAgIC8vICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIC8vICAgICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgLy8gICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgLy8gICB9XHJcblxyXG4gICAgICAgICAgLy8gICBpZiAoX2xvYW5UYWtlbikge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgdGFrZW4gc29tZSBsb2FuXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHRha2VuIGFueSBsb2FuXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDMpIHtcclxuICAgICAgICAgIC8vICAgLy9BcmUgeW91IGJhbmtydXB0ZWQ/IGlmIG1vcmUgdGhhbiBvbmNlLCB0ZWxsIG1lIHRoZSBhbW91bnQ/XHJcbiAgICAgICAgICAvLyAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Jc0JhbmtydXB0KSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSBiZWVuIGJhbmtydXB0ZWQgXCIgKyBfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5CYW5rcnVwdEFtb3VudCArIFwiIHRpbWUvZXMuXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZFwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSA0KSB7XHJcbiAgICAgICAgICAvLyAgIC8vSXMgeW91ciB0dXJuIGdvaW5nIHRvIGJlIHNraXBwZWQgbmV4dCB0aW1lP1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIGJlIHNraXBwZWQuXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBub3QgYmUgc2tpcHBlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gNSkge1xyXG4gICAgICAgICAgLy8gICAvL0lzIGl0IGdvaW5nIHRvIGJlIGRvdWJsZSBwYXkgZGF5IHlvdXIgbmV4dCBwYXlkYXk/XHJcbiAgICAgICAgICAvLyAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIGJlIGRvdWJsZSBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgcGF5ZGF5IHdpbGwgbm90IGJlIGRvdWJsZSBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkoX2RhdGEpIHtcclxuICAgIGlmIChJc1R3ZWVuaW5nID09IHRydWUpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkoX2RhdGEpO1xyXG4gICAgICB9LCA4MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9zcGFjZXMgPSBfZGF0YS5EYXRhLmJhY2tzcGFjZXM7XHJcbiAgICAgIHZhciBfY291bnRlciA9IF9kYXRhLkRhdGEuQ291bnRlcjtcclxuXHJcbiAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtfY291bnRlciArIEJhY2tzcGFjZXNdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zLCAwLjEpO1xyXG5cclxuICAgICAgUm9sbENvdW50ZXIgPSBfY291bnRlcjtcclxuICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1Bvcyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzOiBmdW5jdGlvbiAoTm9kZSwgVG9Qb3MsIHNwZWVkID0gMC42KSB7XHJcbiAgICBjYy50d2VlbihOb2RlKVxyXG4gICAgICAudG8oc3BlZWQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpIH0sIHsgZWFzaW5nOiBcInF1YWRJbk91dFwiIH0pXHJcbiAgICAgIC5jYWxsKCgpID0+IHt9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICBHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5KCkge1xyXG4gICAgUm9sbENvdW50ZXIgLT0gQmFja3NwYWNlcztcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgYmFja3NwYWNlczogQmFja3NwYWNlcywgQ291bnRlcjogUm9sbENvdW50ZXIgfSB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEwLCBfZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MpO1xyXG4gICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcbiAgLy8jZW5kcmVnaW9uXHJcbn0pO1xyXG4vL21vZHVsZS5leHBvcnRzICA9IFBsYXllckRhdGE7IC8vd2hlbiBpbXBvcnRzIGluIGFub3RoZXIgc2NyaXB0IG9ubHkgcmVmZXJlbmNlIG9mIHBsYXllcmRhdGEgY2xhc3Mgd291bGQgYmUgYWJsZSB0byBhY2Nlc3NlZCBmcm9tIEdhbWVtYW5hZ2VyIGltcG9ydFxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVNYW5hZ2VyO1xyXG4vLyNlbmRyZWdpb25cclxuIl19