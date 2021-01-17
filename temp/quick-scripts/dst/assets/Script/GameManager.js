
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
var PassedPayDayCounter = 0; //#region superclasses and enumerations
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
  ResetAllVariables: function ResetAllVariables() {
    _diceinput1 = "";
    _diceinput2 = "";
    PreviousDiceRoll1 = -1;
    PreviousDiceRoll2 = -1;
    PreviousDiceRoll3 = -1;
    PreviousDiceRoll4 = -1;
    PreviousDiceRoll5 = -1;
    userGameOver = false;
    BotGameOver = false;
    RollCounter = 0;
    DiceTemp = 0;
    DiceRoll = 0;
    IsTweening = false;
    GamePlayReferenceManager = null;
    TurnCheckArray = [];
    BusinessLocationNodes = [];
    PassedPayDay = false;
    DoublePayDay = false;
    PassedPayDayCounter = 0; //cards functionality

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
  @method onLoad
  @param {string} none
  @returns {boolean} no return
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
  @method CheckReferences
  @param {string} none
  @returns {boolean} no return
  **/
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
  },

  /**
  @summary initial gamemanager essetials
  @method Init_GameManager
  @param {string} none
  @returns {boolean} no return
  **/
  Init_GameManager: function Init_GameManager() {
    this.Camera = this.CameraNode.getComponent(cc.Camera);
    this.isCameraZooming = false;
    this.PlayerGameInfo = [];
    RollCounter = 0;
    DiceTemp = 0;
    DiceRoll = 0;
    console.error(this.SelectedMode);

    if (this.SelectedMode == 2) //game is being played by real players
      {
        //if joined player is spectate
        if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == true) {
          console.log("status of initial business setp: " + GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("InitialSetup")); //if inital setup has been done and game is under way

          if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("InitialSetup") == true) {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleLeaveRoomButton_SpectateModeUI(true);
            var AllData = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("PlayerGameInfo");
            this.PlayerGameInfo = AllData;
            console.log(this.PlayerGameInfo);
            GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = this.PlayerGameInfo.length; //this.SyncDataToPlayerGameInfo(0);

            this.SyncAllData_SpectateManager();
            this.TurnNumber = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().getCustomProperty("TurnNumber");
            this.UpdateGameUI(true, this.TurnNumber);
          } else {
            //this.EnablePlayerNodes();
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleLeaveRoomButton_SpectateModeUI(true);
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().InitialScreen_SpectateMode();
          }
        } else {
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(true, false, this.SelectedMode);
        }
      } else if (this.SelectedMode == 1) //game is being played by bot along with one player
      {
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(true, false, this.SelectedMode);
      }
  },
  //#region public functions to get data (accessible from other classes)
  GetTurnNumber: function GetTurnNumber() {
    return this.TurnNumber;
  },
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
    console.error(AllData);
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
    }

    console.log("synced playernodes");

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
   @method RaiseEventForCard
   @param {string} none
   @returns {boolean} no return
  **/
  RaiseEventForCard: function RaiseEventForCard(_data) {
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(5, _data);
  },
  ClearDisplayTimeout: function ClearDisplayTimeout() {
    clearTimeout(CardDisplaySetTimout);
  },
  DisplayCardOnOthers: function DisplayCardOnOthers() {
    var _this = this;

    if (this.SelectedMode == 2) //for real players
      {
        console.error(CardEventReceived);

        if (CardEventReceived == true) {
          clearTimeout(CardDisplaySetTimout);
          console.error(this.CardCounter);
          CardEventReceived = false;

          if (!this.CardDisplayed) {
            this.CardDisplayed = true;
            GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.CardCounter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(false, this.RandomCardIndex);
          }
        } else {
          CardDisplaySetTimout = setTimeout(function () {
            //check after every 0.5 seconds
            _this.DisplayCardOnOthers();
          }, 500);
        }
      }
  },
  ResetCardDisplay: function ResetCardDisplay() {
    this.CardDisplayed = false;
  },
  ReceiveEventForCard: function ReceiveEventForCard(_data) {
    this.CheckReferences();
    console.log(_data);
    var RandomCard = _data.randomCard;
    var counter = _data.counter;
    this.RandomCardIndex = RandomCard;
    this.CardCounter = counter;
    console.error(CardEventReceived);

    if (this.SelectedMode == 2) {
      if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(true, RandomCard);else CardEventReceived = true;
    } else if (this.SelectedMode == 1) {
      if (this.PlayerGameInfo[this.TurnNumber].IsBot == false) GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(true, RandomCard);else GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(false, RandomCard, true);
    }

    console.error(CardEventReceived);
  },

  /**
   @summary raised event on all connected clients to let others know a particular player has complete their move
   @method RaiseEventTurnComplete
   @param {string} none
   @returns {boolean} no return
  **/
  RaiseEventTurnComplete: function RaiseEventTurnComplete() {
    if (this.SelectedMode == 2) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(4, GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID);
      }
    } else if (this.SelectedMode == 1) {
      console.error("reaised for turn complete");
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
    @method ReceiveEventTurnComplete
    @param {string} none
    @returns {boolean} no return
   **/
  ReceiveEventTurnComplete: function ReceiveEventTurnComplete(_uid) {
    if (this.SelectedMode == 2) //real players
      {
        if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
          console.log(TurnCheckArray.length);
          if (TurnCheckArray.length == 0) TurnCheckArray.push(_uid);
          var ArrayLength = TurnCheckArray.length;
          var IDFound = false;

          for (var index = 0; index < ArrayLength; index++) {
            if (TurnCheckArray[index] == _uid) IDFound = true;
          }

          if (!IDFound) {
            TurnCheckArray.push(_uid);
          }

          console.log(TurnCheckArray);
          console.log(TurnCheckArray.length); // var TotalConnectedPlayers=GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorCount();

          var TotalConnectedPlayers = this.PlayerGameInfo.length;

          if (TurnCheckArray.length == TotalConnectedPlayers) {
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
   @method ChangeTurn
   @param {string} none
   @returns {boolean} no return
  **/
  ChangeTurn: function ChangeTurn() {
    if (this.SelectedMode == 2) {
      this.SyncAllData();
    }

    if (this.TurnNumber < this.PlayerGameInfo.length - 1) this.TurnNumber = this.TurnNumber + 1;else this.TurnNumber = 0;
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(2, this.TurnNumber);
  },
  UpdateVisualData: function UpdateVisualData() {
    for (var index = 0; index < this.AllPlayerUI.length; index++) {
      this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
    }
  },

  /**
  @summary called from raise on event (from function "StartTurn" and "ChangeTurn" of this same class) to handle turn
  @method TurnHandler
  @param {string} none
  @returns {boolean} no return
  **/
  TurnHandler: function TurnHandler(_turn) {
    var _this2 = this;

    this.UpdateVisualData();
    console.error("Turn: " + _turn);
    var _playerMatched = false;
    _skipNextTurn = false;

    if (IsTweening) //check if animation of turn being played on other players 
      {
        if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == true) {
          IsTweening = false;
        }

        console.log("here");
        setTimeout(function () {
          _this2.TurnHandler(_turn);
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
        console.log(this.PlayerGameInfo[this.TurnNumber].IsBot);
        console.log(this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn);
        console.log(userGameOver);

        if (this.PlayerGameInfo[this.TurnNumber].IsBot == false) {
          _playerMatched = true;
          _skipNextTurn = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn;

          if (!userGameOver) {
            this.ToggleTurnProgress(true);

            if (!_skipNextTurn) {
              setTimeout(function () {
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);
                GamePlayReferenceManager.Instance.Get_GameplayUIManager().ResetTurnVariable();
              }, 1000);
              console.log("its your turn " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
            }
          }
        } else //turn decisions for bot
          {
            _playerMatched = true;
            _skipNextTurn = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn;

            if (!BotGameOver) {
              this.ToggleTurnProgress(false);

              if (!_skipNextTurn) {
                setTimeout(function () {
                  _this2.RollDice();
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

      if (this.SelectedMode == 2) //for real players
        {
          GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("TurnNumber", this.TurnNumber, true);
          console.log("Turn Of: " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
          console.log(this.AllPlayerUI[this.TurnNumber].getComponent('PlayerProfileManager').PlayerInfo);
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
      }

      if (_playerMatched && this.PlayerGameInfo[this.TurnNumber].isGameFinished) {
        setTimeout(function () {
          IsTweening = false;

          _this2.ChangeTurn();

          _this2.ToggleTurnProgress(false);
        }, 500);
      }
    }
  },
  SyncDataToPlayerGameInfo: function SyncDataToPlayerGameInfo(_ind) {
    var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();
    var MyData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
    var _counter = _ind;
    console.log(this.PlayerGameInfo[_counter].PlayerUID);
    console.log(MyData.customProperties.PlayerSessionData.PlayerUID); //if(this.PlayerGameInfo[_counter].PlayerUID!=MyData.customProperties.PlayerSessionData.PlayerUID) //dont update my own data
    // {

    for (var index = 0; index < MainSessionData.length; index++) {
      if (this.PlayerGameInfo[_counter].PlayerUID == MainSessionData[index].customProperties.PlayerSessionData.PlayerUID) {
        this.PlayerGameInfo[_counter] = MainSessionData[index].customProperties.PlayerSessionData;

        if (_counter < this.PlayerGameInfo.length - 1) {
          _counter++;
          console.log("adding counter: " + _counter);
          this.SyncDataToPlayerGameInfo(_counter);
        } else {
          console.log(this.PlayerGameInfo);
        }
      }
    } //}
    // else
    // {
    //     if(_counter<this.PlayerGameInfo.length-1)
    //         {
    //             _counter++;
    //             console.log("adding counter: "+_counter);
    //             this.SyncDataToPlayerGameInfo(_counter);
    //         }
    //     else{
    //             console.log(this.PlayerGameInfo);
    //         }
    // }

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

    if (this.SelectedMode == 2) //for real players
      {
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

    if (this.SelectedMode == 2) //for real players
      {
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

    if (this.SelectedMode == 1) //for bot
      {
        if (!_isBankrupted) {
          var _randomIndex = this.getRandom(0, this.BotGameInfo.length);

          this.PlayerGameInfo.push(this.BotGameInfo[_randomIndex]);
          GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = 2;
        }
      }

    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
      this.AllPlayerUI[index].active = true;
      this.AllPlayerUI[index].getComponent('PlayerProfileManager').PlayerInfo = this.PlayerGameInfo[index];
      this.AllPlayerUI[index].getComponent('PlayerProfileManager').SetName(this.PlayerGameInfo[index].PlayerName);
      this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
    }
  },
  UpdateGameUI: function UpdateGameUI(_toggleHighlight, _index) {
    if (_toggleHighlight) {
      this.AllPlayerUI[_index].getComponent('PlayerProfileManager').PlayerInfo = this.PlayerGameInfo[_index];

      for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
        if (_index == index) {
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleBGHighlighter(true);
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleTextighlighter(true);
          this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
        } else {
          this.AllPlayerUI[index].getComponent("PlayerProfileManager").RefreshDataAutomatically();
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleBGHighlighter(false);
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleTextighlighter(false);
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

    if (this.SelectedMode == 2) //for real players
      {
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

    for (var _index4 = 0; _index4 < this.AllPlayerUI.length; _index4++) {
      if (this.TurnNumber == _index4) {
        this.AllPlayerUI[_index4].getComponent("PlayerProfileManager").DiceRollScreen.active = true;

        this.AllPlayerUI[_index4].getComponent("PlayerProfileManager").DiceRollScreen.getComponent("DiceController").AnimateDice(_dice1, _dice2);

        this.AllPlayerUI[_index4].getComponent("PlayerProfileManager").RefreshDataAutomatically();
      } else {
        this.AllPlayerUI[_index4].getComponent("PlayerProfileManager").DiceRollScreen.active = false;

        this.AllPlayerUI[_index4].getComponent("PlayerProfileManager").RefreshDataAutomatically();
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
      var dicetobe = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[tempcounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType);
      console.error("to be: " + dicetobe);
    } else {
      tempcounter = tempcounter2 + _rolling;
      var dicetobe = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[tempcounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType);
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
        var _spaceID = parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType);

        this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = RollCounter;

        if (_spaceID != 6 && _spaceID != 7) //6 means payday and 7 means double payday, 9 menas sell space
          {
            var RandomCard = this.getRandom(0, 15); //for testing only

            if (_spaceID == 2) //landed on some big business
              {
                var valueIndex = [0, 1, 7, 10, 2, 3, 4, 5, 6, 8];
                var index = this.getRandom(0, 10);
                RandomCard = valueIndex[index]; //RandomCard = 1;
              } else if (_spaceID == 5) //landed on some losses cards
              {
                var valueIndex = [0, 1, 5, 6, 2, 7, 3, 4, 8, 9];
                var index = this.getRandom(0, 10);
                RandomCard = valueIndex[index]; //RandomCard = 9;
              } else if (_spaceID == 3) //landed on some marketing cards
              {
                var valueIndex = [0, 7, 3, 8, 13, 9, 1, 2, 4, 5];
                var index = this.getRandom(0, 10);
                RandomCard = valueIndex[index]; //RandomCard = 5;
              } else if (_spaceID == 1) //landed on some wild cards
              {
                var valueIndex = [0, 1, 6, 10, 2, 3, 4];
                var index = this.getRandom(0, 7);
                RandomCard = valueIndex[index]; //RandomCard = 4;
              }

            IsTweening = false;
            console.error(_spaceID);

            if (this.SelectedMode == 2) //for real player
              {
                if (_spaceID == 12) // if player landed on finish space
                  {
                    RollCounter = RollCounter + 5;
                    this.StartDiceRoll();
                  } else {
                  if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
                    var SendingData = {
                      "randomCard": RandomCard,
                      "counter": RollCounter
                    };
                    this.RaiseEventForCard(SendingData);
                  } else {
                    this.DisplayCardOnOthers();
                  }
                }
              } else if (this.SelectedMode == 1) //for bot
              {
                if (_spaceID == 12) // if player landed on finish space
                  {
                    RollCounter = RollCounter + 5;
                    this.StartDiceRoll();
                  } else {
                  var SendingData = {
                    "randomCard": RandomCard,
                    "counter": RollCounter
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
            if (this.PlayerGameInfo[this.TurnNumber].isGameFinished) this.completeCardTurn();
          }
        }
      }
    } else {
      this.AllPlayersGameCompleted();
    }
  },
  completeCardTurn: function completeCardTurn() {
    IsTweening = false;
    console.log("landed on pay day or double pay day and work is done so changing turn");
    this.RaiseEventTurnComplete();
  },
  CallGameComplete: function CallGameComplete(_isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    if (_isBot == false) {
      if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
        var _playerIndex = this.TurnNumber;

        if (this.PlayerGameInfo[_playerIndex].isGameFinished == false) {
          this.PlayerGameInfo[_playerIndex].isGameFinished = true;
          var _cash = this.PlayerGameInfo[this.TurnNumber].Cash;

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
          GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", this.PlayerGameInfo[this.TurnNumber]);
        }
      }
    } else {
      var _playerIndex = this.TurnNumber;

      if (this.PlayerGameInfo[_playerIndex].isGameFinished == false) {
        this.PlayerGameInfo[_playerIndex].isGameFinished = true;
        var _cash = this.PlayerGameInfo[this.TurnNumber].Cash;
        var HMAmount = this.PlayerGameInfo[_playerIndex].HomeBasedAmount;
        var BMAmount = this.PlayerGameInfo[_playerIndex].BrickAndMortarAmount;
        var BMLocations = this.PlayerGameInfo[_playerIndex].TotalLocationsAmount;
        var loanAmount = 0;

        for (var _index5 = 0; _index5 < this.PlayerGameInfo[_playerIndex].NoOfBusiness.length; _index5++) {
          if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_index5].LoanTaken) {
            loanAmount += GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_index5].LoanAmount;
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
      }
    }
  },
  RaiseEventForGameComplete: function RaiseEventForGameComplete(_data) {
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(6, _data);
  },
  SyncGameOver: function SyncGameOver(_UID) {
    var infoText = "";
    var statusText = "";

    if (this.SelectedMode == 2) //for real players
      {
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
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText); // GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
          //     "Highest Cash: " + MainSessionData[_index].customProperties.PlayerSessionData.TotalScore + "\n" + '\n' +
          //     "Game won by "+  MainSessionData[_index].customProperties.PlayerSessionData.PlayerName+ "\n" + '\n' + "\n" +
          //     "Game will be restarted automatcally after 15 seconds",
          //     15000, false
          // );
          // setTimeout(() => {
          //     GamePlayReferenceManager.Instance.Get_MultiplayerController().RestartGame();
          // }, 15060);
        } else {
          if (MyData.customProperties.PlayerSessionData.PlayerUID == _UID) {
            //you won
            statusText = "Congrats! you have won the game.";
            infoText = "Current Cash : $" + MyData.customProperties.PlayerSessionData.Cash + "\n" + "Home Based Businesses Value : $" + MyData.customProperties.PlayerSessionData.TotalHBCash + "\n" + "Brick And Mortar Businesses Value : $" + MyData.customProperties.PlayerSessionData.TotalBMCash + "\n" + "Gold Value : $" + MyData.customProperties.PlayerSessionData.TotalGoldCash + "\n" + "Stocks Value : $" + MyData.customProperties.PlayerSessionData.TotalStocksCash + "\n" + "Loan Balance : $" + MyData.customProperties.PlayerSessionData.TotalLoanBalance + "\n" + "Total Cash Earned : $" + MyData.customProperties.PlayerSessionData.TotalScore + "\n";
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText); // GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
            //     "Total Cash: " + MyData.customProperties.PlayerSessionData.TotalScore + "\n" + '\n' +
            //     "Congrats! your cash is highest, you have won the game." + "\n" + '\n' + "\n" +
            //     "Game will be restarted automatcally after 15 seconds",
            //     15000, false
            // );
          } else {
            //you lose
            statusText = "Unfortunately! you have lost the game.";
            infoText = "Current Cash : $" + MyData.customProperties.PlayerSessionData.Cash + "\n" + "Home Based Businesses Value : $" + MyData.customProperties.PlayerSessionData.TotalHBCash + "\n" + "Brick And Mortar Businesses Value : $" + MyData.customProperties.PlayerSessionData.TotalBMCash + "\n" + "Gold Value : $" + MyData.customProperties.PlayerSessionData.TotalGoldCash + "\n" + "Stocks Value : $" + MyData.customProperties.PlayerSessionData.TotalStocksCash + "\n" + "Loan Balance : $" + MyData.customProperties.PlayerSessionData.TotalLoanBalance + "\n" + "Total Cash Earned : $" + MyData.customProperties.PlayerSessionData.TotalScore + "\n";
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText); // GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
            //     "Total Cash: " + MyData.customProperties.PlayerSessionData.TotalScore + "\n" + '\n' +
            //     "unfortunately you have lost the game." + "\n" + '\n' + "\n" +
            //     "Game will be restarted automatcally after 15 seconds",
            //     15000, false
            // );
          } // setTimeout(() => {
          //     GamePlayReferenceManager.Instance.Get_MultiplayerController().RestartGame();
          // }, 15060);

        }
      } else if (this.SelectedMode == 1) //with bot
      {
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
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText); // GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
          //     "Total Cash: "+MyData.TotalScore+"\n"+'\n'+
          //     "Congrats! your cash is highest, you have won the game."+"\n"+'\n'+"\n"+
          //     "Game will be restarted automatcally after 15 seconds",
          //     15000,false
          // );
        } else {
          //you lose
          statusText = "Unfortunately! you have lost the game.";
          infoText = "Current Cash : $" + MyData.Cash + "\n" + "Home Based Businesses Value : $" + MyData.TotalHBCash + "\n" + "Brick And Mortar Businesses Value : $" + MyData.TotalBMCash + "\n" + "Gold Value : $" + MyData.TotalGoldCash + "\n" + "Stocks Value : $" + MyData.TotalStocksCash + "\n" + "Loan Balance : $" + MyData.TotalLoanBalance + "\n" + "Total Cash Earned : $" + MyData.TotalScore + "\n" + "Other Player Earned Cash : $" + this.PlayerGameInfo[1].TotalScore + "\n";
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowResultScreen(statusText, infoText); // GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast(
          //     "Total Cash: "+MyData.TotalScore+"\n"+'\n'+
          //     "unfortunately you have lost the game."+"\n"+'\n'+"\n"+
          //     "Game will be restarted automatcally after 15 seconds",
          //     15000,false
          // );
        } // setTimeout(() => {
        //     GamePlayReferenceManager.Instance.Get_MultiplayerController().RestartGame();
        // }, 15060);

      }
  },
  AllPlayersGameCompleted: function AllPlayersGameCompleted() {
    var max = 0;
    var SelectedInd = 0;
    var SessionData = this.PlayerGameInfo;

    for (var index = 0; index < SessionData.length; index++) {
      var _value = SessionData[index].TotalScore;

      if (_value > max) {
        SelectedInd = index;
        max = _value;
      }
    }

    for (var _index6 = 0; _index6 < SessionData.length; _index6++) {
      var _value = SessionData[_index6].TotalScore;
      console.log(_value);
    }

    console.log("game won by player id: " + SessionData[SelectedInd].PlayerUID);
    this.RaiseEventForGameComplete(SessionData[SelectedInd].PlayerUID);
  },
  StartDiceRoll: function StartDiceRoll() {
    var _this3 = this;

    if (RollCounter >= GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
      console.log("Gameover");
      this.ZoomCameraOut();
      setTimeout(function () {
        if (_this3.SelectedMode == 2) //for real players
          {
            if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
              _this3.CallGameComplete();

              var playercompleted = 0;
              var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();

              for (var index = 0; index < MainSessionData.length; index++) {
                if (MainSessionData[index].customProperties.PlayerSessionData.isGameFinished) {
                  playercompleted++;
                }
              }

              if (playercompleted == _this3.PlayerGameInfo.length) //game completed on all system
                {
                  isGameOver = true;

                  if (!PassedPayDay && !DoublePayDay) {
                    _this3.AllPlayersGameCompleted();
                  }
                } else {
                if (!isGameOver) {
                  if (!PassedPayDay && !DoublePayDay) {
                    IsTweening = false;

                    _this3.completeCardTurn();
                  }
                }
              }
            }
          } else if (_this3.SelectedMode == 1) //for bot
          {
            if (_this3.PlayerGameInfo[_this3.TurnNumber].IsBot) BotGameOver = true;else userGameOver = true;
            console.log("usergameover: " + userGameOver);
            console.log("botgameover: " + BotGameOver);

            _this3.CallGameComplete(true);

            var playercompleted = 0;
            var MainSessionData = _this3.PlayerGameInfo;

            for (var _index7 = 0; _index7 < MainSessionData.length; _index7++) {
              if (MainSessionData[_index7].isGameFinished) playercompleted++;
            }

            if (playercompleted == _this3.PlayerGameInfo.length) //gamecompleted on all systems
              {
                BotGameOver = true;
                userGameOver = true;
                isGameOver = true;

                if (!PassedPayDay && !DoublePayDay) {
                  _this3.AllPlayersGameCompleted();
                }
              } else {
              if (!isGameOver) {
                if (!PassedPayDay && !DoublePayDay) {
                  IsTweening = false;

                  _this3.completeCardTurn();
                }
              }
            }
          }
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
    var _this4 = this;

    cc.tween(this.CameraNode).to(time, {
      position: cc.v2(_pos.x, _pos.y)
    }, {
      easing: "quadInOut"
    }).call(function () {
      if (isZoom) _this4.ZoomCameraIn();else _this4.ZoomCameraOut();
    }).start();
  },
  ZoomCameraIn: function ZoomCameraIn() {
    var _this5 = this;

    setTimeout(function () {
      if (_this5.Camera.zoomRatio < 2) {
        _this5.Camera.zoomRatio = _this5.Camera.zoomRatio + 0.03;

        _this5.ZoomCameraIn();
      } else {
        _this5.Camera.zoomRatio = 2;
        _this5.isCameraZooming = true;

        _this5.StartDiceRoll();
      }
    }, 10);
  },
  CheckPayDayConditions: function CheckPayDayConditions(_isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    if (RollCounter < GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
      if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) {
        PassedPayDay = true;
        PassedPayDayCounter = PassedPayDayCounter + 1;
        console.error(PassedPayDayCounter);
      }

      if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 7) {
        DoublePayDay = true;
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
  ZoomCameraOut: function ZoomCameraOut() {
    var _this6 = this;

    setTimeout(function () {
      if (_this6.Camera.zoomRatio >= 1) {
        _this6.isCameraZooming = false;
        _this6.Camera.zoomRatio = _this6.Camera.zoomRatio - 0.03;

        _this6.ZoomCameraOut();
      } else {
        _this6.CameraNode.position = cc.Vec2(0, 0);
        _this6.Camera.zoomRatio = 1;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().PrintDiceValue_TurnDecision(0);

        if (_this6.SelectedMode == 1) {
          if (_this6.PlayerGameInfo[_this6.TurnNumber].IsBot && !BotGameOver) {
            _this6.CheckPayDayConditions(_this6.PlayerGameInfo[_this6.TurnNumber].IsBot);
          } else {
            if (!_this6.PlayerGameInfo[_this6.TurnNumber].IsBot && !userGameOver) {
              _this6.CheckPayDayConditions(_this6.PlayerGameInfo[_this6.TurnNumber].IsBot);
            }
          }
        }

        if (_this6.SelectedMode == 2) //real player
          {
            if (_this6.PlayerGameInfo[_this6.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) _this6.CheckPayDayConditions();else _this6.callUponCard();
          }
      }
    }, 10);
  },
  TweenPlayer: function TweenPlayer(Node, ToPos) {
    var _this7 = this;

    cc.tween(Node) //0.4
    .to(0.4, {
      position: cc.v2(ToPos.x, ToPos.y)
    }, {
      easing: "quadInOut"
    }).call(function () {
      if (DiceTemp < DiceRoll) {
        console.log(DiceTemp + " " + RollCounter);

        if (_this7.SelectedMode == 1) //for bot
          {
            if (_this7.PlayerGameInfo[_this7.TurnNumber].IsBot) {
              if (!BotGameOver) {
                if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6 || parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 7) {
                  PassedPayDay = true;
                  PassedPayDayCounter++;
                }
              } else {
                console.log("bot game is over");
              }
            } else {
              if (!userGameOver) {
                if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6 || parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 7) {
                  PassedPayDay = true;
                  PassedPayDayCounter++;
                } /// console.error(PassedPayDayCounter);

              } else {
                console.log("user game is over skipping");
              }
            } // console.log(PassedPayDay);

          }

        if (_this7.SelectedMode == 2) {
          if (_this7.PlayerGameInfo[_this7.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
            if (!_this7.PlayerGameInfo[_this7.TurnNumber].isGameFinished) {
              if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6 || parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 7) {
                PassedPayDay = true;
                PassedPayDayCounter++;
              }
            } else {
              console.log("Game finished for: " + _this7.PlayerGameInfo[_this7.TurnNumber].PlayerName);
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

        _this7.StartDiceRoll(); //this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter=RollCounter;

      } else {
        var _newpos = cc.Vec2(0, 0);

        _this7.TweenCamera(_newpos, false, 0.6); //zoomout

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
      if (parseInt(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[i].BusinessType) == 2) //this means there is brick and mortar in list
        {
          var node = cc.instantiate(GamePlayReferenceManager.Instance.Get_GameplayUIManager().TurnDecisionSetupUI.ExpandBusinessPrefab);
          node.parent = GamePlayReferenceManager.Instance.Get_GameplayUIManager().TurnDecisionSetupUI.ExpandBusinessScrollContent;
          node.getComponent('ExpandBusinessHandler').SetBusinessIndex(i);
          node.getComponent('ExpandBusinessHandler').SetName(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[i].BusinessName);
          node.getComponent('ExpandBusinessHandler').SetCardFunctionality(_isCardFunctionality);
          node.getComponent('ExpandBusinessHandler').SetGivenCash(_GivenCash);
          node.getComponent('ExpandBusinessHandler').SetStartAnyBusinessWithoutCash(_StartAnyBusinessWithoutCash);
          node.getComponent('ExpandBusinessHandler').ResetEditBox();
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
    var _this8 = this;

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
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title, false, false, false, _isBot, _forSelectedBusiness, _SelectedBusinessIndex, HBAmount, BMAmount, BMLocations, 1);
    } else {
      _skipNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextPayday;
      _skipHMNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipHMNextPayday;
      _skipBMNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipBMNextPayday;

      if (_skipNextPayday) //if previously skip payday was stored by any card
        {
          this.ToggleSkipPayDay_Whole(false);

          if (!_isBot) {
            GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Skipping PayDay.", 1600);
            setTimeout(function () {
              _this8.callUponCard();
            }, 1650);
          } else {
            console.log("Skipping PayDay.");
            setTimeout(function () {
              _this8.callUponCard();
            }, 800);
          }
        } else {
        var _title = "";
        if (_isDoublePayDay) _title = "DoublePayDay";else _title = "PayDay";
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title, _isDoublePayDay, _skipHMNextPayday, _skipBMNextPayday, _isBot, false, 0, 0, 0, 0, PassedPayDayCounter);
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

    if (this.SelectedMode == 2) //for real players
      {
        _roomData = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();
        _myData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
      } else if (this.SelectedMode == 1) //for bot
      {
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
    var _this9 = this;

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

        if (_questionIndex == 1) //have you skipped loan previous payday?
          {
            if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.SkippedLoanPayment) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered to have skipped loan payement in previous payday", 2100);
            } else {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered not to have skipped loan payement in previous payday", 2100);
            }
          } else if (_questionIndex == 2) //Have you taken any loan?
          {
            var _loanTaken = false;

            for (var _index8 = 0; _index8 < _actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.NoOfBusiness.length; _index8++) {
              if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.NoOfBusiness[_index8].LoanTaken) {
                _loanTaken = true;
                break;
              }
            }

            if (_loanTaken) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered to have taken some loan", 2100);
            } else {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered not to have taken any loan", 2100);
            }
          } else if (_questionIndex == 3) //Are you bankrupted? if more than once, tell me the amount?
          {
            if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.IsBankrupt) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered to have been bankrupted " + _actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.BankruptAmount + " time/es.", 2100);
            } else {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered not to have been bankrupted", 2100);
            }
          } else if (_questionIndex == 4) //Is your turn going to be skipped next time?
          {
            if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.CardFunctionality.SkipNextTurn) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered, next turn will be skipped.", 2100);
            } else {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered, next turn will not be skipped.", 2100);
            }
          } else if (_questionIndex == 5) //Is it going to be double pay day your next payday?
          {
            if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.CardFunctionality.NextTurnDoublePay) {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered, next payday will be double payday", 2100);
            } else {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered, next payday will not be double payday", 2100);
            }
          }

        setTimeout(function () {
          _gameplayUIManager.ToggleSpaceScreen_OneQuestionSetupUI(false);

          _this9.completeCardTurn();
        }, 2150);
      }
    }
  },
  ReceiveGoBackSpacesData_spaceFunctionality: function ReceiveGoBackSpacesData_spaceFunctionality(_data) {
    var _this10 = this;

    if (IsTweening == true) {
      setTimeout(function () {
        _this10.ReceiveGoBackSpacesData_spaceFunctionality(_data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJQcmV2aW91c0RpY2VSb2xsMyIsIlByZXZpb3VzRGljZVJvbGw0IiwiUHJldmlvdXNEaWNlUm9sbDUiLCJ1c2VyR2FtZU92ZXIiLCJCb3RHYW1lT3ZlciIsIlRvdGFsQ291bnRlclJlYWNoZWQiLCJQYXNzZWRQYXlEYXlDb3VudGVyIiwiRW51bUJ1c2luZXNzVHlwZSIsImNjIiwiRW51bSIsIk5vbmUiLCJIb21lQmFzZWQiLCJicmlja0FuZG1vcnRhciIsIkJ1c2luZXNzSW5mbyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJOYW1lIiwiQnVzaW5lc3NUeXBlIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uIiwiVGV4dCIsIkJ1c2luZXNzTmFtZSIsIkFtb3VudCIsIkludGVnZXIiLCJJc1BhcnRuZXJzaGlwIiwidHlwdyIsIkJvb2xlYW4iLCJQYXJ0bmVySUQiLCJQYXJ0bmVyTmFtZSIsIkxvY2F0aW9uc05hbWUiLCJMb2FuVGFrZW4iLCJMb2FuQW1vdW50IiwiY3RvciIsIkNhcmREYXRhRnVuY3Rpb25hbGl0eSIsIk5leHRUdXJuRG91YmxlUGF5IiwiU2tpcE5leHRUdXJuIiwiU2tpcE5leHRQYXlkYXkiLCJTa2lwSE1OZXh0UGF5ZGF5IiwiU2tpcEJNTmV4dFBheWRheSIsIlN0b2NrSW5mbyIsIlNoYXJlQW1vdW50IiwiUGxheWVyRGF0YSIsIlBsYXllck5hbWUiLCJQbGF5ZXJVSUQiLCJBdmF0YXJJRCIsIklzQm90IiwiTm9PZkJ1c2luZXNzIiwiQ2FyZEZ1bmN0aW9uYWxpdHkiLCJIb21lQmFzZWRBbW91bnQiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiTm9PZlN0b2NrcyIsIkNhc2giLCJHb2xkQ291bnQiLCJTdG9ja0NvdW50IiwiTWFya2V0aW5nQW1vdW50IiwiTGF3eWVyU3RhdHVzIiwiSXNCYW5rcnVwdCIsIkJhbmtydXB0QW1vdW50IiwiU2tpcHBlZExvYW5QYXltZW50IiwiUGxheWVyUm9sbENvdW50ZXIiLCJJbml0aWFsQ291bnRlckFzc2lnbmVkIiwiaXNHYW1lRmluaXNoZWQiLCJUb3RhbFNjb3JlIiwiVG90YWxIQkNhc2giLCJUb3RhbEJNQ2FzaCIsIlRvdGFsR29sZENhc2giLCJUb3RhbExvYW5CYWxhbmNlIiwiVG90YWxTdG9ja3NDYXNoIiwiR2FtZU92ZXIiLCJSb2xsQ291bnRlciIsIkRpY2VUZW1wIiwiRGljZVJvbGwiLCJJc1R3ZWVuaW5nIiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHVybkNoZWNrQXJyYXkiLCJCdXNpbmVzc0xvY2F0aW9uTm9kZXMiLCJQYXNzZWRQYXlEYXkiLCJEb3VibGVQYXlEYXkiLCJfbmV4dFR1cm5Eb3VibGVQYXkiLCJfc2tpcE5leHRUdXJuIiwiX3NraXBOZXh0UGF5ZGF5IiwiX3NraXBITU5leHRQYXlkYXkiLCJfc2tpcEJNTmV4dFBheWRheSIsIkNhcmRFdmVudFJlY2VpdmVkIiwiVHVybkluUHJvZ3Jlc3MiLCJCYWNrc3BhY2VzIiwiaXNHYW1lT3ZlciIsIk9uZVF1ZXN0aW9uSW5kZXgiLCJPbmVRdWVzdGlvbnMiLCJDYXJkRGlzcGxheVNldFRpbW91dCIsIkdhbWVNYW5hZ2VyIiwiQ29tcG9uZW50IiwiUGxheWVyR2FtZUluZm8iLCJCb3RHYW1lSW5mbyIsIlBsYXllck5vZGUiLCJOb2RlIiwiQ2FtZXJhTm9kZSIsIkFsbFBsYXllclVJIiwiQWxsUGxheWVyTm9kZXMiLCJTdGFydExvY2F0aW9uTm9kZXMiLCJTZWxlY3RlZE1vZGUiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJSZXNldEFsbFZhcmlhYmxlcyIsIklucHV0VGVzdERpY2UxIiwiX3ZhbCIsIklucHV0VGVzdERpY2UyIiwib25Mb2FkIiwiVHVybk51bWJlciIsIlR1cm5Db21wbGV0ZWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiSW5pdF9HYW1lTWFuYWdlciIsIlJhbmRvbUNhcmRJbmRleCIsIkNhcmRDb3VudGVyIiwiQ2FyZERpc3BsYXllZCIsInJlcXVpcmUiLCJDYW1lcmEiLCJnZXRDb21wb25lbnQiLCJpc0NhbWVyYVpvb21pbmciLCJjb25zb2xlIiwiZXJyb3IiLCJDaGVja1NwZWN0YXRlIiwibG9nIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkiLCJBbGxEYXRhIiwiTWF4UGxheWVycyIsImxlbmd0aCIsIlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlciIsIlVwZGF0ZUdhbWVVSSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiR2V0VHVybk51bWJlciIsIkdldE15SW5kZXgiLCJteUluZGV4IiwiX2FjdG9yIiwiUGhvdG9uQWN0b3IiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJfYWxsQWN0b3JzIiwiaW5kZXgiLCJTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8iLCJBc3NpZ25QbGF5ZXJHYW1lVUkiLCJFbmFibGVQbGF5ZXJOb2RlcyIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJfdG9Qb3MiLCJWZWMyIiwiR2V0X1NwYWNlTWFuYWdlciIsIkRhdGEiLCJSZWZlcmVuY2VMb2NhdGlvbiIsInBvc2l0aW9uIiwieCIsInkiLCJzZXRQb3NpdGlvbiIsIl9sYXN0SW5kZXgiLCJhY3RpdmUiLCJDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyIiwiVG90YWxDb25uZWN0ZWRQbGF5ZXJzIiwibXlSb29tQWN0b3JDb3VudCIsInVzZXJJRCIsInNldEN1c3RvbVByb3BlcnR5IiwiQ2hhbmdlVHVybiIsIlJhaXNlRXZlbnRGb3JDYXJkIiwiX2RhdGEiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiRGlzcGxheUNhcmRPbk90aGVycyIsIk9uTGFuZGVkT25TcGFjZSIsInNldFRpbWVvdXQiLCJSZXNldENhcmREaXNwbGF5IiwiUmVjZWl2ZUV2ZW50Rm9yQ2FyZCIsIlJhbmRvbUNhcmQiLCJyYW5kb21DYXJkIiwiY291bnRlciIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJTeW5jQWxsRGF0YSIsIlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZSIsIl91aWQiLCJwdXNoIiwiQXJyYXlMZW5ndGgiLCJJREZvdW5kIiwiVXBkYXRlVmlzdWFsRGF0YSIsIlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSIsIlR1cm5IYW5kbGVyIiwiX3R1cm4iLCJfcGxheWVyTWF0Y2hlZCIsIlRvZ2dsZVR1cm5Qcm9ncmVzcyIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlJlc2V0VHVyblZhcmlhYmxlIiwiUm9sbERpY2UiLCJEaWNlUm9sbFNjcmVlbiIsIlBsYXllckluZm8iLCJSb29tQWN0b3JzIiwiU2hvd1RvYXN0IiwiVG9nZ2xlU2tpcE5leHRUdXJuIiwiX2luZCIsIk1haW5TZXNzaW9uRGF0YSIsIk15RGF0YSIsIl9jb3VudGVyIiwiU3RhcnRUdXJuIiwiUmVjZWl2ZUJhbmtydXB0RGF0YSIsIl9pc0JhbmtydXB0ZWQiLCJiYW5rcnVwdGVkIiwidHVybiIsIl9wbGF5ZXJEYXRhIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiX3JhbmRvbUluZGV4IiwiZ2V0UmFuZG9tIiwiU2V0TmFtZSIsIl90b2dnbGVIaWdobGlnaHQiLCJfaW5kZXgiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzIiwidGFyZ2V0UG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicGFyZW50IiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJyYXRpbyIsIndpblNpemUiLCJoZWlnaHQiLCJ6b29tUmF0aW8iLCJsYXRlVXBkYXRlIiwic3luY0RpY2VSb2xsIiwiX3JvbGwiLCJfZGljZTEiLCJkaWNlMSIsIl9kaWNlMiIsImRpY2UyIiwiX3Jlc3VsdCIsIm15Um9vbUFjdG9yc0FycmF5IiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwiQW5pbWF0ZURpY2UiLCJEaWNlRnVudGlvbmFsaXR5IiwiX3BvcyIsIlR3ZWVuQ2FtZXJhIiwiVGVtcENoZWNrU3BhY2UiLCJfcm9sbGluZyIsInRlbXBjb3VudGVyIiwidGVtcGNvdW50ZXIyIiwiZGljZXRvYmUiLCJwYXJzZUludCIsIlNwYWNlRGF0YSIsIlNwYWNlc1R5cGUiLCJEaWNlMSIsIkRpY2UyIiwiX25ld1JvbGwiLCJSb2xsT25lRGljZSIsIlJvbGxUd29EaWNlcyIsImNhbGxVcG9uQ2FyZCIsIl9zcGFjZUlEIiwidmFsdWVJbmRleCIsIlN0YXJ0RGljZVJvbGwiLCJTZW5kaW5nRGF0YSIsImlzQm90IiwiY29tcGxldGVDYXJkVHVybiIsIkFsbFBsYXllcnNHYW1lQ29tcGxldGVkIiwiQ2FsbEdhbWVDb21wbGV0ZSIsIl9pc0JvdCIsIl9wbGF5ZXJJbmRleCIsIl9jYXNoIiwiSE1BbW91bnQiLCJHZXRfR2FtZU1hbmFnZXIiLCJCTUFtb3VudCIsIkJNTG9jYXRpb25zIiwibG9hbkFtb3VudCIsIl9nb2xkIiwiX3N0b2NrcyIsIl9kaWNlUmFuZG9tIiwiT25jZU9yU2hhcmUiLCJHb2xkQ2FzaCIsIlN0b2NrQ2FzaCIsIkJNQ2FzaCIsIkhNQ2FzaCIsIlRvdGFsQXNzZXRzIiwiUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZSIsIlN5bmNHYW1lT3ZlciIsIl9VSUQiLCJpbmZvVGV4dCIsInN0YXR1c1RleHQiLCJEaXNjb25uZWN0RGF0YSIsIlNob3dSZXN1bHRTY3JlZW4iLCJtYXgiLCJTZWxlY3RlZEluZCIsIlNlc3Npb25EYXRhIiwiX3ZhbHVlIiwiWm9vbUNhbWVyYU91dCIsInBsYXllcmNvbXBsZXRlZCIsIlR3ZWVuUGxheWVyIiwibWluIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaXNab29tIiwidGltZSIsInR3ZWVuIiwidG8iLCJ2MiIsImVhc2luZyIsImNhbGwiLCJab29tQ2FtZXJhSW4iLCJzdGFydCIsIkNoZWNrUGF5RGF5Q29uZGl0aW9ucyIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIiwiVG9Qb3MiLCJfbmV3cG9zIiwiVG9nZ2xlUGF5RGF5IiwiX3N0MSIsIl9TdDIiLCJFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iLCJhbW91bnQiLCJfbG9jYXRpb25OYW1lIiwiX2lzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfR2l2ZW5DYXNoIiwiX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uIiwiR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbiIsImkiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQiLCJTZXRCdXNpbmVzc0luZGV4IiwiU2V0Q2FyZEZ1bmN0aW9uYWxpdHkiLCJTZXRHaXZlbkNhc2giLCJTZXRTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJSZXNldEVkaXRCb3giLCJEZXN0cm95R2VuZXJhdGVkTm9kZXMiLCJkZXN0cm95IiwiVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiX1NoYXJlQW1vdW50IiwiX2lzQWRkaW5nIiwiX3N0b2NrIiwiX2lzRG91YmxlUGF5RGF5IiwiX2ZvclNlbGVjdGVkQnVzaW5lc3MiLCJfU2VsZWN0ZWRCdXNpbmVzc0luZGV4IiwiSEJBbW91bnQiLCJfdGl0bGUiLCJBc3NpZ25EYXRhX1BheURheSIsIlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUiLCJCYW5rcnVwdF9UdXJuRGVjaXNpb24iLCJTZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiX2Ftb3VudCIsIl91SUQiLCJJRCIsIlJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJfaUQiLCJfbXlJbmRleCIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiX3N0YXRlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiUmV0dXJuVHVyblByb2dyZXNzIiwiTG9zZUFsbE1hcmtldGluZ01vbmV5IiwiX2xvc2VBbW91bnQiLCJNdWx0aXBseU1hcmtldGluZ01vbmV5IiwiX211bHRpcGxpZXIiLCJfYW1vdW50SW5jcmVhc2VkIiwiR2V0TWFya2V0aW5nTW9uZXkiLCJfcHJvZml0IiwiUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24iLCJfdXNlcklEIiwiVXNlcklEIiwiX3F1ZXN0aW9uSW5kZXgiLCJRdWVzdGlvbiIsIlVzZXJJbmRleCIsIl9nYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9xdWVzdGlvbkFza2VkIiwiU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbiIsIl9pc1R1cm5PdmVyIiwiX215RGF0YSIsIl9yb29tRGF0YSIsIlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJPbmVRdWVzdGlvbkRlY2lzaW9uX1BheUFtb3VudF9PbmVRdWVzdGlvbiIsIlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbiIsIk9uZVF1ZXN0aW9uRGVjaXNpb25fQW5zd2VyUXVlc3Rpb25fT25lUXVlc3Rpb24iLCJfaGFzRG9uZVBheW1lbnQiLCJfaGFzQW5zd2VyZWRRdWVzdGlvbiIsIl9Vc2VySUQiLCJQYXltZW50RG9uZSIsIlF1ZXN0aW9uQW5zd2VyZWQiLCJRdWVzdGlvbkluZGV4IiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9zZWxlY3RlZFBsYXllckluZGV4IiwiX2FjdG9yc0RhdGEiLCJfbG9hblRha2VuIiwiUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5IiwiX3NwYWNlcyIsImJhY2tzcGFjZXMiLCJDb3VudGVyIiwiVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzIiwic3BlZWQiLCJHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLEdBQUcsS0FBZDtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBRUEsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFFQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBRUEsSUFBSUMsWUFBWSxHQUFHLEtBQW5CO0FBQ0EsSUFBSUMsV0FBVyxHQUFH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QU0sR0FBQ25KLEVBQUUsQ0FBQ29KLElBQUgsQ0FBUTlFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NrRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEcEYsV0FBMUQsRUFBdUVxRixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHQyxDQUExRyxFQUE0R25GLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NrRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEcEYsV0FBMUQsRUFBdUVxRixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHRSxDQUE5TSxDQUFYOztBQUNBLFNBQUswUCx3QkFBTCxDQUE4QixLQUFLclQsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixDQUE5QixFQUFtRTBDLE1BQW5FO0FBQ0EsU0FBS21ILGdCQUFMO0FBQ0gsR0Evb0VvQixDQWtwRXJCO0FBQ0E7O0FBbnBFcUIsQ0FBVCxDQUFoQixFQXFwRUE7O0FBQ0FpSixNQUFNLENBQUNDLE9BQVAsR0FBa0JqVSxXQUFsQixFQUNBIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX2lzVGVzdCA9IGZhbHNlO1xyXG52YXIgX2RpY2VpbnB1dDEgPSBcIlwiO1xyXG52YXIgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDEgPSAtMTtcclxudmFyIFByZXZpb3VzRGljZVJvbGwyID0gLTE7XHJcblxyXG52YXIgUHJldmlvdXNEaWNlUm9sbDMgPSAtMTtcclxudmFyIFByZXZpb3VzRGljZVJvbGw0ID0gLTE7XHJcblxyXG52YXIgUHJldmlvdXNEaWNlUm9sbDUgPSAtMTtcclxuXHJcbnZhciB1c2VyR2FtZU92ZXIgPSBmYWxzZTtcclxudmFyIEJvdEdhbWVPdmVyID0gZmFsc2U7XHJcbnZhciBUb3RhbENvdW50ZXJSZWFjaGVkID0gZmFsc2U7XHJcbnZhciBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuLy8jcmVnaW9uIHN1cGVyY2xhc3NlcyBhbmQgZW51bWVyYXRpb25zXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciB0eXBlIG9mIGJ1c2luZXNzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBFbnVtQnVzaW5lc3NUeXBlID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBIb21lQmFzZWQ6IDEsICAgICAgICAgICAgICAgICAgIC8vYSBidXNpbmVzcyB0aGF0IHlvdSBvcGVyYXRlIG91dCBvZiB5b3VyIGhvbWVcclxuICAgIGJyaWNrQW5kbW9ydGFyOiAyICAgICAgICAgICAgICAgLy9hIHN0b3JlIGZyb250IGJ1c2luZXNzXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NJbmZvID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJCdXNpbmVzc0luZm9cIixcclxucHJvcGVydGllczogeyBcclxuICAgIE5hbWU6IFwiQnVzaW5lc3NEYXRhXCIsXHJcbiAgICBCdXNpbmVzc1R5cGU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTW9kZVwiLFxyXG4gICAgICAgdHlwZTogRW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgIGRlZmF1bHQ6IEVudW1CdXNpbmVzc1R5cGUuTm9uZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJCdXNpbmVzcyBjYXRvZ29yeSBmb3IgcGxheWVyc1wiLH0sIFxyXG4gICAgQnVzaW5lc3NUeXBlRGVzY3JpcHRpb246XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOiBcIlR5cGVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDogXCJUeXBlIChieSBuYW1lKSBvZiBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLH0sXHJcbiAgICBCdXNpbmVzc05hbWU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOiBcIk5hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDogXCJOYW1lIG9mIHRoZSBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLH0sXHJcbiAgICAgQW1vdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkFtb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImJhbGFuY2Ugb2YgYnVzaW5lc3NcIix9LFxyXG4gICAgICBJc1BhcnRuZXJzaGlwOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIklzUGFydG5lcnNoaXBcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXB3OmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBkb25lIHBhcnRuZXJzaGlwIHdpdGggc29tZW9uZSB3aXRoIGN1cnJlbnQgYnVzaW5lc3NcIix9LFxyXG4gICAgICAgUGFydG5lcklEOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJQYXJ0bmVySURcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIHRvb2x0aXA6IFwiSUQgb2YgdGhlIHBhcnRuZXIgd2l0aCB3aG9tIHBsYXllciBoYXMgZm9ybWVkIHBhcnRuZXJzaGlwXCIsfSxcclxuICAgICAgIFBhcnRuZXJOYW1lOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJQYXJ0bmVyTmFtZVwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgIHRvb2x0aXA6XCJuYW1lIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLH0sXHJcbiAgICAgICAgTG9jYXRpb25zTmFtZTpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9jYXRpb25zTmFtZVwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBbY2MuVGV4dF0sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgIHRvb2x0aXA6XCJpZiBwbGF5ZXIgb3ducyBicmljayBhbmQgbW9ydGFyIGhlL3NoZSBjYW4gZXhwYW5kIHRvIG5ldyBsb2NhdGlvblwiLH0sXHJcbiAgICAgICAgTG9hblRha2VuOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5BbW91bnRcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcblxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBDYXJkRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZERhdGFGdW5jdGlvbmFsaXR5ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHlcIixcclxucHJvcGVydGllczogeyBcclxuICAgIE5leHRUdXJuRG91YmxlUGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk5leHRUdXJuRG91YmxlUGF5XCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiBpdHMgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxuICAgIFNraXBOZXh0VHVybjpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwTmV4dFR1cm5cIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHR1cm4gaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHR1cm4gZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxuICAgIFNraXBOZXh0UGF5ZGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBOZXh0UGF5ZGF5XCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiBwYXlkYXkgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG4gICAgU2tpcEhNTmV4dFBheWRheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwSE1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGhvbWUgYmFzZWQgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LFxyXG4gICAgU2tpcEJNTmV4dFBheWRheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwQk1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGJyaWNrYSBhbmQgbW1vcnRhciBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdG9ja0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0b2NrSW5mbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiU3RvY2tJbmZvXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOYW1lOiBcIlN0b2NrRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzTmFtZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibmFtZSBvZiB0aGUgYnVzaW5lc3MgaW4gd2hpY2ggc3RvY2tzIHdpbGwgYmUgaGVsZFwiLH0sIFxyXG4gICAgU2hhcmVBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOiBcIlNoYXJlQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiU2hhcmUgYW1vdW50IG9mIHRoZSBzdG9ja1wiLH0sXHJcbn0sXHJcblxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciAgUGxheWVyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBsYXllckRhdGEgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUGxheWVyRGF0YVwiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgUGxheWVyTmFtZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJuYW1lIG9mIHRoZSBwbGF5ZXJcIix9LFxyXG4gICAgUGxheWVyVUlEOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllclVJRFwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiSUQgb2YgdGhlIHBsYXllclwiLH0sXHJcbiAgICBBdmF0YXJJRDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBdmF0YXJJRFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImlkIHJlZmVyZW5jZSBmb3IgcGxheWVyIGF2YXRhciBzZWxlY3Rpb25cIix9LFxyXG4gICAgSXNCb3Q6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNCb3RcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXB3OmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgY3VycmVudCBwbGF5ZXIgaXMgYm90XCIsfSwgXHJcbiAgICBOb09mQnVzaW5lc3M6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NcIixcclxuICAgICAgIHR5cGU6IFtCdXNpbmVzc0luZm9dLFxyXG4gICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiTnVtYmVyIG9mIGJ1c2luZXNzIGEgcGxheWVyIGNhbiBvd25cIix9LCBcclxuICAgIENhcmRGdW5jdGlvbmFsaXR5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkNhcmRGdW5jdGlvbmFsaXR5XCIsXHJcbiAgICAgICB0eXBlOiBDYXJkRGF0YUZ1bmN0aW9uYWxpdHksXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImNhcmQgZnVuY3Rpb25hbGl0eSBzdG9yZWQgYnkgcGxheWVyXCIsfSwgXHJcbiAgICBIb21lQmFzZWRBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJudW1iZXIgb2YgaG9tZSBiYXNlZCBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBCcmlja0FuZE1vcnRhckFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja0FuZE1vcnRhckFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibnVtYmVyIG9mIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLH0sIFxyXG4gICAgVG90YWxMb2NhdGlvbnNBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxMb2NhdGlvbnNBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm51bWJlciBvZiBsb2NhdGlvbnMgb2YgYWxsIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3Nlc3NcIix9LCBcclxuICAgIE5vT2ZTdG9ja3M6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU3RvY2tzXCIsXHJcbiAgICAgICB0eXBlOiBbU3RvY2tJbmZvXSxcclxuICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIk51bWJlciBvZiBzdG9jayBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBDYXNoOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgY2FzaCBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBHb2xkQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiR29sZENvdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiY291bnQgb2YgZ29sZCBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIFN0b2NrQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tDb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImNvdW50IG9mIHN0b2NrcyBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIExvYW5UYWtlbjpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyB0YWtlbiBsb2FuIGZyb20gYmFuayBvciBub3RcIix9LFxyXG4gICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBsb2FuIHRha2VuIGZyb20gdGhlIGJhbmtcIix9LFxyXG4gICAgTWFya2V0aW5nQW1vdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0Ftb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIm1hcmtldGluZyBhbW91bnQgYSBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBMYXd5ZXJTdGF0dXM6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTGF3eWVyU3RhdHVzXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgaGlyZWQgYSBsYXd5ZXIgb3Igbm90XCIsfSxcclxuICAgIElzQmFua3J1cHQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNCYW5rcnVwdFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGJlZW4gQmFua3J1cHRlZCBvciBub3RcIix9LFxyXG4gICAgQmFua3J1cHRBbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQmFua3J1cHRBbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGhvdyBtdWNoIHRpbWUgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcIix9LFxyXG4gICAgU2tpcHBlZExvYW5QYXltZW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBwZWRMb2FuUGF5bWVudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHNraXBwZWQgbG9hbiBwYXltZW50XCIsfSxcclxuICAgIFBsYXllclJvbGxDb3VudGVyOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclJvbGxDb3VudGVyXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciB0byBzdG9yZSByb2xsIGNvdW50b3IgZm9yIHBsYXllclwiLH0sXHJcbiAgICBJbml0aWFsQ291bnRlckFzc2lnbmVkOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkluaXRpYWxDb3VudGVyQXNzaWduZWRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgaXNHYW1lRmluaXNoZWQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcImlzR2FtZUZpbmlzaGVkXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICBUb3RhbFNjb3JlOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbFNjb3JlXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsSEJDYXNoOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbEhCQ2FzaFwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEJNQ2FzaDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxCTUNhc2hcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxHb2xkQ2FzaDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxHb2xkQ2FzaFwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbExvYW5CYWxhbmNlOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbExvYW5CYWxhbmNlXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsU3RvY2tzQ2FzaDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxTdG9ja3NDYXNoXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgR2FtZU92ZXI6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkdhbWVPdmVyXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxufSxcclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxuXHJcbn0pO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiBHYW1lIE1hbmFnZXIgQ2xhc3NcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKG1haW4gY2xhc3MpIGNsYXNzIGZvciBHYW1lIE1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvbGxDb3VudGVyPTA7XHJcbnZhciBEaWNlVGVtcD0wO1xyXG52YXIgRGljZVJvbGw9MDtcclxudmFyIElzVHdlZW5pbmc9ZmFsc2U7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFR1cm5DaGVja0FycmF5PVtdO1xyXG52YXIgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG5cclxudmFyIFBhc3NlZFBheURheT1mYWxzZTtcclxudmFyIERvdWJsZVBheURheT1mYWxzZTtcclxuXHJcbi8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG52YXIgX25leHRUdXJuRG91YmxlUGF5PWZhbHNlO1xyXG52YXIgX3NraXBOZXh0VHVybj1mYWxzZTtcclxudmFyIF9za2lwTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxudmFyIF9za2lwSE1OZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBfc2tpcEJNTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG52YXIgVHVybkluUHJvZ3Jlc3M9ZmFsc2U7XHJcblxyXG52YXIgQmFja3NwYWNlcz0zO1xyXG52YXIgaXNHYW1lT3Zlcj1mYWxzZTtcclxudmFyIE9uZVF1ZXN0aW9uSW5kZXg9LTE7XHJcbnZhciBPbmVRdWVzdGlvbnM9XHJcbltcclxuICAgIFwieW91IGhhdmUgc2tpcHBlZCBsb2FuIHByZXZpb3VzIHBheWRheT9cIixcclxuICAgIFwieW91IGhhdmUgdGFrZW4gYW55IGxvYW4/XCIsXHJcbiAgICBcInlvdSBoYXZlIGJhbmtydXB0ZWQgZXZlcj9cIixcclxuICAgIFwieW91ciBuZXh0IHR1cm4gaXMgZ29pbmcgdG8gYmUgc2tpcHBlZD9cIixcclxuICAgIFwieW91ciBuZXh0IHBheWRheSBpcyBnb2luZyB0byBiZSBkb3VibGUgcGF5ZGF5P1wiXHJcbl07XHJcblxyXG52YXIgQ2FyZERpc3BsYXlTZXRUaW1vdXQ9bnVsbDtcclxuXHJcbnZhciBHYW1lTWFuYWdlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiR2FtZU1hbmFnZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBQbGF5ZXJHYW1lSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBwbGF5ZXIncyBkYXRhXCJ9LFxyXG4gICAgICAgIEJvdEdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIGJvdCdzIGRhdGFcIn0sXHJcbiAgICAgICAgUGxheWVyTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgcGxheWVyXCIsfSwgICAgXHJcbiAgICAgICAgQ2FtZXJhTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgY2FtZXJhXCIsfSwgICAgXHJcbiAgICAgICAgQWxsUGxheWVyVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2YgdWkgb2YgYWxsIHBsYXllcnNcIix9LCAgICAgIFxyXG4gICAgICAgIEFsbFBsYXllck5vZGVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIG9mIG5vZGUgb2YgYWxsIHBsYXllcnMgaW5zaWRlIGdhbWVwbGF5XCIsfSwgICBcclxuICAgICAgICBTdGFydExvY2F0aW9uTm9kZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2YgYXR0YXkgb2YgbG9jYXRpb25zXCIsfSwgICBcclxuICAgICAgICAgU2VsZWN0ZWRNb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6MCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHJlZmVyZW5jZSBmb3IgZ2FtZSBtb2RlIDEgbWVhbnMgYm90IGFuZCAyIG1lYW5zIHJlYWwgcGxheWVyc1wiLFxyXG4gICAgICAgIH0sICBcclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIFBsYXllckRhdGE6IFBsYXllckRhdGEsXHJcbiAgICAgICAgQnVzaW5lc3NJbmZvOkJ1c2luZXNzSW5mbyxcclxuICAgICAgICBDYXJkRGF0YUZ1bmN0aW9uYWxpdHk6Q2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgICAgIEVudW1CdXNpbmVzc1R5cGU6RW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgICBJbnN0YW5jZTpudWxsXHJcbiAgICB9LFxyXG5cclxuICAgIFJlc2V0QWxsVmFyaWFibGVzKClcclxuICAgIHtcclxuICAgICAgICBfZGljZWlucHV0MSA9IFwiXCI7XHJcbiAgICAgICAgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG4gICAgICAgIFByZXZpb3VzRGljZVJvbGwxID0gLTE7XHJcbiAgICAgICAgUHJldmlvdXNEaWNlUm9sbDIgPSAtMTtcclxuXHJcbiAgICAgICAgUHJldmlvdXNEaWNlUm9sbDMgPSAtMTtcclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsNCA9IC0xO1xyXG5cclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsNSA9IC0xO1xyXG5cclxuICAgICAgICB1c2VyR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgICAgICBCb3RHYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxuICAgICAgICBSb2xsQ291bnRlcj0wO1xyXG4gICAgICAgIERpY2VUZW1wPTA7XHJcbiAgICAgICAgRGljZVJvbGw9MDtcclxuICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuXHJcbiAgICAgICAgUGFzc2VkUGF5RGF5PWZhbHNlO1xyXG4gICAgICAgIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG4gICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICAvL2NhcmRzIGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICBfbmV4dFR1cm5Eb3VibGVQYXk9ZmFsc2U7XHJcbiAgICAgICAgX3NraXBOZXh0VHVybj1mYWxzZTtcclxuICAgICAgICBfc2tpcE5leHRQYXlkYXk9ZmFsc2U7IC8vc2tpcCB3aG9sZSBwYXkgZGF5XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9ZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBob21lIGJhc2VkIGJ1c2luZXNzZXNzIG9ubHlcclxuICAgICAgICBfc2tpcEJNTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD1mYWxzZTtcclxuICAgICAgICBUdXJuSW5Qcm9ncmVzcz1mYWxzZTtcclxuXHJcbiAgICAgICAgQmFja3NwYWNlcz0zO1xyXG4gICAgICAgIGlzR2FtZU92ZXI9ZmFsc2U7XHJcbiAgICAgICAgT25lUXVlc3Rpb25JbmRleD0tMTtcclxuICAgICAgICBPbmVRdWVzdGlvbnM9XHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBcInlvdSBoYXZlIHNraXBwZWQgbG9hbiBwcmV2aW91cyBwYXlkYXk/XCIsXHJcbiAgICAgICAgICAgIFwieW91IGhhdmUgdGFrZW4gYW55IGxvYW4/XCIsXHJcbiAgICAgICAgICAgIFwieW91IGhhdmUgYmFua3J1cHRlZCBldmVyP1wiLFxyXG4gICAgICAgICAgICBcInlvdXIgbmV4dCB0dXJuIGlzIGdvaW5nIHRvIGJlIHNraXBwZWQ/XCIsXHJcbiAgICAgICAgICAgIFwieW91ciBuZXh0IHBheWRheSBpcyBnb2luZyB0byBiZSBkb3VibGUgcGF5ZGF5P1wiXHJcbiAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIENhcmREaXNwbGF5U2V0VGltb3V0PW51bGw7XHJcbiAgICAgICAgVG90YWxDb3VudGVyUmVhY2hlZCA9IGZhbHNlO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgSW5wdXRUZXN0RGljZTEoX3ZhbClcclxuICAgIHtcclxuICAgICAgICBpZiAoX2lzVGVzdCkge1xyXG4gICAgICAgICAgICBfZGljZWlucHV0MSA9IF92YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBJbnB1dFRlc3REaWNlMihfdmFsKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChfaXNUZXN0KSB7XHJcbiAgICAgICAgICAgIF9kaWNlaW5wdXQyID0gX3ZhbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8jcmVnaW9uIEFsbCBGdW5jdGlvbnMgb2YgR2FtZU1hbmFnZXJcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiBjbGFzcyBpcyBjcmVhdGVkXHJcbiAgICBAbWV0aG9kIG9uTG9hZFxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuUmVzZXRBbGxWYXJpYWJsZXMoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIHRoaXMuVHVybk51bWJlcj0wO1xyXG4gICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD1mYWxzZTtcclxuICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRNb2RlPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICAgICAgdGhpcy5Jbml0X0dhbWVNYW5hZ2VyKCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5SYW5kb21DYXJkSW5kZXg9MDtcclxuICAgICAgICB0aGlzLkNhcmRDb3VudGVyPTA7XHJcbiAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG4gICAgICAgIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcmVmZXJlbmNlIG9mIHJlcXVpcmVkIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGluaXRpYWwgZ2FtZW1hbmFnZXIgZXNzZXRpYWxzXHJcbiAgICBAbWV0aG9kIEluaXRfR2FtZU1hbmFnZXJcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEluaXRfR2FtZU1hbmFnZXIgKCkge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhPXRoaXMuQ2FtZXJhTm9kZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKTtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz1mYWxzZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvPVtdO1xyXG4gICAgICAgIFJvbGxDb3VudGVyPTA7XHJcbiAgICAgICAgRGljZVRlbXA9MDtcclxuICAgICAgICBEaWNlUm9sbD0wOyAgXHJcblxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKSAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9pZiBqb2luZWQgcGxheWVyIGlzIHNwZWN0YXRlXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpPT10cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1cyBvZiBpbml0aWFsIGJ1c2luZXNzIHNldHA6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIikpO1xyXG4gICAgICAgICAgICAgICAgLy9pZiBpbml0YWwgc2V0dXAgaGFzIGJlZW4gZG9uZSBhbmQgZ2FtZSBpcyB1bmRlciB3YXlcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIik9PXRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgQWxsRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1BbGxEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzPXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsZmFsc2UsdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgYm90IGFsb25nIHdpdGggb25lIHBsYXllclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLGZhbHNlLHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vI3JlZ2lvbiBwdWJsaWMgZnVuY3Rpb25zIHRvIGdldCBkYXRhIChhY2Nlc3NpYmxlIGZyb20gb3RoZXIgY2xhc3NlcylcclxuICAgIEdldFR1cm5OdW1iZXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlR1cm5OdW1iZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIEdldE15SW5kZXgoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBteUluZGV4ID0gMDtcclxuICAgICAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgdmFyIF9hbGxBY3RvcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FsbEFjdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfYWN0b3IuUGxheWVyVUlEID09IF9hbGxBY3RvcnNbaW5kZXhdLlBsYXllclVJRClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBteUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbXlJbmRleDtcclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24gU3BlY3RhdGVNb2RlIENvZGVcclxuXHJcbiAgICBTeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBBbGxEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKEFsbERhdGEpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm8gPSBBbGxEYXRhO1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlciA+IDAgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZD09dHJ1ZSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKF90b1Bvcy54LCBfdG9Qb3MueSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sYXN0SW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtfbGFzdEluZGV4XS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2xhc3RJbmRleF0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCwgX3RvUG9zLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInN5bmNlZCBwbGF5ZXJub2Rlc1wiKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKVxyXG4gICAge1xyXG4gICAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PVRvdGFsQ29ubmVjdGVkUGxheWVycylcclxuICAgICAge1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD10cnVlO1xyXG5cclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIGZ1bmN0aW9ucyByZWxhdGVkIHRvIFR1cm4gTWVjaGFuaXNtIGFuZCBjYXJkIG1lY2hhbmlzbVxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHdoYXQgY2FyZCBoYXMgYmVlbiBzZWxlY3RlZCBieSBwbGF5ZXJcclxuICAgIEBtZXRob2QgUmFpc2VFdmVudEZvckNhcmRcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSYWlzZUV2ZW50Rm9yQ2FyZChfZGF0YSlcclxuICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg1LF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBDbGVhckRpc3BsYXlUaW1lb3V0KClcclxuICB7XHJcbiAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gIH0sXHJcblxyXG4gIERpc3BsYXlDYXJkT25PdGhlcnMoKVxyXG4gIHtcclxuICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgICAgICAgaWYoQ2FyZEV2ZW50UmVjZWl2ZWQ9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuQ2FyZENvdW50ZXIpO1xyXG4gICAgICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD1mYWxzZTtcclxuICAgICAgICAgICAgaWYoIXRoaXMuQ2FyZERpc3BsYXllZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5DYXJkQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsdGhpcy5SYW5kb21DYXJkSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhcmREaXNwbGF5U2V0VGltb3V0PXNldFRpbWVvdXQoKCkgPT4geyAvL2NoZWNrIGFmdGVyIGV2ZXJ5IDAuNSBzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldENhcmREaXNwbGF5KClcclxuICB7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9ZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50Rm9yQ2FyZChfZGF0YSlcclxuICB7XHJcblxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuXHJcbiAgICB2YXIgUmFuZG9tQ2FyZD1fZGF0YS5yYW5kb21DYXJkO1xyXG4gICAgdmFyIGNvdW50ZXI9X2RhdGEuY291bnRlcjtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleD1SYW5kb21DYXJkO1xyXG4gICAgdGhpcy5DYXJkQ291bnRlcj1jb3VudGVyO1xyXG5cclxuICAgXHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuXHJcbiAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKHRydWUsUmFuZG9tQ2FyZCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD10cnVlO1xyXG4gICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90PT1mYWxzZSlcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKHRydWUsUmFuZG9tQ2FyZCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsUmFuZG9tQ2FyZCx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuXHJcbiAgICBcclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHBhcnRpY3VsYXIgcGxheWVyIGhhcyBjb21wbGV0ZSB0aGVpciBtb3ZlXHJcbiAgICBAbWV0aG9kIFJhaXNlRXZlbnRUdXJuQ29tcGxldGVcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSYWlzZUV2ZW50VHVybkNvbXBsZXRlKClcclxuICB7XHJcbiAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICAgIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZWFpc2VkIGZvciB0dXJuIGNvbXBsZXRlXCIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCx0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKTtcclxuICAgICAgfVxyXG4gIH0sXHJcblxyXG5cclxuICBTeW5jQWxsRGF0YSgpXHJcbiAge1xyXG4gICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgIH0gIFxyXG59LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBvbiBhbGwgcGxheWVycyB0byB2YWxpZGF0ZSBpZiBtb3ZlIGlzIGNvbXBsZXRlZCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHNcclxuICAgIEBtZXRob2QgUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlKF91aWQpXHJcbiAge1xyXG4gICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL3JlYWwgcGxheWVyc1xyXG4gICAgICB7XHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICAgICAgICAgIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7IFxyXG5cclxuICAgICAgICAgICAgdmFyIEFycmF5TGVuZ3RoPVR1cm5DaGVja0FycmF5Lmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIElERm91bmQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBcnJheUxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5W2luZGV4XT09X3VpZClcclxuICAgICAgICAgICAgICAgICAgICBJREZvdW5kPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFJREZvdW5kKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICAgICAgICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5Lmxlbmd0aD09VG90YWxDb25uZWN0ZWRQbGF5ZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgfSxcclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gZGljZSBhbmltYXRpb24gaXMgcGxheWVkIG9uIGFsbCBwbGF5ZXJzXHJcbiAgICBAbWV0aG9kIENoYW5nZVR1cm5cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENoYW5nZVR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5UdXJuTnVtYmVyPHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoLTEpXHJcbiAgICAgICAgICAgIHRoaXMuVHVybk51bWJlcj10aGlzLlR1cm5OdW1iZXIrMTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuVHVybk51bWJlcj0wO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlVmlzdWFsRGF0YSgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgZnJvbSByYWlzZSBvbiBldmVudCAoZnJvbSBmdW5jdGlvbiBcIlN0YXJ0VHVyblwiIGFuZCBcIkNoYW5nZVR1cm5cIiBvZiB0aGlzIHNhbWUgY2xhc3MpIHRvIGhhbmRsZSB0dXJuXHJcbiAgICBAbWV0aG9kIFR1cm5IYW5kbGVyXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBUdXJuSGFuZGxlcihfdHVybilcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVwZGF0ZVZpc3VhbERhdGEoKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiVHVybjogXCIrX3R1cm4pO1xyXG4gICAgICAgIHZhciBfcGxheWVyTWF0Y2hlZD1mYWxzZTtcclxuICAgICAgICBfc2tpcE5leHRUdXJuPWZhbHNlO1xyXG4gICAgICAgIGlmKElzVHdlZW5pbmcpIC8vY2hlY2sgaWYgYW5pbWF0aW9uIG9mIHR1cm4gYmVpbmcgcGxheWVkIG9uIG90aGVyIHBsYXllcnMgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT10cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlcmVcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuSGFuZGxlcihfdHVybik7XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVHVybk51bWJlcj1fdHVybjtcclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICBfcGxheWVyTWF0Y2hlZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9za2lwTmV4dFR1cm49dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlckdhbWVPdmVyKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdD09ZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9za2lwTmV4dFR1cm4gPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIHlvdXIgdHVybiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UvL3R1cm4gZGVjaXNpb25zIGZvciBib3RcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfcGxheWVyTWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NraXBOZXh0VHVybiA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFCb3RHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Sb2xsRGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIix0aGlzLlR1cm5OdW1iZXIsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlR1cm4gT2Y6IFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQWxsUGxheWVyVUlbdGhpcy5UdXJuTnVtYmVyXS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuUGxheWVySW5mbyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PXRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9za2lwIHRoaXMgdHVybiBhcyBza2lwIHR1cm4gaGFzIGJlZW4gY2FsbGVkIGJlZm9yZVxyXG4gICAgICAgICAgICBpZihfcGxheWVyTWF0Y2hlZCAmJiBfc2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIGN1cnJlbnQgdHVyblwiLDEyMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVTa2lwTmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKF9wbGF5ZXJNYXRjaGVkICYmIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7ICAgXHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfaW5kKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgdmFyIE15RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICAgICAgdmFyIF9jb3VudGVyPV9pbmQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIC8vaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEIT1NeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIC8vZG9udCB1cGRhdGUgbXkgb3duIGRhdGFcclxuICAgICAgIC8vIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQ9PU1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXT1NYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvL31cclxuICAgICAgIC8vIGVsc2VcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoX2NvdW50ZXI8dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgtMSlcclxuICAgICAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkaW5nIGNvdW50ZXI6IFwiK19jb3VudGVyKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgfSwgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gYWxsIHBsYXllcnMgaGF2ZSBkb25lIHRoZWlyIGluaXRpYWwgc2V0dXAgYW5kIGZpcnN0IHR1cm4gc3RhcnRzXHJcbiAgICBAbWV0aG9kIFN0YXJ0VHVyblxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU3RhcnRUdXJuKClcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDsgLy9yZXNldGluZyB0aGUgdHVybiBudW1iZXIgb24gc3RhcnQgb2YgdGhlIGdhbWVcclxuXHJcbiAgICAgICAgLy9zZW5kaW5nIGluaXRpYWwgdHVybiBudW1iZXIgb3ZlciB0aGUgbmV0d29yayB0byBzdGFydCB0dXJuIHNpbXVsdGFub3VzbHkgb24gYWxsIGNvbm5lY3RlZCBwbGF5ZXIncyBkZXZpY2VzXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLHRoaXMuVHVybk51bWJlcik7XHJcbiAgICAgICAgXHJcbiAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBSZWNlaXZlQmFua3J1cHREYXRhKF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIC8vb3RoZXIgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcclxuICAgICAgICB2YXIgX2lzQmFua3J1cHRlZD1fZGF0YS5EYXRhLmJhbmtydXB0ZWQ7XHJcbiAgICAgICAgdmFyIF90dXJuPV9kYXRhLkRhdGEudHVybjtcclxuICAgICAgICB2YXIgX3BsYXllckRhdGE9X2RhdGEuRGF0YS5QbGF5ZXJEYXRhTWFpbjtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKF9pc0JhbmtydXB0ZWQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKF90dXJuKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhfcGxheWVyRGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3R1cm5dPV9wbGF5ZXJEYXRhO1xyXG5cclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKHRydWUpO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIix0aGlzLlR1cm5OdW1iZXIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT10cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXModHJ1ZSk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIix0aGlzLlR1cm5OdW1iZXIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT10cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBGdW5jdGlvbiBmb3IgZ2FtZXBsYXlcclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcGxheWVyIFVJIChuYW1lL2ljb25zL251bWJlciBvZiBwbGF5ZXJzIHRoYXQgdG8gYmUgYWN0aXZlIGV0YylcclxuICAgIEBtZXRob2QgQXNzaWduUGxheWVyR2FtZVVJXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBBc3NpZ25QbGF5ZXJHYW1lVUkoX2lzQmFua3J1cHRlZD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkgLy9mb3IgYm90XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighX2lzQmFua3J1cHRlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9yYW5kb21JbmRleD10aGlzLmdldFJhbmRvbSgwLHRoaXMuQm90R2FtZUluZm8ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mby5wdXNoKHRoaXMuQm90R2FtZUluZm9bX3JhbmRvbUluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM9MjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZUdhbWVVSShfdG9nZ2xlSGlnaGxpZ2h0LF9pbmRleClcclxuICAgIHtcclxuICAgICAgICBpZihfdG9nZ2xlSGlnaGxpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtfaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5QbGF5ZXJJbmZvPXRoaXMuUGxheWVyR2FtZUluZm9bX2luZGV4XTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKF9pbmRleD09aW5kZXgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVCR0hpZ2hsaWdodGVyKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gZW5iYWxlIHJlc3BlY3RpdmUgcGxheWVycyBub2RlcyBpbnNpZGUgZ2FtYXBsYXlcclxuICAgIEBtZXRob2QgRW5hYmxlUGxheWVyTm9kZXNcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEVuYWJsZVBsYXllck5vZGVzKF9pc0JhbmtydXB0ZWQ9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIV9pc0JhbmtydXB0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkhvbWVCYXNlZEFtb3VudD09MSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudD09MSAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZCkgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi54LHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ib21lQmFzZWRBbW91bnQ9PTEpICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQnJpY2tBbmRNb3J0YXJBbW91bnQ9PTEpICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbj10aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgIFxyXG4gICAgICAgIGxldCByYXRpbz10YXJnZXRQb3MueS9jYy53aW5TaXplLmhlaWdodDtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MjtcclxuICAgIH0sXHJcblxyXG4gICAgbGF0ZVVwZGF0ZSAoKSB7XHJcbiAgICAgICAgaWYodGhpcy5pc0NhbWVyYVpvb21pbmcpICAgIFxyXG4gICAgICAgICAgICB0aGlzLlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3luY0RpY2VSb2xsKF9yb2xsKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZGljZTE9X3JvbGwuZGljZTE7XHJcbiAgICAgICAgdmFyIF9kaWNlMj1fcm9sbC5kaWNlMjtcclxuICAgICAgICB2YXIgX3Jlc3VsdD1fZGljZTErX2RpY2UyO1xyXG5cclxuICAgICAgICBJc1R3ZWVuaW5nPXRydWU7XHJcbiAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG5cclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQ9PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbWF0Y2hlZDpcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj09MCAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzWzBdLkJ1c2luZXNzVHlwZT09MilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9sbENvdW50ZXI9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj0xMztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj09MTIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyKzIxOyAgXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIrMTtcclxuXHJcbiAgICAgICAgICAgIFJvbGxDb3VudGVyPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlci0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIERpY2VSb2xsPV9yZXN1bHQ7XHJcbiAgICAgICAgRGljZVRlbXA9MDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKERpY2VSb2xsKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVHVybk51bWJlcj09aW5kZXgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uZ2V0Q29tcG9uZW50KFwiRGljZUNvbnRyb2xsZXJcIikuQW5pbWF0ZURpY2UoX2RpY2UxLCBfZGljZTIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGxldCB0YXJnZXRQb3M9dGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsMTIwKSk7XHJcbiAgICAgICAgLy8gdmFyIF9wb3M9dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgICAgIC8vIHRoaXMuVHdlZW5DYW1lcmEoX3Bvcyx0cnVlLDAuNCk7ICAgXHJcbiAgICB9LFxyXG5cclxuICAgIERpY2VGdW50aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0YXJnZXRQb3M9dGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsMTIwKSk7XHJcbiAgICAgICAgdmFyIF9wb3M9dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX3Bvcyx0cnVlLDAuNCk7ICBcclxuICAgIH0sXHJcblxyXG4gICAgVGVtcENoZWNrU3BhY2UoX3JvbGxpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRlbXBjb3VudGVyPTA7XHJcbiAgICAgICAgdmFyIHRlbXBjb3VudGVyMj0wO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIHRlbXBjb3VudGVyMj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgaWYodGVtcGNvdW50ZXIyLTE8MClcclxuICAgICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzdGFydGluZyBmcm9tIG9ibGl2aW9uXCIpO1xyXG4gICAgICAgIHRlbXBjb3VudGVyPXRlbXBjb3VudGVyMitfcm9sbGluZy0xO1xyXG4gICAgICAgIHZhciBkaWNldG9iZT1wYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIrZGljZXRvYmUpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBjb3VudGVyPXRlbXBjb3VudGVyMitfcm9sbGluZztcclxuICAgICAgICB2YXIgZGljZXRvYmU9cGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwidG8gYmU6IFwiK2RpY2V0b2JlKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgUm9sbERpY2U6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICB2YXIgRGljZTE7XHJcbiAgICAgICAgICAgIHZhciBEaWNlMjtcclxuICAgICAgICAgICAgaWYgKF9pc1Rlc3QgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBEaWNlMSA9IHBhcnNlSW50KF9kaWNlaW5wdXQxKTtcclxuICAgICAgICAgICAgICAgIERpY2UyID0gcGFyc2VJbnQoX2RpY2VpbnB1dDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSB0cnVlICYmIF9pc1Rlc3QpIHtcclxuICAgICAgICAgICAgICAgIERpY2UxID0gNTtcclxuICAgICAgICAgICAgICAgIERpY2UyID0gMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcbiAgICAgICAgICAgICAgICBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMSA9PSBEaWNlMSlcclxuICAgICAgICAgICAgICAgICAgICBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMiA9PSBEaWNlMilcclxuICAgICAgICAgICAgICAgICAgICBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBQcmV2aW91c0RpY2VSb2xsMSA9IERpY2UxO1xyXG4gICAgICAgICAgICAgICAgUHJldmlvdXNEaWNlUm9sbDIgPSBEaWNlMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBEaWNlMT0yMDtcclxuICAgICAgICAgICAgLy8gdmFyIERpY2UyPTE7XHJcblxyXG4gICAgICAgICAgICBEaWNlUm9sbCA9IERpY2UxICsgRGljZTI7XHJcbiAgICAgICAgICAgIHZhciBfbmV3Um9sbCA9IHsgZGljZTE6IERpY2UxLCBkaWNlMjogRGljZTIgfVxyXG4gICAgICAgICAgICAvL0RpY2VSb2xsPTIzO1xyXG4gICAgICAgICAgICAvL3RoaXMuVGVtcENoZWNrU3BhY2UoRGljZVJvbGwpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRpY2UgbnVtYmVyOiBcIiArIERpY2VSb2xsICsgXCIsIERpY2UxOlwiICsgRGljZTEgKyBcIiwgRGljZTI6XCIgKyBEaWNlMik7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDMsIF9uZXdSb2xsKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxPbmVEaWNlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDUgPT0gRGljZTEpXHJcbiAgICAgICAgICAgIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7ICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgUHJldmlvdXNEaWNlUm9sbDUgPSBEaWNlMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIERpY2UxO1xyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsVHdvRGljZXMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaWNlMT10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgIHZhciBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMyA9PSBEaWNlMSlcclxuICAgICAgICAgICAgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTsgICBcclxuXHJcbiAgICAgICAgaWYgKFByZXZpb3VzRGljZVJvbGw0ID09IERpY2UyKVxyXG4gICAgICAgICAgICBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpOyAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFByZXZpb3VzRGljZVJvbGwzID0gRGljZTE7XHJcbiAgICAgICAgICAgIFByZXZpb3VzRGljZVJvbGw0ID0gRGljZTI7XHJcblxyXG4gICAgICAgIHJldHVybiAoRGljZTErRGljZTIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjYWxsVXBvbkNhcmQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAoUm9sbENvdW50ZXIgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3NwYWNlSUQgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3NwYWNlSUQgIT0gNiAmJiBfc3BhY2VJRCAhPSA3KSAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVuYXMgc2VsbCBzcGFjZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBSYW5kb21DYXJkID0gdGhpcy5nZXRSYW5kb20oMCwgMTUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2ZvciB0ZXN0aW5nIG9ubHlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3NwYWNlSUQgPT0gMikgLy9sYW5kZWQgb24gc29tZSBiaWcgYnVzaW5lc3NcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNywxMCwyLDMsNCw1LDYsOF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleD10aGlzLmdldFJhbmRvbSgwLDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmFuZG9tQ2FyZD12YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF9zcGFjZUlEID09IDUpIC8vbGFuZGVkIG9uIHNvbWUgbG9zc2VzIGNhcmRzXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleCA9IFswLCAxLCA1LCA2LCAyLCA3LCAzLCA0LCA4LCA5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRSYW5kb20oMCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSYW5kb21DYXJkID0gdmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUmFuZG9tQ2FyZCA9IDk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKF9zcGFjZUlEID09IDMpIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleCA9IFswLCA3LCAzLCA4LCAxMywgOSwgMSwgMiwgNCwgNV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSA1O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoX3NwYWNlSUQgPT0gMSkgLy9sYW5kZWQgb24gc29tZSB3aWxkIGNhcmRzXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleCA9IFswLCAxLCA2LCAxMCwgMiwgMywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSYW5kb21DYXJkID0gdmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUmFuZG9tQ2FyZCA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoX3NwYWNlSUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMikgLy9mb3IgcmVhbCBwbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfc3BhY2VJRD09MTIpIC8vIGlmIHBsYXllciBsYW5kZWQgb24gZmluaXNoIHNwYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyA1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQgPT0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGEgPSB7IFwicmFuZG9tQ2FyZFwiOiBSYW5kb21DYXJkLCBcImNvdW50ZXJcIjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSAvL2ZvciBib3RcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfc3BhY2VJRD09MTIpIC8vIGlmIHBsYXllciBsYW5kZWQgb24gZmluaXNoIHNwYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyID0gUm9sbENvdW50ZXIgKyA1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGEgPSB7IFwicmFuZG9tQ2FyZFwiOiBSYW5kb21DYXJkLCBcImNvdW50ZXJcIjogUm9sbENvdW50ZXIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFuZGVkIG9uIHBheSBkYXkgb3IgZG91YmxlIHBheSBkYXkgYW5kIHdvcmsgaXMgZG9uZSBzbyBjaGFuZ2luZyB0dXJuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0JvdCAmJiBCb3RHYW1lT3ZlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzQm90ICYmIHVzZXJHYW1lT3ZlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wbGV0ZUNhcmRUdXJuKClcclxuICAgIHtcclxuICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibGFuZGVkIG9uIHBheSBkYXkgb3IgZG91YmxlIHBheSBkYXkgYW5kIHdvcmsgaXMgZG9uZSBzbyBjaGFuZ2luZyB0dXJuXCIpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBDYWxsR2FtZUNvbXBsZXRlKF9pc0JvdD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihfaXNCb3Q9PWZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9dGhpcy5UdXJuTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLmlzR2FtZUZpbmlzaGVkPT1mYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9jYXNoPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBITUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEJNQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBCTUxvY2F0aW9ucz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hbkFtb3VudCs9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9nb2xkID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX3N0b2NrcyA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2RpY2VSYW5kb20gPSB0aGlzLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBPbmNlT3JTaGFyZSA9IF9kaWNlUmFuZG9tICogMTAwMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEdvbGRDYXNoID0gT25jZU9yU2hhcmUgKiBfZ29sZDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU3RvY2tDYXNoID0gT25jZU9yU2hhcmUgKiBfc3RvY2tzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEJNQ2FzaD0oQk1BbW91bnQrQk1Mb2NhdGlvbnMpKjE1MDAwMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEhNQ2FzaD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEhNQW1vdW50PT0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9NjAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MilcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzYwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoSE1BbW91bnQ9PTMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD0yNTAwMCsyNTAwMCs2MDAwMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFRvdGFsQXNzZXRzPV9jYXNoK0JNQ2FzaCtITUNhc2grR29sZENhc2grU3RvY2tDYXNoLWxvYW5BbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gVG90YWxBc3NldHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsSEJDYXNoID0gSE1DYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEJNQ2FzaCA9IEJNQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxHb2xkQ2FzaCA9IEdvbGRDYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFN0b2Nrc0Nhc2ggPSBTdG9ja0Nhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9hbkJhbGFuY2UgPSBsb2FuQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD10aGlzLlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD09ZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfY2FzaD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaDtcclxuICAgICAgICAgICAgICAgIHZhciBITUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIEJNQW1vdW50PXRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBCTUxvY2F0aW9ucz10aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hbkFtb3VudCs9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZ29sZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgT25jZU9yU2hhcmUgPSBfZGljZVJhbmRvbSAqIDEwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBCTUNhc2g9KEJNQW1vdW50K0JNTG9jYXRpb25zKSoxNTAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBITUNhc2g9MDtcclxuICAgICAgICAgICAgICAgICAgICBpZihITUFtb3VudD09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTYwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoSE1BbW91bnQ9PTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD0yNTAwMCs2MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArMjUwMDArNjAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBUb3RhbEFzc2V0cz1fY2FzaCtCTUNhc2grSE1DYXNoK0dvbGRDYXNoK1N0b2NrQ2FzaC1sb2FuQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU2NvcmUgPSBUb3RhbEFzc2V0cztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxIQkNhc2ggPSBITUNhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsQk1DYXNoID0gQk1DYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEdvbGRDYXNoID0gR29sZENhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsU3RvY2tzQ2FzaCA9IFN0b2NrQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2FuQmFsYW5jZSA9IGxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgIFJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoX2RhdGEpXHJcbiAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDYsX2RhdGEpO1xyXG4gICB9LFxyXG5cclxuICAgU3luY0dhbWVPdmVyKF9VSUQpXHJcbiAgIHtcclxuICAgICAgIHZhciBpbmZvVGV4dCA9IFwiXCI7XHJcbiAgICAgICB2YXIgc3RhdHVzVGV4dCA9IFwiXCI7XHJcbiAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3REYXRhKCk7XHJcbiAgICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgICAgICB2YXIgTXlEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyPXRydWU7XHJcblxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IHRydWUpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBfaW5kZXggPSAtMTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkdhbWUgd29uIGJ5IFwiK01haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZTsgXHJcbiAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICAgIFwiQ3VycmVudCBDYXNoIDogJFwiICsgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxIQkNhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiQnJpY2sgQW5kIE1vcnRhciBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICsgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEJNQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJHb2xkIFZhbHVlIDogJFwiICsgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEdvbGRDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTdG9ja3NDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIkxvYW4gQmFsYW5jZSA6ICRcIiArIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxMb2FuQmFsYW5jZSArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoIEVhcm5lZCA6ICRcIiArIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICAvLyAgICAgXCJIaWdoZXN0IENhc2g6IFwiICsgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICsgXCJcXG5cIiArICdcXG4nICtcclxuICAgICAgICAgICAgLy8gICAgIFwiR2FtZSB3b24gYnkgXCIrICBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWUrIFwiXFxuXCIgKyAnXFxuJyArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAvLyAgICAgXCJHYW1lIHdpbGwgYmUgcmVzdGFydGVkIGF1dG9tYXRjYWxseSBhZnRlciAxNSBzZWNvbmRzXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAxNTAwMCwgZmFsc2VcclxuICAgICAgICAgICAgLy8gKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXN0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICAvLyB9LCAxNTA2MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEID09IF9VSUQpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy95b3Ugd29uXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJDb25ncmF0cyEgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiOyBcclxuICAgICAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsSEJDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgKyBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEJNQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU3RvY2tzQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICsgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxMb2FuQmFsYW5jZSArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgKyBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG4gICAgICAgICAgICAgICAgLy8gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIC8vICAgICBcIlRvdGFsIENhc2g6IFwiICsgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArIFwiXFxuXCIgKyAnXFxuJyArXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIiArIFwiXFxuXCIgKyAnXFxuJyArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIDE1MDAwLCBmYWxzZVxyXG4gICAgICAgICAgICAgICAgLy8gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3lvdSBsb3NlXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJVbmZvcnR1bmF0ZWx5ISB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiOyBcclxuICAgICAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIkhvbWUgQmFzZWQgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsSEJDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgKyBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEJNQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsR29sZENhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIlN0b2NrcyBWYWx1ZSA6ICRcIiArIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU3RvY2tzQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICsgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxMb2FuQmFsYW5jZSArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgKyBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlICsgXCJcXG5cIjtcclxuXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIC8vICAgICBcIlRvdGFsIENhc2g6IFwiICsgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArIFwiXFxuXCIgKyAnXFxuJyArXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgXCJ1bmZvcnR1bmF0ZWx5IHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCIgKyBcIlxcblwiICsgJ1xcbicgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIC8vICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAxNTAwMCwgZmFsc2VcclxuICAgICAgICAgICAgICAgIC8vICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXN0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICAvLyB9LCAxNTA2MCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL3dpdGggYm90XHJcbiAgICB7XHJcbiAgICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YT10aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICAgIHZhciBNeURhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeURhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvWzBdLkdhbWVPdmVyPXRydWU7XHJcblxyXG4gICAgICAgIGlmKE15RGF0YS5QbGF5ZXJVSUQ9PV9VSUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICAgICAgc3RhdHVzVGV4dCA9IFwiQ29uZ3JhdHMhIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIjsgXHJcbiAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArIE15RGF0YS5DYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgKyBNeURhdGEuVG90YWxIQkNhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArIE15RGF0YS5Ub3RhbEJNQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArIE15RGF0YS5Ub3RhbEdvbGRDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgKyBNeURhdGEuVG90YWxTdG9ja3NDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgKyBNeURhdGEuVG90YWxMb2FuQmFsYW5jZSArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgKyBNeURhdGEuVG90YWxTY29yZSArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiT3RoZXIgUGxheWVyIEVhcm5lZCBDYXNoIDogJFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1sxXS5Ub3RhbFNjb3JlICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgICAgIC8vIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIC8vICAgICBcIlRvdGFsIENhc2g6IFwiK015RGF0YS5Ub3RhbFNjb3JlK1wiXFxuXCIrJ1xcbicrXHJcbiAgICAgICAgICAgIC8vICAgICBcIkNvbmdyYXRzISB5b3VyIGNhc2ggaXMgaGlnaGVzdCwgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiK1wiXFxuXCIrJ1xcbicrXCJcXG5cIitcclxuICAgICAgICAgICAgLy8gICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgMTUwMDAsZmFsc2VcclxuICAgICAgICAgICAgLy8gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy95b3UgbG9zZVxyXG5cclxuICAgICAgICAgICAgc3RhdHVzVGV4dCA9IFwiVW5mb3J0dW5hdGVseSEgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIjsgXHJcbiAgICAgICAgICAgIGluZm9UZXh0ID1cclxuICAgICAgICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArIE15RGF0YS5DYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgKyBNeURhdGEuVG90YWxIQkNhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArIE15RGF0YS5Ub3RhbEJNQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArIE15RGF0YS5Ub3RhbEdvbGRDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgKyBNeURhdGEuVG90YWxTdG9ja3NDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgKyBNeURhdGEuVG90YWxMb2FuQmFsYW5jZSArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgKyBNeURhdGEuVG90YWxTY29yZSArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiT3RoZXIgUGxheWVyIEVhcm5lZCBDYXNoIDogJFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1sxXS5Ub3RhbFNjb3JlICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1Jlc3VsdFNjcmVlbihzdGF0dXNUZXh0LCBpbmZvVGV4dCk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgLy8gICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLlRvdGFsU2NvcmUrXCJcXG5cIisnXFxuJytcclxuICAgICAgICAgICAgLy8gICAgIFwidW5mb3J0dW5hdGVseSB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiK1wiXFxuXCIrJ1xcbicrXCJcXG5cIitcclxuICAgICAgICAgICAgLy8gICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgMTUwMDAsZmFsc2VcclxuICAgICAgICAgICAgLy8gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgLy8gfSwgMTUwNjApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgIH0sXHJcblxyXG4gICAgQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoKVxyXG4gICAge1xyXG4gICAgICAgICAgICB2YXIgbWF4ID0gMDtcclxuICAgICAgICAgICAgdmFyIFNlbGVjdGVkSW5kID0gMDtcclxuICAgICAgICAgICAgdmFyIFNlc3Npb25EYXRhID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfdmFsdWUgPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBTZWxlY3RlZEluZCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIG1heCA9IF92YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF92YWx1ZSA9IFNlc3Npb25EYXRhW2luZGV4XS5Ub3RhbFNjb3JlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coX3ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIiArIFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLlBsYXllclVJRCk7XHJcbiAgICB9LFxyXG4gICAgU3RhcnREaWNlUm9sbDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoUm9sbENvdW50ZXI+PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVvdmVyXCIpOyBcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwbGF5ZXJjb21wbGV0ZWQ9MDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyY29tcGxldGVkPT10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aCkgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzR2FtZU92ZXI9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgQm90R2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXJnYW1lb3ZlcjogXCIgKyB1c2VyR2FtZU92ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYm90Z2FtZW92ZXI6IFwiICsgQm90R2FtZU92ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGxheWVyY29tcGxldGVkPTA7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPXRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoTWFpblNlc3Npb25EYXRhW2luZGV4XS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXllcmNvbXBsZXRlZD09dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpIC8vZ2FtZWNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJvdEdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICBEaWNlVGVtcCA9IERpY2VUZW1wICsgMTtcclxuICAgICAgICAgICAgICAgIHZhciBfdG9Qb3MgPSBjYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHdlZW5QbGF5ZXIodGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLCBfdG9Qb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSYW5kb206ZnVuY3Rpb24obWluLG1heClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICAgIH0sXHJcblxyXG4gICAgVHdlZW5DYW1lcmE6IGZ1bmN0aW9uIChfcG9zLCBpc1pvb20sdGltZSkgeyAgIFxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuQ2FtZXJhTm9kZSlcclxuICAgICAgICAudG8odGltZSwgeyBwb3NpdGlvbjogY2MudjIoX3Bvcy54LCBfcG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZihpc1pvb20pXHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBab29tQ2FtZXJhSW4gKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgaWYodGhpcy5DYW1lcmEuem9vbVJhdGlvPDIpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89dGhpcy5DYW1lcmEuem9vbVJhdGlvKzAuMDM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCAxMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUGF5RGF5Q29uZGl0aW9ucyhfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKFJvbGxDb3VudGVyIDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcj1QYXNzZWRQYXlEYXlDb3VudGVyKzE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFBhc3NlZFBheURheUNvdW50ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDcpIHtcclxuICAgICAgICAgICAgICAgIERvdWJsZVBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9uZXh0VHVybkRvdWJsZVBheT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgICAgICAgaWYoUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkgJiYgIV9uZXh0VHVybkRvdWJsZVBheSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKGZhbHNlLF9pc0JvdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoKERvdWJsZVBheURheSkgfHwgKFBhc3NlZFBheURheSAmJiBfbmV4dFR1cm5Eb3VibGVQYXkpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy90aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICAgICAgLy90aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24odHJ1ZSxfaXNCb3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgWm9vbUNhbWVyYU91dCAoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ2FtZXJhLnpvb21SYXRpbz49MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz1mYWxzZTtcclxuICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPXRoaXMuQ2FtZXJhLnpvb21SYXRpby0wLjAzO1xyXG4gICAgICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbj1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MTtcclxuXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKDApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ICYmICFCb3RHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnModGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCAmJiAhdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnModGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKSAvL3JlYWwgcGxheWVyXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgVHdlZW5QbGF5ZXI6IGZ1bmN0aW9uIChOb2RlLFRvUG9zKSB7XHJcbiAgICAgICAgY2MudHdlZW4oTm9kZSkgLy8wLjRcclxuICAgICAgICAgICAgLnRvKDAuNCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSkgfSwgeyBlYXNpbmc6IFwicXVhZEluT3V0XCIgfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKERpY2VUZW1wIDwgRGljZVJvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhEaWNlVGVtcCArIFwiIFwiICsgUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkgLy9mb3IgYm90XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNiB8fCBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJvdCBnYW1lIGlzIG92ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXJHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYgfHwgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheUNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gY29uc29sZS5lcnJvcihQYXNzZWRQYXlEYXlDb3VudGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNlciBnYW1lIGlzIG92ZXIgc2tpcHBpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coUGFzc2VkUGF5RGF5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYgfHwgcGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKSA9PSA3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgZmluaXNoZWQgZm9yOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChSb2xsQ291bnRlciA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChSb2xsQ291bnRlciA9PSAxMilcclxuICAgICAgICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMjE7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgRGljZVRlbXAgPSBEaWNlUm9sbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9EaWNlVGVtcD1EaWNlVGVtcCsxOyBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coRGljZVRlbXArXCIgXCIrUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX25ld3Bvcz1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcywgZmFsc2UsIDAuNik7IC8vem9vbW91dFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9ydWxlcyBpbXBsbWVudGF0aW9uIGR1cmluZyB0dXJuICh0dXJuIGRlY2lzaW9ucylcclxuXHJcbiAgICBUb2dnbGVQYXlEYXkoX3N0MSxfU3QyKVxyXG4gICAge1xyXG4gICAgICAgIFBhc3NlZFBheURheT1fc3QxO1xyXG4gICAgICAgIERvdWJsZVBheURheT1fU3QyO1xyXG5cclxuICAgICAgICBpZiAoIV9zdDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQYXNzZWRQYXlEYXlDb3VudGVyID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihhbW91bnQsX2luZGV4LF9sb2NhdGlvbk5hbWUsX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSxfR2l2ZW5DYXNoID0gMCxfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPCAzKSB7XHJcbiAgICAgICAgICAgIGlmICghX2lzQ2FyZEZ1bmN0aW9uYWxpdHkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoIC0gYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUucHVzaChfbG9jYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIiArIGFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX0dpdmVuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBfR2l2ZW5DYXNoID0gX0dpdmVuQ2FzaCAtIGFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2ggdG8gZXhwYW5kIHRoaXMgYnVzaW5lc3MsIGNhc2ggbmVlZGVkICQgXCIgKyBhbW91bnQgKyBcIiwgQ2FzaCBHaXZlbiAkXCIgKyBfR2l2ZW5DYXNoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGxvY2F0aW9uc1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsX0dpdmVuQ2FzaCA9IDAsX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXM9W107XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihwYXJzZUludCh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzVHlwZSk9PTIpIC8vdGhpcyBtZWFucyB0aGVyZSBpcyBicmljayBhbmQgbW9ydGFyIGluIGxpc3RcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc1ByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5TZXRCdXNpbmVzc0luZGV4KGkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlNldENhcmRGdW5jdGlvbmFsaXR5KF9pc0NhcmRGdW5jdGlvbmFsaXR5KTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5TZXRHaXZlbkNhc2goX0dpdmVuQ2FzaCk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0U3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2gpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlJlc2V0RWRpdEJveCgpO1xyXG4gICAgICAgICAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKEJ1c2luZXNzTG9jYXRpb25Ob2Rlcyk7XHJcbiAgICAgICAgcmV0dXJuIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7XHJcbiAgICB9LFxyXG5cclxuICAgIERlc3Ryb3lHZW5lcmF0ZWROb2RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXM9W107XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZVN0b2Nrc19UdXJuRGVjaXNpb24oX25hbWUsX1NoYXJlQW1vdW50LF9pc0FkZGluZylcclxuICAgIHtcclxuICAgICAgICBpZihfaXNBZGRpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3N0b2NrPW5ldyBTdG9ja0luZm8oKTtcclxuICAgICAgICAgICAgX3N0b2NrLkJ1c2luZXNzTmFtZT1fbmFtZTtcclxuICAgICAgICAgICAgX3N0b2NrLlNoYXJlQW1vdW50PV9TaGFyZUFtb3VudDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mU3RvY2tzLnB1c2goX3N0b2NrKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKF9pc0RvdWJsZVBheURheT1mYWxzZSxfaXNCb3Q9ZmFsc2UsX2ZvclNlbGVjdGVkQnVzaW5lc3M9ZmFsc2UsX1NlbGVjdGVkQnVzaW5lc3NJbmRleD0wLEhCQW1vdW50PTAsQk1BbW91bnQ9MCxCTUxvY2F0aW9ucz0wKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChfZm9yU2VsZWN0ZWRCdXNpbmVzcykge1xyXG4gICAgICAgICAgICB2YXIgX3RpdGxlID0gXCJQYXlEYXlcIjtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSxmYWxzZSwgZmFsc2UsIGZhbHNlLCBfaXNCb3QsX2ZvclNlbGVjdGVkQnVzaW5lc3MsX1NlbGVjdGVkQnVzaW5lc3NJbmRleCxIQkFtb3VudCxCTUFtb3VudCxCTUxvY2F0aW9ucywxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIF9za2lwTmV4dFBheWRheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheTtcclxuICAgICAgICAgICAgX3NraXBITU5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEhNTmV4dFBheWRheTtcclxuICAgICAgICAgICAgX3NraXBCTU5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfc2tpcE5leHRQYXlkYXkpIC8vaWYgcHJldmlvdXNseSBza2lwIHBheWRheSB3YXMgc3RvcmVkIGJ5IGFueSBjYXJkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFfaXNCb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgUGF5RGF5LlwiLCAxNjAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNjUwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyBQYXlEYXkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RpdGxlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2lzRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgICAgIF90aXRsZSA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgX3RpdGxlID0gXCJQYXlEYXlcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBfaXNEb3VibGVQYXlEYXksIF9za2lwSE1OZXh0UGF5ZGF5LCBfc2tpcEJNTmV4dFBheWRheSwgX2lzQm90LGZhbHNlLDAsMCwwLDAsUGFzc2VkUGF5RGF5Q291bnRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEJhbmtydXB0X1R1cm5EZWNpc2lvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQmFua3J1cHRBbW91bnQrPTE7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLGZhbHNlLHRoaXMuU2VsZWN0ZWRNb2RlLHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JhbmtydXB0LHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudCxfdUlEKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZGF0YSA9IHsgRGF0YTogeyBDYXNoOiBfYW1vdW50LCBJRDogX3VJRCB9IH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMywgX2RhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZWNlaXZlUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfYW1vdW50ID0gX2RhdGEuRGF0YS5DYXNoO1xyXG4gICAgICAgICAgICB2YXIgX2lEPV9kYXRhLkRhdGEuSUQ7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBfbXlJbmRleCA9IHRoaXMuR2V0TXlJbmRleCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlBsYXllclVJRCA9PSBfaUQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uaXNHYW1lRmluaXNoZWQgPT0gdHJ1ZSkgeyBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5Ub3RhbFNjb3JlKz1fYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLkNhc2ggKz0gX2Ftb3VudDtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSByZWNlaXZlZCBwcm9maXQgb2YgJFwiICsgX2Ftb3VudCArIFwiIGZyb20geW91ciBwYXJ0bmVyLlwiLDI4MDApO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbi8vI2VuZHJlZ2lvblxyXG4gICBcclxuICAgIC8vI3JlZ2lvbiBDYXJkcyBSdWxlc1xyXG4gICAgVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9uZXh0VHVybkRvdWJsZVBheT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5PV9uZXh0VHVybkRvdWJsZVBheTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2tpcE5leHRUdXJuKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcE5leHRUdXJuPV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuPV9za2lwTmV4dFR1cm47XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFBheWRheT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0UGF5ZGF5PV9za2lwTmV4dFBheWRheTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwSE1OZXh0UGF5ZGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEhNTmV4dFBheWRheT1fc2tpcEhNTmV4dFBheWRheTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBCTU5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwQk1OZXh0UGF5ZGF5PV9za2lwQk1OZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVUdXJuUHJvZ3Jlc3MoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIFR1cm5JblByb2dyZXNzPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgUmV0dXJuVHVyblByb2dyZXNzKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVHVybkluUHJvZ3Jlc3M7XHJcbiAgICB9LFxyXG5cclxuICAgIExvc2VBbGxNYXJrZXRpbmdNb25leSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9sb3NlQW1vdW50PS0xO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9sb3NlQW1vdW50PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ9MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2xvc2VBbW91bnQ9MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfbG9zZUFtb3VudFxyXG4gICAgfSxcclxuXHJcbiAgICBNdWx0aXBseU1hcmtldGluZ01vbmV5KF9tdWx0aXBsaWVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfYW1vdW50SW5jcmVhc2VkPS0xO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9hbW91bnRJbmNyZWFzZWQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCo9X211bHRpcGxpZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9hbW91bnRJbmNyZWFzZWQ9MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfYW1vdW50SW5jcmVhc2VkXHJcbiAgICB9LFxyXG5cclxuICAgIEdldE1hcmtldGluZ01vbmV5KF9wcm9maXQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Byb2ZpdD0oX3Byb2ZpdC8xMDApO1xyXG4gICAgICAgICAgICBfYW1vdW50PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQqPV9wcm9maXQ7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ9MDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2grPV9hbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9hbW91bnQ9MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfYW1vdW50XHJcbiAgICB9LFxyXG5cclxuICAgIFF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uKF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfdXNlcklEPV9kYXRhLlVzZXJJRDtcclxuICAgICAgICB2YXIgX3F1ZXN0aW9uSW5kZXg9X2RhdGEuUXVlc3Rpb247XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1fZGF0YS5Vc2VySW5kZXg7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoX3VzZXJJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJRCBtYXRjaGVkXCIpO1xyXG5cclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIE9uZVF1ZXN0aW9uSW5kZXg9X3F1ZXN0aW9uSW5kZXg7XHJcbiAgICAgICAgICAgIHZhciBfcXVlc3Rpb25Bc2tlZD1PbmVRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXgtMV07XHJcbiAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfcXVlc3Rpb25Bc2tlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbihfaXNUdXJuT3Zlcj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX215RGF0YTtcclxuICAgICAgICB2YXIgX3Jvb21EYXRhO1xyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKSAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yb29tRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcbiAgICAgICAgICAgIF9teURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpLy9mb3IgYm90XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfbXlEYXRhPXRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgICAgICAgIF9yb29tRGF0YT10aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5SZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXlEYXRhLF9yb29tRGF0YSxfaXNUdXJuT3Zlcix0aGlzLlNlbGVjdGVkTW9kZSlcclxuICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBPbmVRdWVzdGlvbkRlY2lzaW9uX1BheUFtb3VudF9PbmVRdWVzdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9teURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIGlmKF9teURhdGEuQ2FzaD49NTAwMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoX215RGF0YS5QbGF5ZXJVSUQ9PXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoLT01MDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgcGFpZCBjYXNoIGFtb3VudCB0byBwbGF5ZXIuXCIsMTIwMCk7XHJcbiAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbih0cnVlLGZhbHNlLC0xLF9teURhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uRGVjaXNpb25fQW5zd2VyUXVlc3Rpb25fT25lUXVlc3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbXlEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYW5zd2VyZWQgdGhlIHF1ZXN0aW9uLlwiLDEyMDApO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKGZhbHNlLHRydWUsT25lUXVlc3Rpb25JbmRleCxfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfaGFzRG9uZVBheW1lbnQsX2hhc0Fuc3dlcmVkUXVlc3Rpb24sX3F1ZXN0aW9uSW5kZXgsX1VzZXJJRClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2RhdGE9e1BheW1lbnREb25lOl9oYXNEb25lUGF5bWVudCxRdWVzdGlvbkFuc3dlcmVkOl9oYXNBbnN3ZXJlZFF1ZXN0aW9uLFF1ZXN0aW9uSW5kZXg6X3F1ZXN0aW9uSW5kZXgsSUQ6X1VzZXJJRH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg4LF9kYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX2hhc0RvbmVQYXltZW50PV9kYXRhLlBheW1lbnREb25lO1xyXG4gICAgICAgICAgICB2YXIgX2hhc0Fuc3dlcmVkUXVlc3Rpb249X2RhdGEuUXVlc3Rpb25BbnN3ZXJlZDtcclxuICAgICAgICAgICAgdmFyIF9xdWVzdGlvbkluZGV4PV9kYXRhLlF1ZXN0aW9uSW5kZXg7XHJcbiAgICAgICAgICAgIHZhciBfdUlEPV9kYXRhLklEO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoX2hhc0RvbmVQYXltZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2grPTUwMDA7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyByZWZ1c2VkIHRvIGFuc3dlciB0aGUgcXVlc3Rpb24gaW5zdGVhZCBwYXllZCB0aGUgY2FzaCBhbW91bnQsICQ1MDAwIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcblxyXG4gICAgICAgICAgICB9ZWxzZSBpZihfaGFzQW5zd2VyZWRRdWVzdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9zZWxlY3RlZFBsYXllckluZGV4PTA7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2FjdG9yc0RhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfdUlEPT1fYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRQbGF5ZXJJbmRleD1pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKF9xdWVzdGlvbkluZGV4PT0xKS8vaGF2ZSB5b3Ugc2tpcHBlZCBsb2FuIHByZXZpb3VzIHBheWRheT9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ta2lwcGVkTG9hblBheW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSBza2lwcGVkIGxvYW4gcGF5ZW1lbnQgaW4gcHJldmlvdXMgcGF5ZGF5XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSBza2lwcGVkIGxvYW4gcGF5ZW1lbnQgaW4gcHJldmlvdXMgcGF5ZGF5XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTIpLy9IYXZlIHlvdSB0YWtlbiBhbnkgbG9hbj9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2xvYW5UYWtlbj10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihfbG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgdGFrZW4gc29tZSBsb2FuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSB0YWtlbiBhbnkgbG9hblwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKF9xdWVzdGlvbkluZGV4PT0zKS8vQXJlIHlvdSBiYW5rcnVwdGVkPyBpZiBtb3JlIHRoYW4gb25jZSwgdGVsbCBtZSB0aGUgYW1vdW50P1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLklzQmFua3J1cHQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSBiZWVuIGJhbmtydXB0ZWQgXCIrX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQmFua3J1cHRBbW91bnQrXCIgdGltZS9lcy5cIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKF9xdWVzdGlvbkluZGV4PT00KS8vSXMgeW91ciB0dXJuIGdvaW5nIHRvIGJlIHNraXBwZWQgbmV4dCB0aW1lP1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgYmUgc2tpcHBlZC5cIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBub3QgYmUgc2tpcHBlZC5cIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKF9xdWVzdGlvbkluZGV4PT01KS8vSXMgaXQgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgeW91ciBuZXh0IHBheWRheT9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBiZSBkb3VibGUgcGF5ZGF5XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBub3QgYmUgZG91YmxlIHBheWRheVwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgICAgIH0sIDIxNTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBSZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkoX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoSXNUd2VlbmluZz09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkoX2RhdGEpO1xyXG4gICAgICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3NwYWNlcz1fZGF0YS5EYXRhLmJhY2tzcGFjZXM7XHJcbiAgICAgICAgICAgIHZhciBfY291bnRlcj1fZGF0YS5EYXRhLkNvdW50ZXI7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3RvUG9zPWNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19jb3VudGVyK0JhY2tzcGFjZXNdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLF90b1BvcywwLjEpO1xyXG5cclxuICAgICAgICAgICAgUm9sbENvdW50ZXI9X2NvdW50ZXI7XHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLF90b1Bvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBUd2VlblBsYXllcl9Hb0JhY2tTcGFjZXM6IGZ1bmN0aW9uIChOb2RlLFRvUG9zLHNwZWVkPTAuNikge1xyXG4gICAgICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgICAgLnRvKHNwZWVkLCB7IHBvc2l0aW9uOiBjYy52MihUb1Bvcy54LCBUb1Bvcy55KX0se2Vhc2luZzpcInF1YWRJbk91dFwifSlcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgUm9sbENvdW50ZXItPUJhY2tzcGFjZXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX2RhdGE9e0RhdGE6e2JhY2tzcGFjZXM6QmFja3NwYWNlcyxDb3VudGVyOlJvbGxDb3VudGVyfX07XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTAsX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgX3RvUG9zPWNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5Ud2VlblBsYXllcl9Hb0JhY2tTcGFjZXModGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLF90b1Bvcyk7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIC8vI2VuZHJlZ2lvblxyXG59KTtcclxuLy9tb2R1bGUuZXhwb3J0cyAgPSBQbGF5ZXJEYXRhOyAvL3doZW4gaW1wb3J0cyBpbiBhbm90aGVyIHNjcmlwdCBvbmx5IHJlZmVyZW5jZSBvZiBwbGF5ZXJkYXRhIGNsYXNzIHdvdWxkIGJlIGFibGUgdG8gYWNjZXNzZWQgZnJvbSBHYW1lbWFuYWdlciBpbXBvcnRcclxubW9kdWxlLmV4cG9ydHMgID0gR2FtZU1hbmFnZXI7XHJcbi8vI2VuZHJlZ2lvbiJdfQ==