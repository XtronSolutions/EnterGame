
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
        this.SyncDataToPlayerGameInfo(0);
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
    this.AssignPlayerGameUI();

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
  DisplayCardOnOthers: function DisplayCardOnOthers() {
    var _this = this;

    console.error(CardEventReceived);

    if (CardEventReceived == true) {
      console.error(this.CardCounter);
      CardEventReceived = false;

      if (!this.CardDisplayed) {
        this.CardDisplayed = true;
        GamePlayReferenceManager.Instance.Get_SpaceManager().Data[this.CardCounter].ReferenceLocation.getComponent('SpaceHandler').OnLandedOnSpace(false, this.RandomCardIndex);
      }
    } else {
      setTimeout(function () {
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

    DiceRoll = _roll;
    DiceTemp = 0;
    GamePlayReferenceManager.Instance.Get_GameplayUIManager().PrintDiceValue_TurnDecision(DiceRoll);
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
    var Dice2 = this.getRandom(1, 7); // var Dice1=this.getRandom(8,25);
    // var Dice2=this.getRandom(8,25);

    DiceRoll = Dice1 + Dice2; //DiceRoll=23;
    //this.TempCheckSpace(DiceRoll);

    console.log("dice number: " + DiceRoll);
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(3, DiceRoll);
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

          for (var _index4 = 0; _index4 < SessionData.length; _index4++) {
            var _value = SessionData[_index4].customProperties.PlayerSessionData.TotalScore;

            if (_value > max) {
              SelectedInd = _index4;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJFbnVtQnVzaW5lc3NUeXBlIiwiY2MiLCJFbnVtIiwiTm9uZSIsIkhvbWVCYXNlZCIsImJyaWNrQW5kbW9ydGFyIiwiQnVzaW5lc3NJbmZvIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIk5hbWUiLCJCdXNpbmVzc1R5cGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24iLCJUZXh0IiwiQnVzaW5lc3NOYW1lIiwiQW1vdW50IiwiSW50ZWdlciIsIklzUGFydG5lcnNoaXAiLCJ0eXB3IiwiQm9vbGVhbiIsIlBhcnRuZXJJRCIsIkxvY2F0aW9uc05hbWUiLCJMb2FuVGFrZW4iLCJMb2FuQW1vdW50IiwiY3RvciIsIkNhcmREYXRhRnVuY3Rpb25hbGl0eSIsIk5leHRUdXJuRG91YmxlUGF5IiwiU2tpcE5leHRUdXJuIiwiU2tpcE5leHRQYXlkYXkiLCJTa2lwSE1OZXh0UGF5ZGF5IiwiU2tpcEJNTmV4dFBheWRheSIsIlN0b2NrSW5mbyIsIlNoYXJlQW1vdW50IiwiUGxheWVyRGF0YSIsIlBsYXllck5hbWUiLCJQbGF5ZXJVSUQiLCJBdmF0YXJJRCIsIklzQm90IiwiTm9PZkJ1c2luZXNzIiwiQ2FyZEZ1bmN0aW9uYWxpdHkiLCJIb21lQmFzZWRBbW91bnQiLCJCcmlja0FuZE1vcnRhckFtb3VudCIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiTm9PZlN0b2NrcyIsIkNhc2giLCJHb2xkQ291bnQiLCJTdG9ja0NvdW50IiwiTWFya2V0aW5nQW1vdW50IiwiTGF3eWVyU3RhdHVzIiwiSXNCYW5rcnVwdCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBsYXllclJvbGxDb3VudGVyIiwiSW5pdGlhbENvdW50ZXJBc3NpZ25lZCIsImlzR2FtZUZpbmlzaGVkIiwiVG90YWxTY29yZSIsIkdhbWVPdmVyIiwiUm9sbENvdW50ZXIiLCJEaWNlVGVtcCIsIkRpY2VSb2xsIiwiSXNUd2VlbmluZyIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsIlR1cm5DaGVja0FycmF5IiwiQnVzaW5lc3NMb2NhdGlvbk5vZGVzIiwiUGFzc2VkUGF5RGF5IiwiRG91YmxlUGF5RGF5IiwiX25leHRUdXJuRG91YmxlUGF5IiwiX3NraXBOZXh0VHVybiIsIl9za2lwTmV4dFBheWRheSIsIl9za2lwSE1OZXh0UGF5ZGF5IiwiX3NraXBCTU5leHRQYXlkYXkiLCJDYXJkRXZlbnRSZWNlaXZlZCIsIlR1cm5JblByb2dyZXNzIiwiaXNHYW1lT3ZlciIsIkdhbWVNYW5hZ2VyIiwiQ29tcG9uZW50IiwiUGxheWVyR2FtZUluZm8iLCJQbGF5ZXJOb2RlIiwiTm9kZSIsIkNhbWVyYU5vZGUiLCJBbGxQbGF5ZXJVSSIsIkFsbFBsYXllck5vZGVzIiwiU3RhcnRMb2NhdGlvbk5vZGVzIiwic3RhdGljcyIsIkluc3RhbmNlIiwib25Mb2FkIiwiVHVybk51bWJlciIsIlR1cm5Db21wbGV0ZWQiLCJDaGVja1JlZmVyZW5jZXMiLCJJbml0X0dhbWVNYW5hZ2VyIiwiUmFuZG9tQ2FyZEluZGV4IiwiQ2FyZENvdW50ZXIiLCJDYXJkRGlzcGxheWVkIiwicmVxdWlyZSIsIkNhbWVyYSIsImdldENvbXBvbmVudCIsImlzQ2FtZXJhWm9vbWluZyIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJDaGVja1NwZWN0YXRlIiwiY29uc29sZSIsImxvZyIsImdldFBob3RvblJlZiIsIm15Um9vbSIsImdldEN1c3RvbVByb3BlcnR5IiwiR2V0X0dhbWVwbGF5VUlNYW5hZ2VyIiwiVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJIiwiQWxsRGF0YSIsIlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyIsIlN5bmNBbGxEYXRhX1NwZWN0YXRlTWFuYWdlciIsIlVwZGF0ZUdhbWVVSSIsIkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiR2V0VHVybk51bWJlciIsIkFzc2lnblBsYXllckdhbWVVSSIsImluZGV4IiwibGVuZ3RoIiwiX3RvUG9zIiwiVmVjMiIsIkdldF9TcGFjZU1hbmFnZXIiLCJEYXRhIiwiUmVmZXJlbmNlTG9jYXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5Iiwic2V0UG9zaXRpb24iLCJNYXhQbGF5ZXJzIiwiYWN0aXZlIiwiQ2hlY2tUdXJuT25TcGVjdGF0ZUxlYXZlX1NwZWN0YXRlTWFuYWdlciIsIlRvdGFsQ29ubmVjdGVkUGxheWVycyIsIm15Um9vbUFjdG9yQ291bnQiLCJQaG90b25BY3RvciIsImN1c3RvbVByb3BlcnRpZXMiLCJ1c2VySUQiLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIkNoYW5nZVR1cm4iLCJSYWlzZUV2ZW50Rm9yQ2FyZCIsIl9kYXRhIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJSYWlzZUV2ZW50IiwiRGlzcGxheUNhcmRPbk90aGVycyIsImVycm9yIiwiT25MYW5kZWRPblNwYWNlIiwic2V0VGltZW91dCIsIlJlc2V0Q2FyZERpc3BsYXkiLCJSZWNlaXZlRXZlbnRGb3JDYXJkIiwiUmFuZG9tQ2FyZCIsInJhbmRvbUNhcmQiLCJjb3VudGVyIiwiUmFpc2VFdmVudFR1cm5Db21wbGV0ZSIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsIlN5bmNBbGxEYXRhIiwiUmVjZWl2ZUV2ZW50VHVybkNvbXBsZXRlIiwiX3VpZCIsInB1c2giLCJBcnJheUxlbmd0aCIsIklERm91bmQiLCJUdXJuSGFuZGxlciIsIl90dXJuIiwiX3BsYXllck1hdGNoZWQiLCJUb2dnbGVUdXJuUHJvZ3Jlc3MiLCJUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24iLCJSZXNldFR1cm5WYXJpYWJsZSIsIlBsYXllckluZm8iLCJSb29tQWN0b3JzIiwiU2hvd1RvYXN0IiwiVG9nZ2xlU2tpcE5leHRUdXJuIiwiX2luZCIsIk1haW5TZXNzaW9uRGF0YSIsIk15RGF0YSIsIl9jb3VudGVyIiwiUGxheWVyU2Vzc2lvbkRhdGEiLCJTdGFydFR1cm4iLCJFbmFibGVQbGF5ZXJOb2RlcyIsIlNldE5hbWUiLCJfdG9nZ2xlSGlnaGxpZ2h0IiwiX2luZGV4IiwiVG9nZ2xlQkdIaWdobGlnaHRlciIsIlRvZ2dsZVRleHRpZ2hsaWdodGVyIiwiU2V0Rm9sbG93Q2FtZXJhUHJvcGVydGllcyIsInRhcmdldFBvcyIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsInBhcmVudCIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwicmF0aW8iLCJ3aW5TaXplIiwiaGVpZ2h0Iiwiem9vbVJhdGlvIiwibGF0ZVVwZGF0ZSIsInN5bmNEaWNlUm9sbCIsIl9yb2xsIiwibXlSb29tQWN0b3JzQXJyYXkiLCJQcmludERpY2VWYWx1ZV9UdXJuRGVjaXNpb24iLCJfcG9zIiwiVHdlZW5DYW1lcmEiLCJUZW1wQ2hlY2tTcGFjZSIsIl9yb2xsaW5nIiwidGVtcGNvdW50ZXIiLCJ0ZW1wY291bnRlcjIiLCJkaWNldG9iZSIsInBhcnNlSW50IiwiU3BhY2VEYXRhIiwiU3BhY2VzVHlwZSIsIlJvbGxEaWNlIiwiRGljZTEiLCJnZXRSYW5kb20iLCJEaWNlMiIsIlJvbGxPbmVEaWNlIiwiUm9sbFR3b0RpY2VzIiwiY2FsbFVwb25DYXJkIiwiX3NwYWNlSUQiLCJ2YWx1ZUluZGV4IiwiU2VuZGluZ0RhdGEiLCJjb21wbGV0ZUNhcmRUdXJuIiwiQ2FsbEdhbWVDb21wbGV0ZSIsIl9wbGF5ZXJJbmRleCIsIl9jYXNoIiwiSE1BbW91bnQiLCJHZXRfR2FtZU1hbmFnZXIiLCJCTUFtb3VudCIsIkJNTG9jYXRpb25zIiwibG9hbkFtb3VudCIsIkJNQ2FzaCIsIkhNQ2FzaCIsIlRvdGFsQXNzZXRzIiwiUmFpc2VFdmVudEZvckdhbWVDb21wbGV0ZSIsIlN5bmNHYW1lT3ZlciIsIl9VSUQiLCJSZXN0YXJ0R2FtZSIsIlN0YXJ0RGljZVJvbGwiLCJab29tQ2FtZXJhT3V0IiwicGxheWVyY29tcGxldGVkIiwibWF4IiwiU2VsZWN0ZWRJbmQiLCJTZXNzaW9uRGF0YSIsIl92YWx1ZSIsIlR3ZWVuUGxheWVyIiwibWluIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaXNab29tIiwidGltZSIsInR3ZWVuIiwidG8iLCJ2MiIsImVhc2luZyIsImNhbGwiLCJab29tQ2FtZXJhSW4iLCJzdGFydCIsIkNoZWNrUGF5RGF5Q29uZGl0aW9ucyIsIlRvZ2dsZURvdWJsZVBheU5leHRUdXJuIiwiVG9nZ2xlUGF5RGF5IiwiUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24iLCJUb1BvcyIsIl9uZXdwb3MiLCJfc3QxIiwiX1N0MiIsIkV4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsImFtb3VudCIsIl9sb2NhdGlvbk5hbWUiLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJpIiwibm9kZSIsImluc3RhbnRpYXRlIiwiVHVybkRlY2lzaW9uU2V0dXBVSSIsIkV4cGFuZEJ1c2luZXNzUHJlZmFiIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiU2V0QnVzaW5lc3NJbmRleCIsIlJlc2V0RWRpdEJveCIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsImRlc3Ryb3kiLCJVcGRhdGVTdG9ja3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJfU2hhcmVBbW91bnQiLCJfaXNBZGRpbmciLCJfc3RvY2siLCJfaXNEb3VibGVQYXlEYXkiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiX3RpdGxlIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfc3RhdGUiLCJUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZCIsIlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIiLCJSZXR1cm5UdXJuUHJvZ3Jlc3MiLCJMb3NlQWxsTWFya2V0aW5nTW9uZXkiLCJfbG9zZUFtb3VudCIsIk11bHRpcGx5TWFya2V0aW5nTW9uZXkiLCJfbXVsdGlwbGllciIsIl9hbW91bnRJbmNyZWFzZWQiLCJHZXRNYXJrZXRpbmdNb25leSIsIl9wcm9maXQiLCJfYW1vdW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsSUFBSUEsZ0JBQWdCLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUMsQ0FEc0I7QUFFM0JDLEVBQUFBLFNBQVMsRUFBRSxDQUZnQjtBQUVLO0FBQ2hDQyxFQUFBQSxjQUFjLEVBQUUsQ0FIVyxDQUdLOztBQUhMLENBQVIsQ0FBdkIsRUFNQTs7QUFDQSxJQUFJQyxZQUFZLEdBQUdMLEVBQUUsQ0FBQ00sS0FBSCxDQUFTO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsY0FEa0I7QUFFNUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUUsY0FERTtBQUVSQyxJQUFBQSxZQUFZLEVBQ2I7QUFDSUMsTUFBQUEsV0FBVyxFQUFDLE1BRGhCO0FBRUlDLE1BQUFBLElBQUksRUFBRWIsZ0JBRlY7QUFHSSxpQkFBU0EsZ0JBQWdCLENBQUNHLElBSDlCO0FBSUlXLE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUM7QUFMWixLQUhTO0FBU1JDLElBQUFBLHVCQUF1QixFQUN4QjtBQUNJSixNQUFBQSxXQUFXLEVBQUUsTUFEakI7QUFFSUMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNnQixJQUZiO0FBR0ksaUJBQVMsRUFIYjtBQUlJSCxNQUFBQSxZQUFZLEVBQUUsSUFKbEI7QUFLSUMsTUFBQUEsT0FBTyxFQUFFO0FBTGIsS0FWUztBQWdCUkcsSUFBQUEsWUFBWSxFQUNiO0FBQ0lOLE1BQUFBLFdBQVcsRUFBRSxNQURqQjtBQUVJQyxNQUFBQSxJQUFJLEVBQUVaLEVBQUUsQ0FBQ2dCLElBRmI7QUFHSSxpQkFBUyxFQUhiO0FBSUlILE1BQUFBLFlBQVksRUFBRSxJQUpsQjtBQUtJQyxNQUFBQSxPQUFPLEVBQUU7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RUEwbkNyQjtBQUNJLFFBQUlDLE9BQU8sR0FBQyxDQUFDLENBQWI7O0FBQ0EsUUFBRyxLQUFLek4sY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3RDLGVBQXJDLEdBQXFELENBQXhELEVBQ0E7QUFDSW9QLE1BQUFBLE9BQU8sR0FBRUEsT0FBTyxHQUFDLEdBQWpCO0FBQ0FDLE1BQUFBLE9BQU8sR0FBQyxLQUFLek4sY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3RDLGVBQXJDLElBQXNEb1AsT0FBOUQ7QUFDQSxXQUFLeE4sY0FBTCxDQUFvQixLQUFLVSxVQUF6QixFQUFxQ3RDLGVBQXJDLEdBQXFELENBQXJEO0FBQ0EsV0FBSzRCLGNBQUwsQ0FBb0IsS0FBS1UsVUFBekIsRUFBcUN6QyxJQUFyQyxJQUEyQ3dQLE9BQTNDO0FBQ0gsS0FORCxNQVFBO0FBQ0lBLE1BQUFBLE9BQU8sR0FBQyxDQUFSO0FBQ0g7O0FBRUQsV0FBT0EsT0FBUDtBQUNILEdBem9Db0IsQ0E0b0NyQjtBQUNBOztBQTdvQ3FCLENBQVQsQ0FBaEIsRUErb0NBOztBQUNBQyxNQUFNLENBQUNDLE9BQVAsR0FBa0I3TixXQUFsQixFQUNBIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyNyZWdpb24gc3VwZXJjbGFzc2VzIGFuZCBlbnVtZXJhdGlvbnNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIHR5cGUgb2YgYnVzaW5lc3MtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEVudW1CdXNpbmVzc1R5cGUgPSBjYy5FbnVtKHtcclxuICAgIE5vbmU6MCxcclxuICAgIEhvbWVCYXNlZDogMSwgICAgICAgICAgICAgICAgICAgLy9hIGJ1c2luZXNzIHRoYXQgeW91IG9wZXJhdGUgb3V0IG9mIHlvdXIgaG9tZVxyXG4gICAgYnJpY2tBbmRtb3J0YXI6IDIgICAgICAgICAgICAgICAvL2Egc3RvcmUgZnJvbnQgYnVzaW5lc3NcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3NJbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc0luZm8gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIkJ1c2luZXNzSW5mb1wiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgTmFtZTogXCJCdXNpbmVzc0RhdGFcIixcclxuICAgIEJ1c2luZXNzVHlwZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJNb2RlXCIsXHJcbiAgICAgICB0eXBlOiBFbnVtQnVzaW5lc3NUeXBlLFxyXG4gICAgICAgZGVmYXVsdDogRW51bUJ1c2luZXNzVHlwZS5Ob25lLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIkJ1c2luZXNzIGNhdG9nb3J5IGZvciBwbGF5ZXJzXCIsfSwgXHJcbiAgICBCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbjpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6IFwiVHlwZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOiBcIlR5cGUgKGJ5IG5hbWUpIG9mIGJ1c2luZXNzIHBsYXllciBpcyBvcGVuaW5nXCIsfSxcclxuICAgIEJ1c2luZXNzTmFtZTpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6IFwiTmFtZVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOiBcIk5hbWUgb2YgdGhlIGJ1c2luZXNzIHBsYXllciBpcyBvcGVuaW5nXCIsfSxcclxuICAgICBBbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQW1vdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiYmFsYW5jZSBvZiBidXNpbmVzc1wiLH0sXHJcbiAgICAgIElzUGFydG5lcnNoaXA6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNQYXJ0bmVyc2hpcFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cHc6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGRvbmUgcGFydG5lcnNoaXAgd2l0aCBzb21lb25lIHdpdGggY3VycmVudCBidXNpbmVzc1wiLH0sXHJcbiAgICAgICBQYXJ0bmVySUQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIlBhcnRuZXJJRFwiLFxyXG4gICAgICAgICAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgIHRvb2x0aXA6XCJJRCBvZiB0aGUgcGFydG5lciB3aXRoIHdob20gcGxheWVyIGhhcyBmb3JtZWQgcGFydG5lcnNoaXBcIix9LFxyXG4gICAgICAgIExvY2F0aW9uc05hbWU6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvY2F0aW9uc05hbWVcIixcclxuICAgICAgICAgICAgICAgdHlwZTogW2NjLlRleHRdLFxyXG4gICAgICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICB0b29sdGlwOlwiaWYgcGxheWVyIG93bnMgYnJpY2sgYW5kIG1vcnRhciBoZS9zaGUgY2FuIGV4cGFuZCB0byBuZXcgbG9jYXRpb25cIix9LFxyXG4gICAgICAgIExvYW5UYWtlbjpcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hblRha2VuXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICAgICBMb2FuQW1vdW50OlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQW1vdW50XCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG5cclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIENhcmREYXRhLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBDYXJkRGF0YUZ1bmN0aW9uYWxpdHkgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiBcIkNhcmREYXRhRnVuY3Rpb25hbGl0eVwiLFxyXG5wcm9wZXJ0aWVzOiB7IFxyXG4gICAgTmV4dFR1cm5Eb3VibGVQYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTmV4dFR1cm5Eb3VibGVQYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIGl0cyBnb2luZyB0byBiZSBkb3VibGUgcGF5IGRheSBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG4gICAgU2tpcE5leHRUdXJuOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBOZXh0VHVyblwiLFxyXG4gICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImtlZXAgdHJhY2sgaWYgdHVybiBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgdHVybiBmb3IgY3VycmVudCBwbGF5ZXJcIn0sIFxyXG4gICAgU2tpcE5leHRQYXlkYXk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2tpcE5leHRQYXlkYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHBheWRheSBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbiAgICBTa2lwSE1OZXh0UGF5ZGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBITU5leHRQYXlkYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgaG9tZSBiYXNlZCBidWlzaW5lc3MgaXMgZ29pbmcgdG8gc2tpcHBlZCBvbiBuZXh0IHBheWRheSBmb3IgY3VycmVudCBwbGF5ZXJcIn0sXHJcbiAgICBTa2lwQk1OZXh0UGF5ZGF5OlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBCTU5leHRQYXlkYXlcIixcclxuICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJrZWVwIHRyYWNrIGlmIHBheWRheSBmb3IgYnJpY2thIGFuZCBtbW9ydGFyIGJ1aXNpbmVzcyBpcyBnb2luZyB0byBza2lwcGVkIG9uIG5leHQgcGF5ZGF5IGZvciBjdXJyZW50IHBsYXllclwifSwgXHJcbn0sXHJcblxyXG5jdG9yOiBmdW5jdGlvbiAoKSB7IC8vY29uc3RydWN0b3JcclxufVxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFN0b2NrSW5mby0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU3RvY2tJbmZvID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogXCJTdG9ja0luZm9cIixcclxucHJvcGVydGllczogeyBcclxuICAgIE5hbWU6IFwiU3RvY2tEYXRhXCIsXHJcbiAgICBCdXNpbmVzc05hbWU6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NOYW1lXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJuYW1lIG9mIHRoZSBidXNpbmVzcyBpbiB3aGljaCBzdG9ja3Mgd2lsbCBiZSBoZWxkXCIsfSwgXHJcbiAgICBTaGFyZUFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6IFwiU2hhcmVBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDogXCJTaGFyZSBhbW91bnQgb2YgdGhlIHN0b2NrXCIsfSxcclxufSxcclxuXHJcbmN0b3I6IGZ1bmN0aW9uICgpIHsgLy9jb25zdHJ1Y3RvclxyXG59XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yICBQbGF5ZXIgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGxheWVyRGF0YSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJQbGF5ZXJEYXRhXCIsXHJcbnByb3BlcnRpZXM6IHsgXHJcbiAgICBQbGF5ZXJOYW1lOlxyXG4gICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlBsYXllck5hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgICBkZWZhdWx0OiBcIlwiLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm5hbWUgb2YgdGhlIHBsYXllclwiLH0sXHJcbiAgICBQbGF5ZXJVSUQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyVUlEXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJJRCBvZiB0aGUgcGxheWVyXCIsfSxcclxuICAgIEF2YXRhcklEOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkF2YXRhcklEXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiaWQgcmVmZXJlbmNlIGZvciBwbGF5ZXIgYXZhdGFyIHNlbGVjdGlvblwiLH0sXHJcbiAgICBJc0JvdDpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJJc0JvdFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cHc6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBjdXJyZW50IHBsYXllciBpcyBib3RcIix9LCBcclxuICAgIE5vT2ZCdXNpbmVzczpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1wiLFxyXG4gICAgICAgdHlwZTogW0J1c2luZXNzSW5mb10sXHJcbiAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJOdW1iZXIgb2YgYnVzaW5lc3MgYSBwbGF5ZXIgY2FuIG93blwiLH0sIFxyXG4gICAgQ2FyZEZ1bmN0aW9uYWxpdHk6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FyZEZ1bmN0aW9uYWxpdHlcIixcclxuICAgICAgIHR5cGU6IENhcmREYXRhRnVuY3Rpb25hbGl0eSxcclxuICAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcImNhcmQgZnVuY3Rpb25hbGl0eSBzdG9yZWQgYnkgcGxheWVyXCIsfSwgXHJcbiAgICBIb21lQmFzZWRBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkQW1vdW50XCIsXHJcbiAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJudW1iZXIgb2YgaG9tZSBiYXNlZCBidXNpbmVzcyBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBCcmlja0FuZE1vcnRhckFtb3VudDpcclxuICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja0FuZE1vcnRhckFtb3VudFwiLFxyXG4gICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwibnVtYmVyIG9mIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgYSBwbGF5ZXIgb3duc1wiLH0sIFxyXG4gICAgVG90YWxMb2NhdGlvbnNBbW91bnQ6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxMb2NhdGlvbnNBbW91bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIm51bWJlciBvZiBsb2NhdGlvbnMgb2YgYWxsIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3Nlc3NcIix9LCBcclxuICAgIE5vT2ZTdG9ja3M6XHJcbiAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU3RvY2tzXCIsXHJcbiAgICAgICB0eXBlOiBbU3RvY2tJbmZvXSxcclxuICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIk51bWJlciBvZiBzdG9jayBhIHBsYXllciBvd25zXCIsfSwgXHJcbiAgICBDYXNoOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlcixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJBbW91bnQgb2YgY2FzaCBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBHb2xkQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiR29sZENvdW50XCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiY291bnQgb2YgZ29sZCBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIFN0b2NrQ291bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tDb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcImNvdW50IG9mIHN0b2NrcyBhIHBsYXllciBvd25zXCIsfSxcclxuICAgIExvYW5UYWtlbjpcclxuICAgICAgIHtcclxuICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJMb2FuVGFrZW5cIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiQ2hlY2sgaWYgcGxheWVyIGhhcyB0YWtlbiBsb2FuIGZyb20gYmFuayBvciBub3RcIix9LFxyXG4gICAgIExvYW5BbW91bnQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkFtb3VudCBvZiBsb2FuIHRha2VuIGZyb20gdGhlIGJhbmtcIix9LFxyXG4gICAgTWFya2V0aW5nQW1vdW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIk1hcmtldGluZ0Ftb3VudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIm1hcmtldGluZyBhbW91bnQgYSBwbGF5ZXIgb3duc1wiLH0sXHJcbiAgICBMYXd5ZXJTdGF0dXM6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiTGF3eWVyU3RhdHVzXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgdHlwZTpjYy5Cb29sZWFuLFxyXG4gICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICB0b29sdGlwOiBcIkNoZWNrIGlmIHBsYXllciBoYXMgaGlyZWQgYSBsYXd5ZXIgb3Igbm90XCIsfSxcclxuICAgIElzQmFua3J1cHQ6XHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiSXNCYW5rcnVwdFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIGJlZW4gQmFua3J1cHRlZCBvciBub3RcIix9LFxyXG4gICAgU2tpcHBlZExvYW5QYXltZW50OlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBwZWRMb2FuUGF5bWVudFwiLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgIHR5cGU6Y2MuQm9vbGVhbixcclxuICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgdG9vbHRpcDogXCJDaGVjayBpZiBwbGF5ZXIgaGFzIHNraXBwZWQgbG9hbiBwYXltZW50XCIsfSxcclxuICAgIFBsYXllclJvbGxDb3VudGVyOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllclJvbGxDb3VudGVyXCIsXHJcbiAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IFwiaW50ZWdlciB0byBzdG9yZSByb2xsIGNvdW50b3IgZm9yIHBsYXllclwiLH0sXHJcbiAgICBJbml0aWFsQ291bnRlckFzc2lnbmVkOlxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkluaXRpYWxDb3VudGVyQXNzaWduZWRcIixcclxuICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICB0eXBlOmNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLH0sXHJcbiAgICAgaXNHYW1lRmluaXNoZWQ6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcImlzR2FtZUZpbmlzaGVkXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxuICAgICBUb3RhbFNjb3JlOlxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbFNjb3JlXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LFxyXG4gICAgR2FtZU92ZXI6XHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkdhbWVPdmVyXCIsXHJcbiAgICAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsfSxcclxufSxcclxuY3RvcjogZnVuY3Rpb24gKCkgeyAvL2NvbnN0cnVjdG9yXHJcbn1cclxuXHJcbn0pO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbi8vI3JlZ2lvbiBHYW1lIE1hbmFnZXIgQ2xhc3NcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKG1haW4gY2xhc3MpIGNsYXNzIGZvciBHYW1lIE1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFJvbGxDb3VudGVyPTA7XHJcbnZhciBEaWNlVGVtcD0wO1xyXG52YXIgRGljZVJvbGw9MDtcclxudmFyIElzVHdlZW5pbmc9ZmFsc2U7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9bnVsbDtcclxudmFyIFR1cm5DaGVja0FycmF5PVtdO1xyXG52YXIgQnVzaW5lc3NMb2NhdGlvbk5vZGVzPVtdO1xyXG5cclxudmFyIFBhc3NlZFBheURheT1mYWxzZTtcclxudmFyIERvdWJsZVBheURheT1mYWxzZTtcclxuXHJcbi8vY2FyZHMgZnVuY3Rpb25hbGl0eVxyXG52YXIgX25leHRUdXJuRG91YmxlUGF5PWZhbHNlO1xyXG52YXIgX3NraXBOZXh0VHVybj1mYWxzZTtcclxudmFyIF9za2lwTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHdob2xlIHBheSBkYXlcclxudmFyIF9za2lwSE1OZXh0UGF5ZGF5PWZhbHNlOyAvL3NraXAgcGF5IGRheSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc2VzcyBvbmx5XHJcbnZhciBfc2tpcEJNTmV4dFBheWRheT1mYWxzZTsgLy9za2lwIHBheSBkYXkgZm9yIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIG9ubHlcclxudmFyIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG52YXIgVHVybkluUHJvZ3Jlc3M9ZmFsc2U7XHJcblxyXG52YXIgaXNHYW1lT3Zlcj1mYWxzZTtcclxuXHJcbnZhciBHYW1lTWFuYWdlcj1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiR2FtZU1hbmFnZXJcIixcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBQbGF5ZXJHYW1lSW5mbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFtQbGF5ZXJEYXRhXSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBcImFsbCBwbGF5ZXIncyBkYXRhXCJ9LFxyXG4gICAgICAgIFBsYXllck5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIHBsYXllclwiLH0sICAgIFxyXG4gICAgICAgIENhbWVyYU5vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIGNhbWVyYVwiLH0sICAgIFxyXG4gICAgICAgIEFsbFBsYXllclVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIG9mIHVpIG9mIGFsbCBwbGF5ZXJzXCIsfSwgICAgICBcclxuICAgICAgICBBbGxQbGF5ZXJOb2Rlczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBvZiBub2RlIG9mIGFsbCBwbGF5ZXJzIGluc2lkZSBnYW1lcGxheVwiLH0sICAgXHJcbiAgICAgICAgU3RhcnRMb2NhdGlvbk5vZGVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIG9mIGF0dGF5IG9mIGxvY2F0aW9uc1wiLH0sICAgXHJcbiAgICB9LFxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIFBsYXllckRhdGE6IFBsYXllckRhdGEsXHJcbiAgICAgICAgQnVzaW5lc3NJbmZvOkJ1c2luZXNzSW5mbyxcclxuICAgICAgICBFbnVtQnVzaW5lc3NUeXBlOkVudW1CdXNpbmVzc1R5cGUsXHJcbiAgICAgICAgSW5zdGFuY2U6bnVsbFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNyZWdpb24gQWxsIEZ1bmN0aW9ucyBvZiBHYW1lTWFuYWdlclxyXG4gICAgXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGluc3RhbmNlIG9mIGNsYXNzIGlzIGNyZWF0ZWRcclxuICAgIEBtZXRob2Qgb25Mb2FkXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLkluc3RhbmNlPXRoaXM7XHJcbiAgICAgICAgdGhpcy5UdXJuTnVtYmVyPTA7XHJcbiAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkPWZhbHNlO1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgdGhpcy5Jbml0X0dhbWVNYW5hZ2VyKCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5SYW5kb21DYXJkSW5kZXg9MDtcclxuICAgICAgICB0aGlzLkNhcmRDb3VudGVyPTA7XHJcbiAgICAgICAgdGhpcy5DYXJkRGlzcGxheWVkPWZhbHNlO1xyXG4gICAgICAgIENhcmRFdmVudFJlY2VpdmVkPWZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBhc3NpZ24gcmVmZXJlbmNlIG9mIHJlcXVpcmVkIGNsYXNzZXNcclxuICAgIEBtZXRob2QgQ2hlY2tSZWZlcmVuY2VzXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGVja1JlZmVyZW5jZXMoKVxyXG4gICAgIHtcclxuICAgICAgICBpZighR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyIHx8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj09bnVsbClcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9cmVxdWlyZSgnR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgIEBzdW1tYXJ5IGluaXRpYWwgZ2FtZW1hbmFnZXIgZXNzZXRpYWxzXHJcbiAgICBAbWV0aG9kIEluaXRfR2FtZU1hbmFnZXJcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEluaXRfR2FtZU1hbmFnZXIgKCkge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhPXRoaXMuQ2FtZXJhTm9kZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKTtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhWm9vbWluZz1mYWxzZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvPVtdO1xyXG4gICAgICAgIFJvbGxDb3VudGVyPTA7XHJcbiAgICAgICAgRGljZVRlbXA9MDtcclxuICAgICAgICBEaWNlUm9sbD0wOyAgXHJcblxyXG4gICAgICAgIC8vaWYgam9pbmVkIHBsYXllciBpcyBzcGVjdGF0ZVxyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuQ2hlY2tTcGVjdGF0ZSgpPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdGF0dXMgb2YgaW5pdGlhbCBidXNpbmVzcyBzZXRwOiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLmdldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIpKTtcclxuICAgICAgICAgICAgLy9pZiBpbml0YWwgc2V0dXAgaGFzIGJlZW4gZG9uZSBhbmQgZ2FtZSBpcyB1bmRlciB3YXlcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiKT09dHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHZhciBBbGxEYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuZ2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJHYW1lSW5mb1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm89QWxsRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbygwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5nZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZUdhbWVVSSh0cnVlLHRoaXMuVHVybk51bWJlcik7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLkluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vI3JlZ2lvbiBwdWJsaWMgZnVuY3Rpb25zIHRvIGdldCBkYXRhIChhY2Nlc3NpYmxlIGZyb20gb3RoZXIgY2xhc3NlcylcclxuICAgIEdldFR1cm5OdW1iZXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlR1cm5OdW1iZXI7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgLy8jcmVnaW9uIFNwZWN0YXRlTW9kZSBDb2RlXHJcblxyXG4gICAgU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkFzc2lnblBsYXllckdhbWVVSSgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdmFyIF90b1Bvcz1jYy5WZWMyKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5QbGF5ZXJSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24ucG9zaXRpb24ueCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbihfdG9Qb3MueCxfdG9Qb3MueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInN5bmNlZCBwbGF5ZXJub2Rlc1wiKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIENoZWNrVHVybk9uU3BlY3RhdGVMZWF2ZV9TcGVjdGF0ZU1hbmFnZXIoKVxyXG4gICAge1xyXG4gICAgICB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgICBpZihUdXJuQ2hlY2tBcnJheS5sZW5ndGg9PVRvdGFsQ29ubmVjdGVkUGxheWVycylcclxuICAgICAge1xyXG4gICAgICAgIFR1cm5DaGVja0FycmF5PVtdO1xyXG4gICAgICAgIHRoaXMuVHVybkNvbXBsZXRlZD10cnVlO1xyXG5cclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj1Sb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdKTtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlIFR1cm4gaXMgY2FsbGVkIGJ5OiBcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIGZ1bmN0aW9ucyByZWxhdGVkIHRvIFR1cm4gTWVjaGFuaXNtIGFuZCBjYXJkIG1lY2hhbmlzbVxyXG5cclxuICAgLyoqXHJcbiAgICBAc3VtbWFyeSByYWlzZWQgZXZlbnQgb24gYWxsIGNvbm5lY3RlZCBjbGllbnRzIHRvIGxldCBvdGhlcnMga25vdyBhIHdoYXQgY2FyZCBoYXMgYmVlbiBzZWxlY3RlZCBieSBwbGF5ZXJcclxuICAgIEBtZXRob2QgUmFpc2VFdmVudEZvckNhcmRcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSYWlzZUV2ZW50Rm9yQ2FyZChfZGF0YSlcclxuICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg1LF9kYXRhKTtcclxuICB9LFxyXG5cclxuICBEaXNwbGF5Q2FyZE9uT3RoZXJzKClcclxuICB7XHJcbiAgICBjb25zb2xlLmVycm9yKENhcmRFdmVudFJlY2VpdmVkKTtcclxuICAgIGlmKENhcmRFdmVudFJlY2VpdmVkPT10cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5DYXJkQ291bnRlcik7XHJcbiAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9ZmFsc2U7XHJcbiAgICAgICAgaWYoIXRoaXMuQ2FyZERpc3BsYXllZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyZERpc3BsYXllZD10cnVlO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGhpcy5DYXJkQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5PbkxhbmRlZE9uU3BhY2UoZmFsc2UsdGhpcy5SYW5kb21DYXJkSW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy9jaGVjayBhZnRlciBldmVyeSAwLjUgc2Vjb25kc1xyXG4gICAgICAgICAgICB0aGlzLkRpc3BsYXlDYXJkT25PdGhlcnMoKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0Q2FyZERpc3BsYXkoKVxyXG4gIHtcclxuICAgIHRoaXMuQ2FyZERpc3BsYXllZD1mYWxzZTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRGb3JDYXJkKF9kYXRhKVxyXG4gIHtcclxuXHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG5cclxuICAgIHZhciBSYW5kb21DYXJkPV9kYXRhLnJhbmRvbUNhcmQ7XHJcbiAgICB2YXIgY291bnRlcj1fZGF0YS5jb3VudGVyO1xyXG5cclxuICAgIHRoaXMuUmFuZG9tQ2FyZEluZGV4PVJhbmRvbUNhcmQ7XHJcbiAgICB0aGlzLkNhcmRDb3VudGVyPWNvdW50ZXI7XHJcblxyXG4gICBcclxuICAgIGNvbnNvbGUuZXJyb3IoQ2FyZEV2ZW50UmVjZWl2ZWQpO1xyXG4gICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKHRydWUsUmFuZG9tQ2FyZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgQ2FyZEV2ZW50UmVjZWl2ZWQ9dHJ1ZTtcclxuICAgICAgICAvLyBpZihJc1R3ZWVuaW5nPT1mYWxzZSAmJiB0aGlzLkNhcmREaXNwbGF5ZWQ9PWZhbHNlKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW2NvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuT25MYW5kZWRPblNwYWNlKGZhbHNlLFJhbmRvbUNhcmQpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9dHJ1ZTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5lcnJvcihDYXJkRXZlbnRSZWNlaXZlZCk7XHJcblxyXG4gICAgXHJcbiAgfSxcclxuXHJcbiAgIC8qKlxyXG4gICAgQHN1bW1hcnkgcmFpc2VkIGV2ZW50IG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50cyB0byBsZXQgb3RoZXJzIGtub3cgYSBwYXJ0aWN1bGFyIHBsYXllciBoYXMgY29tcGxldGUgdGhlaXIgbW92ZVxyXG4gICAgQG1ldGhvZCBSYWlzZUV2ZW50VHVybkNvbXBsZXRlXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgUmFpc2VFdmVudFR1cm5Db21wbGV0ZSgpXHJcbiAge1xyXG4gICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09ZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoNCxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcblxyXG4gIFN5bmNBbGxEYXRhKClcclxuICB7XHJcbiAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0pO1xyXG4gICAgfSAgXHJcbn0sXHJcblxyXG4gIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIG9uIGFsbCBwbGF5ZXJzIHRvIHZhbGlkYXRlIGlmIG1vdmUgaXMgY29tcGxldGVkIG9uIGFsbCBjb25uZWN0ZWQgY2xpZW50c1xyXG4gICAgQG1ldGhvZCBSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGVcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICBSZWNlaXZlRXZlbnRUdXJuQ29tcGxldGUoX3VpZClcclxuICB7XHJcbiAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGU9PWZhbHNlKVxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coVHVybkNoZWNrQXJyYXkubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICAgICAgVHVybkNoZWNrQXJyYXkucHVzaChfdWlkKTsgXHJcblxyXG4gICAgICAgIHZhciBBcnJheUxlbmd0aD1UdXJuQ2hlY2tBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIElERm91bmQ9ZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEFycmF5TGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihUdXJuQ2hlY2tBcnJheVtpbmRleF09PV91aWQpXHJcbiAgICAgICAgICAgICAgICBJREZvdW5kPXRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighSURGb3VuZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFR1cm5DaGVja0FycmF5LnB1c2goX3VpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFR1cm5DaGVja0FycmF5KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhUdXJuQ2hlY2tBcnJheS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAvLyB2YXIgVG90YWxDb25uZWN0ZWRQbGF5ZXJzPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JDb3VudCgpO1xyXG4gICAgICAgIHZhciBUb3RhbENvbm5lY3RlZFBsYXllcnM9dGhpcy5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcbiAgICAgICAgaWYoVHVybkNoZWNrQXJyYXkubGVuZ3RoPT1Ub3RhbENvbm5lY3RlZFBsYXllcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUdXJuQ2hlY2tBcnJheT1bXTtcclxuICAgICAgICAgICAgdGhpcy5UdXJuQ29tcGxldGVkPXRydWU7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEPT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLlN5bmNBbGxEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBUdXJuIGlzIGNhbGxlZCBieTogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB3aGVuIGRpY2UgYW5pbWF0aW9uIGlzIHBsYXllZCBvbiBhbGwgcGxheWVyc1xyXG4gICAgQG1ldGhvZCBDaGFuZ2VUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBDaGFuZ2VUdXJuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlN5bmNBbGxEYXRhKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuVHVybk51bWJlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9dGhpcy5UdXJuTnVtYmVyKzE7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9MDtcclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgyLHRoaXMuVHVybk51bWJlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIGZyb20gcmFpc2Ugb24gZXZlbnQgKGZyb20gZnVuY3Rpb24gXCJTdGFydFR1cm5cIiBhbmQgXCJDaGFuZ2VUdXJuXCIgb2YgdGhpcyBzYW1lIGNsYXNzKSB0byBoYW5kbGUgdHVyblxyXG4gICAgQG1ldGhvZCBUdXJuSGFuZGxlclxyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgVHVybkhhbmRsZXIoX3R1cm4pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJNYXRjaGVkPWZhbHNlO1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49ZmFsc2U7XHJcbiAgICAgICAgaWYoSXNUd2VlbmluZykgLy9jaGVjayBpZiBhbmltYXRpb24gb2YgdHVybiBiZWluZyBwbGF5ZWQgb24gb3RoZXIgcGxheWVycyBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuSGFuZGxlcihfdHVybik7XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlR1cm5OdW1iZXI9X3R1cm47XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgICAgIF9wbGF5ZXJNYXRjaGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBfc2tpcE5leHRUdXJuPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm47XHJcbiAgICAgICAgICAgICAgICBpZighX3NraXBOZXh0VHVybilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgeW91ciB0dXJuIFwiK3RoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVHYW1lVUkodHJ1ZSx0aGlzLlR1cm5OdW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb20oKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlR1cm5OdW1iZXJcIix0aGlzLlR1cm5OdW1iZXIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHVybiBPZjogXCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbFBsYXllclVJW3RoaXMuVHVybk51bWJlcl0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm8pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJvb21BY3RvcnMoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3luY0RhdGFUb1BsYXllckdhbWVJbmZvKDApO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vZm9yY2Ugc3luYyBzcGVjdGF0b3IgYWZ0ZXIgY29tcGxldGlvbiBvZiBlYWNoIHR1cm5cclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuU3luY0FsbERhdGFfU3BlY3RhdGVNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgICAgICAvL3NraXAgdGhpcyB0dXJuIGFzIHNraXAgdHVybiBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlXHJcbiAgICAgICAgICAgIGlmKF9wbGF5ZXJNYXRjaGVkICYmIF9za2lwTmV4dFR1cm4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFwiU2tpcHBpbmcgY3VycmVudCB0dXJuXCIsMTIwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVNraXBOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVR1cm4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlVHVyblByb2dyZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoX3BsYXllck1hdGNoZWQgJiYgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLmlzR2FtZUZpbmlzaGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJc1R3ZWVuaW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZVR1cm5Qcm9ncmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2luZClcclxuICAgIHtcclxuICAgICAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgICAgIHZhciBNeURhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgICAgIHZhciBfY291bnRlcj1faW5kO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUGxheWVyR2FtZUluZm9bX2NvdW50ZXJdLlBsYXllclVJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQhPU15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCkgLy9kb250IHVwZGF0ZSBteSBvd24gZGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1haW5TZXNzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXS5QbGF5ZXJVSUQ9PU1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSUQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW19jb3VudGVyXT1NYWluU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TeW5jRGF0YVRvUGxheWVyR2FtZUluZm8oX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihfY291bnRlcjx0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgY291bnRlcjogXCIrX2NvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN5bmNEYXRhVG9QbGF5ZXJHYW1lSW5mbyhfY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9LCAgXHJcblxyXG4gICAgLyoqXHJcbiAgICBAc3VtbWFyeSBjYWxsZWQgd2hlbiBhbGwgcGxheWVycyBoYXZlIGRvbmUgdGhlaXIgaW5pdGlhbCBzZXR1cCBhbmQgZmlyc3QgdHVybiBzdGFydHNcclxuICAgIEBtZXRob2QgU3RhcnRUdXJuXHJcbiAgICBAcGFyYW0ge3N0cmluZ30gbm9uZVxyXG4gICAgQHJldHVybnMge2Jvb2xlYW59IG5vIHJldHVyblxyXG4gICAqKi8gXHJcbiAgICBTdGFydFR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQXNzaWduUGxheWVyR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5FbmFibGVQbGF5ZXJOb2RlcygpO1xyXG4gICAgICAgIHRoaXMuVHVybk51bWJlcj0wOyAvL3Jlc2V0aW5nIHRoZSB0dXJuIG51bWJlciBvbiBzdGFydCBvZiB0aGUgZ2FtZVxyXG5cclxuICAgICAgICAvL3NlbmRpbmcgaW5pdGlhbCB0dXJuIG51bWJlciBvdmVyIHRoZSBuZXR3b3JrIHRvIHN0YXJ0IHR1cm4gc2ltdWx0YW5vdXNseSBvbiBhbGwgY29ubmVjdGVkIHBsYXllcidzIGRldmljZXNcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIoKS5SYWlzZUV2ZW50KDIsdGhpcy5UdXJuTnVtYmVyKTtcclxuICAgIH0sXHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIEZ1bmN0aW9uIGZvciBnYW1lcGxheVxyXG4gICAgIC8qKlxyXG4gICAgQHN1bW1hcnkgY2FsbGVkIHRvIGFzc2lnbiBwbGF5ZXIgVUkgKG5hbWUvaWNvbnMvbnVtYmVyIG9mIHBsYXllcnMgdGhhdCB0byBiZSBhY3RpdmUgZXRjKVxyXG4gICAgQG1ldGhvZCBBc3NpZ25QbGF5ZXJHYW1lVUlcclxuICAgIEBwYXJhbSB7c3RyaW5nfSBub25lXHJcbiAgICBAcmV0dXJucyB7Ym9vbGVhbn0gbm8gcmV0dXJuXHJcbiAgICoqLyBcclxuICAgIEFzc2lnblBsYXllckdhbWVVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5TZXROYW1lKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlR2FtZVVJKF90b2dnbGVIaWdobGlnaHQsX2luZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGlmKF90b2dnbGVIaWdobGlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW19pbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlBsYXllckluZm89dGhpcy5QbGF5ZXJHYW1lSW5mb1tfaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyczsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoX2luZGV4PT1pbmRleClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlQkdIaWdobGlnaHRlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllclVJW2luZGV4XS5nZXRDb21wb25lbnQoJ1BsYXllclByb2ZpbGVNYW5hZ2VyJykuVG9nZ2xlVGV4dGlnaGxpZ2h0ZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJVSVtpbmRleF0uZ2V0Q29tcG9uZW50KCdQbGF5ZXJQcm9maWxlTWFuYWdlcicpLlRvZ2dsZUJHSGlnaGxpZ2h0ZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWxsUGxheWVyVUlbaW5kZXhdLmdldENvbXBvbmVudCgnUGxheWVyUHJvZmlsZU1hbmFnZXInKS5Ub2dnbGVUZXh0aWdobGlnaHRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgICAvKipcclxuICAgIEBzdW1tYXJ5IGNhbGxlZCB0byBlbmJhbGUgcmVzcGVjdGl2ZSBwbGF5ZXJzIG5vZGVzIGluc2lkZSBnYW1hcGxheVxyXG4gICAgQG1ldGhvZCBFbmFibGVQbGF5ZXJOb2Rlc1xyXG4gICAgQHBhcmFtIHtzdHJpbmd9IG5vbmVcclxuICAgIEByZXR1cm5zIHtib29sZWFufSBubyByZXR1cm5cclxuICAgKiovIFxyXG4gICAgRW5hYmxlUGxheWVyTm9kZXMoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLlBsYXllckdhbWVJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW2luZGV4XS5Ib21lQmFzZWRBbW91bnQ9PTEpICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFBsYXllck5vZGVzW2luZGV4XS5zZXRQb3NpdGlvbih0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1swXS5wb3NpdGlvbi54LHRoaXMuU3RhcnRMb2NhdGlvbk5vZGVzWzBdLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuUGxheWVyR2FtZUluZm9baW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50PT0xKSAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uc2V0UG9zaXRpb24odGhpcy5TdGFydExvY2F0aW9uTm9kZXNbMV0ucG9zaXRpb24ueCx0aGlzLlN0YXJ0TG9jYXRpb25Ob2Rlc1sxXS5wb3NpdGlvbi55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5BbGxQbGF5ZXJOb2Rlc1tpbmRleF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBTZXRGb2xsb3dDYW1lcmFQcm9wZXJ0aWVzKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhTm9kZS5wb3NpdGlvbj10aGlzLkNhbWVyYU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgIFxyXG4gICAgICAgIGxldCByYXRpbz10YXJnZXRQb3MueS9jYy53aW5TaXplLmhlaWdodDtcclxuICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MjtcclxuICAgIH0sXHJcblxyXG4gICAgbGF0ZVVwZGF0ZSAoKSB7XHJcbiAgICAgICAgaWYodGhpcy5pc0NhbWVyYVpvb21pbmcpICAgIFxyXG4gICAgICAgICAgICB0aGlzLlNldEZvbGxvd0NhbWVyYVByb3BlcnRpZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3luY0RpY2VSb2xsKF9yb2xsKVxyXG4gICAge1xyXG4gICAgICAgIElzVHdlZW5pbmc9dHJ1ZTtcclxuICAgICAgICB0aGlzLkNhcmREaXNwbGF5ZWQ9ZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbUFjdG9yc0FycmF5KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5EYXRhLnVzZXJJRD09dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbWF0Y2hlZDpcIit0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPT0wICYmICF0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uSW5pdGlhbENvdW50ZXJBc3NpZ25lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlPT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkluaXRpYWxDb3VudGVyQXNzaWduZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIFJvbGxDb3VudGVyPTEzO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihSb2xsQ291bnRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPT0xMilcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcj10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyUm9sbENvdW50ZXIrMjE7ICBcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJSb2xsQ291bnRlcisxO1xyXG5cclxuICAgICAgICAgICAgUm9sbENvdW50ZXI9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFJvbGxDb3VudGVyLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgRGljZVJvbGw9X3JvbGw7XHJcbiAgICAgICAgRGljZVRlbXA9MDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uKERpY2VSb2xsKTtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zPXRoaXMuQWxsUGxheWVyTm9kZXNbdGhpcy5UdXJuTnVtYmVyXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMigwLDEyMCkpO1xyXG4gICAgICAgIHZhciBfcG9zPXRoaXMuQ2FtZXJhTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKTtcclxuICAgICAgICB0aGlzLlR3ZWVuQ2FtZXJhKF9wb3MsdHJ1ZSwwLjQpOyAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBUZW1wQ2hlY2tTcGFjZShfcm9sbGluZylcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtcGNvdW50ZXI9MDtcclxuICAgICAgICB2YXIgdGVtcGNvdW50ZXIyPTA7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5nZXRQaG90b25SZWYoKS5teVJvb21BY3RvcnNBcnJheSgpW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEPT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicGxheWVyIG1hdGNoZWQ6XCIrdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGVtcGNvdW50ZXIyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tQWN0b3JzQXJyYXkoKVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJSb2xsQ291bnRlcjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IodGVtcGNvdW50ZXIyK1wiIFwiK19yb2xsKTtcclxuICAgICAgICAvLyBpZigodGVtcGNvdW50ZXIyK19yb2xsKTwzMylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbMF0uQnVzaW5lc3NUeXBlPT0xKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICB0ZW1wY291bnRlcj0wK19yb2xsLTE7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKHRlbXBjb3VudGVyKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBlbHNlXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHRlbXBjb3VudGVyPTEzK19yb2xsLTE7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKHRlbXBjb3VudGVyKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmVycm9yKHRlbXBjb3VudGVyMitcIiBcIitfcm9sbCk7XHJcbiAgICAgICAgLy8gICAgIHRlbXBjb3VudGVyPXRlbXBjb3VudGVyMitfcm9sbDtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICBpZih0ZW1wY291bnRlcjItMTwwKVxyXG4gICAgICB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInN0YXJ0aW5nIGZyb20gb2JsaXZpb25cIik7XHJcbiAgICAgICAgdGVtcGNvdW50ZXI9dGVtcGNvdW50ZXIyK19yb2xsaW5nLTE7XHJcbiAgICAgICAgdmFyIGRpY2V0b2JlPXBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVt0ZW1wY291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcInRvIGJlOiBcIitkaWNldG9iZSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICB7XHJcbiAgICAgICAgdGVtcGNvdW50ZXI9dGVtcGNvdW50ZXIyK19yb2xsaW5nO1xyXG4gICAgICAgIHZhciBkaWNldG9iZT1wYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbdGVtcGNvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0byBiZTogXCIrZGljZXRvYmUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsRGljZTpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgdmFyIERpY2UyPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcblxyXG4gICAgICAgIC8vIHZhciBEaWNlMT10aGlzLmdldFJhbmRvbSg4LDI1KTtcclxuICAgICAgICAvLyB2YXIgRGljZTI9dGhpcy5nZXRSYW5kb20oOCwyNSk7XHJcblxyXG4gICAgICAgIERpY2VSb2xsPURpY2UxK0RpY2UyO1xyXG4gICAgICAgIC8vRGljZVJvbGw9MjM7XHJcbiAgICAgICAgLy90aGlzLlRlbXBDaGVja1NwYWNlKERpY2VSb2xsKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRpY2UgbnVtYmVyOiBcIitEaWNlUm9sbCk7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMyxEaWNlUm9sbCk7IFxyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsT25lRGljZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpY2UxPXRoaXMuZ2V0UmFuZG9tKDEsNyk7XHJcbiAgICAgICAgcmV0dXJuIERpY2UxO1xyXG4gICAgfSxcclxuXHJcbiAgICBSb2xsVHdvRGljZXMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaWNlMT10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgIHZhciBEaWNlMj10aGlzLmdldFJhbmRvbSgxLDcpO1xyXG4gICAgICAgIHJldHVybiAoRGljZTErRGljZTIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjYWxsVXBvbkNhcmQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfc3BhY2VJRD1wYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpO1xyXG4gICAgICAgIGlmKF9zcGFjZUlEIT02ICYmIF9zcGFjZUlEIT03KSAvLzYgbWVhbnMgcGF5ZGF5IGFuZCA3IG1lYW5zIGRvdWJsZSBwYXlkYXksIDkgbWVuYXMgc2VsbCBzcGFjZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIFJhbmRvbUNhcmQ9dGhpcy5nZXRSYW5kb20oMCwxNSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2ZvciB0ZXN0aW5nIG9ubHlcclxuICAgICAgICAgICAgaWYoX3NwYWNlSUQ9PTIpIC8vbGFuZGVkIG9uIHNvbWUgYmlnIGJ1c2VpbnNzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNywxMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw0KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKF9zcGFjZUlEPT01KSAvL2xhbmRlZCBvbiBzb21lIGxvc3NlcyBjYXJkc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVJbmRleD1bMCw1LDYsMl07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw0KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihfc3BhY2VJRD09MykgLy9sYW5kZWQgb24gc29tZSBtYXJrZXRpbmcgY2FyZHNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlSW5kZXg9WzAsNywzLDgsMTMsOV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw2KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYoX3NwYWNlSUQ9PTEpIC8vbGFuZGVkIG9uIHNvbWUgbWFya2V0aW5nIGNhcmRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4PVswLDEsNiwxMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXg9dGhpcy5nZXRSYW5kb20oMCw0KTtcclxuICAgICAgICAgICAgICAgIFJhbmRvbUNhcmQ9dmFsdWVJbmRleFtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIFNlbmRpbmdEYXRhPXtcInJhbmRvbUNhcmRcIjpSYW5kb21DYXJkLFwiY291bnRlclwiOlJvbGxDb3VudGVyfTsgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JDYXJkKFNlbmRpbmdEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlzcGxheUNhcmRPbk90aGVycygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFuZGVkIG9uIHBheSBkYXkgb3IgZG91YmxlIHBheSBkYXkgYW5kIHdvcmsgaXMgZG9uZSBzbyBjaGFuZ2luZyB0dXJuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRUdXJuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBsZXRlQ2FyZFR1cm4oKVxyXG4gICAge1xyXG4gICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsYW5kZWQgb24gcGF5IGRheSBvciBkb3VibGUgcGF5IGRheSBhbmQgd29yayBpcyBkb25lIHNvIGNoYW5naW5nIHR1cm5cIik7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50VHVybkNvbXBsZXRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIENhbGxHYW1lQ29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD10aGlzLlR1cm5OdW1iZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD09ZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5pc0dhbWVGaW5pc2hlZD10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfY2FzaD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaDtcclxuICAgICAgICAgICAgICAgIHZhciBITUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgQk1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxvYW5BbW91bnQ9MDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FuQW1vdW50Kz1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgQk1DYXNoPShCTUFtb3VudCtCTUxvY2F0aW9ucykqMTUwMDAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBITUNhc2g9MDtcclxuICAgICAgICAgICAgICAgIGlmKEhNQW1vdW50PT0xKVxyXG4gICAgICAgICAgICAgICAgICAgIEhNQ2FzaD02MDAwMDtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoSE1BbW91bnQ9PTIpXHJcbiAgICAgICAgICAgICAgICAgICAgSE1DYXNoPTI1MDAwKzYwMDAwO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihITUFtb3VudD09MylcclxuICAgICAgICAgICAgICAgICAgICBITUNhc2g9MjUwMDArMjUwMDArNjAwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIFRvdGFsQXNzZXRzPV9jYXNoK0JNQ2FzaCtITUNhc2gtbG9hbkFtb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxTY29yZT1Ub3RhbEFzc2V0cztcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICBSYWlzZUV2ZW50Rm9yR2FtZUNvbXBsZXRlKF9kYXRhKVxyXG4gICB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCg2LF9kYXRhKTtcclxuICAgfSxcclxuXHJcbiAgIFN5bmNHYW1lT3ZlcihfVUlEKVxyXG4gICB7XHJcbiAgICB2YXIgTWFpblNlc3Npb25EYXRhPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgdmFyIE15RGF0YT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCk7XHJcbiAgICBjb25zb2xlLmxvZyhfVUlEKTtcclxuICAgIGNvbnNvbGUubG9nKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5HYW1lT3Zlcj10cnVlO1xyXG5cclxuICAgIGlmKE15RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRD09X1VJRClcclxuICAgIHtcclxuICAgICAgICAvL3lvdSB3b25cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIlRvdGFsIENhc2g6IFwiK015RGF0YS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlRvdGFsU2NvcmUrXCJcXG5cIisnXFxuJytcclxuICAgICAgICAgICAgXCJDb25ncmF0cyEgeW91ciBjYXNoIGlzIGhpZ2hlc3QsIHlvdSBoYXZlIHdvbiB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAxNTAwMFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgLy95b3UgbG9zZVxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiVG90YWwgQ2FzaDogXCIrTXlEYXRhLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZStcIlxcblwiKydcXG4nK1xyXG4gICAgICAgICAgICBcInVuZm9ydHVuYXRlbHkgeW91IGhhdmUgbG9zdCB0aGUgZ2FtZS5cIitcIlxcblwiKydcXG4nK1wiXFxuXCIrXHJcbiAgICAgICAgICAgIFwiR2FtZSB3aWxsIGJlIHJlc3RhcnRlZCBhdXRvbWF0Y2FsbHkgYWZ0ZXIgMTUgc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAxNTAwMFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5SZXN0YXJ0R2FtZSgpO1xyXG4gICAgfSwgMTUwNjApO1xyXG5cclxuICAgfSxcclxuXHJcbiAgICBTdGFydERpY2VSb2xsOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZihSb2xsQ291bnRlcj49R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZW92ZXJcIik7XHJcbiAgICAgICAgICAgIGlzR2FtZU92ZXI9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcblxyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlPT1mYWxzZSlcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FsbEdhbWVDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllcmNvbXBsZXRlZD0wO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBNYWluU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgTWFpblNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKE1haW5TZXNzaW9uRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5pc0dhbWVGaW5pc2hlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcmNvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihwbGF5ZXJjb21wbGV0ZWQ9PXRoaXMuUGxheWVyR2FtZUluZm8ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXg9MDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU2VsZWN0ZWRJbmQ9MDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU2Vzc2lvbkRhdGE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFNlc3Npb25EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3ZhbHVlID0gU2Vzc2lvbkRhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuVG90YWxTY29yZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF92YWx1ZSA+IG1heClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0ZWRJbmQ9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9X3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgd29uIGJ5IHBsYXllciBpZDogXCIrU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJhaXNlRXZlbnRGb3JHYW1lQ29tcGxldGUoU2Vzc2lvbkRhdGFbU2VsZWN0ZWRJbmRdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2dhbWUgY29tcGxldGVkIG9uIGFsbCBzeXN0ZW1zXHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIElzVHdlZW5pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGFuZ2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGljZVRlbXA9RGljZVRlbXArMTsgXHJcbiAgICAgICAgICAgIHZhciBfdG9Qb3M9Y2MuVmVjMihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLnBvc2l0aW9uLngsR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TcGFjZU1hbmFnZXIoKS5EYXRhW1JvbGxDb3VudGVyXS5SZWZlcmVuY2VMb2NhdGlvbi5wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgdGhpcy5Ud2VlblBsYXllcih0aGlzLkFsbFBsYXllck5vZGVzW3RoaXMuVHVybk51bWJlcl0sX3RvUG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFJhbmRvbTpmdW5jdGlvbihtaW4sbWF4KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSApICsgbWluOyAvLyBtaW4gaW5jbHVkZWQgYW5kIG1heCBleGNsdWRlZFxyXG4gICAgfSxcclxuXHJcbiAgICBUd2VlbkNhbWVyYTogZnVuY3Rpb24gKF9wb3MsIGlzWm9vbSx0aW1lKSB7ICAgXHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5DYW1lcmFOb2RlKVxyXG4gICAgICAgIC50byh0aW1lLCB7IHBvc2l0aW9uOiBjYy52MihfcG9zLngsIF9wb3MueSl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmKGlzWm9vbSlcclxuICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhSW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYU91dCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFpvb21DYW1lcmFJbiAoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICBpZih0aGlzLkNhbWVyYS56b29tUmF0aW88MilcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz10aGlzLkNhbWVyYS56b29tUmF0aW8rMC4wMztcclxuICAgICAgICAgICAgICAgIHRoaXMuWm9vbUNhbWVyYUluKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYS56b29tUmF0aW89MjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDYW1lcmFab29taW5nPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0RGljZVJvbGwoKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIDEwKTtcclxuICAgIH0sXHJcblxyXG4gICAgQ2hlY2tQYXlEYXlDb25kaXRpb25zKClcclxuICAgIHtcclxuICAgICAgICBpZihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpPT02KVxyXG4gICAgICAgICAgICBQYXNzZWRQYXlEYXk9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBpZihwYXJzZUludChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NwYWNlTWFuYWdlcigpLkRhdGFbUm9sbENvdW50ZXJdLlJlZmVyZW5jZUxvY2F0aW9uLmdldENvbXBvbmVudCgnU3BhY2VIYW5kbGVyJykuU3BhY2VEYXRhLlNwYWNlc1R5cGUpPT03KVxyXG4gICAgICAgICAgICBEb3VibGVQYXlEYXk9dHJ1ZTtcclxuXHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5OZXh0VHVybkRvdWJsZVBheTtcclxuICAgICAgICBpZihQYXNzZWRQYXlEYXkgJiYgIURvdWJsZVBheURheSAmJiAhX25leHRUdXJuRG91YmxlUGF5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoKERvdWJsZVBheURheSkgfHwgKFBhc3NlZFBheURheSAmJiBfbmV4dFR1cm5Eb3VibGVQYXkpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVEb3VibGVQYXlOZXh0VHVybihmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Qcm9jZXNzUGF5RGF5X1R1cm5EZWNpc2lvbih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFpvb21DYW1lcmFPdXQgKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLkNhbWVyYS56b29tUmF0aW8+PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgdGhpcy5pc0NhbWVyYVpvb21pbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLnpvb21SYXRpbz10aGlzLkNhbWVyYS56b29tUmF0aW8tMC4wMztcclxuICAgICAgICAgICAgICAgdGhpcy5ab29tQ2FtZXJhT3V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNhbWVyYU5vZGUucG9zaXRpb249Y2MuVmVjMigwLDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW1lcmEuem9vbVJhdGlvPTE7XHJcblxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbigwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIWlzR2FtZU92ZXIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hlY2tQYXlEYXlDb25kaXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIFR3ZWVuUGxheWVyOiBmdW5jdGlvbiAoTm9kZSxUb1Bvcykge1xyXG4gICAgICAgIGNjLnR3ZWVuKE5vZGUpXHJcbiAgICAgICAgLnRvKDAuNCwgeyBwb3NpdGlvbjogY2MudjIoVG9Qb3MueCwgVG9Qb3MueSl9LHtlYXNpbmc6XCJxdWFkSW5PdXRcIn0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgIGlmKERpY2VUZW1wPERpY2VSb2xsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIWlzR2FtZU92ZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU3BhY2VNYW5hZ2VyKCkuRGF0YVtSb2xsQ291bnRlcl0uUmVmZXJlbmNlTG9jYXRpb24uZ2V0Q29tcG9uZW50KCdTcGFjZUhhbmRsZXInKS5TcGFjZURhdGEuU3BhY2VzVHlwZSk9PTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhc3NlZFBheURheT10cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihSb2xsQ291bnRlcj09MTIpXHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj1Sb2xsQ291bnRlcisyMTsgIFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBSb2xsQ291bnRlcj1Sb2xsQ291bnRlcisxO1xyXG5cclxuICAgICAgICAgICAgLy9EaWNlVGVtcD1EaWNlVGVtcCsxOyBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coRGljZVRlbXArXCIgXCIrUm9sbENvdW50ZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5TdGFydERpY2VSb2xsKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlBsYXllclJvbGxDb3VudGVyPVJvbGxDb3VudGVyO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX25ld3Bvcz1jYy5WZWMyKDAsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuVHdlZW5DYW1lcmEoX25ld3BvcyxmYWxzZSwwLjYpOyAvL3pvb21vdXRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vcnVsZXMgaW1wbG1lbnRhdGlvbiBkdXJpbmcgdHVybiAodHVybiBkZWNpc2lvbnMpXHJcblxyXG4gICAgVG9nZ2xlUGF5RGF5KF9zdDEsX1N0MilcclxuICAgIHtcclxuICAgICAgICBQYXNzZWRQYXlEYXk9X3N0MTtcclxuICAgICAgICBEb3VibGVQYXlEYXk9X1N0MjtcclxuICAgIH0sXHJcblxyXG4gICAgRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uKGFtb3VudCxfaW5kZXgsX2xvY2F0aW9uTmFtZSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FzaD49YW1vdW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2g9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhc2gtYW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uVG90YWxMb2NhdGlvbnNBbW91bnQ9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLlRvdGFsTG9jYXRpb25zQW1vdW50KzE7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbX2luZGV4XS5Mb2NhdGlvbnNOYW1lLnB1c2goX2xvY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgZXhwYW5kZWQgeW91ciBidXNpbmVzcy5cIiwxMDAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVwbGF5VUlNYW5hZ2VyKCkuT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICAgICAgfSwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaCB0byBleHBhbmQgdGhpcyBidXNpbmVzcywgY2FzaCBuZWVkZWQgJCBcIithbW91bnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIEdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24oKVxyXG4gICAge1xyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZCdXNpbmVzcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHBhcnNlSW50KHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5Ob09mQnVzaW5lc3NbaV0uQnVzaW5lc3NUeXBlKT09MikgLy90aGlzIG1lYW5zIHRoZXJlIGlzIGJyaWNrIGFuZCBtb3J0YXIgaW4gbGlzdFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lcGxheVVJTWFuYWdlcigpLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0V4cGFuZEJ1c2luZXNzSGFuZGxlcicpLlNldEJ1c2luZXNzSW5kZXgoaSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuU2V0TmFtZSh0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTm9PZkJ1c2luZXNzW2ldLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnRXhwYW5kQnVzaW5lc3NIYW5kbGVyJykuUmVzZXRFZGl0Qm94KCk7XHJcbiAgICAgICAgICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coQnVzaW5lc3NMb2NhdGlvbk5vZGVzKTtcclxuICAgICAgICByZXR1cm4gQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDtcclxuICAgIH0sXHJcblxyXG4gICAgRGVzdHJveUdlbmVyYXRlZE5vZGVzKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgQnVzaW5lc3NMb2NhdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBCdXNpbmVzc0xvY2F0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEJ1c2luZXNzTG9jYXRpb25Ob2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlU3RvY2tzX1R1cm5EZWNpc2lvbihfbmFtZSxfU2hhcmVBbW91bnQsX2lzQWRkaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9pc0FkZGluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfc3RvY2s9bmV3IFN0b2NrSW5mbygpO1xyXG4gICAgICAgICAgICBfc3RvY2suQnVzaW5lc3NOYW1lPV9uYW1lO1xyXG4gICAgICAgICAgICBfc3RvY2suU2hhcmVBbW91bnQ9X1NoYXJlQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLk5vT2ZTdG9ja3MucHVzaChfc3RvY2spO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUHJvY2Vzc1BheURheV9UdXJuRGVjaXNpb24oX2lzRG91YmxlUGF5RGF5PWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFBheWRheT10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk7XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBITU5leHRQYXlkYXk7XHJcbiAgICAgICAgX3NraXBCTU5leHRQYXlkYXk9dGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk7XHJcblxyXG4gICAgICAgIGlmKF9za2lwTmV4dFBheWRheSkgLy9pZiBwcmV2aW91c2x5IHNraXAgcGF5ZGF5IHdhcyBzdG9yZWQgYnkgYW55IGNhcmRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2tpcFBheURheV9XaG9sZShmYWxzZSk7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5TaG93VG9hc3QoXCJTa2lwcGluZyBQYXlEYXkuXCIsMTYwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICAgICAgfSwgMTY1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfdGl0bGU9XCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmKF9pc0RvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIF90aXRsZT1cIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBfdGl0bGU9XCJQYXlEYXlcIjtcclxuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZXBsYXlVSU1hbmFnZXIoKS5Bc3NpZ25EYXRhX1BheURheShfdGl0bGUsX2lzRG91YmxlUGF5RGF5LF9za2lwSE1OZXh0UGF5ZGF5LF9za2lwQk1OZXh0UGF5ZGF5KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuLy8jZW5kcmVnaW9uXHJcbiAgIFxyXG4gICAgLy8jcmVnaW9uIENhcmRzIFJ1bGVzXHJcbiAgICBUb2dnbGVEb3VibGVQYXlOZXh0VHVybihfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX25leHRUdXJuRG91YmxlUGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuTmV4dFR1cm5Eb3VibGVQYXk9X25leHRUdXJuRG91YmxlUGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwTmV4dFR1cm4oX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIF9za2lwTmV4dFR1cm49X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwTmV4dFR1cm49X3NraXBOZXh0VHVybjtcclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlU2tpcFBheURheV9XaG9sZShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBOZXh0UGF5ZGF5PV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uQ2FyZEZ1bmN0aW9uYWxpdHkuU2tpcE5leHRQYXlkYXk9X3NraXBOZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgX3NraXBITU5leHRQYXlkYXk9X3N0YXRlO1xyXG4gICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXJkRnVuY3Rpb25hbGl0eS5Ta2lwSE1OZXh0UGF5ZGF5PV9za2lwSE1OZXh0UGF5ZGF5O1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBfc2tpcEJNTmV4dFBheWRheT1fc3RhdGU7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJHYW1lSW5mb1t0aGlzLlR1cm5OdW1iZXJdLkNhcmRGdW5jdGlvbmFsaXR5LlNraXBCTU5leHRQYXlkYXk9X3NraXBCTU5leHRQYXlkYXk7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZVR1cm5Qcm9ncmVzcyhfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgVHVybkluUHJvZ3Jlc3M9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBSZXR1cm5UdXJuUHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBUdXJuSW5Qcm9ncmVzcztcclxuICAgIH0sXHJcbiAgICBMb3NlQWxsTWFya2V0aW5nTW9uZXkoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbG9zZUFtb3VudD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfbG9zZUFtb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9sb3NlQW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2xvc2VBbW91bnRcclxuICAgIH0sXHJcblxyXG4gICAgTXVsdGlwbHlNYXJrZXRpbmdNb25leShfbXVsdGlwbGllcilcclxuICAgIHtcclxuICAgICAgICB2YXIgX2Ftb3VudEluY3JlYXNlZD0tMTtcclxuICAgICAgICBpZih0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50SW5jcmVhc2VkPXRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQqPV9tdWx0aXBsaWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50SW5jcmVhc2VkPTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2Ftb3VudEluY3JlYXNlZFxyXG4gICAgfSxcclxuXHJcbiAgICBHZXRNYXJrZXRpbmdNb25leShfcHJvZml0KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfYW1vdW50PS0xO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5NYXJrZXRpbmdBbW91bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9wcm9maXQ9KF9wcm9maXQvMTAwKTtcclxuICAgICAgICAgICAgX2Ftb3VudD10aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50Kj1fcHJvZml0O1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllckdhbWVJbmZvW3RoaXMuVHVybk51bWJlcl0uTWFya2V0aW5nQW1vdW50PTA7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyR2FtZUluZm9bdGhpcy5UdXJuTnVtYmVyXS5DYXNoKz1fYW1vdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYW1vdW50PTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX2Ftb3VudFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICAvLyNlbmRyZWdpb25cclxufSk7XHJcbi8vbW9kdWxlLmV4cG9ydHMgID0gUGxheWVyRGF0YTsgLy93aGVuIGltcG9ydHMgaW4gYW5vdGhlciBzY3JpcHQgb25seSByZWZlcmVuY2Ugb2YgcGxheWVyZGF0YSBjbGFzcyB3b3VsZCBiZSBhYmxlIHRvIGFjY2Vzc2VkIGZyb20gR2FtZW1hbmFnZXIgaW1wb3J0XHJcbm1vZHVsZS5leHBvcnRzICA9IEdhbWVNYW5hZ2VyO1xyXG4vLyNlbmRyZWdpb24iXX0=