
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
var GameCompleted = false; //#region superclasses and enumerations
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
    var _userID = _data.UserID;
    var _questionIndex = _data.Question;
    var _playerIndex = _data.UserIndex;

    var _gameplayUIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

    if (_userID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData.PlayerUID) {
      console.log("ID matched");

      _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(true);

      OneQuestionIndex = _questionIndex;
      var _questionAsked = OneQuestions[_questionIndex - 1];

      _gameplayUIManager.SetUpDecisionScreen_OneQuestionSetupUI(_questionAsked);
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
  OneQuestionDecision_PayAmount_OneQuestion: function OneQuestionDecision_PayAmount_OneQuestion() {
    var _myData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;

    var _gameplayUIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

    if (_myData.Cash >= 5000) {
      for (var index = 0; index < this.PlayerGameInfo.length; index++) {
        if (_myData.PlayerUID == this.PlayerGameInfo[index].PlayerUID) {
          this.PlayerGameInfo[index].Cash -= 5000;
          GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[index]);
          break;
        }
      }

      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully paid cash amount to player.", 1200);

      _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(false);

      this.RaiseEventDecision_OneQuestion(true, false, -1, _myData.PlayerUID);
    } else {
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You don't have enough cash.");
    }
  },
  OneQuestionDecision_AnswerQuestion_OneQuestion: function OneQuestionDecision_AnswerQuestion_OneQuestion() {
    var _gameplayUIManager = GamePlayReferenceManager.Instance.Get_GameplayUIManager();

    var _myData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("You have successfully answered the question.", 1200);

    _gameplayUIManager.ToggleDecisionScreen_OneQuestionSetupUI(false);

    this.RaiseEventDecision_OneQuestion(false, true, OneQuestionIndex, _myData.PlayerUID);
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

      if (_hasDonePayment) {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleWaitingScreen_OneQuestionSetupUI(false);
        this.PlayerGameInfo[this.TurnNumber].Cash += 5000;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has refused to answer the question instead payed the cash amount, $5000 added to your cash amount", 2100);

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

        if (_questionIndex == 1) {
          //have you skipped loan previous payday?
          if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.SkippedLoanPayment) {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered to have skipped loan payement in previous payday", 2100);
          } else {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered not to have skipped loan payement in previous payday", 2100);
          }
        } else if (_questionIndex == 2) {
          //Have you taken any loan?
          var _loanTaken = false;

          for (var _index11 = 0; _index11 < _actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.NoOfBusiness.length; _index11++) {
            if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.NoOfBusiness[_index11].LoanTaken) {
              _loanTaken = true;
              break;
            }
          }

          if (_loanTaken) {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered to have taken some loan", 2100);
          } else {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered not to have taken any loan", 2100);
          }
        } else if (_questionIndex == 3) {
          //Are you bankrupted? if more than once, tell me the amount?
          if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.IsBankrupt) {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered to have been bankrupted " + _actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.BankruptAmount + " time/es.", 2100);
          } else {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered not to have been bankrupted", 2100);
          }
        } else if (_questionIndex == 4) {
          //Is your turn going to be skipped next time?
          if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.CardFunctionality.SkipNextTurn) {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered, next turn will be skipped.", 2100);
          } else {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered, next turn will not be skipped.", 2100);
          }
        } else if (_questionIndex == 5) {
          //Is it going to be double pay day your next payday?
          if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.CardFunctionality.NextTurnDoublePay) {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered, next payday will be double payday", 2100);
          } else {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered, next payday will not be double payday", 2100);
          }
        }

        setTimeout(function () {
          _gameplayUIManager.ToggleSpaceScreen_OneQuestionSetupUI(false);

          _this13.completeCardTurn();
        }, 2150);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJQcmV2aW91c0RpY2VSb2xsMyIsIlByZXZpb3VzRGljZVJvbGw0IiwiUHJldmlvdXNEaWNlUm9sbDUiLCJ1c2VyR2FtZU92ZXIiLCJCb3RHYW1lT3ZlciIsIlRvdGFsQ291bnRlclJlYWNoZWQiLCJQYXNzZWRQYXlEYXlDb3VudGVyIiwiRG91YmxlUGF5RGF5Q291bnRlciIsIk5vQ2FyZEZ1bmN0aW9uYWxpdHkiLCJQbGF5ZXJMZWZ0IiwiRm9yY2VDaGFuZ2VUaW1lT3V0IiwiR2FtZUNvbXBsZXRlZCIsIkVudW1CdXNpbmVzc1R5cGUiLCJjYyIsIkVudW0iLCJOb25lIiwiSG9tZUJhc2VkIiwiYnJpY2tBbmRtb3J0YXIiLCJCdXNpbmVzc0luZm8iLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiTmFtZSIsIkJ1c2luZXNzVHlwZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIlRleHQiLCJCdXNpbmVzc05hbWUiLCJBbW91bnQiLCJJbnRlZ2VyIiwiSXNQYXJ0bmVyc2hpcCIsInR5cHciLCJCb29sZWFuIiwiUGFydG5lcklEIiwiUGFydG5lck5hbWUiLCJMb2NhdGlvbnNOYW1lIiwiTG9hblRha2VuIiwiTG9hbkFtb3VudCIsImN0b3IiLCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHkiLCJOZXh0VHVybkRvdWJsZVBheSIsIlNraXBOZXh0VHVybiIsIlNraXBOZXh0UGF5ZGF5IiwiU2tpcEhNTmV4dFBheWRheSIsIlNraXBCTU5leHRQYXlkYXkiLCJTdG9ja0luZm8iLCJTaGFyZUFtb3VudCIsIlBsYXllckRhdGEiLCJQbGF5ZXJOYW1lIiwiUGxheWVyVUlEIiwiQXZhdGFySUQiLCJJc0JvdCIsIk5vT2ZCdXNpbmVzcyIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiSG9tZUJhc2VkQW1vdW50IiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIk5vT2ZTdG9ja3MiLCJDYXNoIiwiR29sZENvdW50IiwiU3RvY2tDb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkxhd3llclN0YXR1cyIsIklzQmFua3J1cHQiLCJCYW5rcnVwdEFtb3VudCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBsYXllclJvbGxDb3VudGVyIiwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZCIsImlzR2FtZUZpbmlzaGVkIiwiVG90YWxTY29yZSIsIlRvdGFsSEJDYXNoIiwiVG90YWxCTUNhc2giLCJUb3RhbEdvbGRDYXNoIiwiVG90YWxMb2FuQmFsYW5jZSIsIlRvdGFsU3RvY2tzQ2FzaCIsIkdhbWVPdmVyIiwiSXNBY3RpdmUiLCJSb2xsQ291bnRlciIsIkRpY2VUZW1wIiwiRGljZVJvbGwiLCJJc1R3ZWVuaW5nIiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHVybkNoZWNrQXJyYXkiLCJCdXNpbmVzc0xvY2F0aW9uTm9kZXMiLCJQYXNzZWRQYXlEYXkiLCJEb3VibGVQYXlEYXkiLCJfbmV4dFR1cm5Eb3VibGVQYXkiLCJfc2tpcE5leHRUdXJuIiwiX3NraXBOZXh0UGF5ZGF5IiwiX3NraXBITU5leHRQYXlkYXkiLCJfc2tpcEJNTmV4dFBheWRheSIsIkNhcmRFdmVudFJlY2VpdmVkIiwiVHVybkluUHJvZ3Jlc3MiLCJCYWNrc3BhY2VzIiwiaXNHYW1lT3ZlciIsIk9uZVF1ZXN0aW9uSW5kZXgiLCJPbmVRdWVzdGlvbnMiLCJDYXJkRGlzcGxheVNldFRpbW91dCIsIkdhbWVNYW5hZ2VyIiwiQ29tcG9uZW50IiwiUGxheWVyR2FtZUluZm8iLCJCb3RHYW1lSW5mbyIsIlBsYXllck5vZGUiLCJOb2RlIiwiQ2FtZXJhTm9kZSIsIkFsbFBsYXllclVJIiwiQWxsUGxheWVyTm9kZXMiLCJTdGFydExvY2F0aW9uTm9kZXMiLCJTZWxlY3RlZE1vZGUiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJTZXRQbGF5ZXJMZWZ0IiwiX3N0YXRlIiwiUmVzZXRBbGxWYXJpYWJsZXMiLCJJbnB1dFRlc3REaWNlMSIsIl92YWwiLCJJbnB1dFRlc3REaWNlMiIsIm9uTG9hZCIsIlR1cm5OdW1iZXIiLCJUdXJuQ29tcGxldGVkIiwiQ2hlY2tSZWZlcmVuY2VzIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsIkluaXRfR2FtZU1hbmFnZXIiLCJSYW5kb21DYXJkSW5kZXgiLCJDYXJkQ291bnRlciIsIkNhcmREaXNwbGF5ZWQiLCJyZXF1aXJlIiwiQ2FtZXJhIiwiZ2V0Q29tcG9uZW50IiwiaXNDYW1lcmFab29taW5nIiwiQ2hlY2tTcGVjdGF0ZSIsImdldFBob3RvblJlZiIsIm15Um9vbSIsImdldEN1c3RvbVByb3BlcnR5IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJIiwiQWxsRGF0YSIsIk1heFBsYXllcnMiLCJsZW5ndGgiLCJTeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIiLCJVcGRhdGVHYW1lVUkiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsIkdldFR1cm5OdW1iZXIiLCJHZXRNeUluZGV4IiwibXlJbmRleCIsIl9hY3RvciIsIlBob3RvbkFjdG9yIiwiY3VzdG9tUHJvcGVydGllcyIsIlBsYXllclNlc3Npb25EYXRhIiwiX2FsbEFjdG9ycyIsImluZGV4IiwiU3luY0RhdGFUb1BsYXllckdhbWVJbmZvIiwiQXNzaWduUGxheWVyR2FtZVVJIiwiRW5hYmxlUGxheWVyTm9kZXMiLCJDbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiX3RvUG9zIiwiVmVjMiIsIkdldF9TcGFjZU1hbmFnZXIiLCJEYXRhIiwiUmVmZXJlbmNlTG9jYXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5Iiwic2V0UG9zaXRpb24iLCJfbGFzdEluZGV4IiwiYWN0aXZlIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIlRvdGFsQ29ubmVjdGVkUGxheWVycyIsIm15Um9vbUFjdG9yQ291bnQiLCJ1c2VySUQiLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNoYW5nZVR1cm4iLCJjb25zb2xlIiwibG9nIiwiUmFpc2VFdmVudEZvckNhcmQiLCJfZGF0YSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiUmFpc2VFdmVudCIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJEaXNwbGF5Q2FyZE9uT3RoZXJzIiwiT25MYW5kZWRPblNwYWNlIiwic2V0VGltZW91dCIsIlJlc2V0Q2FyZERpc3BsYXkiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiUmFuZG9tQ2FyZCIsInJhbmRvbUNhcmQiLCJjb3VudGVyIiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIlN5bmNBbGxEYXRhIiwiUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlIiwiX3VpZCIsInB1c2giLCJBcnJheUxlbmd0aCIsIklERm91bmQiLCJqIiwiQ2hhbmdlVHVybkZvcmNlZnVsbHkiLCJVcGRhdGVWaXN1YWxEYXRhIiwiUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5IiwiVHVybkhhbmRsZXIiLCJfdHVybiIsIl9pc01hc3RlciIsIkNoZWNrQ3VycmVudEFjdGl2ZU1hc3RlckNsaWVudCIsIl9wbGF5ZXJNYXRjaGVkIiwiVG9nZ2xlVHVyblByb2dyZXNzIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUmVzZXRUdXJuVmFyaWFibGUiLCJSb2xsRGljZSIsIkRpY2VSb2xsU2NyZWVuIiwiUGxheWVySW5mbyIsIlJvb21BY3RvcnMiLCJTaG93VG9hc3QiLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJfaW5kIiwiTWFpblNlc3Npb25EYXRhIiwiTXlEYXRhIiwiX2NvdW50ZXIiLCJTdGFydFR1cm4iLCJSZWNlaXZlQmFua3J1cHREYXRhIiwiX2lzQmFua3J1cHRlZCIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiX3BsYXllckRhdGEiLCJQbGF5ZXJEYXRhTWFpbiIsIlN0YXJ0VHVybkFmdGVyQmFua3J1cHQiLCJfcmFuZG9tSW5kZXgiLCJnZXRSYW5kb20iLCJTZXROYW1lIiwiU2V0QXZhdGFyIiwiX3RvZ2dsZUhpZ2hsaWdodCIsIl9pbmRleCIsIlRvZ2dsZUJHSGlnaGxpZ2h0ZXIiLCJUb2dnbGVUZXh0aWdobGlnaHRlciIsImNoaWxkcmVuIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJBdmF0YXJTcHJpdGVzIiwiU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcyIsInRhcmdldFBvcyIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsInBhcmVudCIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwicmF0aW8iLCJ3aW5TaXplIiwiaGVpZ2h0Iiwiem9vbVJhdGlvIiwibGF0ZVVwZGF0ZSIsInN5bmNEaWNlUm9sbCIsIl9yb2xsIiwiX2RpY2UxIiwiZGljZTEiLCJfZGljZTIiLCJkaWNlMiIsIl9yZXN1bHQiLCJteVJvb21BY3RvcnNBcnJheSIsImVycm9yIiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwiQW5pbWF0ZURpY2UiLCJEaWNlRnVudGlvbmFsaXR5IiwiX3BvcyIsIlR3ZWVuQ2FtZXJhIiwiVGVtcENoZWNrU3BhY2UiLCJfcm9sbGluZyIsInRlbXBjb3VudGVyIiwidGVtcGNvdW50ZXIyIiwiZGljZXRvYmUiLCJwYXJzZUludCIsIlNwYWNlRGF0YSIsIlNwYWNlc1R5cGUiLCJEaWNlMSIsIkRpY2UyIiwiX25ld1JvbGwiLCJSb2xsT25lRGljZSIsIlJvbGxUd29EaWNlcyIsImNhbGxVcG9uQ2FyZCIsIl9zcGFjZUlEIiwidmFsdWVJbmRleCIsIlN0YXJ0RGljZVJvbGwiLCJTZW5kaW5nRGF0YSIsImlzQm90IiwiY29tcGxldGVDYXJkVHVybiIsIkFsbFBsYXllcnNHYW1lQ29tcGxldGVkIiwiQ2FsbEdhbWVDb21wbGV0ZSIsIl9pc0JvdCIsIl9mb3JjZUdhbWVPdmVyIiwiX3BsYXllckluZGV4IiwiX2Nhc2giLCJITUFtb3VudCIsIkdldF9HYW1lTWFuYWdlciIsIkJNQW1vdW50IiwiQk1Mb2NhdGlvbnMiLCJsb2FuQW1vdW50IiwiX2dvbGQiLCJfc3RvY2tzIiwiX2RpY2VSYW5kb20iLCJPbmNlT3JTaGFyZSIsIkdvbGRDYXNoIiwiU3RvY2tDYXNoIiwiQk1DYXNoIiwiSE1DYXNoIiwiVG90YWxBc3NldHMiLCJSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlIiwiUmFpc2VFdmVudFRvU3luY0dhbWVDb21wbGV0ZURhdGEiLCJTeW5jR2FtZU92ZXIiLCJfVUlEIiwiaW5mb1RleHQiLCJzdGF0dXNUZXh0IiwiRGlzY29ubmVjdERhdGEiLCJTaG93UmVzdWx0U2NyZWVuIiwiX2N1cnJlbnRDYXNoIiwiR2V0X1NlcnZlckJhY2tlbmQiLCJTdHVkZW50RGF0YSIsImdhbWVDYXNoIiwiX3RvdGFsIiwidG9TdHJpbmciLCJfd29uIiwiZ2FtZXNXb24iLCJVcGRhdGVVc2VyRGF0YSIsIlN5bmNHYW1lQ29tcGxldGVEYXRhIiwiQm90IiwiWm9vbUNhbWVyYU91dE9ubHkiLCJtYXgiLCJTZWxlY3RlZEluZCIsIlNlc3Npb25EYXRhIiwiX3ZhbHVlIiwidHJhY2UiLCJwbGF5ZXJjb21wbGV0ZWQiLCJab29tQ2FtZXJhT3V0IiwiVHdlZW5QbGF5ZXIiLCJtaW4iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJpc1pvb20iLCJ0aW1lIiwidHdlZW4iLCJ0byIsInYyIiwiZWFzaW5nIiwiY2FsbCIsIlpvb21DYW1lcmFJbiIsInN0YXJ0IiwiQ2hlY2tQYXlEYXlDb25kaXRpb25zIiwiUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24iLCJUb1BvcyIsIl9uZXdwb3MiLCJUb2dnbGVQYXlEYXkiLCJfc3QxIiwiX1N0MiIsIkluY3JlYXNlRG91YmxlUGF5RGF5IiwiRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiYW1vdW50IiwiX2xvY2F0aW9uTmFtZSIsIl9pc0NhcmRGdW5jdGlvbmFsaXR5IiwiX0dpdmVuQ2FzaCIsIl9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJpIiwibm9kZSIsImluc3RhbnRpYXRlIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiU2V0QnVzaW5lc3NJbmRleCIsIlNldENhcmRGdW5jdGlvbmFsaXR5IiwiU2V0R2l2ZW5DYXNoIiwiU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiUmVzZXRFZGl0Qm94IiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiZGVzdHJveSIsIlVwZGF0ZVN0b2Nrc19UdXJuRGVjaXNpb24iLCJfbmFtZSIsIl9TaGFyZUFtb3VudCIsIl9pc0FkZGluZyIsIl9zdG9jayIsIl9pc0RvdWJsZVBheURheSIsIl9mb3JTZWxlY3RlZEJ1c2luZXNzIiwiX1NlbGVjdGVkQnVzaW5lc3NJbmRleCIsIkhCQW1vdW50IiwiX3RpdGxlIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9hbW91bnQiLCJfdUlEIiwiSUQiLCJSZWNlaXZlUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiX2lEIiwiX215SW5kZXgiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlJldHVyblR1cm5Qcm9ncmVzcyIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9sb3NlQW1vdW50IiwiTXVsdGlwbHlNYXJrZXRpbmdNb25leSIsIl9tdWx0aXBsaWVyIiwiX2Ftb3VudEluY3JlYXNlZCIsIkdldE1hcmtldGluZ01vbmV5IiwiX3Byb2ZpdCIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiX3VzZXJJRCIsIlVzZXJJRCIsIl9xdWVzdGlvbkluZGV4IiwiUXVlc3Rpb24iLCJVc2VySW5kZXgiLCJfZ2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfcXVlc3Rpb25Bc2tlZCIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJfaXNUdXJuT3ZlciIsIl9teURhdGEiLCJfcm9vbURhdGEiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9QYXlBbW91bnRfT25lUXVlc3Rpb24iLCJSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJPbmVRdWVzdGlvbkRlY2lzaW9uX0Fuc3dlclF1ZXN0aW9uX09uZVF1ZXN0aW9uIiwiX2hhc0RvbmVQYXltZW50IiwiX2hhc0Fuc3dlcmVkUXVlc3Rpb24iLCJfVXNlcklEIiwiUGF5bWVudERvbmUiLCJRdWVzdGlvbkFuc3dlcmVkIiwiUXVlc3Rpb25JbmRleCIsIlJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfc2VsZWN0ZWRQbGF5ZXJJbmRleCIsIl9hY3RvcnNEYXRhIiwiX2xvYW5UYWtlbiIsIlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eSIsIl9zcGFjZXMiLCJiYWNrc3BhY2VzIiwiQ291bnRlciIsIlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyIsInNwZWVkIiwiR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHLEtBQWQ7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUVBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBRUEsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUVBLElBQUlDLFlBQVksR0FBRyxLQUFuQjtBQUNBLElBQUlDLFdBQVcsR0FBRyxLQUFsQjtBQUNBLElBQUlDLG1CQUFtQixHQUFHLEtBQTFCO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsQ0FBMUI7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxDQUExQjtBQUNBLElBQUlDLG1CQUFtQixHQUFHLEtBQTFCO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEtBQWpCO0FBQ0EsSUFBSUMsa0JBQWtCLEdBQUcsSUFBekI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsS0FBcEIsRUFDQTtBQUNBOztBQUNBLElBQUlDLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUM3QkMsRUFBQUEsSUFBSSxFQUFFLENBRHVCO0FBRTdCQyxFQUFBQSxTQUFTLEVBQUUsQ0FGa0I7QUFFZjtBQUNkQyxFQUFBQSxjQUFjLEVBQUUsQ0FIYSxDQUdWOztBQUhVLENBQVIsQ0FBdkIsRUFNQTs7QUFDQSxJQUFJQyxZQUFZLEdB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QUEsT0FBTyxFQUFFM1c7QUFBbkM7QUFBUixPQUFaO0FBQ0FJLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NvRSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQThFRixLQUE5RTtBQUNEOztBQUVELFFBQUlwQixNQUFNLEdBQUduSixFQUFFLENBQUNvSixJQUFILENBQVE3RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDaUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRG5GLFdBQTFELEVBQXVFb0YsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0MsQ0FBMUcsRUFBNkdsRix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDaUQsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRG5GLFdBQTFELEVBQXVFb0YsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0UsQ0FBL00sQ0FBYjs7QUFDQSxTQUFLcVIsd0JBQUwsQ0FBOEIsS0FBSy9VLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsQ0FBOUIsRUFBb0V1QyxNQUFwRTtBQUNBLFNBQUsrSCxnQkFBTDtBQUNELEdBdGhFd0IsQ0F3aEV6QjtBQUNBOztBQXpoRXlCLENBQVQsQ0FBbEIsRUEyaEVBOztBQUNBZ0ssTUFBTSxDQUFDQyxPQUFQLEdBQWlCM1YsV0FBakIsRUFDQSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9pc1Rlc3QgPSBmYWxzZTtcclxudmFyIF9kaWNlaW5wdXQxID0gXCJcIjtcclxudmFyIF9kaWNlaW5wdXQyID0gXCJcIjtcclxudmFyIFByZXZpb3VzRGljZVJvbGwxID0gLTE7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsMiA9IC0xO1xyXG5cclxudmFyIFByZXZpb3VzRGljZVJvbGwzID0gLTE7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsNCA9IC0xO1xyXG5cclxudmFyIFByZXZpb3VzRGljZVJvbGw1ID0gLTE7XHJcblxyXG52YXIgdXNlckdhbWVPdmVyID0gZmFsc2U7XHJcbnZhciBCb3RHYW1lT3ZlciA9IGZhbHNlO1xyXG52YXIgVG90YWxDb3VudGVyUmVhY2hlZCA9IGZhbHNlO1xyXG52YXIgUGFzc2VkUGF5RGF5Q291bnRlciA9IDA7XHJcbnZhciBEb3VibGVQYXlEYXlDb3VudGVyID0gMDtcclxudmFyIE5vQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxudmFyIFBsYXllckxlZnQgPSBmYWxzZTtcclxudmFyIEZvcmNlQ2hhbmdlVGltZU91dCA9IG51bGw7XHJcbnZhciBHYW1lQ29tcGxldGVkID0gZmFsc2U7XHJcbi8vI3JlZ2lvbiBzdXBlcmNsYXNzZXMgYW5kIGVudW1lcmF0aW9uc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bUJ1c2luZXNzVHlwZSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgSG9tZUJhc2VkOiAxLCAvL2EgYnVzaW5lc3MgdGhhdCB5b3Ugb3BlcmF0ZSBvdXQgb2YgeW91ciBob21lXHJcbiAgYnJpY2tBbmRtb3J0YXI6IDIsIC8vYSBzdG9yZSBmcm9udCBidXNpbmVzc1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzc0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzSW5mbyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1c2luZXNzSW5mb1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWU6IFwiQnVzaW5lc3NEYXRhXCIsXHJcbiAgICBCdXNpbmVzc1R5cGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTW9kZVwiLFxyXG4gICAgICB0eXBlOiBFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgICBkZWZhdWx0OiBFbnVtQnVzaW5lc3NUeXBlLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJCdXNpbmVzcyBjYXRvZ29yeSBmb3IgcGxheWVyc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzVHlwZURlc2NyaXB0aW9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR5cGVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlR5cGUgKGJ5IG5hbWUpIG9mIGJ1c2luZXNzIHBsYXllciBpcyBvcGVuaW5nXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5hbWUgb2YgdGhlIGJ1c2luZXNzIHBsYXllciBpcyBvcGVuaW5nXCIsXHJcbiAgICB9LFxyXG4gICAgQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFtb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiYmFsYW5jZSBvZiBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIElzUGFydG5lcnNoaXA6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSXNQYXJ0bmVyc2hpcFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwdzogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgZG9uZSBwYXJ0bmVyc2hpcCB3aXRoIHNvbWVvbmUgd2l0aCBjdXJyZW50IGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lcklEOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBhcnRuZXJJRFwiLFxyXG4gICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiSUQgb2YgdGhlIHBhcnRuZXIgd2l0aCB3aG9tIHBsYXllciBoYXMgZm9ybWVkIHBhcnRuZXJzaGlwXCIsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5hbWUgb2YgdGhlIHBhcnRuZXIgd2l0aCB3aG9tIHBsYXllciBoYXMgZm9ybWVkIHBhcnRuZXJzaGlwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9jYXRpb25zTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2NhdGlvbnNOYW1lXCIsXHJcbiAgICAgIHR5cGU6IFtjYy5UZXh0XSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJpZiBwbGF5ZXIgb3ducyBicmljayBhbmQgbW9ydGFyIGhlL3NoZSBjYW4gZXhwYW5kIHRvIG5ldyBsb2NhdGlvblwiLFxyXG4gICAgfSxcclxuICAgIExvYW5UYWtlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBDYXJkRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZERhdGFGdW5jdGlvbmFsaXR5ID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5XCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTmV4dFR1cm5Eb3VibGVQYXk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTmV4dFR1cm5Eb3VibGVQYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIGl0cyBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTmV4dFR1cm46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcE5leHRUdXJuXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiB0dXJuIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCB0dXJuIGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFNraXBOZXh0UGF5ZGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBOZXh0UGF5ZGF5XCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBpZiBwYXlkYXkgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwSE1OZXh0UGF5ZGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBITU5leHRQYXlkYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgaG9tZSBiYXNlZCBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBTa2lwQk1OZXh0UGF5ZGF5OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBCTU5leHRQYXlkYXlcIixcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgYnJpY2thIGFuZCBtbW9ydGFyIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwiLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdG9ja0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0b2NrSW5mbyA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlN0b2NrSW5mb1wiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE5hbWU6IFwiU3RvY2tEYXRhXCIsXHJcbiAgICBCdXNpbmVzc05hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJuYW1lIG9mIHRoZSBidXNpbmVzcyBpbiB3aGljaCBzdG9ja3Mgd2lsbCBiZSBoZWxkXCIsXHJcbiAgICB9LFxyXG4gICAgU2hhcmVBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2hhcmVBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlNoYXJlIGFtb3VudCBvZiB0aGUgc3RvY2tcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yICBQbGF5ZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlBsYXllckRhdGFcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm5hbWUgb2YgdGhlIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllclVJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJVSURcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIklEIG9mIHRoZSBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBBdmF0YXJJRDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJBdmF0YXJJRFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaWQgcmVmZXJlbmNlIGZvciBwbGF5ZXIgYXZhdGFyIHNlbGVjdGlvblwiLFxyXG4gICAgfSxcclxuICAgIElzQm90OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQm90XCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXB3OiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgY3VycmVudCBwbGF5ZXIgaXMgYm90XCIsXHJcbiAgICB9LFxyXG4gICAgTm9PZkJ1c2luZXNzOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzXCIsXHJcbiAgICAgIHR5cGU6IFtCdXNpbmVzc0luZm9dLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk51bWJlciBvZiBidXNpbmVzcyBhIHBsYXllciBjYW4gb3duXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FyZEZ1bmN0aW9uYWxpdHk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FyZEZ1bmN0aW9uYWxpdHlcIixcclxuICAgICAgdHlwZTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY2FyZCBmdW5jdGlvbmFsaXR5IHN0b3JlZCBieSBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWRBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkQW1vdW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJudW1iZXIgb2YgaG9tZSBiYXNlZCBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgQnJpY2tBbmRNb3J0YXJBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tBbmRNb3J0YXJBbW91bnRcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIm51bWJlciBvZiBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbExvY2F0aW9uc0Ftb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbExvY2F0aW9uc0Ftb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibnVtYmVyIG9mIGxvY2F0aW9ucyBvZiBhbGwgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc2Vzc1wiLFxyXG4gICAgfSxcclxuICAgIE5vT2ZTdG9ja3M6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tzXCIsXHJcbiAgICAgIHR5cGU6IFtTdG9ja0luZm9dLFxyXG4gICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk51bWJlciBvZiBzdG9jayBhIHBsYXllciBvd25zXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgY2FzaCBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIEdvbGRDb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHb2xkQ291bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImNvdW50IG9mIGdvbGQgYSBwbGF5ZXIgb3duc1wiLFxyXG4gICAgfSxcclxuICAgIFN0b2NrQ291bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tDb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiY291bnQgb2Ygc3RvY2tzIGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBMb2FuVGFrZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblRha2VuXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyB0YWtlbiBsb2FuIGZyb20gYmFuayBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBsb2FuIHRha2VuIGZyb20gdGhlIGJhbmtcIixcclxuICAgIH0sXHJcbiAgICBNYXJrZXRpbmdBbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nQW1vdW50XCIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJtYXJrZXRpbmcgYW1vdW50IGEgcGxheWVyIG93bnNcIixcclxuICAgIH0sXHJcbiAgICBMYXd5ZXJTdGF0dXM6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTGF3eWVyU3RhdHVzXCIsXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBoaXJlZCBhIGxhd3llciBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBJc0JhbmtydXB0OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQmFua3J1cHRcIixcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGJlZW4gQmFua3J1cHRlZCBvciBub3RcIixcclxuICAgIH0sXHJcbiAgICBCYW5rcnVwdEFtb3VudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCYW5rcnVwdEFtb3VudFwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBob3cgbXVjaCB0aW1lIHBsYXllciBoYXMgYmVlbiBiYW5rcnVwdGVkXCIsXHJcbiAgICB9LFxyXG4gICAgU2tpcHBlZExvYW5QYXltZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBwZWRMb2FuUGF5bWVudFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgc2tpcHBlZCBsb2FuIHBheW1lbnRcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJSb2xsQ291bnRlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJSb2xsQ291bnRlclwiLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciB0byBzdG9yZSByb2xsIGNvdW50b3IgZm9yIHBsYXllclwiLFxyXG4gICAgfSxcclxuICAgIEluaXRpYWxDb3VudGVyQXNzaWduZWQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZFwiLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGlzR2FtZUZpbmlzaGVkOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcImlzR2FtZUZpbmlzaGVkXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxTY29yZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbFNjb3JlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEhCQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEhCQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxCTUNhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCTUNhc2hcIixcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsR29sZENhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxHb2xkQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxMb2FuQmFsYW5jZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbExvYW5CYWxhbmNlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbFN0b2Nrc0Nhc2g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxTdG9ja3NDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBHYW1lT3Zlcjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHYW1lT3ZlclwiLFxyXG4gICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIElzQWN0aXZlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIklzQWN0aXZlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIEdhbWUgTWFuYWdlciBDbGFzc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0obWFpbiBjbGFzcykgY2xhc3MgZm9yIEdhbWUgTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUm9sbENvdW50ZXIgPSAwO1xyXG52YXIgRGljZVRlbXAgPSAwO1xyXG52YXIgRGljZVJvbGwgPSAwO1xyXG52YXIgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gbnVsbDtcclxudmFyIFR1cm5DaGVja0FycmF5ID0gW107XHJcbnZhciBCdXNpbmVzc0xvY2F0aW9uTm9kZXMgPSBbXTtcclxuXHJcbnZhciBQYXNzZWRQYXlEYXkgPSBmYWxzZTtcclxudmFyIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG5cclxuLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbnZhciBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxudmFyIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxudmFyIF9za2lwTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG52YXIgX3NraXBITU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbnZhciBUdXJuSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxudmFyIEJhY2tzcGFjZXMgPSAzO1xyXG52YXIgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG52YXIgT25lUXVlc3Rpb25JbmRleCA9IC0xO1xyXG52YXIgT25lUXVlc3Rpb25zID0gW1wieW91IGhhdmUgc2tpcHBlZCBsb2FuIHByZXZpb3VzIHBheWRheT9cIiwgXCJ5b3UgaGF2ZSB0YWtlbiBhbnkgbG9hbj9cIiwgXCJ5b3UgaGF2ZSBiYW5rcnVwdGVkIGV2ZXI/XCIsIFwieW91ciBuZXh0IHR1cm4gaXMgZ29pbmcgdG8gYmUgc2tpcHBlZD9cIiwgXCJ5b3VyIG5leHQgcGF5ZGF5IGlzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXlkYXk/XCJdO1xyXG5cclxudmFyIENhcmREaXNwbGF5U2V0VGltb3V0ID0gbnVsbDtcclxuXHJcbnZhciBHYW1lTWFuYWdlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkdhbWVNYW5hZ2VyXCIsXHJcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgcGxheWVyJ3MgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIEJvdEdhbWVJbmZvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJhbGwgYm90J3MgZGF0YVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwbGF5ZXJcIixcclxuICAgIH0sXHJcbiAgICBDYW1lcmFOb2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgY2FtZXJhXCIsXHJcbiAgICB9LFxyXG4gICAgQWxsUGxheWVyVUk6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIHVpIG9mIGFsbCBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gICAgQWxsUGxheWVyTm9kZXM6IHtcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIG9mIG5vZGUgb2YgYWxsIHBsYXllcnMgaW5zaWRlIGdhbWVwbGF5XCIsXHJcbiAgICB9LFxyXG4gICAgU3RhcnRMb2NhdGlvbk5vZGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBvZiBhdHRheSBvZiBsb2NhdGlvbnNcIixcclxuICAgIH0sXHJcbiAgICBTZWxlY3RlZE1vZGU6IHtcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImludGVnZXIgcmVmZXJlbmNlIGZvciBnYW1lIG1vZGUgMSBtZWFucyBib3QgYW5kIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIFBsYXllckRhdGE6IFBsYXllckRhdGEsXHJcbiAgICBCdXNpbmVzc0luZm86IEJ1c2luZXNzSW5mbyxcclxuICAgIENhcmREYXRhRnVuY3Rpb25hbGl0eTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgRW51bUJ1c2luZXNzVHlwZTogRW51bUJ1c2luZXNzVHlwZSxcclxuICAgIEluc3RhbmNlOiBudWxsLFxyXG4gIH0sXHJcblxyXG4gIFNldFBsYXllckxlZnQoX3N0YXRlKSB7XHJcbiAgICBQbGF5ZXJMZWZ0ID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0QWxsVmFyaWFibGVzKCkge1xyXG4gICAgX2RpY2VpbnB1dDEgPSBcIlwiO1xyXG4gICAgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDEgPSAtMTtcclxuICAgIFByZXZpb3VzRGljZVJvbGwyID0gLTE7XHJcbiAgICBQbGF5ZXJMZWZ0ID0gZmFsc2U7XHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMyA9IC0xO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDQgPSAtMTtcclxuXHJcbiAgICBQcmV2aW91c0RpY2VSb2xsNSA9IC0xO1xyXG4gICAgR2FtZUNvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgdXNlckdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICBCb3RHYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxuICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIERpY2VSb2xsID0gMDtcclxuICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcbiAgICBGb3JjZUNoYW5nZVRpbWVPdXQgPSBudWxsO1xyXG4gICAgUGFzc2VkUGF5RGF5ID0gZmFsc2U7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBmYWxzZTtcclxuICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG4gICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcblxyXG4gICAgLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbiAgICBfbmV4dFR1cm5Eb3VibGVQYXkgPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFBheWRheSA9IGZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG4gICAgX3NraXBITU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG4gICAgX3NraXBCTU5leHRQYXlkYXkgPSBmYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxuICAgIENhcmRFdmVudFJlY2VpdmVkID0gZmFsc2U7XHJcbiAgICBUdXJuSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxuICAgIEJhY2tzcGFjZXMgPSAzO1xyXG4gICAgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgT25lUXVlc3Rpb25JbmRleCA9IC0xO1xyXG4gICAgT25lUXVlc3Rpb25zID0gW1wieW91IGhhdmUgc2tpcHBlZCBsb2FuIHByZXZpb3VzIHBheWRheT9cIiwgXCJ5b3UgaGF2ZSB0YWtlbiBhbnkgbG9hbj9cIiwgXCJ5b3UgaGF2ZSBiYW5rcnVwdGVkIGV2ZXI/XCIsIFwieW91ciBuZXh0IHR1cm4gaXMgZ29pbmcgdG8gYmUgc2tpcHBlZD9cIiwgXCJ5b3VyIG5leHQgcGF5ZGF5IGlzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXlkYXk/XCJdO1xyXG5cclxuICAgIENhcmREaXNwbGF5U2V0VGltb3V0ID0gbnVsbDtcclxuICAgIFRvdGFsQ291bnRlclJlYWNoZWQgPSBmYWxzZTtcclxuICAgIE5vQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBJbnB1dFRlc3REaWNlMShfdmFsKSB7XHJcbiAgICBpZiAoX2lzVGVzdCkge1xyXG4gICAgICBfZGljZWlucHV0MSA9IF92YWw7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5wdXRUZXN0RGljZTIoX3ZhbCkge1xyXG4gICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgX2RpY2VpbnB1dDIgPSBfdmFsO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBBbGwgRnVuY3Rpb25zIG9mIEdhbWVNYW5hZ2VyXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgY2xhc3MgaXMgY3JlYXRlZFxyXG4gICAqKi9cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLlJlc2V0QWxsVmFyaWFibGVzKCk7XHJcbiAgICBHYW1lTWFuYWdlci5JbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB0aGlzLlR1cm5OdW1iZXIgPSAwO1xyXG4gICAgdGhpcy5UdXJuQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuU2VsZWN0ZWRNb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgIHRoaXMuSW5pdF9HYW1lTWFuYWdlcigpO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4ID0gMDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgICBDYXJkRXZlbnRSZWNlaXZlZCA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiByZWZlcmVuY2Ugb2YgcmVxdWlyZWQgY2xhc3Nlc1xyXG4gICAqKi9cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbCkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGluaXRpYWwgZ2FtZW1hbmFnZXIgZXNzZXRpYWxzXHJcbiAgICoqL1xyXG4gIEluaXRfR2FtZU1hbmFnZXIoKSB7XHJcbiAgICB0aGlzLkNhbWVyYSA9IHRoaXMuQ2FtZXJhTm9kZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKTtcclxuICAgIHRoaXMuaXNDYW1lcmFab29taW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gW107XHJcbiAgICBSb2xsQ291bnRlciA9IDA7XHJcbiAgICBEaWNlVGVtcCA9IDA7XHJcbiAgICBEaWNlUm9sbCA9IDA7XHJcblxyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9nYW1lIGlzIGJlaW5nIHBsYXllZCBieSByZWFsIHBsYXllcnNcclxuICAgICAgLy9pZiBqb2luZWQgcGxheWVyIGlzIHNwZWN0YXRlXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInN0YXR1cyBvZiBpbml0aWFsIGJ1c2luZXNzIHNldHA6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIikpO1xyXG5cclxuICAgICAgICAvL2lmIGluaXRhbCBzZXR1cCBoYXMgYmVlbiBkb25lIGFuZCBnYW1lIGlzIHVuZGVyIHdheVxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpID09IHRydWUpIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICB2YXIgQWxsRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm8gPSBBbGxEYXRhO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzID0gdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgdGhpcy5UdXJuTnVtYmVyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIik7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLCB0aGlzLlR1cm5OdW1iZXIpO1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgIC8vdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IDg7XHJcbiAgICAgICAgICAvL3RoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLCBmYWxzZSwgdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9nYW1lIGlzIGJlaW5nIHBsYXllZCBieSBib3QgYWxvbmcgd2l0aCBvbmUgcGxheWVyXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSwgZmFsc2UsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyNyZWdpb24gcHVibGljIGZ1bmN0aW9ucyB0byBnZXQgZGF0YSAoYWNjZXNzaWJsZSBmcm9tIG90aGVyIGNsYXNzZXMpXHJcbiAgR2V0VHVybk51bWJlcigpIHtcclxuICAgIHJldHVybiB0aGlzLlR1cm5OdW1iZXI7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBnZXQgbXkgaW5kZXggaW4gYXJyYXkgb2YgUGxheWVyR2FtZUluZm8gXHJcbiAgICoqL1xyXG4gIEdldE15SW5kZXgoKSB7XHJcbiAgICB2YXIgbXlJbmRleCA9IDA7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB2YXIgX2FsbEFjdG9ycyA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hbGxBY3RvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmIChfYWN0b3IuUGxheWVyVUlEID09IF9hbGxBY3RvcnNbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgIG15SW5kZXggPSBpbmRleDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBteUluZGV4O1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZU1vZGUgQ29kZVxyXG5cclxuICBTeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKSB7XHJcbiAgICB2YXIgQWxsRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiKTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm8gPSBBbGxEYXRhO1xyXG4gICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXIgPiAwICYmIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPT0gdHJ1ZSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsIF90b1Bvcy55KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgdmFyIF9sYXN0SW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoIC0gMTtcclxuICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2xhc3RJbmRleF0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19sYXN0SW5kZXhdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKF90b1Bvcy54LCBfdG9Qb3MueSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKFwic3luY2VkIHBsYXllcm5vZGVzXCIpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKCkge1xyXG4gICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgaWYgKFR1cm5DaGVja0FycmF5Lmxlbmd0aCA9PSBUb3RhbENvbm5lY3RlZFBsYXllcnMpIHtcclxuICAgICAgVHVybkNoZWNrQXJyYXkgPSBbXTtcclxuICAgICAgdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gZnVuY3Rpb25zIHJlbGF0ZWQgdG8gVHVybiBNZWNoYW5pc20gYW5kIGNhcmQgbWVjaGFuaXNtXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSB3aGF0IGNhcmQgaGFzIGJlZW4gc2VsZWN0ZWQgYnkgcGxheWVyXHJcbiAgICoqL1xyXG4gIFJhaXNlRXZlbnRGb3JDYXJkKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDUsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBDbGVhckRpc3BsYXlUaW1lb3V0KCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICB9LFxyXG5cclxuICBEaXNwbGF5Q2FyZE9uT3RoZXJzKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FyZCBldmVudCByZWNlaXZlZDogXCIgKyBDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgICAgIGlmIChDYXJkRXZlbnRSZWNlaXZlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IodGhpcy5DYXJkQ291bnRlcik7XHJcbiAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMuQ2FyZERpc3BsYXllZCkge1xyXG4gICAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkID0gdHJ1ZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLkNhcmRDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuT25MYW5kZWRPblNwYWNlKGZhbHNlLCB0aGlzLlJhbmRvbUNhcmRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIENhcmREaXNwbGF5U2V0VGltb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAvL2NoZWNrIGFmdGVyIGV2ZXJ5IDAuNSBzZWNvbmRzXHJcbiAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0Q2FyZERpc3BsYXkoKSB7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRGb3JDYXJkKF9kYXRhKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgY29uc29sZS5sb2coXCJDYXJkIERhdGEgUmVjZWl2ZWQ6XCIpO1xyXG4gICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG5cclxuICAgIHZhciBSYW5kb21DYXJkID0gX2RhdGEucmFuZG9tQ2FyZDtcclxuICAgIHZhciBjb3VudGVyID0gX2RhdGEuY291bnRlcjtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleCA9IFJhbmRvbUNhcmQ7XHJcbiAgICB0aGlzLkNhcmRDb3VudGVyID0gY291bnRlcjtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLk9uTGFuZGVkT25TcGFjZSh0cnVlLCBSYW5kb21DYXJkKTtcclxuICAgICAgZWxzZSBDYXJkRXZlbnRSZWNlaXZlZCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSBmYWxzZSkgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UodHJ1ZSwgUmFuZG9tQ2FyZCk7XHJcbiAgICAgIGVsc2UgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsIFJhbmRvbUNhcmQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUuZXJyb3IoQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSBwYXJ0aWN1bGFyIHBsYXllciBoYXMgY29tcGxldGUgdGhlaXIgbW92ZVxyXG4gICAqKi9cclxuICBSYWlzZUV2ZW50VHVybkNvbXBsZXRlKCkge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwicmFpc2VkIGZvciB0dXJuIGNvbXBsZXRlXCIpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN5bmNBbGxEYXRhKCkge1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBvbiBhbGwgcGxheWVycyB0byB2YWxpZGF0ZSBpZiBtb3ZlIGlzIGNvbXBsZXRlZCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHNcclxuICAgKiovXHJcbiAgUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlKF91aWQpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKFR1cm5DaGVja0FycmF5Lmxlbmd0aCA9PSAwKSBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpO1xyXG5cclxuICAgICAgICB2YXIgQXJyYXlMZW5ndGggPSBUdXJuQ2hlY2tBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIElERm91bmQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQXJyYXlMZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChUdXJuQ2hlY2tBcnJheVtpbmRleF0gPT0gX3VpZCkgSURGb3VuZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIUlERm91bmQpIHtcclxuICAgICAgICAgIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tqXS5Jc0FjdGl2ZSkgVG90YWxDb25uZWN0ZWRQbGF5ZXJzKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFRvdGFsQ29ubmVjdGVkUGxheWVycyk7XHJcblxyXG4gICAgICAgIGlmIChUdXJuQ2hlY2tBcnJheS5sZW5ndGggPj0gVG90YWxDb25uZWN0ZWRQbGF5ZXJzKSB7XHJcbiAgICAgICAgICBUdXJuQ2hlY2tBcnJheSA9IFtdO1xyXG4gICAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgLy90aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgdGhpcy5UdXJuQ29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gZGljZSBhbmltYXRpb24gaXMgcGxheWVkIG9uIGFsbCBwbGF5ZXJzXHJcbiAgICoqL1xyXG4gIENoYW5nZVR1cm4oKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICB0aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuVHVybk51bWJlciA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoIC0gMSkgdGhpcy5UdXJuTnVtYmVyID0gdGhpcy5UdXJuTnVtYmVyICsgMTtcclxuICAgIGVsc2UgdGhpcy5UdXJuTnVtYmVyID0gMDtcclxuXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsIHRoaXMuVHVybk51bWJlcik7XHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlVHVybkZvcmNlZnVsbHkoKSB7XHJcbiAgICBpZiAoSXNUd2VlbmluZykge1xyXG4gICAgICBjbGVhclRpbWVvdXQoRm9yY2VDaGFuZ2VUaW1lT3V0KTtcclxuICAgICAgRm9yY2VDaGFuZ2VUaW1lT3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VUdXJuRm9yY2VmdWxseSgpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChGb3JjZUNoYW5nZVRpbWVPdXQpO1xyXG4gICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBVcGRhdGVWaXN1YWxEYXRhKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIGZyb20gcmFpc2Ugb24gZXZlbnQgKGZyb20gZnVuY3Rpb24gXCJTdGFydFR1cm5cIiBhbmQgXCJDaGFuZ2VUdXJuXCIgb2YgdGhpcyBzYW1lIGNsYXNzKSB0byBoYW5kbGUgdHVyblxyXG4gICAqKi9cclxuICBUdXJuSGFuZGxlcihfdHVybikge1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgdmFyIF9pc01hc3RlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tDdXJyZW50QWN0aXZlTWFzdGVyQ2xpZW50KCk7XHJcbiAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1tfdHVybl0uSXNBY3RpdmUpIHtcclxuICAgICAgICBpZiAoX2lzTWFzdGVyKSB7XHJcbiAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vdGhpcy5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICB0aGlzLlVwZGF0ZVZpc3VhbERhdGEoKTtcclxuICAgIGNvbnNvbGUubG9nKFwiVHVybjogXCIgKyBfdHVybik7XHJcbiAgICB2YXIgX3BsYXllck1hdGNoZWQgPSBmYWxzZTtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBmYWxzZTtcclxuICAgIGlmIChJc1R3ZWVuaW5nKSB7XHJcbiAgICAgIC8vY2hlY2sgaWYgYW5pbWF0aW9uIG9mIHR1cm4gYmVpbmcgcGxheWVkIG9uIG90aGVyIHBsYXllcnNcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5UdXJuSGFuZGxlcihfdHVybik7XHJcbiAgICAgIH0sIDgwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlR1cm5OdW1iZXIgPSBfdHVybjtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgX3NraXBOZXh0VHVybiA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codXNlckdhbWVPdmVyKTtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgIGlmICghdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IC8vdHVybiBkZWNpc2lvbnMgZm9yIGJvdFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgX3NraXBOZXh0VHVybiA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICBpZiAoIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJvbGxEaWNlKCk7XHJcbiAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLCB0aGlzLlR1cm5OdW1iZXIsIHRydWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVHVybiBPZjogXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGxQbGF5ZXJVSVt0aGlzLlR1cm5OdW1iZXJdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCkpO1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy9za2lwIHRoaXMgdHVybiBhcyBza2lwIHR1cm4gaGFzIGJlZW4gY2FsbGVkIGJlZm9yZVxyXG4gICAgICBpZiAoX3BsYXllck1hdGNoZWQgJiYgX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsIDEyMDApO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2tpcE5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9pbmQpIHtcclxuICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgIHZhciBNeURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICB2YXIgX2NvdW50ZXIgPSBfaW5kO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEKTtcclxuICAgIC8vICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIC8vICAgd2hpbGUgKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLklzQWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgIC8vICAgICBfY291bnRlcisrO1xyXG4gICAgICAvLyAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQgPT0gTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdID0gTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG5cclxuICAgICAgICBpZiAoX2NvdW50ZXIgPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYWRkaW5nIGNvdW50ZXI6IFwiK19jb3VudGVyKTtcclxuICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzeW5jZWQgRGF0YTpcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGFsbCBwbGF5ZXJzIGhhdmUgZG9uZSB0aGVpciBpbml0aWFsIHNldHVwIGFuZCBmaXJzdCB0dXJuIHN0YXJ0c1xyXG4gICAgQG1ldGhvZCBTdGFydFR1cm5cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIFN0YXJ0VHVybigpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgIHRoaXMuVHVybk51bWJlciA9IDA7IC8vcmVzZXRpbmcgdGhlIHR1cm4gbnVtYmVyIG9uIHN0YXJ0IG9mIHRoZSBnYW1lXHJcblxyXG4gICAgLy9zZW5kaW5nIGluaXRpYWwgdHVybiBudW1iZXIgb3ZlciB0aGUgbmV0d29yayB0byBzdGFydCB0dXJuIHNpbXVsdGFub3VzbHkgb24gYWxsIGNvbm5lY3RlZCBwbGF5ZXIncyBkZXZpY2VzXHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsIHRoaXMuVHVybk51bWJlcik7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUJhbmtydXB0RGF0YShfZGF0YSkge1xyXG4gICAgLy9vdGhlciBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFxyXG4gICAgdmFyIF9pc0JhbmtydXB0ZWQgPSBfZGF0YS5EYXRhLmJhbmtydXB0ZWQ7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLnR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGFNYWluO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKF9pc0JhbmtydXB0ZWQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coX3R1cm4pO1xyXG4gICAgLy8gY29uc29sZS5sb2coX3BsYXllckRhdGEpO1xyXG5cclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3R1cm5dID0gX3BsYXllckRhdGE7XHJcblxyXG4gICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkodHJ1ZSk7XHJcbiAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKHRydWUpO1xyXG5cclxuICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpIHtcclxuICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIH0sIDEwMDApO1xyXG5cclxuICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsIHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIiwgdGhpcy5UdXJuTnVtYmVyLCB0cnVlKTtcclxuICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEZ1bmN0aW9uIGZvciBnYW1lcGxheVxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiBwbGF5ZXIgVUkgKG5hbWUvaWNvbnMvbnVtYmVyIG9mIHBsYXllcnMgdGhhdCB0byBiZSBhY3RpdmUgZXRjKVxyXG4gICAgQG1ldGhvZCBBc3NpZ25QbGF5ZXJHYW1lVUlcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEFzc2lnblBsYXllckdhbWVVSShfaXNCYW5rcnVwdGVkID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBpZiAoIV9pc0JhbmtydXB0ZWQpIHtcclxuICAgICAgICB2YXIgX3JhbmRvbUluZGV4ID0gdGhpcy5nZXRSYW5kb20oMCwgdGhpcy5Cb3RHYW1lSW5mby5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm8ucHVzaCh0aGlzLkJvdEdhbWVJbmZvW19yYW5kb21JbmRleF0pO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycyA9IDI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8gPSB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuU2V0QXZhdGFyKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkF2YXRhcklEKTtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlR2FtZVVJKF90b2dnbGVIaWdobGlnaHQsIF9pbmRleCkge1xyXG4gICAgaWYgKF90b2dnbGVIaWdobGlnaHQpIHtcclxuICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtfaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlBsYXllckluZm8gPSB0aGlzLlBsYXllckdhbWVJbmZvW19pbmRleF07XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9pbmRleCA9PSBpbmRleCkge1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlQkdIaWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuVG9nZ2xlQkdIaWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5Ub2dnbGVUZXh0aWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gZW5iYWxlIHJlc3BlY3RpdmUgcGxheWVycyBub2RlcyBpbnNpZGUgZ2FtYXBsYXlcclxuICAgIEBtZXRob2QgRW5hYmxlUGxheWVyTm9kZXNcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqL1xyXG4gIEVuYWJsZVBsYXllck5vZGVzKF9pc0JhbmtydXB0ZWQgPSBmYWxzZSkge1xyXG4gICAgaWYgKCFfaXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQgPT0gMSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQgPT0gMSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCwgdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSG9tZUJhc2VkQW1vdW50ID09IDEpIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJyaWNrQW5kTW9ydGFyQW1vdW50ID09IDEpIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi54LCB0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkF2YXRhclNwcml0ZXNbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQXZhdGFySURdO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKSB7XHJcbiAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsIDEyMCkpO1xyXG4gICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uID0gdGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG5cclxuICAgIGxldCByYXRpbyA9IHRhcmdldFBvcy55IC8gY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAyO1xyXG4gIH0sXHJcblxyXG4gIGxhdGVVcGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5pc0NhbWVyYVpvb21pbmcpIHRoaXMuU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpO1xyXG4gIH0sXHJcblxyXG4gIHN5bmNEaWNlUm9sbChfcm9sbCkge1xyXG4gICAgdmFyIF9kaWNlMSA9IF9yb2xsLmRpY2UxO1xyXG4gICAgdmFyIF9kaWNlMiA9IF9yb2xsLmRpY2UyO1xyXG4gICAgdmFyIF9yZXN1bHQgPSBfZGljZTEgKyBfZGljZTI7XHJcblxyXG4gICAgSXNUd2VlbmluZyA9IHRydWU7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEID09IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9PSAwICYmICF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkge1xyXG4gICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGUgPT0gMikge1xyXG4gICAgICAgIFJvbGxDb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgIFJvbGxDb3VudGVyID0gMTM7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPT0gMTIpIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciArIDIxO1xyXG4gICAgICBlbHNlIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlciArIDE7XHJcblxyXG4gICAgICBSb2xsQ291bnRlciA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlciAtIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIERpY2VSb2xsID0gX3Jlc3VsdDtcclxuICAgIERpY2VUZW1wID0gMDtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5QcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24oRGljZVJvbGwpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAodGhpcy5UdXJuTnVtYmVyID09IGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5nZXRDb21wb25lbnQoXCJEaWNlQ29udHJvbGxlclwiKS5BbmltYXRlRGljZShfZGljZTEsIF9kaWNlMik7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgLy8gdmFyIF9wb3M9dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgLy8gdGhpcy5Ud2VlbkNhbWVyYShfcG9zLHRydWUsMC40KTtcclxuICB9LFxyXG5cclxuICBEaWNlRnVudGlvbmFsaXR5KCkge1xyXG4gICAgbGV0IHRhcmdldFBvcyA9IHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLCAxMjApKTtcclxuICAgIHZhciBfcG9zID0gdGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgdGhpcy5Ud2VlbkNhbWVyYShfcG9zLCB0cnVlLCAwLjQpO1xyXG4gIH0sXHJcblxyXG4gIFRlbXBDaGVja1NwYWNlKF9yb2xsaW5nKSB7XHJcbiAgICB2YXIgdGVtcGNvdW50ZXIgPSAwO1xyXG4gICAgdmFyIHRlbXBjb3VudGVyMiA9IDA7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEID09IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIHRlbXBjb3VudGVyMiA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0ZW1wY291bnRlcjIgLSAxIDwgMCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwic3RhcnRpbmcgZnJvbSBvYmxpdmlvblwiKTtcclxuICAgICAgdGVtcGNvdW50ZXIgPSB0ZW1wY291bnRlcjIgKyBfcm9sbGluZyAtIDE7XHJcbiAgICAgIHZhciBkaWNldG9iZSA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIiArIGRpY2V0b2JlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRlbXBjb3VudGVyID0gdGVtcGNvdW50ZXIyICsgX3JvbGxpbmc7XHJcbiAgICAgIHZhciBkaWNldG9iZSA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIiArIGRpY2V0b2JlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSb2xsRGljZTogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgIHZhciBEaWNlMTtcclxuICAgICAgdmFyIERpY2UyO1xyXG4gICAgICBpZiAoX2lzVGVzdCAmJiB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgICBEaWNlMSA9IHBhcnNlSW50KF9kaWNlaW5wdXQxKTtcclxuICAgICAgICBEaWNlMiA9IHBhcnNlSW50KF9kaWNlaW5wdXQyKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gdHJ1ZSAmJiBfaXNUZXN0KSB7XHJcbiAgICAgICAgRGljZTEgPSA1MDtcclxuICAgICAgICBEaWNlMiA9IDM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuICAgICAgICBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDEgPT0gRGljZTEpIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMiA9PSBEaWNlMikgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICAgICAgUHJldmlvdXNEaWNlUm9sbDEgPSBEaWNlMTtcclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsMiA9IERpY2UyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB2YXIgRGljZTE9MjA7XHJcbiAgICAgIC8vIHZhciBEaWNlMj0xO1xyXG5cclxuICAgICAgRGljZVJvbGwgPSBEaWNlMSArIERpY2UyO1xyXG4gICAgICB2YXIgX25ld1JvbGwgPSB7IGRpY2UxOiBEaWNlMSwgZGljZTI6IERpY2UyIH07XHJcbiAgICAgIC8vRGljZVJvbGw9MjM7XHJcbiAgICAgIC8vdGhpcy5UZW1wQ2hlY2tTcGFjZShEaWNlUm9sbCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZGljZSBudW1iZXI6IFwiICsgRGljZVJvbGwgKyBcIiwgRGljZTE6XCIgKyBEaWNlMSArIFwiLCBEaWNlMjpcIiArIERpY2UyKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMywgX25ld1JvbGwpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJvbGxPbmVEaWNlKCkge1xyXG4gICAgdmFyIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGw1ID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIFByZXZpb3VzRGljZVJvbGw1ID0gRGljZTE7XHJcblxyXG4gICAgcmV0dXJuIERpY2UxO1xyXG4gIH0sXHJcblxyXG4gIFJvbGxUd29EaWNlcygpIHtcclxuICAgIHZhciBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgdmFyIERpY2UyID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcblxyXG4gICAgaWYgKFByZXZpb3VzRGljZVJvbGwzID09IERpY2UxKSBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgIGlmIChQcmV2aW91c0RpY2VSb2xsNCA9PSBEaWNlMikgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuXHJcbiAgICBQcmV2aW91c0RpY2VSb2xsMyA9IERpY2UxO1xyXG4gICAgUHJldmlvdXNEaWNlUm9sbDQgPSBEaWNlMjtcclxuXHJcbiAgICByZXR1cm4gRGljZTEgKyBEaWNlMjtcclxuICB9LFxyXG5cclxuICBjYWxsVXBvbkNhcmQoKSB7XHJcbiAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBfc3BhY2VJRCA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlcjtcclxuICAgICAgICBpZiAoX3NwYWNlSUQgIT0gNiAmJiBfc3BhY2VJRCAhPSA3KSB7XHJcbiAgICAgICAgICAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVuYXMgc2VsbCBzcGFjZVxyXG4gICAgICAgICAgdmFyIFJhbmRvbUNhcmQgPSB0aGlzLmdldFJhbmRvbSgwLCAxNSk7XHJcblxyXG4gICAgICAgICAgLy9mb3IgdGVzdGluZyBvbmx5XHJcbiAgICAgICAgICBpZiAoX3NwYWNlSUQgPT0gMikge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIGJpZyBidXNpbmVzc1xyXG4gICAgICAgICAgICB2YXIgdmFsdWVJbmRleCA9IFswLCAxLCA3LCAxMCwgMiwgMywgNCwgNSwgNiwgOF07XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDEwKTtcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSAxO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSA1KSB7XHJcbiAgICAgICAgICAgIC8vbGFuZGVkIG9uIHNvbWUgbG9zc2VzIGNhcmRzXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4ID0gWzAsIDEsIDUsIDYsIDIsIDcsIDMsIDQsIDgsIDldO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCAxMCk7XHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB2YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgLy8gUmFuZG9tQ2FyZCA9IDA7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKF9zcGFjZUlEID09IDMpIHtcclxuICAgICAgICAgICAgLy9sYW5kZWQgb24gc29tZSBtYXJrZXRpbmcgY2FyZHNcclxuICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXggPSBbMCwgNywgMywgOCwgMTMsIDksIDEsIDIsIDQsIDVdO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCAxMCk7XHJcbiAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB2YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gNTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoX3NwYWNlSUQgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2xhbmRlZCBvbiBzb21lIHdpbGQgY2FyZHNcclxuICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXggPSBbMCwgMSwgNiwgMTAsIDIsIDMsIDRdO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCA3KTtcclxuICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoX3NwYWNlSUQpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIHJlYWwgcGxheWVyXHJcbiAgICAgICAgICAgIGlmIChfc3BhY2VJRCA9PSAxMikge1xyXG4gICAgICAgICAgICAgIC8vIGlmIHBsYXllciBsYW5kZWQgb24gZmluaXNoIHNwYWNlXHJcbiAgICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDU7XHJcbiAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YSA9IHsgcmFuZG9tQ2FyZDogUmFuZG9tQ2FyZCwgY291bnRlcjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvL2ZvciBib3RcclxuICAgICAgICAgICAgaWYgKF9zcGFjZUlEID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgLy8gaWYgcGxheWVyIGxhbmRlZCBvbiBmaW5pc2ggc3BhY2VcclxuICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGEgPSB7IHJhbmRvbUNhcmQ6IFJhbmRvbUNhcmQsIGNvdW50ZXI6IFJvbGxDb3VudGVyIH07XHJcbiAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIEJvdEdhbWVPdmVyKSB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIHVzZXJHYW1lT3ZlcikgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb21wbGV0ZSB0dXJuIGlzIGNhbGxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKHRydWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBsZXRlQ2FyZFR1cm4oKSB7XHJcbiAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gIH0sXHJcblxyXG4gIENhbGxHYW1lQ29tcGxldGUoX2lzQm90ID0gZmFsc2UsIF9mb3JjZUdhbWVPdmVyID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgLy8gaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgIC8vICAgICB0aGlzLlR1cm5OdW1iZXIgPSB0aGlzLkdldE15SW5kZXgoKTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gMDtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwicGxheWVyIGlzIG5vdCBhY3RpdmUgcmV0dXJuaW5nXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiY2FsY3VsYXRpbmcuLi4uXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJhZ21lIGlzIG5vdCBmaW5pc2hlZFwiKTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgdmFyIF9jYXNoID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICAgICAgICB2YXIgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICB2YXIgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgIHZhciBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICAgIGxvYW5BbW91bnQgKz0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIF9nb2xkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudDtcclxuICAgICAgICAgIHZhciBfc3RvY2tzID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ7XHJcblxyXG4gICAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgIHZhciBPbmNlT3JTaGFyZSA9IF9kaWNlUmFuZG9tICogMTAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgR29sZENhc2ggPSBPbmNlT3JTaGFyZSAqIF9nb2xkO1xyXG4gICAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgICB2YXIgQk1DYXNoID0gKEJNQW1vdW50ICsgQk1Mb2NhdGlvbnMpICogMTUwMDAwO1xyXG5cclxuICAgICAgICAgIHZhciBITUNhc2ggPSAwO1xyXG4gICAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMikgSE1DYXNoID0gMjUwMDAgKyA2MDAwMDtcclxuICAgICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDMpIEhNQ2FzaCA9IDI1MDAwICsgMjUwMDAgKyA2MDAwMDtcclxuXHJcbiAgICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTY29yZSA9IFRvdGFsQXNzZXRzO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsSEJDYXNoID0gSE1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsR29sZENhc2ggPSBHb2xkQ2FzaDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFN0b2Nrc0Nhc2ggPSBTdG9ja0Nhc2g7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0pO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0YSBwdXNoZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBfcGxheWVySW5kZXggPSAwOyBfcGxheWVySW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgX3BsYXllckluZGV4KyspIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgX2Nhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgICAgICB2YXIgSE1BbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgIHZhciBCTUFtb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICB2YXIgQk1Mb2NhdGlvbnMgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgIHZhciBsb2FuQW1vdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgICAgICBsb2FuQW1vdW50ICs9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBfZ29sZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ7XHJcbiAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICB2YXIgT25jZU9yU2hhcmUgPSBfZGljZVJhbmRvbSAqIDEwMDA7XHJcblxyXG4gICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcbiAgICAgICAgdmFyIEJNQ2FzaCA9IChCTUFtb3VudCArIEJNTG9jYXRpb25zKSAqIDE1MDAwMDtcclxuXHJcbiAgICAgICAgdmFyIEhNQ2FzaCA9IDA7XHJcbiAgICAgICAgaWYgKEhNQW1vdW50ID09IDEpIEhNQ2FzaCA9IDYwMDAwO1xyXG4gICAgICAgIGVsc2UgaWYgKEhNQW1vdW50ID09IDIpIEhNQ2FzaCA9IDI1MDAwICsgNjAwMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoSE1BbW91bnQgPT0gMykgSE1DYXNoID0gMjUwMDAgKyAyNTAwMCArIDYwMDAwO1xyXG5cclxuICAgICAgICB2YXIgVG90YWxBc3NldHMgPSBfY2FzaCArIEJNQ2FzaCArIEhNQ2FzaCArIEdvbGRDYXNoICsgU3RvY2tDYXNoIC0gbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU2NvcmUgPSBUb3RhbEFzc2V0cztcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxIQkNhc2ggPSBITUNhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEdvbGRDYXNoID0gR29sZENhc2g7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU3RvY2tzQ2FzaCA9IFN0b2NrQ2FzaDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDYsIF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50VG9TeW5jR2FtZUNvbXBsZXRlRGF0YShfZGF0YSkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxNiwgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFN5bmNHYW1lT3ZlcihfVUlEKSB7XHJcbiAgICB2YXIgaW5mb1RleHQgPSBcIlwiO1xyXG4gICAgdmFyIHN0YXR1c1RleHQgPSBcIlwiO1xyXG4gICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIGlmICghR2FtZUNvbXBsZXRlZCkge1xyXG4gICAgICAgIEdhbWVDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdERhdGEoKTtcclxuICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgdmFyIE15RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdmFyIF9pbmRleCA9IC0xO1xyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQgPT0gX1VJRCkge1xyXG4gICAgICAgICAgICAgIF9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc3RhdHVzVGV4dCA9IFwiR2FtZSB3b24gYnkgXCIgKyBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICAgIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAgICAgLy95b3Ugd29uXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkNvbmdyYXRzISB5b3UgaGF2ZSB3b24gdGhlIGdhbWUuXCI7XHJcbiAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArXHJcbiAgICAgICAgICAgICAgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgX2N1cnJlbnRDYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgICAgICAgICB2YXIgX3RvdGFsID0gX2N1cnJlbnRDYXNoICsgcGFyc2VJbnQoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVDYXNoID0gX3RvdGFsLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3dvbiA9IHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uKTtcclxuICAgICAgICAgICAgX3dvbiA9IF93b24gKyAxO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbiA9IF93b24udG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKF90b3RhbCwgX3dvbiwgLTEpO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJVbmZvcnR1bmF0ZWx5ISB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiO1xyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArXHJcbiAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgICAgIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggK1xyXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICtcclxuICAgICAgICAgICAgICBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICtcclxuICAgICAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgIC8vd2l0aCBib3RcclxuICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICB2YXIgTXlEYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKE15RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzBdLkdhbWVPdmVyID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmIChNeURhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICBzdGF0dXNUZXh0ID0gXCJDb25ncmF0cyEgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiO1xyXG4gICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiT3RoZXIgUGxheWVyIEVhcm5lZCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMV0uVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICB2YXIgX2N1cnJlbnRDYXNoID0gcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2gpO1xyXG4gICAgICAgIHZhciBfdG90YWwgPSBfY3VycmVudENhc2ggKyBwYXJzZUludChNeURhdGEuVG90YWxTY29yZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEuZ2FtZUNhc2ggPSBfdG90YWwudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgdmFyIF93b24gPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5nYW1lc1dvbik7XHJcbiAgICAgICAgX3dvbiA9IF93b24gKyAxO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLmdhbWVzV29uID0gX3dvbi50b1N0cmluZygpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlVwZGF0ZVVzZXJEYXRhKF90b3RhbCwgX3dvbiwgLTEpO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy95b3UgbG9zZVxyXG5cclxuICAgICAgICBzdGF0dXNUZXh0ID0gXCJVbmZvcnR1bmF0ZWx5ISB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiO1xyXG4gICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsSEJDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsQk1DYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbEdvbGRDYXNoICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgK1xyXG4gICAgICAgICAgTXlEYXRhLlRvdGFsU3RvY2tzQ2FzaCArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICtcclxuICAgICAgICAgIE15RGF0YS5Ub3RhbExvYW5CYWxhbmNlICtcclxuICAgICAgICAgIFwiXFxuXCIgK1xyXG4gICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArXHJcbiAgICAgICAgICBNeURhdGEuVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgIFwiT3RoZXIgUGxheWVyIEVhcm5lZCBDYXNoIDogJFwiICtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMV0uVG90YWxTY29yZSArXHJcbiAgICAgICAgICBcIlxcblwiO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBTeW5jR2FtZUNvbXBsZXRlRGF0YShfZGF0YSkge1xyXG4gICAgdmFyIF9pc0JvdCA9IF9kYXRhLkJvdDtcclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKHRydWUsIGZhbHNlKTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJHYW1lIG92ZXIsIGNhbGN1bGF0aW5nIHRvdGFsIGNhc2guLi5cIiwgMTUwMCwgZmFsc2UpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcblxyXG4gICAgICAgIHZhciBtYXggPSAtMTtcclxuICAgICAgICB2YXIgU2VsZWN0ZWRJbmQgPSAwO1xyXG4gICAgICAgIHZhciBTZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICBpZiAoX3ZhbHVlID4gbWF4KSB7XHJcbiAgICAgICAgICAgIFNlbGVjdGVkSW5kID0gaW5kZXg7XHJcbiAgICAgICAgICAgIG1heCA9IF92YWx1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChTZXNzaW9uRGF0YVtpbmRleF0uSXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfdmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS50cmFjZShcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIgKyBTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLlBsYXllclVJRCk7XHJcbiAgICAgIH0sIDE1MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUoZmFsc2UsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIkdhbWUgb3ZlciwgY2FsY3VsYXRpbmcgdG90YWwgY2FzaC4uLlwiLCA0MDAwLCBmYWxzZSk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKSk7XHJcbiAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgICAgdmFyIG1heCA9IC0xO1xyXG4gICAgICAgICAgdmFyIFNlbGVjdGVkSW5kID0gMDtcclxuICAgICAgICAgIHZhciBTZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoU2Vzc2lvbkRhdGFbaW5kZXhdLklzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoX3ZhbHVlID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBTZWxlY3RlZEluZCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gX3ZhbHVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKFNlc3Npb25EYXRhW2luZGV4XS5Jc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc29sZS50cmFjZShcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIgKyBTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEFsbFBsYXllcnNHYW1lQ29tcGxldGVkKF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IEJvdDogX2lzQm90IH07XHJcbiAgICB0aGlzLlJhaXNlRXZlbnRUb1N5bmNHYW1lQ29tcGxldGVEYXRhKF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBHYW1lT3ZlcihfZm9yY2VHYW1lT3ZlciA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0T25seSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgICAgICB2YXIgcGxheWVyY29tcGxldGVkID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5pc0dhbWVGaW5pc2hlZCkgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSXNBY3RpdmUpIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY29tcGxldGVkOiBcIiArIHBsYXllcmNvbXBsZXRlZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgZ2FtZWluZm8gbGVuZ3RoOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKTtcclxuICAgICAgICBpZiAocGxheWVyY29tcGxldGVkID49IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoIHx8IF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAvL2dhbWUgY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1cclxuICAgICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgaWYgKF9mb3JjZUdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICAgICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCkgQm90R2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICBlbHNlIHVzZXJHYW1lT3ZlciA9IHRydWU7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcInVzZXJnYW1lb3ZlcjogXCIgKyB1c2VyR2FtZU92ZXIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImJvdGdhbWVvdmVyOiBcIiArIEJvdEdhbWVPdmVyKTtcclxuICAgICAgLy8gdGhpcy5DYWxsR2FtZUNvbXBsZXRlKHRydWUpO1xyXG4gICAgICB2YXIgcGxheWVyY29tcGxldGVkID0gMDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmlzR2FtZUZpbmlzaGVkKSBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBsYXllcmNvbXBsZXRlZCA9PSB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCkge1xyXG4gICAgICAgIC8vZ2FtZWNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtc1xyXG4gICAgICAgIEJvdEdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICB1c2VyR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIFN0YXJ0RGljZVJvbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChSb2xsQ291bnRlciA+PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiR2FtZW92ZXJcIik7XHJcbiAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5HYW1lT3ZlcihmYWxzZSk7XHJcbiAgICAgIH0sIDE1MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgRGljZVRlbXAgPSBEaWNlVGVtcCArIDE7XHJcbiAgICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuVHdlZW5QbGF5ZXIodGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0UmFuZG9tOiBmdW5jdGlvbiAobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgfSxcclxuXHJcbiAgVHdlZW5DYW1lcmE6IGZ1bmN0aW9uIChfcG9zLCBpc1pvb20sIHRpbWUpIHtcclxuICAgIGNjLnR3ZWVuKHRoaXMuQ2FtZXJhTm9kZSlcclxuICAgICAgLnRvKHRpbWUsIHsgcG9zaXRpb246IGNjLnYyKF9wb3MueCwgX3Bvcy55KSB9LCB7IGVhc2luZzogXCJxdWFkSW5PdXRcIiB9KVxyXG4gICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzWm9vbSkgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgICBlbHNlIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICB9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICBab29tQ2FtZXJhSW4oKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA8IDIpIHtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSB0aGlzLkNhbWVyYS56b29tUmF0aW8gKyAwLjAzO1xyXG4gICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gMjtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICB9LFxyXG5cclxuICBDaGVja1BheURheUNvbmRpdGlvbnMoX2lzQm90ID0gZmFsc2UpIHtcclxuICAgIGlmIChSb2xsQ291bnRlciA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2KSB7XHJcbiAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gUGFzc2VkUGF5RGF5Q291bnRlciArIDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNykge1xyXG4gICAgICAgIERvdWJsZVBheURheSA9IHRydWU7XHJcbiAgICAgICAgRG91YmxlUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9uZXh0VHVybkRvdWJsZVBheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheTtcclxuICAgIGlmIChQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSAmJiAhX25leHRUdXJuRG91YmxlUGF5KSB7XHJcbiAgICAgIC8vdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgIC8vdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKGZhbHNlLCBfaXNCb3QpO1xyXG4gICAgfSBlbHNlIGlmIChEb3VibGVQYXlEYXkgfHwgKFBhc3NlZFBheURheSAmJiBfbmV4dFR1cm5Eb3VibGVQYXkpKSB7XHJcbiAgICAgIC8vdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgIC8vdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKHRydWUsIF9pc0JvdCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFpvb21DYW1lcmFPdXRPbmx5KCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLkNhbWVyYS56b29tUmF0aW8gPj0gMSkge1xyXG4gICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvID0gdGhpcy5DYW1lcmEuem9vbVJhdGlvIC0gMC4wMztcclxuICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXRPbmx5KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uID0gY2MuVmVjMigwLCAwKTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAxO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfSxcclxuXHJcbiAgWm9vbUNhbWVyYU91dCgpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5DYW1lcmEuem9vbVJhdGlvID49IDEpIHtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbyA9IHRoaXMuQ2FtZXJhLnpvb21SYXRpbyAtIDAuMDM7XHJcbiAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uID0gY2MuVmVjMigwLCAwKTtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW8gPSAxO1xyXG4gICAgICAgIC8vIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKDApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCAmJiAhQm90R2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnModGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ICYmICF1c2VyR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAgICAgLy9yZWFsIHBsYXllclxyXG4gICAgICAgICAgaWYgKFBsYXllckxlZnQpIHtcclxuICAgICAgICAgICAgLy8gSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBQbGF5ZXJMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKCk7XHJcbiAgICAgICAgICBlbHNlIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfSxcclxuXHJcbiAgVHdlZW5QbGF5ZXI6IGZ1bmN0aW9uIChOb2RlLCBUb1Bvcykge1xyXG4gICAgY2MudHdlZW4oTm9kZSkgLy8wLjRcclxuICAgICAgLnRvKDAuNCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmIChEaWNlVGVtcCA8IERpY2VSb2xsKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhEaWNlVGVtcCArIFwiIFwiICsgUm9sbENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vZm9yIGJvdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFCb3RHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNiB8fFxyXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gN1xyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJib3QgZ2FtZSBpcyBvdmVyXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoIXVzZXJHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNiB8fFxyXG4gICAgICAgICAgICAgICAgICBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudChcIlNwYWNlSGFuZGxlclwiKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gN1xyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLy8gY29uc29sZS5lcnJvcihQYXNzZWRQYXlEYXlDb3VudGVyKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGdhbWUgaXMgb3ZlciBza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFBhc3NlZFBheURheSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KFwiU3BhY2VIYW5kbGVyXCIpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoXCJTcGFjZUhhbmRsZXJcIikuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgRG91YmxlUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgRG91YmxlUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBmaW5pc2hlZCBmb3I6IFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChSb2xsQ291bnRlciA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKFJvbGxDb3VudGVyID09IDEyKSBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMjE7XHJcbiAgICAgICAgICAgIGVsc2UgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDE7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMTtcclxuICAgICAgICAgICAgRGljZVRlbXAgPSBEaWNlUm9sbDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvL0RpY2VUZW1wPURpY2VUZW1wKzE7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhEaWNlVGVtcCArIFwiIFwiICsgUm9sbENvdW50ZXIpO1xyXG5cclxuICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgLy90aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBfbmV3cG9zID0gY2MuVmVjMigwLCAwKTtcclxuICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcywgZmFsc2UsIDAuNik7IC8vem9vbW91dFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgLy9ydWxlcyBpbXBsbWVudGF0aW9uIGR1cmluZyB0dXJuICh0dXJuIGRlY2lzaW9ucylcclxuXHJcbiAgVG9nZ2xlUGF5RGF5KF9zdDEsIF9TdDIpIHtcclxuICAgIFBhc3NlZFBheURheSA9IF9zdDE7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfU3QyO1xyXG5cclxuICAgIGlmICghX3N0MSkge1xyXG4gICAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIV9TdDIpIHtcclxuICAgICAgRG91YmxlUGF5RGF5Q291bnRlciA9IDA7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5jcmVhc2VEb3VibGVQYXlEYXkoKSB7XHJcbiAgICBEb3VibGVQYXlEYXlDb3VudGVyKys7XHJcbiAgfSxcclxuXHJcbiAgRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKGFtb3VudCwgX2luZGV4LCBfbG9jYXRpb25OYW1lLCBfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLCBfR2l2ZW5DYXNoID0gMCwgX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoIDwgMykge1xyXG4gICAgICBpZiAoIV9pc0NhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCAtIGFtb3VudDtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCArIDE7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5wdXNoKF9sb2NhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLCAxMDAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgIH0sIDEyMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2ggdG8gZXhwYW5kIHRoaXMgYnVzaW5lc3MsIGNhc2ggbmVlZGVkICQgXCIgKyBhbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX0dpdmVuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgIF9HaXZlbkNhc2ggPSBfR2l2ZW5DYXNoIC0gYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ICsgMTtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsIDEwMDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIiArIGFtb3VudCArIFwiLCBDYXNoIEdpdmVuICRcIiArIF9HaXZlbkNhc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGxvY2F0aW9uc1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsIF9HaXZlbkNhc2ggPSAwLCBfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoID0gZmFsc2UpIHtcclxuICAgIEJ1c2luZXNzTG9jYXRpb25Ob2RlcyA9IFtdO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChwYXJzZUludCh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIC8vdGhpcyBtZWFucyB0aGVyZSBpcyBicmljayBhbmQgbW9ydGFyIGluIGxpc3RcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRCdXNpbmVzc0luZGV4KGkpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlNldENhcmRGdW5jdGlvbmFsaXR5KF9pc0NhcmRGdW5jdGlvbmFsaXR5KTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkV4cGFuZEJ1c2luZXNzSGFuZGxlclwiKS5TZXRHaXZlbkNhc2goX0dpdmVuQ2FzaCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJFeHBhbmRCdXNpbmVzc0hhbmRsZXJcIikuU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiRXhwYW5kQnVzaW5lc3NIYW5kbGVyXCIpLlJlc2V0RWRpdEJveCgpO1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhCdXNpbmVzc0xvY2F0aW9uTm9kZXMpO1xyXG4gICAgcmV0dXJuIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7XHJcbiAgfSxcclxuXHJcbiAgRGVzdHJveUdlbmVyYXRlZE5vZGVzKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbihfbmFtZSwgX1NoYXJlQW1vdW50LCBfaXNBZGRpbmcpIHtcclxuICAgIGlmIChfaXNBZGRpbmcpIHtcclxuICAgICAgdmFyIF9zdG9jayA9IG5ldyBTdG9ja0luZm8oKTtcclxuICAgICAgX3N0b2NrLkJ1c2luZXNzTmFtZSA9IF9uYW1lO1xyXG4gICAgICBfc3RvY2suU2hhcmVBbW91bnQgPSBfU2hhcmVBbW91bnQ7XHJcblxyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZlN0b2Nrcy5wdXNoKF9zdG9jayk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsIF9pc0JvdCA9IGZhbHNlLCBfZm9yU2VsZWN0ZWRCdXNpbmVzcyA9IGZhbHNlLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gMCwgSEJBbW91bnQgPSAwLCBCTUFtb3VudCA9IDAsIEJNTG9jYXRpb25zID0gMCkge1xyXG4gICAgaWYgKF9mb3JTZWxlY3RlZEJ1c2luZXNzKSB7XHJcbiAgICAgIHZhciBfdGl0bGUgPSBcIlBheURheVwiO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBfaXNCb3QsIF9mb3JTZWxlY3RlZEJ1c2luZXNzLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4LCBIQkFtb3VudCwgQk1BbW91bnQsIEJNTG9jYXRpb25zLCAxLCAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChEb3VibGVQYXlEYXkgJiYgUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkge1xyXG4gICAgICAgIERvdWJsZVBheURheUNvdW50ZXIgPSAyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBfc2tpcE5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk7XHJcbiAgICAgIF9za2lwSE1OZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXk7XHJcbiAgICAgIF9za2lwQk1OZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk7XHJcblxyXG4gICAgICBpZiAoX3NraXBOZXh0UGF5ZGF5KSB7XHJcbiAgICAgICAgLy9pZiBwcmV2aW91c2x5IHNraXAgcGF5ZGF5IHdhcyBzdG9yZWQgYnkgYW55IGNhcmRcclxuICAgICAgICB0aGlzLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG5cclxuICAgICAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIFBheURheS5cIiwgMTYwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgIH0sIDE2NTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIFBheURheS5cIik7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBfdGl0bGUgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZiAoX2lzRG91YmxlUGF5RGF5KSBfdGl0bGUgPSBcIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgIGVsc2UgX3RpdGxlID0gXCJQYXlEYXlcIjtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSwgX2lzRG91YmxlUGF5RGF5LCBfc2tpcEhNTmV4dFBheWRheSwgX3NraXBCTU5leHRQYXlkYXksIF9pc0JvdCwgZmFsc2UsIDAsIDAsIDAsIDAsIFBhc3NlZFBheURheUNvdW50ZXIsIERvdWJsZVBheURheUNvdW50ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgQmFua3J1cHRfVHVybkRlY2lzaW9uKCkge1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50ICs9IDE7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsIGZhbHNlLCB0aGlzLlNlbGVjdGVkTW9kZSwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCk7XHJcbiAgfSxcclxuXHJcbiAgU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50LCBfdUlEKSB7XHJcbiAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgQ2FzaDogX2Ftb3VudCwgSUQ6IF91SUQgfSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMywgX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2RhdGEpIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IF9kYXRhLkRhdGEuQ2FzaDtcclxuICAgICAgdmFyIF9pRCA9IF9kYXRhLkRhdGEuSUQ7XHJcblxyXG4gICAgICB2YXIgX215SW5kZXggPSB0aGlzLkdldE15SW5kZXgoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5QbGF5ZXJVSUQgPT0gX2lEKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLmlzR2FtZUZpbmlzaGVkID09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlRvdGFsU2NvcmUgKz0gX2Ftb3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgcmVjZWl2ZWQgcHJvZml0IG9mICRcIiArIF9hbW91bnQgKyBcIiBmcm9tIHlvdXIgcGFydG5lci5cIiwgMjgwMCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBDYXJkcyBSdWxlc1xyXG4gIFRvZ2dsZURvdWJsZVBheU5leHRUdXJuKF9zdGF0ZSkge1xyXG4gICAgX25leHRUdXJuRG91YmxlUGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5ID0gX25leHRUdXJuRG91YmxlUGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBOZXh0VHVybihfc3RhdGUpIHtcclxuICAgIF9za2lwTmV4dFR1cm4gPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuID0gX3NraXBOZXh0VHVybjtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTa2lwUGF5RGF5X1dob2xlKF9zdGF0ZSkge1xyXG4gICAgX3NraXBOZXh0UGF5ZGF5ID0gX3N0YXRlO1xyXG4gICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0UGF5ZGF5ID0gX3NraXBOZXh0UGF5ZGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKF9zdGF0ZSkge1xyXG4gICAgX3NraXBITU5leHRQYXlkYXkgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEhNTmV4dFBheWRheSA9IF9za2lwSE1OZXh0UGF5ZGF5O1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoX3N0YXRlKSB7XHJcbiAgICBfc2tpcEJNTmV4dFBheWRheSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwQk1OZXh0UGF5ZGF5ID0gX3NraXBCTU5leHRQYXlkYXk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlVHVyblByb2dyZXNzKF9zdGF0ZSkge1xyXG4gICAgVHVybkluUHJvZ3Jlc3MgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgUmV0dXJuVHVyblByb2dyZXNzKCkge1xyXG4gICAgcmV0dXJuIFR1cm5JblByb2dyZXNzO1xyXG4gIH0sXHJcblxyXG4gIExvc2VBbGxNYXJrZXRpbmdNb25leSgpIHtcclxuICAgIHZhciBfbG9zZUFtb3VudCA9IC0xO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPiAwKSB7XHJcbiAgICAgIF9sb3NlQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfbG9zZUFtb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9sb3NlQW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE11bHRpcGx5TWFya2V0aW5nTW9uZXkoX211bHRpcGxpZXIpIHtcclxuICAgIHZhciBfYW1vdW50SW5jcmVhc2VkID0gLTE7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCA+IDApIHtcclxuICAgICAgX2Ftb3VudEluY3JlYXNlZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgKj0gX211bHRpcGxpZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfYW1vdW50SW5jcmVhc2VkID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2Ftb3VudEluY3JlYXNlZDtcclxuICB9LFxyXG5cclxuICBHZXRNYXJrZXRpbmdNb25leShfcHJvZml0KSB7XHJcbiAgICB2YXIgX2Ftb3VudCA9IC0xO1xyXG4gICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQgPiAwKSB7XHJcbiAgICAgIF9wcm9maXQgPSBfcHJvZml0IC8gMTAwO1xyXG4gICAgICBfYW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCAqPSBfcHJvZml0O1xyXG4gICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50ID0gMDtcclxuICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF9hbW91bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBfYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIFF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uKF9kYXRhKSB7XHJcbiAgICB2YXIgX3VzZXJJRCA9IF9kYXRhLlVzZXJJRDtcclxuICAgIHZhciBfcXVlc3Rpb25JbmRleCA9IF9kYXRhLlF1ZXN0aW9uO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9kYXRhLlVzZXJJbmRleDtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gICAgaWYgKF91c2VySUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSUQgbWF0Y2hlZFwiKTtcclxuXHJcbiAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcblxyXG4gICAgICBPbmVRdWVzdGlvbkluZGV4ID0gX3F1ZXN0aW9uSW5kZXg7XHJcbiAgICAgIHZhciBfcXVlc3Rpb25Bc2tlZCA9IE9uZVF1ZXN0aW9uc1tfcXVlc3Rpb25JbmRleCAtIDFdO1xyXG4gICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3F1ZXN0aW9uQXNrZWQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uKF9pc1R1cm5PdmVyID0gZmFsc2UpIHtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX215RGF0YTtcclxuICAgIHZhciBfcm9vbURhdGE7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgX3Jvb21EYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIF9teURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICBfcm9vbURhdGEgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgfVxyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSh0cnVlKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5SZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpO1xyXG4gICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsIF9yb29tRGF0YSwgX2lzVHVybk92ZXIsIHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICB9LFxyXG5cclxuICBPbmVRdWVzdGlvbkRlY2lzaW9uX1BheUFtb3VudF9PbmVRdWVzdGlvbigpIHtcclxuICAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAgIGlmIChfbXlEYXRhLkNhc2ggPj0gNTAwMCkge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgPT0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoIC09IDUwMDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgcGFpZCBjYXNoIGFtb3VudCB0byBwbGF5ZXIuXCIsIDEyMDApO1xyXG4gICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24odHJ1ZSwgZmFsc2UsIC0xLCBfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uZVF1ZXN0aW9uRGVjaXNpb25fQW5zd2VyUXVlc3Rpb25fT25lUXVlc3Rpb24oKSB7XHJcbiAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYW5zd2VyZWQgdGhlIHF1ZXN0aW9uLlwiLCAxMjAwKTtcclxuICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsIHRydWUsIE9uZVF1ZXN0aW9uSW5kZXgsIF9teURhdGEuUGxheWVyVUlEKTtcclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2hhc0RvbmVQYXltZW50LCBfaGFzQW5zd2VyZWRRdWVzdGlvbiwgX3F1ZXN0aW9uSW5kZXgsIF9Vc2VySUQpIHtcclxuICAgIHZhciBfZGF0YSA9IHsgUGF5bWVudERvbmU6IF9oYXNEb25lUGF5bWVudCwgUXVlc3Rpb25BbnN3ZXJlZDogX2hhc0Fuc3dlcmVkUXVlc3Rpb24sIFF1ZXN0aW9uSW5kZXg6IF9xdWVzdGlvbkluZGV4LCBJRDogX1VzZXJJRCB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg4LCBfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2RhdGEpIHtcclxuICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCA9PSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCkge1xyXG4gICAgICB2YXIgX2hhc0RvbmVQYXltZW50ID0gX2RhdGEuUGF5bWVudERvbmU7XHJcbiAgICAgIHZhciBfaGFzQW5zd2VyZWRRdWVzdGlvbiA9IF9kYXRhLlF1ZXN0aW9uQW5zd2VyZWQ7XHJcbiAgICAgIHZhciBfcXVlc3Rpb25JbmRleCA9IF9kYXRhLlF1ZXN0aW9uSW5kZXg7XHJcbiAgICAgIHZhciBfdUlEID0gX2RhdGEuSUQ7XHJcblxyXG4gICAgICBpZiAoX2hhc0RvbmVQYXltZW50KSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCArPSA1MDAwO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIHJlZnVzZWQgdG8gYW5zd2VyIHRoZSBxdWVzdGlvbiBpbnN0ZWFkIHBheWVkIHRoZSBjYXNoIGFtb3VudCwgJDUwMDAgYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudFwiLCAyMTAwKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgfSBlbHNlIGlmIChfaGFzQW5zd2VyZWRRdWVzdGlvbikge1xyXG4gICAgICAgIHZhciBfc2VsZWN0ZWRQbGF5ZXJJbmRleCA9IDA7XHJcbiAgICAgICAgdmFyIF9hY3RvcnNEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX3VJRCA9PSBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgICAgX3NlbGVjdGVkUGxheWVySW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMSkge1xyXG4gICAgICAgICAgLy9oYXZlIHlvdSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1xyXG4gICAgICAgICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlNraXBwZWRMb2FuUGF5bWVudCkge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSBza2lwcGVkIGxvYW4gcGF5ZW1lbnQgaW4gcHJldmlvdXMgcGF5ZGF5XCIsIDIxMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gMikge1xyXG4gICAgICAgICAgLy9IYXZlIHlvdSB0YWtlbiBhbnkgbG9hbj9cclxuICAgICAgICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChfbG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgdGFrZW4gc29tZSBsb2FuXCIsIDIxMDApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgdGFrZW4gYW55IGxvYW5cIiwgMjEwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChfcXVlc3Rpb25JbmRleCA9PSAzKSB7XHJcbiAgICAgICAgICAvL0FyZSB5b3UgYmFua3J1cHRlZD8gaWYgbW9yZSB0aGFuIG9uY2UsIHRlbGwgbWUgdGhlIGFtb3VudD9cclxuICAgICAgICAgIGlmIChfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Jc0JhbmtydXB0KSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkIFwiICsgX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQmFua3J1cHRBbW91bnQgKyBcIiB0aW1lL2VzLlwiLCAyMTAwKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZFwiLCAyMTAwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKF9xdWVzdGlvbkluZGV4ID09IDQpIHtcclxuICAgICAgICAgIC8vSXMgeW91ciB0dXJuIGdvaW5nIHRvIGJlIHNraXBwZWQgbmV4dCB0aW1lP1xyXG4gICAgICAgICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgYmUgc2tpcHBlZC5cIiwgMjEwMCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgbm90IGJlIHNraXBwZWQuXCIsIDIxMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX3F1ZXN0aW9uSW5kZXggPT0gNSkge1xyXG4gICAgICAgICAgLy9JcyBpdCBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSB5b3VyIG5leHQgcGF5ZGF5P1xyXG4gICAgICAgICAgaWYgKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5KSB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIGJlIGRvdWJsZSBwYXlkYXlcIiwgMjEwMCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBub3QgYmUgZG91YmxlIHBheWRheVwiLCAyMTAwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICB9LCAyMTUwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSkge1xyXG4gICAgaWYgKElzVHdlZW5pbmcgPT0gdHJ1ZSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICAgIH0sIDgwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3NwYWNlcyA9IF9kYXRhLkRhdGEuYmFja3NwYWNlcztcclxuICAgICAgdmFyIF9jb3VudGVyID0gX2RhdGEuRGF0YS5Db3VudGVyO1xyXG5cclxuICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19jb3VudGVyICsgQmFja3NwYWNlc10uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MsIDAuMSk7XHJcblxyXG4gICAgICBSb2xsQ291bnRlciA9IF9jb3VudGVyO1xyXG4gICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBUd2VlblBsYXllcl9Hb0JhY2tTcGFjZXM6IGZ1bmN0aW9uIChOb2RlLCBUb1Bvcywgc3BlZWQgPSAwLjYpIHtcclxuICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgIC50byhzcGVlZCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgLmNhbGwoKCkgPT4ge30pXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIEdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICBSb2xsQ291bnRlciAtPSBCYWNrc3BhY2VzO1xyXG5cclxuICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgIHZhciBfZGF0YSA9IHsgRGF0YTogeyBiYWNrc3BhY2VzOiBCYWNrc3BhY2VzLCBDb3VudGVyOiBSb2xsQ291bnRlciB9IH07XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTAsIF9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sIF90b1Bvcyk7XHJcbiAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuICAvLyNlbmRyZWdpb25cclxufSk7XHJcbi8vbW9kdWxlLmV4cG9ydHMgID0gUGxheWVyRGF0YTsgLy93aGVuIGltcG9ydHMgaW4gYW5vdGhlciBzY3JpcHQgb25seSByZWZlcmVuY2Ugb2YgcGxheWVyZGF0YSBjbGFzcyB3b3VsZCBiZSBhYmxlIHRvIGFjY2Vzc2VkIGZyb20gR2FtZW1hbmFnZXIgaW1wb3J0XHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZU1hbmFnZXI7XHJcbi8vI2VuZHJlZ2lvblxyXG4iXX0=