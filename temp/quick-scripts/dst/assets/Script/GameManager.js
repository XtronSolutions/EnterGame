
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

//#region superclasses and enumerations
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
    var Dice1 = this.getRandom(1, 7);
    var Dice2 = this.getRandom(1, 7); // var Dice1=20;
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
            var valueIndex = [0, 5, 6, 2];
            var index = this.getRandom(0, 4);
            RandomCard = valueIndex[index]; //RandomCard=0;
          } else if (_spaceID == 3) //landed on some marketing cards
          {
            var valueIndex = [0, 7, 3, 8, 13, 9];
            var index = this.getRandom(0, 6);
            RandomCard = valueIndex[index];
          } else if (_spaceID == 1) //landed on some marketing cards
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIlBhcnRuZXJOYW1lIiwiTG9jYXRpb25zTmFtZSIsIkxvYW5UYWtlbiIsIkxvYW5BbW91bnQiLCJjdG9yIiwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5IiwiTmV4dFR1cm5Eb3VibGVQYXkiLCJTa2lwTmV4dFR1cm4iLCJTa2lwTmV4dFBheWRheSIsIlNraXBITU5leHRQYXlkYXkiLCJTa2lwQk1OZXh0UGF5ZGF5IiwiU3RvY2tJbmZvIiwiU2hhcmVBbW91bnQiLCJQbGF5ZXJEYXRhIiwiUGxheWVyTmFtZSIsIlBsYXllclVJRCIsIkF2YXRhcklEIiwiSXNCb3QiLCJOb09mQnVzaW5lc3MiLCJDYXJkRnVuY3Rpb25hbGl0eSIsIkhvbWVCYXNlZEFtb3VudCIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiVG90YWxMb2NhdGlvbnNBbW91bnQiLCJOb09mU3RvY2tzIiwiQ2FzaCIsIkdvbGRDb3VudCIsIlN0b2NrQ291bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJMYXd5ZXJTdGF0dXMiLCJJc0JhbmtydXB0IiwiQmFua3J1cHRBbW91bnQiLCJTa2lwcGVkTG9hblBheW1lbnQiLCJQbGF5ZXJSb2xsQ291bnRlciIsIkluaXRpYWxDb3VudGVyQXNzaWduZWQiLCJpc0dhbWVGaW5pc2hlZCIsIlRvdGFsU2NvcmUiLCJHYW1lT3ZlciIsIlJvbGxDb3VudGVyIiwiRGljZVRlbXAiLCJEaWNlUm9sbCIsIklzVHdlZW5pbmciLCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIiLCJUdXJuQ2hlY2tBcnJheSIsIkJ1c2luZXNzTG9jYXRpb25Ob2RlcyIsIlBhc3NlZFBheURheSIsIkRvdWJsZVBheURheSIsIl9uZXh0VHVybkRvdWJsZVBheSIsIl9za2lwTmV4dFR1cm4iLCJfc2tpcE5leHRQYXlkYXkiLCJfc2tpcEhNTmV4dFBheWRheSIsIl9za2lwQk1OZXh0UGF5ZGF5IiwiQ2FyZEV2ZW50UmVjZWl2ZWQiLCJUdXJuSW5Qcm9ncmVzcyIsIkJhY2tzcGFjZXMiLCJpc0dhbWVPdmVyIiwiT25lUXVlc3Rpb25JbmRleCIsIk9uZVF1ZXN0aW9ucyIsIkNhcmREaXNwbGF5U2V0VGltb3V0IiwiR2FtZU1hbmFnZXIiLCJDb21wb25lbnQiLCJQbGF5ZXJHYW1lSW5mbyIsIkJvdEdhbWVJbmZvIiwiUGxheWVyTm9kZSIsIk5vZGUiLCJDYW1lcmFOb2RlIiwiQWxsUGxheWVyVUkiLCJBbGxQbGF5ZXJOb2RlcyIsIlN0YXJ0TG9jYXRpb25Ob2RlcyIsIlNlbGVjdGVkTW9kZSIsInN0YXRpY3MiLCJJbnN0YW5jZSIsIm9uTG9hZCIsIlR1cm5OdW1iZXIiLCJUdXJuQ29tcGxldGVkIiwiQ2hlY2tSZWZlcmVuY2VzIiwiR2V0X011bHRpcGxheWVyQ29udHJvbGxlciIsIkdldFNlbGVjdGVkTW9kZSIsIkluaXRfR2FtZU1hbmFnZXIiLCJSYW5kb21DYXJkSW5kZXgiLCJDYXJkQ291bnRlciIsIkNhcmREaXNwbGF5ZWQiLCJyZXF1aXJlIiwiQ2FtZXJhIiwiZ2V0Q29tcG9uZW50IiwiaXNDYW1lcmFab29taW5nIiwiY29uc29sZSIsImVycm9yIiwiQ2hlY2tTcGVjdGF0ZSIsImxvZyIsImdldFBob3RvblJlZiIsIm15Um9vbSIsImdldEN1c3RvbVByb3BlcnR5IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJIiwiQWxsRGF0YSIsIk1heFBsYXllcnMiLCJsZW5ndGgiLCJTeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIiLCJVcGRhdGVHYW1lVUkiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsIkdldFR1cm5OdW1iZXIiLCJHZXRNeUluZGV4IiwibXlJbmRleCIsIl9hY3RvciIsIlBob3RvbkFjdG9yIiwiY3VzdG9tUHJvcGVydGllcyIsIlBsYXllclNlc3Npb25EYXRhIiwiX2FsbEFjdG9ycyIsImluZGV4IiwiU3luY0RhdGFUb1BsYXllckdhbWVJbmZvIiwiQXNzaWduUGxheWVyR2FtZVVJIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIl90b1BvcyIsIlZlYzIiLCJHZXRfU3BhY2VNYW5hZ2VyIiwiRGF0YSIsIlJlZmVyZW5jZUxvY2F0aW9uIiwicG9zaXRpb24iLCJ4IiwieSIsInNldFBvc2l0aW9uIiwiYWN0aXZlIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIlRvdGFsQ29ubmVjdGVkUGxheWVycyIsIm15Um9vbUFjdG9yQ291bnQiLCJ1c2VySUQiLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNoYW5nZVR1cm4iLCJSYWlzZUV2ZW50Rm9yQ2FyZCIsIl9kYXRhIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJSYWlzZUV2ZW50IiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsImNsZWFyVGltZW91dCIsIkRpc3BsYXlDYXJkT25PdGhlcnMiLCJPbkxhbmRlZE9uU3BhY2UiLCJzZXRUaW1lb3V0IiwiUmVzZXRDYXJkRGlzcGxheSIsIlJlY2VpdmVFdmVudEZvckNhcmQiLCJSYW5kb21DYXJkIiwicmFuZG9tQ2FyZCIsImNvdW50ZXIiLCJSYWlzZUV2ZW50VHVybkNvbXBsZXRlIiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwiU3luY0FsbERhdGEiLCJSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUiLCJfdWlkIiwicHVzaCIsIkFycmF5TGVuZ3RoIiwiSURGb3VuZCIsIlR1cm5IYW5kbGVyIiwiX3R1cm4iLCJfcGxheWVyTWF0Y2hlZCIsIlRvZ2dsZVR1cm5Qcm9ncmVzcyIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlJlc2V0VHVyblZhcmlhYmxlIiwiUm9sbERpY2UiLCJEaWNlUm9sbFNjcmVlbiIsIlBsYXllckluZm8iLCJSb29tQWN0b3JzIiwiU2hvd1RvYXN0IiwiVG9nZ2xlU2tpcE5leHRUdXJuIiwiX2luZCIsIk1haW5TZXNzaW9uRGF0YSIsIk15RGF0YSIsIl9jb3VudGVyIiwiU3RhcnRUdXJuIiwiRW5hYmxlUGxheWVyTm9kZXMiLCJSZWNlaXZlQmFua3J1cHREYXRhIiwiX2lzQmFua3J1cHRlZCIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiX3BsYXllckRhdGEiLCJQbGF5ZXJEYXRhTWFpbiIsIlN0YXJ0VHVybkFmdGVyQmFua3J1cHQiLCJfcmFuZG9tSW5kZXgiLCJnZXRSYW5kb20iLCJTZXROYW1lIiwiX3RvZ2dsZUhpZ2hsaWdodCIsIl9pbmRleCIsIlRvZ2dsZUJHSGlnaGxpZ2h0ZXIiLCJUb2dnbGVUZXh0aWdobGlnaHRlciIsIlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMiLCJ0YXJnZXRQb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInJhdGlvIiwid2luU2l6ZSIsImhlaWdodCIsInpvb21SYXRpbyIsImxhdGVVcGRhdGUiLCJzeW5jRGljZVJvbGwiLCJfcm9sbCIsIl9kaWNlMSIsImRpY2UxIiwiX2RpY2UyIiwiZGljZTIiLCJfcmVzdWx0IiwibXlSb29tQWN0b3JzQXJyYXkiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJBbmltYXRlRGljZSIsIkRpY2VGdW50aW9uYWxpdHkiLCJfcG9zIiwiVHdlZW5DYW1lcmEiLCJUZW1wQ2hlY2tTcGFjZSIsIl9yb2xsaW5nIiwidGVtcGNvdW50ZXIiLCJ0ZW1wY291bnRlcjIiLCJkaWNldG9iZSIsInBhcnNlSW50IiwiU3BhY2VEYXRhIiwiU3BhY2VzVHlwZSIsIkRpY2UxIiwiRGljZTIiLCJfbmV3Um9sbCIsIlJvbGxPbmVEaWNlIiwiUm9sbFR3b0RpY2VzIiwiY2FsbFVwb25DYXJkIiwiX3NwYWNlSUQiLCJ2YWx1ZUluZGV4IiwiU2VuZGluZ0RhdGEiLCJjb21wbGV0ZUNhcmRUdXJuIiwiQ2FsbEdhbWVDb21wbGV0ZSIsIl9pc0JvdCIsIl9wbGF5ZXJJbmRleCIsIl9jYXNoIiwiSE1BbW91bnQiLCJHZXRfR2FtZU1hbmFnZXIiLCJCTUFtb3VudCIsIkJNTG9jYXRpb25zIiwibG9hbkFtb3VudCIsIkJNQ2FzaCIsIkhNQ2FzaCIsIlRvdGFsQXNzZXRzIiwiUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZSIsIlN5bmNHYW1lT3ZlciIsIl9VSUQiLCJSZXN0YXJ0R2FtZSIsIlN0YXJ0RGljZVJvbGwiLCJab29tQ2FtZXJhT3V0IiwicGxheWVyY29tcGxldGVkIiwibWF4IiwiU2VsZWN0ZWRJbmQiLCJTZXNzaW9uRGF0YSIsIl92YWx1ZSIsIlR3ZWVuUGxheWVyIiwibWluIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaXNab29tIiwidGltZSIsInR3ZWVuIiwidG8iLCJ2MiIsImVhc2luZyIsImNhbGwiLCJab29tQ2FtZXJhSW4iLCJzdGFydCIsIkNoZWNrUGF5RGF5Q29uZGl0aW9ucyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiVG9nZ2xlUGF5RGF5IiwiUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24iLCJUb1BvcyIsIl9uZXdwb3MiLCJfc3QxIiwiX1N0MiIsIkV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsImFtb3VudCIsIl9sb2NhdGlvbk5hbWUiLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJpIiwibm9kZSIsImluc3RhbnRpYXRlIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiU2V0QnVzaW5lc3NJbmRleCIsIlJlc2V0RWRpdEJveCIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsImRlc3Ryb3kiLCJVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJfU2hhcmVBbW91bnQiLCJfaXNBZGRpbmciLCJfc3RvY2siLCJfaXNEb3VibGVQYXlEYXkiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiX3RpdGxlIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJCYW5rcnVwdF9UdXJuRGVjaXNpb24iLCJTZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uIiwiX2Ftb3VudCIsIl91SUQiLCJJRCIsIlJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJfaUQiLCJfbXlJbmRleCIsIl9zdGF0ZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlJldHVyblR1cm5Qcm9ncmVzcyIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9sb3NlQW1vdW50IiwiTXVsdGlwbHlNYXJrZXRpbmdNb25leSIsIl9tdWx0aXBsaWVyIiwiX2Ftb3VudEluY3JlYXNlZCIsIkdldE1hcmtldGluZ01vbmV5IiwiX3Byb2ZpdCIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiX3VzZXJJRCIsIlVzZXJJRCIsIl9xdWVzdGlvbkluZGV4IiwiUXVlc3Rpb24iLCJVc2VySW5kZXgiLCJfZ2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfcXVlc3Rpb25Bc2tlZCIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJfaXNUdXJuT3ZlciIsIl9teURhdGEiLCJfcm9vbURhdGEiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9QYXlBbW91bnRfT25lUXVlc3Rpb24iLCJSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJPbmVRdWVzdGlvbkRlY2lzaW9uX0Fuc3dlclF1ZXN0aW9uX09uZVF1ZXN0aW9uIiwiX2hhc0RvbmVQYXltZW50IiwiX2hhc0Fuc3dlcmVkUXVlc3Rpb24iLCJfVXNlcklEIiwiUGF5bWVudERvbmUiLCJRdWVzdGlvbkFuc3dlcmVkIiwiUXVlc3Rpb25JbmRleCIsIlJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfc2VsZWN0ZWRQbGF5ZXJJbmRleCIsIl9hY3RvcnNEYXRhIiwiX2xvYW5UYWtlbiIsIlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eSIsIl9zcGFjZXMiLCJiYWNrc3BhY2VzIiwiQ291bnRlciIsIlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyIsInNwZWVkIiwiR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBLElBQUlBLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUMzQkMsRUFBQUEsSUFBSSxFQUFDLENBRHNCO0FBRTNCQyxFQUFBQSxTQUFTLEVBQUUsQ0FGZ0I7QUFFSztBQUNoQ0MsRUFBQUEsY0FBYyxFQUFFLENBSFcsQ0FHSzs7QUFI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LENBQW9CLEtBQUtNLFVBQXpCLENBQTlCLEVBQW1FeUMsTUFBbkU7QUFDQSxTQUFLK0csZ0JBQUw7QUFDSCxHQTF2RG9CLENBNnZEckI7QUFDQTs7QUE5dkRxQixDQUFULENBQWhCLEVBZ3dEQTs7QUFDQStILE1BQU0sQ0FBQ0MsT0FBUCxHQUFrQnRTLFdBQWxCLEVBQ0EiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vI3JlZ2lvbiBzdXBlcmNsYXNzZXMgYW5kIGVudW1lcmF0aW9uc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bUJ1c2luZXNzVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgSG9tZUJhc2VkOiAxLCAgICAgICAgICAgICAgICAgICAvL2EgYnVzaW5lc3MgdGhhdCB5b3Ugb3BlcmF0ZSBvdXQgb2YgeW91ciBob21lXHJcbiAgICBicmlja0FuZG1vcnRhcjogMiAgICAgICAgICAgICAgIC8vYSBzdG9yZSBmcm9udCBidXNpbmVzc1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzc0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzSW5mbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiQnVzaW5lc3NJbmZvXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOYW1lOiBcIkJ1c2luZXNzRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NUeXBlOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1vZGVcIixcclxuICAgICAgIHR5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICAgICBkZWZhdWx0OiBFbnVtQnVzaW5lc3NUeXBlLk5vbmUsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiQnVzaW5lc3MgY2F0b2dvcnkgZm9yIHBsYXllcnNcIix9LCBcclxuICAgIEJ1c2luZXNzVHlwZURlc2NyaXB0aW9uOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiVHlwZSAoYnkgbmFtZSkgb2YgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgQnVzaW5lc3NOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiTmFtZSBvZiB0aGUgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgIEFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJiYWxhbmNlIG9mIGJ1c2luZXNzXCIsfSxcclxuICAgICAgSXNQYXJ0bmVyc2hpcDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc1BhcnRuZXJzaGlwXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwdzpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgZG9uZSBwYXJ0bmVyc2hpcCB3aXRoIHNvbWVvbmUgd2l0aCBjdXJyZW50IGJ1c2luZXNzXCIsfSxcclxuICAgICAgIFBhcnRuZXJJRDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGFydG5lcklEXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB0b29sdGlwOiBcIklEIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLH0sXHJcbiAgICAgICBQYXJ0bmVyTmFtZTpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGFydG5lck5hbWVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICB0b29sdGlwOlwibmFtZSBvZiB0aGUgcGFydG5lciB3aXRoIHdob20gcGxheWVyIGhhcyBmb3JtZWQgcGFydG5lcnNoaXBcIix9LFxyXG4gICAgICAgIExvY2F0aW9uc05hbWU6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvY2F0aW9uc05hbWVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogW2NjLlRleHRdLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICB0b29sdGlwOlwiaWYgcGxheWVyIG93bnMgYnJpY2sgYW5kIG1vcnRhciBoZS9zaGUgY2FuIGV4cGFuZCB0byBuZXcgbG9jYXRpb25cIix9LFxyXG4gICAgICAgIExvYW5UYWtlbjpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hblRha2VuXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICAgICBMb2FuQW1vdW50OlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQW1vdW50XCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG5cclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIENhcmREYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkRGF0YUZ1bmN0aW9uYWxpdHkgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIkNhcmREYXRhRnVuY3Rpb25hbGl0eVwiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgTmV4dFR1cm5Eb3VibGVQYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTmV4dFR1cm5Eb3VibGVQYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIGl0cyBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG4gICAgU2tpcE5leHRUdXJuOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBOZXh0VHVyblwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgdHVybiBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgdHVybiBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG4gICAgU2tpcE5leHRQYXlkYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcE5leHRQYXlkYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHBheWRheSBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbiAgICBTa2lwSE1OZXh0UGF5ZGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBITU5leHRQYXlkYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgaG9tZSBiYXNlZCBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sXHJcbiAgICBTa2lwQk1OZXh0UGF5ZGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBCTU5leHRQYXlkYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgYnJpY2thIGFuZCBtbW9ydGFyIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbn0sXHJcblxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFN0b2NrSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3RvY2tJbmZvID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJTdG9ja0luZm9cIixcclxucHJvcGVydGllczogeyBcclxuICAgIE5hbWU6IFwiU3RvY2tEYXRhXCIsXHJcbiAgICBCdXNpbmVzc05hbWU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJuYW1lIG9mIHRoZSBidXNpbmVzcyBpbiB3aGljaCBzdG9ja3Mgd2lsbCBiZSBoZWxkXCIsfSwgXHJcbiAgICBTaGFyZUFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6IFwiU2hhcmVBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDogXCJTaGFyZSBhbW91bnQgb2YgdGhlIHN0b2NrXCIsfSxcclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yICBQbGF5ZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJQbGF5ZXJEYXRhXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBQbGF5ZXJOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllck5hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm5hbWUgb2YgdGhlIHBsYXllclwiLH0sXHJcbiAgICBQbGF5ZXJVSUQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyVUlEXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJJRCBvZiB0aGUgcGxheWVyXCIsfSxcclxuICAgIEF2YXRhcklEOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhcklEXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiaWQgcmVmZXJlbmNlIGZvciBwbGF5ZXIgYXZhdGFyIHNlbGVjdGlvblwiLH0sXHJcbiAgICBJc0JvdDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc0JvdFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cHc6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBjdXJyZW50IHBsYXllciBpcyBib3RcIix9LCBcclxuICAgIE5vT2ZCdXNpbmVzczpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1wiLFxyXG4gICAgICAgdHlwZTogW0J1c2luZXNzSW5mb10sXHJcbiAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJOdW1iZXIgb2YgYnVzaW5lc3MgYSBwbGF5ZXIgY2FuIG93blwiLH0sIFxyXG4gICAgQ2FyZEZ1bmN0aW9uYWxpdHk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FyZEZ1bmN0aW9uYWxpdHlcIixcclxuICAgICAgIHR5cGU6IENhcmREYXRhRnVuY3Rpb25hbGl0eSxcclxuICAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImNhcmQgZnVuY3Rpb25hbGl0eSBzdG9yZWQgYnkgcGxheWVyXCIsfSwgXHJcbiAgICBIb21lQmFzZWRBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJudW1iZXIgb2YgaG9tZSBiYXNlZCBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBCcmlja0FuZE1vcnRhckFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja0FuZE1vcnRhckFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibnVtYmVyIG9mIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLH0sIFxyXG4gICAgVG90YWxMb2NhdGlvbnNBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxMb2NhdGlvbnNBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm51bWJlciBvZiBsb2NhdGlvbnMgb2YgYWxsIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3Nlc3NcIix9LCBcclxuICAgIE5vT2ZTdG9ja3M6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU3RvY2tzXCIsXHJcbiAgICAgICB0eXBlOiBbU3RvY2tJbmZvXSxcclxuICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIk51bWJlciBvZiBzdG9jayBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBDYXNoOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgY2FzaCBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBHb2xkQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiR29sZENvdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiY291bnQgb2YgZ29sZCBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIFN0b2NrQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tDb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImNvdW50IG9mIHN0b2NrcyBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIExvYW5UYWtlbjpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyB0YWtlbiBsb2FuIGZyb20gYmFuayBvciBub3RcIix9LFxyXG4gICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBsb2FuIHRha2VuIGZyb20gdGhlIGJhbmtcIix9LFxyXG4gICAgTWFya2V0aW5nQW1vdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0Ftb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIm1hcmtldGluZyBhbW91bnQgYSBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBMYXd5ZXJTdGF0dXM6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTGF3eWVyU3RhdHVzXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgaGlyZWQgYSBsYXd5ZXIgb3Igbm90XCIsfSxcclxuICAgIElzQmFua3J1cHQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNCYW5rcnVwdFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGJlZW4gQmFua3J1cHRlZCBvciBub3RcIix9LFxyXG4gICAgQmFua3J1cHRBbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQmFua3J1cHRBbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJrZWVwIHRyYWNrIGhvdyBtdWNoIHRpbWUgcGxheWVyIGhhcyBiZWVuIGJhbmtydXB0ZWRcIix9LFxyXG4gICAgU2tpcHBlZExvYW5QYXltZW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBwZWRMb2FuUGF5bWVudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHNraXBwZWQgbG9hbiBwYXltZW50XCIsfSxcclxuICAgIFBsYXllclJvbGxDb3VudGVyOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclJvbGxDb3VudGVyXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciB0byBzdG9yZSByb2xsIGNvdW50b3IgZm9yIHBsYXllclwiLH0sXHJcbiAgICBJbml0aWFsQ291bnRlckFzc2lnbmVkOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkluaXRpYWxDb3VudGVyQXNzaWduZWRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgaXNHYW1lRmluaXNoZWQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcImlzR2FtZUZpbmlzaGVkXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICBUb3RhbFNjb3JlOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbFNjb3JlXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgR2FtZU92ZXI6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkdhbWVPdmVyXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxufSxcclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxuXHJcbn0pO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiBHYW1lIE1hbmFnZXIgQ2xhc3NcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKG1haW4gY2xhc3MpIGNsYXNzIGZvciBHYW1lIE1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvbGxDb3VudGVyPTA7XHJcbnZhciBEaWNlVGVtcD0wO1xyXG52YXIgRGljZVJvbGw9MDtcclxudmFyIElzVHdlZW5pbmc9ZmFsc2U7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFR1cm5DaGVja0FycmF5PVtdO1xyXG52YXIgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG5cclxudmFyIFBhc3NlZFBheURheT1mYWxzZTtcclxudmFyIERvdWJsZVBheURheT1mYWxzZTtcclxuXHJcbi8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG52YXIgX25leHRUdXJuRG91YmxlUGF5PWZhbHNlO1xyXG52YXIgX3NraXBOZXh0VHVybj1mYWxzZTtcclxudmFyIF9za2lwTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxudmFyIF9za2lwSE1OZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBfc2tpcEJNTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG52YXIgVHVybkluUHJvZ3Jlc3M9ZmFsc2U7XHJcblxyXG52YXIgQmFja3NwYWNlcz0zO1xyXG52YXIgaXNHYW1lT3Zlcj1mYWxzZTtcclxudmFyIE9uZVF1ZXN0aW9uSW5kZXg9LTE7XHJcbnZhciBPbmVRdWVzdGlvbnM9XHJcbltcclxuICAgIFwieW91IGhhdmUgc2tpcHBlZCBsb2FuIHByZXZpb3VzIHBheWRheT9cIixcclxuICAgIFwieW91IGhhdmUgdGFrZW4gYW55IGxvYW4/XCIsXHJcbiAgICBcInlvdSBoYXZlIGJhbmtydXB0ZWQgZXZlcj9cIixcclxuICAgIFwieW91ciBuZXh0IHR1cm4gaXMgZ29pbmcgdG8gYmUgc2tpcHBlZD9cIixcclxuICAgIFwieW91ciBuZXh0IHBheWRheSBpcyBnb2luZyB0byBiZSBkb3VibGUgcGF5ZGF5P1wiXHJcbl07XHJcblxyXG52YXIgQ2FyZERpc3BsYXlTZXRUaW1vdXQ9bnVsbDtcclxuXHJcbnZhciBHYW1lTWFuYWdlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiR2FtZU1hbmFnZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBQbGF5ZXJHYW1lSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBwbGF5ZXIncyBkYXRhXCJ9LFxyXG4gICAgICAgIEJvdEdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIGJvdCdzIGRhdGFcIn0sXHJcbiAgICAgICAgUGxheWVyTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgcGxheWVyXCIsfSwgICAgXHJcbiAgICAgICAgQ2FtZXJhTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgY2FtZXJhXCIsfSwgICAgXHJcbiAgICAgICAgQWxsUGxheWVyVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2YgdWkgb2YgYWxsIHBsYXllcnNcIix9LCAgICAgIFxyXG4gICAgICAgIEFsbFBsYXllck5vZGVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIG9mIG5vZGUgb2YgYWxsIHBsYXllcnMgaW5zaWRlIGdhbWVwbGF5XCIsfSwgICBcclxuICAgICAgICBTdGFydExvY2F0aW9uTm9kZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2YgYXR0YXkgb2YgbG9jYXRpb25zXCIsfSwgICBcclxuICAgICAgICAgU2VsZWN0ZWRNb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6MCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcImludGVnZXIgcmVmZXJlbmNlIGZvciBnYW1lIG1vZGUgMSBtZWFucyBib3QgYW5kIDIgbWVhbnMgcmVhbCBwbGF5ZXJzXCIsfSwgICBcclxuICAgIH0sXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgUGxheWVyRGF0YTogUGxheWVyRGF0YSxcclxuICAgICAgICBCdXNpbmVzc0luZm86QnVzaW5lc3NJbmZvLFxyXG4gICAgICAgIEVudW1CdXNpbmVzc1R5cGU6RW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgICBJbnN0YW5jZTpudWxsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vI3JlZ2lvbiBBbGwgRnVuY3Rpb25zIG9mIEdhbWVNYW5hZ2VyXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgY2xhc3MgaXMgY3JlYXRlZFxyXG4gICAgQG1ldGhvZCBvbkxvYWRcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDtcclxuICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgVHVybkNoZWNrQXJyYXk9W107XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkTW9kZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkdldFNlbGVjdGVkTW9kZSgpO1xyXG4gICAgICAgIHRoaXMuSW5pdF9HYW1lTWFuYWdlcigpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4PTA7XHJcbiAgICAgICAgdGhpcy5DYXJkQ291bnRlcj0wO1xyXG4gICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD1mYWxzZTtcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD1mYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgdG8gYXNzaWduIHJlZmVyZW5jZSBvZiByZXF1aXJlZCBjbGFzc2VzXHJcbiAgICBAbWV0aG9kIENoZWNrUmVmZXJlbmNlc1xyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG4gICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBpbml0aWFsIGdhbWVtYW5hZ2VyIGVzc2V0aWFsc1xyXG4gICAgQG1ldGhvZCBJbml0X0dhbWVNYW5hZ2VyXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBJbml0X0dhbWVNYW5hZ2VyICgpIHtcclxuICAgICAgICB0aGlzLkNhbWVyYT10aGlzLkNhbWVyYU5vZGUuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSk7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmc9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1bXTtcclxuICAgICAgICBSb2xsQ291bnRlcj0wO1xyXG4gICAgICAgIERpY2VUZW1wPTA7XHJcbiAgICAgICAgRGljZVJvbGw9MDsgIFxyXG5cclxuICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikgLy9nYW1lIGlzIGJlaW5nIHBsYXllZCBieSByZWFsIHBsYXllcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vaWYgam9pbmVkIHBsYXllciBpcyBzcGVjdGF0ZVxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKT09dHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdGF0dXMgb2YgaW5pdGlhbCBidXNpbmVzcyBzZXRwOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpKTtcclxuICAgICAgICAgICAgICAgIC8vaWYgaW5pdGFsIHNldHVwIGhhcyBiZWVuIGRvbmUgYW5kIGdhbWUgaXMgdW5kZXIgd2F5XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpPT10cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEFsbERhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm89QWxsRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsdGhpcy5UdXJuTnVtYmVyKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Jbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLGZhbHNlLHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKSAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IGJvdCBhbG9uZyB3aXRoIG9uZSBwbGF5ZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSxmYWxzZSx0aGlzLlNlbGVjdGVkTW9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNyZWdpb24gcHVibGljIGZ1bmN0aW9ucyB0byBnZXQgZGF0YSAoYWNjZXNzaWJsZSBmcm9tIG90aGVyIGNsYXNzZXMpXHJcbiAgICBHZXRUdXJuTnVtYmVyICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5UdXJuTnVtYmVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBHZXRNeUluZGV4KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbXlJbmRleCA9IDA7XHJcbiAgICAgICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgIHZhciBfYWxsQWN0b3JzID0gdGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hbGxBY3RvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoX2FjdG9yLlBsYXllclVJRCA9PSBfYWxsQWN0b3JzW2luZGV4XS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbXlJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG15SW5kZXg7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8jcmVnaW9uIFNwZWN0YXRlTW9kZSBDb2RlXHJcblxyXG4gICAgU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKClcclxuICAgIHtcclxuICAgICAgICB2YXIgQWxsRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1BbGxEYXRhO1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5DbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcblxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCxfdG9Qb3MueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInN5bmNlZCBwbGF5ZXJub2Rlc1wiKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKVxyXG4gICAge1xyXG4gICAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PVRvdGFsQ29ubmVjdGVkUGxheWVycylcclxuICAgICAge1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD10cnVlO1xyXG5cclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIGZ1bmN0aW9ucyByZWxhdGVkIHRvIFR1cm4gTWVjaGFuaXNtIGFuZCBjYXJkIG1lY2hhbmlzbVxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHdoYXQgY2FyZCBoYXMgYmVlbiBzZWxlY3RlZCBieSBwbGF5ZXJcclxuICAgIEBtZXRob2QgUmFpc2VFdmVudEZvckNhcmRcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSYWlzZUV2ZW50Rm9yQ2FyZChfZGF0YSlcclxuICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg1LF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBDbGVhckRpc3BsYXlUaW1lb3V0KClcclxuICB7XHJcbiAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gIH0sXHJcblxyXG4gIERpc3BsYXlDYXJkT25PdGhlcnMoKVxyXG4gIHtcclxuICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgICAgICAgaWYoQ2FyZEV2ZW50UmVjZWl2ZWQ9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuQ2FyZENvdW50ZXIpO1xyXG4gICAgICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD1mYWxzZTtcclxuICAgICAgICAgICAgaWYoIXRoaXMuQ2FyZERpc3BsYXllZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5DYXJkQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsdGhpcy5SYW5kb21DYXJkSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhcmREaXNwbGF5U2V0VGltb3V0PXNldFRpbWVvdXQoKCkgPT4geyAvL2NoZWNrIGFmdGVyIGV2ZXJ5IDAuNSBzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldENhcmREaXNwbGF5KClcclxuICB7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9ZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50Rm9yQ2FyZChfZGF0YSlcclxuICB7XHJcblxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuXHJcbiAgICB2YXIgUmFuZG9tQ2FyZD1fZGF0YS5yYW5kb21DYXJkO1xyXG4gICAgdmFyIGNvdW50ZXI9X2RhdGEuY291bnRlcjtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleD1SYW5kb21DYXJkO1xyXG4gICAgdGhpcy5DYXJkQ291bnRlcj1jb3VudGVyO1xyXG5cclxuICAgXHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuXHJcbiAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKHRydWUsUmFuZG9tQ2FyZCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD10cnVlO1xyXG4gICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90PT1mYWxzZSlcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKHRydWUsUmFuZG9tQ2FyZCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsUmFuZG9tQ2FyZCx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuXHJcbiAgICBcclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHBhcnRpY3VsYXIgcGxheWVyIGhhcyBjb21wbGV0ZSB0aGVpciBtb3ZlXHJcbiAgICBAbWV0aG9kIFJhaXNlRXZlbnRUdXJuQ29tcGxldGVcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSYWlzZUV2ZW50VHVybkNvbXBsZXRlKClcclxuICB7XHJcbiAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICAgIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZWFpc2VkIGZvciB0dXJuIGNvbXBsZXRlXCIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCx0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKTtcclxuICAgICAgfVxyXG4gIH0sXHJcblxyXG5cclxuICBTeW5jQWxsRGF0YSgpXHJcbiAge1xyXG4gICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgIH0gIFxyXG59LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBvbiBhbGwgcGxheWVycyB0byB2YWxpZGF0ZSBpZiBtb3ZlIGlzIGNvbXBsZXRlZCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHNcclxuICAgIEBtZXRob2QgUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlKF91aWQpXHJcbiAge1xyXG4gICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL3JlYWwgcGxheWVyc1xyXG4gICAgICB7XHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICAgICAgICAgIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7IFxyXG5cclxuICAgICAgICAgICAgdmFyIEFycmF5TGVuZ3RoPVR1cm5DaGVja0FycmF5Lmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIElERm91bmQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBcnJheUxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5W2luZGV4XT09X3VpZClcclxuICAgICAgICAgICAgICAgICAgICBJREZvdW5kPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFJREZvdW5kKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICAgICAgICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5Lmxlbmd0aD09VG90YWxDb25uZWN0ZWRQbGF5ZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgfVxyXG4gIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGRpY2UgYW5pbWF0aW9uIGlzIHBsYXllZCBvbiBhbGwgcGxheWVyc1xyXG4gICAgQG1ldGhvZCBDaGFuZ2VUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGFuZ2VUdXJuKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuVHVybk51bWJlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9dGhpcy5UdXJuTnVtYmVyKzE7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLHRoaXMuVHVybk51bWJlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIGZyb20gcmFpc2Ugb24gZXZlbnQgKGZyb20gZnVuY3Rpb24gXCJTdGFydFR1cm5cIiBhbmQgXCJDaGFuZ2VUdXJuXCIgb2YgdGhpcyBzYW1lIGNsYXNzKSB0byBoYW5kbGUgdHVyblxyXG4gICAgQG1ldGhvZCBUdXJuSGFuZGxlclxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgVHVybkhhbmRsZXIoX3R1cm4pXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlR1cm46IFwiK190dXJuKTtcclxuICAgICAgICB2YXIgX3BsYXllck1hdGNoZWQ9ZmFsc2U7XHJcbiAgICAgICAgX3NraXBOZXh0VHVybj1mYWxzZTtcclxuICAgICAgICBpZihJc1R3ZWVuaW5nKSAvL2NoZWNrIGlmIGFuaW1hdGlvbiBvZiB0dXJuIGJlaW5nIHBsYXllZCBvbiBvdGhlciBwbGF5ZXJzIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5IYW5kbGVyKF90dXJuKTtcclxuICAgICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPV90dXJuO1xyXG4gICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NraXBOZXh0VHVybj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFfc2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3Q9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NraXBOZXh0VHVybj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFfc2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UvL3R1cm4gZGVjaXNpb25zIGZvciBib3RcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BsYXllck1hdGNoZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBfc2tpcE5leHRUdXJuPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIV9za2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUm9sbERpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLHRoaXMuVHVybk51bWJlcix0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHVybiBPZjogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGxQbGF5ZXJVSVt0aGlzLlR1cm5OdW1iZXJdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5QbGF5ZXJJbmZvKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3NraXAgdGhpcyB0dXJuIGFzIHNraXAgdHVybiBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlXHJcbiAgICAgICAgICAgIGlmKF9wbGF5ZXJNYXRjaGVkICYmIF9za2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsMTIwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVNraXBOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZClcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgIHZhciBNeURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgICAgIHZhciBfY291bnRlcj1faW5kO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQhPU15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkgLy9kb250IHVwZGF0ZSBteSBvd24gZGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQ9PU1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXT1NYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9LCAgXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBhbGwgcGxheWVycyBoYXZlIGRvbmUgdGhlaXIgaW5pdGlhbCBzZXR1cCBhbmQgZmlyc3QgdHVybiBzdGFydHNcclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTdGFydFR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgICAgIHRoaXMuVHVybk51bWJlcj0wOyAvL3Jlc2V0aW5nIHRoZSB0dXJuIG51bWJlciBvbiBzdGFydCBvZiB0aGUgZ2FtZVxyXG5cclxuICAgICAgICAvL3NlbmRpbmcgaW5pdGlhbCB0dXJuIG51bWJlciBvdmVyIHRoZSBuZXR3b3JrIHRvIHN0YXJ0IHR1cm4gc2ltdWx0YW5vdXNseSBvbiBhbGwgY29ubmVjdGVkIHBsYXllcidzIGRldmljZXNcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgICAgICBcclxuICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVCYW5rcnVwdERhdGEoX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgLy9vdGhlciBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFxyXG4gICAgICAgIHZhciBfaXNCYW5rcnVwdGVkPV9kYXRhLkRhdGEuYmFua3J1cHRlZDtcclxuICAgICAgICB2YXIgX3R1cm49X2RhdGEuRGF0YS50dXJuO1xyXG4gICAgICAgIHZhciBfcGxheWVyRGF0YT1fZGF0YS5EYXRhLlBsYXllckRhdGFNYWluO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coX2lzQmFua3J1cHRlZCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coX3R1cm4pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKF9wbGF5ZXJEYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfdHVybl09X3BsYXllckRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXModHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLHRoaXMuVHVybk51bWJlcix0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PXRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLHRoaXMuVHVybk51bWJlcix0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PXRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIEZ1bmN0aW9uIGZvciBnYW1lcGxheVxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiBwbGF5ZXIgVUkgKG5hbWUvaWNvbnMvbnVtYmVyIG9mIHBsYXllcnMgdGhhdCB0byBiZSBhY3RpdmUgZXRjKVxyXG4gICAgQG1ldGhvZCBBc3NpZ25QbGF5ZXJHYW1lVUlcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEFzc2lnblBsYXllckdhbWVVSShfaXNCYW5rcnVwdGVkPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKSAvL2ZvciBib3RcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCFfaXNCYW5rcnVwdGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3JhbmRvbUluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsdGhpcy5Cb3RHYW1lSW5mby5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvLnB1c2godGhpcy5Cb3RHYW1lSW5mb1tfcmFuZG9tSW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz0yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuUGxheWVySW5mbz10aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVHYW1lVUkoX3RvZ2dsZUhpZ2hsaWdodCxfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX3RvZ2dsZUhpZ2hsaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbX2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuUGxheWVySW5mbz10aGlzLlBsYXllckdhbWVJbmZvW19pbmRleF07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihfaW5kZXg9PWluZGV4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVCR0hpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVUZXh0aWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlQkdIaWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGVuYmFsZSByZXNwZWN0aXZlIHBsYXllcnMgbm9kZXMgaW5zaWRlIGdhbWFwbGF5XHJcbiAgICBAbWV0aG9kIEVuYWJsZVBsYXllck5vZGVzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBFbmFibGVQbGF5ZXJOb2RlcyhfaXNCYW5rcnVwdGVkPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFfaXNCYW5rcnVwdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQ9PTEpICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ9PTEpICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSG9tZUJhc2VkQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJyaWNrQW5kTW9ydGFyQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb249dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICBcclxuICAgICAgICBsZXQgcmF0aW89dGFyZ2V0UG9zLnkvY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTI7XHJcbiAgICB9LFxyXG5cclxuICAgIGxhdGVVcGRhdGUgKCkge1xyXG4gICAgICAgIGlmKHRoaXMuaXNDYW1lcmFab29taW5nKSAgICBcclxuICAgICAgICAgICAgdGhpcy5TZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN5bmNEaWNlUm9sbChfcm9sbClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2RpY2UxPV9yb2xsLmRpY2UxO1xyXG4gICAgICAgIHZhciBfZGljZTI9X3JvbGwuZGljZTI7XHJcbiAgICAgICAgdmFyIF9yZXN1bHQ9X2RpY2UxK19kaWNlMjtcclxuXHJcbiAgICAgICAgSXNUd2VlbmluZz10cnVlO1xyXG4gICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD1mYWxzZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEPT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9PTAgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGU9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgUm9sbENvdW50ZXI9MTM7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9PTEyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcisyMTsgIFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyKzE7XHJcblxyXG4gICAgICAgICAgICBSb2xsQ291bnRlcj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXItMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBEaWNlUm9sbD1fcmVzdWx0O1xyXG4gICAgICAgIERpY2VUZW1wPTA7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbihEaWNlUm9sbCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLlR1cm5OdW1iZXI9PWluZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmdldENvbXBvbmVudChcIkRpY2VDb250cm9sbGVyXCIpLkFuaW1hdGVEaWNlKF9kaWNlMSxfZGljZTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGxldCB0YXJnZXRQb3M9dGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsMTIwKSk7XHJcbiAgICAgICAgLy8gdmFyIF9wb3M9dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgICAgIC8vIHRoaXMuVHdlZW5DYW1lcmEoX3Bvcyx0cnVlLDAuNCk7ICAgXHJcbiAgICB9LFxyXG5cclxuICAgIERpY2VGdW50aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0YXJnZXRQb3M9dGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsMTIwKSk7XHJcbiAgICAgICAgdmFyIF9wb3M9dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX3Bvcyx0cnVlLDAuNCk7ICBcclxuICAgIH0sXHJcblxyXG4gICAgVGVtcENoZWNrU3BhY2UoX3JvbGxpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRlbXBjb3VudGVyPTA7XHJcbiAgICAgICAgdmFyIHRlbXBjb3VudGVyMj0wO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIHRlbXBjb3VudGVyMj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgaWYodGVtcGNvdW50ZXIyLTE8MClcclxuICAgICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzdGFydGluZyBmcm9tIG9ibGl2aW9uXCIpO1xyXG4gICAgICAgIHRlbXBjb3VudGVyPXRlbXBjb3VudGVyMitfcm9sbGluZy0xO1xyXG4gICAgICAgIHZhciBkaWNldG9iZT1wYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIrZGljZXRvYmUpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBjb3VudGVyPXRlbXBjb3VudGVyMitfcm9sbGluZztcclxuICAgICAgICB2YXIgZGljZXRvYmU9cGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwidG8gYmU6IFwiK2RpY2V0b2JlKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgUm9sbERpY2U6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgICB2YXIgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuICAgICAgICAgdmFyIERpY2UyPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcblxyXG4gICAgICAgIC8vIHZhciBEaWNlMT0yMDtcclxuICAgICAgICAvLyB2YXIgRGljZTI9MTtcclxuXHJcbiAgICAgICAgRGljZVJvbGw9RGljZTErRGljZTI7XHJcbiAgICAgICAgdmFyIF9uZXdSb2xsPXtkaWNlMTpEaWNlMSxkaWNlMjpEaWNlMn1cclxuICAgICAgICAvL0RpY2VSb2xsPTIzO1xyXG4gICAgICAgIC8vdGhpcy5UZW1wQ2hlY2tTcGFjZShEaWNlUm9sbCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJkaWNlIG51bWJlcjogXCIrRGljZVJvbGwrXCIsIERpY2UxOlwiK0RpY2UxK1wiLCBEaWNlMjpcIitEaWNlMik7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMyxfbmV3Um9sbCk7IFxyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsT25lRGljZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgcmV0dXJuIERpY2UxO1xyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsVHdvRGljZXMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaWNlMT10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgIHZhciBEaWNlMj10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgIHJldHVybiAoRGljZTErRGljZTIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjYWxsVXBvbkNhcmQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfc3BhY2VJRD1wYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICBpZihfc3BhY2VJRCE9NiAmJiBfc3BhY2VJRCE9NykgLy82IG1lYW5zIHBheWRheSBhbmQgNyBtZWFucyBkb3VibGUgcGF5ZGF5LCA5IG1lbmFzIHNlbGwgc3BhY2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBSYW5kb21DYXJkPXRoaXMuZ2V0UmFuZG9tKDAsMTUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9mb3IgdGVzdGluZyBvbmx5XHJcbiAgICAgICAgICAgIGlmKF9zcGFjZUlEPT0yKSAvL2xhbmRlZCBvbiBzb21lIGJpZyBidXNlaW5zc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleD1bMCwxLDcsMTBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsNCk7XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihfc3BhY2VJRD09NSkgLy9sYW5kZWQgb24gc29tZSBsb3NzZXMgY2FyZHNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXg9WzAsNSw2LDJdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsNCk7XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgLy9SYW5kb21DYXJkPTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihfc3BhY2VJRD09MykgLy9sYW5kZWQgb24gc29tZSBtYXJrZXRpbmcgY2FyZHNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXg9WzAsNywzLDgsMTMsOV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw2KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYoX3NwYWNlSUQ9PTEpIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNiwxMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw0KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikgLy9mb3IgcmVhbCBwbGF5ZXJcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YT17XCJyYW5kb21DYXJkXCI6UmFuZG9tQ2FyZCxcImNvdW50ZXJcIjpSb2xsQ291bnRlcn07ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkgLy9mb3IgYm90XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBTZW5kaW5nRGF0YT17XCJyYW5kb21DYXJkXCI6UmFuZG9tQ2FyZCxcImNvdW50ZXJcIjpSb2xsQ291bnRlcn07ICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yQ2FyZChTZW5kaW5nRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcGxldGVDYXJkVHVybigpXHJcbiAgICB7XHJcbiAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2FsbEdhbWVDb21wbGV0ZShfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX2lzQm90PT1mYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PXRoaXMuVHVybk51bWJlcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD09ZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLmlzR2FtZUZpbmlzaGVkPXRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfY2FzaD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgSE1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBCTUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYW5BbW91bnQrPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBCTUNhc2g9KEJNQW1vdW50K0JNTG9jYXRpb25zKSoxNTAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBITUNhc2g9MDtcclxuICAgICAgICAgICAgICAgICAgICBpZihITUFtb3VudD09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTYwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoSE1BbW91bnQ9PTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD0yNTAwMCs2MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArMjUwMDArNjAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBUb3RhbEFzc2V0cz1fY2FzaCtCTUNhc2grSE1DYXNoLWxvYW5BbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbFNjb3JlPVRvdGFsQXNzZXRzO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD10aGlzLlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD09ZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfY2FzaD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaDtcclxuICAgICAgICAgICAgICAgIHZhciBITUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIEJNQW1vdW50PXRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBCTUxvY2F0aW9ucz10aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hbkFtb3VudCs9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBCTUNhc2g9KEJNQW1vdW50K0JNTG9jYXRpb25zKSoxNTAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBITUNhc2g9MDtcclxuICAgICAgICAgICAgICAgICAgICBpZihITUFtb3VudD09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTYwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoSE1BbW91bnQ9PTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD0yNTAwMCs2MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArMjUwMDArNjAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBUb3RhbEFzc2V0cz1fY2FzaCtCTUNhc2grSE1DYXNoLWxvYW5BbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbFNjb3JlPVRvdGFsQXNzZXRzOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgIFJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoX2RhdGEpXHJcbiAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDYsX2RhdGEpO1xyXG4gICB9LFxyXG5cclxuICAgU3luY0dhbWVPdmVyKF9VSUQpXHJcbiAgIHtcclxuICAgIFxyXG4gICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgICAgICB2YXIgTXlEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyPXRydWU7XHJcblxyXG4gICAgICAgIGlmKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRD09X1VJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IHdvblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoOiBcIitNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlK1wiXFxuXCIrJ1xcbicrXHJcbiAgICAgICAgICAgICAgICBcIkNvbmdyYXRzISB5b3VyIGNhc2ggaXMgaGlnaGVzdCwgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiK1wiXFxuXCIrJ1xcbicrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAgICAgMTUwMDBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoOiBcIitNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlK1wiXFxuXCIrJ1xcbicrXHJcbiAgICAgICAgICAgICAgICBcInVuZm9ydHVuYXRlbHkgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIDE1MDAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIH0sIDE1MDYwKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpLy93aXRoIGJvdFxyXG4gICAge1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICB2YXIgTXlEYXRhPXRoaXMuUGxheWVyR2FtZUluZm9bMF07XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1swXS5HYW1lT3Zlcj10cnVlO1xyXG5cclxuICAgICAgICBpZihNeURhdGEuUGxheWVyVUlEPT1fVUlEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy95b3Ugd29uXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsIENhc2g6IFwiK015RGF0YS5Ub3RhbFNjb3JlK1wiXFxuXCIrJ1xcbicrXHJcbiAgICAgICAgICAgICAgICBcIkNvbmdyYXRzISB5b3VyIGNhc2ggaXMgaGlnaGVzdCwgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiK1wiXFxuXCIrJ1xcbicrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAgICAgMTUwMDBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoOiBcIitNeURhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJ1bmZvcnR1bmF0ZWx5IHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCIrXCJcXG5cIisnXFxuJytcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJHYW1lIHdpbGwgYmUgcmVzdGFydGVkIGF1dG9tYXRjYWxseSBhZnRlciAxNSBzZWNvbmRzXCIsXHJcbiAgICAgICAgICAgICAgICAxNTAwMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICAgICAgICB9LCAxNTA2MCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgfSxcclxuXHJcbiAgICBTdGFydERpY2VSb2xsOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZihSb2xsQ291bnRlcj49R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZW92ZXJcIik7XHJcbiAgICAgICAgICAgIGlzR2FtZU92ZXI9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwbGF5ZXJjb21wbGV0ZWQ9MDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuaXNHYW1lRmluaXNoZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXllcmNvbXBsZXRlZD09dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF4PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBTZWxlY3RlZEluZD0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKF92YWx1ZSA+IG1heClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RlZEluZD1pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9X3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIrU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dhbWUgY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1zXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vZm9yIGJvdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyY29tcGxldGVkPTA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YT10aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihNYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYocGxheWVyY29tcGxldGVkPT10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heD0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQ9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFNlc3Npb25EYXRhPXRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBTZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdmFsdWUgPiBtYXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWRJbmQ9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PV92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIHdvbiBieSBwbGF5ZXIgaWQ6IFwiK1Nlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKFNlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dhbWUgY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1zXHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGljZVRlbXA9RGljZVRlbXArMTsgXHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgdGhpcy5Ud2VlblBsYXllcih0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFJhbmRvbTpmdW5jdGlvbihtaW4sbWF4KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSApICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gICAgfSxcclxuXHJcbiAgICBUd2VlbkNhbWVyYTogZnVuY3Rpb24gKF9wb3MsIGlzWm9vbSx0aW1lKSB7ICAgXHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5DYW1lcmFOb2RlKVxyXG4gICAgICAgIC50byh0aW1lLCB7IHBvc2l0aW9uOiBjYy52MihfcG9zLngsIF9wb3MueSl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmKGlzWm9vbSlcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFpvb21DYW1lcmFJbiAoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICBpZih0aGlzLkNhbWVyYS56b29tUmF0aW88MilcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz10aGlzLkNhbWVyYS56b29tUmF0aW8rMC4wMztcclxuICAgICAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIDEwKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tQYXlEYXlDb25kaXRpb25zKF9pc0JvdD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpPT02KVxyXG4gICAgICAgICAgICBQYXNzZWRQYXlEYXk9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBpZihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpPT03KVxyXG4gICAgICAgICAgICBEb3VibGVQYXlEYXk9dHJ1ZTtcclxuXHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheTtcclxuICAgICAgICBpZihQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSAmJiAhX25leHRUdXJuRG91YmxlUGF5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSxfaXNCb3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKChEb3VibGVQYXlEYXkpIHx8IChQYXNzZWRQYXlEYXkgJiYgX25leHRUdXJuRG91YmxlUGF5KSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24odHJ1ZSxfaXNCb3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgWm9vbUNhbWVyYU91dCAoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ2FtZXJhLnpvb21SYXRpbz49MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz1mYWxzZTtcclxuICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPXRoaXMuQ2FtZXJhLnpvb21SYXRpby0wLjAzO1xyXG4gICAgICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbj1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MTtcclxuXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKDApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZighaXNHYW1lT3ZlcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikgLy9yZWFsIHBsYXllclxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoZWNrUGF5RGF5Q29uZGl0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKSAvL2JvdFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAvLyBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3Q9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnModGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuUGxheWVyOiBmdW5jdGlvbiAoTm9kZSxUb1Bvcykge1xyXG4gICAgICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgICAgLnRvKDAuNCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmKERpY2VUZW1wPERpY2VSb2xsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIWlzR2FtZU92ZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpLy9mb3IgYm90XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NilcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5PXRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKFJvbGxDb3VudGVyPT0xMilcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPVJvbGxDb3VudGVyKzIxOyAgXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPVJvbGxDb3VudGVyKzE7XHJcblxyXG4gICAgICAgICAgICAvL0RpY2VUZW1wPURpY2VUZW1wKzE7IFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhEaWNlVGVtcCtcIiBcIitSb2xsQ291bnRlcik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgLy90aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfbmV3cG9zPWNjLlZlYzIoMCwwKTtcclxuICAgICAgICAgICAgdGhpcy5Ud2VlbkNhbWVyYShfbmV3cG9zLGZhbHNlLDAuNik7IC8vem9vbW91dFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9ydWxlcyBpbXBsbWVudGF0aW9uIGR1cmluZyB0dXJuICh0dXJuIGRlY2lzaW9ucylcclxuXHJcbiAgICBUb2dnbGVQYXlEYXkoX3N0MSxfU3QyKVxyXG4gICAge1xyXG4gICAgICAgIFBhc3NlZFBheURheT1fc3QxO1xyXG4gICAgICAgIERvdWJsZVBheURheT1fU3QyO1xyXG4gICAgfSxcclxuXHJcbiAgICBFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oYW1vdW50LF9pbmRleCxfbG9jYXRpb25OYW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoPj1hbW91bnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaC1hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQrMTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUucHVzaChfbG9jYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLDEwMDApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgICB9LCAxMjAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoIHRvIGV4cGFuZCB0aGlzIGJ1c2luZXNzLCBjYXNoIG5lZWRlZCAkIFwiK2Ftb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbigpXHJcbiAgICB7XHJcbiAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYocGFyc2VJbnQodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc1R5cGUpPT0yKSAvL3RoaXMgbWVhbnMgdGhlcmUgaXMgYnJpY2sgYW5kIG1vcnRhciBpbiBsaXN0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0QnVzaW5lc3NJbmRleChpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5SZXNldEVkaXRCb3goKTtcclxuICAgICAgICAgICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhCdXNpbmVzc0xvY2F0aW9uTm9kZXMpO1xyXG4gICAgICAgIHJldHVybiBCdXNpbmVzc0xvY2F0aW9uTm9kZXMubGVuZ3RoO1xyXG4gICAgfSxcclxuXHJcbiAgICBEZXN0cm95R2VuZXJhdGVkTm9kZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBCdXNpbmVzc0xvY2F0aW9uTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uKF9uYW1lLF9TaGFyZUFtb3VudCxfaXNBZGRpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX2lzQWRkaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9zdG9jaz1uZXcgU3RvY2tJbmZvKCk7XHJcbiAgICAgICAgICAgIF9zdG9jay5CdXNpbmVzc05hbWU9X25hbWU7XHJcbiAgICAgICAgICAgIF9zdG9jay5TaGFyZUFtb3VudD1fU2hhcmVBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZlN0b2Nrcy5wdXNoKF9zdG9jayk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBQcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihfaXNEb3VibGVQYXlEYXk9ZmFsc2UsX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFBheWRheT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk7XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXk7XHJcbiAgICAgICAgX3NraXBCTU5leHRQYXlkYXk9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk7XHJcblxyXG4gICAgICAgIGlmKF9za2lwTmV4dFBheWRheSkgLy9pZiBwcmV2aW91c2x5IHNraXAgcGF5ZGF5IHdhcyBzdG9yZWQgYnkgYW55IGNhcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBpZighX2lzQm90KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgUGF5RGF5LlwiLDE2MDApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgICAgIH0sIDE2NTApO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIFBheURheS5cIik7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3RpdGxlPVwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZihfaXNEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICBfdGl0bGU9XCJEb3VibGVQYXlEYXlcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgX3RpdGxlPVwiUGF5RGF5XCI7XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQXNzaWduRGF0YV9QYXlEYXkoX3RpdGxlLF9pc0RvdWJsZVBheURheSxfc2tpcEhNTmV4dFBheWRheSxfc2tpcEJNTmV4dFBheWRheSxfaXNCb3QpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQmFua3J1cHRfVHVybkRlY2lzaW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCYW5rcnVwdD10cnVlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCs9MTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsZmFsc2UsdGhpcy5TZWxlY3RlZE1vZGUsdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQsdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJhbmtydXB0QW1vdW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50LF91SUQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9kYXRhID0geyBEYXRhOiB7IENhc2g6IF9hbW91bnQsIElEOiBfdUlEIH0gfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDEzLCBfZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpID09IGZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9hbW91bnQgPSBfZGF0YS5EYXRhLkNhc2g7XHJcbiAgICAgICAgICAgIHZhciBfaUQ9X2RhdGEuRGF0YS5JRDtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIF9teUluZGV4ID0gdGhpcy5HZXRNeUluZGV4KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uUGxheWVyVUlEID09IF9pRCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XS5pc0dhbWVGaW5pc2hlZCA9PSB0cnVlKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX215SW5kZXhdLlRvdGFsU2NvcmUrPV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfbXlJbmRleF0uQ2FzaCArPSBfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHJlY2VpdmVkIHByb2ZpdCBvZiAkXCIgKyBfYW1vdW50ICsgXCIgZnJvbSB5b3VyIHBhcnRuZXIuXCIsMjgwMCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW19teUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuLy8jZW5kcmVnaW9uXHJcbiAgIFxyXG4gICAgLy8jcmVnaW9uIENhcmRzIFJ1bGVzXHJcbiAgICBUb2dnbGVEb3VibGVQYXlOZXh0VHVybihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk9X25leHRUdXJuRG91YmxlUGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwTmV4dFR1cm4oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm49X3NraXBOZXh0VHVybjtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBOZXh0UGF5ZGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk9X3NraXBOZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5PV9za2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcEJNTmV4dFBheWRheT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk9X3NraXBCTU5leHRQYXlkYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVR1cm5Qcm9ncmVzcyhfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgVHVybkluUHJvZ3Jlc3M9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXR1cm5UdXJuUHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBUdXJuSW5Qcm9ncmVzcztcclxuICAgIH0sXHJcblxyXG4gICAgTG9zZUFsbE1hcmtldGluZ01vbmV5KClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2xvc2VBbW91bnQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2xvc2VBbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfbG9zZUFtb3VudD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9sb3NlQW1vdW50XHJcbiAgICB9LFxyXG5cclxuICAgIE11bHRpcGx5TWFya2V0aW5nTW9uZXkoX211bHRpcGxpZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9hbW91bnRJbmNyZWFzZWQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudEluY3JlYXNlZD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50Kj1fbXVsdGlwbGllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudEluY3JlYXNlZD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9hbW91bnRJbmNyZWFzZWRcclxuICAgIH0sXHJcblxyXG4gICAgR2V0TWFya2V0aW5nTW9uZXkoX3Byb2ZpdClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2Ftb3VudD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcHJvZml0PShfcHJvZml0LzEwMCk7XHJcbiAgICAgICAgICAgIF9hbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCo9X3Byb2ZpdDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCs9X2Ftb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9hbW91bnRcclxuICAgIH0sXHJcblxyXG4gICAgUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24oX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF91c2VySUQ9X2RhdGEuVXNlcklEO1xyXG4gICAgICAgIHZhciBfcXVlc3Rpb25JbmRleD1fZGF0YS5RdWVzdGlvbjtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PV9kYXRhLlVzZXJJbmRleDtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihfdXNlcklEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIklEIG1hdGNoZWRcIik7XHJcblxyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgT25lUXVlc3Rpb25JbmRleD1fcXVlc3Rpb25JbmRleDtcclxuICAgICAgICAgICAgdmFyIF9xdWVzdGlvbkFza2VkPU9uZVF1ZXN0aW9uc1tfcXVlc3Rpb25JbmRleC0xXTtcclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9xdWVzdGlvbkFza2VkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uKF9pc1R1cm5PdmVyPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbXlEYXRhO1xyXG4gICAgICAgIHZhciBfcm9vbURhdGE7XHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jvb21EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgICAgICAgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9teURhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgICAgICAgX3Jvb21EYXRhPXRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsX3Jvb21EYXRhLF9pc1R1cm5PdmVyLHRoaXMuU2VsZWN0ZWRNb2RlKVxyXG4gICAgXHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uRGVjaXNpb25fUGF5QW1vdW50X09uZVF1ZXN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgaWYoX215RGF0YS5DYXNoPj01MDAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihfbXlEYXRhLlBsYXllclVJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2gtPTUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBwYWlkIGNhc2ggYW1vdW50IHRvIHBsYXllci5cIiwxMjAwKTtcclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKHRydWUsZmFsc2UsLTEsX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvbl9BbnN3ZXJRdWVzdGlvbl9PbmVRdWVzdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9teURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBhbnN3ZXJlZCB0aGUgcXVlc3Rpb24uXCIsMTIwMCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsdHJ1ZSxPbmVRdWVzdGlvbkluZGV4LF9teURhdGEuUGxheWVyVUlEKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9oYXNEb25lUGF5bWVudCxfaGFzQW5zd2VyZWRRdWVzdGlvbixfcXVlc3Rpb25JbmRleCxfVXNlcklEKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZGF0YT17UGF5bWVudERvbmU6X2hhc0RvbmVQYXltZW50LFF1ZXN0aW9uQW5zd2VyZWQ6X2hhc0Fuc3dlcmVkUXVlc3Rpb24sUXVlc3Rpb25JbmRleDpfcXVlc3Rpb25JbmRleCxJRDpfVXNlcklEfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDgsX2RhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfZGF0YSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfaGFzRG9uZVBheW1lbnQ9X2RhdGEuUGF5bWVudERvbmU7XHJcbiAgICAgICAgICAgIHZhciBfaGFzQW5zd2VyZWRRdWVzdGlvbj1fZGF0YS5RdWVzdGlvbkFuc3dlcmVkO1xyXG4gICAgICAgICAgICB2YXIgX3F1ZXN0aW9uSW5kZXg9X2RhdGEuUXVlc3Rpb25JbmRleDtcclxuICAgICAgICAgICAgdmFyIF91SUQ9X2RhdGEuSUQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihfaGFzRG9uZVBheW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCs9NTAwMDtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIHJlZnVzZWQgdG8gYW5zd2VyIHRoZSBxdWVzdGlvbiBpbnN0ZWFkIHBheWVkIHRoZSBjYXNoIGFtb3VudCwgJDUwMDAgYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKF9oYXNBbnN3ZXJlZFF1ZXN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3NlbGVjdGVkUGxheWVySW5kZXg9MDtcclxuICAgICAgICAgICAgICAgIHZhciBfYWN0b3JzRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF91SUQ9PV9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZFBsYXllckluZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoX3F1ZXN0aW9uSW5kZXg9PTEpLy9oYXZlIHlvdSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihfcXVlc3Rpb25JbmRleD09MikvL0hhdmUgeW91IHRha2VuIGFueSBsb2FuP1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9sb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSB0YWtlbiBzb21lIGxvYW5cIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHRha2VuIGFueSBsb2FuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTMpLy9BcmUgeW91IGJhbmtydXB0ZWQ/IGlmIG1vcmUgdGhhbiBvbmNlLCB0ZWxsIG1lIHRoZSBhbW91bnQ/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuSXNCYW5rcnVwdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZCBcIitfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5CYW5rcnVwdEFtb3VudCtcIiB0aW1lL2VzLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTQpLy9JcyB5b3VyIHR1cm4gZ29pbmcgdG8gYmUgc2tpcHBlZCBuZXh0IHRpbWU/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBiZSBza2lwcGVkLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIG5vdCBiZSBza2lwcGVkLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTUpLy9JcyBpdCBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSB5b3VyIG5leHQgcGF5ZGF5P1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIGJlIGRvdWJsZSBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIG5vdCBiZSBkb3VibGUgcGF5ZGF5XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjE1MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZihJc1R3ZWVuaW5nPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfc3BhY2VzPV9kYXRhLkRhdGEuYmFja3NwYWNlcztcclxuICAgICAgICAgICAgdmFyIF9jb3VudGVyPV9kYXRhLkRhdGEuQ291bnRlcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2NvdW50ZXIrQmFja3NwYWNlc10uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zLDAuMSk7XHJcblxyXG4gICAgICAgICAgICBSb2xsQ291bnRlcj1fY291bnRlcjtcclxuICAgICAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuUGxheWVyX0dvQmFja1NwYWNlczogZnVuY3Rpb24gKE5vZGUsVG9Qb3Msc3BlZWQ9MC42KSB7XHJcbiAgICAgICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgICAudG8oc3BlZWQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBSb2xsQ291bnRlci09QmFja3NwYWNlcztcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfZGF0YT17RGF0YTp7YmFja3NwYWNlczpCYWNrc3BhY2VzLENvdW50ZXI6Um9sbENvdW50ZXJ9fTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMCxfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbn0pO1xyXG4vL21vZHVsZS5leHBvcnRzICA9IFBsYXllckRhdGE7IC8vd2hlbiBpbXBvcnRzIGluIGFub3RoZXIgc2NyaXB0IG9ubHkgcmVmZXJlbmNlIG9mIHBsYXllcmRhdGEgY2xhc3Mgd291bGQgYmUgYWJsZSB0byBhY2Nlc3NlZCBmcm9tIEdhbWVtYW5hZ2VyIGltcG9ydFxyXG5tb2R1bGUuZXhwb3J0cyAgPSBHYW1lTWFuYWdlcjtcclxuLy8jZW5kcmVnaW9uIl19