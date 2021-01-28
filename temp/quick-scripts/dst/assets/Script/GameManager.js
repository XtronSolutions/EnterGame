
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

    for (var index = 0; index < this.PlayerGameInfo.length; index++) {
      if (this.PlayerGameInfo[index].PlayerRollCounter > 0 && this.PlayerGameInfo[index].InitialCounterAssigned == true && !this.PlayerGameInfo[index].isGameFinished) {
        var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.y);

        this.AllPlayerNodes[index].setPosition(_toPos.x, _toPos.y);
      }

      if (this.PlayerGameInfo[index].isGameFinished) {
        var _lastIndex = GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length - 1;

        var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[_lastIndex].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[_lastIndex].ReferenceLocation.position.y);

        this.AllPlayerNodes[index].setPosition(_toPos.x, _toPos.y);
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

        console.log(TurnCheckArray.length);
        console.log(TotalConnectedPlayers);

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
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == true) IsTweening = false;
      setTimeout(function () {
        _this3.TurnHandler(_turn);
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
        console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors());
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
    var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();
    var MyData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
    var _counter = _ind; // console.log(this.PlayerGameInfo[_counter].PlayerUID);
    //  console.log(MyData.customProperties.PlayerSessionData.PlayerUID);

    for (var index = 0; index < MainSessionData.length; index++) {
      //   while (this.PlayerGameInfo[_counter].IsActive == false) {
      //     _counter++;
      //   }
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
        var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();
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
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Game over, calculating total cash...", 4000, false);
        setTimeout(function () {
          console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors());

          _this4.ZoomCameraOutOnly();

          _this4.SyncDataToPlayerGameInfo(0);

          var max = -1;
          var SelectedInd = 0;
          var SessionData = _this4.PlayerGameInfo;

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
        var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();
        var playercompleted = 0;
        this.PlayerGameInfo[this.TurnNumber].isGameFinished = true;

        for (var index = 0; index < MainSessionData.length; index++) {
          if (MainSessionData[index].customProperties.PlayerSessionData.isGameFinished) playercompleted++;
        }

        for (var _index9 = 0; _index9 < this.PlayerGameInfo.length; _index9++) {
          if (!this.PlayerGameInfo[_index9].IsActive) playercompleted++;
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

      for (var _index10 = 0; _index10 < MainSessionData.length; _index10++) {
        if (MainSessionData[_index10].isGameFinished) playercompleted++;
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
        console.log(DiceTemp + " " + RollCounter);

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


        console.log(DiceTemp + " " + RollCounter);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJQcmV2aW91c0RpY2VSb2xsMyIsIlByZXZpb3VzRGljZVJvbGw0IiwiUHJldmlvdXNEaWNlUm9sbDUiLCJ1c2VyR2FtZU92ZXIiLCJCb3RHYW1lT3ZlciIsIlRvdGFsQ291bnRlclJlYWNoZWQiLCJQYXNzZWRQYXlEYXlDb3VudGVyIiwiRG91YmxlUGF5RGF5Q291bnRlciIsIk5vQ2FyZEZ1bmN0aW9uYWxpdHkiLCJQbGF5ZXJMZWZ0IiwiRm9yY2VDaGFuZ2VUaW1lT3V0IiwiR2FtZUNvbXBsZXRlZCIsIkNvcnJlY3RBbnN3ZXIiLCJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIlBhcnRuZXJOYW1lIiwiTG9jYXRpb25zTmFtZSIsIkxvYW5UYWtlbiIsIkxvYW5BbW91bnQiLCJjdG9yIiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiTmV4dFR1cm5Eb3VibGVQYXkiLCJTa2lwTmV4dFR1cm4iLCJTa2lwTmV4dFBheWRheSIsIlNraXBITU5leHRQYXlkYXkiLCJTa2lwQk1OZXh0UGF5ZGF5IiwiU3RvY2tJbmZvIiwiU2hhcmVBbW91bnQiLCJQbGF5ZXJEYXRhIiwiUGxheWVyTmFtZSIsIlBsYXllclVJRCIsIkF2YXRhcklEIiwiSXNCb3QiLCJOb09mQnVzaW5lc3MiLCJDYXJkRnVuY3Rpb25hbGl0eSIsIkhvbWVCYXNlZEFtb3VudCIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJOb09mU3RvY2tzIiwiQ2FzaCIsIkdvbGRDb3VudCIsIlN0b2NrQ291bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJMYXd5ZXJTdGF0dXMiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQbGF5ZXJSb2xsQ291bnRlciIsIkluaXRpYWxDb3VudGVyQXNzaWduZWQiLCJpc0dhbWVGaW5pc2hlZCIsIlRvdGFsU2NvcmUiLCJUb3RhbEhCQ2FzaCIsIlRvdGFsQk1DYXNoIiwiVG90YWxHb2xkQ2FzaCIsIlRvdGFsTG9hbkJhbGFuY2UiLCJUb3RhbFN0b2Nrc0Nhc2giLCJHYW1lT3ZlciIsIklzQWN0aXZlIiwiUm9sbENvdW50ZXIiLCJEaWNlVGVtcCIsIkRpY2VSb2xsIiwiSXNUd2VlbmluZyIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlR1cm5DaGVja0FycmF5IiwiQnVzaW5lc3NMb2NhdGlvbk5vZGVzIiwiUGFzc2VkUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiX25leHRUdXJuRG91YmxlUGF5IiwiX3NraXBOZXh0VHVybiIsIl9za2lwTmV4dFBheWRheSIsIl9za2lwSE1OZXh0UGF5ZGF5IiwiX3NraXBCTU5leHRQYXlkYXkiLCJDYXJkRXZlbnRSZWNlaXZlZCIsIlR1cm5JblByb2dyZXNzIiwiQmFja3NwYWNlcyIsImlzR2FtZU92ZXIiLCJPbmVRdWVzdGlvbkluZGV4IiwiT25lUXVlc3Rpb25zIiwiQ2FyZERpc3BsYXlTZXRUaW1vdXQiLCJHYW1lTWFuYWdlciIsIkNvbXBvbmVudCIsIlBsYXllckdhbWVJbmZvIiwiQm90R2FtZUluZm8iLCJQbGF5ZXJOb2RlIiwiTm9kZSIsIkNhbWVyYU5vZGUiLCJBbGxQbGF5ZXJVSSIsIkFsbFBsYXllck5vZGVzIiwiU3RhcnRMb2NhdGlvbk5vZGVzIiwiU2VsZWN0ZWRNb2RlIiwic3RhdGljcyIsIkluc3RhbmNlIiwiU2V0UGxheWVyTGVmdCIsIl9zdGF0ZSIsIlJlc2V0QWxsVmFyaWFibGVzIiwiSW5wdXRUZXN0RGljZTEiLCJfdmFsIiwiSW5wdXRUZXN0RGljZTIiLCJvbkxvYWQiLCJUdXJuTnVtYmVyIiwiVHVybkNvbXBsZXRlZCIsIkNoZWNrUmVmZXJlbmNlcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRTZWxlY3RlZE1vZGUiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsIkNoZWNrU3BlY3RhdGUiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIkFsbERhdGEiLCJNYXhQbGF5ZXJzIiwibGVuZ3RoIiwiU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyIiwiVXBkYXRlR2FtZVVJIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJHZXRUdXJuTnVtYmVyIiwiR2V0TXlJbmRleCIsIm15SW5kZXgiLCJfYWN0b3IiLCJQaG90b25BY3RvciIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9hbGxBY3RvcnMiLCJpbmRleCIsIlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyIsIkFzc2lnblBsYXllckdhbWVVSSIsIkVuYWJsZVBsYXllck5vZGVzIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIl90b1BvcyIsIlZlYzIiLCJHZXRfU3BhY2VNYW5hZ2VyIiwiRGF0YSIsIlJlZmVyZW5jZUxvY2F0aW9uIiwicG9zaXRpb24iLCJ4IiwieSIsInNldFBvc2l0aW9uIiwiX2xhc3RJbmRleCIsImFjdGl2ZSIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJUb3RhbENvbm5lY3RlZFBsYXllcnMiLCJteVJvb21BY3RvckNvdW50IiwidXNlcklEIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDaGFuZ2VUdXJuIiwiY29uc29sZSIsImxvZyIsIlJhaXNlRXZlbnRGb3JDYXJkIiwiX2RhdGEiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiRGlzcGxheUNhcmRPbk90aGVycyIsIk9uTGFuZGVkT25TcGFjZSIsInNldFRpbWVvdXQiLCJSZXNldENhcmREaXNwbGF5IiwiUmVjZWl2ZUV2ZW50Rm9yQ2FyZCIsIlJhbmRvbUNhcmQiLCJyYW5kb21DYXJkIiwiY291bnRlciIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJTeW5jQWxsRGF0YSIsIlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZSIsIl91aWQiLCJwdXNoIiwiQXJyYXlMZW5ndGgiLCJJREZvdW5kIiwiaiIsIkNoYW5nZVR1cm5Gb3JjZWZ1bGx5IiwiVXBkYXRlVmlzdWFsRGF0YSIsIlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSIsIlR1cm5IYW5kbGVyIiwiX3R1cm4iLCJfaXNNYXN0ZXIiLCJDaGVja0N1cnJlbnRBY3RpdmVNYXN0ZXJDbGllbnQiLCJfcGxheWVyTWF0Y2hlZCIsIlRvZ2dsZVR1cm5Qcm9ncmVzcyIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlJlc2V0VHVyblZhcmlhYmxlIiwiUm9sbERpY2UiLCJEaWNlUm9sbFNjcmVlbiIsIlBsYXllckluZm8iLCJSb29tQWN0b3JzIiwiU2hvd1RvYXN0IiwiVG9nZ2xlU2tpcE5leHRUdXJuIiwiX2luZCIsIk1haW5TZXNzaW9uRGF0YSIsIk15RGF0YSIsIl9jb3VudGVyIiwiU3RhcnRUdXJuIiwiUmVjZWl2ZUJhbmtydXB0RGF0YSIsIl9pc0JhbmtydXB0ZWQiLCJiYW5rcnVwdGVkIiwidHVybiIsIl9wbGF5ZXJEYXRhIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiX3JhbmRvbUluZGV4IiwiZ2V0UmFuZG9tIiwiU2V0TmFtZSIsIlNldEF2YXRhciIsIl90b2dnbGVIaWdobGlnaHQiLCJfaW5kZXgiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJjaGlsZHJlbiIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiQXZhdGFyU3ByaXRlcyIsIlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMiLCJ0YXJnZXRQb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInJhdGlvIiwid2luU2l6ZSIsImhlaWdodCIsInpvb21SYXRpbyIsImxhdGVVcGRhdGUiLCJzeW5jRGljZVJvbGwiLCJfcm9sbCIsIl9kaWNlMSIsImRpY2UxIiwiX2RpY2UyIiwiZGljZTIiLCJfcmVzdWx0IiwibXlSb29tQWN0b3JzQXJyYXkiLCJlcnJvciIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsIkFuaW1hdGVEaWNlIiwiRGljZUZ1bnRpb25hbGl0eSIsIl9wb3MiLCJUd2VlbkNhbWVyYSIsIlRlbXBDaGVja1NwYWNlIiwiX3JvbGxpbmciLCJ0ZW1wY291bnRlciIsInRlbXBjb3VudGVyMiIsImRpY2V0b2JlIiwicGFyc2VJbnQiLCJTcGFjZURhdGEiLCJTcGFjZXNUeXBlIiwiRGljZTEiLCJEaWNlMiIsIl9uZXdSb2xsIiwiUm9sbE9uZURpY2UiLCJSb2xsVHdvRGljZXMiLCJjYWxsVXBvbkNhcmQiLCJfc3BhY2VJRCIsInZhbHVlSW5kZXgiLCJTdGFydERpY2VSb2xsIiwiU2VuZGluZ0RhdGEiLCJpc0JvdCIsImNvbXBsZXRlQ2FyZFR1cm4iLCJBbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZCIsIkNhbGxHYW1lQ29tcGxldGUiLCJfaXNCb3QiLCJfZm9yY2VHYW1lT3ZlciIsIl9wbGF5ZXJJbmRleCIsIl9jYXNoIiwiSE1BbW91bnQiLCJHZXRfR2FtZU1hbmFnZXIiLCJCTUFtb3VudCIsIkJNTG9jYXRpb25zIiwibG9hbkFtb3VudCIsIl9nb2xkIiwiX3N0b2NrcyIsIl9kaWNlUmFuZG9tIiwiT25jZU9yU2hhcmUiLCJHb2xkQ2FzaCIsIlN0b2NrQ2FzaCIsIkJNQ2FzaCIsIkhNQ2FzaCIsIlRvdGFsQXNzZXRzIiwiUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZSIsIlJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhIiwiU3luY0dhbWVPdmVyIiwiX1VJRCIsImluZm9UZXh0Iiwic3RhdHVzVGV4dCIsIkRpc2Nvbm5lY3REYXRhIiwiU2hvd1Jlc3VsdFNjcmVlbiIsIl9jdXJyZW50Q2FzaCIsIkdldF9TZXJ2ZXJCYWNrZW5kIiwiU3R1ZGVudERhdGEiLCJnYW1lQ2FzaCIsIl90b3RhbCIsInRvU3RyaW5nIiwiX3dvbiIsImdhbWVzV29uIiwiVXBkYXRlVXNlckRhdGEiLCJTeW5jR2FtZUNvbXBsZXRlRGF0YSIsIkJvdCIsIlpvb21DYW1lcmFPdXRPbmx5IiwibWF4IiwiU2VsZWN0ZWRJbmQiLCJTZXNzaW9uRGF0YSIsIl92YWx1ZSIsInRyYWNlIiwicGxheWVyY29tcGxldGVkIiwiWm9vbUNhbWVyYU91dCIsIlR3ZWVuUGxheWVyIiwibWluIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaXNab29tIiwidGltZSIsInR3ZWVuIiwidG8iLCJ2MiIsImVhc2luZyIsImNhbGwiLCJab29tQ2FtZXJhSW4iLCJzdGFydCIsIkNoZWNrUGF5RGF5Q29uZGl0aW9ucyIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIiwiVG9Qb3MiLCJfbmV3cG9zIiwiVG9nZ2xlUGF5RGF5IiwiX3N0MSIsIl9TdDIiLCJJbmNyZWFzZURvdWJsZVBheURheSIsIkV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsImFtb3VudCIsIl9sb2NhdGlvbk5hbWUiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIlNldEJ1c2luZXNzSW5kZXgiLCJTZXRDYXJkRnVuY3Rpb25hbGl0eSIsIlNldEdpdmVuQ2FzaCIsIlNldFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIlJlc2V0RWRpdEJveCIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsImRlc3Ryb3kiLCJVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJfU2hhcmVBbW91bnQiLCJfaXNBZGRpbmciLCJfc3RvY2siLCJfaXNEb3VibGVQYXlEYXkiLCJfZm9yU2VsZWN0ZWRCdXNpbmVzcyIsIl9TZWxlY3RlZEJ1c2luZXNzSW5kZXgiLCJIQkFtb3VudCIsIl90aXRsZSIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJfYW1vdW50IiwiX3VJRCIsIklEIiwiUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9pRCIsIl9teUluZGV4IiwiVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4iLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJSZXR1cm5UdXJuUHJvZ3Jlc3MiLCJMb3NlQWxsTWFya2V0aW5nTW9uZXkiLCJfbG9zZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfbXVsdGlwbGllciIsIl9hbW91bnRJbmNyZWFzZWQiLCJHZXRNYXJrZXRpbmdNb25leSIsIl9wcm9maXQiLCJRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbiIsIl9xdWVzdGlvblJlZiIsIkdldF9RdWVzdGlvbnNEYXRhIiwiX3VzZXJJRCIsIlVzZXJJRCIsIl9xdWVzdGlvbkluZGV4IiwiUXVlc3Rpb24iLCJVc2VySW5kZXgiLCJfaXNWb2MiLCJJc1ZvYyIsIl9nYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9RZGF0YSIsIlZvY2FidWxhcnlRdWVzdGlvbnMiLCJFc3RhYmxpc2htZW50UXVlc3Rpb25zIiwiQ29ycmVjdE9wdGlvbiIsIl9tZXNzYWdlIiwiT3B0aW9uMSIsIk9wdGlvbjIiLCJPcHRpb24zIiwiT3B0aW9uNCIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJfaXNUdXJuT3ZlciIsIl9teURhdGEiLCJfcm9vbURhdGEiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9TZWxlY3RPcHRpb25fT25lUXVlc3Rpb24iLCJldmVudCIsIl9zZWxlY3Rpb24iLCJjdXJyZW50VGFyZ2V0Iiwic3BsaXQiLCJSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJfaGFzRG9uZVBheW1lbnQiLCJfaGFzQW5zd2VyZWRRdWVzdGlvbiIsIl9Vc2VySUQiLCJQYXltZW50RG9uZSIsIlF1ZXN0aW9uQW5zd2VyZWQiLCJRdWVzdGlvbkluZGV4IiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9zZWxlY3RlZFBsYXllckluZGV4IiwiX2FjdG9yc0RhdGEiLCJSZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkiLCJfc3BhY2VzIiwiYmFja3NwYWNlcyIsIkNvdW50ZXIiLCJUd2VlblBsYXllcl9Hb0JhY2tTcGFjZXMiLCJzcGVlZCIsIkdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBRyxJQUFkO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFFQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUVBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFFQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsS0FBbEI7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxLQUExQjtBQUNBLElBQUlDLG1CQUFtQixHQUFHLENBQTFCO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsQ0FBMUI7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxLQUExQjtBQUNBLElBQUlDLFVBQVUsR0FBRyxLQUFqQjtBQUNBLElBQUlDLGtCQUFrQixHQUFHLElBQXpCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLEtBQXBCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLENBQXBCLEVBQ0E7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RW9GLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dDLENBQTFHLEVBQTZHbEYsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ2lELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERuRixXQUExRCxFQUF1RW9GLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dFLENBQS9NLENBQWI7O0FBQ0EsU0FBS21TLHdCQUFMLENBQThCLEtBQUs3VixjQUFMLENBQW9CLEtBQUtZLFVBQXpCLENBQTlCLEVBQW9FdUMsTUFBcEU7QUFDQSxTQUFLK0gsZ0JBQUw7QUFDRCxHQTdrRXdCLENBK2tFekI7QUFDQTs7QUFobEV5QixDQUFULENBQWxCLEVBa2xFQTs7QUFDQThLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpXLFdBQWpCLEVBQ0EiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfaXNUZXN0ID0gdHJ1ZTtcclxudmFyIF9kaWNlaW5wdXQxID0gXCJcIjtcclxudmFyIF9kaWNlaW5wdXQyID0gXCJcIjtcclxudmFyIFByZXZpb3VzRGljZVJvbGwxID0gLTE7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsMiA9IC0xO1xyXG5cclxudmFyIFByZXZpb3VzRGljZVJvbGwzID0gLTE7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsNCA9IC0xO1xyXG5cclxudmFyIFByZXZpb3VzRGljZVJvbGw1ID0gLTE7XHJcblxyXG52YXIgdXNlckdhbWVPdmVyID0gZmFsc2U7XHJcbnZhciBCb3RHYW1lT3ZlciA9IGZhbHNlO1xyXG52YXIgVG90YWxDb3VudGVyUmVhY2hlZCA9IGZhbHNlO1xyXG52YXIgUGFzc2VkUGF5RGF5Q291bnRlciA9IDA7XHJcbnZhciBEb3VibGVQYXlEYXlDb3VudGVyID0gMDtcclxudmFyIE5vQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxudmFyIFBsYXllckxlZnQgPSBmYWxzZTtcclxudmFyIEZvcmNlQ2hhbmdlVGltZU91dCA9IG51bGw7XHJcbnZhciBHYW1lQ29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBDb3JyZWN0QW5zd2VyID0gMDtcclxuLy8jcmVnaW9uIHN1cGVyY2xhc3NlcyBhbmQgZW51bWVyYXRpb25zXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciB0eXBlIG9mIGJ1c2luZXNzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBFbnVtQnVzaW5lc3NUeXBlID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBIb21lQmFzZWQ6IDEsIC8vYSBidXNpbmVzcyB0aGF0IHlvdSBvcGVyYXRlIG91dCBvZiB5b3VyIGhvbWVcclxuICBicmlja0FuZG1vcnRhcjogMiwgLy9hIHN0b3JlIGZyb250IGJ1c2luZXNzXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NJbmZvID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NJbmZvXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZTogXCJCdXNpbmVzc0RhdGFcIixcclxuICAgIEJ1c2luZXNzVHlwZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNb2RlXCIsXHJcbiAgICAgIHR5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICAgIGRlZmF1bHQ6IEVudW1CdXNpbmVzc1R5cGUuTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkJ1c2luZXNzIGNhdG9nb3J5IGZvciBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NUeXBlRGVzY3JpcHRpb246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVHlwZSAoYnkgbmFtZSkgb2YgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc05hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTmFtZSBvZiB0aGUgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIixcclxuICAgIH0sXHJcbiAgICBBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJiYWxhbmNlIG9mIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSXNQYXJ0bmVyc2hpcDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJc1BhcnRuZXJzaGlwXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXB3OiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBkb25lIHBhcnRuZXJzaGlwIHdpdGggc29tZW9uZSB3aXRoIGN1cnJlbnQgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVySUQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lcklEXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJJRCBvZiB0aGUgcGFydG5lciB3aXRoIHdob20gcGxheWVyIGhhcyBmb3JtZWQgcGFydG5lcnNoaXBcIixcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXJ0bmVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibmFtZSBvZiB0aGUgcGFydG5lciB3aXRoIHdob20gcGxheWVyIGhhcyBmb3JtZWQgcGFydG5lcnNoaXBcIixcclxuICAgIH0sXHJcbiAgICBMb2NhdGlvbnNOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvY2F0aW9uc05hbWVcIixcclxuICAgICAgdHlwZTogW2NjLlRleHRdLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImlmIHBsYXllciBvd25zIGJyaWNrIGFuZCBtb3J0YXIgaGUvc2hlIGNhbiBleHBhbmQgdG8gbmV3IGxvY2F0aW9uXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblRha2VuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5UYWtlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIENhcmREYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkRGF0YUZ1bmN0aW9uYWxpdHkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBOZXh0VHVybkRvdWJsZVBheToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJOZXh0VHVybkRvdWJsZVBheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgaXRzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXkgZGF5IG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFNraXBOZXh0VHVybjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTmV4dFR1cm5cIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIHR1cm4gaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHR1cm4gZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcE5leHRQYXlkYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcE5leHRQYXlkYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIHBheWRheSBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFNraXBITU5leHRQYXlkYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcEhNTmV4dFBheWRheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBob21lIGJhc2VkIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFNraXBCTU5leHRQYXlkYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcEJNTmV4dFBheWRheVwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBicmlja2EgYW5kIG1tb3J0YXIgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFN0b2NrSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3RvY2tJbmZvID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiU3RvY2tJbmZvXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmFtZTogXCJTdG9ja0RhdGFcIixcclxuICAgIEJ1c2luZXNzTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc05hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5hbWUgb2YgdGhlIGJ1c2luZXNzIGluIHdoaWNoIHN0b2NrcyB3aWxsIGJlIGhlbGRcIixcclxuICAgIH0sXHJcbiAgICBTaGFyZUFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTaGFyZUFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiU2hhcmUgYW1vdW50IG9mIHRoZSBzdG9ja1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgIFBsYXllciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGxheWVyRGF0YVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibmFtZSBvZiB0aGUgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyVUlEOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclVJRFwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiSUQgb2YgdGhlIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEF2YXRhcklEOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhcklEXCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpZCByZWZlcmVuY2UgZm9yIHBsYXllciBhdmF0YXIgc2VsZWN0aW9uXCIsXHJcbiAgICB9LFxyXG4gICAgSXNCb3Q6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNCb3RcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cHc6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBjdXJyZW50IHBsYXllciBpcyBib3RcIixcclxuICAgIH0sXHJcbiAgICBOb09mQnVzaW5lc3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NcIixcclxuICAgICAgdHlwZTogW0J1c2luZXNzSW5mb10sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTnVtYmVyIG9mIGJ1c2luZXNzIGEgcGxheWVyIGNhbiBvd25cIixcclxuICAgIH0sXHJcbiAgICBDYXJkRnVuY3Rpb25hbGl0eToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXJkRnVuY3Rpb25hbGl0eVwiLFxyXG4gICAgICB0eXBlOiBDYXJkRGF0YUZ1bmN0aW9uYWxpdHksXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjYXJkIGZ1bmN0aW9uYWxpdHkgc3RvcmVkIGJ5IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWRBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm51bWJlciBvZiBob21lIGJhc2VkIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBCcmlja0FuZE1vcnRhckFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja0FuZE1vcnRhckFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIG9mIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsTG9jYXRpb25zQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsTG9jYXRpb25zQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJudW1iZXIgb2YgbG9jYXRpb25zIG9mIGFsbCBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgTm9PZlN0b2Nrczoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja3NcIixcclxuICAgICAgdHlwZTogW1N0b2NrSW5mb10sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTnVtYmVyIG9mIHN0b2NrIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBjYXNoIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgR29sZENvdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdvbGRDb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY291bnQgb2YgZ29sZCBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgU3RvY2tDb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja0NvdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJjb3VudCBvZiBzdG9ja3MgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIExvYW5UYWtlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHRha2VuIGxvYW4gZnJvbSBiYW5rIG9yIG5vdFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQW1vdW50IG9mIGxvYW4gdGFrZW4gZnJvbSB0aGUgYmFua1wiLFxyXG4gICAgfSxcclxuICAgIE1hcmtldGluZ0Ftb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYXJrZXRpbmdBbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm1hcmtldGluZyBhbW91bnQgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIExhd3llclN0YXR1czoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMYXd5ZXJTdGF0dXNcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGhpcmVkIGEgbGF3eWVyIG9yIG5vdFwiLFxyXG4gICAgfSxcclxuICAgIElzQmFua3J1cHQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNCYW5rcnVwdFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgYmVlbiBCYW5rcnVwdGVkIG9yIG5vdFwiLFxyXG4gICAgfSxcclxuICAgIEJhbmtydXB0QW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJhbmtydXB0QW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGhvdyBtdWNoIHRpbWUgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcIixcclxuICAgIH0sXHJcbiAgICBTa2lwcGVkTG9hblBheW1lbnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcHBlZExvYW5QYXltZW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBza2lwcGVkIGxvYW4gcGF5bWVudFwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllclJvbGxDb3VudGVyOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclJvbGxDb3VudGVyXCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHRvIHN0b3JlIHJvbGwgY291bnRvciBmb3IgcGxheWVyXCIsXHJcbiAgICB9LFxyXG4gICAgSW5pdGlhbENvdW50ZXJBc3NpZ25lZDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJbml0aWFsQ291bnRlckFzc2lnbmVkXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgaXNHYW1lRmluaXNoZWQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiaXNHYW1lRmluaXNoZWRcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbFNjb3JlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsU2NvcmVcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsSEJDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsSEJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEJNQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEJNQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxHb2xkQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEdvbGRDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbExvYW5CYWxhbmNlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsTG9hbkJhbGFuY2VcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsU3RvY2tzQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbFN0b2Nrc0Nhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEdhbWVPdmVyOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkdhbWVPdmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgSXNBY3RpdmU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNBY3RpdmVcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gR2FtZSBNYW5hZ2VyIENsYXNzXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLShtYWluIGNsYXNzKSBjbGFzcyBmb3IgR2FtZSBNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSb2xsQ291bnRlciA9IDA7XHJcbnZhciBEaWNlVGVtcCA9IDA7XHJcbnZhciBEaWNlUm9sbCA9IDA7XHJcbnZhciBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxudmFyIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG5cclxudmFyIFBhc3NlZFBheURheSA9IGZhbHNlO1xyXG52YXIgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcblxyXG4vL2NhcmRzIGZ1bmN0aW9uYWxpdHlcclxudmFyIF9uZXh0VHVybkRvdWJsZVBheSA9IGZhbHNlO1xyXG52YXIgX3NraXBOZXh0VHVybiA9IGZhbHNlO1xyXG52YXIgX3NraXBOZXh0UGF5ZGF5ID0gZmFsc2U7IC8vc2tpcCB3aG9sZSBwYXkgZGF5XHJcbnZhciBfc2tpcEhNTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBfc2tpcEJNTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxudmFyIFR1cm5JblByb2dyZXNzID0gZmFsc2U7XHJcblxyXG52YXIgQmFja3NwYWNlcyA9IDM7XHJcbnZhciBpc0dhbWVPdmVyID0gZmFsc2U7XHJcbnZhciBPbmVRdWVzdGlvbkluZGV4ID0gLTE7XHJcbnZhciBPbmVRdWVzdGlvbnMgPSBbXCJ5b3UgaGF2ZSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1wiLCBcInlvdSBoYXZlIHRha2VuIGFueSBsb2FuP1wiLCBcInlvdSBoYXZlIGJhbmtydXB0ZWQgZXZlcj9cIiwgXCJ5b3VyIG5leHQgdHVybiBpcyBnb2luZyB0byBiZSBza2lwcGVkP1wiLCBcInlvdXIgbmV4dCBwYXlkYXkgaXMgZ29pbmcgdG8gYmUgZG91YmxlIHBheWRheT9cIl07XHJcblxyXG52YXIgQ2FyZERpc3BsYXlTZXRUaW1vdXQgPSBudWxsO1xyXG5cclxudmFyIEdhbWVNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiR2FtZU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgUGxheWVyR2FtZUluZm86IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImFsbCBwbGF5ZXIncyBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgQm90R2FtZUluZm86IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImFsbCBib3QncyBkYXRhXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIENhbWVyYU5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBjYW1lcmFcIixcclxuICAgIH0sXHJcbiAgICBBbGxQbGF5ZXJVSToge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2Ugb2YgdWkgb2YgYWxsIHBsYXllcnNcIixcclxuICAgIH0sXHJcbiAgICBBbGxQbGF5ZXJOb2Rlczoge1xyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2Ugb2Ygbm9kZSBvZiBhbGwgcGxheWVycyBpbnNpZGUgZ2FtZXBsYXlcIixcclxuICAgIH0sXHJcbiAgICBTdGFydExvY2F0aW9uTm9kZXM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIGF0dGF5IG9mIGxvY2F0aW9uc1wiLFxyXG4gICAgfSxcclxuICAgIFNlbGVjdGVkTW9kZToge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciByZWZlcmVuY2UgZm9yIGdhbWUgbW9kZSAxIG1lYW5zIGJvdCBhbmQgMiBtZWFucyByZWFsIHBsYXllcnNcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgc3RhdGljczoge1xyXG4gICAgUGxheWVyRGF0YTogUGxheWVyRGF0YSxcclxuICAgIEJ1c2luZXNzSW5mbzogQnVzaW5lc3NJbmZvLFxyXG4gICAgQ2FyZERhdGFGdW5jdGlvbmFsaXR5OiBDYXJkRGF0YUZ1bmN0aW9uYWxpdHksXHJcbiAgICBFbnVtQnVzaW5lc3NUeXBlOiBFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgSW5zdGFuY2U6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgU2V0UGxheWVyTGVmdChfc3RhdGUpIHtcclxuICAgIFBsYXllckxlZnQgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRBbGxWYXJpYWJsZXMoKSB7XHJcbiAgICBfZGljZWlucHV0MSA9IFwiXCI7XHJcbiAgICBfZGljZWlucHV0MiA9IFwiXCI7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMSA9IC0xO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDIgPSAtMTtcclxuICAgIFBsYXllckxlZnQgPSBmYWxzZTtcclxuICAgIFByZXZpb3VzRGljZVJvbGwzID0gLTE7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsNCA9IC0xO1xyXG5cclxuICAgIFByZXZpb3VzRGljZVJvbGw1ID0gLTE7XHJcbiAgICBHYW1lQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICB1c2VyR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgIEJvdEdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICBDb3JyZWN0QW5zd2VyID0gMDtcclxuICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIERpY2VSb2xsID0gMDtcclxuICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcbiAgICBGb3JjZUNoYW5nZVRpbWVPdXQgPSBudWxsO1xyXG4gICAgUGFzc2VkUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG4gICAgX3NraXBITU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG4gICAgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxuICAgIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICBUdXJuSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxuICAgIEJhY2tzcGFjZXMgPSAzO1xyXG4gICAgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgT25lUXVlc3Rpb25JbmRleCA9IC0xO1xyXG4gICAgT25lUXVlc3Rpb25zID0gW1wieW91IGhhdmUgc2tpcHBlZCBsb2FuIHByZXZpb3VzIHBheWRheT9cIiwgXCJ5b3UgaGF2ZSB0YWtlbiBhbnkgbG9hbj9cIiwgXCJ5b3UgaGF2ZSBiYW5rcnVwdGVkIGV2ZXI/XCIsIFwieW91ciBuZXh0IHR1cm4gaXMgZ29pbmcgdG8gYmUgc2tpcHBlZD9cIiwgXCJ5b3VyIG5leHQgcGF5ZGF5IGlzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXlkYXk/XCJdO1xyXG5cclxuICAgIENhcmREaXNwbGF5U2V0VGltb3V0ID0gbnVsbDtcclxuICAgIFRvdGFsQ291bnRlclJlYWNoZWQgPSBmYWxzZTtcclxuICAgIE5vQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBJbnB1dFRlc3REaWNlMShfdmFsKSB7XHJcbiAgICBpZiAoX2lzVGVzdCkge1xyXG4gICAgICBfZGljZWlucHV0MSA9IF92YWw7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5wdXRUZXN0RGljZTIoX3ZhbCkge1xyXG4gICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgX2RpY2VpbnB1dDIgPSBfdmFsO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBBbGwgRnVuY3Rpb25zIG9mIEdhbWVNYW5hZ2VyXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgY2xhc3MgaXMgY3JlYXRlZFxyXG4gICAqKi9cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsVmFyaWFibGVzKCk7XHJcbiAgICBHYW1lTWFuYWdlci5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB0aGlzLlR1cm5OdW1iZXIgPSAwO1xyXG4gICAgdGhpcy5UdXJuQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuU2VsZWN0ZWRNb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIHRoaXMuSW5pdF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4ID0gMDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiByZWZlcmVuY2Ugb2YgcmVxdWlyZWQgY2xhc3Nlc1xyXG4gICAqKi9cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGluaXRpYWwgZ2FtZW1hbmFnZXIgZXNzZXRpYWxzXHJcbiAgICoqL1xyXG4gIEluaXRfR2FtZU1hbmFnZXIoKSB7XHJcbiAgICB0aGlzLkNhbWVyYSA9IHRoaXMuQ2FtZXJhTm9kZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKTtcclxuICAgIHRoaXMuaXNDYW1lcmFab29taW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gW107XHJcbiAgICBSb2xsQ291bnRlciA9IDA7XHJcbiAgICBEaWNlVGVtcCA9IDA7XHJcbiAgICBEaWNlUm9sbCA9IDA7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9nYW1lIGlzIGJlaW5nIHBsYXllZCBieSByZWFsIHBsYXllcnNcclxuICAgICAgLy9pZiBqb2luZWQgcGxheWVyIGlzIHNwZWN0YXRlXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInN0YXR1cyBvZiBpbml0aWFsIGJ1c2luZXNzIHNldHA6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIikpO1xyXG5cclxuICAgICAgICAvL2lmIGluaXRhbCBzZXR1cCBoYXMgYmVlbiBkb25lIGFuZCBnYW1lIGlzIHVuZGVyIHdheVxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpID09IHRydWUpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICB2YXIgQWxsRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm8gPSBBbGxEYXRhO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgdGhpcy5UdXJuTnVtYmVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIik7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgIC8vdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IDg7XHJcbiAgICAgICAgICAvL3RoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLCBmYWxzZSwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9nYW1lIGlzIGJlaW5nIHBsYXllZCBieSBib3QgYWxvbmcgd2l0aCBvbmUgcGxheWVyXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSwgZmFsc2UsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNyZWdpb24gcHVibGljIGZ1bmN0aW9ucyB0byBnZXQgZGF0YSAoYWNjZXNzaWJsZSBmcm9tIG90aGVyIGNsYXNzZXMpXHJcbiAgR2V0VHVybk51bWJlcigpIHtcclxuICAgIHJldHVybiB0aGlzLlR1cm5OdW1iZXI7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBnZXQgbXkgaW5kZXggaW4gYXJyYXkgb2YgUGxheWVyR2FtZUluZm8gXHJcbiAgICoqL1xyXG4gIEdldE15SW5kZXgoKSB7XHJcbiAgICB2YXIgbXlJbmRleCA9IDA7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB2YXIgX2FsbEFjdG9ycyA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hbGxBY3RvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfYWN0b3IuUGxheWVyVUlEID09IF9hbGxBY3RvcnNbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgIG15SW5kZXggPSBpbmRleDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBteUluZGV4O1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZU1vZGUgQ29kZVxyXG5cclxuICBTeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKSB7XHJcbiAgICB2YXIgQWxsRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiKTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm8gPSBBbGxEYXRhO1xyXG4gICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXIgPiAwICYmIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPT0gdHJ1ZSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsIF90b1Bvcy55KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgdmFyIF9sYXN0SW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoIC0gMTtcclxuICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2xhc3RJbmRleF0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19sYXN0SW5kZXhdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKF90b1Bvcy54LCBfdG9Qb3MueSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKFwic3luY2VkIHBsYXllcm5vZGVzXCIpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKCkge1xyXG4gICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgaWYgKFR1cm5DaGVja0FycmF5Lmxlbmd0aCA9PSBUb3RhbENvbm5lY3RlZFBsYXllcnMpIHtcclxuICAgICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgICAgdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gZnVuY3Rpb25zIHJlbGF0ZWQgdG8gVHVybiBNZWNoYW5pc20gYW5kIGNhcmQgbWVjaGFuaXNtXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSB3aGF0IGNhcmQgaGFzIGJlZW4gc2VsZWN0ZWQgYnkgcGxheWVyXHJcbiAgICoqL1xyXG4gIFJhaXNlRXZlbnRGb3JDYXJkKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDUsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBDbGVhckRpc3BsYXlUaW1lb3V0KCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICB9LFxyXG5cclxuICBEaXNwbGF5Q2FyZE9uT3RoZXJzKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FyZCBldmVudCByZWNlaXZlZDogXCIgKyBDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgICAgIGlmIChDYXJkRXZlbnRSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IodGhpcy5DYXJkQ291bnRlcik7XHJcbiAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMuQ2FyZERpc3BsYXllZCkge1xyXG4gICAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkID0gdHJ1ZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLkNhcmRDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKGZhbHNlLCB0aGlzLlJhbmRvbUNhcmRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIENhcmREaXNwbGF5U2V0VGltb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAvL2NoZWNrIGFmdGVyIGV2ZXJ5IDAuNSBzZWNvbmRzXHJcbiAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0Q2FyZERpc3BsYXkoKSB7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRGb3JDYXJkKF9kYXRhKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgY29uc29sZS5sb2coXCJDYXJkIERhdGEgUmVjZWl2ZWQ6XCIpO1xyXG4gICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG5cclxuICAgIHZhciBSYW5kb21DYXJkID0gX2RhdGEucmFuZG9tQ2FyZDtcclxuICAgIHZhciBjb3VudGVyID0gX2RhdGEuY291bnRlcjtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleCA9IFJhbmRvbUNhcmQ7XHJcbiAgICB0aGlzLkNhcmRDb3VudGVyID0gY291bnRlcjtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZSh0cnVlLCBSYW5kb21DYXJkKTtcclxuICAgICAgZWxzZSBDYXJkRXZlbnRSZWNlaXZlZCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSBmYWxzZSkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UodHJ1ZSwgUmFuZG9tQ2FyZCk7XHJcbiAgICAgIGVsc2UgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsIFJhbmRvbUNhcmQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUuZXJyb3IoQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSBwYXJ0aWN1bGFyIHBsYXllciBoYXMgY29tcGxldGUgdGhlaXIgbW92ZVxyXG4gICAqKi9cclxuICBSYWlzZUV2ZW50VHVybkNvbXBsZXRlKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwicmFpc2VkIGZvciB0dXJuIGNvbXBsZXRlXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN5bmNBbGxEYXRhKCkge1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBvbiBhbGwgcGxheWVycyB0byB2YWxpZGF0ZSBpZiBtb3ZlIGlzIGNvbXBsZXRlZCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHNcclxuICAgKiovXHJcbiAgUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlKF91aWQpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKFR1cm5DaGVja0FycmF5Lmxlbmd0aCA9PSAwKSBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpO1xyXG5cclxuICAgICAgICB2YXIgQXJyYXlMZW5ndGggPSBUdXJuQ2hlY2tBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIElERm91bmQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQXJyYXlMZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChUdXJuQ2hlY2tBcnJheVtpbmRleF0gPT0gX3VpZCkgSURGb3VuZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIUlERm91bmQpIHtcclxuICAgICAgICAgIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tqXS5Jc0FjdGl2ZSkgVG90YWxDb25uZWN0ZWRQbGF5ZXJzKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFRvdGFsQ29ubmVjdGVkUGxheWVycyk7XHJcblxyXG4gICAgICAgIGlmIChUdXJuQ2hlY2tBcnJheS5sZW5ndGggPj0gVG90YWxDb25uZWN0ZWRQbGF5ZXJzKSB7XHJcbiAgICAgICAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgLy90aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gZGljZSBhbmltYXRpb24gaXMgcGxheWVkIG9uIGFsbCBwbGF5ZXJzXHJcbiAgICoqL1xyXG4gIENoYW5nZVR1cm4oKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB0aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuVHVybk51bWJlciA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkgdGhpcy5UdXJuTnVtYmVyID0gdGhpcy5UdXJuTnVtYmVyICsgMTtcclxuICAgIGVsc2UgdGhpcy5UdXJuTnVtYmVyID0gMDtcclxuXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsIHRoaXMuVHVybk51bWJlcik7XHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlVHVybkZvcmNlZnVsbHkoKSB7XHJcbiAgICBpZiAoSXNUd2VlbmluZykge1xyXG4gICAgICBjbGVhclRpbWVvdXQoRm9yY2VDaGFuZ2VUaW1lT3V0KTtcclxuICAgICAgRm9yY2VDaGFuZ2VUaW1lT3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VUdXJuRm9yY2VmdWxseSgpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChGb3JjZUNoYW5nZVRpbWVPdXQpO1xyXG4gICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBVcGRhdGVWaXN1YWxEYXRhKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIGZyb20gcmFpc2Ugb24gZXZlbnQgKGZyb20gZnVuY3Rpb24gXCJTdGFydFR1cm5cIiBhbmQgXCJDaGFuZ2VUdXJuXCIgb2YgdGhpcyBzYW1lIGNsYXNzKSB0byBoYW5kbGUgdHVyblxyXG4gICAqKi9cclxuICBUdXJuSGFuZGxlcihfdHVybikge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdmFyIF9pc01hc3RlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCk7XHJcbiAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1tfdHVybl0uSXNBY3RpdmUpIHtcclxuICAgICAgICBpZiAoX2lzTWFzdGVyKSB7XHJcbiAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vdGhpcy5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICB0aGlzLlVwZGF0ZVZpc3VhbERhdGEoKTtcclxuICAgIGNvbnNvbGUubG9nKFwiVHVybjogXCIgKyBfdHVybik7XHJcbiAgICB2YXIgX3BsYXllck1hdGNoZWQgPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxuICAgIGlmIChJc1R3ZWVuaW5nKSB7XHJcbiAgICAgIC8vY2hlY2sgaWYgYW5pbWF0aW9uIG9mIHR1cm4gYmVpbmcgcGxheWVkIG9uIG90aGVyIHBsYXllcnNcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5UdXJuSGFuZGxlcihfdHVybik7XHJcbiAgICAgIH0sIDgwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlR1cm5OdW1iZXIgPSBfdHVybjtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgX3NraXBOZXh0VHVybiA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codXNlckdhbWVPdmVyKTtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgIGlmICghdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IC8vdHVybiBkZWNpc2lvbnMgZm9yIGJvdFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgX3NraXBOZXh0VHVybiA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICBpZiAoIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJvbGxEaWNlKCk7XHJcbiAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLCB0aGlzLlR1cm5OdW1iZXIsIHRydWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVHVybiBPZjogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGxQbGF5ZXJVSVt0aGlzLlR1cm5OdW1iZXJdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCkpO1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy9za2lwIHRoaXMgdHVybiBhcyBza2lwIHR1cm4gaGFzIGJlZW4gY2FsbGVkIGJlZm9yZVxyXG4gICAgICBpZiAoX3BsYXllck1hdGNoZWQgJiYgX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsIDEyMDApO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2tpcE5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9pbmQpIHtcclxuICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgIHZhciBNeURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX2NvdW50ZXIgPSBfaW5kO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEKTtcclxuICAgIC8vICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIC8vICAgd2hpbGUgKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLklzQWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgIC8vICAgICBfY291bnRlcisrO1xyXG4gICAgICAvLyAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQgPT0gTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdID0gTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG5cclxuICAgICAgICBpZiAoX2NvdW50ZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYWRkaW5nIGNvdW50ZXI6IFwiK19jb3VudGVyKTtcclxuICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzeW5jZWQgRGF0YTpcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGFsbCBwbGF5ZXJzIGhhdmUgZG9uZSB0aGVpciBpbml0aWFsIHNldHVwIGFuZCBmaXJzdCB0dXJuIHN0YXJ0c1xyXG4gICAgQG1ldGhvZCBTdGFydFR1cm5cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFN0YXJ0VHVybigpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgIHRoaXMuVHVybk51bWJlciA9IDA7IC8vcmVzZXRpbmcgdGhlIHR1cm4gbnVtYmVyIG9uIHN0YXJ0IG9mIHRoZSBnYW1lXHJcblxyXG4gICAgLy9zZW5kaW5nIGluaXRpYWwgdHVybiBudW1iZXIgb3ZlciB0aGUgbmV0d29yayB0byBzdGFydCB0dXJuIHNpbXVsdGFub3VzbHkgb24gYWxsIGNvbm5lY3RlZCBwbGF5ZXIncyBkZXZpY2VzXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsIHRoaXMuVHVybk51bWJlcik7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUJhbmtydXB0RGF0YShfZGF0YSkge1xyXG4gICAgLy9vdGhlciBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFxyXG4gICAgdmFyIF9pc0JhbmtydXB0ZWQgPSBfZGF0YS5EYXRhLmJhbmtydXB0ZWQ7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLnR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGFNYWluO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF9pc0JhbmtydXB0ZWQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coX3R1cm4pO1xyXG4gICAgLy8gY29uc29sZS5sb2coX3BsYXllckRhdGEpO1xyXG5cclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3R1cm5dID0gX3BsYXllckRhdGE7XHJcblxyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkodHJ1ZSk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKHRydWUpO1xyXG5cclxuICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpIHtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIH0sIDEwMDApO1xyXG5cclxuICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEZ1bmN0aW9uIGZvciBnYW1lcGxheVxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiBwbGF5ZXIgVUkgKG5hbWUvaWNvbnMvbnVtYmVyIG9mIHBsYXllcnMgdGhhdCB0byBiZSBhY3RpdmUgZXRjKVxyXG4gICAgQG1ldGhvZCBBc3NpZ25QbGF5ZXJHYW1lVUlcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEFzc2lnblBsYXllckdhbWVVSShfaXNCYW5rcnVwdGVkID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBpZiAoIV9pc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB2YXIgX3JhbmRvbUluZGV4ID0gdGhpcy5nZXRSYW5kb20oMCwgdGhpcy5Cb3RHYW1lSW5mby5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm8ucHVzaCh0aGlzLkJvdEdhbWVJbmZvW19yYW5kb21JbmRleF0pO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IDI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8gPSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuU2V0QXZhdGFyKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlR2FtZVVJKF90b2dnbGVIaWdobGlnaHQsIF9pbmRleCkge1xyXG4gICAgaWYgKF90b2dnbGVIaWdobGlnaHQpIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtfaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8gPSB0aGlzLlBsYXllckdhbWVJbmZvW19pbmRleF07XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9pbmRleCA9PSBpbmRleCkge1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlQkdIaWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlQkdIaWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5Ub2dnbGVUZXh0aWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gZW5iYWxlIHJlc3BlY3RpdmUgcGxheWVycyBub2RlcyBpbnNpZGUgZ2FtYXBsYXlcclxuICAgIEBtZXRob2QgRW5hYmxlUGxheWVyTm9kZXNcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEVuYWJsZVBsYXllck5vZGVzKF9pc0JhbmtydXB0ZWQgPSBmYWxzZSkge1xyXG4gICAgaWYgKCFfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQgPT0gMSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQgPT0gMSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSG9tZUJhc2VkQW1vdW50ID09IDEpIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJyaWNrQW5kTW9ydGFyQW1vdW50ID09IDEpIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkF2YXRhclNwcml0ZXNbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySURdO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKSB7XHJcbiAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsIDEyMCkpO1xyXG4gICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uID0gdGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG5cclxuICAgIGxldCByYXRpbyA9IHRhcmdldFBvcy55IC8gY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAyO1xyXG4gIH0sXHJcblxyXG4gIGxhdGVVcGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5pc0NhbWVyYVpvb21pbmcpIHRoaXMuU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpO1xyXG4gIH0sXHJcblxyXG4gIHN5bmNEaWNlUm9sbChfcm9sbCkge1xyXG4gICAgdmFyIF9kaWNlMSA9IF9yb2xsLmRpY2UxO1xyXG4gICAgdmFyIF9kaWNlMiA9IF9yb2xsLmRpY2UyO1xyXG4gICAgdmFyIF9yZXN1bHQgPSBfZGljZTEgKyBfZGljZTI7XHJcblxyXG4gICAgSXNUd2VlbmluZyA9IHRydWU7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEID09IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9PSAwICYmICF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgIFJvbGxDb3VudGVyID0gMTM7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPT0gMTIpIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciArIDIxO1xyXG4gICAgICBlbHNlIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciArIDE7XHJcblxyXG4gICAgICBSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlciAtIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIERpY2VSb2xsID0gX3Jlc3VsdDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5QcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24oRGljZVJvbGwpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5UdXJuTnVtYmVyID09IGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5nZXRDb21wb25lbnQoXCJEaWNlQ29udHJvbGxlclwiKS5BbmltYXRlRGljZShfZGljZTEsIF9kaWNlMik7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgLy8gdmFyIF9wb3M9dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgLy8gdGhpcy5Ud2VlbkNhbWVyYShfcG9zLHRydWUsMC40KTtcclxuICB9LFxyXG5cclxuICBEaWNlRnVudGlvbmFsaXR5KCkge1xyXG4gICAgbGV0IHRhcmdldFBvcyA9IHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLCAxMjApKTtcclxuICAgIHZhciBfcG9zID0gdGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgdGhpcy5Ud2VlbkNhbWVyYShfcG9zLCB0cnVlLCAwLjQpO1xyXG4gIH0sXHJcblxyXG4gIFRlbXBDaGVja1NwYWNlKF9yb2xsaW5nKSB7XHJcbiAgICB2YXIgdGVtcGNvdW50ZXIgPSAwO1xyXG4gICAgdmFyIHRlbXBjb3VudGVyMiA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEID09IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIHRlbXBjb3VudGVyMiA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0ZW1wY291bnRlcjIgLSAxIDwgMCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwic3RhcnRpbmcgZnJvbSBvYmxpdmlvblwiKTtcclxuICAgICAgdGVtcGNvdW50ZXIgPSB0ZW1wY291bnRlcjIgKyBfcm9sbGluZyAtIDE7XHJcbiAgICAgIHZhciBkaWNldG9iZSA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIiArIGRpY2V0b2JlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRlbXBjb3VudGVyID0gdGVtcGNvdW50ZXIyICsgX3JvbGxpbmc7XHJcbiAgICAgIHZhciBkaWNldG9iZSA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIiArIGRpY2V0b2JlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSb2xsRGljZTogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgIHZhciBEaWNlMTtcclxuICAgICAgdmFyIERpY2UyO1xyXG4gICAgICBpZiAoX2lzVGVzdCAmJiB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICBEaWNlMSA9IHBhcnNlSW50KF9kaWNlaW5wdXQxKTtcclxuICAgICAgICBEaWNlMiA9IHBhcnNlSW50KF9kaWNlaW5wdXQyKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gdHJ1ZSAmJiBfaXNUZXN0KSB7XHJcbiAgICAgICAgRGljZTEgPSA1MDtcclxuICAgICAgICBEaWNlMiA9IDM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuICAgICAgICBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDEgPT0gRGljZTEpIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMiA9PSBEaWNlMikgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICAgICAgUHJldmlvdXNEaWNlUm9sbDEgPSBEaWNlMTtcclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsMiA9IERpY2UyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB2YXIgRGljZTE9MjA7XHJcbiAgICAgIC8vIHZhciBEaWNlMj0xO1xyXG5cclxuICAgICAgRGljZVJvbGwgPSBEaWNlMSArIERpY2UyO1xyXG4gICAgICB2YXIgX25ld1JvbGwgPSB7IGRpY2UxOiBEaWNlMSwgZGljZTI6IERpY2UyIH07XHJcbiAgICAgIC8vRGljZVJvbGw9MjM7XHJcbiAgICAgIC8vdGhpcy5UZW1wQ2hlY2tTcGFjZShEaWNlUm9sbCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZGljZSBudW1iZXI6IFwiICsgRGljZVJvbGwgKyBcIiwgRGljZTE6XCIgKyBEaWNlMSArIFwiLCBEaWNlMjpcIiArIERpY2UyKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMywgX25ld1JvbGwpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJvbGxPbmVEaWNlKCkge1xyXG4gICAgdmFyIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGw1ID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIFByZXZpb3VzRGljZVJvbGw1ID0gRGljZTE7XHJcblxyXG4gICAgcmV0dXJuIERpY2UxO1xyXG4gIH0sXHJcblxyXG4gIFJvbGxUd29EaWNlcygpIHtcclxuICAgIHZhciBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgdmFyIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGwzID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIGlmIChQcmV2aW91c0RpY2VSb2xsNCA9PSBEaWNlMikgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMyA9IERpY2UxO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDQgPSBEaWNlMjtcclxuXHJcbiAgICByZXR1cm4gRGljZTEgKyBEaWNlMjtcclxuICB9LFxyXG5cclxuICBjYWxsVXBvbkNhcmQoKSB7XHJcbiAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBfc3BhY2VJRCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICBpZiAoX3NwYWNlSUQgIT0gNiAmJiBfc3BhY2VJRCAhPSA3KSB7XHJcbiAgICAgICAgICAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVuYXMgc2VsbCBzcGFjZVxyXG4gICAgICAgICAgdmFyIFJhbmRvbUNhcmQgPSB0aGlzLmdldFJhbmRvbSgwLCAxNSk7XHJcblxyXG4gICAgICAgICAgLy9mb3IgdGVzdGluZyBvbmx5XHJcbiAgICAgICAgICBpZiAoX3NwYWNlSUQgPT0gMikge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIGJpZyBidXNpbmVzc1xyXG4gICAgICAgICAgICB2YXIgdmFsdWVJbmRleCA9IFswLCAxLCA3LCAxMCwgMiwgMywgNCwgNSwgNiwgOF07XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDEwKTtcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSAxO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSA1KSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgbG9zc2VzIGNhcmRzXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4ID0gWzAsIDEsIDUsIDYsIDIsIDcsIDMsIDQsIDgsIDldO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCAxMCk7XHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB2YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgLy8gUmFuZG9tQ2FyZCA9IDA7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF9zcGFjZUlEID09IDMpIHtcclxuICAgICAgICAgICAgLy9sYW5kZWQgb24gc29tZSBtYXJrZXRpbmcgY2FyZHNcclxuICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXggPSBbMCwgNywgMywgOCwgMTMsIDksIDEsIDIsIDQsIDVdO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCAxMCk7XHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB2YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gNTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3NwYWNlSUQgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIHdpbGQgY2FyZHNcclxuICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXggPSBbMCwgMSwgNiwgMTAsIDIsIDMsIDRdO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCA3KTtcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoX3NwYWNlSUQpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIHJlYWwgcGxheWVyXHJcbiAgICAgICAgICAgIGlmIChfc3BhY2VJRCA9PSAxMikge1xyXG4gICAgICAgICAgICAgIC8vIGlmIHBsYXllciBsYW5kZWQgb24gZmluaXNoIHNwYWNlXHJcbiAgICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDU7XHJcbiAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YSA9IHsgcmFuZG9tQ2FyZDogUmFuZG9tQ2FyZCwgY291bnRlcjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICAgICAgaWYgKF9zcGFjZUlEID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgLy8gaWYgcGxheWVyIGxhbmRlZCBvbiBmaW5pc2ggc3BhY2VcclxuICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGEgPSB7IHJhbmRvbUNhcmQ6IFJhbmRvbUNhcmQsIGNvdW50ZXI6IFJvbGxDb3VudGVyIH07XHJcbiAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIEJvdEdhbWVPdmVyKSB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIHVzZXJHYW1lT3ZlcikgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wbGV0ZSB0dXJuIGlzIGNhbGxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKHRydWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBsZXRlQ2FyZFR1cm4oKSB7XHJcbiAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gIH0sXHJcblxyXG4gIENhbGxHYW1lQ29tcGxldGUoX2lzQm90ID0gZmFsc2UsIF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgLy8gaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgIC8vICAgICB0aGlzLlR1cm5OdW1iZXIgPSB0aGlzLkdldE15SW5kZXgoKTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gMDtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicGxheWVyIGlzIG5vdCBhY3RpdmUgcmV0dXJuaW5nXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY2FsY3VsYXRpbmcuLi4uXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJhZ21lIGlzIG5vdCBmaW5pc2hlZFwiKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgdmFyIF9jYXNoID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgICAgICB2YXIgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICB2YXIgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgIHZhciBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICAgIGxvYW5BbW91bnQgKz0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIF9nb2xkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudDtcclxuICAgICAgICAgIHZhciBfc3RvY2tzID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgIHZhciBPbmNlT3JTaGFyZSA9IF9kaWNlUmFuZG9tICogMTAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgR29sZENhc2ggPSBPbmNlT3JTaGFyZSAqIF9nb2xkO1xyXG4gICAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgICB2YXIgQk1DYXNoID0gKEJNQW1vdW50ICsgQk1Mb2NhdGlvbnMpICogMTUwMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBITUNhc2ggPSAwO1xyXG4gICAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMikgSE1DYXNoID0gMjUwMDAgKyA2MDAwMDtcclxuICAgICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDMpIEhNQ2FzaCA9IDI1MDAwICsgMjUwMDAgKyA2MDAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTY29yZSA9IFRvdGFsQXNzZXRzO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsSEJDYXNoID0gSE1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsR29sZENhc2ggPSBHb2xkQ2FzaDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFN0b2Nrc0Nhc2ggPSBTdG9ja0Nhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0pO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0YSBwdXNoZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBfcGxheWVySW5kZXggPSAwOyBfcGxheWVySW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgX3BsYXllckluZGV4KyspIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX2Nhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICB2YXIgSE1BbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICB2YXIgQk1Mb2NhdGlvbnMgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBsb2FuQW1vdW50ICs9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBfZ29sZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ7XHJcbiAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICB2YXIgT25jZU9yU2hhcmUgPSBfZGljZVJhbmRvbSAqIDEwMDA7XHJcblxyXG4gICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgdmFyIEJNQ2FzaCA9IChCTUFtb3VudCArIEJNTG9jYXRpb25zKSAqIDE1MDAwMDtcclxuXHJcbiAgICAgICAgdmFyIEhNQ2FzaCA9IDA7XHJcbiAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDIpIEhNQ2FzaCA9IDI1MDAwICsgNjAwMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMykgSE1DYXNoID0gMjUwMDAgKyAyNTAwMCArIDYwMDAwO1xyXG5cclxuICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU2NvcmUgPSBUb3RhbEFzc2V0cztcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxIQkNhc2ggPSBITUNhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEdvbGRDYXNoID0gR29sZENhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU3RvY2tzQ2FzaCA9IFN0b2NrQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDYsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50VG9TeW5jR2FtZUNvbXBsZXRlRGF0YShfZGF0YSkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNiwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFN5bmNHYW1lT3ZlcihfVUlEKSB7XHJcbiAgICB2YXIgaW5mb1RleHQgPSBcIlwiO1xyXG4gICAgdmFyIHN0YXR1c1RleHQgPSBcIlwiO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGlmICghR2FtZUNvbXBsZXRlZCkge1xyXG4gICAgICAgIEdhbWVDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdERhdGEoKTtcclxuICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgdmFyIE15RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdmFyIF9pbmRleCA9IC0xO1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQgPT0gX1VJRCkge1xyXG4gICAgICAgICAgICAgIF9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc3RhdHVzVGV4dCA9IFwiR2FtZSB3b24gYnkgXCIgKyBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAgICAgLy95b3Ugd29uXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkNvbmdyYXRzISB5b3UgaGF2ZSB3b24gdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgX2N1cnJlbnRDYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgICAgICAgICB2YXIgX3RvdGFsID0gX2N1cnJlbnRDYXNoICsgcGFyc2VJbnQoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gX3RvdGFsLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3dvbiA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uKTtcclxuICAgICAgICAgICAgX3dvbiA9IF93b24gKyAxO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbiA9IF93b24udG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKF90b3RhbCwgX3dvbiwgLTEpO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJVbmZvcnR1bmF0ZWx5ISB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiO1xyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vd2l0aCBib3RcclxuICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICB2YXIgTXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKE15RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzBdLkdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmIChNeURhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICBzdGF0dXNUZXh0ID0gXCJDb25ncmF0cyEgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiO1xyXG4gICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiT3RoZXIgUGxheWVyIEVhcm5lZCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMV0uVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICB2YXIgX2N1cnJlbnRDYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgICAgIHZhciBfdG90YWwgPSBfY3VycmVudENhc2ggKyBwYXJzZUludChNeURhdGEuVG90YWxTY29yZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2ggPSBfdG90YWwudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgdmFyIF93b24gPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbik7XHJcbiAgICAgICAgX3dvbiA9IF93b24gKyAxO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uID0gX3dvbi50b1N0cmluZygpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKF90b3RhbCwgX3dvbiwgLTEpO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy95b3UgbG9zZVxyXG5cclxuICAgICAgICBzdGF0dXNUZXh0ID0gXCJVbmZvcnR1bmF0ZWx5ISB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiO1xyXG4gICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiT3RoZXIgUGxheWVyIEVhcm5lZCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMV0uVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTeW5jR2FtZUNvbXBsZXRlRGF0YShfZGF0YSkge1xyXG4gICAgdmFyIF9pc0JvdCA9IF9kYXRhLkJvdDtcclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKHRydWUsIGZhbHNlKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJHYW1lIG92ZXIsIGNhbGN1bGF0aW5nIHRvdGFsIGNhc2guLi5cIiwgMTUwMCwgZmFsc2UpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcblxyXG4gICAgICAgIHZhciBtYXggPSAtMTtcclxuICAgICAgICB2YXIgU2VsZWN0ZWRJbmQgPSAwO1xyXG4gICAgICAgIHZhciBTZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICBpZiAoX3ZhbHVlID4gbWF4KSB7XHJcbiAgICAgICAgICAgIFNlbGVjdGVkSW5kID0gaW5kZXg7XHJcbiAgICAgICAgICAgIG1heCA9IF92YWx1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChTZXNzaW9uRGF0YVtpbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfdmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS50cmFjZShcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIgKyBTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLlBsYXllclVJRCk7XHJcbiAgICAgIH0sIDE1MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUoZmFsc2UsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIkdhbWUgb3ZlciwgY2FsY3VsYXRpbmcgdG90YWwgY2FzaC4uLlwiLCA0MDAwLCBmYWxzZSk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKSk7XHJcbiAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgICAgdmFyIG1heCA9IC0xO1xyXG4gICAgICAgICAgdmFyIFNlbGVjdGVkSW5kID0gMDtcclxuICAgICAgICAgIHZhciBTZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoX3ZhbHVlID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBTZWxlY3RlZEluZCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gX3ZhbHVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKFNlc3Npb25EYXRhW2luZGV4XS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS50cmFjZShcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIgKyBTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFsbFBsYXllcnNHYW1lQ29tcGxldGVkKF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IEJvdDogX2lzQm90IH07XHJcbiAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhKF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBHYW1lT3ZlcihfZm9yY2VHYW1lT3ZlciA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgICAgICB2YXIgcGxheWVyY29tcGxldGVkID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUpIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY29tcGxldGVkOiBcIiArIHBsYXllcmNvbXBsZXRlZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgZ2FtZWluZm8gbGVuZ3RoOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKTtcclxuICAgICAgICBpZiAocGxheWVyY29tcGxldGVkID49IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoIHx8IF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAvL2dhbWUgY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1cclxuICAgICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCkgQm90R2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICBlbHNlIHVzZXJHYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcInVzZXJnYW1lb3ZlcjogXCIgKyB1c2VyR2FtZU92ZXIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImJvdGdhbWVvdmVyOiBcIiArIEJvdEdhbWVPdmVyKTtcclxuICAgICAgLy8gdGhpcy5DYWxsR2FtZUNvbXBsZXRlKHRydWUpO1xyXG4gICAgICB2YXIgcGxheWVyY29tcGxldGVkID0gMDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBsYXllcmNvbXBsZXRlZCA9PSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCkge1xyXG4gICAgICAgIC8vZ2FtZWNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtc1xyXG4gICAgICAgIEJvdEdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICB1c2VyR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIFN0YXJ0RGljZVJvbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChSb2xsQ291bnRlciA+PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiR2FtZW92ZXJcIik7XHJcbiAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5HYW1lT3ZlcihmYWxzZSk7XHJcbiAgICAgIH0sIDE1MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgRGljZVRlbXAgPSBEaWNlVGVtcCArIDE7XHJcbiAgICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuVHdlZW5QbGF5ZXIodGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0UmFuZG9tOiBmdW5jdGlvbiAobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgfSxcclxuXHJcbiAgVHdlZW5DYW1lcmE6IGZ1bmN0aW9uIChfcG9zLCBpc1pvb20sIHRpbWUpIHtcclxuICAgIGNjLnR3ZWVuKHRoaXMuQ2FtZXJhTm9kZSlcclxuICAgICAgLnRvKHRpbWUsIHsgcG9zaXRpb246IGNjLnYyKF9wb3MueCwgX3Bvcy55KSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzWm9vbSkgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgICBlbHNlIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICB9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICBab29tQ2FtZXJhSW4oKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA8IDIpIHtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSB0aGlzLkNhbWVyYS56b29tUmF0aW8gKyAwLjAzO1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMjtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICB9LFxyXG5cclxuICBDaGVja1BheURheUNvbmRpdGlvbnMoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIGlmIChSb2xsQ291bnRlciA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2KSB7XHJcbiAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gUGFzc2VkUGF5RGF5Q291bnRlciArIDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNykge1xyXG4gICAgICAgIERvdWJsZVBheURheSA9IHRydWU7XHJcbiAgICAgICAgRG91YmxlUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9uZXh0VHVybkRvdWJsZVBheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheTtcclxuICAgIGlmIChQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSAmJiAhX25leHRUdXJuRG91YmxlUGF5KSB7XHJcbiAgICAgIC8vdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgIC8vdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKGZhbHNlLCBfaXNCb3QpO1xyXG4gICAgfSBlbHNlIGlmIChEb3VibGVQYXlEYXkgfHwgKFBhc3NlZFBheURheSAmJiBfbmV4dFR1cm5Eb3VibGVQYXkpKSB7XHJcbiAgICAgIC8vdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgIC8vdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKHRydWUsIF9pc0JvdCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFpvb21DYW1lcmFPdXRPbmx5KCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkNhbWVyYS56b29tUmF0aW8gPj0gMSkge1xyXG4gICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gdGhpcy5DYW1lcmEuem9vbVJhdGlvIC0gMC4wMztcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uID0gY2MuVmVjMigwLCAwKTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAxO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfSxcclxuXHJcbiAgWm9vbUNhbWVyYU91dCgpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5DYW1lcmEuem9vbVJhdGlvID49IDEpIHtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IHRoaXMuQ2FtZXJhLnpvb21SYXRpbyAtIDAuMDM7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uID0gY2MuVmVjMigwLCAwKTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAxO1xyXG4gICAgICAgIC8vIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKDApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCAmJiAhQm90R2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnModGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ICYmICF1c2VyR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgICAgLy9yZWFsIHBsYXllclxyXG4gICAgICAgICAgaWYgKFBsYXllckxlZnQpIHtcclxuICAgICAgICAgICAgLy8gSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBQbGF5ZXJMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKCk7XHJcbiAgICAgICAgICBlbHNlIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfSxcclxuXHJcbiAgVHdlZW5QbGF5ZXI6IGZ1bmN0aW9uIChOb2RlLCBUb1Bvcykge1xyXG4gICAgY2MudHdlZW4oTm9kZSkgLy8wLjRcclxuICAgICAgLnRvKDAuNCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmIChEaWNlVGVtcCA8IERpY2VSb2xsKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhEaWNlVGVtcCArIFwiIFwiICsgUm9sbENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFCb3RHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNiB8fFxyXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gN1xyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJib3QgZ2FtZSBpcyBvdmVyXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoIXVzZXJHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNiB8fFxyXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gN1xyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLy8gY29uc29sZS5lcnJvcihQYXNzZWRQYXlEYXlDb3VudGVyKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGdhbWUgaXMgb3ZlciBza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFBhc3NlZFBheURheSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgRG91YmxlUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgRG91YmxlUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBmaW5pc2hlZCBmb3I6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChSb2xsQ291bnRlciA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKFJvbGxDb3VudGVyID09IDEyKSBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMjE7XHJcbiAgICAgICAgICAgIGVsc2UgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDE7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMTtcclxuICAgICAgICAgICAgRGljZVRlbXAgPSBEaWNlUm9sbDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvL0RpY2VUZW1wPURpY2VUZW1wKzE7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhEaWNlVGVtcCArIFwiIFwiICsgUm9sbENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgLy90aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBfbmV3cG9zID0gY2MuVmVjMigwLCAwKTtcclxuICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcywgZmFsc2UsIDAuNik7IC8vem9vbW91dFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgLy9ydWxlcyBpbXBsbWVudGF0aW9uIGR1cmluZyB0dXJuICh0dXJuIGRlY2lzaW9ucylcclxuXHJcbiAgVG9nZ2xlUGF5RGF5KF9zdDEsIF9TdDIpIHtcclxuICAgIFBhc3NlZFBheURheSA9IF9zdDE7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfU3QyO1xyXG5cclxuICAgIGlmICghX3N0MSkge1xyXG4gICAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9TdDIpIHtcclxuICAgICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5jcmVhc2VEb3VibGVQYXlEYXkoKSB7XHJcbiAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgfSxcclxuXHJcbiAgRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKGFtb3VudCwgX2luZGV4LCBfbG9jYXRpb25OYW1lLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoIDwgMykge1xyXG4gICAgICBpZiAoIV9pc0NhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCAtIGFtb3VudDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCArIDE7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5wdXNoKF9sb2NhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLCAxMDAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgIH0sIDEyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2ggdG8gZXhwYW5kIHRoaXMgYnVzaW5lc3MsIGNhc2ggbmVlZGVkICQgXCIgKyBhbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX0dpdmVuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIF9HaXZlbkNhc2ggPSBfR2l2ZW5DYXNoIC0gYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ICsgMTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsIDEwMDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIiArIGFtb3VudCArIFwiLCBDYXNoIEdpdmVuICRcIiArIF9HaXZlbkNhc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGxvY2F0aW9uc1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChwYXJzZUludCh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIC8vdGhpcyBtZWFucyB0aGVyZSBpcyBicmljayBhbmQgbW9ydGFyIGluIGxpc3RcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRCdXNpbmVzc0luZGV4KGkpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldENhcmRGdW5jdGlvbmFsaXR5KF9pc0NhcmRGdW5jdGlvbmFsaXR5KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRHaXZlbkNhc2goX0dpdmVuQ2FzaCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlJlc2V0RWRpdEJveCgpO1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhCdXNpbmVzc0xvY2F0aW9uTm9kZXMpO1xyXG4gICAgcmV0dXJuIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7XHJcbiAgfSxcclxuXHJcbiAgRGVzdHJveUdlbmVyYXRlZE5vZGVzKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbihfbmFtZSwgX1NoYXJlQW1vdW50LCBfaXNBZGRpbmcpIHtcclxuICAgIGlmIChfaXNBZGRpbmcpIHtcclxuICAgICAgdmFyIF9zdG9jayA9IG5ldyBTdG9ja0luZm8oKTtcclxuICAgICAgX3N0b2NrLkJ1c2luZXNzTmFtZSA9IF9uYW1lO1xyXG4gICAgICBfc3RvY2suU2hhcmVBbW91bnQgPSBfU2hhcmVBbW91bnQ7XHJcblxyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZlN0b2Nrcy5wdXNoKF9zdG9jayk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfZm9yU2VsZWN0ZWRCdXNpbmVzcyA9IGZhbHNlLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMCwgSEJBbW91bnQgPSAwLCBCTUFtb3VudCA9IDAsIEJNTG9jYXRpb25zID0gMCkge1xyXG4gICAgaWYgKF9mb3JTZWxlY3RlZEJ1c2luZXNzKSB7XHJcbiAgICAgIHZhciBfdGl0bGUgPSBcIlBheURheVwiO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBfaXNCb3QsIF9mb3JTZWxlY3RlZEJ1c2luZXNzLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4LCBIQkFtb3VudCwgQk1BbW91bnQsIEJNTG9jYXRpb25zLCAxLCAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChEb3VibGVQYXlEYXkgJiYgUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBfc2tpcE5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk7XHJcbiAgICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXk7XHJcbiAgICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk7XHJcblxyXG4gICAgICBpZiAoX3NraXBOZXh0UGF5ZGF5KSB7XHJcbiAgICAgICAgLy9pZiBwcmV2aW91c2x5IHNraXAgcGF5ZGF5IHdhcyBzdG9yZWQgYnkgYW55IGNhcmRcclxuICAgICAgICB0aGlzLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG5cclxuICAgICAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIFBheURheS5cIiwgMTYwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgIH0sIDE2NTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIFBheURheS5cIik7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBfdGl0bGUgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZiAoX2lzRG91YmxlUGF5RGF5KSBfdGl0bGUgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgIGVsc2UgX3RpdGxlID0gXCJQYXlEYXlcIjtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSwgX2lzRG91YmxlUGF5RGF5LCBfc2tpcEhNTmV4dFBheWRheSwgX3NraXBCTU5leHRQYXlkYXksIF9pc0JvdCwgZmFsc2UsIDAsIDAsIDAsIDAsIFBhc3NlZFBheURheUNvdW50ZXIsIERvdWJsZVBheURheUNvdW50ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQmFua3J1cHRfVHVybkRlY2lzaW9uKCkge1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50ICs9IDE7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCk7XHJcbiAgfSxcclxuXHJcbiAgU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50LCBfdUlEKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgQ2FzaDogX2Ftb3VudCwgSUQ6IF91SUQgfSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMywgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2RhdGEpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IF9kYXRhLkRhdGEuQ2FzaDtcclxuICAgICAgdmFyIF9pRCA9IF9kYXRhLkRhdGEuSUQ7XHJcblxyXG4gICAgICB2YXIgX215SW5kZXggPSB0aGlzLkdldE15SW5kZXgoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5QbGF5ZXJVSUQgPT0gX2lEKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLmlzR2FtZUZpbmlzaGVkID09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlRvdGFsU2NvcmUgKz0gX2Ftb3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgcmVjZWl2ZWQgcHJvZml0IG9mICRcIiArIF9hbW91bnQgKyBcIiBmcm9tIHlvdXIgcGFydG5lci5cIiwgMjgwMCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBDYXJkcyBSdWxlc1xyXG4gIFRvZ2dsZURvdWJsZVBheU5leHRUdXJuKF9zdGF0ZSkge1xyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5ID0gX25leHRUdXJuRG91YmxlUGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBOZXh0VHVybihfc3RhdGUpIHtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuID0gX3NraXBOZXh0VHVybjtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwUGF5RGF5X1dob2xlKF9zdGF0ZSkge1xyXG4gICAgX3NraXBOZXh0UGF5ZGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0UGF5ZGF5ID0gX3NraXBOZXh0UGF5ZGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKF9zdGF0ZSkge1xyXG4gICAgX3NraXBITU5leHRQYXlkYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEhNTmV4dFBheWRheSA9IF9za2lwSE1OZXh0UGF5ZGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoX3N0YXRlKSB7XHJcbiAgICBfc2tpcEJNTmV4dFBheWRheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwQk1OZXh0UGF5ZGF5ID0gX3NraXBCTU5leHRQYXlkYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlVHVyblByb2dyZXNzKF9zdGF0ZSkge1xyXG4gICAgVHVybkluUHJvZ3Jlc3MgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgUmV0dXJuVHVyblByb2dyZXNzKCkge1xyXG4gICAgcmV0dXJuIFR1cm5JblByb2dyZXNzO1xyXG4gIH0sXHJcblxyXG4gIExvc2VBbGxNYXJrZXRpbmdNb25leSgpIHtcclxuICAgIHZhciBfbG9zZUFtb3VudCA9IC0xO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPiAwKSB7XHJcbiAgICAgIF9sb3NlQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfbG9zZUFtb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9sb3NlQW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE11bHRpcGx5TWFya2V0aW5nTW9uZXkoX211bHRpcGxpZXIpIHtcclxuICAgIHZhciBfYW1vdW50SW5jcmVhc2VkID0gLTE7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA+IDApIHtcclxuICAgICAgX2Ftb3VudEluY3JlYXNlZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgKj0gX211bHRpcGxpZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfYW1vdW50SW5jcmVhc2VkID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2Ftb3VudEluY3JlYXNlZDtcclxuICB9LFxyXG5cclxuICBHZXRNYXJrZXRpbmdNb25leShfcHJvZml0KSB7XHJcbiAgICB2YXIgX2Ftb3VudCA9IC0xO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPiAwKSB7XHJcbiAgICAgIF9wcm9maXQgPSBfcHJvZml0IC8gMTAwO1xyXG4gICAgICBfYW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCAqPSBfcHJvZml0O1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9hbW91bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIFF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uKF9kYXRhKSB7XHJcbiAgICB2YXIgX3F1ZXN0aW9uUmVmID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9RdWVzdGlvbnNEYXRhKCk7XHJcbiAgICB2YXIgX3VzZXJJRCA9IF9kYXRhLlVzZXJJRDtcclxuICAgIHZhciBfcXVlc3Rpb25JbmRleCA9IF9kYXRhLlF1ZXN0aW9uO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9kYXRhLlVzZXJJbmRleDtcclxuICAgIHZhciBfaXNWb2MgPSBfZGF0YS5Jc1ZvYztcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gICAgaWYgKF91c2VySUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSUQgbWF0Y2hlZFwiKTtcclxuXHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcblxyXG4gICAgICB2YXIgX1FkYXRhO1xyXG4gICAgICBpZiAoX2lzVm9jKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2b2NcIik7XHJcbiAgICAgICAgX1FkYXRhID0gX3F1ZXN0aW9uUmVmLlZvY2FidWxhcnlRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXhdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXN0XCIpO1xyXG4gICAgICAgIF9RZGF0YSA9IF9xdWVzdGlvblJlZi5Fc3RhYmxpc2htZW50UXVlc3Rpb25zW19xdWVzdGlvbkluZGV4XTtcclxuICAgICAgfVxyXG5cclxuICAgICAgQ29ycmVjdEFuc3dlciA9IF9RZGF0YS5Db3JyZWN0T3B0aW9uO1xyXG4gICAgICB2YXIgX21lc3NhZ2UgPSBcIkNob29zZSB0aGUgY29ycmVjdCBhbnN3ZXIuXCIgKyBcIlxcblwiICsgXCIqd3JvbmcgYW5zd2VyIHdpbGwgY29zdCB5b3UgYSBmaW5lIG9mICQ1MDAwLlwiICsgXCJcXG5cIiArIFwiXFxuXCIgKyBfUWRhdGEuUXVlc3Rpb24gKyBcIlxcblwiICsgXCJBLiBcIiArIF9RZGF0YS5PcHRpb24xICsgXCJcXG5cIiArIFwiQi4gXCIgKyBfUWRhdGEuT3B0aW9uMiArIFwiXFxuXCIgKyBcIkMuIFwiICsgX1FkYXRhLk9wdGlvbjMgKyBcIlxcblwiICsgXCJELiBcIiArIF9RZGF0YS5PcHRpb240O1xyXG5cclxuICAgICAgLy8gdmFyIF9xdWVzdGlvbkFza2VkID0gT25lUXVlc3Rpb25zW19xdWVzdGlvbkluZGV4IC0gMV07XHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24oX2lzVHVybk92ZXIgPSBmYWxzZSkge1xyXG4gICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgIHZhciBfbXlEYXRhO1xyXG4gICAgdmFyIF9yb29tRGF0YTtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICBfcm9vbURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgX215RGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgIF9yb29tRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICB9XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCk7XHJcbiAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX215RGF0YSwgX3Jvb21EYXRhLCBfaXNUdXJuT3ZlciwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gIH0sXHJcblxyXG4gIE9uZVF1ZXN0aW9uRGVjaXNpb25fU2VsZWN0T3B0aW9uX09uZVF1ZXN0aW9uKGV2ZW50ID0gbnVsbCkge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3NlbGVjdGlvbiA9IHBhcnNlSW50KGV2ZW50LmN1cnJlbnRUYXJnZXQubmFtZS5zcGxpdChcIl9cIilbMV0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwib3B0aW9uIHNlbGVjdGVkOiBcIiArIF9zZWxlY3Rpb24pO1xyXG4gICAgY29uc29sZS5sb2coXCJDb3JyZWN0QW5zd2VyOiBcIiArIENvcnJlY3RBbnN3ZXIpO1xyXG4gICAgaWYgKF9zZWxlY3Rpb24gPT0gQ29ycmVjdEFuc3dlcikge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91ciBhbnN3ZXIgd2FzIGNvcnJlY3QhLlwiLCAxMjAwKTtcclxuICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKGZhbHNlLCB0cnVlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9teURhdGEuQ2FzaCA+PSA1MDAwKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2ggLT0gNTAwMDtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbnN3ZXJlZCB3cm9uZywgZmluZSBhbW91bnQgd2FzIHBheWVkIHRvIHRoZSBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKHRydWUsIGZhbHNlLCAtMSwgX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCwgU2tpcHBpbmcgcXVlc3Rpb25cIik7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIGZhbHNlLCAwLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgLy9HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBPbmVRdWVzdGlvbkRlY2lzaW9uX1BheUFtb3VudF9PbmVRdWVzdGlvbigpIHtcclxuICAvLyAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgLy8gICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAvLyAgIGlmIChfbXlEYXRhLkNhc2ggPj0gNTAwMCkge1xyXG4gIC8vICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAvLyAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgLy8gICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoIC09IDUwMDA7XHJcbiAgLy8gICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7XHJcbiAgLy8gICAgICAgICBicmVhaztcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgIH1cclxuXHJcbiAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgcGFpZCBjYXNoIGFtb3VudCB0byBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gIC8vICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAvLyAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24odHJ1ZSwgZmFsc2UsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH0sXHJcblxyXG4gIC8vIE9uZVF1ZXN0aW9uRGVjaXNpb25fQW5zd2VyUXVlc3Rpb25fT25lUXVlc3Rpb24oKSB7XHJcbiAgLy8gICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gIC8vICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAvLyAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYW5zd2VyZWQgdGhlIHF1ZXN0aW9uLlwiLCAxMjAwKTtcclxuICAvLyAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIC8vICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIHRydWUsIE9uZVF1ZXN0aW9uSW5kZXgsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICAvLyB9LFxyXG5cclxuICBSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2hhc0RvbmVQYXltZW50LCBfaGFzQW5zd2VyZWRRdWVzdGlvbiwgX3F1ZXN0aW9uSW5kZXgsIF9Vc2VySUQpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgUGF5bWVudERvbmU6IF9oYXNEb25lUGF5bWVudCwgUXVlc3Rpb25BbnN3ZXJlZDogX2hhc0Fuc3dlcmVkUXVlc3Rpb24sIFF1ZXN0aW9uSW5kZXg6IF9xdWVzdGlvbkluZGV4LCBJRDogX1VzZXJJRCB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg4LCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2RhdGEpIHtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICB2YXIgX2hhc0RvbmVQYXltZW50ID0gX2RhdGEuUGF5bWVudERvbmU7XHJcbiAgICAgIHZhciBfaGFzQW5zd2VyZWRRdWVzdGlvbiA9IF9kYXRhLlF1ZXN0aW9uQW5zd2VyZWQ7XHJcbiAgICAgIHZhciBfcXVlc3Rpb25JbmRleCA9IF9kYXRhLlF1ZXN0aW9uSW5kZXg7XHJcbiAgICAgIHZhciBfdUlEID0gX2RhdGEuSUQ7XHJcblxyXG4gICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgaWYgKF9xdWVzdGlvbkluZGV4ID09IDApIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwicGxheWVyIGRvZXMgbm90IGhhdmUgZW5vdWdoIGNhc2gsIHNvIHF1ZXN0aW9ucyB3ZXJlIHNraXBwZWQuXCIsIDIxMDApO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfaGFzRG9uZVBheW1lbnQpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCArPSA1MDAwO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcInBsYXllciBoYXMgZ2l2ZW4gd3JvbmcgYW5zd2VyLCBjYXNoICQ1MDAwIGhhcyBiZWVuIGFkZGVkLlwiLCAyMTAwKTtcclxuICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfaGFzQW5zd2VyZWRRdWVzdGlvbikge1xyXG4gICAgICAgICAgdmFyIF9zZWxlY3RlZFBsYXllckluZGV4ID0gMDtcclxuICAgICAgICAgIHZhciBfYWN0b3JzRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChfdUlEID09IF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgICAgIF9zZWxlY3RlZFBsYXllckluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwicGxheWVyIGhhcyBnaXZlbiBjb3JyZWN0IGFuc3dlciwgbm8gY2FzaCB3YXMgcmVjZWl2ZWQuXCIsIDIxMDApO1xyXG5cclxuICAgICAgICAgIC8vIGlmIChfcXVlc3Rpb25JbmRleCA9PSAxKSB7XHJcbiAgICAgICAgICAvLyAgIC8vaGF2ZSB5b3Ugc2tpcHBlZCBsb2FuIHByZXZpb3VzIHBheWRheT9cclxuICAgICAgICAgIC8vICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlNraXBwZWRMb2FuUGF5bWVudCkge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgc2tpcHBlZCBsb2FuIHBheWVtZW50IGluIHByZXZpb3VzIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSBza2lwcGVkIGxvYW4gcGF5ZW1lbnQgaW4gcHJldmlvdXMgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDIpIHtcclxuICAgICAgICAgIC8vICAgLy9IYXZlIHlvdSB0YWtlbiBhbnkgbG9hbj9cclxuICAgICAgICAgIC8vICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgICAgIC8vICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIC8vICAgICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgIC8vICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgLy8gICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgLy8gICB9XHJcblxyXG4gICAgICAgICAgLy8gICBpZiAoX2xvYW5UYWtlbikge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgdGFrZW4gc29tZSBsb2FuXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHRha2VuIGFueSBsb2FuXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDMpIHtcclxuICAgICAgICAgIC8vICAgLy9BcmUgeW91IGJhbmtydXB0ZWQ/IGlmIG1vcmUgdGhhbiBvbmNlLCB0ZWxsIG1lIHRoZSBhbW91bnQ/XHJcbiAgICAgICAgICAvLyAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Jc0JhbmtydXB0KSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSBiZWVuIGJhbmtydXB0ZWQgXCIgKyBfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5CYW5rcnVwdEFtb3VudCArIFwiIHRpbWUvZXMuXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZFwiLCAyMTAwKTtcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSA0KSB7XHJcbiAgICAgICAgICAvLyAgIC8vSXMgeW91ciB0dXJuIGdvaW5nIHRvIGJlIHNraXBwZWQgbmV4dCB0aW1lP1xyXG4gICAgICAgICAgLy8gICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIGJlIHNraXBwZWQuXCIsIDIxMDApO1xyXG4gICAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBub3QgYmUgc2tpcHBlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gNSkge1xyXG4gICAgICAgICAgLy8gICAvL0lzIGl0IGdvaW5nIHRvIGJlIGRvdWJsZSBwYXkgZGF5IHlvdXIgbmV4dCBwYXlkYXk/XHJcbiAgICAgICAgICAvLyAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIGJlIGRvdWJsZSBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgcGF5ZGF5IHdpbGwgbm90IGJlIGRvdWJsZSBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkoX2RhdGEpIHtcclxuICAgIGlmIChJc1R3ZWVuaW5nID09IHRydWUpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkoX2RhdGEpO1xyXG4gICAgICB9LCA4MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9zcGFjZXMgPSBfZGF0YS5EYXRhLmJhY2tzcGFjZXM7XHJcbiAgICAgIHZhciBfY291bnRlciA9IF9kYXRhLkRhdGEuQ291bnRlcjtcclxuXHJcbiAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtfY291bnRlciArIEJhY2tzcGFjZXNdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zLCAwLjEpO1xyXG5cclxuICAgICAgUm9sbENvdW50ZXIgPSBfY291bnRlcjtcclxuICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1Bvcyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzOiBmdW5jdGlvbiAoTm9kZSwgVG9Qb3MsIHNwZWVkID0gMC42KSB7XHJcbiAgICBjYy50d2VlbihOb2RlKVxyXG4gICAgICAudG8oc3BlZWQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpIH0sIHsgZWFzaW5nOiBcInF1YWRJbk91dFwiIH0pXHJcbiAgICAgIC5jYWxsKCgpID0+IHt9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICBHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5KCkge1xyXG4gICAgUm9sbENvdW50ZXIgLT0gQmFja3NwYWNlcztcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgYmFja3NwYWNlczogQmFja3NwYWNlcywgQ291bnRlcjogUm9sbENvdW50ZXIgfSB9O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEwLCBfZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MpO1xyXG4gICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcbiAgLy8jZW5kcmVnaW9uXHJcbn0pO1xyXG4vL21vZHVsZS5leHBvcnRzICA9IFBsYXllckRhdGE7IC8vd2hlbiBpbXBvcnRzIGluIGFub3RoZXIgc2NyaXB0IG9ubHkgcmVmZXJlbmNlIG9mIHBsYXllcmRhdGEgY2xhc3Mgd291bGQgYmUgYWJsZSB0byBhY2Nlc3NlZCBmcm9tIEdhbWVtYW5hZ2VyIGltcG9ydFxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVNYW5hZ2VyO1xyXG4vLyNlbmRyZWdpb25cclxuIl19