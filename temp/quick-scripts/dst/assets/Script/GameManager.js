
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
var WildCardArrayCounter = 0;
var CompareDiceData = null; //#region superclasses and enumerations
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
    CompareDiceData = null;
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
  GetMyPlayerUID: function GetMyPlayerUID() {
    var _UID = "";
    var _actor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    var _allActors = this.PlayerGameInfo;

    for (var index = 0; index < _allActors.length; index++) {
      if (_actor.PlayerUID == _allActors[index].PlayerUID) {
        _UID = _actor.PlayerUID;
        break;
      }
    }

    return _UID;
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
        Dice1 = 5;
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
        MarketingArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
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
        WildCardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
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
            RandomCard = this.SelectRelatedCard(true, false, false, false);
          } else if (_spaceID == 5) {
            //landed on some losses cards
            RandomCard = this.SelectRelatedCard(false, true, false, false);
          } else if (_spaceID == 3) {
            //landed on some marketing cards
            RandomCard = this.SelectRelatedCard(false, false, true, false);
          } else if (_spaceID == 1) {
            //landed on some wild cards
            RandomCard = this.SelectRelatedCard(false, false, false, true);
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

    var speed = 0.4;
    if (_isTest) speed = 0.04;
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
  ReceiveEvent_CompareDice_CardFunctionality: function ReceiveEvent_CompareDice_CardFunctionality(_data) {
    if (this.SelectedMode == 2) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
        CompareDiceData = _data;
        var _receiverPlayer = CompareDiceData.Player;
        var _receiverPlayerIndex = CompareDiceData.PlayerIndex;
        var _senderPlayerUID = CompareDiceData.MyUserID;
        var _senderDice = CompareDiceData.Dice1;
        var _receiverDice = CompareDiceData.Dice2;
        var _senderPayLimit = CompareDiceData.Limit1;
        var _receiverPayLimit = CompareDiceData.Limit2;
        var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;

        if (_myActor.PlayerUID == _receiverPlayer.PlayerUID) {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecsion01Screen_CompareDice(true);
        }
      }
    }
  },
  RollDice_CompareDice_CardFunctionality: function RollDice_CompareDice_CardFunctionality() {
    var _receiverPlayer = CompareDiceData.Player;
    var _receiverPlayerIndex = CompareDiceData.PlayerIndex;
    var _senderPlayerUID = CompareDiceData.MyUserID;
    var _senderDice = CompareDiceData.Dice1;
    var _receiverDice = CompareDiceData.Dice2;
    var _senderPayLimit = CompareDiceData.Limit1;
    var _receiverPayLimit = CompareDiceData.Limit2;
    var UIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

    var _info = "\n" + "Your Dice Result: " + _receiverDice + "\n" + "\n" + " Other Player Dice Result: " + _senderDice;

    UIManager.ToggleDecsion01Screen_CompareDice(false);
    UIManager.ToggleDecsion02Screen_CompareDice(true);
    UIManager.ChangeTitle_Decsion02Screen_CompareDice(_info);
    var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;

    var _myIndex = this.GetMyIndex();

    if (_senderDice > _receiverDice) //will give 20000
      {
        _info += "\n" + "\n" + " You have lost, you have to pay other player $$$.";
        UIManager.ChangeTitle_Decsion02Screen_CompareDice(_info);
        UIManager.ToggleDecsion02ScreenButton_CompareDice(true);
      } else if (_receiverDice > _senderDice) //will receive 20000
      {
        this.PlayerGameInfo[_myIndex].Cash += 20000;
        GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[_myIndex]);
        _info += "\n" + "\n" + " You have won, amount $20000 has been added to your cash.";
        UIManager.ChangeTitle_Decsion02Screen_CompareDice(_info);
        UIManager.ToggleDecsion02ScreenButton_CompareDice(false);
        setTimeout(function () {
          UIManager.ToggleDecsion02Screen_CompareDice(false);
        }, 8000);
      }

    var _sentdata = {
      SenderUID: _senderPlayerUID,
      DecisionObject: CompareDiceData
    };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(28, _sentdata);
  },
  ReceiveEvent_CompareDiceDecision_CardFunctionality: function ReceiveEvent_CompareDiceDecision_CardFunctionality(_data) {
    if (this.SelectedMode == 2) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
        var _UID = _data.SenderUID;
        var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
        var UIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();
        var _receiverPlayer = _data.DecisionObject.Player;
        var _receiverPlayerIndex = _data.DecisionObject.PlayerIndex;
        var _senderPlayerUID = _data.DecisionObject.MyUserID;
        var _senderDice = _data.DecisionObject.Dice1;
        var _receiverDice = _data.DecisionObject.Dice2;
        var _senderPayLimit = _data.DecisionObject.Limit1;
        var _receiverPayLimit = _data.DecisionObject.Limit2;

        var _myIndex = this.GetMyIndex();

        UIManager.ToggleWaitingScreen_PartnerShipSetup(false);
        console.log(_myActor.PlayerUID);
        console.log(_UID);

        if (_myActor.PlayerUID.toString() == _UID.toString()) {
          var _info = "\n" + "Your Dice Result: " + _senderDice + "\n" + "\n" + " Other Player Dice Result: " + _receiverDice;

          UIManager.ToggleWaitingScreen_PartnerShipSetup(false);
          UIManager.ToggleDecsion01Screen_CompareDice(false);
          UIManager.ToggleDecsion02Screen_CompareDice(true);
          UIManager.ChangeTitle_Decsion02Screen_CompareDice(_info);
          UIManager.ToggleWaitingScreen_PartnerShipSetup(false);

          if (_senderDice > _receiverDice) //will receive 20000
            {
              this.PlayerGameInfo[_myIndex].Cash += 20000;
              _info += "\n" + "\n" + " You have won, amount $20000 has been added to your cash.";
              UIManager.ChangeTitle_Decsion02Screen_CompareDice(_info);
              UIManager.ToggleDecsion02ScreenButton_CompareDice(false);
              setTimeout(function () {
                UIManager.ToggleDecsion02Screen_CompareDice(false);
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_PartnerShipSetup(false);
                UIManager.ExitAlongTurnOver_SelectPlayerGeneric();
              }, 10000);
            } else if (_receiverDice > _senderDice) //will give 20000
            {
              _info += "\n" + "\n" + " You have lost, you have to pay other player $$$.";
              UIManager.ChangeTitle_Decsion02Screen_CompareDice(_info);
              UIManager.ToggleDecsion02ScreenButton_CompareDice(true);
            }
        }
      }
    }
  },
  PayAmount_CompareDice_CardFunctionality: function PayAmount_CompareDice_CardFunctionality() {
    var _myActor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;

    var _myIndex = this.GetMyIndex();

    var UIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

    if (this.PlayerGameInfo[_myIndex].Cash >= 20000) {
      this.PlayerGameInfo[_myIndex].Cash -= 20000;
      GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[_myIndex]);
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBankruptedVar(false);
      UIManager.ToggleDecsion02Screen_CompareDice(false);

      if (_myIndex == this.TurnNumber) {
        UIManager.ExitAlongTurnOver_SelectPlayerGeneric();
      }
    } else {
      // if(_myIndex!=this.TurnNumber)
      // {
      //   GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBankruptedVar(true);
      // }else
      // {
      //   GamePlayReferenceManager.Instance.Get_GameplayUIManager().SetBankruptedVar(false);
      // }
      // GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleScreen_InsufficientBalance(true);
      this.PlayerGameInfo[_myIndex].Cash = 0;
      GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[_myIndex]);
      UIManager.ToggleDecsion02Screen_CompareDice(false);

      if (_myIndex == this.TurnNumber) {
        UIManager.ExitAlongTurnOver_SelectPlayerGeneric();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJoYWxmQnVzaW5lc3NBbW91bnQiLCJoYWxmQnVzaW5lc3NBbW91bnRJRCIsImhhbGZCdXNpbmVzc0Ftb3VudEluZGV4IiwiUHJldmlvdXNEaWNlUm9sbDMiLCJQcmV2aW91c0RpY2VSb2xsNCIsIlByZXZpb3VzRGljZVJvbGw1IiwidXNlckdhbWVPdmVyIiwiQm90R2FtZU92ZXIiLCJUb3RhbENvdW50ZXJSZWFjaGVkIiwiUGFzc2VkUGF5RGF5Q291bnRlciIsIkRvdWJsZVBheURheUNvdW50ZXIiLCJOb0NhcmRGdW5jdGlvbmFsaXR5IiwiUGxheWVyTGVmdCIsIkZvcmNlQ2hhbmdlVGltZU91dCIsIkdhbWVDb21wbGV0ZWQiLCJDb3JyZWN0QW5zd2VyIiwiVm9jYWJ1bGFyeVF1ZXN0aW9ucyIsIkVzdGFibGlzaG1lbnRRdWVzdGlvbnMiLCJWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlciIsIkVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyIiwiQmlnQnVzaW5lc3NBcnJheSIsIkxvc3Nlc0FycmF5IiwiTWFya2V0aW5nQXJyYXkiLCJXaWxkQ2FyZEFycmF5IiwiQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIiLCJMb3NzZXNBcnJheUNvdW50ZXIiLCJNYXJrZXRpbmdBcnJheUNvdW50ZXIiLCJXaWxkQ2FyZEFycmF5Q291bnRlciIsIkNvbXBhcmVEaWNlRGF0YSIsIkVudW1CdXNpbmVzc1R5cGUiLCJjYyIsIkVudW0iLCJOb25lIiwiSG9tZUJhc2VkIiwiYnJpY2tBbmRtb3J0YXIiLCJCdXNpbmVzc0luZm8iLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiTmFtZSIsIkJ1c2luZXNzVHlwZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIlRleHQiLCJCdXNpbmVzc05hbWUiLCJBbW91bnQiLCJJbnRlZ2VyIiwiSXNQYXJ0bmVyc2hpcCIsInR5cHciLCJCb29sZWFuIiwiUGFydG5lcklEIiwiUGFydG5lck5hbWUiLCJMb2NhdGlvbnNOYW1lIiwiTG9hblRha2VuIiwiTG9hbkFtb3VudCIsIlJlY2VpdmVEb3VibGVQYXlEYXkiLCJjdG9yIiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiTmV4dFR1cm5Eb3VibGVQYXkiLCJTa2lwTmV4dFR1cm4iLCJTa2lwTmV4dFBheWRheSIsIlNraXBITU5leHRQYXlkYXkiLCJTa2lwQk1OZXh0UGF5ZGF5IiwiTmV4dFR1cm5IYWxmUGF5RGF5IiwiTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlciIsIkhhc01hcmtldGluZ0NvbXBhbnkiLCJCYW5rcnVwdGVkTmV4dFR1cm4iLCJTdG9ja0luZm8iLCJTaGFyZUFtb3VudCIsIlBsYXllckRhdGEiLCJQbGF5ZXJOYW1lIiwiUGxheWVyVUlEIiwiQXZhdGFySUQiLCJJc0JvdCIsIk5vT2ZCdXNpbmVzcyIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiSG9tZUJhc2VkQW1vdW50IiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJSZWNlaXZlRG91YmxlUGF5RGF5QW1vdW50IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJOb09mU3RvY2tzIiwiQ2FzaCIsIkdvbGRDb3VudCIsIlN0b2NrQ291bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJMYXd5ZXJTdGF0dXMiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQbGF5ZXJSb2xsQ291bnRlciIsIkluaXRpYWxDb3VudGVyQXNzaWduZWQiLCJpc0dhbWVGaW5pc2hlZCIsIlRvdGFsU2NvcmUiLCJUb3RhbEhCQ2FzaCIsIlRvdGFsQk1DYXNoIiwiVG90YWxHb2xkQ2FzaCIsIlRvdGFsTG9hbkJhbGFuY2UiLCJUb3RhbFN0b2Nrc0Nhc2giLCJHYW1lT3ZlciIsIklzQWN0aXZlIiwiQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5IiwiVXNlcklERm9yUHJvZml0UGF5RGF5IiwiUm9sbENvdW50ZXIiLCJEaWNlVGVtcCIsIkRpY2VSb2xsIiwiSXNUd2VlbmluZyIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlR1cm5DaGVja0FycmF5IiwiQnVzaW5lc3NMb2NhdGlvbk5vZGVzIiwiUGFzc2VkUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiX25leHRUdXJuRG91YmxlUGF5IiwiX25leHRUdXJuaGFsZlBheSIsIl9za2lwTmV4dFR1cm4iLCJfc2tpcE5leHRQYXlkYXkiLCJfc2tpcEhNTmV4dFBheWRheSIsIl9za2lwQk1OZXh0UGF5ZGF5IiwiQ2FyZEV2ZW50UmVjZWl2ZWQiLCJUdXJuSW5Qcm9ncmVzcyIsIkJhY2tzcGFjZXMiLCJpc0dhbWVPdmVyIiwiQ2FyZERpc3BsYXlTZXRUaW1vdXQiLCJHYW1lTWFuYWdlciIsIkNvbXBvbmVudCIsIlBsYXllckdhbWVJbmZvIiwiQm90R2FtZUluZm8iLCJQbGF5ZXJOb2RlIiwiTm9kZSIsIkNhbWVyYU5vZGUiLCJBbGxQbGF5ZXJVSSIsIkFsbFBsYXllck5vZGVzIiwiU3RhcnRMb2NhdGlvbk5vZGVzIiwiU2VsZWN0ZWRNb2RlIiwic3RhdGljcyIsIkluc3RhbmNlIiwiU2V0UGxheWVyTGVmdCIsIl9zdGF0ZSIsIlJlc2V0QWxsVmFyaWFibGVzIiwiSW5wdXRUZXN0RGljZTEiLCJfdmFsIiwiSW5wdXRUZXN0RGljZTIiLCJvbkxvYWQiLCJSZXNldFBheURheSIsIlR1cm5OdW1iZXIiLCJUdXJuQ29tcGxldGVkIiwiQ2hlY2tSZWZlcmVuY2VzIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsIkluaXRfR2FtZU1hbmFnZXIiLCJSYW5kb21DYXJkSW5kZXgiLCJDYXJkQ291bnRlciIsIkNhcmREaXNwbGF5ZWQiLCJjb25zb2xlIiwibG9nIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsIkNoZWNrU3BlY3RhdGUiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIkFsbERhdGEiLCJNYXhQbGF5ZXJzIiwibGVuZ3RoIiwiU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyIiwiVXBkYXRlR2FtZVVJIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJHZXRUdXJuTnVtYmVyIiwiR2V0TXlJbmRleCIsIm15SW5kZXgiLCJfYWN0b3IiLCJQaG90b25BY3RvciIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9hbGxBY3RvcnMiLCJpbmRleCIsIkdldE15UGxheWVyVUlEIiwiX1VJRCIsIlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyIsIkFzc2lnblBsYXllckdhbWVVSSIsIkVuYWJsZVBsYXllck5vZGVzIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIl90b1BvcyIsIlZlYzIiLCJHZXRfU3BhY2VNYW5hZ2VyIiwiRGF0YSIsIlJlZmVyZW5jZUxvY2F0aW9uIiwicG9zaXRpb24iLCJ4IiwieSIsInNldFBvc2l0aW9uIiwiX2xhc3RJbmRleCIsImFjdGl2ZSIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJUb3RhbENvbm5lY3RlZFBsYXllcnMiLCJteVJvb21BY3RvckNvdW50IiwidXNlcklEIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDaGFuZ2VUdXJuIiwiUmFpc2VFdmVudEZvckNhcmQiLCJfZGF0YSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiUmFpc2VFdmVudCIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJEaXNwbGF5Q2FyZE9uT3RoZXJzIiwiT25MYW5kZWRPblNwYWNlIiwic2V0VGltZW91dCIsIlJlc2V0Q2FyZERpc3BsYXkiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiUmFuZG9tQ2FyZCIsInJhbmRvbUNhcmQiLCJjb3VudGVyIiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIlN5bmNBbGxEYXRhIiwiUmVtb3ZlRnJvbUNoZWNrQXJyYXkiLCJfdWlkIiwiX2luZCIsInNwbGljZSIsIkNoZWNrVHVybkNvbXBsZXRlIiwiaiIsIlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZSIsInB1c2giLCJBcnJheUxlbmd0aCIsIklERm91bmQiLCJSZXNldFNvbWVWYWx1ZXMiLCJDaGFuZ2VUdXJuRm9yY2VmdWxseSIsIlVwZGF0ZVZpc3VhbERhdGEiLCJSZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkiLCJUdXJuSGFuZGxlciIsIl90dXJuIiwiX2lzTWFzdGVyIiwiQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50IiwiX3BsYXllck1hdGNoZWQiLCJUb2dnbGVUdXJuUHJvZ3Jlc3MiLCJSZXNldFR1cm5WYXJpYWJsZSIsIlN0YXJ0TmV3R2FtZV9CYW5rUnVwdGVkIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUm9sbERpY2UiLCJEaWNlUm9sbFNjcmVlbiIsIlBsYXllckluZm8iLCJteVJvb21BY3RvcnNBcnJheSIsIlNob3dUb2FzdCIsIlRvZ2dsZVNraXBOZXh0VHVybiIsIlVwZGF0ZVVJRGF0YSIsIk1haW5TZXNzaW9uRGF0YSIsIk15RGF0YSIsIl9jb3VudGVyIiwiU3RhcnRUdXJuIiwiUmVjZWl2ZUJhbmtydXB0RGF0YSIsIl9pc0JhbmtydXB0ZWQiLCJiYW5rcnVwdGVkIiwidHVybiIsIl9wbGF5ZXJEYXRhIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiX3JhbmRvbUluZGV4IiwiZ2V0UmFuZG9tIiwiU2V0TmFtZSIsIlNldEF2YXRhciIsIl90b2dnbGVIaWdobGlnaHQiLCJfaW5kZXgiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJjaGlsZHJlbiIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiQXZhdGFyU3ByaXRlcyIsIlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMiLCJ0YXJnZXRQb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInJhdGlvIiwid2luU2l6ZSIsImhlaWdodCIsInpvb21SYXRpbyIsImxhdGVVcGRhdGUiLCJzeW5jRGljZVJvbGwiLCJfcm9sbCIsIl9kaWNlMSIsImRpY2UxIiwiX2RpY2UyIiwiZGljZTIiLCJfcmVzdWx0IiwiZXJyb3IiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJBbmltYXRlRGljZSIsIkRpY2VGdW50aW9uYWxpdHkiLCJfcG9zIiwiVHdlZW5DYW1lcmEiLCJUZW1wQ2hlY2tTcGFjZSIsIl9yb2xsaW5nIiwidGVtcGNvdW50ZXIiLCJ0ZW1wY291bnRlcjIiLCJkaWNldG9iZSIsInBhcnNlSW50IiwiU3BhY2VEYXRhIiwiU3BhY2VzVHlwZSIsIkRpY2UxIiwiRGljZTIiLCJfbmV3Um9sbCIsIlJvbGxPbmVEaWNlIiwiUm9sbFR3b0RpY2VzIiwiUG9wdWxhdGVEZWNrc0FycmF5IiwiX2lzQmlnQnVzaW5lc3MiLCJfaXNMb3NzZXMiLCJfaXNNYXJrZXRpbmciLCJfaXNXaWxkQ2FyZCIsInNvcnQiLCJNYXRoIiwicmFuZG9tIiwiX3RlbXBEYXRhIiwiQmlnQXJyYXkiLCJMb3NzQXJyYXkiLCJNYXJrZXRBcnJheSIsIldpbGRBcnJ5YSIsIkdldEJpZ0J1c2luZXNzSW5kZXgiLCJHZXRMb3NzZXNJbmRleCIsIkdldE1hcmtldGluZ0luZGV4IiwiR2V0V2lsZENhcmRJbmRleCIsIlVwZGF0ZUNvdW50ZXJzIiwiU2VsZWN0UmVsYXRlZENhcmQiLCJjYWxsVXBvbkNhcmQiLCJfc3BhY2VJRCIsIlN0YXJ0RGljZVJvbGwiLCJTZW5kaW5nRGF0YSIsImlzQm90IiwiY29tcGxldGVDYXJkVHVybiIsIkFsbFBsYXllcnNHYW1lQ29tcGxldGVkIiwiQ2FsbEdhbWVDb21wbGV0ZSIsIl9pc0JvdCIsIl9mb3JjZUdhbWVPdmVyIiwiX3BsYXllckluZGV4IiwiX2Nhc2giLCJITUFtb3VudCIsIkdldF9HYW1lTWFuYWdlciIsIkJNQW1vdW50IiwiQk1Mb2NhdGlvbnMiLCJsb2FuQW1vdW50IiwiX2dvbGQiLCJfc3RvY2tzIiwiX2RpY2VSYW5kb20iLCJPbmNlT3JTaGFyZSIsIkdvbGRDYXNoIiwiU3RvY2tDYXNoIiwiQk1DYXNoIiwiSE1DYXNoIiwiVG90YWxBc3NldHMiLCJSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlIiwiUmFpc2VFdmVudFRvU3luY0dhbWVDb21wbGV0ZURhdGEiLCJTeW5jR2FtZU92ZXIiLCJpbmZvVGV4dCIsInN0YXR1c1RleHQiLCJEaXNjb25uZWN0RGF0YSIsIlNob3dSZXN1bHRTY3JlZW4iLCJfY3VycmVudENhc2giLCJHZXRfU2VydmVyQmFja2VuZCIsIlN0dWRlbnREYXRhIiwiZ2FtZUNhc2giLCJfdG90YWwiLCJ0b1N0cmluZyIsIl93b24iLCJnYW1lc1dvbiIsIlVwZGF0ZVVzZXJEYXRhIiwiU3luY0dhbWVDb21wbGV0ZURhdGEiLCJCb3QiLCJab29tQ2FtZXJhT3V0T25seSIsIm1heCIsIlNlbGVjdGVkSW5kIiwiU2Vzc2lvbkRhdGEiLCJfdmFsdWUiLCJ0cmFjZSIsInBsYXllcmNvbXBsZXRlZCIsIlpvb21DYW1lcmFPdXQiLCJUd2VlblBsYXllciIsIm1pbiIsImZsb29yIiwiaXNab29tIiwidGltZSIsInR3ZWVuIiwidG8iLCJ2MiIsImVhc2luZyIsImNhbGwiLCJab29tQ2FtZXJhSW4iLCJzdGFydCIsIkNoZWNrUGF5RGF5Q29uZGl0aW9ucyIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIiwiVG9Qb3MiLCJzcGVlZCIsIl9uZXdwb3MiLCJUb2dnbGVQYXlEYXkiLCJfc3QxIiwiX1N0MiIsIkluY3JlYXNlRG91YmxlUGF5RGF5IiwiRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiYW1vdW50IiwiX2xvY2F0aW9uTmFtZSIsIl9pc0NhcmRGdW5jdGlvbmFsaXR5IiwiX0dpdmVuQ2FzaCIsIl9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJpIiwibm9kZSIsImluc3RhbnRpYXRlIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiU2V0QnVzaW5lc3NJbmRleCIsIlNldENhcmRGdW5jdGlvbmFsaXR5IiwiU2V0R2l2ZW5DYXNoIiwiU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiUmVzZXRFZGl0Qm94IiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiZGVzdHJveSIsIlVwZGF0ZVN0b2Nrc19UdXJuRGVjaXNpb24iLCJfbmFtZSIsIl9TaGFyZUFtb3VudCIsIl9pc0FkZGluZyIsIl9zdG9jayIsIl9pc0RvdWJsZVBheURheSIsIl9mb3JTZWxlY3RlZEJ1c2luZXNzIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIkhCQW1vdW50IiwiX3RpdGxlIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9hbW91bnQiLCJfdUlEIiwiSUQiLCJSZWNlaXZlUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiX2lEIiwiX215SW5kZXgiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIlRvZ2dsZUhhbGZQYXlOZXh0VHVybiIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlJldHVyblR1cm5Qcm9ncmVzcyIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9sb3NlQW1vdW50IiwiTXVsdGlwbHlNYXJrZXRpbmdNb25leSIsIl9tdWx0aXBsaWVyIiwiX2Ftb3VudEluY3JlYXNlZCIsIkdldE1hcmtldGluZ01vbmV5IiwiX3Byb2ZpdCIsIkdldFZvY2FidWxhcnlRdWVzdGlvbnNJbmRleCIsIlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Wb2NhYnVsYXJ5IiwiR2V0RXN0YWJsaXNobWVudFF1ZXN0aW9uc0luZGV4IiwiUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X0VzdGFibGlzaG1lbnQiLCJWb2NBcnJheSIsIkVzdEFycmF5IiwiUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24iLCJfcXVlc3Rpb25SZWYiLCJHZXRfUXVlc3Rpb25zRGF0YSIsIl91c2VySUQiLCJVc2VySUQiLCJfcXVlc3Rpb25JbmRleCIsIlF1ZXN0aW9uIiwiVXNlckluZGV4IiwiX2lzVm9jIiwiSXNWb2MiLCJfZ2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfUWRhdGEiLCJDb3JyZWN0T3B0aW9uIiwiX21lc3NhZ2UiLCJPcHRpb24xIiwiT3B0aW9uMiIsIk9wdGlvbjMiLCJPcHRpb240IiwiU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbiIsIl9pc1R1cm5PdmVyIiwiX215RGF0YSIsIl9yb29tRGF0YSIsIlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJPbmVRdWVzdGlvbkRlY2lzaW9uX1NlbGVjdE9wdGlvbl9PbmVRdWVzdGlvbiIsImV2ZW50IiwiX3NlbGVjdGlvbiIsImN1cnJlbnRUYXJnZXQiLCJzcGxpdCIsIlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbiIsIlNlbGVjdFBsYXllclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eSIsIlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiU2VsZWN0UGxheWVyVGFrZU92ZXJfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIiLCJSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyIiwiU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlciIsIlNlbGVjdFBsYXllckJ1eUhhbGZCdXNpbmVzc19TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eSIsIlNlbGVjdFBsYXllckRhbWFnaW5nSW5mb3JtYXRpb25fU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmciLCJSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckRhbWFnaW5nIiwiU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyIsIlJlY2VpdmVFdmVudF9TZWxlY3RQbGF5ZXJGb3JQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfb3duSUQiLCJfcGxheWVyTmFtZSIsIlVzZXJOYW1lIiwiX3BsYXllcklEIiwiT3duUGxheWVySUQiLCJfaGFzRG9uZVBheW1lbnQiLCJfaGFzQW5zd2VyZWRRdWVzdGlvbiIsIl9Vc2VySUQiLCJQYXltZW50RG9uZSIsIlF1ZXN0aW9uQW5zd2VyZWQiLCJRdWVzdGlvbkluZGV4IiwiRGVkdWN0Q2FzaF9DYXJkRnVuY3Rpb25hbGl0eSIsIkFkZENhc2hfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfSUQiLCJfbXNnIiwibXNnIiwibW9kZSIsIlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uIiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9zZWxlY3RlZFBsYXllckluZGV4IiwiX2FjdG9yc0RhdGEiLCJSZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkiLCJfc3BhY2VzIiwiYmFja3NwYWNlcyIsIkNvdW50ZXIiLCJUd2VlblBsYXllcl9Hb0JhY2tTcGFjZXMiLCJHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5IiwiUmVjZWl2ZUV2ZW50X1Rha2VPdmVyQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfaWQiLCJQbGF5ZXIiLCJfYnVzaW5lc3MiLCJCdXNpbmVzcyIsIl9idXNpbmVzc0luZGV4IiwiQnVzaW5lc3NJbmRleCIsIl9teUFjdG9yIiwiX2xvY2F0aW9ucyIsIlRha2VPdmVyQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfYnV5SGFsZkJ1c2luZXNzIiwiX2RpY2VSb2xsIiwiX211bHRpcGxpZXJCdXNpbmVzcyIsIl9wbGF5ZXIiLCJfc2VuZGluZ0RhdGEiLCJFeGl0U2NyZWVuQWxvbmdUdXJuT3Zlcl9fQnVzaW5lc3NHZW5yaWMiLCJfdGVtcFN1bSIsIlJlY2VpdmVFdmVudF9CdXlIYWxmQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfY2FzaEFtb3VudCIsIl9zZW5kZXJJRCIsIk15SUQiLCJfc2VuZGVyTmFtZSIsIk15TmFtZSIsIlJlY2VpdmVFdmVudF9Db21wYXJlRGljZV9DYXJkRnVuY3Rpb25hbGl0eSIsIl9yZWNlaXZlclBsYXllciIsIl9yZWNlaXZlclBsYXllckluZGV4IiwiUGxheWVySW5kZXgiLCJfc2VuZGVyUGxheWVyVUlEIiwiTXlVc2VySUQiLCJfc2VuZGVyRGljZSIsIl9yZWNlaXZlckRpY2UiLCJfc2VuZGVyUGF5TGltaXQiLCJMaW1pdDEiLCJfcmVjZWl2ZXJQYXlMaW1pdCIsIkxpbWl0MiIsIlRvZ2dsZURlY3Npb24wMVNjcmVlbl9Db21wYXJlRGljZSIsIlJvbGxEaWNlX0NvbXBhcmVEaWNlX0NhcmRGdW5jdGlvbmFsaXR5IiwiVUlNYW5hZ2VyIiwiX2luZm8iLCJUb2dnbGVEZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UiLCJDaGFuZ2VUaXRsZV9EZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UiLCJUb2dnbGVEZWNzaW9uMDJTY3JlZW5CdXR0b25fQ29tcGFyZURpY2UiLCJfc2VudGRhdGEiLCJTZW5kZXJVSUQiLCJEZWNpc2lvbk9iamVjdCIsIlJlY2VpdmVFdmVudF9Db21wYXJlRGljZURlY2lzaW9uX0NhcmRGdW5jdGlvbmFsaXR5IiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwIiwiRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyR2VuZXJpYyIsIlBheUFtb3VudF9Db21wYXJlRGljZV9DYXJkRnVuY3Rpb25hbGl0eSIsIlNldEJhbmtydXB0ZWRWYXIiLCJQYXlBbW91bnRfQnV5SGFsZkJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5IiwiVG9nZ2xlU2NyZWVuX0J1eUhhbGZCdXNpbmVzcyIsIlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlIiwiQnV5SGFsZkJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5IiwiX3RleHQiLCJTZXRUaXRsZVRleHRfQnV5SGFsZkJ1c2luZXNzIiwiUmVjZWl2ZUV2ZW50X1NlbGVjdFBsYXllckRhbWFnaW5nRGVjaXNpb25fU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJTZXRTZW5kZXJJRF9EYW1hZ2VEZWNpc2lvbiIsIlRvZ2dsZU1haW5TY3JlZW5fRGFtYWdlRGVjaXNpb24iLCJUb2dnbGVEaWNlUmVzdWx0U2NyZWVuX0RhbWFnZURlY2lzaW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLEdBQUcsS0FBZDtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBQ0EsSUFBSUMsa0JBQWtCLEdBQUcsQ0FBekI7QUFDQSxJQUFJQyxvQkFBb0IsR0FBRyxFQUEzQjtBQUNBLElBQUlDLHVCQUF1QixHQUFHLENBQTlCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFFQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBRUEsSUFBSUMsWUFBWSxHQUFHLEtBQW5CO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEtBQWxCO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsS0FBMUI7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxDQUExQjtBQUNBLElBQUlDLG1CQUFtQixHQUFHLENBQTFCO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsS0FBMUI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsS0FBakI7QUFDQSxJQUFJQyxrQkFBa0IsR0FBRyxJQUF6QjtBQUNBLElBQUlDLGFBQWEsR0FBRyxLQUFwQjtBQUNBLElBQUlDLGFBQWEsR0FBRyxDQUFwQjtBQUVBLElBQUlDLG1CQUFtQixHQUFHLEVBQTFCO0FBQ0EsSUFBSUMsc0JBQXNCLEdBQUcsRUFBN0I7QUFDQSxJQUFJQywwQkFBMEIsR0FBRyxDQUFqQztBQUNBLElBQUlDLDZCQUE2QixHQUFHLENBQXBDO0FBRUEsSUFBSUMsZ0JBQWdCLEdBQUcsRUFBdkI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsRUFBckI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsRUFBcEI7QUFDQSxJQUFJQyx1QkFBdUIsR0FBRyxDQUE5QjtBQUNBLElBQUlDLGtCQUFrQixHQUFHLENBQXpCO0FBQ0EsSUFBSUMscUJBQXFCLEdBQUcsQ0FBNUI7QUFDQSxJQUFJQyxvQkFBb0IsR0FBRyxDQUEzQjtBQUNBLElBQUlDLGVBQWUsR0FBQyxJQUFwQixFQUVBO0FBQ0E7O0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzdCQyxFQUFBQSxJQUFJLEVBQUUsQ0FEdUI7QUFFN0JDLEVBQUFBLFNBQVMsRUFBRSxDQUZrQjtBQUVmO0FBQ2RDLEVBQUFBLGNBQWMsRUFBRSxDQUhhLENBR1Y7O0FBSFUsQ0FBUixDQUF2QixFQU1BOztBQUNBLElBQUlDLFlBQVksR0FBR0wsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDMUJDLEVBQUFBLElBQUksRUFBRSxjQURvQjtBQUUxQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLElBQUksRUFBRSxjQURJO0FBRVZDLElBQUFBLFlBQVksRUFBRTtBQUNaQyxNQUFBQSxXQUFXLEVBQUUsTUFERDtBQUVaQyxNQUFBQSxJQUFJLEVBQUViLGdCQUZNO0FBR1osaUJBQVNBLGdCQUFnQixDQUFDRyxJQUhkO0FBSVpXLE1BQUFBLFlBQVksRUFBRSxJQUpGO0FBS1pDLE1BQUFBLE9BQU8sRUFBRTtBQUxHLEtBRko7QUFTVkMsSUFBQUEsdUJBQXVCLEVBQUU7QUFDdkJKLE1BQUFBLFdBQVcsRUFBRSxNQURVO0FBRXZCQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRmM7QUFHdkIsaUJBQVMsRUFIYztBQUl2QkgsTUFBQUEsWUFBWSxFQUFFLElBSlM7QUFLdkJDLE1BQUFBLE9BQU8sRUFBRTtBQUxjLEtBVGY7QUFnQlZHLElBQUFBLFlBQVksRUFBRTtBQUNaTixNQUFBQSxXQUFXLEVBQUUsTUFERDtBQUVaQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRkc7QUFHWixpQkFBUyxFQUhHO0FBSVpILE1BQUFBLFlBQVksRUFBRSxJQUpGO0FBS1pDLE1BQUFBLE9BQU8sRUFBRTtBQUxHLEtBaEJKO0FBdUJWSSxJQUFBQSxNQUFNLEVBQUU7QUFDTlAsTUFBQUEsV0FBVyxFQUFFLFFBRFA7QUFFTixpQkFBUyxDQUZIO0FBR05DLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FISDtBQUlOTixNQUFBQSxZQUFZLEVBQUUsSUFKUjtBQUtOQyxNQUFBQSxPQUFPLEVBQUU7QUFMSCxLQXZCRTtBQThCVk0sSUFBQUEsYUFBYSxFQUFFO0FBQ2JULE1BQUFBLFdBQVcsRUFBRSxlQURBO0FBRWIsaUJBQVMsS0FGSTtBQUdiVSxNQUFBQSxJQUFJLEVBQUVyQixFQUFFLENBQUNzQixPQUhJO0FBSWJULE1BQUFBLFlBQVksRUFBRSxJQUpEO0FBS2JDLE1BQUFBLE9BQU8sRUFBRTtBQUxJLEtBOUJMO0FBcUNWUyxJQUFBQSxTQUFTLEVBQUU7QUFDVFosTUFBQUEsV0FBVyxFQUFFLFdBREo7QUFFVEMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZBO0FBR1QsaUJBQVMsRUFIQTtBQUlUSCxNQUFBQSxZQUFZLEVBQUUsSUFKTDtBQUtUQyxNQUFBQSxPQUFPLEVBQUU7QUFMQSxLQXJDRDtBQTRDVlUsSUFBQUEsV0FBVyxFQUFFO0FBQ1hiLE1BQUFBLFdBQVcsRUFBRSxhQURGO0FBRVhDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGRTtBQUdYLGlCQUFTLEVBSEU7QUFJWEgsTUFBQUEsWUFBWSxFQUFFLElBSkg7QUFLWEMsTUFBQUEsT0FBTyxFQUFFO0FBTEUsS0E1Q0g7QUFtRFZXLElBQUFBLGFBQWEsRUFBRTtBQUNiZCxNQUFBQSxXQUFXLEVBQUUsZUFEQTtBQUViQyxNQUFBQSxJQUFJLEVBQUUsQ0FBQ1osRUFBRSxDQUFDZ0IsSUFBSixDQUZPO0FBR2IsaUJBQVMsRUFISTtBQUliSCxNQUFBQSxZQUFZLEVBQUUsSUFKRDtBQUtiQyxNQUFBQSxPQUFPLEVBQUU7QUFMSSxLQW5ETDtBQTBEVlksSUFBQUEsU0FBUyxFQUFFO0FBQ1RmLE1BQUFBLFdBQVcsRUFBRSxXQURKO0FBRVRDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGQTtBQUdULGlCQUFTLEtBSEE7QUFJVFQsTUFBQUEsWUFBWSxFQUFFO0FBSkwsS0ExREQ7QUFnRVZjLElBQUFBLFVBQVUsRUFBRTtBQUNWaEIsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZDO0FBR1YsaUJBQVMsQ0FIQztBQUlWTixNQUFBQSxZQUFZLEVBQUU7QUFKSixLQWhFRjtBQXNFVmUsSUFBQUEsbUJBQW1CLEVBQUU7QUFDbkJqQixNQUFBQSxXQUFXLEVBQUUscUJBRE07QUFFbkJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGVTtBQUduQixpQkFBUyxLQUhVO0FBSW5CVCxNQUFBQSxZQUFZLEVBQUU7QUFKSztBQXRFWCxHQUZjO0FBZ0YxQmdCLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBbEZ5QixDQUFULENBQW5CLEVBb0ZBOztBQUNBLElBQUlDLHFCQUFxQixHQUFHOUIsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDbkNDLEVBQUFBLElBQUksRUFBRSx1QkFENkI7QUFFbkNDLEVBQUFBLFVBQVUsRUFBRTtBQUNWdUIsSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJwQixNQUFBQSxXQUFXLEVBQUUsbUJBREk7QUFFakJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGUTtBQUdqQixpQkFBUyxLQUhRO0FBSWpCVCxNQUFBQSxZQUFZLEVBQUUsSUFKRztBQUtqQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFEsS0FEVDtBQVFWa0IsSUFBQUEsWUFBWSxFQUFFO0FBQ1pyQixNQUFBQSxXQUFXLEVBQUUsY0FERDtBQUVaQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRkc7QUFHWixpQkFBUyxLQUhHO0FBSVpULE1BQUFBLFlBQVksRUFBRSxJQUpGO0FBS1pDLE1BQUFBLE9BQU8sRUFBRTtBQUxHLEtBUko7QUFlVm1CLElBQUFBLGNBQWMsRUFBRTtBQUNkdEIsTUFBQUEsV0FBVyxFQUFFLGdCQURDO0FBRWRDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGSztBQUdkLGlCQUFTLEtBSEs7QUFJZFQsTUFBQUEsWUFBWSxFQUFFLElBSkE7QUFLZEMsTUFBQUEsT0FBTyxFQUFFO0FBTEssS0FmTjtBQXNCVm9CLElBQUFBLGdCQUFnQixFQUFFO0FBQ2hCdkIsTUFBQUEsV0FBVyxFQUFFLGtCQURHO0FBRWhCQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRk87QUFHaEIsaUJBQVMsS0FITztBQUloQlQsTUFBQUEsWUFBWSxFQUFFLElBSkU7QUFLaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxPLEtBdEJSO0FBNkJWcUIsSUFBQUEsZ0JBQWdCLEVBQUU7QUFDaEJ4QixNQUFBQSxXQUFXLEVBQUUsa0JBREc7QUFFaEJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGTztBQUdoQixpQkFBUyxLQUhPO0FBSWhCVCxNQUFBQSxZQUFZLEVBQUUsSUFKRTtBQUtoQkMsTUFBQUEsT0FBTyxFQUFFO0FBTE8sS0E3QlI7QUFvQ1ZzQixJQUFBQSxrQkFBa0IsRUFBRTtBQUNsQnpCLE1BQUFBLFdBQVcsRUFBRSxvQkFESztBQUVsQkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZTO0FBR2xCLGlCQUFTLEtBSFM7QUFJbEJULE1BQUFBLFlBQVksRUFBRTtBQUpJLEtBcENWO0FBMENWd0IsSUFBQUEseUJBQXlCLEVBQUU7QUFDekIxQixNQUFBQSxXQUFXLEVBQUUsMkJBRFk7QUFFekJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGZ0I7QUFHekIsaUJBQVMsQ0FIZ0I7QUFJekJOLE1BQUFBLFlBQVksRUFBRTtBQUpXLEtBMUNqQjtBQWdEVnlCLElBQUFBLG1CQUFtQixFQUFFO0FBQ25CM0IsTUFBQUEsV0FBVyxFQUFFLHFCQURNO0FBRW5CQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRlU7QUFHbkIsaUJBQVMsS0FIVTtBQUluQlQsTUFBQUEsWUFBWSxFQUFFO0FBSkssS0FoRFg7QUFzRFYwQixJQUFBQSxrQkFBa0IsRUFBRTtBQUNsQjVCLE1BQUFBLFdBQVcsRUFBRSxvQkFESztBQUVsQkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZTO0FBR2xCLGlCQUFTLEtBSFM7QUFJbEJULE1BQUFBLFlBQVksRUFBRTtBQUpJO0FBdERWLEdBRnVCO0FBK0RuQ2dCLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBakVrQyxDQUFULENBQTVCLEVBbUVBOztBQUNBLElBQUlXLFNBQVMsR0FBR3hDLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ3ZCQyxFQUFBQSxJQUFJLEVBQUUsV0FEaUI7QUFFdkJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxJQUFJLEVBQUUsV0FESTtBQUVWUSxJQUFBQSxZQUFZLEVBQUU7QUFDWk4sTUFBQUEsV0FBVyxFQUFFLGNBREQ7QUFFWkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZHO0FBR1osaUJBQVMsRUFIRztBQUlaSCxNQUFBQSxZQUFZLEVBQUUsSUFKRjtBQUtaQyxNQUFBQSxPQUFPLEVBQUU7QUFMRyxLQUZKO0FBU1YyQixJQUFBQSxXQUFXLEVBQUU7QUFDWDlCLE1BQUFBLFdBQVcsRUFBRSxhQURGO0FBRVhDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGRTtBQUdYLGlCQUFTLENBSEU7QUFJWE4sTUFBQUEsWUFBWSxFQUFFLElBSkg7QUFLWEMsTUFBQUEsT0FBTyxFQUFFO0FBTEU7QUFUSCxHQUZXO0FBb0J2QmUsRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQ2hCO0FBQ0Q7QUF0QnNCLENBQVQsQ0FBaEIsRUF5QkE7O0FBQ0EsSUFBSWEsVUFBVSxHQUFHMUMsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDeEJDLEVBQUFBLElBQUksRUFBRSxZQURrQjtBQUV4QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZtQyxJQUFBQSxVQUFVLEVBQUU7QUFDVmhDLE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGQztBQUdWLGlCQUFTLEVBSEM7QUFJVkgsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0FERjtBQVFWOEIsSUFBQUEsU0FBUyxFQUFFO0FBQ1RqQyxNQUFBQSxXQUFXLEVBQUUsV0FESjtBQUVUQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRkE7QUFHVCxpQkFBUyxFQUhBO0FBSVRILE1BQUFBLFlBQVksRUFBRSxJQUpMO0FBS1RDLE1BQUFBLE9BQU8sRUFBRTtBQUxBLEtBUkQ7QUFlVitCLElBQUFBLFFBQVEsRUFBRTtBQUNSbEMsTUFBQUEsV0FBVyxFQUFFLFVBREw7QUFFUixpQkFBUyxDQUZEO0FBR1JDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FIRDtBQUlSTixNQUFBQSxZQUFZLEVBQUUsSUFKTjtBQUtSQyxNQUFBQSxPQUFPLEVBQUU7QUFMRCxLQWZBO0FBc0JWZ0MsSUFBQUEsS0FBSyxFQUFFO0FBQ0xuQyxNQUFBQSxXQUFXLEVBQUUsT0FEUjtBQUVMLGlCQUFTLEtBRko7QUFHTFUsTUFBQUEsSUFBSSxFQUFFckIsRUFBRSxDQUFDc0IsT0FISjtBQUlMVCxNQUFBQSxZQUFZLEVBQUUsSUFKVDtBQUtMQyxNQUFBQSxPQUFPLEVBQUU7QUFMSixLQXRCRztBQTZCVmlDLElBQUFBLFlBQVksRUFBRTtBQUNacEMsTUFBQUEsV0FBVyxFQUFFLFVBREQ7QUFFWkMsTUFBQUEsSUFBSSxFQUFFLENBQUNQLFlBQUQsQ0FGTTtBQUdaLGlCQUFTLEVBSEc7QUFJWlEsTUFBQUEsWUFBWSxFQUFFLElBSkY7QUFLWkMsTUFBQUEsT0FBTyxFQUFFO0FBTEcsS0E3Qko7QUFvQ1ZrQyxJQUFBQSxpQkFBaUIsRUFBRTtBQUNqQnJDLE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQkMsTUFBQUEsSUFBSSxFQUFFa0IscUJBRlc7QUFHakIsaUJBQVMsSUFIUTtBQUlqQmpCLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQXBDVDtBQTJDVm1DLElBQUFBLGVBQWUsRUFBRTtBQUNmdEMsTUFBQUEsV0FBVyxFQUFFLGlCQURFO0FBRWZDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGTTtBQUdmLGlCQUFTLENBSE07QUFJZk4sTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0EzQ1A7QUFrRFZvQyxJQUFBQSxvQkFBb0IsRUFBRTtBQUNwQnZDLE1BQUFBLFdBQVcsRUFBRSxzQkFETztBQUVwQkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZXO0FBR3BCLGlCQUFTLENBSFc7QUFJcEJOLE1BQUFBLFlBQVksRUFBRSxJQUpNO0FBS3BCQyxNQUFBQSxPQUFPLEVBQUU7QUFMVyxLQWxEWjtBQXlEVnFDLElBQUFBLHlCQUF5QixFQUFFO0FBQ3pCeEMsTUFBQUEsV0FBVyxFQUFFLDJCQURZO0FBRXpCQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRmdCO0FBR3pCLGlCQUFTLENBSGdCO0FBSXpCTixNQUFBQSxZQUFZLEVBQUU7QUFKVyxLQXpEakI7QUErRFZ1QyxJQUFBQSxvQkFBb0IsRUFBRTtBQUNwQnpDLE1BQUFBLFdBQVcsRUFBRSxzQkFETztBQUVwQkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZXO0FBR3BCLGlCQUFTLENBSFc7QUFJcEJOLE1BQUFBLFlBQVksRUFBRSxJQUpNO0FBS3BCQyxNQUFBQSxPQUFPLEVBQUU7QUFMVyxLQS9EWjtBQXNFVnVDLElBQUFBLFVBQVUsRUFBRTtBQUNWMUMsTUFBQUEsV0FBVyxFQUFFLFFBREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFLENBQUM0QixTQUFELENBRkk7QUFHVixpQkFBUyxFQUhDO0FBSVYzQixNQUFBQSxZQUFZLEVBQUUsSUFKSjtBQUtWQyxNQUFBQSxPQUFPLEVBQUU7QUFMQyxLQXRFRjtBQTZFVndDLElBQUFBLElBQUksRUFBRTtBQUNKM0MsTUFBQUEsV0FBVyxFQUFFLFlBRFQ7QUFFSixpQkFBUyxDQUZMO0FBR0pDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FITDtBQUlKTixNQUFBQSxZQUFZLEVBQUUsSUFKVjtBQUtKQyxNQUFBQSxPQUFPLEVBQUU7QUFMTCxLQTdFSTtBQW9GVnlDLElBQUFBLFNBQVMsRUFBRTtBQUNUNUMsTUFBQUEsV0FBVyxFQUFFLFdBREo7QUFFVCxpQkFBUyxDQUZBO0FBR1RDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FIQTtBQUlUTixNQUFBQSxZQUFZLEVBQUUsSUFKTDtBQUtUQyxNQUFBQSxPQUFPLEVBQUU7QUFMQSxLQXBGRDtBQTJGVjBDLElBQUFBLFVBQVUsRUFBRTtBQUNWN0MsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVixpQkFBUyxDQUZDO0FBR1ZDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FIQztBQUlWTixNQUFBQSxZQUFZLEVBQUUsSUFKSjtBQUtWQyxNQUFBQSxPQUFPLEVBQUU7QUFMQyxLQTNGRjtBQWtHVlksSUFBQUEsU0FBUyxFQUFFO0FBQ1RmLE1BQUFBLFdBQVcsRUFBRSxXQURKO0FBRVQsaUJBQVMsS0FGQTtBQUdUQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BSEE7QUFJVFQsTUFBQUEsWUFBWSxFQUFFLElBSkw7QUFLVEMsTUFBQUEsT0FBTyxFQUFFO0FBTEEsS0FsR0Q7QUF5R1ZhLElBQUFBLFVBQVUsRUFBRTtBQUNWaEIsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVixpQkFBUyxDQUZDO0FBR1ZDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FIQztBQUlWTixNQUFBQSxZQUFZLEVBQUUsSUFKSjtBQUtWQyxNQUFBQSxPQUFPLEVBQUU7QUFMQyxLQXpHRjtBQWdIVjJDLElBQUFBLGVBQWUsRUFBRTtBQUNmOUMsTUFBQUEsV0FBVyxFQUFFLGlCQURFO0FBRWYsaUJBQVMsQ0FGTTtBQUdmQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BSE07QUFJZk4sTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0FoSFA7QUF1SFY0QyxJQUFBQSxZQUFZLEVBQUU7QUFDWi9DLE1BQUFBLFdBQVcsRUFBRSxjQUREO0FBRVosaUJBQVMsS0FGRztBQUdaQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BSEc7QUFJWlQsTUFBQUEsWUFBWSxFQUFFLElBSkY7QUFLWkMsTUFBQUEsT0FBTyxFQUFFO0FBTEcsS0F2SEo7QUE4SFY2QyxJQUFBQSxVQUFVLEVBQUU7QUFDVmhELE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVYsaUJBQVMsS0FGQztBQUdWQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BSEM7QUFJVlQsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0E5SEY7QUFxSVY4QyxJQUFBQSxjQUFjLEVBQUU7QUFDZGpELE1BQUFBLFdBQVcsRUFBRSxnQkFEQztBQUVkLGlCQUFTLENBRks7QUFHZEMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUhLO0FBSWROLE1BQUFBLFlBQVksRUFBRSxJQUpBO0FBS2RDLE1BQUFBLE9BQU8sRUFBRTtBQUxLLEtBcklOO0FBNElWK0MsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEJsRCxNQUFBQSxXQUFXLEVBQUUsb0JBREs7QUFFbEIsaUJBQVMsS0FGUztBQUdsQkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUhTO0FBSWxCVCxNQUFBQSxZQUFZLEVBQUUsSUFKSTtBQUtsQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFMsS0E1SVY7QUFtSlZnRCxJQUFBQSxpQkFBaUIsRUFBRTtBQUNqQm5ELE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQixpQkFBUyxDQUZRO0FBR2pCQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BSFE7QUFJakJOLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQW5KVDtBQTBKVmlELElBQUFBLHNCQUFzQixFQUFFO0FBQ3RCcEQsTUFBQUEsV0FBVyxFQUFFLHdCQURTO0FBRXRCLGlCQUFTLEtBRmE7QUFHdEJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FIYTtBQUl0QlQsTUFBQUEsWUFBWSxFQUFFO0FBSlEsS0ExSmQ7QUFnS1ZtRCxJQUFBQSxjQUFjLEVBQUU7QUFDZHJELE1BQUFBLFdBQVcsRUFBRSxnQkFEQztBQUVkQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRks7QUFHZCxpQkFBUyxLQUhLO0FBSWRULE1BQUFBLFlBQVksRUFBRTtBQUpBLEtBaEtOO0FBc0tWb0QsSUFBQUEsVUFBVSxFQUFFO0FBQ1Z0RCxNQUFBQSxXQUFXLEVBQUUsWUFESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRkM7QUFHVixpQkFBUyxDQUhDO0FBSVZOLE1BQUFBLFlBQVksRUFBRTtBQUpKLEtBdEtGO0FBNEtWcUQsSUFBQUEsV0FBVyxFQUFFO0FBQ1h2RCxNQUFBQSxXQUFXLEVBQUUsYUFERjtBQUVYQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRkU7QUFHWCxpQkFBUyxDQUhFO0FBSVhOLE1BQUFBLFlBQVksRUFBRTtBQUpILEtBNUtIO0FBa0xWc0QsSUFBQUEsV0FBVyxFQUFFO0FBQ1h4RCxNQUFBQSxXQUFXLEVBQUUsYUFERjtBQUVYQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRkU7QUFHWCxpQkFBUyxDQUhFO0FBSVhOLE1BQUFBLFlBQVksRUFBRTtBQUpILEtBbExIO0FBd0xWdUQsSUFBQUEsYUFBYSxFQUFFO0FBQ2J6RCxNQUFBQSxXQUFXLEVBQUUsZUFEQTtBQUViQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRkk7QUFHYixpQkFBUyxDQUhJO0FBSWJOLE1BQUFBLFlBQVksRUFBRTtBQUpELEtBeExMO0FBOExWd0QsSUFBQUEsZ0JBQWdCLEVBQUU7QUFDaEIxRCxNQUFBQSxXQUFXLEVBQUUsa0JBREc7QUFFaEJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGTztBQUdoQixpQkFBUyxDQUhPO0FBSWhCTixNQUFBQSxZQUFZLEVBQUU7QUFKRSxLQTlMUjtBQW9NVnlELElBQUFBLGVBQWUsRUFBRTtBQUNmM0QsTUFBQUEsV0FBVyxFQUFFLGlCQURFO0FBRWZDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGTTtBQUdmLGlCQUFTLENBSE07QUFJZk4sTUFBQUEsWUFBWSxFQUFFO0FBSkMsS0FwTVA7QUEwTVYwRCxJQUFBQSxRQUFRLEVBQUU7QUFDUjVELE1BQUFBLFdBQVcsRUFBRSxVQURMO0FBRVJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGRDtBQUdSLGlCQUFTLEtBSEQ7QUFJUlQsTUFBQUEsWUFBWSxFQUFFO0FBSk4sS0ExTUE7QUFnTlYyRCxJQUFBQSxRQUFRLEVBQUU7QUFDUjdELE1BQUFBLFdBQVcsRUFBRSxVQURMO0FBRVJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGRDtBQUdSLGlCQUFTLElBSEQ7QUFJUlQsTUFBQUEsWUFBWSxFQUFFO0FBSk4sS0FoTkE7QUFzTlY0RCxJQUFBQSxxQkFBcUIsRUFBRTtBQUNyQjlELE1BQUFBLFdBQVcsRUFBRSx1QkFEUTtBQUVyQkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZZO0FBR3JCLGlCQUFTLElBSFk7QUFJckJULE1BQUFBLFlBQVksRUFBRTtBQUpPLEtBdE5iO0FBNE5WNkQsSUFBQUEscUJBQXFCLEVBQUU7QUFDckIvRCxNQUFBQSxXQUFXLEVBQUUsdUJBRFE7QUFFckJDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGWTtBQUdyQixpQkFBUyxFQUhZO0FBSXJCSCxNQUFBQSxZQUFZLEVBQUU7QUFKTztBQTVOYixHQUZZO0FBcU94QmdCLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBdk91QixDQUFULENBQWpCLEVBeU9BO0FBRUE7QUFDQTs7QUFDQSxJQUFJOEMsV0FBVyxHQUFHLENBQWxCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxJQUFJQyxRQUFRLEdBQUcsQ0FBZjtBQUNBLElBQUlDLFVBQVUsR0FBRyxLQUFqQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsY0FBYyxHQUFHLEVBQXJCO0FBQ0EsSUFBSUMscUJBQXFCLEdBQUcsRUFBNUI7QUFFQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkIsRUFFQTs7QUFDQSxJQUFJQyxrQkFBa0IsR0FBRyxLQUF6QjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEtBQXZCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLEtBQXBCO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLEtBQXRCLEVBQTZCOztBQUM3QixJQUFJQyxpQkFBaUIsR0FBRyxLQUF4QixFQUErQjs7QUFDL0IsSUFBSUMsaUJBQWlCLEdBQUcsS0FBeEIsRUFBK0I7O0FBQy9CLElBQUlDLGlCQUFpQixHQUFHLEtBQXhCO0FBQ0EsSUFBSUMsY0FBYyxHQUFHLEtBQXJCO0FBRUEsSUFBSUMsVUFBVSxHQUFHLENBQWpCO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEtBQWpCO0FBRUEsSUFBSUMsb0JBQW9CLEdBQUcsSUFBM0I7QUFFQSxJQUFJQyxXQUFXLEdBQUcvRixFQUFFLENBQUNNLEtBQUgsQ0FBUztBQUN6QkMsRUFBQUEsSUFBSSxFQUFFLGFBRG1CO0FBRXpCLGFBQVNQLEVBQUUsQ0FBQ2dHLFNBRmE7QUFHekJ4RixFQUFBQSxVQUFVLEVBQUU7QUFDVnlGLElBQUFBLGNBQWMsRUFBRTtBQUNkLGlCQUFTLEVBREs7QUFFZHJGLE1BQUFBLElBQUksRUFBRSxDQUFDOEIsVUFBRCxDQUZRO0FBR2Q3QixNQUFBQSxZQUFZLEVBQUUsSUFIQTtBQUlkQyxNQUFBQSxPQUFPLEVBQUU7QUFKSyxLQUROO0FBT1ZvRixJQUFBQSxXQUFXLEVBQUU7QUFDWCxpQkFBUyxFQURFO0FBRVh0RixNQUFBQSxJQUFJLEVBQUUsQ0FBQzhCLFVBQUQsQ0FGSztBQUdYN0IsTUFBQUEsWUFBWSxFQUFFLElBSEg7QUFJWEMsTUFBQUEsT0FBTyxFQUFFO0FBSkUsS0FQSDtBQWFWcUYsSUFBQUEsVUFBVSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWdkYsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNvRyxJQUZDO0FBR1Z2RixNQUFBQSxZQUFZLEVBQUUsSUFISjtBQUlWQyxNQUFBQSxPQUFPLEVBQUU7QUFKQyxLQWJGO0FBbUJWdUYsSUFBQUEsVUFBVSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWekYsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNvRyxJQUZDO0FBR1Z2RixNQUFBQSxZQUFZLEVBQUUsSUFISjtBQUlWQyxNQUFBQSxPQUFPLEVBQUU7QUFKQyxLQW5CRjtBQXlCVndGLElBQUFBLFdBQVcsRUFBRTtBQUNYLGlCQUFTLEVBREU7QUFFWDFGLE1BQUFBLElBQUksRUFBRSxDQUFDWixFQUFFLENBQUNvRyxJQUFKLENBRks7QUFHWHZGLE1BQUFBLFlBQVksRUFBRSxJQUhIO0FBSVhDLE1BQUFBLE9BQU8sRUFBRTtBQUpFLEtBekJIO0FBK0JWeUYsSUFBQUEsY0FBYyxFQUFFO0FBQ2QsaUJBQVMsRUFESztBQUVkM0YsTUFBQUEsSUFBSSxFQUFFLENBQUNaLEVBQUUsQ0FBQ29HLElBQUosQ0FGUTtBQUdkdkYsTUFBQUEsWUFBWSxFQUFFLElBSEE7QUFJZEMsTUFBQUEsT0FBTyxFQUFFO0FBSkssS0EvQk47QUFxQ1YwRixJQUFBQSxrQkFBa0IsRUFBRTtBQUNsQixpQkFBUyxFQURTO0FBRWxCNUYsTUFBQUEsSUFBSSxFQUFFLENBQUNaLEVBQUUsQ0FBQ29HLElBQUosQ0FGWTtBQUdsQnZGLE1BQUFBLFlBQVksRUFBRSxJQUhJO0FBSWxCQyxNQUFBQSxPQUFPLEVBQUU7QUFKUyxLQXJDVjtBQTJDVjJGLElBQUFBLFlBQVksRUFBRTtBQUNaLGlCQUFTLENBREc7QUFFWjdGLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGRztBQUdaTixNQUFBQSxZQUFZLEVBQUUsSUFIRjtBQUlaQyxNQUFBQSxPQUFPLEVBQUU7QUFKRztBQTNDSixHQUhhO0FBc0R6QjRGLEVBQUFBLE9BQU8sRUFBRTtBQUNQaEUsSUFBQUEsVUFBVSxFQUFFQSxVQURMO0FBRVByQyxJQUFBQSxZQUFZLEVBQUVBLFlBRlA7QUFHUHlCLElBQUFBLHFCQUFxQixFQUFFQSxxQkFIaEI7QUFJUC9CLElBQUFBLGdCQUFnQixFQUFFQSxnQkFKWDtBQUtQNEcsSUFBQUEsUUFBUSxFQUFFO0FBTEgsR0F0RGdCO0FBOER6QkMsRUFBQUEsYUE5RHlCLHlCQThEWEMsTUE5RFcsRUE4REg7QUFDcEIvSCxJQUFBQSxVQUFVLEdBQUcrSCxNQUFiO0FBQ0QsR0FoRXdCO0FBa0V6QkMsRUFBQUEsaUJBbEV5QiwrQkFrRUw7QUFDbEI1SCxJQUFBQSxtQkFBbUIsR0FBRyxFQUF0QjtBQUNBQyxJQUFBQSxzQkFBc0IsR0FBRyxFQUF6QjtBQUNBQyxJQUFBQSwwQkFBMEIsR0FBRyxDQUE3QjtBQUNBQyxJQUFBQSw2QkFBNkIsR0FBRyxDQUFoQztBQUVBQyxJQUFBQSxnQkFBZ0IsR0FBRyxFQUFuQjtBQUNBQyxJQUFBQSxXQUFXLEdBQUcsRUFBZDtBQUNBQyxJQUFBQSxjQUFjLEdBQUcsRUFBakI7QUFDQUMsSUFBQUEsYUFBYSxHQUFHLEVBQWhCO0FBQ0FDLElBQUFBLHVCQUF1QixHQUFHLENBQTFCO0FBQ0FDLElBQUFBLGtCQUFrQixHQUFHLENBQXJCO0FBQ0FDLElBQUFBLHFCQUFxQixHQUFHLENBQXhCO0FBQ0FDLElBQUFBLG9CQUFvQixHQUFHLENBQXZCO0FBQ0FDLElBQUFBLGVBQWUsR0FBQyxJQUFoQjtBQUVBaEMsSUFBQUEsV0FBVyxHQUFHLEVBQWQ7QUFDQUMsSUFBQUEsV0FBVyxHQUFHLEVBQWQ7QUFDQUMsSUFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxDQUFyQjtBQUNBQyxJQUFBQSxpQkFBaUIsR0FBRyxDQUFDLENBQXJCO0FBQ0FhLElBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0FaLElBQUFBLGtCQUFrQixHQUFHLENBQXJCO0FBQ0FDLElBQUFBLG9CQUFvQixHQUFHLEVBQXZCO0FBQ0FDLElBQUFBLHVCQUF1QixHQUFHLENBQTFCO0FBQ0FDLElBQUFBLGlCQUFpQixHQUFHLENBQUMsQ0FBckI7QUFDQUMsSUFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxDQUFyQjtBQUNBK0csSUFBQUEsZ0JBQWdCLEdBQUcsS0FBbkI7QUFDQTlHLElBQUFBLGlCQUFpQixHQUFHLENBQUMsQ0FBckI7QUFDQVMsSUFBQUEsYUFBYSxHQUFHLEtBQWhCO0FBQ0FSLElBQUFBLFlBQVksR0FBRyxLQUFmO0FBQ0FDLElBQUFBLFdBQVcsR0FBRyxLQUFkO0FBQ0FRLElBQUFBLGFBQWEsR0FBRyxDQUFoQjtBQUNBMEYsSUFBQUEsV0FBVyxHQUFHLENBQWQ7QUFDQUMsSUFBQUEsUUFBUSxHQUFHLENBQVg7QUFDQUMsSUFBQUEsUUFBUSxHQUFHLENBQVg7QUFDQUMsSUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQUMsSUFBQUEsd0JBQXdCLEdBQUcsSUFBM0I7QUFDQUMsSUFBQUEsY0FBYyxHQUFHLEVBQWpCO0FBQ0FDLElBQUFBLHFCQUFxQixHQUFHLEVBQXhCO0FBQ0FsRyxJQUFBQSxrQkFBa0IsR0FBRyxJQUFyQjtBQUNBbUcsSUFBQUEsWUFBWSxHQUFHLEtBQWY7QUFDQUMsSUFBQUEsWUFBWSxHQUFHLEtBQWY7QUFDQXhHLElBQUFBLG1CQUFtQixHQUFHLENBQXRCO0FBQ0FDLElBQUFBLG1CQUFtQixHQUFHLENBQXRCLENBM0NrQixDQTZDbEI7O0FBQ0F3RyxJQUFBQSxrQkFBa0IsR0FBRyxLQUFyQjtBQUNBRSxJQUFBQSxhQUFhLEdBQUcsS0FBaEI7QUFDQUMsSUFBQUEsZUFBZSxHQUFHLEtBQWxCLENBaERrQixDQWdETzs7QUFDekJDLElBQUFBLGlCQUFpQixHQUFHLEtBQXBCLENBakRrQixDQWlEUzs7QUFDM0JDLElBQUFBLGlCQUFpQixHQUFHLEtBQXBCLENBbERrQixDQWtEUzs7QUFDM0JDLElBQUFBLGlCQUFpQixHQUFHLEtBQXBCO0FBQ0FDLElBQUFBLGNBQWMsR0FBRyxLQUFqQjtBQUVBQyxJQUFBQSxVQUFVLEdBQUcsQ0FBYjtBQUNBQyxJQUFBQSxVQUFVLEdBQUcsS0FBYjtBQUVBQyxJQUFBQSxvQkFBb0IsR0FBRyxJQUF2QjtBQUNBcEgsSUFBQUEsbUJBQW1CLEdBQUcsS0FBdEI7QUFDQUcsSUFBQUEsbUJBQW1CLEdBQUcsS0FBdEI7QUFDRCxHQTlId0I7QUFnSXpCa0ksRUFBQUEsY0FoSXlCLDBCQWdJVkMsSUFoSVUsRUFnSUo7QUFDbkIsUUFBSW5KLE9BQUosRUFBYTtBQUNYQyxNQUFBQSxXQUFXLEdBQUdrSixJQUFkO0FBQ0Q7QUFDRixHQXBJd0I7QUFzSXpCQyxFQUFBQSxjQXRJeUIsMEJBc0lWRCxJQXRJVSxFQXNJSjtBQUNuQixRQUFJbkosT0FBSixFQUFhO0FBQ1hFLE1BQUFBLFdBQVcsR0FBR2lKLElBQWQ7QUFDRDtBQUNGLEdBMUl3QjtBQTRJekI7O0FBRUE7OztBQUdBRSxFQUFBQSxNQWpKeUIsb0JBaUpoQjtBQUNQLFNBQUtKLGlCQUFMO0FBQ0EsU0FBS0ssV0FBTDtBQUNBcEIsSUFBQUEsV0FBVyxDQUFDWSxRQUFaLEdBQXVCLElBQXZCO0FBQ0EsU0FBS1MsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsS0FBckI7QUFDQXJDLElBQUFBLGNBQWMsR0FBRyxFQUFqQjtBQUNBLFNBQUtzQyxlQUFMO0FBQ0EsU0FBS2IsWUFBTCxHQUFvQjFCLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4REMsZUFBOUQsRUFBcEI7QUFDQSxTQUFLQyxnQkFBTDtBQUVBLFNBQUtDLGVBQUwsR0FBdUIsQ0FBdkI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixLQUFyQjtBQUNBbEMsSUFBQUEsaUJBQWlCLEdBQUcsS0FBcEI7QUFDRCxHQWhLd0I7QUFrS3pCeUIsRUFBQUEsV0FsS3lCLHlCQWtLWDtBQUNaVSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBdkMsSUFBQUEsZUFBZSxHQUFHLEtBQWxCO0FBQ0FDLElBQUFBLGlCQUFpQixHQUFHLEtBQXBCO0FBQ0FDLElBQUFBLGlCQUFpQixHQUFHLEtBQXBCO0FBQ0FQLElBQUFBLFlBQVksR0FBRyxLQUFmO0FBQ0FDLElBQUFBLFlBQVksR0FBRyxLQUFmO0FBQ0F4RyxJQUFBQSxtQkFBbUIsR0FBRyxDQUF0QjtBQUNBQyxJQUFBQSxtQkFBbUIsR0FBRyxDQUF0QjtBQUNBd0csSUFBQUEsa0JBQWtCLEdBQUcsS0FBckI7QUFDQUMsSUFBQUEsZ0JBQWdCLEdBQUcsS0FBbkI7QUFDRCxHQTdLd0I7O0FBK0t6Qjs7O0FBR0FpQyxFQUFBQSxlQWxMeUIsNkJBa0xQO0FBQ2hCLFFBQUksQ0FBQ3ZDLHdCQUFELElBQTZCQSx3QkFBd0IsSUFBSSxJQUE3RCxFQUFtRUEsd0JBQXdCLEdBQUdnRCxPQUFPLENBQUMsMEJBQUQsQ0FBbEM7QUFDcEUsR0FwTHdCOztBQXNMekI7OztBQUdBTixFQUFBQSxnQkF6THlCLDhCQXlMTjtBQUNqQixTQUFLTyxNQUFMLEdBQWMsS0FBSzNCLFVBQUwsQ0FBZ0I0QixZQUFoQixDQUE2QmpJLEVBQUUsQ0FBQ2dJLE1BQWhDLENBQWQ7QUFDQSxTQUFLRSxlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsU0FBS2pDLGNBQUwsR0FBc0IsRUFBdEI7QUFDQXRCLElBQUFBLFdBQVcsR0FBRyxDQUFkO0FBQ0FDLElBQUFBLFFBQVEsR0FBRyxDQUFYO0FBQ0FDLElBQUFBLFFBQVEsR0FBRyxDQUFYOztBQUVBLFFBQUksS0FBSzRCLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQTtBQUNBLFVBQUkxQix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERZLGFBQTlELE1BQWlGLElBQXJGLEVBQTJGO0FBQ3pGO0FBRUE7QUFDQSxZQUFJcEQsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0ZDLGlCQUF0RixDQUF3RyxjQUF4RyxLQUEySCxJQUEvSCxFQUFxSTtBQUNuSXZELFVBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERDLG9DQUExRCxDQUErRixJQUEvRjtBQUNBLGNBQUlDLE9BQU8sR0FBRzFELHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGQyxpQkFBdEYsQ0FBd0csZ0JBQXhHLENBQWQ7QUFDQSxlQUFLckMsY0FBTCxHQUFzQndDLE9BQXRCO0FBQ0ExRCxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERtQixVQUE5RCxHQUEyRSxLQUFLekMsY0FBTCxDQUFvQjBDLE1BQS9GO0FBQ0EsZUFBS0MsMkJBQUw7QUFDQSxlQUFLeEIsVUFBTCxHQUFrQnJDLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGQyxpQkFBdEYsQ0FBd0csWUFBeEcsQ0FBbEI7QUFDQSxlQUFLTyxZQUFMLENBQWtCLElBQWxCLEVBQXdCLEtBQUt6QixVQUE3QixFQVBtSSxDQVFuSTtBQUNBO0FBQ0QsU0FWRCxNQVVPO0FBQ0xyQyxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERtQixVQUE5RCxHQUEyRSxDQUEzRSxDQURLLENBRUw7O0FBQ0EzRCxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEQyxvQ0FBMUQsQ0FBK0YsSUFBL0Y7QUFDQXpELFVBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERPLDBCQUExRDtBQUNEO0FBQ0YsT0FwQkQsTUFvQk87QUFDTC9ELFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERRLDhCQUExRCxDQUF5RixJQUF6RixFQUErRixLQUEvRixFQUFzRyxLQUFLdEMsWUFBM0c7QUFDRDtBQUNGLEtBMUJELE1BMEJPLElBQUksS0FBS0EsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQztBQUNBMUIsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRFEsOEJBQTFELENBQXlGLElBQXpGLEVBQStGLEtBQS9GLEVBQXNHLEtBQUt0QyxZQUEzRztBQUNEO0FBQ0YsR0EvTndCO0FBaU96QjtBQUNBdUMsRUFBQUEsYUFsT3lCLDJCQWtPVDtBQUNkLFdBQU8sS0FBSzVCLFVBQVo7QUFDRCxHQXBPd0I7O0FBc096Qjs7O0FBR0E2QixFQUFBQSxVQXpPeUIsd0JBeU9aO0FBQ1gsUUFBSUMsT0FBTyxHQUFHLENBQWQ7QUFDQSxRQUFJQyxNQUFNLEdBQUdwRSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBMUc7QUFDQSxRQUFJQyxVQUFVLEdBQUcsS0FBS3RELGNBQXRCOztBQUVBLFNBQUssSUFBSXVELEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHRCxVQUFVLENBQUNaLE1BQXZDLEVBQStDYSxLQUFLLEVBQXBELEVBQXdEO0FBQ3RELFVBQUlMLE1BQU0sQ0FBQ3ZHLFNBQVAsSUFBb0IyRyxVQUFVLENBQUNDLEtBQUQsQ0FBVixDQUFrQjVHLFNBQTFDLEVBQXFEO0FBQ25Ec0csUUFBQUEsT0FBTyxHQUFHTSxLQUFWO0FBQ0E7QUFDRDtBQUNGOztBQUVELFdBQU9OLE9BQVA7QUFDRCxHQXRQd0I7QUF3UHpCTyxFQUFBQSxjQXhQeUIsNEJBd1BSO0FBQ2YsUUFBSUMsSUFBSSxHQUFHLEVBQVg7QUFDQSxRQUFJUCxNQUFNLEdBQUdwRSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBMUc7QUFDQSxRQUFJQyxVQUFVLEdBQUcsS0FBS3RELGNBQXRCOztBQUVBLFNBQUssSUFBSXVELEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHRCxVQUFVLENBQUNaLE1BQXZDLEVBQStDYSxLQUFLLEVBQXBELEVBQXdEO0FBQ3RELFVBQUlMLE1BQU0sQ0FBQ3ZHLFNBQVAsSUFBb0IyRyxVQUFVLENBQUNDLEtBQUQsQ0FBVixDQUFrQjVHLFNBQTFDLEVBQXFEO0FBQ25EOEcsUUFBQUEsSUFBSSxHQUFDUCxNQUFNLENBQUN2RyxTQUFaO0FBQ0E7QUFDRDtBQUNGOztBQUVELFdBQU84RyxJQUFQO0FBQ0QsR0FyUXdCO0FBc1F6QjtBQUVBO0FBRUFkLEVBQUFBLDJCQTFReUIseUNBMFFLO0FBQzVCLFFBQUlILE9BQU8sR0FBRzFELHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGQyxpQkFBdEYsQ0FBd0csZ0JBQXhHLENBQWQ7QUFDQSxTQUFLckMsY0FBTCxHQUFzQndDLE9BQXRCO0FBQ0EsU0FBS2tCLHdCQUFMLENBQThCLENBQTlCO0FBQ0E1RSxJQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERtQixVQUE5RCxHQUEyRSxLQUFLekMsY0FBTCxDQUFvQjBDLE1BQS9GO0FBQ0EsU0FBS2lCLGtCQUFMO0FBQ0EsU0FBS0MsaUJBQUw7QUFDQTlFLElBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMER1QiwrQkFBMUQ7QUFFQWpDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLCtCQUFaOztBQUNBLFNBQUssSUFBSTBCLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUt2RCxjQUFMLENBQW9CMEMsTUFBaEQsRUFBd0RhLEtBQUssRUFBN0QsRUFBaUU7QUFDL0QsVUFBSSxLQUFLdkQsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCMUYsaUJBQTNCLEdBQStDLENBQS9DLElBQW9ELEtBQUttQyxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ6RixzQkFBM0IsSUFBcUQsSUFBekcsSUFBaUgsQ0FBQyxLQUFLa0MsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCeEYsY0FBakosRUFBaUs7QUFDL0osWUFBSStGLE1BQU0sR0FBRy9KLEVBQUUsQ0FBQ2dLLElBQUgsQ0FBUWpGLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NzRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBELEtBQUtqRSxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkIxRixpQkFBckYsRUFBd0dxRyxpQkFBeEcsQ0FBMEhDLFFBQTFILENBQW1JQyxDQUEzSSxFQUE4SXRGLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NzRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBELEtBQUtqRSxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkIxRixpQkFBckYsRUFBd0dxRyxpQkFBeEcsQ0FBMEhDLFFBQTFILENBQW1JRSxDQUFqUixDQUFiOztBQUNBLGFBQUsvRCxjQUFMLENBQW9CaUQsS0FBcEIsRUFBMkJlLFdBQTNCLENBQXVDUixNQUFNLENBQUNNLENBQTlDLEVBQWlETixNQUFNLENBQUNPLENBQXhEO0FBQ0F6QyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaO0FBQ0QsT0FKRCxNQUlPO0FBQ0xELFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFxQixLQUFLN0IsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCMUYsaUJBQTVEO0FBQ0ErRCxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwrQkFBK0IsS0FBSzdCLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQnpGLHNCQUF0RTtBQUNBOEQsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQXFCLEtBQUs3QixjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ4RixjQUE1RDtBQUNEOztBQUVELFVBQUksS0FBS2lDLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQnhGLGNBQS9CLEVBQStDO0FBQzdDLFlBQUl3RyxVQUFVLEdBQUd6Rix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZCLE1BQTFELEdBQW1FLENBQXBGOztBQUNBLFlBQUlvQixNQUFNLEdBQUcvSixFQUFFLENBQUNnSyxJQUFILENBQVFqRix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRE0sVUFBMUQsRUFBc0VMLGlCQUF0RSxDQUF3RkMsUUFBeEYsQ0FBaUdDLENBQXpHLEVBQTRHdEYsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3NELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERNLFVBQTFELEVBQXNFTCxpQkFBdEUsQ0FBd0ZDLFFBQXhGLENBQWlHRSxDQUE3TSxDQUFiOztBQUNBLGFBQUsvRCxjQUFMLENBQW9CaUQsS0FBcEIsRUFBMkJlLFdBQTNCLENBQXVDUixNQUFNLENBQUNNLENBQTlDLEVBQWlETixNQUFNLENBQUNPLENBQXhEO0FBQ0F6QyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaO0FBQ0Q7QUFDRixLQTNCMkIsQ0E2QjVCOzs7QUFFQSxTQUFLLElBQUkwQixPQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE9BQUssR0FBR3pFLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RG1CLFVBQTFGLEVBQXNHYyxPQUFLLEVBQTNHLEVBQStHO0FBQzdHLFdBQUtqRCxjQUFMLENBQW9CaUQsT0FBcEIsRUFBMkJpQixNQUEzQixHQUFvQyxJQUFwQztBQUNEO0FBQ0YsR0E1U3dCO0FBOFN6QkMsRUFBQUEsd0NBOVN5QixzREE4U2tCO0FBQ3pDLFFBQUlDLHFCQUFxQixHQUFHNUYsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXdDLGdCQUE3RSxFQUE1Qjs7QUFDQSxRQUFJNUYsY0FBYyxDQUFDMkQsTUFBZixJQUF5QmdDLHFCQUE3QixFQUFvRDtBQUNsRDNGLE1BQUFBLGNBQWMsR0FBRyxFQUFqQjtBQUNBLFdBQUtxQyxhQUFMLEdBQXFCLElBQXJCO0FBQ0FRLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVCQUFaOztBQUNBLFVBQUksS0FBSzdCLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDeEUsU0FBckMsSUFBa0RtQyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGYSxJQUE3RixDQUFrR1csTUFBeEosRUFBZ0s7QUFDOUosYUFBSzVFLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDdEQsaUJBQXJDLEdBQXlEYSxXQUF6RDtBQUNBSSxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RTBCLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUgsS0FBSzdFLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLENBQW5IO0FBQ0EsYUFBSzJELFVBQUw7QUFDQWxELFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZL0Msd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsRUFBWjtBQUNBdkIsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQStCLEtBQUs3QixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3pFLFVBQWhGO0FBQ0Q7QUFDRjtBQUNGLEdBNVR3QjtBQThUekI7QUFFQTs7QUFFQTs7O0FBR0FxSSxFQUFBQSxpQkFyVXlCLDZCQXFVUEMsS0FyVU8sRUFxVUE7QUFDdkJsRyxJQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDdUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE2RUYsS0FBN0U7QUFDRCxHQXZVd0I7QUF5VXpCRyxFQUFBQSxtQkF6VXlCLGlDQXlVSDtBQUNwQkMsSUFBQUEsWUFBWSxDQUFDdkYsb0JBQUQsQ0FBWjtBQUNELEdBM1V3QjtBQTZVekJ3RixFQUFBQSxtQkE3VXlCLGlDQTZVSDtBQUFBOztBQUNwQixRQUFJLEtBQUs3RSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0FvQixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBMEJwQyxpQkFBdEM7O0FBQ0EsVUFBSUEsaUJBQWlCLElBQUksSUFBekIsRUFBK0I7QUFDN0IyRixRQUFBQSxZQUFZLENBQUN2RixvQkFBRCxDQUFaLENBRDZCLENBRTdCOztBQUNBSixRQUFBQSxpQkFBaUIsR0FBRyxLQUFwQjs7QUFDQSxZQUFJLENBQUMsS0FBS2tDLGFBQVYsRUFBeUI7QUFDdkIsZUFBS0EsYUFBTCxHQUFxQixJQUFyQjtBQUNBN0MsVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3NELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMEQsS0FBS3ZDLFdBQS9ELEVBQTRFd0MsaUJBQTVFLENBQThGbEMsWUFBOUYsQ0FBMkcsY0FBM0csRUFBMkhzRCxlQUEzSCxDQUEySSxLQUEzSSxFQUFrSixLQUFLN0QsZUFBdko7QUFDRDtBQUNGLE9BUkQsTUFRTztBQUNMNUIsUUFBQUEsb0JBQW9CLEdBQUcwRixVQUFVLENBQUMsWUFBTTtBQUN0QztBQUNBLFVBQUEsS0FBSSxDQUFDRixtQkFBTDtBQUNELFNBSGdDLEVBRzlCLElBSDhCLENBQWpDO0FBSUQ7QUFDRjtBQUNGLEdBaFd3QjtBQWtXekJHLEVBQUFBLGdCQWxXeUIsOEJBa1dOO0FBQ2pCLFNBQUs3RCxhQUFMLEdBQXFCLEtBQXJCO0FBQ0QsR0FwV3dCO0FBc1d6QjhELEVBQUFBLG1CQXRXeUIsK0JBc1dMVCxLQXRXSyxFQXNXRTtBQUN6QixTQUFLM0QsZUFBTDtBQUNBTyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBWjtBQUNBRCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWW1ELEtBQVo7QUFFQSxRQUFJVSxVQUFVLEdBQUdWLEtBQUssQ0FBQ1csVUFBdkI7QUFDQSxRQUFJQyxPQUFPLEdBQUdaLEtBQUssQ0FBQ1ksT0FBcEI7QUFFQSxTQUFLbkUsZUFBTCxHQUF1QmlFLFVBQXZCO0FBQ0EsU0FBS2hFLFdBQUwsR0FBbUJrRSxPQUFuQjs7QUFFQSxRQUFJLEtBQUtwRixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFVBQUksS0FBS1IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN4RSxTQUFyQyxJQUFrRG1DLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZhLElBQTdGLENBQWtHVyxNQUF4SixFQUNFOUYsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3NELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMEQyQixPQUExRCxFQUFtRTFCLGlCQUFuRSxDQUFxRmxDLFlBQXJGLENBQWtHLGNBQWxHLEVBQWtIc0QsZUFBbEgsQ0FBa0ksSUFBbEksRUFBd0lJLFVBQXhJLEVBREYsS0FFS2pHLGlCQUFpQixHQUFHLElBQXBCO0FBQ04sS0FKRCxNQUlPLElBQUksS0FBS2UsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQyxVQUFJLEtBQUtSLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDdEUsS0FBckMsSUFBOEMsS0FBbEQsRUFBeURpQyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRDJCLE9BQTFELEVBQW1FMUIsaUJBQW5FLENBQXFGbEMsWUFBckYsQ0FBa0csY0FBbEcsRUFBa0hzRCxlQUFsSCxDQUFrSSxJQUFsSSxFQUF3SUksVUFBeEksRUFBekQsS0FDSzVHLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NzRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEMkIsT0FBMUQsRUFBbUUxQixpQkFBbkUsQ0FBcUZsQyxZQUFyRixDQUFrRyxjQUFsRyxFQUFrSHNELGVBQWxILENBQWtJLEtBQWxJLEVBQXlJSSxVQUF6SSxFQUFxSixJQUFySjtBQUNOLEtBbEJ3QixDQW9CekI7O0FBQ0QsR0EzWHdCOztBQTZYekI7OztBQUdBRyxFQUFBQSxzQkFoWXlCLG9DQWdZQTtBQUN2QixRQUFJLEtBQUtyRixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFVBQUkxQix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGMEMsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILEtBQTlILEVBQXFJO0FBQ25JakgsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3VFLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNkVwRyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGYSxJQUE3RixDQUFrR1csTUFBL0s7QUFDRDtBQUNGLEtBSkQsTUFJTyxJQUFJLEtBQUtwRSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDb0IsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksMEJBQVo7QUFDQS9DLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0N1RSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTZFLEtBQUtsRixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQWxIO0FBQ0Q7QUFDRixHQXpZd0I7QUEyWXpCcUosRUFBQUEsV0EzWXlCLHlCQTJZWDtBQUNaLFFBQUksS0FBS2hHLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDeEUsU0FBckMsSUFBa0RtQyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGYSxJQUE3RixDQUFrR1csTUFBeEosRUFBZ0s7QUFDOUo5RixNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RTBCLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUgsS0FBSzdFLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLENBQW5IO0FBQ0FyQyxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRnlDLGlCQUF0RixDQUF3RyxnQkFBeEcsRUFBMEgsS0FBSzdFLGNBQS9ILEVBQStJLElBQS9JO0FBQ0Q7QUFDRixHQWhad0I7QUFrWnpCaUcsRUFBQUEsb0JBbFp5QixnQ0FrWkpDLElBbFpJLEVBa1pFO0FBQ3pCLFFBQUksS0FBSzFGLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBSTJGLElBQUksR0FBRyxDQUFDLENBQVo7O0FBRUEsV0FBSyxJQUFJNUMsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd4RSxjQUFjLENBQUMyRCxNQUEzQyxFQUFtRGEsS0FBSyxFQUF4RCxFQUE0RDtBQUMxRCxZQUFJeEUsY0FBYyxDQUFDd0UsS0FBRCxDQUFkLElBQXlCMkMsSUFBN0IsRUFBbUNDLElBQUksR0FBRzVDLEtBQVA7QUFDcEM7O0FBRUQsVUFBSTRDLElBQUksSUFBSSxDQUFDLENBQWIsRUFBZ0I7QUFDZHZFLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdDQUFaO0FBQ0E5QyxRQUFBQSxjQUFjLENBQUNxSCxNQUFmLENBQXNCRCxJQUF0QixFQUE0QixDQUE1QjtBQUNEO0FBQ0Y7QUFDRixHQS9ad0I7QUFpYXpCRSxFQUFBQSxpQkFqYXlCLCtCQWlhTDtBQUNsQixRQUFJM0IscUJBQXFCLEdBQUcsQ0FBNUI7O0FBRUEsU0FBSyxJQUFJNEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdEcsY0FBTCxDQUFvQjBDLE1BQXhDLEVBQWdENEQsQ0FBQyxFQUFqRCxFQUFxRDtBQUNuRCxVQUFJLEtBQUt0RyxjQUFMLENBQW9Cc0csQ0FBcEIsRUFBdUIvSCxRQUEzQixFQUFxQ21HLHFCQUFxQjtBQUMzRDs7QUFFRDlDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFpQjlDLGNBQWMsQ0FBQzJELE1BQTVDO0FBQ0FkLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDhCQUE4QjZDLHFCQUExQztBQUNBOUMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk5QyxjQUFaOztBQUVBLFFBQUlBLGNBQWMsQ0FBQzJELE1BQWYsSUFBeUJnQyxxQkFBN0IsRUFBb0Q7QUFDbEQzRixNQUFBQSxjQUFjLEdBQUcsRUFBakI7QUFDQSxXQUFLcUMsYUFBTCxHQUFxQixJQUFyQjs7QUFFQSxVQUFJLEtBQUtwQixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RmEsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLGFBQUs1RSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3RELGlCQUFyQyxHQUF5RGEsV0FBekQsQ0FEOEosQ0FFOUo7O0FBQ0EsYUFBS29HLFVBQUw7QUFDQWxELFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZL0Msd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsRUFBWjtBQUNBdkIsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQStCLEtBQUs3QixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3pFLFVBQWhGO0FBQ0Q7QUFDRjtBQUNGLEdBeGJ3Qjs7QUEwYnpCOzs7QUFHQTZKLEVBQUFBLHdCQTdieUIsb0NBNmJBTCxJQTdiQSxFQTZiTTtBQUM3QixRQUFJLEtBQUsxRixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0EsVUFBSTFCLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYwQyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsS0FBOUgsRUFBcUk7QUFDbkksWUFBSWhILGNBQWMsQ0FBQzJELE1BQWYsSUFBeUIsQ0FBN0IsRUFBZ0MzRCxjQUFjLENBQUN5SCxJQUFmLENBQW9CTixJQUFwQjtBQUVoQyxZQUFJTyxXQUFXLEdBQUcxSCxjQUFjLENBQUMyRCxNQUFqQztBQUNBLFlBQUlnRSxPQUFPLEdBQUcsS0FBZDs7QUFDQSxhQUFLLElBQUluRCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR2tELFdBQTVCLEVBQXlDbEQsS0FBSyxFQUE5QyxFQUFrRDtBQUNoRCxjQUFJeEUsY0FBYyxDQUFDd0UsS0FBRCxDQUFkLElBQXlCMkMsSUFBN0IsRUFBbUNRLE9BQU8sR0FBRyxJQUFWO0FBQ3BDOztBQUVELFlBQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQ1ozSCxVQUFBQSxjQUFjLENBQUN5SCxJQUFmLENBQW9CTixJQUFwQjtBQUNEOztBQUVELGFBQUtHLGlCQUFMO0FBQ0Q7QUFDRixLQWpCRCxNQWlCTyxJQUFJLEtBQUs3RixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDLFdBQUtZLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxXQUFLcEIsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN0RCxpQkFBckMsR0FBeURhLFdBQXpEO0FBQ0EsV0FBS29HLFVBQUw7QUFDRDtBQUNGLEdBcGR3Qjs7QUFzZHpCOzs7QUFHQUEsRUFBQUEsVUF6ZHlCLHdCQXlkWjtBQUNYLFFBQUksS0FBS3RFLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsV0FBS3dGLFdBQUw7QUFDRDs7QUFFRCxRQUFJLEtBQUs3RSxVQUFMLEdBQWtCLEtBQUtuQixjQUFMLENBQW9CMEMsTUFBcEIsR0FBNkIsQ0FBbkQsRUFBc0QsS0FBS3ZCLFVBQUwsR0FBa0IsS0FBS0EsVUFBTCxHQUFrQixDQUFwQyxDQUF0RCxLQUNLLEtBQUtBLFVBQUwsR0FBa0IsQ0FBbEI7QUFFTHJDLElBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0N1RSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTZFLEtBQUsvRCxVQUFsRjtBQUNELEdBbGV3QjtBQW9lekJ3RixFQUFBQSxlQXBleUIsNkJBb2VQLENBQ2hCO0FBQ0E7QUFDRCxHQXZld0I7QUF5ZXpCQyxFQUFBQSxvQkF6ZXlCLGtDQXllRjtBQUFBOztBQUNyQixRQUFJL0gsVUFBSixFQUFnQjtBQUNkdUcsTUFBQUEsWUFBWSxDQUFDdE0sa0JBQUQsQ0FBWjtBQUNBQSxNQUFBQSxrQkFBa0IsR0FBR3lNLFVBQVUsQ0FBQyxZQUFNO0FBQ3BDLFFBQUEsTUFBSSxDQUFDcUIsb0JBQUw7QUFDRCxPQUY4QixFQUU1QixJQUY0QixDQUEvQjtBQUdELEtBTEQsTUFLTztBQUNMeEIsTUFBQUEsWUFBWSxDQUFDdE0sa0JBQUQsQ0FBWjtBQUNBLFdBQUtnTSxVQUFMO0FBQ0Q7QUFDRixHQW5md0I7QUFxZnpCK0IsRUFBQUEsZ0JBcmZ5Qiw4QkFxZk47QUFDakIsU0FBSyxJQUFJdEQsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBS2xELFdBQUwsQ0FBaUJxQyxNQUE3QyxFQUFxRGEsS0FBSyxFQUExRCxFQUE4RDtBQUM1RCxXQUFLbEQsV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEOEUsd0JBQTdEO0FBQ0Q7QUFDRixHQXpmd0I7O0FBMmZ6Qjs7O0FBR0FDLEVBQUFBLFdBOWZ5Qix1QkE4ZmJDLEtBOWZhLEVBOGZOO0FBQUE7O0FBQ2pCLFFBQUksS0FBS3hHLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBSXlHLFNBQVMsR0FBR25JLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDRGLDhCQUE5RCxFQUFoQjs7QUFDQSxVQUFJLENBQUMsS0FBS2xILGNBQUwsQ0FBb0JnSCxLQUFwQixFQUEyQnpJLFFBQWhDLEVBQTBDO0FBQ3hDLFlBQUkwSSxTQUFKLEVBQWU7QUFDYixlQUFLbkMsVUFBTDtBQUNBO0FBQ0QsU0FIRCxNQUdPO0FBQ0w7QUFDRDtBQUNGO0FBQ0YsS0FYZ0IsQ0FhakI7OztBQUNBLFNBQUsrQixnQkFBTDtBQUNBakYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBV21GLEtBQXZCO0FBQ0EsUUFBSUcsY0FBYyxHQUFHLEtBQXJCO0FBQ0E5SCxJQUFBQSxhQUFhLEdBQUcsS0FBaEI7O0FBQ0EsUUFBSVIsVUFBSixFQUFnQjtBQUNkO0FBQ0EsVUFBSUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RjBDLGNBQTdGLENBQTRHQyxVQUE1RyxJQUEwSCxJQUE5SCxFQUFvSTtBQUNsSWxILFFBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0Q7O0FBRUQwRyxNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFlBQUksQ0FBQzNGLFVBQUwsRUFBaUI7QUFDZixVQUFBLE1BQUksQ0FBQ21ILFdBQUwsQ0FBaUJDLEtBQWpCO0FBQ0Q7QUFDRixPQUpTLEVBSVAsR0FKTyxDQUFWO0FBS0QsS0FYRCxNQVdPO0FBQ0wsV0FBSzdGLFVBQUwsR0FBa0I2RixLQUFsQjs7QUFDQSxVQUFJLEtBQUt4RyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFlBQUksS0FBS1IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN4RSxTQUFyQyxJQUFrRG1DLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZhLElBQTdGLENBQWtHVyxNQUF4SixFQUFnSztBQUM5SnVDLFVBQUFBLGNBQWMsR0FBRyxJQUFqQjtBQUNBOUgsVUFBQUEsYUFBYSxHQUFHLEtBQUtXLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDcEUsaUJBQXJDLENBQXVEaEIsWUFBdkU7O0FBQ0EsY0FBSSxDQUFDLEtBQUtpRSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BELGNBQTFDLEVBQTBEO0FBQ3hELGlCQUFLcUosa0JBQUwsQ0FBd0IsSUFBeEI7O0FBQ0EsZ0JBQUksQ0FBQy9ILGFBQUwsRUFBb0I7QUFDbEIsa0JBQUksS0FBS1csY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNwRSxpQkFBckMsQ0FBdURULGtCQUEzRCxFQUErRTtBQUM3RXdDLGdCQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEK0UsaUJBQTFEO0FBQ0EscUJBQUtySCxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RFQsa0JBQXZELEdBQTRFLEtBQTVFO0FBQ0F3QyxnQkFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRGdGLHVCQUExRCxDQUFrRixnREFBbEY7QUFDQTtBQUNELGVBTEQsTUFLTztBQUNML0IsZ0JBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z6RyxrQkFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRGlGLDJCQUExRCxDQUFzRixJQUF0RjtBQUNBekksa0JBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMEQrRSxpQkFBMUQ7QUFDQXhJLGtCQUFBQSxVQUFVLEdBQUcsS0FBYjtBQUNELGlCQUpTLEVBSVAsSUFKTyxDQUFWO0FBS0Q7O0FBQ0QrQyxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBbUIsS0FBSzdCLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDekUsVUFBcEU7QUFDRDtBQUNGO0FBQ0YsU0FyQkQsTUFxQk87QUFDTCxlQUFLMEssa0JBQUwsQ0FBd0IsS0FBeEI7QUFDRDtBQUNGLE9BekJELE1BeUJPLElBQUksS0FBSzVHLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakM7QUFDQTtBQUNBO0FBQ0EsWUFBSSxLQUFLUixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3RFLEtBQXJDLElBQThDLEtBQWxELEVBQXlEO0FBQ3ZEc0ssVUFBQUEsY0FBYyxHQUFHLElBQWpCO0FBQ0E5SCxVQUFBQSxhQUFhLEdBQUcsS0FBS1csY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNwRSxpQkFBckMsQ0FBdURoQixZQUF2RTs7QUFDQSxjQUFJLENBQUN4RCxZQUFMLEVBQW1CO0FBQ2pCLGlCQUFLNk8sa0JBQUwsQ0FBd0IsSUFBeEI7O0FBQ0EsZ0JBQUksQ0FBQy9ILGFBQUwsRUFBb0I7QUFDbEJrRyxjQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmMUcsZ0JBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0FDLGdCQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEaUYsMkJBQTFELENBQXNGLElBQXRGO0FBQ0F6SSxnQkFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRCtFLGlCQUExRDtBQUNELGVBSlMsRUFJUCxJQUpPLENBQVY7QUFLQXpGLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFtQixLQUFLN0IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN6RSxVQUFwRTtBQUNEO0FBQ0Y7QUFDRixTQWRELENBY0U7QUFkRixhQWVLO0FBQ0h5SyxZQUFBQSxjQUFjLEdBQUcsSUFBakI7QUFDQTlILFlBQUFBLGFBQWEsR0FBRyxLQUFLVyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RGhCLFlBQXZFOztBQUNBLGdCQUFJLENBQUN2RCxXQUFMLEVBQWtCO0FBQ2hCLG1CQUFLNE8sa0JBQUwsQ0FBd0IsS0FBeEI7O0FBQ0Esa0JBQUksQ0FBQy9ILGFBQUwsRUFBb0I7QUFDbEJrRyxnQkFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZjFHLGtCQUFBQSxVQUFVLEdBQUcsS0FBYjs7QUFDQSxrQkFBQSxNQUFJLENBQUMySSxRQUFMO0FBQ0QsaUJBSFMsRUFHUCxJQUhPLENBQVY7QUFJRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRCxXQUFLNUUsWUFBTCxDQUFrQixJQUFsQixFQUF3QixLQUFLekIsVUFBN0I7O0FBRUEsV0FBSyxJQUFJb0MsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBS2xELFdBQUwsQ0FBaUJxQyxNQUE3QyxFQUFxRGEsS0FBSyxFQUExRCxFQUE4RDtBQUM1RCxhQUFLbEQsV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEeUYsY0FBN0QsQ0FBNEVqRCxNQUE1RSxHQUFxRixLQUFyRjtBQUNBLGFBQUtuRSxXQUFMLENBQWlCa0QsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQ4RSx3QkFBN0Q7QUFDRDs7QUFFRCxVQUFJLEtBQUt0RyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0ExQixRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRnlDLGlCQUF0RixDQUF3RyxZQUF4RyxFQUFzSCxLQUFLMUQsVUFBM0gsRUFBdUksSUFBdkk7QUFDQVMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBYyxLQUFLN0IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN6RSxVQUEvRDtBQUNBa0YsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS3hCLFdBQUwsQ0FBaUIsS0FBS2MsVUFBdEIsRUFBa0NhLFlBQWxDLENBQStDLHNCQUEvQyxFQUF1RTBGLFVBQW5GO0FBQ0E5RixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWS9DLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEVBQVo7QUFDQXZCLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZL0Msd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXdGLGlCQUE3RSxFQUFaO0FBQ0EsYUFBS2pFLHdCQUFMLENBQThCLENBQTlCLEVBUDBCLENBUzFCOztBQUNBLFlBQUk1RSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGMEMsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILElBQTlILEVBQW9JLEtBQUtwRCwyQkFBTDtBQUNySSxPQS9FSSxDQWlGTDs7O0FBQ0EsVUFBSXdFLGNBQWMsSUFBSTlILGFBQXRCLEVBQXFDO0FBQ25DUixRQUFBQSxVQUFVLEdBQUcsS0FBYjtBQUNBQyxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEc0YsU0FBMUQsQ0FBb0UsdUJBQXBFLEVBQTZGLElBQTdGO0FBQ0EsYUFBS0Msa0JBQUwsQ0FBd0IsS0FBeEI7QUFDQSxhQUFLL0MsVUFBTDtBQUNBLGFBQUtzQyxrQkFBTCxDQUF3QixLQUF4QjtBQUNBO0FBQ0Q7O0FBRUQsVUFBSUQsY0FBYyxJQUFJLEtBQUtuSCxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BELGNBQTNELEVBQTJFO0FBQ3pFd0gsUUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZjFHLFVBQUFBLFVBQVUsR0FBRyxLQUFiOztBQUNBLFVBQUEsTUFBSSxDQUFDaUcsVUFBTDs7QUFDQSxVQUFBLE1BQUksQ0FBQ3NDLGtCQUFMLENBQXdCLEtBQXhCOztBQUNBO0FBQ0QsU0FMUyxFQUtQLEdBTE8sQ0FBVjtBQU1EO0FBQ0Y7O0FBRUQsU0FBS1UsWUFBTDtBQUNELEdBam9Cd0I7QUFtb0J6QnBFLEVBQUFBLHdCQW5vQnlCLG9DQW1vQkF5QyxJQW5vQkEsRUFtb0JNO0FBQzdCLFFBQUk0QixlQUFlLEdBQUdqSix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFd0YsaUJBQTdFLEVBQXRCO0FBQ0EsUUFBSUssTUFBTSxHQUFHbEosd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsRUFBYjtBQUNBLFFBQUk4RSxRQUFRLEdBQUc5QixJQUFmLENBSDZCLENBSTdCO0FBQ0E7O0FBRUEsU0FBSyxJQUFJNUMsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd3RSxlQUFlLENBQUNyRixNQUE1QyxFQUFvRGEsS0FBSyxFQUF6RCxFQUE2RDtBQUMzRCxVQUFJLEtBQUt2RCxjQUFMLENBQW9CaUksUUFBcEIsRUFBOEIxSixRQUE5QixJQUEwQyxLQUE5QyxFQUFxRDtBQUNuRCxZQUFJMEosUUFBUSxHQUFHLEtBQUtqSSxjQUFMLENBQW9CMEMsTUFBcEIsR0FBNkIsQ0FBNUMsRUFBK0M7QUFDN0N1RixVQUFBQSxRQUFRO0FBQ1IsZUFBS3ZFLHdCQUFMLENBQThCdUUsUUFBOUI7QUFDRCxTQUhELE1BR087QUFDTHJHLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDQUQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzdCLGNBQWpCO0FBQ0Q7QUFDRixPQVJELE1BUU87QUFDTCxZQUFJLEtBQUtBLGNBQUwsQ0FBb0JpSSxRQUFwQixFQUE4QnRMLFNBQTlCLElBQTJDb0wsZUFBZSxDQUFDeEUsS0FBRCxDQUFmLENBQXVCSCxnQkFBdkIsQ0FBd0NDLGlCQUF4QyxDQUEwRDFHLFNBQXpHLEVBQW9IO0FBQ2xILGVBQUtxRCxjQUFMLENBQW9CaUksUUFBcEIsSUFBZ0NGLGVBQWUsQ0FBQ3hFLEtBQUQsQ0FBZixDQUF1QkgsZ0JBQXZCLENBQXdDQyxpQkFBeEU7O0FBRUEsY0FBSTRFLFFBQVEsR0FBRyxLQUFLakksY0FBTCxDQUFvQjBDLE1BQXBCLEdBQTZCLENBQTVDLEVBQStDO0FBQzdDdUYsWUFBQUEsUUFBUSxHQURxQyxDQUU3Qzs7QUFDQSxpQkFBS3ZFLHdCQUFMLENBQThCdUUsUUFBOUI7QUFDRCxXQUpELE1BSU87QUFDTHJHLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDQUQsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzdCLGNBQWpCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRixHQWxxQndCOztBQW9xQnpCOzs7Ozs7QUFNQWtJLEVBQUFBLFNBMXFCeUIsdUJBMHFCYjtBQUNWdEcsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzdCLGNBQWpCO0FBQ0EsU0FBSzJELGtCQUFMO0FBQ0EsU0FBS0MsaUJBQUw7QUFDQSxTQUFLekMsVUFBTCxHQUFrQixDQUFsQixDQUpVLENBSVc7QUFFckI7O0FBQ0FyQyxJQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDdUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE2RSxLQUFLL0QsVUFBbEY7QUFDRCxHQWxyQndCO0FBb3JCekJnSCxFQUFBQSxtQkFwckJ5QiwrQkFvckJMbkQsS0FwckJLLEVBb3JCRTtBQUN6QjtBQUNBLFFBQUlvRCxhQUFhLEdBQUdwRCxLQUFLLENBQUNmLElBQU4sQ0FBV29FLFVBQS9CO0FBQ0EsUUFBSXJCLEtBQUssR0FBR2hDLEtBQUssQ0FBQ2YsSUFBTixDQUFXcUUsSUFBdkI7QUFDQSxRQUFJQyxXQUFXLEdBQUd2RCxLQUFLLENBQUNmLElBQU4sQ0FBV3VFLGNBQTdCO0FBRUE1RyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWW1ELEtBQVosRUFOeUIsQ0FPekI7QUFDQTtBQUNBOztBQUVBLFNBQUtoRixjQUFMLENBQW9CZ0gsS0FBcEIsSUFBNkJ1QixXQUE3QjtBQUVBLFNBQUs1RSxrQkFBTCxDQUF3QixJQUF4QjtBQUNBLFNBQUtDLGlCQUFMLENBQXVCLElBQXZCO0FBRUEsU0FBS2hCLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsS0FBS3pCLFVBQTdCOztBQUVBLFNBQUssSUFBSW9DLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUtsRCxXQUFMLENBQWlCcUMsTUFBN0MsRUFBcURhLEtBQUssRUFBMUQsRUFBOEQ7QUFDNUQsV0FBS2xELFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHlGLGNBQTdELENBQTRFakQsTUFBNUUsR0FBcUYsS0FBckY7QUFDQSxXQUFLbkUsV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEOEUsd0JBQTdEO0FBQ0Q7O0FBRUQsUUFBSSxLQUFLdEcsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBMUIsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0Z5QyxpQkFBdEYsQ0FBd0csWUFBeEcsRUFBc0gsS0FBSzFELFVBQTNILEVBQXVJLElBQXZJO0FBQ0EsV0FBS3VDLHdCQUFMLENBQThCLENBQTlCLEVBSDBCLENBSzFCOztBQUNBLFVBQUk1RSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGMEMsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILElBQTlILEVBQW9JLEtBQUtwRCwyQkFBTDtBQUNySTtBQUNGLEdBbnRCd0I7QUFxdEJ6QjhGLEVBQUFBLHNCQXJ0QnlCLG9DQXF0QkE7QUFDdkIsU0FBSzlFLGtCQUFMLENBQXdCLElBQXhCO0FBQ0EsU0FBS0MsaUJBQUwsQ0FBdUIsSUFBdkI7QUFDQTJCLElBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Z6RyxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEaUYsMkJBQTFELENBQXNGLElBQXRGO0FBQ0F6SSxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEK0UsaUJBQTFEO0FBQ0QsS0FIUyxFQUdQLElBSE8sQ0FBVjtBQUtBLFNBQUt6RSxZQUFMLENBQWtCLElBQWxCLEVBQXdCLEtBQUt6QixVQUE3Qjs7QUFFQSxTQUFLLElBQUlvQyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLbEQsV0FBTCxDQUFpQnFDLE1BQTdDLEVBQXFEYSxLQUFLLEVBQTFELEVBQThEO0FBQzVELFdBQUtsRCxXQUFMLENBQWlCa0QsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkR5RixjQUE3RCxDQUE0RWpELE1BQTVFLEdBQXFGLEtBQXJGO0FBQ0EsV0FBS25FLFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RDhFLHdCQUE3RDtBQUNEOztBQUVELFFBQUksS0FBS3RHLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQTFCLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGeUMsaUJBQXRGLENBQXdHLFlBQXhHLEVBQXNILEtBQUsxRCxVQUEzSCxFQUF1SSxJQUF2STtBQUNBLFdBQUt1Qyx3QkFBTCxDQUE4QixDQUE5QixFQUgwQixDQUsxQjs7QUFDQSxVQUFJNUUsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RjBDLGNBQTdGLENBQTRHQyxVQUE1RyxJQUEwSCxJQUE5SCxFQUFvSSxLQUFLcEQsMkJBQUw7QUFDckk7QUFDRixHQTV1QndCO0FBNnVCekI7QUFFQTs7QUFDQTs7Ozs7O0FBTUFnQixFQUFBQSxrQkF0dkJ5Qiw4QkFzdkJOeUUsYUF0dkJNLEVBc3ZCaUI7QUFBQSxRQUF2QkEsYUFBdUI7QUFBdkJBLE1BQUFBLGFBQXVCLEdBQVAsS0FBTztBQUFBOztBQUN4QyxRQUFJLEtBQUs1SCxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0EsVUFBSSxDQUFDNEgsYUFBTCxFQUFvQjtBQUNsQixZQUFJTSxZQUFZLEdBQUcsS0FBS0MsU0FBTCxDQUFlLENBQWYsRUFBa0IsS0FBSzFJLFdBQUwsQ0FBaUJ5QyxNQUFuQyxDQUFuQjs7QUFDQSxhQUFLMUMsY0FBTCxDQUFvQndHLElBQXBCLENBQXlCLEtBQUt2RyxXQUFMLENBQWlCeUksWUFBakIsQ0FBekI7QUFDQTVKLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RG1CLFVBQTlELEdBQTJFLENBQTNFO0FBQ0Q7QUFDRjs7QUFFRCxTQUFLLElBQUljLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHekUsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEbUIsVUFBMUYsRUFBc0djLEtBQUssRUFBM0csRUFBK0c7QUFDN0csV0FBS2xELFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QmlCLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0EsV0FBS25FLFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RDBGLFVBQTdELEdBQTBFLEtBQUsxSCxjQUFMLENBQW9CdUQsS0FBcEIsQ0FBMUU7QUFDQSxXQUFLbEQsV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZENEcsT0FBN0QsQ0FBcUUsS0FBSzVJLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQjdHLFVBQWhHO0FBQ0EsV0FBSzJELFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RDZHLFNBQTdELENBQXVFLEtBQUs3SSxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkIzRyxRQUFsRztBQUNBLFdBQUt5RCxXQUFMLENBQWlCa0QsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQ4RSx3QkFBN0Q7QUFDRDtBQUNGLEdBdndCd0I7QUF5d0J6QmxFLEVBQUFBLFlBendCeUIsd0JBeXdCWmtHLGdCQXp3QlksRUF5d0JNQyxNQXp3Qk4sRUF5d0JjO0FBQ3JDLFFBQUlELGdCQUFKLEVBQXNCO0FBQ3BCLFdBQUt6SSxXQUFMLENBQWlCMEksTUFBakIsRUFBeUIvRyxZQUF6QixDQUFzQyxzQkFBdEMsRUFBOEQwRixVQUE5RCxHQUEyRSxLQUFLMUgsY0FBTCxDQUFvQitJLE1BQXBCLENBQTNFOztBQUVBLFdBQUssSUFBSXhGLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHekUsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEbUIsVUFBMUYsRUFBc0djLEtBQUssRUFBM0csRUFBK0c7QUFDN0csWUFBSXdGLE1BQU0sSUFBSXhGLEtBQWQsRUFBcUI7QUFDbkIsZUFBS2xELFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RGdILG1CQUE3RCxDQUFpRixJQUFqRjtBQUNBLGVBQUszSSxXQUFMLENBQWlCa0QsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkRpSCxvQkFBN0QsQ0FBa0YsSUFBbEY7QUFDQSxlQUFLNUksV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEOEUsd0JBQTdEO0FBQ0QsU0FKRCxNQUlPO0FBQ0wsZUFBS3pHLFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RDhFLHdCQUE3RDtBQUNBLGVBQUt6RyxXQUFMLENBQWlCa0QsS0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkRnSCxtQkFBN0QsQ0FBaUYsS0FBakY7QUFDQSxlQUFLM0ksV0FBTCxDQUFpQmtELEtBQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEaUgsb0JBQTdELENBQWtGLEtBQWxGO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsR0F6eEJ3Qjs7QUEyeEJ6Qjs7Ozs7O0FBTUFyRixFQUFBQSxpQkFqeUJ5Qiw2QkFpeUJQd0UsYUFqeUJPLEVBaXlCZ0I7QUFBQSxRQUF2QkEsYUFBdUI7QUFBdkJBLE1BQUFBLGFBQXVCLEdBQVAsS0FBTztBQUFBOztBQUN2QyxRQUFJLENBQUNBLGFBQUwsRUFBb0I7QUFDbEIsV0FBSyxJQUFJN0UsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBS3ZELGNBQUwsQ0FBb0IwQyxNQUFoRCxFQUF3RGEsS0FBSyxFQUE3RCxFQUFpRTtBQUMvRCxZQUFJLEtBQUt2RCxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ2RyxlQUEzQixJQUE4QyxDQUE5QyxJQUFtRCxDQUFDLEtBQUtnRCxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ6RixzQkFBbkYsRUFBMkcsS0FBS3dDLGNBQUwsQ0FBb0JpRCxLQUFwQixFQUEyQmUsV0FBM0IsQ0FBdUMsS0FBSy9ELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCNEQsUUFBM0IsQ0FBb0NDLENBQTNFLEVBQThFLEtBQUs3RCxrQkFBTCxDQUF3QixDQUF4QixFQUEyQjRELFFBQTNCLENBQW9DRSxDQUFsSCxFQUEzRyxLQUNLLElBQUksS0FBS3JFLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQnRHLG9CQUEzQixJQUFtRCxDQUFuRCxJQUF3RCxDQUFDLEtBQUsrQyxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ6RixzQkFBeEYsRUFBZ0gsS0FBS3dDLGNBQUwsQ0FBb0JpRCxLQUFwQixFQUEyQmUsV0FBM0IsQ0FBdUMsS0FBSy9ELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCNEQsUUFBM0IsQ0FBb0NDLENBQTNFLEVBQThFLEtBQUs3RCxrQkFBTCxDQUF3QixDQUF4QixFQUEyQjRELFFBQTNCLENBQW9DRSxDQUFsSDtBQUN0SDtBQUNGLEtBTEQsTUFLTztBQUNMLFVBQUksS0FBS3JFLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDbkUsZUFBckMsSUFBd0QsQ0FBNUQsRUFBK0QsS0FBS3NELGNBQUwsQ0FBb0IsS0FBS2EsVUFBekIsRUFBcUNtRCxXQUFyQyxDQUFpRCxLQUFLL0Qsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkI0RCxRQUEzQixDQUFvQ0MsQ0FBckYsRUFBd0YsS0FBSzdELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCNEQsUUFBM0IsQ0FBb0NFLENBQTVILEVBQS9ELEtBQ0ssSUFBSSxLQUFLckUsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNsRSxvQkFBckMsSUFBNkQsQ0FBakUsRUFBb0UsS0FBS3FELGNBQUwsQ0FBb0IsS0FBS2EsVUFBekIsRUFBcUNtRCxXQUFyQyxDQUFpRCxLQUFLL0Qsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkI0RCxRQUEzQixDQUFvQ0MsQ0FBckYsRUFBd0YsS0FBSzdELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCNEQsUUFBM0IsQ0FBb0NFLENBQTVIO0FBQzFFOztBQUVELFNBQUssSUFBSWQsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUd6RSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERtQixVQUExRixFQUFzR2MsT0FBSyxFQUEzRyxFQUErRztBQUM3RyxXQUFLakQsY0FBTCxDQUFvQmlELE9BQXBCLEVBQTJCaUIsTUFBM0IsR0FBb0MsSUFBcEM7QUFDRDs7QUFFRCxTQUFLLElBQUlqQixPQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE9BQUssR0FBRyxLQUFLdkQsY0FBTCxDQUFvQjBDLE1BQWhELEVBQXdEYSxPQUFLLEVBQTdELEVBQWlFO0FBQy9ELFdBQUtqRCxjQUFMLENBQW9CaUQsT0FBcEIsRUFBMkIyRixRQUEzQixDQUFvQyxDQUFwQyxFQUF1Q2xILFlBQXZDLENBQW9EakksRUFBRSxDQUFDb1AsTUFBdkQsRUFBK0RDLFdBQS9ELEdBQTZFdEssd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRCtHLGFBQTFELENBQXdFLEtBQUtySixjQUFMLENBQW9CdUQsT0FBcEIsRUFBMkIzRyxRQUFuRyxDQUE3RTtBQUNEO0FBQ0YsR0FuekJ3QjtBQXF6QnpCME0sRUFBQUEseUJBcnpCeUIsdUNBcXpCRztBQUMxQixRQUFJQyxTQUFTLEdBQUcsS0FBS2pKLGNBQUwsQ0FBb0IsS0FBS2EsVUFBekIsRUFBcUNxSSxxQkFBckMsQ0FBMkR6UCxFQUFFLENBQUNnSyxJQUFILENBQVEsQ0FBUixFQUFXLEdBQVgsQ0FBM0QsQ0FBaEI7QUFDQSxTQUFLM0QsVUFBTCxDQUFnQitELFFBQWhCLEdBQTJCLEtBQUsvRCxVQUFMLENBQWdCcUosTUFBaEIsQ0FBdUJDLG9CQUF2QixDQUE0Q0gsU0FBNUMsQ0FBM0I7QUFFQSxRQUFJSSxLQUFLLEdBQUdKLFNBQVMsQ0FBQ2xGLENBQVYsR0FBY3RLLEVBQUUsQ0FBQzZQLE9BQUgsQ0FBV0MsTUFBckM7QUFDQSxTQUFLOUgsTUFBTCxDQUFZK0gsU0FBWixHQUF3QixDQUF4QjtBQUNELEdBM3pCd0I7QUE2ekJ6QkMsRUFBQUEsVUE3ekJ5Qix3QkE2ekJaO0FBQ1gsUUFBSSxLQUFLOUgsZUFBVCxFQUEwQixLQUFLcUgseUJBQUw7QUFDM0IsR0EvekJ3QjtBQWkwQnpCVSxFQUFBQSxZQWowQnlCLHdCQWkwQlpDLEtBajBCWSxFQWkwQkw7QUFDbEIsUUFBSUMsTUFBTSxHQUFHRCxLQUFLLENBQUNFLEtBQW5CO0FBQ0EsUUFBSUMsTUFBTSxHQUFHSCxLQUFLLENBQUNJLEtBQW5COztBQUNBLFFBQUlDLE9BQU8sR0FBR0osTUFBTSxHQUFHRSxNQUF2Qjs7QUFFQXZMLElBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0EsU0FBSzhDLGFBQUwsR0FBcUIsS0FBckI7O0FBRUEsUUFBSSxLQUFLbkIsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLFdBQUssSUFBSStDLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHekUsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXdGLGlCQUE3RSxHQUFpR2pGLE1BQTdILEVBQXFJYSxLQUFLLEVBQTFJLEVBQThJO0FBQzVJLFlBQUl6RSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFd0YsaUJBQTdFLEdBQWlHcEUsS0FBakcsRUFBd0dILGdCQUF4RyxDQUF5SGEsSUFBekgsQ0FBOEhXLE1BQTlILElBQXdJLEtBQUs1RSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQWpMLEVBQTRMO0FBQzFMaUYsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksb0JBQW9CLEtBQUs3QixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3pFLFVBQXJFO0FBQ0EsZUFBS3NELGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDdEQsaUJBQXJDLEdBQXlEaUIsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXdGLGlCQUE3RSxHQUFpR3BFLEtBQWpHLEVBQXdHSCxnQkFBeEcsQ0FBeUhDLGlCQUF6SCxDQUEySXhGLGlCQUFwTTtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxRQUFJLEtBQUttQyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3RELGlCQUFyQyxJQUEwRCxDQUExRCxJQUErRCxDQUFDLEtBQUttQyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3JELHNCQUF6RyxFQUFpSTtBQUMvSCxVQUFJLEtBQUtrQyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3JFLFlBQXJDLENBQWtELENBQWxELEVBQXFEckMsWUFBckQsSUFBcUUsQ0FBekUsRUFBNEU7QUFDMUVpRSxRQUFBQSxXQUFXLEdBQUcsQ0FBZDtBQUNBLGFBQUtzQixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3JELHNCQUFyQyxHQUE4RCxJQUE5RDtBQUNBOEQsUUFBQUEsT0FBTyxDQUFDMkksS0FBUixDQUFjN0wsV0FBZDtBQUNELE9BSkQsTUFJTztBQUNMLGFBQUtzQixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3JELHNCQUFyQyxHQUE4RCxJQUE5RDtBQUNBWSxRQUFBQSxXQUFXLEdBQUcsRUFBZDtBQUNBa0QsUUFBQUEsT0FBTyxDQUFDMkksS0FBUixDQUFjN0wsV0FBZDtBQUNEO0FBQ0YsS0FWRCxNQVVPO0FBQ0wsVUFBSSxLQUFLc0IsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN0RCxpQkFBckMsSUFBMEQsRUFBOUQsRUFBa0UsS0FBS21DLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDdEQsaUJBQXJDLEdBQXlELEtBQUttQyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3RELGlCQUFyQyxHQUF5RCxFQUFsSCxDQUFsRSxLQUNLLEtBQUttQyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3RELGlCQUFyQyxHQUF5RCxLQUFLbUMsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN0RCxpQkFBckMsR0FBeUQsQ0FBbEg7QUFFTGEsTUFBQUEsV0FBVyxHQUFHLEtBQUtzQixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3RELGlCQUFuRDtBQUNBK0QsTUFBQUEsT0FBTyxDQUFDMkksS0FBUixDQUFjN0wsV0FBVyxHQUFHLENBQTVCO0FBQ0Q7O0FBRURFLElBQUFBLFFBQVEsR0FBRzBMLE9BQVg7QUFDQTNMLElBQUFBLFFBQVEsR0FBRyxDQUFYO0FBQ0FHLElBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERrSSwyQkFBMUQsQ0FBc0Y1TCxRQUF0Rjs7QUFFQSxTQUFLLElBQUkyRSxPQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE9BQUssR0FBRyxLQUFLbEQsV0FBTCxDQUFpQnFDLE1BQTdDLEVBQXFEYSxPQUFLLEVBQTFELEVBQThEO0FBQzVELFVBQUksS0FBS3BDLFVBQUwsSUFBbUJvQyxPQUF2QixFQUE4QjtBQUM1QixhQUFLbEQsV0FBTCxDQUFpQmtELE9BQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEeUYsY0FBN0QsQ0FBNEVqRCxNQUE1RSxHQUFxRixJQUFyRjs7QUFDQSxhQUFLbkUsV0FBTCxDQUFpQmtELE9BQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEeUYsY0FBN0QsQ0FBNEV6RixZQUE1RSxDQUF5RixnQkFBekYsRUFBMkd5SSxXQUEzRyxDQUF1SFAsTUFBdkgsRUFBK0hFLE1BQS9IOztBQUNBLGFBQUsvSixXQUFMLENBQWlCa0QsT0FBakIsRUFBd0J2QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkQ4RSx3QkFBN0Q7QUFDRCxPQUpELE1BSU87QUFDTCxhQUFLekcsV0FBTCxDQUFpQmtELE9BQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEeUYsY0FBN0QsQ0FBNEVqRCxNQUE1RSxHQUFxRixLQUFyRjs7QUFDQSxhQUFLbkUsV0FBTCxDQUFpQmtELE9BQWpCLEVBQXdCdkIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEOEUsd0JBQTdEO0FBQ0Q7QUFDRjs7QUFFRCxTQUFLZ0IsWUFBTCxHQW5Ea0IsQ0FvRGxCO0FBQ0E7QUFDQTtBQUNELEdBeDNCd0I7QUEwM0J6QkEsRUFBQUEsWUExM0J5QiwwQkEwM0JWO0FBQ2IsUUFBSSxLQUFLdEgsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixXQUFLa0Qsd0JBQUwsQ0FBOEIsQ0FBOUI7QUFDRDs7QUFFRCxTQUFLLElBQUlILEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUtsRCxXQUFMLENBQWlCcUMsTUFBN0MsRUFBcURhLEtBQUssRUFBMUQsRUFBOEQ7QUFDNUQsV0FBS2xELFdBQUwsQ0FBaUJrRCxLQUFqQixFQUF3QnZCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RDhFLHdCQUE3RDtBQUNEO0FBQ0YsR0FsNEJ3QjtBQW00QnpCNEQsRUFBQUEsZ0JBbjRCeUIsOEJBbTRCTjtBQUNqQixRQUFJbkIsU0FBUyxHQUFHLEtBQUtqSixjQUFMLENBQW9CLEtBQUthLFVBQXpCLEVBQXFDcUkscUJBQXJDLENBQTJEelAsRUFBRSxDQUFDZ0ssSUFBSCxDQUFRLENBQVIsRUFBVyxHQUFYLENBQTNELENBQWhCOztBQUNBLFFBQUk0RyxJQUFJLEdBQUcsS0FBS3ZLLFVBQUwsQ0FBZ0JxSixNQUFoQixDQUF1QkMsb0JBQXZCLENBQTRDSCxTQUE1QyxDQUFYOztBQUNBLFNBQUtxQixXQUFMLENBQWlCRCxJQUFqQixFQUF1QixJQUF2QixFQUE2QixHQUE3QjtBQUNELEdBdjRCd0I7QUF5NEJ6QkUsRUFBQUEsY0F6NEJ5QiwwQkF5NEJWQyxRQXo0QlUsRUF5NEJBO0FBQ3ZCLFFBQUlDLFdBQVcsR0FBRyxDQUFsQjtBQUNBLFFBQUlDLFlBQVksR0FBRyxDQUFuQjs7QUFDQSxTQUFLLElBQUl6SCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3pFLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkV3RixpQkFBN0UsR0FBaUdqRixNQUE3SCxFQUFxSWEsS0FBSyxFQUExSSxFQUE4STtBQUM1SSxVQUFJekUsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXdGLGlCQUE3RSxHQUFpR3BFLEtBQWpHLEVBQXdHSCxnQkFBeEcsQ0FBeUhhLElBQXpILENBQThIVyxNQUE5SCxJQUF3SSxLQUFLNUUsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN4RSxTQUFqTCxFQUE0TDtBQUMxTDtBQUNBcU8sUUFBQUEsWUFBWSxHQUFHbE0sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXdGLGlCQUE3RSxHQUFpR3BFLEtBQWpHLEVBQXdHSCxnQkFBeEcsQ0FBeUhDLGlCQUF6SCxDQUEySXhGLGlCQUExSjtBQUNEO0FBQ0Y7O0FBRUQsUUFBSW1OLFlBQVksR0FBRyxDQUFmLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3hCcEosTUFBQUEsT0FBTyxDQUFDMkksS0FBUixDQUFjLHdCQUFkO0FBQ0FRLE1BQUFBLFdBQVcsR0FBR0MsWUFBWSxHQUFHRixRQUFmLEdBQTBCLENBQXhDO0FBQ0EsVUFBSUcsUUFBUSxHQUFHQyxRQUFRLENBQUNwTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRDhHLFdBQTFELEVBQXVFN0csaUJBQXZFLENBQXlGbEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0htSixTQUF0SCxDQUFnSUMsVUFBakksQ0FBdkI7QUFDQXhKLE1BQUFBLE9BQU8sQ0FBQzJJLEtBQVIsQ0FBYyxZQUFZVSxRQUExQjtBQUNELEtBTEQsTUFLTztBQUNMRixNQUFBQSxXQUFXLEdBQUdDLFlBQVksR0FBR0YsUUFBN0I7QUFDQSxVQUFJRyxRQUFRLEdBQUdDLFFBQVEsQ0FBQ3BNLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NzRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEOEcsV0FBMUQsRUFBdUU3RyxpQkFBdkUsQ0FBeUZsQyxZQUF6RixDQUFzRyxjQUF0RyxFQUFzSG1KLFNBQXRILENBQWdJQyxVQUFqSSxDQUF2QjtBQUNBeEosTUFBQUEsT0FBTyxDQUFDMkksS0FBUixDQUFjLFlBQVlVLFFBQTFCO0FBQ0Q7QUFDRixHQTc1QndCO0FBKzVCekJ6RCxFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDcEIsUUFBSSxDQUFDNUgsVUFBTCxFQUFpQjtBQUNmLFVBQUl5TCxLQUFKO0FBQ0EsVUFBSUMsS0FBSjs7QUFDQSxVQUFJMVQsT0FBTyxJQUFJLEtBQUtvSSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3RFLEtBQXJDLElBQThDLEtBQTdELEVBQW9FO0FBQ2xFd08sUUFBQUEsS0FBSyxHQUFHSCxRQUFRLENBQUNyVCxXQUFELENBQWhCO0FBQ0F5VCxRQUFBQSxLQUFLLEdBQUdKLFFBQVEsQ0FBQ3BULFdBQUQsQ0FBaEI7QUFDRCxPQUhELE1BR08sSUFBSSxLQUFLa0ksY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN0RSxLQUFyQyxJQUE4QyxJQUE5QyxJQUFzRGpGLE9BQTFELEVBQW1FO0FBQ3hFeVQsUUFBQUEsS0FBSyxHQUFHLENBQVI7QUFDQUMsUUFBQUEsS0FBSyxHQUFHLENBQVI7QUFDRCxPQUhNLE1BR0E7QUFDTEQsUUFBQUEsS0FBSyxHQUFHLEtBQUsxQyxTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFSO0FBQ0EyQyxRQUFBQSxLQUFLLEdBQUcsS0FBSzNDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVI7QUFFQSxZQUFJNVEsaUJBQWlCLElBQUlzVCxLQUF6QixFQUFnQ0EsS0FBSyxHQUFHLEtBQUsxQyxTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFSO0FBRWhDLFlBQUkzUSxpQkFBaUIsSUFBSXNULEtBQXpCLEVBQWdDQSxLQUFLLEdBQUcsS0FBSzNDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVI7QUFFaEM1USxRQUFBQSxpQkFBaUIsR0FBR3NULEtBQXBCO0FBQ0FyVCxRQUFBQSxpQkFBaUIsR0FBR3NULEtBQXBCO0FBQ0QsT0FuQmMsQ0FxQmY7QUFDQTs7O0FBRUExTSxNQUFBQSxRQUFRLEdBQUd5TSxLQUFLLEdBQUdDLEtBQW5CO0FBQ0EsVUFBSUMsUUFBUSxHQUFHO0FBQUVwQixRQUFBQSxLQUFLLEVBQUVrQixLQUFUO0FBQWdCaEIsUUFBQUEsS0FBSyxFQUFFaUI7QUFBdkIsT0FBZixDQXpCZSxDQTBCZjtBQUNBOztBQUNBMUosTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQWtCakQsUUFBbEIsR0FBNkIsVUFBN0IsR0FBMEN5TSxLQUExQyxHQUFrRCxVQUFsRCxHQUErREMsS0FBM0U7QUFFQXhNLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0N1RSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTZFcUcsUUFBN0U7QUFDRDtBQUNGLEdBaDhCd0I7QUFrOEJ6QkMsRUFBQUEsV0FsOEJ5Qix5QkFrOEJYO0FBQ1osUUFBSUgsS0FBSyxHQUFHLEtBQUsxQyxTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFaO0FBRUEsUUFBSXJRLGlCQUFpQixJQUFJK1MsS0FBekIsRUFBZ0NBLEtBQUssR0FBRyxLQUFLMUMsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBUjtBQUVoQ3JRLElBQUFBLGlCQUFpQixHQUFHK1MsS0FBcEI7QUFFQSxXQUFPQSxLQUFQO0FBQ0QsR0ExOEJ3QjtBQTQ4QnpCSSxFQUFBQSxZQTU4QnlCLDBCQTQ4QlY7QUFDYixRQUFJSixLQUFLLEdBQUcsS0FBSzFDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVo7QUFDQSxRQUFJMkMsS0FBSyxHQUFHLEtBQUszQyxTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFaO0FBRUEsUUFBSXZRLGlCQUFpQixJQUFJaVQsS0FBekIsRUFBZ0NBLEtBQUssR0FBRyxLQUFLMUMsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBUjtBQUVoQyxRQUFJdFEsaUJBQWlCLElBQUlpVCxLQUF6QixFQUFnQ0EsS0FBSyxHQUFHLEtBQUszQyxTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFSO0FBRWhDdlEsSUFBQUEsaUJBQWlCLEdBQUdpVCxLQUFwQjtBQUNBaFQsSUFBQUEsaUJBQWlCLEdBQUdpVCxLQUFwQjtBQUVBLFdBQU9ELEtBQUssR0FBR0MsS0FBZjtBQUNELEdBeDlCd0I7QUEwOUJ6QkksRUFBQUEsa0JBMTlCeUIsOEJBMDlCTkMsY0ExOUJNLEVBMDlCa0JDLFNBMTlCbEIsRUEwOUJxQ0MsWUExOUJyQyxFQTA5QjJEQyxXQTE5QjNELEVBMDlCZ0Y5RyxLQTE5QmhGLEVBMDlCOEY7QUFBQSxRQUFwRzJHLGNBQW9HO0FBQXBHQSxNQUFBQSxjQUFvRyxHQUFuRixLQUFtRjtBQUFBOztBQUFBLFFBQTVFQyxTQUE0RTtBQUE1RUEsTUFBQUEsU0FBNEUsR0FBaEUsS0FBZ0U7QUFBQTs7QUFBQSxRQUF6REMsWUFBeUQ7QUFBekRBLE1BQUFBLFlBQXlELEdBQTFDLEtBQTBDO0FBQUE7O0FBQUEsUUFBbkNDLFdBQW1DO0FBQW5DQSxNQUFBQSxXQUFtQyxHQUFyQixLQUFxQjtBQUFBOztBQUFBLFFBQWQ5RyxLQUFjO0FBQWRBLE1BQUFBLEtBQWMsR0FBTixJQUFNO0FBQUE7O0FBQ3JIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxRQUFJMkcsY0FBSixFQUFvQjtBQUNsQixVQUFJM0csS0FBSyxJQUFJLElBQWIsRUFBbUI7QUFDakIzTCxRQUFBQSxnQkFBZ0IsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLEVBQS9CLEVBQW1DLEVBQW5DLEVBQXVDLEVBQXZDLEVBQTJDLEVBQTNDLEVBQStDLEVBQS9DLENBQW5CO0FBRUFBLFFBQUFBLGdCQUFnQixDQUFDMFMsSUFBakIsQ0FBc0I7QUFBQSxpQkFBTSxNQUFNQyxJQUFJLENBQUNDLE1BQUwsRUFBWjtBQUFBLFNBQXRCO0FBRUFySyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXhJLGdCQUFaO0FBQ0FJLFFBQUFBLHVCQUF1QixHQUFHLENBQTFCO0FBRUEsWUFBSXlTLFNBQVMsR0FBRztBQUFFQyxVQUFBQSxRQUFRLEVBQUU5UyxnQkFBWjtBQUE4QitTLFVBQUFBLFNBQVMsRUFBRSxJQUF6QztBQUErQ0MsVUFBQUEsV0FBVyxFQUFFLElBQTVEO0FBQWtFQyxVQUFBQSxTQUFTLEVBQUU7QUFBN0UsU0FBaEI7QUFDQXhOLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0N1RSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFZ0gsU0FBOUU7QUFDRDtBQUNGLEtBWkQsTUFZTyxJQUFJTixTQUFKLEVBQWU7QUFDcEIsVUFBSTVHLEtBQUssSUFBSSxJQUFiLEVBQW1CO0FBQ2pCMUwsUUFBQUEsV0FBVyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsRUFBL0IsRUFBbUMsRUFBbkMsRUFBdUMsRUFBdkMsRUFBMkMsRUFBM0MsRUFBK0MsRUFBL0MsQ0FBZDtBQUVBQSxRQUFBQSxXQUFXLENBQUN5UyxJQUFaLENBQWlCO0FBQUEsaUJBQU0sTUFBTUMsSUFBSSxDQUFDQyxNQUFMLEVBQVo7QUFBQSxTQUFqQjtBQUVBckssUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl2SSxXQUFaO0FBQ0FJLFFBQUFBLGtCQUFrQixHQUFHLENBQXJCO0FBRUEsWUFBSXdTLFNBQVMsR0FBRztBQUFFQyxVQUFBQSxRQUFRLEVBQUUsSUFBWjtBQUFrQkMsVUFBQUEsU0FBUyxFQUFFOVMsV0FBN0I7QUFBMEMrUyxVQUFBQSxXQUFXLEVBQUUsSUFBdkQ7QUFBNkRDLFVBQUFBLFNBQVMsRUFBRTtBQUF4RSxTQUFoQjtBQUNBeE4sUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3VFLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsRUFBMUUsRUFBOEVnSCxTQUE5RTtBQUNEO0FBQ0YsS0FaTSxNQVlBLElBQUlMLFlBQUosRUFBa0I7QUFDdkIsVUFBSTdHLEtBQUssSUFBSSxJQUFiLEVBQW1CO0FBQ2pCekwsUUFBQUEsY0FBYyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsRUFBL0IsRUFBbUMsRUFBbkMsRUFBdUMsRUFBdkMsRUFBMkMsRUFBM0MsRUFBK0MsRUFBL0MsQ0FBakI7QUFFQUEsUUFBQUEsY0FBYyxDQUFDd1MsSUFBZixDQUFvQjtBQUFBLGlCQUFNLE1BQU1DLElBQUksQ0FBQ0MsTUFBTCxFQUFaO0FBQUEsU0FBcEI7QUFFQXJLLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZdEksY0FBWjtBQUNBSSxRQUFBQSxxQkFBcUIsR0FBRyxDQUF4QjtBQUVBLFlBQUl1UyxTQUFTLEdBQUc7QUFBRUMsVUFBQUEsUUFBUSxFQUFFLElBQVo7QUFBa0JDLFVBQUFBLFNBQVMsRUFBRSxJQUE3QjtBQUFtQ0MsVUFBQUEsV0FBVyxFQUFFOVMsY0FBaEQ7QUFBZ0UrUyxVQUFBQSxTQUFTLEVBQUU7QUFBM0UsU0FBaEI7QUFDQXhOLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0N1RSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFZ0gsU0FBOUU7QUFDRDtBQUNGLEtBWk0sTUFZQSxJQUFJSixXQUFKLEVBQWlCO0FBQ3RCLFVBQUk5RyxLQUFLLElBQUksSUFBYixFQUFtQjtBQUNqQnhMLFFBQUFBLGFBQWEsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLEVBQS9CLEVBQW1DLEVBQW5DLEVBQXNDLEVBQXRDLEVBQXlDLEVBQXpDLEVBQTRDLEVBQTVDLENBQWhCO0FBRUFBLFFBQUFBLGFBQWEsQ0FBQ3VTLElBQWQsQ0FBbUI7QUFBQSxpQkFBTSxNQUFNQyxJQUFJLENBQUNDLE1BQUwsRUFBWjtBQUFBLFNBQW5CO0FBRUFySyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXJJLGFBQVo7QUFDQUksUUFBQUEsb0JBQW9CLEdBQUcsQ0FBdkI7QUFFQSxZQUFJc1MsU0FBUyxHQUFHO0FBQUVDLFVBQUFBLFFBQVEsRUFBRSxJQUFaO0FBQWtCQyxVQUFBQSxTQUFTLEVBQUUsSUFBN0I7QUFBbUNDLFVBQUFBLFdBQVcsRUFBRSxJQUFoRDtBQUFzREMsVUFBQUEsU0FBUyxFQUFFOVM7QUFBakUsU0FBaEI7QUFDQXNGLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0N1RSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFZ0gsU0FBOUU7QUFDRDtBQUNGOztBQUVELFFBQUlsSCxLQUFLLElBQUksSUFBYixFQUFtQjtBQUNqQixVQUFJQSxLQUFLLENBQUNtSCxRQUFOLElBQWtCLElBQXRCLEVBQTRCO0FBQzFCOVMsUUFBQUEsZ0JBQWdCLEdBQUcyTCxLQUFLLENBQUNtSCxRQUF6QjtBQUNBdkssUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl4SSxnQkFBWjtBQUNBSSxRQUFBQSx1QkFBdUIsR0FBRyxDQUExQjtBQUNEOztBQUVELFVBQUl1TCxLQUFLLENBQUNvSCxTQUFOLElBQW1CLElBQXZCLEVBQTZCO0FBQzNCOVMsUUFBQUEsV0FBVyxHQUFHMEwsS0FBSyxDQUFDb0gsU0FBcEI7QUFDQXhLLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZdkksV0FBWjtBQUNBSSxRQUFBQSxrQkFBa0IsR0FBRyxDQUFyQjtBQUNEOztBQUVELFVBQUlzTCxLQUFLLENBQUNxSCxXQUFOLElBQXFCLElBQXpCLEVBQStCO0FBQzdCOVMsUUFBQUEsY0FBYyxHQUFHeUwsS0FBSyxDQUFDcUgsV0FBdkI7QUFDQXpLLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZdEksY0FBWjtBQUNBSSxRQUFBQSxxQkFBcUIsR0FBRyxDQUF4QjtBQUNEOztBQUVELFVBQUlxTCxLQUFLLENBQUNzSCxTQUFOLElBQW1CLElBQXZCLEVBQTZCO0FBQzNCOVMsUUFBQUEsYUFBYSxHQUFHd0wsS0FBSyxDQUFDc0gsU0FBdEI7QUFDQTFLLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZckksYUFBWjtBQUNBSSxRQUFBQSxvQkFBb0IsR0FBRyxDQUF2QjtBQUNEO0FBQ0Y7QUFDRixHQS9pQ3dCO0FBaWpDekIyUyxFQUFBQSxtQkFqakN5QiwrQkFpakNMeEQsTUFqakNLLEVBaWpDRztBQUMxQixRQUFJaEksSUFBSSxHQUFHLENBQUMsQ0FBWjs7QUFDQSxRQUFJMUgsZ0JBQWdCLENBQUNxSixNQUFqQixHQUEwQixDQUE5QixFQUFpQztBQUMvQixVQUFJakosdUJBQXVCLEdBQUdKLGdCQUFnQixDQUFDcUosTUFBL0MsRUFBdUQ7QUFDckQzQixRQUFBQSxJQUFJLEdBQUcxSCxnQkFBZ0IsQ0FBQ0ksdUJBQUQsQ0FBdkI7QUFDQUEsUUFBQUEsdUJBQXVCO0FBQ3ZCLFlBQUl5UyxTQUFTLEdBQUc7QUFBRUMsVUFBQUEsUUFBUSxFQUFFLElBQVo7QUFBa0JDLFVBQUFBLFNBQVMsRUFBRSxLQUE3QjtBQUFvQ0MsVUFBQUEsV0FBVyxFQUFFLEtBQWpEO0FBQXdEQyxVQUFBQSxTQUFTLEVBQUU7QUFBbkUsU0FBaEI7QUFDQXhOLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0N1RSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFZ0gsU0FBOUU7QUFDRCxPQUxELE1BS087QUFDTCxhQUFLUixrQkFBTCxDQUF3QixJQUF4QixFQUE4QixLQUE5QixFQUFxQyxLQUFyQyxFQUE0QyxLQUE1QyxFQUFtRCxJQUFuRDtBQUNEO0FBQ0YsS0FURCxNQVNPO0FBQ0wsV0FBS0Esa0JBQUwsQ0FBd0IsSUFBeEIsRUFBOEIsS0FBOUIsRUFBcUMsS0FBckMsRUFBNEMsS0FBNUMsRUFBbUQsSUFBbkQ7QUFDRDs7QUFDRCxXQUFPM0ssSUFBUDtBQUNELEdBaGtDd0I7QUFra0N6QnlMLEVBQUFBLGNBbGtDeUIsMEJBa2tDVnpELE1BbGtDVSxFQWtrQ0Y7QUFDckIsUUFBSWhJLElBQUksR0FBRyxDQUFDLENBQVo7O0FBQ0EsUUFBSXpILFdBQVcsQ0FBQ29KLE1BQVosR0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBSWhKLGtCQUFrQixHQUFHSixXQUFXLENBQUNvSixNQUFyQyxFQUE2QztBQUMzQzNCLFFBQUFBLElBQUksR0FBR3pILFdBQVcsQ0FBQ0ksa0JBQUQsQ0FBbEI7QUFDQUEsUUFBQUEsa0JBQWtCO0FBQ2xCLFlBQUl3UyxTQUFTLEdBQUc7QUFBRUMsVUFBQUEsUUFBUSxFQUFFLEtBQVo7QUFBbUJDLFVBQUFBLFNBQVMsRUFBRSxJQUE5QjtBQUFvQ0MsVUFBQUEsV0FBVyxFQUFFLEtBQWpEO0FBQXdEQyxVQUFBQSxTQUFTLEVBQUU7QUFBbkUsU0FBaEI7QUFDQXhOLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0N1RSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFZ0gsU0FBOUU7QUFDRCxPQUxELE1BS087QUFDTCxhQUFLUixrQkFBTCxDQUF3QixLQUF4QixFQUErQixJQUEvQixFQUFxQyxLQUFyQyxFQUE0QyxLQUE1QyxFQUFtRCxJQUFuRDtBQUNEO0FBQ0YsS0FURCxNQVNPO0FBQ0wsV0FBS0Esa0JBQUwsQ0FBd0IsS0FBeEIsRUFBK0IsSUFBL0IsRUFBcUMsS0FBckMsRUFBNEMsS0FBNUMsRUFBbUQsSUFBbkQ7QUFDRDs7QUFDRCxXQUFPM0ssSUFBUDtBQUNELEdBamxDd0I7QUFtbEN6QjBMLEVBQUFBLGlCQW5sQ3lCLDZCQW1sQ1AxRCxNQW5sQ08sRUFtbENDO0FBQ3hCLFFBQUloSSxJQUFJLEdBQUcsQ0FBQyxDQUFaOztBQUNBLFFBQUl4SCxjQUFjLENBQUNtSixNQUFmLEdBQXdCLENBQTVCLEVBQStCO0FBQzdCLFVBQUkvSSxxQkFBcUIsR0FBR0osY0FBYyxDQUFDbUosTUFBM0MsRUFBbUQ7QUFDakQzQixRQUFBQSxJQUFJLEdBQUd4SCxjQUFjLENBQUNJLHFCQUFELENBQXJCO0FBQ0FBLFFBQUFBLHFCQUFxQjtBQUNyQixZQUFJdVMsU0FBUyxHQUFHO0FBQUVDLFVBQUFBLFFBQVEsRUFBRSxLQUFaO0FBQW1CQyxVQUFBQSxTQUFTLEVBQUUsS0FBOUI7QUFBcUNDLFVBQUFBLFdBQVcsRUFBRSxJQUFsRDtBQUF3REMsVUFBQUEsU0FBUyxFQUFFO0FBQW5FLFNBQWhCO0FBQ0F4TixRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDdUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RWdILFNBQTlFO0FBQ0QsT0FMRCxNQUtPO0FBQ0wsYUFBS1Isa0JBQUwsQ0FBd0IsS0FBeEIsRUFBK0IsS0FBL0IsRUFBc0MsSUFBdEMsRUFBNEMsS0FBNUMsRUFBbUQsSUFBbkQ7QUFDRDtBQUNGLEtBVEQsTUFTTztBQUNMLFdBQUtBLGtCQUFMLENBQXdCLEtBQXhCLEVBQStCLEtBQS9CLEVBQXNDLElBQXRDLEVBQTRDLEtBQTVDLEVBQW1ELElBQW5EO0FBQ0Q7O0FBQ0QsV0FBTzNLLElBQVA7QUFDRCxHQWxtQ3dCO0FBb21DekIyTCxFQUFBQSxnQkFwbUN5Qiw0QkFvbUNSM0QsTUFwbUNRLEVBb21DQTtBQUN2QixRQUFJaEksSUFBSSxHQUFHLENBQUMsQ0FBWjs7QUFDQSxRQUFJdkgsYUFBYSxDQUFDa0osTUFBZCxHQUF1QixDQUEzQixFQUE4QjtBQUM1QixVQUFJOUksb0JBQW9CLEdBQUdKLGFBQWEsQ0FBQ2tKLE1BQXpDLEVBQWlEO0FBQy9DM0IsUUFBQUEsSUFBSSxHQUFHdkgsYUFBYSxDQUFDSSxvQkFBRCxDQUFwQjtBQUNBQSxRQUFBQSxvQkFBb0I7QUFDcEIsWUFBSXNTLFNBQVMsR0FBRztBQUFFQyxVQUFBQSxRQUFRLEVBQUUsS0FBWjtBQUFtQkMsVUFBQUEsU0FBUyxFQUFFLEtBQTlCO0FBQXFDQyxVQUFBQSxXQUFXLEVBQUUsS0FBbEQ7QUFBeURDLFVBQUFBLFNBQVMsRUFBRTtBQUFwRSxTQUFoQjtBQUNBeE4sUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3VFLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsRUFBMUUsRUFBOEVnSCxTQUE5RTtBQUNELE9BTEQsTUFLTztBQUNMLGFBQUtSLGtCQUFMLENBQXdCLEtBQXhCLEVBQStCLEtBQS9CLEVBQXNDLEtBQXRDLEVBQTZDLElBQTdDLEVBQW1ELElBQW5EO0FBQ0Q7QUFDRixLQVRELE1BU087QUFDTCxXQUFLQSxrQkFBTCxDQUF3QixLQUF4QixFQUErQixLQUEvQixFQUFzQyxLQUF0QyxFQUE2QyxJQUE3QyxFQUFtRCxJQUFuRDtBQUNEOztBQUNELFdBQU8zSyxJQUFQO0FBQ0QsR0FubkN3QjtBQXFuQ3pCNEwsRUFBQUEsY0FybkN5QiwwQkFxbkNWM0gsS0FybkNVLEVBcW5DSTtBQUFBLFFBQWRBLEtBQWM7QUFBZEEsTUFBQUEsS0FBYyxHQUFOLElBQU07QUFBQTs7QUFDM0IsUUFBSUEsS0FBSyxDQUFDbUgsUUFBVixFQUFvQjtBQUNsQjFTLE1BQUFBLHVCQUF1QjtBQUN4Qjs7QUFDRCxRQUFJdUwsS0FBSyxDQUFDb0gsU0FBVixFQUFxQjtBQUNuQjFTLE1BQUFBLGtCQUFrQjtBQUNuQjs7QUFDRCxRQUFJc0wsS0FBSyxDQUFDcUgsV0FBVixFQUF1QjtBQUNyQjFTLE1BQUFBLHFCQUFxQjtBQUN0Qjs7QUFDRCxRQUFJcUwsS0FBSyxDQUFDc0gsU0FBVixFQUFxQjtBQUNuQjFTLE1BQUFBLG9CQUFvQjtBQUNyQjtBQUNGLEdBbG9Dd0I7QUFvb0N6QmdULEVBQUFBLGlCQXBvQ3lCLDZCQW9vQ1BqQixjQXBvQ08sRUFvb0NpQkMsU0Fwb0NqQixFQW9vQ29DQyxZQXBvQ3BDLEVBb29DMERDLFdBcG9DMUQsRUFvb0MrRTtBQUFBLFFBQXRGSCxjQUFzRjtBQUF0RkEsTUFBQUEsY0FBc0YsR0FBckUsS0FBcUU7QUFBQTs7QUFBQSxRQUE5REMsU0FBOEQ7QUFBOURBLE1BQUFBLFNBQThELEdBQWxELEtBQWtEO0FBQUE7O0FBQUEsUUFBM0NDLFlBQTJDO0FBQTNDQSxNQUFBQSxZQUEyQyxHQUE1QixLQUE0QjtBQUFBOztBQUFBLFFBQXJCQyxXQUFxQjtBQUFyQkEsTUFBQUEsV0FBcUIsR0FBUCxLQUFPO0FBQUE7O0FBQ3RHLFFBQUlILGNBQUosRUFBb0I7QUFDbEIsVUFBSSxLQUFLbkwsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixZQUFJLEtBQUtSLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDeEUsU0FBckMsSUFBa0RtQyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGYSxJQUE3RixDQUFrR1csTUFBeEosRUFBZ0s7QUFDOUosY0FBSXJCLEtBQUssR0FBRyxLQUFLZ0osbUJBQUwsRUFBWjs7QUFDQSxjQUFJaEosS0FBSyxJQUFJLENBQUMsQ0FBZCxFQUFpQjtBQUNmQSxZQUFBQSxLQUFLLEdBQUcsS0FBS2dKLG1CQUFMLEVBQVI7QUFDRDs7QUFDRCxpQkFBT2hKLEtBQVA7QUFDRDtBQUNGLE9BUkQsTUFRTyxJQUFJLEtBQUsvQyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDLFlBQUkrQyxLQUFLLEdBQUcsS0FBS2dKLG1CQUFMLEVBQVo7O0FBQ0EsWUFBSWhKLEtBQUssSUFBSSxDQUFDLENBQWQsRUFBaUI7QUFDZkEsVUFBQUEsS0FBSyxHQUFHLEtBQUtnSixtQkFBTCxFQUFSO0FBQ0Q7O0FBQ0QsZUFBT2hKLEtBQVA7QUFDRDtBQUNGLEtBaEJELE1BZ0JPLElBQUlxSSxTQUFKLEVBQWU7QUFDcEIsVUFBSSxLQUFLcEwsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixZQUFJLEtBQUtSLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDeEUsU0FBckMsSUFBa0RtQyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGYSxJQUE3RixDQUFrR1csTUFBeEosRUFBZ0s7QUFDOUosY0FBSXJCLEtBQUssR0FBRyxLQUFLaUosY0FBTCxFQUFaOztBQUNBLGNBQUlqSixLQUFLLElBQUksQ0FBQyxDQUFkLEVBQWlCO0FBQ2ZBLFlBQUFBLEtBQUssR0FBRyxLQUFLaUosY0FBTCxFQUFSO0FBQ0Q7O0FBQ0QsaUJBQU9qSixLQUFQO0FBQ0Q7QUFDRixPQVJELE1BUU8sSUFBSSxLQUFLL0MsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQyxZQUFJK0MsS0FBSyxHQUFHLEtBQUtpSixjQUFMLEVBQVo7O0FBQ0EsWUFBSWpKLEtBQUssSUFBSSxDQUFDLENBQWQsRUFBaUI7QUFDZkEsVUFBQUEsS0FBSyxHQUFHLEtBQUtpSixjQUFMLEVBQVI7QUFDRDs7QUFDRCxlQUFPakosS0FBUDtBQUNEO0FBQ0YsS0FoQk0sTUFnQkEsSUFBSXNJLFlBQUosRUFBa0I7QUFDdkIsVUFBSSxLQUFLckwsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixZQUFJLEtBQUtSLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDeEUsU0FBckMsSUFBa0RtQyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGYSxJQUE3RixDQUFrR1csTUFBeEosRUFBZ0s7QUFDOUosY0FBSXJCLEtBQUssR0FBRyxLQUFLa0osaUJBQUwsRUFBWjs7QUFDQSxjQUFJbEosS0FBSyxJQUFJLENBQUMsQ0FBZCxFQUFpQjtBQUNmQSxZQUFBQSxLQUFLLEdBQUcsS0FBS2tKLGlCQUFMLEVBQVI7QUFDRDs7QUFDRCxpQkFBT2xKLEtBQVA7QUFDRDtBQUNGLE9BUkQsTUFRTyxJQUFJLEtBQUsvQyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDLFlBQUkrQyxLQUFLLEdBQUcsS0FBS2tKLGlCQUFMLEVBQVo7O0FBQ0EsWUFBSWxKLEtBQUssSUFBSSxDQUFDLENBQWQsRUFBaUI7QUFDZkEsVUFBQUEsS0FBSyxHQUFHLEtBQUtrSixpQkFBTCxFQUFSO0FBQ0Q7O0FBQ0QsZUFBT2xKLEtBQVA7QUFDRDtBQUNGLEtBaEJNLE1BZ0JBLElBQUl1SSxXQUFKLEVBQWlCO0FBQ3RCLFVBQUksS0FBS3RMLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsWUFBSSxLQUFLUixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RmEsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLGNBQUlyQixLQUFLLEdBQUcsS0FBS21KLGdCQUFMLEVBQVo7O0FBQ0EsY0FBSW5KLEtBQUssSUFBSSxDQUFDLENBQWQsRUFBaUI7QUFDZkEsWUFBQUEsS0FBSyxHQUFHLEtBQUttSixnQkFBTCxFQUFSO0FBQ0Q7O0FBQ0QsaUJBQU9uSixLQUFQO0FBQ0Q7QUFDRixPQVJELE1BUU8sSUFBSSxLQUFLL0MsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQyxZQUFJK0MsS0FBSyxHQUFHLEtBQUttSixnQkFBTCxFQUFaOztBQUNBLFlBQUluSixLQUFLLElBQUksQ0FBQyxDQUFkLEVBQWlCO0FBQ2ZBLFVBQUFBLEtBQUssR0FBRyxLQUFLbUosZ0JBQUwsRUFBUjtBQUNEOztBQUNELGVBQU9uSixLQUFQO0FBQ0Q7QUFDRjtBQUNGLEdBdHNDd0I7QUF3c0N6QnNKLEVBQUFBLFlBeHNDeUIsMEJBd3NDVjtBQUNiLFFBQUksQ0FBQ2pOLFVBQUwsRUFBaUI7QUFDZixVQUFJbEIsV0FBVyxHQUFHSSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZCLE1BQTVFLEVBQW9GO0FBQ2xGLFlBQUlvSyxRQUFRLEdBQUc1QixRQUFRLENBQUNwTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZGLFdBQTFELEVBQXVFd0YsaUJBQXZFLENBQXlGbEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0htSixTQUF0SCxDQUFnSUMsVUFBakksQ0FBdkI7O0FBQ0EsYUFBS3BMLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDdEQsaUJBQXJDLEdBQXlEYSxXQUF6RDs7QUFDQSxZQUFJb08sUUFBUSxJQUFJLENBQVosSUFBaUJBLFFBQVEsSUFBSSxDQUFqQyxFQUFvQztBQUNsQztBQUNBLGNBQUlwSCxVQUFVLEdBQUcsS0FBS2lELFNBQUwsQ0FBZSxDQUFmLEVBQWtCLEVBQWxCLENBQWpCOztBQUVBLGNBQUltRSxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDakI7QUFDQXBILFlBQUFBLFVBQVUsR0FBRyxLQUFLa0gsaUJBQUwsQ0FBdUIsSUFBdkIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0MsQ0FBYjtBQUNELFdBSEQsTUFHTyxJQUFJRSxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDeEI7QUFDQXBILFlBQUFBLFVBQVUsR0FBRyxLQUFLa0gsaUJBQUwsQ0FBdUIsS0FBdkIsRUFBOEIsSUFBOUIsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0MsQ0FBYjtBQUNELFdBSE0sTUFHQSxJQUFJRSxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDeEI7QUFDQXBILFlBQUFBLFVBQVUsR0FBRyxLQUFLa0gsaUJBQUwsQ0FBdUIsS0FBdkIsRUFBOEIsS0FBOUIsRUFBcUMsSUFBckMsRUFBMkMsS0FBM0MsQ0FBYjtBQUNELFdBSE0sTUFHQSxJQUFJRSxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDeEI7QUFDQXBILFlBQUFBLFVBQVUsR0FBRyxLQUFLa0gsaUJBQUwsQ0FBdUIsS0FBdkIsRUFBOEIsS0FBOUIsRUFBcUMsS0FBckMsRUFBNEMsSUFBNUMsQ0FBYjtBQUNEOztBQUVEL04sVUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQStDLFVBQUFBLE9BQU8sQ0FBQzJJLEtBQVIsQ0FBY3VDLFFBQWQ7O0FBRUEsY0FBSSxLQUFLdE0sWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLGdCQUFJc00sUUFBUSxJQUFJLEVBQWhCLEVBQW9CO0FBQ2xCO0FBQ0FwTyxjQUFBQSxXQUFXLEdBQUdBLFdBQVcsR0FBRyxDQUE1QjtBQUNBLG1CQUFLcU8sYUFBTDtBQUNELGFBSkQsTUFJTztBQUNMLGtCQUFJLEtBQUsvTSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RmEsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLG9CQUFJb0ksV0FBVyxHQUFHO0FBQUVySCxrQkFBQUEsVUFBVSxFQUFFRCxVQUFkO0FBQTBCRSxrQkFBQUEsT0FBTyxFQUFFbEg7QUFBbkMsaUJBQWxCO0FBQ0EscUJBQUtxRyxpQkFBTCxDQUF1QmlJLFdBQXZCO0FBQ0QsZUFIRCxNQUdPO0FBQ0wscUJBQUszSCxtQkFBTDtBQUNEO0FBQ0Y7QUFDRixXQWRELE1BY08sSUFBSSxLQUFLN0UsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQztBQUNBLGdCQUFJc00sUUFBUSxJQUFJLEVBQWhCLEVBQW9CO0FBQ2xCO0FBQ0FwTyxjQUFBQSxXQUFXLEdBQUdBLFdBQVcsR0FBRyxDQUE1QjtBQUNBLG1CQUFLcU8sYUFBTDtBQUNELGFBSkQsTUFJTztBQUNMLGtCQUFJQyxXQUFXLEdBQUc7QUFBRXJILGdCQUFBQSxVQUFVLEVBQUVELFVBQWQ7QUFBMEJFLGdCQUFBQSxPQUFPLEVBQUVsSDtBQUFuQyxlQUFsQjtBQUNBLG1CQUFLcUcsaUJBQUwsQ0FBdUJpSSxXQUF2QjtBQUNEO0FBQ0Y7QUFDRixTQTlDRCxNQThDTztBQUNMbk8sVUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQStDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVFQUFaO0FBQ0EsZUFBS2dFLHNCQUFMO0FBQ0Q7QUFDRixPQXRERCxNQXNETztBQUNMLFlBQUksS0FBS3JGLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsY0FBSSxDQUFDWixVQUFMLEVBQWlCO0FBQ2YsZ0JBQUksS0FBS0ksY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM4TCxLQUFyQyxJQUE4Q3pVLFdBQWxELEVBQStELEtBQUswVSxnQkFBTDtBQUUvRCxnQkFBSSxDQUFDLEtBQUtsTixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzhMLEtBQXRDLElBQStDMVUsWUFBbkQsRUFBaUUsS0FBSzJVLGdCQUFMO0FBQ2xFO0FBQ0YsU0FORCxNQU1PLElBQUksS0FBSzFNLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakMsY0FBSSxDQUFDWixVQUFMLEVBQWlCO0FBQ2YsZ0JBQUksS0FBS0ksY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNwRCxjQUF6QyxFQUF5RDtBQUN2RCxtQkFBS21QLGdCQUFMO0FBQ0F0TCxjQUFBQSxPQUFPLENBQUMySSxLQUFSLENBQWMseUJBQWQ7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGLEtBdkVELE1BdUVPO0FBQ0wsVUFBSSxLQUFLL0osWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixhQUFLMk0sdUJBQUwsQ0FBNkIsSUFBN0I7QUFDRCxPQUZELE1BRU8sSUFBSSxLQUFLM00sWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQyxhQUFLMk0sdUJBQUwsQ0FBNkIsS0FBN0I7QUFDRDtBQUNGO0FBQ0YsR0F2eEN3QjtBQXl4Q3pCRCxFQUFBQSxnQkF6eEN5Qiw4QkF5eENOO0FBQ2pCck8sSUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQStDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVFQUFaO0FBQ0EsU0FBS2dFLHNCQUFMO0FBQ0QsR0E3eEN3QjtBQSt4Q3pCdUgsRUFBQUEsZ0JBL3hDeUIsNEJBK3hDUkMsTUEveENRLEVBK3hDUUMsY0EveENSLEVBK3hDZ0M7QUFBQSxRQUF4Q0QsTUFBd0M7QUFBeENBLE1BQUFBLE1BQXdDLEdBQS9CLEtBQStCO0FBQUE7O0FBQUEsUUFBeEJDLGNBQXdCO0FBQXhCQSxNQUFBQSxjQUF3QixHQUFQLEtBQU87QUFBQTs7QUFDdkQsUUFBSUQsTUFBTSxJQUFJLEtBQWQsRUFBcUI7QUFDbkI7QUFDQTtBQUNBO0FBRUEsVUFBSUUsWUFBWSxHQUFHLEtBQUt2SyxVQUFMLEVBQW5COztBQUVBLFVBQUksQ0FBQyxLQUFLaEQsY0FBTCxDQUFvQnVOLFlBQXBCLEVBQWtDaFAsUUFBdkMsRUFBaUQ7QUFDL0MsYUFBS3lCLGNBQUwsQ0FBb0J1TixZQUFwQixFQUFrQ3hQLGNBQWxDLEdBQW1ELElBQW5EO0FBQ0EsYUFBS2lDLGNBQUwsQ0FBb0J1TixZQUFwQixFQUFrQ3ZQLFVBQWxDLEdBQStDLENBQS9DO0FBQ0E0RCxRQUFBQSxPQUFPLENBQUMySSxLQUFSLENBQWMsZ0NBQWQ7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJLEtBQUt2SyxjQUFMLENBQW9CdU4sWUFBcEIsRUFBa0M1USxTQUFsQyxJQUErQ21DLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZhLElBQTdGLENBQWtHVyxNQUFySixFQUE2SjtBQUMzSmhELFVBQUFBLE9BQU8sQ0FBQzJJLEtBQVIsQ0FBYyxpQkFBZDtBQUNBM0ksVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVo7QUFDQSxlQUFLN0IsY0FBTCxDQUFvQnVOLFlBQXBCLEVBQWtDeFAsY0FBbEMsR0FBbUQsSUFBbkQ7QUFFQSxjQUFJeVAsS0FBSyxHQUFHLEtBQUt4TixjQUFMLENBQW9CdU4sWUFBcEIsRUFBa0NsUSxJQUE5Qzs7QUFDQSxjQUFJb1EsUUFBUSxHQUFHM08sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ2dOLGVBQWxDLEdBQW9EMU4sY0FBcEQsQ0FBbUV1TixZQUFuRSxFQUFpRnZRLGVBQWhHOztBQUNBLGNBQUkyUSxRQUFRLEdBQUc3Tyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDZ04sZUFBbEMsR0FBb0QxTixjQUFwRCxDQUFtRXVOLFlBQW5FLEVBQWlGdFEsb0JBQWhHOztBQUNBLGNBQUkyUSxXQUFXLEdBQUc5Tyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDZ04sZUFBbEMsR0FBb0QxTixjQUFwRCxDQUFtRXVOLFlBQW5FLEVBQWlGcFEsb0JBQW5HOztBQUVBLGNBQUkwUSxVQUFVLEdBQUcsQ0FBakI7O0FBQ0EsZUFBSyxJQUFJdEssS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd6RSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDZ04sZUFBbEMsR0FBb0QxTixjQUFwRCxDQUFtRXVOLFlBQW5FLEVBQWlGelEsWUFBakYsQ0FBOEY0RixNQUExSCxFQUFrSWEsS0FBSyxFQUF2SSxFQUEySTtBQUN6SSxnQkFBSXpFLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NnTixlQUFsQyxHQUFvRDFOLGNBQXBELENBQW1FdU4sWUFBbkUsRUFBaUZ6USxZQUFqRixDQUE4RnlHLEtBQTlGLEVBQXFHOUgsU0FBekcsRUFBb0g7QUFDbEhvUyxjQUFBQSxVQUFVLElBQUkvTyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDZ04sZUFBbEMsR0FBb0QxTixjQUFwRCxDQUFtRXVOLFlBQW5FLEVBQWlGelEsWUFBakYsQ0FBOEZ5RyxLQUE5RixFQUFxRzdILFVBQW5IO0FBQ0Q7QUFDRjs7QUFFRCxjQUFJb1MsS0FBSyxHQUFHLEtBQUs5TixjQUFMLENBQW9CdU4sWUFBcEIsRUFBa0NqUSxTQUE5QztBQUNBLGNBQUl5USxPQUFPLEdBQUcsS0FBSy9OLGNBQUwsQ0FBb0J1TixZQUFwQixFQUFrQ2hRLFVBQWhEOztBQUVBLGNBQUl5USxXQUFXLEdBQUcsS0FBS3ZDLFlBQUwsRUFBbEI7O0FBQ0EsY0FBSXdDLFdBQVcsR0FBR0QsV0FBVyxHQUFHLElBQWhDO0FBRUEsY0FBSUUsUUFBUSxHQUFHRCxXQUFXLEdBQUdILEtBQTdCO0FBQ0EsY0FBSUssU0FBUyxHQUFHRixXQUFXLEdBQUdGLE9BQTlCO0FBRUEsY0FBSUssTUFBTSxHQUFHLENBQUNULFFBQVEsR0FBR0MsV0FBWixJQUEyQixNQUF4QztBQUVBLGNBQUlTLE1BQU0sR0FBRyxDQUFiO0FBQ0EsY0FBSVosUUFBUSxJQUFJLENBQWhCLEVBQW1CWSxNQUFNLEdBQUcsS0FBVCxDQUFuQixLQUNLLElBQUlaLFFBQVEsSUFBSSxDQUFoQixFQUFtQlksTUFBTSxHQUFHLFFBQVEsS0FBakIsQ0FBbkIsS0FDQSxJQUFJWixRQUFRLElBQUksQ0FBaEIsRUFBbUJZLE1BQU0sR0FBRyxRQUFRLEtBQVIsR0FBZ0IsS0FBekI7QUFFeEIsY0FBSUMsV0FBVyxHQUFHZCxLQUFLLEdBQUdZLE1BQVIsR0FBaUJDLE1BQWpCLEdBQTBCSCxRQUExQixHQUFxQ0MsU0FBckMsR0FBaUROLFVBQW5FO0FBRUEsZUFBSzdOLGNBQUwsQ0FBb0J1TixZQUFwQixFQUFrQ3ZQLFVBQWxDLEdBQStDc1EsV0FBL0M7QUFDQSxlQUFLdE8sY0FBTCxDQUFvQnVOLFlBQXBCLEVBQWtDdFAsV0FBbEMsR0FBZ0RvUSxNQUFoRDtBQUNBLGVBQUtyTyxjQUFMLENBQW9CdU4sWUFBcEIsRUFBa0NyUCxXQUFsQyxHQUFnRGtRLE1BQWhEO0FBQ0EsZUFBS3BPLGNBQUwsQ0FBb0J1TixZQUFwQixFQUFrQ3BQLGFBQWxDLEdBQWtEK1AsUUFBbEQ7QUFDQSxlQUFLbE8sY0FBTCxDQUFvQnVOLFlBQXBCLEVBQWtDbFAsZUFBbEMsR0FBb0Q4UCxTQUFwRDtBQUNBLGVBQUtuTyxjQUFMLENBQW9CdU4sWUFBcEIsRUFBa0NuUCxnQkFBbEMsR0FBcUR5UCxVQUFyRDtBQUNBL08sVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEUwQixpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUs3RSxjQUFMLENBQW9CdU4sWUFBcEIsQ0FBbkg7QUFFQTNMLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVo7QUFDRCxTQTdDSSxDQThDTDs7QUFDRDtBQUNGLEtBM0RELE1BMkRPO0FBQ0wsV0FBSyxJQUFJMEwsYUFBWSxHQUFHLENBQXhCLEVBQTJCQSxhQUFZLEdBQUcsS0FBS3ZOLGNBQUwsQ0FBb0IwQyxNQUE5RCxFQUFzRTZLLGFBQVksRUFBbEYsRUFBc0Y7QUFDcEYsYUFBS3ZOLGNBQUwsQ0FBb0J1TixhQUFwQixFQUFrQ3hQLGNBQWxDLEdBQW1ELElBQW5EO0FBRUEsWUFBSXlQLEtBQUssR0FBRyxLQUFLeE4sY0FBTCxDQUFvQnVOLGFBQXBCLEVBQWtDbFEsSUFBOUM7QUFDQSxZQUFJb1EsUUFBUSxHQUFHLEtBQUt6TixjQUFMLENBQW9CdU4sYUFBcEIsRUFBa0N2USxlQUFqRDtBQUNBLFlBQUkyUSxRQUFRLEdBQUcsS0FBSzNOLGNBQUwsQ0FBb0J1TixhQUFwQixFQUFrQ3RRLG9CQUFqRDtBQUNBLFlBQUkyUSxXQUFXLEdBQUcsS0FBSzVOLGNBQUwsQ0FBb0J1TixhQUFwQixFQUFrQ3BRLG9CQUFwRDtBQUVBLFlBQUkwUSxVQUFVLEdBQUcsQ0FBakI7O0FBQ0EsYUFBSyxJQUFJdEssT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUcsS0FBS3ZELGNBQUwsQ0FBb0J1TixhQUFwQixFQUFrQ3pRLFlBQWxDLENBQStDNEYsTUFBM0UsRUFBbUZhLE9BQUssRUFBeEYsRUFBNEY7QUFDMUYsY0FBSXpFLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NnTixlQUFsQyxHQUFvRDFOLGNBQXBELENBQW1FdU4sYUFBbkUsRUFBaUZ6USxZQUFqRixDQUE4RnlHLE9BQTlGLEVBQXFHOUgsU0FBekcsRUFBb0g7QUFDbEhvUyxZQUFBQSxVQUFVLElBQUkvTyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDZ04sZUFBbEMsR0FBb0QxTixjQUFwRCxDQUFtRXVOLGFBQW5FLEVBQWlGelEsWUFBakYsQ0FBOEZ5RyxPQUE5RixFQUFxRzdILFVBQW5IO0FBQ0Q7QUFDRjs7QUFFRCxZQUFJb1MsS0FBSyxHQUFHLEtBQUs5TixjQUFMLENBQW9CdU4sYUFBcEIsRUFBa0NqUSxTQUE5QztBQUNBLFlBQUl5USxPQUFPLEdBQUcsS0FBSy9OLGNBQUwsQ0FBb0J1TixhQUFwQixFQUFrQ2hRLFVBQWhEOztBQUVBLFlBQUl5USxXQUFXLEdBQUcsS0FBS3ZDLFlBQUwsRUFBbEI7O0FBQ0EsWUFBSXdDLFdBQVcsR0FBR0QsV0FBVyxHQUFHLElBQWhDO0FBRUEsWUFBSUUsUUFBUSxHQUFHRCxXQUFXLEdBQUdILEtBQTdCO0FBQ0EsWUFBSUssU0FBUyxHQUFHRixXQUFXLEdBQUdGLE9BQTlCO0FBRUEsWUFBSUssTUFBTSxHQUFHLENBQUNULFFBQVEsR0FBR0MsV0FBWixJQUEyQixNQUF4QztBQUVBLFlBQUlTLE1BQU0sR0FBRyxDQUFiO0FBQ0EsWUFBSVosUUFBUSxJQUFJLENBQWhCLEVBQW1CWSxNQUFNLEdBQUcsS0FBVCxDQUFuQixLQUNLLElBQUlaLFFBQVEsSUFBSSxDQUFoQixFQUFtQlksTUFBTSxHQUFHLFFBQVEsS0FBakIsQ0FBbkIsS0FDQSxJQUFJWixRQUFRLElBQUksQ0FBaEIsRUFBbUJZLE1BQU0sR0FBRyxRQUFRLEtBQVIsR0FBZ0IsS0FBekI7QUFFeEIsWUFBSUMsV0FBVyxHQUFHZCxLQUFLLEdBQUdZLE1BQVIsR0FBaUJDLE1BQWpCLEdBQTBCSCxRQUExQixHQUFxQ0MsU0FBckMsR0FBaUROLFVBQW5FO0FBRUEsYUFBSzdOLGNBQUwsQ0FBb0J1TixhQUFwQixFQUFrQ3ZQLFVBQWxDLEdBQStDc1EsV0FBL0M7QUFDQSxhQUFLdE8sY0FBTCxDQUFvQnVOLGFBQXBCLEVBQWtDdFAsV0FBbEMsR0FBZ0RvUSxNQUFoRDtBQUNBLGFBQUtyTyxjQUFMLENBQW9CdU4sYUFBcEIsRUFBa0NyUCxXQUFsQyxHQUFnRGtRLE1BQWhEO0FBQ0EsYUFBS3BPLGNBQUwsQ0FBb0J1TixhQUFwQixFQUFrQ3BQLGFBQWxDLEdBQWtEK1AsUUFBbEQ7QUFDQSxhQUFLbE8sY0FBTCxDQUFvQnVOLGFBQXBCLEVBQWtDbFAsZUFBbEMsR0FBb0Q4UCxTQUFwRDtBQUNBLGFBQUtuTyxjQUFMLENBQW9CdU4sYUFBcEIsRUFBa0NuUCxnQkFBbEMsR0FBcUR5UCxVQUFyRDtBQUNEO0FBQ0Y7QUFDRixHQXI0Q3dCO0FBdTRDekJVLEVBQUFBLHlCQXY0Q3lCLHFDQXU0Q0N2SixLQXY0Q0QsRUF1NENRO0FBQy9CbEcsSUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3VFLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNkVGLEtBQTdFO0FBQ0QsR0F6NEN3QjtBQTI0Q3pCd0osRUFBQUEsZ0NBMzRDeUIsNENBMjRDUXhKLEtBMzRDUixFQTI0Q2U7QUFDdENsRyxJQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDdUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RUYsS0FBOUU7QUFDRCxHQTc0Q3dCO0FBKzRDekJ5SixFQUFBQSxZQS80Q3lCLHdCQSs0Q1poTCxJQS80Q1ksRUErNENOO0FBQ2pCLFFBQUlpTCxRQUFRLEdBQUcsRUFBZjtBQUNBLFFBQUlDLFVBQVUsR0FBRyxFQUFqQjs7QUFDQSxRQUFJLEtBQUtuTyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0EsVUFBSSxDQUFDekgsYUFBTCxFQUFvQjtBQUNsQkEsUUFBQUEsYUFBYSxHQUFHLElBQWhCO0FBQ0ErRixRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERzTixjQUE5RDtBQUNBaFAsUUFBQUEsVUFBVSxHQUFHLElBQWI7QUFDQSxZQUFJbUksZUFBZSxHQUFHakosd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXdGLGlCQUE3RSxFQUF0QjtBQUNBLFlBQUlLLE1BQU0sR0FBR2xKLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEVBQWI7QUFDQXZCLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZNEIsSUFBWjtBQUNBN0IsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVltRyxNQUFNLENBQUM1RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDMUcsU0FBdEQ7QUFDQW1DLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUE3RixDQUErRy9FLFFBQS9HLEdBQTBILElBQTFIOztBQUVBLFlBQUlRLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYwQyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsSUFBOUgsRUFBb0k7QUFDbEksY0FBSWdELE1BQU0sR0FBRyxDQUFDLENBQWQ7O0FBQ0EsZUFBSyxJQUFJeEYsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd3RSxlQUFlLENBQUNyRixNQUE1QyxFQUFvRGEsS0FBSyxFQUF6RCxFQUE2RDtBQUMzRCxnQkFBSXdFLGVBQWUsQ0FBQ3hFLEtBQUQsQ0FBZixDQUF1QkgsZ0JBQXZCLENBQXdDQyxpQkFBeEMsQ0FBMEQxRyxTQUExRCxJQUF1RThHLElBQTNFLEVBQWlGO0FBQy9Fc0YsY0FBQUEsTUFBTSxHQUFHeEYsS0FBVDtBQUNBO0FBQ0Q7QUFDRjs7QUFFRG9MLFVBQUFBLFVBQVUsR0FBRyxpQkFBaUI1RyxlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0IzRixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRDNHLFVBQXpGO0FBQ0FnUyxVQUFBQSxRQUFRLEdBQ04scUJBQ0EzRyxlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0IzRixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRGhHLElBRDNELEdBRUEsSUFGQSxHQUdBLGlDQUhBLEdBSUEwSyxlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0IzRixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRHBGLFdBSjNELEdBS0EsSUFMQSxHQU1BLHVDQU5BLEdBT0E4SixlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0IzRixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRG5GLFdBUDNELEdBUUEsSUFSQSxHQVNBLGdCQVRBLEdBVUE2SixlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0IzRixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRGxGLGFBVjNELEdBV0EsSUFYQSxHQVlBLGtCQVpBLEdBYUE0SixlQUFlLENBQUNnQixNQUFELENBQWYsQ0FBd0IzRixnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRGhGLGVBYjNELEdBY0EsSUFkQSxHQWVBLGtCQWZBLEdBZ0JBMEosZUFBZSxDQUFDZ0IsTUFBRCxDQUFmLENBQXdCM0YsZ0JBQXhCLENBQXlDQyxpQkFBekMsQ0FBMkRqRixnQkFoQjNELEdBaUJBLElBakJBLEdBa0JBLHVCQWxCQSxHQW1CQTJKLGVBQWUsQ0FBQ2dCLE1BQUQsQ0FBZixDQUF3QjNGLGdCQUF4QixDQUF5Q0MsaUJBQXpDLENBQTJEckYsVUFuQjNELEdBb0JBLElBckJGO0FBdUJBYyxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEdU0sZ0JBQTFELENBQTJFRixVQUEzRSxFQUF1RkQsUUFBdkY7QUFDRCxTQWxDRCxNQWtDTztBQUNMLGNBQUkxRyxNQUFNLENBQUM1RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDMUcsU0FBMUMsSUFBdUQ4RyxJQUEzRCxFQUFpRTtBQUMvRDtBQUNBa0wsWUFBQUEsVUFBVSxHQUFHLGtDQUFiO0FBQ0FELFlBQUFBLFFBQVEsR0FDTixxQkFDQTFHLE1BQU0sQ0FBQzVFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMENoRyxJQUQxQyxHQUVBLElBRkEsR0FHQSxpQ0FIQSxHQUlBMkssTUFBTSxDQUFDNUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ3BGLFdBSjFDLEdBS0EsSUFMQSxHQU1BLHVDQU5BLEdBT0ErSixNQUFNLENBQUM1RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDbkYsV0FQMUMsR0FRQSxJQVJBLEdBU0EsZ0JBVEEsR0FVQThKLE1BQU0sQ0FBQzVFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMENsRixhQVYxQyxHQVdBLElBWEEsR0FZQSxrQkFaQSxHQWFBNkosTUFBTSxDQUFDNUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ2hGLGVBYjFDLEdBY0EsSUFkQSxHQWVBLGtCQWZBLEdBZ0JBMkosTUFBTSxDQUFDNUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ2pGLGdCQWhCMUMsR0FpQkEsSUFqQkEsR0FrQkEsdUJBbEJBLEdBbUJBNEosTUFBTSxDQUFDNUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ3JGLFVBbkIxQyxHQW9CQSxJQXJCRjs7QUF1QkEsZ0JBQUk4USxZQUFZLEdBQUc1RCxRQUFRLENBQUNwTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcU8saUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUMsUUFBbkUsQ0FBM0I7O0FBQ0EsZ0JBQUlDLE1BQU0sR0FBR0osWUFBWSxHQUFHNUQsUUFBUSxDQUFDbEQsTUFBTSxDQUFDNUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ3JGLFVBQTNDLENBQXBDOztBQUNBYyxZQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcU8saUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUMsUUFBbEUsR0FBNkVDLE1BQU0sQ0FBQ0MsUUFBUCxFQUE3RTs7QUFFQSxnQkFBSUMsSUFBSSxHQUFHbEUsUUFBUSxDQUFDcE0sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3FPLGlCQUFsQyxHQUFzREMsV0FBdEQsQ0FBa0VLLFFBQW5FLENBQW5COztBQUNBRCxZQUFBQSxJQUFJLEdBQUdBLElBQUksR0FBRyxDQUFkO0FBQ0F0USxZQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcU8saUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUssUUFBbEUsR0FBNkVELElBQUksQ0FBQ0QsUUFBTCxFQUE3RTtBQUVBclEsWUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3FPLGlCQUFsQyxHQUFzRE8sY0FBdEQsQ0FBcUUsQ0FBQyxDQUF0RSxFQUF5RUYsSUFBekUsRUFBK0UsQ0FBQyxDQUFoRjtBQUVBdFEsWUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHVNLGdCQUExRCxDQUEyRUYsVUFBM0UsRUFBdUZELFFBQXZGO0FBQ0QsV0FyQ0QsTUFxQ087QUFDTDtBQUNBQyxZQUFBQSxVQUFVLEdBQUcsd0NBQWI7QUFDQUQsWUFBQUEsUUFBUSxHQUNOLHFCQUNBMUcsTUFBTSxDQUFDNUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ2hHLElBRDFDLEdBRUEsSUFGQSxHQUdBLGlDQUhBLEdBSUEySyxNQUFNLENBQUM1RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDcEYsV0FKMUMsR0FLQSxJQUxBLEdBTUEsdUNBTkEsR0FPQStKLE1BQU0sQ0FBQzVFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMENuRixXQVAxQyxHQVFBLElBUkEsR0FTQSxnQkFUQSxHQVVBOEosTUFBTSxDQUFDNUUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ2xGLGFBVjFDLEdBV0EsSUFYQSxHQVlBLGtCQVpBLEdBYUE2SixNQUFNLENBQUM1RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDaEYsZUFiMUMsR0FjQSxJQWRBLEdBZUEsa0JBZkEsR0FnQkEySixNQUFNLENBQUM1RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDakYsZ0JBaEIxQyxHQWlCQSxJQWpCQSxHQWtCQSx1QkFsQkEsR0FtQkE0SixNQUFNLENBQUM1RSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDckYsVUFuQjFDLEdBb0JBLElBckJGO0FBdUJBYyxZQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEdU0sZ0JBQTFELENBQTJFRixVQUEzRSxFQUF1RkQsUUFBdkY7QUFDRDtBQUNGO0FBQ0Y7QUFDRixLQWxIRCxNQWtITyxJQUFJLEtBQUtsTyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDO0FBQ0FaLE1BQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0EsVUFBSW1JLGVBQWUsR0FBRyxLQUFLL0gsY0FBM0I7QUFDQSxVQUFJZ0ksTUFBTSxHQUFHLEtBQUtoSSxjQUFMLENBQW9CLENBQXBCLENBQWI7QUFDQTRCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZNEIsSUFBWjtBQUNBN0IsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVltRyxNQUFNLENBQUNyTCxTQUFuQjtBQUNBLFdBQUtxRCxjQUFMLENBQW9CLENBQXBCLEVBQXVCMUIsUUFBdkIsR0FBa0MsSUFBbEM7O0FBRUEsVUFBSTBKLE1BQU0sQ0FBQ3JMLFNBQVAsSUFBb0I4RyxJQUF4QixFQUE4QjtBQUM1QjtBQUNBa0wsUUFBQUEsVUFBVSxHQUFHLGtDQUFiO0FBQ0FELFFBQUFBLFFBQVEsR0FDTixxQkFDQTFHLE1BQU0sQ0FBQzNLLElBRFAsR0FFQSxJQUZBLEdBR0EsaUNBSEEsR0FJQTJLLE1BQU0sQ0FBQy9KLFdBSlAsR0FLQSxJQUxBLEdBTUEsdUNBTkEsR0FPQStKLE1BQU0sQ0FBQzlKLFdBUFAsR0FRQSxJQVJBLEdBU0EsZ0JBVEEsR0FVQThKLE1BQU0sQ0FBQzdKLGFBVlAsR0FXQSxJQVhBLEdBWUEsa0JBWkEsR0FhQTZKLE1BQU0sQ0FBQzNKLGVBYlAsR0FjQSxJQWRBLEdBZUEsa0JBZkEsR0FnQkEySixNQUFNLENBQUM1SixnQkFoQlAsR0FpQkEsSUFqQkEsR0FrQkEsdUJBbEJBLEdBbUJBNEosTUFBTSxDQUFDaEssVUFuQlAsR0FvQkEsSUFwQkEsR0FxQkEsOEJBckJBLEdBc0JBLEtBQUtnQyxjQUFMLENBQW9CLENBQXBCLEVBQXVCaEMsVUF0QnZCLEdBdUJBLElBeEJGOztBQTBCQSxZQUFJOFEsWUFBWSxHQUFHNUQsUUFBUSxDQUFDcE0sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3FPLGlCQUFsQyxHQUFzREMsV0FBdEQsQ0FBa0VDLFFBQW5FLENBQTNCOztBQUNBLFlBQUlDLE1BQU0sR0FBR0osWUFBWSxHQUFHNUQsUUFBUSxDQUFDbEQsTUFBTSxDQUFDaEssVUFBUixDQUFwQzs7QUFDQWMsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3FPLGlCQUFsQyxHQUFzREMsV0FBdEQsQ0FBa0VDLFFBQWxFLEdBQTZFQyxNQUFNLENBQUNDLFFBQVAsRUFBN0U7O0FBRUEsWUFBSUMsSUFBSSxHQUFHbEUsUUFBUSxDQUFDcE0sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3FPLGlCQUFsQyxHQUFzREMsV0FBdEQsQ0FBa0VLLFFBQW5FLENBQW5COztBQUNBRCxRQUFBQSxJQUFJLEdBQUdBLElBQUksR0FBRyxDQUFkO0FBQ0F0USxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDcU8saUJBQWxDLEdBQXNEQyxXQUF0RCxDQUFrRUssUUFBbEUsR0FBNkVELElBQUksQ0FBQ0QsUUFBTCxFQUE3RTtBQUNBclEsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3FPLGlCQUFsQyxHQUFzRE8sY0FBdEQsQ0FBcUUsQ0FBQyxDQUF0RSxFQUF5RUYsSUFBekUsRUFBK0UsQ0FBQyxDQUFoRjtBQUVBdFEsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHVNLGdCQUExRCxDQUEyRUYsVUFBM0UsRUFBdUZELFFBQXZGO0FBQ0QsT0F2Q0QsTUF1Q087QUFDTDtBQUVBQyxRQUFBQSxVQUFVLEdBQUcsd0NBQWI7QUFDQUQsUUFBQUEsUUFBUSxHQUNOLHFCQUNBMUcsTUFBTSxDQUFDM0ssSUFEUCxHQUVBLElBRkEsR0FHQSxpQ0FIQSxHQUlBMkssTUFBTSxDQUFDL0osV0FKUCxHQUtBLElBTEEsR0FNQSx1Q0FOQSxHQU9BK0osTUFBTSxDQUFDOUosV0FQUCxHQVFBLElBUkEsR0FTQSxnQkFUQSxHQVVBOEosTUFBTSxDQUFDN0osYUFWUCxHQVdBLElBWEEsR0FZQSxrQkFaQSxHQWFBNkosTUFBTSxDQUFDM0osZUFiUCxHQWNBLElBZEEsR0FlQSxrQkFmQSxHQWdCQTJKLE1BQU0sQ0FBQzVKLGdCQWhCUCxHQWlCQSxJQWpCQSxHQWtCQSx1QkFsQkEsR0FtQkE0SixNQUFNLENBQUNoSyxVQW5CUCxHQW9CQSxJQXBCQSxHQXFCQSw4QkFyQkEsR0FzQkEsS0FBS2dDLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUJoQyxVQXRCdkIsR0F1QkEsSUF4QkY7QUEwQkFjLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMER1TSxnQkFBMUQsQ0FBMkVGLFVBQTNFLEVBQXVGRCxRQUF2RjtBQUNEO0FBQ0Y7QUFDRixHQXJsRHdCO0FBdWxEekJhLEVBQUFBLG9CQXZsRHlCLGdDQXVsREp2SyxLQXZsREksRUF1bERHO0FBQUE7O0FBQzFCLFFBQUlxSSxNQUFNLEdBQUdySSxLQUFLLENBQUN3SyxHQUFuQjs7QUFDQSxRQUFJbkMsTUFBSixFQUFZO0FBQ1YsV0FBS0QsZ0JBQUwsQ0FBc0IsSUFBdEIsRUFBNEIsS0FBNUI7QUFFQXRPLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERzRixTQUExRCxDQUFvRSxzQ0FBcEUsRUFBNEcsSUFBNUcsRUFBa0gsS0FBbEg7QUFDQXJDLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsUUFBQSxNQUFJLENBQUNrSyxpQkFBTDs7QUFFQSxZQUFJQyxHQUFHLEdBQUcsQ0FBQyxDQUFYO0FBQ0EsWUFBSUMsV0FBVyxHQUFHLENBQWxCO0FBQ0EsWUFBSUMsV0FBVyxHQUFHLE1BQUksQ0FBQzVQLGNBQXZCOztBQUVBLGFBQUssSUFBSXVELEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHcU0sV0FBVyxDQUFDbE4sTUFBeEMsRUFBZ0RhLEtBQUssRUFBckQsRUFBeUQ7QUFDdkQsY0FBSXNNLE1BQU0sR0FBR0QsV0FBVyxDQUFDck0sS0FBRCxDQUFYLENBQW1CdkYsVUFBaEM7O0FBRUEsY0FBSTZSLE1BQU0sR0FBR0gsR0FBYixFQUFrQjtBQUNoQkMsWUFBQUEsV0FBVyxHQUFHcE0sS0FBZDtBQUNBbU0sWUFBQUEsR0FBRyxHQUFHRyxNQUFOO0FBQ0Q7QUFDRjs7QUFFRCxhQUFLLElBQUl0TSxPQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE9BQUssR0FBR3FNLFdBQVcsQ0FBQ2xOLE1BQXhDLEVBQWdEYSxPQUFLLEVBQXJELEVBQXlEO0FBQ3ZELGNBQUlxTSxXQUFXLENBQUNyTSxPQUFELENBQVgsQ0FBbUJoRixRQUF2QixFQUFpQztBQUMvQixnQkFBSXNSLE1BQU0sR0FBR0QsV0FBVyxDQUFDck0sT0FBRCxDQUFYLENBQW1CdkYsVUFBaEM7QUFDQTRELFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZZ08sTUFBWjtBQUNEO0FBQ0Y7O0FBRURqTyxRQUFBQSxPQUFPLENBQUNrTyxLQUFSLENBQWMsNEJBQTRCRixXQUFXLENBQUNELFdBQUQsQ0FBWCxDQUF5QmhULFNBQW5FOztBQUNBLFFBQUEsTUFBSSxDQUFDNFIseUJBQUwsQ0FBK0JxQixXQUFXLENBQUNELFdBQUQsQ0FBWCxDQUF5QmhULFNBQXhEO0FBQ0QsT0F6QlMsRUF5QlAsSUF6Qk8sQ0FBVjtBQTBCRCxLQTlCRCxNQThCTztBQUNMLFVBQUltQyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGMEMsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILEtBQTlILEVBQXFJO0FBQ25JLGFBQUtxSCxnQkFBTCxDQUFzQixLQUF0QixFQUE2QixLQUE3QjtBQUVBdE8sUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNGLFNBQTFELENBQW9FLHNDQUFwRSxFQUE0RyxJQUE1RyxFQUFrSCxLQUFsSDtBQUNBckMsUUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZjNELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZL0Msd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXdGLGlCQUE3RSxFQUFaOztBQUNBLFVBQUEsTUFBSSxDQUFDOEgsaUJBQUw7O0FBRUEsVUFBQSxNQUFJLENBQUMvTCx3QkFBTCxDQUE4QixDQUE5Qjs7QUFFQSxjQUFJZ00sR0FBRyxHQUFHLENBQUMsQ0FBWDtBQUNBLGNBQUlDLFdBQVcsR0FBRyxDQUFsQjtBQUNBLGNBQUlDLFdBQVcsR0FBRyxNQUFJLENBQUM1UCxjQUF2QjtBQUNBNEIsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkrTixXQUFaOztBQUVBLGVBQUssSUFBSXJNLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHcU0sV0FBVyxDQUFDbE4sTUFBeEMsRUFBZ0RhLEtBQUssRUFBckQsRUFBeUQ7QUFDdkQsZ0JBQUlxTSxXQUFXLENBQUNyTSxLQUFELENBQVgsQ0FBbUJoRixRQUF2QixFQUFpQztBQUMvQixrQkFBSXNSLE1BQU0sR0FBR0QsV0FBVyxDQUFDck0sS0FBRCxDQUFYLENBQW1CdkYsVUFBaEM7O0FBRUEsa0JBQUk2UixNQUFNLEdBQUdILEdBQWIsRUFBa0I7QUFDaEJDLGdCQUFBQSxXQUFXLEdBQUdwTSxLQUFkO0FBQ0FtTSxnQkFBQUEsR0FBRyxHQUFHRyxNQUFOO0FBQ0Q7QUFDRjtBQUNGOztBQUVELGVBQUssSUFBSXRNLE9BQUssR0FBRyxDQUFqQixFQUFvQkEsT0FBSyxHQUFHcU0sV0FBVyxDQUFDbE4sTUFBeEMsRUFBZ0RhLE9BQUssRUFBckQsRUFBeUQ7QUFDdkQsZ0JBQUlxTSxXQUFXLENBQUNyTSxPQUFELENBQVgsQ0FBbUJoRixRQUF2QixFQUFpQztBQUMvQixrQkFBSXNSLE1BQU0sR0FBR0QsV0FBVyxDQUFDck0sT0FBRCxDQUFYLENBQW1CdkYsVUFBaEM7QUFDQTRELGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZZ08sTUFBWjtBQUNEO0FBQ0Y7O0FBRURqTyxVQUFBQSxPQUFPLENBQUNrTyxLQUFSLENBQWMsNEJBQTRCRixXQUFXLENBQUNELFdBQUQsQ0FBWCxDQUF5QmhULFNBQW5FOztBQUNBLFVBQUEsTUFBSSxDQUFDNFIseUJBQUwsQ0FBK0JxQixXQUFXLENBQUNELFdBQUQsQ0FBWCxDQUF5QmhULFNBQXhEO0FBQ0QsU0EvQlMsRUErQlAsSUEvQk8sQ0FBVjtBQWdDRDtBQUNGO0FBQ0YsR0E5cER3QjtBQWdxRHpCd1EsRUFBQUEsdUJBaHFEeUIsbUNBZ3FEREUsTUFocURDLEVBZ3FEZTtBQUFBLFFBQWhCQSxNQUFnQjtBQUFoQkEsTUFBQUEsTUFBZ0IsR0FBUCxLQUFPO0FBQUE7O0FBQ3RDLFFBQUlySSxLQUFLLEdBQUc7QUFBRXdLLE1BQUFBLEdBQUcsRUFBRW5DO0FBQVAsS0FBWjtBQUNBLFNBQUttQixnQ0FBTCxDQUFzQ3hKLEtBQXRDO0FBQ0QsR0FucUR3QjtBQXFxRHpCMUcsRUFBQUEsUUFycUR5QixvQkFxcURoQmdQLGNBcnFEZ0IsRUFxcURRO0FBQUE7O0FBQUEsUUFBeEJBLGNBQXdCO0FBQXhCQSxNQUFBQSxjQUF3QixHQUFQLEtBQU87QUFBQTs7QUFDL0IsUUFBSSxLQUFLOU0sWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLFVBQUk4TSxjQUFKLEVBQW9CO0FBQ2xCLGFBQUttQyxpQkFBTDtBQUNEOztBQUVELFVBQUkzUSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGMEMsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILEtBQTlILEVBQXFJO0FBQ25JLGFBQUtyQyx3QkFBTCxDQUE4QixDQUE5QjtBQUVBLFlBQUlxRSxlQUFlLEdBQUdqSix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFd0YsaUJBQTdFLEVBQXRCO0FBQ0EsWUFBSW9JLGVBQWUsR0FBRyxDQUF0QjtBQUVBLGFBQUsvUCxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BELGNBQXJDLEdBQXNELElBQXRELENBTm1JLENBUW5JO0FBQ0E7QUFDQTs7QUFFQSxhQUFLLElBQUl3RixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLdkQsY0FBTCxDQUFvQjBDLE1BQWhELEVBQXdEYSxLQUFLLEVBQTdELEVBQWlFO0FBQy9ELGNBQUksS0FBS3ZELGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQmhGLFFBQTNCLElBQXVDLEtBQXZDLElBQWdELEtBQUt5QixjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ4RixjQUEvRSxFQUErRmdTLGVBQWU7QUFDL0c7O0FBRURuTyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx1QkFBdUJrTyxlQUFuQztBQUNBbk8sUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksNkJBQTZCLEtBQUs3QixjQUFMLENBQW9CMEMsTUFBN0Q7O0FBQ0EsWUFBSXFOLGVBQWUsSUFBSSxLQUFLL1AsY0FBTCxDQUFvQjBDLE1BQXZDLElBQWlENEssY0FBckQsRUFBcUU7QUFDbkU7QUFDQTFOLFVBQUFBLFVBQVUsR0FBRyxJQUFiOztBQUNBLGNBQUkwTixjQUFKLEVBQW9CO0FBQ2xCL0gsWUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixjQUFBLE1BQUksQ0FBQzRILHVCQUFMLENBQTZCLEtBQTdCO0FBQ0QsYUFGUyxFQUVQLElBRk8sQ0FBVjtBQUdELFdBSkQsTUFJTyxJQUFJLEtBQUtuTixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RmEsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQ3JLLGdCQUFJLENBQUMzRixZQUFELElBQWlCLENBQUNDLFlBQXRCLEVBQW9DO0FBQ2xDLG1CQUFLaU8sdUJBQUwsQ0FBNkIsS0FBN0I7QUFDRCxhQUZELE1BRU87QUFDTHRPLGNBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0EsbUJBQUtxTyxnQkFBTDtBQUNEO0FBQ0Y7QUFDRixTQWZELE1BZU87QUFDTCxjQUFJLENBQUN0TixVQUFMLEVBQWlCO0FBQ2YsZ0JBQUksS0FBS0ksY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN4RSxTQUFyQyxJQUFrRG1DLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZhLElBQTdGLENBQWtHVyxNQUF4SixFQUFnSztBQUM5SixrQkFBSSxDQUFDM0YsWUFBRCxJQUFpQixDQUFDQyxZQUF0QixFQUFvQztBQUNsQ0wsZ0JBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0EscUJBQUtxTyxnQkFBTDtBQUNEO0FBQ0YsYUFMRCxNQUtPO0FBQ0xyTyxjQUFBQSxVQUFVLEdBQUcsS0FBYjtBQUNBLG1CQUFLcU8sZ0JBQUw7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGLEtBckRELE1BcURPLElBQUksS0FBSzFNLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakM7QUFDQSxVQUFJLEtBQUtSLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDdEUsS0FBekMsRUFBZ0RyRSxXQUFXLEdBQUcsSUFBZCxDQUFoRCxLQUNLRCxZQUFZLEdBQUcsSUFBZjtBQUVMcUosTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksbUJBQW1CdEosWUFBL0I7QUFDQXFKLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFrQnJKLFdBQTlCLEVBTmlDLENBT2pDOztBQUNBLFVBQUl1WCxlQUFlLEdBQUcsQ0FBdEI7QUFDQSxXQUFLL1AsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNwRCxjQUFyQyxHQUFzRCxJQUF0RDtBQUVBLFVBQUlnSyxlQUFlLEdBQUcsS0FBSy9ILGNBQTNCOztBQUNBLFdBQUssSUFBSXVELE9BQUssR0FBRyxDQUFqQixFQUFvQkEsT0FBSyxHQUFHd0UsZUFBZSxDQUFDckYsTUFBNUMsRUFBb0RhLE9BQUssRUFBekQsRUFBNkQ7QUFDM0QsWUFBSXdFLGVBQWUsQ0FBQ3hFLE9BQUQsQ0FBZixDQUF1QnhGLGNBQTNCLEVBQTJDZ1MsZUFBZTtBQUMzRDs7QUFFRCxVQUFJQSxlQUFlLElBQUksS0FBSy9QLGNBQUwsQ0FBb0IwQyxNQUEzQyxFQUFtRDtBQUNqRDtBQUNBbEssUUFBQUEsV0FBVyxHQUFHLElBQWQ7QUFDQUQsUUFBQUEsWUFBWSxHQUFHLElBQWY7QUFDQXFILFFBQUFBLFVBQVUsR0FBRyxJQUFiOztBQUVBLFlBQUksQ0FBQ1gsWUFBRCxJQUFpQixDQUFDQyxZQUF0QixFQUFvQztBQUNsQyxlQUFLaU8sdUJBQUwsQ0FBNkIsSUFBN0I7QUFDRDtBQUNGLE9BVEQsTUFTTztBQUNMLFlBQUksQ0FBQ3ZOLFVBQUwsRUFBaUI7QUFDZixjQUFJLENBQUNYLFlBQUQsSUFBaUIsQ0FBQ0MsWUFBdEIsRUFBb0M7QUFDbENMLFlBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0EsaUJBQUtxTyxnQkFBTDtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0YsR0E3dkR3QjtBQTh2RHpCSCxFQUFBQSxhQUFhLEVBQUUseUJBQVk7QUFBQTs7QUFDekIsUUFBSXJPLFdBQVcsSUFBSUksd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3NELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER2QixNQUE3RSxFQUFxRjtBQUNuRmQsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksVUFBWjtBQUNBLFdBQUttTyxhQUFMO0FBRUF6SyxNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFFBQUEsTUFBSSxDQUFDakgsUUFBTCxDQUFjLEtBQWQ7QUFDRCxPQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsS0FQRCxNQU9PO0FBQ0wsVUFBSSxDQUFDc0IsVUFBTCxFQUFpQjtBQUNmakIsUUFBQUEsUUFBUSxHQUFHQSxRQUFRLEdBQUcsQ0FBdEI7O0FBQ0EsWUFBSW1GLE1BQU0sR0FBRy9KLEVBQUUsQ0FBQ2dLLElBQUgsQ0FBUWpGLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NzRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEdkYsV0FBMUQsRUFBdUV3RixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHQyxDQUExRyxFQUE2R3RGLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NzRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEdkYsV0FBMUQsRUFBdUV3RixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHRSxDQUEvTSxDQUFiOztBQUNBLGFBQUs0TCxXQUFMLENBQWlCLEtBQUszUCxjQUFMLENBQW9CLEtBQUthLFVBQXpCLENBQWpCLEVBQXVEMkMsTUFBdkQ7QUFDRDtBQUNGO0FBQ0YsR0E3d0R3QjtBQSt3RHpCNkUsRUFBQUEsU0FBUyxFQUFFLG1CQUFVdUgsR0FBVixFQUFlUixHQUFmLEVBQW9CO0FBQzdCLFdBQU8xRCxJQUFJLENBQUNtRSxLQUFMLENBQVduRSxJQUFJLENBQUNDLE1BQUwsTUFBaUJ5RCxHQUFHLEdBQUdRLEdBQXZCLENBQVgsSUFBMENBLEdBQWpELENBRDZCLENBQ3lCO0FBQ3ZELEdBanhEd0I7QUFteER6QnRGLEVBQUFBLFdBQVcsRUFBRSxxQkFBVUQsSUFBVixFQUFnQnlGLE1BQWhCLEVBQXdCQyxJQUF4QixFQUE4QjtBQUFBOztBQUN6Q3RXLElBQUFBLEVBQUUsQ0FBQ3VXLEtBQUgsQ0FBUyxLQUFLbFEsVUFBZCxFQUNHbVEsRUFESCxDQUNNRixJQUROLEVBQ1k7QUFBRWxNLE1BQUFBLFFBQVEsRUFBRXBLLEVBQUUsQ0FBQ3lXLEVBQUgsQ0FBTTdGLElBQUksQ0FBQ3ZHLENBQVgsRUFBY3VHLElBQUksQ0FBQ3RHLENBQW5CO0FBQVosS0FEWixFQUNpRDtBQUFFb00sTUFBQUEsTUFBTSxFQUFFO0FBQVYsS0FEakQsRUFFR0MsSUFGSCxDQUVRLFlBQU07QUFDVixVQUFJTixNQUFKLEVBQVksTUFBSSxDQUFDTyxZQUFMLEdBQVosS0FDSyxNQUFJLENBQUNYLGFBQUw7QUFDTixLQUxILEVBTUdZLEtBTkg7QUFPRCxHQTN4RHdCO0FBNnhEekJELEVBQUFBLFlBN3hEeUIsMEJBNnhEVjtBQUFBOztBQUNicEwsSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixVQUFJLE1BQUksQ0FBQ3hELE1BQUwsQ0FBWStILFNBQVosR0FBd0IsQ0FBNUIsRUFBK0I7QUFDN0IsUUFBQSxNQUFJLENBQUMvSCxNQUFMLENBQVkrSCxTQUFaLEdBQXdCLE1BQUksQ0FBQy9ILE1BQUwsQ0FBWStILFNBQVosR0FBd0IsSUFBaEQ7O0FBQ0EsUUFBQSxNQUFJLENBQUM2RyxZQUFMO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsUUFBQSxNQUFJLENBQUM1TyxNQUFMLENBQVkrSCxTQUFaLEdBQXdCLENBQXhCO0FBQ0EsUUFBQSxNQUFJLENBQUM3SCxlQUFMLEdBQXVCLElBQXZCOztBQUNBLFFBQUEsTUFBSSxDQUFDOEssYUFBTDtBQUNEO0FBQ0YsS0FUUyxFQVNQLEVBVE8sQ0FBVjtBQVVELEdBeHlEd0I7QUEweUR6QjhELEVBQUFBLHFCQTF5RHlCLGlDQTB5REh4RCxNQTF5REcsRUEweURhO0FBQUEsUUFBaEJBLE1BQWdCO0FBQWhCQSxNQUFBQSxNQUFnQixHQUFQLEtBQU87QUFBQTs7QUFDcEMsUUFBSTNPLFdBQVcsR0FBR0ksd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3NELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER2QixNQUE1RSxFQUFvRjtBQUNsRixVQUFJd0ksUUFBUSxDQUFDcE0sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3NELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER2RixXQUExRCxFQUF1RXdGLGlCQUF2RSxDQUF5RmxDLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIbUosU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQVIsSUFBd0osQ0FBNUosRUFBK0o7QUFDN0puTSxRQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNBdkcsUUFBQUEsbUJBQW1CLEdBQUdBLG1CQUFtQixHQUFHLENBQTVDO0FBQ0Q7O0FBRUQsVUFBSXdTLFFBQVEsQ0FBQ3BNLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NzRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEdkYsV0FBMUQsRUFBdUV3RixpQkFBdkUsQ0FBeUZsQyxZQUF6RixDQUFzRyxjQUF0RyxFQUFzSG1KLFNBQXRILENBQWdJQyxVQUFqSSxDQUFSLElBQXdKLENBQTVKLEVBQStKO0FBQzdKbE0sUUFBQUEsWUFBWSxHQUFHLElBQWY7QUFDQXZHLFFBQUFBLG1CQUFtQjtBQUNuQkQsUUFBQUEsbUJBQW1CO0FBQ3BCO0FBQ0Y7O0FBRUR5RyxJQUFBQSxrQkFBa0IsR0FBRyxLQUFLYSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RGpCLGlCQUE1RTtBQUNBc0QsSUFBQUEsZ0JBQWdCLEdBQUcsS0FBS1ksY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNwRSxpQkFBckMsQ0FBdURaLGtCQUExRTs7QUFFQSxRQUFJOEMsWUFBWSxJQUFJLENBQUNDLFlBQWpCLElBQWlDLENBQUNDLGtCQUF0QyxFQUEwRDtBQUN4RDtBQUNBO0FBQ0EsV0FBSzJSLDBCQUFMLENBQWdDLEtBQWhDLEVBQXVDekQsTUFBdkM7QUFDRCxLQUpELE1BSU8sSUFBSW5PLFlBQVksSUFBS0QsWUFBWSxJQUFJRSxrQkFBckMsRUFBMEQ7QUFDL0Q7QUFDQTtBQUNBLFdBQUsyUiwwQkFBTCxDQUFnQyxJQUFoQyxFQUFzQ3pELE1BQXRDO0FBQ0QsS0FKTSxNQUlBO0FBQ0wsV0FBS1IsWUFBTDtBQUNEO0FBQ0YsR0F0MER3QjtBQXcwRHpCNEMsRUFBQUEsaUJBeDBEeUIsK0JBdzBETDtBQUFBOztBQUNsQmxLLElBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsVUFBSSxNQUFJLENBQUN4RCxNQUFMLENBQVkrSCxTQUFaLElBQXlCLENBQTdCLEVBQWdDO0FBQzlCLFFBQUEsTUFBSSxDQUFDN0gsZUFBTCxHQUF1QixLQUF2QjtBQUNBLFFBQUEsTUFBSSxDQUFDRixNQUFMLENBQVkrSCxTQUFaLEdBQXdCLE1BQUksQ0FBQy9ILE1BQUwsQ0FBWStILFNBQVosR0FBd0IsSUFBaEQ7O0FBQ0EsUUFBQSxNQUFJLENBQUMyRixpQkFBTDtBQUNELE9BSkQsTUFJTztBQUNMLFFBQUEsTUFBSSxDQUFDclAsVUFBTCxDQUFnQitELFFBQWhCLEdBQTJCcEssRUFBRSxDQUFDZ0ssSUFBSCxDQUFRLENBQVIsRUFBVyxDQUFYLENBQTNCO0FBQ0EsUUFBQSxNQUFJLENBQUNoQyxNQUFMLENBQVkrSCxTQUFaLEdBQXdCLENBQXhCO0FBQ0Q7QUFDRixLQVRTLEVBU1AsRUFUTyxDQUFWO0FBVUQsR0FuMUR3QjtBQXExRHpCa0csRUFBQUEsYUFyMUR5QiwyQkFxMURUO0FBQUE7O0FBQ2R6SyxJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFVBQUksT0FBSSxDQUFDeEQsTUFBTCxDQUFZK0gsU0FBWixJQUF5QixDQUE3QixFQUFnQztBQUM5QixRQUFBLE9BQUksQ0FBQzdILGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxRQUFBLE9BQUksQ0FBQ0YsTUFBTCxDQUFZK0gsU0FBWixHQUF3QixPQUFJLENBQUMvSCxNQUFMLENBQVkrSCxTQUFaLEdBQXdCLElBQWhEOztBQUNBLFFBQUEsT0FBSSxDQUFDa0csYUFBTDtBQUNELE9BSkQsTUFJTztBQUNMLFFBQUEsT0FBSSxDQUFDNVAsVUFBTCxDQUFnQitELFFBQWhCLEdBQTJCcEssRUFBRSxDQUFDZ0ssSUFBSCxDQUFRLENBQVIsRUFBVyxDQUFYLENBQTNCO0FBQ0EsUUFBQSxPQUFJLENBQUNoQyxNQUFMLENBQVkrSCxTQUFaLEdBQXdCLENBQXhCLENBRkssQ0FHTDs7QUFDQWhMLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERrSSwyQkFBMUQsQ0FBc0YsQ0FBdEY7O0FBRUEsWUFBSSxPQUFJLENBQUNoSyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLGNBQUksT0FBSSxDQUFDUixjQUFMLENBQW9CLE9BQUksQ0FBQ21CLFVBQXpCLEVBQXFDdEUsS0FBckMsSUFBOEMsQ0FBQ3JFLFdBQW5ELEVBQWdFO0FBQzlELFlBQUEsT0FBSSxDQUFDcVkscUJBQUwsQ0FBMkIsT0FBSSxDQUFDN1EsY0FBTCxDQUFvQixPQUFJLENBQUNtQixVQUF6QixFQUFxQ3RFLEtBQWhFO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsZ0JBQUksQ0FBQyxPQUFJLENBQUNtRCxjQUFMLENBQW9CLE9BQUksQ0FBQ21CLFVBQXpCLEVBQXFDdEUsS0FBdEMsSUFBK0MsQ0FBQ3RFLFlBQXBELEVBQWtFO0FBQ2hFLGNBQUEsT0FBSSxDQUFDc1kscUJBQUwsQ0FBMkIsT0FBSSxDQUFDN1EsY0FBTCxDQUFvQixPQUFJLENBQUNtQixVQUF6QixFQUFxQ3RFLEtBQWhFO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFlBQUksT0FBSSxDQUFDMkQsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLGNBQUkzSCxVQUFKLEVBQWdCO0FBQ2Q7QUFDQUEsWUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDRDs7QUFFRCxjQUFJLE9BQUksQ0FBQ21ILGNBQUwsQ0FBb0IsT0FBSSxDQUFDbUIsVUFBekIsRUFBcUN4RSxTQUFyQyxJQUFrRG1DLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZhLElBQTdGLENBQWtHVyxNQUF4SixFQUFnSyxPQUFJLENBQUNpTSxxQkFBTCxHQUFoSyxLQUNLLE9BQUksQ0FBQ2hFLFlBQUw7QUFDTjtBQUNGO0FBQ0YsS0FoQ1MsRUFnQ1AsRUFoQ08sQ0FBVjtBQWlDRCxHQXYzRHdCO0FBeTNEekJvRCxFQUFBQSxXQUFXLEVBQUUscUJBQVU5UCxJQUFWLEVBQWdCNFEsS0FBaEIsRUFBdUI7QUFBQTs7QUFDbEMsUUFBSUMsS0FBSyxHQUFHLEdBQVo7QUFDQSxRQUFJcFosT0FBSixFQUFhb1osS0FBSyxHQUFHLElBQVI7QUFFYmpYLElBQUFBLEVBQUUsQ0FBQ3VXLEtBQUgsQ0FBU25RLElBQVQsRUFBZTtBQUFmLEtBQ0dvUSxFQURILENBQ01TLEtBRE4sRUFDYTtBQUFFN00sTUFBQUEsUUFBUSxFQUFFcEssRUFBRSxDQUFDeVcsRUFBSCxDQUFNTyxLQUFLLENBQUMzTSxDQUFaLEVBQWUyTSxLQUFLLENBQUMxTSxDQUFyQjtBQUFaLEtBRGIsRUFDb0Q7QUFBRW9NLE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBRHBELEVBRUdDLElBRkgsQ0FFUSxZQUFNO0FBQ1YsVUFBSS9SLFFBQVEsR0FBR0MsUUFBZixFQUF5QjtBQUN2QjtBQUVBLFlBQUksT0FBSSxDQUFDNEIsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBLGNBQUksT0FBSSxDQUFDUixjQUFMLENBQW9CLE9BQUksQ0FBQ21CLFVBQXpCLEVBQXFDdEUsS0FBekMsRUFBZ0Q7QUFDOUMsZ0JBQUksQ0FBQ3JFLFdBQUwsRUFBa0I7QUFDaEIsa0JBQ0UwUyxRQUFRLENBQUNwTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZGLFdBQTFELEVBQXVFd0YsaUJBQXZFLENBQXlGbEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0htSixTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUF3SixDQUF4SixJQUNBRixRQUFRLENBQUNwTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZGLFdBQTFELEVBQXVFd0YsaUJBQXZFLENBQXlGbEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0htSixTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUF3SixDQUYxSixFQUdFO0FBQ0FuTSxnQkFBQUEsWUFBWSxHQUFHLElBQWY7QUFDQXZHLGdCQUFBQSxtQkFBbUI7QUFDcEI7QUFDRixhQVJELE1BUU87QUFDTGtKLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0FBQ0Q7QUFDRixXQVpELE1BWU87QUFDTCxnQkFBSSxDQUFDdEosWUFBTCxFQUFtQjtBQUNqQixrQkFDRTJTLFFBQVEsQ0FBQ3BNLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NzRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEdkYsV0FBMUQsRUFBdUV3RixpQkFBdkUsQ0FBeUZsQyxZQUF6RixDQUFzRyxjQUF0RyxFQUFzSG1KLFNBQXRILENBQWdJQyxVQUFqSSxDQUFSLElBQXdKLENBQXhKLElBQ0FGLFFBQVEsQ0FBQ3BNLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NzRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEdkYsV0FBMUQsRUFBdUV3RixpQkFBdkUsQ0FBeUZsQyxZQUF6RixDQUFzRyxjQUF0RyxFQUFzSG1KLFNBQXRILENBQWdJQyxVQUFqSSxDQUFSLElBQXdKLENBRjFKLEVBR0U7QUFDQW5NLGdCQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNBdkcsZ0JBQUFBLG1CQUFtQjtBQUNwQixlQVBnQixDQVNqQjs7QUFDRCxhQVZELE1BVU87QUFDTGtKLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFaO0FBQ0Q7QUFDRixXQTVCeUIsQ0E4QjFCOztBQUNEOztBQUVELFlBQUksT0FBSSxDQUFDckIsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixjQUFJLE9BQUksQ0FBQ1IsY0FBTCxDQUFvQixPQUFJLENBQUNtQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RmEsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLGdCQUFJLENBQUMsT0FBSSxDQUFDNUUsY0FBTCxDQUFvQixPQUFJLENBQUNtQixVQUF6QixFQUFxQ3BELGNBQTFDLEVBQTBEO0FBQ3hELGtCQUFJbU4sUUFBUSxDQUFDcE0sd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3NELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER2RixXQUExRCxFQUF1RXdGLGlCQUF2RSxDQUF5RmxDLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIbUosU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQVIsSUFBd0osQ0FBNUosRUFBK0o7QUFDN0puTSxnQkFBQUEsWUFBWSxHQUFHLElBQWY7QUFDQXZHLGdCQUFBQSxtQkFBbUI7QUFDcEI7O0FBRUQsa0JBQUl3UyxRQUFRLENBQUNwTSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZGLFdBQTFELEVBQXVFd0YsaUJBQXZFLENBQXlGbEMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0htSixTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUF3SixDQUE1SixFQUErSjtBQUM3SmxNLGdCQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNBdkcsZ0JBQUFBLG1CQUFtQjtBQUNuQkQsZ0JBQUFBLG1CQUFtQjtBQUNwQjtBQUNGLGFBWEQsTUFXTztBQUNMa0osY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQXdCLE9BQUksQ0FBQzdCLGNBQUwsQ0FBb0IsT0FBSSxDQUFDbUIsVUFBekIsRUFBcUN6RSxVQUF6RTtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxZQUFJZ0MsV0FBVyxHQUFHSSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZCLE1BQTVFLEVBQW9GO0FBQ2xGLGNBQUloRSxXQUFXLElBQUksRUFBbkIsRUFBdUJBLFdBQVcsR0FBR0EsV0FBVyxHQUFHLEVBQTVCLENBQXZCLEtBQ0tBLFdBQVcsR0FBR0EsV0FBVyxHQUFHLENBQTVCO0FBQ04sU0FIRCxNQUdPO0FBQ0xBLFVBQUFBLFdBQVcsR0FBR0EsV0FBVyxHQUFHLENBQTVCO0FBQ0FDLFVBQUFBLFFBQVEsR0FBR0MsUUFBWDtBQUNELFNBN0RzQixDQStEdkI7QUFDQTs7O0FBRUEsUUFBQSxPQUFJLENBQUNtTyxhQUFMLEdBbEV1QixDQW1FdkI7O0FBQ0QsT0FwRUQsTUFvRU87QUFDTCxZQUFJa0UsT0FBTyxHQUFHbFgsRUFBRSxDQUFDZ0ssSUFBSCxDQUFRLENBQVIsRUFBVyxDQUFYLENBQWQ7O0FBQ0EsUUFBQSxPQUFJLENBQUM2RyxXQUFMLENBQWlCcUcsT0FBakIsRUFBMEIsS0FBMUIsRUFBaUMsR0FBakMsRUFGSyxDQUVrQzs7QUFDeEM7QUFDRixLQTNFSCxFQTRFR0wsS0E1RUg7QUE2RUQsR0ExOER3QjtBQTQ4RHpCO0FBRUFNLEVBQUFBLFlBOThEeUIsd0JBODhEWkMsSUE5OERZLEVBODhETkMsSUE5OERNLEVBODhEQTtBQUN2Qm5TLElBQUFBLFlBQVksR0FBR2tTLElBQWY7QUFDQWpTLElBQUFBLFlBQVksR0FBR2tTLElBQWY7O0FBRUEsUUFBSSxDQUFDRCxJQUFMLEVBQVc7QUFDVHpZLE1BQUFBLG1CQUFtQixHQUFHLENBQXRCO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDMFksSUFBTCxFQUFXO0FBQ1R6WSxNQUFBQSxtQkFBbUIsR0FBRyxDQUF0QjtBQUNEO0FBQ0YsR0F6OUR3QjtBQTI5RHpCMFksRUFBQUEsb0JBMzlEeUIsa0NBMjlERjtBQUNyQjFZLElBQUFBLG1CQUFtQjtBQUNwQixHQTc5RHdCO0FBKzlEekIyWSxFQUFBQSwyQkEvOUR5Qix1Q0ErOURHQyxNQS85REgsRUErOURXeEksTUEvOURYLEVBKzlEbUJ5SSxhQS85RG5CLEVBKzlEa0NDLG9CQS85RGxDLEVBKzlEZ0VDLFVBLzlEaEUsRUErOURnRkMsNEJBLzlEaEYsRUErOURzSDtBQUFBLFFBQXBGRixvQkFBb0Y7QUFBcEZBLE1BQUFBLG9CQUFvRixHQUE3RCxLQUE2RDtBQUFBOztBQUFBLFFBQXREQyxVQUFzRDtBQUF0REEsTUFBQUEsVUFBc0QsR0FBekMsQ0FBeUM7QUFBQTs7QUFBQSxRQUF0Q0MsNEJBQXNDO0FBQXRDQSxNQUFBQSw0QkFBc0MsR0FBUCxLQUFPO0FBQUE7O0FBQzdJLFFBQUksS0FBSzNSLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDckUsWUFBckMsQ0FBa0RpTSxNQUFsRCxFQUEwRHZOLGFBQTFELENBQXdFa0gsTUFBeEUsR0FBaUYsQ0FBckYsRUFBd0Y7QUFDdEYsVUFBSSxDQUFDK08sb0JBQUwsRUFBMkI7QUFDekIsWUFBSSxLQUFLelIsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUFyQyxJQUE2Q2tVLE1BQWpELEVBQXlEO0FBQ3ZELGVBQUt2UixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzlELElBQXJDLEdBQTRDLEtBQUsyQyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzlELElBQXJDLEdBQTRDa1UsTUFBeEY7QUFDQSxlQUFLdlIsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNoRSxvQkFBckMsR0FBNEQsS0FBSzZDLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDaEUsb0JBQXJDLEdBQTRELENBQXhIOztBQUNBLGVBQUs2QyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3JFLFlBQXJDLENBQWtEaU0sTUFBbEQsRUFBMER2TixhQUExRCxDQUF3RWdMLElBQXhFLENBQTZFZ0wsYUFBN0U7O0FBQ0ExUyxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEc0YsU0FBMUQsQ0FBb0UsK0NBQXBFLEVBQXFILElBQXJIO0FBQ0FyQyxVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmekcsWUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNQLHNDQUExRDtBQUNELFdBRlMsRUFFUCxJQUZPLENBQVY7QUFHRCxTQVJELE1BUU87QUFDTDlTLFVBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERzRixTQUExRCxDQUFvRSx1RUFBdUUySixNQUEzSTtBQUNEO0FBQ0YsT0FaRCxNQVlPO0FBQ0wsWUFBSUcsVUFBVSxJQUFJSCxNQUFsQixFQUEwQjtBQUN4QkcsVUFBQUEsVUFBVSxHQUFHQSxVQUFVLEdBQUdILE1BQTFCO0FBQ0EsZUFBS3ZSLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDaEUsb0JBQXJDLEdBQTRELEtBQUs2QyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ2hFLG9CQUFyQyxHQUE0RCxDQUF4SDs7QUFDQSxlQUFLNkMsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNyRSxZQUFyQyxDQUFrRGlNLE1BQWxELEVBQTBEdk4sYUFBMUQsQ0FBd0VnTCxJQUF4RSxDQUE2RWdMLGFBQTdFOztBQUNBMVMsVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNGLFNBQTFELENBQW9FLCtDQUFwRSxFQUFxSCxJQUFySDtBQUNBckMsVUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZnpHLFlBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERzUCxzQ0FBMUQ7QUFDRCxXQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsU0FSRCxNQVFPO0FBQ0w5UyxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEc0YsU0FBMUQsQ0FBb0UsdUVBQXVFMkosTUFBdkUsR0FBZ0YsZ0JBQWhGLEdBQW1HRyxVQUF2SztBQUNEO0FBQ0Y7QUFDRixLQTFCRCxNQTBCTztBQUNMNVMsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNGLFNBQTFELENBQW9FLG9FQUFwRTtBQUNEO0FBQ0YsR0E3L0R3QjtBQSsvRHpCaUssRUFBQUEsMkNBLy9EeUIsdURBKy9EbUJKLG9CQS8vRG5CLEVBKy9EaURDLFVBLy9EakQsRUErL0RpRUMsNEJBLy9EakUsRUErL0R1RztBQUFBLFFBQXBGRixvQkFBb0Y7QUFBcEZBLE1BQUFBLG9CQUFvRixHQUE3RCxLQUE2RDtBQUFBOztBQUFBLFFBQXREQyxVQUFzRDtBQUF0REEsTUFBQUEsVUFBc0QsR0FBekMsQ0FBeUM7QUFBQTs7QUFBQSxRQUF0Q0MsNEJBQXNDO0FBQXRDQSxNQUFBQSw0QkFBc0MsR0FBUCxLQUFPO0FBQUE7O0FBQzlIM1MsSUFBQUEscUJBQXFCLEdBQUcsRUFBeEI7QUFFQTRDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUs3QixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3JFLFlBQWpEOztBQUNBLFNBQUssSUFBSWdWLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBSzlSLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDckUsWUFBckMsQ0FBa0Q0RixNQUF0RSxFQUE4RW9QLENBQUMsRUFBL0UsRUFBbUY7QUFDakYsVUFBSTVHLFFBQVEsQ0FBQyxLQUFLbEwsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNyRSxZQUFyQyxDQUFrRGdWLENBQWxELEVBQXFEclgsWUFBdEQsQ0FBUixJQUErRSxDQUFuRixFQUFzRjtBQUNwRjtBQUNBLFlBQUlzWCxJQUFJLEdBQUdoWSxFQUFFLENBQUNpWSxXQUFILENBQWVsVCx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEMlAsbUJBQTFELENBQThFQyxvQkFBN0YsQ0FBWDtBQUNBSCxRQUFBQSxJQUFJLENBQUN0SSxNQUFMLEdBQWMzSyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEMlAsbUJBQTFELENBQThFRSwyQkFBNUY7QUFDQUosUUFBQUEsSUFBSSxDQUFDL1AsWUFBTCxDQUFrQix1QkFBbEIsRUFBMkNvUSxnQkFBM0MsQ0FBNEROLENBQTVEO0FBQ0FDLFFBQUFBLElBQUksQ0FBQy9QLFlBQUwsQ0FBa0IsdUJBQWxCLEVBQTJDNEcsT0FBM0MsQ0FBbUQsS0FBSzVJLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDckUsWUFBckMsQ0FBa0RnVixDQUFsRCxFQUFxRDlXLFlBQXhHO0FBQ0ErVyxRQUFBQSxJQUFJLENBQUMvUCxZQUFMLENBQWtCLHVCQUFsQixFQUEyQ3FRLG9CQUEzQyxDQUFnRVosb0JBQWhFO0FBQ0FNLFFBQUFBLElBQUksQ0FBQy9QLFlBQUwsQ0FBa0IsdUJBQWxCLEVBQTJDc1EsWUFBM0MsQ0FBd0RaLFVBQXhEO0FBQ0FLLFFBQUFBLElBQUksQ0FBQy9QLFlBQUwsQ0FBa0IsdUJBQWxCLEVBQTJDdVEsOEJBQTNDLENBQTBFWiw0QkFBMUU7QUFDQUksUUFBQUEsSUFBSSxDQUFDL1AsWUFBTCxDQUFrQix1QkFBbEIsRUFBMkN3USxZQUEzQztBQUNBeFQsUUFBQUEscUJBQXFCLENBQUN3SCxJQUF0QixDQUEyQnVMLElBQTNCO0FBQ0Q7QUFDRjs7QUFDRG5RLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZN0MscUJBQVo7QUFDQSxXQUFPQSxxQkFBcUIsQ0FBQzBELE1BQTdCO0FBQ0QsR0FuaEV3QjtBQXFoRXpCK1AsRUFBQUEscUJBcmhFeUIsbUNBcWhFRDtBQUN0QixTQUFLLElBQUlsUCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3ZFLHFCQUFxQixDQUFDMEQsTUFBbEQsRUFBMERhLEtBQUssRUFBL0QsRUFBbUU7QUFDakV2RSxNQUFBQSxxQkFBcUIsQ0FBQ3VFLEtBQUQsQ0FBckIsQ0FBNkJtUCxPQUE3QjtBQUNEOztBQUVEMVQsSUFBQUEscUJBQXFCLEdBQUcsRUFBeEI7QUFDRCxHQTNoRXdCO0FBNmhFekIyVCxFQUFBQSx5QkE3aEV5QixxQ0E2aEVDQyxLQTdoRUQsRUE2aEVRQyxZQTdoRVIsRUE2aEVzQkMsU0E3aEV0QixFQTZoRWlDO0FBQ3hELFFBQUlBLFNBQUosRUFBZTtBQUNiLFVBQUlDLE1BQU0sR0FBRyxJQUFJeFcsU0FBSixFQUFiOztBQUNBd1csTUFBQUEsTUFBTSxDQUFDL1gsWUFBUCxHQUFzQjRYLEtBQXRCO0FBQ0FHLE1BQUFBLE1BQU0sQ0FBQ3ZXLFdBQVAsR0FBcUJxVyxZQUFyQjtBQUVBLFdBQUs3UyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQy9ELFVBQXJDLENBQWdEb0osSUFBaEQsQ0FBcUR1TSxNQUFyRDtBQUNEO0FBQ0YsR0FyaUV3QjtBQXVpRXpCakMsRUFBQUEsMEJBdmlFeUIsc0NBdWlFRWtDLGVBdmlFRixFQXVpRTJCM0YsTUF2aUUzQixFQXVpRTJDNEYsb0JBdmlFM0MsRUF1aUV5RUMsc0JBdmlFekUsRUF1aUVxR0MsUUF2aUVyRyxFQXVpRW1IeEYsUUF2aUVuSCxFQXVpRWlJQyxXQXZpRWpJLEVBdWlFa0o7QUFBQTs7QUFBQSxRQUFoSm9GLGVBQWdKO0FBQWhKQSxNQUFBQSxlQUFnSixHQUE5SCxLQUE4SDtBQUFBOztBQUFBLFFBQXZIM0YsTUFBdUg7QUFBdkhBLE1BQUFBLE1BQXVILEdBQTlHLEtBQThHO0FBQUE7O0FBQUEsUUFBdkc0RixvQkFBdUc7QUFBdkdBLE1BQUFBLG9CQUF1RyxHQUFoRixLQUFnRjtBQUFBOztBQUFBLFFBQXpFQyxzQkFBeUU7QUFBekVBLE1BQUFBLHNCQUF5RSxHQUFoRCxDQUFnRDtBQUFBOztBQUFBLFFBQTdDQyxRQUE2QztBQUE3Q0EsTUFBQUEsUUFBNkMsR0FBbEMsQ0FBa0M7QUFBQTs7QUFBQSxRQUEvQnhGLFFBQStCO0FBQS9CQSxNQUFBQSxRQUErQixHQUFwQixDQUFvQjtBQUFBOztBQUFBLFFBQWpCQyxXQUFpQjtBQUFqQkEsTUFBQUEsV0FBaUIsR0FBSCxDQUFHO0FBQUE7O0FBQ3pLLFFBQUlxRixvQkFBSixFQUEwQjtBQUN4QixVQUFJRyxNQUFNLEdBQUcsUUFBYjtBQUNBdFUsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRCtRLGlCQUExRCxDQUE0RUQsTUFBNUUsRUFBb0YsS0FBcEYsRUFBMkYsS0FBM0YsRUFBa0csS0FBbEcsRUFBeUcvRixNQUF6RyxFQUFpSDRGLG9CQUFqSCxFQUF1SUMsc0JBQXZJLEVBQStKQyxRQUEvSixFQUF5S3hGLFFBQXpLLEVBQW1MQyxXQUFuTCxFQUFnTSxDQUFoTSxFQUFtTSxDQUFuTSxFQUFzTXhPLGdCQUF0TTtBQUNELEtBSEQsTUFHTztBQUNMLFVBQUlGLFlBQVksSUFBSUQsWUFBaEIsSUFBZ0NFLGtCQUFwQyxFQUF3RDtBQUN0RHhHLFFBQUFBLG1CQUFtQixHQUFHLENBQXRCO0FBQ0Q7O0FBRUQyRyxNQUFBQSxlQUFlLEdBQUcsS0FBS1UsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNwRSxpQkFBckMsQ0FBdURmLGNBQXpFO0FBQ0F1RCxNQUFBQSxpQkFBaUIsR0FBRyxLQUFLUyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RGQsZ0JBQTNFO0FBQ0F1RCxNQUFBQSxpQkFBaUIsR0FBRyxLQUFLUSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RGIsZ0JBQTNFOztBQUVBLFVBQUlvRCxlQUFKLEVBQXFCO0FBQ25CO0FBQ0EsYUFBS2dVLHNCQUFMLENBQTRCLEtBQTVCOztBQUVBLFlBQUksQ0FBQ2pHLE1BQUwsRUFBYTtBQUNYdk8sVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNGLFNBQTFELENBQW9FLGtCQUFwRSxFQUF3RixJQUF4RjtBQUNBckMsVUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixZQUFBLE9BQUksQ0FBQ3NILFlBQUw7QUFDRCxXQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsU0FMRCxNQUtPO0FBQ0xqTCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUNBMEQsVUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixZQUFBLE9BQUksQ0FBQ3NILFlBQUw7QUFDRCxXQUZTLEVBRVAsR0FGTyxDQUFWO0FBR0Q7QUFDRixPQWZELE1BZU87QUFDTCxZQUFJdUcsTUFBTSxHQUFHLEVBQWI7QUFFQSxZQUFJSixlQUFKLEVBQXFCSSxNQUFNLEdBQUcsY0FBVCxDQUFyQixLQUNLQSxNQUFNLEdBQUcsUUFBVDtBQUVMdFUsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRCtRLGlCQUExRCxDQUE0RUQsTUFBNUUsRUFBb0ZKLGVBQXBGLEVBQXFHelQsaUJBQXJHLEVBQXdIQyxpQkFBeEgsRUFBMkk2TixNQUEzSSxFQUFtSixLQUFuSixFQUEwSixDQUExSixFQUE2SixDQUE3SixFQUFnSyxDQUFoSyxFQUFtSyxDQUFuSyxFQUFzSzNVLG1CQUF0SyxFQUEyTEMsbUJBQTNMLEVBQWdOeUcsZ0JBQWhOO0FBQ0Q7QUFDRjtBQUNGLEdBNWtFd0I7QUE4a0V6Qm1VLEVBQUFBLHFCQTlrRXlCLG1DQThrRUQ7QUFDdEIsU0FBS3ZULGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDekQsVUFBckMsR0FBa0QsSUFBbEQ7QUFDQSxTQUFLc0MsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUN4RCxjQUFyQyxJQUF1RCxDQUF2RDtBQUNBbUIsSUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRFEsOEJBQTFELENBQXlGLElBQXpGLEVBQStGLEtBQS9GLEVBQXNHLEtBQUt0QyxZQUEzRyxFQUF5SCxLQUFLUixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3pELFVBQTlKLEVBQTBLLEtBQUtzQyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hELGNBQS9NO0FBQ0QsR0FsbEV3QjtBQW9sRXpCNlYsRUFBQUEsK0JBcGxFeUIsMkNBb2xFT0MsT0FwbEVQLEVBb2xFZ0JDLElBcGxFaEIsRUFvbEVzQjtBQUM3QyxRQUFJMU8sS0FBSyxHQUFHO0FBQUVmLE1BQUFBLElBQUksRUFBRTtBQUFFNUcsUUFBQUEsSUFBSSxFQUFFb1csT0FBUjtBQUFpQkUsUUFBQUEsRUFBRSxFQUFFRDtBQUFyQjtBQUFSLEtBQVo7QUFDQTVVLElBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0N1RSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFRixLQUE5RTtBQUNELEdBdmxFd0I7QUF5bEV6QjRPLEVBQUFBLGtDQXpsRXlCLDhDQXlsRVU1TyxLQXpsRVYsRUF5bEVpQjtBQUN4QyxRQUFJbEcsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEWSxhQUE5RCxNQUFpRixLQUFyRixFQUE0RjtBQUMxRixVQUFJdVIsT0FBTyxHQUFHek8sS0FBSyxDQUFDZixJQUFOLENBQVc1RyxJQUF6QjtBQUNBLFVBQUl3VyxHQUFHLEdBQUc3TyxLQUFLLENBQUNmLElBQU4sQ0FBVzBQLEVBQXJCOztBQUVBLFVBQUlHLFFBQVEsR0FBRyxLQUFLOVEsVUFBTCxFQUFmOztBQUVBLFVBQUksS0FBS2hELGNBQUwsQ0FBb0I4VCxRQUFwQixFQUE4Qm5YLFNBQTlCLElBQTJDa1gsR0FBL0MsRUFBb0Q7QUFDbEQsWUFBSSxLQUFLN1QsY0FBTCxDQUFvQjhULFFBQXBCLEVBQThCL1YsY0FBOUIsSUFBZ0QsSUFBcEQsRUFBMEQ7QUFDeEQsZUFBS2lDLGNBQUwsQ0FBb0I4VCxRQUFwQixFQUE4QjlWLFVBQTlCLElBQTRDeVYsT0FBNUM7QUFDRDs7QUFFRCxhQUFLelQsY0FBTCxDQUFvQjhULFFBQXBCLEVBQThCelcsSUFBOUIsSUFBc0NvVyxPQUF0QztBQUNBM1UsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNGLFNBQTFELENBQW9FLGtDQUFrQzZMLE9BQWxDLEdBQTRDLHFCQUFoSCxFQUF1SSxJQUF2STtBQUNBM1UsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEUwQixpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUs3RSxjQUFMLENBQW9COFQsUUFBcEIsQ0FBbkg7QUFDRDtBQUNGO0FBQ0YsR0ExbUV3QjtBQTRtRXpCO0FBRUE7QUFDQUMsRUFBQUEsdUJBL21FeUIsbUNBK21FRG5ULE1BL21FQyxFQSttRU87QUFDOUJ6QixJQUFBQSxrQkFBa0IsR0FBR3lCLE1BQXJCO0FBQ0EsU0FBS1osY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUNwRSxpQkFBckMsQ0FBdURqQixpQkFBdkQsR0FBMkVxRCxrQkFBM0U7QUFDRCxHQWxuRXdCO0FBb25FekI2VSxFQUFBQSxxQkFwbkV5QixpQ0FvbkVIcFQsTUFwbkVHLEVBb25FSztBQUM1QnhCLElBQUFBLGdCQUFnQixHQUFHd0IsTUFBbkI7QUFDQSxTQUFLWixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RFosa0JBQXZELEdBQTRFaUQsZ0JBQTVFO0FBQ0QsR0F2bkV3QjtBQXluRXpCeUksRUFBQUEsa0JBem5FeUIsOEJBeW5FTmpILE1Bem5FTSxFQXluRUU7QUFDekJ2QixJQUFBQSxhQUFhLEdBQUd1QixNQUFoQjtBQUNBLFNBQUtaLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDcEUsaUJBQXJDLENBQXVEaEIsWUFBdkQsR0FBc0VzRCxhQUF0RTtBQUNELEdBNW5Fd0I7QUE4bkV6QmlVLEVBQUFBLHNCQTluRXlCLGtDQThuRUYxUyxNQTluRUUsRUE4bkVNO0FBQzdCdEIsSUFBQUEsZUFBZSxHQUFHc0IsTUFBbEI7QUFDQSxTQUFLWixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RGYsY0FBdkQsR0FBd0VzRCxlQUF4RTtBQUNELEdBam9Fd0I7QUFtb0V6QjJVLEVBQUFBLDBCQW5vRXlCLHNDQW1vRUVyVCxNQW5vRUYsRUFtb0VVO0FBQ2pDckIsSUFBQUEsaUJBQWlCLEdBQUdxQixNQUFwQjtBQUNBLFNBQUtaLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDcEUsaUJBQXJDLENBQXVEZCxnQkFBdkQsR0FBMEVzRCxpQkFBMUU7QUFDRCxHQXRvRXdCO0FBd29FekIyVSxFQUFBQSwrQkF4b0V5QiwyQ0F3b0VPdFQsTUF4b0VQLEVBd29FZTtBQUN0Q3BCLElBQUFBLGlCQUFpQixHQUFHb0IsTUFBcEI7QUFDQSxTQUFLWixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3BFLGlCQUFyQyxDQUF1RGIsZ0JBQXZELEdBQTBFc0QsaUJBQTFFO0FBQ0QsR0Ezb0V3QjtBQTZvRXpCNEgsRUFBQUEsa0JBN29FeUIsOEJBNm9FTnhHLE1BN29FTSxFQTZvRUU7QUFDekJsQixJQUFBQSxjQUFjLEdBQUdrQixNQUFqQjtBQUNELEdBL29Fd0I7QUFpcEV6QnVULEVBQUFBLGtCQWpwRXlCLGdDQWlwRUo7QUFDbkIsV0FBT3pVLGNBQVA7QUFDRCxHQW5wRXdCO0FBcXBFekIwVSxFQUFBQSxxQkFycEV5QixtQ0FxcEVEO0FBQ3RCLFFBQUlDLFdBQVcsR0FBRyxDQUFDLENBQW5COztBQUNBLFFBQUksS0FBS3JVLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDM0QsZUFBckMsR0FBdUQsQ0FBM0QsRUFBOEQ7QUFDNUQ2VyxNQUFBQSxXQUFXLEdBQUcsS0FBS3JVLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDM0QsZUFBbkQ7QUFDQSxXQUFLd0MsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUMzRCxlQUFyQyxHQUF1RCxDQUF2RDtBQUNELEtBSEQsTUFHTztBQUNMNlcsTUFBQUEsV0FBVyxHQUFHLENBQWQ7QUFDRDs7QUFFRCxXQUFPQSxXQUFQO0FBQ0QsR0EvcEV3QjtBQWlxRXpCQyxFQUFBQSxzQkFqcUV5QixrQ0FpcUVGQyxXQWpxRUUsRUFpcUVXO0FBQ2xDLFFBQUlDLGdCQUFnQixHQUFHLENBQUMsQ0FBeEI7O0FBQ0EsUUFBSSxLQUFLeFUsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUMzRCxlQUFyQyxHQUF1RCxDQUEzRCxFQUE4RDtBQUM1RGdYLE1BQUFBLGdCQUFnQixHQUFHLEtBQUt4VSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzNELGVBQXJDLElBQXdEK1csV0FBM0U7QUFDRCxLQUZELE1BRU87QUFDTEMsTUFBQUEsZ0JBQWdCLEdBQUcsQ0FBbkI7QUFDRDs7QUFFRCxXQUFPQSxnQkFBUDtBQUNELEdBMXFFd0I7QUE0cUV6QkMsRUFBQUEsaUJBNXFFeUIsNkJBNHFFUEMsT0E1cUVPLEVBNHFFRTtBQUN6QixRQUFJakIsT0FBTyxHQUFHLENBQUMsQ0FBZjs7QUFDQSxRQUFJLEtBQUt6VCxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzNELGVBQXJDLEdBQXVELENBQTNELEVBQThEO0FBQzVEa1gsTUFBQUEsT0FBTyxHQUFHQSxPQUFPLEdBQUcsR0FBcEI7QUFDQWpCLE1BQUFBLE9BQU8sR0FBRyxLQUFLelQsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUMzRCxlQUFyQyxJQUF3RGtYLE9BQWxFO0FBQ0EsV0FBSzFVLGNBQUwsQ0FBb0IsS0FBS21CLFVBQXpCLEVBQXFDM0QsZUFBckMsR0FBdUQsQ0FBdkQ7QUFDQSxXQUFLd0MsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUFyQyxJQUE2Q29XLE9BQTdDO0FBQ0QsS0FMRCxNQUtPO0FBQ0xBLE1BQUFBLE9BQU8sR0FBRyxDQUFWO0FBQ0Q7O0FBRUQsV0FBT0EsT0FBUDtBQUNELEdBeHJFd0I7QUEwckV6QmtCLEVBQUFBLDJCQTFyRXlCLHlDQTByRUs7QUFDNUIsUUFBSTVULElBQUksR0FBRyxDQUFDLENBQVo7O0FBQ0EsUUFBSTlILG1CQUFtQixDQUFDeUosTUFBcEIsR0FBNkIsQ0FBakMsRUFBb0M7QUFDbEMsVUFBSXZKLDBCQUEwQixHQUFHRixtQkFBbUIsQ0FBQ3lKLE1BQXJELEVBQTZEO0FBQzNEM0IsUUFBQUEsSUFBSSxHQUFHOUgsbUJBQW1CLENBQUNFLDBCQUFELENBQTFCO0FBQ0FBLFFBQUFBLDBCQUEwQjtBQUMzQixPQUhELE1BR087QUFDTCxhQUFLeWIsbUNBQUw7QUFDRDtBQUNGLEtBUEQsTUFPTztBQUNMLFdBQUtBLG1DQUFMO0FBQ0Q7O0FBQ0QsV0FBTzdULElBQVA7QUFDRCxHQXZzRXdCO0FBeXNFekI4VCxFQUFBQSw4QkF6c0V5Qiw0Q0F5c0VRO0FBQy9CLFFBQUk5VCxJQUFJLEdBQUcsQ0FBQyxDQUFaOztBQUNBLFFBQUk3SCxzQkFBc0IsQ0FBQ3dKLE1BQXZCLEdBQWdDLENBQXBDLEVBQXVDO0FBQ3JDLFVBQUl0Siw2QkFBNkIsR0FBR0Ysc0JBQXNCLENBQUN3SixNQUEzRCxFQUFtRTtBQUNqRTNCLFFBQUFBLElBQUksR0FBRzdILHNCQUFzQixDQUFDRSw2QkFBRCxDQUE3QjtBQUNBQSxRQUFBQSw2QkFBNkI7QUFDOUIsT0FIRCxNQUdPO0FBQ0wsYUFBSzBiLHNDQUFMO0FBQ0Q7QUFDRixLQVBELE1BT087QUFDTCxXQUFLQSxzQ0FBTDtBQUNEOztBQUNELFdBQU8vVCxJQUFQO0FBQ0QsR0F0dEV3QjtBQXd0RXpCNlQsRUFBQUEsbUNBeHRFeUIsK0NBd3RFVzVQLEtBeHRFWCxFQXd0RXlCO0FBQUEsUUFBZEEsS0FBYztBQUFkQSxNQUFBQSxLQUFjLEdBQU4sSUFBTTtBQUFBOztBQUNoRCxRQUFJQSxLQUFLLElBQUksSUFBYixFQUFtQjtBQUNqQi9MLE1BQUFBLG1CQUFtQixHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsRUFBL0IsRUFBbUMsRUFBbkMsQ0FBdEI7QUFFQUEsTUFBQUEsbUJBQW1CLENBQUM4UyxJQUFwQixDQUF5QjtBQUFBLGVBQU0sTUFBTUMsSUFBSSxDQUFDQyxNQUFMLEVBQVo7QUFBQSxPQUF6QjtBQUVBckssTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk1SSxtQkFBWjtBQUNBRSxNQUFBQSwwQkFBMEIsR0FBRyxDQUE3QjtBQUVBLFVBQUkrUyxTQUFTLEdBQUc7QUFBRTZJLFFBQUFBLFFBQVEsRUFBRTliLG1CQUFaO0FBQWlDK2IsUUFBQUEsUUFBUSxFQUFFO0FBQTNDLE9BQWhCO0FBQ0FsVyxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDdUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RWdILFNBQTlFO0FBQ0QsS0FWRCxNQVVPO0FBQ0wsVUFBSWxILEtBQUssQ0FBQytQLFFBQU4sSUFBa0IsSUFBdEIsRUFBNEI7QUFDMUI5YixRQUFBQSxtQkFBbUIsR0FBRytMLEtBQUssQ0FBQytQLFFBQTVCO0FBQ0FuVCxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTVJLG1CQUFaO0FBQ0FFLFFBQUFBLDBCQUEwQixHQUFHLENBQTdCO0FBQ0Q7QUFDRjtBQUNGLEdBMXVFd0I7QUE0dUV6QjJiLEVBQUFBLHNDQTV1RXlCLGtEQTR1RWM5UCxLQTV1RWQsRUE0dUU0QjtBQUFBLFFBQWRBLEtBQWM7QUFBZEEsTUFBQUEsS0FBYyxHQUFOLElBQU07QUFBQTs7QUFDbkQsUUFBSUEsS0FBSyxJQUFJLElBQWIsRUFBbUI7QUFDakI5TCxNQUFBQSxzQkFBc0IsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLEVBQS9CLEVBQW1DLEVBQW5DLENBQXpCO0FBRUFBLE1BQUFBLHNCQUFzQixDQUFDNlMsSUFBdkIsQ0FBNEI7QUFBQSxlQUFNLE1BQU1DLElBQUksQ0FBQ0MsTUFBTCxFQUFaO0FBQUEsT0FBNUI7QUFFQXJLLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZM0ksc0JBQVo7QUFDQUUsTUFBQUEsNkJBQTZCLEdBQUcsQ0FBaEM7QUFFQSxVQUFJOFMsU0FBUyxHQUFHO0FBQUU2SSxRQUFBQSxRQUFRLEVBQUUsSUFBWjtBQUFrQkMsUUFBQUEsUUFBUSxFQUFFOWI7QUFBNUIsT0FBaEI7QUFDQTRGLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0N1RSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFZ0gsU0FBOUU7QUFDRCxLQVZELE1BVU87QUFDTCxVQUFJbEgsS0FBSyxDQUFDZ1EsUUFBTixJQUFrQixJQUF0QixFQUE0QjtBQUMxQjliLFFBQUFBLHNCQUFzQixHQUFHOEwsS0FBSyxDQUFDZ1EsUUFBL0I7QUFDQXBULFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZM0ksc0JBQVo7QUFDQUUsUUFBQUEsNkJBQTZCLEdBQUcsQ0FBaEM7QUFDRDtBQUNGO0FBQ0YsR0E5dkV3QjtBQWd3RXpCNmIsRUFBQUEsbUNBaHdFeUIsK0NBZ3dFV2pRLEtBaHdFWCxFQWd3RWtCO0FBQ3pDLFFBQUlrUSxZQUFZLEdBQUdwVyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDeVUsaUJBQWxDLEVBQW5COztBQUNBLFFBQUlDLE9BQU8sR0FBR3BRLEtBQUssQ0FBQ3FRLE1BQXBCO0FBQ0EsUUFBSUMsY0FBYyxHQUFHdFEsS0FBSyxDQUFDdVEsUUFBM0I7QUFDQSxRQUFJaEksWUFBWSxHQUFHdkksS0FBSyxDQUFDd1EsU0FBekI7QUFDQSxRQUFJQyxNQUFNLEdBQUd6USxLQUFLLENBQUMwUSxLQUFuQjs7QUFDQSxRQUFJQyxrQkFBa0IsR0FBRzdXLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsRUFBekI7O0FBRUEsUUFBSW1ULE1BQUosRUFBWTtBQUNWdGMsTUFBQUEsMEJBQTBCO0FBQzNCLEtBRkQsTUFFTztBQUNMQyxNQUFBQSw2QkFBNkI7QUFDOUI7O0FBRUQsUUFBSWdjLE9BQU8sSUFBSXRXLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUE3RixDQUErRzFHLFNBQTlILEVBQXlJO0FBQ3ZJaUYsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWjs7QUFFQThULE1BQUFBLGtCQUFrQixDQUFDQyx1Q0FBbkIsQ0FBMkQsSUFBM0Q7O0FBRUEsVUFBSUMsTUFBSjs7QUFDQSxVQUFJSixNQUFKLEVBQVk7QUFDVjdULFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQVo7QUFDQWdVLFFBQUFBLE1BQU0sR0FBR1gsWUFBWSxDQUFDamMsbUJBQWIsQ0FBaUNxYyxjQUFqQyxDQUFUO0FBQ0QsT0FIRCxNQUdPO0FBQ0wxVCxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFaO0FBQ0FnVSxRQUFBQSxNQUFNLEdBQUdYLFlBQVksQ0FBQ2hjLHNCQUFiLENBQW9Db2MsY0FBcEMsQ0FBVDtBQUNEOztBQUVEdGMsTUFBQUEsYUFBYSxHQUFHNmMsTUFBTSxDQUFDQyxhQUF2Qjs7QUFDQSxVQUFJQyxRQUFRLEdBQUcsK0JBQStCLElBQS9CLEdBQXNDLDhDQUF0QyxHQUF1RixJQUF2RixHQUE4RixJQUE5RixHQUFxR0YsTUFBTSxDQUFDTixRQUE1RyxHQUF1SCxJQUF2SCxHQUE4SCxLQUE5SCxHQUFzSU0sTUFBTSxDQUFDRyxPQUE3SSxHQUF1SixJQUF2SixHQUE4SixLQUE5SixHQUFzS0gsTUFBTSxDQUFDSSxPQUE3SyxHQUF1TCxJQUF2TCxHQUE4TCxLQUE5TCxHQUFzTUosTUFBTSxDQUFDSyxPQUE3TSxHQUF1TixJQUF2TixHQUE4TixLQUE5TixHQUFzT0wsTUFBTSxDQUFDTSxPQUE1UCxDQWZ1SSxDQWlCdkk7OztBQUNBUixNQUFBQSxrQkFBa0IsQ0FBQ1Msc0NBQW5CLENBQTBETCxRQUExRDtBQUNEO0FBQ0YsR0FseUV3QjtBQW95RXpCTSxFQUFBQSxtQ0FweUV5QiwrQ0FveUVXQyxXQXB5RVgsRUFveUVnQztBQUFBLFFBQXJCQSxXQUFxQjtBQUFyQkEsTUFBQUEsV0FBcUIsR0FBUCxLQUFPO0FBQUE7O0FBQ3ZELFFBQUlYLGtCQUFrQixHQUFHN1csd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxFQUF6Qjs7QUFDQSxRQUFJaVUsT0FBSjs7QUFDQSxRQUFJQyxTQUFKOztBQUNBLFFBQUksS0FBS2hXLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQWdXLE1BQUFBLFNBQVMsR0FBRzFYLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkV3RixpQkFBN0UsRUFBWjtBQUNBNE8sTUFBQUEsT0FBTyxHQUFHelgsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RkMsaUJBQXZHO0FBQ0QsS0FKRCxNQUlPLElBQUksS0FBSzdDLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakM7QUFDQStWLE1BQUFBLE9BQU8sR0FBRyxLQUFLdlcsY0FBTCxDQUFvQixDQUFwQixDQUFWO0FBQ0F3VyxNQUFBQSxTQUFTLEdBQUcsS0FBS3hXLGNBQWpCO0FBQ0Q7O0FBQ0QyVixJQUFBQSxrQkFBa0IsQ0FBQ2Msb0NBQW5CLENBQXdELElBQXhEOztBQUNBZCxJQUFBQSxrQkFBa0IsQ0FBQ2UsbUNBQW5COztBQUNBZixJQUFBQSxrQkFBa0IsQ0FBQ2dCLG1DQUFuQixDQUF1REosT0FBdkQsRUFBZ0VDLFNBQWhFLEVBQTJFRixXQUEzRSxFQUF3RixLQUFLOVYsWUFBN0Y7QUFDRCxHQXB6RXdCO0FBc3pFekJvVyxFQUFBQSw0Q0F0ekV5Qix3REFzekVvQkMsS0F0ekVwQixFQXN6RWtDO0FBQUEsUUFBZEEsS0FBYztBQUFkQSxNQUFBQSxLQUFjLEdBQU4sSUFBTTtBQUFBOztBQUN6RCxRQUFJTixPQUFPLEdBQUd6WCx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBM0c7O0FBQ0EsUUFBSXNTLGtCQUFrQixHQUFHN1csd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxFQUF6Qjs7QUFDQSxRQUFJd1UsVUFBVSxHQUFHNUwsUUFBUSxDQUFDMkwsS0FBSyxDQUFDRSxhQUFOLENBQW9CemMsSUFBcEIsQ0FBeUIwYyxLQUF6QixDQUErQixHQUEvQixFQUFvQyxDQUFwQyxDQUFELENBQXpCOztBQUVBcFYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQXNCaVYsVUFBbEM7QUFDQWxWLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFvQjdJLGFBQWhDOztBQUNBLFFBQUk4ZCxVQUFVLElBQUk5ZCxhQUFsQixFQUFpQztBQUMvQjhGLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERzRixTQUExRCxDQUFvRSwyQkFBcEUsRUFBaUcsSUFBakc7O0FBQ0ErTixNQUFBQSxrQkFBa0IsQ0FBQ0MsdUNBQW5CLENBQTJELEtBQTNEOztBQUNBLFdBQUtxQiw4QkFBTCxDQUFvQyxLQUFwQyxFQUEyQyxJQUEzQyxFQUFpRCxDQUFDLENBQWxELEVBQXFEVixPQUFPLENBQUM1WixTQUE3RDtBQUNELEtBSkQsTUFJTztBQUNMLFVBQUk0WixPQUFPLENBQUNsWixJQUFSLElBQWdCLElBQXBCLEVBQTBCO0FBQ3hCLGFBQUssSUFBSWtHLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUt2RCxjQUFMLENBQW9CMEMsTUFBaEQsRUFBd0RhLEtBQUssRUFBN0QsRUFBaUU7QUFDL0QsY0FBSWdULE9BQU8sQ0FBQzVaLFNBQVIsSUFBcUIsS0FBS3FELGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQjVHLFNBQXBELEVBQStEO0FBQzdELGlCQUFLcUQsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCbEcsSUFBM0IsSUFBbUMsSUFBbkM7QUFDQXlCLFlBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFMEIsaUJBQTVFLENBQThGLG1CQUE5RixFQUFtSCxLQUFLN0UsY0FBTCxDQUFvQnVELEtBQXBCLENBQW5IO0FBQ0E7QUFDRDtBQUNGOztBQUVEekUsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNGLFNBQTFELENBQW9FLCtEQUFwRSxFQUFxSSxJQUFySTs7QUFDQStOLFFBQUFBLGtCQUFrQixDQUFDQyx1Q0FBbkIsQ0FBMkQsS0FBM0Q7O0FBQ0EsYUFBS3FCLDhCQUFMLENBQW9DLElBQXBDLEVBQTBDLEtBQTFDLEVBQWlELENBQUMsQ0FBbEQsRUFBcURWLE9BQU8sQ0FBQzVaLFNBQTdEO0FBQ0QsT0FaRCxNQVlPO0FBQ0xtQyxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEc0YsU0FBMUQsQ0FBb0UsK0NBQXBFOztBQUNBK04sUUFBQUEsa0JBQWtCLENBQUNDLHVDQUFuQixDQUEyRCxLQUEzRDs7QUFDQSxhQUFLcUIsOEJBQUwsQ0FBb0MsS0FBcEMsRUFBMkMsS0FBM0MsRUFBa0QsQ0FBbEQsRUFBcURWLE9BQU8sQ0FBQzVaLFNBQTdELEVBSEssQ0FJTDtBQUNEO0FBQ0Y7QUFDRixHQXIxRXdCO0FBdTFFekI7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQXVhLEVBQUFBLDBDQXAzRXlCLHNEQW8zRWtCWixXQXAzRWxCLEVBbzNFdUM7QUFBQSxRQUFyQkEsV0FBcUI7QUFBckJBLE1BQUFBLFdBQXFCLEdBQVAsS0FBTztBQUFBOztBQUM5RCxRQUFJWCxrQkFBa0IsR0FBRzdXLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsRUFBekI7O0FBQ0EsUUFBSWlVLE9BQUo7O0FBQ0EsUUFBSUMsU0FBSjs7QUFDQSxRQUFJLEtBQUtoVyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0FnVyxNQUFBQSxTQUFTLEdBQUcxWCx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFd0YsaUJBQTdFLEVBQVo7QUFDQTRPLE1BQUFBLE9BQU8sR0FBR3pYLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUF2RztBQUNELEtBSkQsTUFJTyxJQUFJLEtBQUs3QyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDO0FBQ0ErVixNQUFBQSxPQUFPLEdBQUcsS0FBS3ZXLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBVjtBQUNBd1csTUFBQUEsU0FBUyxHQUFHLEtBQUt4VyxjQUFqQjtBQUNEOztBQUNEMlYsSUFBQUEsa0JBQWtCLENBQUN3QixrQ0FBbkIsQ0FBc0QsSUFBdEQ7O0FBQ0F4QixJQUFBQSxrQkFBa0IsQ0FBQ3lCLHNDQUFuQjs7QUFDQXpCLElBQUFBLGtCQUFrQixDQUFDMEIsc0NBQW5CLENBQTBEZCxPQUExRCxFQUFtRUMsU0FBbkUsRUFBOEVGLFdBQTlFLEVBQTJGLEtBQUs5VixZQUFoRztBQUNELEdBcDRFd0I7QUFzNEV6QjhXLEVBQUFBLDRDQXQ0RXlCLHdEQXM0RW9CaEIsV0F0NEVwQixFQXM0RXlDO0FBQUEsUUFBckJBLFdBQXFCO0FBQXJCQSxNQUFBQSxXQUFxQixHQUFQLEtBQU87QUFBQTs7QUFDaEUsUUFBSVgsa0JBQWtCLEdBQUc3Vyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEVBQXpCOztBQUNBLFFBQUlpVSxPQUFKOztBQUNBLFFBQUlDLFNBQUo7O0FBQ0EsUUFBSSxLQUFLaFcsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQjtBQUNBZ1csTUFBQUEsU0FBUyxHQUFHMVgsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThEYSxZQUE5RCxHQUE2RXdGLGlCQUE3RSxFQUFaO0FBQ0E0TyxNQUFBQSxPQUFPLEdBQUd6WCx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBdkc7QUFDRCxLQUpELE1BSU8sSUFBSSxLQUFLN0MsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUNqQztBQUNBK1YsTUFBQUEsT0FBTyxHQUFHLEtBQUt2VyxjQUFMLENBQW9CLENBQXBCLENBQVY7QUFDQXdXLE1BQUFBLFNBQVMsR0FBRyxLQUFLeFcsY0FBakI7QUFDRDs7QUFDRDJWLElBQUFBLGtCQUFrQixDQUFDNEIsaUNBQW5CLENBQXFELElBQXJEOztBQUNBNUIsSUFBQUEsa0JBQWtCLENBQUM2QixxQ0FBbkI7O0FBQ0E3QixJQUFBQSxrQkFBa0IsQ0FBQzhCLHFDQUFuQixDQUF5RGxCLE9BQXpELEVBQWtFQyxTQUFsRSxFQUE2RUYsV0FBN0UsRUFBMEYsS0FBSzlWLFlBQS9GO0FBQ0QsR0F0NUV3QjtBQXc1RXpCa1gsRUFBQUEsbURBeDVFeUIsK0RBdzVFMkJwQixXQXg1RTNCLEVBdzVFZ0Q7QUFBQSxRQUFyQkEsV0FBcUI7QUFBckJBLE1BQUFBLFdBQXFCLEdBQVAsS0FBTztBQUFBOztBQUN2RSxRQUFJWCxrQkFBa0IsR0FBRzdXLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsRUFBekI7O0FBQ0EsUUFBSWlVLE9BQUo7O0FBQ0EsUUFBSUMsU0FBSjs7QUFDQSxRQUFJLEtBQUtoVyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0FnVyxNQUFBQSxTQUFTLEdBQUcxWCx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFd0YsaUJBQTdFLEVBQVo7QUFDQTRPLE1BQUFBLE9BQU8sR0FBR3pYLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUF2RztBQUNELEtBSkQsTUFJTyxJQUFJLEtBQUs3QyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ2pDO0FBQ0ErVixNQUFBQSxPQUFPLEdBQUcsS0FBS3ZXLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBVjtBQUNBd1csTUFBQUEsU0FBUyxHQUFHLEtBQUt4VyxjQUFqQjtBQUNEOztBQUVEMlYsSUFBQUEsa0JBQWtCLENBQUM0QixpQ0FBbkIsQ0FBcUQsSUFBckQ7O0FBQ0E1QixJQUFBQSxrQkFBa0IsQ0FBQzZCLHFDQUFuQjs7QUFDQTdCLElBQUFBLGtCQUFrQixDQUFDOEIscUNBQW5CLENBQXlEbEIsT0FBekQsRUFBa0VDLFNBQWxFLEVBQTZFRixXQUE3RSxFQUEwRixLQUFLOVYsWUFBL0YsRUFBNkcsSUFBN0c7QUFDRCxHQXo2RXdCO0FBMjZFekJtWCxFQUFBQSx1REEzNkV5QixtRUEyNkUrQnJCLFdBMzZFL0IsRUEyNkVvRDtBQUFBLFFBQXJCQSxXQUFxQjtBQUFyQkEsTUFBQUEsV0FBcUIsR0FBUCxLQUFPO0FBQUE7O0FBQzNFLFFBQUlYLGtCQUFrQixHQUFHN1csd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxFQUF6Qjs7QUFDQSxRQUFJaVUsT0FBSjs7QUFDQSxRQUFJQyxTQUFKOztBQUNBLFFBQUksS0FBS2hXLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQWdXLE1BQUFBLFNBQVMsR0FBRzFYLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkV3RixpQkFBN0UsRUFBWjtBQUNBNE8sTUFBQUEsT0FBTyxHQUFHelgsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RkMsaUJBQXZHO0FBQ0QsS0FKRCxNQUlPLElBQUksS0FBSzdDLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDakM7QUFDQStWLE1BQUFBLE9BQU8sR0FBRyxLQUFLdlcsY0FBTCxDQUFvQixDQUFwQixDQUFWO0FBQ0F3VyxNQUFBQSxTQUFTLEdBQUcsS0FBS3hXLGNBQWpCO0FBQ0Q7O0FBQ0QyVixJQUFBQSxrQkFBa0IsQ0FBQ2lDLGlDQUFuQixDQUFxRCxJQUFyRDs7QUFDQWpDLElBQUFBLGtCQUFrQixDQUFDa0MscUNBQW5COztBQUNBbEMsSUFBQUEsa0JBQWtCLENBQUNtQyxxQ0FBbkIsQ0FBeUR2QixPQUF6RCxFQUFrRUMsU0FBbEUsRUFBNkVGLFdBQTdFLEVBQTBGLEtBQUs5VixZQUEvRjtBQUNELEdBMzdFd0I7QUE2N0V6QnVYLEVBQUFBLDBEQTc3RXlCLHNFQTY3RWtDL1MsS0E3N0VsQyxFQTY3RXlDO0FBQ2hFLFFBQUlnVCxNQUFNLEdBQUdoVCxLQUFLLENBQUNxUSxNQUFOLENBQWFsRyxRQUFiLEVBQWI7O0FBQ0EsUUFBSTVCLFlBQVksR0FBR3JDLFFBQVEsQ0FBQ2xHLEtBQUssQ0FBQ3dRLFNBQVAsQ0FBM0I7O0FBQ0EsUUFBSXlDLFdBQVcsR0FBR2pULEtBQUssQ0FBQ2tULFFBQXhCOztBQUNBLFFBQUlDLFNBQVMsR0FBR25ULEtBQUssQ0FBQ29ULFdBQU4sQ0FBa0JqSixRQUFsQixFQUFoQjs7QUFDQSxRQUFJd0csa0JBQWtCLEdBQUc3Vyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEVBQXpCOztBQUNBLFFBQUkwVixNQUFNLElBQUlsWix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGYSxJQUE3RixDQUFrR1csTUFBaEgsRUFBd0g7QUFDdEhoRCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBcUJvVyxXQUFqQzs7QUFFQSxXQUFLLElBQUkxVSxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLdkQsY0FBTCxDQUFvQjBDLE1BQWhELEVBQXdEYSxLQUFLLEVBQTdELEVBQWlFO0FBQy9ELFlBQUksS0FBS3ZELGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQjVHLFNBQTNCLElBQXdDcWIsTUFBNUMsRUFBb0Q7QUFDbEQsZUFBS2hZLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQi9FLHFCQUEzQixHQUFtRCxJQUFuRDtBQUNBLGVBQUt3QixjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkI5RSxxQkFBM0IsR0FBbUQwWixTQUFuRDtBQUVBclosVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEUwQixpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUs3RSxjQUFMLENBQW9CdUQsS0FBcEIsQ0FBbkg7QUFDQXpFLFVBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RGEsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGeUMsaUJBQXRGLENBQXdHLGdCQUF4RyxFQUEwSCxLQUFLN0UsY0FBL0gsRUFBK0ksSUFBL0k7O0FBQ0EyVixVQUFBQSxrQkFBa0IsQ0FBQy9OLFNBQW5CLENBQTZCLFlBQVlxUSxXQUFaLEdBQTBCLDZDQUF2RCxFQUFzRyxJQUF0Rzs7QUFDQTtBQUNEO0FBQ0Y7QUFDRjtBQUNGLEdBbDlFd0I7QUFvOUV6QmhCLEVBQUFBLDhCQXA5RXlCLDBDQW85RU1vQixlQXA5RU4sRUFvOUV1QkMsb0JBcDlFdkIsRUFvOUU2Q2hELGNBcDlFN0MsRUFvOUU2RGlELE9BcDlFN0QsRUFvOUVzRTtBQUM3RixRQUFJdlQsS0FBSyxHQUFHO0FBQUV3VCxNQUFBQSxXQUFXLEVBQUVILGVBQWY7QUFBZ0NJLE1BQUFBLGdCQUFnQixFQUFFSCxvQkFBbEQ7QUFBd0VJLE1BQUFBLGFBQWEsRUFBRXBELGNBQXZGO0FBQXVHM0IsTUFBQUEsRUFBRSxFQUFFNEU7QUFBM0csS0FBWjtBQUNBelosSUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ3VFLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNkVGLEtBQTdFO0FBQ0QsR0F2OUV3QjtBQXk5RXpCMlQsRUFBQUEsNEJBejlFeUIsd0NBeTlFSWxGLE9BejlFSixFQXk5RWE7QUFDcEMsUUFBSTNVLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RFksYUFBOUQsTUFBaUYsS0FBckYsRUFBNEY7QUFDMUYsVUFBSTRSLFFBQVEsR0FBRyxLQUFLOVEsVUFBTCxFQUFmOztBQUVBLFVBQUksS0FBS2hELGNBQUwsQ0FBb0I4VCxRQUFwQixFQUE4QnpXLElBQTlCLElBQXNDb1csT0FBMUMsRUFBbUQ7QUFDakQsYUFBS3pULGNBQUwsQ0FBb0I4VCxRQUFwQixFQUE4QnpXLElBQTlCLElBQXNDb1csT0FBdEM7QUFDRCxPQUZELE1BRU8sSUFBSSxLQUFLelQsY0FBTCxDQUFvQjhULFFBQXBCLEVBQThCelcsSUFBOUIsR0FBcUNvVyxPQUF6QyxFQUFrRDtBQUN2RCxhQUFLelQsY0FBTCxDQUFvQjhULFFBQXBCLEVBQThCelcsSUFBOUIsR0FBcUMsQ0FBckM7QUFDRDs7QUFFRHlCLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFMEIsaUJBQTVFLENBQThGLG1CQUE5RixFQUFtSCxLQUFLN0UsY0FBTCxDQUFvQjhULFFBQXBCLENBQW5IO0FBQ0Q7QUFDRixHQXIrRXdCO0FBdStFekI4RSxFQUFBQSx5QkF2K0V5QixxQ0F1K0VDNVQsS0F2K0VELEVBdStFUTtBQUMvQixRQUFJeU8sT0FBTyxHQUFHek8sS0FBSyxDQUFDdU0sTUFBcEI7QUFDQSxRQUFJc0gsR0FBRyxHQUFHN1QsS0FBSyxDQUFDMk8sRUFBaEI7QUFDQSxRQUFJbUYsSUFBSSxHQUFHOVQsS0FBSyxDQUFDK1QsR0FBakI7QUFFQSxRQUFJQyxJQUFJLEdBQUdsYSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERDLGVBQTlELEVBQVg7O0FBQ0EsUUFBSXlYLElBQUksSUFBSSxDQUFaLEVBQWU7QUFDYixVQUFJOVYsTUFBTSxHQUFHcEUsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RkMsaUJBQTFHOztBQUVBLFVBQUl2RSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERZLGFBQTlELE1BQWlGLEtBQXJGLEVBQTRGO0FBQzFGLFlBQUk0UixRQUFRLEdBQUcsS0FBSzlRLFVBQUwsRUFBZjs7QUFDQSxZQUFJRSxNQUFNLENBQUN2RyxTQUFQLElBQW9Ca2MsR0FBeEIsRUFBNkI7QUFDM0IsZUFBSzdZLGNBQUwsQ0FBb0I4VCxRQUFwQixFQUE4QnpXLElBQTlCLElBQXNDb1csT0FBdEM7QUFDQTNVLFVBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFMEIsaUJBQTVFLENBQThGLG1CQUE5RixFQUFtSCxLQUFLN0UsY0FBTCxDQUFvQjhULFFBQXBCLENBQW5IO0FBQ0FoVixVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEc0YsU0FBMUQsQ0FBb0VrUixJQUFwRTtBQUNEO0FBQ0Y7QUFDRixLQVhELE1BV08sSUFBSUUsSUFBSSxJQUFJLENBQVosRUFBZTtBQUNwQixXQUFLLElBQUl6VixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLdkQsY0FBTCxDQUFvQjBDLE1BQWhELEVBQXdEYSxLQUFLLEVBQTdELEVBQWlFO0FBQy9ELFlBQUksS0FBS3ZELGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQjVHLFNBQTNCLElBQXdDa2MsR0FBeEMsSUFBK0N0VixLQUFLLElBQUksS0FBS3BDLFVBQWpFLEVBQTZFO0FBQzNFLGVBQUtuQixjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJsRyxJQUEzQixJQUFtQ29XLE9BQW5DO0FBQ0EzVSxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEc0YsU0FBMUQsQ0FBb0VrUixJQUFwRTtBQUNEO0FBQ0Y7QUFDRjs7QUFDRCxTQUFLaFIsWUFBTDtBQUNBaEosSUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRDJXLHVCQUExRDtBQUNELEdBbGdGd0I7QUFvZ0Z6QkMsRUFBQUEsZ0NBcGdGeUIsNENBb2dGUWxVLEtBcGdGUixFQW9nRmU7QUFBQTs7QUFDdEMsUUFBSTJRLGtCQUFrQixHQUFHN1csd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxFQUF6Qjs7QUFDQSxRQUFJLEtBQUt0QyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQXJDLElBQWtEbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RmEsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzlKLFVBQUl5VCxlQUFlLEdBQUdyVCxLQUFLLENBQUN3VCxXQUE1QjtBQUNBLFVBQUlGLG9CQUFvQixHQUFHdFQsS0FBSyxDQUFDeVQsZ0JBQWpDO0FBQ0EsVUFBSW5ELGNBQWMsR0FBR3RRLEtBQUssQ0FBQzBULGFBQTNCO0FBQ0EsVUFBSWhGLElBQUksR0FBRzFPLEtBQUssQ0FBQzJPLEVBQWpCOztBQUVBZ0MsTUFBQUEsa0JBQWtCLENBQUNDLHVDQUFuQixDQUEyRCxLQUEzRDs7QUFDQSxVQUFJTixjQUFjLElBQUksQ0FBdEIsRUFBeUI7QUFDdkJ4VyxRQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEc0YsU0FBMUQsQ0FBb0UsOERBQXBFLEVBQW9JLElBQXBJOztBQUNBK04sUUFBQUEsa0JBQWtCLENBQUNjLG9DQUFuQixDQUF3RCxLQUF4RDs7QUFDQSxhQUFLdkosZ0JBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJbUwsZUFBSixFQUFxQjtBQUNuQnZaLFVBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMEQ2VyxzQ0FBMUQsQ0FBaUcsS0FBakc7QUFDQSxlQUFLblosY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUFyQyxJQUE2QyxJQUE3QztBQUNBeUIsVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNGLFNBQTFELENBQW9FLDJEQUFwRSxFQUFpSSxJQUFqSTs7QUFDQStOLFVBQUFBLGtCQUFrQixDQUFDYyxvQ0FBbkIsQ0FBd0QsS0FBeEQ7O0FBQ0EsZUFBS3ZKLGdCQUFMO0FBQ0QsU0FORCxNQU1PLElBQUlvTCxvQkFBSixFQUEwQjtBQUMvQixjQUFJYyxvQkFBb0IsR0FBRyxDQUEzQjs7QUFDQSxjQUFJQyxXQUFXLEdBQUd2YSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOERhLFlBQTlELEdBQTZFd0YsaUJBQTdFLEVBQWxCOztBQUVBLGVBQUssSUFBSXBFLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHOFYsV0FBVyxDQUFDM1csTUFBeEMsRUFBZ0RhLEtBQUssRUFBckQsRUFBeUQ7QUFDdkQsZ0JBQUltUSxJQUFJLElBQUkyRixXQUFXLENBQUM5VixLQUFELENBQVgsQ0FBbUJILGdCQUFuQixDQUFvQ0MsaUJBQXBDLENBQXNEMUcsU0FBbEUsRUFBNkU7QUFDM0V5YyxjQUFBQSxvQkFBb0IsR0FBRzdWLEtBQXZCO0FBQ0E7QUFDRDtBQUNGOztBQUVEekUsVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNGLFNBQTFELENBQW9FLHdEQUFwRSxFQUE4SCxJQUE5SCxFQVgrQixDQWEvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQXJDLFVBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2ZvUSxZQUFBQSxrQkFBa0IsQ0FBQ2Msb0NBQW5CLENBQXdELEtBQXhEOztBQUNBLFlBQUEsT0FBSSxDQUFDdkosZ0JBQUw7QUFDRCxXQUhTLEVBR1AsR0FITyxDQUFWO0FBSUQ7QUFDRjtBQUNGO0FBQ0YsR0F6bEZ3QjtBQTJsRnpCb00sRUFBQUEsMENBM2xGeUIsc0RBMmxGa0J0VSxLQTNsRmxCLEVBMmxGeUI7QUFBQTs7QUFDaEQsUUFBSW5HLFVBQVUsSUFBSSxJQUFsQixFQUF3QjtBQUN0QjBHLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsUUFBQSxPQUFJLENBQUMrVCwwQ0FBTCxDQUFnRHRVLEtBQWhEO0FBQ0QsT0FGUyxFQUVQLEdBRk8sQ0FBVjtBQUdELEtBSkQsTUFJTztBQUNMLFVBQUl1VSxPQUFPLEdBQUd2VSxLQUFLLENBQUNmLElBQU4sQ0FBV3VWLFVBQXpCO0FBQ0EsVUFBSXZSLFFBQVEsR0FBR2pELEtBQUssQ0FBQ2YsSUFBTixDQUFXd1YsT0FBMUI7O0FBRUEsVUFBSTNWLE1BQU0sR0FBRy9KLEVBQUUsQ0FBQ2dLLElBQUgsQ0FBUWpGLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NzRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEZ0UsUUFBUSxHQUFHdEksVUFBckUsRUFBaUZ1RSxpQkFBakYsQ0FBbUdDLFFBQW5HLENBQTRHQyxDQUFwSCxFQUF1SHRGLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NzRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEdkYsV0FBMUQsRUFBdUV3RixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHRSxDQUF6TixDQUFiOztBQUNBLFdBQUtxVix3QkFBTCxDQUE4QixLQUFLcFosY0FBTCxDQUFvQixLQUFLYSxVQUF6QixDQUE5QixFQUFvRTJDLE1BQXBFLEVBQTRFLEdBQTVFO0FBRUFwRixNQUFBQSxXQUFXLEdBQUd1SixRQUFkOztBQUNBLFVBQUluRSxNQUFNLEdBQUcvSixFQUFFLENBQUNnSyxJQUFILENBQVFqRix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZGLFdBQTFELEVBQXVFd0YsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0MsQ0FBMUcsRUFBNkd0Rix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZGLFdBQTFELEVBQXVFd0YsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0UsQ0FBL00sQ0FBYjs7QUFDQSxXQUFLcVYsd0JBQUwsQ0FBOEIsS0FBS3BaLGNBQUwsQ0FBb0IsS0FBS2EsVUFBekIsQ0FBOUIsRUFBb0UyQyxNQUFwRTtBQUNEO0FBQ0YsR0EzbUZ3QjtBQTZtRnpCNFYsRUFBQUEsd0JBQXdCLEVBQUUsa0NBQVV2WixJQUFWLEVBQWdCNFEsS0FBaEIsRUFBdUJDLEtBQXZCLEVBQW9DO0FBQUEsUUFBYkEsS0FBYTtBQUFiQSxNQUFBQSxLQUFhLEdBQUwsR0FBSztBQUFBOztBQUM1RGpYLElBQUFBLEVBQUUsQ0FBQ3VXLEtBQUgsQ0FBU25RLElBQVQsRUFDR29RLEVBREgsQ0FDTVMsS0FETixFQUNhO0FBQUU3TSxNQUFBQSxRQUFRLEVBQUVwSyxFQUFFLENBQUN5VyxFQUFILENBQU1PLEtBQUssQ0FBQzNNLENBQVosRUFBZTJNLEtBQUssQ0FBQzFNLENBQXJCO0FBQVosS0FEYixFQUNvRDtBQUFFb00sTUFBQUEsTUFBTSxFQUFFO0FBQVYsS0FEcEQsRUFFR0MsSUFGSCxDQUVRLFlBQU0sQ0FBRSxDQUZoQixFQUdHRSxLQUhIO0FBSUQsR0FsbkZ3QjtBQW9uRnpCK0ksRUFBQUEsK0JBcG5GeUIsNkNBb25GUztBQUNoQ2piLElBQUFBLFdBQVcsSUFBSWlCLFVBQWY7O0FBRUEsUUFBSSxLQUFLYSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFVBQUl3RSxLQUFLLEdBQUc7QUFBRWYsUUFBQUEsSUFBSSxFQUFFO0FBQUV1VixVQUFBQSxVQUFVLEVBQUU3WixVQUFkO0FBQTBCOFosVUFBQUEsT0FBTyxFQUFFL2E7QUFBbkM7QUFBUixPQUFaO0FBQ0FJLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0N1RSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFRixLQUE5RTtBQUNEOztBQUVELFFBQUlsQixNQUFNLEdBQUcvSixFQUFFLENBQUNnSyxJQUFILENBQVFqRix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZGLFdBQTFELEVBQXVFd0YsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0MsQ0FBMUcsRUFBNkd0Rix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHZGLFdBQTFELEVBQXVFd0YsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0UsQ0FBL00sQ0FBYjs7QUFDQSxTQUFLcVYsd0JBQUwsQ0FBOEIsS0FBS3BaLGNBQUwsQ0FBb0IsS0FBS2EsVUFBekIsQ0FBOUIsRUFBb0UyQyxNQUFwRTtBQUNBLFNBQUtvSixnQkFBTDtBQUNELEdBL25Gd0I7QUFpb0Z6QjBNLEVBQUFBLCtDQWpvRnlCLDJEQWlvRnVCNVUsS0Fqb0Z2QixFQWlvRjhCO0FBQ3JELFFBQUksS0FBS3hFLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBSTFCLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYwQyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsS0FBOUgsRUFBcUk7QUFDbkksWUFBSThULEdBQUcsR0FBRzdVLEtBQUssQ0FBQzJPLEVBQWhCO0FBQ0EsWUFBSXBMLFdBQVcsR0FBR3ZELEtBQUssQ0FBQzhVLE1BQXhCO0FBQ0EsWUFBSUMsU0FBUyxHQUFHL1UsS0FBSyxDQUFDZ1YsUUFBdEI7QUFDQSxZQUFJQyxjQUFjLEdBQUdqVixLQUFLLENBQUNrVixhQUEzQjtBQUNBLFlBQUlDLFFBQVEsR0FBR3JiLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUE1Rzs7QUFFQSxZQUFJeVEsUUFBUSxHQUFHLENBQUMsQ0FBaEI7O0FBQ0FsUyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXNZLFFBQVEsQ0FBQ3hkLFNBQXJCO0FBQ0FpRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWWdZLEdBQVo7O0FBRUEsWUFBSU0sUUFBUSxDQUFDeGQsU0FBVCxDQUFtQndTLFFBQW5CLE1BQWlDMEssR0FBRyxDQUFDMUssUUFBSixFQUFyQyxFQUFxRDtBQUNuRCxlQUFLLElBQUk1TCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLdkQsY0FBTCxDQUFvQjBDLE1BQWhELEVBQXdEYSxLQUFLLEVBQTdELEVBQWlFO0FBQy9ELGdCQUFJLEtBQUt2RCxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkI1RyxTQUEzQixJQUF3Q2tkLEdBQTVDLEVBQWlEO0FBQy9DLGtCQUFJLEtBQUs3WixjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ6RyxZQUEzQixDQUF3Q21kLGNBQXhDLEVBQXdEeGYsWUFBeEQsSUFBd0UsQ0FBNUUsRUFBK0U7QUFDN0U7QUFDQSxxQkFBS3VGLGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQnZHLGVBQTNCO0FBQ0QsZUFIRCxNQUdPLElBQUksS0FBS2dELGNBQUwsQ0FBb0J1RCxLQUFwQixFQUEyQnpHLFlBQTNCLENBQXdDbWQsY0FBeEMsRUFBd0R4ZixZQUF4RCxJQUF3RSxDQUE1RSxFQUErRTtBQUNwRjtBQUNBLG9CQUFJMmYsVUFBVSxHQUFHLEtBQUtwYSxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJ6RyxZQUEzQixDQUF3Q21kLGNBQXhDLEVBQXdEemUsYUFBeEQsQ0FBc0VrSCxNQUF2RjtBQUNBLHFCQUFLMUMsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCdEcsb0JBQTNCO0FBQ0EscUJBQUsrQyxjQUFMLENBQW9CdUQsS0FBcEIsRUFBMkJwRyxvQkFBM0IsSUFBbURpZCxVQUFuRDtBQUNEOztBQUVELG1CQUFLcGEsY0FBTCxDQUFvQnVELEtBQXBCLEVBQTJCekcsWUFBM0IsQ0FBd0NzSixNQUF4QyxDQUErQzZULGNBQS9DLEVBQStELENBQS9EO0FBQ0FuRyxjQUFBQSxRQUFRLEdBQUd2USxLQUFYO0FBQ0E7QUFDRDtBQUNGOztBQUVEM0IsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBSzdCLGNBQUwsQ0FBb0I4VCxRQUFwQixDQUFaOztBQUNBLGNBQUlBLFFBQVEsSUFBSSxDQUFDLENBQWpCLEVBQW9CO0FBQ2xCLGdCQUFJLEtBQUs5VCxjQUFMLENBQW9COFQsUUFBcEIsRUFBOEJoWCxZQUE5QixDQUEyQzRGLE1BQTNDLEdBQW9ELENBQXhELEVBQTJEO0FBQ3pEO0FBQ0E1RCxjQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEc0YsU0FBMUQsQ0FBb0UsbUJBQW1CbVMsU0FBUyxDQUFDL2UsWUFBN0IsR0FBNEMsd0RBQWhIO0FBQ0QsYUFIRCxNQUdPO0FBQ0w4RCxjQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEc0YsU0FBMUQsQ0FBb0UsbUJBQW1CbVMsU0FBUyxDQUFDL2UsWUFBN0IsR0FBNEMsc0hBQWhIO0FBQ0EsbUJBQUtnRixjQUFMLENBQW9COFQsUUFBcEIsRUFBOEIvVyxpQkFBOUIsQ0FBZ0RULGtCQUFoRCxHQUFxRSxJQUFyRTtBQUNEOztBQUVEd0MsWUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEUwQixpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUs3RSxjQUFMLENBQW9COFQsUUFBcEIsQ0FBbkg7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGLEdBaHJGd0I7QUFrckZ6QnVHLEVBQUFBLGtDQWxyRnlCLDhDQWtyRlVyVixLQWxyRlYsRUFrckZpQitELE1BbHJGakIsRUFrckZ5QndFLFlBbHJGekIsRUFrckYyQytNLGdCQWxyRjNDLEVBa3JGcUU7QUFBQSxRQUE1Qy9NLFlBQTRDO0FBQTVDQSxNQUFBQSxZQUE0QyxHQUE3QixDQUE2QjtBQUFBOztBQUFBLFFBQTFCK00sZ0JBQTBCO0FBQTFCQSxNQUFBQSxnQkFBMEIsR0FBUCxLQUFPO0FBQUE7O0FBQzVGLFFBQUlQLFNBQVMsR0FBRy9VLEtBQUssQ0FBQ2xJLFlBQU4sQ0FBbUJpTSxNQUFuQixDQUFoQjtBQUNBbkgsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlrWSxTQUFaOztBQUVBLFFBQUlRLFNBQVMsR0FBRyxLQUFLOU8sWUFBTCxFQUFoQjs7QUFDQSxRQUFJK08sbUJBQW1CLEdBQUcsS0FBMUI7O0FBQ0EsUUFBSWxRLE9BQU8sR0FBR2lRLFNBQVMsR0FBR0MsbUJBQTFCOztBQUNBLFFBQUlDLE9BQU8sR0FBRyxJQUFkLENBUDRGLENBUzVGOztBQUNBQSxJQUFBQSxPQUFPLEdBQUcsS0FBS3phLGNBQUwsQ0FBb0J1TixZQUFwQixDQUFWO0FBRUEsUUFBSW1OLFlBQVksR0FBRztBQUFFL0csTUFBQUEsRUFBRSxFQUFFOEcsT0FBTyxDQUFDOWQsU0FBZDtBQUF5Qm1kLE1BQUFBLE1BQU0sRUFBRVcsT0FBakM7QUFBMENULE1BQUFBLFFBQVEsRUFBRUQsU0FBcEQ7QUFBK0RHLE1BQUFBLGFBQWEsRUFBRW5SO0FBQTlFLEtBQW5CO0FBQ0FqSyxJQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDdUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RXdWLFlBQTlFOztBQUVBLFFBQUksQ0FBQ1gsU0FBUyxDQUFDdGUsU0FBZixFQUEwQjtBQUN4QixXQUFLdUUsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUFyQyxJQUE2Q2lOLE9BQTdDO0FBRUF4TCxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEc0YsU0FBMUQsQ0FDRSxPQUFPLGdCQUFQLEdBQTBCMlMsU0FBMUIsR0FBc0MsSUFBdEMsR0FBNkMsSUFBN0MsR0FBb0QsV0FBcEQsR0FBa0VBLFNBQWxFLEdBQThFLEtBQTlFLEdBQXNGQyxtQkFBdEYsR0FBNEcsTUFBNUcsR0FBcUhsUSxPQUFySCxHQUErSCxJQUEvSCxHQUFzSSxJQUF0SSxHQUE2SSxrQkFBN0ksR0FBa0tBLE9BQWxLLEdBQTRLLDREQUE1SyxHQUEyTyxLQUFLdEssY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQURsUjtBQUlBeUIsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHFZLHVDQUExRDtBQUNELEtBUkQsTUFRTztBQUNMLFVBQUlDLFFBQVEsR0FBRyxLQUFLNWEsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUFyQyxHQUE0Q2lOLE9BQTNEOztBQUNBLFVBQUlzUSxRQUFRLElBQUliLFNBQVMsQ0FBQ3JlLFVBQTFCLEVBQXNDO0FBQ3BDa2YsUUFBQUEsUUFBUSxJQUFJYixTQUFTLENBQUNyZSxVQUF0QjtBQUNBLGFBQUtzRSxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzlELElBQXJDLEdBQTRDdWQsUUFBNUM7QUFFQTliLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERzRixTQUExRCxDQUNFLE9BQ0UsZ0JBREYsR0FFRTJTLFNBRkYsR0FHRSxJQUhGLEdBSUUsSUFKRixHQUtFLGlCQUxGLEdBTUVSLFNBQVMsQ0FBQ3JlLFVBTlosR0FPRSxJQVBGLEdBUUUsSUFSRixHQVNFLFdBVEYsR0FVRTZlLFNBVkYsR0FXRSxLQVhGLEdBWUVDLG1CQVpGLEdBYUUsTUFiRixHQWNFbFEsT0FkRixHQWVFLElBZkYsR0FnQkUsSUFoQkYsR0FpQkUscURBakJGLEdBa0JFLEtBQUt0SyxjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQzlELElBbkJ6QztBQXFCQXlCLFFBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERxWSx1Q0FBMUQ7QUFDRCxPQTFCRCxNQTBCTztBQUNMN2IsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNGLFNBQTFELENBQW9FLHNFQUFwRTtBQUNBOUksUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHFZLHVDQUExRDtBQUNEO0FBQ0Y7QUFDRixHQTF1RndCO0FBNHVGekJFLEVBQUFBLDhDQTV1RnlCLDBEQTR1RnNCN1YsS0E1dUZ0QixFQTR1RjZCO0FBQ3BELFFBQUksS0FBS3hFLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUIsVUFBSTFCLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYwQyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBMEgsS0FBOUgsRUFBcUk7QUFDbkksWUFBSThULEdBQUcsR0FBRzdVLEtBQUssQ0FBQzJPLEVBQWhCO0FBQ0EsWUFBSW1ILFdBQVcsR0FBRzlWLEtBQUssQ0FBQy9KLE1BQXhCO0FBQ0EsWUFBSWdmLGNBQWMsR0FBR2pWLEtBQUssQ0FBQ2tWLGFBQTNCO0FBQ0EsWUFBSWEsU0FBUyxHQUFHL1YsS0FBSyxDQUFDZ1csSUFBdEI7QUFDQSxZQUFJQyxXQUFXLEdBQUdqVyxLQUFLLENBQUNrVyxNQUF4QjtBQUNBLFlBQUlmLFFBQVEsR0FBR3JiLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUE1Rzs7QUFDQSxZQUFJeVEsUUFBUSxHQUFHLEtBQUs5USxVQUFMLEVBQWY7O0FBQ0EsWUFBSW1YLFFBQVEsQ0FBQ3hkLFNBQVQsSUFBc0JrZCxHQUFHLENBQUMxSyxRQUFKLEVBQTFCLEVBQTBDO0FBQ3hDLGVBQUtuUCxjQUFMLENBQW9COFQsUUFBcEIsRUFBOEJ6VyxJQUE5QixJQUFzQzZOLFFBQVEsQ0FBQzRQLFdBQUQsQ0FBOUM7QUFDQSxlQUFLOWEsY0FBTCxDQUFvQjhULFFBQXBCLEVBQThCaFgsWUFBOUIsQ0FBMkNtZCxjQUEzQyxFQUEyRDllLGFBQTNELEdBQTJFLElBQTNFO0FBQ0EsZUFBSzZFLGNBQUwsQ0FBb0I4VCxRQUFwQixFQUE4QmhYLFlBQTlCLENBQTJDbWQsY0FBM0MsRUFBMkQzZSxTQUEzRCxHQUF1RXlmLFNBQXZFO0FBQ0EsZUFBSy9hLGNBQUwsQ0FBb0I4VCxRQUFwQixFQUE4QmhYLFlBQTlCLENBQTJDbWQsY0FBM0MsRUFBMkQxZSxXQUEzRCxHQUF5RTBmLFdBQXpFO0FBRUFuYyxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RTBCLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUgsS0FBSzdFLGNBQUwsQ0FBb0I4VCxRQUFwQixDQUFuSDtBQUNBaFYsVUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNGLFNBQTFELENBQW9FcVQsV0FBVyxHQUFHLDZCQUFkLEdBQThDSCxXQUE5QyxHQUE0RCw2Q0FBNUQsR0FBNEcsS0FBSzlhLGNBQUwsQ0FBb0I4VCxRQUFwQixFQUE4QmhYLFlBQTlCLENBQTJDbWQsY0FBM0MsRUFBMkRqZixZQUEzTztBQUNEO0FBQ0Y7QUFDRjtBQUNGLEdBandGd0I7QUFtd0Z6Qm1nQixFQUFBQSwwQ0Fud0Z5QixzREFtd0ZrQm5XLEtBbndGbEIsRUFtd0Z5QjtBQUNoRCxRQUFJLEtBQUt4RSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFVBQUkxQix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGMEMsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILEtBQTlILEVBQXFJO0FBRW5JbE0sUUFBQUEsZUFBZSxHQUFDbUwsS0FBaEI7QUFFQSxZQUFJb1csZUFBZSxHQUFDdmhCLGVBQWUsQ0FBQ2lnQixNQUFwQztBQUNBLFlBQUl1QixvQkFBb0IsR0FBQ3hoQixlQUFlLENBQUN5aEIsV0FBekM7QUFDQSxZQUFJQyxnQkFBZ0IsR0FBQzFoQixlQUFlLENBQUMyaEIsUUFBckM7QUFDQSxZQUFJQyxXQUFXLEdBQUM1aEIsZUFBZSxDQUFDd1IsS0FBaEM7QUFDQSxZQUFJcVEsYUFBYSxHQUFDN2hCLGVBQWUsQ0FBQ3lSLEtBQWxDO0FBQ0EsWUFBSXFRLGVBQWUsR0FBQzloQixlQUFlLENBQUMraEIsTUFBcEM7QUFDQSxZQUFJQyxpQkFBaUIsR0FBQ2hpQixlQUFlLENBQUNpaUIsTUFBdEM7QUFDQSxZQUFJM0IsUUFBUSxHQUFHcmIsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RkMsaUJBQTVHOztBQUVBLFlBQUk4VyxRQUFRLENBQUN4ZCxTQUFULElBQXNCeWUsZUFBZSxDQUFDemUsU0FBMUMsRUFBcUQ7QUFDbkRtQyxVQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEeVosaUNBQTFELENBQTRGLElBQTVGO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsR0F2eEZ3QjtBQXl4RnpCQyxFQUFBQSxzQ0F6eEZ5QixvREEweEZ6QjtBQUNFLFFBQUlaLGVBQWUsR0FBQ3ZoQixlQUFlLENBQUNpZ0IsTUFBcEM7QUFDQSxRQUFJdUIsb0JBQW9CLEdBQUN4aEIsZUFBZSxDQUFDeWhCLFdBQXpDO0FBQ0EsUUFBSUMsZ0JBQWdCLEdBQUMxaEIsZUFBZSxDQUFDMmhCLFFBQXJDO0FBQ0EsUUFBSUMsV0FBVyxHQUFDNWhCLGVBQWUsQ0FBQ3dSLEtBQWhDO0FBQ0EsUUFBSXFRLGFBQWEsR0FBQzdoQixlQUFlLENBQUN5UixLQUFsQztBQUNBLFFBQUlxUSxlQUFlLEdBQUM5aEIsZUFBZSxDQUFDK2hCLE1BQXBDO0FBQ0EsUUFBSUMsaUJBQWlCLEdBQUNoaUIsZUFBZSxDQUFDaWlCLE1BQXRDO0FBQ0EsUUFBSUcsU0FBUyxHQUFDbmQsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxFQUFkOztBQUdBLFFBQUk0WixLQUFLLEdBQUMsT0FBSyxvQkFBTCxHQUEwQlIsYUFBMUIsR0FBd0MsSUFBeEMsR0FBNkMsSUFBN0MsR0FBa0QsNkJBQWxELEdBQWdGRCxXQUExRjs7QUFFQVEsSUFBQUEsU0FBUyxDQUFDRixpQ0FBVixDQUE0QyxLQUE1QztBQUNBRSxJQUFBQSxTQUFTLENBQUNFLGlDQUFWLENBQTRDLElBQTVDO0FBQ0FGLElBQUFBLFNBQVMsQ0FBQ0csdUNBQVYsQ0FBa0RGLEtBQWxEO0FBRUEsUUFBSS9CLFFBQVEsR0FBR3JiLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUE1Rzs7QUFDQSxRQUFJeVEsUUFBUSxHQUFHLEtBQUs5USxVQUFMLEVBQWY7O0FBRUEsUUFBR3lZLFdBQVcsR0FBQ0MsYUFBZixFQUE4QjtBQUM5QjtBQUNFUSxRQUFBQSxLQUFLLElBQUUsT0FBSyxJQUFMLEdBQVUsbURBQWpCO0FBQ0FELFFBQUFBLFNBQVMsQ0FBQ0csdUNBQVYsQ0FBa0RGLEtBQWxEO0FBQ0FELFFBQUFBLFNBQVMsQ0FBQ0ksdUNBQVYsQ0FBa0QsSUFBbEQ7QUFFRCxPQU5ELE1BTU0sSUFBR1gsYUFBYSxHQUFDRCxXQUFqQixFQUE4QjtBQUNwQztBQUVJLGFBQUt6YixjQUFMLENBQW9COFQsUUFBcEIsRUFBOEJ6VyxJQUE5QixJQUFvQyxLQUFwQztBQUVBeUIsUUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEUwQixpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUs3RSxjQUFMLENBQW9COFQsUUFBcEIsQ0FBbkg7QUFDQW9JLFFBQUFBLEtBQUssSUFBRSxPQUFLLElBQUwsR0FBVSwyREFBakI7QUFDQUQsUUFBQUEsU0FBUyxDQUFDRyx1Q0FBVixDQUFrREYsS0FBbEQ7QUFDQUQsUUFBQUEsU0FBUyxDQUFDSSx1Q0FBVixDQUFrRCxLQUFsRDtBQUVBOVcsUUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZjBXLFVBQUFBLFNBQVMsQ0FBQ0UsaUNBQVYsQ0FBNEMsS0FBNUM7QUFDRCxTQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0g7O0FBRUQsUUFBSUcsU0FBUyxHQUFHO0FBQUVDLE1BQUFBLFNBQVMsRUFBRWhCLGdCQUFiO0FBQWdDaUIsTUFBQUEsY0FBYyxFQUFDM2lCO0FBQS9DLEtBQWhCO0FBQ0FpRixJQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDdUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RW9YLFNBQTlFO0FBRUQsR0F0MEZ3QjtBQXcwRnpCRyxFQUFBQSxrREF4MEZ5Qiw4REF3MEYwQnpYLEtBeDBGMUIsRUF3MEZpQztBQUN4RCxRQUFJLEtBQUt4RSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFVBQUkxQix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGMEMsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILEtBQTlILEVBQXFJO0FBRW5JLFlBQUl0QyxJQUFJLEdBQUN1QixLQUFLLENBQUN1WCxTQUFmO0FBQ0EsWUFBSXBDLFFBQVEsR0FBR3JiLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NZLHlCQUFsQyxHQUE4RDZCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUE1RztBQUNBLFlBQUk0WSxTQUFTLEdBQUNuZCx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEVBQWQ7QUFFQSxZQUFJOFksZUFBZSxHQUFDcFcsS0FBSyxDQUFDd1gsY0FBTixDQUFxQjFDLE1BQXpDO0FBQ0EsWUFBSXVCLG9CQUFvQixHQUFDclcsS0FBSyxDQUFDd1gsY0FBTixDQUFxQmxCLFdBQTlDO0FBQ0EsWUFBSUMsZ0JBQWdCLEdBQUN2VyxLQUFLLENBQUN3WCxjQUFOLENBQXFCaEIsUUFBMUM7QUFDQSxZQUFJQyxXQUFXLEdBQUN6VyxLQUFLLENBQUN3WCxjQUFOLENBQXFCblIsS0FBckM7QUFDQSxZQUFJcVEsYUFBYSxHQUFDMVcsS0FBSyxDQUFDd1gsY0FBTixDQUFxQmxSLEtBQXZDO0FBQ0EsWUFBSXFRLGVBQWUsR0FBQzNXLEtBQUssQ0FBQ3dYLGNBQU4sQ0FBcUJaLE1BQXpDO0FBQ0EsWUFBSUMsaUJBQWlCLEdBQUM3VyxLQUFLLENBQUN3WCxjQUFOLENBQXFCVixNQUEzQzs7QUFDQSxZQUFJaEksUUFBUSxHQUFHLEtBQUs5USxVQUFMLEVBQWY7O0FBRUFpWixRQUFBQSxTQUFTLENBQUNTLG9DQUFWLENBQStDLEtBQS9DO0FBQ0E5YSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXNZLFFBQVEsQ0FBQ3hkLFNBQXJCO0FBQ0FpRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTRCLElBQVo7O0FBQ0EsWUFBSTBXLFFBQVEsQ0FBQ3hkLFNBQVQsQ0FBbUJ3UyxRQUFuQixNQUFpQzFMLElBQUksQ0FBQzBMLFFBQUwsRUFBckMsRUFBc0Q7QUFDcEQsY0FBSStNLEtBQUssR0FBQyxPQUFLLG9CQUFMLEdBQTBCVCxXQUExQixHQUFzQyxJQUF0QyxHQUEyQyxJQUEzQyxHQUFnRCw2QkFBaEQsR0FBOEVDLGFBQXhGOztBQUVBTyxVQUFBQSxTQUFTLENBQUNTLG9DQUFWLENBQStDLEtBQS9DO0FBQ0FULFVBQUFBLFNBQVMsQ0FBQ0YsaUNBQVYsQ0FBNEMsS0FBNUM7QUFDQUUsVUFBQUEsU0FBUyxDQUFDRSxpQ0FBVixDQUE0QyxJQUE1QztBQUNBRixVQUFBQSxTQUFTLENBQUNHLHVDQUFWLENBQWtERixLQUFsRDtBQUNBRCxVQUFBQSxTQUFTLENBQUNTLG9DQUFWLENBQStDLEtBQS9DOztBQUVBLGNBQUdqQixXQUFXLEdBQUNDLGFBQWYsRUFBOEI7QUFDOUI7QUFDSSxtQkFBSzFiLGNBQUwsQ0FBb0I4VCxRQUFwQixFQUE4QnpXLElBQTlCLElBQW9DLEtBQXBDO0FBQ0E2ZSxjQUFBQSxLQUFLLElBQUUsT0FBSyxJQUFMLEdBQVUsMkRBQWpCO0FBQ0FELGNBQUFBLFNBQVMsQ0FBQ0csdUNBQVYsQ0FBa0RGLEtBQWxEO0FBQ0FELGNBQUFBLFNBQVMsQ0FBQ0ksdUNBQVYsQ0FBa0QsS0FBbEQ7QUFFQTlXLGNBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YwVyxnQkFBQUEsU0FBUyxDQUFDRSxpQ0FBVixDQUE0QyxLQUE1QztBQUNBcmQsZ0JBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMERvYSxvQ0FBMUQsQ0FBK0YsS0FBL0Y7QUFDQVQsZ0JBQUFBLFNBQVMsQ0FBQ1UscUNBQVY7QUFDRCxlQUpTLEVBSVAsS0FKTyxDQUFWO0FBTUgsYUFiRCxNQWFNLElBQUdqQixhQUFhLEdBQUNELFdBQWpCLEVBQThCO0FBQ3BDO0FBQ0VTLGNBQUFBLEtBQUssSUFBRSxPQUFLLElBQUwsR0FBVSxtREFBakI7QUFDQUQsY0FBQUEsU0FBUyxDQUFDRyx1Q0FBVixDQUFrREYsS0FBbEQ7QUFDQUQsY0FBQUEsU0FBUyxDQUFDSSx1Q0FBVixDQUFrRCxJQUFsRDtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0YsR0EzM0Z3QjtBQTYzRnpCTyxFQUFBQSx1Q0E3M0Z5QixxREE4M0Z6QjtBQUNFLFFBQUl6QyxRQUFRLEdBQUdyYix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBNUc7O0FBQ0EsUUFBSXlRLFFBQVEsR0FBRyxLQUFLOVEsVUFBTCxFQUFmOztBQUNBLFFBQUlpWixTQUFTLEdBQUNuZCx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEVBQWQ7O0FBRUEsUUFBRyxLQUFLdEMsY0FBTCxDQUFvQjhULFFBQXBCLEVBQThCelcsSUFBOUIsSUFBb0MsS0FBdkMsRUFDQTtBQUNFLFdBQUsyQyxjQUFMLENBQW9COFQsUUFBcEIsRUFBOEJ6VyxJQUE5QixJQUFvQyxLQUFwQztBQUNBeUIsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEUwQixpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUs3RSxjQUFMLENBQW9COFQsUUFBcEIsQ0FBbkg7QUFDQWhWLE1BQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMER1YSxnQkFBMUQsQ0FBMkUsS0FBM0U7QUFDQVosTUFBQUEsU0FBUyxDQUFDRSxpQ0FBVixDQUE0QyxLQUE1Qzs7QUFDQSxVQUFHckksUUFBUSxJQUFFLEtBQUszUyxVQUFsQixFQUNBO0FBQ0U4YSxRQUFBQSxTQUFTLENBQUNVLHFDQUFWO0FBQ0Q7QUFDRixLQVZELE1BV0E7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUEsV0FBSzNjLGNBQUwsQ0FBb0I4VCxRQUFwQixFQUE4QnpXLElBQTlCLEdBQW1DLENBQW5DO0FBQ0F5QixNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RTBCLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUgsS0FBSzdFLGNBQUwsQ0FBb0I4VCxRQUFwQixDQUFuSDtBQUNBbUksTUFBQUEsU0FBUyxDQUFDRSxpQ0FBVixDQUE0QyxLQUE1Qzs7QUFDQSxVQUFHckksUUFBUSxJQUFFLEtBQUszUyxVQUFsQixFQUNBO0FBQ0U4YSxRQUFBQSxTQUFTLENBQUNVLHFDQUFWO0FBQ0Q7QUFDRjtBQUVGLEdBbDZGd0I7QUFvNkZ6QkcsRUFBQUEsMkNBcDZGeUIseURBbzZGcUI7QUFDNUMsUUFBSSxLQUFLOWMsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUFyQyxJQUE2Q3BGLGtCQUFqRCxFQUFxRTtBQUNuRSxXQUFLK0gsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUFyQyxJQUE2Q3BGLGtCQUE3QztBQUNBNkcsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHNGLFNBQTFELENBQW9FLGtGQUFrRixLQUFLNUgsY0FBTCxDQUFvQixLQUFLbUIsVUFBekIsRUFBcUM5RCxJQUEzTDtBQUNBeUIsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHFZLHVDQUExRDtBQUNBN2IsTUFBQUEsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQzRCLHFCQUFsQyxHQUEwRHlhLDRCQUExRCxDQUF1RixLQUF2RjtBQUNBLFVBQUlyQyxZQUFZLEdBQUc7QUFBRS9HLFFBQUFBLEVBQUUsRUFBRXpiLG9CQUFOO0FBQTRCK0MsUUFBQUEsTUFBTSxFQUFFaEQsa0JBQXBDO0FBQXdEaWlCLFFBQUFBLGFBQWEsRUFBRS9oQix1QkFBdkU7QUFBZ0c2aUIsUUFBQUEsSUFBSSxFQUFFLEtBQUtoYixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3hFLFNBQTNJO0FBQXNKdWUsUUFBQUEsTUFBTSxFQUFFLEtBQUtsYixjQUFMLENBQW9CLEtBQUttQixVQUF6QixFQUFxQ3pFO0FBQW5NLE9BQW5CO0FBQ0FvQyxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDdUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RXdWLFlBQTlFO0FBQ0QsS0FQRCxNQU9PO0FBQ0w1YixNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEdBQTBEMGEsZ0NBQTFELENBQTJGLElBQTNGLEVBREssQ0FFTDtBQUNEO0FBQ0YsR0FoN0Z3QjtBQWk3RnpCQyxFQUFBQSxpQ0FqN0Z5Qiw2Q0FpN0ZTalksS0FqN0ZULEVBaTdGZ0IrRCxNQWo3RmhCLEVBaTdGd0J3RSxZQWo3RnhCLEVBaTdGMEM7QUFBQSxRQUFsQkEsWUFBa0I7QUFBbEJBLE1BQUFBLFlBQWtCLEdBQUgsQ0FBRztBQUFBOztBQUNqRTtBQUNBO0FBRUEsUUFBSWdOLFNBQVMsR0FBRyxLQUFLOU8sWUFBTCxFQUFoQjs7QUFDQSxRQUFJK08sbUJBQW1CLEdBQUcsSUFBMUI7O0FBQ0EsUUFBSWxRLE9BQU8sR0FBR2lRLFNBQVMsR0FBR0MsbUJBQTFCOztBQUVBdmlCLElBQUFBLGtCQUFrQixHQUFHcVMsT0FBckI7QUFDQXBTLElBQUFBLG9CQUFvQixHQUFHLEtBQUs4SCxjQUFMLENBQW9CdU4sWUFBcEIsRUFBa0M1USxTQUF6RDtBQUNBeEUsSUFBQUEsdUJBQXVCLEdBQUc0USxNQUExQjtBQUVBLFFBQUkwUixPQUFPLEdBQUcsSUFBZDs7QUFDQSxRQUFJeUMsS0FBSyxHQUFHLE9BQU8sZ0JBQVAsR0FBMEIzQyxTQUExQixHQUFzQyxJQUF0QyxHQUE2QyxJQUE3QyxHQUFvRCxtQkFBcEQsR0FBMEVBLFNBQTFFLEdBQXNGLEtBQXRGLEdBQThGQyxtQkFBOUYsR0FBb0gsTUFBcEgsR0FBNkhsUSxPQUF6STs7QUFFQXhMLElBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMER5YSw0QkFBMUQsQ0FBdUYsSUFBdkY7QUFDQWplLElBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0M0QixxQkFBbEMsR0FBMEQ2YSw0QkFBMUQsQ0FBdUZELEtBQXZGO0FBQ0QsR0FsOEZ3QjtBQW04RnpCRSxFQUFBQSxpRUFuOEZ5Qiw2RUFtOEZ5Q3BZLEtBbjhGekMsRUFtOEZnRDtBQUN2RSxRQUFJLEtBQUt4RSxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFVBQUkxQix3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDWSx5QkFBbEMsR0FBOEQ2QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGMEMsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQTBILEtBQTlILEVBQXFJO0FBQ25JLFlBQUkwVSxPQUFPLEdBQUd6VixLQUFLLENBQUM4VSxNQUFwQjs7QUFDQSxZQUFJdk0sWUFBWSxHQUFHckMsUUFBUSxDQUFDbEcsS0FBSyxDQUFDc1csV0FBUCxDQUEzQjs7QUFDQSxZQUFJUCxTQUFTLEdBQUcvVixLQUFLLENBQUN3VyxRQUF0Qjs7QUFFQSxZQUFJN0Ysa0JBQWtCLEdBQUc3Vyx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDNEIscUJBQWxDLEVBQXpCOztBQUNBLFlBQUltWSxPQUFPLENBQUM5ZCxTQUFSLElBQXFCbUMsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ1kseUJBQWxDLEdBQThENkIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RmEsSUFBN0YsQ0FBa0dXLE1BQTNILEVBQW1JO0FBQ2pJaEQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQXFCNFksT0FBTyxDQUFDL2QsVUFBekM7O0FBRUFpWixVQUFBQSxrQkFBa0IsQ0FBQzBILDBCQUFuQixDQUE4Q3RDLFNBQTlDOztBQUNBcEYsVUFBQUEsa0JBQWtCLENBQUMySCwrQkFBbkIsQ0FBbUQsSUFBbkQ7O0FBQ0EzSCxVQUFBQSxrQkFBa0IsQ0FBQzRILHFDQUFuQixDQUF5RCxLQUF6RDtBQUNEO0FBQ0Y7QUFDRjtBQUNGLEdBcDlGd0IsQ0FzOUZ6QjtBQUNBOztBQXY5RnlCLENBQVQsQ0FBbEIsRUF5OUZBOztBQUNBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIzZCxXQUFqQixFQUNBIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX2lzVGVzdCA9IGZhbHNlO1xyXG52YXIgX2RpY2VpbnB1dDEgPSBcIlwiO1xyXG52YXIgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDEgPSAtMTtcclxudmFyIFByZXZpb3VzRGljZVJvbGwyID0gLTE7XHJcbnZhciBoYWxmQnVzaW5lc3NBbW91bnQgPSAwO1xyXG52YXIgaGFsZkJ1c2luZXNzQW1vdW50SUQgPSBcIlwiO1xyXG52YXIgaGFsZkJ1c2luZXNzQW1vdW50SW5kZXggPSAwO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDMgPSAtMTtcclxudmFyIFByZXZpb3VzRGljZVJvbGw0ID0gLTE7XHJcblxyXG52YXIgUHJldmlvdXNEaWNlUm9sbDUgPSAtMTtcclxuXHJcbnZhciB1c2VyR2FtZU92ZXIgPSBmYWxzZTtcclxudmFyIEJvdEdhbWVPdmVyID0gZmFsc2U7XHJcbnZhciBUb3RhbENvdW50ZXJSZWFjaGVkID0gZmFsc2U7XHJcbnZhciBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxudmFyIERvdWJsZVBheURheUNvdW50ZXIgPSAwO1xyXG52YXIgTm9DYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG52YXIgUGxheWVyTGVmdCA9IGZhbHNlO1xyXG52YXIgRm9yY2VDaGFuZ2VUaW1lT3V0ID0gbnVsbDtcclxudmFyIEdhbWVDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIENvcnJlY3RBbnN3ZXIgPSAwO1xyXG5cclxudmFyIFZvY2FidWxhcnlRdWVzdGlvbnMgPSBbXTtcclxudmFyIEVzdGFibGlzaG1lbnRRdWVzdGlvbnMgPSBbXTtcclxudmFyIFZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyID0gMDtcclxudmFyIEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuXHJcbnZhciBCaWdCdXNpbmVzc0FycmF5ID0gW107XHJcbnZhciBMb3NzZXNBcnJheSA9IFtdO1xyXG52YXIgTWFya2V0aW5nQXJyYXkgPSBbXTtcclxudmFyIFdpbGRDYXJkQXJyYXkgPSBbXTtcclxudmFyIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyID0gMDtcclxudmFyIExvc3Nlc0FycmF5Q291bnRlciA9IDA7XHJcbnZhciBNYXJrZXRpbmdBcnJheUNvdW50ZXIgPSAwO1xyXG52YXIgV2lsZENhcmRBcnJheUNvdW50ZXIgPSAwO1xyXG52YXIgQ29tcGFyZURpY2VEYXRhPW51bGw7XHJcblxyXG4vLyNyZWdpb24gc3VwZXJjbGFzc2VzIGFuZCBlbnVtZXJhdGlvbnNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIHR5cGUgb2YgYnVzaW5lc3MtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEVudW1CdXNpbmVzc1R5cGUgPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIEhvbWVCYXNlZDogMSwgLy9hIGJ1c2luZXNzIHRoYXQgeW91IG9wZXJhdGUgb3V0IG9mIHlvdXIgaG9tZVxyXG4gIGJyaWNrQW5kbW9ydGFyOiAyLCAvL2Egc3RvcmUgZnJvbnQgYnVzaW5lc3NcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3NJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc0luZm9cIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lOiBcIkJ1c2luZXNzRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NUeXBlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vZGVcIixcclxuICAgICAgdHlwZTogRW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgZGVmYXVsdDogRW51bUJ1c2luZXNzVHlwZS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQnVzaW5lc3MgY2F0b2dvcnkgZm9yIHBsYXllcnNcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUeXBlXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJUeXBlIChieSBuYW1lKSBvZiBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOYW1lIG9mIHRoZSBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLFxyXG4gICAgfSxcclxuICAgIEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImJhbGFuY2Ugb2YgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBJc1BhcnRuZXJzaGlwOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzUGFydG5lcnNoaXBcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cHc6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGRvbmUgcGFydG5lcnNoaXAgd2l0aCBzb21lb25lIHdpdGggY3VycmVudCBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXJ0bmVySURcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklEIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhcnRuZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJuYW1lIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLFxyXG4gICAgfSxcclxuICAgIExvY2F0aW9uc05hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9jYXRpb25zTmFtZVwiLFxyXG4gICAgICB0eXBlOiBbY2MuVGV4dF0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaWYgcGxheWVyIG93bnMgYnJpY2sgYW5kIG1vcnRhciBoZS9zaGUgY2FuIGV4cGFuZCB0byBuZXcgbG9jYXRpb25cIixcclxuICAgIH0sXHJcbiAgICBMb2FuVGFrZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblRha2VuXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBSZWNlaXZlRG91YmxlUGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlY2VpdmVEb3VibGVQYXlEYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQ2FyZERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhRnVuY3Rpb25hbGl0eSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkNhcmREYXRhRnVuY3Rpb25hbGl0eVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5leHRUdXJuRG91YmxlUGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5leHRUdXJuRG91YmxlUGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBpdHMgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcE5leHRUdXJuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBOZXh0VHVyblwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgdHVybiBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgdHVybiBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTmV4dFBheWRheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcEhNTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwSE1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGhvbWUgYmFzZWQgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcEJNTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwQk1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGJyaWNrYSBhbmQgbW1vcnRhciBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBOZXh0VHVybkhhbGZQYXlEYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmV4dFR1cm5IYWxmUGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBIYXNNYXJrZXRpbmdDb21wYW55OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhhc01hcmtldGluZ0NvbXBhbnlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBCYW5rcnVwdGVkTmV4dFR1cm46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQmFua3J1cHRlZE5leHRUdXJuXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3RvY2tJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTdG9ja0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTdG9ja0luZm9cIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lOiBcIlN0b2NrRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibmFtZSBvZiB0aGUgYnVzaW5lc3MgaW4gd2hpY2ggc3RvY2tzIHdpbGwgYmUgaGVsZFwiLFxyXG4gICAgfSxcclxuICAgIFNoYXJlQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNoYXJlQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJTaGFyZSBhbW91bnQgb2YgdGhlIHN0b2NrXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciAgUGxheWVyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBsYXllckRhdGEgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQbGF5ZXJEYXRhXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJuYW1lIG9mIHRoZSBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJVSUQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyVUlEXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJJRCBvZiB0aGUgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgQXZhdGFySUQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFySURcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImlkIHJlZmVyZW5jZSBmb3IgcGxheWVyIGF2YXRhciBzZWxlY3Rpb25cIixcclxuICAgIH0sXHJcbiAgICBJc0JvdDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc0JvdFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwdzogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIGN1cnJlbnQgcGxheWVyIGlzIGJvdFwiLFxyXG4gICAgfSxcclxuICAgIE5vT2ZCdXNpbmVzczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1wiLFxyXG4gICAgICB0eXBlOiBbQnVzaW5lc3NJbmZvXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOdW1iZXIgb2YgYnVzaW5lc3MgYSBwbGF5ZXIgY2FuIG93blwiLFxyXG4gICAgfSxcclxuICAgIENhcmRGdW5jdGlvbmFsaXR5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhcmRGdW5jdGlvbmFsaXR5XCIsXHJcbiAgICAgIHR5cGU6IENhcmREYXRhRnVuY3Rpb25hbGl0eSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImNhcmQgZnVuY3Rpb25hbGl0eSBzdG9yZWQgYnkgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZEFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIG9mIGhvbWUgYmFzZWQgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIEJyaWNrQW5kTW9ydGFyQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrQW5kTW9ydGFyQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJudW1iZXIgb2YgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgUmVjZWl2ZURvdWJsZVBheURheUFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZWNlaXZlRG91YmxlUGF5RGF5QW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbExvY2F0aW9uc0Ftb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbExvY2F0aW9uc0Ftb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIG9mIGxvY2F0aW9ucyBvZiBhbGwgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc2Vzc1wiLFxyXG4gICAgfSxcclxuICAgIE5vT2ZTdG9ja3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tzXCIsXHJcbiAgICAgIHR5cGU6IFtTdG9ja0luZm9dLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk51bWJlciBvZiBzdG9jayBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgY2FzaCBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIEdvbGRDb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHb2xkQ291bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImNvdW50IG9mIGdvbGQgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIFN0b2NrQ291bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tDb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY291bnQgb2Ygc3RvY2tzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBMb2FuVGFrZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblRha2VuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyB0YWtlbiBsb2FuIGZyb20gYmFuayBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBsb2FuIHRha2VuIGZyb20gdGhlIGJhbmtcIixcclxuICAgIH0sXHJcbiAgICBNYXJrZXRpbmdBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nQW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJtYXJrZXRpbmcgYW1vdW50IGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBMYXd5ZXJTdGF0dXM6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTGF3eWVyU3RhdHVzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBoaXJlZCBhIGxhd3llciBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBJc0JhbmtydXB0OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQmFua3J1cHRcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGJlZW4gQmFua3J1cHRlZCBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBCYW5rcnVwdEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCYW5rcnVwdEFtb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBob3cgbXVjaCB0aW1lIHBsYXllciBoYXMgYmVlbiBiYW5rcnVwdGVkXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcHBlZExvYW5QYXltZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBwZWRMb2FuUGF5bWVudFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgc2tpcHBlZCBsb2FuIHBheW1lbnRcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJSb2xsQ291bnRlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJSb2xsQ291bnRlclwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciB0byBzdG9yZSByb2xsIGNvdW50b3IgZm9yIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEluaXRpYWxDb3VudGVyQXNzaWduZWQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGlzR2FtZUZpbmlzaGVkOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcImlzR2FtZUZpbmlzaGVkXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxTY29yZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbFNjb3JlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEhCQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEhCQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxCTUNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCTUNhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsR29sZENhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxHb2xkQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxMb2FuQmFsYW5jZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbExvYW5CYWxhbmNlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbFN0b2Nrc0Nhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxTdG9ja3NDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBHYW1lT3Zlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHYW1lT3ZlclwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIElzQWN0aXZlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQWN0aXZlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBDYW5HaXZlUHJvZml0T25QYXlEYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBVc2VySURGb3JQcm9maXRQYXlEYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVXNlcklERm9yUHJvZml0UGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIEdhbWUgTWFuYWdlciBDbGFzc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0obWFpbiBjbGFzcykgY2xhc3MgZm9yIEdhbWUgTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUm9sbENvdW50ZXIgPSAwO1xyXG52YXIgRGljZVRlbXAgPSAwO1xyXG52YXIgRGljZVJvbGwgPSAwO1xyXG52YXIgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIFR1cm5DaGVja0FycmF5ID0gW107XHJcbnZhciBCdXNpbmVzc0xvY2F0aW9uTm9kZXMgPSBbXTtcclxuXHJcbnZhciBQYXNzZWRQYXlEYXkgPSBmYWxzZTtcclxudmFyIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG5cclxuLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbnZhciBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxudmFyIF9uZXh0VHVybmhhbGZQYXkgPSBmYWxzZTtcclxudmFyIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxudmFyIF9za2lwTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG52YXIgX3NraXBITU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbnZhciBUdXJuSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxudmFyIEJhY2tzcGFjZXMgPSAzO1xyXG52YXIgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxudmFyIENhcmREaXNwbGF5U2V0VGltb3V0ID0gbnVsbDtcclxuXHJcbnZhciBHYW1lTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkdhbWVNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgcGxheWVyJ3MgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIEJvdEdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgYm90J3MgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBDYW1lcmFOb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgY2FtZXJhXCIsXHJcbiAgICB9LFxyXG4gICAgQWxsUGxheWVyVUk6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIHVpIG9mIGFsbCBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gICAgQWxsUGxheWVyTm9kZXM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIG5vZGUgb2YgYWxsIHBsYXllcnMgaW5zaWRlIGdhbWVwbGF5XCIsXHJcbiAgICB9LFxyXG4gICAgU3RhcnRMb2NhdGlvbk5vZGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBvZiBhdHRheSBvZiBsb2NhdGlvbnNcIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RlZE1vZGU6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImludGVnZXIgcmVmZXJlbmNlIGZvciBnYW1lIG1vZGUgMSBtZWFucyBib3QgYW5kIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIFBsYXllckRhdGE6IFBsYXllckRhdGEsXHJcbiAgICBCdXNpbmVzc0luZm86IEJ1c2luZXNzSW5mbyxcclxuICAgIENhcmREYXRhRnVuY3Rpb25hbGl0eTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgRW51bUJ1c2luZXNzVHlwZTogRW51bUJ1c2luZXNzVHlwZSxcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFNldFBsYXllckxlZnQoX3N0YXRlKSB7XHJcbiAgICBQbGF5ZXJMZWZ0ID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0QWxsVmFyaWFibGVzKCkge1xyXG4gICAgVm9jYWJ1bGFyeVF1ZXN0aW9ucyA9IFtdO1xyXG4gICAgRXN0YWJsaXNobWVudFF1ZXN0aW9ucyA9IFtdO1xyXG4gICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG4gICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG5cclxuICAgIEJpZ0J1c2luZXNzQXJyYXkgPSBbXTtcclxuICAgIExvc3Nlc0FycmF5ID0gW107XHJcbiAgICBNYXJrZXRpbmdBcnJheSA9IFtdO1xyXG4gICAgV2lsZENhcmRBcnJheSA9IFtdO1xyXG4gICAgQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgTG9zc2VzQXJyYXlDb3VudGVyID0gMDtcclxuICAgIE1hcmtldGluZ0FycmF5Q291bnRlciA9IDA7XHJcbiAgICBXaWxkQ2FyZEFycmF5Q291bnRlciA9IDA7XHJcbiAgICBDb21wYXJlRGljZURhdGE9bnVsbDtcclxuXHJcbiAgICBfZGljZWlucHV0MSA9IFwiXCI7XHJcbiAgICBfZGljZWlucHV0MiA9IFwiXCI7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMSA9IC0xO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDIgPSAtMTtcclxuICAgIFBsYXllckxlZnQgPSBmYWxzZTtcclxuICAgIGhhbGZCdXNpbmVzc0Ftb3VudCA9IDA7XHJcbiAgICBoYWxmQnVzaW5lc3NBbW91bnRJRCA9IFwiXCI7XHJcbiAgICBoYWxmQnVzaW5lc3NBbW91bnRJbmRleCA9IDA7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMyA9IC0xO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDQgPSAtMTtcclxuICAgIF9uZXh0VHVybmhhbGZQYXkgPSBmYWxzZTtcclxuICAgIFByZXZpb3VzRGljZVJvbGw1ID0gLTE7XHJcbiAgICBHYW1lQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICB1c2VyR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgIEJvdEdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICBDb3JyZWN0QW5zd2VyID0gMDtcclxuICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIERpY2VSb2xsID0gMDtcclxuICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcbiAgICBGb3JjZUNoYW5nZVRpbWVPdXQgPSBudWxsO1xyXG4gICAgUGFzc2VkUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG4gICAgX3NraXBITU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG4gICAgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxuICAgIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICBUdXJuSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxuICAgIEJhY2tzcGFjZXMgPSAzO1xyXG4gICAgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxuICAgIENhcmREaXNwbGF5U2V0VGltb3V0ID0gbnVsbDtcclxuICAgIFRvdGFsQ291bnRlclJlYWNoZWQgPSBmYWxzZTtcclxuICAgIE5vQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBJbnB1dFRlc3REaWNlMShfdmFsKSB7XHJcbiAgICBpZiAoX2lzVGVzdCkge1xyXG4gICAgICBfZGljZWlucHV0MSA9IF92YWw7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5wdXRUZXN0RGljZTIoX3ZhbCkge1xyXG4gICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgX2RpY2VpbnB1dDIgPSBfdmFsO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBBbGwgRnVuY3Rpb25zIG9mIEdhbWVNYW5hZ2VyXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgY2xhc3MgaXMgY3JlYXRlZFxyXG4gICAqKi9cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsVmFyaWFibGVzKCk7XHJcbiAgICB0aGlzLlJlc2V0UGF5RGF5KCk7XHJcbiAgICBHYW1lTWFuYWdlci5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB0aGlzLlR1cm5OdW1iZXIgPSAwO1xyXG4gICAgdGhpcy5UdXJuQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuU2VsZWN0ZWRNb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIHRoaXMuSW5pdF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4ID0gMDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0UGF5RGF5KCkge1xyXG4gICAgY29uc29sZS5sb2coXCJyZXNldGluZyBwYXlkYXlcIik7XHJcbiAgICBfc2tpcE5leHRQYXlkYXkgPSBmYWxzZTtcclxuICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gZmFsc2U7XHJcbiAgICBfc2tpcEJNTmV4dFBheWRheSA9IGZhbHNlO1xyXG4gICAgUGFzc2VkUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxuICAgIF9uZXh0VHVybmhhbGZQYXkgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcmVmZXJlbmNlIG9mIHJlcXVpcmVkIGNsYXNzZXNcclxuICAgKiovXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBpbml0aWFsIGdhbWVtYW5hZ2VyIGVzc2V0aWFsc1xyXG4gICAqKi9cclxuICBJbml0X0dhbWVNYW5hZ2VyKCkge1xyXG4gICAgdGhpcy5DYW1lcmEgPSB0aGlzLkNhbWVyYU5vZGUuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSk7XHJcbiAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mbyA9IFtdO1xyXG4gICAgUm9sbENvdW50ZXIgPSAwO1xyXG4gICAgRGljZVRlbXAgPSAwO1xyXG4gICAgRGljZVJvbGwgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIC8vaWYgam9pbmVkIHBsYXllciBpcyBzcGVjdGF0ZVxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzdGF0dXMgb2YgaW5pdGlhbCBidXNpbmVzcyBzZXRwOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpKTtcclxuXHJcbiAgICAgICAgLy9pZiBpbml0YWwgc2V0dXAgaGFzIGJlZW4gZG9uZSBhbmQgZ2FtZSBpcyB1bmRlciB3YXlcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgdmFyIEFsbERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gQWxsRGF0YTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgIHRoaXMuVHVybk51bWJlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIpO1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSwgdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAvL3RoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSA4O1xyXG4gICAgICAgICAgLy90aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSwgZmFsc2UsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgYm90IGFsb25nIHdpdGggb25lIHBsYXllclxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jcmVnaW9uIHB1YmxpYyBmdW5jdGlvbnMgdG8gZ2V0IGRhdGEgKGFjY2Vzc2libGUgZnJvbSBvdGhlciBjbGFzc2VzKVxyXG4gIEdldFR1cm5OdW1iZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5UdXJuTnVtYmVyO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgZ2V0IG15IGluZGV4IGluIGFycmF5IG9mIFBsYXllckdhbWVJbmZvIFxyXG4gICAqKi9cclxuICBHZXRNeUluZGV4KCkge1xyXG4gICAgdmFyIG15SW5kZXggPSAwO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9hbGxBY3RvcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWxsQWN0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoX2FjdG9yLlBsYXllclVJRCA9PSBfYWxsQWN0b3JzW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICBteUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbXlJbmRleDtcclxuICB9LFxyXG5cclxuICBHZXRNeVBsYXllclVJRCgpIHtcclxuICAgIHZhciBfVUlEID0gXCJcIjtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfYWxsQWN0b3JzID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FsbEFjdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9hY3Rvci5QbGF5ZXJVSUQgPT0gX2FsbEFjdG9yc1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgX1VJRD1fYWN0b3IuUGxheWVyVUlEIDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfVUlEO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZU1vZGUgQ29kZVxyXG5cclxuICBTeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKSB7XHJcbiAgICB2YXIgQWxsRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiKTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm8gPSBBbGxEYXRhO1xyXG4gICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwic3luY2luZyBhbGwgZGF0YSBmb3Igc3BlY3RhdGVcIik7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyID4gMCAmJiB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jbml0aWFsQ291bnRlckFzc2lnbmVkID09IHRydWUgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKF90b1Bvcy54LCBfdG9Qb3MueSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXR0aW5nIHBvczFcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY291bnRlcjogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJbml0aWFsIENvdW50ZXIgQXNzaWduZWQ6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIGZpbmlzaGVkIDogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgIHZhciBfbGFzdEluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19sYXN0SW5kZXhdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtfbGFzdEluZGV4XS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCwgX3RvUG9zLnkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZyBwb3MyXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9jb25zb2xlLmxvZyhcInN5bmNlZCBwbGF5ZXJub2Rlc1wiKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlcigpIHtcclxuICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yQ291bnQoKTtcclxuICAgIGlmIChUdXJuQ2hlY2tBcnJheS5sZW5ndGggPT0gVG90YWxDb25uZWN0ZWRQbGF5ZXJzKSB7XHJcbiAgICAgIFR1cm5DaGVja0FycmF5ID0gW107XHJcbiAgICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwicmVzZXRpbmcgZm9yIHNwZWN0YXRlXCIpO1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIGZ1bmN0aW9ucyByZWxhdGVkIHRvIFR1cm4gTWVjaGFuaXNtIGFuZCBjYXJkIG1lY2hhbmlzbVxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJhaXNlZCBldmVudCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHMgdG8gbGV0IG90aGVycyBrbm93IGEgd2hhdCBjYXJkIGhhcyBiZWVuIHNlbGVjdGVkIGJ5IHBsYXllclxyXG4gICAqKi9cclxuICBSYWlzZUV2ZW50Rm9yQ2FyZChfZGF0YSkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg1LCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJEaXNwbGF5VGltZW91dCgpIHtcclxuICAgIGNsZWFyVGltZW91dChDYXJkRGlzcGxheVNldFRpbW91dCk7XHJcbiAgfSxcclxuXHJcbiAgRGlzcGxheUNhcmRPbk90aGVycygpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBjb25zb2xlLmxvZyhcImNhcmQgZXZlbnQgcmVjZWl2ZWQ6IFwiICsgQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG4gICAgICBpZiAoQ2FyZEV2ZW50UmVjZWl2ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChDYXJkRGlzcGxheVNldFRpbW91dCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmVycm9yKHRoaXMuQ2FyZENvdW50ZXIpO1xyXG4gICAgICAgIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLkNhcmREaXNwbGF5ZWQpIHtcclxuICAgICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZCA9IHRydWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5DYXJkQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZShmYWxzZSwgdGhpcy5SYW5kb21DYXJkSW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBDYXJkRGlzcGxheVNldFRpbW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgLy9jaGVjayBhZnRlciBldmVyeSAwLjUgc2Vjb25kc1xyXG4gICAgICAgICAgdGhpcy5EaXNwbGF5Q2FyZE9uT3RoZXJzKCk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldENhcmREaXNwbGF5KCkge1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50Rm9yQ2FyZChfZGF0YSkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIGNvbnNvbGUubG9nKFwiQ2FyZCBEYXRhIFJlY2VpdmVkOlwiKTtcclxuICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuXHJcbiAgICB2YXIgUmFuZG9tQ2FyZCA9IF9kYXRhLnJhbmRvbUNhcmQ7XHJcbiAgICB2YXIgY291bnRlciA9IF9kYXRhLmNvdW50ZXI7XHJcblxyXG4gICAgdGhpcy5SYW5kb21DYXJkSW5kZXggPSBSYW5kb21DYXJkO1xyXG4gICAgdGhpcy5DYXJkQ291bnRlciA9IGNvdW50ZXI7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UodHJ1ZSwgUmFuZG9tQ2FyZCk7XHJcbiAgICAgIGVsc2UgQ2FyZEV2ZW50UmVjZWl2ZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gZmFsc2UpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKHRydWUsIFJhbmRvbUNhcmQpO1xyXG4gICAgICBlbHNlIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKGZhbHNlLCBSYW5kb21DYXJkLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJhaXNlZCBldmVudCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHMgdG8gbGV0IG90aGVycyBrbm93IGEgcGFydGljdWxhciBwbGF5ZXIgaGFzIGNvbXBsZXRlIHRoZWlyIG1vdmVcclxuICAgKiovXHJcbiAgUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg0LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInJhaXNlZCBmb3IgdHVybiBjb21wbGV0ZVwiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg0LCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTeW5jQWxsRGF0YSgpIHtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCB0aGlzLlBsYXllckdhbWVJbmZvLCB0cnVlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZW1vdmVGcm9tQ2hlY2tBcnJheShfdWlkKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB2YXIgX2luZCA9IC0xO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFR1cm5DaGVja0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChUdXJuQ2hlY2tBcnJheVtpbmRleF0gPT0gX3VpZCkgX2luZCA9IGluZGV4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2luZCAhPSAtMSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZpbmcgZnJvbSB0dXJuIGNoZWNrIGFycmF5XCIpO1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5LnNwbGljZShfaW5kLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENoZWNrVHVybkNvbXBsZXRlKCkge1xyXG4gICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycyA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2pdLklzQWN0aXZlKSBUb3RhbENvbm5lY3RlZFBsYXllcnMrKztcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIlR1cm4gQ2hlY2s6IFwiICsgVHVybkNoZWNrQXJyYXkubGVuZ3RoKTtcclxuICAgIGNvbnNvbGUubG9nKFwiVG90YWwgQ29ubmVjdGVkIFBsYXllcnM6IFwiICsgVG90YWxDb25uZWN0ZWRQbGF5ZXJzKTtcclxuICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5KTtcclxuXHJcbiAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID49IFRvdGFsQ29ubmVjdGVkUGxheWVycykge1xyXG4gICAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICAvL3RoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIG9uIGFsbCBwbGF5ZXJzIHRvIHZhbGlkYXRlIGlmIG1vdmUgaXMgY29tcGxldGVkIG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50c1xyXG4gICAqKi9cclxuICBSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUoX3VpZCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9yZWFsIHBsYXllcnNcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID09IDApIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7XHJcblxyXG4gICAgICAgIHZhciBBcnJheUxlbmd0aCA9IFR1cm5DaGVja0FycmF5Lmxlbmd0aDtcclxuICAgICAgICB2YXIgSURGb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBcnJheUxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKFR1cm5DaGVja0FycmF5W2luZGV4XSA9PSBfdWlkKSBJREZvdW5kID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghSURGb3VuZCkge1xyXG4gICAgICAgICAgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQ2hlY2tUdXJuQ29tcGxldGUoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyO1xyXG4gICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGRpY2UgYW5pbWF0aW9uIGlzIHBsYXllZCBvbiBhbGwgcGxheWVyc1xyXG4gICAqKi9cclxuICBDaGFuZ2VUdXJuKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdGhpcy5TeW5jQWxsRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLlR1cm5OdW1iZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHRoaXMuVHVybk51bWJlciA9IHRoaXMuVHVybk51bWJlciArIDE7XHJcbiAgICBlbHNlIHRoaXMuVHVybk51bWJlciA9IDA7XHJcblxyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0U29tZVZhbHVlcygpIHtcclxuICAgIC8vVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgIC8vdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuICB9LFxyXG5cclxuICBDaGFuZ2VUdXJuRm9yY2VmdWxseSgpIHtcclxuICAgIGlmIChJc1R3ZWVuaW5nKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChGb3JjZUNoYW5nZVRpbWVPdXQpO1xyXG4gICAgICBGb3JjZUNoYW5nZVRpbWVPdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm5Gb3JjZWZ1bGx5KCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KEZvcmNlQ2hhbmdlVGltZU91dCk7XHJcbiAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVZpc3VhbERhdGEoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgZnJvbSByYWlzZSBvbiBldmVudCAoZnJvbSBmdW5jdGlvbiBcIlN0YXJ0VHVyblwiIGFuZCBcIkNoYW5nZVR1cm5cIiBvZiB0aGlzIHNhbWUgY2xhc3MpIHRvIGhhbmRsZSB0dXJuXHJcbiAgICoqL1xyXG4gIFR1cm5IYW5kbGVyKF90dXJuKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB2YXIgX2lzTWFzdGVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoKTtcclxuICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW190dXJuXS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgIGlmIChfaXNNYXN0ZXIpIHtcclxuICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy90aGlzLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgIHRoaXMuVXBkYXRlVmlzdWFsRGF0YSgpO1xyXG4gICAgY29uc29sZS5sb2coXCJUdXJuOiBcIiArIF90dXJuKTtcclxuICAgIHZhciBfcGxheWVyTWF0Y2hlZCA9IGZhbHNlO1xyXG4gICAgX3NraXBOZXh0VHVybiA9IGZhbHNlO1xyXG4gICAgaWYgKElzVHdlZW5pbmcpIHtcclxuICAgICAgLy9jaGVjayBpZiBhbmltYXRpb24gb2YgdHVybiBiZWluZyBwbGF5ZWQgb24gb3RoZXIgcGxheWVyc1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgIHRoaXMuVHVybkhhbmRsZXIoX3R1cm4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgODAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuVHVybk51bWJlciA9IF90dXJuO1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LkJhbmtydXB0ZWROZXh0VHVybikge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuQmFua3J1cHRlZE5leHRUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdHYW1lX0JhbmtSdXB0ZWQoXCJZb3Ugd2VyZSBiYW5rcnVwdGVkIGFuZCB3aWxsIHN0YXJ0IGZyb20gYmVnaW4uXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VyR2FtZU92ZXIpO1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIF9za2lwTmV4dFR1cm4gPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgaWYgKCF1c2VyR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3ModHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICghX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIHlvdXIgdHVybiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gLy90dXJuIGRlY2lzaW9ucyBmb3IgYm90XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgIGlmICghQm90R2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUm9sbERpY2UoKTtcclxuICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSwgdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIHRoaXMuVHVybk51bWJlciwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUdXJuIE9mOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbFBsYXllclVJW3RoaXMuVHVybk51bWJlcl0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUGxheWVySW5mbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy9za2lwIHRoaXMgdHVybiBhcyBza2lwIHR1cm4gaGFzIGJlZW4gY2FsbGVkIGJlZm9yZVxyXG4gICAgICBpZiAoX3BsYXllck1hdGNoZWQgJiYgX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsIDEyMDApO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2tpcE5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5VcGRhdGVVSURhdGEoKTtcclxuICB9LFxyXG5cclxuICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZCkge1xyXG4gICAgdmFyIE1haW5TZXNzaW9uRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIHZhciBNeURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX2NvdW50ZXIgPSBfaW5kO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEKTtcclxuICAgIC8vICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5Jc0FjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChfY291bnRlciA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzeW5jZWQgRGF0YTpcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCA9PSBNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXSA9IE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuXHJcbiAgICAgICAgICBpZiAoX2NvdW50ZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImFkZGluZyBjb3VudGVyOiBcIitfY291bnRlcik7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3luY2VkIERhdGE6XCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGFsbCBwbGF5ZXJzIGhhdmUgZG9uZSB0aGVpciBpbml0aWFsIHNldHVwIGFuZCBmaXJzdCB0dXJuIHN0YXJ0c1xyXG4gICAgQG1ldGhvZCBTdGFydFR1cm5cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFN0YXJ0VHVybigpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgIHRoaXMuVHVybk51bWJlciA9IDA7IC8vcmVzZXRpbmcgdGhlIHR1cm4gbnVtYmVyIG9uIHN0YXJ0IG9mIHRoZSBnYW1lXHJcblxyXG4gICAgLy9zZW5kaW5nIGluaXRpYWwgdHVybiBudW1iZXIgb3ZlciB0aGUgbmV0d29yayB0byBzdGFydCB0dXJuIHNpbXVsdGFub3VzbHkgb24gYWxsIGNvbm5lY3RlZCBwbGF5ZXIncyBkZXZpY2VzXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsIHRoaXMuVHVybk51bWJlcik7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUJhbmtydXB0RGF0YShfZGF0YSkge1xyXG4gICAgLy9vdGhlciBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFxyXG4gICAgdmFyIF9pc0JhbmtydXB0ZWQgPSBfZGF0YS5EYXRhLmJhbmtydXB0ZWQ7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLnR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGFNYWluO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF9pc0JhbmtydXB0ZWQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coX3R1cm4pO1xyXG4gICAgLy8gY29uc29sZS5sb2coX3BsYXllckRhdGEpO1xyXG5cclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3R1cm5dID0gX3BsYXllckRhdGE7XHJcblxyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkodHJ1ZSk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKHRydWUpO1xyXG5cclxuICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpIHtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIH0sIDEwMDApO1xyXG5cclxuICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEZ1bmN0aW9uIGZvciBnYW1lcGxheVxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiBwbGF5ZXIgVUkgKG5hbWUvaWNvbnMvbnVtYmVyIG9mIHBsYXllcnMgdGhhdCB0byBiZSBhY3RpdmUgZXRjKVxyXG4gICAgQG1ldGhvZCBBc3NpZ25QbGF5ZXJHYW1lVUlcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEFzc2lnblBsYXllckdhbWVVSShfaXNCYW5rcnVwdGVkID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBpZiAoIV9pc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB2YXIgX3JhbmRvbUluZGV4ID0gdGhpcy5nZXRSYW5kb20oMCwgdGhpcy5Cb3RHYW1lSW5mby5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm8ucHVzaCh0aGlzLkJvdEdhbWVJbmZvW19yYW5kb21JbmRleF0pO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IDI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8gPSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuU2V0QXZhdGFyKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlR2FtZVVJKF90b2dnbGVIaWdobGlnaHQsIF9pbmRleCkge1xyXG4gICAgaWYgKF90b2dnbGVIaWdobGlnaHQpIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtfaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8gPSB0aGlzLlBsYXllckdhbWVJbmZvW19pbmRleF07XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9pbmRleCA9PSBpbmRleCkge1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlQkdIaWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlQkdIaWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5Ub2dnbGVUZXh0aWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gZW5iYWxlIHJlc3BlY3RpdmUgcGxheWVycyBub2RlcyBpbnNpZGUgZ2FtYXBsYXlcclxuICAgIEBtZXRob2QgRW5hYmxlUGxheWVyTm9kZXNcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEVuYWJsZVBsYXllck5vZGVzKF9pc0JhbmtydXB0ZWQgPSBmYWxzZSkge1xyXG4gICAgaWYgKCFfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQgPT0gMSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQgPT0gMSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSG9tZUJhc2VkQW1vdW50ID09IDEpIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJyaWNrQW5kTW9ydGFyQW1vdW50ID09IDEpIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkF2YXRhclNwcml0ZXNbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySURdO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKSB7XHJcbiAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsIDEyMCkpO1xyXG4gICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uID0gdGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG5cclxuICAgIGxldCByYXRpbyA9IHRhcmdldFBvcy55IC8gY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAyO1xyXG4gIH0sXHJcblxyXG4gIGxhdGVVcGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5pc0NhbWVyYVpvb21pbmcpIHRoaXMuU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpO1xyXG4gIH0sXHJcblxyXG4gIHN5bmNEaWNlUm9sbChfcm9sbCkge1xyXG4gICAgdmFyIF9kaWNlMSA9IF9yb2xsLmRpY2UxO1xyXG4gICAgdmFyIF9kaWNlMiA9IF9yb2xsLmRpY2UyO1xyXG4gICAgdmFyIF9yZXN1bHQgPSBfZGljZTEgKyBfZGljZTI7XHJcblxyXG4gICAgSXNUd2VlbmluZyA9IHRydWU7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEID09IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9PSAwICYmICF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgIFJvbGxDb3VudGVyID0gMTQ7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPT0gMTMpIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciArIDIyO1xyXG4gICAgICBlbHNlIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciArIDE7XHJcblxyXG4gICAgICBSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlciAtIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIERpY2VSb2xsID0gX3Jlc3VsdDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5QcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24oRGljZVJvbGwpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5UdXJuTnVtYmVyID09IGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5nZXRDb21wb25lbnQoXCJEaWNlQ29udHJvbGxlclwiKS5BbmltYXRlRGljZShfZGljZTEsIF9kaWNlMik7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZVVJRGF0YSgpO1xyXG4gICAgLy8gbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgIC8vIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgIC8vIHRoaXMuVHdlZW5DYW1lcmEoX3Bvcyx0cnVlLDAuNCk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVUlEYXRhKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgRGljZUZ1bnRpb25hbGl0eSgpIHtcclxuICAgIGxldCB0YXJnZXRQb3MgPSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwgMTIwKSk7XHJcbiAgICB2YXIgX3BvcyA9IHRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgIHRoaXMuVHdlZW5DYW1lcmEoX3BvcywgdHJ1ZSwgMC40KTtcclxuICB9LFxyXG5cclxuICBUZW1wQ2hlY2tTcGFjZShfcm9sbGluZykge1xyXG4gICAgdmFyIHRlbXBjb3VudGVyID0gMDtcclxuICAgIHZhciB0ZW1wY291bnRlcjIgPSAwO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICB0ZW1wY291bnRlcjIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGVtcGNvdW50ZXIyIC0gMSA8IDApIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcInN0YXJ0aW5nIGZyb20gb2JsaXZpb25cIik7XHJcbiAgICAgIHRlbXBjb3VudGVyID0gdGVtcGNvdW50ZXIyICsgX3JvbGxpbmcgLSAxO1xyXG4gICAgICB2YXIgZGljZXRvYmUgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIgKyBkaWNldG9iZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZW1wY291bnRlciA9IHRlbXBjb3VudGVyMiArIF9yb2xsaW5nO1xyXG4gICAgICB2YXIgZGljZXRvYmUgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIgKyBkaWNldG9iZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUm9sbERpY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICB2YXIgRGljZTE7XHJcbiAgICAgIHZhciBEaWNlMjtcclxuICAgICAgaWYgKF9pc1Rlc3QgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgRGljZTEgPSBwYXJzZUludChfZGljZWlucHV0MSk7XHJcbiAgICAgICAgRGljZTIgPSBwYXJzZUludChfZGljZWlucHV0Mik7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IHRydWUgJiYgX2lzVGVzdCkge1xyXG4gICAgICAgIERpY2UxID0gNTtcclxuICAgICAgICBEaWNlMiA9IDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuICAgICAgICBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDEgPT0gRGljZTEpIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMiA9PSBEaWNlMikgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICAgICAgUHJldmlvdXNEaWNlUm9sbDEgPSBEaWNlMTtcclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsMiA9IERpY2UyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB2YXIgRGljZTE9MjA7XHJcbiAgICAgIC8vIHZhciBEaWNlMj0xO1xyXG5cclxuICAgICAgRGljZVJvbGwgPSBEaWNlMSArIERpY2UyO1xyXG4gICAgICB2YXIgX25ld1JvbGwgPSB7IGRpY2UxOiBEaWNlMSwgZGljZTI6IERpY2UyIH07XHJcbiAgICAgIC8vRGljZVJvbGw9MjM7XHJcbiAgICAgIC8vdGhpcy5UZW1wQ2hlY2tTcGFjZShEaWNlUm9sbCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZGljZSBudW1iZXI6IFwiICsgRGljZVJvbGwgKyBcIiwgRGljZTE6XCIgKyBEaWNlMSArIFwiLCBEaWNlMjpcIiArIERpY2UyKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMywgX25ld1JvbGwpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJvbGxPbmVEaWNlKCkge1xyXG4gICAgdmFyIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGw1ID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIFByZXZpb3VzRGljZVJvbGw1ID0gRGljZTE7XHJcblxyXG4gICAgcmV0dXJuIERpY2UxO1xyXG4gIH0sXHJcblxyXG4gIFJvbGxUd29EaWNlcygpIHtcclxuICAgIHZhciBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgdmFyIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGwzID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIGlmIChQcmV2aW91c0RpY2VSb2xsNCA9PSBEaWNlMikgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMyA9IERpY2UxO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDQgPSBEaWNlMjtcclxuXHJcbiAgICByZXR1cm4gRGljZTEgKyBEaWNlMjtcclxuICB9LFxyXG5cclxuICBQb3B1bGF0ZURlY2tzQXJyYXkoX2lzQmlnQnVzaW5lc3MgPSBmYWxzZSwgX2lzTG9zc2VzID0gZmFsc2UsIF9pc01hcmtldGluZyA9IGZhbHNlLCBfaXNXaWxkQ2FyZCA9IGZhbHNlLCBfZGF0YSA9IG51bGwpIHtcclxuICAgIC8vIEJpZ0J1c2luZXNzQXJyYXkgPSBbXTtcclxuICAgIC8vIExvc3Nlc0FycmF5ID0gW107XHJcbiAgICAvLyBNYXJrZXRpbmdBcnJheSA9IFtdO1xyXG4gICAgLy8gV2lsZENhcmRBcnJheSA9IFtdO1xyXG4gICAgLy8gQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgLy8gTG9zc2VzQXJyYXlDb3VudGVyID0gMDtcclxuICAgIC8vIE1hcmtldGluZ0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAvLyBXaWxkQ2FyZEFycmF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgaWYgKF9pc0JpZ0J1c2luZXNzKSB7XHJcbiAgICAgIGlmIChfZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheSA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTRdO1xyXG5cclxuICAgICAgICBCaWdCdXNpbmVzc0FycmF5LnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKEJpZ0J1c2luZXNzQXJyYXkpO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IEJpZ0J1c2luZXNzQXJyYXksIExvc3NBcnJheTogbnVsbCwgTWFya2V0QXJyYXk6IG51bGwsIFdpbGRBcnJ5YTogbnVsbCB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTksIF90ZW1wRGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2lzTG9zc2VzKSB7XHJcbiAgICAgIGlmIChfZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgTG9zc2VzQXJyYXkgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0XTtcclxuXHJcbiAgICAgICAgTG9zc2VzQXJyYXkuc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coTG9zc2VzQXJyYXkpO1xyXG4gICAgICAgIExvc3Nlc0FycmF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBudWxsLCBMb3NzQXJyYXk6IExvc3Nlc0FycmF5LCBNYXJrZXRBcnJheTogbnVsbCwgV2lsZEFycnlhOiBudWxsIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxOSwgX3RlbXBEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNNYXJrZXRpbmcpIHtcclxuICAgICAgaWYgKF9kYXRhID09IG51bGwpIHtcclxuICAgICAgICBNYXJrZXRpbmdBcnJheSA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTRdO1xyXG5cclxuICAgICAgICBNYXJrZXRpbmdBcnJheS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhNYXJrZXRpbmdBcnJheSk7XHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXlDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IG51bGwsIExvc3NBcnJheTogbnVsbCwgTWFya2V0QXJyYXk6IE1hcmtldGluZ0FycmF5LCBXaWxkQXJyeWE6IG51bGwgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE5LCBfdGVtcERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9pc1dpbGRDYXJkKSB7XHJcbiAgICAgIGlmIChfZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgV2lsZENhcmRBcnJheSA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsMTIsMTMsMTRdO1xyXG5cclxuICAgICAgICBXaWxkQ2FyZEFycmF5LnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFdpbGRDYXJkQXJyYXkpO1xyXG4gICAgICAgIFdpbGRDYXJkQXJyYXlDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IG51bGwsIExvc3NBcnJheTogbnVsbCwgTWFya2V0QXJyYXk6IG51bGwsIFdpbGRBcnJ5YTogV2lsZENhcmRBcnJheSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTksIF90ZW1wRGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICBpZiAoX2RhdGEuQmlnQXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXkgPSBfZGF0YS5CaWdBcnJheTtcclxuICAgICAgICBjb25zb2xlLmxvZyhCaWdCdXNpbmVzc0FycmF5KTtcclxuICAgICAgICBCaWdCdXNpbmVzc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfZGF0YS5Mb3NzQXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIExvc3Nlc0FycmF5ID0gX2RhdGEuTG9zc0FycmF5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKExvc3Nlc0FycmF5KTtcclxuICAgICAgICBMb3NzZXNBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2RhdGEuTWFya2V0QXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5ID0gX2RhdGEuTWFya2V0QXJyYXk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTWFya2V0aW5nQXJyYXkpO1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfZGF0YS5XaWxkQXJyeWEgIT0gbnVsbCkge1xyXG4gICAgICAgIFdpbGRDYXJkQXJyYXkgPSBfZGF0YS5XaWxkQXJyeWE7XHJcbiAgICAgICAgY29uc29sZS5sb2coV2lsZENhcmRBcnJheSk7XHJcbiAgICAgICAgV2lsZENhcmRBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2V0QmlnQnVzaW5lc3NJbmRleChfaW5kZXgpIHtcclxuICAgIHZhciBfdmFsID0gLTE7XHJcbiAgICBpZiAoQmlnQnVzaW5lc3NBcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChCaWdCdXNpbmVzc0FycmF5Q291bnRlciA8IEJpZ0J1c2luZXNzQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgX3ZhbCA9IEJpZ0J1c2luZXNzQXJyYXlbQmlnQnVzaW5lc3NBcnJheUNvdW50ZXJdO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyKys7XHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IHRydWUsIExvc3NBcnJheTogZmFsc2UsIE1hcmtldEFycmF5OiBmYWxzZSwgV2lsZEFycnlhOiBmYWxzZSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjAsIF90ZW1wRGF0YSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkodHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgbnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0TG9zc2VzSW5kZXgoX2luZGV4KSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKExvc3Nlc0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKExvc3Nlc0FycmF5Q291bnRlciA8IExvc3Nlc0FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBMb3NzZXNBcnJheVtMb3NzZXNBcnJheUNvdW50ZXJdO1xyXG4gICAgICAgIExvc3Nlc0FycmF5Q291bnRlcisrO1xyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBmYWxzZSwgTG9zc0FycmF5OiB0cnVlLCBNYXJrZXRBcnJheTogZmFsc2UsIFdpbGRBcnJ5YTogZmFsc2UgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIwLCBfdGVtcERhdGEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIEdldE1hcmtldGluZ0luZGV4KF9pbmRleCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChNYXJrZXRpbmdBcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChNYXJrZXRpbmdBcnJheUNvdW50ZXIgPCBNYXJrZXRpbmdBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gTWFya2V0aW5nQXJyYXlbTWFya2V0aW5nQXJyYXlDb3VudGVyXTtcclxuICAgICAgICBNYXJrZXRpbmdBcnJheUNvdW50ZXIrKztcclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogZmFsc2UsIExvc3NBcnJheTogZmFsc2UsIE1hcmtldEFycmF5OiB0cnVlLCBXaWxkQXJyeWE6IGZhbHNlIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyMCwgX3RlbXBEYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkoZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3ZhbDtcclxuICB9LFxyXG5cclxuICBHZXRXaWxkQ2FyZEluZGV4KF9pbmRleCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChXaWxkQ2FyZEFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKFdpbGRDYXJkQXJyYXlDb3VudGVyIDwgV2lsZENhcmRBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gV2lsZENhcmRBcnJheVtXaWxkQ2FyZEFycmF5Q291bnRlcl07XHJcbiAgICAgICAgV2lsZENhcmRBcnJheUNvdW50ZXIrKztcclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogZmFsc2UsIExvc3NBcnJheTogZmFsc2UsIE1hcmtldEFycmF5OiBmYWxzZSwgV2lsZEFycnlhOiB0cnVlIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyMCwgX3RlbXBEYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkoZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3ZhbDtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDb3VudGVycyhfZGF0YSA9IG51bGwpIHtcclxuICAgIGlmIChfZGF0YS5CaWdBcnJheSkge1xyXG4gICAgICBCaWdCdXNpbmVzc0FycmF5Q291bnRlcisrO1xyXG4gICAgfVxyXG4gICAgaWYgKF9kYXRhLkxvc3NBcnJheSkge1xyXG4gICAgICBMb3NzZXNBcnJheUNvdW50ZXIrKztcclxuICAgIH1cclxuICAgIGlmIChfZGF0YS5NYXJrZXRBcnJheSkge1xyXG4gICAgICBNYXJrZXRpbmdBcnJheUNvdW50ZXIrKztcclxuICAgIH1cclxuICAgIGlmIChfZGF0YS5XaWxkQXJyeWEpIHtcclxuICAgICAgV2lsZENhcmRBcnJheUNvdW50ZXIrKztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZWxlY3RSZWxhdGVkQ2FyZChfaXNCaWdCdXNpbmVzcyA9IGZhbHNlLCBfaXNMb3NzZXMgPSBmYWxzZSwgX2lzTWFya2V0aW5nID0gZmFsc2UsIF9pc1dpbGRDYXJkID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNCaWdCdXNpbmVzcykge1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldEJpZ0J1c2luZXNzSW5kZXgoKTtcclxuICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0QmlnQnVzaW5lc3NJbmRleCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRCaWdCdXNpbmVzc0luZGV4KCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0QmlnQnVzaW5lc3NJbmRleCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2lzTG9zc2VzKSB7XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0TG9zc2VzSW5kZXgoKTtcclxuICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0TG9zc2VzSW5kZXgoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0TG9zc2VzSW5kZXgoKTtcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRMb3NzZXNJbmRleCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2lzTWFya2V0aW5nKSB7XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0TWFya2V0aW5nSW5kZXgoKTtcclxuICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0TWFya2V0aW5nSW5kZXgoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0TWFya2V0aW5nSW5kZXgoKTtcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRNYXJrZXRpbmdJbmRleCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2lzV2lsZENhcmQpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRXaWxkQ2FyZEluZGV4KCk7XHJcbiAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLkdldFdpbGRDYXJkSW5kZXgoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0V2lsZENhcmRJbmRleCgpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgaW5kZXggPSB0aGlzLkdldFdpbGRDYXJkSW5kZXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY2FsbFVwb25DYXJkKCkge1xyXG4gICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgIGlmIChSb2xsQ291bnRlciA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICB2YXIgX3NwYWNlSUQgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgICAgaWYgKF9zcGFjZUlEICE9IDYgJiYgX3NwYWNlSUQgIT0gNykge1xyXG4gICAgICAgICAgLy82IG1lYW5zIHBheWRheSBhbmQgNyBtZWFucyBkb3VibGUgcGF5ZGF5LCA5IG1lYW5zIHNlbGwgc3BhY2VcclxuICAgICAgICAgIHZhciBSYW5kb21DYXJkID0gdGhpcy5nZXRSYW5kb20oMCwgMTUpO1xyXG5cclxuICAgICAgICAgIGlmIChfc3BhY2VJRCA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIGJpZyBidXNpbmVzcyBjYXJkc1xyXG4gICAgICAgICAgICBSYW5kb21DYXJkID0gdGhpcy5TZWxlY3RSZWxhdGVkQ2FyZCh0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3NwYWNlSUQgPT0gNSkge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIGxvc3NlcyBjYXJkc1xyXG4gICAgICAgICAgICBSYW5kb21DYXJkID0gdGhpcy5TZWxlY3RSZWxhdGVkQ2FyZChmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3NwYWNlSUQgPT0gMykge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIG1hcmtldGluZyBjYXJkc1xyXG4gICAgICAgICAgICBSYW5kb21DYXJkID0gdGhpcy5TZWxlY3RSZWxhdGVkQ2FyZChmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3NwYWNlSUQgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIHdpbGQgY2FyZHNcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHRoaXMuU2VsZWN0UmVsYXRlZENhcmQoZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihfc3BhY2VJRCk7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJcclxuICAgICAgICAgICAgaWYgKF9zcGFjZUlEID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgLy8gaWYgcGxheWVyIGxhbmRlZCBvbiBmaW5pc2ggc3BhY2VcclxuICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIFNlbmRpbmdEYXRhID0geyByYW5kb21DYXJkOiBSYW5kb21DYXJkLCBjb3VudGVyOiBSb2xsQ291bnRlciB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgICAgICBpZiAoX3NwYWNlSUQgPT0gMTIpIHtcclxuICAgICAgICAgICAgICAvLyBpZiBwbGF5ZXIgbGFuZGVkIG9uIGZpbmlzaCBzcGFjZVxyXG4gICAgICAgICAgICAgIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyA1O1xyXG4gICAgICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YSA9IHsgcmFuZG9tQ2FyZDogUmFuZG9tQ2FyZCwgY291bnRlcjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNCb3QgJiYgQm90R2FtZU92ZXIpIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNCb3QgJiYgdXNlckdhbWVPdmVyKSB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImNvbXBsZXRlIHR1cm4gaXMgY2FsbGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQodHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY29tcGxldGVDYXJkVHVybigpIHtcclxuICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgIGNvbnNvbGUubG9nKFwibGFuZGVkIG9uIHBheSBkYXkgb3IgZG91YmxlIHBheSBkYXkgYW5kIHdvcmsgaXMgZG9uZSBzbyBjaGFuZ2luZyB0dXJuXCIpO1xyXG4gICAgdGhpcy5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgfSxcclxuXHJcbiAgQ2FsbEdhbWVDb21wbGV0ZShfaXNCb3QgPSBmYWxzZSwgX2ZvcmNlR2FtZU92ZXIgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAvLyBpZiAoX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgLy8gICAgIHRoaXMuVHVybk51bWJlciA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG4gICAgICAvLyB9XHJcblxyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU2NvcmUgPSAwO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJwbGF5ZXIgaXMgbm90IGFjdGl2ZSByZXR1cm5pbmdcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjYWxjdWxhdGluZy4uLi5cIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImFnbWUgaXMgbm90IGZpbmlzaGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLmlzR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICB2YXIgX2Nhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICAgIHZhciBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgIHZhciBCTUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgICAgdmFyIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIGxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgICAgbG9hbkFtb3VudCArPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgX2dvbGQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50O1xyXG4gICAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgICB2YXIgX2RpY2VSYW5kb20gPSB0aGlzLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgdmFyIE9uY2VPclNoYXJlID0gX2RpY2VSYW5kb20gKiAxMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgICB2YXIgU3RvY2tDYXNoID0gT25jZU9yU2hhcmUgKiBfc3RvY2tzO1xyXG5cclxuICAgICAgICAgIHZhciBCTUNhc2ggPSAoQk1BbW91bnQgKyBCTUxvY2F0aW9ucykgKiAxNTAwMDA7XHJcblxyXG4gICAgICAgICAgdmFyIEhNQ2FzaCA9IDA7XHJcbiAgICAgICAgICBpZiAoSE1BbW91bnQgPT0gMSkgSE1DYXNoID0gNjAwMDA7XHJcbiAgICAgICAgICBlbHNlIGlmIChITUFtb3VudCA9PSAyKSBITUNhc2ggPSAyNTAwMCArIDYwMDAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMykgSE1DYXNoID0gMjUwMDAgKyAyNTAwMCArIDYwMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBUb3RhbEFzc2V0cyA9IF9jYXNoICsgQk1DYXNoICsgSE1DYXNoICsgR29sZENhc2ggKyBTdG9ja0Nhc2ggLSBsb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gVG90YWxBc3NldHM7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxIQkNhc2ggPSBITUNhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxCTUNhc2ggPSBCTUNhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxHb2xkQ2FzaCA9IEdvbGRDYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU3RvY2tzQ2FzaCA9IFN0b2NrQ2FzaDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvYW5CYWxhbmNlID0gbG9hbkFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XSk7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJEYXRhIHB1c2hlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IF9wbGF5ZXJJbmRleCA9IDA7IF9wbGF5ZXJJbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBfcGxheWVySW5kZXgrKykge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfY2FzaCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHZhciBITUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgdmFyIEJNQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUxvY2F0aW9ucyA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuXHJcbiAgICAgICAgdmFyIGxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIGxvYW5BbW91bnQgKz0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIF9nb2xkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudDtcclxuICAgICAgICB2YXIgX3N0b2NrcyA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50O1xyXG5cclxuICAgICAgICB2YXIgX2RpY2VSYW5kb20gPSB0aGlzLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIHZhciBPbmNlT3JTaGFyZSA9IF9kaWNlUmFuZG9tICogMTAwMDtcclxuXHJcbiAgICAgICAgdmFyIEdvbGRDYXNoID0gT25jZU9yU2hhcmUgKiBfZ29sZDtcclxuICAgICAgICB2YXIgU3RvY2tDYXNoID0gT25jZU9yU2hhcmUgKiBfc3RvY2tzO1xyXG5cclxuICAgICAgICB2YXIgQk1DYXNoID0gKEJNQW1vdW50ICsgQk1Mb2NhdGlvbnMpICogMTUwMDAwO1xyXG5cclxuICAgICAgICB2YXIgSE1DYXNoID0gMDtcclxuICAgICAgICBpZiAoSE1BbW91bnQgPT0gMSkgSE1DYXNoID0gNjAwMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMikgSE1DYXNoID0gMjUwMDAgKyA2MDAwMDtcclxuICAgICAgICBlbHNlIGlmIChITUFtb3VudCA9PSAzKSBITUNhc2ggPSAyNTAwMCArIDI1MDAwICsgNjAwMDA7XHJcblxyXG4gICAgICAgIHZhciBUb3RhbEFzc2V0cyA9IF9jYXNoICsgQk1DYXNoICsgSE1DYXNoICsgR29sZENhc2ggKyBTdG9ja0Nhc2ggLSBsb2FuQW1vdW50O1xyXG5cclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTY29yZSA9IFRvdGFsQXNzZXRzO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEhCQ2FzaCA9IEhNQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxCTUNhc2ggPSBCTUNhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsR29sZENhc2ggPSBHb2xkQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTdG9ja3NDYXNoID0gU3RvY2tDYXNoO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvYW5CYWxhbmNlID0gbG9hbkFtb3VudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoX2RhdGEpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNiwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE2LCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgU3luY0dhbWVPdmVyKF9VSUQpIHtcclxuICAgIHZhciBpbmZvVGV4dCA9IFwiXCI7XHJcbiAgICB2YXIgc3RhdHVzVGV4dCA9IFwiXCI7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgaWYgKCFHYW1lQ29tcGxldGVkKSB7XHJcbiAgICAgICAgR2FtZUNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0RGF0YSgpO1xyXG4gICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgdmFyIE15RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdmFyIF9pbmRleCA9IC0xO1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQgPT0gX1VJRCkge1xyXG4gICAgICAgICAgICAgIF9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc3RhdHVzVGV4dCA9IFwiR2FtZSB3b24gYnkgXCIgKyBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAgICAgLy95b3Ugd29uXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkNvbmdyYXRzISB5b3UgaGF2ZSB3b24gdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgX2N1cnJlbnRDYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgICAgICAgICB2YXIgX3RvdGFsID0gX2N1cnJlbnRDYXNoICsgcGFyc2VJbnQoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gX3RvdGFsLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3dvbiA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uKTtcclxuICAgICAgICAgICAgX3dvbiA9IF93b24gKyAxO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbiA9IF93b24udG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKC0xLCBfd29uLCAtMSk7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3lvdSBsb3NlXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIlVuZm9ydHVuYXRlbHkhIHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy93aXRoIGJvdFxyXG4gICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgIHZhciBNeURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgY29uc29sZS5sb2coTXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMF0uR2FtZU92ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKE15RGF0YS5QbGF5ZXJVSUQgPT0gX1VJRCkge1xyXG4gICAgICAgIC8veW91IHdvblxyXG4gICAgICAgIHN0YXR1c1RleHQgPSBcIkNvbmdyYXRzISB5b3UgaGF2ZSB3b24gdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLkNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJPdGhlciBQbGF5ZXIgRWFybmVkIENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1sxXS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgIHZhciBfY3VycmVudENhc2ggPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCk7XHJcbiAgICAgICAgdmFyIF90b3RhbCA9IF9jdXJyZW50Q2FzaCArIHBhcnNlSW50KE15RGF0YS5Ub3RhbFNjb3JlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IF90b3RhbC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICB2YXIgX3dvbiA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uKTtcclxuICAgICAgICBfd29uID0gX3dvbiArIDE7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb24gPSBfd29uLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVXBkYXRlVXNlckRhdGEoLTEsIF93b24sIC0xKTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8veW91IGxvc2VcclxuXHJcbiAgICAgICAgc3RhdHVzVGV4dCA9IFwiVW5mb3J0dW5hdGVseSEgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIjtcclxuICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiQnJpY2sgQW5kIE1vcnRhciBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEJNQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkxvYW4gQmFsYW5jZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxMb2FuQmFsYW5jZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIk90aGVyIFBsYXllciBFYXJuZWQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzFdLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIjtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0dhbWVDb21wbGV0ZURhdGEoX2RhdGEpIHtcclxuICAgIHZhciBfaXNCb3QgPSBfZGF0YS5Cb3Q7XHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSh0cnVlLCBmYWxzZSk7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiR2FtZSBvdmVyLCBjYWxjdWxhdGluZyB0b3RhbCBjYXNoLi4uXCIsIDE1MDAsIGZhbHNlKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG5cclxuICAgICAgICB2YXIgbWF4ID0gLTE7XHJcbiAgICAgICAgdmFyIFNlbGVjdGVkSW5kID0gMDtcclxuICAgICAgICB2YXIgU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgaWYgKF92YWx1ZSA+IG1heCkge1xyXG4gICAgICAgICAgICBTZWxlY3RlZEluZCA9IGluZGV4O1xyXG4gICAgICAgICAgICBtYXggPSBfdmFsdWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coX3ZhbHVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUudHJhY2UoXCJnYW1lIHdvbiBieSBwbGF5ZXIgaWQ6IFwiICsgU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLlBsYXllclVJRCk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJHYW1lIG92ZXIsIGNhbGN1bGF0aW5nIHRvdGFsIGNhc2guLi5cIiwgMTUwMCwgZmFsc2UpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dE9ubHkoKTtcclxuXHJcbiAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgICAgICB2YXIgbWF4ID0gLTE7XHJcbiAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQgPSAwO1xyXG4gICAgICAgICAgdmFyIFNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFNlc3Npb25EYXRhKTtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChTZXNzaW9uRGF0YVtpbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChfdmFsdWUgPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIFNlbGVjdGVkSW5kID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBtYXggPSBfdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKF92YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLnRyYWNlKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIiArIFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIH0sIDE1MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgQm90OiBfaXNCb3QgfTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0dhbWVDb21wbGV0ZURhdGEoX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEdhbWVPdmVyKF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBpZiAoX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgLy8gICBpZiAoTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLklzQWN0aXZlID09IGZhbHNlIHx8IHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNvbXBsZXRlZDogXCIgKyBwbGF5ZXJjb21wbGV0ZWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGdhbWVpbmZvIGxlbmd0aDogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCk7XHJcbiAgICAgICAgaWYgKHBsYXllcmNvbXBsZXRlZCA+PSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCB8fCBfZm9yY2VHYW1lT3Zlcikge1xyXG4gICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtXHJcbiAgICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICAgIGlmIChfZm9yY2VHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpIEJvdEdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgZWxzZSB1c2VyR2FtZU92ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJ1c2VyZ2FtZW92ZXI6IFwiICsgdXNlckdhbWVPdmVyKTtcclxuICAgICAgY29uc29sZS5sb2coXCJib3RnYW1lb3ZlcjogXCIgKyBCb3RHYW1lT3Zlcik7XHJcbiAgICAgIC8vIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSh0cnVlKTtcclxuICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZCA9IDA7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoTWFpblNlc3Npb25EYXRhW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwbGF5ZXJjb21wbGV0ZWQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpIHtcclxuICAgICAgICAvL2dhbWVjb21wbGV0ZWQgb24gYWxsIHN5c3RlbXNcclxuICAgICAgICBCb3RHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgdXNlckdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBTdGFydERpY2VSb2xsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoUm9sbENvdW50ZXIgPj0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkdhbWVvdmVyXCIpO1xyXG4gICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuR2FtZU92ZXIoZmFsc2UpO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgIERpY2VUZW1wID0gRGljZVRlbXAgKyAxO1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLlR3ZWVuUGxheWVyKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldFJhbmRvbTogZnVuY3Rpb24gKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gIH0sXHJcblxyXG4gIFR3ZWVuQ2FtZXJhOiBmdW5jdGlvbiAoX3BvcywgaXNab29tLCB0aW1lKSB7XHJcbiAgICBjYy50d2Vlbih0aGlzLkNhbWVyYU5vZGUpXHJcbiAgICAgIC50byh0aW1lLCB7IHBvc2l0aW9uOiBjYy52MihfcG9zLngsIF9wb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc1pvb20pIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgZWxzZSB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgfSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgWm9vbUNhbWVyYUluKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkNhbWVyYS56b29tUmF0aW8gPCAyKSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gdGhpcy5DYW1lcmEuem9vbVJhdGlvICsgMC4wMztcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IDI7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tQYXlEYXlDb25kaXRpb25zKF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICBpZiAoUm9sbENvdW50ZXIgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNikge1xyXG4gICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlciA9IFBhc3NlZFBheURheUNvdW50ZXIgKyAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDcpIHtcclxuICAgICAgICBEb3VibGVQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgIERvdWJsZVBheURheUNvdW50ZXIrKztcclxuICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgICBfbmV4dFR1cm5oYWxmUGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuSGFsZlBheURheTtcclxuXHJcbiAgICBpZiAoUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkgJiYgIV9uZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSwgX2lzQm90KTtcclxuICAgIH0gZWxzZSBpZiAoRG91YmxlUGF5RGF5IHx8IChQYXNzZWRQYXlEYXkgJiYgX25leHRUdXJuRG91YmxlUGF5KSkge1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbih0cnVlLCBfaXNCb3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBab29tQ2FtZXJhT3V0T25seSgpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5DYW1lcmEuem9vbVJhdGlvID49IDEpIHtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IHRoaXMuQ2FtZXJhLnpvb21SYXRpbyAtIDAuMDM7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMTtcclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIFpvb21DYW1lcmFPdXQoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA+PSAxKSB7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSB0aGlzLkNhbWVyYS56b29tUmF0aW8gLSAwLjAzO1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMTtcclxuICAgICAgICAvLyBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbigwKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgJiYgIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCAmJiAhdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnModGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgIC8vcmVhbCBwbGF5ZXJcclxuICAgICAgICAgIGlmIChQbGF5ZXJMZWZ0KSB7XHJcbiAgICAgICAgICAgIC8vIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgUGxheWVyTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucygpO1xyXG4gICAgICAgICAgZWxzZSB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIFR3ZWVuUGxheWVyOiBmdW5jdGlvbiAoTm9kZSwgVG9Qb3MpIHtcclxuICAgIHZhciBzcGVlZCA9IDAuNDtcclxuICAgIGlmIChfaXNUZXN0KSBzcGVlZCA9IDAuMDQ7XHJcblxyXG4gICAgY2MudHdlZW4oTm9kZSkgLy8wLjRcclxuICAgICAgLnRvKHNwZWVkLCB7IHBvc2l0aW9uOiBjYy52MihUb1Bvcy54LCBUb1Bvcy55KSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKERpY2VUZW1wIDwgRGljZVJvbGwpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKERpY2VUZW1wICsgXCIgXCIgKyBSb2xsQ291bnRlcik7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpIHtcclxuICAgICAgICAgICAgICBpZiAoIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2IHx8XHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3XHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJvdCBnYW1lIGlzIG92ZXJcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmICghdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2IHx8XHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3XHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLyBjb25zb2xlLmVycm9yKFBhc3NlZFBheURheUNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIgZ2FtZSBpcyBvdmVyIHNraXBwaW5nXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coUGFzc2VkUGF5RGF5KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYpIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNykge1xyXG4gICAgICAgICAgICAgICAgICBEb3VibGVQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIGZpbmlzaGVkIGZvcjogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoUm9sbENvdW50ZXIgPT0gMTMpIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyAyMjtcclxuICAgICAgICAgICAgZWxzZSBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyAxO1xyXG4gICAgICAgICAgICBEaWNlVGVtcCA9IERpY2VSb2xsO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vRGljZVRlbXA9RGljZVRlbXArMTtcclxuICAgICAgICAgIC8vICBjb25zb2xlLmxvZyhEaWNlVGVtcCArIFwiIFwiICsgUm9sbENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgLy90aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBfbmV3cG9zID0gY2MuVmVjMigwLCAwKTtcclxuICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcywgZmFsc2UsIDAuNik7IC8vem9vbW91dFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgLy9ydWxlcyBpbXBsbWVudGF0aW9uIGR1cmluZyB0dXJuICh0dXJuIGRlY2lzaW9ucylcclxuXHJcbiAgVG9nZ2xlUGF5RGF5KF9zdDEsIF9TdDIpIHtcclxuICAgIFBhc3NlZFBheURheSA9IF9zdDE7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfU3QyO1xyXG5cclxuICAgIGlmICghX3N0MSkge1xyXG4gICAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9TdDIpIHtcclxuICAgICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5jcmVhc2VEb3VibGVQYXlEYXkoKSB7XHJcbiAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgfSxcclxuXHJcbiAgRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKGFtb3VudCwgX2luZGV4LCBfbG9jYXRpb25OYW1lLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoIDwgMykge1xyXG4gICAgICBpZiAoIV9pc0NhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCAtIGFtb3VudDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCArIDE7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5wdXNoKF9sb2NhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLCAxMDAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgIH0sIDEyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2ggdG8gZXhwYW5kIHRoaXMgYnVzaW5lc3MsIGNhc2ggbmVlZGVkICQgXCIgKyBhbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX0dpdmVuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIF9HaXZlbkNhc2ggPSBfR2l2ZW5DYXNoIC0gYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ICsgMTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsIDEwMDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIiArIGFtb3VudCArIFwiLCBDYXNoIEdpdmVuICRcIiArIF9HaXZlbkNhc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGxvY2F0aW9uc1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChwYXJzZUludCh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIC8vdGhpcyBtZWFucyB0aGVyZSBpcyBicmljayBhbmQgbW9ydGFyIGluIGxpc3RcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRCdXNpbmVzc0luZGV4KGkpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldENhcmRGdW5jdGlvbmFsaXR5KF9pc0NhcmRGdW5jdGlvbmFsaXR5KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRHaXZlbkNhc2goX0dpdmVuQ2FzaCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlJlc2V0RWRpdEJveCgpO1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhCdXNpbmVzc0xvY2F0aW9uTm9kZXMpO1xyXG4gICAgcmV0dXJuIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7XHJcbiAgfSxcclxuXHJcbiAgRGVzdHJveUdlbmVyYXRlZE5vZGVzKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbihfbmFtZSwgX1NoYXJlQW1vdW50LCBfaXNBZGRpbmcpIHtcclxuICAgIGlmIChfaXNBZGRpbmcpIHtcclxuICAgICAgdmFyIF9zdG9jayA9IG5ldyBTdG9ja0luZm8oKTtcclxuICAgICAgX3N0b2NrLkJ1c2luZXNzTmFtZSA9IF9uYW1lO1xyXG4gICAgICBfc3RvY2suU2hhcmVBbW91bnQgPSBfU2hhcmVBbW91bnQ7XHJcblxyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZlN0b2Nrcy5wdXNoKF9zdG9jayk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfZm9yU2VsZWN0ZWRCdXNpbmVzcyA9IGZhbHNlLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMCwgSEJBbW91bnQgPSAwLCBCTUFtb3VudCA9IDAsIEJNTG9jYXRpb25zID0gMCkge1xyXG4gICAgaWYgKF9mb3JTZWxlY3RlZEJ1c2luZXNzKSB7XHJcbiAgICAgIHZhciBfdGl0bGUgPSBcIlBheURheVwiO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBfaXNCb3QsIF9mb3JTZWxlY3RlZEJ1c2luZXNzLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4LCBIQkFtb3VudCwgQk1BbW91bnQsIEJNTG9jYXRpb25zLCAxLCAwLCBfbmV4dFR1cm5oYWxmUGF5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChEb3VibGVQYXlEYXkgJiYgUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBfc2tpcE5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk7XHJcbiAgICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXk7XHJcbiAgICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk7XHJcblxyXG4gICAgICBpZiAoX3NraXBOZXh0UGF5ZGF5KSB7XHJcbiAgICAgICAgLy9pZiBwcmV2aW91c2x5IHNraXAgcGF5ZGF5IHdhcyBzdG9yZWQgYnkgYW55IGNhcmRcclxuICAgICAgICB0aGlzLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG5cclxuICAgICAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIFBheURheS5cIiwgMTYwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgIH0sIDE2NTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIFBheURheS5cIik7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBfdGl0bGUgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZiAoX2lzRG91YmxlUGF5RGF5KSBfdGl0bGUgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgIGVsc2UgX3RpdGxlID0gXCJQYXlEYXlcIjtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSwgX2lzRG91YmxlUGF5RGF5LCBfc2tpcEhNTmV4dFBheWRheSwgX3NraXBCTU5leHRQYXlkYXksIF9pc0JvdCwgZmFsc2UsIDAsIDAsIDAsIDAsIFBhc3NlZFBheURheUNvdW50ZXIsIERvdWJsZVBheURheUNvdW50ZXIsIF9uZXh0VHVybmhhbGZQYXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQmFua3J1cHRfVHVybkRlY2lzaW9uKCkge1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50ICs9IDE7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCk7XHJcbiAgfSxcclxuXHJcbiAgU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50LCBfdUlEKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgQ2FzaDogX2Ftb3VudCwgSUQ6IF91SUQgfSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMywgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2RhdGEpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IF9kYXRhLkRhdGEuQ2FzaDtcclxuICAgICAgdmFyIF9pRCA9IF9kYXRhLkRhdGEuSUQ7XHJcblxyXG4gICAgICB2YXIgX215SW5kZXggPSB0aGlzLkdldE15SW5kZXgoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5QbGF5ZXJVSUQgPT0gX2lEKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLmlzR2FtZUZpbmlzaGVkID09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlRvdGFsU2NvcmUgKz0gX2Ftb3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgcmVjZWl2ZWQgcHJvZml0IG9mICRcIiArIF9hbW91bnQgKyBcIiBmcm9tIG90aGVyIHBsYXllci5cIiwgMjgwMCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBDYXJkcyBSdWxlc1xyXG4gIFRvZ2dsZURvdWJsZVBheU5leHRUdXJuKF9zdGF0ZSkge1xyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5ID0gX25leHRUdXJuRG91YmxlUGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUhhbGZQYXlOZXh0VHVybihfc3RhdGUpIHtcclxuICAgIF9uZXh0VHVybmhhbGZQYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5IYWxmUGF5RGF5ID0gX25leHRUdXJuaGFsZlBheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwTmV4dFR1cm4oX3N0YXRlKSB7XHJcbiAgICBfc2tpcE5leHRUdXJuID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybiA9IF9za2lwTmV4dFR1cm47XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpIHtcclxuICAgIF9za2lwTmV4dFBheWRheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheSA9IF9za2lwTmV4dFBheWRheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpIHtcclxuICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXkgPSBfc2tpcEhNTmV4dFBheWRheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKF9zdGF0ZSkge1xyXG4gICAgX3NraXBCTU5leHRQYXlkYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheSA9IF9za2lwQk1OZXh0UGF5ZGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVR1cm5Qcm9ncmVzcyhfc3RhdGUpIHtcclxuICAgIFR1cm5JblByb2dyZXNzID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFJldHVyblR1cm5Qcm9ncmVzcygpIHtcclxuICAgIHJldHVybiBUdXJuSW5Qcm9ncmVzcztcclxuICB9LFxyXG5cclxuICBMb3NlQWxsTWFya2V0aW5nTW9uZXkoKSB7XHJcbiAgICB2YXIgX2xvc2VBbW91bnQgPSAtMTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID4gMCkge1xyXG4gICAgICBfbG9zZUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX2xvc2VBbW91bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfbG9zZUFtb3VudDtcclxuICB9LFxyXG5cclxuICBNdWx0aXBseU1hcmtldGluZ01vbmV5KF9tdWx0aXBsaWVyKSB7XHJcbiAgICB2YXIgX2Ftb3VudEluY3JlYXNlZCA9IC0xO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPiAwKSB7XHJcbiAgICAgIF9hbW91bnRJbmNyZWFzZWQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ICo9IF9tdWx0aXBsaWVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX2Ftb3VudEluY3JlYXNlZCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9hbW91bnRJbmNyZWFzZWQ7XHJcbiAgfSxcclxuXHJcbiAgR2V0TWFya2V0aW5nTW9uZXkoX3Byb2ZpdCkge1xyXG4gICAgdmFyIF9hbW91bnQgPSAtMTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID4gMCkge1xyXG4gICAgICBfcHJvZml0ID0gX3Byb2ZpdCAvIDEwMDtcclxuICAgICAgX2Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgKj0gX3Byb2ZpdDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfYW1vdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2Ftb3VudDtcclxuICB9LFxyXG5cclxuICBHZXRWb2NhYnVsYXJ5UXVlc3Rpb25zSW5kZXgoKSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKFZvY2FidWxhcnlRdWVzdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPCBWb2NhYnVsYXJ5UXVlc3Rpb25zLmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBWb2NhYnVsYXJ5UXVlc3Rpb25zW1ZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyXTtcclxuICAgICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlcisrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X1ZvY2FidWxhcnkoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfVm9jYWJ1bGFyeSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0RXN0YWJsaXNobWVudFF1ZXN0aW9uc0luZGV4KCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChFc3RhYmxpc2htZW50UXVlc3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyIDwgRXN0YWJsaXNobWVudFF1ZXN0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gRXN0YWJsaXNobWVudFF1ZXN0aW9uc1tFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlcl07XHJcbiAgICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIrKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Fc3RhYmxpc2htZW50KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X0VzdGFibGlzaG1lbnQoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Wb2NhYnVsYXJ5KF9kYXRhID0gbnVsbCkge1xyXG4gICAgaWYgKF9kYXRhID09IG51bGwpIHtcclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9ucyA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTFdO1xyXG5cclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9ucy5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coVm9jYWJ1bGFyeVF1ZXN0aW9ucyk7XHJcbiAgICAgIFZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuXHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSB7IFZvY0FycmF5OiBWb2NhYnVsYXJ5UXVlc3Rpb25zLCBFc3RBcnJheTogbnVsbCB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE4LCBfdGVtcERhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9kYXRhLlZvY0FycmF5ICE9IG51bGwpIHtcclxuICAgICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zID0gX2RhdGEuVm9jQXJyYXk7XHJcbiAgICAgICAgY29uc29sZS5sb2coVm9jYWJ1bGFyeVF1ZXN0aW9ucyk7XHJcbiAgICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X0VzdGFibGlzaG1lbnQoX2RhdGEgPSBudWxsKSB7XHJcbiAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV07XHJcblxyXG4gICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhFc3RhYmxpc2htZW50UXVlc3Rpb25zKTtcclxuICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgVm9jQXJyYXk6IG51bGwsIEVzdEFycmF5OiBFc3RhYmxpc2htZW50UXVlc3Rpb25zIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTgsIF90ZW1wRGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2RhdGEuRXN0QXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnMgPSBfZGF0YS5Fc3RBcnJheTtcclxuICAgICAgICBjb25zb2xlLmxvZyhFc3RhYmxpc2htZW50UXVlc3Rpb25zKTtcclxuICAgICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbihfZGF0YSkge1xyXG4gICAgdmFyIF9xdWVzdGlvblJlZiA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfUXVlc3Rpb25zRGF0YSgpO1xyXG4gICAgdmFyIF91c2VySUQgPSBfZGF0YS5Vc2VySUQ7XHJcbiAgICB2YXIgX3F1ZXN0aW9uSW5kZXggPSBfZGF0YS5RdWVzdGlvbjtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfZGF0YS5Vc2VySW5kZXg7XHJcbiAgICB2YXIgX2lzVm9jID0gX2RhdGEuSXNWb2M7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAgIGlmIChfaXNWb2MpIHtcclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIrKztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyKys7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF91c2VySUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSUQgbWF0Y2hlZFwiKTtcclxuXHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcblxyXG4gICAgICB2YXIgX1FkYXRhO1xyXG4gICAgICBpZiAoX2lzVm9jKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2b2NcIik7XHJcbiAgICAgICAgX1FkYXRhID0gX3F1ZXN0aW9uUmVmLlZvY2FidWxhcnlRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXhdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXN0XCIpO1xyXG4gICAgICAgIF9RZGF0YSA9IF9xdWVzdGlvblJlZi5Fc3RhYmxpc2htZW50UXVlc3Rpb25zW19xdWVzdGlvbkluZGV4XTtcclxuICAgICAgfVxyXG5cclxuICAgICAgQ29ycmVjdEFuc3dlciA9IF9RZGF0YS5Db3JyZWN0T3B0aW9uO1xyXG4gICAgICB2YXIgX21lc3NhZ2UgPSBcIkNob29zZSB0aGUgY29ycmVjdCBhbnN3ZXIuXCIgKyBcIlxcblwiICsgXCIqd3JvbmcgYW5zd2VyIHdpbGwgY29zdCB5b3UgYSBmaW5lIG9mICQ1MDAwLlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBfUWRhdGEuUXVlc3Rpb24gKyBcIlxcblwiICsgXCJBLiBcIiArIF9RZGF0YS5PcHRpb24xICsgXCJcXG5cIiArIFwiQi4gXCIgKyBfUWRhdGEuT3B0aW9uMiArIFwiXFxuXCIgKyBcIkMuIFwiICsgX1FkYXRhLk9wdGlvbjMgKyBcIlxcblwiICsgXCJELiBcIiArIF9RZGF0YS5PcHRpb240O1xyXG5cclxuICAgICAgLy8gdmFyIF9xdWVzdGlvbkFza2VkID0gT25lUXVlc3Rpb25zW19xdWVzdGlvbkluZGV4IC0gMV07XHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24oX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX215RGF0YSwgX3Jvb21EYXRhLCBfaXNUdXJuT3ZlciwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gIH0sXHJcblxyXG4gIE9uZVF1ZXN0aW9uRGVjaXNpb25fU2VsZWN0T3B0aW9uX09uZVF1ZXN0aW9uKGV2ZW50ID0gbnVsbCkge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3NlbGVjdGlvbiA9IHBhcnNlSW50KGV2ZW50LmN1cnJlbnRUYXJnZXQubmFtZS5zcGxpdChcIl9cIilbMV0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwib3B0aW9uIHNlbGVjdGVkOiBcIiArIF9zZWxlY3Rpb24pO1xyXG4gICAgY29uc29sZS5sb2coXCJDb3JyZWN0QW5zd2VyOiBcIiArIENvcnJlY3RBbnN3ZXIpO1xyXG4gICAgaWYgKF9zZWxlY3Rpb24gPT0gQ29ycmVjdEFuc3dlcikge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91ciBhbnN3ZXIgd2FzIGNvcnJlY3QhLlwiLCAxMjAwKTtcclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKGZhbHNlLCB0cnVlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9teURhdGEuQ2FzaCA+PSA1MDAwKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggLT0gNTAwMDtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbnN3ZXJlZCB3cm9uZywgZmluZSBhbW91bnQgd2FzIHBheWVkIHRvIHRoZSBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKHRydWUsIGZhbHNlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCwgU2tpcHBpbmcgcXVlc3Rpb25cIik7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIGZhbHNlLCAwLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBPbmVRdWVzdGlvbkRlY2lzaW9uX1BheUFtb3VudF9PbmVRdWVzdGlvbigpIHtcclxuICAvLyAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgLy8gICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAvLyAgIGlmIChfbXlEYXRhLkNhc2ggPj0gNTAwMCkge1xyXG4gIC8vICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAvLyAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgLy8gICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoIC09IDUwMDA7XHJcbiAgLy8gICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7XHJcbiAgLy8gICAgICAgICBicmVhaztcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgIH1cclxuXHJcbiAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgcGFpZCBjYXNoIGFtb3VudCB0byBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gIC8vICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAvLyAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24odHJ1ZSwgZmFsc2UsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH0sXHJcblxyXG4gIC8vIE9uZVF1ZXN0aW9uRGVjaXNpb25fQW5zd2VyUXVlc3Rpb25fT25lUXVlc3Rpb24oKSB7XHJcbiAgLy8gICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gIC8vICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAvLyAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYW5zd2VyZWQgdGhlIHF1ZXN0aW9uLlwiLCAxMjAwKTtcclxuICAvLyAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIC8vICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIHRydWUsIE9uZVF1ZXN0aW9uSW5kZXgsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAvLyB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCh0cnVlKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5SZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCgpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KF9teURhdGEsIF9yb29tRGF0YSwgX2lzVHVybk92ZXIsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJUYWtlT3Zlcl9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgdmFyIF9teURhdGE7XHJcbiAgICB2YXIgX3Jvb21EYXRhO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIF9yb29tRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBfbXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgX3Jvb21EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgIH1cclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIodHJ1ZSk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcigpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIoX215RGF0YSwgX3Jvb21EYXRhLCBfaXNUdXJuT3ZlciwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gIH0sXHJcblxyXG4gIFNlbGVjdFBsYXllckJ1eUhhbGZCdXNpbmVzc19TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgdmFyIF9teURhdGE7XHJcbiAgICB2YXIgX3Jvb21EYXRhO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIF9yb29tRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBfbXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgX3Jvb21EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgIH1cclxuXHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyKHRydWUpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIoKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyKF9teURhdGEsIF9yb29tRGF0YSwgX2lzVHVybk92ZXIsIHRoaXMuU2VsZWN0ZWRNb2RlLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJEYW1hZ2luZ0luZm9ybWF0aW9uX1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5KF9pc1R1cm5PdmVyID0gZmFsc2UpIHtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX215RGF0YTtcclxuICAgIHZhciBfcm9vbURhdGE7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgX3Jvb21EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIF9teURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICBfcm9vbURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgfVxyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyh0cnVlKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5SZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckRhbWFnaW5nKCk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyhfbXlEYXRhLCBfcm9vbURhdGEsIF9pc1R1cm5PdmVyLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50X1NlbGVjdFBsYXllckZvclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgdmFyIF9vd25JRCA9IF9kYXRhLlVzZXJJRC50b1N0cmluZygpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IHBhcnNlSW50KF9kYXRhLlVzZXJJbmRleCk7XHJcbiAgICB2YXIgX3BsYXllck5hbWUgPSBfZGF0YS5Vc2VyTmFtZTtcclxuICAgIHZhciBfcGxheWVySUQgPSBfZGF0YS5Pd25QbGF5ZXJJRC50b1N0cmluZygpO1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIGlmIChfb3duSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBldmVudDogXCIgKyBfcGxheWVyTmFtZSk7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEID09IF9vd25JRCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlVzZXJJREZvclByb2ZpdFBheURheSA9IF9wbGF5ZXJJRDtcclxuXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIiwgdGhpcy5QbGF5ZXJHYW1lSW5mbywgdHJ1ZSk7XHJcbiAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2hvd1RvYXN0KFwiUGxheWVyIFwiICsgX3BsYXllck5hbWUgKyBcIiB3aWxsIHJlY2VpdmUgYWxsIHlvdXIgbmV4dCBwYXkgZGF5IHByb2ZpdHNcIiwgMzIwMCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2hhc0RvbmVQYXltZW50LCBfaGFzQW5zd2VyZWRRdWVzdGlvbiwgX3F1ZXN0aW9uSW5kZXgsIF9Vc2VySUQpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgUGF5bWVudERvbmU6IF9oYXNEb25lUGF5bWVudCwgUXVlc3Rpb25BbnN3ZXJlZDogX2hhc0Fuc3dlcmVkUXVlc3Rpb24sIFF1ZXN0aW9uSW5kZXg6IF9xdWVzdGlvbkluZGV4LCBJRDogX1VzZXJJRCB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg4LCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgRGVkdWN0Q2FzaF9DYXJkRnVuY3Rpb25hbGl0eShfYW1vdW50KSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCA+PSBfYW1vdW50KSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCAtPSBfYW1vdW50O1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggPCBfYW1vdW50KSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBZGRDYXNoX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICB2YXIgX2Ftb3VudCA9IF9kYXRhLmFtb3VudDtcclxuICAgIHZhciBfSUQgPSBfZGF0YS5JRDtcclxuICAgIHZhciBfbXNnID0gX2RhdGEubXNnO1xyXG5cclxuICAgIHZhciBtb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIGlmIChtb2RlID09IDIpIHtcclxuICAgICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcbiAgICAgICAgaWYgKF9hY3Rvci5QbGF5ZXJVSUQgPT0gX0lEKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KF9tc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChtb2RlID09IDEpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBfSUQgJiYgaW5kZXggIT0gdGhpcy5UdXJuTnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KF9tc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5VcGRhdGVVSURhdGEoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9kYXRhKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgdmFyIF9oYXNEb25lUGF5bWVudCA9IF9kYXRhLlBheW1lbnREb25lO1xyXG4gICAgICB2YXIgX2hhc0Fuc3dlcmVkUXVlc3Rpb24gPSBfZGF0YS5RdWVzdGlvbkFuc3dlcmVkO1xyXG4gICAgICB2YXIgX3F1ZXN0aW9uSW5kZXggPSBfZGF0YS5RdWVzdGlvbkluZGV4O1xyXG4gICAgICB2YXIgX3VJRCA9IF9kYXRhLklEO1xyXG5cclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgIGlmIChfcXVlc3Rpb25JbmRleCA9PSAwKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcInBsYXllciBkb2VzIG5vdCBoYXZlIGVub3VnaCBjYXNoLCBzbyBxdWVzdGlvbnMgd2VyZSBza2lwcGVkLlwiLCAyMTAwKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX2hhc0RvbmVQYXltZW50KSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggKz0gNTAwMDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGF5ZXIgaGFzIGdpdmVuIHdyb25nIGFuc3dlciwgY2FzaCAkNTAwMCBoYXMgYmVlbiBhZGRlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2hhc0Fuc3dlcmVkUXVlc3Rpb24pIHtcclxuICAgICAgICAgIHZhciBfc2VsZWN0ZWRQbGF5ZXJJbmRleCA9IDA7XHJcbiAgICAgICAgICB2YXIgX2FjdG9yc0RhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoX3VJRCA9PSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgICBfc2VsZWN0ZWRQbGF5ZXJJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcInBsYXllciBoYXMgZ2l2ZW4gY29ycmVjdCBhbnN3ZXIsIG5vIGNhc2ggd2FzIHJlY2VpdmVkLlwiLCAyMTAwKTtcclxuXHJcbiAgICAgICAgICAvLyBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMSkge1xyXG4gICAgICAgICAgLy8gICAvL2hhdmUgeW91IHNraXBwZWQgbG9hbiBwcmV2aW91cyBwYXlkYXk/XHJcbiAgICAgICAgICAvLyAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ta2lwcGVkTG9hblBheW1lbnQpIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgc2tpcHBlZCBsb2FuIHBheWVtZW50IGluIHByZXZpb3VzIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSAyKSB7XHJcbiAgICAgICAgICAvLyAgIC8vSGF2ZSB5b3UgdGFrZW4gYW55IGxvYW4/XHJcbiAgICAgICAgICAvLyAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICAvLyAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAvLyAgICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAvLyAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgIC8vICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgIC8vICAgfVxyXG5cclxuICAgICAgICAgIC8vICAgaWYgKF9sb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHRha2VuIHNvbWUgbG9hblwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSB0YWtlbiBhbnkgbG9hblwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSAzKSB7XHJcbiAgICAgICAgICAvLyAgIC8vQXJlIHlvdSBiYW5rcnVwdGVkPyBpZiBtb3JlIHRoYW4gb25jZSwgdGVsbCBtZSB0aGUgYW1vdW50P1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuSXNCYW5rcnVwdCkge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkIFwiICsgX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQmFua3J1cHRBbW91bnQgKyBcIiB0aW1lL2VzLlwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSBiZWVuIGJhbmtydXB0ZWRcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gNCkge1xyXG4gICAgICAgICAgLy8gICAvL0lzIHlvdXIgdHVybiBnb2luZyB0byBiZSBza2lwcGVkIG5leHQgdGltZT9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBiZSBza2lwcGVkLlwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgbm90IGJlIHNraXBwZWQuXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDUpIHtcclxuICAgICAgICAgIC8vICAgLy9JcyBpdCBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSB5b3VyIG5leHQgcGF5ZGF5P1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXkpIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBiZSBkb3VibGUgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIG5vdCBiZSBkb3VibGUgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICBpZiAoSXNUd2VlbmluZyA9PSB0cnVlKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5KF9kYXRhKTtcclxuICAgICAgfSwgODAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfc3BhY2VzID0gX2RhdGEuRGF0YS5iYWNrc3BhY2VzO1xyXG4gICAgICB2YXIgX2NvdW50ZXIgPSBfZGF0YS5EYXRhLkNvdW50ZXI7XHJcblxyXG4gICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2NvdW50ZXIgKyBCYWNrc3BhY2VzXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1BvcywgMC4xKTtcclxuXHJcbiAgICAgIFJvbGxDb3VudGVyID0gX2NvdW50ZXI7XHJcbiAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFR3ZWVuUGxheWVyX0dvQmFja1NwYWNlczogZnVuY3Rpb24gKE5vZGUsIFRvUG9zLCBzcGVlZCA9IDAuNikge1xyXG4gICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgLnRvKHNwZWVkLCB7IHBvc2l0aW9uOiBjYy52MihUb1Bvcy54LCBUb1Bvcy55KSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7fSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIFJvbGxDb3VudGVyIC09IEJhY2tzcGFjZXM7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IGJhY2tzcGFjZXM6IEJhY2tzcGFjZXMsIENvdW50ZXI6IFJvbGxDb3VudGVyIH0gfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMCwgX2RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9UYWtlT3ZlckJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBfaWQgPSBfZGF0YS5JRDtcclxuICAgICAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5QbGF5ZXI7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzcyA9IF9kYXRhLkJ1c2luZXNzO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9kYXRhLkJ1c2luZXNzSW5kZXg7XHJcbiAgICAgICAgdmFyIF9teUFjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcblxyXG4gICAgICAgIHZhciBfbXlJbmRleCA9IC0xO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9teUFjdG9yLlBsYXllclVJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX2lkKTtcclxuXHJcbiAgICAgICAgaWYgKF9teUFjdG9yLlBsYXllclVJRC50b1N0cmluZygpID09IF9pZC50b1N0cmluZygpKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBfaWQpIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy9ob21lIGJhc2VkXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQtLTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50IC09IF9sb2NhdGlvbnM7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ob09mQnVzaW5lc3Muc3BsaWNlKF9idXNpbmVzc0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICBfbXlJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICAgICAgaWYgKF9teUluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIGhhcyBsb3N0IGFsbCBidXNpbmVzc2VzIG9yIG5vdFxyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3VyIGJ1c2luZXNzIFwiICsgX2J1c2luZXNzLkJ1c2luZXNzTmFtZSArIFwiIHdhcyBmb3JjZWZ1bGx5IHRvb2sgb3ZlciwgeW91IGhhdmUgbG9zdCB0aGF0IGJ1c2luZXNzXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3VyIGJ1c2luZXNzIFwiICsgX2J1c2luZXNzLkJ1c2luZXNzTmFtZSArIFwiIHdhcyBmb3JjZWZ1bGx5IHRvb2sgb3ZlciwgeW91IGhhdmUgbG9zdCB0aGF0IGJ1c2luZXNzLCB5b3UgaGF2ZSBiZWVuIGJhbmtydXB0ZWQsIHlvdSB3aWxsIHN0YXJ0IGFnYWluIGluIG5leHQgdHVybi5cIik7XHJcbiAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FyZEZ1bmN0aW9uYWxpdHkuQmFua3J1cHRlZE5leHRUdXJuID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRha2VPdmVyQnVzaW5lc3NfQ2FyZEZ1bmN0aW9uYWxpdHkoX2RhdGEsIF9pbmRleCwgX3BsYXllckluZGV4ID0gMCwgX2J1eUhhbGZCdXNpbmVzcyA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2J1c2luZXNzID0gX2RhdGEuTm9PZkJ1c2luZXNzW19pbmRleF07XHJcbiAgICBjb25zb2xlLmxvZyhfYnVzaW5lc3MpO1xyXG5cclxuICAgIHZhciBfZGljZVJvbGwgPSB0aGlzLlJvbGxUd29EaWNlcygpO1xyXG4gICAgdmFyIF9tdWx0aXBsaWVyQnVzaW5lc3MgPSAxMDAwMDtcclxuICAgIHZhciBfcmVzdWx0ID0gX2RpY2VSb2xsICogX211bHRpcGxpZXJCdXNpbmVzcztcclxuICAgIHZhciBfcGxheWVyID0gbnVsbDtcclxuXHJcbiAgICAvL3NlbmQgcnBjIHRvIG90aGVyIHBsYXllciBhcyB3ZWxsXHJcbiAgICBfcGxheWVyID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIHZhciBfc2VuZGluZ0RhdGEgPSB7IElEOiBfcGxheWVyLlBsYXllclVJRCwgUGxheWVyOiBfcGxheWVyLCBCdXNpbmVzczogX2J1c2luZXNzLCBCdXNpbmVzc0luZGV4OiBfaW5kZXggfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjMsIF9zZW5kaW5nRGF0YSk7XHJcblxyXG4gICAgaWYgKCFfYnVzaW5lc3MuTG9hblRha2VuKSB7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoICs9IF9yZXN1bHQ7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgIFwiXFxuXCIgKyBcIkRpY2UgUmVzdWx0IDogXCIgKyBfZGljZVJvbGwgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiQW1vdW50IDogXCIgKyBfZGljZVJvbGwgKyBcIiAqIFwiICsgX211bHRpcGxpZXJCdXNpbmVzcyArIFwiID0gJFwiICsgX3Jlc3VsdCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJDYXNoIGFtb3VudCBvZiAkXCIgKyBfcmVzdWx0ICsgXCIgYWRkZWQgYWZ0ZXIgZGVkdWN0aW5nIHN1cHBvc2VkIGxvYW4sIHRvdGFsIGNhc2ggYmVjb21lcyAkXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaFxyXG4gICAgICApO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTY3JlZW5BbG9uZ1R1cm5PdmVyX19CdXNpbmVzc0dlbnJpYygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF90ZW1wU3VtID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggKyBfcmVzdWx0O1xyXG4gICAgICBpZiAoX3RlbXBTdW0gPj0gX2J1c2luZXNzLkxvYW5BbW91bnQpIHtcclxuICAgICAgICBfdGVtcFN1bSAtPSBfYnVzaW5lc3MuTG9hbkFtb3VudDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCA9IF90ZW1wU3VtO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiRGljZSBSZXN1bHQgOiBcIiArXHJcbiAgICAgICAgICAgIF9kaWNlUm9sbCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJMb2FuIEFtb3VudCA6ICRcIiArXHJcbiAgICAgICAgICAgIF9idXNpbmVzcy5Mb2FuQW1vdW50ICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkFtb3VudCA6IFwiICtcclxuICAgICAgICAgICAgX2RpY2VSb2xsICtcclxuICAgICAgICAgICAgXCIgKiBcIiArXHJcbiAgICAgICAgICAgIF9tdWx0aXBsaWVyQnVzaW5lc3MgK1xyXG4gICAgICAgICAgICBcIiA9ICRcIiArXHJcbiAgICAgICAgICAgIF9yZXN1bHQgK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiQWZ0ZXIgZGVkdWN0aW5nIHN1cHBvc2VkIGxvYW4sIHRvdGFsIGNhc2ggYmVjb21lcyAkXCIgK1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTY3JlZW5BbG9uZ1R1cm5PdmVyX19CdXNpbmVzc0dlbnJpYygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBwYXkgb2ZmIGxvYW4sIHR1cm4gd2lsbCBiZSBza2lwcGVkIG5vd1wiKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNjcmVlbkFsb25nVHVybk92ZXJfX0J1c2luZXNzR2VucmljKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfQnV5SGFsZkJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBfaWQgPSBfZGF0YS5JRDtcclxuICAgICAgICB2YXIgX2Nhc2hBbW91bnQgPSBfZGF0YS5BbW91bnQ7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gX2RhdGEuQnVzaW5lc3NJbmRleDtcclxuICAgICAgICB2YXIgX3NlbmRlcklEID0gX2RhdGEuTXlJRDtcclxuICAgICAgICB2YXIgX3NlbmRlck5hbWUgPSBfZGF0YS5NeU5hbWU7XHJcbiAgICAgICAgdmFyIF9teUFjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcbiAgICAgICAgaWYgKF9teUFjdG9yLlBsYXllclVJRCA9PSBfaWQudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCArPSBwYXJzZUludChfY2FzaEFtb3VudCk7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLklzUGFydG5lcnNoaXAgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVySUQgPSBfc2VuZGVySUQ7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLlBhcnRuZXJOYW1lID0gX3NlbmRlck5hbWU7XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChfc2VuZGVyTmFtZSArIFwiIGhhcyBzZW5kIHlvdSBjYXNoIGFtb3VudCAkXCIgKyBfY2FzaEFtb3VudCArIFwiIGFuZCBoYXMgYmVjb21lIDUwJSBvd25lciBvZiB5b3VyIGJ1c2luZXNzIFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9Db21wYXJlRGljZV9DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgQ29tcGFyZURpY2VEYXRhPV9kYXRhO1xyXG5cclxuICAgICAgICB2YXIgX3JlY2VpdmVyUGxheWVyPUNvbXBhcmVEaWNlRGF0YS5QbGF5ZXI7XHJcbiAgICAgICAgdmFyIF9yZWNlaXZlclBsYXllckluZGV4PUNvbXBhcmVEaWNlRGF0YS5QbGF5ZXJJbmRleDtcclxuICAgICAgICB2YXIgX3NlbmRlclBsYXllclVJRD1Db21wYXJlRGljZURhdGEuTXlVc2VySUQ7XHJcbiAgICAgICAgdmFyIF9zZW5kZXJEaWNlPUNvbXBhcmVEaWNlRGF0YS5EaWNlMTtcclxuICAgICAgICB2YXIgX3JlY2VpdmVyRGljZT1Db21wYXJlRGljZURhdGEuRGljZTI7XHJcbiAgICAgICAgdmFyIF9zZW5kZXJQYXlMaW1pdD1Db21wYXJlRGljZURhdGEuTGltaXQxO1xyXG4gICAgICAgIHZhciBfcmVjZWl2ZXJQYXlMaW1pdD1Db21wYXJlRGljZURhdGEuTGltaXQyO1xyXG4gICAgICAgIHZhciBfbXlBY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG5cclxuICAgICAgICBpZiAoX215QWN0b3IuUGxheWVyVUlEID09IF9yZWNlaXZlclBsYXllci5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNzaW9uMDFTY3JlZW5fQ29tcGFyZURpY2UodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUm9sbERpY2VfQ29tcGFyZURpY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoKVxyXG4gIHtcclxuICAgIHZhciBfcmVjZWl2ZXJQbGF5ZXI9Q29tcGFyZURpY2VEYXRhLlBsYXllcjtcclxuICAgIHZhciBfcmVjZWl2ZXJQbGF5ZXJJbmRleD1Db21wYXJlRGljZURhdGEuUGxheWVySW5kZXg7XHJcbiAgICB2YXIgX3NlbmRlclBsYXllclVJRD1Db21wYXJlRGljZURhdGEuTXlVc2VySUQ7XHJcbiAgICB2YXIgX3NlbmRlckRpY2U9Q29tcGFyZURpY2VEYXRhLkRpY2UxO1xyXG4gICAgdmFyIF9yZWNlaXZlckRpY2U9Q29tcGFyZURpY2VEYXRhLkRpY2UyO1xyXG4gICAgdmFyIF9zZW5kZXJQYXlMaW1pdD1Db21wYXJlRGljZURhdGEuTGltaXQxO1xyXG4gICAgdmFyIF9yZWNlaXZlclBheUxpbWl0PUNvbXBhcmVEaWNlRGF0YS5MaW1pdDI7XHJcbiAgICB2YXIgVUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcblxyXG4gICAgdmFyIF9pbmZvPVwiXFxuXCIrXCJZb3VyIERpY2UgUmVzdWx0OiBcIitfcmVjZWl2ZXJEaWNlK1wiXFxuXCIrXCJcXG5cIitcIiBPdGhlciBQbGF5ZXIgRGljZSBSZXN1bHQ6IFwiK19zZW5kZXJEaWNlO1xyXG5cclxuICAgIFVJTWFuYWdlci5Ub2dnbGVEZWNzaW9uMDFTY3JlZW5fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG4gICAgVUlNYW5hZ2VyLlRvZ2dsZURlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZSh0cnVlKTtcclxuICAgIFVJTWFuYWdlci5DaGFuZ2VUaXRsZV9EZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UoX2luZm8pO1xyXG5cclxuICAgIHZhciBfbXlBY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgaWYoX3NlbmRlckRpY2U+X3JlY2VpdmVyRGljZSkgLy93aWxsIGdpdmUgMjAwMDBcclxuICAgIHtcclxuICAgICAgX2luZm8rPVwiXFxuXCIrXCJcXG5cIitcIiBZb3UgaGF2ZSBsb3N0LCB5b3UgaGF2ZSB0byBwYXkgb3RoZXIgcGxheWVyICQkJC5cIjtcclxuICAgICAgVUlNYW5hZ2VyLkNoYW5nZVRpdGxlX0RlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZShfaW5mbyk7XHJcbiAgICAgIFVJTWFuYWdlci5Ub2dnbGVEZWNzaW9uMDJTY3JlZW5CdXR0b25fQ29tcGFyZURpY2UodHJ1ZSk7XHJcblxyXG4gICAgfWVsc2UgaWYoX3JlY2VpdmVyRGljZT5fc2VuZGVyRGljZSkgLy93aWxsIHJlY2VpdmUgMjAwMDBcclxuICAgIHtcclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCs9MjAwMDA7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdKTtcclxuICAgICAgICBfaW5mbys9XCJcXG5cIitcIlxcblwiK1wiIFlvdSBoYXZlIHdvbiwgYW1vdW50ICQyMDAwMCBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2guXCI7XHJcbiAgICAgICAgVUlNYW5hZ2VyLkNoYW5nZVRpdGxlX0RlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZShfaW5mbyk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLlRvZ2dsZURlY3Npb24wMlNjcmVlbkJ1dHRvbl9Db21wYXJlRGljZShmYWxzZSk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgVUlNYW5hZ2VyLlRvZ2dsZURlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZShmYWxzZSk7XHJcbiAgICAgICAgfSwgODAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9zZW50ZGF0YSA9IHsgU2VuZGVyVUlEOiBfc2VuZGVyUGxheWVyVUlEICwgRGVjaXNpb25PYmplY3Q6Q29tcGFyZURpY2VEYXRhfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjgsIF9zZW50ZGF0YSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9Db21wYXJlRGljZURlY2lzaW9uX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG5cclxuICAgICAgICB2YXIgX1VJRD1fZGF0YS5TZW5kZXJVSUQ7XHJcbiAgICAgICAgdmFyIF9teUFjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgdmFyIFVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIHZhciBfcmVjZWl2ZXJQbGF5ZXI9X2RhdGEuRGVjaXNpb25PYmplY3QuUGxheWVyO1xyXG4gICAgICAgIHZhciBfcmVjZWl2ZXJQbGF5ZXJJbmRleD1fZGF0YS5EZWNpc2lvbk9iamVjdC5QbGF5ZXJJbmRleDtcclxuICAgICAgICB2YXIgX3NlbmRlclBsYXllclVJRD1fZGF0YS5EZWNpc2lvbk9iamVjdC5NeVVzZXJJRDtcclxuICAgICAgICB2YXIgX3NlbmRlckRpY2U9X2RhdGEuRGVjaXNpb25PYmplY3QuRGljZTE7XHJcbiAgICAgICAgdmFyIF9yZWNlaXZlckRpY2U9X2RhdGEuRGVjaXNpb25PYmplY3QuRGljZTI7XHJcbiAgICAgICAgdmFyIF9zZW5kZXJQYXlMaW1pdD1fZGF0YS5EZWNpc2lvbk9iamVjdC5MaW1pdDE7XHJcbiAgICAgICAgdmFyIF9yZWNlaXZlclBheUxpbWl0PV9kYXRhLkRlY2lzaW9uT2JqZWN0LkxpbWl0MjtcclxuICAgICAgICB2YXIgX215SW5kZXggPSB0aGlzLkdldE15SW5kZXgoKTtcclxuXHJcbiAgICAgICAgVUlNYW5hZ2VyLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX215QWN0b3IuUGxheWVyVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgICBpZiAoX215QWN0b3IuUGxheWVyVUlELnRvU3RyaW5nKCkgPT0gX1VJRC50b1N0cmluZygpKSB7XHJcbiAgICAgICAgICB2YXIgX2luZm89XCJcXG5cIitcIllvdXIgRGljZSBSZXN1bHQ6IFwiK19zZW5kZXJEaWNlK1wiXFxuXCIrXCJcXG5cIitcIiBPdGhlciBQbGF5ZXIgRGljZSBSZXN1bHQ6IFwiK19yZWNlaXZlckRpY2U7XHJcblxyXG4gICAgICAgICAgVUlNYW5hZ2VyLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICBVSU1hbmFnZXIuVG9nZ2xlRGVjc2lvbjAxU2NyZWVuX0NvbXBhcmVEaWNlKGZhbHNlKTtcclxuICAgICAgICAgIFVJTWFuYWdlci5Ub2dnbGVEZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UodHJ1ZSk7XHJcbiAgICAgICAgICBVSU1hbmFnZXIuQ2hhbmdlVGl0bGVfRGVjc2lvbjAyU2NyZWVuX0NvbXBhcmVEaWNlKF9pbmZvKTtcclxuICAgICAgICAgIFVJTWFuYWdlci5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG5cclxuICAgICAgICAgIGlmKF9zZW5kZXJEaWNlPl9yZWNlaXZlckRpY2UpIC8vd2lsbCByZWNlaXZlIDIwMDAwXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCs9MjAwMDA7XHJcbiAgICAgICAgICAgICAgX2luZm8rPVwiXFxuXCIrXCJcXG5cIitcIiBZb3UgaGF2ZSB3b24sIGFtb3VudCAkMjAwMDAgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoLlwiO1xyXG4gICAgICAgICAgICAgIFVJTWFuYWdlci5DaGFuZ2VUaXRsZV9EZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UoX2luZm8pO1xyXG4gICAgICAgICAgICAgIFVJTWFuYWdlci5Ub2dnbGVEZWNzaW9uMDJTY3JlZW5CdXR0b25fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5Ub2dnbGVEZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyR2VuZXJpYygpO1xyXG4gICAgICAgICAgICAgIH0sIDEwMDAwKTtcclxuXHJcbiAgICAgICAgICB9ZWxzZSBpZihfcmVjZWl2ZXJEaWNlPl9zZW5kZXJEaWNlKSAvL3dpbGwgZ2l2ZSAyMDAwMFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBfaW5mbys9XCJcXG5cIitcIlxcblwiK1wiIFlvdSBoYXZlIGxvc3QsIHlvdSBoYXZlIHRvIHBheSBvdGhlciBwbGF5ZXIgJCQkLlwiO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuQ2hhbmdlVGl0bGVfRGVjc2lvbjAyU2NyZWVuX0NvbXBhcmVEaWNlKF9pbmZvKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLlRvZ2dsZURlY3Npb24wMlNjcmVlbkJ1dHRvbl9Db21wYXJlRGljZSh0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQYXlBbW91bnRfQ29tcGFyZURpY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoKVxyXG4gIHtcclxuICAgIHZhciBfbXlBY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcbiAgICB2YXIgVUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcbiAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5DYXNoPj0yMDAwMClcclxuICAgIHtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaC09MjAwMDA7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJhbmtydXB0ZWRWYXIoZmFsc2UpO1xyXG4gICAgICBVSU1hbmFnZXIuVG9nZ2xlRGVjc2lvbjAyU2NyZWVuX0NvbXBhcmVEaWNlKGZhbHNlKTtcclxuICAgICAgaWYoX215SW5kZXg9PXRoaXMuVHVybk51bWJlcilcclxuICAgICAge1xyXG4gICAgICAgIFVJTWFuYWdlci5FeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJHZW5lcmljKCk7XHJcbiAgICAgIH1cclxuICAgIH1lbHNlXHJcbiAgICB7XHJcbiAgICAgIC8vIGlmKF9teUluZGV4IT10aGlzLlR1cm5OdW1iZXIpXHJcbiAgICAgIC8vIHtcclxuICAgICAgLy8gICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2V0QmFua3J1cHRlZFZhcih0cnVlKTtcclxuICAgICAgLy8gfWVsc2VcclxuICAgICAgLy8ge1xyXG4gICAgICAvLyAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCYW5rcnVwdGVkVmFyKGZhbHNlKTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgLy8gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG5cclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaD0wO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICAgIFVJTWFuYWdlci5Ub2dnbGVEZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG4gICAgICBpZihfbXlJbmRleD09dGhpcy5UdXJuTnVtYmVyKVxyXG4gICAgICB7XHJcbiAgICAgICAgVUlNYW5hZ2VyLkV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckdlbmVyaWMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBQYXlBbW91bnRfQnV5SGFsZkJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5KCkge1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoID49IGhhbGZCdXNpbmVzc0Ftb3VudCkge1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCAtPSBoYWxmQnVzaW5lc3NBbW91bnQ7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IGhhbGYgb3duZXJzaGlwIG9mIHRoZSBidXNpbmVzcywgcmVtYWluaW5nIGNhc2ggJFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2gpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuRXhpdFNjcmVlbkFsb25nVHVybk92ZXJfX0J1c2luZXNzR2VucmljKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fQnV5SGFsZkJ1c2luZXNzKGZhbHNlKTtcclxuICAgICAgdmFyIF9zZW5kaW5nRGF0YSA9IHsgSUQ6IGhhbGZCdXNpbmVzc0Ftb3VudElELCBBbW91bnQ6IGhhbGZCdXNpbmVzc0Ftb3VudCwgQnVzaW5lc3NJbmRleDogaGFsZkJ1c2luZXNzQW1vdW50SW5kZXgsIE15SUQ6IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQsIE15TmFtZTogdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUgfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyNiwgX3NlbmRpbmdEYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgQnV5SGFsZkJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhLCBfaW5kZXgsIF9wbGF5ZXJJbmRleCA9IDApIHtcclxuICAgIC8vdmFyIF9idXNpbmVzcyA9IF9kYXRhLk5vT2ZCdXNpbmVzc1tfaW5kZXhdO1xyXG4gICAgLy9jb25zb2xlLmxvZyhfYnVzaW5lc3MpO1xyXG5cclxuICAgIHZhciBfZGljZVJvbGwgPSB0aGlzLlJvbGxUd29EaWNlcygpO1xyXG4gICAgdmFyIF9tdWx0aXBsaWVyQnVzaW5lc3MgPSAzMDAwO1xyXG4gICAgdmFyIF9yZXN1bHQgPSBfZGljZVJvbGwgKiBfbXVsdGlwbGllckJ1c2luZXNzO1xyXG5cclxuICAgIGhhbGZCdXNpbmVzc0Ftb3VudCA9IF9yZXN1bHQ7XHJcbiAgICBoYWxmQnVzaW5lc3NBbW91bnRJRCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJVSUQ7XHJcbiAgICBoYWxmQnVzaW5lc3NBbW91bnRJbmRleCA9IF9pbmRleDtcclxuXHJcbiAgICB2YXIgX3BsYXllciA9IG51bGw7XHJcbiAgICB2YXIgX3RleHQgPSBcIlxcblwiICsgXCJEaWNlIFJlc3VsdCA6IFwiICsgX2RpY2VSb2xsICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIlBheWFibGUgQW1vdW50IDogXCIgKyBfZGljZVJvbGwgKyBcIiAqIFwiICsgX211bHRpcGxpZXJCdXNpbmVzcyArIFwiID0gJFwiICsgX3Jlc3VsdDtcclxuXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0J1eUhhbGZCdXNpbmVzcyh0cnVlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRUaXRsZVRleHRfQnV5SGFsZkJ1c2luZXNzKF90ZXh0KTtcclxuICB9LFxyXG4gIFJlY2VpdmVFdmVudF9TZWxlY3RQbGF5ZXJEYW1hZ2luZ0RlY2lzaW9uX1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBfcGxheWVyID0gX2RhdGEuUGxheWVyO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBwYXJzZUludChfZGF0YS5QbGF5ZXJJbmRleCk7XHJcbiAgICAgICAgdmFyIF9zZW5kZXJJRCA9IF9kYXRhLk15VXNlcklEO1xyXG5cclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgICAgIGlmIChfcGxheWVyLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZlZCBldmVudDogXCIgKyBfcGxheWVyLlBsYXllck5hbWUpO1xyXG5cclxuICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRTZW5kZXJJRF9EYW1hZ2VEZWNpc2lvbihfc2VuZGVySUQpO1xyXG4gICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZU1haW5TY3JlZW5fRGFtYWdlRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGljZVJlc3VsdFNjcmVlbl9EYW1hZ2VEZWNpc2lvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcbiAgLy8jZW5kcmVnaW9uXHJcbn0pO1xyXG4vL21vZHVsZS5leHBvcnRzICA9IFBsYXllckRhdGE7IC8vd2hlbiBpbXBvcnRzIGluIGFub3RoZXIgc2NyaXB0IG9ubHkgcmVmZXJlbmNlIG9mIHBsYXllcmRhdGEgY2xhc3Mgd291bGQgYmUgYWJsZSB0byBhY2Nlc3NlZCBmcm9tIEdhbWVtYW5hZ2VyIGltcG9ydFxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVNYW5hZ2VyO1xyXG4vLyNlbmRyZWdpb25cclxuIl19