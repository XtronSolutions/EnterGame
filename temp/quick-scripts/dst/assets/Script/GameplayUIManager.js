
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
var businessDetailNodes = [];
var oneQuestionNodes = [];
var businessDetailPartnershipNodes = [];
var PartnerShipData = null;
var PartnerShipOfferReceived = false;
var CancelledID = []; //-------------------------------------------enumeration for amount of loan-------------------------//

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
    CashLabel: {
      displayName: "Cash",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of cash of PayDay node"
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
}); //-------------------------------------------class for OneQuestionUI-------------------------//

var OneQuestionUI = cc.Class({
  name: "OneQuestionUI",
  properties: {
    TitleLabel: {
      displayName: "Title",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of title of OneQuestion node"
    },
    CashLabel: {
      displayName: "CashLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of cash of OneQuestion node"
    },
    PlayerNameLabel: {
      displayName: "PlayerNameLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of player name of OneQuestion node"
    },
    ExitButton: {
      displayName: "ExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of ExitButton of OneQuestion node"
    },
    TurnOverExitButton: {
      displayName: "TurnOverExitButton",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab of TurnOverExitButton of OneQuestion node"
    },
    PlayerDetailLabel: {
      displayName: "PlayerDetailLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of player name of OneQuestion node"
    },
    DetailsPrefab: {
      displayName: "DetailsPrefab",
      type: cc.Prefab,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab DetailsPrefab of OneQuestion node"
    },
    ScrollContent: {
      displayName: "ScrollContent",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the prefab ScrollContent of OneQuestion node"
    },
    WaitingScreen: {
      displayName: "WaitingScreen",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the node WaitingScreen of OneQuestion node"
    },
    DecisionTitleLabel: {
      displayName: "DecisionTitleLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of title of OneQuestion node"
    },
    DecisionCashLabel: {
      displayName: "DecisionCashLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of cash of OneQuestion node"
    },
    DecisionPlayerNameLabel: {
      displayName: "DecisionPlayerNameLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of player name of OneQuestion node"
    },
    DecisionQuestionLabel: {
      displayName: "DecisionQuestionLabel",
      type: cc.Label,
      "default": null,
      serializable: true,
      tooltip: "UI reference to the label of player question of OneQuestion node"
    }
  },
  ctor: function ctor() {//constructor
  }
}); //-------------------------------------------class for PartnershipUI-------------------------//

var PartnershipUI = cc.Class({
  name: "PartnershipUI",
  properties: {
    WaitingStatusScreen: {
      displayName: "WaitingStatusScreen",
      type: cc.Node,
      "default": null,
      serializable: true,
      tooltip: "UI reference of the waiting screen node of partnership ui"
    },
    MainScreen: {
      displayName: "MainScreen",
      type: cc.Node,
      "default": null,
      serializable: true
    },
    TitleName: {
      displayName: "TitleName",
      type: cc.Label,
      "default": null,
      serializable: true
    },
    PlayerName: {
      displayName: "PlayerName",
      type: cc.Label,
      "default": null,
      serializable: true
    },
    PlayerCash: {
      displayName: "PlayerCash",
      type: cc.Label,
      "default": null,
      serializable: true
    },
    PartnerShipPrefab: {
      displayName: "PartnerShipPrefab",
      type: cc.Prefab,
      "default": null,
      serializable: true
    },
    ScrollContent: {
      displayName: "ScrollContent",
      type: cc.Node,
      "default": null,
      serializable: true
    },
    DecisionScreen: {
      displayName: "DecisionScreen",
      type: cc.Node,
      "default": null,
      serializable: true
    },
    DecisionPlayerName: {
      displayName: "DecisionPlayerName",
      type: cc.Label,
      "default": null,
      serializable: true
    },
    DecisionPlayerCash: {
      displayName: "DecisionPlayerCash",
      type: cc.Label,
      "default": null,
      serializable: true
    },
    DecisionDescription: {
      displayName: "DecisionDescription",
      type: cc.Label,
      "default": null,
      serializable: true
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
    OneQuestionSetupUI: {
      "default": {},
      type: OneQuestionUI,
      serializable: true,
      tooltip: "reference of OneQuestionUI class"
    },
    PartnershipSetupUI: {
      "default": {},
      type: PartnershipUI,
      serializable: true,
      tooltip: "reference of PartnershipUI class"
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
    OneQuestionSpaceScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for OneQuestionSpace screen"
    },
    OneQuestionDecisionScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for OneQuestionDecision screen"
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
  onLoad: function onLoad() {
    this.CheckReferences(); //local variables

    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
    this.IsBotTurn = false;
    this.IsBankrupted = false;
    this.BankruptedAmount = 0;
  },
  ResetTurnVariable: function ResetTurnVariable() {
    this.GoldInvested = false;
    this.GoldSold = false;
    this.StockInvested = false;
    this.StockSold = false;
  },
  CheckReferences: function CheckReferences() {
    if (!GamePlayReferenceManager || GamePlayReferenceManager == null) GamePlayReferenceManager = require("GamePlayReferenceManager");
    if (!GameManager || GameManager == null) GameManager = require("GameManager");
  },
  onEnable: function onEnable() {
    //events subscription to be called
    cc.systemEvent.on("SyncData", this.SyncData, this);
  },
  onDisable: function onDisable() {
    cc.systemEvent.off("SyncData", this.SyncData, this);
  },
  //#region Spectate UI Setup
  InitialScreen_SpectateMode: function InitialScreen_SpectateMode() {
    this.BusinessSetupData.WaitingStatusNode.active = true;
  },
  CloseInitialScreen_SpectateMode: function CloseInitialScreen_SpectateMode() {
    this.BusinessSetupData.WaitingStatusNode.active = false;
  },
  ToggleLeaveRoomButton_SpectateModeUI: function ToggleLeaveRoomButton_SpectateModeUI(_state) {
    this.LeaveRoomButton.active = _state;
  },
  OnLeaveButtonClicked_SpectateModeUI: function OnLeaveButtonClicked_SpectateModeUI() {
    GamePlayReferenceManager.Instance.Get_MultiplayerController().ToggleLeaveRoom_Bool(true);
    GamePlayReferenceManager.Instance.Get_MultiplayerController().DisconnectPhoton();
    setTimeout(function () {
      GamePlayReferenceManager.Instance.Get_GameManager().ClearDisplayTimeout();
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
  StartNewBusiness_BusinessSetup: function StartNewBusiness_BusinessSetup(isFirstTime, insideGame, modeIndex, _isBankrupted, _BankruptAmount) {
    if (insideGame === void 0) {
      insideGame = false;
    }

    if (modeIndex === void 0) {
      modeIndex = 0;
    }

    if (_isBankrupted === void 0) {
      _isBankrupted = false;
    }

    if (_BankruptAmount === void 0) {
      _BankruptAmount = 0;
    }

    //called first time form GameManager onload function
    this.CheckReferences();
    this.BusinessSetupNode.active = true;
    this.IsBankrupted = _isBankrupted;
    this.BankruptedAmount = _BankruptAmount;
    if (_isBankrupted) this.ResetTurnVariable();
    this.Init_BusinessSetup(isFirstTime, insideGame, modeIndex, _isBankrupted);
  },
  Init_BusinessSetup: function Init_BusinessSetup(isFirstTime, insideGame, modeIndex, _isBankrupted) {
    if (insideGame === void 0) {
      insideGame = false;
    }

    if (modeIndex === void 0) {
      modeIndex = 0;
    }

    if (_isBankrupted === void 0) {
      _isBankrupted = false;
    }

    PlayerDataIntance = new GameManager.PlayerData();
    PlayerBusinessDataIntance = new GameManager.BusinessInfo();

    if (isFirstTime) {
      this.BusinessSetupData.ExitButtonNode.active = false;
      this.BusinessSetupData.TimerNode.active = true;
      PlayerDataIntance.Cash = 100000;
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
    var _this = this;

    var _mode = GamePlayReferenceManager.Instance.Get_MultiplayerController().GetSelectedMode();

    if (this.IsBankrupted) {
      PlayerDataIntance.IsBankrupt = true;
      PlayerDataIntance.BankruptAmount = this.BankruptedAmount;
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber()] = PlayerDataIntance;
    } else {
      GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.push(PlayerDataIntance);
    }

    if (_mode == 2) {
      //for real players
      //setting player current data in custom properties when his/her turn overs
      GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", PlayerDataIntance);

      if (!this.IsBankrupted) {
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(1, PlayerDataIntance);
        this.BusinessSetupData.WaitingStatusNode.active = true;
      } else {
        this.BusinessSetupData.WaitingStatusNode.active = false;
        this.BusinessSetupNode.active = false;
        this.GameplayUIScreen.active = true;
        var _data = {
          Data: {
            bankrupted: true,
            turn: GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber(),
            PlayerDataMain: PlayerDataIntance
          }
        };
        GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(9, _data);
        GamePlayReferenceManager.Instance.Get_GameManager().StartTurnAfterBankrupt();
      }
    } else if (_mode == 1) {
      //for AI
      if (!this.IsBankrupted) {
        this.BusinessSetupData.WaitingStatusNode.active = true;
        setTimeout(function () {
          _this.BusinessSetupData.WaitingStatusNode.active = false;
          _this.BusinessSetupNode.active = false;
          _this.GameplayUIScreen.active = true;
          GamePlayReferenceManager.Instance.Get_GameManager().StartTurn();
        }, 1600);
      } else {
        this.BusinessSetupData.WaitingStatusNode.active = false;
        this.BusinessSetupNode.active = false;
        this.GameplayUIScreen.active = true;
        GamePlayReferenceManager.Instance.Get_GameManager().StartTurnAfterBankrupt();
      }
    } else {
      console.error("no mode selected");
    }
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

      if (this.StartGame == true || this.IsBankrupted == true) {
        PlayerDataIntance.NoOfBusiness.push(PlayerBusinessDataIntance);
        if (InsideGameBusinessSetup != -1) //if start new business has not been called from inside game
          this.StartNewSetup_DuringGame_BusinessSetup(); //if start new business has been called at start of game as initial setup
        else this.InitialSetup_BusinessSetup(); //prtinting all values to console

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
    var _this2 = this;

    //if player has brick and mortar business he could expand it
    console.log("expand business");
    this.TurnDecisionSetupUI.ExpandBusinessNode.active = true;
    var generatedLength = GamePlayReferenceManager.Instance.Get_GameManager().GenerateExpandBusiness_Prefabs_TurnDecision();

    if (generatedLength == 0) {
      this.ShowToast("You have no brick and mortar business to expand.", 1500);
      setTimeout(function () {
        _this2.TurnDecisionSetupUI.ExpandBusinessNode.active = false;
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
    console.log("go into partner ship"); // this.ShowToast("work in progress, coming soon...");
    // var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    this.EnablePartnership_PartnerShipSetup();
  },
  OnRollDiceClicked_TurnDecision: function OnRollDiceClicked_TurnDecision() {
    console.log("roll the dice");
    this.ToggleDecision_TurnDecision(false);
    GamePlayReferenceManager.Instance.Get_GameManager().RollDice();
  },
  PrintDiceValue_TurnDecision: function PrintDiceValue_TurnDecision(value) {//this.TempDiceText.string=value;
  },
  //#endregion
  //#region Partnership setup
  ToggleScreen_PartnerShipSetup: function ToggleScreen_PartnerShipSetup(_state) {
    this.PartnershipSetupUI.MainScreen.active = _state;
  },
  ToggleWaitingScreen_PartnerShipSetup: function ToggleWaitingScreen_PartnerShipSetup(_state) {
    this.PartnershipSetupUI.WaitingStatusScreen.active = _state;
  },
  ToggleDecisionScreen_PartnerShipSetup: function ToggleDecisionScreen_PartnerShipSetup(_state) {
    this.PartnershipSetupUI.DecisionScreen.active = _state;
  },
  EnablePartnership_PartnerShipSetup: function EnablePartnership_PartnerShipSetup() {
    CancelledID = [];
    this.Reset_PartnerShipSetup();

    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = _manager.GetTurnNumber();

    var _tempData = _manager.PlayerGameInfo[_playerIndex];
    this.ToggleScreen_PartnerShipSetup(true);
    this.PartnershipSetupUI.PlayerName.string = _tempData.PlayerName;
    this.PartnershipSetupUI.PlayerCash.string = "$" + _tempData.Cash;

    for (var index = 0; index < _tempData.NoOfBusiness.length; index++) {
      var node = cc.instantiate(this.PartnershipSetupUI.PartnerShipPrefab);
      node.parent = this.PartnershipSetupUI.ScrollContent;
      node.getComponent("BusinessDetail").CheckReferences();
      node.getComponent("BusinessDetail").SetName(_tempData.NoOfBusiness[index].BusinessName);
      node.getComponent("BusinessDetail").SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent("BusinessDetail").SetBusinessIndex(index);
      var _totalLocations = _tempData.NoOfBusiness[index].LocationsName.length;

      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 1) {
        node.getComponent("BusinessDetail").SetBusinessMode(1);
        node.getComponent("BusinessDetail").SetMode("Home Based");
        node.getComponent("BusinessDetail").SetBusinessValue(10000);
        node.getComponent("BusinessDetail").SetFinalBusinessValue(10000);
      } else if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 2) {
        node.getComponent("BusinessDetail").SetBusinessMode(2);
        node.getComponent("BusinessDetail").SetMode("Brick & Mortar");

        var _allLocationsAmount = _totalLocations * 25000;

        var _finalAmount = 50000 + _allLocationsAmount;

        node.getComponent("BusinessDetail").SetBusinessValue(_finalAmount);
        node.getComponent("BusinessDetail").SetFinalBusinessValue(_finalAmount);
      }

      node.getComponent("BusinessDetail").SetBalance(_tempData.NoOfBusiness[index].LoanAmount);
      node.getComponent("BusinessDetail").SetLocations(_tempData.NoOfBusiness[index].LocationsName.length);

      if (_tempData.NoOfBusiness[index].IsPartnership == true) {
        node.getComponent("BusinessDetail").TogglePartnerShipButton(false);
        node.getComponent("BusinessDetail").SetPartnerName(_tempData.NoOfBusiness[index].PartnerName);
      } else {
        node.getComponent("BusinessDetail").TogglePartnerShipButton(true);
        node.getComponent("BusinessDetail").SetPartnerName("none");
      }

      businessDetailPartnershipNodes.push(node);
    }
  },
  EnablePartnershipDecision_PartnerShipSetup: function EnablePartnershipDecision_PartnerShipSetup(_msg) {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _playerIndex = _manager.GetTurnNumber();

    var _tempData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    this.ToggleDecisionScreen_PartnerShipSetup(true);
    this.PartnershipSetupUI.DecisionPlayerName.string = _tempData.PlayerName;
    this.PartnershipSetupUI.DecisionPlayerCash.string = "$" + _tempData.Cash;
    this.PartnershipSetupUI.DecisionDescription.string = _msg;
  },
  Exit_PartnerShipSetup: function Exit_PartnerShipSetup() {
    this.Reset_PartnerShipSetup();
    this.ToggleScreen_PartnerShipSetup(false);
  },
  Reset_PartnerShipSetup: function Reset_PartnerShipSetup() {
    for (var index = 0; index < businessDetailPartnershipNodes.length; index++) {
      businessDetailPartnershipNodes[index].destroy();
    }

    businessDetailPartnershipNodes = [];
  },
  ReceiveEvent_PartnershipSetup: function ReceiveEvent_PartnershipSetup(_data) {
    PartnerShipOfferReceived = true;
    PartnerShipData = _data;

    var _actor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor();

    var _turn = _data.Data.Turn;
    var _playerData = _data.Data.PlayerData;
    var _SelectedBusinessIndex = _data.Data.SelectedBusinsessIndex;
    var _businessValue = _data.Data.BusValue;

    var _payAmount = _businessValue / 2;

    var _businessMode = "";
    if (_playerData.NoOfBusiness[_SelectedBusinessIndex].BusinessType == 1) _businessMode = "Home Based";else if (_playerData.NoOfBusiness[_SelectedBusinessIndex].BusinessType == 2) _businessMode = "Brick & Mortar";

    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == false) {
      var _msg = "you have received partnership offer by " + _playerData.PlayerName + " , following are the details of business: " + "\n" + "\n" + "Business Name: " + _playerData.NoOfBusiness[_SelectedBusinessIndex].BusinessName + "\n" + "Business Mode: " + _businessMode + "\n" + "Business Value: $" + _businessValue + "\n" + "Cash Payment: $" + _payAmount + "\n" + "\n" + "if offer is accepted you will receive 50% share of that particular business and will receive profit/lose on that particular business.";

      this.EnablePartnershipDecision_PartnerShipSetup(_msg);
    }
  },
  AcceptOffer_PartnershipSetup: function AcceptOffer_PartnershipSetup() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _allActors = GamePlayReferenceManager.Instance.Get_MultiplayerController().RoomActors();

    var _actor = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    var _data = PartnerShipData;
    var _turn = _data.Data.Turn;
    var _playerData = _data.Data.PlayerData;
    var _SelectedBusinessIndex = _data.Data.SelectedBusinsessIndex;
    var _businessValue = _data.Data.BusValue;

    var _payAmount = _businessValue / 2;

    var _businessMode = "";

    var myIndex = _manager.GetMyIndex();

    if (PartnerShipOfferReceived == true) {
      if (_manager.PlayerGameInfo[myIndex].Cash >= _payAmount) {
        _manager.PlayerGameInfo[myIndex].Cash -= _payAmount;
        GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", _manager.PlayerGameInfo[myIndex]);
        this.RaiseEventDecisionAnswer_PartnershipSetup(true, _payAmount, false, _manager.PlayerGameInfo[myIndex].PlayerUID, _manager.PlayerGameInfo[myIndex], _SelectedBusinessIndex);
        this.ToggleDecisionScreen_PartnerShipSetup(false);
        this.ShowToast("congratulations! you have started business partnership", 1800);
      } else {
        this.ShowToast("Not enough cash.", 500);
      }
    } else {
      this.ShowToast("Offer has been accepted by other player.");
      this.ToggleDecisionScreen_PartnerShipSetup(false);
    }
  },
  CancelOffer_PartnershipSetup: function CancelOffer_PartnershipSetup() {
    var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

    var _data = PartnerShipData;
    var _SelectedBusinessIndex = _data.Data.SelectedBusinsessIndex;

    var myIndex = _manager.GetMyIndex();

    console.log(_manager.PlayerGameInfo[myIndex].PlayerUID);

    if (PartnerShipOfferReceived == true) {
      this.RaiseEventDecisionAnswer_PartnershipSetup(false, 0, true, _manager.PlayerGameInfo[myIndex].PlayerUID, _manager.PlayerGameInfo[myIndex], _SelectedBusinessIndex);
      this.ToggleDecisionScreen_PartnerShipSetup(false);
      this.ShowToast("you have cancelled the offer.", 1200);
    } else {
      this.ToggleDecisionScreen_PartnerShipSetup(false);
      this.ShowToast("you have cancelled the offer.", 1200);
    }
  },
  RaiseEventDecisionAnswer_PartnershipSetup: function RaiseEventDecisionAnswer_PartnershipSetup(_isAccepted, _payment, _isCancelled, _uID, _data, _businessIndex) {
    if (_isAccepted === void 0) {
      _isAccepted = false;
    }

    if (_payment === void 0) {
      _payment = 0;
    }

    if (_isCancelled === void 0) {
      _isCancelled = false;
    }

    if (_uID === void 0) {
      _uID = "";
    }

    if (_data === void 0) {
      _data = null;
    }

    if (_businessIndex === void 0) {
      _businessIndex = 0;
    }

    var _mainData = {
      Data: {
        Accepted: _isAccepted,
        CashPayment: _payment,
        Cancelled: _isCancelled,
        PlayerID: _uID,
        PlayerData: _data,
        BusinessIndex: _businessIndex
      }
    };
    GamePlayReferenceManager.Instance.Get_MultiplayerSyncManager().RaiseEvent(12, _mainData);
  },
  ReceiveEventDecisionAnswer_PartnershipSetup: function ReceiveEventDecisionAnswer_PartnershipSetup(_data) {
    if (GamePlayReferenceManager.Instance.Get_MultiplayerController().CheckSpectate() == false) {
      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = _manager.GetTurnNumber();

      console.log(_data);
      var _accepted = _data.Data.Accepted;
      var _cash = _data.Data.CashPayment;
      var _cancelled = _data.Data.Cancelled;
      var _uid = _data.Data.PlayerID;
      var _playerData = _data.Data.PlayerData;
      var _businessIndex = _data.Data.BusinessIndex;
      console.log("answer received");

      if (_manager.PlayerGameInfo[_playerIndex].PlayerUID == GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.Data.userID) {
        if (_accepted) {
          this.ToggleScreen_PartnerShipSetup(false);
          this.ToggleWaitingScreen_PartnerShipSetup(false);
          _manager.PlayerGameInfo[_playerIndex].Cash += _cash;
          _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].IsPartnership = true;
          _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].PartnerID = _uid;
          _manager.PlayerGameInfo[_playerIndex].NoOfBusiness[_businessIndex].PartnerName = _playerData.PlayerName;
          GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().setCustomProperty("PlayerSessionData", _manager.PlayerGameInfo[_playerIndex]);
          console.log("offer accepted");
          this.ShowToast("your partnership offer has been accepted by " + _playerData.PlayerName + ", cash $" + _cash + " has been added to your account.", 2800);
          this.UpdateCash_TurnDecision();
        } else if (_cancelled) {
          if (CancelledID.includes(_uid) == false) CancelledID.push(_uid);
          console.log(CancelledID);

          if (CancelledID.length == _manager.PlayerGameInfo.length - 1) {
            this.ToggleScreen_PartnerShipSetup(false);
            this.ToggleWaitingScreen_PartnerShipSetup(false);
            this.ShowToast("your partnership offer has been cancelled by all other users.", 2800);
          }

          console.log("offer rejected");
        }
      } else {
        if (_accepted) {
          PartnerShipOfferReceived = false;
          this.ShowToast("Offer has been accepted by other player.", 1800);
          this.ToggleDecisionScreen_PartnerShipSetup(false);
        } else if (_cancelled) {}
      }
    }
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
    var _this3 = this;

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
            _this3.ToggleInvestSellScreen_InvestSell(false);
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
            _this3.ToggleInvestSellScreen_InvestSell(false);
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
            _this3.ToggleInvestSellScreen_InvestSell(false);
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
            _this3.ToggleInvestSellScreen_InvestSell(false);
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
  AssignData_PayDay: function AssignData_PayDay(_title, _isDoublePayDay, _skipHM, _skipBM, _isBot) {
    var _this4 = this;

    if (_isDoublePayDay === void 0) {
      _isDoublePayDay = false;
    }

    if (_skipHM === void 0) {
      _skipHM = false;
    }

    if (_skipBM === void 0) {
      _skipBM = false;
    }

    if (_isBot === void 0) {
      _isBot = false;
    }

    this.IsBotTurn = _isBot;
    DoublePayDay = _isDoublePayDay;
    this.TogglePayDayScreen_PayDay(true);
    this.PayDaySetupUI.TitleLabel.string = _title;
    var _time = 1800;

    if (_isBot == false) {
      //check skip payday variables
      if (_skipHM && _skipBM) this.ShowToast("your payday on home based and brick & mortar businessess will be skipped.", _time);else if (_skipHM) this.ShowToast("your payday on home based businessess will be skipped.", _time);else if (_skipBM) this.ShowToast("your payday on brick & mortar businessess will be skipped.", _time);
    } else {
      //check skip payday variables
      if (_skipHM && _skipBM) console.log("your payday on home based and brick & mortar businessess will be skipped.");else if (_skipHM) console.log("your payday on home based businessess will be skipped.");else if (_skipBM) console.log("your payday on brick & mortar businessess will be skipped.");
    }

    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    this.UpdateCash_PayDay(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);

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
        _this4.PayDayCompleted();
      }, _time + 200);
    }

    if (_isBot) {
      this.OnHomeBasedPaymentClicked_PayDay();
      this.OnBMPaymentClicked_PayDay();
      this.OnLoanPaymentClicked_PayDay();
    }
  },
  OnHomeBasedPaymentClicked_PayDay: function OnHomeBasedPaymentClicked_PayDay() {
    if (!HomeBasedPaymentCompleted) {
      this.ToggleResultPanelScreen_PayDay(true);
      if (!DoublePayDay) this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";else this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";
      HomeBasedPaymentCompleted = true;
      this.PayDaySetupUI.HomeBasedBtn.getComponent(cc.Button).interactable = false;

      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var HMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].HomeBasedAmount;

      var _dice = GamePlayReferenceManager.Instance.Get_GameManager().RollOneDice();

      var _tempData = _manager.PlayerGameInfo[_playerIndex].NoOfBusiness;
      var _amountToBeSend = 0;
      var _amountToBeAdjusted = 0;
      var _multiplier = 1; //partnership code

      if (DoublePayDay) _multiplier = 2;

      for (var index = 0; index < _tempData.length; index++) {
        if (_tempData[index].BusinessType == 1) {
          if (_tempData[index].IsPartnership) {
            var _payment = _multiplier * _dice * 1000;

            _amountToBeSend = _payment / 2;

            _manager.SendProfit_Partner_TurnDecision(_amountToBeSend, _tempData[index].PartnerID);

            _amountToBeAdjusted += _amountToBeSend;
          }
        }
      }

      if (_amountToBeAdjusted > 0) {
        this.ShowToast("you have partnership in some business, respective 50% profit of particular business will be shared.", 2000);
      } //partnership code


      if (!DoublePayDay) TotalPayDayAmount = HMAmount * _dice * 1000 - _amountToBeAdjusted;else TotalPayDayAmount = 2 * (HMAmount * _dice) * 1000 - _amountToBeAdjusted;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = HMAmount;
      if (!DoublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = "(" + _dice + "*" + HMAmount + "*" + "1000)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = "(" + _dice + "*" + HMAmount + "*" + "1000*2)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;

      if (this.IsBotTurn) {
        this.ReceivePayment_PayDay();
      }
    }
  },
  OnBMPaymentClicked_PayDay: function OnBMPaymentClicked_PayDay() {
    //brick and mortar
    if (!BrickMortarPaymentCompleted) {
      this.ToggleResultPanelScreen_PayDay(true);
      if (!DoublePayDay) this.PayDaySetupUI.ResultScreenTitleLabel.string = "PayDay";else this.PayDaySetupUI.ResultScreenTitleLabel.string = "DoublePayDay";
      BrickMortarPaymentCompleted = true;
      this.PayDaySetupUI.BMBtn.getComponent(cc.Button).interactable = false;

      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var BMAmount = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].BrickAndMortarAmount;

      var BMLocations = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].TotalLocationsAmount;

      var _amount = BMAmount + BMLocations;

      var _dice = GamePlayReferenceManager.Instance.Get_GameManager().RollTwoDices();

      var _tempData = _manager.PlayerGameInfo[_playerIndex].NoOfBusiness;
      var _amountToBeSend = 0;
      var _amountToBeAdjusted = 0;
      var _multiplier = 1;
      if (DoublePayDay) _multiplier = 2;

      for (var index = 0; index < _tempData.length; index++) {
        if (_tempData[index].BusinessType == 2) {
          if (_tempData[index].IsPartnership) {
            var _locations = _tempData[index].LocationsName.length + 1;

            var _payment = _locations * _multiplier * _dice * 2000;

            _amountToBeSend = _payment / 2;

            _manager.SendProfit_Partner_TurnDecision(_amountToBeSend, _tempData[index].PartnerID);

            _amountToBeAdjusted += _amountToBeSend;
          }
        }
      }

      if (_amountToBeAdjusted > 0) {
        this.ShowToast("you have partnership in some business, respective 50% profit of particular business will be shared.", 2000);
      }

      if (!DoublePayDay) TotalPayDayAmount = _amount * _dice * 2000 - _amountToBeAdjusted;else TotalPayDayAmount = 2 * (_amount * _dice) * 2000 - _amountToBeAdjusted;
      this.PayDaySetupUI.DiceResultLabel.string = _dice;
      this.PayDaySetupUI.TotalBusinessLabel.string = _amount;
      if (!DoublePayDay) this.PayDaySetupUI.TotalAmountLabel.string = "(" + _dice + "*" + _amount + "*" + "2000)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;else this.PayDaySetupUI.TotalAmountLabel.string = "(" + _dice + "*" + _amount + "*" + "2000*2)-" + _amountToBeAdjusted + "=" + TotalPayDayAmount;

      if (this.IsBotTurn) {
        this.ReceivePayment_PayDay();
      }
    }
  },
  OnLoanPaymentClicked_PayDay: function OnLoanPaymentClicked_PayDay() {
    //brick and mortar
    if (!LoanPayed) {
      var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      var _EstimateLoan = 0;
      if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) //if player had skippped loan previously call all amount due
        _EstimateLoan = this.GetLoanAmount_PayDay();else _EstimateLoan = 5000;

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
        this.UpdateCash_PayDay(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);
        this.PayDayCompleted();
      } else {
        var _manager = GamePlayReferenceManager.Instance.Get_GameManager();

        var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

        if (_manager.PlayerGameInfo[_playerIndex].SkippedLoanPayment) this.PayDaySetupUI.SkipLoanButton.getComponent(cc.Button).interactable = false;else this.PayDaySetupUI.SkipLoanButton.getComponent(cc.Button).interactable = true;
        this.PayDaySetupUI.LoanResultPanelNode.active = true;
        console.error("out of money");
      }
    }
  },
  ReceivePayment_PayDay: function ReceivePayment_PayDay() {
    var _this5 = this;

    //all
    var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

    GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash = GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash + TotalPayDayAmount;
    this.UpdateCash_PayDay(GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);

    if (!this.IsBotTurn) {
      this.ShowToast("Amount $" + TotalPayDayAmount + " has been added to your cash amount, Total Cash has become $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash, 1500);
      setTimeout(function () {
        _this5.ToggleResultPanelScreen_PayDay(false);

        _this5.PayDayCompleted();
      }, 1550);
    } else {
      console.log("Amount $" + TotalPayDayAmount + " has been added to your cash amount, Total Cash has become $" + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo[_playerIndex].Cash);
      this.ToggleResultPanelScreen_PayDay(false);
      this.PayDayCompleted();
    }
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
  UpdateCash_PayDay: function UpdateCash_PayDay(_amount) {
    this.PayDaySetupUI.CashLabel.string = "$" + _amount;
  },
  ExitLoanScreen_PayDay: function ExitLoanScreen_PayDay() {
    this.PayDaySetupUI.LoanResultPanelNode.active = false;
  },
  StartNewGame_PayDay: function StartNewGame_PayDay() {
    var _this6 = this;

    //if bankrupted you can start new game
    this.ShowToast("You will lose all progress and start new game from the start.", 3000);
    setTimeout(function () {
      _this6.ExitLoanScreen_PayDay();

      _this6.TogglePayDayScreen_PayDay(false);

      HomeBasedPaymentCompleted = false;
      BrickMortarPaymentCompleted = false;
      LoanPayed = false;
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_Whole(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_HomeBased(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_BrickAndMortar(false);
      GamePlayReferenceManager.Instance.Get_GameManager().TogglePayDay(false, false);
      GamePlayReferenceManager.Instance.Get_GameManager().Bankrupt_TurnDecision();
    }, 3010);
  },
  PayDayCompleted: function PayDayCompleted() {
    if (HomeBasedPaymentCompleted && BrickMortarPaymentCompleted && LoanPayed) {
      var _playerIndex = GamePlayReferenceManager.Instance.Get_GameManager().GetTurnNumber();

      console.log("all payday done");
      this.TogglePayDayScreen_PayDay(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_Whole(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_HomeBased(false);
      GamePlayReferenceManager.Instance.Get_GameManager().ToggleSkipPayDay_BrickAndMortar(false);
      GamePlayReferenceManager.Instance.Get_GameManager().TogglePayDay(false, false);
      GamePlayReferenceManager.Instance.Get_GameManager().callUponCard();
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
      node.getComponent("BusinessDetail").CheckReferences();
      node.getComponent("BusinessDetail").SetName(_tempData.NoOfBusiness[index].BusinessName);
      node.getComponent("BusinessDetail").SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent("BusinessDetail").SetType(_tempData.NoOfBusiness[index].BusinessTypeDescription);
      node.getComponent("BusinessDetail").SetBusinessIndex(index);

      if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 1) {
        node.getComponent("BusinessDetail").SetBusinessMode(1);
        node.getComponent("BusinessDetail").SetMode("Home Based");
      } else if (parseInt(_tempData.NoOfBusiness[index].BusinessType) == 2) {
        node.getComponent("BusinessDetail").SetBusinessMode(2);
        node.getComponent("BusinessDetail").SetMode("Brick & Mortar");
      }

      node.getComponent("BusinessDetail").SetBalance(_tempData.NoOfBusiness[index].Amount);
      node.getComponent("BusinessDetail").SetLocations(_tempData.NoOfBusiness[index].LocationsName.length);
      if (_tempData.NoOfBusiness[index].LocationsName.length == 0) node.getComponent("BusinessDetail").ToggleSellLocationButton(false);else node.getComponent("BusinessDetail").ToggleSellLocationButton(true);
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
  //#region One Question setup Ui
  ToggleDecisionScreen_OneQuestionSetupUI: function ToggleDecisionScreen_OneQuestionSetupUI(_state) {
    this.OneQuestionDecisionScreen.active = _state;
  },
  ToggleSpaceScreen_OneQuestionSetupUI: function ToggleSpaceScreen_OneQuestionSetupUI(_state) {
    this.OneQuestionSpaceScreen.active = _state;
  },
  ToggleWaitingScreen_OneQuestionSetupUI: function ToggleWaitingScreen_OneQuestionSetupUI(_state) {
    this.OneQuestionSetupUI.WaitingScreen.active = _state;
  },
  SetUpSpaceScreen_OneQuestionSetupUI: function SetUpSpaceScreen_OneQuestionSetupUI(_myData, _actorsData, _isTurnOver, _modeIndex) {
    if (_modeIndex === void 0) {
      _modeIndex = 0;
    }

    this.OneQuestionSetupUI.TitleLabel.string = "ONE QUESTION";
    this.OneQuestionSetupUI.CashLabel.string = "$" + _myData.Cash;
    this.OneQuestionSetupUI.PlayerNameLabel.string = _myData.PlayerName;
    this.OneQuestionSetupUI.PlayerDetailLabel.string = "No of Players: " + GamePlayReferenceManager.Instance.Get_GameManager().PlayerGameInfo.length;

    if (_modeIndex == 2) {
      for (var index = 0; index < _actorsData.length; index++) {
        if (_actorsData[index].customProperties.RoomEssentials.IsSpectate == false) {
          //check if player is spectate or not, dont add any spectates
          if (_myData.PlayerUID != _actorsData[index].customProperties.PlayerSessionData.PlayerUID) {
            var node = cc.instantiate(this.OneQuestionSetupUI.DetailsPrefab);
            node.parent = this.OneQuestionSetupUI.ScrollContent;
            node.getComponent("PlayerDetails").setPlayerName(_actorsData[index].customProperties.PlayerSessionData.PlayerName);
            node.getComponent("PlayerDetails").setPlayerUID(_actorsData[index].customProperties.PlayerSessionData.PlayerUID);
            oneQuestionNodes.push(node);
          }
        }
      }
    } else if (_modeIndex == 1) {
      //for bot
      for (var _index = 0; _index < _actorsData.length; _index++) {
        if (_myData.PlayerUID != _actorsData[_index].PlayerUID) {
          var node = cc.instantiate(this.OneQuestionSetupUI.DetailsPrefab);
          node.parent = this.OneQuestionSetupUI.ScrollContent;
          node.getComponent("PlayerDetails").setPlayerName(_actorsData[_index].PlayerName);
          node.getComponent("PlayerDetails").setPlayerUID(_actorsData[_index].PlayerUID);
          oneQuestionNodes.push(node);
        }
      }
    }

    if (_isTurnOver) {
      this.OneQuestionSetupUI.ExitButton.active = false;
      this.OneQuestionSetupUI.TurnOverExitButton.active = true;
    } else {
      this.OneQuestionSetupUI.ExitButton.active = true;
      this.OneQuestionSetupUI.TurnOverExitButton.active = false;
    }
  },
  ResetSpaceScreen_OneQuestionSetupUI: function ResetSpaceScreen_OneQuestionSetupUI() {
    for (var index = 0; index < oneQuestionNodes.length; index++) {
      oneQuestionNodes[index].destroy();
    }

    oneQuestionNodes = [];
  },
  Exit_OneQuestionSetupUI: function Exit_OneQuestionSetupUI() {
    this.ToggleSpaceScreen_OneQuestionSetupUI(false);
  },
  ExitAlongTurnOver_OneQuestionSetupUI: function ExitAlongTurnOver_OneQuestionSetupUI() {
    this.ToggleSpaceScreen_OneQuestionSetupUI(false);
    GamePlayReferenceManager.Instance.Get_GameManager().completeCardTurn();
  },
  SetUpDecisionScreen_OneQuestionSetupUI: function SetUpDecisionScreen_OneQuestionSetupUI(_question) {
    var _myData = GamePlayReferenceManager.Instance.Get_MultiplayerController().PhotonActor().customProperties.PlayerSessionData;
    this.OneQuestionSetupUI.DecisionTitleLabel.string = "ONE QUESTION";
    this.OneQuestionSetupUI.DecisionCashLabel.string = "$" + _myData.Cash;
    this.OneQuestionSetupUI.DecisionPlayerNameLabel.string = _myData.PlayerName;
    this.OneQuestionSetupUI.DecisionQuestionLabel.string = "Player has asked if " + _question + "\n" + "\n" + "*either answer question or pay $5000 to player whose asking question.";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJMb2FuQW1vdW50RW51bSIsImNjIiwiRW51bSIsIk5vbmUiLCJUZW5UaG91c2FuZCIsIlRlbnR5VGhvdXNhbmQiLCJUaGlydHlUaG91c2FuZCIsIkZvcnR5VGhvdXNhbmQiLCJGaWZ0eVRob3VzYW5kIiwiT3RoZXIiLCJCdXNpbmVzc1NldHVwVUkiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZVVJIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiUGxheWVyQ2FzaFVJIiwiQnVzaW5lc3NUeXBlVGV4dFVJIiwiVGV4dCIsIkJ1c2luZXNzTmFtZVRleHRVSSIsIkJ1c2luZXNzVHlwZUxhYmVsIiwiRWRpdEJveCIsIkJ1c2luZXNzTmFtZUxhYmVsIiwiSG9tZUJhc2VkTm9kZVVJIiwiTm9kZSIsIkJyaWNrQW5kTW9ydGFyTm9kZVVJIiwiVGltZXJVSSIsIlRpbWVyTm9kZSIsIkJ1c2luZXNzU2V0dXBOb2RlIiwiTG9hblNldHVwTm9kZSIsIkxvYW5BbW91bnQiLCJMb2FuQW1vdW50TGFiZWwiLCJXYWl0aW5nU3RhdHVzTm9kZSIsIkV4aXRCdXR0b25Ob2RlIiwiY3RvciIsIkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cCIsInN0cmluZyIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJNYXJrZXRpbmdFZGl0Qm94IiwiR29sZEVkaXRCb3giLCJTdG9ja0VkaXRCb3giLCJDYXNoQW1vdW50TGFiZWwiLCJFeHBhbmRCdXNpbmVzc05vZGUiLCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIlByZWZhYiIsIkludmVzdEVudW0iLCJTdG9ja0ludmVzdCIsIkdvbGRJbnZlc3QiLCJTdG9ja1NlbGwiLCJHb2xkU2VsbCIsIkludmVzdFNlbGxVSSIsIlRpdGxlTGFiZWwiLCJEaWNlUmVzdWx0TGFiZWwiLCJQcmljZVRpdGxlTGFiZWwiLCJQcmljZVZhbHVlTGFiZWwiLCJCdXlPclNlbGxUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRWYWx1ZUxhYmVsIiwiQnV0dG9uTmFtZUxhYmVsIiwiSW52ZXN0U3RhdGUiLCJBbW91bnRFZGl0Qm94IiwiU2VsbEJ1c2luZXNzVUkiLCJDYXNoTGFiZWwiLCJQbGF5ZXJOYW1lTGFiZWwiLCJCdXNpbmVzc0NvdW50TGFiZWwiLCJTY3JvbGxDb250ZW50Tm9kZSIsIkJ1c2luZXNzU2VsbFByZWZhYiIsIkV4aXRCdXR0b24iLCJUdXJuT3ZlckV4aXRCdXR0b24iLCJQYXlEYXlVSSIsIkhvbWVCYXNlZE51bWJlckxhYmVsIiwiQk1OdW1iZXJMYWJlbCIsIkJNTnVtYmVyTG9jYXRpb25MYWJlbCIsIkhvbWVCYXNlZEJ0biIsIkJNQnRuIiwiTG9hbkJ0biIsIk1haW5QYW5lbE5vZGUiLCJSZXN1bHRQYW5lbE5vZGUiLCJMb2FuUmVzdWx0UGFuZWxOb2RlIiwiUmVzdWx0U2NyZWVuVGl0bGVMYWJlbCIsIlRvdGFsQnVzaW5lc3NMYWJlbCIsIlRvdGFsQW1vdW50TGFiZWwiLCJTa2lwTG9hbkJ1dHRvbiIsIkxvYW5Gb3R0ZXJMYWJlbCIsIkludmVzdFVJIiwiQnV5T3JTZWxsVUkiLCJPbmVRdWVzdGlvblVJIiwiUGxheWVyRGV0YWlsTGFiZWwiLCJEZXRhaWxzUHJlZmFiIiwiU2Nyb2xsQ29udGVudCIsIldhaXRpbmdTY3JlZW4iLCJEZWNpc2lvblRpdGxlTGFiZWwiLCJEZWNpc2lvbkNhc2hMYWJlbCIsIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsIiwiRGVjaXNpb25RdWVzdGlvbkxhYmVsIiwiUGFydG5lcnNoaXBVSSIsIldhaXRpbmdTdGF0dXNTY3JlZW4iLCJNYWluU2NyZWVuIiwiVGl0bGVOYW1lIiwiUGxheWVyTmFtZSIsIlBsYXllckNhc2giLCJQYXJ0bmVyU2hpcFByZWZhYiIsIkRlY2lzaW9uU2NyZWVuIiwiRGVjaXNpb25QbGF5ZXJOYW1lIiwiRGVjaXNpb25QbGF5ZXJDYXNoIiwiRGVjaXNpb25EZXNjcmlwdGlvbiIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCIsIkJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCIsIkxvYW5QYXllZCIsIlRvdGFsUGF5RGF5QW1vdW50IiwiRG91YmxlUGF5RGF5IiwiR2FtZXBsYXlVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJCdXNpbmVzc1NldHVwRGF0YSIsIkludmVzdFNlbGxTZXR1cFVJIiwiUGF5RGF5U2V0dXBVSSIsIlNlbGxCdXNpbmVzc1NldHVwVUkiLCJJbnZlc3RTZXR1cFVJIiwiQnV5T3JTZWxsU2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2V0dXBVSSIsIlBhcnRuZXJzaGlwU2V0dXBVSSIsIlBvcFVwVUkiLCJHYW1lcGxheVVJU2NyZWVuIiwiSW52ZXN0U2VsbFNjcmVlbiIsIlBheURheVNjcmVlbiIsIlNlbGxCdXNpbmVzc1NjcmVlbiIsIkludmVzdFNjcmVlbiIsIkJ1eU9yU2VsbFNjcmVlbiIsIk9uZVF1ZXN0aW9uU3BhY2VTY3JlZW4iLCJPbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuIiwiVGVtcERpY2VUZXh0IiwiTGVhdmVSb29tQnV0dG9uIiwib25Mb2FkIiwiQ2hlY2tSZWZlcmVuY2VzIiwiR29sZEludmVzdGVkIiwiR29sZFNvbGQiLCJTdG9ja0ludmVzdGVkIiwiU3RvY2tTb2xkIiwiSXNCb3RUdXJuIiwiSXNCYW5rcnVwdGVkIiwiQmFua3J1cHRlZEFtb3VudCIsIlJlc2V0VHVyblZhcmlhYmxlIiwicmVxdWlyZSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlN5bmNEYXRhIiwib25EaXNhYmxlIiwib2ZmIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJhY3RpdmUiLCJDbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJIiwiX3N0YXRlIiwiT25MZWF2ZUJ1dHRvbkNsaWNrZWRfU3BlY3RhdGVNb2RlVUkiLCJJbnN0YW5jZSIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJUb2dnbGVMZWF2ZVJvb21fQm9vbCIsIkRpc2Nvbm5lY3RQaG90b24iLCJzZXRUaW1lb3V0IiwiR2V0X0dhbWVNYW5hZ2VyIiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiaXNGaXJzdFRpbWUiLCJpbnNpZGVHYW1lIiwibW9kZUluZGV4IiwiX2lzQmFua3J1cHRlZCIsIl9CYW5rcnVwdEFtb3VudCIsIkluaXRfQnVzaW5lc3NTZXR1cCIsIlBsYXllckRhdGEiLCJCdXNpbmVzc0luZm8iLCJDYXNoIiwiUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCIsImluZGV4IiwiUGxheWVyR2FtZUluZm8iLCJsZW5ndGgiLCJTdHVkZW50RGF0YSIsInVzZXJJRCIsIlBsYXllclVJRCIsIk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cCIsIk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwIiwiR2V0T2JqX0J1c2luZXNzU2V0dXAiLCJVSUQiLCJPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIk9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzTmFtZSIsImNoaWxkcmVuIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIm5vbmUiLCJPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJIb21lQmFzZWQiLCJPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsImJyaWNrQW5kbW9ydGFyIiwiYW1vdW50IiwiQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiTm9PZkJ1c2luZXNzIiwiTG9hblRha2VuIiwiU2hvd1RvYXN0IiwiTWF0aCIsImFicyIsInBhcnNlSW50IiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiX2RhdGEiLCJfSUQiLCJQaG90b25BY3RvciIsImFjdG9yTnIiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIk1heFBsYXllcnMiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYW1vdW50IiwiX2J1c2luZXNzTmFtZSIsIl9pc0hvbWVCYXNlZCIsIkhvbWVCYXNlZEFtb3VudCIsIlN0YXJ0R2FtZSIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiRXhpdF9CdXNpbmVzc1NldHVwIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJfbW9kZSIsIkdldFNlbGVjdGVkTW9kZSIsIklzQmFua3J1cHQiLCJCYW5rcnVwdEFtb3VudCIsIkdldFR1cm5OdW1iZXIiLCJSYWlzZUV2ZW50IiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc0JvdCIsImlzYWN0aXZlIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJfcGxheWVySW5kZXgiLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCIsIk9uU2VsbEdvbGRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdvbGRDb3VudCIsIk9uU2VsbFN0b2NrQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJTdG9ja0NvdW50IiwiT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uIiwiRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCIsIk9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlJvbGxEaWNlIiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwidmFsdWUiLCJUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJSZXNldF9QYXJ0bmVyU2hpcFNldHVwIiwiX21hbmFnZXIiLCJfdGVtcERhdGEiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJTZXROYW1lIiwiU2V0VHlwZSIsIlNldEJ1c2luZXNzSW5kZXgiLCJfdG90YWxMb2NhdGlvbnMiLCJMb2NhdGlvbnNOYW1lIiwiU2V0QnVzaW5lc3NNb2RlIiwiU2V0TW9kZSIsIlNldEJ1c2luZXNzVmFsdWUiLCJTZXRGaW5hbEJ1c2luZXNzVmFsdWUiLCJfYWxsTG9jYXRpb25zQW1vdW50IiwiX2ZpbmFsQW1vdW50IiwiU2V0QmFsYW5jZSIsIlNldExvY2F0aW9ucyIsIklzUGFydG5lcnNoaXAiLCJUb2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbiIsIlNldFBhcnRuZXJOYW1lIiwiUGFydG5lck5hbWUiLCJFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAiLCJfbXNnIiwiY3VzdG9tUHJvcGVydGllcyIsIlBsYXllclNlc3Npb25EYXRhIiwiRXhpdF9QYXJ0bmVyU2hpcFNldHVwIiwiZGVzdHJveSIsIlJlY2VpdmVFdmVudF9QYXJ0bmVyc2hpcFNldHVwIiwiX2FjdG9yIiwiX3R1cm4iLCJUdXJuIiwiX3BsYXllckRhdGEiLCJfU2VsZWN0ZWRCdXNpbmVzc0luZGV4IiwiU2VsZWN0ZWRCdXNpbnNlc3NJbmRleCIsIl9idXNpbmVzc1ZhbHVlIiwiQnVzVmFsdWUiLCJfcGF5QW1vdW50IiwiX2J1c2luZXNzTW9kZSIsIkNoZWNrU3BlY3RhdGUiLCJBY2NlcHRPZmZlcl9QYXJ0bmVyc2hpcFNldHVwIiwiX2FsbEFjdG9ycyIsIlJvb21BY3RvcnMiLCJteUluZGV4IiwiR2V0TXlJbmRleCIsIlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwIiwiQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9pc0FjY2VwdGVkIiwiX3BheW1lbnQiLCJfaXNDYW5jZWxsZWQiLCJfdUlEIiwiX21haW5EYXRhIiwiQWNjZXB0ZWQiLCJDYXNoUGF5bWVudCIsIkNhbmNlbGxlZCIsIlBsYXllcklEIiwiQnVzaW5lc3NJbmRleCIsIlJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJfYWNjZXB0ZWQiLCJfY2FzaCIsIl9jYW5jZWxsZWQiLCJfdWlkIiwiUGFydG5lcklEIiwiaW5jbHVkZXMiLCJSZXNldEdvbGRJbnB1dCIsIm9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsIiwiVXBkYXRlRGF0YV9JbnZlc3RTZWxsIiwiX3RpdGxlIiwiX2RpY2VSZXN1bHQiLCJfcHJpY2VUaXRsZSIsIl9wcmljZVZhbHVlIiwiX2J1eU9yU2VsbFRpdGxlIiwiX3RvdGFsQW1vdW50VGl0bGUiLCJfdG90YWxBbW91bnRWYWx1ZSIsIl9idXR0b25OYW1lIiwiQXBwbHlCdXR0b25fSW52ZXN0U2VsbCIsIl9Ub3RhbEFtb3VudCIsIkV4aXRCdXR0b25fSW52ZXN0U2VsbCIsIlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkiLCJUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkiLCJVcGRhdGVCdXR0b25zX1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJsb2FuVGFrZW4iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJHZXRMb2FuQW1vdW50X1BheURheSIsIl9sb2FuIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl9pc0JvdCIsIl90aW1lIiwiVXBkYXRlQ2FzaF9QYXlEYXkiLCJCTUxvY2F0aW9ucyIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiU2tpcHBlZExvYW5QYXltZW50IiwiUGF5RGF5Q29tcGxldGVkIiwiT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiX2RpY2UiLCJSb2xsT25lRGljZSIsIl9hbW91bnRUb0JlU2VuZCIsIl9hbW91bnRUb0JlQWRqdXN0ZWQiLCJfbXVsdGlwbGllciIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJSZWNlaXZlUGF5bWVudF9QYXlEYXkiLCJfbG9jYXRpb25zIiwiX0VzdGltYXRlTG9hbiIsIlNraXBMb2FuT25lVGltZV9QYXlEYXkiLCJTZWxsQnVzaW5lc3NfUGF5RGF5IiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRMb2FuU2NyZWVuX1BheURheSIsIlN0YXJ0TmV3R2FtZV9QYXlEYXkiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiVG9nZ2xlUGF5RGF5IiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiY2FsbFVwb25DYXJkIiwiVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwIiwiQW1vdW50IiwiVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uIiwiX2lzVHVybm92ZXIiLCJFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsImNvbXBsZXRlQ2FyZFR1cm4iLCJUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSIsIkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJIiwiU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkiLCJUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSIsIkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJIiwiU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX215RGF0YSIsIl9hY3RvcnNEYXRhIiwiX2lzVHVybk92ZXIiLCJfbW9kZUluZGV4IiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwic2V0UGxheWVyTmFtZSIsInNldFBsYXllclVJRCIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdF9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9xdWVzdGlvbiIsIm1lc3NhZ2UiLCJ0aW1lIiwiU2VsZlRvYXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxJQUFsQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsRUFBMUI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBRyxFQUF2QjtBQUNBLElBQUlDLDhCQUE4QixHQUFHLEVBQXJDO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLElBQXRCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsS0FBL0I7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEIsRUFDQTs7QUFDQSxJQUFJQyxjQUFjLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUUsQ0FEcUI7QUFFM0JDLEVBQUFBLFdBQVcsRUFBRSxLQUZjO0FBRzNCQyxFQUFBQSxhQUFhLEVBQUUsS0FIWTtBQUkzQkMsRUFBQUEsY0FBYyxFQUFFLEtBSlc7QUFLM0JDLEVBQUFBLGFBQWEsRUFBRSxLQUxZO0FBTTNCQyxFQUFBQSxhQUFhLEVBQUUsS0FOWTtBQU8zQkMsRUFBQUEsS0FBSyxFQUFFO0FBUG9CLENBQVIsQ0FBckIsRUFTQTs7QUFDQSxJQUFJQyxlQUFlLEdBQUdULEVBQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQzdCQyxFQUFBQSxJQUFJLEVBQUUsaUJBRHVCO0FBRzdCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1pDLE1BQUFBLFdBQVcsRUFBRSxjQUREO0FBRVpDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGRztBQUdaLGlCQUFTLElBSEc7QUFJWkMsTUFBQUEsWUFBWSxFQUFFLElBSkY7QUFLWkMsTUFBQUEsT0FBTyxFQUFFO0FBTEcsS0FESjtBQVFWQyxJQUFBQSxZQUFZLEVBQUU7QUFDWkwsTUFBQUEsV0FBVyxFQUFFLGNBREQ7QUFFWkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZHO0FBR1osaUJBQVMsSUFIRztBQUlaQyxNQUFBQSxZQUFZLEVBQUUsSUFKRjtBQUtaQyxNQUFBQSxPQUFPLEVBQUU7QUFMRyxLQVJKO0FBZVZFLElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCTixNQUFBQSxXQUFXLEVBQUUsb0JBREs7QUFFbEJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDcUIsSUFGUztBQUdsQixpQkFBUyxFQUhTO0FBSWxCSixNQUFBQSxZQUFZLEVBQUUsS0FKSTtBQUtsQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFMsS0FmVjtBQXNCVkksSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEJSLE1BQUFBLFdBQVcsRUFBRSxvQkFESztBQUVsQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNxQixJQUZTO0FBR2xCLGlCQUFTLEVBSFM7QUFJbEJKLE1BQUFBLFlBQVksRUFBRSxLQUpJO0FBS2xCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUyxLQXRCVjtBQTZCVkssSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJULE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUN3QixPQUZRO0FBR2pCLGlCQUFTLElBSFE7QUFJakJQLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQTdCVDtBQW9DVk8sSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJYLE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUN3QixPQUZRO0FBR2pCLGlCQUFTLElBSFE7QUFJakJQLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQXBDVDtBQTJDVlEsSUFBQUEsZUFBZSxFQUFFO0FBQ2ZaLE1BQUFBLFdBQVcsRUFBRSxpQkFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRk07QUFHZixpQkFBUyxJQUhNO0FBSWZWLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNLEtBM0NQO0FBa0RWVSxJQUFBQSxvQkFBb0IsRUFBRTtBQUNwQmQsTUFBQUEsV0FBVyxFQUFFLHNCQURPO0FBRXBCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRlc7QUFHcEIsaUJBQVMsSUFIVztBQUlwQlYsTUFBQUEsWUFBWSxFQUFFLElBSk07QUFLcEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxXLEtBbERaO0FBeURWVyxJQUFBQSxPQUFPLEVBQUU7QUFDUGYsTUFBQUEsV0FBVyxFQUFFLFNBRE47QUFFUEMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZGO0FBR1AsaUJBQVMsSUFIRjtBQUlQQyxNQUFBQSxZQUFZLEVBQUUsSUFKUDtBQUtQQyxNQUFBQSxPQUFPLEVBQUU7QUFMRixLQXpEQztBQWdFVlksSUFBQUEsU0FBUyxFQUFFO0FBQ1RoQixNQUFBQSxXQUFXLEVBQUUsV0FESjtBQUVUQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRkE7QUFHVCxpQkFBUyxJQUhBO0FBSVRWLE1BQUFBLFlBQVksRUFBRSxJQUpMO0FBS1RDLE1BQUFBLE9BQU8sRUFBRTtBQUxBLEtBaEVEO0FBdUVWYSxJQUFBQSxpQkFBaUIsRUFBRTtBQUNqQmpCLE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZRO0FBR2pCLGlCQUFTLElBSFE7QUFJakJWLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQXZFVDtBQThFVmMsSUFBQUEsYUFBYSxFQUFFO0FBQ2JsQixNQUFBQSxXQUFXLEVBQUUsZUFEQTtBQUViQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRkk7QUFHYixpQkFBUyxJQUhJO0FBSWJWLE1BQUFBLFlBQVksRUFBRSxJQUpEO0FBS2JDLE1BQUFBLE9BQU8sRUFBRTtBQUxJLEtBOUVMO0FBcUZWZSxJQUFBQSxVQUFVLEVBQUU7QUFDVm5CLE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRWhCLGNBRkk7QUFHVixpQkFBU0EsY0FBYyxDQUFDRyxJQUhkO0FBSVZlLE1BQUFBLFlBQVksRUFBRSxJQUpKO0FBS1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxDLEtBckZGO0FBNEZWZ0IsSUFBQUEsZUFBZSxFQUFFO0FBQ2ZwQixNQUFBQSxXQUFXLEVBQUUsaUJBREU7QUFFZkMsTUFBQUEsSUFBSSxFQUFFLENBQUNmLEVBQUUsQ0FBQzJCLElBQUosQ0FGUztBQUdmLGlCQUFTLEVBSE07QUFJZlYsTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0E1RlA7QUFtR1ZpQixJQUFBQSxpQkFBaUIsRUFBRTtBQUNqQnJCLE1BQUFBLFdBQVcsRUFBRSxtQkFESTtBQUVqQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZRO0FBR2pCLGlCQUFTLElBSFE7QUFJakJWLE1BQUFBLFlBQVksRUFBRSxJQUpHO0FBS2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUSxLQW5HVDtBQTBHVmtCLElBQUFBLGNBQWMsRUFBRTtBQUNkdEIsTUFBQUEsV0FBVyxFQUFFLGdCQURDO0FBRWRDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGSztBQUdkLGlCQUFTLElBSEs7QUFJZFYsTUFBQUEsWUFBWSxFQUFFLElBSkE7QUFLZEMsTUFBQUEsT0FBTyxFQUFFO0FBTEs7QUExR04sR0FIaUI7QUFxSDdCbUIsRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQ2hCO0FBQ0QsR0F2SDRCO0FBeUg3QkMsRUFBQUEsd0JBQXdCLEVBQUUsa0NBQVUzQixJQUFWLEVBQWdCO0FBQ3hDLFNBQUtFLFlBQUwsQ0FBa0IwQixNQUFsQixHQUEyQjVCLElBQTNCO0FBQ0Q7QUEzSDRCLENBQVQsQ0FBdEIsRUE4SEE7O0FBQ0EsSUFBSTZCLG1CQUFtQixHQUFHeEMsRUFBRSxDQUFDVSxLQUFILENBQVM7QUFDakNDLEVBQUFBLElBQUksRUFBRSxxQkFEMkI7QUFHakNDLEVBQUFBLFVBQVUsRUFBRTtBQUNWNkIsSUFBQUEsZ0JBQWdCLEVBQUU7QUFDaEIzQixNQUFBQSxXQUFXLEVBQUUsa0JBREc7QUFFaEJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDd0IsT0FGTztBQUdoQixpQkFBUyxJQUhPO0FBSWhCUCxNQUFBQSxZQUFZLEVBQUUsSUFKRTtBQUtoQkMsTUFBQUEsT0FBTyxFQUFFO0FBTE8sS0FEUjtBQVFWd0IsSUFBQUEsV0FBVyxFQUFFO0FBQ1g1QixNQUFBQSxXQUFXLEVBQUUsYUFERjtBQUVYQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ3dCLE9BRkU7QUFHWCxpQkFBUyxJQUhFO0FBSVhQLE1BQUFBLFlBQVksRUFBRSxJQUpIO0FBS1hDLE1BQUFBLE9BQU8sRUFBRTtBQUxFLEtBUkg7QUFlVnlCLElBQUFBLFlBQVksRUFBRTtBQUNaN0IsTUFBQUEsV0FBVyxFQUFFLGNBREQ7QUFFWkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUN3QixPQUZHO0FBR1osaUJBQVMsSUFIRztBQUlaUCxNQUFBQSxZQUFZLEVBQUUsSUFKRjtBQUtaQyxNQUFBQSxPQUFPLEVBQUU7QUFMRyxLQWZKO0FBc0JWMEIsSUFBQUEsZUFBZSxFQUFFO0FBQ2Y5QixNQUFBQSxXQUFXLEVBQUUsTUFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRk07QUFHZixpQkFBUyxJQUhNO0FBSWZDLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNLEtBdEJQO0FBNkJWMkIsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEIvQixNQUFBQSxXQUFXLEVBQUUsb0JBREs7QUFFbEJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGUztBQUdsQixpQkFBUyxJQUhTO0FBSWxCVixNQUFBQSxZQUFZLEVBQUUsSUFKSTtBQUtsQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFMsS0E3QlY7QUFvQ1Y0QixJQUFBQSwyQkFBMkIsRUFBRTtBQUMzQmhDLE1BQUFBLFdBQVcsRUFBRSw2QkFEYztBQUUzQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZrQjtBQUczQixpQkFBUyxJQUhrQjtBQUkzQlYsTUFBQUEsWUFBWSxFQUFFLElBSmE7QUFLM0JDLE1BQUFBLE9BQU8sRUFDTDtBQU55QixLQXBDbkI7QUE0Q1Y2QixJQUFBQSxvQkFBb0IsRUFBRTtBQUNwQmpDLE1BQUFBLFdBQVcsRUFBRSxzQkFETztBQUVwQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnRCxNQUZXO0FBR3BCLGlCQUFTLElBSFc7QUFJcEIvQixNQUFBQSxZQUFZLEVBQUUsSUFKTTtBQUtwQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFc7QUE1Q1osR0FIcUI7QUF1RGpDbUIsRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQ2hCO0FBQ0QsR0F6RGdDO0FBMkRqQ0MsRUFBQUEsd0JBQXdCLEVBQUUsa0NBQVUzQixJQUFWLEVBQWdCO0FBQ3hDLFNBQUtFLFlBQUwsQ0FBa0IwQixNQUFsQixHQUEyQjVCLElBQTNCO0FBQ0Q7QUE3RGdDLENBQVQsQ0FBMUIsRUFnRUE7O0FBQ0EsSUFBSXNDLFVBQVUsR0FBR2pELEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3ZCQyxFQUFBQSxJQUFJLEVBQUUsQ0FEaUI7QUFFdkJnRCxFQUFBQSxXQUFXLEVBQUUsQ0FGVTtBQUd2QkMsRUFBQUEsVUFBVSxFQUFFLENBSFc7QUFJdkJDLEVBQUFBLFNBQVMsRUFBRSxDQUpZO0FBS3ZCQyxFQUFBQSxRQUFRLEVBQUUsQ0FMYTtBQU12QjdDLEVBQUFBLEtBQUssRUFBRTtBQU5nQixDQUFSLENBQWpCLEVBU0E7O0FBQ0EsSUFBSThDLFlBQVksR0FBR3RELEVBQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQzFCQyxFQUFBQSxJQUFJLEVBQUUsY0FEb0I7QUFFMUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWMkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1Z6QyxNQUFBQSxXQUFXLEVBQUUsT0FESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkM7QUFHVixpQkFBUyxJQUhDO0FBSVZDLE1BQUFBLFlBQVksRUFBRSxJQUpKO0FBS1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxDLEtBREY7QUFRVnNDLElBQUFBLGVBQWUsRUFBRTtBQUNmMUMsTUFBQUEsV0FBVyxFQUFFLFlBREU7QUFFZkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZNO0FBR2YsaUJBQVMsSUFITTtBQUlmQyxNQUFBQSxZQUFZLEVBQUUsSUFKQztBQUtmQyxNQUFBQSxPQUFPLEVBQUU7QUFMTSxLQVJQO0FBZVZ1QyxJQUFBQSxlQUFlLEVBQUU7QUFDZjNDLE1BQUFBLFdBQVcsRUFBRSxZQURFO0FBRWZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGTTtBQUdmLGlCQUFTLElBSE07QUFJZkMsTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0FmUDtBQXNCVndDLElBQUFBLGVBQWUsRUFBRTtBQUNmNUMsTUFBQUEsV0FBVyxFQUFFLFlBREU7QUFFZkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZNO0FBR2YsaUJBQVMsSUFITTtBQUlmQyxNQUFBQSxZQUFZLEVBQUUsSUFKQztBQUtmQyxNQUFBQSxPQUFPLEVBQUU7QUFMTSxLQXRCUDtBQTZCVnlDLElBQUFBLG1CQUFtQixFQUFFO0FBQ25CN0MsTUFBQUEsV0FBVyxFQUFFLGdCQURNO0FBRW5CQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlU7QUFHbkIsaUJBQVMsSUFIVTtBQUluQkMsTUFBQUEsWUFBWSxFQUFFLElBSks7QUFLbkJDLE1BQUFBLE9BQU8sRUFDTDtBQU5pQixLQTdCWDtBQXFDVjBDLElBQUFBLHFCQUFxQixFQUFFO0FBQ3JCOUMsTUFBQUEsV0FBVyxFQUFFLGtCQURRO0FBRXJCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlk7QUFHckIsaUJBQVMsSUFIWTtBQUlyQkMsTUFBQUEsWUFBWSxFQUFFLElBSk87QUFLckJDLE1BQUFBLE9BQU8sRUFDTDtBQU5tQixLQXJDYjtBQTZDVjJDLElBQUFBLHFCQUFxQixFQUFFO0FBQ3JCL0MsTUFBQUEsV0FBVyxFQUFFLGtCQURRO0FBRXJCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlk7QUFHckIsaUJBQVMsSUFIWTtBQUlyQkMsTUFBQUEsWUFBWSxFQUFFLElBSk87QUFLckJDLE1BQUFBLE9BQU8sRUFDTDtBQU5tQixLQTdDYjtBQXFEVjRDLElBQUFBLGVBQWUsRUFBRTtBQUNmaEQsTUFBQUEsV0FBVyxFQUFFLFlBREU7QUFFZkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZNO0FBR2YsaUJBQVMsSUFITTtBQUlmQyxNQUFBQSxZQUFZLEVBQUUsSUFKQztBQUtmQyxNQUFBQSxPQUFPLEVBQUU7QUFMTSxLQXJEUDtBQTREVjZDLElBQUFBLFdBQVcsRUFBRTtBQUNYakQsTUFBQUEsV0FBVyxFQUFFLGFBREY7QUFFWEMsTUFBQUEsSUFBSSxFQUFFa0MsVUFGSztBQUdYLGlCQUFTQSxVQUFVLENBQUMvQyxJQUhUO0FBSVhlLE1BQUFBLFlBQVksRUFBRTtBQUpILEtBNURIO0FBa0VWK0MsSUFBQUEsYUFBYSxFQUFFO0FBQ2JsRCxNQUFBQSxXQUFXLEVBQUUsZUFEQTtBQUViQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ3dCLE9BRkk7QUFHYixpQkFBUyxJQUhJO0FBSWJQLE1BQUFBLFlBQVksRUFBRTtBQUpEO0FBbEVMLEdBRmM7QUEyRTFCb0IsRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQ2hCO0FBQ0Q7QUE3RXlCLENBQVQsQ0FBbkIsRUFnRkE7O0FBQ0EsSUFBSTRCLGNBQWMsR0FBR2pFLEVBQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQzVCQyxFQUFBQSxJQUFJLEVBQUUsZ0JBRHNCO0FBRTVCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVjJDLElBQUFBLFVBQVUsRUFBRTtBQUNWekMsTUFBQUEsV0FBVyxFQUFFLE9BREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZDO0FBR1YsaUJBQVMsSUFIQztBQUlWQyxNQUFBQSxZQUFZLEVBQUUsSUFKSjtBQUtWQyxNQUFBQSxPQUFPLEVBQUU7QUFMQyxLQURGO0FBUVZnRCxJQUFBQSxTQUFTLEVBQUU7QUFDVHBELE1BQUFBLFdBQVcsRUFBRSxXQURKO0FBRVRDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGQTtBQUdULGlCQUFTLElBSEE7QUFJVEMsTUFBQUEsWUFBWSxFQUFFLElBSkw7QUFLVEMsTUFBQUEsT0FBTyxFQUFFO0FBTEEsS0FSRDtBQWVWaUQsSUFBQUEsZUFBZSxFQUFFO0FBQ2ZyRCxNQUFBQSxXQUFXLEVBQUUsaUJBREU7QUFFZkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZNO0FBR2YsaUJBQVMsSUFITTtBQUlmQyxNQUFBQSxZQUFZLEVBQUUsSUFKQztBQUtmQyxNQUFBQSxPQUFPLEVBQUU7QUFMTSxLQWZQO0FBc0JWa0QsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEJ0RCxNQUFBQSxXQUFXLEVBQUUsZUFESztBQUVsQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZTO0FBR2xCLGlCQUFTLElBSFM7QUFJbEJDLE1BQUFBLFlBQVksRUFBRSxJQUpJO0FBS2xCQyxNQUFBQSxPQUFPLEVBQUU7QUFMUyxLQXRCVjtBQTZCVm1ELElBQUFBLGlCQUFpQixFQUFFO0FBQ2pCdkQsTUFBQUEsV0FBVyxFQUFFLG1CQURJO0FBRWpCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRlE7QUFHakIsaUJBQVMsSUFIUTtBQUlqQlYsTUFBQUEsWUFBWSxFQUFFLElBSkc7QUFLakJDLE1BQUFBLE9BQU8sRUFBRTtBQUxRLEtBN0JUO0FBb0NWb0QsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEJ4RCxNQUFBQSxXQUFXLEVBQUUsb0JBREs7QUFFbEJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0QsTUFGUztBQUdsQixpQkFBUyxJQUhTO0FBSWxCL0IsTUFBQUEsWUFBWSxFQUFFLElBSkk7QUFLbEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxTLEtBcENWO0FBMkNWcUQsSUFBQUEsVUFBVSxFQUFFO0FBQ1Z6RCxNQUFBQSxXQUFXLEVBQUUsWUFESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRkM7QUFHVixpQkFBUyxJQUhDO0FBSVZWLE1BQUFBLFlBQVksRUFBRSxJQUpKO0FBS1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxDLEtBM0NGO0FBa0RWc0QsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEIxRCxNQUFBQSxXQUFXLEVBQUUsb0JBREs7QUFFbEJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGUztBQUdsQixpQkFBUyxJQUhTO0FBSWxCVixNQUFBQSxZQUFZLEVBQUUsSUFKSTtBQUtsQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFM7QUFsRFYsR0FGZ0I7QUE0RDVCbUIsRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQ2hCO0FBQ0Q7QUE5RDJCLENBQVQsQ0FBckIsRUFpRUE7O0FBQ0EsSUFBSW9DLFFBQVEsR0FBR3pFLEVBQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsVUFEZ0I7QUFFdEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWMkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1Z6QyxNQUFBQSxXQUFXLEVBQUUsT0FESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkM7QUFHVixpQkFBUyxJQUhDO0FBSVZDLE1BQUFBLFlBQVksRUFBRSxJQUpKO0FBS1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxDLEtBREY7QUFRVmdELElBQUFBLFNBQVMsRUFBRTtBQUNUcEQsTUFBQUEsV0FBVyxFQUFFLE1BREo7QUFFVEMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZBO0FBR1QsaUJBQVMsSUFIQTtBQUlUQyxNQUFBQSxZQUFZLEVBQUUsSUFKTDtBQUtUQyxNQUFBQSxPQUFPLEVBQUU7QUFMQSxLQVJEO0FBZVZ3RCxJQUFBQSxvQkFBb0IsRUFBRTtBQUNwQjVELE1BQUFBLFdBQVcsRUFBRSxpQkFETztBQUVwQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZXO0FBR3BCLGlCQUFTLElBSFc7QUFJcEJDLE1BQUFBLFlBQVksRUFBRSxJQUpNO0FBS3BCQyxNQUFBQSxPQUFPLEVBQUU7QUFMVyxLQWZaO0FBc0JWeUQsSUFBQUEsYUFBYSxFQUFFO0FBQ2I3RCxNQUFBQSxXQUFXLEVBQUUsbUJBREE7QUFFYkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZJO0FBR2IsaUJBQVMsSUFISTtBQUliQyxNQUFBQSxZQUFZLEVBQUUsSUFKRDtBQUtiQyxNQUFBQSxPQUFPLEVBQUU7QUFMSSxLQXRCTDtBQTZCVjBELElBQUFBLHFCQUFxQixFQUFFO0FBQ3JCOUQsTUFBQUEsV0FBVyxFQUFFLHNCQURRO0FBRXJCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlk7QUFHckIsaUJBQVMsSUFIWTtBQUlyQkMsTUFBQUEsWUFBWSxFQUFFLElBSk87QUFLckJDLE1BQUFBLE9BQU8sRUFBRTtBQUxZLEtBN0JiO0FBb0NWMkQsSUFBQUEsWUFBWSxFQUFFO0FBQ1ovRCxNQUFBQSxXQUFXLEVBQUUsY0FERDtBQUVaQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRkc7QUFHWixpQkFBUyxJQUhHO0FBSVpWLE1BQUFBLFlBQVksRUFBRSxJQUpGO0FBS1pDLE1BQUFBLE9BQU8sRUFBRTtBQUxHLEtBcENKO0FBMkNWNEQsSUFBQUEsS0FBSyxFQUFFO0FBQ0xoRSxNQUFBQSxXQUFXLEVBQUUsZ0JBRFI7QUFFTEMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZKO0FBR0wsaUJBQVMsSUFISjtBQUlMVixNQUFBQSxZQUFZLEVBQUUsSUFKVDtBQUtMQyxNQUFBQSxPQUFPLEVBQUU7QUFMSixLQTNDRztBQWtEVjZELElBQUFBLE9BQU8sRUFBRTtBQUNQakUsTUFBQUEsV0FBVyxFQUFFLFNBRE47QUFFUEMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZGO0FBR1AsaUJBQVMsSUFIRjtBQUlQVixNQUFBQSxZQUFZLEVBQUUsSUFKUDtBQUtQQyxNQUFBQSxPQUFPLEVBQUU7QUFMRixLQWxEQztBQXlEVjhELElBQUFBLGFBQWEsRUFBRTtBQUNibEUsTUFBQUEsV0FBVyxFQUFFLGVBREE7QUFFYkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZJO0FBR2IsaUJBQVMsSUFISTtBQUliVixNQUFBQSxZQUFZLEVBQUUsSUFKRDtBQUtiQyxNQUFBQSxPQUFPLEVBQUU7QUFMSSxLQXpETDtBQWdFVitELElBQUFBLGVBQWUsRUFBRTtBQUNmbkUsTUFBQUEsV0FBVyxFQUFFLGlCQURFO0FBRWZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGTTtBQUdmLGlCQUFTLElBSE07QUFJZlYsTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0FoRVA7QUF1RVZnRSxJQUFBQSxtQkFBbUIsRUFBRTtBQUNuQnBFLE1BQUFBLFdBQVcsRUFBRSxxQkFETTtBQUVuQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZVO0FBR25CLGlCQUFTLElBSFU7QUFJbkJWLE1BQUFBLFlBQVksRUFBRSxJQUpLO0FBS25CQyxNQUFBQSxPQUFPLEVBQUU7QUFMVSxLQXZFWDtBQThFVmlFLElBQUFBLHNCQUFzQixFQUFFO0FBQ3RCckUsTUFBQUEsV0FBVyxFQUFFLG1CQURTO0FBRXRCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRmE7QUFHdEIsaUJBQVMsSUFIYTtBQUl0QkMsTUFBQUEsWUFBWSxFQUFFLElBSlE7QUFLdEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxhLEtBOUVkO0FBcUZWc0MsSUFBQUEsZUFBZSxFQUFFO0FBQ2YxQyxNQUFBQSxXQUFXLEVBQUUsWUFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRk07QUFHZixpQkFBUyxJQUhNO0FBSWZDLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNLEtBckZQO0FBNEZWa0UsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEJ0RSxNQUFBQSxXQUFXLEVBQUUsb0JBREs7QUFFbEJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGUztBQUdsQixpQkFBUyxJQUhTO0FBSWxCQyxNQUFBQSxZQUFZLEVBQUUsSUFKSTtBQUtsQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFMsS0E1RlY7QUFtR1ZtRSxJQUFBQSxnQkFBZ0IsRUFBRTtBQUNoQnZFLE1BQUFBLFdBQVcsRUFBRSxrQkFERztBQUVoQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZPO0FBR2hCLGlCQUFTLElBSE87QUFJaEJDLE1BQUFBLFlBQVksRUFBRSxJQUpFO0FBS2hCQyxNQUFBQSxPQUFPLEVBQUU7QUFMTyxLQW5HUjtBQTBHVm9FLElBQUFBLGNBQWMsRUFBRTtBQUNkeEUsTUFBQUEsV0FBVyxFQUFFLGdCQURDO0FBRWRDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGSztBQUdkLGlCQUFTLElBSEs7QUFJZFYsTUFBQUEsWUFBWSxFQUFFLElBSkE7QUFLZEMsTUFBQUEsT0FBTyxFQUFFO0FBTEssS0ExR047QUFpSFZxRSxJQUFBQSxlQUFlLEVBQUU7QUFDZnpFLE1BQUFBLFdBQVcsRUFBRSxpQkFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRk07QUFHZixpQkFBUyxJQUhNO0FBSWZDLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNO0FBakhQLEdBRlU7QUEySHRCbUIsRUFBQUEsSUFBSSxFQUFFLGdCQUFZLENBQ2hCO0FBQ0Q7QUE3SHFCLENBQVQsQ0FBZixFQWdJQTs7QUFDQSxJQUFJbUQsUUFBUSxHQUFHeEYsRUFBRSxDQUFDVSxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBRSxVQURnQjtBQUV0QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1YyQyxJQUFBQSxVQUFVLEVBQUU7QUFDVnpDLE1BQUFBLFdBQVcsRUFBRSxPQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGQztBQUdWLGlCQUFTLElBSEM7QUFJVkMsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0FERjtBQVFWZ0QsSUFBQUEsU0FBUyxFQUFFO0FBQ1RwRCxNQUFBQSxXQUFXLEVBQUUsV0FESjtBQUVUQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkE7QUFHVCxpQkFBUyxJQUhBO0FBSVRDLE1BQUFBLFlBQVksRUFBRSxJQUpMO0FBS1RDLE1BQUFBLE9BQU8sRUFBRTtBQUxBLEtBUkQ7QUFlVmlELElBQUFBLGVBQWUsRUFBRTtBQUNmckQsTUFBQUEsV0FBVyxFQUFFLGlCQURFO0FBRWZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGTTtBQUdmLGlCQUFTLElBSE07QUFJZkMsTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0FmUDtBQXNCVnFELElBQUFBLFVBQVUsRUFBRTtBQUNWekQsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZDO0FBR1YsaUJBQVMsSUFIQztBQUlWVixNQUFBQSxZQUFZLEVBQUUsSUFKSjtBQUtWQyxNQUFBQSxPQUFPLEVBQUU7QUFMQyxLQXRCRjtBQTZCVnNELElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCMUQsTUFBQUEsV0FBVyxFQUFFLG9CQURLO0FBRWxCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRlM7QUFHbEIsaUJBQVMsSUFIUztBQUlsQlYsTUFBQUEsWUFBWSxFQUFFLElBSkk7QUFLbEJDLE1BQUFBLE9BQU8sRUFDTDtBQU5nQjtBQTdCVixHQUZVO0FBd0N0Qm1CLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBMUNxQixDQUFULENBQWYsRUE2Q0E7O0FBQ0EsSUFBSW9ELFdBQVcsR0FBR3pGLEVBQUUsQ0FBQ1UsS0FBSCxDQUFTO0FBQ3pCQyxFQUFBQSxJQUFJLEVBQUUsYUFEbUI7QUFFekJDLEVBQUFBLFVBQVUsRUFBRTtBQUNWMkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1Z6QyxNQUFBQSxXQUFXLEVBQUUsT0FESDtBQUVWQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkM7QUFHVixpQkFBUyxJQUhDO0FBSVZDLE1BQUFBLFlBQVksRUFBRSxJQUpKO0FBS1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxDLEtBREY7QUFRVmdELElBQUFBLFNBQVMsRUFBRTtBQUNUcEQsTUFBQUEsV0FBVyxFQUFFLFdBREo7QUFFVEMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZBO0FBR1QsaUJBQVMsSUFIQTtBQUlUQyxNQUFBQSxZQUFZLEVBQUUsSUFKTDtBQUtUQyxNQUFBQSxPQUFPLEVBQUU7QUFMQSxLQVJEO0FBZVZpRCxJQUFBQSxlQUFlLEVBQUU7QUFDZnJELE1BQUFBLFdBQVcsRUFBRSxpQkFERTtBQUVmQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRk07QUFHZixpQkFBUyxJQUhNO0FBSWZDLE1BQUFBLFlBQVksRUFBRSxJQUpDO0FBS2ZDLE1BQUFBLE9BQU8sRUFBRTtBQUxNLEtBZlA7QUFzQlZxRCxJQUFBQSxVQUFVLEVBQUU7QUFDVnpELE1BQUFBLFdBQVcsRUFBRSxZQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGQztBQUdWLGlCQUFTLElBSEM7QUFJVlYsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0F0QkY7QUE2QlZzRCxJQUFBQSxrQkFBa0IsRUFBRTtBQUNsQjFELE1BQUFBLFdBQVcsRUFBRSxvQkFESztBQUVsQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZTO0FBR2xCLGlCQUFTLElBSFM7QUFJbEJWLE1BQUFBLFlBQVksRUFBRSxJQUpJO0FBS2xCQyxNQUFBQSxPQUFPLEVBQ0w7QUFOZ0I7QUE3QlYsR0FGYTtBQXdDekJtQixFQUFBQSxJQUFJLEVBQUUsZ0JBQVksQ0FDaEI7QUFDRDtBQTFDd0IsQ0FBVCxDQUFsQixFQTZDQTs7QUFDQSxJQUFJcUQsYUFBYSxHQUFHMUYsRUFBRSxDQUFDVSxLQUFILENBQVM7QUFDM0JDLEVBQUFBLElBQUksRUFBRSxlQURxQjtBQUUzQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1YyQyxJQUFBQSxVQUFVLEVBQUU7QUFDVnpDLE1BQUFBLFdBQVcsRUFBRSxPQURIO0FBRVZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGQztBQUdWLGlCQUFTLElBSEM7QUFJVkMsTUFBQUEsWUFBWSxFQUFFLElBSko7QUFLVkMsTUFBQUEsT0FBTyxFQUFFO0FBTEMsS0FERjtBQVFWZ0QsSUFBQUEsU0FBUyxFQUFFO0FBQ1RwRCxNQUFBQSxXQUFXLEVBQUUsV0FESjtBQUVUQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRkE7QUFHVCxpQkFBUyxJQUhBO0FBSVRDLE1BQUFBLFlBQVksRUFBRSxJQUpMO0FBS1RDLE1BQUFBLE9BQU8sRUFBRTtBQUxBLEtBUkQ7QUFlVmlELElBQUFBLGVBQWUsRUFBRTtBQUNmckQsTUFBQUEsV0FBVyxFQUFFLGlCQURFO0FBRWZDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGTTtBQUdmLGlCQUFTLElBSE07QUFJZkMsTUFBQUEsWUFBWSxFQUFFLElBSkM7QUFLZkMsTUFBQUEsT0FBTyxFQUFFO0FBTE0sS0FmUDtBQXNCVnFELElBQUFBLFVBQVUsRUFBRTtBQUNWekQsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZDO0FBR1YsaUJBQVMsSUFIQztBQUlWVixNQUFBQSxZQUFZLEVBQUUsSUFKSjtBQUtWQyxNQUFBQSxPQUFPLEVBQUU7QUFMQyxLQXRCRjtBQTZCVnNELElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCMUQsTUFBQUEsV0FBVyxFQUFFLG9CQURLO0FBRWxCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRlM7QUFHbEIsaUJBQVMsSUFIUztBQUlsQlYsTUFBQUEsWUFBWSxFQUFFLElBSkk7QUFLbEJDLE1BQUFBLE9BQU8sRUFDTDtBQU5nQixLQTdCVjtBQXFDVnlFLElBQUFBLGlCQUFpQixFQUFFO0FBQ2pCN0UsTUFBQUEsV0FBVyxFQUFFLG1CQURJO0FBRWpCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlE7QUFHakIsaUJBQVMsSUFIUTtBQUlqQkMsTUFBQUEsWUFBWSxFQUFFLElBSkc7QUFLakJDLE1BQUFBLE9BQU8sRUFBRTtBQUxRLEtBckNUO0FBNENWMEUsSUFBQUEsYUFBYSxFQUFFO0FBQ2I5RSxNQUFBQSxXQUFXLEVBQUUsZUFEQTtBQUViQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dELE1BRkk7QUFHYixpQkFBUyxJQUhJO0FBSWIvQixNQUFBQSxZQUFZLEVBQUUsSUFKRDtBQUtiQyxNQUFBQSxPQUFPLEVBQUU7QUFMSSxLQTVDTDtBQW1EVjJFLElBQUFBLGFBQWEsRUFBRTtBQUNiL0UsTUFBQUEsV0FBVyxFQUFFLGVBREE7QUFFYkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZJO0FBR2IsaUJBQVMsSUFISTtBQUliVixNQUFBQSxZQUFZLEVBQUUsSUFKRDtBQUtiQyxNQUFBQSxPQUFPLEVBQUU7QUFMSSxLQW5ETDtBQTBEVjRFLElBQUFBLGFBQWEsRUFBRTtBQUNiaEYsTUFBQUEsV0FBVyxFQUFFLGVBREE7QUFFYkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZJO0FBR2IsaUJBQVMsSUFISTtBQUliVixNQUFBQSxZQUFZLEVBQUUsSUFKRDtBQUtiQyxNQUFBQSxPQUFPLEVBQUU7QUFMSSxLQTFETDtBQWlFVjZFLElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCakYsTUFBQUEsV0FBVyxFQUFFLG9CQURLO0FBRWxCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlM7QUFHbEIsaUJBQVMsSUFIUztBQUlsQkMsTUFBQUEsWUFBWSxFQUFFLElBSkk7QUFLbEJDLE1BQUFBLE9BQU8sRUFBRTtBQUxTLEtBakVWO0FBd0VWOEUsSUFBQUEsaUJBQWlCLEVBQUU7QUFDakJsRixNQUFBQSxXQUFXLEVBQUUsbUJBREk7QUFFakJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGUTtBQUdqQixpQkFBUyxJQUhRO0FBSWpCQyxNQUFBQSxZQUFZLEVBQUUsSUFKRztBQUtqQkMsTUFBQUEsT0FBTyxFQUFFO0FBTFEsS0F4RVQ7QUErRVYrRSxJQUFBQSx1QkFBdUIsRUFBRTtBQUN2Qm5GLE1BQUFBLFdBQVcsRUFBRSx5QkFEVTtBQUV2QkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZjO0FBR3ZCLGlCQUFTLElBSGM7QUFJdkJDLE1BQUFBLFlBQVksRUFBRSxJQUpTO0FBS3ZCQyxNQUFBQSxPQUFPLEVBQUU7QUFMYyxLQS9FZjtBQXNGVmdGLElBQUFBLHFCQUFxQixFQUFFO0FBQ3JCcEYsTUFBQUEsV0FBVyxFQUFFLHVCQURRO0FBRXJCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlk7QUFHckIsaUJBQVMsSUFIWTtBQUlyQkMsTUFBQUEsWUFBWSxFQUFFLElBSk87QUFLckJDLE1BQUFBLE9BQU8sRUFDTDtBQU5tQjtBQXRGYixHQUZlO0FBaUczQm1CLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBbkcwQixDQUFULENBQXBCLEVBc0dBOztBQUNBLElBQUk4RCxhQUFhLEdBQUduRyxFQUFFLENBQUNVLEtBQUgsQ0FBUztBQUMzQkMsRUFBQUEsSUFBSSxFQUFFLGVBRHFCO0FBRTNCQyxFQUFBQSxVQUFVLEVBQUU7QUFDVndGLElBQUFBLG1CQUFtQixFQUFFO0FBQ25CdEYsTUFBQUEsV0FBVyxFQUFFLHFCQURNO0FBRW5CQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRlU7QUFHbkIsaUJBQVMsSUFIVTtBQUluQlYsTUFBQUEsWUFBWSxFQUFFLElBSks7QUFLbkJDLE1BQUFBLE9BQU8sRUFBRTtBQUxVLEtBRFg7QUFRVm1GLElBQUFBLFVBQVUsRUFBRTtBQUNWdkYsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZDO0FBR1YsaUJBQVMsSUFIQztBQUlWVixNQUFBQSxZQUFZLEVBQUU7QUFKSixLQVJGO0FBY1ZxRixJQUFBQSxTQUFTLEVBQUU7QUFDVHhGLE1BQUFBLFdBQVcsRUFBRSxXQURKO0FBRVRDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGQTtBQUdULGlCQUFTLElBSEE7QUFJVEMsTUFBQUEsWUFBWSxFQUFFO0FBSkwsS0FkRDtBQW9CVnNGLElBQUFBLFVBQVUsRUFBRTtBQUNWekYsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZDO0FBR1YsaUJBQVMsSUFIQztBQUlWQyxNQUFBQSxZQUFZLEVBQUU7QUFKSixLQXBCRjtBQTBCVnVGLElBQUFBLFVBQVUsRUFBRTtBQUNWMUYsTUFBQUEsV0FBVyxFQUFFLFlBREg7QUFFVkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZDO0FBR1YsaUJBQVMsSUFIQztBQUlWQyxNQUFBQSxZQUFZLEVBQUU7QUFKSixLQTFCRjtBQWdDVndGLElBQUFBLGlCQUFpQixFQUFFO0FBQ2pCM0YsTUFBQUEsV0FBVyxFQUFFLG1CQURJO0FBRWpCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dELE1BRlE7QUFHakIsaUJBQVMsSUFIUTtBQUlqQi9CLE1BQUFBLFlBQVksRUFBRTtBQUpHLEtBaENUO0FBc0NWNEUsSUFBQUEsYUFBYSxFQUFFO0FBQ2IvRSxNQUFBQSxXQUFXLEVBQUUsZUFEQTtBQUViQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRkk7QUFHYixpQkFBUyxJQUhJO0FBSWJWLE1BQUFBLFlBQVksRUFBRTtBQUpELEtBdENMO0FBNkNWeUYsSUFBQUEsY0FBYyxFQUFFO0FBQ2Q1RixNQUFBQSxXQUFXLEVBQUUsZ0JBREM7QUFFZEMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZLO0FBR2QsaUJBQVMsSUFISztBQUlkVixNQUFBQSxZQUFZLEVBQUU7QUFKQSxLQTdDTjtBQW9EVjBGLElBQUFBLGtCQUFrQixFQUFFO0FBQ2xCN0YsTUFBQUEsV0FBVyxFQUFFLG9CQURLO0FBRWxCQyxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ2dCLEtBRlM7QUFHbEIsaUJBQVMsSUFIUztBQUlsQkMsTUFBQUEsWUFBWSxFQUFFO0FBSkksS0FwRFY7QUEyRFYyRixJQUFBQSxrQkFBa0IsRUFBRTtBQUNsQjlGLE1BQUFBLFdBQVcsRUFBRSxvQkFESztBQUVsQkMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNnQixLQUZTO0FBR2xCLGlCQUFTLElBSFM7QUFJbEJDLE1BQUFBLFlBQVksRUFBRTtBQUpJLEtBM0RWO0FBa0VWNEYsSUFBQUEsbUJBQW1CLEVBQUU7QUFDbkIvRixNQUFBQSxXQUFXLEVBQUUscUJBRE07QUFFbkJDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGVTtBQUduQixpQkFBUyxJQUhVO0FBSW5CQyxNQUFBQSxZQUFZLEVBQUU7QUFKSztBQWxFWCxHQUZlO0FBMkUzQm9CLEVBQUFBLElBQUksRUFBRSxnQkFBWSxDQUNoQjtBQUNEO0FBN0UwQixDQUFULENBQXBCLEVBZ0ZBOztBQUNBLElBQUl5RSxpQkFBSjtBQUNBLElBQUlDLHlCQUFKO0FBQ0EsSUFBSUMsWUFBSjtBQUNBLElBQUlDLHVCQUF1QixHQUFHLENBQUMsQ0FBL0IsRUFBa0M7QUFFbEM7O0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsRUFBMUI7QUFDQSxJQUFJQyxnQkFBSixFQUVBOztBQUNBLElBQUlDLGNBQWMsR0FBRyxFQUFyQjtBQUNBLElBQUlDLGtCQUFrQixHQUFHLEVBQXpCO0FBQ0EsSUFBSUMsaUJBQWlCLEdBQUcsRUFBeEI7QUFDQSxJQUFJQyxVQUFKO0FBQ0EsSUFBSUMsV0FBSjtBQUNBLElBQUlDLFlBQVksR0FBRyxFQUFuQjtBQUVBLElBQUlDLHlCQUF5QixHQUFHLEtBQWhDO0FBQ0EsSUFBSUMsMkJBQTJCLEdBQUcsS0FBbEM7QUFDQSxJQUFJQyxTQUFTLEdBQUcsS0FBaEI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxDQUF4QjtBQUNBLElBQUlDLFlBQVksR0FBRyxLQUFuQjtBQUVBLElBQUlDLGlCQUFpQixHQUFHL0gsRUFBRSxDQUFDVSxLQUFILENBQVM7QUFDL0JDLEVBQUFBLElBQUksRUFBRSxtQkFEeUI7QUFFL0IsYUFBU1gsRUFBRSxDQUFDZ0ksU0FGbUI7QUFHL0JwSCxFQUFBQSxVQUFVLEVBQUU7QUFDVnFILElBQUFBLGlCQUFpQixFQUFFO0FBQ2pCLGlCQUFTLElBRFE7QUFFakJsSCxNQUFBQSxJQUFJLEVBQUVOLGVBRlc7QUFHakJRLE1BQUFBLFlBQVksRUFBRSxJQUhHO0FBSWpCQyxNQUFBQSxPQUFPLEVBQUU7QUFKUSxLQURUO0FBT1ZzQixJQUFBQSxtQkFBbUIsRUFBRTtBQUNuQixpQkFBUyxJQURVO0FBRW5CekIsTUFBQUEsSUFBSSxFQUFFeUIsbUJBRmE7QUFHbkJ2QixNQUFBQSxZQUFZLEVBQUUsSUFISztBQUluQkMsTUFBQUEsT0FBTyxFQUFFO0FBSlUsS0FQWDtBQWFWZ0gsSUFBQUEsaUJBQWlCLEVBQUU7QUFDakIsaUJBQVMsSUFEUTtBQUVqQm5ILE1BQUFBLElBQUksRUFBRXVDLFlBRlc7QUFHakJyQyxNQUFBQSxZQUFZLEVBQUUsSUFIRztBQUlqQkMsTUFBQUEsT0FBTyxFQUFFO0FBSlEsS0FiVDtBQW1CVmlILElBQUFBLGFBQWEsRUFBRTtBQUNiLGlCQUFTLElBREk7QUFFYnBILE1BQUFBLElBQUksRUFBRTBELFFBRk87QUFHYnhELE1BQUFBLFlBQVksRUFBRSxJQUhEO0FBSWJDLE1BQUFBLE9BQU8sRUFBRTtBQUpJLEtBbkJMO0FBeUJWa0gsSUFBQUEsbUJBQW1CLEVBQUU7QUFDbkIsaUJBQVMsRUFEVTtBQUVuQnJILE1BQUFBLElBQUksRUFBRWtELGNBRmE7QUFHbkJoRCxNQUFBQSxZQUFZLEVBQUUsSUFISztBQUluQkMsTUFBQUEsT0FBTyxFQUFFO0FBSlUsS0F6Qlg7QUErQlZtSCxJQUFBQSxhQUFhLEVBQUU7QUFDYixpQkFBUyxFQURJO0FBRWJ0SCxNQUFBQSxJQUFJLEVBQUV5RSxRQUZPO0FBR2J2RSxNQUFBQSxZQUFZLEVBQUUsSUFIRDtBQUliQyxNQUFBQSxPQUFPLEVBQUU7QUFKSSxLQS9CTDtBQXFDVm9ILElBQUFBLGdCQUFnQixFQUFFO0FBQ2hCLGlCQUFTLEVBRE87QUFFaEJ2SCxNQUFBQSxJQUFJLEVBQUUwRSxXQUZVO0FBR2hCeEUsTUFBQUEsWUFBWSxFQUFFLElBSEU7QUFJaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUpPLEtBckNSO0FBMkNWcUgsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEIsaUJBQVMsRUFEUztBQUVsQnhILE1BQUFBLElBQUksRUFBRTJFLGFBRlk7QUFHbEJ6RSxNQUFBQSxZQUFZLEVBQUUsSUFISTtBQUlsQkMsTUFBQUEsT0FBTyxFQUFFO0FBSlMsS0EzQ1Y7QUFpRFZzSCxJQUFBQSxrQkFBa0IsRUFBRTtBQUNsQixpQkFBUyxFQURTO0FBRWxCekgsTUFBQUEsSUFBSSxFQUFFb0YsYUFGWTtBQUdsQmxGLE1BQUFBLFlBQVksRUFBRSxJQUhJO0FBSWxCQyxNQUFBQSxPQUFPLEVBQUU7QUFKUyxLQWpEVjtBQXVEVnVILElBQUFBLE9BQU8sRUFBRTtBQUNQLGlCQUFTLElBREY7QUFFUDFILE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGRjtBQUdQVixNQUFBQSxZQUFZLEVBQUUsSUFIUDtBQUlQQyxNQUFBQSxPQUFPLEVBQUU7QUFKRixLQXZEQztBQTZEVmEsSUFBQUEsaUJBQWlCLEVBQUU7QUFDakIsaUJBQVMsSUFEUTtBQUVqQmhCLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGUTtBQUdqQlYsTUFBQUEsWUFBWSxFQUFFLElBSEc7QUFJakJDLE1BQUFBLE9BQU8sRUFBRTtBQUpRLEtBN0RUO0FBbUVWd0gsSUFBQUEsZ0JBQWdCLEVBQUU7QUFDaEIsaUJBQVMsSUFETztBQUVoQjNILE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGTztBQUdoQlYsTUFBQUEsWUFBWSxFQUFFLElBSEU7QUFJaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUpPLEtBbkVSO0FBeUVWd0YsSUFBQUEsY0FBYyxFQUFFO0FBQ2QsaUJBQVMsSUFESztBQUVkM0YsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZLO0FBR2RWLE1BQUFBLFlBQVksRUFBRSxJQUhBO0FBSWRDLE1BQUFBLE9BQU8sRUFBRTtBQUpLLEtBekVOO0FBK0VWeUgsSUFBQUEsZ0JBQWdCLEVBQUU7QUFDaEIsaUJBQVMsSUFETztBQUVoQjVILE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGTztBQUdoQlYsTUFBQUEsWUFBWSxFQUFFLElBSEU7QUFJaEJDLE1BQUFBLE9BQU8sRUFBRTtBQUpPLEtBL0VSO0FBcUZWMEgsSUFBQUEsWUFBWSxFQUFFO0FBQ1osaUJBQVMsSUFERztBQUVaN0gsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZHO0FBR1pWLE1BQUFBLFlBQVksRUFBRSxJQUhGO0FBSVpDLE1BQUFBLE9BQU8sRUFBRTtBQUpHLEtBckZKO0FBMkZWMkgsSUFBQUEsa0JBQWtCLEVBQUU7QUFDbEIsaUJBQVMsSUFEUztBQUVsQjlILE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGUztBQUdsQlYsTUFBQUEsWUFBWSxFQUFFLElBSEk7QUFJbEJDLE1BQUFBLE9BQU8sRUFBRTtBQUpTLEtBM0ZWO0FBaUdWNEgsSUFBQUEsWUFBWSxFQUFFO0FBQ1osaUJBQVMsSUFERztBQUVaL0gsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZHO0FBR1pWLE1BQUFBLFlBQVksRUFBRSxJQUhGO0FBSVpDLE1BQUFBLE9BQU8sRUFBRTtBQUpHLEtBakdKO0FBdUdWNkgsSUFBQUEsZUFBZSxFQUFFO0FBQ2YsaUJBQVMsSUFETTtBQUVmaEksTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUMyQixJQUZNO0FBR2ZWLE1BQUFBLFlBQVksRUFBRSxJQUhDO0FBSWZDLE1BQUFBLE9BQU8sRUFBRTtBQUpNLEtBdkdQO0FBNkdWOEgsSUFBQUEsc0JBQXNCLEVBQUU7QUFDdEIsaUJBQVMsSUFEYTtBQUV0QmpJLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGYTtBQUd0QlYsTUFBQUEsWUFBWSxFQUFFLElBSFE7QUFJdEJDLE1BQUFBLE9BQU8sRUFBRTtBQUphLEtBN0dkO0FBbUhWK0gsSUFBQUEseUJBQXlCLEVBQUU7QUFDekIsaUJBQVMsSUFEZ0I7QUFFekJsSSxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQzJCLElBRmdCO0FBR3pCVixNQUFBQSxZQUFZLEVBQUUsSUFIVztBQUl6QkMsTUFBQUEsT0FBTyxFQUFFO0FBSmdCLEtBbkhqQjtBQXlIVmdJLElBQUFBLFlBQVksRUFBRTtBQUNaLGlCQUFTLElBREc7QUFFWm5JLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0IsS0FGRztBQUdaQyxNQUFBQSxZQUFZLEVBQUUsSUFIRjtBQUlaQyxNQUFBQSxPQUFPLEVBQUU7QUFKRyxLQXpISjtBQStIVmlJLElBQUFBLGVBQWUsRUFBRTtBQUNmLGlCQUFTLElBRE07QUFFZnBJLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDMkIsSUFGTTtBQUdmVixNQUFBQSxZQUFZLEVBQUU7QUFIQztBQS9IUCxHQUhtQjtBQXlJL0JtSSxFQUFBQSxNQXpJK0Isb0JBeUl0QjtBQUNQLFNBQUtDLGVBQUwsR0FETyxDQUdQOztBQUNBLFNBQUtDLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixLQUFyQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLENBQXhCO0FBQ0QsR0FwSjhCO0FBc0ovQkMsRUFBQUEsaUJBdEorQiwrQkFzSlg7QUFDbEIsU0FBS1AsWUFBTCxHQUFvQixLQUFwQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNELEdBM0o4QjtBQTZKL0JKLEVBQUFBLGVBN0orQiw2QkE2SmI7QUFDaEIsUUFBSSxDQUFDN0osd0JBQUQsSUFBNkJBLHdCQUF3QixJQUFJLElBQTdELEVBQ0VBLHdCQUF3QixHQUFHc0ssT0FBTyxDQUFDLDBCQUFELENBQWxDO0FBRUYsUUFBSSxDQUFDdkssV0FBRCxJQUFnQkEsV0FBVyxJQUFJLElBQW5DLEVBQ0VBLFdBQVcsR0FBR3VLLE9BQU8sQ0FBQyxhQUFELENBQXJCO0FBQ0gsR0FuSzhCO0FBcUsvQkMsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ3BCO0FBQ0EvSixJQUFBQSxFQUFFLENBQUNnSyxXQUFILENBQWVDLEVBQWYsQ0FBa0IsVUFBbEIsRUFBOEIsS0FBS0MsUUFBbkMsRUFBNkMsSUFBN0M7QUFDRCxHQXhLOEI7QUEwSy9CQyxFQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFDckJuSyxJQUFBQSxFQUFFLENBQUNnSyxXQUFILENBQWVJLEdBQWYsQ0FBbUIsVUFBbkIsRUFBK0IsS0FBS0YsUUFBcEMsRUFBOEMsSUFBOUM7QUFDRCxHQTVLOEI7QUE4Sy9CO0FBQ0FHLEVBQUFBLDBCQS9LK0Isd0NBK0tGO0FBQzNCLFNBQUtwQyxpQkFBTCxDQUF1QjlGLGlCQUF2QixDQUF5Q21JLE1BQXpDLEdBQWtELElBQWxEO0FBQ0QsR0FqTDhCO0FBbUwvQkMsRUFBQUEsK0JBbkwrQiw2Q0FtTEc7QUFDaEMsU0FBS3RDLGlCQUFMLENBQXVCOUYsaUJBQXZCLENBQXlDbUksTUFBekMsR0FBa0QsS0FBbEQ7QUFDRCxHQXJMOEI7QUF1TC9CRSxFQUFBQSxvQ0F2TCtCLGdEQXVMTUMsTUF2TE4sRUF1TGM7QUFDM0MsU0FBS3RCLGVBQUwsQ0FBcUJtQixNQUFyQixHQUE4QkcsTUFBOUI7QUFDRCxHQXpMOEI7QUEyTC9CQyxFQUFBQSxtQ0EzTCtCLGlEQTJMTztBQUNwQ2xMLElBQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4REMsb0JBQTlELENBQ0UsSUFERjtBQUdBckwsSUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThERSxnQkFBOUQ7QUFDQUMsSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZnZMLE1BQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EQyxtQkFBcEQ7QUFDQXpMLE1BQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4RE0saUJBQTlEO0FBQ0ExTCxNQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDUSwwQkFBbEMsR0FBK0RELGlCQUEvRDtBQUNBMUwsTUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ1MsaUJBQWxDLEdBQXNERixpQkFBdEQ7QUFDQTFMLE1BQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NPLGlCQUFsQztBQUNBbEwsTUFBQUEsRUFBRSxDQUFDcUwsUUFBSCxDQUFZQyxTQUFaLENBQXNCLFFBQXRCO0FBQ0QsS0FQUyxFQU9QLEdBUE8sQ0FBVjtBQVFELEdBeE04QjtBQXlNL0I7QUFFQTtBQUNBO0FBQ0FDLEVBQUFBLDhCQUE4QixFQUFFLHdDQUM5QkMsV0FEOEIsRUFFOUJDLFVBRjhCLEVBRzlCQyxTQUg4QixFQUk5QkMsYUFKOEIsRUFLOUJDLGVBTDhCLEVBTTlCO0FBQUEsUUFKQUgsVUFJQTtBQUpBQSxNQUFBQSxVQUlBLEdBSmEsS0FJYjtBQUFBOztBQUFBLFFBSEFDLFNBR0E7QUFIQUEsTUFBQUEsU0FHQSxHQUhZLENBR1o7QUFBQTs7QUFBQSxRQUZBQyxhQUVBO0FBRkFBLE1BQUFBLGFBRUEsR0FGZ0IsS0FFaEI7QUFBQTs7QUFBQSxRQURBQyxlQUNBO0FBREFBLE1BQUFBLGVBQ0EsR0FEa0IsQ0FDbEI7QUFBQTs7QUFDQTtBQUNBLFNBQUt2QyxlQUFMO0FBQ0EsU0FBS3RILGlCQUFMLENBQXVCdUksTUFBdkIsR0FBZ0MsSUFBaEM7QUFFQSxTQUFLWCxZQUFMLEdBQW9CZ0MsYUFBcEI7QUFDQSxTQUFLL0IsZ0JBQUwsR0FBd0JnQyxlQUF4QjtBQUVBLFFBQUlELGFBQUosRUFBbUIsS0FBSzlCLGlCQUFMO0FBRW5CLFNBQUtnQyxrQkFBTCxDQUF3QkwsV0FBeEIsRUFBcUNDLFVBQXJDLEVBQWlEQyxTQUFqRCxFQUE0REMsYUFBNUQ7QUFDRCxHQTlOOEI7QUErTi9CRSxFQUFBQSxrQkFBa0IsRUFBRSw0QkFDbEJMLFdBRGtCLEVBRWxCQyxVQUZrQixFQUdsQkMsU0FIa0IsRUFJbEJDLGFBSmtCLEVBS2xCO0FBQUEsUUFIQUYsVUFHQTtBQUhBQSxNQUFBQSxVQUdBLEdBSGEsS0FHYjtBQUFBOztBQUFBLFFBRkFDLFNBRUE7QUFGQUEsTUFBQUEsU0FFQSxHQUZZLENBRVo7QUFBQTs7QUFBQSxRQURBQyxhQUNBO0FBREFBLE1BQUFBLGFBQ0EsR0FEZ0IsS0FDaEI7QUFBQTs7QUFDQTdFLElBQUFBLGlCQUFpQixHQUFHLElBQUl2SCxXQUFXLENBQUN1TSxVQUFoQixFQUFwQjtBQUNBL0UsSUFBQUEseUJBQXlCLEdBQUcsSUFBSXhILFdBQVcsQ0FBQ3dNLFlBQWhCLEVBQTVCOztBQUVBLFFBQUlQLFdBQUosRUFBaUI7QUFDZixXQUFLdkQsaUJBQUwsQ0FBdUI3RixjQUF2QixDQUFzQ2tJLE1BQXRDLEdBQStDLEtBQS9DO0FBQ0EsV0FBS3JDLGlCQUFMLENBQXVCbkcsU0FBdkIsQ0FBaUN3SSxNQUFqQyxHQUEwQyxJQUExQztBQUNBeEQsTUFBQUEsaUJBQWlCLENBQUNrRixJQUFsQixHQUF5QixNQUF6QjtBQUNEOztBQUVELFNBQUtDLCtCQUFMOztBQUVBLFFBQUlSLFVBQUosRUFBZ0I7QUFDZCxXQUFLeEQsaUJBQUwsQ0FBdUI3RixjQUF2QixDQUFzQ2tJLE1BQXRDLEdBQStDLElBQS9DO0FBQ0EsV0FBS3JDLGlCQUFMLENBQXVCbkcsU0FBdkIsQ0FBaUN3SSxNQUFqQyxHQUEwQyxLQUExQzs7QUFFQSxXQUNFLElBQUk0QixLQUFLLEdBQUcsQ0FEZCxFQUVFQSxLQUFLLEdBQ0wxTSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0dDLE1BSkwsRUFLRUYsS0FBSyxFQUxQLEVBTUU7QUFDQSxZQUNFMU0sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ1MsaUJBQWxDLEdBQXNEaUIsV0FBdEQsQ0FDR0MsTUFESCxJQUVBOU0sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFRCxLQURGLEVBRUVLLFNBTEosRUFNRTtBQUNBdEYsVUFBQUEsdUJBQXVCLEdBQUdpRixLQUExQjtBQUNBcEYsVUFBQUEsaUJBQWlCLEdBQUd0SCx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUNqQm1CLGNBRGlCLENBQ0ZELEtBREUsQ0FBcEI7QUFFQSxlQUFLTSwwQkFBTCxDQUNFaE4sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFRCxLQURGLEVBRUUzRixVQUhKO0FBS0EsZUFBS2tHLHlCQUFMLENBQ0VqTix3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VELEtBREYsRUFFRUssU0FISjtBQUtBLGVBQUtHLDBCQUFMLENBQ0VsTix3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VELEtBREYsRUFFRUYsSUFISjtBQUtEO0FBQ0Y7QUFDRixLQXRDRCxNQXNDTztBQUNML0UsTUFBQUEsdUJBQXVCLEdBQUcsQ0FBQyxDQUEzQjtBQUNBLFdBQUt1RiwwQkFBTCxDQUNFaE4sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ1MsaUJBQWxDLEdBQXNEaUIsV0FBdEQsQ0FBa0UxTCxJQURwRTtBQUdBLFdBQUs4TCx5QkFBTCxDQUNFak4sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ1MsaUJBQWxDLEdBQXNEaUIsV0FBdEQsQ0FBa0VDLE1BRHBFO0FBR0EsV0FBS0ksMEJBQUwsQ0FBZ0M1RixpQkFBaUIsQ0FBQ2tGLElBQWxEO0FBQ0Q7QUFDRixHQWhTOEI7QUFpUy9CVyxFQUFBQSxvQkFBb0IsRUFBRSxnQ0FBWTtBQUNoQyxXQUFPLEtBQUsxRSxpQkFBWjtBQUNELEdBblM4QjtBQW9TL0J1RSxFQUFBQSwwQkFBMEIsRUFBRSxvQ0FBVTdMLElBQVYsRUFBZ0I7QUFDMUMsU0FBS3NILGlCQUFMLENBQXVCM0Ysd0JBQXZCLENBQWdEM0IsSUFBaEQ7QUFDQW1HLElBQUFBLGlCQUFpQixDQUFDUCxVQUFsQixHQUErQjVGLElBQS9CO0FBQ0QsR0F2UzhCO0FBd1MvQjhMLEVBQUFBLHlCQUF5QixFQUFFLG1DQUFVRyxHQUFWLEVBQWU7QUFDeEM5RixJQUFBQSxpQkFBaUIsQ0FBQ3lGLFNBQWxCLEdBQThCSyxHQUE5QjtBQUNELEdBMVM4QjtBQTJTL0JDLEVBQUFBLHVDQUF1QyxFQUFFLGlEQUFVbE0sSUFBVixFQUFnQjtBQUN2RCxTQUFLc0gsaUJBQUwsQ0FBdUI3RyxrQkFBdkIsR0FBNENULElBQTVDO0FBQ0FvRyxJQUFBQSx5QkFBeUIsQ0FBQytGLHVCQUExQixHQUFvRG5NLElBQXBEO0FBQ0QsR0E5UzhCO0FBK1MvQm9NLEVBQUFBLHVDQUF1QyxFQUFFLGlEQUFVcE0sSUFBVixFQUFnQjtBQUN2RCxTQUFLc0gsaUJBQUwsQ0FBdUIzRyxrQkFBdkIsR0FBNENYLElBQTVDO0FBQ0FvRyxJQUFBQSx5QkFBeUIsQ0FBQ2lHLFlBQTFCLEdBQXlDck0sSUFBekM7QUFDRCxHQWxUOEI7QUFtVC9Cc0wsRUFBQUEsK0JBQStCLEVBQUUsMkNBQVk7QUFDM0MsU0FBS2hFLGlCQUFMLENBQXVCdkcsZUFBdkIsQ0FBdUN1TCxRQUF2QyxDQUFnRCxDQUFoRCxFQUFtREEsUUFBbkQsQ0FBNEQsQ0FBNUQsRUFBK0QzQyxNQUEvRCxHQUF3RSxLQUF4RTtBQUNBLFNBQUtyQyxpQkFBTCxDQUF1QnJHLG9CQUF2QixDQUE0Q3FMLFFBQTVDLENBQXFELENBQXJELEVBQXdEQSxRQUF4RCxDQUFpRSxDQUFqRSxFQUFvRTNDLE1BQXBFLEdBQTZFLEtBQTdFO0FBQ0EsU0FBS3JDLGlCQUFMLENBQXVCMUcsaUJBQXZCLENBQXlDZ0IsTUFBekMsR0FBa0QsRUFBbEQ7QUFDQSxTQUFLMEYsaUJBQUwsQ0FBdUJ4RyxpQkFBdkIsQ0FBeUNjLE1BQXpDLEdBQWtELEVBQWxEO0FBQ0EsU0FBSzBGLGlCQUFMLENBQXVCM0csa0JBQXZCLEdBQTRDLEVBQTVDO0FBQ0EsU0FBSzJHLGlCQUFMLENBQXVCN0csa0JBQXZCLEdBQTRDLEVBQTVDO0FBQ0EyRixJQUFBQSx5QkFBeUIsQ0FBQ21HLFlBQTFCLEdBQXlDM04sV0FBVyxDQUFDNE4sZ0JBQVosQ0FBNkJDLElBQXRFO0FBQ0QsR0EzVDhCO0FBNFQvQkMsRUFBQUEsaUNBQWlDLEVBQUUsNkNBQVk7QUFDN0MsU0FBS3BGLGlCQUFMLENBQXVCdkcsZUFBdkIsQ0FBdUN1TCxRQUF2QyxDQUFnRCxDQUFoRCxFQUFtREEsUUFBbkQsQ0FBNEQsQ0FBNUQsRUFBK0QzQyxNQUEvRCxHQUF3RSxJQUF4RTtBQUNBLFNBQUtyQyxpQkFBTCxDQUF1QnJHLG9CQUF2QixDQUE0Q3FMLFFBQTVDLENBQXFELENBQXJELEVBQXdEQSxRQUF4RCxDQUFpRSxDQUFqRSxFQUFvRTNDLE1BQXBFLEdBQTZFLEtBQTdFO0FBRUF2RCxJQUFBQSx5QkFBeUIsQ0FBQ21HLFlBQTFCLEdBQ0UzTixXQUFXLENBQUM0TixnQkFBWixDQUE2QkcsU0FEL0I7QUFFRCxHQWxVOEI7QUFtVS9CQyxFQUFBQSxtQ0FBbUMsRUFBRSwrQ0FBWTtBQUMvQyxTQUFLdEYsaUJBQUwsQ0FBdUJ2RyxlQUF2QixDQUF1Q3VMLFFBQXZDLENBQWdELENBQWhELEVBQW1EQSxRQUFuRCxDQUE0RCxDQUE1RCxFQUErRDNDLE1BQS9ELEdBQXdFLEtBQXhFO0FBQ0EsU0FBS3JDLGlCQUFMLENBQXVCckcsb0JBQXZCLENBQTRDcUwsUUFBNUMsQ0FBcUQsQ0FBckQsRUFBd0RBLFFBQXhELENBQWlFLENBQWpFLEVBQW9FM0MsTUFBcEUsR0FBNkUsSUFBN0U7QUFFQXZELElBQUFBLHlCQUF5QixDQUFDbUcsWUFBMUIsR0FDRTNOLFdBQVcsQ0FBQzROLGdCQUFaLENBQTZCSyxjQUQvQjtBQUVELEdBelU4QjtBQTBVL0JkLEVBQUFBLDBCQUEwQixFQUFFLG9DQUFVZSxNQUFWLEVBQWtCO0FBQzVDLFNBQUt4RixpQkFBTCxDQUF1QjlHLFlBQXZCLENBQW9Db0IsTUFBcEMsR0FBNkMsTUFBTWtMLE1BQW5EO0FBQ0EzRyxJQUFBQSxpQkFBaUIsQ0FBQ2tGLElBQWxCLEdBQXlCeUIsTUFBekI7QUFDRCxHQTdVOEI7QUE4VS9CQyxFQUFBQSwyQkFBMkIsRUFBRSxxQ0FBVUQsTUFBVixFQUFrQjtBQUM3QyxRQUFJRSxVQUFVLEdBQUcsS0FBakI7QUFDQSxRQUFJQyxjQUFjLEdBQUcsQ0FBckI7O0FBRUEsU0FDRSxJQUFJMUIsS0FBSyxHQUFHLENBRGQsRUFFRUEsS0FBSyxHQUFHcEYsaUJBQWlCLENBQUMrRyxZQUFsQixDQUErQnpCLE1BRnpDLEVBR0VGLEtBQUssRUFIUCxFQUlFO0FBQ0EsVUFBSXBGLGlCQUFpQixDQUFDK0csWUFBbEIsQ0FBK0IzQixLQUEvQixFQUFzQzRCLFNBQTFDLEVBQXFEO0FBQ25ESCxRQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBQyxRQUFBQSxjQUFjLEdBQUcxQixLQUFqQjtBQUNBO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJeUIsVUFBSixFQUFnQjtBQUNkLFdBQUtJLFNBQUwsQ0FDRSxxQ0FDRWpILGlCQUFpQixDQUFDK0csWUFBbEIsQ0FBK0JELGNBQS9CLEVBQStDM0wsVUFGbkQ7QUFJRCxLQUxELE1BS087QUFDTCxVQUFJNkUsaUJBQWlCLENBQUNrRixJQUFsQixJQUEwQnlCLE1BQTlCLEVBQXNDO0FBQ3BDLGFBQUtNLFNBQUwsQ0FDRSw4RUFERjtBQUdELE9BSkQsTUFJTztBQUNMLGFBQUs5RixpQkFBTCxDQUF1QmpHLGFBQXZCLENBQXFDc0ksTUFBckMsR0FBOEMsSUFBOUM7QUFDQXRELFFBQUFBLFlBQVksR0FBR2dILElBQUksQ0FBQ0MsR0FBTCxDQUFTQyxRQUFRLENBQUNwSCxpQkFBaUIsQ0FBQ2tGLElBQW5CLENBQVIsR0FBbUN5QixNQUE1QyxDQUFmO0FBQ0EsYUFBS3hGLGlCQUFMLENBQXVCL0YsZUFBdkIsQ0FBdUMsQ0FBdkMsRUFBMEMrSyxRQUExQyxDQUFtRCxDQUFuRCxFQUFzREEsUUFBdEQsQ0FBK0QsQ0FBL0QsRUFBa0VrQixZQUFsRSxDQUNFbk8sRUFBRSxDQUFDZ0IsS0FETCxFQUVFdUIsTUFGRixHQUVXLE1BQU15RSxZQUZqQjtBQUdEO0FBQ0Y7QUFDRixHQWhYOEI7QUFpWC9Cb0gsRUFBQUEsaUNBQWlDLEVBQUUsMkNBQVVDLEtBQVYsRUFBaUI7QUFDbEQsUUFDRXRILHlCQUF5QixDQUFDbUcsWUFBMUIsSUFDQTNOLFdBQVcsQ0FBQzROLGdCQUFaLENBQTZCSyxjQUYvQixFQUdFO0FBQ0EsV0FBS0UsMkJBQUwsQ0FBaUMsS0FBakM7QUFDRCxLQUxELE1BS08sSUFDTDNHLHlCQUF5QixDQUFDbUcsWUFBMUIsSUFDQTNOLFdBQVcsQ0FBQzROLGdCQUFaLENBQTZCRyxTQUZ4QixFQUdMO0FBQ0EsV0FBS0ksMkJBQUwsQ0FBaUMsS0FBakM7QUFDRCxLQUxNLE1BS0E7QUFDTCxXQUFLSyxTQUFMLENBQ0UsZ0VBREY7QUFHRDtBQUNGLEdBalk4QjtBQWtZL0JPLEVBQUFBLHFDQUFxQyxFQUFFLCtDQUFVRCxLQUFWLEVBQWlCO0FBQ3RELFNBQUtwRyxpQkFBTCxDQUF1QmpHLGFBQXZCLENBQXFDc0ksTUFBckMsR0FBOEMsS0FBOUM7QUFDRCxHQXBZOEI7QUFxWS9CaUUsRUFBQUEsb0NBQW9DLEVBQUUsOENBQVVyQyxLQUFWLEVBQWlCO0FBQ3JELFNBQUssSUFBSXNDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3ZHLGlCQUFMLENBQXVCL0YsZUFBdkIsQ0FBdUNrSyxNQUEzRCxFQUFtRW9DLENBQUMsRUFBcEUsRUFBd0U7QUFDdEUsVUFBSXRDLEtBQUssSUFBSXNDLENBQWIsRUFDRSxLQUFLdkcsaUJBQUwsQ0FBdUIvRixlQUF2QixDQUF1Q3NNLENBQXZDLEVBQTBDdkIsUUFBMUMsQ0FBbUQsQ0FBbkQsRUFBc0QzQyxNQUF0RCxHQUErRCxJQUEvRCxDQURGLEtBRUssS0FBS3JDLGlCQUFMLENBQXVCL0YsZUFBdkIsQ0FBdUNzTSxDQUF2QyxFQUEwQ3ZCLFFBQTFDLENBQW1ELENBQW5ELEVBQXNEM0MsTUFBdEQsR0FBK0QsS0FBL0Q7QUFDTjtBQUNGLEdBM1k4QjtBQTRZL0JtRSxFQUFBQSxvQ0FBb0MsRUFBRSw4Q0FBVUosS0FBVixFQUFpQjtBQUNyRCxTQUFLcEcsaUJBQUwsQ0FBdUJoRyxVQUF2QixHQUFvQ2xDLGNBQWMsQ0FBQ1MsS0FBbkQ7QUFDQSxTQUFLK04sb0NBQUwsQ0FBMEMsQ0FBMUM7QUFDRCxHQS9ZOEI7QUFnWi9CRyxFQUFBQSxvQ0FBb0MsRUFBRSw4Q0FBVUwsS0FBVixFQUFpQjtBQUNyRCxTQUFLcEcsaUJBQUwsQ0FBdUJoRyxVQUF2QixHQUFvQ2xDLGNBQWMsQ0FBQ0ksV0FBbkQ7QUFDQSxTQUFLb08sb0NBQUwsQ0FBMEMsQ0FBMUM7QUFDRCxHQW5aOEI7QUFvWi9CSSxFQUFBQSxvQ0FBb0MsRUFBRSw4Q0FBVU4sS0FBVixFQUFpQjtBQUNyRCxTQUFLcEcsaUJBQUwsQ0FBdUJoRyxVQUF2QixHQUFvQ2xDLGNBQWMsQ0FBQ0ssYUFBbkQ7QUFDQSxTQUFLbU8sb0NBQUwsQ0FBMEMsQ0FBMUM7QUFDRCxHQXZaOEI7QUF3Wi9CSyxFQUFBQSxvQ0FBb0MsRUFBRSw4Q0FBVVAsS0FBVixFQUFpQjtBQUNyRCxTQUFLcEcsaUJBQUwsQ0FBdUJoRyxVQUF2QixHQUFvQ2xDLGNBQWMsQ0FBQ00sY0FBbkQ7QUFDQSxTQUFLa08sb0NBQUwsQ0FBMEMsQ0FBMUM7QUFDRCxHQTNaOEI7QUE0Wi9CTSxFQUFBQSxvQ0FBb0MsRUFBRSw4Q0FBVVIsS0FBVixFQUFpQjtBQUNyRCxTQUFLcEcsaUJBQUwsQ0FBdUJoRyxVQUF2QixHQUFvQ2xDLGNBQWMsQ0FBQ08sYUFBbkQ7QUFDQSxTQUFLaU8sb0NBQUwsQ0FBMEMsQ0FBMUM7QUFDRCxHQS9aOEI7QUFnYS9CTyxFQUFBQSxvQ0FBb0MsRUFBRSw4Q0FBVVQsS0FBVixFQUFpQjtBQUNyRCxTQUFLcEcsaUJBQUwsQ0FBdUJoRyxVQUF2QixHQUFvQ2xDLGNBQWMsQ0FBQ1EsYUFBbkQ7QUFDQSxTQUFLZ08sb0NBQUwsQ0FBMEMsQ0FBMUM7QUFDRCxHQW5hOEI7QUFvYS9CUSxFQUFBQSxnQ0FBZ0MsRUFBRSwwQ0FBVVYsS0FBVixFQUFpQjtBQUNqRCxRQUFJLEtBQUtwRyxpQkFBTCxDQUF1QmhHLFVBQXZCLElBQXFDbEMsY0FBYyxDQUFDUyxLQUF4RCxFQUNFdUcseUJBQXlCLENBQUM5RSxVQUExQixHQUF1QytFLFlBQXZDLENBREYsS0FHRUQseUJBQXlCLENBQUM5RSxVQUExQixHQUF1Q2lNLFFBQVEsQ0FDN0MsS0FBS2pHLGlCQUFMLENBQXVCaEcsVUFEc0IsQ0FBL0M7QUFJRjhFLElBQUFBLHlCQUF5QixDQUFDK0csU0FBMUIsR0FBc0MsSUFBdEM7QUFDQSxTQUFLUSxxQ0FBTDtBQUNBeEgsSUFBQUEsaUJBQWlCLENBQUNrRixJQUFsQixHQUNFbEYsaUJBQWlCLENBQUNrRixJQUFsQixHQUF5QmpGLHlCQUF5QixDQUFDOUUsVUFEckQ7QUFFQSxTQUFLeUssMEJBQUwsQ0FBZ0M1RixpQkFBaUIsQ0FBQ2tGLElBQWxEO0FBQ0QsR0FqYjhCO0FBbWIvQjlCLEVBQUFBLFFBQVEsRUFBRSxrQkFBVThFLEtBQVYsRUFBaUJDLEdBQWpCLEVBQXNCO0FBQzlCLFFBQ0VBLEdBQUcsSUFDSHpQLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4RHNFLFdBQTlELEdBQ0dDLE9BSEwsRUFLRTNQLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FBbUVpRCxJQUFuRSxDQUNFSixLQURGO0FBSUZLLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUNFOVAsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUR0RDs7QUFJQSxRQUNFM00sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNHQyxNQURILElBRUE1TSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOEQyRSxVQUhoRSxFQUlFO0FBQ0E7QUFDQS9QLE1BQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUNHNEUsWUFESCxHQUVHQyxNQUZILEdBR0dDLGlCQUhILENBR3FCLGNBSHJCLEVBR3FDLElBSHJDLEVBRzJDLElBSDNDO0FBSUFsUSxNQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FDRzRFLFlBREgsR0FFR0MsTUFGSCxHQUdHQyxpQkFISCxDQUlJLGdCQUpKLEVBS0lsUSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBTHhELEVBTUksSUFOSjtBQVFBLFdBQUtsRSxpQkFBTCxDQUF1QjlGLGlCQUF2QixDQUF5Q21JLE1BQXpDLEdBQWtELEtBQWxEO0FBQ0EsV0FBS3ZJLGlCQUFMLENBQXVCdUksTUFBdkIsR0FBZ0MsS0FBaEM7QUFDQSxXQUFLNUIsZ0JBQUwsQ0FBc0I0QixNQUF0QixHQUErQixJQUEvQjtBQUVBOUssTUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QyRSxTQUFwRDtBQUVBTixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FDRTlQLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FEdEQ7QUFHRDtBQUNGLEdBN2Q4QjtBQStkL0J5RCxFQUFBQSxnQkFBZ0IsRUFBRSwwQkFBVUMsT0FBVixFQUFtQkMsYUFBbkIsRUFBa0NDLFlBQWxDLEVBQWdEO0FBQ2hFLFFBQUlqSixpQkFBaUIsQ0FBQ2tGLElBQWxCLEdBQXlCNkQsT0FBN0IsRUFBc0M7QUFDcEMsV0FBSzlCLFNBQUwsQ0FDRSwwQ0FBMEMrQixhQUExQyxHQUEwRCxZQUQ1RDtBQUdELEtBSkQsTUFJTztBQUNMLFVBQUlDLFlBQUosRUFBa0I7QUFDaEIsWUFBSWpKLGlCQUFpQixDQUFDa0osZUFBbEIsR0FBb0MsQ0FBeEMsRUFBMkM7QUFDekNsSixVQUFBQSxpQkFBaUIsQ0FBQ2tGLElBQWxCLEdBQXlCbEYsaUJBQWlCLENBQUNrRixJQUFsQixHQUF5QjZELE9BQWxEO0FBQ0EsZUFBSzVILGlCQUFMLENBQXVCOUcsWUFBdkIsQ0FBb0NvQixNQUFwQyxHQUNFLE1BQU11RSxpQkFBaUIsQ0FBQ2tGLElBRDFCO0FBRUEsZUFBS2lFLFNBQUwsR0FBaUIsSUFBakI7QUFDQW5KLFVBQUFBLGlCQUFpQixDQUFDa0osZUFBbEI7QUFDRCxTQU5ELE1BTU87QUFDTCxlQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsZUFBS2xDLFNBQUwsQ0FDRSxzREFERjtBQUdEO0FBQ0YsT0FiRCxNQWFPO0FBQ0xqSCxRQUFBQSxpQkFBaUIsQ0FBQ2tGLElBQWxCLEdBQXlCbEYsaUJBQWlCLENBQUNrRixJQUFsQixHQUF5QjZELE9BQWxEO0FBQ0EsYUFBSzVILGlCQUFMLENBQXVCOUcsWUFBdkIsQ0FBb0NvQixNQUFwQyxHQUNFLE1BQU11RSxpQkFBaUIsQ0FBQ2tGLElBRDFCO0FBRUEsYUFBS2lFLFNBQUwsR0FBaUIsSUFBakI7QUFDQW5KLFFBQUFBLGlCQUFpQixDQUFDb0osb0JBQWxCO0FBQ0Q7QUFDRjtBQUNGLEdBMWY4QjtBQTRmL0JDLEVBQUFBLGtCQUFrQixFQUFFLDhCQUFZO0FBQzlCLFNBQUtwTyxpQkFBTCxDQUF1QnVJLE1BQXZCLEdBQWdDLEtBQWhDOztBQUVBLFFBQUl2RCx5QkFBeUIsQ0FBQytHLFNBQTlCLEVBQXlDO0FBQ3ZDL0csTUFBQUEseUJBQXlCLENBQUMrRyxTQUExQixHQUFzQyxLQUF0QztBQUNBaEgsTUFBQUEsaUJBQWlCLENBQUNrRixJQUFsQixHQUNFbEYsaUJBQWlCLENBQUNrRixJQUFsQixHQUF5QmpGLHlCQUF5QixDQUFDOUUsVUFEckQ7QUFFQThFLE1BQUFBLHlCQUF5QixDQUFDOUUsVUFBMUIsR0FBdUMsQ0FBdkM7QUFDQSxXQUFLOEwsU0FBTCxDQUFlLDZCQUFmLEVBQThDLEdBQTlDO0FBQ0Q7QUFDRixHQXRnQjhCO0FBd2dCL0JxQyxFQUFBQSwwQkFBMEIsRUFBRSxzQ0FBWTtBQUFBOztBQUN0QyxRQUFJQyxLQUFLLEdBQUc3USx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOEQwRixlQUE5RCxFQUFaOztBQUVBLFFBQUksS0FBSzNHLFlBQVQsRUFBdUI7QUFDckI3QyxNQUFBQSxpQkFBaUIsQ0FBQ3lKLFVBQWxCLEdBQStCLElBQS9CO0FBQ0F6SixNQUFBQSxpQkFBaUIsQ0FBQzBKLGNBQWxCLEdBQW1DLEtBQUs1RyxnQkFBeEM7QUFDQXBLLE1BQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FDRTNNLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EeUYsYUFBcEQsRUFERixJQUVJM0osaUJBRko7QUFHRCxLQU5ELE1BTU87QUFDTHRILE1BQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FBbUVpRCxJQUFuRSxDQUNFdEksaUJBREY7QUFHRDs7QUFFRCxRQUFJdUosS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDZDtBQUNBO0FBQ0E3USxNQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FDR3NFLFdBREgsR0FFR1EsaUJBRkgsQ0FFcUIsbUJBRnJCLEVBRTBDNUksaUJBRjFDOztBQUlBLFVBQUksQ0FBQyxLQUFLNkMsWUFBVixFQUF3QjtBQUN0Qm5LLFFBQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NRLDBCQUFsQyxHQUErRHVGLFVBQS9ELENBQ0UsQ0FERixFQUVFNUosaUJBRkY7QUFJQSxhQUFLbUIsaUJBQUwsQ0FBdUI5RixpQkFBdkIsQ0FBeUNtSSxNQUF6QyxHQUFrRCxJQUFsRDtBQUNELE9BTkQsTUFNTztBQUNMLGFBQUtyQyxpQkFBTCxDQUF1QjlGLGlCQUF2QixDQUF5Q21JLE1BQXpDLEdBQWtELEtBQWxEO0FBQ0EsYUFBS3ZJLGlCQUFMLENBQXVCdUksTUFBdkIsR0FBZ0MsS0FBaEM7QUFDQSxhQUFLNUIsZ0JBQUwsQ0FBc0I0QixNQUF0QixHQUErQixJQUEvQjtBQUVBLFlBQUkwRSxLQUFLLEdBQUc7QUFDVjJCLFVBQUFBLElBQUksRUFBRTtBQUNKQyxZQUFBQSxVQUFVLEVBQUUsSUFEUjtBQUVKQyxZQUFBQSxJQUFJLEVBQUVyUix3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHlGLGFBQXBELEVBRkY7QUFHSkssWUFBQUEsY0FBYyxFQUFFaEs7QUFIWjtBQURJLFNBQVo7QUFPQXRILFFBQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NRLDBCQUFsQyxHQUErRHVGLFVBQS9ELENBQ0UsQ0FERixFQUVFMUIsS0FGRjtBQUtBeFAsUUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QrRixzQkFBcEQ7QUFDRDtBQUNGLEtBaENELE1BZ0NPLElBQUlWLEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQ3JCO0FBQ0EsVUFBSSxDQUFDLEtBQUsxRyxZQUFWLEVBQXdCO0FBQ3RCLGFBQUsxQixpQkFBTCxDQUF1QjlGLGlCQUF2QixDQUF5Q21JLE1BQXpDLEdBQWtELElBQWxEO0FBQ0FTLFFBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsVUFBQSxLQUFJLENBQUM5QyxpQkFBTCxDQUF1QjlGLGlCQUF2QixDQUF5Q21JLE1BQXpDLEdBQWtELEtBQWxEO0FBQ0EsVUFBQSxLQUFJLENBQUN2SSxpQkFBTCxDQUF1QnVJLE1BQXZCLEdBQWdDLEtBQWhDO0FBQ0EsVUFBQSxLQUFJLENBQUM1QixnQkFBTCxDQUFzQjRCLE1BQXRCLEdBQStCLElBQS9CO0FBQ0E5SyxVQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDJFLFNBQXBEO0FBQ0QsU0FMUyxFQUtQLElBTE8sQ0FBVjtBQU1ELE9BUkQsTUFRTztBQUNMLGFBQUsxSCxpQkFBTCxDQUF1QjlGLGlCQUF2QixDQUF5Q21JLE1BQXpDLEdBQWtELEtBQWxEO0FBQ0EsYUFBS3ZJLGlCQUFMLENBQXVCdUksTUFBdkIsR0FBZ0MsS0FBaEM7QUFDQSxhQUFLNUIsZ0JBQUwsQ0FBc0I0QixNQUF0QixHQUErQixJQUEvQjtBQUNBOUssUUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0QrRixzQkFBcEQ7QUFDRDtBQUNGLEtBaEJNLE1BZ0JBO0FBQ0wxQixNQUFBQSxPQUFPLENBQUMyQixLQUFSLENBQWMsa0JBQWQ7QUFDRDtBQUNGLEdBMWtCOEI7QUE0a0IvQkMsRUFBQUEsc0NBQXNDLEVBQUUsa0RBQVk7QUFDbER6UixJQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VsRix1QkFERixJQUVJSCxpQkFGSjtBQUdBLFNBQUsvRSxpQkFBTCxDQUF1QnVJLE1BQXZCLEdBQWdDLEtBQWhDO0FBQ0FyRCxJQUFBQSx1QkFBdUIsR0FBRyxDQUFDLENBQTNCO0FBQ0EsU0FBS2lLLDJCQUFMLENBQWlDLElBQWpDO0FBQ0QsR0FubEI4QjtBQXFsQi9CQyxFQUFBQSxtQkFBbUIsRUFBRSwrQkFBWTtBQUMvQixTQUFLbEIsU0FBTCxHQUFpQixLQUFqQjtBQUVBLFFBQUlsSix5QkFBeUIsQ0FBQytGLHVCQUExQixJQUFxRCxFQUF6RCxFQUNFLEtBQUtpQixTQUFMLENBQWUsK0JBQWYsRUFERixLQUVLLElBQUloSCx5QkFBeUIsQ0FBQ2lHLFlBQTFCLElBQTBDLEVBQTlDLEVBQ0gsS0FBS2UsU0FBTCxDQUFlLCtCQUFmLEVBREcsS0FFQTtBQUNILFVBQ0VoSCx5QkFBeUIsQ0FBQ21HLFlBQTFCLElBQ0EzTixXQUFXLENBQUM0TixnQkFBWixDQUE2QkcsU0FGL0IsRUFJRTtBQUNBLGFBQUtzQyxnQkFBTCxDQUFzQixLQUF0QixFQUE2QixNQUE3QixFQUFxQyxJQUFyQyxFQUxGLEtBTUssSUFDSDdJLHlCQUF5QixDQUFDbUcsWUFBMUIsSUFDQTNOLFdBQVcsQ0FBQzROLGdCQUFaLENBQTZCSyxjQUYxQixFQUlIO0FBQ0EsYUFBS29DLGdCQUFMLENBQXNCLEtBQXRCLEVBQTZCLGtCQUE3QixFQUFpRCxLQUFqRDs7QUFFRixVQUFJLEtBQUtLLFNBQUwsSUFBa0IsSUFBbEIsSUFBMEIsS0FBS3RHLFlBQUwsSUFBcUIsSUFBbkQsRUFBeUQ7QUFDdkQ3QyxRQUFBQSxpQkFBaUIsQ0FBQytHLFlBQWxCLENBQStCdUIsSUFBL0IsQ0FBb0NySSx5QkFBcEM7QUFFQSxZQUFJRSx1QkFBdUIsSUFBSSxDQUFDLENBQWhDLEVBQ0U7QUFDQSxlQUFLZ0ssc0NBQUwsR0FGRixDQUdBO0FBSEEsYUFJSyxLQUFLYiwwQkFBTCxHQVBrRCxDQVN2RDs7QUFDQSxhQUNFLElBQUk1QixDQUFDLEdBQUcsQ0FEVixFQUVFQSxDQUFDLEdBQ0RoUCx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0dDLE1BSkwsRUFLRW9DLENBQUMsRUFMSCxFQU1FO0FBQ0FhLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUNFLGtCQUNFOVAsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FDR21CLGNBREgsQ0FDa0JxQyxDQURsQixFQUNxQmpJLFVBSHpCO0FBS0E4SSxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FDRSxnQkFDRTlQLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQ0dtQixjQURILENBQ2tCcUMsQ0FEbEIsRUFDcUJqQyxTQUh6QjtBQUtBOEMsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQ0Usb0JBQ0U5UCx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUNHbUIsY0FESCxDQUNrQnFDLENBRGxCLEVBQ3FCNEMsS0FIekI7QUFLQS9CLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdDQUFaO0FBQ0FELFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUNFOVAsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFcUMsQ0FERixFQUVFWCxZQUhKO0FBS0F3QixVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FDRSxrQkFDRTlQLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQ0dtQixjQURILENBQ2tCcUMsQ0FEbEIsRUFDcUJ4QyxJQUh6QjtBQUtBcUQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQ0Usd0JBQ0U5UCx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUNHbUIsY0FESCxDQUNrQnFDLENBRGxCLEVBQ3FCVixTQUh6QjtBQUtBdUIsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQ0Usd0JBQ0U5UCx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUNHbUIsY0FESCxDQUNrQnFDLENBRGxCLEVBQ3FCdk0sVUFIekI7QUFLRDtBQUNGO0FBQ0Y7QUFDRixHQWxxQjhCO0FBbXFCL0I7QUFFQTtBQUNBO0FBQ0FpUCxFQUFBQSwyQkFBMkIsRUFBRSxxQ0FBVUcsUUFBVixFQUFvQjtBQUMvQyxTQUFLM0ssY0FBTCxDQUFvQjRELE1BQXBCLEdBQTZCK0csUUFBN0I7QUFDQSxTQUFLQyx1QkFBTDtBQUNELEdBMXFCOEI7QUE0cUIvQkEsRUFBQUEsdUJBQXVCLEVBQUUsbUNBQVk7QUFDbkMsU0FBSzlPLG1CQUFMLENBQXlCSSxlQUF6QixDQUF5Q0wsTUFBekMsR0FDRSxPQUNBL0Msd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFM00sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0R5RixhQUFwRCxFQURGLEVBRUV6RSxJQUpKO0FBS0QsR0FsckI4QjtBQW9yQi9CdUYsRUFBQUEscUNBQXFDLEVBQUUsK0NBQVU5RCxNQUFWLEVBQWtCO0FBQ3ZEO0FBQ0F2RyxJQUFBQSxtQkFBbUIsR0FBR3VHLE1BQXRCO0FBQ0QsR0F2ckI4QjtBQXlyQi9CK0QsRUFBQUEsc0NBQXNDLEVBQUUsa0RBQVk7QUFDbEQsUUFBSXRLLG1CQUFtQixJQUFJLEVBQXZCLElBQTZCQSxtQkFBbUIsSUFBSSxJQUF4RCxFQUE4RDtBQUM1RCxXQUFLNkcsU0FBTCxDQUFlLHlCQUFmO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsVUFBSTBELFlBQVksR0FBR2pTLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EeUYsYUFBcEQsRUFBbkI7O0FBQ0EsV0FBS2lCLGVBQUwsR0FBdUJ4RCxRQUFRLENBQUNoSCxtQkFBRCxDQUEvQjtBQUNBbUksTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQ0U5UCx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQUhKLEVBSEssQ0FTTDs7QUFDQSxVQUNFeE0sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFekYsSUFGRixJQUVVLEtBQUswRixlQUhqQixFQUlFO0FBQ0FsUyxRQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQUZGLEdBR0V4TSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQUZGLEdBRVMsS0FBSzBGLGVBTGhCO0FBTUFsUyxRQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUVFLGVBRkYsR0FHRW5TLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FDRXNGLFlBREYsRUFFRUUsZUFGRixHQUVvQixLQUFLRCxlQUwzQjtBQU1BLGFBQUszRCxTQUFMLENBQ0UsMENBQ0V2Tyx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUVFLGVBSEosR0FJRSx3QkFKRixHQUtFblMsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFekYsSUFQSixHQVFFLEdBVEo7QUFXQSxhQUFLc0YsdUJBQUwsR0F4QkEsQ0EwQkE7O0FBQ0EsYUFBSzlPLG1CQUFMLENBQXlCQyxnQkFBekIsQ0FBMENGLE1BQTFDLEdBQW1ELEVBQW5EO0FBQ0EyRSxRQUFBQSxtQkFBbUIsR0FBRyxFQUF0QjtBQUNELE9BakNELE1BaUNPO0FBQ0wsYUFBSzZHLFNBQUwsQ0FBZSw4QkFBZixFQURLLENBR0w7O0FBQ0EsYUFBS3ZMLG1CQUFMLENBQXlCQyxnQkFBekIsQ0FBMENGLE1BQTFDLEdBQW1ELEVBQW5EO0FBQ0EyRSxRQUFBQSxtQkFBbUIsR0FBRyxFQUF0QjtBQUNEO0FBQ0Y7QUFDRixHQS91QjhCO0FBaXZCL0IwSyxFQUFBQSx3Q0FBd0MsRUFBRSxvREFBWTtBQUNwRDtBQUNBLFFBQUlILFlBQVksR0FBR2pTLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EeUYsYUFBcEQsRUFBbkI7O0FBQ0EsUUFDRWpSLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FDRXNGLFlBREYsRUFFRUksWUFISixFQUlFO0FBQ0EsV0FBSzlELFNBQUwsQ0FBZSxrQ0FBZjtBQUNELEtBTkQsTUFNTztBQUNMLFVBQ0V2Tyx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQUZGLElBRVUsSUFIWixFQUlFO0FBQ0F4TSxRQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUVJLFlBRkYsR0FFaUIsSUFGakI7QUFHQTFLLFFBQUFBLGdCQUFnQixHQUFHLElBQW5CO0FBQ0FrSSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWW5JLGdCQUFaO0FBQ0EzSCxRQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQUZGLEdBR0V4TSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQUZGLEdBRVMsSUFMWDtBQU1BLGFBQUsrQixTQUFMLENBQ0UsOERBQ0V2Tyx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQUhKLEdBSUUsR0FMSjtBQU9BLGFBQUtzRix1QkFBTDtBQUNELE9BeEJELE1Bd0JPO0FBQ0wsYUFBS3ZELFNBQUwsQ0FBZSxxREFBZjtBQUNEO0FBQ0Y7QUFDRixHQXZ4QjhCO0FBeXhCL0IrRCxFQUFBQSxpREF6eEIrQiw2REF5eEJtQkMsS0F6eEJuQixFQXl4QjBCO0FBQ3ZEdEssSUFBQUEsWUFBWSxHQUFHc0ssS0FBZjtBQUNELEdBM3hCOEI7QUE0eEIvQkMsRUFBQUEsa0NBQWtDLEVBQUUsOENBQVk7QUFBQTs7QUFDOUM7QUFDQTNDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaO0FBQ0EsU0FBSzlNLG1CQUFMLENBQXlCSyxrQkFBekIsQ0FBNEN5SCxNQUE1QyxHQUFxRCxJQUFyRDtBQUNBLFFBQUkySCxlQUFlLEdBQUd6Uyx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRGtILDJDQUFwRCxFQUF0Qjs7QUFFQSxRQUFJRCxlQUFlLElBQUksQ0FBdkIsRUFBMEI7QUFDeEIsV0FBS2xFLFNBQUwsQ0FBZSxrREFBZixFQUFtRSxJQUFuRTtBQUNBaEQsTUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixRQUFBLE1BQUksQ0FBQ3ZJLG1CQUFMLENBQXlCSyxrQkFBekIsQ0FBNEN5SCxNQUE1QyxHQUFxRCxLQUFyRDtBQUNELE9BRlMsRUFFUCxJQUZPLENBQVY7QUFHRDtBQUNGLEdBeHlCOEI7QUEweUIvQjZILEVBQUFBLHNDQUFzQyxFQUFFLGtEQUFZO0FBQ2xELFNBQUtiLHVCQUFMO0FBQ0EsU0FBS2pJLGVBQUw7QUFDQTVCLElBQUFBLFlBQVksR0FBRyxFQUFmO0FBQ0E0SCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw2QkFBWjtBQUNBOVAsSUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RvSCxxQkFBcEQ7QUFDQSxTQUFLNVAsbUJBQUwsQ0FBeUJLLGtCQUF6QixDQUE0Q3lILE1BQTVDLEdBQXFELEtBQXJEO0FBQ0QsR0FqekI4QjtBQW16Qi9CK0gsRUFBQUEsdUNBQXVDLEVBQUUsbURBQVk7QUFDbkRoRCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx1QkFBWjtBQUNBLFNBQUsvRCw4QkFBTCxDQUFvQyxLQUFwQyxFQUEyQyxJQUEzQztBQUNELEdBdHpCOEI7QUF3ekIvQitHLEVBQUFBLGdDQUFnQyxFQUFFLDBDQUFVN0UsTUFBVixFQUFrQjtBQUNsRDtBQUNBckcsSUFBQUEsY0FBYyxHQUFHcUcsTUFBakI7QUFDRCxHQTN6QjhCO0FBNnpCL0I4RSxFQUFBQSw4QkFBOEIsRUFBRSwwQ0FBWTtBQUMxQyxRQUFJLENBQUMsS0FBS2pKLFlBQVYsRUFBd0I7QUFDdEIsV0FBS0EsWUFBTCxHQUFvQixJQUFwQjtBQUNBakMsTUFBQUEsa0JBQWtCLEdBQUcsRUFBckI7QUFDQSxXQUFLbUwsaUNBQUwsQ0FBdUMsSUFBdkM7QUFDQSxXQUFLdEssaUJBQUwsQ0FBdUJuRSxXQUF2QixHQUFxQ2QsVUFBVSxDQUFDRSxVQUFoRDtBQUNBb0UsTUFBQUEsVUFBVSxHQUFHL0gsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0R5SCxZQUFwRCxFQUFiO0FBQ0FqTCxNQUFBQSxXQUFXLEdBQUdELFVBQVUsR0FBRyxJQUEzQjtBQUVBLFdBQUttTCxxQkFBTCxDQUNFLGdCQURGLEVBRUVuTCxVQUZGLEVBR0UsOEJBSEYsRUFJRUMsV0FBVyxHQUFHLFFBSmhCLEVBS0UsbURBTEYsRUFNRSxzQkFORixFQU9FQSxXQUFXLEdBQUcsTUFQaEIsRUFRRSxLQVJGLEVBU0UsS0FBS1UsaUJBQUwsQ0FBdUJuRSxXQVR6QjtBQVdELEtBbkJELE1BbUJPO0FBQ0wsV0FBS2dLLFNBQUwsQ0FBZSw4Q0FBZixFQUErRCxHQUEvRDtBQUNEO0FBQ0YsR0FwMUI4QjtBQXMxQi9CNEUsRUFBQUEsdUNBQXVDLEVBQUUsaURBQVVoUyxJQUFWLEVBQWdCO0FBQ3ZEMkcsSUFBQUEsaUJBQWlCLEdBQUczRyxJQUFwQjtBQUNELEdBeDFCOEI7QUEwMUIvQmlTLEVBQUFBLCtCQUErQixFQUFFLDJDQUFZO0FBQzNDLFFBQUksQ0FBQyxLQUFLcEosYUFBVixFQUF5QjtBQUN2QixVQUFJaUksWUFBWSxHQUFHalMsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0R5RixhQUFwRCxFQUFuQjs7QUFDQSxVQUFJbkosaUJBQWlCLElBQUksRUFBekIsRUFBNkI7QUFDM0IsYUFBS3VMLDJCQUFMO0FBQ0EsYUFBSzlFLFNBQUwsQ0FBZSx5Q0FBZjtBQUNELE9BSEQsTUFHTztBQUNMLGFBQUt2RSxhQUFMLEdBQXFCLElBQXJCO0FBQ0FuQyxRQUFBQSxrQkFBa0IsR0FBRyxFQUFyQjtBQUNBLGFBQUttTCxpQ0FBTCxDQUF1QyxJQUF2QztBQUNBLGFBQUt0SyxpQkFBTCxDQUF1Qm5FLFdBQXZCLEdBQXFDZCxVQUFVLENBQUNDLFdBQWhEO0FBQ0FxRSxRQUFBQSxVQUFVLEdBQUcvSCx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHlILFlBQXBELEVBQWI7QUFDQWpMLFFBQUFBLFdBQVcsR0FBR0QsVUFBVSxHQUFHLElBQTNCO0FBRUEsYUFBS21MLHFCQUFMLENBQ0UsaUJBREYsRUFFRW5MLFVBRkYsRUFHRSwrQkFIRixFQUlFQyxXQUFXLEdBQUcsUUFKaEIsRUFLRSxxREFMRixFQU1FLHNCQU5GLEVBT0VBLFdBQVcsR0FBRyxNQVBoQixFQVFFLEtBUkYsRUFTRSxLQUFLVSxpQkFBTCxDQUF1Qm5FLFdBVHpCO0FBV0Q7QUFDRixLQXpCRCxNQXlCTztBQUNMLFdBQUtnSyxTQUFMLENBQWUsZ0RBQWYsRUFBaUUsR0FBakU7QUFDRDtBQUNGLEdBdjNCOEI7QUF5M0IvQitFLEVBQUFBLDhCQUE4QixFQUFFLDBDQUFZO0FBQzFDLFFBQUksQ0FBQyxLQUFLdkosUUFBVixFQUFvQjtBQUNsQixVQUFJa0ksWUFBWSxHQUFHalMsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0R5RixhQUFwRCxFQUFuQjs7QUFDQSxVQUNFalIsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFc0IsU0FGRixHQUVjLENBSGhCLEVBSUU7QUFDQSxhQUFLeEosUUFBTCxHQUFnQixJQUFoQjtBQUNBbEMsUUFBQUEsa0JBQWtCLEdBQUcsRUFBckI7QUFDQSxhQUFLbUwsaUNBQUwsQ0FBdUMsSUFBdkM7QUFDQSxhQUFLdEssaUJBQUwsQ0FBdUJuRSxXQUF2QixHQUFxQ2QsVUFBVSxDQUFDSSxRQUFoRDtBQUNBa0UsUUFBQUEsVUFBVSxHQUFHL0gsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0R5SCxZQUFwRCxFQUFiO0FBQ0FqTCxRQUFBQSxXQUFXLEdBQUdELFVBQVUsR0FBRyxJQUEzQjtBQUVBLGFBQUttTCxxQkFBTCxDQUNFLFdBREYsRUFFRW5MLFVBRkYsRUFHRSw4QkFIRixFQUlFQyxXQUFXLEdBQUcsUUFKaEIsRUFLRSxvREFMRixFQU1FLHVCQU5GLEVBT0VBLFdBQVcsR0FBRyxNQVBoQixFQVFFLE1BUkYsRUFTRSxLQUFLVSxpQkFBTCxDQUF1Qm5FLFdBVHpCO0FBV0QsT0F2QkQsTUF1Qk87QUFDTCxhQUFLZ0ssU0FBTCxDQUNFLDBEQURGO0FBR0Q7QUFDRixLQTlCRCxNQThCTztBQUNMLFdBQUtBLFNBQUwsQ0FBZSx5Q0FBZixFQUEwRCxHQUExRDtBQUNEO0FBQ0YsR0EzNUI4QjtBQTY1Qi9CaUYsRUFBQUEsK0JBQStCLEVBQUUsMkNBQVk7QUFDM0MsUUFBSSxDQUFDLEtBQUt2SixTQUFWLEVBQXFCO0FBQ25CLFVBQUlnSSxZQUFZLEdBQUdqUyx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHlGLGFBQXBELEVBQW5COztBQUNBLFVBQ0VqUix3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV3QixVQUZGLEdBRWUsQ0FIakIsRUFJRTtBQUNBLGFBQUt4SixTQUFMLEdBQWlCLElBQWpCO0FBQ0FwQyxRQUFBQSxrQkFBa0IsR0FBRyxFQUFyQjtBQUNBLGFBQUttTCxpQ0FBTCxDQUF1QyxJQUF2QztBQUNBLGFBQUt0SyxpQkFBTCxDQUF1Qm5FLFdBQXZCLEdBQXFDZCxVQUFVLENBQUNHLFNBQWhEO0FBQ0FtRSxRQUFBQSxVQUFVLEdBQUcvSCx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHlILFlBQXBELEVBQWI7QUFDQWpMLFFBQUFBLFdBQVcsR0FBR0QsVUFBVSxHQUFHLElBQTNCO0FBRUEsYUFBS21MLHFCQUFMLENBQ0UsWUFERixFQUVFbkwsVUFGRixFQUdFLCtCQUhGLEVBSUVDLFdBQVcsR0FBRyxRQUpoQixFQUtFLHNEQUxGLEVBTUUsdUJBTkYsRUFPRUEsV0FBVyxHQUFHLE1BUGhCLEVBUUUsTUFSRixFQVNFLEtBQUtVLGlCQUFMLENBQXVCbkUsV0FUekI7QUFXRCxPQXZCRCxNQXVCTztBQUNMLGFBQUtnSyxTQUFMLENBQWUscURBQWY7QUFDRDtBQUNGLEtBNUJELE1BNEJPO0FBQ0wsV0FBS0EsU0FBTCxDQUFlLDJDQUFmLEVBQTRELEdBQTVEO0FBQ0Q7QUFDRixHQTc3QjhCO0FBKzdCL0JtRixFQUFBQSxpQ0FBaUMsRUFBRSw2Q0FBWTtBQUM3QzdELElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaLEVBRDZDLENBRTdDO0FBQ0E7O0FBQ0EsU0FBSzZELGtDQUFMO0FBQ0QsR0FwOEI4QjtBQXM4Qi9CQyxFQUFBQSw4QkFBOEIsRUFBRSwwQ0FBWTtBQUMxQy9ELElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVo7QUFDQSxTQUFLNEIsMkJBQUwsQ0FBaUMsS0FBakM7QUFDQTFSLElBQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EcUksUUFBcEQ7QUFDRCxHQTE4QjhCO0FBNDhCL0JDLEVBQUFBLDJCQUEyQixFQUFFLHFDQUFVQyxLQUFWLEVBQWlCLENBQzVDO0FBQ0QsR0E5OEI4QjtBQSs4Qi9CO0FBRUE7QUFDQUMsRUFBQUEsNkJBbDlCK0IseUNBazlCRC9JLE1BbDlCQyxFQWs5Qk87QUFDcEMsU0FBS2pDLGtCQUFMLENBQXdCbkMsVUFBeEIsQ0FBbUNpRSxNQUFuQyxHQUE0Q0csTUFBNUM7QUFDRCxHQXA5QjhCO0FBczlCL0JnSixFQUFBQSxvQ0F0OUIrQixnREFzOUJNaEosTUF0OUJOLEVBczlCYztBQUMzQyxTQUFLakMsa0JBQUwsQ0FBd0JwQyxtQkFBeEIsQ0FBNENrRSxNQUE1QyxHQUFxREcsTUFBckQ7QUFDRCxHQXg5QjhCO0FBMDlCL0JpSixFQUFBQSxxQ0ExOUIrQixpREEwOUJPakosTUExOUJQLEVBMDlCZTtBQUM1QyxTQUFLakMsa0JBQUwsQ0FBd0I5QixjQUF4QixDQUF1QzRELE1BQXZDLEdBQWdERyxNQUFoRDtBQUNELEdBNTlCOEI7QUE4OUIvQjBJLEVBQUFBLGtDQTk5QitCLGdEQTg5Qk07QUFDbkNyVCxJQUFBQSxXQUFXLEdBQUcsRUFBZDtBQUNBLFNBQUs2VCxzQkFBTDs7QUFDQSxRQUFJQyxRQUFRLEdBQUdwVSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUl5RyxZQUFZLEdBQUdtQyxRQUFRLENBQUNuRCxhQUFULEVBQW5COztBQUNBLFFBQUlvRCxTQUFTLEdBQUdELFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JzRixZQUF4QixDQUFoQjtBQUNBLFNBQUsrQiw2QkFBTCxDQUFtQyxJQUFuQztBQUNBLFNBQUtoTCxrQkFBTCxDQUF3QmpDLFVBQXhCLENBQW1DaEUsTUFBbkMsR0FBMkNzUixTQUFTLENBQUN0TixVQUFyRDtBQUNBLFNBQUtpQyxrQkFBTCxDQUF3QmhDLFVBQXhCLENBQW1DakUsTUFBbkMsR0FBMkMsTUFBSXNSLFNBQVMsQ0FBQzdILElBQXpEOztBQUVBLFNBQUssSUFBSUUsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcySCxTQUFTLENBQUNoRyxZQUFWLENBQXVCekIsTUFBbkQsRUFBMkRGLEtBQUssRUFBaEUsRUFBb0U7QUFDbEUsVUFBSTRILElBQUksR0FBRzlULEVBQUUsQ0FBQytULFdBQUgsQ0FBZSxLQUFLdkwsa0JBQUwsQ0FBd0IvQixpQkFBdkMsQ0FBWDtBQUNBcU4sTUFBQUEsSUFBSSxDQUFDRSxNQUFMLEdBQWMsS0FBS3hMLGtCQUFMLENBQXdCM0MsYUFBdEM7QUFDQWlPLE1BQUFBLElBQUksQ0FBQzNGLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DOUUsZUFBcEM7QUFDQXlLLE1BQUFBLElBQUksQ0FBQzNGLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DOEYsT0FBcEMsQ0FBNENKLFNBQVMsQ0FBQ2hHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QmMsWUFBMUU7QUFDQThHLE1BQUFBLElBQUksQ0FBQzNGLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DK0YsT0FBcEMsQ0FBNENMLFNBQVMsQ0FBQ2hHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QlksdUJBQTFFO0FBQ0FnSCxNQUFBQSxJQUFJLENBQUMzRixZQUFMLENBQWtCLGdCQUFsQixFQUFvQ2dHLGdCQUFwQyxDQUFxRGpJLEtBQXJEO0FBRUEsVUFBSWtJLGVBQWUsR0FBR1AsU0FBUyxDQUFDaEcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCbUksYUFBOUIsQ0FBNENqSSxNQUFsRTs7QUFFQSxVQUFJOEIsUUFBUSxDQUFDMkYsU0FBUyxDQUFDaEcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCZ0IsWUFBL0IsQ0FBUixJQUF3RCxDQUE1RCxFQUErRDtBQUM3RDRHLFFBQUFBLElBQUksQ0FBQzNGLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DbUcsZUFBcEMsQ0FBb0QsQ0FBcEQ7QUFDQVIsUUFBQUEsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NvRyxPQUFwQyxDQUE0QyxZQUE1QztBQUNBVCxRQUFBQSxJQUFJLENBQUMzRixZQUFMLENBQWtCLGdCQUFsQixFQUFvQ3FHLGdCQUFwQyxDQUFxRCxLQUFyRDtBQUNBVixRQUFBQSxJQUFJLENBQUMzRixZQUFMLENBQWtCLGdCQUFsQixFQUFvQ3NHLHFCQUFwQyxDQUEwRCxLQUExRDtBQUNELE9BTEQsTUFLTyxJQUFJdkcsUUFBUSxDQUFDMkYsU0FBUyxDQUFDaEcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCZ0IsWUFBL0IsQ0FBUixJQUF3RCxDQUE1RCxFQUErRDtBQUNwRTRHLFFBQUFBLElBQUksQ0FBQzNGLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DbUcsZUFBcEMsQ0FBb0QsQ0FBcEQ7QUFDQVIsUUFBQUEsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NvRyxPQUFwQyxDQUE0QyxnQkFBNUM7O0FBQ0EsWUFBSUcsbUJBQW1CLEdBQUdOLGVBQWUsR0FBRyxLQUE1Qzs7QUFDQSxZQUFJTyxZQUFZLEdBQUcsUUFBUUQsbUJBQTNCOztBQUNBWixRQUFBQSxJQUFJLENBQUMzRixZQUFMLENBQWtCLGdCQUFsQixFQUFvQ3FHLGdCQUFwQyxDQUFxREcsWUFBckQ7QUFDQWIsUUFBQUEsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NzRyxxQkFBcEMsQ0FBMERFLFlBQTFEO0FBQ0Q7O0FBRURiLE1BQUFBLElBQUksQ0FBQzNGLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DeUcsVUFBcEMsQ0FBK0NmLFNBQVMsQ0FBQ2hHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QmpLLFVBQTdFO0FBQ0E2UixNQUFBQSxJQUFJLENBQUMzRixZQUFMLENBQWtCLGdCQUFsQixFQUFvQzBHLFlBQXBDLENBQWlEaEIsU0FBUyxDQUFDaEcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCbUksYUFBOUIsQ0FBNENqSSxNQUE3Rjs7QUFFQSxVQUFJeUgsU0FBUyxDQUFDaEcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCNEksYUFBOUIsSUFBK0MsSUFBbkQsRUFBeUQ7QUFDdkRoQixRQUFBQSxJQUFJLENBQUMzRixZQUFMLENBQWtCLGdCQUFsQixFQUFvQzRHLHVCQUFwQyxDQUE0RCxLQUE1RDtBQUNBakIsUUFBQUEsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0M2RyxjQUFwQyxDQUFtRG5CLFNBQVMsQ0FBQ2hHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QitJLFdBQWpGO0FBQ0QsT0FIRCxNQUlLO0FBQ0huQixRQUFBQSxJQUFJLENBQUMzRixZQUFMLENBQWtCLGdCQUFsQixFQUFvQzRHLHVCQUFwQyxDQUE0RCxJQUE1RDtBQUNBakIsUUFBQUEsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0M2RyxjQUFwQyxDQUFtRCxNQUFuRDtBQUNEOztBQUVEclYsTUFBQUEsOEJBQThCLENBQUN5UCxJQUEvQixDQUFvQzBFLElBQXBDO0FBRUQ7QUFDRixHQS9nQzhCO0FBaWhDL0JvQixFQUFBQSwwQ0FqaEMrQixzREFpaENZQyxJQWpoQ1osRUFpaENrQjtBQUMvQyxRQUFJdkIsUUFBUSxHQUFHcFUsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsRUFBZjs7QUFDQSxRQUFJeUcsWUFBWSxHQUFHbUMsUUFBUSxDQUFDbkQsYUFBVCxFQUFuQjs7QUFDQSxRQUFJb0QsU0FBUyxHQUFHclUsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEc0UsV0FBOUQsR0FBNEVrRyxnQkFBNUUsQ0FBNkZDLGlCQUE3RztBQUNBLFNBQUszQixxQ0FBTCxDQUEyQyxJQUEzQztBQUNBLFNBQUtsTCxrQkFBTCxDQUF3QjdCLGtCQUF4QixDQUEyQ3BFLE1BQTNDLEdBQW1Ec1IsU0FBUyxDQUFDdE4sVUFBN0Q7QUFDQSxTQUFLaUMsa0JBQUwsQ0FBd0I1QixrQkFBeEIsQ0FBMkNyRSxNQUEzQyxHQUFtRCxNQUFJc1IsU0FBUyxDQUFDN0gsSUFBakU7QUFDQSxTQUFLeEQsa0JBQUwsQ0FBd0IzQixtQkFBeEIsQ0FBNEN0RSxNQUE1QyxHQUFxRDRTLElBQXJEO0FBQ0QsR0F6aEM4QjtBQTJoQy9CRyxFQUFBQSxxQkEzaEMrQixtQ0EyaENQO0FBQ3RCLFNBQUszQixzQkFBTDtBQUNBLFNBQUtILDZCQUFMLENBQW1DLEtBQW5DO0FBQ0QsR0E5aEM4QjtBQWdpQy9CRyxFQUFBQSxzQkFoaUMrQixvQ0FpaUMvQjtBQUNFLFNBQUssSUFBSXpILEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHdk0sOEJBQThCLENBQUN5TSxNQUEzRCxFQUFtRUYsS0FBSyxFQUF4RSxFQUE0RTtBQUMxRXZNLE1BQUFBLDhCQUE4QixDQUFDdU0sS0FBRCxDQUE5QixDQUFzQ3FKLE9BQXRDO0FBQ0Q7O0FBQ0Q1VixJQUFBQSw4QkFBOEIsR0FBRyxFQUFqQztBQUNELEdBdGlDOEI7QUF3aUMvQjZWLEVBQUFBLDZCQXhpQytCLHlDQXdpQ0R4RyxLQXhpQ0MsRUF5aUMvQjtBQUNFblAsSUFBQUEsd0JBQXdCLEdBQUcsSUFBM0I7QUFDQUQsSUFBQUEsZUFBZSxHQUFHb1AsS0FBbEI7O0FBQ0EsUUFBSXlHLE1BQU0sR0FBR2pXLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4RHNFLFdBQTlELEVBQWI7O0FBQ0EsUUFBSXdHLEtBQUssR0FBRzFHLEtBQUssQ0FBQzJCLElBQU4sQ0FBV2dGLElBQXZCO0FBQ0EsUUFBSUMsV0FBVyxHQUFHNUcsS0FBSyxDQUFDMkIsSUFBTixDQUFXN0UsVUFBN0I7QUFDQSxRQUFJK0osc0JBQXNCLEdBQUc3RyxLQUFLLENBQUMyQixJQUFOLENBQVdtRixzQkFBeEM7QUFDQSxRQUFJQyxjQUFjLEdBQUcvRyxLQUFLLENBQUMyQixJQUFOLENBQVdxRixRQUFoQzs7QUFDQSxRQUFJQyxVQUFVLEdBQUdGLGNBQWMsR0FBRyxDQUFsQzs7QUFDQSxRQUFJRyxhQUFhLEdBQUcsRUFBcEI7QUFFQSxRQUFJTixXQUFXLENBQUMvSCxZQUFaLENBQXlCZ0ksc0JBQXpCLEVBQWlEM0ksWUFBakQsSUFBaUUsQ0FBckUsRUFDRWdKLGFBQWEsR0FBRyxZQUFoQixDQURGLEtBRUssSUFBSU4sV0FBVyxDQUFDL0gsWUFBWixDQUF5QmdJLHNCQUF6QixFQUFpRDNJLFlBQWpELElBQWlFLENBQXJFLEVBQ0hnSixhQUFhLEdBQUcsZ0JBQWhCOztBQUVGLFFBQUkxVyx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOER1TCxhQUE5RCxNQUFpRixLQUFyRixFQUNBO0FBQ0UsVUFBSWhCLElBQUksR0FBRyw0Q0FBNENTLFdBQVcsQ0FBQ3JQLFVBQXhELEdBQXFFLDRDQUFyRSxHQUFvSCxJQUFwSCxHQUEySCxJQUEzSCxHQUNULGlCQURTLEdBQ1dxUCxXQUFXLENBQUMvSCxZQUFaLENBQXlCZ0ksc0JBQXpCLEVBQWlEN0ksWUFENUQsR0FDMkUsSUFEM0UsR0FFVCxpQkFGUyxHQUVXa0osYUFGWCxHQUUyQixJQUYzQixHQUdULG1CQUhTLEdBR2FILGNBSGIsR0FHOEIsSUFIOUIsR0FJVCxpQkFKUyxHQUlXRSxVQUpYLEdBSXdCLElBSnhCLEdBSStCLElBSi9CLEdBS1QsdUlBTEY7O0FBT0EsV0FBS2YsMENBQUwsQ0FBZ0RDLElBQWhEO0FBQ0Q7QUFFRixHQXJrQzhCO0FBdWtDL0JpQixFQUFBQSw0QkF2a0MrQiwwQ0F3a0MvQjtBQUNFLFFBQUl4QyxRQUFRLEdBQUdwVSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUlxTCxVQUFVLEdBQUc3Vyx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOEQwTCxVQUE5RCxFQUFqQjs7QUFDQSxRQUFJYixNQUFNLEdBQUdqVyx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDQyx5QkFBbEMsR0FBOERzRSxXQUE5RCxHQUE0RWtHLGdCQUE1RSxDQUE2RkMsaUJBQTFHO0FBQ0EsUUFBSXJHLEtBQUssR0FBR3BQLGVBQVo7QUFDQSxRQUFJOFYsS0FBSyxHQUFHMUcsS0FBSyxDQUFDMkIsSUFBTixDQUFXZ0YsSUFBdkI7QUFDQSxRQUFJQyxXQUFXLEdBQUc1RyxLQUFLLENBQUMyQixJQUFOLENBQVc3RSxVQUE3QjtBQUNBLFFBQUkrSixzQkFBc0IsR0FBRzdHLEtBQUssQ0FBQzJCLElBQU4sQ0FBV21GLHNCQUF4QztBQUNBLFFBQUlDLGNBQWMsR0FBRy9HLEtBQUssQ0FBQzJCLElBQU4sQ0FBV3FGLFFBQWhDOztBQUNBLFFBQUlDLFVBQVUsR0FBR0YsY0FBYyxHQUFHLENBQWxDOztBQUNBLFFBQUlHLGFBQWEsR0FBRyxFQUFwQjs7QUFFQSxRQUFJSyxPQUFPLEdBQUczQyxRQUFRLENBQUM0QyxVQUFULEVBQWQ7O0FBRUEsUUFBSTNXLHdCQUF3QixJQUFJLElBQWhDLEVBQXNDO0FBQ3BDLFVBQUkrVCxRQUFRLENBQUN6SCxjQUFULENBQXdCb0ssT0FBeEIsRUFBaUN2SyxJQUFqQyxJQUF5Q2lLLFVBQTdDLEVBQXlEO0FBQ3ZEckMsUUFBQUEsUUFBUSxDQUFDekgsY0FBVCxDQUF3Qm9LLE9BQXhCLEVBQWlDdkssSUFBakMsSUFBeUNpSyxVQUF6QztBQUNBelcsUUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEc0UsV0FBOUQsR0FBNEVRLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUhrRSxRQUFRLENBQUN6SCxjQUFULENBQXdCb0ssT0FBeEIsQ0FBbkg7QUFDQSxhQUFLRSx5Q0FBTCxDQUErQyxJQUEvQyxFQUFxRFIsVUFBckQsRUFBaUUsS0FBakUsRUFBd0VyQyxRQUFRLENBQUN6SCxjQUFULENBQXdCb0ssT0FBeEIsRUFBaUNoSyxTQUF6RyxFQUFvSHFILFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JvSyxPQUF4QixDQUFwSCxFQUFzSlYsc0JBQXRKO0FBQ0EsYUFBS25DLHFDQUFMLENBQTJDLEtBQTNDO0FBQ0EsYUFBSzNGLFNBQUwsQ0FBZSx3REFBZixFQUF3RSxJQUF4RTtBQUNELE9BTkQsTUFNTztBQUNMLGFBQUtBLFNBQUwsQ0FBZSxrQkFBZixFQUFtQyxHQUFuQztBQUNEO0FBQ0YsS0FWRCxNQVdBO0FBQ0UsV0FBS0EsU0FBTCxDQUFlLDBDQUFmO0FBQ0EsV0FBSzJGLHFDQUFMLENBQTJDLEtBQTNDO0FBQ0M7QUFDSixHQXJtQzhCO0FBdW1DL0JnRCxFQUFBQSw0QkF2bUMrQiwwQ0F3bUMvQjtBQUNFLFFBQUk5QyxRQUFRLEdBQUdwVSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUlnRSxLQUFLLEdBQUdwUCxlQUFaO0FBQ0EsUUFBSWlXLHNCQUFzQixHQUFHN0csS0FBSyxDQUFDMkIsSUFBTixDQUFXbUYsc0JBQXhDOztBQUNBLFFBQUlTLE9BQU8sR0FBRzNDLFFBQVEsQ0FBQzRDLFVBQVQsRUFBZDs7QUFDQW5ILElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZc0UsUUFBUSxDQUFDekgsY0FBVCxDQUF3Qm9LLE9BQXhCLEVBQWlDaEssU0FBN0M7O0FBQ0EsUUFBSTFNLHdCQUF3QixJQUFJLElBQWhDLEVBQXNDO0FBQ2xDLFdBQUs0Vyx5Q0FBTCxDQUErQyxLQUEvQyxFQUFzRCxDQUF0RCxFQUF5RCxJQUF6RCxFQUErRDdDLFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JvSyxPQUF4QixFQUFpQ2hLLFNBQWhHLEVBQTJHcUgsUUFBUSxDQUFDekgsY0FBVCxDQUF3Qm9LLE9BQXhCLENBQTNHLEVBQTZJVixzQkFBN0k7QUFDQSxXQUFLbkMscUNBQUwsQ0FBMkMsS0FBM0M7QUFDQSxXQUFLM0YsU0FBTCxDQUFlLCtCQUFmLEVBQStDLElBQS9DO0FBQ0gsS0FKRCxNQUtBO0FBQ0UsV0FBSzJGLHFDQUFMLENBQTJDLEtBQTNDO0FBQ0EsV0FBSzNGLFNBQUwsQ0FBZSwrQkFBZixFQUErQyxJQUEvQztBQUNEO0FBQ0YsR0F2bkM4QjtBQXluQy9CMEksRUFBQUEseUNBem5DK0IscURBeW5DV0UsV0F6bkNYLEVBeW5DNkJDLFFBem5DN0IsRUF5bkN3Q0MsWUF6bkN4QyxFQXluQzJEQyxJQXpuQzNELEVBeW5DbUU5SCxLQXpuQ25FLEVBeW5DOEVwQixjQXpuQzlFLEVBMG5DL0I7QUFBQSxRQUQwQytJLFdBQzFDO0FBRDBDQSxNQUFBQSxXQUMxQyxHQURzRCxLQUN0RDtBQUFBOztBQUFBLFFBRDREQyxRQUM1RDtBQUQ0REEsTUFBQUEsUUFDNUQsR0FEcUUsQ0FDckU7QUFBQTs7QUFBQSxRQUR1RUMsWUFDdkU7QUFEdUVBLE1BQUFBLFlBQ3ZFLEdBRG9GLEtBQ3BGO0FBQUE7O0FBQUEsUUFEMEZDLElBQzFGO0FBRDBGQSxNQUFBQSxJQUMxRixHQUQrRixFQUMvRjtBQUFBOztBQUFBLFFBRGtHOUgsS0FDbEc7QUFEa0dBLE1BQUFBLEtBQ2xHLEdBRHdHLElBQ3hHO0FBQUE7O0FBQUEsUUFENkdwQixjQUM3RztBQUQ2R0EsTUFBQUEsY0FDN0csR0FENEgsQ0FDNUg7QUFBQTs7QUFDRSxRQUFJbUosU0FBUyxHQUFHO0FBQUVwRyxNQUFBQSxJQUFJLEVBQUU7QUFBRXFHLFFBQUFBLFFBQVEsRUFBRUwsV0FBWjtBQUF5Qk0sUUFBQUEsV0FBVyxFQUFDTCxRQUFyQztBQUE4Q00sUUFBQUEsU0FBUyxFQUFDTCxZQUF4RDtBQUFxRU0sUUFBQUEsUUFBUSxFQUFDTCxJQUE5RTtBQUFtRmhMLFFBQUFBLFVBQVUsRUFBQ2tELEtBQTlGO0FBQW9Hb0ksUUFBQUEsYUFBYSxFQUFDeEo7QUFBbEg7QUFBUixLQUFoQjtBQUNBcE8sSUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ1EsMEJBQWxDLEdBQStEdUYsVUFBL0QsQ0FBMEUsRUFBMUUsRUFBOEVxRyxTQUE5RTtBQUNELEdBN25DOEI7QUErbkMvQk0sRUFBQUEsMkNBL25DK0IsdURBK25DYXJJLEtBL25DYixFQWdvQy9CO0FBQ0UsUUFBSXhQLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4RHVMLGFBQTlELE1BQWlGLEtBQXJGLEVBQTRGO0FBQzFGLFVBQUl2QyxRQUFRLEdBQUdwVSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFVBQUl5RyxZQUFZLEdBQUdtQyxRQUFRLENBQUNuRCxhQUFULEVBQW5COztBQUVBcEIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlOLEtBQVo7QUFDQSxVQUFJc0ksU0FBUyxHQUFHdEksS0FBSyxDQUFDMkIsSUFBTixDQUFXcUcsUUFBM0I7QUFDQSxVQUFJTyxLQUFLLEdBQUd2SSxLQUFLLENBQUMyQixJQUFOLENBQVdzRyxXQUF2QjtBQUNBLFVBQUlPLFVBQVUsR0FBR3hJLEtBQUssQ0FBQzJCLElBQU4sQ0FBV3VHLFNBQTVCO0FBQ0EsVUFBSU8sSUFBSSxHQUFHekksS0FBSyxDQUFDMkIsSUFBTixDQUFXd0csUUFBdEI7QUFDQSxVQUFJdkIsV0FBVyxHQUFHNUcsS0FBSyxDQUFDMkIsSUFBTixDQUFXN0UsVUFBN0I7QUFDQSxVQUFJOEIsY0FBYyxHQUFHb0IsS0FBSyxDQUFDMkIsSUFBTixDQUFXeUcsYUFBaEM7QUFFQS9ILE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaOztBQUNBLFVBQUdzRSxRQUFRLENBQUN6SCxjQUFULENBQXdCc0YsWUFBeEIsRUFBc0NsRixTQUF0QyxJQUFpRC9NLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4RHNFLFdBQTlELEdBQTRFa0csZ0JBQTVFLENBQTZGekUsSUFBN0YsQ0FBa0dyRSxNQUF0SixFQUNBO0FBQ0UsWUFBSWdMLFNBQUosRUFBZTtBQUNiLGVBQUs5RCw2QkFBTCxDQUFtQyxLQUFuQztBQUNBLGVBQUtDLG9DQUFMLENBQTBDLEtBQTFDO0FBQ0FHLFVBQUFBLFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JzRixZQUF4QixFQUFzQ3pGLElBQXRDLElBQThDdUwsS0FBOUM7QUFDQTNELFVBQUFBLFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JzRixZQUF4QixFQUFzQzVELFlBQXRDLENBQW1ERCxjQUFuRCxFQUFtRWtILGFBQW5FLEdBQW1GLElBQW5GO0FBQ0FsQixVQUFBQSxRQUFRLENBQUN6SCxjQUFULENBQXdCc0YsWUFBeEIsRUFBc0M1RCxZQUF0QyxDQUFtREQsY0FBbkQsRUFBbUU4SixTQUFuRSxHQUErRUQsSUFBL0U7QUFDQTdELFVBQUFBLFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JzRixZQUF4QixFQUFzQzVELFlBQXRDLENBQW1ERCxjQUFuRCxFQUFtRXFILFdBQW5FLEdBQWlGVyxXQUFXLENBQUNyUCxVQUE3RjtBQUNBL0csVUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0MseUJBQWxDLEdBQThEc0UsV0FBOUQsR0FBNEVRLGlCQUE1RSxDQUE4RixtQkFBOUYsRUFBbUhrRSxRQUFRLENBQUN6SCxjQUFULENBQXdCc0YsWUFBeEIsQ0FBbkg7QUFFQXBDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaO0FBQ0EsZUFBS3ZCLFNBQUwsQ0FBZSxpREFBaUQ2SCxXQUFXLENBQUNyUCxVQUE3RCxHQUEwRSxVQUExRSxHQUF1RmdSLEtBQXZGLEdBQStGLGtDQUE5RyxFQUFrSixJQUFsSjtBQUNBLGVBQUtqRyx1QkFBTDtBQUNELFNBWkQsTUFZTyxJQUFJa0csVUFBSixFQUFnQjtBQUNyQixjQUFJMVgsV0FBVyxDQUFDNlgsUUFBWixDQUFxQkYsSUFBckIsS0FBOEIsS0FBbEMsRUFDSTNYLFdBQVcsQ0FBQ3NQLElBQVosQ0FBaUJxSSxJQUFqQjtBQUVKcEksVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl4UCxXQUFaOztBQUNBLGNBQUlBLFdBQVcsQ0FBQ3NNLE1BQVosSUFBc0J3SCxRQUFRLENBQUN6SCxjQUFULENBQXdCQyxNQUF4QixHQUFpQyxDQUEzRCxFQUE4RDtBQUM1RCxpQkFBS29ILDZCQUFMLENBQW1DLEtBQW5DO0FBQ0EsaUJBQUtDLG9DQUFMLENBQTBDLEtBQTFDO0FBQ0EsaUJBQUsxRixTQUFMLENBQWUsK0RBQWYsRUFBZ0YsSUFBaEY7QUFDRDs7QUFFRHNCLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaO0FBQ0Q7QUFDRixPQTNCRCxNQTJCTztBQUNMLFlBQUlnSSxTQUFKLEVBQWU7QUFDYnpYLFVBQUFBLHdCQUF3QixHQUFHLEtBQTNCO0FBQ0EsZUFBS2tPLFNBQUwsQ0FBZSwwQ0FBZixFQUEyRCxJQUEzRDtBQUNBLGVBQUsyRixxQ0FBTCxDQUEyQyxLQUEzQztBQUNELFNBSkQsTUFJTyxJQUFJOEQsVUFBSixFQUFnQixDQUN0QjtBQUNGO0FBQ0Y7QUFDRixHQWxyQzhCO0FBbXJDL0I7QUFFQTtBQUVBSSxFQUFBQSxjQXZyQytCLDRCQXVyQ2Q7QUFDZixTQUFLcFYsbUJBQUwsQ0FBeUJFLFdBQXpCLENBQXFDSCxNQUFyQyxHQUE4QyxFQUE5QztBQUNBNkUsSUFBQUEsY0FBYyxHQUFHLEVBQWpCO0FBQ0QsR0ExckM4QjtBQTRyQy9CeUwsRUFBQUEsMkJBNXJDK0IseUNBNHJDRDtBQUM1QixTQUFLclEsbUJBQUwsQ0FBeUJHLFlBQXpCLENBQXNDSixNQUF0QyxHQUErQyxFQUEvQztBQUNBK0UsSUFBQUEsaUJBQWlCLEdBQUcsRUFBcEI7QUFDRCxHQS9yQzhCO0FBaXNDL0J1USxFQUFBQSwwQkFqc0MrQixzQ0Fpc0NKaEksT0Fqc0NJLEVBaXNDSztBQUNsQ3hJLElBQUFBLGtCQUFrQixHQUFHd0ksT0FBckI7O0FBRUEsUUFBSXhJLGtCQUFrQixJQUFJLEVBQTFCLEVBQThCO0FBQzVCLFdBQUt5USxxQkFBTCxDQUEyQnRRLFdBQVcsR0FBRyxNQUF6QztBQUNELEtBRkQsTUFFTztBQUNMLFVBQUlxSSxPQUFPLEdBQUczQixRQUFRLENBQUM3RyxrQkFBRCxDQUF0Qjs7QUFDQSxVQUFJd0ksT0FBTyxHQUFHckksV0FBVyxHQUFHcUksT0FBNUI7O0FBQ0EsV0FBS2lJLHFCQUFMLENBQ0V0USxXQUFXLEdBQUcsR0FBZCxHQUFvQkgsa0JBQXBCLEdBQXlDLEdBQXpDLEdBQStDd0ksT0FEakQ7QUFHRDtBQUNGLEdBN3NDOEI7QUErc0MvQjJDLEVBQUFBLGlDQS9zQytCLDZDQStzQ0cvSCxNQS9zQ0gsRUErc0NXO0FBQ3hDLFNBQUs5QixnQkFBTCxDQUFzQjJCLE1BQXRCLEdBQStCRyxNQUEvQjtBQUNBLFNBQUs2Ryx1QkFBTDtBQUNBLFNBQUtzRyxjQUFMO0FBQ0EsU0FBSy9FLDJCQUFMO0FBQ0QsR0FwdEM4QjtBQXN0Qy9CSCxFQUFBQSxxQkF0dEMrQixpQ0F1dEM3QnFGLE1BdnRDNkIsRUF3dEM3QkMsV0F4dEM2QixFQXl0QzdCQyxXQXp0QzZCLEVBMHRDN0JDLFdBMXRDNkIsRUEydEM3QkMsZUEzdEM2QixFQTR0QzdCQyxpQkE1dEM2QixFQTZ0QzdCQyxpQkE3dEM2QixFQTh0QzdCQyxXQTl0QzZCLEVBK3RDN0I3TixNQS90QzZCLEVBZ3VDN0I7QUFDQSxTQUFLcEIsZUFBTDtBQUNBLFNBQUtuQixpQkFBTCxDQUF1QmxFLGFBQXZCLENBQXFDekIsTUFBckMsR0FBOEMsRUFBOUM7QUFDQSxTQUFLMkYsaUJBQUwsQ0FBdUIzRSxVQUF2QixDQUFrQ2hCLE1BQWxDLEdBQTJDd1YsTUFBM0M7QUFDQSxTQUFLN1AsaUJBQUwsQ0FBdUIxRSxlQUF2QixDQUF1Q2pCLE1BQXZDLEdBQWdEeVYsV0FBaEQ7QUFDQSxTQUFLOVAsaUJBQUwsQ0FBdUJ6RSxlQUF2QixDQUF1Q2xCLE1BQXZDLEdBQWdEMFYsV0FBaEQ7QUFDQSxTQUFLL1AsaUJBQUwsQ0FBdUJ4RSxlQUF2QixDQUF1Q25CLE1BQXZDLEdBQWdEMlYsV0FBaEQ7QUFDQSxTQUFLaFEsaUJBQUwsQ0FBdUJ2RSxtQkFBdkIsQ0FBMkNwQixNQUEzQyxHQUFvRDRWLGVBQXBEO0FBQ0EsU0FBS2pRLGlCQUFMLENBQXVCdEUscUJBQXZCLENBQTZDckIsTUFBN0MsR0FBc0Q2VixpQkFBdEQ7QUFDQSxTQUFLbFEsaUJBQUwsQ0FBdUJyRSxxQkFBdkIsQ0FBNkN0QixNQUE3QyxHQUFzRDhWLGlCQUF0RDtBQUNBLFNBQUtuUSxpQkFBTCxDQUF1QnBFLGVBQXZCLENBQXVDdkIsTUFBdkMsR0FBZ0QrVixXQUFoRDtBQUNELEdBM3VDOEI7QUE2dUMvQlIsRUFBQUEscUJBN3VDK0IsaUNBNnVDVE8saUJBN3VDUyxFQTZ1Q1U7QUFDdkMsU0FBS25RLGlCQUFMLENBQXVCckUscUJBQXZCLENBQTZDdEIsTUFBN0MsR0FBc0Q4VixpQkFBdEQ7QUFDRCxHQS91QzhCO0FBaXZDL0JFLEVBQUFBLHNCQWp2QytCLG9DQWl2Q047QUFBQTs7QUFDdkIsUUFBSWxSLGtCQUFrQixJQUFJLEVBQTFCLEVBQThCO0FBQzVCLFdBQUswRyxTQUFMLENBQWUseUJBQWY7QUFDRCxLQUZELE1BRU87QUFDTCxVQUFJMEQsWUFBWSxHQUFHalMsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0R5RixhQUFwRCxFQUFuQjs7QUFFQSxVQUFJLEtBQUt2SSxpQkFBTCxDQUF1Qm5FLFdBQXZCLElBQXNDZCxVQUFVLENBQUNFLFVBQXJELEVBQWlFO0FBQy9ELFlBQUkwTSxPQUFPLEdBQUczQixRQUFRLENBQUM3RyxrQkFBRCxDQUF0Qjs7QUFDQSxZQUFJbVIsWUFBWSxHQUFHaFIsV0FBVyxHQUFHcUksT0FBakM7O0FBQ0EsWUFDRTJJLFlBQVksSUFDWmhaLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FDRXNGLFlBREYsRUFFRXpGLElBSkosRUFLRTtBQUNBeE0sVUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFekYsSUFGRixHQUdFeE0sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFekYsSUFGRixHQUVTd00sWUFMWDtBQU1BaFosVUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFc0IsU0FGRixHQUdFdlQsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFc0IsU0FGRixHQUVjbEQsT0FMaEI7QUFNQSxlQUFLOUIsU0FBTCxDQUNFLGtDQUFrQzhCLE9BQWxDLEdBQTRDLGlCQUQ5QyxFQUVFLElBRkY7QUFJQTlFLFVBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsWUFBQSxNQUFJLENBQUN5SCxpQ0FBTCxDQUF1QyxLQUF2QztBQUNELFdBRlMsRUFFUCxJQUZPLENBQVY7QUFHRCxTQXpCRCxNQXlCTztBQUNMLGVBQUtzRixxQkFBTCxDQUEyQnRRLFdBQVcsR0FBRyxNQUF6QztBQUNBSCxVQUFBQSxrQkFBa0IsR0FBRyxFQUFyQjtBQUNBLGVBQUthLGlCQUFMLENBQXVCbEUsYUFBdkIsQ0FBcUN6QixNQUFyQyxHQUE4QyxFQUE5QztBQUNBLGVBQUt3TCxTQUFMLENBQWUsNkJBQWY7QUFDRDtBQUNGLE9BbENELE1Ba0NPLElBQUksS0FBSzdGLGlCQUFMLENBQXVCbkUsV0FBdkIsSUFBc0NkLFVBQVUsQ0FBQ0ksUUFBckQsRUFBK0Q7QUFDcEUsWUFBSXdNLE9BQU8sR0FBRzNCLFFBQVEsQ0FBQzdHLGtCQUFELENBQXRCOztBQUNBLFlBQ0V3SSxPQUFPLElBQ1ByUSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUVzQixTQUpKLEVBS0U7QUFDQSxjQUFJeUYsWUFBWSxHQUFHaFIsV0FBVyxHQUFHcUksT0FBakM7O0FBQ0FyUSxVQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQUZGLEdBR0V4TSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQUZGLEdBRVN3TSxZQUxYO0FBTUFoWixVQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUVzQixTQUZGLEdBR0V2VCx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUVzQixTQUZGLEdBRWNsRCxPQUxoQjtBQU1BLGVBQUs5QixTQUFMLENBQ0UsZ0NBQ0U4QixPQURGLEdBRUUsd0JBRkYsR0FHRTJJLFlBSkosRUFLRSxJQUxGO0FBT0F6TixVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFlBQUEsTUFBSSxDQUFDeUgsaUNBQUwsQ0FBdUMsS0FBdkM7QUFDRCxXQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsU0E3QkQsTUE2Qk87QUFDTCxlQUFLc0YscUJBQUwsQ0FBMkJ0USxXQUFXLEdBQUcsTUFBekM7QUFDQUgsVUFBQUEsa0JBQWtCLEdBQUcsRUFBckI7QUFDQSxlQUFLYSxpQkFBTCxDQUF1QmxFLGFBQXZCLENBQXFDekIsTUFBckMsR0FBOEMsRUFBOUM7QUFDQSxlQUFLd0wsU0FBTCxDQUNFLGdEQUNFdk8sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FDR21CLGNBREgsQ0FDa0JzRixZQURsQixFQUNnQ3NCLFNBRmxDLEdBR0UsaUJBSko7QUFNRDtBQUNGLE9BMUNNLE1BMENBLElBQUksS0FBSzdLLGlCQUFMLENBQXVCbkUsV0FBdkIsSUFBc0NkLFVBQVUsQ0FBQ0MsV0FBckQsRUFBa0U7QUFDdkUsWUFBSTJNLE9BQU8sR0FBRzNCLFFBQVEsQ0FBQzdHLGtCQUFELENBQXRCOztBQUNBLFlBQUltUixZQUFZLEdBQUdoUixXQUFXLEdBQUdxSSxPQUFqQzs7QUFDQSxZQUNFMkksWUFBWSxJQUNaaFosd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFekYsSUFKSixFQUtFO0FBQ0F4TSxVQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQUZGLEdBR0V4TSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQUZGLEdBRVN3TSxZQUxYO0FBTUFoWixVQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV3QixVQUZGLEdBR0V6VCx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV3QixVQUZGLEdBRWVwRCxPQUxqQixDQVBBLENBYUE7O0FBRUEsZUFBSzlCLFNBQUwsQ0FDRSxrQ0FDRThCLE9BREYsR0FFRSxzQkFGRixHQUdFdkksaUJBSkosRUFLRSxJQUxGO0FBT0F5RCxVQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFlBQUEsTUFBSSxDQUFDeUgsaUNBQUwsQ0FBdUMsS0FBdkM7QUFDRCxXQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0QsU0E5QkQsTUE4Qk87QUFDTCxlQUFLc0YscUJBQUwsQ0FBMkJ0USxXQUFXLEdBQUcsTUFBekM7QUFDQUgsVUFBQUEsa0JBQWtCLEdBQUcsRUFBckI7QUFDQSxlQUFLYSxpQkFBTCxDQUF1QmxFLGFBQXZCLENBQXFDekIsTUFBckMsR0FBOEMsRUFBOUM7QUFDQSxlQUFLd0wsU0FBTCxDQUFlLDZCQUFmO0FBQ0Q7QUFDRixPQXZDTSxNQXVDQSxJQUFJLEtBQUs3RixpQkFBTCxDQUF1Qm5FLFdBQXZCLElBQXNDZCxVQUFVLENBQUNHLFNBQXJELEVBQWdFO0FBQ3JFLFlBQUl5TSxPQUFPLEdBQUczQixRQUFRLENBQUM3RyxrQkFBRCxDQUF0Qjs7QUFFQSxZQUNFd0ksT0FBTyxJQUNQclEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFd0IsVUFKSixFQUtFO0FBQ0EsY0FBSXVGLFlBQVksR0FBR2hSLFdBQVcsR0FBR3FJLE9BQWpDOztBQUNBclEsVUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFekYsSUFGRixHQUdFeE0sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFekYsSUFGRixHQUVTd00sWUFMWDtBQU1BaFosVUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFd0IsVUFGRixHQUdFelQsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUNFc0YsWUFERixFQUVFd0IsVUFGRixHQUVlcEQsT0FMakI7QUFPQSxlQUFLOUIsU0FBTCxDQUNFLGdDQUNFOEIsT0FERixHQUVFLHlCQUZGLEdBR0UySSxZQUpKLEVBS0UsSUFMRjtBQU9Bek4sVUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixZQUFBLE1BQUksQ0FBQ3lILGlDQUFMLENBQXVDLEtBQXZDO0FBQ0QsV0FGUyxFQUVQLElBRk8sQ0FBVjtBQUdELFNBOUJELE1BOEJPO0FBQ0wsZUFBS3NGLHFCQUFMLENBQTJCdFEsV0FBVyxHQUFHLE1BQXpDO0FBQ0FILFVBQUFBLGtCQUFrQixHQUFHLEVBQXJCO0FBQ0EsZUFBS2EsaUJBQUwsQ0FBdUJsRSxhQUF2QixDQUFxQ3pCLE1BQXJDLEdBQThDLEVBQTlDO0FBQ0EsZUFBS3dMLFNBQUwsQ0FDRSxrREFDRXZPLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQ0dtQixjQURILENBQ2tCc0YsWUFEbEIsRUFDZ0N3QixVQUZsQyxHQUdFLGtCQUpKO0FBTUQ7QUFDRjtBQUNGO0FBQ0YsR0F4NUM4QjtBQTA1Qy9Cd0YsRUFBQUEscUJBMTVDK0IsbUNBMDVDUDtBQUN0QixTQUFLakcsaUNBQUwsQ0FBdUMsS0FBdkM7QUFDRCxHQTU1QzhCO0FBNjVDL0I7QUFFQTtBQUNBa0csRUFBQUEseUJBaDZDK0IscUNBZzZDTGpPLE1BaDZDSyxFQWc2Q0c7QUFDaEMsU0FBSzdCLFlBQUwsQ0FBa0IwQixNQUFsQixHQUEyQkcsTUFBM0I7QUFDRCxHQWw2QzhCO0FBbzZDL0JrTyxFQUFBQSw4QkFwNkMrQiwwQ0FvNkNBbE8sTUFwNkNBLEVBbzZDUTtBQUNyQyxTQUFLdEMsYUFBTCxDQUFtQmxELGVBQW5CLENBQW1DcUYsTUFBbkMsR0FBNENHLE1BQTVDO0FBQ0QsR0F0NkM4QjtBQXc2Qy9CbU8sRUFBQUEsb0JBeDZDK0IsZ0NBdzZDVkMsUUF4NkNVLEVBdzZDQUMsUUF4NkNBLEVBdzZDVUMsU0F4NkNWLEVBdzZDcUI7QUFDbEQsUUFBSUYsUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ2pCblIsTUFBQUEseUJBQXlCLEdBQUcsSUFBNUI7QUFDQSxXQUFLUyxhQUFMLENBQW1CdEQsWUFBbkIsQ0FBZ0NzSixZQUFoQyxDQUNFbk8sRUFBRSxDQUFDZ1osTUFETCxFQUVFQyxZQUZGLEdBRWlCLEtBRmpCO0FBR0QsS0FMRCxNQUtPO0FBQ0x2UixNQUFBQSx5QkFBeUIsR0FBRyxLQUE1QjtBQUNBLFdBQUtTLGFBQUwsQ0FBbUJ0RCxZQUFuQixDQUFnQ3NKLFlBQWhDLENBQ0VuTyxFQUFFLENBQUNnWixNQURMLEVBRUVDLFlBRkYsR0FFaUIsSUFGakI7QUFHRDs7QUFFRCxRQUFJSCxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDakJuUixNQUFBQSwyQkFBMkIsR0FBRyxJQUE5QjtBQUNBLFdBQUtRLGFBQUwsQ0FBbUJyRCxLQUFuQixDQUF5QnFKLFlBQXpCLENBQXNDbk8sRUFBRSxDQUFDZ1osTUFBekMsRUFBaURDLFlBQWpELEdBQWdFLEtBQWhFO0FBQ0QsS0FIRCxNQUdPO0FBQ0x0UixNQUFBQSwyQkFBMkIsR0FBRyxLQUE5QjtBQUNBLFdBQUtRLGFBQUwsQ0FBbUJyRCxLQUFuQixDQUF5QnFKLFlBQXpCLENBQXNDbk8sRUFBRSxDQUFDZ1osTUFBekMsRUFBaURDLFlBQWpELEdBQWdFLElBQWhFO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDRixTQUFMLEVBQWdCO0FBQ2RuUixNQUFBQSxTQUFTLEdBQUcsSUFBWjtBQUNBLFdBQUtPLGFBQUwsQ0FBbUJwRCxPQUFuQixDQUEyQm9KLFlBQTNCLENBQXdDbk8sRUFBRSxDQUFDZ1osTUFBM0MsRUFBbURDLFlBQW5ELEdBQWtFLEtBQWxFO0FBQ0QsS0FIRCxNQUdPO0FBQ0xyUixNQUFBQSxTQUFTLEdBQUcsS0FBWjtBQUNBLFdBQUtPLGFBQUwsQ0FBbUJwRCxPQUFuQixDQUEyQm9KLFlBQTNCLENBQXdDbk8sRUFBRSxDQUFDZ1osTUFBM0MsRUFBbURDLFlBQW5ELEdBQWtFLElBQWxFO0FBQ0Q7QUFDRixHQXA4QzhCO0FBczhDL0JDLEVBQUFBLG9CQXQ4QytCLGtDQXM4Q1I7QUFDckIsUUFBSXRGLFFBQVEsR0FBR3BVLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEVBQWY7O0FBQ0EsUUFBSXlHLFlBQVksR0FBR2pTLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EeUYsYUFBcEQsRUFBbkI7O0FBRUEsUUFBSTBJLEtBQUssR0FBRyxDQUFaOztBQUNBLFNBQ0UsSUFBSWpOLEtBQUssR0FBRyxDQURkLEVBRUVBLEtBQUssR0FBRzBILFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JzRixZQUF4QixFQUFzQzVELFlBQXRDLENBQW1EekIsTUFGN0QsRUFHRUYsS0FBSyxFQUhQLEVBSUU7QUFDQSxVQUFJMEgsUUFBUSxDQUFDekgsY0FBVCxDQUF3QnNGLFlBQXhCLEVBQXNDNUQsWUFBdEMsQ0FBbUQzQixLQUFuRCxFQUEwRDRCLFNBQTlELEVBQXlFO0FBQ3ZFcUwsUUFBQUEsS0FBSyxHQUNIdkYsUUFBUSxDQUFDekgsY0FBVCxDQUF3QnNGLFlBQXhCLEVBQXNDNUQsWUFBdEMsQ0FBbUQzQixLQUFuRCxFQUEwRGpLLFVBRDVEO0FBRUE7QUFDRDtBQUNGOztBQUNELFdBQU9rWCxLQUFQO0FBQ0QsR0F2OUM4QjtBQXk5Qy9CQyxFQUFBQSxpQkF6OUMrQiw2QkF5OUNickIsTUF6OUNhLEVBeTlDTnNCLGVBejlDTSxFQXk5Q2tCQyxPQXo5Q2xCLEVBeTlDa0NDLE9BejlDbEMsRUF5OUNrREMsTUF6OUNsRCxFQXk5Q2tFO0FBQUE7O0FBQUEsUUFBeEVILGVBQXdFO0FBQXhFQSxNQUFBQSxlQUF3RSxHQUF0RCxLQUFzRDtBQUFBOztBQUFBLFFBQWhEQyxPQUFnRDtBQUFoREEsTUFBQUEsT0FBZ0QsR0FBdEMsS0FBc0M7QUFBQTs7QUFBQSxRQUFoQ0MsT0FBZ0M7QUFBaENBLE1BQUFBLE9BQWdDLEdBQXRCLEtBQXNCO0FBQUE7O0FBQUEsUUFBaEJDLE1BQWdCO0FBQWhCQSxNQUFBQSxNQUFnQixHQUFQLEtBQU87QUFBQTs7QUFDL0YsU0FBSzlQLFNBQUwsR0FBaUI4UCxNQUFqQjtBQUNBMVIsSUFBQUEsWUFBWSxHQUFHdVIsZUFBZjtBQUNBLFNBQUtYLHlCQUFMLENBQStCLElBQS9CO0FBQ0EsU0FBS3ZRLGFBQUwsQ0FBbUI1RSxVQUFuQixDQUE4QmhCLE1BQTlCLEdBQXVDd1YsTUFBdkM7QUFDQSxRQUFJMEIsS0FBSyxHQUFHLElBQVo7O0FBRUEsUUFBSUQsTUFBTSxJQUFJLEtBQWQsRUFBcUI7QUFDbkI7QUFDQSxVQUFJRixPQUFPLElBQUlDLE9BQWYsRUFDRSxLQUFLeEwsU0FBTCxDQUFlLDJFQUFmLEVBQTJGMEwsS0FBM0YsRUFERixLQUVLLElBQUlILE9BQUosRUFDSCxLQUFLdkwsU0FBTCxDQUFlLHdEQUFmLEVBQXdFMEwsS0FBeEUsRUFERyxLQUVBLElBQUlGLE9BQUosRUFDSCxLQUFLeEwsU0FBTCxDQUFlLDREQUFmLEVBQTRFMEwsS0FBNUU7QUFDSCxLQVJELE1BUU87QUFDTDtBQUNBLFVBQUlILE9BQU8sSUFBSUMsT0FBZixFQUNFbEssT0FBTyxDQUFDQyxHQUFSLENBQVksMkVBQVosRUFERixLQUVLLElBQUlnSyxPQUFKLEVBQ0hqSyxPQUFPLENBQUNDLEdBQVIsQ0FBWSx3REFBWixFQURHLEtBRUEsSUFBSWlLLE9BQUosRUFDSGxLLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDREQUFaO0FBQ0g7O0FBRUQsUUFBSW1DLFlBQVksR0FBR2pTLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EeUYsYUFBcEQsRUFBbkI7O0FBQ0EsU0FBS2lKLGlCQUFMLENBQ0VsYSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQW1Fc0YsWUFBbkUsRUFBaUZ6RixJQURuRjs7QUFJQSxRQUFJNk0sUUFBUSxHQUFHclosd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUFtRXNGLFlBQW5FLEVBQWlGekIsZUFBaEc7O0FBQ0EsUUFBSThJLFFBQVEsR0FBR3RaLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FBbUVzRixZQUFuRSxFQUFpRnZCLG9CQUFoRzs7QUFDQSxRQUFJeUosV0FBVyxHQUFHbmEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUFtRXNGLFlBQW5FLEVBQWlGbUksb0JBQW5HOztBQUVBLFFBQUlqTSxVQUFVLEdBQUcsS0FBakI7QUFDQSxRQUFJQyxjQUFjLEdBQUcsQ0FBckI7O0FBRUEsU0FBSyxJQUFJMUIsS0FBSyxHQUFHLENBQWpCLEVBQW1CQSxLQUFLLEdBQUUxTSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQW1Fc0YsWUFBbkUsRUFBaUY1RCxZQUFqRixDQUE4RnpCLE1BQXhILEVBQStIRixLQUFLLEVBQXBJLEVBQXdJO0FBQ3RJLFVBQUkxTSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQW1Fc0YsWUFBbkUsRUFBaUY1RCxZQUFqRixDQUE4RjNCLEtBQTlGLEVBQXFHNEIsU0FBekcsRUFBb0g7QUFDbEhILFFBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0FDLFFBQUFBLGNBQWMsR0FBRzFCLEtBQWpCO0FBQ0E7QUFDRDtBQUNGOztBQUVELFFBQUk2TSxTQUFTLEdBQUdwTCxVQUFoQjtBQUVBLFNBQUt4RixhQUFMLENBQW1CekQsb0JBQW5CLENBQXdDbkMsTUFBeEMsR0FBaURzVyxRQUFqRDtBQUNBLFNBQUsxUSxhQUFMLENBQW1CeEQsYUFBbkIsQ0FBaUNwQyxNQUFqQyxHQUEwQ3VXLFFBQTFDO0FBQ0EsU0FBSzNRLGFBQUwsQ0FBbUJ2RCxxQkFBbkIsQ0FBeUNyQyxNQUF6QyxHQUFrRG9YLFdBQWxEOztBQUVBLFFBQUkvRixRQUFRLEdBQUdwVSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxFQUFmOztBQUNBLFFBQUl5RyxZQUFZLEdBQUdqUyx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHlGLGFBQXBELEVBQW5CLENBcEQrRixDQXNEL0Y7OztBQUNBLFFBQUltRCxRQUFRLENBQUN6SCxjQUFULENBQXdCc0YsWUFBeEIsRUFBc0NvSSxrQkFBMUMsRUFBOEQ7QUFDNUQsVUFBSVYsS0FBSyxHQUFHLEtBQUtELG9CQUFMLEVBQVo7O0FBQ0EsV0FBSy9RLGFBQUwsQ0FBbUI1QyxlQUFuQixDQUFtQ2hELE1BQW5DLEdBQTRDLFdBQVc0VyxLQUF2RDtBQUNELEtBSEQsTUFHTztBQUNMLFdBQUtoUixhQUFMLENBQW1CNUMsZUFBbkIsQ0FBbUNoRCxNQUFuQyxHQUE0QyxZQUE1QztBQUNELEtBNUQ4RixDQThEL0Y7OztBQUNBLFFBQUkrVyxPQUFPLElBQUlDLE9BQWYsRUFBd0IsS0FBS1gsb0JBQUwsQ0FBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0NHLFNBQWhDLEVBQXhCLEtBQ0ssSUFBSU8sT0FBSixFQUFhLEtBQUtWLG9CQUFMLENBQTBCLENBQTFCLEVBQTZCRSxRQUE3QixFQUF1Q0MsU0FBdkMsRUFBYixLQUNBLElBQUlRLE9BQUosRUFBYSxLQUFLWCxvQkFBTCxDQUEwQkMsUUFBMUIsRUFBb0MsQ0FBcEMsRUFBdUNFLFNBQXZDLEVBQWIsS0FDQSxLQUFLSCxvQkFBTCxDQUEwQkMsUUFBMUIsRUFBb0NDLFFBQXBDLEVBQThDQyxTQUE5Qzs7QUFFTCxRQUFJUSxPQUFPLElBQUlELE9BQWYsRUFBd0I7QUFDdEJ2TyxNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFFBQUEsTUFBSSxDQUFDK08sZUFBTDtBQUNELE9BRlMsRUFFUEwsS0FBSyxHQUFHLEdBRkQsQ0FBVjtBQUdEOztBQUVELFFBQUlELE1BQUosRUFBWTtBQUNWLFdBQUtPLGdDQUFMO0FBQ0EsV0FBS0MseUJBQUw7QUFDQSxXQUFLQywyQkFBTDtBQUNEO0FBQ0YsR0F4aUQ4QjtBQTBpRC9CRixFQUFBQSxnQ0ExaUQrQiw4Q0EwaURJO0FBQ2pDLFFBQUksQ0FBQ3JTLHlCQUFMLEVBQWdDO0FBQzVCLFdBQUtpUiw4QkFBTCxDQUFvQyxJQUFwQztBQUVGLFVBQUksQ0FBQzdRLFlBQUwsRUFDRSxLQUFLSyxhQUFMLENBQW1CaEQsc0JBQW5CLENBQTBDNUMsTUFBMUMsR0FBbUQsUUFBbkQsQ0FERixLQUdFLEtBQUs0RixhQUFMLENBQW1CaEQsc0JBQW5CLENBQTBDNUMsTUFBMUMsR0FBbUQsY0FBbkQ7QUFFRm1GLE1BQUFBLHlCQUF5QixHQUFHLElBQTVCO0FBQ0EsV0FBS1MsYUFBTCxDQUFtQnRELFlBQW5CLENBQWdDc0osWUFBaEMsQ0FBNkNuTyxFQUFFLENBQUNnWixNQUFoRCxFQUF3REMsWUFBeEQsR0FBdUUsS0FBdkU7O0FBRUEsVUFBSXJGLFFBQVEsR0FBR3BVLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEVBQWY7O0FBQ0EsVUFBSXlHLFlBQVksR0FBR2pTLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EeUYsYUFBcEQsRUFBbkI7O0FBQ0EsVUFBSW9JLFFBQVEsR0FBR3JaLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FBbUVzRixZQUFuRSxFQUFpRnpCLGVBQWhHOztBQUNBLFVBQUlrSyxLQUFLLEdBQUcxYSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1QLFdBQXBELEVBQVo7O0FBQ0EsVUFBSXRHLFNBQVMsR0FBR0QsUUFBUSxDQUFDekgsY0FBVCxDQUF3QnNGLFlBQXhCLEVBQXNDNUQsWUFBdEQ7QUFFQSxVQUFJdU0sZUFBZSxHQUFHLENBQXRCO0FBQ0EsVUFBSUMsbUJBQW1CLEdBQUcsQ0FBMUI7QUFDQSxVQUFJQyxXQUFXLEdBQUcsQ0FBbEIsQ0FuQjhCLENBcUI5Qjs7QUFDQSxVQUFJeFMsWUFBSixFQUNFd1MsV0FBVyxHQUFHLENBQWQ7O0FBRUYsV0FBSyxJQUFJcE8sS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcySCxTQUFTLENBQUN6SCxNQUF0QyxFQUE4Q0YsS0FBSyxFQUFuRCxFQUF1RDtBQUNyRCxZQUFJMkgsU0FBUyxDQUFDM0gsS0FBRCxDQUFULENBQWlCZ0IsWUFBakIsSUFBaUMsQ0FBckMsRUFDQTtBQUNFLGNBQUkyRyxTQUFTLENBQUMzSCxLQUFELENBQVQsQ0FBaUI0SSxhQUFyQixFQUNBO0FBQ0UsZ0JBQUk4QixRQUFRLEdBQUUwRCxXQUFXLEdBQUVKLEtBQWIsR0FBcUIsSUFBbkM7O0FBQ0FFLFlBQUFBLGVBQWUsR0FBSXhELFFBQVEsR0FBRyxDQUE5Qjs7QUFDQWhELFlBQUFBLFFBQVEsQ0FBQzJHLCtCQUFULENBQXlDSCxlQUF6QyxFQUEwRHZHLFNBQVMsQ0FBQzNILEtBQUQsQ0FBVCxDQUFpQndMLFNBQTNFOztBQUNBMkMsWUFBQUEsbUJBQW1CLElBQUlELGVBQXZCO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFVBQUlDLG1CQUFtQixHQUFDLENBQXhCLEVBQ0E7QUFDRSxhQUFLdE0sU0FBTCxDQUFlLHFHQUFmLEVBQXNILElBQXRIO0FBQ0QsT0F6QzZCLENBMEM5Qjs7O0FBRUEsVUFBSSxDQUFDakcsWUFBTCxFQUNFRCxpQkFBaUIsR0FBR2dSLFFBQVEsR0FBR3FCLEtBQVgsR0FBbUIsSUFBbkIsR0FBd0JHLG1CQUE1QyxDQURGLEtBR0V4UyxpQkFBaUIsR0FBRyxLQUFLZ1IsUUFBUSxHQUFHcUIsS0FBaEIsSUFBeUIsSUFBekIsR0FBOEJHLG1CQUFsRDtBQUVGLFdBQUtsUyxhQUFMLENBQW1CM0UsZUFBbkIsQ0FBbUNqQixNQUFuQyxHQUE0QzJYLEtBQTVDO0FBQ0EsV0FBSy9SLGFBQUwsQ0FBbUIvQyxrQkFBbkIsQ0FBc0M3QyxNQUF0QyxHQUErQ3NXLFFBQS9DO0FBRUEsVUFBSSxDQUFDL1EsWUFBTCxFQUNFLEtBQUtLLGFBQUwsQ0FBbUI5QyxnQkFBbkIsQ0FBb0M5QyxNQUFwQyxHQUE0QyxNQUFJMlgsS0FBSixHQUFZLEdBQVosR0FBa0JyQixRQUFsQixHQUE2QixHQUE3QixHQUFtQyxRQUFuQyxHQUE0Q3dCLG1CQUE1QyxHQUFnRSxHQUFoRSxHQUFxRXhTLGlCQUFqSCxDQURGLEtBR0UsS0FBS00sYUFBTCxDQUFtQjlDLGdCQUFuQixDQUFvQzlDLE1BQXBDLEdBQTRDLE1BQUkyWCxLQUFKLEdBQVksR0FBWixHQUFrQnJCLFFBQWxCLEdBQTZCLEdBQTdCLEdBQW1DLFVBQW5DLEdBQThDd0IsbUJBQTlDLEdBQWtFLEdBQWxFLEdBQXdFeFMsaUJBQXBIOztBQUVGLFVBQUksS0FBSzZCLFNBQVQsRUFBb0I7QUFDbEIsYUFBSzhRLHFCQUFMO0FBQ0Q7QUFDRjtBQUNGLEdBeG1EOEI7QUEwbUQvQlIsRUFBQUEseUJBMW1EK0IsdUNBMG1ESDtBQUMxQjtBQUNBLFFBQUksQ0FBQ3JTLDJCQUFMLEVBQWtDO0FBQ2hDLFdBQUtnUiw4QkFBTCxDQUFvQyxJQUFwQztBQUVBLFVBQUksQ0FBQzdRLFlBQUwsRUFDRSxLQUFLSyxhQUFMLENBQW1CaEQsc0JBQW5CLENBQTBDNUMsTUFBMUMsR0FBbUQsUUFBbkQsQ0FERixLQUdFLEtBQUs0RixhQUFMLENBQW1CaEQsc0JBQW5CLENBQTBDNUMsTUFBMUMsR0FBbUQsY0FBbkQ7QUFFRm9GLE1BQUFBLDJCQUEyQixHQUFHLElBQTlCO0FBQ0EsV0FBS1EsYUFBTCxDQUFtQnJELEtBQW5CLENBQXlCcUosWUFBekIsQ0FBc0NuTyxFQUFFLENBQUNnWixNQUF6QyxFQUFpREMsWUFBakQsR0FBZ0UsS0FBaEU7O0FBQ0EsVUFBSXJGLFFBQVEsR0FBR3BVLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEVBQWY7O0FBQ0EsVUFBSXlHLFlBQVksR0FBR2pTLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EeUYsYUFBcEQsRUFBbkI7O0FBQ0EsVUFBSXFJLFFBQVEsR0FBR3RaLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FBbUVzRixZQUFuRSxFQUFpRnZCLG9CQUFoRzs7QUFDQSxVQUFJeUosV0FBVyxHQUFHbmEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUFtRXNGLFlBQW5FLEVBQWlGbUksb0JBQW5HOztBQUVBLFVBQUkvSixPQUFPLEdBQUdpSixRQUFRLEdBQUdhLFdBQXpCOztBQUNBLFVBQUlPLEtBQUssR0FBRzFhLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EeUgsWUFBcEQsRUFBWjs7QUFFQSxVQUFJb0IsU0FBUyxHQUFHRCxRQUFRLENBQUN6SCxjQUFULENBQXdCc0YsWUFBeEIsRUFBc0M1RCxZQUF0RDtBQUVBLFVBQUl1TSxlQUFlLEdBQUcsQ0FBdEI7QUFDQSxVQUFJQyxtQkFBbUIsR0FBRyxDQUExQjtBQUNBLFVBQUlDLFdBQVcsR0FBRyxDQUFsQjtBQUVBLFVBQUl4UyxZQUFKLEVBQ0V3UyxXQUFXLEdBQUcsQ0FBZDs7QUFFRixXQUFLLElBQUlwTyxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRzJILFNBQVMsQ0FBQ3pILE1BQXRDLEVBQThDRixLQUFLLEVBQW5ELEVBQXVEO0FBQ3JELFlBQUkySCxTQUFTLENBQUMzSCxLQUFELENBQVQsQ0FBaUJnQixZQUFqQixJQUFpQyxDQUFyQyxFQUNBO0FBQ0UsY0FBSTJHLFNBQVMsQ0FBQzNILEtBQUQsQ0FBVCxDQUFpQjRJLGFBQXJCLEVBQ0E7QUFDRSxnQkFBSTJGLFVBQVUsR0FBRzVHLFNBQVMsQ0FBQzNILEtBQUQsQ0FBVCxDQUFpQm1JLGFBQWpCLENBQStCakksTUFBL0IsR0FBd0MsQ0FBekQ7O0FBQ0EsZ0JBQUl3SyxRQUFRLEdBQUU2RCxVQUFVLEdBQUNILFdBQVgsR0FBd0JKLEtBQXhCLEdBQWdDLElBQTlDOztBQUNBRSxZQUFBQSxlQUFlLEdBQUl4RCxRQUFRLEdBQUcsQ0FBOUI7O0FBQ0FoRCxZQUFBQSxRQUFRLENBQUMyRywrQkFBVCxDQUF5Q0gsZUFBekMsRUFBMER2RyxTQUFTLENBQUMzSCxLQUFELENBQVQsQ0FBaUJ3TCxTQUEzRTs7QUFDQTJDLFlBQUFBLG1CQUFtQixJQUFJRCxlQUF2QjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxVQUFJQyxtQkFBbUIsR0FBQyxDQUF4QixFQUNBO0FBQ0UsYUFBS3RNLFNBQUwsQ0FBZSxxR0FBZixFQUFzSCxJQUF0SDtBQUNEOztBQUVELFVBQUksQ0FBQ2pHLFlBQUwsRUFDRUQsaUJBQWlCLEdBQUdnSSxPQUFPLEdBQUdxSyxLQUFWLEdBQWtCLElBQWxCLEdBQXVCRyxtQkFBM0MsQ0FERixLQUdFeFMsaUJBQWlCLEdBQUcsS0FBS2dJLE9BQU8sR0FBR3FLLEtBQWYsSUFBd0IsSUFBeEIsR0FBNkJHLG1CQUFqRDtBQUVGLFdBQUtsUyxhQUFMLENBQW1CM0UsZUFBbkIsQ0FBbUNqQixNQUFuQyxHQUE0QzJYLEtBQTVDO0FBQ0EsV0FBSy9SLGFBQUwsQ0FBbUIvQyxrQkFBbkIsQ0FBc0M3QyxNQUF0QyxHQUErQ3NOLE9BQS9DO0FBRUEsVUFBSSxDQUFDL0gsWUFBTCxFQUNFLEtBQUtLLGFBQUwsQ0FBbUI5QyxnQkFBbkIsQ0FBb0M5QyxNQUFwQyxHQUE0QyxNQUFJMlgsS0FBSixHQUFZLEdBQVosR0FBa0JySyxPQUFsQixHQUE0QixHQUE1QixHQUFrQyxRQUFsQyxHQUE0Q3dLLG1CQUE1QyxHQUFnRSxHQUFoRSxHQUFxRXhTLGlCQUFqSCxDQURGLEtBR0UsS0FBS00sYUFBTCxDQUFtQjlDLGdCQUFuQixDQUFvQzlDLE1BQXBDLEdBQTRDLE1BQUkyWCxLQUFKLEdBQVksR0FBWixHQUFrQnJLLE9BQWxCLEdBQTRCLEdBQTVCLEdBQWtDLFVBQWxDLEdBQTZDd0ssbUJBQTdDLEdBQWlFLEdBQWpFLEdBQXVFeFMsaUJBQW5IOztBQUVGLFVBQUksS0FBSzZCLFNBQVQsRUFBb0I7QUFDbEIsYUFBSzhRLHFCQUFMO0FBQ0Q7QUFDRjtBQUNGLEdBM3FEOEI7QUE2cUQvQlAsRUFBQUEsMkJBN3FEK0IseUNBNnFERDtBQUM1QjtBQUNBLFFBQUksQ0FBQ3JTLFNBQUwsRUFBZ0I7QUFDZCxVQUFJZ00sUUFBUSxHQUFHcFUsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsRUFBZjs7QUFDQSxVQUFJeUcsWUFBWSxHQUFHalMsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0R5RixhQUFwRCxFQUFuQjs7QUFDQSxVQUFJaUssYUFBYSxHQUFHLENBQXBCO0FBRUEsVUFBSTlHLFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JzRixZQUF4QixFQUFzQ29JLGtCQUExQyxFQUE2RDtBQUMzRGEsUUFBQUEsYUFBYSxHQUFHLEtBQUt4QixvQkFBTCxFQUFoQixDQURGLEtBR0V3QixhQUFhLEdBQUcsSUFBaEI7O0FBRUYsVUFDRWxiLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FBbUVzRixZQUFuRSxFQUFpRnpGLElBQWpGLElBQXlGME8sYUFEM0YsRUFDMEc7QUFDeEc5UyxRQUFBQSxTQUFTLEdBQUcsSUFBWjtBQUNBLGFBQUtPLGFBQUwsQ0FBbUJwRCxPQUFuQixDQUEyQm9KLFlBQTNCLENBQXdDbk8sRUFBRSxDQUFDZ1osTUFBM0MsRUFBbURDLFlBQW5ELEdBQWtFLEtBQWxFO0FBQ0F6WixRQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQW1Fc0YsWUFBbkUsRUFBaUZ6RixJQUFqRixHQUF1RnhNLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FBbUVzRixZQUFuRSxFQUFpRnpGLElBQWpGLEdBQXdGME8sYUFBL0s7QUFFQSxZQUFJL00sVUFBVSxHQUFHLEtBQWpCO0FBQ0EsWUFBSUMsY0FBYyxHQUFHLENBQXJCOztBQUVBLGFBQUssSUFBSTFCLEtBQUssR0FBRyxDQUFqQixFQUFtQkEsS0FBSyxHQUFFMU0sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUFtRXNGLFlBQW5FLEVBQWlGNUQsWUFBakYsQ0FBOEZ6QixNQUF4SCxFQUErSEYsS0FBSyxFQUFwSSxFQUF3STtBQUN0SSxjQUNFMU0sd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUFtRXNGLFlBQW5FLEVBQWlGNUQsWUFBakYsQ0FBOEYzQixLQUE5RixFQUFxRzRCLFNBRHZHLEVBQ2tIO0FBQ2hISCxZQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBQyxZQUFBQSxjQUFjLEdBQUcxQixLQUFqQjtBQUNBO0FBQ0Q7QUFDRjs7QUFFRDFNLFFBQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FBbUVzRixZQUFuRSxFQUFpRjVELFlBQWpGLENBQThGRCxjQUE5RixFQUE4RzNMLFVBQTlHLEdBQTBIekMsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUFtRXNGLFlBQW5FLEVBQWlGNUQsWUFBakYsQ0FBOEZELGNBQTlGLEVBQThHM0wsVUFBOUcsR0FBMkh5WSxhQUFyUDs7QUFFQSxZQUFJbGIsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUFtRXNGLFlBQW5FLEVBQWlGNUQsWUFBakYsQ0FBOEZELGNBQTlGLEVBQThHM0wsVUFBOUcsSUFBNEgsQ0FBaEksRUFBbUk7QUFDakl6QyxVQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQW1Fc0YsWUFBbkUsRUFBaUY1RCxZQUFqRixDQUE4RkQsY0FBOUYsRUFBOEczTCxVQUE5RyxHQUEySCxDQUEzSDtBQUNBekMsVUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUFtRXNGLFlBQW5FLEVBQWlGNUQsWUFBakYsQ0FBOEZELGNBQTlGLEVBQThHRSxTQUE5RyxHQUEwSCxLQUExSDtBQUNEOztBQUVELFlBQUk4RixRQUFRLENBQUN6SCxjQUFULENBQXdCc0YsWUFBeEIsRUFBc0NvSSxrQkFBMUMsRUFDRWpHLFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JzRixZQUF4QixFQUFzQ29JLGtCQUF0QyxHQUEyRCxLQUEzRDtBQUVGLGFBQUtILGlCQUFMLENBQXVCbGEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUFtRXNGLFlBQW5FLEVBQWlGekYsSUFBeEc7QUFDQSxhQUFLOE4sZUFBTDtBQUNELE9BOUJELE1BK0JLO0FBQ0gsWUFBSWxHLFFBQVEsR0FBR3BVLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEVBQWY7O0FBQ0EsWUFBSXlHLFlBQVksR0FBR2pTLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EeUYsYUFBcEQsRUFBbkI7O0FBRUEsWUFBSW1ELFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JzRixZQUF4QixFQUFzQ29JLGtCQUExQyxFQUNFLEtBQUsxUixhQUFMLENBQW1CN0MsY0FBbkIsQ0FBa0M2SSxZQUFsQyxDQUErQ25PLEVBQUUsQ0FBQ2daLE1BQWxELEVBQTBEQyxZQUExRCxHQUF5RSxLQUF6RSxDQURGLEtBR0UsS0FBSzlRLGFBQUwsQ0FBbUI3QyxjQUFuQixDQUFrQzZJLFlBQWxDLENBQStDbk8sRUFBRSxDQUFDZ1osTUFBbEQsRUFBMERDLFlBQTFELEdBQXlFLElBQXpFO0FBRUYsYUFBSzlRLGFBQUwsQ0FBbUJqRCxtQkFBbkIsQ0FBdUNvRixNQUF2QyxHQUFnRCxJQUFoRDtBQUNBK0UsUUFBQUEsT0FBTyxDQUFDMkIsS0FBUixDQUFjLGNBQWQ7QUFDRDtBQUNGO0FBQ0YsR0FydUQ4QjtBQXV1RC9Cd0osRUFBQUEscUJBdnVEK0IsbUNBdXVEUDtBQUFBOztBQUN0QjtBQUNBLFFBQUkvSSxZQUFZLEdBQUdqUyx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHlGLGFBQXBELEVBQW5COztBQUNBalIsSUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUFtRXNGLFlBQW5FLEVBQWlGekYsSUFBakYsR0FBdUZ4TSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQW9Fc0YsWUFBcEUsRUFBa0Z6RixJQUFsRixHQUF5Rm5FLGlCQUFoTDtBQUNBLFNBQUs2UixpQkFBTCxDQUF1QmxhLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbUIsY0FBcEQsQ0FBbUVzRixZQUFuRSxFQUFpRnpGLElBQXhHOztBQUNBLFFBQUksQ0FBQyxLQUFLdEMsU0FBVixFQUFxQjtBQUNuQixXQUFLcUUsU0FBTCxDQUNFLGFBQ0VsRyxpQkFERixHQUVFLDhEQUZGLEdBR0VySSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQU5OLEVBT0UsSUFQRjtBQVNBakIsTUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixRQUFBLE1BQUksQ0FBQzROLDhCQUFMLENBQW9DLEtBQXBDOztBQUNBLFFBQUEsTUFBSSxDQUFDbUIsZUFBTDtBQUNELE9BSFMsRUFHUCxJQUhPLENBQVY7QUFJRCxLQWRELE1BY087QUFDTHpLLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUNFLGFBQ0V6SCxpQkFERixHQUVFLDhEQUZGLEdBR0VySSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRG1CLGNBQXBELENBQ0VzRixZQURGLEVBRUV6RixJQU5OO0FBUUEsV0FBSzJNLDhCQUFMLENBQW9DLEtBQXBDO0FBQ0EsV0FBS21CLGVBQUw7QUFDRDtBQUNGLEdBdHdEOEI7QUF3d0QvQmEsRUFBQUEsc0JBeHdEK0Isb0NBd3dETjtBQUN2QixTQUFLNU0sU0FBTCxDQUNFLDRGQURGLEVBRUUsSUFGRjs7QUFJQSxRQUFJNkYsUUFBUSxHQUFHcFUsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsRUFBZjs7QUFDQSxRQUFJeUcsWUFBWSxHQUFHalMsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0R5RixhQUFwRCxFQUFuQjs7QUFDQW1ELElBQUFBLFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JzRixZQUF4QixFQUFzQ29JLGtCQUF0QyxHQUEyRCxJQUEzRDtBQUNBLFNBQUsxUixhQUFMLENBQW1CakQsbUJBQW5CLENBQXVDb0YsTUFBdkMsR0FBZ0QsS0FBaEQ7QUFDQTFDLElBQUFBLFNBQVMsR0FBRyxJQUFaO0FBQ0EsU0FBS08sYUFBTCxDQUFtQnBELE9BQW5CLENBQTJCb0osWUFBM0IsQ0FBd0NuTyxFQUFFLENBQUNnWixNQUEzQyxFQUFtREMsWUFBbkQsR0FBa0UsS0FBbEU7QUFDQSxTQUFLYSxlQUFMO0FBQ0FsUyxJQUFBQSxTQUFTLEdBQUcsSUFBWjtBQUNELEdBcnhEOEI7QUF1eEQvQmdULEVBQUFBLG1CQXZ4RCtCLGlDQXV4RFQ7QUFDcEIsU0FBS3pTLGFBQUwsQ0FBbUJqRCxtQkFBbkIsQ0FBdUNvRixNQUF2QyxHQUFnRCxLQUFoRDtBQUNBLFNBQUt1USxxQ0FBTCxDQUEyQyxLQUEzQztBQUNELEdBMXhEOEI7QUE0eEQvQm5CLEVBQUFBLGlCQTV4RCtCLDZCQTR4RGI3SixPQTV4RGEsRUE0eERKO0FBQ3pCLFNBQUsxSCxhQUFMLENBQW1CakUsU0FBbkIsQ0FBNkIzQixNQUE3QixHQUFzQyxNQUFNc04sT0FBNUM7QUFDRCxHQTl4RDhCO0FBZ3lEL0JpTCxFQUFBQSxxQkFoeUQrQixtQ0FneURQO0FBQ3RCLFNBQUszUyxhQUFMLENBQW1CakQsbUJBQW5CLENBQXVDb0YsTUFBdkMsR0FBZ0QsS0FBaEQ7QUFDRCxHQWx5RDhCO0FBb3lEL0J5USxFQUFBQSxtQkFweUQrQixpQ0FveURUO0FBQUE7O0FBQ3BCO0FBQ0EsU0FBS2hOLFNBQUwsQ0FDRSwrREFERixFQUVFLElBRkY7QUFJQWhELElBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsTUFBQSxNQUFJLENBQUMrUCxxQkFBTDs7QUFDQSxNQUFBLE1BQUksQ0FBQ3BDLHlCQUFMLENBQStCLEtBQS9COztBQUNBaFIsTUFBQUEseUJBQXlCLEdBQUcsS0FBNUI7QUFDQUMsTUFBQUEsMkJBQTJCLEdBQUcsS0FBOUI7QUFDQUMsTUFBQUEsU0FBUyxHQUFHLEtBQVo7QUFDQXBJLE1BQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EZ1Esc0JBQXBELENBQ0UsS0FERjtBQUdBeGIsTUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RpUSwwQkFBcEQsQ0FDRSxLQURGO0FBR0F6YixNQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRGtRLCtCQUFwRCxDQUNFLEtBREY7QUFHQTFiLE1BQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EbVEsWUFBcEQsQ0FDRSxLQURGLEVBRUUsS0FGRjtBQUlBM2IsTUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RvUSxxQkFBcEQ7QUFDRCxLQXBCUyxFQW9CUCxJQXBCTyxDQUFWO0FBcUJELEdBL3pEOEI7QUFpMEQvQnRCLEVBQUFBLGVBajBEK0IsNkJBaTBEYjtBQUNoQixRQUFJcFMseUJBQXlCLElBQUlDLDJCQUE3QixJQUE0REMsU0FBaEUsRUFBMkU7QUFDekUsVUFBSTZKLFlBQVksR0FBR2pTLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EeUYsYUFBcEQsRUFBbkI7O0FBQ0FwQixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBLFdBQUtvSix5QkFBTCxDQUErQixLQUEvQjtBQUNBbFosTUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RnUSxzQkFBcEQsQ0FDRSxLQURGO0FBR0F4YixNQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRGlRLDBCQUFwRCxDQUNFLEtBREY7QUFHQXpiLE1BQUFBLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9Ea1EsK0JBQXBELENBQ0UsS0FERjtBQUdBMWIsTUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtUSxZQUFwRCxDQUNFLEtBREYsRUFFRSxLQUZGO0FBSUEzYixNQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRHFRLFlBQXBEO0FBQ0Q7QUFDRixHQXIxRDhCO0FBczFEL0I7QUFFQTtBQUNBQyxFQUFBQSw0Q0F6MUQrQix3REF5MURjN1EsTUF6MURkLEVBeTFEc0I7QUFDbkQsU0FBSzVCLGtCQUFMLENBQXdCeUIsTUFBeEIsR0FBaUNHLE1BQWpDO0FBQ0QsR0EzMUQ4QjtBQTYxRC9COFEsRUFBQUEsaUNBNzFEK0IsK0NBNjFESztBQUNsQyxTQUFLQyx5QkFBTDs7QUFDQSxRQUFJNUgsUUFBUSxHQUFHcFUsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsRUFBZjs7QUFDQSxRQUFJeUcsWUFBWSxHQUFHalMsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0R5RixhQUFwRCxFQUFuQjs7QUFDQSxRQUFJb0QsU0FBUyxHQUFHRCxRQUFRLENBQUN6SCxjQUFULENBQXdCc0YsWUFBeEIsQ0FBaEI7QUFFQSxTQUFLckosbUJBQUwsQ0FBeUI3RSxVQUF6QixDQUFvQ2hCLE1BQXBDLEdBQTZDLE1BQTdDO0FBQ0EsU0FBSzZGLG1CQUFMLENBQXlCbEUsU0FBekIsQ0FBbUMzQixNQUFuQyxHQUEyQ3FSLFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JzRixZQUF4QixFQUFzQ3pGLElBQWpGO0FBQ0EsU0FBSzVELG1CQUFMLENBQXlCakUsZUFBekIsQ0FBeUM1QixNQUF6QyxHQUFpRHFSLFFBQVEsQ0FBQ3pILGNBQVQsQ0FBd0JzRixZQUF4QixFQUFzQ2xMLFVBQXZGO0FBQ0EsU0FBSzZCLG1CQUFMLENBQXlCaEUsa0JBQXpCLENBQTRDN0IsTUFBNUMsR0FBb0Qsd0JBQXVCcVIsUUFBUSxDQUFDekgsY0FBVCxDQUF3QnNGLFlBQXhCLEVBQXNDNUQsWUFBdEMsQ0FBbUR6QixNQUE5SDs7QUFFQSxTQUFLLElBQUlGLEtBQUssR0FBRyxDQUFqQixFQUFvQkEsS0FBSyxHQUFHMkgsU0FBUyxDQUFDaEcsWUFBVixDQUF1QnpCLE1BQW5ELEVBQTJERixLQUFLLEVBQWhFLEVBQW9FO0FBQ2xFLFVBQUk0SCxJQUFJLEdBQUc5VCxFQUFFLENBQUMrVCxXQUFILENBQWUsS0FBSzNMLG1CQUFMLENBQXlCOUQsa0JBQXhDLENBQVg7QUFDQXdQLE1BQUFBLElBQUksQ0FBQ0UsTUFBTCxHQUFjLEtBQUs1TCxtQkFBTCxDQUF5Qi9ELGlCQUF2QztBQUNBeVAsTUFBQUEsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0M5RSxlQUFwQztBQUNBeUssTUFBQUEsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0M4RixPQUFwQyxDQUE0Q0osU0FBUyxDQUFDaEcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCYyxZQUExRTtBQUNBOEcsTUFBQUEsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0MrRixPQUFwQyxDQUE0Q0wsU0FBUyxDQUFDaEcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCWSx1QkFBMUU7QUFDQWdILE1BQUFBLElBQUksQ0FBQzNGLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DK0YsT0FBcEMsQ0FBNENMLFNBQVMsQ0FBQ2hHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4QlksdUJBQTFFO0FBQ0FnSCxNQUFBQSxJQUFJLENBQUMzRixZQUFMLENBQWtCLGdCQUFsQixFQUFvQ2dHLGdCQUFwQyxDQUFxRGpJLEtBQXJEOztBQUVBLFVBQUlnQyxRQUFRLENBQUMyRixTQUFTLENBQUNoRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJnQixZQUEvQixDQUFSLElBQXdELENBQTVELEVBQStEO0FBQzdENEcsUUFBQUEsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NtRyxlQUFwQyxDQUFvRCxDQUFwRDtBQUNBUixRQUFBQSxJQUFJLENBQUMzRixZQUFMLENBQWtCLGdCQUFsQixFQUFvQ29HLE9BQXBDLENBQTRDLFlBQTVDO0FBQ0QsT0FIRCxNQUdPLElBQUlyRyxRQUFRLENBQUMyRixTQUFTLENBQUNoRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJnQixZQUEvQixDQUFSLElBQXdELENBQTVELEVBQStEO0FBQ3BFNEcsUUFBQUEsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0NtRyxlQUFwQyxDQUFvRCxDQUFwRDtBQUNBUixRQUFBQSxJQUFJLENBQUMzRixZQUFMLENBQWtCLGdCQUFsQixFQUFvQ29HLE9BQXBDLENBQTRDLGdCQUE1QztBQUNEOztBQUVEVCxNQUFBQSxJQUFJLENBQUMzRixZQUFMLENBQWtCLGdCQUFsQixFQUFvQ3lHLFVBQXBDLENBQStDZixTQUFTLENBQUNoRyxZQUFWLENBQXVCM0IsS0FBdkIsRUFBOEJ1UCxNQUE3RTtBQUNBM0gsTUFBQUEsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0MwRyxZQUFwQyxDQUFpRGhCLFNBQVMsQ0FBQ2hHLFlBQVYsQ0FBdUIzQixLQUF2QixFQUE4Qm1JLGFBQTlCLENBQTRDakksTUFBN0Y7QUFFQSxVQUFJeUgsU0FBUyxDQUFDaEcsWUFBVixDQUF1QjNCLEtBQXZCLEVBQThCbUksYUFBOUIsQ0FBNENqSSxNQUE1QyxJQUFzRCxDQUExRCxFQUNFMEgsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0N1Tix3QkFBcEMsQ0FBNkQsS0FBN0QsRUFERixLQUVLNUgsSUFBSSxDQUFDM0YsWUFBTCxDQUFrQixnQkFBbEIsRUFBb0N1Tix3QkFBcEMsQ0FBNkQsSUFBN0Q7QUFFTGpjLE1BQUFBLG1CQUFtQixDQUFDMlAsSUFBcEIsQ0FBeUIwRSxJQUF6QjtBQUNEO0FBQ0YsR0FsNEQ4QjtBQW80RC9CMEgsRUFBQUEseUJBcDREK0IsdUNBbzRESDtBQUMxQixTQUFLLElBQUl0UCxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3pNLG1CQUFtQixDQUFDMk0sTUFBaEQsRUFBd0RGLEtBQUssRUFBN0QsRUFBaUU7QUFDL0R6TSxNQUFBQSxtQkFBbUIsQ0FBQ3lNLEtBQUQsQ0FBbkIsQ0FBMkJxSixPQUEzQjtBQUNEOztBQUVEOVYsSUFBQUEsbUJBQW1CLEdBQUcsRUFBdEI7QUFDRCxHQTE0RDhCO0FBNDREL0JvYixFQUFBQSxxQ0E1NEQrQixpREE0NERPYyxXQTU0RFAsRUE0NEQ0QjtBQUFBLFFBQXJCQSxXQUFxQjtBQUFyQkEsTUFBQUEsV0FBcUIsR0FBUCxLQUFPO0FBQUE7O0FBQ3pELFFBQUlBLFdBQUosRUFBaUI7QUFDZixXQUFLdlQsbUJBQUwsQ0FBeUI3RCxVQUF6QixDQUFvQytGLE1BQXBDLEdBQTZDLEtBQTdDO0FBQ0EsV0FBS2xDLG1CQUFMLENBQXlCNUQsa0JBQXpCLENBQTRDOEYsTUFBNUMsR0FBcUQsSUFBckQ7QUFDRCxLQUhELE1BR087QUFDTCxXQUFLbEMsbUJBQUwsQ0FBeUI3RCxVQUF6QixDQUFvQytGLE1BQXBDLEdBQTZDLElBQTdDO0FBQ0EsV0FBS2xDLG1CQUFMLENBQXlCNUQsa0JBQXpCLENBQTRDOEYsTUFBNUMsR0FBcUQsS0FBckQ7QUFDRDs7QUFDRCxTQUFLZ1IsNENBQUwsQ0FBa0QsSUFBbEQ7QUFDQSxTQUFLQyxpQ0FBTDtBQUNELEdBdDVEOEI7QUF3NUQvQkssRUFBQUEsbUNBeDVEK0IsaURBdzVETztBQUNwQyxTQUFLSix5QkFBTDtBQUNBLFNBQUtGLDRDQUFMLENBQWtELEtBQWxEO0FBQ0QsR0EzNUQ4QjtBQTY1RC9CTyxFQUFBQSxnREE3NUQrQiw4REE2NURvQjtBQUNqRCxTQUFLTCx5QkFBTDtBQUNBLFNBQUtGLDRDQUFMLENBQWtELEtBQWxEO0FBQ0E5YixJQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDhRLGdCQUFwRDtBQUNELEdBajZEOEI7QUFtNkQvQjtBQUVBO0FBQ0FDLEVBQUFBLGdDQXQ2RCtCLDRDQXM2REV0UixNQXQ2REYsRUFzNkRVO0FBQ3ZDLFNBQUszQixZQUFMLENBQWtCd0IsTUFBbEIsR0FBMkJHLE1BQTNCO0FBQ0QsR0F4NkQ4QjtBQTA2RC9CdVIsRUFBQUEsMEJBMTZEK0Isc0NBMDZESkwsV0ExNkRJLEVBMDZEaUI7QUFBQSxRQUFyQkEsV0FBcUI7QUFBckJBLE1BQUFBLFdBQXFCLEdBQVAsS0FBTztBQUFBOztBQUM5QyxTQUFLOVIsaUJBQUw7QUFDQSxTQUFLa1MsZ0NBQUwsQ0FBc0MsSUFBdEM7QUFDQSxTQUFLRSx5QkFBTCxDQUErQk4sV0FBL0I7QUFDRCxHQTk2RDhCO0FBKzZEL0JNLEVBQUFBLHlCQS82RCtCLHFDQSs2RExOLFdBLzZESyxFQSs2RFE7QUFDckMsUUFBSS9ILFFBQVEsR0FBR3BVLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEVBQWY7O0FBQ0EsUUFBSXlHLFlBQVksR0FBR2pTLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NLLGVBQWxDLEdBQW9EeUYsYUFBcEQsRUFBbkI7O0FBRUEsU0FBS3BJLGFBQUwsQ0FBbUI5RSxVQUFuQixDQUE4QmhCLE1BQTlCLEdBQXVDLFFBQXZDO0FBQ0EsU0FBSzhGLGFBQUwsQ0FBbUJuRSxTQUFuQixDQUE2QjNCLE1BQTdCLEdBQ0VxUixRQUFRLENBQUN6SCxjQUFULENBQXdCc0YsWUFBeEIsRUFBc0N6RixJQUR4QztBQUVBLFNBQUszRCxhQUFMLENBQW1CbEUsZUFBbkIsQ0FBbUM1QixNQUFuQyxHQUNFcVIsUUFBUSxDQUFDekgsY0FBVCxDQUF3QnNGLFlBQXhCLEVBQXNDbEwsVUFEeEM7O0FBR0EsUUFBSW9WLFdBQUosRUFBaUI7QUFDZixXQUFLdFQsYUFBTCxDQUFtQjlELFVBQW5CLENBQThCK0YsTUFBOUIsR0FBdUMsS0FBdkM7QUFDQSxXQUFLakMsYUFBTCxDQUFtQjdELGtCQUFuQixDQUFzQzhGLE1BQXRDLEdBQStDLElBQS9DO0FBQ0QsS0FIRCxNQUdPO0FBQ0wsV0FBS2pDLGFBQUwsQ0FBbUI5RCxVQUFuQixDQUE4QitGLE1BQTlCLEdBQXVDLElBQXZDO0FBQ0EsV0FBS2pDLGFBQUwsQ0FBbUI3RCxrQkFBbkIsQ0FBc0M4RixNQUF0QyxHQUErQyxLQUEvQztBQUNEO0FBQ0YsR0FoOEQ4QjtBQWs4RC9CNFIsRUFBQUEsd0JBbDhEK0Isc0NBazhESjtBQUN6QixTQUFLSCxnQ0FBTCxDQUFzQyxLQUF0QztBQUNELEdBcDhEOEI7QUFzOEQvQkksRUFBQUEscUNBdDhEK0IsbURBczhEUztBQUN0QyxTQUFLSixnQ0FBTCxDQUFzQyxLQUF0QztBQUNBdmMsSUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0Q4USxnQkFBcEQ7QUFDRCxHQXo4RDhCO0FBMDhEL0I7QUFFQTtBQUNBTSxFQUFBQSxzQ0E3OEQrQixrREE2OERRM1IsTUE3OERSLEVBNjhEZ0I7QUFDN0MsU0FBSzFCLGVBQUwsQ0FBcUJ1QixNQUFyQixHQUE4QkcsTUFBOUI7QUFDRCxHQS84RDhCO0FBaTlEL0I0UixFQUFBQSxnQ0FqOUQrQiw0Q0FpOURFVixXQWo5REYsRUFpOUR1QjtBQUFBLFFBQXJCQSxXQUFxQjtBQUFyQkEsTUFBQUEsV0FBcUIsR0FBUCxLQUFPO0FBQUE7O0FBQ3BELFNBQUs5UixpQkFBTDtBQUNBLFNBQUt1UyxzQ0FBTCxDQUE0QyxJQUE1QztBQUNBLFNBQUtFLCtCQUFMLENBQXFDWCxXQUFyQztBQUNELEdBcjlEOEI7QUFzOUQvQlcsRUFBQUEsK0JBdDlEK0IsMkNBczlEQ1gsV0F0OURELEVBczlEYztBQUMzQyxRQUFJL0gsUUFBUSxHQUFHcFUsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsRUFBZjs7QUFDQSxRQUFJeUcsWUFBWSxHQUFHalMsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0R5RixhQUFwRCxFQUFuQjs7QUFFQSxTQUFLbkksZ0JBQUwsQ0FBc0IvRSxVQUF0QixDQUFpQ2hCLE1BQWpDLEdBQTBDLGFBQTFDO0FBQ0EsU0FBSytGLGdCQUFMLENBQXNCcEUsU0FBdEIsQ0FBZ0MzQixNQUFoQyxHQUNFcVIsUUFBUSxDQUFDekgsY0FBVCxDQUF3QnNGLFlBQXhCLEVBQXNDekYsSUFEeEM7QUFFQSxTQUFLMUQsZ0JBQUwsQ0FBc0JuRSxlQUF0QixDQUFzQzVCLE1BQXRDLEdBQ0VxUixRQUFRLENBQUN6SCxjQUFULENBQXdCc0YsWUFBeEIsRUFBc0NsTCxVQUR4Qzs7QUFHQSxRQUFJb1YsV0FBSixFQUFpQjtBQUNmLFdBQUtyVCxnQkFBTCxDQUFzQi9ELFVBQXRCLENBQWlDK0YsTUFBakMsR0FBMEMsS0FBMUM7QUFDQSxXQUFLaEMsZ0JBQUwsQ0FBc0I5RCxrQkFBdEIsQ0FBeUM4RixNQUF6QyxHQUFrRCxJQUFsRDtBQUNELEtBSEQsTUFHTztBQUNMLFdBQUtoQyxnQkFBTCxDQUFzQi9ELFVBQXRCLENBQWlDK0YsTUFBakMsR0FBMEMsSUFBMUM7QUFDQSxXQUFLaEMsZ0JBQUwsQ0FBc0I5RCxrQkFBdEIsQ0FBeUM4RixNQUF6QyxHQUFrRCxLQUFsRDtBQUNEO0FBQ0YsR0F2K0Q4QjtBQXkrRC9CaVMsRUFBQUEsOEJBeitEK0IsNENBeStERTtBQUMvQixTQUFLSCxzQ0FBTCxDQUE0QyxLQUE1QztBQUNELEdBMytEOEI7QUE2K0QvQkksRUFBQUEsMkNBNytEK0IseURBNitEZTtBQUM1QyxTQUFLSixzQ0FBTCxDQUE0QyxLQUE1QztBQUNBNWMsSUFBQUEsd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0Q4USxnQkFBcEQ7QUFDRCxHQWgvRDhCO0FBaS9EL0I7QUFFQTtBQUNBVyxFQUFBQSx1Q0FwL0QrQixtREFvL0RTaFMsTUFwL0RULEVBby9EaUI7QUFDOUMsU0FBS3hCLHlCQUFMLENBQStCcUIsTUFBL0IsR0FBd0NHLE1BQXhDO0FBQ0QsR0F0L0Q4QjtBQXcvRC9CaVMsRUFBQUEsb0NBeC9EK0IsZ0RBdy9ETWpTLE1BeC9ETixFQXcvRGM7QUFDM0MsU0FBS3pCLHNCQUFMLENBQTRCc0IsTUFBNUIsR0FBcUNHLE1BQXJDO0FBQ0QsR0ExL0Q4QjtBQTQvRC9Ca1MsRUFBQUEsc0NBNS9EK0Isa0RBNC9EUWxTLE1BNS9EUixFQTQvRGdCO0FBQzdDLFNBQUtsQyxrQkFBTCxDQUF3QnpDLGFBQXhCLENBQXNDd0UsTUFBdEMsR0FBK0NHLE1BQS9DO0FBQ0QsR0E5L0Q4QjtBQWdnRS9CbVMsRUFBQUEsbUNBaGdFK0IsK0NBaWdFN0JDLE9BamdFNkIsRUFrZ0U3QkMsV0FsZ0U2QixFQW1nRTdCQyxXQW5nRTZCLEVBb2dFN0JDLFVBcGdFNkIsRUFxZ0U3QjtBQUFBLFFBREFBLFVBQ0E7QUFEQUEsTUFBQUEsVUFDQSxHQURhLENBQ2I7QUFBQTs7QUFDQSxTQUFLelUsa0JBQUwsQ0FBd0JoRixVQUF4QixDQUFtQ2hCLE1BQW5DLEdBQTRDLGNBQTVDO0FBQ0EsU0FBS2dHLGtCQUFMLENBQXdCckUsU0FBeEIsQ0FBa0MzQixNQUFsQyxHQUEyQyxNQUFNc2EsT0FBTyxDQUFDN1EsSUFBekQ7QUFDQSxTQUFLekQsa0JBQUwsQ0FBd0JwRSxlQUF4QixDQUF3QzVCLE1BQXhDLEdBQWlEc2EsT0FBTyxDQUFDdFcsVUFBekQ7QUFDQSxTQUFLZ0Msa0JBQUwsQ0FBd0I1QyxpQkFBeEIsQ0FBMENwRCxNQUExQyxHQUNFLG9CQUNBL0Msd0JBQXdCLENBQUNtTCxRQUF6QixDQUFrQ0ssZUFBbEMsR0FBb0RtQixjQUFwRCxDQUFtRUMsTUFGckU7O0FBSUEsUUFBSTRRLFVBQVUsSUFBSSxDQUFsQixFQUFxQjtBQUNuQixXQUFLLElBQUk5USxLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBRzRRLFdBQVcsQ0FBQzFRLE1BQXhDLEVBQWdERixLQUFLLEVBQXJELEVBQXlEO0FBQ3ZELFlBQ0U0USxXQUFXLENBQUM1USxLQUFELENBQVgsQ0FBbUJrSixnQkFBbkIsQ0FBb0M2SCxjQUFwQyxDQUFtREMsVUFBbkQsSUFBaUUsS0FEbkUsRUFFRTtBQUNBO0FBQ0EsY0FDRUwsT0FBTyxDQUFDdFEsU0FBUixJQUNBdVEsV0FBVyxDQUFDNVEsS0FBRCxDQUFYLENBQW1Ca0osZ0JBQW5CLENBQW9DQyxpQkFBcEMsQ0FBc0Q5SSxTQUZ4RCxFQUdFO0FBQ0EsZ0JBQUl1SCxJQUFJLEdBQUc5VCxFQUFFLENBQUMrVCxXQUFILENBQWUsS0FBS3hMLGtCQUFMLENBQXdCM0MsYUFBdkMsQ0FBWDtBQUNBa08sWUFBQUEsSUFBSSxDQUFDRSxNQUFMLEdBQWMsS0FBS3pMLGtCQUFMLENBQXdCMUMsYUFBdEM7QUFDQWlPLFlBQUFBLElBQUksQ0FDRDNGLFlBREgsQ0FDZ0IsZUFEaEIsRUFFR2dQLGFBRkgsQ0FHSUwsV0FBVyxDQUFDNVEsS0FBRCxDQUFYLENBQW1Ca0osZ0JBQW5CLENBQW9DQyxpQkFBcEMsQ0FBc0Q5TyxVQUgxRDtBQUtBdU4sWUFBQUEsSUFBSSxDQUNEM0YsWUFESCxDQUNnQixlQURoQixFQUVHaVAsWUFGSCxDQUdJTixXQUFXLENBQUM1USxLQUFELENBQVgsQ0FBbUJrSixnQkFBbkIsQ0FBb0NDLGlCQUFwQyxDQUFzRDlJLFNBSDFEO0FBS0E3TSxZQUFBQSxnQkFBZ0IsQ0FBQzBQLElBQWpCLENBQXNCMEUsSUFBdEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixLQTFCRCxNQTBCTyxJQUFJa0osVUFBVSxJQUFJLENBQWxCLEVBQXFCO0FBQzFCO0FBQ0EsV0FBSyxJQUFJOVEsTUFBSyxHQUFHLENBQWpCLEVBQW9CQSxNQUFLLEdBQUc0USxXQUFXLENBQUMxUSxNQUF4QyxFQUFnREYsTUFBSyxFQUFyRCxFQUF5RDtBQUN2RCxZQUFJMlEsT0FBTyxDQUFDdFEsU0FBUixJQUFxQnVRLFdBQVcsQ0FBQzVRLE1BQUQsQ0FBWCxDQUFtQkssU0FBNUMsRUFBdUQ7QUFDckQsY0FBSXVILElBQUksR0FBRzlULEVBQUUsQ0FBQytULFdBQUgsQ0FBZSxLQUFLeEwsa0JBQUwsQ0FBd0IzQyxhQUF2QyxDQUFYO0FBQ0FrTyxVQUFBQSxJQUFJLENBQUNFLE1BQUwsR0FBYyxLQUFLekwsa0JBQUwsQ0FBd0IxQyxhQUF0QztBQUNBaU8sVUFBQUEsSUFBSSxDQUNEM0YsWUFESCxDQUNnQixlQURoQixFQUVHZ1AsYUFGSCxDQUVpQkwsV0FBVyxDQUFDNVEsTUFBRCxDQUFYLENBQW1CM0YsVUFGcEM7QUFHQXVOLFVBQUFBLElBQUksQ0FDRDNGLFlBREgsQ0FDZ0IsZUFEaEIsRUFFR2lQLFlBRkgsQ0FFZ0JOLFdBQVcsQ0FBQzVRLE1BQUQsQ0FBWCxDQUFtQkssU0FGbkM7QUFHQTdNLFVBQUFBLGdCQUFnQixDQUFDMFAsSUFBakIsQ0FBc0IwRSxJQUF0QjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxRQUFJaUosV0FBSixFQUFpQjtBQUNmLFdBQUt4VSxrQkFBTCxDQUF3QmhFLFVBQXhCLENBQW1DK0YsTUFBbkMsR0FBNEMsS0FBNUM7QUFDQSxXQUFLL0Isa0JBQUwsQ0FBd0IvRCxrQkFBeEIsQ0FBMkM4RixNQUEzQyxHQUFvRCxJQUFwRDtBQUNELEtBSEQsTUFHTztBQUNMLFdBQUsvQixrQkFBTCxDQUF3QmhFLFVBQXhCLENBQW1DK0YsTUFBbkMsR0FBNEMsSUFBNUM7QUFDQSxXQUFLL0Isa0JBQUwsQ0FBd0IvRCxrQkFBeEIsQ0FBMkM4RixNQUEzQyxHQUFvRCxLQUFwRDtBQUNEO0FBQ0YsR0EvakU4QjtBQWlrRS9CK1MsRUFBQUEsbUNBamtFK0IsaURBaWtFTztBQUNwQyxTQUFLLElBQUluUixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3hNLGdCQUFnQixDQUFDME0sTUFBN0MsRUFBcURGLEtBQUssRUFBMUQsRUFBOEQ7QUFDNUR4TSxNQUFBQSxnQkFBZ0IsQ0FBQ3dNLEtBQUQsQ0FBaEIsQ0FBd0JxSixPQUF4QjtBQUNEOztBQUNEN1YsSUFBQUEsZ0JBQWdCLEdBQUcsRUFBbkI7QUFDRCxHQXRrRThCO0FBd2tFL0I0ZCxFQUFBQSx1QkF4a0UrQixxQ0F3a0VMO0FBQ3hCLFNBQUtaLG9DQUFMLENBQTBDLEtBQTFDO0FBQ0QsR0Exa0U4QjtBQTRrRS9CYSxFQUFBQSxvQ0E1a0UrQixrREE0a0VRO0FBQ3JDLFNBQUtiLG9DQUFMLENBQTBDLEtBQTFDO0FBQ0FsZCxJQUFBQSx3QkFBd0IsQ0FBQ21MLFFBQXpCLENBQWtDSyxlQUFsQyxHQUFvRDhRLGdCQUFwRDtBQUNELEdBL2tFOEI7QUFpbEUvQjBCLEVBQUFBLHNDQWpsRStCLGtEQWlsRVFDLFNBamxFUixFQWlsRW1CO0FBQ2hELFFBQUlaLE9BQU8sR0FBR3JkLHdCQUF3QixDQUFDbUwsUUFBekIsQ0FBa0NDLHlCQUFsQyxHQUE4RHNFLFdBQTlELEdBQ1hrRyxnQkFEVyxDQUNNQyxpQkFEcEI7QUFFQSxTQUFLOU0sa0JBQUwsQ0FBd0J4QyxrQkFBeEIsQ0FBMkN4RCxNQUEzQyxHQUFvRCxjQUFwRDtBQUNBLFNBQUtnRyxrQkFBTCxDQUF3QnZDLGlCQUF4QixDQUEwQ3pELE1BQTFDLEdBQW1ELE1BQU1zYSxPQUFPLENBQUM3USxJQUFqRTtBQUNBLFNBQUt6RCxrQkFBTCxDQUF3QnRDLHVCQUF4QixDQUFnRDFELE1BQWhELEdBQXlEc2EsT0FBTyxDQUFDdFcsVUFBakU7QUFDQSxTQUFLZ0Msa0JBQUwsQ0FBd0JyQyxxQkFBeEIsQ0FBOEMzRCxNQUE5QyxHQUNFLHlCQUNBa2IsU0FEQSxHQUVBLElBRkEsR0FHQSxJQUhBLEdBSUEsdUVBTEY7QUFNRCxHQTdsRThCO0FBOGxFL0I7QUFFQTFQLEVBQUFBLFNBQVMsRUFBRSxtQkFBVTJQLE9BQVYsRUFBbUJDLElBQW5CLEVBQWdDO0FBQUEsUUFBYkEsSUFBYTtBQUFiQSxNQUFBQSxJQUFhLEdBQU4sSUFBTTtBQUFBOztBQUN6QyxTQUFLbFYsT0FBTCxDQUFhNkIsTUFBYixHQUFzQixJQUF0QjtBQUNBLFNBQUs3QixPQUFMLENBQWF3RSxRQUFiLENBQXNCLENBQXRCLEVBQXlCQSxRQUF6QixDQUFrQyxDQUFsQyxFQUFxQ2tCLFlBQXJDLENBQ0VuTyxFQUFFLENBQUNnQixLQURMLEVBRUV1QixNQUZGLEdBRVdtYixPQUZYO0FBR0EsUUFBSUUsU0FBUyxHQUFHLElBQWhCO0FBQ0E3UyxJQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNyQjZTLE1BQUFBLFNBQVMsQ0FBQ25WLE9BQVYsQ0FBa0I2QixNQUFsQixHQUEyQixLQUEzQjtBQUNELEtBRlMsRUFFUHFULElBRk8sQ0FBVjtBQUdEO0FBem1FOEIsQ0FBVCxDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVNYW5hZ2VyID0gbnVsbDtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbnZhciBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbnZhciBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxudmFyIFBhcnRuZXJTaGlwRGF0YSA9IG51bGw7XHJcbnZhciBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSBmYWxzZTtcclxudmFyIENhbmNlbGxlZElEID0gW107XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBhbW91bnQgb2YgbG9hbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgTG9hbkFtb3VudEVudW0gPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIFRlblRob3VzYW5kOiAxMDAwMCxcclxuICBUZW50eVRob3VzYW5kOiAyMDAwMCxcclxuICBUaGlydHlUaG91c2FuZDogMzAwMDAsXHJcbiAgRm9ydHlUaG91c2FuZDogNDAwMDAsXHJcbiAgRmlmdHlUaG91c2FuZDogNTAwMDAsXHJcbiAgT3RoZXI6IDYsXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzU2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1c2luZXNzU2V0dXBVSVwiLFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJOYW1lVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIG5hbWVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJDYXNoVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIGNhc2hcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVUZXh0VUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlVGV4dFVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgIHRvb2x0aXA6IFwidmFyIHRvIHN0b3JlIHRleHQgZm9yIGJ1c2luZXNzIHR5cGVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc05hbWVUZXh0VUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlVGV4dFVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgIHRvb2x0aXA6IFwidmFyIHRvIHN0b3JlIHRleHQgZm9yIGJ1c2luZXNzIG5hbWVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1R5cGVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBidXNpbmVzcyB0eXBlIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc05hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc05hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlY2UgZm9yIGJ1c2luZXNzIG5hbWUgZWRpdGJveFwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZE5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWROb2RlVUlcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIEJyaWNrQW5kTW9ydGFyTm9kZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrQW5kTW9ydGFyTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBUaW1lclVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpbWVyVUlcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIGxhYmVsIGZvciB0aW1lclwiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lck5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgdGltZXIgbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2V0dXBOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzU2V0dXBOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblNldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuU2V0dXBOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGxvYW4gc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgdHlwZTogTG9hbkFtb3VudEVudW0sXHJcbiAgICAgIGRlZmF1bHQ6IExvYW5BbW91bnRFbnVtLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJsb2FuIGFtb3VudCB0YWtlbiBieSBwbGF5ZXIgKHN0YXRlIG1hY2hpbmUpXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBhbGwgbGFiZWxzIG9mIGFtb3VudHMgaW4gbG9hbiBVSVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTdGF0dXNOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTdGF0dXNOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHdhaXRpbmcgc3RhdHVzIHNjcmVlbiBvbiBpbml0aWFsIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbk5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvbk5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgZXhpdCBidXR0b24gbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3IvL1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFR1cm5EZWNpc2lvblNldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJUdXJuRGVjaXNpb25TZXR1cFVJXCIsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE1hcmtldGluZ0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIG1hcmtldGluZyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgR29sZEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR29sZEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3QgZ29sZCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU3RvY2tFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2NrRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBzdG9jayBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gY2FzaCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBleHBuYWQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiUmVmZXJlbmNlIGZvciBjb250ZW50IG5vZGUgb2Ygc2Nyb2xsIHZpZXcgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHByZWZhYiBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG5cclxuICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLlBsYXllck5hbWVVSS5zdHJpbmcgPSBuYW1lO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGludmVzdG1lbnQvYnV5IGFuZCBzZWxsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBTdG9ja0ludmVzdDogMSxcclxuICBHb2xkSW52ZXN0OiAyLFxyXG4gIFN0b2NrU2VsbDogMyxcclxuICBHb2xkU2VsbDogNCxcclxuICBPdGhlcjogNSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0U2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJJbnZlc3RTZWxsVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpY2VSZXN1bHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2UgUmVzdWx0IG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQcmljZVRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUHJpY2VUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUHJpY2UgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFByaWNlVmFsdWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcmljZVZhbHVlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSB2YWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXlPclNlbGxUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXlPclNlbGwgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50VGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6XHJcbiAgICAgICAgXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudFZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBWYWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnV0dG9uTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGJ1dHRvbiBuYW1lIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTdGF0ZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJbnZlc3RTdGF0ZVwiLFxyXG4gICAgICB0eXBlOiBJbnZlc3RFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBJbnZlc3RFbnVtLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBBbW91bnRFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFtb3VudEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxsQnVzaW5lc3NVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VsbEJ1c2luZXNzVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTZWxsQnVzaW5lc3NVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NDb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzQ291bnRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1c2luZXNzQ291bnQgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2Nyb2xsQ29udGVudE5vZGUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZWxsUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzU2VsbFByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBCdXNpbmVzc1NlbGxQcmVmYWIgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGF5RGF5VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFBheURheSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWROdW1iZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxvY2F0aW9uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJMb2NhdGlvbnNcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTG9jYXRpb25zIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWRCdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZEJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJCdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBNYWluUGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5QYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTWFpblBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0UGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuUmVzdWx0UGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5SZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hblJlc3VsdFBhbmVsTm9kZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2NyZWVuVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRTY3JlZW5UaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0U2NyZWVuVGl0bGUgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlUmVzdWx0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEJ1c2luZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCdXNpbmVzc0xhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTG9hbkJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTG9hbkJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBTa2lwTG9hbkJ1dHRvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkZvdHRlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5Gb3R0ZXJMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkZvdHRlckxhYmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1eU9yU2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXlPclNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1eU9yU2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBPbmVRdWVzdGlvblVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBPbmVRdWVzdGlvblVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiT25lUXVlc3Rpb25VSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyRGV0YWlsTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZXRhaWxzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRldGFpbHNQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgRGV0YWlsc1ByZWZhYiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBTY3JvbGxDb250ZW50IG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbm9kZSBXYWl0aW5nU2NyZWVuIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25UaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25DYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25DYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25RdWVzdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUXVlc3Rpb25MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgcXVlc3Rpb24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXJ0bmVyc2hpcFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXJ0bmVyc2hpcFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGFydG5lcnNoaXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFdhaXRpbmdTdGF0dXNTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSB3YWl0aW5nIHNjcmVlbiBub2RlIG9mIHBhcnRuZXJzaGlwIHVpXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZU5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lclNoaXBQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lclNoaXBQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25EZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEdhbWVwbGF5VUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhSW50YW5jZTtcclxudmFyIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U7XHJcbnZhciBSZXF1aXJlZENhc2g7XHJcbnZhciBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xOyAvLy0xIG1lYW5zIG5ldyBidXNpbmVzcyBpcyBub3QgaW5zdGFudGlhbHRlZCBmcm9tIGluc2lkZSBnYW1lICwgaWYgaXQgaGFzIGFueSBvdGhlciB2YWx1ZSBpdCBtZWFucyBpdHMgYmVlbiBpbnN0YW50aWF0ZWQgZnJvbSBpbnNpZGUgZ2FtZSBhbmQgaXRzIHZhbHVlIHJlcHJlc2VudHMgaW5kZXggb2YgcGxheWVyXHJcblxyXG4vL3R1cm4gZGVjaXNpb25zXHJcbnZhciBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxudmFyIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4vL2J1eW9yc2VsbFxyXG52YXIgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG52YXIgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxudmFyIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxudmFyIERpY2VSZXN1bHQ7XHJcbnZhciBPbmNlT3JTaGFyZTtcclxudmFyIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcblxyXG52YXIgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBMb2FuUGF5ZWQgPSBmYWxzZTtcclxudmFyIFRvdGFsUGF5RGF5QW1vdW50ID0gMDtcclxudmFyIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG5cclxudmFyIEdhbWVwbGF5VUlNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiR2FtZXBsYXlVSU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgQnVzaW5lc3NTZXR1cERhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogQnVzaW5lc3NTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1c2luZXNzU2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFR1cm5EZWNpc2lvblNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVHVybkRlY2lzaW9uU2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBUdXJuRGVjaXNpb25TZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2VsbFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogSW52ZXN0U2VsbFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBheURheVNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUGF5RGF5VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsbEJ1c2luZXNzVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgU2VsbEJ1c2luZXNzVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBJbnZlc3RVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEJ1eU9yU2VsbFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1eU9yU2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBPbmVRdWVzdGlvblVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIE9uZVF1ZXN0aW9uVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyc2hpcFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFBhcnRuZXJzaGlwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgUGFydG5lcnNoaXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBidXNpbmVzcyBzZXR1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBHYW1lcGxheVVJU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgZ2FtZXBsYXkgdWkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBEZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0ICYgc2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBQYXlEYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsbEJ1c2luZXNzIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXlPclNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TcGFjZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uU3BhY2Ugc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uRGVjaXNpb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgVGVtcERpY2VUZXh0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBkaWNlXCIsXHJcbiAgICB9LFxyXG4gICAgTGVhdmVSb29tQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuXHJcbiAgICAvL2xvY2FsIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5CYW5rcnVwdGVkQW1vdW50ID0gMDtcclxuICB9LFxyXG5cclxuICBSZXNldFR1cm5WYXJpYWJsZSgpIHtcclxuICAgIHRoaXMuR29sZEludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkdvbGRTb2xkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tTb2xkID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcblxyXG4gICAgaWYgKCFHYW1lTWFuYWdlciB8fCBHYW1lTWFuYWdlciA9PSBudWxsKVxyXG4gICAgICBHYW1lTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVSSBTZXR1cFxyXG4gIEluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIENsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuTGVhdmVSb29tQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJTcGxhc2hcIik7XHJcbiAgICB9LCA1MDApO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXNpbmVzc1NldHVwIHdpdGggbG9hblxyXG4gIC8vQnVzaW5lc3Mgc2V0dXAgdWkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIFN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFxyXG4gICAgaXNGaXJzdFRpbWUsXHJcbiAgICBpbnNpZGVHYW1lID0gZmFsc2UsXHJcbiAgICBtb2RlSW5kZXggPSAwLFxyXG4gICAgX2lzQmFua3J1cHRlZCA9IGZhbHNlLFxyXG4gICAgX0JhbmtydXB0QW1vdW50ID0gMFxyXG4gICkge1xyXG4gICAgLy9jYWxsZWQgZmlyc3QgdGltZSBmb3JtIEdhbWVNYW5hZ2VyIG9ubG9hZCBmdW5jdGlvblxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IF9pc0JhbmtydXB0ZWQ7XHJcbiAgICB0aGlzLkJhbmtydXB0ZWRBbW91bnQgPSBfQmFua3J1cHRBbW91bnQ7XHJcblxyXG4gICAgaWYgKF9pc0JhbmtydXB0ZWQpIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuXHJcbiAgICB0aGlzLkluaXRfQnVzaW5lc3NTZXR1cChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSwgbW9kZUluZGV4LCBfaXNCYW5rcnVwdGVkKTtcclxuICB9LFxyXG4gIEluaXRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFxyXG4gICAgaXNGaXJzdFRpbWUsXHJcbiAgICBpbnNpZGVHYW1lID0gZmFsc2UsXHJcbiAgICBtb2RlSW5kZXggPSAwLFxyXG4gICAgX2lzQmFua3J1cHRlZCA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5QbGF5ZXJEYXRhKCk7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLkJ1c2luZXNzSW5mbygpO1xyXG5cclxuICAgIGlmIChpc0ZpcnN0VGltZSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gMTAwMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCgpO1xyXG5cclxuICAgIGlmIChpbnNpZGVHYW1lKSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBmb3IgKFxyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgaW5kZXggPFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1xyXG4gICAgICAgICAgLmxlbmd0aDtcclxuICAgICAgICBpbmRleCsrXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhXHJcbiAgICAgICAgICAgIC51c2VySUQgPT1cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgaW5kZXhcclxuICAgICAgICAgIF0uUGxheWVyVUlEXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IGluZGV4O1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBpbmRleFxyXG4gICAgICAgICAgICBdLlBsYXllck5hbWVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBpbmRleFxyXG4gICAgICAgICAgICBdLlBsYXllclVJRFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBpbmRleFxyXG4gICAgICAgICAgICBdLkNhc2hcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWVcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgR2V0T2JqX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChuYW1lKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllck5hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFVJRCkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyVUlEID0gVUlEO1xyXG4gIH0sXHJcbiAgT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUkgPSBuYW1lO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9IG5hbWU7XHJcbiAgfSxcclxuICBPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IG5hbWU7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuICBSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVSSA9IFwiXCI7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUubm9uZTtcclxuICB9LFxyXG4gIE9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPVxyXG4gICAgICBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICB9LFxyXG4gIE9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9XHJcbiAgICAgIEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXI7XHJcbiAgfSxcclxuICBPbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gXCIkXCIgKyBhbW91bnQ7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gYW1vdW50O1xyXG4gIH0sXHJcbiAgQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICBpbmRleCA8IFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcbiAgICAgIGluZGV4KytcclxuICAgICkge1xyXG4gICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9sb2FuVGFrZW4pIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgXCJZb3UgaGF2ZSBhbHJlYWR5IHRha2VuIGxvYW4gb2YgJFwiICtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudFxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICBcIllvdSBkbyBub3QgbmVlZCBsb2FuLCB5b3UgaGF2ZSBlbm91Z2ggY2FzaCB0byBidXkgY3VycmVudCBzZWxlY3RlZCBidXNpbmVzcy5cIlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgUmVxdWlyZWRDYXNoID0gTWF0aC5hYnMocGFyc2VJbnQoUGxheWVyRGF0YUludGFuY2UuQ2FzaCkgLSBhbW91bnQpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChcclxuICAgICAgICAgIGNjLkxhYmVsXHJcbiAgICAgICAgKS5zdHJpbmcgPSBcIiRcIiArIFJlcXVpcmVkQ2FzaDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChcclxuICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT1cclxuICAgICAgR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhclxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwKDUwMDAwKTtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09XHJcbiAgICAgIEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoMTAwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgXCJwbGVhc2Ugc2VsZWN0IGJ1c2luZXNzIGJldHdlZW4gSG9tZSBCYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIuIFwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG4gIEhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpbmRleCA9PSBpKVxyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uT3RoZXI7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgwKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UZW5UaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDEpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wM19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlbnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgyKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UaGlydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDMpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZvcnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg0KTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5GaWZ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNSk7XHJcbiAgfSxcclxuICBPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID09IExvYW5BbW91bnRFbnVtLk90aGVyKVxyXG4gICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSBSZXF1aXJlZENhc2g7XHJcbiAgICBlbHNlXHJcbiAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IHBhcnNlSW50KFxyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudFxyXG4gICAgICApO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuID0gdHJ1ZTtcclxuICAgIHRoaXMuT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggKyBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gIH0sXHJcblxyXG4gIFN5bmNEYXRhOiBmdW5jdGlvbiAoX2RhdGEsIF9JRCkge1xyXG4gICAgaWYgKFxyXG4gICAgICBfSUQgIT1cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpXHJcbiAgICAgICAgLmFjdG9yTnJcclxuICAgIClcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goXHJcbiAgICAgICAgX2RhdGFcclxuICAgICAgKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvXHJcbiAgICAgICAgLmxlbmd0aCA+PVxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnNcclxuICAgICkge1xyXG4gICAgICAvL3NldHRpbmcgcm9vbSBwcm9wZXJ0eSB0byBkZWNsYXJlIGluaXRpYWwgc2V0dXAgaGFzIGJlZW5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAgICAgIC5nZXRQaG90b25SZWYoKVxyXG4gICAgICAgIC5teVJvb20oKVxyXG4gICAgICAgIC5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLCB0cnVlLCB0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAgICAgIC5nZXRQaG90b25SZWYoKVxyXG4gICAgICAgIC5teVJvb20oKVxyXG4gICAgICAgIC5zZXRDdXN0b21Qcm9wZXJ0eShcclxuICAgICAgICAgIFwiUGxheWVyR2FtZUluZm9cIixcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyxcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFB1cmNoYXNlQnVzaW5lc3M6IGZ1bmN0aW9uIChfYW1vdW50LCBfYnVzaW5lc3NOYW1lLCBfaXNIb21lQmFzZWQpIHtcclxuICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIDwgX2Ftb3VudCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICBcIllvdSBoYXZlIG5vdCBlbm91Z2ggY2FzaCB0byBidXkgdGhpcyBcIiArIF9idXNpbmVzc05hbWUgKyBcIiBidXNpbmVzcy5cIlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9pc0hvbWVCYXNlZCkge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQgPCAzKSB7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPVxyXG4gICAgICAgICAgICBcIiRcIiArIFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBIb21lIGJhc2VkIGJ1c2luZXNzZXNcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBfYW1vdW50O1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9XHJcbiAgICAgICAgICBcIiRcIiArIFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJyaWNrQW5kTW9ydGFyQW1vdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuKSB7XHJcbiAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPVxyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUmV2ZXJ0aW5nIGJhY2sgbG9hbiBhbW91bnQuXCIsIDUwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5CYW5rcnVwdEFtb3VudCA9IHRoaXMuQmFua3J1cHRlZEFtb3VudDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKClcclxuICAgICAgXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goXHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2VcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgLy9zZXR0aW5nIHBsYXllciBjdXJyZW50IGRhdGEgaW4gY3VzdG9tIHByb3BlcnRpZXMgd2hlbiBoaXMvaGVyIHR1cm4gb3ZlcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAgICAgIC5QaG90b25BY3RvcigpXHJcbiAgICAgICAgLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgUGxheWVyRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxLFxyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2VcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfZGF0YSA9IHtcclxuICAgICAgICAgIERhdGE6IHtcclxuICAgICAgICAgICAgYmFua3J1cHRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgdHVybjogR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKSxcclxuICAgICAgICAgICAgUGxheWVyRGF0YU1haW46IFBsYXllckRhdGFJbnRhbmNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA5LFxyXG4gICAgICAgICAgX2RhdGFcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgQUlcclxuICAgICAgaWYgKCF0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuKCk7XHJcbiAgICAgICAgfSwgMTYwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm5BZnRlckJhbmtydXB0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJubyBtb2RlIHNlbGVjdGVkXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwXHJcbiAgICBdID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIFBheUFtb3VudFRvUGxheUdhbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuU3RhcnRHYW1lID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPT0gXCJcIilcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyB0eXBlLlwiKTtcclxuICAgIGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID09IFwiXCIpXHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgbmFtZS5cIik7XHJcbiAgICBlbHNlIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWRcclxuICAgICAgKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgaG9tZWJhc3NlZFxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcygxMDAwMCwgXCJob21lXCIsIHRydWUpO1xyXG4gICAgICBlbHNlIGlmIChcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXJcclxuICAgICAgKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcyg1MDAwMCwgXCJicmljayBhbmQgbW9ydGFyXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlN0YXJ0R2FtZSA9PSB0cnVlIHx8IHRoaXMuSXNCYW5rcnVwdGVkID09IHRydWUpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgICAgaWYgKEluc2lkZUdhbWVCdXNpbmVzc1NldHVwICE9IC0xKVxyXG4gICAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIG5vdCBiZWVuIGNhbGxlZCBmcm9tIGluc2lkZSBnYW1lXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIGJlZW4gY2FsbGVkIGF0IHN0YXJ0IG9mIGdhbWUgYXMgaW5pdGlhbCBzZXR1cFxyXG4gICAgICAgIGVsc2UgdGhpcy5Jbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCgpO1xyXG5cclxuICAgICAgICAvL3BydGludGluZyBhbGwgdmFsdWVzIHRvIGNvbnNvbGVcclxuICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgICAgaSA8XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9cclxuICAgICAgICAgICAgLmxlbmd0aDtcclxuICAgICAgICAgIGkrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIFwicGxheWVyIG5hbWU6IFwiICtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIC5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJOYW1lXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIFwicGxheWVyIElEOiBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9baV0uUGxheWVyVUlEXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIFwiSXMgcGxheWVyIGJvdDogXCIgK1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKVxyXG4gICAgICAgICAgICAgICAgLlBsYXllckdhbWVJbmZvW2ldLklzQm90XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJubyBvZiBidXNpbmVzcyBvZiBwbGF5ZXIgKHNlZSBiZWxvdyk6IFwiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgaVxyXG4gICAgICAgICAgICBdLk5vT2ZCdXNpbmVzc1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBcInBsYXllciBjYXNoOiBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9baV0uQ2FzaFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBcInBsYXllciB0YWtlbiBsb2FuOiBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9baV0uTG9hblRha2VuXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIFwidGFrZW4gbG9hbiBhbW91bnQ6IFwiICtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIC5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuQW1vdW50XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBUdXJuRGVjaXNpb25TZXR1cFVJXHJcbiAgLy9UdXJuRGVjaXNpb25TZXR1cFVJLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChpc2FjdGl2ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBpc2FjdGl2ZTtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkNhc2hBbW91bnRMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBcIiQgXCIgK1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKVxyXG4gICAgICBdLkNhc2g7XHJcbiAgfSxcclxuXHJcbiAgT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IGFtb3VudDtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gXCJcIiB8fCBUZW1wTWFya2V0aW5nQW1vdW50ID09IG51bGwpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB0aGlzLm1hcmtldGluZ0Ftb3VudCA9IHBhcnNlSW50KFRlbXBNYXJrZXRpbmdBbW91bnQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2hcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vaWYgcGxheWVyIGVudGVyZWQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiB0b3RhbCBjYXNoIGhlIG93bnNcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaCA+PSB0aGlzLm1hcmtldGluZ0Ftb3VudFxyXG4gICAgICApIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2ggPVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCAtIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uTWFya2V0aW5nQW1vdW50ID1cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLk1hcmtldGluZ0Ftb3VudCArIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3Ugc3VjY2Vzc2Z1bGx5IG1hcmtldGVkIGFtb3VudCBvZiAkXCIgK1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uTWFya2V0aW5nQW1vdW50ICtcclxuICAgICAgICAgICAgXCIgLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgK1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uQ2FzaCArXHJcbiAgICAgICAgICAgIFwiLlwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcblxyXG4gICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIpO1xyXG5cclxuICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25IaXJpbmdMYXd5ZXJCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gaWYgcGxheWVyIGhhcyBtb3JlIHRoYW4gNTAwMCRcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgaWYgKFxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgIF0uTGF3eWVyU3RhdHVzXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBhbHJlYWR5IGhpcmVkIGEgbGF3eWVyLlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2ggPj0gNTAwMFxyXG4gICAgICApIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkxhd3llclN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgVGVtcEhpcmluZ0xhd3llciA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coVGVtcEhpcmluZ0xhd3llcik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5DYXNoID1cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLkNhc2ggLSA1MDAwO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3UgaGF2ZSBzdWNjZXNzZnVsbHkgaGlyZWQgYSBsYXd5ZXIsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5DYXNoICtcclxuICAgICAgICAgICAgXCIuXCJcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInNvcnJ5LCB5b3UgZG9udCBoYXZlIGVub3VnaCBtb25leSB0byBoaXJlIGEgbGF3eWVyLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oX25hbWUpIHtcclxuICAgIExvY2F0aW9uTmFtZSA9IF9uYW1lO1xyXG4gIH0sXHJcbiAgT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9pZiBwbGF5ZXIgaGFzIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgaGUgY291bGQgZXhwYW5kIGl0XHJcbiAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzc1wiKTtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHZhciBnZW5lcmF0ZWRMZW5ndGggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbigpO1xyXG5cclxuICAgIGlmIChnZW5lcmF0ZWRMZW5ndGggPT0gMCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgdG8gZXhwYW5kLlwiLCAxNTAwKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfSwgMTYwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG4gICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIE9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJzdGFydGluZyBuZXcgYnVzaW5lc3NcIik7XHJcbiAgICB0aGlzLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSwgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLkdvbGRJbnZlc3RlZCkge1xyXG4gICAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkSW52ZXN0O1xyXG4gICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgXCJJbnZlc3QgSW4gR09MRFwiLFxyXG4gICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgT25jZU9yU2hhcmUgKyBcIi9vdW5jZVwiLFxyXG4gICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIEJVWVwiLFxyXG4gICAgICAgIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIixcclxuICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgIFwiQlVZXCIsXHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBnb2xkIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLCA4MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gbmFtZTtcclxuICB9LFxyXG5cclxuICBPblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuU3RvY2tJbnZlc3RlZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFN0b2NrQnVzaW5lc3NOYW1lID09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGEgYnVzaW5lc3MgbmFtZSB0byBpbnZlc3QuXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5TdG9ja0ludmVzdDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgXCJJbnZlc3QgaW4gU3RvY2tcIixcclxuICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICBcIkVhY2ggU2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsXHJcbiAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIEJVWVwiLFxyXG4gICAgICAgICAgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgICAgT25jZU9yU2hhcmUgKyBcIiowPTBcIixcclxuICAgICAgICAgIFwiQlVZXCIsXHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsIDgwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZFNvbGQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkdvbGRDb3VudCA+IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5Hb2xkU29sZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkU2VsbDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgXCJTZWxsIEdPTERcIixcclxuICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIvb3VuY2VcIixcclxuICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIFNFTExcIixcclxuICAgICAgICAgIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgIFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgR09MRCBvdW5jZXMsIHBsZWFzZSBidXkgdGhlbS5cIlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBzZWxsIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsIDgwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLlN0b2NrU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uU3RvY2tDb3VudCA+IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICBcIlNlbGwgU1RPQ0tcIixcclxuICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICBcIkVhY2ggc2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsXHJcbiAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIFNFTExcIixcclxuICAgICAgICAgIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIG5vdCBwdXJjaGFzZWQgYW55IHNoYXJlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLCA4MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJnbyBpbnRvIHBhcnRuZXIgc2hpcFwiKTtcclxuICAgIC8vIHRoaXMuU2hvd1RvYXN0KFwid29yayBpbiBwcm9ncmVzcywgY29taW5nIHNvb24uLi5cIik7XHJcbiAgICAvLyB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicm9sbCB0aGUgZGljZVwiKTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsRGljZSgpO1xyXG4gIH0sXHJcblxyXG4gIFByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAvL3RoaXMuVGVtcERpY2VUZXh0LnN0cmluZz12YWx1ZTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gUGFydG5lcnNoaXAgc2V0dXBcclxuICBUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLk1haW5TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLldhaXRpbmdTdGF0dXNTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJOYW1lLnN0cmluZyA9X3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJDYXNoLnN0cmluZyA9XCIkXCIrX3RlbXBEYXRhLkNhc2g7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGFydG5lclNoaXBQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgdmFyIF90b3RhbExvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc1ZhbHVlKDEwMDAwKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgICAgdmFyIF9hbGxMb2NhdGlvbnNBbW91bnQgPSBfdG90YWxMb2NhdGlvbnMgKiAyNTAwMDtcclxuICAgICAgICB2YXIgX2ZpbmFsQW1vdW50ID0gNTAwMDAgKyBfYWxsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLklzUGFydG5lcnNoaXAgPT0gdHJ1ZSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uUGFydG5lck5hbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShcIm5vbmVcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICBcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAoX21zZykge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZS5zdHJpbmcgPV90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25QbGF5ZXJDYXNoLnN0cmluZyA9XCIkXCIrX3RlbXBEYXRhLkNhc2g7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvbkRlc2NyaXB0aW9uLnN0cmluZyA9IF9tc2c7XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9QYXJ0bmVyU2hpcFNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICB9LFxyXG4gIFxyXG4gIFJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKVxyXG4gIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAoX2RhdGEpXHJcbiAge1xyXG4gICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gdHJ1ZTtcclxuICAgIFBhcnRuZXJTaGlwRGF0YSA9IF9kYXRhO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgIHZhciBfdHVybiA9IF9kYXRhLkRhdGEuVHVybjtcclxuICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIF9idXNpbmVzc1ZhbHVlID0gX2RhdGEuRGF0YS5CdXNWYWx1ZTtcclxuICAgIHZhciBfcGF5QW1vdW50ID0gX2J1c2luZXNzVmFsdWUgLyAyO1xyXG4gICAgdmFyIF9idXNpbmVzc01vZGUgPSBcIlwiO1xyXG5cclxuICAgIGlmIChfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpXHJcbiAgICAgIF9idXNpbmVzc01vZGUgPSBcIkhvbWUgQmFzZWRcIjtcclxuICAgIGVsc2UgaWYgKF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMilcclxuICAgICAgX2J1c2luZXNzTW9kZSA9IFwiQnJpY2sgJiBNb3J0YXJcIjtcclxuICAgICAgXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgIHZhciBfbXNnID0gXCJ5b3UgaGF2ZSByZWNlaXZlZCBwYXJ0bmVyc2hpcCBvZmZlciBieSBcIiArIF9wbGF5ZXJEYXRhLlBsYXllck5hbWUgKyBcIiAsIGZvbGxvd2luZyBhcmUgdGhlIGRldGFpbHMgb2YgYnVzaW5lc3M6IFwiICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgTmFtZTogXCIgKyBfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NOYW1lICsgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBNb2RlOiBcIiArIF9idXNpbmVzc01vZGUgKyBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIFZhbHVlOiAkXCIgKyBfYnVzaW5lc3NWYWx1ZSArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQ2FzaCBQYXltZW50OiAkXCIgKyBfcGF5QW1vdW50ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiaWYgb2ZmZXIgaXMgYWNjZXB0ZWQgeW91IHdpbGwgcmVjZWl2ZSA1MCUgc2hhcmUgb2YgdGhhdCBwYXJ0aWN1bGFyIGJ1c2luZXNzIGFuZCB3aWxsIHJlY2VpdmUgcHJvZml0L2xvc2Ugb24gdGhhdCBwYXJ0aWN1bGFyIGJ1c2luZXNzLlwiO1xyXG4gICAgXHJcbiAgICAgIHRoaXMuRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpO1xyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBBY2NlcHRPZmZlcl9QYXJ0bmVyc2hpcFNldHVwKClcclxuICB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2FsbEFjdG9ycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcbiAgXHJcbiAgICBpZiAoUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLkNhc2ggPj0gX3BheUFtb3VudCkge1xyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLkNhc2ggLT0gX3BheUFtb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCh0cnVlLCBfcGF5QW1vdW50LCBmYWxzZSwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uUGxheWVyVUlELCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcImNvbmdyYXR1bGF0aW9ucyEgeW91IGhhdmUgc3RhcnRlZCBidXNpbmVzcyBwYXJ0bmVyc2hpcFwiLDE4MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiTm90IGVub3VnaCBjYXNoLlwiLCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2VcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpXHJcbiAge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgbXlJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuICAgIGNvbnNvbGUubG9nKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICBpZiAoUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKGZhbHNlLCAwLCB0cnVlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgY2FuY2VsbGVkIHRoZSBvZmZlci5cIiwxMjAwKTtcclxuICAgIH0gZWxzZVxyXG4gICAge1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGNhbmNlbGxlZCB0aGUgb2ZmZXIuXCIsMTIwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoX2lzQWNjZXB0ZWQ9ZmFsc2UsX3BheW1lbnQ9MCxfaXNDYW5jZWxsZWQ9ZmFsc2UsX3VJRD1cIlwiLF9kYXRhPW51bGwsX2J1c2luZXNzSW5kZXg9MClcclxuICB7XHJcbiAgICB2YXIgX21haW5EYXRhID0geyBEYXRhOiB7IEFjY2VwdGVkOiBfaXNBY2NlcHRlZCwgQ2FzaFBheW1lbnQ6X3BheW1lbnQsQ2FuY2VsbGVkOl9pc0NhbmNlbGxlZCxQbGF5ZXJJRDpfdUlELFBsYXllckRhdGE6X2RhdGEsQnVzaW5lc3NJbmRleDpfYnVzaW5lc3NJbmRleH0gfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTIsIF9tYWluRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfZGF0YSlcclxuICB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB2YXIgX2FjY2VwdGVkID0gX2RhdGEuRGF0YS5BY2NlcHRlZDtcclxuICAgICAgdmFyIF9jYXNoID0gX2RhdGEuRGF0YS5DYXNoUGF5bWVudDtcclxuICAgICAgdmFyIF9jYW5jZWxsZWQgPSBfZGF0YS5EYXRhLkNhbmNlbGxlZDtcclxuICAgICAgdmFyIF91aWQgPSBfZGF0YS5EYXRhLlBsYXllcklEO1xyXG4gICAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuQnVzaW5lc3NJbmRleDtcclxuICAgIFxyXG4gICAgICBjb25zb2xlLmxvZyhcImFuc3dlciByZWNlaXZlZFwiKTtcclxuICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Nhc2g7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCA9IHRydWU7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lcklEID0gX3VpZDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVyTmFtZSA9IF9wbGF5ZXJEYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIGFjY2VwdGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IFwiICsgX3BsYXllckRhdGEuUGxheWVyTmFtZSArIFwiLCBjYXNoICRcIiArIF9jYXNoICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBhY2NvdW50LlwiLCAyODAwKTtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9jYW5jZWxsZWQpIHtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5pbmNsdWRlcyhfdWlkKSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgICBDYW5jZWxsZWRJRC5wdXNoKF91aWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgY29uc29sZS5sb2coQ2FuY2VsbGVkSUQpO1xyXG4gICAgICAgICAgaWYgKENhbmNlbGxlZElELmxlbmd0aCA9PSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXJ0bmVyc2hpcCBvZmZlciBoYXMgYmVlbiBjYW5jZWxsZWQgYnkgYWxsIG90aGVyIHVzZXJzLlwiLCAyODAwKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIHJlamVjdGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX2FjY2VwdGVkKSB7XHJcbiAgICAgICAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiT2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgb3RoZXIgcGxheWVyLlwiLCAxODAwKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfY2FuY2VsbGVkKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEludmVzdCBhbmQgc2VsbCBtb2RkdWxlXHJcblxyXG4gIFJlc2V0R29sZElucHV0KCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkdvbGRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICBHb2xkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlN0b2NrRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIG9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsKF9hbW91bnQpIHtcclxuICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IF9hbW91bnQ7XHJcblxyXG4gICAgaWYgKEVudGVyQnV5U2VsbEFtb3VudCA9PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgT25jZU9yU2hhcmUgKyBcIipcIiArIEVudGVyQnV5U2VsbEFtb3VudCArIFwiPVwiICsgX2Ftb3VudFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB0aGlzLlJlc2V0R29sZElucHV0KCk7XHJcbiAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgIF90aXRsZSxcclxuICAgIF9kaWNlUmVzdWx0LFxyXG4gICAgX3ByaWNlVGl0bGUsXHJcbiAgICBfcHJpY2VWYWx1ZSxcclxuICAgIF9idXlPclNlbGxUaXRsZSxcclxuICAgIF90b3RhbEFtb3VudFRpdGxlLFxyXG4gICAgX3RvdGFsQW1vdW50VmFsdWUsXHJcbiAgICBfYnV0dG9uTmFtZSxcclxuICAgIF9zdGF0ZVxyXG4gICkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IF90aXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlUmVzdWx0O1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVRpdGxlTGFiZWwuc3RyaW5nID0gX3ByaWNlVGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVmFsdWVMYWJlbC5zdHJpbmcgPSBfcHJpY2VWYWx1ZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV5T3JTZWxsVGl0bGVMYWJlbC5zdHJpbmcgPSBfYnV5T3JTZWxsVGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VGl0bGVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXR0b25OYW1lTGFiZWwuc3RyaW5nID0gX2J1dHRvbk5hbWU7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlRGF0YV9JbnZlc3RTZWxsKF90b3RhbEFtb3VudFZhbHVlKSB7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRWYWx1ZTtcclxuICB9LFxyXG5cclxuICBBcHBseUJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgaWYgKEVudGVyQnV5U2VsbEFtb3VudCA9PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uR29sZEludmVzdCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIF9Ub3RhbEFtb3VudCA8PVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCA9XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5DYXNoIC0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uR29sZENvdW50ID1cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLkdvbGRDb3VudCArIF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICsgX2Ftb3VudCArIFwiIG91bmNlcyBvZiBHT0xEXCIsXHJcbiAgICAgICAgICAgIDE0MDBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5Hb2xkU2VsbCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBfYW1vdW50IDw9XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5Hb2xkQ291bnRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoID1cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLkNhc2ggKyBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5Hb2xkQ291bnQgPVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uR29sZENvdW50IC0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICtcclxuICAgICAgICAgICAgICBfYW1vdW50ICtcclxuICAgICAgICAgICAgICBcIiBvdW5jZXMgb2YgR09MRCBmb3IgICRcIiArXHJcbiAgICAgICAgICAgICAgX1RvdGFsQW1vdW50LFxyXG4gICAgICAgICAgICAxNDAwXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcInlvdSBkb24ndCBoYXZlIGVub3VnaCBHT0xEIG91bmNlcywgeW91IG93biBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgK1xyXG4gICAgICAgICAgICAgIFwiIG9mIEdPTEQgb3VuY2VzXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5TdG9ja0ludmVzdCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIF9Ub3RhbEFtb3VudCA8PVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCA9XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5DYXNoIC0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uU3RvY2tDb3VudCA9XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5TdG9ja0NvdW50ICsgX2Ftb3VudDtcclxuICAgICAgICAgIC8vY2FuIGFkZCBtdWx0aXBsZSBzdG9ja3Mgd2l0aCBidXNpbmVzcyBuYW1lIGluIG9iamVjdCBpZiByZXF1aXJlZFxyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIgK1xyXG4gICAgICAgICAgICAgIF9hbW91bnQgK1xyXG4gICAgICAgICAgICAgIFwiIHNoYXJlcyBvZiBidXNpbmVzcyBcIiArXHJcbiAgICAgICAgICAgICAgU3RvY2tCdXNpbmVzc05hbWUsXHJcbiAgICAgICAgICAgIDE0MDBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5TdG9ja1NlbGwpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIF9hbW91bnQgPD1cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLlN0b2NrQ291bnRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoID1cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLkNhc2ggKyBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5TdG9ja0NvdW50ID1cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLlN0b2NrQ291bnQgLSBfYW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICtcclxuICAgICAgICAgICAgICBfYW1vdW50ICtcclxuICAgICAgICAgICAgICBcIiBzaGFyZXMgb2Ygc3RvY2sgZm9yICAkXCIgK1xyXG4gICAgICAgICAgICAgIF9Ub3RhbEFtb3VudCxcclxuICAgICAgICAgICAgMTQwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggc3RvY2tzIHNoYXJlcywgeW91IG93biBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ICtcclxuICAgICAgICAgICAgICBcIiBvZiBzdG9jayBzaGFyZXNcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFBheWRheSBvciBEb3VibGUgcGF5IERheVxyXG4gIFRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBheURheVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pIHtcclxuICAgIGlmIChITUFtb3VudCA9PSAwKSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChcclxuICAgICAgICBjYy5CdXR0b25cclxuICAgICAgKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoXHJcbiAgICAgICAgY2MuQnV0dG9uXHJcbiAgICAgICkuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQk1BbW91bnQgPT0gMCkge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFsb2FuVGFrZW4pIHtcclxuICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZXRMb2FuQW1vdW50X1BheURheSgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHZhciBfbG9hbiA9IDA7XHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuICAgICAgaW5kZXgrK1xyXG4gICAgKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW4gPVxyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfbG9hbjtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EYXRhX1BheURheShfdGl0bGUsX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsX3NraXBITSA9IGZhbHNlLF9za2lwQk0gPSBmYWxzZSxfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfaXNEb3VibGVQYXlEYXk7XHJcbiAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBfdGl0bGU7XHJcbiAgICB2YXIgX3RpbWUgPSAxODAwO1xyXG5cclxuICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcbiAgICAgIGVsc2UgaWYgKF9za2lwSE0pXHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcbiAgICAgIGVsc2UgaWYgKF9za2lwQk0pXHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsX3RpbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgIGVsc2UgaWYgKF9za2lwSE0pXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgIGVsc2UgaWYgKF9za2lwQk0pXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaFxyXG4gICAgKTtcclxuXHJcbiAgICB2YXIgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICB2YXIgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgIHZhciBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDtpbmRleCA8R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtpbmRleCsrKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbG9hblRha2VuID0gX2xvYW5UYWtlbjtcclxuXHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkTnVtYmVyTGFiZWwuc3RyaW5nID0gSE1BbW91bnQ7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQk1OdW1iZXJMYWJlbC5zdHJpbmcgPSBCTUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxvY2F0aW9uTGFiZWwuc3RyaW5nID0gQk1Mb2NhdGlvbnM7XHJcblxyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgLy9jaGVjayBpZiBsb2FuIHdhcyBza2lwcGVkIHByZXZpb3VzbHlcclxuICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkge1xyXG4gICAgICB2YXIgX2xvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nID0gXCIqcGF5ICRcIiArIF9sb2FuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJDUwMDBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCAwLCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBITSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCBCTUFtb3VudCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgaWYgKF9za2lwQk0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG5cclxuICAgIGlmIChfc2tpcEJNIHx8IF9za2lwSE0pIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSwgX3RpbWUgKyAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5PbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICB0aGlzLk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5PbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIGlmICghSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgaWYgKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcblxyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHZhciBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgdmFyIF9kaWNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxPbmVEaWNlKCk7XHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcztcclxuXHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcblxyXG4gICAgICAvL3BhcnRuZXJzaGlwIGNvZGVcclxuICAgICAgaWYgKERvdWJsZVBheURheSlcclxuICAgICAgICBfbXVsdGlwbGllciA9IDI7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLklzUGFydG5lcnNoaXApXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9X211bHRpcGxpZXIqIF9kaWNlICogMTAwMDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gKF9wYXltZW50IC8gMik7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgfSAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZD4wKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBwYXJ0bmVyc2hpcCBpbiBzb21lIGJ1c2luZXNzLCByZXNwZWN0aXZlIDUwJSBwcm9maXQgb2YgcGFydGljdWxhciBidXNpbmVzcyB3aWxsIGJlIHNoYXJlZC5cIiwgMjAwMCk7XHJcbiAgICAgIH1cclxuICAgICAgLy9wYXJ0bmVyc2hpcCBjb2RlXHJcblxyXG4gICAgICBpZiAoIURvdWJsZVBheURheSlcclxuICAgICAgICBUb3RhbFBheURheUFtb3VudCA9IEhNQW1vdW50ICogX2RpY2UgKiAxMDAwLV9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBUb3RhbFBheURheUFtb3VudCA9IDIgKiAoSE1BbW91bnQgKiBfZGljZSkgKiAxMDAwLV9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcblxyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZyA9IEhNQW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID1cIihcIitfZGljZSArIFwiKlwiICsgSE1BbW91bnQgKyBcIipcIiArIFwiMTAwMCktXCIrX2Ftb3VudFRvQmVBZGp1c3RlZCtcIj1cIisgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPVwiKFwiK19kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKjIpLVwiK19hbW91bnRUb0JlQWRqdXN0ZWQrXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIGlmICghRG91YmxlUGF5RGF5KVxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkRvdWJsZVBheURheVwiO1xyXG5cclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgdmFyIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudCA9IEJNQW1vdW50ICsgQk1Mb2NhdGlvbnM7XHJcbiAgICAgIHZhciBfZGljZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcztcclxuXHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcblxyXG4gICAgICBpZiAoRG91YmxlUGF5RGF5KVxyXG4gICAgICAgIF9tdWx0aXBsaWVyID0gMjtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfdGVtcERhdGFbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgdmFyIF9wYXltZW50ID1fbG9jYXRpb25zKl9tdWx0aXBsaWVyKiBfZGljZSAqIDIwMDA7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IChfcGF5bWVudCAvIDIpO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW2luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgIH0gIFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9hbW91bnRUb0JlQWRqdXN0ZWQ+MClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgcGFydG5lcnNoaXAgaW4gc29tZSBidXNpbmVzcywgcmVzcGVjdGl2ZSA1MCUgcHJvZml0IG9mIHBhcnRpY3VsYXIgYnVzaW5lc3Mgd2lsbCBiZSBzaGFyZWQuXCIsIDIwMDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIURvdWJsZVBheURheSlcclxuICAgICAgICBUb3RhbFBheURheUFtb3VudCA9IF9hbW91bnQgKiBfZGljZSAqIDIwMDAtX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gMiAqIChfYW1vdW50ICogX2RpY2UpICogMjAwMC1fYW1vdW50VG9CZUFkanVzdGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBfYW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID1cIihcIitfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKS1cIiArX2Ftb3VudFRvQmVBZGp1c3RlZCtcIj1cIisgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPVwiKFwiK19kaWNlICsgXCIqXCIgKyBfYW1vdW50ICsgXCIqXCIgKyBcIjIwMDAqMiktXCIrX2Ftb3VudFRvQmVBZGp1c3RlZCtcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG5cclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW4gPSAwO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KS8vaWYgcGxheWVyIGhhZCBza2lwcHBlZCBsb2FuIHByZXZpb3VzbHkgY2FsbCBhbGwgYW1vdW50IGR1ZVxyXG4gICAgICAgIF9Fc3RpbWF0ZUxvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBfRXN0aW1hdGVMb2FuID0gNTAwMDtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9Fc3RpbWF0ZUxvYW4pIHtcclxuICAgICAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLSBfRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDtpbmRleCA8R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IC0gX0VzdGltYXRlTG9hbjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvdXQgb2YgbW9uZXlcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlUGF5bWVudF9QYXlEYXkoKSB7XHJcbiAgICAvL2FsbFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bIF9wbGF5ZXJJbmRleF0uQ2FzaCArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgXCJBbW91bnQgJFwiICtcclxuICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ICtcclxuICAgICAgICAgIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQsIFRvdGFsIENhc2ggaGFzIGJlY29tZSAkXCIgK1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCxcclxuICAgICAgICAxNTAwXHJcbiAgICAgICk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCAxNTUwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIFwiQW1vdW50ICRcIiArXHJcbiAgICAgICAgICBUb3RhbFBheURheUFtb3VudCArXHJcbiAgICAgICAgICBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLkNhc2hcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNraXBMb2FuT25lVGltZV9QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgXCJZb3UgaGF2ZSBza2lwcGVkIHRoZSBsb2FuIHBheW1lbnQsIGJhbmsgd2lsbCBjYWxsIHVwb24gY29tcGxldGUgbG9hbiBhbW91bnQgb24gbmV4dCBwYXlkYXlcIixcclxuICAgICAgMjAwMFxyXG4gICAgKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQgPSB0cnVlO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICB9LFxyXG5cclxuICBTZWxsQnVzaW5lc3NfUGF5RGF5KCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUNhc2hfUGF5RGF5KF9hbW91bnQpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIEV4aXRMb2FuU2NyZWVuX1BheURheSgpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3R2FtZV9QYXlEYXkoKSB7XHJcbiAgICAvL2lmIGJhbmtydXB0ZWQgeW91IGNhbiBzdGFydCBuZXcgZ2FtZVxyXG4gICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgIFwiWW91IHdpbGwgbG9zZSBhbGwgcHJvZ3Jlc3MgYW5kIHN0YXJ0IG5ldyBnYW1lIGZyb20gdGhlIHN0YXJ0LlwiLFxyXG4gICAgICAzMDAwXHJcbiAgICApO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuRXhpdExvYW5TY3JlZW5fUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9XaG9sZShcclxuICAgICAgICBmYWxzZVxyXG4gICAgICApO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoXHJcbiAgICAgICAgZmFsc2VcclxuICAgICAgKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoXHJcbiAgICAgICAgZmFsc2VcclxuICAgICAgKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVBheURheShcclxuICAgICAgICBmYWxzZSxcclxuICAgICAgICBmYWxzZVxyXG4gICAgICApO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQmFua3J1cHRfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB9LCAzMDEwKTtcclxuICB9LFxyXG5cclxuICBQYXlEYXlDb21wbGV0ZWQoKSB7XHJcbiAgICBpZiAoSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCAmJiBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgJiYgTG9hblBheWVkKSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImFsbCBwYXlkYXkgZG9uZVwiKTtcclxuICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfV2hvbGUoXHJcbiAgICAgICAgZmFsc2VcclxuICAgICAgKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKFxyXG4gICAgICAgIGZhbHNlXHJcbiAgICAgICk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyKFxyXG4gICAgICAgIGZhbHNlXHJcbiAgICAgICk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVQYXlEYXkoXHJcbiAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgZmFsc2VcclxuICAgICAgKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNhbGxVcG9uQ2FyZCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBTZWxsIEJ1c2luZXNzIFVJXHJcbiAgVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG5cclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiU0VMTFwiO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NDb3VudExhYmVsLnN0cmluZyA9XCJObyBvZiBCdXNpbmVzc2VzIDogXCIgK19tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQnVzaW5lc3NTZWxsUHJlZmFiKTtcclxuICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuU2Nyb2xsQ29udGVudE5vZGU7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggPT0gMClcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbihmYWxzZSk7XHJcbiAgICAgIGVsc2Ugbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24odHJ1ZSk7XHJcblxyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbE5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBidXNpbmVzc0RldGFpbE5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gSW52ZXN0IFVJXHJcbiAgVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkludmVzdFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlSW52ZXN0X0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSh0cnVlKTtcclxuICAgIHRoaXMuU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgfSxcclxuICBTZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIklOVkVTVFwiO1xyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdEludmVzdF9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEludmVzdEFsb25nVHVybk92ZXJfSW52ZXN0U2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gQnV5T1JTZWxsIFVJXHJcbiAgVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlQnV5T3JTZWxsX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSh0cnVlKTtcclxuICAgIHRoaXMuU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcik7XHJcbiAgfSxcclxuICBTZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkJVWSBPUiBTRUxMXCI7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID1cclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBPbmUgUXVlc3Rpb24gc2V0dXAgVWlcclxuICBUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uRGVjaXNpb25TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TcGFjZVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5XYWl0aW5nU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShcclxuICAgIF9teURhdGEsXHJcbiAgICBfYWN0b3JzRGF0YSxcclxuICAgIF9pc1R1cm5PdmVyLFxyXG4gICAgX21vZGVJbmRleCA9IDBcclxuICApIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJPTkUgUVVFU1RJT05cIjtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5QbGF5ZXJEZXRhaWxMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBcIk5vIG9mIFBsYXllcnM6IFwiICtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoX21vZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5Sb29tRXNzZW50aWFscy5Jc1NwZWN0YXRlID09IGZhbHNlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvL2NoZWNrIGlmIHBsYXllciBpcyBzcGVjdGF0ZSBvciBub3QsIGRvbnQgYWRkIGFueSBzcGVjdGF0ZXNcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgX215RGF0YS5QbGF5ZXJVSUQgIT1cclxuICAgICAgICAgICAgX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgICAgLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIilcclxuICAgICAgICAgICAgICAuc2V0UGxheWVyTmFtZShcclxuICAgICAgICAgICAgICAgIF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllck5hbWVcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgICAgLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIilcclxuICAgICAgICAgICAgICAuc2V0UGxheWVyVUlEKFxyXG4gICAgICAgICAgICAgICAgX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyVUlEXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChfbW9kZUluZGV4ID09IDEpIHtcclxuICAgICAgLy9mb3IgYm90XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfYWN0b3JzRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX215RGF0YS5QbGF5ZXJVSUQgIT0gX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCkge1xyXG4gICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZXRhaWxzUHJlZmFiKTtcclxuICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIilcclxuICAgICAgICAgICAgLnNldFBsYXllck5hbWUoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllck5hbWUpO1xyXG4gICAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKVxyXG4gICAgICAgICAgICAuc2V0UGxheWVyVUlEKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpO1xyXG4gICAgICAgICAgb25lUXVlc3Rpb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNUdXJuT3Zlcikge1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9uZVF1ZXN0aW9uTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIG9uZVF1ZXN0aW9uTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIG9uZVF1ZXN0aW9uTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBFeGl0X09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9xdWVzdGlvbikge1xyXG4gICAgdmFyIF9teURhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKClcclxuICAgICAgLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblRpdGxlTGFiZWwuc3RyaW5nID0gXCJPTkUgUVVFU1RJT05cIjtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25RdWVzdGlvbkxhYmVsLnN0cmluZyA9XHJcbiAgICAgIFwiUGxheWVyIGhhcyBhc2tlZCBpZiBcIiArXHJcbiAgICAgIF9xdWVzdGlvbiArXHJcbiAgICAgIFwiXFxuXCIgK1xyXG4gICAgICBcIlxcblwiICtcclxuICAgICAgXCIqZWl0aGVyIGFuc3dlciBxdWVzdGlvbiBvciBwYXkgJDUwMDAgdG8gcGxheWVyIHdob3NlIGFza2luZyBxdWVzdGlvbi5cIjtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICBTaG93VG9hc3Q6IGZ1bmN0aW9uIChtZXNzYWdlLCB0aW1lID0gMjI1MCkge1xyXG4gICAgdGhpcy5Qb3BVcFVJLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLlBvcFVwVUkuY2hpbGRyZW5bMl0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KFxyXG4gICAgICBjYy5MYWJlbFxyXG4gICAgKS5zdHJpbmcgPSBtZXNzYWdlO1xyXG4gICAgdmFyIFNlbGZUb2FzdCA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgU2VsZlRvYXN0LlBvcFVwVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LCB0aW1lKTtcclxuICB9LFxyXG59KTtcclxuIl19