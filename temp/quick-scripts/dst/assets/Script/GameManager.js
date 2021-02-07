
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
        Dice1 = 4;
        Dice2 = 4;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJQcmV2aW91c0RpY2VSb2xsMyIsIlByZXZpb3VzRGljZVJvbGw0IiwiUHJldmlvdXNEaWNlUm9sbDUiLCJ1c2VyR2FtZU92ZXIiLCJCb3RHYW1lT3ZlciIsIlRvdGFsQ291bnRlclJlYWNoZWQiLCJQYXNzZWRQYXlEYXlDb3VudGVyIiwiRG91YmxlUGF5RGF5Q291bnRlciIsIk5vQ2FyZEZ1bmN0aW9uYWxpdHkiLCJQbGF5ZXJMZWZ0IiwiRm9yY2VDaGFuZ2VUaW1lT3V0IiwiR2FtZUNvbXBsZXRlZCIsIkNvcnJlY3RBbnN3ZXIiLCJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIlBhcnRuZXJOYW1lIiwiTG9jYXRpb25zTmFtZSIsIkxvYW5UYWtlbiIsIkxvYW5BbW91bnQiLCJSZWNlaXZlRG91YmxlUGF5RGF5IiwiY3RvciIsIkNhcmREYXRhRnVuY3Rpb25hbGl0eSIsIk5leHRUdXJuRG91YmxlUGF5IiwiU2tpcE5leHRUdXJuIiwiU2tpcE5leHRQYXlkYXkiLCJTa2lwSE1OZXh0UGF5ZGF5IiwiU2tpcEJNTmV4dFBheWRheSIsIk5leHRUdXJuSGFsZlBheURheSIsIlN0b2NrSW5mbyIsIlNoYXJlQW1vdW50IiwiUGxheWVyRGF0YSIsIlBsYXllck5hbWUiLCJQbGF5ZXJVSUQiLCJBdmF0YXJJRCIsIklzQm90IiwiTm9PZkJ1c2luZXNzIiwiQ2FyZEZ1bmN0aW9uYWxpdHkiLCJIb21lQmFzZWRBbW91bnQiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIlJlY2VpdmVEb3VibGVQYXlEYXlBbW91bnQiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIk5vT2ZTdG9ja3MiLCJDYXNoIiwiR29sZENvdW50IiwiU3RvY2tDb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkxhd3llclN0YXR1cyIsIklzQmFua3J1cHQiLCJCYW5rcnVwdEFtb3VudCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBsYXllclJvbGxDb3VudGVyIiwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZCIsImlzR2FtZUZpbmlzaGVkIiwiVG90YWxTY29yZSIsIlRvdGFsSEJDYXNoIiwiVG90YWxCTUNhc2giLCJUb3RhbEdvbGRDYXNoIiwiVG90YWxMb2FuQmFsYW5jZSIsIlRvdGFsU3RvY2tzQ2FzaCIsIkdhbWVPdmVyIiwiSXNBY3RpdmUiLCJDYW5HaXZlUHJvZml0T25QYXlEYXkiLCJVc2VySURGb3JQcm9maXRQYXlEYXkiLCJSb2xsQ291bnRlciIsIkRpY2VUZW1wIiwiRGljZVJvbGwiLCJJc1R3ZWVuaW5nIiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHVybkNoZWNrQXJyYXkiLCJCdXNpbmVzc0xvY2F0aW9uTm9kZXMiLCJQYXNzZWRQYXlEYXkiLCJEb3VibGVQYXlEYXkiLCJfbmV4dFR1cm5Eb3VibGVQYXkiLCJfbmV4dFR1cm5oYWxmUGF5IiwiX3NraXBOZXh0VHVybiIsIl9za2lwTmV4dFBheWRheSIsIl9za2lwSE1OZXh0UGF5ZGF5IiwiX3NraXBCTU5leHRQYXlkYXkiLCJDYXJkRXZlbnRSZWNlaXZlZCIsIlR1cm5JblByb2dyZXNzIiwiQmFja3NwYWNlcyIsImlzR2FtZU92ZXIiLCJPbmVRdWVzdGlvbkluZGV4IiwiT25lUXVlc3Rpb25zIiwiQ2FyZERpc3BsYXlTZXRUaW1vdXQiLCJHYW1lTWFuYWdlciIsIkNvbXBvbmVudCIsIlBsYXllckdhbWVJbmZvIiwiQm90R2FtZUluZm8iLCJQbGF5ZXJOb2RlIiwiTm9kZSIsIkNhbWVyYU5vZGUiLCJBbGxQbGF5ZXJVSSIsIkFsbFBsYXllck5vZGVzIiwiU3RhcnRMb2NhdGlvbk5vZGVzIiwiU2VsZWN0ZWRNb2RlIiwic3RhdGljcyIsIkluc3RhbmNlIiwiU2V0UGxheWVyTGVmdCIsIl9zdGF0ZSIsIlJlc2V0QWxsVmFyaWFibGVzIiwiSW5wdXRUZXN0RGljZTEiLCJfdmFsIiwiSW5wdXRUZXN0RGljZTIiLCJvbkxvYWQiLCJUdXJuTnVtYmVyIiwiVHVybkNvbXBsZXRlZCIsIkNoZWNrUmVmZXJlbmNlcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRTZWxlY3RlZE1vZGUiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsIkNoZWNrU3BlY3RhdGUiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIkFsbERhdGEiLCJNYXhQbGF5ZXJzIiwibGVuZ3RoIiwiU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyIiwiVXBkYXRlR2FtZVVJIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJHZXRUdXJuTnVtYmVyIiwiR2V0TXlJbmRleCIsIm15SW5kZXgiLCJfYWN0b3IiLCJQaG90b25BY3RvciIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9hbGxBY3RvcnMiLCJpbmRleCIsIlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyIsIkFzc2lnblBsYXllckdhbWVVSSIsIkVuYWJsZVBsYXllck5vZGVzIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsImNvbnNvbGUiLCJsb2ciLCJfdG9Qb3MiLCJWZWMyIiwiR2V0X1NwYWNlTWFuYWdlciIsIkRhdGEiLCJSZWZlcmVuY2VMb2NhdGlvbiIsInBvc2l0aW9uIiwieCIsInkiLCJzZXRQb3NpdGlvbiIsIl9sYXN0SW5kZXgiLCJhY3RpdmUiLCJDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyIiwiVG90YWxDb25uZWN0ZWRQbGF5ZXJzIiwibXlSb29tQWN0b3JDb3VudCIsInVzZXJJRCIsInNldEN1c3RvbVByb3BlcnR5IiwiQ2hhbmdlVHVybiIsIlJhaXNlRXZlbnRGb3JDYXJkIiwiX2RhdGEiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiRGlzcGxheUNhcmRPbk90aGVycyIsIk9uTGFuZGVkT25TcGFjZSIsInNldFRpbWVvdXQiLCJSZXNldENhcmREaXNwbGF5IiwiUmVjZWl2ZUV2ZW50Rm9yQ2FyZCIsIlJhbmRvbUNhcmQiLCJyYW5kb21DYXJkIiwiY291bnRlciIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJTeW5jQWxsRGF0YSIsIlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZSIsIl91aWQiLCJwdXNoIiwiQXJyYXlMZW5ndGgiLCJJREZvdW5kIiwiaiIsIlJlc2V0U29tZVZhbHVlcyIsIkNoYW5nZVR1cm5Gb3JjZWZ1bGx5IiwiVXBkYXRlVmlzdWFsRGF0YSIsIlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSIsIlR1cm5IYW5kbGVyIiwiX3R1cm4iLCJfaXNNYXN0ZXIiLCJDaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQiLCJfcGxheWVyTWF0Y2hlZCIsIlRvZ2dsZVR1cm5Qcm9ncmVzcyIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlJlc2V0VHVyblZhcmlhYmxlIiwiUm9sbERpY2UiLCJEaWNlUm9sbFNjcmVlbiIsIlBsYXllckluZm8iLCJteVJvb21BY3RvcnNBcnJheSIsIlNob3dUb2FzdCIsIlRvZ2dsZVNraXBOZXh0VHVybiIsIl9pbmQiLCJNYWluU2Vzc2lvbkRhdGEiLCJNeURhdGEiLCJfY291bnRlciIsIlN0YXJ0VHVybiIsIlJlY2VpdmVCYW5rcnVwdERhdGEiLCJfaXNCYW5rcnVwdGVkIiwiYmFua3J1cHRlZCIsInR1cm4iLCJfcGxheWVyRGF0YSIsIlBsYXllckRhdGFNYWluIiwiU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCIsIl9yYW5kb21JbmRleCIsImdldFJhbmRvbSIsIlNldE5hbWUiLCJTZXRBdmF0YXIiLCJfdG9nZ2xlSGlnaGxpZ2h0IiwiX2luZGV4IiwiVG9nZ2xlQkdIaWdobGlnaHRlciIsIlRvZ2dsZVRleHRpZ2hsaWdodGVyIiwiY2hpbGRyZW4iLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIkF2YXRhclNwcml0ZXMiLCJTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzIiwidGFyZ2V0UG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicGFyZW50IiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJyYXRpbyIsIndpblNpemUiLCJoZWlnaHQiLCJ6b29tUmF0aW8iLCJsYXRlVXBkYXRlIiwic3luY0RpY2VSb2xsIiwiX3JvbGwiLCJfZGljZTEiLCJkaWNlMSIsIl9kaWNlMiIsImRpY2UyIiwiX3Jlc3VsdCIsImVycm9yIiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwiQW5pbWF0ZURpY2UiLCJEaWNlRnVudGlvbmFsaXR5IiwiX3BvcyIsIlR3ZWVuQ2FtZXJhIiwiVGVtcENoZWNrU3BhY2UiLCJfcm9sbGluZyIsInRlbXBjb3VudGVyIiwidGVtcGNvdW50ZXIyIiwiZGljZXRvYmUiLCJwYXJzZUludCIsIlNwYWNlRGF0YSIsIlNwYWNlc1R5cGUiLCJEaWNlMSIsIkRpY2UyIiwiX25ld1JvbGwiLCJSb2xsT25lRGljZSIsIlJvbGxUd29EaWNlcyIsImNhbGxVcG9uQ2FyZCIsIl9zcGFjZUlEIiwidmFsdWVJbmRleCIsIlN0YXJ0RGljZVJvbGwiLCJTZW5kaW5nRGF0YSIsImlzQm90IiwiY29tcGxldGVDYXJkVHVybiIsIkFsbFBsYXllcnNHYW1lQ29tcGxldGVkIiwiQ2FsbEdhbWVDb21wbGV0ZSIsIl9pc0JvdCIsIl9mb3JjZUdhbWVPdmVyIiwiX3BsYXllckluZGV4IiwiX2Nhc2giLCJITUFtb3VudCIsIkdldF9HYW1lTWFuYWdlciIsIkJNQW1vdW50IiwiQk1Mb2NhdGlvbnMiLCJsb2FuQW1vdW50IiwiX2dvbGQiLCJfc3RvY2tzIiwiX2RpY2VSYW5kb20iLCJPbmNlT3JTaGFyZSIsIkdvbGRDYXNoIiwiU3RvY2tDYXNoIiwiQk1DYXNoIiwiSE1DYXNoIiwiVG90YWxBc3NldHMiLCJSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlIiwiUmFpc2VFdmVudFRvU3luY0dhbWVDb21wbGV0ZURhdGEiLCJTeW5jR2FtZU92ZXIiLCJfVUlEIiwiaW5mb1RleHQiLCJzdGF0dXNUZXh0IiwiRGlzY29ubmVjdERhdGEiLCJTaG93UmVzdWx0U2NyZWVuIiwiX2N1cnJlbnRDYXNoIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJTdHVkZW50RGF0YSIsImdhbWVDYXNoIiwiX3RvdGFsIiwidG9TdHJpbmciLCJfd29uIiwiZ2FtZXNXb24iLCJVcGRhdGVVc2VyRGF0YSIsIlN5bmNHYW1lQ29tcGxldGVEYXRhIiwiQm90IiwiWm9vbUNhbWVyYU91dE9ubHkiLCJtYXgiLCJTZWxlY3RlZEluZCIsIlNlc3Npb25EYXRhIiwiX3ZhbHVlIiwidHJhY2UiLCJwbGF5ZXJjb21wbGV0ZWQiLCJab29tQ2FtZXJhT3V0IiwiVHdlZW5QbGF5ZXIiLCJtaW4iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJpc1pvb20iLCJ0aW1lIiwidHdlZW4iLCJ0byIsInYyIiwiZWFzaW5nIiwiY2FsbCIsIlpvb21DYW1lcmFJbiIsInN0YXJ0IiwiQ2hlY2tQYXlEYXlDb25kaXRpb25zIiwiUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24iLCJUb1BvcyIsIl9uZXdwb3MiLCJUb2dnbGVQYXlEYXkiLCJfc3QxIiwiX1N0MiIsIkluY3JlYXNlRG91YmxlUGF5RGF5IiwiRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiYW1vdW50IiwiX2xvY2F0aW9uTmFtZSIsIl9pc0NhcmRGdW5jdGlvbmFsaXR5IiwiX0dpdmVuQ2FzaCIsIl9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJpIiwibm9kZSIsImluc3RhbnRpYXRlIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiU2V0QnVzaW5lc3NJbmRleCIsIlNldENhcmRGdW5jdGlvbmFsaXR5IiwiU2V0R2l2ZW5DYXNoIiwiU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiUmVzZXRFZGl0Qm94IiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiZGVzdHJveSIsIlVwZGF0ZVN0b2Nrc19UdXJuRGVjaXNpb24iLCJfbmFtZSIsIl9TaGFyZUFtb3VudCIsIl9pc0FkZGluZyIsIl9zdG9jayIsIl9pc0RvdWJsZVBheURheSIsIl9mb3JTZWxlY3RlZEJ1c2luZXNzIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIkhCQW1vdW50IiwiX3RpdGxlIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9hbW91bnQiLCJfdUlEIiwiSUQiLCJSZWNlaXZlUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiX2lEIiwiX215SW5kZXgiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIlRvZ2dsZUhhbGZQYXlOZXh0VHVybiIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlJldHVyblR1cm5Qcm9ncmVzcyIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9sb3NlQW1vdW50IiwiTXVsdGlwbHlNYXJrZXRpbmdNb25leSIsIl9tdWx0aXBsaWVyIiwiX2Ftb3VudEluY3JlYXNlZCIsIkdldE1hcmtldGluZ01vbmV5IiwiX3Byb2ZpdCIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiX3F1ZXN0aW9uUmVmIiwiR2V0X1F1ZXN0aW9uc0RhdGEiLCJfdXNlcklEIiwiVXNlcklEIiwiX3F1ZXN0aW9uSW5kZXgiLCJRdWVzdGlvbiIsIlVzZXJJbmRleCIsIl9pc1ZvYyIsIklzVm9jIiwiX2dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX1FkYXRhIiwiVm9jYWJ1bGFyeVF1ZXN0aW9ucyIsIkVzdGFibGlzaG1lbnRRdWVzdGlvbnMiLCJDb3JyZWN0T3B0aW9uIiwiX21lc3NhZ2UiLCJPcHRpb24xIiwiT3B0aW9uMiIsIk9wdGlvbjMiLCJPcHRpb240IiwiU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbiIsIl9pc1R1cm5PdmVyIiwiX215RGF0YSIsIl9yb29tRGF0YSIsIlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJPbmVRdWVzdGlvbkRlY2lzaW9uX1NlbGVjdE9wdGlvbl9PbmVRdWVzdGlvbiIsImV2ZW50IiwiX3NlbGVjdGlvbiIsImN1cnJlbnRUYXJnZXQiLCJzcGxpdCIsIlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbiIsIlNlbGVjdFBsYXllclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eSIsIlRvZ2dsZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQiLCJSZXNldFNwYWNlU2NyZWVuX1NlbGVjdFBsYXllckZvclByb2ZpdCIsIlNldFVwU3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0IiwiUmVjZWl2ZUV2ZW50X1NlbGVjdFBsYXllckZvclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eSIsIl9vd25JRCIsIl9wbGF5ZXJOYW1lIiwiVXNlck5hbWUiLCJfcGxheWVySUQiLCJPd25QbGF5ZXJJRCIsIl9oYXNEb25lUGF5bWVudCIsIl9oYXNBbnN3ZXJlZFF1ZXN0aW9uIiwiX1VzZXJJRCIsIlBheW1lbnREb25lIiwiUXVlc3Rpb25BbnN3ZXJlZCIsIlF1ZXN0aW9uSW5kZXgiLCJSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbiIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX3NlbGVjdGVkUGxheWVySW5kZXgiLCJfYWN0b3JzRGF0YSIsIlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eSIsIl9zcGFjZXMiLCJiYWNrc3BhY2VzIiwiQ291bnRlciIsIlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyIsInNwZWVkIiwiR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHLElBQWQ7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFD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d0IsQ0FBQzhCLFFBQXpCLENBQWtDbUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHRGLFdBQTFELEVBQXVFdUYsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0UsQ0FBL00sQ0FBYjs7QUFDQSxTQUFLNFMsd0JBQUwsQ0FBOEIsS0FBS3hXLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsQ0FBOUIsRUFBb0V5QyxNQUFwRTtBQUNBLFNBQUs2SCxnQkFBTDtBQUNELEdBenBFd0IsQ0EycEV6QjtBQUNBOztBQTVwRXlCLENBQVQsQ0FBbEIsRUE4cEVBOztBQUNBeUwsTUFBTSxDQUFDQyxPQUFQLEdBQWlCcFgsV0FBakIsRUFDQSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9pc1Rlc3QgPSB0cnVlO1xyXG52YXIgX2RpY2VpbnB1dDEgPSBcIlwiO1xyXG52YXIgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDEgPSAtMTtcclxudmFyIFByZXZpb3VzRGljZVJvbGwyID0gLTE7XHJcblxyXG52YXIgUHJldmlvdXNEaWNlUm9sbDMgPSAtMTtcclxudmFyIFByZXZpb3VzRGljZVJvbGw0ID0gLTE7XHJcblxyXG52YXIgUHJldmlvdXNEaWNlUm9sbDUgPSAtMTtcclxuXHJcbnZhciB1c2VyR2FtZU92ZXIgPSBmYWxzZTtcclxudmFyIEJvdEdhbWVPdmVyID0gZmFsc2U7XHJcbnZhciBUb3RhbENvdW50ZXJSZWFjaGVkID0gZmFsc2U7XHJcbnZhciBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxudmFyIERvdWJsZVBheURheUNvdW50ZXIgPSAwO1xyXG52YXIgTm9DYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG52YXIgUGxheWVyTGVmdCA9IGZhbHNlO1xyXG52YXIgRm9yY2VDaGFuZ2VUaW1lT3V0ID0gbnVsbDtcclxudmFyIEdhbWVDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIENvcnJlY3RBbnN3ZXIgPSAwO1xyXG4vLyNyZWdpb24gc3VwZXJjbGFzc2VzIGFuZCBlbnVtZXJhdGlvbnNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIHR5cGUgb2YgYnVzaW5lc3MtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEVudW1CdXNpbmVzc1R5cGUgPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIEhvbWVCYXNlZDogMSwgLy9hIGJ1c2luZXNzIHRoYXQgeW91IG9wZXJhdGUgb3V0IG9mIHlvdXIgaG9tZVxyXG4gIGJyaWNrQW5kbW9ydGFyOiAyLCAvL2Egc3RvcmUgZnJvbnQgYnVzaW5lc3NcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3NJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJCdXNpbmVzc0luZm9cIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOYW1lOiBcIkJ1c2luZXNzRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NUeXBlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1vZGVcIixcclxuICAgICAgdHlwZTogRW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgZGVmYXVsdDogRW51bUJ1c2luZXNzVHlwZS5Ob25lLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQnVzaW5lc3MgY2F0b2dvcnkgZm9yIHBsYXllcnNcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUeXBlXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJUeXBlIChieSBuYW1lKSBvZiBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOYW1lIG9mIHRoZSBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLFxyXG4gICAgfSxcclxuICAgIEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImJhbGFuY2Ugb2YgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBJc1BhcnRuZXJzaGlwOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzUGFydG5lcnNoaXBcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cHc6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGRvbmUgcGFydG5lcnNoaXAgd2l0aCBzb21lb25lIHdpdGggY3VycmVudCBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXJ0bmVySURcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklEIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhcnRuZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJuYW1lIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLFxyXG4gICAgfSxcclxuICAgIExvY2F0aW9uc05hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9jYXRpb25zTmFtZVwiLFxyXG4gICAgICB0eXBlOiBbY2MuVGV4dF0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaWYgcGxheWVyIG93bnMgYnJpY2sgYW5kIG1vcnRhciBoZS9zaGUgY2FuIGV4cGFuZCB0byBuZXcgbG9jYXRpb25cIixcclxuICAgIH0sXHJcbiAgICBMb2FuVGFrZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblRha2VuXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBSZWNlaXZlRG91YmxlUGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlY2VpdmVEb3VibGVQYXlEYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQ2FyZERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhRnVuY3Rpb25hbGl0eSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkNhcmREYXRhRnVuY3Rpb25hbGl0eVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5leHRUdXJuRG91YmxlUGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5leHRUdXJuRG91YmxlUGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBpdHMgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcE5leHRUdXJuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBOZXh0VHVyblwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgdHVybiBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgdHVybiBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTmV4dFBheWRheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcEhNTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwSE1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGhvbWUgYmFzZWQgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcEJNTmV4dFBheWRheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwQk1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGJyaWNrYSBhbmQgbW1vcnRhciBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBOZXh0VHVybkhhbGZQYXlEYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmV4dFR1cm5IYWxmUGF5RGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFN0b2NrSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3RvY2tJbmZvID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU3RvY2tJbmZvXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZTogXCJTdG9ja0RhdGFcIixcclxuICAgIEJ1c2luZXNzTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc05hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5hbWUgb2YgdGhlIGJ1c2luZXNzIGluIHdoaWNoIHN0b2NrcyB3aWxsIGJlIGhlbGRcIixcclxuICAgIH0sXHJcbiAgICBTaGFyZUFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTaGFyZUFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiU2hhcmUgYW1vdW50IG9mIHRoZSBzdG9ja1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgIFBsYXllciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGxheWVyRGF0YVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibmFtZSBvZiB0aGUgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyVUlEOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclVJRFwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiSUQgb2YgdGhlIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEF2YXRhcklEOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhcklEXCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpZCByZWZlcmVuY2UgZm9yIHBsYXllciBhdmF0YXIgc2VsZWN0aW9uXCIsXHJcbiAgICB9LFxyXG4gICAgSXNCb3Q6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNCb3RcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cHc6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBjdXJyZW50IHBsYXllciBpcyBib3RcIixcclxuICAgIH0sXHJcbiAgICBOb09mQnVzaW5lc3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NcIixcclxuICAgICAgdHlwZTogW0J1c2luZXNzSW5mb10sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTnVtYmVyIG9mIGJ1c2luZXNzIGEgcGxheWVyIGNhbiBvd25cIixcclxuICAgIH0sXHJcbiAgICBDYXJkRnVuY3Rpb25hbGl0eToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXJkRnVuY3Rpb25hbGl0eVwiLFxyXG4gICAgICB0eXBlOiBDYXJkRGF0YUZ1bmN0aW9uYWxpdHksXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjYXJkIGZ1bmN0aW9uYWxpdHkgc3RvcmVkIGJ5IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWRBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm51bWJlciBvZiBob21lIGJhc2VkIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhckFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhckFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIG9mIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIFJlY2VpdmVEb3VibGVQYXlEYXlBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVjZWl2ZURvdWJsZVBheURheUFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxMb2NhdGlvbnNBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxMb2NhdGlvbnNBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm51bWJlciBvZiBsb2NhdGlvbnMgb2YgYWxsIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3Nlc3NcIixcclxuICAgIH0sXHJcbiAgICBOb09mU3RvY2tzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2Nrc1wiLFxyXG4gICAgICB0eXBlOiBbU3RvY2tJbmZvXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOdW1iZXIgb2Ygc3RvY2sgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIENhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQW1vdW50IG9mIGNhc2ggcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBHb2xkQ291bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR29sZENvdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjb3VudCBvZiBnb2xkIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBTdG9ja0NvdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2NrQ291bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImNvdW50IG9mIHN0b2NrcyBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblRha2VuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5UYWtlblwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgdGFrZW4gbG9hbiBmcm9tIGJhbmsgb3Igbm90XCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgbG9hbiB0YWtlbiBmcm9tIHRoZSBiYW5rXCIsXHJcbiAgICB9LFxyXG4gICAgTWFya2V0aW5nQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0Ftb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibWFya2V0aW5nIGFtb3VudCBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgTGF3eWVyU3RhdHVzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxhd3llclN0YXR1c1wiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgaGlyZWQgYSBsYXd5ZXIgb3Igbm90XCIsXHJcbiAgICB9LFxyXG4gICAgSXNCYW5rcnVwdDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc0JhbmtydXB0XCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBiZWVuIEJhbmtydXB0ZWQgb3Igbm90XCIsXHJcbiAgICB9LFxyXG4gICAgQmFua3J1cHRBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQmFua3J1cHRBbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaG93IG11Y2ggdGltZSBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFwiLFxyXG4gICAgfSxcclxuICAgIFNraXBwZWRMb2FuUGF5bWVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwcGVkTG9hblBheW1lbnRcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHNraXBwZWQgbG9hbiBwYXltZW50XCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyUm9sbENvdW50ZXI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyUm9sbENvdW50ZXJcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImludGVnZXIgdG8gc3RvcmUgcm9sbCBjb3VudG9yIGZvciBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBJbml0aWFsQ291bnRlckFzc2lnbmVkOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkluaXRpYWxDb3VudGVyQXNzaWduZWRcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBpc0dhbWVGaW5pc2hlZDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJpc0dhbWVGaW5pc2hlZFwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsU2NvcmU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxTY29yZVwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxIQkNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxIQkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQk1DYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQk1DYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEdvbGRDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsR29sZENhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsTG9hbkJhbGFuY2U6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxMb2FuQmFsYW5jZVwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxTdG9ja3NDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsU3RvY2tzQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgR2FtZU92ZXI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR2FtZU92ZXJcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBJc0FjdGl2ZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc0FjdGl2ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgQ2FuR2l2ZVByb2ZpdE9uUGF5RGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhbkdpdmVQcm9maXRPblBheURheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIFVzZXJJREZvclByb2ZpdFBheURheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJVc2VySURGb3JQcm9maXRQYXlEYXlcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gR2FtZSBNYW5hZ2VyIENsYXNzXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLShtYWluIGNsYXNzKSBjbGFzcyBmb3IgR2FtZSBNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSb2xsQ291bnRlciA9IDA7XHJcbnZhciBEaWNlVGVtcCA9IDA7XHJcbnZhciBEaWNlUm9sbCA9IDA7XHJcbnZhciBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxudmFyIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG5cclxudmFyIFBhc3NlZFBheURheSA9IGZhbHNlO1xyXG52YXIgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcblxyXG4vL2NhcmRzIGZ1bmN0aW9uYWxpdHlcclxudmFyIF9uZXh0VHVybkRvdWJsZVBheSA9IGZhbHNlO1xyXG52YXIgX25leHRUdXJuaGFsZlBheSA9IGZhbHNlO1xyXG52YXIgX3NraXBOZXh0VHVybiA9IGZhbHNlO1xyXG52YXIgX3NraXBOZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCB3aG9sZSBwYXkgZGF5XHJcbnZhciBfc2tpcEhNTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBfc2tpcEJNTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxudmFyIFR1cm5JblByb2dyZXNzID0gZmFsc2U7XHJcblxyXG52YXIgQmFja3NwYWNlcyA9IDM7XHJcbnZhciBpc0dhbWVPdmVyID0gZmFsc2U7XHJcbnZhciBPbmVRdWVzdGlvbkluZGV4ID0gLTE7XHJcbnZhciBPbmVRdWVzdGlvbnMgPSBbXCJ5b3UgaGF2ZSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1wiLCBcInlvdSBoYXZlIHRha2VuIGFueSBsb2FuP1wiLCBcInlvdSBoYXZlIGJhbmtydXB0ZWQgZXZlcj9cIiwgXCJ5b3VyIG5leHQgdHVybiBpcyBnb2luZyB0byBiZSBza2lwcGVkP1wiLCBcInlvdXIgbmV4dCBwYXlkYXkgaXMgZ29pbmcgdG8gYmUgZG91YmxlIHBheWRheT9cIl07XHJcblxyXG52YXIgQ2FyZERpc3BsYXlTZXRUaW1vdXQgPSBudWxsO1xyXG5cclxudmFyIEdhbWVNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiR2FtZU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyR2FtZUluZm86IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImFsbCBwbGF5ZXIncyBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgQm90R2FtZUluZm86IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImFsbCBib3QncyBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIENhbWVyYU5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBjYW1lcmFcIixcclxuICAgIH0sXHJcbiAgICBBbGxQbGF5ZXJVSToge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2Ugb2YgdWkgb2YgYWxsIHBsYXllcnNcIixcclxuICAgIH0sXHJcbiAgICBBbGxQbGF5ZXJOb2Rlczoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2Ugb2Ygbm9kZSBvZiBhbGwgcGxheWVycyBpbnNpZGUgZ2FtZXBsYXlcIixcclxuICAgIH0sXHJcbiAgICBTdGFydExvY2F0aW9uTm9kZXM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIGF0dGF5IG9mIGxvY2F0aW9uc1wiLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdGVkTW9kZToge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciByZWZlcmVuY2UgZm9yIGdhbWUgbW9kZSAxIG1lYW5zIGJvdCBhbmQgMiBtZWFucyByZWFsIHBsYXllcnNcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgc3RhdGljczoge1xyXG4gICAgUGxheWVyRGF0YTogUGxheWVyRGF0YSxcclxuICAgIEJ1c2luZXNzSW5mbzogQnVzaW5lc3NJbmZvLFxyXG4gICAgQ2FyZERhdGFGdW5jdGlvbmFsaXR5OiBDYXJkRGF0YUZ1bmN0aW9uYWxpdHksXHJcbiAgICBFbnVtQnVzaW5lc3NUeXBlOiBFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgU2V0UGxheWVyTGVmdChfc3RhdGUpIHtcclxuICAgIFBsYXllckxlZnQgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxWYXJpYWJsZXMoKSB7XHJcbiAgICBfZGljZWlucHV0MSA9IFwiXCI7XHJcbiAgICBfZGljZWlucHV0MiA9IFwiXCI7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMSA9IC0xO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDIgPSAtMTtcclxuICAgIFBsYXllckxlZnQgPSBmYWxzZTtcclxuICAgIFByZXZpb3VzRGljZVJvbGwzID0gLTE7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsNCA9IC0xO1xyXG4gICAgX25leHRUdXJuaGFsZlBheSA9IGZhbHNlO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDUgPSAtMTtcclxuICAgIEdhbWVDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIHVzZXJHYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgQm90R2FtZU92ZXIgPSBmYWxzZTtcclxuICAgIENvcnJlY3RBbnN3ZXIgPSAwO1xyXG4gICAgUm9sbENvdW50ZXIgPSAwO1xyXG4gICAgRGljZVRlbXAgPSAwO1xyXG4gICAgRGljZVJvbGwgPSAwO1xyXG4gICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIFR1cm5DaGVja0FycmF5ID0gW107XHJcbiAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMgPSBbXTtcclxuICAgIEZvcmNlQ2hhbmdlVGltZU91dCA9IG51bGw7XHJcbiAgICBQYXNzZWRQYXlEYXkgPSBmYWxzZTtcclxuICAgIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgUGFzc2VkUGF5RGF5Q291bnRlciA9IDA7XHJcbiAgICBEb3VibGVQYXlEYXlDb3VudGVyID0gMDtcclxuXHJcbiAgICAvL2NhcmRzIGZ1bmN0aW9uYWxpdHlcclxuICAgIF9uZXh0VHVybkRvdWJsZVBheSA9IGZhbHNlO1xyXG4gICAgX3NraXBOZXh0VHVybiA9IGZhbHNlO1xyXG4gICAgX3NraXBOZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCB3aG9sZSBwYXkgZGF5XHJcbiAgICBfc2tpcEhNTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc2VzcyBvbmx5XHJcbiAgICBfc2tpcEJNTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgb25seVxyXG4gICAgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgIFR1cm5JblByb2dyZXNzID0gZmFsc2U7XHJcblxyXG4gICAgQmFja3NwYWNlcyA9IDM7XHJcbiAgICBpc0dhbWVPdmVyID0gZmFsc2U7XHJcbiAgICBPbmVRdWVzdGlvbkluZGV4ID0gLTE7XHJcbiAgICBPbmVRdWVzdGlvbnMgPSBbXCJ5b3UgaGF2ZSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1wiLCBcInlvdSBoYXZlIHRha2VuIGFueSBsb2FuP1wiLCBcInlvdSBoYXZlIGJhbmtydXB0ZWQgZXZlcj9cIiwgXCJ5b3VyIG5leHQgdHVybiBpcyBnb2luZyB0byBiZSBza2lwcGVkP1wiLCBcInlvdXIgbmV4dCBwYXlkYXkgaXMgZ29pbmcgdG8gYmUgZG91YmxlIHBheWRheT9cIl07XHJcblxyXG4gICAgQ2FyZERpc3BsYXlTZXRUaW1vdXQgPSBudWxsO1xyXG4gICAgVG90YWxDb3VudGVyUmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgTm9DYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIElucHV0VGVzdERpY2UxKF92YWwpIHtcclxuICAgIGlmIChfaXNUZXN0KSB7XHJcbiAgICAgIF9kaWNlaW5wdXQxID0gX3ZhbDtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBJbnB1dFRlc3REaWNlMihfdmFsKSB7XHJcbiAgICBpZiAoX2lzVGVzdCkge1xyXG4gICAgICBfZGljZWlucHV0MiA9IF92YWw7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jcmVnaW9uIEFsbCBGdW5jdGlvbnMgb2YgR2FtZU1hbmFnZXJcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiBjbGFzcyBpcyBjcmVhdGVkXHJcbiAgICoqL1xyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuUmVzZXRBbGxWYXJpYWJsZXMoKTtcclxuICAgIEdhbWVNYW5hZ2VyLkluc3RhbmNlID0gdGhpcztcclxuICAgIHRoaXMuVHVybk51bWJlciA9IDA7XHJcbiAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIFR1cm5DaGVja0FycmF5ID0gW107XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5TZWxlY3RlZE1vZGUgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgdGhpcy5Jbml0X0dhbWVNYW5hZ2VyKCk7XHJcblxyXG4gICAgdGhpcy5SYW5kb21DYXJkSW5kZXggPSAwO1xyXG4gICAgdGhpcy5DYXJkQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSBmYWxzZTtcclxuICAgIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gYXNzaWduIHJlZmVyZW5jZSBvZiByZXF1aXJlZCBjbGFzc2VzXHJcbiAgICoqL1xyXG4gIENoZWNrUmVmZXJlbmNlcygpIHtcclxuICAgIGlmICghR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9PSBudWxsKSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSByZXF1aXJlKFwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgaW5pdGlhbCBnYW1lbWFuYWdlciBlc3NldGlhbHNcclxuICAgKiovXHJcbiAgSW5pdF9HYW1lTWFuYWdlcigpIHtcclxuICAgIHRoaXMuQ2FtZXJhID0gdGhpcy5DYW1lcmFOb2RlLmdldENvbXBvbmVudChjYy5DYW1lcmEpO1xyXG4gICAgdGhpcy5pc0NhbWVyYVpvb21pbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm8gPSBbXTtcclxuICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIERpY2VSb2xsID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IHJlYWwgcGxheWVyc1xyXG4gICAgICAvL2lmIGpvaW5lZCBwbGF5ZXIgaXMgc3BlY3RhdGVcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IHRydWUpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwic3RhdHVzIG9mIGluaXRpYWwgYnVzaW5lc3Mgc2V0cDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKSk7XHJcblxyXG4gICAgICAgIC8vaWYgaW5pdGFsIHNldHVwIGhhcyBiZWVuIGRvbmUgYW5kIGdhbWUgaXMgdW5kZXIgd2F5XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIikgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgIHZhciBBbGxEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbyA9IEFsbERhdGE7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICB0aGlzLlR1cm5OdW1iZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiKTtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICAgICAgLy90aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gODtcclxuICAgICAgICAgIC8vdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Jbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IGJvdCBhbG9uZyB3aXRoIG9uZSBwbGF5ZXJcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLCBmYWxzZSwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBwdWJsaWMgZnVuY3Rpb25zIHRvIGdldCBkYXRhIChhY2Nlc3NpYmxlIGZyb20gb3RoZXIgY2xhc3NlcylcclxuICBHZXRUdXJuTnVtYmVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuVHVybk51bWJlcjtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGdldCBteSBpbmRleCBpbiBhcnJheSBvZiBQbGF5ZXJHYW1lSW5mbyBcclxuICAgKiovXHJcbiAgR2V0TXlJbmRleCgpIHtcclxuICAgIHZhciBteUluZGV4ID0gMDtcclxuICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfYWxsQWN0b3JzID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FsbEFjdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKF9hY3Rvci5QbGF5ZXJVSUQgPT0gX2FsbEFjdG9yc1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgbXlJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG15SW5kZXg7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNwZWN0YXRlTW9kZSBDb2RlXHJcblxyXG4gIFN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpIHtcclxuICAgIHZhciBBbGxEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIpO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mbyA9IEFsbERhdGE7XHJcbiAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5DbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJzeW5jaW5nIGFsbCBkYXRhIGZvciBzcGVjdGF0ZVwiKTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXIgPiAwICYmIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPT0gdHJ1ZSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsIF90b1Bvcy55KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNldHRpbmcgcG9zMVwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjb3VudGVyOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkluaXRpYWwgQ291bnRlciBBc3NpZ25lZDogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Jbml0aWFsQ291bnRlckFzc2lnbmVkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgZmluaXNoZWQgOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgdmFyIF9sYXN0SW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoIC0gMTtcclxuICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2xhc3RJbmRleF0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19sYXN0SW5kZXhdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKF90b1Bvcy54LCBfdG9Qb3MueSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXR0aW5nIHBvczJcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKFwic3luY2VkIHBsYXllcm5vZGVzXCIpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKCkge1xyXG4gICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgaWYgKFR1cm5DaGVja0FycmF5Lmxlbmd0aCA9PSBUb3RhbENvbm5lY3RlZFBsYXllcnMpIHtcclxuICAgICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgICAgdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gZnVuY3Rpb25zIHJlbGF0ZWQgdG8gVHVybiBNZWNoYW5pc20gYW5kIGNhcmQgbWVjaGFuaXNtXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSB3aGF0IGNhcmQgaGFzIGJlZW4gc2VsZWN0ZWQgYnkgcGxheWVyXHJcbiAgICoqL1xyXG4gIFJhaXNlRXZlbnRGb3JDYXJkKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDUsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBDbGVhckRpc3BsYXlUaW1lb3V0KCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICB9LFxyXG5cclxuICBEaXNwbGF5Q2FyZE9uT3RoZXJzKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FyZCBldmVudCByZWNlaXZlZDogXCIgKyBDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgICAgIGlmIChDYXJkRXZlbnRSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IodGhpcy5DYXJkQ291bnRlcik7XHJcbiAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMuQ2FyZERpc3BsYXllZCkge1xyXG4gICAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkID0gdHJ1ZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLkNhcmRDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKGZhbHNlLCB0aGlzLlJhbmRvbUNhcmRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIENhcmREaXNwbGF5U2V0VGltb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAvL2NoZWNrIGFmdGVyIGV2ZXJ5IDAuNSBzZWNvbmRzXHJcbiAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0Q2FyZERpc3BsYXkoKSB7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRGb3JDYXJkKF9kYXRhKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgY29uc29sZS5sb2coXCJDYXJkIERhdGEgUmVjZWl2ZWQ6XCIpO1xyXG4gICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG5cclxuICAgIHZhciBSYW5kb21DYXJkID0gX2RhdGEucmFuZG9tQ2FyZDtcclxuICAgIHZhciBjb3VudGVyID0gX2RhdGEuY291bnRlcjtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleCA9IFJhbmRvbUNhcmQ7XHJcbiAgICB0aGlzLkNhcmRDb3VudGVyID0gY291bnRlcjtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZSh0cnVlLCBSYW5kb21DYXJkKTtcclxuICAgICAgZWxzZSBDYXJkRXZlbnRSZWNlaXZlZCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSBmYWxzZSkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UodHJ1ZSwgUmFuZG9tQ2FyZCk7XHJcbiAgICAgIGVsc2UgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsIFJhbmRvbUNhcmQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUuZXJyb3IoQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSBwYXJ0aWN1bGFyIHBsYXllciBoYXMgY29tcGxldGUgdGhlaXIgbW92ZVxyXG4gICAqKi9cclxuICBSYWlzZUV2ZW50VHVybkNvbXBsZXRlKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwicmFpc2VkIGZvciB0dXJuIGNvbXBsZXRlXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN5bmNBbGxEYXRhKCkge1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsIHRoaXMuUGxheWVyR2FtZUluZm8sIHRydWUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIG9uIGFsbCBwbGF5ZXJzIHRvIHZhbGlkYXRlIGlmIG1vdmUgaXMgY29tcGxldGVkIG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50c1xyXG4gICAqKi9cclxuICBSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUoX3VpZCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9yZWFsIHBsYXllcnNcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoVHVybkNoZWNrQXJyYXkubGVuZ3RoID09IDApIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7XHJcblxyXG4gICAgICAgIHZhciBBcnJheUxlbmd0aCA9IFR1cm5DaGVja0FycmF5Lmxlbmd0aDtcclxuICAgICAgICB2YXIgSURGb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBcnJheUxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKFR1cm5DaGVja0FycmF5W2luZGV4XSA9PSBfdWlkKSBJREZvdW5kID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghSURGb3VuZCkge1xyXG4gICAgICAgICAgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnMgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2pdLklzQWN0aXZlKSBUb3RhbENvbm5lY3RlZFBsYXllcnMrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVHVybiBDaGVjazogXCIgKyBUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG90YWwgQ29ubmVjdGVkIFBsYXllcnM6IFwiICsgVG90YWxDb25uZWN0ZWRQbGF5ZXJzKTtcclxuXHJcbiAgICAgICAgaWYgKFR1cm5DaGVja0FycmF5Lmxlbmd0aCA+PSBUb3RhbENvbm5lY3RlZFBsYXllcnMpIHtcclxuICAgICAgICAgIFR1cm5DaGVja0FycmF5ID0gW107XHJcbiAgICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICAvL3RoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICB0aGlzLlR1cm5Db21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBkaWNlIGFuaW1hdGlvbiBpcyBwbGF5ZWQgb24gYWxsIHBsYXllcnNcclxuICAgKiovXHJcbiAgQ2hhbmdlVHVybigpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHRoaXMuU3luY0FsbERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5UdXJuTnVtYmVyIDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB0aGlzLlR1cm5OdW1iZXIgPSB0aGlzLlR1cm5OdW1iZXIgKyAxO1xyXG4gICAgZWxzZSB0aGlzLlR1cm5OdW1iZXIgPSAwO1xyXG5cclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMiwgdGhpcy5UdXJuTnVtYmVyKTtcclxuICB9LFxyXG5cclxuICBSZXNldFNvbWVWYWx1ZXMoKSB7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuICB9LFxyXG5cclxuICBDaGFuZ2VUdXJuRm9yY2VmdWxseSgpIHtcclxuICAgIGlmIChJc1R3ZWVuaW5nKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChGb3JjZUNoYW5nZVRpbWVPdXQpO1xyXG4gICAgICBGb3JjZUNoYW5nZVRpbWVPdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm5Gb3JjZWZ1bGx5KCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KEZvcmNlQ2hhbmdlVGltZU91dCk7XHJcbiAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVZpc3VhbERhdGEoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgZnJvbSByYWlzZSBvbiBldmVudCAoZnJvbSBmdW5jdGlvbiBcIlN0YXJ0VHVyblwiIGFuZCBcIkNoYW5nZVR1cm5cIiBvZiB0aGlzIHNhbWUgY2xhc3MpIHRvIGhhbmRsZSB0dXJuXHJcbiAgICoqL1xyXG4gIFR1cm5IYW5kbGVyKF90dXJuKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB2YXIgX2lzTWFzdGVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQoKTtcclxuICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW190dXJuXS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgIGlmIChfaXNNYXN0ZXIpIHtcclxuICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy90aGlzLkNsZWFyRGlzcGxheVRpbWVvdXQoKTtcclxuICAgIHRoaXMuVXBkYXRlVmlzdWFsRGF0YSgpO1xyXG4gICAgY29uc29sZS5sb2coXCJUdXJuOiBcIiArIF90dXJuKTtcclxuICAgIHZhciBfcGxheWVyTWF0Y2hlZCA9IGZhbHNlO1xyXG4gICAgX3NraXBOZXh0VHVybiA9IGZhbHNlO1xyXG4gICAgaWYgKElzVHdlZW5pbmcpIHtcclxuICAgICAgLy9jaGVjayBpZiBhbmltYXRpb24gb2YgdHVybiBiZWluZyBwbGF5ZWQgb24gb3RoZXIgcGxheWVyc1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgIHRoaXMuVHVybkhhbmRsZXIoX3R1cm4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgODAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuVHVybk51bWJlciA9IF90dXJuO1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VyR2FtZU92ZXIpO1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIF9za2lwTmV4dFR1cm4gPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgaWYgKCF1c2VyR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3ModHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICghX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIHlvdXIgdHVybiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gLy90dXJuIGRlY2lzaW9ucyBmb3IgYm90XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgIGlmICghQm90R2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUm9sbERpY2UoKTtcclxuICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSwgdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIHRoaXMuVHVybk51bWJlciwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUdXJuIE9mOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbFBsYXllclVJW3RoaXMuVHVybk51bWJlcl0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUGxheWVySW5mbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy9za2lwIHRoaXMgdHVybiBhcyBza2lwIHR1cm4gaGFzIGJlZW4gY2FsbGVkIGJlZm9yZVxyXG4gICAgICBpZiAoX3BsYXllck1hdGNoZWQgJiYgX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsIDEyMDApO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2tpcE5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9pbmQpIHtcclxuICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICB2YXIgTXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgdmFyIF9jb3VudGVyID0gX2luZDtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAvLyAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uSXNBY3RpdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoX2NvdW50ZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwic3luY2VkIERhdGE6XCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQgPT0gTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0gPSBNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcblxyXG4gICAgICAgICAgaWYgKF9jb3VudGVyIDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN5bmNlZCBEYXRhOlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBhbGwgcGxheWVycyBoYXZlIGRvbmUgdGhlaXIgaW5pdGlhbCBzZXR1cCBhbmQgZmlyc3QgdHVybiBzdGFydHNcclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi9cclxuICBTdGFydFR1cm4oKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICB0aGlzLlR1cm5OdW1iZXIgPSAwOyAvL3Jlc2V0aW5nIHRoZSB0dXJuIG51bWJlciBvbiBzdGFydCBvZiB0aGUgZ2FtZVxyXG5cclxuICAgIC8vc2VuZGluZyBpbml0aWFsIHR1cm4gbnVtYmVyIG92ZXIgdGhlIG5ldHdvcmsgdG8gc3RhcnQgdHVybiBzaW11bHRhbm91c2x5IG9uIGFsbCBjb25uZWN0ZWQgcGxheWVyJ3MgZGV2aWNlc1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVCYW5rcnVwdERhdGEoX2RhdGEpIHtcclxuICAgIC8vb3RoZXIgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcclxuICAgIHZhciBfaXNCYW5rcnVwdGVkID0gX2RhdGEuRGF0YS5iYW5rcnVwdGVkO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS50dXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhTWFpbjtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhfaXNCYW5rcnVwdGVkKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF90dXJuKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF9wbGF5ZXJEYXRhKTtcclxuXHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW190dXJuXSA9IF9wbGF5ZXJEYXRhO1xyXG5cclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuXHJcbiAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIHRoaXMuVHVybk51bWJlciwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKSB7XHJcbiAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSh0cnVlKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXModHJ1ZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB9LCAxMDAwKTtcclxuXHJcbiAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsIHRoaXMuVHVybk51bWJlciwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBGdW5jdGlvbiBmb3IgZ2FtZXBsYXlcclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcGxheWVyIFVJIChuYW1lL2ljb25zL251bWJlciBvZiBwbGF5ZXJzIHRoYXQgdG8gYmUgYWN0aXZlIGV0YylcclxuICAgIEBtZXRob2QgQXNzaWduUGxheWVyR2FtZVVJXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi9cclxuICBBc3NpZ25QbGF5ZXJHYW1lVUkoX2lzQmFua3J1cHRlZCA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgaWYgKCFfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgdmFyIF9yYW5kb21JbmRleCA9IHRoaXMuZ2V0UmFuZG9tKDAsIHRoaXMuQm90R2FtZUluZm8ubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvLnB1c2godGhpcy5Cb3RHYW1lSW5mb1tfcmFuZG9tSW5kZXhdKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSAyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5QbGF5ZXJJbmZvID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlNldEF2YXRhcih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5BdmF0YXJJRCk7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUdhbWVVSShfdG9nZ2xlSGlnaGxpZ2h0LCBfaW5kZXgpIHtcclxuICAgIGlmIChfdG9nZ2xlSGlnaGxpZ2h0KSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbX2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5QbGF5ZXJJbmZvID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfaW5kZXhdO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfaW5kZXggPT0gaW5kZXgpIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5Ub2dnbGVUZXh0aWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGVuYmFsZSByZXNwZWN0aXZlIHBsYXllcnMgbm9kZXMgaW5zaWRlIGdhbWFwbGF5XHJcbiAgICBAbWV0aG9kIEVuYWJsZVBsYXllck5vZGVzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi9cclxuICBFbmFibGVQbGF5ZXJOb2RlcyhfaXNCYW5rcnVwdGVkID0gZmFsc2UpIHtcclxuICAgIGlmICghX2lzQmFua3J1cHRlZCkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSG9tZUJhc2VkQW1vdW50ID09IDEgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLngsIHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50ID09IDEgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLngsIHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLnkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkhvbWVCYXNlZEFtb3VudCA9PSAxKSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ccmlja0FuZE1vcnRhckFtb3VudCA9PSAxKSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5BdmF0YXJTcHJpdGVzW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEXTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKCkge1xyXG4gICAgbGV0IHRhcmdldFBvcyA9IHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLCAxMjApKTtcclxuICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbiA9IHRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuXHJcbiAgICBsZXQgcmF0aW8gPSB0YXJnZXRQb3MueSAvIGNjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMjtcclxuICB9LFxyXG5cclxuICBsYXRlVXBkYXRlKCkge1xyXG4gICAgaWYgKHRoaXMuaXNDYW1lcmFab29taW5nKSB0aGlzLlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKTtcclxuICB9LFxyXG5cclxuICBzeW5jRGljZVJvbGwoX3JvbGwpIHtcclxuICAgIHZhciBfZGljZTEgPSBfcm9sbC5kaWNlMTtcclxuICAgIHZhciBfZGljZTIgPSBfcm9sbC5kaWNlMjtcclxuICAgIHZhciBfcmVzdWx0ID0gX2RpY2UxICsgX2RpY2UyO1xyXG5cclxuICAgIElzVHdlZW5pbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPT0gMCAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlID09IDIpIHtcclxuICAgICAgICBSb2xsQ291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkID0gdHJ1ZTtcclxuICAgICAgICBSb2xsQ291bnRlciA9IDEzO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID09IDEyKSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgKyAyMTtcclxuICAgICAgZWxzZSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgKyAxO1xyXG5cclxuICAgICAgUm9sbENvdW50ZXIgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIgLSAxKTtcclxuICAgIH1cclxuXHJcbiAgICBEaWNlUm9sbCA9IF9yZXN1bHQ7XHJcbiAgICBEaWNlVGVtcCA9IDA7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKERpY2VSb2xsKTtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHRoaXMuVHVybk51bWJlciA9PSBpbmRleCkge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uZ2V0Q29tcG9uZW50KFwiRGljZUNvbnRyb2xsZXJcIikuQW5pbWF0ZURpY2UoX2RpY2UxLCBfZGljZTIpO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgIC8vIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgIC8vIHRoaXMuVHdlZW5DYW1lcmEoX3Bvcyx0cnVlLDAuNCk7XHJcbiAgfSxcclxuXHJcbiAgRGljZUZ1bnRpb25hbGl0eSgpIHtcclxuICAgIGxldCB0YXJnZXRQb3MgPSB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwgMTIwKSk7XHJcbiAgICB2YXIgX3BvcyA9IHRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgIHRoaXMuVHdlZW5DYW1lcmEoX3BvcywgdHJ1ZSwgMC40KTtcclxuICB9LFxyXG5cclxuICBUZW1wQ2hlY2tTcGFjZShfcm9sbGluZykge1xyXG4gICAgdmFyIHRlbXBjb3VudGVyID0gMDtcclxuICAgIHZhciB0ZW1wY291bnRlcjIgPSAwO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICB0ZW1wY291bnRlcjIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGVtcGNvdW50ZXIyIC0gMSA8IDApIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcInN0YXJ0aW5nIGZyb20gb2JsaXZpb25cIik7XHJcbiAgICAgIHRlbXBjb3VudGVyID0gdGVtcGNvdW50ZXIyICsgX3JvbGxpbmcgLSAxO1xyXG4gICAgICB2YXIgZGljZXRvYmUgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIgKyBkaWNldG9iZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZW1wY291bnRlciA9IHRlbXBjb3VudGVyMiArIF9yb2xsaW5nO1xyXG4gICAgICB2YXIgZGljZXRvYmUgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIgKyBkaWNldG9iZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUm9sbERpY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICB2YXIgRGljZTE7XHJcbiAgICAgIHZhciBEaWNlMjtcclxuICAgICAgaWYgKF9pc1Rlc3QgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgRGljZTEgPSBwYXJzZUludChfZGljZWlucHV0MSk7XHJcbiAgICAgICAgRGljZTIgPSBwYXJzZUludChfZGljZWlucHV0Mik7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IHRydWUgJiYgX2lzVGVzdCkge1xyXG4gICAgICAgIERpY2UxID0gNDtcclxuICAgICAgICBEaWNlMiA9IDQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuICAgICAgICBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDEgPT0gRGljZTEpIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMiA9PSBEaWNlMikgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICAgICAgUHJldmlvdXNEaWNlUm9sbDEgPSBEaWNlMTtcclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsMiA9IERpY2UyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB2YXIgRGljZTE9MjA7XHJcbiAgICAgIC8vIHZhciBEaWNlMj0xO1xyXG5cclxuICAgICAgRGljZVJvbGwgPSBEaWNlMSArIERpY2UyO1xyXG4gICAgICB2YXIgX25ld1JvbGwgPSB7IGRpY2UxOiBEaWNlMSwgZGljZTI6IERpY2UyIH07XHJcbiAgICAgIC8vRGljZVJvbGw9MjM7XHJcbiAgICAgIC8vdGhpcy5UZW1wQ2hlY2tTcGFjZShEaWNlUm9sbCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZGljZSBudW1iZXI6IFwiICsgRGljZVJvbGwgKyBcIiwgRGljZTE6XCIgKyBEaWNlMSArIFwiLCBEaWNlMjpcIiArIERpY2UyKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMywgX25ld1JvbGwpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJvbGxPbmVEaWNlKCkge1xyXG4gICAgdmFyIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGw1ID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIFByZXZpb3VzRGljZVJvbGw1ID0gRGljZTE7XHJcblxyXG4gICAgcmV0dXJuIERpY2UxO1xyXG4gIH0sXHJcblxyXG4gIFJvbGxUd29EaWNlcygpIHtcclxuICAgIHZhciBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgdmFyIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGwzID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIGlmIChQcmV2aW91c0RpY2VSb2xsNCA9PSBEaWNlMikgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMyA9IERpY2UxO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDQgPSBEaWNlMjtcclxuXHJcbiAgICByZXR1cm4gRGljZTEgKyBEaWNlMjtcclxuICB9LFxyXG5cclxuICBjYWxsVXBvbkNhcmQoKSB7XHJcbiAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBfc3BhY2VJRCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICBpZiAoX3NwYWNlSUQgIT0gNiAmJiBfc3BhY2VJRCAhPSA3KSB7XHJcbiAgICAgICAgICAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVuYXMgc2VsbCBzcGFjZVxyXG4gICAgICAgICAgdmFyIFJhbmRvbUNhcmQgPSB0aGlzLmdldFJhbmRvbSgwLCAxNSk7XHJcblxyXG4gICAgICAgICAgLy9mb3IgdGVzdGluZyBvbmx5XHJcbiAgICAgICAgICBpZiAoX3NwYWNlSUQgPT0gMikge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIGJpZyBidXNpbmVzc1xyXG4gICAgICAgICAgICB2YXIgdmFsdWVJbmRleCA9IFswLCAxLCA3LCAxMCwgMiwgMywgNCwgNSwgNiwgOF07XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDEwKTtcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSAxO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSA1KSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgbG9zc2VzIGNhcmRzXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4ID0gWzAsIDEsIDUsIDYsIDIsIDcsIDMsIDQsIDgsIDldO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCAxMCk7XHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB2YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgLy8gUmFuZG9tQ2FyZCA9IDA7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF9zcGFjZUlEID09IDMpIHtcclxuICAgICAgICAgICAgLy9sYW5kZWQgb24gc29tZSBtYXJrZXRpbmcgY2FyZHNcclxuICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXggPSBbMCwgNywgMywgOCwgMTMsIDksIDEsIDIsIDQsIDVdO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCAxMCk7XHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB2YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gNTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3NwYWNlSUQgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIHdpbGQgY2FyZHNcclxuICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXggPSBbMCwgMSwgNiwgMTAsIDIsIDMsIDQsIDUsIDcsIDgsIDldO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCAxMSk7XHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB2YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgLy8gUmFuZG9tQ2FyZCA9IDk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihfc3BhY2VJRCk7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJcclxuICAgICAgICAgICAgaWYgKF9zcGFjZUlEID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgLy8gaWYgcGxheWVyIGxhbmRlZCBvbiBmaW5pc2ggc3BhY2VcclxuICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIFNlbmRpbmdEYXRhID0geyByYW5kb21DYXJkOiBSYW5kb21DYXJkLCBjb3VudGVyOiBSb2xsQ291bnRlciB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgICAgICBpZiAoX3NwYWNlSUQgPT0gMTIpIHtcclxuICAgICAgICAgICAgICAvLyBpZiBwbGF5ZXIgbGFuZGVkIG9uIGZpbmlzaCBzcGFjZVxyXG4gICAgICAgICAgICAgIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyA1O1xyXG4gICAgICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YSA9IHsgcmFuZG9tQ2FyZDogUmFuZG9tQ2FyZCwgY291bnRlcjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNCb3QgJiYgQm90R2FtZU92ZXIpIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNCb3QgJiYgdXNlckdhbWVPdmVyKSB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImNvbXBsZXRlIHR1cm4gaXMgY2FsbGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQodHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY29tcGxldGVDYXJkVHVybigpIHtcclxuICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgIGNvbnNvbGUubG9nKFwibGFuZGVkIG9uIHBheSBkYXkgb3IgZG91YmxlIHBheSBkYXkgYW5kIHdvcmsgaXMgZG9uZSBzbyBjaGFuZ2luZyB0dXJuXCIpO1xyXG4gICAgdGhpcy5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgfSxcclxuXHJcbiAgQ2FsbEdhbWVDb21wbGV0ZShfaXNCb3QgPSBmYWxzZSwgX2ZvcmNlR2FtZU92ZXIgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAvLyBpZiAoX2ZvcmNlR2FtZU92ZXIpIHtcclxuICAgICAgLy8gICAgIHRoaXMuVHVybk51bWJlciA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG4gICAgICAvLyB9XHJcblxyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU2NvcmUgPSAwO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJwbGF5ZXIgaXMgbm90IGFjdGl2ZSByZXR1cm5pbmdcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjYWxjdWxhdGluZy4uLi5cIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImFnbWUgaXMgbm90IGZpbmlzaGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLmlzR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICB2YXIgX2Nhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICAgIHZhciBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgIHZhciBCTUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgICAgdmFyIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIGxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgICAgbG9hbkFtb3VudCArPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgX2dvbGQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50O1xyXG4gICAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgICB2YXIgX2RpY2VSYW5kb20gPSB0aGlzLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgdmFyIE9uY2VPclNoYXJlID0gX2RpY2VSYW5kb20gKiAxMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgICB2YXIgU3RvY2tDYXNoID0gT25jZU9yU2hhcmUgKiBfc3RvY2tzO1xyXG5cclxuICAgICAgICAgIHZhciBCTUNhc2ggPSAoQk1BbW91bnQgKyBCTUxvY2F0aW9ucykgKiAxNTAwMDA7XHJcblxyXG4gICAgICAgICAgdmFyIEhNQ2FzaCA9IDA7XHJcbiAgICAgICAgICBpZiAoSE1BbW91bnQgPT0gMSkgSE1DYXNoID0gNjAwMDA7XHJcbiAgICAgICAgICBlbHNlIGlmIChITUFtb3VudCA9PSAyKSBITUNhc2ggPSAyNTAwMCArIDYwMDAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMykgSE1DYXNoID0gMjUwMDAgKyAyNTAwMCArIDYwMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBUb3RhbEFzc2V0cyA9IF9jYXNoICsgQk1DYXNoICsgSE1DYXNoICsgR29sZENhc2ggKyBTdG9ja0Nhc2ggLSBsb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gVG90YWxBc3NldHM7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxIQkNhc2ggPSBITUNhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxCTUNhc2ggPSBCTUNhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxHb2xkQ2FzaCA9IEdvbGRDYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU3RvY2tzQ2FzaCA9IFN0b2NrQ2FzaDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvYW5CYWxhbmNlID0gbG9hbkFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XSk7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJEYXRhIHB1c2hlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IF9wbGF5ZXJJbmRleCA9IDA7IF9wbGF5ZXJJbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBfcGxheWVySW5kZXgrKykge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfY2FzaCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHZhciBITUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgdmFyIEJNQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUxvY2F0aW9ucyA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuXHJcbiAgICAgICAgdmFyIGxvYW5BbW91bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIGxvYW5BbW91bnQgKz0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIF9nb2xkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudDtcclxuICAgICAgICB2YXIgX3N0b2NrcyA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50O1xyXG5cclxuICAgICAgICB2YXIgX2RpY2VSYW5kb20gPSB0aGlzLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIHZhciBPbmNlT3JTaGFyZSA9IF9kaWNlUmFuZG9tICogMTAwMDtcclxuXHJcbiAgICAgICAgdmFyIEdvbGRDYXNoID0gT25jZU9yU2hhcmUgKiBfZ29sZDtcclxuICAgICAgICB2YXIgU3RvY2tDYXNoID0gT25jZU9yU2hhcmUgKiBfc3RvY2tzO1xyXG5cclxuICAgICAgICB2YXIgQk1DYXNoID0gKEJNQW1vdW50ICsgQk1Mb2NhdGlvbnMpICogMTUwMDAwO1xyXG5cclxuICAgICAgICB2YXIgSE1DYXNoID0gMDtcclxuICAgICAgICBpZiAoSE1BbW91bnQgPT0gMSkgSE1DYXNoID0gNjAwMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMikgSE1DYXNoID0gMjUwMDAgKyA2MDAwMDtcclxuICAgICAgICBlbHNlIGlmIChITUFtb3VudCA9PSAzKSBITUNhc2ggPSAyNTAwMCArIDI1MDAwICsgNjAwMDA7XHJcblxyXG4gICAgICAgIHZhciBUb3RhbEFzc2V0cyA9IF9jYXNoICsgQk1DYXNoICsgSE1DYXNoICsgR29sZENhc2ggKyBTdG9ja0Nhc2ggLSBsb2FuQW1vdW50O1xyXG5cclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTY29yZSA9IFRvdGFsQXNzZXRzO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEhCQ2FzaCA9IEhNQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxCTUNhc2ggPSBCTUNhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsR29sZENhc2ggPSBHb2xkQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTdG9ja3NDYXNoID0gU3RvY2tDYXNoO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvYW5CYWxhbmNlID0gbG9hbkFtb3VudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoX2RhdGEpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNiwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDE2LCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgU3luY0dhbWVPdmVyKF9VSUQpIHtcclxuICAgIHZhciBpbmZvVGV4dCA9IFwiXCI7XHJcbiAgICB2YXIgc3RhdHVzVGV4dCA9IFwiXCI7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgaWYgKCFHYW1lQ29tcGxldGVkKSB7XHJcbiAgICAgICAgR2FtZUNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0RGF0YSgpO1xyXG4gICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgdmFyIE15RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdmFyIF9pbmRleCA9IC0xO1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQgPT0gX1VJRCkge1xyXG4gICAgICAgICAgICAgIF9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc3RhdHVzVGV4dCA9IFwiR2FtZSB3b24gYnkgXCIgKyBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAgICAgLy95b3Ugd29uXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkNvbmdyYXRzISB5b3UgaGF2ZSB3b24gdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgX2N1cnJlbnRDYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgICAgICAgICB2YXIgX3RvdGFsID0gX2N1cnJlbnRDYXNoICsgcGFyc2VJbnQoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gX3RvdGFsLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3dvbiA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uKTtcclxuICAgICAgICAgICAgX3dvbiA9IF93b24gKyAxO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbiA9IF93b24udG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKF90b3RhbCwgX3dvbiwgLTEpO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJVbmZvcnR1bmF0ZWx5ISB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiO1xyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vd2l0aCBib3RcclxuICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICB2YXIgTXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKE15RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzBdLkdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmIChNeURhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICBzdGF0dXNUZXh0ID0gXCJDb25ncmF0cyEgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiO1xyXG4gICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiT3RoZXIgUGxheWVyIEVhcm5lZCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMV0uVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICB2YXIgX2N1cnJlbnRDYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgICAgIHZhciBfdG90YWwgPSBfY3VycmVudENhc2ggKyBwYXJzZUludChNeURhdGEuVG90YWxTY29yZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2ggPSBfdG90YWwudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgdmFyIF93b24gPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbik7XHJcbiAgICAgICAgX3dvbiA9IF93b24gKyAxO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uID0gX3dvbi50b1N0cmluZygpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKF90b3RhbCwgX3dvbiwgLTEpO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy95b3UgbG9zZVxyXG5cclxuICAgICAgICBzdGF0dXNUZXh0ID0gXCJVbmZvcnR1bmF0ZWx5ISB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiO1xyXG4gICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiT3RoZXIgUGxheWVyIEVhcm5lZCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMV0uVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTeW5jR2FtZUNvbXBsZXRlRGF0YShfZGF0YSkge1xyXG4gICAgdmFyIF9pc0JvdCA9IF9kYXRhLkJvdDtcclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKHRydWUsIGZhbHNlKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJHYW1lIG92ZXIsIGNhbGN1bGF0aW5nIHRvdGFsIGNhc2guLi5cIiwgMTUwMCwgZmFsc2UpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcblxyXG4gICAgICAgIHZhciBtYXggPSAtMTtcclxuICAgICAgICB2YXIgU2VsZWN0ZWRJbmQgPSAwO1xyXG4gICAgICAgIHZhciBTZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICBpZiAoX3ZhbHVlID4gbWF4KSB7XHJcbiAgICAgICAgICAgIFNlbGVjdGVkSW5kID0gaW5kZXg7XHJcbiAgICAgICAgICAgIG1heCA9IF92YWx1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChTZXNzaW9uRGF0YVtpbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfdmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS50cmFjZShcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIgKyBTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLlBsYXllclVJRCk7XHJcbiAgICAgIH0sIDE1MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUoZmFsc2UsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIkdhbWUgb3ZlciwgY2FsY3VsYXRpbmcgdG90YWwgY2FzaC4uLlwiLCAxNTAwLCBmYWxzZSk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkpO1xyXG4gICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG5cclxuICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAgIHZhciBtYXggPSAtMTtcclxuICAgICAgICAgIHZhciBTZWxlY3RlZEluZCA9IDA7XHJcbiAgICAgICAgICB2YXIgU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coU2Vzc2lvbkRhdGEpO1xyXG5cclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKFNlc3Npb25EYXRhW2luZGV4XS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKF92YWx1ZSA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgU2VsZWN0ZWRJbmQgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIG1heCA9IF92YWx1ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChTZXNzaW9uRGF0YVtpbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coX3ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnNvbGUudHJhY2UoXCJnYW1lIHdvbiBieSBwbGF5ZXIgaWQ6IFwiICsgU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLlBsYXllclVJRCk7XHJcbiAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBBbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZChfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9kYXRhID0geyBCb3Q6IF9pc0JvdCB9O1xyXG4gICAgdGhpcy5SYWlzZUV2ZW50VG9TeW5jR2FtZUNvbXBsZXRlRGF0YShfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgR2FtZU92ZXIoX2ZvcmNlR2FtZU92ZXIgPSBmYWxzZSkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGlmIChfZm9yY2VHYW1lT3Zlcikge1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dE9ubHkoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgICB2YXIgcGxheWVyY29tcGxldGVkID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAvLyAgIGlmIChNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuaXNHYW1lRmluaXNoZWQpIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUgPT0gZmFsc2UgfHwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY29tcGxldGVkOiBcIiArIHBsYXllcmNvbXBsZXRlZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgZ2FtZWluZm8gbGVuZ3RoOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKTtcclxuICAgICAgICBpZiAocGxheWVyY29tcGxldGVkID49IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoIHx8IF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAvL2dhbWUgY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1cclxuICAgICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCkgQm90R2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICBlbHNlIHVzZXJHYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcInVzZXJnYW1lb3ZlcjogXCIgKyB1c2VyR2FtZU92ZXIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImJvdGdhbWVvdmVyOiBcIiArIEJvdEdhbWVPdmVyKTtcclxuICAgICAgLy8gdGhpcy5DYWxsR2FtZUNvbXBsZXRlKHRydWUpO1xyXG4gICAgICB2YXIgcGxheWVyY29tcGxldGVkID0gMDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBsYXllcmNvbXBsZXRlZCA9PSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCkge1xyXG4gICAgICAgIC8vZ2FtZWNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtc1xyXG4gICAgICAgIEJvdEdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICB1c2VyR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIFN0YXJ0RGljZVJvbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChSb2xsQ291bnRlciA+PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiR2FtZW92ZXJcIik7XHJcbiAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5HYW1lT3ZlcihmYWxzZSk7XHJcbiAgICAgIH0sIDE1MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgRGljZVRlbXAgPSBEaWNlVGVtcCArIDE7XHJcbiAgICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuVHdlZW5QbGF5ZXIodGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0UmFuZG9tOiBmdW5jdGlvbiAobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgfSxcclxuXHJcbiAgVHdlZW5DYW1lcmE6IGZ1bmN0aW9uIChfcG9zLCBpc1pvb20sIHRpbWUpIHtcclxuICAgIGNjLnR3ZWVuKHRoaXMuQ2FtZXJhTm9kZSlcclxuICAgICAgLnRvKHRpbWUsIHsgcG9zaXRpb246IGNjLnYyKF9wb3MueCwgX3Bvcy55KSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzWm9vbSkgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgICBlbHNlIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICB9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICBab29tQ2FtZXJhSW4oKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA8IDIpIHtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSB0aGlzLkNhbWVyYS56b29tUmF0aW8gKyAwLjAzO1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMjtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICB9LFxyXG5cclxuICBDaGVja1BheURheUNvbmRpdGlvbnMoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIGlmIChSb2xsQ291bnRlciA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2KSB7XHJcbiAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gUGFzc2VkUGF5RGF5Q291bnRlciArIDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNykge1xyXG4gICAgICAgIERvdWJsZVBheURheSA9IHRydWU7XHJcbiAgICAgICAgRG91YmxlUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9uZXh0VHVybkRvdWJsZVBheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheTtcclxuICAgIF9uZXh0VHVybmhhbGZQYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5IYWxmUGF5RGF5O1xyXG5cclxuICAgIGlmIChQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSAmJiAhX25leHRUdXJuRG91YmxlUGF5KSB7XHJcbiAgICAgIC8vdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgIC8vdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKGZhbHNlLCBfaXNCb3QpO1xyXG4gICAgfSBlbHNlIGlmIChEb3VibGVQYXlEYXkgfHwgKFBhc3NlZFBheURheSAmJiBfbmV4dFR1cm5Eb3VibGVQYXkpKSB7XHJcbiAgICAgIC8vdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgIC8vdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKHRydWUsIF9pc0JvdCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFpvb21DYW1lcmFPdXRPbmx5KCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkNhbWVyYS56b29tUmF0aW8gPj0gMSkge1xyXG4gICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gdGhpcy5DYW1lcmEuem9vbVJhdGlvIC0gMC4wMztcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uID0gY2MuVmVjMigwLCAwKTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAxO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfSxcclxuXHJcbiAgWm9vbUNhbWVyYU91dCgpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5DYW1lcmEuem9vbVJhdGlvID49IDEpIHtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IHRoaXMuQ2FtZXJhLnpvb21SYXRpbyAtIDAuMDM7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uID0gY2MuVmVjMigwLCAwKTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAxO1xyXG4gICAgICAgIC8vIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKDApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCAmJiAhQm90R2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnModGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ICYmICF1c2VyR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgICAgLy9yZWFsIHBsYXllclxyXG4gICAgICAgICAgaWYgKFBsYXllckxlZnQpIHtcclxuICAgICAgICAgICAgLy8gSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBQbGF5ZXJMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKCk7XHJcbiAgICAgICAgICBlbHNlIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfSxcclxuXHJcbiAgVHdlZW5QbGF5ZXI6IGZ1bmN0aW9uIChOb2RlLCBUb1Bvcykge1xyXG4gICAgY2MudHdlZW4oTm9kZSkgLy8wLjRcclxuICAgICAgLnRvKDAuNCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmIChEaWNlVGVtcCA8IERpY2VSb2xsKSB7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhEaWNlVGVtcCArIFwiIFwiICsgUm9sbENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFCb3RHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNiB8fFxyXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gN1xyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJib3QgZ2FtZSBpcyBvdmVyXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoIXVzZXJHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNiB8fFxyXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gN1xyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLy8gY29uc29sZS5lcnJvcihQYXNzZWRQYXlEYXlDb3VudGVyKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGdhbWUgaXMgb3ZlciBza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFBhc3NlZFBheURheSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgRG91YmxlUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgRG91YmxlUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBmaW5pc2hlZCBmb3I6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChSb2xsQ291bnRlciA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKFJvbGxDb3VudGVyID09IDEyKSBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMjE7XHJcbiAgICAgICAgICAgIGVsc2UgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDE7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMTtcclxuICAgICAgICAgICAgRGljZVRlbXAgPSBEaWNlUm9sbDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvL0RpY2VUZW1wPURpY2VUZW1wKzE7XHJcbiAgICAgICAgICAvLyAgY29uc29sZS5sb2coRGljZVRlbXAgKyBcIiBcIiArIFJvbGxDb3VudGVyKTtcclxuXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgIC8vdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgX25ld3BvcyA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgICB0aGlzLlR3ZWVuQ2FtZXJhKF9uZXdwb3MsIGZhbHNlLCAwLjYpOyAvL3pvb21vdXRcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIC8vcnVsZXMgaW1wbG1lbnRhdGlvbiBkdXJpbmcgdHVybiAodHVybiBkZWNpc2lvbnMpXHJcblxyXG4gIFRvZ2dsZVBheURheShfc3QxLCBfU3QyKSB7XHJcbiAgICBQYXNzZWRQYXlEYXkgPSBfc3QxO1xyXG4gICAgRG91YmxlUGF5RGF5ID0gX1N0MjtcclxuXHJcbiAgICBpZiAoIV9zdDEpIHtcclxuICAgICAgUGFzc2VkUGF5RGF5Q291bnRlciA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFfU3QyKSB7XHJcbiAgICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEluY3JlYXNlRG91YmxlUGF5RGF5KCkge1xyXG4gICAgRG91YmxlUGF5RGF5Q291bnRlcisrO1xyXG4gIH0sXHJcblxyXG4gIEV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihhbW91bnQsIF9pbmRleCwgX2xvY2F0aW9uTmFtZSwgX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSwgX0dpdmVuQ2FzaCA9IDAsIF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2ggPSBmYWxzZSkge1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA8IDMpIHtcclxuICAgICAgaWYgKCFfaXNDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggLSBhbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgKyAxO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUucHVzaChfbG9jYXRpb25OYW1lKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZXhwYW5kZWQgeW91ciBidXNpbmVzcy5cIiwgMTAwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgICB9LCAxMjAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoIHRvIGV4cGFuZCB0aGlzIGJ1c2luZXNzLCBjYXNoIG5lZWRlZCAkIFwiICsgYW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKF9HaXZlbkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgICBfR2l2ZW5DYXNoID0gX0dpdmVuQ2FzaCAtIGFtb3VudDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCArIDE7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5wdXNoKF9sb2NhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLCAxMDAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgIH0sIDEyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2ggdG8gZXhwYW5kIHRoaXMgYnVzaW5lc3MsIGNhc2ggbmVlZGVkICQgXCIgKyBhbW91bnQgKyBcIiwgQ2FzaCBHaXZlbiAkXCIgKyBfR2l2ZW5DYXNoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgY2Fubm90IG93biBtb3JlIHRoYW4gdGhyZWUgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBsb2NhdGlvbnNcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbihfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMgPSBbXTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAocGFyc2VJbnQodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICAvL3RoaXMgbWVhbnMgdGhlcmUgaXMgYnJpY2sgYW5kIG1vcnRhciBpbiBsaXN0XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc1ByZWZhYik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0QnVzaW5lc3NJbmRleChpKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRDYXJkRnVuY3Rpb25hbGl0eShfaXNDYXJkRnVuY3Rpb25hbGl0eSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0R2l2ZW5DYXNoKF9HaXZlbkNhc2gpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaChfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5SZXNldEVkaXRCb3goKTtcclxuICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coQnVzaW5lc3NMb2NhdGlvbk5vZGVzKTtcclxuICAgIHJldHVybiBCdXNpbmVzc0xvY2F0aW9uTm9kZXMubGVuZ3RoO1xyXG4gIH0sXHJcblxyXG4gIERlc3Ryb3lHZW5lcmF0ZWROb2RlcygpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBCdXNpbmVzc0xvY2F0aW9uTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZVN0b2Nrc19UdXJuRGVjaXNpb24oX25hbWUsIF9TaGFyZUFtb3VudCwgX2lzQWRkaW5nKSB7XHJcbiAgICBpZiAoX2lzQWRkaW5nKSB7XHJcbiAgICAgIHZhciBfc3RvY2sgPSBuZXcgU3RvY2tJbmZvKCk7XHJcbiAgICAgIF9zdG9jay5CdXNpbmVzc05hbWUgPSBfbmFtZTtcclxuICAgICAgX3N0b2NrLlNoYXJlQW1vdW50ID0gX1NoYXJlQW1vdW50O1xyXG5cclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZTdG9ja3MucHVzaChfc3RvY2spO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKF9pc0RvdWJsZVBheURheSA9IGZhbHNlLCBfaXNCb3QgPSBmYWxzZSwgX2ZvclNlbGVjdGVkQnVzaW5lc3MgPSBmYWxzZSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IDAsIEhCQW1vdW50ID0gMCwgQk1BbW91bnQgPSAwLCBCTUxvY2F0aW9ucyA9IDApIHtcclxuICAgIGlmIChfZm9yU2VsZWN0ZWRCdXNpbmVzcykge1xyXG4gICAgICB2YXIgX3RpdGxlID0gXCJQYXlEYXlcIjtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgX2lzQm90LCBfZm9yU2VsZWN0ZWRCdXNpbmVzcywgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCwgSEJBbW91bnQsIEJNQW1vdW50LCBCTUxvY2F0aW9ucywgMSwgMCwgX25leHRUdXJuaGFsZlBheSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoRG91YmxlUGF5RGF5ICYmIFBhc3NlZFBheURheSAmJiBfbmV4dFR1cm5Eb3VibGVQYXkpIHtcclxuICAgICAgICBEb3VibGVQYXlEYXlDb3VudGVyID0gMjtcclxuICAgICAgfVxyXG5cclxuICAgICAgX3NraXBOZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0UGF5ZGF5O1xyXG4gICAgICBfc2tpcEhNTmV4dFBheWRheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgICBfc2tpcEJNTmV4dFBheWRheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwQk1OZXh0UGF5ZGF5O1xyXG5cclxuICAgICAgaWYgKF9za2lwTmV4dFBheWRheSkge1xyXG4gICAgICAgIC8vaWYgcHJldmlvdXNseSBza2lwIHBheWRheSB3YXMgc3RvcmVkIGJ5IGFueSBjYXJkXHJcbiAgICAgICAgdGhpcy5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgaWYgKCFfaXNCb3QpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTa2lwcGluZyBQYXlEYXkuXCIsIDE2MDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgICB9LCAxNjUwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyBQYXlEYXkuXCIpO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgX3RpdGxlID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYgKF9pc0RvdWJsZVBheURheSkgX3RpdGxlID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgICBlbHNlIF90aXRsZSA9IFwiUGF5RGF5XCI7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Bc3NpZ25EYXRhX1BheURheShfdGl0bGUsIF9pc0RvdWJsZVBheURheSwgX3NraXBITU5leHRQYXlkYXksIF9za2lwQk1OZXh0UGF5ZGF5LCBfaXNCb3QsIGZhbHNlLCAwLCAwLCAwLCAwLCBQYXNzZWRQYXlEYXlDb3VudGVyLCBEb3VibGVQYXlEYXlDb3VudGVyLCBfbmV4dFR1cm5oYWxmUGF5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEJhbmtydXB0X1R1cm5EZWNpc2lvbigpIHtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JhbmtydXB0ID0gdHJ1ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCArPSAxO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLCBmYWxzZSwgdGhpcy5TZWxlY3RlZE1vZGUsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JhbmtydXB0LCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQmFua3J1cHRBbW91bnQpO1xyXG4gIH0sXHJcblxyXG4gIFNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudCwgX3VJRCkge1xyXG4gICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IENhc2g6IF9hbW91bnQsIElEOiBfdUlEIH0gfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTMsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9kYXRhKSB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9hbW91bnQgPSBfZGF0YS5EYXRhLkNhc2g7XHJcbiAgICAgIHZhciBfaUQgPSBfZGF0YS5EYXRhLklEO1xyXG5cclxuICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uUGxheWVyVUlEID09IF9pRCkge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5pc0dhbWVGaW5pc2hlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5Ub3RhbFNjb3JlICs9IF9hbW91bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHJlY2VpdmVkIHByb2ZpdCBvZiAkXCIgKyBfYW1vdW50ICsgXCIgZnJvbSBvdGhlciBwbGF5ZXIuXCIsIDI4MDApO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gQ2FyZHMgUnVsZXNcclxuICBUb2dnbGVEb3VibGVQYXlOZXh0VHVybihfc3RhdGUpIHtcclxuICAgIF9uZXh0VHVybkRvdWJsZVBheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheSA9IF9uZXh0VHVybkRvdWJsZVBheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVIYWxmUGF5TmV4dFR1cm4oX3N0YXRlKSB7XHJcbiAgICBfbmV4dFR1cm5oYWxmUGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuSGFsZlBheURheSA9IF9uZXh0VHVybmhhbGZQYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcE5leHRUdXJuKF9zdGF0ZSkge1xyXG4gICAgX3NraXBOZXh0VHVybiA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4gPSBfc2tpcE5leHRUdXJuO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoX3N0YXRlKSB7XHJcbiAgICBfc2tpcE5leHRQYXlkYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXkgPSBfc2tpcE5leHRQYXlkYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoX3N0YXRlKSB7XHJcbiAgICBfc2tpcEhNTmV4dFBheWRheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5ID0gX3NraXBITU5leHRQYXlkYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihfc3RhdGUpIHtcclxuICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXkgPSBfc2tpcEJNTmV4dFBheWRheTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVUdXJuUHJvZ3Jlc3MoX3N0YXRlKSB7XHJcbiAgICBUdXJuSW5Qcm9ncmVzcyA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBSZXR1cm5UdXJuUHJvZ3Jlc3MoKSB7XHJcbiAgICByZXR1cm4gVHVybkluUHJvZ3Jlc3M7XHJcbiAgfSxcclxuXHJcbiAgTG9zZUFsbE1hcmtldGluZ01vbmV5KCkge1xyXG4gICAgdmFyIF9sb3NlQW1vdW50ID0gLTE7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA+IDApIHtcclxuICAgICAgX2xvc2VBbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9sb3NlQW1vdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2xvc2VBbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcikge1xyXG4gICAgdmFyIF9hbW91bnRJbmNyZWFzZWQgPSAtMTtcclxuICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID4gMCkge1xyXG4gICAgICBfYW1vdW50SW5jcmVhc2VkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCAqPSBfbXVsdGlwbGllcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9hbW91bnRJbmNyZWFzZWQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfYW1vdW50SW5jcmVhc2VkO1xyXG4gIH0sXHJcblxyXG4gIEdldE1hcmtldGluZ01vbmV5KF9wcm9maXQpIHtcclxuICAgIHZhciBfYW1vdW50ID0gLTE7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA+IDApIHtcclxuICAgICAgX3Byb2ZpdCA9IF9wcm9maXQgLyAxMDA7XHJcbiAgICAgIF9hbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ICo9IF9wcm9maXQ7XHJcbiAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPSAwO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgX2Ftb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9hbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24oX2RhdGEpIHtcclxuICAgIHZhciBfcXVlc3Rpb25SZWYgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1F1ZXN0aW9uc0RhdGEoKTtcclxuICAgIHZhciBfdXNlcklEID0gX2RhdGEuVXNlcklEO1xyXG4gICAgdmFyIF9xdWVzdGlvbkluZGV4ID0gX2RhdGEuUXVlc3Rpb247XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX2RhdGEuVXNlckluZGV4O1xyXG4gICAgdmFyIF9pc1ZvYyA9IF9kYXRhLklzVm9jO1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcbiAgICBpZiAoX3VzZXJJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJJRCBtYXRjaGVkXCIpO1xyXG5cclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSh0cnVlKTtcclxuXHJcbiAgICAgIHZhciBfUWRhdGE7XHJcbiAgICAgIGlmIChfaXNWb2MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInZvY1wiKTtcclxuICAgICAgICBfUWRhdGEgPSBfcXVlc3Rpb25SZWYuVm9jYWJ1bGFyeVF1ZXN0aW9uc1tfcXVlc3Rpb25JbmRleF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlc3RcIik7XHJcbiAgICAgICAgX1FkYXRhID0gX3F1ZXN0aW9uUmVmLkVzdGFibGlzaG1lbnRRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXhdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBDb3JyZWN0QW5zd2VyID0gX1FkYXRhLkNvcnJlY3RPcHRpb247XHJcbiAgICAgIHZhciBfbWVzc2FnZSA9IFwiQ2hvb3NlIHRoZSBjb3JyZWN0IGFuc3dlci5cIiArIFwiXFxuXCIgKyBcIip3cm9uZyBhbnN3ZXIgd2lsbCBjb3N0IHlvdSBhIGZpbmUgb2YgJDUwMDAuXCIgKyBcIlxcblwiICsgXCJcXG5cIiArIF9RZGF0YS5RdWVzdGlvbiArIFwiXFxuXCIgKyBcIkEuIFwiICsgX1FkYXRhLk9wdGlvbjEgKyBcIlxcblwiICsgXCJCLiBcIiArIF9RZGF0YS5PcHRpb24yICsgXCJcXG5cIiArIFwiQy4gXCIgKyBfUWRhdGEuT3B0aW9uMyArIFwiXFxuXCIgKyBcIkQuIFwiICsgX1FkYXRhLk9wdGlvbjQ7XHJcblxyXG4gICAgICAvLyB2YXIgX3F1ZXN0aW9uQXNrZWQgPSBPbmVRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXggLSAxXTtcclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9tZXNzYWdlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbihfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgdmFyIF9teURhdGE7XHJcbiAgICB2YXIgX3Jvb21EYXRhO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIF9yb29tRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBfbXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgX3Jvb21EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgIH1cclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXlEYXRhLCBfcm9vbURhdGEsIF9pc1R1cm5PdmVyLCB0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgfSxcclxuXHJcbiAgT25lUXVlc3Rpb25EZWNpc2lvbl9TZWxlY3RPcHRpb25fT25lUXVlc3Rpb24oZXZlbnQgPSBudWxsKSB7XHJcbiAgICB2YXIgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfc2VsZWN0aW9uID0gcGFyc2VJbnQoZXZlbnQuY3VycmVudFRhcmdldC5uYW1lLnNwbGl0KFwiX1wiKVsxXSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJvcHRpb24gc2VsZWN0ZWQ6IFwiICsgX3NlbGVjdGlvbik7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNvcnJlY3RBbnN3ZXI6IFwiICsgQ29ycmVjdEFuc3dlcik7XHJcbiAgICBpZiAoX3NlbGVjdGlvbiA9PSBDb3JyZWN0QW5zd2VyKSB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3VyIGFuc3dlciB3YXMgY29ycmVjdCEuXCIsIDEyMDApO1xyXG4gICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIHRydWUsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX215RGF0YS5DYXNoID49IDUwMDApIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaCAtPSA1MDAwO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIGFuc3dlcmVkIHdyb25nLCBmaW5lIGFtb3VudCB3YXMgcGF5ZWQgdG8gdGhlIHBsYXllci5cIiwgMTIwMCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24odHJ1ZSwgZmFsc2UsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLCBTa2lwcGluZyBxdWVzdGlvblwiKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihmYWxzZSwgZmFsc2UsIDAsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAvL0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vIE9uZVF1ZXN0aW9uRGVjaXNpb25fUGF5QW1vdW50X09uZVF1ZXN0aW9uKCkge1xyXG4gIC8vICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAvLyAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gIC8vICAgaWYgKF9teURhdGEuQ2FzaCA+PSA1MDAwKSB7XHJcbiAgLy8gICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gIC8vICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCA9PSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAvLyAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggLT0gNTAwMDtcclxuICAvLyAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdKTtcclxuICAvLyAgICAgICAgIGJyZWFrO1xyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgfVxyXG5cclxuICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBwYWlkIGNhc2ggYW1vdW50IHRvIHBsYXllci5cIiwgMTIwMCk7XHJcbiAgLy8gICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIC8vICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbih0cnVlLCBmYWxzZSwgLTEsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAvLyAgIH0gZWxzZSB7XHJcbiAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgLy8gICB9XHJcbiAgLy8gfSxcclxuXHJcbiAgLy8gT25lUXVlc3Rpb25EZWNpc2lvbl9BbnN3ZXJRdWVzdGlvbl9PbmVRdWVzdGlvbigpIHtcclxuICAvLyAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgLy8gICB2YXIgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gIC8vICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBhbnN3ZXJlZCB0aGUgcXVlc3Rpb24uXCIsIDEyMDApO1xyXG4gIC8vICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgLy8gICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihmYWxzZSwgdHJ1ZSwgT25lUXVlc3Rpb25JbmRleCwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gIC8vIH0sXHJcblxyXG4gIFNlbGVjdFBsYXllclByb2ZpdF9TcGFjZV9DYXJkRnVuY3Rpb25hbGl0eShfaXNUdXJuT3ZlciA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgdmFyIF9teURhdGE7XHJcbiAgICB2YXIgX3Jvb21EYXRhO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIF9yb29tRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBfbXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgX3Jvb21EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgIH1cclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KHRydWUpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fU2VsZWN0UGxheWVyRm9yUHJvZml0KCk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9TZWxlY3RQbGF5ZXJGb3JQcm9maXQoX215RGF0YSwgX3Jvb21EYXRhLCBfaXNUdXJuT3ZlciwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudF9TZWxlY3RQbGF5ZXJGb3JQcm9maXRfU3BhY2VfQ2FyZEZ1bmN0aW9uYWxpdHkoX2RhdGEpIHtcclxuICAgIHZhciBfb3duSUQgPSBfZGF0YS5Vc2VySUQudG9TdHJpbmcoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBwYXJzZUludChfZGF0YS5Vc2VySW5kZXgpO1xyXG4gICAgdmFyIF9wbGF5ZXJOYW1lID0gX2RhdGEuVXNlck5hbWU7XHJcbiAgICB2YXIgX3BsYXllcklEID0gX2RhdGEuT3duUGxheWVySUQudG9TdHJpbmcoKTtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICBpZiAoX293bklEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZWQgZXZlbnQ6IFwiICsgX3BsYXllck5hbWUpO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCA9PSBfb3duSUQpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhbkdpdmVQcm9maXRPblBheURheSA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Vc2VySURGb3JQcm9maXRQYXlEYXkgPSBfcGxheWVySUQ7XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIsIHRoaXMuUGxheWVyR2FtZUluZm8sIHRydWUpO1xyXG4gICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNob3dUb2FzdChcIlBsYXllciBcIiArIF9wbGF5ZXJOYW1lICsgXCIgd2lsbCByZWNlaXZlIGFsbCB5b3VyIG5leHQgcGF5IGRheSBwcm9maXRzXCIsIDMyMDApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9oYXNEb25lUGF5bWVudCwgX2hhc0Fuc3dlcmVkUXVlc3Rpb24sIF9xdWVzdGlvbkluZGV4LCBfVXNlcklEKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IFBheW1lbnREb25lOiBfaGFzRG9uZVBheW1lbnQsIFF1ZXN0aW9uQW5zd2VyZWQ6IF9oYXNBbnN3ZXJlZFF1ZXN0aW9uLCBRdWVzdGlvbkluZGV4OiBfcXVlc3Rpb25JbmRleCwgSUQ6IF9Vc2VySUQgfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoOCwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9kYXRhKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgdmFyIF9oYXNEb25lUGF5bWVudCA9IF9kYXRhLlBheW1lbnREb25lO1xyXG4gICAgICB2YXIgX2hhc0Fuc3dlcmVkUXVlc3Rpb24gPSBfZGF0YS5RdWVzdGlvbkFuc3dlcmVkO1xyXG4gICAgICB2YXIgX3F1ZXN0aW9uSW5kZXggPSBfZGF0YS5RdWVzdGlvbkluZGV4O1xyXG4gICAgICB2YXIgX3VJRCA9IF9kYXRhLklEO1xyXG5cclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgIGlmIChfcXVlc3Rpb25JbmRleCA9PSAwKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcInBsYXllciBkb2VzIG5vdCBoYXZlIGVub3VnaCBjYXNoLCBzbyBxdWVzdGlvbnMgd2VyZSBza2lwcGVkLlwiLCAyMTAwKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX2hhc0RvbmVQYXltZW50KSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggKz0gNTAwMDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJwbGF5ZXIgaGFzIGdpdmVuIHdyb25nIGFuc3dlciwgY2FzaCAkNTAwMCBoYXMgYmVlbiBhZGRlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2hhc0Fuc3dlcmVkUXVlc3Rpb24pIHtcclxuICAgICAgICAgIHZhciBfc2VsZWN0ZWRQbGF5ZXJJbmRleCA9IDA7XHJcbiAgICAgICAgICB2YXIgX2FjdG9yc0RhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoX3VJRCA9PSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgICBfc2VsZWN0ZWRQbGF5ZXJJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcInBsYXllciBoYXMgZ2l2ZW4gY29ycmVjdCBhbnN3ZXIsIG5vIGNhc2ggd2FzIHJlY2VpdmVkLlwiLCAyMTAwKTtcclxuXHJcbiAgICAgICAgICAvLyBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMSkge1xyXG4gICAgICAgICAgLy8gICAvL2hhdmUgeW91IHNraXBwZWQgbG9hbiBwcmV2aW91cyBwYXlkYXk/XHJcbiAgICAgICAgICAvLyAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ta2lwcGVkTG9hblBheW1lbnQpIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgc2tpcHBlZCBsb2FuIHBheWVtZW50IGluIHByZXZpb3VzIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSAyKSB7XHJcbiAgICAgICAgICAvLyAgIC8vSGF2ZSB5b3UgdGFrZW4gYW55IGxvYW4/XHJcbiAgICAgICAgICAvLyAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICAvLyAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAvLyAgICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAvLyAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgIC8vICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgIC8vICAgfVxyXG5cclxuICAgICAgICAgIC8vICAgaWYgKF9sb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHRha2VuIHNvbWUgbG9hblwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSB0YWtlbiBhbnkgbG9hblwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSAzKSB7XHJcbiAgICAgICAgICAvLyAgIC8vQXJlIHlvdSBiYW5rcnVwdGVkPyBpZiBtb3JlIHRoYW4gb25jZSwgdGVsbCBtZSB0aGUgYW1vdW50P1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuSXNCYW5rcnVwdCkge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkIFwiICsgX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQmFua3J1cHRBbW91bnQgKyBcIiB0aW1lL2VzLlwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSBiZWVuIGJhbmtydXB0ZWRcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gNCkge1xyXG4gICAgICAgICAgLy8gICAvL0lzIHlvdXIgdHVybiBnb2luZyB0byBiZSBza2lwcGVkIG5leHQgdGltZT9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBiZSBza2lwcGVkLlwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgbm90IGJlIHNraXBwZWQuXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDUpIHtcclxuICAgICAgICAgIC8vICAgLy9JcyBpdCBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSB5b3VyIG5leHQgcGF5ZGF5P1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXkpIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBiZSBkb3VibGUgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIG5vdCBiZSBkb3VibGUgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5KF9kYXRhKSB7XHJcbiAgICBpZiAoSXNUd2VlbmluZyA9PSB0cnVlKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5KF9kYXRhKTtcclxuICAgICAgfSwgODAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfc3BhY2VzID0gX2RhdGEuRGF0YS5iYWNrc3BhY2VzO1xyXG4gICAgICB2YXIgX2NvdW50ZXIgPSBfZGF0YS5EYXRhLkNvdW50ZXI7XHJcblxyXG4gICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2NvdW50ZXIgKyBCYWNrc3BhY2VzXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1BvcywgMC4xKTtcclxuXHJcbiAgICAgIFJvbGxDb3VudGVyID0gX2NvdW50ZXI7XHJcbiAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFR3ZWVuUGxheWVyX0dvQmFja1NwYWNlczogZnVuY3Rpb24gKE5vZGUsIFRvUG9zLCBzcGVlZCA9IDAuNikge1xyXG4gICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgLnRvKHNwZWVkLCB7IHBvc2l0aW9uOiBjYy52MihUb1Bvcy54LCBUb1Bvcy55KSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7fSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgIFJvbGxDb3VudGVyIC09IEJhY2tzcGFjZXM7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IGJhY2tzcGFjZXM6IEJhY2tzcGFjZXMsIENvdW50ZXI6IFJvbGxDb3VudGVyIH0gfTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMCwgX2RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG4gIC8vI2VuZHJlZ2lvblxyXG59KTtcclxuLy9tb2R1bGUuZXhwb3J0cyAgPSBQbGF5ZXJEYXRhOyAvL3doZW4gaW1wb3J0cyBpbiBhbm90aGVyIHNjcmlwdCBvbmx5IHJlZmVyZW5jZSBvZiBwbGF5ZXJkYXRhIGNsYXNzIHdvdWxkIGJlIGFibGUgdG8gYWNjZXNzZWQgZnJvbSBHYW1lbWFuYWdlciBpbXBvcnRcclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lTWFuYWdlcjtcclxuLy8jZW5kcmVnaW9uXHJcbiJdfQ==