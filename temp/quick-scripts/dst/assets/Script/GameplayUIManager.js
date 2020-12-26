
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameplayUIManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80e5dJMhAJM0b0RW9xz0opK', 'GameplayUIManager');
// Script/GameplayUIManager.js

"use strict";

var GameManager = null;
var GamePlayReferenceManager = null;
var businessDetailNodes = []; //-------------------------------------------enumeration for amount of loan-------------------------//

var LoanAmountEnum = cc.Enum({
  None: 0,
  TenThousand: 10000,
  TentyThousand: 20000,
  ThirtyThousand: 30000,
  FortyThousand: 40000,
  FiftyThousand: 50000,
  Other: 6
}); //-------------------------------------------class for Business Setup UI-------------------------//

var BusinessSetupUI = cc.Class({
  name: "BusinessSetupUI",
  properties: {
    PlayerNameUI: {
      displayName: "PlayerNameUI",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label for player name"
    },
    PlayerCashUI: {
      displayName: "PlayerCashUI",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label for player cash"
    },
    BusinessTypeTextUI: {
      displayName: "BusinessTypeTextUI",
      type: cc.Text,
      "default": "",
      serializable: false,
      tooltip: "var to store text for business type"
    },
    BusinessNameTextUI: {
      displayName: "BusinessTypeTextUI",
      type: cc.Text,
      "default": "",
      serializable: false,
      tooltip: "var to store text for business name"
    },
    BusinessTypeLabel: {
      displayName: "BusinessTypeLabel",
      type: cc.EditBox,
      "default": null,
      serializable: true,
      tooltip: "reference for business type editbox"
    },
    BusinessNameLabel: {
      displayName: "BusinessNameLabel",
      type: cc.EditBox,
      "default": null,
      serializable: true,
      tooltip: "referece for business name editbox"
    },
    HomeBasedNodeUI: {
      displayName: "HomeBasedNodeUI",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference of the node for home based business"
    },
    BrickAndMortarNodeUI: {
      displayName: "BrickAndMortarNodeUI",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference of the node for brick and mortar business"
    },
    TimerUI: {
      displayName: "TimerUI",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference of the label for timer"
    },
    TimerNode: {
      displayName: "TimerNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for timer node in business setup"
    },
    BusinessSetupNode: {
      displayName: "BusinessSetupNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference of the node for business setup"
    },
    LoanSetupNode: {
      displayName: "LoanSetupNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference of the node for loan setup"
    },
    LoanAmount: {
      displayName: "LoanAmount",
      type: LoanAmountEnum,
      "default": LoanAmountEnum.None,
      serializable: true,
      tooltip: "loan amount taken by player (state machine)"
    },
    LoanAmountLabel: {
      displayName: "LoanAmountLabel",
      type: [cc.Node],
      "default": [],
      serializable: true,
      tooltip: "Reference for all labels of amounts in loan UI"
    },
    WaitingStatusNode: {
      displayName: "WaitingStatusNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for waiting status screen on initial business setup"
    },
    ExitButtonNode: {
      displayName: "ExitButtonNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for exit button node in business setup"
    }
  },
  ctor: function ctor() {//constructor//
  },
  ChangeName_BusinessSetup: function ChangeName_BusinessSetup(name) {
    this.PlayerNameUI.string = name;
  }
}); //-------------------------------------------class for Business Setup UI-------------------------//

var TurnDecisionSetupUI = cc.Class({
  name: "TurnDecisionSetupUI",
  properties: {
    MarketingEditBox: {
      displayName: "MarketingEditBox",
      type: cc.EditBox,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the editbox of marketing node"
    },
    GoldEditBox: {
      displayName: "GoldEditBox",
      type: cc.EditBox,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the editbox of invest gold node"
    },
    StockEditBox: {
      displayName: "StockEditBox",
      type: cc.EditBox,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the editbox of invest stock node"
    },
    CashAmountLabel: {
      displayName: "Cash",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to cash node"
    },
    ExpandBusinessNode: {
      displayName: "ExpandBusinessNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for expnad business node"
    },
    ExpandBusinessScrollContent: {
      displayName: "ExpandBusinessScrollContent",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "Reference for content node of scroll view of expand business node"
    },
    ExpandBusinessPrefab: {
      displayName: "ExpandBusinessPrefab",
      type: cc.Prefab,
      "default": null,
      serializable: true,
      tooltip: "Reference for prefab of expand business node"
    }
  },
  ctor: function ctor() {//constructor
  },
  ChangeName_BusinessSetup: function ChangeName_BusinessSetup(name) {
    this.PlayerNameUI.string = name;
  }
}); //-------------------------------------------enumeration for investment/buy and sell-------------------------//

var InvestEnum = cc.Enum({
  None: 0,
  StockInvest: 1,
  GoldInvest: 2,
  StockSell: 3,
  GoldSell: 4,
  Other: 5
}); //-------------------------------------------class for InvestSellUI-------------------------//

var InvestSellUI = cc.Class({
  name: "InvestSellUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of title of invest&sell node"
    },
    DiceResultLabel: {
      displayName: "DiceResult",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of Dice Result of invest&sell node"
    },
    PriceTitleLabel: {
      displayName: "PriceTitle",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of Price Title of invest&sell node"
    },
    PriceValueLabel: {
      displayName: "PriceValue",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of Price value of invest&sell node"
    },
    BuyOrSellTitleLabel: {
      displayName: "BuyOrSellTitle",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of BuyOrSell Title of invest&sell node"
    },
    TotalAmountTitleLabel: {
      displayName: "TotalAmountTitle",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of TotalAmount Title of invest&sell node"
    },
    TotalAmountValueLabel: {
      displayName: "TotalAmountValue",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of TotalAmount Value of invest&sell node"
    },
    ButtonNameLabel: {
      displayName: "ButtonName",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of button name of invest&sell node"
    },
    InvestState: {
      displayName: "InvestState",
      type: InvestEnum,
      "default": InvestEnum.None,
      serializable: true
    },
    AmountEditBox: {
      displayName: "AmountEditBox",
      type: cc.EditBox,
      "default": null,
      serializable: true
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for SellBusinessUI-------------------------//

var SellBusinessUI = cc.Class({
  name: "SellBusinessUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of title of Sell node"
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of cash of Sell node"
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of player name of Sell node"
    },
    BusinessCountLabel: {
      displayName: "BusinessCount",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of BusinessCount of Sell node"
    },
    ScrollContentNode: {
      displayName: "ScrollContentNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of ScrollContentNode of Sell node"
    },
    BusinessSellPrefab: {
      displayName: "BusinessSellPrefab",
      type: cc.Prefab,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of BusinessSellPrefab of Sell node"
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of ExitButton of Sell node"
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of TurnOverExitButton of Sell node"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for PayDayUI-------------------------//

var PayDayUI = cc.Class({
  name: "PayDayUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of title of PayDay node"
    },
    HomeBasedNumberLabel: {
      displayName: "HomeBasedNumber",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of HomeBasedNumber node"
    },
    BMNumberLabel: {
      displayName: "BrickMortarNumber",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of BrickMortarNumber node"
    },
    BMNumberLocationLabel: {
      displayName: "BrickMortarLocations",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of BrickMortarLocations node"
    },
    HomeBasedBtn: {
      displayName: "HomeBasedBtn",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of HomeBasedBtn node"
    },
    BMBtn: {
      displayName: "BrickMortarBtn",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of BrickMortarBtn node"
    },
    LoanBtn: {
      displayName: "LoanBtn",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of LoanBtn node"
    },
    MainPanelNode: {
      displayName: "MainPanelNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of MainPanel node"
    },
    ResultPanelNode: {
      displayName: "ResultPanelNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of ResultPanel node"
    },
    LoanResultPanelNode: {
      displayName: "LoanResultPanelNode",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of LoanResultPanelNode node"
    },
    ResultScreenTitleLabel: {
      displayName: "ResultScreenTitle",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of ResultScreenTitle node"
    },
    DiceResultLabel: {
      displayName: "DiceResult",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of DiceResult node"
    },
    TotalBusinessLabel: {
      displayName: "TotalBusinessLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of TotalBusiness node"
    },
    TotalAmountLabel: {
      displayName: "TotalAmountLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of TotalAmount node"
    },
    SkipLoanButton: {
      displayName: "SkipLoanButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of SkipLoanButton node"
    },
    LoanFotterLabel: {
      displayName: "LoanFotterLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of LoanFotterLabel node"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for InvestUI-------------------------//

var InvestUI = cc.Class({
  name: "InvestUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of title of Invest node"
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of cash of Invest node"
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of player name of Invest node"
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of ExitButton of Invest node"
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of TurnOverExitButton of Invest node"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for BuyOrSellUI-------------------------//

var BuyOrSellUI = cc.Class({
  name: "BuyOrSellUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of title of BuyOrSell node"
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of cash of BuyOrSell node"
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of player name of BuyOrSell node"
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of ExitButton of BuyOrSell node"
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of TurnOverExitButton of BuyOrSell node"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for GameplayUIManager-------------------------//

var PlayerDataIntance;
var PlayerBusinessDataIntance;
var RequiredCash;
var InsideGameBusinessSetup = -1; //-1 means new business is not instantialted from inside game , if it has any other value it means its been instantiated from inside game and its value represents index of player
//turn decisions

var TempMarketingAmount = "";
var TempHiringLawyer; //buyorsell

var GoldCashAmount = "";
var EnterBuySellAmount = "";
var StockBusinessName = "";
var DiceResult;
var OnceOrShare;
var LocationName = "";
var HomeBasedPaymentCompleted = false;
var BrickMortarPaymentCompleted = false;
var LoanPayed = false;
var TotalPayDayAmount = 0;
var DoublePayDay = false;
var GameplayUIManager = cc.Class({
  name: "GameplayUIManager",
  "extends": cc.Component,
  properties: {
    BusinessSetupData: {
      "default": null,
      type: BusinessSetupUI,
      serializable: true,
      tooltip: "reference of BusinessSetupUI class"
    },
    TurnDecisionSetupUI: {
      "default": null,
      type: TurnDecisionSetupUI,
      serializable: true,
      tooltip: "reference of TurnDecisionSetupUI class"
    },
    InvestSellSetupUI: {
      "default": null,
      type: InvestSellUI,
      serializable: true,
      tooltip: "reference of InvestSellUI class"
    },
    PayDaySetupUI: {
      "default": null,
      type: PayDayUI,
      serializable: true,
      tooltip: "reference of InvestSellUI class"
    },
    SellBusinessSetupUI: {
      "default": {},
      type: SellBusinessUI,
      serializable: true,
      tooltip: "reference of SellBusinessUI class"
    },
    InvestSetupUI: {
      "default": {},
      type: InvestUI,
      serializable: true,
      tooltip: "reference of InvestUI class"
    },
    BuyOrSellSetupUI: {
      "default": {},
      type: BuyOrSellUI,
      serializable: true,
      tooltip: "reference of BuyOrSellUI class"
    },
    PopUpUI: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for pop up screen"
    },
    BusinessSetupNode: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for business setup screen"
    },
    GameplayUIScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for gameplay ui screen"
    },
    DecisionScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for Decision screen"
    },
    InvestSellScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for Invest & sell screen"
    },
    PayDayScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for PayDay screen"
    },
    SellBusinessScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for SellBusiness screen"
    },
    InvestScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for Invest screen"
    },
    BuyOrSellScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for BuyOrSell screen"
    },
    TempDiceText: {
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "label reference for dice"
    },
    LeaveRoomButton: {
      "default": null,
      type: cc.Node,
      serializable: true
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.CheckReferences(); //local variables

    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
  },
  ResetTurnVariable: function ResetTurnVariable() {
    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require('GamePlayReferenceManager');
    if (!GameManager || GameManager == null) GameManager = require('GameManager');
  },
  onEnable: function onEnable() {
    //events subscription to be called 
    cc.systemEvent.on('SyncData', this.SyncData, this);
  },
  onDisable: function onDisable() {
    cc.systemEvent.off('SyncData', this.SyncData, this);
  },
  start: function start() {},
  //#region Spectate UI Setup
  InitialScreen_SpectateMode: function InitialScreen_SpectateMode() {
    this.BusinessSetupData.WaitingStatusNode.active = true;
  },
  ToggleLeaveRoomButton_SpectateModeUI: function ToggleLeaveRoomButton_SpectateModeUI(_state) {
    this.LeaveRoomButton.active = _state;
  },
  OnLeaveButtonClicked_SpectateModeUI: function OnLeaveButtonClicked_SpectateModeUI() {
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(true);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
    setTimeout(function () {
      GamePlayReferenceManager.Instance.Get_MultiplayerController().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RemovePersistNode();
      GamePlayReferenceManager.Instance.Get_ServerBackend().RemovePersistNode();
      GamePlayReferenceManager.Instance.RemovePersistNode();
      cc.director.loadScene("Splash");
    }, 500);
  },
  //#endregion
  //#region BusinessSetup with loan
  //Business setup ui//------------------------
  StartNewBusiness_BusinessSetup: function StartNewBusiness_BusinessSetup(isFirstTime, insideGame) {
    if (insideGame === void 0) {
      insideGame = false;
    }

    //called first time form GameManager onload function
    this.CheckReferences();
    this.BusinessSetupNode.active = true;
    this.Init_BusinessSetup(isFirstTime, insideGame);
  },
  Init_BusinessSetup: function Init_BusinessSetup(isFirstTime, insideGame) {
    if (insideGame === void 0) {
      insideGame = false;
    }

    PlayerDataIntance = new GameManager.PlayerData();
    PlayerBusinessDataIntance = new GameManager.BusinessInfo();

    if (isFirstTime) {
      this.BusinessSetupData.ExitButtonNode.active = false;
      this.BusinessSetupData.TimerNode.active = true;
      PlayerDataIntance.Cash = 20000;
    }

    this.ResetButtonStates_BusinessSetup();

    if (insideGame) {
      this.BusinessSetupData.ExitButtonNode.active = true;
      this.BusinessSetupData.TimerNode.active = false;

      for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length; index++) {
        if (GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID == GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerUID) {
          InsideGameBusinessSetup = index;
          PlayerDataIntance = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index];
          this.OnChangeName_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerName);
          this.OnChangeUID_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].PlayerUID);
          this.OnChangeCash_BusinessSetup(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[index].Cash);
        }
      }
    } else {
      InsideGameBusinessSetup = -1;
      this.OnChangeName_BusinessSetup(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.name);
      this.OnChangeUID_BusinessSetup(GamePlayReferenceManager.Instance.Get_ServerBackend().StudentData.userID);
      this.OnChangeCash_BusinessSetup(PlayerDataIntance.Cash);
    }
  },
  GetObj_BusinessSetup: function GetObj_BusinessSetup() {
    return this.BusinessSetupData;
  },
  OnChangeName_BusinessSetup: function OnChangeName_BusinessSetup(name) {
    this.BusinessSetupData.ChangeName_BusinessSetup(name);
    PlayerDataIntance.PlayerName = name;
  },
  OnChangeUID_BusinessSetup: function OnChangeUID_BusinessSetup(UID) {
    PlayerDataIntance.PlayerUID = UID;
  },
  OnBusinessTypeTextChanged_BusinessSetup: function OnBusinessTypeTextChanged_BusinessSetup(name) {
    this.BusinessSetupData.BusinessTypeTextUI = name;
    PlayerBusinessDataIntance.BusinessTypeDescription = name;
  },
  OnBusinessNameTextChanged_BusinessSetup: function OnBusinessNameTextChanged_BusinessSetup(name) {
    this.BusinessSetupData.BusinessNameTextUI = name;
    PlayerBusinessDataIntance.BusinessName = name;
  },
  ResetButtonStates_BusinessSetup: function ResetButtonStates_BusinessSetup() {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[0].active = false;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[0].active = false;
    this.BusinessSetupData.BusinessTypeLabel.string = "";
    this.BusinessSetupData.BusinessNameLabel.string = "";
    this.BusinessSetupData.BusinessNameTextUI = "";
    this.BusinessSetupData.BusinessTypeTextUI = "";
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.none;
  },
  OnHomeBasedSelected_BusinessSetup: function OnHomeBasedSelected_BusinessSetup() {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[0].active = true;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[0].active = false;
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.HomeBased;
  },
  OnBrickMortarSelected_BusinessSetup: function OnBrickMortarSelected_BusinessSetup() {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[0].active = false;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[0].active = true;
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.brickAndmortar;
  },
  OnChangeCash_BusinessSetup: function OnChangeCash_BusinessSetup(amount) {
    this.BusinessSetupData.PlayerCashUI.string = "$" + amount;
    PlayerDataIntance.Cash = amount;
  },
  CalculateLoan_BusinessSetup: function CalculateLoan_BusinessSetup(amount) {
    var _loanTaken = false;
    var _businessIndex = 0;

    for (var index = 0; index < PlayerDataIntance.NoOfBusiness.length; index++) {
      if (PlayerDataIntance.NoOfBusiness[index].LoanTaken) {
        _loanTaken = true;
        _businessIndex = index;
        break;
      }
    }

    if (_loanTaken) {
      this.ShowToast("You have already taken loan of $" + PlayerDataIntance.NoOfBusiness[_businessIndex].LoanAmount);
    } else {
      if (PlayerDataIntance.Cash >= amount) {
        this.ShowToast("You do not need loan, you have enough cash to buy current selected business.");
      } else {
        this.BusinessSetupData.LoanSetupNode.active = true;
        RequiredCash = Math.abs(parseInt(PlayerDataIntance.Cash) - amount);
        this.BusinessSetupData.LoanAmountLabel[0].children[1].children[0].getComponent(cc.Label).string = "$" + RequiredCash;
      }
    }
  },
  OnLoanButtonClicked_BusinessSetup: function OnLoanButtonClicked_BusinessSetup(event) {
    if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.brickAndmortar) {
      this.CalculateLoan_BusinessSetup(50000);
    } else if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.HomeBased) {
      this.CalculateLoan_BusinessSetup(10000);
    } else {
      this.ShowToast("please select business between Home Based and brick & mortar. ");
    }
  },
  OnLoanBackButtonClicked_BusinessSetup: function OnLoanBackButtonClicked_BusinessSetup(event) {
    this.BusinessSetupData.LoanSetupNode.active = false;
  },
  HighLightLoanSelection_BusinessSetup: function HighLightLoanSelection_BusinessSetup(index) {
    for (var i = 0; i < this.BusinessSetupData.LoanAmountLabel.length; i++) {
      if (index == i) this.BusinessSetupData.LoanAmountLabel[i].children[0].active = true;else this.BusinessSetupData.LoanAmountLabel[i].children[0].active = false;
    }
  },
  OnLoanAmountChoosed_01_BusinessSetup: function OnLoanAmountChoosed_01_BusinessSetup(event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.Other;
    this.HighLightLoanSelection_BusinessSetup(0);
  },
  OnLoanAmountChoosed_02_BusinessSetup: function OnLoanAmountChoosed_02_BusinessSetup(event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.TenThousand;
    this.HighLightLoanSelection_BusinessSetup(1);
  },
  OnLoanAmountChoosed_03_BusinessSetup: function OnLoanAmountChoosed_03_BusinessSetup(event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.TentyThousand;
    this.HighLightLoanSelection_BusinessSetup(2);
  },
  OnLoanAmountChoosed_04_BusinessSetup: function OnLoanAmountChoosed_04_BusinessSetup(event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.ThirtyThousand;
    this.HighLightLoanSelection_BusinessSetup(3);
  },
  OnLoanAmountChoosed_05_BusinessSetup: function OnLoanAmountChoosed_05_BusinessSetup(event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.FortyThousand;
    this.HighLightLoanSelection_BusinessSetup(4);
  },
  OnLoanAmountChoosed_06_BusinessSetup: function OnLoanAmountChoosed_06_BusinessSetup(event) {
    this.BusinessSetupData.LoanAmount = LoanAmountEnum.FiftyThousand;
    this.HighLightLoanSelection_BusinessSetup(5);
  },
  OnTakenLoanClicked_BusinessSetup: function OnTakenLoanClicked_BusinessSetup(event) {
    if (this.BusinessSetupData.LoanAmount == LoanAmountEnum.Other) PlayerBusinessDataIntance.LoanAmount = RequiredCash;else PlayerBusinessDataIntance.LoanAmount = parseInt(this.BusinessSetupData.LoanAmount);
    PlayerBusinessDataIntance.LoanTaken = true;
    this.OnLoanBackButtonClicked_BusinessSetup();
    PlayerDataIntance.Cash = PlayerDataIntance.Cash + PlayerBusinessDataIntance.LoanAmount;
    this.OnChangeCash_BusinessSetup(PlayerDataIntance.Cash);
  },
  SyncData: function SyncData(_data, _ID) {
    if (_ID != GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().actorNr) GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.push(_data);
    console.log(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo);

    if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length >= GamePlayReferenceManager.Instance.Get_MultiplayerController().MaxPlayers) {
      //setting room property to declare initial setup has been
      GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("InitialSetup", true, true);
      GamePlayReferenceManager.Instance.Get_MultiplayerController().getPhotonRef().myRoom().setCustomProperty("PlayerGameInfo", GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo, true);
      this.BusinessSetupData.WaitingStatusNode.active = false;
      this.BusinessSetupNode.active = false;
      this.GameplayUIScreen.active = true;
      GamePlayReferenceManager.Instance.Get_GameManager().StartTurn();
      console.log(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo);
    }
  },
  PurchaseBusiness: function PurchaseBusiness(_amount, _businessName, _isHomeBased) {
    if (PlayerDataIntance.Cash < _amount) {
      this.ShowToast("You have not enough cash to buy this " + _businessName + " business.");
    } else {
      if (_isHomeBased) {
        if (PlayerDataIntance.HomeBasedAmount < 3) {
          PlayerDataIntance.Cash = PlayerDataIntance.Cash - _amount;
          this.BusinessSetupData.PlayerCashUI.string = "$" + PlayerDataIntance.Cash;
          this.StartGame = true;
          PlayerDataIntance.HomeBasedAmount++;
        } else {
          this.StartGame = false;
          this.ShowToast("You cannot own more than three Home based businesses");
        }
      } else {
        PlayerDataIntance.Cash = PlayerDataIntance.Cash - _amount;
        this.BusinessSetupData.PlayerCashUI.string = "$" + PlayerDataIntance.Cash;
        this.StartGame = true;
        PlayerDataIntance.BrickAndMortarAmount++;
      }
    }
  },
  Exit_BusinessSetup: function Exit_BusinessSetup() {
    this.BusinessSetupNode.active = false;

    if (PlayerBusinessDataIntance.LoanTaken) {
      PlayerBusinessDataIntance.LoanTaken = false;
      PlayerDataIntance.Cash = PlayerDataIntance.Cash - PlayerBusinessDataIntance.LoanAmount;
      PlayerBusinessDataIntance.LoanAmount = 0;
      this.ShowToast("Reverting back loan amount.", 500);
    }
  },
  InitialSetup_BusinessSetup: function InitialSetup_BusinessSetup() {
    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.push(PlayerDataIntance); //setting player current data in custom properties when his/her turn overs

    GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", PlayerDataIntance);
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(1, PlayerDataIntance);
    this.BusinessSetupData.WaitingStatusNode.active = true;
  },
  StartNewSetup_DuringGame_BusinessSetup: function StartNewSetup_DuringGame_BusinessSetup() {
    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[InsideGameBusinessSetup] = PlayerDataIntance;
    this.BusinessSetupNode.active = false;
    InsideGameBusinessSetup = -1;
    this.ToggleDecision_TurnDecision(true);
  },
  PayAmountToPlayGame: function PayAmountToPlayGame() {
    this.StartGame = false;
    if (PlayerBusinessDataIntance.BusinessTypeDescription == "") this.ShowToast("please write a business type.");else if (PlayerBusinessDataIntance.BusinessName == "") this.ShowToast("please write a business name.");else {
      if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.HomeBased) //if selected business is homebassed
        this.PurchaseBusiness(10000, "home", true);else if (PlayerBusinessDataIntance.BusinessType == GameManager.EnumBusinessType.brickAndmortar) //if selected business is brick and mortar
        this.PurchaseBusiness(50000, "brick and mortar", false);

      if (this.StartGame == true) {
        PlayerDataIntance.NoOfBusiness.push(PlayerBusinessDataIntance);
        if (InsideGameBusinessSetup != -1) //if start new business has not been called from inside game
          this.StartNewSetup_DuringGame_BusinessSetup();else //if start new business has been called at start of game as initial setup
          this.InitialSetup_BusinessSetup(); //prtinting all values to console

        for (var i = 0; i < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length; i++) {
          console.log("player name: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].PlayerName);
          console.log("player ID: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].PlayerUID);
          console.log("Is player bot: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].IsBot);
          console.log("no of business of player (see below): ");
          console.log(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].NoOfBusiness);
          console.log("player cash: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].Cash);
          console.log("player taken loan: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].LoanTaken);
          console.log("taken loan amount: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[i].LoanAmount);
        }
      }
    }
  },
  //#endregion
  //#region TurnDecisionSetupUI
  //TurnDecisionSetupUI//------------------------
  ToggleDecision_TurnDecision: function ToggleDecision_TurnDecision(isactive) {
    this.DecisionScreen.active = isactive;
    this.UpdateCash_TurnDecision();
  },
  UpdateCash_TurnDecision: function UpdateCash_TurnDecision() {
    this.TurnDecisionSetupUI.CashAmountLabel.string = "$ " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber()].Cash;
  },
  OnMarketingAmountChanged_TurnDecision: function OnMarketingAmountChanged_TurnDecision(amount) {
    //console.log(amount);
    TempMarketingAmount = amount;
  },
  OnMarketingAmountSelected_TurnDecision: function OnMarketingAmountSelected_TurnDecision() {
    if (TempMarketingAmount == "" || TempMarketingAmount == null) {
      this.ShowToast("Please enter an amount.");
    } else {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      this.marketingAmount = parseInt(TempMarketingAmount);
      console.log(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash); //if player entered amount is greater than total cash he owns

      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash >= this.marketingAmount) {
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - this.marketingAmount;
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].MarketingAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].MarketingAmount + this.marketingAmount;
        this.ShowToast("you successfully marketed amount of $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].MarketingAmount + " , remaining cash is $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + ".");
        this.UpdateCash_TurnDecision(); //reseting marketing label and its holding variable

        this.TurnDecisionSetupUI.MarketingEditBox.string = "";
        TempMarketingAmount = "";
      } else {
        this.ShowToast("you don't have enough money."); //reseting marketing label and its holding variable

        this.TurnDecisionSetupUI.MarketingEditBox.string = "";
        TempMarketingAmount = "";
      }
    }
  },
  OnHiringLawyerButtonClicked_TurnDecision: function OnHiringLawyerButtonClicked_TurnDecision() {
    // if player has more than 5000$
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].LawyerStatus) {
      this.ShowToast("you have already hired a lawyer.");
    } else {
      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash >= 5000) {
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].LawyerStatus = true;
        TempHiringLawyer = true;
        console.log(TempHiringLawyer);
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - 5000;
        this.ShowToast("you have successfully hired a lawyer, remaining cash is $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + ".");
        this.UpdateCash_TurnDecision();
      } else {
        this.ShowToast("sorry, you dont have enough money to hire a lawyer.");
      }
    }
  },
  onLocationNameChanged_ExpandBusiness_TurnDecision: function onLocationNameChanged_ExpandBusiness_TurnDecision(_name) {
    LocationName = _name;
  },
  OnExpandButtonClicked_TurnDecision: function OnExpandButtonClicked_TurnDecision() {
    var _this = this;

    //if player has brick and mortar business he could expand it
    console.log("expand business");
    this.TurnDecisionSetupUI.ExpandBusinessNode.active = true;
    var generatedLength = GamePlayReferenceManager.Instance.Get_GameManager().GenerateExpandBusiness_Prefabs_TurnDecision();

    if (generatedLength == 0) {
      this.ShowToast("You have no brick and mortar business to expand.", 1500);
      setTimeout(function () {
        _this.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
      }, 1600);
    }
  },
  OnExpandButtonExitClicked_TurnDecision: function OnExpandButtonExitClicked_TurnDecision() {
    this.UpdateCash_TurnDecision();
    this.CheckReferences();
    LocationName = "";
    console.log("expand business exit called");
    GamePlayReferenceManager.Instance.Get_GameManager().DestroyGeneratedNodes();
    this.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
  },
  OnNewBusinessButtonClicked_TurnDecision: function OnNewBusinessButtonClicked_TurnDecision() {
    console.log("starting new business");
    this.StartNewBusiness_BusinessSetup(false, true);
  },
  OnGoldAmountChanged_TurnDecision: function OnGoldAmountChanged_TurnDecision(amount) {
    //console.log(amount);
    GoldCashAmount = amount;
  },
  OnGoldDiceClicked_TurnDecision: function OnGoldDiceClicked_TurnDecision() {
    if (!this.GoldInvested) {
      this.GoldInvested = true;
      EnterBuySellAmount = "";
      this.ToggleInvestSellScreen_InvestSell(true);
      this.InvestSellSetupUI.InvestState = InvestEnum.GoldInvest;
      DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
      OnceOrShare = DiceResult * 1000;
      this.AssignData_InvestSell("Invest In GOLD", DiceResult, "Each Ounce of GOLD price is:", OnceOrShare + "/ounce", "Enter the number of ounce of GOLD you want to BUY", "Total Buying Amount:", OnceOrShare + "*0=0", "BUY", this.InvestSellSetupUI.InvestState);
    } else {
      this.ShowToast("You can invest in gold one time during turn.", 800);
    }
  },
  OnStockBusinessNameChanged_TurnDecision: function OnStockBusinessNameChanged_TurnDecision(name) {
    StockBusinessName = name;
  },
  OnStockDiceClicked_TurnDecision: function OnStockDiceClicked_TurnDecision() {
    if (!this.StockInvested) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (StockBusinessName == "") {
        this.ResetStockBusinessNameInput();
        this.ShowToast("Please enter a business name to invest.");
      } else {
        this.StockInvested = true;
        EnterBuySellAmount = "";
        this.ToggleInvestSellScreen_InvestSell(true);
        this.InvestSellSetupUI.InvestState = InvestEnum.StockInvest;
        DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
        OnceOrShare = DiceResult * 1000;
        this.AssignData_InvestSell("Invest in Stock", DiceResult, "Each Share of stock price is:", OnceOrShare + "/share", "Enter the number of shares of stock you want to BUY", "Total Buying Amount:", OnceOrShare + "*0=0", "BUY", this.InvestSellSetupUI.InvestState);
      }
    } else {
      this.ShowToast("You can invest in stocks one time during turn.", 800);
    }
  },
  OnSellGoldClicked_TurnDecision: function OnSellGoldClicked_TurnDecision() {
    if (!this.GoldSold) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount > 0) {
        this.GoldSold = true;
        EnterBuySellAmount = "";
        this.ToggleInvestSellScreen_InvestSell(true);
        this.InvestSellSetupUI.InvestState = InvestEnum.GoldSell;
        DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
        OnceOrShare = DiceResult * 1000;
        this.AssignData_InvestSell("Sell GOLD", DiceResult, "Each Ounce of GOLD price is:", OnceOrShare + "/ounce", "Enter the number of ounce of GOLD you want to SELL", "Total Selling Amount:", OnceOrShare + "*0=0", "SELL", this.InvestSellSetupUI.InvestState);
      } else {
        this.ShowToast("you have not purchased any GOLD ounces, please buy them.");
      }
    } else {
      this.ShowToast("You can sell gold one time during turn.", 800);
    }
  },
  OnSellStockClicked_TurnDecision: function OnSellStockClicked_TurnDecision() {
    if (!this.StockSold) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount > 0) {
        this.StockSold = true;
        EnterBuySellAmount = "";
        this.ToggleInvestSellScreen_InvestSell(true);
        this.InvestSellSetupUI.InvestState = InvestEnum.StockSell;
        DiceResult = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();
        OnceOrShare = DiceResult * 1000;
        this.AssignData_InvestSell("Sell STOCK", DiceResult, "Each share of stock price is:", OnceOrShare + "/share", "Enter the number of shares of stock you want to SELL", "Total Selling Amount:", OnceOrShare + "*0=0", "SELL", this.InvestSellSetupUI.InvestState);
      } else {
        this.ShowToast("you have not purchased any shares, please buy them.");
      }
    } else {
      this.ShowToast("You can sell stocks one time during turn.", 800);
    }
  },
  OnPartnershipClicked_TurnDecision: function OnPartnershipClicked_TurnDecision() {
    console.log("go into partner ship");
    this.ShowToast("work in progress, coming soon...");
  },
  OnRollDiceClicked_TurnDecision: function OnRollDiceClicked_TurnDecision() {
    console.log("roll the dice");
    this.ToggleDecision_TurnDecision(false);
    GamePlayReferenceManager.Instance.Get_GameManager().RollDice();
  },
  PrintDiceValue_TurnDecision: function PrintDiceValue_TurnDecision(value) {
    this.TempDiceText.string = value;
  },
  //#endregion
  //#region Invest and sell moddule
  ResetGoldInput: function ResetGoldInput() {
    this.TurnDecisionSetupUI.GoldEditBox.string = "";
    GoldCashAmount = "";
  },
  ResetStockBusinessNameInput: function ResetStockBusinessNameInput() {
    this.TurnDecisionSetupUI.StockEditBox.string = "";
    StockBusinessName = "";
  },
  onAmountChanged_InvestSell: function onAmountChanged_InvestSell(_amount) {
    EnterBuySellAmount = _amount;

    if (EnterBuySellAmount == "") {
      this.UpdateData_InvestSell(OnceOrShare + "*0=0");
    } else {
      var _amount = parseInt(EnterBuySellAmount);

      var _amount = OnceOrShare * _amount;

      this.UpdateData_InvestSell(OnceOrShare + "*" + EnterBuySellAmount + "=" + _amount);
    }
  },
  ToggleInvestSellScreen_InvestSell: function ToggleInvestSellScreen_InvestSell(_state) {
    this.InvestSellScreen.active = _state;
    this.UpdateCash_TurnDecision();
    this.ResetGoldInput();
    this.ResetStockBusinessNameInput();
  },
  AssignData_InvestSell: function AssignData_InvestSell(_title, _diceResult, _priceTitle, _priceValue, _buyOrSellTitle, _totalAmountTitle, _totalAmountValue, _buttonName, _state) {
    this.CheckReferences();
    this.InvestSellSetupUI.AmountEditBox.string = "";
    this.InvestSellSetupUI.TitleLabel.string = _title;
    this.InvestSellSetupUI.DiceResultLabel.string = _diceResult;
    this.InvestSellSetupUI.PriceTitleLabel.string = _priceTitle;
    this.InvestSellSetupUI.PriceValueLabel.string = _priceValue;
    this.InvestSellSetupUI.BuyOrSellTitleLabel.string = _buyOrSellTitle;
    this.InvestSellSetupUI.TotalAmountTitleLabel.string = _totalAmountTitle;
    this.InvestSellSetupUI.TotalAmountValueLabel.string = _totalAmountValue;
    this.InvestSellSetupUI.ButtonNameLabel.string = _buttonName;
  },
  UpdateData_InvestSell: function UpdateData_InvestSell(_totalAmountValue) {
    this.InvestSellSetupUI.TotalAmountValueLabel.string = _totalAmountValue;
  },
  ApplyButton_InvestSell: function ApplyButton_InvestSell() {
    var _this2 = this;

    if (EnterBuySellAmount == "") {
      this.ShowToast("Please enter an amount.");
    } else {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      if (this.InvestSellSetupUI.InvestState == InvestEnum.GoldInvest) {
        var _amount = parseInt(EnterBuySellAmount);

        var _TotalAmount = OnceOrShare * _amount;

        if (_TotalAmount <= GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount + _amount;
          this.ShowToast("You have successfully bought " + _amount + " ounces of GOLD", 1400);
          setTimeout(function () {
            _this2.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("You don't have enough cash.");
        }
      } else if (this.InvestSellSetupUI.InvestState == InvestEnum.GoldSell) {
        var _amount = parseInt(EnterBuySellAmount);

        if (_amount <= GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount) {
          var _TotalAmount = OnceOrShare * _amount;

          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount - _amount;
          this.ShowToast("You have successfully sold " + _amount + " ounces of GOLD for  $" + _TotalAmount, 1400);
          setTimeout(function () {
            _this2.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("you don't have enough GOLD ounces, you own " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].GoldCount + " of GOLD ounces");
        }
      } else if (this.InvestSellSetupUI.InvestState == InvestEnum.StockInvest) {
        var _amount = parseInt(EnterBuySellAmount);

        var _TotalAmount = OnceOrShare * _amount;

        if (_TotalAmount <= GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount + _amount; //can add multiple stocks with business name in object if required

          this.ShowToast("You have successfully bought " + _amount + " shares of business " + StockBusinessName, 1400);
          setTimeout(function () {
            _this2.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("You don't have enough cash.");
        }
      } else if (this.InvestSellSetupUI.InvestState == InvestEnum.StockSell) {
        var _amount = parseInt(EnterBuySellAmount);

        if (_amount <= GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount) {
          var _TotalAmount = OnceOrShare * _amount;

          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + _TotalAmount;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount - _amount;
          this.ShowToast("You have successfully sold " + _amount + " shares of stock for  $" + _TotalAmount, 1400);
          setTimeout(function () {
            _this2.ToggleInvestSellScreen_InvestSell(false);
          }, 1500);
        } else {
          this.UpdateData_InvestSell(OnceOrShare + "*0=0");
          EnterBuySellAmount = "";
          this.InvestSellSetupUI.AmountEditBox.string = "";
          this.ShowToast("you don't have enough stocks shares, you own " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].StockCount + " of stock shares");
        }
      }
    }
  },
  ExitButton_InvestSell: function ExitButton_InvestSell() {
    this.ToggleInvestSellScreen_InvestSell(false);
  },
  //#endregion
  //#region Payday or Double pay Day
  TogglePayDayScreen_PayDay: function TogglePayDayScreen_PayDay(_state) {
    this.PayDayScreen.active = _state;
  },
  ToggleResultPanelScreen_PayDay: function ToggleResultPanelScreen_PayDay(_state) {
    this.PayDaySetupUI.ResultPanelNode.active = _state;
  },
  UpdateButtons_PayDay: function UpdateButtons_PayDay(HMAmount, BMAmount, loanTaken) {
    if (HMAmount == 0) {
      HomeBasedPaymentCompleted = true;
      this.PayDaySetupUI.HomeBasedBtn.getComponent(cc.Button).interactable = false;
    } else {
      HomeBasedPaymentCompleted = false;
      this.PayDaySetupUI.HomeBasedBtn.getComponent(cc.Button).interactable = true;
    }

    if (BMAmount == 0) {
      BrickMortarPaymentCompleted = true;
      this.PayDaySetupUI.BMBtn.getComponent(cc.Button).interactable = false;
    } else {
      BrickMortarPaymentCompleted = false;
      this.PayDaySetupUI.BMBtn.getComponent(cc.Button).interactable = true;
    }

    if (!loanTaken) {
      LoanPayed = true;
      this.PayDaySetupUI.LoanBtn.getComponent(cc.Button).interactable = false;
    } else {
      LoanPayed = false;
      this.PayDaySetupUI.LoanBtn.getComponent(cc.Button).interactable = true;
    }
  },
  GetLoanAmount_PayDay: function GetLoanAmount_PayDay() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _loan = 0;

    for (var index = 0; index < _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
      if (_manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
        _loan = _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanAmount;
        break;
      }
    }

    return _loan;
  },
  AssignData_PayDay: function AssignData_PayDay(_title, _isDoublePayDay, _skipHM, _skipBM) {
    var _this3 = this;

    if (_isDoublePayDay === void 0) {
      _isDoublePayDay = false;
    }

    if (_skipHM === void 0) {
      _skipHM = false;
    }

    if (_skipBM === void 0) {
      _skipBM = false;
    }

    DoublePayDay = _isDoublePayDay;
    this.TogglePayDayScreen_PayDay(true);
    this.PayDaySetupUI.TitleLabel.string = _title;
    var _time = 1800; //check skip payday variables

    if (_skipHM && _skipBM) this.ShowToast("your payday on home based and brick & mortar businessess will be skipped.", _time);else if (_skipHM) this.ShowToast("your payday on home based businessess will be skipped.", _time);else if (_skipBM) this.ShowToast("your payday on brick & mortar businessess will be skipped.", _time);

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;

    var BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;

    var BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

    var _loanTaken = false;
    var _businessIndex = 0;

    for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
        _loanTaken = true;
        _businessIndex = index;
        break;
      }
    }

    var loanTaken = _loanTaken;
    this.PayDaySetupUI.HomeBasedNumberLabel.string = HMAmount;
    this.PayDaySetupUI.BMNumberLabel.string = BMAmount;
    this.PayDaySetupUI.BMNumberLocationLabel.string = BMLocations;

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber(); //check if loan was skipped previously


    if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) {
      var _loan = this.GetLoanAmount_PayDay();

      this.PayDaySetupUI.LoanFotterLabel.string = "*pay $" + _loan;
    } else {
      this.PayDaySetupUI.LoanFotterLabel.string = "*pay $5000";
    } //check skip payday variables


    if (_skipHM && _skipBM) this.UpdateButtons_PayDay(0, 0, loanTaken);else if (_skipHM) this.UpdateButtons_PayDay(0, BMAmount, loanTaken);else if (_skipBM) this.UpdateButtons_PayDay(HMAmount, 0, loanTaken);else this.UpdateButtons_PayDay(HMAmount, BMAmount, loanTaken);

    if (_skipBM || _skipHM) {
      setTimeout(function () {
        _this3.PayDayCompleted();
      }, _time + 200);
    }
  },
  OnHomeBasedPaymentClicked_PayDay: function OnHomeBasedPaymentClicked_PayDay() {
    if (!HomeBasedPaymentCompleted) {
      this.ToggleResultPanelScreen_PayDay(true);
      if (!DoublePayDay) this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";else this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";
      HomeBasedPaymentCompleted = true;
      this.PayDaySetupUI.HomeBasedBtn.getComponent(cc.Button).interactable = false;

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;

      var _dice = GamePlayReferenceManager.Instance.Get_GameManager().RollOneDice();

      if (!DoublePayDay) TotalPayDayAmount = HMAmount * _dice * 1000;else TotalPayDayAmount = 2 * (HMAmount * _dice) * 1000;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = HMAmount;
      if (!DoublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = _dice + "*" + HMAmount + "*" + "1000=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = _dice + "*" + HMAmount + "*" + "1000*2=" + TotalPayDayAmount;
    }
  },
  OnBMPaymentClicked_PayDay: function OnBMPaymentClicked_PayDay() //brick and mortar
  {
    if (!BrickMortarPaymentCompleted) {
      this.ToggleResultPanelScreen_PayDay(true);
      if (!DoublePayDay) this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";else this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";
      BrickMortarPaymentCompleted = true;
      this.PayDaySetupUI.BMBtn.getComponent(cc.Button).interactable = false;

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;

      var BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

      var _amount = BMAmount + BMLocations;

      var _dice = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();

      if (!DoublePayDay) TotalPayDayAmount = _amount * _dice * 2000;else TotalPayDayAmount = 2 * (_amount * _dice) * 2000;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = _amount;
      if (!DoublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = _dice + "*" + _amount + "*" + "2000=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = _dice + "*" + _amount + "*" + "2000*2=" + TotalPayDayAmount;
    }
  },
  OnLoanPaymentClicked_PayDay: function OnLoanPaymentClicked_PayDay() //brick and mortar
  {
    if (!LoanPayed) {
      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var _EstimateLoan = 0;
      if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) _EstimateLoan = this.GetLoanAmount_PayDay();else _EstimateLoan = 5000;

      if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash >= _EstimateLoan) {
        LoanPayed = true;
        this.PayDaySetupUI.LoanBtn.getComponent(cc.Button).interactable = false;
        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash - _EstimateLoan;
        var _loanTaken = false;
        var _businessIndex = 0;

        for (var index = 0; index < GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness.length; index++) {
          if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[index].LoanTaken) {
            _loanTaken = true;
            _businessIndex = index;
            break;
          }
        }

        GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount - _EstimateLoan;

        if (GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount <= 0) {
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanAmount = 0;
          GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].LoanTaken = false;
        }

        if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) _manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment = false;
        this.PayDayCompleted();
      } else {
        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) this.PayDaySetupUI.SkipLoanButton.getComponent(cc.Button).interactable = false;else this.PayDaySetupUI.SkipLoanButton.getComponent(cc.Button).interactable = true;
        this.PayDaySetupUI.LoanResultPanelNode.active = true;
      }
    }
  },
  ReceivePayment_PayDay: function ReceivePayment_PayDay() //all
  {
    var _this4 = this;

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + TotalPayDayAmount;
    this.ShowToast("Amount $" + TotalPayDayAmount + " has been added to your cash amount, Total Cash has become $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash, 1500);
    setTimeout(function () {
      _this4.ToggleResultPanelScreen_PayDay(false);

      _this4.PayDayCompleted();
    }, 1550);
  },
  SkipLoanOneTime_PayDay: function SkipLoanOneTime_PayDay() {
    this.ShowToast("You have skipped the loan payment, bank will call upon complete loan amount on next payday", 2000);

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    _manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment = true;
    this.PayDaySetupUI.LoanResultPanelNode.active = false;
    LoanPayed = true;
    this.PayDaySetupUI.LoanBtn.getComponent(cc.Button).interactable = false;
    this.PayDayCompleted();
    LoanPayed = true;
  },
  SellBusiness_PayDay: function SellBusiness_PayDay() {
    this.PayDaySetupUI.LoanResultPanelNode.active = false;
    this.EnableSellScreen__SellBusinessUISetup(false);
  },
  ExitLoanScreen_PayDay: function ExitLoanScreen_PayDay() {
    this.PayDaySetupUI.LoanResultPanelNode.active = false;
  },
  PayDayCompleted: function PayDayCompleted() {
    if (HomeBasedPaymentCompleted && BrickMortarPaymentCompleted && LoanPayed) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      console.log("all payday done");
      this.TogglePayDayScreen_PayDay(false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_Whole(false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_HomeBased(false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_BrickAndMortar(false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().TogglePayDay(false, false);
      _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().callUponCard();
    }
  },
  //#endregion
  //#region Sell Business UI
  ToggleSellBusinessScreen_SellBusinessUISetup: function ToggleSellBusinessScreen_SellBusinessUISetup(_state) {
    this.SellBusinessScreen.active = _state;
  },
  SetBusinessUI_SellBusinessUISetup: function SetBusinessUI_SellBusinessUISetup() {
    this.Reset_SellBusinessUISetup();

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    var _tempData = _manager.PlayerGameInfo[_playerIndex];
    this.SellBusinessSetupUI.TitleLabel.string = "SELL";
    this.SellBusinessSetupUI.CashLabel.string = _manager.PlayerGameInfo[_playerIndex].Cash;
    this.SellBusinessSetupUI.PlayerNameLabel.string = _manager.PlayerGameInfo[_playerIndex].PlayerName;
    this.SellBusinessSetupUI.BusinessCountLabel.string = "No of Businesses : " + _manager.PlayerGameInfo[_playerIndex].NoOfBusiness.length;

    for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
      var node = cc.instantiate(this.SellBusinessSetupUI.BusinessSellPrefab);
      node.parent = this.SellBusinessSetupUI.ScrollContentNode;
      node.getComponent('BusinessDetail').CheckReferences();
      node.getComponent('BusinessDetail').SetName(_tempData.NoOfBusiness[index].BusinessName);
      node.getComponent('BusinessDetail').SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent('BusinessDetail').SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent('BusinessDetail').SetBusinessIndex(index);

      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 1) {
        node.getComponent('BusinessDetail').SetBusinessMode(1);
        node.getComponent('BusinessDetail').SetMode("Home Based");
      } else if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 2) {
        node.getComponent('BusinessDetail').SetBusinessMode(2);
        node.getComponent('BusinessDetail').SetMode("Brick & Mortar");
      }

      node.getComponent('BusinessDetail').SetBalance(_tempData.NoOfBusiness[index].Amount);
      node.getComponent('BusinessDetail').SetLocations(_tempData.NoOfBusiness[index].LocationsName.length);
      if (_tempData.NoOfBusiness[index].LocationsName.length == 0) node.getComponent('BusinessDetail').ToggleSellLocationButton(false);else node.getComponent('BusinessDetail').ToggleSellLocationButton(true);
      businessDetailNodes.push(node);
    }
  },
  Reset_SellBusinessUISetup: function Reset_SellBusinessUISetup() {
    for (var index = 0; index < businessDetailNodes.length; index++) {
      businessDetailNodes[index].destroy();
    }

    businessDetailNodes = [];
  },
  EnableSellScreen__SellBusinessUISetup: function EnableSellScreen__SellBusinessUISetup(_isTurnover) {
    if (_isTurnover === void 0) {
      _isTurnover = false;
    }

    if (_isTurnover) {
      this.SellBusinessSetupUI.ExitButton.active = false;
      this.SellBusinessSetupUI.TurnOverExitButton.active = true;
    } else {
      this.SellBusinessSetupUI.ExitButton.active = true;
      this.SellBusinessSetupUI.TurnOverExitButton.active = false;
    }

    this.ToggleSellBusinessScreen_SellBusinessUISetup(true);
    this.SetBusinessUI_SellBusinessUISetup();
  },
  ExitSellScreen__SellBusinessUISetup: function ExitSellScreen__SellBusinessUISetup() {
    this.Reset_SellBusinessUISetup();
    this.ToggleSellBusinessScreen_SellBusinessUISetup(false);
  },
  ExitSellScreenAlongTurnOver__SellBusinessUISetup: function ExitSellScreenAlongTurnOver__SellBusinessUISetup() {
    this.Reset_SellBusinessUISetup();
    this.ToggleSellBusinessScreen_SellBusinessUISetup(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion
  //#region Invest UI
  ToggleInvestScreen_InvestSetupUI: function ToggleInvestScreen_InvestSetupUI(_state) {
    this.InvestScreen.active = _state;
  },
  EnableInvest_InvestSetupUI: function EnableInvest_InvestSetupUI(_isTurnover) {
    if (_isTurnover === void 0) {
      _isTurnover = false;
    }

    this.ResetTurnVariable();
    this.ToggleInvestScreen_InvestSetupUI(true);
    this.SetInvestUI_InvestSetupUI(_isTurnover);
  },
  SetInvestUI_InvestSetupUI: function SetInvestUI_InvestSetupUI(_isTurnover) {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    this.InvestSetupUI.TitleLabel.string = "INVEST";
    this.InvestSetupUI.CashLabel.string = _manager.PlayerGameInfo[_playerIndex].Cash;
    this.InvestSetupUI.PlayerNameLabel.string = _manager.PlayerGameInfo[_playerIndex].PlayerName;

    if (_isTurnover) {
      this.InvestSetupUI.ExitButton.active = false;
      this.InvestSetupUI.TurnOverExitButton.active = true;
    } else {
      this.InvestSetupUI.ExitButton.active = true;
      this.InvestSetupUI.TurnOverExitButton.active = false;
    }
  },
  ExitInvest_InvestSetupUI: function ExitInvest_InvestSetupUI() {
    this.ToggleInvestScreen_InvestSetupUI(false);
  },
  ExitInvestAlongTurnOver_InvestSetupUI: function ExitInvestAlongTurnOver_InvestSetupUI() {
    this.ToggleInvestScreen_InvestSetupUI(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion
  //#region BuyORSell UI
  ToggleBuyOrSellScreen_BuyOrSellSetupUI: function ToggleBuyOrSellScreen_BuyOrSellSetupUI(_state) {
    this.BuyOrSellScreen.active = _state;
  },
  EnableBuyOrSell_BuyOrSellSetupUI: function EnableBuyOrSell_BuyOrSellSetupUI(_isTurnover) {
    if (_isTurnover === void 0) {
      _isTurnover = false;
    }

    this.ResetTurnVariable();
    this.ToggleBuyOrSellScreen_BuyOrSellSetupUI(true);
    this.SetBuyOrSellUI_BuyOrSellSetupUI(_isTurnover);
  },
  SetBuyOrSellUI_BuyOrSellSetupUI: function SetBuyOrSellUI_BuyOrSellSetupUI(_isTurnover) {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    this.BuyOrSellSetupUI.TitleLabel.string = "BUY OR SELL";
    this.BuyOrSellSetupUI.CashLabel.string = _manager.PlayerGameInfo[_playerIndex].Cash;
    this.BuyOrSellSetupUI.PlayerNameLabel.string = _manager.PlayerGameInfo[_playerIndex].PlayerName;

    if (_isTurnover) {
      this.BuyOrSellSetupUI.ExitButton.active = false;
      this.BuyOrSellSetupUI.TurnOverExitButton.active = true;
    } else {
      this.BuyOrSellSetupUI.ExitButton.active = true;
      this.BuyOrSellSetupUI.TurnOverExitButton.active = false;
    }
  },
  ExitSellOrBuy_BuyOrSellSetupUI: function ExitSellOrBuy_BuyOrSellSetupUI() {
    this.ToggleBuyOrSellScreen_BuyOrSellSetupUI(false);
  },
  ExitSellOrBuyAlongTurnOver_BuyOrSellSetupUI: function ExitSellOrBuyAlongTurnOver_BuyOrSellSetupUI() {
    this.ToggleBuyOrSellScreen_BuyOrSellSetupUI(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  //#endregion
  ShowToast: function ShowToast(message, time) {
    if (time === void 0) {
      time = 2250;
    }

    this.PopUpUI.active = true;
    this.PopUpUI.children[2].children[1].getComponent(cc.Label).string = message;
    var SelfToast = this;
    setTimeout(function () {
      SelfToast.PopUpUI.active = false;
    }, time);
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJMb2FuQW1vdW50RW51bSIsImNjIiwiRW51bSIsIk5vbmUiLCJUZW5UaG91c2FuZCIsIlRlbnR5VGhvdXNhbmQiLCJUaGlydHlUaG91c2FuZCIsIkZvcnR5VGhvdXNhbmQiLCJGaWZ0eVRob3VzYW5kIiwiT3RoZXIiLCJCdXNpbmVzc1NldHVwVUkiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZVVJIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiUGxheWVyQ2FzaFVJIiwiQnVzaW5lc3NUeXBlVGV4dFVJIiwiVGV4dCIsIkJ1c2luZXNzTmFtZVRleHRVSSIsIkJ1c2luZXNzVHlwZUxhYmVsIiwiRWRpdEJveCIsIkJ1c2luZXNzTmFtZUxhYmVsIiwiSG9tZUJhc2VkTm9kZVVJIiwiTm9kZSIsIkJyaWNrQW5kTW9ydGFyTm9kZVVJIiwiVGltZXJVSSIsIlRpbWVyTm9kZSIsIkJ1c2luZXNzU2V0dXBOb2RlIiwiTG9hblNldHVwTm9kZSIsIkxvYW5BbW91bnQiLCJMb2FuQW1vdW50TGFiZWwiLCJXYWl0aW5nU3RhdHVzTm9kZSIsIkV4aXRCdXR0b25Ob2RlIiwiY3RvciIsIkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cCIsInN0cmluZyIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJNYXJrZXRpbmdFZGl0Qm94IiwiR29sZEVkaXRCb3giLCJTdG9ja0VkaXRCb3giLCJDYXNoQW1vdW50TGFiZWwiLCJFeHBhbmRCdXNpbmVzc05vZGUiLCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIlByZWZhYiIsIkludmVzdEVudW0iLCJTdG9ja0ludmVzdCIsIkdvbGRJbnZlc3QiLCJTdG9ja1NlbGwiLCJHb2xkU2VsbCIsIkludmVzdFNlbGxVSSIsIlRpdGxlTGFiZWwiLCJEaWNlUmVzdWx0TGFiZWwiLCJQcmljZVRpdGxlTGFiZWwiLCJQcmljZVZhbHVlTGFiZWwiLCJCdXlPclNlbGxUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRWYWx1ZUxhYmVsIiwiQnV0dG9uTmFtZUxhYmVsIiwiSW52ZXN0U3RhdGUiLCJBbW91bnRFZGl0Qm94IiwiU2VsbEJ1c2luZXNzVUkiLCJDYXNoTGFiZWwiLCJQbGF5ZXJOYW1lTGFiZWwiLCJCdXNpbmVzc0NvdW50TGFiZWwiLCJTY3JvbGxDb250ZW50Tm9kZSIsIkJ1c2luZXNzU2VsbFByZWZhYiIsIkV4aXRCdXR0b24iLCJUdXJuT3ZlckV4aXRCdXR0b24iLCJQYXlEYXlVSSIsIkhvbWVCYXNlZE51bWJlckxhYmVsIiwiQk1OdW1iZXJMYWJlbCIsIkJNTnVtYmVyTG9jYXRpb25MYWJlbCIsIkhvbWVCYXNlZEJ0biIsIkJNQnRuIiwiTG9hbkJ0biIsIk1haW5QYW5lbE5vZGUiLCJSZXN1bHRQYW5lbE5vZGUiLCJMb2FuUmVzdWx0UGFuZWxOb2RlIiwiUmVzdWx0U2NyZWVuVGl0bGVMYWJlbCIsIlRvdGFsQnVzaW5lc3NMYWJlbCIsIlRvdGFsQW1vdW50TGFiZWwiLCJTa2lwTG9hbkJ1dHRvbiIsIkxvYW5Gb3R0ZXJMYWJlbCIsIkludmVzdFVJIiwiQnV5T3JTZWxsVUkiLCJQbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllckJ1c2luZXNzRGF0YUludGFuY2UiLCJSZXF1aXJlZENhc2giLCJJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCIsIlRlbXBNYXJrZXRpbmdBbW91bnQiLCJUZW1wSGlyaW5nTGF3eWVyIiwiR29sZENhc2hBbW91bnQiLCJFbnRlckJ1eVNlbGxBbW91bnQiLCJTdG9ja0J1c2luZXNzTmFtZSIsIkRpY2VSZXN1bHQiLCJPbmNlT3JTaGFyZSIsIkxvY2F0aW9uTmFtZSIsIkhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQiLCJCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQiLCJMb2FuUGF5ZWQiLCJUb3RhbFBheURheUFtb3VudCIsIkRvdWJsZVBheURheSIsIkdhbWVwbGF5VUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiQnVzaW5lc3NTZXR1cERhdGEiLCJJbnZlc3RTZWxsU2V0dXBVSSIsIlBheURheVNldHVwVUkiLCJTZWxsQnVzaW5lc3NTZXR1cFVJIiwiSW52ZXN0U2V0dXBVSSIsIkJ1eU9yU2VsbFNldHVwVUkiLCJQb3BVcFVJIiwiR2FtZXBsYXlVSVNjcmVlbiIsIkRlY2lzaW9uU2NyZWVuIiwiSW52ZXN0U2VsbFNjcmVlbiIsIlBheURheVNjcmVlbiIsIlNlbGxCdXNpbmVzc1NjcmVlbiIsIkludmVzdFNjcmVlbiIsIkJ1eU9yU2VsbFNjcmVlbiIsIlRlbXBEaWNlVGV4dCIsIkxlYXZlUm9vbUJ1dHRvbiIsIm9uTG9hZCIsIkNoZWNrUmVmZXJlbmNlcyIsIkdvbGRJbnZlc3RlZCIsIkdvbGRTb2xkIiwiU3RvY2tJbnZlc3RlZCIsIlN0b2NrU29sZCIsIlJlc2V0VHVyblZhcmlhYmxlIiwicmVxdWlyZSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlN5bmNEYXRhIiwib25EaXNhYmxlIiwib2ZmIiwic3RhcnQiLCJJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSIsImFjdGl2ZSIsIlRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSSIsIl9zdGF0ZSIsIk9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJIiwiSW5zdGFuY2UiLCJHZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyIiwiVG9nZ2xlTGVhdmVSb29tX0Jvb2wiLCJEaXNjb25uZWN0UGhvdG9uIiwic2V0VGltZW91dCIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiaXNGaXJzdFRpbWUiLCJpbnNpZGVHYW1lIiwiSW5pdF9CdXNpbmVzc1NldHVwIiwiUGxheWVyRGF0YSIsIkJ1c2luZXNzSW5mbyIsIkNhc2giLCJSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwIiwiaW5kZXgiLCJHZXRfR2FtZU1hbmFnZXIiLCJQbGF5ZXJHYW1lSW5mbyIsImxlbmd0aCIsIlN0dWRlbnREYXRhIiwidXNlcklEIiwiUGxheWVyVUlEIiwiT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJQbGF5ZXJOYW1lIiwiT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cCIsIk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwIiwiR2V0T2JqX0J1c2luZXNzU2V0dXAiLCJVSUQiLCJPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIk9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzTmFtZSIsImNoaWxkcmVuIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIm5vbmUiLCJPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJIb21lQmFzZWQiLCJPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsImJyaWNrQW5kbW9ydGFyIiwiYW1vdW50IiwiQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiTm9PZkJ1c2luZXNzIiwiTG9hblRha2VuIiwiU2hvd1RvYXN0IiwiTWF0aCIsImFicyIsInBhcnNlSW50IiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiX2RhdGEiLCJfSUQiLCJQaG90b25BY3RvciIsImFjdG9yTnIiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIk1heFBsYXllcnMiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYW1vdW50IiwiX2J1c2luZXNzTmFtZSIsIl9pc0hvbWVCYXNlZCIsIkhvbWVCYXNlZEFtb3VudCIsIlN0YXJ0R2FtZSIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiRXhpdF9CdXNpbmVzc1NldHVwIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJSYWlzZUV2ZW50IiwiU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAiLCJUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24iLCJQYXlBbW91bnRUb1BsYXlHYW1lIiwiSXNCb3QiLCJpc2FjdGl2ZSIsIlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uIiwiR2V0VHVybk51bWJlciIsIk9uTWFya2V0aW5nQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbiIsIl9wbGF5ZXJJbmRleCIsIm1hcmtldGluZ0Ftb3VudCIsIk1hcmtldGluZ0Ftb3VudCIsIk9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJMYXd5ZXJTdGF0dXMiLCJvbkxvY2F0aW9uTmFtZUNoYW5nZWRfRXhwYW5kQnVzaW5lc3NfVHVybkRlY2lzaW9uIiwiX25hbWUiLCJPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiZ2VuZXJhdGVkTGVuZ3RoIiwiR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbiIsIk9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uIiwiRGVzdHJveUdlbmVyYXRlZE5vZGVzIiwiT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPbkdvbGREaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJUb2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwiLCJSb2xsVHdvRGljZXMiLCJBc3NpZ25EYXRhX0ludmVzdFNlbGwiLCJPblN0b2NrQnVzaW5lc3NOYW1lQ2hhbmdlZF9UdXJuRGVjaXNpb24iLCJPblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0IiwiT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uIiwiR29sZENvdW50IiwiT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlN0b2NrQ291bnQiLCJPblBhcnRuZXJzaGlwQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJSb2xsRGljZSIsIlByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbiIsInZhbHVlIiwiUmVzZXRHb2xkSW5wdXQiLCJvbkFtb3VudENoYW5nZWRfSW52ZXN0U2VsbCIsIlVwZGF0ZURhdGFfSW52ZXN0U2VsbCIsIl90aXRsZSIsIl9kaWNlUmVzdWx0IiwiX3ByaWNlVGl0bGUiLCJfcHJpY2VWYWx1ZSIsIl9idXlPclNlbGxUaXRsZSIsIl90b3RhbEFtb3VudFRpdGxlIiwiX3RvdGFsQW1vdW50VmFsdWUiLCJfYnV0dG9uTmFtZSIsIkFwcGx5QnV0dG9uX0ludmVzdFNlbGwiLCJfVG90YWxBbW91bnQiLCJFeGl0QnV0dG9uX0ludmVzdFNlbGwiLCJUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5IiwiVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5IiwiVXBkYXRlQnV0dG9uc19QYXlEYXkiLCJITUFtb3VudCIsIkJNQW1vdW50IiwibG9hblRha2VuIiwiQnV0dG9uIiwiaW50ZXJhY3RhYmxlIiwiR2V0TG9hbkFtb3VudF9QYXlEYXkiLCJfbWFuYWdlciIsIl9sb2FuIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl90aW1lIiwiQk1Mb2NhdGlvbnMiLCJUb3RhbExvY2F0aW9uc0Ftb3VudCIsIlNraXBwZWRMb2FuUGF5bWVudCIsIlBheURheUNvbXBsZXRlZCIsIk9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiX2RpY2UiLCJSb2xsT25lRGljZSIsIk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJfRXN0aW1hdGVMb2FuIiwiUmVjZWl2ZVBheW1lbnRfUGF5RGF5IiwiU2tpcExvYW5PbmVUaW1lX1BheURheSIsIlNlbGxCdXNpbmVzc19QYXlEYXkiLCJFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdExvYW5TY3JlZW5fUGF5RGF5IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlRvZ2dsZVBheURheSIsImNhbGxVcG9uQ2FyZCIsIlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwIiwiU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwIiwiUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIl90ZW1wRGF0YSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIlNldE5hbWUiLCJTZXRUeXBlIiwiU2V0QnVzaW5lc3NJbmRleCIsIlNldEJ1c2luZXNzTW9kZSIsIlNldE1vZGUiLCJTZXRCYWxhbmNlIiwiQW1vdW50IiwiU2V0TG9jYXRpb25zIiwiTG9jYXRpb25zTmFtZSIsIlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbiIsImRlc3Ryb3kiLCJfaXNUdXJub3ZlciIsIkV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwIiwiY29tcGxldGVDYXJkVHVybiIsIlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJIiwiRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkiLCJTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJIiwiRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSIsIlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJIiwiRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkiLCJTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eV9CdXlPclNlbGxTZXR1cFVJIiwiRXhpdFNlbGxPckJ1eUFsb25nVHVybk92ZXJfQnV5T3JTZWxsU2V0dXBVSSIsIm1lc3NhZ2UiLCJ0aW1lIiwiU2VsZlRvYXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxJQUFsQjtBQUNBLElBQUlDLHdCQUF3QixHQUFDLElBQTdCO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUMsRUFBeEIsRUFDQTs7QUFDQSxJQUFJQyxjQUFjLEdBQUdDLEVBQUUsQ0FBQ0Ms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LEtBQTVDO0FBQ0gsR0FsNEMwQjtBQW80QzNCSSxFQUFBQSwyQ0FwNEMyQix5REFxNEMzQjtBQUNJLFNBQUtKLHNDQUFMLENBQTRDLEtBQTVDO0FBQ0FoVyxJQUFBQSx3QkFBd0IsQ0FBQ29KLFFBQXpCLENBQWtDbUIsZUFBbEMsR0FBb0RtTCxnQkFBcEQ7QUFDSCxHQXg0QzBCO0FBeTRDM0I7QUFFQXJKLEVBQUFBLFNBQVMsRUFBQyxtQkFBU2dLLE9BQVQsRUFBaUJDLElBQWpCLEVBQ1Y7QUFBQSxRQUQyQkEsSUFDM0I7QUFEMkJBLE1BQUFBLElBQzNCLEdBRGdDLElBQ2hDO0FBQUE7O0FBQ0ksU0FBS2hQLE9BQUwsQ0FBYTBCLE1BQWIsR0FBb0IsSUFBcEI7QUFDQSxTQUFLMUIsT0FBTCxDQUFhaUUsUUFBYixDQUFzQixDQUF0QixFQUF5QkEsUUFBekIsQ0FBa0MsQ0FBbEMsRUFBcUNrQixZQUFyQyxDQUFrRHRNLEVBQUUsQ0FBQ2dCLEtBQXJELEVBQTREdUIsTUFBNUQsR0FBbUUyVCxPQUFuRTtBQUNBLFFBQUlFLFNBQVMsR0FBQyxJQUFkO0FBQ0EvTSxJQUFBQSxVQUFVLENBQUMsWUFBVTtBQUFHK00sTUFBQUEsU0FBUyxDQUFDalAsT0FBVixDQUFrQjBCLE1BQWxCLEdBQXlCLEtBQXpCO0FBQWlDLEtBQS9DLEVBQWlEc04sSUFBakQsQ0FBVjtBQUNIO0FBajVDMEIsQ0FBVCxDQUF0QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVNYW5hZ2VyID0gbnVsbDtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcj1udWxsO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxOb2Rlcz1bXTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGFtb3VudCBvZiBsb2FuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBMb2FuQW1vdW50RW51bSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTowLFxyXG4gICAgVGVuVGhvdXNhbmQ6IDEwMDAwLCAgICAgICAgICAgICAgICAgIFxyXG4gICAgVGVudHlUaG91c2FuZDogMjAwMDAsXHJcbiAgICBUaGlydHlUaG91c2FuZDogMzAwMDAsXHJcbiAgICBGb3J0eVRob3VzYW5kOiA0MDAwMCxcclxuICAgIEZpZnR5VGhvdXNhbmQ6IDUwMDAwLFxyXG4gICAgT3RoZXI6NlxyXG59KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1c2luZXNzIFNldHVwIFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXNpbmVzc1NldHVwVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkJ1c2luZXNzU2V0dXBVSVwiLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllck5hbWVVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUGxheWVyTmFtZVVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIG5hbWVcIix9LFxyXG4gICAgUGxheWVyQ2FzaFVJOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJDYXNoVUlcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIGZvciBwbGF5ZXIgY2FzaFwiLH0sXHJcbiAgICBCdXNpbmVzc1R5cGVUZXh0VUk6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzVHlwZVRleHRVSVwiLFxyXG4gICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgdG9vbHRpcDpcInZhciB0byBzdG9yZSB0ZXh0IGZvciBidXNpbmVzcyB0eXBlXCIsfSxcclxuICAgIEJ1c2luZXNzTmFtZVRleHRVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NUeXBlVGV4dFVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5UZXh0LFxyXG4gICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgICB0b29sdGlwOlwidmFyIHRvIHN0b3JlIHRleHQgZm9yIGJ1c2luZXNzIG5hbWVcIix9LFxyXG4gICAgQnVzaW5lc3NUeXBlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzVHlwZUxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHR5cGUgZWRpdGJveFwiLH0sXHJcbiAgICBCdXNpbmVzc05hbWVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnVzaW5lc3NOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcInJlZmVyZWNlIGZvciBidXNpbmVzcyBuYW1lIGVkaXRib3hcIix9LFxyXG4gICAgSG9tZUJhc2VkTm9kZVVJOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJIb21lQmFzZWROb2RlVUlcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc1wiLH0sXHJcbiAgICBCcmlja0FuZE1vcnRhck5vZGVVSTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnJpY2tBbmRNb3J0YXJOb2RlVUlcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc1wiLH0sXHJcbiAgICBUaW1lclVJOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUaW1lclVJXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIG9mIHRoZSBsYWJlbCBmb3IgdGltZXJcIix9LFxyXG4gICAgVGltZXJOb2RlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJUaW1lck5vZGVcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciB0aW1lciBub2RlIGluIGJ1c2luZXNzIHNldHVwXCJ9LCBcclxuICAgIEJ1c2luZXNzU2V0dXBOb2RlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXNpbmVzc1NldHVwTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBidXNpbmVzcyBzZXR1cFwiLH0sXHJcbiAgICBMb2FuU2V0dXBOb2RlOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJMb2FuU2V0dXBOb2RlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGxvYW4gc2V0dXBcIix9LFxyXG4gICAgTG9hbkFtb3VudDpcclxuICAgIHtcclxuICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5BbW91bnRcIixcclxuICAgICAgICB0eXBlOiBMb2FuQW1vdW50RW51bSxcclxuICAgICAgICBkZWZhdWx0OiBMb2FuQW1vdW50RW51bS5Ob25lLFxyXG4gICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICB0b29sdGlwOlwibG9hbiBhbW91bnQgdGFrZW4gYnkgcGxheWVyIChzdGF0ZSBtYWNoaW5lKVwifSwgXHJcbiAgICBMb2FuQW1vdW50TGFiZWw6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkxvYW5BbW91bnRMYWJlbFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIGFsbCBsYWJlbHMgb2YgYW1vdW50cyBpbiBsb2FuIFVJXCJ9LCBcclxuICAgIFdhaXRpbmdTdGF0dXNOb2RlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJXYWl0aW5nU3RhdHVzTm9kZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIHdhaXRpbmcgc3RhdHVzIHNjcmVlbiBvbiBpbml0aWFsIGJ1c2luZXNzIHNldHVwXCJ9LCBcclxuICAgIEV4aXRCdXR0b25Ob2RlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uTm9kZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIGV4aXQgYnV0dG9uIG5vZGUgaW4gYnVzaW5lc3Mgc2V0dXBcIn0sIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3IvL1xyXG4gICAgfSxcclxuXHJcbiAgICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nPW5hbWU7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVHVybkRlY2lzaW9uU2V0dXBVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiVHVybkRlY2lzaW9uU2V0dXBVSVwiLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIE1hcmtldGluZ0VkaXRCb3g6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1hcmtldGluZ0VkaXRCb3hcIixcclxuICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBtYXJrZXRpbmcgbm9kZVwiLH0sXHJcbiAgICBHb2xkRWRpdEJveDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiR29sZEVkaXRCb3hcIixcclxuICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3QgZ29sZCBub2RlXCIsfSwgXHJcbiAgICBTdG9ja0VkaXRCb3g6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlN0b2NrRWRpdEJveFwiLFxyXG4gICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBzdG9jayBub2RlXCIsfSxcclxuICAgIENhc2hBbW91bnRMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaFwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byBjYXNoIG5vZGVcIix9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NOb2RlOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFeHBhbmRCdXNpbmVzc05vZGVcIixcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiUmVmZXJlbmNlIGZvciBleHBuYWQgYnVzaW5lc3Mgbm9kZVwifSwgXHJcbiAgICBFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTpcIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJSZWZlcmVuY2UgZm9yIGNvbnRlbnQgbm9kZSBvZiBzY3JvbGwgdmlldyBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwifSwgICBcclxuICAgIEV4cGFuZEJ1c2luZXNzUHJlZmFiOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJFeHBhbmRCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIlJlZmVyZW5jZSBmb3IgcHJlZmFiIG9mIGV4cGFuZCBidXNpbmVzcyBub2RlXCJ9LCAgICAgICAgICAgICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG5cclxuICAgIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLlBsYXllck5hbWVVSS5zdHJpbmc9bmFtZTtcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGludmVzdG1lbnQvYnV5IGFuZCBzZWxsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RFbnVtID0gY2MuRW51bSh7XHJcbiAgICBOb25lOjAsXHJcbiAgICBTdG9ja0ludmVzdDogMSwgICAgICAgICAgICAgICAgICBcclxuICAgIEdvbGRJbnZlc3Q6IDIsXHJcbiAgICBTdG9ja1NlbGw6IDMsXHJcbiAgICBHb2xkU2VsbDogNCxcclxuICAgIE90aGVyOjVcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0U2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RTZWxsVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkludmVzdFNlbGxVSVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBEaWNlUmVzdWx0TGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkRpY2VSZXN1bHRcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2UgUmVzdWx0IG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBQcmljZVRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlByaWNlVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBQcmljZVZhbHVlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlByaWNlVmFsdWVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIHZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBCdXlPclNlbGxUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCdXlPclNlbGxUaXRsZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnV5T3JTZWxsIFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBUb3RhbEFtb3VudFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsQW1vdW50VGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBUb3RhbEFtb3VudFZhbHVlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRvdGFsQW1vdW50VmFsdWVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICBCdXR0b25OYW1lTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGJ1dHRvbiBuYW1lIG9mIGludmVzdCZzZWxsIG5vZGVcIn0sXHJcbiAgICAgSW52ZXN0U3RhdGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkludmVzdFN0YXRlXCIsXHJcbiAgICAgICB0eXBlOiBJbnZlc3RFbnVtLFxyXG4gICAgICAgZGVmYXVsdDogSW52ZXN0RW51bS5Ob25lLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlfSxcclxuICAgICBBbW91bnRFZGl0Qm94OlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJBbW91bnRFZGl0Qm94XCIsXHJcbiAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZX0sXHJcbiAgICAgICAgICBcclxufSxcclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHsvL2NvbnN0cnVjdG9yXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxsQnVzaW5lc3NVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VsbEJ1c2luZXNzVUk9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIlNlbGxCdXNpbmVzc1VJXCIsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUaXRsZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgU2VsbCBub2RlXCJ9LCAgIFxyXG4gICAgQ2FzaExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJDYXNoTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgU2VsbCBub2RlXCJ9LCAgIFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIFNlbGwgbm9kZVwifSwgXHJcbiAgICBCdXNpbmVzc0NvdW50TGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzQ291bnRcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1c2luZXNzQ291bnQgb2YgU2VsbCBub2RlXCJ9LCAgXHJcbiAgICBTY3JvbGxDb250ZW50Tm9kZTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiU2Nyb2xsQ29udGVudE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2Nyb2xsQ29udGVudE5vZGUgb2YgU2VsbCBub2RlXCJ9LCAgXHJcbiAgICBCdXNpbmVzc1NlbGxQcmVmYWI6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJ1c2luZXNzU2VsbFByZWZhYlwiLFxyXG4gICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBCdXNpbmVzc1NlbGxQcmVmYWIgb2YgU2VsbCBub2RlXCJ9LCAgICBcclxuICAgICBFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwifSwgIFxyXG4gICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCJ9LCAgXHJcbn0sXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7Ly9jb25zdHJ1Y3RvclxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJPWNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJQYXlEYXlVSVwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFBheURheSBub2RlXCJ9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkhvbWVCYXNlZE51bWJlclwiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkTnVtYmVyIG5vZGVcIn0sXHJcbiAgICAgQk1OdW1iZXJMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIn0sXHJcbiAgICAgQk1OdW1iZXJMb2NhdGlvbkxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJCcmlja01vcnRhckxvY2F0aW9uc1wiLFxyXG4gICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJMb2NhdGlvbnMgbm9kZVwifSxcclxuICAgIEhvbWVCYXNlZEJ0bjpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiSG9tZUJhc2VkQnRuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZEJ0biBub2RlXCJ9LFxyXG4gICAgQk1CdG46XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIkJyaWNrTW9ydGFyQnRuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyQnRuIG5vZGVcIn0sXHJcbiAgICBMb2FuQnRuOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJMb2FuQnRuXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5CdG4gbm9kZVwifSxcclxuICAgIE1haW5QYW5lbE5vZGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIk1haW5QYW5lbE5vZGVcIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTWFpblBhbmVsIG5vZGVcIn0sXHJcbiAgICBSZXN1bHRQYW5lbE5vZGU6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRQYW5lbCBub2RlXCJ9LFxyXG4gICAgTG9hblJlc3VsdFBhbmVsTm9kZTpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hblJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuUmVzdWx0UGFuZWxOb2RlIG5vZGVcIn0sXHJcbiAgICAgUmVzdWx0U2NyZWVuVGl0bGVMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiUmVzdWx0U2NyZWVuVGl0bGVcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFNjcmVlblRpdGxlIG5vZGVcIn0sXHJcbiAgICAgRGljZVJlc3VsdExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlUmVzdWx0IG5vZGVcIn0sXHJcbiAgIFRvdGFsQnVzaW5lc3NMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiVG90YWxCdXNpbmVzc0xhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEJ1c2luZXNzIG5vZGVcIn0sXHJcbiAgICBUb3RhbEFtb3VudExhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUb3RhbEFtb3VudExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBub2RlXCJ9LFxyXG4gICAgU2tpcExvYW5CdXR0b246XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlNraXBMb2FuQnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNraXBMb2FuQnV0dG9uIG5vZGVcIn0sXHJcbiAgIExvYW5Gb3R0ZXJMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiTG9hbkZvdHRlckxhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuRm90dGVyTGFiZWwgbm9kZVwifSxcclxuICAgICAgICAgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEludmVzdFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiSW52ZXN0VUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBJbnZlc3Qgbm9kZVwifSwgICBcclxuICAgIENhc2hMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEludmVzdCBub2RlXCJ9LCAgIFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEludmVzdCBub2RlXCJ9LCBcclxuICAgICBFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEludmVzdCBub2RlXCJ9LCAgXHJcbiAgICAgVHVybk92ZXJFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwifSwgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1eU9yU2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXlPclNlbGxVST1jYy5DbGFzcyh7XHJcbiAgICBuYW1lOlwiQnV5T3JTZWxsVUlcIixcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6XHJcbiAgICB7XHJcbiAgICAgICBkaXNwbGF5TmFtZTpcIlRpdGxlXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBCdXlPclNlbGwgbm9kZVwifSwgICBcclxuICAgIENhc2hMYWJlbDpcclxuICAgIHtcclxuICAgICAgIGRpc3BsYXlOYW1lOlwiQ2FzaExhYmVsXCIsXHJcbiAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICB0b29sdGlwOlwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEJ1eU9yU2VsbCBub2RlXCJ9LCAgIFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEJ1eU9yU2VsbCBub2RlXCJ9LCBcclxuICAgICBFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgIHRvb2x0aXA6XCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCJ9LCAgXHJcbiAgICAgVHVybk92ZXJFeGl0QnV0dG9uOlxyXG4gICAge1xyXG4gICAgICAgZGlzcGxheU5hbWU6XCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgdG9vbHRpcDpcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwifSwgIFxyXG59LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkgey8vY29uc3RydWN0b3JcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEdhbWVwbGF5VUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhSW50YW5jZTtcclxudmFyIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U7XHJcbnZhciBSZXF1aXJlZENhc2g7XHJcbnZhciBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cD0tMTsgLy8tMSBtZWFucyBuZXcgYnVzaW5lc3MgaXMgbm90IGluc3RhbnRpYWx0ZWQgZnJvbSBpbnNpZGUgZ2FtZSAsIGlmIGl0IGhhcyBhbnkgb3RoZXIgdmFsdWUgaXQgbWVhbnMgaXRzIGJlZW4gaW5zdGFudGlhdGVkIGZyb20gaW5zaWRlIGdhbWUgYW5kIGl0cyB2YWx1ZSByZXByZXNlbnRzIGluZGV4IG9mIHBsYXllclxyXG5cclxuLy90dXJuIGRlY2lzaW9uc1xyXG52YXIgVGVtcE1hcmtldGluZ0Ftb3VudD1cIlwiO1xyXG52YXIgVGVtcEhpcmluZ0xhd3llcjtcclxuXHJcbi8vYnV5b3JzZWxsXHJcbnZhciBHb2xkQ2FzaEFtb3VudD1cIlwiO1xyXG52YXIgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbnZhciBTdG9ja0J1c2luZXNzTmFtZT1cIlwiO1xyXG52YXIgRGljZVJlc3VsdDtcclxudmFyIE9uY2VPclNoYXJlO1xyXG52YXIgTG9jYXRpb25OYW1lPVwiXCI7XHJcblxyXG52YXIgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxudmFyIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxudmFyIExvYW5QYXllZD1mYWxzZTtcclxudmFyIFRvdGFsUGF5RGF5QW1vdW50PTA7XHJcbnZhciBEb3VibGVQYXlEYXk9ZmFsc2U7XHJcblxyXG52YXIgR2FtZXBsYXlVSU1hbmFnZXI9Y2MuQ2xhc3Moe1xyXG4gICAgbmFtZTpcIkdhbWVwbGF5VUlNYW5hZ2VyXCIsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgQnVzaW5lc3NTZXR1cERhdGE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogQnVzaW5lc3NTZXR1cFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgQnVzaW5lc3NTZXR1cFVJIGNsYXNzXCJ9LFxyXG4gICAgICAgIFR1cm5EZWNpc2lvblNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogVHVybkRlY2lzaW9uU2V0dXBVSSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwicmVmZXJlbmNlIG9mIFR1cm5EZWNpc2lvblNldHVwVUkgY2xhc3NcIn0sXHJcbiAgICAgICAgSW52ZXN0U2VsbFNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogSW52ZXN0U2VsbFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsfSwgIFxyXG4gICAgICAgIFBheURheVNldHVwVUk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogUGF5RGF5VUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIix9LCAgXHJcbiAgICAgICAgU2VsbEJ1c2luZXNzU2V0dXBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Ont9LCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IFNlbGxCdXNpbmVzc1VJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgU2VsbEJ1c2luZXNzVUkgY2xhc3NcIix9LCAgXHJcbiAgICAgICAgSW52ZXN0U2V0dXBVSToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Ont9LCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IEludmVzdFVJLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJyZWZlcmVuY2Ugb2YgSW52ZXN0VUkgY2xhc3NcIix9LCAgICBcclxuICAgICAgICBCdXlPclNlbGxTZXR1cFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6e30sICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogQnV5T3JTZWxsVUksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcInJlZmVyZW5jZSBvZiBCdXlPclNlbGxVSSBjbGFzc1wiLH0sICAgICAgICAgICBcclxuICAgICAgICBQb3BVcFVJOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsfSwgICBcclxuICAgICAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgYnVzaW5lc3Mgc2V0dXAgc2NyZWVuXCIsfSwgIFxyXG4gICAgICAgIEdhbWVwbGF5VUlTY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIGdhbWVwbGF5IHVpIHNjcmVlblwiLH0sICAgXHJcbiAgICAgICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIERlY2lzaW9uIHNjcmVlblwiLH0sICAgIFxyXG4gICAgICAgIEludmVzdFNlbGxTY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCAmIHNlbGwgc2NyZWVuXCIsfSwgICAgXHJcbiAgICAgICAgUGF5RGF5U2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBQYXlEYXkgc2NyZWVuXCIsfSwgICAgXHJcbiAgICAgICAgU2VsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDpcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxsQnVzaW5lc3Mgc2NyZWVuXCIsfSwgIFxyXG4gICAgICAgIEludmVzdFNjcmVlbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6XCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0IHNjcmVlblwiLH0sICBcclxuICAgICAgICBCdXlPclNlbGxTY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwiTm9kZSByZWZlcmVuY2UgZm9yIEJ1eU9yU2VsbCBzY3JlZW5cIix9LCAgXHJcbiAgICAgICAgIFRlbXBEaWNlVGV4dDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOlwibGFiZWwgcmVmZXJlbmNlIGZvciBkaWNlXCIsfSwgICBcclxuICAgICAgICAgTGVhdmVSb29tQnV0dG9uOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSx9LCAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7IFxyXG5cclxuICAgICAgICAgLy9sb2NhbCB2YXJpYWJsZXNcclxuICAgICAgICAgdGhpcy5Hb2xkSW52ZXN0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgIHRoaXMuR29sZFNvbGQ9ZmFsc2U7XHJcbiAgICAgICAgIHRoaXMuU3RvY2tJbnZlc3RlZD1mYWxzZTtcclxuICAgICAgICAgdGhpcy5TdG9ja1NvbGQ9ZmFsc2U7XHJcblxyXG4gICAgIH0sXHJcblxyXG4gICAgIFJlc2V0VHVyblZhcmlhYmxlKClcclxuICAgICB7XHJcbiAgICAgICAgdGhpcy5Hb2xkSW52ZXN0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Hb2xkU29sZD1mYWxzZTtcclxuICAgICAgICB0aGlzLlN0b2NrSW52ZXN0ZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQ9ZmFsc2U7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgQ2hlY2tSZWZlcmVuY2VzKClcclxuICAgICB7XHJcbiAgICAgICAgaWYoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlcicpO1xyXG5cclxuICAgICAgICBpZighR2FtZU1hbmFnZXIgfHwgR2FtZU1hbmFnZXI9PW51bGwpXHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyPXJlcXVpcmUoJ0dhbWVNYW5hZ2VyJyk7XHJcbiAgICAgfSxcclxuXHJcbiAgICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkIFxyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKCdTeW5jRGF0YScsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gICAgICB9LFxyXG4gICAgXHJcbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoJ1N5bmNEYXRhJywgdGhpcy5TeW5jRGF0YSwgdGhpcyk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVSSBTZXR1cFxyXG4gICAgSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIFRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSShfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5MZWF2ZVJvb21CdXR0b24uYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgT25MZWF2ZUJ1dHRvbkNsaWNrZWRfU3BlY3RhdGVNb2RlVUkoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2wodHJ1ZSk7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5EaXNjb25uZWN0UGhvdG9uKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIlNwbGFzaFwiKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgXHJcbiAgICAvLyNyZWdpb24gQnVzaW5lc3NTZXR1cCB3aXRoIGxvYW5cclxuICAgIC8vQnVzaW5lc3Mgc2V0dXAgdWkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaXNGaXJzdFRpbWUsaW5zaWRlR2FtZT1mYWxzZSkgeyAvL2NhbGxlZCBmaXJzdCB0aW1lIGZvcm0gR2FtZU1hbmFnZXIgb25sb2FkIGZ1bmN0aW9uXHJcbiAgICAgICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMuSW5pdF9CdXNpbmVzc1NldHVwKGlzRmlyc3RUaW1lLGluc2lkZUdhbWUpO1xyXG4gICAgfSxcclxuICAgIEluaXRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGlzRmlyc3RUaW1lLGluc2lkZUdhbWU9ZmFsc2UpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZT1uZXcgR2FtZU1hbmFnZXIuUGxheWVyRGF0YSgpO1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U9bmV3IEdhbWVNYW5hZ2VyLkJ1c2luZXNzSW5mbygpO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYoaXNGaXJzdFRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9MjAwMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXAoKTtcclxuXHJcbiAgICAgICAgaWYoaW5zaWRlR2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS51c2VySUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF0uUGxheWVyVUlEKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwPWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baW5kZXhdLkNhc2gpOyAgXHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cD0tMTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X1NlcnZlckJhY2tlbmQoKS5TdHVkZW50RGF0YS5uYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7IFxyXG4gICAgICAgIH0gXHJcbiAgICB9LCBcclxuICAgIEdldE9ial9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQnVzaW5lc3NTZXR1cERhdGE7XHJcbiAgICB9LFxyXG4gICAgT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAobmFtZSk7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyTmFtZT1uYW1lO1xyXG4gICAgfSxcclxuICAgIE9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChVSUQpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJVSUQ9VUlEO1xyXG4gICAgfSxcclxuICAgIE9uQnVzaW5lc3NUeXBlVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVST1uYW1lO1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb249bmFtZTtcclxuICAgICAgIFxyXG4gICAgfSxcclxuICAgIE9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVST1uYW1lO1xyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lPW5hbWU7XHJcbiAgICB9LFxyXG4gICAgUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlTGFiZWwuc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc05hbWVMYWJlbC5zdHJpbmc9XCJcIjtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVST1cIlwiO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJPVwiXCI7XHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5ub25lO1xyXG4gICAgfSxcclxuICAgIE9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9ZmFsc2U7XHJcblxyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkO1xyXG4gICAgfSxcclxuICAgIE9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmU9dHJ1ZTtcclxuXHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcjtcclxuICAgIH0sXHJcbiAgICBPbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cDpmdW5jdGlvbihhbW91bnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nPVwiJFwiK2Ftb3VudDtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPWFtb3VudDtcclxuICAgIH0sXHJcbiAgICBDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oYW1vdW50KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleD0wO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYoUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9sb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICAgICAgICAgIF9idXNpbmVzc0luZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihfbG9hblRha2VuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBhbHJlYWR5IHRha2VuIGxvYW4gb2YgJFwiK1BsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPj1hbW91bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG8gbm90IG5lZWQgbG9hbiwgeW91IGhhdmUgZW5vdWdoIGNhc2ggdG8gYnV5IGN1cnJlbnQgc2VsZWN0ZWQgYnVzaW5lc3MuXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlcXVpcmVkQ2FzaD1NYXRoLmFicyhwYXJzZUludChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKS1hbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiJFwiK1JlcXVpcmVkQ2FzaDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIGlmKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoNTAwMDApO1xyXG4gICAgICAgIH1lbHNlIGlmKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlPT1HYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwKDEwMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugc2VsZWN0IGJ1c2luZXNzIGJldHdlZW4gSG9tZSBCYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIuIFwiKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlPWZhbHNlOyAgXHJcbiAgICB9LFxyXG4gICAgSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGluZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8dGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWwubGVuZ3RoO2krKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGluZGV4PT1pKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMV9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD1Mb2FuQW1vdW50RW51bS5PdGhlcjtcclxuICAgICAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgwKTtcclxuXHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMl9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD1Mb2FuQW1vdW50RW51bS5UZW5UaG91c2FuZDtcclxuICAgICAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgxKTtcclxuICAgIH0sXHJcbiAgICBPbkxvYW5BbW91bnRDaG9vc2VkXzAzX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PUxvYW5BbW91bnRFbnVtLlRlbnR5VGhvdXNhbmQ7XHJcbiAgICAgICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMik7XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD1Mb2FuQW1vdW50RW51bS5UaGlydHlUaG91c2FuZDtcclxuICAgICAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgzKTtcclxuICAgIH0sXHJcbiAgICBPbkxvYW5BbW91bnRDaG9vc2VkXzA1X0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50PUxvYW5BbW91bnRFbnVtLkZvcnR5VGhvdXNhbmQ7XHJcbiAgICAgICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNCk7XHJcbiAgICB9LFxyXG4gICAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNl9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD1Mb2FuQW1vdW50RW51bS5GaWZ0eVRob3VzYW5kO1xyXG4gICAgICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDUpO1xyXG4gICAgfSxcclxuICAgIE9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudD09TG9hbkFtb3VudEVudW0uT3RoZXIpXHJcbiAgICAgICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudD1SZXF1aXJlZENhc2g7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ9cGFyc2VJbnQodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50KTtcclxuXHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICB0aGlzLk9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPVBsYXllckRhdGFJbnRhbmNlLkNhc2grUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50O1xyXG4gICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaClcclxuICAgIH0sXHJcblxyXG4gICAgU3luY0RhdGE6ZnVuY3Rpb24oX2RhdGEsX0lEKVxyXG4gICAge1xyXG4gICAgICAgIGlmKF9JRCE9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmFjdG9yTnIpXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5wdXNoKF9kYXRhKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuXHJcbiAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aD49R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5NYXhQbGF5ZXJzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9zZXR0aW5nIHJvb20gcHJvcGVydHkgdG8gZGVjbGFyZSBpbml0aWFsIHNldHVwIGhhcyBiZWVuXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuZ2V0UGhvdG9uUmVmKCkubXlSb29tKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJJbml0aWFsU2V0dXBcIix0cnVlLHRydWUpO1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLmdldFBob3RvblJlZigpLm15Um9vbSgpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyR2FtZUluZm9cIixHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8sdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZT10cnVlO1xyXG5cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFB1cmNoYXNlQnVzaW5lc3M6ZnVuY3Rpb24oX2Ftb3VudCxfYnVzaW5lc3NOYW1lLF9pc0hvbWVCYXNlZClcclxuICAgIHtcclxuICAgICAgICBpZihQbGF5ZXJEYXRhSW50YW5jZS5DYXNoPF9hbW91bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm90IGVub3VnaCBjYXNoIHRvIGJ1eSB0aGlzIFwiK19idXNpbmVzc05hbWUrXCIgYnVzaW5lc3MuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKF9pc0hvbWVCYXNlZClcclxuICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgaWYoUGxheWVyRGF0YUludGFuY2UuSG9tZUJhc2VkQW1vdW50PDMpXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9UGxheWVyRGF0YUludGFuY2UuQ2FzaC1fYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmc9XCIkXCIrUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFydEdhbWU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuSG9tZUJhc2VkQW1vdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0R2FtZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2Fubm90IG93biBtb3JlIHRoYW4gdGhyZWUgSG9tZSBiYXNlZCBidXNpbmVzc2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2g9UGxheWVyRGF0YUludGFuY2UuQ2FzaC1fYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZz1cIiRcIitQbGF5ZXJEYXRhSW50YW5jZS5DYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3RhcnRHYW1lPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQnJpY2tBbmRNb3J0YXJBbW91bnQrKztcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgRXhpdF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZT1mYWxzZTtcclxuXHJcbiAgICAgICAgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5UYWtlbj1mYWxzZTtcclxuICAgICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaD1QbGF5ZXJEYXRhSW50YW5jZS5DYXNoLVBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgICAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50PTA7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUmV2ZXJ0aW5nIGJhY2sgbG9hbiBhbW91bnQuXCIsNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vc2V0dGluZyBwbGF5ZXIgY3VycmVudCBkYXRhIGluIGN1c3RvbSBwcm9wZXJ0aWVzIHdoZW4gaGlzL2hlciB0dXJuIG92ZXJzXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgUGxheWVyRGF0YUludGFuY2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMSxQbGF5ZXJEYXRhSW50YW5jZSk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXA6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cF09UGxheWVyRGF0YUludGFuY2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXA9LTE7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFBheUFtb3VudFRvUGxheUdhbWU6ZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU3RhcnRHYW1lPWZhbHNlO1xyXG5cclxuICAgICAgICBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uPT1cIlwiKVxyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIHR5cGUuXCIpO1xyXG4gICAgICAgIGVsc2UgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWU9PVwiXCIpXHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgbmFtZS5cIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGU9PUdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkKSAvL2lmIHNlbGVjdGVkIGJ1c2luZXNzIGlzIGhvbWViYXNzZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcygxMDAwMCxcImhvbWVcIix0cnVlKTtcclxuICAgICAgICAgICAgZWxzZSBpZihQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZT09R2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcikgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBicmljayBhbmQgbW9ydGFyXHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1cmNoYXNlQnVzaW5lc3MoNTAwMDAsXCJicmljayBhbmQgbW9ydGFyXCIsZmFsc2UpO1xyXG5cclxuICAgICAgICBpZih0aGlzLlN0YXJ0R2FtZT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5wdXNoKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgaWYoSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAhPS0xKSAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgbm90IGJlZW4gY2FsbGVkIGZyb20gaW5zaWRlIGdhbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICAgICAgZWxzZSAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgYmVlbiBjYWxsZWQgYXQgc3RhcnQgb2YgZ2FtZSBhcyBpbml0aWFsIHNldHVwXHJcbiAgICAgICAgICAgICAgICB0aGlzLkluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgICAgICAgICAvL3BydGludGluZyBhbGwgdmFsdWVzIHRvIGNvbnNvbGVcclxuICAgICAgICAgICAgZm9yKHZhciBpPTA7aTxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO2krKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbmFtZTogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgSUQ6IFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJcyBwbGF5ZXIgYm90OiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uSXNCb3QpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyBvZiBidXNpbmVzcyBvZiBwbGF5ZXIgKHNlZSBiZWxvdyk6IFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tpXS5Ob09mQnVzaW5lc3MpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY2FzaDogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkNhc2gpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgdGFrZW4gbG9hbjogXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW2ldLkxvYW5UYWtlbik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRha2VuIGxvYW4gYW1vdW50OiBcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9baV0uTG9hbkFtb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vI3JlZ2lvbiBUdXJuRGVjaXNpb25TZXR1cFVJXHJcbiAgICAvL1R1cm5EZWNpc2lvblNldHVwVUkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoaXNhY3RpdmUpIHtcclxuICAgICAgICB0aGlzLkRlY2lzaW9uU2NyZWVuLmFjdGl2ZT1pc2FjdGl2ZTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uOmZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQ2FzaEFtb3VudExhYmVsLnN0cmluZz1cIiQgXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCldLkNhc2g7XHJcbiAgICB9LFxyXG5cclxuICAgIE9uTWFya2V0aW5nQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudD1hbW91bnQ7XHJcbiAgICB9LCBcclxuXHJcbiAgICBPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKFRlbXBNYXJrZXRpbmdBbW91bnQ9PVwiXCIgfHwgVGVtcE1hcmtldGluZ0Ftb3VudD09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXRpbmdBbW91bnQ9cGFyc2VJbnQoVGVtcE1hcmtldGluZ0Ftb3VudCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9pZiBwbGF5ZXIgZW50ZXJlZCBhbW91bnQgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIGNhc2ggaGUgb3duc1xyXG4gICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoPj0gdGhpcy5tYXJrZXRpbmdBbW91bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC0gdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5NYXJrZXRpbmdBbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50K3RoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3Ugc3VjY2Vzc2Z1bGx5IG1hcmtldGVkIGFtb3VudCBvZiAkXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTWFya2V0aW5nQW1vdW50K1wiICwgcmVtYWluaW5nIGNhc2ggaXMgJFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBtb25leS5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFxyXG5cclxuICAgIE9uSGlyaW5nTGF3eWVyQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBpZiBwbGF5ZXIgaGFzIG1vcmUgdGhhbiA1MDAwJFxyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGFscmVhZHkgaGlyZWQgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g+PTUwMDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5MYXd5ZXJTdGF0dXM9dHJ1ZTtcclxuICAgICAgICAgICAgVGVtcEhpcmluZ0xhd3llcj10cnVlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUZW1wSGlyaW5nTGF3eWVyKTtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLTUwMDA7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGhpcmVkIGEgbGF3eWVyLCByZW1haW5pbmcgY2FzaCBpcyAkXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCtcIi5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJzb3JyeSwgeW91IGRvbnQgaGF2ZSBlbm91Z2ggbW9uZXkgdG8gaGlyZSBhIGxhd3llci5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgb25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihfbmFtZSlcclxuICAgIHtcclxuICAgICAgICBMb2NhdGlvbk5hbWU9X25hbWU7XHJcbiAgICB9LFxyXG4gICAgT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vaWYgcGxheWVyIGhhcyBicmljayBhbmQgbW9ydGFyIGJ1c2luZXNzIGhlIGNvdWxkIGV4cGFuZCBpdFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzXCIpO1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgdmFyIGdlbmVyYXRlZExlbmd0aD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbigpO1xyXG5cclxuICAgICAgICBpZihnZW5lcmF0ZWRMZW5ndGg9PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgdG8gZXhwYW5kLlwiLDE1MDApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB9LCAxNjAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIE9uRXhwYW5kQnV0dG9uRXhpdENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgTG9jYXRpb25OYW1lPVwiXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkRlc3Ryb3lHZW5lcmF0ZWROb2RlcygpO1xyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBPbk5ld0J1c2luZXNzQnV0dG9uQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIG5ldyBidXNpbmVzc1wiKTtcclxuICAgICAgICB0aGlzLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSx0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICAgICAgR29sZENhc2hBbW91bnQ9YW1vdW50O1xyXG4gICAgfSwgXHJcblxyXG4gICAgT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuR29sZEludmVzdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Hb2xkSW52ZXN0ZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlPUludmVzdEVudW0uR29sZEludmVzdDtcclxuICAgICAgICAgICAgRGljZVJlc3VsdD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgIE9uY2VPclNoYXJlPShEaWNlUmVzdWx0KjEwMDApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICAgICAgICBcIkludmVzdCBJbiBHT0xEXCIsXHJcbiAgICAgICAgICAgICAgICBEaWNlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIi9vdW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gQlVZXCIsXHJcbiAgICAgICAgICAgICAgICBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIiowPTBcIixcclxuICAgICAgICAgICAgICAgIFwiQlVZXCIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIiw4MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sIFxyXG5cclxuICAgIE9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBTdG9ja0J1c2luZXNzTmFtZT1uYW1lO1xyXG4gICAgfSwgXHJcblxyXG4gICAgT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBpZighdGhpcy5TdG9ja0ludmVzdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICBpZihTdG9ja0J1c2luZXNzTmFtZT09XCJcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGEgYnVzaW5lc3MgbmFtZSB0byBpbnZlc3QuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdG9ja0ludmVzdGVkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT1JbnZlc3RFbnVtLlN0b2NrSW52ZXN0O1xyXG4gICAgICAgICAgICAgICAgRGljZVJlc3VsdD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZT0oRGljZVJlc3VsdCoxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICAgICAgICAgICAgICBcIkludmVzdCBpbiBTdG9ja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFYWNoIFNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiL3NoYXJlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBCVVlcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIqMD0wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJCVVlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBpbnZlc3QgaW4gc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuR29sZFNvbGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudD4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdvbGRTb2xkPXRydWU7XHJcbiAgICAgICAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQ9XCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT1JbnZlc3RFbnVtLkdvbGRTZWxsO1xyXG4gICAgICAgICAgICAgICAgRGljZVJlc3VsdD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZT0oRGljZVJlc3VsdCoxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICAgICAgICAgICAgICBcIlNlbGwgR09MRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT25jZU9yU2hhcmUrXCIvb3VuY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygb3VuY2Ugb2YgR09MRCB5b3Ugd2FudCB0byBTRUxMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIixcclxuICAgICAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIiowPTBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlNFTExcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBHT0xEIG91bmNlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gc2VsbCBnb2xkIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLlN0b2NrU29sZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudD4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0b2NrU29sZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9SW52ZXN0RW51bS5TdG9ja1NlbGw7XHJcbiAgICAgICAgICAgICAgICBEaWNlUmVzdWx0PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlPShEaWNlUmVzdWx0KjEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiU2VsbCBTVE9DS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFYWNoIHNoYXJlIG9mIHN0b2NrIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIE9uY2VPclNoYXJlK1wiL3NoYXJlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIHNoYXJlcyBvZiBzdG9jayB5b3Ugd2FudCB0byBTRUxMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIixcclxuICAgICAgICAgICAgICAgICAgICBPbmNlT3JTaGFyZStcIiowPTBcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlNFTExcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBzaGFyZXMsIHBsZWFzZSBidXkgdGhlbS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgXHJcblxyXG4gICAgT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnbyBpbnRvIHBhcnRuZXIgc2hpcFwiKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIndvcmsgaW4gcHJvZ3Jlc3MsIGNvbWluZyBzb29uLi4uXCIpO1xyXG4gICAgfSwgXHJcblxyXG4gICAgT25Sb2xsRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyb2xsIHRoZSBkaWNlXCIpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKGZhbHNlKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbERpY2UoKTtcclxuICAgIH0sIFxyXG5cclxuICAgIFByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5UZW1wRGljZVRleHQuc3RyaW5nPXZhbHVlO1xyXG4gICAgfSwgXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIFxyXG5cclxuICAgIC8vI3JlZ2lvbiBJbnZlc3QgYW5kIHNlbGwgbW9kZHVsZVxyXG5cclxuICAgIFJlc2V0R29sZElucHV0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuR29sZEVkaXRCb3guc3RyaW5nPVwiXCI7XHJcbiAgICAgICAgR29sZENhc2hBbW91bnQ9XCJcIjtcclxuICAgIH0sXHJcblxyXG4gICAgUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuU3RvY2tFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgIFN0b2NrQnVzaW5lc3NOYW1lPVwiXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsKF9hbW91bnQpXHJcbiAgICB7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PV9hbW91bnQ7XHJcblxyXG4gICAgICAgIGlmKEVudGVyQnV5U2VsbEFtb3VudD09XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlK1wiKjA9MFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9hbW91bnQ9cGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICAgICAgdmFyIF9hbW91bnQ9T25jZU9yU2hhcmUqX2Ftb3VudDtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUrXCIqXCIrRW50ZXJCdXlTZWxsQW1vdW50K1wiPVwiK19hbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICAgICAgdGhpcy5SZXNldEdvbGRJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnbkRhdGFfSW52ZXN0U2VsbChfdGl0bGUsX2RpY2VSZXN1bHQsX3ByaWNlVGl0bGUsX3ByaWNlVmFsdWUsX2J1eU9yU2VsbFRpdGxlLF90b3RhbEFtb3VudFRpdGxlLF90b3RhbEFtb3VudFZhbHVlLF9idXR0b25OYW1lLF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmc9XCJcIjtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nPV90aXRsZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmc9X2RpY2VSZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVRpdGxlTGFiZWwuc3RyaW5nPV9wcmljZVRpdGxlO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VWYWx1ZUxhYmVsLnN0cmluZz1fcHJpY2VWYWx1ZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1eU9yU2VsbFRpdGxlTGFiZWwuc3RyaW5nPV9idXlPclNlbGxUaXRsZTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VGl0bGVMYWJlbC5zdHJpbmc9X3RvdGFsQW1vdW50VGl0bGU7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nPV90b3RhbEFtb3VudFZhbHVlO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV0dG9uTmFtZUxhYmVsLnN0cmluZz1fYnV0dG9uTmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlRGF0YV9JbnZlc3RTZWxsKF90b3RhbEFtb3VudFZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZz1fdG90YWxBbW91bnRWYWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgQXBwbHlCdXR0b25fSW52ZXN0U2VsbCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoRW50ZXJCdXlTZWxsQW1vdW50PT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT09SW52ZXN0RW51bS5Hb2xkSW52ZXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2Ftb3VudD1wYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudD1PbmNlT3JTaGFyZSpfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgaWYoX1RvdGFsQW1vdW50PD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gtX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50K19hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiK19hbW91bnQrXCIgb3VuY2VzIG9mIEdPTERcIiwxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT09SW52ZXN0RW51bS5Hb2xkU2VsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hbW91bnQ9cGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICAgICAgICAgIGlmKF9hbW91bnQ8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50PU9uY2VPclNoYXJlKl9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoK19Ub3RhbEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uR29sZENvdW50LV9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIitfYW1vdW50K1wiIG91bmNlcyBvZiBHT0xEIGZvciAgJFwiK19Ub3RhbEFtb3VudCwxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIEdPTEQgb3VuY2VzLCB5b3Ugb3duIFwiK0dhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCtcIiBvZiBHT0xEIG91bmNlc1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGU9PUludmVzdEVudW0uU3RvY2tJbnZlc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYW1vdW50PXBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX1RvdGFsQW1vdW50PU9uY2VPclNoYXJlKl9hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBpZihfVG90YWxBbW91bnQ8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC1fVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudD0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCtfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY2FuIGFkZCBtdWx0aXBsZSBzdG9ja3Mgd2l0aCBidXNpbmVzcyBuYW1lIGluIG9iamVjdCBpZiByZXF1aXJlZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIrX2Ftb3VudCtcIiBzaGFyZXMgb2YgYnVzaW5lc3MgXCIrU3RvY2tCdXNpbmVzc05hbWUsMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGRvbid0IGhhdmUgZW5vdWdoIGNhc2guXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZT09SW52ZXN0RW51bS5TdG9ja1NlbGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYW1vdW50PXBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKF9hbW91bnQ8PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudD1PbmNlT3JTaGFyZSpfYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2grX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQ9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQtX2Ftb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgc29sZCBcIitfYW1vdW50K1wiIHNoYXJlcyBvZiBzdG9jayBmb3IgICRcIitfVG90YWxBbW91bnQsMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZStcIiowPTBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50PVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZz1cIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGRvbid0IGhhdmUgZW5vdWdoIHN0b2NrcyBzaGFyZXMsIHlvdSBvd24gXCIrR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU3RvY2tDb3VudCtcIiBvZiBzdG9jayBzaGFyZXNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRCdXR0b25fSW52ZXN0U2VsbCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgXHJcbiAgICAvLyNyZWdpb24gUGF5ZGF5IG9yIERvdWJsZSBwYXkgRGF5XHJcbiAgICBUb2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsQk1BbW91bnQsbG9hblRha2VuKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEhNQW1vdW50PT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKEJNQW1vdW50PT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZD1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIWxvYW5UYWtlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvYW5QYXllZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvYW5QYXllZD1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBHZXRMb2FuQW1vdW50X1BheURheSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHZhciBfbG9hbj0wO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xvYW49X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX2xvYW47XHJcbiAgICB9LFxyXG5cclxuICAgIEFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSxfaXNEb3VibGVQYXlEYXk9ZmFsc2UsX3NraXBITT1mYWxzZSxfc2tpcEJNPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIERvdWJsZVBheURheT1faXNEb3VibGVQYXlEYXk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1fdGl0bGU7XHJcblxyXG4gICAgICAgIHZhciBfdGltZT0xODAwO1xyXG5cclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGFuZCBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgaWYoX3NraXBITSlcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcbiAgICAgICAgZWxzZSBpZihfc2tpcEJNKVxyXG4gICAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcblxyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgdmFyIEhNQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgICB2YXIgQk1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQnJpY2tBbmRNb3J0YXJBbW91bnQ7XHJcbiAgICAgICAgdmFyIEJNTG9jYXRpb25zPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleD0wO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9sb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICAgICAgICAgIF9idXNpbmVzc0luZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbG9hblRha2VuPV9sb2FuVGFrZW47XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZE51bWJlckxhYmVsLnN0cmluZz1ITUFtb3VudDtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuQk1OdW1iZXJMYWJlbC5zdHJpbmc9Qk1BbW91bnQ7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTG9jYXRpb25MYWJlbC5zdHJpbmc9Qk1Mb2NhdGlvbnM7XHJcblxyXG4gICAgICAgIHZhciBfbWFuYWdlcj1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAvL2NoZWNrIGlmIGxvYW4gd2FzIHNraXBwZWQgcHJldmlvdXNseVxyXG4gICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9sb2FuPXRoaXMuR2V0TG9hbkFtb3VudF9QYXlEYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmc9XCIqcGF5ICRcIitfbG9hbjtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmc9XCIqcGF5ICQ1MDAwXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICAgIGlmKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLDAsbG9hblRha2VuKTtcclxuICAgICAgICBlbHNlIGlmKF9za2lwSE0pXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoMCxCTUFtb3VudCxsb2FuVGFrZW4pO1xyXG4gICAgICAgIGVsc2UgaWYoX3NraXBCTSlcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwwLGxvYW5UYWtlbik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KEhNQW1vdW50LEJNQW1vdW50LGxvYW5UYWtlbik7XHJcblxyXG4gICAgICAgIGlmKF9za2lwQk0gfHwgX3NraXBITSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgICAgICAgfSwgKF90aW1lKzIwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFIb21lQmFzZWRQYXltZW50Q29tcGxldGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIlBheURheVwiO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIkRvdWJsZVBheURheVwiO1xyXG5cclxuICAgICAgICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcblxyXG4gICAgICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgICAgICB2YXIgSE1BbW91bnQ9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICAgICAgIHZhciBfZGljZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuXHJcbiAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PShITUFtb3VudCpfZGljZSkqMTAwMDtcclxuICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBUb3RhbFBheURheUFtb3VudD0yKihITUFtb3VudCpfZGljZSkqMTAwMDtcclxuXHJcblxyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nPV9kaWNlO1xyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nPUhNQW1vdW50O1xyXG5cclxuICAgICAgICAgICBpZighRG91YmxlUGF5RGF5KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nPV9kaWNlK1wiKlwiK0hNQW1vdW50K1wiKlwiK1wiMTAwMD1cIitUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmc9X2RpY2UrXCIqXCIrSE1BbW91bnQrXCIqXCIrXCIxMDAwKjI9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIlBheURheVwiO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZz1cIkRvdWJsZVBheURheVwiO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuXHJcbiAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgIHZhciBCTUFtb3VudD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgICAgICB2YXIgQk1Mb2NhdGlvbnM9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICAgICAgIHZhciBfYW1vdW50PUJNQW1vdW50K0JNTG9jYXRpb25zO1xyXG4gICAgICAgICAgIHZhciBfZGljZT1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgaWYoIURvdWJsZVBheURheSlcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PShfYW1vdW50Kl9kaWNlKSoyMDAwO1xyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50PTIqKF9hbW91bnQqX2RpY2UpKjIwMDA7XHJcblxyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nPV9kaWNlO1xyXG4gICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nPV9hbW91bnQ7XHJcblxyXG4gICAgICAgICAgIGlmKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmc9X2RpY2UrXCIqXCIrX2Ftb3VudCtcIipcIitcIjIwMDA9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nPV9kaWNlK1wiKlwiK19hbW91bnQrXCIqXCIrXCIyMDAwKjI9XCIrVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBPbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkoKSAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgIHtcclxuICAgICAgICBpZighTG9hblBheWVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdmFyICBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTsgICBcclxuICAgICAgICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW49MDtcclxuXHJcbiAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgICAgICAgX0VzdGltYXRlTG9hbj10aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIF9Fc3RpbWF0ZUxvYW49NTAwMDtcclxuXHJcbiAgICAgICAgICAgIGlmKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g+PV9Fc3RpbWF0ZUxvYW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExvYW5QYXllZD10cnVlOyBcclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaC1fRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfbG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4PTA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9sb2FuVGFrZW49dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2J1c2luZXNzSW5kZXg9aW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudC1fRXN0aW1hdGVMb2FuO1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50PD0wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50PWZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCkgLy9hbGxcclxuICAgIHtcclxuICAgICAgICB2YXIgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCtUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcIkFtb3VudCAkXCIrVG90YWxQYXlEYXlBbW91bnQrXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIitHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoLDE1MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgICAgfSwgMTU1MCk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNraXBMb2FuT25lVGltZV9QYXlEYXkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgc2tpcHBlZCB0aGUgbG9hbiBwYXltZW50LCBiYW5rIHdpbGwgY2FsbCB1cG9uIGNvbXBsZXRlIGxvYW4gYW1vdW50IG9uIG5leHQgcGF5ZGF5XCIsMjAwMCk7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgTG9hblBheWVkPXRydWU7IFxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT1mYWxzZTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICAgIExvYW5QYXllZD10cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZWxsQnVzaW5lc3NfUGF5RGF5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5FbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICAgIH0sXHJcblxyXG4gICAgRXhpdExvYW5TY3JlZW5fUGF5RGF5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIFBheURheUNvbXBsZXRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCAmJiBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgJiYgTG9hblBheWVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBwYXlkYXkgZG9uZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihmYWxzZSk7XHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleD1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jYWxsVXBvbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBTZWxsIEJ1c2luZXNzIFVJXHJcbiAgICBUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChfc3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlPV9zdGF0ZTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIFNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgICAgdmFyIF90ZW1wRGF0YT1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmc9XCJTRUxMXCI7XHJcbiAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZz1cIk5vIG9mIEJ1c2luZXNzZXMgOiBcIitfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc1NlbGxQcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSk9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKT09MilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ0J1c2luZXNzRGV0YWlsJykuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnQnVzaW5lc3NEZXRhaWwnKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBpZihfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aD09MClcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KCdCdXNpbmVzc0RldGFpbCcpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxufSxcclxuXHJcbiAgICBSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcz1bXTtcclxuICAgIH0sXHJcblxyXG4gICAgRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChfaXNUdXJub3Zlcj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihfaXNUdXJub3ZlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgfSwgIFxyXG4gICAgXHJcbiAgICBFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LCBcclxuICAgICAgICBcclxuXHJcbiAgXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIFxyXG4gICAgLy8jcmVnaW9uIEludmVzdCBVSVxyXG4gICAgVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoX3N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2NyZWVuLmFjdGl2ZT1fc3RhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIEVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyPWZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgICAgIHRoaXMuU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgICB9LFxyXG4gICAgU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3ZlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgX21hbmFnZXI9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXg9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nPVwiSU5WRVNUXCI7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICAgICAgaWYoX2lzVHVybm92ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICBcclxuICAgIC8vI3JlZ2lvbiBCdXlPUlNlbGwgVUlcclxuICAgIFRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKF9zdGF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLkJ1eU9yU2VsbFNjcmVlbi5hY3RpdmU9X3N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICBFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcj1mYWxzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSh0cnVlKTtcclxuICAgICAgICB0aGlzLlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gICAgfSxcclxuICAgIFNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZz1cIkJVWSBPUiBTRUxMXCI7XHJcbiAgICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmc9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICAgICAgaWYoX2lzVHVybm92ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIEV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgICB9LFxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgU2hvd1RvYXN0OmZ1bmN0aW9uKG1lc3NhZ2UsdGltZT0yMjUwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUG9wVXBVSS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLlBvcFVwVUkuY2hpbGRyZW5bMl0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bWVzc2FnZTtcclxuICAgICAgICB2YXIgU2VsZlRvYXN0PXRoaXM7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlPWZhbHNlOyB9LCB0aW1lKTtcclxuICAgIH0sXHJcblxyXG59KTtcclxuIl19