
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
var CancelledID = [];
var StartGameCash = 100000; //-------------------------------------------enumeration for amount of loan-------------------------//

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
    PopUpUILabel: {
      "default": null,
      type: cc.Label,
      serializable: true,
      tooltip: "label reference for pop up screen"
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
    InsufficientBalanceScreen: {
      "default": null,
      type: cc.Node,
      serializable: true,
      tooltip: "Node reference for InsufficientBalanceScreen screen"
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
  ToggleScreen_InsufficientBalance: function ToggleScreen_InsufficientBalance(_state) {
    this.InsufficientBalanceScreen.active = _state;
  },
  Exit___InsufficientBalance: function Exit___InsufficientBalance() {
    this.ToggleScreen_InsufficientBalance(false);
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
      PlayerDataIntance.Cash = StartGameCash;
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
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[1].active = false;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[1].active = false;
    this.BusinessSetupData.BusinessTypeLabel.string = "";
    this.BusinessSetupData.BusinessNameLabel.string = "";
    this.BusinessSetupData.BusinessNameTextUI = "";
    this.BusinessSetupData.BusinessTypeTextUI = "";
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.none;
  },
  OnHomeBasedSelected_BusinessSetup: function OnHomeBasedSelected_BusinessSetup() {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[1].active = true;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[1].active = false;
    PlayerBusinessDataIntance.BusinessType = GameManager.EnumBusinessType.HomeBased;
  },
  OnBrickMortarSelected_BusinessSetup: function OnBrickMortarSelected_BusinessSetup() {
    this.BusinessSetupData.HomeBasedNodeUI.children[0].children[1].active = false;
    this.BusinessSetupData.BrickAndMortarNodeUI.children[0].children[1].active = true;
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

      _this6.Exit___InsufficientBalance();

      cc.systemEvent.emit("ShowCard", "", false);
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
    this.PopUpUILabel.string = message;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJTdGFydEdhbWVDYXNoIiwiTG9hbkFtb3VudEVudW0iLCJjYyIsIkVudW0iLCJOb25lIiwiVGVuVGhvdXNhbmQiLCJUZW50eVRob3VzYW5kIiwiVGhpcnR5VGhvdXNhbmQiLCJGb3J0eVRob3VzYW5kIiwiRmlmdHlUaG91c2FuZCIsIk90aGVyIiwiQnVzaW5lc3NTZXR1cFVJIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIlBsYXllck5hbWVVSSIsImRpc3BsYXlOYW1lIiwidHlwZSIsIkxhYmVsIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIlBsYXllckNhc2hVSSIsIkJ1c2luZXNzVHlwZVRleHRVSSIsIlRleHQiLCJCdXNpbmVzc05hbWVUZXh0VUkiLCJCdXNpbmVzc1R5cGVMYWJlbCIsIkVkaXRCb3giLCJCdXNpbmVzc05hbWVMYWJlbCIsIkhvbWVCYXNlZE5vZGVVSSIsIk5vZGUiLCJCcmlja0FuZE1vcnRhck5vZGVVSSIsIlRpbWVyVUkiLCJUaW1lck5vZGUiLCJCdXNpbmVzc1NldHVwTm9kZSIsIkxvYW5TZXR1cE5vZGUiLCJMb2FuQW1vdW50IiwiTG9hbkFtb3VudExhYmVsIiwiV2FpdGluZ1N0YXR1c05vZGUiLCJFeGl0QnV0dG9uTm9kZSIsImN0b3IiLCJDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAiLCJzdHJpbmciLCJUdXJuRGVjaXNpb25TZXR1cFVJIiwiTWFya2V0aW5nRWRpdEJveCIsIkdvbGRFZGl0Qm94IiwiU3RvY2tFZGl0Qm94IiwiQ2FzaEFtb3VudExhYmVsIiwiRXhwYW5kQnVzaW5lc3NOb2RlIiwiRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50IiwiRXhwYW5kQnVzaW5lc3NQcmVmYWIiLCJQcmVmYWIiLCJJbnZlc3RFbnVtIiwiU3RvY2tJbnZlc3QiLCJHb2xkSW52ZXN0IiwiU3RvY2tTZWxsIiwiR29sZFNlbGwiLCJJbnZlc3RTZWxsVUkiLCJUaXRsZUxhYmVsIiwiRGljZVJlc3VsdExhYmVsIiwiUHJpY2VUaXRsZUxhYmVsIiwiUHJpY2VWYWx1ZUxhYmVsIiwiQnV5T3JTZWxsVGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VGl0bGVMYWJlbCIsIlRvdGFsQW1vdW50VmFsdWVMYWJlbCIsIkJ1dHRvbk5hbWVMYWJlbCIsIkludmVzdFN0YXRlIiwiQW1vdW50RWRpdEJveCIsIlNlbGxCdXNpbmVzc1VJIiwiQ2FzaExhYmVsIiwiUGxheWVyTmFtZUxhYmVsIiwiQnVzaW5lc3NDb3VudExhYmVsIiwiU2Nyb2xsQ29udGVudE5vZGUiLCJCdXNpbmVzc1NlbGxQcmVmYWIiLCJFeGl0QnV0dG9uIiwiVHVybk92ZXJFeGl0QnV0dG9uIiwiUGF5RGF5VUkiLCJIb21lQmFzZWROdW1iZXJMYWJlbCIsIkJNTnVtYmVyTGFiZWwiLCJCTU51bWJlckxvY2F0aW9uTGFiZWwiLCJIb21lQmFzZWRCdG4iLCJCTUJ0biIsIkxvYW5CdG4iLCJNYWluUGFuZWxOb2RlIiwiUmVzdWx0UGFuZWxOb2RlIiwiTG9hblJlc3VsdFBhbmVsTm9kZSIsIlJlc3VsdFNjcmVlblRpdGxlTGFiZWwiLCJUb3RhbEJ1c2luZXNzTGFiZWwiLCJUb3RhbEFtb3VudExhYmVsIiwiU2tpcExvYW5CdXR0b24iLCJMb2FuRm90dGVyTGFiZWwiLCJJbnZlc3RVSSIsIkJ1eU9yU2VsbFVJIiwiT25lUXVlc3Rpb25VSSIsIlBsYXllckRldGFpbExhYmVsIiwiRGV0YWlsc1ByZWZhYiIsIlNjcm9sbENvbnRlbnQiLCJXYWl0aW5nU2NyZWVuIiwiRGVjaXNpb25UaXRsZUxhYmVsIiwiRGVjaXNpb25DYXNoTGFiZWwiLCJEZWNpc2lvblBsYXllck5hbWVMYWJlbCIsIkRlY2lzaW9uUXVlc3Rpb25MYWJlbCIsIlBhcnRuZXJzaGlwVUkiLCJXYWl0aW5nU3RhdHVzU2NyZWVuIiwiTWFpblNjcmVlbiIsIlRpdGxlTmFtZSIsIlBsYXllck5hbWUiLCJQbGF5ZXJDYXNoIiwiUGFydG5lclNoaXBQcmVmYWIiLCJEZWNpc2lvblNjcmVlbiIsIkRlY2lzaW9uUGxheWVyTmFtZSIsIkRlY2lzaW9uUGxheWVyQ2FzaCIsIkRlY2lzaW9uRGVzY3JpcHRpb24iLCJQbGF5ZXJEYXRhSW50YW5jZSIsIlBsYXllckJ1c2luZXNzRGF0YUludGFuY2UiLCJSZXF1aXJlZENhc2giLCJJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCIsIlRlbXBNYXJrZXRpbmdBbW91bnQiLCJUZW1wSGlyaW5nTGF3eWVyIiwiR29sZENhc2hBbW91bnQiLCJFbnRlckJ1eVNlbGxBbW91bnQiLCJTdG9ja0J1c2luZXNzTmFtZSIsIkRpY2VSZXN1bHQiLCJPbmNlT3JTaGFyZSIsIkxvY2F0aW9uTmFtZSIsIkhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQiLCJCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQiLCJMb2FuUGF5ZWQiLCJUb3RhbFBheURheUFtb3VudCIsIkRvdWJsZVBheURheSIsIkdhbWVwbGF5VUlNYW5hZ2VyIiwiQ29tcG9uZW50IiwiQnVzaW5lc3NTZXR1cERhdGEiLCJJbnZlc3RTZWxsU2V0dXBVSSIsIlBheURheVNldHVwVUkiLCJTZWxsQnVzaW5lc3NTZXR1cFVJIiwiSW52ZXN0U2V0dXBVSSIsIkJ1eU9yU2VsbFNldHVwVUkiLCJPbmVRdWVzdGlvblNldHVwVUkiLCJQYXJ0bmVyc2hpcFNldHVwVUkiLCJQb3BVcFVJIiwiUG9wVXBVSUxhYmVsIiwiR2FtZXBsYXlVSVNjcmVlbiIsIkludmVzdFNlbGxTY3JlZW4iLCJQYXlEYXlTY3JlZW4iLCJTZWxsQnVzaW5lc3NTY3JlZW4iLCJJbnZlc3RTY3JlZW4iLCJCdXlPclNlbGxTY3JlZW4iLCJPbmVRdWVzdGlvblNwYWNlU2NyZWVuIiwiT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbiIsIkluc3VmZmljaWVudEJhbGFuY2VTY3JlZW4iLCJUZW1wRGljZVRleHQiLCJMZWF2ZVJvb21CdXR0b24iLCJvbkxvYWQiLCJDaGVja1JlZmVyZW5jZXMiLCJHb2xkSW52ZXN0ZWQiLCJHb2xkU29sZCIsIlN0b2NrSW52ZXN0ZWQiLCJTdG9ja1NvbGQiLCJJc0JvdFR1cm4iLCJJc0JhbmtydXB0ZWQiLCJCYW5rcnVwdGVkQW1vdW50IiwiUmVzZXRUdXJuVmFyaWFibGUiLCJyZXF1aXJlIiwib25FbmFibGUiLCJzeXN0ZW1FdmVudCIsIm9uIiwiU3luY0RhdGEiLCJvbkRpc2FibGUiLCJvZmYiLCJUb2dnbGVTY3JlZW5fSW5zdWZmaWNpZW50QmFsYW5jZSIsIl9zdGF0ZSIsImFjdGl2ZSIsIkV4aXRfX19JbnN1ZmZpY2llbnRCYWxhbmNlIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJDbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJIiwiT25MZWF2ZUJ1dHRvbkNsaWNrZWRfU3BlY3RhdGVNb2RlVUkiLCJJbnN0YW5jZSIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJUb2dnbGVMZWF2ZVJvb21fQm9vbCIsIkRpc2Nvbm5lY3RQaG90b24iLCJzZXRUaW1lb3V0IiwiR2V0X0dhbWVNYW5hZ2VyIiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiaXNGaXJzdFRpbWUiLCJpbnNpZGVHYW1lIiwibW9kZUluZGV4IiwiX2lzQmFua3J1cHRlZCIsIl9CYW5rcnVwdEFtb3VudCIsIkluaXRfQnVzaW5lc3NTZXR1cCIsIlBsYXllckRhdGEiLCJCdXNpbmVzc0luZm8iLCJDYXNoIiwiUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCIsImluZGV4IiwiUGxheWVyR2FtZUluZm8iLCJsZW5ndGgiLCJTdHVkZW50RGF0YSIsInVzZXJJRCIsIlBsYXllclVJRCIsIk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cCIsIk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwIiwiR2V0T2JqX0J1c2luZXNzU2V0dXAiLCJVSUQiLCJPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIk9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzTmFtZSIsImNoaWxkcmVuIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIm5vbmUiLCJPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJIb21lQmFzZWQiLCJPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsImJyaWNrQW5kbW9ydGFyIiwiYW1vdW50IiwiQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiTm9PZkJ1c2luZXNzIiwiTG9hblRha2VuIiwiU2hvd1RvYXN0IiwiTWF0aCIsImFicyIsInBhcnNlSW50IiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiX2RhdGEiLCJfSUQiLCJQaG90b25BY3RvciIsImFjdG9yTnIiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIk1heFBsYXllcnMiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYW1vdW50IiwiX2J1c2luZXNzTmFtZSIsIl9pc0hvbWVCYXNlZCIsIkhvbWVCYXNlZEFtb3VudCIsIlN0YXJ0R2FtZSIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiRXhpdF9CdXNpbmVzc1NldHVwIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJfbW9kZSIsIkdldFNlbGVjdGVkTW9kZSIsIklzQmFua3J1cHQiLCJCYW5rcnVwdEFtb3VudCIsIkdldFR1cm5OdW1iZXIiLCJSYWlzZUV2ZW50IiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc0JvdCIsImlzYWN0aXZlIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJfcGxheWVySW5kZXgiLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCIsIk9uU2VsbEdvbGRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdvbGRDb3VudCIsIk9uU2VsbFN0b2NrQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJTdG9ja0NvdW50IiwiT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uIiwiRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCIsIk9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlJvbGxEaWNlIiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwidmFsdWUiLCJUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJSZXNldF9QYXJ0bmVyU2hpcFNldHVwIiwiX21hbmFnZXIiLCJfdGVtcERhdGEiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJTZXROYW1lIiwiU2V0VHlwZSIsIlNldEJ1c2luZXNzSW5kZXgiLCJfdG90YWxMb2NhdGlvbnMiLCJMb2NhdGlvbnNOYW1lIiwiU2V0QnVzaW5lc3NNb2RlIiwiU2V0TW9kZSIsIlNldEJ1c2luZXNzVmFsdWUiLCJTZXRGaW5hbEJ1c2luZXNzVmFsdWUiLCJfYWxsTG9jYXRpb25zQW1vdW50IiwiX2ZpbmFsQW1vdW50IiwiU2V0QmFsYW5jZSIsIlNldExvY2F0aW9ucyIsIklzUGFydG5lcnNoaXAiLCJUb2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbiIsIlNldFBhcnRuZXJOYW1lIiwiUGFydG5lck5hbWUiLCJFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAiLCJfbXNnIiwiY3VzdG9tUHJvcGVydGllcyIsIlBsYXllclNlc3Npb25EYXRhIiwiRXhpdF9QYXJ0bmVyU2hpcFNldHVwIiwiZGVzdHJveSIsIlJlY2VpdmVFdmVudF9QYXJ0bmVyc2hpcFNldHVwIiwiX2FjdG9yIiwiX3R1cm4iLCJUdXJuIiwiX3BsYXllckRhdGEiLCJfU2VsZWN0ZWRCdXNpbmVzc0luZGV4IiwiU2VsZWN0ZWRCdXNpbnNlc3NJbmRleCIsIl9idXNpbmVzc1ZhbHVlIiwiQnVzVmFsdWUiLCJfcGF5QW1vdW50IiwiX2J1c2luZXNzTW9kZSIsIkNoZWNrU3BlY3RhdGUiLCJBY2NlcHRPZmZlcl9QYXJ0bmVyc2hpcFNldHVwIiwiX2FsbEFjdG9ycyIsIlJvb21BY3RvcnMiLCJteUluZGV4IiwiR2V0TXlJbmRleCIsIlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwIiwiQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9pc0FjY2VwdGVkIiwiX3BheW1lbnQiLCJfaXNDYW5jZWxsZWQiLCJfdUlEIiwiX21haW5EYXRhIiwiQWNjZXB0ZWQiLCJDYXNoUGF5bWVudCIsIkNhbmNlbGxlZCIsIlBsYXllcklEIiwiQnVzaW5lc3NJbmRleCIsIlJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJfYWNjZXB0ZWQiLCJfY2FzaCIsIl9jYW5jZWxsZWQiLCJfdWlkIiwiUGFydG5lcklEIiwiaW5jbHVkZXMiLCJSZXNldEdvbGRJbnB1dCIsIm9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsIiwiVXBkYXRlRGF0YV9JbnZlc3RTZWxsIiwiX3RpdGxlIiwiX2RpY2VSZXN1bHQiLCJfcHJpY2VUaXRsZSIsIl9wcmljZVZhbHVlIiwiX2J1eU9yU2VsbFRpdGxlIiwiX3RvdGFsQW1vdW50VGl0bGUiLCJfdG90YWxBbW91bnRWYWx1ZSIsIl9idXR0b25OYW1lIiwiQXBwbHlCdXR0b25fSW52ZXN0U2VsbCIsIl9Ub3RhbEFtb3VudCIsIkV4aXRCdXR0b25fSW52ZXN0U2VsbCIsIlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkiLCJUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkiLCJVcGRhdGVCdXR0b25zX1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJsb2FuVGFrZW4iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJHZXRMb2FuQW1vdW50X1BheURheSIsIl9sb2FuIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl9pc0JvdCIsIl90aW1lIiwiVXBkYXRlQ2FzaF9QYXlEYXkiLCJCTUxvY2F0aW9ucyIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiU2tpcHBlZExvYW5QYXltZW50IiwiUGF5RGF5Q29tcGxldGVkIiwiT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiX2RpY2UiLCJSb2xsT25lRGljZSIsIl9hbW91bnRUb0JlU2VuZCIsIl9hbW91bnRUb0JlQWRqdXN0ZWQiLCJfbXVsdGlwbGllciIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJSZWNlaXZlUGF5bWVudF9QYXlEYXkiLCJfbG9jYXRpb25zIiwiX0VzdGltYXRlTG9hbiIsIlNraXBMb2FuT25lVGltZV9QYXlEYXkiLCJTZWxsQnVzaW5lc3NfUGF5RGF5IiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRMb2FuU2NyZWVuX1BheURheSIsIlN0YXJ0TmV3R2FtZV9QYXlEYXkiLCJlbWl0IiwiVG9nZ2xlU2tpcFBheURheV9XaG9sZSIsIlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkIiwiVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhciIsIlRvZ2dsZVBheURheSIsIkJhbmtydXB0X1R1cm5EZWNpc2lvbiIsImNhbGxVcG9uQ2FyZCIsIlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwIiwiU2V0QnVzaW5lc3NVSV9TZWxsQnVzaW5lc3NVSVNldHVwIiwiUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkFtb3VudCIsIlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbiIsIl9pc1R1cm5vdmVyIiwiRXhpdFNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJjb21wbGV0ZUNhcmRUdXJuIiwiVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkiLCJFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIlNldEludmVzdFVJX0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkiLCJFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJIiwiVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkiLCJFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSSIsIlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5X0J1eU9yU2VsbFNldHVwVUkiLCJFeGl0U2VsbE9yQnV5QWxvbmdUdXJuT3Zlcl9CdXlPclNlbGxTZXR1cFVJIiwiVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiVG9nZ2xlV2FpdGluZ1NjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9teURhdGEiLCJfYWN0b3JzRGF0YSIsIl9pc1R1cm5PdmVyIiwiX21vZGVJbmRleCIsIlJvb21Fc3NlbnRpYWxzIiwiSXNTcGVjdGF0ZSIsInNldFBsYXllck5hbWUiLCJzZXRQbGF5ZXJVSUQiLCJSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIkV4aXRfT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJIiwiU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJfcXVlc3Rpb24iLCJtZXNzYWdlIiwidGltZSIsIlNlbGZUb2FzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxXQUFXLEdBQUcsSUFBbEI7QUFDQSxJQUFJQyx3QkFBd0IsR0FBRyxJQUEvQjtBQUNBLElBQUlDLG1CQUFtQixHQUFHLEVBQTFCO0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUcsRUFBdkI7QUFDQSxJQUFJQyw4QkFBOEIsR0FBRyxFQUFyQztBQUNBLElBQUlDLGVBQWUsR0FBRyxJQUF0QjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLEtBQS9CO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMs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QUZTLEVBRVB1VCxJQUZPLENBQVY7QUFHRDtBQXJuRThCLENBQVQsQ0FBeEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBHYW1lTWFuYWdlciA9IG51bGw7XHJcbnZhciBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPSBudWxsO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxOb2RlcyA9IFtdO1xyXG52YXIgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG52YXIgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbnZhciBQYXJ0bmVyU2hpcERhdGEgPSBudWxsO1xyXG52YXIgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gZmFsc2U7XHJcbnZhciBDYW5jZWxsZWRJRCA9IFtdO1xyXG52YXIgU3RhcnRHYW1lQ2FzaCA9IDEwMDAwMDtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGFtb3VudCBvZiBsb2FuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBMb2FuQW1vdW50RW51bSA9IGNjLkVudW0oe1xyXG4gIE5vbmU6IDAsXHJcbiAgVGVuVGhvdXNhbmQ6IDEwMDAwLFxyXG4gIFRlbnR5VGhvdXNhbmQ6IDIwMDAwLFxyXG4gIFRoaXJ0eVRob3VzYW5kOiAzMDAwMCxcclxuICBGb3J0eVRob3VzYW5kOiA0MDAwMCxcclxuICBGaWZ0eVRob3VzYW5kOiA1MDAwMCxcclxuICBPdGhlcjogNixcclxufSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgQnVzaW5lc3NTZXR1cFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnVzaW5lc3NTZXR1cFVJXCIsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFBsYXllck5hbWVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lVUlcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIGZvciBwbGF5ZXIgbmFtZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllckNhc2hVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoVUlcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIGZvciBwbGF5ZXIgY2FzaFwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzVHlwZVRleHRVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1R5cGVUZXh0VUlcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgdG9vbHRpcDogXCJ2YXIgdG8gc3RvcmUgdGV4dCBmb3IgYnVzaW5lc3MgdHlwZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZVRleHRVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1R5cGVUZXh0VUlcIixcclxuICAgICAgdHlwZTogY2MuVGV4dCxcclxuICAgICAgZGVmYXVsdDogXCJcIixcclxuICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgdG9vbHRpcDogXCJ2YXIgdG8gc3RvcmUgdGV4dCBmb3IgYnVzaW5lc3MgbmFtZVwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzVHlwZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzVHlwZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHR5cGUgZWRpdGJveFwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVjZSBmb3IgYnVzaW5lc3MgbmFtZSBlZGl0Ym94XCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTm9kZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkhvbWVCYXNlZE5vZGVVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSBub2RlIGZvciBob21lIGJhc2VkIGJ1c2luZXNzXCIsXHJcbiAgICB9LFxyXG4gICAgQnJpY2tBbmRNb3J0YXJOb2RlVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tBbmRNb3J0YXJOb2RlVUlcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGltZXJVSVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbGFiZWwgZm9yIHRpbWVyXCIsXHJcbiAgICB9LFxyXG4gICAgVGltZXJOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpbWVyTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciB0aW1lciBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NTZXR1cE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBMb2FuU2V0dXBOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5TZXR1cE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgbG9hbiBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIExvYW5BbW91bnQ6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudFwiLFxyXG4gICAgICB0eXBlOiBMb2FuQW1vdW50RW51bSxcclxuICAgICAgZGVmYXVsdDogTG9hbkFtb3VudEVudW0uTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcImxvYW4gYW1vdW50IHRha2VuIGJ5IHBsYXllciAoc3RhdGUgbWFjaGluZSlcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkFtb3VudExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcclxuICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGFsbCBsYWJlbHMgb2YgYW1vdW50cyBpbiBsb2FuIFVJXCIsXHJcbiAgICB9LFxyXG4gICAgV2FpdGluZ1N0YXR1c05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c05vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3Igd2FpdGluZyBzdGF0dXMgc2NyZWVuIG9uIGluaXRpYWwgYnVzaW5lc3Mgc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBleGl0IGJ1dHRvbiBub2RlIGluIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3Rvci8vXHJcbiAgfSxcclxuXHJcbiAgQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5QbGF5ZXJOYW1lVUkuc3RyaW5nID0gbmFtZTtcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBCdXNpbmVzcyBTZXR1cCBVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgVHVybkRlY2lzaW9uU2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlR1cm5EZWNpc2lvblNldHVwVUlcIixcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgTWFya2V0aW5nRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYXJrZXRpbmdFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgbWFya2V0aW5nIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBHb2xkRWRpdEJveDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJHb2xkRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBnb2xkIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTdG9ja0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU3RvY2tFZGl0Qm94XCIsXHJcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGVkaXRib3ggb2YgaW52ZXN0IHN0b2NrIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byBjYXNoIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc05vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhwYW5kQnVzaW5lc3NOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIGV4cG5hZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudFwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6XHJcbiAgICAgICAgXCJSZWZlcmVuY2UgZm9yIGNvbnRlbnQgbm9kZSBvZiBzY3JvbGwgdmlldyBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgcHJlZmFiIG9mIGV4cGFuZCBidXNpbmVzcyBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lbnVtZXJhdGlvbiBmb3IgaW52ZXN0bWVudC9idXkgYW5kIHNlbGwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdEVudW0gPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIFN0b2NrSW52ZXN0OiAxLFxyXG4gIEdvbGRJbnZlc3Q6IDIsXHJcbiAgU3RvY2tTZWxsOiAzLFxyXG4gIEdvbGRTZWxsOiA0LFxyXG4gIE90aGVyOiA1LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBJbnZlc3RTZWxsVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkludmVzdFNlbGxVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEaWNlUmVzdWx0TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGljZVJlc3VsdFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgRGljZSBSZXN1bHQgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFByaWNlVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcmljZVRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUHJpY2VWYWx1ZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlByaWNlVmFsdWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFByaWNlIHZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1eU9yU2VsbFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6XHJcbiAgICAgICAgXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1eU9yU2VsbCBUaXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVG90YWxBbW91bnRUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50VGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50VmFsdWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudFZhbHVlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6XHJcbiAgICAgICAgXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFZhbHVlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXR0b25OYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnV0dG9uTmFtZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgYnV0dG9uIG5hbWUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFN0YXRlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkludmVzdFN0YXRlXCIsXHJcbiAgICAgIHR5cGU6IEludmVzdEVudW0sXHJcbiAgICAgIGRlZmF1bHQ6IEludmVzdEVudW0uTm9uZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIEFtb3VudEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQW1vdW50RWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFNlbGxCdXNpbmVzc1VJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBTZWxsQnVzaW5lc3NVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIlNlbGxCdXNpbmVzc1VJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc0NvdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NDb3VudFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnVzaW5lc3NDb3VudCBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50Tm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50Tm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBTY3JvbGxDb250ZW50Tm9kZSBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NlbGxQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NTZWxsUHJlZmFiXCIsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYixcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEJ1c2luZXNzU2VsbFByZWZhYiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXlEYXlVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgUGF5RGF5VUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQYXlEYXlVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFBheURheSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgUGF5RGF5IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWROdW1iZXJMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWROdW1iZXJcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZE51bWJlciBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1OdW1iZXJMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja01vcnRhck51bWJlclwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJOdW1iZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNTnVtYmVyTG9jYXRpb25MYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja01vcnRhckxvY2F0aW9uc1wiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJMb2NhdGlvbnMgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZEJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWRCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgSG9tZUJhc2VkQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTUJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCcmlja01vcnRhckJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCcmlja01vcnRhckJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkJ0bjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIExvYW5CdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIE1haW5QYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFpblBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBNYWluUGFuZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFJlc3VsdFBhbmVsTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0UGFuZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5SZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hblJlc3VsdFBhbmVsTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuUmVzdWx0UGFuZWxOb2RlIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRTY3JlZW5UaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlJlc3VsdFNjcmVlblRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBSZXN1bHRTY3JlZW5UaXRsZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpY2VSZXN1bHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2VSZXN1bHQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQnVzaW5lc3NMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEJ1c2luZXNzTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50TGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgVG90YWxBbW91bnQgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFNraXBMb2FuQnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNraXBMb2FuQnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFNraXBMb2FuQnV0dG9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuRm90dGVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkZvdHRlckxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuRm90dGVyTGFiZWwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBJbnZlc3RVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgSW52ZXN0VUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJJbnZlc3RVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybk92ZXJFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlR1cm5PdmVyRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6XHJcbiAgICAgICAgXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBUdXJuT3ZlckV4aXRCdXR0b24gb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnV5T3JTZWxsVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1eU9yU2VsbFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiQnV5T3JTZWxsVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIE9uZVF1ZXN0aW9uVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIE9uZVF1ZXN0aW9uVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJPbmVRdWVzdGlvblVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFBsYXllck5hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJEZXRhaWxMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJEZXRhaWxMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERldGFpbHNQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGV0YWlsc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBEZXRhaWxzUHJlZmFiIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIFNjcm9sbENvbnRlbnQgb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBub2RlIFdhaXRpbmdTY3JlZW4gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblRpdGxlTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvbkNhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkNhc2hMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgY2FzaCBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblF1ZXN0aW9uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25RdWVzdGlvbkxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6XHJcbiAgICAgICAgXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBxdWVzdGlvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIFBhcnRuZXJzaGlwVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBhcnRuZXJzaGlwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJQYXJ0bmVyc2hpcFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgV2FpdGluZ1N0YXR1c1NjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJXYWl0aW5nU3RhdHVzU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIHdhaXRpbmcgc2NyZWVuIG5vZGUgb2YgcGFydG5lcnNoaXAgdWlcIixcclxuICAgIH0sXHJcbiAgICBNYWluU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIFRpdGxlTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZU5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyU2hpcFByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQYXJ0bmVyU2hpcFByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBTY3JvbGxDb250ZW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblNjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllck5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25QbGF5ZXJDYXNoOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyQ2FzaFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvbkRlc2NyaXB0aW9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uRGVzY3JpcHRpb25cIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgR2FtZXBsYXlVSU1hbmFnZXItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBsYXllckRhdGFJbnRhbmNlO1xyXG52YXIgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZTtcclxudmFyIFJlcXVpcmVkQ2FzaDtcclxudmFyIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7IC8vLTEgbWVhbnMgbmV3IGJ1c2luZXNzIGlzIG5vdCBpbnN0YW50aWFsdGVkIGZyb20gaW5zaWRlIGdhbWUgLCBpZiBpdCBoYXMgYW55IG90aGVyIHZhbHVlIGl0IG1lYW5zIGl0cyBiZWVuIGluc3RhbnRpYXRlZCBmcm9tIGluc2lkZSBnYW1lIGFuZCBpdHMgdmFsdWUgcmVwcmVzZW50cyBpbmRleCBvZiBwbGF5ZXJcclxuXHJcbi8vdHVybiBkZWNpc2lvbnNcclxudmFyIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG52YXIgVGVtcEhpcmluZ0xhd3llcjtcclxuXHJcbi8vYnV5b3JzZWxsXHJcbnZhciBHb2xkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbnZhciBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG52YXIgU3RvY2tCdXNpbmVzc05hbWUgPSBcIlwiO1xyXG52YXIgRGljZVJlc3VsdDtcclxudmFyIE9uY2VPclNoYXJlO1xyXG52YXIgTG9jYXRpb25OYW1lID0gXCJcIjtcclxuXHJcbnZhciBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxudmFyIExvYW5QYXllZCA9IGZhbHNlO1xyXG52YXIgVG90YWxQYXlEYXlBbW91bnQgPSAwO1xyXG52YXIgRG91YmxlUGF5RGF5ID0gZmFsc2U7XHJcblxyXG52YXIgR2FtZXBsYXlVSU1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJHYW1lcGxheVVJTWFuYWdlclwiLFxyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBCdXNpbmVzc1NldHVwRGF0YToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBCdXNpbmVzc1NldHVwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnVzaW5lc3NTZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgVHVybkRlY2lzaW9uU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBUdXJuRGVjaXNpb25TZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIFR1cm5EZWNpc2lvblNldHVwVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBJbnZlc3RTZWxsVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUGF5RGF5U2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBQYXlEYXlVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBTZWxsQnVzaW5lc3NTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBTZWxsQnVzaW5lc3NVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBTZWxsQnVzaW5lc3NVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEludmVzdFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogQnV5T3JTZWxsVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgQnV5T3JTZWxsVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvblNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IE9uZVF1ZXN0aW9uVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgT25lUXVlc3Rpb25VSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBhcnRuZXJzaGlwU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogUGFydG5lcnNoaXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBQYXJ0bmVyc2hpcFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgUG9wVXBVSToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQb3BVcFVJTGFiZWw6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJsYWJlbCByZWZlcmVuY2UgZm9yIHBvcCB1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1NldHVwTm9kZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIGJ1c2luZXNzIHNldHVwIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEdhbWVwbGF5VUlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBnYW1lcGxheSB1aSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIERlY2lzaW9uIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBJbnZlc3QgJiBzZWxsIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIFBheURheVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIFBheURheSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBTZWxsQnVzaW5lc3NTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBTZWxsQnVzaW5lc3Mgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0IHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEJ1eU9yU2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvblNwYWNlU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgT25lUXVlc3Rpb25TcGFjZSBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBPbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgT25lUXVlc3Rpb25EZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnN1ZmZpY2llbnRCYWxhbmNlU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBUZW1wRGljZVRleHQ6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJsYWJlbCByZWZlcmVuY2UgZm9yIGRpY2VcIixcclxuICAgIH0sXHJcbiAgICBMZWF2ZVJvb21CdXR0b246IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG5cclxuICAgIC8vbG9jYWwgdmFyaWFibGVzXHJcbiAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5Hb2xkU29sZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja0ludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrU29sZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBmYWxzZTtcclxuICAgIHRoaXMuSXNCYW5rcnVwdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkJhbmtydXB0ZWRBbW91bnQgPSAwO1xyXG4gIH0sXHJcblxyXG4gIFJlc2V0VHVyblZhcmlhYmxlKCkge1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICB9LFxyXG5cclxuICBDaGVja1JlZmVyZW5jZXMoKSB7XHJcbiAgICBpZiAoIUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciB8fCBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgPT0gbnVsbClcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlclwiKTtcclxuXHJcbiAgICBpZiAoIUdhbWVNYW5hZ2VyIHx8IEdhbWVNYW5hZ2VyID09IG51bGwpXHJcbiAgICAgIEdhbWVNYW5hZ2VyID0gcmVxdWlyZShcIkdhbWVNYW5hZ2VyXCIpO1xyXG4gIH0sXHJcblxyXG4gIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2V2ZW50cyBzdWJzY3JpcHRpb24gdG8gYmUgY2FsbGVkXHJcbiAgICBjYy5zeXN0ZW1FdmVudC5vbihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgY2Muc3lzdGVtRXZlbnQub2ZmKFwiU3luY0RhdGFcIiwgdGhpcy5TeW5jRGF0YSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UoX3N0YXRlKVxyXG4gIHtcclxuICAgIHRoaXMuSW5zdWZmaWNpZW50QmFsYW5jZVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UoKVxyXG4gIHtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX0luc3VmZmljaWVudEJhbGFuY2UoZmFsc2UpO1xyXG4gIH0sXHJcbiAgLy8jcmVnaW9uIFNwZWN0YXRlIFVJIFNldHVwXHJcbiAgSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgQ2xvc2VJbml0aWFsU2NyZWVuX1NwZWN0YXRlTW9kZSgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5MZWF2ZVJvb21CdXR0b24uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIE9uTGVhdmVCdXR0b25DbGlja2VkX1NwZWN0YXRlTW9kZVVJKCkge1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Ub2dnbGVMZWF2ZVJvb21fQm9vbChcclxuICAgICAgdHJ1ZVxyXG4gICAgKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuRGlzY29ubmVjdFBob3RvbigpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5DbGVhckRpc3BsYXlUaW1lb3V0KCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuUmVtb3ZlUGVyc2lzdE5vZGUoKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIlNwbGFzaFwiKTtcclxuICAgIH0sIDUwMCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEJ1c2luZXNzU2V0dXAgd2l0aCBsb2FuXHJcbiAgLy9CdXNpbmVzcyBzZXR1cCB1aS8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoXHJcbiAgICBpc0ZpcnN0VGltZSxcclxuICAgIGluc2lkZUdhbWUgPSBmYWxzZSxcclxuICAgIG1vZGVJbmRleCA9IDAsXHJcbiAgICBfaXNCYW5rcnVwdGVkID0gZmFsc2UsXHJcbiAgICBfQmFua3J1cHRBbW91bnQgPSAwXHJcbiAgKSB7XHJcbiAgICAvL2NhbGxlZCBmaXJzdCB0aW1lIGZvcm0gR2FtZU1hbmFnZXIgb25sb2FkIGZ1bmN0aW9uXHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuSXNCYW5rcnVwdGVkID0gX2lzQmFua3J1cHRlZDtcclxuICAgIHRoaXMuQmFua3J1cHRlZEFtb3VudCA9IF9CYW5rcnVwdEFtb3VudDtcclxuXHJcbiAgICBpZiAoX2lzQmFua3J1cHRlZCkgdGhpcy5SZXNldFR1cm5WYXJpYWJsZSgpO1xyXG5cclxuICAgIHRoaXMuSW5pdF9CdXNpbmVzc1NldHVwKGlzRmlyc3RUaW1lLCBpbnNpZGVHYW1lLCBtb2RlSW5kZXgsIF9pc0JhbmtydXB0ZWQpO1xyXG4gIH0sXHJcbiAgSW5pdF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoXHJcbiAgICBpc0ZpcnN0VGltZSxcclxuICAgIGluc2lkZUdhbWUgPSBmYWxzZSxcclxuICAgIG1vZGVJbmRleCA9IDAsXHJcbiAgICBfaXNCYW5rcnVwdGVkID0gZmFsc2VcclxuICApIHtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLlBsYXllckRhdGEoKTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIuQnVzaW5lc3NJbmZvKCk7XHJcblxyXG4gICAgaWYgKGlzRmlyc3RUaW1lKSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuVGltZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBTdGFydEdhbWVDYXNoO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCgpO1xyXG5cclxuICAgIGlmIChpbnNpZGVHYW1lKSB7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuRXhpdEJ1dHRvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5UaW1lck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICBmb3IgKFxyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgaW5kZXggPFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1xyXG4gICAgICAgICAgLmxlbmd0aDtcclxuICAgICAgICBpbmRleCsrXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhXHJcbiAgICAgICAgICAgIC51c2VySUQgPT1cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgaW5kZXhcclxuICAgICAgICAgIF0uUGxheWVyVUlEXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IGluZGV4O1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgLlBsYXllckdhbWVJbmZvW2luZGV4XTtcclxuICAgICAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBpbmRleFxyXG4gICAgICAgICAgICBdLlBsYXllck5hbWVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBpbmRleFxyXG4gICAgICAgICAgICBdLlBsYXllclVJRFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBpbmRleFxyXG4gICAgICAgICAgICBdLkNhc2hcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLm5hbWVcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5PbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlN0dWRlbnREYXRhLnVzZXJJRFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgR2V0T2JqX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChuYW1lKTtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLlBsYXllck5hbWUgPSBuYW1lO1xyXG4gIH0sXHJcbiAgT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFVJRCkge1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyVUlEID0gVUlEO1xyXG4gIH0sXHJcbiAgT25CdXNpbmVzc1R5cGVUZXh0Q2hhbmdlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5CdXNpbmVzc1R5cGVUZXh0VUkgPSBuYW1lO1xyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9IG5hbWU7XHJcbiAgfSxcclxuICBPbkJ1c2luZXNzTmFtZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IG5hbWU7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuICBSZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzTmFtZVRleHRVSSA9IFwiXCI7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVSSA9IFwiXCI7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9IEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUubm9uZTtcclxuICB9LFxyXG4gIE9uSG9tZUJhc2VkU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ib21lQmFzZWROb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPVxyXG4gICAgICBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZDtcclxuICB9LFxyXG4gIE9uQnJpY2tNb3J0YXJTZWxlY3RlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnJpY2tBbmRNb3J0YXJOb2RlVUkuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9XHJcbiAgICAgIEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXI7XHJcbiAgfSxcclxuICBPbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID0gXCIkXCIgKyBhbW91bnQ7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gYW1vdW50O1xyXG4gIH0sXHJcbiAgQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICBpbmRleCA8IFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcbiAgICAgIGluZGV4KytcclxuICAgICkge1xyXG4gICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hblRha2VuID0gdHJ1ZTtcclxuICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9sb2FuVGFrZW4pIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgXCJZb3UgaGF2ZSBhbHJlYWR5IHRha2VuIGxvYW4gb2YgJFwiICtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudFxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPj0gYW1vdW50KSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICBcIllvdSBkbyBub3QgbmVlZCBsb2FuLCB5b3UgaGF2ZSBlbm91Z2ggY2FzaCB0byBidXkgY3VycmVudCBzZWxlY3RlZCBidXNpbmVzcy5cIlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgUmVxdWlyZWRDYXNoID0gTWF0aC5hYnMocGFyc2VJbnQoUGxheWVyRGF0YUludGFuY2UuQ2FzaCkgLSBhbW91bnQpO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChcclxuICAgICAgICAgIGNjLkxhYmVsXHJcbiAgICAgICAgKS5zdHJpbmcgPSBcIiRcIiArIFJlcXVpcmVkQ2FzaDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChcclxuICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT1cclxuICAgICAgR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhclxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwKDUwMDAwKTtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09XHJcbiAgICAgIEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoMTAwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgXCJwbGVhc2Ugc2VsZWN0IGJ1c2luZXNzIGJldHdlZW4gSG9tZSBCYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIuIFwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hblNldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9LFxyXG4gIEhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpbmRleCA9PSBpKVxyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudExhYmVsW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIGVsc2UgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAxX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uT3RoZXI7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgwKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UZW5UaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDEpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wM19CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlbnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCgyKTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5UaGlydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDMpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZvcnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg0KTtcclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5GaWZ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoNSk7XHJcbiAgfSxcclxuICBPblRha2VuTG9hbkNsaWNrZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID09IExvYW5BbW91bnRFbnVtLk90aGVyKVxyXG4gICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQgPSBSZXF1aXJlZENhc2g7XHJcbiAgICBlbHNlXHJcbiAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IHBhcnNlSW50KFxyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudFxyXG4gICAgICApO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuID0gdHJ1ZTtcclxuICAgIHRoaXMuT25Mb2FuQmFja0J1dHRvbkNsaWNrZWRfQnVzaW5lc3NTZXR1cCgpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggKyBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICB0aGlzLk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwKFBsYXllckRhdGFJbnRhbmNlLkNhc2gpO1xyXG4gIH0sXHJcblxyXG4gIFN5bmNEYXRhOiBmdW5jdGlvbiAoX2RhdGEsIF9JRCkge1xyXG4gICAgaWYgKFxyXG4gICAgICBfSUQgIT1cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpXHJcbiAgICAgICAgLmFjdG9yTnJcclxuICAgIClcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goXHJcbiAgICAgICAgX2RhdGFcclxuICAgICAgKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvXHJcbiAgICAgICAgLmxlbmd0aCA+PVxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLk1heFBsYXllcnNcclxuICAgICkge1xyXG4gICAgICAvL3NldHRpbmcgcm9vbSBwcm9wZXJ0eSB0byBkZWNsYXJlIGluaXRpYWwgc2V0dXAgaGFzIGJlZW5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAgICAgIC5nZXRQaG90b25SZWYoKVxyXG4gICAgICAgIC5teVJvb20oKVxyXG4gICAgICAgIC5zZXRDdXN0b21Qcm9wZXJ0eShcIkluaXRpYWxTZXR1cFwiLCB0cnVlLCB0cnVlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAgICAgIC5nZXRQaG90b25SZWYoKVxyXG4gICAgICAgIC5teVJvb20oKVxyXG4gICAgICAgIC5zZXRDdXN0b21Qcm9wZXJ0eShcclxuICAgICAgICAgIFwiUGxheWVyR2FtZUluZm9cIixcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mbyxcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFB1cmNoYXNlQnVzaW5lc3M6IGZ1bmN0aW9uIChfYW1vdW50LCBfYnVzaW5lc3NOYW1lLCBfaXNIb21lQmFzZWQpIHtcclxuICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIDwgX2Ftb3VudCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICBcIllvdSBoYXZlIG5vdCBlbm91Z2ggY2FzaCB0byBidXkgdGhpcyBcIiArIF9idXNpbmVzc05hbWUgKyBcIiBidXNpbmVzcy5cIlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKF9pc0hvbWVCYXNlZCkge1xyXG4gICAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQgPCAzKSB7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPVxyXG4gICAgICAgICAgICBcIiRcIiArIFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ib21lQmFzZWRBbW91bnQrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBjYW5ub3Qgb3duIG1vcmUgdGhhbiB0aHJlZSBIb21lIGJhc2VkIGJ1c2luZXNzZXNcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9IFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBfYW1vdW50O1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9XHJcbiAgICAgICAgICBcIiRcIiArIFBsYXllckRhdGFJbnRhbmNlLkNhc2g7XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUgPSB0cnVlO1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJyaWNrQW5kTW9ydGFyQW1vdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuKSB7XHJcbiAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPVxyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggLSBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkxvYW5BbW91bnQ7XHJcbiAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUmV2ZXJ0aW5nIGJhY2sgbG9hbiBhbW91bnQuXCIsIDUwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfbW9kZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuR2V0U2VsZWN0ZWRNb2RlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLklzQmFua3J1cHQgPSB0cnVlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5CYW5rcnVwdEFtb3VudCA9IHRoaXMuQmFua3J1cHRlZEFtb3VudDtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKClcclxuICAgICAgXSA9IFBsYXllckRhdGFJbnRhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLnB1c2goXHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2VcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX21vZGUgPT0gMikge1xyXG4gICAgICAvL2ZvciByZWFsIHBsYXllcnNcclxuICAgICAgLy9zZXR0aW5nIHBsYXllciBjdXJyZW50IGRhdGEgaW4gY3VzdG9tIHByb3BlcnRpZXMgd2hlbiBoaXMvaGVyIHR1cm4gb3ZlcnNcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKVxyXG4gICAgICAgIC5QaG90b25BY3RvcigpXHJcbiAgICAgICAgLnNldEN1c3RvbVByb3BlcnR5KFwiUGxheWVyU2Vzc2lvbkRhdGFcIiwgUGxheWVyRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoXHJcbiAgICAgICAgICAxLFxyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2VcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfZGF0YSA9IHtcclxuICAgICAgICAgIERhdGE6IHtcclxuICAgICAgICAgICAgYmFua3J1cHRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgdHVybjogR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKSxcclxuICAgICAgICAgICAgUGxheWVyRGF0YU1haW46IFBsYXllckRhdGFJbnRhbmNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoXHJcbiAgICAgICAgICA5LFxyXG4gICAgICAgICAgX2RhdGFcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuQWZ0ZXJCYW5rcnVwdCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlID09IDEpIHtcclxuICAgICAgLy9mb3IgQUlcclxuICAgICAgaWYgKCF0aGlzLklzQmFua3J1cHRlZCkge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuU3RhcnRUdXJuKCk7XHJcbiAgICAgICAgfSwgMTYwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm5BZnRlckJhbmtydXB0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJubyBtb2RlIHNlbGVjdGVkXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwXHJcbiAgICBdID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgPSAtMTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIFBheUFtb3VudFRvUGxheUdhbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuU3RhcnRHYW1lID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24gPT0gXCJcIilcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyB0eXBlLlwiKTtcclxuICAgIGVsc2UgaWYgKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID09IFwiXCIpXHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwicGxlYXNlIHdyaXRlIGEgYnVzaW5lc3MgbmFtZS5cIik7XHJcbiAgICBlbHNlIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWRcclxuICAgICAgKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgaG9tZWJhc3NlZFxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcygxMDAwMCwgXCJob21lXCIsIHRydWUpO1xyXG4gICAgICBlbHNlIGlmIChcclxuICAgICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuYnJpY2tBbmRtb3J0YXJcclxuICAgICAgKVxyXG4gICAgICAgIC8vaWYgc2VsZWN0ZWQgYnVzaW5lc3MgaXMgYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VCdXNpbmVzcyg1MDAwMCwgXCJicmljayBhbmQgbW9ydGFyXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLlN0YXJ0R2FtZSA9PSB0cnVlIHx8IHRoaXMuSXNCYW5rcnVwdGVkID09IHRydWUpIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3MucHVzaChQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlKTtcclxuXHJcbiAgICAgICAgaWYgKEluc2lkZUdhbWVCdXNpbmVzc1NldHVwICE9IC0xKVxyXG4gICAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIG5vdCBiZWVuIGNhbGxlZCBmcm9tIGluc2lkZSBnYW1lXHJcbiAgICAgICAgICB0aGlzLlN0YXJ0TmV3U2V0dXBfRHVyaW5nR2FtZV9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICAgICAgLy9pZiBzdGFydCBuZXcgYnVzaW5lc3MgaGFzIGJlZW4gY2FsbGVkIGF0IHN0YXJ0IG9mIGdhbWUgYXMgaW5pdGlhbCBzZXR1cFxyXG4gICAgICAgIGVsc2UgdGhpcy5Jbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cCgpO1xyXG5cclxuICAgICAgICAvL3BydGludGluZyBhbGwgdmFsdWVzIHRvIGNvbnNvbGVcclxuICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgICAgaSA8XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9cclxuICAgICAgICAgICAgLmxlbmd0aDtcclxuICAgICAgICAgIGkrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIFwicGxheWVyIG5hbWU6IFwiICtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIC5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJOYW1lXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIFwicGxheWVyIElEOiBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9baV0uUGxheWVyVUlEXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIFwiSXMgcGxheWVyIGJvdDogXCIgK1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKVxyXG4gICAgICAgICAgICAgICAgLlBsYXllckdhbWVJbmZvW2ldLklzQm90XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJubyBvZiBidXNpbmVzcyBvZiBwbGF5ZXIgKHNlZSBiZWxvdyk6IFwiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgaVxyXG4gICAgICAgICAgICBdLk5vT2ZCdXNpbmVzc1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBcInBsYXllciBjYXNoOiBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9baV0uQ2FzaFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBcInBsYXllciB0YWtlbiBsb2FuOiBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9baV0uTG9hblRha2VuXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIFwidGFrZW4gbG9hbiBhbW91bnQ6IFwiICtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIC5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuQW1vdW50XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBUdXJuRGVjaXNpb25TZXR1cFVJXHJcbiAgLy9UdXJuRGVjaXNpb25TZXR1cFVJLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBUb2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChpc2FjdGl2ZSkge1xyXG4gICAgdGhpcy5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBpc2FjdGl2ZTtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVDYXNoX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkNhc2hBbW91bnRMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBcIiQgXCIgK1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKVxyXG4gICAgICBdLkNhc2g7XHJcbiAgfSxcclxuXHJcbiAgT25NYXJrZXRpbmdBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IGFtb3VudDtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudFNlbGVjdGVkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gXCJcIiB8fCBUZW1wTWFya2V0aW5nQW1vdW50ID09IG51bGwpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB0aGlzLm1hcmtldGluZ0Ftb3VudCA9IHBhcnNlSW50KFRlbXBNYXJrZXRpbmdBbW91bnQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2hcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vaWYgcGxheWVyIGVudGVyZWQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiB0b3RhbCBjYXNoIGhlIG93bnNcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaCA+PSB0aGlzLm1hcmtldGluZ0Ftb3VudFxyXG4gICAgICApIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2ggPVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCAtIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uTWFya2V0aW5nQW1vdW50ID1cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLk1hcmtldGluZ0Ftb3VudCArIHRoaXMubWFya2V0aW5nQW1vdW50O1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3Ugc3VjY2Vzc2Z1bGx5IG1hcmtldGVkIGFtb3VudCBvZiAkXCIgK1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uTWFya2V0aW5nQW1vdW50ICtcclxuICAgICAgICAgICAgXCIgLCByZW1haW5pbmcgY2FzaCBpcyAkXCIgK1xyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uQ2FzaCArXHJcbiAgICAgICAgICAgIFwiLlwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcblxyXG4gICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggbW9uZXkuXCIpO1xyXG5cclxuICAgICAgICAvL3Jlc2V0aW5nIG1hcmtldGluZyBsYWJlbCBhbmQgaXRzIGhvbGRpbmcgdmFyaWFibGVcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuTWFya2V0aW5nRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIFRlbXBNYXJrZXRpbmdBbW91bnQgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25IaXJpbmdMYXd5ZXJCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gaWYgcGxheWVyIGhhcyBtb3JlIHRoYW4gNTAwMCRcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgaWYgKFxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgIF0uTGF3eWVyU3RhdHVzXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBhbHJlYWR5IGhpcmVkIGEgbGF3eWVyLlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2ggPj0gNTAwMFxyXG4gICAgICApIHtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkxhd3llclN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgVGVtcEhpcmluZ0xhd3llciA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coVGVtcEhpcmluZ0xhd3llcik7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5DYXNoID1cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLkNhc2ggLSA1MDAwO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3UgaGF2ZSBzdWNjZXNzZnVsbHkgaGlyZWQgYSBsYXd5ZXIsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5DYXNoICtcclxuICAgICAgICAgICAgXCIuXCJcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInNvcnJ5LCB5b3UgZG9udCBoYXZlIGVub3VnaCBtb25leSB0byBoaXJlIGEgbGF3eWVyLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG9uTG9jYXRpb25OYW1lQ2hhbmdlZF9FeHBhbmRCdXNpbmVzc19UdXJuRGVjaXNpb24oX25hbWUpIHtcclxuICAgIExvY2F0aW9uTmFtZSA9IF9uYW1lO1xyXG4gIH0sXHJcbiAgT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9pZiBwbGF5ZXIgaGFzIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgaGUgY291bGQgZXhwYW5kIGl0XHJcbiAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzc1wiKTtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHZhciBnZW5lcmF0ZWRMZW5ndGggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2VuZXJhdGVFeHBhbmRCdXNpbmVzc19QcmVmYWJzX1R1cm5EZWNpc2lvbigpO1xyXG5cclxuICAgIGlmIChnZW5lcmF0ZWRMZW5ndGggPT0gMCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBoYXZlIG5vIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3MgdG8gZXhwYW5kLlwiLCAxNTAwKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfSwgMTYwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25FeHBhbmRCdXR0b25FeGl0Q2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgIHRoaXMuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICBMb2NhdGlvbk5hbWUgPSBcIlwiO1xyXG4gICAgY29uc29sZS5sb2coXCJleHBhbmQgYnVzaW5lc3MgZXhpdCBjYWxsZWRcIik7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuRGVzdHJveUdlbmVyYXRlZE5vZGVzKCk7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIE9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJzdGFydGluZyBuZXcgYnVzaW5lc3NcIik7XHJcbiAgICB0aGlzLlN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cChmYWxzZSwgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkQW1vdW50Q2hhbmdlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIC8vY29uc29sZS5sb2coYW1vdW50KTtcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE9uR29sZERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLkdvbGRJbnZlc3RlZCkge1xyXG4gICAgICB0aGlzLkdvbGRJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkSW52ZXN0O1xyXG4gICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgXCJJbnZlc3QgSW4gR09MRFwiLFxyXG4gICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgXCJFYWNoIE91bmNlIG9mIEdPTEQgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgT25jZU9yU2hhcmUgKyBcIi9vdW5jZVwiLFxyXG4gICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIEJVWVwiLFxyXG4gICAgICAgIFwiVG90YWwgQnV5aW5nIEFtb3VudDpcIixcclxuICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgIFwiQlVZXCIsXHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBnb2xkIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLCA4MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tCdXNpbmVzc05hbWVDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIFN0b2NrQnVzaW5lc3NOYW1lID0gbmFtZTtcclxuICB9LFxyXG5cclxuICBPblN0b2NrRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuU3RvY2tJbnZlc3RlZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFN0b2NrQnVzaW5lc3NOYW1lID09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGEgYnVzaW5lc3MgbmFtZSB0byBpbnZlc3QuXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5TdG9ja0ludmVzdDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgXCJJbnZlc3QgaW4gU3RvY2tcIixcclxuICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICBcIkVhY2ggU2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsXHJcbiAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIEJVWVwiLFxyXG4gICAgICAgICAgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgICAgT25jZU9yU2hhcmUgKyBcIiowPTBcIixcclxuICAgICAgICAgIFwiQlVZXCIsXHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIGludmVzdCBpbiBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsIDgwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsR29sZENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZFNvbGQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkdvbGRDb3VudCA+IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5Hb2xkU29sZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5Hb2xkU2VsbDtcclxuICAgICAgICBEaWNlUmVzdWx0ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG4gICAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICAgIHRoaXMuQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgICAgICAgXCJTZWxsIEdPTERcIixcclxuICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIvb3VuY2VcIixcclxuICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBvdW5jZSBvZiBHT0xEIHlvdSB3YW50IHRvIFNFTExcIixcclxuICAgICAgICAgIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgIFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgR09MRCBvdW5jZXMsIHBsZWFzZSBidXkgdGhlbS5cIlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGNhbiBzZWxsIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsIDgwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TZWxsU3RvY2tDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLlN0b2NrU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uU3RvY2tDb3VudCA+IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja1NvbGQgPSB0cnVlO1xyXG4gICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9IEludmVzdEVudW0uU3RvY2tTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICBcIlNlbGwgU1RPQ0tcIixcclxuICAgICAgICAgIERpY2VSZXN1bHQsXHJcbiAgICAgICAgICBcIkVhY2ggc2hhcmUgb2Ygc3RvY2sgcHJpY2UgaXM6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiL3NoYXJlXCIsXHJcbiAgICAgICAgICBcIkVudGVyIHRoZSBudW1iZXIgb2Ygc2hhcmVzIG9mIHN0b2NrIHlvdSB3YW50IHRvIFNFTExcIixcclxuICAgICAgICAgIFwiVG90YWwgU2VsbGluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgICAgXCJTRUxMXCIsXHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIG5vdCBwdXJjaGFzZWQgYW55IHNoYXJlcywgcGxlYXNlIGJ1eSB0aGVtLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgc3RvY2tzIG9uZSB0aW1lIGR1cmluZyB0dXJuLlwiLCA4MDApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uUGFydG5lcnNoaXBDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJnbyBpbnRvIHBhcnRuZXIgc2hpcFwiKTtcclxuICAgIC8vIHRoaXMuU2hvd1RvYXN0KFwid29yayBpbiBwcm9ncmVzcywgY29taW5nIHNvb24uLi5cIik7XHJcbiAgICAvLyB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB0aGlzLkVuYWJsZVBhcnRuZXJzaGlwX1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBPblJvbGxEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicm9sbCB0aGUgZGljZVwiKTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25fVHVybkRlY2lzaW9uKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsRGljZSgpO1xyXG4gIH0sXHJcblxyXG4gIFByaW50RGljZVZhbHVlX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAvL3RoaXMuVGVtcERpY2VUZXh0LnN0cmluZz12YWx1ZTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gUGFydG5lcnNoaXAgc2V0dXBcclxuICBUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLk1haW5TY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLldhaXRpbmdTdGF0dXNTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCgpIHtcclxuICAgIENhbmNlbGxlZElEID0gW107XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJOYW1lLnN0cmluZyA9X3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QbGF5ZXJDYXNoLnN0cmluZyA9XCIkXCIrX3RlbXBEYXRhLkNhc2g7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuUGFydG5lclNoaXBQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuQ2hlY2tSZWZlcmVuY2VzKCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc05hbWUpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFR5cGUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlRGVzY3JpcHRpb24pO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzSW5kZXgoaW5kZXgpO1xyXG5cclxuICAgICAgdmFyIF90b3RhbExvY2F0aW9ucyA9IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDEpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkhvbWUgQmFzZWRcIik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc1ZhbHVlKDEwMDAwKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEZpbmFsQnVzaW5lc3NWYWx1ZSgxMDAwMCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAyKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMik7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiQnJpY2sgJiBNb3J0YXJcIik7XHJcbiAgICAgICAgdmFyIF9hbGxMb2NhdGlvbnNBbW91bnQgPSBfdG90YWxMb2NhdGlvbnMgKiAyNTAwMDtcclxuICAgICAgICB2YXIgX2ZpbmFsQW1vdW50ID0gNTAwMDAgKyBfYWxsTG9jYXRpb25zQW1vdW50O1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NWYWx1ZShfZmluYWxBbW91bnQpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QmFsYW5jZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLklzUGFydG5lcnNoaXAgPT0gdHJ1ZSkge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24oZmFsc2UpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0UGFydG5lck5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uUGFydG5lck5hbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlUGFydG5lclNoaXBCdXR0b24odHJ1ZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShcIm5vbmVcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICBcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAoX21zZykge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZS5zdHJpbmcgPV90ZW1wRGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25QbGF5ZXJDYXNoLnN0cmluZyA9XCIkXCIrX3RlbXBEYXRhLkNhc2g7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvbkRlc2NyaXB0aW9uLnN0cmluZyA9IF9tc2c7XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9QYXJ0bmVyU2hpcFNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9QYXJ0bmVyU2hpcFNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICB9LFxyXG4gIFxyXG4gIFJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKVxyXG4gIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50X1BhcnRuZXJzaGlwU2V0dXAoX2RhdGEpXHJcbiAge1xyXG4gICAgUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID0gdHJ1ZTtcclxuICAgIFBhcnRuZXJTaGlwRGF0YSA9IF9kYXRhO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKTtcclxuICAgIHZhciBfdHVybiA9IF9kYXRhLkRhdGEuVHVybjtcclxuICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgIHZhciBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5TZWxlY3RlZEJ1c2luc2Vzc0luZGV4O1xyXG4gICAgdmFyIF9idXNpbmVzc1ZhbHVlID0gX2RhdGEuRGF0YS5CdXNWYWx1ZTtcclxuICAgIHZhciBfcGF5QW1vdW50ID0gX2J1c2luZXNzVmFsdWUgLyAyO1xyXG4gICAgdmFyIF9idXNpbmVzc01vZGUgPSBcIlwiO1xyXG5cclxuICAgIGlmIChfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NUeXBlID09IDEpXHJcbiAgICAgIF9idXNpbmVzc01vZGUgPSBcIkhvbWUgQmFzZWRcIjtcclxuICAgIGVsc2UgaWYgKF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMilcclxuICAgICAgX2J1c2luZXNzTW9kZSA9IFwiQnJpY2sgJiBNb3J0YXJcIjtcclxuICAgICAgXHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgIHZhciBfbXNnID0gXCJ5b3UgaGF2ZSByZWNlaXZlZCBwYXJ0bmVyc2hpcCBvZmZlciBieSBcIiArIF9wbGF5ZXJEYXRhLlBsYXllck5hbWUgKyBcIiAsIGZvbGxvd2luZyBhcmUgdGhlIGRldGFpbHMgb2YgYnVzaW5lc3M6IFwiICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgTmFtZTogXCIgKyBfcGxheWVyRGF0YS5Ob09mQnVzaW5lc3NbX1NlbGVjdGVkQnVzaW5lc3NJbmRleF0uQnVzaW5lc3NOYW1lICsgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBNb2RlOiBcIiArIF9idXNpbmVzc01vZGUgKyBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIFZhbHVlOiAkXCIgKyBfYnVzaW5lc3NWYWx1ZSArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQ2FzaCBQYXltZW50OiAkXCIgKyBfcGF5QW1vdW50ICsgXCJcXG5cIiArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiaWYgb2ZmZXIgaXMgYWNjZXB0ZWQgeW91IHdpbGwgcmVjZWl2ZSA1MCUgc2hhcmUgb2YgdGhhdCBwYXJ0aWN1bGFyIGJ1c2luZXNzIGFuZCB3aWxsIHJlY2VpdmUgcHJvZml0L2xvc2Ugb24gdGhhdCBwYXJ0aWN1bGFyIGJ1c2luZXNzLlwiO1xyXG4gICAgXHJcbiAgICAgIHRoaXMuRW5hYmxlUGFydG5lcnNoaXBEZWNpc2lvbl9QYXJ0bmVyU2hpcFNldHVwKF9tc2cpO1xyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBBY2NlcHRPZmZlcl9QYXJ0bmVyc2hpcFNldHVwKClcclxuICB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2FsbEFjdG9ycyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUm9vbUFjdG9ycygpO1xyXG4gICAgdmFyIF9hY3RvciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgdmFyIG15SW5kZXggPSBfbWFuYWdlci5HZXRNeUluZGV4KCk7XHJcbiAgXHJcbiAgICBpZiAoUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLkNhc2ggPj0gX3BheUFtb3VudCkge1xyXG4gICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLkNhc2ggLT0gX3BheUFtb3VudDtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSk7XHJcbiAgICAgICAgdGhpcy5SYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cCh0cnVlLCBfcGF5QW1vdW50LCBmYWxzZSwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uUGxheWVyVUlELCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XSwgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCk7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcImNvbmdyYXR1bGF0aW9ucyEgeW91IGhhdmUgc3RhcnRlZCBidXNpbmVzcyBwYXJ0bmVyc2hpcFwiLDE4MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiTm90IGVub3VnaCBjYXNoLlwiLCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2VcclxuICAgIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgfSxcclxuXHJcbiAgQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCgpXHJcbiAge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9kYXRhID0gUGFydG5lclNoaXBEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgbXlJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuICAgIGNvbnNvbGUubG9nKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICBpZiAoUGFydG5lclNoaXBPZmZlclJlY2VpdmVkID09IHRydWUpIHtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKGZhbHNlLCAwLCB0cnVlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgY2FuY2VsbGVkIHRoZSBvZmZlci5cIiwxMjAwKTtcclxuICAgIH0gZWxzZVxyXG4gICAge1xyXG4gICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGNhbmNlbGxlZCB0aGUgb2ZmZXIuXCIsMTIwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoX2lzQWNjZXB0ZWQ9ZmFsc2UsX3BheW1lbnQ9MCxfaXNDYW5jZWxsZWQ9ZmFsc2UsX3VJRD1cIlwiLF9kYXRhPW51bGwsX2J1c2luZXNzSW5kZXg9MClcclxuICB7XHJcbiAgICB2YXIgX21haW5EYXRhID0geyBEYXRhOiB7IEFjY2VwdGVkOiBfaXNBY2NlcHRlZCwgQ2FzaFBheW1lbnQ6X3BheW1lbnQsQ2FuY2VsbGVkOl9pc0NhbmNlbGxlZCxQbGF5ZXJJRDpfdUlELFBsYXllckRhdGE6X2RhdGEsQnVzaW5lc3NJbmRleDpfYnVzaW5lc3NJbmRleH0gfTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJhaXNlRXZlbnQoMTIsIF9tYWluRGF0YSk7XHJcbiAgfSxcclxuXHJcbiAgUmVjZWl2ZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfZGF0YSlcclxuICB7XHJcbiAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5DaGVja1NwZWN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coX2RhdGEpO1xyXG4gICAgICB2YXIgX2FjY2VwdGVkID0gX2RhdGEuRGF0YS5BY2NlcHRlZDtcclxuICAgICAgdmFyIF9jYXNoID0gX2RhdGEuRGF0YS5DYXNoUGF5bWVudDtcclxuICAgICAgdmFyIF9jYW5jZWxsZWQgPSBfZGF0YS5EYXRhLkNhbmNlbGxlZDtcclxuICAgICAgdmFyIF91aWQgPSBfZGF0YS5EYXRhLlBsYXllcklEO1xyXG4gICAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuQnVzaW5lc3NJbmRleDtcclxuICAgIFxyXG4gICAgICBjb25zb2xlLmxvZyhcImFuc3dlciByZWNlaXZlZFwiKTtcclxuICAgICAgaWYoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJVSUQ9PUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLkRhdGEudXNlcklEKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKF9hY2NlcHRlZCkge1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggKz0gX2Nhc2g7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uSXNQYXJ0bmVyc2hpcCA9IHRydWU7XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uUGFydG5lcklEID0gX3VpZDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVyTmFtZSA9IF9wbGF5ZXJEYXRhLlBsYXllck5hbWU7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKCkuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdKTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIGFjY2VwdGVkXCIpO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IFwiICsgX3BsYXllckRhdGEuUGxheWVyTmFtZSArIFwiLCBjYXNoICRcIiArIF9jYXNoICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBhY2NvdW50LlwiLCAyODAwKTtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9jYW5jZWxsZWQpIHtcclxuICAgICAgICAgIGlmIChDYW5jZWxsZWRJRC5pbmNsdWRlcyhfdWlkKSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgICBDYW5jZWxsZWRJRC5wdXNoKF91aWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgY29uc29sZS5sb2coQ2FuY2VsbGVkSUQpO1xyXG4gICAgICAgICAgaWYgKENhbmNlbGxlZElELmxlbmd0aCA9PSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mby5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXJ0bmVyc2hpcCBvZmZlciBoYXMgYmVlbiBjYW5jZWxsZWQgYnkgYWxsIG90aGVyIHVzZXJzLlwiLCAyODAwKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm9mZmVyIHJlamVjdGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoX2FjY2VwdGVkKSB7XHJcbiAgICAgICAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiT2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgb3RoZXIgcGxheWVyLlwiLCAxODAwKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChfY2FuY2VsbGVkKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEludmVzdCBhbmQgc2VsbCBtb2RkdWxlXHJcblxyXG4gIFJlc2V0R29sZElucHV0KCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkdvbGRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICBHb2xkQ2FzaEFtb3VudCA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCkge1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLlN0b2NrRWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBcIlwiO1xyXG4gIH0sXHJcblxyXG4gIG9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsKF9hbW91bnQpIHtcclxuICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IF9hbW91bnQ7XHJcblxyXG4gICAgaWYgKEVudGVyQnV5U2VsbEFtb3VudCA9PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgT25jZU9yU2hhcmUgKyBcIipcIiArIEVudGVyQnV5U2VsbEFtb3VudCArIFwiPVwiICsgX2Ftb3VudFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uKCk7XHJcbiAgICB0aGlzLlJlc2V0R29sZElucHV0KCk7XHJcbiAgICB0aGlzLlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCgpO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgIF90aXRsZSxcclxuICAgIF9kaWNlUmVzdWx0LFxyXG4gICAgX3ByaWNlVGl0bGUsXHJcbiAgICBfcHJpY2VWYWx1ZSxcclxuICAgIF9idXlPclNlbGxUaXRsZSxcclxuICAgIF90b3RhbEFtb3VudFRpdGxlLFxyXG4gICAgX3RvdGFsQW1vdW50VmFsdWUsXHJcbiAgICBfYnV0dG9uTmFtZSxcclxuICAgIF9zdGF0ZVxyXG4gICkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IF90aXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlUmVzdWx0O1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5QcmljZVRpdGxlTGFiZWwuc3RyaW5nID0gX3ByaWNlVGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVmFsdWVMYWJlbC5zdHJpbmcgPSBfcHJpY2VWYWx1ZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQnV5T3JTZWxsVGl0bGVMYWJlbC5zdHJpbmcgPSBfYnV5T3JTZWxsVGl0bGU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VGl0bGVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXR0b25OYW1lTGFiZWwuc3RyaW5nID0gX2J1dHRvbk5hbWU7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlRGF0YV9JbnZlc3RTZWxsKF90b3RhbEFtb3VudFZhbHVlKSB7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRvdGFsQW1vdW50VmFsdWVMYWJlbC5zdHJpbmcgPSBfdG90YWxBbW91bnRWYWx1ZTtcclxuICB9LFxyXG5cclxuICBBcHBseUJ1dHRvbl9JbnZlc3RTZWxsKCkge1xyXG4gICAgaWYgKEVudGVyQnV5U2VsbEFtb3VudCA9PSBcIlwiKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiUGxlYXNlIGVudGVyIGFuIGFtb3VudC5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID09IEludmVzdEVudW0uR29sZEludmVzdCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIF9Ub3RhbEFtb3VudCA8PVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCA9XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5DYXNoIC0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uR29sZENvdW50ID1cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLkdvbGRDb3VudCArIF9hbW91bnQ7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgYm91Z2h0IFwiICsgX2Ftb3VudCArIFwiIG91bmNlcyBvZiBHT0xEXCIsXHJcbiAgICAgICAgICAgIDE0MDBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5Hb2xkU2VsbCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBfYW1vdW50IDw9XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5Hb2xkQ291bnRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoID1cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLkNhc2ggKyBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5Hb2xkQ291bnQgPVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uR29sZENvdW50IC0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICtcclxuICAgICAgICAgICAgICBfYW1vdW50ICtcclxuICAgICAgICAgICAgICBcIiBvdW5jZXMgb2YgR09MRCBmb3IgICRcIiArXHJcbiAgICAgICAgICAgICAgX1RvdGFsQW1vdW50LFxyXG4gICAgICAgICAgICAxNDAwXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcInlvdSBkb24ndCBoYXZlIGVub3VnaCBHT0xEIG91bmNlcywgeW91IG93biBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Hb2xkQ291bnQgK1xyXG4gICAgICAgICAgICAgIFwiIG9mIEdPTEQgb3VuY2VzXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5TdG9ja0ludmVzdCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuICAgICAgICB2YXIgX1RvdGFsQW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIF9Ub3RhbEFtb3VudCA8PVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCA9XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5DYXNoIC0gX1RvdGFsQW1vdW50O1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uU3RvY2tDb3VudCA9XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5TdG9ja0NvdW50ICsgX2Ftb3VudDtcclxuICAgICAgICAgIC8vY2FuIGFkZCBtdWx0aXBsZSBzdG9ja3Mgd2l0aCBidXNpbmVzcyBuYW1lIGluIG9iamVjdCBpZiByZXF1aXJlZFxyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIgK1xyXG4gICAgICAgICAgICAgIF9hbW91bnQgK1xyXG4gICAgICAgICAgICAgIFwiIHNoYXJlcyBvZiBidXNpbmVzcyBcIiArXHJcbiAgICAgICAgICAgICAgU3RvY2tCdXNpbmVzc05hbWUsXHJcbiAgICAgICAgICAgIDE0MDBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgZG9uJ3QgaGF2ZSBlbm91Z2ggY2FzaC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5TdG9ja1NlbGwpIHtcclxuICAgICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIF9hbW91bnQgPD1cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLlN0b2NrQ291bnRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoID1cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLkNhc2ggKyBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5TdG9ja0NvdW50ID1cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLlN0b2NrQ291bnQgLSBfYW1vdW50O1xyXG5cclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBzb2xkIFwiICtcclxuICAgICAgICAgICAgICBfYW1vdW50ICtcclxuICAgICAgICAgICAgICBcIiBzaGFyZXMgb2Ygc3RvY2sgZm9yICAkXCIgK1xyXG4gICAgICAgICAgICAgIF9Ub3RhbEFtb3VudCxcclxuICAgICAgICAgICAgMTQwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgICAgXCJ5b3UgZG9uJ3QgaGF2ZSBlbm91Z2ggc3RvY2tzIHNoYXJlcywgeW91IG93biBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5TdG9ja0NvdW50ICtcclxuICAgICAgICAgICAgICBcIiBvZiBzdG9jayBzaGFyZXNcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFBheWRheSBvciBEb3VibGUgcGF5IERheVxyXG4gIFRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBheURheVNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pIHtcclxuICAgIGlmIChITUFtb3VudCA9PSAwKSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChcclxuICAgICAgICBjYy5CdXR0b25cclxuICAgICAgKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoXHJcbiAgICAgICAgY2MuQnV0dG9uXHJcbiAgICAgICkuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQk1BbW91bnQgPT0gMCkge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFsb2FuVGFrZW4pIHtcclxuICAgICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBMb2FuUGF5ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBHZXRMb2FuQW1vdW50X1BheURheSgpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHZhciBfbG9hbiA9IDA7XHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICBpbmRleCA8IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuICAgICAgaW5kZXgrK1xyXG4gICAgKSB7XHJcbiAgICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW4gPVxyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfbG9hbjtcclxuICB9LFxyXG5cclxuICBBc3NpZ25EYXRhX1BheURheShfdGl0bGUsX2lzRG91YmxlUGF5RGF5ID0gZmFsc2UsX3NraXBITSA9IGZhbHNlLF9za2lwQk0gPSBmYWxzZSxfaXNCb3QgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5Jc0JvdFR1cm4gPSBfaXNCb3Q7XHJcbiAgICBEb3VibGVQYXlEYXkgPSBfaXNEb3VibGVQYXlEYXk7XHJcbiAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBfdGl0bGU7XHJcbiAgICB2YXIgX3RpbWUgPSAxODAwO1xyXG5cclxuICAgIGlmIChfaXNCb3QgPT0gZmFsc2UpIHtcclxuICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcbiAgICAgIGVsc2UgaWYgKF9za2lwSE0pXHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcbiAgICAgIGVsc2UgaWYgKF9za2lwQk0pXHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIsX3RpbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy9jaGVjayBza2lwIHBheWRheSB2YXJpYWJsZXNcclxuICAgICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYW5kIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgIGVsc2UgaWYgKF9za2lwSE0pXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBob21lIGJhc2VkIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICAgIGVsc2UgaWYgKF9za2lwQk0pXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3VyIHBheWRheSBvbiBicmljayAmIG1vcnRhciBidXNpbmVzc2VzcyB3aWxsIGJlIHNraXBwZWQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaFxyXG4gICAgKTtcclxuXHJcbiAgICB2YXIgSE1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ib21lQmFzZWRBbW91bnQ7XHJcbiAgICB2YXIgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgIHZhciBCTUxvY2F0aW9ucyA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlRvdGFsTG9jYXRpb25zQW1vdW50O1xyXG5cclxuICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDtpbmRleCA8R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtpbmRleCsrKSB7XHJcbiAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbG9hblRha2VuID0gX2xvYW5UYWtlbjtcclxuXHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkTnVtYmVyTGFiZWwuc3RyaW5nID0gSE1BbW91bnQ7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuQk1OdW1iZXJMYWJlbC5zdHJpbmcgPSBCTUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxvY2F0aW9uTGFiZWwuc3RyaW5nID0gQk1Mb2NhdGlvbnM7XHJcblxyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgLy9jaGVjayBpZiBsb2FuIHdhcyBza2lwcGVkIHByZXZpb3VzbHlcclxuICAgIGlmIChfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCkge1xyXG4gICAgICB2YXIgX2xvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuRm90dGVyTGFiZWwuc3RyaW5nID0gXCIqcGF5ICRcIiArIF9sb2FuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJDUwMDBcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgaWYgKF9za2lwSE0gJiYgX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCAwLCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBITSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheSgwLCBCTUFtb3VudCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgaWYgKF9za2lwQk0pIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIHRoaXMuVXBkYXRlQnV0dG9uc19QYXlEYXkoSE1BbW91bnQsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG5cclxuICAgIGlmIChfc2tpcEJNIHx8IF9za2lwSE0pIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlDb21wbGV0ZWQoKTtcclxuICAgICAgfSwgX3RpbWUgKyAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfaXNCb3QpIHtcclxuICAgICAgdGhpcy5PbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICB0aGlzLk9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5PbkxvYW5QYXltZW50Q2xpY2tlZF9QYXlEYXkoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhvbWVCYXNlZFBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIGlmICghSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgaWYgKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcblxyXG4gICAgICBIb21lQmFzZWRQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkhvbWVCYXNlZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHZhciBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgICAgdmFyIF9kaWNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxPbmVEaWNlKCk7XHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcztcclxuXHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcblxyXG4gICAgICAvL3BhcnRuZXJzaGlwIGNvZGVcclxuICAgICAgaWYgKERvdWJsZVBheURheSlcclxuICAgICAgICBfbXVsdGlwbGllciA9IDI7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmIChfdGVtcERhdGFbaW5kZXhdLklzUGFydG5lcnNoaXApXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBfcGF5bWVudCA9X211bHRpcGxpZXIqIF9kaWNlICogMTAwMDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gKF9wYXltZW50IC8gMik7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgfSAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZD4wKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBwYXJ0bmVyc2hpcCBpbiBzb21lIGJ1c2luZXNzLCByZXNwZWN0aXZlIDUwJSBwcm9maXQgb2YgcGFydGljdWxhciBidXNpbmVzcyB3aWxsIGJlIHNoYXJlZC5cIiwgMjAwMCk7XHJcbiAgICAgIH1cclxuICAgICAgLy9wYXJ0bmVyc2hpcCBjb2RlXHJcblxyXG4gICAgICBpZiAoIURvdWJsZVBheURheSlcclxuICAgICAgICBUb3RhbFBheURheUFtb3VudCA9IEhNQW1vdW50ICogX2RpY2UgKiAxMDAwLV9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBUb3RhbFBheURheUFtb3VudCA9IDIgKiAoSE1BbW91bnQgKiBfZGljZSkgKiAxMDAwLV9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcblxyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZyA9IEhNQW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID1cIihcIitfZGljZSArIFwiKlwiICsgSE1BbW91bnQgKyBcIipcIiArIFwiMTAwMCktXCIrX2Ftb3VudFRvQmVBZGp1c3RlZCtcIj1cIisgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPVwiKFwiK19kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKjIpLVwiK19hbW91bnRUb0JlQWRqdXN0ZWQrXCI9XCIgKyBUb3RhbFBheURheUFtb3VudDtcclxuXHJcbiAgICAgIGlmICh0aGlzLklzQm90VHVybikge1xyXG4gICAgICAgIHRoaXMuUmVjZWl2ZVBheW1lbnRfUGF5RGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCkge1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheSh0cnVlKTtcclxuXHJcbiAgICAgIGlmICghRG91YmxlUGF5RGF5KVxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiUGF5RGF5XCI7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIkRvdWJsZVBheURheVwiO1xyXG5cclxuICAgICAgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgQk1BbW91bnQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ccmlja0FuZE1vcnRhckFtb3VudDtcclxuICAgICAgdmFyIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgICB2YXIgX2Ftb3VudCA9IEJNQW1vdW50ICsgQk1Mb2NhdGlvbnM7XHJcbiAgICAgIHZhciBfZGljZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuXHJcbiAgICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcztcclxuXHJcbiAgICAgIHZhciBfYW1vdW50VG9CZVNlbmQgPSAwO1xyXG4gICAgICB2YXIgX2Ftb3VudFRvQmVBZGp1c3RlZCA9IDA7XHJcbiAgICAgIHZhciBfbXVsdGlwbGllciA9IDE7XHJcblxyXG4gICAgICBpZiAoRG91YmxlUGF5RGF5KVxyXG4gICAgICAgIF9tdWx0aXBsaWVyID0gMjtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9sb2NhdGlvbnMgPSBfdGVtcERhdGFbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgdmFyIF9wYXltZW50ID1fbG9jYXRpb25zKl9tdWx0aXBsaWVyKiBfZGljZSAqIDIwMDA7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlU2VuZCA9IChfcGF5bWVudCAvIDIpO1xyXG4gICAgICAgICAgICBfbWFuYWdlci5TZW5kUHJvZml0X1BhcnRuZXJfVHVybkRlY2lzaW9uKF9hbW91bnRUb0JlU2VuZCwgX3RlbXBEYXRhW2luZGV4XS5QYXJ0bmVySUQpO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZUFkanVzdGVkICs9IF9hbW91bnRUb0JlU2VuZDtcclxuICAgICAgICAgIH0gIFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKF9hbW91bnRUb0JlQWRqdXN0ZWQ+MClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgcGFydG5lcnNoaXAgaW4gc29tZSBidXNpbmVzcywgcmVzcGVjdGl2ZSA1MCUgcHJvZml0IG9mIHBhcnRpY3VsYXIgYnVzaW5lc3Mgd2lsbCBiZSBzaGFyZWQuXCIsIDIwMDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIURvdWJsZVBheURheSlcclxuICAgICAgICBUb3RhbFBheURheUFtb3VudCA9IF9hbW91bnQgKiBfZGljZSAqIDIwMDAtX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gMiAqIChfYW1vdW50ICogX2RpY2UpICogMjAwMC1fYW1vdW50VG9CZUFkanVzdGVkO1xyXG5cclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkRpY2VSZXN1bHRMYWJlbC5zdHJpbmcgPSBfZGljZTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQnVzaW5lc3NMYWJlbC5zdHJpbmcgPSBfYW1vdW50O1xyXG5cclxuICAgICAgaWYgKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlRvdGFsQW1vdW50TGFiZWwuc3RyaW5nID1cIihcIitfZGljZSArIFwiKlwiICsgX2Ftb3VudCArIFwiKlwiICsgXCIyMDAwKS1cIiArX2Ftb3VudFRvQmVBZGp1c3RlZCtcIj1cIisgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPVwiKFwiK19kaWNlICsgXCIqXCIgKyBfYW1vdW50ICsgXCIqXCIgKyBcIjIwMDAqMiktXCIrX2Ftb3VudFRvQmVBZGp1c3RlZCtcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG5cclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpIHtcclxuICAgIC8vYnJpY2sgYW5kIG1vcnRhclxyXG4gICAgaWYgKCFMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIF9Fc3RpbWF0ZUxvYW4gPSAwO1xyXG5cclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KS8vaWYgcGxheWVyIGhhZCBza2lwcHBlZCBsb2FuIHByZXZpb3VzbHkgY2FsbCBhbGwgYW1vdW50IGR1ZVxyXG4gICAgICAgIF9Fc3RpbWF0ZUxvYW4gPSB0aGlzLkdldExvYW5BbW91bnRfUGF5RGF5KCk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBfRXN0aW1hdGVMb2FuID0gNTAwMDtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID49IF9Fc3RpbWF0ZUxvYW4pIHtcclxuICAgICAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggLSBfRXN0aW1hdGVMb2FuO1xyXG5cclxuICAgICAgICB2YXIgX2xvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDtpbmRleCA8R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzLmxlbmd0aDtpbmRleCsrKSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBfYnVzaW5lc3NJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IC0gX0VzdGltYXRlTG9hbjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50IDw9IDApIHtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hbkFtb3VudCA9IDA7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5UYWtlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KVxyXG4gICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ta2lwTG9hbkJ1dHRvbi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvdXQgb2YgbW9uZXlcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZWNlaXZlUGF5bWVudF9QYXlEYXkoKSB7XHJcbiAgICAvL2FsbFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoID1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bIF9wbGF5ZXJJbmRleF0uQ2FzaCArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1BheURheShHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoKTtcclxuICAgIGlmICghdGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgXCJBbW91bnQgJFwiICtcclxuICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ICtcclxuICAgICAgICAgIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQsIFRvdGFsIENhc2ggaGFzIGJlY29tZSAkXCIgK1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCxcclxuICAgICAgICAxNTAwXHJcbiAgICAgICk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCAxNTUwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIFwiQW1vdW50ICRcIiArXHJcbiAgICAgICAgICBUb3RhbFBheURheUFtb3VudCArXHJcbiAgICAgICAgICBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGNhc2ggYW1vdW50LCBUb3RhbCBDYXNoIGhhcyBiZWNvbWUgJFwiICtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLkNhc2hcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFNraXBMb2FuT25lVGltZV9QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgXCJZb3UgaGF2ZSBza2lwcGVkIHRoZSBsb2FuIHBheW1lbnQsIGJhbmsgd2lsbCBjYWxsIHVwb24gY29tcGxldGUgbG9hbiBhbW91bnQgb24gbmV4dCBwYXlkYXlcIixcclxuICAgICAgMjAwMFxyXG4gICAgKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQgPSB0cnVlO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgTG9hblBheWVkID0gdHJ1ZTtcclxuICB9LFxyXG5cclxuICBTZWxsQnVzaW5lc3NfUGF5RGF5KCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLkVuYWJsZVNlbGxTY3JlZW5fX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUNhc2hfUGF5RGF5KF9hbW91bnQpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIEV4aXRMb2FuU2NyZWVuX1BheURheSgpIHtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFN0YXJ0TmV3R2FtZV9QYXlEYXkoKSB7XHJcbiAgICAvL2lmIGJhbmtydXB0ZWQgeW91IGNhbiBzdGFydCBuZXcgZ2FtZVxyXG4gICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgIFwiWW91IHdpbGwgbG9zZSBhbGwgcHJvZ3Jlc3MgYW5kIHN0YXJ0IG5ldyBnYW1lIGZyb20gdGhlIHN0YXJ0LlwiLFxyXG4gICAgICAzMDAwXHJcbiAgICApO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuRXhpdExvYW5TY3JlZW5fUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgIHRoaXMuRXhpdF9fX0luc3VmZmljaWVudEJhbGFuY2UoKTtcclxuICAgICAgY2Muc3lzdGVtRXZlbnQuZW1pdChcIlNob3dDYXJkXCIsIFwiXCIsIGZhbHNlKTtcclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgTG9hblBheWVkID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfSG9tZUJhc2VkKGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KGZhbHNlLGZhbHNlKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkJhbmtydXB0X1R1cm5EZWNpc2lvbigpO1xyXG4gICAgfSwgMzAxMCk7XHJcbiAgfSxcclxuXHJcbiAgUGF5RGF5Q29tcGxldGVkKCkge1xyXG4gICAgaWYgKEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgJiYgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkICYmIExvYW5QYXllZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgY29uc29sZS5sb2coXCJhbGwgcGF5ZGF5IGRvbmVcIik7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKFxyXG4gICAgICAgIGZhbHNlXHJcbiAgICAgICk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChcclxuICAgICAgICBmYWxzZVxyXG4gICAgICApO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihcclxuICAgICAgICBmYWxzZVxyXG4gICAgICApO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KFxyXG4gICAgICAgIGZhbHNlLFxyXG4gICAgICAgIGZhbHNlXHJcbiAgICAgICk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jYWxsVXBvbkNhcmQoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gU2VsbCBCdXNpbmVzcyBVSVxyXG4gIFRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB2YXIgX3RlbXBEYXRhID0gX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XTtcclxuXHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlNFTExcIjtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID1fbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzQ291bnRMYWJlbC5zdHJpbmcgPVwiTm8gb2YgQnVzaW5lc3NlcyA6IFwiICtfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5Ob09mQnVzaW5lc3MubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkJ1c2luZXNzU2VsbFByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlNjcm9sbENvbnRlbnROb2RlO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE5hbWUoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NOYW1lKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRUeXBlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc0luZGV4KGluZGV4KTtcclxuXHJcbiAgICAgIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDEpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgxKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJIb21lIEJhc2VkXCIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzVHlwZSkgPT0gMikge1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NNb2RlKDIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TW9kZShcIkJyaWNrICYgTW9ydGFyXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJhbGFuY2UoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQW1vdW50KTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRMb2NhdGlvbnMoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGgpO1xyXG5cclxuICAgICAgaWYgKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVTZWxsTG9jYXRpb25CdXR0b24oZmFsc2UpO1xyXG4gICAgICBlbHNlIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKHRydWUpO1xyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnVzaW5lc3NEZXRhaWxOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxOb2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBFbmFibGVTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKF9pc1R1cm5vdmVyID0gZmFsc2UpIHtcclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEJ1c2luZXNzVUlfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsU2NyZWVuX19TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbFNjcmVlbkFsb25nVHVybk92ZXJfX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEludmVzdCBVSVxyXG4gIFRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnZlc3RTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gIH0sXHJcbiAgU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSShfaXNUdXJub3Zlcikge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJJTlZFU1RcIjtcclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID1cclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5JbnZlc3RTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2NyZWVuX0ludmVzdFNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEJ1eU9SU2VsbCBVSVxyXG4gIFRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5CdXlPclNlbGxTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIEVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkodHJ1ZSk7XHJcbiAgICB0aGlzLlNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpO1xyXG4gIH0sXHJcbiAgU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3Zlcikge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJCVVkgT1IgU0VMTFwiO1xyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2g7XHJcbiAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuXHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxPckJ1eV9CdXlPclNlbGxTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxPckJ1eUFsb25nVHVybk92ZXJfQnV5T3JTZWxsU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gT25lIFF1ZXN0aW9uIHNldHVwIFVpXHJcbiAgVG9nZ2xlRGVjaXNpb25TY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU3BhY2VTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZVdhaXRpbmdTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuV2FpdGluZ1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoXHJcbiAgICBfbXlEYXRhLFxyXG4gICAgX2FjdG9yc0RhdGEsXHJcbiAgICBfaXNUdXJuT3ZlcixcclxuICAgIF9tb2RlSW5kZXggPSAwXHJcbiAgKSB7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiT05FIFFVRVNUSU9OXCI7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID0gX215RGF0YS5QbGF5ZXJOYW1lO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuUGxheWVyRGV0YWlsTGFiZWwuc3RyaW5nID1cclxuICAgICAgXCJObyBvZiBQbGF5ZXJzOiBcIiArXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mby5sZW5ndGg7XHJcblxyXG4gICAgaWYgKF9tb2RlSW5kZXggPT0gMikge1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUm9vbUVzc2VudGlhbHMuSXNTcGVjdGF0ZSA9PSBmYWxzZVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgLy9jaGVjayBpZiBwbGF5ZXIgaXMgc3BlY3RhdGUgb3Igbm90LCBkb250IGFkZCBhbnkgc3BlY3RhdGVzXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIF9teURhdGEuUGxheWVyVUlEICE9XHJcbiAgICAgICAgICAgIF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRFxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpXHJcbiAgICAgICAgICAgICAgLnNldFBsYXllck5hbWUoXHJcbiAgICAgICAgICAgICAgICBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJOYW1lXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpXHJcbiAgICAgICAgICAgICAgLnNldFBsYXllclVJRChcclxuICAgICAgICAgICAgICAgIF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhLlBsYXllclVJRFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX21vZGVJbmRleCA9PSAxKSB7XHJcbiAgICAgIC8vZm9yIGJvdFxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX2FjdG9yc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF9teURhdGEuUGxheWVyVUlEICE9IF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJVSUQpIHtcclxuICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGV0YWlsc1ByZWZhYik7XHJcbiAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgIC5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpXHJcbiAgICAgICAgICAgIC5zZXRQbGF5ZXJOYW1lKF9hY3RvcnNEYXRhW2luZGV4XS5QbGF5ZXJOYW1lKTtcclxuICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgLmdldENvbXBvbmVudChcIlBsYXllckRldGFpbHNcIilcclxuICAgICAgICAgICAgLnNldFBsYXllclVJRChfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKTtcclxuICAgICAgICAgIG9uZVF1ZXN0aW9uTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzVHVybk92ZXIpIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldFNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBvbmVRdWVzdGlvbk5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBvbmVRdWVzdGlvbk5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRXhpdF9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZVNwYWNlU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdEFsb25nVHVybk92ZXJfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLmNvbXBsZXRlQ2FyZFR1cm4oKTtcclxuICB9LFxyXG5cclxuICBTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfcXVlc3Rpb24pIHtcclxuICAgIHZhciBfbXlEYXRhID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpXHJcbiAgICAgIC5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25UaXRsZUxhYmVsLnN0cmluZyA9IFwiT05FIFFVRVNUSU9OXCI7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvbkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9teURhdGEuQ2FzaDtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uUXVlc3Rpb25MYWJlbC5zdHJpbmcgPVxyXG4gICAgICBcIlBsYXllciBoYXMgYXNrZWQgaWYgXCIgK1xyXG4gICAgICBfcXVlc3Rpb24gK1xyXG4gICAgICBcIlxcblwiICtcclxuICAgICAgXCJcXG5cIiArXHJcbiAgICAgIFwiKmVpdGhlciBhbnN3ZXIgcXVlc3Rpb24gb3IgcGF5ICQ1MDAwIHRvIHBsYXllciB3aG9zZSBhc2tpbmcgcXVlc3Rpb24uXCI7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgU2hvd1RvYXN0OiBmdW5jdGlvbiAobWVzc2FnZSwgdGltZSA9IDIyNTApIHtcclxuICAgIHRoaXMuUG9wVXBVSS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5Qb3BVcFVJTGFiZWwuc3RyaW5nID0gbWVzc2FnZTtcclxuICAgIHZhciBTZWxmVG9hc3QgPSB0aGlzO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIFNlbGZUb2FzdC5Qb3BVcFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSwgdGltZSk7XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==