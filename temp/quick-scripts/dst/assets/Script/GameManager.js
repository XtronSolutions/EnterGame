
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
  //#endregion
  //#region Function for gameplay

  /**
  @summary called to assign player UI (name/icons/number of players that to be active etc)
  @method AssignPlayerGameUI
  @param {string} none
  @returns {boolean} no return
  **/
  AssignPlayerGameUI: function AssignPlayerGameUI() {
    if (this.SelectedMode == 1) //for bot
      {
        var _randomIndex = this.getRandom(0, this.BotGameInfo.length);

        this.PlayerGameInfo.push(this.BotGameInfo[_randomIndex]);
        GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers = 2;
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
  EnablePlayerNodes: function EnablePlayerNodes() {
    for (var index = 0; index < this.PlayerGameInfo.length; index++) {
      if (this.PlayerGameInfo[index].HomeBasedAmount == 1) this.AllPlayerNodes[index].setPosition(this.StartLocationNodes[0].position.x, this.StartLocationNodes[0].position.y);else if (this.PlayerGameInfo[index].BrickAndMortarAmount == 1) this.AllPlayerNodes[index].setPosition(this.StartLocationNodes[1].position.x, this.StartLocationNodes[1].position.y);
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
    var Dice2 = this.getRandom(1, 7); // var Dice1=1;
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
              GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Player has answered to have been bankrupted", 2100);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIkxvY2F0aW9uc05hbWUiLCJMb2FuVGFrZW4iLCJMb2FuQW1vdW50IiwiY3RvciIsIkNhcmREYXRhRnVuY3Rpb25hbGl0eSIsIk5leHRUdXJuRG91YmxlUGF5IiwiU2tpcE5leHRUdXJuIiwiU2tpcE5leHRQYXlkYXkiLCJTa2lwSE1OZXh0UGF5ZGF5IiwiU2tpcEJNTmV4dFBheWRheSIsIlN0b2NrSW5mbyIsIlNoYXJlQW1vdW50IiwiUGxheWVyRGF0YSIsIlBsYXllck5hbWUiLCJQbGF5ZXJVSUQiLCJBdmF0YXJJRCIsIklzQm90IiwiTm9PZkJ1c2luZXNzIiwiQ2FyZEZ1bmN0aW9uYWxpdHkiLCJIb21lQmFzZWRBbW91bnQiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiTm9PZlN0b2NrcyIsIkNhc2giLCJHb2xkQ291bnQiLCJTdG9ja0NvdW50IiwiTWFya2V0aW5nQW1vdW50IiwiTGF3eWVyU3RhdHVzIiwiSXNCYW5rcnVwdCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBsYXllclJvbGxDb3VudGVyIiwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZCIsImlzR2FtZUZpbmlzaGVkIiwiVG90YWxTY29yZSIsIkdhbWVPdmVyIiwiUm9sbENvdW50ZXIiLCJEaWNlVGVtcCIsIkRpY2VSb2xsIiwiSXNUd2VlbmluZyIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlR1cm5DaGVja0FycmF5IiwiQnVzaW5lc3NMb2NhdGlvbk5vZGVzIiwiUGFzc2VkUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiX25leHRUdXJuRG91YmxlUGF5IiwiX3NraXBOZXh0VHVybiIsIl9za2lwTmV4dFBheWRheSIsIl9za2lwSE1OZXh0UGF5ZGF5IiwiX3NraXBCTU5leHRQYXlkYXkiLCJDYXJkRXZlbnRSZWNlaXZlZCIsIlR1cm5JblByb2dyZXNzIiwiaXNHYW1lT3ZlciIsIk9uZVF1ZXN0aW9uSW5kZXgiLCJPbmVRdWVzdGlvbnMiLCJDYXJkRGlzcGxheVNldFRpbW91dCIsIkdhbWVNYW5hZ2VyIiwiQ29tcG9uZW50IiwiUGxheWVyR2FtZUluZm8iLCJCb3RHYW1lSW5mbyIsIlBsYXllck5vZGUiLCJOb2RlIiwiQ2FtZXJhTm9kZSIsIkFsbFBsYXllclVJIiwiQWxsUGxheWVyTm9kZXMiLCJTdGFydExvY2F0aW9uTm9kZXMiLCJTZWxlY3RlZE1vZGUiLCJzdGF0aWNzIiwiSW5zdGFuY2UiLCJvbkxvYWQiLCJUdXJuTnVtYmVyIiwiVHVybkNvbXBsZXRlZCIsIkNoZWNrUmVmZXJlbmNlcyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJHZXRTZWxlY3RlZE1vZGUiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsImNvbnNvbGUiLCJlcnJvciIsIkNoZWNrU3BlY3RhdGUiLCJsb2ciLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJnZXRDdXN0b21Qcm9wZXJ0eSIsIkdldF9HYW1lcGxheVVJTWFuYWdlciIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIkFsbERhdGEiLCJNYXhQbGF5ZXJzIiwibGVuZ3RoIiwiU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyIiwiVXBkYXRlR2FtZVVJIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJTdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAiLCJHZXRUdXJuTnVtYmVyIiwiU3luY0RhdGFUb1BsYXllckdhbWVJbmZvIiwiQXNzaWduUGxheWVyR2FtZVVJIiwiQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsImluZGV4IiwiX3RvUG9zIiwiVmVjMiIsIkdldF9TcGFjZU1hbmFnZXIiLCJEYXRhIiwiUmVmZXJlbmNlTG9jYXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5Iiwic2V0UG9zaXRpb24iLCJhY3RpdmUiLCJDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyIiwiVG90YWxDb25uZWN0ZWRQbGF5ZXJzIiwibXlSb29tQWN0b3JDb3VudCIsIlBob3RvbkFjdG9yIiwiY3VzdG9tUHJvcGVydGllcyIsInVzZXJJRCIsInNldEN1c3RvbVByb3BlcnR5IiwiQ2hhbmdlVHVybiIsIlJhaXNlRXZlbnRGb3JDYXJkIiwiX2RhdGEiLCJHZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlciIsIlJhaXNlRXZlbnQiLCJDbGVhckRpc3BsYXlUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiRGlzcGxheUNhcmRPbk90aGVycyIsIk9uTGFuZGVkT25TcGFjZSIsInNldFRpbWVvdXQiLCJSZXNldENhcmREaXNwbGF5IiwiUmVjZWl2ZUV2ZW50Rm9yQ2FyZCIsIlJhbmRvbUNhcmQiLCJyYW5kb21DYXJkIiwiY291bnRlciIsIlJhaXNlRXZlbnRUdXJuQ29tcGxldGUiLCJSb29tRXNzZW50aWFscyIsIklzU3BlY3RhdGUiLCJTeW5jQWxsRGF0YSIsIlJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZSIsIl91aWQiLCJwdXNoIiwiQXJyYXlMZW5ndGgiLCJJREZvdW5kIiwiVHVybkhhbmRsZXIiLCJfdHVybiIsIl9wbGF5ZXJNYXRjaGVkIiwiVG9nZ2xlVHVyblByb2dyZXNzIiwiVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uIiwiUmVzZXRUdXJuVmFyaWFibGUiLCJSb2xsRGljZSIsIkRpY2VSb2xsU2NyZWVuIiwiUGxheWVySW5mbyIsIlJvb21BY3RvcnMiLCJTaG93VG9hc3QiLCJUb2dnbGVTa2lwTmV4dFR1cm4iLCJfaW5kIiwiTWFpblNlc3Npb25EYXRhIiwiTXlEYXRhIiwiX2NvdW50ZXIiLCJQbGF5ZXJTZXNzaW9uRGF0YSIsIlN0YXJ0VHVybiIsIkVuYWJsZVBsYXllck5vZGVzIiwiX3JhbmRvbUluZGV4IiwiZ2V0UmFuZG9tIiwiU2V0TmFtZSIsIl90b2dnbGVIaWdobGlnaHQiLCJfaW5kZXgiLCJUb2dnbGVCR0hpZ2hsaWdodGVyIiwiVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIiLCJTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzIiwidGFyZ2V0UG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicGFyZW50IiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJyYXRpbyIsIndpblNpemUiLCJoZWlnaHQiLCJ6b29tUmF0aW8iLCJsYXRlVXBkYXRlIiwic3luY0RpY2VSb2xsIiwiX3JvbGwiLCJfZGljZTEiLCJkaWNlMSIsIl9kaWNlMiIsImRpY2UyIiwiX3Jlc3VsdCIsIm15Um9vbUFjdG9yc0FycmF5IiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwiQW5pbWF0ZURpY2UiLCJEaWNlRnVudGlvbmFsaXR5IiwiX3BvcyIsIlR3ZWVuQ2FtZXJhIiwiVGVtcENoZWNrU3BhY2UiLCJfcm9sbGluZyIsInRlbXBjb3VudGVyIiwidGVtcGNvdW50ZXIyIiwiZGljZXRvYmUiLCJwYXJzZUludCIsIlNwYWNlRGF0YSIsIlNwYWNlc1R5cGUiLCJEaWNlMSIsIkRpY2UyIiwiX25ld1JvbGwiLCJSb2xsT25lRGljZSIsIlJvbGxUd29EaWNlcyIsImNhbGxVcG9uQ2FyZCIsIl9zcGFjZUlEIiwidmFsdWVJbmRleCIsIlNlbmRpbmdEYXRhIiwiY29tcGxldGVDYXJkVHVybiIsIkNhbGxHYW1lQ29tcGxldGUiLCJfaXNCb3QiLCJfcGxheWVySW5kZXgiLCJfY2FzaCIsIkhNQW1vdW50IiwiR2V0X0dhbWVNYW5hZ2VyIiwiQk1BbW91bnQiLCJCTUxvY2F0aW9ucyIsImxvYW5BbW91bnQiLCJCTUNhc2giLCJITUNhc2giLCJUb3RhbEFzc2V0cyIsIlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUiLCJTeW5jR2FtZU92ZXIiLCJfVUlEIiwiUmVzdGFydEdhbWUiLCJTdGFydERpY2VSb2xsIiwiWm9vbUNhbWVyYU91dCIsInBsYXllcmNvbXBsZXRlZCIsIm1heCIsIlNlbGVjdGVkSW5kIiwiU2Vzc2lvbkRhdGEiLCJfdmFsdWUiLCJUd2VlblBsYXllciIsIm1pbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImlzWm9vbSIsInRpbWUiLCJ0d2VlbiIsInRvIiwidjIiLCJlYXNpbmciLCJjYWxsIiwiWm9vbUNhbWVyYUluIiwic3RhcnQiLCJDaGVja1BheURheUNvbmRpdGlvbnMiLCJUb2dnbGVEb3VibGVQYXlOZXh0VHVybiIsIlRvZ2dsZVBheURheSIsIlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uIiwiVG9Qb3MiLCJfbmV3cG9zIiwiX3N0MSIsIl9TdDIiLCJFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24iLCJhbW91bnQiLCJfbG9jYXRpb25OYW1lIiwiT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24iLCJHZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudCIsIlNldEJ1c2luZXNzSW5kZXgiLCJSZXNldEVkaXRCb3giLCJEZXN0cm95R2VuZXJhdGVkTm9kZXMiLCJkZXN0cm95IiwiVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiX1NoYXJlQW1vdW50IiwiX2lzQWRkaW5nIiwiX3N0b2NrIiwiX2lzRG91YmxlUGF5RGF5IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIl90aXRsZSIsIkFzc2lnbkRhdGFfUGF5RGF5IiwiX3N0YXRlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiUmV0dXJuVHVyblByb2dyZXNzIiwiTG9zZUFsbE1hcmtldGluZ01vbmV5IiwiX2xvc2VBbW91bnQiLCJNdWx0aXBseU1hcmtldGluZ01vbmV5IiwiX211bHRpcGxpZXIiLCJfYW1vdW50SW5jcmVhc2VkIiwiR2V0TWFya2V0aW5nTW9uZXkiLCJfcHJvZml0IiwiX2Ftb3VudCIsIlF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uIiwiX3VzZXJJRCIsIlVzZXJJRCIsIl9xdWVzdGlvbkluZGV4IiwiUXVlc3Rpb24iLCJVc2VySW5kZXgiLCJfZ2FtZXBsYXlVSU1hbmFnZXIiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfcXVlc3Rpb25Bc2tlZCIsIlNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24iLCJfaXNUdXJuT3ZlciIsIl9teURhdGEiLCJfcm9vbURhdGEiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9QYXlBbW91bnRfT25lUXVlc3Rpb24iLCJSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJPbmVRdWVzdGlvbkRlY2lzaW9uX0Fuc3dlclF1ZXN0aW9uX09uZVF1ZXN0aW9uIiwiX2hhc0RvbmVQYXltZW50IiwiX2hhc0Fuc3dlcmVkUXVlc3Rpb24iLCJfVXNlcklEIiwiUGF5bWVudERvbmUiLCJRdWVzdGlvbkFuc3dlcmVkIiwiUXVlc3Rpb25JbmRleCIsIklEIiwiUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24iLCJfdUlEIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfc2VsZWN0ZWRQbGF5ZXJJbmRleCIsIl9hY3RvcnNEYXRhIiwiX2xvYW5UYWtlbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBLElBQUlBLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUMzQkMsRUFBQUEsSUFBSSxFQUFDLENBRHNCO0FBRTNCQyxFQUFBQSxTQUFTLEVBQUUsQ0FGZ0I7QUFFSztBQUNoQ0MsRUFBQUEsY0FBYyxFQUFFLENBSFcsQ0FHSzs7QUFITCxDQUFSLENBQXZCLEVBTUE7O0FBQ0EsSUFBSUMsWUFBWSxHQUFHTCxFQUFFLENBQUNNLEtBQUgsQ0FBUztBQUN4QkMsRUFBQUEsSUFBSSxFQUFFLGNBRGtCO0FBRTVCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFFLGNBREU7QUFFUkMsSUFBQUEsWUFBWSxFQUNiO0FBQ0lDLE1BQUFBLFdBQVcsRUFBQyxNQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUViLGdCQUZWO0FBR0ksaUJBQVNBLGdCQUFnQixDQUFDRyxJQUg5QjtBQUlJVyxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0FIUztBQVNSQyxJQUFBQSx1QkFBdUIsRUFDeEI7QUFDSUosTUFBQUEsV0FBVyxFQUFFLE1BRGpCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGYjtBQUdJLGlCQUFTLEVBSGI7QUFJSUgsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9B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cUI7QUFDMUI7QUFDSSxnQkFBRzRCLFdBQVcsQ0FBQ0Qsb0JBQUQsQ0FBWCxDQUFrQzdNLGdCQUFsQyxDQUFtRDJDLGlCQUFuRCxDQUFxRTlJLGlCQUFyRSxDQUF1RmIsaUJBQTFGLEVBQ0E7QUFDSWtDLGNBQUFBLHdCQUF3QixDQUFDNEIsUUFBekIsQ0FBa0NzQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUNDLHdEQURELEVBQzBELElBRDFEO0FBRUgsYUFKRCxNQUtBO0FBQ0luSCxjQUFBQSx3QkFBd0IsQ0FBQzRCLFFBQXpCLENBQWtDc0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FDQyw0REFERCxFQUM4RCxJQUQ5RDtBQUVIO0FBQ0o7O0FBRUR6QixRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNieUssVUFBQUEsa0JBQWtCLENBQUNRLG9DQUFuQixDQUF3RCxLQUF4RDs7QUFDQSxVQUFBLE1BQUksQ0FBQ2hHLGdCQUFMO0FBQ0gsU0FIUyxFQUdQLElBSE8sQ0FBVjtBQUlIO0FBQ0o7QUFDSixHQS9rRG9CLENBa2xEckI7QUFDQTs7QUFubERxQixDQUFULENBQWhCLEVBcWxEQTs7QUFDQW1ILE1BQU0sQ0FBQ0MsT0FBUCxHQUFrQi9RLFdBQWxCLEVBQ0EiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vI3JlZ2lvbiBzdXBlcmNsYXNzZXMgYW5kIGVudW1lcmF0aW9uc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bUJ1c2luZXNzVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgSG9tZUJhc2VkOiAxLCAgICAgICAgICAgICAgICAgICAvL2EgYnVzaW5lc3MgdGhhdCB5b3Ugb3BlcmF0ZSBvdXQgb2YgeW91ciBob21lXHJcbiAgICBicmlja0FuZG1vcnRhcjogMiAgICAgICAgICAgICAgIC8vYSBzdG9yZSBmcm9udCBidXNpbmVzc1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzc0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzSW5mbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiQnVzaW5lc3NJbmZvXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOYW1lOiBcIkJ1c2luZXNzRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NUeXBlOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1vZGVcIixcclxuICAgICAgIHR5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICAgICBkZWZhdWx0OiBFbnVtQnVzaW5lc3NUeXBlLk5vbmUsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiQnVzaW5lc3MgY2F0b2dvcnkgZm9yIHBsYXllcnNcIix9LCBcclxuICAgIEJ1c2luZXNzVHlwZURlc2NyaXB0aW9uOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiVHlwZSAoYnkgbmFtZSkgb2YgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgQnVzaW5lc3NOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiTmFtZSBvZiB0aGUgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgIEFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJiYWxhbmNlIG9mIGJ1c2luZXNzXCIsfSxcclxuICAgICAgSXNQYXJ0bmVyc2hpcDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc1BhcnRuZXJzaGlwXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwdzpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgZG9uZSBwYXJ0bmVyc2hpcCB3aXRoIHNvbWVvbmUgd2l0aCBjdXJyZW50IGJ1c2luZXNzXCIsfSxcclxuICAgICAgIFBhcnRuZXJJRDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGFydG5lcklEXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgdG9vbHRpcDpcIklEIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLH0sXHJcbiAgICAgICAgTG9jYXRpb25zTmFtZTpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9jYXRpb25zTmFtZVwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBbY2MuVGV4dF0sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgIHRvb2x0aXA6XCJpZiBwbGF5ZXIgb3ducyBicmljayBhbmQgbW9ydGFyIGhlL3NoZSBjYW4gZXhwYW5kIHRvIG5ldyBsb2NhdGlvblwiLH0sXHJcbiAgICAgICAgTG9hblRha2VuOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5BbW91bnRcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcblxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQ2FyZERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhRnVuY3Rpb25hbGl0eSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5XCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOZXh0VHVybkRvdWJsZVBheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJOZXh0VHVybkRvdWJsZVBheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgaXRzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXkgZGF5IG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbiAgICBTa2lwTmV4dFR1cm46XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcE5leHRUdXJuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiB0dXJuIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCB0dXJuIGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbiAgICBTa2lwTmV4dFBheWRheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwTmV4dFBheWRheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxuICAgIFNraXBITU5leHRQYXlkYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcEhNTmV4dFBheWRheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBob21lIGJhc2VkIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSxcclxuICAgIFNraXBCTU5leHRQYXlkYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcEJNTmV4dFBheWRheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBicmlja2EgYW5kIG1tb3J0YXIgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3RvY2tJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTdG9ja0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIlN0b2NrSW5mb1wiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgTmFtZTogXCJTdG9ja0RhdGFcIixcclxuICAgIEJ1c2luZXNzTmFtZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc05hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm5hbWUgb2YgdGhlIGJ1c2luZXNzIGluIHdoaWNoIHN0b2NrcyB3aWxsIGJlIGhlbGRcIix9LCBcclxuICAgIFNoYXJlQW1vdW50OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJTaGFyZUFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOiBcIlNoYXJlIGFtb3VudCBvZiB0aGUgc3RvY2tcIix9LFxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgIFBsYXllciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlBsYXllckRhdGFcIixcclxucHJvcGVydGllczogeyBcclxuICAgIFBsYXllck5hbWU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibmFtZSBvZiB0aGUgcGxheWVyXCIsfSxcclxuICAgIFBsYXllclVJRDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJVSURcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIklEIG9mIHRoZSBwbGF5ZXJcIix9LFxyXG4gICAgQXZhdGFySUQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFySURcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJpZCByZWZlcmVuY2UgZm9yIHBsYXllciBhdmF0YXIgc2VsZWN0aW9uXCIsfSxcclxuICAgIElzQm90OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIklzQm90XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwdzpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIGN1cnJlbnQgcGxheWVyIGlzIGJvdFwiLH0sIFxyXG4gICAgTm9PZkJ1c2luZXNzOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzXCIsXHJcbiAgICAgICB0eXBlOiBbQnVzaW5lc3NJbmZvXSxcclxuICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIk51bWJlciBvZiBidXNpbmVzcyBhIHBsYXllciBjYW4gb3duXCIsfSwgXHJcbiAgICBDYXJkRnVuY3Rpb25hbGl0eTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJDYXJkRnVuY3Rpb25hbGl0eVwiLFxyXG4gICAgICAgdHlwZTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiY2FyZCBmdW5jdGlvbmFsaXR5IHN0b3JlZCBieSBwbGF5ZXJcIix9LCBcclxuICAgIEhvbWVCYXNlZEFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJIb21lQmFzZWRBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm51bWJlciBvZiBob21lIGJhc2VkIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIix9LCBcclxuICAgIEJyaWNrQW5kTW9ydGFyQW1vdW50OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrQW5kTW9ydGFyQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJudW1iZXIgb2YgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBUb3RhbExvY2F0aW9uc0Ftb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbExvY2F0aW9uc0Ftb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibnVtYmVyIG9mIGxvY2F0aW9ucyBvZiBhbGwgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc2Vzc1wiLH0sIFxyXG4gICAgTm9PZlN0b2NrczpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTdG9ja3NcIixcclxuICAgICAgIHR5cGU6IFtTdG9ja0luZm9dLFxyXG4gICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiTnVtYmVyIG9mIHN0b2NrIGEgcGxheWVyIG93bnNcIix9LCBcclxuICAgIENhc2g6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBjYXNoIHBsYXllciBvd25zXCIsfSxcclxuICAgIEdvbGRDb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJHb2xkQ291bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJjb3VudCBvZiBnb2xkIGEgcGxheWVyIG93bnNcIix9LFxyXG4gICAgU3RvY2tDb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja0NvdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiY291bnQgb2Ygc3RvY2tzIGEgcGxheWVyIG93bnNcIix9LFxyXG4gICAgTG9hblRha2VuOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5UYWtlblwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHRha2VuIGxvYW4gZnJvbSBiYW5rIG9yIG5vdFwiLH0sXHJcbiAgICAgTG9hbkFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQW1vdW50IG9mIGxvYW4gdGFrZW4gZnJvbSB0aGUgYmFua1wiLH0sXHJcbiAgICBNYXJrZXRpbmdBbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nQW1vdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwibWFya2V0aW5nIGFtb3VudCBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIExhd3llclN0YXR1czpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMYXd5ZXJTdGF0dXNcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBoaXJlZCBhIGxhd3llciBvciBub3RcIix9LFxyXG4gICAgSXNCYW5rcnVwdDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc0JhbmtydXB0XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgYmVlbiBCYW5rcnVwdGVkIG9yIG5vdFwiLH0sXHJcbiAgICBTa2lwcGVkTG9hblBheW1lbnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcHBlZExvYW5QYXltZW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgc2tpcHBlZCBsb2FuIHBheW1lbnRcIix9LFxyXG4gICAgUGxheWVyUm9sbENvdW50ZXI6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyUm9sbENvdW50ZXJcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHRvIHN0b3JlIHJvbGwgY291bnRvciBmb3IgcGxheWVyXCIsfSxcclxuICAgIEluaXRpYWxDb3VudGVyQXNzaWduZWQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICBpc0dhbWVGaW5pc2hlZDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiaXNHYW1lRmluaXNoZWRcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgIFRvdGFsU2NvcmU6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsU2NvcmVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICBHYW1lT3ZlcjpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiR2FtZU92ZXJcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG59LFxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG5cclxufSk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIEdhbWUgTWFuYWdlciBDbGFzc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0obWFpbiBjbGFzcykgY2xhc3MgZm9yIEdhbWUgTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUm9sbENvdW50ZXI9MDtcclxudmFyIERpY2VUZW1wPTA7XHJcbnZhciBEaWNlUm9sbD0wO1xyXG52YXIgSXNUd2VlbmluZz1mYWxzZTtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgVHVybkNoZWNrQXJyYXk9W107XHJcbnZhciBCdXNpbmVzc0xvY2F0aW9uTm9kZXM9W107XHJcblxyXG52YXIgUGFzc2VkUGF5RGF5PWZhbHNlO1xyXG52YXIgRG91YmxlUGF5RGF5PWZhbHNlO1xyXG5cclxuLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbnZhciBfbmV4dFR1cm5Eb3VibGVQYXk9ZmFsc2U7XHJcbnZhciBfc2tpcE5leHRUdXJuPWZhbHNlO1xyXG52YXIgX3NraXBOZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG52YXIgX3NraXBITU5leHRQYXlkYXk9ZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBob21lIGJhc2VkIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIF9za2lwQk1OZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgQ2FyZEV2ZW50UmVjZWl2ZWQ9ZmFsc2U7XHJcbnZhciBUdXJuSW5Qcm9ncmVzcz1mYWxzZTtcclxuXHJcbnZhciBpc0dhbWVPdmVyPWZhbHNlO1xyXG52YXIgT25lUXVlc3Rpb25JbmRleD0tMTtcclxudmFyIE9uZVF1ZXN0aW9ucz1cclxuW1xyXG4gICAgXCJ5b3UgaGF2ZSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1wiLFxyXG4gICAgXCJ5b3UgaGF2ZSB0YWtlbiBhbnkgbG9hbj9cIixcclxuICAgIFwieW91IGhhdmUgYmFua3J1cHRlZCBldmVyP1wiLFxyXG4gICAgXCJ5b3VyIG5leHQgdHVybiBpcyBnb2luZyB0byBiZSBza2lwcGVkP1wiLFxyXG4gICAgXCJ5b3VyIG5leHQgcGF5ZGF5IGlzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXlkYXk/XCJcclxuXTtcclxuXHJcbnZhciBDYXJkRGlzcGxheVNldFRpbW91dD1udWxsO1xyXG5cclxudmFyIEdhbWVNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJHYW1lTWFuYWdlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIHBsYXllcidzIGRhdGFcIn0sXHJcbiAgICAgICAgQm90R2FtZUluZm86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbUGxheWVyRGF0YV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogXCJhbGwgYm90J3MgZGF0YVwifSxcclxuICAgICAgICBQbGF5ZXJOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBwbGF5ZXJcIix9LCAgICBcclxuICAgICAgICBDYW1lcmFOb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBjYW1lcmFcIix9LCAgICBcclxuICAgICAgICBBbGxQbGF5ZXJVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBvZiB1aSBvZiBhbGwgcGxheWVyc1wiLH0sICAgICAgXHJcbiAgICAgICAgQWxsUGxheWVyTm9kZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2Ygbm9kZSBvZiBhbGwgcGxheWVycyBpbnNpZGUgZ2FtZXBsYXlcIix9LCAgIFxyXG4gICAgICAgIFN0YXJ0TG9jYXRpb25Ob2Rlczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBvZiBhdHRheSBvZiBsb2NhdGlvbnNcIix9LCAgIFxyXG4gICAgICAgICBTZWxlY3RlZE1vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDowLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiaW50ZWdlciByZWZlcmVuY2UgZm9yIGdhbWUgbW9kZSAxIG1lYW5zIGJvdCBhbmQgMiBtZWFucyByZWFsIHBsYXllcnNcIix9LCAgIFxyXG4gICAgfSxcclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBQbGF5ZXJEYXRhOiBQbGF5ZXJEYXRhLFxyXG4gICAgICAgIEJ1c2luZXNzSW5mbzpCdXNpbmVzc0luZm8sXHJcbiAgICAgICAgRW51bUJ1c2luZXNzVHlwZTpFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgICAgIEluc3RhbmNlOm51bGxcclxuICAgIH0sXHJcblxyXG4gICAgLy8jcmVnaW9uIEFsbCBGdW5jdGlvbnMgb2YgR2FtZU1hbmFnZXJcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBpbnN0YW5jZSBvZiBjbGFzcyBpcyBjcmVhdGVkXHJcbiAgICBAbWV0aG9kIG9uTG9hZFxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5JbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIHRoaXMuVHVybk51bWJlcj0wO1xyXG4gICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD1mYWxzZTtcclxuICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWRNb2RlPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcbiAgICAgICAgdGhpcy5Jbml0X0dhbWVNYW5hZ2VyKCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5SYW5kb21DYXJkSW5kZXg9MDtcclxuICAgICAgICB0aGlzLkNhcmRDb3VudGVyPTA7XHJcbiAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG4gICAgICAgIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcmVmZXJlbmNlIG9mIHJlcXVpcmVkIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGluaXRpYWwgZ2FtZW1hbmFnZXIgZXNzZXRpYWxzXHJcbiAgICBAbWV0aG9kIEluaXRfR2FtZU1hbmFnZXJcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEluaXRfR2FtZU1hbmFnZXIgKCkge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhPXRoaXMuQ2FtZXJhTm9kZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKTtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz1mYWxzZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvPVtdO1xyXG4gICAgICAgIFJvbGxDb3VudGVyPTA7XHJcbiAgICAgICAgRGljZVRlbXA9MDtcclxuICAgICAgICBEaWNlUm9sbD0wOyAgXHJcblxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKSAvL2dhbWUgaXMgYmVpbmcgcGxheWVkIGJ5IHJlYWwgcGxheWVyc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9pZiBqb2luZWQgcGxheWVyIGlzIHNwZWN0YXRlXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpPT10cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1cyBvZiBpbml0aWFsIGJ1c2luZXNzIHNldHA6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIikpO1xyXG4gICAgICAgICAgICAgICAgLy9pZiBpbml0YWwgc2V0dXAgaGFzIGJlZW4gZG9uZSBhbmQgZ2FtZSBpcyB1bmRlciB3YXlcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIik9PXRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgQWxsRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1BbGxEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzPXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Ub2dnbGVMZWF2ZVJvb21CdXR0b25fU3BlY3RhdGVNb2RlVUkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKHRydWUsZmFsc2UsdGhpcy5TZWxlY3RlZE1vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpIC8vZ2FtZSBpcyBiZWluZyBwbGF5ZWQgYnkgYm90IGFsb25nIHdpdGggb25lIHBsYXllclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlLGZhbHNlLHRoaXMuU2VsZWN0ZWRNb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vI3JlZ2lvbiBwdWJsaWMgZnVuY3Rpb25zIHRvIGdldCBkYXRhIChhY2Nlc3NpYmxlIGZyb20gb3RoZXIgY2xhc3NlcylcclxuICAgIEdldFR1cm5OdW1iZXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlR1cm5OdW1iZXI7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8jcmVnaW9uIFNwZWN0YXRlTW9kZSBDb2RlXHJcblxyXG4gICAgU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKClcclxuICAgIHtcclxuICAgICAgICB2YXIgQWxsRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIik7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1BbGxEYXRhO1xyXG4gICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5DbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcblxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCxfdG9Qb3MueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInN5bmNlZCBwbGF5ZXJub2Rlc1wiKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKVxyXG4gICAge1xyXG4gICAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PVRvdGFsQ29ubmVjdGVkUGxheWVycylcclxuICAgICAge1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD10cnVlO1xyXG5cclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIGZ1bmN0aW9ucyByZWxhdGVkIHRvIFR1cm4gTWVjaGFuaXNtIGFuZCBjYXJkIG1lY2hhbmlzbVxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHdoYXQgY2FyZCBoYXMgYmVlbiBzZWxlY3RlZCBieSBwbGF5ZXJcclxuICAgIEBtZXRob2QgUmFpc2VFdmVudEZvckNhcmRcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSYWlzZUV2ZW50Rm9yQ2FyZChfZGF0YSlcclxuICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg1LF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBDbGVhckRpc3BsYXlUaW1lb3V0KClcclxuICB7XHJcbiAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gIH0sXHJcblxyXG4gIERpc3BsYXlDYXJkT25PdGhlcnMoKVxyXG4gIHtcclxuICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgICAgICAgaWYoQ2FyZEV2ZW50UmVjZWl2ZWQ9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoQ2FyZERpc3BsYXlTZXRUaW1vdXQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuQ2FyZENvdW50ZXIpO1xyXG4gICAgICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD1mYWxzZTtcclxuICAgICAgICAgICAgaWYoIXRoaXMuQ2FyZERpc3BsYXllZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5DYXJkQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsdGhpcy5SYW5kb21DYXJkSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhcmREaXNwbGF5U2V0VGltb3V0PXNldFRpbWVvdXQoKCkgPT4geyAvL2NoZWNrIGFmdGVyIGV2ZXJ5IDAuNSBzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldENhcmREaXNwbGF5KClcclxuICB7XHJcbiAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9ZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50Rm9yQ2FyZChfZGF0YSlcclxuICB7XHJcblxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIGNvbnNvbGUubG9nKF9kYXRhKTtcclxuXHJcbiAgICB2YXIgUmFuZG9tQ2FyZD1fZGF0YS5yYW5kb21DYXJkO1xyXG4gICAgdmFyIGNvdW50ZXI9X2RhdGEuY291bnRlcjtcclxuXHJcbiAgICB0aGlzLlJhbmRvbUNhcmRJbmRleD1SYW5kb21DYXJkO1xyXG4gICAgdGhpcy5DYXJkQ291bnRlcj1jb3VudGVyO1xyXG5cclxuICAgXHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuXHJcbiAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKHRydWUsUmFuZG9tQ2FyZCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD10cnVlO1xyXG4gICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90PT1mYWxzZSlcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKHRydWUsUmFuZG9tQ2FyZCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsUmFuZG9tQ2FyZCx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuXHJcbiAgICBcclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHBhcnRpY3VsYXIgcGxheWVyIGhhcyBjb21wbGV0ZSB0aGVpciBtb3ZlXHJcbiAgICBAbWV0aG9kIFJhaXNlRXZlbnRUdXJuQ29tcGxldGVcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSYWlzZUV2ZW50VHVybkNvbXBsZXRlKClcclxuICB7XHJcbiAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDQsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICAgIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZWFpc2VkIGZvciB0dXJuIGNvbXBsZXRlXCIpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCx0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKTtcclxuICAgICAgfVxyXG4gIH0sXHJcblxyXG5cclxuICBTeW5jQWxsRGF0YSgpXHJcbiAge1xyXG4gICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgIH0gIFxyXG59LFxyXG5cclxuICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCBvbiBhbGwgcGxheWVycyB0byB2YWxpZGF0ZSBpZiBtb3ZlIGlzIGNvbXBsZXRlZCBvbiBhbGwgY29ubmVjdGVkIGNsaWVudHNcclxuICAgIEBtZXRob2QgUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlKF91aWQpXHJcbiAge1xyXG4gICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL3JlYWwgcGxheWVyc1xyXG4gICAgICB7XHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICAgICAgICAgIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7IFxyXG5cclxuICAgICAgICAgICAgdmFyIEFycmF5TGVuZ3RoPVR1cm5DaGVja0FycmF5Lmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIElERm91bmQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBBcnJheUxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5W2luZGV4XT09X3VpZClcclxuICAgICAgICAgICAgICAgICAgICBJREZvdW5kPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFJREZvdW5kKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICAgICAgICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5Lmxlbmd0aD09VG90YWxDb25uZWN0ZWRQbGF5ZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgfVxyXG4gIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGRpY2UgYW5pbWF0aW9uIGlzIHBsYXllZCBvbiBhbGwgcGxheWVyc1xyXG4gICAgQG1ldGhvZCBDaGFuZ2VUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGFuZ2VUdXJuKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuVHVybk51bWJlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9dGhpcy5UdXJuTnVtYmVyKzE7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLHRoaXMuVHVybk51bWJlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIGZyb20gcmFpc2Ugb24gZXZlbnQgKGZyb20gZnVuY3Rpb24gXCJTdGFydFR1cm5cIiBhbmQgXCJDaGFuZ2VUdXJuXCIgb2YgdGhpcyBzYW1lIGNsYXNzKSB0byBoYW5kbGUgdHVyblxyXG4gICAgQG1ldGhvZCBUdXJuSGFuZGxlclxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgVHVybkhhbmRsZXIoX3R1cm4pXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlR1cm46IFwiK190dXJuKTtcclxuICAgICAgICB2YXIgX3BsYXllck1hdGNoZWQ9ZmFsc2U7XHJcbiAgICAgICAgX3NraXBOZXh0VHVybj1mYWxzZTtcclxuICAgICAgICBpZihJc1R3ZWVuaW5nKSAvL2NoZWNrIGlmIGFuaW1hdGlvbiBvZiB0dXJuIGJlaW5nIHBsYXllZCBvbiBvdGhlciBwbGF5ZXJzIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5IYW5kbGVyKF90dXJuKTtcclxuICAgICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPV90dXJuO1xyXG4gICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NraXBOZXh0VHVybj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFfc2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSXNCb3Q9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NraXBOZXh0VHVybj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRUdXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFfc2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UvL3R1cm4gZGVjaXNpb25zIGZvciBib3RcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BsYXllck1hdGNoZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBfc2tpcE5leHRUdXJuPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIV9za2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUm9sbERpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiVHVybk51bWJlclwiLHRoaXMuVHVybk51bWJlcix0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHVybiBPZjogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGxQbGF5ZXJVSVt0aGlzLlR1cm5OdW1iZXJdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5QbGF5ZXJJbmZvKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9mb3JjZSBzeW5jIHNwZWN0YXRvciBhZnRlciBjb21wbGV0aW9uIG9mIGVhY2ggdHVyblxyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3NraXAgdGhpcyB0dXJuIGFzIHNraXAgdHVybiBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlXHJcbiAgICAgICAgICAgIGlmKF9wbGF5ZXJNYXRjaGVkICYmIF9za2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsMTIwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVNraXBOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZClcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgIHZhciBNeURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgICAgIHZhciBfY291bnRlcj1faW5kO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQhPU15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkgLy9kb250IHVwZGF0ZSBteSBvd24gZGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQ9PU1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXT1NYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9LCAgXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBhbGwgcGxheWVycyBoYXZlIGRvbmUgdGhlaXIgaW5pdGlhbCBzZXR1cCBhbmQgZmlyc3QgdHVybiBzdGFydHNcclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTdGFydFR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgICAgIHRoaXMuVHVybk51bWJlcj0wOyAvL3Jlc2V0aW5nIHRoZSB0dXJuIG51bWJlciBvbiBzdGFydCBvZiB0aGUgZ2FtZVxyXG5cclxuICAgICAgICAvL3NlbmRpbmcgaW5pdGlhbCB0dXJuIG51bWJlciBvdmVyIHRoZSBuZXR3b3JrIHRvIHN0YXJ0IHR1cm4gc2ltdWx0YW5vdXNseSBvbiBhbGwgY29ubmVjdGVkIHBsYXllcidzIGRldmljZXNcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgICAgICBcclxuICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBGdW5jdGlvbiBmb3IgZ2FtZXBsYXlcclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcGxheWVyIFVJIChuYW1lL2ljb25zL251bWJlciBvZiBwbGF5ZXJzIHRoYXQgdG8gYmUgYWN0aXZlIGV0YylcclxuICAgIEBtZXRob2QgQXNzaWduUGxheWVyR2FtZVVJXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBBc3NpZ25QbGF5ZXJHYW1lVUkoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKSAvL2ZvciBib3RcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3JhbmRvbUluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsdGhpcy5Cb3RHYW1lSW5mby5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvLnB1c2godGhpcy5Cb3RHYW1lSW5mb1tfcmFuZG9tSW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz0yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlR2FtZVVJKF90b2dnbGVIaWdobGlnaHQsX2luZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGlmKF90b2dnbGVIaWdobGlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW19pbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tfaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoX2luZGV4PT1pbmRleClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlQkdIaWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVUZXh0aWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBlbmJhbGUgcmVzcGVjdGl2ZSBwbGF5ZXJzIG5vZGVzIGluc2lkZSBnYW1hcGxheVxyXG4gICAgQG1ldGhvZCBFbmFibGVQbGF5ZXJOb2Rlc1xyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgRW5hYmxlUGxheWVyTm9kZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQ9PTEpICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbj10aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgIFxyXG4gICAgICAgIGxldCByYXRpbz10YXJnZXRQb3MueS9jYy53aW5TaXplLmhlaWdodDtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MjtcclxuICAgIH0sXHJcblxyXG4gICAgbGF0ZVVwZGF0ZSAoKSB7XHJcbiAgICAgICAgaWYodGhpcy5pc0NhbWVyYVpvb21pbmcpICAgIFxyXG4gICAgICAgICAgICB0aGlzLlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3luY0RpY2VSb2xsKF9yb2xsKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZGljZTE9X3JvbGwuZGljZTE7XHJcbiAgICAgICAgdmFyIF9kaWNlMj1fcm9sbC5kaWNlMjtcclxuICAgICAgICB2YXIgX3Jlc3VsdD1fZGljZTErX2RpY2UyO1xyXG5cclxuICAgICAgICBJc1R3ZWVuaW5nPXRydWU7XHJcbiAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG5cclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQ9PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbWF0Y2hlZDpcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj09MCAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzWzBdLkJ1c2luZXNzVHlwZT09MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9sbENvdW50ZXI9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj0xMztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj09MTIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyKzIxOyAgXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIrMTtcclxuXHJcbiAgICAgICAgICAgIFJvbGxDb3VudGVyPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlci0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIERpY2VSb2xsPV9yZXN1bHQ7XHJcbiAgICAgICAgRGljZVRlbXA9MDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKERpY2VSb2xsKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVHVybk51bWJlcj09aW5kZXgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uZ2V0Q29tcG9uZW50KFwiRGljZUNvbnRyb2xsZXJcIikuQW5pbWF0ZURpY2UoX2RpY2UxLF9kaWNlMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgICAgICAvLyB2YXIgX3Bvcz10aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgICAgICAgLy8gdGhpcy5Ud2VlbkNhbWVyYShfcG9zLHRydWUsMC40KTsgICBcclxuICAgIH0sXHJcblxyXG4gICAgRGljZUZ1bnRpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgICAgICB2YXIgX3Bvcz10aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgICAgICAgdGhpcy5Ud2VlbkNhbWVyYShfcG9zLHRydWUsMC40KTsgIFxyXG4gICAgfSxcclxuXHJcbiAgICBUZW1wQ2hlY2tTcGFjZShfcm9sbGluZylcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtcGNvdW50ZXI9MDtcclxuICAgICAgICB2YXIgdGVtcGNvdW50ZXIyPTA7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEPT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGVtcGNvdW50ZXIyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcblxyXG4gICAgICBpZih0ZW1wY291bnRlcjItMTwwKVxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInN0YXJ0aW5nIGZyb20gb2JsaXZpb25cIik7XHJcbiAgICAgICAgdGVtcGNvdW50ZXI9dGVtcGNvdW50ZXIyK19yb2xsaW5nLTE7XHJcbiAgICAgICAgdmFyIGRpY2V0b2JlPXBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIitkaWNldG9iZSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGNvdW50ZXI9dGVtcGNvdW50ZXIyK19yb2xsaW5nO1xyXG4gICAgICAgIHZhciBkaWNldG9iZT1wYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIrZGljZXRvYmUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsRGljZTpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgIHZhciBEaWNlMT10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgICB2YXIgRGljZTI9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuXHJcbiAgICAgICAgLy8gdmFyIERpY2UxPTE7XHJcbiAgICAgICAgLy8gdmFyIERpY2UyPTE7XHJcblxyXG4gICAgICAgIERpY2VSb2xsPURpY2UxK0RpY2UyO1xyXG4gICAgICAgIHZhciBfbmV3Um9sbD17ZGljZTE6RGljZTEsZGljZTI6RGljZTJ9XHJcbiAgICAgICAgLy9EaWNlUm9sbD0yMztcclxuICAgICAgICAvL3RoaXMuVGVtcENoZWNrU3BhY2UoRGljZVJvbGwpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGljZSBudW1iZXI6IFwiK0RpY2VSb2xsK1wiLCBEaWNlMTpcIitEaWNlMStcIiwgRGljZTI6XCIrRGljZTIpO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDMsX25ld1JvbGwpOyBcclxuICAgIH0sXHJcblxyXG4gICAgUm9sbE9uZURpY2UoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaWNlMT10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgIHJldHVybiBEaWNlMTtcclxuICAgIH0sXHJcblxyXG4gICAgUm9sbFR3b0RpY2VzKClcclxuICAgIHtcclxuICAgICAgICB2YXIgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuICAgICAgICB2YXIgRGljZTI9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuICAgICAgICByZXR1cm4gKERpY2UxK0RpY2UyKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2FsbFVwb25DYXJkKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX3NwYWNlSUQ9cGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKTtcclxuICAgICAgICBpZihfc3BhY2VJRCE9NiAmJiBfc3BhY2VJRCE9NykgLy82IG1lYW5zIHBheWRheSBhbmQgNyBtZWFucyBkb3VibGUgcGF5ZGF5LCA5IG1lbmFzIHNlbGwgc3BhY2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBSYW5kb21DYXJkPXRoaXMuZ2V0UmFuZG9tKDAsMTUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9mb3IgdGVzdGluZyBvbmx5XHJcbiAgICAgICAgICAgIGlmKF9zcGFjZUlEPT0yKSAvL2xhbmRlZCBvbiBzb21lIGJpZyBidXNlaW5zc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleD1bMCwxLDcsMTBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsNCk7XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihfc3BhY2VJRD09NSkgLy9sYW5kZWQgb24gc29tZSBsb3NzZXMgY2FyZHNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIHZhbHVlSW5kZXg9WzAsNSw2LDJdO1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIGluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsNCk7XHJcbiAgICAgICAgICAgICAgICAvLyBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgUmFuZG9tQ2FyZD0wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoX3NwYWNlSUQ9PTMpIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDcsMyw4LDEzLDldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsNik7XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbHNlIGlmKF9zcGFjZUlEPT0xKSAvL2xhbmRlZCBvbiBzb21lIG1hcmtldGluZyBjYXJkc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleD1bMCwxLDYsMTBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4PXRoaXMuZ2V0UmFuZG9tKDAsNCk7XHJcbiAgICAgICAgICAgICAgICBSYW5kb21DYXJkPXZhbHVlSW5kZXhbaW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vZm9yIHJlYWwgcGxheWVyXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGE9e1wicmFuZG9tQ2FyZFwiOlJhbmRvbUNhcmQsXCJjb3VudGVyXCI6Um9sbENvdW50ZXJ9OyAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTEpIC8vZm9yIGJvdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGE9e1wicmFuZG9tQ2FyZFwiOlJhbmRvbUNhcmQsXCJjb3VudGVyXCI6Um9sbENvdW50ZXJ9OyAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFuZGVkIG9uIHBheSBkYXkgb3IgZG91YmxlIHBheSBkYXkgYW5kIHdvcmsgaXMgZG9uZSBzbyBjaGFuZ2luZyB0dXJuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBsZXRlQ2FyZFR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENhbGxHYW1lQ29tcGxldGUoX2lzQm90PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9pc0JvdD09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD10aGlzLlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2Nhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEhNQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIEJNTG9jYXRpb25zPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FuQW1vdW50Kz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1DYXNoPShCTUFtb3VudCtCTUxvY2F0aW9ucykqMTUwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgSE1DYXNoPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoSE1BbW91bnQ9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD02MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArNjAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MylcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzI1MDAwKzYwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgVG90YWxBc3NldHM9X2Nhc2grQk1DYXNoK0hNQ2FzaC1sb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxTY29yZT1Ub3RhbEFzc2V0cztcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9dGhpcy5UdXJuTnVtYmVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9PWZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uaXNHYW1lRmluaXNoZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX2Nhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g7XHJcbiAgICAgICAgICAgICAgICB2YXIgSE1BbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBCTUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9dGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYW5BbW91bnQrPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgQk1DYXNoPShCTUFtb3VudCtCTUxvY2F0aW9ucykqMTUwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgSE1DYXNoPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoSE1BbW91bnQ9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhNQ2FzaD02MDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArNjAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MylcclxuICAgICAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzI1MDAwKzYwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgVG90YWxBc3NldHM9X2Nhc2grQk1DYXNoK0hNQ2FzaC1sb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxTY29yZT1Ub3RhbEFzc2V0czsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKVxyXG4gICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg2LF9kYXRhKTtcclxuICAgfSxcclxuXHJcbiAgIFN5bmNHYW1lT3ZlcihfVUlEKVxyXG4gICB7XHJcbiAgICBcclxuICAgIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0yKS8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAge1xyXG4gICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgdmFyIE15RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coX1VJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3Zlcj10cnVlO1xyXG5cclxuICAgICAgICBpZihNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQ9PV9VSUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIDE1MDAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IGxvc2VcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJ1bmZvcnR1bmF0ZWx5IHlvdSBoYXZlIGxvc3QgdGhlIGdhbWUuXCIrXCJcXG5cIisnXFxuJytcIlxcblwiK1xyXG4gICAgICAgICAgICAgICAgXCJHYW1lIHdpbGwgYmUgcmVzdGFydGVkIGF1dG9tYXRjYWxseSBhZnRlciAxNSBzZWNvbmRzXCIsXHJcbiAgICAgICAgICAgICAgICAxNTAwMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVzdGFydEdhbWUoKTtcclxuICAgICAgICB9LCAxNTA2MCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vd2l0aCBib3RcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPXRoaXMuUGxheWVyR2FtZUluZm87XHJcbiAgICAgICAgdmFyIE15RGF0YT10aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKF9VSUQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKE15RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bMF0uR2FtZU92ZXI9dHJ1ZTtcclxuXHJcbiAgICAgICAgaWYoTXlEYXRhLlBsYXllclVJRD09X1VJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IHdvblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICAgICAgXCJUb3RhbCBDYXNoOiBcIitNeURhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICBcIkdhbWUgd2lsbCBiZSByZXN0YXJ0ZWQgYXV0b21hdGNhbGx5IGFmdGVyIDE1IHNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIDE1MDAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8veW91IGxvc2VcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLlRvdGFsU2NvcmUrXCJcXG5cIisnXFxuJytcclxuICAgICAgICAgICAgICAgIFwidW5mb3J0dW5hdGVseSB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiK1wiXFxuXCIrJ1xcbicrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAgICAgMTUwMDBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgfSwgMTUwNjApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgIH0sXHJcblxyXG4gICAgU3RhcnREaWNlUm9sbDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoUm9sbENvdW50ZXI+PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YS5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVvdmVyXCIpO1xyXG4gICAgICAgICAgICBpc0dhbWVPdmVyPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNhbGxHYW1lQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGxheWVyY29tcGxldGVkPTA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJjb21wbGV0ZWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJjb21wbGV0ZWQ9PXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heD0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQ9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfdmFsdWUgPiBtYXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWRJbmQ9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PV92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIHdvbiBieSBwbGF5ZXIgaWQ6IFwiK1Nlc3Npb25EYXRhW1NlbGVjdGVkSW5kXS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkvL2ZvciBib3RcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZD0wO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoTWFpblNlc3Npb25EYXRhW2luZGV4XS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHBsYXllcmNvbXBsZXRlZD09dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXg9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFNlbGVjdGVkSW5kPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBTZXNzaW9uRGF0YT10aGlzLlBsYXllckdhbWVJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLlRvdGFsU2NvcmU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3ZhbHVlID4gbWF4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdGVkSW5kPWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heD1fdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIitTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nYW1lIGNvbXBsZXRlZCBvbiBhbGwgc3lzdGVtc1xyXG4gICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERpY2VUZW1wPURpY2VUZW1wKzE7IFxyXG4gICAgICAgICAgICB2YXIgX3RvUG9zPWNjLlZlYzIoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi54LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5QbGF5ZXIodGhpcy5BbGxQbGF5ZXJOb2Rlc1t0aGlzLlR1cm5OdW1iZXJdLF90b1Bvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSYW5kb206ZnVuY3Rpb24obWluLG1heClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKSArIG1pbjsgLy8gbWluIGluY2x1ZGVkIGFuZCBtYXggZXhjbHVkZWRcclxuICAgIH0sXHJcblxyXG4gICAgVHdlZW5DYW1lcmE6IGZ1bmN0aW9uIChfcG9zLCBpc1pvb20sdGltZSkgeyAgIFxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuQ2FtZXJhTm9kZSlcclxuICAgICAgICAudG8odGltZSwgeyBwb3NpdGlvbjogY2MudjIoX3Bvcy54LCBfcG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZihpc1pvb20pXHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBab29tQ2FtZXJhSW4gKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgaWYodGhpcy5DYW1lcmEuem9vbVJhdGlvPDIpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89dGhpcy5DYW1lcmEuem9vbVJhdGlvKzAuMDM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCAxMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrUGF5RGF5Q29uZGl0aW9ucyhfaXNCb3Q9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NilcclxuICAgICAgICAgICAgUGFzc2VkUGF5RGF5PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NylcclxuICAgICAgICAgICAgRG91YmxlUGF5RGF5PXRydWU7XHJcblxyXG4gICAgICAgIF9uZXh0VHVybkRvdWJsZVBheT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgICAgICAgaWYoUGFzc2VkUGF5RGF5ICYmICFEb3VibGVQYXlEYXkgJiYgIV9uZXh0VHVybkRvdWJsZVBheSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4oZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVBheURheShmYWxzZSxmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oZmFsc2UsX2lzQm90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZigoRG91YmxlUGF5RGF5KSB8fCAoUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKHRydWUsX2lzQm90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFpvb21DYW1lcmFPdXQgKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLkNhbWVyYS56b29tUmF0aW8+PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz10aGlzLkNhbWVyYS56b29tUmF0aW8tMC4wMztcclxuICAgICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb249Y2MuVmVjMigwLDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTE7XHJcblxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbigwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIWlzR2FtZU92ZXIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5TZWxlY3RlZE1vZGU9PTIpIC8vcmVhbCBwbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLlNlbGVjdGVkTW9kZT09MSkgLy9ib3RcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLklzQm90PT1mYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jc0JvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBUd2VlblBsYXllcjogZnVuY3Rpb24gKE5vZGUsVG9Qb3MpIHtcclxuICAgICAgICBjYy50d2VlbihOb2RlKVxyXG4gICAgICAgIC50bygwLjQsIHsgcG9zaXRpb246IGNjLnYyKFRvUG9zLngsIFRvUG9zLnkpfSx7ZWFzaW5nOlwicXVhZEluT3V0XCJ9KVxyXG4gICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICBpZihEaWNlVGVtcDxEaWNlUm9sbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCFpc0dhbWVPdmVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXNzZWRQYXlEYXk9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vZm9yIGJvdFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheT10cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihSb2xsQ291bnRlcj09MTIpXHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj1Sb2xsQ291bnRlcisyMTsgIFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj1Sb2xsQ291bnRlcisxO1xyXG5cclxuICAgICAgICAgICAgLy9EaWNlVGVtcD1EaWNlVGVtcCsxOyBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coRGljZVRlbXArXCIgXCIrUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX25ld3Bvcz1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcyxmYWxzZSwwLjYpOyAvL3pvb21vdXRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vcnVsZXMgaW1wbG1lbnRhdGlvbiBkdXJpbmcgdHVybiAodHVybiBkZWNpc2lvbnMpXHJcblxyXG4gICAgVG9nZ2xlUGF5RGF5KF9zdDEsX1N0MilcclxuICAgIHtcclxuICAgICAgICBQYXNzZWRQYXlEYXk9X3N0MTtcclxuICAgICAgICBEb3VibGVQYXlEYXk9X1N0MjtcclxuICAgIH0sXHJcblxyXG4gICAgRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKGFtb3VudCxfaW5kZXgsX2xvY2F0aW9uTmFtZSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaD49YW1vdW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2gtYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50KzE7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZXhwYW5kZWQgeW91ciBidXNpbmVzcy5cIiwxMDAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIithbW91bnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oKVxyXG4gICAge1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHBhcnNlSW50KHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NUeXBlKT09MikgLy90aGlzIG1lYW5zIHRoZXJlIGlzIGJyaWNrIGFuZCBtb3J0YXIgaW4gbGlzdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlNldEJ1c2luZXNzSW5kZXgoaSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuUmVzZXRFZGl0Qm94KCk7XHJcbiAgICAgICAgICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coQnVzaW5lc3NMb2NhdGlvbk5vZGVzKTtcclxuICAgICAgICByZXR1cm4gQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDtcclxuICAgIH0sXHJcblxyXG4gICAgRGVzdHJveUdlbmVyYXRlZE5vZGVzKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbihfbmFtZSxfU2hhcmVBbW91bnQsX2lzQWRkaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9pc0FkZGluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfc3RvY2s9bmV3IFN0b2NrSW5mbygpO1xyXG4gICAgICAgICAgICBfc3RvY2suQnVzaW5lc3NOYW1lPV9uYW1lO1xyXG4gICAgICAgICAgICBfc3RvY2suU2hhcmVBbW91bnQ9X1NoYXJlQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZTdG9ja3MucHVzaChfc3RvY2spO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oX2lzRG91YmxlUGF5RGF5PWZhbHNlLF9pc0JvdD1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcE5leHRQYXlkYXk9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0UGF5ZGF5O1xyXG4gICAgICAgIF9za2lwSE1OZXh0UGF5ZGF5PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgICAgIF9za2lwQk1OZXh0UGF5ZGF5PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwQk1OZXh0UGF5ZGF5O1xyXG5cclxuICAgICAgICBpZihfc2tpcE5leHRQYXlkYXkpIC8vaWYgcHJldmlvdXNseSBza2lwIHBheWRheSB3YXMgc3RvcmVkIGJ5IGFueSBjYXJkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgaWYoIV9pc0JvdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIFBheURheS5cIiwxNjAwKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxNjUwKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyBQYXlEYXkuXCIpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF90aXRsZT1cIlwiO1xyXG5cclxuICAgICAgICAgICAgaWYoX2lzRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgX3RpdGxlPVwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIF90aXRsZT1cIlBheURheVwiO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSxfaXNEb3VibGVQYXlEYXksX3NraXBITU5leHRQYXlkYXksX3NraXBCTU5leHRQYXlkYXksX2lzQm90KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuLy8jZW5kcmVnaW9uXHJcbiAgIFxyXG4gICAgLy8jcmVnaW9uIENhcmRzIFJ1bGVzXHJcbiAgICBUb2dnbGVEb3VibGVQYXlOZXh0VHVybihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk9X25leHRUdXJuRG91YmxlUGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwTmV4dFR1cm4oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm49X3NraXBOZXh0VHVybjtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBOZXh0UGF5ZGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk9X3NraXBOZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5PV9za2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcEJNTmV4dFBheWRheT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk9X3NraXBCTU5leHRQYXlkYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVR1cm5Qcm9ncmVzcyhfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgVHVybkluUHJvZ3Jlc3M9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXR1cm5UdXJuUHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBUdXJuSW5Qcm9ncmVzcztcclxuICAgIH0sXHJcbiAgICBMb3NlQWxsTWFya2V0aW5nTW9uZXkoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbG9zZUFtb3VudD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfbG9zZUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9sb3NlQW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2xvc2VBbW91bnRcclxuICAgIH0sXHJcblxyXG4gICAgTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcilcclxuICAgIHtcclxuICAgICAgICB2YXIgX2Ftb3VudEluY3JlYXNlZD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50SW5jcmVhc2VkPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQqPV9tdWx0aXBsaWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50SW5jcmVhc2VkPTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2Ftb3VudEluY3JlYXNlZFxyXG4gICAgfSxcclxuXHJcbiAgICBHZXRNYXJrZXRpbmdNb25leShfcHJvZml0KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfYW1vdW50PS0xO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9wcm9maXQ9KF9wcm9maXQvMTAwKTtcclxuICAgICAgICAgICAgX2Ftb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50Kj1fcHJvZml0O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoKz1fYW1vdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2Ftb3VudFxyXG4gICAgfSxcclxuXHJcbiAgICBRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbihfZGF0YSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX3VzZXJJRD1fZGF0YS5Vc2VySUQ7XHJcbiAgICAgICAgdmFyIF9xdWVzdGlvbkluZGV4PV9kYXRhLlF1ZXN0aW9uO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9X2RhdGEuVXNlckluZGV4O1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKF91c2VySUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSUQgbWF0Y2hlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBPbmVRdWVzdGlvbkluZGV4PV9xdWVzdGlvbkluZGV4O1xyXG4gICAgICAgICAgICB2YXIgX3F1ZXN0aW9uQXNrZWQ9T25lUXVlc3Rpb25zW19xdWVzdGlvbkluZGV4LTFdO1xyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3F1ZXN0aW9uQXNrZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25lUXVlc3Rpb25TY3JlZW5fU3BhY2VfT25lUXVlc3Rpb24oX2lzVHVybk92ZXI9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9teURhdGE7XHJcbiAgICAgICAgdmFyIF9yb29tRGF0YTtcclxuICAgICAgICBpZih0aGlzLlNlbGVjdGVkTW9kZT09MikgLy9mb3IgcmVhbCBwbGF5ZXJzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcm9vbURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG4gICAgICAgICAgICBfbXlEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuU2VsZWN0ZWRNb2RlPT0xKS8vZm9yIGJvdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX215RGF0YT10aGlzLlBsYXllckdhbWVJbmZvWzBdO1xyXG4gICAgICAgICAgICBfcm9vbURhdGE9dGhpcy5QbGF5ZXJHYW1lSW5mbztcclxuICAgICAgICB9XHJcbiAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSh0cnVlKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX215RGF0YSxfcm9vbURhdGEsX2lzVHVybk92ZXIsdGhpcy5TZWxlY3RlZE1vZGUpXHJcbiAgICBcclxuICAgIH0sXHJcblxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvbl9QYXlBbW91bnRfT25lUXVlc3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbXlEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG5cclxuICAgICAgICBpZihfbXlEYXRhLkNhc2g+PTUwMDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKF9teURhdGEuUGxheWVyVUlEPT10aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uQ2FzaC09NTAwMDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHBhaWQgY2FzaCBhbW91bnQgdG8gcGxheWVyLlwiLDEyMDApO1xyXG4gICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24odHJ1ZSxmYWxzZSwtMSxfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbmVRdWVzdGlvbkRlY2lzaW9uX0Fuc3dlclF1ZXN0aW9uX09uZVF1ZXN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGFuc3dlcmVkIHRoZSBxdWVzdGlvbi5cIiwxMjAwKTtcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihmYWxzZSx0cnVlLE9uZVF1ZXN0aW9uSW5kZXgsX215RGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBSYWlzZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2hhc0RvbmVQYXltZW50LF9oYXNBbnN3ZXJlZFF1ZXN0aW9uLF9xdWVzdGlvbkluZGV4LF9Vc2VySUQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9kYXRhPXtQYXltZW50RG9uZTpfaGFzRG9uZVBheW1lbnQsUXVlc3Rpb25BbnN3ZXJlZDpfaGFzQW5zd2VyZWRRdWVzdGlvbixRdWVzdGlvbkluZGV4Ol9xdWVzdGlvbkluZGV4LElEOl9Vc2VySUR9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoOCxfZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9oYXNEb25lUGF5bWVudD1fZGF0YS5QYXltZW50RG9uZTtcclxuICAgICAgICAgICAgdmFyIF9oYXNBbnN3ZXJlZFF1ZXN0aW9uPV9kYXRhLlF1ZXN0aW9uQW5zd2VyZWQ7XHJcbiAgICAgICAgICAgIHZhciBfcXVlc3Rpb25JbmRleD1fZGF0YS5RdWVzdGlvbkluZGV4O1xyXG4gICAgICAgICAgICB2YXIgX3VJRD1fZGF0YS5JRDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKF9oYXNEb25lUGF5bWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoKz01MDAwO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlBsYXllciBoYXMgcmVmdXNlZCB0byBhbnN3ZXIgdGhlIHF1ZXN0aW9uIGluc3RlYWQgcGF5ZWQgdGhlIGNhc2ggYW1vdW50LCAkNTAwMCBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDYXJkVHVybigpO1xyXG5cclxuICAgICAgICAgICAgfWVsc2UgaWYoX2hhc0Fuc3dlcmVkUXVlc3Rpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfc2VsZWN0ZWRQbGF5ZXJJbmRleD0wO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hY3RvcnNEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX3VJRD09X2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkUGxheWVySW5kZXg9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihfcXVlc3Rpb25JbmRleD09MSkvL2hhdmUgeW91IHNraXBwZWQgbG9hbiBwcmV2aW91cyBwYXlkYXk/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgc2tpcHBlZCBsb2FuIHBheWVtZW50IGluIHByZXZpb3VzIHBheWRheVwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgc2tpcHBlZCBsb2FuIHBheWVtZW50IGluIHByZXZpb3VzIHBheWRheVwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKF9xdWVzdGlvbkluZGV4PT0yKS8vSGF2ZSB5b3UgdGFrZW4gYW55IGxvYW4/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9sb2FuVGFrZW49ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9sb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2xvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCB0byBoYXZlIHRha2VuIHNvbWUgbG9hblwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgbm90IHRvIGhhdmUgdGFrZW4gYW55IGxvYW5cIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihfcXVlc3Rpb25JbmRleD09MykvL0FyZSB5b3UgYmFua3J1cHRlZD8gaWYgbW9yZSB0aGFuIG9uY2UsIHRlbGwgbWUgdGhlIGFtb3VudD9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Jc0JhbmtydXB0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgYmVlbiBiYW5rcnVwdGVkXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSBiZWVuIGJhbmtydXB0ZWRcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihfcXVlc3Rpb25JbmRleD09NCkvL0lzIHlvdXIgdHVybiBnb2luZyB0byBiZSBza2lwcGVkIG5leHQgdGltZT9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgdHVybiB3aWxsIGJlIHNraXBwZWQuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgbm90IGJlIHNraXBwZWQuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihfcXVlc3Rpb25JbmRleD09NSkvL0lzIGl0IGdvaW5nIHRvIGJlIGRvdWJsZSBwYXkgZGF5IHlvdXIgbmV4dCBwYXlkYXk/XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgcGF5ZGF5IHdpbGwgYmUgZG91YmxlIHBheWRheVwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQsIG5leHQgcGF5ZGF5IHdpbGwgbm90IGJlIGRvdWJsZSBwYXlkYXlcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAyMTUwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbn0pO1xyXG4vL21vZHVsZS5leHBvcnRzICA9IFBsYXllckRhdGE7IC8vd2hlbiBpbXBvcnRzIGluIGFub3RoZXIgc2NyaXB0IG9ubHkgcmVmZXJlbmNlIG9mIHBsYXllcmRhdGEgY2xhc3Mgd291bGQgYmUgYWJsZSB0byBhY2Nlc3NlZCBmcm9tIEdhbWVtYW5hZ2VyIGltcG9ydFxyXG5tb2R1bGUuZXhwb3J0cyAgPSBHYW1lTWFuYWdlcjtcclxuLy8jZW5kcmVnaW9uIl19