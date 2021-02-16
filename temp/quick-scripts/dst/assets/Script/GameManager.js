
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
        BigBusinessArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10];
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
        MarketingArray = [0, 1, 2, 3, 4, 5, 7, 8, 9, 13];
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
            RandomCard = this.SelectRelatedCard(true, false, false, false); //RandomCard = 5;
          } else if (_spaceID == 5) {
            //landed on some losses cards
            RandomCard = this.SelectRelatedCard(false, true, false, false); //RandomCard = 14;
          } else if (_spaceID == 3) {
            //landed on some marketing cards
            RandomCard = this.SelectRelatedCard(false, false, true, false); //RandomCard = 5;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJQcmV2aW91c0RpY2VSb2xsMyIsIlByZXZpb3VzRGljZVJvbGw0IiwiUHJldmlvdXNEaWNlUm9sbDUiLCJ1c2VyR2FtZU92ZXIiLCJCb3RHYW1lT3ZlciIsIlRvdGFsQ291bnRlclJlYWNoZWQiLCJQYXNzZWRQYXlEYXlDb3VudGVyIiwiRG91YmxlUGF5RGF5Q291bnRlciIsIk5vQ2FyZEZ1bmN0aW9uYWxpdHkiLCJQbGF5ZXJMZWZ0IiwiRm9yY2VDaGFuZ2VUaW1lT3V0IiwiR2FtZUNvbXBsZXRlZCIsIkNvcnJlY3RBbnN3ZXIiLCJWb2NhYnVsYXJ5UXVlc3Rpb25zIiwiRXN0YWJsaXNobWVudFF1ZXN0aW9ucyIsIlZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyIiwiRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIiLCJCaWdCdXNpbmVzc0FycmF5IiwiTG9zc2VzQXJyYXkiLCJNYXJrZXRpbmdBcnJheSIsIldpbGRDYXJkQXJyYXkiLCJCaWdCdXNpbmVzc0FycmF5Q291bnRlciIsIkxvc3Nlc0FycmF5Q291bnRlciIsIk1hcmtldGluZ0FycmF5Q291bnRlciIsIldpbGRDYXJkQXJyYXlDb3VudGVyIiwiRW51bUJ1c2luZXNzVHlwZSIsImNjIiwiRW51bSIsIk5vbmUiLCJIb21lQmFzZWQiLCJicmlja0FuZG1vcnRhciIsIkJ1c2luZXNzSW5mbyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJOYW1lIiwiQnVzaW5lc3NUeXBlIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uIiwiVGV4dCIsIkJ1c2luZXNzTmFtZSIsIkFtb3VudCIsIkludGVnZXIiLCJJc1BhcnRuZXJzaGlwIiwidHlwdyIsIkJvb2xlYW4iLCJQYXJ0bmVySUQiLCJQYXJ0bmVyTmFtZSIsIkxvY2F0aW9uc05hbWUiLCJMb2FuVGFrZW4iLCJMb2FuQW1vdW50IiwiUmVjZWl2ZURvdWJsZVBheURheSIsImN0b3IiLCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHkiLCJOZXh0VHVybkRvdWJsZVBheSIsIlNraXBOZXh0VHVybiIsIlNraXBOZXh0UGF5ZGF5IiwiU2tpcEhNTmV4dFBheWRheSIsIlNraXBCTU5leHRQYXlkYXkiLCJOZXh0VHVybkhhbGZQYXlEYXkiLCJOZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyIiwiU3RvY2tJbmZvIiwiU2hhcmVBbW91bnQiLCJQbGF5ZXJEYXRhIiwiUGxheWVyTmFtZSIsIlBsYXllclVJRCIsIkF2YXRhcklEIiwiSXNCb3QiLCJOb09mQnVzaW5lc3MiLCJDYXJkRnVuY3Rpb25hbGl0eSIsIkhvbWVCYXNlZEFtb3VudCIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiUmVjZWl2ZURvdWJsZVBheURheUFtb3VudCIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiTm9PZlN0b2NrcyIsIkNhc2giLCJHb2xkQ291bnQiLCJTdG9ja0NvdW50IiwiTWFya2V0aW5nQW1vdW50IiwiTGF3eWVyU3RhdHVzIiwiSXNCYW5rcnVwdCIsIkJhbmtydXB0QW1vdW50IiwiU2tpcHBlZExvYW5QYXltZW50IiwiUGxheWVyUm9sbENvdW50ZXIiLCJJbml0aWFsQ291bnRlckFzc2lnbmVkIiwiaXNHYW1lRmluaXNoZWQiLCJUb3RhbFNjb3JlIiwiVG90YWxIQkNhc2giLCJUb3RhbEJNQ2FzaCIsIlRvdGFsR29sZENhc2giLCJUb3RhbExvYW5CYWxhbmNlIiwiVG90YWxTdG9ja3NDYXNoIiwiR2FtZU92ZXIiLCJJc0FjdGl2ZSIsIkNhbkdpdmVQcm9maXRPblBheURheSIsIlVzZXJJREZvclByb2ZpdFBheURheSIsIlJvbGxDb3VudGVyIiwiRGljZVRlbXAiLCJEaWNlUm9sbCIsIklzVHdlZW5pbmciLCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJUdXJuQ2hlY2tBcnJheSIsIkJ1c2luZXNzTG9jYXRpb25Ob2RlcyIsIlBhc3NlZFBheURheSIsIkRvdWJsZVBheURheSIsIl9uZXh0VHVybkRvdWJsZVBheSIsIl9uZXh0VHVybmhhbGZQYXkiLCJfc2tpcE5leHRUdXJuIiwiX3NraXBOZXh0UGF5ZGF5IiwiX3NraXBITU5leHRQYXlkYXkiLCJfc2tpcEJNTmV4dFBheWRheSIsIkNhcmRFdmVudFJlY2VpdmVkIiwiVHVybkluUHJvZ3Jlc3MiLCJCYWNrc3BhY2VzIiwiaXNHYW1lT3ZlciIsIkNhcmREaXNwbGF5U2V0VGltb3V0IiwiR2FtZU1hbmFnZXIiLCJDb21wb25lbnQiLCJQbGF5ZXJHYW1lSW5mbyIsIkJvdEdhbWVJbmZvIiwiUGxheWVyTm9kZSIsIk5vZGUiLCJDYW1lcmFOb2RlIiwiQWxsUGxheWVyVUkiLCJBbGxQbGF5ZXJOb2RlcyIsIlN0YXJ0TG9jYXRpb25Ob2RlcyIsIlNlbGVjdGVkTW9kZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlNldFBsYXllckxlZnQiLCJfc3RhdGUiLCJSZXNldEFsbFZhcmlhYmxlcyIsIklucHV0VGVzdERpY2UxIiwiX3ZhbCIsIklucHV0VGVzdERpY2UyIiwib25Mb2FkIiwiUmVzZXRQYXlEYXkiLCJUdXJuTnVtYmVyIiwiVHVybkNvbXBsZXRlZCIsIkNoZWNrUmVmZXJlbmNlcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRTZWxlY3RlZE1vZGUiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwiY29uc29sZSIsImxvZyIsInJlcXVpcmUiLCJDYW1lcmEiLCJnZXRDb21wb25lbnQiLCJpc0NhbWVyYVpvb21pbmciLCJDaGVja1NwZWN0YXRlIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkiLCJBbGxEYXRhIiwiTWF4UGxheWVycyIsImxlbmd0aCIsIlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlciIsIlVwZGF0ZUdhbWVVSSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiR2V0VHVybk51bWJlciIsIkdldE15SW5kZXgiLCJteUluZGV4IiwiX2FjdG9yIiwiUGhvdG9uQWN0b3IiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJfYWxsQWN0b3JzIiwiaW5kZXgiLCJTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8iLCJBc3NpZ25QbGF5ZXJHYW1lVUkiLCJFbmFibGVQbGF5ZXJOb2RlcyIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJfdG9Qb3MiLCJWZWMyIiwiR2V0X1NwYWNlTWFuYWdlciIsIkRhdGEiLCJSZWZlcmVuY2VMb2NhdGlvbiIsInBvc2l0aW9uIiwieCIsInkiLCJzZXRQb3NpdGlvbiIsIl9sYXN0SW5kZXgiLCJhY3RpdmUiLCJDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyIiwiVG90YWxDb25uZWN0ZWRQbGF5ZXJzIiwibXlSb29tQWN0b3JDb3VudCIsInVzZXJJRCIsInNldEN1c3RvbVByb3BlcnR5IiwiQ2hhbmdlVHVybiIsIlJhaXNlRXZlbnRGb3JDYXJkIiwiX2RhdGEiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiRGlzcGxheUNhcmRPbk90aGVycyIsIk9uTGFuZGVkT25TcGFjZSIsInNldFRpbWVvdXQiLCJSZXNldENhcmREaXNwbGF5IiwiUmVjZWl2ZUV2ZW50Rm9yQ2FyZCIsIlJhbmRvbUNhcmQiLCJyYW5kb21DYXJkIiwiY291bnRlciIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJTeW5jQWxsRGF0YSIsIlJlbW92ZUZyb21DaGVja0FycmF5IiwiX3VpZCIsIl9pbmQiLCJzcGxpY2UiLCJDaGVja1R1cm5Db21wbGV0ZSIsImoiLCJSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUiLCJwdXNoIiwiQXJyYXlMZW5ndGgiLCJJREZvdW5kIiwiUmVzZXRTb21lVmFsdWVzIiwiQ2hhbmdlVHVybkZvcmNlZnVsbHkiLCJVcGRhdGVWaXN1YWxEYXRhIiwiUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5IiwiVHVybkhhbmRsZXIiLCJfdHVybiIsIl9pc01hc3RlciIsIkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCIsIl9wbGF5ZXJNYXRjaGVkIiwiVG9nZ2xlVHVyblByb2dyZXNzIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUmVzZXRUdXJuVmFyaWFibGUiLCJSb2xsRGljZSIsIkRpY2VSb2xsU2NyZWVuIiwiUGxheWVySW5mbyIsIm15Um9vbUFjdG9yc0FycmF5IiwiU2hvd1RvYXN0IiwiVG9nZ2xlU2tpcE5leHRUdXJuIiwiVXBkYXRlVUlEYXRhIiwiTWFpblNlc3Npb25EYXRhIiwiTXlEYXRhIiwiX2NvdW50ZXIiLCJTdGFydFR1cm4iLCJSZWNlaXZlQmFua3J1cHREYXRhIiwiX2lzQmFua3J1cHRlZCIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiX3BsYXllckRhdGEiLCJQbGF5ZXJEYXRhTWFpbiIsIlN0YXJ0VHVybkFmdGVyQmFua3J1cHQiLCJfcmFuZG9tSW5kZXgiLCJnZXRSYW5kb20iLCJTZXROYW1lIiwiU2V0QXZhdGFyIiwiX3RvZ2dsZUhpZ2hsaWdodCIsIl9pbmRleCIsIlRvZ2dsZUJHSGlnaGxpZ2h0ZXIiLCJUb2dnbGVUZXh0aWdobGlnaHRlciIsImNoaWxkcmVuIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJBdmF0YXJTcHJpdGVzIiwiU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcyIsInRhcmdldFBvcyIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsInBhcmVudCIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwicmF0aW8iLCJ3aW5TaXplIiwiaGVpZ2h0Iiwiem9vbVJhdGlvIiwibGF0ZVVwZGF0ZSIsInN5bmNEaWNlUm9sbCIsIl9yb2xsIiwiX2RpY2UxIiwiZGljZTEiLCJfZGljZTIiLCJkaWNlMiIsIl9yZXN1bHQiLCJlcnJvciIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsIkFuaW1hdGVEaWNlIiwiRGljZUZ1bnRpb25hbGl0eSIsIl9wb3MiLCJUd2VlbkNhbWVyYSIsIlRlbXBDaGVja1NwYWNlIiwiX3JvbGxpbmciLCJ0ZW1wY291bnRlciIsInRlbXBjb3VudGVyMiIsImRpY2V0b2JlIiwicGFyc2VJbnQiLCJTcGFjZURhdGEiLCJTcGFjZXNUeXBlIiwiRGljZTEiLCJEaWNlMiIsIl9uZXdSb2xsIiwiUm9sbE9uZURpY2UiLCJSb2xsVHdvRGljZXMiLCJQb3B1bGF0ZURlY2tzQXJyYXkiLCJfaXNCaWdCdXNpbmVzcyIsIl9pc0xvc3NlcyIsIl9pc01hcmtldGluZyIsIl9pc1dpbGRDYXJkIiwic29ydCIsIk1hdGgiLCJyYW5kb20iLCJfdGVtcERhdGEiLCJCaWdBcnJheSIsIkxvc3NBcnJheSIsIk1hcmtldEFycmF5IiwiV2lsZEFycnlhIiwiR2V0QmlnQnVzaW5lc3NJbmRleCIsIkdldExvc3Nlc0luZGV4IiwiR2V0TWFya2V0aW5nSW5kZXgiLCJHZXRXaWxkQ2FyZEluZGV4IiwiVXBkYXRlQ291bnRlcnMiLCJTZWxlY3RSZWxhdGVkQ2FyZCIsImNhbGxVcG9uQ2FyZCIsIl9zcGFjZUlEIiwiU3RhcnREaWNlUm9sbCIsIlNlbmRpbmdEYXRhIiwiaXNCb3QiLCJjb21wbGV0ZUNhcmRUdXJuIiwiQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQiLCJDYWxsR2FtZUNvbXBsZXRlIiwiX2lzQm90IiwiX2ZvcmNlR2FtZU92ZXIiLCJfcGxheWVySW5kZXgiLCJfY2FzaCIsIkhNQW1vdW50IiwiR2V0X0dhbWVNYW5hZ2VyIiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsImxvYW5BbW91bnQiLCJfZ29sZCIsIl9zdG9ja3MiLCJfZGljZVJhbmRvbSIsIk9uY2VPclNoYXJlIiwiR29sZENhc2giLCJTdG9ja0Nhc2giLCJCTUNhc2giLCJITUNhc2giLCJUb3RhbEFzc2V0cyIsIlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUiLCJSYWlzZUV2ZW50VG9TeW5jR2FtZUNvbXBsZXRlRGF0YSIsIlN5bmNHYW1lT3ZlciIsIl9VSUQiLCJpbmZvVGV4dCIsInN0YXR1c1RleHQiLCJEaXNjb25uZWN0RGF0YSIsIlNob3dSZXN1bHRTY3JlZW4iLCJfY3VycmVudENhc2giLCJHZXRfU2VydmVyQmFja2VuZCIsIlN0dWRlbnREYXRhIiwiZ2FtZUNhc2giLCJfdG90YWwiLCJ0b1N0cmluZyIsIl93b24iLCJnYW1lc1dvbiIsIlVwZGF0ZVVzZXJEYXRhIiwiU3luY0dhbWVDb21wbGV0ZURhdGEiLCJCb3QiLCJab29tQ2FtZXJhT3V0T25seSIsIm1heCIsIlNlbGVjdGVkSW5kIiwiU2Vzc2lvbkRhdGEiLCJfdmFsdWUiLCJ0cmFjZSIsInBsYXllcmNvbXBsZXRlZCIsIlpvb21DYW1lcmFPdXQiLCJUd2VlblBsYXllciIsIm1pbiIsImZsb29yIiwiaXNab29tIiwidGltZSIsInR3ZWVuIiwidG8iLCJ2MiIsImVhc2luZyIsImNhbGwiLCJab29tQ2FtZXJhSW4iLCJzdGFydCIsIkNoZWNrUGF5RGF5Q29uZGl0aW9ucyIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIiwiVG9Qb3MiLCJzcGVlZCIsIl9uZXdwb3MiLCJUb2dnbGVQYXlEYXkiLCJfc3QxIiwiX1N0MiIsIkluY3JlYXNlRG91YmxlUGF5RGF5IiwiRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiYW1vdW50IiwiX2xvY2F0aW9uTmFtZSIsIl9pc0NhcmRGdW5jdGlvbmFsaXR5IiwiX0dpdmVuQ2FzaCIsIl9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJpIiwibm9kZSIsImluc3RhbnRpYXRlIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiU2V0QnVzaW5lc3NJbmRleCIsIlNldENhcmRGdW5jdGlvbmFsaXR5IiwiU2V0R2l2ZW5DYXNoIiwiU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiUmVzZXRFZGl0Qm94IiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiZGVzdHJveSIsIlVwZGF0ZVN0b2Nrc19UdXJuRGVjaXNpb24iLCJfbmFtZSIsIl9TaGFyZUFtb3VudCIsIl9pc0FkZGluZyIsIl9zdG9jayIsIl9pc0RvdWJsZVBheURheSIsIl9mb3JTZWxlY3RlZEJ1c2luZXNzIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIkhCQW1vdW50IiwiX3RpdGxlIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9hbW91bnQiLCJfdUlEIiwiSUQiLCJSZWNlaXZlUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiX2lEIiwiX215SW5kZXgiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIlRvZ2dsZUhhbGZQYXlOZXh0VHVybiIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlJldHVyblR1cm5Qcm9ncmVzcyIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9sb3NlQW1vdW50IiwiTXVsdGlwbHlNYXJrZXRpbmdNb25leSIsIl9tdWx0aXBsaWVyIiwiX2Ftb3VudEluY3JlYXNlZCIsIkdldE1hcmtldGluZ01vbmV5IiwiX3Byb2ZpdCIsIkdldFZvY2FidWxhcnlRdWVzdGlvbnNJbmRleCIsIlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Wb2NhYnVsYXJ5IiwiR2V0RXN0YWJsaXNobWVudFF1ZXN0aW9uc0luZGV4IiwiUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X0VzdGFibGlzaG1lbnQiLCJWb2NBcnJheSIsIkVzdEFycmF5IiwiUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24iLCJfcXVlc3Rpb25SZWYiLCJHZXRfUXVlc3Rpb25zRGF0YSIsIl91c2VySUQiLCJVc2VySUQiLCJfcXVlc3Rpb25JbmRleCIsIlF1ZXN0aW9uIiwiVXNlckluZGV4IiwiX2lzVm9jIiwiSXNWb2MiLCJfZ2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfUWRhdGEiLCJDb3JyZWN0T3B0aW9uIiwiX21lc3NhZ2UiLCJPcHRpb24xIiwiT3B0aW9uMiIsIk9wdGlvbjMiLCJPcHRpb240IiwiU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbiIsIl9pc1R1cm5PdmVyIiwiX215RGF0YSIsIl9yb29tRGF0YSIsIlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJPbmVRdWVzdGlvbkRlY2lzaW9uX1NlbGVjdE9wdGlvbl9PbmVRdWVzdGlvbiIsImV2ZW50IiwiX3NlbGVjdGlvbiIsImN1cnJlbnRUYXJnZXQiLCJzcGxpdCIsIlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbiIsIlNlbGVjdFBsYXllclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eSIsIlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiUmVjZWl2ZUV2ZW50X1NlbGVjdFBsYXllckZvclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eSIsIl9vd25JRCIsIl9wbGF5ZXJOYW1lIiwiVXNlck5hbWUiLCJfcGxheWVySUQiLCJPd25QbGF5ZXJJRCIsIl9oYXNEb25lUGF5bWVudCIsIl9oYXNBbnN3ZXJlZFF1ZXN0aW9uIiwiX1VzZXJJRCIsIlBheW1lbnREb25lIiwiUXVlc3Rpb25BbnN3ZXJlZCIsIlF1ZXN0aW9uSW5kZXgiLCJSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbiIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX3NlbGVjdGVkUGxheWVySW5kZXgiLCJfYWN0b3JzRGF0YSIsIlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eSIsIl9zcGFjZXMiLCJiYWNrc3BhY2VzIiwiQ291bnRlciIsIlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyIsIkdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBRyxLQUFkO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFFQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUVBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFFQSxJQUFJQyxZQUFZLEdBQUcsS0FB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QUFFM1ksVUFBZDtBQUEwQjRZLFVBQUFBLE9BQU8sRUFBRTdaO0FBQW5DO0FBQVIsT0FBWjtBQUNBSSxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RUYsS0FBOUU7QUFDRDs7QUFFRCxRQUFJbEIsTUFBTSxHQUFHM0osRUFBRSxDQUFDNEosSUFBSCxDQUFRL0Usd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dDLENBQTFHLEVBQTZHcEYsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ29ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyRixXQUExRCxFQUF1RXNGLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dFLENBQS9NLENBQWI7O0FBQ0EsU0FBS3FVLHdCQUFMLENBQThCLEtBQUtsWSxjQUFMLENBQW9CLEtBQUthLFVBQXpCLENBQTlCLEVBQW9FeUMsTUFBcEU7QUFDQSxTQUFLbUosZ0JBQUw7QUFDRCxHQXZnRndCLENBeWdGekI7QUFDQTs7QUExZ0Z5QixDQUFULENBQWxCLEVBNGdGQTs7QUFDQTJMLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdZLFdBQWpCLEVBQ0EiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfaXNUZXN0ID0gZmFsc2U7XHJcbnZhciBfZGljZWlucHV0MSA9IFwiXCI7XHJcbnZhciBfZGljZWlucHV0MiA9IFwiXCI7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsMSA9IC0xO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDIgPSAtMTtcclxuXHJcbnZhciBQcmV2aW91c0RpY2VSb2xsMyA9IC0xO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDQgPSAtMTtcclxuXHJcbnZhciBQcmV2aW91c0RpY2VSb2xsNSA9IC0xO1xyXG5cclxudmFyIHVzZXJHYW1lT3ZlciA9IGZhbHNlO1xyXG52YXIgQm90R2FtZU92ZXIgPSBmYWxzZTtcclxudmFyIFRvdGFsQ291bnRlclJlYWNoZWQgPSBmYWxzZTtcclxudmFyIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG52YXIgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcbnZhciBOb0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbnZhciBQbGF5ZXJMZWZ0ID0gZmFsc2U7XHJcbnZhciBGb3JjZUNoYW5nZVRpbWVPdXQgPSBudWxsO1xyXG52YXIgR2FtZUNvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgQ29ycmVjdEFuc3dlciA9IDA7XHJcblxyXG52YXIgVm9jYWJ1bGFyeVF1ZXN0aW9ucyA9IFtdO1xyXG52YXIgRXN0YWJsaXNobWVudFF1ZXN0aW9ucyA9IFtdO1xyXG52YXIgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG52YXIgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG5cclxudmFyIEJpZ0J1c2luZXNzQXJyYXkgPSBbXTtcclxudmFyIExvc3Nlc0FycmF5ID0gW107XHJcbnZhciBNYXJrZXRpbmdBcnJheSA9IFtdO1xyXG52YXIgV2lsZENhcmRBcnJheSA9IFtdO1xyXG52YXIgQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIgPSAwO1xyXG52YXIgTG9zc2VzQXJyYXlDb3VudGVyID0gMDtcclxudmFyIE1hcmtldGluZ0FycmF5Q291bnRlciA9IDA7XHJcbnZhciBXaWxkQ2FyZEFycmF5Q291bnRlciA9IDA7XHJcblxyXG4vLyNyZWdpb24gc3VwZXJjbGFzc2VzIGFuZCBlbnVtZXJhdGlvbnNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIHR5cGUgb2YgYnVzaW5lc3MtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEVudW1CdXNpbmVzc1R5cGUgPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIEhvbWVCYXNlZDogMSwgLy9hIGJ1c2luZXNzIHRoYXQgeW91IG9wZXJhdGUgb3V0IG9mIHlvdXIgaG9tZVxyXG4gIGJyaWNrQW5kbW9ydGFyOiAyLCAvL2Egc3RvcmUgZnJvbnQgYnVzaW5lc3NcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3NJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc0luZm9cIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lOiBcIkJ1c2luZXNzRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NUeXBlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vZGVcIixcclxuICAgICAgdHlwZTogRW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgZGVmYXVsdDogRW51bUJ1c2luZXNzVHlwZS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQnVzaW5lc3MgY2F0b2dvcnkgZm9yIHBsYXllcnNcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUeXBlXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJUeXBlIChieSBuYW1lKSBvZiBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOYW1lIG9mIHRoZSBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLFxyXG4gICAgfSxcclxuICAgIEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImJhbGFuY2Ugb2YgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBJc1BhcnRuZXJzaGlwOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzUGFydG5lcnNoaXBcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cHc6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGRvbmUgcGFydG5lcnNoaXAgd2l0aCBzb21lb25lIHdpdGggY3VycmVudCBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXJ0bmVySURcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklEIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhcnRuZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJuYW1lIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLFxyXG4gICAgfSxcclxuICAgIExvY2F0aW9uc05hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9jYXRpb25zTmFtZVwiLFxyXG4gICAgICB0eXBlOiBbY2MuVGV4dF0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaWYgcGxheWVyIG93bnMgYnJpY2sgYW5kIG1vcnRhciBoZS9zaGUgY2FuIGV4cGFuZCB0byBuZXcgbG9jYXRpb25cIixcclxuICAgIH0sXHJcbiAgICBMb2FuVGFrZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblRha2VuXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBSZWNlaXZlRG91YmxlUGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlY2VpdmVEb3VibGVQYXlEYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQ2FyZERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhRnVuY3Rpb25hbGl0eSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkNhcmREYXRhRnVuY3Rpb25hbGl0eVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5leHRUdXJuRG91YmxlUGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5leHRUdXJuRG91YmxlUGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBpdHMgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcE5leHRUdXJuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBOZXh0VHVyblwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgdHVybiBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgdHVybiBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTmV4dFBheWRheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcEhNTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwSE1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGhvbWUgYmFzZWQgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcEJNTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwQk1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGJyaWNrYSBhbmQgbW1vcnRhciBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBOZXh0VHVybkhhbGZQYXlEYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmV4dFR1cm5IYWxmUGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3RvY2tJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTdG9ja0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTdG9ja0luZm9cIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lOiBcIlN0b2NrRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibmFtZSBvZiB0aGUgYnVzaW5lc3MgaW4gd2hpY2ggc3RvY2tzIHdpbGwgYmUgaGVsZFwiLFxyXG4gICAgfSxcclxuICAgIFNoYXJlQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNoYXJlQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJTaGFyZSBhbW91bnQgb2YgdGhlIHN0b2NrXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciAgUGxheWVyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBsYXllckRhdGEgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQbGF5ZXJEYXRhXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJuYW1lIG9mIHRoZSBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJVSUQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyVUlEXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJJRCBvZiB0aGUgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgQXZhdGFySUQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFySURcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImlkIHJlZmVyZW5jZSBmb3IgcGxheWVyIGF2YXRhciBzZWxlY3Rpb25cIixcclxuICAgIH0sXHJcbiAgICBJc0JvdDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc0JvdFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwdzogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIGN1cnJlbnQgcGxheWVyIGlzIGJvdFwiLFxyXG4gICAgfSxcclxuICAgIE5vT2ZCdXNpbmVzczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1wiLFxyXG4gICAgICB0eXBlOiBbQnVzaW5lc3NJbmZvXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOdW1iZXIgb2YgYnVzaW5lc3MgYSBwbGF5ZXIgY2FuIG93blwiLFxyXG4gICAgfSxcclxuICAgIENhcmRGdW5jdGlvbmFsaXR5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhcmRGdW5jdGlvbmFsaXR5XCIsXHJcbiAgICAgIHR5cGU6IENhcmREYXRhRnVuY3Rpb25hbGl0eSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImNhcmQgZnVuY3Rpb25hbGl0eSBzdG9yZWQgYnkgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZEFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIG9mIGhvbWUgYmFzZWQgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIEJyaWNrQW5kTW9ydGFyQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrQW5kTW9ydGFyQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJudW1iZXIgb2YgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgUmVjZWl2ZURvdWJsZVBheURheUFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZWNlaXZlRG91YmxlUGF5RGF5QW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbExvY2F0aW9uc0Ftb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbExvY2F0aW9uc0Ftb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIG9mIGxvY2F0aW9ucyBvZiBhbGwgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc2Vzc1wiLFxyXG4gICAgfSxcclxuICAgIE5vT2ZTdG9ja3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tzXCIsXHJcbiAgICAgIHR5cGU6IFtTdG9ja0luZm9dLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk51bWJlciBvZiBzdG9jayBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgY2FzaCBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIEdvbGRDb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHb2xkQ291bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImNvdW50IG9mIGdvbGQgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIFN0b2NrQ291bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tDb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY291bnQgb2Ygc3RvY2tzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBMb2FuVGFrZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblRha2VuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyB0YWtlbiBsb2FuIGZyb20gYmFuayBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBsb2FuIHRha2VuIGZyb20gdGhlIGJhbmtcIixcclxuICAgIH0sXHJcbiAgICBNYXJrZXRpbmdBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nQW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJtYXJrZXRpbmcgYW1vdW50IGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBMYXd5ZXJTdGF0dXM6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTGF3eWVyU3RhdHVzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBoaXJlZCBhIGxhd3llciBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBJc0JhbmtydXB0OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQmFua3J1cHRcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGJlZW4gQmFua3J1cHRlZCBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBCYW5rcnVwdEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCYW5rcnVwdEFtb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBob3cgbXVjaCB0aW1lIHBsYXllciBoYXMgYmVlbiBiYW5rcnVwdGVkXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcHBlZExvYW5QYXltZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBwZWRMb2FuUGF5bWVudFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgc2tpcHBlZCBsb2FuIHBheW1lbnRcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJSb2xsQ291bnRlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJSb2xsQ291bnRlclwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciB0byBzdG9yZSByb2xsIGNvdW50b3IgZm9yIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEluaXRpYWxDb3VudGVyQXNzaWduZWQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGlzR2FtZUZpbmlzaGVkOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcImlzR2FtZUZpbmlzaGVkXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxTY29yZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbFNjb3JlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEhCQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEhCQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxCTUNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCTUNhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsR29sZENhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxHb2xkQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxMb2FuQmFsYW5jZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbExvYW5CYWxhbmNlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbFN0b2Nrc0Nhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxTdG9ja3NDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBHYW1lT3Zlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHYW1lT3ZlclwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIElzQWN0aXZlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQWN0aXZlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBDYW5HaXZlUHJvZml0T25QYXlEYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgVXNlcklERm9yUHJvZml0UGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlVzZXJJREZvclByb2ZpdFBheURheVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiBHYW1lIE1hbmFnZXIgQ2xhc3NcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKG1haW4gY2xhc3MpIGNsYXNzIGZvciBHYW1lIE1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvbGxDb3VudGVyID0gMDtcclxudmFyIERpY2VUZW1wID0gMDtcclxudmFyIERpY2VSb2xsID0gMDtcclxudmFyIElzVHdlZW5pbmcgPSBmYWxzZTtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG52YXIgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcblxyXG52YXIgUGFzc2VkUGF5RGF5ID0gZmFsc2U7XHJcbnZhciBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuXHJcbi8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG52YXIgX25leHRUdXJuRG91YmxlUGF5ID0gZmFsc2U7XHJcbnZhciBfbmV4dFR1cm5oYWxmUGF5ID0gZmFsc2U7XHJcbnZhciBfc2tpcE5leHRUdXJuID0gZmFsc2U7XHJcbnZhciBfc2tpcE5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxudmFyIF9za2lwSE1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBob21lIGJhc2VkIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIF9za2lwQk1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG52YXIgVHVybkluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHJcbnZhciBCYWNrc3BhY2VzID0gMztcclxudmFyIGlzR2FtZU92ZXIgPSBmYWxzZTtcclxuXHJcbnZhciBDYXJkRGlzcGxheVNldFRpbW91dCA9IG51bGw7XHJcblxyXG52YXIgR2FtZU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJHYW1lTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJHYW1lSW5mbzoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYWxsIHBsYXllcidzIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBCb3RHYW1lSW5mbzoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYWxsIGJvdCdzIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FtZXJhTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIGNhbWVyYVwiLFxyXG4gICAgfSxcclxuICAgIEFsbFBsYXllclVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBvZiB1aSBvZiBhbGwgcGxheWVyc1wiLFxyXG4gICAgfSxcclxuICAgIEFsbFBsYXllck5vZGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBvZiBub2RlIG9mIGFsbCBwbGF5ZXJzIGluc2lkZSBnYW1lcGxheVwiLFxyXG4gICAgfSxcclxuICAgIFN0YXJ0TG9jYXRpb25Ob2Rlczoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2Ugb2YgYXR0YXkgb2YgbG9jYXRpb25zXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0ZWRNb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHJlZmVyZW5jZSBmb3IgZ2FtZSBtb2RlIDEgbWVhbnMgYm90IGFuZCAyIG1lYW5zIHJlYWwgcGxheWVyc1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICBQbGF5ZXJEYXRhOiBQbGF5ZXJEYXRhLFxyXG4gICAgQnVzaW5lc3NJbmZvOiBCdXNpbmVzc0luZm8sXHJcbiAgICBDYXJkRGF0YUZ1bmN0aW9uYWxpdHk6IENhcmREYXRhRnVuY3Rpb25hbGl0eSxcclxuICAgIEVudW1CdXNpbmVzc1R5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICBJbnN0YW5jZTogbnVsbCxcclxuICB9LFxyXG5cclxuICBTZXRQbGF5ZXJMZWZ0KF9zdGF0ZSkge1xyXG4gICAgUGxheWVyTGVmdCA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBSZXNldEFsbFZhcmlhYmxlcygpIHtcclxuICAgIFZvY2FidWxhcnlRdWVzdGlvbnMgPSBbXTtcclxuICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnMgPSBbXTtcclxuICAgIFZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuXHJcbiAgICBCaWdCdXNpbmVzc0FycmF5ID0gW107XHJcbiAgICBMb3NzZXNBcnJheSA9IFtdO1xyXG4gICAgTWFya2V0aW5nQXJyYXkgPSBbXTtcclxuICAgIFdpbGRDYXJkQXJyYXkgPSBbXTtcclxuICAgIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyID0gMDtcclxuICAgIExvc3Nlc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICBNYXJrZXRpbmdBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgV2lsZENhcmRBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgIF9kaWNlaW5wdXQxID0gXCJcIjtcclxuICAgIF9kaWNlaW5wdXQyID0gXCJcIjtcclxuICAgIFByZXZpb3VzRGljZVJvbGwxID0gLTE7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMiA9IC0xO1xyXG4gICAgUGxheWVyTGVmdCA9IGZhbHNlO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDMgPSAtMTtcclxuICAgIFByZXZpb3VzRGljZVJvbGw0ID0gLTE7XHJcbiAgICBfbmV4dFR1cm5oYWxmUGF5ID0gZmFsc2U7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsNSA9IC0xO1xyXG4gICAgR2FtZUNvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgdXNlckdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICBCb3RHYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgQ29ycmVjdEFuc3dlciA9IDA7XHJcbiAgICBSb2xsQ291bnRlciA9IDA7XHJcbiAgICBEaWNlVGVtcCA9IDA7XHJcbiAgICBEaWNlUm9sbCA9IDA7XHJcbiAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG4gICAgRm9yY2VDaGFuZ2VUaW1lT3V0ID0gbnVsbDtcclxuICAgIFBhc3NlZFBheURheSA9IGZhbHNlO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgIC8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gZmFsc2U7XHJcbiAgICBfc2tpcE5leHRUdXJuID0gZmFsc2U7XHJcbiAgICBfc2tpcE5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxuICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBob21lIGJhc2VkIGJ1c2luZXNzZXNzIG9ubHlcclxuICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyBvbmx5XHJcbiAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgVHVybkluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHJcbiAgICBCYWNrc3BhY2VzID0gMztcclxuICAgIGlzR2FtZU92ZXIgPSBmYWxzZTtcclxuXHJcbiAgICBDYXJkRGlzcGxheVNldFRpbW91dCA9IG51bGw7XHJcbiAgICBUb3RhbENvdW50ZXJSZWFjaGVkID0gZmFsc2U7XHJcbiAgICBOb0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgSW5wdXRUZXN0RGljZTEoX3ZhbCkge1xyXG4gICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgX2RpY2VpbnB1dDEgPSBfdmFsO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIElucHV0VGVzdERpY2UyKF92YWwpIHtcclxuICAgIGlmIChfaXNUZXN0KSB7XHJcbiAgICAgIF9kaWNlaW5wdXQyID0gX3ZhbDtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNyZWdpb24gQWxsIEZ1bmN0aW9ucyBvZiBHYW1lTWFuYWdlclxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIGNsYXNzIGlzIGNyZWF0ZWRcclxuICAgKiovXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5SZXNldEFsbFZhcmlhYmxlcygpO1xyXG4gICAgdGhpcy5SZXNldFBheURheSgpO1xyXG4gICAgR2FtZU1hbmFnZXIuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgdGhpcy5UdXJuTnVtYmVyID0gMDtcclxuICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLlNlbGVjdGVkTW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICB0aGlzLkluaXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleCA9IDA7XHJcbiAgICB0aGlzLkNhcmRDb3VudGVyID0gMDtcclxuICAgIHRoaXMuQ2FyZERpc3BsYXllZCA9IGZhbHNlO1xyXG4gICAgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBSZXNldFBheURheSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicmVzZXRpbmcgcGF5ZGF5XCIpO1xyXG4gICAgX3NraXBOZXh0UGF5ZGF5ID0gZmFsc2U7XHJcbiAgICBfc2tpcEhNTmV4dFBheWRheSA9IGZhbHNlO1xyXG4gICAgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTtcclxuICAgIFBhc3NlZFBheURheSA9IGZhbHNlO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gZmFsc2U7XHJcbiAgICBfbmV4dFR1cm5oYWxmUGF5ID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gYXNzaWduIHJlZmVyZW5jZSBvZiByZXF1aXJlZCBjbGFzc2VzXHJcbiAgICoqL1xyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgaW5pdGlhbCBnYW1lbWFuYWdlciBlc3NldGlhbHNcclxuICAgKiovXHJcbiAgSW5pdF9HYW1lTWFuYWdlcigpIHtcclxuICAgIHRoaXMuQ2FtZXJhID0gdGhpcy5DYW1lcmFOb2RlLmdldENvbXBvbmVudChjYy5DYW1lcmEpO1xyXG4gICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm8gPSBbXTtcclxuICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIERpY2VSb2xsID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IHJlYWwgcGxheWVyc1xyXG4gICAgICAvL2lmIGpvaW5lZCBwbGF5ZXIgaXMgc3BlY3RhdGVcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IHRydWUpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwic3RhdHVzIG9mIGluaXRpYWwgYnVzaW5lc3Mgc2V0cDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKSk7XHJcblxyXG4gICAgICAgIC8vaWYgaW5pdGFsIHNldHVwIGhhcyBiZWVuIGRvbmUgYW5kIGdhbWUgaXMgdW5kZXIgd2F5XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIikgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgIHZhciBBbGxEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbyA9IEFsbERhdGE7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICB0aGlzLlR1cm5OdW1iZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiKTtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICAgICAgLy90aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gODtcclxuICAgICAgICAgIC8vdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Jbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IGJvdCBhbG9uZyB3aXRoIG9uZSBwbGF5ZXJcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLCBmYWxzZSwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBwdWJsaWMgZnVuY3Rpb25zIHRvIGdldCBkYXRhIChhY2Nlc3NpYmxlIGZyb20gb3RoZXIgY2xhc3NlcylcclxuICBHZXRUdXJuTnVtYmVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuVHVybk51bWJlcjtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGdldCBteSBpbmRleCBpbiBhcnJheSBvZiBQbGF5ZXJHYW1lSW5mbyBcclxuICAgKiovXHJcbiAgR2V0TXlJbmRleCgpIHtcclxuICAgIHZhciBteUluZGV4ID0gMDtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfYWxsQWN0b3JzID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FsbEFjdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9hY3Rvci5QbGF5ZXJVSUQgPT0gX2FsbEFjdG9yc1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgbXlJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG15SW5kZXg7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNwZWN0YXRlTW9kZSBDb2RlXHJcblxyXG4gIFN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpIHtcclxuICAgIHZhciBBbGxEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIpO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mbyA9IEFsbERhdGE7XHJcbiAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5DbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJzeW5jaW5nIGFsbCBkYXRhIGZvciBzcGVjdGF0ZVwiKTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXIgPiAwICYmIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPT0gdHJ1ZSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsIF90b1Bvcy55KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNldHRpbmcgcG9zMVwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjb3VudGVyOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkluaXRpYWwgQ291bnRlciBBc3NpZ25lZDogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jbml0aWFsQ291bnRlckFzc2lnbmVkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgZmluaXNoZWQgOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgdmFyIF9sYXN0SW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoIC0gMTtcclxuICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2xhc3RJbmRleF0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19sYXN0SW5kZXhdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKF90b1Bvcy54LCBfdG9Qb3MueSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXR0aW5nIHBvczJcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKFwic3luY2VkIHBsYXllcm5vZGVzXCIpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKCkge1xyXG4gICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgaWYgKFR1cm5DaGVja0FycmF5Lmxlbmd0aCA9PSBUb3RhbENvbm5lY3RlZFBsYXllcnMpIHtcclxuICAgICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgICAgdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgY29uc29sZS5sb2coXCJyZXNldGluZyBmb3Igc3BlY3RhdGVcIik7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gZnVuY3Rpb25zIHJlbGF0ZWQgdG8gVHVybiBNZWNoYW5pc20gYW5kIGNhcmQgbWVjaGFuaXNtXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSB3aGF0IGNhcmQgaGFzIGJlZW4gc2VsZWN0ZWQgYnkgcGxheWVyXHJcbiAgICoqL1xyXG4gIFJhaXNlRXZlbnRGb3JDYXJkKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDUsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBDbGVhckRpc3BsYXlUaW1lb3V0KCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICB9LFxyXG5cclxuICBEaXNwbGF5Q2FyZE9uT3RoZXJzKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FyZCBldmVudCByZWNlaXZlZDogXCIgKyBDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgICAgIGlmIChDYXJkRXZlbnRSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IodGhpcy5DYXJkQ291bnRlcik7XHJcbiAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMuQ2FyZERpc3BsYXllZCkge1xyXG4gICAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkID0gdHJ1ZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLkNhcmRDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKGZhbHNlLCB0aGlzLlJhbmRvbUNhcmRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIENhcmREaXNwbGF5U2V0VGltb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAvL2NoZWNrIGFmdGVyIGV2ZXJ5IDAuNSBzZWNvbmRzXHJcbiAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0Q2FyZERpc3BsYXkoKSB7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRGb3JDYXJkKF9kYXRhKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgY29uc29sZS5sb2coXCJDYXJkIERhdGEgUmVjZWl2ZWQ6XCIpO1xyXG4gICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG5cclxuICAgIHZhciBSYW5kb21DYXJkID0gX2RhdGEucmFuZG9tQ2FyZDtcclxuICAgIHZhciBjb3VudGVyID0gX2RhdGEuY291bnRlcjtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleCA9IFJhbmRvbUNhcmQ7XHJcbiAgICB0aGlzLkNhcmRDb3VudGVyID0gY291bnRlcjtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZSh0cnVlLCBSYW5kb21DYXJkKTtcclxuICAgICAgZWxzZSBDYXJkRXZlbnRSZWNlaXZlZCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSBmYWxzZSkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UodHJ1ZSwgUmFuZG9tQ2FyZCk7XHJcbiAgICAgIGVsc2UgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsIFJhbmRvbUNhcmQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUuZXJyb3IoQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSBwYXJ0aWN1bGFyIHBsYXllciBoYXMgY29tcGxldGUgdGhlaXIgbW92ZVxyXG4gICAqKi9cclxuICBSYWlzZUV2ZW50VHVybkNvbXBsZXRlKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwicmFpc2VkIGZvciB0dXJuIGNvbXBsZXRlXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN5bmNBbGxEYXRhKCkge1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsIHRoaXMuUGxheWVyR2FtZUluZm8sIHRydWUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlbW92ZUZyb21DaGVja0FycmF5KF91aWQpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHZhciBfaW5kID0gLTE7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgVHVybkNoZWNrQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKFR1cm5DaGVja0FycmF5W2luZGV4XSA9PSBfdWlkKSBfaW5kID0gaW5kZXg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfaW5kICE9IC0xKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyZW1vdmluZyBmcm9tIHR1cm4gY2hlY2sgYXJyYXlcIik7XHJcbiAgICAgICAgVHVybkNoZWNrQXJyYXkuc3BsaWNlKF9pbmQsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tUdXJuQ29tcGxldGUoKSB7XHJcbiAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bal0uSXNBY3RpdmUpIFRvdGFsQ29ubmVjdGVkUGxheWVycysrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiVHVybiBDaGVjazogXCIgKyBUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG4gICAgY29uc29sZS5sb2coXCJUb3RhbCBDb25uZWN0ZWQgUGxheWVyczogXCIgKyBUb3RhbENvbm5lY3RlZFBsYXllcnMpO1xyXG4gICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkpO1xyXG5cclxuICAgIGlmIChUdXJuQ2hlY2tBcnJheS5sZW5ndGggPj0gVG90YWxDb25uZWN0ZWRQbGF5ZXJzKSB7XHJcbiAgICAgIFR1cm5DaGVja0FycmF5ID0gW107XHJcbiAgICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IHRydWU7XHJcblxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyO1xyXG4gICAgICAgIC8vdGhpcy5TeW5jQWxsRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgVHVybiBpcyBjYWxsZWQgYnk6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgb24gYWxsIHBsYXllcnMgdG8gdmFsaWRhdGUgaWYgbW92ZSBpcyBjb21wbGV0ZWQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzXHJcbiAgICoqL1xyXG4gIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZShfdWlkKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL3JlYWwgcGxheWVyc1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChUdXJuQ2hlY2tBcnJheS5sZW5ndGggPT0gMCkgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTtcclxuXHJcbiAgICAgICAgdmFyIEFycmF5TGVuZ3RoID0gVHVybkNoZWNrQXJyYXkubGVuZ3RoO1xyXG4gICAgICAgIHZhciBJREZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEFycmF5TGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoVHVybkNoZWNrQXJyYXlbaW5kZXhdID09IF91aWQpIElERm91bmQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFJREZvdW5kKSB7XHJcbiAgICAgICAgICBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5DaGVja1R1cm5Db21wbGV0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gZGljZSBhbmltYXRpb24gaXMgcGxheWVkIG9uIGFsbCBwbGF5ZXJzXHJcbiAgICoqL1xyXG4gIENoYW5nZVR1cm4oKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB0aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuVHVybk51bWJlciA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkgdGhpcy5UdXJuTnVtYmVyID0gdGhpcy5UdXJuTnVtYmVyICsgMTtcclxuICAgIGVsc2UgdGhpcy5UdXJuTnVtYmVyID0gMDtcclxuXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsIHRoaXMuVHVybk51bWJlcik7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTb21lVmFsdWVzKCkge1xyXG4gICAgLy9UdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgLy90aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZVR1cm5Gb3JjZWZ1bGx5KCkge1xyXG4gICAgaWYgKElzVHdlZW5pbmcpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KEZvcmNlQ2hhbmdlVGltZU91dCk7XHJcbiAgICAgIEZvcmNlQ2hhbmdlVGltZU91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlVHVybkZvcmNlZnVsbHkoKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbGVhclRpbWVvdXQoRm9yY2VDaGFuZ2VUaW1lT3V0KTtcclxuICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVmlzdWFsRGF0YSgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBmcm9tIHJhaXNlIG9uIGV2ZW50IChmcm9tIGZ1bmN0aW9uIFwiU3RhcnRUdXJuXCIgYW5kIFwiQ2hhbmdlVHVyblwiIG9mIHRoaXMgc2FtZSBjbGFzcykgdG8gaGFuZGxlIHR1cm5cclxuICAgKiovXHJcbiAgVHVybkhhbmRsZXIoX3R1cm4pIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHZhciBfaXNNYXN0ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCgpO1xyXG4gICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bX3R1cm5dLklzQWN0aXZlKSB7XHJcbiAgICAgICAgaWYgKF9pc01hc3Rlcikge1xyXG4gICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3RoaXMuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgdGhpcy5VcGRhdGVWaXN1YWxEYXRhKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlR1cm46IFwiICsgX3R1cm4pO1xyXG4gICAgdmFyIF9wbGF5ZXJNYXRjaGVkID0gZmFsc2U7XHJcbiAgICBfc2tpcE5leHRUdXJuID0gZmFsc2U7XHJcbiAgICBpZiAoSXNUd2VlbmluZykge1xyXG4gICAgICAvL2NoZWNrIGlmIGFuaW1hdGlvbiBvZiB0dXJuIGJlaW5nIHBsYXllZCBvbiBvdGhlciBwbGF5ZXJzXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHtcclxuICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgdGhpcy5UdXJuSGFuZGxlcihfdHVybik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCA4MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5UdXJuTnVtYmVyID0gX3R1cm47XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIF9za2lwTmV4dFR1cm4gPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3ModHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICghX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIHlvdXIgdHVybiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJHYW1lT3Zlcik7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgX3NraXBOZXh0VHVybiA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICBpZiAoIXVzZXJHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSAvL3R1cm4gZGVjaXNpb25zIGZvciBib3RcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIF9za2lwTmV4dFR1cm4gPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgaWYgKCFCb3RHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmICghX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Sb2xsRGljZSgpO1xyXG4gICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlR1cm4gT2Y6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQWxsUGxheWVyVUlbdGhpcy5UdXJuTnVtYmVyXS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5QbGF5ZXJJbmZvKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL3NraXAgdGhpcyB0dXJuIGFzIHNraXAgdHVybiBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlXHJcbiAgICAgIGlmIChfcGxheWVyTWF0Y2hlZCAmJiBfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTa2lwcGluZyBjdXJyZW50IHR1cm5cIiwgMTIwMCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTa2lwTmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfcGxheWVyTWF0Y2hlZCAmJiB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZVVJRGF0YSgpO1xyXG4gIH0sXHJcblxyXG4gIFN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfaW5kKSB7XHJcbiAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgdmFyIE15RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgIHZhciBfY291bnRlciA9IF9pbmQ7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQpO1xyXG4gICAgLy8gIGNvbnNvbGUubG9nKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLklzQWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKF9jb3VudGVyIDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInN5bmNlZCBEYXRhOlwiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEID09IE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdID0gTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG5cclxuICAgICAgICAgIGlmIChfY291bnRlciA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYWRkaW5nIGNvdW50ZXI6IFwiK19jb3VudGVyKTtcclxuICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzeW5jZWQgRGF0YTpcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gYWxsIHBsYXllcnMgaGF2ZSBkb25lIHRoZWlyIGluaXRpYWwgc2V0dXAgYW5kIGZpcnN0IHR1cm4gc3RhcnRzXHJcbiAgICBAbWV0aG9kIFN0YXJ0VHVyblxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovXHJcbiAgU3RhcnRUdXJuKCkge1xyXG4gICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgdGhpcy5UdXJuTnVtYmVyID0gMDsgLy9yZXNldGluZyB0aGUgdHVybiBudW1iZXIgb24gc3RhcnQgb2YgdGhlIGdhbWVcclxuXHJcbiAgICAvL3NlbmRpbmcgaW5pdGlhbCB0dXJuIG51bWJlciBvdmVyIHRoZSBuZXR3b3JrIHRvIHN0YXJ0IHR1cm4gc2ltdWx0YW5vdXNseSBvbiBhbGwgY29ubmVjdGVkIHBsYXllcidzIGRldmljZXNcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMiwgdGhpcy5UdXJuTnVtYmVyKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlQmFua3J1cHREYXRhKF9kYXRhKSB7XHJcbiAgICAvL290aGVyIHBsYXllciBoYXMgYmVlbiBiYW5rcnVwdGVkXHJcbiAgICB2YXIgX2lzQmFua3J1cHRlZCA9IF9kYXRhLkRhdGEuYmFua3J1cHRlZDtcclxuICAgIHZhciBfdHVybiA9IF9kYXRhLkRhdGEudHVybjtcclxuICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YU1haW47XHJcblxyXG4gICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgLy8gY29uc29sZS5sb2coX2lzQmFua3J1cHRlZCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhfdHVybik7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhfcGxheWVyRGF0YSk7XHJcblxyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfdHVybl0gPSBfcGxheWVyRGF0YTtcclxuXHJcbiAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSh0cnVlKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXModHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSwgdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLCB0aGlzLlR1cm5OdW1iZXIsIHRydWUpO1xyXG4gICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTdGFydFR1cm5BZnRlckJhbmtydXB0KCkge1xyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkodHJ1ZSk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKHRydWUpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgfSwgMTAwMCk7XHJcblxyXG4gICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSwgdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLCB0aGlzLlR1cm5OdW1iZXIsIHRydWUpO1xyXG4gICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gRnVuY3Rpb24gZm9yIGdhbWVwbGF5XHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gYXNzaWduIHBsYXllciBVSSAobmFtZS9pY29ucy9udW1iZXIgb2YgcGxheWVycyB0aGF0IHRvIGJlIGFjdGl2ZSBldGMpXHJcbiAgICBAbWV0aG9kIEFzc2lnblBsYXllckdhbWVVSVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovXHJcbiAgQXNzaWduUGxheWVyR2FtZVVJKF9pc0JhbmtydXB0ZWQgPSBmYWxzZSkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGlmICghX2lzQmFua3J1cHRlZCkge1xyXG4gICAgICAgIHZhciBfcmFuZG9tSW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCB0aGlzLkJvdEdhbWVJbmZvLmxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mby5wdXNoKHRoaXMuQm90R2FtZUluZm9bX3JhbmRvbUluZGV4XSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gMjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUGxheWVySW5mbyA9IHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5TZXRBdmF0YXIodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySUQpO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBVcGRhdGVHYW1lVUkoX3RvZ2dsZUhpZ2hsaWdodCwgX2luZGV4KSB7XHJcbiAgICBpZiAoX3RvZ2dsZUhpZ2hsaWdodCkge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW19pbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUGxheWVySW5mbyA9IHRoaXMuUGxheWVyR2FtZUluZm9bX2luZGV4XTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX2luZGV4ID09IGluZGV4KSB7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5Ub2dnbGVCR0hpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5Ub2dnbGVCR0hpZ2hsaWdodGVyKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBlbmJhbGUgcmVzcGVjdGl2ZSBwbGF5ZXJzIG5vZGVzIGluc2lkZSBnYW1hcGxheVxyXG4gICAgQG1ldGhvZCBFbmFibGVQbGF5ZXJOb2Rlc1xyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovXHJcbiAgRW5hYmxlUGxheWVyTm9kZXMoX2lzQmFua3J1cHRlZCA9IGZhbHNlKSB7XHJcbiAgICBpZiAoIV9pc0JhbmtydXB0ZWQpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkhvbWVCYXNlZEFtb3VudCA9PSAxICYmICF0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jbml0aWFsQ291bnRlckFzc2lnbmVkKSB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudCA9PSAxICYmICF0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jbml0aWFsQ291bnRlckFzc2lnbmVkKSB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ib21lQmFzZWRBbW91bnQgPT0gMSkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLngsIHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLnkpO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQnJpY2tBbmRNb3J0YXJBbW91bnQgPT0gMSkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLngsIHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXZhdGFyU3ByaXRlc1t0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRF07XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpIHtcclxuICAgIGxldCB0YXJnZXRQb3MgPSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwgMTIwKSk7XHJcbiAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb24gPSB0aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcblxyXG4gICAgbGV0IHJhdGlvID0gdGFyZ2V0UG9zLnkgLyBjYy53aW5TaXplLmhlaWdodDtcclxuICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IDI7XHJcbiAgfSxcclxuXHJcbiAgbGF0ZVVwZGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmlzQ2FtZXJhWm9vbWluZykgdGhpcy5TZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKCk7XHJcbiAgfSxcclxuXHJcbiAgc3luY0RpY2VSb2xsKF9yb2xsKSB7XHJcbiAgICB2YXIgX2RpY2UxID0gX3JvbGwuZGljZTE7XHJcbiAgICB2YXIgX2RpY2UyID0gX3JvbGwuZGljZTI7XHJcbiAgICB2YXIgX3Jlc3VsdCA9IF9kaWNlMSArIF9kaWNlMjtcclxuXHJcbiAgICBJc1R3ZWVuaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMuQ2FyZERpc3BsYXllZCA9IGZhbHNlO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbWF0Y2hlZDpcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID09IDAgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzWzBdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgUm9sbENvdW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgUm9sbENvdW50ZXIgPSAxNDtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9PSAxMykgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyICsgMjI7XHJcbiAgICAgIGVsc2UgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyICsgMTtcclxuXHJcbiAgICAgIFJvbGxDb3VudGVyID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyIC0gMSk7XHJcbiAgICB9XHJcblxyXG4gICAgRGljZVJvbGwgPSBfcmVzdWx0O1xyXG4gICAgRGljZVRlbXAgPSAwO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbihEaWNlUm9sbCk7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLlR1cm5OdW1iZXIgPT0gaW5kZXgpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmdldENvbXBvbmVudChcIkRpY2VDb250cm9sbGVyXCIpLkFuaW1hdGVEaWNlKF9kaWNlMSwgX2RpY2UyKTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuVXBkYXRlVUlEYXRhKCk7XHJcbiAgICAvLyBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgLy8gdmFyIF9wb3M9dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgLy8gdGhpcy5Ud2VlbkNhbWVyYShfcG9zLHRydWUsMC40KTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVVSURhdGEoKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBEaWNlRnVudGlvbmFsaXR5KCkge1xyXG4gICAgbGV0IHRhcmdldFBvcyA9IHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLCAxMjApKTtcclxuICAgIHZhciBfcG9zID0gdGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgdGhpcy5Ud2VlbkNhbWVyYShfcG9zLCB0cnVlLCAwLjQpO1xyXG4gIH0sXHJcblxyXG4gIFRlbXBDaGVja1NwYWNlKF9yb2xsaW5nKSB7XHJcbiAgICB2YXIgdGVtcGNvdW50ZXIgPSAwO1xyXG4gICAgdmFyIHRlbXBjb3VudGVyMiA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEID09IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIHRlbXBjb3VudGVyMiA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0ZW1wY291bnRlcjIgLSAxIDwgMCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwic3RhcnRpbmcgZnJvbSBvYmxpdmlvblwiKTtcclxuICAgICAgdGVtcGNvdW50ZXIgPSB0ZW1wY291bnRlcjIgKyBfcm9sbGluZyAtIDE7XHJcbiAgICAgIHZhciBkaWNldG9iZSA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIiArIGRpY2V0b2JlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRlbXBjb3VudGVyID0gdGVtcGNvdW50ZXIyICsgX3JvbGxpbmc7XHJcbiAgICAgIHZhciBkaWNldG9iZSA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIiArIGRpY2V0b2JlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSb2xsRGljZTogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgIHZhciBEaWNlMTtcclxuICAgICAgdmFyIERpY2UyO1xyXG4gICAgICBpZiAoX2lzVGVzdCAmJiB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICBEaWNlMSA9IHBhcnNlSW50KF9kaWNlaW5wdXQxKTtcclxuICAgICAgICBEaWNlMiA9IHBhcnNlSW50KF9kaWNlaW5wdXQyKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gdHJ1ZSAmJiBfaXNUZXN0KSB7XHJcbiAgICAgICAgRGljZTEgPSAxO1xyXG4gICAgICAgIERpY2UyID0gMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgICAgIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMSA9PSBEaWNlMSkgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICAgICAgaWYgKFByZXZpb3VzRGljZVJvbGwyID09IERpY2UyKSBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsMSA9IERpY2UxO1xyXG4gICAgICAgIFByZXZpb3VzRGljZVJvbGwyID0gRGljZTI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHZhciBEaWNlMT0yMDtcclxuICAgICAgLy8gdmFyIERpY2UyPTE7XHJcblxyXG4gICAgICBEaWNlUm9sbCA9IERpY2UxICsgRGljZTI7XHJcbiAgICAgIHZhciBfbmV3Um9sbCA9IHsgZGljZTE6IERpY2UxLCBkaWNlMjogRGljZTIgfTtcclxuICAgICAgLy9EaWNlUm9sbD0yMztcclxuICAgICAgLy90aGlzLlRlbXBDaGVja1NwYWNlKERpY2VSb2xsKTtcclxuICAgICAgY29uc29sZS5sb2coXCJkaWNlIG51bWJlcjogXCIgKyBEaWNlUm9sbCArIFwiLCBEaWNlMTpcIiArIERpY2UxICsgXCIsIERpY2UyOlwiICsgRGljZTIpO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgzLCBfbmV3Um9sbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUm9sbE9uZURpY2UoKSB7XHJcbiAgICB2YXIgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDUgPT0gRGljZTEpIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgUHJldmlvdXNEaWNlUm9sbDUgPSBEaWNlMTtcclxuXHJcbiAgICByZXR1cm4gRGljZTE7XHJcbiAgfSxcclxuXHJcbiAgUm9sbFR3b0RpY2VzKCkge1xyXG4gICAgdmFyIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcbiAgICB2YXIgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDMgPT0gRGljZTEpIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGw0ID09IERpY2UyKSBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIFByZXZpb3VzRGljZVJvbGwzID0gRGljZTE7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsNCA9IERpY2UyO1xyXG5cclxuICAgIHJldHVybiBEaWNlMSArIERpY2UyO1xyXG4gIH0sXHJcblxyXG4gIFBvcHVsYXRlRGVja3NBcnJheShfaXNCaWdCdXNpbmVzcyA9IGZhbHNlLCBfaXNMb3NzZXMgPSBmYWxzZSwgX2lzTWFya2V0aW5nID0gZmFsc2UsIF9pc1dpbGRDYXJkID0gZmFsc2UsIF9kYXRhID0gbnVsbCkge1xyXG4gICAgLy8gQmlnQnVzaW5lc3NBcnJheSA9IFtdO1xyXG4gICAgLy8gTG9zc2VzQXJyYXkgPSBbXTtcclxuICAgIC8vIE1hcmtldGluZ0FycmF5ID0gW107XHJcbiAgICAvLyBXaWxkQ2FyZEFycmF5ID0gW107XHJcbiAgICAvLyBCaWdCdXNpbmVzc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAvLyBMb3NzZXNBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgLy8gTWFya2V0aW5nQXJyYXlDb3VudGVyID0gMDtcclxuICAgIC8vIFdpbGRDYXJkQXJyYXlDb3VudGVyID0gMDtcclxuXHJcbiAgICBpZiAoX2lzQmlnQnVzaW5lc3MpIHtcclxuICAgICAgaWYgKF9kYXRhID09IG51bGwpIHtcclxuICAgICAgICBCaWdCdXNpbmVzc0FycmF5ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDEwXTtcclxuXHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhCaWdCdXNpbmVzc0FycmF5KTtcclxuICAgICAgICBCaWdCdXNpbmVzc0FycmF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBCaWdCdXNpbmVzc0FycmF5LCBMb3NzQXJyYXk6IG51bGwsIE1hcmtldEFycmF5OiBudWxsLCBXaWxkQXJyeWE6IG51bGwgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE5LCBfdGVtcERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9pc0xvc3Nlcykge1xyXG4gICAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgIExvc3Nlc0FycmF5ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNF07XHJcblxyXG4gICAgICAgIExvc3Nlc0FycmF5LnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKExvc3Nlc0FycmF5KTtcclxuICAgICAgICBMb3NzZXNBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogbnVsbCwgTG9zc0FycmF5OiBMb3NzZXNBcnJheSwgTWFya2V0QXJyYXk6IG51bGwsIFdpbGRBcnJ5YTogbnVsbCB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTksIF90ZW1wRGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2lzTWFya2V0aW5nKSB7XHJcbiAgICAgIGlmIChfZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXkgPSBbMCwgMSwgMiwgMywgNCwgNSwgNywgOCwgOSwgMTNdO1xyXG5cclxuICAgICAgICBNYXJrZXRpbmdBcnJheS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhNYXJrZXRpbmdBcnJheSk7XHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXlDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IG51bGwsIExvc3NBcnJheTogbnVsbCwgTWFya2V0QXJyYXk6IE1hcmtldGluZ0FycmF5LCBXaWxkQXJyeWE6IG51bGwgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE5LCBfdGVtcERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9pc1dpbGRDYXJkKSB7XHJcbiAgICAgIGlmIChfZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgV2lsZENhcmRBcnJheSA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XHJcblxyXG4gICAgICAgIFdpbGRDYXJkQXJyYXkuc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coV2lsZENhcmRBcnJheSk7XHJcbiAgICAgICAgV2lsZENhcmRBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogbnVsbCwgTG9zc0FycmF5OiBudWxsLCBNYXJrZXRBcnJheTogbnVsbCwgV2lsZEFycnlhOiBXaWxkQ2FyZEFycmF5IH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxOSwgX3RlbXBEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgIGlmIChfZGF0YS5CaWdBcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheSA9IF9kYXRhLkJpZ0FycmF5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEJpZ0J1c2luZXNzQXJyYXkpO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9kYXRhLkxvc3NBcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgTG9zc2VzQXJyYXkgPSBfZGF0YS5Mb3NzQXJyYXk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTG9zc2VzQXJyYXkpO1xyXG4gICAgICAgIExvc3Nlc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfZGF0YS5NYXJrZXRBcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXkgPSBfZGF0YS5NYXJrZXRBcnJheTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNYXJrZXRpbmdBcnJheSk7XHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXlDb3VudGVyID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9kYXRhLldpbGRBcnJ5YSAhPSBudWxsKSB7XHJcbiAgICAgICAgV2lsZENhcmRBcnJheSA9IF9kYXRhLldpbGRBcnJ5YTtcclxuICAgICAgICBjb25zb2xlLmxvZyhXaWxkQ2FyZEFycmF5KTtcclxuICAgICAgICBXaWxkQ2FyZEFycmF5Q291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZXRCaWdCdXNpbmVzc0luZGV4KF9pbmRleCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChCaWdCdXNpbmVzc0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyIDwgQmlnQnVzaW5lc3NBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gQmlnQnVzaW5lc3NBcnJheVtCaWdCdXNpbmVzc0FycmF5Q291bnRlcl07XHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIrKztcclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogdHJ1ZSwgTG9zc0FycmF5OiBmYWxzZSwgTWFya2V0QXJyYXk6IGZhbHNlLCBXaWxkQXJyeWE6IGZhbHNlIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyMCwgX3RlbXBEYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheSh0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkodHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3ZhbDtcclxuICB9LFxyXG5cclxuICBHZXRMb3NzZXNJbmRleChfaW5kZXgpIHtcclxuICAgIHZhciBfdmFsID0gLTE7XHJcbiAgICBpZiAoTG9zc2VzQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoTG9zc2VzQXJyYXlDb3VudGVyIDwgTG9zc2VzQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgX3ZhbCA9IExvc3Nlc0FycmF5W0xvc3Nlc0FycmF5Q291bnRlcl07XHJcbiAgICAgICAgTG9zc2VzQXJyYXlDb3VudGVyKys7XHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IGZhbHNlLCBMb3NzQXJyYXk6IHRydWUsIE1hcmtldEFycmF5OiBmYWxzZSwgV2lsZEFycnlhOiBmYWxzZSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjAsIF90ZW1wRGF0YSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkoZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgbnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0TWFya2V0aW5nSW5kZXgoX2luZGV4KSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKE1hcmtldGluZ0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKE1hcmtldGluZ0FycmF5Q291bnRlciA8IE1hcmtldGluZ0FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBNYXJrZXRpbmdBcnJheVtNYXJrZXRpbmdBcnJheUNvdW50ZXJdO1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5Q291bnRlcisrO1xyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBmYWxzZSwgTG9zc0FycmF5OiBmYWxzZSwgTWFya2V0QXJyYXk6IHRydWUsIFdpbGRBcnJ5YTogZmFsc2UgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIwLCBfdGVtcERhdGEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIEdldFdpbGRDYXJkSW5kZXgoX2luZGV4KSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKFdpbGRDYXJkQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoV2lsZENhcmRBcnJheUNvdW50ZXIgPCBXaWxkQ2FyZEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBXaWxkQ2FyZEFycmF5W1dpbGRDYXJkQXJyYXlDb3VudGVyXTtcclxuICAgICAgICBXaWxkQ2FyZEFycmF5Q291bnRlcisrO1xyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBmYWxzZSwgTG9zc0FycmF5OiBmYWxzZSwgTWFya2V0QXJyYXk6IGZhbHNlLCBXaWxkQXJyeWE6IHRydWUgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIwLCBfdGVtcERhdGEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUNvdW50ZXJzKF9kYXRhID0gbnVsbCkge1xyXG4gICAgaWYgKF9kYXRhLkJpZ0FycmF5KSB7XHJcbiAgICAgIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyKys7XHJcbiAgICB9XHJcbiAgICBpZiAoX2RhdGEuTG9zc0FycmF5KSB7XHJcbiAgICAgIExvc3Nlc0FycmF5Q291bnRlcisrO1xyXG4gICAgfVxyXG4gICAgaWYgKF9kYXRhLk1hcmtldEFycmF5KSB7XHJcbiAgICAgIE1hcmtldGluZ0FycmF5Q291bnRlcisrO1xyXG4gICAgfVxyXG4gICAgaWYgKF9kYXRhLldpbGRBcnJ5YSkge1xyXG4gICAgICBXaWxkQ2FyZEFycmF5Q291bnRlcisrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbGVjdFJlbGF0ZWRDYXJkKF9pc0JpZ0J1c2luZXNzID0gZmFsc2UsIF9pc0xvc3NlcyA9IGZhbHNlLCBfaXNNYXJrZXRpbmcgPSBmYWxzZSwgX2lzV2lsZENhcmQgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc0JpZ0J1c2luZXNzKSB7XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0QmlnQnVzaW5lc3NJbmRleCgpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRCaWdCdXNpbmVzc0luZGV4KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldEJpZ0J1c2luZXNzSW5kZXgoKTtcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRCaWdCdXNpbmVzc0luZGV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNMb3NzZXMpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRMb3NzZXNJbmRleCgpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRMb3NzZXNJbmRleCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRMb3NzZXNJbmRleCgpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgaW5kZXggPSB0aGlzLkdldExvc3Nlc0luZGV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNNYXJrZXRpbmcpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRNYXJrZXRpbmdJbmRleCgpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRNYXJrZXRpbmdJbmRleCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRNYXJrZXRpbmdJbmRleCgpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgaW5kZXggPSB0aGlzLkdldE1hcmtldGluZ0luZGV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNXaWxkQ2FyZCkge1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldFdpbGRDYXJkSW5kZXgoKTtcclxuICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0V2lsZENhcmRJbmRleCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRXaWxkQ2FyZEluZGV4KCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0V2lsZENhcmRJbmRleCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjYWxsVXBvbkNhcmQoKSB7XHJcbiAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBfc3BhY2VJRCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICBpZiAoX3NwYWNlSUQgIT0gNiAmJiBfc3BhY2VJRCAhPSA3KSB7XHJcbiAgICAgICAgICAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVhbnMgc2VsbCBzcGFjZVxyXG4gICAgICAgICAgdmFyIFJhbmRvbUNhcmQgPSB0aGlzLmdldFJhbmRvbSgwLCAxNSk7XHJcblxyXG4gICAgICAgICAgaWYgKF9zcGFjZUlEID09IDIpIHtcclxuICAgICAgICAgICAgLy9sYW5kZWQgb24gYmlnIGJ1c2luZXNzIGNhcmRzXHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB0aGlzLlNlbGVjdFJlbGF0ZWRDYXJkKHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSA1O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSA1KSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgbG9zc2VzIGNhcmRzXHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB0aGlzLlNlbGVjdFJlbGF0ZWRDYXJkKGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSAxNDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3NwYWNlSUQgPT0gMykge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIG1hcmtldGluZyBjYXJkc1xyXG4gICAgICAgICAgICBSYW5kb21DYXJkID0gdGhpcy5TZWxlY3RSZWxhdGVkQ2FyZChmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gNTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3NwYWNlSUQgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIHdpbGQgY2FyZHNcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHRoaXMuU2VsZWN0UmVsYXRlZENhcmQoZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIFJhbmRvbUNhcmQgPSA5O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoX3NwYWNlSUQpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIHJlYWwgcGxheWVyXHJcbiAgICAgICAgICAgIGlmIChfc3BhY2VJRCA9PSAxMikge1xyXG4gICAgICAgICAgICAgIC8vIGlmIHBsYXllciBsYW5kZWQgb24gZmluaXNoIHNwYWNlXHJcbiAgICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDU7XHJcbiAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YSA9IHsgcmFuZG9tQ2FyZDogUmFuZG9tQ2FyZCwgY291bnRlcjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICAgICAgaWYgKF9zcGFjZUlEID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgLy8gaWYgcGxheWVyIGxhbmRlZCBvbiBmaW5pc2ggc3BhY2VcclxuICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGEgPSB7IHJhbmRvbUNhcmQ6IFJhbmRvbUNhcmQsIGNvdW50ZXI6IFJvbGxDb3VudGVyIH07XHJcbiAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIEJvdEdhbWVPdmVyKSB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIHVzZXJHYW1lT3ZlcikgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wbGV0ZSB0dXJuIGlzIGNhbGxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKHRydWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBsZXRlQ2FyZFR1cm4oKSB7XHJcbiAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gIH0sXHJcblxyXG4gIENhbGxHYW1lQ29tcGxldGUoX2lzQm90ID0gZmFsc2UsIF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgLy8gaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgIC8vICAgICB0aGlzLlR1cm5OdW1iZXIgPSB0aGlzLkdldE15SW5kZXgoKTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gMDtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicGxheWVyIGlzIG5vdCBhY3RpdmUgcmV0dXJuaW5nXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY2FsY3VsYXRpbmcuLi4uXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJhZ21lIGlzIG5vdCBmaW5pc2hlZFwiKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgdmFyIF9jYXNoID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgICAgICB2YXIgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICB2YXIgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgIHZhciBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICAgIGxvYW5BbW91bnQgKz0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIF9nb2xkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudDtcclxuICAgICAgICAgIHZhciBfc3RvY2tzID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgIHZhciBPbmNlT3JTaGFyZSA9IF9kaWNlUmFuZG9tICogMTAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgR29sZENhc2ggPSBPbmNlT3JTaGFyZSAqIF9nb2xkO1xyXG4gICAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgICB2YXIgQk1DYXNoID0gKEJNQW1vdW50ICsgQk1Mb2NhdGlvbnMpICogMTUwMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBITUNhc2ggPSAwO1xyXG4gICAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMikgSE1DYXNoID0gMjUwMDAgKyA2MDAwMDtcclxuICAgICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDMpIEhNQ2FzaCA9IDI1MDAwICsgMjUwMDAgKyA2MDAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTY29yZSA9IFRvdGFsQXNzZXRzO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsSEJDYXNoID0gSE1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsR29sZENhc2ggPSBHb2xkQ2FzaDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFN0b2Nrc0Nhc2ggPSBTdG9ja0Nhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0pO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0YSBwdXNoZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBfcGxheWVySW5kZXggPSAwOyBfcGxheWVySW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgX3BsYXllckluZGV4KyspIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX2Nhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICB2YXIgSE1BbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICB2YXIgQk1Mb2NhdGlvbnMgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBsb2FuQW1vdW50ICs9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBfZ29sZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ7XHJcbiAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICB2YXIgT25jZU9yU2hhcmUgPSBfZGljZVJhbmRvbSAqIDEwMDA7XHJcblxyXG4gICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgdmFyIEJNQ2FzaCA9IChCTUFtb3VudCArIEJNTG9jYXRpb25zKSAqIDE1MDAwMDtcclxuXHJcbiAgICAgICAgdmFyIEhNQ2FzaCA9IDA7XHJcbiAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDIpIEhNQ2FzaCA9IDI1MDAwICsgNjAwMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMykgSE1DYXNoID0gMjUwMDAgKyAyNTAwMCArIDYwMDAwO1xyXG5cclxuICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU2NvcmUgPSBUb3RhbEFzc2V0cztcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxIQkNhc2ggPSBITUNhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEdvbGRDYXNoID0gR29sZENhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU3RvY2tzQ2FzaCA9IFN0b2NrQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDYsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50VG9TeW5jR2FtZUNvbXBsZXRlRGF0YShfZGF0YSkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNiwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFN5bmNHYW1lT3ZlcihfVUlEKSB7XHJcbiAgICB2YXIgaW5mb1RleHQgPSBcIlwiO1xyXG4gICAgdmFyIHN0YXR1c1RleHQgPSBcIlwiO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGlmICghR2FtZUNvbXBsZXRlZCkge1xyXG4gICAgICAgIEdhbWVDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdERhdGEoKTtcclxuICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgIHZhciBNeURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHtcclxuICAgICAgICAgIHZhciBfaW5kZXggPSAtMTtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAgICAgICBfaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkdhbWUgd29uIGJ5IFwiICsgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCA9PSBfVUlEKSB7XHJcbiAgICAgICAgICAgIC8veW91IHdvblxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJDb25ncmF0cyEgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiO1xyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIF9jdXJyZW50Q2FzaCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoKTtcclxuICAgICAgICAgICAgdmFyIF90b3RhbCA9IF9jdXJyZW50Q2FzaCArIHBhcnNlSW50KE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IF90b3RhbC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIF93b24gPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbik7XHJcbiAgICAgICAgICAgIF93b24gPSBfd29uICsgMTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb24gPSBfd29uLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5VcGRhdGVVc2VyRGF0YSgtMSwgX3dvbiwgLTEpO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJVbmZvcnR1bmF0ZWx5ISB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiO1xyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vd2l0aCBib3RcclxuICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICB2YXIgTXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKE15RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzBdLkdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmIChNeURhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICBzdGF0dXNUZXh0ID0gXCJDb25ncmF0cyEgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiO1xyXG4gICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiT3RoZXIgUGxheWVyIEVhcm5lZCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMV0uVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICB2YXIgX2N1cnJlbnRDYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgICAgIHZhciBfdG90YWwgPSBfY3VycmVudENhc2ggKyBwYXJzZUludChNeURhdGEuVG90YWxTY29yZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2ggPSBfdG90YWwudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgdmFyIF93b24gPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbik7XHJcbiAgICAgICAgX3dvbiA9IF93b24gKyAxO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uID0gX3dvbi50b1N0cmluZygpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKC0xLCBfd29uLCAtMSk7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL3lvdSBsb3NlXHJcblxyXG4gICAgICAgIHN0YXR1c1RleHQgPSBcIlVuZm9ydHVuYXRlbHkhIHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLkNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJPdGhlciBQbGF5ZXIgRWFybmVkIENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1sxXS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN5bmNHYW1lQ29tcGxldGVEYXRhKF9kYXRhKSB7XHJcbiAgICB2YXIgX2lzQm90ID0gX2RhdGEuQm90O1xyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUodHJ1ZSwgZmFsc2UpO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIkdhbWUgb3ZlciwgY2FsY3VsYXRpbmcgdG90YWwgY2FzaC4uLlwiLCAxNTAwLCBmYWxzZSk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dE9ubHkoKTtcclxuXHJcbiAgICAgICAgdmFyIG1heCA9IC0xO1xyXG4gICAgICAgIHZhciBTZWxlY3RlZEluZCA9IDA7XHJcbiAgICAgICAgdmFyIFNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG5cclxuICAgICAgICAgIGlmIChfdmFsdWUgPiBtYXgpIHtcclxuICAgICAgICAgICAgU2VsZWN0ZWRJbmQgPSBpbmRleDtcclxuICAgICAgICAgICAgbWF4ID0gX3ZhbHVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKFNlc3Npb25EYXRhW2luZGV4XS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF92YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLnRyYWNlKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIiArIFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgfSwgMTUwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZShmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiR2FtZSBvdmVyLCBjYWxjdWxhdGluZyB0b3RhbCBjYXNoLi4uXCIsIDE1MDAsIGZhbHNlKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKSk7XHJcbiAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgICAgdmFyIG1heCA9IC0xO1xyXG4gICAgICAgICAgdmFyIFNlbGVjdGVkSW5kID0gMDtcclxuICAgICAgICAgIHZhciBTZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhTZXNzaW9uRGF0YSk7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoX3ZhbHVlID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBTZWxlY3RlZEluZCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gX3ZhbHVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKFNlc3Npb25EYXRhW2luZGV4XS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS50cmFjZShcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIgKyBTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFsbFBsYXllcnNHYW1lQ29tcGxldGVkKF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IEJvdDogX2lzQm90IH07XHJcbiAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhKF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBHYW1lT3ZlcihfZm9yY2VHYW1lT3ZlciA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgIHZhciBwbGF5ZXJjb21wbGV0ZWQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIC8vICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jc0FjdGl2ZSA9PSBmYWxzZSB8fCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjb21wbGV0ZWQ6IFwiICsgcGxheWVyY29tcGxldGVkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBnYW1laW5mbyBsZW5ndGg6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpO1xyXG4gICAgICAgIGlmIChwbGF5ZXJjb21wbGV0ZWQgPj0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGggfHwgX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgICAgIC8vZ2FtZSBjb21wbGV0ZWQgb24gYWxsIHN5c3RlbVxyXG4gICAgICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgICBpZiAoX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KSBCb3RHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgIGVsc2UgdXNlckdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwidXNlcmdhbWVvdmVyOiBcIiArIHVzZXJHYW1lT3Zlcik7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYm90Z2FtZW92ZXI6IFwiICsgQm90R2FtZU92ZXIpO1xyXG4gICAgICAvLyB0aGlzLkNhbGxHYW1lQ29tcGxldGUodHJ1ZSk7XHJcbiAgICAgIHZhciBwbGF5ZXJjb21wbGV0ZWQgPSAwO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uaXNHYW1lRmluaXNoZWQpIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGxheWVyY29tcGxldGVkID09IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKSB7XHJcbiAgICAgICAgLy9nYW1lY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1zXHJcbiAgICAgICAgQm90R2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIHVzZXJHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgU3RhcnREaWNlUm9sbDogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFJvbGxDb3VudGVyID49IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJHYW1lb3ZlclwiKTtcclxuICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkdhbWVPdmVyKGZhbHNlKTtcclxuICAgICAgfSwgMTUwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICBEaWNlVGVtcCA9IERpY2VUZW1wICsgMTtcclxuICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5Ud2VlblBsYXllcih0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1Bvcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRSYW5kb206IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICB9LFxyXG5cclxuICBUd2VlbkNhbWVyYTogZnVuY3Rpb24gKF9wb3MsIGlzWm9vbSwgdGltZSkge1xyXG4gICAgY2MudHdlZW4odGhpcy5DYW1lcmFOb2RlKVxyXG4gICAgICAudG8odGltZSwgeyBwb3NpdGlvbjogY2MudjIoX3Bvcy54LCBfcG9zLnkpIH0sIHsgZWFzaW5nOiBcInF1YWRJbk91dFwiIH0pXHJcbiAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZiAoaXNab29tKSB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICAgIGVsc2UgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIFpvb21DYW1lcmFJbigpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5DYW1lcmEuem9vbVJhdGlvIDwgMikge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IHRoaXMuQ2FtZXJhLnpvb21SYXRpbyArIDAuMDM7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAyO1xyXG4gICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIENoZWNrUGF5RGF5Q29uZGl0aW9ucyhfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYpIHtcclxuICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSBQYXNzZWRQYXlEYXlDb3VudGVyICsgMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3KSB7XHJcbiAgICAgICAgRG91YmxlUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5O1xyXG4gICAgX25leHRUdXJuaGFsZlBheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkhhbGZQYXlEYXk7XHJcblxyXG4gICAgaWYgKFBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5ICYmICFfbmV4dFR1cm5Eb3VibGVQYXkpIHtcclxuICAgICAgLy90aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgLy90aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UsIF9pc0JvdCk7XHJcbiAgICB9IGVsc2UgaWYgKERvdWJsZVBheURheSB8fCAoUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkpIHtcclxuICAgICAgLy90aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgLy90aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24odHJ1ZSwgX2lzQm90KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgWm9vbUNhbWVyYU91dE9ubHkoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA+PSAxKSB7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSB0aGlzLkNhbWVyYS56b29tUmF0aW8gLSAwLjAzO1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dE9ubHkoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb24gPSBjYy5WZWMyKDAsIDApO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IDE7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICB9LFxyXG5cclxuICBab29tQ2FtZXJhT3V0KCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkNhbWVyYS56b29tUmF0aW8gPj0gMSkge1xyXG4gICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gdGhpcy5DYW1lcmEuem9vbVJhdGlvIC0gMC4wMztcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb24gPSBjYy5WZWMyKDAsIDApO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IDE7XHJcbiAgICAgICAgLy8gSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5QcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24oMCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ICYmICFCb3RHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgJiYgIXVzZXJHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAvL3JlYWwgcGxheWVyXHJcbiAgICAgICAgICBpZiAoUGxheWVyTGVmdCkge1xyXG4gICAgICAgICAgICAvLyBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFBsYXllckxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnMoKTtcclxuICAgICAgICAgIGVsc2UgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICB9LFxyXG5cclxuICBUd2VlblBsYXllcjogZnVuY3Rpb24gKE5vZGUsIFRvUG9zKSB7XHJcbiAgICB2YXIgc3BlZWQgPSAwLjQ7XHJcbiAgICAvL2lmIChfaXNUZXN0KSBzcGVlZCA9IDAuMDQ7XHJcblxyXG4gICAgY2MudHdlZW4oTm9kZSkgLy8wLjRcclxuICAgICAgLnRvKHNwZWVkLCB7IHBvc2l0aW9uOiBjYy52MihUb1Bvcy54LCBUb1Bvcy55KSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKERpY2VUZW1wIDwgRGljZVJvbGwpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKERpY2VUZW1wICsgXCIgXCIgKyBSb2xsQ291bnRlcik7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpIHtcclxuICAgICAgICAgICAgICBpZiAoIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2IHx8XHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3XHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJvdCBnYW1lIGlzIG92ZXJcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmICghdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2IHx8XHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3XHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLyBjb25zb2xlLmVycm9yKFBhc3NlZFBheURheUNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgZ2FtZSBpcyBvdmVyIHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coUGFzc2VkUGF5RGF5KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYpIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICBEb3VibGVQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIGZpbmlzaGVkIGZvcjogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoUm9sbENvdW50ZXIgPT0gMTMpIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyAyMjtcclxuICAgICAgICAgICAgZWxzZSBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyAxO1xyXG4gICAgICAgICAgICBEaWNlVGVtcCA9IERpY2VSb2xsO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vRGljZVRlbXA9RGljZVRlbXArMTtcclxuICAgICAgICAgIC8vICBjb25zb2xlLmxvZyhEaWNlVGVtcCArIFwiIFwiICsgUm9sbENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgLy90aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBfbmV3cG9zID0gY2MuVmVjMigwLCAwKTtcclxuICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcywgZmFsc2UsIDAuNik7IC8vem9vbW91dFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgLy9ydWxlcyBpbXBsbWVudGF0aW9uIGR1cmluZyB0dXJuICh0dXJuIGRlY2lzaW9ucylcclxuXHJcbiAgVG9nZ2xlUGF5RGF5KF9zdDEsIF9TdDIpIHtcclxuICAgIFBhc3NlZFBheURheSA9IF9zdDE7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfU3QyO1xyXG5cclxuICAgIGlmICghX3N0MSkge1xyXG4gICAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9TdDIpIHtcclxuICAgICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5jcmVhc2VEb3VibGVQYXlEYXkoKSB7XHJcbiAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgfSxcclxuXHJcbiAgRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKGFtb3VudCwgX2luZGV4LCBfbG9jYXRpb25OYW1lLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoIDwgMykge1xyXG4gICAgICBpZiAoIV9pc0NhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCAtIGFtb3VudDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCArIDE7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5wdXNoKF9sb2NhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLCAxMDAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgIH0sIDEyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2ggdG8gZXhwYW5kIHRoaXMgYnVzaW5lc3MsIGNhc2ggbmVlZGVkICQgXCIgKyBhbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX0dpdmVuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIF9HaXZlbkNhc2ggPSBfR2l2ZW5DYXNoIC0gYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ICsgMTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsIDEwMDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIiArIGFtb3VudCArIFwiLCBDYXNoIEdpdmVuICRcIiArIF9HaXZlbkNhc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGxvY2F0aW9uc1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChwYXJzZUludCh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIC8vdGhpcyBtZWFucyB0aGVyZSBpcyBicmljayBhbmQgbW9ydGFyIGluIGxpc3RcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRCdXNpbmVzc0luZGV4KGkpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldENhcmRGdW5jdGlvbmFsaXR5KF9pc0NhcmRGdW5jdGlvbmFsaXR5KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRHaXZlbkNhc2goX0dpdmVuQ2FzaCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlJlc2V0RWRpdEJveCgpO1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhCdXNpbmVzc0xvY2F0aW9uTm9kZXMpO1xyXG4gICAgcmV0dXJuIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7XHJcbiAgfSxcclxuXHJcbiAgRGVzdHJveUdlbmVyYXRlZE5vZGVzKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbihfbmFtZSwgX1NoYXJlQW1vdW50LCBfaXNBZGRpbmcpIHtcclxuICAgIGlmIChfaXNBZGRpbmcpIHtcclxuICAgICAgdmFyIF9zdG9jayA9IG5ldyBTdG9ja0luZm8oKTtcclxuICAgICAgX3N0b2NrLkJ1c2luZXNzTmFtZSA9IF9uYW1lO1xyXG4gICAgICBfc3RvY2suU2hhcmVBbW91bnQgPSBfU2hhcmVBbW91bnQ7XHJcblxyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZlN0b2Nrcy5wdXNoKF9zdG9jayk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfZm9yU2VsZWN0ZWRCdXNpbmVzcyA9IGZhbHNlLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMCwgSEJBbW91bnQgPSAwLCBCTUFtb3VudCA9IDAsIEJNTG9jYXRpb25zID0gMCkge1xyXG4gICAgaWYgKF9mb3JTZWxlY3RlZEJ1c2luZXNzKSB7XHJcbiAgICAgIHZhciBfdGl0bGUgPSBcIlBheURheVwiO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBfaXNCb3QsIF9mb3JTZWxlY3RlZEJ1c2luZXNzLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4LCBIQkFtb3VudCwgQk1BbW91bnQsIEJNTG9jYXRpb25zLCAxLCAwLCBfbmV4dFR1cm5oYWxmUGF5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChEb3VibGVQYXlEYXkgJiYgUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBfc2tpcE5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk7XHJcbiAgICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXk7XHJcbiAgICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk7XHJcblxyXG4gICAgICBpZiAoX3NraXBOZXh0UGF5ZGF5KSB7XHJcbiAgICAgICAgLy9pZiBwcmV2aW91c2x5IHNraXAgcGF5ZGF5IHdhcyBzdG9yZWQgYnkgYW55IGNhcmRcclxuICAgICAgICB0aGlzLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG5cclxuICAgICAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIFBheURheS5cIiwgMTYwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgIH0sIDE2NTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIFBheURheS5cIik7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBfdGl0bGUgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZiAoX2lzRG91YmxlUGF5RGF5KSBfdGl0bGUgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgIGVsc2UgX3RpdGxlID0gXCJQYXlEYXlcIjtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSwgX2lzRG91YmxlUGF5RGF5LCBfc2tpcEhNTmV4dFBheWRheSwgX3NraXBCTU5leHRQYXlkYXksIF9pc0JvdCwgZmFsc2UsIDAsIDAsIDAsIDAsIFBhc3NlZFBheURheUNvdW50ZXIsIERvdWJsZVBheURheUNvdW50ZXIsIF9uZXh0VHVybmhhbGZQYXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQmFua3J1cHRfVHVybkRlY2lzaW9uKCkge1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50ICs9IDE7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCk7XHJcbiAgfSxcclxuXHJcbiAgU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50LCBfdUlEKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgQ2FzaDogX2Ftb3VudCwgSUQ6IF91SUQgfSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMywgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2RhdGEpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IF9kYXRhLkRhdGEuQ2FzaDtcclxuICAgICAgdmFyIF9pRCA9IF9kYXRhLkRhdGEuSUQ7XHJcblxyXG4gICAgICB2YXIgX215SW5kZXggPSB0aGlzLkdldE15SW5kZXgoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5QbGF5ZXJVSUQgPT0gX2lEKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLmlzR2FtZUZpbmlzaGVkID09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlRvdGFsU2NvcmUgKz0gX2Ftb3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgcmVjZWl2ZWQgcHJvZml0IG9mICRcIiArIF9hbW91bnQgKyBcIiBmcm9tIG90aGVyIHBsYXllci5cIiwgMjgwMCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBDYXJkcyBSdWxlc1xyXG4gIFRvZ2dsZURvdWJsZVBheU5leHRUdXJuKF9zdGF0ZSkge1xyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5ID0gX25leHRUdXJuRG91YmxlUGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUhhbGZQYXlOZXh0VHVybihfc3RhdGUpIHtcclxuICAgIF9uZXh0VHVybmhhbGZQYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5IYWxmUGF5RGF5ID0gX25leHRUdXJuaGFsZlBheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwTmV4dFR1cm4oX3N0YXRlKSB7XHJcbiAgICBfc2tpcE5leHRUdXJuID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybiA9IF9za2lwTmV4dFR1cm47XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpIHtcclxuICAgIF9za2lwTmV4dFBheWRheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheSA9IF9za2lwTmV4dFBheWRheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpIHtcclxuICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXkgPSBfc2tpcEhNTmV4dFBheWRheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKF9zdGF0ZSkge1xyXG4gICAgX3NraXBCTU5leHRQYXlkYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheSA9IF9za2lwQk1OZXh0UGF5ZGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVR1cm5Qcm9ncmVzcyhfc3RhdGUpIHtcclxuICAgIFR1cm5JblByb2dyZXNzID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFJldHVyblR1cm5Qcm9ncmVzcygpIHtcclxuICAgIHJldHVybiBUdXJuSW5Qcm9ncmVzcztcclxuICB9LFxyXG5cclxuICBMb3NlQWxsTWFya2V0aW5nTW9uZXkoKSB7XHJcbiAgICB2YXIgX2xvc2VBbW91bnQgPSAtMTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID4gMCkge1xyXG4gICAgICBfbG9zZUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX2xvc2VBbW91bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfbG9zZUFtb3VudDtcclxuICB9LFxyXG5cclxuICBNdWx0aXBseU1hcmtldGluZ01vbmV5KF9tdWx0aXBsaWVyKSB7XHJcbiAgICB2YXIgX2Ftb3VudEluY3JlYXNlZCA9IC0xO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPiAwKSB7XHJcbiAgICAgIF9hbW91bnRJbmNyZWFzZWQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ICo9IF9tdWx0aXBsaWVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX2Ftb3VudEluY3JlYXNlZCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9hbW91bnRJbmNyZWFzZWQ7XHJcbiAgfSxcclxuXHJcbiAgR2V0TWFya2V0aW5nTW9uZXkoX3Byb2ZpdCkge1xyXG4gICAgdmFyIF9hbW91bnQgPSAtMTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID4gMCkge1xyXG4gICAgICBfcHJvZml0ID0gX3Byb2ZpdCAvIDEwMDtcclxuICAgICAgX2Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgKj0gX3Byb2ZpdDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfYW1vdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2Ftb3VudDtcclxuICB9LFxyXG5cclxuICBHZXRWb2NhYnVsYXJ5UXVlc3Rpb25zSW5kZXgoKSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKFZvY2FidWxhcnlRdWVzdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPCBWb2NhYnVsYXJ5UXVlc3Rpb25zLmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBWb2NhYnVsYXJ5UXVlc3Rpb25zW1ZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyXTtcclxuICAgICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlcisrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X1ZvY2FidWxhcnkoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfVm9jYWJ1bGFyeSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0RXN0YWJsaXNobWVudFF1ZXN0aW9uc0luZGV4KCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChFc3RhYmxpc2htZW50UXVlc3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyIDwgRXN0YWJsaXNobWVudFF1ZXN0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gRXN0YWJsaXNobWVudFF1ZXN0aW9uc1tFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlcl07XHJcbiAgICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIrKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Fc3RhYmxpc2htZW50KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X0VzdGFibGlzaG1lbnQoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Wb2NhYnVsYXJ5KF9kYXRhID0gbnVsbCkge1xyXG4gICAgaWYgKF9kYXRhID09IG51bGwpIHtcclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9ucyA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTFdO1xyXG5cclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9ucy5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coVm9jYWJ1bGFyeVF1ZXN0aW9ucyk7XHJcbiAgICAgIFZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuXHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSB7IFZvY0FycmF5OiBWb2NhYnVsYXJ5UXVlc3Rpb25zLCBFc3RBcnJheTogbnVsbCB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE4LCBfdGVtcERhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9kYXRhLlZvY0FycmF5ICE9IG51bGwpIHtcclxuICAgICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zID0gX2RhdGEuVm9jQXJyYXk7XHJcbiAgICAgICAgY29uc29sZS5sb2coVm9jYWJ1bGFyeVF1ZXN0aW9ucyk7XHJcbiAgICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X0VzdGFibGlzaG1lbnQoX2RhdGEgPSBudWxsKSB7XHJcbiAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV07XHJcblxyXG4gICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhFc3RhYmxpc2htZW50UXVlc3Rpb25zKTtcclxuICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgVm9jQXJyYXk6IG51bGwsIEVzdEFycmF5OiBFc3RhYmxpc2htZW50UXVlc3Rpb25zIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTgsIF90ZW1wRGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2RhdGEuRXN0QXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnMgPSBfZGF0YS5Fc3RBcnJheTtcclxuICAgICAgICBjb25zb2xlLmxvZyhFc3RhYmxpc2htZW50UXVlc3Rpb25zKTtcclxuICAgICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbihfZGF0YSkge1xyXG4gICAgdmFyIF9xdWVzdGlvblJlZiA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfUXVlc3Rpb25zRGF0YSgpO1xyXG4gICAgdmFyIF91c2VySUQgPSBfZGF0YS5Vc2VySUQ7XHJcbiAgICB2YXIgX3F1ZXN0aW9uSW5kZXggPSBfZGF0YS5RdWVzdGlvbjtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfZGF0YS5Vc2VySW5kZXg7XHJcbiAgICB2YXIgX2lzVm9jID0gX2RhdGEuSXNWb2M7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAgIGlmIChfaXNWb2MpIHtcclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIrKztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyKys7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF91c2VySUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSUQgbWF0Y2hlZFwiKTtcclxuXHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcblxyXG4gICAgICB2YXIgX1FkYXRhO1xyXG4gICAgICBpZiAoX2lzVm9jKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2b2NcIik7XHJcbiAgICAgICAgX1FkYXRhID0gX3F1ZXN0aW9uUmVmLlZvY2FidWxhcnlRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXhdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXN0XCIpO1xyXG4gICAgICAgIF9RZGF0YSA9IF9xdWVzdGlvblJlZi5Fc3RhYmxpc2htZW50UXVlc3Rpb25zW19xdWVzdGlvbkluZGV4XTtcclxuICAgICAgfVxyXG5cclxuICAgICAgQ29ycmVjdEFuc3dlciA9IF9RZGF0YS5Db3JyZWN0T3B0aW9uO1xyXG4gICAgICB2YXIgX21lc3NhZ2UgPSBcIkNob29zZSB0aGUgY29ycmVjdCBhbnN3ZXIuXCIgKyBcIlxcblwiICsgXCIqd3JvbmcgYW5zd2VyIHdpbGwgY29zdCB5b3UgYSBmaW5lIG9mICQ1MDAwLlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBfUWRhdGEuUXVlc3Rpb24gKyBcIlxcblwiICsgXCJBLiBcIiArIF9RZGF0YS5PcHRpb24xICsgXCJcXG5cIiArIFwiQi4gXCIgKyBfUWRhdGEuT3B0aW9uMiArIFwiXFxuXCIgKyBcIkMuIFwiICsgX1FkYXRhLk9wdGlvbjMgKyBcIlxcblwiICsgXCJELiBcIiArIF9RZGF0YS5PcHRpb240O1xyXG5cclxuICAgICAgLy8gdmFyIF9xdWVzdGlvbkFza2VkID0gT25lUXVlc3Rpb25zW19xdWVzdGlvbkluZGV4IC0gMV07XHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24oX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX215RGF0YSwgX3Jvb21EYXRhLCBfaXNUdXJuT3ZlciwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gIH0sXHJcblxyXG4gIE9uZVF1ZXN0aW9uRGVjaXNpb25fU2VsZWN0T3B0aW9uX09uZVF1ZXN0aW9uKGV2ZW50ID0gbnVsbCkge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3NlbGVjdGlvbiA9IHBhcnNlSW50KGV2ZW50LmN1cnJlbnRUYXJnZXQubmFtZS5zcGxpdChcIl9cIilbMV0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwib3B0aW9uIHNlbGVjdGVkOiBcIiArIF9zZWxlY3Rpb24pO1xyXG4gICAgY29uc29sZS5sb2coXCJDb3JyZWN0QW5zd2VyOiBcIiArIENvcnJlY3RBbnN3ZXIpO1xyXG4gICAgaWYgKF9zZWxlY3Rpb24gPT0gQ29ycmVjdEFuc3dlcikge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91ciBhbnN3ZXIgd2FzIGNvcnJlY3QhLlwiLCAxMjAwKTtcclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKGZhbHNlLCB0cnVlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9teURhdGEuQ2FzaCA+PSA1MDAwKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggLT0gNTAwMDtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbnN3ZXJlZCB3cm9uZywgZmluZSBhbW91bnQgd2FzIHBheWVkIHRvIHRoZSBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKHRydWUsIGZhbHNlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCwgU2tpcHBpbmcgcXVlc3Rpb25cIik7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIGZhbHNlLCAwLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBPbmVRdWVzdGlvbkRlY2lzaW9uX1BheUFtb3VudF9PbmVRdWVzdGlvbigpIHtcclxuICAvLyAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgLy8gICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAvLyAgIGlmIChfbXlEYXRhLkNhc2ggPj0gNTAwMCkge1xyXG4gIC8vICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAvLyAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgLy8gICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoIC09IDUwMDA7XHJcbiAgLy8gICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7XHJcbiAgLy8gICAgICAgICBicmVhaztcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgIH1cclxuXHJcbiAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgcGFpZCBjYXNoIGFtb3VudCB0byBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gIC8vICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAvLyAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24odHJ1ZSwgZmFsc2UsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH0sXHJcblxyXG4gIC8vIE9uZVF1ZXN0aW9uRGVjaXNpb25fQW5zd2VyUXVlc3Rpb25fT25lUXVlc3Rpb24oKSB7XHJcbiAgLy8gICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gIC8vICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAvLyAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYW5zd2VyZWQgdGhlIHF1ZXN0aW9uLlwiLCAxMjAwKTtcclxuICAvLyAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIC8vICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIHRydWUsIE9uZVF1ZXN0aW9uSW5kZXgsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAvLyB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCh0cnVlKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5SZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCgpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KF9teURhdGEsIF9yb29tRGF0YSwgX2lzVHVybk92ZXIsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfU2VsZWN0UGxheWVyRm9yUHJvZml0X1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICB2YXIgX293bklEID0gX2RhdGEuVXNlcklELnRvU3RyaW5nKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gcGFyc2VJbnQoX2RhdGEuVXNlckluZGV4KTtcclxuICAgIHZhciBfcGxheWVyTmFtZSA9IF9kYXRhLlVzZXJOYW1lO1xyXG4gICAgdmFyIF9wbGF5ZXJJRCA9IF9kYXRhLk93blBsYXllcklELnRvU3RyaW5nKCk7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgaWYgKF9vd25JRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInJlY2VpdmVkIGV2ZW50OiBcIiArIF9wbGF5ZXJOYW1lKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQgPT0gX293bklEKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYW5HaXZlUHJvZml0T25QYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uVXNlcklERm9yUHJvZml0UGF5RGF5ID0gX3BsYXllcklEO1xyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCB0aGlzLlBsYXllckdhbWVJbmZvLCB0cnVlKTtcclxuICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TaG93VG9hc3QoXCJQbGF5ZXIgXCIgKyBfcGxheWVyTmFtZSArIFwiIHdpbGwgcmVjZWl2ZSBhbGwgeW91ciBuZXh0IHBheSBkYXkgcHJvZml0c1wiLCAzMjAwKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfaGFzRG9uZVBheW1lbnQsIF9oYXNBbnN3ZXJlZFF1ZXN0aW9uLCBfcXVlc3Rpb25JbmRleCwgX1VzZXJJRCkge1xyXG4gICAgdmFyIF9kYXRhID0geyBQYXltZW50RG9uZTogX2hhc0RvbmVQYXltZW50LCBRdWVzdGlvbkFuc3dlcmVkOiBfaGFzQW5zd2VyZWRRdWVzdGlvbiwgUXVlc3Rpb25JbmRleDogX3F1ZXN0aW9uSW5kZXgsIElEOiBfVXNlcklEIH07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDgsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfZGF0YSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgIHZhciBfaGFzRG9uZVBheW1lbnQgPSBfZGF0YS5QYXltZW50RG9uZTtcclxuICAgICAgdmFyIF9oYXNBbnN3ZXJlZFF1ZXN0aW9uID0gX2RhdGEuUXVlc3Rpb25BbnN3ZXJlZDtcclxuICAgICAgdmFyIF9xdWVzdGlvbkluZGV4ID0gX2RhdGEuUXVlc3Rpb25JbmRleDtcclxuICAgICAgdmFyIF91SUQgPSBfZGF0YS5JRDtcclxuXHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGF5ZXIgZG9lcyBub3QgaGF2ZSBlbm91Z2ggY2FzaCwgc28gcXVlc3Rpb25zIHdlcmUgc2tpcHBlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9oYXNEb25lUGF5bWVudCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoICs9IDUwMDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwicGxheWVyIGhhcyBnaXZlbiB3cm9uZyBhbnN3ZXIsIGNhc2ggJDUwMDAgaGFzIGJlZW4gYWRkZWQuXCIsIDIxMDApO1xyXG4gICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9oYXNBbnN3ZXJlZFF1ZXN0aW9uKSB7XHJcbiAgICAgICAgICB2YXIgX3NlbGVjdGVkUGxheWVySW5kZXggPSAwO1xyXG4gICAgICAgICAgdmFyIF9hY3RvcnNEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG5cclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKF91SUQgPT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgICAgX3NlbGVjdGVkUGxheWVySW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGF5ZXIgaGFzIGdpdmVuIGNvcnJlY3QgYW5zd2VyLCBubyBjYXNoIHdhcyByZWNlaXZlZC5cIiwgMjEwMCk7XHJcblxyXG4gICAgICAgICAgLy8gaWYgKF9xdWVzdGlvbkluZGV4ID09IDEpIHtcclxuICAgICAgICAgIC8vICAgLy9oYXZlIHlvdSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuU2tpcHBlZExvYW5QYXltZW50KSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSBza2lwcGVkIGxvYW4gcGF5ZW1lbnQgaW4gcHJldmlvdXMgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMikge1xyXG4gICAgICAgICAgLy8gICAvL0hhdmUgeW91IHRha2VuIGFueSBsb2FuP1xyXG4gICAgICAgICAgLy8gICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgLy8gICAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgLy8gICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICAvLyAgICAgICBicmVhaztcclxuICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAvLyAgIH1cclxuXHJcbiAgICAgICAgICAvLyAgIGlmIChfbG9hblRha2VuKSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSB0YWtlbiBzb21lIGxvYW5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgdGFrZW4gYW55IGxvYW5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMykge1xyXG4gICAgICAgICAgLy8gICAvL0FyZSB5b3UgYmFua3J1cHRlZD8gaWYgbW9yZSB0aGFuIG9uY2UsIHRlbGwgbWUgdGhlIGFtb3VudD9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLklzQmFua3J1cHQpIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZCBcIiArIF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkJhbmtydXB0QW1vdW50ICsgXCIgdGltZS9lcy5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDQpIHtcclxuICAgICAgICAgIC8vICAgLy9JcyB5b3VyIHR1cm4gZ29pbmcgdG8gYmUgc2tpcHBlZCBuZXh0IHRpbWU/XHJcbiAgICAgICAgICAvLyAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgYmUgc2tpcHBlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIG5vdCBiZSBza2lwcGVkLlwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSA1KSB7XHJcbiAgICAgICAgICAvLyAgIC8vSXMgaXQgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgeW91ciBuZXh0IHBheWRheT9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5KSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgcGF5ZGF5IHdpbGwgYmUgZG91YmxlIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBub3QgYmUgZG91YmxlIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgaWYgKElzVHdlZW5pbmcgPT0gdHJ1ZSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICAgIH0sIDgwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3NwYWNlcyA9IF9kYXRhLkRhdGEuYmFja3NwYWNlcztcclxuICAgICAgdmFyIF9jb3VudGVyID0gX2RhdGEuRGF0YS5Db3VudGVyO1xyXG5cclxuICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19jb3VudGVyICsgQmFja3NwYWNlc10uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MsIDAuMSk7XHJcblxyXG4gICAgICBSb2xsQ291bnRlciA9IF9jb3VudGVyO1xyXG4gICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUd2VlblBsYXllcl9Hb0JhY2tTcGFjZXM6IGZ1bmN0aW9uIChOb2RlLCBUb1Bvcywgc3BlZWQgPSAwLjYpIHtcclxuICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgIC50byhzcGVlZCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge30pXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIEdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICBSb2xsQ291bnRlciAtPSBCYWNrc3BhY2VzO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHZhciBfZGF0YSA9IHsgRGF0YTogeyBiYWNrc3BhY2VzOiBCYWNrc3BhY2VzLCBDb3VudGVyOiBSb2xsQ291bnRlciB9IH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTAsIF9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1Bvcyk7XHJcbiAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuICAvLyNlbmRyZWdpb25cclxufSk7XHJcbi8vbW9kdWxlLmV4cG9ydHMgID0gUGxheWVyRGF0YTsgLy93aGVuIGltcG9ydHMgaW4gYW5vdGhlciBzY3JpcHQgb25seSByZWZlcmVuY2Ugb2YgcGxheWVyZGF0YSBjbGFzcyB3b3VsZCBiZSBhYmxlIHRvIGFjY2Vzc2VkIGZyb20gR2FtZW1hbmFnZXIgaW1wb3J0XHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZU1hbmFnZXI7XHJcbi8vI2VuZHJlZ2lvblxyXG4iXX0=