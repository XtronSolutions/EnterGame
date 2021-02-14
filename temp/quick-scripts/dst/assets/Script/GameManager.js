
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

var _isTest = true;
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
      MarketingArrayCounterv++;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJQcmV2aW91c0RpY2VSb2xsMyIsIlByZXZpb3VzRGljZVJvbGw0IiwiUHJldmlvdXNEaWNlUm9sbDUiLCJ1c2VyR2FtZU92ZXIiLCJCb3RHYW1lT3ZlciIsIlRvdGFsQ291bnRlclJlYWNoZWQiLCJQYXNzZWRQYXlEYXlDb3VudGVyIiwiRG91YmxlUGF5RGF5Q291bnRlciIsIk5vQ2FyZEZ1bmN0aW9uYWxpdHkiLCJQbGF5ZXJMZWZ0IiwiRm9yY2VDaGFuZ2VUaW1lT3V0IiwiR2FtZUNvbXBsZXRlZCIsIkNvcnJlY3RBbnN3ZXIiLCJWb2NhYnVsYXJ5UXVlc3Rpb25zIiwiRXN0YWJsaXNobWVudFF1ZXN0aW9ucyIsIlZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyIiwiRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIiLCJCaWdCdXNpbmVzc0FycmF5IiwiTG9zc2VzQXJyYXkiLCJNYXJrZXRpbmdBcnJheSIsIldpbGRDYXJkQXJyYXkiLCJCaWdCdXNpbmVzc0FycmF5Q291bnRlciIsIkxvc3Nlc0FycmF5Q291bnRlciIsIk1hcmtldGluZ0FycmF5Q291bnRlciIsIldpbGRDYXJkQXJyYXlDb3VudGVyIiwiRW51bUJ1c2luZXNzVHlwZSIsImNjIiwiRW51bSIsIk5vbmUiLCJIb21lQmFzZWQiLCJicmlja0FuZG1vcnRhciIsIkJ1c2luZXNzSW5mbyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJOYW1lIiwiQnVzaW5lc3NUeXBlIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uIiwiVGV4dCIsIkJ1c2luZXNzTmFtZSIsIkFtb3VudCIsIkludGVnZXIiLCJJc1BhcnRuZXJzaGlwIiwidHlwdyIsIkJvb2xlYW4iLCJQYXJ0bmVySUQiLCJQYXJ0bmVyTmFtZSIsIkxvY2F0aW9uc05hbWUiLCJMb2FuVGFrZW4iLCJMb2FuQW1vdW50IiwiUmVjZWl2ZURvdWJsZVBheURheSIsImN0b3IiLCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHkiLCJOZXh0VHVybkRvdWJsZVBheSIsIlNraXBOZXh0VHVybiIsIlNraXBOZXh0UGF5ZGF5IiwiU2tpcEhNTmV4dFBheWRheSIsIlNraXBCTU5leHRQYXlkYXkiLCJOZXh0VHVybkhhbGZQYXlEYXkiLCJOZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyIiwiU3RvY2tJbmZvIiwiU2hhcmVBbW91bnQiLCJQbGF5ZXJEYXRhIiwiUGxheWVyTmFtZSIsIlBsYXllclVJRCIsIkF2YXRhcklEIiwiSXNCb3QiLCJOb09mQnVzaW5lc3MiLCJDYXJkRnVuY3Rpb25hbGl0eSIsIkhvbWVCYXNlZEFtb3VudCIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiUmVjZWl2ZURvdWJsZVBheURheUFtb3VudCIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiTm9PZlN0b2NrcyIsIkNhc2giLCJHb2xkQ291bnQiLCJTdG9ja0NvdW50IiwiTWFya2V0aW5nQW1vdW50IiwiTGF3eWVyU3RhdHVzIiwiSXNCYW5rcnVwdCIsIkJhbmtydXB0QW1vdW50IiwiU2tpcHBlZExvYW5QYXltZW50IiwiUGxheWVyUm9sbENvdW50ZXIiLCJJbml0aWFsQ291bnRlckFzc2lnbmVkIiwiaXNHYW1lRmluaXNoZWQiLCJUb3RhbFNjb3JlIiwiVG90YWxIQkNhc2giLCJUb3RhbEJNQ2FzaCIsIlRvdGFsR29sZENhc2giLCJUb3RhbExvYW5CYWxhbmNlIiwiVG90YWxTdG9ja3NDYXNoIiwiR2FtZU92ZXIiLCJJc0FjdGl2ZSIsIkNhbkdpdmVQcm9maXRPblBheURheSIsIlVzZXJJREZvclByb2ZpdFBheURheSIsIlJvbGxDb3VudGVyIiwiRGljZVRlbXAiLCJEaWNlUm9sbCIsIklzVHdlZW5pbmciLCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJUdXJuQ2hlY2tBcnJheSIsIkJ1c2luZXNzTG9jYXRpb25Ob2RlcyIsIlBhc3NlZFBheURheSIsIkRvdWJsZVBheURheSIsIl9uZXh0VHVybkRvdWJsZVBheSIsIl9uZXh0VHVybmhhbGZQYXkiLCJfc2tpcE5leHRUdXJuIiwiX3NraXBOZXh0UGF5ZGF5IiwiX3NraXBITU5leHRQYXlkYXkiLCJfc2tpcEJNTmV4dFBheWRheSIsIkNhcmRFdmVudFJlY2VpdmVkIiwiVHVybkluUHJvZ3Jlc3MiLCJCYWNrc3BhY2VzIiwiaXNHYW1lT3ZlciIsIkNhcmREaXNwbGF5U2V0VGltb3V0IiwiR2FtZU1hbmFnZXIiLCJDb21wb25lbnQiLCJQbGF5ZXJHYW1lSW5mbyIsIkJvdEdhbWVJbmZvIiwiUGxheWVyTm9kZSIsIk5vZGUiLCJDYW1lcmFOb2RlIiwiQWxsUGxheWVyVUkiLCJBbGxQbGF5ZXJOb2RlcyIsIlN0YXJ0TG9jYXRpb25Ob2RlcyIsIlNlbGVjdGVkTW9kZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlNldFBsYXllckxlZnQiLCJfc3RhdGUiLCJSZXNldEFsbFZhcmlhYmxlcyIsIklucHV0VGVzdERpY2UxIiwiX3ZhbCIsIklucHV0VGVzdERpY2UyIiwib25Mb2FkIiwiVHVybk51bWJlciIsIlR1cm5Db21wbGV0ZWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiSW5pdF9HYW1lTWFuYWdlciIsIlJhbmRvbUNhcmRJbmRleCIsIkNhcmRDb3VudGVyIiwiQ2FyZERpc3BsYXllZCIsInJlcXVpcmUiLCJDYW1lcmEiLCJnZXRDb21wb25lbnQiLCJpc0NhbWVyYVpvb21pbmciLCJDaGVja1NwZWN0YXRlIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkiLCJBbGxEYXRhIiwiTWF4UGxheWVycyIsImxlbmd0aCIsIlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlciIsIlVwZGF0ZUdhbWVVSSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiR2V0VHVybk51bWJlciIsIkdldE15SW5kZXgiLCJteUluZGV4IiwiX2FjdG9yIiwiUGhvdG9uQWN0b3IiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJfYWxsQWN0b3JzIiwiaW5kZXgiLCJTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8iLCJBc3NpZ25QbGF5ZXJHYW1lVUkiLCJFbmFibGVQbGF5ZXJOb2RlcyIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJjb25zb2xlIiwibG9nIiwiX3RvUG9zIiwiVmVjMiIsIkdldF9TcGFjZU1hbmFnZXIiLCJEYXRhIiwiUmVmZXJlbmNlTG9jYXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5Iiwic2V0UG9zaXRpb24iLCJfbGFzdEluZGV4IiwiYWN0aXZlIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIlRvdGFsQ29ubmVjdGVkUGxheWVycyIsIm15Um9vbUFjdG9yQ291bnQiLCJ1c2VySUQiLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNoYW5nZVR1cm4iLCJSYWlzZUV2ZW50Rm9yQ2FyZCIsIl9kYXRhIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJSYWlzZUV2ZW50IiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsImNsZWFyVGltZW91dCIsIkRpc3BsYXlDYXJkT25PdGhlcnMiLCJPbkxhbmRlZE9uU3BhY2UiLCJzZXRUaW1lb3V0IiwiUmVzZXRDYXJkRGlzcGxheSIsIlJlY2VpdmVFdmVudEZvckNhcmQiLCJSYW5kb21DYXJkIiwicmFuZG9tQ2FyZCIsImNvdW50ZXIiLCJSYWlzZUV2ZW50VHVybkNvbXBsZXRlIiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwiU3luY0FsbERhdGEiLCJSZW1vdmVGcm9tQ2hlY2tBcnJheSIsIl91aWQiLCJfaW5kIiwic3BsaWNlIiwiQ2hlY2tUdXJuQ29tcGxldGUiLCJqIiwiUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlIiwicHVzaCIsIkFycmF5TGVuZ3RoIiwiSURGb3VuZCIsIlJlc2V0U29tZVZhbHVlcyIsIkNoYW5nZVR1cm5Gb3JjZWZ1bGx5IiwiVXBkYXRlVmlzdWFsRGF0YSIsIlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSIsIlR1cm5IYW5kbGVyIiwiX3R1cm4iLCJfaXNNYXN0ZXIiLCJDaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQiLCJfcGxheWVyTWF0Y2hlZCIsIlRvZ2dsZVR1cm5Qcm9ncmVzcyIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlJlc2V0VHVyblZhcmlhYmxlIiwiUm9sbERpY2UiLCJEaWNlUm9sbFNjcmVlbiIsIlBsYXllckluZm8iLCJteVJvb21BY3RvcnNBcnJheSIsIlNob3dUb2FzdCIsIlRvZ2dsZVNraXBOZXh0VHVybiIsIk1haW5TZXNzaW9uRGF0YSIsIk15RGF0YSIsIl9jb3VudGVyIiwiU3RhcnRUdXJuIiwiUmVjZWl2ZUJhbmtydXB0RGF0YSIsIl9pc0JhbmtydXB0ZWQiLCJiYW5rcnVwdGVkIiwidHVybiIsIl9wbGF5ZXJEYXRhIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiX3JhbmRvbUluZGV4IiwiZ2V0UmFuZG9tIiwiU2V0TmFtZSIsIlNldEF2YXRhciIsIl90b2dnbGVIaWdobGlnaHQiLCJfaW5kZXgiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJjaGlsZHJlbiIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiQXZhdGFyU3ByaXRlcyIsIlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMiLCJ0YXJnZXRQb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInJhdGlvIiwid2luU2l6ZSIsImhlaWdodCIsInpvb21SYXRpbyIsImxhdGVVcGRhdGUiLCJzeW5jRGljZVJvbGwiLCJfcm9sbCIsIl9kaWNlMSIsImRpY2UxIiwiX2RpY2UyIiwiZGljZTIiLCJfcmVzdWx0IiwiZXJyb3IiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJBbmltYXRlRGljZSIsIkRpY2VGdW50aW9uYWxpdHkiLCJfcG9zIiwiVHdlZW5DYW1lcmEiLCJUZW1wQ2hlY2tTcGFjZSIsIl9yb2xsaW5nIiwidGVtcGNvdW50ZXIiLCJ0ZW1wY291bnRlcjIiLCJkaWNldG9iZSIsInBhcnNlSW50IiwiU3BhY2VEYXRhIiwiU3BhY2VzVHlwZSIsIkRpY2UxIiwiRGljZTIiLCJfbmV3Um9sbCIsIlJvbGxPbmVEaWNlIiwiUm9sbFR3b0RpY2VzIiwiUG9wdWxhdGVEZWNrc0FycmF5IiwiX2lzQmlnQnVzaW5lc3MiLCJfaXNMb3NzZXMiLCJfaXNNYXJrZXRpbmciLCJfaXNXaWxkQ2FyZCIsInNvcnQiLCJNYXRoIiwicmFuZG9tIiwiX3RlbXBEYXRhIiwiQmlnQXJyYXkiLCJMb3NzQXJyYXkiLCJNYXJrZXRBcnJheSIsIldpbGRBcnJ5YSIsIkdldEJpZ0J1c2luZXNzSW5kZXgiLCJHZXRMb3NzZXNJbmRleCIsIkdldE1hcmtldGluZ0luZGV4IiwiR2V0V2lsZENhcmRJbmRleCIsIlVwZGF0ZUNvdW50ZXJzIiwiTWFya2V0aW5nQXJyYXlDb3VudGVydiIsIlNlbGVjdFJlbGF0ZWRDYXJkIiwiY2FsbFVwb25DYXJkIiwiX3NwYWNlSUQiLCJTdGFydERpY2VSb2xsIiwiU2VuZGluZ0RhdGEiLCJpc0JvdCIsImNvbXBsZXRlQ2FyZFR1cm4iLCJBbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZCIsIkNhbGxHYW1lQ29tcGxldGUiLCJfaXNCb3QiLCJfZm9yY2VHYW1lT3ZlciIsIl9wbGF5ZXJJbmRleCIsIl9jYXNoIiwiSE1BbW91bnQiLCJHZXRfR2FtZU1hbmFnZXIiLCJCTUFtb3VudCIsIkJNTG9jYXRpb25zIiwibG9hbkFtb3VudCIsIl9nb2xkIiwiX3N0b2NrcyIsIl9kaWNlUmFuZG9tIiwiT25jZU9yU2hhcmUiLCJHb2xkQ2FzaCIsIlN0b2NrQ2FzaCIsIkJNQ2FzaCIsIkhNQ2FzaCIsIlRvdGFsQXNzZXRzIiwiUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZSIsIlJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhIiwiU3luY0dhbWVPdmVyIiwiX1VJRCIsImluZm9UZXh0Iiwic3RhdHVzVGV4dCIsIkRpc2Nvbm5lY3REYXRhIiwiU2hvd1Jlc3VsdFNjcmVlbiIsIl9jdXJyZW50Q2FzaCIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU3R1ZGVudERhdGEiLCJnYW1lQ2FzaCIsIl90b3RhbCIsInRvU3RyaW5nIiwiX3dvbiIsImdhbWVzV29uIiwiVXBkYXRlVXNlckRhdGEiLCJTeW5jR2FtZUNvbXBsZXRlRGF0YSIsIkJvdCIsIlpvb21DYW1lcmFPdXRPbmx5IiwibWF4IiwiU2VsZWN0ZWRJbmQiLCJTZXNzaW9uRGF0YSIsIl92YWx1ZSIsInRyYWNlIiwicGxheWVyY29tcGxldGVkIiwiWm9vbUNhbWVyYU91dCIsIlR3ZWVuUGxheWVyIiwibWluIiwiZmxvb3IiLCJpc1pvb20iLCJ0aW1lIiwidHdlZW4iLCJ0byIsInYyIiwiZWFzaW5nIiwiY2FsbCIsIlpvb21DYW1lcmFJbiIsInN0YXJ0IiwiQ2hlY2tQYXlEYXlDb25kaXRpb25zIiwiUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24iLCJUb1BvcyIsInNwZWVkIiwiX25ld3BvcyIsIlRvZ2dsZVBheURheSIsIl9zdDEiLCJfU3QyIiwiSW5jcmVhc2VEb3VibGVQYXlEYXkiLCJFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iLCJhbW91bnQiLCJfbG9jYXRpb25OYW1lIiwiX2lzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfR2l2ZW5DYXNoIiwiX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uIiwiR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbiIsImkiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQiLCJTZXRCdXNpbmVzc0luZGV4IiwiU2V0Q2FyZEZ1bmN0aW9uYWxpdHkiLCJTZXRHaXZlbkNhc2giLCJTZXRTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJSZXNldEVkaXRCb3giLCJEZXN0cm95R2VuZXJhdGVkTm9kZXMiLCJkZXN0cm95IiwiVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiX1NoYXJlQW1vdW50IiwiX2lzQWRkaW5nIiwiX3N0b2NrIiwiX2lzRG91YmxlUGF5RGF5IiwiX2ZvclNlbGVjdGVkQnVzaW5lc3MiLCJfU2VsZWN0ZWRCdXNpbmVzc0luZGV4IiwiSEJBbW91bnQiLCJfdGl0bGUiLCJBc3NpZ25EYXRhX1BheURheSIsIlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUiLCJCYW5rcnVwdF9UdXJuRGVjaXNpb24iLCJTZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiX2Ftb3VudCIsIl91SUQiLCJJRCIsIlJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJfaUQiLCJfbXlJbmRleCIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiVG9nZ2xlSGFsZlBheU5leHRUdXJuIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiUmV0dXJuVHVyblByb2dyZXNzIiwiTG9zZUFsbE1hcmtldGluZ01vbmV5IiwiX2xvc2VBbW91bnQiLCJNdWx0aXBseU1hcmtldGluZ01vbmV5IiwiX211bHRpcGxpZXIiLCJfYW1vdW50SW5jcmVhc2VkIiwiR2V0TWFya2V0aW5nTW9uZXkiLCJfcHJvZml0IiwiR2V0Vm9jYWJ1bGFyeVF1ZXN0aW9uc0luZGV4IiwiUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X1ZvY2FidWxhcnkiLCJHZXRFc3RhYmxpc2htZW50UXVlc3Rpb25zSW5kZXgiLCJQb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfRXN0YWJsaXNobWVudCIsIlZvY0FycmF5IiwiRXN0QXJyYXkiLCJRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbiIsIl9xdWVzdGlvblJlZiIsIkdldF9RdWVzdGlvbnNEYXRhIiwiX3VzZXJJRCIsIlVzZXJJRCIsIl9xdWVzdGlvbkluZGV4IiwiUXVlc3Rpb24iLCJVc2VySW5kZXgiLCJfaXNWb2MiLCJJc1ZvYyIsIl9nYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9RZGF0YSIsIkNvcnJlY3RPcHRpb24iLCJfbWVzc2FnZSIsIk9wdGlvbjEiLCJPcHRpb24yIiwiT3B0aW9uMyIsIk9wdGlvbjQiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uIiwiX2lzVHVybk92ZXIiLCJfbXlEYXRhIiwiX3Jvb21EYXRhIiwiVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIk9uZVF1ZXN0aW9uRGVjaXNpb25fU2VsZWN0T3B0aW9uX09uZVF1ZXN0aW9uIiwiZXZlbnQiLCJfc2VsZWN0aW9uIiwiY3VycmVudFRhcmdldCIsInNwbGl0IiwiUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uIiwiU2VsZWN0UGxheWVyUHJvZml0X1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5IiwiVG9nZ2xlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJSZWNlaXZlRXZlbnRfU2VsZWN0UGxheWVyRm9yUHJvZml0X1NwYWNlX0NhcmRGdW5jdGlvbmFsaXR5IiwiX293bklEIiwiX3BsYXllck5hbWUiLCJVc2VyTmFtZSIsIl9wbGF5ZXJJRCIsIk93blBsYXllcklEIiwiX2hhc0RvbmVQYXltZW50IiwiX2hhc0Fuc3dlcmVkUXVlc3Rpb24iLCJfVXNlcklEIiwiUGF5bWVudERvbmUiLCJRdWVzdGlvbkFuc3dlcmVkIiwiUXVlc3Rpb25JbmRleCIsIlJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfc2VsZWN0ZWRQbGF5ZXJJbmRleCIsIl9hY3RvcnNEYXRhIiwiUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5IiwiX3NwYWNlcyIsImJhY2tzcGFjZXMiLCJDb3VudGVyIiwiVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzIiwiR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHLElBQWQ7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUVBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBRUEsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUVBLElBQUlDLFlBQVksR0FBRyxLQUFuQjtB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S0FISDtBQUlELEdBLzlFd0I7QUFpK0V6QitILEVBQUFBLCtCQWorRXlCLDZDQWkrRVM7QUFDaEM5WixJQUFBQSxXQUFXLElBQUlpQixVQUFmOztBQUVBLFFBQUksS0FBS2EsWUFBTCxJQUFxQixDQUF6QixFQUE0QjtBQUMxQixVQUFJcUUsS0FBSyxHQUFHO0FBQUVmLFFBQUFBLElBQUksRUFBRTtBQUFFdVUsVUFBQUEsVUFBVSxFQUFFMVksVUFBZDtBQUEwQjJZLFVBQUFBLE9BQU8sRUFBRTVaO0FBQW5DO0FBQVIsT0FBWjtBQUNBSSxNQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDb0UsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RUYsS0FBOUU7QUFDRDs7QUFFRCxRQUFJbEIsTUFBTSxHQUFHMUosRUFBRSxDQUFDMkosSUFBSCxDQUFROUUsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERwRixXQUExRCxFQUF1RXFGLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dDLENBQTFHLEVBQTZHbkYsd0JBQXdCLENBQUM0QixRQUF6QixDQUFrQ21ELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERwRixXQUExRCxFQUF1RXFGLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dFLENBQS9NLENBQWI7O0FBQ0EsU0FBS3FVLHdCQUFMLENBQThCLEtBQUtqWSxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLENBQTlCLEVBQW9FeUMsTUFBcEU7QUFDQSxTQUFLbUosZ0JBQUw7QUFDRCxHQTUrRXdCLENBOCtFekI7QUFDQTs7QUEvK0V5QixDQUFULENBQWxCLEVBaS9FQTs7QUFDQTJMLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjVZLFdBQWpCLEVBQ0EiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfaXNUZXN0ID0gdHJ1ZTtcclxudmFyIF9kaWNlaW5wdXQxID0gXCJcIjtcclxudmFyIF9kaWNlaW5wdXQyID0gXCJcIjtcclxudmFyIFByZXZpb3VzRGljZVJvbGwxID0gLTE7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsMiA9IC0xO1xyXG5cclxudmFyIFByZXZpb3VzRGljZVJvbGwzID0gLTE7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsNCA9IC0xO1xyXG5cclxudmFyIFByZXZpb3VzRGljZVJvbGw1ID0gLTE7XHJcblxyXG52YXIgdXNlckdhbWVPdmVyID0gZmFsc2U7XHJcbnZhciBCb3RHYW1lT3ZlciA9IGZhbHNlO1xyXG52YXIgVG90YWxDb3VudGVyUmVhY2hlZCA9IGZhbHNlO1xyXG52YXIgUGFzc2VkUGF5RGF5Q291bnRlciA9IDA7XHJcbnZhciBEb3VibGVQYXlEYXlDb3VudGVyID0gMDtcclxudmFyIE5vQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxudmFyIFBsYXllckxlZnQgPSBmYWxzZTtcclxudmFyIEZvcmNlQ2hhbmdlVGltZU91dCA9IG51bGw7XHJcbnZhciBHYW1lQ29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBDb3JyZWN0QW5zd2VyID0gMDtcclxuXHJcbnZhciBWb2NhYnVsYXJ5UXVlc3Rpb25zID0gW107XHJcbnZhciBFc3RhYmxpc2htZW50UXVlc3Rpb25zID0gW107XHJcbnZhciBWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcbnZhciBFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcblxyXG52YXIgQmlnQnVzaW5lc3NBcnJheSA9IFtdO1xyXG52YXIgTG9zc2VzQXJyYXkgPSBbXTtcclxudmFyIE1hcmtldGluZ0FycmF5ID0gW107XHJcbnZhciBXaWxkQ2FyZEFycmF5ID0gW107XHJcbnZhciBCaWdCdXNpbmVzc0FycmF5Q291bnRlciA9IDA7XHJcbnZhciBMb3NzZXNBcnJheUNvdW50ZXIgPSAwO1xyXG52YXIgTWFya2V0aW5nQXJyYXlDb3VudGVyID0gMDtcclxudmFyIFdpbGRDYXJkQXJyYXlDb3VudGVyID0gMDtcclxuXHJcbi8vI3JlZ2lvbiBzdXBlcmNsYXNzZXMgYW5kIGVudW1lcmF0aW9uc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bUJ1c2luZXNzVHlwZSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgSG9tZUJhc2VkOiAxLCAvL2EgYnVzaW5lc3MgdGhhdCB5b3Ugb3BlcmF0ZSBvdXQgb2YgeW91ciBob21lXHJcbiAgYnJpY2tBbmRtb3J0YXI6IDIsIC8vYSBzdG9yZSBmcm9udCBidXNpbmVzc1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzc0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzSW5mbyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1c2luZXNzSW5mb1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWU6IFwiQnVzaW5lc3NEYXRhXCIsXHJcbiAgICBCdXNpbmVzc1R5cGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTW9kZVwiLFxyXG4gICAgICB0eXBlOiBFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgICBkZWZhdWx0OiBFbnVtQnVzaW5lc3NUeXBlLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJCdXNpbmVzcyBjYXRvZ29yeSBmb3IgcGxheWVyc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzVHlwZURlc2NyaXB0aW9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR5cGVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlR5cGUgKGJ5IG5hbWUpIG9mIGJ1c2luZXNzIHBsYXllciBpcyBvcGVuaW5nXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5hbWUgb2YgdGhlIGJ1c2luZXNzIHBsYXllciBpcyBvcGVuaW5nXCIsXHJcbiAgICB9LFxyXG4gICAgQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFtb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYmFsYW5jZSBvZiBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIElzUGFydG5lcnNoaXA6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNQYXJ0bmVyc2hpcFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwdzogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgZG9uZSBwYXJ0bmVyc2hpcCB3aXRoIHNvbWVvbmUgd2l0aCBjdXJyZW50IGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lcklEOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhcnRuZXJJRFwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiSUQgb2YgdGhlIHBhcnRuZXIgd2l0aCB3aG9tIHBsYXllciBoYXMgZm9ybWVkIHBhcnRuZXJzaGlwXCIsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5hbWUgb2YgdGhlIHBhcnRuZXIgd2l0aCB3aG9tIHBsYXllciBoYXMgZm9ybWVkIHBhcnRuZXJzaGlwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9jYXRpb25zTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2NhdGlvbnNOYW1lXCIsXHJcbiAgICAgIHR5cGU6IFtjYy5UZXh0XSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpZiBwbGF5ZXIgb3ducyBicmljayBhbmQgbW9ydGFyIGhlL3NoZSBjYW4gZXhwYW5kIHRvIG5ldyBsb2NhdGlvblwiLFxyXG4gICAgfSxcclxuICAgIExvYW5UYWtlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFJlY2VpdmVEb3VibGVQYXlEYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVjZWl2ZURvdWJsZVBheURheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBDYXJkRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZERhdGFGdW5jdGlvbmFsaXR5ID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5XCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmV4dFR1cm5Eb3VibGVQYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmV4dFR1cm5Eb3VibGVQYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIGl0cyBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTmV4dFR1cm46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcE5leHRUdXJuXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiB0dXJuIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCB0dXJuIGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFNraXBOZXh0UGF5ZGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBOZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwSE1OZXh0UGF5ZGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBITU5leHRQYXlkYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgaG9tZSBiYXNlZCBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwQk1OZXh0UGF5ZGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBCTU5leHRQYXlkYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgYnJpY2thIGFuZCBtbW9ydGFyIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIE5leHRUdXJuSGFsZlBheURheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOZXh0VHVybkhhbGZQYXlEYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBOZXh0VHVybkhhbGZQYXlEYXlDb3VudGVyOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5leHRUdXJuSGFsZlBheURheUNvdW50ZXJcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdG9ja0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0b2NrSW5mbyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlN0b2NrSW5mb1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWU6IFwiU3RvY2tEYXRhXCIsXHJcbiAgICBCdXNpbmVzc05hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJuYW1lIG9mIHRoZSBidXNpbmVzcyBpbiB3aGljaCBzdG9ja3Mgd2lsbCBiZSBoZWxkXCIsXHJcbiAgICB9LFxyXG4gICAgU2hhcmVBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2hhcmVBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlNoYXJlIGFtb3VudCBvZiB0aGUgc3RvY2tcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yICBQbGF5ZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlBsYXllckRhdGFcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5hbWUgb2YgdGhlIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllclVJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJVSURcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklEIG9mIHRoZSBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBBdmF0YXJJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBdmF0YXJJRFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaWQgcmVmZXJlbmNlIGZvciBwbGF5ZXIgYXZhdGFyIHNlbGVjdGlvblwiLFxyXG4gICAgfSxcclxuICAgIElzQm90OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQm90XCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXB3OiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgY3VycmVudCBwbGF5ZXIgaXMgYm90XCIsXHJcbiAgICB9LFxyXG4gICAgTm9PZkJ1c2luZXNzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzXCIsXHJcbiAgICAgIHR5cGU6IFtCdXNpbmVzc0luZm9dLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk51bWJlciBvZiBidXNpbmVzcyBhIHBsYXllciBjYW4gb3duXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FyZEZ1bmN0aW9uYWxpdHk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FyZEZ1bmN0aW9uYWxpdHlcIixcclxuICAgICAgdHlwZTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY2FyZCBmdW5jdGlvbmFsaXR5IHN0b3JlZCBieSBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWRBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJudW1iZXIgb2YgaG9tZSBiYXNlZCBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgQnJpY2tBbmRNb3J0YXJBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tBbmRNb3J0YXJBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm51bWJlciBvZiBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBSZWNlaXZlRG91YmxlUGF5RGF5QW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlY2VpdmVEb3VibGVQYXlEYXlBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsTG9jYXRpb25zQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsTG9jYXRpb25zQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJudW1iZXIgb2YgbG9jYXRpb25zIG9mIGFsbCBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgTm9PZlN0b2Nrczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja3NcIixcclxuICAgICAgdHlwZTogW1N0b2NrSW5mb10sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTnVtYmVyIG9mIHN0b2NrIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBjYXNoIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgR29sZENvdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdvbGRDb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY291bnQgb2YgZ29sZCBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgU3RvY2tDb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja0NvdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjb3VudCBvZiBzdG9ja3MgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIExvYW5UYWtlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHRha2VuIGxvYW4gZnJvbSBiYW5rIG9yIG5vdFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQW1vdW50IG9mIGxvYW4gdGFrZW4gZnJvbSB0aGUgYmFua1wiLFxyXG4gICAgfSxcclxuICAgIE1hcmtldGluZ0Ftb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYXJrZXRpbmdBbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm1hcmtldGluZyBhbW91bnQgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIExhd3llclN0YXR1czoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMYXd5ZXJTdGF0dXNcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGhpcmVkIGEgbGF3eWVyIG9yIG5vdFwiLFxyXG4gICAgfSxcclxuICAgIElzQmFua3J1cHQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNCYW5rcnVwdFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgYmVlbiBCYW5rcnVwdGVkIG9yIG5vdFwiLFxyXG4gICAgfSxcclxuICAgIEJhbmtydXB0QW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJhbmtydXB0QW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGhvdyBtdWNoIHRpbWUgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcIixcclxuICAgIH0sXHJcbiAgICBTa2lwcGVkTG9hblBheW1lbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcHBlZExvYW5QYXltZW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBza2lwcGVkIGxvYW4gcGF5bWVudFwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllclJvbGxDb3VudGVyOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclJvbGxDb3VudGVyXCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHRvIHN0b3JlIHJvbGwgY291bnRvciBmb3IgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgSW5pdGlhbENvdW50ZXJBc3NpZ25lZDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJbml0aWFsQ291bnRlckFzc2lnbmVkXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgaXNHYW1lRmluaXNoZWQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiaXNHYW1lRmluaXNoZWRcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbFNjb3JlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsU2NvcmVcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsSEJDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsSEJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEJNQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEJNQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxHb2xkQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEdvbGRDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbExvYW5CYWxhbmNlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsTG9hbkJhbGFuY2VcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsU3RvY2tzQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbFN0b2Nrc0Nhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEdhbWVPdmVyOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdhbWVPdmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSXNBY3RpdmU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNBY3RpdmVcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIENhbkdpdmVQcm9maXRPblBheURheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYW5HaXZlUHJvZml0T25QYXlEYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBVc2VySURGb3JQcm9maXRQYXlEYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVXNlcklERm9yUHJvZml0UGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIEdhbWUgTWFuYWdlciBDbGFzc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0obWFpbiBjbGFzcykgY2xhc3MgZm9yIEdhbWUgTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUm9sbENvdW50ZXIgPSAwO1xyXG52YXIgRGljZVRlbXAgPSAwO1xyXG52YXIgRGljZVJvbGwgPSAwO1xyXG52YXIgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIFR1cm5DaGVja0FycmF5ID0gW107XHJcbnZhciBCdXNpbmVzc0xvY2F0aW9uTm9kZXMgPSBbXTtcclxuXHJcbnZhciBQYXNzZWRQYXlEYXkgPSBmYWxzZTtcclxudmFyIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG5cclxuLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbnZhciBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxudmFyIF9uZXh0VHVybmhhbGZQYXkgPSBmYWxzZTtcclxudmFyIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxudmFyIF9za2lwTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG52YXIgX3NraXBITU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbnZhciBUdXJuSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxudmFyIEJhY2tzcGFjZXMgPSAzO1xyXG52YXIgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxudmFyIENhcmREaXNwbGF5U2V0VGltb3V0ID0gbnVsbDtcclxuXHJcbnZhciBHYW1lTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkdhbWVNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgcGxheWVyJ3MgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIEJvdEdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgYm90J3MgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBDYW1lcmFOb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgY2FtZXJhXCIsXHJcbiAgICB9LFxyXG4gICAgQWxsUGxheWVyVUk6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIHVpIG9mIGFsbCBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gICAgQWxsUGxheWVyTm9kZXM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIG5vZGUgb2YgYWxsIHBsYXllcnMgaW5zaWRlIGdhbWVwbGF5XCIsXHJcbiAgICB9LFxyXG4gICAgU3RhcnRMb2NhdGlvbk5vZGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBvZiBhdHRheSBvZiBsb2NhdGlvbnNcIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RlZE1vZGU6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImludGVnZXIgcmVmZXJlbmNlIGZvciBnYW1lIG1vZGUgMSBtZWFucyBib3QgYW5kIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIFBsYXllckRhdGE6IFBsYXllckRhdGEsXHJcbiAgICBCdXNpbmVzc0luZm86IEJ1c2luZXNzSW5mbyxcclxuICAgIENhcmREYXRhRnVuY3Rpb25hbGl0eTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgRW51bUJ1c2luZXNzVHlwZTogRW51bUJ1c2luZXNzVHlwZSxcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFNldFBsYXllckxlZnQoX3N0YXRlKSB7XHJcbiAgICBQbGF5ZXJMZWZ0ID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0QWxsVmFyaWFibGVzKCkge1xyXG4gICAgVm9jYWJ1bGFyeVF1ZXN0aW9ucyA9IFtdO1xyXG4gICAgRXN0YWJsaXNobWVudFF1ZXN0aW9ucyA9IFtdO1xyXG4gICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG4gICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG5cclxuICAgIEJpZ0J1c2luZXNzQXJyYXkgPSBbXTtcclxuICAgIExvc3Nlc0FycmF5ID0gW107XHJcbiAgICBNYXJrZXRpbmdBcnJheSA9IFtdO1xyXG4gICAgV2lsZENhcmRBcnJheSA9IFtdO1xyXG4gICAgQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgTG9zc2VzQXJyYXlDb3VudGVyID0gMDtcclxuICAgIE1hcmtldGluZ0FycmF5Q291bnRlciA9IDA7XHJcbiAgICBXaWxkQ2FyZEFycmF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgX2RpY2VpbnB1dDEgPSBcIlwiO1xyXG4gICAgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDEgPSAtMTtcclxuICAgIFByZXZpb3VzRGljZVJvbGwyID0gLTE7XHJcbiAgICBQbGF5ZXJMZWZ0ID0gZmFsc2U7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMyA9IC0xO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDQgPSAtMTtcclxuICAgIF9uZXh0VHVybmhhbGZQYXkgPSBmYWxzZTtcclxuICAgIFByZXZpb3VzRGljZVJvbGw1ID0gLTE7XHJcbiAgICBHYW1lQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICB1c2VyR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgIEJvdEdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICBDb3JyZWN0QW5zd2VyID0gMDtcclxuICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIERpY2VSb2xsID0gMDtcclxuICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcbiAgICBGb3JjZUNoYW5nZVRpbWVPdXQgPSBudWxsO1xyXG4gICAgUGFzc2VkUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG4gICAgX3NraXBITU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG4gICAgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxuICAgIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICBUdXJuSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxuICAgIEJhY2tzcGFjZXMgPSAzO1xyXG4gICAgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxuICAgIENhcmREaXNwbGF5U2V0VGltb3V0ID0gbnVsbDtcclxuICAgIFRvdGFsQ291bnRlclJlYWNoZWQgPSBmYWxzZTtcclxuICAgIE5vQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBJbnB1dFRlc3REaWNlMShfdmFsKSB7XHJcbiAgICBpZiAoX2lzVGVzdCkge1xyXG4gICAgICBfZGljZWlucHV0MSA9IF92YWw7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5wdXRUZXN0RGljZTIoX3ZhbCkge1xyXG4gICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgX2RpY2VpbnB1dDIgPSBfdmFsO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBBbGwgRnVuY3Rpb25zIG9mIEdhbWVNYW5hZ2VyXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgY2xhc3MgaXMgY3JlYXRlZFxyXG4gICAqKi9cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsVmFyaWFibGVzKCk7XHJcbiAgICBHYW1lTWFuYWdlci5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB0aGlzLlR1cm5OdW1iZXIgPSAwO1xyXG4gICAgdGhpcy5UdXJuQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuU2VsZWN0ZWRNb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIHRoaXMuSW5pdF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4ID0gMDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiByZWZlcmVuY2Ugb2YgcmVxdWlyZWQgY2xhc3Nlc1xyXG4gICAqKi9cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGluaXRpYWwgZ2FtZW1hbmFnZXIgZXNzZXRpYWxzXHJcbiAgICoqL1xyXG4gIEluaXRfR2FtZU1hbmFnZXIoKSB7XHJcbiAgICB0aGlzLkNhbWVyYSA9IHRoaXMuQ2FtZXJhTm9kZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKTtcclxuICAgIHRoaXMuaXNDYW1lcmFab29taW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gW107XHJcbiAgICBSb2xsQ291bnRlciA9IDA7XHJcbiAgICBEaWNlVGVtcCA9IDA7XHJcbiAgICBEaWNlUm9sbCA9IDA7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9nYW1lIGlzIGJlaW5nIHBsYXllZCBieSByZWFsIHBsYXllcnNcclxuICAgICAgLy9pZiBqb2luZWQgcGxheWVyIGlzIHNwZWN0YXRlXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInN0YXR1cyBvZiBpbml0aWFsIGJ1c2luZXNzIHNldHA6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIikpO1xyXG5cclxuICAgICAgICAvL2lmIGluaXRhbCBzZXR1cCBoYXMgYmVlbiBkb25lIGFuZCBnYW1lIGlzIHVuZGVyIHdheVxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpID09IHRydWUpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICB2YXIgQWxsRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm8gPSBBbGxEYXRhO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgdGhpcy5UdXJuTnVtYmVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIik7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgIC8vdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IDg7XHJcbiAgICAgICAgICAvL3RoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLCBmYWxzZSwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9nYW1lIGlzIGJlaW5nIHBsYXllZCBieSBib3QgYWxvbmcgd2l0aCBvbmUgcGxheWVyXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSwgZmFsc2UsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNyZWdpb24gcHVibGljIGZ1bmN0aW9ucyB0byBnZXQgZGF0YSAoYWNjZXNzaWJsZSBmcm9tIG90aGVyIGNsYXNzZXMpXHJcbiAgR2V0VHVybk51bWJlcigpIHtcclxuICAgIHJldHVybiB0aGlzLlR1cm5OdW1iZXI7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBnZXQgbXkgaW5kZXggaW4gYXJyYXkgb2YgUGxheWVyR2FtZUluZm8gXHJcbiAgICoqL1xyXG4gIEdldE15SW5kZXgoKSB7XHJcbiAgICB2YXIgbXlJbmRleCA9IDA7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB2YXIgX2FsbEFjdG9ycyA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hbGxBY3RvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfYWN0b3IuUGxheWVyVUlEID09IF9hbGxBY3RvcnNbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgIG15SW5kZXggPSBpbmRleDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBteUluZGV4O1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZU1vZGUgQ29kZVxyXG5cclxuICBTeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKSB7XHJcbiAgICB2YXIgQWxsRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiKTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm8gPSBBbGxEYXRhO1xyXG4gICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwic3luY2luZyBhbGwgZGF0YSBmb3Igc3BlY3RhdGVcIik7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyID4gMCAmJiB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jbml0aWFsQ291bnRlckFzc2lnbmVkID09IHRydWUgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKF90b1Bvcy54LCBfdG9Qb3MueSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXR0aW5nIHBvczFcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY291bnRlcjogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJbml0aWFsIENvdW50ZXIgQXNzaWduZWQ6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIGZpbmlzaGVkIDogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgIHZhciBfbGFzdEluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19sYXN0SW5kZXhdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtfbGFzdEluZGV4XS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCwgX3RvUG9zLnkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZyBwb3MyXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9jb25zb2xlLmxvZyhcInN5bmNlZCBwbGF5ZXJub2Rlc1wiKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlcigpIHtcclxuICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yQ291bnQoKTtcclxuICAgIGlmIChUdXJuQ2hlY2tBcnJheS5sZW5ndGggPT0gVG90YWxDb25uZWN0ZWRQbGF5ZXJzKSB7XHJcbiAgICAgIFR1cm5DaGVja0FycmF5ID0gW107XHJcbiAgICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwicmVzZXRpbmcgZm9yIHNwZWN0YXRlXCIpO1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIGZ1bmN0aW9ucyByZWxhdGVkIHRvIFR1cm4gTWVjaGFuaXNtIGFuZCBjYXJkIG1lY2hhbmlzbVxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJhaXNlZCBldmVudCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHMgdG8gbGV0IG90aGVycyBrbm93IGEgd2hhdCBjYXJkIGhhcyBiZWVuIHNlbGVjdGVkIGJ5IHBsYXllclxyXG4gICAqKi9cclxuICBSYWlzZUV2ZW50Rm9yQ2FyZChfZGF0YSkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg1LCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJEaXNwbGF5VGltZW91dCgpIHtcclxuICAgIGNsZWFyVGltZW91dChDYXJkRGlzcGxheVNldFRpbW91dCk7XHJcbiAgfSxcclxuXHJcbiAgRGlzcGxheUNhcmRPbk90aGVycygpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBjb25zb2xlLmxvZyhcImNhcmQgZXZlbnQgcmVjZWl2ZWQ6IFwiICsgQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG4gICAgICBpZiAoQ2FyZEV2ZW50UmVjZWl2ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChDYXJkRGlzcGxheVNldFRpbW91dCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmVycm9yKHRoaXMuQ2FyZENvdW50ZXIpO1xyXG4gICAgICAgIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLkNhcmREaXNwbGF5ZWQpIHtcclxuICAgICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZCA9IHRydWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5DYXJkQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZShmYWxzZSwgdGhpcy5SYW5kb21DYXJkSW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBDYXJkRGlzcGxheVNldFRpbW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgLy9jaGVjayBhZnRlciBldmVyeSAwLjUgc2Vjb25kc1xyXG4gICAgICAgICAgdGhpcy5EaXNwbGF5Q2FyZE9uT3RoZXJzKCk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldENhcmREaXNwbGF5KCkge1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50Rm9yQ2FyZChfZGF0YSkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIGNvbnNvbGUubG9nKFwiQ2FyZCBEYXRhIFJlY2VpdmVkOlwiKTtcclxuICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuXHJcbiAgICB2YXIgUmFuZG9tQ2FyZCA9IF9kYXRhLnJhbmRvbUNhcmQ7XHJcbiAgICB2YXIgY291bnRlciA9IF9kYXRhLmNvdW50ZXI7XHJcblxyXG4gICAgdGhpcy5SYW5kb21DYXJkSW5kZXggPSBSYW5kb21DYXJkO1xyXG4gICAgdGhpcy5DYXJkQ291bnRlciA9IGNvdW50ZXI7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UodHJ1ZSwgUmFuZG9tQ2FyZCk7XHJcbiAgICAgIGVsc2UgQ2FyZEV2ZW50UmVjZWl2ZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gZmFsc2UpIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKHRydWUsIFJhbmRvbUNhcmQpO1xyXG4gICAgICBlbHNlIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKGZhbHNlLCBSYW5kb21DYXJkLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IHJhaXNlZCBldmVudCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHMgdG8gbGV0IG90aGVycyBrbm93IGEgcGFydGljdWxhciBwbGF5ZXIgaGFzIGNvbXBsZXRlIHRoZWlyIG1vdmVcclxuICAgKiovXHJcbiAgUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg0LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcInJhaXNlZCBmb3IgdHVybiBjb21wbGV0ZVwiKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg0LCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTeW5jQWxsRGF0YSgpIHtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiLCB0aGlzLlBsYXllckdhbWVJbmZvLCB0cnVlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZW1vdmVGcm9tQ2hlY2tBcnJheShfdWlkKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB2YXIgX2luZCA9IC0xO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFR1cm5DaGVja0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChUdXJuQ2hlY2tBcnJheVtpbmRleF0gPT0gX3VpZCkgX2luZCA9IGluZGV4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2luZCAhPSAtMSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZpbmcgZnJvbSB0dXJuIGNoZWNrIGFycmF5XCIpO1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5LnNwbGljZShfaW5kLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIENoZWNrVHVybkNvbXBsZXRlKCkge1xyXG4gICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycyA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2pdLklzQWN0aXZlKSBUb3RhbENvbm5lY3RlZFBsYXllcnMrKztcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIlR1cm4gQ2hlY2s6IFwiICsgVHVybkNoZWNrQXJyYXkubGVuZ3RoKTtcclxuICAgIGNvbnNvbGUubG9nKFwiVG90YWwgQ29ubmVjdGVkIFBsYXllcnM6IFwiICsgVG90YWxDb25uZWN0ZWRQbGF5ZXJzKTtcclxuICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5KTtcclxuXHJcbiAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID49IFRvdGFsQ29ubmVjdGVkUGxheWVycykge1xyXG4gICAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICAvL3RoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIG9uIGFsbCBwbGF5ZXJzIHRvIHZhbGlkYXRlIGlmIG1vdmUgaXMgY29tcGxldGVkIG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50c1xyXG4gICAqKi9cclxuICBSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUoX3VpZCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9yZWFsIHBsYXllcnNcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID09IDApIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7XHJcblxyXG4gICAgICAgIHZhciBBcnJheUxlbmd0aCA9IFR1cm5DaGVja0FycmF5Lmxlbmd0aDtcclxuICAgICAgICB2YXIgSURGb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBcnJheUxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKFR1cm5DaGVja0FycmF5W2luZGV4XSA9PSBfdWlkKSBJREZvdW5kID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghSURGb3VuZCkge1xyXG4gICAgICAgICAgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQ2hlY2tUdXJuQ29tcGxldGUoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIHRoaXMuVHVybkNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyO1xyXG4gICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGRpY2UgYW5pbWF0aW9uIGlzIHBsYXllZCBvbiBhbGwgcGxheWVyc1xyXG4gICAqKi9cclxuICBDaGFuZ2VUdXJuKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdGhpcy5TeW5jQWxsRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLlR1cm5OdW1iZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHRoaXMuVHVybk51bWJlciA9IHRoaXMuVHVybk51bWJlciArIDE7XHJcbiAgICBlbHNlIHRoaXMuVHVybk51bWJlciA9IDA7XHJcblxyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0U29tZVZhbHVlcygpIHtcclxuICAgIC8vVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgIC8vdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuICB9LFxyXG5cclxuICBDaGFuZ2VUdXJuRm9yY2VmdWxseSgpIHtcclxuICAgIGlmIChJc1R3ZWVuaW5nKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChGb3JjZUNoYW5nZVRpbWVPdXQpO1xyXG4gICAgICBGb3JjZUNoYW5nZVRpbWVPdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm5Gb3JjZWZ1bGx5KCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KEZvcmNlQ2hhbmdlVGltZU91dCk7XHJcbiAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVZpc3VhbERhdGEoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgZnJvbSByYWlzZSBvbiBldmVudCAoZnJvbSBmdW5jdGlvbiBcIlN0YXJ0VHVyblwiIGFuZCBcIkNoYW5nZVR1cm5cIiBvZiB0aGlzIHNhbWUgY2xhc3MpIHRvIGhhbmRsZSB0dXJuXHJcbiAgICoqL1xyXG4gIFR1cm5IYW5kbGVyKF90dXJuKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB2YXIgX2lzTWFzdGVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoKTtcclxuICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW190dXJuXS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgIGlmIChfaXNNYXN0ZXIpIHtcclxuICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy90aGlzLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgIHRoaXMuVXBkYXRlVmlzdWFsRGF0YSgpO1xyXG4gICAgY29uc29sZS5sb2coXCJUdXJuOiBcIiArIF90dXJuKTtcclxuICAgIHZhciBfcGxheWVyTWF0Y2hlZCA9IGZhbHNlO1xyXG4gICAgX3NraXBOZXh0VHVybiA9IGZhbHNlO1xyXG4gICAgaWYgKElzVHdlZW5pbmcpIHtcclxuICAgICAgLy9jaGVjayBpZiBhbmltYXRpb24gb2YgdHVybiBiZWluZyBwbGF5ZWQgb24gb3RoZXIgcGxheWVyc1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgIHRoaXMuVHVybkhhbmRsZXIoX3R1cm4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgODAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuVHVybk51bWJlciA9IF90dXJuO1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VyR2FtZU92ZXIpO1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIF9za2lwTmV4dFR1cm4gPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgaWYgKCF1c2VyR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3ModHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICghX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIHlvdXIgdHVybiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gLy90dXJuIGRlY2lzaW9ucyBmb3IgYm90XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgIGlmICghQm90R2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUm9sbERpY2UoKTtcclxuICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSwgdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIHRoaXMuVHVybk51bWJlciwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUdXJuIE9mOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbFBsYXllclVJW3RoaXMuVHVybk51bWJlcl0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUGxheWVySW5mbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy9za2lwIHRoaXMgdHVybiBhcyBza2lwIHR1cm4gaGFzIGJlZW4gY2FsbGVkIGJlZm9yZVxyXG4gICAgICBpZiAoX3BsYXllck1hdGNoZWQgJiYgX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsIDEyMDApO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2tpcE5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9pbmQpIHtcclxuICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICB2YXIgTXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgdmFyIF9jb3VudGVyID0gX2luZDtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAvLyAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uSXNBY3RpdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoX2NvdW50ZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwic3luY2VkIERhdGE6XCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQgPT0gTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0gPSBNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcblxyXG4gICAgICAgICAgaWYgKF9jb3VudGVyIDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN5bmNlZCBEYXRhOlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBhbGwgcGxheWVycyBoYXZlIGRvbmUgdGhlaXIgaW5pdGlhbCBzZXR1cCBhbmQgZmlyc3QgdHVybiBzdGFydHNcclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTdGFydFR1cm4oKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICB0aGlzLlR1cm5OdW1iZXIgPSAwOyAvL3Jlc2V0aW5nIHRoZSB0dXJuIG51bWJlciBvbiBzdGFydCBvZiB0aGUgZ2FtZVxyXG5cclxuICAgIC8vc2VuZGluZyBpbml0aWFsIHR1cm4gbnVtYmVyIG92ZXIgdGhlIG5ldHdvcmsgdG8gc3RhcnQgdHVybiBzaW11bHRhbm91c2x5IG9uIGFsbCBjb25uZWN0ZWQgcGxheWVyJ3MgZGV2aWNlc1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVCYW5rcnVwdERhdGEoX2RhdGEpIHtcclxuICAgIC8vb3RoZXIgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcclxuICAgIHZhciBfaXNCYW5rcnVwdGVkID0gX2RhdGEuRGF0YS5iYW5rcnVwdGVkO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS50dXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhTWFpbjtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhfaXNCYW5rcnVwdGVkKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF90dXJuKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF9wbGF5ZXJEYXRhKTtcclxuXHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW190dXJuXSA9IF9wbGF5ZXJEYXRhO1xyXG5cclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuXHJcbiAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIHRoaXMuVHVybk51bWJlciwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKSB7XHJcbiAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSh0cnVlKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXModHJ1ZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB9LCAxMDAwKTtcclxuXHJcbiAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIHRoaXMuVHVybk51bWJlciwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBGdW5jdGlvbiBmb3IgZ2FtZXBsYXlcclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcGxheWVyIFVJIChuYW1lL2ljb25zL251bWJlciBvZiBwbGF5ZXJzIHRoYXQgdG8gYmUgYWN0aXZlIGV0YylcclxuICAgIEBtZXRob2QgQXNzaWduUGxheWVyR2FtZVVJXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi9cclxuICBBc3NpZ25QbGF5ZXJHYW1lVUkoX2lzQmFua3J1cHRlZCA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgaWYgKCFfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgdmFyIF9yYW5kb21JbmRleCA9IHRoaXMuZ2V0UmFuZG9tKDAsIHRoaXMuQm90R2FtZUluZm8ubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvLnB1c2godGhpcy5Cb3RHYW1lSW5mb1tfcmFuZG9tSW5kZXhdKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSAyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5QbGF5ZXJJbmZvID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlNldEF2YXRhcih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCk7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUdhbWVVSShfdG9nZ2xlSGlnaGxpZ2h0LCBfaW5kZXgpIHtcclxuICAgIGlmIChfdG9nZ2xlSGlnaGxpZ2h0KSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbX2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5QbGF5ZXJJbmZvID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfaW5kZXhdO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfaW5kZXggPT0gaW5kZXgpIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5Ub2dnbGVUZXh0aWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGVuYmFsZSByZXNwZWN0aXZlIHBsYXllcnMgbm9kZXMgaW5zaWRlIGdhbWFwbGF5XHJcbiAgICBAbWV0aG9kIEVuYWJsZVBsYXllck5vZGVzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi9cclxuICBFbmFibGVQbGF5ZXJOb2RlcyhfaXNCYW5rcnVwdGVkID0gZmFsc2UpIHtcclxuICAgIGlmICghX2lzQmFua3J1cHRlZCkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSG9tZUJhc2VkQW1vdW50ID09IDEgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLngsIHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50ID09IDEgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLngsIHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLnkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkhvbWVCYXNlZEFtb3VudCA9PSAxKSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ccmlja0FuZE1vcnRhckFtb3VudCA9PSAxKSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5BdmF0YXJTcHJpdGVzW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEXTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKCkge1xyXG4gICAgbGV0IHRhcmdldFBvcyA9IHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLCAxMjApKTtcclxuICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IHRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuXHJcbiAgICBsZXQgcmF0aW8gPSB0YXJnZXRQb3MueSAvIGNjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMjtcclxuICB9LFxyXG5cclxuICBsYXRlVXBkYXRlKCkge1xyXG4gICAgaWYgKHRoaXMuaXNDYW1lcmFab29taW5nKSB0aGlzLlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKTtcclxuICB9LFxyXG5cclxuICBzeW5jRGljZVJvbGwoX3JvbGwpIHtcclxuICAgIHZhciBfZGljZTEgPSBfcm9sbC5kaWNlMTtcclxuICAgIHZhciBfZGljZTIgPSBfcm9sbC5kaWNlMjtcclxuICAgIHZhciBfcmVzdWx0ID0gX2RpY2UxICsgX2RpY2UyO1xyXG5cclxuICAgIElzVHdlZW5pbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPT0gMCAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICBSb2xsQ291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICBSb2xsQ291bnRlciA9IDE0O1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID09IDEzKSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgKyAyMjtcclxuICAgICAgZWxzZSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgKyAxO1xyXG5cclxuICAgICAgUm9sbENvdW50ZXIgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIgLSAxKTtcclxuICAgIH1cclxuXHJcbiAgICBEaWNlUm9sbCA9IF9yZXN1bHQ7XHJcbiAgICBEaWNlVGVtcCA9IDA7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKERpY2VSb2xsKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHRoaXMuVHVybk51bWJlciA9PSBpbmRleCkge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uZ2V0Q29tcG9uZW50KFwiRGljZUNvbnRyb2xsZXJcIikuQW5pbWF0ZURpY2UoX2RpY2UxLCBfZGljZTIpO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgIC8vIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgIC8vIHRoaXMuVHdlZW5DYW1lcmEoX3Bvcyx0cnVlLDAuNCk7XHJcbiAgfSxcclxuXHJcbiAgRGljZUZ1bnRpb25hbGl0eSgpIHtcclxuICAgIGxldCB0YXJnZXRQb3MgPSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwgMTIwKSk7XHJcbiAgICB2YXIgX3BvcyA9IHRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgIHRoaXMuVHdlZW5DYW1lcmEoX3BvcywgdHJ1ZSwgMC40KTtcclxuICB9LFxyXG5cclxuICBUZW1wQ2hlY2tTcGFjZShfcm9sbGluZykge1xyXG4gICAgdmFyIHRlbXBjb3VudGVyID0gMDtcclxuICAgIHZhciB0ZW1wY291bnRlcjIgPSAwO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICB0ZW1wY291bnRlcjIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGVtcGNvdW50ZXIyIC0gMSA8IDApIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcInN0YXJ0aW5nIGZyb20gb2JsaXZpb25cIik7XHJcbiAgICAgIHRlbXBjb3VudGVyID0gdGVtcGNvdW50ZXIyICsgX3JvbGxpbmcgLSAxO1xyXG4gICAgICB2YXIgZGljZXRvYmUgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIgKyBkaWNldG9iZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZW1wY291bnRlciA9IHRlbXBjb3VudGVyMiArIF9yb2xsaW5nO1xyXG4gICAgICB2YXIgZGljZXRvYmUgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIgKyBkaWNldG9iZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUm9sbERpY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICB2YXIgRGljZTE7XHJcbiAgICAgIHZhciBEaWNlMjtcclxuICAgICAgaWYgKF9pc1Rlc3QgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgRGljZTEgPSBwYXJzZUludChfZGljZWlucHV0MSk7XHJcbiAgICAgICAgRGljZTIgPSBwYXJzZUludChfZGljZWlucHV0Mik7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IHRydWUgJiYgX2lzVGVzdCkge1xyXG4gICAgICAgIERpY2UxID0gMTtcclxuICAgICAgICBEaWNlMiA9IDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuICAgICAgICBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDEgPT0gRGljZTEpIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMiA9PSBEaWNlMikgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICAgICAgUHJldmlvdXNEaWNlUm9sbDEgPSBEaWNlMTtcclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsMiA9IERpY2UyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB2YXIgRGljZTE9MjA7XHJcbiAgICAgIC8vIHZhciBEaWNlMj0xO1xyXG5cclxuICAgICAgRGljZVJvbGwgPSBEaWNlMSArIERpY2UyO1xyXG4gICAgICB2YXIgX25ld1JvbGwgPSB7IGRpY2UxOiBEaWNlMSwgZGljZTI6IERpY2UyIH07XHJcbiAgICAgIC8vRGljZVJvbGw9MjM7XHJcbiAgICAgIC8vdGhpcy5UZW1wQ2hlY2tTcGFjZShEaWNlUm9sbCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZGljZSBudW1iZXI6IFwiICsgRGljZVJvbGwgKyBcIiwgRGljZTE6XCIgKyBEaWNlMSArIFwiLCBEaWNlMjpcIiArIERpY2UyKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMywgX25ld1JvbGwpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJvbGxPbmVEaWNlKCkge1xyXG4gICAgdmFyIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGw1ID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIFByZXZpb3VzRGljZVJvbGw1ID0gRGljZTE7XHJcblxyXG4gICAgcmV0dXJuIERpY2UxO1xyXG4gIH0sXHJcblxyXG4gIFJvbGxUd29EaWNlcygpIHtcclxuICAgIHZhciBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgdmFyIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGwzID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIGlmIChQcmV2aW91c0RpY2VSb2xsNCA9PSBEaWNlMikgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMyA9IERpY2UxO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDQgPSBEaWNlMjtcclxuXHJcbiAgICByZXR1cm4gRGljZTEgKyBEaWNlMjtcclxuICB9LFxyXG5cclxuICBQb3B1bGF0ZURlY2tzQXJyYXkoX2lzQmlnQnVzaW5lc3MgPSBmYWxzZSwgX2lzTG9zc2VzID0gZmFsc2UsIF9pc01hcmtldGluZyA9IGZhbHNlLCBfaXNXaWxkQ2FyZCA9IGZhbHNlLCBfZGF0YSA9IG51bGwpIHtcclxuICAgIC8vIEJpZ0J1c2luZXNzQXJyYXkgPSBbXTtcclxuICAgIC8vIExvc3Nlc0FycmF5ID0gW107XHJcbiAgICAvLyBNYXJrZXRpbmdBcnJheSA9IFtdO1xyXG4gICAgLy8gV2lsZENhcmRBcnJheSA9IFtdO1xyXG4gICAgLy8gQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgLy8gTG9zc2VzQXJyYXlDb3VudGVyID0gMDtcclxuICAgIC8vIE1hcmtldGluZ0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAvLyBXaWxkQ2FyZEFycmF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgaWYgKF9pc0JpZ0J1c2luZXNzKSB7XHJcbiAgICAgIGlmIChfZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheSA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxMF07XHJcblxyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXkuc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coQmlnQnVzaW5lc3NBcnJheSk7XHJcbiAgICAgICAgQmlnQnVzaW5lc3NBcnJheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogQmlnQnVzaW5lc3NBcnJheSwgTG9zc0FycmF5OiBudWxsLCBNYXJrZXRBcnJheTogbnVsbCwgV2lsZEFycnlhOiBudWxsIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxOSwgX3RlbXBEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNMb3NzZXMpIHtcclxuICAgICAgaWYgKF9kYXRhID09IG51bGwpIHtcclxuICAgICAgICBMb3NzZXNBcnJheSA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTRdO1xyXG5cclxuICAgICAgICBMb3NzZXNBcnJheS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhMb3NzZXNBcnJheSk7XHJcbiAgICAgICAgTG9zc2VzQXJyYXlDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IG51bGwsIExvc3NBcnJheTogTG9zc2VzQXJyYXksIE1hcmtldEFycmF5OiBudWxsLCBXaWxkQXJyeWE6IG51bGwgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE5LCBfdGVtcERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9pc01hcmtldGluZykge1xyXG4gICAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5ID0gWzAsIDEsIDIsIDMsIDQsIDUsIDcsIDgsIDksIDEzXTtcclxuXHJcbiAgICAgICAgTWFya2V0aW5nQXJyYXkuc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coTWFya2V0aW5nQXJyYXkpO1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBudWxsLCBMb3NzQXJyYXk6IG51bGwsIE1hcmtldEFycmF5OiBNYXJrZXRpbmdBcnJheSwgV2lsZEFycnlhOiBudWxsIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxOSwgX3RlbXBEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfaXNXaWxkQ2FyZCkge1xyXG4gICAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgIFdpbGRDYXJkQXJyYXkgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xyXG5cclxuICAgICAgICBXaWxkQ2FyZEFycmF5LnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFdpbGRDYXJkQXJyYXkpO1xyXG4gICAgICAgIFdpbGRDYXJkQXJyYXlDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IG51bGwsIExvc3NBcnJheTogbnVsbCwgTWFya2V0QXJyYXk6IG51bGwsIFdpbGRBcnJ5YTogV2lsZENhcmRBcnJheSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTksIF90ZW1wRGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICBpZiAoX2RhdGEuQmlnQXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXkgPSBfZGF0YS5CaWdBcnJheTtcclxuICAgICAgICBjb25zb2xlLmxvZyhCaWdCdXNpbmVzc0FycmF5KTtcclxuICAgICAgICBCaWdCdXNpbmVzc0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfZGF0YS5Mb3NzQXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIExvc3Nlc0FycmF5ID0gX2RhdGEuTG9zc0FycmF5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKExvc3Nlc0FycmF5KTtcclxuICAgICAgICBMb3NzZXNBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2RhdGEuTWFya2V0QXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5ID0gX2RhdGEuTWFya2V0QXJyYXk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTWFya2V0aW5nQXJyYXkpO1xyXG4gICAgICAgIE1hcmtldGluZ0FycmF5Q291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfZGF0YS5XaWxkQXJyeWEgIT0gbnVsbCkge1xyXG4gICAgICAgIFdpbGRDYXJkQXJyYXkgPSBfZGF0YS5XaWxkQXJyeWE7XHJcbiAgICAgICAgY29uc29sZS5sb2coV2lsZENhcmRBcnJheSk7XHJcbiAgICAgICAgV2lsZENhcmRBcnJheUNvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2V0QmlnQnVzaW5lc3NJbmRleChfaW5kZXgpIHtcclxuICAgIHZhciBfdmFsID0gLTE7XHJcbiAgICBpZiAoQmlnQnVzaW5lc3NBcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChCaWdCdXNpbmVzc0FycmF5Q291bnRlciA8IEJpZ0J1c2luZXNzQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgX3ZhbCA9IEJpZ0J1c2luZXNzQXJyYXlbQmlnQnVzaW5lc3NBcnJheUNvdW50ZXJdO1xyXG4gICAgICAgIEJpZ0J1c2luZXNzQXJyYXlDb3VudGVyKys7XHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgQmlnQXJyYXk6IHRydWUsIExvc3NBcnJheTogZmFsc2UsIE1hcmtldEFycmF5OiBmYWxzZSwgV2lsZEFycnlhOiBmYWxzZSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMjAsIF90ZW1wRGF0YSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkodHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgbnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF92YWw7XHJcbiAgfSxcclxuXHJcbiAgR2V0TG9zc2VzSW5kZXgoX2luZGV4KSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKExvc3Nlc0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKExvc3Nlc0FycmF5Q291bnRlciA8IExvc3Nlc0FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBMb3NzZXNBcnJheVtMb3NzZXNBcnJheUNvdW50ZXJdO1xyXG4gICAgICAgIExvc3Nlc0FycmF5Q291bnRlcisrO1xyXG4gICAgICAgIHZhciBfdGVtcERhdGEgPSB7IEJpZ0FycmF5OiBmYWxzZSwgTG9zc0FycmF5OiB0cnVlLCBNYXJrZXRBcnJheTogZmFsc2UsIFdpbGRBcnJ5YTogZmFsc2UgfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIwLCBfdGVtcERhdGEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVEZWNrc0FycmF5KGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UsIG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfdmFsO1xyXG4gIH0sXHJcblxyXG4gIEdldE1hcmtldGluZ0luZGV4KF9pbmRleCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChNYXJrZXRpbmdBcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChNYXJrZXRpbmdBcnJheUNvdW50ZXIgPCBNYXJrZXRpbmdBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gTWFya2V0aW5nQXJyYXlbTWFya2V0aW5nQXJyYXlDb3VudGVyXTtcclxuICAgICAgICBNYXJrZXRpbmdBcnJheUNvdW50ZXIrKztcclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogZmFsc2UsIExvc3NBcnJheTogZmFsc2UsIE1hcmtldEFycmF5OiB0cnVlLCBXaWxkQXJyeWE6IGZhbHNlIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyMCwgX3RlbXBEYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIHRydWUsIGZhbHNlLCBudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkoZmFsc2UsIGZhbHNlLCB0cnVlLCBmYWxzZSwgbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3ZhbDtcclxuICB9LFxyXG5cclxuICBHZXRXaWxkQ2FyZEluZGV4KF9pbmRleCkge1xyXG4gICAgdmFyIF92YWwgPSAtMTtcclxuICAgIGlmIChXaWxkQ2FyZEFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKFdpbGRDYXJkQXJyYXlDb3VudGVyIDwgV2lsZENhcmRBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBfdmFsID0gV2lsZENhcmRBcnJheVtXaWxkQ2FyZEFycmF5Q291bnRlcl07XHJcbiAgICAgICAgV2lsZENhcmRBcnJheUNvdW50ZXIrKztcclxuICAgICAgICB2YXIgX3RlbXBEYXRhID0geyBCaWdBcnJheTogZmFsc2UsIExvc3NBcnJheTogZmFsc2UsIE1hcmtldEFycmF5OiBmYWxzZSwgV2lsZEFycnlhOiB0cnVlIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyMCwgX3RlbXBEYXRhKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlBvcHVsYXRlRGVja3NBcnJheShmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCBudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZURlY2tzQXJyYXkoZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3ZhbDtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDb3VudGVycyhfZGF0YSA9IG51bGwpIHtcclxuICAgIGlmIChfZGF0YS5CaWdBcnJheSkge1xyXG4gICAgICBCaWdCdXNpbmVzc0FycmF5Q291bnRlcisrO1xyXG4gICAgfVxyXG4gICAgaWYgKF9kYXRhLkxvc3NBcnJheSkge1xyXG4gICAgICBMb3NzZXNBcnJheUNvdW50ZXIrKztcclxuICAgIH1cclxuICAgIGlmIChfZGF0YS5NYXJrZXRBcnJheSkge1xyXG4gICAgICBNYXJrZXRpbmdBcnJheUNvdW50ZXJ2Kys7XHJcbiAgICB9XHJcbiAgICBpZiAoX2RhdGEuV2lsZEFycnlhKSB7XHJcbiAgICAgIFdpbGRDYXJkQXJyYXlDb3VudGVyKys7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2VsZWN0UmVsYXRlZENhcmQoX2lzQmlnQnVzaW5lc3MgPSBmYWxzZSwgX2lzTG9zc2VzID0gZmFsc2UsIF9pc01hcmtldGluZyA9IGZhbHNlLCBfaXNXaWxkQ2FyZCA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2lzQmlnQnVzaW5lc3MpIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5HZXRCaWdCdXNpbmVzc0luZGV4KCk7XHJcbiAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLkdldEJpZ0J1c2luZXNzSW5kZXgoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0QmlnQnVzaW5lc3NJbmRleCgpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgaW5kZXggPSB0aGlzLkdldEJpZ0J1c2luZXNzSW5kZXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9pc0xvc3Nlcykge1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldExvc3Nlc0luZGV4KCk7XHJcbiAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLkdldExvc3Nlc0luZGV4KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldExvc3Nlc0luZGV4KCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0TG9zc2VzSW5kZXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9pc01hcmtldGluZykge1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldE1hcmtldGluZ0luZGV4KCk7XHJcbiAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLkdldE1hcmtldGluZ0luZGV4KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldE1hcmtldGluZ0luZGV4KCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICBpbmRleCA9IHRoaXMuR2V0TWFya2V0aW5nSW5kZXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9pc1dpbGRDYXJkKSB7XHJcbiAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuR2V0V2lsZENhcmRJbmRleCgpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRXaWxkQ2FyZEluZGV4KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLkdldFdpbGRDYXJkSW5kZXgoKTtcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgIGluZGV4ID0gdGhpcy5HZXRXaWxkQ2FyZEluZGV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNhbGxVcG9uQ2FyZCgpIHtcclxuICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICBpZiAoUm9sbENvdW50ZXIgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIF9zcGFjZUlEID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyO1xyXG4gICAgICAgIGlmIChfc3BhY2VJRCAhPSA2ICYmIF9zcGFjZUlEICE9IDcpIHtcclxuICAgICAgICAgIC8vNiBtZWFucyBwYXlkYXkgYW5kIDcgbWVhbnMgZG91YmxlIHBheWRheSwgOSBtZWFucyBzZWxsIHNwYWNlXHJcbiAgICAgICAgICB2YXIgUmFuZG9tQ2FyZCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDE1KTtcclxuXHJcbiAgICAgICAgICBpZiAoX3NwYWNlSUQgPT0gMikge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBiaWcgYnVzaW5lc3MgY2FyZHNcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHRoaXMuU2VsZWN0UmVsYXRlZENhcmQodHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF9zcGFjZUlEID09IDUpIHtcclxuICAgICAgICAgICAgLy9sYW5kZWQgb24gc29tZSBsb3NzZXMgY2FyZHNcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHRoaXMuU2VsZWN0UmVsYXRlZENhcmQoZmFsc2UsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vUmFuZG9tQ2FyZCA9IDE0O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSAzKSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB0aGlzLlNlbGVjdFJlbGF0ZWRDYXJkKGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSA1O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgd2lsZCBjYXJkc1xyXG4gICAgICAgICAgICBSYW5kb21DYXJkID0gdGhpcy5TZWxlY3RSZWxhdGVkQ2FyZChmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgLy8gUmFuZG9tQ2FyZCA9IDk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihfc3BhY2VJRCk7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJcclxuICAgICAgICAgICAgaWYgKF9zcGFjZUlEID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgLy8gaWYgcGxheWVyIGxhbmRlZCBvbiBmaW5pc2ggc3BhY2VcclxuICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIFNlbmRpbmdEYXRhID0geyByYW5kb21DYXJkOiBSYW5kb21DYXJkLCBjb3VudGVyOiBSb2xsQ291bnRlciB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgICAgICBpZiAoX3NwYWNlSUQgPT0gMTIpIHtcclxuICAgICAgICAgICAgICAvLyBpZiBwbGF5ZXIgbGFuZGVkIG9uIGZpbmlzaCBzcGFjZVxyXG4gICAgICAgICAgICAgIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyA1O1xyXG4gICAgICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YSA9IHsgcmFuZG9tQ2FyZDogUmFuZG9tQ2FyZCwgY291bnRlcjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNCb3QgJiYgQm90R2FtZU92ZXIpIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNCb3QgJiYgdXNlckdhbWVPdmVyKSB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImNvbXBsZXRlIHR1cm4gaXMgY2FsbGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQodHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY29tcGxldGVDYXJkVHVybigpIHtcclxuICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgIGNvbnNvbGUubG9nKFwibGFuZGVkIG9uIHBheSBkYXkgb3IgZG91YmxlIHBheSBkYXkgYW5kIHdvcmsgaXMgZG9uZSBzbyBjaGFuZ2luZyB0dXJuXCIpO1xyXG4gICAgdGhpcy5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgfSxcclxuXHJcbiAgQ2FsbEdhbWVDb21wbGV0ZShfaXNCb3QgPSBmYWxzZSwgX2ZvcmNlR2FtZU92ZXIgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAvLyBpZiAoX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgLy8gICAgIHRoaXMuVHVybk51bWJlciA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG4gICAgICAvLyB9XHJcblxyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU2NvcmUgPSAwO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJwbGF5ZXIgaXMgbm90IGFjdGl2ZSByZXR1cm5pbmdcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjYWxjdWxhdGluZy4uLi5cIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImFnbWUgaXMgbm90IGZpbmlzaGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLmlzR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICB2YXIgX2Nhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICAgIHZhciBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgIHZhciBCTUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgICAgdmFyIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIGxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgICAgbG9hbkFtb3VudCArPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgX2dvbGQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50O1xyXG4gICAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgICB2YXIgX2RpY2VSYW5kb20gPSB0aGlzLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgdmFyIE9uY2VPclNoYXJlID0gX2RpY2VSYW5kb20gKiAxMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgICB2YXIgU3RvY2tDYXNoID0gT25jZU9yU2hhcmUgKiBfc3RvY2tzO1xyXG5cclxuICAgICAgICAgIHZhciBCTUNhc2ggPSAoQk1BbW91bnQgKyBCTUxvY2F0aW9ucykgKiAxNTAwMDA7XHJcblxyXG4gICAgICAgICAgdmFyIEhNQ2FzaCA9IDA7XHJcbiAgICAgICAgICBpZiAoSE1BbW91bnQgPT0gMSkgSE1DYXNoID0gNjAwMDA7XHJcbiAgICAgICAgICBlbHNlIGlmIChITUFtb3VudCA9PSAyKSBITUNhc2ggPSAyNTAwMCArIDYwMDAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMykgSE1DYXNoID0gMjUwMDAgKyAyNTAwMCArIDYwMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBUb3RhbEFzc2V0cyA9IF9jYXNoICsgQk1DYXNoICsgSE1DYXNoICsgR29sZENhc2ggKyBTdG9ja0Nhc2ggLSBsb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gVG90YWxBc3NldHM7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxIQkNhc2ggPSBITUNhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxCTUNhc2ggPSBCTUNhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxHb2xkQ2FzaCA9IEdvbGRDYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU3RvY2tzQ2FzaCA9IFN0b2NrQ2FzaDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvYW5CYWxhbmNlID0gbG9hbkFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XSk7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJEYXRhIHB1c2hlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IF9wbGF5ZXJJbmRleCA9IDA7IF9wbGF5ZXJJbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBfcGxheWVySW5kZXgrKykge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfY2FzaCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHZhciBITUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgdmFyIEJNQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUxvY2F0aW9ucyA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuXHJcbiAgICAgICAgdmFyIGxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIGxvYW5BbW91bnQgKz0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIF9nb2xkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudDtcclxuICAgICAgICB2YXIgX3N0b2NrcyA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50O1xyXG5cclxuICAgICAgICB2YXIgX2RpY2VSYW5kb20gPSB0aGlzLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIHZhciBPbmNlT3JTaGFyZSA9IF9kaWNlUmFuZG9tICogMTAwMDtcclxuXHJcbiAgICAgICAgdmFyIEdvbGRDYXNoID0gT25jZU9yU2hhcmUgKiBfZ29sZDtcclxuICAgICAgICB2YXIgU3RvY2tDYXNoID0gT25jZU9yU2hhcmUgKiBfc3RvY2tzO1xyXG5cclxuICAgICAgICB2YXIgQk1DYXNoID0gKEJNQW1vdW50ICsgQk1Mb2NhdGlvbnMpICogMTUwMDAwO1xyXG5cclxuICAgICAgICB2YXIgSE1DYXNoID0gMDtcclxuICAgICAgICBpZiAoSE1BbW91bnQgPT0gMSkgSE1DYXNoID0gNjAwMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMikgSE1DYXNoID0gMjUwMDAgKyA2MDAwMDtcclxuICAgICAgICBlbHNlIGlmIChITUFtb3VudCA9PSAzKSBITUNhc2ggPSAyNTAwMCArIDI1MDAwICsgNjAwMDA7XHJcblxyXG4gICAgICAgIHZhciBUb3RhbEFzc2V0cyA9IF9jYXNoICsgQk1DYXNoICsgSE1DYXNoICsgR29sZENhc2ggKyBTdG9ja0Nhc2ggLSBsb2FuQW1vdW50O1xyXG5cclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTY29yZSA9IFRvdGFsQXNzZXRzO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEhCQ2FzaCA9IEhNQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxCTUNhc2ggPSBCTUNhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsR29sZENhc2ggPSBHb2xkQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTdG9ja3NDYXNoID0gU3RvY2tDYXNoO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvYW5CYWxhbmNlID0gbG9hbkFtb3VudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoX2RhdGEpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNiwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE2LCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgU3luY0dhbWVPdmVyKF9VSUQpIHtcclxuICAgIHZhciBpbmZvVGV4dCA9IFwiXCI7XHJcbiAgICB2YXIgc3RhdHVzVGV4dCA9IFwiXCI7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgaWYgKCFHYW1lQ29tcGxldGVkKSB7XHJcbiAgICAgICAgR2FtZUNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0RGF0YSgpO1xyXG4gICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgdmFyIE15RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdmFyIF9pbmRleCA9IC0xO1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQgPT0gX1VJRCkge1xyXG4gICAgICAgICAgICAgIF9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc3RhdHVzVGV4dCA9IFwiR2FtZSB3b24gYnkgXCIgKyBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAgICAgLy95b3Ugd29uXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkNvbmdyYXRzISB5b3UgaGF2ZSB3b24gdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgX2N1cnJlbnRDYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgICAgICAgICB2YXIgX3RvdGFsID0gX2N1cnJlbnRDYXNoICsgcGFyc2VJbnQoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gX3RvdGFsLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3dvbiA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uKTtcclxuICAgICAgICAgICAgX3dvbiA9IF93b24gKyAxO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbiA9IF93b24udG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKC0xLCBfd29uLCAtMSk7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3lvdSBsb3NlXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIlVuZm9ydHVuYXRlbHkhIHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy93aXRoIGJvdFxyXG4gICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgIHZhciBNeURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgY29uc29sZS5sb2coTXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMF0uR2FtZU92ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKE15RGF0YS5QbGF5ZXJVSUQgPT0gX1VJRCkge1xyXG4gICAgICAgIC8veW91IHdvblxyXG4gICAgICAgIHN0YXR1c1RleHQgPSBcIkNvbmdyYXRzISB5b3UgaGF2ZSB3b24gdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgaW5mb1RleHQgPVxyXG4gICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLkNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxIQkNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTdG9ja3NDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJPdGhlciBQbGF5ZXIgRWFybmVkIENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1sxXS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgIHZhciBfY3VycmVudENhc2ggPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCk7XHJcbiAgICAgICAgdmFyIF90b3RhbCA9IF9jdXJyZW50Q2FzaCArIHBhcnNlSW50KE15RGF0YS5Ub3RhbFNjb3JlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lQ2FzaCA9IF90b3RhbC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICB2YXIgX3dvbiA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uKTtcclxuICAgICAgICBfd29uID0gX3dvbiArIDE7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZXNXb24gPSBfd29uLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuVXBkYXRlVXNlckRhdGEoLTEsIF93b24sIC0xKTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8veW91IGxvc2VcclxuXHJcbiAgICAgICAgc3RhdHVzVGV4dCA9IFwiVW5mb3J0dW5hdGVseSEgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIjtcclxuICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiQnJpY2sgQW5kIE1vcnRhciBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEJNQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIkxvYW4gQmFsYW5jZSA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxMb2FuQmFsYW5jZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICBcIk90aGVyIFBsYXllciBFYXJuZWQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzFdLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgXCJcXG5cIjtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0dhbWVDb21wbGV0ZURhdGEoX2RhdGEpIHtcclxuICAgIHZhciBfaXNCb3QgPSBfZGF0YS5Cb3Q7XHJcbiAgICBpZiAoX2lzQm90KSB7XHJcbiAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSh0cnVlLCBmYWxzZSk7XHJcblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiR2FtZSBvdmVyLCBjYWxjdWxhdGluZyB0b3RhbCBjYXNoLi4uXCIsIDE1MDAsIGZhbHNlKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG5cclxuICAgICAgICB2YXIgbWF4ID0gLTE7XHJcbiAgICAgICAgdmFyIFNlbGVjdGVkSW5kID0gMDtcclxuICAgICAgICB2YXIgU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgaWYgKF92YWx1ZSA+IG1heCkge1xyXG4gICAgICAgICAgICBTZWxlY3RlZEluZCA9IGluZGV4O1xyXG4gICAgICAgICAgICBtYXggPSBfdmFsdWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coX3ZhbHVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUudHJhY2UoXCJnYW1lIHdvbiBieSBwbGF5ZXIgaWQ6IFwiICsgU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLlBsYXllclVJRCk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJHYW1lIG92ZXIsIGNhbGN1bGF0aW5nIHRvdGFsIGNhc2guLi5cIiwgMTUwMCwgZmFsc2UpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpKTtcclxuICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dE9ubHkoKTtcclxuXHJcbiAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgICAgICB2YXIgbWF4ID0gLTE7XHJcbiAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQgPSAwO1xyXG4gICAgICAgICAgdmFyIFNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFNlc3Npb25EYXRhKTtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChTZXNzaW9uRGF0YVtpbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChfdmFsdWUgPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIFNlbGVjdGVkSW5kID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBtYXggPSBfdmFsdWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKF92YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLnRyYWNlKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIiArIFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIH0sIDE1MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgQm90OiBfaXNCb3QgfTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFRvU3luY0dhbWVDb21wbGV0ZURhdGEoX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIEdhbWVPdmVyKF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBpZiAoX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgLy8gICBpZiAoTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLklzQWN0aXZlID09IGZhbHNlIHx8IHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGNvbXBsZXRlZDogXCIgKyBwbGF5ZXJjb21wbGV0ZWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGdhbWVpbmZvIGxlbmd0aDogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCk7XHJcbiAgICAgICAgaWYgKHBsYXllcmNvbXBsZXRlZCA+PSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCB8fCBfZm9yY2VHYW1lT3Zlcikge1xyXG4gICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtXHJcbiAgICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICAgIGlmIChfZm9yY2VHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpIEJvdEdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgZWxzZSB1c2VyR2FtZU92ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJ1c2VyZ2FtZW92ZXI6IFwiICsgdXNlckdhbWVPdmVyKTtcclxuICAgICAgY29uc29sZS5sb2coXCJib3RnYW1lb3ZlcjogXCIgKyBCb3RHYW1lT3Zlcik7XHJcbiAgICAgIC8vIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSh0cnVlKTtcclxuICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZCA9IDA7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoTWFpblNlc3Npb25EYXRhW2luZGV4XS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwbGF5ZXJjb21wbGV0ZWQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpIHtcclxuICAgICAgICAvL2dhbWVjb21wbGV0ZWQgb24gYWxsIHN5c3RlbXNcclxuICAgICAgICBCb3RHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgdXNlckdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBTdGFydERpY2VSb2xsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoUm9sbENvdW50ZXIgPj0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkdhbWVvdmVyXCIpO1xyXG4gICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuR2FtZU92ZXIoZmFsc2UpO1xyXG4gICAgICB9LCAxNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgIERpY2VUZW1wID0gRGljZVRlbXAgKyAxO1xyXG4gICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLlR3ZWVuUGxheWVyKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldFJhbmRvbTogZnVuY3Rpb24gKG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gIH0sXHJcblxyXG4gIFR3ZWVuQ2FtZXJhOiBmdW5jdGlvbiAoX3BvcywgaXNab29tLCB0aW1lKSB7XHJcbiAgICBjYy50d2Vlbih0aGlzLkNhbWVyYU5vZGUpXHJcbiAgICAgIC50byh0aW1lLCB7IHBvc2l0aW9uOiBjYy52MihfcG9zLngsIF9wb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc1pvb20pIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgZWxzZSB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgfSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgWm9vbUNhbWVyYUluKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkNhbWVyYS56b29tUmF0aW8gPCAyKSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gdGhpcy5DYW1lcmEuem9vbVJhdGlvICsgMC4wMztcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IDI7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tQYXlEYXlDb25kaXRpb25zKF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICBpZiAoUm9sbENvdW50ZXIgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNikge1xyXG4gICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlciA9IFBhc3NlZFBheURheUNvdW50ZXIgKyAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDcpIHtcclxuICAgICAgICBEb3VibGVQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgIERvdWJsZVBheURheUNvdW50ZXIrKztcclxuICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgICBfbmV4dFR1cm5oYWxmUGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuSGFsZlBheURheTtcclxuXHJcbiAgICBpZiAoUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkgJiYgIV9uZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSwgX2lzQm90KTtcclxuICAgIH0gZWxzZSBpZiAoRG91YmxlUGF5RGF5IHx8IChQYXNzZWRQYXlEYXkgJiYgX25leHRUdXJuRG91YmxlUGF5KSkge1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAvL3RoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbih0cnVlLCBfaXNCb3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBab29tQ2FtZXJhT3V0T25seSgpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5DYW1lcmEuem9vbVJhdGlvID49IDEpIHtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IHRoaXMuQ2FtZXJhLnpvb21SYXRpbyAtIDAuMDM7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMTtcclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIFpvb21DYW1lcmFPdXQoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA+PSAxKSB7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSB0aGlzLkNhbWVyYS56b29tUmF0aW8gLSAwLjAzO1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMTtcclxuICAgICAgICAvLyBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbigwKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgJiYgIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCAmJiAhdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnModGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgIC8vcmVhbCBwbGF5ZXJcclxuICAgICAgICAgIGlmIChQbGF5ZXJMZWZ0KSB7XHJcbiAgICAgICAgICAgIC8vIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgUGxheWVyTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucygpO1xyXG4gICAgICAgICAgZWxzZSB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgMTApO1xyXG4gIH0sXHJcblxyXG4gIFR3ZWVuUGxheWVyOiBmdW5jdGlvbiAoTm9kZSwgVG9Qb3MpIHtcclxuICAgIHZhciBzcGVlZCA9IDAuNDtcclxuICAgIC8vaWYgKF9pc1Rlc3QpIHNwZWVkID0gMC4wNDtcclxuXHJcbiAgICBjYy50d2VlbihOb2RlKSAvLzAuNFxyXG4gICAgICAudG8oc3BlZWQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpIH0sIHsgZWFzaW5nOiBcInF1YWRJbk91dFwiIH0pXHJcbiAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZiAoRGljZVRlbXAgPCBEaWNlUm9sbCkge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coRGljZVRlbXAgKyBcIiBcIiArIFJvbGxDb3VudGVyKTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCkge1xyXG4gICAgICAgICAgICAgIGlmICghQm90R2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYgfHxcclxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDdcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYm90IGdhbWUgaXMgb3ZlclwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKCF1c2VyR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYgfHxcclxuICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDdcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8vIGNvbnNvbGUuZXJyb3IoUGFzc2VkUGF5RGF5Q291bnRlcik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlciBnYW1lIGlzIG92ZXIgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhQYXNzZWRQYXlEYXkpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3KSB7XHJcbiAgICAgICAgICAgICAgICAgIERvdWJsZVBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIERvdWJsZVBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgZmluaXNoZWQgZm9yOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoUm9sbENvdW50ZXIgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmIChSb2xsQ291bnRlciA9PSAxMykgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDIyO1xyXG4gICAgICAgICAgICBlbHNlIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyAxO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDE7XHJcbiAgICAgICAgICAgIERpY2VUZW1wID0gRGljZVJvbGw7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy9EaWNlVGVtcD1EaWNlVGVtcCsxO1xyXG4gICAgICAgICAgLy8gIGNvbnNvbGUubG9nKERpY2VUZW1wICsgXCIgXCIgKyBSb2xsQ291bnRlcik7XHJcblxyXG4gICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAvL3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIF9uZXdwb3MgPSBjYy5WZWMyKDAsIDApO1xyXG4gICAgICAgICAgdGhpcy5Ud2VlbkNhbWVyYShfbmV3cG9zLCBmYWxzZSwgMC42KTsgLy96b29tb3V0XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICAvL3J1bGVzIGltcGxtZW50YXRpb24gZHVyaW5nIHR1cm4gKHR1cm4gZGVjaXNpb25zKVxyXG5cclxuICBUb2dnbGVQYXlEYXkoX3N0MSwgX1N0Mikge1xyXG4gICAgUGFzc2VkUGF5RGF5ID0gX3N0MTtcclxuICAgIERvdWJsZVBheURheSA9IF9TdDI7XHJcblxyXG4gICAgaWYgKCFfc3QxKSB7XHJcbiAgICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghX1N0Mikge1xyXG4gICAgICBEb3VibGVQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBJbmNyZWFzZURvdWJsZVBheURheSgpIHtcclxuICAgIERvdWJsZVBheURheUNvdW50ZXIrKztcclxuICB9LFxyXG5cclxuICBFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oYW1vdW50LCBfaW5kZXgsIF9sb2NhdGlvbk5hbWUsIF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPCAzKSB7XHJcbiAgICAgIGlmICghX2lzQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoIC0gYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ICsgMTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsIDEwMDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIiArIGFtb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfR2l2ZW5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgX0dpdmVuQ2FzaCA9IF9HaXZlbkNhc2ggLSBhbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgKyAxO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUucHVzaChfbG9jYXRpb25OYW1lKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZXhwYW5kZWQgeW91ciBidXNpbmVzcy5cIiwgMTAwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgICB9LCAxMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoIHRvIGV4cGFuZCB0aGlzIGJ1c2luZXNzLCBjYXNoIG5lZWRlZCAkIFwiICsgYW1vdW50ICsgXCIsIENhc2ggR2l2ZW4gJFwiICsgX0dpdmVuQ2FzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgbG9jYXRpb25zXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSwgX0dpdmVuQ2FzaCA9IDAsIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZSkge1xyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHBhcnNlSW50KHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgLy90aGlzIG1lYW5zIHRoZXJlIGlzIGJyaWNrIGFuZCBtb3J0YXIgaW4gbGlzdFxyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldEJ1c2luZXNzSW5kZXgoaSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0Q2FyZEZ1bmN0aW9uYWxpdHkoX2lzQ2FyZEZ1bmN0aW9uYWxpdHkpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldEdpdmVuQ2FzaChfR2l2ZW5DYXNoKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2goX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuUmVzZXRFZGl0Qm94KCk7XHJcbiAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKEJ1c2luZXNzTG9jYXRpb25Ob2Rlcyk7XHJcbiAgICByZXR1cm4gQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDtcclxuICB9LFxyXG5cclxuICBEZXN0cm95R2VuZXJhdGVkTm9kZXMoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uKF9uYW1lLCBfU2hhcmVBbW91bnQsIF9pc0FkZGluZykge1xyXG4gICAgaWYgKF9pc0FkZGluZykge1xyXG4gICAgICB2YXIgX3N0b2NrID0gbmV3IFN0b2NrSW5mbygpO1xyXG4gICAgICBfc3RvY2suQnVzaW5lc3NOYW1lID0gX25hbWU7XHJcbiAgICAgIF9zdG9jay5TaGFyZUFtb3VudCA9IF9TaGFyZUFtb3VudDtcclxuXHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mU3RvY2tzLnB1c2goX3N0b2NrKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihfaXNEb3VibGVQYXlEYXkgPSBmYWxzZSwgX2lzQm90ID0gZmFsc2UsIF9mb3JTZWxlY3RlZEJ1c2luZXNzID0gZmFsc2UsIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSAwLCBIQkFtb3VudCA9IDAsIEJNQW1vdW50ID0gMCwgQk1Mb2NhdGlvbnMgPSAwKSB7XHJcbiAgICBpZiAoX2ZvclNlbGVjdGVkQnVzaW5lc3MpIHtcclxuICAgICAgdmFyIF90aXRsZSA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Bc3NpZ25EYXRhX1BheURheShfdGl0bGUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIF9pc0JvdCwgX2ZvclNlbGVjdGVkQnVzaW5lc3MsIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgsIEhCQW1vdW50LCBCTUFtb3VudCwgQk1Mb2NhdGlvbnMsIDEsIDAsIF9uZXh0VHVybmhhbGZQYXkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKERvdWJsZVBheURheSAmJiBQYXNzZWRQYXlEYXkgJiYgX25leHRUdXJuRG91YmxlUGF5KSB7XHJcbiAgICAgICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIF9za2lwTmV4dFBheWRheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheTtcclxuICAgICAgX3NraXBITU5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEhNTmV4dFBheWRheTtcclxuICAgICAgX3NraXBCTU5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheTtcclxuXHJcbiAgICAgIGlmIChfc2tpcE5leHRQYXlkYXkpIHtcclxuICAgICAgICAvL2lmIHByZXZpb3VzbHkgc2tpcCBwYXlkYXkgd2FzIHN0b3JlZCBieSBhbnkgY2FyZFxyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmICghX2lzQm90KSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgUGF5RGF5LlwiLCAxNjAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgfSwgMTY1MCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2tpcHBpbmcgUGF5RGF5LlwiKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIF90aXRsZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmIChfaXNEb3VibGVQYXlEYXkpIF90aXRsZSA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgICAgZWxzZSBfdGl0bGUgPSBcIlBheURheVwiO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBfaXNEb3VibGVQYXlEYXksIF9za2lwSE1OZXh0UGF5ZGF5LCBfc2tpcEJNTmV4dFBheWRheSwgX2lzQm90LCBmYWxzZSwgMCwgMCwgMCwgMCwgUGFzc2VkUGF5RGF5Q291bnRlciwgRG91YmxlUGF5RGF5Q291bnRlciwgX25leHRUdXJuaGFsZlBheSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBCYW5rcnVwdF9UdXJuRGVjaXNpb24oKSB7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCYW5rcnVwdCA9IHRydWU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQmFua3J1cHRBbW91bnQgKz0gMTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSwgZmFsc2UsIHRoaXMuU2VsZWN0ZWRNb2RlLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCYW5rcnVwdCwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50KTtcclxuICB9LFxyXG5cclxuICBTZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnQsIF91SUQpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgRGF0YTogeyBDYXNoOiBfYW1vdW50LCBJRDogX3VJRCB9IH07XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEzLCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfZGF0YSkge1xyXG4gICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gX2RhdGEuRGF0YS5DYXNoO1xyXG4gICAgICB2YXIgX2lEID0gX2RhdGEuRGF0YS5JRDtcclxuXHJcbiAgICAgIHZhciBfbXlJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlBsYXllclVJRCA9PSBfaUQpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uaXNHYW1lRmluaXNoZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uVG90YWxTY29yZSArPSBfYW1vdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSByZWNlaXZlZCBwcm9maXQgb2YgJFwiICsgX2Ftb3VudCArIFwiIGZyb20gb3RoZXIgcGxheWVyLlwiLCAyODAwKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIENhcmRzIFJ1bGVzXHJcbiAgVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oX3N0YXRlKSB7XHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXkgPSBfbmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlSGFsZlBheU5leHRUdXJuKF9zdGF0ZSkge1xyXG4gICAgX25leHRUdXJuaGFsZlBheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkhhbGZQYXlEYXkgPSBfbmV4dFR1cm5oYWxmUGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBOZXh0VHVybihfc3RhdGUpIHtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuID0gX3NraXBOZXh0VHVybjtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwUGF5RGF5X1dob2xlKF9zdGF0ZSkge1xyXG4gICAgX3NraXBOZXh0UGF5ZGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0UGF5ZGF5ID0gX3NraXBOZXh0UGF5ZGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKF9zdGF0ZSkge1xyXG4gICAgX3NraXBITU5leHRQYXlkYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEhNTmV4dFBheWRheSA9IF9za2lwSE1OZXh0UGF5ZGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoX3N0YXRlKSB7XHJcbiAgICBfc2tpcEJNTmV4dFBheWRheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwQk1OZXh0UGF5ZGF5ID0gX3NraXBCTU5leHRQYXlkYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlVHVyblByb2dyZXNzKF9zdGF0ZSkge1xyXG4gICAgVHVybkluUHJvZ3Jlc3MgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgUmV0dXJuVHVyblByb2dyZXNzKCkge1xyXG4gICAgcmV0dXJuIFR1cm5JblByb2dyZXNzO1xyXG4gIH0sXHJcblxyXG4gIExvc2VBbGxNYXJrZXRpbmdNb25leSgpIHtcclxuICAgIHZhciBfbG9zZUFtb3VudCA9IC0xO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPiAwKSB7XHJcbiAgICAgIF9sb3NlQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfbG9zZUFtb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9sb3NlQW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE11bHRpcGx5TWFya2V0aW5nTW9uZXkoX211bHRpcGxpZXIpIHtcclxuICAgIHZhciBfYW1vdW50SW5jcmVhc2VkID0gLTE7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA+IDApIHtcclxuICAgICAgX2Ftb3VudEluY3JlYXNlZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgKj0gX211bHRpcGxpZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfYW1vdW50SW5jcmVhc2VkID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2Ftb3VudEluY3JlYXNlZDtcclxuICB9LFxyXG5cclxuICBHZXRNYXJrZXRpbmdNb25leShfcHJvZml0KSB7XHJcbiAgICB2YXIgX2Ftb3VudCA9IC0xO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPiAwKSB7XHJcbiAgICAgIF9wcm9maXQgPSBfcHJvZml0IC8gMTAwO1xyXG4gICAgICBfYW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCAqPSBfcHJvZml0O1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9hbW91bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIEdldFZvY2FidWxhcnlRdWVzdGlvbnNJbmRleCgpIHtcclxuICAgIHZhciBfdmFsID0gLTE7XHJcbiAgICBpZiAoVm9jYWJ1bGFyeVF1ZXN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmIChWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlciA8IFZvY2FidWxhcnlRdWVzdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgX3ZhbCA9IFZvY2FidWxhcnlRdWVzdGlvbnNbVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXJdO1xyXG4gICAgICAgIFZvY2FidWxhcnlRdWVzdGlvbnNDb3VudGVyKys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5Qb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfVm9jYWJ1bGFyeSgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBvcHVsYXRlT25lUXVlc3Rpb25BcnJheV9Wb2NhYnVsYXJ5KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3ZhbDtcclxuICB9LFxyXG5cclxuICBHZXRFc3RhYmxpc2htZW50UXVlc3Rpb25zSW5kZXgoKSB7XHJcbiAgICB2YXIgX3ZhbCA9IC0xO1xyXG4gICAgaWYgKEVzdGFibGlzaG1lbnRRdWVzdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIgPCBFc3RhYmxpc2htZW50UXVlc3Rpb25zLmxlbmd0aCkge1xyXG4gICAgICAgIF92YWwgPSBFc3RhYmxpc2htZW50UXVlc3Rpb25zW0VzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyXTtcclxuICAgICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlcisrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X0VzdGFibGlzaG1lbnQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5Qb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfRXN0YWJsaXNobWVudCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF92YWw7XHJcbiAgfSxcclxuXHJcbiAgUG9wdWxhdGVPbmVRdWVzdGlvbkFycmF5X1ZvY2FidWxhcnkoX2RhdGEgPSBudWxsKSB7XHJcbiAgICBpZiAoX2RhdGEgPT0gbnVsbCkge1xyXG4gICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV07XHJcblxyXG4gICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhWb2NhYnVsYXJ5UXVlc3Rpb25zKTtcclxuICAgICAgVm9jYWJ1bGFyeVF1ZXN0aW9uc0NvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IHsgVm9jQXJyYXk6IFZvY2FidWxhcnlRdWVzdGlvbnMsIEVzdEFycmF5OiBudWxsIH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTgsIF90ZW1wRGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2RhdGEuVm9jQXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgIFZvY2FidWxhcnlRdWVzdGlvbnMgPSBfZGF0YS5Wb2NBcnJheTtcclxuICAgICAgICBjb25zb2xlLmxvZyhWb2NhYnVsYXJ5UXVlc3Rpb25zKTtcclxuICAgICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBQb3B1bGF0ZU9uZVF1ZXN0aW9uQXJyYXlfRXN0YWJsaXNobWVudChfZGF0YSA9IG51bGwpIHtcclxuICAgIGlmIChfZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExXTtcclxuXHJcbiAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnMuc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKEVzdGFibGlzaG1lbnRRdWVzdGlvbnMpO1xyXG4gICAgICBFc3RhYmxpc2htZW50UXVlc3Rpb25zQ291bnRlciA9IDA7XHJcblxyXG4gICAgICB2YXIgX3RlbXBEYXRhID0geyBWb2NBcnJheTogbnVsbCwgRXN0QXJyYXk6IEVzdGFibGlzaG1lbnRRdWVzdGlvbnMgfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxOCwgX3RlbXBEYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChfZGF0YS5Fc3RBcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9ucyA9IF9kYXRhLkVzdEFycmF5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEVzdGFibGlzaG1lbnRRdWVzdGlvbnMpO1xyXG4gICAgICAgIEVzdGFibGlzaG1lbnRRdWVzdGlvbnNDb3VudGVyID0gMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uKF9kYXRhKSB7XHJcbiAgICB2YXIgX3F1ZXN0aW9uUmVmID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9RdWVzdGlvbnNEYXRhKCk7XHJcbiAgICB2YXIgX3VzZXJJRCA9IF9kYXRhLlVzZXJJRDtcclxuICAgIHZhciBfcXVlc3Rpb25JbmRleCA9IF9kYXRhLlF1ZXN0aW9uO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9kYXRhLlVzZXJJbmRleDtcclxuICAgIHZhciBfaXNWb2MgPSBfZGF0YS5Jc1ZvYztcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gICAgaWYgKF9pc1ZvYykge1xyXG4gICAgICBWb2NhYnVsYXJ5UXVlc3Rpb25zQ291bnRlcisrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgRXN0YWJsaXNobWVudFF1ZXN0aW9uc0NvdW50ZXIrKztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX3VzZXJJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJJRCBtYXRjaGVkXCIpO1xyXG5cclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfUWRhdGE7XHJcbiAgICAgIGlmIChfaXNWb2MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInZvY1wiKTtcclxuICAgICAgICBfUWRhdGEgPSBfcXVlc3Rpb25SZWYuVm9jYWJ1bGFyeVF1ZXN0aW9uc1tfcXVlc3Rpb25JbmRleF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlc3RcIik7XHJcbiAgICAgICAgX1FkYXRhID0gX3F1ZXN0aW9uUmVmLkVzdGFibGlzaG1lbnRRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXhdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBDb3JyZWN0QW5zd2VyID0gX1FkYXRhLkNvcnJlY3RPcHRpb247XHJcbiAgICAgIHZhciBfbWVzc2FnZSA9IFwiQ2hvb3NlIHRoZSBjb3JyZWN0IGFuc3dlci5cIiArIFwiXFxuXCIgKyBcIip3cm9uZyBhbnN3ZXIgd2lsbCBjb3N0IHlvdSBhIGZpbmUgb2YgJDUwMDAuXCIgKyBcIlxcblwiICsgXCJcXG5cIiArIF9RZGF0YS5RdWVzdGlvbiArIFwiXFxuXCIgKyBcIkEuIFwiICsgX1FkYXRhLk9wdGlvbjEgKyBcIlxcblwiICsgXCJCLiBcIiArIF9RZGF0YS5PcHRpb24yICsgXCJcXG5cIiArIFwiQy4gXCIgKyBfUWRhdGEuT3B0aW9uMyArIFwiXFxuXCIgKyBcIkQuIFwiICsgX1FkYXRhLk9wdGlvbjQ7XHJcblxyXG4gICAgICAvLyB2YXIgX3F1ZXN0aW9uQXNrZWQgPSBPbmVRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXggLSAxXTtcclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9tZXNzYWdlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbihfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgdmFyIF9teURhdGE7XHJcbiAgICB2YXIgX3Jvb21EYXRhO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIF9yb29tRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBfbXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgX3Jvb21EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgIH1cclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXlEYXRhLCBfcm9vbURhdGEsIF9pc1R1cm5PdmVyLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgfSxcclxuXHJcbiAgT25lUXVlc3Rpb25EZWNpc2lvbl9TZWxlY3RPcHRpb25fT25lUXVlc3Rpb24oZXZlbnQgPSBudWxsKSB7XHJcbiAgICB2YXIgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfc2VsZWN0aW9uID0gcGFyc2VJbnQoZXZlbnQuY3VycmVudFRhcmdldC5uYW1lLnNwbGl0KFwiX1wiKVsxXSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJvcHRpb24gc2VsZWN0ZWQ6IFwiICsgX3NlbGVjdGlvbik7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNvcnJlY3RBbnN3ZXI6IFwiICsgQ29ycmVjdEFuc3dlcik7XHJcbiAgICBpZiAoX3NlbGVjdGlvbiA9PSBDb3JyZWN0QW5zd2VyKSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3VyIGFuc3dlciB3YXMgY29ycmVjdCEuXCIsIDEyMDApO1xyXG4gICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIHRydWUsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX215RGF0YS5DYXNoID49IDUwMDApIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCAtPSA1MDAwO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIGFuc3dlcmVkIHdyb25nLCBmaW5lIGFtb3VudCB3YXMgcGF5ZWQgdG8gdGhlIHBsYXllci5cIiwgMTIwMCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24odHJ1ZSwgZmFsc2UsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLCBTa2lwcGluZyBxdWVzdGlvblwiKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihmYWxzZSwgZmFsc2UsIDAsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAvL0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vIE9uZVF1ZXN0aW9uRGVjaXNpb25fUGF5QW1vdW50X09uZVF1ZXN0aW9uKCkge1xyXG4gIC8vICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAvLyAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gIC8vICAgaWYgKF9teURhdGEuQ2FzaCA+PSA1MDAwKSB7XHJcbiAgLy8gICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gIC8vICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAvLyAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggLT0gNTAwMDtcclxuICAvLyAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdKTtcclxuICAvLyAgICAgICAgIGJyZWFrO1xyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgfVxyXG5cclxuICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBwYWlkIGNhc2ggYW1vdW50IHRvIHBsYXllci5cIiwgMTIwMCk7XHJcbiAgLy8gICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIC8vICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbih0cnVlLCBmYWxzZSwgLTEsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAvLyAgIH0gZWxzZSB7XHJcbiAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgLy8gICB9XHJcbiAgLy8gfSxcclxuXHJcbiAgLy8gT25lUXVlc3Rpb25EZWNpc2lvbl9BbnN3ZXJRdWVzdGlvbl9PbmVRdWVzdGlvbigpIHtcclxuICAvLyAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgLy8gICB2YXIgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gIC8vICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBhbnN3ZXJlZCB0aGUgcXVlc3Rpb24uXCIsIDEyMDApO1xyXG4gIC8vICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgLy8gICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihmYWxzZSwgdHJ1ZSwgT25lUXVlc3Rpb25JbmRleCwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gIC8vIH0sXHJcblxyXG4gIFNlbGVjdFBsYXllclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgdmFyIF9teURhdGE7XHJcbiAgICB2YXIgX3Jvb21EYXRhO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIF9yb29tRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBfbXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgX3Jvb21EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgIH1cclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KHRydWUpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KCk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoX215RGF0YSwgX3Jvb21EYXRhLCBfaXNUdXJuT3ZlciwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9TZWxlY3RQbGF5ZXJGb3JQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoX2RhdGEpIHtcclxuICAgIHZhciBfb3duSUQgPSBfZGF0YS5Vc2VySUQudG9TdHJpbmcoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBwYXJzZUludChfZGF0YS5Vc2VySW5kZXgpO1xyXG4gICAgdmFyIF9wbGF5ZXJOYW1lID0gX2RhdGEuVXNlck5hbWU7XHJcbiAgICB2YXIgX3BsYXllcklEID0gX2RhdGEuT3duUGxheWVySUQudG9TdHJpbmcoKTtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICBpZiAoX293bklEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZXZlbnQ6IFwiICsgX3BsYXllck5hbWUpO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBfb3duSUQpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhbkdpdmVQcm9maXRPblBheURheSA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXkgPSBfcGxheWVySUQ7XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsIHRoaXMuUGxheWVyR2FtZUluZm8sIHRydWUpO1xyXG4gICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNob3dUb2FzdChcIlBsYXllciBcIiArIF9wbGF5ZXJOYW1lICsgXCIgd2lsbCByZWNlaXZlIGFsbCB5b3VyIG5leHQgcGF5IGRheSBwcm9maXRzXCIsIDMyMDApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9oYXNEb25lUGF5bWVudCwgX2hhc0Fuc3dlcmVkUXVlc3Rpb24sIF9xdWVzdGlvbkluZGV4LCBfVXNlcklEKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IFBheW1lbnREb25lOiBfaGFzRG9uZVBheW1lbnQsIFF1ZXN0aW9uQW5zd2VyZWQ6IF9oYXNBbnN3ZXJlZFF1ZXN0aW9uLCBRdWVzdGlvbkluZGV4OiBfcXVlc3Rpb25JbmRleCwgSUQ6IF9Vc2VySUQgfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoOCwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9kYXRhKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgdmFyIF9oYXNEb25lUGF5bWVudCA9IF9kYXRhLlBheW1lbnREb25lO1xyXG4gICAgICB2YXIgX2hhc0Fuc3dlcmVkUXVlc3Rpb24gPSBfZGF0YS5RdWVzdGlvbkFuc3dlcmVkO1xyXG4gICAgICB2YXIgX3F1ZXN0aW9uSW5kZXggPSBfZGF0YS5RdWVzdGlvbkluZGV4O1xyXG4gICAgICB2YXIgX3VJRCA9IF9kYXRhLklEO1xyXG5cclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgIGlmIChfcXVlc3Rpb25JbmRleCA9PSAwKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcInBsYXllciBkb2VzIG5vdCBoYXZlIGVub3VnaCBjYXNoLCBzbyBxdWVzdGlvbnMgd2VyZSBza2lwcGVkLlwiLCAyMTAwKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX2hhc0RvbmVQYXltZW50KSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggKz0gNTAwMDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGF5ZXIgaGFzIGdpdmVuIHdyb25nIGFuc3dlciwgY2FzaCAkNTAwMCBoYXMgYmVlbiBhZGRlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2hhc0Fuc3dlcmVkUXVlc3Rpb24pIHtcclxuICAgICAgICAgIHZhciBfc2VsZWN0ZWRQbGF5ZXJJbmRleCA9IDA7XHJcbiAgICAgICAgICB2YXIgX2FjdG9yc0RhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoX3VJRCA9PSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgICBfc2VsZWN0ZWRQbGF5ZXJJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcInBsYXllciBoYXMgZ2l2ZW4gY29ycmVjdCBhbnN3ZXIsIG5vIGNhc2ggd2FzIHJlY2VpdmVkLlwiLCAyMTAwKTtcclxuXHJcbiAgICAgICAgICAvLyBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMSkge1xyXG4gICAgICAgICAgLy8gICAvL2hhdmUgeW91IHNraXBwZWQgbG9hbiBwcmV2aW91cyBwYXlkYXk/XHJcbiAgICAgICAgICAvLyAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ta2lwcGVkTG9hblBheW1lbnQpIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgc2tpcHBlZCBsb2FuIHBheWVtZW50IGluIHByZXZpb3VzIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSAyKSB7XHJcbiAgICAgICAgICAvLyAgIC8vSGF2ZSB5b3UgdGFrZW4gYW55IGxvYW4/XHJcbiAgICAgICAgICAvLyAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICAvLyAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAvLyAgICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAvLyAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgIC8vICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgIC8vICAgfVxyXG5cclxuICAgICAgICAgIC8vICAgaWYgKF9sb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHRha2VuIHNvbWUgbG9hblwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSB0YWtlbiBhbnkgbG9hblwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSAzKSB7XHJcbiAgICAgICAgICAvLyAgIC8vQXJlIHlvdSBiYW5rcnVwdGVkPyBpZiBtb3JlIHRoYW4gb25jZSwgdGVsbCBtZSB0aGUgYW1vdW50P1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuSXNCYW5rcnVwdCkge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkIFwiICsgX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQmFua3J1cHRBbW91bnQgKyBcIiB0aW1lL2VzLlwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSBiZWVuIGJhbmtydXB0ZWRcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gNCkge1xyXG4gICAgICAgICAgLy8gICAvL0lzIHlvdXIgdHVybiBnb2luZyB0byBiZSBza2lwcGVkIG5leHQgdGltZT9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBiZSBza2lwcGVkLlwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgbm90IGJlIHNraXBwZWQuXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDUpIHtcclxuICAgICAgICAgIC8vICAgLy9JcyBpdCBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSB5b3VyIG5leHQgcGF5ZGF5P1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXkpIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBiZSBkb3VibGUgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIG5vdCBiZSBkb3VibGUgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICBpZiAoSXNUd2VlbmluZyA9PSB0cnVlKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5KF9kYXRhKTtcclxuICAgICAgfSwgODAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfc3BhY2VzID0gX2RhdGEuRGF0YS5iYWNrc3BhY2VzO1xyXG4gICAgICB2YXIgX2NvdW50ZXIgPSBfZGF0YS5EYXRhLkNvdW50ZXI7XHJcblxyXG4gICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2NvdW50ZXIgKyBCYWNrc3BhY2VzXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1BvcywgMC4xKTtcclxuXHJcbiAgICAgIFJvbGxDb3VudGVyID0gX2NvdW50ZXI7XHJcbiAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFR3ZWVuUGxheWVyX0dvQmFja1NwYWNlczogZnVuY3Rpb24gKE5vZGUsIFRvUG9zLCBzcGVlZCA9IDAuNikge1xyXG4gICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgLnRvKHNwZWVkLCB7IHBvc2l0aW9uOiBjYy52MihUb1Bvcy54LCBUb1Bvcy55KSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7fSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIFJvbGxDb3VudGVyIC09IEJhY2tzcGFjZXM7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IGJhY2tzcGFjZXM6IEJhY2tzcGFjZXMsIENvdW50ZXI6IFJvbGxDb3VudGVyIH0gfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMCwgX2RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG4gIC8vI2VuZHJlZ2lvblxyXG59KTtcclxuLy9tb2R1bGUuZXhwb3J0cyAgPSBQbGF5ZXJEYXRhOyAvL3doZW4gaW1wb3J0cyBpbiBhbm90aGVyIHNjcmlwdCBvbmx5IHJlZmVyZW5jZSBvZiBwbGF5ZXJkYXRhIGNsYXNzIHdvdWxkIGJlIGFibGUgdG8gYWNjZXNzZWQgZnJvbSBHYW1lbWFuYWdlciBpbXBvcnRcclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lTWFuYWdlcjtcclxuLy8jZW5kcmVnaW9uXHJcbiJdfQ==