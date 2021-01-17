
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
var TotalCounterReached = false; //#region superclasses and enumerations
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
    DoublePayDay = false; //cards functionality

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
        Dice1 = 10;
        Dice2 = 10;
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
                // var valueIndex=[0,1,7,10,2,3,4,5,6,8];
                // var index=this.getRandom(0,10);
                // RandomCard=valueIndex[index];
                RandomCard = 1;
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
      if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) PassedPayDay = true;
      if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 7) DoublePayDay = true;
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
    .to(0.004, {
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
                if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) PassedPayDay = true;
              } else {
                console.log("bot game is over");
              }
            } else {
              if (!userGameOver) {
                if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) PassedPayDay = true;
              } else {
                console.log("user game is over skipping");
              }
            } // console.log(PassedPayDay);

          }

        if (_this7.SelectedMode == 2) {
          if (_this7.PlayerGameInfo[_this7.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
            if (!_this7.PlayerGameInfo[_this7.TurnNumber].isGameFinished) {
              if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) PassedPayDay = true;
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
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title, false, false, false, _isBot, _forSelectedBusiness, _SelectedBusinessIndex, HBAmount, BMAmount, BMLocations);
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
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title, _isDoublePayDay, _skipHMNextPayday, _skipBMNextPayday, _isBot);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJQcmV2aW91c0RpY2VSb2xsMyIsIlByZXZpb3VzRGljZVJvbGw0IiwiUHJldmlvdXNEaWNlUm9sbDUiLCJ1c2VyR2FtZU92ZXIiLCJCb3RHYW1lT3ZlciIsIlRvdGFsQ291bnRlclJlYWNoZWQiLCJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIlBhcnRuZXJOYW1lIiwiTG9jYXRpb25zTmFtZSIsIkxvYW5UYWtlbiIsIkxvYW5BbW91bnQiLCJjdG9yIiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiTmV4dFR1cm5Eb3VibGVQYXkiLCJTa2lwTmV4dFR1cm4iLCJTa2lwTmV4dFBheWRheSIsIlNraXBITU5leHRQYXlkYXkiLCJTa2lwQk1OZXh0UGF5ZGF5IiwiU3RvY2tJbmZvIiwiU2hhcmVBbW91bnQiLCJQbGF5ZXJEYXRhIiwiUGxheWVyTmFtZSIsIlBsYXllclVJRCIsIkF2YXRhcklEIiwiSXNCb3QiLCJOb09mQnVzaW5lc3MiLCJDYXJkRnVuY3Rpb25hbGl0eSIsIkhvbWVCYXNlZEFtb3VudCIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJOb09mU3RvY2tzIiwiQ2FzaCIsIkdvbGRDb3VudCIsIlN0b2NrQ291bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJMYXd5ZXJTdGF0dXMiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQbGF5ZXJSb2xsQ291bnRlciIsIkluaXRpYWxDb3VudGVyQXNzaWduZWQiLCJpc0dhbWVGaW5pc2hlZCIsIlRvdGFsU2NvcmUiLCJUb3RhbEhCQ2FzaCIsIlRvdGFsQk1DYXNoIiwiVG90YWxHb2xkQ2FzaCIsIlRvdGFsTG9hbkJhbGFuY2UiLCJUb3RhbFN0b2Nrc0Nhc2giLCJHYW1lT3ZlciIsIlJvbGxDb3VudGVyIiwiRGljZVRlbXAiLCJEaWNlUm9sbCIsIklzVHdlZW5pbmciLCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJUdXJuQ2hlY2tBcnJheSIsIkJ1c2luZXNzTG9jYXRpb25Ob2RlcyIsIlBhc3NlZFBheURheSIsIkRvdWJsZVBheURheSIsIl9uZXh0VHVybkRvdWJsZVBheSIsIl9za2lwTmV4dFR1cm4iLCJfc2tpcE5leHRQYXlkYXkiLCJfc2tpcEhNTmV4dFBheWRheSIsIl9za2lwQk1OZXh0UGF5ZGF5IiwiQ2FyZEV2ZW50UmVjZWl2ZWQiLCJUdXJuSW5Qcm9ncmVzcyIsIkJhY2tzcGFjZXMiLCJpc0dhbWVPdmVyIiwiT25lUXVlc3Rpb25JbmRleCIsIk9uZVF1ZXN0aW9ucyIsIkNhcmREaXNwbGF5U2V0VGltb3V0IiwiR2FtZU1hbmFnZXIiLCJDb21wb25lbnQiLCJQbGF5ZXJHYW1lSW5mbyIsIkJvdEdhbWVJbmZvIiwiUGxheWVyTm9kZSIsIk5vZGUiLCJDYW1lcmFOb2RlIiwiQWxsUGxheWVyVUkiLCJBbGxQbGF5ZXJOb2RlcyIsIlN0YXJ0TG9jYXRpb25Ob2RlcyIsIlNlbGVjdGVkTW9kZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIlJlc2V0QWxsVmFyaWFibGVzIiwiSW5wdXRUZXN0RGljZTEiLCJfdmFsIiwiSW5wdXRUZXN0RGljZTIiLCJvbkxvYWQiLCJUdXJuTnVtYmVyIiwiVHVybkNvbXBsZXRlZCIsIkNoZWNrUmVmZXJlbmNlcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRTZWxlY3RlZE1vZGUiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsImNvbnNvbGUiLCJlcnJvciIsIkNoZWNrU3BlY3RhdGUiLCJsb2ciLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIkFsbERhdGEiLCJNYXhQbGF5ZXJzIiwibGVuZ3RoIiwiU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyIiwiVXBkYXRlR2FtZVVJIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJHZXRUdXJuTnVtYmVyIiwiR2V0TXlJbmRleCIsIm15SW5kZXgiLCJfYWN0b3IiLCJQaG90b25BY3RvciIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9hbGxBY3RvcnMiLCJpbmRleCIsIlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyIsIkFzc2lnblBsYXllckdhbWVVSSIsIkVuYWJsZVBsYXllck5vZGVzIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIl90b1BvcyIsIlZlYzIiLCJHZXRfU3BhY2VNYW5hZ2VyIiwiRGF0YSIsIlJlZmVyZW5jZUxvY2F0aW9uIiwicG9zaXRpb24iLCJ4IiwieSIsInNldFBvc2l0aW9uIiwiX2xhc3RJbmRleCIsImFjdGl2ZSIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJUb3RhbENvbm5lY3RlZFBsYXllcnMiLCJteVJvb21BY3RvckNvdW50IiwidXNlcklEIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDaGFuZ2VUdXJuIiwiUmFpc2VFdmVudEZvckNhcmQiLCJfZGF0YSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiUmFpc2VFdmVudCIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJEaXNwbGF5Q2FyZE9uT3RoZXJzIiwiT25MYW5kZWRPblNwYWNlIiwic2V0VGltZW91dCIsIlJlc2V0Q2FyZERpc3BsYXkiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiUmFuZG9tQ2FyZCIsInJhbmRvbUNhcmQiLCJjb3VudGVyIiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIlN5bmNBbGxEYXRhIiwiUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlIiwiX3VpZCIsInB1c2giLCJBcnJheUxlbmd0aCIsIklERm91bmQiLCJVcGRhdGVWaXN1YWxEYXRhIiwiUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5IiwiVHVybkhhbmRsZXIiLCJfdHVybiIsIl9wbGF5ZXJNYXRjaGVkIiwiVG9nZ2xlVHVyblByb2dyZXNzIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUmVzZXRUdXJuVmFyaWFibGUiLCJSb2xsRGljZSIsIkRpY2VSb2xsU2NyZWVuIiwiUGxheWVySW5mbyIsIlJvb21BY3RvcnMiLCJTaG93VG9hc3QiLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJfaW5kIiwiTWFpblNlc3Npb25EYXRhIiwiTXlEYXRhIiwiX2NvdW50ZXIiLCJTdGFydFR1cm4iLCJSZWNlaXZlQmFua3J1cHREYXRhIiwiX2lzQmFua3J1cHRlZCIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiX3BsYXllckRhdGEiLCJQbGF5ZXJEYXRhTWFpbiIsIlN0YXJ0VHVybkFmdGVyQmFua3J1cHQiLCJfcmFuZG9tSW5kZXgiLCJnZXRSYW5kb20iLCJTZXROYW1lIiwiX3RvZ2dsZUhpZ2hsaWdodCIsIl9pbmRleCIsIlRvZ2dsZUJHSGlnaGxpZ2h0ZXIiLCJUb2dnbGVUZXh0aWdobGlnaHRlciIsIlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMiLCJ0YXJnZXRQb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInJhdGlvIiwid2luU2l6ZSIsImhlaWdodCIsInpvb21SYXRpbyIsImxhdGVVcGRhdGUiLCJzeW5jRGljZVJvbGwiLCJfcm9sbCIsIl9kaWNlMSIsImRpY2UxIiwiX2RpY2UyIiwiZGljZTIiLCJfcmVzdWx0IiwibXlSb29tQWN0b3JzQXJyYXkiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJBbmltYXRlRGljZSIsIkRpY2VGdW50aW9uYWxpdHkiLCJfcG9zIiwiVHdlZW5DYW1lcmEiLCJUZW1wQ2hlY2tTcGFjZSIsIl9yb2xsaW5nIiwidGVtcGNvdW50ZXIiLCJ0ZW1wY291bnRlcjIiLCJkaWNldG9iZSIsInBhcnNlSW50IiwiU3BhY2VEYXRhIiwiU3BhY2VzVHlwZSIsIkRpY2UxIiwiRGljZTIiLCJfbmV3Um9sbCIsIlJvbGxPbmVEaWNlIiwiUm9sbFR3b0RpY2VzIiwiY2FsbFVwb25DYXJkIiwiX3NwYWNlSUQiLCJ2YWx1ZUluZGV4IiwiU3RhcnREaWNlUm9sbCIsIlNlbmRpbmdEYXRhIiwiaXNCb3QiLCJjb21wbGV0ZUNhcmRUdXJuIiwiQWxsUGxheWVyc0dhbWVDb21wbGV0ZWQiLCJDYWxsR2FtZUNvbXBsZXRlIiwiX2lzQm90IiwiX3BsYXllckluZGV4IiwiX2Nhc2giLCJITUFtb3VudCIsIkdldF9HYW1lTWFuYWdlciIsIkJNQW1vdW50IiwiQk1Mb2NhdGlvbnMiLCJsb2FuQW1vdW50IiwiX2dvbGQiLCJfc3RvY2tzIiwiX2RpY2VSYW5kb20iLCJPbmNlT3JTaGFyZSIsIkdvbGRDYXNoIiwiU3RvY2tDYXNoIiwiQk1DYXNoIiwiSE1DYXNoIiwiVG90YWxBc3NldHMiLCJSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlIiwiU3luY0dhbWVPdmVyIiwiX1VJRCIsImluZm9UZXh0Iiwic3RhdHVzVGV4dCIsIkRpc2Nvbm5lY3REYXRhIiwiU2hvd1Jlc3VsdFNjcmVlbiIsIm1heCIsIlNlbGVjdGVkSW5kIiwiU2Vzc2lvbkRhdGEiLCJfdmFsdWUiLCJab29tQ2FtZXJhT3V0IiwicGxheWVyY29tcGxldGVkIiwiVHdlZW5QbGF5ZXIiLCJtaW4iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJpc1pvb20iLCJ0aW1lIiwidHdlZW4iLCJ0byIsInYyIiwiZWFzaW5nIiwiY2FsbCIsIlpvb21DYW1lcmFJbiIsInN0YXJ0IiwiQ2hlY2tQYXlEYXlDb25kaXRpb25zIiwiUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24iLCJUb1BvcyIsIl9uZXdwb3MiLCJUb2dnbGVQYXlEYXkiLCJfc3QxIiwiX1N0MiIsIkV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsImFtb3VudCIsIl9sb2NhdGlvbk5hbWUiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIlNldEJ1c2luZXNzSW5kZXgiLCJTZXRDYXJkRnVuY3Rpb25hbGl0eSIsIlNldEdpdmVuQ2FzaCIsIlNldFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIlJlc2V0RWRpdEJveCIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsImRlc3Ryb3kiLCJVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJfU2hhcmVBbW91bnQiLCJfaXNBZGRpbmciLCJfc3RvY2siLCJfaXNEb3VibGVQYXlEYXkiLCJfZm9yU2VsZWN0ZWRCdXNpbmVzcyIsIl9TZWxlY3RlZEJ1c2luZXNzSW5kZXgiLCJIQkFtb3VudCIsIl90aXRsZSIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJfYW1vdW50IiwiX3VJRCIsIklEIiwiUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9pRCIsIl9teUluZGV4IiwiVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4iLCJfc3RhdGUiLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJSZXR1cm5UdXJuUHJvZ3Jlc3MiLCJMb3NlQWxsTWFya2V0aW5nTW9uZXkiLCJfbG9zZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfbXVsdGlwbGllciIsIl9hbW91bnRJbmNyZWFzZWQiLCJHZXRNYXJrZXRpbmdNb25leSIsIl9wcm9maXQiLCJRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbiIsIl91c2VySUQiLCJVc2VySUQiLCJfcXVlc3Rpb25JbmRleCIsIlF1ZXN0aW9uIiwiVXNlckluZGV4IiwiX2dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX3F1ZXN0aW9uQXNrZWQiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uIiwiX2lzVHVybk92ZXIiLCJfbXlEYXRhIiwiX3Jvb21EYXRhIiwiVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIk9uZVF1ZXN0aW9uRGVjaXNpb25fUGF5QW1vdW50X09uZVF1ZXN0aW9uIiwiUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9BbnN3ZXJRdWVzdGlvbl9PbmVRdWVzdGlvbiIsIl9oYXNEb25lUGF5bWVudCIsIl9oYXNBbnN3ZXJlZFF1ZXN0aW9uIiwiX1VzZXJJRCIsIlBheW1lbnREb25lIiwiUXVlc3Rpb25BbnN3ZXJlZCIsIlF1ZXN0aW9uSW5kZXgiLCJSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbiIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX3NlbGVjdGVkUGxheWVySW5kZXgiLCJfYWN0b3JzRGF0YSIsIl9sb2FuVGFrZW4iLCJSZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkiLCJfc3BhY2VzIiwiYmFja3NwYWNlcyIsIkNvdW50ZXIiLCJUd2VlblBsYXllcl9Hb0JhY2tTcGFjZXMiLCJzcGVlZCIsIkdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBRyxLQUFkO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFFQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUVBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFFQSxJQUFJQyxZQUFZLEdBQUcsS0FBbkI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsS0FBbEI7QUFDQSxJQUFJQyxtQkFBbUIsR0FBRyxLQUExQixFQUVBO0FBQ0E7O0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUMsQ0FEc0I7QUFFM0JDLEVBQUFBLFNBQVMsRUFBRSxDQUZnQjtBQUVLO0FBQ2hDQyxFQUFBQSxjQUFjLEVBQUUsQ0FIVyxDQUdLOztBQUhMLENBQVIsQ0FBdkIsRUFNQTs7QUFDQSxJQUFJQyxZQUFZLEdBQUdMLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsY0FEa0I7QUFFNUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUUsY0FERTtBQUVSQyxJQUFBQSxZQUFZLEVBQ2I7QUFDSUMsTUFBQUEsV0FBVyxFQUFDLE1BRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRWIsZ0JBRlY7QUFHSSxpQkFBU0EsZ0JBQWdCLENBQUNHLElBSDlCO0FBSUlXLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQUhTO0FBU1JDLElBQUFBLHVCQUF1QixFQUN4QjtBQUNJSixNQUFBQSxXQUFXLEVBQUUsTUFEakI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZiO0FBR0ksaUJBQVMsRUFIYjtBQUlJSCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0FWUztBQWdCUkcsSUFBQUEsWUFBWSxFQUNiO0FBQ0lOLE1BQUFBLFdBQVcsRUFBRSxNQURqQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRmI7QUFHSSxpQkFBUyxFQUhiO0FBSUlILE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQWpCUztBQXVCUEksSUFBQUEsTUFBTSxFQUNKO0FBQ0lQLE1BQUFBLFdBQVcsRUFBRSxRQURqQjtBQUVJLGlCQUFTLENBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNtQixPQUhaO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQXhCSztBQThCTk0sSUFBQUEsYUFBYSxFQUNaO0FBQ0lULE1BQUFBLFdBQVcsRUFBRSxlQURqQjtBQUVJLGlCQUFTLEtBRmI7QUFHSVUsTUFBQUEsSUFBSSxFQUFDckIsRUFBRSxDQUFDc0IsT0FIWjtBQUlJVCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0EvQks7QUFxQ0xTLElBQUFBLFNBQVMsRUFDTDtBQUNJWixNQUFBQSxXQUFXLEVBQUMsV0FEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZiO0FBR0ksaUJBQVMsRUFIYjtBQUlJSCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSEMsTUFBQUEsT0FBTyxFQUFFO0FBTE4sS0F0Q0M7QUE0Q0xVLElBQUFBLFdBQVcsRUFDUDtBQUNJYixNQUFBQSxXQUFXLEVBQUMsYUFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZiO0FBR0ksaUJBQVMsRUFIYjtBQUlJSCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0E3Q0M7QUFtREpXLElBQUFBLGFBQWEsRUFDVjtBQUNJZCxNQUFBQSxXQUFXLEVBQUMsZUFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFLENBQUNaLEVBQUUsQ0FBQ2dCLElBQUosQ0FGVjtBQUdJLGlCQUFTLEVBSGI7QUFJSUgsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBQztBQUxaLEtBcERDO0FBMERKWSxJQUFBQSxTQUFTLEVBQ047QUFDSWYsTUFBQUEsV0FBVyxFQUFDLFdBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGYjtBQUdJLGlCQUFTLEtBSGI7QUFJSVQsTUFBQUEsWUFBWSxFQUFFO0FBSmxCLEtBM0RDO0FBZ0VKYyxJQUFBQSxVQUFVLEVBQ1A7QUFDSWhCLE1BQUFBLFdBQVcsRUFBQyxZQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRmI7QUFHSSxpQkFBUyxDQUhiO0FBSUlOLE1BQUFBLFlBQVksRUFBRTtBQUpsQjtBQWpFQyxHQUZnQjtBQTJFNUJlLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUFFO0FBQ25CO0FBNUUyQixDQUFULENBQW5CLEVBOEVBOztBQUNBLElBQUlDLHFCQUFxQixHQUFHN0IsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDakNDLEVBQUFBLElBQUksRUFBRSx1QkFEMkI7QUFFckNDLEVBQUFBLFVBQVUsRUFBRTtBQUNSc0IsSUFBQUEsaUJBQWlCLEVBQ2xCO0FBQ0luQixNQUFBQSxXQUFXLEVBQUMsbUJBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGYjtBQUdJLGlCQUFTLEtBSGI7QUFJSVQsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBQztBQUxaLEtBRlM7QUFRUmlCLElBQUFBLFlBQVksRUFDYjtBQUNJcEIsTUFBQUEsV0FBVyxFQUFDLGNBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGYjtBQUdJLGlCQUFTLEtBSGI7QUFJSVQsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBQztBQUxaLEtBVFM7QUFlUmtCLElBQUFBLGNBQWMsRUFDZjtBQUNJckIsTUFBQUEsV0FBVyxFQUFDLGdCQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRmI7QUFHSSxpQkFBUyxLQUhiO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQWhCUztBQXNCUm1CLElBQUFBLGdCQUFnQixFQUNqQjtBQUNJdEIsTUFBQUEsV0FBVyxFQUFDLGtCQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRmI7QUFHSSxpQkFBUyxLQUhiO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQXZCUztBQTZCUm9CLElBQUFBLGdCQUFnQixFQUNqQjtBQUNJdkIsTUFBQUEsV0FBVyxFQUFDLGtCQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRmI7QUFHSSxpQkFBUyxLQUhiO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWjtBQTlCUyxHQUZ5QjtBQXdDckNjLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUFFO0FBQ25CO0FBekNvQyxDQUFULENBQTVCLEVBMkNBOztBQUNBLElBQUlPLFNBQVMsR0FBR25DLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ3JCQyxFQUFBQSxJQUFJLEVBQUUsV0FEZTtBQUV6QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBRSxXQURFO0FBRVJRLElBQUFBLFlBQVksRUFDYjtBQUNJTixNQUFBQSxXQUFXLEVBQUMsY0FEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZiO0FBR0ksaUJBQVMsRUFIYjtBQUlJSCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0FIUztBQVNSc0IsSUFBQUEsV0FBVyxFQUNaO0FBQ0l6QixNQUFBQSxXQUFXLEVBQUUsYUFEakI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZiO0FBR0ksaUJBQVMsQ0FIYjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGI7QUFWUyxHQUZhO0FBb0J6QmMsRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQUU7QUFDbkI7QUFyQndCLENBQVQsQ0FBaEIsRUF3QkE7O0FBQ0EsSUFBSVMsVUFBVSxHQUFHckMsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBQyxZQURpQjtBQUUxQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I4QixJQUFBQSxVQUFVLEVBQ1g7QUFDSTNCLE1BQUFBLFdBQVcsRUFBQyxZQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRmI7QUFHSSxpQkFBUyxFQUhiO0FBSUlILE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQUZTO0FBUVJ5QixJQUFBQSxTQUFTLEVBQ1Y7QUFDSTVCLE1BQUFBLFdBQVcsRUFBQyxXQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRmI7QUFHSSxpQkFBUyxFQUhiO0FBSUlILE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQVRTO0FBZVIwQixJQUFBQSxRQUFRLEVBQ0w7QUFDSTdCLE1BQUFBLFdBQVcsRUFBRSxVQURqQjtBQUVJLGlCQUFTLENBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNtQixPQUhaO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQWhCSztBQXNCUjJCLElBQUFBLEtBQUssRUFDRjtBQUNJOUIsTUFBQUEsV0FBVyxFQUFFLE9BRGpCO0FBRUksaUJBQVMsS0FGYjtBQUdJVSxNQUFBQSxJQUFJLEVBQUNyQixFQUFFLENBQUNzQixPQUhaO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQXZCSztBQTZCUjRCLElBQUFBLFlBQVksRUFDYjtBQUNJL0IsTUFBQUEsV0FBVyxFQUFDLFVBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRSxDQUFDUCxZQUFELENBRlY7QUFHSSxpQkFBUyxFQUhiO0FBSUlRLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQTlCUztBQW9DUjZCLElBQUFBLGlCQUFpQixFQUNsQjtBQUNJaEMsTUFBQUEsV0FBVyxFQUFDLG1CQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVpQixxQkFGVjtBQUdJLGlCQUFTLElBSGI7QUFJSWhCLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQXJDUztBQTJDUjhCLElBQUFBLGVBQWUsRUFDaEI7QUFDSWpDLE1BQUFBLFdBQVcsRUFBQyxpQkFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZiO0FBR0ksaUJBQVMsQ0FIYjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0E1Q1M7QUFrRFIrQixJQUFBQSxvQkFBb0IsRUFDckI7QUFDSWxDLE1BQUFBLFdBQVcsRUFBQyxzQkFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZiO0FBR0ksaUJBQVMsQ0FIYjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0FuRFM7QUF5RFJnQyxJQUFBQSxvQkFBb0IsRUFDckI7QUFDSW5DLE1BQUFBLFdBQVcsRUFBQyxzQkFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZiO0FBR0ksaUJBQVMsQ0FIYjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0ExRFM7QUFnRVJpQyxJQUFBQSxVQUFVLEVBQ1g7QUFDSXBDLE1BQUFBLFdBQVcsRUFBQyxRQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUUsQ0FBQ3VCLFNBQUQsQ0FGVjtBQUdJLGlCQUFTLEVBSGI7QUFJSXRCLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQWpFUztBQXVFUmtDLElBQUFBLElBQUksRUFDRDtBQUNJckMsTUFBQUEsV0FBVyxFQUFFLFlBRGpCO0FBRUksaUJBQVMsQ0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ21CLE9BSFo7QUFJSU4sTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBeEVLO0FBOEVSbUMsSUFBQUEsU0FBUyxFQUNOO0FBQ0l0QyxNQUFBQSxXQUFXLEVBQUUsV0FEakI7QUFFSSxpQkFBUyxDQUZiO0FBR0lDLE1BQUFBLElBQUksRUFBQ1osRUFBRSxDQUFDbUIsT0FIWjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0EvRUs7QUFxRlJvQyxJQUFBQSxVQUFVLEVBQ1A7QUFDSXZDLE1BQUFBLFdBQVcsRUFBRSxZQURqQjtBQUVJLGlCQUFTLENBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNtQixPQUhaO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQXRGSztBQTRGUlksSUFBQUEsU0FBUyxFQUNOO0FBQ0lmLE1BQUFBLFdBQVcsRUFBRSxXQURqQjtBQUVJLGlCQUFTLEtBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNzQixPQUhaO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQTdGSztBQW1HUGEsSUFBQUEsVUFBVSxFQUNSO0FBQ0loQixNQUFBQSxXQUFXLEVBQUUsWUFEakI7QUFFSSxpQkFBUyxDQUZiO0FBR0lDLE1BQUFBLElBQUksRUFBQ1osRUFBRSxDQUFDbUIsT0FIWjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0FwR0s7QUEwR1JxQyxJQUFBQSxlQUFlLEVBQ1o7QUFDSXhDLE1BQUFBLFdBQVcsRUFBRSxpQkFEakI7QUFFSSxpQkFBUyxDQUZiO0FBR0lDLE1BQUFBLElBQUksRUFBQ1osRUFBRSxDQUFDbUIsT0FIWjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0EzR0s7QUFpSFJzQyxJQUFBQSxZQUFZLEVBQ1Q7QUFDSXpDLE1BQUFBLFdBQVcsRUFBRSxjQURqQjtBQUVJLGlCQUFTLEtBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNzQixPQUhaO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQWxISztBQXdIUnVDLElBQUFBLFVBQVUsRUFDUDtBQUNJMUMsTUFBQUEsV0FBVyxFQUFFLFlBRGpCO0FBRUksaUJBQVMsS0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ3NCLE9BSFo7QUFJSVQsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBekhLO0FBK0hSd0MsSUFBQUEsY0FBYyxFQUNYO0FBQ0kzQyxNQUFBQSxXQUFXLEVBQUUsZ0JBRGpCO0FBRUksaUJBQVMsQ0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ21CLE9BSFo7QUFJSU4sTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBaElLO0FBc0lSeUMsSUFBQUEsa0JBQWtCLEVBQ2Y7QUFDSTVDLE1BQUFBLFdBQVcsRUFBRSxvQkFEakI7QUFFSSxpQkFBUyxLQUZiO0FBR0lDLE1BQUFBLElBQUksRUFBQ1osRUFBRSxDQUFDc0IsT0FIWjtBQUlJVCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0F2SUs7QUE2SVIwQyxJQUFBQSxpQkFBaUIsRUFDZDtBQUNJN0MsTUFBQUEsV0FBVyxFQUFFLG1CQURqQjtBQUVJLGlCQUFTLENBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNtQixPQUhaO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQTlJSztBQW9KUjJDLElBQUFBLHNCQUFzQixFQUNuQjtBQUNJOUMsTUFBQUEsV0FBVyxFQUFFLHdCQURqQjtBQUVJLGlCQUFTLEtBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNzQixPQUhaO0FBSUlULE1BQUFBLFlBQVksRUFBRTtBQUpsQixLQXJKSztBQTBKUDZDLElBQUFBLGNBQWMsRUFDUjtBQUNJL0MsTUFBQUEsV0FBVyxFQUFDLGdCQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRmI7QUFHSSxpQkFBUyxLQUhiO0FBSUlULE1BQUFBLFlBQVksRUFBRTtBQUpsQixLQTNKQztBQWdLUDhDLElBQUFBLFVBQVUsRUFDSjtBQUNJaEQsTUFBQUEsV0FBVyxFQUFDLFlBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGYjtBQUdJLGlCQUFTLENBSGI7QUFJSE4sTUFBQUEsWUFBWSxFQUFFO0FBSlgsS0FqS0M7QUF1S1IrQyxJQUFBQSxXQUFXLEVBQ0o7QUFDSWpELE1BQUFBLFdBQVcsRUFBQyxhQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRmI7QUFHSSxpQkFBUyxDQUhiO0FBSUhOLE1BQUFBLFlBQVksRUFBRTtBQUpYLEtBeEtDO0FBOEtSZ0QsSUFBQUEsV0FBVyxFQUNKO0FBQ0lsRCxNQUFBQSxXQUFXLEVBQUMsYUFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZiO0FBR0ksaUJBQVMsQ0FIYjtBQUlITixNQUFBQSxZQUFZLEVBQUU7QUFKWCxLQS9LQztBQXFMUmlELElBQUFBLGFBQWEsRUFDTjtBQUNJbkQsTUFBQUEsV0FBVyxFQUFDLGVBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGYjtBQUdJLGlCQUFTLENBSGI7QUFJSE4sTUFBQUEsWUFBWSxFQUFFO0FBSlgsS0F0TEM7QUE0TFJrRCxJQUFBQSxnQkFBZ0IsRUFDVDtBQUNJcEQsTUFBQUEsV0FBVyxFQUFDLGtCQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRmI7QUFHSSxpQkFBUyxDQUhiO0FBSUhOLE1BQUFBLFlBQVksRUFBRTtBQUpYLEtBN0xDO0FBbU1SbUQsSUFBQUEsZUFBZSxFQUNSO0FBQ0lyRCxNQUFBQSxXQUFXLEVBQUMsaUJBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGYjtBQUdJLGlCQUFTLENBSGI7QUFJSU4sTUFBQUEsWUFBWSxFQUFFO0FBSmxCLEtBcE1DO0FBeU1Sb0QsSUFBQUEsUUFBUSxFQUNEO0FBQ0l0RCxNQUFBQSxXQUFXLEVBQUMsVUFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZiO0FBR0ksaUJBQVMsS0FIYjtBQUlJVCxNQUFBQSxZQUFZLEVBQUU7QUFKbEI7QUExTUMsR0FGYztBQWtOMUJlLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUFFO0FBQ25CO0FBbk55QixDQUFULENBQWpCLEVBc05BO0FBRUE7QUFDQTs7QUFDQSxJQUFJc0MsV0FBVyxHQUFDLENBQWhCO0FBQ0EsSUFBSUMsUUFBUSxHQUFDLENBQWI7QUFDQSxJQUFJQyxRQUFRLEdBQUMsQ0FBYjtBQUNBLElBQUlDLFVBQVUsR0FBQyxLQUFmO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUMsSUFBN0I7QUFDQSxJQUFJQyxjQUFjLEdBQUMsRUFBbkI7QUFDQSxJQUFJQyxxQkFBcUIsR0FBQyxFQUExQjtBQUVBLElBQUlDLFlBQVksR0FBQyxLQUFqQjtBQUNBLElBQUlDLFlBQVksR0FBQyxLQUFqQixFQUVBOztBQUNBLElBQUlDLGtCQUFrQixHQUFDLEtBQXZCO0FBQ0EsSUFBSUMsYUFBYSxHQUFDLEtBQWxCO0FBQ0EsSUFBSUMsZUFBZSxHQUFDLEtBQXBCLEVBQTJCOztBQUMzQixJQUFJQyxpQkFBaUIsR0FBQyxLQUF0QixFQUE2Qjs7QUFDN0IsSUFBSUMsaUJBQWlCLEdBQUMsS0FBdEIsRUFBNkI7O0FBQzdCLElBQUlDLGlCQUFpQixHQUFDLEtBQXRCO0FBQ0EsSUFBSUMsY0FBYyxHQUFDLEtBQW5CO0FBRUEsSUFBSUMsVUFBVSxHQUFDLENBQWY7QUFDQSxJQUFJQyxVQUFVLEdBQUMsS0FBZjtBQUNBLElBQUlDLGdCQUFnQixHQUFDLENBQUMsQ0FBdEI7QUFDQSxJQUFJQyxZQUFZLEdBQ2hCLENBQ0ksd0NBREosRUFFSSwwQkFGSixFQUdJLDJCQUhKLEVBSUksd0NBSkosRUFLSSxnREFMSixDQURBO0FBU0EsSUFBSUMsb0JBQW9CLEdBQUMsSUFBekI7QUFFQSxJQUFJQyxXQUFXLEdBQUN2RixFQUFFLENBQUNNLEtBQUgsQ0FBUztBQUNyQkMsRUFBQUEsSUFBSSxFQUFDLGFBRGdCO0FBRXJCLGFBQVNQLEVBQUUsQ0FBQ3dGLFNBRlM7QUFHckJoRixFQUFBQSxVQUFVLEVBQUU7QUFDUmlGLElBQUFBLGNBQWMsRUFBRTtBQUNaLGlCQUFTLEVBREc7QUFFWjdFLE1BQUFBLElBQUksRUFBRSxDQUFDeUIsVUFBRCxDQUZNO0FBR1p4QixNQUFBQSxZQUFZLEVBQUUsSUFIRjtBQUlaQyxNQUFBQSxPQUFPLEVBQUU7QUFKRyxLQURSO0FBTVI0RSxJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxFQURBO0FBRVQ5RSxNQUFBQSxJQUFJLEVBQUUsQ0FBQ3lCLFVBQUQsQ0FGRztBQUdUeEIsTUFBQUEsWUFBWSxFQUFFLElBSEw7QUFJVEMsTUFBQUEsT0FBTyxFQUFFO0FBSkEsS0FOTDtBQVdSNkUsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVEsSUFEQTtBQUVSL0UsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUM0RixJQUZEO0FBR1IvRSxNQUFBQSxZQUFZLEVBQUUsSUFITjtBQUlSQyxNQUFBQSxPQUFPLEVBQUM7QUFKQSxLQVhKO0FBZ0JSK0UsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVEsSUFEQTtBQUVSakYsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUM0RixJQUZEO0FBR1IvRSxNQUFBQSxZQUFZLEVBQUUsSUFITjtBQUlSQyxNQUFBQSxPQUFPLEVBQUM7QUFKQSxLQWhCSjtBQXFCUmdGLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFRLEVBREM7QUFFVGxGLE1BQUFBLElBQUksRUFBRSxDQUFDWixFQUFFLENBQUM0RixJQUFKLENBRkc7QUFHVC9FLE1BQUFBLFlBQVksRUFBRSxJQUhMO0FBSVRDLE1BQUFBLE9BQU8sRUFBQztBQUpDLEtBckJMO0FBMEJSaUYsSUFBQUEsY0FBYyxFQUFFO0FBQ1osaUJBQVEsRUFESTtBQUVabkYsTUFBQUEsSUFBSSxFQUFFLENBQUNaLEVBQUUsQ0FBQzRGLElBQUosQ0FGTTtBQUdaL0UsTUFBQUEsWUFBWSxFQUFFLElBSEY7QUFJWkMsTUFBQUEsT0FBTyxFQUFDO0FBSkksS0ExQlI7QUErQlJrRixJQUFBQSxrQkFBa0IsRUFBRTtBQUNoQixpQkFBUSxFQURRO0FBRWhCcEYsTUFBQUEsSUFBSSxFQUFFLENBQUNaLEVBQUUsQ0FBQzRGLElBQUosQ0FGVTtBQUdoQi9FLE1BQUFBLFlBQVksRUFBRSxJQUhFO0FBSWhCQyxNQUFBQSxPQUFPLEVBQUM7QUFKUSxLQS9CWjtBQW9DUG1GLElBQUFBLFlBQVksRUFBRTtBQUNYLGlCQUFRLENBREc7QUFFWHJGLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGRTtBQUdYTixNQUFBQSxZQUFZLEVBQUUsSUFISDtBQUlYQyxNQUFBQSxPQUFPLEVBQUU7QUFKRTtBQXBDUCxHQUhTO0FBK0NyQm9GLEVBQUFBLE9BQU8sRUFBRTtBQUNMN0QsSUFBQUEsVUFBVSxFQUFFQSxVQURQO0FBRUxoQyxJQUFBQSxZQUFZLEVBQUNBLFlBRlI7QUFHTHdCLElBQUFBLHFCQUFxQixFQUFDQSxxQkFIakI7QUFJTDlCLElBQUFBLGdCQUFnQixFQUFDQSxnQkFKWjtBQUtMb0csSUFBQUEsUUFBUSxFQUFDO0FBTEosR0EvQ1k7QUF1RHJCQyxFQUFBQSxpQkF2RHFCLCtCQXdEckI7QUFDSS9HLElBQUFBLFdBQVcsR0FBRyxFQUFkO0FBQ0FDLElBQUFBLFdBQVcsR0FBRyxFQUFkO0FBQ0FDLElBQUFBLGlCQUFpQixHQUFHLENBQUMsQ0FBckI7QUFDQUMsSUFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxDQUFyQjtBQUVBQyxJQUFBQSxpQkFBaUIsR0FBRyxDQUFDLENBQXJCO0FBQ0FDLElBQUFBLGlCQUFpQixHQUFHLENBQUMsQ0FBckI7QUFFQUMsSUFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxDQUFyQjtBQUVBQyxJQUFBQSxZQUFZLEdBQUcsS0FBZjtBQUNBQyxJQUFBQSxXQUFXLEdBQUcsS0FBZDtBQUVBcUUsSUFBQUEsV0FBVyxHQUFDLENBQVo7QUFDQUMsSUFBQUEsUUFBUSxHQUFDLENBQVQ7QUFDQUMsSUFBQUEsUUFBUSxHQUFDLENBQVQ7QUFDQUMsSUFBQUEsVUFBVSxHQUFDLEtBQVg7QUFDQUMsSUFBQUEsd0JBQXdCLEdBQUMsSUFBekI7QUFDQUMsSUFBQUEsY0FBYyxHQUFDLEVBQWY7QUFDQUMsSUFBQUEscUJBQXFCLEdBQUMsRUFBdEI7QUFFQUMsSUFBQUEsWUFBWSxHQUFDLEtBQWI7QUFDQUMsSUFBQUEsWUFBWSxHQUFDLEtBQWIsQ0F2QkosQ0F5Qkk7O0FBQ0FDLElBQUFBLGtCQUFrQixHQUFDLEtBQW5CO0FBQ0FDLElBQUFBLGFBQWEsR0FBQyxLQUFkO0FBQ0FDLElBQUFBLGVBQWUsR0FBQyxLQUFoQixDQTVCSixDQTRCMkI7O0FBQ3ZCQyxJQUFBQSxpQkFBaUIsR0FBQyxLQUFsQixDQTdCSixDQTZCNkI7O0FBQ3pCQyxJQUFBQSxpQkFBaUIsR0FBQyxLQUFsQixDQTlCSixDQThCNkI7O0FBQ3pCQyxJQUFBQSxpQkFBaUIsR0FBQyxLQUFsQjtBQUNBQyxJQUFBQSxjQUFjLEdBQUMsS0FBZjtBQUVBQyxJQUFBQSxVQUFVLEdBQUMsQ0FBWDtBQUNBQyxJQUFBQSxVQUFVLEdBQUMsS0FBWDtBQUNBQyxJQUFBQSxnQkFBZ0IsR0FBQyxDQUFDLENBQWxCO0FBQ0FDLElBQUFBLFlBQVksR0FDWixDQUNJLHdDQURKLEVBRUksMEJBRkosRUFHSSwyQkFISixFQUlJLHdDQUpKLEVBS0ksZ0RBTEosQ0FEQTtBQVNBQyxJQUFBQSxvQkFBb0IsR0FBQyxJQUFyQjtBQUNBeEYsSUFBQUEsbUJBQW1CLEdBQUcsS0FBdEI7QUFFSCxHQXpHb0I7QUEyR3JCdUcsRUFBQUEsY0EzR3FCLDBCQTJHTkMsSUEzR00sRUE0R3JCO0FBQ0ksUUFBSWxILE9BQUosRUFBYTtBQUNUQyxNQUFBQSxXQUFXLEdBQUdpSCxJQUFkO0FBQ0g7QUFDSixHQWhIb0I7QUFrSHJCQyxFQUFBQSxjQWxIcUIsMEJBa0hORCxJQWxITSxFQW1IckI7QUFDSSxRQUFJbEgsT0FBSixFQUFhO0FBQ1RFLE1BQUFBLFdBQVcsR0FBR2dILElBQWQ7QUFDSDtBQUNKLEdBdkhvQjtBQXdIckI7O0FBRUE7Ozs7OztBQU1BRSxFQUFBQSxNQWhJcUIsb0JBZ0laO0FBQ0wsU0FBS0osaUJBQUw7QUFDQWIsSUFBQUEsV0FBVyxDQUFDWSxRQUFaLEdBQXFCLElBQXJCO0FBQ0EsU0FBS00sVUFBTCxHQUFnQixDQUFoQjtBQUNBLFNBQUtDLGFBQUwsR0FBbUIsS0FBbkI7QUFDQW5DLElBQUFBLGNBQWMsR0FBQyxFQUFmO0FBQ0EsU0FBS29DLGVBQUw7QUFDQSxTQUFLVixZQUFMLEdBQWtCM0Isd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEQyxlQUE5RCxFQUFsQjtBQUNBLFNBQUtDLGdCQUFMO0FBRUEsU0FBS0MsZUFBTCxHQUFxQixDQUFyQjtBQUNBLFNBQUtDLFdBQUwsR0FBaUIsQ0FBakI7QUFDQSxTQUFLQyxhQUFMLEdBQW1CLEtBQW5CO0FBQ0FqQyxJQUFBQSxpQkFBaUIsR0FBQyxLQUFsQjtBQUNILEdBOUlvQjs7QUFnSnJCOzs7Ozs7QUFNQTJCLEVBQUFBLGVBdEpxQiw2QkF1SnBCO0FBQ0csUUFBRyxDQUFDckMsd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFFLElBQTFELEVBQ0FBLHdCQUF3QixHQUFDNEMsT0FBTyxDQUFDLDBCQUFELENBQWhDO0FBQ0YsR0ExSm1COztBQTRKckI7Ozs7OztBQU1BSixFQUFBQSxnQkFsS3FCLDhCQWtLRDtBQUNoQixTQUFLSyxNQUFMLEdBQVksS0FBS3RCLFVBQUwsQ0FBZ0J1QixZQUFoQixDQUE2QnBILEVBQUUsQ0FBQ21ILE1BQWhDLENBQVo7QUFDQSxTQUFLRSxlQUFMLEdBQXFCLEtBQXJCO0FBQ0EsU0FBSzVCLGNBQUwsR0FBb0IsRUFBcEI7QUFDQXZCLElBQUFBLFdBQVcsR0FBQyxDQUFaO0FBQ0FDLElBQUFBLFFBQVEsR0FBQyxDQUFUO0FBQ0FDLElBQUFBLFFBQVEsR0FBQyxDQUFUO0FBRUFrRCxJQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxLQUFLdEIsWUFBbkI7O0FBQ0EsUUFBRyxLQUFLQSxZQUFMLElBQW1CLENBQXRCLEVBQXlCO0FBQ3pCO0FBQ0k7QUFDQSxZQUFHM0Isd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEWSxhQUE5RCxNQUErRSxJQUFsRixFQUNBO0FBQ0lGLFVBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLHNDQUFvQ25ELHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGQyxpQkFBdEYsQ0FBd0csY0FBeEcsQ0FBaEQsRUFESixDQUVJOztBQUNBLGNBQUd0RCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERjLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRkMsaUJBQXRGLENBQXdHLGNBQXhHLEtBQXlILElBQTVILEVBQ0E7QUFDSXRELFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMERDLG9DQUExRCxDQUErRixJQUEvRjtBQUNBLGdCQUFJQyxPQUFPLEdBQUN6RCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERjLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRkMsaUJBQXRGLENBQXdHLGdCQUF4RyxDQUFaO0FBQ0EsaUJBQUtuQyxjQUFMLEdBQW9Cc0MsT0FBcEI7QUFFQVQsWUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksS0FBS2hDLGNBQWpCO0FBRUFuQixZQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERvQixVQUE5RCxHQUF5RSxLQUFLdkMsY0FBTCxDQUFvQndDLE1BQTdGLENBUEosQ0FRSTs7QUFDQSxpQkFBS0MsMkJBQUw7QUFDQSxpQkFBS3pCLFVBQUwsR0FBZ0JuQyx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERjLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRkMsaUJBQXRGLENBQXdHLFlBQXhHLENBQWhCO0FBQ0EsaUJBQUtPLFlBQUwsQ0FBa0IsSUFBbEIsRUFBdUIsS0FBSzFCLFVBQTVCO0FBQ0gsV0FiRCxNQWVBO0FBQ0k7QUFDQW5DLFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMERDLG9DQUExRCxDQUErRixJQUEvRjtBQUNBeEQsWUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRE8sMEJBQTFEO0FBQ0g7QUFDSixTQXhCRCxNQTBCQTtBQUNJOUQsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRFEsOEJBQTFELENBQXlGLElBQXpGLEVBQThGLEtBQTlGLEVBQW9HLEtBQUtwQyxZQUF6RztBQUNIO0FBQ0osT0FoQ0QsTUFnQ00sSUFBRyxLQUFLQSxZQUFMLElBQW1CLENBQXRCLEVBQXlCO0FBQy9CO0FBQ0kzQixRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEUSw4QkFBMUQsQ0FBeUYsSUFBekYsRUFBOEYsS0FBOUYsRUFBb0csS0FBS3BDLFlBQXpHO0FBQ0g7QUFDSixHQS9Nb0I7QUFpTnJCO0FBQ0FxQyxFQUFBQSxhQWxOcUIsMkJBa05KO0FBQ2IsV0FBTyxLQUFLN0IsVUFBWjtBQUNILEdBcE5vQjtBQXNOckI4QixFQUFBQSxVQXROcUIsd0JBdU5yQjtBQUNJLFFBQUlDLE9BQU8sR0FBRyxDQUFkO0FBQ0EsUUFBSUMsTUFBTSxHQUFHbkUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RkMsaUJBQTFHO0FBQ0EsUUFBSUMsVUFBVSxHQUFHLEtBQUtwRCxjQUF0Qjs7QUFFQSxTQUFLLElBQUlxRCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR0QsVUFBVSxDQUFDWixNQUF2QyxFQUErQ2EsS0FBSyxFQUFwRCxFQUF3RDtBQUN0RCxVQUFJTCxNQUFNLENBQUNsRyxTQUFQLElBQW9Cc0csVUFBVSxDQUFDQyxLQUFELENBQVYsQ0FBa0J2RyxTQUExQyxFQUNBO0FBQ0lpRyxRQUFBQSxPQUFPLEdBQUdNLEtBQVY7QUFDQTtBQUNIO0FBQ0Y7O0FBRUQsV0FBT04sT0FBUDtBQUNILEdBck9vQjtBQXNPckI7QUFFQTtBQUVBTixFQUFBQSwyQkExT3FCLHlDQTJPckI7QUFDSSxRQUFJSCxPQUFPLEdBQUN6RCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERjLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRkMsaUJBQXRGLENBQXdHLGdCQUF4RyxDQUFaO0FBQ0FOLElBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjUSxPQUFkO0FBQ0EsU0FBS3RDLGNBQUwsR0FBc0JzQyxPQUF0QjtBQUNBLFNBQUtnQix3QkFBTCxDQUE4QixDQUE5QjtBQUNBekUsSUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEb0IsVUFBOUQsR0FBeUUsS0FBS3ZDLGNBQUwsQ0FBb0J3QyxNQUE3RjtBQUNBLFNBQUtlLGtCQUFMO0FBQ0EsU0FBS0MsaUJBQUw7QUFDQTNFLElBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMERxQiwrQkFBMUQ7O0FBR0EsU0FBSyxJQUFJSixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLckQsY0FBTCxDQUFvQndDLE1BQWhELEVBQXdEYSxLQUFLLEVBQTdELEVBQWlFO0FBQzdELFVBQUksS0FBS3JELGNBQUwsQ0FBb0JxRCxLQUFwQixFQUEyQnRGLGlCQUEzQixHQUErQyxDQUEvQyxJQUFvRCxLQUFLaUMsY0FBTCxDQUFvQnFELEtBQXBCLEVBQTJCckYsc0JBQTNCLElBQW1ELElBQXZHLElBQStHLENBQUMsS0FBS2dDLGNBQUwsQ0FBb0JxRCxLQUFwQixFQUEyQnBGLGNBQS9JLEVBQStKO0FBQzNKLFlBQUl5RixNQUFNLEdBQUduSixFQUFFLENBQUNvSixJQUFILENBQVE5RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDa0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRCxLQUFLN0QsY0FBTCxDQUFvQnFELEtBQXBCLEVBQTJCdEYsaUJBQXJGLEVBQXdHK0YsaUJBQXhHLENBQTBIQyxRQUExSCxDQUFtSUMsQ0FBM0ksRUFBOEluRix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDa0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRCxLQUFLN0QsY0FBTCxDQUFvQnFELEtBQXBCLEVBQTJCdEYsaUJBQXJGLEVBQXdHK0YsaUJBQXhHLENBQTBIQyxRQUExSCxDQUFtSUUsQ0FBalIsQ0FBYjs7QUFDQSxhQUFLM0QsY0FBTCxDQUFvQitDLEtBQXBCLEVBQTJCYSxXQUEzQixDQUF1Q1IsTUFBTSxDQUFDTSxDQUE5QyxFQUFpRE4sTUFBTSxDQUFDTyxDQUF4RDtBQUNIOztBQUVELFVBQUksS0FBS2pFLGNBQUwsQ0FBb0JxRCxLQUFwQixFQUEyQnBGLGNBQS9CLEVBQ0E7QUFDSSxZQUFJa0csVUFBVSxHQUFHdEYsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ2tELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyQixNQUExRCxHQUFtRSxDQUFwRjs7QUFDQSxZQUFJa0IsTUFBTSxHQUFHbkosRUFBRSxDQUFDb0osSUFBSCxDQUFROUUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ2tELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERNLFVBQTFELEVBQXNFTCxpQkFBdEUsQ0FBd0ZDLFFBQXhGLENBQWlHQyxDQUF6RyxFQUE0R25GLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NrRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBETSxVQUExRCxFQUFzRUwsaUJBQXRFLENBQXdGQyxRQUF4RixDQUFpR0UsQ0FBN00sQ0FBYjs7QUFDQSxhQUFLM0QsY0FBTCxDQUFvQitDLEtBQXBCLEVBQTJCYSxXQUEzQixDQUF1Q1IsTUFBTSxDQUFDTSxDQUE5QyxFQUFpRE4sTUFBTSxDQUFDTyxDQUF4RDtBQUNIO0FBQ0o7O0FBRURwQyxJQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSxvQkFBWjs7QUFFQSxTQUFLLElBQUlxQixPQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE9BQUssR0FBR3hFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RG9CLFVBQTFGLEVBQXNHYyxPQUFLLEVBQTNHLEVBQStHO0FBQzNHLFdBQUsvQyxjQUFMLENBQW9CK0MsT0FBcEIsRUFBMkJlLE1BQTNCLEdBQWtDLElBQWxDO0FBQ0g7QUFDSixHQXpRb0I7QUEyUXJCQyxFQUFBQSx3Q0EzUXFCLHNEQTRRckI7QUFDRSxRQUFJQyxxQkFBcUIsR0FBQ3pGLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkVzQyxnQkFBN0UsRUFBMUI7O0FBQ0EsUUFBR3pGLGNBQWMsQ0FBQzBELE1BQWYsSUFBdUI4QixxQkFBMUIsRUFDQTtBQUNFeEYsTUFBQUEsY0FBYyxHQUFDLEVBQWY7QUFDQSxXQUFLbUMsYUFBTCxHQUFtQixJQUFuQjs7QUFFQSxVQUFHLEtBQUtqQixjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2xFLFNBQXJDLElBQWdEK0Isd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXJKLEVBQ0E7QUFDSSxhQUFLeEUsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNqRCxpQkFBckMsR0FBdURVLFdBQXZEO0FBQ0FJLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDhCLFdBQTlELEdBQTRFd0IsaUJBQTVFLENBQThGLG1CQUE5RixFQUFtSCxLQUFLekUsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsQ0FBbkg7QUFDQSxhQUFLMEQsVUFBTDtBQUNBN0MsUUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVluRCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQ4QixXQUE5RCxFQUFaO0FBQ0FwQixRQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSwrQkFBNkIsS0FBS2hDLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDbkUsVUFBOUU7QUFDSDtBQUNGO0FBRUYsR0E3Um9CO0FBK1JyQjtBQUdBOztBQUVEOzs7Ozs7QUFNRDhILEVBQUFBLGlCQTFTdUIsNkJBMFNMQyxLQTFTSyxFQTJTdkI7QUFDTS9GLElBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NtRSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTRFRixLQUE1RTtBQUNMLEdBN1NzQjtBQStTdkJHLEVBQUFBLG1CQS9TdUIsaUNBZ1R2QjtBQUNFQyxJQUFBQSxZQUFZLENBQUNuRixvQkFBRCxDQUFaO0FBQ0QsR0FsVHNCO0FBb1R2Qm9GLEVBQUFBLG1CQXBUdUIsaUNBcVR2QjtBQUFBOztBQUNJLFFBQUcsS0FBS3pFLFlBQUwsSUFBbUIsQ0FBdEIsRUFBeUI7QUFDekI7QUFDRXFCLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjdkMsaUJBQWQ7O0FBQ0EsWUFBR0EsaUJBQWlCLElBQUUsSUFBdEIsRUFDQTtBQUNJeUYsVUFBQUEsWUFBWSxDQUFDbkYsb0JBQUQsQ0FBWjtBQUNBZ0MsVUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsS0FBS1AsV0FBbkI7QUFDQWhDLFVBQUFBLGlCQUFpQixHQUFDLEtBQWxCOztBQUNBLGNBQUcsQ0FBQyxLQUFLaUMsYUFBVCxFQUNBO0FBQ0ksaUJBQUtBLGFBQUwsR0FBbUIsSUFBbkI7QUFDQTNDLFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NrRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBELEtBQUt0QyxXQUEvRCxFQUE0RXVDLGlCQUE1RSxDQUE4Rm5DLFlBQTlGLENBQTJHLGNBQTNHLEVBQTJIdUQsZUFBM0gsQ0FBMkksS0FBM0ksRUFBaUosS0FBSzVELGVBQXRKO0FBQ0g7QUFDSixTQVZELE1BWUE7QUFDSXpCLFVBQUFBLG9CQUFvQixHQUFDc0YsVUFBVSxDQUFDLFlBQU07QUFBRTtBQUNwQyxZQUFBLEtBQUksQ0FBQ0YsbUJBQUw7QUFDSCxXQUY4QixFQUU1QixHQUY0QixDQUEvQjtBQUdIO0FBQ0Y7QUFDSixHQTNVc0I7QUE2VXZCRyxFQUFBQSxnQkE3VXVCLDhCQThVdkI7QUFDRSxTQUFLNUQsYUFBTCxHQUFtQixLQUFuQjtBQUNELEdBaFZzQjtBQWtWdkI2RCxFQUFBQSxtQkFsVnVCLCtCQWtWSFQsS0FsVkcsRUFtVnZCO0FBRUUsU0FBSzFELGVBQUw7QUFDQVcsSUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVk0QyxLQUFaO0FBRUEsUUFBSVUsVUFBVSxHQUFDVixLQUFLLENBQUNXLFVBQXJCO0FBQ0EsUUFBSUMsT0FBTyxHQUFDWixLQUFLLENBQUNZLE9BQWxCO0FBRUEsU0FBS2xFLGVBQUwsR0FBcUJnRSxVQUFyQjtBQUNBLFNBQUsvRCxXQUFMLEdBQWlCaUUsT0FBakI7QUFHQTNELElBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjdkMsaUJBQWQ7O0FBRUEsUUFBRyxLQUFLaUIsWUFBTCxJQUFtQixDQUF0QixFQUNBO0FBQ0ksVUFBRyxLQUFLUixjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2xFLFNBQXJDLElBQWdEK0Isd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXJKLEVBQ0kzRix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDa0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRDJCLE9BQTFELEVBQW1FMUIsaUJBQW5FLENBQXFGbkMsWUFBckYsQ0FBa0csY0FBbEcsRUFBa0h1RCxlQUFsSCxDQUFrSSxJQUFsSSxFQUF1SUksVUFBdkksRUFESixLQUdJL0YsaUJBQWlCLEdBQUMsSUFBbEI7QUFDUCxLQU5ELE1BTU0sSUFBRyxLQUFLaUIsWUFBTCxJQUFtQixDQUF0QixFQUNOO0FBQ0ksVUFBRyxLQUFLUixjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2hFLEtBQXJDLElBQTRDLEtBQS9DLEVBQ0k2Qix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDa0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRDJCLE9BQTFELEVBQW1FMUIsaUJBQW5FLENBQXFGbkMsWUFBckYsQ0FBa0csY0FBbEcsRUFBa0h1RCxlQUFsSCxDQUFrSSxJQUFsSSxFQUF1SUksVUFBdkksRUFESixLQUdJekcsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ2tELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMEQyQixPQUExRCxFQUFtRTFCLGlCQUFuRSxDQUFxRm5DLFlBQXJGLENBQWtHLGNBQWxHLEVBQWtIdUQsZUFBbEgsQ0FBa0ksS0FBbEksRUFBd0lJLFVBQXhJLEVBQW1KLElBQW5KO0FBQ1A7O0FBRUR6RCxJQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBY3ZDLGlCQUFkO0FBR0QsR0FsWHNCOztBQW9YdEI7Ozs7OztBQU1Ea0csRUFBQUEsc0JBMVh1QixvQ0EyWHZCO0FBQ0ksUUFBRyxLQUFLakYsWUFBTCxJQUFtQixDQUF0QixFQUNBO0FBQ0UsVUFBRzNCLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDhCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZ3QyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBd0gsS0FBM0gsRUFDQTtBQUNJOUcsUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21FLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNEVqRyx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQ4QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGVyxJQUE3RixDQUFrR1csTUFBOUs7QUFDSDtBQUNGLEtBTkQsTUFNTSxJQUFHLEtBQUtoRSxZQUFMLElBQW1CLENBQXRCLEVBQ047QUFDSXFCLE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJCQUFkO0FBQ0ZqRCxNQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE0RSxLQUFLOUUsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNsRSxTQUFqSDtBQUNEO0FBQ0osR0F2WXNCO0FBMFl2QjhJLEVBQUFBLFdBMVl1Qix5QkEyWXZCO0FBQ0UsUUFBRyxLQUFLNUYsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNsRSxTQUFyQyxJQUFnRCtCLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDhCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZXLElBQTdGLENBQWtHVyxNQUFySixFQUNBO0FBQ0kzRixNQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQ4QixXQUE5RCxHQUE0RXdCLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUgsS0FBS3pFLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLENBQW5IO0FBQ0g7QUFDSixHQWhad0I7O0FBa1p2Qjs7Ozs7O0FBTUE2RSxFQUFBQSx3QkF4WnVCLG9DQXdaRUMsSUF4WkYsRUF5WnZCO0FBQ0ksUUFBRyxLQUFLdEYsWUFBTCxJQUFtQixDQUF0QixFQUF3QjtBQUN4QjtBQUNFLFlBQUczQix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQ4QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGd0MsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQXdILEtBQTNILEVBQ0E7QUFDSTlELFVBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZbEQsY0FBYyxDQUFDMEQsTUFBM0I7QUFFQSxjQUFHMUQsY0FBYyxDQUFDMEQsTUFBZixJQUF1QixDQUExQixFQUNRMUQsY0FBYyxDQUFDaUgsSUFBZixDQUFvQkQsSUFBcEI7QUFFUixjQUFJRSxXQUFXLEdBQUNsSCxjQUFjLENBQUMwRCxNQUEvQjtBQUNBLGNBQUl5RCxPQUFPLEdBQUMsS0FBWjs7QUFDQSxlQUFLLElBQUk1QyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRzJDLFdBQTVCLEVBQXlDM0MsS0FBSyxFQUE5QyxFQUFrRDtBQUMxQyxnQkFBR3ZFLGNBQWMsQ0FBQ3VFLEtBQUQsQ0FBZCxJQUF1QnlDLElBQTFCLEVBQ0FHLE9BQU8sR0FBQyxJQUFSO0FBQ1A7O0FBRUQsY0FBRyxDQUFDQSxPQUFKLEVBQ0E7QUFDSW5ILFlBQUFBLGNBQWMsQ0FBQ2lILElBQWYsQ0FBb0JELElBQXBCO0FBQ0g7O0FBQ0RqRSxVQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWWxELGNBQVo7QUFDQStDLFVBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZbEQsY0FBYyxDQUFDMEQsTUFBM0IsRUFsQkosQ0FvQkk7O0FBQ0EsY0FBSThCLHFCQUFxQixHQUFDLEtBQUt0RSxjQUFMLENBQW9Cd0MsTUFBOUM7O0FBQ0EsY0FBRzFELGNBQWMsQ0FBQzBELE1BQWYsSUFBdUI4QixxQkFBMUIsRUFDQTtBQUNJeEYsWUFBQUEsY0FBYyxHQUFDLEVBQWY7QUFDQSxpQkFBS21DLGFBQUwsR0FBbUIsSUFBbkI7O0FBRUEsZ0JBQUcsS0FBS2pCLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDbEUsU0FBckMsSUFBZ0QrQix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQ4QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGVyxJQUE3RixDQUFrR1csTUFBckosRUFDQTtBQUNJLG1CQUFLeEUsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNqRCxpQkFBckMsR0FBdURVLFdBQXZELENBREosQ0FFSTs7QUFDQSxtQkFBS2lHLFVBQUw7QUFDQTdDLGNBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZbkQsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsRUFBWjtBQUNBcEIsY0FBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksK0JBQTZCLEtBQUtoQyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ25FLFVBQTlFO0FBQ0g7QUFDSjtBQUNKO0FBQ0EsT0F4Q0gsTUF3Q1EsSUFBRyxLQUFLMkQsWUFBTCxJQUFtQixDQUF0QixFQUNOO0FBQ0ksV0FBS1MsYUFBTCxHQUFtQixJQUFuQjtBQUNBLFdBQUtqQixjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2pELGlCQUFyQyxHQUF1RFUsV0FBdkQ7QUFDQSxXQUFLaUcsVUFBTDtBQUNIO0FBQ04sR0F4Y3NCOztBQTBjdEI7Ozs7OztBQU1DQSxFQUFBQSxVQWhkcUIsd0JBaWRyQjtBQUNJLFFBQUcsS0FBS2xFLFlBQUwsSUFBbUIsQ0FBdEIsRUFDQTtBQUNJLFdBQUtvRixXQUFMO0FBQ0g7O0FBRUQsUUFBRyxLQUFLNUUsVUFBTCxHQUFnQixLQUFLaEIsY0FBTCxDQUFvQndDLE1BQXBCLEdBQTJCLENBQTlDLEVBQ0ksS0FBS3hCLFVBQUwsR0FBZ0IsS0FBS0EsVUFBTCxHQUFnQixDQUFoQyxDQURKLEtBR0ksS0FBS0EsVUFBTCxHQUFnQixDQUFoQjtBQUVKbkMsSUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21FLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNEUsS0FBSzlELFVBQWpGO0FBQ0gsR0E3ZG9CO0FBK2RyQmtGLEVBQUFBLGdCQS9kcUIsOEJBZ2VyQjtBQUNJLFNBQUssSUFBSTdDLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUtoRCxXQUFMLENBQWlCbUMsTUFBN0MsRUFBcURhLEtBQUssRUFBMUQsRUFBOEQ7QUFDMUQsV0FBS2hELFdBQUwsQ0FBaUJnRCxLQUFqQixFQUF3QjFCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHdFLHdCQUE3RDtBQUNIO0FBQ0osR0FwZW9COztBQXNlckI7Ozs7OztBQU1BQyxFQUFBQSxXQTVlcUIsdUJBNGVUQyxLQTVlUyxFQTZlckI7QUFBQTs7QUFDSSxTQUFLSCxnQkFBTDtBQUNBckUsSUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsV0FBU3VFLEtBQXZCO0FBQ0EsUUFBSUMsY0FBYyxHQUFDLEtBQW5CO0FBQ0FuSCxJQUFBQSxhQUFhLEdBQUMsS0FBZDs7QUFDQSxRQUFHUCxVQUFILEVBQWU7QUFDZjtBQUNJLFlBQUdDLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDhCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZ3QyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBd0gsSUFBM0gsRUFDQTtBQUNJL0csVUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDSDs7QUFFRGlELFFBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLE1BQVo7QUFDQW1ELFFBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsVUFBQSxNQUFJLENBQUNpQixXQUFMLENBQWlCQyxLQUFqQjtBQUNILFNBRlMsRUFFUCxHQUZPLENBQVY7QUFHSCxPQVhELE1BYUE7QUFDSSxXQUFLckYsVUFBTCxHQUFnQnFGLEtBQWhCOztBQUNBLFVBQUcsS0FBSzdGLFlBQUwsSUFBbUIsQ0FBdEIsRUFDQTtBQUNJLFlBQUcsS0FBS1IsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNsRSxTQUFyQyxJQUFnRCtCLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDhCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZXLElBQTdGLENBQWtHVyxNQUFySixFQUNBO0FBQ0k4QixVQUFBQSxjQUFjLEdBQUMsSUFBZjtBQUNBbkgsVUFBQUEsYUFBYSxHQUFDLEtBQUthLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDOUQsaUJBQXJDLENBQXVEWixZQUFyRTs7QUFDQSxjQUFJLENBQUMsS0FBSzBELGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDL0MsY0FBMUMsRUFBMEQ7QUFDdEQsaUJBQUtzSSxrQkFBTCxDQUF3QixJQUF4Qjs7QUFDQSxnQkFBSSxDQUFDcEgsYUFBTCxFQUFvQjtBQUNoQmdHLGNBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2J0RyxnQkFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRG9FLDJCQUExRCxDQUFzRixJQUF0RjtBQUNBM0gsZ0JBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMERxRSxpQkFBMUQ7QUFDSCxlQUhTLEVBR1AsSUFITyxDQUFWO0FBSUE1RSxjQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSxtQkFBbUIsS0FBS2hDLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDbkUsVUFBcEU7QUFDSDtBQUNKO0FBQ0osU0FkRCxNQWdCQTtBQUNJLGVBQUswSixrQkFBTCxDQUF3QixLQUF4QjtBQUNIO0FBRUosT0F0QkQsTUFzQk0sSUFBRyxLQUFLL0YsWUFBTCxJQUFtQixDQUF0QixFQUNOO0FBQ0lxQixRQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSxLQUFLaEMsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNoRSxLQUFqRDtBQUNBNkUsUUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksS0FBS2hDLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDOUQsaUJBQXJDLENBQXVEWixZQUFuRTtBQUNBdUYsUUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVk3SCxZQUFaOztBQUNBLFlBQUcsS0FBSzZGLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDaEUsS0FBckMsSUFBNEMsS0FBL0MsRUFDQTtBQUNJc0osVUFBQUEsY0FBYyxHQUFHLElBQWpCO0FBQ0FuSCxVQUFBQSxhQUFhLEdBQUcsS0FBS2EsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUM5RCxpQkFBckMsQ0FBdURaLFlBQXZFOztBQUNBLGNBQUksQ0FBQ25DLFlBQUwsRUFBbUI7QUFDZixpQkFBS29NLGtCQUFMLENBQXdCLElBQXhCOztBQUNBLGdCQUFJLENBQUNwSCxhQUFMLEVBQW9CO0FBQ2hCZ0csY0FBQUEsVUFBVSxDQUFDLFlBQU07QUFDYnRHLGdCQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEb0UsMkJBQTFELENBQXNGLElBQXRGO0FBQ0EzSCxnQkFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRHFFLGlCQUExRDtBQUNILGVBSFMsRUFHUCxJQUhPLENBQVY7QUFJQTVFLGNBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLG1CQUFtQixLQUFLaEMsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNuRSxVQUFwRTtBQUNIO0FBQ0o7QUFDSixTQWRELE1BZUk7QUFDSjtBQUNJeUosWUFBQUEsY0FBYyxHQUFHLElBQWpCO0FBQ0FuSCxZQUFBQSxhQUFhLEdBQUcsS0FBS2EsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUM5RCxpQkFBckMsQ0FBdURaLFlBQXZFOztBQUNBLGdCQUFJLENBQUNsQyxXQUFMLEVBQWtCO0FBQ2QsbUJBQUttTSxrQkFBTCxDQUF3QixLQUF4Qjs7QUFDQSxrQkFBSSxDQUFDcEgsYUFBTCxFQUFvQjtBQUNoQmdHLGdCQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLGtCQUFBLE1BQUksQ0FBQ3VCLFFBQUw7QUFDSCxpQkFGUyxFQUVQLElBRk8sQ0FBVjtBQUdIO0FBQ0o7QUFDSjtBQUNKOztBQUVELFdBQUtoRSxZQUFMLENBQWtCLElBQWxCLEVBQXVCLEtBQUsxQixVQUE1Qjs7QUFFQSxXQUFLLElBQUlxQyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLaEQsV0FBTCxDQUFpQm1DLE1BQTdDLEVBQXFEYSxLQUFLLEVBQTFELEVBQThEO0FBQzFELGFBQUtoRCxXQUFMLENBQWlCZ0QsS0FBakIsRUFBd0IxQixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkRnRixjQUE3RCxDQUE0RXZDLE1BQTVFLEdBQW1GLEtBQW5GO0FBQ0EsYUFBSy9ELFdBQUwsQ0FBaUJnRCxLQUFqQixFQUF3QjFCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHdFLHdCQUE3RDtBQUNIOztBQUdELFVBQUcsS0FBSzNGLFlBQUwsSUFBbUIsQ0FBdEIsRUFBd0I7QUFDeEI7QUFDSTNCLFVBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGdUMsaUJBQXRGLENBQXdHLFlBQXhHLEVBQXFILEtBQUt6RCxVQUExSCxFQUFxSSxJQUFySTtBQUNBYSxVQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSxjQUFZLEtBQUtoQyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ25FLFVBQTdEO0FBQ0FnRixVQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSxLQUFLM0IsV0FBTCxDQUFpQixLQUFLVyxVQUF0QixFQUFrQ1csWUFBbEMsQ0FBK0Msc0JBQS9DLEVBQXVFaUYsVUFBbkY7QUFDQS9FLFVBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZbkQsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsRUFBWjtBQUNBcEIsVUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVluRCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQwRixVQUE5RCxFQUFaO0FBQ0EsZUFBS3ZELHdCQUFMLENBQThCLENBQTlCLEVBTkosQ0FTSTs7QUFDQSxjQUFHekUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RndDLGNBQTdGLENBQTRHQyxVQUE1RyxJQUF3SCxJQUEzSCxFQUNJLEtBQUtsRCwyQkFBTDtBQUNQLFNBaEZMLENBa0ZJOzs7QUFDQSxVQUFHNkQsY0FBYyxJQUFJbkgsYUFBckIsRUFDQTtBQUNJUCxRQUFBQSxVQUFVLEdBQUMsS0FBWDtBQUNBQyxRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEMEUsU0FBMUQsQ0FBb0UsdUJBQXBFLEVBQTRGLElBQTVGO0FBQ0EsYUFBS0Msa0JBQUwsQ0FBd0IsS0FBeEI7QUFDQSxhQUFLckMsVUFBTDtBQUNBLGFBQUs2QixrQkFBTCxDQUF3QixLQUF4QjtBQUNIOztBQUVELFVBQUdELGNBQWMsSUFBSSxLQUFLdEcsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUMvQyxjQUExRCxFQUNBO0FBQ0lrSCxRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNidkcsVUFBQUEsVUFBVSxHQUFDLEtBQVg7O0FBQ0EsVUFBQSxNQUFJLENBQUM4RixVQUFMOztBQUNBLFVBQUEsTUFBSSxDQUFDNkIsa0JBQUwsQ0FBd0IsS0FBeEI7QUFDSCxTQUpTLEVBSVAsR0FKTyxDQUFWO0FBTUg7QUFFSjtBQUNKLEdBdG1Cb0I7QUF3bUJyQmpELEVBQUFBLHdCQXhtQnFCLG9DQXdtQkkwRCxJQXhtQkosRUF5bUJyQjtBQUNJLFFBQUlDLGVBQWUsR0FBQ3BJLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDBGLFVBQTlELEVBQXBCO0FBQ0EsUUFBSUssTUFBTSxHQUFDckksd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsRUFBWDtBQUNBLFFBQUlrRSxRQUFRLEdBQUNILElBQWI7QUFDQW5GLElBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLEtBQUtoQyxjQUFMLENBQW9CbUgsUUFBcEIsRUFBOEJySyxTQUExQztBQUNBK0UsSUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVlrRixNQUFNLENBQUNoRSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDckcsU0FBdEQsRUFMSixDQU1JO0FBQ0Q7O0FBQ0ssU0FBSyxJQUFJdUcsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUc0RCxlQUFlLENBQUN6RSxNQUE1QyxFQUFvRGEsS0FBSyxFQUF6RCxFQUE2RDtBQUNyRCxVQUFHLEtBQUtyRCxjQUFMLENBQW9CbUgsUUFBcEIsRUFBOEJySyxTQUE5QixJQUF5Q21LLGVBQWUsQ0FBQzVELEtBQUQsQ0FBZixDQUF1QkgsZ0JBQXZCLENBQXdDQyxpQkFBeEMsQ0FBMERyRyxTQUF0RyxFQUNBO0FBQ0ksYUFBS2tELGNBQUwsQ0FBb0JtSCxRQUFwQixJQUE4QkYsZUFBZSxDQUFDNUQsS0FBRCxDQUFmLENBQXVCSCxnQkFBdkIsQ0FBd0NDLGlCQUF0RTs7QUFFQSxZQUFHZ0UsUUFBUSxHQUFDLEtBQUtuSCxjQUFMLENBQW9Cd0MsTUFBcEIsR0FBMkIsQ0FBdkMsRUFDQTtBQUNJMkUsVUFBQUEsUUFBUTtBQUNSdEYsVUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVkscUJBQW1CbUYsUUFBL0I7QUFDQSxlQUFLN0Qsd0JBQUwsQ0FBOEI2RCxRQUE5QjtBQUNILFNBTEQsTUFNSTtBQUNBdEYsVUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksS0FBS2hDLGNBQWpCO0FBQ0g7QUFDSjtBQUNKLEtBdkJiLENBd0JJO0FBQ0Q7QUFDSztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNQLEdBOW9Cb0I7O0FBZ3BCckI7Ozs7OztBQU1Bb0gsRUFBQUEsU0F0cEJxQix1QkF1cEJyQjtBQUNJdkYsSUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksS0FBS2hDLGNBQWpCO0FBQ0EsU0FBS3VELGtCQUFMO0FBQ0EsU0FBS0MsaUJBQUw7QUFDQSxTQUFLeEMsVUFBTCxHQUFnQixDQUFoQixDQUpKLENBSXVCO0FBRW5COztBQUNBbkMsSUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ21FLDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNEUsS0FBSzlELFVBQWpGO0FBSUgsR0FscUJvQjtBQW9xQnJCcUcsRUFBQUEsbUJBcHFCcUIsK0JBb3FCRHpDLEtBcHFCQyxFQXFxQnJCO0FBQ0k7QUFDQSxRQUFJMEMsYUFBYSxHQUFDMUMsS0FBSyxDQUFDZixJQUFOLENBQVcwRCxVQUE3QjtBQUNBLFFBQUlsQixLQUFLLEdBQUN6QixLQUFLLENBQUNmLElBQU4sQ0FBVzJELElBQXJCO0FBQ0EsUUFBSUMsV0FBVyxHQUFDN0MsS0FBSyxDQUFDZixJQUFOLENBQVc2RCxjQUEzQjtBQUVBN0YsSUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVk0QyxLQUFaLEVBTkosQ0FPSTtBQUNBO0FBQ0E7O0FBRUEsU0FBSzVFLGNBQUwsQ0FBb0JxRyxLQUFwQixJQUEyQm9CLFdBQTNCO0FBRUEsU0FBS2xFLGtCQUFMLENBQXdCLElBQXhCO0FBQ0EsU0FBS0MsaUJBQUwsQ0FBdUIsSUFBdkI7QUFFQSxTQUFLZCxZQUFMLENBQWtCLElBQWxCLEVBQXVCLEtBQUsxQixVQUE1Qjs7QUFFQSxTQUFLLElBQUlxQyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLaEQsV0FBTCxDQUFpQm1DLE1BQTdDLEVBQXFEYSxLQUFLLEVBQTFELEVBQThEO0FBQzFELFdBQUtoRCxXQUFMLENBQWlCZ0QsS0FBakIsRUFBd0IxQixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkRnRixjQUE3RCxDQUE0RXZDLE1BQTVFLEdBQXFGLEtBQXJGO0FBQ0EsV0FBSy9ELFdBQUwsQ0FBaUJnRCxLQUFqQixFQUF3QjFCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHdFLHdCQUE3RDtBQUNIOztBQUVELFFBQUcsS0FBSzNGLFlBQUwsSUFBbUIsQ0FBdEIsRUFBd0I7QUFDeEI7QUFDSTNCLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGdUMsaUJBQXRGLENBQXdHLFlBQXhHLEVBQXFILEtBQUt6RCxVQUExSCxFQUFxSSxJQUFySTtBQUNBLGFBQUtzQyx3QkFBTCxDQUE4QixDQUE5QixFQUZKLENBSUk7O0FBQ0EsWUFBR3pFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDhCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZ3QyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBd0gsSUFBM0gsRUFDSSxLQUFLbEQsMkJBQUw7QUFDUDtBQUNKLEdBcnNCb0I7QUF1c0JyQmtGLEVBQUFBLHNCQXZzQnFCLG9DQXdzQnJCO0FBQ0ksU0FBS3BFLGtCQUFMLENBQXdCLElBQXhCO0FBQ0EsU0FBS0MsaUJBQUwsQ0FBdUIsSUFBdkI7QUFDQTJCLElBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2J0RyxNQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEb0UsMkJBQTFELENBQXNGLElBQXRGO0FBQ0EzSCxNQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEcUUsaUJBQTFEO0FBQ0gsS0FIUyxFQUdQLElBSE8sQ0FBVjtBQUtBLFNBQUsvRCxZQUFMLENBQWtCLElBQWxCLEVBQXVCLEtBQUsxQixVQUE1Qjs7QUFFQSxTQUFLLElBQUlxQyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLaEQsV0FBTCxDQUFpQm1DLE1BQTdDLEVBQXFEYSxLQUFLLEVBQTFELEVBQThEO0FBQzFELFdBQUtoRCxXQUFMLENBQWlCZ0QsS0FBakIsRUFBd0IxQixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkRnRixjQUE3RCxDQUE0RXZDLE1BQTVFLEdBQXFGLEtBQXJGO0FBQ0EsV0FBSy9ELFdBQUwsQ0FBaUJnRCxLQUFqQixFQUF3QjFCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHdFLHdCQUE3RDtBQUNIOztBQUVELFFBQUcsS0FBSzNGLFlBQUwsSUFBbUIsQ0FBdEIsRUFBd0I7QUFDeEI7QUFDSTNCLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGdUMsaUJBQXRGLENBQXdHLFlBQXhHLEVBQXFILEtBQUt6RCxVQUExSCxFQUFxSSxJQUFySTtBQUNBLGFBQUtzQyx3QkFBTCxDQUE4QixDQUE5QixFQUZKLENBSUk7O0FBQ0EsWUFBR3pFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDhCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZ3QyxjQUE3RixDQUE0R0MsVUFBNUcsSUFBd0gsSUFBM0gsRUFDSSxLQUFLbEQsMkJBQUw7QUFDUDtBQUNKLEdBaHVCb0I7QUFpdUJyQjtBQUdBOztBQUNDOzs7Ozs7QUFNRGMsRUFBQUEsa0JBM3VCcUIsOEJBMnVCRitELGFBM3VCRSxFQTR1QnJCO0FBQUEsUUFEbUJBLGFBQ25CO0FBRG1CQSxNQUFBQSxhQUNuQixHQURpQyxLQUNqQztBQUFBOztBQUNJLFFBQUcsS0FBSzlHLFlBQUwsSUFBbUIsQ0FBdEIsRUFBeUI7QUFDekI7QUFDSSxZQUFHLENBQUM4RyxhQUFKLEVBQ0E7QUFDSSxjQUFJTSxZQUFZLEdBQUMsS0FBS0MsU0FBTCxDQUFlLENBQWYsRUFBaUIsS0FBSzVILFdBQUwsQ0FBaUJ1QyxNQUFsQyxDQUFqQjs7QUFDQSxlQUFLeEMsY0FBTCxDQUFvQitGLElBQXBCLENBQXlCLEtBQUs5RixXQUFMLENBQWlCMkgsWUFBakIsQ0FBekI7QUFDQS9JLFVBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RG9CLFVBQTlELEdBQXlFLENBQXpFO0FBQ0g7QUFDSjs7QUFFRCxTQUFLLElBQUljLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHeEUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEb0IsVUFBMUYsRUFBc0djLEtBQUssRUFBM0csRUFBK0c7QUFDM0csV0FBS2hELFdBQUwsQ0FBaUJnRCxLQUFqQixFQUF3QmUsTUFBeEIsR0FBK0IsSUFBL0I7QUFDQSxXQUFLL0QsV0FBTCxDQUFpQmdELEtBQWpCLEVBQXdCMUIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEaUYsVUFBN0QsR0FBd0UsS0FBSzVHLGNBQUwsQ0FBb0JxRCxLQUFwQixDQUF4RTtBQUNBLFdBQUtoRCxXQUFMLENBQWlCZ0QsS0FBakIsRUFBd0IxQixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkRtRyxPQUE3RCxDQUFxRSxLQUFLOUgsY0FBTCxDQUFvQnFELEtBQXBCLEVBQTJCeEcsVUFBaEc7QUFDQSxXQUFLd0QsV0FBTCxDQUFpQmdELEtBQWpCLEVBQXdCMUIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEd0Usd0JBQTdEO0FBQ0g7QUFDSixHQTd2Qm9CO0FBK3ZCckJ6RCxFQUFBQSxZQS92QnFCLHdCQSt2QlJxRixnQkEvdkJRLEVBK3ZCU0MsTUEvdkJULEVBZ3dCckI7QUFDSSxRQUFHRCxnQkFBSCxFQUNBO0FBQ0ksV0FBSzFILFdBQUwsQ0FBaUIySCxNQUFqQixFQUF5QnJHLFlBQXpCLENBQXNDLHNCQUF0QyxFQUE4RGlGLFVBQTlELEdBQXlFLEtBQUs1RyxjQUFMLENBQW9CZ0ksTUFBcEIsQ0FBekU7O0FBRUEsV0FBSyxJQUFJM0UsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd4RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERvQixVQUExRixFQUFzR2MsS0FBSyxFQUEzRyxFQUErRztBQUMzRyxZQUFHMkUsTUFBTSxJQUFFM0UsS0FBWCxFQUNBO0FBQ0ksZUFBS2hELFdBQUwsQ0FBaUJnRCxLQUFqQixFQUF3QjFCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHNHLG1CQUE3RCxDQUFpRixJQUFqRjtBQUNBLGVBQUs1SCxXQUFMLENBQWlCZ0QsS0FBakIsRUFBd0IxQixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkR1RyxvQkFBN0QsQ0FBa0YsSUFBbEY7QUFDQSxlQUFLN0gsV0FBTCxDQUFpQmdELEtBQWpCLEVBQXdCMUIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEd0Usd0JBQTdEO0FBQ0gsU0FMRCxNQU9BO0FBQ0ksZUFBSzlGLFdBQUwsQ0FBaUJnRCxLQUFqQixFQUF3QjFCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHdFLHdCQUE3RDtBQUNBLGVBQUs5RixXQUFMLENBQWlCZ0QsS0FBakIsRUFBd0IxQixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkRzRyxtQkFBN0QsQ0FBaUYsS0FBakY7QUFDQSxlQUFLNUgsV0FBTCxDQUFpQmdELEtBQWpCLEVBQXdCMUIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEdUcsb0JBQTdELENBQWtGLEtBQWxGO0FBQ0g7QUFDSjtBQUNKO0FBQ0osR0FweEJvQjs7QUFzeEJwQjs7Ozs7O0FBTUQxRSxFQUFBQSxpQkE1eEJxQiw2QkE0eEJIOEQsYUE1eEJHLEVBNnhCckI7QUFBQSxRQURrQkEsYUFDbEI7QUFEa0JBLE1BQUFBLGFBQ2xCLEdBRGdDLEtBQ2hDO0FBQUE7O0FBQ0ksUUFBRyxDQUFDQSxhQUFKLEVBQ0E7QUFDSSxXQUFLLElBQUlqRSxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLckQsY0FBTCxDQUFvQndDLE1BQWhELEVBQXdEYSxLQUFLLEVBQTdELEVBQWlFO0FBQzdELFlBQUcsS0FBS3JELGNBQUwsQ0FBb0JxRCxLQUFwQixFQUEyQmxHLGVBQTNCLElBQTRDLENBQTVDLElBQWlELENBQUMsS0FBSzZDLGNBQUwsQ0FBb0JxRCxLQUFwQixFQUEyQnJGLHNCQUFoRixFQUNJLEtBQUtzQyxjQUFMLENBQW9CK0MsS0FBcEIsRUFBMkJhLFdBQTNCLENBQXVDLEtBQUszRCxrQkFBTCxDQUF3QixDQUF4QixFQUEyQndELFFBQTNCLENBQW9DQyxDQUEzRSxFQUE2RSxLQUFLekQsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkJ3RCxRQUEzQixDQUFvQ0UsQ0FBakgsRUFESixLQUVLLElBQUcsS0FBS2pFLGNBQUwsQ0FBb0JxRCxLQUFwQixFQUEyQmpHLG9CQUEzQixJQUFpRCxDQUFqRCxJQUFzRCxDQUFDLEtBQUs0QyxjQUFMLENBQW9CcUQsS0FBcEIsRUFBMkJyRixzQkFBckYsRUFDRCxLQUFLc0MsY0FBTCxDQUFvQitDLEtBQXBCLEVBQTJCYSxXQUEzQixDQUF1QyxLQUFLM0Qsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkJ3RCxRQUEzQixDQUFvQ0MsQ0FBM0UsRUFBNkUsS0FBS3pELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCd0QsUUFBM0IsQ0FBb0NFLENBQWpIO0FBQ1A7QUFDSixLQVJELE1BU0E7QUFDSSxVQUFHLEtBQUtqRSxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQzdELGVBQXJDLElBQXNELENBQXpELEVBQ0ksS0FBS21ELGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUNrRCxXQUFyQyxDQUFpRCxLQUFLM0Qsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkJ3RCxRQUEzQixDQUFvQ0MsQ0FBckYsRUFBdUYsS0FBS3pELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCd0QsUUFBM0IsQ0FBb0NFLENBQTNILEVBREosS0FFSyxJQUFHLEtBQUtqRSxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQzVELG9CQUFyQyxJQUEyRCxDQUE5RCxFQUNELEtBQUtrRCxjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDa0QsV0FBckMsQ0FBaUQsS0FBSzNELGtCQUFMLENBQXdCLENBQXhCLEVBQTJCd0QsUUFBM0IsQ0FBb0NDLENBQXJGLEVBQXVGLEtBQUt6RCxrQkFBTCxDQUF3QixDQUF4QixFQUEyQndELFFBQTNCLENBQW9DRSxDQUEzSDtBQUNQOztBQUVELFNBQUssSUFBSVosT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUd4RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERvQixVQUExRixFQUFzR2MsT0FBSyxFQUEzRyxFQUErRztBQUMzRyxXQUFLL0MsY0FBTCxDQUFvQitDLE9BQXBCLEVBQTJCZSxNQUEzQixHQUFrQyxJQUFsQztBQUNIO0FBQ0osR0FqekJvQjtBQW16QnJCK0QsRUFBQUEseUJBbnpCcUIsdUNBb3pCckI7QUFDSSxRQUFJQyxTQUFTLEdBQUMsS0FBSzlILGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUNxSCxxQkFBckMsQ0FBMkQ5TixFQUFFLENBQUNvSixJQUFILENBQVEsQ0FBUixFQUFVLEdBQVYsQ0FBM0QsQ0FBZDtBQUNBLFNBQUt2RCxVQUFMLENBQWdCMkQsUUFBaEIsR0FBeUIsS0FBSzNELFVBQUwsQ0FBZ0JrSSxNQUFoQixDQUF1QkMsb0JBQXZCLENBQTRDSCxTQUE1QyxDQUF6QjtBQUVBLFFBQUlJLEtBQUssR0FBQ0osU0FBUyxDQUFDbkUsQ0FBVixHQUFZMUosRUFBRSxDQUFDa08sT0FBSCxDQUFXQyxNQUFqQztBQUNBLFNBQUtoSCxNQUFMLENBQVlpSCxTQUFaLEdBQXNCLENBQXRCO0FBQ0gsR0ExekJvQjtBQTR6QnJCQyxFQUFBQSxVQTV6QnFCLHdCQTR6QlA7QUFDVixRQUFHLEtBQUtoSCxlQUFSLEVBQ0ksS0FBS3VHLHlCQUFMO0FBQ1AsR0EvekJvQjtBQWkwQnJCVSxFQUFBQSxZQWowQnFCLHdCQWkwQlJDLEtBajBCUSxFQWswQnJCO0FBQ0ksUUFBSUMsTUFBTSxHQUFDRCxLQUFLLENBQUNFLEtBQWpCO0FBQ0EsUUFBSUMsTUFBTSxHQUFDSCxLQUFLLENBQUNJLEtBQWpCOztBQUNBLFFBQUlDLE9BQU8sR0FBQ0osTUFBTSxHQUFDRSxNQUFuQjs7QUFFQXJLLElBQUFBLFVBQVUsR0FBQyxJQUFYO0FBQ0EsU0FBSzRDLGFBQUwsR0FBbUIsS0FBbkI7O0FBRUEsUUFBRyxLQUFLaEIsWUFBTCxJQUFtQixDQUF0QixFQUF3QjtBQUN4QjtBQUNJLGFBQUssSUFBSTZDLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHeEUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEYyxZQUE5RCxHQUE2RW1ILGlCQUE3RSxHQUFpRzVHLE1BQTdILEVBQXFJYSxLQUFLLEVBQTFJLEVBQThJO0FBQzFJLGNBQUd4RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERjLFlBQTlELEdBQTZFbUgsaUJBQTdFLEdBQWlHL0YsS0FBakcsRUFBd0dILGdCQUF4RyxDQUF5SFcsSUFBekgsQ0FBOEhXLE1BQTlILElBQXNJLEtBQUt4RSxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2xFLFNBQTlLLEVBQ0E7QUFDSStFLFlBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLG9CQUFrQixLQUFLaEMsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNuRSxVQUFuRTtBQUNBLGlCQUFLbUQsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNqRCxpQkFBckMsR0FBdURjLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkVtSCxpQkFBN0UsR0FBaUcvRixLQUFqRyxFQUF3R0gsZ0JBQXhHLENBQXlIQyxpQkFBekgsQ0FBMklwRixpQkFBbE07QUFDSDtBQUNKO0FBQ0o7O0FBRUQsUUFBRyxLQUFLaUMsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNqRCxpQkFBckMsSUFBd0QsQ0FBeEQsSUFBNkQsQ0FBQyxLQUFLaUMsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNoRCxzQkFBdEcsRUFDQTtBQUNJLFVBQUcsS0FBS2dDLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDL0QsWUFBckMsQ0FBa0QsQ0FBbEQsRUFBcURoQyxZQUFyRCxJQUFtRSxDQUF0RSxFQUNBO0FBQ0l3RCxRQUFBQSxXQUFXLEdBQUMsQ0FBWjtBQUNBLGFBQUt1QixjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2hELHNCQUFyQyxHQUE0RCxJQUE1RDtBQUNBNkQsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWNyRCxXQUFkO0FBQ0gsT0FMRCxNQU9BO0FBQ0ksYUFBS3VCLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDaEQsc0JBQXJDLEdBQTRELElBQTVEO0FBQ0FTLFFBQUFBLFdBQVcsR0FBQyxFQUFaO0FBQ0FvRCxRQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBY3JELFdBQWQ7QUFDSDtBQUNKLEtBZEQsTUFnQkE7QUFDSSxVQUFHLEtBQUt1QixjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2pELGlCQUFyQyxJQUF3RCxFQUEzRCxFQUNJLEtBQUtpQyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2pELGlCQUFyQyxHQUF1RCxLQUFLaUMsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNqRCxpQkFBckMsR0FBdUQsRUFBOUcsQ0FESixLQUdJLEtBQUtpQyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2pELGlCQUFyQyxHQUF1RCxLQUFLaUMsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNqRCxpQkFBckMsR0FBdUQsQ0FBOUc7QUFFSlUsTUFBQUEsV0FBVyxHQUFDLEtBQUt1QixjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2pELGlCQUFqRDtBQUNBOEQsTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWNyRCxXQUFXLEdBQUMsQ0FBMUI7QUFDSDs7QUFHREUsSUFBQUEsUUFBUSxHQUFDd0ssT0FBVDtBQUNBekssSUFBQUEsUUFBUSxHQUFDLENBQVQ7QUFDQUcsSUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRGlILDJCQUExRCxDQUFzRjFLLFFBQXRGOztBQUVBLFNBQUssSUFBSTBFLE9BQUssR0FBRyxDQUFqQixFQUFvQkEsT0FBSyxHQUFHLEtBQUtoRCxXQUFMLENBQWlCbUMsTUFBN0MsRUFBcURhLE9BQUssRUFBMUQsRUFBOEQ7QUFDMUQsVUFBRyxLQUFLckMsVUFBTCxJQUFpQnFDLE9BQXBCLEVBQ0E7QUFDSSxhQUFLaEQsV0FBTCxDQUFpQmdELE9BQWpCLEVBQXdCMUIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEZ0YsY0FBN0QsQ0FBNEV2QyxNQUE1RSxHQUFtRixJQUFuRjs7QUFDQSxhQUFLL0QsV0FBTCxDQUFpQmdELE9BQWpCLEVBQXdCMUIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEZ0YsY0FBN0QsQ0FBNEVoRixZQUE1RSxDQUF5RixnQkFBekYsRUFBMkcySCxXQUEzRyxDQUF1SFAsTUFBdkgsRUFBK0hFLE1BQS9IOztBQUNBLGFBQUs1SSxXQUFMLENBQWlCZ0QsT0FBakIsRUFBd0IxQixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkR3RSx3QkFBN0Q7QUFDSCxPQUxELE1BT0E7QUFDSSxhQUFLOUYsV0FBTCxDQUFpQmdELE9BQWpCLEVBQXdCMUIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEZ0YsY0FBN0QsQ0FBNEV2QyxNQUE1RSxHQUFxRixLQUFyRjs7QUFDQSxhQUFLL0QsV0FBTCxDQUFpQmdELE9BQWpCLEVBQXdCMUIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEd0Usd0JBQTdEO0FBQ0g7QUFDSixLQTlETCxDQWdFSTtBQUNBO0FBQ0E7O0FBQ0gsR0FyNEJvQjtBQXU0QnJCb0QsRUFBQUEsZ0JBdjRCcUIsOEJBdzRCckI7QUFDSSxRQUFJbkIsU0FBUyxHQUFDLEtBQUs5SCxjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDcUgscUJBQXJDLENBQTJEOU4sRUFBRSxDQUFDb0osSUFBSCxDQUFRLENBQVIsRUFBVSxHQUFWLENBQTNELENBQWQ7O0FBQ0EsUUFBSTZGLElBQUksR0FBQyxLQUFLcEosVUFBTCxDQUFnQmtJLE1BQWhCLENBQXVCQyxvQkFBdkIsQ0FBNENILFNBQTVDLENBQVQ7O0FBQ0EsU0FBS3FCLFdBQUwsQ0FBaUJELElBQWpCLEVBQXNCLElBQXRCLEVBQTJCLEdBQTNCO0FBQ0gsR0E1NEJvQjtBQTg0QnJCRSxFQUFBQSxjQTk0QnFCLDBCQTg0Qk5DLFFBOTRCTSxFQSs0QnJCO0FBQ0ksUUFBSUMsV0FBVyxHQUFDLENBQWhCO0FBQ0EsUUFBSUMsWUFBWSxHQUFDLENBQWpCOztBQUNBLFNBQUssSUFBSXhHLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHeEUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEYyxZQUE5RCxHQUE2RW1ILGlCQUE3RSxHQUFpRzVHLE1BQTdILEVBQXFJYSxLQUFLLEVBQTFJLEVBQThJO0FBQzFJLFVBQUd4RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOERjLFlBQTlELEdBQTZFbUgsaUJBQTdFLEdBQWlHL0YsS0FBakcsRUFBd0dILGdCQUF4RyxDQUF5SFcsSUFBekgsQ0FBOEhXLE1BQTlILElBQXNJLEtBQUt4RSxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2xFLFNBQTlLLEVBQ0E7QUFDSTtBQUNBK00sUUFBQUEsWUFBWSxHQUFDaEwsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEYyxZQUE5RCxHQUE2RW1ILGlCQUE3RSxHQUFpRy9GLEtBQWpHLEVBQXdHSCxnQkFBeEcsQ0FBeUhDLGlCQUF6SCxDQUEySXBGLGlCQUF4SjtBQUNIO0FBQ0o7O0FBRUgsUUFBRzhMLFlBQVksR0FBQyxDQUFiLEdBQWUsQ0FBbEIsRUFDQTtBQUNFaEksTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsd0JBQWQ7QUFDQThILE1BQUFBLFdBQVcsR0FBQ0MsWUFBWSxHQUFDRixRQUFiLEdBQXNCLENBQWxDO0FBQ0EsVUFBSUcsUUFBUSxHQUFDQyxRQUFRLENBQUNsTCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDa0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRCtGLFdBQTFELEVBQXVFOUYsaUJBQXZFLENBQXlGbkMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0hxSSxTQUF0SCxDQUFnSUMsVUFBakksQ0FBckI7QUFDQXBJLE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLFlBQVVnSSxRQUF4QjtBQUNELEtBTkQsTUFRQTtBQUNFRixNQUFBQSxXQUFXLEdBQUNDLFlBQVksR0FBQ0YsUUFBekI7QUFDQSxVQUFJRyxRQUFRLEdBQUNDLFFBQVEsQ0FBQ2xMLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NrRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEK0YsV0FBMUQsRUFBdUU5RixpQkFBdkUsQ0FBeUZuQyxZQUF6RixDQUFzRyxjQUF0RyxFQUFzSHFJLFNBQXRILENBQWdJQyxVQUFqSSxDQUFyQjtBQUNBcEksTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsWUFBVWdJLFFBQXhCO0FBQ0Q7QUFFRixHQXg2Qm9CO0FBMDZCckJwRCxFQUFBQSxRQUFRLEVBQUMsb0JBQ1Q7QUFDSSxRQUFJLENBQUNoSCxVQUFMLEVBQWlCO0FBQ2IsVUFBSXdLLEtBQUo7QUFDQSxVQUFJQyxLQUFKOztBQUNBLFVBQUl4USxPQUFPLElBQUksS0FBS3FHLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDaEUsS0FBckMsSUFBOEMsS0FBN0QsRUFBb0U7QUFDaEVrTixRQUFBQSxLQUFLLEdBQUdILFFBQVEsQ0FBQ25RLFdBQUQsQ0FBaEI7QUFDQXVRLFFBQUFBLEtBQUssR0FBR0osUUFBUSxDQUFDbFEsV0FBRCxDQUFoQjtBQUNILE9BSEQsTUFJSyxJQUFJLEtBQUttRyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2hFLEtBQXJDLElBQThDLElBQTlDLElBQXNEckQsT0FBMUQsRUFBbUU7QUFDcEV1USxRQUFBQSxLQUFLLEdBQUcsRUFBUjtBQUNBQyxRQUFBQSxLQUFLLEdBQUcsRUFBUjtBQUNILE9BSEksTUFJQTtBQUNERCxRQUFBQSxLQUFLLEdBQUcsS0FBS3JDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVI7QUFDQXNDLFFBQUFBLEtBQUssR0FBRyxLQUFLdEMsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBUjtBQUVBLFlBQUkvTixpQkFBaUIsSUFBSW9RLEtBQXpCLEVBQ0lBLEtBQUssR0FBRyxLQUFLckMsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBUjtBQUVKLFlBQUk5TixpQkFBaUIsSUFBSW9RLEtBQXpCLEVBQ0lBLEtBQUssR0FBRyxLQUFLdEMsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBUjtBQUVKL04sUUFBQUEsaUJBQWlCLEdBQUdvUSxLQUFwQjtBQUNBblEsUUFBQUEsaUJBQWlCLEdBQUdvUSxLQUFwQjtBQUNILE9BdkJZLENBMEJiO0FBQ0E7OztBQUVBeEwsTUFBQUEsUUFBUSxHQUFHdUwsS0FBSyxHQUFHQyxLQUFuQjtBQUNBLFVBQUlDLFFBQVEsR0FBRztBQUFFcEIsUUFBQUEsS0FBSyxFQUFFa0IsS0FBVDtBQUFnQmhCLFFBQUFBLEtBQUssRUFBRWlCO0FBQXZCLE9BQWYsQ0E5QmEsQ0ErQmI7QUFDQTs7QUFDQXRJLE1BQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLGtCQUFrQnJELFFBQWxCLEdBQTZCLFVBQTdCLEdBQTBDdUwsS0FBMUMsR0FBa0QsVUFBbEQsR0FBK0RDLEtBQTNFO0FBRUF0TCxNQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE2RXNGLFFBQTdFO0FBQ0g7QUFDSixHQWo5Qm9CO0FBbTlCckJDLEVBQUFBLFdBbjlCcUIseUJBbzlCckI7QUFDSSxRQUFJSCxLQUFLLEdBQUcsS0FBS3JDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVo7QUFFQSxRQUFJM04saUJBQWlCLElBQUlnUSxLQUF6QixFQUNJQSxLQUFLLEdBQUMsS0FBS3JDLFNBQUwsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLENBQU47QUFFQTNOLElBQUFBLGlCQUFpQixHQUFHZ1EsS0FBcEI7QUFFSixXQUFPQSxLQUFQO0FBQ0gsR0E3OUJvQjtBQSs5QnJCSSxFQUFBQSxZQS85QnFCLDBCQWcrQnJCO0FBQ0ksUUFBSUosS0FBSyxHQUFDLEtBQUtyQyxTQUFMLENBQWUsQ0FBZixFQUFpQixDQUFqQixDQUFWO0FBQ0EsUUFBSXNDLEtBQUssR0FBRyxLQUFLdEMsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBWjtBQUVBLFFBQUk3TixpQkFBaUIsSUFBSWtRLEtBQXpCLEVBQ0lBLEtBQUssR0FBQyxLQUFLckMsU0FBTCxDQUFlLENBQWYsRUFBaUIsQ0FBakIsQ0FBTjtBQUVKLFFBQUk1TixpQkFBaUIsSUFBSWtRLEtBQXpCLEVBQ0lBLEtBQUssR0FBRyxLQUFLdEMsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBUjtBQUVBN04sSUFBQUEsaUJBQWlCLEdBQUdrUSxLQUFwQjtBQUNBalEsSUFBQUEsaUJBQWlCLEdBQUdrUSxLQUFwQjtBQUVKLFdBQVFELEtBQUssR0FBQ0MsS0FBZDtBQUNILEdBOStCb0I7QUFnL0JyQkksRUFBQUEsWUFoL0JxQiwwQkFpL0JyQjtBQUNJLFFBQUksQ0FBQzdLLFVBQUwsRUFBaUI7QUFDYixVQUFJakIsV0FBVyxHQUFHSSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDa0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHJCLE1BQTVFLEVBQW9GO0FBQ2hGLFlBQUlnSSxRQUFRLEdBQUdULFFBQVEsQ0FBQ2xMLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NrRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEcEYsV0FBMUQsRUFBdUVxRixpQkFBdkUsQ0FBeUZuQyxZQUF6RixDQUFzRyxjQUF0RyxFQUFzSHFJLFNBQXRILENBQWdJQyxVQUFqSSxDQUF2Qjs7QUFDQSxhQUFLakssY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNqRCxpQkFBckMsR0FBeURVLFdBQXpEOztBQUNBLFlBQUkrTCxRQUFRLElBQUksQ0FBWixJQUFpQkEsUUFBUSxJQUFJLENBQWpDLEVBQW9DO0FBQ3BDO0FBQ0ksZ0JBQUlsRixVQUFVLEdBQUcsS0FBS3VDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLEVBQWxCLENBQWpCLENBREosQ0FHSTs7QUFDQSxnQkFBSTJDLFFBQVEsSUFBSSxDQUFoQixFQUFtQjtBQUNuQjtBQUNJO0FBQ0E7QUFDQTtBQUNBbEYsZ0JBQUFBLFVBQVUsR0FBRyxDQUFiO0FBQ0gsZUFORCxNQU1PLElBQUlrRixRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDMUI7QUFDSSxvQkFBSUMsVUFBVSxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsQ0FBakI7QUFDQSxvQkFBSXBILEtBQUssR0FBRyxLQUFLd0UsU0FBTCxDQUFlLENBQWYsRUFBa0IsRUFBbEIsQ0FBWjtBQUNBdkMsZ0JBQUFBLFVBQVUsR0FBR21GLFVBQVUsQ0FBQ3BILEtBQUQsQ0FBdkIsQ0FISixDQUlJO0FBQ0gsZUFOTSxNQU9GLElBQUltSCxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDeEI7QUFDSSxvQkFBSUMsVUFBVSxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLEVBQWIsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsQ0FBakI7QUFDQSxvQkFBSXBILEtBQUssR0FBRyxLQUFLd0UsU0FBTCxDQUFlLENBQWYsRUFBa0IsRUFBbEIsQ0FBWjtBQUNBdkMsZ0JBQUFBLFVBQVUsR0FBR21GLFVBQVUsQ0FBQ3BILEtBQUQsQ0FBdkIsQ0FISixDQUlJO0FBQ0gsZUFOSSxNQVFBLElBQUltSCxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDeEI7QUFDSSxvQkFBSUMsVUFBVSxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsRUFBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsQ0FBakI7QUFDQSxvQkFBSXBILEtBQUssR0FBRyxLQUFLd0UsU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBWjtBQUNBdkMsZ0JBQUFBLFVBQVUsR0FBR21GLFVBQVUsQ0FBQ3BILEtBQUQsQ0FBdkIsQ0FISixDQUlJO0FBQ0g7O0FBR0R6RSxZQUFBQSxVQUFVLEdBQUcsS0FBYjtBQUNBaUQsWUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMwSSxRQUFkOztBQUVBLGdCQUFJLEtBQUtoSyxZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzVCO0FBQ0ksb0JBQUlnSyxRQUFRLElBQUUsRUFBZCxFQUFrQjtBQUNsQjtBQUNJL0wsb0JBQUFBLFdBQVcsR0FBR0EsV0FBVyxHQUFHLENBQTVCO0FBQ0EseUJBQUtpTSxhQUFMO0FBQ0gsbUJBSkQsTUFNSTtBQUNBLHNCQUFJLEtBQUsxSyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2xFLFNBQXJDLElBQWtEK0Isd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXhKLEVBQWdLO0FBQzVKLHdCQUFJbUcsV0FBVyxHQUFHO0FBQUUsb0NBQWNyRixVQUFoQjtBQUE0QixpQ0FBVzdHO0FBQXZDLHFCQUFsQjtBQUNBLHlCQUFLa0csaUJBQUwsQ0FBdUJnRyxXQUF2QjtBQUNILG1CQUhELE1BSUs7QUFDRCx5QkFBSzFGLG1CQUFMO0FBQ0g7QUFDSjtBQUNKLGVBakJELE1BaUJPLElBQUksS0FBS3pFLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDbkM7QUFDSSxvQkFBSWdLLFFBQVEsSUFBRSxFQUFkLEVBQWtCO0FBQ2xCO0FBQ0kvTCxvQkFBQUEsV0FBVyxHQUFHQSxXQUFXLEdBQUcsQ0FBNUI7QUFDQSx5QkFBS2lNLGFBQUw7QUFDSCxtQkFKRCxNQU1BO0FBQ0ksc0JBQUlDLFdBQVcsR0FBRztBQUFFLGtDQUFjckYsVUFBaEI7QUFBNEIsK0JBQVc3RztBQUF2QyxtQkFBbEI7QUFDQSx1QkFBS2tHLGlCQUFMLENBQXVCZ0csV0FBdkI7QUFDSDtBQUNKO0FBQ0osV0FwRUQsTUFxRUs7QUFDRC9MLFVBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0FpRCxVQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSx1RUFBWjtBQUNBLGVBQUt5RCxzQkFBTDtBQUNIO0FBQ0osT0E3RUQsTUE4RUs7QUFDRCxZQUFJLEtBQUtqRixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQ3hCLGNBQUksQ0FBQ2QsVUFBTCxFQUFpQjtBQUNiLGdCQUFJLEtBQUtNLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDNEosS0FBckMsSUFBOEN4USxXQUFsRCxFQUNJLEtBQUt5USxnQkFBTDtBQUVKLGdCQUFJLENBQUMsS0FBSzdLLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDNEosS0FBdEMsSUFBK0N6USxZQUFuRCxFQUNJLEtBQUswUSxnQkFBTDtBQUNQO0FBQ0osU0FSRCxNQVNLLElBQUksS0FBS3JLLFlBQUwsSUFBcUIsQ0FBekIsRUFBNEI7QUFDN0IsY0FBSSxDQUFDZCxVQUFMLEVBQWlCO0FBQ2IsZ0JBQUksS0FBS00sY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUMvQyxjQUF6QyxFQUNJLEtBQUs0TSxnQkFBTDtBQUNQO0FBQ0o7QUFDSjtBQUNKLEtBaEdELE1Ba0dBO0FBQ0ksV0FBS0MsdUJBQUw7QUFDSDtBQUNKLEdBdmxDb0I7QUF5bENyQkQsRUFBQUEsZ0JBemxDcUIsOEJBMGxDckI7QUFDSWpNLElBQUFBLFVBQVUsR0FBQyxLQUFYO0FBQ0FpRCxJQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSx1RUFBWjtBQUNBLFNBQUt5RCxzQkFBTDtBQUNILEdBOWxDb0I7QUFnbUNyQnNGLEVBQUFBLGdCQWhtQ3FCLDRCQWdtQ0pDLE1BaG1DSSxFQWltQ3JCO0FBQUEsUUFEaUJBLE1BQ2pCO0FBRGlCQSxNQUFBQSxNQUNqQixHQUR3QixLQUN4QjtBQUFBOztBQUNJLFFBQUdBLE1BQU0sSUFBRSxLQUFYLEVBQ0E7QUFDSSxVQUFHLEtBQUtoTCxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ2xFLFNBQXJDLElBQWdEK0Isd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXJKLEVBQ0E7QUFDSSxZQUFJeUcsWUFBWSxHQUFDLEtBQUtqSyxVQUF0Qjs7QUFDQSxZQUFHLEtBQUtoQixjQUFMLENBQW9CaUwsWUFBcEIsRUFBa0NoTixjQUFsQyxJQUFrRCxLQUFyRCxFQUNBO0FBQ0ksZUFBSytCLGNBQUwsQ0FBb0JpTCxZQUFwQixFQUFrQ2hOLGNBQWxDLEdBQWlELElBQWpEO0FBRUEsY0FBSWlOLEtBQUssR0FBQyxLQUFLbEwsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUN6RCxJQUEvQzs7QUFDQSxjQUFJNE4sUUFBUSxHQUFDdE0sd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBLLGVBQWxDLEdBQW9EcEwsY0FBcEQsQ0FBbUVpTCxZQUFuRSxFQUFpRjlOLGVBQTlGOztBQUNBLGNBQUlrTyxRQUFRLEdBQUN4TSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEssZUFBbEMsR0FBb0RwTCxjQUFwRCxDQUFtRWlMLFlBQW5FLEVBQWlGN04sb0JBQTlGOztBQUNBLGNBQUlrTyxXQUFXLEdBQUN6TSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEssZUFBbEMsR0FBb0RwTCxjQUFwRCxDQUFtRWlMLFlBQW5FLEVBQWlGNU4sb0JBQWpHOztBQUVBLGNBQUlrTyxVQUFVLEdBQUMsQ0FBZjs7QUFDQSxlQUFLLElBQUlsSSxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3hFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwSyxlQUFsQyxHQUFvRHBMLGNBQXBELENBQW1FaUwsWUFBbkUsRUFBaUZoTyxZQUFqRixDQUE4RnVGLE1BQTFILEVBQWtJYSxLQUFLLEVBQXZJLEVBQTJJO0FBQ3ZJLGdCQUFHeEUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBLLGVBQWxDLEdBQW9EcEwsY0FBcEQsQ0FBbUVpTCxZQUFuRSxFQUFpRmhPLFlBQWpGLENBQThGb0csS0FBOUYsRUFBcUdwSCxTQUF4RyxFQUNBO0FBQ0lzUCxjQUFBQSxVQUFVLElBQUUxTSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEssZUFBbEMsR0FBb0RwTCxjQUFwRCxDQUFtRWlMLFlBQW5FLEVBQWlGaE8sWUFBakYsQ0FBOEZvRyxLQUE5RixFQUFxR25ILFVBQWpIO0FBQ0g7QUFDSjs7QUFFRCxjQUFJc1AsS0FBSyxHQUFHLEtBQUt4TCxjQUFMLENBQW9CaUwsWUFBcEIsRUFBa0N6TixTQUE5QztBQUNBLGNBQUlpTyxPQUFPLEdBQUcsS0FBS3pMLGNBQUwsQ0FBb0JpTCxZQUFwQixFQUFrQ3hOLFVBQWhEOztBQUVBLGNBQUlpTyxXQUFXLEdBQUcsS0FBS3BCLFlBQUwsRUFBbEI7O0FBQ0EsY0FBSXFCLFdBQVcsR0FBR0QsV0FBVyxHQUFHLElBQWhDO0FBRUEsY0FBSUUsUUFBUSxHQUFHRCxXQUFXLEdBQUdILEtBQTdCO0FBQ0EsY0FBSUssU0FBUyxHQUFHRixXQUFXLEdBQUdGLE9BQTlCO0FBR0EsY0FBSUssTUFBTSxHQUFDLENBQUNULFFBQVEsR0FBQ0MsV0FBVixJQUF1QixNQUFsQztBQUVBLGNBQUlTLE1BQU0sR0FBQyxDQUFYO0FBQ0EsY0FBR1osUUFBUSxJQUFFLENBQWIsRUFDSVksTUFBTSxHQUFDLEtBQVAsQ0FESixLQUVLLElBQUdaLFFBQVEsSUFBRSxDQUFiLEVBQ0RZLE1BQU0sR0FBQyxRQUFNLEtBQWIsQ0FEQyxLQUVBLElBQUdaLFFBQVEsSUFBRSxDQUFiLEVBQ0RZLE1BQU0sR0FBQyxRQUFNLEtBQU4sR0FBWSxLQUFuQjtBQUVKLGNBQUlDLFdBQVcsR0FBQ2QsS0FBSyxHQUFDWSxNQUFOLEdBQWFDLE1BQWIsR0FBb0JILFFBQXBCLEdBQTZCQyxTQUE3QixHQUF1Q04sVUFBdkQ7QUFFQSxlQUFLdkwsY0FBTCxDQUFvQmlMLFlBQXBCLEVBQWtDL00sVUFBbEMsR0FBK0M4TixXQUEvQztBQUNBLGVBQUtoTSxjQUFMLENBQW9CaUwsWUFBcEIsRUFBa0M5TSxXQUFsQyxHQUFnRDROLE1BQWhEO0FBQ0EsZUFBSy9MLGNBQUwsQ0FBb0JpTCxZQUFwQixFQUFrQzdNLFdBQWxDLEdBQWdEME4sTUFBaEQ7QUFDQSxlQUFLOUwsY0FBTCxDQUFvQmlMLFlBQXBCLEVBQWtDNU0sYUFBbEMsR0FBa0R1TixRQUFsRDtBQUNBLGVBQUs1TCxjQUFMLENBQW9CaUwsWUFBcEIsRUFBa0MxTSxlQUFsQyxHQUFvRHNOLFNBQXBEO0FBQ0EsZUFBSzdMLGNBQUwsQ0FBb0JpTCxZQUFwQixFQUFrQzNNLGdCQUFsQyxHQUFxRGlOLFVBQXJEO0FBQ0ExTSxVQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQ4QixXQUE5RCxHQUE0RXdCLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUgsS0FBS3pFLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLENBQW5IO0FBRUg7QUFDSjtBQUNKLEtBdERELE1Bd0RBO0FBQ0ksVUFBSWlLLFlBQVksR0FBQyxLQUFLakssVUFBdEI7O0FBQ0EsVUFBRyxLQUFLaEIsY0FBTCxDQUFvQmlMLFlBQXBCLEVBQWtDaE4sY0FBbEMsSUFBa0QsS0FBckQsRUFDQTtBQUNJLGFBQUsrQixjQUFMLENBQW9CaUwsWUFBcEIsRUFBa0NoTixjQUFsQyxHQUFpRCxJQUFqRDtBQUVBLFlBQUlpTixLQUFLLEdBQUMsS0FBS2xMLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDekQsSUFBL0M7QUFDQSxZQUFJNE4sUUFBUSxHQUFDLEtBQUtuTCxjQUFMLENBQW9CaUwsWUFBcEIsRUFBa0M5TixlQUEvQztBQUNBLFlBQUlrTyxRQUFRLEdBQUMsS0FBS3JMLGNBQUwsQ0FBb0JpTCxZQUFwQixFQUFrQzdOLG9CQUEvQztBQUNBLFlBQUlrTyxXQUFXLEdBQUMsS0FBS3RMLGNBQUwsQ0FBb0JpTCxZQUFwQixFQUFrQzVOLG9CQUFsRDtBQUVBLFlBQUlrTyxVQUFVLEdBQUMsQ0FBZjs7QUFDQSxhQUFLLElBQUlsSSxPQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE9BQUssR0FBRyxLQUFLckQsY0FBTCxDQUFvQmlMLFlBQXBCLEVBQWtDaE8sWUFBbEMsQ0FBK0N1RixNQUEzRSxFQUFtRmEsT0FBSyxFQUF4RixFQUE0RjtBQUN4RixjQUFHeEUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBLLGVBQWxDLEdBQW9EcEwsY0FBcEQsQ0FBbUVpTCxZQUFuRSxFQUFpRmhPLFlBQWpGLENBQThGb0csT0FBOUYsRUFBcUdwSCxTQUF4RyxFQUNBO0FBQ0lzUCxZQUFBQSxVQUFVLElBQUUxTSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEssZUFBbEMsR0FBb0RwTCxjQUFwRCxDQUFtRWlMLFlBQW5FLEVBQWlGaE8sWUFBakYsQ0FBOEZvRyxPQUE5RixFQUFxR25ILFVBQWpIO0FBQ0g7QUFDSjs7QUFFRyxZQUFJc1AsS0FBSyxHQUFHLEtBQUt4TCxjQUFMLENBQW9CaUwsWUFBcEIsRUFBa0N6TixTQUE5QztBQUNBLFlBQUlpTyxPQUFPLEdBQUcsS0FBS3pMLGNBQUwsQ0FBb0JpTCxZQUFwQixFQUFrQ3hOLFVBQWhEOztBQUVBLFlBQUlpTyxXQUFXLEdBQUcsS0FBS3BCLFlBQUwsRUFBbEI7O0FBQ0EsWUFBSXFCLFdBQVcsR0FBR0QsV0FBVyxHQUFHLElBQWhDO0FBRUEsWUFBSUUsUUFBUSxHQUFHRCxXQUFXLEdBQUdILEtBQTdCO0FBQ0EsWUFBSUssU0FBUyxHQUFHRixXQUFXLEdBQUdGLE9BQTlCO0FBR0EsWUFBSUssTUFBTSxHQUFDLENBQUNULFFBQVEsR0FBQ0MsV0FBVixJQUF1QixNQUFsQztBQUVBLFlBQUlTLE1BQU0sR0FBQyxDQUFYO0FBQ0EsWUFBR1osUUFBUSxJQUFFLENBQWIsRUFDSVksTUFBTSxHQUFDLEtBQVAsQ0FESixLQUVLLElBQUdaLFFBQVEsSUFBRSxDQUFiLEVBQ0RZLE1BQU0sR0FBQyxRQUFNLEtBQWIsQ0FEQyxLQUVBLElBQUdaLFFBQVEsSUFBRSxDQUFiLEVBQ0RZLE1BQU0sR0FBQyxRQUFNLEtBQU4sR0FBWSxLQUFuQjtBQUVKLFlBQUlDLFdBQVcsR0FBQ2QsS0FBSyxHQUFDWSxNQUFOLEdBQWFDLE1BQWIsR0FBb0JILFFBQXBCLEdBQTZCQyxTQUE3QixHQUF1Q04sVUFBdkQ7QUFFQSxhQUFLdkwsY0FBTCxDQUFvQmlMLFlBQXBCLEVBQWtDL00sVUFBbEMsR0FBK0M4TixXQUEvQztBQUNBLGFBQUtoTSxjQUFMLENBQW9CaUwsWUFBcEIsRUFBa0M5TSxXQUFsQyxHQUFnRDROLE1BQWhEO0FBQ0EsYUFBSy9MLGNBQUwsQ0FBb0JpTCxZQUFwQixFQUFrQzdNLFdBQWxDLEdBQWdEME4sTUFBaEQ7QUFDQSxhQUFLOUwsY0FBTCxDQUFvQmlMLFlBQXBCLEVBQWtDNU0sYUFBbEMsR0FBa0R1TixRQUFsRDtBQUNBLGFBQUs1TCxjQUFMLENBQW9CaUwsWUFBcEIsRUFBa0MxTSxlQUFsQyxHQUFvRHNOLFNBQXBEO0FBQ0EsYUFBSzdMLGNBQUwsQ0FBb0JpTCxZQUFwQixFQUFrQzNNLGdCQUFsQyxHQUFxRGlOLFVBQXJEO0FBQ0g7QUFDUjtBQUNKLEdBM3NDb0I7QUE2c0N0QlUsRUFBQUEseUJBN3NDc0IscUNBNnNDSXJILEtBN3NDSixFQThzQ3RCO0FBQ0svRixJQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE0RUYsS0FBNUU7QUFDSixHQWh0Q3FCO0FBa3RDdEJzSCxFQUFBQSxZQWx0Q3NCLHdCQWt0Q1RDLElBbHRDUyxFQW10Q3RCO0FBQ0ksUUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFDQSxRQUFJQyxVQUFVLEdBQUcsRUFBakI7O0FBQ0gsUUFBRyxLQUFLN0wsWUFBTCxJQUFtQixDQUF0QixFQUF3QjtBQUN4QjtBQUNJM0IsUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEbUwsY0FBOUQ7QUFDQTVNLFFBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0EsWUFBSXVILGVBQWUsR0FBQ3BJLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDBGLFVBQTlELEVBQXBCO0FBQ0EsWUFBSUssTUFBTSxHQUFDckksd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsRUFBWDtBQUNBcEIsUUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVltSyxJQUFaO0FBQ0F0SyxRQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWWtGLE1BQU0sQ0FBQ2hFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMENyRyxTQUF0RDtBQUNBK0IsUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RkMsaUJBQTdGLENBQStHM0UsUUFBL0csR0FBd0gsSUFBeEg7O0FBRUEsWUFBSUssd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RndDLGNBQTdGLENBQTRHQyxVQUE1RyxJQUEwSCxJQUE5SCxFQUFvSTtBQUVoSSxjQUFJcUMsTUFBTSxHQUFHLENBQUMsQ0FBZDs7QUFDQSxlQUFLLElBQUkzRSxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRzRELGVBQWUsQ0FBQ3pFLE1BQTVDLEVBQW9EYSxLQUFLLEVBQXpELEVBQTZEO0FBQ3pELGdCQUFJNEQsZUFBZSxDQUFDNUQsS0FBRCxDQUFmLENBQXVCSCxnQkFBdkIsQ0FBd0NDLGlCQUF4QyxDQUEwRHJHLFNBQTFELElBQXVFcVAsSUFBM0UsRUFDQTtBQUNJbkUsY0FBQUEsTUFBTSxHQUFHM0UsS0FBVDtBQUNBO0FBQ0g7QUFDSjs7QUFFRGdKLFVBQUFBLFVBQVUsR0FBRyxpQkFBZXBGLGVBQWUsQ0FBQ2UsTUFBRCxDQUFmLENBQXdCOUUsZ0JBQXhCLENBQXlDQyxpQkFBekMsQ0FBMkR0RyxVQUF2RjtBQUNBdVAsVUFBQUEsUUFBUSxHQUNKLHFCQUFxQm5GLGVBQWUsQ0FBQ2UsTUFBRCxDQUFmLENBQXdCOUUsZ0JBQXhCLENBQXlDQyxpQkFBekMsQ0FBMkQ1RixJQUFoRixHQUF1RixJQUF2RixHQUNBLGlDQURBLEdBQ29DMEosZUFBZSxDQUFDZSxNQUFELENBQWYsQ0FBd0I5RSxnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRGhGLFdBRC9GLEdBQzZHLElBRDdHLEdBRUEsdUNBRkEsR0FFMEM4SSxlQUFlLENBQUNlLE1BQUQsQ0FBZixDQUF3QjlFLGdCQUF4QixDQUF5Q0MsaUJBQXpDLENBQTJEL0UsV0FGckcsR0FFbUgsSUFGbkgsR0FHQSxnQkFIQSxHQUdtQjZJLGVBQWUsQ0FBQ2UsTUFBRCxDQUFmLENBQXdCOUUsZ0JBQXhCLENBQXlDQyxpQkFBekMsQ0FBMkQ5RSxhQUg5RSxHQUc4RixJQUg5RixHQUlBLGtCQUpBLEdBSXFCNEksZUFBZSxDQUFDZSxNQUFELENBQWYsQ0FBd0I5RSxnQkFBeEIsQ0FBeUNDLGlCQUF6QyxDQUEyRDVFLGVBSmhGLEdBSWtHLElBSmxHLEdBS0Esa0JBTEEsR0FLcUIwSSxlQUFlLENBQUNlLE1BQUQsQ0FBZixDQUF3QjlFLGdCQUF4QixDQUF5Q0MsaUJBQXpDLENBQTJEN0UsZ0JBTGhGLEdBS21HLElBTG5HLEdBTUEsdUJBTkEsR0FNMEIySSxlQUFlLENBQUNlLE1BQUQsQ0FBZixDQUF3QjlFLGdCQUF4QixDQUF5Q0MsaUJBQXpDLENBQTJEakYsVUFOckYsR0FNa0csSUFQdEc7QUFTQVcsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRG1LLGdCQUExRCxDQUEyRUYsVUFBM0UsRUFBdUZELFFBQXZGLEVBckJnSSxDQXVCaEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0gsU0FqQ0QsTUFrQ0s7QUFDRCxjQUFJbEYsTUFBTSxDQUFDaEUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ3JHLFNBQTFDLElBQXVEcVAsSUFBM0QsRUFBaUU7QUFFN0Q7QUFDQUUsWUFBQUEsVUFBVSxHQUFHLGtDQUFiO0FBQ0FELFlBQUFBLFFBQVEsR0FDSixxQkFBcUJsRixNQUFNLENBQUNoRSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDNUYsSUFBL0QsR0FBc0UsSUFBdEUsR0FDQSxpQ0FEQSxHQUNvQzJKLE1BQU0sQ0FBQ2hFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMENoRixXQUQ5RSxHQUM0RixJQUQ1RixHQUVBLHVDQUZBLEdBRTBDK0ksTUFBTSxDQUFDaEUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQy9FLFdBRnBGLEdBRWtHLElBRmxHLEdBR0EsZ0JBSEEsR0FHbUI4SSxNQUFNLENBQUNoRSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDOUUsYUFIN0QsR0FHNkUsSUFIN0UsR0FJQSxrQkFKQSxHQUlxQjZJLE1BQU0sQ0FBQ2hFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMEM1RSxlQUovRCxHQUlpRixJQUpqRixHQUtBLGtCQUxBLEdBS3FCMkksTUFBTSxDQUFDaEUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQzdFLGdCQUwvRCxHQUtrRixJQUxsRixHQU1BLHVCQU5BLEdBTTBCNEksTUFBTSxDQUFDaEUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQ2pGLFVBTnBFLEdBTWlGLElBUHJGO0FBU0FXLFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMERtSyxnQkFBMUQsQ0FBMkVGLFVBQTNFLEVBQXVGRCxRQUF2RixFQWI2RCxDQWM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxXQXBCRCxNQXFCSztBQUVEO0FBQ0FDLFlBQUFBLFVBQVUsR0FBRyx3Q0FBYjtBQUNBRCxZQUFBQSxRQUFRLEdBQ0oscUJBQXFCbEYsTUFBTSxDQUFDaEUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQzVGLElBQS9ELEdBQXNFLElBQXRFLEdBQ0EsaUNBREEsR0FDb0MySixNQUFNLENBQUNoRSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDaEYsV0FEOUUsR0FDNEYsSUFENUYsR0FFQSx1Q0FGQSxHQUUwQytJLE1BQU0sQ0FBQ2hFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMEMvRSxXQUZwRixHQUVrRyxJQUZsRyxHQUdBLGdCQUhBLEdBR21COEksTUFBTSxDQUFDaEUsZ0JBQVAsQ0FBd0JDLGlCQUF4QixDQUEwQzlFLGFBSDdELEdBRzZFLElBSDdFLEdBSUEsa0JBSkEsR0FJcUI2SSxNQUFNLENBQUNoRSxnQkFBUCxDQUF3QkMsaUJBQXhCLENBQTBDNUUsZUFKL0QsR0FJaUYsSUFKakYsR0FLQSxrQkFMQSxHQUtxQjJJLE1BQU0sQ0FBQ2hFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMEM3RSxnQkFML0QsR0FLa0YsSUFMbEYsR0FNQSx1QkFOQSxHQU0wQjRJLE1BQU0sQ0FBQ2hFLGdCQUFQLENBQXdCQyxpQkFBeEIsQ0FBMENqRixVQU5wRSxHQU1pRixJQVByRjtBQVNBVyxZQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEbUssZ0JBQTFELENBQTJFRixVQUEzRSxFQUF1RkQsUUFBdkYsRUFiQyxDQWVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILFdBM0NBLENBNkNEO0FBQ0E7QUFDQTs7QUFDSDtBQUNKLE9BN0ZELE1BOEZLLElBQUcsS0FBSzVMLFlBQUwsSUFBbUIsQ0FBdEIsRUFBd0I7QUFDN0I7QUFDSWQsUUFBQUEsVUFBVSxHQUFHLElBQWI7QUFDQSxZQUFJdUgsZUFBZSxHQUFDLEtBQUtqSCxjQUF6QjtBQUNBLFlBQUlrSCxNQUFNLEdBQUMsS0FBS2xILGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBWDtBQUNBNkIsUUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVltSyxJQUFaO0FBQ0F0SyxRQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWWtGLE1BQU0sQ0FBQ3BLLFNBQW5CO0FBQ0EsYUFBS2tELGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUJ4QixRQUF2QixHQUFnQyxJQUFoQzs7QUFFQSxZQUFHMEksTUFBTSxDQUFDcEssU0FBUCxJQUFrQnFQLElBQXJCLEVBQ0E7QUFDSTtBQUNBRSxVQUFBQSxVQUFVLEdBQUcsa0NBQWI7QUFDQUQsVUFBQUEsUUFBUSxHQUNBLHFCQUFxQmxGLE1BQU0sQ0FBQzNKLElBQTVCLEdBQW1DLElBQW5DLEdBQ0EsaUNBREEsR0FDb0MySixNQUFNLENBQUMvSSxXQUQzQyxHQUN5RCxJQUR6RCxHQUVBLHVDQUZBLEdBRTBDK0ksTUFBTSxDQUFDOUksV0FGakQsR0FFK0QsSUFGL0QsR0FHQSxnQkFIQSxHQUdtQjhJLE1BQU0sQ0FBQzdJLGFBSDFCLEdBRzBDLElBSDFDLEdBSUEsa0JBSkEsR0FJcUI2SSxNQUFNLENBQUMzSSxlQUo1QixHQUk4QyxJQUo5QyxHQUtBLGtCQUxBLEdBS3FCMkksTUFBTSxDQUFDNUksZ0JBTDVCLEdBSytDLElBTC9DLEdBTUEsdUJBTkEsR0FNMEI0SSxNQUFNLENBQUNoSixVQU5qQyxHQU04QyxJQU45QyxHQU9BLDhCQVBBLEdBT2lDLEtBQUs4QixjQUFMLENBQW9CLENBQXBCLEVBQXVCOUIsVUFQeEQsR0FPcUUsSUFSN0U7QUFVQVcsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRG1LLGdCQUExRCxDQUEyRUYsVUFBM0UsRUFBdUZELFFBQXZGLEVBYkosQ0FnQkk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsU0F2QkQsTUF5QkE7QUFDSTtBQUVBQyxVQUFBQSxVQUFVLEdBQUcsd0NBQWI7QUFDQUQsVUFBQUEsUUFBUSxHQUNBLHFCQUFxQmxGLE1BQU0sQ0FBQzNKLElBQTVCLEdBQW1DLElBQW5DLEdBQ0EsaUNBREEsR0FDb0MySixNQUFNLENBQUMvSSxXQUQzQyxHQUN5RCxJQUR6RCxHQUVBLHVDQUZBLEdBRTBDK0ksTUFBTSxDQUFDOUksV0FGakQsR0FFK0QsSUFGL0QsR0FHQSxnQkFIQSxHQUdtQjhJLE1BQU0sQ0FBQzdJLGFBSDFCLEdBRzBDLElBSDFDLEdBSUEsa0JBSkEsR0FJcUI2SSxNQUFNLENBQUMzSSxlQUo1QixHQUk4QyxJQUo5QyxHQUtBLGtCQUxBLEdBS3FCMkksTUFBTSxDQUFDNUksZ0JBTDVCLEdBSytDLElBTC9DLEdBTUEsdUJBTkEsR0FNMEI0SSxNQUFNLENBQUNoSixVQU5qQyxHQU04QyxJQU45QyxHQU9BLDhCQVBBLEdBT2lDLEtBQUs4QixjQUFMLENBQW9CLENBQXBCLEVBQXVCOUIsVUFQeEQsR0FPcUUsSUFSN0U7QUFVQVcsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRG1LLGdCQUExRCxDQUEyRUYsVUFBM0UsRUFBdUZELFFBQXZGLEVBZEosQ0FpQkk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsU0F4REwsQ0EwREk7QUFDQTtBQUNBOztBQUVIO0FBRUQsR0FyM0NxQjtBQXUzQ3JCdEIsRUFBQUEsdUJBdjNDcUIscUNBdzNDckI7QUFDUSxRQUFJMEIsR0FBRyxHQUFHLENBQVY7QUFDQSxRQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxRQUFJQyxXQUFXLEdBQUcsS0FBSzFNLGNBQXZCOztBQUNBLFNBQUssSUFBSXFELEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHcUosV0FBVyxDQUFDbEssTUFBeEMsRUFBZ0RhLEtBQUssRUFBckQsRUFBeUQ7QUFDckQsVUFBSXNKLE1BQU0sR0FBR0QsV0FBVyxDQUFDckosS0FBRCxDQUFYLENBQW1CbkYsVUFBaEM7O0FBRUEsVUFBSXlPLE1BQU0sR0FBR0gsR0FBYixFQUFrQjtBQUNkQyxRQUFBQSxXQUFXLEdBQUdwSixLQUFkO0FBQ0FtSixRQUFBQSxHQUFHLEdBQUdHLE1BQU47QUFDSDtBQUNKOztBQUVELFNBQUssSUFBSXRKLE9BQUssR0FBRyxDQUFqQixFQUFvQkEsT0FBSyxHQUFHcUosV0FBVyxDQUFDbEssTUFBeEMsRUFBZ0RhLE9BQUssRUFBckQsRUFBeUQ7QUFDckQsVUFBSXNKLE1BQU0sR0FBR0QsV0FBVyxDQUFDckosT0FBRCxDQUFYLENBQW1CbkYsVUFBaEM7QUFDQTJELE1BQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZMkssTUFBWjtBQUNQOztBQUVHOUssSUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksNEJBQTRCMEssV0FBVyxDQUFDRCxXQUFELENBQVgsQ0FBeUIzUCxTQUFqRTtBQUNBLFNBQUttUCx5QkFBTCxDQUErQlMsV0FBVyxDQUFDRCxXQUFELENBQVgsQ0FBeUIzUCxTQUF4RDtBQUNQLEdBNTRDb0I7QUE2NENyQjROLEVBQUFBLGFBQWEsRUFBQyx5QkFDZDtBQUFBOztBQUNJLFFBQUdqTSxXQUFXLElBQUVJLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NrRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEckIsTUFBMUUsRUFDQTtBQUNJWCxNQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSxVQUFaO0FBQ0EsV0FBSzRLLGFBQUw7QUFFQXpILE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsWUFBRyxNQUFJLENBQUMzRSxZQUFMLElBQW1CLENBQXRCLEVBQXdCO0FBQ3hCO0FBQ0ksZ0JBQUczQix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQ4QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGd0MsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQXdILEtBQTNILEVBQ0E7QUFDSSxjQUFBLE1BQUksQ0FBQ29GLGdCQUFMOztBQUNBLGtCQUFJOEIsZUFBZSxHQUFDLENBQXBCO0FBRUEsa0JBQUk1RixlQUFlLEdBQUNwSSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQwRixVQUE5RCxFQUFwQjs7QUFDQSxtQkFBSyxJQUFJeEQsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUc0RCxlQUFlLENBQUN6RSxNQUE1QyxFQUFvRGEsS0FBSyxFQUF6RCxFQUE2RDtBQUN6RCxvQkFBRzRELGVBQWUsQ0FBQzVELEtBQUQsQ0FBZixDQUF1QkgsZ0JBQXZCLENBQXdDQyxpQkFBeEMsQ0FBMERsRixjQUE3RCxFQUNBO0FBQ0k0TyxrQkFBQUEsZUFBZTtBQUNsQjtBQUNKOztBQUVELGtCQUFHQSxlQUFlLElBQUUsTUFBSSxDQUFDN00sY0FBTCxDQUFvQndDLE1BQXhDLEVBQWdEO0FBQ2hEO0FBQ0k5QyxrQkFBQUEsVUFBVSxHQUFDLElBQVg7O0FBQ0Esc0JBQUksQ0FBQ1YsWUFBRCxJQUFpQixDQUFDQyxZQUF0QixFQUFvQztBQUNoQyxvQkFBQSxNQUFJLENBQUM2TCx1QkFBTDtBQUNIO0FBRUosaUJBUEQsTUFRQTtBQUNJLG9CQUFJLENBQUNwTCxVQUFMLEVBQWlCO0FBQ2Isc0JBQUksQ0FBQ1YsWUFBRCxJQUFpQixDQUFDQyxZQUF0QixFQUFvQztBQUNoQ0wsb0JBQUFBLFVBQVUsR0FBRyxLQUFiOztBQUNBLG9CQUFBLE1BQUksQ0FBQ2lNLGdCQUFMO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUFDSixXQWhDRCxNQWlDSyxJQUFHLE1BQUksQ0FBQ3JLLFlBQUwsSUFBbUIsQ0FBdEIsRUFBd0I7QUFDN0I7QUFDSSxnQkFBSSxNQUFJLENBQUNSLGNBQUwsQ0FBb0IsTUFBSSxDQUFDZ0IsVUFBekIsRUFBcUNoRSxLQUF6QyxFQUNJNUMsV0FBVyxHQUFHLElBQWQsQ0FESixLQUdJRCxZQUFZLEdBQUcsSUFBZjtBQUVKMEgsWUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksbUJBQW1CN0gsWUFBL0I7QUFDQTBILFlBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLGtCQUFrQjVILFdBQTlCOztBQUNBLFlBQUEsTUFBSSxDQUFDMlEsZ0JBQUwsQ0FBc0IsSUFBdEI7O0FBQ0EsZ0JBQUk4QixlQUFlLEdBQUMsQ0FBcEI7QUFFQSxnQkFBSTVGLGVBQWUsR0FBQyxNQUFJLENBQUNqSCxjQUF6Qjs7QUFDQSxpQkFBSyxJQUFJcUQsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUc0RCxlQUFlLENBQUN6RSxNQUE1QyxFQUFvRGEsT0FBSyxFQUF6RCxFQUE2RDtBQUN6RCxrQkFBRzRELGVBQWUsQ0FBQzVELE9BQUQsQ0FBZixDQUF1QnBGLGNBQTFCLEVBQ0k0TyxlQUFlO0FBQ3RCOztBQUVELGdCQUFHQSxlQUFlLElBQUUsTUFBSSxDQUFDN00sY0FBTCxDQUFvQndDLE1BQXhDLEVBQWdEO0FBQ2hEO0FBQ1FwSSxnQkFBQUEsV0FBVyxHQUFHLElBQWQ7QUFDQUQsZ0JBQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0F1RixnQkFBQUEsVUFBVSxHQUFHLElBQWI7O0FBRUosb0JBQUksQ0FBQ1YsWUFBRCxJQUFpQixDQUFDQyxZQUF0QixFQUFvQztBQUNoQyxrQkFBQSxNQUFJLENBQUM2TCx1QkFBTDtBQUNIO0FBQ0osZUFURCxNQVVBO0FBQ0ksa0JBQUksQ0FBQ3BMLFVBQUwsRUFBaUI7QUFDYixvQkFBSSxDQUFDVixZQUFELElBQWlCLENBQUNDLFlBQXRCLEVBQW9DO0FBQ2hDTCxrQkFBQUEsVUFBVSxHQUFHLEtBQWI7O0FBQ0Esa0JBQUEsTUFBSSxDQUFDaU0sZ0JBQUw7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNKLE9BdkVTLEVBdUVQLElBdkVPLENBQVY7QUF3RUgsS0E3RUQsTUErRUE7QUFDSSxVQUFJLENBQUNuTCxVQUFMLEVBQWlCO0FBQ2JoQixRQUFBQSxRQUFRLEdBQUdBLFFBQVEsR0FBRyxDQUF0Qjs7QUFDQSxZQUFJZ0YsTUFBTSxHQUFHbkosRUFBRSxDQUFDb0osSUFBSCxDQUFROUUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ2tELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERwRixXQUExRCxFQUF1RXFGLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dDLENBQTFHLEVBQTZHbkYsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ2tELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERwRixXQUExRCxFQUF1RXFGLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dFLENBQS9NLENBQWI7O0FBQ0EsYUFBSzZJLFdBQUwsQ0FBaUIsS0FBS3hNLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsQ0FBakIsRUFBdUQwQyxNQUF2RDtBQUNIO0FBQ0o7QUFDSixHQXIrQ29CO0FBdStDckJtRSxFQUFBQSxTQUFTLEVBQUMsbUJBQVNrRixHQUFULEVBQWFQLEdBQWIsRUFDVjtBQUNJLFdBQU9RLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBaUJWLEdBQUcsR0FBR08sR0FBdkIsQ0FBWCxJQUEyQ0EsR0FBbEQsQ0FESixDQUMyRDtBQUMxRCxHQTErQ29CO0FBNCtDckJ0RCxFQUFBQSxXQUFXLEVBQUUscUJBQVVELElBQVYsRUFBZ0IyRCxNQUFoQixFQUF1QkMsSUFBdkIsRUFBNkI7QUFBQTs7QUFDdEM3UyxJQUFBQSxFQUFFLENBQUM4UyxLQUFILENBQVMsS0FBS2pOLFVBQWQsRUFDQ2tOLEVBREQsQ0FDSUYsSUFESixFQUNVO0FBQUVySixNQUFBQSxRQUFRLEVBQUV4SixFQUFFLENBQUNnVCxFQUFILENBQU0vRCxJQUFJLENBQUN4RixDQUFYLEVBQWN3RixJQUFJLENBQUN2RixDQUFuQjtBQUFaLEtBRFYsRUFDNkM7QUFBQ3VKLE1BQUFBLE1BQU0sRUFBQztBQUFSLEtBRDdDLEVBRUNDLElBRkQsQ0FFTSxZQUFNO0FBQ1osVUFBR04sTUFBSCxFQUNJLE1BQUksQ0FBQ08sWUFBTCxHQURKLEtBR0ksTUFBSSxDQUFDZCxhQUFMO0FBQ0gsS0FQRCxFQVFDZSxLQVJEO0FBU0gsR0F0L0NvQjtBQXcvQ3JCRCxFQUFBQSxZQXgvQ3FCLDBCQXcvQ0w7QUFBQTs7QUFDWnZJLElBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ1osVUFBRyxNQUFJLENBQUN6RCxNQUFMLENBQVlpSCxTQUFaLEdBQXNCLENBQXpCLEVBQ0E7QUFDRyxRQUFBLE1BQUksQ0FBQ2pILE1BQUwsQ0FBWWlILFNBQVosR0FBc0IsTUFBSSxDQUFDakgsTUFBTCxDQUFZaUgsU0FBWixHQUFzQixJQUE1Qzs7QUFDQSxRQUFBLE1BQUksQ0FBQytFLFlBQUw7QUFDRixPQUpELE1BTUE7QUFDRyxRQUFBLE1BQUksQ0FBQ2hNLE1BQUwsQ0FBWWlILFNBQVosR0FBc0IsQ0FBdEI7QUFDQSxRQUFBLE1BQUksQ0FBQy9HLGVBQUwsR0FBcUIsSUFBckI7O0FBQ0EsUUFBQSxNQUFJLENBQUM4SSxhQUFMO0FBQ0Y7QUFDSCxLQVpPLEVBWUwsRUFaSyxDQUFWO0FBYUgsR0F0Z0RvQjtBQXdnRHJCa0QsRUFBQUEscUJBeGdEcUIsaUNBd2dEQzVDLE1BeGdERCxFQXlnRHJCO0FBQUEsUUFEc0JBLE1BQ3RCO0FBRHNCQSxNQUFBQSxNQUN0QixHQUQ2QixLQUM3QjtBQUFBOztBQUNJLFFBQUl2TSxXQUFXLEdBQUdJLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NrRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEckIsTUFBNUUsRUFBb0Y7QUFDaEYsVUFBSXVILFFBQVEsQ0FBQ2xMLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NrRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEcEYsV0FBMUQsRUFBdUVxRixpQkFBdkUsQ0FBeUZuQyxZQUF6RixDQUFzRyxjQUF0RyxFQUFzSHFJLFNBQXRILENBQWdJQyxVQUFqSSxDQUFSLElBQXdKLENBQTVKLEVBQ0lqTCxZQUFZLEdBQUcsSUFBZjtBQUVKLFVBQUkrSyxRQUFRLENBQUNsTCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDa0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHBGLFdBQTFELEVBQXVFcUYsaUJBQXZFLENBQXlGbkMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0hxSSxTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUF3SixDQUE1SixFQUNJaEwsWUFBWSxHQUFHLElBQWY7QUFDUDs7QUFFREMsSUFBQUEsa0JBQWtCLEdBQUMsS0FBS2MsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUM5RCxpQkFBckMsQ0FBdURiLGlCQUExRTs7QUFDQSxRQUFHMkMsWUFBWSxJQUFJLENBQUNDLFlBQWpCLElBQWlDLENBQUNDLGtCQUFyQyxFQUNBO0FBQ0k7QUFDQTtBQUNBLFdBQUsyTywwQkFBTCxDQUFnQyxLQUFoQyxFQUFzQzdDLE1BQXRDO0FBQ0gsS0FMRCxNQU1LLElBQUkvTCxZQUFELElBQW1CRCxZQUFZLElBQUlFLGtCQUF0QyxFQUNMO0FBQ0k7QUFDQTtBQUNBLFdBQUsyTywwQkFBTCxDQUFnQyxJQUFoQyxFQUFxQzdDLE1BQXJDO0FBQ0gsS0FMSSxNQU9MO0FBQ0ksV0FBS1QsWUFBTDtBQUNIO0FBQ0osR0FuaURvQjtBQXFpRHJCcUMsRUFBQUEsYUFyaURxQiwyQkFxaURKO0FBQUE7O0FBQ2J6SCxJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLFVBQUcsTUFBSSxDQUFDekQsTUFBTCxDQUFZaUgsU0FBWixJQUF1QixDQUExQixFQUNBO0FBQ0csUUFBQSxNQUFJLENBQUMvRyxlQUFMLEdBQXFCLEtBQXJCO0FBQ0EsUUFBQSxNQUFJLENBQUNGLE1BQUwsQ0FBWWlILFNBQVosR0FBc0IsTUFBSSxDQUFDakgsTUFBTCxDQUFZaUgsU0FBWixHQUFzQixJQUE1Qzs7QUFDQSxRQUFBLE1BQUksQ0FBQ2lFLGFBQUw7QUFDRixPQUxELE1BT0E7QUFDSSxRQUFBLE1BQUksQ0FBQ3hNLFVBQUwsQ0FBZ0IyRCxRQUFoQixHQUF5QnhKLEVBQUUsQ0FBQ29KLElBQUgsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUF6QjtBQUNBLFFBQUEsTUFBSSxDQUFDakMsTUFBTCxDQUFZaUgsU0FBWixHQUFzQixDQUF0QjtBQUVBOUosUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRGlILDJCQUExRCxDQUFzRixDQUF0Rjs7QUFFQSxZQUFJLE1BQUksQ0FBQzdJLFlBQUwsSUFBcUIsQ0FBekIsRUFDQTtBQUNJLGNBQUksTUFBSSxDQUFDUixjQUFMLENBQW9CLE1BQUksQ0FBQ2dCLFVBQXpCLEVBQXFDaEUsS0FBckMsSUFBOEMsQ0FBQzVDLFdBQW5ELEVBQWdFO0FBQ3hELFlBQUEsTUFBSSxDQUFDd1QscUJBQUwsQ0FBMkIsTUFBSSxDQUFDNU4sY0FBTCxDQUFvQixNQUFJLENBQUNnQixVQUF6QixFQUFxQ2hFLEtBQWhFO0FBQ1AsV0FGRCxNQUVPO0FBQ0gsZ0JBQUksQ0FBQyxNQUFJLENBQUNnRCxjQUFMLENBQW9CLE1BQUksQ0FBQ2dCLFVBQXpCLEVBQXFDaEUsS0FBdEMsSUFBK0MsQ0FBQzdDLFlBQXBELEVBQWtFO0FBQzFELGNBQUEsTUFBSSxDQUFDeVQscUJBQUwsQ0FBMkIsTUFBSSxDQUFDNU4sY0FBTCxDQUFvQixNQUFJLENBQUNnQixVQUF6QixFQUFxQ2hFLEtBQWhFO0FBQ1A7QUFDSjtBQUNKOztBQUVELFlBQUcsTUFBSSxDQUFDd0QsWUFBTCxJQUFtQixDQUF0QixFQUF5QjtBQUN6QjtBQUNJLGdCQUFHLE1BQUksQ0FBQ1IsY0FBTCxDQUFvQixNQUFJLENBQUNnQixVQUF6QixFQUFxQ2xFLFNBQXJDLElBQWdEK0Isd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlcsSUFBN0YsQ0FBa0dXLE1BQXJKLEVBQ0ksTUFBSSxDQUFDb0oscUJBQUwsR0FESixLQUdJLE1BQUksQ0FBQ3JELFlBQUw7QUFDUDtBQUVKO0FBQ0gsS0FsQ1EsRUFrQ04sRUFsQ00sQ0FBVjtBQW9DSCxHQTFrRG9CO0FBNGtEckJ1QyxFQUFBQSxXQUFXLEVBQUUscUJBQVUzTSxJQUFWLEVBQWUyTixLQUFmLEVBQXNCO0FBQUE7O0FBQy9CdlQsSUFBQUEsRUFBRSxDQUFDOFMsS0FBSCxDQUFTbE4sSUFBVCxFQUFlO0FBQWYsS0FDQ21OLEVBREQsQ0FDSSxLQURKLEVBQ1c7QUFBRXZKLE1BQUFBLFFBQVEsRUFBRXhKLEVBQUUsQ0FBQ2dULEVBQUgsQ0FBTU8sS0FBSyxDQUFDOUosQ0FBWixFQUFlOEosS0FBSyxDQUFDN0osQ0FBckI7QUFBWixLQURYLEVBQ2dEO0FBQUN1SixNQUFBQSxNQUFNLEVBQUM7QUFBUixLQURoRCxFQUVDQyxJQUZELENBRU0sWUFBTTtBQUNaLFVBQUcvTyxRQUFRLEdBQUNDLFFBQVosRUFDQTtBQUNJa0QsUUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVl0RCxRQUFRLEdBQUcsR0FBWCxHQUFpQkQsV0FBN0I7O0FBRUEsWUFBSSxNQUFJLENBQUMrQixZQUFMLElBQXFCLENBQXpCLEVBQTRCO0FBQzVCO0FBQ0ksZ0JBQUksTUFBSSxDQUFDUixjQUFMLENBQW9CLE1BQUksQ0FBQ2dCLFVBQXpCLEVBQXFDaEUsS0FBekMsRUFBZ0Q7QUFFNUMsa0JBQUksQ0FBQzVDLFdBQUwsRUFBa0I7QUFDZCxvQkFBSTJQLFFBQVEsQ0FBQ2xMLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NrRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEcEYsV0FBMUQsRUFBdUVxRixpQkFBdkUsQ0FBeUZuQyxZQUF6RixDQUFzRyxjQUF0RyxFQUFzSHFJLFNBQXRILENBQWdJQyxVQUFqSSxDQUFSLElBQXdKLENBQTVKLEVBQ0lqTCxZQUFZLEdBQUcsSUFBZjtBQUNQLGVBSEQsTUFJQTtBQUNJNkMsZ0JBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLGtCQUFaO0FBQ0g7QUFDSixhQVRELE1BV0E7QUFDSSxrQkFBSSxDQUFDN0gsWUFBTCxFQUFtQjtBQUNmLG9CQUFJNFAsUUFBUSxDQUFDbEwsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ2tELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERwRixXQUExRCxFQUF1RXFGLGlCQUF2RSxDQUF5Rm5DLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIcUksU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQVIsSUFBd0osQ0FBNUosRUFDSWpMLFlBQVksR0FBRyxJQUFmO0FBQ1AsZUFIRCxNQUlBO0FBQ0k2QyxnQkFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksNEJBQVo7QUFDSDtBQUNKLGFBcEJMLENBc0JHOztBQUNGOztBQUVELFlBQUcsTUFBSSxDQUFDeEIsWUFBTCxJQUFtQixDQUF0QixFQUNBO0FBQ0ksY0FBRyxNQUFJLENBQUNSLGNBQUwsQ0FBb0IsTUFBSSxDQUFDZ0IsVUFBekIsRUFBcUNsRSxTQUFyQyxJQUFnRCtCLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDhCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZXLElBQTdGLENBQWtHVyxNQUFySixFQUNBO0FBQ0ksZ0JBQUksQ0FBQyxNQUFJLENBQUN4RSxjQUFMLENBQW9CLE1BQUksQ0FBQ2dCLFVBQXpCLEVBQXFDL0MsY0FBMUMsRUFBMEQ7QUFDdEQsa0JBQUk4TCxRQUFRLENBQUNsTCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDa0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHBGLFdBQTFELEVBQXVFcUYsaUJBQXZFLENBQXlGbkMsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0hxSSxTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUF3SixDQUE1SixFQUNJakwsWUFBWSxHQUFHLElBQWY7QUFDUCxhQUhELE1BSUE7QUFDSTZDLGNBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLHdCQUF3QixNQUFJLENBQUNoQyxjQUFMLENBQW9CLE1BQUksQ0FBQ2dCLFVBQXpCLEVBQXFDbkUsVUFBekU7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsWUFBSTRCLFdBQVcsR0FBR0ksd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ2tELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERyQixNQUE1RSxFQUFvRjtBQUNoRixjQUFJL0QsV0FBVyxJQUFJLEVBQW5CLEVBQ0lBLFdBQVcsR0FBR0EsV0FBVyxHQUFHLEVBQTVCLENBREosS0FHSUEsV0FBVyxHQUFHQSxXQUFXLEdBQUcsQ0FBNUI7QUFDUCxTQUxELE1BS087QUFDQ0EsVUFBQUEsV0FBVyxHQUFHQSxXQUFXLEdBQUcsQ0FBNUI7QUFDQUMsVUFBQUEsUUFBUSxHQUFHQyxRQUFYO0FBQ1AsU0FuREwsQ0FxREk7OztBQUNBa0QsUUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVl0RCxRQUFRLEdBQUMsR0FBVCxHQUFhRCxXQUF6Qjs7QUFFQSxRQUFBLE1BQUksQ0FBQ2lNLGFBQUwsR0F4REosQ0F5REk7O0FBRUgsT0E1REQsTUE4REE7QUFDSSxZQUFJcUQsT0FBTyxHQUFDeFQsRUFBRSxDQUFDb0osSUFBSCxDQUFRLENBQVIsRUFBVSxDQUFWLENBQVo7O0FBQ0EsUUFBQSxNQUFJLENBQUM4RixXQUFMLENBQWlCc0UsT0FBakIsRUFBMEIsS0FBMUIsRUFBaUMsR0FBakMsRUFGSixDQUUyQzs7QUFDMUM7QUFFQSxLQXRFRCxFQXVFQ0osS0F2RUQ7QUF3RUgsR0FycERvQjtBQXVwRHJCO0FBRUFLLEVBQUFBLFlBenBEcUIsd0JBeXBEUkMsSUF6cERRLEVBeXBESEMsSUF6cERHLEVBMHBEckI7QUFDSWxQLElBQUFBLFlBQVksR0FBQ2lQLElBQWI7QUFDQWhQLElBQUFBLFlBQVksR0FBQ2lQLElBQWI7QUFDSCxHQTdwRG9CO0FBK3BEckJDLEVBQUFBLDJCQS9wRHFCLHVDQStwRE9DLE1BL3BEUCxFQStwRGNwRyxNQS9wRGQsRUErcERxQnFHLGFBL3BEckIsRUErcERtQ0Msb0JBL3BEbkMsRUErcERnRUMsVUEvcERoRSxFQStwRCtFQyw0QkEvcEQvRSxFQWdxRHJCO0FBQUEsUUFEd0RGLG9CQUN4RDtBQUR3REEsTUFBQUEsb0JBQ3hELEdBRCtFLEtBQy9FO0FBQUE7O0FBQUEsUUFEcUZDLFVBQ3JGO0FBRHFGQSxNQUFBQSxVQUNyRixHQURrRyxDQUNsRztBQUFBOztBQUFBLFFBRG9HQyw0QkFDcEc7QUFEb0dBLE1BQUFBLDRCQUNwRyxHQURpSSxLQUNqSTtBQUFBOztBQUNJLFFBQUksS0FBS3hPLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDL0QsWUFBckMsQ0FBa0QrSyxNQUFsRCxFQUEwRGhNLGFBQTFELENBQXdFd0csTUFBeEUsR0FBaUYsQ0FBckYsRUFBd0Y7QUFDcEYsVUFBSSxDQUFDOEwsb0JBQUwsRUFBMkI7QUFDdkIsWUFBSSxLQUFLdE8sY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUN6RCxJQUFyQyxJQUE2QzZRLE1BQWpELEVBQXlEO0FBQ3JELGVBQUtwTyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ3pELElBQXJDLEdBQTRDLEtBQUt5QyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ3pELElBQXJDLEdBQTRDNlEsTUFBeEY7QUFDQSxlQUFLcE8sY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUMzRCxvQkFBckMsR0FBNEQsS0FBSzJDLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDM0Qsb0JBQXJDLEdBQTRELENBQXhIOztBQUNBLGVBQUsyQyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQy9ELFlBQXJDLENBQWtEK0ssTUFBbEQsRUFBMERoTSxhQUExRCxDQUF3RStKLElBQXhFLENBQTZFc0ksYUFBN0U7O0FBQ0F4UCxVQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEMEUsU0FBMUQsQ0FBb0UsK0NBQXBFLEVBQXFILElBQXJIO0FBQ0EzQixVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNidEcsWUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRHFNLHNDQUExRDtBQUNILFdBRlMsRUFFUCxJQUZPLENBQVY7QUFHSCxTQVJELE1BU0s7QUFDRDVQLFVBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMEQwRSxTQUExRCxDQUFvRSx1RUFBdUVzSCxNQUEzSTtBQUNIO0FBQ0osT0FiRCxNQWNLO0FBQ0QsWUFBSUcsVUFBVSxJQUFJSCxNQUFsQixFQUEwQjtBQUN0QkcsVUFBQUEsVUFBVSxHQUFHQSxVQUFVLEdBQUdILE1BQTFCO0FBQ0EsZUFBS3BPLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDM0Qsb0JBQXJDLEdBQTRELEtBQUsyQyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQzNELG9CQUFyQyxHQUE0RCxDQUF4SDs7QUFDQSxlQUFLMkMsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUMvRCxZQUFyQyxDQUFrRCtLLE1BQWxELEVBQTBEaE0sYUFBMUQsQ0FBd0UrSixJQUF4RSxDQUE2RXNJLGFBQTdFOztBQUNBeFAsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRDBFLFNBQTFELENBQW9FLCtDQUFwRSxFQUFxSCxJQUFySDtBQUNBM0IsVUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYnRHLFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMERxTSxzQ0FBMUQ7QUFDSCxXQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0gsU0FSRCxNQVNLO0FBQ0Q1UCxVQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEMEUsU0FBMUQsQ0FBb0UsdUVBQXVFc0gsTUFBdkUsR0FBZ0YsZ0JBQWhGLEdBQW1HRyxVQUF2SztBQUNIO0FBQ0o7QUFDSixLQTdCRCxNQThCQTtBQUNJMVAsTUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRDBFLFNBQTFELENBQW9FLG9FQUFwRTtBQUNIO0FBRUosR0Fuc0RvQjtBQXFzRHJCNEgsRUFBQUEsMkNBcnNEcUIsdURBcXNEdUJKLG9CQXJzRHZCLEVBcXNEb0RDLFVBcnNEcEQsRUFxc0RtRUMsNEJBcnNEbkUsRUFzc0RyQjtBQUFBLFFBRDRDRixvQkFDNUM7QUFENENBLE1BQUFBLG9CQUM1QyxHQURtRSxLQUNuRTtBQUFBOztBQUFBLFFBRHlFQyxVQUN6RTtBQUR5RUEsTUFBQUEsVUFDekUsR0FEc0YsQ0FDdEY7QUFBQTs7QUFBQSxRQUR3RkMsNEJBQ3hGO0FBRHdGQSxNQUFBQSw0QkFDeEYsR0FEcUgsS0FDckg7QUFBQTs7QUFDSXpQLElBQUFBLHFCQUFxQixHQUFDLEVBQXRCO0FBRUE4QyxJQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSxLQUFLaEMsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUMvRCxZQUFqRDs7QUFDQSxTQUFLLElBQUkwUixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUszTyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQy9ELFlBQXJDLENBQWtEdUYsTUFBdEUsRUFBOEVtTSxDQUFDLEVBQS9FLEVBQW1GO0FBQy9FLFVBQUc1RSxRQUFRLENBQUMsS0FBSy9KLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDL0QsWUFBckMsQ0FBa0QwUixDQUFsRCxFQUFxRDFULFlBQXRELENBQVIsSUFBNkUsQ0FBaEYsRUFBbUY7QUFDbkY7QUFDSSxjQUFJMlQsSUFBSSxHQUFHclUsRUFBRSxDQUFDc1UsV0FBSCxDQUFlaFEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRDBNLG1CQUExRCxDQUE4RUMsb0JBQTdGLENBQVg7QUFDQUgsVUFBQUEsSUFBSSxDQUFDdEcsTUFBTCxHQUFjekosd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRDBNLG1CQUExRCxDQUE4RUUsMkJBQTVGO0FBQ0FKLFVBQUFBLElBQUksQ0FBQ2pOLFlBQUwsQ0FBa0IsdUJBQWxCLEVBQTJDc04sZ0JBQTNDLENBQTRETixDQUE1RDtBQUNBQyxVQUFBQSxJQUFJLENBQUNqTixZQUFMLENBQWtCLHVCQUFsQixFQUEyQ21HLE9BQTNDLENBQW1ELEtBQUs5SCxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQy9ELFlBQXJDLENBQWtEMFIsQ0FBbEQsRUFBcURuVCxZQUF4RztBQUNBb1QsVUFBQUEsSUFBSSxDQUFDak4sWUFBTCxDQUFrQix1QkFBbEIsRUFBMkN1TixvQkFBM0MsQ0FBZ0VaLG9CQUFoRTtBQUNBTSxVQUFBQSxJQUFJLENBQUNqTixZQUFMLENBQWtCLHVCQUFsQixFQUEyQ3dOLFlBQTNDLENBQXdEWixVQUF4RDtBQUNBSyxVQUFBQSxJQUFJLENBQUNqTixZQUFMLENBQWtCLHVCQUFsQixFQUEyQ3lOLDhCQUEzQyxDQUEwRVosNEJBQTFFO0FBQ0FJLFVBQUFBLElBQUksQ0FBQ2pOLFlBQUwsQ0FBa0IsdUJBQWxCLEVBQTJDME4sWUFBM0M7QUFDQXRRLFVBQUFBLHFCQUFxQixDQUFDZ0gsSUFBdEIsQ0FBMkI2SSxJQUEzQjtBQUNIO0FBQ0o7O0FBQ0QvTSxJQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWWpELHFCQUFaO0FBQ0EsV0FBT0EscUJBQXFCLENBQUN5RCxNQUE3QjtBQUNILEdBMXREb0I7QUE0dERyQjhNLEVBQUFBLHFCQTV0RHFCLG1DQTZ0RHJCO0FBQ0ksU0FBSyxJQUFJak0sS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd0RSxxQkFBcUIsQ0FBQ3lELE1BQWxELEVBQTBEYSxLQUFLLEVBQS9ELEVBQW1FO0FBQy9EdEUsTUFBQUEscUJBQXFCLENBQUNzRSxLQUFELENBQXJCLENBQTZCa00sT0FBN0I7QUFDSDs7QUFFRHhRLElBQUFBLHFCQUFxQixHQUFDLEVBQXRCO0FBQ0gsR0FudURvQjtBQXF1RHJCeVEsRUFBQUEseUJBcnVEcUIscUNBcXVES0MsS0FydURMLEVBcXVEV0MsWUFydURYLEVBcXVEd0JDLFNBcnVEeEIsRUFzdURyQjtBQUNJLFFBQUdBLFNBQUgsRUFDQTtBQUNJLFVBQUlDLE1BQU0sR0FBQyxJQUFJbFQsU0FBSixFQUFYOztBQUNBa1QsTUFBQUEsTUFBTSxDQUFDcFUsWUFBUCxHQUFvQmlVLEtBQXBCO0FBQ0FHLE1BQUFBLE1BQU0sQ0FBQ2pULFdBQVAsR0FBbUIrUyxZQUFuQjtBQUVBLFdBQUsxUCxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQzFELFVBQXJDLENBQWdEeUksSUFBaEQsQ0FBcUQ2SixNQUFyRDtBQUNIO0FBQ0osR0EvdURvQjtBQWl2RHJCL0IsRUFBQUEsMEJBanZEcUIsc0NBaXZETWdDLGVBanZETixFQWl2RDRCN0UsTUFqdkQ1QixFQWl2RHlDOEUsb0JBanZEekMsRUFpdkRvRUMsc0JBanZEcEUsRUFpdkQ2RkMsUUFqdkQ3RixFQWl2RHdHM0UsUUFqdkR4RyxFQWl2RG1IQyxXQWp2RG5ILEVBa3ZEckI7QUFBQTs7QUFBQSxRQUQyQnVFLGVBQzNCO0FBRDJCQSxNQUFBQSxlQUMzQixHQUQyQyxLQUMzQztBQUFBOztBQUFBLFFBRGlEN0UsTUFDakQ7QUFEaURBLE1BQUFBLE1BQ2pELEdBRHdELEtBQ3hEO0FBQUE7O0FBQUEsUUFEOEQ4RSxvQkFDOUQ7QUFEOERBLE1BQUFBLG9CQUM5RCxHQURtRixLQUNuRjtBQUFBOztBQUFBLFFBRHlGQyxzQkFDekY7QUFEeUZBLE1BQUFBLHNCQUN6RixHQURnSCxDQUNoSDtBQUFBOztBQUFBLFFBRGtIQyxRQUNsSDtBQURrSEEsTUFBQUEsUUFDbEgsR0FEMkgsQ0FDM0g7QUFBQTs7QUFBQSxRQUQ2SDNFLFFBQzdIO0FBRDZIQSxNQUFBQSxRQUM3SCxHQURzSSxDQUN0STtBQUFBOztBQUFBLFFBRHdJQyxXQUN4STtBQUR3SUEsTUFBQUEsV0FDeEksR0FEb0osQ0FDcEo7QUFBQTs7QUFDSSxRQUFJd0Usb0JBQUosRUFBMEI7QUFDdEIsVUFBSUcsTUFBTSxHQUFHLFFBQWI7QUFDQXBSLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMEQ4TixpQkFBMUQsQ0FBNEVELE1BQTVFLEVBQW1GLEtBQW5GLEVBQTBGLEtBQTFGLEVBQWlHLEtBQWpHLEVBQXdHakYsTUFBeEcsRUFBK0c4RSxvQkFBL0csRUFBb0lDLHNCQUFwSSxFQUEySkMsUUFBM0osRUFBb0szRSxRQUFwSyxFQUE2S0MsV0FBN0s7QUFDSCxLQUhELE1BSUs7QUFDRGxNLE1BQUFBLGVBQWUsR0FBRyxLQUFLWSxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQzlELGlCQUFyQyxDQUF1RFgsY0FBekU7QUFDQThDLE1BQUFBLGlCQUFpQixHQUFHLEtBQUtXLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDOUQsaUJBQXJDLENBQXVEVixnQkFBM0U7QUFDQThDLE1BQUFBLGlCQUFpQixHQUFHLEtBQUtVLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDOUQsaUJBQXJDLENBQXVEVCxnQkFBM0U7O0FBRUEsVUFBSTJDLGVBQUosRUFBcUI7QUFDckI7QUFDSSxlQUFLK1Esc0JBQUwsQ0FBNEIsS0FBNUI7O0FBRUEsY0FBSSxDQUFDbkYsTUFBTCxFQUFhO0FBQ1RuTSxZQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEMEUsU0FBMUQsQ0FBb0Usa0JBQXBFLEVBQXdGLElBQXhGO0FBQ0EzQixZQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLGNBQUEsTUFBSSxDQUFDb0YsWUFBTDtBQUNILGFBRlMsRUFFUCxJQUZPLENBQVY7QUFHSCxXQUxELE1BS087QUFDSDFJLFlBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLGtCQUFaO0FBQ0FtRCxZQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLGNBQUEsTUFBSSxDQUFDb0YsWUFBTDtBQUNILGFBRlMsRUFFUCxHQUZPLENBQVY7QUFHSDtBQUNKLFNBZkQsTUFnQks7QUFDRCxZQUFJMEYsTUFBTSxHQUFHLEVBQWI7QUFFQSxZQUFJSixlQUFKLEVBQ0lJLE1BQU0sR0FBRyxjQUFULENBREosS0FHSUEsTUFBTSxHQUFHLFFBQVQ7QUFFSnBSLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMEQ4TixpQkFBMUQsQ0FBNEVELE1BQTVFLEVBQW9GSixlQUFwRixFQUFxR3hRLGlCQUFyRyxFQUF3SEMsaUJBQXhILEVBQTJJMEwsTUFBM0k7QUFDSDtBQUNKO0FBQ0osR0F2eERvQjtBQXl4RHJCb0YsRUFBQUEscUJBenhEcUIsbUNBMHhEckI7QUFDSSxTQUFLcFEsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNwRCxVQUFyQyxHQUFnRCxJQUFoRDtBQUNBLFNBQUtvQyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ25ELGNBQXJDLElBQXFELENBQXJEO0FBQ0FnQixJQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEUSw4QkFBMUQsQ0FBeUYsSUFBekYsRUFBOEYsS0FBOUYsRUFBb0csS0FBS3BDLFlBQXpHLEVBQXNILEtBQUtSLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDcEQsVUFBM0osRUFBc0ssS0FBS29DLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDbkQsY0FBM007QUFDSCxHQTl4RG9CO0FBZ3lEckJ3UyxFQUFBQSwrQkFoeURxQiwyQ0FneURXQyxPQWh5RFgsRUFneURtQkMsSUFoeURuQixFQWl5RHJCO0FBQ0ksUUFBSTNMLEtBQUssR0FBRztBQUFFZixNQUFBQSxJQUFJLEVBQUU7QUFBRXRHLFFBQUFBLElBQUksRUFBRStTLE9BQVI7QUFBaUJFLFFBQUFBLEVBQUUsRUFBRUQ7QUFBckI7QUFBUixLQUFaO0FBQ0ExUixJQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDbUUsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE4RUYsS0FBOUU7QUFDSCxHQXB5RG9CO0FBc3lEckI2TCxFQUFBQSxrQ0F0eURxQiw4Q0FzeURjN0wsS0F0eURkLEVBdXlEckI7QUFDSSxRQUFJL0Ysd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEWSxhQUE5RCxNQUFpRixLQUFyRixFQUNBO0FBQ0ksVUFBSXVPLE9BQU8sR0FBRzFMLEtBQUssQ0FBQ2YsSUFBTixDQUFXdEcsSUFBekI7QUFDQSxVQUFJbVQsR0FBRyxHQUFDOUwsS0FBSyxDQUFDZixJQUFOLENBQVcyTSxFQUFuQjs7QUFFQSxVQUFJRyxRQUFRLEdBQUcsS0FBSzdOLFVBQUwsRUFBZjs7QUFFQSxVQUFJLEtBQUs5QyxjQUFMLENBQW9CMlEsUUFBcEIsRUFBOEI3VCxTQUE5QixJQUEyQzRULEdBQS9DLEVBQW9EO0FBRWhELFlBQUksS0FBSzFRLGNBQUwsQ0FBb0IyUSxRQUFwQixFQUE4QjFTLGNBQTlCLElBQWdELElBQXBELEVBQTBEO0FBQ3RELGVBQUsrQixjQUFMLENBQW9CMlEsUUFBcEIsRUFBOEJ6UyxVQUE5QixJQUEwQ29TLE9BQTFDO0FBQ0g7O0FBRUQsYUFBS3RRLGNBQUwsQ0FBb0IyUSxRQUFwQixFQUE4QnBULElBQTlCLElBQXNDK1MsT0FBdEM7QUFDQXpSLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMEQwRSxTQUExRCxDQUFvRSxrQ0FBa0N3SixPQUFsQyxHQUE0QyxxQkFBaEgsRUFBc0ksSUFBdEk7QUFDQXpSLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDhCLFdBQTlELEdBQTRFd0IsaUJBQTVFLENBQThGLG1CQUE5RixFQUFtSCxLQUFLekUsY0FBTCxDQUFvQjJRLFFBQXBCLENBQW5IO0FBQ0g7QUFDSjtBQUNKLEdBMXpEb0I7QUE0ekR6QjtBQUVJO0FBQ0FDLEVBQUFBLHVCQS96RHFCLG1DQSt6REdDLE1BL3pESCxFQWcwRHJCO0FBQ0kzUixJQUFBQSxrQkFBa0IsR0FBQzJSLE1BQW5CO0FBQ0EsU0FBSzdRLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDOUQsaUJBQXJDLENBQXVEYixpQkFBdkQsR0FBeUU2QyxrQkFBekU7QUFDSCxHQW4wRG9CO0FBcTBEckI2SCxFQUFBQSxrQkFyMERxQiw4QkFxMERGOEosTUFyMERFLEVBczBEckI7QUFDSTFSLElBQUFBLGFBQWEsR0FBQzBSLE1BQWQ7QUFDQSxTQUFLN1EsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUM5RCxpQkFBckMsQ0FBdURaLFlBQXZELEdBQW9FNkMsYUFBcEU7QUFDSCxHQXowRG9CO0FBMjBEckJnUixFQUFBQSxzQkEzMERxQixrQ0EyMERFVSxNQTMwREYsRUE0MERyQjtBQUNJelIsSUFBQUEsZUFBZSxHQUFDeVIsTUFBaEI7QUFDQSxTQUFLN1EsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUM5RCxpQkFBckMsQ0FBdURYLGNBQXZELEdBQXNFNkMsZUFBdEU7QUFDSCxHQS8wRG9CO0FBaTFEckIwUixFQUFBQSwwQkFqMURxQixzQ0FpMURNRCxNQWoxRE4sRUFrMURyQjtBQUNJeFIsSUFBQUEsaUJBQWlCLEdBQUN3UixNQUFsQjtBQUNBLFNBQUs3USxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQzlELGlCQUFyQyxDQUF1RFYsZ0JBQXZELEdBQXdFNkMsaUJBQXhFO0FBQ0gsR0FyMURvQjtBQXUxRHJCMFIsRUFBQUEsK0JBdjFEcUIsMkNBdTFEV0YsTUF2MURYLEVBdzFEckI7QUFDSXZSLElBQUFBLGlCQUFpQixHQUFDdVIsTUFBbEI7QUFDQSxTQUFLN1EsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUM5RCxpQkFBckMsQ0FBdURULGdCQUF2RCxHQUF3RTZDLGlCQUF4RTtBQUNILEdBMzFEb0I7QUE2MURyQmlILEVBQUFBLGtCQTcxRHFCLDhCQTYxREZzSyxNQTcxREUsRUE4MURyQjtBQUNJclIsSUFBQUEsY0FBYyxHQUFDcVIsTUFBZjtBQUNILEdBaDJEb0I7QUFrMkRyQkcsRUFBQUEsa0JBbDJEcUIsZ0NBbTJEckI7QUFDSSxXQUFPeFIsY0FBUDtBQUNILEdBcjJEb0I7QUF1MkRyQnlSLEVBQUFBLHFCQXYyRHFCLG1DQXcyRHJCO0FBQ0ksUUFBSUMsV0FBVyxHQUFDLENBQUMsQ0FBakI7O0FBQ0EsUUFBRyxLQUFLbFIsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUN0RCxlQUFyQyxHQUFxRCxDQUF4RCxFQUNBO0FBQ0l3VCxNQUFBQSxXQUFXLEdBQUMsS0FBS2xSLGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDdEQsZUFBakQ7QUFDQSxXQUFLc0MsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUN0RCxlQUFyQyxHQUFxRCxDQUFyRDtBQUNILEtBSkQsTUFNQTtBQUNJd1QsTUFBQUEsV0FBVyxHQUFDLENBQVo7QUFDSDs7QUFFRCxXQUFPQSxXQUFQO0FBQ0gsR0FyM0RvQjtBQXUzRHJCQyxFQUFBQSxzQkF2M0RxQixrQ0F1M0RFQyxXQXYzREYsRUF3M0RyQjtBQUNJLFFBQUlDLGdCQUFnQixHQUFDLENBQUMsQ0FBdEI7O0FBQ0EsUUFBRyxLQUFLclIsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUN0RCxlQUFyQyxHQUFxRCxDQUF4RCxFQUNBO0FBQ0kyVCxNQUFBQSxnQkFBZ0IsR0FBQyxLQUFLclIsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUN0RCxlQUFyQyxJQUFzRDBULFdBQXZFO0FBQ0gsS0FIRCxNQUtBO0FBQ0lDLE1BQUFBLGdCQUFnQixHQUFDLENBQWpCO0FBQ0g7O0FBRUQsV0FBT0EsZ0JBQVA7QUFDSCxHQXA0RG9CO0FBczREckJDLEVBQUFBLGlCQXQ0RHFCLDZCQXM0REhDLE9BdDRERyxFQXU0RHJCO0FBQ0ksUUFBSWpCLE9BQU8sR0FBQyxDQUFDLENBQWI7O0FBQ0EsUUFBRyxLQUFLdFEsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUN0RCxlQUFyQyxHQUFxRCxDQUF4RCxFQUNBO0FBQ0k2VCxNQUFBQSxPQUFPLEdBQUVBLE9BQU8sR0FBQyxHQUFqQjtBQUNBakIsTUFBQUEsT0FBTyxHQUFDLEtBQUt0USxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ3RELGVBQXJDLElBQXNENlQsT0FBOUQ7QUFDQSxXQUFLdlIsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUN0RCxlQUFyQyxHQUFxRCxDQUFyRDtBQUNBLFdBQUtzQyxjQUFMLENBQW9CLEtBQUtnQixVQUF6QixFQUFxQ3pELElBQXJDLElBQTJDK1MsT0FBM0M7QUFDSCxLQU5ELE1BUUE7QUFDSUEsTUFBQUEsT0FBTyxHQUFDLENBQVI7QUFDSDs7QUFFRCxXQUFPQSxPQUFQO0FBQ0gsR0F0NURvQjtBQXc1RHJCa0IsRUFBQUEsbUNBeDVEcUIsK0NBdzVEZTVNLEtBeDVEZixFQXk1RHJCO0FBQ0ksUUFBSTZNLE9BQU8sR0FBQzdNLEtBQUssQ0FBQzhNLE1BQWxCO0FBQ0EsUUFBSUMsY0FBYyxHQUFDL00sS0FBSyxDQUFDZ04sUUFBekI7QUFDQSxRQUFJM0csWUFBWSxHQUFDckcsS0FBSyxDQUFDaU4sU0FBdkI7O0FBQ0EsUUFBSUMsa0JBQWtCLEdBQUNqVCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEVBQXZCOztBQUVBLFFBQUdxUCxPQUFPLElBQUU1Uyx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQ4QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBN0YsQ0FBK0dyRyxTQUEzSCxFQUNBO0FBQ0krRSxNQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSxZQUFaOztBQUVBOFAsTUFBQUEsa0JBQWtCLENBQUNDLHVDQUFuQixDQUEyRCxJQUEzRDs7QUFFQXBTLE1BQUFBLGdCQUFnQixHQUFDZ1MsY0FBakI7QUFDQSxVQUFJSyxjQUFjLEdBQUNwUyxZQUFZLENBQUMrUixjQUFjLEdBQUMsQ0FBaEIsQ0FBL0I7O0FBQ0FHLE1BQUFBLGtCQUFrQixDQUFDRyxzQ0FBbkIsQ0FBMERELGNBQTFEO0FBQ0g7QUFDSixHQXo2RG9CO0FBMjZEckJFLEVBQUFBLG1DQTM2RHFCLCtDQTI2RGVDLFdBMzZEZixFQTQ2RHJCO0FBQUEsUUFEb0NBLFdBQ3BDO0FBRG9DQSxNQUFBQSxXQUNwQyxHQURnRCxLQUNoRDtBQUFBOztBQUNJLFFBQUlMLGtCQUFrQixHQUFDalQsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxFQUF2Qjs7QUFDQSxRQUFJZ1EsT0FBSjs7QUFDQSxRQUFJQyxTQUFKOztBQUNBLFFBQUcsS0FBSzdSLFlBQUwsSUFBbUIsQ0FBdEIsRUFBeUI7QUFDekI7QUFDSTZSLFFBQUFBLFNBQVMsR0FBQ3hULHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkVtSCxpQkFBN0UsRUFBVjtBQUNBZ0osUUFBQUEsT0FBTyxHQUFDdlQsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ1MseUJBQWxDLEdBQThEOEIsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RkMsaUJBQXJHO0FBQ0gsT0FKRCxNQUtLLElBQUcsS0FBSzNDLFlBQUwsSUFBbUIsQ0FBdEIsRUFBd0I7QUFDN0I7QUFDSTRSLFFBQUFBLE9BQU8sR0FBQyxLQUFLcFMsY0FBTCxDQUFvQixDQUFwQixDQUFSO0FBQ0FxUyxRQUFBQSxTQUFTLEdBQUMsS0FBS3JTLGNBQWY7QUFDSDs7QUFDRDhSLElBQUFBLGtCQUFrQixDQUFDUSxvQ0FBbkIsQ0FBd0QsSUFBeEQ7O0FBQ0FSLElBQUFBLGtCQUFrQixDQUFDUyxtQ0FBbkI7O0FBQ0FULElBQUFBLGtCQUFrQixDQUFDVSxtQ0FBbkIsQ0FBdURKLE9BQXZELEVBQStEQyxTQUEvRCxFQUF5RUYsV0FBekUsRUFBcUYsS0FBSzNSLFlBQTFGO0FBRUgsR0E5N0RvQjtBQWc4RHJCaVMsRUFBQUEseUNBaDhEcUIsdURBaThEckI7QUFDSSxRQUFJTCxPQUFPLEdBQUN2VCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQ4QixXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGQyxpQkFBekc7O0FBQ0EsUUFBSTJPLGtCQUFrQixHQUFDalQsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxFQUF2Qjs7QUFFQSxRQUFHZ1EsT0FBTyxDQUFDN1UsSUFBUixJQUFjLElBQWpCLEVBQ0E7QUFDSSxXQUFLLElBQUk4RixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLckQsY0FBTCxDQUFvQndDLE1BQWhELEVBQXdEYSxLQUFLLEVBQTdELEVBQWlFO0FBQzdELFlBQUcrTyxPQUFPLENBQUN0VixTQUFSLElBQW1CLEtBQUtrRCxjQUFMLENBQW9CcUQsS0FBcEIsRUFBMkJ2RyxTQUFqRCxFQUNBO0FBQ0ksZUFBS2tELGNBQUwsQ0FBb0JxRCxLQUFwQixFQUEyQjlGLElBQTNCLElBQWlDLElBQWpDO0FBQ0FzQixVQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDUyx5QkFBbEMsR0FBOEQ4QixXQUE5RCxHQUE0RXdCLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUgsS0FBS3pFLGNBQUwsQ0FBb0JxRCxLQUFwQixDQUFuSDtBQUNBO0FBQ0g7QUFDSjs7QUFFRHhFLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMEQwRSxTQUExRCxDQUFvRSxtREFBcEUsRUFBd0gsSUFBeEg7O0FBQ0FnTCxNQUFBQSxrQkFBa0IsQ0FBQ0MsdUNBQW5CLENBQTJELEtBQTNEOztBQUNBLFdBQUtXLDhCQUFMLENBQW9DLElBQXBDLEVBQXlDLEtBQXpDLEVBQStDLENBQUMsQ0FBaEQsRUFBa0ROLE9BQU8sQ0FBQ3RWLFNBQTFEO0FBQ0gsS0FkRCxNQWdCQTtBQUNJK0IsTUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRDBFLFNBQTFELENBQW9FLDZCQUFwRTtBQUNIO0FBQ0osR0F4OURvQjtBQTA5RHJCNkwsRUFBQUEsOENBMTlEcUIsNERBMjlEckI7QUFDSSxRQUFJYixrQkFBa0IsR0FBQ2pULHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsRUFBdkI7O0FBQ0EsUUFBSWdRLE9BQU8sR0FBQ3ZULHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDhCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZDLGlCQUF6RztBQUNBdEUsSUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRDBFLFNBQTFELENBQW9FLDhDQUFwRSxFQUFtSCxJQUFuSDs7QUFDQWdMLElBQUFBLGtCQUFrQixDQUFDQyx1Q0FBbkIsQ0FBMkQsS0FBM0Q7O0FBQ0EsU0FBS1csOEJBQUwsQ0FBb0MsS0FBcEMsRUFBMEMsSUFBMUMsRUFBK0MvUyxnQkFBL0MsRUFBZ0V5UyxPQUFPLENBQUN0VixTQUF4RTtBQUNILEdBaitEb0I7QUFtK0RyQjRWLEVBQUFBLDhCQW4rRHFCLDBDQW0rRFVFLGVBbitEVixFQW0rRDBCQyxvQkFuK0QxQixFQW0rRCtDbEIsY0FuK0QvQyxFQW0rRDhEbUIsT0FuK0Q5RCxFQW8rRHJCO0FBQ0ksUUFBSWxPLEtBQUssR0FBQztBQUFDbU8sTUFBQUEsV0FBVyxFQUFDSCxlQUFiO0FBQTZCSSxNQUFBQSxnQkFBZ0IsRUFBQ0gsb0JBQTlDO0FBQW1FSSxNQUFBQSxhQUFhLEVBQUN0QixjQUFqRjtBQUFnR25CLE1BQUFBLEVBQUUsRUFBQ3NDO0FBQW5HLEtBQVY7QUFDQWpVLElBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NtRSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTRFRixLQUE1RTtBQUNILEdBditEb0I7QUF5K0RyQnNPLEVBQUFBLGdDQXorRHFCLDRDQXkrRFl0TyxLQXorRFosRUEwK0RyQjtBQUFBOztBQUNJLFFBQUlrTixrQkFBa0IsR0FBQ2pULHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsRUFBdkI7O0FBQ0EsUUFBRyxLQUFLcEMsY0FBTCxDQUFvQixLQUFLZ0IsVUFBekIsRUFBcUNsRSxTQUFyQyxJQUFnRCtCLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RDhCLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZXLElBQTdGLENBQWtHVyxNQUFySixFQUNBO0FBQ0ksVUFBSW9PLGVBQWUsR0FBQ2hPLEtBQUssQ0FBQ21PLFdBQTFCO0FBQ0EsVUFBSUYsb0JBQW9CLEdBQUNqTyxLQUFLLENBQUNvTyxnQkFBL0I7QUFDQSxVQUFJckIsY0FBYyxHQUFDL00sS0FBSyxDQUFDcU8sYUFBekI7QUFDQSxVQUFJMUMsSUFBSSxHQUFDM0wsS0FBSyxDQUFDNEwsRUFBZjs7QUFFQSxVQUFHb0MsZUFBSCxFQUNBO0FBQ0kvVCxRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEK1Esc0NBQTFELENBQWlHLEtBQWpHO0FBQ0EsYUFBS25ULGNBQUwsQ0FBb0IsS0FBS2dCLFVBQXpCLEVBQXFDekQsSUFBckMsSUFBMkMsSUFBM0M7QUFDQXNCLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMEQwRSxTQUExRCxDQUFvRSwwR0FBcEUsRUFBK0ssSUFBL0s7O0FBQ0FnTCxRQUFBQSxrQkFBa0IsQ0FBQ1Esb0NBQW5CLENBQXdELEtBQXhEOztBQUNBLGFBQUt6SCxnQkFBTDtBQUVILE9BUkQsTUFRTSxJQUFHZ0ksb0JBQUgsRUFDTjtBQUNJLFlBQUlPLG9CQUFvQixHQUFDLENBQXpCOztBQUNBLFlBQUlDLFdBQVcsR0FBQ3hVLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NTLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkVtSCxpQkFBN0UsRUFBaEI7O0FBRUEsYUFBSyxJQUFJL0YsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdnUSxXQUFXLENBQUM3USxNQUF4QyxFQUFnRGEsS0FBSyxFQUFyRCxFQUF5RDtBQUNyRCxjQUFHa04sSUFBSSxJQUFFOEMsV0FBVyxDQUFDaFEsS0FBRCxDQUFYLENBQW1CSCxnQkFBbkIsQ0FBb0NDLGlCQUFwQyxDQUFzRHJHLFNBQS9ELEVBQ0E7QUFDSXNXLFlBQUFBLG9CQUFvQixHQUFDL1AsS0FBckI7QUFDQTtBQUNIO0FBQ0o7O0FBRUQsWUFBR3NPLGNBQWMsSUFBRSxDQUFuQixFQUFxQjtBQUNyQjtBQUNJLGdCQUFHMEIsV0FBVyxDQUFDRCxvQkFBRCxDQUFYLENBQWtDbFEsZ0JBQWxDLENBQW1EQyxpQkFBbkQsQ0FBcUVyRixrQkFBeEUsRUFDQTtBQUNJZSxjQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEMEUsU0FBMUQsQ0FDQyxzRUFERCxFQUN3RSxJQUR4RTtBQUVILGFBSkQsTUFLQTtBQUNJakksY0FBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRDBFLFNBQTFELENBQ0MsMEVBREQsRUFDNEUsSUFENUU7QUFFSDtBQUNKLFdBWEQsTUFXTSxJQUFHNkssY0FBYyxJQUFFLENBQW5CLEVBQXFCO0FBQzNCO0FBQ0ksZ0JBQUkyQixVQUFVLEdBQUMsS0FBZjs7QUFDQSxpQkFBSyxJQUFJalEsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUdnUSxXQUFXLENBQUNELG9CQUFELENBQVgsQ0FBa0NsUSxnQkFBbEMsQ0FBbURDLGlCQUFuRCxDQUFxRWxHLFlBQXJFLENBQWtGdUYsTUFBOUcsRUFBc0hhLE9BQUssRUFBM0gsRUFBK0g7QUFDM0gsa0JBQUdnUSxXQUFXLENBQUNELG9CQUFELENBQVgsQ0FBa0NsUSxnQkFBbEMsQ0FBbURDLGlCQUFuRCxDQUFxRWxHLFlBQXJFLENBQWtGb0csT0FBbEYsRUFBeUZwSCxTQUE1RixFQUNBO0FBQ0lxWCxnQkFBQUEsVUFBVSxHQUFDLElBQVg7QUFDQTtBQUNIO0FBQ0o7O0FBRUQsZ0JBQUdBLFVBQUgsRUFDQTtBQUNJelUsY0FBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRDBFLFNBQTFELENBQ0MsNkNBREQsRUFDK0MsSUFEL0M7QUFFSCxhQUpELE1BS0E7QUFDSWpJLGNBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMEQwRSxTQUExRCxDQUNDLGdEQURELEVBQ2tELElBRGxEO0FBRUg7QUFDSixXQXBCSyxNQW9CQSxJQUFHNkssY0FBYyxJQUFFLENBQW5CLEVBQXFCO0FBQzNCO0FBQ0ksZ0JBQUcwQixXQUFXLENBQUNELG9CQUFELENBQVgsQ0FBa0NsUSxnQkFBbEMsQ0FBbURDLGlCQUFuRCxDQUFxRXZGLFVBQXhFLEVBQ0E7QUFDSWlCLGNBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMEQwRSxTQUExRCxDQUNDLGlEQUErQ3VNLFdBQVcsQ0FBQ0Qsb0JBQUQsQ0FBWCxDQUFrQ2xRLGdCQUFsQyxDQUFtREMsaUJBQW5ELENBQXFFdEYsY0FBcEgsR0FBbUksV0FEcEksRUFDZ0osSUFEaEo7QUFFSCxhQUpELE1BS0E7QUFDSWdCLGNBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMEQwRSxTQUExRCxDQUNDLGlEQURELEVBQ21ELElBRG5EO0FBRUg7QUFDSixXQVhLLE1BV0EsSUFBRzZLLGNBQWMsSUFBRSxDQUFuQixFQUFxQjtBQUMzQjtBQUNJLGdCQUFHMEIsV0FBVyxDQUFDRCxvQkFBRCxDQUFYLENBQWtDbFEsZ0JBQWxDLENBQW1EQyxpQkFBbkQsQ0FBcUVqRyxpQkFBckUsQ0FBdUZaLFlBQTFGLEVBQ0E7QUFDSXVDLGNBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMEQwRSxTQUExRCxDQUNDLGlEQURELEVBQ21ELElBRG5EO0FBRUgsYUFKRCxNQUtBO0FBQ0lqSSxjQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDMEIscUJBQWxDLEdBQTBEMEUsU0FBMUQsQ0FDQyxxREFERCxFQUN1RCxJQUR2RDtBQUVIO0FBQ0osV0FYSyxNQVlELElBQUc2SyxjQUFjLElBQUUsQ0FBbkIsRUFBcUI7QUFDMUI7QUFDSSxnQkFBRzBCLFdBQVcsQ0FBQ0Qsb0JBQUQsQ0FBWCxDQUFrQ2xRLGdCQUFsQyxDQUFtREMsaUJBQW5ELENBQXFFakcsaUJBQXJFLENBQXVGYixpQkFBMUYsRUFDQTtBQUNJd0MsY0FBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzBCLHFCQUFsQyxHQUEwRDBFLFNBQTFELENBQ0Msd0RBREQsRUFDMEQsSUFEMUQ7QUFFSCxhQUpELE1BS0E7QUFDSWpJLGNBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0MwQixxQkFBbEMsR0FBMEQwRSxTQUExRCxDQUNDLDREQURELEVBQzhELElBRDlEO0FBRUg7QUFDSjs7QUFFRDNCLFFBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IyTSxVQUFBQSxrQkFBa0IsQ0FBQ1Esb0NBQW5CLENBQXdELEtBQXhEOztBQUNBLFVBQUEsTUFBSSxDQUFDekgsZ0JBQUw7QUFDSCxTQUhTLEVBR1AsSUFITyxDQUFWO0FBSUg7QUFDSjtBQUNKLEdBamxFb0I7QUFtbEVyQjBJLEVBQUFBLDBDQW5sRXFCLHNEQW1sRXNCM08sS0FubEV0QixFQW9sRXJCO0FBQUE7O0FBQ0ksUUFBR2hHLFVBQVUsSUFBRSxJQUFmLEVBQ0E7QUFDSXVHLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsUUFBQSxPQUFJLENBQUNvTywwQ0FBTCxDQUFnRDNPLEtBQWhEO0FBQ0gsT0FGUyxFQUVQLEdBRk8sQ0FBVjtBQUdILEtBTEQsTUFPQTtBQUNJLFVBQUk0TyxPQUFPLEdBQUM1TyxLQUFLLENBQUNmLElBQU4sQ0FBVzRQLFVBQXZCO0FBQ0EsVUFBSXRNLFFBQVEsR0FBQ3ZDLEtBQUssQ0FBQ2YsSUFBTixDQUFXNlAsT0FBeEI7O0FBRUEsVUFBSWhRLE1BQU0sR0FBQ25KLEVBQUUsQ0FBQ29KLElBQUgsQ0FBUTlFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NrRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEc0QsUUFBUSxHQUFDMUgsVUFBbkUsRUFBK0VxRSxpQkFBL0UsQ0FBaUdDLFFBQWpHLENBQTBHQyxDQUFsSCxFQUFvSG5GLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NrRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEcEYsV0FBMUQsRUFBdUVxRixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHRSxDQUF0TixDQUFYOztBQUNBLFdBQUswUCx3QkFBTCxDQUE4QixLQUFLclQsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixDQUE5QixFQUFtRTBDLE1BQW5FLEVBQTBFLEdBQTFFO0FBRUFqRixNQUFBQSxXQUFXLEdBQUMwSSxRQUFaOztBQUNBLFVBQUl6RCxNQUFNLEdBQUNuSixFQUFFLENBQUNvSixJQUFILENBQVE5RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDa0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHBGLFdBQTFELEVBQXVFcUYsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0MsQ0FBMUcsRUFBNEduRix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDa0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHBGLFdBQTFELEVBQXVFcUYsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0UsQ0FBOU0sQ0FBWDs7QUFDQSxXQUFLMFAsd0JBQUwsQ0FBOEIsS0FBS3JULGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsQ0FBOUIsRUFBbUUwQyxNQUFuRTtBQUNIO0FBQ0osR0F2bUVvQjtBQXltRXJCaVEsRUFBQUEsd0JBQXdCLEVBQUUsa0NBQVV4VCxJQUFWLEVBQWUyTixLQUFmLEVBQXFCOEYsS0FBckIsRUFBZ0M7QUFBQSxRQUFYQSxLQUFXO0FBQVhBLE1BQUFBLEtBQVcsR0FBTCxHQUFLO0FBQUE7O0FBQ3REclosSUFBQUEsRUFBRSxDQUFDOFMsS0FBSCxDQUFTbE4sSUFBVCxFQUNDbU4sRUFERCxDQUNJc0csS0FESixFQUNXO0FBQUU3UCxNQUFBQSxRQUFRLEVBQUV4SixFQUFFLENBQUNnVCxFQUFILENBQU1PLEtBQUssQ0FBQzlKLENBQVosRUFBZThKLEtBQUssQ0FBQzdKLENBQXJCO0FBQVosS0FEWCxFQUNnRDtBQUFDdUosTUFBQUEsTUFBTSxFQUFDO0FBQVIsS0FEaEQsRUFFQ0MsSUFGRCxDQUVNLFlBQU0sQ0FDWCxDQUhELEVBSUNFLEtBSkQ7QUFLSCxHQS9tRW9CO0FBaW5FckJrRyxFQUFBQSwrQkFqbkVxQiw2Q0FrbkVyQjtBQUNJcFYsSUFBQUEsV0FBVyxJQUFFZ0IsVUFBYjs7QUFFQSxRQUFHLEtBQUtlLFlBQUwsSUFBbUIsQ0FBdEIsRUFDQTtBQUNJLFVBQUlvRSxLQUFLLEdBQUM7QUFBQ2YsUUFBQUEsSUFBSSxFQUFDO0FBQUM0UCxVQUFBQSxVQUFVLEVBQUNoVSxVQUFaO0FBQXVCaVUsVUFBQUEsT0FBTyxFQUFDalY7QUFBL0I7QUFBTixPQUFWO0FBQ0FJLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NtRSwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLEVBQTFFLEVBQTZFRixLQUE3RTtBQUNIOztBQUVELFFBQUlsQixNQUFNLEdBQUNuSixFQUFFLENBQUNvSixJQUFILENBQVE5RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDa0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHBGLFdBQTFELEVBQXVFcUYsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0MsQ0FBMUcsRUFBNEduRix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDa0QsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHBGLFdBQTFELEVBQXVFcUYsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0UsQ0FBOU0sQ0FBWDs7QUFDQSxTQUFLMFAsd0JBQUwsQ0FBOEIsS0FBS3JULGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsQ0FBOUIsRUFBbUUwQyxNQUFuRTtBQUNBLFNBQUttSCxnQkFBTDtBQUNILEdBOW5Fb0IsQ0Fpb0VyQjtBQUNBOztBQWxvRXFCLENBQVQsQ0FBaEIsRUFvb0VBOztBQUNBaUosTUFBTSxDQUFDQyxPQUFQLEdBQWtCalUsV0FBbEIsRUFDQSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9pc1Rlc3QgPSBmYWxzZTtcclxudmFyIF9kaWNlaW5wdXQxID0gXCJcIjtcclxudmFyIF9kaWNlaW5wdXQyID0gXCJcIjtcclxudmFyIFByZXZpb3VzRGljZVJvbGwxID0gLTE7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsMiA9IC0xO1xyXG5cclxudmFyIFByZXZpb3VzRGljZVJvbGwzID0gLTE7XHJcbnZhciBQcmV2aW91c0RpY2VSb2xsNCA9IC0xO1xyXG5cclxudmFyIFByZXZpb3VzRGljZVJvbGw1ID0gLTE7XHJcblxyXG52YXIgdXNlckdhbWVPdmVyID0gZmFsc2U7XHJcbnZhciBCb3RHYW1lT3ZlciA9IGZhbHNlO1xyXG52YXIgVG90YWxDb3VudGVyUmVhY2hlZCA9IGZhbHNlO1xyXG5cclxuLy8jcmVnaW9uIHN1cGVyY2xhc3NlcyBhbmQgZW51bWVyYXRpb25zXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciB0eXBlIG9mIGJ1c2luZXNzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBFbnVtQnVzaW5lc3NUeXBlID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBIb21lQmFzZWQ6IDEsICAgICAgICAgICAgICAgICAgIC8vYSBidXNpbmVzcyB0aGF0IHlvdSBvcGVyYXRlIG91dCBvZiB5b3VyIGhvbWVcclxuICAgIGJyaWNrQW5kbW9ydGFyOiAyICAgICAgICAgICAgICAgLy9hIHN0b3JlIGZyb250IGJ1c2luZXNzXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NJbmZvID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJCdXNpbmVzc0luZm9cIixcclxucHJvcGVydGllczogeyBcclxuICAgIE5hbWU6IFwiQnVzaW5lc3NEYXRhXCIsXHJcbiAgICBCdXNpbmVzc1R5cGU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTW9kZVwiLFxyXG4gICAgICAgdHlwZTogRW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgIGRlZmF1bHQ6IEVudW1CdXNpbmVzc1R5cGUuTm9uZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJCdXNpbmVzcyBjYXRvZ29yeSBmb3IgcGxheWVyc1wiLH0sIFxyXG4gICAgQnVzaW5lc3NUeXBlRGVzY3JpcHRpb246XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOiBcIlR5cGVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDogXCJUeXBlIChieSBuYW1lKSBvZiBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLH0sXHJcbiAgICBCdXNpbmVzc05hbWU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOiBcIk5hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDogXCJOYW1lIG9mIHRoZSBidXNpbmVzcyBwbGF5ZXIgaXMgb3BlbmluZ1wiLH0sXHJcbiAgICAgQW1vdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkFtb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImJhbGFuY2Ugb2YgYnVzaW5lc3NcIix9LFxyXG4gICAgICBJc1BhcnRuZXJzaGlwOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIklzUGFydG5lcnNoaXBcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXB3OmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBkb25lIHBhcnRuZXJzaGlwIHdpdGggc29tZW9uZSB3aXRoIGN1cnJlbnQgYnVzaW5lc3NcIix9LFxyXG4gICAgICAgUGFydG5lcklEOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJQYXJ0bmVySURcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgIHRvb2x0aXA6IFwiSUQgb2YgdGhlIHBhcnRuZXIgd2l0aCB3aG9tIHBsYXllciBoYXMgZm9ybWVkIHBhcnRuZXJzaGlwXCIsfSxcclxuICAgICAgIFBhcnRuZXJOYW1lOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJQYXJ0bmVyTmFtZVwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgIHRvb2x0aXA6XCJuYW1lIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLH0sXHJcbiAgICAgICAgTG9jYXRpb25zTmFtZTpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9jYXRpb25zTmFtZVwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBbY2MuVGV4dF0sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgIHRvb2x0aXA6XCJpZiBwbGF5ZXIgb3ducyBicmljayBhbmQgbW9ydGFyIGhlL3NoZSBjYW4gZXhwYW5kIHRvIG5ldyBsb2NhdGlvblwiLH0sXHJcbiAgICAgICAgTG9hblRha2VuOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5BbW91bnRcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcblxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBDYXJkRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZERhdGFGdW5jdGlvbmFsaXR5ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHlcIixcclxucHJvcGVydGllczogeyBcclxuICAgIE5leHRUdXJuRG91YmxlUGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk5leHRUdXJuRG91YmxlUGF5XCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiBpdHMgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxuICAgIFNraXBOZXh0VHVybjpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwTmV4dFR1cm5cIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHR1cm4gaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHR1cm4gZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxuICAgIFNraXBOZXh0UGF5ZGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBOZXh0UGF5ZGF5XCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiBwYXlkYXkgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG4gICAgU2tpcEhNTmV4dFBheWRheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwSE1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGhvbWUgYmFzZWQgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LFxyXG4gICAgU2tpcEJNTmV4dFBheWRheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwQk1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGJyaWNrYSBhbmQgbW1vcnRhciBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdG9ja0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0b2NrSW5mbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiU3RvY2tJbmZvXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOYW1lOiBcIlN0b2NrRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzTmFtZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibmFtZSBvZiB0aGUgYnVzaW5lc3MgaW4gd2hpY2ggc3RvY2tzIHdpbGwgYmUgaGVsZFwiLH0sIFxyXG4gICAgU2hhcmVBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOiBcIlNoYXJlQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiU2hhcmUgYW1vdW50IG9mIHRoZSBzdG9ja1wiLH0sXHJcbn0sXHJcblxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciAgUGxheWVyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBsYXllckRhdGEgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUGxheWVyRGF0YVwiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgUGxheWVyTmFtZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJuYW1lIG9mIHRoZSBwbGF5ZXJcIix9LFxyXG4gICAgUGxheWVyVUlEOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllclVJRFwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiSUQgb2YgdGhlIHBsYXllclwiLH0sXHJcbiAgICBBdmF0YXJJRDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBdmF0YXJJRFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImlkIHJlZmVyZW5jZSBmb3IgcGxheWVyIGF2YXRhciBzZWxlY3Rpb25cIix9LFxyXG4gICAgSXNCb3Q6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNCb3RcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXB3OmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgY3VycmVudCBwbGF5ZXIgaXMgYm90XCIsfSwgXHJcbiAgICBOb09mQnVzaW5lc3M6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NcIixcclxuICAgICAgIHR5cGU6IFtCdXNpbmVzc0luZm9dLFxyXG4gICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiTnVtYmVyIG9mIGJ1c2luZXNzIGEgcGxheWVyIGNhbiBvd25cIix9LCBcclxuICAgIENhcmRGdW5jdGlvbmFsaXR5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkNhcmRGdW5jdGlvbmFsaXR5XCIsXHJcbiAgICAgICB0eXBlOiBDYXJkRGF0YUZ1bmN0aW9uYWxpdHksXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImNhcmQgZnVuY3Rpb25hbGl0eSBzdG9yZWQgYnkgcGxheWVyXCIsfSwgXHJcbiAgICBIb21lQmFzZWRBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJudW1iZXIgb2YgaG9tZSBiYXNlZCBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBCcmlja0FuZE1vcnRhckFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja0FuZE1vcnRhckFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibnVtYmVyIG9mIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLH0sIFxyXG4gICAgVG90YWxMb2NhdGlvbnNBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxMb2NhdGlvbnNBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm51bWJlciBvZiBsb2NhdGlvbnMgb2YgYWxsIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3Nlc3NcIix9LCBcclxuICAgIE5vT2ZTdG9ja3M6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU3RvY2tzXCIsXHJcbiAgICAgICB0eXBlOiBbU3RvY2tJbmZvXSxcclxuICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIk51bWJlciBvZiBzdG9jayBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBDYXNoOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgY2FzaCBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBHb2xkQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiR29sZENvdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiY291bnQgb2YgZ29sZCBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIFN0b2NrQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tDb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImNvdW50IG9mIHN0b2NrcyBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIExvYW5UYWtlbjpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyB0YWtlbiBsb2FuIGZyb20gYmFuayBvciBub3RcIix9LFxyXG4gICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBsb2FuIHRha2VuIGZyb20gdGhlIGJhbmtcIix9LFxyXG4gICAgTWFya2V0aW5nQW1vdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0Ftb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIm1hcmtldGluZyBhbW91bnQgYSBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBMYXd5ZXJTdGF0dXM6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTGF3eWVyU3RhdHVzXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgaGlyZWQgYSBsYXd5ZXIgb3Igbm90XCIsfSxcclxuICAgIElzQmFua3J1cHQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNCYW5rcnVwdFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGJlZW4gQmFua3J1cHRlZCBvciBub3RcIix9LFxyXG4gICAgQmFua3J1cHRBbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQmFua3J1cHRBbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGhvdyBtdWNoIHRpbWUgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcIix9LFxyXG4gICAgU2tpcHBlZExvYW5QYXltZW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBwZWRMb2FuUGF5bWVudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHNraXBwZWQgbG9hbiBwYXltZW50XCIsfSxcclxuICAgIFBsYXllclJvbGxDb3VudGVyOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclJvbGxDb3VudGVyXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciB0byBzdG9yZSByb2xsIGNvdW50b3IgZm9yIHBsYXllclwiLH0sXHJcbiAgICBJbml0aWFsQ291bnRlckFzc2lnbmVkOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkluaXRpYWxDb3VudGVyQXNzaWduZWRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgaXNHYW1lRmluaXNoZWQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcImlzR2FtZUZpbmlzaGVkXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICBUb3RhbFNjb3JlOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbFNjb3JlXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsSEJDYXNoOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbEhCQ2FzaFwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbEJNQ2FzaDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxCTUNhc2hcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgVG90YWxHb2xkQ2FzaDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxHb2xkQ2FzaFwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUb3RhbExvYW5CYWxhbmNlOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbExvYW5CYWxhbmNlXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRvdGFsU3RvY2tzQ2FzaDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxTdG9ja3NDYXNoXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgR2FtZU92ZXI6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkdhbWVPdmVyXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxufSxcclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxuXHJcbn0pO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiBHYW1lIE1hbmFnZXIgQ2xhc3NcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKG1haW4gY2xhc3MpIGNsYXNzIGZvciBHYW1lIE1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvbGxDb3VudGVyPTA7XHJcbnZhciBEaWNlVGVtcD0wO1xyXG52YXIgRGljZVJvbGw9MDtcclxudmFyIElzVHdlZW5pbmc9ZmFsc2U7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFR1cm5DaGVja0FycmF5PVtdO1xyXG52YXIgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG5cclxudmFyIFBhc3NlZFBheURheT1mYWxzZTtcclxudmFyIERvdWJsZVBheURheT1mYWxzZTtcclxuXHJcbi8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG52YXIgX25leHRUdXJuRG91YmxlUGF5PWZhbHNlO1xyXG52YXIgX3NraXBOZXh0VHVybj1mYWxzZTtcclxudmFyIF9za2lwTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxudmFyIF9za2lwSE1OZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBfc2tpcEJNTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG52YXIgVHVybkluUHJvZ3Jlc3M9ZmFsc2U7XHJcblxyXG52YXIgQmFja3NwYWNlcz0zO1xyXG52YXIgaXNHYW1lT3Zlcj1mYWxzZTtcclxudmFyIE9uZVF1ZXN0aW9uSW5kZXg9LTE7XHJcbnZhciBPbmVRdWVzdGlvbnM9XHJcbltcclxuICAgIFwieW91IGhhdmUgc2tpcHBlZCBsb2FuIHByZXZpb3VzIHBheWRheT9cIixcclxuICAgIFwieW91IGhhdmUgdGFrZW4gYW55IGxvYW4/XCIsXHJcbiAgICBcInlvdSBoYXZlIGJhbmtydXB0ZWQgZXZlcj9cIixcclxuICAgIFwieW91ciBuZXh0IHR1cm4gaXMgZ29pbmcgdG8gYmUgc2tpcHBlZD9cIixcclxuICAgIFwieW91ciBuZXh0IHBheWRheSBpcyBnb2luZyB0byBiZSBkb3VibGUgcGF5ZGF5P1wiXHJcbl07XHJcblxyXG52YXIgQ2FyZERpc3BsYXlTZXRUaW1vdXQ9bnVsbDtcclxuXHJcbnZhciBHYW1lTWFuYWdlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiR2FtZU1hbmFnZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBQbGF5ZXJHYW1lSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBwbGF5ZXIncyBkYXRhXCJ9LFxyXG4gICAgICAgIEJvdEdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIGJvdCdzIGRhdGFcIn0sXHJcbiAgICAgICAgUGxheWVyTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgcGxheWVyXCIsfSwgICAgXHJcbiAgICAgICAgQ2FtZXJhTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgY2FtZXJhXCIsfSwgICAgXHJcbiAgICAgICAgQWxsUGxheWVyVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2YgdWkgb2YgYWxsIHBsYXllcnNcIix9LCAgICAgIFxyXG4gICAgICAgIEFsbFBsYXllck5vZGVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIG9mIG5vZGUgb2YgYWxsIHBsYXllcnMgaW5zaWRlIGdhbWVwbGF5XCIsfSwgICBcclxuICAgICAgICBTdGFydExvY2F0aW9uTm9kZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2YgYXR0YXkgb2YgbG9jYXRpb25zXCIsfSwgICBcclxuICAgICAgICAgU2VsZWN0ZWRNb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6MCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHJlZmVyZW5jZSBmb3IgZ2FtZSBtb2RlIDEgbWVhbnMgYm90IGFuZCAyIG1lYW5zIHJlYWwgcGxheWVyc1wiLFxyXG4gICAgICAgIH0sICBcclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIFBsYXllckRhdGE6IFBsYXllckRhdGEsXHJcbiAgICAgICAgQnVzaW5lc3NJbmZvOkJ1c2luZXNzSW5mbyxcclxuICAgICAgICBDYXJkRGF0YUZ1bmN0aW9uYWxpdHk6Q2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgICAgIEVudW1CdXNpbmVzc1R5cGU6RW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgICBJbnN0YW5jZTpudWxsXHJcbiAgICB9LFxyXG5cclxuICAgIFJlc2V0QWxsVmFyaWFibGVzKClcclxuICAgIHtcclxuICAgICAgICBfZGljZWlucHV0MSA9IFwiXCI7XHJcbiAgICAgICAgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG4gICAgICAgIFByZXZpb3VzRGljZVJvbGwxID0gLTE7XHJcbiAgICAgICAgUHJldmlvdXNEaWNlUm9sbDIgPSAtMTtcclxuXHJcbiAgICAgICAgUHJldmlvdXNEaWNlUm9sbDMgPSAtMTtcclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsNCA9IC0xO1xyXG5cclxuICAgICAgICBQcmV2aW91c0RpY2VSb2xsNSA9IC0xO1xyXG5cclxuICAgICAgICB1c2VyR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgICAgICBCb3RHYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxuICAgICAgICBSb2xsQ291bnRlcj0wO1xyXG4gICAgICAgIERpY2VUZW1wPTA7XHJcbiAgICAgICAgRGljZVJvbGw9MDtcclxuICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuXHJcbiAgICAgICAgUGFzc2VkUGF5RGF5PWZhbHNlO1xyXG4gICAgICAgIERvdWJsZVBheURheT1mYWxzZTtcclxuXHJcbiAgICAgICAgLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PWZhbHNlO1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49ZmFsc2U7XHJcbiAgICAgICAgX3NraXBOZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG4gICAgICAgIF9za2lwSE1OZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc2VzcyBvbmx5XHJcbiAgICAgICAgX3NraXBCTU5leHRQYXlkYXk9ZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyBvbmx5XHJcbiAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9ZmFsc2U7XHJcbiAgICAgICAgVHVybkluUHJvZ3Jlc3M9ZmFsc2U7XHJcblxyXG4gICAgICAgIEJhY2tzcGFjZXM9MztcclxuICAgICAgICBpc0dhbWVPdmVyPWZhbHNlO1xyXG4gICAgICAgIE9uZVF1ZXN0aW9uSW5kZXg9LTE7XHJcbiAgICAgICAgT25lUXVlc3Rpb25zPVxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgXCJ5b3UgaGF2ZSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1wiLFxyXG4gICAgICAgICAgICBcInlvdSBoYXZlIHRha2VuIGFueSBsb2FuP1wiLFxyXG4gICAgICAgICAgICBcInlvdSBoYXZlIGJhbmtydXB0ZWQgZXZlcj9cIixcclxuICAgICAgICAgICAgXCJ5b3VyIG5leHQgdHVybiBpcyBnb2luZyB0byBiZSBza2lwcGVkP1wiLFxyXG4gICAgICAgICAgICBcInlvdXIgbmV4dCBwYXlkYXkgaXMgZ29pbmcgdG8gYmUgZG91YmxlIHBheWRheT9cIlxyXG4gICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICBDYXJkRGlzcGxheVNldFRpbW91dD1udWxsO1xyXG4gICAgICAgIFRvdGFsQ291bnRlclJlYWNoZWQgPSBmYWxzZTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIElucHV0VGVzdERpY2UxKF92YWwpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgICAgICAgX2RpY2VpbnB1dDEgPSBfdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgSW5wdXRUZXN0RGljZTIoX3ZhbClcclxuICAgIHtcclxuICAgICAgICBpZiAoX2lzVGVzdCkge1xyXG4gICAgICAgICAgICBfZGljZWlucHV0MiA9IF92YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vI3JlZ2lvbiBBbGwgRnVuY3Rpb25zIG9mIEdhbWVNYW5hZ2VyXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgY2xhc3MgaXMgY3JlYXRlZFxyXG4gICAgQG1ldGhvZCBvbkxvYWRcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLlJlc2V0QWxsVmFyaWFibGVzKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDtcclxuICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgVHVybkNoZWNrQXJyYXk9W107XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkTW9kZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgICAgIHRoaXMuSW5pdF9HYW1lTWFuYWdlcigpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4PTA7XHJcbiAgICAgICAgdGhpcy5DYXJkQ291bnRlcj0wO1xyXG4gICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD1mYWxzZTtcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD1mYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gYXNzaWduIHJlZmVyZW5jZSBvZiByZXF1aXJlZCBjbGFzc2VzXHJcbiAgICBAbWV0aG9kIENoZWNrUmVmZXJlbmNlc1xyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBpbml0aWFsIGdhbWVtYW5hZ2VyIGVzc2V0aWFsc1xyXG4gICAgQG1ldGhvZCBJbml0X0dhbWVNYW5hZ2VyXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBJbml0X0dhbWVNYW5hZ2VyICgpIHtcclxuICAgICAgICB0aGlzLkNhbWVyYT10aGlzLkNhbWVyYU5vZGUuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSk7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmc9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1bXTtcclxuICAgICAgICBSb2xsQ291bnRlcj0wO1xyXG4gICAgICAgIERpY2VUZW1wPTA7XHJcbiAgICAgICAgRGljZVJvbGw9MDsgIFxyXG5cclxuICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikgLy9nYW1lIGlzIGJlaW5nIHBsYXllZCBieSByZWFsIHBsYXllcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vaWYgam9pbmVkIHBsYXllciBpcyBzcGVjdGF0ZVxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKT09dHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdGF0dXMgb2YgaW5pdGlhbCBidXNpbmVzcyBzZXRwOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpKTtcclxuICAgICAgICAgICAgICAgIC8vaWYgaW5pdGFsIHNldHVwIGhhcyBiZWVuIGRvbmUgYW5kIGdhbWUgaXMgdW5kZXIgd2F5XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpPT10cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEFsbERhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm89QWxsRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsdGhpcy5UdXJuTnVtYmVyKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Jbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLGZhbHNlLHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKSAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IGJvdCBhbG9uZyB3aXRoIG9uZSBwbGF5ZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSxmYWxzZSx0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNyZWdpb24gcHVibGljIGZ1bmN0aW9ucyB0byBnZXQgZGF0YSAoYWNjZXNzaWJsZSBmcm9tIG90aGVyIGNsYXNzZXMpXHJcbiAgICBHZXRUdXJuTnVtYmVyICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5UdXJuTnVtYmVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZXRNeUluZGV4KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbXlJbmRleCA9IDA7XHJcbiAgICAgICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgIHZhciBfYWxsQWN0b3JzID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hbGxBY3RvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX2FjdG9yLlBsYXllclVJRCA9PSBfYWxsQWN0b3JzW2luZGV4XS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbXlJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG15SW5kZXg7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8jcmVnaW9uIFNwZWN0YXRlTW9kZSBDb2RlXHJcblxyXG4gICAgU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKClcclxuICAgIHtcclxuICAgICAgICB2YXIgQWxsRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihBbGxEYXRhKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvID0gQWxsRGF0YTtcclxuICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM9dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKTtcclxuXHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXIgPiAwICYmIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQ9PXRydWUgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLmlzR2FtZUZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCwgX3RvUG9zLnkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uaXNHYW1lRmluaXNoZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfbGFzdEluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2xhc3RJbmRleF0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW19sYXN0SW5kZXhdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsIF90b1Bvcy55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzeW5jZWQgcGxheWVybm9kZXNcIik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKClcclxuICAgIHtcclxuICAgICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yQ291bnQoKTtcclxuICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT1Ub3RhbENvbm5lY3RlZFBsYXllcnMpXHJcbiAgICAgIHtcclxuICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBmdW5jdGlvbnMgcmVsYXRlZCB0byBUdXJuIE1lY2hhbmlzbSBhbmQgY2FyZCBtZWNoYW5pc21cclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSB3aGF0IGNhcmQgaGFzIGJlZW4gc2VsZWN0ZWQgYnkgcGxheWVyXHJcbiAgICBAbWV0aG9kIFJhaXNlRXZlbnRGb3JDYXJkXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmFpc2VFdmVudEZvckNhcmQoX2RhdGEpXHJcbiAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNSxfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJEaXNwbGF5VGltZW91dCgpXHJcbiAge1xyXG4gICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICB9LFxyXG5cclxuICBEaXNwbGF5Q2FyZE9uT3RoZXJzKClcclxuICB7XHJcbiAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKSAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG4gICAgICAgIGlmKENhcmRFdmVudFJlY2VpdmVkPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLkNhcmRDb3VudGVyKTtcclxuICAgICAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLkNhcmREaXNwbGF5ZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuQ2FyZENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKGZhbHNlLHRoaXMuUmFuZG9tQ2FyZEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDYXJkRGlzcGxheVNldFRpbW91dD1zZXRUaW1lb3V0KCgpID0+IHsgLy9jaGVjayBhZnRlciBldmVyeSAwLjUgc2Vjb25kc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EaXNwbGF5Q2FyZE9uT3RoZXJzKCk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRDYXJkRGlzcGxheSgpXHJcbiAge1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpXHJcbiAge1xyXG5cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcblxyXG4gICAgdmFyIFJhbmRvbUNhcmQ9X2RhdGEucmFuZG9tQ2FyZDtcclxuICAgIHZhciBjb3VudGVyPV9kYXRhLmNvdW50ZXI7XHJcblxyXG4gICAgdGhpcy5SYW5kb21DYXJkSW5kZXg9UmFuZG9tQ2FyZDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXI9Y291bnRlcjtcclxuXHJcbiAgIFxyXG4gICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcblxyXG4gICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLk9uTGFuZGVkT25TcGFjZSh0cnVlLFJhbmRvbUNhcmQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9dHJ1ZTtcclxuICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdD09ZmFsc2UpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLk9uTGFuZGVkT25TcGFjZSh0cnVlLFJhbmRvbUNhcmQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKGZhbHNlLFJhbmRvbUNhcmQsdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcblxyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSBwYXJ0aWN1bGFyIHBsYXllciBoYXMgY29tcGxldGUgdGhlaXIgbW92ZVxyXG4gICAgQG1ldGhvZCBSYWlzZUV2ZW50VHVybkNvbXBsZXRlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpXHJcbiAge1xyXG4gICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAge1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg0LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKVxyXG4gICAgICB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVhaXNlZCBmb3IgdHVybiBjb21wbGV0ZVwiKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCk7XHJcbiAgICAgIH1cclxuICB9LFxyXG5cclxuXHJcbiAgU3luY0FsbERhdGEoKVxyXG4gIHtcclxuICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICB9ICBcclxufSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgb24gYWxsIHBsYXllcnMgdG8gdmFsaWRhdGUgaWYgbW92ZSBpcyBjb21wbGV0ZWQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzXHJcbiAgICBAbWV0aG9kIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZShfdWlkKVxyXG4gIHtcclxuICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9yZWFsIHBsYXllcnNcclxuICAgICAge1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5Lmxlbmd0aD09MClcclxuICAgICAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpOyBcclxuXHJcbiAgICAgICAgICAgIHZhciBBcnJheUxlbmd0aD1UdXJuQ2hlY2tBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBJREZvdW5kPWZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQXJyYXlMZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihUdXJuQ2hlY2tBcnJheVtpbmRleF09PV91aWQpXHJcbiAgICAgICAgICAgICAgICAgICAgSURGb3VuZD10cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighSURGb3VuZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgICAgICAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PVRvdGFsQ29ubmVjdGVkUGxheWVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHVybkNoZWNrQXJyYXk9W107XHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgfVxyXG4gIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGRpY2UgYW5pbWF0aW9uIGlzIHBsYXllZCBvbiBhbGwgcGxheWVyc1xyXG4gICAgQG1ldGhvZCBDaGFuZ2VUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGFuZ2VUdXJuKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuVHVybk51bWJlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9dGhpcy5UdXJuTnVtYmVyKzE7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLHRoaXMuVHVybk51bWJlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZVZpc3VhbERhdGEoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIGZyb20gcmFpc2Ugb24gZXZlbnQgKGZyb20gZnVuY3Rpb24gXCJTdGFydFR1cm5cIiBhbmQgXCJDaGFuZ2VUdXJuXCIgb2YgdGhpcyBzYW1lIGNsYXNzKSB0byBoYW5kbGUgdHVyblxyXG4gICAgQG1ldGhvZCBUdXJuSGFuZGxlclxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgVHVybkhhbmRsZXIoX3R1cm4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVWaXN1YWxEYXRhKCk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlR1cm46IFwiK190dXJuKTtcclxuICAgICAgICB2YXIgX3BsYXllck1hdGNoZWQ9ZmFsc2U7XHJcbiAgICAgICAgX3NraXBOZXh0VHVybj1mYWxzZTtcclxuICAgICAgICBpZihJc1R3ZWVuaW5nKSAvL2NoZWNrIGlmIGFuaW1hdGlvbiBvZiB0dXJuIGJlaW5nIHBsYXllZCBvbiBvdGhlciBwbGF5ZXJzIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZXJlXCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkhhbmRsZXIoX3R1cm4pO1xyXG4gICAgICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9X3R1cm47XHJcbiAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgICAgIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgX3BsYXllck1hdGNoZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBfc2tpcE5leHRUdXJuPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3ModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX3NraXBOZXh0VHVybikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiICsgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJHYW1lT3Zlcik7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3Q9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBfc2tpcE5leHRUdXJuID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZXJHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfc2tpcE5leHRUdXJuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIgKyB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlLy90dXJuIGRlY2lzaW9ucyBmb3IgYm90XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BsYXllck1hdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9za2lwTmV4dFR1cm4gPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghQm90R2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9za2lwTmV4dFR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUm9sbERpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsdGhpcy5UdXJuTnVtYmVyLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUdXJuIE9mOiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbFBsYXllclVJW3RoaXMuVHVybk51bWJlcl0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm8pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT10cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vc2tpcCB0aGlzIHR1cm4gYXMgc2tpcCB0dXJuIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmVcclxuICAgICAgICAgICAgaWYoX3BsYXllck1hdGNoZWQgJiYgX3NraXBOZXh0VHVybilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTa2lwcGluZyBjdXJyZW50IHR1cm5cIiwxMjAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2tpcE5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihfcGxheWVyTWF0Y2hlZCAmJiB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpOyAgIFxyXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZClcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgIHZhciBNeURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgICAgIHZhciBfY291bnRlcj1faW5kO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAvL2lmKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCE9TXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSAvL2RvbnQgdXBkYXRlIG15IG93biBkYXRhXHJcbiAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEPT1NYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl09TWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX2NvdW50ZXI8dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkaW5nIGNvdW50ZXI6IFwiK19jb3VudGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIGlmKF9jb3VudGVyPHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoLTEpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkZGluZyBjb3VudGVyOiBcIitfY291bnRlcik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgIH0sICBcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGFsbCBwbGF5ZXJzIGhhdmUgZG9uZSB0aGVpciBpbml0aWFsIHNldHVwIGFuZCBmaXJzdCB0dXJuIHN0YXJ0c1xyXG4gICAgQG1ldGhvZCBTdGFydFR1cm5cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFN0YXJ0VHVybigpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5UdXJuTnVtYmVyPTA7IC8vcmVzZXRpbmcgdGhlIHR1cm4gbnVtYmVyIG9uIHN0YXJ0IG9mIHRoZSBnYW1lXHJcblxyXG4gICAgICAgIC8vc2VuZGluZyBpbml0aWFsIHR1cm4gbnVtYmVyIG92ZXIgdGhlIG5ldHdvcmsgdG8gc3RhcnQgdHVybiBzaW11bHRhbm91c2x5IG9uIGFsbCBjb25uZWN0ZWQgcGxheWVyJ3MgZGV2aWNlc1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMix0aGlzLlR1cm5OdW1iZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICBcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgUmVjZWl2ZUJhbmtydXB0RGF0YShfZGF0YSlcclxuICAgIHtcclxuICAgICAgICAvL290aGVyIHBsYXllciBoYXMgYmVlbiBiYW5rcnVwdGVkXHJcbiAgICAgICAgdmFyIF9pc0JhbmtydXB0ZWQ9X2RhdGEuRGF0YS5iYW5rcnVwdGVkO1xyXG4gICAgICAgIHZhciBfdHVybj1fZGF0YS5EYXRhLnR1cm47XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJEYXRhPV9kYXRhLkRhdGEuUGxheWVyRGF0YU1haW47XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhfaXNCYW5rcnVwdGVkKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhfdHVybik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coX3BsYXllckRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW190dXJuXT1fcGxheWVyRGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuXHJcbiAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsdGhpcy5UdXJuTnVtYmVyLHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgICAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTdGFydFR1cm5BZnRlckJhbmtydXB0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKHRydWUpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsdGhpcy5UdXJuTnVtYmVyLHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgICAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gRnVuY3Rpb24gZm9yIGdhbWVwbGF5XHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gYXNzaWduIHBsYXllciBVSSAobmFtZS9pY29ucy9udW1iZXIgb2YgcGxheWVycyB0aGF0IHRvIGJlIGFjdGl2ZSBldGMpXHJcbiAgICBAbWV0aG9kIEFzc2lnblBsYXllckdhbWVVSVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQXNzaWduUGxheWVyR2FtZVVJKF9pc0JhbmtydXB0ZWQ9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpIC8vZm9yIGJvdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIV9pc0JhbmtydXB0ZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfcmFuZG9tSW5kZXg9dGhpcy5nZXRSYW5kb20oMCx0aGlzLkJvdEdhbWVJbmZvLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm8ucHVzaCh0aGlzLkJvdEdhbWVJbmZvW19yYW5kb21JbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzPTI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5QbGF5ZXJJbmZvPXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVHYW1lVUkoX3RvZ2dsZUhpZ2hsaWdodCxfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX3RvZ2dsZUhpZ2hsaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbX2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuUGxheWVySW5mbz10aGlzLlBsYXllckdhbWVJbmZvW19pbmRleF07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihfaW5kZXg9PWluZGV4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVCR0hpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVUZXh0aWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlQkdIaWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGVuYmFsZSByZXNwZWN0aXZlIHBsYXllcnMgbm9kZXMgaW5zaWRlIGdhbWFwbGF5XHJcbiAgICBAbWV0aG9kIEVuYWJsZVBsYXllck5vZGVzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBFbmFibGVQbGF5ZXJOb2RlcyhfaXNCYW5rcnVwdGVkPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFfaXNCYW5rcnVwdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQ9PTEgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ9PTEgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSG9tZUJhc2VkQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJyaWNrQW5kTW9ydGFyQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb249dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICBcclxuICAgICAgICBsZXQgcmF0aW89dGFyZ2V0UG9zLnkvY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTI7XHJcbiAgICB9LFxyXG5cclxuICAgIGxhdGVVcGRhdGUgKCkge1xyXG4gICAgICAgIGlmKHRoaXMuaXNDYW1lcmFab29taW5nKSAgICBcclxuICAgICAgICAgICAgdGhpcy5TZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN5bmNEaWNlUm9sbChfcm9sbClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2RpY2UxPV9yb2xsLmRpY2UxO1xyXG4gICAgICAgIHZhciBfZGljZTI9X3JvbGwuZGljZTI7XHJcbiAgICAgICAgdmFyIF9yZXN1bHQ9X2RpY2UxK19kaWNlMjtcclxuXHJcbiAgICAgICAgSXNUd2VlbmluZz10cnVlO1xyXG4gICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD1mYWxzZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEPT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9PTAgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGU9PTIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgUm9sbENvdW50ZXI9MTM7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9PTEyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcisyMTsgIFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyKzE7XHJcblxyXG4gICAgICAgICAgICBSb2xsQ291bnRlcj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXItMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBEaWNlUm9sbD1fcmVzdWx0O1xyXG4gICAgICAgIERpY2VUZW1wPTA7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbihEaWNlUm9sbCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLlR1cm5OdW1iZXI9PWluZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmdldENvbXBvbmVudChcIkRpY2VDb250cm9sbGVyXCIpLkFuaW1hdGVEaWNlKF9kaWNlMSwgX2RpY2UyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIC8vIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgICAgICAvLyB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsdHJ1ZSwwLjQpOyAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBEaWNlRnVudGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgICAgICB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsdHJ1ZSwwLjQpOyAgXHJcbiAgICB9LFxyXG5cclxuICAgIFRlbXBDaGVja1NwYWNlKF9yb2xsaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1wY291bnRlcj0wO1xyXG4gICAgICAgIHZhciB0ZW1wY291bnRlcjI9MDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQ9PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJwbGF5ZXIgbWF0Y2hlZDpcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wY291bnRlcjI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIGlmKHRlbXBjb3VudGVyMi0xPDApXHJcbiAgICAgIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwic3RhcnRpbmcgZnJvbSBvYmxpdmlvblwiKTtcclxuICAgICAgICB0ZW1wY291bnRlcj10ZW1wY291bnRlcjIrX3JvbGxpbmctMTtcclxuICAgICAgICB2YXIgZGljZXRvYmU9cGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwidG8gYmU6IFwiK2RpY2V0b2JlKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wY291bnRlcj10ZW1wY291bnRlcjIrX3JvbGxpbmc7XHJcbiAgICAgICAgdmFyIGRpY2V0b2JlPXBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIitkaWNldG9iZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxEaWNlOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZiAoIWlzR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgdmFyIERpY2UxO1xyXG4gICAgICAgICAgICB2YXIgRGljZTI7XHJcbiAgICAgICAgICAgIGlmIChfaXNUZXN0ICYmIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgRGljZTEgPSBwYXJzZUludChfZGljZWlucHV0MSk7XHJcbiAgICAgICAgICAgICAgICBEaWNlMiA9IHBhcnNlSW50KF9kaWNlaW5wdXQyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgPT0gdHJ1ZSAmJiBfaXNUZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBEaWNlMSA9IDEwO1xyXG4gICAgICAgICAgICAgICAgRGljZTIgPSAxMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcbiAgICAgICAgICAgICAgICBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMSA9PSBEaWNlMSlcclxuICAgICAgICAgICAgICAgICAgICBEaWNlMSA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMiA9PSBEaWNlMilcclxuICAgICAgICAgICAgICAgICAgICBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBQcmV2aW91c0RpY2VSb2xsMSA9IERpY2UxO1xyXG4gICAgICAgICAgICAgICAgUHJldmlvdXNEaWNlUm9sbDIgPSBEaWNlMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBEaWNlMT0yMDtcclxuICAgICAgICAgICAgLy8gdmFyIERpY2UyPTE7XHJcblxyXG4gICAgICAgICAgICBEaWNlUm9sbCA9IERpY2UxICsgRGljZTI7XHJcbiAgICAgICAgICAgIHZhciBfbmV3Um9sbCA9IHsgZGljZTE6IERpY2UxLCBkaWNlMjogRGljZTIgfVxyXG4gICAgICAgICAgICAvL0RpY2VSb2xsPTIzO1xyXG4gICAgICAgICAgICAvL3RoaXMuVGVtcENoZWNrU3BhY2UoRGljZVJvbGwpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRpY2UgbnVtYmVyOiBcIiArIERpY2VSb2xsICsgXCIsIERpY2UxOlwiICsgRGljZTEgKyBcIiwgRGljZTI6XCIgKyBEaWNlMik7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDMsIF9uZXdSb2xsKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxPbmVEaWNlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgRGljZTEgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDUgPT0gRGljZTEpXHJcbiAgICAgICAgICAgIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7ICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgUHJldmlvdXNEaWNlUm9sbDUgPSBEaWNlMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIERpY2UxO1xyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsVHdvRGljZXMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaWNlMT10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgIHZhciBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsMyA9PSBEaWNlMSlcclxuICAgICAgICAgICAgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTsgICBcclxuXHJcbiAgICAgICAgaWYgKFByZXZpb3VzRGljZVJvbGw0ID09IERpY2UyKVxyXG4gICAgICAgICAgICBEaWNlMiA9IHRoaXMuZ2V0UmFuZG9tKDEsIDcpOyAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFByZXZpb3VzRGljZVJvbGwzID0gRGljZTE7XHJcbiAgICAgICAgICAgIFByZXZpb3VzRGljZVJvbGw0ID0gRGljZTI7XHJcblxyXG4gICAgICAgIHJldHVybiAoRGljZTErRGljZTIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjYWxsVXBvbkNhcmQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICBpZiAoUm9sbENvdW50ZXIgPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3NwYWNlSUQgPSBwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyID0gUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3NwYWNlSUQgIT0gNiAmJiBfc3BhY2VJRCAhPSA3KSAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVuYXMgc2VsbCBzcGFjZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBSYW5kb21DYXJkID0gdGhpcy5nZXRSYW5kb20oMCwgMTUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2ZvciB0ZXN0aW5nIG9ubHlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3NwYWNlSUQgPT0gMikgLy9sYW5kZWQgb24gc29tZSBiaWcgYnVzaW5lc3NcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhciB2YWx1ZUluZGV4PVswLDEsNywxMCwyLDMsNCw1LDYsOF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhciBpbmRleD10aGlzLmdldFJhbmRvbSgwLDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmFuZG9tQ2FyZD12YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfc3BhY2VJRCA9PSA1KSAvL2xhbmRlZCBvbiBzb21lIGxvc3NlcyBjYXJkc1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXggPSBbMCwgMSwgNSwgNiwgMiwgNywgMywgNCwgOCwgOV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0UmFuZG9tKDAsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSA5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChfc3BhY2VJRCA9PSAzKSAvL2xhbmRlZCBvbiBzb21lIG1hcmtldGluZyBjYXJkc1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXggPSBbMCwgNywgMywgOCwgMTMsIDksIDEsIDIsIDQsIDVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQgPSB2YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gNTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKF9zcGFjZUlEID09IDEpIC8vbGFuZGVkIG9uIHNvbWUgd2lsZCBjYXJkc1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXggPSBbMCwgMSwgNiwgMTAsIDIsIDMsIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldFJhbmRvbSgwLCA3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmFuZG9tQ2FyZCA9IHZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKF9zcGFjZUlEKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuU2VsZWN0ZWRNb2RlID09IDIpIC8vZm9yIHJlYWwgcGxheWVyXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3NwYWNlSUQ9PTEyKSAvLyBpZiBwbGF5ZXIgbGFuZGVkIG9uIGZpbmlzaCBzcGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEID09IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFNlbmRpbmdEYXRhID0geyBcInJhbmRvbUNhcmRcIjogUmFuZG9tQ2FyZCwgXCJjb3VudGVyXCI6IFJvbGxDb3VudGVyIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5TZWxlY3RlZE1vZGUgPT0gMSkgLy9mb3IgYm90XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3NwYWNlSUQ9PTEyKSAvLyBpZiBwbGF5ZXIgbGFuZGVkIG9uIGZpbmlzaCBzcGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFNlbmRpbmdEYXRhID0geyBcInJhbmRvbUNhcmRcIjogUmFuZG9tQ2FyZCwgXCJjb3VudGVyXCI6IFJvbGxDb3VudGVyIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNCb3QgJiYgQm90R2FtZU92ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0JvdCAmJiB1c2VyR2FtZU92ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcGxldGVDYXJkVHVybigpXHJcbiAgICB7XHJcbiAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2FsbEdhbWVDb21wbGV0ZShfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX2lzQm90PT1mYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PXRoaXMuVHVybk51bWJlcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD09ZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLmlzR2FtZUZpbmlzaGVkPXRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfY2FzaD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgSE1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBCTUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYW5BbW91bnQrPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZ29sZCA9IHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9zdG9ja3MgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kaWNlUmFuZG9tID0gdGhpcy5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgT25jZU9yU2hhcmUgPSBfZGljZVJhbmRvbSAqIDEwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBHb2xkQ2FzaCA9IE9uY2VPclNoYXJlICogX2dvbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFN0b2NrQ2FzaCA9IE9uY2VPclNoYXJlICogX3N0b2NrcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBCTUNhc2g9KEJNQW1vdW50K0JNTG9jYXRpb25zKSoxNTAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBITUNhc2g9MDtcclxuICAgICAgICAgICAgICAgICAgICBpZihITUFtb3VudD09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTYwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoSE1BbW91bnQ9PTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD0yNTAwMCs2MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArMjUwMDArNjAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBUb3RhbEFzc2V0cz1fY2FzaCtCTUNhc2grSE1DYXNoK0dvbGRDYXNoK1N0b2NrQ2FzaC1sb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTY29yZSA9IFRvdGFsQXNzZXRzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEhCQ2FzaCA9IEhNQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxCTUNhc2ggPSBCTUNhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsR29sZENhc2ggPSBHb2xkQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxTdG9ja3NDYXNoID0gU3RvY2tDYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvYW5CYWxhbmNlID0gbG9hbkFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9dGhpcy5UdXJuTnVtYmVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9PWZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX2Nhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g7XHJcbiAgICAgICAgICAgICAgICB2YXIgSE1BbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBCTUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9dGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYW5BbW91bnQrPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2dvbGQgPSB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfc3RvY2tzID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGljZVJhbmRvbSA9IHRoaXMuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIE9uY2VPclNoYXJlID0gX2RpY2VSYW5kb20gKiAxMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgR29sZENhc2ggPSBPbmNlT3JTaGFyZSAqIF9nb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBTdG9ja0Nhc2ggPSBPbmNlT3JTaGFyZSAqIF9zdG9ja3M7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1DYXNoPShCTUFtb3VudCtCTUxvY2F0aW9ucykqMTUwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgSE1DYXNoPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoSE1BbW91bnQ9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD02MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArNjAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MylcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzI1MDAwKzYwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgVG90YWxBc3NldHM9X2Nhc2grQk1DYXNoK0hNQ2FzaCtHb2xkQ2FzaCtTdG9ja0Nhc2gtbG9hbkFtb3VudDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFNjb3JlID0gVG90YWxBc3NldHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsSEJDYXNoID0gSE1DYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbEJNQ2FzaCA9IEJNQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxHb2xkQ2FzaCA9IEdvbGRDYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbFN0b2Nrc0Nhc2ggPSBTdG9ja0Nhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9hbkJhbGFuY2UgPSBsb2FuQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKVxyXG4gICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg2LF9kYXRhKTtcclxuICAgfSxcclxuXHJcbiAgIFN5bmNHYW1lT3ZlcihfVUlEKVxyXG4gICB7XHJcbiAgICAgICB2YXIgaW5mb1RleHQgPSBcIlwiO1xyXG4gICAgICAgdmFyIHN0YXR1c1RleHQgPSBcIlwiO1xyXG4gICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0RGF0YSgpO1xyXG4gICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgdmFyIE15RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3Zlcj10cnVlO1xyXG5cclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgX2luZGV4ID0gLTE7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCA9PSBfVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJHYW1lIHdvbiBieSBcIitNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWU7IFxyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgICBcIkN1cnJlbnQgQ2FzaCA6ICRcIiArIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgKyBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsSEJDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIkJyaWNrIEFuZCBNb3J0YXIgQnVzaW5lc3NlcyBWYWx1ZSA6ICRcIiArIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiR29sZCBWYWx1ZSA6ICRcIiArIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxHb2xkQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgKyBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU3RvY2tzQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJMb2FuIEJhbGFuY2UgOiAkXCIgKyBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaCBFYXJuZWQgOiAkXCIgKyBNYWluU2Vzc2lvbkRhdGFbX2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgLy8gICAgIFwiSGlnaGVzdCBDYXNoOiBcIiArIE1haW5TZXNzaW9uRGF0YVtfaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArIFwiXFxuXCIgKyAnXFxuJyArXHJcbiAgICAgICAgICAgIC8vICAgICBcIkdhbWUgd29uIGJ5IFwiKyAgTWFpblNlc3Npb25EYXRhW19pbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lKyBcIlxcblwiICsgJ1xcbicgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgLy8gICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgMTUwMDAsIGZhbHNlXHJcbiAgICAgICAgICAgIC8vICk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgLy8gfSwgMTUwNjApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCA9PSBfVUlEKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8veW91IHdvblxyXG4gICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9IFwiQ29uZ3JhdHMhIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIjsgXHJcbiAgICAgICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgKyBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgKyBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQnJpY2sgQW5kIE1vcnRhciBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICsgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgKyBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEdvbGRDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgKyBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIkxvYW4gQmFsYW5jZSA6ICRcIiArIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICsgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93UmVzdWx0U2NyZWVuKHN0YXR1c1RleHQsIGluZm9UZXh0KTtcclxuICAgICAgICAgICAgICAgIC8vIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgXCJUb3RhbCBDYXNoOiBcIiArIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgKyBcIlxcblwiICsgJ1xcbicgK1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIFwiQ29uZ3JhdHMhIHlvdXIgY2FzaCBpcyBoaWdoZXN0LCB5b3UgaGF2ZSB3b24gdGhlIGdhbWUuXCIgKyBcIlxcblwiICsgJ1xcbicgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIC8vICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAxNTAwMCwgZmFsc2VcclxuICAgICAgICAgICAgICAgIC8vICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9IFwiVW5mb3J0dW5hdGVseSEgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIjsgXHJcbiAgICAgICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgKyBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJIb21lIEJhc2VkIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgKyBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEhCQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQnJpY2sgQW5kIE1vcnRhciBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICsgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxCTUNhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgKyBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbEdvbGRDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTdG9ja3MgVmFsdWUgOiAkXCIgKyBNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFN0b2Nrc0Nhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIkxvYW4gQmFsYW5jZSA6ICRcIiArIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsTG9hbkJhbGFuY2UgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICsgTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZSArIFwiXFxuXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgXCJUb3RhbCBDYXNoOiBcIiArIE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUgKyBcIlxcblwiICsgJ1xcbicgK1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIFwidW5mb3J0dW5hdGVseSB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiICsgXCJcXG5cIiArICdcXG4nICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgXCJHYW1lIHdpbGwgYmUgcmVzdGFydGVkIGF1dG9tYXRjYWxseSBhZnRlciAxNSBzZWNvbmRzXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgMTUwMDAsIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAvLyApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgLy8gfSwgMTUwNjApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpLy93aXRoIGJvdFxyXG4gICAge1xyXG4gICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICB2YXIgTXlEYXRhPXRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1swXS5HYW1lT3Zlcj10cnVlO1xyXG5cclxuICAgICAgICBpZihNeURhdGEuUGxheWVyVUlEPT1fVUlEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy95b3Ugd29uXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIkNvbmdyYXRzISB5b3UgaGF2ZSB3b24gdGhlIGdhbWUuXCI7IFxyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgKyBNeURhdGEuQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICsgTXlEYXRhLlRvdGFsSEJDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgKyBNeURhdGEuVG90YWxCTUNhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgKyBNeURhdGEuVG90YWxHb2xkQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICsgTXlEYXRhLlRvdGFsU3RvY2tzQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICsgTXlEYXRhLlRvdGFsTG9hbkJhbGFuY2UgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICsgTXlEYXRhLlRvdGFsU2NvcmUgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIk90aGVyIFBsYXllciBFYXJuZWQgQ2FzaCA6ICRcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bMV0uVG90YWxTY29yZSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG5cclxuICAgICAgIFxyXG4gICAgICAgICAgICAvLyBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICAvLyAgICAgXCJUb3RhbCBDYXNoOiBcIitNeURhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAvLyAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgIC8vICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgLy8gICAgIDE1MDAwLGZhbHNlXHJcbiAgICAgICAgICAgIC8vICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IGxvc2VcclxuXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIlVuZm9ydHVuYXRlbHkhIHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCI7IFxyXG4gICAgICAgICAgICBpbmZvVGV4dCA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJDdXJyZW50IENhc2ggOiAkXCIgKyBNeURhdGEuQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiSG9tZSBCYXNlZCBCdXNpbmVzc2VzIFZhbHVlIDogJFwiICsgTXlEYXRhLlRvdGFsSEJDYXNoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJCcmljayBBbmQgTW9ydGFyIEJ1c2luZXNzZXMgVmFsdWUgOiAkXCIgKyBNeURhdGEuVG90YWxCTUNhc2ggKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIkdvbGQgVmFsdWUgOiAkXCIgKyBNeURhdGEuVG90YWxHb2xkQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiU3RvY2tzIFZhbHVlIDogJFwiICsgTXlEYXRhLlRvdGFsU3RvY2tzQ2FzaCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiTG9hbiBCYWxhbmNlIDogJFwiICsgTXlEYXRhLlRvdGFsTG9hbkJhbGFuY2UgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIENhc2ggRWFybmVkIDogJFwiICsgTXlEYXRhLlRvdGFsU2NvcmUgKyBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIk90aGVyIFBsYXllciBFYXJuZWQgQ2FzaCA6ICRcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bMV0uVG90YWxTY29yZSArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dSZXN1bHRTY3JlZW4oc3RhdHVzVGV4dCwgaW5mb1RleHQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIC8vICAgICBcIlRvdGFsIENhc2g6IFwiK015RGF0YS5Ub3RhbFNjb3JlK1wiXFxuXCIrJ1xcbicrXHJcbiAgICAgICAgICAgIC8vICAgICBcInVuZm9ydHVuYXRlbHkgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgIC8vICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgLy8gICAgIDE1MDAwLGZhbHNlXHJcbiAgICAgICAgICAgIC8vICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIC8vIH0sIDE1MDYwKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICB9LFxyXG5cclxuICAgIEFsbFBsYXllcnNHYW1lQ29tcGxldGVkKClcclxuICAgIHtcclxuICAgICAgICAgICAgdmFyIG1heCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBTZWxlY3RlZEluZCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBTZXNzaW9uRGF0YSA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX3ZhbHVlID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWRJbmQgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBtYXggPSBfdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF92YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIgKyBTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgfSxcclxuICAgIFN0YXJ0RGljZVJvbGw6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKFJvbGxDb3VudGVyPj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lb3ZlclwiKTsgXHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT1mYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGxheWVyY29tcGxldGVkPTA7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllcmNvbXBsZXRlZD09dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpIC8vZ2FtZSBjb21wbGV0ZWQgb24gYWxsIHN5c3RlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0dhbWVPdmVyPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJzR2FtZUNvbXBsZXRlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpLy9mb3IgYm90XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJvdEdhbWVPdmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyZ2FtZW92ZXI6IFwiICsgdXNlckdhbWVPdmVyKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJvdGdhbWVvdmVyOiBcIiArIEJvdEdhbWVPdmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZD0wO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YT10aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uaXNHYW1lRmluaXNoZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJjb21wbGV0ZWQ9PXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKSAvL2dhbWVjb21wbGV0ZWQgb24gYWxsIHN5c3RlbXNcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCb3RHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllcnNHYW1lQ29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXNUd2VlbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICAgICAgRGljZVRlbXAgPSBEaWNlVGVtcCArIDE7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RvUG9zID0gY2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlR3ZWVuUGxheWVyKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSwgX3RvUG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UmFuZG9tOmZ1bmN0aW9uKG1pbixtYXgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuQ2FtZXJhOiBmdW5jdGlvbiAoX3BvcywgaXNab29tLHRpbWUpIHsgICBcclxuICAgICAgICBjYy50d2Vlbih0aGlzLkNhbWVyYU5vZGUpXHJcbiAgICAgICAgLnRvKHRpbWUsIHsgcG9zaXRpb246IGNjLnYyKF9wb3MueCwgX3Bvcy55KX0se2Vhc2luZzpcInF1YWRJbk91dFwifSlcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYoaXNab29tKVxyXG4gICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgWm9vbUNhbWVyYUluICgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgIGlmKHRoaXMuQ2FtZXJhLnpvb21SYXRpbzwyKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPXRoaXMuQ2FtZXJhLnpvb21SYXRpbyswLjAzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz0yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmc9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgMTApO1xyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja1BheURheUNvbmRpdGlvbnMoX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChSb2xsQ291bnRlciA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNilcclxuICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDcpXHJcbiAgICAgICAgICAgICAgICBEb3VibGVQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheTtcclxuICAgICAgICBpZihQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSAmJiAhX25leHRUdXJuRG91YmxlUGF5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy90aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICAgICAgLy90aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UsX2lzQm90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZigoRG91YmxlUGF5RGF5KSB8fCAoUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgICAgICAvL3RoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbih0cnVlLF9pc0JvdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBab29tQ2FtZXJhT3V0ICgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy5DYW1lcmEuem9vbVJhdGlvPj0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89dGhpcy5DYW1lcmEuem9vbVJhdGlvLTAuMDM7XHJcbiAgICAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uPWNjLlZlYzIoMCwwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz0xO1xyXG5cclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5QcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24oMCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QgJiYgIUJvdEdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90ICYmICF1c2VyR2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vcmVhbCBwbGF5ZXJcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBUd2VlblBsYXllcjogZnVuY3Rpb24gKE5vZGUsVG9Qb3MpIHtcclxuICAgICAgICBjYy50d2VlbihOb2RlKSAvLzAuNFxyXG4gICAgICAgIC50bygwLjAwNCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmKERpY2VUZW1wPERpY2VSb2xsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coRGljZVRlbXAgKyBcIiBcIiArIFJvbGxDb3VudGVyKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNlbGVjdGVkTW9kZSA9PSAxKSAvL2ZvciBib3RcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghQm90R2FtZU92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJvdCBnYW1lIGlzIG92ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdXNlckdhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpID09IDYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGdhbWUgaXMgb3ZlciBza2lwcGluZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhQYXNzZWRQYXlEYXkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSkgPT0gNilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgZmluaXNoZWQgZm9yOiBcIiArIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChSb2xsQ291bnRlciA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChSb2xsQ291bnRlciA9PSAxMilcclxuICAgICAgICAgICAgICAgICAgICBSb2xsQ291bnRlciA9IFJvbGxDb3VudGVyICsgMjE7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUm9sbENvdW50ZXIgPSBSb2xsQ291bnRlciArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgRGljZVRlbXAgPSBEaWNlUm9sbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9EaWNlVGVtcD1EaWNlVGVtcCsxOyBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coRGljZVRlbXArXCIgXCIrUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX25ld3Bvcz1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcywgZmFsc2UsIDAuNik7IC8vem9vbW91dFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9ydWxlcyBpbXBsbWVudGF0aW9uIGR1cmluZyB0dXJuICh0dXJuIGRlY2lzaW9ucylcclxuXHJcbiAgICBUb2dnbGVQYXlEYXkoX3N0MSxfU3QyKVxyXG4gICAge1xyXG4gICAgICAgIFBhc3NlZFBheURheT1fc3QxO1xyXG4gICAgICAgIERvdWJsZVBheURheT1fU3QyO1xyXG4gICAgfSxcclxuXHJcbiAgICBFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oYW1vdW50LF9pbmRleCxfbG9jYXRpb25OYW1lLF9pc0NhcmRGdW5jdGlvbmFsaXR5ID0gZmFsc2UsX0dpdmVuQ2FzaCA9IDAsX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoIDwgMykge1xyXG4gICAgICAgICAgICBpZiAoIV9pc0NhcmRGdW5jdGlvbmFsaXR5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCAtIGFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2ggdG8gZXhwYW5kIHRoaXMgYnVzaW5lc3MsIGNhc2ggbmVlZGVkICQgXCIgKyBhbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9HaXZlbkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX0dpdmVuQ2FzaCA9IF9HaXZlbkNhc2ggLSBhbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5wdXNoKF9sb2NhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZXhwYW5kZWQgeW91ciBidXNpbmVzcy5cIiwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoIHRvIGV4cGFuZCB0aGlzIGJ1c2luZXNzLCBjYXNoIG5lZWRlZCAkIFwiICsgYW1vdW50ICsgXCIsIENhc2ggR2l2ZW4gJFwiICsgX0dpdmVuQ2FzaCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgY2Fubm90IG93biBtb3JlIHRoYW4gdGhyZWUgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBsb2NhdGlvbnNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbihfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLF9HaXZlbkNhc2ggPSAwLF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYocGFyc2VJbnQodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc1R5cGUpPT0yKSAvL3RoaXMgbWVhbnMgdGhlcmUgaXMgYnJpY2sgYW5kIG1vcnRhciBpbiBsaXN0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0QnVzaW5lc3NJbmRleChpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5TZXRDYXJkRnVuY3Rpb25hbGl0eShfaXNDYXJkRnVuY3Rpb25hbGl0eSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0R2l2ZW5DYXNoKF9HaXZlbkNhc2gpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlNldFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaChfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5SZXNldEVkaXRCb3goKTtcclxuICAgICAgICAgICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhCdXNpbmVzc0xvY2F0aW9uTm9kZXMpO1xyXG4gICAgICAgIHJldHVybiBCdXNpbmVzc0xvY2F0aW9uTm9kZXMubGVuZ3RoO1xyXG4gICAgfSxcclxuXHJcbiAgICBEZXN0cm95R2VuZXJhdGVkTm9kZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBCdXNpbmVzc0xvY2F0aW9uTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uKF9uYW1lLF9TaGFyZUFtb3VudCxfaXNBZGRpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX2lzQWRkaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9zdG9jaz1uZXcgU3RvY2tJbmZvKCk7XHJcbiAgICAgICAgICAgIF9zdG9jay5CdXNpbmVzc05hbWU9X25hbWU7XHJcbiAgICAgICAgICAgIF9zdG9jay5TaGFyZUFtb3VudD1fU2hhcmVBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZlN0b2Nrcy5wdXNoKF9zdG9jayk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBQcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihfaXNEb3VibGVQYXlEYXk9ZmFsc2UsX2lzQm90PWZhbHNlLF9mb3JTZWxlY3RlZEJ1c2luZXNzPWZhbHNlLF9TZWxlY3RlZEJ1c2luZXNzSW5kZXg9MCxIQkFtb3VudD0wLEJNQW1vdW50PTAsQk1Mb2NhdGlvbnM9MClcclxuICAgIHtcclxuICAgICAgICBpZiAoX2ZvclNlbGVjdGVkQnVzaW5lc3MpIHtcclxuICAgICAgICAgICAgdmFyIF90aXRsZSA9IFwiUGF5RGF5XCI7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Bc3NpZ25EYXRhX1BheURheShfdGl0bGUsZmFsc2UsIGZhbHNlLCBmYWxzZSwgX2lzQm90LF9mb3JTZWxlY3RlZEJ1c2luZXNzLF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgsSEJBbW91bnQsQk1BbW91bnQsQk1Mb2NhdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgX3NraXBOZXh0UGF5ZGF5ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0UGF5ZGF5O1xyXG4gICAgICAgICAgICBfc2tpcEhNTmV4dFBheWRheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgICAgICAgICBfc2tpcEJNTmV4dFBheWRheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwQk1OZXh0UGF5ZGF5O1xyXG5cclxuICAgICAgICAgICAgaWYgKF9za2lwTmV4dFBheWRheSkgLy9pZiBwcmV2aW91c2x5IHNraXAgcGF5ZGF5IHdhcyBzdG9yZWQgYnkgYW55IGNhcmRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIV9pc0JvdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTa2lwcGluZyBQYXlEYXkuXCIsIDE2MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE2NTApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIFBheURheS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGl0bGUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfaXNEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICAgICAgX3RpdGxlID0gXCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBfdGl0bGUgPSBcIlBheURheVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Bc3NpZ25EYXRhX1BheURheShfdGl0bGUsIF9pc0RvdWJsZVBheURheSwgX3NraXBITU5leHRQYXlkYXksIF9za2lwQk1OZXh0UGF5ZGF5LCBfaXNCb3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBCYW5rcnVwdF9UdXJuRGVjaXNpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JhbmtydXB0PXRydWU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50Kz0xO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSxmYWxzZSx0aGlzLlNlbGVjdGVkTW9kZSx0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCYW5rcnVwdCx0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQmFua3J1cHRBbW91bnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnQsX3VJRClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2RhdGEgPSB7IERhdGE6IHsgQ2FzaDogX2Ftb3VudCwgSUQ6IF91SUQgfSB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTMsIF9kYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfZGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX2Ftb3VudCA9IF9kYXRhLkRhdGEuQ2FzaDtcclxuICAgICAgICAgICAgdmFyIF9pRD1fZGF0YS5EYXRhLklEO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgX215SW5kZXggPSB0aGlzLkdldE15SW5kZXgoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5QbGF5ZXJVSUQgPT0gX2lEKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLmlzR2FtZUZpbmlzaGVkID09IHRydWUpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uVG90YWxTY29yZSs9X2Ftb3VudDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5DYXNoICs9IF9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgcmVjZWl2ZWQgcHJvZml0IG9mICRcIiArIF9hbW91bnQgKyBcIiBmcm9tIHlvdXIgcGFydG5lci5cIiwyODAwKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4vLyNlbmRyZWdpb25cclxuICAgXHJcbiAgICAvLyNyZWdpb24gQ2FyZHMgUnVsZXNcclxuICAgIFRvZ2dsZURvdWJsZVBheU5leHRUdXJuKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfbmV4dFR1cm5Eb3VibGVQYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheT1fbmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNraXBOZXh0VHVybihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBOZXh0VHVybj1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybj1fc2tpcE5leHRUdXJuO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X1dob2xlKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcE5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheT1fc2tpcE5leHRQYXlkYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcEhNTmV4dFBheWRheT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXk9X3NraXBITU5leHRQYXlkYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwQk1OZXh0UGF5ZGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheT1fc2tpcEJNTmV4dFBheWRheTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlVHVyblByb2dyZXNzKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBUdXJuSW5Qcm9ncmVzcz1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFJldHVyblR1cm5Qcm9ncmVzcygpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFR1cm5JblByb2dyZXNzO1xyXG4gICAgfSxcclxuXHJcbiAgICBMb3NlQWxsTWFya2V0aW5nTW9uZXkoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbG9zZUFtb3VudD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfbG9zZUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9sb3NlQW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2xvc2VBbW91bnRcclxuICAgIH0sXHJcblxyXG4gICAgTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcilcclxuICAgIHtcclxuICAgICAgICB2YXIgX2Ftb3VudEluY3JlYXNlZD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50SW5jcmVhc2VkPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQqPV9tdWx0aXBsaWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50SW5jcmVhc2VkPTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2Ftb3VudEluY3JlYXNlZFxyXG4gICAgfSxcclxuXHJcbiAgICBHZXRNYXJrZXRpbmdNb25leShfcHJvZml0KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfYW1vdW50PS0xO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9wcm9maXQ9KF9wcm9maXQvMTAwKTtcclxuICAgICAgICAgICAgX2Ftb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50Kj1fcHJvZml0O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoKz1fYW1vdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2Ftb3VudFxyXG4gICAgfSxcclxuXHJcbiAgICBRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbihfZGF0YSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX3VzZXJJRD1fZGF0YS5Vc2VySUQ7XHJcbiAgICAgICAgdmFyIF9xdWVzdGlvbkluZGV4PV9kYXRhLlF1ZXN0aW9uO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9X2RhdGEuVXNlckluZGV4O1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKF91c2VySUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSUQgbWF0Y2hlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBPbmVRdWVzdGlvbkluZGV4PV9xdWVzdGlvbkluZGV4O1xyXG4gICAgICAgICAgICB2YXIgX3F1ZXN0aW9uQXNrZWQ9T25lUXVlc3Rpb25zW19xdWVzdGlvbkluZGV4LTFdO1xyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3F1ZXN0aW9uQXNrZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24oX2lzVHVybk92ZXI9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9teURhdGE7XHJcbiAgICAgICAgdmFyIF9yb29tRGF0YTtcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcm9vbURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgICAgICBfbXlEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vZm9yIGJvdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX215RGF0YT10aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICAgICAgICBfcm9vbURhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICB9XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSh0cnVlKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX215RGF0YSxfcm9vbURhdGEsX2lzVHVybk92ZXIsdGhpcy5TZWxlY3RlZE1vZGUpXHJcbiAgICBcclxuICAgIH0sXHJcblxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvbl9QYXlBbW91bnRfT25lUXVlc3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbXlEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAgICAgICBpZihfbXlEYXRhLkNhc2g+PTUwMDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKF9teURhdGEuUGxheWVyVUlEPT10aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaC09NTAwMDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHBhaWQgY2FzaCBhbW91bnQgdG8gcGxheWVyLlwiLDEyMDApO1xyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24odHJ1ZSxmYWxzZSwtMSxfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbmVRdWVzdGlvbkRlY2lzaW9uX0Fuc3dlclF1ZXN0aW9uX09uZVF1ZXN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGFuc3dlcmVkIHRoZSBxdWVzdGlvbi5cIiwxMjAwKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihmYWxzZSx0cnVlLE9uZVF1ZXN0aW9uSW5kZXgsX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2hhc0RvbmVQYXltZW50LF9oYXNBbnN3ZXJlZFF1ZXN0aW9uLF9xdWVzdGlvbkluZGV4LF9Vc2VySUQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9kYXRhPXtQYXltZW50RG9uZTpfaGFzRG9uZVBheW1lbnQsUXVlc3Rpb25BbnN3ZXJlZDpfaGFzQW5zd2VyZWRRdWVzdGlvbixRdWVzdGlvbkluZGV4Ol9xdWVzdGlvbkluZGV4LElEOl9Vc2VySUR9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoOCxfZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9oYXNEb25lUGF5bWVudD1fZGF0YS5QYXltZW50RG9uZTtcclxuICAgICAgICAgICAgdmFyIF9oYXNBbnN3ZXJlZFF1ZXN0aW9uPV9kYXRhLlF1ZXN0aW9uQW5zd2VyZWQ7XHJcbiAgICAgICAgICAgIHZhciBfcXVlc3Rpb25JbmRleD1fZGF0YS5RdWVzdGlvbkluZGV4O1xyXG4gICAgICAgICAgICB2YXIgX3VJRD1fZGF0YS5JRDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKF9oYXNEb25lUGF5bWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoKz01MDAwO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgcmVmdXNlZCB0byBhbnN3ZXIgdGhlIHF1ZXN0aW9uIGluc3RlYWQgcGF5ZWQgdGhlIGNhc2ggYW1vdW50LCAkNTAwMCBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG5cclxuICAgICAgICAgICAgfWVsc2UgaWYoX2hhc0Fuc3dlcmVkUXVlc3Rpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfc2VsZWN0ZWRQbGF5ZXJJbmRleD0wO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hY3RvcnNEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX3VJRD09X2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkUGxheWVySW5kZXg9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihfcXVlc3Rpb25JbmRleD09MSkvL2hhdmUgeW91IHNraXBwZWQgbG9hbiBwcmV2aW91cyBwYXlkYXk/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgc2tpcHBlZCBsb2FuIHBheWVtZW50IGluIHByZXZpb3VzIHBheWRheVwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgc2tpcHBlZCBsb2FuIHBheWVtZW50IGluIHByZXZpb3VzIHBheWRheVwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKF9xdWVzdGlvbkluZGV4PT0yKS8vSGF2ZSB5b3UgdGFrZW4gYW55IGxvYW4/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9sb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9sb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2xvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHRha2VuIHNvbWUgbG9hblwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgdGFrZW4gYW55IGxvYW5cIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihfcXVlc3Rpb25JbmRleD09MykvL0FyZSB5b3UgYmFua3J1cHRlZD8gaWYgbW9yZSB0aGFuIG9uY2UsIHRlbGwgbWUgdGhlIGFtb3VudD9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Jc0JhbmtydXB0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkIFwiK19hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkJhbmtydXB0QW1vdW50K1wiIHRpbWUvZXMuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSBiZWVuIGJhbmtydXB0ZWRcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihfcXVlc3Rpb25JbmRleD09NCkvL0lzIHlvdXIgdHVybiBnb2luZyB0byBiZSBza2lwcGVkIG5leHQgdGltZT9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIGJlIHNraXBwZWQuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgbm90IGJlIHNraXBwZWQuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihfcXVlc3Rpb25JbmRleD09NSkvL0lzIGl0IGdvaW5nIHRvIGJlIGRvdWJsZSBwYXkgZGF5IHlvdXIgbmV4dCBwYXlkYXk/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgcGF5ZGF5IHdpbGwgYmUgZG91YmxlIHBheWRheVwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgcGF5ZGF5IHdpbGwgbm90IGJlIGRvdWJsZSBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAyMTUwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5KF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGlmKElzVHdlZW5pbmc9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5KF9kYXRhKTtcclxuICAgICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9zcGFjZXM9X2RhdGEuRGF0YS5iYWNrc3BhY2VzO1xyXG4gICAgICAgICAgICB2YXIgX2NvdW50ZXI9X2RhdGEuRGF0YS5Db3VudGVyO1xyXG5cclxuICAgICAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtfY291bnRlcitCYWNrc3BhY2VzXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSxfdG9Qb3MsMC4xKTtcclxuXHJcbiAgICAgICAgICAgIFJvbGxDb3VudGVyPV9jb3VudGVyO1xyXG4gICAgICAgICAgICB2YXIgX3RvUG9zPWNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSxfdG9Qb3MpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzOiBmdW5jdGlvbiAoTm9kZSxUb1BvcyxzcGVlZD0wLjYpIHtcclxuICAgICAgICBjYy50d2VlbihOb2RlKVxyXG4gICAgICAgIC50byhzcGVlZCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIEdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIFJvbGxDb3VudGVyLT1CYWNrc3BhY2VzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9kYXRhPXtEYXRhOntiYWNrc3BhY2VzOkJhY2tzcGFjZXMsQ291bnRlcjpSb2xsQ291bnRlcn19O1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEwLF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSxfdG9Qb3MpO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICAvLyNlbmRyZWdpb25cclxufSk7XHJcbi8vbW9kdWxlLmV4cG9ydHMgID0gUGxheWVyRGF0YTsgLy93aGVuIGltcG9ydHMgaW4gYW5vdGhlciBzY3JpcHQgb25seSByZWZlcmVuY2Ugb2YgcGxheWVyZGF0YSBjbGFzcyB3b3VsZCBiZSBhYmxlIHRvIGFjY2Vzc2VkIGZyb20gR2FtZW1hbmFnZXIgaW1wb3J0XHJcbm1vZHVsZS5leHBvcnRzICA9IEdhbWVNYW5hZ2VyO1xyXG4vLyNlbmRyZWdpb24iXX0=