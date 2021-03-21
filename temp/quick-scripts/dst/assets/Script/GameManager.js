
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
        clearTimeout(CardDisplaySetTimout); //console.log(this.CardCounter);

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
    } // console.log(CardEventReceived);

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
        console.log(RollCounter);
      } else {
        this.PlayerGameInfo[this.TurnNumber].InitialCounterAssigned = true;
        RollCounter = 14;
        console.log(RollCounter);
      }
    } else {
      if (this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter == 13) this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter + 22;else this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter + 1;
      RollCounter = this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter;
      console.log(RollCounter - 1);
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
      console.log("starting from oblivion");
      tempcounter = tempcounter2 + _rolling - 1;
      var dicetobe = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[tempcounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType);
      console.log("to be: " + dicetobe);
    } else {
      tempcounter = tempcounter2 + _rolling;
      var dicetobe = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[tempcounter].ReferenceLocation.getComponent("SpaceHandler").SpaceData.SpacesType);
      console.log("to be: " + dicetobe);
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
        Dice1 = 20;
        Dice2 = 20;
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
          console.log(_spaceID);

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
              console.log("complete turn is called");
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
        console.log("player is not active returning");
      } else {
        if (this.PlayerGameInfo[_playerIndex].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          console.log("calculating....");
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
              } /// console.log(PassedPayDayCounter);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJoYWxmQnVzaW5lc3NBbW91bnQiLCJoYWxmQnVzaW5lc3NBbW91bnRJRCIsImhhbGZCdXNpbmVzc0Ftb3VudEluZGV4IiwiUHJldmlvdXNEaWNlUm9sbDMiLCJQcmV2aW91c0RpY2VSb2xsNCIsIlByZXZpb3VzRGljZVJvbGw1IiwidXNlckdhbWVPdmVyIiwiQm90R2FtZU92ZXIiLCJUb3RhbENvdW50ZXJSZWFjaGVkIiwiUGFzc2VkUGF5RGF5Q291bnRlciIsIkRvdWJsZVBheURheUNvdW50ZXIiLCJOb0NhcmRGdW5jdGlvbmFsaXR5IiwiUGxheWVyTGVmdCIsIkZvcmNlQ2hhbmdlVGltZU91dCIsIkdhbWVDb21wbGV0ZWQiLCJDb3JyZWN0QW5zd2VyIiwiVm9jYWJ1bGFyeVF1ZXN0aW9ucyIsIkVzdGFibGlzaG1lbnRRdWVzdGlvbnMiLCJWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlciIsIkVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyIiwiQmlnQnVzaW5lc3NBcnJheSIsIkxvc3Nlc0FycmF5IiwiTWFya2V0aW5nQXJyYXkiLCJXaWxkQ2FyZEFycmF5IiwiQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIiLCJMb3NzZXNBcnJheUNvdW50ZXIiLCJNYXJrZXRpbmdBcnJheUNvdW50ZXIiLCJXaWxkQ2FyZEFycmF5Q291bnRlciIsIkNvbXBhcmVEaWNlRGF0YSIsIkVudW1CdXNpbmVzc1R5cGUiLCJjYyIsIkVudW0iLCJOb25lIiwiSG9tZUJhc2VkIiwiYnJpY2tBbmRtb3J0YXIiLCJCdXNpbmVzc0luZm8iLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiTmFtZSIsIkJ1c2luZXNzVHlwZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIlRleHQiLCJCdXNpbmVzc05hbWUiLCJBbW91bnQiLCJJbnRlZ2VyIiwiSXNQYXJ0bmVyc2hpcCIsInR5cHciLCJCb29sZWFuIiwiUGFydG5lcklEIiwiUGFydG5lck5hbWUiLCJMb2NhdGlvbnNOYW1lIiwiTG9hblRha2VuIiwiTG9hbkFtb3VudCIsIlJlY2VpdmVEb3VibGVQYXlEYXkiLCJjdG9yIiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiTmV4dFR1cm5Eb3VibGVQYXkiLCJTa2lwTmV4dFR1cm4iLCJTa2lwTmV4dFBheWRheSIsIlNraXBITU5leHRQYXlkYXkiLCJTa2lwQk1OZXh0UGF5ZGF5IiwiTmV4dFR1cm5IYWxmUGF5RGF5IiwiTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlciIsIkhhc01hcmtldGluZ0NvbXBhbnkiLCJCYW5rcnVwdGVkTmV4dFR1cm4iLCJTdG9ja0luZm8iLCJTaGFyZUFtb3VudCIsIlBsYXllckRhdGEiLCJQbGF5ZXJOYW1lIiwiUGxheWVyVUlEIiwiQXZhdGFySUQiLCJJc0JvdCIsIk5vT2ZCdXNpbmVzcyIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiSG9tZUJhc2VkQW1vdW50IiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJSZWNlaXZlRG91YmxlUGF5RGF5QW1vdW50IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJOb09mU3RvY2tzIiwiQ2FzaCIsIkdvbGRDb3VudCIsIlN0b2NrQ291bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJMYXd5ZXJTdGF0dXMiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQbGF5ZXJSb2xsQ291bnRlciIsIkluaXRpYWxDb3VudGVyQXNzaWduZWQiLCJpc0dhbWVGaW5pc2hlZCIsIlRvdGFsU2NvcmUiLCJUb3RhbEhCQ2FzaCIsIlRvdGFsQk1DYXNoIiwiVG90YWxHb2xkQ2FzaCIsIlRvdGFsTG9hbkJhbGFuY2UiLCJUb3RhbFN0b2Nrc0Nhc2giLCJHYW1lT3ZlciIsIklzQWN0aXZlIiwiQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5IiwiVXNlcklERm9yUHJvZml0UGF5RGF5IiwiUm9sbENvdW50ZXIiLCJEaWNlVGVtcCIsIkRpY2VSb2xsIiwiSXNUd2VlbmluZyIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlR1cm5DaGVja0FycmF5IiwiQnVzaW5lc3NMb2NhdGlvbk5vZGVzIiwiUGFzc2VkUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiX25leHRUdXJuRG91YmxlUGF5IiwiX25leHRUdXJuaGFsZlBheSIsIl9za2lwTmV4dFR1cm4iLCJfc2tpcE5leHRQYXlkYXkiLCJfc2tpcEhNTmV4dFBheWRheSIsIl9za2lwQk1OZXh0UGF5ZGF5IiwiQ2FyZEV2ZW50UmVjZWl2ZWQiLCJUdXJuSW5Qcm9ncmVzcyIsIkJhY2tzcGFjZXMiLCJpc0dhbWVPdmVyIiwiQ2FyZERpc3BsYXlTZXRUaW1vdXQiLCJHYW1lTWFuYWdlciIsIkNvbXBvbmVudCIsIlBsYXllckdhbWVJbmZvIiwiQm90R2FtZUluZm8iLCJQbGF5ZXJOb2RlIiwiTm9kZSIsIkNhbWVyYU5vZGUiLCJBbGxQbGF5ZXJVSSIsIkFsbFBsYXllck5vZGVzIiwiU3RhcnRMb2NhdGlvbk5vZGVzIiwiU2VsZWN0ZWRNb2RlIiwic3RhdGljcyIsIkluc3RhbmNlIiwiU2V0UGxheWVyTGVmdCIsIl9zdGF0ZSIsIlJlc2V0QWxsVmFyaWFibGVzIiwiSW5wdXRUZXN0RGljZTEiLCJfdmFsIiwiSW5wdXRUZXN0RGljZTIiLCJvbkxvYWQiLCJSZXNldFBheURheSIsIlR1cm5OdW1iZXIiLCJUdXJuQ29tcGxldGVkIiwiQ2hlY2tSZWZlcmVuY2VzIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsIkluaXRfR2FtZU1hbmFnZXIiLCJSYW5kb21DYXJkSW5kZXgiLCJDYXJkQ291bnRlciIsIkNhcmREaXNwbGF5ZWQiLCJjb25zb2xlIiwibG9nIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsIkNoZWNrU3BlY3RhdGUiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIkFsbERhdGEiLCJNYXhQbGF5ZXJzIiwibGVuZ3RoIiwiU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyIiwiVXBkYXRlR2FtZVVJIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJHZXRUdXJuTnVtYmVyIiwiR2V0TXlJbmRleCIsIm15SW5kZXgiLCJfYWN0b3IiLCJQaG90b25BY3RvciIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9hbGxBY3RvcnMiLCJpbmRleCIsIkdldE15UGxheWVyVUlEIiwiX1VJRCIsIlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyIsIkFzc2lnblBsYXllckdhbWVVSSIsIkVuYWJsZVBsYXllck5vZGVzIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIl90b1BvcyIsIlZlYzIiLCJHZXRfU3BhY2VNYW5hZ2VyIiwiRGF0YSIsIlJlZmVyZW5jZUxvY2F0aW9uIiwicG9zaXRpb24iLCJ4IiwieSIsInNldFBvc2l0aW9uIiwiX2xhc3RJbmRleCIsImFjdGl2ZSIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJUb3RhbENvbm5lY3RlZFBsYXllcnMiLCJteVJvb21BY3RvckNvdW50IiwidXNlcklEIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDaGFuZ2VUdXJuIiwiUmFpc2VFdmVudEZvckNhcmQiLCJfZGF0YSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiUmFpc2VFdmVudCIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJEaXNwbGF5Q2FyZE9uT3RoZXJzIiwiT25MYW5kZWRPblNwYWNlIiwic2V0VGltZW91dCIsIlJlc2V0Q2FyZERpc3BsYXkiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiUmFuZG9tQ2FyZCIsInJhbmRvbUNhcmQiLCJjb3VudGVyIiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIlN5bmNBbGxEYXRhIiwiUmVtb3ZlRnJvbUNoZWNrQXJyYXkiLCJfdWlkIiwiX2luZCIsInNwbGljZSIsIkNoZWNrVHVybkNvbXBsZXRlIiwiaiIsIlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZSIsInB1c2giLCJBcnJheUxlbmd0aCIsIklERm91bmQiLCJSZXNldFNvbWVWYWx1ZXMiLCJDaGFuZ2VUdXJuRm9yY2VmdWxseSIsIlVwZGF0ZVZpc3VhbERhdGEiLCJSZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkiLCJUdXJuSGFuZGxlciIsIl90dXJuIiwiX2lzTWFzdGVyIiwiQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50IiwiX3BsYXllck1hdGNoZWQiLCJUb2dnbGVUdXJuUHJvZ3Jlc3MiLCJSZXNldFR1cm5WYXJpYWJsZSIsIlN0YXJ0TmV3R2FtZV9CYW5rUnVwdGVkIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUm9sbERpY2UiLCJEaWNlUm9sbFNjcmVlbiIsIlBsYXllckluZm8iLCJteVJvb21BY3RvcnNBcnJheSIsIlNob3dUb2FzdCIsIlRvZ2dsZVNraXBOZXh0VHVybiIsIlVwZGF0ZVVJRGF0YSIsIk1haW5TZXNzaW9uRGF0YSIsIk15RGF0YSIsIl9jb3VudGVyIiwiU3RhcnRUdXJuIiwiUmVjZWl2ZUJhbmtydXB0RGF0YSIsIl9pc0JhbmtydXB0ZWQiLCJiYW5rcnVwdGVkIiwidHVybiIsIl9wbGF5ZXJEYXRhIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiX3JhbmRvbUluZGV4IiwiZ2V0UmFuZG9tIiwiU2V0TmFtZSIsIlNldEF2YXRhciIsIl90b2dnbGVIaWdobGlnaHQiLCJfaW5kZXgiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJjaGlsZHJlbiIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiQXZhdGFyU3ByaXRlcyIsIlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMiLCJ0YXJnZXRQb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInJhdGlvIiwid2luU2l6ZSIsImhlaWdodCIsInpvb21SYXRpbyIsImxhdGVVcGRhdGUiLCJzeW5jRGljZVJvbGwiLCJfcm9sbCIsIl9kaWNlMSIsImRpY2UxIiwiX2RpY2UyIiwiZGljZTIiLCJfcmVzdWx0IiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwiQW5pbWF0ZURpY2UiLCJEaWNlRnVudGlvbmFsaXR5IiwiX3BvcyIsIlR3ZWVuQ2FtZXJhIiwiVGVtcENoZWNrU3BhY2UiLCJfcm9sbGluZyIsInRlbXBjb3VudGVyIiwidGVtcGNvdW50ZXIyIiwiZGljZXRvYmUiLCJwYXJzZUludCIsIlNwYWNlRGF0YSIsIlNwYWNlc1R5cGUiLCJEaWNlMSIsIkRpY2UyIiwiX25ld1JvbGwiLCJSb2xsT25lRGljZSIsIlJvbGxUd29EaWNlcyIsIlBvcHVsYXRlRGVja3NBcnJheSIsIl9pc0JpZ0J1c2luZXNzIiwiX2lzTG9zc2VzIiwiX2lzTWFya2V0aW5nIiwiX2lzV2lsZENhcmQiLCJzb3J0IiwiTWF0aCIsInJhbmRvbSIsIl90ZW1wRGF0YSIsIkJpZ0FycmF5IiwiTG9zc0FycmF5IiwiTWFya2V0QXJyYXkiLCJXaWxkQXJyeWEiLCJHZXRCaWdCdXNpbmVzc0luZGV4IiwiR2V0TG9zc2VzSW5kZXgiLCJHZXRNYXJrZXRpbmdJbmRleCIsIkdldFdpbGRDYXJkSW5kZXgiLCJVcGRhdGVDb3VudGVycyIsIlNlbGVjdFJlbGF0ZWRDYXJkIiwiY2FsbFVwb25DYXJkIiwiX3NwYWNlSUQiLCJTdGFydERpY2VSb2xsIiwiU2VuZGluZ0RhdGEiLCJpc0JvdCIsImNvbXBsZXRlQ2FyZFR1cm4iLCJBbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZCIsIkNhbGxHYW1lQ29tcGxldGUiLCJfaXNCb3QiLCJfZm9yY2VHYW1lT3ZlciIsIl9wbGF5ZXJJbmRleCIsIl9jYXNoIiwiSE1BbW91bnQiLCJHZXRfR2FtZU1hbmFnZXIiLCJCTUFtb3VudCIsIkJNTG9jYXRpb25zIiwibG9hbkFtb3VudCIsIl9nb2xkIiwiX3N0b2NrcyIsIl9kaWNlUmFuZG9tIiwiT25jZU9yU2hhcmUiLCJHb2xkQ2FzaCIsIlN0b2NrQ2FzaCIsIkJNQ2FzaCIsIkhNQ2FzaCIsIlRvdGFsQXNzZXRzIiwiUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZSIsIlJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhIiwiU3luY0dhbWVPdmVyIiwiaW5mb1RleHQiLCJzdGF0dXNUZXh0IiwiRGlzY29ubmVjdERhdGEiLCJTaG93UmVzdWx0U2NyZWVuIiwiX2N1cnJlbnRDYXNoIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJTdHVkZW50RGF0YSIsImdhbWVDYXNoIiwiX3RvdGFsIiwidG9TdHJpbmciLCJfd29uIiwiZ2FtZXNXb24iLCJVcGRhdGVVc2VyRGF0YSIsIlN5bmNHYW1lQ29tcGxldGVEYXRhIiwiQm90IiwiWm9vbUNhbWVyYU91dE9ubHkiLCJtYXgiLCJTZWxlY3RlZEluZCIsIlNlc3Npb25EYXRhIiwiX3ZhbHVlIiwidHJhY2UiLCJwbGF5ZXJjb21wbGV0ZWQiLCJab29tQ2FtZXJhT3V0IiwiVHdlZW5QbGF5ZXIiLCJtaW4iLCJmbG9vciIsImlzWm9vbSIsInRpbWUiLCJ0d2VlbiIsInRvIiwidjIiLCJlYXNpbmciLCJjYWxsIiwiWm9vbUNhbWVyYUluIiwic3RhcnQiLCJDaGVja1BheURheUNvbmRpdGlvbnMiLCJQcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbiIsIlRvUG9zIiwic3BlZWQiLCJfbmV3cG9zIiwiVG9nZ2xlUGF5RGF5IiwiX3N0MSIsIl9TdDIiLCJJbmNyZWFzZURvdWJsZVBheURheSIsIkV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsImFtb3VudCIsIl9sb2NhdGlvbk5hbWUiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIlNldEJ1c2luZXNzSW5kZXgiLCJTZXRDYXJkRnVuY3Rpb25hbGl0eSIsIlNldEdpdmVuQ2FzaCIsIlNldFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIlJlc2V0RWRpdEJveCIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsImRlc3Ryb3kiLCJVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJfU2hhcmVBbW91bnQiLCJfaXNBZGRpbmciLCJfc3RvY2siLCJfaXNEb3VibGVQYXlEYXkiLCJfZm9yU2VsZWN0ZWRCdXNpbmVzcyIsIl9TZWxlY3RlZEJ1c2luZXNzSW5kZXgiLCJIQkFtb3VudCIsIl90aXRsZSIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJfYW1vdW50IiwiX3VJRCIsIklEIiwiUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9pRCIsIl9teUluZGV4IiwiVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4iLCJUb2dnbGVIYWxmUGF5TmV4dFR1cm4iLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJSZXR1cm5UdXJuUHJvZ3Jlc3MiLCJMb3NlQWxsTWFya2V0aW5nTW9uZXkiLCJfbG9zZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfbXVsdGlwbGllciIsIl9hbW91bnRJbmNyZWFzZWQiLCJHZXRNYXJrZXRpbmdNb25leSIsIl9wcm9maXQiLCJHZXRWb2NhYnVsYXJ5UXVlc3Rpb25zSW5kZXgiLCJQb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfVm9jYWJ1bGFyeSIsIkdldEVzdGFibGlzaG1lbnRRdWVzdGlvbnNJbmRleCIsIlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Fc3RhYmxpc2htZW50IiwiVm9jQXJyYXkiLCJFc3RBcnJheSIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiX3F1ZXN0aW9uUmVmIiwiR2V0X1F1ZXN0aW9uc0RhdGEiLCJfdXNlcklEIiwiVXNlcklEIiwiX3F1ZXN0aW9uSW5kZXgiLCJRdWVzdGlvbiIsIlVzZXJJbmRleCIsIl9pc1ZvYyIsIklzVm9jIiwiX2dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX1FkYXRhIiwiQ29ycmVjdE9wdGlvbiIsIl9tZXNzYWdlIiwiT3B0aW9uMSIsIk9wdGlvbjIiLCJPcHRpb24zIiwiT3B0aW9uNCIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJfaXNUdXJuT3ZlciIsIl9teURhdGEiLCJfcm9vbURhdGEiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9TZWxlY3RPcHRpb25fT25lUXVlc3Rpb24iLCJldmVudCIsIl9zZWxlY3Rpb24iLCJjdXJyZW50VGFyZ2V0Iiwic3BsaXQiLCJSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJTZWxlY3RQbGF5ZXJQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJUb2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJTZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIlNlbGVjdFBsYXllclRha2VPdmVyX1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5IiwiVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyIiwiUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlciIsIlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIiLCJTZWxlY3RQbGF5ZXJCdXlIYWxmQnVzaW5lc3NfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJTZWxlY3RQbGF5ZXJEYW1hZ2luZ0luZm9ybWF0aW9uX1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5IiwiVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckRhbWFnaW5nIiwiUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZyIsIlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmciLCJSZWNlaXZlRXZlbnRfU2VsZWN0UGxheWVyRm9yUHJvZml0X1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5IiwiX293bklEIiwiX3BsYXllck5hbWUiLCJVc2VyTmFtZSIsIl9wbGF5ZXJJRCIsIk93blBsYXllcklEIiwiX2hhc0RvbmVQYXltZW50IiwiX2hhc0Fuc3dlcmVkUXVlc3Rpb24iLCJfVXNlcklEIiwiUGF5bWVudERvbmUiLCJRdWVzdGlvbkFuc3dlcmVkIiwiUXVlc3Rpb25JbmRleCIsIkRlZHVjdENhc2hfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJBZGRDYXNoX0NhcmRGdW5jdGlvbmFsaXR5IiwiX0lEIiwiX21zZyIsIm1zZyIsIm1vZGUiLCJVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbiIsIlJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfc2VsZWN0ZWRQbGF5ZXJJbmRleCIsIl9hY3RvcnNEYXRhIiwiUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5IiwiX3NwYWNlcyIsImJhY2tzcGFjZXMiLCJDb3VudGVyIiwiVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzIiwiR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSIsIlJlY2VpdmVFdmVudF9UYWtlT3ZlckJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5IiwiX2lkIiwiUGxheWVyIiwiX2J1c2luZXNzIiwiQnVzaW5lc3MiLCJfYnVzaW5lc3NJbmRleCIsIkJ1c2luZXNzSW5kZXgiLCJfbXlBY3RvciIsIl9sb2NhdGlvbnMiLCJUYWtlT3ZlckJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5IiwiX2J1eUhhbGZCdXNpbmVzcyIsIl9kaWNlUm9sbCIsIl9tdWx0aXBsaWVyQnVzaW5lc3MiLCJfcGxheWVyIiwiX3NlbmRpbmdEYXRhIiwiRXhpdFNjcmVlbkFsb25nVHVybk92ZXJfX0J1c2luZXNzR2VucmljIiwiX3RlbXBTdW0iLCJSZWNlaXZlRXZlbnRfQnV5SGFsZkJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5IiwiX2Nhc2hBbW91bnQiLCJfc2VuZGVySUQiLCJNeUlEIiwiX3NlbmRlck5hbWUiLCJNeU5hbWUiLCJSZWNlaXZlRXZlbnRfQ29tcGFyZURpY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfcmVjZWl2ZXJQbGF5ZXIiLCJfcmVjZWl2ZXJQbGF5ZXJJbmRleCIsIlBsYXllckluZGV4IiwiX3NlbmRlclBsYXllclVJRCIsIk15VXNlcklEIiwiX3NlbmRlckRpY2UiLCJfcmVjZWl2ZXJEaWNlIiwiX3NlbmRlclBheUxpbWl0IiwiTGltaXQxIiwiX3JlY2VpdmVyUGF5TGltaXQiLCJMaW1pdDIiLCJUb2dnbGVEZWNzaW9uMDFTY3JlZW5fQ29tcGFyZURpY2UiLCJSb2xsRGljZV9Db21wYXJlRGljZV9DYXJkRnVuY3Rpb25hbGl0eSIsIlVJTWFuYWdlciIsIl9pbmZvIiwiVG9nZ2xlRGVjc2lvbjAyU2NyZWVuX0NvbXBhcmVEaWNlIiwiQ2hhbmdlVGl0bGVfRGVjc2lvbjAyU2NyZWVuX0NvbXBhcmVEaWNlIiwiVG9nZ2xlRGVjc2lvbjAyU2NyZWVuQnV0dG9uX0NvbXBhcmVEaWNlIiwiX3NlbnRkYXRhIiwiU2VuZGVyVUlEIiwiRGVjaXNpb25PYmplY3QiLCJSZWNlaXZlRXZlbnRfQ29tcGFyZURpY2VEZWNpc2lvbl9DYXJkRnVuY3Rpb25hbGl0eSIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIkV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckdlbmVyaWMiLCJQYXlBbW91bnRfQ29tcGFyZURpY2VfQ2FyZEZ1bmN0aW9uYWxpdHkiLCJTZXRCYW5rcnVwdGVkVmFyIiwiUGF5QW1vdW50X0J1eUhhbGZCdXNpbmVzc19DYXJkRnVuY3Rpb25hbGl0eSIsIlRvZ2dsZVNjcmVlbl9CdXlIYWxmQnVzaW5lc3MiLCJUb2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSIsIkJ1eUhhbGZCdXNpbmVzc19DYXJkRnVuY3Rpb25hbGl0eSIsIl90ZXh0IiwiU2V0VGl0bGVUZXh0X0J1eUhhbGZCdXNpbmVzcyIsIlJlY2VpdmVFdmVudF9TZWxlY3RQbGF5ZXJEYW1hZ2luZ0RlY2lzaW9uX1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5IiwiU2V0U2VuZGVySURfRGFtYWdlRGVjaXNpb24iLCJUb2dnbGVNYWluU2NyZWVuX0RhbWFnZURlY2lzaW9uIiwiVG9nZ2xlRGljZVJlc3VsdFNjcmVlbl9EYW1hZ2VEZWNpc2lvbiIsIm1vZHVsZSIsImV4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a0JBQWtCLENBQUMwSCwwQkFBbkIsQ0FBOEN0QyxTQUE5Qzs7QUFDQXBGLFVBQUFBLGtCQUFrQixDQUFDMkgsK0JBQW5CLENBQW1ELElBQW5EOztBQUNBM0gsVUFBQUEsa0JBQWtCLENBQUM0SCxxQ0FBbkIsQ0FBeUQsS0FBekQ7QUFDRDtBQUNGO0FBQ0Y7QUFDRixHQXA5RndCLENBczlGekI7QUFDQTs7QUF2OUZ5QixDQUFULENBQWxCLEVBeTlGQTs7QUFDQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCMWQsV0FBakIsRUFDQSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9pc1Rlc3QgPSBmYWxzZTtcclxudmFyIF9kaWNlaW5wdXQxID0gXCJcIjtcclxudmFyIF9kaWNlaW5wdXQyID0gXCJcIjtcclxudmFyIFByZXZpb3VzRGljZVJvbGwxID0gLTE7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsMiA9IC0xO1xyXG52YXIgaGFsZkJ1c2luZXNzQW1vdW50ID0gMDtcclxudmFyIGhhbGZCdXNpbmVzc0Ftb3VudElEID0gXCJcIjtcclxudmFyIGhhbGZCdXNpbmVzc0Ftb3VudEluZGV4ID0gMDtcclxudmFyIFByZXZpb3VzRGljZVJvbGwzID0gLTE7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsNCA9IC0xO1xyXG5cclxudmFyIFByZXZpb3VzRGljZVJvbGw1ID0gLTE7XHJcblxyXG52YXIgdXNlckdhbWVPdmVyID0gZmFsc2U7XHJcbnZhciBCb3RHYW1lT3ZlciA9IGZhbHNlO1xyXG52YXIgVG90YWxDb3VudGVyUmVhY2hlZCA9IGZhbHNlO1xyXG52YXIgUGFzc2VkUGF5RGF5Q291bnRlciA9IDA7XHJcbnZhciBEb3VibGVQYXlEYXlDb3VudGVyID0gMDtcclxudmFyIE5vQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxudmFyIFBsYXllckxlZnQgPSBmYWxzZTtcclxudmFyIEZvcmNlQ2hhbmdlVGltZU91dCA9IG51bGw7XHJcbnZhciBHYW1lQ29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBDb3JyZWN0QW5zd2VyID0gMDtcclxuXHJcbnZhciBWb2NhYnVsYXJ5UXVlc3Rpb25zID0gW107XHJcbnZhciBFc3RhYmxpc2htZW50UXVlc3Rpb25zID0gW107XHJcbnZhciBWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcbnZhciBFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcblxyXG52YXIgQmlnQnVzaW5lc3NBcnJheSA9IFtdO1xyXG52YXIgTG9zc2VzQXJyYXkgPSBbXTtcclxudmFyIE1hcmtldGluZ0FycmF5ID0gW107XHJcbnZhciBXaWxkQ2FyZEFycmF5ID0gW107XHJcbnZhciBCaWdCdXNpbmVzc0FycmF5Q291bnRlciA9IDA7XHJcbnZhciBMb3NzZXNBcnJheUNvdW50ZXIgPSAwO1xyXG52YXIgTWFya2V0aW5nQXJyYXlDb3VudGVyID0gMDtcclxudmFyIFdpbGRDYXJkQXJyYXlDb3VudGVyID0gMDtcclxudmFyIENvbXBhcmVEaWNlRGF0YT1udWxsO1xyXG5cclxuLy8jcmVnaW9uIHN1cGVyY2xhc3NlcyBhbmQgZW51bWVyYXRpb25zXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciB0eXBlIG9mIGJ1c2luZXNzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBFbnVtQnVzaW5lc3NUeXBlID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBIb21lQmFzZWQ6IDEsIC8vYSBidXNpbmVzcyB0aGF0IHlvdSBvcGVyYXRlIG91dCBvZiB5b3VyIGhvbWVcclxuICBicmlja0FuZG1vcnRhcjogMiwgLy9hIHN0b3JlIGZyb250IGJ1c2luZXNzXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NJbmZvID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NJbmZvXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZTogXCJCdXNpbmVzc0RhdGFcIixcclxuICAgIEJ1c2luZXNzVHlwZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb2RlXCIsXHJcbiAgICAgIHR5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICAgIGRlZmF1bHQ6IEVudW1CdXNpbmVzc1R5cGUuTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkJ1c2luZXNzIGNhdG9nb3J5IGZvciBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlRGVzY3JpcHRpb246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVHlwZSAoYnkgbmFtZSkgb2YgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc05hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTmFtZSBvZiB0aGUgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIixcclxuICAgIH0sXHJcbiAgICBBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJiYWxhbmNlIG9mIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSXNQYXJ0bmVyc2hpcDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc1BhcnRuZXJzaGlwXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXB3OiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBkb25lIHBhcnRuZXJzaGlwIHdpdGggc29tZW9uZSB3aXRoIGN1cnJlbnQgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVySUQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lcklEXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJJRCBvZiB0aGUgcGFydG5lciB3aXRoIHdob20gcGxheWVyIGhhcyBmb3JtZWQgcGFydG5lcnNoaXBcIixcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXJ0bmVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibmFtZSBvZiB0aGUgcGFydG5lciB3aXRoIHdob20gcGxheWVyIGhhcyBmb3JtZWQgcGFydG5lcnNoaXBcIixcclxuICAgIH0sXHJcbiAgICBMb2NhdGlvbnNOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvY2F0aW9uc05hbWVcIixcclxuICAgICAgdHlwZTogW2NjLlRleHRdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImlmIHBsYXllciBvd25zIGJyaWNrIGFuZCBtb3J0YXIgaGUvc2hlIGNhbiBleHBhbmQgdG8gbmV3IGxvY2F0aW9uXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblRha2VuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5UYWtlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUmVjZWl2ZURvdWJsZVBheURheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZWNlaXZlRG91YmxlUGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIENhcmREYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkRGF0YUZ1bmN0aW9uYWxpdHkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOZXh0VHVybkRvdWJsZVBheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOZXh0VHVybkRvdWJsZVBheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgaXRzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXkgZGF5IG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFNraXBOZXh0VHVybjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTmV4dFR1cm5cIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIHR1cm4gaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHR1cm4gZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcE5leHRQYXlkYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcE5leHRQYXlkYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIHBheWRheSBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFNraXBITU5leHRQYXlkYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcEhNTmV4dFBheWRheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBob21lIGJhc2VkIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFNraXBCTU5leHRQYXlkYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcEJNTmV4dFBheWRheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBicmlja2EgYW5kIG1tb3J0YXIgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgTmV4dFR1cm5IYWxmUGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5leHRUdXJuSGFsZlBheURheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIE5leHRUdXJuSGFsZlBheURheUNvdW50ZXI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmV4dFR1cm5IYWxmUGF5RGF5Q291bnRlclwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSGFzTWFya2V0aW5nQ29tcGFueToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIYXNNYXJrZXRpbmdDb21wYW55XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQmFua3J1cHRlZE5leHRUdXJuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJhbmtydXB0ZWROZXh0VHVyblwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFN0b2NrSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3RvY2tJbmZvID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU3RvY2tJbmZvXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZTogXCJTdG9ja0RhdGFcIixcclxuICAgIEJ1c2luZXNzTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc05hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5hbWUgb2YgdGhlIGJ1c2luZXNzIGluIHdoaWNoIHN0b2NrcyB3aWxsIGJlIGhlbGRcIixcclxuICAgIH0sXHJcbiAgICBTaGFyZUFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTaGFyZUFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiU2hhcmUgYW1vdW50IG9mIHRoZSBzdG9ja1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgIFBsYXllciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGxheWVyRGF0YVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibmFtZSBvZiB0aGUgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyVUlEOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclVJRFwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiSUQgb2YgdGhlIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEF2YXRhcklEOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhcklEXCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpZCByZWZlcmVuY2UgZm9yIHBsYXllciBhdmF0YXIgc2VsZWN0aW9uXCIsXHJcbiAgICB9LFxyXG4gICAgSXNCb3Q6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNCb3RcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cHc6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBjdXJyZW50IHBsYXllciBpcyBib3RcIixcclxuICAgIH0sXHJcbiAgICBOb09mQnVzaW5lc3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NcIixcclxuICAgICAgdHlwZTogW0J1c2luZXNzSW5mb10sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTnVtYmVyIG9mIGJ1c2luZXNzIGEgcGxheWVyIGNhbiBvd25cIixcclxuICAgIH0sXHJcbiAgICBDYXJkRnVuY3Rpb25hbGl0eToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXJkRnVuY3Rpb25hbGl0eVwiLFxyXG4gICAgICB0eXBlOiBDYXJkRGF0YUZ1bmN0aW9uYWxpdHksXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjYXJkIGZ1bmN0aW9uYWxpdHkgc3RvcmVkIGJ5IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWRBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm51bWJlciBvZiBob21lIGJhc2VkIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhckFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhckFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIG9mIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIFJlY2VpdmVEb3VibGVQYXlEYXlBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVjZWl2ZURvdWJsZVBheURheUFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxMb2NhdGlvbnNBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxMb2NhdGlvbnNBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm51bWJlciBvZiBsb2NhdGlvbnMgb2YgYWxsIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3Nlc3NcIixcclxuICAgIH0sXHJcbiAgICBOb09mU3RvY2tzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2Nrc1wiLFxyXG4gICAgICB0eXBlOiBbU3RvY2tJbmZvXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOdW1iZXIgb2Ygc3RvY2sgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIENhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQW1vdW50IG9mIGNhc2ggcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBHb2xkQ291bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR29sZENvdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjb3VudCBvZiBnb2xkIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBTdG9ja0NvdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2NrQ291bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImNvdW50IG9mIHN0b2NrcyBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblRha2VuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5UYWtlblwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgdGFrZW4gbG9hbiBmcm9tIGJhbmsgb3Igbm90XCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgbG9hbiB0YWtlbiBmcm9tIHRoZSBiYW5rXCIsXHJcbiAgICB9LFxyXG4gICAgTWFya2V0aW5nQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0Ftb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibWFya2V0aW5nIGFtb3VudCBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgTGF3eWVyU3RhdHVzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxhd3llclN0YXR1c1wiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgaGlyZWQgYSBsYXd5ZXIgb3Igbm90XCIsXHJcbiAgICB9LFxyXG4gICAgSXNCYW5rcnVwdDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc0JhbmtydXB0XCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBiZWVuIEJhbmtydXB0ZWQgb3Igbm90XCIsXHJcbiAgICB9LFxyXG4gICAgQmFua3J1cHRBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQmFua3J1cHRBbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaG93IG11Y2ggdGltZSBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFwiLFxyXG4gICAgfSxcclxuICAgIFNraXBwZWRMb2FuUGF5bWVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwcGVkTG9hblBheW1lbnRcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHNraXBwZWQgbG9hbiBwYXltZW50XCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyUm9sbENvdW50ZXI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyUm9sbENvdW50ZXJcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImludGVnZXIgdG8gc3RvcmUgcm9sbCBjb3VudG9yIGZvciBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBJbml0aWFsQ291bnRlckFzc2lnbmVkOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkluaXRpYWxDb3VudGVyQXNzaWduZWRcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBpc0dhbWVGaW5pc2hlZDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJpc0dhbWVGaW5pc2hlZFwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsU2NvcmU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxTY29yZVwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxIQkNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxIQkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQk1DYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQk1DYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEdvbGRDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsR29sZENhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsTG9hbkJhbGFuY2U6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxMb2FuQmFsYW5jZVwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxTdG9ja3NDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsU3RvY2tzQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgR2FtZU92ZXI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR2FtZU92ZXJcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBJc0FjdGl2ZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc0FjdGl2ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhbkdpdmVQcm9maXRPblBheURheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVXNlcklERm9yUHJvZml0UGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlVzZXJJREZvclByb2ZpdFBheURheVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiBHYW1lIE1hbmFnZXIgQ2xhc3NcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKG1haW4gY2xhc3MpIGNsYXNzIGZvciBHYW1lIE1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvbGxDb3VudGVyID0gMDtcclxudmFyIERpY2VUZW1wID0gMDtcclxudmFyIERpY2VSb2xsID0gMDtcclxudmFyIElzVHdlZW5pbmcgPSBmYWxzZTtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG52YXIgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcblxyXG52YXIgUGFzc2VkUGF5RGF5ID0gZmFsc2U7XHJcbnZhciBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuXHJcbi8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG52YXIgX25leHRUdXJuRG91YmxlUGF5ID0gZmFsc2U7XHJcbnZhciBfbmV4dFR1cm5oYWxmUGF5ID0gZmFsc2U7XHJcbnZhciBfc2tpcE5leHRUdXJuID0gZmFsc2U7XHJcbnZhciBfc2tpcE5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxudmFyIF9za2lwSE1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBob21lIGJhc2VkIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIF9za2lwQk1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG52YXIgVHVybkluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHJcbnZhciBCYWNrc3BhY2VzID0gMztcclxudmFyIGlzR2FtZU92ZXIgPSBmYWxzZTtcclxuXHJcbnZhciBDYXJkRGlzcGxheVNldFRpbW91dCA9IG51bGw7XHJcblxyXG52YXIgR2FtZU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJHYW1lTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJHYW1lSW5mbzoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYWxsIHBsYXllcidzIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBCb3RHYW1lSW5mbzoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYWxsIGJvdCdzIGRhdGFcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FtZXJhTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIGNhbWVyYVwiLFxyXG4gICAgfSxcclxuICAgIEFsbFBsYXllclVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBvZiB1aSBvZiBhbGwgcGxheWVyc1wiLFxyXG4gICAgfSxcclxuICAgIEFsbFBsYXllck5vZGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBvZiBub2RlIG9mIGFsbCBwbGF5ZXJzIGluc2lkZSBnYW1lcGxheVwiLFxyXG4gICAgfSxcclxuICAgIFN0YXJ0TG9jYXRpb25Ob2Rlczoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2Ugb2YgYXR0YXkgb2YgbG9jYXRpb25zXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsZWN0ZWRNb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHJlZmVyZW5jZSBmb3IgZ2FtZSBtb2RlIDEgbWVhbnMgYm90IGFuZCAyIG1lYW5zIHJlYWwgcGxheWVyc1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICBQbGF5ZXJEYXRhOiBQbGF5ZXJEYXRhLFxyXG4gICAgQnVzaW5lc3NJbmZvOiBCdXNpbmVzc0luZm8sXHJcbiAgICBDYXJkRGF0YUZ1bmN0aW9uYWxpdHk6IENhcmREYXRhRnVuY3Rpb25hbGl0eSxcclxuICAgIEVudW1CdXNpbmVzc1R5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICBJbnN0YW5jZTogbnVsbCxcclxuICB9LFxyXG5cclxuICBTZXRQbGF5ZXJMZWZ0KF9zdGF0ZSkge1xyXG4gICAgUGxheWVyTGVmdCA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBSZXNldEFsbFZhcmlhYmxlcygpIHtcclxuICAgIFZvY2FidWxhcnlRdWVzdGlvbnMgPSBbXTtcclxuICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnMgPSBbXTtcclxuICAgIFZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuXHJcbiAgICBCaWdCdXNpbmVzc0FycmF5ID0gW107XHJcbiAgICBMb3NzZXNBcnJheSA9IFtdO1xyXG4gICAgTWFya2V0aW5nQXJyYXkgPSBbXTtcclxuICAgIFdpbGRDYXJkQXJyYXkgPSBbXTtcclxuICAgIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyID0gMDtcclxuICAgIExvc3Nlc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICBNYXJrZXRpbmdBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgV2lsZENhcmRBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgQ29tcGFyZURpY2VEYXRhPW51bGw7XHJcblxyXG4gICAgX2RpY2VpbnB1dDEgPSBcIlwiO1xyXG4gICAgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDEgPSAtMTtcclxuICAgIFByZXZpb3VzRGljZVJvbGwyID0gLTE7XHJcbiAgICBQbGF5ZXJMZWZ0ID0gZmFsc2U7XHJcbiAgICBoYWxmQnVzaW5lc3NBbW91bnQgPSAwO1xyXG4gICAgaGFsZkJ1c2luZXNzQW1vdW50SUQgPSBcIlwiO1xyXG4gICAgaGFsZkJ1c2luZXNzQW1vdW50SW5kZXggPSAwO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDMgPSAtMTtcclxuICAgIFByZXZpb3VzRGljZVJvbGw0ID0gLTE7XHJcbiAgICBfbmV4dFR1cm5oYWxmUGF5ID0gZmFsc2U7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsNSA9IC0xO1xyXG4gICAgR2FtZUNvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgdXNlckdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICBCb3RHYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgQ29ycmVjdEFuc3dlciA9IDA7XHJcbiAgICBSb2xsQ291bnRlciA9IDA7XHJcbiAgICBEaWNlVGVtcCA9IDA7XHJcbiAgICBEaWNlUm9sbCA9IDA7XHJcbiAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG4gICAgRm9yY2VDaGFuZ2VUaW1lT3V0ID0gbnVsbDtcclxuICAgIFBhc3NlZFBheURheSA9IGZhbHNlO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgIC8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gZmFsc2U7XHJcbiAgICBfc2tpcE5leHRUdXJuID0gZmFsc2U7XHJcbiAgICBfc2tpcE5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxuICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBob21lIGJhc2VkIGJ1c2luZXNzZXNzIG9ubHlcclxuICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyBvbmx5XHJcbiAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgVHVybkluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuXHJcbiAgICBCYWNrc3BhY2VzID0gMztcclxuICAgIGlzR2FtZU92ZXIgPSBmYWxzZTtcclxuXHJcbiAgICBDYXJkRGlzcGxheVNldFRpbW91dCA9IG51bGw7XHJcbiAgICBUb3RhbENvdW50ZXJSZWFjaGVkID0gZmFsc2U7XHJcbiAgICBOb0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgSW5wdXRUZXN0RGljZTEoX3ZhbCkge1xyXG4gICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgX2RpY2VpbnB1dDEgPSBfdmFsO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIElucHV0VGVzdERpY2UyKF92YWwpIHtcclxuICAgIGlmIChfaXNUZXN0KSB7XHJcbiAgICAgIF9kaWNlaW5wdXQyID0gX3ZhbDtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNyZWdpb24gQWxsIEZ1bmN0aW9ucyBvZiBHYW1lTWFuYWdlclxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIGNsYXNzIGlzIGNyZWF0ZWRcclxuICAgKiovXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5SZXNldEFsbFZhcmlhYmxlcygpO1xyXG4gICAgdGhpcy5SZXNldFBheURheSgpO1xyXG4gICAgR2FtZU1hbmFnZXIuSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgdGhpcy5UdXJuTnVtYmVyID0gMDtcclxuICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLlNlbGVjdGVkTW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICB0aGlzLkluaXRfR2FtZU1hbmFnZXIoKTtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleCA9IDA7XHJcbiAgICB0aGlzLkNhcmRDb3VudGVyID0gMDtcclxuICAgIHRoaXMuQ2FyZERpc3BsYXllZCA9IGZhbHNlO1xyXG4gICAgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBSZXNldFBheURheSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicmVzZXRpbmcgcGF5ZGF5XCIpO1xyXG4gICAgX3NraXBOZXh0UGF5ZGF5ID0gZmFsc2U7XHJcbiAgICBfc2tpcEhNTmV4dFBheWRheSA9IGZhbHNlO1xyXG4gICAgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTtcclxuICAgIFBhc3NlZFBheURheSA9IGZhbHNlO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gZmFsc2U7XHJcbiAgICBfbmV4dFR1cm5oYWxmUGF5ID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gYXNzaWduIHJlZmVyZW5jZSBvZiByZXF1aXJlZCBjbGFzc2VzXHJcbiAgICoqL1xyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgaW5pdGlhbCBnYW1lbWFuYWdlciBlc3NldGlhbHNcclxuICAgKiovXHJcbiAgSW5pdF9HYW1lTWFuYWdlcigpIHtcclxuICAgIHRoaXMuQ2FtZXJhID0gdGhpcy5DYW1lcmFOb2RlLmdldENvbXBvbmVudChjYy5DYW1lcmEpO1xyXG4gICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm8gPSBbXTtcclxuICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIERpY2VSb2xsID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IHJlYWwgcGxheWVyc1xyXG4gICAgICAvL2lmIGpvaW5lZCBwbGF5ZXIgaXMgc3BlY3RhdGVcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IHRydWUpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwic3RhdHVzIG9mIGluaXRpYWwgYnVzaW5lc3Mgc2V0cDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKSk7XHJcblxyXG4gICAgICAgIC8vaWYgaW5pdGFsIHNldHVwIGhhcyBiZWVuIGRvbmUgYW5kIGdhbWUgaXMgdW5kZXIgd2F5XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIikgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgIHZhciBBbGxEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbyA9IEFsbERhdGE7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICB0aGlzLlR1cm5OdW1iZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiKTtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICAgICAgLy90aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gODtcclxuICAgICAgICAgIC8vdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Jbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IGJvdCBhbG9uZyB3aXRoIG9uZSBwbGF5ZXJcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLCBmYWxzZSwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBwdWJsaWMgZnVuY3Rpb25zIHRvIGdldCBkYXRhIChhY2Nlc3NpYmxlIGZyb20gb3RoZXIgY2xhc3NlcylcclxuICBHZXRUdXJuTnVtYmVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuVHVybk51bWJlcjtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGdldCBteSBpbmRleCBpbiBhcnJheSBvZiBQbGF5ZXJHYW1lSW5mbyBcclxuICAgKiovXHJcbiAgR2V0TXlJbmRleCgpIHtcclxuICAgIHZhciBteUluZGV4ID0gMDtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfYWxsQWN0b3JzID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FsbEFjdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9hY3Rvci5QbGF5ZXJVSUQgPT0gX2FsbEFjdG9yc1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgbXlJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG15SW5kZXg7XHJcbiAgfSxcclxuXHJcbiAgR2V0TXlQbGF5ZXJVSUQoKSB7XHJcbiAgICB2YXIgX1VJRCA9IFwiXCI7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB2YXIgX2FsbEFjdG9ycyA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hbGxBY3RvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfYWN0b3IuUGxheWVyVUlEID09IF9hbGxBY3RvcnNbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgIF9VSUQ9X2FjdG9yLlBsYXllclVJRCA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX1VJRDtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU3BlY3RhdGVNb2RlIENvZGVcclxuXHJcbiAgU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCkge1xyXG4gICAgdmFyIEFsbERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gQWxsRGF0YTtcclxuICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInN5bmNpbmcgYWxsIGRhdGEgZm9yIHNwZWN0YXRlXCIpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlciA+IDAgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCA9PSB0cnVlICYmICF0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCwgX3RvUG9zLnkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZyBwb3MxXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNvdW50ZXI6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5pdGlhbCBDb3VudGVyIEFzc2lnbmVkOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSBmaW5pc2hlZCA6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICB2YXIgX2xhc3RJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGggLSAxO1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtfbGFzdEluZGV4XS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2xhc3RJbmRleF0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsIF90b1Bvcy55KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNldHRpbmcgcG9zMlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5sb2coXCJzeW5jZWQgcGxheWVybm9kZXNcIik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKSB7XHJcbiAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID09IFRvdGFsQ29ubmVjdGVkUGxheWVycykge1xyXG4gICAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInJlc2V0aW5nIGZvciBzcGVjdGF0ZVwiKTtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgVHVybiBpcyBjYWxsZWQgYnk6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBmdW5jdGlvbnMgcmVsYXRlZCB0byBUdXJuIE1lY2hhbmlzbSBhbmQgY2FyZCBtZWNoYW5pc21cclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHdoYXQgY2FyZCBoYXMgYmVlbiBzZWxlY3RlZCBieSBwbGF5ZXJcclxuICAgKiovXHJcbiAgUmFpc2VFdmVudEZvckNhcmQoX2RhdGEpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNSwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIENsZWFyRGlzcGxheVRpbWVvdXQoKSB7XHJcbiAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gIH0sXHJcblxyXG4gIERpc3BsYXlDYXJkT25PdGhlcnMoKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgY29uc29sZS5sb2coXCJjYXJkIGV2ZW50IHJlY2VpdmVkOiBcIiArIENhcmRFdmVudFJlY2VpdmVkKTtcclxuICAgICAgaWYgKENhcmRFdmVudFJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5DYXJkQ291bnRlcik7XHJcbiAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMuQ2FyZERpc3BsYXllZCkge1xyXG4gICAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkID0gdHJ1ZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLkNhcmRDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKGZhbHNlLCB0aGlzLlJhbmRvbUNhcmRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIENhcmREaXNwbGF5U2V0VGltb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAvL2NoZWNrIGFmdGVyIGV2ZXJ5IDAuNSBzZWNvbmRzXHJcbiAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0Q2FyZERpc3BsYXkoKSB7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRGb3JDYXJkKF9kYXRhKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgY29uc29sZS5sb2coXCJDYXJkIERhdGEgUmVjZWl2ZWQ6XCIpO1xyXG4gICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG5cclxuICAgIHZhciBSYW5kb21DYXJkID0gX2RhdGEucmFuZG9tQ2FyZDtcclxuICAgIHZhciBjb3VudGVyID0gX2RhdGEuY291bnRlcjtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleCA9IFJhbmRvbUNhcmQ7XHJcbiAgICB0aGlzLkNhcmRDb3VudGVyID0gY291bnRlcjtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZSh0cnVlLCBSYW5kb21DYXJkKTtcclxuICAgICAgZWxzZSBDYXJkRXZlbnRSZWNlaXZlZCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSBmYWxzZSkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UodHJ1ZSwgUmFuZG9tQ2FyZCk7XHJcbiAgICAgIGVsc2UgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsIFJhbmRvbUNhcmQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKENhcmRFdmVudFJlY2VpdmVkKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJhaXNlZCBldmVudCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHMgdG8gbGV0IG90aGVycyBrbm93IGEgcGFydGljdWxhciBwbGF5ZXIgaGFzIGNvbXBsZXRlIHRoZWlyIG1vdmVcclxuICAgKiovXHJcbiAgUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg0LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInJhaXNlZCBmb3IgdHVybiBjb21wbGV0ZVwiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg0LCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTeW5jQWxsRGF0YSgpIHtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCB0aGlzLlBsYXllckdhbWVJbmZvLCB0cnVlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZW1vdmVGcm9tQ2hlY2tBcnJheShfdWlkKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB2YXIgX2luZCA9IC0xO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFR1cm5DaGVja0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChUdXJuQ2hlY2tBcnJheVtpbmRleF0gPT0gX3VpZCkgX2luZCA9IGluZGV4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2luZCAhPSAtMSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZpbmcgZnJvbSB0dXJuIGNoZWNrIGFycmF5XCIpO1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5LnNwbGljZShfaW5kLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENoZWNrVHVybkNvbXBsZXRlKCkge1xyXG4gICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycyA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2pdLklzQWN0aXZlKSBUb3RhbENvbm5lY3RlZFBsYXllcnMrKztcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIlR1cm4gQ2hlY2s6IFwiICsgVHVybkNoZWNrQXJyYXkubGVuZ3RoKTtcclxuICAgIGNvbnNvbGUubG9nKFwiVG90YWwgQ29ubmVjdGVkIFBsYXllcnM6IFwiICsgVG90YWxDb25uZWN0ZWRQbGF5ZXJzKTtcclxuICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5KTtcclxuXHJcbiAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID49IFRvdGFsQ29ubmVjdGVkUGxheWVycykge1xyXG4gICAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICAvL3RoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIG9uIGFsbCBwbGF5ZXJzIHRvIHZhbGlkYXRlIGlmIG1vdmUgaXMgY29tcGxldGVkIG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50c1xyXG4gICAqKi9cclxuICBSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUoX3VpZCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9yZWFsIHBsYXllcnNcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID09IDApIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7XHJcblxyXG4gICAgICAgIHZhciBBcnJheUxlbmd0aCA9IFR1cm5DaGVja0FycmF5Lmxlbmd0aDtcclxuICAgICAgICB2YXIgSURGb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBcnJheUxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKFR1cm5DaGVja0FycmF5W2luZGV4XSA9PSBfdWlkKSBJREZvdW5kID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghSURGb3VuZCkge1xyXG4gICAgICAgICAgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQ2hlY2tUdXJuQ29tcGxldGUoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyO1xyXG4gICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGRpY2UgYW5pbWF0aW9uIGlzIHBsYXllZCBvbiBhbGwgcGxheWVyc1xyXG4gICAqKi9cclxuICBDaGFuZ2VUdXJuKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdGhpcy5TeW5jQWxsRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLlR1cm5OdW1iZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHRoaXMuVHVybk51bWJlciA9IHRoaXMuVHVybk51bWJlciArIDE7XHJcbiAgICBlbHNlIHRoaXMuVHVybk51bWJlciA9IDA7XHJcblxyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0U29tZVZhbHVlcygpIHtcclxuICAgIC8vVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgIC8vdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuICB9LFxyXG5cclxuICBDaGFuZ2VUdXJuRm9yY2VmdWxseSgpIHtcclxuICAgIGlmIChJc1R3ZWVuaW5nKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChGb3JjZUNoYW5nZVRpbWVPdXQpO1xyXG4gICAgICBGb3JjZUNoYW5nZVRpbWVPdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm5Gb3JjZWZ1bGx5KCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KEZvcmNlQ2hhbmdlVGltZU91dCk7XHJcbiAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVZpc3VhbERhdGEoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgZnJvbSByYWlzZSBvbiBldmVudCAoZnJvbSBmdW5jdGlvbiBcIlN0YXJ0VHVyblwiIGFuZCBcIkNoYW5nZVR1cm5cIiBvZiB0aGlzIHNhbWUgY2xhc3MpIHRvIGhhbmRsZSB0dXJuXHJcbiAgICoqL1xyXG4gIFR1cm5IYW5kbGVyKF90dXJuKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB2YXIgX2lzTWFzdGVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoKTtcclxuICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW190dXJuXS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgIGlmIChfaXNNYXN0ZXIpIHtcclxuICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy90aGlzLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgIHRoaXMuVXBkYXRlVmlzdWFsRGF0YSgpO1xyXG4gICAgY29uc29sZS5sb2coXCJUdXJuOiBcIiArIF90dXJuKTtcclxuICAgIHZhciBfcGxheWVyTWF0Y2hlZCA9IGZhbHNlO1xyXG4gICAgX3NraXBOZXh0VHVybiA9IGZhbHNlO1xyXG4gICAgaWYgKElzVHdlZW5pbmcpIHtcclxuICAgICAgLy9jaGVjayBpZiBhbmltYXRpb24gb2YgdHVybiBiZWluZyBwbGF5ZWQgb24gb3RoZXIgcGxheWVyc1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgIHRoaXMuVHVybkhhbmRsZXIoX3R1cm4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgODAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuVHVybk51bWJlciA9IF90dXJuO1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LkJhbmtydXB0ZWROZXh0VHVybikge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuQmFua3J1cHRlZE5leHRUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdHYW1lX0JhbmtSdXB0ZWQoXCJZb3Ugd2VyZSBiYW5rcnVwdGVkIGFuZCB3aWxsIHN0YXJ0IGZyb20gYmVnaW4uXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VyR2FtZU92ZXIpO1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIF9za2lwTmV4dFR1cm4gPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgaWYgKCF1c2VyR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3ModHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICghX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIHlvdXIgdHVybiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gLy90dXJuIGRlY2lzaW9ucyBmb3IgYm90XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgIGlmICghQm90R2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUm9sbERpY2UoKTtcclxuICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSwgdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIHRoaXMuVHVybk51bWJlciwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUdXJuIE9mOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbFBsYXllclVJW3RoaXMuVHVybk51bWJlcl0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUGxheWVySW5mbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy9za2lwIHRoaXMgdHVybiBhcyBza2lwIHR1cm4gaGFzIGJlZW4gY2FsbGVkIGJlZm9yZVxyXG4gICAgICBpZiAoX3BsYXllck1hdGNoZWQgJiYgX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsIDEyMDApO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2tpcE5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5VcGRhdGVVSURhdGEoKTtcclxuICB9LFxyXG5cclxuICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZCkge1xyXG4gICAgdmFyIE1haW5TZXNzaW9uRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgIHZhciBNeURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX2NvdW50ZXIgPSBfaW5kO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEKTtcclxuICAgIC8vICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5Jc0FjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChfY291bnRlciA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzeW5jZWQgRGF0YTpcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCA9PSBNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXSA9IE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuXHJcbiAgICAgICAgICBpZiAoX2NvdW50ZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImFkZGluZyBjb3VudGVyOiBcIitfY291bnRlcik7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3luY2VkIERhdGE6XCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGFsbCBwbGF5ZXJzIGhhdmUgZG9uZSB0aGVpciBpbml0aWFsIHNldHVwIGFuZCBmaXJzdCB0dXJuIHN0YXJ0c1xyXG4gICAgQG1ldGhvZCBTdGFydFR1cm5cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFN0YXJ0VHVybigpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgIHRoaXMuVHVybk51bWJlciA9IDA7IC8vcmVzZXRpbmcgdGhlIHR1cm4gbnVtYmVyIG9uIHN0YXJ0IG9mIHRoZSBnYW1lXHJcblxyXG4gICAgLy9zZW5kaW5nIGluaXRpYWwgdHVybiBudW1iZXIgb3ZlciB0aGUgbmV0d29yayB0byBzdGFydCB0dXJuIHNpbXVsdGFub3VzbHkgb24gYWxsIGNvbm5lY3RlZCBwbGF5ZXIncyBkZXZpY2VzXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsIHRoaXMuVHVybk51bWJlcik7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUJhbmtydXB0RGF0YShfZGF0YSkge1xyXG4gICAgLy9vdGhlciBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFxyXG4gICAgdmFyIF9pc0JhbmtydXB0ZWQgPSBfZGF0YS5EYXRhLmJhbmtydXB0ZWQ7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLnR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGFNYWluO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF9pc0JhbmtydXB0ZWQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coX3R1cm4pO1xyXG4gICAgLy8gY29uc29sZS5sb2coX3BsYXllckRhdGEpO1xyXG5cclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3R1cm5dID0gX3BsYXllckRhdGE7XHJcblxyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkodHJ1ZSk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKHRydWUpO1xyXG5cclxuICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpIHtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIH0sIDEwMDApO1xyXG5cclxuICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEZ1bmN0aW9uIGZvciBnYW1lcGxheVxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiBwbGF5ZXIgVUkgKG5hbWUvaWNvbnMvbnVtYmVyIG9mIHBsYXllcnMgdGhhdCB0byBiZSBhY3RpdmUgZXRjKVxyXG4gICAgQG1ldGhvZCBBc3NpZ25QbGF5ZXJHYW1lVUlcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEFzc2lnblBsYXllckdhbWVVSShfaXNCYW5rcnVwdGVkID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBpZiAoIV9pc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB2YXIgX3JhbmRvbUluZGV4ID0gdGhpcy5nZXRSYW5kb20oMCwgdGhpcy5Cb3RHYW1lSW5mby5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm8ucHVzaCh0aGlzLkJvdEdhbWVJbmZvW19yYW5kb21JbmRleF0pO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IDI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8gPSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuU2V0QXZhdGFyKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlR2FtZVVJKF90b2dnbGVIaWdobGlnaHQsIF9pbmRleCkge1xyXG4gICAgaWYgKF90b2dnbGVIaWdobGlnaHQpIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtfaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8gPSB0aGlzLlBsYXllckdhbWVJbmZvW19pbmRleF07XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9pbmRleCA9PSBpbmRleCkge1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlQkdIaWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlQkdIaWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5Ub2dnbGVUZXh0aWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gZW5iYWxlIHJlc3BlY3RpdmUgcGxheWVycyBub2RlcyBpbnNpZGUgZ2FtYXBsYXlcclxuICAgIEBtZXRob2QgRW5hYmxlUGxheWVyTm9kZXNcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEVuYWJsZVBsYXllck5vZGVzKF9pc0JhbmtydXB0ZWQgPSBmYWxzZSkge1xyXG4gICAgaWYgKCFfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQgPT0gMSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQgPT0gMSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSG9tZUJhc2VkQW1vdW50ID09IDEpIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJyaWNrQW5kTW9ydGFyQW1vdW50ID09IDEpIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkF2YXRhclNwcml0ZXNbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySURdO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKSB7XHJcbiAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsIDEyMCkpO1xyXG4gICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uID0gdGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG5cclxuICAgIGxldCByYXRpbyA9IHRhcmdldFBvcy55IC8gY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAyO1xyXG4gIH0sXHJcblxyXG4gIGxhdGVVcGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5pc0NhbWVyYVpvb21pbmcpIHRoaXMuU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpO1xyXG4gIH0sXHJcblxyXG4gIHN5bmNEaWNlUm9sbChfcm9sbCkge1xyXG4gICAgdmFyIF9kaWNlMSA9IF9yb2xsLmRpY2UxO1xyXG4gICAgdmFyIF9kaWNlMiA9IF9yb2xsLmRpY2UyO1xyXG4gICAgdmFyIF9yZXN1bHQgPSBfZGljZTEgKyBfZGljZTI7XHJcblxyXG4gICAgSXNUd2VlbmluZyA9IHRydWU7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEID09IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9PSAwICYmICF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coUm9sbENvdW50ZXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICBSb2xsQ291bnRlciA9IDE0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFJvbGxDb3VudGVyKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9PSAxMykgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyICsgMjI7XHJcbiAgICAgIGVsc2UgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyICsgMTtcclxuXHJcbiAgICAgIFJvbGxDb3VudGVyID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICBjb25zb2xlLmxvZyhSb2xsQ291bnRlciAtIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIERpY2VSb2xsID0gX3Jlc3VsdDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5QcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24oRGljZVJvbGwpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5UdXJuTnVtYmVyID09IGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5nZXRDb21wb25lbnQoXCJEaWNlQ29udHJvbGxlclwiKS5BbmltYXRlRGljZShfZGljZTEsIF9kaWNlMik7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVwZGF0ZVVJRGF0YSgpO1xyXG4gICAgLy8gbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgIC8vIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgIC8vIHRoaXMuVHdlZW5DYW1lcmEoX3Bvcyx0cnVlLDAuNCk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlVUlEYXRhKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgRGljZUZ1bnRpb25hbGl0eSgpIHtcclxuICAgIGxldCB0YXJnZXRQb3MgPSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwgMTIwKSk7XHJcbiAgICB2YXIgX3BvcyA9IHRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgIHRoaXMuVHdlZW5DYW1lcmEoX3BvcywgdHJ1ZSwgMC40KTtcclxuICB9LFxyXG5cclxuICBUZW1wQ2hlY2tTcGFjZShfcm9sbGluZykge1xyXG4gICAgdmFyIHRlbXBjb3VudGVyID0gMDtcclxuICAgIHZhciB0ZW1wY291bnRlcjIgPSAwO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICB0ZW1wY291bnRlcjIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGVtcGNvdW50ZXIyIC0gMSA8IDApIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzdGFydGluZyBmcm9tIG9ibGl2aW9uXCIpO1xyXG4gICAgICB0ZW1wY291bnRlciA9IHRlbXBjb3VudGVyMiArIF9yb2xsaW5nIC0gMTtcclxuICAgICAgdmFyIGRpY2V0b2JlID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInRvIGJlOiBcIiArIGRpY2V0b2JlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRlbXBjb3VudGVyID0gdGVtcGNvdW50ZXIyICsgX3JvbGxpbmc7XHJcbiAgICAgIHZhciBkaWNldG9iZSA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgY29uc29sZS5sb2coXCJ0byBiZTogXCIgKyBkaWNldG9iZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUm9sbERpY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICB2YXIgRGljZTE7XHJcbiAgICAgIHZhciBEaWNlMjtcclxuICAgICAgaWYgKF9pc1Rlc3QgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgRGljZTEgPSBwYXJzZUludChfZGljZWlucHV0MSk7XHJcbiAgICAgICAgRGljZTIgPSBwYXJzZUludChfZGljZWlucHV0Mik7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IHRydWUgJiYgX2lzVGVzdCkge1xyXG4gICAgICAgIERpY2UxID0gMjA7XHJcbiAgICAgICAgRGljZTIgPSAyMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgICAgIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMSA9PSBEaWNlMSkgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICAgICAgaWYgKFByZXZpb3VzRGljZVJvbGwyID09IERpY2UyKSBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsMSA9IERpY2UxO1xyXG4gICAgICAgIFByZXZpb3VzRGljZVJvbGwyID0gRGljZTI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHZhciBEaWNlMT0yMDtcclxuICAgICAgLy8gdmFyIERpY2UyPTE7XHJcblxyXG4gICAgICBEaWNlUm9sbCA9IERpY2UxICsgRGljZTI7XHJcbiAgICAgIHZhciBfbmV3Um9sbCA9IHsgZGljZTE6IERpY2UxLCBkaWNlMjogRGljZTIgfTtcclxuICAgICAgLy9EaWNlUm9sbD0yMztcclxuICAgICAgLy90aGlzLlRlbXBDaGVja1NwYWNlKERpY2VSb2xsKTtcclxuICAgICAgY29uc29sZS5sb2coXCJkaWNlIG51bWJlcjogXCIgKyBEaWNlUm9sbCArIFwiLCBEaWNlMTpcIiArIERpY2UxICsgXCIsIERpY2UyOlwiICsgRGljZTIpO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgzLCBfbmV3Um9sbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUm9sbE9uZURpY2UoKSB7XHJcbiAgICB2YXIgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDUgPT0gRGljZTEpIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgUHJldmlvdXNEaWNlUm9sbDUgPSBEaWNlMTtcclxuXHJcbiAgICByZXR1cm4gRGljZTE7XHJcbiAgfSxcclxuXHJcbiAgUm9sbFR3b0RpY2VzKCkge1xyXG4gICAgdmFyIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcbiAgICB2YXIgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDMgPT0gRGljZTEpIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGw0ID09IERpY2UyKSBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIFByZXZpb3VzRGljZVJvbGwzID0gRGljZTE7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsNCA9IERpY2UyO1xyXG5cclxuICAgIHJldHVybiBEaWNlMSArIERpY2UyO1xyXG4gIH0sXHJcblxyXG4gIFBvcHVsYXRlRGVja3NBcnJheShfaXNCaWdCdXNpbmVzcyA9IGZhbHNlLCBfaXNMb3NzZXMgPSBmYWxzZSwgX2lzTWFya2V0aW5nID0gZmFsc2UsIF9pc1dpbGRDYXJkID0gZmFsc2UsIF9kYXRhID0gbnVsbCkge1xyXG4gICAgLy8gQmlnQnVzaW5lc3NBcnJheSA9IFtdO1xyXG4gICAgLy8gTG9zc2VzQXJyYXkgPSBbXTtcclxuICAgIC8vIE1hcmtldGluZ0FycmF5ID0gW107XHJcbiAgICAvLyBXaWxkQ2FyZEFycmF5ID0gW107XHJcbiAgICAvLyBCaWdCdXNpbmVzc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAvLyBMb3NzZXNBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgLy8gTWFya2V0aW5nQXJyYXlDb3VudGVyID0gMDtcclxuICAgIC8vIFdpbGRDYXJkQXJyYXlDb3VudGVyID0gMDtcclxuXHJcbiAgICBpZiAoX2lzQmlnQnVzaW5lc3MpIHtcclxuICAgICAgaWYgKF9kYXRhID09IG51bGwpIHtcclxuICAgICAgICBCaWdCdXNpbmVzc0FycmF5ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNF07XHJcblxyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXkuc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coQmlnQnVzaW5lc3NBcnJheSk7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogQmlnQnVzaW5lc3NBcnJheSwgTG9zc0FycmF5OiBudWxsLCBNYXJrZXRBcnJheTogbnVsbCwgV2lsZEFycnlhOiBudWxsIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxOSwgX3RlbXBEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNMb3NzZXMpIHtcclxuICAgICAgaWYgKF9kYXRhID09IG51bGwpIHtcclxuICAgICAgICBMb3NzZXNBcnJheSA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTRdO1xyXG5cclxuICAgICAgICBMb3NzZXNBcnJheS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhMb3NzZXNBcnJheSk7XHJcbiAgICAgICAgTG9zc2VzQXJyYXlDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IG51bGwsIExvc3NBcnJheTogTG9zc2VzQXJyYXksIE1hcmtldEFycmF5OiBudWxsLCBXaWxkQXJyeWE6IG51bGwgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE5LCBfdGVtcERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9pc01hcmtldGluZykge1xyXG4gICAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNF07XHJcblxyXG4gICAgICAgIE1hcmtldGluZ0FycmF5LnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKE1hcmtldGluZ0FycmF5KTtcclxuICAgICAgICBNYXJrZXRpbmdBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogbnVsbCwgTG9zc0FycmF5OiBudWxsLCBNYXJrZXRBcnJheTogTWFya2V0aW5nQXJyYXksIFdpbGRBcnJ5YTogbnVsbCB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTksIF90ZW1wRGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX2lzV2lsZENhcmQpIHtcclxuICAgICAgaWYgKF9kYXRhID09IG51bGwpIHtcclxuICAgICAgICBXaWxkQ2FyZEFycmF5ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwxMiwxMywxNF07XHJcblxyXG4gICAgICAgIFdpbGRDYXJkQXJyYXkuc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coV2lsZENhcmRBcnJheSk7XHJcbiAgICAgICAgV2lsZENhcmRBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogbnVsbCwgTG9zc0FycmF5OiBudWxsLCBNYXJrZXRBcnJheTogbnVsbCwgV2lsZEFycnlhOiBXaWxkQ2FyZEFycmF5IH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxOSwgX3RlbXBEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgIGlmIChfZGF0YS5CaWdBcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheSA9IF9kYXRhLkJpZ0FycmF5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEJpZ0J1c2luZXNzQXJyYXkpO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9kYXRhLkxvc3NBcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgTG9zc2VzQXJyYXkgPSBfZGF0YS5Mb3NzQXJyYXk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTG9zc2VzQXJyYXkpO1xyXG4gICAgICAgIExvc3Nlc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfZGF0YS5NYXJrZXRBcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXkgPSBfZGF0YS5NYXJrZXRBcnJheTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNYXJrZXRpbmdBcnJheSk7XHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXlDb3VudGVyID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9kYXRhLldpbGRBcnJ5YSAhPSBudWxsKSB7XHJcbiAgICAgICAgV2lsZENhcmRBcnJheSA9IF9kYXRhLldpbGRBcnJ5YTtcclxuICAgICAgICBjb25zb2xlLmxvZyhXaWxkQ2FyZEFycmF5KTtcclxuICAgICAgICBXaWxkQ2FyZEFycmF5Q291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZXRCaWdCdXNpbmVzc0luZGV4KF9pbmRleCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChCaWdCdXNpbmVzc0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyIDwgQmlnQnVzaW5lc3NBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gQmlnQnVzaW5lc3NBcnJheVtCaWdCdXNpbmVzc0FycmF5Q291bnRlcl07XHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIrKztcclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogdHJ1ZSwgTG9zc0FycmF5OiBmYWxzZSwgTWFya2V0QXJyYXk6IGZhbHNlLCBXaWxkQXJyeWE6IGZhbHNlIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyMCwgX3RlbXBEYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheSh0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkodHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3ZhbDtcclxuICB9LFxyXG5cclxuICBHZXRMb3NzZXNJbmRleChfaW5kZXgpIHtcclxuICAgIHZhciBfdmFsID0gLTE7XHJcbiAgICBpZiAoTG9zc2VzQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoTG9zc2VzQXJyYXlDb3VudGVyIDwgTG9zc2VzQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgX3ZhbCA9IExvc3Nlc0FycmF5W0xvc3Nlc0FycmF5Q291bnRlcl07XHJcbiAgICAgICAgTG9zc2VzQXJyYXlDb3VudGVyKys7XHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IGZhbHNlLCBMb3NzQXJyYXk6IHRydWUsIE1hcmtldEFycmF5OiBmYWxzZSwgV2lsZEFycnlhOiBmYWxzZSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjAsIF90ZW1wRGF0YSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkoZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSwgbnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0TWFya2V0aW5nSW5kZXgoX2luZGV4KSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKE1hcmtldGluZ0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKE1hcmtldGluZ0FycmF5Q291bnRlciA8IE1hcmtldGluZ0FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBNYXJrZXRpbmdBcnJheVtNYXJrZXRpbmdBcnJheUNvdW50ZXJdO1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5Q291bnRlcisrO1xyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBmYWxzZSwgTG9zc0FycmF5OiBmYWxzZSwgTWFya2V0QXJyYXk6IHRydWUsIFdpbGRBcnJ5YTogZmFsc2UgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIwLCBfdGVtcERhdGEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsIG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIEdldFdpbGRDYXJkSW5kZXgoX2luZGV4KSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKFdpbGRDYXJkQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoV2lsZENhcmRBcnJheUNvdW50ZXIgPCBXaWxkQ2FyZEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBXaWxkQ2FyZEFycmF5W1dpbGRDYXJkQXJyYXlDb3VudGVyXTtcclxuICAgICAgICBXaWxkQ2FyZEFycmF5Q291bnRlcisrO1xyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBmYWxzZSwgTG9zc0FycmF5OiBmYWxzZSwgTWFya2V0QXJyYXk6IGZhbHNlLCBXaWxkQXJyeWE6IHRydWUgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIwLCBfdGVtcERhdGEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUNvdW50ZXJzKF9kYXRhID0gbnVsbCkge1xyXG4gICAgaWYgKF9kYXRhLkJpZ0FycmF5KSB7XHJcbiAgICAgIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyKys7XHJcbiAgICB9XHJcbiAgICBpZiAoX2RhdGEuTG9zc0FycmF5KSB7XHJcbiAgICAgIExvc3Nlc0FycmF5Q291bnRlcisrO1xyXG4gICAgfVxyXG4gICAgaWYgKF9kYXRhLk1hcmtldEFycmF5KSB7XHJcbiAgICAgIE1hcmtldGluZ0FycmF5Q291bnRlcisrO1xyXG4gICAgfVxyXG4gICAgaWYgKF9kYXRhLldpbGRBcnJ5YSkge1xyXG4gICAgICBXaWxkQ2FyZEFycmF5Q291bnRlcisrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNlbGVjdFJlbGF0ZWRDYXJkKF9pc0JpZ0J1c2luZXNzID0gZmFsc2UsIF9pc0xvc3NlcyA9IGZhbHNlLCBfaXNNYXJrZXRpbmcgPSBmYWxzZSwgX2lzV2lsZENhcmQgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc0JpZ0J1c2luZXNzKSB7XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0QmlnQnVzaW5lc3NJbmRleCgpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRCaWdCdXNpbmVzc0luZGV4KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldEJpZ0J1c2luZXNzSW5kZXgoKTtcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRCaWdCdXNpbmVzc0luZGV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNMb3NzZXMpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRMb3NzZXNJbmRleCgpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRMb3NzZXNJbmRleCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRMb3NzZXNJbmRleCgpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgaW5kZXggPSB0aGlzLkdldExvc3Nlc0luZGV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNNYXJrZXRpbmcpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRNYXJrZXRpbmdJbmRleCgpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRNYXJrZXRpbmdJbmRleCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRNYXJrZXRpbmdJbmRleCgpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgaW5kZXggPSB0aGlzLkdldE1hcmtldGluZ0luZGV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNXaWxkQ2FyZCkge1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldFdpbGRDYXJkSW5kZXgoKTtcclxuICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0V2lsZENhcmRJbmRleCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRXaWxkQ2FyZEluZGV4KCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0V2lsZENhcmRJbmRleCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjYWxsVXBvbkNhcmQoKSB7XHJcbiAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBfc3BhY2VJRCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICBpZiAoX3NwYWNlSUQgIT0gNiAmJiBfc3BhY2VJRCAhPSA3KSB7XHJcbiAgICAgICAgICAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVhbnMgc2VsbCBzcGFjZVxyXG4gICAgICAgICAgdmFyIFJhbmRvbUNhcmQgPSB0aGlzLmdldFJhbmRvbSgwLCAxNSk7XHJcblxyXG4gICAgICAgICAgaWYgKF9zcGFjZUlEID09IDIpIHtcclxuICAgICAgICAgICAgLy9sYW5kZWQgb24gYmlnIGJ1c2luZXNzIGNhcmRzXHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB0aGlzLlNlbGVjdFJlbGF0ZWRDYXJkKHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSA1KSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgbG9zc2VzIGNhcmRzXHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB0aGlzLlNlbGVjdFJlbGF0ZWRDYXJkKGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSAzKSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB0aGlzLlNlbGVjdFJlbGF0ZWRDYXJkKGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgd2lsZCBjYXJkc1xyXG4gICAgICAgICAgICBSYW5kb21DYXJkID0gdGhpcy5TZWxlY3RSZWxhdGVkQ2FyZChmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhfc3BhY2VJRCk7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJcclxuICAgICAgICAgICAgaWYgKF9zcGFjZUlEID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgLy8gaWYgcGxheWVyIGxhbmRlZCBvbiBmaW5pc2ggc3BhY2VcclxuICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIFNlbmRpbmdEYXRhID0geyByYW5kb21DYXJkOiBSYW5kb21DYXJkLCBjb3VudGVyOiBSb2xsQ291bnRlciB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgICAgICBpZiAoX3NwYWNlSUQgPT0gMTIpIHtcclxuICAgICAgICAgICAgICAvLyBpZiBwbGF5ZXIgbGFuZGVkIG9uIGZpbmlzaCBzcGFjZVxyXG4gICAgICAgICAgICAgIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyA1O1xyXG4gICAgICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YSA9IHsgcmFuZG9tQ2FyZDogUmFuZG9tQ2FyZCwgY291bnRlcjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNCb3QgJiYgQm90R2FtZU92ZXIpIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNCb3QgJiYgdXNlckdhbWVPdmVyKSB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wbGV0ZSB0dXJuIGlzIGNhbGxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKHRydWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBsZXRlQ2FyZFR1cm4oKSB7XHJcbiAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gIH0sXHJcblxyXG4gIENhbGxHYW1lQ29tcGxldGUoX2lzQm90ID0gZmFsc2UsIF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgLy8gaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgIC8vICAgICB0aGlzLlR1cm5OdW1iZXIgPSB0aGlzLkdldE15SW5kZXgoKTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gMDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBpcyBub3QgYWN0aXZlIHJldHVybmluZ1wiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJjYWxjdWxhdGluZy4uLi5cIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImFnbWUgaXMgbm90IGZpbmlzaGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLmlzR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICB2YXIgX2Nhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICAgIHZhciBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgIHZhciBCTUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgICAgdmFyIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIGxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgICAgbG9hbkFtb3VudCArPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgX2dvbGQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50O1xyXG4gICAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgICB2YXIgX2RpY2VSYW5kb20gPSB0aGlzLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgdmFyIE9uY2VPclNoYXJlID0gX2RpY2VSYW5kb20gKiAxMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgICB2YXIgU3RvY2tDYXNoID0gT25jZU9yU2hhcmUgKiBfc3RvY2tzO1xyXG5cclxuICAgICAgICAgIHZhciBCTUNhc2ggPSAoQk1BbW91bnQgKyBCTUxvY2F0aW9ucykgKiAxNTAwMDA7XHJcblxyXG4gICAgICAgICAgdmFyIEhNQ2FzaCA9IDA7XHJcbiAgICAgICAgICBpZiAoSE1BbW91bnQgPT0gMSkgSE1DYXNoID0gNjAwMDA7XHJcbiAgICAgICAgICBlbHNlIGlmIChITUFtb3VudCA9PSAyKSBITUNhc2ggPSAyNTAwMCArIDYwMDAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMykgSE1DYXNoID0gMjUwMDAgKyAyNTAwMCArIDYwMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBUb3RhbEFzc2V0cyA9IF9jYXNoICsgQk1DYXNoICsgSE1DYXNoICsgR29sZENhc2ggKyBTdG9ja0Nhc2ggLSBsb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gVG90YWxBc3NldHM7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxIQkNhc2ggPSBITUNhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxCTUNhc2ggPSBCTUNhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxHb2xkQ2FzaCA9IEdvbGRDYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU3RvY2tzQ2FzaCA9IFN0b2NrQ2FzaDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvYW5CYWxhbmNlID0gbG9hbkFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XSk7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJEYXRhIHB1c2hlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IF9wbGF5ZXJJbmRleCA9IDA7IF9wbGF5ZXJJbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBfcGxheWVySW5kZXgrKykge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfY2FzaCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHZhciBITUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgdmFyIEJNQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUxvY2F0aW9ucyA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuXHJcbiAgICAgICAgdmFyIGxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIGxvYW5BbW91bnQgKz0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIF9nb2xkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudDtcclxuICAgICAgICB2YXIgX3N0b2NrcyA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50O1xyXG5cclxuICAgICAgICB2YXIgX2RpY2VSYW5kb20gPSB0aGlzLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIHZhciBPbmNlT3JTaGFyZSA9IF9kaWNlUmFuZG9tICogMTAwMDtcclxuXHJcbiAgICAgICAgdmFyIEdvbGRDYXNoID0gT25jZU9yU2hhcmUgKiBfZ29sZDtcclxuICAgICAgICB2YXIgU3RvY2tDYXNoID0gT25jZU9yU2hhcmUgKiBfc3RvY2tzO1xyXG5cclxuICAgICAgICB2YXIgQk1DYXNoID0gKEJNQW1vdW50ICsgQk1Mb2NhdGlvbnMpICogMTUwMDAwO1xyXG5cclxuICAgICAgICB2YXIgSE1DYXNoID0gMDtcclxuICAgICAgICBpZiAoSE1BbW91bnQgPT0gMSkgSE1DYXNoID0gNjAwMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMikgSE1DYXNoID0gMjUwMDAgKyA2MDAwMDtcclxuICAgICAgICBlbHNlIGlmIChITUFtb3VudCA9PSAzKSBITUNhc2ggPSAyNTAwMCArIDI1MDAwICsgNjAwMDA7XHJcblxyXG4gICAgICAgIHZhciBUb3RhbEFzc2V0cyA9IF9jYXNoICsgQk1DYXNoICsgSE1DYXNoICsgR29sZENhc2ggKyBTdG9ja0Nhc2ggLSBsb2FuQW1vdW50O1xyXG5cclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTY29yZSA9IFRvdGFsQXNzZXRzO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEhCQ2FzaCA9IEhNQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxCTUNhc2ggPSBCTUNhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsR29sZENhc2ggPSBHb2xkQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTdG9ja3NDYXNoID0gU3RvY2tDYXNoO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvYW5CYWxhbmNlID0gbG9hbkFtb3VudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoX2RhdGEpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNiwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE2LCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgU3luY0dhbWVPdmVyKF9VSUQpIHtcclxuICAgIHZhciBpbmZvVGV4dCA9IFwiXCI7XHJcbiAgICB2YXIgc3RhdHVzVGV4dCA9IFwiXCI7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgaWYgKCFHYW1lQ29tcGxldGVkKSB7XHJcbiAgICAgICAgR2FtZUNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0RGF0YSgpO1xyXG4gICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgdmFyIE15RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdmFyIF9pbmRleCA9IC0xO1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQgPT0gX1VJRCkge1xyXG4gICAgICAgICAgICAgIF9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc3RhdHVzVGV4dCA9IFwiR2FtZSB3b24gYnkgXCIgKyBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAgICAgLy95b3Ugd29uXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkNvbmdyYXRzISB5b3UgaGF2ZSB3b24gdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgX2N1cnJlbnRDYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgICAgICAgICB2YXIgX3RvdGFsID0gX2N1cnJlbnRDYXNoICsgcGFyc2VJbnQoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gX3RvdGFsLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3dvbiA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uKTtcclxuICAgICAgICAgICAgX3dvbiA9IF93b24gKyAxO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbiA9IF93b24udG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKC0xLCBfd29uLCAtMSk7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3lvdSBsb3NlXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIlVuZm9ydHVuYXRlbHkhIHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy93aXRoIGJvdFxyXG4gICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgIHZhciBNeURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgY29uc29sZS5sb2coTXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMF0uR2FtZU92ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKE15RGF0YS5QbGF5ZXJVSUQgPT0gX1VJRCkge1xyXG4gICAgICAgIC8veW91IHdvblxyXG4gICAgICAgIHN0YXR1c1RleHQgPSBcIkNvbmdyYXRzISB5b3UgaGF2ZSB3b24gdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLkNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJPdGhlciBQbGF5ZXIgRWFybmVkIENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1sxXS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgIHZhciBfY3VycmVudENhc2ggPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCk7XHJcbiAgICAgICAgdmFyIF90b3RhbCA9IF9jdXJyZW50Q2FzaCArIHBhcnNlSW50KE15RGF0YS5Ub3RhbFNjb3JlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IF90b3RhbC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICB2YXIgX3dvbiA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uKTtcclxuICAgICAgICBfd29uID0gX3dvbiArIDE7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb24gPSBfd29uLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVXBkYXRlVXNlckRhdGEoLTEsIF93b24sIC0xKTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8veW91IGxvc2VcclxuXHJcbiAgICAgICAgc3RhdHVzVGV4dCA9IFwiVW5mb3J0dW5hdGVseSEgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIjtcclxuICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiQnJpY2sgQW5kIE1vcnRhciBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEJNQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkxvYW4gQmFsYW5jZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxMb2FuQmFsYW5jZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIk90aGVyIFBsYXllciBFYXJuZWQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzFdLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIjtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0dhbWVDb21wbGV0ZURhdGEoX2RhdGEpIHtcclxuICAgIHZhciBfaXNCb3QgPSBfZGF0YS5Cb3Q7XHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSh0cnVlLCBmYWxzZSk7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiR2FtZSBvdmVyLCBjYWxjdWxhdGluZyB0b3RhbCBjYXNoLi4uXCIsIDE1MDAsIGZhbHNlKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG5cclxuICAgICAgICB2YXIgbWF4ID0gLTE7XHJcbiAgICAgICAgdmFyIFNlbGVjdGVkSW5kID0gMDtcclxuICAgICAgICB2YXIgU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgaWYgKF92YWx1ZSA+IG1heCkge1xyXG4gICAgICAgICAgICBTZWxlY3RlZEluZCA9IGluZGV4O1xyXG4gICAgICAgICAgICBtYXggPSBfdmFsdWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coX3ZhbHVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUudHJhY2UoXCJnYW1lIHdvbiBieSBwbGF5ZXIgaWQ6IFwiICsgU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLlBsYXllclVJRCk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJHYW1lIG92ZXIsIGNhbGN1bGF0aW5nIHRvdGFsIGNhc2guLi5cIiwgMTUwMCwgZmFsc2UpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dE9ubHkoKTtcclxuXHJcbiAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgICAgICB2YXIgbWF4ID0gLTE7XHJcbiAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQgPSAwO1xyXG4gICAgICAgICAgdmFyIFNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFNlc3Npb25EYXRhKTtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChTZXNzaW9uRGF0YVtpbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChfdmFsdWUgPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIFNlbGVjdGVkSW5kID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBtYXggPSBfdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKF92YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLnRyYWNlKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIiArIFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIH0sIDE1MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgQm90OiBfaXNCb3QgfTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0dhbWVDb21wbGV0ZURhdGEoX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEdhbWVPdmVyKF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBpZiAoX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgLy8gICBpZiAoTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLklzQWN0aXZlID09IGZhbHNlIHx8IHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNvbXBsZXRlZDogXCIgKyBwbGF5ZXJjb21wbGV0ZWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGdhbWVpbmZvIGxlbmd0aDogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCk7XHJcbiAgICAgICAgaWYgKHBsYXllcmNvbXBsZXRlZCA+PSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCB8fCBfZm9yY2VHYW1lT3Zlcikge1xyXG4gICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtXHJcbiAgICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICAgIGlmIChfZm9yY2VHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpIEJvdEdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgZWxzZSB1c2VyR2FtZU92ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJ1c2VyZ2FtZW92ZXI6IFwiICsgdXNlckdhbWVPdmVyKTtcclxuICAgICAgY29uc29sZS5sb2coXCJib3RnYW1lb3ZlcjogXCIgKyBCb3RHYW1lT3Zlcik7XHJcbiAgICAgIC8vIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSh0cnVlKTtcclxuICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZCA9IDA7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoTWFpblNlc3Npb25EYXRhW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwbGF5ZXJjb21wbGV0ZWQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpIHtcclxuICAgICAgICAvL2dhbWVjb21wbGV0ZWQgb24gYWxsIHN5c3RlbXNcclxuICAgICAgICBCb3RHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgdXNlckdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBTdGFydERpY2VSb2xsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoUm9sbENvdW50ZXIgPj0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkdhbWVvdmVyXCIpO1xyXG4gICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuR2FtZU92ZXIoZmFsc2UpO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgIERpY2VUZW1wID0gRGljZVRlbXAgKyAxO1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLlR3ZWVuUGxheWVyKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldFJhbmRvbTogZnVuY3Rpb24gKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gIH0sXHJcblxyXG4gIFR3ZWVuQ2FtZXJhOiBmdW5jdGlvbiAoX3BvcywgaXNab29tLCB0aW1lKSB7XHJcbiAgICBjYy50d2Vlbih0aGlzLkNhbWVyYU5vZGUpXHJcbiAgICAgIC50byh0aW1lLCB7IHBvc2l0aW9uOiBjYy52MihfcG9zLngsIF9wb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc1pvb20pIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgZWxzZSB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgfSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgWm9vbUNhbWVyYUluKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkNhbWVyYS56b29tUmF0aW8gPCAyKSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gdGhpcy5DYW1lcmEuem9vbVJhdGlvICsgMC4wMztcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IDI7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tQYXlEYXlDb25kaXRpb25zKF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICBpZiAoUm9sbENvdW50ZXIgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNikge1xyXG4gICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlciA9IFBhc3NlZFBheURheUNvdW50ZXIgKyAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDcpIHtcclxuICAgICAgICBEb3VibGVQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgIERvdWJsZVBheURheUNvdW50ZXIrKztcclxuICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgICBfbmV4dFR1cm5oYWxmUGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuSGFsZlBheURheTtcclxuXHJcbiAgICBpZiAoUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkgJiYgIV9uZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSwgX2lzQm90KTtcclxuICAgIH0gZWxzZSBpZiAoRG91YmxlUGF5RGF5IHx8IChQYXNzZWRQYXlEYXkgJiYgX25leHRUdXJuRG91YmxlUGF5KSkge1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbih0cnVlLCBfaXNCb3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBab29tQ2FtZXJhT3V0T25seSgpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5DYW1lcmEuem9vbVJhdGlvID49IDEpIHtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IHRoaXMuQ2FtZXJhLnpvb21SYXRpbyAtIDAuMDM7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMTtcclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIFpvb21DYW1lcmFPdXQoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA+PSAxKSB7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSB0aGlzLkNhbWVyYS56b29tUmF0aW8gLSAwLjAzO1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMTtcclxuICAgICAgICAvLyBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbigwKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgJiYgIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCAmJiAhdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnModGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgIC8vcmVhbCBwbGF5ZXJcclxuICAgICAgICAgIGlmIChQbGF5ZXJMZWZ0KSB7XHJcbiAgICAgICAgICAgIC8vIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgUGxheWVyTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucygpO1xyXG4gICAgICAgICAgZWxzZSB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIFR3ZWVuUGxheWVyOiBmdW5jdGlvbiAoTm9kZSwgVG9Qb3MpIHtcclxuICAgIHZhciBzcGVlZCA9IDAuNDtcclxuICAgIGlmIChfaXNUZXN0KSBzcGVlZCA9IDAuMDQ7XHJcblxyXG4gICAgY2MudHdlZW4oTm9kZSkgLy8wLjRcclxuICAgICAgLnRvKHNwZWVkLCB7IHBvc2l0aW9uOiBjYy52MihUb1Bvcy54LCBUb1Bvcy55KSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKERpY2VUZW1wIDwgRGljZVJvbGwpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKERpY2VUZW1wICsgXCIgXCIgKyBSb2xsQ291bnRlcik7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgICAgLy9mb3IgYm90XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpIHtcclxuICAgICAgICAgICAgICBpZiAoIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2IHx8XHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3XHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJvdCBnYW1lIGlzIG92ZXJcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmICghdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2IHx8XHJcbiAgICAgICAgICAgICAgICAgIHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3XHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLyBjb25zb2xlLmxvZyhQYXNzZWRQYXlEYXlDb3VudGVyKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGdhbWUgaXMgb3ZlciBza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFBhc3NlZFBheURheSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgRG91YmxlUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgRG91YmxlUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBmaW5pc2hlZCBmb3I6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChSb2xsQ291bnRlciA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKFJvbGxDb3VudGVyID09IDEzKSBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMjI7XHJcbiAgICAgICAgICAgIGVsc2UgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDE7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMTtcclxuICAgICAgICAgICAgRGljZVRlbXAgPSBEaWNlUm9sbDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvL0RpY2VUZW1wPURpY2VUZW1wKzE7XHJcbiAgICAgICAgICAvLyAgY29uc29sZS5sb2coRGljZVRlbXAgKyBcIiBcIiArIFJvbGxDb3VudGVyKTtcclxuXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgIC8vdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgX25ld3BvcyA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgICB0aGlzLlR3ZWVuQ2FtZXJhKF9uZXdwb3MsIGZhbHNlLCAwLjYpOyAvL3pvb21vdXRcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIC8vcnVsZXMgaW1wbG1lbnRhdGlvbiBkdXJpbmcgdHVybiAodHVybiBkZWNpc2lvbnMpXHJcblxyXG4gIFRvZ2dsZVBheURheShfc3QxLCBfU3QyKSB7XHJcbiAgICBQYXNzZWRQYXlEYXkgPSBfc3QxO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gX1N0MjtcclxuXHJcbiAgICBpZiAoIV9zdDEpIHtcclxuICAgICAgUGFzc2VkUGF5RGF5Q291bnRlciA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFfU3QyKSB7XHJcbiAgICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEluY3JlYXNlRG91YmxlUGF5RGF5KCkge1xyXG4gICAgRG91YmxlUGF5RGF5Q291bnRlcisrO1xyXG4gIH0sXHJcblxyXG4gIEV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihhbW91bnQsIF9pbmRleCwgX2xvY2F0aW9uTmFtZSwgX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSwgX0dpdmVuQ2FzaCA9IDAsIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZSkge1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA8IDMpIHtcclxuICAgICAgaWYgKCFfaXNDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggLSBhbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgKyAxO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUucHVzaChfbG9jYXRpb25OYW1lKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZXhwYW5kZWQgeW91ciBidXNpbmVzcy5cIiwgMTAwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgICB9LCAxMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoIHRvIGV4cGFuZCB0aGlzIGJ1c2luZXNzLCBjYXNoIG5lZWRlZCAkIFwiICsgYW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9HaXZlbkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgICBfR2l2ZW5DYXNoID0gX0dpdmVuQ2FzaCAtIGFtb3VudDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCArIDE7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5wdXNoKF9sb2NhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLCAxMDAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgIH0sIDEyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2ggdG8gZXhwYW5kIHRoaXMgYnVzaW5lc3MsIGNhc2ggbmVlZGVkICQgXCIgKyBhbW91bnQgKyBcIiwgQ2FzaCBHaXZlbiAkXCIgKyBfR2l2ZW5DYXNoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgY2Fubm90IG93biBtb3JlIHRoYW4gdGhyZWUgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBsb2NhdGlvbnNcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbihfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMgPSBbXTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAocGFyc2VJbnQodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICAvL3RoaXMgbWVhbnMgdGhlcmUgaXMgYnJpY2sgYW5kIG1vcnRhciBpbiBsaXN0XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc1ByZWZhYik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0QnVzaW5lc3NJbmRleChpKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRDYXJkRnVuY3Rpb25hbGl0eShfaXNDYXJkRnVuY3Rpb25hbGl0eSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0R2l2ZW5DYXNoKF9HaXZlbkNhc2gpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaChfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5SZXNldEVkaXRCb3goKTtcclxuICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coQnVzaW5lc3NMb2NhdGlvbk5vZGVzKTtcclxuICAgIHJldHVybiBCdXNpbmVzc0xvY2F0aW9uTm9kZXMubGVuZ3RoO1xyXG4gIH0sXHJcblxyXG4gIERlc3Ryb3lHZW5lcmF0ZWROb2RlcygpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBCdXNpbmVzc0xvY2F0aW9uTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVN0b2Nrc19UdXJuRGVjaXNpb24oX25hbWUsIF9TaGFyZUFtb3VudCwgX2lzQWRkaW5nKSB7XHJcbiAgICBpZiAoX2lzQWRkaW5nKSB7XHJcbiAgICAgIHZhciBfc3RvY2sgPSBuZXcgU3RvY2tJbmZvKCk7XHJcbiAgICAgIF9zdG9jay5CdXNpbmVzc05hbWUgPSBfbmFtZTtcclxuICAgICAgX3N0b2NrLlNoYXJlQW1vdW50ID0gX1NoYXJlQW1vdW50O1xyXG5cclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZTdG9ja3MucHVzaChfc3RvY2spO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKF9pc0RvdWJsZVBheURheSA9IGZhbHNlLCBfaXNCb3QgPSBmYWxzZSwgX2ZvclNlbGVjdGVkQnVzaW5lc3MgPSBmYWxzZSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDAsIEhCQW1vdW50ID0gMCwgQk1BbW91bnQgPSAwLCBCTUxvY2F0aW9ucyA9IDApIHtcclxuICAgIGlmIChfZm9yU2VsZWN0ZWRCdXNpbmVzcykge1xyXG4gICAgICB2YXIgX3RpdGxlID0gXCJQYXlEYXlcIjtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgX2lzQm90LCBfZm9yU2VsZWN0ZWRCdXNpbmVzcywgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCwgSEJBbW91bnQsIEJNQW1vdW50LCBCTUxvY2F0aW9ucywgMSwgMCwgX25leHRUdXJuaGFsZlBheSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoRG91YmxlUGF5RGF5ICYmIFBhc3NlZFBheURheSAmJiBfbmV4dFR1cm5Eb3VibGVQYXkpIHtcclxuICAgICAgICBEb3VibGVQYXlEYXlDb3VudGVyID0gMjtcclxuICAgICAgfVxyXG5cclxuICAgICAgX3NraXBOZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0UGF5ZGF5O1xyXG4gICAgICBfc2tpcEhNTmV4dFBheWRheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgICBfc2tpcEJNTmV4dFBheWRheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwQk1OZXh0UGF5ZGF5O1xyXG5cclxuICAgICAgaWYgKF9za2lwTmV4dFBheWRheSkge1xyXG4gICAgICAgIC8vaWYgcHJldmlvdXNseSBza2lwIHBheWRheSB3YXMgc3RvcmVkIGJ5IGFueSBjYXJkXHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgaWYgKCFfaXNCb3QpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTa2lwcGluZyBQYXlEYXkuXCIsIDE2MDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgICB9LCAxNjUwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyBQYXlEYXkuXCIpO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgX3RpdGxlID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYgKF9pc0RvdWJsZVBheURheSkgX3RpdGxlID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgICBlbHNlIF90aXRsZSA9IFwiUGF5RGF5XCI7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Bc3NpZ25EYXRhX1BheURheShfdGl0bGUsIF9pc0RvdWJsZVBheURheSwgX3NraXBITU5leHRQYXlkYXksIF9za2lwQk1OZXh0UGF5ZGF5LCBfaXNCb3QsIGZhbHNlLCAwLCAwLCAwLCAwLCBQYXNzZWRQYXlEYXlDb3VudGVyLCBEb3VibGVQYXlEYXlDb3VudGVyLCBfbmV4dFR1cm5oYWxmUGF5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEJhbmtydXB0X1R1cm5EZWNpc2lvbigpIHtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JhbmtydXB0ID0gdHJ1ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCArPSAxO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLCBmYWxzZSwgdGhpcy5TZWxlY3RlZE1vZGUsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JhbmtydXB0LCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQmFua3J1cHRBbW91bnQpO1xyXG4gIH0sXHJcblxyXG4gIFNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudCwgX3VJRCkge1xyXG4gICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IENhc2g6IF9hbW91bnQsIElEOiBfdUlEIH0gfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTMsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9kYXRhKSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9hbW91bnQgPSBfZGF0YS5EYXRhLkNhc2g7XHJcbiAgICAgIHZhciBfaUQgPSBfZGF0YS5EYXRhLklEO1xyXG5cclxuICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uUGxheWVyVUlEID09IF9pRCkge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5pc0dhbWVGaW5pc2hlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5Ub3RhbFNjb3JlICs9IF9hbW91bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHJlY2VpdmVkIHByb2ZpdCBvZiAkXCIgKyBfYW1vdW50ICsgXCIgZnJvbSBvdGhlciBwbGF5ZXIuXCIsIDI4MDApO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gQ2FyZHMgUnVsZXNcclxuICBUb2dnbGVEb3VibGVQYXlOZXh0VHVybihfc3RhdGUpIHtcclxuICAgIF9uZXh0VHVybkRvdWJsZVBheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheSA9IF9uZXh0VHVybkRvdWJsZVBheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVIYWxmUGF5TmV4dFR1cm4oX3N0YXRlKSB7XHJcbiAgICBfbmV4dFR1cm5oYWxmUGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuSGFsZlBheURheSA9IF9uZXh0VHVybmhhbGZQYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcE5leHRUdXJuKF9zdGF0ZSkge1xyXG4gICAgX3NraXBOZXh0VHVybiA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4gPSBfc2tpcE5leHRUdXJuO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoX3N0YXRlKSB7XHJcbiAgICBfc2tpcE5leHRQYXlkYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXkgPSBfc2tpcE5leHRQYXlkYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoX3N0YXRlKSB7XHJcbiAgICBfc2tpcEhNTmV4dFBheWRheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5ID0gX3NraXBITU5leHRQYXlkYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihfc3RhdGUpIHtcclxuICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXkgPSBfc2tpcEJNTmV4dFBheWRheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVUdXJuUHJvZ3Jlc3MoX3N0YXRlKSB7XHJcbiAgICBUdXJuSW5Qcm9ncmVzcyA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBSZXR1cm5UdXJuUHJvZ3Jlc3MoKSB7XHJcbiAgICByZXR1cm4gVHVybkluUHJvZ3Jlc3M7XHJcbiAgfSxcclxuXHJcbiAgTG9zZUFsbE1hcmtldGluZ01vbmV5KCkge1xyXG4gICAgdmFyIF9sb3NlQW1vdW50ID0gLTE7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA+IDApIHtcclxuICAgICAgX2xvc2VBbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9sb3NlQW1vdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2xvc2VBbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcikge1xyXG4gICAgdmFyIF9hbW91bnRJbmNyZWFzZWQgPSAtMTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID4gMCkge1xyXG4gICAgICBfYW1vdW50SW5jcmVhc2VkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCAqPSBfbXVsdGlwbGllcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9hbW91bnRJbmNyZWFzZWQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfYW1vdW50SW5jcmVhc2VkO1xyXG4gIH0sXHJcblxyXG4gIEdldE1hcmtldGluZ01vbmV5KF9wcm9maXQpIHtcclxuICAgIHZhciBfYW1vdW50ID0gLTE7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA+IDApIHtcclxuICAgICAgX3Byb2ZpdCA9IF9wcm9maXQgLyAxMDA7XHJcbiAgICAgIF9hbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ICo9IF9wcm9maXQ7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX2Ftb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9hbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgR2V0Vm9jYWJ1bGFyeVF1ZXN0aW9uc0luZGV4KCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChWb2NhYnVsYXJ5UXVlc3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKFZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyIDwgVm9jYWJ1bGFyeVF1ZXN0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gVm9jYWJ1bGFyeVF1ZXN0aW9uc1tWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlcl07XHJcbiAgICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIrKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Wb2NhYnVsYXJ5KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X1ZvY2FidWxhcnkoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIEdldEVzdGFibGlzaG1lbnRRdWVzdGlvbnNJbmRleCgpIHtcclxuICAgIHZhciBfdmFsID0gLTE7XHJcbiAgICBpZiAoRXN0YWJsaXNobWVudFF1ZXN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlciA8IEVzdGFibGlzaG1lbnRRdWVzdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgX3ZhbCA9IEVzdGFibGlzaG1lbnRRdWVzdGlvbnNbRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXJdO1xyXG4gICAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyKys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfRXN0YWJsaXNobWVudCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Fc3RhYmxpc2htZW50KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3ZhbDtcclxuICB9LFxyXG5cclxuICBQb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfVm9jYWJ1bGFyeShfZGF0YSA9IG51bGwpIHtcclxuICAgIGlmIChfZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgIFZvY2FidWxhcnlRdWVzdGlvbnMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExXTtcclxuXHJcbiAgICAgIFZvY2FidWxhcnlRdWVzdGlvbnMuc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFZvY2FidWxhcnlRdWVzdGlvbnMpO1xyXG4gICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcblxyXG4gICAgICB2YXIgX3RlbXBEYXRhID0geyBWb2NBcnJheTogVm9jYWJ1bGFyeVF1ZXN0aW9ucywgRXN0QXJyYXk6IG51bGwgfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxOCwgX3RlbXBEYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChfZGF0YS5Wb2NBcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9ucyA9IF9kYXRhLlZvY0FycmF5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFZvY2FidWxhcnlRdWVzdGlvbnMpO1xyXG4gICAgICAgIFZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Fc3RhYmxpc2htZW50KF9kYXRhID0gbnVsbCkge1xyXG4gICAgaWYgKF9kYXRhID09IG51bGwpIHtcclxuICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9ucyA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTFdO1xyXG5cclxuICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9ucy5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coRXN0YWJsaXNobWVudFF1ZXN0aW9ucyk7XHJcbiAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuXHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSB7IFZvY0FycmF5OiBudWxsLCBFc3RBcnJheTogRXN0YWJsaXNobWVudFF1ZXN0aW9ucyB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE4LCBfdGVtcERhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9kYXRhLkVzdEFycmF5ICE9IG51bGwpIHtcclxuICAgICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zID0gX2RhdGEuRXN0QXJyYXk7XHJcbiAgICAgICAgY29uc29sZS5sb2coRXN0YWJsaXNobWVudFF1ZXN0aW9ucyk7XHJcbiAgICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24oX2RhdGEpIHtcclxuICAgIHZhciBfcXVlc3Rpb25SZWYgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1F1ZXN0aW9uc0RhdGEoKTtcclxuICAgIHZhciBfdXNlcklEID0gX2RhdGEuVXNlcklEO1xyXG4gICAgdmFyIF9xdWVzdGlvbkluZGV4ID0gX2RhdGEuUXVlc3Rpb247XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX2RhdGEuVXNlckluZGV4O1xyXG4gICAgdmFyIF9pc1ZvYyA9IF9kYXRhLklzVm9jO1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcbiAgICBpZiAoX2lzVm9jKSB7XHJcbiAgICAgIFZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyKys7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlcisrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfdXNlcklEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIklEIG1hdGNoZWRcIik7XHJcblxyXG4gICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG5cclxuICAgICAgdmFyIF9RZGF0YTtcclxuICAgICAgaWYgKF9pc1ZvYykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidm9jXCIpO1xyXG4gICAgICAgIF9RZGF0YSA9IF9xdWVzdGlvblJlZi5Wb2NhYnVsYXJ5UXVlc3Rpb25zW19xdWVzdGlvbkluZGV4XTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVzdFwiKTtcclxuICAgICAgICBfUWRhdGEgPSBfcXVlc3Rpb25SZWYuRXN0YWJsaXNobWVudFF1ZXN0aW9uc1tfcXVlc3Rpb25JbmRleF07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIENvcnJlY3RBbnN3ZXIgPSBfUWRhdGEuQ29ycmVjdE9wdGlvbjtcclxuICAgICAgdmFyIF9tZXNzYWdlID0gXCJDaG9vc2UgdGhlIGNvcnJlY3QgYW5zd2VyLlwiICsgXCJcXG5cIiArIFwiKndyb25nIGFuc3dlciB3aWxsIGNvc3QgeW91IGEgZmluZSBvZiAkNTAwMC5cIiArIFwiXFxuXCIgKyBcIlxcblwiICsgX1FkYXRhLlF1ZXN0aW9uICsgXCJcXG5cIiArIFwiQS4gXCIgKyBfUWRhdGEuT3B0aW9uMSArIFwiXFxuXCIgKyBcIkIuIFwiICsgX1FkYXRhLk9wdGlvbjIgKyBcIlxcblwiICsgXCJDLiBcIiArIF9RZGF0YS5PcHRpb24zICsgXCJcXG5cIiArIFwiRC4gXCIgKyBfUWRhdGEuT3B0aW9uNDtcclxuXHJcbiAgICAgIC8vIHZhciBfcXVlc3Rpb25Bc2tlZCA9IE9uZVF1ZXN0aW9uc1tfcXVlc3Rpb25JbmRleCAtIDFdO1xyXG4gICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX21lc3NhZ2UpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uKF9pc1R1cm5PdmVyID0gZmFsc2UpIHtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX215RGF0YTtcclxuICAgIHZhciBfcm9vbURhdGE7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgX3Jvb21EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIF9teURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICBfcm9vbURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgfVxyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSh0cnVlKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5SZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsIF9yb29tRGF0YSwgX2lzVHVybk92ZXIsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICB9LFxyXG5cclxuICBPbmVRdWVzdGlvbkRlY2lzaW9uX1NlbGVjdE9wdGlvbl9PbmVRdWVzdGlvbihldmVudCA9IG51bGwpIHtcclxuICAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgdmFyIF9zZWxlY3Rpb24gPSBwYXJzZUludChldmVudC5jdXJyZW50VGFyZ2V0Lm5hbWUuc3BsaXQoXCJfXCIpWzFdKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIm9wdGlvbiBzZWxlY3RlZDogXCIgKyBfc2VsZWN0aW9uKTtcclxuICAgIGNvbnNvbGUubG9nKFwiQ29ycmVjdEFuc3dlcjogXCIgKyBDb3JyZWN0QW5zd2VyKTtcclxuICAgIGlmIChfc2VsZWN0aW9uID09IENvcnJlY3RBbnN3ZXIpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdXIgYW5zd2VyIHdhcyBjb3JyZWN0IS5cIiwgMTIwMCk7XHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihmYWxzZSwgdHJ1ZSwgLTEsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChfbXlEYXRhLkNhc2ggPj0gNTAwMCkge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEID09IHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoIC09IDUwMDA7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgYW5zd2VyZWQgd3JvbmcsIGZpbmUgYW1vdW50IHdhcyBwYXllZCB0byB0aGUgcGxheWVyLlwiLCAxMjAwKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbih0cnVlLCBmYWxzZSwgLTEsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2gsIFNraXBwaW5nIHF1ZXN0aW9uXCIpO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKGZhbHNlLCBmYWxzZSwgMCwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIC8vR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9JbnN1ZmZpY2llbnRCYWxhbmNlKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gT25lUXVlc3Rpb25EZWNpc2lvbl9QYXlBbW91bnRfT25lUXVlc3Rpb24oKSB7XHJcbiAgLy8gICB2YXIgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gIC8vICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcbiAgLy8gICBpZiAoX215RGF0YS5DYXNoID49IDUwMDApIHtcclxuICAvLyAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgLy8gICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEID09IHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCkge1xyXG4gIC8vICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCAtPSA1MDAwO1xyXG4gIC8vICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pO1xyXG4gIC8vICAgICAgICAgYnJlYWs7XHJcbiAgLy8gICAgICAgfVxyXG4gIC8vICAgICB9XHJcblxyXG4gIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHBhaWQgY2FzaCBhbW91bnQgdG8gcGxheWVyLlwiLCAxMjAwKTtcclxuICAvLyAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgLy8gICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKHRydWUsIGZhbHNlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gIC8vICAgfSBlbHNlIHtcclxuICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAvLyAgIH1cclxuICAvLyB9LFxyXG5cclxuICAvLyBPbmVRdWVzdGlvbkRlY2lzaW9uX0Fuc3dlclF1ZXN0aW9uX09uZVF1ZXN0aW9uKCkge1xyXG4gIC8vICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAvLyAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgLy8gICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGFuc3dlcmVkIHRoZSBxdWVzdGlvbi5cIiwgMTIwMCk7XHJcbiAgLy8gICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAvLyAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKGZhbHNlLCB0cnVlLCBPbmVRdWVzdGlvbkluZGV4LCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgLy8gfSxcclxuXHJcbiAgU2VsZWN0UGxheWVyUHJvZml0X1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5KF9pc1R1cm5PdmVyID0gZmFsc2UpIHtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX215RGF0YTtcclxuICAgIHZhciBfcm9vbURhdGE7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgX3Jvb21EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIF9teURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICBfcm9vbURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgfVxyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQodHJ1ZSk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdChfbXlEYXRhLCBfcm9vbURhdGEsIF9pc1R1cm5PdmVyLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgfSxcclxuXHJcbiAgU2VsZWN0UGxheWVyVGFrZU92ZXJfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyKHRydWUpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyVGFrZU92ZXIoKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyKF9teURhdGEsIF9yb29tRGF0YSwgX2lzVHVybk92ZXIsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICB9LFxyXG5cclxuICBTZWxlY3RQbGF5ZXJCdXlIYWxmQnVzaW5lc3NfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcblxyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3Zlcih0cnVlKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5SZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllclRha2VPdmVyKCk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJUYWtlT3ZlcihfbXlEYXRhLCBfcm9vbURhdGEsIF9pc1R1cm5PdmVyLCB0aGlzLlNlbGVjdGVkTW9kZSwgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgU2VsZWN0UGxheWVyRGFtYWdpbmdJbmZvcm1hdGlvbl9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgdmFyIF9teURhdGE7XHJcbiAgICB2YXIgX3Jvb21EYXRhO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIF9yb29tRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBfbXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgX3Jvb21EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgIH1cclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmcodHJ1ZSk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuUmVzZXRTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJEYW1hZ2luZygpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRGFtYWdpbmcoX215RGF0YSwgX3Jvb21EYXRhLCBfaXNUdXJuT3ZlciwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9TZWxlY3RQbGF5ZXJGb3JQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoX2RhdGEpIHtcclxuICAgIHZhciBfb3duSUQgPSBfZGF0YS5Vc2VySUQudG9TdHJpbmcoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBwYXJzZUludChfZGF0YS5Vc2VySW5kZXgpO1xyXG4gICAgdmFyIF9wbGF5ZXJOYW1lID0gX2RhdGEuVXNlck5hbWU7XHJcbiAgICB2YXIgX3BsYXllcklEID0gX2RhdGEuT3duUGxheWVySUQudG9TdHJpbmcoKTtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICBpZiAoX293bklEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZXZlbnQ6IFwiICsgX3BsYXllck5hbWUpO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBfb3duSUQpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhbkdpdmVQcm9maXRPblBheURheSA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXkgPSBfcGxheWVySUQ7XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsIHRoaXMuUGxheWVyR2FtZUluZm8sIHRydWUpO1xyXG4gICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNob3dUb2FzdChcIlBsYXllciBcIiArIF9wbGF5ZXJOYW1lICsgXCIgd2lsbCByZWNlaXZlIGFsbCB5b3VyIG5leHQgcGF5IGRheSBwcm9maXRzXCIsIDMyMDApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9oYXNEb25lUGF5bWVudCwgX2hhc0Fuc3dlcmVkUXVlc3Rpb24sIF9xdWVzdGlvbkluZGV4LCBfVXNlcklEKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IFBheW1lbnREb25lOiBfaGFzRG9uZVBheW1lbnQsIFF1ZXN0aW9uQW5zd2VyZWQ6IF9oYXNBbnN3ZXJlZFF1ZXN0aW9uLCBRdWVzdGlvbkluZGV4OiBfcXVlc3Rpb25JbmRleCwgSUQ6IF9Vc2VySUQgfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoOCwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIERlZHVjdENhc2hfQ2FyZEZ1bmN0aW9uYWxpdHkoX2Ftb3VudCkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfbXlJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggPj0gX2Ftb3VudCkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggLT0gX2Ftb3VudDtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5DYXNoIDwgX2Ftb3VudCkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQWRkQ2FzaF9DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgdmFyIF9hbW91bnQgPSBfZGF0YS5hbW91bnQ7XHJcbiAgICB2YXIgX0lEID0gX2RhdGEuSUQ7XHJcbiAgICB2YXIgX21zZyA9IF9kYXRhLm1zZztcclxuXHJcbiAgICB2YXIgbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICBpZiAobW9kZSA9PSAyKSB7XHJcbiAgICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBfbXlJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG4gICAgICAgIGlmIChfYWN0b3IuUGxheWVyVUlEID09IF9JRCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChfbXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobW9kZSA9PSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQgPT0gX0lEICYmIGluZGV4ICE9IHRoaXMuVHVybk51bWJlcikge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChfbXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuVXBkYXRlVUlEYXRhKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfZGF0YSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgIHZhciBfaGFzRG9uZVBheW1lbnQgPSBfZGF0YS5QYXltZW50RG9uZTtcclxuICAgICAgdmFyIF9oYXNBbnN3ZXJlZFF1ZXN0aW9uID0gX2RhdGEuUXVlc3Rpb25BbnN3ZXJlZDtcclxuICAgICAgdmFyIF9xdWVzdGlvbkluZGV4ID0gX2RhdGEuUXVlc3Rpb25JbmRleDtcclxuICAgICAgdmFyIF91SUQgPSBfZGF0YS5JRDtcclxuXHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGF5ZXIgZG9lcyBub3QgaGF2ZSBlbm91Z2ggY2FzaCwgc28gcXVlc3Rpb25zIHdlcmUgc2tpcHBlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9oYXNEb25lUGF5bWVudCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoICs9IDUwMDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwicGxheWVyIGhhcyBnaXZlbiB3cm9uZyBhbnN3ZXIsIGNhc2ggJDUwMDAgaGFzIGJlZW4gYWRkZWQuXCIsIDIxMDApO1xyXG4gICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9oYXNBbnN3ZXJlZFF1ZXN0aW9uKSB7XHJcbiAgICAgICAgICB2YXIgX3NlbGVjdGVkUGxheWVySW5kZXggPSAwO1xyXG4gICAgICAgICAgdmFyIF9hY3RvcnNEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG5cclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKF91SUQgPT0gX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgICAgX3NlbGVjdGVkUGxheWVySW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGF5ZXIgaGFzIGdpdmVuIGNvcnJlY3QgYW5zd2VyLCBubyBjYXNoIHdhcyByZWNlaXZlZC5cIiwgMjEwMCk7XHJcblxyXG4gICAgICAgICAgLy8gaWYgKF9xdWVzdGlvbkluZGV4ID09IDEpIHtcclxuICAgICAgICAgIC8vICAgLy9oYXZlIHlvdSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuU2tpcHBlZExvYW5QYXltZW50KSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSBza2lwcGVkIGxvYW4gcGF5ZW1lbnQgaW4gcHJldmlvdXMgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMikge1xyXG4gICAgICAgICAgLy8gICAvL0hhdmUgeW91IHRha2VuIGFueSBsb2FuP1xyXG4gICAgICAgICAgLy8gICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgLy8gICAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgLy8gICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICAvLyAgICAgICBicmVhaztcclxuICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAvLyAgIH1cclxuXHJcbiAgICAgICAgICAvLyAgIGlmIChfbG9hblRha2VuKSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSB0YWtlbiBzb21lIGxvYW5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgdGFrZW4gYW55IGxvYW5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMykge1xyXG4gICAgICAgICAgLy8gICAvL0FyZSB5b3UgYmFua3J1cHRlZD8gaWYgbW9yZSB0aGFuIG9uY2UsIHRlbGwgbWUgdGhlIGFtb3VudD9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLklzQmFua3J1cHQpIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZCBcIiArIF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkJhbmtydXB0QW1vdW50ICsgXCIgdGltZS9lcy5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDQpIHtcclxuICAgICAgICAgIC8vICAgLy9JcyB5b3VyIHR1cm4gZ29pbmcgdG8gYmUgc2tpcHBlZCBuZXh0IHRpbWU/XHJcbiAgICAgICAgICAvLyAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgYmUgc2tpcHBlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIG5vdCBiZSBza2lwcGVkLlwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSA1KSB7XHJcbiAgICAgICAgICAvLyAgIC8vSXMgaXQgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgeW91ciBuZXh0IHBheWRheT9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5KSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgcGF5ZGF5IHdpbGwgYmUgZG91YmxlIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBub3QgYmUgZG91YmxlIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgaWYgKElzVHdlZW5pbmcgPT0gdHJ1ZSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICAgIH0sIDgwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3NwYWNlcyA9IF9kYXRhLkRhdGEuYmFja3NwYWNlcztcclxuICAgICAgdmFyIF9jb3VudGVyID0gX2RhdGEuRGF0YS5Db3VudGVyO1xyXG5cclxuICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19jb3VudGVyICsgQmFja3NwYWNlc10uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MsIDAuMSk7XHJcblxyXG4gICAgICBSb2xsQ291bnRlciA9IF9jb3VudGVyO1xyXG4gICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUd2VlblBsYXllcl9Hb0JhY2tTcGFjZXM6IGZ1bmN0aW9uIChOb2RlLCBUb1Bvcywgc3BlZWQgPSAwLjYpIHtcclxuICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgIC50byhzcGVlZCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge30pXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIEdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICBSb2xsQ291bnRlciAtPSBCYWNrc3BhY2VzO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHZhciBfZGF0YSA9IHsgRGF0YTogeyBiYWNrc3BhY2VzOiBCYWNrc3BhY2VzLCBDb3VudGVyOiBSb2xsQ291bnRlciB9IH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTAsIF9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1Bvcyk7XHJcbiAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfVGFrZU92ZXJCdXNpbmVzc19DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICB2YXIgX2lkID0gX2RhdGEuSUQ7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuUGxheWVyO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3MgPSBfZGF0YS5CdXNpbmVzcztcclxuICAgICAgICB2YXIgX2J1c2luZXNzSW5kZXggPSBfZGF0YS5CdXNpbmVzc0luZGV4O1xyXG4gICAgICAgIHZhciBfbXlBY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG5cclxuICAgICAgICB2YXIgX215SW5kZXggPSAtMTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfbXlBY3Rvci5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9pZCk7XHJcblxyXG4gICAgICAgIGlmIChfbXlBY3Rvci5QbGF5ZXJVSUQudG9TdHJpbmcoKSA9PSBfaWQudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQgPT0gX2lkKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vaG9tZSBiYXNlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSG9tZUJhc2VkQW1vdW50LS07XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgICAgICAgICAgICAgIHZhciBfbG9jYXRpb25zID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50LS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudCAtPSBfbG9jYXRpb25zO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uTm9PZkJ1c2luZXNzLnNwbGljZShfYnVzaW5lc3NJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgX215SW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdKTtcclxuICAgICAgICAgIGlmIChfbXlJbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBoYXMgbG9zdCBhbGwgYnVzaW5lc3NlcyBvciBub3RcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91ciBidXNpbmVzcyBcIiArIF9idXNpbmVzcy5CdXNpbmVzc05hbWUgKyBcIiB3YXMgZm9yY2VmdWxseSB0b29rIG92ZXIsIHlvdSBoYXZlIGxvc3QgdGhhdCBidXNpbmVzc1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91ciBidXNpbmVzcyBcIiArIF9idXNpbmVzcy5CdXNpbmVzc05hbWUgKyBcIiB3YXMgZm9yY2VmdWxseSB0b29rIG92ZXIsIHlvdSBoYXZlIGxvc3QgdGhhdCBidXNpbmVzcywgeW91IGhhdmUgYmVlbiBiYW5rcnVwdGVkLCB5b3Ugd2lsbCBzdGFydCBhZ2FpbiBpbiBuZXh0IHR1cm4uXCIpO1xyXG4gICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhcmRGdW5jdGlvbmFsaXR5LkJhbmtydXB0ZWROZXh0VHVybiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUYWtlT3ZlckJ1c2luZXNzX0NhcmRGdW5jdGlvbmFsaXR5KF9kYXRhLCBfaW5kZXgsIF9wbGF5ZXJJbmRleCA9IDAsIF9idXlIYWxmQnVzaW5lc3MgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9idXNpbmVzcyA9IF9kYXRhLk5vT2ZCdXNpbmVzc1tfaW5kZXhdO1xyXG4gICAgY29uc29sZS5sb2coX2J1c2luZXNzKTtcclxuXHJcbiAgICB2YXIgX2RpY2VSb2xsID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgIHZhciBfbXVsdGlwbGllckJ1c2luZXNzID0gMTAwMDA7XHJcbiAgICB2YXIgX3Jlc3VsdCA9IF9kaWNlUm9sbCAqIF9tdWx0aXBsaWVyQnVzaW5lc3M7XHJcbiAgICB2YXIgX3BsYXllciA9IG51bGw7XHJcblxyXG4gICAgLy9zZW5kIHJwYyB0byBvdGhlciBwbGF5ZXIgYXMgd2VsbFxyXG4gICAgX3BsYXllciA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICB2YXIgX3NlbmRpbmdEYXRhID0geyBJRDogX3BsYXllci5QbGF5ZXJVSUQsIFBsYXllcjogX3BsYXllciwgQnVzaW5lc3M6IF9idXNpbmVzcywgQnVzaW5lc3NJbmRleDogX2luZGV4IH07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIzLCBfc2VuZGluZ0RhdGEpO1xyXG5cclxuICAgIGlmICghX2J1c2luZXNzLkxvYW5UYWtlbikge1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCArPSBfcmVzdWx0O1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICBcIlxcblwiICsgXCJEaWNlIFJlc3VsdCA6IFwiICsgX2RpY2VSb2xsICsgXCJcXG5cIiArIFwiXFxuXCIgKyBcIkFtb3VudCA6IFwiICsgX2RpY2VSb2xsICsgXCIgKiBcIiArIF9tdWx0aXBsaWVyQnVzaW5lc3MgKyBcIiA9ICRcIiArIF9yZXN1bHQgKyBcIlxcblwiICsgXCJcXG5cIiArIFwiQ2FzaCBhbW91bnQgb2YgJFwiICsgX3Jlc3VsdCArIFwiIGFkZGVkIGFmdGVyIGRlZHVjdGluZyBzdXBwb3NlZCBsb2FuLCB0b3RhbCBjYXNoIGJlY29tZXMgJFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2hcclxuICAgICAgKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0U2NyZWVuQWxvbmdUdXJuT3Zlcl9fQnVzaW5lc3NHZW5yaWMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfdGVtcFN1bSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoICsgX3Jlc3VsdDtcclxuICAgICAgaWYgKF90ZW1wU3VtID49IF9idXNpbmVzcy5Mb2FuQW1vdW50KSB7XHJcbiAgICAgICAgX3RlbXBTdW0gLT0gX2J1c2luZXNzLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPSBfdGVtcFN1bTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkRpY2UgUmVzdWx0IDogXCIgK1xyXG4gICAgICAgICAgICBfZGljZVJvbGwgK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiTG9hbiBBbW91bnQgOiAkXCIgK1xyXG4gICAgICAgICAgICBfYnVzaW5lc3MuTG9hbkFtb3VudCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJBbW91bnQgOiBcIiArXHJcbiAgICAgICAgICAgIF9kaWNlUm9sbCArXHJcbiAgICAgICAgICAgIFwiICogXCIgK1xyXG4gICAgICAgICAgICBfbXVsdGlwbGllckJ1c2luZXNzICtcclxuICAgICAgICAgICAgXCIgPSAkXCIgK1xyXG4gICAgICAgICAgICBfcmVzdWx0ICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkFmdGVyIGRlZHVjdGluZyBzdXBwb3NlZCBsb2FuLCB0b3RhbCBjYXNoIGJlY29tZXMgJFwiICtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2hcclxuICAgICAgICApO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5FeGl0U2NyZWVuQWxvbmdUdXJuT3Zlcl9fQnVzaW5lc3NHZW5yaWMoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2ggdG8gcGF5IG9mZiBsb2FuLCB0dXJuIHdpbGwgYmUgc2tpcHBlZCBub3dcIik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTY3JlZW5BbG9uZ1R1cm5PdmVyX19CdXNpbmVzc0dlbnJpYygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50X0J1eUhhbGZCdXNpbmVzc19DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICB2YXIgX2lkID0gX2RhdGEuSUQ7XHJcbiAgICAgICAgdmFyIF9jYXNoQW1vdW50ID0gX2RhdGEuQW1vdW50O1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9kYXRhLkJ1c2luZXNzSW5kZXg7XHJcbiAgICAgICAgdmFyIF9zZW5kZXJJRCA9IF9kYXRhLk15SUQ7XHJcbiAgICAgICAgdmFyIF9zZW5kZXJOYW1lID0gX2RhdGEuTXlOYW1lO1xyXG4gICAgICAgIHZhciBfbXlBY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgIHZhciBfbXlJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG4gICAgICAgIGlmIChfbXlBY3Rvci5QbGF5ZXJVSUQgPT0gX2lkLnRvU3RyaW5nKCkpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggKz0gcGFyc2VJbnQoX2Nhc2hBbW91bnQpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lcklEID0gX3NlbmRlcklEO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVyTmFtZSA9IF9zZW5kZXJOYW1lO1xyXG5cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoX3NlbmRlck5hbWUgKyBcIiBoYXMgc2VuZCB5b3UgY2FzaCBhbW91bnQgJFwiICsgX2Nhc2hBbW91bnQgKyBcIiBhbmQgaGFzIGJlY29tZSA1MCUgb3duZXIgb2YgeW91ciBidXNpbmVzcyBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfQ29tcGFyZURpY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoX2RhdGEpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIENvbXBhcmVEaWNlRGF0YT1fZGF0YTtcclxuXHJcbiAgICAgICAgdmFyIF9yZWNlaXZlclBsYXllcj1Db21wYXJlRGljZURhdGEuUGxheWVyO1xyXG4gICAgICAgIHZhciBfcmVjZWl2ZXJQbGF5ZXJJbmRleD1Db21wYXJlRGljZURhdGEuUGxheWVySW5kZXg7XHJcbiAgICAgICAgdmFyIF9zZW5kZXJQbGF5ZXJVSUQ9Q29tcGFyZURpY2VEYXRhLk15VXNlcklEO1xyXG4gICAgICAgIHZhciBfc2VuZGVyRGljZT1Db21wYXJlRGljZURhdGEuRGljZTE7XHJcbiAgICAgICAgdmFyIF9yZWNlaXZlckRpY2U9Q29tcGFyZURpY2VEYXRhLkRpY2UyO1xyXG4gICAgICAgIHZhciBfc2VuZGVyUGF5TGltaXQ9Q29tcGFyZURpY2VEYXRhLkxpbWl0MTtcclxuICAgICAgICB2YXIgX3JlY2VpdmVyUGF5TGltaXQ9Q29tcGFyZURpY2VEYXRhLkxpbWl0MjtcclxuICAgICAgICB2YXIgX215QWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuXHJcbiAgICAgICAgaWYgKF9teUFjdG9yLlBsYXllclVJRCA9PSBfcmVjZWl2ZXJQbGF5ZXIuUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjc2lvbjAxU2NyZWVuX0NvbXBhcmVEaWNlKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJvbGxEaWNlX0NvbXBhcmVEaWNlX0NhcmRGdW5jdGlvbmFsaXR5KClcclxuICB7XHJcbiAgICB2YXIgX3JlY2VpdmVyUGxheWVyPUNvbXBhcmVEaWNlRGF0YS5QbGF5ZXI7XHJcbiAgICB2YXIgX3JlY2VpdmVyUGxheWVySW5kZXg9Q29tcGFyZURpY2VEYXRhLlBsYXllckluZGV4O1xyXG4gICAgdmFyIF9zZW5kZXJQbGF5ZXJVSUQ9Q29tcGFyZURpY2VEYXRhLk15VXNlcklEO1xyXG4gICAgdmFyIF9zZW5kZXJEaWNlPUNvbXBhcmVEaWNlRGF0YS5EaWNlMTtcclxuICAgIHZhciBfcmVjZWl2ZXJEaWNlPUNvbXBhcmVEaWNlRGF0YS5EaWNlMjtcclxuICAgIHZhciBfc2VuZGVyUGF5TGltaXQ9Q29tcGFyZURpY2VEYXRhLkxpbWl0MTtcclxuICAgIHZhciBfcmVjZWl2ZXJQYXlMaW1pdD1Db21wYXJlRGljZURhdGEuTGltaXQyO1xyXG4gICAgdmFyIFVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG5cclxuICAgIHZhciBfaW5mbz1cIlxcblwiK1wiWW91ciBEaWNlIFJlc3VsdDogXCIrX3JlY2VpdmVyRGljZStcIlxcblwiK1wiXFxuXCIrXCIgT3RoZXIgUGxheWVyIERpY2UgUmVzdWx0OiBcIitfc2VuZGVyRGljZTtcclxuXHJcbiAgICBVSU1hbmFnZXIuVG9nZ2xlRGVjc2lvbjAxU2NyZWVuX0NvbXBhcmVEaWNlKGZhbHNlKTtcclxuICAgIFVJTWFuYWdlci5Ub2dnbGVEZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UodHJ1ZSk7XHJcbiAgICBVSU1hbmFnZXIuQ2hhbmdlVGl0bGVfRGVjc2lvbjAyU2NyZWVuX0NvbXBhcmVEaWNlKF9pbmZvKTtcclxuXHJcbiAgICB2YXIgX215QWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfbXlJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgIGlmKF9zZW5kZXJEaWNlPl9yZWNlaXZlckRpY2UpIC8vd2lsbCBnaXZlIDIwMDAwXHJcbiAgICB7XHJcbiAgICAgIF9pbmZvKz1cIlxcblwiK1wiXFxuXCIrXCIgWW91IGhhdmUgbG9zdCwgeW91IGhhdmUgdG8gcGF5IG90aGVyIHBsYXllciAkJCQuXCI7XHJcbiAgICAgIFVJTWFuYWdlci5DaGFuZ2VUaXRsZV9EZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UoX2luZm8pO1xyXG4gICAgICBVSU1hbmFnZXIuVG9nZ2xlRGVjc2lvbjAyU2NyZWVuQnV0dG9uX0NvbXBhcmVEaWNlKHRydWUpO1xyXG5cclxuICAgIH1lbHNlIGlmKF9yZWNlaXZlckRpY2U+X3NlbmRlckRpY2UpIC8vd2lsbCByZWNlaXZlIDIwMDAwXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2grPTIwMDAwO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICAgICAgX2luZm8rPVwiXFxuXCIrXCJcXG5cIitcIiBZb3UgaGF2ZSB3b24sIGFtb3VudCAkMjAwMDAgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoLlwiO1xyXG4gICAgICAgIFVJTWFuYWdlci5DaGFuZ2VUaXRsZV9EZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UoX2luZm8pO1xyXG4gICAgICAgIFVJTWFuYWdlci5Ub2dnbGVEZWNzaW9uMDJTY3JlZW5CdXR0b25fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIFVJTWFuYWdlci5Ub2dnbGVEZWNzaW9uMDJTY3JlZW5fQ29tcGFyZURpY2UoZmFsc2UpO1xyXG4gICAgICAgIH0sIDgwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfc2VudGRhdGEgPSB7IFNlbmRlclVJRDogX3NlbmRlclBsYXllclVJRCAsIERlY2lzaW9uT2JqZWN0OkNvbXBhcmVEaWNlRGF0YX07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDI4LCBfc2VudGRhdGEpO1xyXG5cclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfQ29tcGFyZURpY2VEZWNpc2lvbl9DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgdmFyIF9VSUQ9X2RhdGEuU2VuZGVyVUlEO1xyXG4gICAgICAgIHZhciBfbXlBY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgIHZhciBVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAgICAgICB2YXIgX3JlY2VpdmVyUGxheWVyPV9kYXRhLkRlY2lzaW9uT2JqZWN0LlBsYXllcjtcclxuICAgICAgICB2YXIgX3JlY2VpdmVyUGxheWVySW5kZXg9X2RhdGEuRGVjaXNpb25PYmplY3QuUGxheWVySW5kZXg7XHJcbiAgICAgICAgdmFyIF9zZW5kZXJQbGF5ZXJVSUQ9X2RhdGEuRGVjaXNpb25PYmplY3QuTXlVc2VySUQ7XHJcbiAgICAgICAgdmFyIF9zZW5kZXJEaWNlPV9kYXRhLkRlY2lzaW9uT2JqZWN0LkRpY2UxO1xyXG4gICAgICAgIHZhciBfcmVjZWl2ZXJEaWNlPV9kYXRhLkRlY2lzaW9uT2JqZWN0LkRpY2UyO1xyXG4gICAgICAgIHZhciBfc2VuZGVyUGF5TGltaXQ9X2RhdGEuRGVjaXNpb25PYmplY3QuTGltaXQxO1xyXG4gICAgICAgIHZhciBfcmVjZWl2ZXJQYXlMaW1pdD1fZGF0YS5EZWNpc2lvbk9iamVjdC5MaW1pdDI7XHJcbiAgICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgICAgIFVJTWFuYWdlci5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9teUFjdG9yLlBsYXllclVJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgaWYgKF9teUFjdG9yLlBsYXllclVJRC50b1N0cmluZygpID09IF9VSUQudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgdmFyIF9pbmZvPVwiXFxuXCIrXCJZb3VyIERpY2UgUmVzdWx0OiBcIitfc2VuZGVyRGljZStcIlxcblwiK1wiXFxuXCIrXCIgT3RoZXIgUGxheWVyIERpY2UgUmVzdWx0OiBcIitfcmVjZWl2ZXJEaWNlO1xyXG5cclxuICAgICAgICAgIFVJTWFuYWdlci5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgVUlNYW5hZ2VyLlRvZ2dsZURlY3Npb24wMVNjcmVlbl9Db21wYXJlRGljZShmYWxzZSk7XHJcbiAgICAgICAgICBVSU1hbmFnZXIuVG9nZ2xlRGVjc2lvbjAyU2NyZWVuX0NvbXBhcmVEaWNlKHRydWUpO1xyXG4gICAgICAgICAgVUlNYW5hZ2VyLkNoYW5nZVRpdGxlX0RlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZShfaW5mbyk7XHJcbiAgICAgICAgICBVSU1hbmFnZXIuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICBpZihfc2VuZGVyRGljZT5fcmVjZWl2ZXJEaWNlKSAvL3dpbGwgcmVjZWl2ZSAyMDAwMFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2grPTIwMDAwO1xyXG4gICAgICAgICAgICAgIF9pbmZvKz1cIlxcblwiK1wiXFxuXCIrXCIgWW91IGhhdmUgd29uLCBhbW91bnQgJDIwMDAwIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaC5cIjtcclxuICAgICAgICAgICAgICBVSU1hbmFnZXIuQ2hhbmdlVGl0bGVfRGVjc2lvbjAyU2NyZWVuX0NvbXBhcmVEaWNlKF9pbmZvKTtcclxuICAgICAgICAgICAgICBVSU1hbmFnZXIuVG9nZ2xlRGVjc2lvbjAyU2NyZWVuQnV0dG9uX0NvbXBhcmVEaWNlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuVG9nZ2xlRGVjc2lvbjAyU2NyZWVuX0NvbXBhcmVEaWNlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLkV4aXRBbG9uZ1R1cm5PdmVyX1NlbGVjdFBsYXllckdlbmVyaWMoKTtcclxuICAgICAgICAgICAgICB9LCAxMDAwMCk7XHJcblxyXG4gICAgICAgICAgfWVsc2UgaWYoX3JlY2VpdmVyRGljZT5fc2VuZGVyRGljZSkgLy93aWxsIGdpdmUgMjAwMDBcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgX2luZm8rPVwiXFxuXCIrXCJcXG5cIitcIiBZb3UgaGF2ZSBsb3N0LCB5b3UgaGF2ZSB0byBwYXkgb3RoZXIgcGxheWVyICQkJC5cIjtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLkNoYW5nZVRpdGxlX0RlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZShfaW5mbyk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5Ub2dnbGVEZWNzaW9uMDJTY3JlZW5CdXR0b25fQ29tcGFyZURpY2UodHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUGF5QW1vdW50X0NvbXBhcmVEaWNlX0NhcmRGdW5jdGlvbmFsaXR5KClcclxuICB7XHJcbiAgICB2YXIgX215QWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfbXlJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG4gICAgdmFyIFVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaD49MjAwMDApXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2gtPTIwMDAwO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TZXRCYW5rcnVwdGVkVmFyKGZhbHNlKTtcclxuICAgICAgVUlNYW5hZ2VyLlRvZ2dsZURlY3Npb24wMlNjcmVlbl9Db21wYXJlRGljZShmYWxzZSk7XHJcbiAgICAgIGlmKF9teUluZGV4PT10aGlzLlR1cm5OdW1iZXIpXHJcbiAgICAgIHtcclxuICAgICAgICBVSU1hbmFnZXIuRXhpdEFsb25nVHVybk92ZXJfU2VsZWN0UGxheWVyR2VuZXJpYygpO1xyXG4gICAgICB9XHJcbiAgICB9ZWxzZVxyXG4gICAge1xyXG4gICAgICAvLyBpZihfbXlJbmRleCE9dGhpcy5UdXJuTnVtYmVyKVxyXG4gICAgICAvLyB7XHJcbiAgICAgIC8vICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNldEJhbmtydXB0ZWRWYXIodHJ1ZSk7XHJcbiAgICAgIC8vIH1lbHNlXHJcbiAgICAgIC8vIHtcclxuICAgICAgLy8gICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2V0QmFua3J1cHRlZFZhcihmYWxzZSk7XHJcbiAgICAgIC8vIH1cclxuXHJcbiAgICAgIC8vIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuXHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2g9MDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICBVSU1hbmFnZXIuVG9nZ2xlRGVjc2lvbjAyU2NyZWVuX0NvbXBhcmVEaWNlKGZhbHNlKTtcclxuICAgICAgaWYoX215SW5kZXg9PXRoaXMuVHVybk51bWJlcilcclxuICAgICAge1xyXG4gICAgICAgIFVJTWFuYWdlci5FeGl0QWxvbmdUdXJuT3Zlcl9TZWxlY3RQbGF5ZXJHZW5lcmljKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgUGF5QW1vdW50X0J1eUhhbGZCdXNpbmVzc19DYXJkRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCA+PSBoYWxmQnVzaW5lc3NBbW91bnQpIHtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggLT0gaGFsZkJ1c2luZXNzQW1vdW50O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBoYWxmIG93bmVyc2hpcCBvZiB0aGUgYnVzaW5lc3MsIHJlbWFpbmluZyBjYXNoICRcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkV4aXRTY3JlZW5BbG9uZ1R1cm5PdmVyX19CdXNpbmVzc0dlbnJpYygpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0J1eUhhbGZCdXNpbmVzcyhmYWxzZSk7XHJcbiAgICAgIHZhciBfc2VuZGluZ0RhdGEgPSB7IElEOiBoYWxmQnVzaW5lc3NBbW91bnRJRCwgQW1vdW50OiBoYWxmQnVzaW5lc3NBbW91bnQsIEJ1c2luZXNzSW5kZXg6IGhhbGZCdXNpbmVzc0Ftb3VudEluZGV4LCBNeUlEOiB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlELCBNeU5hbWU6IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjYsIF9zZW5kaW5nRGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgIC8vR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIEJ1eUhhbGZCdXNpbmVzc19DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSwgX2luZGV4LCBfcGxheWVySW5kZXggPSAwKSB7XHJcbiAgICAvL3ZhciBfYnVzaW5lc3MgPSBfZGF0YS5Ob09mQnVzaW5lc3NbX2luZGV4XTtcclxuICAgIC8vY29uc29sZS5sb2coX2J1c2luZXNzKTtcclxuXHJcbiAgICB2YXIgX2RpY2VSb2xsID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgIHZhciBfbXVsdGlwbGllckJ1c2luZXNzID0gMzAwMDtcclxuICAgIHZhciBfcmVzdWx0ID0gX2RpY2VSb2xsICogX211bHRpcGxpZXJCdXNpbmVzcztcclxuXHJcbiAgICBoYWxmQnVzaW5lc3NBbW91bnQgPSBfcmVzdWx0O1xyXG4gICAgaGFsZkJ1c2luZXNzQW1vdW50SUQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEO1xyXG4gICAgaGFsZkJ1c2luZXNzQW1vdW50SW5kZXggPSBfaW5kZXg7XHJcblxyXG4gICAgdmFyIF9wbGF5ZXIgPSBudWxsO1xyXG4gICAgdmFyIF90ZXh0ID0gXCJcXG5cIiArIFwiRGljZSBSZXN1bHQgOiBcIiArIF9kaWNlUm9sbCArIFwiXFxuXCIgKyBcIlxcblwiICsgXCJQYXlhYmxlIEFtb3VudCA6IFwiICsgX2RpY2VSb2xsICsgXCIgKiBcIiArIF9tdWx0aXBsaWVyQnVzaW5lc3MgKyBcIiA9ICRcIiArIF9yZXN1bHQ7XHJcblxyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVNjcmVlbl9CdXlIYWxmQnVzaW5lc3ModHJ1ZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2V0VGl0bGVUZXh0X0J1eUhhbGZCdXNpbmVzcyhfdGV4dCk7XHJcbiAgfSxcclxuICBSZWNlaXZlRXZlbnRfU2VsZWN0UGxheWVyRGFtYWdpbmdEZWNpc2lvbl9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICB2YXIgX3BsYXllciA9IF9kYXRhLlBsYXllcjtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gcGFyc2VJbnQoX2RhdGEuUGxheWVySW5kZXgpO1xyXG4gICAgICAgIHZhciBfc2VuZGVySUQgPSBfZGF0YS5NeVVzZXJJRDtcclxuXHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICBpZiAoX3BsYXllci5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZXZlbnQ6IFwiICsgX3BsYXllci5QbGF5ZXJOYW1lKTtcclxuXHJcbiAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0U2VuZGVySURfRGFtYWdlRGVjaXNpb24oX3NlbmRlcklEKTtcclxuICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVNYWluU2NyZWVuX0RhbWFnZURlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURpY2VSZXN1bHRTY3JlZW5fRGFtYWdlRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG4gIC8vI2VuZHJlZ2lvblxyXG59KTtcclxuLy9tb2R1bGUuZXhwb3J0cyAgPSBQbGF5ZXJEYXRhOyAvL3doZW4gaW1wb3J0cyBpbiBhbm90aGVyIHNjcmlwdCBvbmx5IHJlZmVyZW5jZSBvZiBwbGF5ZXJkYXRhIGNsYXNzIHdvdWxkIGJlIGFibGUgdG8gYWNjZXNzZWQgZnJvbSBHYW1lbWFuYWdlciBpbXBvcnRcclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lTWFuYWdlcjtcclxuLy8jZW5kcmVnaW9uXHJcbiJdfQ==