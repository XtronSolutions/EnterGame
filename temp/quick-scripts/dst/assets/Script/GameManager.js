
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
    DiceRoll = 0; //if joined player is spectate

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
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().StartNewBusiness_BusinessSetup(true);
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

    if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
      GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(true, RandomCard);
    } else {
      CardEventReceived = true; // if(IsTweening==false && this.CardDisplayed==false)
      // {
      //     GamePlayReferenceManager.Instance.Get_SpaceManager().Data[counter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(false,RandomCard);
      //     this.CardDisplayed=true;
      // }
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
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == false) {
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(4, GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID);
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
  },

  /**
   @summary called when dice animation is played on all players
   @method ChangeTurn
   @param {string} none
   @returns {boolean} no return
  **/
  ChangeTurn: function ChangeTurn() {
    this.SyncAllData();
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

    var _playerMatched = false;
    _skipNextTurn = false;

    if (IsTweening) //check if animation of turn being played on other players 
      {
        setTimeout(function () {
          _this2.TurnHandler(_turn);
        }, 800);
      } else {
      this.TurnNumber = _turn;

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

      this.UpdateGameUI(true, this.TurnNumber);

      for (var index = 0; index < this.AllPlayerUI.length; index++) {
        this.AllPlayerUI[index].getComponent("PlayerProfileManager").DiceRollScreen.active = false;
      }

      GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("TurnNumber", this.TurnNumber, true);
      console.log("Turn Of: " + this.PlayerGameInfo[this.TurnNumber].PlayerName);
      console.log(this.AllPlayerUI[this.TurnNumber].getComponent('PlayerProfileManager').PlayerInfo);
      console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor());
      console.log(GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors());
      this.SyncDataToPlayerGameInfo(0); //force sync spectator after completion of each turn

      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.RoomEssentials.IsSpectate == true) this.SyncAllData_SpectateManager(); //skip this turn as skip turn has been called before

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

    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray().length; index++) {
      if (GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.Data.userID == this.PlayerGameInfo[this.TurnNumber].PlayerUID) {
        console.log("player matched:" + this.PlayerGameInfo[this.TurnNumber].PlayerName);
        this.PlayerGameInfo[this.TurnNumber].PlayerRollCounter = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray()[index].customProperties.PlayerSessionData.PlayerRollCounter;
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
    } // console.error(tempcounter2+" "+_roll);
    // if((tempcounter2+_roll)<33)
    // {
    //     if(this.PlayerGameInfo[this.TurnNumber].NoOfBusiness[0].BusinessType==1)
    //     {
    //         tempcounter=0+_roll-1;
    //         console.error(tempcounter);
    //     }
    //     else
    //     {
    //         tempcounter=13+_roll-1;
    //         console.error(tempcounter);
    //     }
    // }
    // else
    // {
    //     console.error(tempcounter2+" "+_roll);
    //     tempcounter=tempcounter2+_roll;
    // }


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
    var Dice2 = this.getRandom(1, 7); // var Dice1=4;
    // var Dice2=4;

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
            var valueIndex = [0, 5, 6, 2];
            var index = this.getRandom(0, 4);
            RandomCard = valueIndex[index];
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

        if (this.PlayerGameInfo[this.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
          var SendingData = {
            "randomCard": RandomCard,
            "counter": RollCounter
          };
          this.RaiseEventForCard(SendingData);
        } else {
          this.DisplayCardOnOthers();
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
  CallGameComplete: function CallGameComplete() {
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
  },
  RaiseEventForGameComplete: function RaiseEventForGameComplete(_data) {
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(6, _data);
  },
  SyncGameOver: function SyncGameOver(_UID) {
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
  },
  StartDiceRoll: function StartDiceRoll() {
    if (RollCounter >= GamePlayReferenceManager.Instance.Get_SpaceManager().Data.length) {
      console.log("Gameover");
      isGameOver = true;
      this.ZoomCameraOut();

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

          for (var _index5 = 0; _index5 < SessionData.length; _index5++) {
            var _value = SessionData[_index5].customProperties.PlayerSessionData.TotalScore;

            if (_value > max) {
              SelectedInd = _index5;
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
  CheckPayDayConditions: function CheckPayDayConditions() {
    if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 6) PassedPayDay = true;
    if (parseInt(GamePlayReferenceManager.Instance.Get_SpaceManager().Data[RollCounter].ReferenceLocation.getComponent('SpaceHandler').SpaceData.SpacesType) == 7) DoublePayDay = true;
    _nextTurnDoublePay = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.NextTurnDoublePay;

    if (PassedPayDay && !DoublePayDay && !_nextTurnDoublePay) {
      this.ToggleDoublePayNextTurn(false);
      this.TogglePayDay(false, false);
      this.ProcessPayDay_TurnDecision(false);
    } else if (DoublePayDay || PassedPayDay && _nextTurnDoublePay) {
      this.ToggleDoublePayNextTurn(false);
      this.TogglePayDay(false, false);
      this.ProcessPayDay_TurnDecision(true);
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
          if (_this5.PlayerGameInfo[_this5.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) _this5.CheckPayDayConditions();else _this5.callUponCard();
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
          if (_this6.PlayerGameInfo[_this6.TurnNumber].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
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
  ProcessPayDay_TurnDecision: function ProcessPayDay_TurnDecision(_isDoublePayDay) {
    var _this7 = this;

    if (_isDoublePayDay === void 0) {
      _isDoublePayDay = false;
    }

    _skipNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipNextPayday;
    _skipHMNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipHMNextPayday;
    _skipBMNextPayday = this.PlayerGameInfo[this.TurnNumber].CardFunctionality.SkipBMNextPayday;

    if (_skipNextPayday) //if previously skip payday was stored by any card
      {
        this.ToggleSkipPayDay_Whole(false);
        GamePlayReferenceManager.Instance.Get_GameplayUIManager().ShowToast("Skipping PayDay.", 1600);
        setTimeout(function () {
          _this7.callUponCard();
        }, 1650);
      } else {
      var _title = "";
      if (_isDoublePayDay) _title = "DoublePayDay";else _title = "PayDay";
      GamePlayReferenceManager.Instance.Get_GameplayUIManager().AssignData_PayDay(_title, _isDoublePayDay, _skipHMNextPayday, _skipBMNextPayday);
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

    var _roomData = GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoomActorsArray();

    var _myData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;

    _gameplayUIManager.ToggleSpaceScreen_OneQuestionSetupUI(true);

    _gameplayUIManager.ResetSpaceScreen_OneQuestionSetupUI();

    _gameplayUIManager.SetUpSpaceScreen_OneQuestionSetupUI(_myData, _roomData, _isTurnOver);
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

            for (var _index6 = 0; _index6 < _actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.NoOfBusiness.length; _index6++) {
              if (_actorsData[_selectedPlayerIndex].customProperties.PlayerSessionData.NoOfBusiness[_index6].LoanTaken) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIkxvY2F0aW9uc05hbWUiLCJMb2FuVGFrZW4iLCJMb2FuQW1vdW50IiwiY3RvciIsIkNhcmREYXRhRnVuY3Rpb25hbGl0eSIsIk5leHRUdXJuRG91YmxlUGF5IiwiU2tpcE5leHRUdXJuIiwiU2tpcE5leHRQYXlkYXkiLCJTa2lwSE1OZXh0UGF5ZGF5IiwiU2tpcEJNTmV4dFBheWRheSIsIlN0b2NrSW5mbyIsIlNoYXJlQW1vdW50IiwiUGxheWVyRGF0YSIsIlBsYXllck5hbWUiLCJQbGF5ZXJVSUQiLCJBdmF0YXJJRCIsIklzQm90IiwiTm9PZkJ1c2luZXNzIiwiQ2FyZEZ1bmN0aW9uYWxpdHkiLCJIb21lQmFzZWRBbW91bnQiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiTm9PZlN0b2NrcyIsIkNhc2giLCJHb2xkQ291bnQiLCJTdG9ja0NvdW50IiwiTWFya2V0aW5nQW1vdW50IiwiTGF3eWVyU3RhdHVzIiwiSXNCYW5rcnVwdCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBsYXllclJvbGxDb3VudGVyIiwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZCIsImlzR2FtZUZpbmlzaGVkIiwiVG90YWxTY29yZSIsIkdhbWVPdmVyIiwiUm9sbENvdW50ZXIiLCJEaWNlVGVtcCIsIkRpY2VSb2xsIiwiSXNUd2VlbmluZyIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlR1cm5DaGVja0FycmF5IiwiQnVzaW5lc3NMb2NhdGlvbk5vZGVzIiwiUGFzc2VkUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiX25leHRUdXJuRG91YmxlUGF5IiwiX3NraXBOZXh0VHVybiIsIl9za2lwTmV4dFBheWRheSIsIl9za2lwSE1OZXh0UGF5ZGF5IiwiX3NraXBCTU5leHRQYXlkYXkiLCJDYXJkRXZlbnRSZWNlaXZlZCIsIlR1cm5JblByb2dyZXNzIiwiaXNHYW1lT3ZlciIsIk9uZVF1ZXN0aW9uSW5kZXgiLCJPbmVRdWVzdGlvbnMiLCJDYXJkRGlzcGxheVNldFRpbW91dCIsIkdhbWVNYW5hZ2VyIiwiQ29tcG9uZW50IiwiUGxheWVyR2FtZUluZm8iLCJQbGF5ZXJOb2RlIiwiTm9kZSIsIkNhbWVyYU5vZGUiLCJBbGxQbGF5ZXJVSSIsIkFsbFBsYXllck5vZGVzIiwiU3RhcnRMb2NhdGlvbk5vZGVzIiwic3RhdGljcyIsIkluc3RhbmNlIiwib25Mb2FkIiwiVHVybk51bWJlciIsIlR1cm5Db21wbGV0ZWQiLCJDaGVja1JlZmVyZW5jZXMiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDaGVja1NwZWN0YXRlIiwiY29uc29sZSIsImxvZyIsImdldFBob3RvblJlZiIsIm15Um9vbSIsImdldEN1c3RvbVByb3BlcnR5IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJIiwiQWxsRGF0YSIsIk1heFBsYXllcnMiLCJsZW5ndGgiLCJTeW5jQWxsRGF0YV9TcGVjdGF0ZU1hbmFnZXIiLCJVcGRhdGVHYW1lVUkiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsIlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCIsIkdldFR1cm5OdW1iZXIiLCJTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8iLCJBc3NpZ25QbGF5ZXJHYW1lVUkiLCJDbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiaW5kZXgiLCJfdG9Qb3MiLCJWZWMyIiwiR2V0X1NwYWNlTWFuYWdlciIsIkRhdGEiLCJSZWZlcmVuY2VMb2NhdGlvbiIsInBvc2l0aW9uIiwieCIsInkiLCJzZXRQb3NpdGlvbiIsImFjdGl2ZSIsIkNoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIiLCJUb3RhbENvbm5lY3RlZFBsYXllcnMiLCJteVJvb21BY3RvckNvdW50IiwiUGhvdG9uQWN0b3IiLCJjdXN0b21Qcm9wZXJ0aWVzIiwidXNlcklEIiwic2V0Q3VzdG9tUHJvcGVydHkiLCJDaGFuZ2VUdXJuIiwiUmFpc2VFdmVudEZvckNhcmQiLCJfZGF0YSIsIkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyIiwiUmFpc2VFdmVudCIsIkNsZWFyRGlzcGxheVRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJEaXNwbGF5Q2FyZE9uT3RoZXJzIiwiZXJyb3IiLCJPbkxhbmRlZE9uU3BhY2UiLCJzZXRUaW1lb3V0IiwiUmVzZXRDYXJkRGlzcGxheSIsIlJlY2VpdmVFdmVudEZvckNhcmQiLCJSYW5kb21DYXJkIiwicmFuZG9tQ2FyZCIsImNvdW50ZXIiLCJSYWlzZUV2ZW50VHVybkNvbXBsZXRlIiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwiU3luY0FsbERhdGEiLCJSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUiLCJfdWlkIiwicHVzaCIsIkFycmF5TGVuZ3RoIiwiSURGb3VuZCIsIlR1cm5IYW5kbGVyIiwiX3R1cm4iLCJfcGxheWVyTWF0Y2hlZCIsIlRvZ2dsZVR1cm5Qcm9ncmVzcyIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlJlc2V0VHVyblZhcmlhYmxlIiwiRGljZVJvbGxTY3JlZW4iLCJQbGF5ZXJJbmZvIiwiUm9vbUFjdG9ycyIsIlNob3dUb2FzdCIsIlRvZ2dsZVNraXBOZXh0VHVybiIsIl9pbmQiLCJNYWluU2Vzc2lvbkRhdGEiLCJNeURhdGEiLCJfY291bnRlciIsIlBsYXllclNlc3Npb25EYXRhIiwiU3RhcnRUdXJuIiwiRW5hYmxlUGxheWVyTm9kZXMiLCJTZXROYW1lIiwiX3RvZ2dsZUhpZ2hsaWdodCIsIl9pbmRleCIsIlRvZ2dsZUJHSGlnaGxpZ2h0ZXIiLCJUb2dnbGVUZXh0aWdobGlnaHRlciIsIlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMiLCJ0YXJnZXRQb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInJhdGlvIiwid2luU2l6ZSIsImhlaWdodCIsInpvb21SYXRpbyIsImxhdGVVcGRhdGUiLCJzeW5jRGljZVJvbGwiLCJfcm9sbCIsIl9kaWNlMSIsImRpY2UxIiwiX2RpY2UyIiwiZGljZTIiLCJfcmVzdWx0IiwibXlSb29tQWN0b3JzQXJyYXkiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJBbmltYXRlRGljZSIsIkRpY2VGdW50aW9uYWxpdHkiLCJfcG9zIiwiVHdlZW5DYW1lcmEiLCJUZW1wQ2hlY2tTcGFjZSIsIl9yb2xsaW5nIiwidGVtcGNvdW50ZXIiLCJ0ZW1wY291bnRlcjIiLCJkaWNldG9iZSIsInBhcnNlSW50IiwiU3BhY2VEYXRhIiwiU3BhY2VzVHlwZSIsIlJvbGxEaWNlIiwiRGljZTEiLCJnZXRSYW5kb20iLCJEaWNlMiIsIl9uZXdSb2xsIiwiUm9sbE9uZURpY2UiLCJSb2xsVHdvRGljZXMiLCJjYWxsVXBvbkNhcmQiLCJfc3BhY2VJRCIsInZhbHVlSW5kZXgiLCJTZW5kaW5nRGF0YSIsImNvbXBsZXRlQ2FyZFR1cm4iLCJDYWxsR2FtZUNvbXBsZXRlIiwiX3BsYXllckluZGV4IiwiX2Nhc2giLCJITUFtb3VudCIsIkdldF9HYW1lTWFuYWdlciIsIkJNQW1vdW50IiwiQk1Mb2NhdGlvbnMiLCJsb2FuQW1vdW50IiwiQk1DYXNoIiwiSE1DYXNoIiwiVG90YWxBc3NldHMiLCJSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlIiwiU3luY0dhbWVPdmVyIiwiX1VJRCIsIlJlc3RhcnRHYW1lIiwiU3RhcnREaWNlUm9sbCIsIlpvb21DYW1lcmFPdXQiLCJwbGF5ZXJjb21wbGV0ZWQiLCJtYXgiLCJTZWxlY3RlZEluZCIsIlNlc3Npb25EYXRhIiwiX3ZhbHVlIiwiVHdlZW5QbGF5ZXIiLCJtaW4iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJpc1pvb20iLCJ0aW1lIiwidHdlZW4iLCJ0byIsInYyIiwiZWFzaW5nIiwiY2FsbCIsIlpvb21DYW1lcmFJbiIsInN0YXJ0IiwiQ2hlY2tQYXlEYXlDb25kaXRpb25zIiwiVG9nZ2xlRG91YmxlUGF5TmV4dFR1cm4iLCJUb2dnbGVQYXlEYXkiLCJQcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbiIsIlRvUG9zIiwiX25ld3BvcyIsIl9zdDEiLCJfU3QyIiwiRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiYW1vdW50IiwiX2xvY2F0aW9uTmFtZSIsIk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uIiwiR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbiIsImkiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQiLCJTZXRCdXNpbmVzc0luZGV4IiwiUmVzZXRFZGl0Qm94IiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiZGVzdHJveSIsIlVwZGF0ZVN0b2Nrc19UdXJuRGVjaXNpb24iLCJfbmFtZSIsIl9TaGFyZUFtb3VudCIsIl9pc0FkZGluZyIsIl9zdG9jayIsIl9pc0RvdWJsZVBheURheSIsIlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUiLCJfdGl0bGUiLCJBc3NpZ25EYXRhX1BheURheSIsIl9zdGF0ZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlJldHVyblR1cm5Qcm9ncmVzcyIsIkxvc2VBbGxNYXJrZXRpbmdNb25leSIsIl9sb3NlQW1vdW50IiwiTXVsdGlwbHlNYXJrZXRpbmdNb25leSIsIl9tdWx0aXBsaWVyIiwiX2Ftb3VudEluY3JlYXNlZCIsIkdldE1hcmtldGluZ01vbmV5IiwiX3Byb2ZpdCIsIl9hbW91bnQiLCJRdWVzdGlvblBvcFVwX090aGVyVXNlcl9PbmVRdWVzdGlvbiIsIl91c2VySUQiLCJVc2VySUQiLCJfcXVlc3Rpb25JbmRleCIsIlF1ZXN0aW9uIiwiVXNlckluZGV4IiwiX2dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX3F1ZXN0aW9uQXNrZWQiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2NyZWVuX1NwYWNlX09uZVF1ZXN0aW9uIiwiX2lzVHVybk92ZXIiLCJfcm9vbURhdGEiLCJfbXlEYXRhIiwiVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIk9uZVF1ZXN0aW9uRGVjaXNpb25fUGF5QW1vdW50X09uZVF1ZXN0aW9uIiwiUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uIiwiT25lUXVlc3Rpb25EZWNpc2lvbl9BbnN3ZXJRdWVzdGlvbl9PbmVRdWVzdGlvbiIsIl9oYXNEb25lUGF5bWVudCIsIl9oYXNBbnN3ZXJlZFF1ZXN0aW9uIiwiX1VzZXJJRCIsIlBheW1lbnREb25lIiwiUXVlc3Rpb25BbnN3ZXJlZCIsIlF1ZXN0aW9uSW5kZXgiLCJJRCIsIlJlY2VpdmVFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uIiwiX3VJRCIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX3NlbGVjdGVkUGxheWVySW5kZXgiLCJfYWN0b3JzRGF0YSIsIl9sb2FuVGFrZW4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxJQUFJQSxnQkFBZ0IsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDM0JDLEVBQUFBLElBQUksRUFBQyxDQURzQjtBQUUzQkMsRUFBQUEsU0FBUyxFQUFFLENBRmdCO0FBRUs7QUFDaENDLEVBQUFBLGNBQWMsRUFBRSxDQUhXLENBR0s7O0FBSEwsQ0FBUixDQUF2QixFQU1BOztBQUNBLElBQUlDLFlBQVksR0FBR0wsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDeEJDLEVBQUFBLElBQUksRUFBRSxjQURrQjtBQUU1QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBRSxjQURFO0FBRVJDLElBQUFBLFlBQVksRUFDYjtBQUNJQyxNQUFBQSxXQUFXLEVBQUMsTUFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFYixnQkFGVjtBQUdJLGlCQUFTQSxnQkFBZ0IsQ0FBQ0csSUFIOUI7QUFJSVcsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBQztBQUxaLEtBSFM7QUFTUkMsSUFBQUEsdUJBQXVCLEVBQ3hCO0FBQ0lKLE1BQUFBLFdBQVcsRUFBRSxNQURqQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRmI7QUFHSSxpQkFBUyxFQUhiO0FBSUlILE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQVZTO0FBZ0JSRyxJQUFBQSxZQUFZLEVBQ2I7QUFDSU4sTUFBQUEsV0FBVyxFQUFFLE1BRGpCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGYjtBQUdJLGlCQUFTLEVBSGI7QUFJSUgsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBakJTO0FBdUJQSSxJQUFBQSxNQUFNLEVBQ0o7QUFDSVAsTUFBQUEsV0FBVyxFQUFFLFFBRGpCO0FBRUksaUJBQVMsQ0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ21CLE9BSFo7QUFJSU4sTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBeEJLO0FBOEJOTSxJQUFBQSxhQUFhLEVBQ1o7QUFDSVQsTUFBQUEsV0FBVyxFQUFFLGVBRGpCO0FBRUksaUJBQVMsS0FGYjtBQUdJVSxNQUFBQSxJQUFJLEVBQUNyQixFQUFFLENBQUNzQixPQUhaO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQS9CSztBQXFDTFMsSUFBQUEsU0FBUyxFQUNMO0FBQ0laLE1BQUFBLFdBQVcsRUFBQyxXQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRmI7QUFHSSxpQkFBUyxFQUhiO0FBSUlILE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQXRDQztBQTRDSlUsSUFBQUEsYUFBYSxFQUNWO0FBQ0liLE1BQUFBLFdBQVcsRUFBQyxlQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUUsQ0FBQ1osRUFBRSxDQUFDZ0IsSUFBSixDQUZWO0FBR0ksaUJBQVMsRUFIYjtBQUlJSCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0E3Q0M7QUFtREpXLElBQUFBLFNBQVMsRUFDTjtBQUNJZCxNQUFBQSxXQUFXLEVBQUMsV0FEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZiO0FBR0ksaUJBQVMsS0FIYjtBQUlJVCxNQUFBQSxZQUFZLEVBQUU7QUFKbEIsS0FwREM7QUF5REphLElBQUFBLFVBQVUsRUFDUDtBQUNJZixNQUFBQSxXQUFXLEVBQUMsWUFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZiO0FBR0ksaUJBQVMsQ0FIYjtBQUlJTixNQUFBQSxZQUFZLEVBQUU7QUFKbEI7QUExREMsR0FGZ0I7QUFvRTVCYyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVksQ0FBRTtBQUNuQjtBQXJFMkIsQ0FBVCxDQUFuQixFQXdFQTs7QUFDQSxJQUFJQyxxQkFBcUIsR0FBRzVCLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ2pDQyxFQUFBQSxJQUFJLEVBQUUsdUJBRDJCO0FBRXJDQyxFQUFBQSxVQUFVLEVBQUU7QUFDUnFCLElBQUFBLGlCQUFpQixFQUNsQjtBQUNJbEIsTUFBQUEsV0FBVyxFQUFDLG1CQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRmI7QUFHSSxpQkFBUyxLQUhiO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQUZTO0FBUVJnQixJQUFBQSxZQUFZLEVBQ2I7QUFDSW5CLE1BQUFBLFdBQVcsRUFBQyxjQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRmI7QUFHSSxpQkFBUyxLQUhiO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQVRTO0FBZVJpQixJQUFBQSxjQUFjLEVBQ2Y7QUFDSXBCLE1BQUFBLFdBQVcsRUFBQyxnQkFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZiO0FBR0ksaUJBQVMsS0FIYjtBQUlJVCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0FoQlM7QUFzQlJrQixJQUFBQSxnQkFBZ0IsRUFDakI7QUFDSXJCLE1BQUFBLFdBQVcsRUFBQyxrQkFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZiO0FBR0ksaUJBQVMsS0FIYjtBQUlJVCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0F2QlM7QUE2QlJtQixJQUFBQSxnQkFBZ0IsRUFDakI7QUFDSXRCLE1BQUFBLFdBQVcsRUFBQyxrQkFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNzQixPQUZiO0FBR0ksaUJBQVMsS0FIYjtBQUlJVCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFo7QUE5QlMsR0FGeUI7QUF3Q3JDYSxFQUFBQSxJQUFJLEVBQUUsZ0JBQVksQ0FBRTtBQUNuQjtBQXpDb0MsQ0FBVCxDQUE1QixFQTJDQTs7QUFDQSxJQUFJTyxTQUFTLEdBQUdsQyxFQUFFLENBQUNNLEtBQUgsQ0FBUztBQUNyQkMsRUFBQUEsSUFBSSxFQUFFLFdBRGU7QUFFekJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUUsV0FERTtBQUVSUSxJQUFBQSxZQUFZLEVBQ2I7QUFDSU4sTUFBQUEsV0FBVyxFQUFDLGNBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDZ0IsSUFGYjtBQUdJLGlCQUFTLEVBSGI7QUFJSUgsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBQztBQUxaLEtBSFM7QUFTUnFCLElBQUFBLFdBQVcsRUFDWjtBQUNJeEIsTUFBQUEsV0FBVyxFQUFFLGFBRGpCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUIsT0FGYjtBQUdJLGlCQUFTLENBSGI7QUFJSU4sTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiO0FBVlMsR0FGYTtBQW9CekJhLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUFFO0FBQ25CO0FBckJ3QixDQUFULENBQWhCLEVBd0JBOztBQUNBLElBQUlTLFVBQVUsR0FBR3BDLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUMsWUFEaUI7QUFFMUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSNkIsSUFBQUEsVUFBVSxFQUNYO0FBQ0kxQixNQUFBQSxXQUFXLEVBQUMsWUFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZiO0FBR0ksaUJBQVMsRUFIYjtBQUlJSCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0FGUztBQVFSd0IsSUFBQUEsU0FBUyxFQUNWO0FBQ0kzQixNQUFBQSxXQUFXLEVBQUMsV0FEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZiO0FBR0ksaUJBQVMsRUFIYjtBQUlJSCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0FUUztBQWVSeUIsSUFBQUEsUUFBUSxFQUNMO0FBQ0k1QixNQUFBQSxXQUFXLEVBQUUsVUFEakI7QUFFSSxpQkFBUyxDQUZiO0FBR0lDLE1BQUFBLElBQUksRUFBQ1osRUFBRSxDQUFDbUIsT0FIWjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0FoQks7QUFzQlIwQixJQUFBQSxLQUFLLEVBQ0Y7QUFDSTdCLE1BQUFBLFdBQVcsRUFBRSxPQURqQjtBQUVJLGlCQUFTLEtBRmI7QUFHSVUsTUFBQUEsSUFBSSxFQUFDckIsRUFBRSxDQUFDc0IsT0FIWjtBQUlJVCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0F2Qks7QUE2QlIyQixJQUFBQSxZQUFZLEVBQ2I7QUFDSTlCLE1BQUFBLFdBQVcsRUFBQyxVQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUUsQ0FBQ1AsWUFBRCxDQUZWO0FBR0ksaUJBQVMsRUFIYjtBQUlJUSxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0E5QlM7QUFvQ1I0QixJQUFBQSxpQkFBaUIsRUFDbEI7QUFDSS9CLE1BQUFBLFdBQVcsRUFBQyxtQkFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFZ0IscUJBRlY7QUFHSSxpQkFBUyxFQUhiO0FBSUlmLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQXJDUztBQTJDUjZCLElBQUFBLGVBQWUsRUFDaEI7QUFDSWhDLE1BQUFBLFdBQVcsRUFBQyxpQkFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZiO0FBR0ksaUJBQVMsQ0FIYjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0E1Q1M7QUFrRFI4QixJQUFBQSxvQkFBb0IsRUFDckI7QUFDSWpDLE1BQUFBLFdBQVcsRUFBQyxzQkFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZiO0FBR0ksaUJBQVMsQ0FIYjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0FuRFM7QUF5RFIrQixJQUFBQSxvQkFBb0IsRUFDckI7QUFDSWxDLE1BQUFBLFdBQVcsRUFBQyxzQkFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZiO0FBR0ksaUJBQVMsQ0FIYjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFDO0FBTFosS0ExRFM7QUFnRVJnQyxJQUFBQSxVQUFVLEVBQ1g7QUFDSW5DLE1BQUFBLFdBQVcsRUFBQyxRQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUUsQ0FBQ3NCLFNBQUQsQ0FGVjtBQUdJLGlCQUFTLEVBSGI7QUFJSXJCLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQWpFUztBQXVFUmlDLElBQUFBLElBQUksRUFDRDtBQUNJcEMsTUFBQUEsV0FBVyxFQUFFLFlBRGpCO0FBRUksaUJBQVMsQ0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ21CLE9BSFo7QUFJSU4sTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBeEVLO0FBOEVSa0MsSUFBQUEsU0FBUyxFQUNOO0FBQ0lyQyxNQUFBQSxXQUFXLEVBQUUsV0FEakI7QUFFSSxpQkFBUyxDQUZiO0FBR0lDLE1BQUFBLElBQUksRUFBQ1osRUFBRSxDQUFDbUIsT0FIWjtBQUlJTixNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0EvRUs7QUFxRlJtQyxJQUFBQSxVQUFVLEVBQ1A7QUFDSXRDLE1BQUFBLFdBQVcsRUFBRSxZQURqQjtBQUVJLGlCQUFTLENBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNtQixPQUhaO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQXRGSztBQTRGUlcsSUFBQUEsU0FBUyxFQUNOO0FBQ0lkLE1BQUFBLFdBQVcsRUFBRSxXQURqQjtBQUVJLGlCQUFTLEtBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNzQixPQUhaO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQTdGSztBQW1HUFksSUFBQUEsVUFBVSxFQUNSO0FBQ0lmLE1BQUFBLFdBQVcsRUFBRSxZQURqQjtBQUVJLGlCQUFTLENBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNtQixPQUhaO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQXBHSztBQTBHUm9DLElBQUFBLGVBQWUsRUFDWjtBQUNJdkMsTUFBQUEsV0FBVyxFQUFFLGlCQURqQjtBQUVJLGlCQUFTLENBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNtQixPQUhaO0FBSUlOLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQTNHSztBQWlIUnFDLElBQUFBLFlBQVksRUFDVDtBQUNJeEMsTUFBQUEsV0FBVyxFQUFFLGNBRGpCO0FBRUksaUJBQVMsS0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ3NCLE9BSFo7QUFJSVQsTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBbEhLO0FBd0hSc0MsSUFBQUEsVUFBVSxFQUNQO0FBQ0l6QyxNQUFBQSxXQUFXLEVBQUUsWUFEakI7QUFFSSxpQkFBUyxLQUZiO0FBR0lDLE1BQUFBLElBQUksRUFBQ1osRUFBRSxDQUFDc0IsT0FIWjtBQUlJVCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0F6SEs7QUErSFJ1QyxJQUFBQSxrQkFBa0IsRUFDZjtBQUNJMUMsTUFBQUEsV0FBVyxFQUFFLG9CQURqQjtBQUVJLGlCQUFTLEtBRmI7QUFHSUMsTUFBQUEsSUFBSSxFQUFDWixFQUFFLENBQUNzQixPQUhaO0FBSUlULE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7QUFMYixLQWhJSztBQXNJUndDLElBQUFBLGlCQUFpQixFQUNkO0FBQ0kzQyxNQUFBQSxXQUFXLEVBQUUsbUJBRGpCO0FBRUksaUJBQVMsQ0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ21CLE9BSFo7QUFJSU4sTUFBQUEsWUFBWSxFQUFFLElBSmxCO0FBS0lDLE1BQUFBLE9BQU8sRUFBRTtBQUxiLEtBdklLO0FBNklSeUMsSUFBQUEsc0JBQXNCLEVBQ25CO0FBQ0k1QyxNQUFBQSxXQUFXLEVBQUUsd0JBRGpCO0FBRUksaUJBQVMsS0FGYjtBQUdJQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ3NCLE9BSFo7QUFJSVQsTUFBQUEsWUFBWSxFQUFFO0FBSmxCLEtBOUlLO0FBbUpQMkMsSUFBQUEsY0FBYyxFQUNSO0FBQ0k3QyxNQUFBQSxXQUFXLEVBQUMsZ0JBRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDc0IsT0FGYjtBQUdJLGlCQUFTLEtBSGI7QUFJSVQsTUFBQUEsWUFBWSxFQUFFO0FBSmxCLEtBcEpDO0FBeUpQNEMsSUFBQUEsVUFBVSxFQUNKO0FBQ0k5QyxNQUFBQSxXQUFXLEVBQUMsWUFEaEI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNtQixPQUZiO0FBR0ksaUJBQVMsQ0FIYjtBQUlJTixNQUFBQSxZQUFZLEVBQUU7QUFKbEIsS0ExSkM7QUErSlI2QyxJQUFBQSxRQUFRLEVBQ0Q7QUFDSS9DLE1BQUFBLFdBQVcsRUFBQyxVQURoQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ3NCLE9BRmI7QUFHSSxpQkFBUyxLQUhiO0FBSUlULE1BQUFBLFlBQVksRUFBRTtBQUpsQjtBQWhLQyxHQUZjO0FBd0sxQmMsRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQUU7QUFDbkI7QUF6S3lCLENBQVQsQ0FBakIsRUE0S0E7QUFFQTtBQUNBOztBQUNBLElBQUlnQyxXQUFXLEdBQUMsQ0FBaEI7QUFDQSxJQUFJQyxRQUFRLEdBQUMsQ0FBYjtBQUNBLElBQUlDLFFBQVEsR0FBQyxDQUFiO0FBQ0EsSUFBSUMsVUFBVSxHQUFDLEtBQWY7QUFDQSxJQUFJQyx3QkFBd0IsR0FBQyxJQUE3QjtBQUNBLElBQUlDLGNBQWMsR0FBQyxFQUFuQjtBQUNBLElBQUlDLHFCQUFxQixHQUFDLEVBQTFCO0FBRUEsSUFBSUMsWUFBWSxHQUFDLEtBQWpCO0FBQ0EsSUFBSUMsWUFBWSxHQUFDLEtBQWpCLEVBRUE7O0FBQ0EsSUFBSUMsa0JBQWtCLEdBQUMsS0FBdkI7QUFDQSxJQUFJQyxhQUFhLEdBQUMsS0FBbEI7QUFDQSxJQUFJQyxlQUFlLEdBQUMsS0FBcEIsRUFBMkI7O0FBQzNCLElBQUlDLGlCQUFpQixHQUFDLEtBQXRCLEVBQTZCOztBQUM3QixJQUFJQyxpQkFBaUIsR0FBQyxLQUF0QixFQUE2Qjs7QUFDN0IsSUFBSUMsaUJBQWlCLEdBQUMsS0FBdEI7QUFDQSxJQUFJQyxjQUFjLEdBQUMsS0FBbkI7QUFFQSxJQUFJQyxVQUFVLEdBQUMsS0FBZjtBQUNBLElBQUlDLGdCQUFnQixHQUFDLENBQUMsQ0FBdEI7QUFDQSxJQUFJQyxZQUFZLEdBQ2hCLENBQ0ksd0NBREosRUFFSSwwQkFGSixFQUdJLDJCQUhKLEVBSUksd0NBSkosRUFLSSxnREFMSixDQURBO0FBU0EsSUFBSUMsb0JBQW9CLEdBQUMsSUFBekI7QUFFQSxJQUFJQyxXQUFXLEdBQUMvRSxFQUFFLENBQUNNLEtBQUgsQ0FBUztBQUNyQkMsRUFBQUEsSUFBSSxFQUFDLGFBRGdCO0FBRXJCLGFBQVNQLEVBQUUsQ0FBQ2dGLFNBRlM7QUFHckJ4RSxFQUFBQSxVQUFVLEVBQUU7QUFDUnlFLElBQUFBLGNBQWMsRUFBRTtBQUNaLGlCQUFTLEVBREc7QUFFWnJFLE1BQUFBLElBQUksRUFBRSxDQUFDd0IsVUFBRCxDQUZNO0FBR1p2QixNQUFBQSxZQUFZLEVBQUUsSUFIRjtBQUlaQyxNQUFBQSxPQUFPLEVBQUU7QUFKRyxLQURSO0FBTVJvRSxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUSxJQURBO0FBRVJ0RSxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ21GLElBRkQ7QUFHUnRFLE1BQUFBLFlBQVksRUFBRSxJQUhOO0FBSVJDLE1BQUFBLE9BQU8sRUFBQztBQUpBLEtBTko7QUFXUnNFLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFRLElBREE7QUFFUnhFLE1BQUFBLElBQUksRUFBRVosRUFBRSxDQUFDbUYsSUFGRDtBQUdSdEUsTUFBQUEsWUFBWSxFQUFFLElBSE47QUFJUkMsTUFBQUEsT0FBTyxFQUFDO0FBSkEsS0FYSjtBQWdCUnVFLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFRLEVBREM7QUFFVHpFLE1BQUFBLElBQUksRUFBRSxDQUFDWixFQUFFLENBQUNtRixJQUFKLENBRkc7QUFHVHRFLE1BQUFBLFlBQVksRUFBRSxJQUhMO0FBSVRDLE1BQUFBLE9BQU8sRUFBQztBQUpDLEtBaEJMO0FBcUJSd0UsSUFBQUEsY0FBYyxFQUFFO0FBQ1osaUJBQVEsRUFESTtBQUVaMUUsTUFBQUEsSUFBSSxFQUFFLENBQUNaLEVBQUUsQ0FBQ21GLElBQUosQ0FGTTtBQUdadEUsTUFBQUEsWUFBWSxFQUFFLElBSEY7QUFJWkMsTUFBQUEsT0FBTyxFQUFDO0FBSkksS0FyQlI7QUEwQlJ5RSxJQUFBQSxrQkFBa0IsRUFBRTtBQUNoQixpQkFBUSxFQURRO0FBRWhCM0UsTUFBQUEsSUFBSSxFQUFFLENBQUNaLEVBQUUsQ0FBQ21GLElBQUosQ0FGVTtBQUdoQnRFLE1BQUFBLFlBQVksRUFBRSxJQUhFO0FBSWhCQyxNQUFBQSxPQUFPLEVBQUM7QUFKUTtBQTFCWixHQUhTO0FBbUNyQjBFLEVBQUFBLE9BQU8sRUFBRTtBQUNMcEQsSUFBQUEsVUFBVSxFQUFFQSxVQURQO0FBRUwvQixJQUFBQSxZQUFZLEVBQUNBLFlBRlI7QUFHTE4sSUFBQUEsZ0JBQWdCLEVBQUNBLGdCQUhaO0FBSUwwRixJQUFBQSxRQUFRLEVBQUM7QUFKSixHQW5DWTtBQTBDckI7O0FBRUE7Ozs7OztBQU1BQyxFQUFBQSxNQWxEcUIsb0JBa0RYO0FBQ05YLElBQUFBLFdBQVcsQ0FBQ1UsUUFBWixHQUFxQixJQUFyQjtBQUNBLFNBQUtFLFVBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxTQUFLQyxhQUFMLEdBQW1CLEtBQW5CO0FBQ0E1QixJQUFBQSxjQUFjLEdBQUMsRUFBZjtBQUNBLFNBQUs2QixlQUFMO0FBQ0EsU0FBS0MsZ0JBQUw7QUFFQSxTQUFLQyxlQUFMLEdBQXFCLENBQXJCO0FBQ0EsU0FBS0MsV0FBTCxHQUFpQixDQUFqQjtBQUNBLFNBQUtDLGFBQUwsR0FBbUIsS0FBbkI7QUFDQXhCLElBQUFBLGlCQUFpQixHQUFDLEtBQWxCO0FBQ0gsR0E5RG9COztBQWdFckI7Ozs7OztBQU1Bb0IsRUFBQUEsZUF0RXFCLDZCQXVFcEI7QUFDRyxRQUFHLENBQUM5Qix3QkFBRCxJQUE2QkEsd0JBQXdCLElBQUUsSUFBMUQsRUFDQUEsd0JBQXdCLEdBQUNtQyxPQUFPLENBQUMsMEJBQUQsQ0FBaEM7QUFDRixHQTFFbUI7O0FBNEVyQjs7Ozs7O0FBTUFKLEVBQUFBLGdCQWxGcUIsOEJBa0ZEO0FBQ2hCLFNBQUtLLE1BQUwsR0FBWSxLQUFLZixVQUFMLENBQWdCZ0IsWUFBaEIsQ0FBNkJwRyxFQUFFLENBQUNtRyxNQUFoQyxDQUFaO0FBQ0EsU0FBS0UsZUFBTCxHQUFxQixLQUFyQjtBQUNBLFNBQUtwQixjQUFMLEdBQW9CLEVBQXBCO0FBQ0F0QixJQUFBQSxXQUFXLEdBQUMsQ0FBWjtBQUNBQyxJQUFBQSxRQUFRLEdBQUMsQ0FBVDtBQUNBQyxJQUFBQSxRQUFRLEdBQUMsQ0FBVCxDQU5nQixDQVFoQjs7QUFDQSxRQUFHRSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERDLGFBQTlELE1BQStFLElBQWxGLEVBQ0E7QUFDSUMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksc0NBQW9DMUMsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThESSxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0ZDLGlCQUF0RixDQUF3RyxjQUF4RyxDQUFoRCxFQURKLENBRUk7O0FBQ0EsVUFBRzdDLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4REksWUFBOUQsR0FBNkVDLE1BQTdFLEdBQXNGQyxpQkFBdEYsQ0FBd0csY0FBeEcsS0FBeUgsSUFBNUgsRUFDQTtBQUNJN0MsUUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxHQUEwREMsb0NBQTFELENBQStGLElBQS9GO0FBQ0EsWUFBSUMsT0FBTyxHQUFDaEQsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThESSxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0ZDLGlCQUF0RixDQUF3RyxnQkFBeEcsQ0FBWjtBQUNBLGFBQUszQixjQUFMLEdBQW9COEIsT0FBcEI7QUFFQVAsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS3hCLGNBQWpCO0FBRUFsQixRQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERVLFVBQTlELEdBQXlFLEtBQUsvQixjQUFMLENBQW9CZ0MsTUFBN0YsQ0FQSixDQVFJOztBQUNBLGFBQUtDLDJCQUFMO0FBQ0EsYUFBS3ZCLFVBQUwsR0FBZ0I1Qix3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERJLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRkMsaUJBQXRGLENBQXdHLFlBQXhHLENBQWhCO0FBQ0EsYUFBS08sWUFBTCxDQUFrQixJQUFsQixFQUF1QixLQUFLeEIsVUFBNUI7QUFDSCxPQWJELE1BZUE7QUFDSTVCLFFBQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQixxQkFBbEMsR0FBMERDLG9DQUExRCxDQUErRixJQUEvRjtBQUNBL0MsUUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxHQUEwRE8sMEJBQTFEO0FBQ0g7QUFDSixLQXZCRCxNQXlCQTtBQUNJckQsTUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxHQUEwRFEsOEJBQTFELENBQXlGLElBQXpGO0FBQ0g7QUFDSixHQXZIb0I7QUF5SHJCO0FBQ0FDLEVBQUFBLGFBMUhxQiwyQkEwSEo7QUFDYixXQUFPLEtBQUszQixVQUFaO0FBQ0gsR0E1SG9CO0FBNkhyQjtBQUVBO0FBRUF1QixFQUFBQSwyQkFqSXFCLHlDQWtJckI7QUFDSSxRQUFJSCxPQUFPLEdBQUNoRCx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERJLFlBQTlELEdBQTZFQyxNQUE3RSxHQUFzRkMsaUJBQXRGLENBQXdHLGdCQUF4RyxDQUFaO0FBQ0EsU0FBSzNCLGNBQUwsR0FBb0I4QixPQUFwQjtBQUNBLFNBQUtRLHdCQUFMLENBQThCLENBQTlCO0FBQ0F4RCxJQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERVLFVBQTlELEdBQXlFLEtBQUsvQixjQUFMLENBQW9CZ0MsTUFBN0Y7QUFDQSxTQUFLTyxrQkFBTDtBQUNBekQsSUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxHQUEwRFksK0JBQTFEOztBQUdBLFNBQUssSUFBSUMsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBS3pDLGNBQUwsQ0FBb0JnQyxNQUFoRCxFQUF3RFMsS0FBSyxFQUE3RCxFQUFpRTtBQUM3RCxVQUFJQyxNQUFNLEdBQUMzSCxFQUFFLENBQUM0SCxJQUFILENBQVE3RCx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0MsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRCxLQUFLN0MsY0FBTCxDQUFvQnlDLEtBQXBCLEVBQTJCcEUsaUJBQXJGLEVBQXdHeUUsaUJBQXhHLENBQTBIQyxRQUExSCxDQUFtSUMsQ0FBM0ksRUFBNklsRSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0MsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRCxLQUFLN0MsY0FBTCxDQUFvQnlDLEtBQXBCLEVBQTJCcEUsaUJBQXJGLEVBQXdHeUUsaUJBQXhHLENBQTBIQyxRQUExSCxDQUFtSUUsQ0FBaFIsQ0FBWDs7QUFDQSxXQUFLNUMsY0FBTCxDQUFvQm9DLEtBQXBCLEVBQTJCUyxXQUEzQixDQUF1Q1IsTUFBTSxDQUFDTSxDQUE5QyxFQUFnRE4sTUFBTSxDQUFDTyxDQUF2RDtBQUNIOztBQUVEMUIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksb0JBQVo7O0FBRUEsU0FBSyxJQUFJaUIsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUczRCx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERVLFVBQTFGLEVBQXNHVSxPQUFLLEVBQTNHLEVBQStHO0FBQzNHLFdBQUtwQyxjQUFMLENBQW9Cb0MsT0FBcEIsRUFBMkJVLE1BQTNCLEdBQWtDLElBQWxDO0FBQ0g7QUFDSixHQXJKb0I7QUF1SnJCQyxFQUFBQSx3Q0F2SnFCLHNEQXdKckI7QUFDRSxRQUFJQyxxQkFBcUIsR0FBQ3ZFLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4REksWUFBOUQsR0FBNkU2QixnQkFBN0UsRUFBMUI7O0FBQ0EsUUFBR3ZFLGNBQWMsQ0FBQ2lELE1BQWYsSUFBdUJxQixxQkFBMUIsRUFDQTtBQUNFdEUsTUFBQUEsY0FBYyxHQUFDLEVBQWY7QUFDQSxXQUFLNEIsYUFBTCxHQUFtQixJQUFuQjs7QUFFQSxVQUFHLEtBQUtYLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUNyRCxTQUFyQyxJQUFnRHlCLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZYLElBQTdGLENBQWtHWSxNQUFySixFQUNBO0FBQ0ksYUFBS3pELGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUNyQyxpQkFBckMsR0FBdURLLFdBQXZEO0FBQ0FJLFFBQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEdBQTRFRyxpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUsxRCxjQUFMLENBQW9CLEtBQUtVLFVBQXpCLENBQW5IO0FBQ0EsYUFBS2lELFVBQUw7QUFDQXBDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMUMsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThEa0MsV0FBOUQsRUFBWjtBQUNBaEMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQTZCLEtBQUt4QixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDdEQsVUFBOUU7QUFDSDtBQUNGO0FBRUYsR0F6S29CO0FBMktyQjtBQUdBOztBQUVEOzs7Ozs7QUFNRHdHLEVBQUFBLGlCQXRMdUIsNkJBc0xMQyxLQXRMSyxFQXVMdkI7QUFDTS9FLElBQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NzRCwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTRFRixLQUE1RTtBQUNMLEdBekxzQjtBQTJMdkJHLEVBQUFBLG1CQTNMdUIsaUNBNEx2QjtBQUNFQyxJQUFBQSxZQUFZLENBQUNwRSxvQkFBRCxDQUFaO0FBQ0QsR0E5THNCO0FBZ012QnFFLEVBQUFBLG1CQWhNdUIsaUNBaU12QjtBQUFBOztBQUNFM0MsSUFBQUEsT0FBTyxDQUFDNEMsS0FBUixDQUFjM0UsaUJBQWQ7O0FBQ0EsUUFBR0EsaUJBQWlCLElBQUUsSUFBdEIsRUFDQTtBQUNJeUUsTUFBQUEsWUFBWSxDQUFDcEUsb0JBQUQsQ0FBWjtBQUNBMEIsTUFBQUEsT0FBTyxDQUFDNEMsS0FBUixDQUFjLEtBQUtwRCxXQUFuQjtBQUNBdkIsTUFBQUEsaUJBQWlCLEdBQUMsS0FBbEI7O0FBQ0EsVUFBRyxDQUFDLEtBQUt3QixhQUFULEVBQ0E7QUFDSSxhQUFLQSxhQUFMLEdBQW1CLElBQW5CO0FBQ0FsQyxRQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0MsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRCxLQUFLOUIsV0FBL0QsRUFBNEUrQixpQkFBNUUsQ0FBOEYzQixZQUE5RixDQUEyRyxjQUEzRyxFQUEySGlELGVBQTNILENBQTJJLEtBQTNJLEVBQWlKLEtBQUt0RCxlQUF0SjtBQUNIO0FBQ0osS0FWRCxNQVlBO0FBQ0lqQixNQUFBQSxvQkFBb0IsR0FBQ3dFLFVBQVUsQ0FBQyxZQUFNO0FBQUU7QUFDcEMsUUFBQSxLQUFJLENBQUNILG1CQUFMO0FBQ0gsT0FGOEIsRUFFNUIsR0FGNEIsQ0FBL0I7QUFHSDtBQUNGLEdBcE5zQjtBQXNOdkJJLEVBQUFBLGdCQXROdUIsOEJBdU52QjtBQUNFLFNBQUt0RCxhQUFMLEdBQW1CLEtBQW5CO0FBQ0QsR0F6TnNCO0FBMk52QnVELEVBQUFBLG1CQTNOdUIsK0JBMk5IVixLQTNORyxFQTROdkI7QUFFRSxTQUFLakQsZUFBTDtBQUNBVyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXFDLEtBQVo7QUFFQSxRQUFJVyxVQUFVLEdBQUNYLEtBQUssQ0FBQ1ksVUFBckI7QUFDQSxRQUFJQyxPQUFPLEdBQUNiLEtBQUssQ0FBQ2EsT0FBbEI7QUFFQSxTQUFLNUQsZUFBTCxHQUFxQjBELFVBQXJCO0FBQ0EsU0FBS3pELFdBQUwsR0FBaUIyRCxPQUFqQjtBQUdBbkQsSUFBQUEsT0FBTyxDQUFDNEMsS0FBUixDQUFjM0UsaUJBQWQ7O0FBQ0EsUUFBRyxLQUFLUSxjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDckQsU0FBckMsSUFBZ0R5Qix3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERrQyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGWCxJQUE3RixDQUFrR1ksTUFBckosRUFDQTtBQUNJM0UsTUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29DLGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMEQ2QixPQUExRCxFQUFtRTVCLGlCQUFuRSxDQUFxRjNCLFlBQXJGLENBQWtHLGNBQWxHLEVBQWtIaUQsZUFBbEgsQ0FBa0ksSUFBbEksRUFBdUlJLFVBQXZJO0FBQ0gsS0FIRCxNQUtBO0FBQ0loRixNQUFBQSxpQkFBaUIsR0FBQyxJQUFsQixDQURKLENBRUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUVEK0IsSUFBQUEsT0FBTyxDQUFDNEMsS0FBUixDQUFjM0UsaUJBQWQ7QUFHRCxHQTFQc0I7O0FBNFB0Qjs7Ozs7O0FBTURtRixFQUFBQSxzQkFsUXVCLG9DQW1RdkI7QUFDRSxRQUFHN0Ysd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThEa0MsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2Rm9CLGNBQTdGLENBQTRHQyxVQUE1RyxJQUF3SCxLQUEzSCxFQUNBO0FBQ0UvRixNQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDc0QsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE0RWpGLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZYLElBQTdGLENBQWtHWSxNQUE5SztBQUNEO0FBQ0YsR0F4UXNCO0FBMlF2QnFCLEVBQUFBLFdBM1F1Qix5QkE0UXZCO0FBQ0UsUUFBRyxLQUFLOUUsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3JELFNBQXJDLElBQWdEeUIsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThEa0MsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RlgsSUFBN0YsQ0FBa0dZLE1BQXJKLEVBQ0E7QUFDSTNFLE1BQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEdBQTRFRyxpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUsxRCxjQUFMLENBQW9CLEtBQUtVLFVBQXpCLENBQW5IO0FBQ0g7QUFDSixHQWpSd0I7O0FBbVJ2Qjs7Ozs7O0FBTUFxRSxFQUFBQSx3QkF6UnVCLG9DQXlSRUMsSUF6UkYsRUEwUnZCO0FBQ0ksUUFBR2xHLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZvQixjQUE3RixDQUE0R0MsVUFBNUcsSUFBd0gsS0FBM0gsRUFDQTtBQUNFdEQsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl6QyxjQUFjLENBQUNpRCxNQUEzQjtBQUVBLFVBQUdqRCxjQUFjLENBQUNpRCxNQUFmLElBQXVCLENBQTFCLEVBQ1FqRCxjQUFjLENBQUNrRyxJQUFmLENBQW9CRCxJQUFwQjtBQUVSLFVBQUlFLFdBQVcsR0FBQ25HLGNBQWMsQ0FBQ2lELE1BQS9CO0FBQ0EsVUFBSW1ELE9BQU8sR0FBQyxLQUFaOztBQUNBLFdBQUssSUFBSTFDLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHeUMsV0FBNUIsRUFBeUN6QyxLQUFLLEVBQTlDLEVBQWtEO0FBQzFDLFlBQUcxRCxjQUFjLENBQUMwRCxLQUFELENBQWQsSUFBdUJ1QyxJQUExQixFQUNBRyxPQUFPLEdBQUMsSUFBUjtBQUNQOztBQUVELFVBQUcsQ0FBQ0EsT0FBSixFQUNBO0FBQ0lwRyxRQUFBQSxjQUFjLENBQUNrRyxJQUFmLENBQW9CRCxJQUFwQjtBQUNIOztBQUNEekQsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl6QyxjQUFaO0FBQ0F3QyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXpDLGNBQWMsQ0FBQ2lELE1BQTNCLEVBbEJGLENBb0JFOztBQUNBLFVBQUlxQixxQkFBcUIsR0FBQyxLQUFLckQsY0FBTCxDQUFvQmdDLE1BQTlDOztBQUNBLFVBQUdqRCxjQUFjLENBQUNpRCxNQUFmLElBQXVCcUIscUJBQTFCLEVBQ0E7QUFDSXRFLFFBQUFBLGNBQWMsR0FBQyxFQUFmO0FBQ0EsYUFBSzRCLGFBQUwsR0FBbUIsSUFBbkI7O0FBRUEsWUFBRyxLQUFLWCxjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDckQsU0FBckMsSUFBZ0R5Qix3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERrQyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGWCxJQUE3RixDQUFrR1ksTUFBckosRUFDQTtBQUNJLGVBQUt6RCxjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDckMsaUJBQXJDLEdBQXVESyxXQUF2RCxDQURKLENBRUk7O0FBQ0EsZUFBS2lGLFVBQUw7QUFDQXBDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMUMsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThEa0MsV0FBOUQsRUFBWjtBQUNBaEMsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQTZCLEtBQUt4QixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDdEQsVUFBOUU7QUFDSDtBQUNKO0FBQ0o7QUFDRixHQWpVc0I7O0FBbVV0Qjs7Ozs7O0FBTUN1RyxFQUFBQSxVQXpVcUIsd0JBMFVyQjtBQUNJLFNBQUttQixXQUFMO0FBRUEsUUFBRyxLQUFLcEUsVUFBTCxHQUFnQixLQUFLVixjQUFMLENBQW9CZ0MsTUFBcEIsR0FBMkIsQ0FBOUMsRUFDSSxLQUFLdEIsVUFBTCxHQUFnQixLQUFLQSxVQUFMLEdBQWdCLENBQWhDLENBREosS0FHSSxLQUFLQSxVQUFMLEdBQWdCLENBQWhCO0FBRUo1QixJQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDc0QsMEJBQWxDLEdBQStEQyxVQUEvRCxDQUEwRSxDQUExRSxFQUE0RSxLQUFLckQsVUFBakY7QUFDSCxHQW5Wb0I7O0FBcVZyQjs7Ozs7O0FBTUEwRSxFQUFBQSxXQTNWcUIsdUJBMlZUQyxLQTNWUyxFQTRWckI7QUFBQTs7QUFDSSxRQUFJQyxjQUFjLEdBQUMsS0FBbkI7QUFDQWxHLElBQUFBLGFBQWEsR0FBQyxLQUFkOztBQUNBLFFBQUdQLFVBQUgsRUFBZTtBQUNmO0FBQ0l3RixRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLFVBQUEsTUFBSSxDQUFDZSxXQUFMLENBQWlCQyxLQUFqQjtBQUNILFNBRlMsRUFFUCxHQUZPLENBQVY7QUFHSCxPQUxELE1BT0E7QUFFSSxXQUFLM0UsVUFBTCxHQUFnQjJFLEtBQWhCOztBQUNBLFVBQUcsS0FBS3JGLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUNyRCxTQUFyQyxJQUFnRHlCLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZYLElBQTdGLENBQWtHWSxNQUFySixFQUNBO0FBQ0ksYUFBSzhCLGtCQUFMLENBQXdCLElBQXhCO0FBQ0FELFFBQUFBLGNBQWMsR0FBQyxJQUFmO0FBQ0FsRyxRQUFBQSxhQUFhLEdBQUMsS0FBS1ksY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ2pELGlCQUFyQyxDQUF1RFosWUFBckU7O0FBQ0EsWUFBRyxDQUFDdUMsYUFBSixFQUNBO0FBQ0lpRixVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNidkYsWUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxHQUEwRDRELDJCQUExRCxDQUFzRixJQUF0RjtBQUNBMUcsWUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxHQUEwRDZELGlCQUExRDtBQUNILFdBSFMsRUFHUCxJQUhPLENBQVY7QUFJQWxFLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFpQixLQUFLeEIsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3RELFVBQWxFO0FBQ0g7QUFDSixPQWJELE1BZUE7QUFDSSxhQUFLbUksa0JBQUwsQ0FBd0IsS0FBeEI7QUFDSDs7QUFFRCxXQUFLckQsWUFBTCxDQUFrQixJQUFsQixFQUF1QixLQUFLeEIsVUFBNUI7O0FBRUEsV0FBSyxJQUFJK0IsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBS3JDLFdBQUwsQ0FBaUI0QixNQUE3QyxFQUFxRFMsS0FBSyxFQUExRCxFQUE4RDtBQUMxRCxhQUFLckMsV0FBTCxDQUFpQnFDLEtBQWpCLEVBQXdCdEIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEdUUsY0FBN0QsQ0FBNEV2QyxNQUE1RSxHQUFtRixLQUFuRjtBQUNIOztBQUVEckUsTUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThESSxZQUE5RCxHQUE2RUMsTUFBN0UsR0FBc0ZnQyxpQkFBdEYsQ0FBd0csWUFBeEcsRUFBcUgsS0FBS2hELFVBQTFILEVBQXFJLElBQXJJO0FBQ0FhLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVksS0FBS3hCLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUN0RCxVQUE3RDtBQUNBbUUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS3BCLFdBQUwsQ0FBaUIsS0FBS00sVUFBdEIsRUFBa0NTLFlBQWxDLENBQStDLHNCQUEvQyxFQUF1RXdFLFVBQW5GO0FBQ0FwRSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTFDLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEVBQVo7QUFDQWhDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMUMsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThEdUUsVUFBOUQsRUFBWjtBQUNBLFdBQUt0RCx3QkFBTCxDQUE4QixDQUE5QixFQWpDSixDQW9DSTs7QUFDQSxVQUFHeEQsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThEa0MsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2Rm9CLGNBQTdGLENBQTRHQyxVQUE1RyxJQUF3SCxJQUEzSCxFQUNJLEtBQUs1QywyQkFBTCxHQXRDUixDQXdDSTs7QUFDQSxVQUFHcUQsY0FBYyxJQUFJbEcsYUFBckIsRUFDQTtBQUNJUCxRQUFBQSxVQUFVLEdBQUMsS0FBWDtBQUNBQyxRQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FBb0UsdUJBQXBFLEVBQTRGLElBQTVGO0FBQ0EsYUFBS0Msa0JBQUwsQ0FBd0IsS0FBeEI7QUFDQSxhQUFLbkMsVUFBTDtBQUNBLGFBQUs0QixrQkFBTCxDQUF3QixLQUF4QjtBQUNIOztBQUVELFVBQUdELGNBQWMsSUFBSSxLQUFLdEYsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ25DLGNBQTFELEVBQ0E7QUFDSU0sUUFBQUEsVUFBVSxHQUFDLEtBQVg7QUFDQSxhQUFLOEUsVUFBTDtBQUNBLGFBQUs0QixrQkFBTCxDQUF3QixLQUF4QjtBQUNIO0FBRUo7QUFDSixHQWhhb0I7QUFrYXJCakQsRUFBQUEsd0JBbGFxQixvQ0FrYUl5RCxJQWxhSixFQW1hckI7QUFDSSxRQUFJQyxlQUFlLEdBQUNsSCx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOER1RSxVQUE5RCxFQUFwQjtBQUNBLFFBQUlLLE1BQU0sR0FBQ25ILHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEVBQVg7QUFDQSxRQUFJMkMsUUFBUSxHQUFDSCxJQUFiO0FBQ0F4RSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLeEIsY0FBTCxDQUFvQmtHLFFBQXBCLEVBQThCN0ksU0FBMUM7QUFDQWtFLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZeUUsTUFBTSxDQUFDekMsZ0JBQVAsQ0FBd0IyQyxpQkFBeEIsQ0FBMEM5SSxTQUF0RDs7QUFDQSxRQUFHLEtBQUsyQyxjQUFMLENBQW9Ca0csUUFBcEIsRUFBOEI3SSxTQUE5QixJQUF5QzRJLE1BQU0sQ0FBQ3pDLGdCQUFQLENBQXdCMkMsaUJBQXhCLENBQTBDOUksU0FBdEYsRUFBaUc7QUFDakc7QUFDSSxhQUFLLElBQUlvRixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3VELGVBQWUsQ0FBQ2hFLE1BQTVDLEVBQW9EUyxLQUFLLEVBQXpELEVBQTZEO0FBQ3JELGNBQUcsS0FBS3pDLGNBQUwsQ0FBb0JrRyxRQUFwQixFQUE4QjdJLFNBQTlCLElBQXlDMkksZUFBZSxDQUFDdkQsS0FBRCxDQUFmLENBQXVCZSxnQkFBdkIsQ0FBd0MyQyxpQkFBeEMsQ0FBMEQ5SSxTQUF0RyxFQUNBO0FBQ0ksaUJBQUsyQyxjQUFMLENBQW9Ca0csUUFBcEIsSUFBOEJGLGVBQWUsQ0FBQ3ZELEtBQUQsQ0FBZixDQUF1QmUsZ0JBQXZCLENBQXdDMkMsaUJBQXRFOztBQUVBLGdCQUFHRCxRQUFRLEdBQUMsS0FBS2xHLGNBQUwsQ0FBb0JnQyxNQUFwQixHQUEyQixDQUF2QyxFQUNBO0FBQ0lrRSxjQUFBQSxRQUFRO0FBQ1IzRSxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBbUIwRSxRQUEvQjtBQUNBLG1CQUFLNUQsd0JBQUwsQ0FBOEI0RCxRQUE5QjtBQUNILGFBTEQsTUFNSTtBQUNBM0UsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS3hCLGNBQWpCO0FBQ0g7QUFDSjtBQUNKO0FBQ1IsT0FsQkQsTUFvQkk7QUFDSSxVQUFHa0csUUFBUSxHQUFDLEtBQUtsRyxjQUFMLENBQW9CZ0MsTUFBcEIsR0FBMkIsQ0FBdkMsRUFDSTtBQUNJa0UsUUFBQUEsUUFBUTtBQUNSM0UsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQW1CMEUsUUFBL0I7QUFDQSxhQUFLNUQsd0JBQUwsQ0FBOEI0RCxRQUE5QjtBQUNILE9BTEwsTUFNSTtBQUNJM0UsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS3hCLGNBQWpCO0FBQ0g7QUFDUjtBQUNSLEdBeGNvQjs7QUEwY3JCOzs7Ozs7QUFNQW9HLEVBQUFBLFNBaGRxQix1QkFpZHJCO0FBQ0ksU0FBSzdELGtCQUFMO0FBQ0EsU0FBSzhELGlCQUFMO0FBQ0EsU0FBSzNGLFVBQUwsR0FBZ0IsQ0FBaEIsQ0FISixDQUd1QjtBQUVuQjs7QUFDQTVCLElBQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NzRCwwQkFBbEMsR0FBK0RDLFVBQS9ELENBQTBFLENBQTFFLEVBQTRFLEtBQUtyRCxVQUFqRjtBQUNILEdBeGRvQjtBQXlkckI7QUFHQTs7QUFDQzs7Ozs7O0FBTUQ2QixFQUFBQSxrQkFuZXFCLGdDQW9lckI7QUFDSSxTQUFLLElBQUlFLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHM0Qsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThEVSxVQUExRixFQUFzR1UsS0FBSyxFQUEzRyxFQUErRztBQUMzRyxXQUFLckMsV0FBTCxDQUFpQnFDLEtBQWpCLEVBQXdCVSxNQUF4QixHQUErQixJQUEvQjtBQUNBLFdBQUsvQyxXQUFMLENBQWlCcUMsS0FBakIsRUFBd0J0QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkR3RSxVQUE3RCxHQUF3RSxLQUFLM0YsY0FBTCxDQUFvQnlDLEtBQXBCLENBQXhFO0FBQ0EsV0FBS3JDLFdBQUwsQ0FBaUJxQyxLQUFqQixFQUF3QnRCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RG1GLE9BQTdELENBQXFFLEtBQUt0RyxjQUFMLENBQW9CeUMsS0FBcEIsRUFBMkJyRixVQUFoRztBQUNIO0FBQ0osR0ExZW9CO0FBNGVyQjhFLEVBQUFBLFlBNWVxQix3QkE0ZVJxRSxnQkE1ZVEsRUE0ZVNDLE1BNWVULEVBNmVyQjtBQUNJLFFBQUdELGdCQUFILEVBQ0E7QUFDSSxXQUFLbkcsV0FBTCxDQUFpQm9HLE1BQWpCLEVBQXlCckYsWUFBekIsQ0FBc0Msc0JBQXRDLEVBQThEd0UsVUFBOUQsR0FBeUUsS0FBSzNGLGNBQUwsQ0FBb0J3RyxNQUFwQixDQUF6RTs7QUFFQSxXQUFLLElBQUkvRCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRzNELHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RFUsVUFBMUYsRUFBc0dVLEtBQUssRUFBM0csRUFBK0c7QUFDM0csWUFBRytELE1BQU0sSUFBRS9ELEtBQVgsRUFDQTtBQUNJLGVBQUtyQyxXQUFMLENBQWlCcUMsS0FBakIsRUFBd0J0QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkRzRixtQkFBN0QsQ0FBaUYsSUFBakY7QUFDQSxlQUFLckcsV0FBTCxDQUFpQnFDLEtBQWpCLEVBQXdCdEIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEdUYsb0JBQTdELENBQWtGLElBQWxGO0FBQ0gsU0FKRCxNQU1BO0FBQ0ksZUFBS3RHLFdBQUwsQ0FBaUJxQyxLQUFqQixFQUF3QnRCLFlBQXhCLENBQXFDLHNCQUFyQyxFQUE2RHNGLG1CQUE3RCxDQUFpRixLQUFqRjtBQUNBLGVBQUtyRyxXQUFMLENBQWlCcUMsS0FBakIsRUFBd0J0QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkR1RixvQkFBN0QsQ0FBa0YsS0FBbEY7QUFDSDtBQUNKO0FBQ0o7QUFDSixHQS9mb0I7O0FBaWdCcEI7Ozs7OztBQU1ETCxFQUFBQSxpQkF2Z0JxQiwrQkF3Z0JyQjtBQUNJLFNBQUssSUFBSTVELEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHLEtBQUt6QyxjQUFMLENBQW9CZ0MsTUFBaEQsRUFBd0RTLEtBQUssRUFBN0QsRUFBaUU7QUFDN0QsVUFBRyxLQUFLekMsY0FBTCxDQUFvQnlDLEtBQXBCLEVBQTJCL0UsZUFBM0IsSUFBNEMsQ0FBL0MsRUFDSSxLQUFLMkMsY0FBTCxDQUFvQm9DLEtBQXBCLEVBQTJCUyxXQUEzQixDQUF1QyxLQUFLNUMsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkJ5QyxRQUEzQixDQUFvQ0MsQ0FBM0UsRUFBNkUsS0FBSzFDLGtCQUFMLENBQXdCLENBQXhCLEVBQTJCeUMsUUFBM0IsQ0FBb0NFLENBQWpILEVBREosS0FFSyxJQUFHLEtBQUtqRCxjQUFMLENBQW9CeUMsS0FBcEIsRUFBMkI5RSxvQkFBM0IsSUFBaUQsQ0FBcEQsRUFDRCxLQUFLMEMsY0FBTCxDQUFvQm9DLEtBQXBCLEVBQTJCUyxXQUEzQixDQUF1QyxLQUFLNUMsa0JBQUwsQ0FBd0IsQ0FBeEIsRUFBMkJ5QyxRQUEzQixDQUFvQ0MsQ0FBM0UsRUFBNkUsS0FBSzFDLGtCQUFMLENBQXdCLENBQXhCLEVBQTJCeUMsUUFBM0IsQ0FBb0NFLENBQWpIO0FBQ1A7O0FBRUQsU0FBSyxJQUFJUixPQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE9BQUssR0FBRzNELHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RFUsVUFBMUYsRUFBc0dVLE9BQUssRUFBM0csRUFBK0c7QUFDM0csV0FBS3BDLGNBQUwsQ0FBb0JvQyxPQUFwQixFQUEyQlUsTUFBM0IsR0FBa0MsSUFBbEM7QUFDSDtBQUNKLEdBbmhCb0I7QUFxaEJyQndELEVBQUFBLHlCQXJoQnFCLHVDQXNoQnJCO0FBQ0ksUUFBSUMsU0FBUyxHQUFDLEtBQUt2RyxjQUFMLENBQW9CLEtBQUtLLFVBQXpCLEVBQXFDbUcscUJBQXJDLENBQTJEOUwsRUFBRSxDQUFDNEgsSUFBSCxDQUFRLENBQVIsRUFBVSxHQUFWLENBQTNELENBQWQ7QUFDQSxTQUFLeEMsVUFBTCxDQUFnQjRDLFFBQWhCLEdBQXlCLEtBQUs1QyxVQUFMLENBQWdCMkcsTUFBaEIsQ0FBdUJDLG9CQUF2QixDQUE0Q0gsU0FBNUMsQ0FBekI7QUFFQSxRQUFJSSxLQUFLLEdBQUNKLFNBQVMsQ0FBQzNELENBQVYsR0FBWWxJLEVBQUUsQ0FBQ2tNLE9BQUgsQ0FBV0MsTUFBakM7QUFDQSxTQUFLaEcsTUFBTCxDQUFZaUcsU0FBWixHQUFzQixDQUF0QjtBQUNILEdBNWhCb0I7QUE4aEJyQkMsRUFBQUEsVUE5aEJxQix3QkE4aEJQO0FBQ1YsUUFBRyxLQUFLaEcsZUFBUixFQUNJLEtBQUt1Rix5QkFBTDtBQUNQLEdBamlCb0I7QUFtaUJyQlUsRUFBQUEsWUFuaUJxQix3QkFtaUJSQyxLQW5pQlEsRUFvaUJyQjtBQUNJLFFBQUlDLE1BQU0sR0FBQ0QsS0FBSyxDQUFDRSxLQUFqQjtBQUNBLFFBQUlDLE1BQU0sR0FBQ0gsS0FBSyxDQUFDSSxLQUFqQjs7QUFDQSxRQUFJQyxPQUFPLEdBQUNKLE1BQU0sR0FBQ0UsTUFBbkI7O0FBRUE1SSxJQUFBQSxVQUFVLEdBQUMsSUFBWDtBQUNBLFNBQUttQyxhQUFMLEdBQW1CLEtBQW5COztBQUVBLFNBQUssSUFBSXlCLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHM0Qsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThESSxZQUE5RCxHQUE2RW1HLGlCQUE3RSxHQUFpRzVGLE1BQTdILEVBQXFJUyxLQUFLLEVBQTFJLEVBQThJO0FBQzFJLFVBQUczRCx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERJLFlBQTlELEdBQTZFbUcsaUJBQTdFLEdBQWlHbkYsS0FBakcsRUFBd0dlLGdCQUF4RyxDQUF5SFgsSUFBekgsQ0FBOEhZLE1BQTlILElBQXNJLEtBQUt6RCxjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDckQsU0FBOUssRUFDQTtBQUNJa0UsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksb0JBQWtCLEtBQUt4QixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDdEQsVUFBbkU7QUFDQSxhQUFLNEMsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3JDLGlCQUFyQyxHQUF1RFMsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThESSxZQUE5RCxHQUE2RW1HLGlCQUE3RSxHQUFpR25GLEtBQWpHLEVBQXdHZSxnQkFBeEcsQ0FBeUgyQyxpQkFBekgsQ0FBMkk5SCxpQkFBbE07QUFDSDtBQUNKOztBQUVELFFBQUcsS0FBSzJCLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUNyQyxpQkFBckMsSUFBd0QsQ0FBeEQsSUFBNkQsQ0FBQyxLQUFLMkIsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3BDLHNCQUF0RyxFQUNBO0FBQ0ksVUFBRyxLQUFLMEIsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ2xELFlBQXJDLENBQWtELENBQWxELEVBQXFEL0IsWUFBckQsSUFBbUUsQ0FBdEUsRUFDQTtBQUNJaUQsUUFBQUEsV0FBVyxHQUFDLENBQVo7QUFDQSxhQUFLc0IsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3BDLHNCQUFyQyxHQUE0RCxJQUE1RDtBQUNBaUQsUUFBQUEsT0FBTyxDQUFDNEMsS0FBUixDQUFjekYsV0FBZDtBQUNILE9BTEQsTUFPQTtBQUNJLGFBQUtzQixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDcEMsc0JBQXJDLEdBQTRELElBQTVEO0FBQ0FJLFFBQUFBLFdBQVcsR0FBQyxFQUFaO0FBQ0E2QyxRQUFBQSxPQUFPLENBQUM0QyxLQUFSLENBQWN6RixXQUFkO0FBQ0g7QUFDSixLQWRELE1BZ0JBO0FBQ0ksVUFBRyxLQUFLc0IsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3JDLGlCQUFyQyxJQUF3RCxFQUEzRCxFQUNJLEtBQUsyQixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDckMsaUJBQXJDLEdBQXVELEtBQUsyQixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDckMsaUJBQXJDLEdBQXVELEVBQTlHLENBREosS0FHSSxLQUFLMkIsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3JDLGlCQUFyQyxHQUF1RCxLQUFLMkIsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3JDLGlCQUFyQyxHQUF1RCxDQUE5RztBQUVKSyxNQUFBQSxXQUFXLEdBQUMsS0FBS3NCLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUNyQyxpQkFBakQ7QUFDQWtELE1BQUFBLE9BQU8sQ0FBQzRDLEtBQVIsQ0FBY3pGLFdBQVcsR0FBQyxDQUExQjtBQUNIOztBQUdERSxJQUFBQSxRQUFRLEdBQUMrSSxPQUFUO0FBQ0FoSixJQUFBQSxRQUFRLEdBQUMsQ0FBVDtBQUNBRyxJQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEaUcsMkJBQTFELENBQXNGakosUUFBdEY7O0FBRUEsU0FBSyxJQUFJNkQsT0FBSyxHQUFHLENBQWpCLEVBQW9CQSxPQUFLLEdBQUcsS0FBS3JDLFdBQUwsQ0FBaUI0QixNQUE3QyxFQUFxRFMsT0FBSyxFQUExRCxFQUE4RDtBQUMxRCxVQUFHLEtBQUsvQixVQUFMLElBQWlCK0IsT0FBcEIsRUFDQTtBQUNJLGFBQUtyQyxXQUFMLENBQWlCcUMsT0FBakIsRUFBd0J0QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkR1RSxjQUE3RCxDQUE0RXZDLE1BQTVFLEdBQW1GLElBQW5GOztBQUNBLGFBQUsvQyxXQUFMLENBQWlCcUMsT0FBakIsRUFBd0J0QixZQUF4QixDQUFxQyxzQkFBckMsRUFBNkR1RSxjQUE3RCxDQUE0RXZFLFlBQTVFLENBQXlGLGdCQUF6RixFQUEyRzJHLFdBQTNHLENBQXVIUCxNQUF2SCxFQUE4SEUsTUFBOUg7QUFDSCxPQUpELE1BTUE7QUFDSSxhQUFLckgsV0FBTCxDQUFpQnFDLE9BQWpCLEVBQXdCdEIsWUFBeEIsQ0FBcUMsc0JBQXJDLEVBQTZEdUUsY0FBN0QsQ0FBNEV2QyxNQUE1RSxHQUFtRixLQUFuRjtBQUNIO0FBQ0osS0F6REwsQ0EyREk7QUFDQTtBQUNBOztBQUNILEdBbG1Cb0I7QUFvbUJyQjRFLEVBQUFBLGdCQXBtQnFCLDhCQXFtQnJCO0FBQ0ksUUFBSW5CLFNBQVMsR0FBQyxLQUFLdkcsY0FBTCxDQUFvQixLQUFLSyxVQUF6QixFQUFxQ21HLHFCQUFyQyxDQUEyRDlMLEVBQUUsQ0FBQzRILElBQUgsQ0FBUSxDQUFSLEVBQVUsR0FBVixDQUEzRCxDQUFkOztBQUNBLFFBQUlxRixJQUFJLEdBQUMsS0FBSzdILFVBQUwsQ0FBZ0IyRyxNQUFoQixDQUF1QkMsb0JBQXZCLENBQTRDSCxTQUE1QyxDQUFUOztBQUNBLFNBQUtxQixXQUFMLENBQWlCRCxJQUFqQixFQUFzQixJQUF0QixFQUEyQixHQUEzQjtBQUNILEdBem1Cb0I7QUEybUJyQkUsRUFBQUEsY0EzbUJxQiwwQkEybUJOQyxRQTNtQk0sRUE0bUJyQjtBQUNJLFFBQUlDLFdBQVcsR0FBQyxDQUFoQjtBQUNBLFFBQUlDLFlBQVksR0FBQyxDQUFqQjs7QUFDQSxTQUFLLElBQUk1RixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRzNELHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4REksWUFBOUQsR0FBNkVtRyxpQkFBN0UsR0FBaUc1RixNQUE3SCxFQUFxSVMsS0FBSyxFQUExSSxFQUE4STtBQUMxSSxVQUFHM0Qsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThESSxZQUE5RCxHQUE2RW1HLGlCQUE3RSxHQUFpR25GLEtBQWpHLEVBQXdHZSxnQkFBeEcsQ0FBeUhYLElBQXpILENBQThIWSxNQUE5SCxJQUFzSSxLQUFLekQsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3JELFNBQTlLLEVBQ0E7QUFDSTtBQUNBZ0wsUUFBQUEsWUFBWSxHQUFDdkosd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThESSxZQUE5RCxHQUE2RW1HLGlCQUE3RSxHQUFpR25GLEtBQWpHLEVBQXdHZSxnQkFBeEcsQ0FBeUgyQyxpQkFBekgsQ0FBMkk5SCxpQkFBeEo7QUFDSDtBQUNKLEtBVEwsQ0FXSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUYsUUFBR2dLLFlBQVksR0FBQyxDQUFiLEdBQWUsQ0FBbEIsRUFDQTtBQUNFOUcsTUFBQUEsT0FBTyxDQUFDNEMsS0FBUixDQUFjLHdCQUFkO0FBQ0FpRSxNQUFBQSxXQUFXLEdBQUNDLFlBQVksR0FBQ0YsUUFBYixHQUFzQixDQUFsQztBQUNBLFVBQUlHLFFBQVEsR0FBQ0MsUUFBUSxDQUFDekosd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29DLGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER1RixXQUExRCxFQUF1RXRGLGlCQUF2RSxDQUF5RjNCLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIcUgsU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQXJCO0FBQ0FsSCxNQUFBQSxPQUFPLENBQUM0QyxLQUFSLENBQWMsWUFBVW1FLFFBQXhCO0FBQ0QsS0FORCxNQVFBO0FBQ0VGLE1BQUFBLFdBQVcsR0FBQ0MsWUFBWSxHQUFDRixRQUF6QjtBQUNBLFVBQUlHLFFBQVEsR0FBQ0MsUUFBUSxDQUFDekosd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29DLGdCQUFsQyxHQUFxREMsSUFBckQsQ0FBMER1RixXQUExRCxFQUF1RXRGLGlCQUF2RSxDQUF5RjNCLFlBQXpGLENBQXNHLGNBQXRHLEVBQXNIcUgsU0FBdEgsQ0FBZ0lDLFVBQWpJLENBQXJCO0FBQ0FsSCxNQUFBQSxPQUFPLENBQUM0QyxLQUFSLENBQWMsWUFBVW1FLFFBQXhCO0FBQ0Q7QUFFRixHQXpwQm9CO0FBMnBCckJJLEVBQUFBLFFBQVEsRUFBQyxvQkFDVDtBQUNJLFFBQUlDLEtBQUssR0FBQyxLQUFLQyxTQUFMLENBQWUsQ0FBZixFQUFpQixDQUFqQixDQUFWO0FBQ0EsUUFBSUMsS0FBSyxHQUFDLEtBQUtELFNBQUwsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLENBQVYsQ0FGSixDQUlJO0FBQ0E7O0FBRUFoSyxJQUFBQSxRQUFRLEdBQUMrSixLQUFLLEdBQUNFLEtBQWY7QUFDQSxRQUFJQyxRQUFRLEdBQUM7QUFBQ3RCLE1BQUFBLEtBQUssRUFBQ21CLEtBQVA7QUFBYWpCLE1BQUFBLEtBQUssRUFBQ21CO0FBQW5CLEtBQWIsQ0FSSixDQVNJO0FBQ0E7O0FBQ0F0SCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBZ0I1QyxRQUFoQixHQUF5QixVQUF6QixHQUFvQytKLEtBQXBDLEdBQTBDLFVBQTFDLEdBQXFERSxLQUFqRTtBQUVBL0osSUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ3NELDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNEUrRSxRQUE1RTtBQUNILEdBMXFCb0I7QUE0cUJyQkMsRUFBQUEsV0E1cUJxQix5QkE2cUJyQjtBQUNJLFFBQUlKLEtBQUssR0FBQyxLQUFLQyxTQUFMLENBQWUsQ0FBZixFQUFpQixDQUFqQixDQUFWO0FBQ0EsV0FBT0QsS0FBUDtBQUNILEdBaHJCb0I7QUFrckJyQkssRUFBQUEsWUFsckJxQiwwQkFtckJyQjtBQUNJLFFBQUlMLEtBQUssR0FBQyxLQUFLQyxTQUFMLENBQWUsQ0FBZixFQUFpQixDQUFqQixDQUFWO0FBQ0EsUUFBSUMsS0FBSyxHQUFDLEtBQUtELFNBQUwsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLENBQVY7QUFDQSxXQUFRRCxLQUFLLEdBQUNFLEtBQWQ7QUFDSCxHQXZyQm9CO0FBeXJCckJJLEVBQUFBLFlBenJCcUIsMEJBMHJCckI7QUFDSSxRQUFJQyxRQUFRLEdBQUNYLFFBQVEsQ0FBQ3pKLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEbkUsV0FBMUQsRUFBdUVvRSxpQkFBdkUsQ0FBeUYzQixZQUF6RixDQUFzRyxjQUF0RyxFQUFzSHFILFNBQXRILENBQWdJQyxVQUFqSSxDQUFyQjs7QUFDQSxRQUFHUyxRQUFRLElBQUUsQ0FBVixJQUFlQSxRQUFRLElBQUUsQ0FBNUIsRUFBK0I7QUFDL0I7QUFDSSxZQUFJMUUsVUFBVSxHQUFDLEtBQUtvRSxTQUFMLENBQWUsQ0FBZixFQUFpQixFQUFqQixDQUFmLENBREosQ0FHSTs7QUFDQSxZQUFHTSxRQUFRLElBQUUsQ0FBYixFQUFnQjtBQUNoQjtBQUNJLGdCQUFJQyxVQUFVLEdBQUMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxFQUFQLENBQWY7QUFDQSxnQkFBSTFHLEtBQUssR0FBQyxLQUFLbUcsU0FBTCxDQUFlLENBQWYsRUFBaUIsQ0FBakIsQ0FBVjtBQUNBcEUsWUFBQUEsVUFBVSxHQUFDMkUsVUFBVSxDQUFDMUcsS0FBRCxDQUFyQjtBQUNILFdBTEQsTUFLTSxJQUFHeUcsUUFBUSxJQUFFLENBQWIsRUFBZ0I7QUFDdEI7QUFDSSxnQkFBSUMsVUFBVSxHQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxDQUFmO0FBQ0EsZ0JBQUkxRyxLQUFLLEdBQUMsS0FBS21HLFNBQUwsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLENBQVY7QUFDQXBFLFlBQUFBLFVBQVUsR0FBQzJFLFVBQVUsQ0FBQzFHLEtBQUQsQ0FBckI7QUFDSCxXQUxLLE1BTUQsSUFBR3lHLFFBQVEsSUFBRSxDQUFiLEVBQWdCO0FBQ3JCO0FBQ0ksZ0JBQUlDLFVBQVUsR0FBQyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxFQUFULEVBQVksQ0FBWixDQUFmO0FBQ0EsZ0JBQUkxRyxLQUFLLEdBQUMsS0FBS21HLFNBQUwsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLENBQVY7QUFDQXBFLFlBQUFBLFVBQVUsR0FBQzJFLFVBQVUsQ0FBQzFHLEtBQUQsQ0FBckI7QUFDSCxXQUxJLE1BT0EsSUFBR3lHLFFBQVEsSUFBRSxDQUFiLEVBQWdCO0FBQ3JCO0FBQ0ksZ0JBQUlDLFVBQVUsR0FBQyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLEVBQVAsQ0FBZjtBQUNBLGdCQUFJMUcsS0FBSyxHQUFDLEtBQUttRyxTQUFMLENBQWUsQ0FBZixFQUFpQixDQUFqQixDQUFWO0FBQ0FwRSxZQUFBQSxVQUFVLEdBQUMyRSxVQUFVLENBQUMxRyxLQUFELENBQXJCO0FBQ0g7O0FBRUQ1RCxRQUFBQSxVQUFVLEdBQUMsS0FBWDs7QUFDQSxZQUFHLEtBQUttQixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDckQsU0FBckMsSUFBZ0R5Qix3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERrQyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGWCxJQUE3RixDQUFrR1ksTUFBckosRUFDQTtBQUNJLGNBQUkyRixXQUFXLEdBQUM7QUFBQywwQkFBYTVFLFVBQWQ7QUFBeUIsdUJBQVU5RjtBQUFuQyxXQUFoQjtBQUNBLGVBQUtrRixpQkFBTCxDQUF1QndGLFdBQXZCO0FBQ0gsU0FKRCxNQU1BO0FBQ0ksZUFBS2xGLG1CQUFMO0FBQ0g7QUFDSixPQXhDRCxNQTBDQTtBQUNJckYsTUFBQUEsVUFBVSxHQUFDLEtBQVg7QUFDQTBDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVFQUFaO0FBQ0EsV0FBS21ELHNCQUFMO0FBQ0g7QUFDSixHQTN1Qm9CO0FBNnVCckIwRSxFQUFBQSxnQkE3dUJxQiw4QkE4dUJyQjtBQUNJeEssSUFBQUEsVUFBVSxHQUFDLEtBQVg7QUFDQTBDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVFQUFaO0FBQ0EsU0FBS21ELHNCQUFMO0FBQ0gsR0FsdkJvQjtBQW92QnJCMkUsRUFBQUEsZ0JBcHZCcUIsOEJBcXZCckI7QUFDSSxRQUFHLEtBQUt0SixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDckQsU0FBckMsSUFBZ0R5Qix3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERrQyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGWCxJQUE3RixDQUFrR1ksTUFBckosRUFDQTtBQUNJLFVBQUk4RixZQUFZLEdBQUMsS0FBSzdJLFVBQXRCOztBQUNBLFVBQUcsS0FBS1YsY0FBTCxDQUFvQnVKLFlBQXBCLEVBQWtDaEwsY0FBbEMsSUFBa0QsS0FBckQsRUFDQTtBQUNJLGFBQUt5QixjQUFMLENBQW9CdUosWUFBcEIsRUFBa0NoTCxjQUFsQyxHQUFpRCxJQUFqRDtBQUVBLFlBQUlpTCxLQUFLLEdBQUMsS0FBS3hKLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUM1QyxJQUEvQzs7QUFDQSxZQUFJMkwsUUFBUSxHQUFDM0ssd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2tKLGVBQWxDLEdBQW9EMUosY0FBcEQsQ0FBbUV1SixZQUFuRSxFQUFpRjdMLGVBQTlGOztBQUNBLFlBQUlpTSxRQUFRLEdBQUM3Syx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDa0osZUFBbEMsR0FBb0QxSixjQUFwRCxDQUFtRXVKLFlBQW5FLEVBQWlGNUwsb0JBQTlGOztBQUNBLFlBQUlpTSxXQUFXLEdBQUM5Syx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDa0osZUFBbEMsR0FBb0QxSixjQUFwRCxDQUFtRXVKLFlBQW5FLEVBQWlGM0wsb0JBQWpHOztBQUVBLFlBQUlpTSxVQUFVLEdBQUMsQ0FBZjs7QUFDQSxhQUFLLElBQUlwSCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRzNELHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NrSixlQUFsQyxHQUFvRDFKLGNBQXBELENBQW1FdUosWUFBbkUsRUFBaUYvTCxZQUFqRixDQUE4RndFLE1BQTFILEVBQWtJUyxLQUFLLEVBQXZJLEVBQTJJO0FBQ3ZJLGNBQUczRCx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDa0osZUFBbEMsR0FBb0QxSixjQUFwRCxDQUFtRXVKLFlBQW5FLEVBQWlGL0wsWUFBakYsQ0FBOEZpRixLQUE5RixFQUFxR2pHLFNBQXhHLEVBQ0E7QUFDSXFOLFlBQUFBLFVBQVUsSUFBRS9LLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NrSixlQUFsQyxHQUFvRDFKLGNBQXBELENBQW1FdUosWUFBbkUsRUFBaUYvTCxZQUFqRixDQUE4RmlGLEtBQTlGLEVBQXFHaEcsVUFBakg7QUFDSDtBQUNKOztBQUVELFlBQUlxTixNQUFNLEdBQUMsQ0FBQ0gsUUFBUSxHQUFDQyxXQUFWLElBQXVCLE1BQWxDO0FBRUEsWUFBSUcsTUFBTSxHQUFDLENBQVg7QUFDQSxZQUFHTixRQUFRLElBQUUsQ0FBYixFQUNJTSxNQUFNLEdBQUMsS0FBUCxDQURKLEtBRUssSUFBR04sUUFBUSxJQUFFLENBQWIsRUFDRE0sTUFBTSxHQUFDLFFBQU0sS0FBYixDQURDLEtBRUEsSUFBR04sUUFBUSxJQUFFLENBQWIsRUFDRE0sTUFBTSxHQUFDLFFBQU0sS0FBTixHQUFZLEtBQW5CO0FBRUosWUFBSUMsV0FBVyxHQUFDUixLQUFLLEdBQUNNLE1BQU4sR0FBYUMsTUFBYixHQUFvQkYsVUFBcEM7QUFFQSxhQUFLN0osY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ2xDLFVBQXJDLEdBQWdEd0wsV0FBaEQ7QUFDQWxMLFFBQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEdBQTRFRyxpQkFBNUUsQ0FBOEYsbUJBQTlGLEVBQW1ILEtBQUsxRCxjQUFMLENBQW9CLEtBQUtVLFVBQXpCLENBQW5IO0FBRUg7QUFDSjtBQUNKLEdBM3hCb0I7QUE2eEJ0QnVKLEVBQUFBLHlCQTd4QnNCLHFDQTZ4QklwRyxLQTd4QkosRUE4eEJ0QjtBQUNLL0UsSUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ3NELDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNEVGLEtBQTVFO0FBQ0osR0FoeUJxQjtBQWt5QnRCcUcsRUFBQUEsWUFseUJzQix3QkFreUJUQyxJQWx5QlMsRUFteUJ0QjtBQUNDLFFBQUluRSxlQUFlLEdBQUNsSCx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOER1RSxVQUE5RCxFQUFwQjtBQUNBLFFBQUlLLE1BQU0sR0FBQ25ILHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEVBQVg7QUFDQWhDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMkksSUFBWjtBQUNBNUksSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl5RSxNQUFNLENBQUN6QyxnQkFBUCxDQUF3QjJDLGlCQUF4QixDQUEwQzlJLFNBQXREO0FBQ0F5QixJQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERrQyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGMkMsaUJBQTdGLENBQStHMUgsUUFBL0csR0FBd0gsSUFBeEg7O0FBRUEsUUFBR3dILE1BQU0sQ0FBQ3pDLGdCQUFQLENBQXdCMkMsaUJBQXhCLENBQTBDOUksU0FBMUMsSUFBcUQ4TSxJQUF4RCxFQUNBO0FBQ0k7QUFDQXJMLE1BQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUNJLGlCQUFlSSxNQUFNLENBQUN6QyxnQkFBUCxDQUF3QjJDLGlCQUF4QixDQUEwQzNILFVBQXpELEdBQW9FLElBQXBFLEdBQXlFLElBQXpFLEdBQ0Esd0RBREEsR0FDeUQsSUFEekQsR0FDOEQsSUFEOUQsR0FDbUUsSUFEbkUsR0FFQSxzREFISixFQUlJLEtBSko7QUFNSCxLQVRELE1BV0E7QUFDSTtBQUNBTSxNQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FDSSxpQkFBZUksTUFBTSxDQUFDekMsZ0JBQVAsQ0FBd0IyQyxpQkFBeEIsQ0FBMEMzSCxVQUF6RCxHQUFvRSxJQUFwRSxHQUF5RSxJQUF6RSxHQUNBLHVDQURBLEdBQ3dDLElBRHhDLEdBQzZDLElBRDdDLEdBQ2tELElBRGxELEdBRUEsc0RBSEosRUFJSSxLQUpKO0FBTUg7O0FBRUQ2RixJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNidkYsTUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThEK0ksV0FBOUQ7QUFDSCxLQUZTLEVBRVAsS0FGTyxDQUFWO0FBSUEsR0FuMEJxQjtBQXEwQnJCQyxFQUFBQSxhQUFhLEVBQUMseUJBQ2Q7QUFDSSxRQUFHM0wsV0FBVyxJQUFFSSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0MsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRGIsTUFBMUUsRUFDQTtBQUNJVCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaO0FBQ0E5QixNQUFBQSxVQUFVLEdBQUMsSUFBWDtBQUNBLFdBQUs0SyxhQUFMOztBQUVBLFVBQUd4TCx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERrQyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGb0IsY0FBN0YsQ0FBNEdDLFVBQTVHLElBQXdILEtBQTNILEVBQ0E7QUFFSSxhQUFLeUUsZ0JBQUw7QUFDQSxZQUFJaUIsZUFBZSxHQUFDLENBQXBCO0FBRUEsWUFBSXZFLGVBQWUsR0FBQ2xILHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RHVFLFVBQTlELEVBQXBCOztBQUNBLGFBQUssSUFBSW5ELEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHdUQsZUFBZSxDQUFDaEUsTUFBNUMsRUFBb0RTLEtBQUssRUFBekQsRUFBNkQ7QUFDekQsY0FBR3VELGVBQWUsQ0FBQ3ZELEtBQUQsQ0FBZixDQUF1QmUsZ0JBQXZCLENBQXdDMkMsaUJBQXhDLENBQTBENUgsY0FBN0QsRUFDQTtBQUNJZ00sWUFBQUEsZUFBZTtBQUNsQjtBQUNKOztBQUdELFlBQUdBLGVBQWUsSUFBRSxLQUFLdkssY0FBTCxDQUFvQmdDLE1BQXhDLEVBQ0E7QUFDSSxjQUFJd0ksR0FBRyxHQUFDLENBQVI7QUFDQSxjQUFJQyxXQUFXLEdBQUMsQ0FBaEI7QUFDQSxjQUFJQyxXQUFXLEdBQUM1TCx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOER1RSxVQUE5RCxFQUFoQjs7QUFDQSxlQUFLLElBQUluRCxPQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE9BQUssR0FBR2lJLFdBQVcsQ0FBQzFJLE1BQXhDLEVBQWdEUyxPQUFLLEVBQXJELEVBQXlEO0FBQ3JELGdCQUFJa0ksTUFBTSxHQUFHRCxXQUFXLENBQUNqSSxPQUFELENBQVgsQ0FBbUJlLGdCQUFuQixDQUFvQzJDLGlCQUFwQyxDQUFzRDNILFVBQW5FOztBQUVBLGdCQUFHbU0sTUFBTSxHQUFHSCxHQUFaLEVBQ0E7QUFDSUMsY0FBQUEsV0FBVyxHQUFDaEksT0FBWjtBQUNBK0gsY0FBQUEsR0FBRyxHQUFDRyxNQUFKO0FBQ0g7QUFDSjs7QUFFRHBKLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUEwQmtKLFdBQVcsQ0FBQ0QsV0FBRCxDQUFYLENBQXlCakgsZ0JBQXpCLENBQTBDMkMsaUJBQTFDLENBQTREOUksU0FBbEc7QUFHQSxlQUFLNE0seUJBQUwsQ0FBK0JTLFdBQVcsQ0FBQ0QsV0FBRCxDQUFYLENBQXlCakgsZ0JBQXpCLENBQTBDMkMsaUJBQTFDLENBQTREOUksU0FBM0YsRUFqQkosQ0FrQkk7QUFDSCxTQXBCRCxNQXFCQTtBQUNJd0IsVUFBQUEsVUFBVSxHQUFDLEtBQVg7QUFDQSxlQUFLOEUsVUFBTDtBQUNIO0FBQ0o7QUFDSixLQS9DRCxNQWlEQTtBQUNJaEYsTUFBQUEsUUFBUSxHQUFDQSxRQUFRLEdBQUMsQ0FBbEI7O0FBQ0EsVUFBSStELE1BQU0sR0FBQzNILEVBQUUsQ0FBQzRILElBQUgsQ0FBUTdELHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEbkUsV0FBMUQsRUFBdUVvRSxpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHQyxDQUExRyxFQUE0R2xFLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEbkUsV0FBMUQsRUFBdUVvRSxpQkFBdkUsQ0FBeUZDLFFBQXpGLENBQWtHRSxDQUE5TSxDQUFYOztBQUNBLFdBQUsySCxXQUFMLENBQWlCLEtBQUt2SyxjQUFMLENBQW9CLEtBQUtLLFVBQXpCLENBQWpCLEVBQXNEZ0MsTUFBdEQ7QUFDSDtBQUNKLEdBNzNCb0I7QUErM0JyQmtHLEVBQUFBLFNBQVMsRUFBQyxtQkFBU2lDLEdBQVQsRUFBYUwsR0FBYixFQUNWO0FBQ0ksV0FBT00sSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQlIsR0FBRyxHQUFHSyxHQUF2QixDQUFYLElBQTJDQSxHQUFsRCxDQURKLENBQzJEO0FBQzFELEdBbDRCb0I7QUFvNEJyQjVDLEVBQUFBLFdBQVcsRUFBRSxxQkFBVUQsSUFBVixFQUFnQmlELE1BQWhCLEVBQXVCQyxJQUF2QixFQUE2QjtBQUFBOztBQUN0Q25RLElBQUFBLEVBQUUsQ0FBQ29RLEtBQUgsQ0FBUyxLQUFLaEwsVUFBZCxFQUNDaUwsRUFERCxDQUNJRixJQURKLEVBQ1U7QUFBRW5JLE1BQUFBLFFBQVEsRUFBRWhJLEVBQUUsQ0FBQ3NRLEVBQUgsQ0FBTXJELElBQUksQ0FBQ2hGLENBQVgsRUFBY2dGLElBQUksQ0FBQy9FLENBQW5CO0FBQVosS0FEVixFQUM2QztBQUFDcUksTUFBQUEsTUFBTSxFQUFDO0FBQVIsS0FEN0MsRUFFQ0MsSUFGRCxDQUVNLFlBQU07QUFDWixVQUFHTixNQUFILEVBQ0ksTUFBSSxDQUFDTyxZQUFMLEdBREosS0FHSSxNQUFJLENBQUNsQixhQUFMO0FBQ0gsS0FQRCxFQVFDbUIsS0FSRDtBQVNILEdBOTRCb0I7QUFnNUJyQkQsRUFBQUEsWUFoNUJxQiwwQkFnNUJMO0FBQUE7O0FBQ1puSCxJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNaLFVBQUcsTUFBSSxDQUFDbkQsTUFBTCxDQUFZaUcsU0FBWixHQUFzQixDQUF6QixFQUNBO0FBQ0csUUFBQSxNQUFJLENBQUNqRyxNQUFMLENBQVlpRyxTQUFaLEdBQXNCLE1BQUksQ0FBQ2pHLE1BQUwsQ0FBWWlHLFNBQVosR0FBc0IsSUFBNUM7O0FBQ0EsUUFBQSxNQUFJLENBQUNxRSxZQUFMO0FBQ0YsT0FKRCxNQU1BO0FBQ0csUUFBQSxNQUFJLENBQUN0SyxNQUFMLENBQVlpRyxTQUFaLEdBQXNCLENBQXRCO0FBQ0EsUUFBQSxNQUFJLENBQUMvRixlQUFMLEdBQXFCLElBQXJCOztBQUNBLFFBQUEsTUFBSSxDQUFDaUosYUFBTDtBQUNGO0FBQ0gsS0FaTyxFQVlMLEVBWkssQ0FBVjtBQWFILEdBOTVCb0I7QUFnNkJyQnFCLEVBQUFBLHFCQWg2QnFCLG1DQWk2QnJCO0FBQ0ksUUFBR25ELFFBQVEsQ0FBQ3pKLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQyxnQkFBbEMsR0FBcURDLElBQXJELENBQTBEbkUsV0FBMUQsRUFBdUVvRSxpQkFBdkUsQ0FBeUYzQixZQUF6RixDQUFzRyxjQUF0RyxFQUFzSHFILFNBQXRILENBQWdJQyxVQUFqSSxDQUFSLElBQXNKLENBQXpKLEVBQ0l4SixZQUFZLEdBQUMsSUFBYjtBQUVKLFFBQUdzSixRQUFRLENBQUN6Six3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0MsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRG5FLFdBQTFELEVBQXVFb0UsaUJBQXZFLENBQXlGM0IsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0hxSCxTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUFzSixDQUF6SixFQUNJdkosWUFBWSxHQUFDLElBQWI7QUFFSkMsSUFBQUEsa0JBQWtCLEdBQUMsS0FBS2EsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ2pELGlCQUFyQyxDQUF1RGIsaUJBQTFFOztBQUNBLFFBQUdxQyxZQUFZLElBQUksQ0FBQ0MsWUFBakIsSUFBaUMsQ0FBQ0Msa0JBQXJDLEVBQ0E7QUFDSSxXQUFLd00sdUJBQUwsQ0FBNkIsS0FBN0I7QUFDQSxXQUFLQyxZQUFMLENBQWtCLEtBQWxCLEVBQXdCLEtBQXhCO0FBQ0EsV0FBS0MsMEJBQUwsQ0FBZ0MsS0FBaEM7QUFDSCxLQUxELE1BTUssSUFBSTNNLFlBQUQsSUFBbUJELFlBQVksSUFBSUUsa0JBQXRDLEVBQ0w7QUFDSSxXQUFLd00sdUJBQUwsQ0FBNkIsS0FBN0I7QUFDQSxXQUFLQyxZQUFMLENBQWtCLEtBQWxCLEVBQXdCLEtBQXhCO0FBQ0EsV0FBS0MsMEJBQUwsQ0FBZ0MsSUFBaEM7QUFDSCxLQUxJLE1BT0w7QUFDSSxXQUFLNUMsWUFBTDtBQUNIO0FBQ0osR0F6N0JvQjtBQTI3QnJCcUIsRUFBQUEsYUEzN0JxQiwyQkEyN0JKO0FBQUE7O0FBQ2JqRyxJQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLFVBQUcsTUFBSSxDQUFDbkQsTUFBTCxDQUFZaUcsU0FBWixJQUF1QixDQUExQixFQUNBO0FBQ0csUUFBQSxNQUFJLENBQUMvRixlQUFMLEdBQXFCLEtBQXJCO0FBQ0EsUUFBQSxNQUFJLENBQUNGLE1BQUwsQ0FBWWlHLFNBQVosR0FBc0IsTUFBSSxDQUFDakcsTUFBTCxDQUFZaUcsU0FBWixHQUFzQixJQUE1Qzs7QUFDQSxRQUFBLE1BQUksQ0FBQ21ELGFBQUw7QUFDRixPQUxELE1BT0E7QUFDSSxRQUFBLE1BQUksQ0FBQ25LLFVBQUwsQ0FBZ0I0QyxRQUFoQixHQUF5QmhJLEVBQUUsQ0FBQzRILElBQUgsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUF6QjtBQUNBLFFBQUEsTUFBSSxDQUFDekIsTUFBTCxDQUFZaUcsU0FBWixHQUFzQixDQUF0QjtBQUVBckksUUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxHQUEwRGlHLDJCQUExRCxDQUFzRixDQUF0Rjs7QUFFQSxZQUFHLENBQUNuSSxVQUFKLEVBQ0E7QUFDSSxjQUFHLE1BQUksQ0FBQ00sY0FBTCxDQUFvQixNQUFJLENBQUNVLFVBQXpCLEVBQXFDckQsU0FBckMsSUFBZ0R5Qix3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERrQyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGWCxJQUE3RixDQUFrR1ksTUFBckosRUFDSSxNQUFJLENBQUNpSSxxQkFBTCxHQURKLEtBR0ksTUFBSSxDQUFDekMsWUFBTDtBQUNQO0FBQ0o7QUFDSCxLQXRCUSxFQXNCTixFQXRCTSxDQUFWO0FBd0JILEdBcDlCb0I7QUFzOUJyQjJCLEVBQUFBLFdBQVcsRUFBRSxxQkFBVTFLLElBQVYsRUFBZTRMLEtBQWYsRUFBc0I7QUFBQTs7QUFDL0IvUSxJQUFBQSxFQUFFLENBQUNvUSxLQUFILENBQVNqTCxJQUFULEVBQ0NrTCxFQURELENBQ0ksR0FESixFQUNTO0FBQUVySSxNQUFBQSxRQUFRLEVBQUVoSSxFQUFFLENBQUNzUSxFQUFILENBQU1TLEtBQUssQ0FBQzlJLENBQVosRUFBZThJLEtBQUssQ0FBQzdJLENBQXJCO0FBQVosS0FEVCxFQUM4QztBQUFDcUksTUFBQUEsTUFBTSxFQUFDO0FBQVIsS0FEOUMsRUFFQ0MsSUFGRCxDQUVNLFlBQU07QUFDWixVQUFHNU0sUUFBUSxHQUFDQyxRQUFaLEVBQ0E7QUFDSSxZQUFHLENBQUNjLFVBQUosRUFDQTtBQUNJLGNBQUcsTUFBSSxDQUFDTSxjQUFMLENBQW9CLE1BQUksQ0FBQ1UsVUFBekIsRUFBcUNyRCxTQUFyQyxJQUFnRHlCLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkZYLElBQTdGLENBQWtHWSxNQUFySixFQUNBO0FBQ0ksZ0JBQUc4RSxRQUFRLENBQUN6Six3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0MsZ0JBQWxDLEdBQXFEQyxJQUFyRCxDQUEwRG5FLFdBQTFELEVBQXVFb0UsaUJBQXZFLENBQXlGM0IsWUFBekYsQ0FBc0csY0FBdEcsRUFBc0hxSCxTQUF0SCxDQUFnSUMsVUFBakksQ0FBUixJQUFzSixDQUF6SixFQUNJeEosWUFBWSxHQUFDLElBQWI7QUFDUDtBQUNKOztBQUVELFlBQUdQLFdBQVcsSUFBRSxFQUFoQixFQUNJQSxXQUFXLEdBQUNBLFdBQVcsR0FBQyxFQUF4QixDQURKLEtBR0lBLFdBQVcsR0FBQ0EsV0FBVyxHQUFDLENBQXhCLENBYlIsQ0FlSTs7QUFDQTZDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZN0MsUUFBUSxHQUFDLEdBQVQsR0FBYUQsV0FBekI7O0FBRUEsUUFBQSxNQUFJLENBQUMyTCxhQUFMLEdBbEJKLENBbUJJOztBQUVILE9BdEJELE1Bd0JBO0FBQ0ksWUFBSTBCLE9BQU8sR0FBQ2hSLEVBQUUsQ0FBQzRILElBQUgsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUFaOztBQUNBLFFBQUEsTUFBSSxDQUFDc0YsV0FBTCxDQUFpQjhELE9BQWpCLEVBQXlCLEtBQXpCLEVBQStCLEdBQS9CLEVBRkosQ0FFeUM7O0FBQ3hDO0FBRUEsS0FoQ0QsRUFpQ0NOLEtBakNEO0FBa0NILEdBei9Cb0I7QUEyL0JyQjtBQUVBRyxFQUFBQSxZQTcvQnFCLHdCQTYvQlJJLElBNy9CUSxFQTYvQkhDLElBNy9CRyxFQTgvQnJCO0FBQ0loTixJQUFBQSxZQUFZLEdBQUMrTSxJQUFiO0FBQ0E5TSxJQUFBQSxZQUFZLEdBQUMrTSxJQUFiO0FBQ0gsR0FqZ0NvQjtBQW1nQ3JCQyxFQUFBQSwyQkFuZ0NxQix1Q0FtZ0NPQyxNQW5nQ1AsRUFtZ0NjM0YsTUFuZ0NkLEVBbWdDcUI0RixhQW5nQ3JCLEVBb2dDckI7QUFDSSxRQUFHLEtBQUtwTSxjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDNUMsSUFBckMsSUFBMkNxTyxNQUE5QyxFQUNBO0FBQ0ksV0FBS25NLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUM1QyxJQUFyQyxHQUEwQyxLQUFLa0MsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQzVDLElBQXJDLEdBQTBDcU8sTUFBcEY7QUFDQSxXQUFLbk0sY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQzlDLG9CQUFyQyxHQUEwRCxLQUFLb0MsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQzlDLG9CQUFyQyxHQUEwRCxDQUFwSDs7QUFDQSxXQUFLb0MsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ2xELFlBQXJDLENBQWtEZ0osTUFBbEQsRUFBMERqSyxhQUExRCxDQUF3RTBJLElBQXhFLENBQTZFbUgsYUFBN0U7O0FBQ0F0TixNQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FBb0UsK0NBQXBFLEVBQW9ILElBQXBIO0FBQ0F4QixNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNidkYsUUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxHQUEwRHlLLHNDQUExRDtBQUNILE9BRlMsRUFFUCxJQUZPLENBQVY7QUFHSCxLQVRELE1BV0E7QUFDSXZOLE1BQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUFvRSx1RUFBcUVzRyxNQUF6STtBQUNIO0FBRUosR0FwaENvQjtBQXNoQ3JCRyxFQUFBQSwyQ0F0aENxQix5REF1aENyQjtBQUNJdE4sSUFBQUEscUJBQXFCLEdBQUMsRUFBdEI7QUFFQXVDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUt4QixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDbEQsWUFBakQ7O0FBQ0EsU0FBSyxJQUFJK08sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdk0sY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ2xELFlBQXJDLENBQWtEd0UsTUFBdEUsRUFBOEV1SyxDQUFDLEVBQS9FLEVBQW1GO0FBQy9FLFVBQUdoRSxRQUFRLENBQUMsS0FBS3ZJLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUNsRCxZQUFyQyxDQUFrRCtPLENBQWxELEVBQXFEOVEsWUFBdEQsQ0FBUixJQUE2RSxDQUFoRixFQUFtRjtBQUNuRjtBQUNJLGNBQUkrUSxJQUFJLEdBQUd6UixFQUFFLENBQUMwUixXQUFILENBQWUzTix3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEOEssbUJBQTFELENBQThFQyxvQkFBN0YsQ0FBWDtBQUNBSCxVQUFBQSxJQUFJLENBQUMxRixNQUFMLEdBQWNoSSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEOEssbUJBQTFELENBQThFRSwyQkFBNUY7QUFDQUosVUFBQUEsSUFBSSxDQUFDckwsWUFBTCxDQUFrQix1QkFBbEIsRUFBMkMwTCxnQkFBM0MsQ0FBNEROLENBQTVEO0FBQ0FDLFVBQUFBLElBQUksQ0FBQ3JMLFlBQUwsQ0FBa0IsdUJBQWxCLEVBQTJDbUYsT0FBM0MsQ0FBbUQsS0FBS3RHLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUNsRCxZQUFyQyxDQUFrRCtPLENBQWxELEVBQXFEdlEsWUFBeEc7QUFDQXdRLFVBQUFBLElBQUksQ0FBQ3JMLFlBQUwsQ0FBa0IsdUJBQWxCLEVBQTJDMkwsWUFBM0M7QUFDQTlOLFVBQUFBLHFCQUFxQixDQUFDaUcsSUFBdEIsQ0FBMkJ1SCxJQUEzQjtBQUNIO0FBQ0o7O0FBQ0RqTCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXhDLHFCQUFaO0FBQ0EsV0FBT0EscUJBQXFCLENBQUNnRCxNQUE3QjtBQUNILEdBeGlDb0I7QUEwaUNyQitLLEVBQUFBLHFCQTFpQ3FCLG1DQTJpQ3JCO0FBQ0ksU0FBSyxJQUFJdEssS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUd6RCxxQkFBcUIsQ0FBQ2dELE1BQWxELEVBQTBEUyxLQUFLLEVBQS9ELEVBQW1FO0FBQy9EekQsTUFBQUEscUJBQXFCLENBQUN5RCxLQUFELENBQXJCLENBQTZCdUssT0FBN0I7QUFDSDs7QUFFRGhPLElBQUFBLHFCQUFxQixHQUFDLEVBQXRCO0FBQ0gsR0FqakNvQjtBQW1qQ3JCaU8sRUFBQUEseUJBbmpDcUIscUNBbWpDS0MsS0FuakNMLEVBbWpDV0MsWUFuakNYLEVBbWpDd0JDLFNBbmpDeEIsRUFvakNyQjtBQUNJLFFBQUdBLFNBQUgsRUFDQTtBQUNJLFVBQUlDLE1BQU0sR0FBQyxJQUFJcFEsU0FBSixFQUFYOztBQUNBb1EsTUFBQUEsTUFBTSxDQUFDclIsWUFBUCxHQUFvQmtSLEtBQXBCO0FBQ0FHLE1BQUFBLE1BQU0sQ0FBQ25RLFdBQVAsR0FBbUJpUSxZQUFuQjtBQUVBLFdBQUtuTixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDN0MsVUFBckMsQ0FBZ0RvSCxJQUFoRCxDQUFxRG9JLE1BQXJEO0FBQ0g7QUFDSixHQTdqQ29CO0FBK2pDckJ4QixFQUFBQSwwQkEvakNxQixzQ0ErakNNeUIsZUEvakNOLEVBZ2tDckI7QUFBQTs7QUFBQSxRQUQyQkEsZUFDM0I7QUFEMkJBLE1BQUFBLGVBQzNCLEdBRDJDLEtBQzNDO0FBQUE7O0FBQ0lqTyxJQUFBQSxlQUFlLEdBQUMsS0FBS1csY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ2pELGlCQUFyQyxDQUF1RFgsY0FBdkU7QUFDQXdDLElBQUFBLGlCQUFpQixHQUFDLEtBQUtVLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUNqRCxpQkFBckMsQ0FBdURWLGdCQUF6RTtBQUNBd0MsSUFBQUEsaUJBQWlCLEdBQUMsS0FBS1MsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ2pELGlCQUFyQyxDQUF1RFQsZ0JBQXpFOztBQUVBLFFBQUdxQyxlQUFILEVBQW9CO0FBQ3BCO0FBQ0ksYUFBS2tPLHNCQUFMLENBQTRCLEtBQTVCO0FBQ0F6TyxRQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FBb0Usa0JBQXBFLEVBQXVGLElBQXZGO0FBQ0F4QixRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLFVBQUEsTUFBSSxDQUFDNEUsWUFBTDtBQUNILFNBRlMsRUFFUCxJQUZPLENBQVY7QUFHSCxPQVBELE1BU0E7QUFDSSxVQUFJdUUsTUFBTSxHQUFDLEVBQVg7QUFFQSxVQUFHRixlQUFILEVBQ0lFLE1BQU0sR0FBQyxjQUFQLENBREosS0FHSUEsTUFBTSxHQUFDLFFBQVA7QUFFSjFPLE1BQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQixxQkFBbEMsR0FBMEQ2TCxpQkFBMUQsQ0FBNEVELE1BQTVFLEVBQW1GRixlQUFuRixFQUFtR2hPLGlCQUFuRyxFQUFxSEMsaUJBQXJIO0FBQ0g7QUFDSixHQXhsQ29CO0FBMGxDekI7QUFFSTtBQUNBb00sRUFBQUEsdUJBN2xDcUIsbUNBNmxDRytCLE1BN2xDSCxFQThsQ3JCO0FBQ0l2TyxJQUFBQSxrQkFBa0IsR0FBQ3VPLE1BQW5CO0FBQ0EsU0FBSzFOLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUNqRCxpQkFBckMsQ0FBdURiLGlCQUF2RCxHQUF5RXVDLGtCQUF6RTtBQUNILEdBam1Db0I7QUFtbUNyQjJHLEVBQUFBLGtCQW5tQ3FCLDhCQW1tQ0Y0SCxNQW5tQ0UsRUFvbUNyQjtBQUNJdE8sSUFBQUEsYUFBYSxHQUFDc08sTUFBZDtBQUNBLFNBQUsxTixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDakQsaUJBQXJDLENBQXVEWixZQUF2RCxHQUFvRXVDLGFBQXBFO0FBQ0gsR0F2bUNvQjtBQXltQ3JCbU8sRUFBQUEsc0JBem1DcUIsa0NBeW1DRUcsTUF6bUNGLEVBMG1DckI7QUFDSXJPLElBQUFBLGVBQWUsR0FBQ3FPLE1BQWhCO0FBQ0EsU0FBSzFOLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUNqRCxpQkFBckMsQ0FBdURYLGNBQXZELEdBQXNFdUMsZUFBdEU7QUFDSCxHQTdtQ29CO0FBK21DckJzTyxFQUFBQSwwQkEvbUNxQixzQ0ErbUNNRCxNQS9tQ04sRUFnbkNyQjtBQUNJcE8sSUFBQUEsaUJBQWlCLEdBQUNvTyxNQUFsQjtBQUNBLFNBQUsxTixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDakQsaUJBQXJDLENBQXVEVixnQkFBdkQsR0FBd0V1QyxpQkFBeEU7QUFDSCxHQW5uQ29CO0FBcW5DckJzTyxFQUFBQSwrQkFybkNxQiwyQ0FxbkNXRixNQXJuQ1gsRUFzbkNyQjtBQUNJbk8sSUFBQUEsaUJBQWlCLEdBQUNtTyxNQUFsQjtBQUNBLFNBQUsxTixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDakQsaUJBQXJDLENBQXVEVCxnQkFBdkQsR0FBd0V1QyxpQkFBeEU7QUFDSCxHQXpuQ29CO0FBMm5DckJnRyxFQUFBQSxrQkEzbkNxQiw4QkEybkNGbUksTUEzbkNFLEVBNG5DckI7QUFDSWpPLElBQUFBLGNBQWMsR0FBQ2lPLE1BQWY7QUFDSCxHQTluQ29CO0FBZ29DckJHLEVBQUFBLGtCQWhvQ3FCLGdDQWlvQ3JCO0FBQ0ksV0FBT3BPLGNBQVA7QUFDSCxHQW5vQ29CO0FBb29DckJxTyxFQUFBQSxxQkFwb0NxQixtQ0Fxb0NyQjtBQUNJLFFBQUlDLFdBQVcsR0FBQyxDQUFDLENBQWpCOztBQUNBLFFBQUcsS0FBSy9OLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUN6QyxlQUFyQyxHQUFxRCxDQUF4RCxFQUNBO0FBQ0k4UCxNQUFBQSxXQUFXLEdBQUMsS0FBSy9OLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUN6QyxlQUFqRDtBQUNBLFdBQUsrQixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDekMsZUFBckMsR0FBcUQsQ0FBckQ7QUFDSCxLQUpELE1BTUE7QUFDSThQLE1BQUFBLFdBQVcsR0FBQyxDQUFaO0FBQ0g7O0FBRUQsV0FBT0EsV0FBUDtBQUNILEdBbHBDb0I7QUFvcENyQkMsRUFBQUEsc0JBcHBDcUIsa0NBb3BDRUMsV0FwcENGLEVBcXBDckI7QUFDSSxRQUFJQyxnQkFBZ0IsR0FBQyxDQUFDLENBQXRCOztBQUNBLFFBQUcsS0FBS2xPLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUN6QyxlQUFyQyxHQUFxRCxDQUF4RCxFQUNBO0FBQ0lpUSxNQUFBQSxnQkFBZ0IsR0FBQyxLQUFLbE8sY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3pDLGVBQXJDLElBQXNEZ1EsV0FBdkU7QUFDSCxLQUhELE1BS0E7QUFDSUMsTUFBQUEsZ0JBQWdCLEdBQUMsQ0FBakI7QUFDSDs7QUFFRCxXQUFPQSxnQkFBUDtBQUNILEdBanFDb0I7QUFtcUNyQkMsRUFBQUEsaUJBbnFDcUIsNkJBbXFDSEMsT0FucUNHLEVBb3FDckI7QUFDSSxRQUFJQyxPQUFPLEdBQUMsQ0FBQyxDQUFiOztBQUNBLFFBQUcsS0FBS3JPLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUN6QyxlQUFyQyxHQUFxRCxDQUF4RCxFQUNBO0FBQ0ltUSxNQUFBQSxPQUFPLEdBQUVBLE9BQU8sR0FBQyxHQUFqQjtBQUNBQyxNQUFBQSxPQUFPLEdBQUMsS0FBS3JPLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUN6QyxlQUFyQyxJQUFzRG1RLE9BQTlEO0FBQ0EsV0FBS3BPLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUN6QyxlQUFyQyxHQUFxRCxDQUFyRDtBQUNBLFdBQUsrQixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDNUMsSUFBckMsSUFBMkN1USxPQUEzQztBQUNILEtBTkQsTUFRQTtBQUNJQSxNQUFBQSxPQUFPLEdBQUMsQ0FBUjtBQUNIOztBQUVELFdBQU9BLE9BQVA7QUFDSCxHQW5yQ29CO0FBcXJDckJDLEVBQUFBLG1DQXJyQ3FCLCtDQXFyQ2V6SyxLQXJyQ2YsRUFzckNyQjtBQUNJLFFBQUkwSyxPQUFPLEdBQUMxSyxLQUFLLENBQUMySyxNQUFsQjtBQUNBLFFBQUlDLGNBQWMsR0FBQzVLLEtBQUssQ0FBQzZLLFFBQXpCO0FBQ0EsUUFBSW5GLFlBQVksR0FBQzFGLEtBQUssQ0FBQzhLLFNBQXZCOztBQUNBLFFBQUlDLGtCQUFrQixHQUFDOVAsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxFQUF2Qjs7QUFFQSxRQUFHMk0sT0FBTyxJQUFFelAsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThEa0MsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RjJDLGlCQUE3RixDQUErRzlJLFNBQTNILEVBQ0E7QUFDSWtFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVo7O0FBRUFvTixNQUFBQSxrQkFBa0IsQ0FBQ0MsdUNBQW5CLENBQTJELElBQTNEOztBQUVBbFAsTUFBQUEsZ0JBQWdCLEdBQUM4TyxjQUFqQjtBQUNBLFVBQUlLLGNBQWMsR0FBQ2xQLFlBQVksQ0FBQzZPLGNBQWMsR0FBQyxDQUFoQixDQUEvQjs7QUFDQUcsTUFBQUEsa0JBQWtCLENBQUNHLHNDQUFuQixDQUEwREQsY0FBMUQ7QUFDSDtBQUNKLEdBdHNDb0I7QUF3c0NyQkUsRUFBQUEsbUNBeHNDcUIsK0NBd3NDZUMsV0F4c0NmLEVBeXNDckI7QUFBQSxRQURvQ0EsV0FDcEM7QUFEb0NBLE1BQUFBLFdBQ3BDLEdBRGdELEtBQ2hEO0FBQUE7O0FBQ0ksUUFBSUwsa0JBQWtCLEdBQUM5UCx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEVBQXZCOztBQUNBLFFBQUlzTixTQUFTLEdBQUNwUSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERJLFlBQTlELEdBQTZFbUcsaUJBQTdFLEVBQWQ7O0FBQ0EsUUFBSXVILE9BQU8sR0FBQ3JRLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYyQyxpQkFBekc7O0FBRUF5SSxJQUFBQSxrQkFBa0IsQ0FBQ1Esb0NBQW5CLENBQXdELElBQXhEOztBQUNBUixJQUFBQSxrQkFBa0IsQ0FBQ1MsbUNBQW5COztBQUNBVCxJQUFBQSxrQkFBa0IsQ0FBQ1UsbUNBQW5CLENBQXVESCxPQUF2RCxFQUErREQsU0FBL0QsRUFBeUVELFdBQXpFO0FBRUgsR0FsdENvQjtBQW90Q3JCTSxFQUFBQSx5Q0FwdENxQix1REFxdENyQjtBQUNJLFFBQUlKLE9BQU8sR0FBQ3JRLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NhLHlCQUFsQyxHQUE4RGtDLFdBQTlELEdBQTRFQyxnQkFBNUUsQ0FBNkYyQyxpQkFBekc7O0FBQ0EsUUFBSXlJLGtCQUFrQixHQUFDOVAsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxFQUF2Qjs7QUFFQSxRQUFHdU4sT0FBTyxDQUFDclIsSUFBUixJQUFjLElBQWpCLEVBQ0E7QUFDSSxXQUFLLElBQUkyRSxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRyxLQUFLekMsY0FBTCxDQUFvQmdDLE1BQWhELEVBQXdEUyxLQUFLLEVBQTdELEVBQWlFO0FBQzdELFlBQUcwTSxPQUFPLENBQUM5UixTQUFSLElBQW1CLEtBQUsyQyxjQUFMLENBQW9CeUMsS0FBcEIsRUFBMkJwRixTQUFqRCxFQUNBO0FBQ0ksZUFBSzJDLGNBQUwsQ0FBb0J5QyxLQUFwQixFQUEyQjNFLElBQTNCLElBQWlDLElBQWpDO0FBQ0FnQixVQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERrQyxXQUE5RCxHQUE0RUcsaUJBQTVFLENBQThGLG1CQUE5RixFQUFtSCxLQUFLMUQsY0FBTCxDQUFvQnlDLEtBQXBCLENBQW5IO0FBQ0E7QUFDSDtBQUNKOztBQUVEM0QsTUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQW9FLG1EQUFwRSxFQUF3SCxJQUF4SDs7QUFDQStJLE1BQUFBLGtCQUFrQixDQUFDQyx1Q0FBbkIsQ0FBMkQsS0FBM0Q7O0FBQ0EsV0FBS1csOEJBQUwsQ0FBb0MsSUFBcEMsRUFBeUMsS0FBekMsRUFBK0MsQ0FBQyxDQUFoRCxFQUFrREwsT0FBTyxDQUFDOVIsU0FBMUQ7QUFDSCxLQWRELE1BZ0JBO0FBQ0l5QixNQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FBb0UsNkJBQXBFO0FBQ0g7QUFDSixHQTV1Q29CO0FBOHVDckI0SixFQUFBQSw4Q0E5dUNxQiw0REErdUNyQjtBQUNJLFFBQUliLGtCQUFrQixHQUFDOVAsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxFQUF2Qjs7QUFDQSxRQUFJdU4sT0FBTyxHQUFDclEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ2EseUJBQWxDLEdBQThEa0MsV0FBOUQsR0FBNEVDLGdCQUE1RSxDQUE2RjJDLGlCQUF6RztBQUNBckgsSUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQW9FLDhDQUFwRSxFQUFtSCxJQUFuSDs7QUFDQStJLElBQUFBLGtCQUFrQixDQUFDQyx1Q0FBbkIsQ0FBMkQsS0FBM0Q7O0FBQ0EsU0FBS1csOEJBQUwsQ0FBb0MsS0FBcEMsRUFBMEMsSUFBMUMsRUFBK0M3UCxnQkFBL0MsRUFBZ0V3UCxPQUFPLENBQUM5UixTQUF4RTtBQUNILEdBcnZDb0I7QUF1dkNyQm1TLEVBQUFBLDhCQXZ2Q3FCLDBDQXV2Q1VFLGVBdnZDVixFQXV2QzBCQyxvQkF2dkMxQixFQXV2QytDbEIsY0F2dkMvQyxFQXV2QzhEbUIsT0F2dkM5RCxFQXd2Q3JCO0FBQ0ksUUFBSS9MLEtBQUssR0FBQztBQUFDZ00sTUFBQUEsV0FBVyxFQUFDSCxlQUFiO0FBQTZCSSxNQUFBQSxnQkFBZ0IsRUFBQ0gsb0JBQTlDO0FBQW1FSSxNQUFBQSxhQUFhLEVBQUN0QixjQUFqRjtBQUFnR3VCLE1BQUFBLEVBQUUsRUFBQ0o7QUFBbkcsS0FBVjtBQUNBOVEsSUFBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ3NELDBCQUFsQyxHQUErREMsVUFBL0QsQ0FBMEUsQ0FBMUUsRUFBNEVGLEtBQTVFO0FBQ0gsR0EzdkNvQjtBQTZ2Q3JCb00sRUFBQUEsZ0NBN3ZDcUIsNENBNnZDWXBNLEtBN3ZDWixFQTh2Q3JCO0FBQUE7O0FBQ0ksUUFBSStLLGtCQUFrQixHQUFDOVAsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxFQUF2Qjs7QUFDQSxRQUFHLEtBQUs1QixjQUFMLENBQW9CLEtBQUtVLFVBQXpCLEVBQXFDckQsU0FBckMsSUFBZ0R5Qix3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERrQyxXQUE5RCxHQUE0RUMsZ0JBQTVFLENBQTZGWCxJQUE3RixDQUFrR1ksTUFBckosRUFDQTtBQUNJLFVBQUlpTSxlQUFlLEdBQUM3TCxLQUFLLENBQUNnTSxXQUExQjtBQUNBLFVBQUlGLG9CQUFvQixHQUFDOUwsS0FBSyxDQUFDaU0sZ0JBQS9CO0FBQ0EsVUFBSXJCLGNBQWMsR0FBQzVLLEtBQUssQ0FBQ2tNLGFBQXpCO0FBQ0EsVUFBSUcsSUFBSSxHQUFDck0sS0FBSyxDQUFDbU0sRUFBZjs7QUFFQSxVQUFHTixlQUFILEVBQ0E7QUFDSTVRLFFBQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQixxQkFBbEMsR0FBMER1TyxzQ0FBMUQsQ0FBaUcsS0FBakc7QUFDQSxhQUFLblEsY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQzVDLElBQXJDLElBQTJDLElBQTNDO0FBQ0FnQixRQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FBb0UsMEdBQXBFLEVBQStLLElBQS9LOztBQUNBK0ksUUFBQUEsa0JBQWtCLENBQUNRLG9DQUFuQixDQUF3RCxLQUF4RDs7QUFDQSxhQUFLL0YsZ0JBQUw7QUFFSCxPQVJELE1BUU0sSUFBR3NHLG9CQUFILEVBQ047QUFDSSxZQUFJUyxvQkFBb0IsR0FBQyxDQUF6Qjs7QUFDQSxZQUFJQyxXQUFXLEdBQUN2Uix3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDYSx5QkFBbEMsR0FBOERJLFlBQTlELEdBQTZFbUcsaUJBQTdFLEVBQWhCOztBQUVBLGFBQUssSUFBSW5GLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHNE4sV0FBVyxDQUFDck8sTUFBeEMsRUFBZ0RTLEtBQUssRUFBckQsRUFBeUQ7QUFDckQsY0FBR3lOLElBQUksSUFBRUcsV0FBVyxDQUFDNU4sS0FBRCxDQUFYLENBQW1CZSxnQkFBbkIsQ0FBb0MyQyxpQkFBcEMsQ0FBc0Q5SSxTQUEvRCxFQUNBO0FBQ0krUyxZQUFBQSxvQkFBb0IsR0FBQzNOLEtBQXJCO0FBQ0E7QUFDSDtBQUNKOztBQUVELFlBQUdnTSxjQUFjLElBQUUsQ0FBbkIsRUFBcUI7QUFDckI7QUFDSSxnQkFBRzRCLFdBQVcsQ0FBQ0Qsb0JBQUQsQ0FBWCxDQUFrQzVNLGdCQUFsQyxDQUFtRDJDLGlCQUFuRCxDQUFxRS9ILGtCQUF4RSxFQUNBO0FBQ0lVLGNBQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUNDLHNFQURELEVBQ3dFLElBRHhFO0FBRUgsYUFKRCxNQUtBO0FBQ0kvRyxjQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FDQywwRUFERCxFQUM0RSxJQUQ1RTtBQUVIO0FBQ0osV0FYRCxNQVdNLElBQUc0SSxjQUFjLElBQUUsQ0FBbkIsRUFBcUI7QUFDM0I7QUFDSSxnQkFBSTZCLFVBQVUsR0FBQyxLQUFmOztBQUNBLGlCQUFLLElBQUk3TixPQUFLLEdBQUcsQ0FBakIsRUFBb0JBLE9BQUssR0FBRzROLFdBQVcsQ0FBQ0Qsb0JBQUQsQ0FBWCxDQUFrQzVNLGdCQUFsQyxDQUFtRDJDLGlCQUFuRCxDQUFxRTNJLFlBQXJFLENBQWtGd0UsTUFBOUcsRUFBc0hTLE9BQUssRUFBM0gsRUFBK0g7QUFDM0gsa0JBQUc0TixXQUFXLENBQUNELG9CQUFELENBQVgsQ0FBa0M1TSxnQkFBbEMsQ0FBbUQyQyxpQkFBbkQsQ0FBcUUzSSxZQUFyRSxDQUFrRmlGLE9BQWxGLEVBQXlGakcsU0FBNUYsRUFDQTtBQUNJOFQsZ0JBQUFBLFVBQVUsR0FBQyxJQUFYO0FBQ0E7QUFDSDtBQUNKOztBQUVELGdCQUFHQSxVQUFILEVBQ0E7QUFDSXhSLGNBQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUNDLDZDQURELEVBQytDLElBRC9DO0FBRUgsYUFKRCxNQUtBO0FBQ0kvRyxjQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FDQyxnREFERCxFQUNrRCxJQURsRDtBQUVIO0FBQ0osV0FwQkssTUFvQkEsSUFBRzRJLGNBQWMsSUFBRSxDQUFuQixFQUFxQjtBQUMzQjtBQUNJLGdCQUFHNEIsV0FBVyxDQUFDRCxvQkFBRCxDQUFYLENBQWtDNU0sZ0JBQWxDLENBQW1EMkMsaUJBQW5ELENBQXFFaEksVUFBeEUsRUFDQTtBQUNJVyxjQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FDQyw2Q0FERCxFQUMrQyxJQUQvQztBQUVILGFBSkQsTUFLQTtBQUNJL0csY0FBQUEsd0JBQXdCLENBQUMwQixRQUF6QixDQUFrQ29CLHFCQUFsQyxHQUEwRGlFLFNBQTFELENBQ0MsaURBREQsRUFDbUQsSUFEbkQ7QUFFSDtBQUNKLFdBWEssTUFXQSxJQUFHNEksY0FBYyxJQUFFLENBQW5CLEVBQXFCO0FBQzNCO0FBQ0ksZ0JBQUc0QixXQUFXLENBQUNELG9CQUFELENBQVgsQ0FBa0M1TSxnQkFBbEMsQ0FBbUQyQyxpQkFBbkQsQ0FBcUUxSSxpQkFBckUsQ0FBdUZaLFlBQTFGLEVBQ0E7QUFDSWlDLGNBQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUNDLGlEQURELEVBQ21ELElBRG5EO0FBRUgsYUFKRCxNQUtBO0FBQ0kvRyxjQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FDQyxxREFERCxFQUN1RCxJQUR2RDtBQUVIO0FBQ0osV0FYSyxNQVlELElBQUc0SSxjQUFjLElBQUUsQ0FBbkIsRUFBcUI7QUFDMUI7QUFDSSxnQkFBRzRCLFdBQVcsQ0FBQ0Qsb0JBQUQsQ0FBWCxDQUFrQzVNLGdCQUFsQyxDQUFtRDJDLGlCQUFuRCxDQUFxRTFJLGlCQUFyRSxDQUF1RmIsaUJBQTFGLEVBQ0E7QUFDSWtDLGNBQUFBLHdCQUF3QixDQUFDMEIsUUFBekIsQ0FBa0NvQixxQkFBbEMsR0FBMERpRSxTQUExRCxDQUNDLHdEQURELEVBQzBELElBRDFEO0FBRUgsYUFKRCxNQUtBO0FBQ0kvRyxjQUFBQSx3QkFBd0IsQ0FBQzBCLFFBQXpCLENBQWtDb0IscUJBQWxDLEdBQTBEaUUsU0FBMUQsQ0FDQyw0REFERCxFQUM4RCxJQUQ5RDtBQUVIO0FBQ0o7O0FBRUR4QixRQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNidUssVUFBQUEsa0JBQWtCLENBQUNRLG9DQUFuQixDQUF3RCxLQUF4RDs7QUFDQSxVQUFBLE1BQUksQ0FBQy9GLGdCQUFMO0FBQ0gsU0FIUyxFQUdQLElBSE8sQ0FBVjtBQUlIO0FBQ0o7QUFDSixHQXIyQ29CLENBdzJDckI7QUFDQTs7QUF6MkNxQixDQUFULENBQWhCLEVBMjJDQTs7QUFDQWtILE1BQU0sQ0FBQ0MsT0FBUCxHQUFrQjFRLFdBQWxCLEVBQ0EiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vI3JlZ2lvbiBzdXBlcmNsYXNzZXMgYW5kIGVudW1lcmF0aW9uc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgdHlwZSBvZiBidXNpbmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgRW51bUJ1c2luZXNzVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgSG9tZUJhc2VkOiAxLCAgICAgICAgICAgICAgICAgICAvL2EgYnVzaW5lc3MgdGhhdCB5b3Ugb3BlcmF0ZSBvdXQgb2YgeW91ciBob21lXHJcbiAgICBicmlja0FuZG1vcnRhcjogMiAgICAgICAgICAgICAgIC8vYSBzdG9yZSBmcm9udCBidXNpbmVzc1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzc0luZm8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzSW5mbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiQnVzaW5lc3NJbmZvXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOYW1lOiBcIkJ1c2luZXNzRGF0YVwiLFxyXG4gICAgQnVzaW5lc3NUeXBlOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1vZGVcIixcclxuICAgICAgIHR5cGU6IEVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICAgICBkZWZhdWx0OiBFbnVtQnVzaW5lc3NUeXBlLk5vbmUsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiQnVzaW5lc3MgY2F0b2dvcnkgZm9yIHBsYXllcnNcIix9LCBcclxuICAgIEJ1c2luZXNzVHlwZURlc2NyaXB0aW9uOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJUeXBlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiVHlwZSAoYnkgbmFtZSkgb2YgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgQnVzaW5lc3NOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6IFwiTmFtZSBvZiB0aGUgYnVzaW5lc3MgcGxheWVyIGlzIG9wZW5pbmdcIix9LFxyXG4gICAgIEFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBbW91bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJiYWxhbmNlIG9mIGJ1c2luZXNzXCIsfSxcclxuICAgICAgSXNQYXJ0bmVyc2hpcDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc1BhcnRuZXJzaGlwXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwdzpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgZG9uZSBwYXJ0bmVyc2hpcCB3aXRoIHNvbWVvbmUgd2l0aCBjdXJyZW50IGJ1c2luZXNzXCIsfSxcclxuICAgICAgIFBhcnRuZXJJRDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiUGFydG5lcklEXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgdG9vbHRpcDpcIklEIG9mIHRoZSBwYXJ0bmVyIHdpdGggd2hvbSBwbGF5ZXIgaGFzIGZvcm1lZCBwYXJ0bmVyc2hpcFwiLH0sXHJcbiAgICAgICAgTG9jYXRpb25zTmFtZTpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9jYXRpb25zTmFtZVwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBbY2MuVGV4dF0sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgIHRvb2x0aXA6XCJpZiBwbGF5ZXIgb3ducyBicmljayBhbmQgbW9ydGFyIGhlL3NoZSBjYW4gZXhwYW5kIHRvIG5ldyBsb2NhdGlvblwiLH0sXHJcbiAgICAgICAgTG9hblRha2VuOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5BbW91bnRcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcblxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQ2FyZERhdGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIENhcmREYXRhRnVuY3Rpb25hbGl0eSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6IFwiQ2FyZERhdGFGdW5jdGlvbmFsaXR5XCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBOZXh0VHVybkRvdWJsZVBheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJOZXh0VHVybkRvdWJsZVBheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgaXRzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXkgZGF5IG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbiAgICBTa2lwTmV4dFR1cm46XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcE5leHRUdXJuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxyXG4gICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwia2VlcCB0cmFjayBpZiB0dXJuIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCB0dXJuIGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbiAgICBTa2lwTmV4dFBheWRheTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTa2lwTmV4dFBheWRheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxuICAgIFNraXBITU5leHRQYXlkYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcEhNTmV4dFBheWRheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBob21lIGJhc2VkIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSxcclxuICAgIFNraXBCTU5leHRQYXlkYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcEJNTmV4dFBheWRheVwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgcGF5ZGF5IGZvciBicmlja2EgYW5kIG1tb3J0YXIgYnVpc2luZXNzIGlzIGdvaW5nIHRvIHNraXBwZWQgb24gbmV4dCBwYXlkYXkgZm9yIGN1cnJlbnQgcGxheWVyXCJ9LCBcclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgU3RvY2tJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTdG9ja0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIlN0b2NrSW5mb1wiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgTmFtZTogXCJTdG9ja0RhdGFcIixcclxuICAgIEJ1c2luZXNzTmFtZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc05hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm5hbWUgb2YgdGhlIGJ1c2luZXNzIGluIHdoaWNoIHN0b2NrcyB3aWxsIGJlIGhlbGRcIix9LCBcclxuICAgIFNoYXJlQW1vdW50OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTogXCJTaGFyZUFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOiBcIlNoYXJlIGFtb3VudCBvZiB0aGUgc3RvY2tcIix9LFxyXG59LFxyXG5cclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgIFBsYXllciBEYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlBsYXllckRhdGFcIixcclxucHJvcGVydGllczogeyBcclxuICAgIFBsYXllck5hbWU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibmFtZSBvZiB0aGUgcGxheWVyXCIsfSxcclxuICAgIFBsYXllclVJRDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJVSURcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIklEIG9mIHRoZSBwbGF5ZXJcIix9LFxyXG4gICAgQXZhdGFySUQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQXZhdGFySURcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJpZCByZWZlcmVuY2UgZm9yIHBsYXllciBhdmF0YXIgc2VsZWN0aW9uXCIsfSxcclxuICAgIElzQm90OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIklzQm90XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwdzpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIGN1cnJlbnQgcGxheWVyIGlzIGJvdFwiLH0sIFxyXG4gICAgTm9PZkJ1c2luZXNzOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzXCIsXHJcbiAgICAgICB0eXBlOiBbQnVzaW5lc3NJbmZvXSxcclxuICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIk51bWJlciBvZiBidXNpbmVzcyBhIHBsYXllciBjYW4gb3duXCIsfSwgXHJcbiAgICBDYXJkRnVuY3Rpb25hbGl0eTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJDYXJkRnVuY3Rpb25hbGl0eVwiLFxyXG4gICAgICAgdHlwZTogQ2FyZERhdGFGdW5jdGlvbmFsaXR5LFxyXG4gICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiY2FyZCBmdW5jdGlvbmFsaXR5IHN0b3JlZCBieSBwbGF5ZXJcIix9LCBcclxuICAgIEhvbWVCYXNlZEFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJIb21lQmFzZWRBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm51bWJlciBvZiBob21lIGJhc2VkIGJ1c2luZXNzIGEgcGxheWVyIG93bnNcIix9LCBcclxuICAgIEJyaWNrQW5kTW9ydGFyQW1vdW50OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrQW5kTW9ydGFyQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJudW1iZXIgb2YgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBUb3RhbExvY2F0aW9uc0Ftb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbExvY2F0aW9uc0Ftb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibnVtYmVyIG9mIGxvY2F0aW9ucyBvZiBhbGwgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc2Vzc1wiLH0sIFxyXG4gICAgTm9PZlN0b2NrczpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJTdG9ja3NcIixcclxuICAgICAgIHR5cGU6IFtTdG9ja0luZm9dLFxyXG4gICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiTnVtYmVyIG9mIHN0b2NrIGEgcGxheWVyIG93bnNcIix9LCBcclxuICAgIENhc2g6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBjYXNoIHBsYXllciBvd25zXCIsfSxcclxuICAgIEdvbGRDb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJHb2xkQ291bnRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJjb3VudCBvZiBnb2xkIGEgcGxheWVyIG93bnNcIix9LFxyXG4gICAgU3RvY2tDb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJTdG9ja0NvdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiY291bnQgb2Ygc3RvY2tzIGEgcGxheWVyIG93bnNcIix9LFxyXG4gICAgTG9hblRha2VuOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5UYWtlblwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHRha2VuIGxvYW4gZnJvbSBiYW5rIG9yIG5vdFwiLH0sXHJcbiAgICAgTG9hbkFtb3VudDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQW1vdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQW1vdW50IG9mIGxvYW4gdGFrZW4gZnJvbSB0aGUgYmFua1wiLH0sXHJcbiAgICBNYXJrZXRpbmdBbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nQW1vdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwibWFya2V0aW5nIGFtb3VudCBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIExhd3llclN0YXR1czpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMYXd5ZXJTdGF0dXNcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyBoaXJlZCBhIGxhd3llciBvciBub3RcIix9LFxyXG4gICAgSXNCYW5rcnVwdDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc0JhbmtydXB0XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgYmVlbiBCYW5rcnVwdGVkIG9yIG5vdFwiLH0sXHJcbiAgICBTa2lwcGVkTG9hblBheW1lbnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiU2tpcHBlZExvYW5QYXltZW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgc2tpcHBlZCBsb2FuIHBheW1lbnRcIix9LFxyXG4gICAgUGxheWVyUm9sbENvdW50ZXI6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyUm9sbENvdW50ZXJcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJpbnRlZ2VyIHRvIHN0b3JlIHJvbGwgY291bnRvciBmb3IgcGxheWVyXCIsfSxcclxuICAgIEluaXRpYWxDb3VudGVyQXNzaWduZWQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICBpc0dhbWVGaW5pc2hlZDpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiaXNHYW1lRmluaXNoZWRcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgIFRvdGFsU2NvcmU6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsU2NvcmVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICBHYW1lT3ZlcjpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiR2FtZU92ZXJcIixcclxuICAgICAgICAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG59LFxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG5cclxufSk7XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLy8jcmVnaW9uIEdhbWUgTWFuYWdlciBDbGFzc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0obWFpbiBjbGFzcykgY2xhc3MgZm9yIEdhbWUgTWFuYWdlci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUm9sbENvdW50ZXI9MDtcclxudmFyIERpY2VUZW1wPTA7XHJcbnZhciBEaWNlUm9sbD0wO1xyXG52YXIgSXNUd2VlbmluZz1mYWxzZTtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgVHVybkNoZWNrQXJyYXk9W107XHJcbnZhciBCdXNpbmVzc0xvY2F0aW9uTm9kZXM9W107XHJcblxyXG52YXIgUGFzc2VkUGF5RGF5PWZhbHNlO1xyXG52YXIgRG91YmxlUGF5RGF5PWZhbHNlO1xyXG5cclxuLy9jYXJkcyBmdW5jdGlvbmFsaXR5XHJcbnZhciBfbmV4dFR1cm5Eb3VibGVQYXk9ZmFsc2U7XHJcbnZhciBfc2tpcE5leHRUdXJuPWZhbHNlO1xyXG52YXIgX3NraXBOZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgd2hvbGUgcGF5IGRheVxyXG52YXIgX3NraXBITU5leHRQYXlkYXk9ZmFsc2U7IC8vc2tpcCBwYXkgZGF5IGZvciBob21lIGJhc2VkIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIF9za2lwQk1OZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgb25seVxyXG52YXIgQ2FyZEV2ZW50UmVjZWl2ZWQ9ZmFsc2U7XHJcbnZhciBUdXJuSW5Qcm9ncmVzcz1mYWxzZTtcclxuXHJcbnZhciBpc0dhbWVPdmVyPWZhbHNlO1xyXG52YXIgT25lUXVlc3Rpb25JbmRleD0tMTtcclxudmFyIE9uZVF1ZXN0aW9ucz1cclxuW1xyXG4gICAgXCJ5b3UgaGF2ZSBza2lwcGVkIGxvYW4gcHJldmlvdXMgcGF5ZGF5P1wiLFxyXG4gICAgXCJ5b3UgaGF2ZSB0YWtlbiBhbnkgbG9hbj9cIixcclxuICAgIFwieW91IGhhdmUgYmFua3J1cHRlZCBldmVyP1wiLFxyXG4gICAgXCJ5b3VyIG5leHQgdHVybiBpcyBnb2luZyB0byBiZSBza2lwcGVkP1wiLFxyXG4gICAgXCJ5b3VyIG5leHQgcGF5ZGF5IGlzIGdvaW5nIHRvIGJlIGRvdWJsZSBwYXlkYXk/XCJcclxuXTtcclxuXHJcbnZhciBDYXJkRGlzcGxheVNldFRpbW91dD1udWxsO1xyXG5cclxudmFyIEdhbWVNYW5hZ2VyPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJHYW1lTWFuYWdlclwiLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIFBsYXllckdhbWVJbmZvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW1BsYXllckRhdGFdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IFwiYWxsIHBsYXllcidzIGRhdGFcIn0sXHJcbiAgICAgICAgUGxheWVyTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgcGxheWVyXCIsfSwgICAgXHJcbiAgICAgICAgQ2FtZXJhTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgY2FtZXJhXCIsfSwgICAgXHJcbiAgICAgICAgQWxsUGxheWVyVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2YgdWkgb2YgYWxsIHBsYXllcnNcIix9LCAgICAgIFxyXG4gICAgICAgIEFsbFBsYXllck5vZGVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIG9mIG5vZGUgb2YgYWxsIHBsYXllcnMgaW5zaWRlIGdhbWVwbGF5XCIsfSwgICBcclxuICAgICAgICBTdGFydExvY2F0aW9uTm9kZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2Ugb2YgYXR0YXkgb2YgbG9jYXRpb25zXCIsfSwgICBcclxuICAgIH0sXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgUGxheWVyRGF0YTogUGxheWVyRGF0YSxcclxuICAgICAgICBCdXNpbmVzc0luZm86QnVzaW5lc3NJbmZvLFxyXG4gICAgICAgIEVudW1CdXNpbmVzc1R5cGU6RW51bUJ1c2luZXNzVHlwZSxcclxuICAgICAgICBJbnN0YW5jZTpudWxsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vI3JlZ2lvbiBBbGwgRnVuY3Rpb25zIG9mIEdhbWVNYW5hZ2VyXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gaW5zdGFuY2Ugb2YgY2xhc3MgaXMgY3JlYXRlZFxyXG4gICAgQG1ldGhvZCBvbkxvYWRcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuSW5zdGFuY2U9dGhpcztcclxuICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDtcclxuICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgVHVybkNoZWNrQXJyYXk9W107XHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLkluaXRfR2FtZU1hbmFnZXIoKTsgICBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLlJhbmRvbUNhcmRJbmRleD0wO1xyXG4gICAgICAgIHRoaXMuQ2FyZENvdW50ZXI9MDtcclxuICAgICAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9ZmFsc2U7XHJcbiAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9ZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiByZWZlcmVuY2Ugb2YgcmVxdWlyZWQgY2xhc3Nlc1xyXG4gICAgQG1ldGhvZCBDaGVja1JlZmVyZW5jZXNcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENoZWNrUmVmZXJlbmNlcygpXHJcbiAgICAge1xyXG4gICAgICAgIGlmKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPT1udWxsKVxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1yZXF1aXJlKCdHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXInKTtcclxuICAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgaW5pdGlhbCBnYW1lbWFuYWdlciBlc3NldGlhbHNcclxuICAgIEBtZXRob2QgSW5pdF9HYW1lTWFuYWdlclxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgSW5pdF9HYW1lTWFuYWdlciAoKSB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmE9dGhpcy5DYW1lcmFOb2RlLmdldENvbXBvbmVudChjYy5DYW1lcmEpO1xyXG4gICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm89W107XHJcbiAgICAgICAgUm9sbENvdW50ZXI9MDtcclxuICAgICAgICBEaWNlVGVtcD0wO1xyXG4gICAgICAgIERpY2VSb2xsPTA7ICBcclxuXHJcbiAgICAgICAgLy9pZiBqb2luZWQgcGxheWVyIGlzIHNwZWN0YXRlXHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1cyBvZiBpbml0aWFsIGJ1c2luZXNzIHNldHA6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIikpO1xyXG4gICAgICAgICAgICAvL2lmIGluaXRhbCBzZXR1cCBoYXMgYmVlbiBkb25lIGFuZCBnYW1lIGlzIHVuZGVyIHdheVxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpPT10cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIEFsbERhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mbz1BbGxEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm8pO1xyXG5cclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVycz10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuTnVtYmVyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJUdXJuTnVtYmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Jbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TdGFydE5ld0J1c2luZXNzX0J1c2luZXNzU2V0dXAodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNyZWdpb24gcHVibGljIGZ1bmN0aW9ucyB0byBnZXQgZGF0YSAoYWNjZXNzaWJsZSBmcm9tIG90aGVyIGNsYXNzZXMpXHJcbiAgICBHZXRUdXJuTnVtYmVyICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5UdXJuTnVtYmVyO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vI3JlZ2lvbiBTcGVjdGF0ZU1vZGUgQ29kZVxyXG5cclxuICAgIFN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIEFsbERhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllckdhbWVJbmZvXCIpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm89QWxsRGF0YTtcclxuICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM9dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Bc3NpZ25QbGF5ZXJHYW1lVUkoKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpO1xyXG5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW3RoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclJvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24oX3RvUG9zLngsX3RvUG9zLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzeW5jZWQgcGxheWVybm9kZXNcIik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja1R1cm5PblNwZWN0YXRlTGVhdmVfU3BlY3RhdGVNYW5hZ2VyKClcclxuICAgIHtcclxuICAgICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yQ291bnQoKTtcclxuICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT1Ub3RhbENvbm5lY3RlZFBsYXllcnMpXHJcbiAgICAgIHtcclxuICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBmdW5jdGlvbnMgcmVsYXRlZCB0byBUdXJuIE1lY2hhbmlzbSBhbmQgY2FyZCBtZWNoYW5pc21cclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSB3aGF0IGNhcmQgaGFzIGJlZW4gc2VsZWN0ZWQgYnkgcGxheWVyXHJcbiAgICBAbWV0aG9kIFJhaXNlRXZlbnRGb3JDYXJkXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmFpc2VFdmVudEZvckNhcmQoX2RhdGEpXHJcbiAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNSxfZGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgQ2xlYXJEaXNwbGF5VGltZW91dCgpXHJcbiAge1xyXG4gICAgY2xlYXJUaW1lb3V0KENhcmREaXNwbGF5U2V0VGltb3V0KTtcclxuICB9LFxyXG5cclxuICBEaXNwbGF5Q2FyZE9uT3RoZXJzKClcclxuICB7XHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuICAgIGlmKENhcmRFdmVudFJlY2VpdmVkPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChDYXJkRGlzcGxheVNldFRpbW91dCk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLkNhcmRDb3VudGVyKTtcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD1mYWxzZTtcclxuICAgICAgICBpZighdGhpcy5DYXJkRGlzcGxheWVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPXRydWU7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLkNhcmRDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLk9uTGFuZGVkT25TcGFjZShmYWxzZSx0aGlzLlJhbmRvbUNhcmRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIENhcmREaXNwbGF5U2V0VGltb3V0PXNldFRpbWVvdXQoKCkgPT4geyAvL2NoZWNrIGFmdGVyIGV2ZXJ5IDAuNSBzZWNvbmRzXHJcbiAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRDYXJkRGlzcGxheSgpXHJcbiAge1xyXG4gICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVFdmVudEZvckNhcmQoX2RhdGEpXHJcbiAge1xyXG5cclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcblxyXG4gICAgdmFyIFJhbmRvbUNhcmQ9X2RhdGEucmFuZG9tQ2FyZDtcclxuICAgIHZhciBjb3VudGVyPV9kYXRhLmNvdW50ZXI7XHJcblxyXG4gICAgdGhpcy5SYW5kb21DYXJkSW5kZXg9UmFuZG9tQ2FyZDtcclxuICAgIHRoaXMuQ2FyZENvdW50ZXI9Y291bnRlcjtcclxuXHJcbiAgIFxyXG4gICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcbiAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UodHJ1ZSxSYW5kb21DYXJkKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBDYXJkRXZlbnRSZWNlaXZlZD10cnVlO1xyXG4gICAgICAgIC8vIGlmKElzVHdlZW5pbmc9PWZhbHNlICYmIHRoaXMuQ2FyZERpc3BsYXllZD09ZmFsc2UpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsUmFuZG9tQ2FyZCk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuQ2FyZERpc3BsYXllZD10cnVlO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuXHJcbiAgICBcclxuICB9LFxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHBhcnRpY3VsYXIgcGxheWVyIGhhcyBjb21wbGV0ZSB0aGVpciBtb3ZlXHJcbiAgICBAbWV0aG9kIFJhaXNlRXZlbnRUdXJuQ29tcGxldGVcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSYWlzZUV2ZW50VHVybkNvbXBsZXRlKClcclxuICB7XHJcbiAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT1mYWxzZSlcclxuICAgIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg0LEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuXHJcbiAgU3luY0FsbERhdGEoKVxyXG4gIHtcclxuICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICB9ICBcclxufSxcclxuXHJcbiAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgb24gYWxsIHBsYXllcnMgdG8gdmFsaWRhdGUgaWYgbW92ZSBpcyBjb21wbGV0ZWQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzXHJcbiAgICBAbWV0aG9kIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZVxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gIFJlY2VpdmVFdmVudFR1cm5Db21wbGV0ZShfdWlkKVxyXG4gIHtcclxuICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PTApXHJcbiAgICAgICAgICAgICAgICBUdXJuQ2hlY2tBcnJheS5wdXNoKF91aWQpOyBcclxuXHJcbiAgICAgICAgdmFyIEFycmF5TGVuZ3RoPVR1cm5DaGVja0FycmF5Lmxlbmd0aDtcclxuICAgICAgICB2YXIgSURGb3VuZD1mYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQXJyYXlMZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKFR1cm5DaGVja0FycmF5W2luZGV4XT09X3VpZClcclxuICAgICAgICAgICAgICAgIElERm91bmQ9dHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFJREZvdW5kKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvckNvdW50KCk7XHJcbiAgICAgICAgdmFyIFRvdGFsQ29ubmVjdGVkUGxheWVycz10aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuICAgICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PVRvdGFsQ29ubmVjdGVkUGxheWVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgICAgICB0aGlzLlR1cm5Db21wbGV0ZWQ9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuU3luY0FsbERhdGEoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlVHVybigpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHdoZW4gZGljZSBhbmltYXRpb24gaXMgcGxheWVkIG9uIGFsbCBwbGF5ZXJzXHJcbiAgICBAbWV0aG9kIENoYW5nZVR1cm5cclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIENoYW5nZVR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU3luY0FsbERhdGEoKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5UdXJuTnVtYmVyPHRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoLTEpXHJcbiAgICAgICAgICAgIHRoaXMuVHVybk51bWJlcj10aGlzLlR1cm5OdW1iZXIrMTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuVHVybk51bWJlcj0wO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgZnJvbSByYWlzZSBvbiBldmVudCAoZnJvbSBmdW5jdGlvbiBcIlN0YXJ0VHVyblwiIGFuZCBcIkNoYW5nZVR1cm5cIiBvZiB0aGlzIHNhbWUgY2xhc3MpIHRvIGhhbmRsZSB0dXJuXHJcbiAgICBAbWV0aG9kIFR1cm5IYW5kbGVyXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBUdXJuSGFuZGxlcihfdHVybilcclxuICAgIHtcclxuICAgICAgICB2YXIgX3BsYXllck1hdGNoZWQ9ZmFsc2U7XHJcbiAgICAgICAgX3NraXBOZXh0VHVybj1mYWxzZTtcclxuICAgICAgICBpZihJc1R3ZWVuaW5nKSAvL2NoZWNrIGlmIGFuaW1hdGlvbiBvZiB0dXJuIGJlaW5nIHBsYXllZCBvbiBvdGhlciBwbGF5ZXJzIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5IYW5kbGVyKF90dXJuKTtcclxuICAgICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuVHVybk51bWJlcj1fdHVybjtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgX3BsYXllck1hdGNoZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIF9za2lwTmV4dFR1cm49dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybjtcclxuICAgICAgICAgICAgICAgIGlmKCFfc2tpcE5leHRUdXJuKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB5b3VyIHR1cm4gXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVUdXJuUHJvZ3Jlc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5BbGxQbGF5ZXJVSS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIix0aGlzLlR1cm5OdW1iZXIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHVybiBPZjogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbFBsYXllclVJW3RoaXMuVHVybk51bWJlcl0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm8pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAvL3NraXAgdGhpcyB0dXJuIGFzIHNraXAgdHVybiBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlXHJcbiAgICAgICAgICAgIGlmKF9wbGF5ZXJNYXRjaGVkICYmIF9za2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsMTIwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVNraXBOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZClcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgIHZhciBNeURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgICAgIHZhciBfY291bnRlcj1faW5kO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQhPU15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkgLy9kb250IHVwZGF0ZSBteSBvd24gZGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQ9PU1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXT1NYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9LCAgXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBhbGwgcGxheWVycyBoYXZlIGRvbmUgdGhlaXIgaW5pdGlhbCBzZXR1cCBhbmQgZmlyc3QgdHVybiBzdGFydHNcclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTdGFydFR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgICAgIHRoaXMuVHVybk51bWJlcj0wOyAvL3Jlc2V0aW5nIHRoZSB0dXJuIG51bWJlciBvbiBzdGFydCBvZiB0aGUgZ2FtZVxyXG5cclxuICAgICAgICAvL3NlbmRpbmcgaW5pdGlhbCB0dXJuIG51bWJlciBvdmVyIHRoZSBuZXR3b3JrIHRvIHN0YXJ0IHR1cm4gc2ltdWx0YW5vdXNseSBvbiBhbGwgY29ubmVjdGVkIHBsYXllcidzIGRldmljZXNcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIEZ1bmN0aW9uIGZvciBnYW1lcGxheVxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiBwbGF5ZXIgVUkgKG5hbWUvaWNvbnMvbnVtYmVyIG9mIHBsYXllcnMgdGhhdCB0byBiZSBhY3RpdmUgZXRjKVxyXG4gICAgQG1ldGhvZCBBc3NpZ25QbGF5ZXJHYW1lVUlcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEFzc2lnblBsYXllckdhbWVVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlR2FtZVVJKF90b2dnbGVIaWdobGlnaHQsX2luZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGlmKF90b2dnbGVIaWdobGlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW19pbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tfaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoX2luZGV4PT1pbmRleClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlQkdIaWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVUZXh0aWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBlbmJhbGUgcmVzcGVjdGl2ZSBwbGF5ZXJzIG5vZGVzIGluc2lkZSBnYW1hcGxheVxyXG4gICAgQG1ldGhvZCBFbmFibGVQbGF5ZXJOb2Rlc1xyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgRW5hYmxlUGxheWVyTm9kZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQ9PTEpICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbj10aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgIFxyXG4gICAgICAgIGxldCByYXRpbz10YXJnZXRQb3MueS9jYy53aW5TaXplLmhlaWdodDtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MjtcclxuICAgIH0sXHJcblxyXG4gICAgbGF0ZVVwZGF0ZSAoKSB7XHJcbiAgICAgICAgaWYodGhpcy5pc0NhbWVyYVpvb21pbmcpICAgIFxyXG4gICAgICAgICAgICB0aGlzLlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3luY0RpY2VSb2xsKF9yb2xsKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZGljZTE9X3JvbGwuZGljZTE7XHJcbiAgICAgICAgdmFyIF9kaWNlMj1fcm9sbC5kaWNlMjtcclxuICAgICAgICB2YXIgX3Jlc3VsdD1fZGljZTErX2RpY2UyO1xyXG5cclxuICAgICAgICBJc1R3ZWVuaW5nPXRydWU7XHJcbiAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KClbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQ9PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj09MCAmJiAhdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzWzBdLkJ1c2luZXNzVHlwZT09MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUm9sbENvdW50ZXI9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Jbml0aWFsQ291bnRlckFzc2lnbmVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj0xMztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj09MTIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyKzIxOyAgXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIrMTtcclxuXHJcbiAgICAgICAgICAgIFJvbGxDb3VudGVyPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlci0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIERpY2VSb2xsPV9yZXN1bHQ7XHJcbiAgICAgICAgRGljZVRlbXA9MDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKERpY2VSb2xsKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQWxsUGxheWVyVUkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVHVybk51bWJlcj09aW5kZXgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudChcIlBsYXllclByb2ZpbGVNYW5hZ2VyXCIpLkRpY2VSb2xsU2NyZWVuLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KFwiUGxheWVyUHJvZmlsZU1hbmFnZXJcIikuRGljZVJvbGxTY3JlZW4uZ2V0Q29tcG9uZW50KFwiRGljZUNvbnRyb2xsZXJcIikuQW5pbWF0ZURpY2UoX2RpY2UxLF9kaWNlMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoXCJQbGF5ZXJQcm9maWxlTWFuYWdlclwiKS5EaWNlUm9sbFNjcmVlbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgICAgICAvLyB2YXIgX3Bvcz10aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgICAgICAgLy8gdGhpcy5Ud2VlbkNhbWVyYShfcG9zLHRydWUsMC40KTsgICBcclxuICAgIH0sXHJcblxyXG4gICAgRGljZUZ1bnRpb25hbGl0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRhcmdldFBvcz10aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIoMCwxMjApKTtcclxuICAgICAgICB2YXIgX3Bvcz10aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgICAgICAgdGhpcy5Ud2VlbkNhbWVyYShfcG9zLHRydWUsMC40KTsgIFxyXG4gICAgfSxcclxuXHJcbiAgICBUZW1wQ2hlY2tTcGFjZShfcm9sbGluZylcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtcGNvdW50ZXI9MDtcclxuICAgICAgICB2YXIgdGVtcGNvdW50ZXIyPTA7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEPT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGVtcGNvdW50ZXIyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IodGVtcGNvdW50ZXIyK1wiIFwiK19yb2xsKTtcclxuICAgICAgICAvLyBpZigodGVtcGNvdW50ZXIyK19yb2xsKTwzMylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlPT0xKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICB0ZW1wY291bnRlcj0wK19yb2xsLTE7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKHRlbXBjb3VudGVyKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBlbHNlXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHRlbXBjb3VudGVyPTEzK19yb2xsLTE7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKHRlbXBjb3VudGVyKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmVycm9yKHRlbXBjb3VudGVyMitcIiBcIitfcm9sbCk7XHJcbiAgICAgICAgLy8gICAgIHRlbXBjb3VudGVyPXRlbXBjb3VudGVyMitfcm9sbDtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICBpZih0ZW1wY291bnRlcjItMTwwKVxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInN0YXJ0aW5nIGZyb20gb2JsaXZpb25cIik7XHJcbiAgICAgICAgdGVtcGNvdW50ZXI9dGVtcGNvdW50ZXIyK19yb2xsaW5nLTE7XHJcbiAgICAgICAgdmFyIGRpY2V0b2JlPXBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIitkaWNldG9iZSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGNvdW50ZXI9dGVtcGNvdW50ZXIyK19yb2xsaW5nO1xyXG4gICAgICAgIHZhciBkaWNldG9iZT1wYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIrZGljZXRvYmUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsRGljZTpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgdmFyIERpY2UyPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcblxyXG4gICAgICAgIC8vIHZhciBEaWNlMT00O1xyXG4gICAgICAgIC8vIHZhciBEaWNlMj00O1xyXG5cclxuICAgICAgICBEaWNlUm9sbD1EaWNlMStEaWNlMjtcclxuICAgICAgICB2YXIgX25ld1JvbGw9e2RpY2UxOkRpY2UxLGRpY2UyOkRpY2UyfVxyXG4gICAgICAgIC8vRGljZVJvbGw9MjM7XHJcbiAgICAgICAgLy90aGlzLlRlbXBDaGVja1NwYWNlKERpY2VSb2xsKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRpY2UgbnVtYmVyOiBcIitEaWNlUm9sbCtcIiwgRGljZTE6XCIrRGljZTErXCIsIERpY2UyOlwiK0RpY2UyKTtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgzLF9uZXdSb2xsKTsgXHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxPbmVEaWNlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgRGljZTE9dGhpcy5nZXRSYW5kb20oMSw3KTtcclxuICAgICAgICByZXR1cm4gRGljZTE7XHJcbiAgICB9LFxyXG5cclxuICAgIFJvbGxUd29EaWNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgdmFyIERpY2UyPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgcmV0dXJuIChEaWNlMStEaWNlMik7XHJcbiAgICB9LFxyXG5cclxuICAgIGNhbGxVcG9uQ2FyZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9zcGFjZUlEPXBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgaWYoX3NwYWNlSUQhPTYgJiYgX3NwYWNlSUQhPTcpIC8vNiBtZWFucyBwYXlkYXkgYW5kIDcgbWVhbnMgZG91YmxlIHBheWRheSwgOSBtZW5hcyBzZWxsIHNwYWNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgUmFuZG9tQ2FyZD10aGlzLmdldFJhbmRvbSgwLDE1KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vZm9yIHRlc3Rpbmcgb25seVxyXG4gICAgICAgICAgICBpZihfc3BhY2VJRD09MikgLy9sYW5kZWQgb24gc29tZSBiaWcgYnVzZWluc3NcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXg9WzAsMSw3LDEwXTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleD10aGlzLmdldFJhbmRvbSgwLDQpO1xyXG4gICAgICAgICAgICAgICAgUmFuZG9tQ2FyZD12YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoX3NwYWNlSUQ9PTUpIC8vbGFuZGVkIG9uIHNvbWUgbG9zc2VzIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDUsNiwyXTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleD10aGlzLmdldFJhbmRvbSgwLDQpO1xyXG4gICAgICAgICAgICAgICAgUmFuZG9tQ2FyZD12YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKF9zcGFjZUlEPT0zKSAvL2xhbmRlZCBvbiBzb21lIG1hcmtldGluZyBjYXJkc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleD1bMCw3LDMsOCwxMyw5XTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleD10aGlzLmdldFJhbmRvbSgwLDYpO1xyXG4gICAgICAgICAgICAgICAgUmFuZG9tQ2FyZD12YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxzZSBpZihfc3BhY2VJRD09MSkgLy9sYW5kZWQgb24gc29tZSBtYXJrZXRpbmcgY2FyZHNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXg9WzAsMSw2LDEwXTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleD10aGlzLmdldFJhbmRvbSgwLDQpO1xyXG4gICAgICAgICAgICAgICAgUmFuZG9tQ2FyZD12YWx1ZUluZGV4W2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgIHsgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgU2VuZGluZ0RhdGE9e1wicmFuZG9tQ2FyZFwiOlJhbmRvbUNhcmQsXCJjb3VudGVyXCI6Um9sbENvdW50ZXJ9OyAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckNhcmQoU2VuZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EaXNwbGF5Q2FyZE9uT3RoZXJzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcGxldGVDYXJkVHVybigpXHJcbiAgICB7XHJcbiAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRlZCBvbiBwYXkgZGF5IG9yIGRvdWJsZSBwYXkgZGF5IGFuZCB3b3JrIGlzIGRvbmUgc28gY2hhbmdpbmcgdHVyblwiKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2FsbEdhbWVDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PXRoaXMuVHVybk51bWJlcjtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLmlzR2FtZUZpbmlzaGVkPT1mYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLmlzR2FtZUZpbmlzaGVkPXRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIF9jYXNoPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoO1xyXG4gICAgICAgICAgICAgICAgdmFyIEhNQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBCTUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICAgICAgIHZhciBCTUxvY2F0aW9ucz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYW5BbW91bnQrPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBCTUNhc2g9KEJNQW1vdW50K0JNTG9jYXRpb25zKSoxNTAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIEhNQ2FzaD0wO1xyXG4gICAgICAgICAgICAgICAgaWYoSE1BbW91bnQ9PTEpXHJcbiAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTYwMDAwO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MilcclxuICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArNjAwMDA7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKEhNQW1vdW50PT0zKVxyXG4gICAgICAgICAgICAgICAgICAgIEhNQ2FzaD0yNTAwMCsyNTAwMCs2MDAwMDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgVG90YWxBc3NldHM9X2Nhc2grQk1DYXNoK0hNQ2FzaC1sb2FuQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbFNjb3JlPVRvdGFsQXNzZXRzO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgIFJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoX2RhdGEpXHJcbiAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDYsX2RhdGEpO1xyXG4gICB9LFxyXG5cclxuICAgU3luY0dhbWVPdmVyKF9VSUQpXHJcbiAgIHtcclxuICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICB2YXIgTXlEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgIGNvbnNvbGUubG9nKF9VSUQpO1xyXG4gICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkdhbWVPdmVyPXRydWU7XHJcblxyXG4gICAgaWYoTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEPT1fVUlEKVxyXG4gICAge1xyXG4gICAgICAgIC8veW91IHdvblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICBcIkNvbmdyYXRzISB5b3VyIGNhc2ggaXMgaGlnaGVzdCwgeW91IGhhdmUgd29uIHRoZSBnYW1lLlwiK1wiXFxuXCIrJ1xcbicrXCJcXG5cIitcclxuICAgICAgICAgICAgXCJHYW1lIHdpbGwgYmUgcmVzdGFydGVkIGF1dG9tYXRjYWxseSBhZnRlciAxNSBzZWNvbmRzXCIsXHJcbiAgICAgICAgICAgIDE1MDAwXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICAvL3lvdSBsb3NlXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJUb3RhbCBDYXNoOiBcIitNeURhdGEuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlK1wiXFxuXCIrJ1xcbicrXHJcbiAgICAgICAgICAgIFwidW5mb3J0dW5hdGVseSB5b3UgaGF2ZSBsb3N0IHRoZSBnYW1lLlwiK1wiXFxuXCIrJ1xcbicrXCJcXG5cIitcclxuICAgICAgICAgICAgXCJHYW1lIHdpbGwgYmUgcmVzdGFydGVkIGF1dG9tYXRjYWxseSBhZnRlciAxNSBzZWNvbmRzXCIsXHJcbiAgICAgICAgICAgIDE1MDAwXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlc3RhcnRHYW1lKCk7XHJcbiAgICB9LCAxNTA2MCk7XHJcblxyXG4gICB9LFxyXG5cclxuICAgIFN0YXJ0RGljZVJvbGw6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKFJvbGxDb3VudGVyPj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGEubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lb3ZlclwiKTtcclxuICAgICAgICAgICAgaXNHYW1lT3Zlcj10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5DYWxsR2FtZUNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyY29tcGxldGVkPTA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIE1haW5TZXNzaW9uRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBNYWluU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoTWFpblNlc3Npb25EYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyY29tcGxldGVkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHBsYXllcmNvbXBsZXRlZD09dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1heD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBTZWxlY3RlZEluZD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBTZXNzaW9uRGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgU2Vzc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBTZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ub3RhbFNjb3JlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3ZhbHVlID4gbWF4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RlZEluZD1pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heD1fdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZSB3b24gYnkgcGxheWVyIGlkOiBcIitTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZShTZXNzaW9uRGF0YVtTZWxlY3RlZEluZF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZ2FtZSBjb21wbGV0ZWQgb24gYWxsIHN5c3RlbXNcclxuICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgSXNUd2VlbmluZz1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaWNlVGVtcD1EaWNlVGVtcCsxOyBcclxuICAgICAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLlR3ZWVuUGxheWVyKHRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXSxfdG9Qb3MpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UmFuZG9tOmZ1bmN0aW9uKG1pbixtYXgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICkgKyBtaW47IC8vIG1pbiBpbmNsdWRlZCBhbmQgbWF4IGV4Y2x1ZGVkXHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuQ2FtZXJhOiBmdW5jdGlvbiAoX3BvcywgaXNab29tLHRpbWUpIHsgICBcclxuICAgICAgICBjYy50d2Vlbih0aGlzLkNhbWVyYU5vZGUpXHJcbiAgICAgICAgLnRvKHRpbWUsIHsgcG9zaXRpb246IGNjLnYyKF9wb3MueCwgX3Bvcy55KX0se2Vhc2luZzpcInF1YWRJbk91dFwifSlcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYoaXNab29tKVxyXG4gICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFJbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgWm9vbUNhbWVyYUluICgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgIGlmKHRoaXMuQ2FtZXJhLnpvb21SYXRpbzwyKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPXRoaXMuQ2FtZXJhLnpvb21SYXRpbyswLjAzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz0yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmc9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RhcnREaWNlUm9sbCgpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgMTApO1xyXG4gICAgfSxcclxuXHJcbiAgICBDaGVja1BheURheUNvbmRpdGlvbnMoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTYpXHJcbiAgICAgICAgICAgIFBhc3NlZFBheURheT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTcpXHJcbiAgICAgICAgICAgIERvdWJsZVBheURheT10cnVlO1xyXG5cclxuICAgICAgICBfbmV4dFR1cm5Eb3VibGVQYXk9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5Lk5leHRUdXJuRG91YmxlUGF5O1xyXG4gICAgICAgIGlmKFBhc3NlZFBheURheSAmJiAhRG91YmxlUGF5RGF5ICYmICFfbmV4dFR1cm5Eb3VibGVQYXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZigoRG91YmxlUGF5RGF5KSB8fCAoUGFzc2VkUGF5RGF5ICYmIF9uZXh0VHVybkRvdWJsZVBheSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZURvdWJsZVBheU5leHRUdXJuKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXkoZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlByb2Nlc3NQYXlEYXlfVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgWm9vbUNhbWVyYU91dCAoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ2FtZXJhLnpvb21SYXRpbz49MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz1mYWxzZTtcclxuICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPXRoaXMuQ2FtZXJhLnpvb21SYXRpby0wLjAzO1xyXG4gICAgICAgICAgICAgICB0aGlzLlpvb21DYW1lcmFPdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbj1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MTtcclxuXHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKDApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZighaXNHYW1lT3ZlcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVja1BheURheUNvbmRpdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbFVwb25DYXJkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgVHdlZW5QbGF5ZXI6IGZ1bmN0aW9uIChOb2RlLFRvUG9zKSB7XHJcbiAgICAgICAgY2MudHdlZW4oTm9kZSlcclxuICAgICAgICAudG8oMC40LCB7IHBvc2l0aW9uOiBjYy52MihUb1Bvcy54LCBUb1Bvcy55KX0se2Vhc2luZzpcInF1YWRJbk91dFwifSlcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgaWYoRGljZVRlbXA8RGljZVJvbGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighaXNHYW1lT3ZlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGFyc2VJbnQoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5nZXRDb21wb25lbnQoJ1NwYWNlSGFuZGxlcicpLlNwYWNlRGF0YS5TcGFjZXNUeXBlKT09NilcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGFzc2VkUGF5RGF5PXRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKFJvbGxDb3VudGVyPT0xMilcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPVJvbGxDb3VudGVyKzIxOyAgXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPVJvbGxDb3VudGVyKzE7XHJcblxyXG4gICAgICAgICAgICAvL0RpY2VUZW1wPURpY2VUZW1wKzE7IFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhEaWNlVGVtcCtcIiBcIitSb2xsQ291bnRlcik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgLy90aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9Um9sbENvdW50ZXI7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfbmV3cG9zPWNjLlZlYzIoMCwwKTtcclxuICAgICAgICAgICAgdGhpcy5Ud2VlbkNhbWVyYShfbmV3cG9zLGZhbHNlLDAuNik7IC8vem9vbW91dFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9ydWxlcyBpbXBsbWVudGF0aW9uIGR1cmluZyB0dXJuICh0dXJuIGRlY2lzaW9ucylcclxuXHJcbiAgICBUb2dnbGVQYXlEYXkoX3N0MSxfU3QyKVxyXG4gICAge1xyXG4gICAgICAgIFBhc3NlZFBheURheT1fc3QxO1xyXG4gICAgICAgIERvdWJsZVBheURheT1fU3QyO1xyXG4gICAgfSxcclxuXHJcbiAgICBFeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oYW1vdW50LF9pbmRleCxfbG9jYXRpb25OYW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoPj1hbW91bnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaC1hbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ub3RhbExvY2F0aW9uc0Ftb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQrMTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tfaW5kZXhdLkxvY2F0aW9uc05hbWUucHVzaChfbG9jYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBleHBhbmRlZCB5b3VyIGJ1c2luZXNzLlwiLDEwMDApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5PbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgICAgICB9LCAxMjAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoIHRvIGV4cGFuZCB0aGlzIGJ1c2luZXNzLCBjYXNoIG5lZWRlZCAkIFwiK2Ftb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbigpXHJcbiAgICB7XHJcbiAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYocGFyc2VJbnQodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzc1tpXS5CdXNpbmVzc1R5cGUpPT0yKSAvL3RoaXMgbWVhbnMgdGhlcmUgaXMgYnJpY2sgYW5kIG1vcnRhciBpbiBsaXN0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0QnVzaW5lc3NJbmRleChpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdFeHBhbmRCdXNpbmVzc0hhbmRsZXInKS5SZXNldEVkaXRCb3goKTtcclxuICAgICAgICAgICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhCdXNpbmVzc0xvY2F0aW9uTm9kZXMpO1xyXG4gICAgICAgIHJldHVybiBCdXNpbmVzc0xvY2F0aW9uTm9kZXMubGVuZ3RoO1xyXG4gICAgfSxcclxuXHJcbiAgICBEZXN0cm95R2VuZXJhdGVkTm9kZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBCdXNpbmVzc0xvY2F0aW9uTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uKF9uYW1lLF9TaGFyZUFtb3VudCxfaXNBZGRpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoX2lzQWRkaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9zdG9jaz1uZXcgU3RvY2tJbmZvKCk7XHJcbiAgICAgICAgICAgIF9zdG9jay5CdXNpbmVzc05hbWU9X25hbWU7XHJcbiAgICAgICAgICAgIF9zdG9jay5TaGFyZUFtb3VudD1fU2hhcmVBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZlN0b2Nrcy5wdXNoKF9zdG9jayk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBQcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihfaXNEb3VibGVQYXlEYXk9ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBOZXh0UGF5ZGF5PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheTtcclxuICAgICAgICBfc2tpcEhNTmV4dFBheWRheT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEhNTmV4dFBheWRheTtcclxuICAgICAgICBfc2tpcEJNTmV4dFBheWRheT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheTtcclxuXHJcbiAgICAgICAgaWYoX3NraXBOZXh0UGF5ZGF5KSAvL2lmIHByZXZpb3VzbHkgc2tpcCBwYXlkYXkgd2FzIHN0b3JlZCBieSBhbnkgY2FyZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIlNraXBwaW5nIFBheURheS5cIiwxNjAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICB9LCAxNjUwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF90aXRsZT1cIlwiO1xyXG5cclxuICAgICAgICAgICAgaWYoX2lzRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgX3RpdGxlPVwiRG91YmxlUGF5RGF5XCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIF90aXRsZT1cIlBheURheVwiO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSxfaXNEb3VibGVQYXlEYXksX3NraXBITU5leHRQYXlkYXksX3NraXBCTU5leHRQYXlkYXkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4vLyNlbmRyZWdpb25cclxuICAgXHJcbiAgICAvLyNyZWdpb24gQ2FyZHMgUnVsZXNcclxuICAgIFRvZ2dsZURvdWJsZVBheU5leHRUdXJuKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfbmV4dFR1cm5Eb3VibGVQYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheT1fbmV4dFR1cm5Eb3VibGVQYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNraXBOZXh0VHVybihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBOZXh0VHVybj1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybj1fc2tpcE5leHRUdXJuO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X1dob2xlKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcE5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFBheWRheT1fc2tpcE5leHRQYXlkYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcEhNTmV4dFBheWRheT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXk9X3NraXBITU5leHRQYXlkYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwQk1OZXh0UGF5ZGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcEJNTmV4dFBheWRheT1fc2tpcEJNTmV4dFBheWRheTtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlVHVyblByb2dyZXNzKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBUdXJuSW5Qcm9ncmVzcz1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIFJldHVyblR1cm5Qcm9ncmVzcygpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFR1cm5JblByb2dyZXNzO1xyXG4gICAgfSxcclxuICAgIExvc2VBbGxNYXJrZXRpbmdNb25leSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9sb3NlQW1vdW50PS0xO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9sb3NlQW1vdW50PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ9MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2xvc2VBbW91bnQ9MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfbG9zZUFtb3VudFxyXG4gICAgfSxcclxuXHJcbiAgICBNdWx0aXBseU1hcmtldGluZ01vbmV5KF9tdWx0aXBsaWVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfYW1vdW50SW5jcmVhc2VkPS0xO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9hbW91bnRJbmNyZWFzZWQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudCo9X211bHRpcGxpZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9hbW91bnRJbmNyZWFzZWQ9MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfYW1vdW50SW5jcmVhc2VkXHJcbiAgICB9LFxyXG5cclxuICAgIEdldE1hcmtldGluZ01vbmV5KF9wcm9maXQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk1hcmtldGluZ0Ftb3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Byb2ZpdD0oX3Byb2ZpdC8xMDApO1xyXG4gICAgICAgICAgICBfYW1vdW50PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQqPV9wcm9maXQ7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ9MDtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2grPV9hbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9hbW91bnQ9MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfYW1vdW50XHJcbiAgICB9LFxyXG5cclxuICAgIFF1ZXN0aW9uUG9wVXBfT3RoZXJVc2VyX09uZVF1ZXN0aW9uKF9kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfdXNlcklEPV9kYXRhLlVzZXJJRDtcclxuICAgICAgICB2YXIgX3F1ZXN0aW9uSW5kZXg9X2RhdGEuUXVlc3Rpb247XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1fZGF0YS5Vc2VySW5kZXg7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoX3VzZXJJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJRCBtYXRjaGVkXCIpO1xyXG5cclxuICAgICAgICAgICAgX2dhbWVwbGF5VUlNYW5hZ2VyLlRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIE9uZVF1ZXN0aW9uSW5kZXg9X3F1ZXN0aW9uSW5kZXg7XHJcbiAgICAgICAgICAgIHZhciBfcXVlc3Rpb25Bc2tlZD1PbmVRdWVzdGlvbnNbX3F1ZXN0aW9uSW5kZXgtMV07XHJcbiAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfcXVlc3Rpb25Bc2tlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbmVRdWVzdGlvblNjcmVlbl9TcGFjZV9PbmVRdWVzdGlvbihfaXNUdXJuT3Zlcj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgX2dhbWVwbGF5VUlNYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3Jvb21EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKTtcclxuICAgICAgICB2YXIgX215RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgICAgICBcclxuICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5SZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5TZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfbXlEYXRhLF9yb29tRGF0YSxfaXNUdXJuT3ZlcilcclxuICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBPbmVRdWVzdGlvbkRlY2lzaW9uX1BheUFtb3VudF9PbmVRdWVzdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9teURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIGlmKF9teURhdGEuQ2FzaD49NTAwMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoX215RGF0YS5QbGF5ZXJVSUQ9PXRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5DYXNoLT01MDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgcGFpZCBjYXNoIGFtb3VudCB0byBwbGF5ZXIuXCIsMTIwMCk7XHJcbiAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbih0cnVlLGZhbHNlLC0xLF9teURhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE9uZVF1ZXN0aW9uRGVjaXNpb25fQW5zd2VyUXVlc3Rpb25fT25lUXVlc3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfZ2FtZXBsYXlVSU1hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfbXlEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYW5zd2VyZWQgdGhlIHF1ZXN0aW9uLlwiLDEyMDApO1xyXG4gICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uX09uZVF1ZXN0aW9uKGZhbHNlLHRydWUsT25lUXVlc3Rpb25JbmRleCxfbXlEYXRhLlBsYXllclVJRCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFJhaXNlRXZlbnREZWNpc2lvbl9PbmVRdWVzdGlvbihfaGFzRG9uZVBheW1lbnQsX2hhc0Fuc3dlcmVkUXVlc3Rpb24sX3F1ZXN0aW9uSW5kZXgsX1VzZXJJRClcclxuICAgIHtcclxuICAgICAgICB2YXIgX2RhdGE9e1BheW1lbnREb25lOl9oYXNEb25lUGF5bWVudCxRdWVzdGlvbkFuc3dlcmVkOl9oYXNBbnN3ZXJlZFF1ZXN0aW9uLFF1ZXN0aW9uSW5kZXg6X3F1ZXN0aW9uSW5kZXgsSUQ6X1VzZXJJRH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg4LF9kYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgUmVjZWl2ZUV2ZW50RGVjaXNpb25fT25lUXVlc3Rpb24oX2RhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9nYW1lcGxheVVJTWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX2hhc0RvbmVQYXltZW50PV9kYXRhLlBheW1lbnREb25lO1xyXG4gICAgICAgICAgICB2YXIgX2hhc0Fuc3dlcmVkUXVlc3Rpb249X2RhdGEuUXVlc3Rpb25BbnN3ZXJlZDtcclxuICAgICAgICAgICAgdmFyIF9xdWVzdGlvbkluZGV4PV9kYXRhLlF1ZXN0aW9uSW5kZXg7XHJcbiAgICAgICAgICAgIHZhciBfdUlEPV9kYXRhLklEO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoX2hhc0RvbmVQYXltZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2grPTUwMDA7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiUGxheWVyIGhhcyByZWZ1c2VkIHRvIGFuc3dlciB0aGUgcXVlc3Rpb24gaW5zdGVhZCBwYXllZCB0aGUgY2FzaCBhbW91bnQsICQ1MDAwIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnRcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgIF9nYW1lcGxheVVJTWFuYWdlci5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcblxyXG4gICAgICAgICAgICB9ZWxzZSBpZihfaGFzQW5zd2VyZWRRdWVzdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9zZWxlY3RlZFBsYXllckluZGV4PTA7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2FjdG9yc0RhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfdUlEPT1fYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRQbGF5ZXJJbmRleD1pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKF9xdWVzdGlvbkluZGV4PT0xKS8vaGF2ZSB5b3Ugc2tpcHBlZCBsb2FuIHByZXZpb3VzIHBheWRheT9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ta2lwcGVkTG9hblBheW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSBza2lwcGVkIGxvYW4gcGF5ZW1lbnQgaW4gcHJldmlvdXMgcGF5ZGF5XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSBza2lwcGVkIGxvYW4gcGF5ZW1lbnQgaW4gcHJldmlvdXMgcGF5ZGF5XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoX3F1ZXN0aW9uSW5kZXg9PTIpLy9IYXZlIHlvdSB0YWtlbiBhbnkgbG9hbj9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2xvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGFbX3NlbGVjdGVkUGxheWVySW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2xvYW5UYWtlbj10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihfbG9hblRha2VuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIHRvIGhhdmUgdGFrZW4gc29tZSBsb2FuXCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCBub3QgdG8gaGF2ZSB0YWtlbiBhbnkgbG9hblwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKF9xdWVzdGlvbkluZGV4PT0zKS8vQXJlIHlvdSBiYW5rcnVwdGVkPyBpZiBtb3JlIHRoYW4gb25jZSwgdGVsbCBtZSB0aGUgYW1vdW50P1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLklzQmFua3J1cHQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIlBsYXllciBoYXMgYW5zd2VyZWQgdG8gaGF2ZSBiZWVuIGJhbmtydXB0ZWRcIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkIG5vdCB0byBoYXZlIGJlZW4gYmFua3J1cHRlZFwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKF9xdWVzdGlvbkluZGV4PT00KS8vSXMgeW91ciB0dXJuIGdvaW5nIHRvIGJlIHNraXBwZWQgbmV4dCB0aW1lP1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9hY3RvcnNEYXRhW19zZWxlY3RlZFBsYXllckluZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBOZXh0VHVybilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCB0dXJuIHdpbGwgYmUgc2tpcHBlZC5cIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlNob3dUb2FzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJQbGF5ZXIgaGFzIGFuc3dlcmVkLCBuZXh0IHR1cm4gd2lsbCBub3QgYmUgc2tpcHBlZC5cIiwyMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKF9xdWVzdGlvbkluZGV4PT01KS8vSXMgaXQgZ29pbmcgdG8gYmUgZG91YmxlIHBheSBkYXkgeW91ciBuZXh0IHBheWRheT9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfYWN0b3JzRGF0YVtfc2VsZWN0ZWRQbGF5ZXJJbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBiZSBkb3VibGUgcGF5ZGF5XCIsMjEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiUGxheWVyIGhhcyBhbnN3ZXJlZCwgbmV4dCBwYXlkYXkgd2lsbCBub3QgYmUgZG91YmxlIHBheWRheVwiLDIxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBfZ2FtZXBsYXlVSU1hbmFnZXIuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICAgICAgICAgICAgICAgIH0sIDIxNTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICAvLyNlbmRyZWdpb25cclxufSk7XHJcbi8vbW9kdWxlLmV4cG9ydHMgID0gUGxheWVyRGF0YTsgLy93aGVuIGltcG9ydHMgaW4gYW5vdGhlciBzY3JpcHQgb25seSByZWZlcmVuY2Ugb2YgcGxheWVyZGF0YSBjbGFzcyB3b3VsZCBiZSBhYmxlIHRvIGFjY2Vzc2VkIGZyb20gR2FtZW1hbmFnZXIgaW1wb3J0XHJcbm1vZHVsZS5leHBvcnRzICA9IEdhbWVNYW5hZ2VyO1xyXG4vLyNlbmRyZWdpb24iXX0=