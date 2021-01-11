
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
    console.log(MyData.customProperties.PlayerSessionData.PlayerUID);

    if (this.PlayerGameInfo[_counter].PlayerUID != MyData.customProperties.PlayerSessionData.PlayerUID) //dont update my own data
      {
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
        }
      } else {
      if (_counter < this.PlayerGameInfo.length - 1) {
        _counter++;
        console.log("adding counter: " + _counter);
        this.SyncDataToPlayerGameInfo(_counter);
      } else {
        console.log(this.PlayerGameInfo);
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
      Dice2 = 1;
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

        if (_spaceID == 2) //landed on some big buseinss
          {
            var valueIndex = [0, 1, 7, 10];
            var index = this.getRandom(0, 4);
            RandomCard = valueIndex[index];
          } else if (_spaceID == 5) //landed on some losses cards
          {
            var valueIndex = [0, 1, 5, 6, 2, 7, 3, 4, 8, 9];
            var index = this.getRandom(0, 10);
            RandomCard = valueIndex[index]; //RandomCard = 9;
          } else if (_spaceID == 3) //landed on some marketing cards
          {
            var valueIndex = [0, 7, 3, 8, 13, 9];
            var index = this.getRandom(0, 6);
            RandomCard = valueIndex[index];
          } else if (_spaceID == 1) //landed on some wild cards
          {
            var valueIndex = [0, 1, 6, 10];
            var index = this.getRandom(0, 4);
            RandomCard = valueIndex[index];
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
  ExpandBusiness_TurnDecision: function ExpandBusiness_TurnDecision(amount, _index, _locationName) {
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
  },
  GenerateExpandBusiness_Prefabs_TurnDecision: function GenerateExpandBusiness_Prefabs_TurnDecision() {
    BusinessLocationNodes = [];
    console.log(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness);

    for (var i = 0; i < this.PlayerGameInfo[this.TurnNumber].NoOfBusiness.length; i++) {
      if (parseInt(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[i].BusinessType) == 2) //this means there is brick and mortar in list
        {
          var node = cc.instantiate(GamePlayReferenceManager.Instance.Get_GameplayUIManager().TurnDecisionSetupUI.ExpandBusinessPrefab);
          node.parent = GamePlayReferenceManager.Instance.Get_GameplayUIManager().TurnDecisionSetupUI.ExpandBusinessScrollContent;
          node.getComponent('ExpandBusinessHandler').SetBusinessIndex(i);
          node.getComponent('ExpandBusinessHandler').SetName(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[i].BusinessName);
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
  ProcessPayDay_TurnDecision: function ProcessPayDay_TurnDecision(_isDoublePayDay, _isBot) {
    var _this7 = this;

    if (_isDoublePayDay === void 0) {
      _isDoublePayDay = false;
    }

    if (_isBot === void 0) {
      _isBot = false;
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfaXNUZXN0IiwiX2RpY2VpbnB1dDEiLCJfZGljZWlucHV0MiIsIkVudW1CdXNpbmVzc1R5cGUiLCJjYyIsIkVudW0iLCJOb25lIiwiSG9tZUJhc2VkIiwiYnJpY2tBbmRtb3J0YXIiLCJCdXNpbmVzc0luZm8iLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiTmFtZSIsIkJ1c2luZXNzVHlwZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIlRleHQiLCJCdXNpbmVzc05hbWUiLCJBbW91bnQiLCJJbnRlZ2VyIiwiSXNQYXJ0bmVyc2hpcCIsInR5cHciLCJCb29sZWFuIiwiUGFydG5lcklEIiwiUGFydG5lck5hbWUiLCJMb2NhdGlvbnNOYW1lIiwiTG9hblRha2VuIiwiTG9hbkFtb3VudCIsImN0b3IiLCJDYXJkRGF0YUZ1bmN0aW9uYWxpdHkiLCJOZXh0VHVybkRvdWJsZVBheSIsIlNraXBOZXh0VHVybiIsIlNraXBOZXh0UGF5ZGF5IiwiU2tpcEhNTmV4dFBheWRheSIsIlNraXBCTU5leHRQYXlkYXkiLCJTdG9ja0luZm8iLCJTaGFyZUFtb3VudCIsIlBsYXllckRhdGEiLCJQbGF5ZXJOYW1lIiwiUGxheWVyVUlEIiwiQXZhdGFySUQiLCJJc0JvdCIsIk5vT2ZCdXNpbmVzcyIsIkNhcmRGdW5jdGlvbmFsaXR5IiwiSG9tZUJhc2VkQW1vdW50IiwiQnJpY2tBbmRNb3J0YXJBbW91bnQiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIk5vT2ZTdG9ja3MiLCJDYXNoIiwiR29sZENvdW50IiwiU3RvY2tDb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIkxhd3llclN0YXR1cyIsIklzQmFua3J1cHQiLCJCYW5rcnVwdEFtb3VudCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBsYXllclJvbGxDb3VudGVyIiwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZCIsImlzR2FtZUZpbmlzaGVkIiwiVG90YWxTY29yZSIsIkdhbWVPdmVyIiwiUm9sbENvdW50ZXIiLCJEaWNlVGVtcCIsIkRpY2VSb2xsIiwiSXNUd2VlbmluZyIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlR1cm5DaGVja0FycmF5IiwiQnVzaW5lc3NMb2NhdGlvbk5vZGVzIiwiUGFzc2VkUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiX25leHRUdXJuRG91YmxlUGF5IiwiX3NraXBOZXh0VHVybiIsIl9za2lwTmV4dFBheWRheSIsIl9za2lwSE1OZXh0UGF5ZGF5IiwiX3NraXBCTU5leHRQYXlkYXkiLCJDYXJkRXZlbnRSZWNlaXZlZCIsIlR1cm5JblByb2dyZXNzIiwiQmFja3NwYWNlcyIsImlzR2FtZU92ZXIiLCJPbmVRdWVzdGlvbkluZGV4IiwiT25lUXVlc3Rpb25zIiwiQ2FyZERpc3BsYXlTZXRUaW1vdXQiLCJHYW1lTWFuYWdlciIsIkNvbXBvbmVudCIsIlBsYXllckdhbWVJbmZvIiwiQm90R2FtZUluZm8iLCJQbGF5ZXJOb2RlIiwiTm9kZSIsIkNhbWVyYU5vZGUiLCJBbGxQbGF5ZXJVSSIsIkFsbFBsYXllck5vZGVzIiwiU3RhcnRMb2NhdGlvbk5vZGVzIiwiU2VsZWN0ZWRNb2RlIiwic3RhdGljcyIsIkluc3RhbmNlIiwiSW5wdXRUZXN0RGljZTEiLCJfdmFsIiwiSW5wdXRUZXN0RGljZTIiLCJvbkxvYWQiLCJUdXJuTnVtYmVyIiwiVHVybkNvbXBsZXRlZCIsIkNoZWNrUmVmZXJlbmNlcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRTZWxlY3RlZE1vZGUiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsImNvbnNvbGUiLCJlcnJvciIsIkNoZWNrU3BlY3RhdGUiLCJsb2ciLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIkFsbERhdGEiLCJNYXhQbGF5ZXJzIiwibGVuZ3RoIiwiU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyIiwiVXBkYXRlR2FtZVVJIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJHZXRUdXJuTnVtYmVyIiwiR2V0TXlJbmRleCIsIm15SW5kZXgiLCJfYWN0b3IiLCJQaG90b25BY3RvciIsImN1c3RvbVByb3BlcnRpZXMiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIl9hbGxBY3RvcnMiLCJpbmRleCIsIlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyIsIkFzc2lnblBsYXllckdhbWVVSSIsIkNsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJfdG9Qb3MiLCJWZWMyIiwiR2V0X1NwYWNlTWFuYWdlciIsIkRhdGEiLCJSZWZlcmVuY2VMb2NhdGlvbiIsInBvc2l0aW9uIiwieCIsInkiLCJzZXRQb3NpdGlvbiIsImFjdGl2ZSIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJUb3RhbENvbm5lY3RlZFBsYXllcnMiLCJteVJvb21BY3RvckNvdW50IiwidXNlcklEIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDaGFuZ2VUdXJuIiwiUmFpc2VFdmVudEZvckNhcmQiLCJfZGF0YSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiUmFpc2VFdmVudCIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJEaXNwbGF5Q2FyZE9uT3RoZXJzIiwiT25MYW5kZWRPblNwYWNlIiwic2V0VGltZW91dCIsIlJlc2V0Q2FyZERpc3BsYXkiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiUmFuZG9tQ2FyZCIsInJhbmRvbUNhcmQiLCJjb3VudGVyIiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIlN5bmNBbGxEYXRhIiwiUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlIiwiX3VpZCIsInB1c2giLCJBcnJheUxlbmd0aCIsIklERm91bmQiLCJUdXJuSGFuZGxlciIsIl90dXJuIiwiX3BsYXllck1hdGNoZWQiLCJUb2dnbGVUdXJuUHJvZ3Jlc3MiLCJUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24iLCJSZXNldFR1cm5WYXJpYWJsZSIsIlJvbGxEaWNlIiwiRGljZVJvbGxTY3JlZW4iLCJQbGF5ZXJJbmZvIiwiUm9vbUFjdG9ycyIsIlNob3dUb2FzdCIsIlRvZ2dsZVNraXBOZXh0VHVybiIsIl9pbmQiLCJNYWluU2Vzc2lvbkRhdGEiLCJNeURhdGEiLCJfY291bnRlciIsIlN0YXJ0VHVybiIsIkVuYWJsZVBsYXllck5vZGVzIiwiUmVjZWl2ZUJhbmtydXB0RGF0YSIsIl9pc0JhbmtydXB0ZWQiLCJiYW5rcnVwdGVkIiwidHVybiIsIl9wbGF5ZXJEYXRhIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiX3JhbmRvbUluZGV4IiwiZ2V0UmFuZG9tIiwiU2V0TmFtZSIsIl90b2dnbGVIaWdobGlnaHQiLCJfaW5kZXgiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzIiwidGFyZ2V0UG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicGFyZW50IiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJyYXRpbyIsIndpblNpemUiLCJoZWlnaHQiLCJ6b29tUmF0aW8iLCJsYXRlVXBkYXRlIiwic3luY0RpY2VSb2xsIiwiX3JvbGwiLCJfZGljZTEiLCJkaWNlMSIsIl9kaWNlMiIsImRpY2UyIiwiX3Jlc3VsdCIsIm15Um9vbUFjdG9yc0FycmF5IiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwiQW5pbWF0ZURpY2UiLCJEaWNlRnVudGlvbmFsaXR5IiwiX3BvcyIsIlR3ZWVuQ2FtZXJhIiwiVGVtcENoZWNrU3BhY2UiLCJfcm9sbGluZyIsInRlbXBjb3VudGVyIiwidGVtcGNvdW50ZXIyIiwiZGljZXRvYmUiLCJwYXJzZUludCIsIlNwYWNlRGF0YSIsIlNwYWNlc1R5cGUiLCJEaWNlMSIsIkRpY2UyIiwiX25ld1JvbGwiLCJSb2xsT25lRGljZSIsIlJvbGxUd29EaWNlcyIsImNhbGxVcG9uQ2FyZCIsIl9zcGFjZUlEIiwidmFsdWVJbmRleCIsIlNlbmRpbmdEYXRhIiwiY29tcGxldGVDYXJkVHVybiIsIkNhbGxHYW1lQ29tcGxldGUiLCJfaXNCb3QiLCJfcGxheWVySW5kZXgiLCJfY2FzaCIsIkhNQW1vdW50IiwiR2V0X0dhbWVNYW5hZ2VyIiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsImxvYW5BbW91bnQiLCJCTUNhc2giLCJITUNhc2giLCJUb3RhbEFzc2V0cyIsIlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUiLCJTeW5jR2FtZU92ZXIiLCJfVUlEIiwiUmVzdGFydEdhbWUiLCJTdGFydERpY2VSb2xsIiwiWm9vbUNhbWVyYU91dCIsInBsYXllcmNvbXBsZXRlZCIsIm1heCIsIlNlbGVjdGVkSW5kIiwiU2Vzc2lvbkRhdGEiLCJfdmFsdWUiLCJUd2VlblBsYXllciIsIm1pbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImlzWm9vbSIsInRpbWUiLCJ0d2VlbiIsInRvIiwidjIiLCJlYXNpbmciLCJjYWxsIiwiWm9vbUNhbWVyYUluIiwic3RhcnQiLCJDaGVja1BheURheUNvbmRpdGlvbnMiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIlRvZ2dsZVBheURheSIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIiwiVG9Qb3MiLCJfbmV3cG9zIiwiX3N0MSIsIl9TdDIiLCJFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iLCJhbW91bnQiLCJfbG9jYXRpb25OYW1lIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIlNldEJ1c2luZXNzSW5kZXgiLCJSZXNldEVkaXRCb3giLCJEZXN0cm95R2VuZXJhdGVkTm9kZXMiLCJkZXN0cm95IiwiVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiX1NoYXJlQW1vdW50IiwiX2lzQWRkaW5nIiwiX3N0b2NrIiwiX2lzRG91YmxlUGF5RGF5IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIl90aXRsZSIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbiIsIl9hbW91bnQiLCJfdUlEIiwiSUQiLCJSZWNlaXZlUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiX2lEIiwiX215SW5kZXgiLCJfc3RhdGUiLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJSZXR1cm5UdXJuUHJvZ3Jlc3MiLCJMb3NlQWxsTWFya2V0aW5nTW9uZXkiLCJfbG9zZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfbXVsdGlwbGllciIsIl9hbW91bnRJbmNyZWFzZWQiLCJHZXRNYXJrZXRpbmdNb25leSIsIl9wcm9maXQiLCJRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbiIsIl91c2VySUQiLCJVc2VySUQiLCJfcXVlc3Rpb25JbmRleCIsIlF1ZXN0aW9uIiwiVXNlckluZGV4IiwiX2dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX3F1ZXN0aW9uQXNrZWQiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uIiwiX2lzVHVybk92ZXIiLCJfbXlEYXRhIiwiX3Jvb21EYXRhIiwiVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIk9uZVF1ZXN0aW9uRGVjaXNpb25fUGF5QW1vdW50X09uZVF1ZXN0aW9uIiwiUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9BbnN3ZXJRdWVzdGlvbl9PbmVRdWVzdGlvbiIsIl9oYXNEb25lUGF5bWVudCIsIl9oYXNBbnN3ZXJlZFF1ZXN0aW9uIiwiX1VzZXJJRCIsIlBheW1lbnREb25lIiwiUXVlc3Rpb25BbnN3ZXJlZCIsIlF1ZXN0aW9uSW5kZXgiLCJSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbiIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX3NlbGVjdGVkUGxheWVySW5kZXgiLCJfYWN0b3JzRGF0YSIsIl9sb2FuVGFrZW4iLCJSZWNlaXZlR29CYWNrU3BhY2VzRGF0YV9zcGFjZUZ1bmN0aW9uYWxpdHkiLCJfc3BhY2VzIiwiYmFja3NwYWNlcyIsIkNvdW50ZXIiLCJUd2VlblBsYXllcl9Hb0JhY2tTcGFjZXMiLCJzcGVlZCIsIkdvQmFja1NwYWNlc19zcGFjZUZ1bmN0aW9uYWxpdHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBRyxLQUFkO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVB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enhEb0IsQ0E0eERyQjtBQUNBOztBQTd4RHFCLENBQVQsQ0FBaEIsRUEreERBOztBQUNBK0gsTUFBTSxDQUFDQyxPQUFQLEdBQWtCelMsV0FBbEIsRUFDQSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9pc1Rlc3QgPSBmYWxzZTtcclxudmFyIF9kaWNlaW5wdXQxID0gXCJcIjtcclxudmFyIF9kaWNlaW5wdXQyID0gXCJcIjtcclxuXHJcbi8vI3JlZ2lvbiBzdXBlcmNsYXNzZXMgYW5kIGVudW1lcmF0aW9uc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bUJ1c2luZXNzVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgSG9tZUJhc2VkOiAxLCAgICAgICAgICAgICAgICAgICAvL2EgYnVzaW5lc3MgdGhhdCB5b3Ugb3BlcmF0ZSBvdXQgb2YgeW91ciBob21lXHJcbiAgICBicmlja0FuZG1vcnRhcjogMiAgICAgICAgICAgICAgIC8vYSBzdG9yZSBmcm9udCBidXNpbmVzc1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzc0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzSW5mbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiQnVzaW5lc3NJbmZvXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOYW1lOiBcIkJ1c2luZXNzRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NUeXBlOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1vZGVcIixcclxuICAgICAgIHR5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICAgICBkZWZhdWx0OiBFbnVtQnVzaW5lc3NUeXBlLk5vbmUsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiQnVzaW5lc3MgY2F0b2dvcnkgZm9yIHBsYXllcnNcIix9LCBcclxuICAgIEJ1c2luZXNzVHlwZURlc2NyaXB0aW9uOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiVHlwZSAoYnkgbmFtZSkgb2YgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgQnVzaW5lc3NOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiTmFtZSBvZiB0aGUgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgIEFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJiYWxhbmNlIG9mIGJ1c2luZXNzXCIsfSxcclxuICAgICAgSXNQYXJ0bmVyc2hpcDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc1BhcnRuZXJzaGlwXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwdzpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgZG9uZSBwYXJ0bmVyc2hpcCB3aXRoIHNvbWVvbmUgd2l0aCBjdXJyZW50IGJ1c2luZXNzXCIsfSxcclxuICAgICAgIFBhcnRuZXJJRDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGFydG5lcklEXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB0b29sdGlwOiBcIklEIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLH0sXHJcbiAgICAgICBQYXJ0bmVyTmFtZTpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGFydG5lck5hbWVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICB0b29sdGlwOlwibmFtZSBvZiB0aGUgcGFydG5lciB3aXRoIHdob20gcGxheWVyIGhhcyBmb3JtZWQgcGFydG5lcnNoaXBcIix9LFxyXG4gICAgICAgIExvY2F0aW9uc05hbWU6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvY2F0aW9uc05hbWVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogW2NjLlRleHRdLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICB0b29sdGlwOlwiaWYgcGxheWVyIG93bnMgYnJpY2sgYW5kIG1vcnRhciBoZS9zaGUgY2FuIGV4cGFuZCB0byBuZXcgbG9jYXRpb25cIix9LFxyXG4gICAgICAgIExvYW5UYWtlbjpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hblRha2VuXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICAgICBMb2FuQW1vdW50OlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQW1vdW50XCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG5cclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIENhcmREYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkRGF0YUZ1bmN0aW9uYWxpdHkgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIkNhcmREYXRhRnVuY3Rpb25hbGl0eVwiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgTmV4dFR1cm5Eb3VibGVQYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTmV4dFR1cm5Eb3VibGVQYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIGl0cyBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG4gICAgU2tpcE5leHRUdXJuOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBOZXh0VHVyblwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgdHVybiBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgdHVybiBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG4gICAgU2tpcE5leHRQYXlkYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcE5leHRQYXlkYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHBheWRheSBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbiAgICBTa2lwSE1OZXh0UGF5ZGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBITU5leHRQYXlkYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgaG9tZSBiYXNlZCBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sXHJcbiAgICBTa2lwQk1OZXh0UGF5ZGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBCTU5leHRQYXlkYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgYnJpY2thIGFuZCBtbW9ydGFyIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbn0sXHJcblxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFN0b2NrSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3RvY2tJbmZvID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJTdG9ja0luZm9cIixcclxucHJvcGVydGllczogeyBcclxuICAgIE5hbWU6IFwiU3RvY2tEYXRhXCIsXHJcbiAgICBCdXNpbmVzc05hbWU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJuYW1lIG9mIHRoZSBidXNpbmVzcyBpbiB3aGljaCBzdG9ja3Mgd2lsbCBiZSBoZWxkXCIsfSwgXHJcbiAgICBTaGFyZUFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6IFwiU2hhcmVBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDogXCJTaGFyZSBhbW91bnQgb2YgdGhlIHN0b2NrXCIsfSxcclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yICBQbGF5ZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJQbGF5ZXJEYXRhXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBQbGF5ZXJOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllck5hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm5hbWUgb2YgdGhlIHBsYXllclwiLH0sXHJcbiAgICBQbGF5ZXJVSUQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyVUlEXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJJRCBvZiB0aGUgcGxheWVyXCIsfSxcclxuICAgIEF2YXRhcklEOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhcklEXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiaWQgcmVmZXJlbmNlIGZvciBwbGF5ZXIgYXZhdGFyIHNlbGVjdGlvblwiLH0sXHJcbiAgICBJc0JvdDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc0JvdFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cHc6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBjdXJyZW50IHBsYXllciBpcyBib3RcIix9LCBcclxuICAgIE5vT2ZCdXNpbmVzczpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1wiLFxyXG4gICAgICAgdHlwZTogW0J1c2luZXNzSW5mb10sXHJcbiAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJOdW1iZXIgb2YgYnVzaW5lc3MgYSBwbGF5ZXIgY2FuIG93blwiLH0sIFxyXG4gICAgQ2FyZEZ1bmN0aW9uYWxpdHk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FyZEZ1bmN0aW9uYWxpdHlcIixcclxuICAgICAgIHR5cGU6IENhcmREYXRhRnVuY3Rpb25hbGl0eSxcclxuICAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImNhcmQgZnVuY3Rpb25hbGl0eSBzdG9yZWQgYnkgcGxheWVyXCIsfSwgXHJcbiAgICBIb21lQmFzZWRBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJudW1iZXIgb2YgaG9tZSBiYXNlZCBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBCcmlja0FuZE1vcnRhckFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja0FuZE1vcnRhckFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibnVtYmVyIG9mIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLH0sIFxyXG4gICAgVG90YWxMb2NhdGlvbnNBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxMb2NhdGlvbnNBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm51bWJlciBvZiBsb2NhdGlvbnMgb2YgYWxsIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3Nlc3NcIix9LCBcclxuICAgIE5vT2ZTdG9ja3M6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU3RvY2tzXCIsXHJcbiAgICAgICB0eXBlOiBbU3RvY2tJbmZvXSxcclxuICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIk51bWJlciBvZiBzdG9jayBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBDYXNoOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgY2FzaCBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBHb2xkQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiR29sZENvdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiY291bnQgb2YgZ29sZCBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIFN0b2NrQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tDb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImNvdW50IG9mIHN0b2NrcyBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIExvYW5UYWtlbjpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyB0YWtlbiBsb2FuIGZyb20gYmFuayBvciBub3RcIix9LFxyXG4gICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBsb2FuIHRha2VuIGZyb20gdGhlIGJhbmtcIix9LFxyXG4gICAgTWFya2V0aW5nQW1vdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0Ftb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIm1hcmtldGluZyBhbW91bnQgYSBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBMYXd5ZXJTdGF0dXM6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTGF3eWVyU3RhdHVzXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgaGlyZWQgYSBsYXd5ZXIgb3Igbm90XCIsfSxcclxuICAgIElzQmFua3J1cHQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNCYW5rcnVwdFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGJlZW4gQmFua3J1cHRlZCBvciBub3RcIix9LFxyXG4gICAgQmFua3J1cHRBbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQmFua3J1cHRBbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGhvdyBtdWNoIHRpbWUgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcIix9LFxyXG4gICAgU2tpcHBlZExvYW5QYXltZW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBwZWRMb2FuUGF5bWVudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHNraXBwZWQgbG9hbiBwYXltZW50XCIsfSxcclxuICAgIFBsYXllclJvbGxDb3VudGVyOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclJvbGxDb3VudGVyXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciB0byBzdG9yZSByb2xsIGNvdW50b3IgZm9yIHBsYXllclwiLH0sXHJcbiAgICBJbml0aWFsQ291bnRlckFzc2lnbmVkOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkluaXRpYWxDb3VudGVyQXNzaWduZWRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgaXNHYW1lRmluaXNoZWQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcImlzR2FtZUZpbmlzaGVkXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICBUb3RhbFNjb3JlOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbFNjb3JlXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgR2FtZU92ZXI6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkdhbWVPdmVyXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxufSxcclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxuXHJcbn0pO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiBHYW1lIE1hbmFnZXIgQ2xhc3NcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKG1haW4gY2xhc3MpIGNsYXNzIGZvciBHYW1lIE1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvbGxDb3VudGVyPTA7XHJcbnZhciBEaWNlVGVtcD0wO1xyXG52YXIgRGljZVJvbGw9MDtcclxudmFyIElzVHdlZW5pbmc9ZmFsc2U7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFR1cm5DaGVja0FycmF5PVtdO1xyXG52YXIgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG5cclxudmFyIFBhc3NlZFBheURheT1mYWxzZTtcclxudmFyIERvdWJsZVBheURheT1mYWxzZTtcclxuXHJcbi8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG52YXIgX25leHRUdXJuRG91YmxlUGF5PWZhbHNlO1xyXG52YXIgX3NraXBOZXh0VHVybj1mYWxzZTtcclxudmFyIF9za2lwTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxudmFyIF9za2lwSE1OZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBfc2tpcEJNTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG52YXIgVHVybkluUHJvZ3Jlc3M9ZmFsc2U7XHJcblxyXG52YXIgQmFja3NwYWNlcz0zO1xyXG52YXIgaXNHYW1lT3Zlcj1mYWxzZTtcclxudmFyIE9uZVF1ZXN0aW9uSW5kZXg9LTE7XHJcbnZhciBPbmVRdWVzdGlvbnM9XHJcbltcclxuICAgIFwieW91IGhhdmUgc2tpcHBlZCBsb2FuIHByZXZpb3VzIHBheWRheT9cIixcclxuICAgIFwieW91IGhhdmUgdGFrZW4gYW55IGxvYW4/XCIsXHJcbiAgICBcInlvdSBoYXZlIGJhbmtydXB0ZWQgZXZlcj9cIixcclxuICAgIFwieW91ciBuZXh0IHR1cm4gaXMgZ29pbmcgdG8gYmUgc2tpcHBlZD9cIixcclxuICAgIFwieW91ciBuZXh0IHBheWRheSBpcyBnb2luZyB0byBiZSBkb3VibGUgcGF5ZGF5P1wiXHJcbl07XHJcblxyXG52YXIgQ2FyZERpc3BsYXlTZXRUaW1vdXQ9bnVsbDtcclxuXHJcbnZhciBHYW1lTWFuYWdlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiR2FtZU1hbmFnZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBQbGF5ZXJHYW1lSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBwbGF5ZXIncyBkYXRhXCJ9LFxyXG4gICAgICAgIEJvdEdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIGJvdCdzIGRhdGFcIn0sXHJcbiAgICAgICAgUGxheWVyTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgcGxheWVyXCIsfSwgICAgXHJcbiAgICAgICAgQ2FtZXJhTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgY2FtZXJhXCIsfSwgICAgXHJcbiAgICAgICAgQWxsUGxheWVyVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2YgdWkgb2YgYWxsIHBsYXllcnNcIix9LCAgICAgIFxyXG4gICAgICAgIEFsbFBsYXllck5vZGVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIG9mIG5vZGUgb2YgYWxsIHBsYXllcnMgaW5zaWRlIGdhbWVwbGF5XCIsfSwgICBcclxuICAgICAgICBTdGFydExvY2F0aW9uTm9kZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2YgYXR0YXkgb2YgbG9jYXRpb25zXCIsfSwgICBcclxuICAgICAgICAgU2VsZWN0ZWRNb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6MCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHJlZmVyZW5jZSBmb3IgZ2FtZSBtb2RlIDEgbWVhbnMgYm90IGFuZCAyIG1lYW5zIHJlYWwgcGxheWVyc1wiLFxyXG4gICAgICAgIH0sICBcclxuICAgIH0sXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgUGxheWVyRGF0YTogUGxheWVyRGF0YSxcclxuICAgICAgICBCdXNpbmVzc0luZm86QnVzaW5lc3NJbmZvLFxyXG4gICAgICAgIEVudW1CdXNpbmVzc1R5cGU6RW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgICBJbnN0YW5jZTpudWxsXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBJbnB1dFRlc3REaWNlMShfdmFsKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChfaXNUZXN0KSB7XHJcbiAgICAgICAgICAgIF9kaWNlaW5wdXQxID0gX3ZhbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIElucHV0VGVzdERpY2UyKF92YWwpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKF9pc1Rlc3QpIHtcclxuICAgICAgICAgICAgX2RpY2VpbnB1dDIgPSBfdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyNyZWdpb24gQWxsIEZ1bmN0aW9ucyBvZiBHYW1lTWFuYWdlclxyXG4gICAgXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIGNsYXNzIGlzIGNyZWF0ZWRcclxuICAgIEBtZXRob2Qgb25Mb2FkXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLkluc3RhbmNlPXRoaXM7XHJcbiAgICAgICAgdGhpcy5UdXJuTnVtYmVyPTA7XHJcbiAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkPWZhbHNlO1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgdGhpcy5TZWxlY3RlZE1vZGU9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuICAgICAgICB0aGlzLkluaXRfR2FtZU1hbmFnZXIoKTsgICBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLlJhbmRvbUNhcmRJbmRleD0wO1xyXG4gICAgICAgIHRoaXMuQ2FyZENvdW50ZXI9MDtcclxuICAgICAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9ZmFsc2U7XHJcbiAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9ZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiByZWZlcmVuY2Ugb2YgcmVxdWlyZWQgY2xhc3Nlc1xyXG4gICAgQG1ldGhvZCBDaGVja1JlZmVyZW5jZXNcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgaW5pdGlhbCBnYW1lbWFuYWdlciBlc3NldGlhbHNcclxuICAgIEBtZXRob2QgSW5pdF9HYW1lTWFuYWdlclxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgSW5pdF9HYW1lTWFuYWdlciAoKSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmE9dGhpcy5DYW1lcmFOb2RlLmdldENvbXBvbmVudChjYy5DYW1lcmEpO1xyXG4gICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm89W107XHJcbiAgICAgICAgUm9sbENvdW50ZXI9MDtcclxuICAgICAgICBEaWNlVGVtcD0wO1xyXG4gICAgICAgIERpY2VSb2xsPTA7ICBcclxuXHJcbiAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2lmIGpvaW5lZCBwbGF5ZXIgaXMgc3BlY3RhdGVcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCk9PXRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3RhdHVzIG9mIGluaXRpYWwgYnVzaW5lc3Mgc2V0cDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKSk7XHJcbiAgICAgICAgICAgICAgICAvL2lmIGluaXRhbCBzZXR1cCBoYXMgYmVlbiBkb25lIGFuZCBnYW1lIGlzIHVuZGVyIHdheVxyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBBbGxEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvPUFsbERhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM9dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHVybk51bWJlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSxmYWxzZSx0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkgLy9nYW1lIGlzIGJlaW5nIHBsYXllZCBieSBib3QgYWxvbmcgd2l0aCBvbmUgcGxheWVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsZmFsc2UsdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8jcmVnaW9uIHB1YmxpYyBmdW5jdGlvbnMgdG8gZ2V0IGRhdGEgKGFjY2Vzc2libGUgZnJvbSBvdGhlciBjbGFzc2VzKVxyXG4gICAgR2V0VHVybk51bWJlciAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVHVybk51bWJlcjtcclxuICAgIH0sXHJcblxyXG4gICAgR2V0TXlJbmRleCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG15SW5kZXggPSAwO1xyXG4gICAgICAgIHZhciBfYWN0b3IgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICB2YXIgX2FsbEFjdG9ycyA9IHRoaXMuUGxheWVyR2FtZUluZm87XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWxsQWN0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgaWYgKF9hY3Rvci5QbGF5ZXJVSUQgPT0gX2FsbEFjdG9yc1tpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG15SW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBteUluZGV4O1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vI3JlZ2lvbiBTcGVjdGF0ZU1vZGUgQ29kZVxyXG5cclxuICAgIFN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIEFsbERhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm89QWxsRGF0YTtcclxuICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM9dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsX3RvUG9zLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzeW5jZWQgcGxheWVybm9kZXNcIik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKClcclxuICAgIHtcclxuICAgICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yQ291bnQoKTtcclxuICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT1Ub3RhbENvbm5lY3RlZFBsYXllcnMpXHJcbiAgICAgIHtcclxuICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBmdW5jdGlvbnMgcmVsYXRlZCB0byBUdXJuIE1lY2hhbmlzbSBhbmQgY2FyZCBtZWNoYW5pc21cclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSB3aGF0IGNhcmQgaGFzIGJlZW4gc2VsZWN0ZWQgYnkgcGxheWVyXHJcbiAgICBAbWV0aG9kIFJhaXNlRXZlbnRGb3JDYXJkXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmFpc2VFdmVudEZvckNhcmQoX2RhdGEpXHJcbiAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNSxfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJEaXNwbGF5VGltZW91dCgpXHJcbiAge1xyXG4gICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICB9LFxyXG5cclxuICBEaXNwbGF5Q2FyZE9uT3RoZXJzKClcclxuICB7XHJcbiAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKSAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG4gICAgICAgIGlmKENhcmRFdmVudFJlY2VpdmVkPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLkNhcmRDb3VudGVyKTtcclxuICAgICAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLkNhcmREaXNwbGF5ZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuQ2FyZENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKGZhbHNlLHRoaXMuUmFuZG9tQ2FyZEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDYXJkRGlzcGxheVNldFRpbW91dD1zZXRUaW1lb3V0KCgpID0+IHsgLy9jaGVjayBhZnRlciBldmVyeSAwLjUgc2Vjb25kc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EaXNwbGF5Q2FyZE9uT3RoZXJzKCk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRDYXJkRGlzcGxheSgpXHJcbiAge1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpXHJcbiAge1xyXG5cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcblxyXG4gICAgdmFyIFJhbmRvbUNhcmQ9X2RhdGEucmFuZG9tQ2FyZDtcclxuICAgIHZhciBjb3VudGVyPV9kYXRhLmNvdW50ZXI7XHJcblxyXG4gICAgdGhpcy5SYW5kb21DYXJkSW5kZXg9UmFuZG9tQ2FyZDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXI9Y291bnRlcjtcclxuXHJcbiAgIFxyXG4gICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcblxyXG4gICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLk9uTGFuZGVkT25TcGFjZSh0cnVlLFJhbmRvbUNhcmQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9dHJ1ZTtcclxuICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdD09ZmFsc2UpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLk9uTGFuZGVkT25TcGFjZSh0cnVlLFJhbmRvbUNhcmQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKGZhbHNlLFJhbmRvbUNhcmQsdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcblxyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSBwYXJ0aWN1bGFyIHBsYXllciBoYXMgY29tcGxldGUgdGhlaXIgbW92ZVxyXG4gICAgQG1ldGhvZCBSYWlzZUV2ZW50VHVybkNvbXBsZXRlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpXHJcbiAge1xyXG4gICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAge1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg0LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKVxyXG4gICAgICB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVhaXNlZCBmb3IgdHVybiBjb21wbGV0ZVwiKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRCk7XHJcbiAgICAgIH1cclxuICB9LFxyXG5cclxuXHJcbiAgU3luY0FsbERhdGEoKVxyXG4gIHtcclxuICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICB9ICBcclxufSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgb24gYWxsIHBsYXllcnMgdG8gdmFsaWRhdGUgaWYgbW92ZSBpcyBjb21wbGV0ZWQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzXHJcbiAgICBAbWV0aG9kIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZShfdWlkKVxyXG4gIHtcclxuICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9yZWFsIHBsYXllcnNcclxuICAgICAge1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5Lmxlbmd0aD09MClcclxuICAgICAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpOyBcclxuXHJcbiAgICAgICAgICAgIHZhciBBcnJheUxlbmd0aD1UdXJuQ2hlY2tBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBJREZvdW5kPWZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQXJyYXlMZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihUdXJuQ2hlY2tBcnJheVtpbmRleF09PV91aWQpXHJcbiAgICAgICAgICAgICAgICAgICAgSURGb3VuZD10cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighSURGb3VuZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgICAgICAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PVRvdGFsQ29ubmVjdGVkUGxheWVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHVybkNoZWNrQXJyYXk9W107XHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgIH1cclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBkaWNlIGFuaW1hdGlvbiBpcyBwbGF5ZWQgb24gYWxsIHBsYXllcnNcclxuICAgIEBtZXRob2QgQ2hhbmdlVHVyblxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ2hhbmdlVHVybigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLlR1cm5OdW1iZXI8dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgtMSlcclxuICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPXRoaXMuVHVybk51bWJlcisxO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPTA7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMix0aGlzLlR1cm5OdW1iZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBmcm9tIHJhaXNlIG9uIGV2ZW50IChmcm9tIGZ1bmN0aW9uIFwiU3RhcnRUdXJuXCIgYW5kIFwiQ2hhbmdlVHVyblwiIG9mIHRoaXMgc2FtZSBjbGFzcykgdG8gaGFuZGxlIHR1cm5cclxuICAgIEBtZXRob2QgVHVybkhhbmRsZXJcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIFR1cm5IYW5kbGVyKF90dXJuKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUdXJuOiBcIitfdHVybik7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJNYXRjaGVkPWZhbHNlO1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49ZmFsc2U7XHJcbiAgICAgICAgaWYoSXNUd2VlbmluZykgLy9jaGVjayBpZiBhbmltYXRpb24gb2YgdHVybiBiZWluZyBwbGF5ZWQgb24gb3RoZXIgcGxheWVycyBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuSGFuZGxlcihfdHVybik7XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVHVybk51bWJlcj1fdHVybjtcclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBfcGxheWVyTWF0Y2hlZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9za2lwTmV4dFR1cm49dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZighX3NraXBOZXh0VHVybilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90PT1mYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBfcGxheWVyTWF0Y2hlZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9za2lwTmV4dFR1cm49dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZighX3NraXBOZXh0VHVybilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlLy90dXJuIGRlY2lzaW9ucyBmb3IgYm90XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NraXBOZXh0VHVybj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFfc2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJvbGxEaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIix0aGlzLlR1cm5OdW1iZXIsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlR1cm4gT2Y6IFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQWxsUGxheWVyVUlbdGhpcy5UdXJuTnVtYmVyXS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuUGxheWVySW5mbyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PXRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9za2lwIHRoaXMgdHVybiBhcyBza2lwIHR1cm4gaGFzIGJlZW4gY2FsbGVkIGJlZm9yZVxyXG4gICAgICAgICAgICBpZihfcGxheWVyTWF0Y2hlZCAmJiBfc2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIGN1cnJlbnQgdHVyblwiLDEyMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVTa2lwTmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKF9wbGF5ZXJNYXRjaGVkICYmIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9pbmQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgICAgICB2YXIgTXlEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgICAgICB2YXIgX2NvdW50ZXI9X2luZDtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEIT1NeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpIC8vZG9udCB1cGRhdGUgbXkgb3duIGRhdGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl0uUGxheWVyVUlEPT1NYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfY291bnRlcl09TWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX2NvdW50ZXI8dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkaW5nIGNvdW50ZXI6IFwiK19jb3VudGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKF9jb3VudGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoX2NvdW50ZXI8dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgtMSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkaW5nIGNvdW50ZXI6IFwiK19jb3VudGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgfSwgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gYWxsIHBsYXllcnMgaGF2ZSBkb25lIHRoZWlyIGluaXRpYWwgc2V0dXAgYW5kIGZpcnN0IHR1cm4gc3RhcnRzXHJcbiAgICBAbWV0aG9kIFN0YXJ0VHVyblxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgU3RhcnRUdXJuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXMoKTtcclxuICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDsgLy9yZXNldGluZyB0aGUgdHVybiBudW1iZXIgb24gc3RhcnQgb2YgdGhlIGdhbWVcclxuXHJcbiAgICAgICAgLy9zZW5kaW5nIGluaXRpYWwgdHVybiBudW1iZXIgb3ZlciB0aGUgbmV0d29yayB0byBzdGFydCB0dXJuIHNpbXVsdGFub3VzbHkgb24gYWxsIGNvbm5lY3RlZCBwbGF5ZXIncyBkZXZpY2VzXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLHRoaXMuVHVybk51bWJlcik7XHJcbiAgICAgICAgXHJcbiAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBSZWNlaXZlQmFua3J1cHREYXRhKF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIC8vb3RoZXIgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcclxuICAgICAgICB2YXIgX2lzQmFua3J1cHRlZD1fZGF0YS5EYXRhLmJhbmtydXB0ZWQ7XHJcbiAgICAgICAgdmFyIF90dXJuPV9kYXRhLkRhdGEudHVybjtcclxuICAgICAgICB2YXIgX3BsYXllckRhdGE9X2RhdGEuRGF0YS5QbGF5ZXJEYXRhTWFpbjtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKF9pc0JhbmtydXB0ZWQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKF90dXJuKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhfcGxheWVyRGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3R1cm5dPV9wbGF5ZXJEYXRhO1xyXG5cclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLkVuYWJsZVBsYXllck5vZGVzKHRydWUpO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIix0aGlzLlR1cm5OdW1iZXIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT10cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXModHJ1ZSk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIix0aGlzLlR1cm5OdW1iZXIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuICAgICAgICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT10cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBGdW5jdGlvbiBmb3IgZ2FtZXBsYXlcclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcGxheWVyIFVJIChuYW1lL2ljb25zL251bWJlciBvZiBwbGF5ZXJzIHRoYXQgdG8gYmUgYWN0aXZlIGV0YylcclxuICAgIEBtZXRob2QgQXNzaWduUGxheWVyR2FtZVVJXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBBc3NpZ25QbGF5ZXJHYW1lVUkoX2lzQmFua3J1cHRlZD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkgLy9mb3IgYm90XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighX2lzQmFua3J1cHRlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9yYW5kb21JbmRleD10aGlzLmdldFJhbmRvbSgwLHRoaXMuQm90R2FtZUluZm8ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mby5wdXNoKHRoaXMuQm90R2FtZUluZm9bX3JhbmRvbUluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM9MjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlR2FtZVVJKF90b2dnbGVIaWdobGlnaHQsX2luZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGlmKF90b2dnbGVIaWdobGlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW19pbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tfaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoX2luZGV4PT1pbmRleClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlQkdIaWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVUZXh0aWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBlbmJhbGUgcmVzcGVjdGl2ZSBwbGF5ZXJzIG5vZGVzIGluc2lkZSBnYW1hcGxheVxyXG4gICAgQG1ldGhvZCBFbmFibGVQbGF5ZXJOb2Rlc1xyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgRW5hYmxlUGxheWVyTm9kZXMoX2lzQmFua3J1cHRlZD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZighX2lzQmFua3J1cHRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uSG9tZUJhc2VkQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkhvbWVCYXNlZEFtb3VudD09MSkgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ccmlja0FuZE1vcnRhckFtb3VudD09MSkgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi54LHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0YXJnZXRQb3M9dGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsMTIwKSk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmFOb2RlLnBvc2l0aW9uPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgXHJcbiAgICAgICAgbGV0IHJhdGlvPXRhcmdldFBvcy55L2NjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz0yO1xyXG4gICAgfSxcclxuXHJcbiAgICBsYXRlVXBkYXRlICgpIHtcclxuICAgICAgICBpZih0aGlzLmlzQ2FtZXJhWm9vbWluZykgICAgXHJcbiAgICAgICAgICAgIHRoaXMuU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzeW5jRGljZVJvbGwoX3JvbGwpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9kaWNlMT1fcm9sbC5kaWNlMTtcclxuICAgICAgICB2YXIgX2RpY2UyPV9yb2xsLmRpY2UyO1xyXG4gICAgICAgIHZhciBfcmVzdWx0PV9kaWNlMStfZGljZTI7XHJcblxyXG4gICAgICAgIElzVHdlZW5pbmc9dHJ1ZTtcclxuICAgICAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9ZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPT0wICYmICF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlPT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPTEzO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPT0xMilcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIrMjE7ICBcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcisxO1xyXG5cclxuICAgICAgICAgICAgUm9sbENvdW50ZXI9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgRGljZVJvbGw9X3Jlc3VsdDtcclxuICAgICAgICBEaWNlVGVtcD0wO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5QcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24oRGljZVJvbGwpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5UdXJuTnVtYmVyPT1pbmRleClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5nZXRDb21wb25lbnQoXCJEaWNlQ29udHJvbGxlclwiKS5BbmltYXRlRGljZShfZGljZTEsX2RpY2UyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIC8vIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgICAgICAvLyB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsdHJ1ZSwwLjQpOyAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBEaWNlRnVudGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgICAgICB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsdHJ1ZSwwLjQpOyAgXHJcbiAgICB9LFxyXG5cclxuICAgIFRlbXBDaGVja1NwYWNlKF9yb2xsaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1wY291bnRlcj0wO1xyXG4gICAgICAgIHZhciB0ZW1wY291bnRlcjI9MDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQ9PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJwbGF5ZXIgbWF0Y2hlZDpcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wY291bnRlcjI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIGlmKHRlbXBjb3VudGVyMi0xPDApXHJcbiAgICAgIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwic3RhcnRpbmcgZnJvbSBvYmxpdmlvblwiKTtcclxuICAgICAgICB0ZW1wY291bnRlcj10ZW1wY291bnRlcjIrX3JvbGxpbmctMTtcclxuICAgICAgICB2YXIgZGljZXRvYmU9cGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwidG8gYmU6IFwiK2RpY2V0b2JlKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICB0ZW1wY291bnRlcj10ZW1wY291bnRlcjIrX3JvbGxpbmc7XHJcbiAgICAgICAgdmFyIGRpY2V0b2JlPXBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIitkaWNldG9iZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxEaWNlOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgRGljZTE7XHJcbiAgICAgICAgdmFyIERpY2UyO1xyXG4gICAgICAgIGlmIChfaXNUZXN0ICYmIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdD09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaWNlMSA9IHBhcnNlSW50KF9kaWNlaW5wdXQxKTtcclxuICAgICAgICAgICAgRGljZTIgPSBwYXJzZUludChfZGljZWlucHV0Mik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCA9PSB0cnVlICYmIF9pc1Rlc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaWNlMSA9IDE7XHJcbiAgICAgICAgICAgIERpY2UyID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuICAgICAgICAgICAgRGljZTI9dGhpcy5nZXRSYW5kb20oMSw3KTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgICBcclxuXHJcbiAgICAgICAgLy8gdmFyIERpY2UxPTIwO1xyXG4gICAgICAgIC8vIHZhciBEaWNlMj0xO1xyXG5cclxuICAgICAgICBEaWNlUm9sbD1EaWNlMStEaWNlMjtcclxuICAgICAgICB2YXIgX25ld1JvbGw9e2RpY2UxOkRpY2UxLGRpY2UyOkRpY2UyfVxyXG4gICAgICAgIC8vRGljZVJvbGw9MjM7XHJcbiAgICAgICAgLy90aGlzLlRlbXBDaGVja1NwYWNlKERpY2VSb2xsKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRpY2UgbnVtYmVyOiBcIitEaWNlUm9sbCtcIiwgRGljZTE6XCIrRGljZTErXCIsIERpY2UyOlwiK0RpY2UyKTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgzLF9uZXdSb2xsKTsgXHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxPbmVEaWNlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuICAgICAgICByZXR1cm4gRGljZTE7XHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxUd29EaWNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgdmFyIERpY2UyPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgcmV0dXJuIChEaWNlMStEaWNlMik7XHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGxVcG9uQ2FyZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9zcGFjZUlEPXBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgIGlmKF9zcGFjZUlEIT02ICYmIF9zcGFjZUlEIT03KSAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVuYXMgc2VsbCBzcGFjZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIFJhbmRvbUNhcmQ9dGhpcy5nZXRSYW5kb20oMCwxNSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2ZvciB0ZXN0aW5nIG9ubHlcclxuICAgICAgICAgICAgaWYoX3NwYWNlSUQ9PTIpIC8vbGFuZGVkIG9uIHNvbWUgYmlnIGJ1c2VpbnNzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNywxMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw0KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKF9zcGFjZUlEPT01KSAvL2xhbmRlZCBvbiBzb21lIGxvc3NlcyBjYXJkc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleD1bMCwxLDUsNiwyLDcsMyw0LDgsOV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCwxMCk7XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgLy9SYW5kb21DYXJkID0gOTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKF9zcGFjZUlEPT0zKSAvL2xhbmRlZCBvbiBzb21lIG1hcmtldGluZyBjYXJkc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleD1bMCw3LDMsOCwxMyw5XTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleD10aGlzLmdldFJhbmRvbSgwLDYpO1xyXG4gICAgICAgICAgICAgICAgUmFuZG9tQ2FyZD12YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxzZSBpZihfc3BhY2VJRD09MSkgLy9sYW5kZWQgb24gc29tZSB3aWxkIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNiwxMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw0KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikgLy9mb3IgcmVhbCBwbGF5ZXJcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YT17XCJyYW5kb21DYXJkXCI6UmFuZG9tQ2FyZCxcImNvdW50ZXJcIjpSb2xsQ291bnRlcn07ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkgLy9mb3IgYm90XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YT17XCJyYW5kb21DYXJkXCI6UmFuZG9tQ2FyZCxcImNvdW50ZXJcIjpSb2xsQ291bnRlcn07ICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcGxldGVDYXJkVHVybigpXHJcbiAgICB7XHJcbiAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2FsbEdhbWVDb21wbGV0ZShfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX2lzQm90PT1mYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PXRoaXMuVHVybk51bWJlcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD09ZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLmlzR2FtZUZpbmlzaGVkPXRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfY2FzaD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgSE1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBCTUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYW5BbW91bnQrPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBCTUNhc2g9KEJNQW1vdW50K0JNTG9jYXRpb25zKSoxNTAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBITUNhc2g9MDtcclxuICAgICAgICAgICAgICAgICAgICBpZihITUFtb3VudD09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTYwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoSE1BbW91bnQ9PTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD0yNTAwMCs2MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArMjUwMDArNjAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBUb3RhbEFzc2V0cz1fY2FzaCtCTUNhc2grSE1DYXNoLWxvYW5BbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbFNjb3JlPVRvdGFsQXNzZXRzO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD10aGlzLlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD09ZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfY2FzaD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaDtcclxuICAgICAgICAgICAgICAgIHZhciBITUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIEJNQW1vdW50PXRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBCTUxvY2F0aW9ucz10aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hbkFtb3VudCs9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBCTUNhc2g9KEJNQW1vdW50K0JNTG9jYXRpb25zKSoxNTAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBITUNhc2g9MDtcclxuICAgICAgICAgICAgICAgICAgICBpZihITUFtb3VudD09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTYwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoSE1BbW91bnQ9PTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD0yNTAwMCs2MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArMjUwMDArNjAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBUb3RhbEFzc2V0cz1fY2FzaCtCTUNhc2grSE1DYXNoLWxvYW5BbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbFNjb3JlPVRvdGFsQXNzZXRzOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgIFJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoX2RhdGEpXHJcbiAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDYsX2RhdGEpO1xyXG4gICB9LFxyXG5cclxuICAgU3luY0dhbWVPdmVyKF9VSUQpXHJcbiAgIHtcclxuICAgIFxyXG4gICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgICAgICB2YXIgTXlEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyPXRydWU7XHJcblxyXG4gICAgICAgIGlmKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRD09X1VJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IHdvblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoOiBcIitNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlK1wiXFxuXCIrJ1xcbicrXHJcbiAgICAgICAgICAgICAgICBcIkNvbmdyYXRzISB5b3VyIGNhc2ggaXMgaGlnaGVzdCwgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiK1wiXFxuXCIrJ1xcbicrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAgICAgMTUwMDBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoOiBcIitNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlK1wiXFxuXCIrJ1xcbicrXHJcbiAgICAgICAgICAgICAgICBcInVuZm9ydHVuYXRlbHkgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIDE1MDAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIH0sIDE1MDYwKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpLy93aXRoIGJvdFxyXG4gICAge1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICB2YXIgTXlEYXRhPXRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1swXS5HYW1lT3Zlcj10cnVlO1xyXG5cclxuICAgICAgICBpZihNeURhdGEuUGxheWVyVUlEPT1fVUlEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy95b3Ugd29uXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsIENhc2g6IFwiK015RGF0YS5Ub3RhbFNjb3JlK1wiXFxuXCIrJ1xcbicrXHJcbiAgICAgICAgICAgICAgICBcIkNvbmdyYXRzISB5b3VyIGNhc2ggaXMgaGlnaGVzdCwgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiK1wiXFxuXCIrJ1xcbicrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAgICAgMTUwMDBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoOiBcIitNeURhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJ1bmZvcnR1bmF0ZWx5IHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCIrXCJcXG5cIisnXFxuJytcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJHYW1lIHdpbGwgYmUgcmVzdGFydGVkIGF1dG9tYXRjYWxseSBhZnRlciAxNSBzZWNvbmRzXCIsXHJcbiAgICAgICAgICAgICAgICAxNTAwMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICAgICAgICB9LCAxNTA2MCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgfSxcclxuXHJcbiAgICBTdGFydERpY2VSb2xsOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZihSb2xsQ291bnRlcj49R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZW92ZXJcIik7XHJcbiAgICAgICAgICAgIGlzR2FtZU92ZXI9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwbGF5ZXJjb21wbGV0ZWQ9MDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuaXNHYW1lRmluaXNoZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXllcmNvbXBsZXRlZD09dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF4PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBTZWxlY3RlZEluZD0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKF92YWx1ZSA+IG1heClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RlZEluZD1pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9X3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIrU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dhbWUgY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1zXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vZm9yIGJvdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyY29tcGxldGVkPTA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YT10aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYocGxheWVyY29tcGxldGVkPT10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heD0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQ9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFNlc3Npb25EYXRhPXRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdmFsdWUgPiBtYXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWRJbmQ9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PV92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIHdvbiBieSBwbGF5ZXIgaWQ6IFwiK1Nlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dhbWUgY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1zXHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGljZVRlbXA9RGljZVRlbXArMTsgXHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgdGhpcy5Ud2VlblBsYXllcih0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFJhbmRvbTpmdW5jdGlvbihtaW4sbWF4KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSApICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gICAgfSxcclxuXHJcbiAgICBUd2VlbkNhbWVyYTogZnVuY3Rpb24gKF9wb3MsIGlzWm9vbSx0aW1lKSB7ICAgXHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5DYW1lcmFOb2RlKVxyXG4gICAgICAgIC50byh0aW1lLCB7IHBvc2l0aW9uOiBjYy52MihfcG9zLngsIF9wb3MueSl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmKGlzWm9vbSlcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFpvb21DYW1lcmFJbiAoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICBpZih0aGlzLkNhbWVyYS56b29tUmF0aW88MilcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz10aGlzLkNhbWVyYS56b29tUmF0aW8rMC4wMztcclxuICAgICAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIDEwKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tQYXlEYXlDb25kaXRpb25zKF9pc0JvdD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpPT02KVxyXG4gICAgICAgICAgICBQYXNzZWRQYXlEYXk9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBpZihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpPT03KVxyXG4gICAgICAgICAgICBEb3VibGVQYXlEYXk9dHJ1ZTtcclxuXHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheTtcclxuICAgICAgICBpZihQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSAmJiAhX25leHRUdXJuRG91YmxlUGF5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSxfaXNCb3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKChEb3VibGVQYXlEYXkpIHx8IChQYXNzZWRQYXlEYXkgJiYgX25leHRUdXJuRG91YmxlUGF5KSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24odHJ1ZSxfaXNCb3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgWm9vbUNhbWVyYU91dCAoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ2FtZXJhLnpvb21SYXRpbz49MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz1mYWxzZTtcclxuICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPXRoaXMuQ2FtZXJhLnpvb21SYXRpby0wLjAzO1xyXG4gICAgICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbj1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MTtcclxuXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKDApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZighaXNHYW1lT3ZlcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikgLy9yZWFsIHBsYXllclxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKSAvL2JvdFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAvLyBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3Q9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnModGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuUGxheWVyOiBmdW5jdGlvbiAoTm9kZSxUb1Bvcykge1xyXG4gICAgICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgICAgLnRvKDAuNCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmKERpY2VUZW1wPERpY2VSb2xsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIWlzR2FtZU92ZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpLy9mb3IgYm90XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NilcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5PXRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKFJvbGxDb3VudGVyPT0xMilcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPVJvbGxDb3VudGVyKzIxOyAgXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPVJvbGxDb3VudGVyKzE7XHJcblxyXG4gICAgICAgICAgICAvL0RpY2VUZW1wPURpY2VUZW1wKzE7IFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhEaWNlVGVtcCtcIiBcIitSb2xsQ291bnRlcik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgLy90aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfbmV3cG9zPWNjLlZlYzIoMCwwKTtcclxuICAgICAgICAgICAgdGhpcy5Ud2VlbkNhbWVyYShfbmV3cG9zLGZhbHNlLDAuNik7IC8vem9vbW91dFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9ydWxlcyBpbXBsbWVudGF0aW9uIGR1cmluZyB0dXJuICh0dXJuIGRlY2lzaW9ucylcclxuXHJcbiAgICBUb2dnbGVQYXlEYXkoX3N0MSxfU3QyKVxyXG4gICAge1xyXG4gICAgICAgIFBhc3NlZFBheURheT1fc3QxO1xyXG4gICAgICAgIERvdWJsZVBheURheT1fU3QyO1xyXG4gICAgfSxcclxuXHJcbiAgICBFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oYW1vdW50LF9pbmRleCxfbG9jYXRpb25OYW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoPj1hbW91bnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaC1hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQrMTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUucHVzaChfbG9jYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLDEwMDApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgICB9LCAxMjAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoIHRvIGV4cGFuZCB0aGlzIGJ1c2luZXNzLCBjYXNoIG5lZWRlZCAkIFwiK2Ftb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbigpXHJcbiAgICB7XHJcbiAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYocGFyc2VJbnQodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc1R5cGUpPT0yKSAvL3RoaXMgbWVhbnMgdGhlcmUgaXMgYnJpY2sgYW5kIG1vcnRhciBpbiBsaXN0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0QnVzaW5lc3NJbmRleChpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5SZXNldEVkaXRCb3goKTtcclxuICAgICAgICAgICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhCdXNpbmVzc0xvY2F0aW9uTm9kZXMpO1xyXG4gICAgICAgIHJldHVybiBCdXNpbmVzc0xvY2F0aW9uTm9kZXMubGVuZ3RoO1xyXG4gICAgfSxcclxuXHJcbiAgICBEZXN0cm95R2VuZXJhdGVkTm9kZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBCdXNpbmVzc0xvY2F0aW9uTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uKF9uYW1lLF9TaGFyZUFtb3VudCxfaXNBZGRpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX2lzQWRkaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9zdG9jaz1uZXcgU3RvY2tJbmZvKCk7XHJcbiAgICAgICAgICAgIF9zdG9jay5CdXNpbmVzc05hbWU9X25hbWU7XHJcbiAgICAgICAgICAgIF9zdG9jay5TaGFyZUFtb3VudD1fU2hhcmVBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZlN0b2Nrcy5wdXNoKF9zdG9jayk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBQcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihfaXNEb3VibGVQYXlEYXk9ZmFsc2UsX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFBheWRheT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk7XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXk7XHJcbiAgICAgICAgX3NraXBCTU5leHRQYXlkYXk9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk7XHJcblxyXG4gICAgICAgIGlmKF9za2lwTmV4dFBheWRheSkgLy9pZiBwcmV2aW91c2x5IHNraXAgcGF5ZGF5IHdhcyBzdG9yZWQgYnkgYW55IGNhcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBpZighX2lzQm90KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgUGF5RGF5LlwiLDE2MDApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgICAgIH0sIDE2NTApO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIFBheURheS5cIik7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3RpdGxlPVwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZihfaXNEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICBfdGl0bGU9XCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgX3RpdGxlPVwiUGF5RGF5XCI7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLF9pc0RvdWJsZVBheURheSxfc2tpcEhNTmV4dFBheWRheSxfc2tpcEJNTmV4dFBheWRheSxfaXNCb3QpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQmFua3J1cHRfVHVybkRlY2lzaW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCYW5rcnVwdD10cnVlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCs9MTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsZmFsc2UsdGhpcy5TZWxlY3RlZE1vZGUsdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQsdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50LF91SUQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IENhc2g6IF9hbW91bnQsIElEOiBfdUlEIH0gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEzLCBfZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9hbW91bnQgPSBfZGF0YS5EYXRhLkNhc2g7XHJcbiAgICAgICAgICAgIHZhciBfaUQ9X2RhdGEuRGF0YS5JRDtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uUGxheWVyVUlEID09IF9pRCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5pc0dhbWVGaW5pc2hlZCA9PSB0cnVlKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlRvdGFsU2NvcmUrPV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHJlY2VpdmVkIHByb2ZpdCBvZiAkXCIgKyBfYW1vdW50ICsgXCIgZnJvbSB5b3VyIHBhcnRuZXIuXCIsMjgwMCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuLy8jZW5kcmVnaW9uXHJcbiAgIFxyXG4gICAgLy8jcmVnaW9uIENhcmRzIFJ1bGVzXHJcbiAgICBUb2dnbGVEb3VibGVQYXlOZXh0VHVybihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk9X25leHRUdXJuRG91YmxlUGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwTmV4dFR1cm4oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm49X3NraXBOZXh0VHVybjtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBOZXh0UGF5ZGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk9X3NraXBOZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5PV9za2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcEJNTmV4dFBheWRheT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk9X3NraXBCTU5leHRQYXlkYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVR1cm5Qcm9ncmVzcyhfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgVHVybkluUHJvZ3Jlc3M9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXR1cm5UdXJuUHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBUdXJuSW5Qcm9ncmVzcztcclxuICAgIH0sXHJcblxyXG4gICAgTG9zZUFsbE1hcmtldGluZ01vbmV5KClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2xvc2VBbW91bnQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2xvc2VBbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfbG9zZUFtb3VudD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9sb3NlQW1vdW50XHJcbiAgICB9LFxyXG5cclxuICAgIE11bHRpcGx5TWFya2V0aW5nTW9uZXkoX211bHRpcGxpZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9hbW91bnRJbmNyZWFzZWQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudEluY3JlYXNlZD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50Kj1fbXVsdGlwbGllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudEluY3JlYXNlZD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9hbW91bnRJbmNyZWFzZWRcclxuICAgIH0sXHJcblxyXG4gICAgR2V0TWFya2V0aW5nTW9uZXkoX3Byb2ZpdClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2Ftb3VudD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcHJvZml0PShfcHJvZml0LzEwMCk7XHJcbiAgICAgICAgICAgIF9hbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCo9X3Byb2ZpdDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCs9X2Ftb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9hbW91bnRcclxuICAgIH0sXHJcblxyXG4gICAgUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24oX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF91c2VySUQ9X2RhdGEuVXNlcklEO1xyXG4gICAgICAgIHZhciBfcXVlc3Rpb25JbmRleD1fZGF0YS5RdWVzdGlvbjtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PV9kYXRhLlVzZXJJbmRleDtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihfdXNlcklEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIklEIG1hdGNoZWRcIik7XHJcblxyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgT25lUXVlc3Rpb25JbmRleD1fcXVlc3Rpb25JbmRleDtcclxuICAgICAgICAgICAgdmFyIF9xdWVzdGlvbkFza2VkPU9uZVF1ZXN0aW9uc1tfcXVlc3Rpb25JbmRleC0xXTtcclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9xdWVzdGlvbkFza2VkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uKF9pc1R1cm5PdmVyPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbXlEYXRhO1xyXG4gICAgICAgIHZhciBfcm9vbURhdGE7XHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jvb21EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgICAgICAgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9teURhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgICAgICAgX3Jvb21EYXRhPXRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsX3Jvb21EYXRhLF9pc1R1cm5PdmVyLHRoaXMuU2VsZWN0ZWRNb2RlKVxyXG4gICAgXHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uRGVjaXNpb25fUGF5QW1vdW50X09uZVF1ZXN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgaWYoX215RGF0YS5DYXNoPj01MDAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihfbXlEYXRhLlBsYXllclVJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2gtPTUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBwYWlkIGNhc2ggYW1vdW50IHRvIHBsYXllci5cIiwxMjAwKTtcclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKHRydWUsZmFsc2UsLTEsX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvbl9BbnN3ZXJRdWVzdGlvbl9PbmVRdWVzdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9teURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBhbnN3ZXJlZCB0aGUgcXVlc3Rpb24uXCIsMTIwMCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsdHJ1ZSxPbmVRdWVzdGlvbkluZGV4LF9teURhdGEuUGxheWVyVUlEKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9oYXNEb25lUGF5bWVudCxfaGFzQW5zd2VyZWRRdWVzdGlvbixfcXVlc3Rpb25JbmRleCxfVXNlcklEKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZGF0YT17UGF5bWVudERvbmU6X2hhc0RvbmVQYXltZW50LFF1ZXN0aW9uQW5zd2VyZWQ6X2hhc0Fuc3dlcmVkUXVlc3Rpb24sUXVlc3Rpb25JbmRleDpfcXVlc3Rpb25JbmRleCxJRDpfVXNlcklEfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDgsX2RhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfZGF0YSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfaGFzRG9uZVBheW1lbnQ9X2RhdGEuUGF5bWVudERvbmU7XHJcbiAgICAgICAgICAgIHZhciBfaGFzQW5zd2VyZWRRdWVzdGlvbj1fZGF0YS5RdWVzdGlvbkFuc3dlcmVkO1xyXG4gICAgICAgICAgICB2YXIgX3F1ZXN0aW9uSW5kZXg9X2RhdGEuUXVlc3Rpb25JbmRleDtcclxuICAgICAgICAgICAgdmFyIF91SUQ9X2RhdGEuSUQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihfaGFzRG9uZVBheW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCs9NTAwMDtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIHJlZnVzZWQgdG8gYW5zd2VyIHRoZSBxdWVzdGlvbiBpbnN0ZWFkIHBheWVkIHRoZSBjYXNoIGFtb3VudCwgJDUwMDAgYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKF9oYXNBbnN3ZXJlZFF1ZXN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3NlbGVjdGVkUGxheWVySW5kZXg9MDtcclxuICAgICAgICAgICAgICAgIHZhciBfYWN0b3JzRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF91SUQ9PV9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZFBsYXllckluZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoX3F1ZXN0aW9uSW5kZXg9PTEpLy9oYXZlIHlvdSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihfcXVlc3Rpb25JbmRleD09MikvL0hhdmUgeW91IHRha2VuIGFueSBsb2FuP1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9sb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSB0YWtlbiBzb21lIGxvYW5cIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHRha2VuIGFueSBsb2FuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTMpLy9BcmUgeW91IGJhbmtydXB0ZWQ/IGlmIG1vcmUgdGhhbiBvbmNlLCB0ZWxsIG1lIHRoZSBhbW91bnQ/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuSXNCYW5rcnVwdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZCBcIitfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5CYW5rcnVwdEFtb3VudCtcIiB0aW1lL2VzLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTQpLy9JcyB5b3VyIHR1cm4gZ29pbmcgdG8gYmUgc2tpcHBlZCBuZXh0IHRpbWU/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBiZSBza2lwcGVkLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIG5vdCBiZSBza2lwcGVkLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTUpLy9JcyBpdCBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSB5b3VyIG5leHQgcGF5ZGF5P1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIGJlIGRvdWJsZSBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIG5vdCBiZSBkb3VibGUgcGF5ZGF5XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjE1MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZihJc1R3ZWVuaW5nPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfc3BhY2VzPV9kYXRhLkRhdGEuYmFja3NwYWNlcztcclxuICAgICAgICAgICAgdmFyIF9jb3VudGVyPV9kYXRhLkRhdGEuQ291bnRlcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2NvdW50ZXIrQmFja3NwYWNlc10uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zLDAuMSk7XHJcblxyXG4gICAgICAgICAgICBSb2xsQ291bnRlcj1fY291bnRlcjtcclxuICAgICAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuUGxheWVyX0dvQmFja1NwYWNlczogZnVuY3Rpb24gKE5vZGUsVG9Qb3Msc3BlZWQ9MC42KSB7XHJcbiAgICAgICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgICAudG8oc3BlZWQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBSb2xsQ291bnRlci09QmFja3NwYWNlcztcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfZGF0YT17RGF0YTp7YmFja3NwYWNlczpCYWNrc3BhY2VzLENvdW50ZXI6Um9sbENvdW50ZXJ9fTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMCxfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbn0pO1xyXG4vL21vZHVsZS5leHBvcnRzICA9IFBsYXllckRhdGE7IC8vd2hlbiBpbXBvcnRzIGluIGFub3RoZXIgc2NyaXB0IG9ubHkgcmVmZXJlbmNlIG9mIHBsYXllcmRhdGEgY2xhc3Mgd291bGQgYmUgYWJsZSB0byBhY2Nlc3NlZCBmcm9tIEdhbWVtYW5hZ2VyIGltcG9ydFxyXG5tb2R1bGUuZXhwb3J0cyAgPSBHYW1lTWFuYWdlcjtcclxuLy8jZW5kcmVnaW9uIl19