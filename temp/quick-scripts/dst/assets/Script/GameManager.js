
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
var PreviousDiceRoll5 = -1; //#region superclasses and enumerations
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
      "default": {},
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
    EnumBusinessType: EnumBusinessType,
    Instance: null
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
    this.PlayerGameInfo = AllData;
    this.SyncDataToPlayerGameInfo(0);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = this.PlayerGameInfo.length;
    this.AssignPlayerGameUI();
    this.EnablePlayerNodes();
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().CloseInitialScreen_SpectateMode();

    for (var index = 0; index < this.PlayerGameInfo.length; index++) {
      if (this.PlayerGameInfo[index].PlayerRollCounter > 0 && this.PlayerGameInfo[index].InitialCounterAssigned == true) {
        var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.y);

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
        setTimeout(function () {
          _this2.TurnHandler(_turn);
        }, 800);
      } else {
      this.TurnNumber = _turn;

      if (this.SelectedMode == 2) {
        if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          this.ToggleTurnProgress(true);
          _playerMatched = true;
          _skipNextTurn = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn;

          if (!_skipNextTurn) {
            setTimeout(function () {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ResetTurnVariable();
            }, 1000);
            console.log("its your turn " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
          }
        } else {
          this.ToggleTurnProgress(false);
        }
      } else if (this.SelectedMode == 1) {
        if (this.PlayerGameInfo[this.TurnNumber].IsBot == false) {
          this.ToggleTurnProgress(true);
          _playerMatched = true;
          _skipNextTurn = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn;

          if (!_skipNextTurn) {
            setTimeout(function () {
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ToggleDecision_TurnDecision(true);
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ResetTurnVariable();
            }, 1000);
            console.log("its your turn " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
          }
        } else //turn decisions for bot
          {
            this.ToggleTurnProgress(false);
            _playerMatched = true;
            _skipNextTurn = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextTurn;

            if (!_skipNextTurn) {
              setTimeout(function () {
                _this2.RollDice();
              }, 1000);
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
        IsTweening = false;
        this.ChangeTurn();
        this.ToggleTurnProgress(false);
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
        if (this.PlayerGameInfo[index].HomeBasedAmount == 1) this.AllPlayerNodes[index].setPosition(this.StartLocationNodes[0].position.x, this.StartLocationNodes[0].position.y);else if (this.PlayerGameInfo[index].BrickAndMortarAmount == 1) this.AllPlayerNodes[index].setPosition(this.StartLocationNodes[1].position.x, this.StartLocationNodes[1].position.y);
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
    var Dice1;
    var Dice2;

    if (_isTest && this.PlayerGameInfo[this.TurnNumber].IsBot == false) {
      Dice1 = parseInt(_diceinput1);
      Dice2 = parseInt(_diceinput2);
    } else if (this.PlayerGameInfo[this.TurnNumber].IsBot == true && _isTest) {
      Dice1 = 1;
      Dice2 = 0;
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

        if (this.SelectedMode == 2) //for real player
          {
            if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
              var SendingData = {
                "randomCard": RandomCard,
                "counter": RollCounter
              };
              this.RaiseEventForCard(SendingData);
            } else {
              this.DisplayCardOnOthers();
            }
          } else if (this.SelectedMode == 1) //for bot
          {
            var SendingData = {
              "randomCard": RandomCard,
              "counter": RollCounter
            };
            this.RaiseEventForCard(SendingData);
          }
      } else {
      IsTweening = false;
      console.log("landed on pay day or double pay day and work is done so changing turn");
      this.RaiseEventTurnComplete();
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

          var BMCash = (BMAmount + BMLocations) * 150000;
          var HMCash = 0;
          if (HMAmount == 1) HMCash = 60000;else if (HMAmount == 2) HMCash = 25000 + 60000;else if (HMAmount == 3) HMCash = 25000 + 25000 + 60000;
          var TotalAssets = _cash + BMCash + HMCash - loanAmount;
          this.PlayerGameInfo[this.TurnNumber].TotalScore = TotalAssets;
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

        var BMCash = (BMAmount + BMLocations) * 150000;
        var HMCash = 0;
        if (HMAmount == 1) HMCash = 60000;else if (HMAmount == 2) HMCash = 25000 + 60000;else if (HMAmount == 3) HMCash = 25000 + 25000 + 60000;
        var TotalAssets = _cash + BMCash + HMCash - loanAmount;
        this.PlayerGameInfo[this.TurnNumber].TotalScore = TotalAssets;
      }
    }
  },
  RaiseEventForGameComplete: function RaiseEventForGameComplete(_data) {
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(6, _data);
  },
  SyncGameOver: function SyncGameOver(_UID) {
    if (this.SelectedMode == 2) //for real players
      {
        var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();
        var MyData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();
        console.log(_UID);
        console.log(MyData.customProperties.PlayerSessionData.PlayerUID);
        GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData.GameOver = true;

        if (MyData.customProperties.PlayerSessionData.PlayerUID == _UID) {
          //you won
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Total Cash: " + MyData.customProperties.PlayerSessionData.TotalScore + "\n" + '\n' + "Congrats! your cash is highest, you have won the game." + "\n" + '\n' + "\n" + "Game will be restarted automatcally after 15 seconds", 15000);
        } else {
          //you lose
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Total Cash: " + MyData.customProperties.PlayerSessionData.TotalScore + "\n" + '\n' + "unfortunately you have lost the game." + "\n" + '\n' + "\n" + "Game will be restarted automatcally after 15 seconds", 15000);
        }

        setTimeout(function () {
          GamePlayReferenceManager.Instance.Get_MultiplayerController().RestartGame();
        }, 15060);
      } else if (this.SelectedMode == 1) //with bot
      {
        var MainSessionData = this.PlayerGameInfo;
        var MyData = this.PlayerGameInfo[0];
        console.log(_UID);
        console.log(MyData.PlayerUID);
        this.PlayerGameInfo[0].GameOver = true;

        if (MyData.PlayerUID == _UID) {
          //you won
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Total Cash: " + MyData.TotalScore + "\n" + '\n' + "Congrats! your cash is highest, you have won the game." + "\n" + '\n' + "\n" + "Game will be restarted automatcally after 15 seconds", 15000);
        } else {
          //you lose
          GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Total Cash: " + MyData.TotalScore + "\n" + '\n' + "unfortunately you have lost the game." + "\n" + '\n' + "\n" + "Game will be restarted automatcally after 15 seconds", 15000);
        }

        setTimeout(function () {
          GamePlayReferenceManager.Instance.Get_MultiplayerController().RestartGame();
        }, 15060);
      }
  },
  StartDiceRoll: function StartDiceRoll() {
    if (RollCounter >= GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
      console.log("Gameover");
      isGameOver = true;
      this.ZoomCameraOut();

      if (this.SelectedMode == 2) //for real players
        {
          if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
            this.CallGameComplete();
            var playercompleted = 0;
            var MainSessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();

            for (var index = 0; index < MainSessionData.length; index++) {
              if (MainSessionData[index].customProperties.PlayerSessionData.isGameFinished) {
                playercompleted++;
              }
            }

            if (playercompleted == this.PlayerGameInfo.length) {
              var max = 0;
              var SelectedInd = 0;
              var SessionData = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();

              for (var _index6 = 0; _index6 < SessionData.length; _index6++) {
                var _value = SessionData[_index6].customProperties.PlayerSessionData.TotalScore;

                if (_value > max) {
                  SelectedInd = _index6;
                  max = _value;
                }
              }

              console.log("game won by player id: " + SessionData[SelectedInd].customProperties.PlayerSessionData.PlayerUID);
              this.RaiseEventForGameComplete(SessionData[SelectedInd].customProperties.PlayerSessionData.PlayerUID); //game completed on all systems
            } else {
              IsTweening = false;
              this.ChangeTurn();
            }
          }
        } else if (this.SelectedMode == 1) //for bot
        {
          this.CallGameComplete(true);
          var playercompleted = 0;
          var MainSessionData = this.PlayerGameInfo;

          for (var _index7 = 0; _index7 < MainSessionData.length; _index7++) {
            if (MainSessionData[_index7].isGameFinished) {
              playercompleted++;
            }
          }

          if (playercompleted == this.PlayerGameInfo.length) {
            var max = 0;
            var SelectedInd = 0;
            var SessionData = this.PlayerGameInfo;

            for (var _index8 = 0; _index8 < SessionData.length; _index8++) {
              var _value = SessionData[_index8].TotalScore;

              if (_value > max) {
                SelectedInd = _index8;
                max = _value;
              }
            }

            console.log("game won by player id: " + SessionData[SelectedInd].PlayerUID);
            this.RaiseEventForGameComplete(SessionData[SelectedInd].PlayerUID); //game completed on all systems
          } else {
            IsTweening = false;
            this.ChangeTurn();
          }
        }
    } else {
      DiceTemp = DiceTemp + 1;

      var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.position.y);

      this.TweenPlayer(this.AllPlayerNodes[this.TurnNumber], _toPos);
    }
  },
  getRandom: function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // min included and max excluded
  },
  TweenCamera: function TweenCamera(_pos, isZoom, time) {
    var _this3 = this;

    cc.tween(this.CameraNode).to(time, {
      position: cc.v2(_pos.x, _pos.y)
    }, {
      easing: "quadInOut"
    }).call(function () {
      if (isZoom) _this3.ZoomCameraIn();else _this3.ZoomCameraOut();
    }).start();
  },
  ZoomCameraIn: function ZoomCameraIn() {
    var _this4 = this;

    setTimeout(function () {
      if (_this4.Camera.zoomRatio < 2) {
        _this4.Camera.zoomRatio = _this4.Camera.zoomRatio + 0.03;

        _this4.ZoomCameraIn();
      } else {
        _this4.Camera.zoomRatio = 2;
        _this4.isCameraZooming = true;

        _this4.StartDiceRoll();
      }
    }, 10);
  },
  CheckPayDayConditions: function CheckPayDayConditions(_isBot) {
    if (_isBot === void 0) {
      _isBot = false;
    }

    if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) PassedPayDay = true;
    if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 7) DoublePayDay = true;
    _nextTurnDoublePay = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.NextTurnDoublePay;

    if (PassedPayDay && !DoublePayDay && !_nextTurnDoublePay) {
      this.ToggleDoublePayNextTurn(false);
      this.TogglePayDay(false, false);
      this.ProcessPayDay_TurnDecision(false, _isBot);
    } else if (DoublePayDay || PassedPayDay && _nextTurnDoublePay) {
      this.ToggleDoublePayNextTurn(false);
      this.TogglePayDay(false, false);
      this.ProcessPayDay_TurnDecision(true, _isBot);
    } else {
      this.callUponCard();
    }
  },
  ZoomCameraOut: function ZoomCameraOut() {
    var _this5 = this;

    setTimeout(function () {
      if (_this5.Camera.zoomRatio >= 1) {
        _this5.isCameraZooming = false;
        _this5.Camera.zoomRatio = _this5.Camera.zoomRatio - 0.03;

        _this5.ZoomCameraOut();
      } else {
        _this5.CameraNode.position = cc.Vec2(0, 0);
        _this5.Camera.zoomRatio = 1;
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().PrintDiceValue_TurnDecision(0);

        if (!isGameOver) {
          if (_this5.SelectedMode == 2) //real player
            {
              if (_this5.PlayerGameInfo[_this5.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) _this5.CheckPayDayConditions();else _this5.callUponCard();
            } else if (_this5.SelectedMode == 1) //bot
            {
              // if(this.PlayerGameInfo[this.TurnNumber].IsBot==false)
              _this5.CheckPayDayConditions(_this5.PlayerGameInfo[_this5.TurnNumber].IsBot); // else
              //   this.callUponCard();

            }
        }
      }
    }, 10);
  },
  TweenPlayer: function TweenPlayer(Node, ToPos) {
    var _this6 = this;

    cc.tween(Node).to(0.4, {
      position: cc.v2(ToPos.x, ToPos.y)
    }, {
      easing: "quadInOut"
    }).call(function () {
      if (DiceTemp < DiceRoll) {
        if (!isGameOver) {
          if (_this6.SelectedMode == 2) {
            if (_this6.PlayerGameInfo[_this6.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
              if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) PassedPayDay = true;
            }
          } else if (_this6.SelectedMode == 1) //for bot
            {
              if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) PassedPayDay = true;
            }
        }

        if (RollCounter == 12) RollCounter = RollCounter + 21;else RollCounter = RollCounter + 1; //DiceTemp=DiceTemp+1; 

        console.log(DiceTemp + " " + RollCounter);

        _this6.StartDiceRoll(); //this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter=RollCounter;

      } else {
        var _newpos = cc.Vec2(0, 0);

        _this6.TweenCamera(_newpos, false, 0.6); //zoomout

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
    var _this7 = this;

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
              _this7.callUponCard();
            }, 1650);
          } else {
            console.log("Skipping PayDay.");
            setTimeout(function () {
              _this7.callUponCard();
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
    var _this8 = this;

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

            for (var _index9 = 0; _index9 < _actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.NoOfBusiness.length; _index9++) {
              if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.NoOfBusiness[_index9].LoanTaken) {
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

          _this8.completeCardTurn();
        }, 2150);
      }
    }
  },
  ReceiveGoBackSpacesData_spaceFunctionality: function ReceiveGoBackSpacesData_spaceFunctionality(_data) {
    var _this9 = this;

    if (IsTweening == true) {
      setTimeout(function () {
        _this9.ReceiveGoBackSpacesData_spaceFunctionality(_data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIlByZXZpb3VzRGljZVJvbGwxIiwiUHJldmlvdXNEaWNlUm9sbDIiLCJQcmV2aW91c0RpY2VSb2xsMyIsIlByZXZpb3VzRGljZVJvbGw0IiwiUHJldmlvdXNEaWNlUm9sbDUiLCJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIlBhcnRuZXJOYW1lIiwiTG9jYXRpb25zTmFtZSIsIkxvYW5UYWtlbiIsIkxvYW5BbW91bnQiLCJjdG9yIiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiTmV4dFR1cm5Eb3VibGVQYXkiLCJTa2lwTmV4dFR1cm4iLCJTa2lwTmV4dFBheWRheSIsIlNraXBITU5leHRQYXlkYXkiLCJTa2lwQk1OZXh0UGF5ZGF5IiwiU3RvY2tJbmZvIiwiU2hhcmVBbW91bnQiLCJQbGF5ZXJEYXRhIiwiUGxheWVyTmFtZSIsIlBsYXllclVJRCIsIkF2YXRhcklEIiwiSXNCb3QiLCJOb09mQnVzaW5lc3MiLCJDYXJkRnVuY3Rpb25hbGl0eSIsIkhvbWVCYXNlZEFtb3VudCIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJOb09mU3RvY2tzIiwiQ2FzaCIsIkdvbGRDb3VudCIsIlN0b2NrQ291bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJMYXd5ZXJTdGF0dXMiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQbGF5ZXJSb2xsQ291bnRlciIsIkluaXRpYWxDb3VudGVyQXNzaWduZWQiLCJpc0dhbWVGaW5pc2hlZCIsIlRvdGFsU2NvcmUiLCJHYW1lT3ZlciIsIlJvbGxDb3VudGVyIiwiRGljZVRlbXAiLCJEaWNlUm9sbCIsIklzVHdlZW5pbmciLCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJUdXJuQ2hlY2tBcnJheSIsIkJ1c2luZXNzTG9jYXRpb25Ob2RlcyIsIlBhc3NlZFBheURheSIsIkRvdWJsZVBheURheSIsIl9uZXh0VHVybkRvdWJsZVBheSIsIl9za2lwTmV4dFR1cm4iLCJfc2tpcE5leHRQYXlkYXkiLCJfc2tpcEhNTmV4dFBheWRheSIsIl9za2lwQk1OZXh0UGF5ZGF5IiwiQ2FyZEV2ZW50UmVjZWl2ZWQiLCJUdXJuSW5Qcm9ncmVzcyIsIkJhY2tzcGFjZXMiLCJpc0dhbWVPdmVyIiwiT25lUXVlc3Rpb25JbmRleCIsIk9uZVF1ZXN0aW9ucyIsIkNhcmREaXNwbGF5U2V0VGltb3V0IiwiR2FtZU1hbmFnZXIiLCJDb21wb25lbnQiLCJQbGF5ZXJHYW1lSW5mbyIsIkJvdEdhbWVJbmZvIiwiUGxheWVyTm9kZSIsIk5vZGUiLCJDYW1lcmFOb2RlIiwiQWxsUGxheWVyVUkiLCJBbGxQbGF5ZXJOb2RlcyIsIlN0YXJ0TG9jYXRpb25Ob2RlcyIsIlNlbGVjdGVkTW9kZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIklucHV0VGVzdERpY2UxIiwiX3ZhbCIsIklucHV0VGVzdERpY2UyIiwib25Mb2FkIiwiVHVybk51bWJlciIsIlR1cm5Db21wbGV0ZWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiR2V0U2VsZWN0ZWRNb2RlIiwiSW5pdF9HYW1lTWFuYWdlciIsIlJhbmRvbUNhcmRJbmRleCIsIkNhcmRDb3VudGVyIiwiQ2FyZERpc3BsYXllZCIsInJlcXVpcmUiLCJDYW1lcmEiLCJnZXRDb21wb25lbnQiLCJpc0NhbWVyYVpvb21pbmciLCJjb25zb2xlIiwiZXJyb3IiLCJDaGVja1NwZWN0YXRlIiwibG9nIiwiZ2V0UGhvdG9uUmVmIiwibXlSb29tIiwiZ2V0Q3VzdG9tUHJvcGVydHkiLCJHZXRfR2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkiLCJBbGxEYXRhIiwiTWF4UGxheWVycyIsImxlbmd0aCIsIlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlciIsIlVwZGF0ZUdhbWVVSSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiR2V0VHVybk51bWJlciIsIkdldE15SW5kZXgiLCJteUluZGV4IiwiX2FjdG9yIiwiUGhvdG9uQWN0b3IiLCJjdXN0b21Qcm9wZXJ0aWVzIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJfYWxsQWN0b3JzIiwiaW5kZXgiLCJTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8iLCJBc3NpZ25QbGF5ZXJHYW1lVUkiLCJFbmFibGVQbGF5ZXJOb2RlcyIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJfdG9Qb3MiLCJWZWMyIiwiR2V0X1NwYWNlTWFuYWdlciIsIkRhdGEiLCJSZWZlcmVuY2VMb2NhdGlvbiIsInBvc2l0aW9uIiwieCIsInkiLCJzZXRQb3NpdGlvbiIsImFjdGl2ZSIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJUb3RhbENvbm5lY3RlZFBsYXllcnMiLCJteVJvb21BY3RvckNvdW50IiwidXNlcklEIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDaGFuZ2VUdXJuIiwiUmFpc2VFdmVudEZvckNhcmQiLCJfZGF0YSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiUmFpc2VFdmVudCIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJEaXNwbGF5Q2FyZE9uT3RoZXJzIiwiT25MYW5kZWRPblNwYWNlIiwic2V0VGltZW91dCIsIlJlc2V0Q2FyZERpc3BsYXkiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiUmFuZG9tQ2FyZCIsInJhbmRvbUNhcmQiLCJjb3VudGVyIiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIlN5bmNBbGxEYXRhIiwiUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlIiwiX3VpZCIsInB1c2giLCJBcnJheUxlbmd0aCIsIklERm91bmQiLCJVcGRhdGVWaXN1YWxEYXRhIiwiUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5IiwiVHVybkhhbmRsZXIiLCJfdHVybiIsIl9wbGF5ZXJNYXRjaGVkIiwiVG9nZ2xlVHVyblByb2dyZXNzIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUmVzZXRUdXJuVmFyaWFibGUiLCJSb2xsRGljZSIsIkRpY2VSb2xsU2NyZWVuIiwiUGxheWVySW5mbyIsIlJvb21BY3RvcnMiLCJTaG93VG9hc3QiLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJfaW5kIiwiTWFpblNlc3Npb25EYXRhIiwiTXlEYXRhIiwiX2NvdW50ZXIiLCJTdGFydFR1cm4iLCJSZWNlaXZlQmFua3J1cHREYXRhIiwiX2lzQmFua3J1cHRlZCIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiX3BsYXllckRhdGEiLCJQbGF5ZXJEYXRhTWFpbiIsIlN0YXJ0VHVybkFmdGVyQmFua3J1cHQiLCJfcmFuZG9tSW5kZXgiLCJnZXRSYW5kb20iLCJTZXROYW1lIiwiX3RvZ2dsZUhpZ2hsaWdodCIsIl9pbmRleCIsIlRvZ2dsZUJHSGlnaGxpZ2h0ZXIiLCJUb2dnbGVUZXh0aWdobGlnaHRlciIsIlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMiLCJ0YXJnZXRQb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInJhdGlvIiwid2luU2l6ZSIsImhlaWdodCIsInpvb21SYXRpbyIsImxhdGVVcGRhdGUiLCJzeW5jRGljZVJvbGwiLCJfcm9sbCIsIl9kaWNlMSIsImRpY2UxIiwiX2RpY2UyIiwiZGljZTIiLCJfcmVzdWx0IiwibXlSb29tQWN0b3JzQXJyYXkiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJBbmltYXRlRGljZSIsIkRpY2VGdW50aW9uYWxpdHkiLCJfcG9zIiwiVHdlZW5DYW1lcmEiLCJUZW1wQ2hlY2tTcGFjZSIsIl9yb2xsaW5nIiwidGVtcGNvdW50ZXIiLCJ0ZW1wY291bnRlcjIiLCJkaWNldG9iZSIsInBhcnNlSW50IiwiU3BhY2VEYXRhIiwiU3BhY2VzVHlwZSIsIkRpY2UxIiwiRGljZTIiLCJfbmV3Um9sbCIsIlJvbGxPbmVEaWNlIiwiUm9sbFR3b0RpY2VzIiwiY2FsbFVwb25DYXJkIiwiX3NwYWNlSUQiLCJ2YWx1ZUluZGV4IiwiU2VuZGluZ0RhdGEiLCJjb21wbGV0ZUNhcmRUdXJuIiwiQ2FsbEdhbWVDb21wbGV0ZSIsIl9pc0JvdCIsIl9wbGF5ZXJJbmRleCIsIl9jYXNoIiwiSE1BbW91bnQiLCJHZXRfR2FtZU1hbmFnZXIiLCJCTUFtb3VudCIsIkJNTG9jYXRpb25zIiwibG9hbkFtb3VudCIsIkJNQ2FzaCIsIkhNQ2FzaCIsIlRvdGFsQXNzZXRzIiwiUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZSIsIlN5bmNHYW1lT3ZlciIsIl9VSUQiLCJSZXN0YXJ0R2FtZSIsIlN0YXJ0RGljZVJvbGwiLCJab29tQ2FtZXJhT3V0IiwicGxheWVyY29tcGxldGVkIiwibWF4IiwiU2VsZWN0ZWRJbmQiLCJTZXNzaW9uRGF0YSIsIl92YWx1ZSIsIlR3ZWVuUGxheWVyIiwibWluIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaXNab29tIiwidGltZSIsInR3ZWVuIiwidG8iLCJ2MiIsImVhc2luZyIsImNhbGwiLCJab29tQ2FtZXJhSW4iLCJzdGFydCIsIkNoZWNrUGF5RGF5Q29uZGl0aW9ucyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiVG9nZ2xlUGF5RGF5IiwiUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24iLCJUb1BvcyIsIl9uZXdwb3MiLCJfc3QxIiwiX1N0MiIsIkV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsImFtb3VudCIsIl9sb2NhdGlvbk5hbWUiLCJfaXNDYXJkRnVuY3Rpb25hbGl0eSIsIl9HaXZlbkNhc2giLCJfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIlNldEJ1c2luZXNzSW5kZXgiLCJTZXRDYXJkRnVuY3Rpb25hbGl0eSIsIlNldEdpdmVuQ2FzaCIsIlNldFN0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIlJlc2V0RWRpdEJveCIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsImRlc3Ryb3kiLCJVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJfU2hhcmVBbW91bnQiLCJfaXNBZGRpbmciLCJfc3RvY2siLCJfaXNEb3VibGVQYXlEYXkiLCJfZm9yU2VsZWN0ZWRCdXNpbmVzcyIsIl9TZWxlY3RlZEJ1c2luZXNzSW5kZXgiLCJIQkFtb3VudCIsIl90aXRsZSIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJfYW1vdW50IiwiX3VJRCIsIklEIiwiUmVjZWl2ZVByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9pRCIsIl9teUluZGV4IiwiX3N0YXRlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiUmV0dXJuVHVyblByb2dyZXNzIiwiTG9zZUFsbE1hcmtldGluZ01vbmV5IiwiX2xvc2VBbW91bnQiLCJNdWx0aXBseU1hcmtldGluZ01vbmV5IiwiX211bHRpcGxpZXIiLCJfYW1vdW50SW5jcmVhc2VkIiwiR2V0TWFya2V0aW5nTW9uZXkiLCJfcHJvZml0IiwiUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24iLCJfdXNlcklEIiwiVXNlcklEIiwiX3F1ZXN0aW9uSW5kZXgiLCJRdWVzdGlvbiIsIlVzZXJJbmRleCIsIl9nYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9xdWVzdGlvbkFza2VkIiwiU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbiIsIl9pc1R1cm5PdmVyIiwiX215RGF0YSIsIl9yb29tRGF0YSIsIlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJPbmVRdWVzdGlvbkRlY2lzaW9uX1BheUFtb3VudF9PbmVRdWVzdGlvbiIsIlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbiIsIk9uZVF1ZXN0aW9uRGVjaXNpb25fQW5zd2VyUXVlc3Rpb25fT25lUXVlc3Rpb24iLCJfaGFzRG9uZVBheW1lbnQiLCJfaGFzQW5zd2VyZWRRdWVzdGlvbiIsIl9Vc2VySUQiLCJQYXltZW50RG9uZSIsIlF1ZXN0aW9uQW5zd2VyZWQiLCJRdWVzdGlvbkluZGV4IiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9zZWxlY3RlZFBsYXllckluZGV4IiwiX2FjdG9yc0RhdGEiLCJfbG9hblRha2VuIiwiUmVjZWl2ZUdvQmFja1NwYWNlc0RhdGFfc3BhY2VGdW5jdGlvbmFsaXR5IiwiX3NwYWNlcyIsImJhY2tzcGFjZXMiLCJDb3VudGVyIiwiVHdlZW5QbGF5ZXJfR29CYWNrU3BhY2VzIiwic3BlZWQiLCJHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLEdBQUcsS0FBZDtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCO0FBRUEsSUFBSUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUF6QjtBQUNBLElBQUlDLGlCQUFpQixHQUFHLENBQUMsQ0FBekI7QUFFQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUFDLENBQXpCLEVBRUE7QUFDQTs7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDM0JDLEVBQUFBLElBQUksRUFBQyxDQURzQjtBQUUzQkMsRUFBQUEsU0FBUyxFQUFFLENBRmdCO0FBRUs7QUFDaENDLEVBQUFBLGNBQWMsRUFBRSxDQUhXLENBR0s7O0FBSEwsQ0FBUixDQUF2QixFQU1BOztBQUNBLElBQUlDLFlBQVksR0FBR0wsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDeEJDLEVBQUFBLElBQUksRUFBRSxjQURrQjtBQUU1QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBRSxjQURFO0FBRVJDLElBQUFBLFlBQVksRUFDYjtBQUNJQyxNQUFBQSxXQUFXLEVBQUMsTUFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFYixnQkFGVjtBQUdJLGlC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Q0FBMEUsRUFBMUUsRUFBNkVGLEtBQTdFO0FBQ0g7O0FBRUQsUUFBSWpCLE1BQU0sR0FBQzdJLEVBQUUsQ0FBQzhJLElBQUgsQ0FBUTdFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NpRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEbkYsV0FBMUQsRUFBdUVvRixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHQyxDQUExRyxFQUE0R2xGLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NpRCxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEbkYsV0FBMUQsRUFBdUVvRixpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHRSxDQUE5TSxDQUFYOztBQUNBLFNBQUs4Tyx3QkFBTCxDQUE4QixLQUFLeFMsY0FBTCxDQUFvQixLQUFLUyxVQUF6QixDQUE5QixFQUFtRTBDLE1BQW5FO0FBQ0EsU0FBS2dILGdCQUFMO0FBQ0gsR0FuMkRvQixDQXMyRHJCO0FBQ0E7O0FBdjJEcUIsQ0FBVCxDQUFoQixFQXkyREE7O0FBQ0F3SSxNQUFNLENBQUNDLE9BQVAsR0FBa0JwVCxXQUFsQixFQUNBIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX2lzVGVzdCA9IGZhbHNlO1xyXG52YXIgX2RpY2VpbnB1dDEgPSBcIlwiO1xyXG52YXIgX2RpY2VpbnB1dDIgPSBcIlwiO1xyXG52YXIgUHJldmlvdXNEaWNlUm9sbDEgPSAtMTtcclxudmFyIFByZXZpb3VzRGljZVJvbGwyID0gLTE7XHJcblxyXG52YXIgUHJldmlvdXNEaWNlUm9sbDMgPSAtMTtcclxudmFyIFByZXZpb3VzRGljZVJvbGw0ID0gLTE7XHJcblxyXG52YXIgUHJldmlvdXNEaWNlUm9sbDUgPSAtMTtcclxuXHJcbi8vI3JlZ2lvbiBzdXBlcmNsYXNzZXMgYW5kIGVudW1lcmF0aW9uc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bUJ1c2luZXNzVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgSG9tZUJhc2VkOiAxLCAgICAgICAgICAgICAgICAgICAvL2EgYnVzaW5lc3MgdGhhdCB5b3Ugb3BlcmF0ZSBvdXQgb2YgeW91ciBob21lXHJcbiAgICBicmlja0FuZG1vcnRhcjogMiAgICAgICAgICAgICAgIC8vYSBzdG9yZSBmcm9udCBidXNpbmVzc1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzc0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzSW5mbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiQnVzaW5lc3NJbmZvXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOYW1lOiBcIkJ1c2luZXNzRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NUeXBlOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1vZGVcIixcclxuICAgICAgIHR5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICAgICBkZWZhdWx0OiBFbnVtQnVzaW5lc3NUeXBlLk5vbmUsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiQnVzaW5lc3MgY2F0b2dvcnkgZm9yIHBsYXllcnNcIix9LCBcclxuICAgIEJ1c2luZXNzVHlwZURlc2NyaXB0aW9uOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiVHlwZSAoYnkgbmFtZSkgb2YgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgQnVzaW5lc3NOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiTmFtZSBvZiB0aGUgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgIEFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJiYWxhbmNlIG9mIGJ1c2luZXNzXCIsfSxcclxuICAgICAgSXNQYXJ0bmVyc2hpcDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc1BhcnRuZXJzaGlwXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwdzpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgZG9uZSBwYXJ0bmVyc2hpcCB3aXRoIHNvbWVvbmUgd2l0aCBjdXJyZW50IGJ1c2luZXNzXCIsfSxcclxuICAgICAgIFBhcnRuZXJJRDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGFydG5lcklEXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB0b29sdGlwOiBcIklEIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLH0sXHJcbiAgICAgICBQYXJ0bmVyTmFtZTpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGFydG5lck5hbWVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICB0b29sdGlwOlwibmFtZSBvZiB0aGUgcGFydG5lciB3aXRoIHdob20gcGxheWVyIGhhcyBmb3JtZWQgcGFydG5lcnNoaXBcIix9LFxyXG4gICAgICAgIExvY2F0aW9uc05hbWU6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvY2F0aW9uc05hbWVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogW2NjLlRleHRdLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICB0b29sdGlwOlwiaWYgcGxheWVyIG93bnMgYnJpY2sgYW5kIG1vcnRhciBoZS9zaGUgY2FuIGV4cGFuZCB0byBuZXcgbG9jYXRpb25cIix9LFxyXG4gICAgICAgIExvYW5UYWtlbjpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hblRha2VuXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICAgICBMb2FuQW1vdW50OlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQW1vdW50XCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG5cclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQ2FyZERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhRnVuY3Rpb25hbGl0eSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5XCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOZXh0VHVybkRvdWJsZVBheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJOZXh0VHVybkRvdWJsZVBheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgaXRzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXkgZGF5IG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbiAgICBTa2lwTmV4dFR1cm46XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcE5leHRUdXJuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiB0dXJuIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCB0dXJuIGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbiAgICBTa2lwTmV4dFBheWRheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwTmV4dFBheWRheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxuICAgIFNraXBITU5leHRQYXlkYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcEhNTmV4dFBheWRheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBob21lIGJhc2VkIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSxcclxuICAgIFNraXBCTU5leHRQYXlkYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcEJNTmV4dFBheWRheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBicmlja2EgYW5kIG1tb3J0YXIgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3RvY2tJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTdG9ja0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIlN0b2NrSW5mb1wiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgTmFtZTogXCJTdG9ja0RhdGFcIixcclxuICAgIEJ1c2luZXNzTmFtZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc05hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm5hbWUgb2YgdGhlIGJ1c2luZXNzIGluIHdoaWNoIHN0b2NrcyB3aWxsIGJlIGhlbGRcIix9LCBcclxuICAgIFNoYXJlQW1vdW50OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJTaGFyZUFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOiBcIlNoYXJlIGFtb3VudCBvZiB0aGUgc3RvY2tcIix9LFxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgIFBsYXllciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlBsYXllckRhdGFcIixcclxucHJvcGVydGllczogeyBcclxuICAgIFBsYXllck5hbWU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibmFtZSBvZiB0aGUgcGxheWVyXCIsfSxcclxuICAgIFBsYXllclVJRDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJVSURcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIklEIG9mIHRoZSBwbGF5ZXJcIix9LFxyXG4gICAgQXZhdGFySUQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFySURcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJpZCByZWZlcmVuY2UgZm9yIHBsYXllciBhdmF0YXIgc2VsZWN0aW9uXCIsfSxcclxuICAgIElzQm90OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIklzQm90XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwdzpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIGN1cnJlbnQgcGxheWVyIGlzIGJvdFwiLH0sIFxyXG4gICAgTm9PZkJ1c2luZXNzOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzXCIsXHJcbiAgICAgICB0eXBlOiBbQnVzaW5lc3NJbmZvXSxcclxuICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIk51bWJlciBvZiBidXNpbmVzcyBhIHBsYXllciBjYW4gb3duXCIsfSwgXHJcbiAgICBDYXJkRnVuY3Rpb25hbGl0eTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJDYXJkRnVuY3Rpb25hbGl0eVwiLFxyXG4gICAgICAgdHlwZTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiY2FyZCBmdW5jdGlvbmFsaXR5IHN0b3JlZCBieSBwbGF5ZXJcIix9LCBcclxuICAgIEhvbWVCYXNlZEFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJIb21lQmFzZWRBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm51bWJlciBvZiBob21lIGJhc2VkIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIix9LCBcclxuICAgIEJyaWNrQW5kTW9ydGFyQW1vdW50OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrQW5kTW9ydGFyQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJudW1iZXIgb2YgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBUb3RhbExvY2F0aW9uc0Ftb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbExvY2F0aW9uc0Ftb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibnVtYmVyIG9mIGxvY2F0aW9ucyBvZiBhbGwgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc2Vzc1wiLH0sIFxyXG4gICAgTm9PZlN0b2NrczpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTdG9ja3NcIixcclxuICAgICAgIHR5cGU6IFtTdG9ja0luZm9dLFxyXG4gICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiTnVtYmVyIG9mIHN0b2NrIGEgcGxheWVyIG93bnNcIix9LCBcclxuICAgIENhc2g6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBjYXNoIHBsYXllciBvd25zXCIsfSxcclxuICAgIEdvbGRDb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJHb2xkQ291bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJjb3VudCBvZiBnb2xkIGEgcGxheWVyIG93bnNcIix9LFxyXG4gICAgU3RvY2tDb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja0NvdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiY291bnQgb2Ygc3RvY2tzIGEgcGxheWVyIG93bnNcIix9LFxyXG4gICAgTG9hblRha2VuOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5UYWtlblwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHRha2VuIGxvYW4gZnJvbSBiYW5rIG9yIG5vdFwiLH0sXHJcbiAgICAgTG9hbkFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQW1vdW50IG9mIGxvYW4gdGFrZW4gZnJvbSB0aGUgYmFua1wiLH0sXHJcbiAgICBNYXJrZXRpbmdBbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nQW1vdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwibWFya2V0aW5nIGFtb3VudCBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIExhd3llclN0YXR1czpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMYXd5ZXJTdGF0dXNcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBoaXJlZCBhIGxhd3llciBvciBub3RcIix9LFxyXG4gICAgSXNCYW5rcnVwdDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc0JhbmtydXB0XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgYmVlbiBCYW5rcnVwdGVkIG9yIG5vdFwiLH0sXHJcbiAgICBCYW5rcnVwdEFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJCYW5rcnVwdEFtb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaG93IG11Y2ggdGltZSBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFwiLH0sXHJcbiAgICBTa2lwcGVkTG9hblBheW1lbnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcHBlZExvYW5QYXltZW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgc2tpcHBlZCBsb2FuIHBheW1lbnRcIix9LFxyXG4gICAgUGxheWVyUm9sbENvdW50ZXI6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyUm9sbENvdW50ZXJcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHRvIHN0b3JlIHJvbGwgY291bnRvciBmb3IgcGxheWVyXCIsfSxcclxuICAgIEluaXRpYWxDb3VudGVyQXNzaWduZWQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICBpc0dhbWVGaW5pc2hlZDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiaXNHYW1lRmluaXNoZWRcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgIFRvdGFsU2NvcmU6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsU2NvcmVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICBHYW1lT3ZlcjpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiR2FtZU92ZXJcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG59LFxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG5cclxufSk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIEdhbWUgTWFuYWdlciBDbGFzc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0obWFpbiBjbGFzcykgY2xhc3MgZm9yIEdhbWUgTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUm9sbENvdW50ZXI9MDtcclxudmFyIERpY2VUZW1wPTA7XHJcbnZhciBEaWNlUm9sbD0wO1xyXG52YXIgSXNUd2VlbmluZz1mYWxzZTtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgVHVybkNoZWNrQXJyYXk9W107XHJcbnZhciBCdXNpbmVzc0xvY2F0aW9uTm9kZXM9W107XHJcblxyXG52YXIgUGFzc2VkUGF5RGF5PWZhbHNlO1xyXG52YXIgRG91YmxlUGF5RGF5PWZhbHNlO1xyXG5cclxuLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbnZhciBfbmV4dFR1cm5Eb3VibGVQYXk9ZmFsc2U7XHJcbnZhciBfc2tpcE5leHRUdXJuPWZhbHNlO1xyXG52YXIgX3NraXBOZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG52YXIgX3NraXBITU5leHRQYXlkYXk9ZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBob21lIGJhc2VkIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIF9za2lwQk1OZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgQ2FyZEV2ZW50UmVjZWl2ZWQ9ZmFsc2U7XHJcbnZhciBUdXJuSW5Qcm9ncmVzcz1mYWxzZTtcclxuXHJcbnZhciBCYWNrc3BhY2VzPTM7XHJcbnZhciBpc0dhbWVPdmVyPWZhbHNlO1xyXG52YXIgT25lUXVlc3Rpb25JbmRleD0tMTtcclxudmFyIE9uZVF1ZXN0aW9ucz1cclxuW1xyXG4gICAgXCJ5b3UgaGF2ZSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1wiLFxyXG4gICAgXCJ5b3UgaGF2ZSB0YWtlbiBhbnkgbG9hbj9cIixcclxuICAgIFwieW91IGhhdmUgYmFua3J1cHRlZCBldmVyP1wiLFxyXG4gICAgXCJ5b3VyIG5leHQgdHVybiBpcyBnb2luZyB0byBiZSBza2lwcGVkP1wiLFxyXG4gICAgXCJ5b3VyIG5leHQgcGF5ZGF5IGlzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXlkYXk/XCJcclxuXTtcclxuXHJcbnZhciBDYXJkRGlzcGxheVNldFRpbW91dD1udWxsO1xyXG5cclxudmFyIEdhbWVNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJHYW1lTWFuYWdlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIHBsYXllcidzIGRhdGFcIn0sXHJcbiAgICAgICAgQm90R2FtZUluZm86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJhbGwgYm90J3MgZGF0YVwifSxcclxuICAgICAgICBQbGF5ZXJOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBwbGF5ZXJcIix9LCAgICBcclxuICAgICAgICBDYW1lcmFOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBjYW1lcmFcIix9LCAgICBcclxuICAgICAgICBBbGxQbGF5ZXJVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBvZiB1aSBvZiBhbGwgcGxheWVyc1wiLH0sICAgICAgXHJcbiAgICAgICAgQWxsUGxheWVyTm9kZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2Ygbm9kZSBvZiBhbGwgcGxheWVycyBpbnNpZGUgZ2FtZXBsYXlcIix9LCAgIFxyXG4gICAgICAgIFN0YXJ0TG9jYXRpb25Ob2Rlczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBvZiBhdHRheSBvZiBsb2NhdGlvbnNcIix9LCAgIFxyXG4gICAgICAgICBTZWxlY3RlZE1vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDowLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImludGVnZXIgcmVmZXJlbmNlIGZvciBnYW1lIG1vZGUgMSBtZWFucyBib3QgYW5kIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXCIsXHJcbiAgICAgICAgfSwgIFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgUGxheWVyRGF0YTogUGxheWVyRGF0YSxcclxuICAgICAgICBCdXNpbmVzc0luZm86QnVzaW5lc3NJbmZvLFxyXG4gICAgICAgIEVudW1CdXNpbmVzc1R5cGU6RW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgICBJbnN0YW5jZTpudWxsXHJcbiAgICB9LFxyXG5cclxuICAgIElucHV0VGVzdERpY2UxKF92YWwpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgICAgICAgX2RpY2VpbnB1dDEgPSBfdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgSW5wdXRUZXN0RGljZTIoX3ZhbClcclxuICAgIHtcclxuICAgICAgICBpZiAoX2lzVGVzdCkge1xyXG4gICAgICAgICAgICBfZGljZWlucHV0MiA9IF92YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vI3JlZ2lvbiBBbGwgRnVuY3Rpb25zIG9mIEdhbWVNYW5hZ2VyXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgY2xhc3MgaXMgY3JlYXRlZFxyXG4gICAgQG1ldGhvZCBvbkxvYWRcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDtcclxuICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgVHVybkNoZWNrQXJyYXk9W107XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkTW9kZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgICAgIHRoaXMuSW5pdF9HYW1lTWFuYWdlcigpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4PTA7XHJcbiAgICAgICAgdGhpcy5DYXJkQ291bnRlcj0wO1xyXG4gICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD1mYWxzZTtcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD1mYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gYXNzaWduIHJlZmVyZW5jZSBvZiByZXF1aXJlZCBjbGFzc2VzXHJcbiAgICBAbWV0aG9kIENoZWNrUmVmZXJlbmNlc1xyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBpbml0aWFsIGdhbWVtYW5hZ2VyIGVzc2V0aWFsc1xyXG4gICAgQG1ldGhvZCBJbml0X0dhbWVNYW5hZ2VyXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBJbml0X0dhbWVNYW5hZ2VyICgpIHtcclxuICAgICAgICB0aGlzLkNhbWVyYT10aGlzLkNhbWVyYU5vZGUuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSk7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmc9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1bXTtcclxuICAgICAgICBSb2xsQ291bnRlcj0wO1xyXG4gICAgICAgIERpY2VUZW1wPTA7XHJcbiAgICAgICAgRGljZVJvbGw9MDsgIFxyXG5cclxuICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikgLy9nYW1lIGlzIGJlaW5nIHBsYXllZCBieSByZWFsIHBsYXllcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vaWYgam9pbmVkIHBsYXllciBpcyBzcGVjdGF0ZVxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKT09dHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdGF0dXMgb2YgaW5pdGlhbCBidXNpbmVzcyBzZXRwOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpKTtcclxuICAgICAgICAgICAgICAgIC8vaWYgaW5pdGFsIHNldHVwIGhhcyBiZWVuIGRvbmUgYW5kIGdhbWUgaXMgdW5kZXIgd2F5XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpPT10cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEFsbERhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm89QWxsRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsdGhpcy5UdXJuTnVtYmVyKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Jbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLGZhbHNlLHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKSAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IGJvdCBhbG9uZyB3aXRoIG9uZSBwbGF5ZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSxmYWxzZSx0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNyZWdpb24gcHVibGljIGZ1bmN0aW9ucyB0byBnZXQgZGF0YSAoYWNjZXNzaWJsZSBmcm9tIG90aGVyIGNsYXNzZXMpXHJcbiAgICBHZXRUdXJuTnVtYmVyICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5UdXJuTnVtYmVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZXRNeUluZGV4KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbXlJbmRleCA9IDA7XHJcbiAgICAgICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgIHZhciBfYWxsQWN0b3JzID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hbGxBY3RvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX2FjdG9yLlBsYXllclVJRCA9PSBfYWxsQWN0b3JzW2luZGV4XS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbXlJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG15SW5kZXg7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8jcmVnaW9uIFNwZWN0YXRlTW9kZSBDb2RlXHJcblxyXG4gICAgU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKClcclxuICAgIHtcclxuICAgICAgICB2YXIgQWxsRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1BbGxEYXRhO1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlciA+IDAgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZD09dHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90b1BvcyA9IGNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsIF90b1Bvcy55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzeW5jZWQgcGxheWVybm9kZXNcIik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKClcclxuICAgIHtcclxuICAgICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yQ291bnQoKTtcclxuICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT1Ub3RhbENvbm5lY3RlZFBsYXllcnMpXHJcbiAgICAgIHtcclxuICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBmdW5jdGlvbnMgcmVsYXRlZCB0byBUdXJuIE1lY2hhbmlzbSBhbmQgY2FyZCBtZWNoYW5pc21cclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSB3aGF0IGNhcmQgaGFzIGJlZW4gc2VsZWN0ZWQgYnkgcGxheWVyXHJcbiAgICBAbWV0aG9kIFJhaXNlRXZlbnRGb3JDYXJkXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmFpc2VFdmVudEZvckNhcmQoX2RhdGEpXHJcbiAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNSxfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJEaXNwbGF5VGltZW91dCgpXHJcbiAge1xyXG4gICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICB9LFxyXG5cclxuICBEaXNwbGF5Q2FyZE9uT3RoZXJzKClcclxuICB7XHJcbiAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKSAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG4gICAgICAgIGlmKENhcmRFdmVudFJlY2VpdmVkPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLkNhcmRDb3VudGVyKTtcclxuICAgICAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLkNhcmREaXNwbGF5ZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuQ2FyZENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKGZhbHNlLHRoaXMuUmFuZG9tQ2FyZEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDYXJkRGlzcGxheVNldFRpbW91dD1zZXRUaW1lb3V0KCgpID0+IHsgLy9jaGVjayBhZnRlciBldmVyeSAwLjUgc2Vjb25kc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EaXNwbGF5Q2FyZE9uT3RoZXJzKCk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRDYXJkRGlzcGxheSgpXHJcbiAge1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpXHJcbiAge1xyXG5cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcblxyXG4gICAgdmFyIFJhbmRvbUNhcmQ9X2RhdGEucmFuZG9tQ2FyZDtcclxuICAgIHZhciBjb3VudGVyPV9kYXRhLmNvdW50ZXI7XHJcblxyXG4gICAgdGhpcy5SYW5kb21DYXJkSW5kZXg9UmFuZG9tQ2FyZDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXI9Y291bnRlcjtcclxuXHJcbiAgIFxyXG4gICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcblxyXG4gICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLk9uTGFuZGVkT25TcGFjZSh0cnVlLFJhbmRvbUNhcmQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9dHJ1ZTtcclxuICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdD09ZmFsc2UpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLk9uTGFuZGVkT25TcGFjZSh0cnVlLFJhbmRvbUNhcmQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKGZhbHNlLFJhbmRvbUNhcmQsdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcblxyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSBwYXJ0aWN1bGFyIHBsYXllciBoYXMgY29tcGxldGUgdGhlaXIgbW92ZVxyXG4gICAgQG1ldGhvZCBSYWlzZUV2ZW50VHVybkNvbXBsZXRlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpXHJcbiAge1xyXG4gICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAge1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg0LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKVxyXG4gICAgICB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVhaXNlZCBmb3IgdHVybiBjb21wbGV0ZVwiKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCk7XHJcbiAgICAgIH1cclxuICB9LFxyXG5cclxuXHJcbiAgU3luY0FsbERhdGEoKVxyXG4gIHtcclxuICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICB9ICBcclxufSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgb24gYWxsIHBsYXllcnMgdG8gdmFsaWRhdGUgaWYgbW92ZSBpcyBjb21wbGV0ZWQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzXHJcbiAgICBAbWV0aG9kIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZShfdWlkKVxyXG4gIHtcclxuICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9yZWFsIHBsYXllcnNcclxuICAgICAge1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5Lmxlbmd0aD09MClcclxuICAgICAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpOyBcclxuXHJcbiAgICAgICAgICAgIHZhciBBcnJheUxlbmd0aD1UdXJuQ2hlY2tBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBJREZvdW5kPWZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQXJyYXlMZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihUdXJuQ2hlY2tBcnJheVtpbmRleF09PV91aWQpXHJcbiAgICAgICAgICAgICAgICAgICAgSURGb3VuZD10cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighSURGb3VuZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgICAgICAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PVRvdGFsQ29ubmVjdGVkUGxheWVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHVybkNoZWNrQXJyYXk9W107XHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgIH1cclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBkaWNlIGFuaW1hdGlvbiBpcyBwbGF5ZWQgb24gYWxsIHBsYXllcnNcclxuICAgIEBtZXRob2QgQ2hhbmdlVHVyblxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ2hhbmdlVHVybigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLlR1cm5OdW1iZXI8dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgtMSlcclxuICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPXRoaXMuVHVybk51bWJlcisxO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPTA7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMix0aGlzLlR1cm5OdW1iZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVWaXN1YWxEYXRhKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBmcm9tIHJhaXNlIG9uIGV2ZW50IChmcm9tIGZ1bmN0aW9uIFwiU3RhcnRUdXJuXCIgYW5kIFwiQ2hhbmdlVHVyblwiIG9mIHRoaXMgc2FtZSBjbGFzcykgdG8gaGFuZGxlIHR1cm5cclxuICAgIEBtZXRob2QgVHVybkhhbmRsZXJcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFR1cm5IYW5kbGVyKF90dXJuKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVXBkYXRlVmlzdWFsRGF0YSgpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUdXJuOiBcIitfdHVybik7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJNYXRjaGVkPWZhbHNlO1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49ZmFsc2U7XHJcbiAgICAgICAgaWYoSXNUd2VlbmluZykgLy9jaGVjayBpZiBhbmltYXRpb24gb2YgdHVybiBiZWluZyBwbGF5ZWQgb24gb3RoZXIgcGxheWVycyBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuSGFuZGxlcihfdHVybik7XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVHVybk51bWJlcj1fdHVybjtcclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBfcGxheWVyTWF0Y2hlZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9za2lwTmV4dFR1cm49dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZighX3NraXBOZXh0VHVybilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90PT1mYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBfcGxheWVyTWF0Y2hlZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9za2lwTmV4dFR1cm49dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZighX3NraXBOZXh0VHVybilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlLy90dXJuIGRlY2lzaW9ucyBmb3IgYm90XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NraXBOZXh0VHVybj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFfc2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJvbGxEaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLHRoaXMuVHVybk51bWJlcix0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHVybiBPZjogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGxQbGF5ZXJVSVt0aGlzLlR1cm5OdW1iZXJdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5QbGF5ZXJJbmZvKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3NraXAgdGhpcyB0dXJuIGFzIHNraXAgdHVybiBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlXHJcbiAgICAgICAgICAgIGlmKF9wbGF5ZXJNYXRjaGVkICYmIF9za2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsMTIwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVNraXBOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZClcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgIHZhciBNeURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgICAgIHZhciBfY291bnRlcj1faW5kO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAvL2lmKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCE9TXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKSAvL2RvbnQgdXBkYXRlIG15IG93biBkYXRhXHJcbiAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEPT1NYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl09TWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX2NvdW50ZXI8dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkaW5nIGNvdW50ZXI6IFwiK19jb3VudGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIGlmKF9jb3VudGVyPHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoLTEpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkZGluZyBjb3VudGVyOiBcIitfY291bnRlcik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgIH0sICBcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGFsbCBwbGF5ZXJzIGhhdmUgZG9uZSB0aGVpciBpbml0aWFsIHNldHVwIGFuZCBmaXJzdCB0dXJuIHN0YXJ0c1xyXG4gICAgQG1ldGhvZCBTdGFydFR1cm5cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFN0YXJ0VHVybigpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKCk7XHJcbiAgICAgICAgdGhpcy5UdXJuTnVtYmVyPTA7IC8vcmVzZXRpbmcgdGhlIHR1cm4gbnVtYmVyIG9uIHN0YXJ0IG9mIHRoZSBnYW1lXHJcblxyXG4gICAgICAgIC8vc2VuZGluZyBpbml0aWFsIHR1cm4gbnVtYmVyIG92ZXIgdGhlIG5ldHdvcmsgdG8gc3RhcnQgdHVybiBzaW11bHRhbm91c2x5IG9uIGFsbCBjb25uZWN0ZWQgcGxheWVyJ3MgZGV2aWNlc1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMix0aGlzLlR1cm5OdW1iZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICBcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgUmVjZWl2ZUJhbmtydXB0RGF0YShfZGF0YSlcclxuICAgIHtcclxuICAgICAgICAvL290aGVyIHBsYXllciBoYXMgYmVlbiBiYW5rcnVwdGVkXHJcbiAgICAgICAgdmFyIF9pc0JhbmtydXB0ZWQ9X2RhdGEuRGF0YS5iYW5rcnVwdGVkO1xyXG4gICAgICAgIHZhciBfdHVybj1fZGF0YS5EYXRhLnR1cm47XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJEYXRhPV9kYXRhLkRhdGEuUGxheWVyRGF0YU1haW47XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhfaXNCYW5rcnVwdGVkKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhfdHVybik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coX3BsYXllckRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW190dXJuXT1fcGxheWVyRGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuXHJcbiAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsdGhpcy5UdXJuTnVtYmVyLHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgICAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTdGFydFR1cm5BZnRlckJhbmtydXB0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKHRydWUpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsdGhpcy5UdXJuTnVtYmVyLHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcbiAgICAgICAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gRnVuY3Rpb24gZm9yIGdhbWVwbGF5XHJcbiAgICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gYXNzaWduIHBsYXllciBVSSAobmFtZS9pY29ucy9udW1iZXIgb2YgcGxheWVycyB0aGF0IHRvIGJlIGFjdGl2ZSBldGMpXHJcbiAgICBAbWV0aG9kIEFzc2lnblBsYXllckdhbWVVSVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQXNzaWduUGxheWVyR2FtZVVJKF9pc0JhbmtydXB0ZWQ9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpIC8vZm9yIGJvdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIV9pc0JhbmtydXB0ZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfcmFuZG9tSW5kZXg9dGhpcy5nZXRSYW5kb20oMCx0aGlzLkJvdEdhbWVJbmZvLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm8ucHVzaCh0aGlzLkJvdEdhbWVJbmZvW19yYW5kb21JbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzPTI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5QbGF5ZXJJbmZvPXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuUmVmcmVzaERhdGFBdXRvbWF0aWNhbGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVHYW1lVUkoX3RvZ2dsZUhpZ2hsaWdodCxfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX3RvZ2dsZUhpZ2hsaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbX2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuUGxheWVySW5mbz10aGlzLlBsYXllckdhbWVJbmZvW19pbmRleF07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihfaW5kZXg9PWluZGV4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVCR0hpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVUZXh0aWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlQkdIaWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGVuYmFsZSByZXNwZWN0aXZlIHBsYXllcnMgbm9kZXMgaW5zaWRlIGdhbWFwbGF5XHJcbiAgICBAbWV0aG9kIEVuYWJsZVBsYXllck5vZGVzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBFbmFibGVQbGF5ZXJOb2RlcyhfaXNCYW5rcnVwdGVkPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFfaXNCYW5rcnVwdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQ9PTEpICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ9PTEpICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSG9tZUJhc2VkQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJyaWNrQW5kTW9ydGFyQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb249dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICBcclxuICAgICAgICBsZXQgcmF0aW89dGFyZ2V0UG9zLnkvY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTI7XHJcbiAgICB9LFxyXG5cclxuICAgIGxhdGVVcGRhdGUgKCkge1xyXG4gICAgICAgIGlmKHRoaXMuaXNDYW1lcmFab29taW5nKSAgICBcclxuICAgICAgICAgICAgdGhpcy5TZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN5bmNEaWNlUm9sbChfcm9sbClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2RpY2UxPV9yb2xsLmRpY2UxO1xyXG4gICAgICAgIHZhciBfZGljZTI9X3JvbGwuZGljZTI7XHJcbiAgICAgICAgdmFyIF9yZXN1bHQ9X2RpY2UxK19kaWNlMjtcclxuXHJcbiAgICAgICAgSXNUd2VlbmluZz10cnVlO1xyXG4gICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD1mYWxzZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEPT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9PTAgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGU9PTIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgUm9sbENvdW50ZXI9MTM7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9PTEyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcisyMTsgIFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyKzE7XHJcblxyXG4gICAgICAgICAgICBSb2xsQ291bnRlcj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXItMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBEaWNlUm9sbD1fcmVzdWx0O1xyXG4gICAgICAgIERpY2VUZW1wPTA7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbihEaWNlUm9sbCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLlR1cm5OdW1iZXI9PWluZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmdldENvbXBvbmVudChcIkRpY2VDb250cm9sbGVyXCIpLkFuaW1hdGVEaWNlKF9kaWNlMSwgX2RpY2UyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLlJlZnJlc2hEYXRhQXV0b21hdGljYWxseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5SZWZyZXNoRGF0YUF1dG9tYXRpY2FsbHkoKTtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIC8vIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgICAgICAvLyB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsdHJ1ZSwwLjQpOyAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBEaWNlRnVudGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgICAgICB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsdHJ1ZSwwLjQpOyAgXHJcbiAgICB9LFxyXG5cclxuICAgIFRlbXBDaGVja1NwYWNlKF9yb2xsaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1wY291bnRlcj0wO1xyXG4gICAgICAgIHZhciB0ZW1wY291bnRlcjI9MDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQ9PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJwbGF5ZXIgbWF0Y2hlZDpcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wY291bnRlcjI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIGlmKHRlbXBjb3VudGVyMi0xPDApXHJcbiAgICAgIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwic3RhcnRpbmcgZnJvbSBvYmxpdmlvblwiKTtcclxuICAgICAgICB0ZW1wY291bnRlcj10ZW1wY291bnRlcjIrX3JvbGxpbmctMTtcclxuICAgICAgICB2YXIgZGljZXRvYmU9cGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwidG8gYmU6IFwiK2RpY2V0b2JlKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wY291bnRlcj10ZW1wY291bnRlcjIrX3JvbGxpbmc7XHJcbiAgICAgICAgdmFyIGRpY2V0b2JlPXBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIitkaWNldG9iZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxEaWNlOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgRGljZTE7XHJcbiAgICAgICAgdmFyIERpY2UyO1xyXG4gICAgICAgIGlmIChfaXNUZXN0ICYmIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdD09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaWNlMSA9IHBhcnNlSW50KF9kaWNlaW5wdXQxKTtcclxuICAgICAgICAgICAgRGljZTIgPSBwYXJzZUludChfZGljZWlucHV0Mik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSB0cnVlICYmIF9pc1Rlc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaWNlMSA9IDE7XHJcbiAgICAgICAgICAgIERpY2UyID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuICAgICAgICAgICAgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDEgPT0gRGljZTEpXHJcbiAgICAgICAgICAgICAgICBEaWNlMT10aGlzLmdldFJhbmRvbSgxLDcpOyAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKFByZXZpb3VzRGljZVJvbGwyID09IERpY2UyKVxyXG4gICAgICAgICAgICAgICAgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTsgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBQcmV2aW91c0RpY2VSb2xsMSA9IERpY2UxO1xyXG4gICAgICAgICAgICBQcmV2aW91c0RpY2VSb2xsMiA9IERpY2UyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgXHJcblxyXG4gICAgICAgIC8vIHZhciBEaWNlMT0yMDtcclxuICAgICAgICAvLyB2YXIgRGljZTI9MTtcclxuXHJcbiAgICAgICAgRGljZVJvbGw9RGljZTErRGljZTI7XHJcbiAgICAgICAgdmFyIF9uZXdSb2xsPXtkaWNlMTpEaWNlMSxkaWNlMjpEaWNlMn1cclxuICAgICAgICAvL0RpY2VSb2xsPTIzO1xyXG4gICAgICAgIC8vdGhpcy5UZW1wQ2hlY2tTcGFjZShEaWNlUm9sbCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJkaWNlIG51bWJlcjogXCIrRGljZVJvbGwrXCIsIERpY2UxOlwiK0RpY2UxK1wiLCBEaWNlMjpcIitEaWNlMik7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMyxfbmV3Um9sbCk7IFxyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsT25lRGljZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpY2UxID0gdGhpcy5nZXRSYW5kb20oMSwgNyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKFByZXZpb3VzRGljZVJvbGw1ID09IERpY2UxKVxyXG4gICAgICAgICAgICBEaWNlMT10aGlzLmdldFJhbmRvbSgxLDcpOyAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFByZXZpb3VzRGljZVJvbGw1ID0gRGljZTE7XHJcblxyXG4gICAgICAgIHJldHVybiBEaWNlMTtcclxuICAgIH0sXHJcblxyXG4gICAgUm9sbFR3b0RpY2VzKClcclxuICAgIHtcclxuICAgICAgICB2YXIgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuICAgICAgICB2YXIgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoUHJldmlvdXNEaWNlUm9sbDMgPT0gRGljZTEpXHJcbiAgICAgICAgICAgIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7ICAgXHJcblxyXG4gICAgICAgIGlmIChQcmV2aW91c0RpY2VSb2xsNCA9PSBEaWNlMilcclxuICAgICAgICAgICAgRGljZTIgPSB0aGlzLmdldFJhbmRvbSgxLCA3KTsgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBQcmV2aW91c0RpY2VSb2xsMyA9IERpY2UxO1xyXG4gICAgICAgICAgICBQcmV2aW91c0RpY2VSb2xsNCA9IERpY2UyO1xyXG5cclxuICAgICAgICByZXR1cm4gKERpY2UxK0RpY2UyKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2FsbFVwb25DYXJkKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX3NwYWNlSUQ9cGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgaWYoX3NwYWNlSUQhPTYgJiYgX3NwYWNlSUQhPTcpIC8vNiBtZWFucyBwYXlkYXkgYW5kIDcgbWVhbnMgZG91YmxlIHBheWRheSwgOSBtZW5hcyBzZWxsIHNwYWNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgUmFuZG9tQ2FyZD10aGlzLmdldFJhbmRvbSgwLDE1KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vZm9yIHRlc3Rpbmcgb25seVxyXG4gICAgICAgICAgICBpZihfc3BhY2VJRD09MikgLy9sYW5kZWQgb24gc29tZSBiaWcgYnVzaW5lc3NcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIHZhbHVlSW5kZXg9WzAsMSw3LDEwLDIsMyw0LDUsNiw4XTtcclxuICAgICAgICAgICAgICAgIC8vIHZhciBpbmRleD10aGlzLmdldFJhbmRvbSgwLDEwKTtcclxuICAgICAgICAgICAgICAgIC8vIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkID0gMTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoX3NwYWNlSUQ9PTUpIC8vbGFuZGVkIG9uIHNvbWUgbG9zc2VzIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNSw2LDIsNywzLDQsOCw5XTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleD10aGlzLmdldFJhbmRvbSgwLDEwKTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSA5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoX3NwYWNlSUQ9PTMpIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDcsMyw4LDEzLDksMSwyLDQsNV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCwxMCk7XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gNTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxzZSBpZihfc3BhY2VJRD09MSkgLy9sYW5kZWQgb24gc29tZSB3aWxkIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNiwxMCwyLDMsNF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw3KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSA0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGE9e1wicmFuZG9tQ2FyZFwiOlJhbmRvbUNhcmQsXCJjb3VudGVyXCI6Um9sbENvdW50ZXJ9OyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpIC8vZm9yIGJvdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGE9e1wicmFuZG9tQ2FyZFwiOlJhbmRvbUNhcmQsXCJjb3VudGVyXCI6Um9sbENvdW50ZXJ9OyAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFuZGVkIG9uIHBheSBkYXkgb3IgZG91YmxlIHBheSBkYXkgYW5kIHdvcmsgaXMgZG9uZSBzbyBjaGFuZ2luZyB0dXJuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBsZXRlQ2FyZFR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENhbGxHYW1lQ29tcGxldGUoX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9pc0JvdD09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD10aGlzLlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Nhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEhNQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEJNTG9jYXRpb25zPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FuQW1vdW50Kz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1DYXNoPShCTUFtb3VudCtCTUxvY2F0aW9ucykqMTUwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgSE1DYXNoPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoSE1BbW91bnQ9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD02MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArNjAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MylcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzI1MDAwKzYwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgVG90YWxBc3NldHM9X2Nhc2grQk1DYXNoK0hNQ2FzaC1sb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxTY29yZT1Ub3RhbEFzc2V0cztcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9dGhpcy5UdXJuTnVtYmVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9PWZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX2Nhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g7XHJcbiAgICAgICAgICAgICAgICB2YXIgSE1BbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBCTUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9dGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYW5BbW91bnQrPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1DYXNoPShCTUFtb3VudCtCTUxvY2F0aW9ucykqMTUwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgSE1DYXNoPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoSE1BbW91bnQ9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD02MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArNjAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MylcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzI1MDAwKzYwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgVG90YWxBc3NldHM9X2Nhc2grQk1DYXNoK0hNQ2FzaC1sb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxTY29yZT1Ub3RhbEFzc2V0czsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKVxyXG4gICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg2LF9kYXRhKTtcclxuICAgfSxcclxuXHJcbiAgIFN5bmNHYW1lT3ZlcihfVUlEKVxyXG4gICB7XHJcbiAgICBcclxuICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAge1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgdmFyIE15RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3Zlcj10cnVlO1xyXG5cclxuICAgICAgICBpZihNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQ9PV9VSUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIDE1MDAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IGxvc2VcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJ1bmZvcnR1bmF0ZWx5IHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCIrXCJcXG5cIisnXFxuJytcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJHYW1lIHdpbGwgYmUgcmVzdGFydGVkIGF1dG9tYXRjYWxseSBhZnRlciAxNSBzZWNvbmRzXCIsXHJcbiAgICAgICAgICAgICAgICAxNTAwMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICAgICAgICB9LCAxNTA2MCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vd2l0aCBib3RcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPXRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgdmFyIE15RGF0YT10aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9VSUQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKE15RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMF0uR2FtZU92ZXI9dHJ1ZTtcclxuXHJcbiAgICAgICAgaWYoTXlEYXRhLlBsYXllclVJRD09X1VJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IHdvblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoOiBcIitNeURhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIDE1MDAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IGxvc2VcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLlRvdGFsU2NvcmUrXCJcXG5cIisnXFxuJytcclxuICAgICAgICAgICAgICAgIFwidW5mb3J0dW5hdGVseSB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiK1wiXFxuXCIrJ1xcbicrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAgICAgMTUwMDBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgfSwgMTUwNjApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgIH0sXHJcblxyXG4gICAgU3RhcnREaWNlUm9sbDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoUm9sbENvdW50ZXI+PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVvdmVyXCIpO1xyXG4gICAgICAgICAgICBpc0dhbWVPdmVyPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGxheWVyY29tcGxldGVkPTA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJjb21wbGV0ZWQ9PXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heD0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQ9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdmFsdWUgPiBtYXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWRJbmQ9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PV92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIHdvbiBieSBwbGF5ZXIgaWQ6IFwiK1Nlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZD0wO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoTWFpblNlc3Npb25EYXRhW2luZGV4XS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHBsYXllcmNvbXBsZXRlZD09dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXg9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFNlbGVjdGVkSW5kPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBTZXNzaW9uRGF0YT10aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3ZhbHVlID4gbWF4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdGVkSW5kPWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heD1fdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIitTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtc1xyXG4gICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERpY2VUZW1wPURpY2VUZW1wKzE7IFxyXG4gICAgICAgICAgICB2YXIgX3RvUG9zPWNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5QbGF5ZXIodGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLF90b1Bvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSYW5kb206ZnVuY3Rpb24obWluLG1heClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICAgIH0sXHJcblxyXG4gICAgVHdlZW5DYW1lcmE6IGZ1bmN0aW9uIChfcG9zLCBpc1pvb20sdGltZSkgeyAgIFxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuQ2FtZXJhTm9kZSlcclxuICAgICAgICAudG8odGltZSwgeyBwb3NpdGlvbjogY2MudjIoX3Bvcy54LCBfcG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZihpc1pvb20pXHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBab29tQ2FtZXJhSW4gKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgaWYodGhpcy5DYW1lcmEuem9vbVJhdGlvPDIpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89dGhpcy5DYW1lcmEuem9vbVJhdGlvKzAuMDM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCAxMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUGF5RGF5Q29uZGl0aW9ucyhfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NilcclxuICAgICAgICAgICAgUGFzc2VkUGF5RGF5PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NylcclxuICAgICAgICAgICAgRG91YmxlUGF5RGF5PXRydWU7XHJcblxyXG4gICAgICAgIF9uZXh0VHVybkRvdWJsZVBheT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgICAgICAgaWYoUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkgJiYgIV9uZXh0VHVybkRvdWJsZVBheSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UsX2lzQm90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZigoRG91YmxlUGF5RGF5KSB8fCAoUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKHRydWUsX2lzQm90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFpvb21DYW1lcmFPdXQgKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLkNhbWVyYS56b29tUmF0aW8+PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz10aGlzLkNhbWVyYS56b29tUmF0aW8tMC4wMztcclxuICAgICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb249Y2MuVmVjMigwLDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTE7XHJcblxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbigwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIWlzR2FtZU92ZXIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vcmVhbCBwbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkgLy9ib3RcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90PT1mYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBUd2VlblBsYXllcjogZnVuY3Rpb24gKE5vZGUsVG9Qb3MpIHtcclxuICAgICAgICBjYy50d2VlbihOb2RlKVxyXG4gICAgICAgIC50bygwLjQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZihEaWNlVGVtcDxEaWNlUm9sbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCFpc0dhbWVPdmVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXk9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vZm9yIGJvdFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheT10cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihSb2xsQ291bnRlcj09MTIpXHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj1Sb2xsQ291bnRlcisyMTsgIFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj1Sb2xsQ291bnRlcisxO1xyXG5cclxuICAgICAgICAgICAgLy9EaWNlVGVtcD1EaWNlVGVtcCsxOyBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coRGljZVRlbXArXCIgXCIrUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX25ld3Bvcz1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcyxmYWxzZSwwLjYpOyAvL3pvb21vdXRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vcnVsZXMgaW1wbG1lbnRhdGlvbiBkdXJpbmcgdHVybiAodHVybiBkZWNpc2lvbnMpXHJcblxyXG4gICAgVG9nZ2xlUGF5RGF5KF9zdDEsX1N0MilcclxuICAgIHtcclxuICAgICAgICBQYXNzZWRQYXlEYXk9X3N0MTtcclxuICAgICAgICBEb3VibGVQYXlEYXk9X1N0MjtcclxuICAgIH0sXHJcblxyXG4gICAgRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKGFtb3VudCxfaW5kZXgsX2xvY2F0aW9uTmFtZSxfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLF9HaXZlbkNhc2ggPSAwLF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICAgICAgaWYgKCFfaXNDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggLSBhbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW19pbmRleF0uTG9jYXRpb25zTmFtZS5wdXNoKF9sb2NhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZXhwYW5kZWQgeW91ciBidXNpbmVzcy5cIiwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoIHRvIGV4cGFuZCB0aGlzIGJ1c2luZXNzLCBjYXNoIG5lZWRlZCAkIFwiICsgYW1vdW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChfR2l2ZW5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9HaXZlbkNhc2ggPSBfR2l2ZW5DYXNoIC0gYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUucHVzaChfbG9jYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIiArIGFtb3VudCArIFwiLCBDYXNoIEdpdmVuICRcIiArIF9HaXZlbkNhc2gpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgbG9jYXRpb25zXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSxfR2l2ZW5DYXNoID0gMCxfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHBhcnNlSW50KHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NUeXBlKT09MikgLy90aGlzIG1lYW5zIHRoZXJlIGlzIGJyaWNrIGFuZCBtb3J0YXIgaW4gbGlzdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlNldEJ1c2luZXNzSW5kZXgoaSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0Q2FyZEZ1bmN0aW9uYWxpdHkoX2lzQ2FyZEZ1bmN0aW9uYWxpdHkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlNldEdpdmVuQ2FzaChfR2l2ZW5DYXNoKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5TZXRTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2goX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuUmVzZXRFZGl0Qm94KCk7XHJcbiAgICAgICAgICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coQnVzaW5lc3NMb2NhdGlvbk5vZGVzKTtcclxuICAgICAgICByZXR1cm4gQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDtcclxuICAgIH0sXHJcblxyXG4gICAgRGVzdHJveUdlbmVyYXRlZE5vZGVzKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbihfbmFtZSxfU2hhcmVBbW91bnQsX2lzQWRkaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9pc0FkZGluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfc3RvY2s9bmV3IFN0b2NrSW5mbygpO1xyXG4gICAgICAgICAgICBfc3RvY2suQnVzaW5lc3NOYW1lPV9uYW1lO1xyXG4gICAgICAgICAgICBfc3RvY2suU2hhcmVBbW91bnQ9X1NoYXJlQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZTdG9ja3MucHVzaChfc3RvY2spO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oX2lzRG91YmxlUGF5RGF5PWZhbHNlLF9pc0JvdD1mYWxzZSxfZm9yU2VsZWN0ZWRCdXNpbmVzcz1mYWxzZSxfU2VsZWN0ZWRCdXNpbmVzc0luZGV4PTAsSEJBbW91bnQ9MCxCTUFtb3VudD0wLEJNTG9jYXRpb25zPTApXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKF9mb3JTZWxlY3RlZEJ1c2luZXNzKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGl0bGUgPSBcIlBheURheVwiO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLGZhbHNlLCBmYWxzZSwgZmFsc2UsIF9pc0JvdCxfZm9yU2VsZWN0ZWRCdXNpbmVzcyxfU2VsZWN0ZWRCdXNpbmVzc0luZGV4LEhCQW1vdW50LEJNQW1vdW50LEJNTG9jYXRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIF9za2lwTmV4dFBheWRheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheTtcclxuICAgICAgICAgICAgX3NraXBITU5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEhNTmV4dFBheWRheTtcclxuICAgICAgICAgICAgX3NraXBCTU5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfc2tpcE5leHRQYXlkYXkpIC8vaWYgcHJldmlvdXNseSBza2lwIHBheWRheSB3YXMgc3RvcmVkIGJ5IGFueSBjYXJkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFfaXNCb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgUGF5RGF5LlwiLCAxNjAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNjUwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyBQYXlEYXkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RpdGxlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2lzRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgICAgIF90aXRsZSA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgX3RpdGxlID0gXCJQYXlEYXlcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBfaXNEb3VibGVQYXlEYXksIF9za2lwSE1OZXh0UGF5ZGF5LCBfc2tpcEJNTmV4dFBheWRheSwgX2lzQm90KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQmFua3J1cHRfVHVybkRlY2lzaW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCYW5rcnVwdD10cnVlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCs9MTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsZmFsc2UsdGhpcy5TZWxlY3RlZE1vZGUsdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQsdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50LF91SUQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IENhc2g6IF9hbW91bnQsIElEOiBfdUlEIH0gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEzLCBfZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9hbW91bnQgPSBfZGF0YS5EYXRhLkNhc2g7XHJcbiAgICAgICAgICAgIHZhciBfaUQ9X2RhdGEuRGF0YS5JRDtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uUGxheWVyVUlEID09IF9pRCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5pc0dhbWVGaW5pc2hlZCA9PSB0cnVlKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlRvdGFsU2NvcmUrPV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHJlY2VpdmVkIHByb2ZpdCBvZiAkXCIgKyBfYW1vdW50ICsgXCIgZnJvbSB5b3VyIHBhcnRuZXIuXCIsMjgwMCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuLy8jZW5kcmVnaW9uXHJcbiAgIFxyXG4gICAgLy8jcmVnaW9uIENhcmRzIFJ1bGVzXHJcbiAgICBUb2dnbGVEb3VibGVQYXlOZXh0VHVybihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk9X25leHRUdXJuRG91YmxlUGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwTmV4dFR1cm4oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm49X3NraXBOZXh0VHVybjtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBOZXh0UGF5ZGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk9X3NraXBOZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5PV9za2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcEJNTmV4dFBheWRheT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk9X3NraXBCTU5leHRQYXlkYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVR1cm5Qcm9ncmVzcyhfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgVHVybkluUHJvZ3Jlc3M9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXR1cm5UdXJuUHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBUdXJuSW5Qcm9ncmVzcztcclxuICAgIH0sXHJcblxyXG4gICAgTG9zZUFsbE1hcmtldGluZ01vbmV5KClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2xvc2VBbW91bnQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2xvc2VBbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfbG9zZUFtb3VudD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9sb3NlQW1vdW50XHJcbiAgICB9LFxyXG5cclxuICAgIE11bHRpcGx5TWFya2V0aW5nTW9uZXkoX211bHRpcGxpZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9hbW91bnRJbmNyZWFzZWQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudEluY3JlYXNlZD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50Kj1fbXVsdGlwbGllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudEluY3JlYXNlZD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9hbW91bnRJbmNyZWFzZWRcclxuICAgIH0sXHJcblxyXG4gICAgR2V0TWFya2V0aW5nTW9uZXkoX3Byb2ZpdClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2Ftb3VudD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcHJvZml0PShfcHJvZml0LzEwMCk7XHJcbiAgICAgICAgICAgIF9hbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCo9X3Byb2ZpdDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCs9X2Ftb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9hbW91bnRcclxuICAgIH0sXHJcblxyXG4gICAgUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24oX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF91c2VySUQ9X2RhdGEuVXNlcklEO1xyXG4gICAgICAgIHZhciBfcXVlc3Rpb25JbmRleD1fZGF0YS5RdWVzdGlvbjtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PV9kYXRhLlVzZXJJbmRleDtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihfdXNlcklEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIklEIG1hdGNoZWRcIik7XHJcblxyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgT25lUXVlc3Rpb25JbmRleD1fcXVlc3Rpb25JbmRleDtcclxuICAgICAgICAgICAgdmFyIF9xdWVzdGlvbkFza2VkPU9uZVF1ZXN0aW9uc1tfcXVlc3Rpb25JbmRleC0xXTtcclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9xdWVzdGlvbkFza2VkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uKF9pc1R1cm5PdmVyPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbXlEYXRhO1xyXG4gICAgICAgIHZhciBfcm9vbURhdGE7XHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jvb21EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgICAgICAgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9teURhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgICAgICAgX3Jvb21EYXRhPXRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsX3Jvb21EYXRhLF9pc1R1cm5PdmVyLHRoaXMuU2VsZWN0ZWRNb2RlKVxyXG4gICAgXHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uRGVjaXNpb25fUGF5QW1vdW50X09uZVF1ZXN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgaWYoX215RGF0YS5DYXNoPj01MDAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihfbXlEYXRhLlBsYXllclVJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2gtPTUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBwYWlkIGNhc2ggYW1vdW50IHRvIHBsYXllci5cIiwxMjAwKTtcclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKHRydWUsZmFsc2UsLTEsX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvbl9BbnN3ZXJRdWVzdGlvbl9PbmVRdWVzdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9teURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBhbnN3ZXJlZCB0aGUgcXVlc3Rpb24uXCIsMTIwMCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsdHJ1ZSxPbmVRdWVzdGlvbkluZGV4LF9teURhdGEuUGxheWVyVUlEKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9oYXNEb25lUGF5bWVudCxfaGFzQW5zd2VyZWRRdWVzdGlvbixfcXVlc3Rpb25JbmRleCxfVXNlcklEKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZGF0YT17UGF5bWVudERvbmU6X2hhc0RvbmVQYXltZW50LFF1ZXN0aW9uQW5zd2VyZWQ6X2hhc0Fuc3dlcmVkUXVlc3Rpb24sUXVlc3Rpb25JbmRleDpfcXVlc3Rpb25JbmRleCxJRDpfVXNlcklEfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDgsX2RhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfZGF0YSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfaGFzRG9uZVBheW1lbnQ9X2RhdGEuUGF5bWVudERvbmU7XHJcbiAgICAgICAgICAgIHZhciBfaGFzQW5zd2VyZWRRdWVzdGlvbj1fZGF0YS5RdWVzdGlvbkFuc3dlcmVkO1xyXG4gICAgICAgICAgICB2YXIgX3F1ZXN0aW9uSW5kZXg9X2RhdGEuUXVlc3Rpb25JbmRleDtcclxuICAgICAgICAgICAgdmFyIF91SUQ9X2RhdGEuSUQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihfaGFzRG9uZVBheW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCs9NTAwMDtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIHJlZnVzZWQgdG8gYW5zd2VyIHRoZSBxdWVzdGlvbiBpbnN0ZWFkIHBheWVkIHRoZSBjYXNoIGFtb3VudCwgJDUwMDAgYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKF9oYXNBbnN3ZXJlZFF1ZXN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3NlbGVjdGVkUGxheWVySW5kZXg9MDtcclxuICAgICAgICAgICAgICAgIHZhciBfYWN0b3JzRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF91SUQ9PV9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZFBsYXllckluZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoX3F1ZXN0aW9uSW5kZXg9PTEpLy9oYXZlIHlvdSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihfcXVlc3Rpb25JbmRleD09MikvL0hhdmUgeW91IHRha2VuIGFueSBsb2FuP1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9sb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSB0YWtlbiBzb21lIGxvYW5cIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHRha2VuIGFueSBsb2FuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTMpLy9BcmUgeW91IGJhbmtydXB0ZWQ/IGlmIG1vcmUgdGhhbiBvbmNlLCB0ZWxsIG1lIHRoZSBhbW91bnQ/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuSXNCYW5rcnVwdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZCBcIitfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5CYW5rcnVwdEFtb3VudCtcIiB0aW1lL2VzLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTQpLy9JcyB5b3VyIHR1cm4gZ29pbmcgdG8gYmUgc2tpcHBlZCBuZXh0IHRpbWU/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBiZSBza2lwcGVkLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIG5vdCBiZSBza2lwcGVkLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTUpLy9JcyBpdCBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSB5b3VyIG5leHQgcGF5ZGF5P1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIGJlIGRvdWJsZSBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIG5vdCBiZSBkb3VibGUgcGF5ZGF5XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjE1MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZihJc1R3ZWVuaW5nPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfc3BhY2VzPV9kYXRhLkRhdGEuYmFja3NwYWNlcztcclxuICAgICAgICAgICAgdmFyIF9jb3VudGVyPV9kYXRhLkRhdGEuQ291bnRlcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2NvdW50ZXIrQmFja3NwYWNlc10uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zLDAuMSk7XHJcblxyXG4gICAgICAgICAgICBSb2xsQ291bnRlcj1fY291bnRlcjtcclxuICAgICAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuUGxheWVyX0dvQmFja1NwYWNlczogZnVuY3Rpb24gKE5vZGUsVG9Qb3Msc3BlZWQ9MC42KSB7XHJcbiAgICAgICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgICAudG8oc3BlZWQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBSb2xsQ291bnRlci09QmFja3NwYWNlcztcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfZGF0YT17RGF0YTp7YmFja3NwYWNlczpCYWNrc3BhY2VzLENvdW50ZXI6Um9sbENvdW50ZXJ9fTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMCxfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbn0pO1xyXG4vL21vZHVsZS5leHBvcnRzICA9IFBsYXllckRhdGE7IC8vd2hlbiBpbXBvcnRzIGluIGFub3RoZXIgc2NyaXB0IG9ubHkgcmVmZXJlbmNlIG9mIHBsYXllcmRhdGEgY2xhc3Mgd291bGQgYmUgYWJsZSB0byBhY2Nlc3NlZCBmcm9tIEdhbWVtYW5hZ2VyIGltcG9ydFxyXG5tb2R1bGUuZXhwb3J0cyAgPSBHYW1lTWFuYWdlcjtcclxuLy8jZW5kcmVnaW9uIl19