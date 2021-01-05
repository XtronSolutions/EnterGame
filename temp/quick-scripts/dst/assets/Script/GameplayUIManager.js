
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lcGxheVVJTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJHYW1lTWFuYWdlciIsIkdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciIsImJ1c2luZXNzRGV0YWlsTm9kZXMiLCJvbmVRdWVzdGlvbk5vZGVzIiwiYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzIiwiUGFydG5lclNoaXBEYXRhIiwiUGFydG5lclNoaXBPZmZlclJlY2VpdmVkIiwiQ2FuY2VsbGVkSUQiLCJMb2FuQW1vdW50RW51bSIsImNjIiwiRW51bSIsIk5vbmUiLCJUZW5UaG91c2FuZCIsIlRlbnR5VGhvdXNhbmQiLCJUaGlydHlUaG91c2FuZCIsIkZvcnR5VGhvdXNhbmQiLCJGaWZ0eVRob3VzYW5kIiwiT3RoZXIiLCJCdXNpbmVzc1NldHVwVUkiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiUGxheWVyTmFtZVVJIiwiZGlzcGxheU5hbWUiLCJ0eXBlIiwiTGFiZWwiLCJzZXJpYWxpemFibGUiLCJ0b29sdGlwIiwiUGxheWVyQ2FzaFVJIiwiQnVzaW5lc3NUeXBlVGV4dFVJIiwiVGV4dCIsIkJ1c2luZXNzTmFtZVRleHRVSSIsIkJ1c2luZXNzVHlwZUxhYmVsIiwiRWRpdEJveCIsIkJ1c2luZXNzTmFtZUxhYmVsIiwiSG9tZUJhc2VkTm9kZVVJIiwiTm9kZSIsIkJyaWNrQW5kTW9ydGFyTm9kZVVJIiwiVGltZXJVSSIsIlRpbWVyTm9kZSIsIkJ1c2luZXNzU2V0dXBOb2RlIiwiTG9hblNldHVwTm9kZSIsIkxvYW5BbW91bnQiLCJMb2FuQW1vdW50TGFiZWwiLCJXYWl0aW5nU3RhdHVzTm9kZSIsIkV4aXRCdXR0b25Ob2RlIiwiY3RvciIsIkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cCIsInN0cmluZyIsIlR1cm5EZWNpc2lvblNldHVwVUkiLCJNYXJrZXRpbmdFZGl0Qm94IiwiR29sZEVkaXRCb3giLCJTdG9ja0VkaXRCb3giLCJDYXNoQW1vdW50TGFiZWwiLCJFeHBhbmRCdXNpbmVzc05vZGUiLCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnQiLCJFeHBhbmRCdXNpbmVzc1ByZWZhYiIsIlByZWZhYiIsIkludmVzdEVudW0iLCJTdG9ja0ludmVzdCIsIkdvbGRJbnZlc3QiLCJTdG9ja1NlbGwiLCJHb2xkU2VsbCIsIkludmVzdFNlbGxVSSIsIlRpdGxlTGFiZWwiLCJEaWNlUmVzdWx0TGFiZWwiLCJQcmljZVRpdGxlTGFiZWwiLCJQcmljZVZhbHVlTGFiZWwiLCJCdXlPclNlbGxUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRUaXRsZUxhYmVsIiwiVG90YWxBbW91bnRWYWx1ZUxhYmVsIiwiQnV0dG9uTmFtZUxhYmVsIiwiSW52ZXN0U3RhdGUiLCJBbW91bnRFZGl0Qm94IiwiU2VsbEJ1c2luZXNzVUkiLCJDYXNoTGFiZWwiLCJQbGF5ZXJOYW1lTGFiZWwiLCJCdXNpbmVzc0NvdW50TGFiZWwiLCJTY3JvbGxDb250ZW50Tm9kZSIsIkJ1c2luZXNzU2VsbFByZWZhYiIsIkV4aXRCdXR0b24iLCJUdXJuT3ZlckV4aXRCdXR0b24iLCJQYXlEYXlVSSIsIkhvbWVCYXNlZE51bWJlckxhYmVsIiwiQk1OdW1iZXJMYWJlbCIsIkJNTnVtYmVyTG9jYXRpb25MYWJlbCIsIkhvbWVCYXNlZEJ0biIsIkJNQnRuIiwiTG9hbkJ0biIsIk1haW5QYW5lbE5vZGUiLCJSZXN1bHRQYW5lbE5vZGUiLCJMb2FuUmVzdWx0UGFuZWxOb2RlIiwiUmVzdWx0U2NyZWVuVGl0bGVMYWJlbCIsIlRvdGFsQnVzaW5lc3NMYWJlbCIsIlRvdGFsQW1vdW50TGFiZWwiLCJTa2lwTG9hbkJ1dHRvbiIsIkxvYW5Gb3R0ZXJMYWJlbCIsIkludmVzdFVJIiwiQnV5T3JTZWxsVUkiLCJPbmVRdWVzdGlvblVJIiwiUGxheWVyRGV0YWlsTGFiZWwiLCJEZXRhaWxzUHJlZmFiIiwiU2Nyb2xsQ29udGVudCIsIldhaXRpbmdTY3JlZW4iLCJEZWNpc2lvblRpdGxlTGFiZWwiLCJEZWNpc2lvbkNhc2hMYWJlbCIsIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsIiwiRGVjaXNpb25RdWVzdGlvbkxhYmVsIiwiUGFydG5lcnNoaXBVSSIsIldhaXRpbmdTdGF0dXNTY3JlZW4iLCJNYWluU2NyZWVuIiwiVGl0bGVOYW1lIiwiUGxheWVyTmFtZSIsIlBsYXllckNhc2giLCJQYXJ0bmVyU2hpcFByZWZhYiIsIkRlY2lzaW9uU2NyZWVuIiwiRGVjaXNpb25QbGF5ZXJOYW1lIiwiRGVjaXNpb25QbGF5ZXJDYXNoIiwiRGVjaXNpb25EZXNjcmlwdGlvbiIsIlBsYXllckRhdGFJbnRhbmNlIiwiUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZSIsIlJlcXVpcmVkQ2FzaCIsIkluc2lkZUdhbWVCdXNpbmVzc1NldHVwIiwiVGVtcE1hcmtldGluZ0Ftb3VudCIsIlRlbXBIaXJpbmdMYXd5ZXIiLCJHb2xkQ2FzaEFtb3VudCIsIkVudGVyQnV5U2VsbEFtb3VudCIsIlN0b2NrQnVzaW5lc3NOYW1lIiwiRGljZVJlc3VsdCIsIk9uY2VPclNoYXJlIiwiTG9jYXRpb25OYW1lIiwiSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCIsIkJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCIsIkxvYW5QYXllZCIsIlRvdGFsUGF5RGF5QW1vdW50IiwiRG91YmxlUGF5RGF5IiwiR2FtZXBsYXlVSU1hbmFnZXIiLCJDb21wb25lbnQiLCJCdXNpbmVzc1NldHVwRGF0YSIsIkludmVzdFNlbGxTZXR1cFVJIiwiUGF5RGF5U2V0dXBVSSIsIlNlbGxCdXNpbmVzc1NldHVwVUkiLCJJbnZlc3RTZXR1cFVJIiwiQnV5T3JTZWxsU2V0dXBVSSIsIk9uZVF1ZXN0aW9uU2V0dXBVSSIsIlBhcnRuZXJzaGlwU2V0dXBVSSIsIlBvcFVwVUkiLCJQb3BVcFVJTGFiZWwiLCJHYW1lcGxheVVJU2NyZWVuIiwiSW52ZXN0U2VsbFNjcmVlbiIsIlBheURheVNjcmVlbiIsIlNlbGxCdXNpbmVzc1NjcmVlbiIsIkludmVzdFNjcmVlbiIsIkJ1eU9yU2VsbFNjcmVlbiIsIk9uZVF1ZXN0aW9uU3BhY2VTY3JlZW4iLCJPbmVRdWVzdGlvbkRlY2lzaW9uU2NyZWVuIiwiVGVtcERpY2VUZXh0IiwiTGVhdmVSb29tQnV0dG9uIiwib25Mb2FkIiwiQ2hlY2tSZWZlcmVuY2VzIiwiR29sZEludmVzdGVkIiwiR29sZFNvbGQiLCJTdG9ja0ludmVzdGVkIiwiU3RvY2tTb2xkIiwiSXNCb3RUdXJuIiwiSXNCYW5rcnVwdGVkIiwiQmFua3J1cHRlZEFtb3VudCIsIlJlc2V0VHVyblZhcmlhYmxlIiwicmVxdWlyZSIsIm9uRW5hYmxlIiwic3lzdGVtRXZlbnQiLCJvbiIsIlN5bmNEYXRhIiwib25EaXNhYmxlIiwib2ZmIiwiSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUiLCJhY3RpdmUiLCJDbG9zZUluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlIiwiVG9nZ2xlTGVhdmVSb29tQnV0dG9uX1NwZWN0YXRlTW9kZVVJIiwiX3N0YXRlIiwiT25MZWF2ZUJ1dHRvbkNsaWNrZWRfU3BlY3RhdGVNb2RlVUkiLCJJbnN0YW5jZSIsIkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIiLCJUb2dnbGVMZWF2ZVJvb21fQm9vbCIsIkRpc2Nvbm5lY3RQaG90b24iLCJzZXRUaW1lb3V0IiwiR2V0X0dhbWVNYW5hZ2VyIiwiQ2xlYXJEaXNwbGF5VGltZW91dCIsIlJlbW92ZVBlcnNpc3ROb2RlIiwiR2V0X011bHRpcGxheWVyU3luY01hbmFnZXIiLCJHZXRfU2VydmVyQmFja2VuZCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwIiwiaXNGaXJzdFRpbWUiLCJpbnNpZGVHYW1lIiwibW9kZUluZGV4IiwiX2lzQmFua3J1cHRlZCIsIl9CYW5rcnVwdEFtb3VudCIsIkluaXRfQnVzaW5lc3NTZXR1cCIsIlBsYXllckRhdGEiLCJCdXNpbmVzc0luZm8iLCJDYXNoIiwiUmVzZXRCdXR0b25TdGF0ZXNfQnVzaW5lc3NTZXR1cCIsImluZGV4IiwiUGxheWVyR2FtZUluZm8iLCJsZW5ndGgiLCJTdHVkZW50RGF0YSIsInVzZXJJRCIsIlBsYXllclVJRCIsIk9uQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwIiwiT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cCIsIk9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwIiwiR2V0T2JqX0J1c2luZXNzU2V0dXAiLCJVSUQiLCJPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXAiLCJCdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiIsIk9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cCIsIkJ1c2luZXNzTmFtZSIsImNoaWxkcmVuIiwiQnVzaW5lc3NUeXBlIiwiRW51bUJ1c2luZXNzVHlwZSIsIm5vbmUiLCJPbkhvbWVCYXNlZFNlbGVjdGVkX0J1c2luZXNzU2V0dXAiLCJIb21lQmFzZWQiLCJPbkJyaWNrTW9ydGFyU2VsZWN0ZWRfQnVzaW5lc3NTZXR1cCIsImJyaWNrQW5kbW9ydGFyIiwiYW1vdW50IiwiQ2FsY3VsYXRlTG9hbl9CdXNpbmVzc1NldHVwIiwiX2xvYW5UYWtlbiIsIl9idXNpbmVzc0luZGV4IiwiTm9PZkJ1c2luZXNzIiwiTG9hblRha2VuIiwiU2hvd1RvYXN0IiwiTWF0aCIsImFicyIsInBhcnNlSW50IiwiZ2V0Q29tcG9uZW50IiwiT25Mb2FuQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiZXZlbnQiLCJPbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwIiwiaSIsIk9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDJfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDNfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDRfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDVfQnVzaW5lc3NTZXR1cCIsIk9uTG9hbkFtb3VudENob29zZWRfMDZfQnVzaW5lc3NTZXR1cCIsIk9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwIiwiX2RhdGEiLCJfSUQiLCJQaG90b25BY3RvciIsImFjdG9yTnIiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIk1heFBsYXllcnMiLCJnZXRQaG90b25SZWYiLCJteVJvb20iLCJzZXRDdXN0b21Qcm9wZXJ0eSIsIlN0YXJ0VHVybiIsIlB1cmNoYXNlQnVzaW5lc3MiLCJfYW1vdW50IiwiX2J1c2luZXNzTmFtZSIsIl9pc0hvbWVCYXNlZCIsIkhvbWVCYXNlZEFtb3VudCIsIlN0YXJ0R2FtZSIsIkJyaWNrQW5kTW9ydGFyQW1vdW50IiwiRXhpdF9CdXNpbmVzc1NldHVwIiwiSW5pdGlhbFNldHVwX0J1c2luZXNzU2V0dXAiLCJfbW9kZSIsIkdldFNlbGVjdGVkTW9kZSIsIklzQmFua3J1cHQiLCJCYW5rcnVwdEFtb3VudCIsIkdldFR1cm5OdW1iZXIiLCJSYWlzZUV2ZW50IiwiRGF0YSIsImJhbmtydXB0ZWQiLCJ0dXJuIiwiUGxheWVyRGF0YU1haW4iLCJTdGFydFR1cm5BZnRlckJhbmtydXB0IiwiZXJyb3IiLCJTdGFydE5ld1NldHVwX0R1cmluZ0dhbWVfQnVzaW5lc3NTZXR1cCIsIlRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbiIsIlBheUFtb3VudFRvUGxheUdhbWUiLCJJc0JvdCIsImlzYWN0aXZlIiwiVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24iLCJPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25NYXJrZXRpbmdBbW91bnRTZWxlY3RlZF9UdXJuRGVjaXNpb24iLCJfcGxheWVySW5kZXgiLCJtYXJrZXRpbmdBbW91bnQiLCJNYXJrZXRpbmdBbW91bnQiLCJPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uIiwiTGF3eWVyU3RhdHVzIiwib25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbiIsIl9uYW1lIiwiT25FeHBhbmRCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsImdlbmVyYXRlZExlbmd0aCIsIkdlbmVyYXRlRXhwYW5kQnVzaW5lc3NfUHJlZmFic19UdXJuRGVjaXNpb24iLCJPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkRlc3Ryb3lHZW5lcmF0ZWROb2RlcyIsIk9uTmV3QnVzaW5lc3NCdXR0b25DbGlja2VkX1R1cm5EZWNpc2lvbiIsIk9uR29sZEFtb3VudENoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uIiwiVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsIiwiUm9sbFR3b0RpY2VzIiwiQXNzaWduRGF0YV9JbnZlc3RTZWxsIiwiT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uIiwiT25TdG9ja0RpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlJlc2V0U3RvY2tCdXNpbmVzc05hbWVJbnB1dCIsIk9uU2VsbEdvbGRDbGlja2VkX1R1cm5EZWNpc2lvbiIsIkdvbGRDb3VudCIsIk9uU2VsbFN0b2NrQ2xpY2tlZF9UdXJuRGVjaXNpb24iLCJTdG9ja0NvdW50IiwiT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uIiwiRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCIsIk9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbiIsIlJvbGxEaWNlIiwiUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uIiwidmFsdWUiLCJUb2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlRvZ2dsZVdhaXRpbmdTY3JlZW5fUGFydG5lclNoaXBTZXR1cCIsIlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAiLCJSZXNldF9QYXJ0bmVyU2hpcFNldHVwIiwiX21hbmFnZXIiLCJfdGVtcERhdGEiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJTZXROYW1lIiwiU2V0VHlwZSIsIlNldEJ1c2luZXNzSW5kZXgiLCJfdG90YWxMb2NhdGlvbnMiLCJMb2NhdGlvbnNOYW1lIiwiU2V0QnVzaW5lc3NNb2RlIiwiU2V0TW9kZSIsIlNldEJ1c2luZXNzVmFsdWUiLCJTZXRGaW5hbEJ1c2luZXNzVmFsdWUiLCJfYWxsTG9jYXRpb25zQW1vdW50IiwiX2ZpbmFsQW1vdW50IiwiU2V0QmFsYW5jZSIsIlNldExvY2F0aW9ucyIsIklzUGFydG5lcnNoaXAiLCJUb2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbiIsIlNldFBhcnRuZXJOYW1lIiwiUGFydG5lck5hbWUiLCJFbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAiLCJfbXNnIiwiY3VzdG9tUHJvcGVydGllcyIsIlBsYXllclNlc3Npb25EYXRhIiwiRXhpdF9QYXJ0bmVyU2hpcFNldHVwIiwiZGVzdHJveSIsIlJlY2VpdmVFdmVudF9QYXJ0bmVyc2hpcFNldHVwIiwiX2FjdG9yIiwiX3R1cm4iLCJUdXJuIiwiX3BsYXllckRhdGEiLCJfU2VsZWN0ZWRCdXNpbmVzc0luZGV4IiwiU2VsZWN0ZWRCdXNpbnNlc3NJbmRleCIsIl9idXNpbmVzc1ZhbHVlIiwiQnVzVmFsdWUiLCJfcGF5QW1vdW50IiwiX2J1c2luZXNzTW9kZSIsIkNoZWNrU3BlY3RhdGUiLCJBY2NlcHRPZmZlcl9QYXJ0bmVyc2hpcFNldHVwIiwiX2FsbEFjdG9ycyIsIlJvb21BY3RvcnMiLCJteUluZGV4IiwiR2V0TXlJbmRleCIsIlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwIiwiQ2FuY2VsT2ZmZXJfUGFydG5lcnNoaXBTZXR1cCIsIl9pc0FjY2VwdGVkIiwiX3BheW1lbnQiLCJfaXNDYW5jZWxsZWQiLCJfdUlEIiwiX21haW5EYXRhIiwiQWNjZXB0ZWQiLCJDYXNoUGF5bWVudCIsIkNhbmNlbGxlZCIsIlBsYXllcklEIiwiQnVzaW5lc3NJbmRleCIsIlJlY2VpdmVFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAiLCJfYWNjZXB0ZWQiLCJfY2FzaCIsIl9jYW5jZWxsZWQiLCJfdWlkIiwiUGFydG5lcklEIiwiaW5jbHVkZXMiLCJSZXNldEdvbGRJbnB1dCIsIm9uQW1vdW50Q2hhbmdlZF9JbnZlc3RTZWxsIiwiVXBkYXRlRGF0YV9JbnZlc3RTZWxsIiwiX3RpdGxlIiwiX2RpY2VSZXN1bHQiLCJfcHJpY2VUaXRsZSIsIl9wcmljZVZhbHVlIiwiX2J1eU9yU2VsbFRpdGxlIiwiX3RvdGFsQW1vdW50VGl0bGUiLCJfdG90YWxBbW91bnRWYWx1ZSIsIl9idXR0b25OYW1lIiwiQXBwbHlCdXR0b25fSW52ZXN0U2VsbCIsIl9Ub3RhbEFtb3VudCIsIkV4aXRCdXR0b25fSW52ZXN0U2VsbCIsIlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkiLCJUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkiLCJVcGRhdGVCdXR0b25zX1BheURheSIsIkhNQW1vdW50IiwiQk1BbW91bnQiLCJsb2FuVGFrZW4iLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJHZXRMb2FuQW1vdW50X1BheURheSIsIl9sb2FuIiwiQXNzaWduRGF0YV9QYXlEYXkiLCJfaXNEb3VibGVQYXlEYXkiLCJfc2tpcEhNIiwiX3NraXBCTSIsIl9pc0JvdCIsIl90aW1lIiwiVXBkYXRlQ2FzaF9QYXlEYXkiLCJCTUxvY2F0aW9ucyIsIlRvdGFsTG9jYXRpb25zQW1vdW50IiwiU2tpcHBlZExvYW5QYXltZW50IiwiUGF5RGF5Q29tcGxldGVkIiwiT25Ib21lQmFzZWRQYXltZW50Q2xpY2tlZF9QYXlEYXkiLCJPbkJNUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5IiwiX2RpY2UiLCJSb2xsT25lRGljZSIsIl9hbW91bnRUb0JlU2VuZCIsIl9hbW91bnRUb0JlQWRqdXN0ZWQiLCJfbXVsdGlwbGllciIsIlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24iLCJSZWNlaXZlUGF5bWVudF9QYXlEYXkiLCJfbG9jYXRpb25zIiwiX0VzdGltYXRlTG9hbiIsIlNraXBMb2FuT25lVGltZV9QYXlEYXkiLCJTZWxsQnVzaW5lc3NfUGF5RGF5IiwiRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRMb2FuU2NyZWVuX1BheURheSIsIlN0YXJ0TmV3R2FtZV9QYXlEYXkiLCJUb2dnbGVTa2lwUGF5RGF5X1dob2xlIiwiVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQiLCJUb2dnbGVTa2lwUGF5RGF5X0JyaWNrQW5kTW9ydGFyIiwiVG9nZ2xlUGF5RGF5IiwiQmFua3J1cHRfVHVybkRlY2lzaW9uIiwiY2FsbFVwb25DYXJkIiwiVG9nZ2xlU2VsbEJ1c2luZXNzU2NyZWVuX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAiLCJSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwIiwiQW1vdW50IiwiVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uIiwiX2lzVHVybm92ZXIiLCJFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsIkV4aXRTZWxsU2NyZWVuQWxvbmdUdXJuT3Zlcl9fU2VsbEJ1c2luZXNzVUlTZXR1cCIsImNvbXBsZXRlQ2FyZFR1cm4iLCJUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSSIsIkVuYWJsZUludmVzdF9JbnZlc3RTZXR1cFVJIiwiU2V0SW52ZXN0VUlfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RfSW52ZXN0U2V0dXBVSSIsIkV4aXRJbnZlc3RBbG9uZ1R1cm5PdmVyX0ludmVzdFNldHVwVUkiLCJUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSSIsIkVuYWJsZUJ1eU9yU2VsbF9CdXlPclNlbGxTZXR1cFVJIiwiU2V0QnV5T3JTZWxsVUlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSIsIkV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkiLCJUb2dnbGVEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkiLCJUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIlNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiX215RGF0YSIsIl9hY3RvcnNEYXRhIiwiX2lzVHVybk92ZXIiLCJfbW9kZUluZGV4IiwiUm9vbUVzc2VudGlhbHMiLCJJc1NwZWN0YXRlIiwic2V0UGxheWVyTmFtZSIsInNldFBsYXllclVJRCIsIlJlc2V0U3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJIiwiRXhpdF9PbmVRdWVzdGlvblNldHVwVUkiLCJFeGl0QWxvbmdUdXJuT3Zlcl9PbmVRdWVzdGlvblNldHVwVUkiLCJTZXRVcERlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSSIsIl9xdWVzdGlvbiIsIm1lc3NhZ2UiLCJ0aW1lIiwiU2VsZlRvYXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBRyxJQUFsQjtBQUNBLElBQUlDLHdCQUF3QixHQUFHLElBQS9CO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsRUFBMUI7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBRyxFQUF2QjtBQUNBLElBQUlDLDhCQUE4QixHQUFHLEVBQXJDO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLElBQXRCO0FBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsS0FBL0I7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEIsRUFDQTs7QUFDQSxJQUFJQyxjQUFjLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUUsQ0FEcUI7QUFFM0JDLEVBQUFBLFdBQVcsRUFBRSxLQUZjO0FBRzNCQyxFQUFBQSxhQUFhLEVB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OEI7QUFvbUUvQjtBQUVBMVAsRUFBQUEsU0FBUyxFQUFFLG1CQUFVMlAsT0FBVixFQUFtQkMsSUFBbkIsRUFBZ0M7QUFBQSxRQUFiQSxJQUFhO0FBQWJBLE1BQUFBLElBQWEsR0FBTixJQUFNO0FBQUE7O0FBQ3pDLFNBQUtuVixPQUFMLENBQWE4QixNQUFiLEdBQXNCLElBQXRCO0FBQ0EsU0FBSzdCLFlBQUwsQ0FBa0JuRyxNQUFsQixHQUEyQm9iLE9BQTNCO0FBQ0EsUUFBSUUsU0FBUyxHQUFHLElBQWhCO0FBQ0E3UyxJQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNyQjZTLE1BQUFBLFNBQVMsQ0FBQ3BWLE9BQVYsQ0FBa0I4QixNQUFsQixHQUEyQixLQUEzQjtBQUNELEtBRlMsRUFFUHFULElBRk8sQ0FBVjtBQUdEO0FBN21FOEIsQ0FBVCxDQUF4QiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdhbWVNYW5hZ2VyID0gbnVsbDtcclxudmFyIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IG51bGw7XHJcbnZhciBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbnZhciBvbmVRdWVzdGlvbk5vZGVzID0gW107XHJcbnZhciBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxudmFyIFBhcnRuZXJTaGlwRGF0YSA9IG51bGw7XHJcbnZhciBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSBmYWxzZTtcclxudmFyIENhbmNlbGxlZElEID0gW107XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVudW1lcmF0aW9uIGZvciBhbW91bnQgb2YgbG9hbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgTG9hbkFtb3VudEVudW0gPSBjYy5FbnVtKHtcclxuICBOb25lOiAwLFxyXG4gIFRlblRob3VzYW5kOiAxMDAwMCxcclxuICBUZW50eVRob3VzYW5kOiAyMDAwMCxcclxuICBUaGlydHlUaG91c2FuZDogMzAwMDAsXHJcbiAgRm9ydHlUaG91c2FuZDogNDAwMDAsXHJcbiAgRmlmdHlUaG91c2FuZDogNTAwMDAsXHJcbiAgT3RoZXI6IDYsXHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEJ1c2luZXNzU2V0dXBVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1c2luZXNzU2V0dXBVSVwiLFxyXG5cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBQbGF5ZXJOYW1lVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIG5hbWVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJDYXNoVUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyQ2FzaFVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBmb3IgcGxheWVyIGNhc2hcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVUZXh0VUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlVGV4dFVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgIHRvb2x0aXA6IFwidmFyIHRvIHN0b3JlIHRleHQgZm9yIGJ1c2luZXNzIHR5cGVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc05hbWVUZXh0VUk6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnVzaW5lc3NUeXBlVGV4dFVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLlRleHQsXHJcbiAgICAgIGRlZmF1bHQ6IFwiXCIsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgIHRvb2x0aXA6IFwidmFyIHRvIHN0b3JlIHRleHQgZm9yIGJ1c2luZXNzIG5hbWVcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc1R5cGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc1R5cGVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIGZvciBidXNpbmVzcyB0eXBlIGVkaXRib3hcIixcclxuICAgIH0sXHJcbiAgICBCdXNpbmVzc05hbWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXNpbmVzc05hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlY2UgZm9yIGJ1c2luZXNzIG5hbWUgZWRpdGJveFwiLFxyXG4gICAgfSxcclxuICAgIEhvbWVCYXNlZE5vZGVVSToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJIb21lQmFzZWROb2RlVUlcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSBvZiB0aGUgbm9kZSBmb3IgaG9tZSBiYXNlZCBidXNpbmVzc1wiLFxyXG4gICAgfSxcclxuICAgIEJyaWNrQW5kTW9ydGFyTm9kZVVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJyaWNrQW5kTW9ydGFyTm9kZVVJXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGJyaWNrIGFuZCBtb3J0YXIgYnVzaW5lc3NcIixcclxuICAgIH0sXHJcbiAgICBUaW1lclVJOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpbWVyVUlcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIGxhYmVsIGZvciB0aW1lclwiLFxyXG4gICAgfSxcclxuICAgIFRpbWVyTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaW1lck5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgdGltZXIgbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICAgIEJ1c2luZXNzU2V0dXBOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzU2V0dXBOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hblNldHVwTm9kZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJMb2FuU2V0dXBOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2Ugb2YgdGhlIG5vZGUgZm9yIGxvYW4gc2V0dXBcIixcclxuICAgIH0sXHJcbiAgICBMb2FuQW1vdW50OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRcIixcclxuICAgICAgdHlwZTogTG9hbkFtb3VudEVudW0sXHJcbiAgICAgIGRlZmF1bHQ6IExvYW5BbW91bnRFbnVtLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJsb2FuIGFtb3VudCB0YWtlbiBieSBwbGF5ZXIgKHN0YXRlIG1hY2hpbmUpXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5BbW91bnRMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBhbGwgbGFiZWxzIG9mIGFtb3VudHMgaW4gbG9hbiBVSVwiLFxyXG4gICAgfSxcclxuICAgIFdhaXRpbmdTdGF0dXNOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTdGF0dXNOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHdhaXRpbmcgc3RhdHVzIHNjcmVlbiBvbiBpbml0aWFsIGJ1c2luZXNzIHNldHVwXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbk5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvbk5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlJlZmVyZW5jZSBmb3IgZXhpdCBidXR0b24gbm9kZSBpbiBidXNpbmVzcyBzZXR1cFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3IvL1xyXG4gIH0sXHJcblxyXG4gIENoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuUGxheWVyTmFtZVVJLnN0cmluZyA9IG5hbWU7XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgQnVzaW5lc3MgU2V0dXAgVUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFR1cm5EZWNpc2lvblNldHVwVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJUdXJuRGVjaXNpb25TZXR1cFVJXCIsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIE1hcmtldGluZ0VkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTWFya2V0aW5nRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIG1hcmtldGluZyBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgR29sZEVkaXRCb3g6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiR29sZEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgZWRpdGJveCBvZiBpbnZlc3QgZ29sZCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU3RvY2tFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlN0b2NrRWRpdEJveFwiLFxyXG4gICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBlZGl0Ym94IG9mIGludmVzdCBzdG9jayBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQ2FzaEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gY2FzaCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhwYW5kQnVzaW5lc3NOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4cGFuZEJ1c2luZXNzTm9kZVwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiUmVmZXJlbmNlIGZvciBleHBuYWQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4cGFuZEJ1c2luZXNzU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1Njcm9sbENvbnRlbnRcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiUmVmZXJlbmNlIGZvciBjb250ZW50IG5vZGUgb2Ygc2Nyb2xsIHZpZXcgb2YgZXhwYW5kIGJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeHBhbmRCdXNpbmVzc1ByZWZhYjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeHBhbmRCdXNpbmVzc1ByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJSZWZlcmVuY2UgZm9yIHByZWZhYiBvZiBleHBhbmQgYnVzaW5lc3Mgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG5cclxuICBDaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLlBsYXllck5hbWVVSS5zdHJpbmcgPSBuYW1lO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZW51bWVyYXRpb24gZm9yIGludmVzdG1lbnQvYnV5IGFuZCBzZWxsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RFbnVtID0gY2MuRW51bSh7XHJcbiAgTm9uZTogMCxcclxuICBTdG9ja0ludmVzdDogMSxcclxuICBHb2xkSW52ZXN0OiAyLFxyXG4gIFN0b2NrU2VsbDogMyxcclxuICBHb2xkU2VsbDogNCxcclxuICBPdGhlcjogNSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0U2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBJbnZlc3RTZWxsVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJJbnZlc3RTZWxsVUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGljZVJlc3VsdExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRpY2VSZXN1bHRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIERpY2UgUmVzdWx0IG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQcmljZVRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUHJpY2VUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUHJpY2UgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFByaWNlVmFsdWVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQcmljZVZhbHVlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBQcmljZSB2YWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnV5T3JTZWxsVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJCdXlPclNlbGxUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBCdXlPclNlbGwgVGl0bGUgb2YgaW52ZXN0JnNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFRvdGFsQW1vdW50VGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUb3RhbEFtb3VudFRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6XHJcbiAgICAgICAgXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IFRpdGxlIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudFZhbHVlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxBbW91bnRWYWx1ZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEFtb3VudCBWYWx1ZSBvZiBpbnZlc3Qmc2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnV0dG9uTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1dHRvbk5hbWVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGJ1dHRvbiBuYW1lIG9mIGludmVzdCZzZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTdGF0ZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJJbnZlc3RTdGF0ZVwiLFxyXG4gICAgICB0eXBlOiBJbnZlc3RFbnVtLFxyXG4gICAgICBkZWZhdWx0OiBJbnZlc3RFbnVtLk5vbmUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBBbW91bnRFZGl0Qm94OiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkFtb3VudEVkaXRCb3hcIixcclxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBTZWxsQnVzaW5lc3NVSS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG52YXIgU2VsbEJ1c2luZXNzVUkgPSBjYy5DbGFzcyh7XHJcbiAgbmFtZTogXCJTZWxsQnVzaW5lc3NVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NDb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzQ291bnRcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJ1c2luZXNzQ291bnQgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsQ29udGVudE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgU2Nyb2xsQ29udGVudE5vZGUgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZWxsUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkJ1c2luZXNzU2VsbFByZWZhYlwiLFxyXG4gICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBCdXNpbmVzc1NlbGxQcmVmYWIgb2YgU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIFNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgUGF5RGF5VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIFBheURheVVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGF5RGF5VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBQYXlEYXkgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIFBheURheSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgSG9tZUJhc2VkTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkTnVtYmVyXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBIb21lQmFzZWROdW1iZXIgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEJNTnVtYmVyTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJOdW1iZXJcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTnVtYmVyIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBCTU51bWJlckxvY2F0aW9uTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJMb2NhdGlvbnNcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEJyaWNrTW9ydGFyTG9jYXRpb25zIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBIb21lQmFzZWRCdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiSG9tZUJhc2VkQnRuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIEhvbWVCYXNlZEJ0biBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgQk1CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQnJpY2tNb3J0YXJCdG5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgQnJpY2tNb3J0YXJCdG4gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIExvYW5CdG46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiTG9hbkJ0blwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBMb2FuQnRuIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBNYWluUGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIk1haW5QYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTWFpblBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBSZXN1bHRQYW5lbE5vZGU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUmVzdWx0UGFuZWxOb2RlXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFJlc3VsdFBhbmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBMb2FuUmVzdWx0UGFuZWxOb2RlOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5SZXN1bHRQYW5lbE5vZGVcIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hblJlc3VsdFBhbmVsTm9kZSBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUmVzdWx0U2NyZWVuVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJSZXN1bHRTY3JlZW5UaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgUmVzdWx0U2NyZWVuVGl0bGUgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERpY2VSZXN1bHRMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEaWNlUmVzdWx0XCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBEaWNlUmVzdWx0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEJ1c2luZXNzTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVG90YWxCdXNpbmVzc0xhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBUb3RhbEJ1c2luZXNzIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUb3RhbEFtb3VudExhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRvdGFsQW1vdW50TGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIFRvdGFsQW1vdW50IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBTa2lwTG9hbkJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTa2lwTG9hbkJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBTa2lwTG9hbkJ1dHRvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgTG9hbkZvdHRlckxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkxvYW5Gb3R0ZXJMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgTG9hbkZvdHRlckxhYmVsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1jbGFzcyBmb3IgSW52ZXN0VUktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxudmFyIEludmVzdFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiSW52ZXN0VUlcIixcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBUaXRsZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlRpdGxlXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIENhc2hMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJDYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgSW52ZXN0IG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIEV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRXhpdEJ1dHRvblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgRXhpdEJ1dHRvbiBvZiBJbnZlc3Qgbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIFR1cm5PdmVyRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUdXJuT3ZlckV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgb2YgVHVybk92ZXJFeGl0QnV0dG9uIG9mIEludmVzdCBub2RlXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEJ1eU9yU2VsbFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBCdXlPclNlbGxVSSA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiBcIkJ1eU9yU2VsbFVJXCIsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgVGl0bGVMYWJlbDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJUaXRsZVwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgdGl0bGUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIEJ1eU9yU2VsbCBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIlBsYXllck5hbWVMYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbGFiZWwgb2YgcGxheWVyIG5hbWUgb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBFeGl0QnV0dG9uOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkV4aXRCdXR0b25cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIEV4aXRCdXR0b24gb2YgQnV5T3JTZWxsIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBCdXlPclNlbGwgbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBPbmVRdWVzdGlvblVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBPbmVRdWVzdGlvblVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiT25lUXVlc3Rpb25VSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHRpdGxlIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBDYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiQ2FzaExhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBjYXNoIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBQbGF5ZXJOYW1lTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRXhpdEJ1dHRvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBvZiBFeGl0QnV0dG9uIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBUdXJuT3ZlckV4aXRCdXR0b246IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVHVybk92ZXJFeGl0QnV0dG9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDpcclxuICAgICAgICBcIlVJIHJlZmVyZW5jZSB0byB0aGUgcHJlZmFiIG9mIFR1cm5PdmVyRXhpdEJ1dHRvbiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyRGV0YWlsTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGxheWVyRGV0YWlsTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIHBsYXllciBuYW1lIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZXRhaWxzUHJlZmFiOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRldGFpbHNQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBwcmVmYWIgRGV0YWlsc1ByZWZhYiBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIHByZWZhYiBTY3JvbGxDb250ZW50IG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBXYWl0aW5nU2NyZWVuOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIldhaXRpbmdTY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIlVJIHJlZmVyZW5jZSB0byB0aGUgbm9kZSBXYWl0aW5nU2NyZWVuIG9mIE9uZVF1ZXN0aW9uIG5vZGVcIixcclxuICAgIH0sXHJcbiAgICBEZWNpc2lvblRpdGxlTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25UaXRsZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiB0aXRsZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25DYXNoTGFiZWw6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25DYXNoTGFiZWxcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJVSSByZWZlcmVuY2UgdG8gdGhlIGxhYmVsIG9mIGNhc2ggb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICAgIERlY2lzaW9uUGxheWVyTmFtZUxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUGxheWVyTmFtZUxhYmVsXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgbmFtZSBvZiBPbmVRdWVzdGlvbiBub2RlXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25RdWVzdGlvbkxhYmVsOiB7XHJcbiAgICAgIGRpc3BsYXlOYW1lOiBcIkRlY2lzaW9uUXVlc3Rpb25MYWJlbFwiLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOlxyXG4gICAgICAgIFwiVUkgcmVmZXJlbmNlIHRvIHRoZSBsYWJlbCBvZiBwbGF5ZXIgcXVlc3Rpb24gb2YgT25lUXVlc3Rpb24gbm9kZVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vY29uc3RydWN0b3JcclxuICB9LFxyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWNsYXNzIGZvciBQYXJ0bmVyc2hpcFVJLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQYXJ0bmVyc2hpcFVJID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiUGFydG5lcnNoaXBVSVwiLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIFdhaXRpbmdTdGF0dXNTY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiV2FpdGluZ1N0YXR1c1NjcmVlblwiLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiVUkgcmVmZXJlbmNlIG9mIHRoZSB3YWl0aW5nIHNjcmVlbiBub2RlIG9mIHBhcnRuZXJzaGlwIHVpXCIsXHJcbiAgICB9LFxyXG4gICAgTWFpblNjcmVlbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJNYWluU2NyZWVuXCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBUaXRsZU5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiVGl0bGVOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyTmFtZToge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJQbGF5ZXJDYXNoXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgUGFydG5lclNoaXBQcmVmYWI6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiUGFydG5lclNoaXBQcmVmYWJcIixcclxuICAgICAgdHlwZTogY2MuUHJlZmFiLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgU2Nyb2xsQ29udGVudDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGxDb250ZW50XCIsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25TY3JlZW5cIixcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBEZWNpc2lvblBsYXllck5hbWU6IHtcclxuICAgICAgZGlzcGxheU5hbWU6IFwiRGVjaXNpb25QbGF5ZXJOYW1lXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIERlY2lzaW9uUGxheWVyQ2FzaDoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvblBsYXllckNhc2hcIixcclxuICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgRGVjaXNpb25EZXNjcmlwdGlvbjoge1xyXG4gICAgICBkaXNwbGF5TmFtZTogXCJEZWNpc2lvbkRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gIH0sXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY2xhc3MgZm9yIEdhbWVwbGF5VUlNYW5hZ2VyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcbnZhciBQbGF5ZXJEYXRhSW50YW5jZTtcclxudmFyIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2U7XHJcbnZhciBSZXF1aXJlZENhc2g7XHJcbnZhciBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xOyAvLy0xIG1lYW5zIG5ldyBidXNpbmVzcyBpcyBub3QgaW5zdGFudGlhbHRlZCBmcm9tIGluc2lkZSBnYW1lICwgaWYgaXQgaGFzIGFueSBvdGhlciB2YWx1ZSBpdCBtZWFucyBpdHMgYmVlbiBpbnN0YW50aWF0ZWQgZnJvbSBpbnNpZGUgZ2FtZSBhbmQgaXRzIHZhbHVlIHJlcHJlc2VudHMgaW5kZXggb2YgcGxheWVyXHJcblxyXG4vL3R1cm4gZGVjaXNpb25zXHJcbnZhciBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxudmFyIFRlbXBIaXJpbmdMYXd5ZXI7XHJcblxyXG4vL2J1eW9yc2VsbFxyXG52YXIgR29sZENhc2hBbW91bnQgPSBcIlwiO1xyXG52YXIgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxudmFyIFN0b2NrQnVzaW5lc3NOYW1lID0gXCJcIjtcclxudmFyIERpY2VSZXN1bHQ7XHJcbnZhciBPbmNlT3JTaGFyZTtcclxudmFyIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcblxyXG52YXIgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG52YXIgQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkID0gZmFsc2U7XHJcbnZhciBMb2FuUGF5ZWQgPSBmYWxzZTtcclxudmFyIFRvdGFsUGF5RGF5QW1vdW50ID0gMDtcclxudmFyIERvdWJsZVBheURheSA9IGZhbHNlO1xyXG5cclxudmFyIEdhbWVwbGF5VUlNYW5hZ2VyID0gY2MuQ2xhc3Moe1xyXG4gIG5hbWU6IFwiR2FtZXBsYXlVSU1hbmFnZXJcIixcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgQnVzaW5lc3NTZXR1cERhdGE6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogQnVzaW5lc3NTZXR1cFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1c2luZXNzU2V0dXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFR1cm5EZWNpc2lvblNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogVHVybkRlY2lzaW9uU2V0dXBVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBUdXJuRGVjaXNpb25TZXR1cFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgSW52ZXN0U2VsbFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogSW52ZXN0U2VsbFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEludmVzdFNlbGxVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBheURheVNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogUGF5RGF5VUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgSW52ZXN0U2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2V0dXBVSToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgdHlwZTogU2VsbEJ1c2luZXNzVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgU2VsbEJ1c2luZXNzVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBJbnZlc3RVSSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcInJlZmVyZW5jZSBvZiBJbnZlc3RVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIEJ1eU9yU2VsbFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IEJ1eU9yU2VsbFVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIEJ1eU9yU2VsbFVJIGNsYXNzXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TZXR1cFVJOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICB0eXBlOiBPbmVRdWVzdGlvblVJLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwicmVmZXJlbmNlIG9mIE9uZVF1ZXN0aW9uVUkgY2xhc3NcIixcclxuICAgIH0sXHJcbiAgICBQYXJ0bmVyc2hpcFNldHVwVUk6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHR5cGU6IFBhcnRuZXJzaGlwVUksXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJyZWZlcmVuY2Ugb2YgUGFydG5lcnNoaXBVSSBjbGFzc1wiLFxyXG4gICAgfSxcclxuICAgIFBvcFVwVUk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgUG9wVXBVSUxhYmVsOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBwb3AgdXAgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgQnVzaW5lc3NTZXR1cE5vZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBidXNpbmVzcyBzZXR1cCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBHYW1lcGxheVVJU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgZ2FtZXBsYXkgdWkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgRGVjaXNpb25TY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBEZWNpc2lvbiBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBJbnZlc3RTZWxsU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgSW52ZXN0ICYgc2VsbCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBQYXlEYXlTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBQYXlEYXkgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgU2VsbEJ1c2luZXNzU2NyZWVuOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgICAgdG9vbHRpcDogXCJOb2RlIHJlZmVyZW5jZSBmb3IgU2VsbEJ1c2luZXNzIHNjcmVlblwiLFxyXG4gICAgfSxcclxuICAgIEludmVzdFNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIEludmVzdCBzY3JlZW5cIixcclxuICAgIH0sXHJcbiAgICBCdXlPclNlbGxTY3JlZW46IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgc2VyaWFsaXphYmxlOiB0cnVlLFxyXG4gICAgICB0b29sdGlwOiBcIk5vZGUgcmVmZXJlbmNlIGZvciBCdXlPclNlbGwgc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25TcGFjZVNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uU3BhY2Ugc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbjoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwiTm9kZSByZWZlcmVuY2UgZm9yIE9uZVF1ZXN0aW9uRGVjaXNpb24gc2NyZWVuXCIsXHJcbiAgICB9LFxyXG4gICAgVGVtcERpY2VUZXh0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxyXG4gICAgICBzZXJpYWxpemFibGU6IHRydWUsXHJcbiAgICAgIHRvb2x0aXA6IFwibGFiZWwgcmVmZXJlbmNlIGZvciBkaWNlXCIsXHJcbiAgICB9LFxyXG4gICAgTGVhdmVSb29tQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuXHJcbiAgICAvL2xvY2FsIHZhcmlhYmxlc1xyXG4gICAgdGhpcy5Hb2xkSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuR29sZFNvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tJbnZlc3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5TdG9ja1NvbGQgPSBmYWxzZTtcclxuICAgIHRoaXMuSXNCb3RUdXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5CYW5rcnVwdGVkQW1vdW50ID0gMDtcclxuICB9LFxyXG5cclxuICBSZXNldFR1cm5WYXJpYWJsZSgpIHtcclxuICAgIHRoaXMuR29sZEludmVzdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLkdvbGRTb2xkID0gZmFsc2U7XHJcbiAgICB0aGlzLlN0b2NrSW52ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuU3RvY2tTb2xkID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgQ2hlY2tSZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCFHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIgfHwgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyID09IG51bGwpXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXJcIik7XHJcblxyXG4gICAgaWYgKCFHYW1lTWFuYWdlciB8fCBHYW1lTWFuYWdlciA9PSBudWxsKVxyXG4gICAgICBHYW1lTWFuYWdlciA9IHJlcXVpcmUoXCJHYW1lTWFuYWdlclwiKTtcclxuICB9LFxyXG5cclxuICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9ldmVudHMgc3Vic2NyaXB0aW9uIHRvIGJlIGNhbGxlZFxyXG4gICAgY2Muc3lzdGVtRXZlbnQub24oXCJTeW5jRGF0YVwiLCB0aGlzLlN5bmNEYXRhLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihcIlN5bmNEYXRhXCIsIHRoaXMuU3luY0RhdGEsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIC8vI3JlZ2lvbiBTcGVjdGF0ZSBVSSBTZXR1cFxyXG4gIEluaXRpYWxTY3JlZW5fU3BlY3RhdGVNb2RlKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIENsb3NlSW5pdGlhbFNjcmVlbl9TcGVjdGF0ZU1vZGUoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcblxyXG4gIFRvZ2dsZUxlYXZlUm9vbUJ1dHRvbl9TcGVjdGF0ZU1vZGVVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuTGVhdmVSb29tQnV0dG9uLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBPbkxlYXZlQnV0dG9uQ2xpY2tlZF9TcGVjdGF0ZU1vZGVVSSgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuVG9nZ2xlTGVhdmVSb29tX0Jvb2woXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkRpc2Nvbm5lY3RQaG90b24oKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuQ2xlYXJEaXNwbGF5VGltZW91dCgpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJTeW5jTWFuYWdlcigpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfU2VydmVyQmFja2VuZCgpLlJlbW92ZVBlcnNpc3ROb2RlKCk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5SZW1vdmVQZXJzaXN0Tm9kZSgpO1xyXG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJTcGxhc2hcIik7XHJcbiAgICB9LCA1MDApO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXNpbmVzc1NldHVwIHdpdGggbG9hblxyXG4gIC8vQnVzaW5lc3Mgc2V0dXAgdWkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIFN0YXJ0TmV3QnVzaW5lc3NfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFxyXG4gICAgaXNGaXJzdFRpbWUsXHJcbiAgICBpbnNpZGVHYW1lID0gZmFsc2UsXHJcbiAgICBtb2RlSW5kZXggPSAwLFxyXG4gICAgX2lzQmFua3J1cHRlZCA9IGZhbHNlLFxyXG4gICAgX0JhbmtydXB0QW1vdW50ID0gMFxyXG4gICkge1xyXG4gICAgLy9jYWxsZWQgZmlyc3QgdGltZSBmb3JtIEdhbWVNYW5hZ2VyIG9ubG9hZCBmdW5jdGlvblxyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLklzQmFua3J1cHRlZCA9IF9pc0JhbmtydXB0ZWQ7XHJcbiAgICB0aGlzLkJhbmtydXB0ZWRBbW91bnQgPSBfQmFua3J1cHRBbW91bnQ7XHJcblxyXG4gICAgaWYgKF9pc0JhbmtydXB0ZWQpIHRoaXMuUmVzZXRUdXJuVmFyaWFibGUoKTtcclxuXHJcbiAgICB0aGlzLkluaXRfQnVzaW5lc3NTZXR1cChpc0ZpcnN0VGltZSwgaW5zaWRlR2FtZSwgbW9kZUluZGV4LCBfaXNCYW5rcnVwdGVkKTtcclxuICB9LFxyXG4gIEluaXRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKFxyXG4gICAgaXNGaXJzdFRpbWUsXHJcbiAgICBpbnNpZGVHYW1lID0gZmFsc2UsXHJcbiAgICBtb2RlSW5kZXggPSAwLFxyXG4gICAgX2lzQmFua3J1cHRlZCA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IG5ldyBHYW1lTWFuYWdlci5QbGF5ZXJEYXRhKCk7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlID0gbmV3IEdhbWVNYW5hZ2VyLkJ1c2luZXNzSW5mbygpO1xyXG5cclxuICAgIGlmIChpc0ZpcnN0VGltZSkge1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkV4aXRCdXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gMjAwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5SZXNldEJ1dHRvblN0YXRlc19CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgaWYgKGluc2lkZUdhbWUpIHtcclxuICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5FeGl0QnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlRpbWVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGZvciAoXHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBpbmRleCA8XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvXHJcbiAgICAgICAgICAubGVuZ3RoO1xyXG4gICAgICAgIGluZGV4KytcclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGFcclxuICAgICAgICAgICAgLnVzZXJJRCA9PVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBpbmRleFxyXG4gICAgICAgICAgXS5QbGF5ZXJVSURcclxuICAgICAgICApIHtcclxuICAgICAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gaW5kZXg7XHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKVxyXG4gICAgICAgICAgICAuUGxheWVyR2FtZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgdGhpcy5PbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cChcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIGluZGV4XHJcbiAgICAgICAgICAgIF0uUGxheWVyTmFtZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMuT25DaGFuZ2VVSURfQnVzaW5lc3NTZXR1cChcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIGluZGV4XHJcbiAgICAgICAgICAgIF0uUGxheWVyVUlEXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5PbkNoYW5nZUNhc2hfQnVzaW5lc3NTZXR1cChcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIGluZGV4XHJcbiAgICAgICAgICAgIF0uQ2FzaFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEluc2lkZUdhbWVCdXNpbmVzc1NldHVwID0gLTE7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VOYW1lX0J1c2luZXNzU2V0dXAoXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEubmFtZVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLk9uQ2hhbmdlVUlEX0J1c2luZXNzU2V0dXAoXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9TZXJ2ZXJCYWNrZW5kKCkuU3R1ZGVudERhdGEudXNlcklEXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBHZXRPYmpfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuQnVzaW5lc3NTZXR1cERhdGE7XHJcbiAgfSxcclxuICBPbkNoYW5nZU5hbWVfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQ2hhbmdlTmFtZV9CdXNpbmVzc1NldHVwKG5hbWUpO1xyXG4gICAgUGxheWVyRGF0YUludGFuY2UuUGxheWVyTmFtZSA9IG5hbWU7XHJcbiAgfSxcclxuICBPbkNoYW5nZVVJRF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoVUlEKSB7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5QbGF5ZXJVSUQgPSBVSUQ7XHJcbiAgfSxcclxuICBPbkJ1c2luZXNzVHlwZVRleHRDaGFuZ2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkJ1c2luZXNzVHlwZVRleHRVSSA9IG5hbWU7XHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZURlc2NyaXB0aW9uID0gbmFtZTtcclxuICB9LFxyXG4gIE9uQnVzaW5lc3NOYW1lVGV4dENoYW5nZWRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lVGV4dFVJID0gbmFtZTtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NOYW1lID0gbmFtZTtcclxuICB9LFxyXG4gIFJlc2V0QnV0dG9uU3RhdGVzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NOYW1lVGV4dFVJID0gXCJcIjtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuQnVzaW5lc3NUeXBlVGV4dFVJID0gXCJcIjtcclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID0gR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5ub25lO1xyXG4gIH0sXHJcbiAgT25Ib21lQmFzZWRTZWxlY3RlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkhvbWVCYXNlZE5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9XHJcbiAgICAgIEdhbWVNYW5hZ2VyLkVudW1CdXNpbmVzc1R5cGUuSG9tZUJhc2VkO1xyXG4gIH0sXHJcbiAgT25Ccmlja01vcnRhclNlbGVjdGVkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuSG9tZUJhc2VkTm9kZVVJLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Ccmlja0FuZE1vcnRhck5vZGVVSS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID1cclxuICAgICAgR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhcjtcclxuICB9LFxyXG4gIE9uQ2hhbmdlQ2FzaF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLlBsYXllckNhc2hVSS5zdHJpbmcgPSBcIiRcIiArIGFtb3VudDtcclxuICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBhbW91bnQ7XHJcbiAgfSxcclxuICBDYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChhbW91bnQpIHtcclxuICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICB2YXIgX2J1c2luZXNzSW5kZXggPSAwO1xyXG5cclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgIGluZGV4IDwgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzLmxlbmd0aDtcclxuICAgICAgaW5kZXgrK1xyXG4gICAgKSB7XHJcbiAgICAgIGlmIChQbGF5ZXJEYXRhSW50YW5jZS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5UYWtlbikge1xyXG4gICAgICAgIF9sb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2xvYW5UYWtlbikge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICBcIllvdSBoYXZlIGFscmVhZHkgdGFrZW4gbG9hbiBvZiAkXCIgK1xyXG4gICAgICAgICAgUGxheWVyRGF0YUludGFuY2UuTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCA+PSBhbW91bnQpIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICAgIFwiWW91IGRvIG5vdCBuZWVkIGxvYW4sIHlvdSBoYXZlIGVub3VnaCBjYXNoIHRvIGJ1eSBjdXJyZW50IHNlbGVjdGVkIGJ1c2luZXNzLlwiXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5TZXR1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBSZXF1aXJlZENhc2ggPSBNYXRoLmFicyhwYXJzZUludChQbGF5ZXJEYXRhSW50YW5jZS5DYXNoKSAtIGFtb3VudCk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgICAgY2MuTGFiZWxcclxuICAgICAgICApLnN0cmluZyA9IFwiJFwiICsgUmVxdWlyZWRDYXNoO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBPbkxvYW5CdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKFxyXG4gICAgICBQbGF5ZXJCdXNpbmVzc0RhdGFJbnRhbmNlLkJ1c2luZXNzVHlwZSA9PVxyXG4gICAgICBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLmJyaWNrQW5kbW9ydGFyXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5DYWxjdWxhdGVMb2FuX0J1c2luZXNzU2V0dXAoNTAwMDApO1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT1cclxuICAgICAgR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5Ib21lQmFzZWRcclxuICAgICkge1xyXG4gICAgICB0aGlzLkNhbGN1bGF0ZUxvYW5fQnVzaW5lc3NTZXR1cCgxMDAwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICBcInBsZWFzZSBzZWxlY3QgYnVzaW5lc3MgYmV0d2VlbiBIb21lIEJhc2VkIGFuZCBicmljayAmIG1vcnRhci4gXCJcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkJhY2tCdXR0b25DbGlja2VkX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuU2V0dXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gIH0sXHJcbiAgSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGluZGV4ID09IGkpXHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50TGFiZWxbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgZWxzZSB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnRMYWJlbFtpXS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG4gIE9uTG9hbkFtb3VudENob29zZWRfMDFfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPSBMb2FuQW1vdW50RW51bS5PdGhlcjtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDApO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wMl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRlblRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMSk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzAzX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uVGVudHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDIpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLlRoaXJ0eVRob3VzYW5kO1xyXG4gICAgdGhpcy5IaWdoTGlnaHRMb2FuU2VsZWN0aW9uX0J1c2luZXNzU2V0dXAoMyk7XHJcbiAgfSxcclxuICBPbkxvYW5BbW91bnRDaG9vc2VkXzA1X0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50ID0gTG9hbkFtb3VudEVudW0uRm9ydHlUaG91c2FuZDtcclxuICAgIHRoaXMuSGlnaExpZ2h0TG9hblNlbGVjdGlvbl9CdXNpbmVzc1NldHVwKDQpO1xyXG4gIH0sXHJcbiAgT25Mb2FuQW1vdW50Q2hvb3NlZF8wNl9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuTG9hbkFtb3VudCA9IExvYW5BbW91bnRFbnVtLkZpZnR5VGhvdXNhbmQ7XHJcbiAgICB0aGlzLkhpZ2hMaWdodExvYW5TZWxlY3Rpb25fQnVzaW5lc3NTZXR1cCg1KTtcclxuICB9LFxyXG4gIE9uVGFrZW5Mb2FuQ2xpY2tlZF9CdXNpbmVzc1NldHVwOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLkxvYW5BbW91bnQgPT0gTG9hbkFtb3VudEVudW0uT3RoZXIpXHJcbiAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudCA9IFJlcXVpcmVkQ2FzaDtcclxuICAgIGVsc2VcclxuICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gcGFyc2VJbnQoXHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5Mb2FuQW1vdW50XHJcbiAgICAgICk7XHJcblxyXG4gICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4gPSB0cnVlO1xyXG4gICAgdGhpcy5PbkxvYW5CYWNrQnV0dG9uQ2xpY2tlZF9CdXNpbmVzc1NldHVwKCk7XHJcbiAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID1cclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCArIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgIHRoaXMuT25DaGFuZ2VDYXNoX0J1c2luZXNzU2V0dXAoUGxheWVyRGF0YUludGFuY2UuQ2FzaCk7XHJcbiAgfSxcclxuXHJcbiAgU3luY0RhdGE6IGZ1bmN0aW9uIChfZGF0YSwgX0lEKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIF9JRCAhPVxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLlBob3RvbkFjdG9yKClcclxuICAgICAgICAuYWN0b3JOclxyXG4gICAgKVxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChcclxuICAgICAgICBfZGF0YVxyXG4gICAgICApO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9cclxuICAgICk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9cclxuICAgICAgICAubGVuZ3RoID49XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuTWF4UGxheWVyc1xyXG4gICAgKSB7XHJcbiAgICAgIC8vc2V0dGluZyByb29tIHByb3BlcnR5IHRvIGRlY2xhcmUgaW5pdGlhbCBzZXR1cCBoYXMgYmVlblxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpXHJcbiAgICAgICAgLmdldFBob3RvblJlZigpXHJcbiAgICAgICAgLm15Um9vbSgpXHJcbiAgICAgICAgLnNldEN1c3RvbVByb3BlcnR5KFwiSW5pdGlhbFNldHVwXCIsIHRydWUsIHRydWUpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpXHJcbiAgICAgICAgLmdldFBob3RvblJlZigpXHJcbiAgICAgICAgLm15Um9vbSgpXHJcbiAgICAgICAgLnNldEN1c3RvbVByb3BlcnR5KFxyXG4gICAgICAgICAgXCJQbGF5ZXJHYW1lSW5mb1wiLFxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvLFxyXG4gICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICk7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuR2FtZXBsYXlVSVNjcmVlbi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybigpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUHVyY2hhc2VCdXNpbmVzczogZnVuY3Rpb24gKF9hbW91bnQsIF9idXNpbmVzc05hbWUsIF9pc0hvbWVCYXNlZCkge1xyXG4gICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPCBfYW1vdW50KSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgIFwiWW91IGhhdmUgbm90IGVub3VnaCBjYXNoIHRvIGJ1eSB0aGlzIFwiICsgX2J1c2luZXNzTmFtZSArIFwiIGJ1c2luZXNzLlwiXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoX2lzSG9tZUJhc2VkKSB7XHJcbiAgICAgICAgaWYgKFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCA8IDMpIHtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkNhc2ggPSBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoIC0gX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuUGxheWVyQ2FzaFVJLnN0cmluZyA9XHJcbiAgICAgICAgICAgIFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICAgIHRoaXMuU3RhcnRHYW1lID0gdHJ1ZTtcclxuICAgICAgICAgIFBsYXllckRhdGFJbnRhbmNlLkhvbWVCYXNlZEFtb3VudCsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiWW91IGNhbm5vdCBvd24gbW9yZSB0aGFuIHRocmVlIEhvbWUgYmFzZWQgYnVzaW5lc3Nlc1wiXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZS5DYXNoID0gUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIF9hbW91bnQ7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5QbGF5ZXJDYXNoVUkuc3RyaW5nID1cclxuICAgICAgICAgIFwiJFwiICsgUGxheWVyRGF0YUludGFuY2UuQ2FzaDtcclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZSA9IHRydWU7XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQnJpY2tBbmRNb3J0YXJBbW91bnQrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4pIHtcclxuICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCA9XHJcbiAgICAgICAgUGxheWVyRGF0YUludGFuY2UuQ2FzaCAtIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuTG9hbkFtb3VudDtcclxuICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJSZXZlcnRpbmcgYmFjayBsb2FuIGFtb3VudC5cIiwgNTAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBJbml0aWFsU2V0dXBfQnVzaW5lc3NTZXR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9tb2RlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5HZXRTZWxlY3RlZE1vZGUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5Jc0JhbmtydXB0ZWQpIHtcclxuICAgICAgUGxheWVyRGF0YUludGFuY2UuSXNCYW5rcnVwdCA9IHRydWU7XHJcbiAgICAgIFBsYXllckRhdGFJbnRhbmNlLkJhbmtydXB0QW1vdW50ID0gdGhpcy5CYW5rcnVwdGVkQW1vdW50O1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKVxyXG4gICAgICBdID0gUGxheWVyRGF0YUludGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ucHVzaChcclxuICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfbW9kZSA9PSAyKSB7XHJcbiAgICAgIC8vZm9yIHJlYWwgcGxheWVyc1xyXG4gICAgICAvL3NldHRpbmcgcGxheWVyIGN1cnJlbnQgZGF0YSBpbiBjdXN0b20gcHJvcGVydGllcyB3aGVuIGhpcy9oZXIgdHVybiBvdmVyc1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpXHJcbiAgICAgICAgLlBob3RvbkFjdG9yKClcclxuICAgICAgICAuc2V0Q3VzdG9tUHJvcGVydHkoXCJQbGF5ZXJTZXNzaW9uRGF0YVwiLCBQbGF5ZXJEYXRhSW50YW5jZSk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudChcclxuICAgICAgICAgIDEsXHJcbiAgICAgICAgICBQbGF5ZXJEYXRhSW50YW5jZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cERhdGEuV2FpdGluZ1N0YXR1c05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIF9kYXRhID0ge1xyXG4gICAgICAgICAgRGF0YToge1xyXG4gICAgICAgICAgICBiYW5rcnVwdGVkOiB0cnVlLFxyXG4gICAgICAgICAgICB0dXJuOiBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpLFxyXG4gICAgICAgICAgICBQbGF5ZXJEYXRhTWFpbjogUGxheWVyRGF0YUludGFuY2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudChcclxuICAgICAgICAgIDksXHJcbiAgICAgICAgICBfZGF0YVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm5BZnRlckJhbmtydXB0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoX21vZGUgPT0gMSkge1xyXG4gICAgICAvL2ZvciBBSVxyXG4gICAgICBpZiAoIXRoaXMuSXNCYW5rcnVwdGVkKSB7XHJcbiAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5CdXNpbmVzc1NldHVwRGF0YS5XYWl0aW5nU3RhdHVzTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLkdhbWVwbGF5VUlTY3JlZW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5TdGFydFR1cm4oKTtcclxuICAgICAgICB9LCAxNjAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkJ1c2luZXNzU2V0dXBEYXRhLldhaXRpbmdTdGF0dXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5HYW1lcGxheVVJU2NyZWVuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlN0YXJ0VHVybkFmdGVyQmFua3J1cHQoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIm5vIG1vZGUgc2VsZWN0ZWRcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXBcclxuICAgIF0gPSBQbGF5ZXJEYXRhSW50YW5jZTtcclxuICAgIHRoaXMuQnVzaW5lc3NTZXR1cE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBJbnNpZGVHYW1lQnVzaW5lc3NTZXR1cCA9IC0xO1xyXG4gICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24odHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgUGF5QW1vdW50VG9QbGF5R2FtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5TdGFydEdhbWUgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbiA9PSBcIlwiKVxyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInBsZWFzZSB3cml0ZSBhIGJ1c2luZXNzIHR5cGUuXCIpO1xyXG4gICAgZWxzZSBpZiAoUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc05hbWUgPT0gXCJcIilcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJwbGVhc2Ugd3JpdGUgYSBidXNpbmVzcyBuYW1lLlwiKTtcclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgUGxheWVyQnVzaW5lc3NEYXRhSW50YW5jZS5CdXNpbmVzc1R5cGUgPT1cclxuICAgICAgICBHYW1lTWFuYWdlci5FbnVtQnVzaW5lc3NUeXBlLkhvbWVCYXNlZFxyXG4gICAgICApXHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBob21lYmFzc2VkXHJcbiAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDEwMDAwLCBcImhvbWVcIiwgdHJ1ZSk7XHJcbiAgICAgIGVsc2UgaWYgKFxyXG4gICAgICAgIFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UuQnVzaW5lc3NUeXBlID09XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuRW51bUJ1c2luZXNzVHlwZS5icmlja0FuZG1vcnRhclxyXG4gICAgICApXHJcbiAgICAgICAgLy9pZiBzZWxlY3RlZCBidXNpbmVzcyBpcyBicmljayBhbmQgbW9ydGFyXHJcbiAgICAgICAgdGhpcy5QdXJjaGFzZUJ1c2luZXNzKDUwMDAwLCBcImJyaWNrIGFuZCBtb3J0YXJcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuU3RhcnRHYW1lID09IHRydWUgfHwgdGhpcy5Jc0JhbmtydXB0ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIFBsYXllckRhdGFJbnRhbmNlLk5vT2ZCdXNpbmVzcy5wdXNoKFBsYXllckJ1c2luZXNzRGF0YUludGFuY2UpO1xyXG5cclxuICAgICAgICBpZiAoSW5zaWRlR2FtZUJ1c2luZXNzU2V0dXAgIT0gLTEpXHJcbiAgICAgICAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgbm90IGJlZW4gY2FsbGVkIGZyb20gaW5zaWRlIGdhbWVcclxuICAgICAgICAgIHRoaXMuU3RhcnROZXdTZXR1cF9EdXJpbmdHYW1lX0J1c2luZXNzU2V0dXAoKTtcclxuICAgICAgICAvL2lmIHN0YXJ0IG5ldyBidXNpbmVzcyBoYXMgYmVlbiBjYWxsZWQgYXQgc3RhcnQgb2YgZ2FtZSBhcyBpbml0aWFsIHNldHVwXHJcbiAgICAgICAgZWxzZSB0aGlzLkluaXRpYWxTZXR1cF9CdXNpbmVzc1NldHVwKCk7XHJcblxyXG4gICAgICAgIC8vcHJ0aW50aW5nIGFsbCB2YWx1ZXMgdG8gY29uc29sZVxyXG4gICAgICAgIGZvciAoXHJcbiAgICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgICBpIDxcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1xyXG4gICAgICAgICAgICAubGVuZ3RoO1xyXG4gICAgICAgICAgaSsrXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgXCJwbGF5ZXIgbmFtZTogXCIgK1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKVxyXG4gICAgICAgICAgICAgICAgLlBsYXllckdhbWVJbmZvW2ldLlBsYXllck5hbWVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgXCJwbGF5ZXIgSUQ6IFwiICtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIC5QbGF5ZXJHYW1lSW5mb1tpXS5QbGF5ZXJVSURcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgXCJJcyBwbGF5ZXIgYm90OiBcIiArXHJcbiAgICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpXHJcbiAgICAgICAgICAgICAgICAuUGxheWVyR2FtZUluZm9baV0uSXNCb3RcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIG9mIGJ1c2luZXNzIG9mIHBsYXllciAoc2VlIGJlbG93KTogXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBpXHJcbiAgICAgICAgICAgIF0uTm9PZkJ1c2luZXNzXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIFwicGxheWVyIGNhc2g6IFwiICtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIC5QbGF5ZXJHYW1lSW5mb1tpXS5DYXNoXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIFwicGxheWVyIHRha2VuIGxvYW46IFwiICtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIC5QbGF5ZXJHYW1lSW5mb1tpXS5Mb2FuVGFrZW5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgXCJ0YWtlbiBsb2FuIGFtb3VudDogXCIgK1xyXG4gICAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKVxyXG4gICAgICAgICAgICAgICAgLlBsYXllckdhbWVJbmZvW2ldLkxvYW5BbW91bnRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFR1cm5EZWNpc2lvblNldHVwVUlcclxuICAvL1R1cm5EZWNpc2lvblNldHVwVUkvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIFRvZ2dsZURlY2lzaW9uX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGlzYWN0aXZlKSB7XHJcbiAgICB0aGlzLkRlY2lzaW9uU2NyZWVuLmFjdGl2ZSA9IGlzYWN0aXZlO1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gIH0sXHJcblxyXG4gIFVwZGF0ZUNhc2hfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuQ2FzaEFtb3VudExhYmVsLnN0cmluZyA9XHJcbiAgICAgIFwiJCBcIiArXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpXHJcbiAgICAgIF0uQ2FzaDtcclxuICB9LFxyXG5cclxuICBPbk1hcmtldGluZ0Ftb3VudENoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoYW1vdW50KSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKGFtb3VudCk7XHJcbiAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gYW1vdW50O1xyXG4gIH0sXHJcblxyXG4gIE9uTWFya2V0aW5nQW1vdW50U2VsZWN0ZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoVGVtcE1hcmtldGluZ0Ftb3VudCA9PSBcIlwiIHx8IFRlbXBNYXJrZXRpbmdBbW91bnQgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIlBsZWFzZSBlbnRlciBhbiBhbW91bnQuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHRoaXMubWFya2V0aW5nQW1vdW50ID0gcGFyc2VJbnQoVGVtcE1hcmtldGluZ0Ftb3VudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaFxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy9pZiBwbGF5ZXIgZW50ZXJlZCBhbW91bnQgaXMgZ3JlYXRlciB0aGFuIHRvdGFsIGNhc2ggaGUgb3duc1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5DYXNoID49IHRoaXMubWFya2V0aW5nQW1vdW50XHJcbiAgICAgICkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaCA9XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoIC0gdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5NYXJrZXRpbmdBbW91bnQgPVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uTWFya2V0aW5nQW1vdW50ICsgdGhpcy5tYXJrZXRpbmdBbW91bnQ7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICBcInlvdSBzdWNjZXNzZnVsbHkgbWFya2V0ZWQgYW1vdW50IG9mICRcIiArXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5NYXJrZXRpbmdBbW91bnQgK1xyXG4gICAgICAgICAgICBcIiAsIHJlbWFpbmluZyBjYXNoIGlzICRcIiArXHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5DYXNoICtcclxuICAgICAgICAgICAgXCIuXCJcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuXHJcbiAgICAgICAgLy9yZXNldGluZyBtYXJrZXRpbmcgbGFiZWwgYW5kIGl0cyBob2xkaW5nIHZhcmlhYmxlXHJcbiAgICAgICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLk1hcmtldGluZ0VkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBUZW1wTWFya2V0aW5nQW1vdW50ID0gXCJcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBkb24ndCBoYXZlIGVub3VnaCBtb25leS5cIik7XHJcblxyXG4gICAgICAgIC8vcmVzZXRpbmcgbWFya2V0aW5nIGxhYmVsIGFuZCBpdHMgaG9sZGluZyB2YXJpYWJsZVxyXG4gICAgICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5NYXJrZXRpbmdFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgVGVtcE1hcmtldGluZ0Ftb3VudCA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkhpcmluZ0xhd3llckJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBpZiBwbGF5ZXIgaGFzIG1vcmUgdGhhbiA1MDAwJFxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBpZiAoXHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgXS5MYXd5ZXJTdGF0dXNcclxuICAgICkge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIGFscmVhZHkgaGlyZWQgYSBsYXd5ZXIuXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uQ2FzaCA+PSA1MDAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uTGF3eWVyU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICBUZW1wSGlyaW5nTGF3eWVyID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhUZW1wSGlyaW5nTGF3eWVyKTtcclxuICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICBdLkNhc2ggPVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaCAtIDUwMDA7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICBcInlvdSBoYXZlIHN1Y2Nlc3NmdWxseSBoaXJlZCBhIGxhd3llciwgcmVtYWluaW5nIGNhc2ggaXMgJFwiICtcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLkNhc2ggK1xyXG4gICAgICAgICAgICBcIi5cIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwic29ycnksIHlvdSBkb250IGhhdmUgZW5vdWdoIG1vbmV5IHRvIGhpcmUgYSBsYXd5ZXIuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgb25Mb2NhdGlvbk5hbWVDaGFuZ2VkX0V4cGFuZEJ1c2luZXNzX1R1cm5EZWNpc2lvbihfbmFtZSkge1xyXG4gICAgTG9jYXRpb25OYW1lID0gX25hbWU7XHJcbiAgfSxcclxuICBPbkV4cGFuZEJ1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2lmIHBsYXllciBoYXMgYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyBoZSBjb3VsZCBleHBhbmQgaXRcclxuICAgIGNvbnNvbGUubG9nKFwiZXhwYW5kIGJ1c2luZXNzXCIpO1xyXG4gICAgdGhpcy5UdXJuRGVjaXNpb25TZXR1cFVJLkV4cGFuZEJ1c2luZXNzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdmFyIGdlbmVyYXRlZExlbmd0aCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZW5lcmF0ZUV4cGFuZEJ1c2luZXNzX1ByZWZhYnNfVHVybkRlY2lzaW9uKCk7XHJcblxyXG4gICAgaWYgKGdlbmVyYXRlZExlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwiWW91IGhhdmUgbm8gYnJpY2sgYW5kIG1vcnRhciBidXNpbmVzcyB0byBleHBhbmQuXCIsIDE1MDApO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuRXhwYW5kQnVzaW5lc3NOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9LCAxNjAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPbkV4cGFuZEJ1dHRvbkV4aXRDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgdGhpcy5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgIExvY2F0aW9uTmFtZSA9IFwiXCI7XHJcbiAgICBjb25zb2xlLmxvZyhcImV4cGFuZCBidXNpbmVzcyBleGl0IGNhbGxlZFwiKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5EZXN0cm95R2VuZXJhdGVkTm9kZXMoKTtcclxuICAgIHRoaXMuVHVybkRlY2lzaW9uU2V0dXBVSS5FeHBhbmRCdXNpbmVzc05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgT25OZXdCdXNpbmVzc0J1dHRvbkNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIG5ldyBidXNpbmVzc1wiKTtcclxuICAgIHRoaXMuU3RhcnROZXdCdXNpbmVzc19CdXNpbmVzc1NldHVwKGZhbHNlLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICBPbkdvbGRBbW91bnRDaGFuZ2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKGFtb3VudCkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhhbW91bnQpO1xyXG4gICAgR29sZENhc2hBbW91bnQgPSBhbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgT25Hb2xkRGljZUNsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuR29sZEludmVzdGVkKSB7XHJcbiAgICAgIHRoaXMuR29sZEludmVzdGVkID0gdHJ1ZTtcclxuICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwodHJ1ZSk7XHJcbiAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRJbnZlc3Q7XHJcbiAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgIE9uY2VPclNoYXJlID0gRGljZVJlc3VsdCAqIDEwMDA7XHJcblxyXG4gICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICBcIkludmVzdCBJbiBHT0xEXCIsXHJcbiAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICBcIkVhY2ggT3VuY2Ugb2YgR09MRCBwcmljZSBpczpcIixcclxuICAgICAgICBPbmNlT3JTaGFyZSArIFwiL291bmNlXCIsXHJcbiAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gQlVZXCIsXHJcbiAgICAgICAgXCJUb3RhbCBCdXlpbmcgQW1vdW50OlwiLFxyXG4gICAgICAgIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsXHJcbiAgICAgICAgXCJCVVlcIixcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIGdvbGQgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsIDgwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25TdG9ja0J1c2luZXNzTmFtZUNoYW5nZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgU3RvY2tCdXNpbmVzc05hbWUgPSBuYW1lO1xyXG4gIH0sXHJcblxyXG4gIE9uU3RvY2tEaWNlQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5TdG9ja0ludmVzdGVkKSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBpZiAoU3RvY2tCdXNpbmVzc05hbWUgPT0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYSBidXNpbmVzcyBuYW1lIHRvIGludmVzdC5cIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TdG9ja0ludmVzdGVkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLlN0b2NrSW52ZXN0O1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICBcIkludmVzdCBpbiBTdG9ja1wiLFxyXG4gICAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICAgIFwiRWFjaCBTaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIvc2hhcmVcIixcclxuICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gQlVZXCIsXHJcbiAgICAgICAgICBcIlRvdGFsIEJ1eWluZyBBbW91bnQ6XCIsXHJcbiAgICAgICAgICBPbmNlT3JTaGFyZSArIFwiKjA9MFwiLFxyXG4gICAgICAgICAgXCJCVVlcIixcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGVcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gaW52ZXN0IGluIHN0b2NrcyBvbmUgdGltZSBkdXJpbmcgdHVybi5cIiwgODAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblNlbGxHb2xkQ2xpY2tlZF9UdXJuRGVjaXNpb246IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5Hb2xkU29sZCkge1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgIF0uR29sZENvdW50ID4gMFxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLkdvbGRTb2xkID0gdHJ1ZTtcclxuICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKHRydWUpO1xyXG4gICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPSBJbnZlc3RFbnVtLkdvbGRTZWxsO1xyXG4gICAgICAgIERpY2VSZXN1bHQgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbFR3b0RpY2VzKCk7XHJcbiAgICAgICAgT25jZU9yU2hhcmUgPSBEaWNlUmVzdWx0ICogMTAwMDtcclxuXHJcbiAgICAgICAgdGhpcy5Bc3NpZ25EYXRhX0ludmVzdFNlbGwoXHJcbiAgICAgICAgICBcIlNlbGwgR09MRFwiLFxyXG4gICAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICAgIFwiRWFjaCBPdW5jZSBvZiBHT0xEIHByaWNlIGlzOlwiLFxyXG4gICAgICAgICAgT25jZU9yU2hhcmUgKyBcIi9vdW5jZVwiLFxyXG4gICAgICAgICAgXCJFbnRlciB0aGUgbnVtYmVyIG9mIG91bmNlIG9mIEdPTEQgeW91IHdhbnQgdG8gU0VMTFwiLFxyXG4gICAgICAgICAgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsXHJcbiAgICAgICAgICBcIlNFTExcIixcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGVcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgXCJ5b3UgaGF2ZSBub3QgcHVyY2hhc2VkIGFueSBHT0xEIG91bmNlcywgcGxlYXNlIGJ1eSB0aGVtLlwiXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJZb3UgY2FuIHNlbGwgZ29sZCBvbmUgdGltZSBkdXJpbmcgdHVybi5cIiwgODAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBPblNlbGxTdG9ja0NsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuU3RvY2tTb2xkKSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgXS5TdG9ja0NvdW50ID4gMFxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLlN0b2NrU29sZCA9IHRydWU7XHJcbiAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbCh0cnVlKTtcclxuICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkludmVzdFN0YXRlID0gSW52ZXN0RW51bS5TdG9ja1NlbGw7XHJcbiAgICAgICAgRGljZVJlc3VsdCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Sb2xsVHdvRGljZXMoKTtcclxuICAgICAgICBPbmNlT3JTaGFyZSA9IERpY2VSZXN1bHQgKiAxMDAwO1xyXG5cclxuICAgICAgICB0aGlzLkFzc2lnbkRhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICAgIFwiU2VsbCBTVE9DS1wiLFxyXG4gICAgICAgICAgRGljZVJlc3VsdCxcclxuICAgICAgICAgIFwiRWFjaCBzaGFyZSBvZiBzdG9jayBwcmljZSBpczpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIvc2hhcmVcIixcclxuICAgICAgICAgIFwiRW50ZXIgdGhlIG51bWJlciBvZiBzaGFyZXMgb2Ygc3RvY2sgeW91IHdhbnQgdG8gU0VMTFwiLFxyXG4gICAgICAgICAgXCJUb3RhbCBTZWxsaW5nIEFtb3VudDpcIixcclxuICAgICAgICAgIE9uY2VPclNoYXJlICsgXCIqMD0wXCIsXHJcbiAgICAgICAgICBcIlNFTExcIixcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGVcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgbm90IHB1cmNoYXNlZCBhbnkgc2hhcmVzLCBwbGVhc2UgYnV5IHRoZW0uXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBjYW4gc2VsbCBzdG9ja3Mgb25lIHRpbWUgZHVyaW5nIHR1cm4uXCIsIDgwMCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25QYXJ0bmVyc2hpcENsaWNrZWRfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImdvIGludG8gcGFydG5lciBzaGlwXCIpO1xyXG4gICAgLy8gdGhpcy5TaG93VG9hc3QoXCJ3b3JrIGluIHByb2dyZXNzLCBjb21pbmcgc29vbi4uLlwiKTtcclxuICAgIC8vIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHRoaXMuRW5hYmxlUGFydG5lcnNoaXBfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gIH0sXHJcblxyXG4gIE9uUm9sbERpY2VDbGlja2VkX1R1cm5EZWNpc2lvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJyb2xsIHRoZSBkaWNlXCIpO1xyXG4gICAgdGhpcy5Ub2dnbGVEZWNpc2lvbl9UdXJuRGVjaXNpb24oZmFsc2UpO1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxEaWNlKCk7XHJcbiAgfSxcclxuXHJcbiAgUHJpbnREaWNlVmFsdWVfVHVybkRlY2lzaW9uOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIC8vdGhpcy5UZW1wRGljZVRleHQuc3RyaW5nPXZhbHVlO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBQYXJ0bmVyc2hpcCBzZXR1cFxyXG4gIFRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuTWFpblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuV2FpdGluZ1N0YXR1c1NjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVQYXJ0bmVyc2hpcF9QYXJ0bmVyU2hpcFNldHVwKCkge1xyXG4gICAgQ2FuY2VsbGVkSUQgPSBbXTtcclxuICAgIHRoaXMuUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IF9tYW5hZ2VyLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIHZhciBfdGVtcERhdGEgPSBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdO1xyXG4gICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cCh0cnVlKTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBsYXllck5hbWUuc3RyaW5nID1fdGVtcERhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLlBsYXllckNhc2guc3RyaW5nID1cIiRcIitfdGVtcERhdGEuQ2FzaDtcclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgX3RlbXBEYXRhLk5vT2ZCdXNpbmVzcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5QYXJ0bmVyU2hpcFByZWZhYik7XHJcbiAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuU2Nyb2xsQ29udGVudDtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICB2YXIgX3RvdGFsTG9jYXRpb25zID0gX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzVmFsdWUoMTAwMDApO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0RmluYWxCdXNpbmVzc1ZhbHVlKDEwMDAwKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgICB2YXIgX2FsbExvY2F0aW9uc0Ftb3VudCA9IF90b3RhbExvY2F0aW9ucyAqIDI1MDAwO1xyXG4gICAgICAgIHZhciBfZmluYWxBbW91bnQgPSA1MDAwMCArIF9hbGxMb2NhdGlvbnNBbW91bnQ7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc1ZhbHVlKF9maW5hbEFtb3VudCk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRGaW5hbEJ1c2luZXNzVmFsdWUoX2ZpbmFsQW1vdW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvYW5BbW91bnQpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldExvY2F0aW9ucyhfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCk7XHJcblxyXG4gICAgICBpZiAoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uSXNQYXJ0bmVyc2hpcCA9PSB0cnVlKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbihmYWxzZSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRQYXJ0bmVyTmFtZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5QYXJ0bmVyTmFtZSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5Ub2dnbGVQYXJ0bmVyU2hpcEJ1dHRvbih0cnVlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldFBhcnRuZXJOYW1lKFwibm9uZVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEVuYWJsZVBhcnRuZXJzaGlwRGVjaXNpb25fUGFydG5lclNoaXBTZXR1cChfbXNnKSB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gX21hbmFnZXIuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5jdXN0b21Qcm9wZXJ0aWVzLlBsYXllclNlc3Npb25EYXRhO1xyXG4gICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5QYXJ0bmVyc2hpcFNldHVwVUkuRGVjaXNpb25QbGF5ZXJOYW1lLnN0cmluZyA9X3RlbXBEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLlBhcnRuZXJzaGlwU2V0dXBVSS5EZWNpc2lvblBsYXllckNhc2guc3RyaW5nID1cIiRcIitfdGVtcERhdGEuQ2FzaDtcclxuICAgIHRoaXMuUGFydG5lcnNoaXBTZXR1cFVJLkRlY2lzaW9uRGVzY3JpcHRpb24uc3RyaW5nID0gX21zZztcclxuICB9LFxyXG5cclxuICBFeGl0X1BhcnRuZXJTaGlwU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1BhcnRuZXJTaGlwU2V0dXAoKTtcclxuICAgIHRoaXMuVG9nZ2xlU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gIH0sXHJcbiAgXHJcbiAgUmVzZXRfUGFydG5lclNoaXBTZXR1cCgpXHJcbiAge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsUGFydG5lcnNoaXBOb2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgYnVzaW5lc3NEZXRhaWxQYXJ0bmVyc2hpcE5vZGVzW2luZGV4XS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBidXNpbmVzc0RldGFpbFBhcnRuZXJzaGlwTm9kZXMgPSBbXTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnRfUGFydG5lcnNoaXBTZXR1cChfZGF0YSlcclxuICB7XHJcbiAgICBQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPSB0cnVlO1xyXG4gICAgUGFydG5lclNoaXBEYXRhID0gX2RhdGE7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpO1xyXG4gICAgdmFyIF90dXJuID0gX2RhdGEuRGF0YS5UdXJuO1xyXG4gICAgdmFyIF9wbGF5ZXJEYXRhID0gX2RhdGEuRGF0YS5QbGF5ZXJEYXRhO1xyXG4gICAgdmFyIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXggPSBfZGF0YS5EYXRhLlNlbGVjdGVkQnVzaW5zZXNzSW5kZXg7XHJcbiAgICB2YXIgX2J1c2luZXNzVmFsdWUgPSBfZGF0YS5EYXRhLkJ1c1ZhbHVlO1xyXG4gICAgdmFyIF9wYXlBbW91bnQgPSBfYnVzaW5lc3NWYWx1ZSAvIDI7XHJcbiAgICB2YXIgX2J1c2luZXNzTW9kZSA9IFwiXCI7XHJcblxyXG4gICAgaWYgKF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMSlcclxuICAgICAgX2J1c2luZXNzTW9kZSA9IFwiSG9tZSBCYXNlZFwiO1xyXG4gICAgZWxzZSBpZiAoX3BsYXllckRhdGEuTm9PZkJ1c2luZXNzW19TZWxlY3RlZEJ1c2luZXNzSW5kZXhdLkJ1c2luZXNzVHlwZSA9PSAyKVxyXG4gICAgICBfYnVzaW5lc3NNb2RlID0gXCJCcmljayAmIE1vcnRhclwiO1xyXG4gICAgICBcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgdmFyIF9tc2cgPSBcInlvdSBoYXZlIHJlY2VpdmVkIHBhcnRuZXJzaGlwIG9mZmVyIGJ5IFwiICsgX3BsYXllckRhdGEuUGxheWVyTmFtZSArIFwiICwgZm9sbG93aW5nIGFyZSB0aGUgZGV0YWlscyBvZiBidXNpbmVzczogXCIgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgXCJCdXNpbmVzcyBOYW1lOiBcIiArIF9wbGF5ZXJEYXRhLk5vT2ZCdXNpbmVzc1tfU2VsZWN0ZWRCdXNpbmVzc0luZGV4XS5CdXNpbmVzc05hbWUgKyBcIlxcblwiICtcclxuICAgICAgICBcIkJ1c2luZXNzIE1vZGU6IFwiICsgX2J1c2luZXNzTW9kZSArIFwiXFxuXCIgK1xyXG4gICAgICAgIFwiQnVzaW5lc3MgVmFsdWU6ICRcIiArIF9idXNpbmVzc1ZhbHVlICsgXCJcXG5cIiArXHJcbiAgICAgICAgXCJDYXNoIFBheW1lbnQ6ICRcIiArIF9wYXlBbW91bnQgKyBcIlxcblwiICsgXCJcXG5cIiArXHJcbiAgICAgICAgXCJpZiBvZmZlciBpcyBhY2NlcHRlZCB5b3Ugd2lsbCByZWNlaXZlIDUwJSBzaGFyZSBvZiB0aGF0IHBhcnRpY3VsYXIgYnVzaW5lc3MgYW5kIHdpbGwgcmVjZWl2ZSBwcm9maXQvbG9zZSBvbiB0aGF0IHBhcnRpY3VsYXIgYnVzaW5lc3MuXCI7XHJcbiAgICBcclxuICAgICAgdGhpcy5FbmFibGVQYXJ0bmVyc2hpcERlY2lzaW9uX1BhcnRuZXJTaGlwU2V0dXAoX21zZyk7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIEFjY2VwdE9mZmVyX1BhcnRuZXJzaGlwU2V0dXAoKVxyXG4gIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfYWxsQWN0b3JzID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5Sb29tQWN0b3JzKCk7XHJcbiAgICB2YXIgX2FjdG9yID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGE7XHJcbiAgICB2YXIgX2RhdGEgPSBQYXJ0bmVyU2hpcERhdGE7XHJcbiAgICB2YXIgX3R1cm4gPSBfZGF0YS5EYXRhLlR1cm47XHJcbiAgICB2YXIgX3BsYXllckRhdGEgPSBfZGF0YS5EYXRhLlBsYXllckRhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBfYnVzaW5lc3NWYWx1ZSA9IF9kYXRhLkRhdGEuQnVzVmFsdWU7XHJcbiAgICB2YXIgX3BheUFtb3VudCA9IF9idXNpbmVzc1ZhbHVlIC8gMjtcclxuICAgIHZhciBfYnVzaW5lc3NNb2RlID0gXCJcIjtcclxuXHJcbiAgICB2YXIgbXlJbmRleCA9IF9tYW5hZ2VyLkdldE15SW5kZXgoKTtcclxuICBcclxuICAgIGlmIChQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uQ2FzaCA+PSBfcGF5QW1vdW50KSB7XHJcbiAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uQ2FzaCAtPSBfcGF5QW1vdW50O1xyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdKTtcclxuICAgICAgICB0aGlzLlJhaXNlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKHRydWUsIF9wYXlBbW91bnQsIGZhbHNlLCBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tteUluZGV4XS5QbGF5ZXJVSUQsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLCBfU2VsZWN0ZWRCdXNpbmVzc0luZGV4KTtcclxuICAgICAgICB0aGlzLlRvZ2dsZURlY2lzaW9uU2NyZWVuX1BhcnRuZXJTaGlwU2V0dXAoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwiY29uZ3JhdHVsYXRpb25zISB5b3UgaGF2ZSBzdGFydGVkIGJ1c2luZXNzIHBhcnRuZXJzaGlwXCIsMTgwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJOb3QgZW5vdWdoIGNhc2guXCIsIDUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZVxyXG4gICAge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcIk9mZmVyIGhhcyBiZWVuIGFjY2VwdGVkIGJ5IG90aGVyIHBsYXllci5cIik7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgIH1cclxuICB9LFxyXG5cclxuICBDYW5jZWxPZmZlcl9QYXJ0bmVyc2hpcFNldHVwKClcclxuICB7XHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX2RhdGEgPSBQYXJ0bmVyU2hpcERhdGE7XHJcbiAgICB2YXIgX1NlbGVjdGVkQnVzaW5lc3NJbmRleCA9IF9kYXRhLkRhdGEuU2VsZWN0ZWRCdXNpbnNlc3NJbmRleDtcclxuICAgIHZhciBteUluZGV4ID0gX21hbmFnZXIuR2V0TXlJbmRleCgpO1xyXG4gICAgY29uc29sZS5sb2coX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0uUGxheWVyVUlEKTtcclxuICAgIGlmIChQYXJ0bmVyU2hpcE9mZmVyUmVjZWl2ZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuUmFpc2VFdmVudERlY2lzaW9uQW5zd2VyX1BhcnRuZXJzaGlwU2V0dXAoZmFsc2UsIDAsIHRydWUsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW215SW5kZXhdLlBsYXllclVJRCwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bbXlJbmRleF0sIF9TZWxlY3RlZEJ1c2luZXNzSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBjYW5jZWxsZWQgdGhlIG9mZmVyLlwiLDEyMDApO1xyXG4gICAgfSBlbHNlXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlRGVjaXNpb25TY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91IGhhdmUgY2FuY2VsbGVkIHRoZSBvZmZlci5cIiwxMjAwKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSYWlzZUV2ZW50RGVjaXNpb25BbnN3ZXJfUGFydG5lcnNoaXBTZXR1cChfaXNBY2NlcHRlZD1mYWxzZSxfcGF5bWVudD0wLF9pc0NhbmNlbGxlZD1mYWxzZSxfdUlEPVwiXCIsX2RhdGE9bnVsbCxfYnVzaW5lc3NJbmRleD0wKVxyXG4gIHtcclxuICAgIHZhciBfbWFpbkRhdGEgPSB7IERhdGE6IHsgQWNjZXB0ZWQ6IF9pc0FjY2VwdGVkLCBDYXNoUGF5bWVudDpfcGF5bWVudCxDYW5jZWxsZWQ6X2lzQ2FuY2VsbGVkLFBsYXllcklEOl91SUQsUGxheWVyRGF0YTpfZGF0YSxCdXNpbmVzc0luZGV4Ol9idXNpbmVzc0luZGV4fSB9O1xyXG4gICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllclN5bmNNYW5hZ2VyKCkuUmFpc2VFdmVudCgxMiwgX21haW5EYXRhKTtcclxuICB9LFxyXG5cclxuICBSZWNlaXZlRXZlbnREZWNpc2lvbkFuc3dlcl9QYXJ0bmVyc2hpcFNldHVwKF9kYXRhKVxyXG4gIHtcclxuICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X011bHRpcGxheWVyQ29udHJvbGxlcigpLkNoZWNrU3BlY3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBfbWFuYWdlci5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhfZGF0YSk7XHJcbiAgICAgIHZhciBfYWNjZXB0ZWQgPSBfZGF0YS5EYXRhLkFjY2VwdGVkO1xyXG4gICAgICB2YXIgX2Nhc2ggPSBfZGF0YS5EYXRhLkNhc2hQYXltZW50O1xyXG4gICAgICB2YXIgX2NhbmNlbGxlZCA9IF9kYXRhLkRhdGEuQ2FuY2VsbGVkO1xyXG4gICAgICB2YXIgX3VpZCA9IF9kYXRhLkRhdGEuUGxheWVySUQ7XHJcbiAgICAgIHZhciBfcGxheWVyRGF0YSA9IF9kYXRhLkRhdGEuUGxheWVyRGF0YTtcclxuICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gX2RhdGEuRGF0YS5CdXNpbmVzc0luZGV4O1xyXG4gICAgXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYW5zd2VyIHJlY2VpdmVkXCIpO1xyXG4gICAgICBpZihfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllclVJRD09R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9NdWx0aXBsYXllckNvbnRyb2xsZXIoKS5QaG90b25BY3RvcigpLmN1c3RvbVByb3BlcnRpZXMuRGF0YS51c2VySUQpXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoX2FjY2VwdGVkKSB7XHJcbiAgICAgICAgICB0aGlzLlRvZ2dsZVNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCArPSBfY2FzaDtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Jc1BhcnRuZXJzaGlwID0gdHJ1ZTtcclxuICAgICAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5QYXJ0bmVySUQgPSBfdWlkO1xyXG4gICAgICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLlBhcnRuZXJOYW1lID0gX3BsYXllckRhdGEuUGxheWVyTmFtZTtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKS5zZXRDdXN0b21Qcm9wZXJ0eShcIlBsYXllclNlc3Npb25EYXRhXCIsIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0pO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwib2ZmZXIgYWNjZXB0ZWRcIik7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGFydG5lcnNoaXAgb2ZmZXIgaGFzIGJlZW4gYWNjZXB0ZWQgYnkgXCIgKyBfcGxheWVyRGF0YS5QbGF5ZXJOYW1lICsgXCIsIGNhc2ggJFwiICsgX2Nhc2ggKyBcIiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIGFjY291bnQuXCIsIDI4MDApO1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVDYXNoX1R1cm5EZWNpc2lvbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoX2NhbmNlbGxlZCkge1xyXG4gICAgICAgICAgaWYgKENhbmNlbGxlZElELmluY2x1ZGVzKF91aWQpID09IGZhbHNlKVxyXG4gICAgICAgICAgICAgIENhbmNlbGxlZElELnB1c2goX3VpZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhDYW5jZWxsZWRJRCk7XHJcbiAgICAgICAgICBpZiAoQ2FuY2VsbGVkSUQubGVuZ3RoID09IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVTY3JlZW5fUGFydG5lclNoaXBTZXR1cChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlV2FpdGluZ1NjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3VyIHBhcnRuZXJzaGlwIG9mZmVyIGhhcyBiZWVuIGNhbmNlbGxlZCBieSBhbGwgb3RoZXIgdXNlcnMuXCIsIDI4MDApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwib2ZmZXIgcmVqZWN0ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChfYWNjZXB0ZWQpIHtcclxuICAgICAgICAgIFBhcnRuZXJTaGlwT2ZmZXJSZWNlaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJPZmZlciBoYXMgYmVlbiBhY2NlcHRlZCBieSBvdGhlciBwbGF5ZXIuXCIsIDE4MDApO1xyXG4gICAgICAgICAgdGhpcy5Ub2dnbGVEZWNpc2lvblNjcmVlbl9QYXJ0bmVyU2hpcFNldHVwKGZhbHNlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKF9jYW5jZWxsZWQpIHtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gSW52ZXN0IGFuZCBzZWxsIG1vZGR1bGVcclxuXHJcbiAgUmVzZXRHb2xkSW5wdXQoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuR29sZEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIEdvbGRDYXNoQW1vdW50ID0gXCJcIjtcclxuICB9LFxyXG5cclxuICBSZXNldFN0b2NrQnVzaW5lc3NOYW1lSW5wdXQoKSB7XHJcbiAgICB0aGlzLlR1cm5EZWNpc2lvblNldHVwVUkuU3RvY2tFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICBTdG9ja0J1c2luZXNzTmFtZSA9IFwiXCI7XHJcbiAgfSxcclxuXHJcbiAgb25BbW91bnRDaGFuZ2VkX0ludmVzdFNlbGwoX2Ftb3VudCkge1xyXG4gICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gX2Ftb3VudDtcclxuXHJcbiAgICBpZiAoRW50ZXJCdXlTZWxsQW1vdW50ID09IFwiXCIpIHtcclxuICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgX2Ftb3VudCA9IHBhcnNlSW50KEVudGVyQnV5U2VsbEFtb3VudCk7XHJcbiAgICAgIHZhciBfYW1vdW50ID0gT25jZU9yU2hhcmUgKiBfYW1vdW50O1xyXG4gICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChcclxuICAgICAgICBPbmNlT3JTaGFyZSArIFwiKlwiICsgRW50ZXJCdXlTZWxsQW1vdW50ICsgXCI9XCIgKyBfYW1vdW50XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICAgIHRoaXMuVXBkYXRlQ2FzaF9UdXJuRGVjaXNpb24oKTtcclxuICAgIHRoaXMuUmVzZXRHb2xkSW5wdXQoKTtcclxuICAgIHRoaXMuUmVzZXRTdG9ja0J1c2luZXNzTmFtZUlucHV0KCk7XHJcbiAgfSxcclxuXHJcbiAgQXNzaWduRGF0YV9JbnZlc3RTZWxsKFxyXG4gICAgX3RpdGxlLFxyXG4gICAgX2RpY2VSZXN1bHQsXHJcbiAgICBfcHJpY2VUaXRsZSxcclxuICAgIF9wcmljZVZhbHVlLFxyXG4gICAgX2J1eU9yU2VsbFRpdGxlLFxyXG4gICAgX3RvdGFsQW1vdW50VGl0bGUsXHJcbiAgICBfdG90YWxBbW91bnRWYWx1ZSxcclxuICAgIF9idXR0b25OYW1lLFxyXG4gICAgX3N0YXRlXHJcbiAgKSB7XHJcbiAgICB0aGlzLkNoZWNrUmVmZXJlbmNlcygpO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gX3RpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2VSZXN1bHQ7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLlByaWNlVGl0bGVMYWJlbC5zdHJpbmcgPSBfcHJpY2VUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuUHJpY2VWYWx1ZUxhYmVsLnN0cmluZyA9IF9wcmljZVZhbHVlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5CdXlPclNlbGxUaXRsZUxhYmVsLnN0cmluZyA9IF9idXlPclNlbGxUaXRsZTtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRUaXRsZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFRpdGxlO1xyXG4gICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5Ub3RhbEFtb3VudFZhbHVlTGFiZWwuc3RyaW5nID0gX3RvdGFsQW1vdW50VmFsdWU7XHJcbiAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkJ1dHRvbk5hbWVMYWJlbC5zdHJpbmcgPSBfYnV0dG9uTmFtZTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVEYXRhX0ludmVzdFNlbGwoX3RvdGFsQW1vdW50VmFsdWUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuVG90YWxBbW91bnRWYWx1ZUxhYmVsLnN0cmluZyA9IF90b3RhbEFtb3VudFZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIEFwcGx5QnV0dG9uX0ludmVzdFNlbGwoKSB7XHJcbiAgICBpZiAoRW50ZXJCdXlTZWxsQW1vdW50ID09IFwiXCIpIHtcclxuICAgICAgdGhpcy5TaG93VG9hc3QoXCJQbGVhc2UgZW50ZXIgYW4gYW1vdW50LlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuSW52ZXN0U3RhdGUgPT0gSW52ZXN0RW51bS5Hb2xkSW52ZXN0KSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgX1RvdGFsQW1vdW50IDw9XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoID1cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLkNhc2ggLSBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5Hb2xkQ291bnQgPVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uR29sZENvdW50ICsgX2Ftb3VudDtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBib3VnaHQgXCIgKyBfYW1vdW50ICsgXCIgb3VuY2VzIG9mIEdPTERcIixcclxuICAgICAgICAgICAgMTQwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLkdvbGRTZWxsKSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIF9hbW91bnQgPD1cclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLkdvbGRDb3VudFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLkNhc2ggPVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uQ2FzaCArIF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLkdvbGRDb3VudCA9XHJcbiAgICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgICAgXS5Hb2xkQ291bnQgLSBfYW1vdW50O1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIgK1xyXG4gICAgICAgICAgICAgIF9hbW91bnQgK1xyXG4gICAgICAgICAgICAgIFwiIG91bmNlcyBvZiBHT0xEIGZvciAgJFwiICtcclxuICAgICAgICAgICAgICBfVG90YWxBbW91bnQsXHJcbiAgICAgICAgICAgIDE0MDBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVJbnZlc3RTZWxsU2NyZWVuX0ludmVzdFNlbGwoZmFsc2UpO1xyXG4gICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlRGF0YV9JbnZlc3RTZWxsKE9uY2VPclNoYXJlICsgXCIqMD0wXCIpO1xyXG4gICAgICAgICAgRW50ZXJCdXlTZWxsQW1vdW50ID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuSW52ZXN0U2VsbFNldHVwVUkuQW1vdW50RWRpdEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwieW91IGRvbid0IGhhdmUgZW5vdWdoIEdPTEQgb3VuY2VzLCB5b3Ugb3duIFwiICtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIC5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkdvbGRDb3VudCArXHJcbiAgICAgICAgICAgICAgXCIgb2YgR09MRCBvdW5jZXNcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLlN0b2NrSW52ZXN0KSB7XHJcbiAgICAgICAgdmFyIF9hbW91bnQgPSBwYXJzZUludChFbnRlckJ1eVNlbGxBbW91bnQpO1xyXG4gICAgICAgIHZhciBfVG90YWxBbW91bnQgPSBPbmNlT3JTaGFyZSAqIF9hbW91bnQ7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgX1RvdGFsQW1vdW50IDw9XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoID1cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLkNhc2ggLSBfVG90YWxBbW91bnQ7XHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5TdG9ja0NvdW50ID1cclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgICBdLlN0b2NrQ291bnQgKyBfYW1vdW50O1xyXG4gICAgICAgICAgLy9jYW4gYWRkIG11bHRpcGxlIHN0b2NrcyB3aXRoIGJ1c2luZXNzIG5hbWUgaW4gb2JqZWN0IGlmIHJlcXVpcmVkXHJcblxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGJvdWdodCBcIiArXHJcbiAgICAgICAgICAgICAgX2Ftb3VudCArXHJcbiAgICAgICAgICAgICAgXCIgc2hhcmVzIG9mIGJ1c2luZXNzIFwiICtcclxuICAgICAgICAgICAgICBTdG9ja0J1c2luZXNzTmFtZSxcclxuICAgICAgICAgICAgMTQwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUludmVzdFNlbGxTY3JlZW5fSW52ZXN0U2VsbChmYWxzZSk7XHJcbiAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGVEYXRhX0ludmVzdFNlbGwoT25jZU9yU2hhcmUgKyBcIiowPTBcIik7XHJcbiAgICAgICAgICBFbnRlckJ1eVNlbGxBbW91bnQgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5BbW91bnRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLlNob3dUb2FzdChcIllvdSBkb24ndCBoYXZlIGVub3VnaCBjYXNoLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5JbnZlc3RTZWxsU2V0dXBVSS5JbnZlc3RTdGF0ZSA9PSBJbnZlc3RFbnVtLlN0b2NrU2VsbCkge1xyXG4gICAgICAgIHZhciBfYW1vdW50ID0gcGFyc2VJbnQoRW50ZXJCdXlTZWxsQW1vdW50KTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgX2Ftb3VudCA8PVxyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uU3RvY2tDb3VudFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdmFyIF9Ub3RhbEFtb3VudCA9IE9uY2VPclNoYXJlICogX2Ftb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLkNhc2ggPVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uQ2FzaCArIF9Ub3RhbEFtb3VudDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tcclxuICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICBdLlN0b2NrQ291bnQgPVxyXG4gICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgICAgX3BsYXllckluZGV4XHJcbiAgICAgICAgICAgIF0uU3RvY2tDb3VudCAtIF9hbW91bnQ7XHJcblxyXG4gICAgICAgICAgdGhpcy5TaG93VG9hc3QoXHJcbiAgICAgICAgICAgIFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHNvbGQgXCIgK1xyXG4gICAgICAgICAgICAgIF9hbW91bnQgK1xyXG4gICAgICAgICAgICAgIFwiIHNoYXJlcyBvZiBzdG9jayBmb3IgICRcIiArXHJcbiAgICAgICAgICAgICAgX1RvdGFsQW1vdW50LFxyXG4gICAgICAgICAgICAxNDAwXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZURhdGFfSW52ZXN0U2VsbChPbmNlT3JTaGFyZSArIFwiKjA9MFwiKTtcclxuICAgICAgICAgIEVudGVyQnV5U2VsbEFtb3VudCA9IFwiXCI7XHJcbiAgICAgICAgICB0aGlzLkludmVzdFNlbGxTZXR1cFVJLkFtb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICAgICAgICBcInlvdSBkb24ndCBoYXZlIGVub3VnaCBzdG9ja3Mgc2hhcmVzLCB5b3Ugb3duIFwiICtcclxuICAgICAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKClcclxuICAgICAgICAgICAgICAgIC5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlN0b2NrQ291bnQgK1xyXG4gICAgICAgICAgICAgIFwiIG9mIHN0b2NrIHNoYXJlc1wiXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRCdXR0b25fSW52ZXN0U2VsbCgpIHtcclxuICAgIHRoaXMuVG9nZ2xlSW52ZXN0U2VsbFNjcmVlbl9JbnZlc3RTZWxsKGZhbHNlKTtcclxuICB9LFxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gUGF5ZGF5IG9yIERvdWJsZSBwYXkgRGF5XHJcbiAgVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheShfc3RhdGUpIHtcclxuICAgIHRoaXMuUGF5RGF5U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoX3N0YXRlKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBVcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgQk1BbW91bnQsIGxvYW5UYWtlbikge1xyXG4gICAgaWYgKEhNQW1vdW50ID09IDApIHtcclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWRCdG4uZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgIGNjLkJ1dHRvblxyXG4gICAgICApLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChcclxuICAgICAgICBjYy5CdXR0b25cclxuICAgICAgKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChCTUFtb3VudCA9PSAwKSB7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWxvYW5UYWtlbikge1xyXG4gICAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIExvYW5QYXllZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEdldExvYW5BbW91bnRfUGF5RGF5KCkge1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcblxyXG4gICAgdmFyIF9sb2FuID0gMDtcclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgIGluZGV4IDwgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG4gICAgICBpbmRleCsrXHJcbiAgICApIHtcclxuICAgICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICBfbG9hbiA9XHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hbkFtb3VudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9sb2FuO1xyXG4gIH0sXHJcblxyXG4gIEFzc2lnbkRhdGFfUGF5RGF5KF90aXRsZSxfaXNEb3VibGVQYXlEYXkgPSBmYWxzZSxfc2tpcEhNID0gZmFsc2UsX3NraXBCTSA9IGZhbHNlLF9pc0JvdCA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLklzQm90VHVybiA9IF9pc0JvdDtcclxuICAgIERvdWJsZVBheURheSA9IF9pc0RvdWJsZVBheURheTtcclxuICAgIHRoaXMuVG9nZ2xlUGF5RGF5U2NyZWVuX1BheURheSh0cnVlKTtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IF90aXRsZTtcclxuICAgIHZhciBfdGltZSA9IDE4MDA7XHJcblxyXG4gICAgaWYgKF9pc0JvdCA9PSBmYWxzZSkge1xyXG4gICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKVxyXG4gICAgICAgIHRoaXMuU2hvd1RvYXN0KFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLF90aW1lKTtcclxuICAgICAgZWxzZSBpZiAoX3NraXBITSlcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiLF90aW1lKTtcclxuICAgICAgZWxzZSBpZiAoX3NraXBCTSlcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIixfdGltZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvL2NoZWNrIHNraXAgcGF5ZGF5IHZhcmlhYmxlc1xyXG4gICAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91ciBwYXlkYXkgb24gaG9tZSBiYXNlZCBhbmQgYnJpY2sgJiBtb3J0YXIgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgZWxzZSBpZiAoX3NraXBITSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGhvbWUgYmFzZWQgYnVzaW5lc3Nlc3Mgd2lsbCBiZSBza2lwcGVkLlwiKTtcclxuICAgICAgZWxzZSBpZiAoX3NraXBCTSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdXIgcGF5ZGF5IG9uIGJyaWNrICYgbW9ydGFyIGJ1c2luZXNzZXNzIHdpbGwgYmUgc2tpcHBlZC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KFxyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoXHJcbiAgICApO1xyXG5cclxuICAgIHZhciBITUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkhvbWVCYXNlZEFtb3VudDtcclxuICAgIHZhciBCTUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgdmFyIEJNTG9jYXRpb25zID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uVG90YWxMb2NhdGlvbnNBbW91bnQ7XHJcblxyXG4gICAgdmFyIF9sb2FuVGFrZW4gPSBmYWxzZTtcclxuICAgIHZhciBfYnVzaW5lc3NJbmRleCA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwO2luZGV4IDxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO2luZGV4KyspIHtcclxuICAgICAgaWYgKEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tpbmRleF0uTG9hblRha2VuKSB7XHJcbiAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgX2J1c2luZXNzSW5kZXggPSBpbmRleDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBsb2FuVGFrZW4gPSBfbG9hblRha2VuO1xyXG5cclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ib21lQmFzZWROdW1iZXJMYWJlbC5zdHJpbmcgPSBITUFtb3VudDtcclxuICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5CTU51bWJlckxhYmVsLnN0cmluZyA9IEJNQW1vdW50O1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkJNTnVtYmVyTG9jYXRpb25MYWJlbC5zdHJpbmcgPSBCTUxvY2F0aW9ucztcclxuXHJcbiAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuXHJcbiAgICAvL2NoZWNrIGlmIGxvYW4gd2FzIHNraXBwZWQgcHJldmlvdXNseVxyXG4gICAgaWYgKF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uU2tpcHBlZExvYW5QYXltZW50KSB7XHJcbiAgICAgIHZhciBfbG9hbiA9IHRoaXMuR2V0TG9hbkFtb3VudF9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5Gb3R0ZXJMYWJlbC5zdHJpbmcgPSBcIipwYXkgJFwiICsgX2xvYW47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkZvdHRlckxhYmVsLnN0cmluZyA9IFwiKnBheSAkNTAwMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY2hlY2sgc2tpcCBwYXlkYXkgdmFyaWFibGVzXHJcbiAgICBpZiAoX3NraXBITSAmJiBfc2tpcEJNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsIDAsIGxvYW5UYWtlbik7XHJcbiAgICBlbHNlIGlmIChfc2tpcEhNKSB0aGlzLlVwZGF0ZUJ1dHRvbnNfUGF5RGF5KDAsIEJNQW1vdW50LCBsb2FuVGFrZW4pO1xyXG4gICAgZWxzZSBpZiAoX3NraXBCTSkgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgMCwgbG9hblRha2VuKTtcclxuICAgIGVsc2UgdGhpcy5VcGRhdGVCdXR0b25zX1BheURheShITUFtb3VudCwgQk1BbW91bnQsIGxvYW5UYWtlbik7XHJcblxyXG4gICAgaWYgKF9za2lwQk0gfHwgX3NraXBITSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLlBheURheUNvbXBsZXRlZCgpO1xyXG4gICAgICB9LCBfdGltZSArIDIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc0JvdCkge1xyXG4gICAgICB0aGlzLk9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCk7XHJcbiAgICAgIHRoaXMuT25CTVBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgICB0aGlzLk9uTG9hblBheW1lbnRDbGlja2VkX1BheURheSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uSG9tZUJhc2VkUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgaWYgKCFIb21lQmFzZWRQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkodHJ1ZSk7XHJcblxyXG4gICAgICBpZiAoIURvdWJsZVBheURheSlcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuUmVzdWx0U2NyZWVuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIlBheURheVwiO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJEb3VibGVQYXlEYXlcIjtcclxuXHJcbiAgICAgIEhvbWVCYXNlZFBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuSG9tZUJhc2VkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgICAgdmFyIEhNQW1vdW50ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uSG9tZUJhc2VkQW1vdW50O1xyXG4gICAgICB2YXIgX2RpY2UgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUm9sbE9uZURpY2UoKTtcclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzO1xyXG5cclxuICAgICAgdmFyIF9hbW91bnRUb0JlU2VuZCA9IDA7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZUFkanVzdGVkID0gMDtcclxuICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMTtcclxuXHJcbiAgICAgIC8vcGFydG5lcnNoaXAgY29kZVxyXG4gICAgICBpZiAoRG91YmxlUGF5RGF5KVxyXG4gICAgICAgIF9tdWx0aXBsaWVyID0gMjtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uQnVzaW5lc3NUeXBlID09IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYgKF90ZW1wRGF0YVtpbmRleF0uSXNQYXJ0bmVyc2hpcClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIF9wYXltZW50ID1fbXVsdGlwbGllciogX2RpY2UgKiAxMDAwO1xyXG4gICAgICAgICAgICBfYW1vdW50VG9CZVNlbmQgPSAoX3BheW1lbnQgLyAyKTtcclxuICAgICAgICAgICAgX21hbmFnZXIuU2VuZFByb2ZpdF9QYXJ0bmVyX1R1cm5EZWNpc2lvbihfYW1vdW50VG9CZVNlbmQsIF90ZW1wRGF0YVtpbmRleF0uUGFydG5lcklEKTtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVBZGp1c3RlZCArPSBfYW1vdW50VG9CZVNlbmQ7XHJcbiAgICAgICAgICB9ICBcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfYW1vdW50VG9CZUFkanVzdGVkPjApXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLlNob3dUb2FzdChcInlvdSBoYXZlIHBhcnRuZXJzaGlwIGluIHNvbWUgYnVzaW5lc3MsIHJlc3BlY3RpdmUgNTAlIHByb2ZpdCBvZiBwYXJ0aWN1bGFyIGJ1c2luZXNzIHdpbGwgYmUgc2hhcmVkLlwiLCAyMDAwKTtcclxuICAgICAgfVxyXG4gICAgICAvL3BhcnRuZXJzaGlwIGNvZGVcclxuXHJcbiAgICAgIGlmICghRG91YmxlUGF5RGF5KVxyXG4gICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gSE1BbW91bnQgKiBfZGljZSAqIDEwMDAtX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gMiAqIChITUFtb3VudCAqIF9kaWNlKSAqIDEwMDAtX2Ftb3VudFRvQmVBZGp1c3RlZDtcclxuXHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5EaWNlUmVzdWx0TGFiZWwuc3RyaW5nID0gX2RpY2U7XHJcbiAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEJ1c2luZXNzTGFiZWwuc3RyaW5nID0gSE1BbW91bnQ7XHJcblxyXG4gICAgICBpZiAoIURvdWJsZVBheURheSlcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPVwiKFwiK19kaWNlICsgXCIqXCIgKyBITUFtb3VudCArIFwiKlwiICsgXCIxMDAwKS1cIitfYW1vdW50VG9CZUFkanVzdGVkK1wiPVwiKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9XCIoXCIrX2RpY2UgKyBcIipcIiArIEhNQW1vdW50ICsgXCIqXCIgKyBcIjEwMDAqMiktXCIrX2Ftb3VudFRvQmVBZGp1c3RlZCtcIj1cIiArIFRvdGFsUGF5RGF5QW1vdW50O1xyXG5cclxuICAgICAgaWYgKHRoaXMuSXNCb3RUdXJuKSB7XHJcbiAgICAgICAgdGhpcy5SZWNlaXZlUGF5bWVudF9QYXlEYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIE9uQk1QYXltZW50Q2xpY2tlZF9QYXlEYXkoKSB7XHJcbiAgICAvL2JyaWNrIGFuZCBtb3J0YXJcclxuICAgIGlmICghQnJpY2tNb3J0YXJQYXltZW50Q29tcGxldGVkKSB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlUmVzdWx0UGFuZWxTY3JlZW5fUGF5RGF5KHRydWUpO1xyXG5cclxuICAgICAgaWYgKCFEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlJlc3VsdFNjcmVlblRpdGxlTGFiZWwuc3RyaW5nID0gXCJQYXlEYXlcIjtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5SZXN1bHRTY3JlZW5UaXRsZUxhYmVsLnN0cmluZyA9IFwiRG91YmxlUGF5RGF5XCI7XHJcblxyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuQk1CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIHZhciBCTUFtb3VudCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkJyaWNrQW5kTW9ydGFyQW1vdW50O1xyXG4gICAgICB2YXIgQk1Mb2NhdGlvbnMgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ub3RhbExvY2F0aW9uc0Ftb3VudDtcclxuXHJcbiAgICAgIHZhciBfYW1vdW50ID0gQk1BbW91bnQgKyBCTUxvY2F0aW9ucztcclxuICAgICAgdmFyIF9kaWNlID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlJvbGxUd29EaWNlcygpO1xyXG5cclxuICAgICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzO1xyXG5cclxuICAgICAgdmFyIF9hbW91bnRUb0JlU2VuZCA9IDA7XHJcbiAgICAgIHZhciBfYW1vdW50VG9CZUFkanVzdGVkID0gMDtcclxuICAgICAgdmFyIF9tdWx0aXBsaWVyID0gMTtcclxuXHJcbiAgICAgIGlmIChEb3VibGVQYXlEYXkpXHJcbiAgICAgICAgX211bHRpcGxpZXIgPSAyO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF90ZW1wRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5CdXNpbmVzc1R5cGUgPT0gMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZiAoX3RlbXBEYXRhW2luZGV4XS5Jc1BhcnRuZXJzaGlwKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgX2xvY2F0aW9ucyA9IF90ZW1wRGF0YVtpbmRleF0uTG9jYXRpb25zTmFtZS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICB2YXIgX3BheW1lbnQgPV9sb2NhdGlvbnMqX211bHRpcGxpZXIqIF9kaWNlICogMjAwMDtcclxuICAgICAgICAgICAgX2Ftb3VudFRvQmVTZW5kID0gKF9wYXltZW50IC8gMik7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlNlbmRQcm9maXRfUGFydG5lcl9UdXJuRGVjaXNpb24oX2Ftb3VudFRvQmVTZW5kLCBfdGVtcERhdGFbaW5kZXhdLlBhcnRuZXJJRCk7XHJcbiAgICAgICAgICAgIF9hbW91bnRUb0JlQWRqdXN0ZWQgKz0gX2Ftb3VudFRvQmVTZW5kO1xyXG4gICAgICAgICAgfSAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoX2Ftb3VudFRvQmVBZGp1c3RlZD4wKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5TaG93VG9hc3QoXCJ5b3UgaGF2ZSBwYXJ0bmVyc2hpcCBpbiBzb21lIGJ1c2luZXNzLCByZXNwZWN0aXZlIDUwJSBwcm9maXQgb2YgcGFydGljdWxhciBidXNpbmVzcyB3aWxsIGJlIHNoYXJlZC5cIiwgMjAwMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghRG91YmxlUGF5RGF5KVxyXG4gICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ID0gX2Ftb3VudCAqIF9kaWNlICogMjAwMC1fYW1vdW50VG9CZUFkanVzdGVkO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgVG90YWxQYXlEYXlBbW91bnQgPSAyICogKF9hbW91bnQgKiBfZGljZSkgKiAyMDAwLV9hbW91bnRUb0JlQWRqdXN0ZWQ7XHJcblxyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuRGljZVJlc3VsdExhYmVsLnN0cmluZyA9IF9kaWNlO1xyXG4gICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxCdXNpbmVzc0xhYmVsLnN0cmluZyA9IF9hbW91bnQ7XHJcblxyXG4gICAgICBpZiAoIURvdWJsZVBheURheSlcclxuICAgICAgICB0aGlzLlBheURheVNldHVwVUkuVG90YWxBbW91bnRMYWJlbC5zdHJpbmcgPVwiKFwiK19kaWNlICsgXCIqXCIgKyBfYW1vdW50ICsgXCIqXCIgKyBcIjIwMDApLVwiICtfYW1vdW50VG9CZUFkanVzdGVkK1wiPVwiKyBUb3RhbFBheURheUFtb3VudDtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Ub3RhbEFtb3VudExhYmVsLnN0cmluZyA9XCIoXCIrX2RpY2UgKyBcIipcIiArIF9hbW91bnQgKyBcIipcIiArIFwiMjAwMCoyKS1cIitfYW1vdW50VG9CZUFkanVzdGVkK1wiPVwiICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5Jc0JvdFR1cm4pIHtcclxuICAgICAgICB0aGlzLlJlY2VpdmVQYXltZW50X1BheURheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgT25Mb2FuUGF5bWVudENsaWNrZWRfUGF5RGF5KCkge1xyXG4gICAgLy9icmljayBhbmQgbW9ydGFyXHJcbiAgICBpZiAoIUxvYW5QYXllZCkge1xyXG4gICAgICB2YXIgX21hbmFnZXIgPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCk7XHJcbiAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgICB2YXIgX0VzdGltYXRlTG9hbiA9IDA7XHJcblxyXG4gICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpLy9pZiBwbGF5ZXIgaGFkIHNraXBwcGVkIGxvYW4gcHJldmlvdXNseSBjYWxsIGFsbCBhbW91bnQgZHVlXHJcbiAgICAgICAgX0VzdGltYXRlTG9hbiA9IHRoaXMuR2V0TG9hbkFtb3VudF9QYXlEYXkoKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIF9Fc3RpbWF0ZUxvYW4gPSA1MDAwO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPj0gX0VzdGltYXRlTG9hbikge1xyXG4gICAgICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5CdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCA9R2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaCAtIF9Fc3RpbWF0ZUxvYW47XHJcblxyXG4gICAgICAgIHZhciBfbG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9idXNpbmVzc0luZGV4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwO2luZGV4IDxHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO2luZGV4KyspIHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2FuVGFrZW4pIHtcclxuICAgICAgICAgICAgX2xvYW5UYWtlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIF9idXNpbmVzc0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID1HYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgLSBfRXN0aW1hdGVMb2FuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3NbX2J1c2luZXNzSW5kZXhdLkxvYW5BbW91bnQgPD0gMCkge1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uTm9PZkJ1c2luZXNzW19idXNpbmVzc0luZGV4XS5Mb2FuQW1vdW50ID0gMDtcclxuICAgICAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLk5vT2ZCdXNpbmVzc1tfYnVzaW5lc3NJbmRleF0uTG9hblRha2VuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpXHJcbiAgICAgICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgICAgICBpZiAoX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ta2lwcGVkTG9hblBheW1lbnQpXHJcbiAgICAgICAgICB0aGlzLlBheURheVNldHVwVUkuU2tpcExvYW5CdXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgdGhpcy5QYXlEYXlTZXR1cFVJLlNraXBMb2FuQnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuUGF5RGF5U2V0dXBVSS5Mb2FuUmVzdWx0UGFuZWxOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIm91dCBvZiBtb25leVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlY2VpdmVQYXltZW50X1BheURheSgpIHtcclxuICAgIC8vYWxsXHJcbiAgICB2YXIgX3BsYXllckluZGV4ID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLkdldFR1cm5OdW1iZXIoKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2ggPUdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1sgX3BsYXllckluZGV4XS5DYXNoICsgVG90YWxQYXlEYXlBbW91bnQ7XHJcbiAgICB0aGlzLlVwZGF0ZUNhc2hfUGF5RGF5KEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLkNhc2gpO1xyXG4gICAgaWYgKCF0aGlzLklzQm90VHVybikge1xyXG4gICAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgICBcIkFtb3VudCAkXCIgK1xyXG4gICAgICAgICAgVG90YWxQYXlEYXlBbW91bnQgK1xyXG4gICAgICAgICAgXCIgaGFzIGJlZW4gYWRkZWQgdG8geW91ciBjYXNoIGFtb3VudCwgVG90YWwgQ2FzaCBoYXMgYmVjb21lICRcIiArXHJcbiAgICAgICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm9bXHJcbiAgICAgICAgICAgIF9wbGF5ZXJJbmRleFxyXG4gICAgICAgICAgXS5DYXNoLFxyXG4gICAgICAgIDE1MDBcclxuICAgICAgKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5Ub2dnbGVSZXN1bHRQYW5lbFNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICAgIH0sIDE1NTApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgXCJBbW91bnQgJFwiICtcclxuICAgICAgICAgIFRvdGFsUGF5RGF5QW1vdW50ICtcclxuICAgICAgICAgIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FzaCBhbW91bnQsIFRvdGFsIENhc2ggaGFzIGJlY29tZSAkXCIgK1xyXG4gICAgICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlBsYXllckdhbWVJbmZvW1xyXG4gICAgICAgICAgICBfcGxheWVySW5kZXhcclxuICAgICAgICAgIF0uQ2FzaFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLlRvZ2dsZVJlc3VsdFBhbmVsU2NyZWVuX1BheURheShmYWxzZSk7XHJcbiAgICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgU2tpcExvYW5PbmVUaW1lX1BheURheSgpIHtcclxuICAgIHRoaXMuU2hvd1RvYXN0KFxyXG4gICAgICBcIllvdSBoYXZlIHNraXBwZWQgdGhlIGxvYW4gcGF5bWVudCwgYmFuayB3aWxsIGNhbGwgdXBvbiBjb21wbGV0ZSBsb2FuIGFtb3VudCBvbiBuZXh0IHBheWRheVwiLFxyXG4gICAgICAyMDAwXHJcbiAgICApO1xyXG4gICAgdmFyIF9tYW5hZ2VyID0gR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpO1xyXG4gICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlNraXBwZWRMb2FuUGF5bWVudCA9IHRydWU7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIExvYW5QYXllZCA9IHRydWU7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hbkJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuUGF5RGF5Q29tcGxldGVkKCk7XHJcbiAgICBMb2FuUGF5ZWQgPSB0cnVlO1xyXG4gIH0sXHJcblxyXG4gIFNlbGxCdXNpbmVzc19QYXlEYXkoKSB7XHJcbiAgICB0aGlzLlBheURheVNldHVwVUkuTG9hblJlc3VsdFBhbmVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgVXBkYXRlQ2FzaF9QYXlEYXkoX2Ftb3VudCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkNhc2hMYWJlbC5zdHJpbmcgPSBcIiRcIiArIF9hbW91bnQ7XHJcbiAgfSxcclxuXHJcbiAgRXhpdExvYW5TY3JlZW5fUGF5RGF5KCkge1xyXG4gICAgdGhpcy5QYXlEYXlTZXR1cFVJLkxvYW5SZXN1bHRQYW5lbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgU3RhcnROZXdHYW1lX1BheURheSgpIHtcclxuICAgIC8vaWYgYmFua3J1cHRlZCB5b3UgY2FuIHN0YXJ0IG5ldyBnYW1lXHJcbiAgICB0aGlzLlNob3dUb2FzdChcclxuICAgICAgXCJZb3Ugd2lsbCBsb3NlIGFsbCBwcm9ncmVzcyBhbmQgc3RhcnQgbmV3IGdhbWUgZnJvbSB0aGUgc3RhcnQuXCIsXHJcbiAgICAgIDMwMDBcclxuICAgICk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5FeGl0TG9hblNjcmVlbl9QYXlEYXkoKTtcclxuICAgICAgdGhpcy5Ub2dnbGVQYXlEYXlTY3JlZW5fUGF5RGF5KGZhbHNlKTtcclxuICAgICAgSG9tZUJhc2VkUGF5bWVudENvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICBCcmlja01vcnRhclBheW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgTG9hblBheWVkID0gZmFsc2U7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X1dob2xlKFxyXG4gICAgICAgIGZhbHNlXHJcbiAgICAgICk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5Ub2dnbGVTa2lwUGF5RGF5X0hvbWVCYXNlZChcclxuICAgICAgICBmYWxzZVxyXG4gICAgICApO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ccmlja0FuZE1vcnRhcihcclxuICAgICAgICBmYWxzZVxyXG4gICAgICApO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlUGF5RGF5KFxyXG4gICAgICAgIGZhbHNlLFxyXG4gICAgICAgIGZhbHNlXHJcbiAgICAgICk7XHJcbiAgICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5CYW5rcnVwdF9UdXJuRGVjaXNpb24oKTtcclxuICAgIH0sIDMwMTApO1xyXG4gIH0sXHJcblxyXG4gIFBheURheUNvbXBsZXRlZCgpIHtcclxuICAgIGlmIChIb21lQmFzZWRQYXltZW50Q29tcGxldGVkICYmIEJyaWNrTW9ydGFyUGF5bWVudENvbXBsZXRlZCAmJiBMb2FuUGF5ZWQpIHtcclxuICAgICAgdmFyIF9wbGF5ZXJJbmRleCA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5HZXRUdXJuTnVtYmVyKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHBheWRheSBkb25lXCIpO1xyXG4gICAgICB0aGlzLlRvZ2dsZVBheURheVNjcmVlbl9QYXlEYXkoZmFsc2UpO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9XaG9sZShcclxuICAgICAgICBmYWxzZVxyXG4gICAgICApO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuVG9nZ2xlU2tpcFBheURheV9Ib21lQmFzZWQoXHJcbiAgICAgICAgZmFsc2VcclxuICAgICAgKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVNraXBQYXlEYXlfQnJpY2tBbmRNb3J0YXIoXHJcbiAgICAgICAgZmFsc2VcclxuICAgICAgKTtcclxuICAgICAgR2FtZVBsYXlSZWZlcmVuY2VNYW5hZ2VyLkluc3RhbmNlLkdldF9HYW1lTWFuYWdlcigpLlRvZ2dsZVBheURheShcclxuICAgICAgICBmYWxzZSxcclxuICAgICAgICBmYWxzZVxyXG4gICAgICApO1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY2FsbFVwb25DYXJkKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFNlbGwgQnVzaW5lc3MgVUlcclxuICBUb2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChfc3RhdGUpIHtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBTZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKSB7XHJcbiAgICB0aGlzLlJlc2V0X1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG4gICAgdmFyIF90ZW1wRGF0YSA9IF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF07XHJcblxyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlRpdGxlTGFiZWwuc3RyaW5nID0gXCJTRUxMXCI7XHJcbiAgICB0aGlzLlNlbGxCdXNpbmVzc1NldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9X21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPV9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uUGxheWVyTmFtZTtcclxuICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc0NvdW50TGFiZWwuc3RyaW5nID1cIk5vIG9mIEJ1c2luZXNzZXMgOiBcIiArX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5Ob09mQnVzaW5lc3MubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBfdGVtcERhdGEuTm9PZkJ1c2luZXNzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5CdXNpbmVzc1NlbGxQcmVmYWIpO1xyXG4gICAgICBub2RlLnBhcmVudCA9IHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5TY3JvbGxDb250ZW50Tm9kZTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5DaGVja1JlZmVyZW5jZXMoKTtcclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXROYW1lKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkJ1c2luZXNzTmFtZSk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0VHlwZShfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGVEZXNjcmlwdGlvbik7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0QnVzaW5lc3NJbmRleChpbmRleCk7XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoX3RlbXBEYXRhLk5vT2ZCdXNpbmVzc1tpbmRleF0uQnVzaW5lc3NUeXBlKSA9PSAxKSB7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCdXNpbmVzc01vZGUoMSk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRNb2RlKFwiSG9tZSBCYXNlZFwiKTtcclxuICAgICAgfSBlbHNlIGlmIChwYXJzZUludChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5CdXNpbmVzc1R5cGUpID09IDIpIHtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldEJ1c2luZXNzTW9kZSgyKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlNldE1vZGUoXCJCcmljayAmIE1vcnRhclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCdXNpbmVzc0RldGFpbFwiKS5TZXRCYWxhbmNlKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkFtb3VudCk7XHJcbiAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuU2V0TG9jYXRpb25zKF90ZW1wRGF0YS5Ob09mQnVzaW5lc3NbaW5kZXhdLkxvY2F0aW9uc05hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgIGlmIChfdGVtcERhdGEuTm9PZkJ1c2luZXNzW2luZGV4XS5Mb2NhdGlvbnNOYW1lLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQnVzaW5lc3NEZXRhaWxcIikuVG9nZ2xlU2VsbExvY2F0aW9uQnV0dG9uKGZhbHNlKTtcclxuICAgICAgZWxzZSBub2RlLmdldENvbXBvbmVudChcIkJ1c2luZXNzRGV0YWlsXCIpLlRvZ2dsZVNlbGxMb2NhdGlvbkJ1dHRvbih0cnVlKTtcclxuXHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXMucHVzaChub2RlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBSZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ1c2luZXNzRGV0YWlsTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGJ1c2luZXNzRGV0YWlsTm9kZXNbaW5kZXhdLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBidXNpbmVzc0RldGFpbE5vZGVzID0gW107XHJcbiAgfSxcclxuXHJcbiAgRW5hYmxlU2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cChfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICBpZiAoX2lzVHVybm92ZXIpIHtcclxuICAgICAgdGhpcy5TZWxsQnVzaW5lc3NTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuU2VsbEJ1c2luZXNzU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXNpbmVzc1VJX1NlbGxCdXNpbmVzc1VJU2V0dXAoKTtcclxuICB9LFxyXG5cclxuICBFeGl0U2VsbFNjcmVlbl9fU2VsbEJ1c2luZXNzVUlTZXR1cCgpIHtcclxuICAgIHRoaXMuUmVzZXRfU2VsbEJ1c2luZXNzVUlTZXR1cCgpO1xyXG4gICAgdGhpcy5Ub2dnbGVTZWxsQnVzaW5lc3NTY3JlZW5fU2VsbEJ1c2luZXNzVUlTZXR1cChmYWxzZSk7XHJcbiAgfSxcclxuXHJcbiAgRXhpdFNlbGxTY3JlZW5BbG9uZ1R1cm5PdmVyX19TZWxsQnVzaW5lc3NVSVNldHVwKCkge1xyXG4gICAgdGhpcy5SZXNldF9TZWxsQnVzaW5lc3NVSVNldHVwKCk7XHJcbiAgICB0aGlzLlRvZ2dsZVNlbGxCdXNpbmVzc1NjcmVlbl9TZWxsQnVzaW5lc3NVSVNldHVwKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBJbnZlc3QgVUlcclxuICBUb2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuSW52ZXN0U2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVJbnZlc3RfSW52ZXN0U2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRJbnZlc3RVSV9JbnZlc3RTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEludmVzdFVJX0ludmVzdFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiSU5WRVNUXCI7XHJcbiAgICB0aGlzLkludmVzdFNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9XHJcbiAgICAgIF9tYW5hZ2VyLlBsYXllckdhbWVJbmZvW19wbGF5ZXJJbmRleF0uQ2FzaDtcclxuICAgIHRoaXMuSW52ZXN0U2V0dXBVSS5QbGF5ZXJOYW1lTGFiZWwuc3RyaW5nID1cclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5QbGF5ZXJOYW1lO1xyXG5cclxuICAgIGlmIChfaXNUdXJub3Zlcikge1xyXG4gICAgICB0aGlzLkludmVzdFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5JbnZlc3RTZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0X0ludmVzdFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUludmVzdFNjcmVlbl9JbnZlc3RTZXR1cFVJKGZhbHNlKTtcclxuICB9LFxyXG5cclxuICBFeGl0SW52ZXN0QWxvbmdUdXJuT3Zlcl9JbnZlc3RTZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVJbnZlc3RTY3JlZW5fSW52ZXN0U2V0dXBVSShmYWxzZSk7XHJcbiAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuY29tcGxldGVDYXJkVHVybigpO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBCdXlPUlNlbGwgVUlcclxuICBUb2dnbGVCdXlPclNlbGxTY3JlZW5fQnV5T3JTZWxsU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBFbmFibGVCdXlPclNlbGxfQnV5T3JTZWxsU2V0dXBVSShfaXNUdXJub3ZlciA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLlJlc2V0VHVyblZhcmlhYmxlKCk7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKHRydWUpO1xyXG4gICAgdGhpcy5TZXRCdXlPclNlbGxVSV9CdXlPclNlbGxTZXR1cFVJKF9pc1R1cm5vdmVyKTtcclxuICB9LFxyXG4gIFNldEJ1eU9yU2VsbFVJX0J1eU9yU2VsbFNldHVwVUkoX2lzVHVybm92ZXIpIHtcclxuICAgIHZhciBfbWFuYWdlciA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKTtcclxuICAgIHZhciBfcGxheWVySW5kZXggPSBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuR2V0VHVybk51bWJlcigpO1xyXG5cclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5UaXRsZUxhYmVsLnN0cmluZyA9IFwiQlVZIE9SIFNFTExcIjtcclxuICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5DYXNoTGFiZWwuc3RyaW5nID1cclxuICAgICAgX21hbmFnZXIuUGxheWVyR2FtZUluZm9bX3BsYXllckluZGV4XS5DYXNoO1xyXG4gICAgdGhpcy5CdXlPclNlbGxTZXR1cFVJLlBsYXllck5hbWVMYWJlbC5zdHJpbmcgPVxyXG4gICAgICBfbWFuYWdlci5QbGF5ZXJHYW1lSW5mb1tfcGxheWVySW5kZXhdLlBsYXllck5hbWU7XHJcblxyXG4gICAgaWYgKF9pc1R1cm5vdmVyKSB7XHJcbiAgICAgIHRoaXMuQnV5T3JTZWxsU2V0dXBVSS5FeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLkJ1eU9yU2VsbFNldHVwVUkuVHVybk92ZXJFeGl0QnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlfQnV5T3JTZWxsU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlQnV5T3JTZWxsU2NyZWVuX0J1eU9yU2VsbFNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRTZWxsT3JCdXlBbG9uZ1R1cm5PdmVyX0J1eU9yU2VsbFNldHVwVUkoKSB7XHJcbiAgICB0aGlzLlRvZ2dsZUJ1eU9yU2VsbFNjcmVlbl9CdXlPclNlbGxTZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIE9uZSBRdWVzdGlvbiBzZXR1cCBVaVxyXG4gIFRvZ2dsZURlY2lzaW9uU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25EZWNpc2lvblNjcmVlbi5hY3RpdmUgPSBfc3RhdGU7XHJcbiAgfSxcclxuXHJcbiAgVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKF9zdGF0ZSkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNwYWNlU2NyZWVuLmFjdGl2ZSA9IF9zdGF0ZTtcclxuICB9LFxyXG5cclxuICBUb2dnbGVXYWl0aW5nU2NyZWVuX09uZVF1ZXN0aW9uU2V0dXBVSShfc3RhdGUpIHtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLldhaXRpbmdTY3JlZW4uYWN0aXZlID0gX3N0YXRlO1xyXG4gIH0sXHJcblxyXG4gIFNldFVwU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKFxyXG4gICAgX215RGF0YSxcclxuICAgIF9hY3RvcnNEYXRhLFxyXG4gICAgX2lzVHVybk92ZXIsXHJcbiAgICBfbW9kZUluZGV4ID0gMFxyXG4gICkge1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuQ2FzaExhYmVsLnN0cmluZyA9IFwiJFwiICsgX215RGF0YS5DYXNoO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuUGxheWVyTmFtZUxhYmVsLnN0cmluZyA9IF9teURhdGEuUGxheWVyTmFtZTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlBsYXllckRldGFpbExhYmVsLnN0cmluZyA9XHJcbiAgICAgIFwiTm8gb2YgUGxheWVyczogXCIgK1xyXG4gICAgICBHYW1lUGxheVJlZmVyZW5jZU1hbmFnZXIuSW5zdGFuY2UuR2V0X0dhbWVNYW5hZ2VyKCkuUGxheWVyR2FtZUluZm8ubGVuZ3RoO1xyXG5cclxuICAgIGlmIChfbW9kZUluZGV4ID09IDIpIHtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIF9hY3RvcnNEYXRhW2luZGV4XS5jdXN0b21Qcm9wZXJ0aWVzLlJvb21Fc3NlbnRpYWxzLklzU3BlY3RhdGUgPT0gZmFsc2VcclxuICAgICAgICApIHtcclxuICAgICAgICAgIC8vY2hlY2sgaWYgcGxheWVyIGlzIHNwZWN0YXRlIG9yIG5vdCwgZG9udCBhZGQgYW55IHNwZWN0YXRlc1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBfbXlEYXRhLlBsYXllclVJRCAhPVxyXG4gICAgICAgICAgICBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSURcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlNjcm9sbENvbnRlbnQ7XHJcbiAgICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKVxyXG4gICAgICAgICAgICAgIC5zZXRQbGF5ZXJOYW1lKFxyXG4gICAgICAgICAgICAgICAgX2FjdG9yc0RhdGFbaW5kZXhdLmN1c3RvbVByb3BlcnRpZXMuUGxheWVyU2Vzc2lvbkRhdGEuUGxheWVyTmFtZVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKVxyXG4gICAgICAgICAgICAgIC5zZXRQbGF5ZXJVSUQoXHJcbiAgICAgICAgICAgICAgICBfYWN0b3JzRGF0YVtpbmRleF0uY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YS5QbGF5ZXJVSURcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKF9tb2RlSW5kZXggPT0gMSkge1xyXG4gICAgICAvL2ZvciBib3RcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF9hY3RvcnNEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChfbXlEYXRhLlBsYXllclVJRCAhPSBfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyVUlEKSB7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRldGFpbHNQcmVmYWIpO1xyXG4gICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5TY3JvbGxDb250ZW50O1xyXG4gICAgICAgICAgbm9kZVxyXG4gICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFwiUGxheWVyRGV0YWlsc1wiKVxyXG4gICAgICAgICAgICAuc2V0UGxheWVyTmFtZShfYWN0b3JzRGF0YVtpbmRleF0uUGxheWVyTmFtZSk7XHJcbiAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgIC5nZXRDb21wb25lbnQoXCJQbGF5ZXJEZXRhaWxzXCIpXHJcbiAgICAgICAgICAgIC5zZXRQbGF5ZXJVSUQoX2FjdG9yc0RhdGFbaW5kZXhdLlBsYXllclVJRCk7XHJcbiAgICAgICAgICBvbmVRdWVzdGlvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9pc1R1cm5PdmVyKSB7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLlR1cm5PdmVyRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRXhpdEJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5UdXJuT3ZlckV4aXRCdXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgUmVzZXRTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoKSB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb25lUXVlc3Rpb25Ob2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgb25lUXVlc3Rpb25Ob2Rlc1tpbmRleF0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgb25lUXVlc3Rpb25Ob2RlcyA9IFtdO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRfT25lUXVlc3Rpb25TZXR1cFVJKCkge1xyXG4gICAgdGhpcy5Ub2dnbGVTcGFjZVNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoZmFsc2UpO1xyXG4gIH0sXHJcblxyXG4gIEV4aXRBbG9uZ1R1cm5PdmVyX09uZVF1ZXN0aW9uU2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVG9nZ2xlU3BhY2VTY3JlZW5fT25lUXVlc3Rpb25TZXR1cFVJKGZhbHNlKTtcclxuICAgIEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfR2FtZU1hbmFnZXIoKS5jb21wbGV0ZUNhcmRUdXJuKCk7XHJcbiAgfSxcclxuXHJcbiAgU2V0VXBEZWNpc2lvblNjcmVlbl9PbmVRdWVzdGlvblNldHVwVUkoX3F1ZXN0aW9uKSB7XHJcbiAgICB2YXIgX215RGF0YSA9IEdhbWVQbGF5UmVmZXJlbmNlTWFuYWdlci5JbnN0YW5jZS5HZXRfTXVsdGlwbGF5ZXJDb250cm9sbGVyKCkuUGhvdG9uQWN0b3IoKVxyXG4gICAgICAuY3VzdG9tUHJvcGVydGllcy5QbGF5ZXJTZXNzaW9uRGF0YTtcclxuICAgIHRoaXMuT25lUXVlc3Rpb25TZXR1cFVJLkRlY2lzaW9uVGl0bGVMYWJlbC5zdHJpbmcgPSBcIk9ORSBRVUVTVElPTlwiO1xyXG4gICAgdGhpcy5PbmVRdWVzdGlvblNldHVwVUkuRGVjaXNpb25DYXNoTGFiZWwuc3RyaW5nID0gXCIkXCIgKyBfbXlEYXRhLkNhc2g7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblBsYXllck5hbWVMYWJlbC5zdHJpbmcgPSBfbXlEYXRhLlBsYXllck5hbWU7XHJcbiAgICB0aGlzLk9uZVF1ZXN0aW9uU2V0dXBVSS5EZWNpc2lvblF1ZXN0aW9uTGFiZWwuc3RyaW5nID1cclxuICAgICAgXCJQbGF5ZXIgaGFzIGFza2VkIGlmIFwiICtcclxuICAgICAgX3F1ZXN0aW9uICtcclxuICAgICAgXCJcXG5cIiArXHJcbiAgICAgIFwiXFxuXCIgK1xyXG4gICAgICBcIiplaXRoZXIgYW5zd2VyIHF1ZXN0aW9uIG9yIHBheSAkNTAwMCB0byBwbGF5ZXIgd2hvc2UgYXNraW5nIHF1ZXN0aW9uLlwiO1xyXG4gIH0sXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIFNob3dUb2FzdDogZnVuY3Rpb24gKG1lc3NhZ2UsIHRpbWUgPSAyMjUwKSB7XHJcbiAgICB0aGlzLlBvcFVwVUkuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuUG9wVXBVSUxhYmVsLnN0cmluZyA9IG1lc3NhZ2U7XHJcbiAgICB2YXIgU2VsZlRvYXN0ID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBTZWxmVG9hc3QuUG9wVXBVSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sIHRpbWUpO1xyXG4gIH0sXHJcbn0pO1xyXG4iXX0=