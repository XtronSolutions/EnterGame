
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
var _diceinput2 = ""; //#region superclasses and enumerations
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
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().CloseInitialScreen_SpectateMode();

    for (var index = 0; index < this.PlayerGameInfo.length; index++) {
      var _toPos = cc.Vec2(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.x, GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.PlayerGameInfo[index].PlayerRollCounter].ReferenceLocation.position.y);

      this.AllPlayerNodes[index].setPosition(_toPos.x, _toPos.y);
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

  /**
  @summary called from raise on event (from function "StartTurn" and "ChangeTurn" of this same class) to handle turn
  @method TurnHandler
  @param {string} none
  @returns {boolean} no return
  **/
  TurnHandler: function TurnHandler(_turn) {
    var _this2 = this;

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
    }
  },
  UpdateGameUI: function UpdateGameUI(_toggleHighlight, _index) {
    if (_toggleHighlight) {
      this.AllPlayerUI[_index].getComponent('PlayerProfileManager').PlayerInfo = this.PlayerGameInfo[_index];

      for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers; index++) {
        if (_index == index) {
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleBGHighlighter(true);
          this.AllPlayerUI[index].getComponent('PlayerProfileManager').ToggleTextighlighter(true);
        } else {
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
      if (this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[0].BusinessType == 1) {
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
      } else {
        this.AllPlayerUI[_index4].getComponent("PlayerProfileManager").DiceRollScreen.active = false;
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
    return Dice1;
  },
  RollTwoDices: function RollTwoDices() {
    var Dice1 = this.getRandom(1, 7);
    var Dice2 = this.getRandom(1, 7);
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
            var valueIndex = [0, 1, 7, 10, 2, 3, 4, 5, 6, 8];
            var index = this.getRandom(0, 10);
            RandomCard = valueIndex[index]; //RandomCard = 8;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIkVudW1CdXNpbmVzc1R5cGUiLCJjYyIsIkVudW0iLCJOb25lIiwiSG9tZUJhc2VkIiwiYnJpY2tBbmRtb3J0YXIiLCJCdXNpbmVzc0luZm8iLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiTmFtZSIsIkJ1c2luZXNzVHlwZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIlRleHQiLCJCdXNpbmVzc05hbWUiLCJBbW91bnQiLCJJbnRlZ2VyIiwiSXNQYXJ0bmVyc2hpcCIsInR5cHciLCJCb29sZWFuIiwiUGFydG5lcklEIiwiUGFydG5lck5hbWUiLCJMb2NhdGlvbnNOYW1lIiwiTG9hblRha2VuIiwiTG9hbkFtb3VudCIsImN0b3IiLCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHkiLCJOZXh0VHVybkRvdWJsZVBheSIsIlNraXBOZXh0VHVybiIsIlNraXBOZXh0UGF5ZGF5IiwiU2tpcEhNTmV4dFBheWRheSIsIlNraXBCTU5leHRQYXlkYXkiLCJTdG9ja0luZm8iLCJTaGFyZUFtb3VudCIsIlBsYXllckRhdGEiLCJQbGF5ZXJOYW1lIiwiUGxheWVyVUlEIiwiQXZhdGFySUQiLCJJc0JvdCIsIk5vT2ZCdXNpbmVzcyIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiSG9tZUJhc2VkQW1vdW50IiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIk5vT2ZTdG9ja3MiLCJDYXNoIiwiR29sZENvdW50IiwiU3RvY2tDb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkxhd3llclN0YXR1cyIsIklzQmFua3J1cHQiLCJCYW5rcnVwdEFtb3VudCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBsYXllclJvbGxDb3VudGVyIiwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZCIsImlzR2FtZUZpbmlzaGVkIiwiVG90YWxTY29yZSIsIkdhbWVPdmVyIiwiUm9sbENvdW50ZXIiLCJEaWNlVGVtcCIsIkRpY2VSb2xsIiwiSXNUd2VlbmluZyIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlR1cm5DaGVja0FycmF5IiwiQnVzaW5lc3NMb2NhdGlvbk5vZGVzIiwiUGFzc2VkUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiX25leHRUdXJuRG91YmxlUGF5IiwiX3NraXBOZXh0VHVybiIsIl9za2lwTmV4dFBheWRheSIsIl9za2lwSE1OZXh0UGF5ZGF5IiwiX3NraXBCTU5leHRQYXlkYXkiLCJDYXJkRXZlbnRSZWNlaXZlZCIsIlR1cm5JblByb2dyZXNzIiwiQmFja3NwYWNlcyIsImlzR2FtZU92ZXIiLCJPbmVRdWVzdGlvbkluZGV4IiwiT25lUXVlc3Rpb25zIiwiQ2FyZERpc3BsYXlTZXRUaW1vdXQiLCJHYW1lTWFuYWdlciIsIkNvbXBvbmVudCIsIlBsYXllckdhbWVJbmZvIiwiQm90R2FtZUluZm8iLCJQbGF5ZXJOb2RlIiwiTm9kZSIsIkNhbWVyYU5vZGUiLCJBbGxQbGF5ZXJVSSIsIkFsbFBsYXllck5vZGVzIiwiU3RhcnRMb2NhdGlvbk5vZGVzIiwiU2VsZWN0ZWRNb2RlIiwic3RhdGljcyIsIkluc3RhbmNlIiwiSW5wdXRUZXN0RGljZTEiLCJfdmFsIiwiSW5wdXRUZXN0RGljZTIiLCJvbkxvYWQiLCJUdXJuTnVtYmVyIiwiVHVybkNvbXBsZXRlZCIsIkNoZWNrUmVmZXJlbmNlcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRTZWxlY3RlZE1vZGUiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsImNvbnNvbGUiLCJlcnJvciIsIkNoZWNrU3BlY3RhdGUiLCJsb2ciLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIkFsbERhdGEiLCJNYXhQbGF5ZXJzIiwibGVuZ3RoIiwiU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyIiwiVXBkYXRlR2FtZVVJIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJHZXRUdXJuTnVtYmVyIiwiR2V0TXlJbmRleCIsIm15SW5kZXgiLCJfYWN0b3IiLCJQaG90b25BY3RvciIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9hbGxBY3RvcnMiLCJpbmRleCIsIlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyIsIkFzc2lnblBsYXllckdhbWVVSSIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJfdG9Qb3MiLCJWZWMyIiwiR2V0X1NwYWNlTWFuYWdlciIsIkRhdGEiLCJSZWZlcmVuY2VMb2NhdGlvbiIsInBvc2l0aW9uIiwieCIsInkiLCJzZXRQb3NpdGlvbiIsImFjdGl2ZSIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJUb3RhbENvbm5lY3RlZFBsYXllcnMiLCJteVJvb21BY3RvckNvdW50IiwidXNlcklEIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDaGFuZ2VUdXJuIiwiUmFpc2VFdmVudEZvckNhcmQiLCJfZGF0YSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiUmFpc2VFdmVudCIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJEaXNwbGF5Q2FyZE9uT3RoZXJzIiwiT25MYW5kZWRPblNwYWNlIiwic2V0VGltZW91dCIsIlJlc2V0Q2FyZERpc3BsYXkiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiUmFuZG9tQ2FyZCIsInJhbmRvbUNhcmQiLCJjb3VudGVyIiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIlN5bmNBbGxEYXRhIiwiUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlIiwiX3VpZCIsInB1c2giLCJBcnJheUxlbmd0aCIsIklERm91bmQiLCJUdXJuSGFuZGxlciIsIl90dXJuIiwiX3BsYXllck1hdGNoZWQiLCJUb2dnbGVUdXJuUHJvZ3Jlc3MiLCJUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24iLCJSZXNldFR1cm5WYXJpYWJsZSIsIlJvbGxEaWNlIiwiRGljZVJvbGxTY3JlZW4iLCJQbGF5ZXJJbmZvIiwiUm9vbUFjdG9ycyIsIlNob3dUb2FzdCIsIlRvZ2dsZVNraXBOZXh0VHVybiIsIl9pbmQiLCJNYWluU2Vzc2lvbkRhdGEiLCJNeURhdGEiLCJfY291bnRlciIsIlN0YXJ0VHVybiIsIkVuYWJsZVBsYXllck5vZGVzIiwiUmVjZWl2ZUJhbmtydXB0RGF0YSIsIl9pc0JhbmtydXB0ZWQiLCJiYW5rcnVwdGVkIiwidHVybiIsIl9wbGF5ZXJEYXRhIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiX3JhbmRvbUluZGV4IiwiZ2V0UmFuZG9tIiwiU2V0TmFtZSIsIl90b2dnbGVIaWdobGlnaHQiLCJfaW5kZXgiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzIiwidGFyZ2V0UG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicGFyZW50IiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJyYXRpbyIsIndpblNpemUiLCJoZWlnaHQiLCJ6b29tUmF0aW8iLCJsYXRlVXBkYXRlIiwic3luY0RpY2VSb2xsIiwiX3JvbGwiLCJfZGljZTEiLCJkaWNlMSIsIl9kaWNlMiIsImRpY2UyIiwiX3Jlc3VsdCIsIm15Um9vbUFjdG9yc0FycmF5IiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwiQW5pbWF0ZURpY2UiLCJEaWNlRnVudGlvbmFsaXR5IiwiX3BvcyIsIlR3ZWVuQ2FtZXJhIiwiVGVtcENoZWNrU3BhY2UiLCJfcm9sbGluZyIsInRlbXBjb3VudGVyIiwidGVtcGNvdW50ZXIyIiwiZGljZXRvYmUiLCJwYXJzZUludCIsIlNwYWNlRGF0YSIsIlNwYWNlc1R5cGUiLCJEaWNlMSIsIkRpY2UyIiwiX25ld1JvbGwiLCJSb2xsT25lRGljZSIsIlJvbGxUd29EaWNlcyIsImNhbGxVcG9uQ2FyZCIsIl9zcGFjZUlEIiwidmFsdWVJbmRleCIsIlNlbmRpbmdEYXRhIiwiY29tcGxldGVDYXJkVHVybiIsIkNhbGxHYW1lQ29tcGxldGUiLCJfaXNCb3QiLCJfcGxheWVySW5kZXgiLCJfY2FzaCIsIkhNQW1vdW50IiwiR2V0X0dhbWVNYW5hZ2VyIiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsImxvYW5BbW91bnQiLCJCTUNhc2giLCJITUNhc2giLCJUb3RhbEFzc2V0cyIsIlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUiLCJTeW5jR2FtZU92ZXIiLCJfVUlEIiwiUmVzdGFydEdhbWUiLCJTdGFydERpY2VSb2xsIiwiWm9vbUNhbWVyYU91dCIsInBsYXllcmNvbXBsZXRlZCIsIm1heCIsIlNlbGVjdGVkSW5kIiwiU2Vzc2lvbkRhdGEiLCJfdmFsdWUiLCJUd2VlblBsYXllciIsIm1pbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImlzWm9vbSIsInRpbWUiLCJ0d2VlbiIsInRvIiwidjIiLCJlYXNpbmciLCJjYWxsIiwiWm9vbUNhbWVyYUluIiwic3RhcnQiLCJDaGVja1BheURheUNvbmRpdGlvbnMiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIlRvZ2dsZVBheURheSIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIiwiVG9Qb3MiLCJfbmV3cG9zIiwiX3N0MSIsIl9TdDIiLCJFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iLCJhbW91bnQiLCJfbG9jYXRpb25OYW1lIiwiX2lzQ2FyZEZ1bmN0aW9uYWxpdHkiLCJfR2l2ZW5DYXNoIiwiX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCIsIk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uIiwiR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbiIsImkiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQiLCJTZXRCdXNpbmVzc0luZGV4IiwiU2V0Q2FyZEZ1bmN0aW9uYWxpdHkiLCJTZXRHaXZlbkNhc2giLCJTZXRTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2giLCJSZXNldEVkaXRCb3giLCJEZXN0cm95R2VuZXJhdGVkTm9kZXMiLCJkZXN0cm95IiwiVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiX1NoYXJlQW1vdW50IiwiX2lzQWRkaW5nIiwiX3N0b2NrIiwiX2lzRG91YmxlUGF5RGF5IiwiX2ZvclNlbGVjdGVkQnVzaW5lc3MiLCJfU2VsZWN0ZWRCdXNpbmVzc0luZGV4IiwiSEJBbW91bnQiLCJfdGl0bGUiLCJBc3NpZ25EYXRhX1BheURheSIsIlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUiLCJCYW5rcnVwdF9UdXJuRGVjaXNpb24iLCJTZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiX2Ftb3VudCIsIl91SUQiLCJJRCIsIlJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJfaUQiLCJfbXlJbmRleCIsIl9zdGF0ZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlJldHVyblR1cm5Qcm9ncmVzcyIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9sb3NlQW1vdW50IiwiTXVsdGlwbHlNYXJrZXRpbmdNb25leSIsIl9tdWx0aXBsaWVyIiwiX2Ftb3VudEluY3JlYXNlZCIsIkdldE1hcmtldGluZ01vbmV5IiwiX3Byb2ZpdCIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiX3VzZXJJRCIsIlVzZXJJRCIsIl9xdWVzdGlvbkluZGV4IiwiUXVlc3Rpb24iLCJVc2VySW5kZXgiLCJfZ2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfcXVlc3Rpb25Bc2tlZCIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJfaXNUdXJuT3ZlciIsIl9teURhdGEiLCJfcm9vbURhdGEiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9QYXlBbW91bnRfT25lUXVlc3Rpb24iLCJSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJPbmVRdWVzdGlvbkRlY2lzaW9uX0Fuc3dlclF1ZXN0aW9uX09uZVF1ZXN0aW9uIiwiX2hhc0RvbmVQYXltZW50IiwiX2hhc0Fuc3dlcmVkUXVlc3Rpb24iLCJfVXNlcklEIiwiUGF5bWVudERvbmUiLCJRdWVzdGlvbkFuc3dlcmVkIiwiUXVlc3Rpb25JbmRleCIsIlJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfc2VsZWN0ZWRQbGF5ZXJJbmRleCIsIl9hY3RvcnNEYXRhIiwiX2xvYW5UYWtlbiIsIlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eSIsIl9zcGFjZXMiLCJiYWNrc3BhY2VzIiwiQ291bnRlciIsIlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyIsInNwZWVkIiwiR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHLEtBQWQ7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEIsRUFFQTtBQUNBOztBQUNBLElBQUlDLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUMzQkMsRUFBQUEsSUFBSSxFQUFDLENBRHNCO0FBRTNCQyxFQUFBQSxTQUFTLEVBQUUsQ0FGZ0I7QUFFSztBQUNoQ0MsRUFBQUEsY0FBYyxFQUFFLENBSFcsQ0FHSzs7QUFITCxDQUFSLENBQXZCLEVBTUE7O0FBQ0EsSUFBSUMsWUFBWSxHQUFHTCxFQUFFLENBQUNNLEtBQUgsQ0FBUztBQUN4QkMsRUFBQUEsSUFBSSxFQUFFLGNBRGtCO0FBRTVCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFFLGNBREU7QUFFUkMsSUFBQUEsWUFBWSxFQUNiO0FBQ0lDLE1BQUFBLFdBQVcsRUFBQyxNQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUViLGdCQUZWO0FBR0ksaUJBQVNBLGdCQUFnQixDQUFDRyxJQUg5QjtBQUlJVyxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0FIUztBQVNSQyxJQUFBQSx1QkFBdUIsRUFDeEI7QUFDSUosTUFBQUEsV0FBVyxFQUFFLE1BRGpCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGYjtBQUdJLGlCQUFTLEVBSGI7QUFJSUgsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBVlM7QUFnQlJHLElBQUFBLFlBQVksRUFDYjtBQUNJTixNQUFBQSxXQUFXLEVBQUUsTUFEakI7QUFFSUMsTUFBQUEs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RW1GLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dDLENBQTFHLEVBQTRHakYsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ2dELGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERsRixXQUExRCxFQUF1RW1GLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dFLENBQTlNLENBQVg7O0FBQ0EsU0FBSzZPLHdCQUFMLENBQThCLEtBQUt0UyxjQUFMLENBQW9CLEtBQUtTLFVBQXpCLENBQTlCLEVBQW1FeUMsTUFBbkU7QUFDQSxTQUFLK0csZ0JBQUw7QUFDSCxHQWh6RG9CLENBbXpEckI7QUFDQTs7QUFwekRxQixDQUFULENBQWhCLEVBc3pEQTs7QUFDQXdJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFrQmxULFdBQWxCLEVBQ0EiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfaXNUZXN0ID0gZmFsc2U7XHJcbnZhciBfZGljZWlucHV0MSA9IFwiXCI7XHJcbnZhciBfZGljZWlucHV0MiA9IFwiXCI7XHJcblxyXG4vLyNyZWdpb24gc3VwZXJjbGFzc2VzIGFuZCBlbnVtZXJhdGlvbnNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIHR5cGUgb2YgYnVzaW5lc3MtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEVudW1CdXNpbmVzc1R5cGUgPSBjYy5FbnVtKHtcclxuICAgIE5vbmU6MCxcclxuICAgIEhvbWVCYXNlZDogMSwgICAgICAgICAgICAgICAgICAgLy9hIGJ1c2luZXNzIHRoYXQgeW91IG9wZXJhdGUgb3V0IG9mIHlvdXIgaG9tZVxyXG4gICAgYnJpY2tBbmRtb3J0YXI6IDIgICAgICAgICAgICAgICAvL2Egc3RvcmUgZnJvbnQgYnVzaW5lc3NcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3NJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIkJ1c2luZXNzSW5mb1wiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgTmFtZTogXCJCdXNpbmVzc0RhdGFcIixcclxuICAgIEJ1c2luZXNzVHlwZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJNb2RlXCIsXHJcbiAgICAgICB0eXBlOiBFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgICAgZGVmYXVsdDogRW51bUJ1c2luZXNzVHlwZS5Ob25lLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIkJ1c2luZXNzIGNhdG9nb3J5IGZvciBwbGF5ZXJzXCIsfSwgXHJcbiAgICBCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbjpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOiBcIlR5cGUgKGJ5IG5hbWUpIG9mIGJ1c2luZXNzIHBsYXllciBpcyBvcGVuaW5nXCIsfSxcclxuICAgIEJ1c2luZXNzTmFtZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOiBcIk5hbWUgb2YgdGhlIGJ1c2luZXNzIHBsYXllciBpcyBvcGVuaW5nXCIsfSxcclxuICAgICBBbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQW1vdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiYmFsYW5jZSBvZiBidXNpbmVzc1wiLH0sXHJcbiAgICAgIElzUGFydG5lcnNoaXA6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNQYXJ0bmVyc2hpcFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cHc6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGRvbmUgcGFydG5lcnNoaXAgd2l0aCBzb21lb25lIHdpdGggY3VycmVudCBidXNpbmVzc1wiLH0sXHJcbiAgICAgICBQYXJ0bmVySUQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlBhcnRuZXJJRFwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgdG9vbHRpcDogXCJJRCBvZiB0aGUgcGFydG5lciB3aXRoIHdob20gcGxheWVyIGhhcyBmb3JtZWQgcGFydG5lcnNoaXBcIix9LFxyXG4gICAgICAgUGFydG5lck5hbWU6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlBhcnRuZXJOYW1lXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgdG9vbHRpcDpcIm5hbWUgb2YgdGhlIHBhcnRuZXIgd2l0aCB3aG9tIHBsYXllciBoYXMgZm9ybWVkIHBhcnRuZXJzaGlwXCIsfSxcclxuICAgICAgICBMb2NhdGlvbnNOYW1lOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2NhdGlvbnNOYW1lXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IFtjYy5UZXh0XSxcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgdG9vbHRpcDpcImlmIHBsYXllciBvd25zIGJyaWNrIGFuZCBtb3J0YXIgaGUvc2hlIGNhbiBleHBhbmQgdG8gbmV3IGxvY2F0aW9uXCIsfSxcclxuICAgICAgICBMb2FuVGFrZW46XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5UYWtlblwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgICAgTG9hbkFtb3VudDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hbkFtb3VudFwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuXHJcbn0sXHJcblxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBDYXJkRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQ2FyZERhdGFGdW5jdGlvbmFsaXR5ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHlcIixcclxucHJvcGVydGllczogeyBcclxuICAgIE5leHRUdXJuRG91YmxlUGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk5leHRUdXJuRG91YmxlUGF5XCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiBpdHMgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxuICAgIFNraXBOZXh0VHVybjpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwTmV4dFR1cm5cIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHR1cm4gaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHR1cm4gZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxuICAgIFNraXBOZXh0UGF5ZGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBOZXh0UGF5ZGF5XCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiBwYXlkYXkgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG4gICAgU2tpcEhNTmV4dFBheWRheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwSE1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGhvbWUgYmFzZWQgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LFxyXG4gICAgU2tpcEJNTmV4dFBheWRheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwQk1OZXh0UGF5ZGF5XCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiBwYXlkYXkgZm9yIGJyaWNrYSBhbmQgbW1vcnRhciBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTdG9ja0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFN0b2NrSW5mbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiU3RvY2tJbmZvXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOYW1lOiBcIlN0b2NrRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzTmFtZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibmFtZSBvZiB0aGUgYnVzaW5lc3MgaW4gd2hpY2ggc3RvY2tzIHdpbGwgYmUgaGVsZFwiLH0sIFxyXG4gICAgU2hhcmVBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOiBcIlNoYXJlQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiU2hhcmUgYW1vdW50IG9mIHRoZSBzdG9ja1wiLH0sXHJcbn0sXHJcblxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciAgUGxheWVyIERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBsYXllckRhdGEgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiUGxheWVyRGF0YVwiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgUGxheWVyTmFtZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJuYW1lIG9mIHRoZSBwbGF5ZXJcIix9LFxyXG4gICAgUGxheWVyVUlEOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllclVJRFwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiSUQgb2YgdGhlIHBsYXllclwiLH0sXHJcbiAgICBBdmF0YXJJRDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBdmF0YXJJRFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImlkIHJlZmVyZW5jZSBmb3IgcGxheWVyIGF2YXRhciBzZWxlY3Rpb25cIix9LFxyXG4gICAgSXNCb3Q6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNCb3RcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXB3OmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgY3VycmVudCBwbGF5ZXIgaXMgYm90XCIsfSwgXHJcbiAgICBOb09mQnVzaW5lc3M6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NcIixcclxuICAgICAgIHR5cGU6IFtCdXNpbmVzc0luZm9dLFxyXG4gICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiTnVtYmVyIG9mIGJ1c2luZXNzIGEgcGxheWVyIGNhbiBvd25cIix9LCBcclxuICAgIENhcmRGdW5jdGlvbmFsaXR5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkNhcmRGdW5jdGlvbmFsaXR5XCIsXHJcbiAgICAgICB0eXBlOiBDYXJkRGF0YUZ1bmN0aW9uYWxpdHksXHJcbiAgICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJjYXJkIGZ1bmN0aW9uYWxpdHkgc3RvcmVkIGJ5IHBsYXllclwiLH0sIFxyXG4gICAgSG9tZUJhc2VkQW1vdW50OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkhvbWVCYXNlZEFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibnVtYmVyIG9mIGhvbWUgYmFzZWQgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLH0sIFxyXG4gICAgQnJpY2tBbmRNb3J0YXJBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnJpY2tBbmRNb3J0YXJBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm51bWJlciBvZiBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIix9LCBcclxuICAgIFRvdGFsTG9jYXRpb25zQW1vdW50OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsTG9jYXRpb25zQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJudW1iZXIgb2YgbG9jYXRpb25zIG9mIGFsbCBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzZXNzXCIsfSwgXHJcbiAgICBOb09mU3RvY2tzOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlN0b2Nrc1wiLFxyXG4gICAgICAgdHlwZTogW1N0b2NrSW5mb10sXHJcbiAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJOdW1iZXIgb2Ygc3RvY2sgYSBwbGF5ZXIgb3duc1wiLH0sIFxyXG4gICAgQ2FzaDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQW1vdW50IG9mIGNhc2ggcGxheWVyIG93bnNcIix9LFxyXG4gICAgR29sZENvdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkdvbGRDb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImNvdW50IG9mIGdvbGQgYSBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBTdG9ja0NvdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2NrQ291bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJjb3VudCBvZiBzdG9ja3MgYSBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBMb2FuVGFrZW46XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblRha2VuXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgdGFrZW4gbG9hbiBmcm9tIGJhbmsgb3Igbm90XCIsfSxcclxuICAgICBMb2FuQW1vdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgbG9hbiB0YWtlbiBmcm9tIHRoZSBiYW5rXCIsfSxcclxuICAgIE1hcmtldGluZ0Ftb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJNYXJrZXRpbmdBbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJtYXJrZXRpbmcgYW1vdW50IGEgcGxheWVyIG93bnNcIix9LFxyXG4gICAgTGF3eWVyU3RhdHVzOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkxhd3llclN0YXR1c1wiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGhpcmVkIGEgbGF3eWVyIG9yIG5vdFwiLH0sXHJcbiAgICBJc0JhbmtydXB0OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIklzQmFua3J1cHRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBiZWVuIEJhbmtydXB0ZWQgb3Igbm90XCIsfSxcclxuICAgIEJhbmtydXB0QW1vdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkJhbmtydXB0QW1vdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwia2VlcCB0cmFjayBob3cgbXVjaCB0aW1lIHBsYXllciBoYXMgYmVlbiBiYW5rcnVwdGVkXCIsfSxcclxuICAgIFNraXBwZWRMb2FuUGF5bWVudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJTa2lwcGVkTG9hblBheW1lbnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBza2lwcGVkIGxvYW4gcGF5bWVudFwiLH0sXHJcbiAgICBQbGF5ZXJSb2xsQ291bnRlcjpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJSb2xsQ291bnRlclwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImludGVnZXIgdG8gc3RvcmUgcm9sbCBjb3VudG9yIGZvciBwbGF5ZXJcIix9LFxyXG4gICAgSW5pdGlhbENvdW50ZXJBc3NpZ25lZDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJbml0aWFsQ291bnRlckFzc2lnbmVkXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgIGlzR2FtZUZpbmlzaGVkOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJpc0dhbWVGaW5pc2hlZFwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgVG90YWxTY29yZTpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxTY29yZVwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgIEdhbWVPdmVyOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJHYW1lT3ZlclwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbn0sXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcblxyXG59KTtcclxuLy8jZW5kcmVnaW9uXHJcblxyXG4vLyNyZWdpb24gR2FtZSBNYW5hZ2VyIENsYXNzXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLShtYWluIGNsYXNzKSBjbGFzcyBmb3IgR2FtZSBNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBSb2xsQ291bnRlcj0wO1xyXG52YXIgRGljZVRlbXA9MDtcclxudmFyIERpY2VSb2xsPTA7XHJcbnZhciBJc1R3ZWVuaW5nPWZhbHNlO1xyXG52YXIgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPW51bGw7XHJcbnZhciBUdXJuQ2hlY2tBcnJheT1bXTtcclxudmFyIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuXHJcbnZhciBQYXNzZWRQYXlEYXk9ZmFsc2U7XHJcbnZhciBEb3VibGVQYXlEYXk9ZmFsc2U7XHJcblxyXG4vL2NhcmRzIGZ1bmN0aW9uYWxpdHlcclxudmFyIF9uZXh0VHVybkRvdWJsZVBheT1mYWxzZTtcclxudmFyIF9za2lwTmV4dFR1cm49ZmFsc2U7XHJcbnZhciBfc2tpcE5leHRQYXlkYXk9ZmFsc2U7IC8vc2tpcCB3aG9sZSBwYXkgZGF5XHJcbnZhciBfc2tpcEhNTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgX3NraXBCTU5leHRQYXlkYXk9ZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBDYXJkRXZlbnRSZWNlaXZlZD1mYWxzZTtcclxudmFyIFR1cm5JblByb2dyZXNzPWZhbHNlO1xyXG5cclxudmFyIEJhY2tzcGFjZXM9MztcclxudmFyIGlzR2FtZU92ZXI9ZmFsc2U7XHJcbnZhciBPbmVRdWVzdGlvbkluZGV4PS0xO1xyXG52YXIgT25lUXVlc3Rpb25zPVxyXG5bXHJcbiAgICBcInlvdSBoYXZlIHNraXBwZWQgbG9hbiBwcmV2aW91cyBwYXlkYXk/XCIsXHJcbiAgICBcInlvdSBoYXZlIHRha2VuIGFueSBsb2FuP1wiLFxyXG4gICAgXCJ5b3UgaGF2ZSBiYW5rcnVwdGVkIGV2ZXI/XCIsXHJcbiAgICBcInlvdXIgbmV4dCB0dXJuIGlzIGdvaW5nIHRvIGJlIHNraXBwZWQ/XCIsXHJcbiAgICBcInlvdXIgbmV4dCBwYXlkYXkgaXMgZ29pbmcgdG8gYmUgZG91YmxlIHBheWRheT9cIlxyXG5dO1xyXG5cclxudmFyIENhcmREaXNwbGF5U2V0VGltb3V0PW51bGw7XHJcblxyXG52YXIgR2FtZU1hbmFnZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkdhbWVNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgUGxheWVyR2FtZUluZm86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJhbGwgcGxheWVyJ3MgZGF0YVwifSxcclxuICAgICAgICBCb3RHYW1lSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBib3QncyBkYXRhXCJ9LFxyXG4gICAgICAgIFBsYXllck5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIHBsYXllclwiLH0sICAgIFxyXG4gICAgICAgIENhbWVyYU5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIGNhbWVyYVwiLH0sICAgIFxyXG4gICAgICAgIEFsbFBsYXllclVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIG9mIHVpIG9mIGFsbCBwbGF5ZXJzXCIsfSwgICAgICBcclxuICAgICAgICBBbGxQbGF5ZXJOb2Rlczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBvZiBub2RlIG9mIGFsbCBwbGF5ZXJzIGluc2lkZSBnYW1lcGxheVwiLH0sICAgXHJcbiAgICAgICAgU3RhcnRMb2NhdGlvbk5vZGVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIG9mIGF0dGF5IG9mIGxvY2F0aW9uc1wiLH0sICAgXHJcbiAgICAgICAgIFNlbGVjdGVkTW9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OjAsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciByZWZlcmVuY2UgZm9yIGdhbWUgbW9kZSAxIG1lYW5zIGJvdCBhbmQgMiBtZWFucyByZWFsIHBsYXllcnNcIixcclxuICAgICAgICB9LCAgXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBQbGF5ZXJEYXRhOiBQbGF5ZXJEYXRhLFxyXG4gICAgICAgIEJ1c2luZXNzSW5mbzpCdXNpbmVzc0luZm8sXHJcbiAgICAgICAgRW51bUJ1c2luZXNzVHlwZTpFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgICAgIEluc3RhbmNlOm51bGxcclxuICAgIH0sXHJcblxyXG4gICAgSW5wdXRUZXN0RGljZTEoX3ZhbClcclxuICAgIHtcclxuICAgICAgICBpZiAoX2lzVGVzdCkge1xyXG4gICAgICAgICAgICBfZGljZWlucHV0MSA9IF92YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBJbnB1dFRlc3REaWNlMihfdmFsKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChfaXNUZXN0KSB7XHJcbiAgICAgICAgICAgIF9kaWNlaW5wdXQyID0gX3ZhbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8jcmVnaW9uIEFsbCBGdW5jdGlvbnMgb2YgR2FtZU1hbmFnZXJcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiBjbGFzcyBpcyBjcmVhdGVkXHJcbiAgICBAbWV0aG9kIG9uTG9hZFxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIHRoaXMuVHVybk51bWJlcj0wO1xyXG4gICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD1mYWxzZTtcclxuICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRNb2RlPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICAgICAgdGhpcy5Jbml0X0dhbWVNYW5hZ2VyKCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5SYW5kb21DYXJkSW5kZXg9MDtcclxuICAgICAgICB0aGlzLkNhcmRDb3VudGVyPTA7XHJcbiAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG4gICAgICAgIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcmVmZXJlbmNlIG9mIHJlcXVpcmVkIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGluaXRpYWwgZ2FtZW1hbmFnZXIgZXNzZXRpYWxzXHJcbiAgICBAbWV0aG9kIEluaXRfR2FtZU1hbmFnZXJcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEluaXRfR2FtZU1hbmFnZXIgKCkge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhPXRoaXMuQ2FtZXJhTm9kZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKTtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz1mYWxzZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvPVtdO1xyXG4gICAgICAgIFJvbGxDb3VudGVyPTA7XHJcbiAgICAgICAgRGljZVRlbXA9MDtcclxuICAgICAgICBEaWNlUm9sbD0wOyAgXHJcblxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKSAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9pZiBqb2luZWQgcGxheWVyIGlzIHNwZWN0YXRlXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpPT10cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1cyBvZiBpbml0aWFsIGJ1c2luZXNzIHNldHA6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIikpO1xyXG4gICAgICAgICAgICAgICAgLy9pZiBpbml0YWwgc2V0dXAgaGFzIGJlZW4gZG9uZSBhbmQgZ2FtZSBpcyB1bmRlciB3YXlcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIik9PXRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgQWxsRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1BbGxEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzPXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsZmFsc2UsdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgYm90IGFsb25nIHdpdGggb25lIHBsYXllclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLGZhbHNlLHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vI3JlZ2lvbiBwdWJsaWMgZnVuY3Rpb25zIHRvIGdldCBkYXRhIChhY2Nlc3NpYmxlIGZyb20gb3RoZXIgY2xhc3NlcylcclxuICAgIEdldFR1cm5OdW1iZXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlR1cm5OdW1iZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIEdldE15SW5kZXgoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBteUluZGV4ID0gMDtcclxuICAgICAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgdmFyIF9hbGxBY3RvcnMgPSB0aGlzLlBsYXllckdhbWVJbmZvO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FsbEFjdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGlmIChfYWN0b3IuUGxheWVyVUlEID09IF9hbGxBY3RvcnNbaW5kZXhdLlBsYXllclVJRClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBteUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbXlJbmRleDtcclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24gU3BlY3RhdGVNb2RlIENvZGVcclxuXHJcbiAgICBTeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBBbGxEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiKTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvPUFsbERhdGE7XHJcbiAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzPXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKTtcclxuXHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB2YXIgX3RvUG9zPWNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKF90b1Bvcy54LF90b1Bvcy55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3luY2VkIHBsYXllcm5vZGVzXCIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlcigpXHJcbiAgICB7XHJcbiAgICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICAgIGlmKFR1cm5DaGVja0FycmF5Lmxlbmd0aD09VG90YWxDb25uZWN0ZWRQbGF5ZXJzKVxyXG4gICAgICB7XHJcbiAgICAgICAgVHVybkNoZWNrQXJyYXk9W107XHJcbiAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkPXRydWU7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgVHVybiBpcyBjYWxsZWQgYnk6IFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gZnVuY3Rpb25zIHJlbGF0ZWQgdG8gVHVybiBNZWNoYW5pc20gYW5kIGNhcmQgbWVjaGFuaXNtXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IHJhaXNlZCBldmVudCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHMgdG8gbGV0IG90aGVycyBrbm93IGEgd2hhdCBjYXJkIGhhcyBiZWVuIHNlbGVjdGVkIGJ5IHBsYXllclxyXG4gICAgQG1ldGhvZCBSYWlzZUV2ZW50Rm9yQ2FyZFxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFJhaXNlRXZlbnRGb3JDYXJkKF9kYXRhKVxyXG4gIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDUsX2RhdGEpO1xyXG4gIH0sXHJcblxyXG4gIENsZWFyRGlzcGxheVRpbWVvdXQoKVxyXG4gIHtcclxuICAgIGNsZWFyVGltZW91dChDYXJkRGlzcGxheVNldFRpbW91dCk7XHJcbiAgfSxcclxuXHJcbiAgRGlzcGxheUNhcmRPbk90aGVycygpXHJcbiAge1xyXG4gICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuICAgICAgICBpZihDYXJkRXZlbnRSZWNlaXZlZD09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChDYXJkRGlzcGxheVNldFRpbW91dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5DYXJkQ291bnRlcik7XHJcbiAgICAgICAgICAgIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG4gICAgICAgICAgICBpZighdGhpcy5DYXJkRGlzcGxheWVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLkNhcmRDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLk9uTGFuZGVkT25TcGFjZShmYWxzZSx0aGlzLlJhbmRvbUNhcmRJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FyZERpc3BsYXlTZXRUaW1vdXQ9c2V0VGltZW91dCgoKSA9PiB7IC8vY2hlY2sgYWZ0ZXIgZXZlcnkgMC41IHNlY29uZHNcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0Q2FyZERpc3BsYXkoKVxyXG4gIHtcclxuICAgIHRoaXMuQ2FyZERpc3BsYXllZD1mYWxzZTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRGb3JDYXJkKF9kYXRhKVxyXG4gIHtcclxuXHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG5cclxuICAgIHZhciBSYW5kb21DYXJkPV9kYXRhLnJhbmRvbUNhcmQ7XHJcbiAgICB2YXIgY291bnRlcj1fZGF0YS5jb3VudGVyO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4PVJhbmRvbUNhcmQ7XHJcbiAgICB0aGlzLkNhcmRDb3VudGVyPWNvdW50ZXI7XHJcblxyXG4gICBcclxuICAgIGNvbnNvbGUuZXJyb3IoQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG5cclxuICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UodHJ1ZSxSYW5kb21DYXJkKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIENhcmRFdmVudFJlY2VpdmVkPXRydWU7XHJcbiAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3Q9PWZhbHNlKVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UodHJ1ZSxSYW5kb21DYXJkKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLk9uTGFuZGVkT25TcGFjZShmYWxzZSxSYW5kb21DYXJkLHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUuZXJyb3IoQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG5cclxuICAgIFxyXG4gIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IHJhaXNlZCBldmVudCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHMgdG8gbGV0IG90aGVycyBrbm93IGEgcGFydGljdWxhciBwbGF5ZXIgaGFzIGNvbXBsZXRlIHRoZWlyIG1vdmVcclxuICAgIEBtZXRob2QgUmFpc2VFdmVudFR1cm5Db21wbGV0ZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKVxyXG4gIHtcclxuICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpXHJcbiAgICAgIHtcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT1mYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSlcclxuICAgICAge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcInJlYWlzZWQgZm9yIHR1cm4gY29tcGxldGVcIik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg0LHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpO1xyXG4gICAgICB9XHJcbiAgfSxcclxuXHJcblxyXG4gIFN5bmNBbGxEYXRhKClcclxuICB7XHJcbiAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgfSAgXHJcbn0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIG9uIGFsbCBwbGF5ZXJzIHRvIHZhbGlkYXRlIGlmIG1vdmUgaXMgY29tcGxldGVkIG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50c1xyXG4gICAgQG1ldGhvZCBSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGVcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUoX3VpZClcclxuICB7XHJcbiAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vcmVhbCBwbGF5ZXJzXHJcbiAgICAgIHtcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT1mYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PTApXHJcbiAgICAgICAgICAgICAgICAgICAgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTsgXHJcblxyXG4gICAgICAgICAgICB2YXIgQXJyYXlMZW5ndGg9VHVybkNoZWNrQXJyYXkubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgSURGb3VuZD1mYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEFycmF5TGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoVHVybkNoZWNrQXJyYXlbaW5kZXhdPT1fdWlkKVxyXG4gICAgICAgICAgICAgICAgICAgIElERm91bmQ9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIUlERm91bmQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yQ291bnQoKTtcclxuICAgICAgICAgICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycz10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT1Ub3RhbENvbm5lY3RlZFBsYXllcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkPXRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5TeW5jQWxsRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgVHVybiBpcyBjYWxsZWQgYnk6IFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSlcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgfSxcclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gZGljZSBhbmltYXRpb24gaXMgcGxheWVkIG9uIGFsbCBwbGF5ZXJzXHJcbiAgICBAbWV0aG9kIENoYW5nZVR1cm5cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENoYW5nZVR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5UdXJuTnVtYmVyPHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoLTEpXHJcbiAgICAgICAgICAgIHRoaXMuVHVybk51bWJlcj10aGlzLlR1cm5OdW1iZXIrMTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuVHVybk51bWJlcj0wO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgZnJvbSByYWlzZSBvbiBldmVudCAoZnJvbSBmdW5jdGlvbiBcIlN0YXJ0VHVyblwiIGFuZCBcIkNoYW5nZVR1cm5cIiBvZiB0aGlzIHNhbWUgY2xhc3MpIHRvIGhhbmRsZSB0dXJuXHJcbiAgICBAbWV0aG9kIFR1cm5IYW5kbGVyXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBUdXJuSGFuZGxlcihfdHVybilcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiVHVybjogXCIrX3R1cm4pO1xyXG4gICAgICAgIHZhciBfcGxheWVyTWF0Y2hlZD1mYWxzZTtcclxuICAgICAgICBfc2tpcE5leHRUdXJuPWZhbHNlO1xyXG4gICAgICAgIGlmKElzVHdlZW5pbmcpIC8vY2hlY2sgaWYgYW5pbWF0aW9uIG9mIHR1cm4gYmVpbmcgcGxheWVkIG9uIG90aGVyIHBsYXllcnMgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkhhbmRsZXIoX3R1cm4pO1xyXG4gICAgICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9X3R1cm47XHJcbiAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgICAgIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3ModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BsYXllck1hdGNoZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBfc2tpcE5leHRUdXJuPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIV9za2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIHlvdXIgdHVybiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdD09ZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3ModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BsYXllck1hdGNoZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBfc2tpcE5leHRUdXJuPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIV9za2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIHlvdXIgdHVybiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZS8vdHVybiBkZWNpc2lvbnMgZm9yIGJvdFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBfcGxheWVyTWF0Y2hlZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9za2lwTmV4dFR1cm49dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZighX3NraXBOZXh0VHVybilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Sb2xsRGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIsdGhpcy5UdXJuTnVtYmVyLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUdXJuIE9mOiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbFBsYXllclVJW3RoaXMuVHVybk51bWJlcl0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm8pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT10cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vc2tpcCB0aGlzIHR1cm4gYXMgc2tpcCB0dXJuIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmVcclxuICAgICAgICAgICAgaWYoX3BsYXllck1hdGNoZWQgJiYgX3NraXBOZXh0VHVybilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTa2lwcGluZyBjdXJyZW50IHR1cm5cIiwxMjAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2tpcE5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihfcGxheWVyTWF0Y2hlZCAmJiB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uaXNHYW1lRmluaXNoZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfaW5kKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgdmFyIE15RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICAgICAgdmFyIF9jb3VudGVyPV9pbmQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIC8vaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEIT1NeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIC8vZG9udCB1cGRhdGUgbXkgb3duIGRhdGFcclxuICAgICAgIC8vIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQ9PU1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXT1NYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvL31cclxuICAgICAgIC8vIGVsc2VcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoX2NvdW50ZXI8dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgtMSlcclxuICAgICAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkaW5nIGNvdW50ZXI6IFwiK19jb3VudGVyKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgfSwgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gYWxsIHBsYXllcnMgaGF2ZSBkb25lIHRoZWlyIGluaXRpYWwgc2V0dXAgYW5kIGZpcnN0IHR1cm4gc3RhcnRzXHJcbiAgICBAbWV0aG9kIFN0YXJ0VHVyblxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU3RhcnRUdXJuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDsgLy9yZXNldGluZyB0aGUgdHVybiBudW1iZXIgb24gc3RhcnQgb2YgdGhlIGdhbWVcclxuXHJcbiAgICAgICAgLy9zZW5kaW5nIGluaXRpYWwgdHVybiBudW1iZXIgb3ZlciB0aGUgbmV0d29yayB0byBzdGFydCB0dXJuIHNpbXVsdGFub3VzbHkgb24gYWxsIGNvbm5lY3RlZCBwbGF5ZXIncyBkZXZpY2VzXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLHRoaXMuVHVybk51bWJlcik7XHJcbiAgICAgICAgXHJcbiAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBSZWNlaXZlQmFua3J1cHREYXRhKF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIC8vb3RoZXIgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcclxuICAgICAgICB2YXIgX2lzQmFua3J1cHRlZD1fZGF0YS5EYXRhLmJhbmtydXB0ZWQ7XHJcbiAgICAgICAgdmFyIF90dXJuPV9kYXRhLkRhdGEudHVybjtcclxuICAgICAgICB2YXIgX3BsYXllckRhdGE9X2RhdGEuRGF0YS5QbGF5ZXJEYXRhTWFpbjtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKF9pc0JhbmtydXB0ZWQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKF90dXJuKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhfcGxheWVyRGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3R1cm5dPV9wbGF5ZXJEYXRhO1xyXG5cclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKHRydWUpO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIix0aGlzLlR1cm5OdW1iZXIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT10cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXModHJ1ZSk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIix0aGlzLlR1cm5OdW1iZXIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT10cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBGdW5jdGlvbiBmb3IgZ2FtZXBsYXlcclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcGxheWVyIFVJIChuYW1lL2ljb25zL251bWJlciBvZiBwbGF5ZXJzIHRoYXQgdG8gYmUgYWN0aXZlIGV0YylcclxuICAgIEBtZXRob2QgQXNzaWduUGxheWVyR2FtZVVJXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBBc3NpZ25QbGF5ZXJHYW1lVUkoX2lzQmFua3J1cHRlZD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkgLy9mb3IgYm90XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighX2lzQmFua3J1cHRlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9yYW5kb21JbmRleD10aGlzLmdldFJhbmRvbSgwLHRoaXMuQm90R2FtZUluZm8ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mby5wdXNoKHRoaXMuQm90R2FtZUluZm9bX3JhbmRvbUluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM9MjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlR2FtZVVJKF90b2dnbGVIaWdobGlnaHQsX2luZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGlmKF90b2dnbGVIaWdobGlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW19pbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tfaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoX2luZGV4PT1pbmRleClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlQkdIaWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVUZXh0aWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBlbmJhbGUgcmVzcGVjdGl2ZSBwbGF5ZXJzIG5vZGVzIGluc2lkZSBnYW1hcGxheVxyXG4gICAgQG1ldGhvZCBFbmFibGVQbGF5ZXJOb2Rlc1xyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgRW5hYmxlUGxheWVyTm9kZXMoX2lzQmFua3J1cHRlZD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZighX2lzQmFua3J1cHRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSG9tZUJhc2VkQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkhvbWVCYXNlZEFtb3VudD09MSkgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ccmlja0FuZE1vcnRhckFtb3VudD09MSkgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi54LHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0YXJnZXRQb3M9dGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsMTIwKSk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgXHJcbiAgICAgICAgbGV0IHJhdGlvPXRhcmdldFBvcy55L2NjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz0yO1xyXG4gICAgfSxcclxuXHJcbiAgICBsYXRlVXBkYXRlICgpIHtcclxuICAgICAgICBpZih0aGlzLmlzQ2FtZXJhWm9vbWluZykgICAgXHJcbiAgICAgICAgICAgIHRoaXMuU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzeW5jRGljZVJvbGwoX3JvbGwpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9kaWNlMT1fcm9sbC5kaWNlMTtcclxuICAgICAgICB2YXIgX2RpY2UyPV9yb2xsLmRpY2UyO1xyXG4gICAgICAgIHZhciBfcmVzdWx0PV9kaWNlMStfZGljZTI7XHJcblxyXG4gICAgICAgIElzVHdlZW5pbmc9dHJ1ZTtcclxuICAgICAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9ZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPT0wICYmICF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlPT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPTEzO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPT0xMilcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIrMjE7ICBcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcisxO1xyXG5cclxuICAgICAgICAgICAgUm9sbENvdW50ZXI9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgRGljZVJvbGw9X3Jlc3VsdDtcclxuICAgICAgICBEaWNlVGVtcD0wO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5QcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24oRGljZVJvbGwpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5UdXJuTnVtYmVyPT1pbmRleClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5nZXRDb21wb25lbnQoXCJEaWNlQ29udHJvbGxlclwiKS5BbmltYXRlRGljZShfZGljZTEsX2RpY2UyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIC8vIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgICAgICAvLyB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsdHJ1ZSwwLjQpOyAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBEaWNlRnVudGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgICAgICB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsdHJ1ZSwwLjQpOyAgXHJcbiAgICB9LFxyXG5cclxuICAgIFRlbXBDaGVja1NwYWNlKF9yb2xsaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1wY291bnRlcj0wO1xyXG4gICAgICAgIHZhciB0ZW1wY291bnRlcjI9MDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQ9PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJwbGF5ZXIgbWF0Y2hlZDpcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wY291bnRlcjI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIGlmKHRlbXBjb3VudGVyMi0xPDApXHJcbiAgICAgIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwic3RhcnRpbmcgZnJvbSBvYmxpdmlvblwiKTtcclxuICAgICAgICB0ZW1wY291bnRlcj10ZW1wY291bnRlcjIrX3JvbGxpbmctMTtcclxuICAgICAgICB2YXIgZGljZXRvYmU9cGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwidG8gYmU6IFwiK2RpY2V0b2JlKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wY291bnRlcj10ZW1wY291bnRlcjIrX3JvbGxpbmc7XHJcbiAgICAgICAgdmFyIGRpY2V0b2JlPXBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIitkaWNldG9iZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxEaWNlOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgRGljZTE7XHJcbiAgICAgICAgdmFyIERpY2UyO1xyXG4gICAgICAgIGlmIChfaXNUZXN0ICYmIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdD09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaWNlMSA9IHBhcnNlSW50KF9kaWNlaW5wdXQxKTtcclxuICAgICAgICAgICAgRGljZTIgPSBwYXJzZUludChfZGljZWlucHV0Mik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSB0cnVlICYmIF9pc1Rlc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaWNlMSA9IDE7XHJcbiAgICAgICAgICAgIERpY2UyID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuICAgICAgICAgICAgRGljZTI9dGhpcy5nZXRSYW5kb20oMSw3KTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgICBcclxuXHJcbiAgICAgICAgLy8gdmFyIERpY2UxPTIwO1xyXG4gICAgICAgIC8vIHZhciBEaWNlMj0xO1xyXG5cclxuICAgICAgICBEaWNlUm9sbD1EaWNlMStEaWNlMjtcclxuICAgICAgICB2YXIgX25ld1JvbGw9e2RpY2UxOkRpY2UxLGRpY2UyOkRpY2UyfVxyXG4gICAgICAgIC8vRGljZVJvbGw9MjM7XHJcbiAgICAgICAgLy90aGlzLlRlbXBDaGVja1NwYWNlKERpY2VSb2xsKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRpY2UgbnVtYmVyOiBcIitEaWNlUm9sbCtcIiwgRGljZTE6XCIrRGljZTErXCIsIERpY2UyOlwiK0RpY2UyKTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgzLF9uZXdSb2xsKTsgXHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxPbmVEaWNlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuICAgICAgICByZXR1cm4gRGljZTE7XHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxUd29EaWNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgdmFyIERpY2UyPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgcmV0dXJuIChEaWNlMStEaWNlMik7XHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGxVcG9uQ2FyZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9zcGFjZUlEPXBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgIGlmKF9zcGFjZUlEIT02ICYmIF9zcGFjZUlEIT03KSAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVuYXMgc2VsbCBzcGFjZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIFJhbmRvbUNhcmQ9dGhpcy5nZXRSYW5kb20oMCwxNSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2ZvciB0ZXN0aW5nIG9ubHlcclxuICAgICAgICAgICAgaWYoX3NwYWNlSUQ9PTIpIC8vbGFuZGVkIG9uIHNvbWUgYmlnIGJ1c2luZXNzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNywxMCwyLDMsNCw1LDYsOF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCwxMCk7XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gODtcclxuICAgICAgICAgICAgfWVsc2UgaWYoX3NwYWNlSUQ9PTUpIC8vbGFuZGVkIG9uIHNvbWUgbG9zc2VzIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNSw2LDIsNywzLDQsOCw5XTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleD10aGlzLmdldFJhbmRvbSgwLDEwKTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSA5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoX3NwYWNlSUQ9PTMpIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDcsMyw4LDEzLDksMSwyLDQsNV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCwxMCk7XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gNTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxzZSBpZihfc3BhY2VJRD09MSkgLy9sYW5kZWQgb24gc29tZSB3aWxkIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNiwxMCwyLDMsNF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw3KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAvL1JhbmRvbUNhcmQgPSA0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGE9e1wicmFuZG9tQ2FyZFwiOlJhbmRvbUNhcmQsXCJjb3VudGVyXCI6Um9sbENvdW50ZXJ9OyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpIC8vZm9yIGJvdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGE9e1wicmFuZG9tQ2FyZFwiOlJhbmRvbUNhcmQsXCJjb3VudGVyXCI6Um9sbENvdW50ZXJ9OyAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFuZGVkIG9uIHBheSBkYXkgb3IgZG91YmxlIHBheSBkYXkgYW5kIHdvcmsgaXMgZG9uZSBzbyBjaGFuZ2luZyB0dXJuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBsZXRlQ2FyZFR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENhbGxHYW1lQ29tcGxldGUoX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9pc0JvdD09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD10aGlzLlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Nhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEhNQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEJNTG9jYXRpb25zPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FuQW1vdW50Kz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1DYXNoPShCTUFtb3VudCtCTUxvY2F0aW9ucykqMTUwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgSE1DYXNoPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoSE1BbW91bnQ9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD02MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArNjAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MylcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzI1MDAwKzYwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgVG90YWxBc3NldHM9X2Nhc2grQk1DYXNoK0hNQ2FzaC1sb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxTY29yZT1Ub3RhbEFzc2V0cztcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9dGhpcy5UdXJuTnVtYmVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9PWZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX2Nhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g7XHJcbiAgICAgICAgICAgICAgICB2YXIgSE1BbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBCTUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9dGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYW5BbW91bnQrPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1DYXNoPShCTUFtb3VudCtCTUxvY2F0aW9ucykqMTUwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgSE1DYXNoPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoSE1BbW91bnQ9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD02MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArNjAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MylcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzI1MDAwKzYwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgVG90YWxBc3NldHM9X2Nhc2grQk1DYXNoK0hNQ2FzaC1sb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxTY29yZT1Ub3RhbEFzc2V0czsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKVxyXG4gICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg2LF9kYXRhKTtcclxuICAgfSxcclxuXHJcbiAgIFN5bmNHYW1lT3ZlcihfVUlEKVxyXG4gICB7XHJcbiAgICBcclxuICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAge1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgdmFyIE15RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3Zlcj10cnVlO1xyXG5cclxuICAgICAgICBpZihNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQ9PV9VSUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIDE1MDAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IGxvc2VcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJ1bmZvcnR1bmF0ZWx5IHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCIrXCJcXG5cIisnXFxuJytcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJHYW1lIHdpbGwgYmUgcmVzdGFydGVkIGF1dG9tYXRjYWxseSBhZnRlciAxNSBzZWNvbmRzXCIsXHJcbiAgICAgICAgICAgICAgICAxNTAwMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICAgICAgICB9LCAxNTA2MCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vd2l0aCBib3RcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPXRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgdmFyIE15RGF0YT10aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9VSUQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKE15RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMF0uR2FtZU92ZXI9dHJ1ZTtcclxuXHJcbiAgICAgICAgaWYoTXlEYXRhLlBsYXllclVJRD09X1VJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IHdvblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoOiBcIitNeURhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIDE1MDAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IGxvc2VcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLlRvdGFsU2NvcmUrXCJcXG5cIisnXFxuJytcclxuICAgICAgICAgICAgICAgIFwidW5mb3J0dW5hdGVseSB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiK1wiXFxuXCIrJ1xcbicrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAgICAgMTUwMDBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgfSwgMTUwNjApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgIH0sXHJcblxyXG4gICAgU3RhcnREaWNlUm9sbDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoUm9sbENvdW50ZXI+PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVvdmVyXCIpO1xyXG4gICAgICAgICAgICBpc0dhbWVPdmVyPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGxheWVyY29tcGxldGVkPTA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJjb21wbGV0ZWQ9PXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heD0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQ9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdmFsdWUgPiBtYXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWRJbmQ9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PV92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIHdvbiBieSBwbGF5ZXIgaWQ6IFwiK1Nlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZD0wO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoTWFpblNlc3Npb25EYXRhW2luZGV4XS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHBsYXllcmNvbXBsZXRlZD09dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXg9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFNlbGVjdGVkSW5kPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBTZXNzaW9uRGF0YT10aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3ZhbHVlID4gbWF4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdGVkSW5kPWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heD1fdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIitTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtc1xyXG4gICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERpY2VUZW1wPURpY2VUZW1wKzE7IFxyXG4gICAgICAgICAgICB2YXIgX3RvUG9zPWNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5QbGF5ZXIodGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLF90b1Bvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSYW5kb206ZnVuY3Rpb24obWluLG1heClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICAgIH0sXHJcblxyXG4gICAgVHdlZW5DYW1lcmE6IGZ1bmN0aW9uIChfcG9zLCBpc1pvb20sdGltZSkgeyAgIFxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuQ2FtZXJhTm9kZSlcclxuICAgICAgICAudG8odGltZSwgeyBwb3NpdGlvbjogY2MudjIoX3Bvcy54LCBfcG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZihpc1pvb20pXHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBab29tQ2FtZXJhSW4gKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgaWYodGhpcy5DYW1lcmEuem9vbVJhdGlvPDIpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89dGhpcy5DYW1lcmEuem9vbVJhdGlvKzAuMDM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCAxMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUGF5RGF5Q29uZGl0aW9ucyhfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NilcclxuICAgICAgICAgICAgUGFzc2VkUGF5RGF5PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NylcclxuICAgICAgICAgICAgRG91YmxlUGF5RGF5PXRydWU7XHJcblxyXG4gICAgICAgIF9uZXh0VHVybkRvdWJsZVBheT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgICAgICAgaWYoUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkgJiYgIV9uZXh0VHVybkRvdWJsZVBheSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UsX2lzQm90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZigoRG91YmxlUGF5RGF5KSB8fCAoUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKHRydWUsX2lzQm90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFpvb21DYW1lcmFPdXQgKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLkNhbWVyYS56b29tUmF0aW8+PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz10aGlzLkNhbWVyYS56b29tUmF0aW8tMC4wMztcclxuICAgICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb249Y2MuVmVjMigwLDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTE7XHJcblxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbigwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIWlzR2FtZU92ZXIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vcmVhbCBwbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkgLy9ib3RcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90PT1mYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBUd2VlblBsYXllcjogZnVuY3Rpb24gKE5vZGUsVG9Qb3MpIHtcclxuICAgICAgICBjYy50d2VlbihOb2RlKVxyXG4gICAgICAgIC50bygwLjQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZihEaWNlVGVtcDxEaWNlUm9sbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCFpc0dhbWVPdmVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXk9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vZm9yIGJvdFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheT10cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihSb2xsQ291bnRlcj09MTIpXHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj1Sb2xsQ291bnRlcisyMTsgIFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj1Sb2xsQ291bnRlcisxO1xyXG5cclxuICAgICAgICAgICAgLy9EaWNlVGVtcD1EaWNlVGVtcCsxOyBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coRGljZVRlbXArXCIgXCIrUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX25ld3Bvcz1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcyxmYWxzZSwwLjYpOyAvL3pvb21vdXRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vcnVsZXMgaW1wbG1lbnRhdGlvbiBkdXJpbmcgdHVybiAodHVybiBkZWNpc2lvbnMpXHJcblxyXG4gICAgVG9nZ2xlUGF5RGF5KF9zdDEsX1N0MilcclxuICAgIHtcclxuICAgICAgICBQYXNzZWRQYXlEYXk9X3N0MTtcclxuICAgICAgICBEb3VibGVQYXlEYXk9X1N0MjtcclxuICAgIH0sXHJcblxyXG4gICAgRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKGFtb3VudCxfaW5kZXgsX2xvY2F0aW9uTmFtZSxfaXNDYXJkRnVuY3Rpb25hbGl0eSA9IGZhbHNlLF9HaXZlbkNhc2ggPSAwLF9TdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2g9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFfaXNDYXJkRnVuY3Rpb25hbGl0eSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoIC0gYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ID0gdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50ICsgMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGV4cGFuZGVkIHlvdXIgYnVzaW5lc3MuXCIsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIiArIGFtb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChfR2l2ZW5DYXNoID49IGFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgX0dpdmVuQ2FzaCA9IF9HaXZlbkNhc2ggLSBhbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUucHVzaChfbG9jYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZXhwYW5kZWQgeW91ciBidXNpbmVzcy5cIiwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgICAgICAgIH0sIDEyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoIHRvIGV4cGFuZCB0aGlzIGJ1c2luZXNzLCBjYXNoIG5lZWRlZCAkIFwiICsgYW1vdW50K1wiLCBDYXNoIEdpdmVuICRcIitfR2l2ZW5DYXNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oX2lzQ2FyZEZ1bmN0aW9uYWxpdHkgPSBmYWxzZSxfR2l2ZW5DYXNoID0gMCxfU3RhcnRBbnlCdXNpbmVzc1dpdGhvdXRDYXNoPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHBhcnNlSW50KHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NUeXBlKT09MikgLy90aGlzIG1lYW5zIHRoZXJlIGlzIGJyaWNrIGFuZCBtb3J0YXIgaW4gbGlzdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlNldEJ1c2luZXNzSW5kZXgoaSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0Q2FyZEZ1bmN0aW9uYWxpdHkoX2lzQ2FyZEZ1bmN0aW9uYWxpdHkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlNldEdpdmVuQ2FzaChfR2l2ZW5DYXNoKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5TZXRTdGFydEFueUJ1c2luZXNzV2l0aG91dENhc2goX1N0YXJ0QW55QnVzaW5lc3NXaXRob3V0Q2FzaCk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuUmVzZXRFZGl0Qm94KCk7XHJcbiAgICAgICAgICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coQnVzaW5lc3NMb2NhdGlvbk5vZGVzKTtcclxuICAgICAgICByZXR1cm4gQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDtcclxuICAgIH0sXHJcblxyXG4gICAgRGVzdHJveUdlbmVyYXRlZE5vZGVzKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbihfbmFtZSxfU2hhcmVBbW91bnQsX2lzQWRkaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9pc0FkZGluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfc3RvY2s9bmV3IFN0b2NrSW5mbygpO1xyXG4gICAgICAgICAgICBfc3RvY2suQnVzaW5lc3NOYW1lPV9uYW1lO1xyXG4gICAgICAgICAgICBfc3RvY2suU2hhcmVBbW91bnQ9X1NoYXJlQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZTdG9ja3MucHVzaChfc3RvY2spO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oX2lzRG91YmxlUGF5RGF5PWZhbHNlLF9pc0JvdD1mYWxzZSxfZm9yU2VsZWN0ZWRCdXNpbmVzcz1mYWxzZSxfU2VsZWN0ZWRCdXNpbmVzc0luZGV4PTAsSEJBbW91bnQ9MCxCTUFtb3VudD0wLEJNTG9jYXRpb25zPTApXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKF9mb3JTZWxlY3RlZEJ1c2luZXNzKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGl0bGUgPSBcIlBheURheVwiO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLGZhbHNlLCBmYWxzZSwgZmFsc2UsIF9pc0JvdCxfZm9yU2VsZWN0ZWRCdXNpbmVzcyxfU2VsZWN0ZWRCdXNpbmVzc0luZGV4LEhCQW1vdW50LEJNQW1vdW50LEJNTG9jYXRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIF9za2lwTmV4dFBheWRheSA9IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheTtcclxuICAgICAgICAgICAgX3NraXBITU5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEhNTmV4dFBheWRheTtcclxuICAgICAgICAgICAgX3NraXBCTU5leHRQYXlkYXkgPSB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfc2tpcE5leHRQYXlkYXkpIC8vaWYgcHJldmlvdXNseSBza2lwIHBheWRheSB3YXMgc3RvcmVkIGJ5IGFueSBjYXJkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFfaXNCb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgUGF5RGF5LlwiLCAxNjAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNjUwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyBQYXlEYXkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RpdGxlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2lzRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgICAgIF90aXRsZSA9IFwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgX3RpdGxlID0gXCJQYXlEYXlcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLCBfaXNEb3VibGVQYXlEYXksIF9za2lwSE1OZXh0UGF5ZGF5LCBfc2tpcEJNTmV4dFBheWRheSwgX2lzQm90KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQmFua3J1cHRfVHVybkRlY2lzaW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCYW5rcnVwdD10cnVlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCs9MTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsZmFsc2UsdGhpcy5TZWxlY3RlZE1vZGUsdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQsdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50LF91SUQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IENhc2g6IF9hbW91bnQsIElEOiBfdUlEIH0gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEzLCBfZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9hbW91bnQgPSBfZGF0YS5EYXRhLkNhc2g7XHJcbiAgICAgICAgICAgIHZhciBfaUQ9X2RhdGEuRGF0YS5JRDtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uUGxheWVyVUlEID09IF9pRCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5pc0dhbWVGaW5pc2hlZCA9PSB0cnVlKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlRvdGFsU2NvcmUrPV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHJlY2VpdmVkIHByb2ZpdCBvZiAkXCIgKyBfYW1vdW50ICsgXCIgZnJvbSB5b3VyIHBhcnRuZXIuXCIsMjgwMCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuLy8jZW5kcmVnaW9uXHJcbiAgIFxyXG4gICAgLy8jcmVnaW9uIENhcmRzIFJ1bGVzXHJcbiAgICBUb2dnbGVEb3VibGVQYXlOZXh0VHVybihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk9X25leHRUdXJuRG91YmxlUGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwTmV4dFR1cm4oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm49X3NraXBOZXh0VHVybjtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBOZXh0UGF5ZGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk9X3NraXBOZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5PV9za2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcEJNTmV4dFBheWRheT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk9X3NraXBCTU5leHRQYXlkYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVR1cm5Qcm9ncmVzcyhfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgVHVybkluUHJvZ3Jlc3M9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXR1cm5UdXJuUHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBUdXJuSW5Qcm9ncmVzcztcclxuICAgIH0sXHJcblxyXG4gICAgTG9zZUFsbE1hcmtldGluZ01vbmV5KClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2xvc2VBbW91bnQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2xvc2VBbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfbG9zZUFtb3VudD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9sb3NlQW1vdW50XHJcbiAgICB9LFxyXG5cclxuICAgIE11bHRpcGx5TWFya2V0aW5nTW9uZXkoX211bHRpcGxpZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9hbW91bnRJbmNyZWFzZWQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudEluY3JlYXNlZD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50Kj1fbXVsdGlwbGllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudEluY3JlYXNlZD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9hbW91bnRJbmNyZWFzZWRcclxuICAgIH0sXHJcblxyXG4gICAgR2V0TWFya2V0aW5nTW9uZXkoX3Byb2ZpdClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2Ftb3VudD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcHJvZml0PShfcHJvZml0LzEwMCk7XHJcbiAgICAgICAgICAgIF9hbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCo9X3Byb2ZpdDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCs9X2Ftb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9hbW91bnRcclxuICAgIH0sXHJcblxyXG4gICAgUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24oX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF91c2VySUQ9X2RhdGEuVXNlcklEO1xyXG4gICAgICAgIHZhciBfcXVlc3Rpb25JbmRleD1fZGF0YS5RdWVzdGlvbjtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PV9kYXRhLlVzZXJJbmRleDtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihfdXNlcklEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIklEIG1hdGNoZWRcIik7XHJcblxyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgT25lUXVlc3Rpb25JbmRleD1fcXVlc3Rpb25JbmRleDtcclxuICAgICAgICAgICAgdmFyIF9xdWVzdGlvbkFza2VkPU9uZVF1ZXN0aW9uc1tfcXVlc3Rpb25JbmRleC0xXTtcclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9xdWVzdGlvbkFza2VkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uKF9pc1R1cm5PdmVyPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbXlEYXRhO1xyXG4gICAgICAgIHZhciBfcm9vbURhdGE7XHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jvb21EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgICAgICAgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9teURhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgICAgICAgX3Jvb21EYXRhPXRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsX3Jvb21EYXRhLF9pc1R1cm5PdmVyLHRoaXMuU2VsZWN0ZWRNb2RlKVxyXG4gICAgXHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uRGVjaXNpb25fUGF5QW1vdW50X09uZVF1ZXN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgaWYoX215RGF0YS5DYXNoPj01MDAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihfbXlEYXRhLlBsYXllclVJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2gtPTUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBwYWlkIGNhc2ggYW1vdW50IHRvIHBsYXllci5cIiwxMjAwKTtcclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKHRydWUsZmFsc2UsLTEsX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvbl9BbnN3ZXJRdWVzdGlvbl9PbmVRdWVzdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9teURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBhbnN3ZXJlZCB0aGUgcXVlc3Rpb24uXCIsMTIwMCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsdHJ1ZSxPbmVRdWVzdGlvbkluZGV4LF9teURhdGEuUGxheWVyVUlEKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9oYXNEb25lUGF5bWVudCxfaGFzQW5zd2VyZWRRdWVzdGlvbixfcXVlc3Rpb25JbmRleCxfVXNlcklEKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZGF0YT17UGF5bWVudERvbmU6X2hhc0RvbmVQYXltZW50LFF1ZXN0aW9uQW5zd2VyZWQ6X2hhc0Fuc3dlcmVkUXVlc3Rpb24sUXVlc3Rpb25JbmRleDpfcXVlc3Rpb25JbmRleCxJRDpfVXNlcklEfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDgsX2RhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfZGF0YSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfaGFzRG9uZVBheW1lbnQ9X2RhdGEuUGF5bWVudERvbmU7XHJcbiAgICAgICAgICAgIHZhciBfaGFzQW5zd2VyZWRRdWVzdGlvbj1fZGF0YS5RdWVzdGlvbkFuc3dlcmVkO1xyXG4gICAgICAgICAgICB2YXIgX3F1ZXN0aW9uSW5kZXg9X2RhdGEuUXVlc3Rpb25JbmRleDtcclxuICAgICAgICAgICAgdmFyIF91SUQ9X2RhdGEuSUQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihfaGFzRG9uZVBheW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCs9NTAwMDtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIHJlZnVzZWQgdG8gYW5zd2VyIHRoZSBxdWVzdGlvbiBpbnN0ZWFkIHBheWVkIHRoZSBjYXNoIGFtb3VudCwgJDUwMDAgYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKF9oYXNBbnN3ZXJlZFF1ZXN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3NlbGVjdGVkUGxheWVySW5kZXg9MDtcclxuICAgICAgICAgICAgICAgIHZhciBfYWN0b3JzRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF91SUQ9PV9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZFBsYXllckluZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoX3F1ZXN0aW9uSW5kZXg9PTEpLy9oYXZlIHlvdSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihfcXVlc3Rpb25JbmRleD09MikvL0hhdmUgeW91IHRha2VuIGFueSBsb2FuP1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9sb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSB0YWtlbiBzb21lIGxvYW5cIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHRha2VuIGFueSBsb2FuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTMpLy9BcmUgeW91IGJhbmtydXB0ZWQ/IGlmIG1vcmUgdGhhbiBvbmNlLCB0ZWxsIG1lIHRoZSBhbW91bnQ/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuSXNCYW5rcnVwdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZCBcIitfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5CYW5rcnVwdEFtb3VudCtcIiB0aW1lL2VzLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTQpLy9JcyB5b3VyIHR1cm4gZ29pbmcgdG8gYmUgc2tpcHBlZCBuZXh0IHRpbWU/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBiZSBza2lwcGVkLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIG5vdCBiZSBza2lwcGVkLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTUpLy9JcyBpdCBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSB5b3VyIG5leHQgcGF5ZGF5P1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIGJlIGRvdWJsZSBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIG5vdCBiZSBkb3VibGUgcGF5ZGF5XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjE1MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZihJc1R3ZWVuaW5nPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfc3BhY2VzPV9kYXRhLkRhdGEuYmFja3NwYWNlcztcclxuICAgICAgICAgICAgdmFyIF9jb3VudGVyPV9kYXRhLkRhdGEuQ291bnRlcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2NvdW50ZXIrQmFja3NwYWNlc10uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zLDAuMSk7XHJcblxyXG4gICAgICAgICAgICBSb2xsQ291bnRlcj1fY291bnRlcjtcclxuICAgICAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuUGxheWVyX0dvQmFja1NwYWNlczogZnVuY3Rpb24gKE5vZGUsVG9Qb3Msc3BlZWQ9MC42KSB7XHJcbiAgICAgICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgICAudG8oc3BlZWQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBSb2xsQ291bnRlci09QmFja3NwYWNlcztcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfZGF0YT17RGF0YTp7YmFja3NwYWNlczpCYWNrc3BhY2VzLENvdW50ZXI6Um9sbENvdW50ZXJ9fTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMCxfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbn0pO1xyXG4vL21vZHVsZS5leHBvcnRzICA9IFBsYXllckRhdGE7IC8vd2hlbiBpbXBvcnRzIGluIGFub3RoZXIgc2NyaXB0IG9ubHkgcmVmZXJlbmNlIG9mIHBsYXllcmRhdGEgY2xhc3Mgd291bGQgYmUgYWJsZSB0byBhY2Nlc3NlZCBmcm9tIEdhbWVtYW5hZ2VyIGltcG9ydFxyXG5tb2R1bGUuZXhwb3J0cyAgPSBHYW1lTWFuYWdlcjtcclxuLy8jZW5kcmVnaW9uIl19