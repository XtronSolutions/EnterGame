
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
            // var valueIndex=[0,5,6,2];
            // var index=this.getRandom(0,4);
            // RandomCard=valueIndex[index];
            RandomCard = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIkxvY2F0aW9uc05hbWUiLCJMb2FuVGFrZW4iLCJMb2FuQW1vdW50IiwiY3RvciIsIkNhcmREYXRhRnVuY3Rpb25hbGl0eSIsIk5leHRUdXJuRG91YmxlUGF5IiwiU2tpcE5leHRUdXJuIiwiU2tpcE5leHRQYXlkYXkiLCJTa2lwSE1OZXh0UGF5ZGF5IiwiU2tpcEJNTmV4dFBheWRheSIsIlN0b2NrSW5mbyIsIlNoYXJlQW1vdW50IiwiUGxheWVyRGF0YSIsIlBsYXllck5hbWUiLCJQbGF5ZXJVSUQiLCJBdmF0YXJJRCIsIklzQm90IiwiTm9PZkJ1c2luZXNzIiwiQ2FyZEZ1bmN0aW9uYWxpdHkiLCJIb21lQmFzZWRBbW91bnQiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiTm9PZlN0b2NrcyIsIkNhc2giLCJHb2xkQ291bnQiLCJTdG9ja0NvdW50IiwiTWFya2V0aW5nQW1vdW50IiwiTGF3eWVyU3RhdHVzIiwiSXNCYW5rcnVwdCIsIkJhbmtydXB0QW1vdW50IiwiU2tpcHBlZExvYW5QYXltZW50IiwiUGxheWVyUm9sbENvdW50ZXIiLCJJbml0aWFsQ291bnRlckFzc2lnbmVkIiwiaXNHYW1lRmluaXNoZWQiLCJUb3RhbFNjb3JlIiwiR2FtZU92ZXIiLCJSb2xsQ291bnRlciIsIkRpY2VUZW1wIiwiRGljZVJvbGwiLCJJc1R3ZWVuaW5nIiwiR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIiwiVHVybkNoZWNrQXJyYXkiLCJCdXNpbmVzc0xvY2F0aW9uTm9kZXMiLCJQYXNzZWRQYXlEYXkiLCJEb3VibGVQYXlEYXkiLCJfbmV4dFR1cm5Eb3VibGVQYXkiLCJfc2tpcE5leHRUdXJuIiwiX3NraXBOZXh0UGF5ZGF5IiwiX3NraXBITU5leHRQYXlkYXkiLCJfc2tpcEJNTmV4dFBheWRheSIsIkNhcmRFdmVudFJlY2VpdmVkIiwiVHVybkluUHJvZ3Jlc3MiLCJCYWNrc3BhY2VzIiwiaXNHYW1lT3ZlciIsIk9uZVF1ZXN0aW9uSW5kZXgiLCJPbmVRdWVzdGlvbnMiLCJDYXJkRGlzcGxheVNldFRpbW91dCIsIkdhbWVNYW5hZ2VyIiwiQ29tcG9uZW50IiwiUGxheWVyR2FtZUluZm8iLCJCb3RHYW1lSW5mbyIsIlBsYXllck5vZGUiLCJOb2RlIiwiQ2FtZXJhTm9kZSIsIkFsbFBsYXllclVJIiwiQWxsUGxheWVyTm9kZXMiLCJTdGFydExvY2F0aW9uTm9kZXMiLCJTZWxlY3RlZE1vZGUiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJvbkxvYWQiLCJUdXJuTnVtYmVyIiwiVHVybkNvbXBsZXRlZCIsIkNoZWNrUmVmZXJlbmNlcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRTZWxlY3RlZE1vZGUiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsImNvbnNvbGUiLCJlcnJvciIsIkNoZWNrU3BlY3RhdGUiLCJsb2ciLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIkFsbERhdGEiLCJNYXhQbGF5ZXJzIiwibGVuZ3RoIiwiU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyIiwiVXBkYXRlR2FtZVVJIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJHZXRUdXJuTnVtYmVyIiwiU3luY0RhdGFUb1BsYXllckdhbWVJbmZvIiwiQXNzaWduUGxheWVyR2FtZVVJIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsImluZGV4IiwiX3RvUG9zIiwiVmVjMiIsIkdldF9TcGFjZU1hbmFnZXIiLCJEYXRhIiwiUmVmZXJlbmNlTG9jYXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5Iiwic2V0UG9zaXRpb24iLCJhY3RpdmUiLCJDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyIiwiVG90YWxDb25uZWN0ZWRQbGF5ZXJzIiwibXlSb29tQWN0b3JDb3VudCIsIlBob3RvbkFjdG9yIiwiY3VzdG9tUHJvcGVydGllcyIsInVzZXJJRCIsInNldEN1c3RvbVByb3BlcnR5IiwiQ2hhbmdlVHVybiIsIlJhaXNlRXZlbnRGb3JDYXJkIiwiX2RhdGEiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiRGlzcGxheUNhcmRPbk90aGVycyIsIk9uTGFuZGVkT25TcGFjZSIsInNldFRpbWVvdXQiLCJSZXNldENhcmREaXNwbGF5IiwiUmVjZWl2ZUV2ZW50Rm9yQ2FyZCIsIlJhbmRvbUNhcmQiLCJyYW5kb21DYXJkIiwiY291bnRlciIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJTeW5jQWxsRGF0YSIsIlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZSIsIl91aWQiLCJwdXNoIiwiQXJyYXlMZW5ndGgiLCJJREZvdW5kIiwiVHVybkhhbmRsZXIiLCJfdHVybiIsIl9wbGF5ZXJNYXRjaGVkIiwiVG9nZ2xlVHVyblByb2dyZXNzIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUmVzZXRUdXJuVmFyaWFibGUiLCJSb2xsRGljZSIsIkRpY2VSb2xsU2NyZWVuIiwiUGxheWVySW5mbyIsIlJvb21BY3RvcnMiLCJTaG93VG9hc3QiLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJfaW5kIiwiTWFpblNlc3Npb25EYXRhIiwiTXlEYXRhIiwiX2NvdW50ZXIiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIlN0YXJ0VHVybiIsIkVuYWJsZVBsYXllck5vZGVzIiwiUmVjZWl2ZUJhbmtydXB0RGF0YSIsIl9pc0JhbmtydXB0ZWQiLCJiYW5rcnVwdGVkIiwidHVybiIsIl9wbGF5ZXJEYXRhIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiX3JhbmRvbUluZGV4IiwiZ2V0UmFuZG9tIiwiU2V0TmFtZSIsIl90b2dnbGVIaWdobGlnaHQiLCJfaW5kZXgiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzIiwidGFyZ2V0UG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicGFyZW50IiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJyYXRpbyIsIndpblNpemUiLCJoZWlnaHQiLCJ6b29tUmF0aW8iLCJsYXRlVXBkYXRlIiwic3luY0RpY2VSb2xsIiwiX3JvbGwiLCJfZGljZTEiLCJkaWNlMSIsIl9kaWNlMiIsImRpY2UyIiwiX3Jlc3VsdCIsIm15Um9vbUFjdG9yc0FycmF5IiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwiQW5pbWF0ZURpY2UiLCJEaWNlRnVudGlvbmFsaXR5IiwiX3BvcyIsIlR3ZWVuQ2FtZXJhIiwiVGVtcENoZWNrU3BhY2UiLCJfcm9sbGluZyIsInRlbXBjb3VudGVyIiwidGVtcGNvdW50ZXIyIiwiZGljZXRvYmUiLCJwYXJzZUludCIsIlNwYWNlRGF0YSIsIlNwYWNlc1R5cGUiLCJEaWNlMSIsIkRpY2UyIiwiX25ld1JvbGwiLCJSb2xsT25lRGljZSIsIlJvbGxUd29EaWNlcyIsImNhbGxVcG9uQ2FyZCIsIl9zcGFjZUlEIiwidmFsdWVJbmRleCIsIlNlbmRpbmdEYXRhIiwiY29tcGxldGVDYXJkVHVybiIsIkNhbGxHYW1lQ29tcGxldGUiLCJfaXNCb3QiLCJfcGxheWVySW5kZXgiLCJfY2FzaCIsIkhNQW1vdW50IiwiR2V0X0dhbWVNYW5hZ2VyIiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsImxvYW5BbW91bnQiLCJCTUNhc2giLCJITUNhc2giLCJUb3RhbEFzc2V0cyIsIlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUiLCJTeW5jR2FtZU92ZXIiLCJfVUlEIiwiUmVzdGFydEdhbWUiLCJTdGFydERpY2VSb2xsIiwiWm9vbUNhbWVyYU91dCIsInBsYXllcmNvbXBsZXRlZCIsIm1heCIsIlNlbGVjdGVkSW5kIiwiU2Vzc2lvbkRhdGEiLCJfdmFsdWUiLCJUd2VlblBsYXllciIsIm1pbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImlzWm9vbSIsInRpbWUiLCJ0d2VlbiIsInRvIiwidjIiLCJlYXNpbmciLCJjYWxsIiwiWm9vbUNhbWVyYUluIiwic3RhcnQiLCJDaGVja1BheURheUNvbmRpdGlvbnMiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIlRvZ2dsZVBheURheSIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIiwiVG9Qb3MiLCJfbmV3cG9zIiwiX3N0MSIsIl9TdDIiLCJFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iLCJhbW91bnQiLCJfbG9jYXRpb25OYW1lIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIlNldEJ1c2luZXNzSW5kZXgiLCJSZXNldEVkaXRCb3giLCJEZXN0cm95R2VuZXJhdGVkTm9kZXMiLCJkZXN0cm95IiwiVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiX1NoYXJlQW1vdW50IiwiX2lzQWRkaW5nIiwiX3N0b2NrIiwiX2lzRG91YmxlUGF5RGF5IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIl90aXRsZSIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiX3N0YXRlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiUmV0dXJuVHVyblByb2dyZXNzIiwiTG9zZUFsbE1hcmtldGluZ01vbmV5IiwiX2xvc2VBbW91bnQiLCJNdWx0aXBseU1hcmtldGluZ01vbmV5IiwiX211bHRpcGxpZXIiLCJfYW1vdW50SW5jcmVhc2VkIiwiR2V0TWFya2V0aW5nTW9uZXkiLCJfcHJvZml0IiwiX2Ftb3VudCIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiX3VzZXJJRCIsIlVzZXJJRCIsIl9xdWVzdGlvbkluZGV4IiwiUXVlc3Rpb24iLCJVc2VySW5kZXgiLCJfZ2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfcXVlc3Rpb25Bc2tlZCIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJfaXNUdXJuT3ZlciIsIl9teURhdGEiLCJfcm9vbURhdGEiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9QYXlBbW91bnRfT25lUXVlc3Rpb24iLCJSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJPbmVRdWVzdGlvbkRlY2lzaW9uX0Fuc3dlclF1ZXN0aW9uX09uZVF1ZXN0aW9uIiwiX2hhc0RvbmVQYXltZW50IiwiX2hhc0Fuc3dlcmVkUXVlc3Rpb24iLCJfVXNlcklEIiwiUGF5bWVudERvbmUiLCJRdWVzdGlvbkFuc3dlcmVkIiwiUXVlc3Rpb25JbmRleCIsIklEIiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJfdUlEIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfc2VsZWN0ZWRQbGF5ZXJJbmRleCIsIl9hY3RvcnNEYXRhIiwiX2xvYW5UYWtlbiIsIlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eSIsIl9zcGFjZXMiLCJiYWNrc3BhY2VzIiwiQ291bnRlciIsIlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyIsInNwZWVkIiwiR29CYWNrU3BhY2VzX3NwYWNlRnVuY3Rpb25hbGl0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBLElBQUlBLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUMzQkMsRUFBQUEsSUFBSSxFQUFDLENBRHNCO0FBRTNCQyxFQUFBQSxTQUFTLEVBQUUsQ0FGZ0I7QUFFSztBQUNoQ0MsRUFBQUEsY0FBYyxFQUFFLENBSFcsQ0FHSzs7QUFITCxDQUFSLENBQXZCLEVBTUE7O0FBQ0EsSUFBSUMsWUFBWSxHQUFHTCxFQUFFLENBQUNNLEtBQUgsQ0FBUztBQUN4QkMsRUFBQUEsSUFBSSxFQUFFLGNBRGtCO0FBRTVCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFFLGNBREU7QUFFUkMsSUFBQUEsWUFBWSxFQUNiO0FBQ0lDLE1BQUFBLFdBQVcsRUFBQyxNQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUViLGdCQUZWO0FBR0ksaUJBQVNBLGdCQUFnQixDQUFDRyxJQUg5QjtBQUlJVyxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0FIUztBQVNSQyxJQUFBQSx1QkFBdUIsRUFDeEI7QUFDSUosTUFBQUEsV0FBVyxFQUFFLE1BRGpCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGYjtBQUdJLGlCQUFTLEVBSGI7QUFJSUgsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBVlM7QUFnQlJHLElBQUFBLFlBQVksRUFDYjtBQUNJTixNQUFBQSxXQUFXLEVBQUUsTUFEakI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZiO0FBR0ksaUJBQVMsRUFIYjtBQUlJSCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0FqQlM7QUF1QlBJLElBQUFBLE1BQU0sRUFDSjtBQUNJUCxNQUFBQSxXQUFXLEVBQUUsUUFEakI7QUFFSSxpQkFBUyxDQUZiO0FBR0lDLE1BQUFBLElBQUksRUFBQ1osRUFBRSxDQUFDbUIsT0FIWjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0F4Qks7QUE4Qk5NLElBQUFBLGFBQWEsRUFDWjtBQUNJVCxNQUFBQSxXQUFXLEVBQUUsZUFEakI7QUFFSSxpQkFBUyxLQUZiO0FBR0lVLE1BQUFBLElBQUksRUFBQ3JCLEVBQUUsQ0FBQ3NCLE9BSFo7QUFJSVQsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBL0JLO0FBcUNMUyxJQUFBQSxTQUFTLEVBQ0w7QUFDSVosTUFBQUEsV0FBVyxFQUFDLFdBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGYjtBQUdJLGlCQUFTLEVBSGI7QUFJSUgsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBQztBQUxaLEtBdENDO0FBNENKVSxJQUFBQSxhQUFhLEVBQ1Y7QUFDSWIsTUFBQUEsV0FBVyxFQUFDLGVBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRSxDQUFDWixFQUFFLENBQUNnQixJQUFKLENBRlY7QUFHSSxpQkFBUyxFQUhiO0FBSUlILE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQTdDQztBQW1ESlcsSUFBQUEsU0FBUyxFQUNOO0FBQ0lkLE1BQUFBLFdBQVcsRUFBQyxXQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRmI7QUFHSSxpQkFBUyxLQUhiO0FBSUlULE1BQUFBLFlBQVksRUFBRTtBQUpsQixLQXBEQztBQXlESmEsSUFBQUEsVUFBVSxFQUNQO0FBQ0lmLE1BQUFBLFdBQVcsRUFBQyxZQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRmI7QUFHSSxpQkFBUyxDQUhiO0FBSUlOLE1BQUFBLFlBQVksRUFBRTtBQUpsQjtBQTFEQyxHQUZnQjtBQW9FNUJjLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUFFO0FBQ25CO0FBckUyQixDQUFULENBQW5CLEVBd0VBOztBQUNBLElBQUlDLHFCQUFxQixHQUFHNUIsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDakNDLEVBQUFBLElBQUksRUFBRSx1QkFEMkI7QUFFckNDLEVBQUFBLFVBQVUsRUFBRTtBQUNScUIsSUFBQUEsaUJBQWlCLEVBQ2xCO0FBQ0lsQixNQUFBQSxXQUFXLEVBQUMsbUJBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGYjtBQUdJLGlCQUFTLEtBSGI7QUFJSVQsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBQztBQUxaLEtBRlM7QUFRUmdCLElBQUFBLFlBQVksRUFDYjtBQUNJbkIsTUFBQUEsV0FBVyxFQUFDLGNBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGYjtBQUdJLGlCQUFTLEtBSGI7QUFJSVQsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBQztBQUxaLEtBVFM7QUFlUmlCLElBQUFBLGNBQWMsRUFDZjtBQUNJcEIsTUFBQUEsV0FBVyxFQUFDLGdCQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRmI7QUFHSSxpQkFBUyxLQUhiO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQWhCUztBQXNCUmtCLElBQUFBLGdCQUFnQixFQUNqQjtBQUNJckIsTUFBQUEsV0FBVyxFQUFDLGtCQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRmI7QUFHSSxpQkFBUyxLQUhiO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQXZCUztBQTZCUm1CLElBQUFBLGdCQUFnQixFQUNqQjtBQUNJdEIsTUFBQUEsV0FBVyxFQUFDLGtCQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRmI7QUFHSSxpQkFBUyxLQUhiO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWjtBQTlCUyxHQUZ5QjtBQXdDckNhLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUFFO0FBQ25CO0FBekNvQyxDQUFULENBQTVCLEVBMkNBOztBQUNBLElBQUlPLFNBQVMsR0FBR2xDLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ3JCQyxFQUFBQSxJQUFJLEVBQUUsV0FEZTtBQUV6QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBRSxXQURFO0FBRVJRLElBQUFBLFlBQVksRUFDYjtBQUNJTixNQUFBQSxXQUFXLEVBQUMsY0FEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZiO0FBR0ksaUJBQVMsRUFIYjtBQUlJSCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0FIUztBQVNScUIsSUFBQUEsV0FBVyxFQUNaO0FBQ0l4QixNQUFBQSxXQUFXLEVBQUUsYUFEakI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZiO0FBR0ksaUJBQVMsQ0FIYjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGI7QUFWUyxHQUZhO0FBb0J6QmEsRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQUU7QUFDbkI7QUFyQndCLENBQVQsQ0FBaEIsRUF3QkE7O0FBQ0EsSUFBSVMsVUFBVSxHQUFHcEMsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBQyxZQURpQjtBQUUxQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I2QixJQUFBQSxVQUFVLEVBQ1g7QUFDSTFCLE1BQUFBLFdBQVcsRUFBQyxZQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRmI7QUFHSSxpQkFBUyxFQUhiO0FBSUlILE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQUZTO0FBUVJ3QixJQUFBQSxTQUFTLEVBQ1Y7QUFDSTNCLE1BQUFBLFdBQVcsRUFBQyxXQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRmI7QUFHSSxpQkFBUyxFQUhiO0FBSUlILE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQVRTO0FBZVJ5QixJQUFBQSxRQUFRLEVBQ0w7QUFDSTVCLE1BQUFBLFdBQVcsRUFBRSxVQURqQjtBQUVJLGlCQUFTLENBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNtQixPQUhaO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQWhCSztBQXNCUjBCLElBQUFBLEtBQUssRUFDRjtBQUNJN0IsTUFBQUEsV0FBVyxFQUFFLE9BRGpCO0FBRUksaUJBQVMsS0FGYjtBQUdJVSxNQUFBQSxJQUFJLEVBQUNyQixFQUFFLENBQUNzQixPQUhaO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQXZCSztBQTZCUjJCLElBQUFBLFlBQVksRUFDYjtBQUNJOUIsTUFBQUEsV0FBVyxFQUFDLFVBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRSxDQUFDUCxZQUFELENBRlY7QUFHSSxpQkFBUyxFQUhiO0FBSUlRLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQTlCUztBQW9DUjRCLElBQUFBLGlCQUFpQixFQUNsQjtBQUNJL0IsTUFBQUEsV0FBVyxFQUFDLG1CQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVnQixxQkFGVjtBQUdJLGlCQUFTLEVBSGI7QUFJSWYsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBQztBQUxaLEtBckNTO0FBMkNSNkIsSUFBQUEsZUFBZSxFQUNoQjtBQUNJaEMsTUFBQUEsV0FBVyxFQUFDLGlCQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRmI7QUFHSSxpQkFBUyxDQUhiO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQTVDUztBQWtEUjhCLElBQUFBLG9CQUFvQixFQUNyQjtBQUNJakMsTUFBQUEsV0FBVyxFQUFDLHNCQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRmI7QUFHSSxpQkFBUyxDQUhiO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQW5EUztBQXlEUitCLElBQUFBLG9CQUFvQixFQUNyQjtBQUNJbEMsTUFBQUEsV0FBVyxFQUFDLHNCQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRmI7QUFHSSxpQkFBUyxDQUhiO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQTFEUztBQWdFUmdDLElBQUFBLFVBQVUsRUFDWDtBQUNJbkMsTUFBQUEsV0FBVyxFQUFDLFFBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRSxDQUFDc0IsU0FBRCxDQUZWO0FBR0ksaUJBQVMsRUFIYjtBQUlJckIsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBQztBQUxaLEtBakVTO0FBdUVSaUMsSUFBQUEsSUFBSSxFQUNEO0FBQ0lwQyxNQUFBQSxXQUFXLEVBQUUsWUFEakI7QUFFSSxpQkFBUyxDQUZiO0FBR0lDLE1BQUFBLElBQUksRUFBQ1osRUFBRSxDQUFDbUIsT0FIWjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0F4RUs7QUE4RVJrQyxJQUFBQSxTQUFTLEVBQ047QUFDSXJDLE1BQUFBLFdBQVcsRUFBRSxXQURqQjtBQUVJLGlCQUFTLENBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNtQixPQUhaO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQS9FSztBQXFGUm1DLElBQUFBLFVBQVUsRUFDUDtBQUNJdEMsTUFBQUEsV0FBVyxFQUFFLFlBRGpCO0FBRUksaUJBQVMsQ0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ21CLE9BSFo7QUFJSU4sTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBdEZLO0FBNEZSVyxJQUFBQSxTQUFTLEVBQ047QUFDSWQsTUFBQUEsV0FBVyxFQUFFLFdBRGpCO0FBRUksaUJBQVMsS0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ3NCLE9BSFo7QUFJSVQsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBN0ZLO0FBbUdQWSxJQUFBQSxVQUFVLEVBQ1I7QUFDSWYsTUFBQUEsV0FBVyxFQUFFLFlBRGpCO0FBRUksaUJBQVMsQ0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ21CLE9BSFo7QUFJSU4sTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBcEdLO0FBMEdSb0MsSUFBQUEsZUFBZSxFQUNaO0FBQ0l2QyxNQUFBQSxXQUFXLEVBQUUsaUJBRGpCO0FBRUksaUJBQVMsQ0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ21CLE9BSFo7QUFJSU4sTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBM0dLO0FBaUhScUMsSUFBQUEsWUFBWSxFQUNUO0FBQ0l4QyxNQUFBQSxXQUFXLEVBQUUsY0FEakI7QUFFSSxpQkFBUyxLQUZiO0FBR0lDLE1BQUFBLElBQUksRUFBQ1osRUFBRSxDQUFDc0IsT0FIWjtBQUlJVCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0FsSEs7QUF3SFJzQyxJQUFBQSxVQUFVLEVBQ1A7QUFDSXpDLE1BQUFBLFdBQVcsRUFBRSxZQURqQjtBQUVJLGlCQUFTLEtBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNzQixPQUhaO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQXpISztBQStIUnVDLElBQUFBLGNBQWMsRUFDWDtBQUNJMUMsTUFBQUEsV0FBVyxFQUFFLGdCQURqQjtBQUVJLGlCQUFTLENBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNtQixPQUhaO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQWhJSztBQXNJUndDLElBQUFBLGtCQUFrQixFQUNmO0FBQ0kzQyxNQUFBQSxXQUFXLEVBQUUsb0JBRGpCO0FBRUksaUJBQVMsS0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ3NCLE9BSFo7QUFJSVQsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBdklLO0FBNklSeUMsSUFBQUEsaUJBQWlCLEVBQ2Q7QUFDSTVDLE1BQUFBLFdBQVcsRUFBRSxtQkFEakI7QUFFSSxpQkFBUyxDQUZiO0FBR0lDLE1BQUFBLElBQUksRUFBQ1osRUFBRSxDQUFDbUIsT0FIWjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0E5SUs7QUFvSlIwQyxJQUFBQSxzQkFBc0IsRUFDbkI7QUFDSTdDLE1BQUFBLFdBQVcsRUFBRSx3QkFEakI7QUFFSSxpQkFBUyxLQUZiO0FBR0lDLE1BQUFBLElBQUksRUFBQ1osRUFBRSxDQUFDc0IsT0FIWjtBQUlJVCxNQUFBQSxZQUFZLEVBQUU7QUFKbEIsS0FySks7QUEwSlA0QyxJQUFBQSxjQUFjLEVBQ1I7QUFDSTlDLE1BQUFBLFdBQVcsRUFBQyxnQkFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZiO0FBR0ksaUJBQVMsS0FIYjtBQUlJVCxNQUFBQSxZQUFZLEVBQUU7QUFKbEIsS0EzSkM7QUFnS1A2QyxJQUFBQSxVQUFVLEVBQ0o7QUFDSS9DLE1BQUFBLFdBQVcsRUFBQyxZQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRmI7QUFHSSxpQkFBUyxDQUhiO0FBSUlOLE1BQUFBLFlBQVksRUFBRTtBQUpsQixLQWpLQztBQXNLUjhDLElBQUFBLFFBQVEsRUFDRDtBQUNJaEQsTUFBQUEsV0FBVyxFQUFDLFVBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGYjtBQUdJLGlCQUFTLEtBSGI7QUFJSVQsTUFBQUEsWUFBWSxFQUFFO0FBSmxCO0FBdktDLEdBRmM7QUErSzFCYyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVksQ0FBRTtBQUNuQjtBQWhMeUIsQ0FBVCxDQUFqQixFQW1MQTtBQUVBO0FBQ0E7O0FBQ0EsSUFBSWlDLFdBQVcsR0FBQyxDQUFoQjtBQUNBLElBQUlDLFFBQVEsR0FBQyxDQUFiO0FBQ0EsSUFBSUMsUUFBUSxHQUFDLENBQWI7QUFDQSxJQUFJQyxVQUFVLEdBQUMsS0FBZjtBQUNBLElBQUlDLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsY0FBYyxHQUFDLEVBQW5CO0FBQ0EsSUFBSUMscUJBQXFCLEdBQUMsRUFBMUI7QUFFQSxJQUFJQyxZQUFZLEdBQUMsS0FBakI7QUFDQSxJQUFJQyxZQUFZLEdBQUMsS0FBakIsRUFFQTs7QUFDQSxJQUFJQyxrQkFBa0IsR0FBQyxLQUF2QjtBQUNBLElBQUlDLGFBQWEsR0FBQyxLQUFsQjtBQUNBLElBQUlDLGVBQWUsR0FBQyxLQUFwQixFQUEyQjs7QUFDM0IsSUFBSUMsaUJBQWlCLEdBQUMsS0FBdEIsRUFBNkI7O0FBQzdCLElBQUlDLGlCQUFpQixHQUFDLEtBQXRCLEVBQTZCOztBQUM3QixJQUFJQyxpQkFBaUIsR0FBQyxLQUF0QjtBQUNBLElBQUlDLGNBQWMsR0FBQyxLQUFuQjtBQUVBLElBQUlDLFVBQVUsR0FBQyxDQUFmO0FBQ0EsSUFBSUMsVUFBVSxHQUFDLEtBQWY7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBQyxDQUFDLENBQXRCO0FBQ0EsSUFBSUMsWUFBWSxHQUNoQixDQUNJLHdDQURKLEVBRUksMEJBRkosRUFHSSwyQkFISixFQUlJLHdDQUpKLEVBS0ksZ0RBTEosQ0FEQTtBQVNBLElBQUlDLG9CQUFvQixHQUFDLElBQXpCO0FBRUEsSUFBSUMsV0FBVyxHQUFDakYsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDckJDLEVBQUFBLElBQUksRUFBQyxhQURnQjtBQUVyQixhQUFTUCxFQUFFLENBQUNrRixTQUZTO0FBR3JCMUUsRUFBQUEsVUFBVSxFQUFFO0FBQ1IyRSxJQUFBQSxjQUFjLEVBQUU7QUFDWixpQkFBUyxFQURHO0FBRVp2RSxNQUFBQSxJQUFJLEVBQUUsQ0FBQ3dCLFVBQUQsQ0FGTTtBQUdadkIsTUFBQUEsWUFBWSxFQUFFLElBSEY7QUFJWkMsTUFBQUEsT0FBTyxFQUFFO0FBSkcsS0FEUjtBQU1Sc0UsSUFBQUEsV0FBVyxFQUFFO0FBQ1QsaUJBQVMsRUFEQTtBQUVUeEUsTUFBQUEsSUFBSSxFQUFFLENBQUN3QixVQUFELENBRkc7QUFHVHZCLE1BQUFBLFlBQVksRUFBRSxJQUhMO0FBSVRDLE1BQUFBLE9BQU8sRUFBRTtBQUpBLEtBTkw7QUFXUnVFLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFRLElBREE7QUFFUnpFLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0YsSUFGRDtBQUdSekUsTUFBQUEsWUFBWSxFQUFFLElBSE47QUFJUkMsTUFBQUEsT0FBTyxFQUFDO0FBSkEsS0FYSjtBQWdCUnlFLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFRLElBREE7QUFFUjNFLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0YsSUFGRDtBQUdSekUsTUFBQUEsWUFBWSxFQUFFLElBSE47QUFJUkMsTUFBQUEsT0FBTyxFQUFDO0FBSkEsS0FoQko7QUFxQlIwRSxJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUSxFQURDO0FBRVQ1RSxNQUFBQSxJQUFJLEVBQUUsQ0FBQ1osRUFBRSxDQUFDc0YsSUFBSixDQUZHO0FBR1R6RSxNQUFBQSxZQUFZLEVBQUUsSUFITDtBQUlUQyxNQUFBQSxPQUFPLEVBQUM7QUFKQyxLQXJCTDtBQTBCUjJFLElBQUFBLGNBQWMsRUFBRTtBQUNaLGlCQUFRLEVBREk7QUFFWjdFLE1BQUFBLElBQUksRUFBRSxDQUFDWixFQUFFLENBQUNzRixJQUFKLENBRk07QUFHWnpFLE1BQUFBLFlBQVksRUFBRSxJQUhGO0FBSVpDLE1BQUFBLE9BQU8sRUFBQztBQUpJLEtBMUJSO0FBK0JSNEUsSUFBQUEsa0JBQWtCLEVBQUU7QUFDaEIsaUJBQVEsRUFEUTtBQUVoQjlFLE1BQUFBLElBQUksRUFBRSxDQUFDWixFQUFFLENBQUNzRixJQUFKLENBRlU7QUFHaEJ6RSxNQUFBQSxZQUFZLEVBQUUsSUFIRTtBQUloQkMsTUFBQUEsT0FBTyxFQUFDO0FBSlEsS0EvQlo7QUFvQ1A2RSxJQUFBQSxZQUFZLEVBQUU7QUFDWCxpQkFBUSxDQURHO0FBRVgvRSxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21CLE9BRkU7QUFHWE4sTUFBQUEsWUFBWSxFQUFFLElBSEg7QUFJWEMsTUFBQUEsT0FBTyxFQUFDO0FBSkc7QUFwQ1AsR0FIUztBQTZDckI4RSxFQUFBQSxPQUFPLEVBQUU7QUFDTHhELElBQUFBLFVBQVUsRUFBRUEsVUFEUDtBQUVML0IsSUFBQUEsWUFBWSxFQUFDQSxZQUZSO0FBR0xOLElBQUFBLGdCQUFnQixFQUFDQSxnQkFIWjtBQUlMOEYsSUFBQUEsUUFBUSxFQUFDO0FBSkosR0E3Q1k7QUFvRHJCOztBQUVBOzs7Ozs7QUFNQUMsRUFBQUEsTUE1RHFCLG9CQTREWDtBQUNOYixJQUFBQSxXQUFXLENBQUNZLFFBQVosR0FBcUIsSUFBckI7QUFDQSxTQUFLRSxVQUFMLEdBQWdCLENBQWhCO0FBQ0EsU0FBS0MsYUFBTCxHQUFtQixLQUFuQjtBQUNBL0IsSUFBQUEsY0FBYyxHQUFDLEVBQWY7QUFDQSxTQUFLZ0MsZUFBTDtBQUNBLFNBQUtOLFlBQUwsR0FBa0IzQix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOERDLGVBQTlELEVBQWxCO0FBQ0EsU0FBS0MsZ0JBQUw7QUFFQSxTQUFLQyxlQUFMLEdBQXFCLENBQXJCO0FBQ0EsU0FBS0MsV0FBTCxHQUFpQixDQUFqQjtBQUNBLFNBQUtDLGFBQUwsR0FBbUIsS0FBbkI7QUFDQTdCLElBQUFBLGlCQUFpQixHQUFDLEtBQWxCO0FBQ0gsR0F6RW9COztBQTJFckI7Ozs7OztBQU1BdUIsRUFBQUEsZUFqRnFCLDZCQWtGcEI7QUFDRyxRQUFHLENBQUNqQyx3QkFBRCxJQUE2QkEsd0JBQXdCLElBQUUsSUFBMUQsRUFDQUEsd0JBQXdCLEdBQUN3QyxPQUFPLENBQUMsMEJBQUQsQ0FBaEM7QUFDRixHQXJGbUI7O0FBdUZyQjs7Ozs7O0FBTUFKLEVBQUFBLGdCQTdGcUIsOEJBNkZEO0FBQ2hCLFNBQUtLLE1BQUwsR0FBWSxLQUFLbEIsVUFBTCxDQUFnQm1CLFlBQWhCLENBQTZCMUcsRUFBRSxDQUFDeUcsTUFBaEMsQ0FBWjtBQUNBLFNBQUtFLGVBQUwsR0FBcUIsS0FBckI7QUFDQSxTQUFLeEIsY0FBTCxHQUFvQixFQUFwQjtBQUNBdkIsSUFBQUEsV0FBVyxHQUFDLENBQVo7QUFDQUMsSUFBQUEsUUFBUSxHQUFDLENBQVQ7QUFDQUMsSUFBQUEsUUFBUSxHQUFDLENBQVQ7QUFFQThDLElBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLEtBQUtsQixZQUFuQjs7QUFDQSxRQUFHLEtBQUtBLFlBQUwsSUFBbUIsQ0FBdEIsRUFBeUI7QUFDekI7QUFDSTtBQUNBLFlBQUczQix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOERZLGFBQTlELE1BQStFLElBQWxGLEVBQ0E7QUFDSUYsVUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksc0NBQW9DL0Msd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEYyxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0ZDLGlCQUF0RixDQUF3RyxjQUF4RyxDQUFoRCxFQURKLENBRUk7O0FBQ0EsY0FBR2xELHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGQyxpQkFBdEYsQ0FBd0csY0FBeEcsS0FBeUgsSUFBNUgsRUFDQTtBQUNJbEQsWUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwREMsb0NBQTFELENBQStGLElBQS9GO0FBQ0EsZ0JBQUlDLE9BQU8sR0FBQ3JELHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGQyxpQkFBdEYsQ0FBd0csZ0JBQXhHLENBQVo7QUFDQSxpQkFBSy9CLGNBQUwsR0FBb0JrQyxPQUFwQjtBQUVBVCxZQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSxLQUFLNUIsY0FBakI7QUFFQW5CLFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RG9CLFVBQTlELEdBQXlFLEtBQUtuQyxjQUFMLENBQW9Cb0MsTUFBN0YsQ0FQSixDQVFJOztBQUNBLGlCQUFLQywyQkFBTDtBQUNBLGlCQUFLekIsVUFBTCxHQUFnQi9CLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGQyxpQkFBdEYsQ0FBd0csWUFBeEcsQ0FBaEI7QUFDQSxpQkFBS08sWUFBTCxDQUFrQixJQUFsQixFQUF1QixLQUFLMUIsVUFBNUI7QUFDSCxXQWJELE1BZUE7QUFDSS9CLFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMERDLG9DQUExRCxDQUErRixJQUEvRjtBQUNBcEQsWUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRE8sMEJBQTFEO0FBQ0g7QUFDSixTQXZCRCxNQXlCQTtBQUNJMUQsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRFEsOEJBQTFELENBQXlGLElBQXpGLEVBQThGLEtBQTlGLEVBQW9HLEtBQUtoQyxZQUF6RztBQUNIO0FBQ0osT0EvQkQsTUErQk0sSUFBRyxLQUFLQSxZQUFMLElBQW1CLENBQXRCLEVBQXlCO0FBQy9CO0FBQ0kzQixRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0IscUJBQWxDLEdBQTBEUSw4QkFBMUQsQ0FBeUYsSUFBekYsRUFBOEYsS0FBOUYsRUFBb0csS0FBS2hDLFlBQXpHO0FBQ0g7QUFDSixHQXpJb0I7QUEySXJCO0FBQ0FpQyxFQUFBQSxhQTVJcUIsMkJBNElKO0FBQ2IsV0FBTyxLQUFLN0IsVUFBWjtBQUNILEdBOUlvQjtBQStJckI7QUFFQTtBQUVBeUIsRUFBQUEsMkJBbkpxQix5Q0FvSnJCO0FBQ0ksUUFBSUgsT0FBTyxHQUFDckQsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEYyxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0ZDLGlCQUF0RixDQUF3RyxnQkFBeEcsQ0FBWjtBQUNBLFNBQUsvQixjQUFMLEdBQW9Ca0MsT0FBcEI7QUFDQSxTQUFLUSx3QkFBTCxDQUE4QixDQUE5QjtBQUNBN0QsSUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEb0IsVUFBOUQsR0FBeUUsS0FBS25DLGNBQUwsQ0FBb0JvQyxNQUE3RjtBQUNBLFNBQUtPLGtCQUFMO0FBQ0E5RCxJQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0IscUJBQWxDLEdBQTBEWSwrQkFBMUQ7O0FBR0EsU0FBSyxJQUFJQyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLN0MsY0FBTCxDQUFvQm9DLE1BQWhELEVBQXdEUyxLQUFLLEVBQTdELEVBQWlFO0FBQzdELFVBQUlDLE1BQU0sR0FBQ2pJLEVBQUUsQ0FBQ2tJLElBQUgsQ0FBUWxFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBELEtBQUtqRCxjQUFMLENBQW9CNkMsS0FBcEIsRUFBMkJ6RSxpQkFBckYsRUFBd0c4RSxpQkFBeEcsQ0FBMEhDLFFBQTFILENBQW1JQyxDQUEzSSxFQUE2SXZFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBELEtBQUtqRCxjQUFMLENBQW9CNkMsS0FBcEIsRUFBMkJ6RSxpQkFBckYsRUFBd0c4RSxpQkFBeEcsQ0FBMEhDLFFBQTFILENBQW1JRSxDQUFoUixDQUFYOztBQUNBLFdBQUsvQyxjQUFMLENBQW9CdUMsS0FBcEIsRUFBMkJTLFdBQTNCLENBQXVDUixNQUFNLENBQUNNLENBQTlDLEVBQWdETixNQUFNLENBQUNPLENBQXZEO0FBQ0g7O0FBRUQ1QixJQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSxvQkFBWjs7QUFFQSxTQUFLLElBQUlpQixPQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE9BQUssR0FBR2hFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RG9CLFVBQTFGLEVBQXNHVSxPQUFLLEVBQTNHLEVBQStHO0FBQzNHLFdBQUt2QyxjQUFMLENBQW9CdUMsT0FBcEIsRUFBMkJVLE1BQTNCLEdBQWtDLElBQWxDO0FBQ0g7QUFDSixHQXZLb0I7QUF5S3JCQyxFQUFBQSx3Q0F6S3FCLHNEQTBLckI7QUFDRSxRQUFJQyxxQkFBcUIsR0FBQzVFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkU2QixnQkFBN0UsRUFBMUI7O0FBQ0EsUUFBRzVFLGNBQWMsQ0FBQ3NELE1BQWYsSUFBdUJxQixxQkFBMUIsRUFDQTtBQUNFM0UsTUFBQUEsY0FBYyxHQUFDLEVBQWY7QUFDQSxXQUFLK0IsYUFBTCxHQUFtQixJQUFuQjs7QUFFQSxVQUFHLEtBQUtiLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN6RCxTQUFyQyxJQUFnRDBCLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RDRDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZYLElBQTdGLENBQWtHWSxNQUFySixFQUNBO0FBQ0ksYUFBSzdELGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN4QyxpQkFBckMsR0FBdURLLFdBQXZEO0FBQ0FJLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RDRDLFdBQTlELEdBQTRFRyxpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUs5RCxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLENBQW5IO0FBQ0EsYUFBS21ELFVBQUw7QUFDQXRDLFFBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZL0Msd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThENEMsV0FBOUQsRUFBWjtBQUNBbEMsUUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksK0JBQTZCLEtBQUs1QixjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDMUQsVUFBOUU7QUFDSDtBQUNGO0FBRUYsR0EzTG9CO0FBNkxyQjtBQUdBOztBQUVEOzs7Ozs7QUFNRDhHLEVBQUFBLGlCQXhNdUIsNkJBd01MQyxLQXhNSyxFQXlNdkI7QUFDTXBGLElBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N3RCwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTRFRixLQUE1RTtBQUNMLEdBM01zQjtBQTZNdkJHLEVBQUFBLG1CQTdNdUIsaUNBOE12QjtBQUNFQyxJQUFBQSxZQUFZLENBQUN4RSxvQkFBRCxDQUFaO0FBQ0QsR0FoTnNCO0FBa052QnlFLEVBQUFBLG1CQWxOdUIsaUNBbU52QjtBQUFBOztBQUNJLFFBQUcsS0FBSzlELFlBQUwsSUFBbUIsQ0FBdEIsRUFBeUI7QUFDekI7QUFDRWlCLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjbkMsaUJBQWQ7O0FBQ0EsWUFBR0EsaUJBQWlCLElBQUUsSUFBdEIsRUFDQTtBQUNJOEUsVUFBQUEsWUFBWSxDQUFDeEUsb0JBQUQsQ0FBWjtBQUNBNEIsVUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsS0FBS1AsV0FBbkI7QUFDQTVCLFVBQUFBLGlCQUFpQixHQUFDLEtBQWxCOztBQUNBLGNBQUcsQ0FBQyxLQUFLNkIsYUFBVCxFQUNBO0FBQ0ksaUJBQUtBLGFBQUwsR0FBbUIsSUFBbkI7QUFDQXZDLFlBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBELEtBQUs5QixXQUEvRCxFQUE0RStCLGlCQUE1RSxDQUE4RjNCLFlBQTlGLENBQTJHLGNBQTNHLEVBQTJIZ0QsZUFBM0gsQ0FBMkksS0FBM0ksRUFBaUosS0FBS3JELGVBQXRKO0FBQ0g7QUFDSixTQVZELE1BWUE7QUFDSXJCLFVBQUFBLG9CQUFvQixHQUFDMkUsVUFBVSxDQUFDLFlBQU07QUFBRTtBQUNwQyxZQUFBLEtBQUksQ0FBQ0YsbUJBQUw7QUFDSCxXQUY4QixFQUU1QixHQUY0QixDQUEvQjtBQUdIO0FBQ0Y7QUFDSixHQXpPc0I7QUEyT3ZCRyxFQUFBQSxnQkEzT3VCLDhCQTRPdkI7QUFDRSxTQUFLckQsYUFBTCxHQUFtQixLQUFuQjtBQUNELEdBOU9zQjtBQWdQdkJzRCxFQUFBQSxtQkFoUHVCLCtCQWdQSFQsS0FoUEcsRUFpUHZCO0FBRUUsU0FBS25ELGVBQUw7QUFDQVcsSUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVlxQyxLQUFaO0FBRUEsUUFBSVUsVUFBVSxHQUFDVixLQUFLLENBQUNXLFVBQXJCO0FBQ0EsUUFBSUMsT0FBTyxHQUFDWixLQUFLLENBQUNZLE9BQWxCO0FBRUEsU0FBSzNELGVBQUwsR0FBcUJ5RCxVQUFyQjtBQUNBLFNBQUt4RCxXQUFMLEdBQWlCMEQsT0FBakI7QUFHQXBELElBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjbkMsaUJBQWQ7O0FBRUEsUUFBRyxLQUFLaUIsWUFBTCxJQUFtQixDQUF0QixFQUNBO0FBQ0ksVUFBRyxLQUFLUixjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDekQsU0FBckMsSUFBZ0QwQix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOEQ0QyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGWCxJQUE3RixDQUFrR1ksTUFBckosRUFDSWhGLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBENEIsT0FBMUQsRUFBbUUzQixpQkFBbkUsQ0FBcUYzQixZQUFyRixDQUFrRyxjQUFsRyxFQUFrSGdELGVBQWxILENBQWtJLElBQWxJLEVBQXVJSSxVQUF2SSxFQURKLEtBR0lwRixpQkFBaUIsR0FBQyxJQUFsQjtBQUNQLEtBTkQsTUFNTSxJQUFHLEtBQUtpQixZQUFMLElBQW1CLENBQXRCLEVBQ047QUFDSSxVQUFHLEtBQUtSLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN2RCxLQUFyQyxJQUE0QyxLQUEvQyxFQUNJd0Isd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NDLGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMEQ0QixPQUExRCxFQUFtRTNCLGlCQUFuRSxDQUFxRjNCLFlBQXJGLENBQWtHLGNBQWxHLEVBQWtIZ0QsZUFBbEgsQ0FBa0ksSUFBbEksRUFBdUlJLFVBQXZJLEVBREosS0FHSTlGLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBENEIsT0FBMUQsRUFBbUUzQixpQkFBbkUsQ0FBcUYzQixZQUFyRixDQUFrRyxjQUFsRyxFQUFrSGdELGVBQWxILENBQWtJLEtBQWxJLEVBQXdJSSxVQUF4SSxFQUFtSixJQUFuSjtBQUNQOztBQUVEbEQsSUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWNuQyxpQkFBZDtBQUdELEdBaFJzQjs7QUFrUnRCOzs7Ozs7QUFNRHVGLEVBQUFBLHNCQXhSdUIsb0NBeVJ2QjtBQUNJLFFBQUcsS0FBS3RFLFlBQUwsSUFBbUIsQ0FBdEIsRUFDQTtBQUNFLFVBQUczQix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOEQ0QyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGbUIsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQXdILEtBQTNILEVBQ0E7QUFDSW5HLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N3RCwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTRFdEYsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThENEMsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlgsSUFBN0YsQ0FBa0dZLE1BQTlLO0FBQ0g7QUFDRixLQU5ELE1BTU0sSUFBRyxLQUFLckQsWUFBTCxJQUFtQixDQUF0QixFQUNOO0FBQ0lpQixNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYywyQkFBZDtBQUNGN0MsTUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3dELDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNEUsS0FBS25FLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN6RCxTQUFqSDtBQUNEO0FBQ0osR0FyU3NCO0FBd1N2QjhILEVBQUFBLFdBeFN1Qix5QkF5U3ZCO0FBQ0UsUUFBRyxLQUFLakYsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3pELFNBQXJDLElBQWdEMEIsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThENEMsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlgsSUFBN0YsQ0FBa0dZLE1BQXJKLEVBQ0E7QUFDSWhGLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RDRDLFdBQTlELEdBQTRFRyxpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUs5RCxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLENBQW5IO0FBQ0g7QUFDSixHQTlTd0I7O0FBZ1R2Qjs7Ozs7O0FBTUFzRSxFQUFBQSx3QkF0VHVCLG9DQXNURUMsSUF0VEYsRUF1VHZCO0FBQ0ksUUFBRyxLQUFLM0UsWUFBTCxJQUFtQixDQUF0QixFQUF3QjtBQUN4QjtBQUNFLFlBQUczQix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOEQ0QyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGbUIsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQXdILEtBQTNILEVBQ0E7QUFDSXZELFVBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZOUMsY0FBYyxDQUFDc0QsTUFBM0I7QUFFQSxjQUFHdEQsY0FBYyxDQUFDc0QsTUFBZixJQUF1QixDQUExQixFQUNRdEQsY0FBYyxDQUFDc0csSUFBZixDQUFvQkQsSUFBcEI7QUFFUixjQUFJRSxXQUFXLEdBQUN2RyxjQUFjLENBQUNzRCxNQUEvQjtBQUNBLGNBQUlrRCxPQUFPLEdBQUMsS0FBWjs7QUFDQSxlQUFLLElBQUl6QyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3dDLFdBQTVCLEVBQXlDeEMsS0FBSyxFQUE5QyxFQUFrRDtBQUMxQyxnQkFBRy9ELGNBQWMsQ0FBQytELEtBQUQsQ0FBZCxJQUF1QnNDLElBQTFCLEVBQ0FHLE9BQU8sR0FBQyxJQUFSO0FBQ1A7O0FBRUQsY0FBRyxDQUFDQSxPQUFKLEVBQ0E7QUFDSXhHLFlBQUFBLGNBQWMsQ0FBQ3NHLElBQWYsQ0FBb0JELElBQXBCO0FBQ0g7O0FBQ0QxRCxVQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWTlDLGNBQVo7QUFDQTJDLFVBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZOUMsY0FBYyxDQUFDc0QsTUFBM0IsRUFsQkosQ0FvQkk7O0FBQ0EsY0FBSXFCLHFCQUFxQixHQUFDLEtBQUt6RCxjQUFMLENBQW9Cb0MsTUFBOUM7O0FBQ0EsY0FBR3RELGNBQWMsQ0FBQ3NELE1BQWYsSUFBdUJxQixxQkFBMUIsRUFDQTtBQUNJM0UsWUFBQUEsY0FBYyxHQUFDLEVBQWY7QUFDQSxpQkFBSytCLGFBQUwsR0FBbUIsSUFBbkI7O0FBRUEsZ0JBQUcsS0FBS2IsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3pELFNBQXJDLElBQWdEMEIsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThENEMsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlgsSUFBN0YsQ0FBa0dZLE1BQXJKLEVBQ0E7QUFDSSxtQkFBSzdELGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN4QyxpQkFBckMsR0FBdURLLFdBQXZELENBREosQ0FFSTs7QUFDQSxtQkFBS3NGLFVBQUw7QUFDQXRDLGNBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZL0Msd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThENEMsV0FBOUQsRUFBWjtBQUNBbEMsY0FBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksK0JBQTZCLEtBQUs1QixjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDMUQsVUFBOUU7QUFDSDtBQUNKO0FBQ0o7QUFDQSxPQXhDSCxNQXdDUSxJQUFHLEtBQUtzRCxZQUFMLElBQW1CLENBQXRCLEVBQ047QUFFSSxXQUFLSyxhQUFMLEdBQW1CLElBQW5CO0FBQ0EsV0FBS2IsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3hDLGlCQUFyQyxHQUF1REssV0FBdkQ7QUFDQSxXQUFLc0YsVUFBTDtBQUNIO0FBQ04sR0F2V3NCOztBQXlXdEI7Ozs7OztBQU1DQSxFQUFBQSxVQS9XcUIsd0JBZ1hyQjtBQUNJLFFBQUcsS0FBS3ZELFlBQUwsSUFBbUIsQ0FBdEIsRUFDQTtBQUNJLFdBQUt5RSxXQUFMO0FBQ0g7O0FBRUQsUUFBRyxLQUFLckUsVUFBTCxHQUFnQixLQUFLWixjQUFMLENBQW9Cb0MsTUFBcEIsR0FBMkIsQ0FBOUMsRUFDSSxLQUFLeEIsVUFBTCxHQUFnQixLQUFLQSxVQUFMLEdBQWdCLENBQWhDLENBREosS0FHSSxLQUFLQSxVQUFMLEdBQWdCLENBQWhCO0FBRUovQixJQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDd0QsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE0RSxLQUFLdkQsVUFBakY7QUFDSCxHQTVYb0I7O0FBOFhyQjs7Ozs7O0FBTUEyRSxFQUFBQSxXQXBZcUIsdUJBb1lUQyxLQXBZUyxFQXFZckI7QUFBQTs7QUFDSS9ELElBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLFdBQVM4RCxLQUF2QjtBQUNBLFFBQUlDLGNBQWMsR0FBQyxLQUFuQjtBQUNBdEcsSUFBQUEsYUFBYSxHQUFDLEtBQWQ7O0FBQ0EsUUFBR1AsVUFBSCxFQUFlO0FBQ2Y7QUFDSTRGLFFBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsVUFBQSxNQUFJLENBQUNlLFdBQUwsQ0FBaUJDLEtBQWpCO0FBQ0gsU0FGUyxFQUVQLEdBRk8sQ0FBVjtBQUdILE9BTEQsTUFPQTtBQUNJLFdBQUs1RSxVQUFMLEdBQWdCNEUsS0FBaEI7O0FBQ0EsVUFBRyxLQUFLaEYsWUFBTCxJQUFtQixDQUF0QixFQUNBO0FBQ0ksWUFBRyxLQUFLUixjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDekQsU0FBckMsSUFBZ0QwQix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOEQ0QyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGWCxJQUE3RixDQUFrR1ksTUFBckosRUFDQTtBQUNJLGVBQUs2QixrQkFBTCxDQUF3QixJQUF4QjtBQUNBRCxVQUFBQSxjQUFjLEdBQUMsSUFBZjtBQUNBdEcsVUFBQUEsYUFBYSxHQUFDLEtBQUthLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUNyRCxpQkFBckMsQ0FBdURaLFlBQXJFOztBQUNBLGNBQUcsQ0FBQ3dDLGFBQUosRUFDQTtBQUNJcUYsWUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYjNGLGNBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMEQyRCwyQkFBMUQsQ0FBc0YsSUFBdEY7QUFDQTlHLGNBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMEQ0RCxpQkFBMUQ7QUFDSCxhQUhTLEVBR1AsSUFITyxDQUFWO0FBSUFuRSxZQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSxtQkFBaUIsS0FBSzVCLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUMxRCxVQUFsRTtBQUNIO0FBQ0osU0FiRCxNQWVBO0FBQ0ksZUFBS3dJLGtCQUFMLENBQXdCLEtBQXhCO0FBQ0g7QUFFSixPQXJCRCxNQXFCTSxJQUFHLEtBQUtsRixZQUFMLElBQW1CLENBQXRCLEVBQ047QUFDSSxZQUFHLEtBQUtSLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN2RCxLQUFyQyxJQUE0QyxLQUEvQyxFQUNBO0FBQ0ksZUFBS3FJLGtCQUFMLENBQXdCLElBQXhCO0FBQ0FELFVBQUFBLGNBQWMsR0FBQyxJQUFmO0FBQ0F0RyxVQUFBQSxhQUFhLEdBQUMsS0FBS2EsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3JELGlCQUFyQyxDQUF1RFosWUFBckU7O0FBQ0EsY0FBRyxDQUFDd0MsYUFBSixFQUNBO0FBQ0lxRixZQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiM0YsY0FBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRDJELDJCQUExRCxDQUFzRixJQUF0RjtBQUNBOUcsY0FBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRDRELGlCQUExRDtBQUNILGFBSFMsRUFHUCxJQUhPLENBQVY7QUFJQW5FLFlBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLG1CQUFpQixLQUFLNUIsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQzFELFVBQWxFO0FBQ0g7QUFDSixTQWJELE1BY0k7QUFDSjtBQUNJLGlCQUFLd0ksa0JBQUwsQ0FBd0IsS0FBeEI7QUFDQUQsWUFBQUEsY0FBYyxHQUFDLElBQWY7QUFDQXRHLFlBQUFBLGFBQWEsR0FBQyxLQUFLYSxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDckQsaUJBQXJDLENBQXVEWixZQUFyRTs7QUFDQSxnQkFBRyxDQUFDd0MsYUFBSixFQUNBO0FBQ0lxRixjQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLGdCQUFBLE1BQUksQ0FBQ3FCLFFBQUw7QUFDSCxlQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0g7QUFDSjtBQUNKOztBQUVELFdBQUt2RCxZQUFMLENBQWtCLElBQWxCLEVBQXVCLEtBQUsxQixVQUE1Qjs7QUFFQSxXQUFLLElBQUlpQyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLeEMsV0FBTCxDQUFpQitCLE1BQTdDLEVBQXFEUyxLQUFLLEVBQTFELEVBQThEO0FBQzFELGFBQUt4QyxXQUFMLENBQWlCd0MsS0FBakIsRUFBd0J0QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkR1RSxjQUE3RCxDQUE0RXZDLE1BQTVFLEdBQW1GLEtBQW5GO0FBQ0g7O0FBR0QsVUFBRyxLQUFLL0MsWUFBTCxJQUFtQixDQUF0QixFQUF3QjtBQUN4QjtBQUNJM0IsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEYyxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0ZnQyxpQkFBdEYsQ0FBd0csWUFBeEcsRUFBcUgsS0FBS2xELFVBQTFILEVBQXFJLElBQXJJO0FBQ0FhLFVBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLGNBQVksS0FBSzVCLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUMxRCxVQUE3RDtBQUNBdUUsVUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksS0FBS3ZCLFdBQUwsQ0FBaUIsS0FBS08sVUFBdEIsRUFBa0NXLFlBQWxDLENBQStDLHNCQUEvQyxFQUF1RXdFLFVBQW5GO0FBQ0F0RSxVQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWS9DLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RDRDLFdBQTlELEVBQVo7QUFDQWxDLFVBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZL0Msd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEaUYsVUFBOUQsRUFBWjtBQUNBLGVBQUt0RCx3QkFBTCxDQUE4QixDQUE5QixFQU5KLENBU0k7O0FBQ0EsY0FBRzdELHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RDRDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZtQixjQUE3RixDQUE0R0MsVUFBNUcsSUFBd0gsSUFBM0gsRUFDSSxLQUFLM0MsMkJBQUw7QUFDUCxTQXpFTCxDQTJFSTs7O0FBQ0EsVUFBR29ELGNBQWMsSUFBSXRHLGFBQXJCLEVBQ0E7QUFDSVAsUUFBQUEsVUFBVSxHQUFDLEtBQVg7QUFDQUMsUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQW9FLHVCQUFwRSxFQUE0RixJQUE1RjtBQUNBLGFBQUtDLGtCQUFMLENBQXdCLEtBQXhCO0FBQ0EsYUFBS25DLFVBQUw7QUFDQSxhQUFLMkIsa0JBQUwsQ0FBd0IsS0FBeEI7QUFDSDs7QUFFRCxVQUFHRCxjQUFjLElBQUksS0FBS3pGLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN0QyxjQUExRCxFQUNBO0FBQ0lNLFFBQUFBLFVBQVUsR0FBQyxLQUFYO0FBQ0EsYUFBS21GLFVBQUw7QUFDQSxhQUFLMkIsa0JBQUwsQ0FBd0IsS0FBeEI7QUFDSDtBQUVKO0FBQ0osR0E3ZW9CO0FBK2VyQmhELEVBQUFBLHdCQS9lcUIsb0NBK2VJeUQsSUEvZUosRUFnZnJCO0FBQ0ksUUFBSUMsZUFBZSxHQUFDdkgsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEaUYsVUFBOUQsRUFBcEI7QUFDQSxRQUFJSyxNQUFNLEdBQUN4SCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOEQ0QyxXQUE5RCxFQUFYO0FBQ0EsUUFBSTJDLFFBQVEsR0FBQ0gsSUFBYjtBQUNBMUUsSUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksS0FBSzVCLGNBQUwsQ0FBb0JzRyxRQUFwQixFQUE4Qm5KLFNBQTFDO0FBQ0FzRSxJQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWXlFLE1BQU0sQ0FBQ3pDLGdCQUFQLENBQXdCMkMsaUJBQXhCLENBQTBDcEosU0FBdEQ7O0FBQ0EsUUFBRyxLQUFLNkMsY0FBTCxDQUFvQnNHLFFBQXBCLEVBQThCbkosU0FBOUIsSUFBeUNrSixNQUFNLENBQUN6QyxnQkFBUCxDQUF3QjJDLGlCQUF4QixDQUEwQ3BKLFNBQXRGLEVBQWlHO0FBQ2pHO0FBQ0ksYUFBSyxJQUFJMEYsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd1RCxlQUFlLENBQUNoRSxNQUE1QyxFQUFvRFMsS0FBSyxFQUF6RCxFQUE2RDtBQUNyRCxjQUFHLEtBQUs3QyxjQUFMLENBQW9Cc0csUUFBcEIsRUFBOEJuSixTQUE5QixJQUF5Q2lKLGVBQWUsQ0FBQ3ZELEtBQUQsQ0FBZixDQUF1QmUsZ0JBQXZCLENBQXdDMkMsaUJBQXhDLENBQTBEcEosU0FBdEcsRUFDQTtBQUNJLGlCQUFLNkMsY0FBTCxDQUFvQnNHLFFBQXBCLElBQThCRixlQUFlLENBQUN2RCxLQUFELENBQWYsQ0FBdUJlLGdCQUF2QixDQUF3QzJDLGlCQUF0RTs7QUFFQSxnQkFBR0QsUUFBUSxHQUFDLEtBQUt0RyxjQUFMLENBQW9Cb0MsTUFBcEIsR0FBMkIsQ0FBdkMsRUFDQTtBQUNJa0UsY0FBQUEsUUFBUTtBQUNSN0UsY0FBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVkscUJBQW1CMEUsUUFBL0I7QUFDQSxtQkFBSzVELHdCQUFMLENBQThCNEQsUUFBOUI7QUFDSCxhQUxELE1BTUk7QUFDQTdFLGNBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLEtBQUs1QixjQUFqQjtBQUNIO0FBQ0o7QUFDSjtBQUNSLE9BbEJELE1Bb0JJO0FBQ0ksVUFBR3NHLFFBQVEsR0FBQyxLQUFLdEcsY0FBTCxDQUFvQm9DLE1BQXBCLEdBQTJCLENBQXZDLEVBQ0k7QUFDSWtFLFFBQUFBLFFBQVE7QUFDUjdFLFFBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLHFCQUFtQjBFLFFBQS9CO0FBQ0EsYUFBSzVELHdCQUFMLENBQThCNEQsUUFBOUI7QUFDSCxPQUxMLE1BTUk7QUFDSTdFLFFBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLEtBQUs1QixjQUFqQjtBQUNIO0FBQ1I7QUFDUixHQXJoQm9COztBQXVoQnJCOzs7Ozs7QUFNQXdHLEVBQUFBLFNBN2hCcUIsdUJBOGhCckI7QUFDSSxTQUFLN0Qsa0JBQUw7QUFDQSxTQUFLOEQsaUJBQUw7QUFDQSxTQUFLN0YsVUFBTCxHQUFnQixDQUFoQixDQUhKLENBR3VCO0FBRW5COztBQUNBL0IsSUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3dELDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNEUsS0FBS3ZELFVBQWpGO0FBSUgsR0F4aUJvQjtBQTBpQnJCOEYsRUFBQUEsbUJBMWlCcUIsK0JBMGlCRHpDLEtBMWlCQyxFQTJpQnJCO0FBQ0k7QUFDQSxRQUFJMEMsYUFBYSxHQUFDMUMsS0FBSyxDQUFDaEIsSUFBTixDQUFXMkQsVUFBN0I7QUFDQSxRQUFJcEIsS0FBSyxHQUFDdkIsS0FBSyxDQUFDaEIsSUFBTixDQUFXNEQsSUFBckI7QUFDQSxRQUFJQyxXQUFXLEdBQUM3QyxLQUFLLENBQUNoQixJQUFOLENBQVc4RCxjQUEzQjtBQUVBdEYsSUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVlxQyxLQUFaLEVBTkosQ0FPSTtBQUNBO0FBQ0E7O0FBRUEsU0FBS2pFLGNBQUwsQ0FBb0J3RixLQUFwQixJQUEyQnNCLFdBQTNCO0FBRUEsU0FBS25FLGtCQUFMLENBQXdCLElBQXhCO0FBQ0EsU0FBSzhELGlCQUFMLENBQXVCLElBQXZCO0FBRUEsU0FBS25FLFlBQUwsQ0FBa0IsSUFBbEIsRUFBdUIsS0FBSzFCLFVBQTVCOztBQUVBLFNBQUssSUFBSWlDLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUt4QyxXQUFMLENBQWlCK0IsTUFBN0MsRUFBcURTLEtBQUssRUFBMUQsRUFBOEQ7QUFDMUQsV0FBS3hDLFdBQUwsQ0FBaUJ3QyxLQUFqQixFQUF3QnRCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHVFLGNBQTdELENBQTRFdkMsTUFBNUUsR0FBbUYsS0FBbkY7QUFDSDs7QUFFRCxRQUFHLEtBQUsvQyxZQUFMLElBQW1CLENBQXRCLEVBQXdCO0FBQ3hCO0FBQ0kzQixRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOERjLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRmdDLGlCQUF0RixDQUF3RyxZQUF4RyxFQUFxSCxLQUFLbEQsVUFBMUgsRUFBcUksSUFBckk7QUFDQSxhQUFLOEIsd0JBQUwsQ0FBOEIsQ0FBOUIsRUFGSixDQUlJOztBQUNBLFlBQUc3RCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOEQ0QyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGbUIsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQXdILElBQTNILEVBQ0ksS0FBSzNDLDJCQUFMO0FBQ1A7QUFDSixHQTFrQm9CO0FBNGtCckIyRSxFQUFBQSxzQkE1a0JxQixvQ0E2a0JyQjtBQUNJLFNBQUtyRSxrQkFBTCxDQUF3QixJQUF4QjtBQUNBLFNBQUs4RCxpQkFBTCxDQUF1QixJQUF2QjtBQUNBakMsSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYjNGLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMEQyRCwyQkFBMUQsQ0FBc0YsSUFBdEY7QUFDQTlHLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMEQ0RCxpQkFBMUQ7QUFDSCxLQUhTLEVBR1AsSUFITyxDQUFWO0FBS0EsU0FBS3RELFlBQUwsQ0FBa0IsSUFBbEIsRUFBdUIsS0FBSzFCLFVBQTVCOztBQUVBLFNBQUssSUFBSWlDLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUt4QyxXQUFMLENBQWlCK0IsTUFBN0MsRUFBcURTLEtBQUssRUFBMUQsRUFBOEQ7QUFDMUQsV0FBS3hDLFdBQUwsQ0FBaUJ3QyxLQUFqQixFQUF3QnRCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHVFLGNBQTdELENBQTRFdkMsTUFBNUUsR0FBbUYsS0FBbkY7QUFDSDs7QUFFRCxRQUFHLEtBQUsvQyxZQUFMLElBQW1CLENBQXRCLEVBQXdCO0FBQ3hCO0FBQ0kzQixRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOERjLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRmdDLGlCQUF0RixDQUF3RyxZQUF4RyxFQUFxSCxLQUFLbEQsVUFBMUgsRUFBcUksSUFBckk7QUFDQSxhQUFLOEIsd0JBQUwsQ0FBOEIsQ0FBOUIsRUFGSixDQUlJOztBQUNBLFlBQUc3RCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOEQ0QyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGbUIsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQXdILElBQTNILEVBQ0ksS0FBSzNDLDJCQUFMO0FBQ1A7QUFDSixHQXBtQm9CO0FBcW1CckI7QUFHQTs7QUFDQzs7Ozs7O0FBTURNLEVBQUFBLGtCQS9tQnFCLDhCQSttQkZnRSxhQS9tQkUsRUFnbkJyQjtBQUFBLFFBRG1CQSxhQUNuQjtBQURtQkEsTUFBQUEsYUFDbkIsR0FEaUMsS0FDakM7QUFBQTs7QUFDSSxRQUFHLEtBQUtuRyxZQUFMLElBQW1CLENBQXRCLEVBQXlCO0FBQ3pCO0FBQ0ksWUFBRyxDQUFDbUcsYUFBSixFQUNBO0FBQ0ksY0FBSU0sWUFBWSxHQUFDLEtBQUtDLFNBQUwsQ0FBZSxDQUFmLEVBQWlCLEtBQUtqSCxXQUFMLENBQWlCbUMsTUFBbEMsQ0FBakI7O0FBQ0EsZUFBS3BDLGNBQUwsQ0FBb0JvRixJQUFwQixDQUF5QixLQUFLbkYsV0FBTCxDQUFpQmdILFlBQWpCLENBQXpCO0FBQ0FwSSxVQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOERvQixVQUE5RCxHQUF5RSxDQUF6RTtBQUNIO0FBQ0o7O0FBRUQsU0FBSyxJQUFJVSxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR2hFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RG9CLFVBQTFGLEVBQXNHVSxLQUFLLEVBQTNHLEVBQStHO0FBQzNHLFdBQUt4QyxXQUFMLENBQWlCd0MsS0FBakIsRUFBd0JVLE1BQXhCLEdBQStCLElBQS9CO0FBQ0EsV0FBS2xELFdBQUwsQ0FBaUJ3QyxLQUFqQixFQUF3QnRCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHdFLFVBQTdELEdBQXdFLEtBQUsvRixjQUFMLENBQW9CNkMsS0FBcEIsQ0FBeEU7QUFDQSxXQUFLeEMsV0FBTCxDQUFpQndDLEtBQWpCLEVBQXdCdEIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZENEYsT0FBN0QsQ0FBcUUsS0FBS25ILGNBQUwsQ0FBb0I2QyxLQUFwQixFQUEyQjNGLFVBQWhHO0FBQ0g7QUFDSixHQWhvQm9CO0FBa29CckJvRixFQUFBQSxZQWxvQnFCLHdCQWtvQlI4RSxnQkFsb0JRLEVBa29CU0MsTUFsb0JULEVBbW9CckI7QUFDSSxRQUFHRCxnQkFBSCxFQUNBO0FBQ0ksV0FBSy9HLFdBQUwsQ0FBaUJnSCxNQUFqQixFQUF5QjlGLFlBQXpCLENBQXNDLHNCQUF0QyxFQUE4RHdFLFVBQTlELEdBQXlFLEtBQUsvRixjQUFMLENBQW9CcUgsTUFBcEIsQ0FBekU7O0FBRUEsV0FBSyxJQUFJeEUsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUdoRSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOERvQixVQUExRixFQUFzR1UsS0FBSyxFQUEzRyxFQUErRztBQUMzRyxZQUFHd0UsTUFBTSxJQUFFeEUsS0FBWCxFQUNBO0FBQ0ksZUFBS3hDLFdBQUwsQ0FBaUJ3QyxLQUFqQixFQUF3QnRCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RCtGLG1CQUE3RCxDQUFpRixJQUFqRjtBQUNBLGVBQUtqSCxXQUFMLENBQWlCd0MsS0FBakIsRUFBd0J0QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkRnRyxvQkFBN0QsQ0FBa0YsSUFBbEY7QUFDSCxTQUpELE1BTUE7QUFDSSxlQUFLbEgsV0FBTCxDQUFpQndDLEtBQWpCLEVBQXdCdEIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEK0YsbUJBQTdELENBQWlGLEtBQWpGO0FBQ0EsZUFBS2pILFdBQUwsQ0FBaUJ3QyxLQUFqQixFQUF3QnRCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RGdHLG9CQUE3RCxDQUFrRixLQUFsRjtBQUNIO0FBQ0o7QUFDSjtBQUNKLEdBcnBCb0I7O0FBdXBCcEI7Ozs7OztBQU1EZCxFQUFBQSxpQkE3cEJxQiw2QkE2cEJIRSxhQTdwQkcsRUE4cEJyQjtBQUFBLFFBRGtCQSxhQUNsQjtBQURrQkEsTUFBQUEsYUFDbEIsR0FEZ0MsS0FDaEM7QUFBQTs7QUFDSSxRQUFHLENBQUNBLGFBQUosRUFDQTtBQUNJLFdBQUssSUFBSTlELEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUs3QyxjQUFMLENBQW9Cb0MsTUFBaEQsRUFBd0RTLEtBQUssRUFBN0QsRUFBaUU7QUFDN0QsWUFBRyxLQUFLN0MsY0FBTCxDQUFvQjZDLEtBQXBCLEVBQTJCckYsZUFBM0IsSUFBNEMsQ0FBL0MsRUFDSSxLQUFLOEMsY0FBTCxDQUFvQnVDLEtBQXBCLEVBQTJCUyxXQUEzQixDQUF1QyxLQUFLL0Msa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkI0QyxRQUEzQixDQUFvQ0MsQ0FBM0UsRUFBNkUsS0FBSzdDLGtCQUFMLENBQXdCLENBQXhCLEVBQTJCNEMsUUFBM0IsQ0FBb0NFLENBQWpILEVBREosS0FFSyxJQUFHLEtBQUtyRCxjQUFMLENBQW9CNkMsS0FBcEIsRUFBMkJwRixvQkFBM0IsSUFBaUQsQ0FBcEQsRUFDRCxLQUFLNkMsY0FBTCxDQUFvQnVDLEtBQXBCLEVBQTJCUyxXQUEzQixDQUF1QyxLQUFLL0Msa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkI0QyxRQUEzQixDQUFvQ0MsQ0FBM0UsRUFBNkUsS0FBSzdDLGtCQUFMLENBQXdCLENBQXhCLEVBQTJCNEMsUUFBM0IsQ0FBb0NFLENBQWpIO0FBQ1A7QUFDSixLQVJELE1BU0E7QUFDSSxVQUFHLEtBQUtyRCxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDcEQsZUFBckMsSUFBc0QsQ0FBekQsRUFDSSxLQUFLOEMsY0FBTCxDQUFvQixLQUFLTSxVQUF6QixFQUFxQzBDLFdBQXJDLENBQWlELEtBQUsvQyxrQkFBTCxDQUF3QixDQUF4QixFQUEyQjRDLFFBQTNCLENBQW9DQyxDQUFyRixFQUF1RixLQUFLN0Msa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkI0QyxRQUEzQixDQUFvQ0UsQ0FBM0gsRUFESixLQUVLLElBQUcsS0FBS3JELGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUNuRCxvQkFBckMsSUFBMkQsQ0FBOUQsRUFDRCxLQUFLNkMsY0FBTCxDQUFvQixLQUFLTSxVQUF6QixFQUFxQzBDLFdBQXJDLENBQWlELEtBQUsvQyxrQkFBTCxDQUF3QixDQUF4QixFQUEyQjRDLFFBQTNCLENBQW9DQyxDQUFyRixFQUF1RixLQUFLN0Msa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkI0QyxRQUEzQixDQUFvQ0UsQ0FBM0g7QUFDUDs7QUFFRCxTQUFLLElBQUlSLE9BQUssR0FBRyxDQUFqQixFQUFvQkEsT0FBSyxHQUFHaEUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEb0IsVUFBMUYsRUFBc0dVLE9BQUssRUFBM0csRUFBK0c7QUFDM0csV0FBS3ZDLGNBQUwsQ0FBb0J1QyxPQUFwQixFQUEyQlUsTUFBM0IsR0FBa0MsSUFBbEM7QUFDSDtBQUNKLEdBbHJCb0I7QUFvckJyQmlFLEVBQUFBLHlCQXByQnFCLHVDQXFyQnJCO0FBQ0ksUUFBSUMsU0FBUyxHQUFDLEtBQUtuSCxjQUFMLENBQW9CLEtBQUtNLFVBQXpCLEVBQXFDOEcscUJBQXJDLENBQTJEN00sRUFBRSxDQUFDa0ksSUFBSCxDQUFRLENBQVIsRUFBVSxHQUFWLENBQTNELENBQWQ7QUFDQSxTQUFLM0MsVUFBTCxDQUFnQitDLFFBQWhCLEdBQXlCLEtBQUsvQyxVQUFMLENBQWdCdUgsTUFBaEIsQ0FBdUJDLG9CQUF2QixDQUE0Q0gsU0FBNUMsQ0FBekI7QUFFQSxRQUFJSSxLQUFLLEdBQUNKLFNBQVMsQ0FBQ3BFLENBQVYsR0FBWXhJLEVBQUUsQ0FBQ2lOLE9BQUgsQ0FBV0MsTUFBakM7QUFDQSxTQUFLekcsTUFBTCxDQUFZMEcsU0FBWixHQUFzQixDQUF0QjtBQUNILEdBM3JCb0I7QUE2ckJyQkMsRUFBQUEsVUE3ckJxQix3QkE2ckJQO0FBQ1YsUUFBRyxLQUFLekcsZUFBUixFQUNJLEtBQUtnRyx5QkFBTDtBQUNQLEdBaHNCb0I7QUFrc0JyQlUsRUFBQUEsWUFsc0JxQix3QkFrc0JSQyxLQWxzQlEsRUFtc0JyQjtBQUNJLFFBQUlDLE1BQU0sR0FBQ0QsS0FBSyxDQUFDRSxLQUFqQjtBQUNBLFFBQUlDLE1BQU0sR0FBQ0gsS0FBSyxDQUFDSSxLQUFqQjs7QUFDQSxRQUFJQyxPQUFPLEdBQUNKLE1BQU0sR0FBQ0UsTUFBbkI7O0FBRUExSixJQUFBQSxVQUFVLEdBQUMsSUFBWDtBQUNBLFNBQUt3QyxhQUFMLEdBQW1CLEtBQW5COztBQUVBLFFBQUcsS0FBS1osWUFBTCxJQUFtQixDQUF0QixFQUF3QjtBQUN4QjtBQUNJLGFBQUssSUFBSXFDLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHaEUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEYyxZQUE5RCxHQUE2RTRHLGlCQUE3RSxHQUFpR3JHLE1BQTdILEVBQXFJUyxLQUFLLEVBQTFJLEVBQThJO0FBQzFJLGNBQUdoRSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOERjLFlBQTlELEdBQTZFNEcsaUJBQTdFLEdBQWlHNUYsS0FBakcsRUFBd0dlLGdCQUF4RyxDQUF5SFgsSUFBekgsQ0FBOEhZLE1BQTlILElBQXNJLEtBQUs3RCxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDekQsU0FBOUssRUFDQTtBQUNJc0UsWUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksb0JBQWtCLEtBQUs1QixjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDMUQsVUFBbkU7QUFDQSxpQkFBSzhDLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN4QyxpQkFBckMsR0FBdURTLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkU0RyxpQkFBN0UsR0FBaUc1RixLQUFqRyxFQUF3R2UsZ0JBQXhHLENBQXlIMkMsaUJBQXpILENBQTJJbkksaUJBQWxNO0FBQ0g7QUFDSjtBQUNKOztBQUVELFFBQUcsS0FBSzRCLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN4QyxpQkFBckMsSUFBd0QsQ0FBeEQsSUFBNkQsQ0FBQyxLQUFLNEIsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3ZDLHNCQUF0RyxFQUNBO0FBQ0ksVUFBRyxLQUFLMkIsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3RELFlBQXJDLENBQWtELENBQWxELEVBQXFEL0IsWUFBckQsSUFBbUUsQ0FBdEUsRUFDQTtBQUNJa0QsUUFBQUEsV0FBVyxHQUFDLENBQVo7QUFDQSxhQUFLdUIsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3ZDLHNCQUFyQyxHQUE0RCxJQUE1RDtBQUNBb0QsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWNqRCxXQUFkO0FBQ0gsT0FMRCxNQU9BO0FBQ0ksYUFBS3VCLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN2QyxzQkFBckMsR0FBNEQsSUFBNUQ7QUFDQUksUUFBQUEsV0FBVyxHQUFDLEVBQVo7QUFDQWdELFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjakQsV0FBZDtBQUNIO0FBQ0osS0FkRCxNQWdCQTtBQUNJLFVBQUcsS0FBS3VCLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN4QyxpQkFBckMsSUFBd0QsRUFBM0QsRUFDSSxLQUFLNEIsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3hDLGlCQUFyQyxHQUF1RCxLQUFLNEIsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3hDLGlCQUFyQyxHQUF1RCxFQUE5RyxDQURKLEtBR0ksS0FBSzRCLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN4QyxpQkFBckMsR0FBdUQsS0FBSzRCLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN4QyxpQkFBckMsR0FBdUQsQ0FBOUc7QUFFSkssTUFBQUEsV0FBVyxHQUFDLEtBQUt1QixjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDeEMsaUJBQWpEO0FBQ0FxRCxNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBY2pELFdBQVcsR0FBQyxDQUExQjtBQUNIOztBQUdERSxJQUFBQSxRQUFRLEdBQUM2SixPQUFUO0FBQ0E5SixJQUFBQSxRQUFRLEdBQUMsQ0FBVDtBQUNBRyxJQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0IscUJBQWxDLEdBQTBEMEcsMkJBQTFELENBQXNGL0osUUFBdEY7O0FBRUEsU0FBSyxJQUFJa0UsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUcsS0FBS3hDLFdBQUwsQ0FBaUIrQixNQUE3QyxFQUFxRFMsT0FBSyxFQUExRCxFQUE4RDtBQUMxRCxVQUFHLEtBQUtqQyxVQUFMLElBQWlCaUMsT0FBcEIsRUFDQTtBQUNJLGFBQUt4QyxXQUFMLENBQWlCd0MsT0FBakIsRUFBd0J0QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkR1RSxjQUE3RCxDQUE0RXZDLE1BQTVFLEdBQW1GLElBQW5GOztBQUNBLGFBQUtsRCxXQUFMLENBQWlCd0MsT0FBakIsRUFBd0J0QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkR1RSxjQUE3RCxDQUE0RXZFLFlBQTVFLENBQXlGLGdCQUF6RixFQUEyR29ILFdBQTNHLENBQXVIUCxNQUF2SCxFQUE4SEUsTUFBOUg7QUFDSCxPQUpELE1BTUE7QUFDSSxhQUFLakksV0FBTCxDQUFpQndDLE9BQWpCLEVBQXdCdEIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEdUUsY0FBN0QsQ0FBNEV2QyxNQUE1RSxHQUFtRixLQUFuRjtBQUNIO0FBQ0osS0E1REwsQ0E4REk7QUFDQTtBQUNBOztBQUNILEdBcHdCb0I7QUFzd0JyQnFGLEVBQUFBLGdCQXR3QnFCLDhCQXV3QnJCO0FBQ0ksUUFBSW5CLFNBQVMsR0FBQyxLQUFLbkgsY0FBTCxDQUFvQixLQUFLTSxVQUF6QixFQUFxQzhHLHFCQUFyQyxDQUEyRDdNLEVBQUUsQ0FBQ2tJLElBQUgsQ0FBUSxDQUFSLEVBQVUsR0FBVixDQUEzRCxDQUFkOztBQUNBLFFBQUk4RixJQUFJLEdBQUMsS0FBS3pJLFVBQUwsQ0FBZ0J1SCxNQUFoQixDQUF1QkMsb0JBQXZCLENBQTRDSCxTQUE1QyxDQUFUOztBQUNBLFNBQUtxQixXQUFMLENBQWlCRCxJQUFqQixFQUFzQixJQUF0QixFQUEyQixHQUEzQjtBQUNILEdBM3dCb0I7QUE2d0JyQkUsRUFBQUEsY0E3d0JxQiwwQkE2d0JOQyxRQTd3Qk0sRUE4d0JyQjtBQUNJLFFBQUlDLFdBQVcsR0FBQyxDQUFoQjtBQUNBLFFBQUlDLFlBQVksR0FBQyxDQUFqQjs7QUFDQSxTQUFLLElBQUlyRyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR2hFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RGMsWUFBOUQsR0FBNkU0RyxpQkFBN0UsR0FBaUdyRyxNQUE3SCxFQUFxSVMsS0FBSyxFQUExSSxFQUE4STtBQUMxSSxVQUFHaEUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEYyxZQUE5RCxHQUE2RTRHLGlCQUE3RSxHQUFpRzVGLEtBQWpHLEVBQXdHZSxnQkFBeEcsQ0FBeUhYLElBQXpILENBQThIWSxNQUE5SCxJQUFzSSxLQUFLN0QsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3pELFNBQTlLLEVBQ0E7QUFDSTtBQUNBK0wsUUFBQUEsWUFBWSxHQUFDckssd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEYyxZQUE5RCxHQUE2RTRHLGlCQUE3RSxHQUFpRzVGLEtBQWpHLEVBQXdHZSxnQkFBeEcsQ0FBeUgyQyxpQkFBekgsQ0FBMkluSSxpQkFBeEo7QUFDSDtBQUNKOztBQUVILFFBQUc4SyxZQUFZLEdBQUMsQ0FBYixHQUFlLENBQWxCLEVBQ0E7QUFDRXpILE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLHdCQUFkO0FBQ0F1SCxNQUFBQSxXQUFXLEdBQUNDLFlBQVksR0FBQ0YsUUFBYixHQUFzQixDQUFsQztBQUNBLFVBQUlHLFFBQVEsR0FBQ0MsUUFBUSxDQUFDdkssd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NDLGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERnRyxXQUExRCxFQUF1RS9GLGlCQUF2RSxDQUF5RjNCLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIOEgsU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQXJCO0FBQ0E3SCxNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxZQUFVeUgsUUFBeEI7QUFDRCxLQU5ELE1BUUE7QUFDRUYsTUFBQUEsV0FBVyxHQUFDQyxZQUFZLEdBQUNGLFFBQXpCO0FBQ0EsVUFBSUcsUUFBUSxHQUFDQyxRQUFRLENBQUN2Syx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0MsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRGdHLFdBQTFELEVBQXVFL0YsaUJBQXZFLENBQXlGM0IsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0g4SCxTQUF0SCxDQUFnSUMsVUFBakksQ0FBckI7QUFDQTdILE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLFlBQVV5SCxRQUF4QjtBQUNEO0FBRUYsR0F2eUJvQjtBQXl5QnJCdEQsRUFBQUEsUUFBUSxFQUFDLG9CQUNUO0FBQ0ssUUFBSTBELEtBQUssR0FBQyxLQUFLckMsU0FBTCxDQUFlLENBQWYsRUFBaUIsQ0FBakIsQ0FBVjtBQUNBLFFBQUlzQyxLQUFLLEdBQUMsS0FBS3RDLFNBQUwsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLENBQVYsQ0FGTCxDQUlJO0FBQ0E7O0FBRUF2SSxJQUFBQSxRQUFRLEdBQUM0SyxLQUFLLEdBQUNDLEtBQWY7QUFDQSxRQUFJQyxRQUFRLEdBQUM7QUFBQ3BCLE1BQUFBLEtBQUssRUFBQ2tCLEtBQVA7QUFBYWhCLE1BQUFBLEtBQUssRUFBQ2lCO0FBQW5CLEtBQWIsQ0FSSixDQVNJO0FBQ0E7O0FBQ0EvSCxJQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSxrQkFBZ0JqRCxRQUFoQixHQUF5QixVQUF6QixHQUFvQzRLLEtBQXBDLEdBQTBDLFVBQTFDLEdBQXFEQyxLQUFqRTtBQUVBM0ssSUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3dELDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNEVzRixRQUE1RTtBQUNILEdBeHpCb0I7QUEwekJyQkMsRUFBQUEsV0ExekJxQix5QkEyekJyQjtBQUNJLFFBQUlILEtBQUssR0FBQyxLQUFLckMsU0FBTCxDQUFlLENBQWYsRUFBaUIsQ0FBakIsQ0FBVjtBQUNBLFdBQU9xQyxLQUFQO0FBQ0gsR0E5ekJvQjtBQWcwQnJCSSxFQUFBQSxZQWgwQnFCLDBCQWkwQnJCO0FBQ0ksUUFBSUosS0FBSyxHQUFDLEtBQUtyQyxTQUFMLENBQWUsQ0FBZixFQUFpQixDQUFqQixDQUFWO0FBQ0EsUUFBSXNDLEtBQUssR0FBQyxLQUFLdEMsU0FBTCxDQUFlLENBQWYsRUFBaUIsQ0FBakIsQ0FBVjtBQUNBLFdBQVFxQyxLQUFLLEdBQUNDLEtBQWQ7QUFDSCxHQXIwQm9CO0FBdTBCckJJLEVBQUFBLFlBdjBCcUIsMEJBdzBCckI7QUFDSSxRQUFJQyxRQUFRLEdBQUNULFFBQVEsQ0FBQ3ZLLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEeEUsV0FBMUQsRUFBdUV5RSxpQkFBdkUsQ0FBeUYzQixZQUF6RixDQUFzRyxjQUF0RyxFQUFzSDhILFNBQXRILENBQWdJQyxVQUFqSSxDQUFyQjs7QUFDQSxTQUFLdEosY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3hDLGlCQUFyQyxHQUF1REssV0FBdkQ7O0FBQ0EsUUFBR29MLFFBQVEsSUFBRSxDQUFWLElBQWVBLFFBQVEsSUFBRSxDQUE1QixFQUErQjtBQUMvQjtBQUNJLFlBQUlsRixVQUFVLEdBQUMsS0FBS3VDLFNBQUwsQ0FBZSxDQUFmLEVBQWlCLEVBQWpCLENBQWYsQ0FESixDQUdJOztBQUNBLFlBQUcyQyxRQUFRLElBQUUsQ0FBYixFQUFnQjtBQUNoQjtBQUNJLGdCQUFJQyxVQUFVLEdBQUMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxFQUFQLENBQWY7QUFDQSxnQkFBSWpILEtBQUssR0FBQyxLQUFLcUUsU0FBTCxDQUFlLENBQWYsRUFBaUIsQ0FBakIsQ0FBVjtBQUNBdkMsWUFBQUEsVUFBVSxHQUFDbUYsVUFBVSxDQUFDakgsS0FBRCxDQUFyQjtBQUNILFdBTEQsTUFLTSxJQUFHZ0gsUUFBUSxJQUFFLENBQWIsRUFBZ0I7QUFDdEI7QUFDSTtBQUNBO0FBQ0E7QUFDQWxGLFlBQUFBLFVBQVUsR0FBQyxDQUFYO0FBQ0gsV0FOSyxNQU9ELElBQUdrRixRQUFRLElBQUUsQ0FBYixFQUFnQjtBQUNyQjtBQUNJLGdCQUFJQyxVQUFVLEdBQUMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsRUFBVCxFQUFZLENBQVosQ0FBZjtBQUNBLGdCQUFJakgsS0FBSyxHQUFDLEtBQUtxRSxTQUFMLENBQWUsQ0FBZixFQUFpQixDQUFqQixDQUFWO0FBQ0F2QyxZQUFBQSxVQUFVLEdBQUNtRixVQUFVLENBQUNqSCxLQUFELENBQXJCO0FBQ0gsV0FMSSxNQU9BLElBQUdnSCxRQUFRLElBQUUsQ0FBYixFQUFnQjtBQUNyQjtBQUNJLGdCQUFJQyxVQUFVLEdBQUMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxFQUFQLENBQWY7QUFDQSxnQkFBSWpILEtBQUssR0FBQyxLQUFLcUUsU0FBTCxDQUFlLENBQWYsRUFBaUIsQ0FBakIsQ0FBVjtBQUNBdkMsWUFBQUEsVUFBVSxHQUFDbUYsVUFBVSxDQUFDakgsS0FBRCxDQUFyQjtBQUNIOztBQUVEakUsUUFBQUEsVUFBVSxHQUFDLEtBQVg7O0FBRUEsWUFBRyxLQUFLNEIsWUFBTCxJQUFtQixDQUF0QixFQUF5QjtBQUN6QjtBQUNJLGdCQUFHLEtBQUtSLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN6RCxTQUFyQyxJQUFnRDBCLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RDRDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZYLElBQTdGLENBQWtHWSxNQUFySixFQUNBO0FBQ0ksa0JBQUlrRyxXQUFXLEdBQUM7QUFBQyw4QkFBYXBGLFVBQWQ7QUFBeUIsMkJBQVVsRztBQUFuQyxlQUFoQjtBQUNBLG1CQUFLdUYsaUJBQUwsQ0FBdUIrRixXQUF2QjtBQUNILGFBSkQsTUFNQTtBQUNJLG1CQUFLekYsbUJBQUw7QUFDSDtBQUNKLFdBWEQsTUFXTSxJQUFHLEtBQUs5RCxZQUFMLElBQW1CLENBQXRCLEVBQXlCO0FBQy9CO0FBQ0ksZ0JBQUl1SixXQUFXLEdBQUM7QUFBQyw0QkFBYXBGLFVBQWQ7QUFBeUIseUJBQVVsRztBQUFuQyxhQUFoQjtBQUNBLGlCQUFLdUYsaUJBQUwsQ0FBdUIrRixXQUF2QjtBQUNIO0FBQ0osT0FqREQsTUFtREE7QUFDSW5MLE1BQUFBLFVBQVUsR0FBQyxLQUFYO0FBQ0E2QyxNQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSx1RUFBWjtBQUNBLFdBQUtrRCxzQkFBTDtBQUNIO0FBQ0osR0FuNEJvQjtBQXE0QnJCa0YsRUFBQUEsZ0JBcjRCcUIsOEJBczRCckI7QUFDSXBMLElBQUFBLFVBQVUsR0FBQyxLQUFYO0FBQ0E2QyxJQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSx1RUFBWjtBQUNBLFNBQUtrRCxzQkFBTDtBQUNILEdBMTRCb0I7QUE0NEJyQm1GLEVBQUFBLGdCQTU0QnFCLDRCQTQ0QkpDLE1BNTRCSSxFQTY0QnJCO0FBQUEsUUFEaUJBLE1BQ2pCO0FBRGlCQSxNQUFBQSxNQUNqQixHQUR3QixLQUN4QjtBQUFBOztBQUNJLFFBQUdBLE1BQU0sSUFBRSxLQUFYLEVBQ0E7QUFDSSxVQUFHLEtBQUtsSyxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDekQsU0FBckMsSUFBZ0QwQix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOEQ0QyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGWCxJQUE3RixDQUFrR1ksTUFBckosRUFDQTtBQUNJLFlBQUlzRyxZQUFZLEdBQUMsS0FBS3ZKLFVBQXRCOztBQUNBLFlBQUcsS0FBS1osY0FBTCxDQUFvQm1LLFlBQXBCLEVBQWtDN0wsY0FBbEMsSUFBa0QsS0FBckQsRUFDQTtBQUNJLGVBQUswQixjQUFMLENBQW9CbUssWUFBcEIsRUFBa0M3TCxjQUFsQyxHQUFpRCxJQUFqRDtBQUVBLGNBQUk4TCxLQUFLLEdBQUMsS0FBS3BLLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUNoRCxJQUEvQzs7QUFDQSxjQUFJeU0sUUFBUSxHQUFDeEwsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzRKLGVBQWxDLEdBQW9EdEssY0FBcEQsQ0FBbUVtSyxZQUFuRSxFQUFpRjNNLGVBQTlGOztBQUNBLGNBQUkrTSxRQUFRLEdBQUMxTCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDNEosZUFBbEMsR0FBb0R0SyxjQUFwRCxDQUFtRW1LLFlBQW5FLEVBQWlGMU0sb0JBQTlGOztBQUNBLGNBQUkrTSxXQUFXLEdBQUMzTCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDNEosZUFBbEMsR0FBb0R0SyxjQUFwRCxDQUFtRW1LLFlBQW5FLEVBQWlGek0sb0JBQWpHOztBQUVBLGNBQUkrTSxVQUFVLEdBQUMsQ0FBZjs7QUFDQSxlQUFLLElBQUk1SCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR2hFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0M0SixlQUFsQyxHQUFvRHRLLGNBQXBELENBQW1FbUssWUFBbkUsRUFBaUY3TSxZQUFqRixDQUE4RjhFLE1BQTFILEVBQWtJUyxLQUFLLEVBQXZJLEVBQTJJO0FBQ3ZJLGdCQUFHaEUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQzRKLGVBQWxDLEdBQW9EdEssY0FBcEQsQ0FBbUVtSyxZQUFuRSxFQUFpRjdNLFlBQWpGLENBQThGdUYsS0FBOUYsRUFBcUd2RyxTQUF4RyxFQUNBO0FBQ0ltTyxjQUFBQSxVQUFVLElBQUU1TCx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDNEosZUFBbEMsR0FBb0R0SyxjQUFwRCxDQUFtRW1LLFlBQW5FLEVBQWlGN00sWUFBakYsQ0FBOEZ1RixLQUE5RixFQUFxR3RHLFVBQWpIO0FBQ0g7QUFDSjs7QUFFRCxjQUFJbU8sTUFBTSxHQUFDLENBQUNILFFBQVEsR0FBQ0MsV0FBVixJQUF1QixNQUFsQztBQUVBLGNBQUlHLE1BQU0sR0FBQyxDQUFYO0FBQ0EsY0FBR04sUUFBUSxJQUFFLENBQWIsRUFDSU0sTUFBTSxHQUFDLEtBQVAsQ0FESixLQUVLLElBQUdOLFFBQVEsSUFBRSxDQUFiLEVBQ0RNLE1BQU0sR0FBQyxRQUFNLEtBQWIsQ0FEQyxLQUVBLElBQUdOLFFBQVEsSUFBRSxDQUFiLEVBQ0RNLE1BQU0sR0FBQyxRQUFNLEtBQU4sR0FBWSxLQUFuQjtBQUVKLGNBQUlDLFdBQVcsR0FBQ1IsS0FBSyxHQUFDTSxNQUFOLEdBQWFDLE1BQWIsR0FBb0JGLFVBQXBDO0FBRUEsZUFBS3pLLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUNyQyxVQUFyQyxHQUFnRHFNLFdBQWhEO0FBQ0EvTCxVQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOEQ0QyxXQUE5RCxHQUE0RUcsaUJBQTVFLENBQThGLG1CQUE5RixFQUFtSCxLQUFLOUQsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixDQUFuSDtBQUVIO0FBQ0o7QUFDSixLQXZDRCxNQXlDQTtBQUNJLFVBQUl1SixZQUFZLEdBQUMsS0FBS3ZKLFVBQXRCOztBQUNBLFVBQUcsS0FBS1osY0FBTCxDQUFvQm1LLFlBQXBCLEVBQWtDN0wsY0FBbEMsSUFBa0QsS0FBckQsRUFDQTtBQUNJLGFBQUswQixjQUFMLENBQW9CbUssWUFBcEIsRUFBa0M3TCxjQUFsQyxHQUFpRCxJQUFqRDtBQUVBLFlBQUk4TCxLQUFLLEdBQUMsS0FBS3BLLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUNoRCxJQUEvQztBQUNBLFlBQUl5TSxRQUFRLEdBQUMsS0FBS3JLLGNBQUwsQ0FBb0JtSyxZQUFwQixFQUFrQzNNLGVBQS9DO0FBQ0EsWUFBSStNLFFBQVEsR0FBQyxLQUFLdkssY0FBTCxDQUFvQm1LLFlBQXBCLEVBQWtDMU0sb0JBQS9DO0FBQ0EsWUFBSStNLFdBQVcsR0FBQyxLQUFLeEssY0FBTCxDQUFvQm1LLFlBQXBCLEVBQWtDek0sb0JBQWxEO0FBRUEsWUFBSStNLFVBQVUsR0FBQyxDQUFmOztBQUNBLGFBQUssSUFBSTVILE9BQUssR0FBRyxDQUFqQixFQUFvQkEsT0FBSyxHQUFHLEtBQUs3QyxjQUFMLENBQW9CbUssWUFBcEIsRUFBa0M3TSxZQUFsQyxDQUErQzhFLE1BQTNFLEVBQW1GUyxPQUFLLEVBQXhGLEVBQTRGO0FBQ3hGLGNBQUdoRSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDNEosZUFBbEMsR0FBb0R0SyxjQUFwRCxDQUFtRW1LLFlBQW5FLEVBQWlGN00sWUFBakYsQ0FBOEZ1RixPQUE5RixFQUFxR3ZHLFNBQXhHLEVBQ0E7QUFDSW1PLFlBQUFBLFVBQVUsSUFBRTVMLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0M0SixlQUFsQyxHQUFvRHRLLGNBQXBELENBQW1FbUssWUFBbkUsRUFBaUY3TSxZQUFqRixDQUE4RnVGLE9BQTlGLEVBQXFHdEcsVUFBakg7QUFDSDtBQUNKOztBQUVHLFlBQUltTyxNQUFNLEdBQUMsQ0FBQ0gsUUFBUSxHQUFDQyxXQUFWLElBQXVCLE1BQWxDO0FBRUEsWUFBSUcsTUFBTSxHQUFDLENBQVg7QUFDQSxZQUFHTixRQUFRLElBQUUsQ0FBYixFQUNJTSxNQUFNLEdBQUMsS0FBUCxDQURKLEtBRUssSUFBR04sUUFBUSxJQUFFLENBQWIsRUFDRE0sTUFBTSxHQUFDLFFBQU0sS0FBYixDQURDLEtBRUEsSUFBR04sUUFBUSxJQUFFLENBQWIsRUFDRE0sTUFBTSxHQUFDLFFBQU0sS0FBTixHQUFZLEtBQW5CO0FBRUosWUFBSUMsV0FBVyxHQUFDUixLQUFLLEdBQUNNLE1BQU4sR0FBYUMsTUFBYixHQUFvQkYsVUFBcEM7QUFFQSxhQUFLekssY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3JDLFVBQXJDLEdBQWdEcU0sV0FBaEQ7QUFDSDtBQUNSO0FBQ0osR0F6OUJvQjtBQTI5QnRCQyxFQUFBQSx5QkEzOUJzQixxQ0EyOUJJNUcsS0EzOUJKLEVBNDlCdEI7QUFDS3BGLElBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N3RCwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTRFRixLQUE1RTtBQUNKLEdBOTlCcUI7QUFnK0J0QjZHLEVBQUFBLFlBaCtCc0Isd0JBZytCVEMsSUFoK0JTLEVBaStCdEI7QUFFQyxRQUFHLEtBQUt2SyxZQUFMLElBQW1CLENBQXRCLEVBQXdCO0FBQ3hCO0FBQ0ksWUFBSTRGLGVBQWUsR0FBQ3ZILHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RGlGLFVBQTlELEVBQXBCO0FBQ0EsWUFBSUssTUFBTSxHQUFDeEgsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThENEMsV0FBOUQsRUFBWDtBQUNBbEMsUUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVltSixJQUFaO0FBQ0F0SixRQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWXlFLE1BQU0sQ0FBQ3pDLGdCQUFQLENBQXdCMkMsaUJBQXhCLENBQTBDcEosU0FBdEQ7QUFDQTBCLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RDRDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYyQyxpQkFBN0YsQ0FBK0cvSCxRQUEvRyxHQUF3SCxJQUF4SDs7QUFFQSxZQUFHNkgsTUFBTSxDQUFDekMsZ0JBQVAsQ0FBd0IyQyxpQkFBeEIsQ0FBMENwSixTQUExQyxJQUFxRDROLElBQXhELEVBQ0E7QUFDSTtBQUNBbE0sVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQ0ksaUJBQWVJLE1BQU0sQ0FBQ3pDLGdCQUFQLENBQXdCMkMsaUJBQXhCLENBQTBDaEksVUFBekQsR0FBb0UsSUFBcEUsR0FBeUUsSUFBekUsR0FDQSx3REFEQSxHQUN5RCxJQUR6RCxHQUM4RCxJQUQ5RCxHQUNtRSxJQURuRSxHQUVBLHNEQUhKLEVBSUksS0FKSjtBQU1ILFNBVEQsTUFXQTtBQUNJO0FBQ0FNLFVBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUNJLGlCQUFlSSxNQUFNLENBQUN6QyxnQkFBUCxDQUF3QjJDLGlCQUF4QixDQUEwQ2hJLFVBQXpELEdBQW9FLElBQXBFLEdBQXlFLElBQXpFLEdBQ0EsdUNBREEsR0FDd0MsSUFEeEMsR0FDNkMsSUFEN0MsR0FDa0QsSUFEbEQsR0FFQSxzREFISixFQUlJLEtBSko7QUFNSDs7QUFFRGlHLFFBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IzRixVQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOERpSyxXQUE5RDtBQUNILFNBRlMsRUFFUCxLQUZPLENBQVY7QUFHSCxPQWhDRCxNQWlDSyxJQUFHLEtBQUt4SyxZQUFMLElBQW1CLENBQXRCLEVBQXdCO0FBQzdCO0FBQ0ksWUFBSTRGLGVBQWUsR0FBQyxLQUFLcEcsY0FBekI7QUFDQSxZQUFJcUcsTUFBTSxHQUFDLEtBQUtyRyxjQUFMLENBQW9CLENBQXBCLENBQVg7QUFDQXlCLFFBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZbUosSUFBWjtBQUNBdEosUUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVl5RSxNQUFNLENBQUNsSixTQUFuQjtBQUNBLGFBQUs2QyxjQUFMLENBQW9CLENBQXBCLEVBQXVCeEIsUUFBdkIsR0FBZ0MsSUFBaEM7O0FBRUEsWUFBRzZILE1BQU0sQ0FBQ2xKLFNBQVAsSUFBa0I0TixJQUFyQixFQUNBO0FBQ0k7QUFDQWxNLFVBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUNJLGlCQUFlSSxNQUFNLENBQUM5SCxVQUF0QixHQUFpQyxJQUFqQyxHQUFzQyxJQUF0QyxHQUNBLHdEQURBLEdBQ3lELElBRHpELEdBQzhELElBRDlELEdBQ21FLElBRG5FLEdBRUEsc0RBSEosRUFJSSxLQUpKO0FBTUgsU0FURCxNQVdBO0FBQ0k7QUFDQU0sVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQ0ksaUJBQWVJLE1BQU0sQ0FBQzlILFVBQXRCLEdBQWlDLElBQWpDLEdBQXNDLElBQXRDLEdBQ0EsdUNBREEsR0FDd0MsSUFEeEMsR0FDNkMsSUFEN0MsR0FDa0QsSUFEbEQsR0FFQSxzREFISixFQUlJLEtBSko7QUFNSDs7QUFFRGlHLFFBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IzRixVQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOERpSyxXQUE5RDtBQUNILFNBRlMsRUFFUCxLQUZPLENBQVY7QUFJSDtBQUVELEdBdmlDcUI7QUF5aUNyQkMsRUFBQUEsYUFBYSxFQUFDLHlCQUNkO0FBQ0ksUUFBR3hNLFdBQVcsSUFBRUksd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NDLGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMERiLE1BQTFFLEVBQ0E7QUFDSVgsTUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksVUFBWjtBQUNBbEMsTUFBQUEsVUFBVSxHQUFDLElBQVg7QUFDQSxXQUFLd0wsYUFBTDs7QUFFQSxVQUFHLEtBQUsxSyxZQUFMLElBQW1CLENBQXRCLEVBQXdCO0FBQ3hCO0FBQ0ksY0FBRzNCLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RDRDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZtQixjQUE3RixDQUE0R0MsVUFBNUcsSUFBd0gsS0FBM0gsRUFDQTtBQUVJLGlCQUFLaUYsZ0JBQUw7QUFDQSxnQkFBSWtCLGVBQWUsR0FBQyxDQUFwQjtBQUVBLGdCQUFJL0UsZUFBZSxHQUFDdkgsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEaUYsVUFBOUQsRUFBcEI7O0FBQ0EsaUJBQUssSUFBSW5ELEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHdUQsZUFBZSxDQUFDaEUsTUFBNUMsRUFBb0RTLEtBQUssRUFBekQsRUFBNkQ7QUFDekQsa0JBQUd1RCxlQUFlLENBQUN2RCxLQUFELENBQWYsQ0FBdUJlLGdCQUF2QixDQUF3QzJDLGlCQUF4QyxDQUEwRGpJLGNBQTdELEVBQ0E7QUFDSTZNLGdCQUFBQSxlQUFlO0FBQ2xCO0FBQ0o7O0FBR0QsZ0JBQUdBLGVBQWUsSUFBRSxLQUFLbkwsY0FBTCxDQUFvQm9DLE1BQXhDLEVBQ0E7QUFDSSxrQkFBSWdKLEdBQUcsR0FBQyxDQUFSO0FBQ0Esa0JBQUlDLFdBQVcsR0FBQyxDQUFoQjtBQUNBLGtCQUFJQyxXQUFXLEdBQUN6TSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOERpRixVQUE5RCxFQUFoQjs7QUFDQSxtQkFBSyxJQUFJbkQsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUd5SSxXQUFXLENBQUNsSixNQUF4QyxFQUFnRFMsT0FBSyxFQUFyRCxFQUF5RDtBQUNyRCxvQkFBSTBJLE1BQU0sR0FBR0QsV0FBVyxDQUFDekksT0FBRCxDQUFYLENBQW1CZSxnQkFBbkIsQ0FBb0MyQyxpQkFBcEMsQ0FBc0RoSSxVQUFuRTs7QUFFQSxvQkFBR2dOLE1BQU0sR0FBR0gsR0FBWixFQUNBO0FBQ0lDLGtCQUFBQSxXQUFXLEdBQUN4SSxPQUFaO0FBQ0F1SSxrQkFBQUEsR0FBRyxHQUFDRyxNQUFKO0FBQ0g7QUFDSjs7QUFFRDlKLGNBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLDRCQUEwQjBKLFdBQVcsQ0FBQ0QsV0FBRCxDQUFYLENBQXlCekgsZ0JBQXpCLENBQTBDMkMsaUJBQTFDLENBQTREcEosU0FBbEc7QUFHQSxtQkFBSzBOLHlCQUFMLENBQStCUyxXQUFXLENBQUNELFdBQUQsQ0FBWCxDQUF5QnpILGdCQUF6QixDQUEwQzJDLGlCQUExQyxDQUE0RHBKLFNBQTNGLEVBakJKLENBa0JJO0FBQ0gsYUFwQkQsTUFxQkE7QUFDSXlCLGNBQUFBLFVBQVUsR0FBQyxLQUFYO0FBQ0EsbUJBQUttRixVQUFMO0FBQ0g7QUFDSjtBQUNKLFNBM0NELE1BNENLLElBQUcsS0FBS3ZELFlBQUwsSUFBbUIsQ0FBdEIsRUFBd0I7QUFDN0I7QUFDSSxlQUFLeUosZ0JBQUwsQ0FBc0IsSUFBdEI7QUFDQSxjQUFJa0IsZUFBZSxHQUFDLENBQXBCO0FBRUEsY0FBSS9FLGVBQWUsR0FBQyxLQUFLcEcsY0FBekI7O0FBQ0EsZUFBSyxJQUFJNkMsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUd1RCxlQUFlLENBQUNoRSxNQUE1QyxFQUFvRFMsT0FBSyxFQUF6RCxFQUE2RDtBQUN6RCxnQkFBR3VELGVBQWUsQ0FBQ3ZELE9BQUQsQ0FBZixDQUF1QnZFLGNBQTFCLEVBQ0E7QUFDSTZNLGNBQUFBLGVBQWU7QUFDbEI7QUFDSjs7QUFHRCxjQUFHQSxlQUFlLElBQUUsS0FBS25MLGNBQUwsQ0FBb0JvQyxNQUF4QyxFQUNBO0FBQ1EsZ0JBQUlnSixHQUFHLEdBQUMsQ0FBUjtBQUNBLGdCQUFJQyxXQUFXLEdBQUMsQ0FBaEI7QUFDQSxnQkFBSUMsV0FBVyxHQUFDLEtBQUt0TCxjQUFyQjs7QUFDQSxpQkFBSyxJQUFJNkMsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUd5SSxXQUFXLENBQUNsSixNQUF4QyxFQUFnRFMsT0FBSyxFQUFyRCxFQUF5RDtBQUNyRCxrQkFBSTBJLE1BQU0sR0FBR0QsV0FBVyxDQUFDekksT0FBRCxDQUFYLENBQW1CdEUsVUFBaEM7O0FBRUEsa0JBQUdnTixNQUFNLEdBQUdILEdBQVosRUFDQTtBQUNJQyxnQkFBQUEsV0FBVyxHQUFDeEksT0FBWjtBQUNBdUksZ0JBQUFBLEdBQUcsR0FBQ0csTUFBSjtBQUNIO0FBQ0o7O0FBRUQ5SixZQUFBQSxPQUFPLENBQUNHLEdBQVIsQ0FBWSw0QkFBMEIwSixXQUFXLENBQUNELFdBQUQsQ0FBWCxDQUF5QmxPLFNBQS9EO0FBR0EsaUJBQUswTix5QkFBTCxDQUErQlMsV0FBVyxDQUFDRCxXQUFELENBQVgsQ0FBeUJsTyxTQUF4RCxFQWpCUixDQWtCUTtBQUNQLFdBcEJELE1BcUJBO0FBQ0l5QixZQUFBQSxVQUFVLEdBQUMsS0FBWDtBQUNBLGlCQUFLbUYsVUFBTDtBQUNIO0FBQ0o7QUFDSixLQTFGRCxNQTRGQTtBQUNJckYsTUFBQUEsUUFBUSxHQUFDQSxRQUFRLEdBQUMsQ0FBbEI7O0FBQ0EsVUFBSW9FLE1BQU0sR0FBQ2pJLEVBQUUsQ0FBQ2tJLElBQUgsQ0FBUWxFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEeEUsV0FBMUQsRUFBdUV5RSxpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHQyxDQUExRyxFQUE0R3ZFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEeEUsV0FBMUQsRUFBdUV5RSxpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHRSxDQUE5TSxDQUFYOztBQUNBLFdBQUttSSxXQUFMLENBQWlCLEtBQUtsTCxjQUFMLENBQW9CLEtBQUtNLFVBQXpCLENBQWpCLEVBQXNEa0MsTUFBdEQ7QUFDSDtBQUNKLEdBNW9Db0I7QUE4b0NyQm9FLEVBQUFBLFNBQVMsRUFBQyxtQkFBU3VFLEdBQVQsRUFBYUwsR0FBYixFQUNWO0FBQ0ksV0FBT00sSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQlIsR0FBRyxHQUFHSyxHQUF2QixDQUFYLElBQTJDQSxHQUFsRCxDQURKLENBQzJEO0FBQzFELEdBanBDb0I7QUFtcENyQjNDLEVBQUFBLFdBQVcsRUFBRSxxQkFBVUQsSUFBVixFQUFnQmdELE1BQWhCLEVBQXVCQyxJQUF2QixFQUE2QjtBQUFBOztBQUN0Q2pSLElBQUFBLEVBQUUsQ0FBQ2tSLEtBQUgsQ0FBUyxLQUFLM0wsVUFBZCxFQUNDNEwsRUFERCxDQUNJRixJQURKLEVBQ1U7QUFBRTNJLE1BQUFBLFFBQVEsRUFBRXRJLEVBQUUsQ0FBQ29SLEVBQUgsQ0FBTXBELElBQUksQ0FBQ3pGLENBQVgsRUFBY3lGLElBQUksQ0FBQ3hGLENBQW5CO0FBQVosS0FEVixFQUM2QztBQUFDNkksTUFBQUEsTUFBTSxFQUFDO0FBQVIsS0FEN0MsRUFFQ0MsSUFGRCxDQUVNLFlBQU07QUFDWixVQUFHTixNQUFILEVBQ0ksTUFBSSxDQUFDTyxZQUFMLEdBREosS0FHSSxNQUFJLENBQUNsQixhQUFMO0FBQ0gsS0FQRCxFQVFDbUIsS0FSRDtBQVNILEdBN3BDb0I7QUErcENyQkQsRUFBQUEsWUEvcENxQiwwQkErcENMO0FBQUE7O0FBQ1o1SCxJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNaLFVBQUcsTUFBSSxDQUFDbEQsTUFBTCxDQUFZMEcsU0FBWixHQUFzQixDQUF6QixFQUNBO0FBQ0csUUFBQSxNQUFJLENBQUMxRyxNQUFMLENBQVkwRyxTQUFaLEdBQXNCLE1BQUksQ0FBQzFHLE1BQUwsQ0FBWTBHLFNBQVosR0FBc0IsSUFBNUM7O0FBQ0EsUUFBQSxNQUFJLENBQUNvRSxZQUFMO0FBQ0YsT0FKRCxNQU1BO0FBQ0csUUFBQSxNQUFJLENBQUM5SyxNQUFMLENBQVkwRyxTQUFaLEdBQXNCLENBQXRCO0FBQ0EsUUFBQSxNQUFJLENBQUN4RyxlQUFMLEdBQXFCLElBQXJCOztBQUNBLFFBQUEsTUFBSSxDQUFDeUosYUFBTDtBQUNGO0FBQ0gsS0FaTyxFQVlMLEVBWkssQ0FBVjtBQWFILEdBN3FDb0I7QUErcUNyQnFCLEVBQUFBLHFCQS9xQ3FCLGlDQStxQ0NwQyxNQS9xQ0QsRUFnckNyQjtBQUFBLFFBRHNCQSxNQUN0QjtBQURzQkEsTUFBQUEsTUFDdEIsR0FENkIsS0FDN0I7QUFBQTs7QUFDSSxRQUFHZCxRQUFRLENBQUN2Syx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0MsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHhFLFdBQTFELEVBQXVFeUUsaUJBQXZFLENBQXlGM0IsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0g4SCxTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUFzSixDQUF6SixFQUNJdEssWUFBWSxHQUFDLElBQWI7QUFFSixRQUFHb0ssUUFBUSxDQUFDdkssd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NDLGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER4RSxXQUExRCxFQUF1RXlFLGlCQUF2RSxDQUF5RjNCLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIOEgsU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQVIsSUFBc0osQ0FBekosRUFDSXJLLFlBQVksR0FBQyxJQUFiO0FBRUpDLElBQUFBLGtCQUFrQixHQUFDLEtBQUtjLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUNyRCxpQkFBckMsQ0FBdURiLGlCQUExRTs7QUFDQSxRQUFHc0MsWUFBWSxJQUFJLENBQUNDLFlBQWpCLElBQWlDLENBQUNDLGtCQUFyQyxFQUNBO0FBQ0ksV0FBS3FOLHVCQUFMLENBQTZCLEtBQTdCO0FBQ0EsV0FBS0MsWUFBTCxDQUFrQixLQUFsQixFQUF3QixLQUF4QjtBQUNBLFdBQUtDLDBCQUFMLENBQWdDLEtBQWhDLEVBQXNDdkMsTUFBdEM7QUFDSCxLQUxELE1BTUssSUFBSWpMLFlBQUQsSUFBbUJELFlBQVksSUFBSUUsa0JBQXRDLEVBQ0w7QUFDSSxXQUFLcU4sdUJBQUwsQ0FBNkIsS0FBN0I7QUFDQSxXQUFLQyxZQUFMLENBQWtCLEtBQWxCLEVBQXdCLEtBQXhCO0FBQ0EsV0FBS0MsMEJBQUwsQ0FBZ0MsSUFBaEMsRUFBcUN2QyxNQUFyQztBQUNILEtBTEksTUFPTDtBQUNJLFdBQUtOLFlBQUw7QUFDSDtBQUNKLEdBeHNDb0I7QUEwc0NyQnNCLEVBQUFBLGFBMXNDcUIsMkJBMHNDSjtBQUFBOztBQUNiMUcsSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYixVQUFHLE1BQUksQ0FBQ2xELE1BQUwsQ0FBWTBHLFNBQVosSUFBdUIsQ0FBMUIsRUFDQTtBQUNHLFFBQUEsTUFBSSxDQUFDeEcsZUFBTCxHQUFxQixLQUFyQjtBQUNBLFFBQUEsTUFBSSxDQUFDRixNQUFMLENBQVkwRyxTQUFaLEdBQXNCLE1BQUksQ0FBQzFHLE1BQUwsQ0FBWTBHLFNBQVosR0FBc0IsSUFBNUM7O0FBQ0EsUUFBQSxNQUFJLENBQUNrRCxhQUFMO0FBQ0YsT0FMRCxNQU9BO0FBQ0ksUUFBQSxNQUFJLENBQUM5SyxVQUFMLENBQWdCK0MsUUFBaEIsR0FBeUJ0SSxFQUFFLENBQUNrSSxJQUFILENBQVEsQ0FBUixFQUFVLENBQVYsQ0FBekI7QUFDQSxRQUFBLE1BQUksQ0FBQ3pCLE1BQUwsQ0FBWTBHLFNBQVosR0FBc0IsQ0FBdEI7QUFFQW5KLFFBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMEQwRywyQkFBMUQsQ0FBc0YsQ0FBdEY7O0FBRUEsWUFBRyxDQUFDaEosVUFBSixFQUNBO0FBQ0ksY0FBRyxNQUFJLENBQUNjLFlBQUwsSUFBbUIsQ0FBdEIsRUFBeUI7QUFDekI7QUFDSSxrQkFBRyxNQUFJLENBQUNSLGNBQUwsQ0FBb0IsTUFBSSxDQUFDWSxVQUF6QixFQUFxQ3pELFNBQXJDLElBQWdEMEIsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThENEMsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlgsSUFBN0YsQ0FBa0dZLE1BQXJKLEVBQ0ksTUFBSSxDQUFDeUkscUJBQUwsR0FESixLQUdJLE1BQUksQ0FBQzFDLFlBQUw7QUFDUCxhQU5ELE1BTU0sSUFBRyxNQUFJLENBQUNwSixZQUFMLElBQW1CLENBQXRCLEVBQXlCO0FBQy9CO0FBQ0c7QUFDSyxjQUFBLE1BQUksQ0FBQzhMLHFCQUFMLENBQTJCLE1BQUksQ0FBQ3RNLGNBQUwsQ0FBb0IsTUFBSSxDQUFDWSxVQUF6QixFQUFxQ3ZELEtBQWhFLEVBRlIsQ0FHRztBQUNFOztBQUNKO0FBQ0o7QUFDSjtBQUNILEtBL0JRLEVBK0JOLEVBL0JNLENBQVY7QUFpQ0gsR0E1dUNvQjtBQTh1Q3JCbU8sRUFBQUEsV0FBVyxFQUFFLHFCQUFVckwsSUFBVixFQUFldU0sS0FBZixFQUFzQjtBQUFBOztBQUMvQjdSLElBQUFBLEVBQUUsQ0FBQ2tSLEtBQUgsQ0FBUzVMLElBQVQsRUFDQzZMLEVBREQsQ0FDSSxHQURKLEVBQ1M7QUFBRTdJLE1BQUFBLFFBQVEsRUFBRXRJLEVBQUUsQ0FBQ29SLEVBQUgsQ0FBTVMsS0FBSyxDQUFDdEosQ0FBWixFQUFlc0osS0FBSyxDQUFDckosQ0FBckI7QUFBWixLQURULEVBQzhDO0FBQUM2SSxNQUFBQSxNQUFNLEVBQUM7QUFBUixLQUQ5QyxFQUVDQyxJQUZELENBRU0sWUFBTTtBQUNaLFVBQUd6TixRQUFRLEdBQUNDLFFBQVosRUFDQTtBQUNJLFlBQUcsQ0FBQ2UsVUFBSixFQUNBO0FBQ0ksY0FBRyxNQUFJLENBQUNjLFlBQUwsSUFBbUIsQ0FBdEIsRUFDQTtBQUNJLGdCQUFHLE1BQUksQ0FBQ1IsY0FBTCxDQUFvQixNQUFJLENBQUNZLFVBQXpCLEVBQXFDekQsU0FBckMsSUFBZ0QwQix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOEQ0QyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGWCxJQUE3RixDQUFrR1ksTUFBckosRUFDQTtBQUNJLGtCQUFHdUYsUUFBUSxDQUFDdkssd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NDLGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER4RSxXQUExRCxFQUF1RXlFLGlCQUF2RSxDQUF5RjNCLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIOEgsU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQVIsSUFBc0osQ0FBekosRUFDSXRLLFlBQVksR0FBQyxJQUFiO0FBQ1A7QUFDSixXQVBELE1BUUssSUFBRyxNQUFJLENBQUN3QixZQUFMLElBQW1CLENBQXRCLEVBQXdCO0FBQzdCO0FBQ0ksa0JBQUc0SSxRQUFRLENBQUN2Syx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0MsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHhFLFdBQTFELEVBQXVFeUUsaUJBQXZFLENBQXlGM0IsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0g4SCxTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUFzSixDQUF6SixFQUNJdEssWUFBWSxHQUFDLElBQWI7QUFDUDtBQUNKOztBQUVELFlBQUdQLFdBQVcsSUFBRSxFQUFoQixFQUNJQSxXQUFXLEdBQUNBLFdBQVcsR0FBQyxFQUF4QixDQURKLEtBR0lBLFdBQVcsR0FBQ0EsV0FBVyxHQUFDLENBQXhCLENBckJSLENBdUJJOztBQUNBZ0QsUUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVlsRCxRQUFRLEdBQUMsR0FBVCxHQUFhRCxXQUF6Qjs7QUFFQSxRQUFBLE1BQUksQ0FBQ3dNLGFBQUwsR0ExQkosQ0EyQkk7O0FBRUgsT0E5QkQsTUFnQ0E7QUFDSSxZQUFJMEIsT0FBTyxHQUFDOVIsRUFBRSxDQUFDa0ksSUFBSCxDQUFRLENBQVIsRUFBVSxDQUFWLENBQVo7O0FBQ0EsUUFBQSxNQUFJLENBQUMrRixXQUFMLENBQWlCNkQsT0FBakIsRUFBeUIsS0FBekIsRUFBK0IsR0FBL0IsRUFGSixDQUV5Qzs7QUFDeEM7QUFFQSxLQXhDRCxFQXlDQ04sS0F6Q0Q7QUEwQ0gsR0F6eENvQjtBQTJ4Q3JCO0FBRUFHLEVBQUFBLFlBN3hDcUIsd0JBNnhDUkksSUE3eENRLEVBNnhDSEMsSUE3eENHLEVBOHhDckI7QUFDSTdOLElBQUFBLFlBQVksR0FBQzROLElBQWI7QUFDQTNOLElBQUFBLFlBQVksR0FBQzROLElBQWI7QUFDSCxHQWp5Q29CO0FBbXlDckJDLEVBQUFBLDJCQW55Q3FCLHVDQW15Q09DLE1BbnlDUCxFQW15Q2MxRixNQW55Q2QsRUFteUNxQjJGLGFBbnlDckIsRUFveUNyQjtBQUNJLFFBQUcsS0FBS2hOLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUNoRCxJQUFyQyxJQUEyQ21QLE1BQTlDLEVBQ0E7QUFDSSxXQUFLL00sY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ2hELElBQXJDLEdBQTBDLEtBQUtvQyxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDaEQsSUFBckMsR0FBMENtUCxNQUFwRjtBQUNBLFdBQUsvTSxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDbEQsb0JBQXJDLEdBQTBELEtBQUtzQyxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDbEQsb0JBQXJDLEdBQTBELENBQXBIOztBQUNBLFdBQUtzQyxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDdEQsWUFBckMsQ0FBa0QrSixNQUFsRCxFQUEwRGhMLGFBQTFELENBQXdFK0ksSUFBeEUsQ0FBNkU0SCxhQUE3RTs7QUFDQW5PLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUFvRSwrQ0FBcEUsRUFBb0gsSUFBcEg7QUFDQXpCLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IzRixRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0IscUJBQWxDLEdBQTBEaUwsc0NBQTFEO0FBQ0gsT0FGUyxFQUVQLElBRk8sQ0FBVjtBQUdILEtBVEQsTUFXQTtBQUNJcE8sTUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQW9FLHVFQUFxRThHLE1BQXpJO0FBQ0g7QUFFSixHQXB6Q29CO0FBc3pDckJHLEVBQUFBLDJDQXR6Q3FCLHlEQXV6Q3JCO0FBQ0luTyxJQUFBQSxxQkFBcUIsR0FBQyxFQUF0QjtBQUVBMEMsSUFBQUEsT0FBTyxDQUFDRyxHQUFSLENBQVksS0FBSzVCLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUN0RCxZQUFqRDs7QUFDQSxTQUFLLElBQUk2UCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtuTixjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDdEQsWUFBckMsQ0FBa0Q4RSxNQUF0RSxFQUE4RStLLENBQUMsRUFBL0UsRUFBbUY7QUFDL0UsVUFBRy9ELFFBQVEsQ0FBQyxLQUFLcEosY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3RELFlBQXJDLENBQWtENlAsQ0FBbEQsRUFBcUQ1UixZQUF0RCxDQUFSLElBQTZFLENBQWhGLEVBQW1GO0FBQ25GO0FBQ0ksY0FBSTZSLElBQUksR0FBR3ZTLEVBQUUsQ0FBQ3dTLFdBQUgsQ0FBZXhPLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMERzTCxtQkFBMUQsQ0FBOEVDLG9CQUE3RixDQUFYO0FBQ0FILFVBQUFBLElBQUksQ0FBQ3pGLE1BQUwsR0FBYzlJLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMERzTCxtQkFBMUQsQ0FBOEVFLDJCQUE1RjtBQUNBSixVQUFBQSxJQUFJLENBQUM3TCxZQUFMLENBQWtCLHVCQUFsQixFQUEyQ2tNLGdCQUEzQyxDQUE0RE4sQ0FBNUQ7QUFDQUMsVUFBQUEsSUFBSSxDQUFDN0wsWUFBTCxDQUFrQix1QkFBbEIsRUFBMkM0RixPQUEzQyxDQUFtRCxLQUFLbkgsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3RELFlBQXJDLENBQWtENlAsQ0FBbEQsRUFBcURyUixZQUF4RztBQUNBc1IsVUFBQUEsSUFBSSxDQUFDN0wsWUFBTCxDQUFrQix1QkFBbEIsRUFBMkNtTSxZQUEzQztBQUNBM08sVUFBQUEscUJBQXFCLENBQUNxRyxJQUF0QixDQUEyQmdJLElBQTNCO0FBQ0g7QUFDSjs7QUFDRDNMLElBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZN0MscUJBQVo7QUFDQSxXQUFPQSxxQkFBcUIsQ0FBQ3FELE1BQTdCO0FBQ0gsR0F4MENvQjtBQTAwQ3JCdUwsRUFBQUEscUJBMTBDcUIsbUNBMjBDckI7QUFDSSxTQUFLLElBQUk5SyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRzlELHFCQUFxQixDQUFDcUQsTUFBbEQsRUFBMERTLEtBQUssRUFBL0QsRUFBbUU7QUFDL0Q5RCxNQUFBQSxxQkFBcUIsQ0FBQzhELEtBQUQsQ0FBckIsQ0FBNkIrSyxPQUE3QjtBQUNIOztBQUVEN08sSUFBQUEscUJBQXFCLEdBQUMsRUFBdEI7QUFDSCxHQWoxQ29CO0FBbTFDckI4TyxFQUFBQSx5QkFuMUNxQixxQ0FtMUNLQyxLQW4xQ0wsRUFtMUNXQyxZQW4xQ1gsRUFtMUN3QkMsU0FuMUN4QixFQW8xQ3JCO0FBQ0ksUUFBR0EsU0FBSCxFQUNBO0FBQ0ksVUFBSUMsTUFBTSxHQUFDLElBQUlsUixTQUFKLEVBQVg7O0FBQ0FrUixNQUFBQSxNQUFNLENBQUNuUyxZQUFQLEdBQW9CZ1MsS0FBcEI7QUFDQUcsTUFBQUEsTUFBTSxDQUFDalIsV0FBUCxHQUFtQitRLFlBQW5CO0FBRUEsV0FBSy9OLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUNqRCxVQUFyQyxDQUFnRHlILElBQWhELENBQXFENkksTUFBckQ7QUFDSDtBQUNKLEdBNzFDb0I7QUErMUNyQnhCLEVBQUFBLDBCQS8xQ3FCLHNDQSsxQ015QixlQS8xQ04sRUErMUM0QmhFLE1BLzFDNUIsRUFnMkNyQjtBQUFBOztBQUFBLFFBRDJCZ0UsZUFDM0I7QUFEMkJBLE1BQUFBLGVBQzNCLEdBRDJDLEtBQzNDO0FBQUE7O0FBQUEsUUFEaURoRSxNQUNqRDtBQURpREEsTUFBQUEsTUFDakQsR0FEd0QsS0FDeEQ7QUFBQTs7QUFDSTlLLElBQUFBLGVBQWUsR0FBQyxLQUFLWSxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDckQsaUJBQXJDLENBQXVEWCxjQUF2RTtBQUNBeUMsSUFBQUEsaUJBQWlCLEdBQUMsS0FBS1csY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3JELGlCQUFyQyxDQUF1RFYsZ0JBQXpFO0FBQ0F5QyxJQUFBQSxpQkFBaUIsR0FBQyxLQUFLVSxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDckQsaUJBQXJDLENBQXVEVCxnQkFBekU7O0FBRUEsUUFBR3NDLGVBQUgsRUFBb0I7QUFDcEI7QUFDSSxhQUFLK08sc0JBQUwsQ0FBNEIsS0FBNUI7O0FBRUEsWUFBRyxDQUFDakUsTUFBSixFQUNBO0FBQ0lyTCxVQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FBb0Usa0JBQXBFLEVBQXVGLElBQXZGO0FBQ0F6QixVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLFlBQUEsTUFBSSxDQUFDb0YsWUFBTDtBQUNILFdBRlMsRUFFUCxJQUZPLENBQVY7QUFHSCxTQU5ELE1BT0E7QUFDSW5JLFVBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLGtCQUFaO0FBQ0E0QyxVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLFlBQUEsTUFBSSxDQUFDb0YsWUFBTDtBQUNILFdBRlMsRUFFUCxHQUZPLENBQVY7QUFHSDtBQUNKLE9BakJELE1BbUJBO0FBQ0ksVUFBSXdFLE1BQU0sR0FBQyxFQUFYO0FBRUEsVUFBR0YsZUFBSCxFQUNJRSxNQUFNLEdBQUMsY0FBUCxDQURKLEtBR0lBLE1BQU0sR0FBQyxRQUFQO0FBRUp2UCxNQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0IscUJBQWxDLEdBQTBEcU0saUJBQTFELENBQTRFRCxNQUE1RSxFQUFtRkYsZUFBbkYsRUFBbUc3TyxpQkFBbkcsRUFBcUhDLGlCQUFySCxFQUF1STRLLE1BQXZJO0FBQ0g7QUFDSixHQWw0Q29CO0FBbzRDckJvRSxFQUFBQSxxQkFwNENxQixtQ0FxNENyQjtBQUNJLFNBQUt0TyxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDM0MsVUFBckMsR0FBZ0QsSUFBaEQ7QUFDQSxTQUFLK0IsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQzFDLGNBQXJDLElBQXFELENBQXJEO0FBQ0FXLElBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMERRLDhCQUExRCxDQUF5RixJQUF6RixFQUE4RixLQUE5RixFQUFvRyxLQUFLaEMsWUFBekcsRUFBc0gsS0FBS1IsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQzNDLFVBQTNKLEVBQXNLLEtBQUsrQixjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDMUMsY0FBM007QUFDSCxHQXo0Q29CO0FBMjRDekI7QUFFSTtBQUNBcU8sRUFBQUEsdUJBOTRDcUIsbUNBODRDR2dDLE1BOTRDSCxFQSs0Q3JCO0FBQ0lyUCxJQUFBQSxrQkFBa0IsR0FBQ3FQLE1BQW5CO0FBQ0EsU0FBS3ZPLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUNyRCxpQkFBckMsQ0FBdURiLGlCQUF2RCxHQUF5RXdDLGtCQUF6RTtBQUNILEdBbDVDb0I7QUFvNUNyQmdILEVBQUFBLGtCQXA1Q3FCLDhCQW81Q0ZxSSxNQXA1Q0UsRUFxNUNyQjtBQUNJcFAsSUFBQUEsYUFBYSxHQUFDb1AsTUFBZDtBQUNBLFNBQUt2TyxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDckQsaUJBQXJDLENBQXVEWixZQUF2RCxHQUFvRXdDLGFBQXBFO0FBQ0gsR0F4NUNvQjtBQTA1Q3JCZ1AsRUFBQUEsc0JBMTVDcUIsa0NBMDVDRUksTUExNUNGLEVBMjVDckI7QUFDSW5QLElBQUFBLGVBQWUsR0FBQ21QLE1BQWhCO0FBQ0EsU0FBS3ZPLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUNyRCxpQkFBckMsQ0FBdURYLGNBQXZELEdBQXNFd0MsZUFBdEU7QUFDSCxHQTk1Q29CO0FBZzZDckJvUCxFQUFBQSwwQkFoNkNxQixzQ0FnNkNNRCxNQWg2Q04sRUFpNkNyQjtBQUNJbFAsSUFBQUEsaUJBQWlCLEdBQUNrUCxNQUFsQjtBQUNBLFNBQUt2TyxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDckQsaUJBQXJDLENBQXVEVixnQkFBdkQsR0FBd0V3QyxpQkFBeEU7QUFDSCxHQXA2Q29CO0FBczZDckJvUCxFQUFBQSwrQkF0NkNxQiwyQ0FzNkNXRixNQXQ2Q1gsRUF1NkNyQjtBQUNJalAsSUFBQUEsaUJBQWlCLEdBQUNpUCxNQUFsQjtBQUNBLFNBQUt2TyxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDckQsaUJBQXJDLENBQXVEVCxnQkFBdkQsR0FBd0V3QyxpQkFBeEU7QUFDSCxHQTE2Q29CO0FBNDZDckJvRyxFQUFBQSxrQkE1NkNxQiw4QkE0NkNGNkksTUE1NkNFLEVBNjZDckI7QUFDSS9PLElBQUFBLGNBQWMsR0FBQytPLE1BQWY7QUFDSCxHQS82Q29CO0FBaTdDckJHLEVBQUFBLGtCQWo3Q3FCLGdDQWs3Q3JCO0FBQ0ksV0FBT2xQLGNBQVA7QUFDSCxHQXA3Q29CO0FBczdDckJtUCxFQUFBQSxxQkF0N0NxQixtQ0F1N0NyQjtBQUNJLFFBQUlDLFdBQVcsR0FBQyxDQUFDLENBQWpCOztBQUNBLFFBQUcsS0FBSzVPLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUM3QyxlQUFyQyxHQUFxRCxDQUF4RCxFQUNBO0FBQ0k2USxNQUFBQSxXQUFXLEdBQUMsS0FBSzVPLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUM3QyxlQUFqRDtBQUNBLFdBQUtpQyxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDN0MsZUFBckMsR0FBcUQsQ0FBckQ7QUFDSCxLQUpELE1BTUE7QUFDSTZRLE1BQUFBLFdBQVcsR0FBQyxDQUFaO0FBQ0g7O0FBRUQsV0FBT0EsV0FBUDtBQUNILEdBcDhDb0I7QUFzOENyQkMsRUFBQUEsc0JBdDhDcUIsa0NBczhDRUMsV0F0OENGLEVBdThDckI7QUFDSSxRQUFJQyxnQkFBZ0IsR0FBQyxDQUFDLENBQXRCOztBQUNBLFFBQUcsS0FBSy9PLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUM3QyxlQUFyQyxHQUFxRCxDQUF4RCxFQUNBO0FBQ0lnUixNQUFBQSxnQkFBZ0IsR0FBQyxLQUFLL08sY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQzdDLGVBQXJDLElBQXNEK1EsV0FBdkU7QUFDSCxLQUhELE1BS0E7QUFDSUMsTUFBQUEsZ0JBQWdCLEdBQUMsQ0FBakI7QUFDSDs7QUFFRCxXQUFPQSxnQkFBUDtBQUNILEdBbjlDb0I7QUFxOUNyQkMsRUFBQUEsaUJBcjlDcUIsNkJBcTlDSEMsT0FyOUNHLEVBczlDckI7QUFDSSxRQUFJQyxPQUFPLEdBQUMsQ0FBQyxDQUFiOztBQUNBLFFBQUcsS0FBS2xQLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUM3QyxlQUFyQyxHQUFxRCxDQUF4RCxFQUNBO0FBQ0lrUixNQUFBQSxPQUFPLEdBQUVBLE9BQU8sR0FBQyxHQUFqQjtBQUNBQyxNQUFBQSxPQUFPLEdBQUMsS0FBS2xQLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUM3QyxlQUFyQyxJQUFzRGtSLE9BQTlEO0FBQ0EsV0FBS2pQLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUM3QyxlQUFyQyxHQUFxRCxDQUFyRDtBQUNBLFdBQUtpQyxjQUFMLENBQW9CLEtBQUtZLFVBQXpCLEVBQXFDaEQsSUFBckMsSUFBMkNzUixPQUEzQztBQUNILEtBTkQsTUFRQTtBQUNJQSxNQUFBQSxPQUFPLEdBQUMsQ0FBUjtBQUNIOztBQUVELFdBQU9BLE9BQVA7QUFDSCxHQXIrQ29CO0FBdStDckJDLEVBQUFBLG1DQXYrQ3FCLCtDQXUrQ2VsTCxLQXYrQ2YsRUF3K0NyQjtBQUNJLFFBQUltTCxPQUFPLEdBQUNuTCxLQUFLLENBQUNvTCxNQUFsQjtBQUNBLFFBQUlDLGNBQWMsR0FBQ3JMLEtBQUssQ0FBQ3NMLFFBQXpCO0FBQ0EsUUFBSXBGLFlBQVksR0FBQ2xHLEtBQUssQ0FBQ3VMLFNBQXZCOztBQUNBLFFBQUlDLGtCQUFrQixHQUFDNVEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxFQUF2Qjs7QUFFQSxRQUFHb04sT0FBTyxJQUFFdlEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThENEMsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RjJDLGlCQUE3RixDQUErR3BKLFNBQTNILEVBQ0E7QUFDSXNFLE1BQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZLFlBQVo7O0FBRUE2TixNQUFBQSxrQkFBa0IsQ0FBQ0MsdUNBQW5CLENBQTJELElBQTNEOztBQUVBL1AsTUFBQUEsZ0JBQWdCLEdBQUMyUCxjQUFqQjtBQUNBLFVBQUlLLGNBQWMsR0FBQy9QLFlBQVksQ0FBQzBQLGNBQWMsR0FBQyxDQUFoQixDQUEvQjs7QUFDQUcsTUFBQUEsa0JBQWtCLENBQUNHLHNDQUFuQixDQUEwREQsY0FBMUQ7QUFDSDtBQUNKLEdBeC9Db0I7QUEwL0NyQkUsRUFBQUEsbUNBMS9DcUIsK0NBMC9DZUMsV0ExL0NmLEVBMi9DckI7QUFBQSxRQURvQ0EsV0FDcEM7QUFEb0NBLE1BQUFBLFdBQ3BDLEdBRGdELEtBQ2hEO0FBQUE7O0FBQ0ksUUFBSUwsa0JBQWtCLEdBQUM1USx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0IscUJBQWxDLEVBQXZCOztBQUNBLFFBQUkrTixPQUFKOztBQUNBLFFBQUlDLFNBQUo7O0FBQ0EsUUFBRyxLQUFLeFAsWUFBTCxJQUFtQixDQUF0QixFQUF5QjtBQUN6QjtBQUNJd1AsUUFBQUEsU0FBUyxHQUFDblIsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEYyxZQUE5RCxHQUE2RTRHLGlCQUE3RSxFQUFWO0FBQ0FzSCxRQUFBQSxPQUFPLEdBQUNsUix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOEQ0QyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGMkMsaUJBQXJHO0FBQ0gsT0FKRCxNQUtLLElBQUcsS0FBSy9GLFlBQUwsSUFBbUIsQ0FBdEIsRUFBd0I7QUFDN0I7QUFDSXVQLFFBQUFBLE9BQU8sR0FBQyxLQUFLL1AsY0FBTCxDQUFvQixDQUFwQixDQUFSO0FBQ0FnUSxRQUFBQSxTQUFTLEdBQUMsS0FBS2hRLGNBQWY7QUFDSDs7QUFDRHlQLElBQUFBLGtCQUFrQixDQUFDUSxvQ0FBbkIsQ0FBd0QsSUFBeEQ7O0FBQ0FSLElBQUFBLGtCQUFrQixDQUFDUyxtQ0FBbkI7O0FBQ0FULElBQUFBLGtCQUFrQixDQUFDVSxtQ0FBbkIsQ0FBdURKLE9BQXZELEVBQStEQyxTQUEvRCxFQUF5RUYsV0FBekUsRUFBcUYsS0FBS3RQLFlBQTFGO0FBRUgsR0E3Z0RvQjtBQStnRHJCNFAsRUFBQUEseUNBL2dEcUIsdURBZ2hEckI7QUFDSSxRQUFJTCxPQUFPLEdBQUNsUix3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDSyx5QkFBbEMsR0FBOEQ0QyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGMkMsaUJBQXpHOztBQUNBLFFBQUlrSixrQkFBa0IsR0FBQzVRLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsRUFBdkI7O0FBRUEsUUFBRytOLE9BQU8sQ0FBQ25TLElBQVIsSUFBYyxJQUFqQixFQUNBO0FBQ0ksV0FBSyxJQUFJaUYsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBSzdDLGNBQUwsQ0FBb0JvQyxNQUFoRCxFQUF3RFMsS0FBSyxFQUE3RCxFQUFpRTtBQUM3RCxZQUFHa04sT0FBTyxDQUFDNVMsU0FBUixJQUFtQixLQUFLNkMsY0FBTCxDQUFvQjZDLEtBQXBCLEVBQTJCMUYsU0FBakQsRUFDQTtBQUNJLGVBQUs2QyxjQUFMLENBQW9CNkMsS0FBcEIsRUFBMkJqRixJQUEzQixJQUFpQyxJQUFqQztBQUNBaUIsVUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThENEMsV0FBOUQsR0FBNEVHLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUgsS0FBSzlELGNBQUwsQ0FBb0I2QyxLQUFwQixDQUFuSDtBQUNBO0FBQ0g7QUFDSjs7QUFFRGhFLE1BQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUFvRSxtREFBcEUsRUFBd0gsSUFBeEg7O0FBQ0F3SixNQUFBQSxrQkFBa0IsQ0FBQ0MsdUNBQW5CLENBQTJELEtBQTNEOztBQUNBLFdBQUtXLDhCQUFMLENBQW9DLElBQXBDLEVBQXlDLEtBQXpDLEVBQStDLENBQUMsQ0FBaEQsRUFBa0ROLE9BQU8sQ0FBQzVTLFNBQTFEO0FBQ0gsS0FkRCxNQWdCQTtBQUNJMEIsTUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQW9FLDZCQUFwRTtBQUNIO0FBQ0osR0F2aURvQjtBQXlpRHJCcUssRUFBQUEsOENBemlEcUIsNERBMGlEckI7QUFDSSxRQUFJYixrQkFBa0IsR0FBQzVRLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsRUFBdkI7O0FBQ0EsUUFBSStOLE9BQU8sR0FBQ2xSLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NLLHlCQUFsQyxHQUE4RDRDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYyQyxpQkFBekc7QUFDQTFILElBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUFvRSw4Q0FBcEUsRUFBbUgsSUFBbkg7O0FBQ0F3SixJQUFBQSxrQkFBa0IsQ0FBQ0MsdUNBQW5CLENBQTJELEtBQTNEOztBQUNBLFNBQUtXLDhCQUFMLENBQW9DLEtBQXBDLEVBQTBDLElBQTFDLEVBQStDMVEsZ0JBQS9DLEVBQWdFb1EsT0FBTyxDQUFDNVMsU0FBeEU7QUFDSCxHQWhqRG9CO0FBa2pEckJrVCxFQUFBQSw4QkFsakRxQiwwQ0FrakRVRSxlQWxqRFYsRUFrakQwQkMsb0JBbGpEMUIsRUFrakQrQ2xCLGNBbGpEL0MsRUFrakQ4RG1CLE9BbGpEOUQsRUFtakRyQjtBQUNJLFFBQUl4TSxLQUFLLEdBQUM7QUFBQ3lNLE1BQUFBLFdBQVcsRUFBQ0gsZUFBYjtBQUE2QkksTUFBQUEsZ0JBQWdCLEVBQUNILG9CQUE5QztBQUFtRUksTUFBQUEsYUFBYSxFQUFDdEIsY0FBakY7QUFBZ0d1QixNQUFBQSxFQUFFLEVBQUNKO0FBQW5HLEtBQVY7QUFDQTVSLElBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0N3RCwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTRFRixLQUE1RTtBQUNILEdBdGpEb0I7QUF3akRyQjZNLEVBQUFBLGdDQXhqRHFCLDRDQXdqRFk3TSxLQXhqRFosRUF5akRyQjtBQUFBOztBQUNJLFFBQUl3TCxrQkFBa0IsR0FBQzVRLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsRUFBdkI7O0FBQ0EsUUFBRyxLQUFLaEMsY0FBTCxDQUFvQixLQUFLWSxVQUF6QixFQUFxQ3pELFNBQXJDLElBQWdEMEIsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThENEMsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlgsSUFBN0YsQ0FBa0dZLE1BQXJKLEVBQ0E7QUFDSSxVQUFJME0sZUFBZSxHQUFDdE0sS0FBSyxDQUFDeU0sV0FBMUI7QUFDQSxVQUFJRixvQkFBb0IsR0FBQ3ZNLEtBQUssQ0FBQzBNLGdCQUEvQjtBQUNBLFVBQUlyQixjQUFjLEdBQUNyTCxLQUFLLENBQUMyTSxhQUF6QjtBQUNBLFVBQUlHLElBQUksR0FBQzlNLEtBQUssQ0FBQzRNLEVBQWY7O0FBRUEsVUFBR04sZUFBSCxFQUNBO0FBQ0kxUixRQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0IscUJBQWxDLEdBQTBEZ1Asc0NBQTFELENBQWlHLEtBQWpHO0FBQ0EsYUFBS2hSLGNBQUwsQ0FBb0IsS0FBS1ksVUFBekIsRUFBcUNoRCxJQUFyQyxJQUEyQyxJQUEzQztBQUNBaUIsUUFBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQW9FLDBHQUFwRSxFQUErSyxJQUEvSzs7QUFDQXdKLFFBQUFBLGtCQUFrQixDQUFDUSxvQ0FBbkIsQ0FBd0QsS0FBeEQ7O0FBQ0EsYUFBS2pHLGdCQUFMO0FBRUgsT0FSRCxNQVFNLElBQUd3RyxvQkFBSCxFQUNOO0FBQ0ksWUFBSVMsb0JBQW9CLEdBQUMsQ0FBekI7O0FBQ0EsWUFBSUMsV0FBVyxHQUFDclMsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ0sseUJBQWxDLEdBQThEYyxZQUE5RCxHQUE2RTRHLGlCQUE3RSxFQUFoQjs7QUFFQSxhQUFLLElBQUk1RixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3FPLFdBQVcsQ0FBQzlPLE1BQXhDLEVBQWdEUyxLQUFLLEVBQXJELEVBQXlEO0FBQ3JELGNBQUdrTyxJQUFJLElBQUVHLFdBQVcsQ0FBQ3JPLEtBQUQsQ0FBWCxDQUFtQmUsZ0JBQW5CLENBQW9DMkMsaUJBQXBDLENBQXNEcEosU0FBL0QsRUFDQTtBQUNJOFQsWUFBQUEsb0JBQW9CLEdBQUNwTyxLQUFyQjtBQUNBO0FBQ0g7QUFDSjs7QUFFRCxZQUFHeU0sY0FBYyxJQUFFLENBQW5CLEVBQXFCO0FBQ3JCO0FBQ0ksZ0JBQUc0QixXQUFXLENBQUNELG9CQUFELENBQVgsQ0FBa0NyTixnQkFBbEMsQ0FBbUQyQyxpQkFBbkQsQ0FBcUVwSSxrQkFBeEUsRUFDQTtBQUNJVSxjQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FDQyxzRUFERCxFQUN3RSxJQUR4RTtBQUVILGFBSkQsTUFLQTtBQUNJcEgsY0FBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQ0MsMEVBREQsRUFDNEUsSUFENUU7QUFFSDtBQUNKLFdBWEQsTUFXTSxJQUFHcUosY0FBYyxJQUFFLENBQW5CLEVBQXFCO0FBQzNCO0FBQ0ksZ0JBQUk2QixVQUFVLEdBQUMsS0FBZjs7QUFDQSxpQkFBSyxJQUFJdE8sT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUdxTyxXQUFXLENBQUNELG9CQUFELENBQVgsQ0FBa0NyTixnQkFBbEMsQ0FBbUQyQyxpQkFBbkQsQ0FBcUVqSixZQUFyRSxDQUFrRjhFLE1BQTlHLEVBQXNIUyxPQUFLLEVBQTNILEVBQStIO0FBQzNILGtCQUFHcU8sV0FBVyxDQUFDRCxvQkFBRCxDQUFYLENBQWtDck4sZ0JBQWxDLENBQW1EMkMsaUJBQW5ELENBQXFFakosWUFBckUsQ0FBa0Z1RixPQUFsRixFQUF5RnZHLFNBQTVGLEVBQ0E7QUFDSTZVLGdCQUFBQSxVQUFVLEdBQUMsSUFBWDtBQUNBO0FBQ0g7QUFDSjs7QUFFRCxnQkFBR0EsVUFBSCxFQUNBO0FBQ0l0UyxjQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FDQyw2Q0FERCxFQUMrQyxJQUQvQztBQUVILGFBSkQsTUFLQTtBQUNJcEgsY0FBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQ0MsZ0RBREQsRUFDa0QsSUFEbEQ7QUFFSDtBQUNKLFdBcEJLLE1Bb0JBLElBQUdxSixjQUFjLElBQUUsQ0FBbkIsRUFBcUI7QUFDM0I7QUFDSSxnQkFBRzRCLFdBQVcsQ0FBQ0Qsb0JBQUQsQ0FBWCxDQUFrQ3JOLGdCQUFsQyxDQUFtRDJDLGlCQUFuRCxDQUFxRXRJLFVBQXhFLEVBQ0E7QUFDSVksY0FBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQ0MsaURBQStDaUwsV0FBVyxDQUFDRCxvQkFBRCxDQUFYLENBQWtDck4sZ0JBQWxDLENBQW1EMkMsaUJBQW5ELENBQXFFckksY0FBcEgsR0FBbUksV0FEcEksRUFDZ0osSUFEaEo7QUFFSCxhQUpELE1BS0E7QUFDSVcsY0FBQUEsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NCLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQ0MsaURBREQsRUFDbUQsSUFEbkQ7QUFFSDtBQUNKLFdBWEssTUFXQSxJQUFHcUosY0FBYyxJQUFFLENBQW5CLEVBQXFCO0FBQzNCO0FBQ0ksZ0JBQUc0QixXQUFXLENBQUNELG9CQUFELENBQVgsQ0FBa0NyTixnQkFBbEMsQ0FBbUQyQyxpQkFBbkQsQ0FBcUVoSixpQkFBckUsQ0FBdUZaLFlBQTFGLEVBQ0E7QUFDSWtDLGNBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUNDLGlEQURELEVBQ21ELElBRG5EO0FBRUgsYUFKRCxNQUtBO0FBQ0lwSCxjQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FDQyxxREFERCxFQUN1RCxJQUR2RDtBQUVIO0FBQ0osV0FYSyxNQVlELElBQUdxSixjQUFjLElBQUUsQ0FBbkIsRUFBcUI7QUFDMUI7QUFDSSxnQkFBRzRCLFdBQVcsQ0FBQ0Qsb0JBQUQsQ0FBWCxDQUFrQ3JOLGdCQUFsQyxDQUFtRDJDLGlCQUFuRCxDQUFxRWhKLGlCQUFyRSxDQUF1RmIsaUJBQTFGLEVBQ0E7QUFDSW1DLGNBQUFBLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUNDLHdEQURELEVBQzBELElBRDFEO0FBRUgsYUFKRCxNQUtBO0FBQ0lwSCxjQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FDQyw0REFERCxFQUM4RCxJQUQ5RDtBQUVIO0FBQ0o7O0FBRUR6QixRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiaUwsVUFBQUEsa0JBQWtCLENBQUNRLG9DQUFuQixDQUF3RCxLQUF4RDs7QUFDQSxVQUFBLE1BQUksQ0FBQ2pHLGdCQUFMO0FBQ0gsU0FIUyxFQUdQLElBSE8sQ0FBVjtBQUlIO0FBQ0o7QUFDSixHQWhxRG9CO0FBa3FEckJvSCxFQUFBQSwwQ0FscURxQixzREFrcURzQm5OLEtBbHFEdEIsRUFtcURyQjtBQUFBOztBQUNJLFFBQUdyRixVQUFVLElBQUUsSUFBZixFQUNBO0FBQ0k0RixNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLFFBQUEsTUFBSSxDQUFDNE0sMENBQUwsQ0FBZ0RuTixLQUFoRDtBQUNILE9BRlMsRUFFUCxHQUZPLENBQVY7QUFHSCxLQUxELE1BT0E7QUFDSSxVQUFJb04sT0FBTyxHQUFDcE4sS0FBSyxDQUFDaEIsSUFBTixDQUFXcU8sVUFBdkI7QUFDQSxVQUFJaEwsUUFBUSxHQUFDckMsS0FBSyxDQUFDaEIsSUFBTixDQUFXc08sT0FBeEI7O0FBRUEsVUFBSXpPLE1BQU0sR0FBQ2pJLEVBQUUsQ0FBQ2tJLElBQUgsQ0FBUWxFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEcUQsUUFBUSxHQUFDN0csVUFBbkUsRUFBK0V5RCxpQkFBL0UsQ0FBaUdDLFFBQWpHLENBQTBHQyxDQUFsSCxFQUFvSHZFLHdCQUF3QixDQUFDNkIsUUFBekIsQ0FBa0NzQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEeEUsV0FBMUQsRUFBdUV5RSxpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHRSxDQUF0TixDQUFYOztBQUNBLFdBQUttTyx3QkFBTCxDQUE4QixLQUFLbFIsY0FBTCxDQUFvQixLQUFLTSxVQUF6QixDQUE5QixFQUFtRWtDLE1BQW5FLEVBQTBFLEdBQTFFO0FBRUFyRSxNQUFBQSxXQUFXLEdBQUM2SCxRQUFaOztBQUNBLFVBQUl4RCxNQUFNLEdBQUNqSSxFQUFFLENBQUNrSSxJQUFILENBQVFsRSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0MsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHhFLFdBQTFELEVBQXVFeUUsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0MsQ0FBMUcsRUFBNEd2RSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDc0MsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRHhFLFdBQTFELEVBQXVFeUUsaUJBQXZFLENBQXlGQyxRQUF6RixDQUFrR0UsQ0FBOU0sQ0FBWDs7QUFDQSxXQUFLbU8sd0JBQUwsQ0FBOEIsS0FBS2xSLGNBQUwsQ0FBb0IsS0FBS00sVUFBekIsQ0FBOUIsRUFBbUVrQyxNQUFuRTtBQUNIO0FBQ0osR0F0ckRvQjtBQXdyRHJCME8sRUFBQUEsd0JBQXdCLEVBQUUsa0NBQVVyUixJQUFWLEVBQWV1TSxLQUFmLEVBQXFCK0UsS0FBckIsRUFBZ0M7QUFBQSxRQUFYQSxLQUFXO0FBQVhBLE1BQUFBLEtBQVcsR0FBTCxHQUFLO0FBQUE7O0FBQ3RENVcsSUFBQUEsRUFBRSxDQUFDa1IsS0FBSCxDQUFTNUwsSUFBVCxFQUNDNkwsRUFERCxDQUNJeUYsS0FESixFQUNXO0FBQUV0TyxNQUFBQSxRQUFRLEVBQUV0SSxFQUFFLENBQUNvUixFQUFILENBQU1TLEtBQUssQ0FBQ3RKLENBQVosRUFBZXNKLEtBQUssQ0FBQ3JKLENBQXJCO0FBQVosS0FEWCxFQUNnRDtBQUFDNkksTUFBQUEsTUFBTSxFQUFDO0FBQVIsS0FEaEQsRUFFQ0MsSUFGRCxDQUVNLFlBQU0sQ0FDWCxDQUhELEVBSUNFLEtBSkQ7QUFLSCxHQTlyRG9CO0FBZ3NEckJxRixFQUFBQSwrQkFoc0RxQiw2Q0Fpc0RyQjtBQUNJalQsSUFBQUEsV0FBVyxJQUFFZ0IsVUFBYjs7QUFFQSxRQUFHLEtBQUtlLFlBQUwsSUFBbUIsQ0FBdEIsRUFDQTtBQUNJLFVBQUl5RCxLQUFLLEdBQUM7QUFBQ2hCLFFBQUFBLElBQUksRUFBQztBQUFDcU8sVUFBQUEsVUFBVSxFQUFDN1IsVUFBWjtBQUF1QjhSLFVBQUFBLE9BQU8sRUFBQzlTO0FBQS9CO0FBQU4sT0FBVjtBQUNBSSxNQUFBQSx3QkFBd0IsQ0FBQzZCLFFBQXpCLENBQWtDd0QsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxFQUExRSxFQUE2RUYsS0FBN0U7QUFDSDs7QUFFRCxRQUFJbkIsTUFBTSxHQUFDakksRUFBRSxDQUFDa0ksSUFBSCxDQUFRbEUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NDLGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER4RSxXQUExRCxFQUF1RXlFLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dDLENBQTFHLEVBQTRHdkUsd0JBQXdCLENBQUM2QixRQUF6QixDQUFrQ3NDLGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER4RSxXQUExRCxFQUF1RXlFLGlCQUF2RSxDQUF5RkMsUUFBekYsQ0FBa0dFLENBQTlNLENBQVg7O0FBQ0EsU0FBS21PLHdCQUFMLENBQThCLEtBQUtsUixjQUFMLENBQW9CLEtBQUtNLFVBQXpCLENBQTlCLEVBQW1Fa0MsTUFBbkU7QUFDQSxTQUFLa0gsZ0JBQUw7QUFDSCxHQTdzRG9CLENBZ3REckI7QUFDQTs7QUFqdERxQixDQUFULENBQWhCLEVBbXREQTs7QUFDQTJILE1BQU0sQ0FBQ0MsT0FBUCxHQUFrQjlSLFdBQWxCLEVBQ0EiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vI3JlZ2lvbiBzdXBlcmNsYXNzZXMgYW5kIGVudW1lcmF0aW9uc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bUJ1c2luZXNzVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgSG9tZUJhc2VkOiAxLCAgICAgICAgICAgICAgICAgICAvL2EgYnVzaW5lc3MgdGhhdCB5b3Ugb3BlcmF0ZSBvdXQgb2YgeW91ciBob21lXHJcbiAgICBicmlja0FuZG1vcnRhcjogMiAgICAgICAgICAgICAgIC8vYSBzdG9yZSBmcm9udCBidXNpbmVzc1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzc0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzSW5mbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiQnVzaW5lc3NJbmZvXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOYW1lOiBcIkJ1c2luZXNzRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NUeXBlOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1vZGVcIixcclxuICAgICAgIHR5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICAgICBkZWZhdWx0OiBFbnVtQnVzaW5lc3NUeXBlLk5vbmUsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiQnVzaW5lc3MgY2F0b2dvcnkgZm9yIHBsYXllcnNcIix9LCBcclxuICAgIEJ1c2luZXNzVHlwZURlc2NyaXB0aW9uOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiVHlwZSAoYnkgbmFtZSkgb2YgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgQnVzaW5lc3NOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiTmFtZSBvZiB0aGUgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgIEFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJiYWxhbmNlIG9mIGJ1c2luZXNzXCIsfSxcclxuICAgICAgSXNQYXJ0bmVyc2hpcDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc1BhcnRuZXJzaGlwXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwdzpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgZG9uZSBwYXJ0bmVyc2hpcCB3aXRoIHNvbWVvbmUgd2l0aCBjdXJyZW50IGJ1c2luZXNzXCIsfSxcclxuICAgICAgIFBhcnRuZXJJRDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGFydG5lcklEXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgdG9vbHRpcDpcIklEIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLH0sXHJcbiAgICAgICAgTG9jYXRpb25zTmFtZTpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9jYXRpb25zTmFtZVwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBbY2MuVGV4dF0sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgIHRvb2x0aXA6XCJpZiBwbGF5ZXIgb3ducyBicmljayBhbmQgbW9ydGFyIGhlL3NoZSBjYW4gZXhwYW5kIHRvIG5ldyBsb2NhdGlvblwiLH0sXHJcbiAgICAgICAgTG9hblRha2VuOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5BbW91bnRcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcblxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQ2FyZERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhRnVuY3Rpb25hbGl0eSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5XCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOZXh0VHVybkRvdWJsZVBheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJOZXh0VHVybkRvdWJsZVBheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgaXRzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXkgZGF5IG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbiAgICBTa2lwTmV4dFR1cm46XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcE5leHRUdXJuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiB0dXJuIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCB0dXJuIGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbiAgICBTa2lwTmV4dFBheWRheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwTmV4dFBheWRheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxuICAgIFNraXBITU5leHRQYXlkYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcEhNTmV4dFBheWRheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBob21lIGJhc2VkIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSxcclxuICAgIFNraXBCTU5leHRQYXlkYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcEJNTmV4dFBheWRheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBicmlja2EgYW5kIG1tb3J0YXIgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3RvY2tJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTdG9ja0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIlN0b2NrSW5mb1wiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgTmFtZTogXCJTdG9ja0RhdGFcIixcclxuICAgIEJ1c2luZXNzTmFtZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc05hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm5hbWUgb2YgdGhlIGJ1c2luZXNzIGluIHdoaWNoIHN0b2NrcyB3aWxsIGJlIGhlbGRcIix9LCBcclxuICAgIFNoYXJlQW1vdW50OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJTaGFyZUFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOiBcIlNoYXJlIGFtb3VudCBvZiB0aGUgc3RvY2tcIix9LFxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgIFBsYXllciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlBsYXllckRhdGFcIixcclxucHJvcGVydGllczogeyBcclxuICAgIFBsYXllck5hbWU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibmFtZSBvZiB0aGUgcGxheWVyXCIsfSxcclxuICAgIFBsYXllclVJRDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJVSURcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIklEIG9mIHRoZSBwbGF5ZXJcIix9LFxyXG4gICAgQXZhdGFySUQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFySURcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJpZCByZWZlcmVuY2UgZm9yIHBsYXllciBhdmF0YXIgc2VsZWN0aW9uXCIsfSxcclxuICAgIElzQm90OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIklzQm90XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwdzpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIGN1cnJlbnQgcGxheWVyIGlzIGJvdFwiLH0sIFxyXG4gICAgTm9PZkJ1c2luZXNzOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzXCIsXHJcbiAgICAgICB0eXBlOiBbQnVzaW5lc3NJbmZvXSxcclxuICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIk51bWJlciBvZiBidXNpbmVzcyBhIHBsYXllciBjYW4gb3duXCIsfSwgXHJcbiAgICBDYXJkRnVuY3Rpb25hbGl0eTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJDYXJkRnVuY3Rpb25hbGl0eVwiLFxyXG4gICAgICAgdHlwZTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiY2FyZCBmdW5jdGlvbmFsaXR5IHN0b3JlZCBieSBwbGF5ZXJcIix9LCBcclxuICAgIEhvbWVCYXNlZEFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJIb21lQmFzZWRBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm51bWJlciBvZiBob21lIGJhc2VkIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIix9LCBcclxuICAgIEJyaWNrQW5kTW9ydGFyQW1vdW50OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrQW5kTW9ydGFyQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJudW1iZXIgb2YgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBUb3RhbExvY2F0aW9uc0Ftb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbExvY2F0aW9uc0Ftb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibnVtYmVyIG9mIGxvY2F0aW9ucyBvZiBhbGwgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc2Vzc1wiLH0sIFxyXG4gICAgTm9PZlN0b2NrczpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTdG9ja3NcIixcclxuICAgICAgIHR5cGU6IFtTdG9ja0luZm9dLFxyXG4gICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiTnVtYmVyIG9mIHN0b2NrIGEgcGxheWVyIG93bnNcIix9LCBcclxuICAgIENhc2g6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBjYXNoIHBsYXllciBvd25zXCIsfSxcclxuICAgIEdvbGRDb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJHb2xkQ291bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJjb3VudCBvZiBnb2xkIGEgcGxheWVyIG93bnNcIix9LFxyXG4gICAgU3RvY2tDb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja0NvdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiY291bnQgb2Ygc3RvY2tzIGEgcGxheWVyIG93bnNcIix9LFxyXG4gICAgTG9hblRha2VuOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5UYWtlblwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHRha2VuIGxvYW4gZnJvbSBiYW5rIG9yIG5vdFwiLH0sXHJcbiAgICAgTG9hbkFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQW1vdW50IG9mIGxvYW4gdGFrZW4gZnJvbSB0aGUgYmFua1wiLH0sXHJcbiAgICBNYXJrZXRpbmdBbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nQW1vdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwibWFya2V0aW5nIGFtb3VudCBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIExhd3llclN0YXR1czpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMYXd5ZXJTdGF0dXNcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBoaXJlZCBhIGxhd3llciBvciBub3RcIix9LFxyXG4gICAgSXNCYW5rcnVwdDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc0JhbmtydXB0XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgYmVlbiBCYW5rcnVwdGVkIG9yIG5vdFwiLH0sXHJcbiAgICBCYW5rcnVwdEFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJCYW5rcnVwdEFtb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImtlZXAgdHJhY2sgaG93IG11Y2ggdGltZSBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFwiLH0sXHJcbiAgICBTa2lwcGVkTG9hblBheW1lbnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcHBlZExvYW5QYXltZW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgc2tpcHBlZCBsb2FuIHBheW1lbnRcIix9LFxyXG4gICAgUGxheWVyUm9sbENvdW50ZXI6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyUm9sbENvdW50ZXJcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHRvIHN0b3JlIHJvbGwgY291bnRvciBmb3IgcGxheWVyXCIsfSxcclxuICAgIEluaXRpYWxDb3VudGVyQXNzaWduZWQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICBpc0dhbWVGaW5pc2hlZDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiaXNHYW1lRmluaXNoZWRcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgIFRvdGFsU2NvcmU6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsU2NvcmVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICBHYW1lT3ZlcjpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiR2FtZU92ZXJcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG59LFxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG5cclxufSk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIEdhbWUgTWFuYWdlciBDbGFzc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0obWFpbiBjbGFzcykgY2xhc3MgZm9yIEdhbWUgTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUm9sbENvdW50ZXI9MDtcclxudmFyIERpY2VUZW1wPTA7XHJcbnZhciBEaWNlUm9sbD0wO1xyXG52YXIgSXNUd2VlbmluZz1mYWxzZTtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgVHVybkNoZWNrQXJyYXk9W107XHJcbnZhciBCdXNpbmVzc0xvY2F0aW9uTm9kZXM9W107XHJcblxyXG52YXIgUGFzc2VkUGF5RGF5PWZhbHNlO1xyXG52YXIgRG91YmxlUGF5RGF5PWZhbHNlO1xyXG5cclxuLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbnZhciBfbmV4dFR1cm5Eb3VibGVQYXk9ZmFsc2U7XHJcbnZhciBfc2tpcE5leHRUdXJuPWZhbHNlO1xyXG52YXIgX3NraXBOZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG52YXIgX3NraXBITU5leHRQYXlkYXk9ZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBob21lIGJhc2VkIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIF9za2lwQk1OZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgQ2FyZEV2ZW50UmVjZWl2ZWQ9ZmFsc2U7XHJcbnZhciBUdXJuSW5Qcm9ncmVzcz1mYWxzZTtcclxuXHJcbnZhciBCYWNrc3BhY2VzPTM7XHJcbnZhciBpc0dhbWVPdmVyPWZhbHNlO1xyXG52YXIgT25lUXVlc3Rpb25JbmRleD0tMTtcclxudmFyIE9uZVF1ZXN0aW9ucz1cclxuW1xyXG4gICAgXCJ5b3UgaGF2ZSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1wiLFxyXG4gICAgXCJ5b3UgaGF2ZSB0YWtlbiBhbnkgbG9hbj9cIixcclxuICAgIFwieW91IGhhdmUgYmFua3J1cHRlZCBldmVyP1wiLFxyXG4gICAgXCJ5b3VyIG5leHQgdHVybiBpcyBnb2luZyB0byBiZSBza2lwcGVkP1wiLFxyXG4gICAgXCJ5b3VyIG5leHQgcGF5ZGF5IGlzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXlkYXk/XCJcclxuXTtcclxuXHJcbnZhciBDYXJkRGlzcGxheVNldFRpbW91dD1udWxsO1xyXG5cclxudmFyIEdhbWVNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJHYW1lTWFuYWdlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIHBsYXllcidzIGRhdGFcIn0sXHJcbiAgICAgICAgQm90R2FtZUluZm86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJhbGwgYm90J3MgZGF0YVwifSxcclxuICAgICAgICBQbGF5ZXJOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBwbGF5ZXJcIix9LCAgICBcclxuICAgICAgICBDYW1lcmFOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBjYW1lcmFcIix9LCAgICBcclxuICAgICAgICBBbGxQbGF5ZXJVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBvZiB1aSBvZiBhbGwgcGxheWVyc1wiLH0sICAgICAgXHJcbiAgICAgICAgQWxsUGxheWVyTm9kZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2Ygbm9kZSBvZiBhbGwgcGxheWVycyBpbnNpZGUgZ2FtZXBsYXlcIix9LCAgIFxyXG4gICAgICAgIFN0YXJ0TG9jYXRpb25Ob2Rlczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBvZiBhdHRheSBvZiBsb2NhdGlvbnNcIix9LCAgIFxyXG4gICAgICAgICBTZWxlY3RlZE1vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDowLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiaW50ZWdlciByZWZlcmVuY2UgZm9yIGdhbWUgbW9kZSAxIG1lYW5zIGJvdCBhbmQgMiBtZWFucyByZWFsIHBsYXllcnNcIix9LCAgIFxyXG4gICAgfSxcclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBQbGF5ZXJEYXRhOiBQbGF5ZXJEYXRhLFxyXG4gICAgICAgIEJ1c2luZXNzSW5mbzpCdXNpbmVzc0luZm8sXHJcbiAgICAgICAgRW51bUJ1c2luZXNzVHlwZTpFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgICAgIEluc3RhbmNlOm51bGxcclxuICAgIH0sXHJcblxyXG4gICAgLy8jcmVnaW9uIEFsbCBGdW5jdGlvbnMgb2YgR2FtZU1hbmFnZXJcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiBjbGFzcyBpcyBjcmVhdGVkXHJcbiAgICBAbWV0aG9kIG9uTG9hZFxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIHRoaXMuVHVybk51bWJlcj0wO1xyXG4gICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD1mYWxzZTtcclxuICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRNb2RlPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICAgICAgdGhpcy5Jbml0X0dhbWVNYW5hZ2VyKCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5SYW5kb21DYXJkSW5kZXg9MDtcclxuICAgICAgICB0aGlzLkNhcmRDb3VudGVyPTA7XHJcbiAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG4gICAgICAgIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcmVmZXJlbmNlIG9mIHJlcXVpcmVkIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGluaXRpYWwgZ2FtZW1hbmFnZXIgZXNzZXRpYWxzXHJcbiAgICBAbWV0aG9kIEluaXRfR2FtZU1hbmFnZXJcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEluaXRfR2FtZU1hbmFnZXIgKCkge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhPXRoaXMuQ2FtZXJhTm9kZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKTtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz1mYWxzZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvPVtdO1xyXG4gICAgICAgIFJvbGxDb3VudGVyPTA7XHJcbiAgICAgICAgRGljZVRlbXA9MDtcclxuICAgICAgICBEaWNlUm9sbD0wOyAgXHJcblxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKSAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9pZiBqb2luZWQgcGxheWVyIGlzIHNwZWN0YXRlXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpPT10cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1cyBvZiBpbml0aWFsIGJ1c2luZXNzIHNldHA6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIikpO1xyXG4gICAgICAgICAgICAgICAgLy9pZiBpbml0YWwgc2V0dXAgaGFzIGJlZW4gZG9uZSBhbmQgZ2FtZSBpcyB1bmRlciB3YXlcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIik9PXRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgQWxsRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1BbGxEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzPXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsZmFsc2UsdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgYm90IGFsb25nIHdpdGggb25lIHBsYXllclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLGZhbHNlLHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vI3JlZ2lvbiBwdWJsaWMgZnVuY3Rpb25zIHRvIGdldCBkYXRhIChhY2Nlc3NpYmxlIGZyb20gb3RoZXIgY2xhc3NlcylcclxuICAgIEdldFR1cm5OdW1iZXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlR1cm5OdW1iZXI7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8jcmVnaW9uIFNwZWN0YXRlTW9kZSBDb2RlXHJcblxyXG4gICAgU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKClcclxuICAgIHtcclxuICAgICAgICB2YXIgQWxsRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1BbGxEYXRhO1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5DbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcblxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCxfdG9Qb3MueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInN5bmNlZCBwbGF5ZXJub2Rlc1wiKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKVxyXG4gICAge1xyXG4gICAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PVRvdGFsQ29ubmVjdGVkUGxheWVycylcclxuICAgICAge1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD10cnVlO1xyXG5cclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIGZ1bmN0aW9ucyByZWxhdGVkIHRvIFR1cm4gTWVjaGFuaXNtIGFuZCBjYXJkIG1lY2hhbmlzbVxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHdoYXQgY2FyZCBoYXMgYmVlbiBzZWxlY3RlZCBieSBwbGF5ZXJcclxuICAgIEBtZXRob2QgUmFpc2VFdmVudEZvckNhcmRcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSYWlzZUV2ZW50Rm9yQ2FyZChfZGF0YSlcclxuICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg1LF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBDbGVhckRpc3BsYXlUaW1lb3V0KClcclxuICB7XHJcbiAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gIH0sXHJcblxyXG4gIERpc3BsYXlDYXJkT25PdGhlcnMoKVxyXG4gIHtcclxuICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgICAgICAgaWYoQ2FyZEV2ZW50UmVjZWl2ZWQ9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuQ2FyZENvdW50ZXIpO1xyXG4gICAgICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD1mYWxzZTtcclxuICAgICAgICAgICAgaWYoIXRoaXMuQ2FyZERpc3BsYXllZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5DYXJkQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsdGhpcy5SYW5kb21DYXJkSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhcmREaXNwbGF5U2V0VGltb3V0PXNldFRpbWVvdXQoKCkgPT4geyAvL2NoZWNrIGFmdGVyIGV2ZXJ5IDAuNSBzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldENhcmREaXNwbGF5KClcclxuICB7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9ZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50Rm9yQ2FyZChfZGF0YSlcclxuICB7XHJcblxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuXHJcbiAgICB2YXIgUmFuZG9tQ2FyZD1fZGF0YS5yYW5kb21DYXJkO1xyXG4gICAgdmFyIGNvdW50ZXI9X2RhdGEuY291bnRlcjtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleD1SYW5kb21DYXJkO1xyXG4gICAgdGhpcy5DYXJkQ291bnRlcj1jb3VudGVyO1xyXG5cclxuICAgXHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuXHJcbiAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKHRydWUsUmFuZG9tQ2FyZCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD10cnVlO1xyXG4gICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90PT1mYWxzZSlcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKHRydWUsUmFuZG9tQ2FyZCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsUmFuZG9tQ2FyZCx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuXHJcbiAgICBcclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHBhcnRpY3VsYXIgcGxheWVyIGhhcyBjb21wbGV0ZSB0aGVpciBtb3ZlXHJcbiAgICBAbWV0aG9kIFJhaXNlRXZlbnRUdXJuQ29tcGxldGVcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSYWlzZUV2ZW50VHVybkNvbXBsZXRlKClcclxuICB7XHJcbiAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICAgIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZWFpc2VkIGZvciB0dXJuIGNvbXBsZXRlXCIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCx0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKTtcclxuICAgICAgfVxyXG4gIH0sXHJcblxyXG5cclxuICBTeW5jQWxsRGF0YSgpXHJcbiAge1xyXG4gICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgIH0gIFxyXG59LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBvbiBhbGwgcGxheWVycyB0byB2YWxpZGF0ZSBpZiBtb3ZlIGlzIGNvbXBsZXRlZCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHNcclxuICAgIEBtZXRob2QgUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlKF91aWQpXHJcbiAge1xyXG4gICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL3JlYWwgcGxheWVyc1xyXG4gICAgICB7XHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICAgICAgICAgIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7IFxyXG5cclxuICAgICAgICAgICAgdmFyIEFycmF5TGVuZ3RoPVR1cm5DaGVja0FycmF5Lmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIElERm91bmQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBcnJheUxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5W2luZGV4XT09X3VpZClcclxuICAgICAgICAgICAgICAgICAgICBJREZvdW5kPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFJREZvdW5kKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICAgICAgICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5Lmxlbmd0aD09VG90YWxDb25uZWN0ZWRQbGF5ZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgfVxyXG4gIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGRpY2UgYW5pbWF0aW9uIGlzIHBsYXllZCBvbiBhbGwgcGxheWVyc1xyXG4gICAgQG1ldGhvZCBDaGFuZ2VUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGFuZ2VUdXJuKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuVHVybk51bWJlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9dGhpcy5UdXJuTnVtYmVyKzE7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLHRoaXMuVHVybk51bWJlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIGZyb20gcmFpc2Ugb24gZXZlbnQgKGZyb20gZnVuY3Rpb24gXCJTdGFydFR1cm5cIiBhbmQgXCJDaGFuZ2VUdXJuXCIgb2YgdGhpcyBzYW1lIGNsYXNzKSB0byBoYW5kbGUgdHVyblxyXG4gICAgQG1ldGhvZCBUdXJuSGFuZGxlclxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgVHVybkhhbmRsZXIoX3R1cm4pXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlR1cm46IFwiK190dXJuKTtcclxuICAgICAgICB2YXIgX3BsYXllck1hdGNoZWQ9ZmFsc2U7XHJcbiAgICAgICAgX3NraXBOZXh0VHVybj1mYWxzZTtcclxuICAgICAgICBpZihJc1R3ZWVuaW5nKSAvL2NoZWNrIGlmIGFuaW1hdGlvbiBvZiB0dXJuIGJlaW5nIHBsYXllZCBvbiBvdGhlciBwbGF5ZXJzIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5IYW5kbGVyKF90dXJuKTtcclxuICAgICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPV90dXJuO1xyXG4gICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NraXBOZXh0VHVybj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFfc2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3Q9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NraXBOZXh0VHVybj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFfc2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UvL3R1cm4gZGVjaXNpb25zIGZvciBib3RcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BsYXllck1hdGNoZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBfc2tpcE5leHRUdXJuPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIV9za2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUm9sbERpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLHRoaXMuVHVybk51bWJlcix0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHVybiBPZjogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGxQbGF5ZXJVSVt0aGlzLlR1cm5OdW1iZXJdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5QbGF5ZXJJbmZvKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3NraXAgdGhpcyB0dXJuIGFzIHNraXAgdHVybiBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlXHJcbiAgICAgICAgICAgIGlmKF9wbGF5ZXJNYXRjaGVkICYmIF9za2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsMTIwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVNraXBOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZClcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgIHZhciBNeURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgICAgIHZhciBfY291bnRlcj1faW5kO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQhPU15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkgLy9kb250IHVwZGF0ZSBteSBvd24gZGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQ9PU1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXT1NYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9LCAgXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBhbGwgcGxheWVycyBoYXZlIGRvbmUgdGhlaXIgaW5pdGlhbCBzZXR1cCBhbmQgZmlyc3QgdHVybiBzdGFydHNcclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTdGFydFR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgICAgIHRoaXMuVHVybk51bWJlcj0wOyAvL3Jlc2V0aW5nIHRoZSB0dXJuIG51bWJlciBvbiBzdGFydCBvZiB0aGUgZ2FtZVxyXG5cclxuICAgICAgICAvL3NlbmRpbmcgaW5pdGlhbCB0dXJuIG51bWJlciBvdmVyIHRoZSBuZXR3b3JrIHRvIHN0YXJ0IHR1cm4gc2ltdWx0YW5vdXNseSBvbiBhbGwgY29ubmVjdGVkIHBsYXllcidzIGRldmljZXNcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgICAgICBcclxuICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVCYW5rcnVwdERhdGEoX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgLy9vdGhlciBwbGF5ZXIgaGFzIGJlZW4gYmFua3J1cHRlZFxyXG4gICAgICAgIHZhciBfaXNCYW5rcnVwdGVkPV9kYXRhLkRhdGEuYmFua3J1cHRlZDtcclxuICAgICAgICB2YXIgX3R1cm49X2RhdGEuRGF0YS50dXJuO1xyXG4gICAgICAgIHZhciBfcGxheWVyRGF0YT1fZGF0YS5EYXRhLlBsYXllckRhdGFNYWluO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coX2lzQmFua3J1cHRlZCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coX3R1cm4pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKF9wbGF5ZXJEYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfdHVybl09X3BsYXllckRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuRW5hYmxlUGxheWVyTm9kZXModHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLHRoaXMuVHVybk51bWJlcix0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PXRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5FbmFibGVQbGF5ZXJOb2Rlcyh0cnVlKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgIHRoaXMuVXBkYXRlR2FtZVVJKHRydWUsdGhpcy5UdXJuTnVtYmVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLHRoaXMuVHVybk51bWJlcix0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcblxyXG4gICAgICAgICAgICAvL2ZvcmNlIHN5bmMgc3BlY3RhdG9yIGFmdGVyIGNvbXBsZXRpb24gb2YgZWFjaCB0dXJuXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PXRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIEZ1bmN0aW9uIGZvciBnYW1lcGxheVxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiBwbGF5ZXIgVUkgKG5hbWUvaWNvbnMvbnVtYmVyIG9mIHBsYXllcnMgdGhhdCB0byBiZSBhY3RpdmUgZXRjKVxyXG4gICAgQG1ldGhvZCBBc3NpZ25QbGF5ZXJHYW1lVUlcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEFzc2lnblBsYXllckdhbWVVSShfaXNCYW5rcnVwdGVkPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKSAvL2ZvciBib3RcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCFfaXNCYW5rcnVwdGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3JhbmRvbUluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsdGhpcy5Cb3RHYW1lSW5mby5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvLnB1c2godGhpcy5Cb3RHYW1lSW5mb1tfcmFuZG9tSW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz0yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuUGxheWVySW5mbz10aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlNldE5hbWUodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVHYW1lVUkoX3RvZ2dsZUhpZ2hsaWdodCxfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX3RvZ2dsZUhpZ2hsaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbX2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuUGxheWVySW5mbz10aGlzLlBsYXllckdhbWVJbmZvW19pbmRleF07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihfaW5kZXg9PWluZGV4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVCR0hpZ2hsaWdodGVyKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVUZXh0aWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlQkdIaWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZVRleHRpZ2hsaWdodGVyKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGVuYmFsZSByZXNwZWN0aXZlIHBsYXllcnMgbm9kZXMgaW5zaWRlIGdhbWFwbGF5XHJcbiAgICBAbWV0aG9kIEVuYWJsZVBsYXllck5vZGVzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBFbmFibGVQbGF5ZXJOb2RlcyhfaXNCYW5rcnVwdGVkPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFfaXNCYW5rcnVwdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQ9PTEpICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ9PTEpICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSG9tZUJhc2VkQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMF0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkJyaWNrQW5kTW9ydGFyQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLnNldFBvc2l0aW9uKHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzFdLnBvc2l0aW9uLngsdGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyTm9kZXNbaW5kZXhdLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb249dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICBcclxuICAgICAgICBsZXQgcmF0aW89dGFyZ2V0UG9zLnkvY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTI7XHJcbiAgICB9LFxyXG5cclxuICAgIGxhdGVVcGRhdGUgKCkge1xyXG4gICAgICAgIGlmKHRoaXMuaXNDYW1lcmFab29taW5nKSAgICBcclxuICAgICAgICAgICAgdGhpcy5TZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN5bmNEaWNlUm9sbChfcm9sbClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2RpY2UxPV9yb2xsLmRpY2UxO1xyXG4gICAgICAgIHZhciBfZGljZTI9X3JvbGwuZGljZTI7XHJcbiAgICAgICAgdmFyIF9yZXN1bHQ9X2RpY2UxK19kaWNlMjtcclxuXHJcbiAgICAgICAgSXNUd2VlbmluZz10cnVlO1xyXG4gICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD1mYWxzZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEPT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9PTAgJiYgIXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1swXS5CdXNpbmVzc1R5cGU9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgUm9sbENvdW50ZXI9MTM7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9PTEyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcisyMTsgIFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyKzE7XHJcblxyXG4gICAgICAgICAgICBSb2xsQ291bnRlcj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXItMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBEaWNlUm9sbD1fcmVzdWx0O1xyXG4gICAgICAgIERpY2VUZW1wPTA7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbihEaWNlUm9sbCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkFsbFBsYXllclVJLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLlR1cm5OdW1iZXI9PWluZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmdldENvbXBvbmVudChcIkRpY2VDb250cm9sbGVyXCIpLkFuaW1hdGVEaWNlKF9kaWNlMSxfZGljZTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGxldCB0YXJnZXRQb3M9dGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsMTIwKSk7XHJcbiAgICAgICAgLy8gdmFyIF9wb3M9dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgICAgIC8vIHRoaXMuVHdlZW5DYW1lcmEoX3Bvcyx0cnVlLDAuNCk7ICAgXHJcbiAgICB9LFxyXG5cclxuICAgIERpY2VGdW50aW9uYWxpdHkoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0YXJnZXRQb3M9dGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyKDAsMTIwKSk7XHJcbiAgICAgICAgdmFyIF9wb3M9dGhpcy5DYW1lcmFOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xyXG4gICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX3Bvcyx0cnVlLDAuNCk7ICBcclxuICAgIH0sXHJcblxyXG4gICAgVGVtcENoZWNrU3BhY2UoX3JvbGxpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRlbXBjb3VudGVyPTA7XHJcbiAgICAgICAgdmFyIHRlbXBjb3VudGVyMj0wO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBsYXllciBtYXRjaGVkOlwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIHRlbXBjb3VudGVyMj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyUm9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgaWYodGVtcGNvdW50ZXIyLTE8MClcclxuICAgICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzdGFydGluZyBmcm9tIG9ibGl2aW9uXCIpO1xyXG4gICAgICAgIHRlbXBjb3VudGVyPXRlbXBjb3VudGVyMitfcm9sbGluZy0xO1xyXG4gICAgICAgIHZhciBkaWNldG9iZT1wYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIrZGljZXRvYmUpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIHRlbXBjb3VudGVyPXRlbXBjb3VudGVyMitfcm9sbGluZztcclxuICAgICAgICB2YXIgZGljZXRvYmU9cGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RlbXBjb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwidG8gYmU6IFwiK2RpY2V0b2JlKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgUm9sbERpY2U6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgICB2YXIgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuICAgICAgICAgdmFyIERpY2UyPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcblxyXG4gICAgICAgIC8vIHZhciBEaWNlMT0yMDtcclxuICAgICAgICAvLyB2YXIgRGljZTI9MTtcclxuXHJcbiAgICAgICAgRGljZVJvbGw9RGljZTErRGljZTI7XHJcbiAgICAgICAgdmFyIF9uZXdSb2xsPXtkaWNlMTpEaWNlMSxkaWNlMjpEaWNlMn1cclxuICAgICAgICAvL0RpY2VSb2xsPTIzO1xyXG4gICAgICAgIC8vdGhpcy5UZW1wQ2hlY2tTcGFjZShEaWNlUm9sbCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJkaWNlIG51bWJlcjogXCIrRGljZVJvbGwrXCIsIERpY2UxOlwiK0RpY2UxK1wiLCBEaWNlMjpcIitEaWNlMik7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMyxfbmV3Um9sbCk7IFxyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsT25lRGljZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgcmV0dXJuIERpY2UxO1xyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsVHdvRGljZXMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaWNlMT10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgIHZhciBEaWNlMj10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgIHJldHVybiAoRGljZTErRGljZTIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjYWxsVXBvbkNhcmQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfc3BhY2VJRD1wYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICBpZihfc3BhY2VJRCE9NiAmJiBfc3BhY2VJRCE9NykgLy82IG1lYW5zIHBheWRheSBhbmQgNyBtZWFucyBkb3VibGUgcGF5ZGF5LCA5IG1lbmFzIHNlbGwgc3BhY2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBSYW5kb21DYXJkPXRoaXMuZ2V0UmFuZG9tKDAsMTUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9mb3IgdGVzdGluZyBvbmx5XHJcbiAgICAgICAgICAgIGlmKF9zcGFjZUlEPT0yKSAvL2xhbmRlZCBvbiBzb21lIGJpZyBidXNlaW5zc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleD1bMCwxLDcsMTBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsNCk7XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihfc3BhY2VJRD09NSkgLy9sYW5kZWQgb24gc29tZSBsb3NzZXMgY2FyZHNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIHZhbHVlSW5kZXg9WzAsNSw2LDJdO1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIGluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsNCk7XHJcbiAgICAgICAgICAgICAgICAvLyBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgUmFuZG9tQ2FyZD0wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoX3NwYWNlSUQ9PTMpIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDcsMyw4LDEzLDldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsNik7XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbHNlIGlmKF9zcGFjZUlEPT0xKSAvL2xhbmRlZCBvbiBzb21lIG1hcmtldGluZyBjYXJkc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleD1bMCwxLDYsMTBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsNCk7XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGE9e1wicmFuZG9tQ2FyZFwiOlJhbmRvbUNhcmQsXCJjb3VudGVyXCI6Um9sbENvdW50ZXJ9OyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpIC8vZm9yIGJvdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGE9e1wicmFuZG9tQ2FyZFwiOlJhbmRvbUNhcmQsXCJjb3VudGVyXCI6Um9sbENvdW50ZXJ9OyAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFuZGVkIG9uIHBheSBkYXkgb3IgZG91YmxlIHBheSBkYXkgYW5kIHdvcmsgaXMgZG9uZSBzbyBjaGFuZ2luZyB0dXJuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBsZXRlQ2FyZFR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENhbGxHYW1lQ29tcGxldGUoX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9pc0JvdD09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD10aGlzLlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Nhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEhNQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEJNTG9jYXRpb25zPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FuQW1vdW50Kz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1DYXNoPShCTUFtb3VudCtCTUxvY2F0aW9ucykqMTUwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgSE1DYXNoPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoSE1BbW91bnQ9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD02MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArNjAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MylcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzI1MDAwKzYwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgVG90YWxBc3NldHM9X2Nhc2grQk1DYXNoK0hNQ2FzaC1sb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxTY29yZT1Ub3RhbEFzc2V0cztcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9dGhpcy5UdXJuTnVtYmVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9PWZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX2Nhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g7XHJcbiAgICAgICAgICAgICAgICB2YXIgSE1BbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBCTUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9dGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYW5BbW91bnQrPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1DYXNoPShCTUFtb3VudCtCTUxvY2F0aW9ucykqMTUwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgSE1DYXNoPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoSE1BbW91bnQ9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD02MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArNjAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MylcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzI1MDAwKzYwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgVG90YWxBc3NldHM9X2Nhc2grQk1DYXNoK0hNQ2FzaC1sb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxTY29yZT1Ub3RhbEFzc2V0czsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKVxyXG4gICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg2LF9kYXRhKTtcclxuICAgfSxcclxuXHJcbiAgIFN5bmNHYW1lT3ZlcihfVUlEKVxyXG4gICB7XHJcbiAgICBcclxuICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAge1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgdmFyIE15RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3Zlcj10cnVlO1xyXG5cclxuICAgICAgICBpZihNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQ9PV9VSUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIDE1MDAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IGxvc2VcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJ1bmZvcnR1bmF0ZWx5IHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCIrXCJcXG5cIisnXFxuJytcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJHYW1lIHdpbGwgYmUgcmVzdGFydGVkIGF1dG9tYXRjYWxseSBhZnRlciAxNSBzZWNvbmRzXCIsXHJcbiAgICAgICAgICAgICAgICAxNTAwMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICAgICAgICB9LCAxNTA2MCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vd2l0aCBib3RcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPXRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgdmFyIE15RGF0YT10aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9VSUQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKE15RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMF0uR2FtZU92ZXI9dHJ1ZTtcclxuXHJcbiAgICAgICAgaWYoTXlEYXRhLlBsYXllclVJRD09X1VJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IHdvblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoOiBcIitNeURhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIDE1MDAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IGxvc2VcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLlRvdGFsU2NvcmUrXCJcXG5cIisnXFxuJytcclxuICAgICAgICAgICAgICAgIFwidW5mb3J0dW5hdGVseSB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiK1wiXFxuXCIrJ1xcbicrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAgICAgMTUwMDBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgfSwgMTUwNjApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgIH0sXHJcblxyXG4gICAgU3RhcnREaWNlUm9sbDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoUm9sbENvdW50ZXI+PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVvdmVyXCIpO1xyXG4gICAgICAgICAgICBpc0dhbWVPdmVyPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGxheWVyY29tcGxldGVkPTA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJjb21wbGV0ZWQ9PXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heD0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQ9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdmFsdWUgPiBtYXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWRJbmQ9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PV92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIHdvbiBieSBwbGF5ZXIgaWQ6IFwiK1Nlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZD0wO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoTWFpblNlc3Npb25EYXRhW2luZGV4XS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHBsYXllcmNvbXBsZXRlZD09dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXg9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFNlbGVjdGVkSW5kPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBTZXNzaW9uRGF0YT10aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3ZhbHVlID4gbWF4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdGVkSW5kPWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heD1fdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIitTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtc1xyXG4gICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERpY2VUZW1wPURpY2VUZW1wKzE7IFxyXG4gICAgICAgICAgICB2YXIgX3RvUG9zPWNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5QbGF5ZXIodGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLF90b1Bvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSYW5kb206ZnVuY3Rpb24obWluLG1heClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICAgIH0sXHJcblxyXG4gICAgVHdlZW5DYW1lcmE6IGZ1bmN0aW9uIChfcG9zLCBpc1pvb20sdGltZSkgeyAgIFxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuQ2FtZXJhTm9kZSlcclxuICAgICAgICAudG8odGltZSwgeyBwb3NpdGlvbjogY2MudjIoX3Bvcy54LCBfcG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZihpc1pvb20pXHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBab29tQ2FtZXJhSW4gKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgaWYodGhpcy5DYW1lcmEuem9vbVJhdGlvPDIpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89dGhpcy5DYW1lcmEuem9vbVJhdGlvKzAuMDM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCAxMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUGF5RGF5Q29uZGl0aW9ucyhfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NilcclxuICAgICAgICAgICAgUGFzc2VkUGF5RGF5PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NylcclxuICAgICAgICAgICAgRG91YmxlUGF5RGF5PXRydWU7XHJcblxyXG4gICAgICAgIF9uZXh0VHVybkRvdWJsZVBheT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgICAgICAgaWYoUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkgJiYgIV9uZXh0VHVybkRvdWJsZVBheSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UsX2lzQm90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZigoRG91YmxlUGF5RGF5KSB8fCAoUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKHRydWUsX2lzQm90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFpvb21DYW1lcmFPdXQgKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLkNhbWVyYS56b29tUmF0aW8+PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz10aGlzLkNhbWVyYS56b29tUmF0aW8tMC4wMztcclxuICAgICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb249Y2MuVmVjMigwLDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTE7XHJcblxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbigwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIWlzR2FtZU92ZXIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vcmVhbCBwbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkgLy9ib3RcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90PT1mYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBUd2VlblBsYXllcjogZnVuY3Rpb24gKE5vZGUsVG9Qb3MpIHtcclxuICAgICAgICBjYy50d2VlbihOb2RlKVxyXG4gICAgICAgIC50bygwLjQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZihEaWNlVGVtcDxEaWNlUm9sbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCFpc0dhbWVPdmVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXk9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vZm9yIGJvdFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheT10cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihSb2xsQ291bnRlcj09MTIpXHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj1Sb2xsQ291bnRlcisyMTsgIFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj1Sb2xsQ291bnRlcisxO1xyXG5cclxuICAgICAgICAgICAgLy9EaWNlVGVtcD1EaWNlVGVtcCsxOyBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coRGljZVRlbXArXCIgXCIrUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX25ld3Bvcz1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcyxmYWxzZSwwLjYpOyAvL3pvb21vdXRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vcnVsZXMgaW1wbG1lbnRhdGlvbiBkdXJpbmcgdHVybiAodHVybiBkZWNpc2lvbnMpXHJcblxyXG4gICAgVG9nZ2xlUGF5RGF5KF9zdDEsX1N0MilcclxuICAgIHtcclxuICAgICAgICBQYXNzZWRQYXlEYXk9X3N0MTtcclxuICAgICAgICBEb3VibGVQYXlEYXk9X1N0MjtcclxuICAgIH0sXHJcblxyXG4gICAgRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKGFtb3VudCxfaW5kZXgsX2xvY2F0aW9uTmFtZSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaD49YW1vdW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2gtYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50KzE7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZXhwYW5kZWQgeW91ciBidXNpbmVzcy5cIiwxMDAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIithbW91bnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oKVxyXG4gICAge1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHBhcnNlSW50KHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NUeXBlKT09MikgLy90aGlzIG1lYW5zIHRoZXJlIGlzIGJyaWNrIGFuZCBtb3J0YXIgaW4gbGlzdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlNldEJ1c2luZXNzSW5kZXgoaSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuUmVzZXRFZGl0Qm94KCk7XHJcbiAgICAgICAgICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coQnVzaW5lc3NMb2NhdGlvbk5vZGVzKTtcclxuICAgICAgICByZXR1cm4gQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDtcclxuICAgIH0sXHJcblxyXG4gICAgRGVzdHJveUdlbmVyYXRlZE5vZGVzKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbihfbmFtZSxfU2hhcmVBbW91bnQsX2lzQWRkaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9pc0FkZGluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfc3RvY2s9bmV3IFN0b2NrSW5mbygpO1xyXG4gICAgICAgICAgICBfc3RvY2suQnVzaW5lc3NOYW1lPV9uYW1lO1xyXG4gICAgICAgICAgICBfc3RvY2suU2hhcmVBbW91bnQ9X1NoYXJlQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZTdG9ja3MucHVzaChfc3RvY2spO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oX2lzRG91YmxlUGF5RGF5PWZhbHNlLF9pc0JvdD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcE5leHRQYXlkYXk9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0UGF5ZGF5O1xyXG4gICAgICAgIF9za2lwSE1OZXh0UGF5ZGF5PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgICAgIF9za2lwQk1OZXh0UGF5ZGF5PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwQk1OZXh0UGF5ZGF5O1xyXG5cclxuICAgICAgICBpZihfc2tpcE5leHRQYXlkYXkpIC8vaWYgcHJldmlvdXNseSBza2lwIHBheWRheSB3YXMgc3RvcmVkIGJ5IGFueSBjYXJkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgaWYoIV9pc0JvdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIFBheURheS5cIiwxNjAwKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxNjUwKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyBQYXlEYXkuXCIpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF90aXRsZT1cIlwiO1xyXG5cclxuICAgICAgICAgICAgaWYoX2lzRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgX3RpdGxlPVwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIF90aXRsZT1cIlBheURheVwiO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSxfaXNEb3VibGVQYXlEYXksX3NraXBITU5leHRQYXlkYXksX3NraXBCTU5leHRQYXlkYXksX2lzQm90KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEJhbmtydXB0X1R1cm5EZWNpc2lvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQmFua3J1cHQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQmFua3J1cHRBbW91bnQrPTE7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLGZhbHNlLHRoaXMuU2VsZWN0ZWRNb2RlLHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JhbmtydXB0LHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5CYW5rcnVwdEFtb3VudCk7XHJcbiAgICB9LFxyXG5cclxuLy8jZW5kcmVnaW9uXHJcbiAgIFxyXG4gICAgLy8jcmVnaW9uIENhcmRzIFJ1bGVzXHJcbiAgICBUb2dnbGVEb3VibGVQYXlOZXh0VHVybihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk9X25leHRUdXJuRG91YmxlUGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwTmV4dFR1cm4oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm49X3NraXBOZXh0VHVybjtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBOZXh0UGF5ZGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk9X3NraXBOZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5PV9za2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcEJNTmV4dFBheWRheT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk9X3NraXBCTU5leHRQYXlkYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVR1cm5Qcm9ncmVzcyhfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgVHVybkluUHJvZ3Jlc3M9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXR1cm5UdXJuUHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBUdXJuSW5Qcm9ncmVzcztcclxuICAgIH0sXHJcblxyXG4gICAgTG9zZUFsbE1hcmtldGluZ01vbmV5KClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2xvc2VBbW91bnQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2xvc2VBbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfbG9zZUFtb3VudD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9sb3NlQW1vdW50XHJcbiAgICB9LFxyXG5cclxuICAgIE11bHRpcGx5TWFya2V0aW5nTW9uZXkoX211bHRpcGxpZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9hbW91bnRJbmNyZWFzZWQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudEluY3JlYXNlZD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50Kj1fbXVsdGlwbGllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudEluY3JlYXNlZD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9hbW91bnRJbmNyZWFzZWRcclxuICAgIH0sXHJcblxyXG4gICAgR2V0TWFya2V0aW5nTW9uZXkoX3Byb2ZpdClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2Ftb3VudD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcHJvZml0PShfcHJvZml0LzEwMCk7XHJcbiAgICAgICAgICAgIF9hbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCo9X3Byb2ZpdDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD0wO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCs9X2Ftb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2Ftb3VudD0wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF9hbW91bnRcclxuICAgIH0sXHJcblxyXG4gICAgUXVlc3Rpb25Qb3BVcF9PdGhlclVzZXJfT25lUXVlc3Rpb24oX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF91c2VySUQ9X2RhdGEuVXNlcklEO1xyXG4gICAgICAgIHZhciBfcXVlc3Rpb25JbmRleD1fZGF0YS5RdWVzdGlvbjtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PV9kYXRhLlVzZXJJbmRleDtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihfdXNlcklEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIklEIG1hdGNoZWRcIik7XHJcblxyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgT25lUXVlc3Rpb25JbmRleD1fcXVlc3Rpb25JbmRleDtcclxuICAgICAgICAgICAgdmFyIF9xdWVzdGlvbkFza2VkPU9uZVF1ZXN0aW9uc1tfcXVlc3Rpb25JbmRleC0xXTtcclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9xdWVzdGlvbkFza2VkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uKF9pc1R1cm5PdmVyPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbXlEYXRhO1xyXG4gICAgICAgIHZhciBfcm9vbURhdGE7XHJcbiAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jvb21EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgICAgICAgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9teURhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mb1swXTtcclxuICAgICAgICAgICAgX3Jvb21EYXRhPXRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9teURhdGEsX3Jvb21EYXRhLF9pc1R1cm5PdmVyLHRoaXMuU2VsZWN0ZWRNb2RlKVxyXG4gICAgXHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uRGVjaXNpb25fUGF5QW1vdW50X09uZVF1ZXN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgaWYoX215RGF0YS5DYXNoPj01MDAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihfbXlEYXRhLlBsYXllclVJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2gtPTUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0pOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBwYWlkIGNhc2ggYW1vdW50IHRvIHBsYXllci5cIiwxMjAwKTtcclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKHRydWUsZmFsc2UsLTEsX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvbl9BbnN3ZXJRdWVzdGlvbl9PbmVRdWVzdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9teURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBhbnN3ZXJlZCB0aGUgcXVlc3Rpb24uXCIsMTIwMCk7XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oZmFsc2UsdHJ1ZSxPbmVRdWVzdGlvbkluZGV4LF9teURhdGEuUGxheWVyVUlEKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9oYXNEb25lUGF5bWVudCxfaGFzQW5zd2VyZWRRdWVzdGlvbixfcXVlc3Rpb25JbmRleCxfVXNlcklEKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZGF0YT17UGF5bWVudERvbmU6X2hhc0RvbmVQYXltZW50LFF1ZXN0aW9uQW5zd2VyZWQ6X2hhc0Fuc3dlcmVkUXVlc3Rpb24sUXVlc3Rpb25JbmRleDpfcXVlc3Rpb25JbmRleCxJRDpfVXNlcklEfTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDgsX2RhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZWNlaXZlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfZGF0YSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfaGFzRG9uZVBheW1lbnQ9X2RhdGEuUGF5bWVudERvbmU7XHJcbiAgICAgICAgICAgIHZhciBfaGFzQW5zd2VyZWRRdWVzdGlvbj1fZGF0YS5RdWVzdGlvbkFuc3dlcmVkO1xyXG4gICAgICAgICAgICB2YXIgX3F1ZXN0aW9uSW5kZXg9X2RhdGEuUXVlc3Rpb25JbmRleDtcclxuICAgICAgICAgICAgdmFyIF91SUQ9X2RhdGEuSUQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihfaGFzRG9uZVBheW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaCs9NTAwMDtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJQbGF5ZXIgaGFzIHJlZnVzZWQgdG8gYW5zd2VyIHRoZSBxdWVzdGlvbiBpbnN0ZWFkIHBheWVkIHRoZSBjYXNoIGFtb3VudCwgJDUwMDAgYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKF9oYXNBbnN3ZXJlZFF1ZXN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3NlbGVjdGVkUGxheWVySW5kZXg9MDtcclxuICAgICAgICAgICAgICAgIHZhciBfYWN0b3JzRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF91SUQ9PV9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZFBsYXllckluZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoX3F1ZXN0aW9uSW5kZXg9PTEpLy9oYXZlIHlvdSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlNraXBwZWRMb2FuUGF5bWVudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHNraXBwZWQgbG9hbiBwYXllbWVudCBpbiBwcmV2aW91cyBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihfcXVlc3Rpb25JbmRleD09MikvL0hhdmUgeW91IHRha2VuIGFueSBsb2FuP1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9hblRha2VuPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9sb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSB0YWtlbiBzb21lIGxvYW5cIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIHRha2VuIGFueSBsb2FuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTMpLy9BcmUgeW91IGJhbmtydXB0ZWQ/IGlmIG1vcmUgdGhhbiBvbmNlLCB0ZWxsIG1lIHRoZSBhbW91bnQ/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuSXNCYW5rcnVwdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZCBcIitfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5CYW5rcnVwdEFtb3VudCtcIiB0aW1lL2VzLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTQpLy9JcyB5b3VyIHR1cm4gZ29pbmcgdG8gYmUgc2tpcHBlZCBuZXh0IHRpbWU/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBiZSBza2lwcGVkLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIG5vdCBiZSBza2lwcGVkLlwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTUpLy9JcyBpdCBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSB5b3VyIG5leHQgcGF5ZGF5P1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIGJlIGRvdWJsZSBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHBheWRheSB3aWxsIG5vdCBiZSBkb3VibGUgcGF5ZGF5XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjE1MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZihJc1R3ZWVuaW5nPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlY2VpdmVHb0JhY2tTcGFjZXNEYXRhX3NwYWNlRnVuY3Rpb25hbGl0eShfZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfc3BhY2VzPV9kYXRhLkRhdGEuYmFja3NwYWNlcztcclxuICAgICAgICAgICAgdmFyIF9jb3VudGVyPV9kYXRhLkRhdGEuQ291bnRlcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbX2NvdW50ZXIrQmFja3NwYWNlc10uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zLDAuMSk7XHJcblxyXG4gICAgICAgICAgICBSb2xsQ291bnRlcj1fY291bnRlcjtcclxuICAgICAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuUGxheWVyX0dvQmFja1NwYWNlczogZnVuY3Rpb24gKE5vZGUsVG9Qb3Msc3BlZWQ9MC42KSB7XHJcbiAgICAgICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgICAudG8oc3BlZWQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBHb0JhY2tTcGFjZXNfc3BhY2VGdW5jdGlvbmFsaXR5KClcclxuICAgIHtcclxuICAgICAgICBSb2xsQ291bnRlci09QmFja3NwYWNlcztcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfZGF0YT17RGF0YTp7YmFja3NwYWNlczpCYWNrc3BhY2VzLENvdW50ZXI6Um9sbENvdW50ZXJ9fTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMCxfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLlR3ZWVuUGxheWVyX0dvQmFja1NwYWNlcyh0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbn0pO1xyXG4vL21vZHVsZS5leHBvcnRzICA9IFBsYXllckRhdGE7IC8vd2hlbiBpbXBvcnRzIGluIGFub3RoZXIgc2NyaXB0IG9ubHkgcmVmZXJlbmNlIG9mIHBsYXllcmRhdGEgY2xhc3Mgd291bGQgYmUgYWJsZSB0byBhY2Nlc3NlZCBmcm9tIEdhbWVtYW5hZ2VyIGltcG9ydFxyXG5tb2R1bGUuZXhwb3J0cyAgPSBHYW1lTWFuYWdlcjtcclxuLy8jZW5kcmVnaW9uIl19